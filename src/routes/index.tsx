import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { DEPARTMENTS } from "@/lib/departments";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Departments Lounge — Hospitality English Academy" },
      { name: "description", content: "Choose your training department in the Embassy Language Academy lounge." },
    ],
  }),
  component: Lounge,
});

function Lounge() {
  return (
    <main className="relative min-h-[calc(100vh-72px)] overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in oklab, var(--gold) 14%, transparent), transparent 60%)",
        }}
      />
      <div className="relative mx-auto max-w-7xl px-6 py-12 md:px-10 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Tier I — Departments Lounge</span>
          </div>
          <h1 className="font-display mt-4 text-5xl leading-tight md:text-6xl">
            Choose your <span className="italic text-primary">atelier</span>.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-foreground/70">
            Six departments. Twenty weeks each. A quiet path to five-star fluency. Select a card to enter the workplace shift timeline.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {DEPARTMENTS.map((d, i) => (
            <FlipCard key={d.code} index={i} dep={d} />
          ))}
        </div>
      </div>
    </main>
  );
}

function FlipCard({ dep, index }: { dep: (typeof DEPARTMENTS)[number]; index: number }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.1 + index * 0.06 }}
      style={{ perspective: 1200 }}
      className="group h-64"
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((v) => !v)}
    >
      <motion.div
        className="relative h-full w-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 flex flex-col justify-between border border-primary/30 bg-card p-7 shadow-xl"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="flex items-start justify-between">
            <span className="text-xs uppercase tracking-[0.3em] text-primary">{dep.code}</span>
            <span className="font-display text-3xl text-primary/70">{dep.motif}</span>
          </div>
          <div>
            <h3 className="font-display text-3xl text-foreground">{dep.name_en}</h3>
            <p className="mt-1 text-sm italic text-foreground/60">{dep.name_vi}</p>
            <p className="mt-4 text-xs uppercase tracking-[0.25em] text-foreground/50">{dep.tagline}</p>
          </div>
        </div>

        {/* Back */}
        <Link
          to="/department/$dep"
          params={{ dep: dep.code }}
          className="absolute inset-0 flex flex-col items-center justify-center gap-4 border border-primary bg-card p-7 text-center shadow-xl"
          style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
        >
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Enter</span>
          <h3 className="font-display text-2xl text-foreground">{dep.name_en}</h3>
          <span className="border border-primary/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary">
            20-week shift timeline →
          </span>
        </Link>
      </motion.div>
    </motion.div>
  );
}
