import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { DEPARTMENTS, getDepartment } from "@/lib/departments";
import { useSession } from "@/lib/auth";
import { fetchDueCount } from "@/lib/review";
import { getWeekContent } from "@/lib/content/week-content";
import { CORE_SUITES, useDepartmentProgress, useLastPlace } from "@/lib/progress";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Departments Lounge — Hospitality English Academy" },
      {
        name: "description",
        content: "Choose your training department in the Embassy Hospitality Academy lounge.",
      },
    ],
  }),
  component: Lounge,
});

function ReviewBanner() {
  const { session } = useSession();
  const userId = session?.user.id;
  const dueQuery = useQuery({
    queryKey: ["review-due-count", userId],
    queryFn: () => fetchDueCount(userId as string),
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });
  const due = dueQuery.data ?? 0;
  if (due === 0) return null;
  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
      <Link
        to="/review"
        className="flex flex-wrap items-center justify-between gap-3 border border-primary bg-primary/10 px-5 py-4 shadow-xl transition-colors hover:bg-primary/15"
      >
        <div>
          <span className="font-display text-lg text-foreground">
            🔁 Ôn tập hôm nay — {due} mục đến hạn
          </span>
          <p className="mt-0.5 text-xs text-foreground/65">
            Vài phút ôn đúng thời điểm giúp từ vựng ở lại trí nhớ lâu dài. Hoàn thành để giữ chuỗi
            ngày học 🔥
          </p>
        </div>
        <span className="text-xs uppercase tracking-[0.25em] text-primary">Bắt đầu →</span>
      </Link>
    </motion.div>
  );
}

/**
 * The way back in (backlog P2-4).
 *
 * Returning used to cost five deliberate steps — home, remember your
 * department, scroll a forty-week timeline, remember your week, pick a
 * suite — every one of them a place to give up. This card collapses that
 * to one tap, and it is the first thing on the page for exactly that
 * reason: a learner coming back mid-programme is not here to browse six
 * departments they already chose between weeks ago.
 */
function ContinueCard() {
  const { place, ready } = useLastPlace();
  const progress = useDepartmentProgress(place?.dep ?? "");

  if (!ready || !place) return null;
  const department = getDepartment(place.dep);
  if (!department) return null;

  const content = getWeekContent(department.code, place.week);
  const week = progress.byWeek.get(place.week);
  const done = week?.done ?? 0;

  return (
    <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mt-8">
      <Link
        to="/department/$dep/week/$week"
        params={{ dep: department.code, week: String(place.week) }}
        className="flex flex-wrap items-center justify-between gap-4 border border-primary bg-card px-5 py-5 shadow-xl transition-colors hover:border-primary hover:bg-primary/5"
      >
        <div className="min-w-0">
          <span className="text-xs uppercase tracking-[0.3em] text-primary">Tiếp tục học</span>
          <p className="font-display mt-2 text-2xl leading-tight text-foreground">
            {department.name_vi} · Tuần {place.week}
          </p>
          {content && (
            <p className="mt-1 truncate text-sm italic text-foreground/60">{content.weekTitleVi}</p>
          )}
          {/* Only claimed once the rows are in. "0/6 suite" rendered while
              the query is still in flight reads as progress wiped. */}
          {progress.ready && (
            <p className="mt-2 text-xs text-foreground/70">
              Đã hoàn thành {done}/{CORE_SUITES.length} suite của tuần này
              {week && week.stars > 0 ? ` · ⭐ ${week.stars}` : ""}
            </p>
          )}
        </div>
        <span className="shrink-0 border border-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary">
          Vào học →
        </span>
      </Link>
    </motion.div>
  );
}

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
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Departments Lounge
            </span>
          </div>
          <h1 className="font-display mt-4 text-5xl leading-tight md:text-6xl">
            Choose your <span className="italic text-primary">atelier</span>.
          </h1>
          <p className="mt-3 max-w-2xl text-sm text-foreground/70">
            Six departments. Forty weeks each. A quiet path to five-star fluency. Select a card to
            enter the workplace shift timeline.
          </p>
          <p className="mt-2 max-w-2xl text-sm italic text-foreground/50">
            Sáu bộ phận. Bốn mươi tuần học chuyên sâu. Hành trình tinh tế chạm ngưỡng lưu loát chuẩn
            5 sao. Hãy chọn một thẻ để bước vào ca làm việc thực tế.
          </p>
        </motion.div>

        <ContinueCard />
        <ReviewBanner />

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
    >
      <Link
        to="/department/$dep"
        params={{ dep: dep.code }}
        className="block h-full w-full"
        aria-label={`Open ${dep.name_en} shift timeline`}
        onClick={() => setFlipped(true)}
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
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-foreground/50">
                {dep.tagline}
              </p>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-4 border border-primary bg-card p-7 text-center shadow-xl"
            style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
          >
            <span className="text-xs uppercase tracking-[0.3em] text-primary">Enter</span>
            <h3 className="font-display text-2xl text-foreground">{dep.name_en}</h3>
            <span className="border border-primary/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary">
              40-week shift timeline →
            </span>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
}
