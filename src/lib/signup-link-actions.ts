// Signup links — a learner joins their hotel, or a hotel opens its own
// account, from a link instead of from somebody typing their details in.
//
// Making and revoking a link needs a signed-in HR or platform owner.
// Opening and using one does not: the random token in the URL is the
// permission, which is the whole point of a link. So the two public
// functions below take no auth middleware, and every limit they must
// respect (seats, a live contract, how many times the link may be used,
// its expiry) is checked on the server, never trusted from the page.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";
import { SHIPPING_DEPARTMENTS } from "@/lib/departments";
import { requireOrgAdmin } from "@/lib/org-admin-actions";
import { requireSuperAdmin } from "@/lib/platform-admin-actions";
import type { Database } from "@/integrations/supabase/types";

type LinkRow = Database["public"]["Tables"]["signup_links"]["Row"];

const PLAN = z.enum(["p50", "p100", "p200", "p300", "p500"]);
const TERM = z.enum(["trial", "m3", "m6", "m9", "m12"]);
const DEPARTMENT = z
  .string()
  .refine((code) => SHIPPING_DEPARTMENTS.some((d) => d.code === code), "Bộ phận không hợp lệ.");
const TOKEN = z.string().trim().min(16).max(64);

/** 18 random bytes → 24 URL-safe characters (144 bits): not guessable,
 *  still short enough to paste into Zalo. */
function newToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(18));
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function expiryFrom(days: number | null | undefined): string | null {
  if (!days) return null;
  return new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
}

function toPhone(raw: string): string {
  try {
    return normalizeVNPhone(raw);
  } catch (e) {
    throw new Error(e instanceof InvalidPhoneError ? e.message : "Số điện thoại không hợp lệ.");
  }
}

/** Why this link cannot be used right now, in words for the person
 *  holding it — or null when it can. */
function linkProblem(link: LinkRow | null): string | null {
  if (!link) return "Link không tồn tại. Hãy kiểm tra lại, hoặc xin người gửi một link mới.";
  if (link.revoked_at) return "Link này đã bị thu hồi. Hãy xin người gửi một link mới.";
  if (link.expires_at && new Date(link.expires_at) <= new Date()) {
    return "Link này đã hết hạn. Hãy xin người gửi một link mới.";
  }
  if (link.max_uses !== null && link.use_count >= link.max_uses) {
    return link.kind === "organization"
      ? "Link này đã được dùng để mở tài khoản khách sạn. Nếu đó là bạn, hãy đăng nhập."
      : "Link này đã đủ số người đăng ký. Hãy báo bộ phận nhân sự của khách sạn.";
  }
  return null;
}

async function findLink(token: string): Promise<LinkRow | null> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("signup_links")
    .select("*")
    .eq("token", token)
    .maybeSingle();
  // No row is "no such link"; an error is the database talking (a missing
  // table before the migration runs, a timeout) and must not be dressed up
  // as a typo in the link.
  if (error) throw new Error(error.message);
  return (data as LinkRow | null) ?? null;
}

/** Take one use of the link, atomically. Throws the reason if the link is
 *  no longer usable — including when someone else took the last use a
 *  moment ago, which a read-then-write check would have let through. */
async function claimLink(token: string, kind: LinkRow["kind"]): Promise<LinkRow> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin.rpc("claim_signup_link", { link_token: token });
  if (error) throw new Error(error.message);
  const claimed = (data as LinkRow[] | null)?.[0];
  if (!claimed) {
    throw new Error(linkProblem(await findLink(token)) ?? "Link này không còn dùng được.");
  }
  if (claimed.kind !== kind) {
    await releaseLink(claimed.id);
    throw new Error("Link không đúng loại.");
  }
  return claimed;
}

async function releaseLink(id: string) {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  await supabaseAdmin.rpc("release_signup_link", { link_id: id });
}

// ── Making and revoking links ────────────────────────────────

export const createLearnerLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      label: z.string().trim().max(80).optional(),
      groupId: z.string().uuid().nullable().optional(),
      department: DEPARTMENT.nullable().optional(),
      maxUses: z.number().int().min(1).max(1000).nullable().optional(),
      expiresInDays: z.number().int().min(1).max(365).nullable().optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const orgId = await requireOrgAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { logAdminAction } = await import("@/lib/account-provisioning.server");

    if (data.groupId) {
      const { data: group } = await supabaseAdmin
        .from("groups")
        .select("id")
        .eq("id", data.groupId)
        .eq("org_id", orgId)
        .maybeSingle();
      if (!group) throw new Error("Nhóm không thuộc khách sạn của bạn.");
    }

    const token = newToken();
    const { data: link, error } = await supabaseAdmin
      .from("signup_links")
      .insert({
        token,
        kind: "learner",
        label: data.label || null,
        org_id: orgId,
        group_id: data.groupId ?? null,
        department: data.department ?? null,
        max_uses: data.maxUses ?? null,
        expires_at: expiryFrom(data.expiresInDays),
        created_by: context.userId,
      })
      .select("id")
      .single();
    if (error || !link) throw new Error(error?.message ?? "Không tạo được link.");

    await logAdminAction({
      actorId: context.userId,
      orgId,
      action: "link.create",
      meta: { link_id: link.id, kind: "learner", group_id: data.groupId ?? null },
    });

    return { id: link.id, token };
  });

export const createOrganizationLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      label: z.string().trim().max(80).optional(),
      planCode: PLAN,
      term: TERM,
      price: z.number().nonnegative().nullable().optional(),
      expiresInDays: z.number().int().min(1).max(90).default(14),
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { logAdminAction } = await import("@/lib/account-provisioning.server");

    const token = newToken();
    const { data: link, error } = await supabaseAdmin
      .from("signup_links")
      .insert({
        token,
        kind: "organization",
        label: data.label || null,
        plan_code: data.planCode,
        term: data.term,
        // null = charge the list price in force on the day the hotel signs up.
        price: data.price ?? null,
        max_uses: 1,
        expires_at: expiryFrom(data.expiresInDays),
        created_by: context.userId,
      })
      .select("id")
      .single();
    if (error || !link) throw new Error(error?.message ?? "Không tạo được link.");

    await logAdminAction({
      actorId: context.userId,
      orgId: null,
      action: "link.create",
      meta: { link_id: link.id, kind: "organization", plan: data.planCode, term: data.term },
    });

    return { id: link.id, token };
  });

export const revokeSignupLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ id: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { logAdminAction } = await import("@/lib/account-provisioning.server");

    const { data: caller } = await context.supabase
      .from("profiles")
      .select("role, org_id")
      .eq("id", context.userId)
      .single();
    const { data: link } = await supabaseAdmin
      .from("signup_links")
      .select("id, kind, org_id")
      .eq("id", data.id)
      .maybeSingle();
    if (!caller || !link) throw new Error("Không tìm thấy link.");

    const allowed =
      caller.role === "super_admin" ||
      (caller.role === "org_admin" && link.kind === "learner" && link.org_id === caller.org_id);
    if (!allowed) throw new Error("Bạn không có quyền thu hồi link này.");

    const { error } = await supabaseAdmin
      .from("signup_links")
      .update({ revoked_at: new Date().toISOString() })
      .eq("id", data.id);
    if (error) throw new Error(error.message);

    await logAdminAction({
      actorId: context.userId,
      orgId: link.kind === "learner" ? link.org_id : null,
      action: "link.revoke",
      meta: { link_id: link.id, kind: link.kind },
    });

    return { success: true as const };
  });

// ── Opening and using a link (public) ────────────────────────

export type SignupLinkInfo =
  | { ok: false; reason: string }
  | {
      ok: true;
      kind: "learner";
      orgName: string;
      groupName: string | null;
      department: string | null;
    }
  | { ok: true; kind: "organization"; seats: number; term: string };

export const getSignupLinkInfo = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: TOKEN }))
  .handler(async ({ data }): Promise<SignupLinkInfo> => {
    const link = await findLink(data.token);
    const problem = linkProblem(link);
    if (problem || !link) return { ok: false, reason: problem ?? "Link không tồn tại." };

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (link.kind === "organization") {
      const { data: plan } = await supabaseAdmin
        .from("plans")
        .select("seats")
        .eq("code", link.plan_code ?? "")
        .maybeSingle();
      return { ok: true, kind: "organization", seats: plan?.seats ?? 0, term: link.term ?? "" };
    }

    const orgId = link.org_id as string;
    const { data: isActive } = await supabaseAdmin.rpc("org_is_active", { target: orgId });
    if (isActive === false) {
      return {
        ok: false,
        reason: "Gói học của khách sạn đã hết hạn. Hãy báo bộ phận nhân sự của khách sạn.",
      };
    }
    const { seatsLeft } = await import("@/lib/account-provisioning.server");
    if ((await seatsLeft(orgId)) === 0) {
      return {
        ok: false,
        reason: "Khách sạn đã dùng hết chỗ học viên của gói. Hãy báo bộ phận nhân sự.",
      };
    }

    const [{ data: org }, { data: group }] = await Promise.all([
      supabaseAdmin.from("organizations").select("name").eq("id", orgId).single(),
      link.group_id
        ? supabaseAdmin.from("groups").select("name").eq("id", link.group_id).maybeSingle()
        : Promise.resolve({ data: null }),
    ]);
    return {
      ok: true,
      kind: "learner",
      orgName: org?.name ?? "",
      groupName: (group as { name: string } | null)?.name ?? null,
      department: link.department,
    };
  });

export const redeemLearnerLink = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: TOKEN,
      fullName: z.string().trim().min(2, "Hãy nhập họ tên.").max(120),
      phone: z.string().min(1),
      password: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự"),
      department: DEPARTMENT.nullable().optional(),
    }),
  )
  .handler(async ({ data }) => {
    const phone = toPhone(data.phone);
    const link = await claimLink(data.token, "learner");
    const department = link.department ?? data.department ?? null;
    if (!department) {
      await releaseLink(link.id);
      throw new Error("Hãy chọn bộ phận của bạn.");
    }

    const { provisionMember } = await import("@/lib/account-provisioning.server");
    let userId: string;
    try {
      // They chose this password themselves, so no forced change at first login.
      userId = await provisionMember({
        orgId: link.org_id as string,
        phone,
        fullName: data.fullName,
        password: data.password,
        role: "member",
        department,
        mustChangePassword: false,
        actorId: null,
        action: "member.signup_link",
        meta: { link_id: link.id },
      });
    } catch (e) {
      await releaseLink(link.id);
      throw e;
    }

    if (link.group_id) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      await supabaseAdmin
        .from("group_members")
        .insert({ group_id: link.group_id, user_id: userId });
    }

    return { success: true as const };
  });

export const redeemOrganizationLink = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: TOKEN,
      hotelName: z.string().trim().min(2, "Hãy nhập tên khách sạn.").max(120),
      fullName: z.string().trim().min(2, "Hãy nhập họ tên.").max(120),
      phone: z.string().min(1),
      password: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự"),
    }),
  )
  .handler(async ({ data }) => {
    const phone = toPhone(data.phone);
    const link = await claimLink(data.token, "organization");

    const { provisionOrganization } = await import("@/lib/account-provisioning.server");
    let orgId: string;
    try {
      ({ orgId } = await provisionOrganization({
        name: data.hotelName,
        planCode: link.plan_code as string,
        term: link.term as string,
        price: link.price === null ? null : Number(link.price),
        hrPhone: phone,
        hrFullName: data.fullName,
        hrPassword: data.password,
        mustChangePassword: false,
        actorId: null,
        action: "org.signup_link",
        meta: { link_id: link.id },
      }));
    } catch (e) {
      await releaseLink(link.id);
      throw e;
    }

    // Record which hotel this link became, for the owner's list.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("signup_links").update({ org_id: orgId }).eq("id", link.id);

    return { success: true as const };
  });
