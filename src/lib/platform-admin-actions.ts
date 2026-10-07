// Platform-owner server functions: create a hotel, give it a plan, and
// hand it its first HR account. Everything here runs as the service role,
// so the caller's super_admin role is verified explicitly first — the same
// shape org-admin-actions.ts uses for HR.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";
import { newOrgDetailsSchema, orgDetailsSchema } from "@/lib/org-details";
import type { Database } from "@/integrations/supabase/types";

export async function requireSuperAdmin(supabase: SupabaseClient<Database>, userId: string) {
  const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).single();
  if (error || !data) throw new Error("Unauthorized: profile not found");
  if (data.role !== "super_admin") throw new Error("Forbidden: super_admin role required");
}

export const createOrganization = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    newOrgDetailsSchema.extend({
      name: z.string().trim().min(2).max(120),
      planCode: z.enum(["p50", "p100", "p200", "p300", "p500"]),
      term: z.enum(["trial", "m3", "m6", "m9", "m12"]),
      hrPhone: z.string().min(1),
      hrFullName: z.string().trim().min(2).max(120),
      hrPassword: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự"),
      price: z.number().nonnegative().nullable().optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);

    let phone: string;
    try {
      phone = normalizeVNPhone(data.hrPhone);
    } catch (e) {
      throw new Error(e instanceof InvalidPhoneError ? e.message : "Số điện thoại không hợp lệ.");
    }

    const { provisionOrganization } = await import("@/lib/account-provisioning.server");

    // The owner typed this password on HR's behalf — HR sets their own at
    // first login.
    return provisionOrganization({
      name: data.name,
      planCode: data.planCode,
      term: data.term,
      price: data.price,
      hrPhone: phone,
      hrFullName: data.hrFullName,
      hrPassword: data.hrPassword,
      company: {
        legalName: data.legalName,
        address: data.address,
        taxCode: data.taxCode,
        repEmail: data.repEmail,
      },
      mustChangePassword: true,
      actorId: context.userId,
      action: "org.create",
    });
  });

/** Fill in or correct a hotel's company details, and its short name.
 *  Hotels opened before the details existed get their first row here.
 *  Changing the representative here does not touch any login: HR accounts
 *  are managed on the hotel's own Team page. */
export const setOrgDetails = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    orgDetailsSchema.extend({
      orgId: z.string().uuid(),
      name: z.string().trim().min(2, "Tên khách sạn cần ít nhất 2 ký tự.").max(120),
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { logAdminAction } = await import("@/lib/account-provisioning.server");

    const { data: before } = await supabaseAdmin
      .from("org_details")
      .select("org_id")
      .eq("org_id", data.orgId)
      .maybeSingle();

    const { error: nameErr } = await supabaseAdmin
      .from("organizations")
      .update({ name: data.name })
      .eq("id", data.orgId);
    if (nameErr) throw new Error(nameErr.message);

    const { error } = await supabaseAdmin.from("org_details").upsert({
      org_id: data.orgId,
      legal_name: data.legalName,
      address: data.address,
      tax_code: data.taxCode,
      rep_name: data.repName,
      rep_phone: data.repPhone,
      rep_email: data.repEmail,
      updated_by: context.userId,
    });
    if (error) throw new Error(error.message);

    await logAdminAction({
      actorId: context.userId,
      orgId: data.orgId,
      action: before ? "org.details.update" : "org.details.create",
    });

    return { success: true as const };
  });

/** Renew or change a hotel's plan. The old contract is closed first, so
 *  the "one active subscription per org" index always has one answer. */
export const setSubscription = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      orgId: z.string().uuid(),
      planCode: z.enum(["p50", "p100", "p200", "p300", "p500"]),
      term: z.enum(["trial", "m3", "m6", "m9", "m12"]),
      startNow: z.boolean().default(true),
      price: z.number().nonnegative().nullable().optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { endsAt, listPrice } = await import("@/lib/account-provisioning.server");

    const { data: plan } = await supabaseAdmin
      .from("plans")
      .select("seats")
      .eq("code", data.planCode)
      .single();
    if (!plan) throw new Error("Gói không hợp lệ.");

    const { data: current } = await supabaseAdmin
      .from("subscriptions")
      .select("id, ends_at")
      .eq("org_id", data.orgId)
      .eq("status", "active")
      .maybeSingle();

    // A renewal that starts when the current term ends, rather than today,
    // is the difference between selling twelve months and selling eleven.
    const from =
      !data.startNow && current?.ends_at && new Date(current.ends_at) > new Date()
        ? new Date(current.ends_at)
        : new Date();

    if (current) {
      await supabaseAdmin
        .from("subscriptions")
        .update({ status: "cancelled" })
        .eq("id", current.id);
    }

    const agreed = data.price ?? (await listPrice(data.planCode, data.term));
    const { error } = await supabaseAdmin.from("subscriptions").insert({
      org_id: data.orgId,
      plan_code: data.planCode,
      kind: data.term,
      starts_at: from.toISOString(),
      ends_at: endsAt(data.term, from),
      price: agreed,
      created_by: context.userId,
    });
    if (error) throw new Error(error.message);

    await supabaseAdmin
      .from("organizations")
      .update({ seat_limit: plan.seats })
      .eq("id", data.orgId);

    await supabaseAdmin.from("admin_actions").insert({
      actor_id: context.userId,
      org_id: data.orgId,
      action: "subscription.set",
      meta: {
        plan: data.planCode,
        term: data.term,
        startNow: data.startNow,
        price: agreed,
      } as never,
    });

    return { success: true as const };
  });

/** Sửa một ô trong bảng giá niêm yết.
 *
 *  Chỉ đụng `plan_prices`. Hợp đồng đã ký giữ nguyên số tiền của nó —
 *  đó là lý do `subscriptions.price` là một cột riêng chứ không phải
 *  một phép join tới bảng giá. */
export const setPlanPrice = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      planCode: z.enum(["p1", "p50", "p100", "p200", "p300", "p500"]),
      term: z.enum(["trial", "m3", "m6", "m9", "m12"]),
      price: z.number().nonnegative(),
      currency: z.string().trim().min(3).max(3).default("VND"),
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("plan_prices").upsert({
      plan_code: data.planCode,
      term: data.term,
      price: data.price,
      currency: data.currency,
      updated_at: new Date().toISOString(),
      updated_by: context.userId,
    });
    if (error) throw new Error(error.message);

    await supabaseAdmin.from("admin_actions").insert({
      actor_id: context.userId,
      org_id: null,
      action: "price.set",
      meta: { plan: data.planCode, term: data.term, price: data.price } as never,
    });

    return { success: true as const };
  });
