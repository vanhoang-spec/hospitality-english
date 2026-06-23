import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Tier3SkillSuitesHub } from "@/components/Tier3SkillSuitesHub";
import { getDepartment } from "@/lib/departments";
import { weeksForDepartment } from "@/lib/curriculum";

export const Route = createFileRoute("/department/$dep")({
  head: ({ params }) => {
    const d = getDepartment(params.dep);
    return {
      meta: [{ title: `${d?.name_en ?? "Department"} — Shift Timeline` }],
    };
  },
  component: DeptPage,
  notFoundComponent: () => (
    <div className="p-10 text-center text-foreground/70">Department not found.</div>
  ),
});

type Scenario = { id: string; week_number: number; title_en: string; title_vi: string };

function DeptPage() {
  const routeParams = Route.useParams();
  const allParams = useParams({ strict: false }) as { dep?: string; week?: string };
  const dep = allParams.dep ?? routeParams.dep;
  const weekNumber = allParams.week;
  const department = getDepartment(dep);
  const [scenarios, setScenarios] = useState<Scenario[] | null>(null);

  useEffect(() => {
    if (!department || weekNumber) return;
    let cancelled = false;
    supabase
      .from("scenarios")
      .select("id, week_number, title_en, title_vi")
      .eq("department_id", department.code)
      .order("week_number")
      .then(({ data }) => {
        if (cancelled) return;
        const rows = (data as Scenario[]) ?? [];
        if (rows.length > 0) {
          setScenarios(rows);
        } else {
          // Local fallback so the timeline still mounts with zero missing nodes.
          setScenarios(
            weeksForDepartment(department.code).map((w) => ({
              id: `local-${w.department_id}-${w.week_number}`,
              week_number: w.week_number,
              title_en: w.title_en,
              title_vi: w.title_vi,
            })),
          );
        }
      });
    return () => { cancelled = true; };
  }, [department?.code, weekNumber]);

  if (!department) throw notFound();

  if (weekNumber) {
    return <Tier3SkillSuitesHub department={department} week={weekNumber} />;
  }

  return (
    <main className="relative min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-10">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80">
            ← Departments Lounge
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Shift Timeline</span>
          </div>
          <h1 className="font-display mt-3 text-5xl">
            {department.name_en}{" "}
            <span className="italic text-primary">— 20 Weeks</span>
          </h1>
          <p className="mt-2 text-sm text-foreground/70">{department.tagline}. Each week is a 4-hour shift, partitioned into 4 micro-lessons. <span className="italic text-foreground/60">Mỗi tuần là một ca làm 4 giờ, được chia thành 4 bài học nhỏ.</span></p>
        </motion.div>

        <div className="mt-12 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/30 md:left-6" aria-hidden />
          {scenarios === null ? (
            <ol className="space-y-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="relative pl-12 md:pl-16">
                  <span className="absolute left-0 top-3 h-9 w-9 border border-primary/20 bg-card md:left-1.5 md:h-10 md:w-10" />
                  <div className="h-20 animate-pulse border border-primary/20 bg-card/60 shadow-xl" />
                </li>
              ))}
            </ol>
          ) : scenarios.length === 0 ? (
            <div className="ml-12 border border-primary/30 bg-card p-8 text-center shadow-xl md:ml-16">
              <p className="font-display text-2xl text-primary">Awaiting Standardization</p>
              <p className="mt-3 text-sm text-foreground/70">
                This department's operational shift timeline is currently being standardized by HR.
              </p>
              <Link
                to="/admin-lounge"
                className="mt-5 inline-block border border-primary px-5 py-2 text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary/10"
              >
                Visit Admin Lounge →
              </Link>
            </div>
          ) : (
            <ol className="space-y-4">
              {scenarios.map((s, i) => (
                <motion.li
                  key={s.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, delay: 0.05 * i }}
                  className="relative pl-12 md:pl-16"
                >
                  <span className="absolute left-0 top-3 flex h-9 w-9 items-center justify-center border border-primary/40 bg-card font-display text-sm text-primary shadow-xl md:left-1.5 md:h-10 md:w-10">
                    {s.week_number}
                  </span>
                  <Link
                    to="/department/$dep/week/$week"
                    params={{ dep: department.code, week: String(s.week_number) }}
                    className="block border border-primary/30 bg-card p-5 shadow-xl transition-colors hover:border-primary"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-display text-xl text-foreground">{s.title_en}</h3>
                      <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">Week {s.week_number} · 4h</span>
                    </div>
                    {s.title_vi && <p className="mt-1 text-sm italic text-foreground/60">{s.title_vi}</p>}
                    <div className="mt-3 text-xs uppercase tracking-[0.25em] text-primary">Open shift →</div>
                  </Link>
                </motion.li>
              ))}
            </ol>
          )}
        </div>
      </div>
    </main>
  );
}
