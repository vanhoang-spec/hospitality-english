import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useSession, signOut } from "@/lib/auth";
import { clearSessionId } from "@/lib/single-session";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";
import { SHIPPING_DEPARTMENTS, getDepartment } from "@/lib/departments";
import { TERM_LABEL, formatMoney } from "@/lib/subscription";
import { firstProblem, newOrgDetailsSchema } from "@/lib/org-details";
import { discountLabel } from "@/lib/retail-pricing";
import {
  getSignupLinkInfo,
  redeemLearnerLink,
  redeemOrganizationLink,
  redeemPartnerHotelLink,
  redeemInviteLink,
  type InvitePrefill,
  redeemRetailLink,
} from "@/lib/signup-link-actions";

// A learner opening their hotel's link, or a hotel opening the link the
// platform owner sent. Public: the token in the URL is the permission,
// and every limit is re-checked on the server when the form is sent.
export const Route = createFileRoute("/join/$token")({
  head: () => ({ meta: [{ title: "Đăng ký — Embassy Hospitality" }] }),
  component: JoinPage,
});

function JoinPage() {
  const { token } = Route.useParams();
  const { session, loading: sessionLoading } = useSession();

  const { data: info, isLoading } = useQuery({
    queryKey: ["signup-link", token] as const,
    queryFn: () => getSignupLinkInfo({ data: { token } }),
    retry: false,
  });

  if (sessionLoading || isLoading) return <Card>Đang tải…</Card>;

  if (session) {
    return (
      <Card title="Bạn đang đăng nhập">
        <p className="mt-3 text-sm text-foreground/75">
          Trình duyệt này đang đăng nhập bằng một tài khoản khác. Đăng xuất để tạo tài khoản mới từ
          link này.
        </p>
        <div className="mt-6 flex gap-3">
          <button
            onClick={async () => {
              clearSessionId();
              await signOut();
            }}
            className="bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground"
          >
            Đăng xuất
          </button>
          <Link
            to="/"
            className="border border-primary/40 px-5 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
          >
            Về trang chính
          </Link>
        </div>
      </Card>
    );
  }

  if (!info || !info.ok) {
    return (
      <Card title="Không dùng được link này">
        <p className="mt-3 text-sm text-foreground/75">
          {info && !info.ok ? info.reason : "Không đọc được link. Hãy thử lại sau ít phút."}
        </p>
        <Link
          to="/login"
          className="mt-6 inline-block border border-primary/40 px-5 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
        >
          Đến trang đăng nhập
        </Link>
      </Card>
    );
  }

  if (info.kind === "learner") {
    return (
      <LearnerForm
        token={token}
        orgName={info.orgName}
        groupName={info.groupName}
        department={info.department}
      />
    );
  }
  if (info.kind === "retail") {
    return (
      <RetailForm
        token={token}
        partnerName={info.partnerName}
        discountPct={info.discountPct}
        discountAmount={info.discountAmount}
        trialDays={info.trialDays}
        until={info.until}
        options={info.options}
      />
    );
  }
  return <HotelForm token={token} link={info} />;
}

/** One member of hotel staff, buying for themself through a partner. */
function RetailForm({
  token,
  partnerName,
  discountPct,
  discountAmount,
  trialDays,
  until,
  options,
}: {
  token: string;
  partnerName: string;
  discountPct: number;
  discountAmount: number;
  trialDays: number;
  until: string | null;
  options: { term: string; months: number; listPrice: number; amount: number }[];
}) {
  const [term, setTerm] = useState(options[0]?.term ?? "m3");
  const [fullName, setFullName] = useState("");
  const [department, setDepartment] = useState(SHIPPING_DEPARTMENTS[0]?.code ?? "");
  const account = useAccountFields();
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    const ok = await account.run(async (phone) => {
      await redeemRetailLink({
        data: {
          token,
          fullName,
          phone,
          password: account.password,
          department,
          term: term as "m3" | "m6" | "m9" | "m12",
        },
      });
    });
    if (ok) navigate({ to: "/thanh-toan" });
  }

  const untilText = until ? new Date(until).toLocaleDateString("vi-VN") : null;

  return (
    <Card title="Đăng ký học tiếng Anh khách sạn">
      <div className="mt-4 border border-primary/40 bg-primary/10 p-3 text-sm">
        {partnerName ? (
          <>
            Ưu đãi dành cho khách hàng của{" "}
            <strong className="text-foreground">{partnerName}</strong>:{" "}
          </>
        ) : null}
        {discountPct > 0 || discountAmount > 0 ? (
          <>
            <strong className="text-primary">
              giảm {discountLabel({ pct: discountPct, amount: discountAmount })}
            </strong>
            ,{" "}
          </>
        ) : null}
        học thử <strong className="text-foreground">{trialDays} ngày</strong> miễn phí
        {untilText ? <> · áp dụng đến hết {untilText}</> : null}.
      </div>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <fieldset>
          <legend className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
            Chọn gói học
          </legend>
          <div className="mt-2 grid grid-cols-2 gap-2">
            {options.map((o) => {
              const selected = o.term === term;
              return (
                <label
                  key={o.term}
                  className={`cursor-pointer border p-3 text-sm ${
                    selected
                      ? "border-primary bg-primary/10"
                      : "border-primary/30 hover:border-primary"
                  }`}
                >
                  <input
                    type="radio"
                    name="term"
                    value={o.term}
                    checked={selected}
                    onChange={() => setTerm(o.term)}
                    className="sr-only"
                  />
                  <div className="font-display text-base">{o.months} tháng</div>
                  {o.listPrice > o.amount && (
                    <div className="text-xs text-foreground/50 line-through">
                      {formatMoney(o.listPrice)}
                    </div>
                  )}
                  <div className="text-primary">{formatMoney(o.amount)}</div>
                  <div className="text-[11px] text-foreground/60">
                    ≈ {formatMoney(Math.round(o.amount / o.months / 1000) * 1000)}/tháng
                  </div>
                </label>
              );
            })}
          </div>
        </fieldset>
        <Field label="Họ và tên">
          <input
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={INPUT}
          />
        </Field>
        <Field label="Bộ phận bạn đang làm">
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className={INPUT}
          >
            {SHIPPING_DEPARTMENTS.map((d) => (
              <option key={d.code} value={d.code}>
                {d.name_vi}
              </option>
            ))}
          </select>
        </Field>
        <AccountFields account={account} submitLabel={`Đăng ký và học thử ${trialDays} ngày`} />
        <p className="text-xs text-foreground/60">
          Bạn vào học được ngay. Thanh toán trong {trialDays} ngày học thử để học tiếp — hướng dẫn
          thanh toán hiện ở bước sau, và luôn xem lại được trong mục “Gói học của tôi”.
        </p>
      </form>
    </Card>
  );
}

function LearnerForm({
  token,
  orgName,
  groupName,
  department,
}: {
  token: string;
  orgName: string;
  groupName: string | null;
  department: string | null;
}) {
  const [fullName, setFullName] = useState("");
  const [departmentChoice, setDepartmentChoice] = useState(
    department ?? SHIPPING_DEPARTMENTS[0]?.code ?? "",
  );
  const account = useAccountFields();
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    const ok = await account.run(async (phone) => {
      await redeemLearnerLink({
        data: {
          token,
          fullName,
          phone,
          password: account.password,
          department: department ? null : departmentChoice,
        },
      });
    });
    if (ok) navigate({ to: "/" });
  }

  const fixedDept = department ? getDepartment(department) : null;

  return (
    <Card title="Đăng ký học viên">
      <p className="mt-3 text-sm text-foreground/75">
        Bạn đang tạo tài khoản học tiếng Anh tại{" "}
        <strong className="text-foreground">{orgName}</strong>
        {groupName ? (
          <>
            , nhóm <strong className="text-foreground">{groupName}</strong>
          </>
        ) : null}
        .
      </p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        <Field label="Họ và tên">
          <input
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={INPUT}
          />
        </Field>
        {fixedDept ? (
          <Field label="Bộ phận">
            <div className="px-1 py-2 text-sm">{fixedDept.name_vi}</div>
          </Field>
        ) : (
          <Field label="Bộ phận">
            <select
              value={departmentChoice}
              onChange={(e) => setDepartmentChoice(e.target.value)}
              className={INPUT}
            >
              {SHIPPING_DEPARTMENTS.map((d) => (
                <option key={d.code} value={d.code}>
                  {d.name_vi}
                </option>
              ))}
            </select>
          </Field>
        )}
        <AccountFields account={account} submitLabel="Tạo tài khoản" />
      </form>
    </Card>
  );
}

/** Which hotel link this is: the owner's single-use link with a plan and
 *  term already agreed, or a partner's link where the hotel picks the plan
 *  to try. */
type HotelLink =
  | { kind: "organization"; seats: number; term: string }
  | {
      kind: "partner_hotel";
      partnerName: string;
      discountPct: number;
      discountAmount: number;
      discountScope: string;
      trialDays: number;
      until: string | null;
      plans: { code: string; seats: number }[];
    }
  | {
      /** Made in the CRM for one hotel: a gift or a trial, pre-filled. */
      kind: "invite";
      inviteKind: string;
      seats: number;
      days: number;
      prefill: InvitePrefill;
    };

function HotelForm({ token, link }: { token: string; link: HotelLink }) {
  // An invitation arrives with what the CRM already knows; HR checks and
  // corrects it. Every other link starts empty.
  const pre: InvitePrefill = link.kind === "invite" ? link.prefill : {};
  const [hotelName, setHotelName] = useState(pre.hotelName ?? "");
  const [legalName, setLegalName] = useState(pre.legalName ?? "");
  const [taxCode, setTaxCode] = useState(pre.taxCode ?? "");
  const [address, setAddress] = useState(pre.address ?? "");
  const [fullName, setFullName] = useState(pre.repName ?? "");
  const [repEmail, setRepEmail] = useState(pre.repEmail ?? "");
  const [planCode, setPlanCode] = useState(
    link.kind === "partner_hotel" ? (link.plans[1]?.code ?? link.plans[0]?.code ?? "p100") : "",
  );
  const account = useAccountFields(pre.repPhone ?? "");
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    const company = { legalName, address, taxCode, repEmail };
    const base = { token, hotelName, fullName, password: account.password, ...company };
    const ok = await account.run(
      async (phone) => {
        if (link.kind === "partner_hotel") {
          await redeemPartnerHotelLink({
            data: {
              ...base,
              phone,
              planCode: planCode as "p50" | "p100" | "p200" | "p300" | "p500",
            },
          });
        } else if (link.kind === "invite") {
          await redeemInviteLink({ data: { ...base, phone } });
        } else {
          await redeemOrganizationLink({ data: { ...base, phone } });
        }
      },
      () => firstProblem(newOrgDetailsSchema, company),
    );
    if (ok) navigate({ to: "/org-admin" });
  }

  const partner = link.kind === "partner_hotel" ? link : null;
  const untilText = partner?.until ? new Date(partner.until).toLocaleDateString("vi-VN") : null;
  const hasDiscount = !!partner && (partner.discountPct > 0 || partner.discountAmount > 0);

  return (
    <Card title="Mở tài khoản khách sạn">
      {partner ? (
        <div className="mt-4 border border-primary/40 bg-primary/10 p-3 text-sm">
          {partner.partnerName ? (
            <>
              Giới thiệu bởi <strong className="text-foreground">{partner.partnerName}</strong>
              .{" "}
            </>
          ) : null}
          Học thử <strong className="text-foreground">{partner.trialDays} ngày</strong> miễn phí
          {hasDiscount ? (
            <>
              , ưu đãi{" "}
              <strong className="text-primary">
                giảm {discountLabel({ pct: partner.discountPct, amount: partner.discountAmount })}
              </strong>{" "}
              {partner.discountScope === "every"
                ? "cho mọi lần mua và gia hạn"
                : "cho hợp đồng đầu tiên"}
            </>
          ) : null}
          {untilText ? <> · đăng ký đến hết {untilText}</> : null}.
        </div>
      ) : null}
      {link.kind === "invite" ? (
        <div className="mt-4 border border-primary/40 bg-primary/10 p-3 text-sm">
          {link.inviteKind === "gift" ? (
            <>
              Embassy Language tặng khách sạn gói{" "}
              <strong className="text-foreground">{link.seats} học viên</strong>, học miễn phí{" "}
              <strong className="text-foreground">{link.days} ngày</strong> kể từ hôm nay.
            </>
          ) : (
            <>
              Mời khách sạn dùng thử miễn phí{" "}
              <strong className="text-foreground">{link.days} ngày</strong>, gói{" "}
              <strong className="text-foreground">{link.seats} học viên</strong>.
            </>
          )}{" "}
          Thông tin bên dưới đã điền sẵn — hãy kiểm tra và sửa nếu chưa đúng.
        </div>
      ) : null}
      <p className="mt-3 text-sm text-foreground/75">
        {link.kind === "organization" ? (
          <>
            Gói <strong className="text-foreground">{link.seats} học viên</strong>, thời hạn{" "}
            <strong className="text-foreground">{TERM_LABEL[link.term] ?? link.term}</strong>.{" "}
          </>
        ) : null}
        Người điền form này là người đại diện HR của khách sạn, và sẽ là tài khoản quản trị nhân sự
        (HR) đầu tiên.
      </p>
      <form onSubmit={submit} className="mt-6 space-y-4">
        {partner ? (
          <Field label="Gói muốn dùng thử (số nhân viên học)">
            <select
              value={planCode}
              onChange={(e) => setPlanCode(e.target.value)}
              className={INPUT}
            >
              {partner.plans.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.seats} học viên
                </option>
              ))}
            </select>
          </Field>
        ) : null}
        <Field label="Tên khách sạn / resort (học viên sẽ thấy tên này)">
          <input
            required
            value={hotelName}
            onChange={(e) => setHotelName(e.target.value)}
            className={INPUT}
          />
        </Field>
        <Field label="Tên công ty (đúng như trên giấy phép kinh doanh)">
          <input
            required
            autoComplete="organization"
            value={legalName}
            onChange={(e) => setLegalName(e.target.value)}
            className={INPUT}
          />
        </Field>
        <Field label="Mã số thuế">
          <input
            required
            inputMode="numeric"
            value={taxCode}
            onChange={(e) => setTaxCode(e.target.value)}
            placeholder="0123456789"
            className={INPUT}
          />
        </Field>
        <Field label="Địa chỉ công ty">
          <input
            required
            autoComplete="street-address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className={INPUT}
          />
        </Field>
        <Field label="Họ và tên người đại diện (HR)">
          <input
            required
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className={INPUT}
          />
        </Field>
        <Field label="Email người đại diện">
          <input
            type="email"
            required
            autoComplete="email"
            value={repEmail}
            onChange={(e) => setRepEmail(e.target.value)}
            className={INPUT}
          />
        </Field>
        <AccountFields account={account} submitLabel="Mở tài khoản" />
      </form>
    </Card>
  );
}

/** Phone + password + confirmation, and the create-then-sign-in sequence
 *  both forms share. There is no self-service password reset in this
 *  product, so a typo here would lock the person out — hence the second
 *  password box. */
function useAccountFields(initialPhone = "") {
  const [phone, setPhone] = useState(initialPhone);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  /** Resolves true once the account exists and is signed in. On any
   *  failure the message is shown in the form and it resolves false.
   *  `check` reports a problem with the form's other fields first. */
  async function run(
    create: (normalizedPhone: string) => Promise<void>,
    check?: () => string | null,
  ): Promise<boolean> {
    setError(null);
    const problem = check?.();
    if (problem) {
      setError(problem);
      return false;
    }
    let normalized: string;
    try {
      normalized = normalizeVNPhone(phone);
    } catch (e) {
      setError(e instanceof InvalidPhoneError ? e.message : "Số điện thoại không hợp lệ.");
      return false;
    }
    if (password.length < 8) {
      setError("Mật khẩu cần ít nhất 8 ký tự.");
      return false;
    }
    if (password !== confirm) {
      setError("Hai lần nhập mật khẩu không khớp.");
      return false;
    }
    setBusy(true);
    try {
      await create(normalized);
      const { error: signInError } = await supabase.auth.signInWithPassword({
        phone: normalized,
        password,
      });
      if (signInError) {
        setError("Đã tạo tài khoản. Hãy vào trang đăng nhập và đăng nhập lại.");
        return false;
      }
      return true;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Đăng ký thất bại.");
      return false;
    } finally {
      setBusy(false);
    }
  }

  return { phone, setPhone, password, setPassword, confirm, setConfirm, error, busy, run };
}

function AccountFields({
  account,
  submitLabel,
}: {
  account: ReturnType<typeof useAccountFields>;
  submitLabel: string;
}) {
  return (
    <>
      <Field label="Số điện thoại (dùng để đăng nhập)">
        <input
          type="tel"
          required
          autoComplete="tel"
          value={account.phone}
          onChange={(e) => account.setPhone(e.target.value)}
          placeholder="0912345678"
          className={INPUT}
        />
      </Field>
      <Field label="Mật khẩu (ít nhất 8 ký tự)">
        <input
          type="password"
          required
          autoComplete="new-password"
          value={account.password}
          onChange={(e) => account.setPassword(e.target.value)}
          className={INPUT}
        />
      </Field>
      <Field label="Nhập lại mật khẩu">
        <input
          type="password"
          required
          autoComplete="new-password"
          value={account.confirm}
          onChange={(e) => account.setConfirm(e.target.value)}
          className={INPUT}
        />
      </Field>
      {account.error && <p className="text-sm text-red-400">{account.error}</p>}
      <button
        type="submit"
        disabled={account.busy}
        className="w-full bg-primary py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl disabled:opacity-60"
      >
        {account.busy ? "Đang tạo…" : submitLabel}
      </button>
    </>
  );
}

const INPUT =
  "mt-1 w-full border border-primary/30 bg-background px-4 py-3 text-foreground outline-none focus:border-primary";

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">{label}</span>
      {children}
    </label>
  );
}

function Card({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md border border-primary/30 bg-card p-8 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Embassy Hospitality</div>
        {title ? <h1 className="font-display mt-2 text-3xl text-foreground">{title}</h1> : null}
        {typeof children === "string" ? (
          <p className="mt-4 text-sm text-foreground/70">{children}</p>
        ) : (
          children
        )}
      </motion.div>
    </main>
  );
}
