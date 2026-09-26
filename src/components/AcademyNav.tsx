import { Link, useLocation } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logoSrc from "@/assets/Logo_EmbassyHospitality_filetrong.png";
import { useAcademy } from "@/lib/academy-store";
import { useSession, useProfile, signOut } from "@/lib/auth";

export function AcademyNav() {
  const location = useLocation();
  const { state, jobRank } = useAcademy();
  const { session } = useSession();
  const { data: profile } = useProfile(session?.user.id);
  const [menuOpen, setMenuOpen] = useState(false);
  const [shimmer, setShimmer] = useState(false);
  const prevStars = useRef(state.service_stars);

  useEffect(() => {
    if (state.service_stars !== prevStars.current) {
      setShimmer(true);
      const t = setTimeout(() => setShimmer(false), 1200);
      prevStars.current = state.service_stars;
      return () => clearTimeout(t);
    }
  }, [state.service_stars]);

  if (location.pathname === "/login") return null;

  const displayName = profile?.full_name || "Esteemed Apprentice";
  const orgName = profile?.organizations?.name;
  const isOrgAdmin = profile?.role === "org_admin";
  const isPlatformAdmin = profile?.role === "super_admin";

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-primary/30 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-sm p-1 ring-1 ring-primary/30 transition-shadow hover:shadow-[0_0_24px_-4px_var(--gold)]"
            aria-label="Embassy Hospitality home"
          >
            <img src={logoSrc} alt="Embassy Hospitality" style={{ height: 40 }} className="block" />
          </Link>

          <button
            onClick={() => setMenuOpen(true)}
            className="hidden truncate rounded-sm border border-primary/30 px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-primary hover:text-primary md:block"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
              {orgName ?? "Apprentice"}
            </span>
            <span className="ml-2 font-display text-base">{displayName}</span>
          </button>

          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="rounded-sm border border-primary/30 px-4 py-1.5 text-center shadow-xl">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">
                Your Career Growth
              </div>
              <div className="font-display text-lg text-primary">{jobRank}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isOrgAdmin && (
              <>
                <Link
                  to="/org-admin"
                  className="hidden rounded-sm border border-primary/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary hover:text-primary md:inline-flex"
                >
                  Team
                </Link>
                <Link
                  to="/org-reports"
                  className="hidden rounded-sm border border-primary/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary hover:text-primary lg:inline-flex"
                >
                  Báo cáo
                </Link>
                <Link
                  to="/org-access"
                  className="hidden rounded-sm border border-primary/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary hover:text-primary lg:inline-flex"
                >
                  Nhóm
                </Link>
              </>
            )}
            {isPlatformAdmin && (
              <Link
                to="/admin-console"
                className="hidden rounded-sm border border-primary/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary hover:text-primary md:inline-flex"
              >
                Nền tảng
              </Link>
            )}
            <Link
              to="/appraisal"
              className="hidden rounded-sm border border-primary/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary hover:text-primary md:inline-flex"
            >
              Appraisal
            </Link>
            <Shield icon="⭐" value={state.service_stars} label="Stars" shimmer={shimmer} />
            <Shield icon="🔥" value={state.daily_streak} label="Streak" pulse />
            <button
              onClick={() => setMenuOpen(true)}
              className="rounded-sm border border-primary/30 px-2.5 py-1.5 text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary hover:text-primary md:hidden"
              aria-label="Account menu"
            >
              👤
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMenuOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-sm border border-primary/40 bg-card p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-primary">
                Personal Dossier
              </div>
              <h2 className="font-display mt-3 text-2xl">{displayName}</h2>
              {orgName && <p className="mt-1 text-sm text-foreground/60">{orgName}</p>}

              <div className="mt-6 flex flex-col gap-2">
                {isOrgAdmin && (
                  <Link
                    to="/org-admin"
                    onClick={() => setMenuOpen(false)}
                    className="border border-primary/30 px-4 py-2.5 text-center text-xs uppercase tracking-[0.2em] text-foreground/80 hover:border-primary hover:text-primary"
                  >
                    Team
                  </Link>
                )}
                <Link
                  to="/change-password"
                  onClick={() => setMenuOpen(false)}
                  className="border border-primary/30 px-4 py-2.5 text-center text-xs uppercase tracking-[0.2em] text-foreground/80 hover:border-primary hover:text-primary"
                >
                  Đổi mật khẩu
                </Link>
                <button
                  onClick={async () => {
                    setMenuOpen(false);
                    await signOut();
                  }}
                  className="bg-primary px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl hover:-translate-y-0.5 transition-transform"
                >
                  Đăng xuất
                </button>
              </div>

              <button
                onClick={() => setMenuOpen(false)}
                className="mt-6 w-full text-center text-xs uppercase tracking-[0.2em] text-foreground/50 hover:text-foreground"
              >
                Đóng
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function Shield({
  icon,
  value,
  label,
  shimmer,
  pulse,
}: {
  icon: string;
  value: number;
  label: string;
  shimmer?: boolean;
  pulse?: boolean;
}) {
  return (
    <div
      className={`relative flex items-center gap-2 overflow-hidden border border-primary/40 bg-card px-3 py-1.5 shadow-xl ${
        pulse ? "animate-[pulse_2.6s_ease-in-out_infinite]" : ""
      }`}
      title={label}
    >
      <span className="text-base leading-none">{icon}</span>
      <span className="font-display text-base text-primary">{value}</span>
      {shimmer && (
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "linear-gradient(110deg, transparent 30%, color-mix(in oklab, var(--gold) 60%, transparent) 50%, transparent 70%)",
            animation: "shimmer 1.1s ease-out",
          }}
        />
      )}
      <style>{`@keyframes shimmer { 0% { transform: translateX(-100%) } 100% { transform: translateX(100%) } }`}</style>
    </div>
  );
}
