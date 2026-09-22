import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useSession, useProfile, signOut } from "@/lib/auth";
import { useOrgSubscription, orgIsActive, TERM_LABEL } from "@/lib/subscription";
import { useSingleSession, clearSessionId } from "@/lib/single-session";

// Session lives in localStorage (supabase-js default), so SSR always
// renders "logged out" — this gate only takes effect after hydration.
// Server functions remain independently protected by requireSupabaseAuth.
const PUBLIC_PATHS = new Set(["/login"]);

export function AuthGate({ children }: { children: ReactNode }) {
  const { session, loading: sessionLoading } = useSession();
  const { data: profile, isLoading: profileLoading } = useProfile(session?.user.id);
  const { data: subscription, isFetched: subFetched } = useOrgSubscription(profile?.org_id);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isPublicPath = PUBLIC_PATHS.has(pathname);

  // One live session per account — see single-session.ts for why this is a
  // speed bump rather than a lock.
  useSingleSession(session?.user.id, !!session && !isPublicPath);

  useEffect(() => {
    if (sessionLoading) return;

    if (!session && !isPublicPath) {
      navigate({ to: "/login" });
      return;
    }
    if (session && isPublicPath) {
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
  }, [sessionLoading, session, isPublicPath, profileLoading, profile, pathname, navigate]);

  if (sessionLoading) return <FullScreenLoader />;
  if (!session && !isPublicPath) return <FullScreenLoader />;
  if (session && isPublicPath) return <FullScreenLoader />;

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
    return <SubscriptionLapsed endsAt={subscription?.endsAt} kind={subscription?.kind} />;
  }

  return <>{children}</>;
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

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="animate-pulse text-xs uppercase tracking-[0.3em] text-primary">Đang tải…</div>
    </div>
  );
}
