import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useProfile } from "@/lib/auth";
import { createOrganization, setSubscription, setPlanPrice } from "@/lib/platform-admin-actions";
import {
  PLAN_LABEL,
  TERM_LABEL,
  usePlanPrices,
  planPriceKey,
  formatMoney,
} from "@/lib/subscription";

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
  // Giá thực thu của hợp đồng này. Để trống = lấy đúng giá niêm yết;
  // điền số = bán có chiết khấu, và số đó mới là số đi vào hợp đồng.
  const [priceOverride, setPriceOverride] = useState("");

  const { data: prices } = usePlanPrices();
  const listed = prices?.get(planPriceKey(planCode, term));

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
          price: priceOverride.trim() === "" ? null : Number(priceOverride.replace(/[^\d]/g, "")),
        },
      }),
    onSuccess: () => {
      setMessage(`Đã tạo "${name}" và tài khoản HR. Mật khẩu tạm phải đổi ở lần đăng nhập đầu.`);
      setName("");
      setHrName("");
      setHrPhone("");
      setHrPassword("");
      setPriceOverride("");
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
          <div>
            <label className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
              Giá thực thu — để trống là lấy giá niêm yết
            </label>
            <input
              value={priceOverride}
              onChange={(e) => setPriceOverride(e.target.value)}
              placeholder={listed ? formatMoney(listed.price, listed.currency) : "chưa có bảng giá"}
              className="mt-1 w-full border border-primary/30 bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <p className="mt-1 text-[11px] text-foreground/60">
              Niêm yết: {listed ? formatMoney(listed.price, listed.currency) : "chưa điền"} ·{" "}
              {PLAN_LABEL[planCode]} · {TERM_LABEL[term]}
            </p>
          </div>
        </div>
        <button
          disabled={create.isPending}
          onClick={() => create.mutate()}
          className="mt-5 bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-50"
        >
          {create.isPending ? "Đang tạo…" : "Tạo khách sạn"}
        </button>
      </section>

      <PriceGrid onSaved={(m) => setMessage(m)} />
    </Shell>
  );
}

/** Bảng giá niêm yết: 5 gói × 5 kỳ hạn.
 *
 *  Sửa ở đây KHÔNG đụng hợp đồng đã ký — mỗi hợp đồng giữ số tiền của
 *  chính nó. Ô dùng thử để trống vì gói dùng thử là miễn phí theo thoả
 *  thuận, và một ô "0 ₫" sửa được chỉ mời người ta điền nhầm vào đó. */
function PriceGrid({ onSaved }: { onSaved: (message: string) => void }) {
  const qc = useQueryClient();
  const { data: prices, isLoading } = usePlanPrices();
  const [draft, setDraft] = useState<Record<string, string>>({});

  const save = useMutation({
    mutationFn: (v: {
      planCode: (typeof PLANS)[number];
      term: (typeof TERMS)[number];
      price: number;
    }) => setPlanPrice({ data: { ...v, currency: "VND" } }),
    onSuccess: (_r, v) => {
      onSaved(`Đã lưu giá ${PLAN_LABEL[v.planCode]} · ${TERM_LABEL[v.term]}.`);
      qc.invalidateQueries({ queryKey: ["plan-prices"] });
    },
    onError: (e: Error) => onSaved(e.message),
  });

  const paidTerms = TERMS.filter((t) => t !== "trial");

  return (
    <section className="mt-8 border border-primary/20 bg-card p-5">
      <h2 className="text-sm uppercase tracking-[0.2em] text-primary">Bảng giá theo gói</h2>
      <p className="mt-2 text-sm text-foreground/70">
        Giá niêm yết cho mỗi gói và kỳ hạn, tính bằng đồng. Gói dùng thử một tháng là miễn phí nên
        không có ô nhập. Sửa bảng này không làm đổi số tiền của hợp đồng đã ký.
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-foreground/60">Đang tải…</p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
              <tr>
                <th className="px-2 py-2 text-left">Gói</th>
                {paidTerms.map((t) => (
                  <th key={t} className="px-2 py-2 text-right">
                    {TERM_LABEL[t]}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PLANS.map((p) => (
                <tr key={p} className="border-t border-primary/10">
                  <td className="px-2 py-2 whitespace-nowrap">{PLAN_LABEL[p]}</td>
                  {paidTerms.map((t) => {
                    const key = planPriceKey(p, t);
                    const current = prices?.get(key);
                    const value = draft[key] ?? (current ? String(current.price) : "");
                    const dirty = draft[key] !== undefined && Number(draft[key]) !== current?.price;
                    return (
                      <td key={t} className="px-2 py-2 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <input
                            inputMode="numeric"
                            value={value}
                            onChange={(e) =>
                              setDraft((d) => ({
                                ...d,
                                [key]: e.target.value.replace(/[^\d]/g, ""),
                              }))
                            }
                            className="w-32 border border-primary/30 bg-background px-2 py-1 text-right text-sm outline-none focus:border-primary"
                          />
                          <button
                            disabled={!dirty || save.isPending}
                            onClick={() =>
                              save.mutate({ planCode: p, term: t, price: Number(draft[key] || 0) })
                            }
                            className="border border-primary/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] disabled:opacity-30"
                          >
                            Lưu
                          </button>
                        </div>
                        <div className="mt-0.5 text-[11px] text-foreground/50">
                          {current ? formatMoney(current.price, current.currency) : "—"}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
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
