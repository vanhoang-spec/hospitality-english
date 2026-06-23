import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { findWeek } from "@/lib/curriculum";

type DepartmentMeta = {
  code: string;
  name_en: string;
  name_vi?: string;
};

const SUITE_DOORS = [
  {
    slug: "vocab",
    title: "Premium Vocabulary",
    tag: "Lexicon",
    detail: "Five-star terms, IPA pronunciation, and Vietnamese meaning.",
  },
  {
    slug: "grammar",
    title: "Courteous Grammar",
    tag: "Etiquette",
    detail: "Transform blunt phrases into polished luxury service language.",
  },
  {
    slug: "speaking",
    title: "Elite AI Speaking",
    tag: "Voice",
    detail: "Practice concierge-grade responses with guided scoring.",
  },
  {
    slug: "reading",
    title: "Executive Reading",
    tag: "Insight",
    detail: "Decode guest reviews and identify LQA compliance signals.",
  },
  {
    slug: "arcade",
    title: "VIP Rush Arcade",
    tag: "Reflex",
    detail: "Smash peak-hour tasks and sharpen operational response speed.",
  },
] as const;

export function Tier3SkillSuitesHub({ department, week }: { department: DepartmentMeta; week: string }) {
  const fallback = findWeek(department.code, week);
  const fallbackLessons = fallback?.lessons.map((vi, i) => ({
    id: `local-${department.code}-${week}-${i + 1}`,
    lesson_order: i + 1,
    title_vi: vi,
  })) ?? [];
  const [lessons, setLessons] = useState<
    { id: string; lesson_order: number; title_vi: string }[]
  >(fallbackLessons);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const { data: scen } = await supabase
        .from("scenarios")
        .select("id")
        .eq("department_id", department.code)
        .eq("week_number", parseInt(week, 10))
        .maybeSingle();
      if (!scen || cancelled) return;
      const { data: rows } = await supabase
        .from("lessons")
        .select("id, lesson_order, title_vi")
        .eq("scenario_id", scen.id)
        .order("lesson_order");
      if (!cancelled && rows && rows.length > 0) setLessons(rows);
    })();
    return () => { cancelled = true; };
  }, [department.code, week]);
  return (
    <main className="relative min-h-[calc(100vh-72px)] bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.55 }}>
          <Link
            to="/department/$dep"
            params={{ dep: department.code }}
            className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80"
          >
            ← {department.name_en} Timeline
          </Link>
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Skill Suites Hub</span>
          </div>
          <h1 className="font-display mt-3 text-4xl text-foreground md:text-5xl">
            Week {week} <span className="italic text-primary">Golden Service Suites</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/70">
            {department.name_en}{department.name_vi ? ` · ${department.name_vi}` : ""}. Select one suite door to begin this shift module. <span className="italic text-foreground/60">Hãy chọn một cánh cửa suite để bắt đầu module ca làm việc này.</span>
          </p>
        </motion.div>



        {lessons.length > 0 && (
          <section
            aria-label="Week sub-lesson timeline"
            className="mt-10 border border-primary/25 bg-card/60 p-5 shadow-xl md:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                Shift Sub-Lessons · 4 Steps
              </span>
            </div>
            <ol className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {lessons.map((l, i) => (
                <motion.li
                  key={l.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.05 * i }}
                  className="relative flex gap-3 border border-primary/25 bg-background/40 p-4"
                >
                  <span className="font-display flex h-9 w-9 flex-none items-center justify-center border border-primary/50 text-sm text-primary">
                    {week}.{l.lesson_order}
                  </span>
                  <p className="text-sm leading-6 text-foreground/85">{l.title_vi}</p>
                </motion.li>
              ))}
            </ol>
          </section>
        )}

        <section className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5" aria-label="Golden Service Suite doors">
          {SUITE_DOORS.map((suite, index) => (
            <motion.div
              key={suite.slug}
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.45, delay: index * 0.06 }}
            >
              <Link
                to="/learn/$dep/$week/$suite"
                params={{ dep: department.code, week, suite: suite.slug }}
                onClick={() => document.body.setAttribute("data-active-suite", suite.slug)}
                className="group relative flex h-64 flex-col overflow-hidden border border-primary/30 bg-card p-5 text-left shadow-xl transition-colors hover:border-primary focus:outline-none focus:ring-2 focus:ring-primary/70"
              >
                <span className="text-xs uppercase tracking-[0.3em] text-primary">{suite.tag}</span>
                <span className="font-display mt-5 block text-2xl leading-tight text-foreground">{suite.title}</span>
                <span className="mt-4 block text-sm leading-6 text-foreground/62">{suite.detail}</span>
                <span className="mt-auto flex items-center justify-between pt-8 text-xs uppercase tracking-[0.22em] text-primary">
                  Enter Suite
                  <span className="font-display text-2xl transition-transform group-hover:translate-x-1">→</span>
                </span>
              </Link>
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
}