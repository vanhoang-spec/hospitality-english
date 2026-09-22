import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useProfile } from "@/lib/auth";
import { createOrganization, setSubscription } from "@/lib/platform-admin-actions";
import { PLAN_LABEL, TERM_LABEL } from "@/lib/subscription";

export const Route = createFileRoute("/admin-console")({
  head: () => ({ meta: [{ title: "Bảng điều khiển nền tảng" }] }),
  component: AdminConsolePage,
});

const PLANS = ["p50", "p100", "p200", "p300", "p500"] as const;
const TERMS = ["trial", "m3", "m6", "m9", "m12"] as const;

type OrgRow = {
  id: string;
  name: string;
  seat_limit: number;
  members: number;
  admins: number;
  planCode: string | null;
  kind: string | null;
  endsAt: string | null;
};

function AdminConsolePage() {
  const { session } = useSession();
  const { data: profile } = useProfile(session?.user.id);
  const isSuper = profile?.role === "super_admin";
  const qc = useQueryClient();

  const [name, setName] = useState("");
  const [planCode, setPlanCode] = useState<(typeof PLANS)[number]>("p100");
  const [term, setTerm] = useState<(typeof TERMS)[number]>("trial");
  const [hrName, setHrName] = useState("");
  const [hrPhone, setHrPhone] = useState("");
  const [hrPassword, setHrPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const { data: orgs, isLoading } = useQuery({
    queryKey: ["platform-orgs"] as const,
    queryFn: async (): Promise<OrgRow[]> => {
      const [{ data: organizations }, { data: profiles }, { data: subs }] = await Promise.all([
        supabase.from("organizations").select("id, name, seat_limit").order("name"),
        supabase.from("profiles").select("org_id, role"),
        supabase
          .from("subscriptions")
          .select("org_id, plan_code, kind, ends_at, status")
          .eq("status", "active"),
      ]);
      const counts = new Map<string, { members: number; admins: number }>();
      for (const p of profiles ?? []) {
        if (!p.org_id) continue;
        const c = counts.get(p.org_id) ?? { members: 0, admins: 0 };
        if (p.role === "member") c.members++;
        if (p.role === "org_admin") c.admins++;
        counts.set(p.org_id, c);
      }
      const subByOrg = new Map((subs ?? []).map((s) => [s.org_id, s]));
      return (organizations ?? []).map((o) => {
        const sub = subByOrg.get(o.id);
        const c = counts.get(o.id) ?? { members: 0, admins: 0 };
        return {
          id: o.id,
          name: o.name,
          seat_limit: o.seat_limit,
          members: c.members,
          admins: c.admins,
          planCode: sub?.plan_code ?? null,
          kind: sub?.kind ?? null,
          endsAt: sub?.ends_at ?? null,
        };
      });
    },
    enabled: isSuper,
  });

  const create = useMutation({
    mutationFn: () =>
      createOrganization({
        data: {
          name,
          planCode,
          term,
          hrFullName: hrName,
          hrPhone,
          hrPassword,
        },
      }),
    onSuccess: () => {
      setMessage(`Đã tạo "${name}" và tài khoản HR. Mật khẩu tạm phải đổi ở lần đăng nhập đầu.`);
      setName("");
      setHrName("");
      setHrPhone("");
      setHrPassword("");
      qc.invalidateQueries({ queryKey: ["platform-orgs"] });
    },
    onError: (e: Error) => setMessage(e.message),
  });

  const renew = useMutation({
    mutationFn: (v: {
      orgId: string;
      planCode: (typeof PLANS)[number];
      term: (typeof TERMS)[number];
    }) => setSubscription({ data: { ...v, startNow: false } }),
    onSuccess: () => {
      setMessage("Đã cập nhật gói.");
      qc.invalidateQueries({ queryKey: ["platform-orgs"] });
    },
    onError: (e: Error) => setMessage(e.message),
  });

  if (!profile) return <Shell>Đang tải…</Shell>;
  if (!isSuper) return <Shell>Trang này chỉ dành cho quản trị nền tảng.</Shell>;

  return (
    <Shell>
      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Nền tảng</div>
      <h1 className="font-display mt-2 text-3xl">Khách sạn &amp; gói thuê bao</h1>

      {message && (
        <p className="mt-4 border border-primary/40 bg-card p-3 text-sm text-foreground/85">
          {message}
        </p>
      )}

      <section className="mt-8 overflow-x-auto border border-primary/20">
        <table className="w-full min-w-[820px] text-sm">
          <thead className="bg-card text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            <tr>
              <th className="px-3 py-2 text-left">Khách sạn</th>
              <th className="px-3 py-2 text-right">Học viên / ghế</th>
              <th className="px-3 py-2 text-right">HR</th>
              <th className="px-3 py-2 text-left">Gói</th>
              <th className="px-3 py-2 text-left">Hết hạn</th>
              <th className="px-3 py-2 text-left">Gia hạn</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={6} className="px-3 py-6 text-center text-foreground/60">
                  Đang tải…
                </td>
              </tr>
            )}
            {(orgs ?? []).map((o) => {
              const days = o.endsAt
                ? Math.ceil((new Date(o.endsAt).getTime() - Date.now()) / 86_400_000)
                : null;
              return (
                <tr key={o.id} className="border-t border-primary/10">
                  <td className="px-3 py-2">{o.name}</td>
                  <td className="px-3 py-2 text-right">
                    {o.members}/{o.seat_limit}
                  </td>
                  <td className="px-3 py-2 text-right">{o.admins}</td>
                  <td className="px-3 py-2">
                    {o.planCode ? (PLAN_LABEL[o.planCode] ?? o.planCode) : "—"}
                    {o.kind ? (
                      <span className="text-foreground/50"> · {TERM_LABEL[o.kind] ?? o.kind}</span>
                    ) : null}
                  </td>
                  <td className="px-3 py-2">
                    {o.endsAt ? (
                      <span className={days !== null && days < 15 ? "text-destructive" : ""}>
                        {new Date(o.endsAt).toLocaleDateString("vi-VN")}
                        {days !== null ? ` (${days} ngày)` : ""}
                      </span>
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="px-3 py-2">
                    <RenewCell
                      onRenew={(p, t) => renew.mutate({ orgId: o.id, planCode: p, term: t })}
                      currentPlan={(o.planCode as (typeof PLANS)[number]) ?? "p100"}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      <section className="mt-8 border border-primary/20 bg-card p-5">
        <h2 className="text-sm uppercase tracking-[0.2em] text-primary">Thêm khách sạn mới</h2>
        <p className="mt-2 text-sm text-foreground/70">
          Tạo tổ chức, gán gói, và mở một tài khoản HR đầu tiên. HR sẽ tự thêm học viên.
        </p>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Field label="Tên khách sạn" value={name} onChange={setName} />
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">Gói</label>
            <div className="mt-1 flex gap-2">
              <select
                value={planCode}
                onChange={(e) => setPlanCode(e.target.value as (typeof PLANS)[number])}
                className="w-full border border-primary/30 bg-background px-3 py-2 text-sm"
              >
                {PLANS.map((p) => (
                  <option key={p} value={p}>
                    {PLAN_LABEL[p]}
                  </option>
                ))}
              </select>
              <select
                value={term}
                onChange={(e) => setTerm(e.target.value as (typeof TERMS)[number])}
                className="w-full border border-primary/30 bg-background px-3 py-2 text-sm"
              >
                {TERMS.map((t) => (
                  <option key={t} value={t}>
                    {TERM_LABEL[t]}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <Field label="Tên người phụ trách (HR)" value={hrName} onChange={setHrName} />
          <Field label="Số điện thoại HR" value={hrPhone} onChange={setHrPhone} />
          <Field
            label="Mật khẩu tạm (ít nhất 8 ký tự)"
            value={hrPassword}
            onChange={setHrPassword}
          />
        </div>
        <button
          disabled={create.isPending}
          onClick={() => create.mutate()}
          className="mt-5 bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-50"
        >
          {create.isPending ? "Đang tạo…" : "Tạo khách sạn"}
        </button>
      </section>
    </Shell>
  );
}

function RenewCell({
  currentPlan,
  onRenew,
}: {
  currentPlan: (typeof PLANS)[number];
  onRenew: (plan: (typeof PLANS)[number], term: (typeof TERMS)[number]) => void;
}) {
  const [plan, setPlan] = useState(currentPlan);
  const [term, setTerm] = useState<(typeof TERMS)[number]>("m12");
  return (
    <div className="flex items-center gap-2">
      <select
        value={plan}
        onChange={(e) => setPlan(e.target.value as (typeof PLANS)[number])}
        className="border border-primary/30 bg-background px-2 py-1 text-xs"
      >
        {PLANS.map((p) => (
          <option key={p} value={p}>
            {PLAN_LABEL[p]}
          </option>
        ))}
      </select>
      <select
        value={term}
        onChange={(e) => setTerm(e.target.value as (typeof TERMS)[number])}
        className="border border-primary/30 bg-background px-2 py-1 text-xs"
      >
        {TERMS.map((t) => (
          <option key={t} value={t}>
            {TERM_LABEL[t]}
          </option>
        ))}
      </select>
      <button
        onClick={() => onRenew(plan, term)}
        className="border border-primary/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] hover:border-primary"
      >
        Áp dụng
      </button>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">{label}</label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full border border-primary/30 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
      />
    </div>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>;
}
