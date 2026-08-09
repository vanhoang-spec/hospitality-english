import { motion } from "framer-motion";

/**
 * Offered, never applied silently (backlog P2-5).
 *
 * A run that restores itself without asking is indistinguishable from a
 * broken one: the learner taps "Premium Vocabulary", lands on question 7
 * of a paper they do not remember, and cannot get back to the start. So
 * the snapshot waits behind a choice, and declining it clears the snapshot
 * rather than leaving it to reappear on the next visit.
 */
export function ResumeBanner({
  detail,
  onResume,
  onRestart,
}: {
  /** What resuming actually does, e.g. "Tiếp tục từ câu 7/14". */
  detail: string;
  onResume: () => void;
  onRestart: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6 flex flex-wrap items-center justify-between gap-3 border border-primary bg-primary/10 px-5 py-4 shadow-xl"
    >
      <div>
        <p className="font-display text-lg text-foreground">Bạn đang học dở phần này</p>
        <p className="mt-0.5 text-xs text-foreground/70">{detail}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={onRestart}
          className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80 hover:border-primary"
        >
          Bắt đầu lại
        </button>
        <button
          onClick={onResume}
          className="bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
        >
          Tiếp tục →
        </button>
      </div>
    </motion.div>
  );
}
