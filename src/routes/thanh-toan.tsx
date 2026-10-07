import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { formatMoney } from "@/lib/subscription";
import { getMyBilling, changeMyOrderTerm, type MyBilling } from "@/lib/retail-actions";
import { PaymentInstructions } from "@/components/PaymentInstructions";

// "Gói học của tôi" — for a learner who bought for themself: where their
// trial or term stands, the open order, and how to pay it. Reachable even
// after the trial has run out (AuthGate lets this one path through), since
// that is exactly when it is needed.
export const Route = createFileRoute("/thanh-toan")({
  head: () => ({ meta: [{ title: "Gói học của tôi — Embassy Hospitality" }] }),
  component: BillingPage,
});

const BILLING_KEY = ["my-billing"] as const;

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN");
}

function BillingPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: BILLING_KEY,
    queryFn: () => getMyBilling(),
  });

  if (isLoading) return <Shell>Đang tải…</Shell>;
  if (error || !data) {
    return <Shell>Không đọc được thông tin gói học. Hãy tải lại trang sau ít phút.</Shell>;
  }
  if (!data.individual) {
    return (
      <Shell>
        <p>
          Gói học của bạn do khách sạn quản lý. Mọi thắc mắc về gói học, hãy hỏi bộ phận nhân sự.
        </p>
        <HomeLink />
      </Shell>
    );
  }
  return <Billing billing={data} />;
}

function Billing({ billing }: { billing: Extract<MyBilling, { individual: true }> }) {
  const qc = useQueryClient();
  const [error, setError] = useState<string | null>(null);
  const { subscription: sub, order, account } = billing;

  const change = useMutation({
    mutationFn: (term: "m3" | "m6" | "m9" | "m12") => changeMyOrderTerm({ data: { term } }),
    onSuccess: () => {
      setError(null);
      qc.invalidateQueries({ queryKey: BILLING_KEY });
    },
    onError: (e) => setError(e instanceof Error ? e.message : "Không đổi được gói."),
  });

  const daysLeft = sub
    ? Math.max(0, Math.ceil((new Date(sub.endsAt).getTime() - Date.now()) / 86_400_000))
    : 0;
  const onTrial = sub?.kind === "trial";
  const renewal = order?.status === "pending" && order.kind === "renewal";
  const inGrace = !!order?.graceUntil && new Date(order.graceUntil).getTime() > Date.now();

  return (
    <Shell>
      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Gói học của tôi</div>

      <section className="mt-4 border border-primary/30 bg-card p-5">
        {sub && onTrial && sub.active && (
          <p>
            Bạn đang <strong className="text-primary">học thử</strong> — còn{" "}
            <strong>{daysLeft} ngày</strong> (đến hết {fmtDate(sub.endsAt)}). Thanh toán trước ngày
            đó để học tiếp không gián đoạn; những ngày học thử còn lại vẫn được cộng thêm vào gói.
          </p>
        )}
        {sub && onTrial && !sub.active && (
          <p>
            <strong className="text-primary">Đã hết thời gian học thử.</strong> Thanh toán để học
            tiếp — tiến độ của bạn vẫn được giữ nguyên.
          </p>
        )}
        {sub && !onTrial && sub.active && (
          <p>
            Gói học của bạn còn hiệu lực đến hết <strong>{fmtDate(sub.endsAt)}</strong> ({daysLeft}{" "}
            ngày).
            {renewal ? (
              <>
                {" "}
                Đơn gia hạn đã sẵn bên dưới — thanh toán trước ngày đó để học liền mạch, gói mới nối
                tiếp ngay sau gói này.
              </>
            ) : null}
          </p>
        )}
        {sub && !onTrial && !sub.active && renewal && inGrace && (
          <p>
            <strong className="text-primary">Gói học đã hết hạn</strong> ngày {fmtDate(sub.endsAt)}.
            Bạn vẫn được học tiếp đến hết <strong>{fmtDate(order!.graceUntil!)}</strong> để hoàn tất
            thanh toán đơn gia hạn bên dưới. Gói mới tính từ ngày chúng tôi xác nhận đã nhận tiền.
          </p>
        )}
        {sub && !onTrial && !sub.active && !(renewal && inGrace) && (
          <p>
            <strong className="text-primary">Gói học đã hết hạn</strong> ngày {fmtDate(sub.endsAt)}.
            {renewal
              ? " Thanh toán đơn gia hạn bên dưới để học tiếp — tiến độ của bạn vẫn được giữ nguyên."
              : " Để gia hạn, hãy liên hệ Embassy Hospitality."}
          </p>
        )}
        {billing.partnerName && (
          <p className="mt-2 text-xs text-foreground/60">Đăng ký qua {billing.partnerName}.</p>
        )}
      </section>

      {order?.status === "pending" && (
        <section className="mt-6 border border-primary/30 bg-card p-5">
          <h2 className="text-sm uppercase tracking-[0.2em] text-primary">
            {renewal ? "Thanh toán gia hạn" : "Thanh toán"}
          </h2>

          <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {billing.options.map((o) => {
              const selected = o.term === order.term;
              return (
                <button
                  key={o.term}
                  type="button"
                  disabled={change.isPending || selected}
                  onClick={() => change.mutate(o.term as "m3" | "m6" | "m9" | "m12")}
                  className={`border p-3 text-left text-sm ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-primary/30 hover:border-primary"
                  }`}
                >
                  <div className="font-display text-base">{o.months} tháng</div>
                  <div className="text-primary">{formatMoney(o.amount)}</div>
                  {o.listPrice > o.amount && (
                    <div className="text-[11px] text-foreground/50 line-through">
                      {formatMoney(o.listPrice)}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          {error && <p className="mt-2 text-sm text-red-400">{error}</p>}

          <PaymentInstructions code={order.code} amount={order.amount} account={account} />
        </section>
      )}

      {order?.status === "paid" && (
        <section className="mt-6 border border-primary/30 bg-card p-5 text-sm">
          Đã nhận thanh toán <strong>{formatMoney(order.amount)}</strong>
          {order.paidAt ? <> ngày {fmtDate(order.paidAt)}</> : null} (mã {order.code}). Cảm ơn bạn!
        </section>
      )}

      <HomeLink />
    </Shell>
  );
}

function HomeLink() {
  return (
    <Link
      to="/"
      className="mt-8 inline-block border border-primary/40 px-5 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
    >
      Về trang học
    </Link>
  );
}

function Shell({ children }: { children: React.ReactNode }) {
  return <main className="mx-auto max-w-2xl px-6 py-10">{children}</main>;
}
