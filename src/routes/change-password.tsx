import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { usePatchProfileCache, useProfile, useSession } from "@/lib/auth";
import { contactEmailProblem, optionalContactEmail } from "@/lib/contact-email";

export const Route = createFileRoute("/change-password")({
  head: () => ({ meta: [{ title: "Mật khẩu & email — Embassy Hospitality" }] }),
  component: ChangePasswordPage,
});

const INPUT =
  "mt-1 w-full border border-primary/30 bg-background px-4 py-3 text-foreground outline-none focus:border-primary";
const LABEL = "text-[10px] uppercase tracking-[0.25em] text-foreground/60";
const EMAIL_LABEL = "Email để tự lấy lại mật khẩu (không bắt buộc)";

/** The address a forgotten password is reset to. Read on its own, not in
 *  useProfile: every page loads that row, and a column the database does
 *  not have yet would break it for everyone. Here a failure only hides
 *  the email box. */
function useOwnEmail(userId: string | undefined) {
  return useQuery({
    queryKey: ["own-email", userId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("profiles")
        .select("email")
        .eq("id", userId as string)
        .single();
      if (error) throw error;
      return data.email ?? "";
    },
    enabled: !!userId,
    retry: false,
  });
}

async function saveOwnEmail(userId: string, raw: string) {
  const email = optionalContactEmail.parse(raw);
  const { error } = await supabase.from("profiles").update({ email }).eq("id", userId);
  if (error) throw new Error("Chưa lưu được email, hãy kiểm tra lại địa chỉ.");
}

function ChangePasswordPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const patchProfileCache = usePatchProfileCache();
  const { session } = useSession();
  const userId = session?.user.id;
  const { data: profile } = useProfile(userId);
  const ownEmail = useOwnEmail(userId);
  const forced = !!profile?.must_change_password;

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (ownEmail.data !== undefined) setEmail(ownEmail.data);
  }, [ownEmail.data]);

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
    const emailProblem = forced ? contactEmailProblem(email) : null;
    if (emailProblem) {
      setError(emailProblem);
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
        // First login: the email box sits in this form, saved with it.
        if (forced && ownEmail.isSuccess && email.trim() !== ownEmail.data) {
          await saveOwnEmail(uid, email).catch(() => undefined);
          await queryClient.invalidateQueries({ queryKey: ["own-email", uid] });
        }
      }
      navigate({ to: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đổi mật khẩu thất bại.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm border border-primary/30 bg-card p-8 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Bảo mật tài khoản</div>
        <h1 className="font-display mt-2 text-3xl text-foreground">Đặt mật khẩu mới</h1>
        <p className="mt-2 text-sm text-foreground/70">
          {forced
            ? "Mật khẩu của bạn vừa được quản trị viên cấp lại. Vui lòng đặt mật khẩu mới trước khi tiếp tục."
            : "Mật khẩu dùng để đăng nhập cùng số điện thoại của bạn."}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className={LABEL}>Mật khẩu mới</span>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={INPUT}
            />
          </label>
          <label className="block">
            <span className={LABEL}>Nhập lại mật khẩu</span>
            <input
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={INPUT}
            />
          </label>
          {forced && ownEmail.isSuccess && (
            <label className="block">
              <span className={LABEL}>{EMAIL_LABEL}</span>
              <input
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ten@gmail.com"
                className={INPUT}
              />
            </label>
          )}

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {loading ? "Đang lưu…" : "Lưu mật khẩu mới"}
          </button>
        </form>

        {!forced && userId && ownEmail.isSuccess && (
          <EmailForm
            userId={userId}
            saved={ownEmail.data}
            onSaved={() => queryClient.invalidateQueries({ queryKey: ["own-email", userId] })}
          />
        )}
      </motion.div>
    </main>
  );
}

function EmailForm({
  userId,
  saved,
  onSaved,
}: {
  userId: string;
  saved: string;
  onSaved: () => void;
}) {
  const [email, setEmail] = useState(saved);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    const problem = contactEmailProblem(email);
    if (problem) {
      setError(problem);
      return;
    }
    setStatus("saving");
    try {
      await saveOwnEmail(userId, email);
      setStatus("saved");
      onSaved();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Chưa lưu được email.");
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-4 border-t border-primary/20 pt-6">
      <label className="block">
        <span className={LABEL}>{EMAIL_LABEL}</span>
        <input
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus("idle");
          }}
          placeholder="ten@gmail.com"
          className={INPUT}
        />
      </label>
      <p className="text-xs text-foreground/60">
        Quên mật khẩu thì bấm “Quên mật khẩu?” ở trang đăng nhập — link đặt lại sẽ gửi về email này.
      </p>
      {error && <p className="text-sm text-red-400">{error}</p>}
      {status === "saved" && <p className="text-sm text-primary">Đã lưu email.</p>}
      <button
        type="submit"
        disabled={status === "saving"}
        className="w-full border border-primary/40 py-3 text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary/10 disabled:opacity-60"
      >
        {status === "saving" ? "Đang lưu…" : "Lưu email"}
      </button>
    </form>
  );
}
