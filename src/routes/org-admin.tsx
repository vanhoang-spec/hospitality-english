import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useProfile } from "@/lib/auth";
import { createMember, deleteMember, resetMemberPassword, updateMemberRole } from "@/lib/org-admin-actions";
import { formatPhoneDisplay } from "@/lib/phone";
import { DEPARTMENTS } from "@/lib/departments";
import { AVAILABLE_WEEKS } from "@/lib/content/week-content";

export const Route = createFileRoute("/org-admin")({
  head: () => ({ meta: [{ title: "Team — Embassy Language" }] }),
  component: OrgAdminPage,
});

type Member = {
  id: string;
  full_name: string | null;
  phone: string | null;
  role: "member" | "org_admin" | "super_admin";
  service_stars: number;
  daily_streak: number;
};

type Org = { id: string; name: string; seat_limit: number };

const SUITES = ["vocab", "grammar", "speaking", "reading", "arcade"] as const;
const SUITE_LABELS: Record<(typeof SUITES)[number], string> = {
  vocab: "Vocab",
  grammar: "Grammar",
  speaking: "Speaking",
  reading: "Reading",
  arcade: "Arcade",
};

function OrgAdminPage() {
  const { session, loading: sessionLoading } = useSession();
  const userId = session?.user.id;
  const { data: profile, isLoading: profileLoading } = useProfile(userId);

  if (sessionLoading || profileLoading) return <CenteredNote text="Đang tải…" />;
  if (!profile) return <CenteredNote text="Không tìm thấy hồ sơ." />;
  if (profile.role !== "org_admin" || !profile.org_id) {
    return <CenteredNote text="Trang này chỉ dành cho quản trị viên của một nhóm." />;
  }

  return <Dashboard orgId={profile.org_id} selfId={userId as string} />;
}

function CenteredNote({ text }: { text: string }) {
  return (
    <main className="mx-auto max-w-3xl px-6 py-24 text-center">
      <p className="text-sm text-foreground/70">{text}</p>
    </main>
  );
}

function Dashboard({ orgId, selfId }: { orgId: string; selfId: string }) {
  const queryClient = useQueryClient();
  const [drawerUserId, setDrawerUserId] = useState<string | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [credentialNotice, setCredentialNotice] = useState<{ title: string; lines: string[] } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [confirmState, setConfirmState] = useState<{ message: string; danger?: boolean; onConfirm: () => void } | null>(null);

  const orgQuery = useQuery({
    queryKey: ["org", orgId],
    queryFn: async (): Promise<Org> => {
      const { data, error } = await supabase
        .from("organizations")
        .select("id, name, seat_limit")
        .eq("id", orgId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  const membersQuery = useQuery({
    queryKey: ["org-members", orgId],
    queryFn: async (): Promise<Member[]> => {
      const { data, error } = await supabase
        .from("profiles")
        .select("id, full_name, phone, role, service_stars, daily_streak")
        .eq("org_id", orgId)
        .order("role", { ascending: false })
        .order("full_name", { ascending: true });
      if (error) throw error;
      return data as Member[];
    },
  });

  function invalidateMembers() {
    queryClient.invalidateQueries({ queryKey: ["org-members", orgId] });
  }

  const deleteMut = useMutation({
    mutationFn: (userId: string) => deleteMember({ data: { userId } }),
    onSuccess: invalidateMembers,
    onError: (e: Error) => setErrorMsg(e.message),
  });

  const roleMut = useMutation({
    mutationFn: (vars: { userId: string; role: "member" | "org_admin" }) => updateMemberRole({ data: vars }),
    onSuccess: invalidateMembers,
    onError: (e: Error) => setErrorMsg(e.message),
  });

  const members = membersQuery.data ?? [];
  const seatLimit = orgQuery.data?.seat_limit ?? 0;
  const orgName = orgQuery.data?.name ?? "";

  function handleReset(m: Member) {
    setConfirmState({
      message: `Cấp lại mật khẩu tạm cho ${m.full_name ?? "thành viên này"}?`,
      onConfirm: async () => {
        try {
          const res = await resetMemberPassword({ data: { userId: m.id } });
          setCredentialNotice({
            title: `Mật khẩu tạm cho ${m.full_name ?? ""}`,
            lines: [`SĐT đăng nhập: ${formatPhoneDisplay(m.phone)}`, `Mật khẩu tạm: ${res.tempPassword}`, "Thành viên sẽ được yêu cầu đổi mật khẩu ở lần đăng nhập tới."],
          });
        } catch (e) {
          setErrorMsg(e instanceof Error ? e.message : "Cấp lại mật khẩu thất bại.");
        }
      },
    });
  }

  function handleDelete(m: Member) {
    setConfirmState({
      message: `Xóa vĩnh viễn ${m.full_name ?? "thành viên này"}? Toàn bộ tiến độ học sẽ mất và không thể khôi phục.`,
      danger: true,
      onConfirm: () => deleteMut.mutate(m.id),
    });
  }

  function handleToggleRole(m: Member) {
    const next = m.role === "org_admin" ? "member" : "org_admin";
    const verb = next === "org_admin" ? "thăng cấp lên Admin" : "hạ xuống Thành viên thường";
    setConfirmState({
      message: `${verb} cho ${m.full_name ?? "người này"}?`,
      onConfirm: () => roleMut.mutate({ userId: m.id, role: next }),
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-6 py-12 md:px-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-[0.3em] text-primary">Team</div>
          <h1 className="font-display mt-2 text-4xl text-foreground">{orgName || "Nhóm của bạn"}</h1>
          <p className="mt-1 text-sm text-foreground/60">
            {members.length}/{seatLimit} thành viên
          </p>
        </div>
        <button
          onClick={() => setAddOpen(true)}
          className="bg-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
        >
          + Thêm thành viên
        </button>
      </div>

      {errorMsg && (
        <div className="mt-4 flex items-start justify-between gap-4 border border-destructive/50 bg-destructive/10 px-4 py-3 text-sm text-destructive">
          <span>{errorMsg}</span>
          <button className="shrink-0 underline" onClick={() => setErrorMsg(null)}>
            Đóng
          </button>
        </div>
      )}

      <div className="mt-8 overflow-x-auto border border-primary/30 bg-card shadow-xl">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-primary/20 text-left text-[10px] uppercase tracking-[0.2em] text-foreground/60">
              <th className="px-4 py-3">Tên</th>
              <th className="px-4 py-3">SĐT</th>
              <th className="px-4 py-3">Vai trò</th>
              <th className="px-4 py-3">Sao</th>
              <th className="px-4 py-3">Streak</th>
              <th className="px-4 py-3 text-right">Hành động</th>
            </tr>
          </thead>
          <tbody>
            {membersQuery.isLoading && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-foreground/50">
                  Đang tải…
                </td>
              </tr>
            )}
            {!membersQuery.isLoading && members.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-foreground/50">
                  Chưa có thành viên nào.
                </td>
              </tr>
            )}
            {members.map((m) => (
              <tr key={m.id} className="border-b border-primary/10 last:border-0">
                <td className="px-4 py-3">
                  <button
                    className="text-left font-display text-foreground hover:text-primary"
                    onClick={() => setDrawerUserId(m.id)}
                  >
                    {m.full_name || "—"}
                  </button>
                </td>
                <td className="px-4 py-3 text-foreground/70">{formatPhoneDisplay(m.phone)}</td>
                <td className="px-4 py-3">
                  <span className={m.role === "org_admin" ? "text-primary" : "text-foreground/60"}>
                    {m.role === "org_admin" ? "Admin" : "Thành viên"}
                  </span>
                </td>
                <td className="px-4 py-3">{m.service_stars} ⭐</td>
                <td className="px-4 py-3">{m.daily_streak} ngày</td>
                <td className="px-4 py-3 text-right whitespace-nowrap">
                  <div className="flex justify-end gap-3 text-xs uppercase tracking-[0.15em]">
                    <button
                      className="text-foreground/60 hover:text-primary disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={() => handleToggleRole(m)}
                      disabled={m.id === selfId || roleMut.isPending}
                    >
                      {m.role === "org_admin" ? "Hạ quyền" : "Thăng Admin"}
                    </button>
                    <button className="text-foreground/60 hover:text-primary" onClick={() => handleReset(m)}>
                      Reset MK
                    </button>
                    <button
                      className="text-destructive/80 hover:text-destructive disabled:cursor-not-allowed disabled:opacity-30"
                      onClick={() => handleDelete(m)}
                      disabled={m.id === selfId || deleteMut.isPending}
                    >
                      Xóa
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {addOpen && (
        <AddMemberDialog
          orgId={orgId}
          onClose={() => setAddOpen(false)}
          onCreated={(name, phone, password) => {
            setAddOpen(false);
            invalidateMembers();
            setCredentialNotice({
              title: `Tài khoản mới: ${name}`,
              lines: [`SĐT đăng nhập: ${phone}`, `Mật khẩu: ${password}`],
            });
          }}
          onError={setErrorMsg}
        />
      )}

      {credentialNotice && <CredentialNotice info={credentialNotice} onClose={() => setCredentialNotice(null)} />}

      {confirmState && (
        <ConfirmDialog
          message={confirmState.message}
          danger={confirmState.danger}
          onCancel={() => setConfirmState(null)}
          onConfirm={() => {
            confirmState.onConfirm();
            setConfirmState(null);
          }}
        />
      )}

      {drawerUserId && (
        <MemberDrawer
          userId={drawerUserId}
          member={members.find((m) => m.id === drawerUserId) ?? null}
          onClose={() => setDrawerUserId(null)}
        />
      )}
    </main>
  );
}

function generateTempPassword(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789";
  let out = "";
  for (let i = 0; i < 10; i++) out += chars[Math.floor(Math.random() * chars.length)];
  return out;
}

function AddMemberDialog({
  orgId,
  onClose,
  onCreated,
  onError,
}: {
  orgId: string;
  onClose: () => void;
  onCreated: (name: string, phone: string, password: string) => void;
  onError: (msg: string) => void;
}) {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState(generateTempPassword());
  const [role, setRole] = useState<"member" | "org_admin">("member");
  const [submitting, setSubmitting] = useState(false);

  const createMut = useMutation({
    mutationFn: () => createMember({ data: { fullName, phone, password, role } }),
  });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await createMut.mutateAsync();
      onCreated(fullName, phone, password);
    } catch (e) {
      onError(e instanceof Error ? e.message : "Tạo thành viên thất bại.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
      <form
        onSubmit={submit}
        className="w-full max-w-md border border-primary/40 bg-card p-6 shadow-2xl"
      >
        <h2 className="font-display text-2xl text-foreground">Thêm thành viên</h2>
        <div className="mt-5 space-y-4">
          <Field label="Họ tên">
            <input
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full border border-primary/30 bg-background/40 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Số điện thoại">
            <input
              required
              placeholder="0912345678"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-primary/30 bg-background/40 px-3 py-2 text-sm outline-none focus:border-primary"
            />
          </Field>
          <Field label="Mật khẩu tạm">
            <div className="flex gap-2">
              <input
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-primary/30 bg-background/40 px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                type="button"
                onClick={() => setPassword(generateTempPassword())}
                className="shrink-0 border border-primary/40 px-3 text-xs uppercase tracking-[0.15em] text-primary hover:bg-primary/10"
              >
                Tạo mới
              </button>
            </div>
          </Field>
          <Field label="Vai trò">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value as "member" | "org_admin")}
              className="w-full border border-primary/30 bg-background/40 px-3 py-2 text-sm outline-none focus:border-primary"
            >
              <option value="member">Thành viên</option>
              <option value="org_admin">Admin</option>
            </select>
          </Field>
        </div>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={onClose} className="px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground">
            Hủy
          </button>
          <button
            type="submit"
            disabled={submitting}
            className="bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl disabled:opacity-50"
          >
            {submitting ? "Đang tạo…" : "Tạo tài khoản"}
          </button>
        </div>
      </form>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[10px] uppercase tracking-[0.2em] text-foreground/60">{label}</span>
      <div className="mt-1.5">{children}</div>
    </label>
  );
}

function CredentialNotice({ info, onClose }: { info: { title: string; lines: string[] }; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-md border border-primary bg-card p-6 shadow-2xl">
        <h2 className="font-display text-xl text-foreground">{info.title}</h2>
        <div className="mt-4 space-y-2 border border-primary/20 bg-background/40 p-4 font-mono text-sm">
          {info.lines.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </div>
        <p className="mt-3 text-xs text-foreground/60">Ghi lại thông tin này ngay — sẽ không hiển thị lại.</p>
        <div className="mt-5 flex justify-end">
          <button onClick={onClose} className="bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl">
            Đã ghi lại
          </button>
        </div>
      </div>
    </div>
  );
}

function ConfirmDialog({
  message,
  danger,
  onCancel,
  onConfirm,
}: {
  message: string;
  danger?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-background/80 px-4 backdrop-blur-sm">
      <div className="w-full max-w-sm border border-primary/40 bg-card p-6 shadow-2xl">
        <p className="text-sm text-foreground">{message}</p>
        <div className="mt-6 flex justify-end gap-3">
          <button onClick={onCancel} className="px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground">
            Hủy
          </button>
          <button
            onClick={onConfirm}
            className={
              danger
                ? "bg-destructive px-5 py-2 text-xs uppercase tracking-[0.2em] text-destructive-foreground shadow-xl"
                : "bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
            }
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}

type ProgressRow = { department_id: string; week_number: number; suite: string; stars: number };
type Metrics = { fluency_score: number; courtesy_score: number; reflex_speed: number; crisis_handling_score: number };

function MemberDrawer({ userId, member, onClose }: { userId: string; member: Member | null; onClose: () => void }) {
  const progressQuery = useQuery({
    queryKey: ["member-progress", userId],
    queryFn: async (): Promise<ProgressRow[]> => {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("department_id, week_number, suite, stars")
        .eq("user_id", userId);
      if (error) throw error;
      return data as ProgressRow[];
    },
  });

  const metricsQuery = useQuery({
    queryKey: ["member-metrics", userId],
    queryFn: async (): Promise<Metrics | null> => {
      const { data, error } = await supabase
        .from("performance_metrics")
        .select("fluency_score, courtesy_score, reflex_speed, crisis_handling_score")
        .eq("profile_id", userId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const rows = progressQuery.data ?? [];
  const doneKey = new Set(rows.filter((r) => r.stars > 0).map((r) => `${r.department_id}-${r.week_number}-${r.suite}`));
  const m = metricsQuery.data;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-background/70 backdrop-blur-sm">
      <div className="h-full w-full max-w-2xl overflow-y-auto border-l border-primary/40 bg-card p-6 shadow-2xl md:p-8">
        <div className="flex items-start justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-primary">Tiến độ học</div>
            <h2 className="font-display mt-2 text-3xl text-foreground">{member?.full_name || "Thành viên"}</h2>
          </div>
          <button onClick={onClose} className="text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground">
            Đóng ✕
          </button>
        </div>

        {m && (
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <MetricBar label="Fluency" value={m.fluency_score} />
            <MetricBar label="Courtesy" value={m.courtesy_score} />
            <MetricBar label="Reflex" value={Math.round(m.reflex_speed)} />
            <MetricBar label="Crisis" value={m.crisis_handling_score} />
          </div>
        )}

        <div className="mt-8">
          <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
            Ma trận hoàn thành · {AVAILABLE_WEEKS.length} tuần hiện có
          </div>
          {progressQuery.isLoading ? (
            <p className="mt-4 text-sm text-foreground/50">Đang tải…</p>
          ) : (
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-collapse text-xs">
                <thead>
                  <tr>
                    <th className="sticky left-0 bg-card px-2 py-1.5 text-left uppercase tracking-[0.1em] text-foreground/60">
                      Phòng ban
                    </th>
                    {AVAILABLE_WEEKS.map((w) => (
                      <th key={w} colSpan={SUITES.length} className="border-l border-primary/10 px-1 py-1.5 text-center uppercase tracking-[0.1em] text-foreground/60">
                        Tuần {w}
                      </th>
                    ))}
                  </tr>
                  <tr>
                    <th className="sticky left-0 bg-card px-2 py-1"></th>
                    {AVAILABLE_WEEKS.map((w) =>
                      SUITES.map((s) => (
                        <th key={`${w}-${s}`} className="border-l border-primary/5 px-1 py-1 text-center font-normal text-foreground/40" title={SUITE_LABELS[s]}>
                          {SUITE_LABELS[s][0]}
                        </th>
                      )),
                    )}
                  </tr>
                </thead>
                <tbody>
                  {DEPARTMENTS.map((d) => (
                    <tr key={d.code} className="border-t border-primary/10">
                      <td className="sticky left-0 bg-card px-2 py-1.5 font-display text-foreground">{d.code}</td>
                      {AVAILABLE_WEEKS.map((w) =>
                        SUITES.map((s) => {
                          const done = doneKey.has(`${d.code}-${w}-${s}`);
                          return (
                            <td key={`${d.code}-${w}-${s}`} className="border-l border-primary/5 px-1 py-1.5 text-center">
                              <span className={done ? "text-primary" : "text-foreground/15"}>{done ? "●" : "○"}</span>
                            </td>
                          );
                        }),
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MetricBar({ label, value }: { label: string; value: number }) {
  const clamped = Math.max(0, Math.min(100, value));
  return (
    <div className="border border-primary/20 p-3">
      <div className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">{label}</div>
      <div className="font-display mt-1 text-xl text-primary">{clamped}%</div>
      <div className="mt-2 h-1 w-full bg-primary/15">
        <div className="h-1 bg-primary" style={{ width: `${clamped}%` }} />
      </div>
    </div>
  );
}
