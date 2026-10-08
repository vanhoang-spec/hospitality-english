import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { checkResetToken, resetPasswordWithToken } from "@/lib/password-reset-actions";

export const Route = createFileRoute("/dat-lai-mat-khau/$token")({
  head: () => ({ meta: [{ title: "Đặt lại mật khẩu — Embassy Hospitality" }] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { token } = Route.useParams();
  const navigate = useNavigate();
  const link = useQuery({
    queryKey: ["password-reset-link", token],
    queryFn: () => checkResetToken({ data: { token } }),
    retry: false,
    staleTime: Infinity,
  });
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Mật khẩu cần ít nhất 8 ký tự.");
      return;
    }
    if (password !== confirm) {
      setError("Mật khẩu nhập lại không khớp.");
      return;
    }
    setLoading(true);
    try {
      const { phone } = await resetPasswordWithToken({ data: { token, password } });
      setDone(true);
      if (phone) {
        const { error: signInError } = await supabase.auth.signInWithPassword({ phone, password });
        if (!signInError) navigate({ to: "/" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa đặt được mật khẩu, hãy thử lại.");
    } finally {
      setLoading(false);
    }
  }

  const invalid = link.isError || (link.isSuccess && !link.data.valid);

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm border border-primary/30 bg-card p-8 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Embassy Hospitality</div>
        <h1 className="font-display mt-2 text-3xl text-foreground">Đặt lại mật khẩu</h1>

        {link.isLoading ? (
          <p className="mt-4 text-sm text-foreground/60">Đang kiểm tra link…</p>
        ) : done ? (
          <p className="mt-4 text-sm text-foreground/75">
            Đã đặt mật khẩu mới.{" "}
            <Link to="/login" className="text-primary hover:underline">
              Đăng nhập
            </Link>{" "}
            bằng số điện thoại và mật khẩu vừa đặt.
          </p>
        ) : invalid ? (
          <div className="mt-4 space-y-3 text-sm text-foreground/75">
            <p>Link này đã hết hạn hoặc đã được dùng.</p>
            <p>
              <Link to="/quen-mat-khau" className="text-primary hover:underline">
                Yêu cầu link mới
              </Link>
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-4">
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                Mật khẩu mới (ít nhất 8 ký tự)
              </span>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full border border-primary/30 bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
              />
            </label>
            <label className="block">
              <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                Nhập lại mật khẩu
              </span>
              <input
                type="password"
                autoComplete="new-password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                className="mt-1 w-full border border-primary/30 bg-background px-4 py-3 text-foreground outline-none focus:border-primary"
              />
            </label>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {loading ? "Đang lưu…" : "Lưu mật khẩu mới"}
            </button>
          </form>
        )}
      </motion.div>
    </main>
  );
}
