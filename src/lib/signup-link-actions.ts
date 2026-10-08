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
import { newOrgDetailsSchema } from "@/lib/org-details";
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
  // Partner links (retail, partner_hotel) are offers: they end, and fill
  // up, as a programme rather than as one hotel's invitation.
  const partnerLink = link.kind === "retail" || link.kind === "partner_hotel";
  if (link.expires_at && new Date(link.expires_at) <= new Date()) {
    return partnerLink
      ? "Chương trình đăng ký qua link này đã kết thúc."
      : "Link này đã hết hạn. Hãy xin người gửi một link mới.";
  }
  if (link.max_uses !== null && link.use_count >= link.max_uses) {
    if (link.kind === "organization" || link.kind === "invite") {
      return "Link này đã được dùng để mở tài khoản khách sạn. Nếu đó là bạn, hãy đăng nhập.";
    }
    return partnerLink
      ? "Chương trình đăng ký qua link này đã đủ số chỗ. Hãy liên hệ người đã gửi link cho bạn."
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
  | { ok: true; kind: "organization"; seats: number; term: string }
  | {
      ok: true;
      kind: "retail";
      partnerName: string;
      discountPct: number;
      discountAmount: number;
      trialDays: number;
      /** When the offer ends — the link's expiry. */
      until: string | null;
      options: { term: string; months: number; listPrice: number; amount: number }[];
    }
  | {
      ok: true;
      kind: "partner_hotel";
      partnerName: string;
      discountPct: number;
      discountAmount: number;
      /** 'first' = first contract only, 'every' = every purchase. */
      discountScope: string;
      trialDays: number;
      until: string | null;
      /** The hotel plans a hotel can start its trial on. */
      plans: { code: string; seats: number }[];
    }
  | {
      ok: true;
      kind: "invite";
      /** 'gift' (a hotel already learning with Embassy) or 'trial'. */
      inviteKind: string;
      seats: number;
      days: number;
      prefill: InvitePrefill;
    };

/** What the CRM already knows about the hotel it invites. Every field may
 *  be missing; HR checks and corrects them on the form. */
export type InvitePrefill = {
  hotelName?: string;
  legalName?: string;
  taxCode?: string;
  address?: string;
  repName?: string;
  repPhone?: string;
  repEmail?: string;
};

function readPrefill(raw: unknown): InvitePrefill {
  const p = (raw ?? {}) as {
    ten_khach_san?: unknown;
    cong_ty?: { ten?: unknown; mst?: unknown; dia_chi?: unknown };
    dai_dien?: { ten?: unknown; sdt?: unknown; email?: unknown };
  };
  const s = (v: unknown) => (typeof v === "string" && v.trim() ? v.trim() : undefined);
  return {
    hotelName: s(p.ten_khach_san),
    legalName: s(p.cong_ty?.ten),
    taxCode: s(p.cong_ty?.mst),
    address: s(p.cong_ty?.dia_chi),
    repName: s(p.dai_dien?.ten),
    repPhone: s(p.dai_dien?.sdt),
    repEmail: s(p.dai_dien?.email),
  };
}

/** A link's discount: a percent, or an amount of money (never both). */
function linkDiscount(link: LinkRow) {
  return { pct: Number(link.discount_pct ?? 0), amount: Number(link.discount_amount ?? 0) };
}

const HOTEL_PLAN = z.enum(["p50", "p100", "p200", "p300", "p500"]);

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

    if (link.kind === "invite") {
      const { data: plan } = await supabaseAdmin
        .from("plans")
        .select("seats")
        .eq("code", link.plan_code ?? "")
        .maybeSingle();
      return {
        ok: true,
        kind: "invite",
        inviteKind: link.invite_kind ?? "trial",
        seats: plan?.seats ?? 0,
        days: link.trial_days ?? 0,
        prefill: readPrefill(link.prefill),
      };
    }

    if (link.kind === "retail") {
      const { retailQuote } = await import("@/lib/account-provisioning.server");
      const { RETAIL_TERMS, RETAIL_TERM_MONTHS } = await import("@/lib/retail-pricing");
      const discount = linkDiscount(link);
      const { data: partner } = await supabaseAdmin
        .from("partners")
        .select("name")
        .eq("id", link.partner_id ?? "")
        .maybeSingle();
      const options = [];
      for (const term of RETAIL_TERMS) {
        // A term without a list price is not offered rather than offered at 0.
        try {
          const q = await retailQuote(term, discount);
          options.push({ term, months: RETAIL_TERM_MONTHS[term], ...q });
        } catch {
          /* no list price for this term */
        }
      }
      if (options.length === 0) {
        return { ok: false, reason: "Chương trình chưa có bảng giá. Vui lòng quay lại sau." };
      }
      return {
        ok: true,
        kind: "retail",
        partnerName: partner?.name ?? "",
        discountPct: discount.pct,
        discountAmount: discount.amount,
        trialDays: link.trial_days ?? 0,
        until: link.expires_at,
        options,
      };
    }

    if (link.kind === "partner_hotel") {
      const [{ data: partner }, { data: plans }] = await Promise.all([
        supabaseAdmin
          .from("partners")
          .select("name")
          .eq("id", link.partner_id ?? "")
          .maybeSingle(),
        supabaseAdmin.from("plans").select("code, seats").neq("code", "p1").order("seats"),
      ]);
      const discount = linkDiscount(link);
      return {
        ok: true,
        kind: "partner_hotel",
        partnerName: partner?.name ?? "",
        discountPct: discount.pct,
        discountAmount: discount.amount,
        discountScope: link.discount_scope ?? "first",
        trialDays: link.trial_days ?? 0,
        until: link.expires_at,
        plans: (plans ?? []).filter((p) => HOTEL_PLAN.safeParse(p.code).success),
      };
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
    newOrgDetailsSchema.extend({
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
        company: {
          legalName: data.legalName,
          address: data.address,
          taxCode: data.taxCode,
          repEmail: data.repEmail,
        },
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

/** A hotel signing up through a partner's link: the same company details
 *  as the owner's single-use hotel link, plus the plan the hotel wants to
 *  try. The trial is free and lasts the link's days; the paid plan opens
 *  when the CRM's accountant confirms the hotel's invoice (cap_goi). */
/** A hotel signing up through an invitation the CRM made for it — a gift
 *  for a hotel already learning with Embassy, or a trial. The plan and the
 *  number of days are the CRM's; the company details are HR's, pre-filled
 *  from the CRM and corrected here if need be. Free. */
export const redeemInviteLink = createServerFn({ method: "POST" })
  .inputValidator(
    newOrgDetailsSchema.extend({
      token: TOKEN,
      hotelName: z.string().trim().min(2, "Hãy nhập tên khách sạn.").max(120),
      fullName: z.string().trim().min(2, "Hãy nhập họ tên.").max(120),
      phone: z.string().min(1),
      password: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự"),
    }),
  )
  .handler(async ({ data }) => {
    const phone = toPhone(data.phone);
    const link = await claimLink(data.token, "invite");

    const { provisionOrganization } = await import("@/lib/account-provisioning.server");
    let orgId: string;
    try {
      ({ orgId } = await provisionOrganization({
        name: data.hotelName,
        planCode: link.plan_code as string,
        term: "trial",
        price: 0,
        trialDays: link.trial_days ?? 30,
        freeKind: link.invite_kind === "gift" ? "gift" : "trial",
        signupLink: {
          id: link.id,
          partnerId: null,
          crmRef: link.crm_ref,
          crmCustomerRef: link.crm_customer_ref,
        },
        hrPhone: phone,
        hrFullName: data.fullName,
        hrPassword: data.password,
        company: {
          legalName: data.legalName,
          address: data.address,
          taxCode: data.taxCode,
          repEmail: data.repEmail,
        },
        mustChangePassword: false,
        actorId: null,
        action: "org.signup_invite",
        meta: { link_id: link.id, invite_kind: link.invite_kind },
      }));
    } catch (e) {
      await releaseLink(link.id);
      throw e;
    }

    // Which hotel this invitation became, as for the owner's own links.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    await supabaseAdmin.from("signup_links").update({ org_id: orgId }).eq("id", link.id);
    return { success: true as const };
  });

export const redeemPartnerHotelLink = createServerFn({ method: "POST" })
  .inputValidator(
    newOrgDetailsSchema.extend({
      token: TOKEN,
      hotelName: z.string().trim().min(2, "Hãy nhập tên khách sạn.").max(120),
      fullName: z.string().trim().min(2, "Hãy nhập họ tên.").max(120),
      phone: z.string().min(1),
      password: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự"),
      planCode: HOTEL_PLAN,
    }),
  )
  .handler(async ({ data }) => {
    const phone = toPhone(data.phone);
    const link = await claimLink(data.token, "partner_hotel");

    const { provisionOrganization } = await import("@/lib/account-provisioning.server");
    try {
      await provisionOrganization({
        name: data.hotelName,
        planCode: data.planCode,
        term: "trial",
        price: 0,
        trialDays: link.trial_days ?? 30,
        signupLink: { id: link.id, partnerId: link.partner_id, crmRef: link.crm_ref },
        hrPhone: phone,
        hrFullName: data.fullName,
        hrPassword: data.password,
        company: {
          legalName: data.legalName,
          address: data.address,
          taxCode: data.taxCode,
          repEmail: data.repEmail,
        },
        mustChangePassword: false,
        actorId: null,
        action: "org.signup_partner",
        meta: { link_id: link.id, partner_id: link.partner_id },
      });
    } catch (e) {
      await releaseLink(link.id);
      throw e;
    }
    return { success: true as const };
  });

// ── Retail: one learner, through a partner ───────────────────

const RETAIL_TERM = z.enum(["m3", "m6", "m9", "m12"]);

export const createRetailLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      partnerName: z.string().trim().min(2, "Hãy nhập tên đối tác.").max(120),
      label: z.string().trim().max(80).optional(),
      discountPct: z.number().min(0).max(90),
      trialDays: z.number().int().min(1).max(60),
      /** Last day of the offer, YYYY-MM-DD, Vietnam time. */
      until: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày kết thúc không hợp lệ."),
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { logAdminAction } = await import("@/lib/account-provisioning.server");

    // The offer runs through the whole of its last day in Vietnam.
    const expiresAt = new Date(`${data.until}T23:59:59+07:00`);
    if (Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date()) {
      throw new Error("Ngày kết thúc phải ở tương lai.");
    }

    // One row per partner, found by name regardless of case.
    const { data: existing } = await supabaseAdmin
      .from("partners")
      .select("id")
      // Escaped: in ILIKE a "_" or "%" in a name would match other names.
      .ilike(
        "name",
        data.partnerName.replace(/[\\%_]/g, (c) => `\\${c}`),
      )
      .maybeSingle();
    let partnerId = existing?.id;
    if (!partnerId) {
      const { data: created, error } = await supabaseAdmin
        .from("partners")
        .insert({ name: data.partnerName, created_by: context.userId })
        .select("id")
        .single();
      if (error || !created) throw new Error(error?.message ?? "Không tạo được đối tác.");
      partnerId = created.id;
    }

    const token = newToken();
    const { data: link, error } = await supabaseAdmin
      .from("signup_links")
      .insert({
        token,
        kind: "retail",
        label: data.label || null,
        partner_id: partnerId,
        discount_pct: data.discountPct,
        trial_days: data.trialDays,
        expires_at: expiresAt.toISOString(),
        created_by: context.userId,
      })
      .select("id")
      .single();
    if (error || !link) throw new Error(error?.message ?? "Không tạo được link.");

    await logAdminAction({
      actorId: context.userId,
      orgId: null,
      action: "link.create",
      meta: {
        link_id: link.id,
        kind: "retail",
        partner_id: partnerId,
        discount_pct: data.discountPct,
        trial_days: data.trialDays,
        until: data.until,
      },
    });

    return { id: link.id, token };
  });

/** Move the end date of a retail offer — how the owner extends it past
 *  31/12/2026 without anyone touching code. */
export const extendRetailLink = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      id: z.string().uuid(),
      until: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Ngày kết thúc không hợp lệ."),
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { logAdminAction } = await import("@/lib/account-provisioning.server");

    const expiresAt = new Date(`${data.until}T23:59:59+07:00`);
    if (Number.isNaN(expiresAt.getTime()) || expiresAt <= new Date()) {
      throw new Error("Ngày kết thúc phải ở tương lai.");
    }
    const { error } = await supabaseAdmin
      .from("signup_links")
      .update({ expires_at: expiresAt.toISOString() })
      .eq("id", data.id)
      .eq("kind", "retail");
    if (error) throw new Error(error.message);

    await logAdminAction({
      actorId: context.userId,
      orgId: null,
      action: "link.extend",
      meta: { link_id: data.id, until: data.until },
    });
    return { success: true as const };
  });

export const redeemRetailLink = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: TOKEN,
      fullName: z.string().trim().min(2, "Hãy nhập họ tên.").max(120),
      phone: z.string().min(1),
      password: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự"),
      department: DEPARTMENT,
      term: RETAIL_TERM,
    }),
  )
  .handler(async ({ data }) => {
    const phone = toPhone(data.phone);
    const link = await claimLink(data.token, "retail");

    const { provisionIndividual } = await import("@/lib/account-provisioning.server");
    try {
      return await provisionIndividual({
        fullName: data.fullName,
        phone,
        password: data.password,
        department: data.department,
        term: data.term,
        partnerId: link.partner_id as string,
        linkId: link.id,
        linkCrmRef: link.crm_ref,
        discount: linkDiscount(link),
        trialDays: link.trial_days ?? 7,
      });
    } catch (e) {
      await releaseLink(link.id);
      throw e;
    }
  });
