// Partners, for the platform owner: who is active, and each partner's own
// demo account (partner-demo.server.ts). Super Admin only.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { requireSuperAdmin } from "@/lib/platform-admin-actions";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";
import { optionalContactEmail } from "@/lib/contact-email";

export type PartnerRow = {
  id: string;
  name: string;
  fromCrm: boolean;
  active: boolean;
  phone: string | null;
  hasAccount: boolean;
  /** The demo account is open right now (active + a live link). */
  live: boolean;
  liveLinks: number;
};

const origin = () => process.env.APP_ORIGIN || "https://hospitality.embassy.edu.vn";

function toPhone(raw: string): string {
  try {
    return normalizeVNPhone(raw);
  } catch (e) {
    throw new Error(e instanceof InvalidPhoneError ? e.message : "Số điện thoại không hợp lệ.");
  }
}

export const listPartners = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }): Promise<PartnerRow[]> => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const [{ data: partners, error }, { data: links }] = await Promise.all([
      supabaseAdmin
        .from("partners")
        .select("id, name, crm_ref, active, phone, demo_user_id")
        .order("name"),
      supabaseAdmin
        .from("signup_links")
        .select("partner_id, revoked_at, expires_at")
        .not("partner_id", "is", null),
    ]);
    if (error) throw new Error(error.message);
    const now = Date.now();
    const liveCount = new Map<string, number>();
    for (const l of links ?? []) {
      const open = !l.revoked_at && (!l.expires_at || new Date(l.expires_at).getTime() > now);
      if (open && l.partner_id) liveCount.set(l.partner_id, (liveCount.get(l.partner_id) ?? 0) + 1);
    }
    return (partners ?? []).map((p) => {
      const liveLinks = liveCount.get(p.id) ?? 0;
      return {
        id: p.id,
        name: p.name,
        fromCrm: !!p.crm_ref,
        active: p.active,
        phone: p.phone,
        hasAccount: !!p.demo_user_id,
        // The same rule as partner_is_live(), from rows already loaded.
        live: p.active && liveLinks > 0,
        liveLinks,
      };
    });
  });

export const setPartnerStatus = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ partnerId: z.string().uuid(), active: z.boolean() }))
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { setPartnerActive } = await import("@/lib/partner-demo.server");
    await setPartnerActive({ ...data, actorId: context.userId });
    return { success: true as const };
  });

/** Make the partner's demo account (if none) and hand back an activation
 *  link to send them. */
export const createPartnerAccount = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      partnerId: z.string().uuid(),
      phone: z.string().trim().min(1, "Hãy nhập số điện thoại của đối tác."),
      email: optionalContactEmail,
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { ensurePartnerDemo, issueActivationLink } = await import("@/lib/partner-demo.server");
    const { userId } = await ensurePartnerDemo({
      partnerId: data.partnerId,
      phone: toPhone(data.phone),
      email: data.email,
      actorId: context.userId,
    });
    return issueActivationLink(userId, origin());
  });

/** A fresh activation link, e.g. when the first one was lost or expired. */
export const reissuePartnerActivation = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ partnerId: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: partner } = await supabaseAdmin
      .from("partners")
      .select("demo_user_id")
      .eq("id", data.partnerId)
      .maybeSingle();
    if (!partner?.demo_user_id) throw new Error("Đối tác này chưa có tài khoản dùng thử.");
    const { issueActivationLink } = await import("@/lib/partner-demo.server");
    return issueActivationLink(partner.demo_user_id, origin());
  });
