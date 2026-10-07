import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getMyBilling } from "@/lib/retail-actions";
import { formatMoney } from "@/lib/subscription";

// The in-app half of how a learner who bought for themself hears about a
// renewal (owner, 07/10/2026): a strip on every page while a renewal order
// waits for payment, linking to "Gói học của tôi" and its QR. The other
// half is the payment link CS sends over Zalo from the CRM.
//
// Same query key as /thanh-toan, so the two share one fetch — and that
// fetch is also what opens the renewal order when it falls due.

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN");
}

export function RenewalBanner() {
  const { data } = useQuery({
    queryKey: ["my-billing"] as const,
    queryFn: () => getMyBilling(),
    staleTime: 10 * 60_000,
  });
  if (!data || !data.individual) return null;
  const { order, subscription: sub } = data;
  if (!order || order.status !== "pending" || order.kind !== "renewal" || !sub) return null;

  const ended = new Date(sub.endsAt).getTime() <= Date.now();
  return (
    <div className="border-b border-primary/40 bg-primary/10 px-4 py-2 text-center text-sm">
      {ended ? (
        <>
          Gói học đã hết hạn ngày {fmtDate(sub.endsAt)}
          {order.graceUntil ? <> — bạn được học tiếp đến hết {fmtDate(order.graceUntil)}</> : null}
          .{" "}
        </>
      ) : (
        <>Gói học hết hạn ngày {fmtDate(sub.endsAt)}. </>
      )}
      Đơn gia hạn {formatMoney(order.amount)} đã sẵn.{" "}
      <Link to="/thanh-toan" className="font-semibold text-primary underline">
        Thanh toán gia hạn
      </Link>
    </div>
  );
}
