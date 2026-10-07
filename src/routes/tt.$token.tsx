import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { getPublicOrder } from "@/lib/retail-actions";
import { PaymentInstructions } from "@/components/PaymentInstructions";
import { TERM_LABEL, formatMoney } from "@/lib/subscription";

// The payment link CS sends a learner over Zalo: opens without signing in
// (AuthGate lets /tt/ through) and shows only what a bank transfer needs —
// amount, transfer note, account, QR. Nothing about who the learner is.
export const Route = createFileRoute("/tt/$token")({
  head: () => ({
    meta: [
      { title: "Thanh toán gói học — Embassy Hospitality" },
      // A payment page has no business in a search engine.
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: PayPage,
});

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString("vi-VN");
}

function PayPage() {
  const { token } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["public-order", token] as const,
    queryFn: () => getPublicOrder({ data: { token } }),
    retry: false,
  });

  if (isLoading) return <Shell>Đang tải…</Shell>;
  if (!data || !data.ok) {
    return (
      <Shell title="Không tìm thấy đơn">
        <p className="mt-3 text-sm text-foreground/75">
          Link thanh toán không đúng, hoặc đơn đã bị huỷ. Hãy liên hệ người đã gửi link cho bạn.
        </p>
      </Shell>
    );
  }

  if (data.status === "paid") {
    return (
      <Shell title="Đã thanh toán">
        <p className="mt-3 text-sm text-foreground/75">
          Đơn <strong>{data.code}</strong> ({formatMoney(data.amount)}) đã được xác nhận. Cảm ơn
          bạn! Đăng nhập để học tiếp.
        </p>
        <LoginLink />
      </Shell>
    );
  }

  const renewal = data.kind === "renewal";
  return (
    <Shell title={renewal ? "Gia hạn gói học" : "Thanh toán gói học"}>
      <p className="mt-3 text-sm text-foreground/75">
        Gói <strong>{TERM_LABEL[data.term] ?? data.term}</strong> tiếng Anh khách sạn.
        {data.listPrice > data.amount ? (
          <>
            {" "}
            Giá niêm yết <span className="line-through">{formatMoney(data.listPrice)}</span>, bạn
            được ưu đãi còn <strong className="text-primary">{formatMoney(data.amount)}</strong>.
          </>
        ) : null}
        {renewal && data.graceUntil ? (
          <>
            {" "}
            Bạn vẫn học được đến hết <strong>{fmtDate(data.graceUntil)}</strong> trong lúc chờ xác
            nhận thanh toán.
          </>
        ) : null}
      </p>
      <PaymentInstructions code={data.code} amount={data.amount} account={data.account} />
      <LoginLink />
    </Shell>
  );
}

function LoginLink() {
  return (
    <Link
      to="/login"
      className="mt-6 inline-block border border-primary/40 px-5 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
    >
      Đăng nhập để học
    </Link>
  );
}

function Shell({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-start justify-center bg-background px-4 py-10">
      <div className="w-full max-w-md border border-primary/30 bg-card p-8 shadow-xl">
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Embassy Hospitality</div>
        {title ? <h1 className="font-display mt-2 text-3xl text-foreground">{title}</h1> : null}
        {typeof children === "string" ? (
          <p className="mt-4 text-sm text-foreground/70">{children}</p>
        ) : (
          children
        )}
      </div>
    </main>
  );
}
