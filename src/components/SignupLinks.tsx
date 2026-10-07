// Making, sharing and revoking signup links — HR's for learners, the
// platform owner's for hotels. Reading goes through RLS; every write goes
// through a server function (see signup-link-actions.ts).
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { SHIPPING_DEPARTMENTS, getDepartment } from "@/lib/departments";
import {
  PLAN_LABEL,
  TERM_LABEL,
  formatMoney,
  planPriceKey,
  usePlanPrices,
} from "@/lib/subscription";
import {
  createLearnerLink,
  createOrganizationLink,
  createRetailLink,
  extendRetailLink,
  revokeSignupLink,
} from "@/lib/signup-link-actions";
import type { Database } from "@/integrations/supabase/types";
import { MoneyInput } from "./MoneyInput";

type LinkRow = Database["public"]["Tables"]["signup_links"]["Row"];

const PLANS = ["p50", "p100", "p200", "p300", "p500"] as const;
const TERMS = ["trial", "m3", "m6", "m9", "m12"] as const;

const BUTTON =
  "border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary disabled:opacity-50";
const INPUT =
  "border border-primary/30 bg-background px-3 py-2 text-sm outline-none focus:border-primary";

function linkUrl(token: string): string {
  const origin = typeof window === "undefined" ? "" : window.location.origin;
  return `${origin}/join/${token}`;
}

function linkStatus(link: LinkRow): { label: string; live: boolean } {
  if (link.revoked_at) return { label: "Đã thu hồi", live: false };
  if (link.expires_at && new Date(link.expires_at) <= new Date()) {
    return { label: "Hết hạn", live: false };
  }
  if (link.max_uses !== null && link.use_count >= link.max_uses) {
    return { label: link.kind === "organization" ? "Đã dùng" : "Đã đủ người", live: false };
  }
  return { label: "Đang mở", live: true };
}

function formatDate(iso: string | null): string {
  return iso ? new Date(iso).toLocaleDateString("vi-VN") : "Không hết hạn";
}

// ── HR: links for learners ───────────────────────────────────

export function LearnerLinksSection({
  orgId,
  groups,
}: {
  orgId: string;
  groups: { id: string; name: string }[];
}) {
  const qc = useQueryClient();
  const [label, setLabel] = useState("");
  const [groupId, setGroupId] = useState("");
  const [department, setDepartment] = useState("");
  const [maxUses, setMaxUses] = useState("");
  const [days, setDays] = useState("30");
  const [fresh, setFresh] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const queryKey = ["signup-links", "learner", orgId] as const;
  const { data: links = [] } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("signup_links")
        .select("*")
        .eq("kind", "learner")
        .eq("org_id", orgId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as LinkRow[];
    },
  });

  const create = useMutation({
    mutationFn: () =>
      createLearnerLink({
        data: {
          label: label.trim() || undefined,
          groupId: groupId || null,
          department: department || null,
          maxUses: maxUses ? Number(maxUses) : null,
          expiresInDays: days ? Number(days) : null,
        },
      }),
    onSuccess: ({ token }) => {
      setFresh(token);
      setError(null);
      setLabel("");
      qc.invalidateQueries({ queryKey });
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Không tạo được link."),
  });

  const groupName = (id: string | null) =>
    id ? (groups.find((g) => g.id === id)?.name ?? "(nhóm đã xoá)") : "Không gán nhóm";

  return (
    <section id="signup-links" className="mt-6 border border-primary/20 bg-card p-5">
      <h2 className="text-sm uppercase tracking-[0.2em] text-primary">Link đăng ký cho học viên</h2>
      <p className="mt-2 text-sm text-foreground/75">
        Gửi link này cho nhân viên (Zalo, email…). Họ tự điền họ tên, số điện thoại, tự đặt mật khẩu
        và vào thẳng khách sạn của bạn — đúng nhóm, đúng bộ phận nếu bạn chọn sẵn. Mỗi người đăng ký
        dùng một chỗ học viên của gói. Ai có link đều đăng ký được, nên hãy đặt hạn dùng và thu hồi
        khi xong đợt.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Labeled label="Ghi chú (tuỳ chọn)">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ví dụ: Lễ tân đợt tháng 10"
            className={`${INPUT} w-full`}
          />
        </Labeled>
        <Labeled label="Vào nhóm">
          <select
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
            className={`${INPUT} w-full`}
          >
            <option value="">Không gán nhóm</option>
            {groups.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Bộ phận">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={`${INPUT} w-full`}
          >
            <option value="">Học viên tự chọn</option>
            {SHIPPING_DEPARTMENTS.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name_vi}
              </option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Tối đa bao nhiêu người">
          <input
            type="number"
            min={1}
            max={1000}
            value={maxUses}
            onChange={(e) => setMaxUses(e.target.value)}
            placeholder="Không giới hạn"
            className={`${INPUT} w-full`}
          />
        </Labeled>
        <Labeled label="Hết hạn sau">
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className={`${INPUT} w-full`}
          >
            <option value="7">7 ngày</option>
            <option value="30">30 ngày</option>
            <option value="90">90 ngày</option>
            <option value="">Không hết hạn</option>
          </select>
        </Labeled>
        <div className="flex items-end">
          <button onClick={() => create.mutate()} disabled={create.isPending} className={BUTTON}>
            {create.isPending ? "Đang tạo…" : "Tạo link"}
          </button>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      {fresh && <FreshLink token={fresh} />}

      <LinkTable
        links={links}
        describe={(l) => (
          <>
            <div>{l.label || "—"}</div>
            <div className="text-xs text-foreground/60">
              {groupName(l.group_id)} ·{" "}
              {l.department
                ? (getDepartment(l.department)?.name_vi ?? l.department)
                : "Tự chọn bộ phận"}
            </div>
          </>
        )}
        usage={(l) => `${l.use_count}${l.max_uses !== null ? ` / ${l.max_uses}` : ""} người`}
        onRevoked={() => qc.invalidateQueries({ queryKey })}
      />
    </section>
  );
}

// ── Platform owner: links for hotels ─────────────────────────

export function HotelLinksSection({ orgNames }: { orgNames: Map<string, string> }) {
  const qc = useQueryClient();
  const { data: prices } = usePlanPrices();
  const [label, setLabel] = useState("");
  const [planCode, setPlanCode] = useState<(typeof PLANS)[number]>("p50");
  const [term, setTerm] = useState<(typeof TERMS)[number]>("trial");
  const [price, setPrice] = useState("");
  const [days, setDays] = useState("14");
  const [fresh, setFresh] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const queryKey = ["signup-links", "organization"] as const;
  const { data: links = [] } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("signup_links")
        .select("*")
        .eq("kind", "organization")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as LinkRow[];
    },
  });

  const listPrice = prices?.get(planPriceKey(planCode, term))?.price;

  const create = useMutation({
    mutationFn: () =>
      createOrganizationLink({
        data: {
          label: label.trim() || undefined,
          planCode,
          term,
          price: price.trim() === "" ? null : Number(price),
          expiresInDays: Number(days),
        },
      }),
    onSuccess: ({ token }) => {
      setFresh(token);
      setError(null);
      setLabel("");
      setPrice("");
      qc.invalidateQueries({ queryKey });
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Không tạo được link."),
  });

  return (
    <section className="mt-10 border border-primary/20 bg-card p-5">
      <h2 className="text-sm uppercase tracking-[0.2em] text-primary">
        Link mở tài khoản khách sạn
      </h2>
      <p className="mt-2 text-sm text-foreground/75">
        Khi một khách sạn đồng ý mua, tạo link với gói và kỳ hạn đã chốt rồi gửi cho người phụ trách
        đào tạo của họ. Người đó tự nhập tên khách sạn, số điện thoại, mật khẩu — và trở thành tài
        khoản HR đầu tiên. Mỗi link dùng được một lần.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Labeled label="Ghi chú (tuỳ chọn)">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ví dụ: Resort ABC — anh Nam"
            className={`${INPUT} w-full`}
          />
        </Labeled>
        <Labeled label="Gói">
          <select
            value={planCode}
            onChange={(e) => setPlanCode(e.target.value as (typeof PLANS)[number])}
            className={`${INPUT} w-full`}
          >
            {PLANS.map((p) => (
              <option key={p} value={p}>
                {PLAN_LABEL[p]}
              </option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Kỳ hạn">
          <select
            value={term}
            onChange={(e) => setTerm(e.target.value as (typeof TERMS)[number])}
            className={`${INPUT} w-full`}
          >
            {TERMS.map((t) => (
              <option key={t} value={t}>
                {TERM_LABEL[t]}
              </option>
            ))}
          </select>
        </Labeled>
        <Labeled label="Giá chốt (để trống = giá niêm yết)">
          <MoneyInput
            value={price}
            onChange={setPrice}
            placeholder={listPrice !== undefined ? formatMoney(listPrice) : "Chưa có giá niêm yết"}
            className={`${INPUT} w-full`}
          />
        </Labeled>
        <Labeled label="Hết hạn sau">
          <select
            value={days}
            onChange={(e) => setDays(e.target.value)}
            className={`${INPUT} w-full`}
          >
            <option value="7">7 ngày</option>
            <option value="14">14 ngày</option>
            <option value="30">30 ngày</option>
          </select>
        </Labeled>
        <div className="flex items-end">
          <button onClick={() => create.mutate()} disabled={create.isPending} className={BUTTON}>
            {create.isPending ? "Đang tạo…" : "Tạo link"}
          </button>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      {fresh && <FreshLink token={fresh} />}

      <LinkTable
        links={links}
        describe={(l) => (
          <>
            <div>{l.label || "—"}</div>
            <div className="text-xs text-foreground/60">
              {PLAN_LABEL[l.plan_code ?? ""] ?? l.plan_code} · {TERM_LABEL[l.term ?? ""] ?? l.term}
              {l.price !== null ? ` · ${formatMoney(Number(l.price))}` : " · giá niêm yết"}
            </div>
          </>
        )}
        usage={(l) =>
          l.org_id ? `→ ${orgNames.get(l.org_id) ?? "khách sạn đã tạo"}` : "Chưa dùng"
        }
        onRevoked={() => qc.invalidateQueries({ queryKey })}
      />
    </section>
  );
}

// ── Platform owner: retail links through a partner ───────────

export function RetailLinksSection() {
  const qc = useQueryClient();
  const [partnerName, setPartnerName] = useState("");
  const [label, setLabel] = useState("");
  const [discount, setDiscount] = useState("30");
  const [trialDays, setTrialDays] = useState("7");
  const [until, setUntil] = useState("2026-12-31");
  const [fresh, setFresh] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const queryKey = ["signup-links", "retail"] as const;
  const { data } = useQuery({
    queryKey,
    queryFn: async () => {
      const [{ data: links, error: e1 }, { data: partners }, { data: orders }] = await Promise.all([
        supabase
          .from("signup_links")
          .select("*")
          .eq("kind", "retail")
          .order("created_at", { ascending: false }),
        supabase.from("partners").select("id, name"),
        supabase.from("orders").select("link_id, status"),
      ]);
      if (e1) throw e1;
      const stats = new Map<string, { signups: number; paid: number }>();
      for (const o of orders ?? []) {
        if (!o.link_id) continue;
        const s = stats.get(o.link_id) ?? { signups: 0, paid: 0 };
        s.signups++;
        if (o.status === "paid") s.paid++;
        stats.set(o.link_id, s);
      }
      return {
        links: (links ?? []) as LinkRow[],
        partnerNames: new Map((partners ?? []).map((p) => [p.id, p.name])),
        stats,
      };
    },
  });

  const create = useMutation({
    mutationFn: () =>
      createRetailLink({
        data: {
          partnerName: partnerName.trim(),
          label: label.trim() || undefined,
          discountPct: Number(discount),
          trialDays: Number(trialDays),
          until,
        },
      }),
    onSuccess: ({ token }) => {
      setFresh(token);
      setError(null);
      setLabel("");
      qc.invalidateQueries({ queryKey });
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Không tạo được link."),
  });

  return (
    <section className="mt-10 border border-primary/20 bg-card p-5">
      <h2 className="text-sm uppercase tracking-[0.2em] text-primary">Link bán lẻ qua đối tác</h2>
      <p className="mt-2 text-sm text-foreground/75">
        Cho từng nhân viên khách sạn tự đăng ký và tự trả tiền, không qua HR. Người đăng ký chọn gói
        3/6/9/12 tháng, được giảm theo mức trên link (làm tròn lên 10.000 ₫) và học thử ngay. Mỗi
        đăng ký được ghi nhận là đến từ đối tác của link. Giá gốc lấy từ dòng{" "}
        <em>Bán lẻ · 1 người</em> trong bảng giá.
      </p>

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Labeled label="Tên đối tác">
          <input
            value={partnerName}
            onChange={(e) => setPartnerName(e.target.value)}
            placeholder="Hiện cho người đăng ký thấy"
            className={`${INPUT} w-full`}
          />
        </Labeled>
        <Labeled label="Ghi chú (tuỳ chọn)">
          <input
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Ví dụ: đặt trên trang của đối tác"
            className={`${INPUT} w-full`}
          />
        </Labeled>
        <Labeled label="Giảm (%)">
          <input
            type="number"
            min={0}
            max={90}
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className={`${INPUT} w-full`}
          />
        </Labeled>
        <Labeled label="Số ngày học thử">
          <input
            type="number"
            min={1}
            max={60}
            value={trialDays}
            onChange={(e) => setTrialDays(e.target.value)}
            className={`${INPUT} w-full`}
          />
        </Labeled>
        <Labeled label="Ưu đãi đến hết ngày">
          <input
            type="date"
            value={until}
            onChange={(e) => setUntil(e.target.value)}
            className={`${INPUT} w-full`}
          />
        </Labeled>
        <div className="flex items-end">
          <button
            onClick={() => create.mutate()}
            disabled={create.isPending || partnerName.trim().length < 2}
            className={BUTTON}
          >
            {create.isPending ? "Đang tạo…" : "Tạo link"}
          </button>
        </div>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      {fresh && <FreshLink token={fresh} />}

      <LinkTable
        links={data?.links ?? []}
        describe={(l) => (
          <>
            <div>{data?.partnerNames.get(l.partner_id ?? "") ?? "—"}</div>
            <div className="text-xs text-foreground/60">
              Giảm {Number(l.discount_pct ?? 0)}% · học thử {l.trial_days} ngày
              {l.label ? ` · ${l.label}` : ""}
            </div>
          </>
        )}
        usage={(l) => {
          const s = data?.stats.get(l.id) ?? { signups: 0, paid: 0 };
          return `${s.signups} đăng ký · ${s.paid} đã trả`;
        }}
        onRevoked={() => qc.invalidateQueries({ queryKey })}
        extra={(l) =>
          l.revoked_at ? null : (
            <ExtendRetail link={l} onDone={() => qc.invalidateQueries({ queryKey })} />
          )
        }
      />
    </section>
  );
}

/** Move the offer's last day. Works on an expired link too, so an offer
 *  that lapsed over a weekend can be brought back without a new link. */
function ExtendRetail({ link, onDone }: { link: LinkRow; onDone: () => void }) {
  const [open, setOpen] = useState(false);
  const [until, setUntil] = useState("");
  const [error, setError] = useState<string | null>(null);
  const extend = useMutation({
    mutationFn: () => extendRetailLink({ data: { id: link.id, until } }),
    onSuccess: () => {
      setOpen(false);
      setError(null);
      onDone();
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Không gia hạn được."),
  });
  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="mt-1 block w-full text-right text-xs uppercase tracking-[0.2em] text-primary hover:underline"
      >
        Gia hạn
      </button>
    );
  }
  return (
    <span className="mt-1 flex items-center justify-end gap-2">
      <input
        type="date"
        value={until}
        onChange={(e) => setUntil(e.target.value)}
        className="border border-primary/30 bg-background px-2 py-1 text-xs"
      />
      <button
        onClick={() => extend.mutate()}
        disabled={!until || extend.isPending}
        className="text-xs uppercase tracking-[0.2em] text-primary hover:underline disabled:opacity-50"
      >
        Lưu
      </button>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </span>
  );
}

// ── Shared pieces ────────────────────────────────────────────

function FreshLink({ token }: { token: string }) {
  const url = linkUrl(token);
  return (
    <div className="mt-4 border border-primary bg-primary/10 p-4">
      <div className="text-[10px] uppercase tracking-[0.2em] text-primary">Link vừa tạo</div>
      <div className="mt-2 flex flex-wrap items-center gap-3">
        <code className="break-all text-sm">{url}</code>
        <CopyButton text={url} />
      </div>
    </div>
  );
}

function CopyButton({ text }: { text: string }) {
  const [done, setDone] = useState(false);
  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setDone(true);
          setTimeout(() => setDone(false), 1500);
        } catch {
          window.prompt("Sao chép link:", text);
        }
      }}
      className="text-xs uppercase tracking-[0.2em] text-primary hover:underline"
    >
      {done ? "Đã chép" : "Sao chép"}
    </button>
  );
}

function LinkTable({
  links,
  describe,
  usage,
  onRevoked,
  extra,
}: {
  links: LinkRow[];
  describe: (link: LinkRow) => React.ReactNode;
  usage: (link: LinkRow) => string;
  onRevoked: () => void;
  /** More actions for a row, shown whether or not the link is still live. */
  extra?: (link: LinkRow) => React.ReactNode;
}) {
  const revoke = useMutation({
    mutationFn: (id: string) => revokeSignupLink({ data: { id } }),
    onSuccess: onRevoked,
  });

  if (links.length === 0) {
    return <p className="mt-5 text-sm text-foreground/60">Chưa có link nào.</p>;
  }

  return (
    <div className="mt-5 overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
          <tr>
            <th className="py-2 text-left">Link</th>
            <th className="py-2 text-left">Đã dùng</th>
            <th className="py-2 text-left">Hết hạn</th>
            <th className="py-2 text-left">Trạng thái</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {links.map((l) => {
            const status = linkStatus(l);
            return (
              <tr key={l.id} className="border-t border-primary/10 align-top">
                <td className="py-2 pr-3">{describe(l)}</td>
                <td className="py-2 pr-3">{usage(l)}</td>
                <td className="py-2 pr-3">{formatDate(l.expires_at)}</td>
                <td className={`py-2 pr-3 ${status.live ? "text-primary" : "text-foreground/50"}`}>
                  {status.label}
                </td>
                <td className="py-2 text-right">
                  {status.live && (
                    <span className="flex justify-end gap-3">
                      <CopyButton text={linkUrl(l.token)} />
                      <button
                        onClick={() => {
                          if (
                            window.confirm(
                              "Thu hồi link này? Người chưa đăng ký sẽ không dùng được nữa.",
                            )
                          ) {
                            revoke.mutate(l.id);
                          }
                        }}
                        className="text-xs uppercase tracking-[0.2em] text-destructive hover:underline"
                      >
                        Thu hồi
                      </button>
                    </span>
                  )}
                  {extra?.(l)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function Labeled({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  );
}
