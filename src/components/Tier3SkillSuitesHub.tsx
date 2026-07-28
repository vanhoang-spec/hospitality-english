import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { findWeek } from "@/lib/curriculum";
import { getWeekContent } from "@/lib/content/week-content";
import { CHECKPOINT_PASS_PCT, isCheckpointWeek } from "@/lib/phases";
import { useWeekAccess } from "@/lib/week-access";
import { WeekLocked } from "@/components/WeekLocked";

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
    detail: "Học từ vựng 5 sao kèm phát âm IPA và nghĩa tiếng Việt.",
  },
  {
    slug: "grammar",
    title: "Courteous Grammar",
    tag: "Etiquette",
    detail: "Biến câu nói cộc lốc thành câu phục vụ lịch sự, chuẩn 5 sao.",
  },
  {
    slug: "speaking",
    title: "Elite AI Speaking",
    tag: "Voice",
    detail: "Luyện nói phản hồi khách chuẩn concierge, có chấm điểm tự động.",
  },
  {
    slug: "listening",
    title: "Golden Ear Listening",
    tag: "Attention",
    detail: "Luyện tai nghe yêu cầu của khách qua nhiều giọng đọc và tốc độ khác nhau.",
  },
  {
    slug: "reading",
    title: "Executive Reading",
    tag: "Insight",
    detail: "Đọc hiểu tình huống thực tế và nhận diện chuẩn dịch vụ 5 sao.",
  },
  {
    slug: "arcade",
    title: "VIP Rush Arcade",
    tag: "Reflex",
    detail: "Xử lý nhanh các tình huống giờ cao điểm, luyện phản xạ.",
  },
] as const;

/** Only checkpoint weeks (6, 14, 22, 30, 40) carry the phase test. */
const WEEKTEST_DOOR = {
  slug: "weektest",
  title: "Phase Checkpoint Test",
  tag: "Assessment",
  detail: `20 câu hỏi tổng hợp cả giai đoạn. Đạt ${CHECKPOINT_PASS_PCT}% để qua bài kiểm tra.`,
} as const;

/** Only the one week per phase that carries a WritingTask/MediationTask
 *  (phase3.ts week 26 / phase4.ts week 33) shows these doors. */
const WRITING_DOOR = {
  slug: "writing",
  title: "Guest Review Reply",
  tag: "Writing",
  detail: "Viết phản hồi chuẩn 5 sao cho đánh giá của khách.",
} as const;
const MEDIATION_DOOR = {
  slug: "mediation",
  title: "Bridge the Language Gap",
  tag: "Mediation",
  detail: "Truyền đạt lại cho khách bằng tiếng Anh những gì đồng nghiệp vừa báo.",
} as const;

export function Tier3SkillSuitesHub({
  department,
  week,
}: {
  department: DepartmentMeta;
  week: string;
}) {
  // Week gating: the phase this week belongs to must have been opened by
  // the previous checkpoint. Checked here as well as on the timeline
  // because this page is reachable by URL.
  const access = useWeekAccess(department.code);
  // week-content.ts is the source of truth for any week that has authored
  // lessons — the DB `lessons` rows are placeholders that only describe
  // weeks still awaiting content. Letting the DB win here is what made
  // relocated weeks show the wrong step titles (FO week 1 rendering the
  // generic "(Tuần 17)" steps that travelled with the swapped scenario).
  const authored = getWeekContent(department.code, week);
  // The checkpoint test only exists where there is authored content to
  // build a paper from — an empty week must not offer an exam. Writing
  // and mediation doors only appear on the specific week that carries
  // that content (most weeks have neither).
  const doors = [
    ...SUITE_DOORS,
    ...(authored && isCheckpointWeek(week) ? [WEEKTEST_DOOR] : []),
    ...(authored?.writing ? [WRITING_DOOR] : []),
    ...(authored?.mediation ? [MEDIATION_DOOR] : []),
  ];
  const fallback = findWeek(department.code, week);
  // Sub-lesson titles come from the authored lessons when the week has
  // them; the curriculum.ts descriptions are only a fallback for weeks
  // still awaiting content (and must never override authored titles).
  const localLessons = authored
    ? authored.lessons.map((l) => ({
        id: `authored-${department.code}-${week}-${l.lessonOrder}`,
        lesson_order: l.lessonOrder,
        title_vi: l.titleVi,
      }))
    : (fallback?.lessons.map((vi, i) => ({
        id: `local-${department.code}-${week}-${i + 1}`,
        lesson_order: i + 1,
        title_vi: vi,
      })) ?? []);
  const [lessons, setLessons] =
    useState<{ id: string; lesson_order: number; title_vi: string }[]>(localLessons);

  useEffect(() => {
    if (authored) return; // authored titles already rendered; never let the DB override them
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
    return () => {
      cancelled = true;
    };
  }, [department.code, week, authored]);

  if (access.ready && !access.isUnlocked(week)) {
    return (
      <main className="relative min-h-[calc(100vh-72px)] bg-background text-foreground">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
          <Link
            to="/department/$dep"
            params={{ dep: department.code }}
            className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80"
          >
            ← {department.name_en} Timeline
          </Link>
          <div className="mt-10">
            <WeekLocked dep={department.code} week={week} next={access.next} />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-[calc(100vh-72px)] bg-background text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-12 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
        >
          <Link
            to="/department/$dep"
            params={{ dep: department.code }}
            className="text-xs uppercase tracking-[0.3em] text-primary hover:opacity-80"
          >
            ← {department.name_en} Timeline
          </Link>
          <div className="mt-5 flex items-center gap-3">
            <span className="h-px w-10 bg-primary" />
            <span className="text-xs uppercase tracking-[0.3em] text-primary">
              Skill Suites Hub
            </span>
          </div>
          <h1 className="font-display mt-3 text-4xl text-foreground md:text-5xl">
            Week {week} <span className="italic text-primary">Golden Service Suites</span>
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-foreground/70">
            {department.name_en}
            {department.name_vi ? ` · ${department.name_vi}` : ""}. Select one suite door to begin
            this shift module.{" "}
            <span className="italic text-foreground/60">
              Hãy chọn một cánh cửa suite để bắt đầu module ca làm việc này.
            </span>
          </p>

          {/* Self-study entry point: the printable pattern + vocabulary sheet
              for practising this week away from the app. */}
          {authored && (
            <Link
              to="/handbook/$dep/$week"
              params={{ dep: department.code, week }}
              className="mt-5 inline-flex items-center gap-2 border border-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary transition-colors hover:bg-primary/10"
            >
              📖 Sổ tay tuần — tự luyện tại nhà
            </Link>
          )}
        </motion.div>

        {lessons.length > 0 && (
          <section
            aria-label="Week sub-lesson timeline"
            className="mt-10 border border-primary/25 bg-card/60 p-5 shadow-xl md:p-6"
          >
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-primary" />
              <span className="text-xs uppercase tracking-[0.3em] text-primary">
                Các bước trong ca · 4 bước
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

        <section
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          aria-label="Golden Service Suite doors"
        >
          {doors.map((suite, index) => (
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
                <span className="font-display mt-5 block text-2xl leading-tight text-foreground">
                  {suite.title}
                </span>
                <span className="mt-4 block text-sm leading-6 text-foreground/62">
                  {suite.detail}
                </span>
                <span className="mt-auto flex items-center justify-between pt-8 text-xs uppercase tracking-[0.22em] text-primary">
                  Vào học
                  <span className="font-display text-2xl transition-transform group-hover:translate-x-1">
                    →
                  </span>
                </span>
              </Link>
            </motion.div>
          ))}
        </section>
      </div>
    </main>
  );
}
