// A partner's own free account (migration 20261008180000): to learn with,
// and to know what they are offering hotels. It lives in an organisation of
// kind 'partner_demo', one seat, and it is open exactly while the partner is
// active and has a live link — org_is_active() decides that, not a plan's
// dates. The partner sets the password from an activation link; nobody else
// ever knows it.
//
// Server-only: server functions and the CRM door import it.
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import {
  friendlyAuthError,
  logAdminAction,
  recordCrmEvent,
} from "@/lib/account-provisioning.server";
import { newResetToken, sha256Hex } from "@/lib/password-reset.server";

/** How long an activation link works. */
export const ACTIVATION_DAYS = 7;

/** The demo plan has no end of its own: the partner's state is the end. */
const DEMO_ENDS = "2100-01-01T00:00:00Z";

/** "conflict": the phone belongs to someone else, or the partner already
 *  has an account under another number. "missing": no such partner. */
export class PartnerAccountError extends Error {
  constructor(
    readonly kind: "conflict" | "missing",
    message: string,
  ) {
    super(message);
  }
}

const digits = (phone: string) => phone.replace(/^\+/, "");

function randomPassword(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return Array.from(bytes, (b) => b.toString(36).padStart(2, "0")).join("");
}

/** The partner's demo account, made now if they have none. `phone` is
 *  already normalised (+84…). Asking again with the same phone is a no-op. */
export async function ensurePartnerDemo(input: {
  partnerId: string;
  phone: string;
  email?: string | null;
  actorId: string | null;
}): Promise<{ userId: string; created: boolean }> {
  const { data: partner } = await supabaseAdmin
    .from("partners")
    .select("id, name, crm_ref, active, phone, demo_user_id")
    .eq("id", input.partnerId)
    .maybeSingle();
  if (!partner) throw new PartnerAccountError("missing", "Không tìm thấy đối tác.");
  if (partner.demo_user_id) {
    if (partner.phone && digits(partner.phone) === digits(input.phone)) {
      return { userId: partner.demo_user_id, created: false };
    }
    throw new PartnerAccountError(
      "conflict",
      "Đối tác đã có tài khoản dùng thử với số điện thoại khác.",
    );
  }

  const { data: org, error: orgErr } = await supabaseAdmin
    .from("organizations")
    .insert({
      name: `Đối tác · ${partner.name}`,
      seat_limit: 1,
      kind: "partner_demo",
      partner_id: partner.id,
    })
    .select("id")
    .single();
  if (orgErr || !org) throw new Error(orgErr?.message ?? "Không tạo được tài khoản.");
  const undo = async () => {
    await supabaseAdmin.from("organizations").delete().eq("id", org.id);
  };

  try {
    const { error: subErr } = await supabaseAdmin.from("subscriptions").insert({
      org_id: org.id,
      plan_code: "p1",
      kind: "demo",
      starts_at: new Date(Date.now() - 60_000).toISOString(),
      ends_at: DEMO_ENDS,
      price: 0,
    });
    if (subErr) throw new Error(subErr.message);

    const identity = { org_id: org.id, role: "member" as const };
    const { data: created, error: userErr } = await supabaseAdmin.auth.admin.createUser({
      phone: input.phone,
      // Never used: the partner sets their own from the activation link.
      password: randomPassword(),
      phone_confirm: true,
      user_metadata: { full_name: partner.name, ...identity },
      app_metadata: identity,
    });
    if (userErr || !created.user) {
      const message = friendlyAuthError(userErr?.message ?? "Không tạo được tài khoản.");
      throw /đã được đăng ký/.test(message)
        ? new PartnerAccountError("conflict", message)
        : new Error(message);
    }
    const userId = created.user.id;

    if (input.email) {
      await supabaseAdmin.from("profiles").update({ email: input.email }).eq("id", userId);
    }
    const { error: linkErr } = await supabaseAdmin
      .from("partners")
      .update({
        phone: input.phone,
        email: input.email ?? null,
        demo_org_id: org.id,
        demo_user_id: userId,
      })
      .eq("id", partner.id);
    if (linkErr) throw new Error(linkErr.message);

    await logAdminAction({
      actorId: input.actorId,
      orgId: org.id,
      action: "partner.demo_create",
      targetUserId: userId,
      meta: { partner_id: partner.id },
    });
    // The CRM hears about an account it did not ask for (made in the app).
    if (partner.crm_ref && input.actorId) {
      await recordCrmEvent(
        "doi_tac_cap_nhat",
        {
          doi_tac_crm_id: partner.crm_ref,
          dang_hoat_dong: partner.active,
          tai_khoan_sdt: input.phone,
        },
        org.id,
      );
    }
    return { userId, created: true };
  } catch (e) {
    await undo();
    throw e;
  }
}

/** A one-use link for the partner to set a password, valid ACTIVATION_DAYS
 *  days. Issuing a new one leaves older ones valid until one is used. */
export async function issueActivationLink(
  userId: string,
  origin: string,
): Promise<{ url: string; expiresAt: string }> {
  const token = newResetToken();
  const expiresAt = new Date(Date.now() + ACTIVATION_DAYS * 86_400_000).toISOString();
  const { error } = await supabaseAdmin.from("password_reset_tokens").insert({
    user_id: userId,
    token_hash: await sha256Hex(token),
    email: null,
    expires_at: expiresAt,
    purpose: "activate",
  });
  if (error) throw new Error(error.message);
  return { url: `${origin}/dat-lai-mat-khau/${token}`, expiresAt };
}

/** Switch a partner on or off from the app. Off closes their links and
 *  their demo account at once (claim_signup_link, org_is_active). The CRM
 *  is told when the partner is one of its own. */
export async function setPartnerActive(input: {
  partnerId: string;
  active: boolean;
  actorId: string | null;
}): Promise<void> {
  const { data: changed, error } = await supabaseAdmin
    .from("partners")
    .update({ active: input.active, status_changed_at: new Date().toISOString() })
    .eq("id", input.partnerId)
    .neq("active", input.active)
    .select("id, crm_ref, phone")
    .maybeSingle();
  if (error) throw new Error(error.message);
  if (!changed) return; // already in that state
  await logAdminAction({
    actorId: input.actorId,
    orgId: null,
    action: input.active ? "partner.activate" : "partner.deactivate",
    meta: { partner_id: input.partnerId },
  });
  if (changed.crm_ref) {
    await recordCrmEvent(
      "doi_tac_cap_nhat",
      {
        doi_tac_crm_id: changed.crm_ref,
        dang_hoat_dong: input.active,
        tai_khoan_sdt: changed.phone ?? null,
      },
      null,
    );
  }
}

/** Is the partner's demo account open right now. */
export async function partnerIsLive(partnerId: string): Promise<boolean> {
  const { data } = await supabaseAdmin.rpc("partner_is_live", { p_partner: partnerId });
  return data === true;
}
