// Platform-owner server functions: create a hotel, give it a plan, and
// hand it its first HR account. Everything here runs as the service role,
// so the caller's super_admin role is verified explicitly first — the same
// shape org-admin-actions.ts uses for HR.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";
import type { Database } from "@/integrations/supabase/types";

const TERM_MONTHS: Record<string, number> = { trial: 1, m3: 3, m6: 6, m9: 9, m12: 12 };

async function requireSuperAdmin(supabase: SupabaseClient<Database>, userId: string) {
  const { data, error } = await supabase.from("profiles").select("role").eq("id", userId).single();
  if (error || !data) throw new Error("Unauthorized: profile not found");
  if (data.role !== "super_admin") throw new Error("Forbidden: super_admin role required");
}

function endsAt(kind: string, from: Date): string {
  const months = TERM_MONTHS[kind] ?? 1;
  const end = new Date(from);
  end.setMonth(end.getMonth() + months);
  return end.toISOString();
}

export const createOrganization = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      name: z.string().trim().min(2).max(120),
      planCode: z.enum(["p50", "p100", "p200", "p300", "p500"]),
      term: z.enum(["trial", "m3", "m6", "m9", "m12"]),
      hrPhone: z.string().min(1),
      hrFullName: z.string().trim().min(1).max(120),
      hrPassword: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự"),
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

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: plan, error: planErr } = await supabaseAdmin
      .from("plans")
      .select("seats")
      .eq("code", data.planCode)
      .single();
    if (planErr || !plan) throw new Error("Gói không hợp lệ.");

    // seat_limit stays in step with the plan so the legacy fallback in
    // org_seat_limit() never disagrees with the subscription.
    const { data: org, error: orgErr } = await supabaseAdmin
      .from("organizations")
      .insert({ name: data.name, seat_limit: plan.seats })
      .select("id")
      .single();
    if (orgErr || !org) throw new Error(orgErr?.message ?? "Không tạo được khách sạn.");

    const now = new Date();
    const { error: subErr } = await supabaseAdmin.from("subscriptions").insert({
      org_id: org.id,
      plan_code: data.planCode,
      kind: data.term,
      starts_at: now.toISOString(),
      ends_at: endsAt(data.term, now),
      created_by: context.userId,
    });
    if (subErr) throw new Error(subErr.message);

    const { data: created, error: userErr } = await supabaseAdmin.auth.admin.createUser({
      phone,
      password: data.hrPassword,
      phone_confirm: true,
      user_metadata: {
        full_name: data.hrFullName,
        org_id: org.id,
        role: "org_admin",
      },
    });
    if (userErr || !created.user) {
      throw new Error(userErr?.message ?? "Không tạo được tài khoản HR.");
    }
    await supabaseAdmin
      .from("profiles")
      .update({ must_change_password: true })
      .eq("id", created.user.id);

    await supabaseAdmin.from("admin_actions").insert({
      actor_id: context.userId,
      org_id: org.id,
      action: "org.create",
      target_user_id: created.user.id,
      meta: { plan: data.planCode, term: data.term } as never,
    });

    return { orgId: org.id, hrUserId: created.user.id };
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
    }),
  )
  .handler(async ({ data, context }) => {
    await requireSuperAdmin(context.supabase, context.userId);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

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

    const { error } = await supabaseAdmin.from("subscriptions").insert({
      org_id: data.orgId,
      plan_code: data.planCode,
      kind: data.term,
      starts_at: from.toISOString(),
      ends_at: endsAt(data.term, from),
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
      meta: { plan: data.planCode, term: data.term, startNow: data.startNow } as never,
    });

    return { success: true as const };
  });
