import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import logoAsset from "@/assets/embassy-logo.png.asset.json";
import { useAcademy } from "@/lib/academy-store";

export function AcademyNav() {
  const { state, update, jobRank } = useAcademy();
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(state.full_name);
  const [shimmer, setShimmer] = useState(false);
  const prevStars = useRef(state.service_stars);

  useEffect(() => setName(state.full_name), [state.full_name, editing]);

  useEffect(() => {
    if (state.service_stars !== prevStars.current) {
      setShimmer(true);
      const t = setTimeout(() => setShimmer(false), 1200);
      prevStars.current = state.service_stars;
      return () => clearTimeout(t);
    }
  }, [state.service_stars]);

  function save() {
    update({ full_name: name.trim() || "Esteemed Apprentice" });
    setEditing(false);
  }

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-primary/30 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 md:px-8">
          <Link
            to="/"
            className="flex items-center gap-3 rounded-sm p-1 ring-1 ring-primary/30 transition-shadow hover:shadow-[0_0_24px_-4px_var(--gold)]"
            aria-label="Embassy Language home"
          >
            <img src={logoAsset.url} alt="Embassy Language Academy" style={{ height: 40 }} className="block" />
          </Link>

          <button
            onClick={() => setEditing(true)}
            className="hidden truncate rounded-sm border border-primary/30 px-3 py-1.5 text-sm text-foreground/90 transition-colors hover:border-primary hover:text-primary md:block"
          >
            <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Apprentice</span>
            <span className="ml-2 font-display text-base">{state.full_name}</span>
          </button>

          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="rounded-sm border border-primary/30 px-4 py-1.5 text-center shadow-xl">
              <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">Job Rank</div>
              <div className="font-display text-lg text-primary">{jobRank}</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/appraisal"
              className="hidden rounded-sm border border-primary/30 px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80 transition-colors hover:border-primary hover:text-primary md:inline-flex"
            >
              Appraisal
            </Link>
            <Shield
              icon="⭐"
              value={state.service_stars}
              label="Stars"
              shimmer={shimmer}
            />
            <Shield icon="🔥" value={state.daily_streak} label="Streak" pulse />
          </div>
        </div>
      </header>

      <AnimatePresence>
        {editing && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setEditing(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full max-w-md border border-primary/40 bg-card p-8 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-xs uppercase tracking-[0.3em] text-primary">Personal Dossier</div>
              <h2 className="font-display mt-3 text-3xl">Edit your name</h2>
              <p className="mt-2 text-sm text-foreground/70">
                As it shall appear on your guest register and promotion review.
              </p>
              <input
                autoFocus
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && save()}
                className="mt-6 w-full border border-primary/30 bg-background px-4 py-3 font-display text-xl text-foreground outline-none focus:border-primary"
              />
              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={() => setEditing(false)}
                  className="px-5 py-2 text-xs uppercase tracking-[0.2em] text-foreground/70 hover:text-foreground"
                >
                  Cancel
                </button>
                <button
                  onClick={save}
                  className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl hover:-translate-y-0.5 transition-transform"
                >
                  Save
                </button>
              </div>
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
