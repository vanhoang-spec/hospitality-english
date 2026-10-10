// What a password reset does, apart from the database and the mail
// service it talks to — those come in as `deps`, so the steps can be
// tested with fakes (scripts/password-reset-test.ts) while the database
// half is tested on its own (scripts/db/schema-test.ts).
//
// Server-only: server functions import it inside their handlers.
import { escapeHtml } from "@/lib/email.server";
import { RESET_MINUTES } from "@/lib/password-reset-actions";

export type ResetDeps = {
  /** password_reset_request: the address to mail, or null. */
  request(
    phone: string,
    tokenHash: string,
    minutes: number,
  ): Promise<{ email: string; full_name: string | null } | null>;
  /** password_reset_claim: whose token it was, or null if spent/expired. */
  claim(tokenHash: string): Promise<{ user_id: string; token_id: string } | null>;
  /** Give a claimed token back (the new password was refused). */
  release(tokenId: string): Promise<void>;
  /** Set the password; an error message, or null when it worked. */
  setPassword(userId: string, password: string): Promise<string | null>;
  /** Clear the forced first-login change, log it, say who it was. */
  finish(userId: string): Promise<{ phone: string | null }>;
  send(message: { to: string; subject: string; html: string; text: string }): Promise<boolean>;
  origin: string;
};

/** 32 random bytes → 43 URL-safe characters. */
export function newResetToken(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(32));
  let bin = "";
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

export async function sha256Hex(s: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function resetEmail(name: string | null, url: string) {
  const greeting = name ? `Chào ${name},` : "Chào bạn,";
  const after = `Link dùng được một lần, trong ${RESET_MINUTES} phút. Nếu bạn không yêu cầu, hãy bỏ qua thư này — mật khẩu hiện tại vẫn giữ nguyên.`;
  return {
    subject: "Đặt lại mật khẩu Embassy Hospitality",
    text: [
      greeting,
      "",
      "Có người vừa yêu cầu đặt lại mật khẩu cho tài khoản Embassy Hospitality gắn với email này.",
      `Đặt mật khẩu mới tại: ${url}`,
      "",
      after,
      "",
      "Embassy Language",
    ].join("\n"),
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#222;max-width:520px">
<p>${escapeHtml(greeting)}</p>
<p>Có người vừa yêu cầu đặt lại mật khẩu cho tài khoản <b>Embassy Hospitality</b> gắn với email này.</p>
<p><a href="${url}" style="display:inline-block;background:#b08d57;color:#fff;padding:12px 22px;text-decoration:none;border-radius:4px">Đặt mật khẩu mới</a></p>
<p style="font-size:13px;color:#666">${escapeHtml(after)}</p>
<p style="font-size:13px;color:#666">Embassy Language</p>
</div>`,
  };
}

/** Mails a link if the phone has an account with an email. Returns nothing
 *  either way: the page must answer the same for every phone. */
export async function startReset(phone: string, deps: ResetDeps): Promise<void> {
  const token = newResetToken();
  const to = await deps.request(phone, await sha256Hex(token), RESET_MINUTES);
  if (!to) return;
  const url = `${deps.origin}/dat-lai-mat-khau/${token}`;
  await deps.send({ to: to.email, ...resetEmail(to.full_name, url) });
}

export async function finishReset(
  token: string,
  password: string,
  deps: ResetDeps,
): Promise<{ phone: string | null }> {
  const claimed = await deps.claim(await sha256Hex(token));
  if (!claimed) {
    throw new Error("Link đã hết hạn hoặc đã được dùng. Hãy yêu cầu link mới.");
  }
  const refused = await deps.setPassword(claimed.user_id, password);
  if (refused) {
    // The password was refused, not the link: give the link back.
    await deps.release(claimed.token_id);
    throw new Error(refused);
  }
  const { phone } = await deps.finish(claimed.user_id);
  // The page signs them straight in with the password they just chose.
  const digits = (phone ?? "").replace(/^\+/, "");
  return { phone: digits ? `+${digits}` : null };
}

/** The real thing: Supabase (service role) and Resend. */
export async function supabaseResetDeps(): Promise<ResetDeps> {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { sendEmail } = await import("@/lib/email.server");
  const { logAdminAction } = await import("@/lib/account-provisioning.server");
  const fail = (what: string, message: string) => {
    console.error(what, message);
    throw new Error("Hệ thống đang bận, hãy thử lại sau ít phút.");
  };
  return {
    async request(phone, tokenHash, minutes) {
      const { data, error } = await supabaseAdmin.rpc("password_reset_request", {
        p_phone: phone,
        p_token_hash: tokenHash,
        p_minutes: minutes,
      });
      if (error) fail("password_reset_request", error.message);
      return data?.[0] ?? null;
    },
    async claim(tokenHash) {
      const { data, error } = await supabaseAdmin.rpc("password_reset_claim", {
        p_token_hash: tokenHash,
      });
      if (error) fail("password_reset_claim", error.message);
      return data?.[0] ?? null;
    },
    async release(tokenId) {
      await supabaseAdmin.from("password_reset_tokens").update({ used_at: null }).eq("id", tokenId);
    },
    async setPassword(userId, password) {
      const { error } = await supabaseAdmin.auth.admin.updateUserById(userId, { password });
      return error ? error.message : null;
    },
    async finish(userId) {
      const { data: profile } = await supabaseAdmin
        .from("profiles")
        .update({ must_change_password: false })
        .eq("id", userId)
        .select("phone, org_id")
        .single();
      await logAdminAction({
        actorId: userId,
        orgId: profile?.org_id ?? null,
        action: "member.reset_password_email",
        targetUserId: userId,
      });
      return { phone: profile?.phone ?? null };
    },
    send: sendEmail,
    origin: process.env.APP_ORIGIN || "https://hospitality.embassy.edu.vn",
  };
}
