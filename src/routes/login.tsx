import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Đăng nhập — Embassy Hospitality" }] }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      let normalized: string;
      try {
        normalized = normalizeVNPhone(phone);
      } catch (e) {
        throw new Error(e instanceof InvalidPhoneError ? e.message : "Số điện thoại không hợp lệ.");
      }

      const { error: signInError } = await supabase.auth.signInWithPassword({
        phone: normalized,
        password,
      });
      if (signInError) {
        throw new Error(
          /invalid.*(credentials|login)/i.test(signInError.message)
            ? "Số điện thoại hoặc mật khẩu không đúng."
            : signInError.message,
        );
      }
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm border border-primary/30 bg-card p-8 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Embassy Hospitality</div>
        <h1 className="font-display mt-2 text-3xl text-foreground">Đăng nhập</h1>
        <p className="mt-2 text-sm text-foreground/70">
          Nhập số điện thoại và mật khẩu do quản trị viên nhóm của bạn cấp.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Số điện thoại</span>
            <input
              type="tel"
              autoComplete="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="0912345678"
              className="mt-1 w-full border border-primary/30 bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
            />
          </label>
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Mật khẩu</span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-primary/30 bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
            />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Đang đăng nhập…" : "Đăng nhập"}
          </button>
        </form>

        <p className="mt-6 text-center text-xs text-foreground/50">
          Quên mật khẩu? Liên hệ quản trị viên nhóm của bạn để được cấp lại.
        </p>
      </motion.div>
    </main>
  );
}
