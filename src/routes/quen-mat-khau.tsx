import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";
import { requestPasswordReset, RESET_MINUTES } from "@/lib/password-reset-actions";

export const Route = createFileRoute("/quen-mat-khau")({
  head: () => ({ meta: [{ title: "Quên mật khẩu — Embassy Hospitality" }] }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  const [phone, setPhone] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    let normalized: string;
    try {
      normalized = normalizeVNPhone(phone);
    } catch (err) {
      setError(err instanceof InvalidPhoneError ? err.message : "Số điện thoại không hợp lệ.");
      return;
    }
    setLoading(true);
    try {
      await requestPasswordReset({ data: { phone: normalized } });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa gửi được, hãy thử lại sau ít phút.");
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
        <h1 className="font-display mt-2 text-3xl text-foreground">Quên mật khẩu</h1>

        {sent ? (
          <div className="mt-4 space-y-3 text-sm text-foreground/75">
            <p>
              Nếu số điện thoại này đã gắn email, link đặt lại mật khẩu vừa được gửi tới email đó.
              Link dùng được một lần, trong {RESET_MINUTES} phút.
            </p>
            <p>
              Không thấy thư sau vài phút? Xem cả mục Spam / Quảng cáo. Tài khoản chưa gắn email thì
              nhờ bộ phận Nhân sự cấp lại mật khẩu.
            </p>
          </div>
        ) : (
          <>
            <p className="mt-2 text-sm text-foreground/70">
              Nhập số điện thoại bạn dùng để đăng nhập. Link đặt lại mật khẩu sẽ được gửi tới email
              đã gắn với tài khoản.
            </p>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              <label className="block">
                <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
                  Số điện thoại
                </span>
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

              {error && <p className="text-sm text-red-400">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {loading ? "Đang gửi…" : "Gửi link qua email"}
              </button>
            </form>
          </>
        )}

        <p className="mt-6 text-center text-xs text-foreground/50">
          <Link to="/login" className="text-primary hover:underline">
            Quay lại đăng nhập
          </Link>
        </p>
      </motion.div>
    </main>
  );
}
