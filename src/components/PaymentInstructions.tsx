import { formatMoney } from "@/lib/subscription";

// How to pay one order by bank transfer: amount, transfer note, the
// company account, and a VietQR code with all of it filled in. Shared by
// "Gói học của tôi" (signed in) and the payment link /tt/<token> that CS
// sends over Zalo (not signed in), so the two can never disagree.

export type PayAccount = {
  bankName: string;
  bankBin: string | null;
  accountNo: string;
  accountName: string;
};

export function PaymentInstructions({
  code,
  amount,
  account,
}: {
  code: string;
  amount: number;
  account: PayAccount | null;
}) {
  return (
    <>
      <dl className="mt-5 grid grid-cols-[auto,1fr] gap-x-4 gap-y-2 text-sm">
        <dt className="text-foreground/60">Số tiền</dt>
        <dd className="font-display text-xl text-primary">{formatMoney(amount)}</dd>
        <dt className="text-foreground/60">Nội dung chuyển khoản</dt>
        <dd>
          <code className="border border-primary/40 px-2 py-0.5 text-base tracking-widest">
            {code}
          </code>
        </dd>
        {account && (
          <>
            <dt className="text-foreground/60">Ngân hàng</dt>
            <dd>{account.bankName}</dd>
            <dt className="text-foreground/60">Số tài khoản</dt>
            <dd className="tracking-wider">{account.accountNo}</dd>
            <dt className="text-foreground/60">Chủ tài khoản</dt>
            <dd>{account.accountName}</dd>
          </>
        )}
      </dl>

      {account?.bankBin ? (
        <div className="mt-5">
          <img
            src={`https://img.vietqr.io/image/${account.bankBin}-${account.accountNo}-compact2.png?amount=${amount}&addInfo=${encodeURIComponent(code)}&accountName=${encodeURIComponent(account.accountName)}`}
            alt={`Mã QR chuyển ${formatMoney(amount)}, nội dung ${code}`}
            className="w-64 max-w-full bg-white p-2"
          />
          <p className="mt-2 text-xs text-foreground/60">
            Mở app ngân hàng, chọn quét mã QR — số tiền và nội dung đã điền sẵn.
          </p>
        </div>
      ) : null}

      {account ? (
        <p className="mt-4 text-sm text-foreground/75">
          Ghi đúng nội dung <strong>{code}</strong> để hệ thống nhận ra khoản thanh toán của bạn.
          Gói học được kích hoạt khi chúng tôi xác nhận đã nhận tiền (trong giờ làm việc).
        </p>
      ) : (
        <p className="mt-4 text-sm text-foreground/75">
          Thông tin chuyển khoản đang được cập nhật. Hãy quay lại trang này sau, hoặc chờ chúng tôi
          liên hệ qua số điện thoại đã đăng ký.
        </p>
      )}
    </>
  );
}
