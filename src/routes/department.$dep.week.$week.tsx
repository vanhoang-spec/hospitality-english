import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getDepartment } from "@/lib/departments";

export const Route = createFileRoute("/department/$dep/week/$week")({
  head: ({ params }) => ({
    meta: [{ title: `Week ${params.week} — Skill Suites` }],
  }),
  component: WeekPage,
});

type Lesson = { id: string; lesson_order: number; title_en: string; title_vi: string };

const SUITES = [
  { slug: "vocab", title: "Premium Vocabulary", tag: "Lexicon" },
  { slug: "grammar", title: "Courteous Grammar", tag: "Etiquette" },
  { slug: "speaking", title: "Elite AI Speaking", tag: "Voice" },
  { slug: "reading", title: "Executive Reading", tag: "Comprehension" },
  { slug: "arcade", title: "VIP Rush Arcade", tag: "Reflex" },
] as const;

function WeekPage() {
  const { dep, week } = Route.useParams();
  const department = getDepartment(dep);
  const [lessons, setLessons] = useState<Lesson[]>([]);

  useEffect(() => {
    if (!department) return;
    (async () => {
      const { data: scen } = await supabase
        .from("scenarios")
        .select("id")
        .eq("department_id", department.code)
        .eq("week_number", Number(week))
        .maybeSingle();
      if (!scen) return;
      const { data: ls } = await supabase
        .from("lessons")
        .select("id, lesson_order, title_en, title_vi")
        .eq("scenario_id", (scen as { id: string }).id)
        .order("lesson_order");
      setLessons((ls as Lesson[]) ?? []);
    })();
  }, [department?.code, week]);

  if (!department) throw notFound();

  return (
    <main className="relative min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}>
          <Link to="/department/$dep" params={{ dep: department.code }} className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80">
            ← {department.name_en}
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Tier III — Skill Suites Hub</span>
          </div>
          <h1 className="font-display mt-3 text-5xl">
            Week {week} <span className="italic text-primary">— {department.name_en}</span>
          </h1>
        </motion.div>

        {lessons.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-10 border border-primary/30 bg-card p-6 shadow-xl"
          >
            <div className="text-xs uppercase tracking-[0.3em] text-primary">This Week's Micro-Lessons</div>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2">
              {lessons.map((l) => (
                <li key={l.id} className="border-l-2 border-primary/40 px-4 py-2">
                  <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">Lesson {l.lesson_order}</div>
                  <div className="font-display text-base">{l.title_en}</div>
                  <div className="text-xs italic text-foreground/60">{l.title_vi}</div>
                </li>
              ))}
            </ul>
          </motion.section>
        )}

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {SUITES.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 + i * 0.06 }}
            >
              <Link
                to="/learn/$dep/$week/$suite"
                params={{ dep: department.code, week, suite: s.slug }}
                className="group relative block h-56 overflow-hidden border border-primary/40 bg-card p-6 shadow-xl transition-all hover:border-primary hover:-translate-y-1"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 40%, transparent), transparent 70%)" }}
                />
                <div className="text-xs uppercase tracking-[0.3em] text-primary">{s.tag}</div>
                <h3 className="font-display mt-4 text-2xl text-foreground">{s.title}</h3>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-[0.2em] text-foreground/60">Enter</span>
                  <span className="font-display text-2xl text-primary transition-transform group-hover:translate-x-1">→</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
