import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Maison Lumière — Hospitality Academy" },
      {
        name: "description",
        content:
          "An immersive five-star training academy crafting the next generation of hospitality leaders.",
      },
      { property: "og:title", content: "Maison Lumière — Hospitality Academy" },
      {
        property: "og:description",
        content:
          "An immersive five-star training academy crafting the next generation of hospitality leaders.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            "radial-gradient(ellipse at top, color-mix(in oklab, var(--gold) 14%, transparent), transparent 60%)",
        }}
      />

      <div className="relative mx-auto flex min-h-screen max-w-6xl flex-col px-8 py-10">
        <header className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-3"
          >
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Maison Lumière
            </span>
          </motion.div>
          <nav className="hidden gap-10 text-sm text-foreground/80 md:flex">
            {["Curriculum", "Faculty", "Residency", "Admissions"].map((item) => (
              <a
                key={item}
                href="#"
                className="border-b border-transparent pb-1 transition-colors hover:border-primary hover:text-foreground"
              >
                {item}
              </a>
            ))}
          </nav>
        </header>

        <section className="flex flex-1 flex-col items-start justify-center py-24">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1 }}
            className="text-xs uppercase tracking-[0.4em] text-primary"
          >
            Est. 1924 — Paris · Tokyo · New York
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="font-display mt-6 max-w-4xl text-6xl leading-[1.05] md:text-7xl"
          >
            The quiet art of
            <span className="block italic text-primary">extraordinary service.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35 }}
            className="mt-8 max-w-xl text-base leading-relaxed text-foreground/80"
          >
            An invitation-only academy training the world's most discerning hoteliers,
            sommeliers, and concierges. Where heritage meets precision, and every gesture
            becomes a signature.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="mt-12 flex flex-wrap items-center gap-4"
          >
            <button className="rounded-sm bg-primary px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-primary-foreground shadow-xl transition-transform hover:-translate-y-0.5">
              Request Prospectus
            </button>
            <button className="rounded-sm border border-primary/30 px-8 py-3 text-sm font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:border-primary hover:text-primary">
              Explore Programmes
            </button>
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="grid gap-px border border-primary/30 bg-primary/20 md:grid-cols-3"
        >
          {[
            { k: "98%", v: "Placement at Forbes Five-Star properties" },
            { k: "1:6", v: "Mentor to apprentice ratio" },
            { k: "32", v: "Master instructors across three continents" },
          ].map((stat) => (
            <div key={stat.k} className="bg-background p-8 shadow-xl">
              <div className="font-display text-4xl text-primary">{stat.k}</div>
              <p className="mt-3 text-sm text-foreground/70">{stat.v}</p>
            </div>
          ))}
        </motion.section>
      </div>
    </main>
  );
}
