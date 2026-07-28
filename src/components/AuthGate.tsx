import { useEffect, type ReactNode } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import { useSession, useProfile } from "@/lib/auth";

// Session lives in localStorage (supabase-js default), so SSR always
// renders "logged out" — this gate only takes effect after hydration.
// Server functions remain independently protected by requireSupabaseAuth.
const PUBLIC_PATHS = new Set(["/login"]);

export function AuthGate({ children }: { children: ReactNode }) {
  const { session, loading: sessionLoading } = useSession();
  const { data: profile, isLoading: profileLoading } = useProfile(session?.user.id);
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;
  const isPublicPath = PUBLIC_PATHS.has(pathname);

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

  return <>{children}</>;
}

function FullScreenLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="animate-pulse text-xs uppercase tracking-[0.3em] text-primary">Đang tải…</div>
    </div>
  );
}
