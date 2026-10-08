// A learner who forgot their password asks for a link by phone number,
// and it goes to the email on their profile (migration 20261008150000;
// the steps themselves are in password-reset.server.ts).
//
// All three functions are public — the person is, by definition, not
// signed in — so each gives away as little as it can. Asking for a link
// answers the same whether or not the phone has an account or an email.
// A link is looked up only by the sha256 of its token; the token itself
// exists in the email and nowhere else.
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { normalizeVNPhone } from "@/lib/phone";

/** How long a reset link works. Here, not in password-reset.server.ts,
 *  because the pages say it too. */
export const RESET_MINUTES = 30;

const TOKEN = z.string().trim().min(32).max(64);

export const requestPasswordReset = createServerFn({ method: "POST" })
  .inputValidator(z.object({ phone: z.string().trim().min(1).max(30) }))
  .handler(async ({ data }) => {
    let phone: string;
    try {
      phone = normalizeVNPhone(data.phone);
    } catch {
      throw new Error("Số điện thoại không hợp lệ.");
    }
    const { startReset, supabaseResetDeps } = await import("@/lib/password-reset.server");
    await startReset(phone, await supabaseResetDeps());
    return { ok: true as const };
  });

export const checkResetToken = createServerFn({ method: "POST" })
  .inputValidator(z.object({ token: TOKEN }))
  .handler(async ({ data }) => {
    const { sha256Hex } = await import("@/lib/password-reset.server");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row } = await supabaseAdmin
      .from("password_reset_tokens")
      .select("id")
      .eq("token_hash", await sha256Hex(data.token))
      .is("used_at", null)
      .gt("expires_at", new Date().toISOString())
      .maybeSingle();
    return { valid: !!row };
  });

export const resetPasswordWithToken = createServerFn({ method: "POST" })
  .inputValidator(
    z.object({
      token: TOKEN,
      password: z.string().min(8, "Mật khẩu cần ít nhất 8 ký tự.").max(72),
    }),
  )
  .handler(async ({ data }) => {
    const { finishReset, supabaseResetDeps } = await import("@/lib/password-reset.server");
    return finishReset(data.token, data.password, await supabaseResetDeps());
  });
