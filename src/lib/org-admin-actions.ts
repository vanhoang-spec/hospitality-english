// Org-admin server functions: create/delete members, reset passwords,
// change roles. All privileged writes go through supabaseAdmin (service
// role, bypasses RLS) — the caller's org-admin membership is verified
// explicitly in each handler before touching another user's row.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import type { SupabaseClient } from "@supabase/supabase-js";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";
import { optionalContactEmail } from "@/lib/contact-email";
import type { Database } from "@/integrations/supabase/types";

export async function requireOrgAdmin(
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

/** Ten characters from an alphabet without look-alikes (0/O, 1/l/I).
 *  Drawn from the platform's cryptographic source: a temporary password
 *  is a credential, and Math.random is predictable. */
function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  const bytes = crypto.getRandomValues(new Uint8Array(10));
  let out = "";
  for (const b of bytes) out += chars[b % chars.length];
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
      email: optionalContactEmail,
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

    const { provisionMember } = await import("@/lib/account-provisioning.server");

    // Admin set this password (typed or auto-generated) on the member's
    // behalf — always require them to set their own on first login, same
    // as resetMemberPassword below.
    const userId = await provisionMember({
      orgId,
      phone,
      fullName: data.fullName,
      password: data.password,
      role: data.role,
      department: data.department,
      email: data.email,
      mustChangePassword: true,
      actorId: context.userId,
      action: "member.create",
    });

    return { userId };
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
    const { logAdminAction } = await import("@/lib/account-provisioning.server");

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
    await logAdminAction({
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
    const { logAdminAction } = await import("@/lib/account-provisioning.server");

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

    await logAdminAction({
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
    const { logAdminAction, MAX_ORG_ADMINS } = await import("@/lib/account-provisioning.server");

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
      const { friendlyAuthError } = await import("@/lib/account-provisioning.server");
      throw new Error(friendlyAuthError(error.message));
    }

    await logAdminAction({
      actorId: context.userId,
      orgId,
      action: "member.role_change",
      targetUserId: data.userId,
      meta: { from: target.role, to: data.role },
    });

    return { success: true as const };
  });
