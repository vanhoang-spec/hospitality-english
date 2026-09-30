// The platform owner's side of retail: who signed up through which
// partner, who has paid, and where the money should go. Reading goes
// through RLS (super admin); every write is a server function.
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TERM_LABEL, formatMoney } from "@/lib/subscription";
import { formatPhoneDisplay } from "@/lib/phone";
import { confirmOrderPayment, setPaymentAccount } from "@/lib/retail-actions";

const INPUT =
  "border border-primary/30 bg-background px-3 py-2 text-sm outline-none focus:border-primary";
const BUTTON =
  "border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary disabled:opacity-50";

type OrderView = {
  id: string;
  code: string;
  term: string;
  amount: number;
  status: string;
  createdAt: string;
  paidAt: string | null;
  learner: string;
  phone: string;
  partner: string;
  /** End of the trial or of the paid term, whichever is live. */
  accessUntil: string | null;
  accessKind: string | null;
};

const STATUS_LABEL: Record<string, string> = {
  pending: "Chờ thanh toán",
  paid: "Đã thanh toán",
  cancelled: "Đã huỷ",
};

function fmtDate(iso: string | null) {
  return iso ? new Date(iso).toLocaleDateString("vi-VN") : "—";
}

export function RetailOrdersSection({ onMessage }: { onMessage: (m: string) => void }) {
  const qc = useQueryClient();
  const [showAll, setShowAll] = useState(false);
  const queryKey = ["retail-orders"] as const;

  const { data: orders = [], isLoading } = useQuery({
    queryKey,
    queryFn: async (): Promise<OrderView[]> => {
      const { data: rows, error } = await supabase
        .from("orders")
        .select("id, code, term, amount, status, created_at, paid_at, user_id, org_id, partner_id")
        .order("created_at", { ascending: false })
        .limit(500);
      if (error) throw error;
      const list = rows ?? [];
      const userIds = [...new Set(list.map((o) => o.user_id).filter((x): x is string => !!x))];
      const orgIds = [...new Set(list.map((o) => o.org_id))];
      const [{ data: profiles }, { data: partners }, { data: subs }] = await Promise.all([
        userIds.length
          ? supabase.from("profiles").select("id, full_name, phone").in("id", userIds)
          : Promise.resolve({
              data: [] as { id: string; full_name: string | null; phone: string | null }[],
            }),
        supabase.from("partners").select("id, name"),
        orgIds.length
          ? supabase
              .from("subscriptions")
              .select("org_id, kind, ends_at")
              .in("org_id", orgIds)
              .eq("status", "active")
          : Promise.resolve({ data: [] as { org_id: string; kind: string; ends_at: string }[] }),
      ]);
      const people = new Map((profiles ?? []).map((p) => [p.id, p]));
      const partnerNames = new Map((partners ?? []).map((p) => [p.id, p.name]));
      const access = new Map((subs ?? []).map((s) => [s.org_id, s]));
      return list.map((o) => {
        const person = o.user_id ? people.get(o.user_id) : undefined;
        const sub = access.get(o.org_id);
        return {
          id: o.id,
          code: o.code,
          term: o.term,
          amount: Number(o.amount),
          status: o.status,
          createdAt: o.created_at,
          paidAt: o.paid_at,
          learner: person?.full_name || "—",
          phone: formatPhoneDisplay(person?.phone),
          partner: o.partner_id ? (partnerNames.get(o.partner_id) ?? "—") : "—",
          accessUntil: sub?.ends_at ?? null,
          accessKind: sub?.kind ?? null,
        };
      });
    },
  });

  const confirm = useMutation({
    mutationFn: (v: { orderId: string; paymentRef?: string }) => confirmOrderPayment({ data: v }),
    onSuccess: ({ endsAt }, v) => {
      const o = orders.find((x) => x.id === v.orderId);
      onMessage(
        `Đã kích hoạt ${o?.learner ?? "học viên"} (${o?.code ?? ""}) — học đến hết ${fmtDate(endsAt)}.`,
      );
      qc.invalidateQueries({ queryKey });
      qc.invalidateQueries({ queryKey: ["signup-links", "retail"] });
    },
    onError: (e: Error) => onMessage(e.message),
  });

  const pending = orders.filter((o) => o.status === "pending");
  const shown = showAll ? orders : pending;

  return (
    <section className="mt-10 border border-primary/20 bg-card p-5">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 className="text-sm uppercase tracking-[0.2em] text-primary">Đơn hàng bán lẻ</h2>
        <button
          onClick={() => setShowAll((v) => !v)}
          className="text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-primary"
        >
          {showAll ? `Chỉ đơn chờ thanh toán (${pending.length})` : `Xem tất cả (${orders.length})`}
        </button>
      </div>
      <p className="mt-2 text-sm text-foreground/75">
        Khi tiền về tài khoản công ty, đối chiếu <strong>nội dung chuyển khoản</strong> với cột Mã
        đơn rồi bấm <em>Đã nhận tiền</em>. Gói học bắt đầu ngay, cộng thêm những ngày học thử còn
        lại.
      </p>

      {isLoading ? (
        <p className="mt-4 text-sm text-foreground/60">Đang tải…</p>
      ) : shown.length === 0 ? (
        <p className="mt-4 text-sm text-foreground/60">
          {showAll ? "Chưa có đơn nào." : "Không có đơn nào đang chờ thanh toán."}
        </p>
      ) : (
        <div className="mt-4 overflow-x-auto">
          <table className="w-full min-w-[820px] text-sm">
            <thead className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
              <tr>
                <th className="py-2 text-left">Mã đơn</th>
                <th className="py-2 text-left">Học viên</th>
                <th className="py-2 text-left">Đối tác</th>
                <th className="py-2 text-left">Gói</th>
                <th className="py-2 text-right">Số tiền</th>
                <th className="py-2 text-left pl-4">Trạng thái</th>
                <th className="py-2 text-left">Học đến</th>
                <th className="py-2"></th>
              </tr>
            </thead>
            <tbody>
              {shown.map((o) => (
                <tr key={o.id} className="border-t border-primary/10 align-top">
                  <td className="py-2 pr-3 font-mono tracking-wider">{o.code}</td>
                  <td className="py-2 pr-3">
                    <div>{o.learner}</div>
                    <div className="text-xs text-foreground/60">{o.phone}</div>
                  </td>
                  <td className="py-2 pr-3">{o.partner}</td>
                  <td className="py-2 pr-3">{TERM_LABEL[o.term] ?? o.term}</td>
                  <td className="py-2 pr-3 text-right">{formatMoney(o.amount)}</td>
                  <td
                    className={`py-2 pl-4 pr-3 ${o.status === "pending" ? "text-primary" : "text-foreground/60"}`}
                  >
                    {STATUS_LABEL[o.status] ?? o.status}
                    {o.paidAt ? <div className="text-xs">{fmtDate(o.paidAt)}</div> : null}
                  </td>
                  <td className="py-2 pr-3">
                    {fmtDate(o.accessUntil)}
                    {o.accessKind === "trial" ? (
                      <div className="text-xs text-foreground/60">học thử</div>
                    ) : null}
                  </td>
                  <td className="py-2 text-right">
                    {o.status === "pending" && (
                      <button
                        disabled={confirm.isPending}
                        onClick={() => {
                          const ref = window.prompt(
                            `Xác nhận đã nhận ${formatMoney(o.amount)} từ ${o.learner} (nội dung ${o.code})?\n\nMã giao dịch ngân hàng (tuỳ chọn):`,
                            "",
                          );
                          if (ref === null) return;
                          confirm.mutate({ orderId: o.id, paymentRef: ref.trim() || undefined });
                        }}
                        className="text-xs uppercase tracking-[0.2em] text-primary hover:underline disabled:opacity-50"
                      >
                        Đã nhận tiền
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export function PaymentAccountSection({ onMessage }: { onMessage: (m: string) => void }) {
  const qc = useQueryClient();
  const queryKey = ["payment-account"] as const;
  const { data: current } = useQuery({
    queryKey,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("payment_accounts")
        .select("bank_name, bank_bin, account_no, account_name")
        .eq("id", 1)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const [draft, setDraft] = useState<{
    bankName: string;
    bankBin: string;
    accountNo: string;
    accountName: string;
  } | null>(null);
  const form = draft ?? {
    bankName: current?.bank_name ?? "",
    bankBin: current?.bank_bin ?? "",
    accountNo: current?.account_no ?? "",
    accountName: current?.account_name ?? "",
  };
  const edit = (patch: Partial<typeof form>) => setDraft({ ...form, ...patch });

  const save = useMutation({
    mutationFn: () => setPaymentAccount({ data: form }),
    onSuccess: () => {
      setDraft(null);
      onMessage(
        "Đã lưu tài khoản nhận tiền. Trang thanh toán của học viên dùng thông tin này ngay.",
      );
      qc.invalidateQueries({ queryKey });
    },
    onError: (e: Error) => onMessage(e.message),
  });

  const filled = !!(current?.account_no && current?.account_name);

  return (
    <section className="mt-10 border border-primary/20 bg-card p-5">
      <h2 className="text-sm uppercase tracking-[0.2em] text-primary">Tài khoản nhận tiền</h2>
      <p className="mt-2 text-sm text-foreground/75">
        Hiện trên trang thanh toán của học viên mua lẻ, cùng mã QR có sẵn số tiền và nội dung chuyển
        khoản. {filled ? "" : "Chưa điền — học viên hiện chỉ thấy số tiền và mã đơn."}
      </p>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            Ngân hàng
          </span>
          <input
            value={form.bankName}
            onChange={(e) => edit({ bankName: e.target.value })}
            placeholder="Ví dụ: Vietcombank"
            className={`${INPUT} mt-1 w-full`}
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            Mã BIN ngân hàng (6 số, để tạo mã QR)
          </span>
          <input
            value={form.bankBin}
            onChange={(e) => edit({ bankBin: e.target.value.replace(/\D/g, "").slice(0, 6) })}
            placeholder="Ví dụ: 970436"
            inputMode="numeric"
            className={`${INPUT} mt-1 w-full`}
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            Số tài khoản
          </span>
          <input
            value={form.accountNo}
            onChange={(e) => edit({ accountNo: e.target.value.replace(/\s/g, "") })}
            className={`${INPUT} mt-1 w-full`}
          />
        </label>
        <label className="block">
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/60">
            Tên chủ tài khoản
          </span>
          <input
            value={form.accountName}
            onChange={(e) => edit({ accountName: e.target.value })}
            placeholder="Đúng như trên ngân hàng"
            className={`${INPUT} mt-1 w-full`}
          />
        </label>
      </div>
      <button
        onClick={() => save.mutate()}
        disabled={save.isPending || !draft}
        className={`${BUTTON} mt-4`}
      >
        {save.isPending ? "Đang lưu…" : "Lưu"}
      </button>
    </section>
  );
}
