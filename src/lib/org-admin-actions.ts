// Org-admin server functions: create/delete members, reset passwords,
// change roles. All privileged writes go through supabaseAdmin (service
// role, bypasses RLS) — the caller's org-admin membership is verified
// explicitly in each handler before touching another user's row.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";
import type { Database } from "@/integrations/supabase/types";

const MAX_ORG_ADMINS = 5;

async function requireOrgAdmin(
  supabase: SupabaseClient<Database>,
  userId: string,
): Promise<string> {
  const { data: caller, error } = await supabase
    .from("profiles")
    .select("role, org_id")
    .eq("id", userId)
    .single();

  if (error || !caller) throw new Error("Unauthorized: profile not found");
  if (caller.role !== "org_admin") throw new Error("Forbidden: org_admin role required");
  if (!caller.org_id) throw new Error("Forbidden: caller has no organization");
  return caller.org_id;
}

/** Who did what to whom. Written with the service role, so a browser can
 *  never forge or erase a line; HR reads it back through RLS. */
async function logAdminAction(
  admin: SupabaseClient<Database>,
  entry: {
    actorId: string;
    orgId: string;
    action: string;
    targetUserId?: string;
    meta?: Record<string, unknown>;
  },
) {
  await admin.from("admin_actions").insert({
    actor_id: entry.actorId,
    org_id: entry.orgId,
    action: entry.action,
    target_user_id: entry.targetUserId ?? null,
    meta: (entry.meta ?? {}) as never,
  });
}

/** A lapsed hotel may still be read and reported on; it may not take on
 *  new learners. The same rule is a RESTRICTIVE policy on the progress
 *  tables, so an expired org cannot record learning either. */
async function requireActiveSubscription(admin: SupabaseClient<Database>, orgId: string) {
  const { data, error } = await admin.rpc("org_is_active", { target: orgId });
  if (error) throw new Error(error.message);
  if (data === false) {
    throw new Error("Gói của khách sạn đã hết hạn. Vui lòng gia hạn trước khi thêm học viên.");
  }
}

function friendlyAuthError(message: string): string {
  if (/phone_exists|already registered/i.test(message)) {
    return "Số điện thoại này đã được đăng ký trong hệ thống.";
  }
  if (/SEAT_QUOTA_EXCEEDED/.test(message)) {
    return "Nhóm đã đạt giới hạn số lượng thành viên.";
  }
  return message;
}

function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < 10; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

export const createMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    z.object({
      phone: z.string().min(1),
      fullName: z.string().min(1),
      password: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự"),
      role: z.enum(["member", "org_admin"]).default("member"),
      department: z.string().trim().max(100).optional(),
    }),
  )
  .handler(async ({ data, context }) => {
    const orgId = await requireOrgAdmin(context.supabase, context.userId);

    let phone: string;
    try {
      phone = normalizeVNPhone(data.phone);
    } catch (e) {
      throw new Error(e instanceof InvalidPhoneError ? e.message : "Số điện thoại không hợp lệ.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    if (data.role === "org_admin") {
      const { count: adminCount } = await supabaseAdmin
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("org_id", orgId)
        .eq("role", "org_admin");
      if ((adminCount ?? 0) >= MAX_ORG_ADMINS) {
        throw new Error(`Nhóm đã đạt tối đa ${MAX_ORG_ADMINS} admin.`);
      }
    }

    await requireActiveSubscription(supabaseAdmin, orgId);

    // Friendly pre-check for UX; the DB trigger (enforce_seat_quota) is the
    // hard, race-safe backstop that actually protects the limit. Both count
    // LEARNERS only — an HR account is not a seat the hotel pays for.
    if (data.role === "member") {
      const { data: seatLimit } = await supabaseAdmin.rpc("org_seat_limit", { target: orgId });
      const { count: memberCount } = await supabaseAdmin
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("org_id", orgId)
        .eq("role", "member");
      if (typeof seatLimit === "number" && (memberCount ?? 0) >= seatLimit) {
        throw new Error(`Nhóm đã dùng hết ${seatLimit} chỗ học viên của gói.`);
      }
    }

    const { data: created, error } = await supabaseAdmin.auth.admin.createUser({
      phone,
      password: data.password,
      phone_confirm: true,
      user_metadata: {
        full_name: data.fullName,
        org_id: orgId,
        role: data.role,
        department: data.department,
      },
    });

    if (error || !created.user) {
      throw new Error(friendlyAuthError(error?.message ?? "Tạo tài khoản thất bại."));
    }

    // Admin set this password (typed or auto-generated) on the member's
    // behalf — always require them to set their own on first login, same
    // as resetMemberPassword below.
    await supabaseAdmin
      .from("profiles")
      .update({ must_change_password: true })
      .eq("id", created.user.id);

    await logAdminAction(supabaseAdmin, {
      actorId: context.userId,
      orgId,
      action: "member.create",
      targetUserId: created.user.id,
      meta: { role: data.role, department: data.department ?? null },
    });

    return { userId: created.user.id };
  });

export const deleteMember = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ userId: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    const orgId = await requireOrgAdmin(context.supabase, context.userId);

    if (data.userId === context.userId) {
      throw new Error("Bạn không thể tự xóa chính mình.");
    }

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: target, error: targetErr } = await supabaseAdmin
      .from("profiles")
      .select("org_id, role")
      .eq("id", data.userId)
      .single();
    if (targetErr || !target) throw new Error("Không tìm thấy thành viên.");
    if (target.org_id !== orgId) throw new Error("Thành viên không thuộc nhóm của bạn.");

    if (target.role === "org_admin") {
      const { count: adminCount } = await supabaseAdmin
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("org_id", orgId)
        .eq("role", "org_admin");
      if ((adminCount ?? 0) <= 1) {
        throw new Error("Không thể xóa admin cuối cùng của nhóm.");
      }
    }

    const { error } = await supabaseAdmin.auth.admin.deleteUser(data.userId);
    if (error) throw new Error(error.message);

    // Deleting a learner frees the seat immediately: the quota counts rows
    // that exist, and this row is gone.
    await logAdminAction(supabaseAdmin, {
      actorId: context.userId,
      orgId,
      action: "member.delete",
      targetUserId: data.userId,
      meta: { role: target.role },
    });

    return { success: true as const };
  });

export const resetMemberPassword = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ userId: z.string().uuid() }))
  .handler(async ({ data, context }) => {
    const orgId = await requireOrgAdmin(context.supabase, context.userId);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: target, error: targetErr } = await supabaseAdmin
      .from("profiles")
      .select("org_id")
      .eq("id", data.userId)
      .single();
    if (targetErr || !target) throw new Error("Không tìm thấy thành viên.");
    if (target.org_id !== orgId) throw new Error("Thành viên không thuộc nhóm của bạn.");

    const tempPassword = generateTempPassword();

    const { error } = await supabaseAdmin.auth.admin.updateUserById(data.userId, {
      password: tempPassword,
    });
    if (error) throw new Error(error.message);

    await supabaseAdmin
      .from("profiles")
      .update({ must_change_password: true })
      .eq("id", data.userId);

    await logAdminAction(supabaseAdmin, {
      actorId: context.userId,
      orgId,
      action: "member.reset_password",
      targetUserId: data.userId,
    });

    return { tempPassword };
  });

export const updateMemberRole = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator(z.object({ userId: z.string().uuid(), role: z.enum(["member", "org_admin"]) }))
  .handler(async ({ data, context }) => {
    const orgId = await requireOrgAdmin(context.supabase, context.userId);

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: target, error: targetErr } = await supabaseAdmin
      .from("profiles")
      .select("org_id, role")
      .eq("id", data.userId)
      .single();
    if (targetErr || !target) throw new Error("Không tìm thấy thành viên.");
    if (target.org_id !== orgId) throw new Error("Thành viên không thuộc nhóm của bạn.");

    if (data.role === "org_admin" && target.role !== "org_admin") {
      const { count: adminCount } = await supabaseAdmin
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("org_id", orgId)
        .eq("role", "org_admin");
      if ((adminCount ?? 0) >= MAX_ORG_ADMINS) {
        throw new Error(`Nhóm đã đạt tối đa ${MAX_ORG_ADMINS} admin.`);
      }
    }

    if (data.role === "member" && target.role === "org_admin") {
      const { count: adminCount } = await supabaseAdmin
        .from("profiles")
        .select("id", { count: "exact", head: true })
        .eq("org_id", orgId)
        .eq("role", "org_admin");
      if ((adminCount ?? 0) <= 1) {
        throw new Error("Không thể hạ quyền admin cuối cùng của nhóm.");
      }
    }

    const { error } = await supabaseAdmin
      .from("profiles")
      .update({ role: data.role })
      .eq("id", data.userId);
    if (error) {
      // The seat trigger fires on a role change too: demoting an HR account
      // back to learner takes a seat the hotel may not have.
      throw new Error(friendlyAuthError(error.message));
    }

    await logAdminAction(supabaseAdmin, {
      actorId: context.userId,
      orgId,
      action: "member.role_change",
      targetUserId: data.userId,
      meta: { from: target.role, to: data.role },
    });

    return { success: true as const };
  });
