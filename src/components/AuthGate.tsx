import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useSession, useProfile, signOut } from "@/lib/auth";
import { useOrgSubscription, orgIsActive, TERM_LABEL } from "@/lib/subscription";
import { useSingleSession, clearSessionId } from "@/lib/single-session";
import { RenewalBanner } from "@/components/RenewalBanner";

// Session lives in localStorage (supabase-js default), so SSR always
// renders "logged out" — this gate only takes effect after hydration.
// Server functions remain independently protected by requireSupabaseAuth.
const PUBLIC_PATHS = new Set(["/login", "/quen-mat-khau"]);

/** Links people are sent: signup links (/join/), payment links (/tt/) and
 *  password-reset links (/dat-lai-mat-khau/). Public like /login, but a
 *  signed-in visitor is NOT sent home: HR opening their own link to test
 *  it, or a learner opening the payment link CS sent them, would otherwise
 *  bounce off it. */
function isSignupLinkPath(pathname: string) {
  return (
    pathname.startsWith("/join/") ||
    pathname.startsWith("/tt/") ||
    pathname.startsWith("/dat-lai-mat-khau/")
  );
}

export function AuthGate({ children }: { children: ReactNode }) {
  const { session, loading: sessionLoading } = useSession();
  const { data: profile, isLoading: profileLoading } = useProfile(session?.user.id);
  const { data: subscription, isFetched: subFetched } = useOrgSubscription(profile?.org_id);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isJoinPath = isSignupLinkPath(pathname);
  const isPublicPath = PUBLIC_PATHS.has(pathname) || isJoinPath;

  // One live session per account — see single-session.ts for why this is a
  // speed bump rather than a lock. Called ONCE: a second call is a second
  // heartbeat, and where storage is blocked each call mints its own id, so
  // the two sign each other out within one heartbeat.
  useSingleSession(session?.user.id, !!session && !isPublicPath);

  useEffect(() => {
    if (sessionLoading) return;

    if (!session && !isPublicPath) {
      navigate({ to: "/login" });
      return;
    }
    if (session && isPublicPath && !isJoinPath) {
      navigate({ to: "/" });
      return;
    }
    if (
      session &&
      !profileLoading &&
      profile?.must_change_password &&
      pathname !== "/change-password"
    ) {
      navigate({ to: "/change-password" });
    }
  }, [
    sessionLoading,
    session,
    isPublicPath,
    isJoinPath,
    profileLoading,
    profile,
    pathname,
    navigate,
  ]);

  if (sessionLoading) return <FullScreenLoader />;
  if (!session && !isPublicPath) return <FullScreenLoader />;
  if (session && isPublicPath && !isJoinPath) return <FullScreenLoader />;

  // A lapsed contract stops the LEARNERS; HR keeps its dashboard so the
  // hotel can still read and export what it paid for. The same rule is a
  // RESTRICTIVE policy on the progress tables, so this screen is the
  // courteous half of a limit the database enforces anyway.
  if (
    session &&
    profile?.role === "member" &&
    !orgIsActive(subscription, subFetched) &&
    !isPublicPath
  ) {
    // Someone who bought for themself has no HR to ask: the one page they
    // still need is the one that tells them how to pay.
    if (profile.organizations?.kind === "individual") {
      if (pathname === "/thanh-toan") return <>{children}</>;
      return <IndividualLapsed trial={subscription?.kind === "trial"} />;
    }
    if (profile.organizations?.kind === "partner_demo") return <PartnerDemoClosed />;
    return <SubscriptionLapsed endsAt={subscription?.endsAt} kind={subscription?.kind} />;
  }

  // A learner who bought for themself sees their renewal on every page —
  // except the one where they pay it.
  if (
    session &&
    profile?.role === "member" &&
    profile.organizations?.kind === "individual" &&
    !isPublicPath &&
    pathname !== "/thanh-toan"
  ) {
    return (
      <>
        <RenewalBanner />
        {children}
      </>
    );
  }

  return <>{children}</>;
}

function IndividualLapsed({ trial }: { trial: boolean }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-md border border-primary/40 bg-card p-8 text-center shadow-xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Tạm dừng truy cập</div>
        <h1 className="font-display mt-3 text-2xl">
          {trial ? "Đã hết thời gian học thử" : "Gói học của bạn đã hết hạn"}
        </h1>
        <p className="mt-4 text-sm text-foreground/75">
          Tiến độ và kết quả của bạn vẫn được giữ nguyên. Thanh toán để học tiếp đúng chỗ đang dở.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <a
            href="/thanh-toan"
            className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground"
          >
            Xem cách thanh toán
          </a>
          <button
            onClick={async () => {
              clearSessionId();
              await signOut();
              window.location.href = "/login";
            }}
            className="border border-primary/40 px-6 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
          >
            Đăng xuất
          </button>
        </div>
      </div>
    </div>
  );
}

function SubscriptionLapsed({ endsAt, kind }: { endsAt?: string; kind?: string }) {
  const ended = endsAt ? new Date(endsAt).toLocaleDateString("vi-VN") : null;
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-md border border-primary/40 bg-card p-8 text-center shadow-xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Tạm dừng truy cập</div>
        <h1 className="font-display mt-3 text-2xl">Gói học của khách sạn đã hết hạn</h1>
        <p className="mt-4 text-sm text-foreground/75">
          {ended ? `Gói ${TERM_LABEL[kind ?? ""] ?? ""} kết thúc ngày ${ended}. ` : ""}
          Tiến độ và kết quả của bạn vẫn được giữ nguyên. Hãy báo bộ phận nhân sự của khách sạn để
          gia hạn — bạn sẽ học tiếp đúng chỗ đang dở.
        </p>
        <button
          onClick={async () => {
            clearSessionId();
            await signOut();
            window.location.href = "/login";
          }}
          className="mt-6 border border-primary/40 px-6 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

/** A partner's own account is open while the partner is active. Nothing to
 *  pay, nobody but Embassy to ask. */
function PartnerDemoClosed() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="max-w-md border border-primary/40 bg-card p-8 text-center shadow-xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Tạm dừng truy cập</div>
        <h1 className="font-display mt-3 text-2xl">Tài khoản đối tác đang tạm khoá</h1>
        <p className="mt-4 text-sm text-foreground/75">
          Tài khoản dùng thử dành cho đối tác mở khi bạn là đối tác đang hoạt động của Embassy
          Language. Tiến độ học vẫn được giữ nguyên. Hãy liên hệ Embassy Language để mở lại.
        </p>
        <button
          onClick={async () => {
            clearSessionId();
            await signOut();
            window.location.href = "/login";
          }}
          className="mt-6 border border-primary/40 px-6 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="animate-pulse text-xs uppercase tracking-[0.3em] text-primary">Đang tải…</div>
    </div>
  );
}
