import { useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent, type WritingTask } from "@/lib/content/week-content";
import { SuiteComingSoon } from "./SuiteComingSoon";

const PASS_PCT = 70;
const MIN_WORDS = 15;

export function WritingSuite({ dep, week }: { dep?: string; week?: string }) {
  const content = dep && week ? getWeekContent(dep, week) : null;
  const task = content?.writing;
  if (!dep || !week || !task) return <SuiteComingSoon />;
  return <WritingSuiteInner dep={dep} week={week} task={task} />;
}

function WritingSuiteInner({ dep, week, task }: { dep: string; week: string; task: WritingTask }) {
  const { awardStars, recordSuiteResult } = useAcademy();
  const [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hits, setHits] = useState<boolean[]>([]);
  const [scorePct, setScorePct] = useState(0);
  const [awarded, setAwarded] = useState(false);

  function submit() {
    const wordCount = draft.trim().split(/\s+/).filter(Boolean).length;
    const lower = draft.toLowerCase();
    const matched = task.mustMention.map((kw) => lower.includes(kw.toLowerCase()));
    const coveragePct = Math.round((matched.filter(Boolean).length / task.mustMention.length) * 100);
    const pct = wordCount >= MIN_WORDS ? coveragePct : Math.min(coveragePct, 40);
    const passed = pct >= PASS_PCT && wordCount >= MIN_WORDS;

    setHits(matched);
    setScorePct(pct);
    setSubmitted(true);
    if (passed && !awarded) {
      setAwarded(true);
      awardStars(8);
    }
    recordSuiteResult(dep, week, "writing", passed ? 8 : 0, { scorePct: pct, mastered: passed });
  }

  function retry() {
    setSubmitted(false);
    setDraft("");
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-primary/30 bg-card p-6 shadow-xl"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Đánh giá của khách</div>
        <div className="mt-1 text-xs italic text-foreground/55">{task.reviewMeta}</div>
        <p className="font-display mt-4 text-lg leading-relaxed text-foreground/90">"{task.reviewText}"</p>
        <p className="mt-6 border-l-2 border-primary/60 pl-3 text-sm leading-relaxed text-foreground/75">
          {task.promptVi}
        </p>
      </motion.article>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="border border-primary/30 bg-card p-6 shadow-xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Phản hồi của bạn</div>
          <textarea
            value={draft}
            disabled={submitted}
            onChange={(e) => setDraft(e.target.value)}
            rows={7}
            placeholder="Viết phản hồi bằng tiếng Anh…"
            className="mt-4 w-full resize-none border border-primary/25 bg-background/40 p-4 text-sm leading-relaxed text-foreground/90 focus:border-primary focus:outline-none disabled:opacity-70"
          />
          {!submitted ? (
            <button
              onClick={submit}
              disabled={draft.trim().length === 0}
              className="mt-4 w-full bg-primary py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl disabled:opacity-40"
            >
              Nộp phản hồi
            </button>
          ) : (
            <div className="mt-5 space-y-5">
              <div className="border border-primary bg-background/40 p-4 text-center">
                <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Độ bao phủ nội dung</div>
                <div className="font-display mt-1 text-3xl text-primary">{scorePct}%</div>
                {scorePct >= PASS_PCT ? (
                  <div className="mt-1 text-xs uppercase tracking-[0.2em]">+8 ⭐ đạt chuẩn</div>
                ) : (
                  <div className="mt-1 text-[11px] text-foreground/60">
                    Cần ≥ {PASS_PCT}% và tối thiểu {MIN_WORDS} từ. Xem gợi ý bên dưới rồi thử lại.
                  </div>
                )}
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Ý cần có trong phản hồi</div>
                <ul className="mt-2 space-y-1">
                  {task.mustMention.map((kw, i) => (
                    <li key={kw} className={`text-xs ${hits[i] ? "text-primary" : "text-destructive"}`}>
                      {hits[i] ? "✓" : "✗"} {kw}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Phản hồi mẫu 5 sao</div>
                <p className="mt-2 border-l-2 border-primary/60 pl-3 text-sm leading-relaxed text-foreground/85">
                  {task.modelReply}
                </p>
                <p className="mt-3 text-xs italic leading-relaxed text-foreground/65">💡 {task.explanationVi}</p>
              </div>

              <button
                onClick={retry}
                className="w-full border border-primary px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
              >
                Viết lại
              </button>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
