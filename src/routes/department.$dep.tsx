import { createFileRoute, Link, notFound, useParams } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Tier3SkillSuitesHub } from "@/components/Tier3SkillSuitesHub";
import { getDepartment } from "@/lib/departments";
import { AVAILABLE_WEEKS, getWeekContent } from "@/lib/content/week-content";
import { isCheckpointWeek } from "@/lib/phases";
import { useWeekAccess } from "@/lib/week-access";

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
  const access = useWeekAccess(dep ?? "");

  // The timeline titles come straight from the authored content
  // (week-content.ts), the same source of truth the week hub uses. The
  // DB `scenarios` table is legacy CMS scaffolding whose titles drifted
  // out of sync with the authored weeks — reading it here is what showed
  // placeholder "Front Office — Week 31" names instead of real titles.
  const scenarios: Scenario[] | null = department
    ? AVAILABLE_WEEKS.flatMap((w) => {
        const content = getWeekContent(department.code, w);
        if (!content) return [];
        return [
          {
            id: `${department.code}-${w}`,
            week_number: w,
            title_en: content.weekTitleEn,
            title_vi: content.weekTitleVi,
          },
        ];
      })
    : null;

  if (!department) throw notFound();

  if (weekNumber) {
    return <Tier3SkillSuitesHub department={department} week={weekNumber} />;
  }

  return (
    <main className="relative min-h-[calc(100vh-72px)]">
      <div className="mx-auto max-w-5xl px-6 py-12 md:px-10">
        <motion.div
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Link to="/" className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80">
            ← Departments Lounge
          </Link>
          <div className="mt-4 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Shift Timeline</span>
          </div>
          <h1 className="font-display mt-3 text-5xl">
            {department.name_en} <span className="italic text-primary">— 40 Weeks</span>
          </h1>
          <p className="mt-2 text-sm text-foreground/70">
            {department.tagline}. Each week is a 4-hour shift, partitioned into 4 micro-lessons.{" "}
            <span className="italic text-foreground/60">
              Mỗi tuần là một ca làm 4 giờ, được chia thành 4 bài học nhỏ.
            </span>
          </p>

          {/* Where the learner stands in the five-phase frame, and the one
              test that opens the next stretch of weeks. */}
          {access.ready && access.next && (
            <div className="mt-5 border border-primary/30 bg-card/70 p-4 text-sm shadow-xl">
              <span className="text-xs uppercase tracking-[0.25em] text-primary">
                Lộ trình của bạn
              </span>
              <p className="mt-2 text-foreground/80">
                Đang mở đến hết tuần <strong>{access.next.to}</strong> — giai đoạn{" "}
                <strong>{access.next.nameVi}</strong> ({access.next.band}). Qua bài sát hạch tuần{" "}
                <strong>{access.next.checkpointWeek}</strong> để mở giai đoạn tiếp theo.
              </p>
            </div>
          )}
        </motion.div>

        <div className="mt-12 relative">
          <div
            className="absolute left-4 top-0 bottom-0 w-px bg-primary/30 md:left-6"
            aria-hidden
          />
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
              {scenarios.map((s, i) => {
                // Until the learner's checkpoint history has loaded, weeks
                // render open: a lock that appears a beat late on a week
                // they have already earned is worse than none at all.
                const locked = access.ready && !access.isUnlocked(s.week_number);
                const checkpoint = isCheckpointWeek(s.week_number);
                return (
                  <motion.li
                    key={s.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.45, delay: 0.05 * i }}
                    className="relative pl-12 md:pl-16"
                  >
                    <span
                      className={`absolute left-0 top-3 flex h-9 w-9 items-center justify-center border bg-card font-display text-sm shadow-xl md:left-1.5 md:h-10 md:w-10 ${
                        locked
                          ? "border-foreground/20 text-foreground/40"
                          : "border-primary/40 text-primary"
                      }`}
                    >
                      {locked ? "🔒" : s.week_number}
                    </span>
                    {locked ? (
                      <div
                        aria-disabled="true"
                        className="block border border-foreground/15 bg-card/50 p-5 shadow-xl"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-xl text-foreground/45">{s.title_en}</h3>
                          <span className="text-xs uppercase tracking-[0.2em] text-foreground/35">
                            Week {s.week_number} · 4h
                          </span>
                        </div>
                        {s.title_vi && (
                          <p className="mt-1 text-sm italic text-foreground/35">{s.title_vi}</p>
                        )}
                        <div className="mt-3 text-xs uppercase tracking-[0.22em] text-foreground/45">
                          🔒 Mở sau khi qua sát hạch tuần {access.next?.checkpointWeek}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to="/department/$dep/week/$week"
                        params={{ dep: department.code, week: String(s.week_number) }}
                        className="block border border-primary/30 bg-card p-5 shadow-xl transition-colors hover:border-primary"
                      >
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <h3 className="font-display text-xl text-foreground">{s.title_en}</h3>
                          <span className="text-xs uppercase tracking-[0.2em] text-foreground/50">
                            Week {s.week_number} · 4h
                          </span>
                        </div>
                        {s.title_vi && (
                          <p className="mt-1 text-sm italic text-foreground/60">{s.title_vi}</p>
                        )}
                        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs uppercase tracking-[0.25em] text-primary">
                          <span>Open shift →</span>
                          {checkpoint && (
                            <span className="border border-primary/40 px-2 py-0.5 tracking-[0.18em] text-primary/90">
                              Sát hạch · mở giai đoạn sau
                            </span>
                          )}
                        </div>
                      </Link>
                    )}
                  </motion.li>
                );
              })}
            </ol>
          )}
        </div>
      </div>
    </main>
  );
}
