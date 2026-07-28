import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { phaseOfWeek, type Phase } from "@/lib/phases";

/** Shown in place of a week's content when the learner has not yet passed
 *  the checkpoint that opens its phase. Always names the test to sit and
 *  links straight to it — a lock with no way forward reads as a bug. */
export function WeekLocked({
  dep,
  week,
  next,
}: {
  dep: string;
  week: string | number;
  next: Phase | null;
}) {
  const phase = phaseOfWeek(week);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-2xl border border-primary/40 bg-card p-8 text-center shadow-xl"
    >
      <div className="font-display text-4xl text-primary/70">🔒</div>
      <h2 className="font-display mt-4 text-3xl text-foreground">Tuần {week} chưa mở</h2>
      <p className="mt-4 text-sm leading-relaxed text-foreground/75">
        {phase ? (
          <>
            Tuần này thuộc giai đoạn <strong>{phase.nameVi}</strong> ({phase.band}).{" "}
          </>
        ) : null}
        {next ? (
          <>
            Bạn cần qua <strong>bài sát hạch tuần {next.checkpointWeek}</strong> trước — mỗi giai
            đoạn chỉ mở khi bài kiểm tra tổng hợp của giai đoạn trước đã đạt.
          </>
        ) : (
          <>Hãy hoàn thành bài sát hạch của giai đoạn trước để mở tuần này.</>
        )}
      </p>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
        {next && (
          <Link
            to="/learn/$dep/$week/$suite"
            params={{ dep, week: String(next.checkpointWeek), suite: "weektest" }}
            className="bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
          >
            Vào thi sát hạch tuần {next.checkpointWeek} →
          </Link>
        )}
        <Link
          to="/department/$dep"
          params={{ dep }}
          className="border border-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
        >
          ← Về lộ trình
        </Link>
      </div>
    </motion.div>
  );
}
