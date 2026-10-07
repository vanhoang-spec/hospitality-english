import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, type FormEvent, type ReactNode } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useSession, signOut } from "@/lib/auth";
import { clearSessionId } from "@/lib/single-session";
import { normalizeVNPhone, InvalidPhoneError } from "@/lib/phone";
import { SHIPPING_DEPARTMENTS, getDepartment } from "@/lib/departments";
import { TERM_LABEL } from "@/lib/subscription";
import { firstProblem, newOrgDetailsSchema } from "@/lib/org-details";
import {
  getSignupLinkInfo,
  redeemLearnerLink,
  redeemOrganizationLink,
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

  return info.kind === "learner" ? (
    <LearnerForm
      token={token}
      orgName={info.orgName}
      groupName={info.groupName}
      department={info.department}
    />
  ) : (
    <HotelForm token={token} seats={info.seats} term={info.term} />
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

function HotelForm({ token, seats, term }: { token: string; seats: number; term: string }) {
  const [hotelName, setHotelName] = useState("");
  const [legalName, setLegalName] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [address, setAddress] = useState("");
  const [fullName, setFullName] = useState("");
  const [repEmail, setRepEmail] = useState("");
  const account = useAccountFields();
  const navigate = useNavigate();

  async function submit(e: FormEvent) {
    e.preventDefault();
    const company = { legalName, address, taxCode, repEmail };
    const ok = await account.run(
      async (phone) => {
        await redeemOrganizationLink({
          data: { token, hotelName, fullName, phone, password: account.password, ...company },
        });
      },
      () => firstProblem(newOrgDetailsSchema, company),
    );
    if (ok) navigate({ to: "/org-admin" });
  }

  return (
    <Card title="Mở tài khoản khách sạn">
      <p className="mt-3 text-sm text-foreground/75">
        Gói <strong className="text-foreground">{seats} học viên</strong>, thời hạn{" "}
        <strong className="text-foreground">{TERM_LABEL[term] ?? term}</strong>. Người điền form này
        là người đại diện HR của khách sạn, và sẽ là tài khoản quản trị nhân sự (HR) đầu tiên.
      </p>
      <form onSubmit={submit} className="mt-6 space-y-4">
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
function useAccountFields() {
  const [phone, setPhone] = useState("");
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
