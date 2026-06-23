import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getDepartment } from "@/lib/departments";

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
  const { dep } = Route.useParams();
  const department = getDepartment(dep);
  const [scenarios, setScenarios] = useState<Scenario[] | null>(null);

  useEffect(() => {
    if (!department) return;
    supabase
      .from("scenarios")
      .select("id, week_number, title_en, title_vi")
      .eq("department_id", department.code)
      .order("week_number")
      .then(({ data }) => setScenarios((data as Scenario[]) ?? []));
  }, [department?.code]);

  if (!department) throw notFound();

  return (
    <main className="relative min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-10">
        <motion.div initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
          <Link to="/" className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80">
            ← Departments Lounge
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Tier II — Shift Timeline</span>
          </div>
          <h1 className="font-display mt-3 text-5xl">
            {department.name_en}{" "}
            <span className="italic text-primary">— 20 Weeks</span>
          </h1>
          <p className="mt-2 text-sm text-foreground/70">{department.tagline}. Each week is a 4-hour shift, partitioned into 4 micro-lessons.</p>
        </motion.div>

        <div className="mt-12 relative">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-primary/30 md:left-6" aria-hidden />
          <ol className="space-y-4">
            {(scenarios ?? Array.from({ length: 6 }, (_, i) => ({ id: String(i), week_number: i + 1, title_en: "Loading…", title_vi: "" }))).map(
              (s, i) => (
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
              ),
            )}
          </ol>
        </div>
      </div>
    </main>
  );
}
