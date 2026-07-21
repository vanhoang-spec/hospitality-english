import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { usePatchProfileCache } from "@/lib/auth";

export const Route = createFileRoute("/change-password")({
  head: () => ({ meta: [{ title: "Đổi mật khẩu — Embassy Hospitality" }] }),
  component: ChangePasswordPage,
});

function ChangePasswordPage() {
  const navigate = useNavigate();
  const patchProfileCache = usePatchProfileCache();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

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
      const { data: updated, error: updateErr } = await supabase.auth.updateUser({ password });
      if (updateErr) throw new Error(updateErr.message);

      const uid = updated.user?.id;
      if (uid) {
        await supabase.from("profiles").update({ must_change_password: false }).eq("id", uid);
        patchProfileCache(uid, { must_change_password: false });
      }
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đổi mật khẩu thất bại.");
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
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Bảo mật tài khoản</div>
        <h1 className="font-display mt-2 text-3xl text-foreground">Đặt mật khẩu mới</h1>
        <p className="mt-2 text-sm text-foreground/70">
          Mật khẩu của bạn vừa được quản trị viên cấp lại. Vui lòng đặt mật khẩu mới trước khi tiếp tục.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Mật khẩu mới</span>
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
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Nhập lại mật khẩu</span>
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
      </motion.div>
    </main>
  );
}
