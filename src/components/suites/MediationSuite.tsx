import { useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent, type MediationTask } from "@/lib/content/week-content";
import { PASS_PCT, scoreFreeText } from "@/lib/writing-score";
import { SuiteComingSoon } from "./SuiteComingSoon";

// A relay to a guest is one or two full sentences, not a word list.
const MIN_WORDS = 12;
const MIN_SENTENCES = 1;

export function MediationSuite({ dep, week }: { dep?: string; week?: string }) {
  const content = dep && week ? getWeekContent(dep, week) : null;
  const task = content?.mediation;
  if (!dep || !week || !task) return <SuiteComingSoon />;
  return <MediationSuiteInner dep={dep} week={week} task={task} />;
}

function MediationSuiteInner({ dep, week, task }: { dep: string; week: string; task: MediationTask }) {
  const { awardStars, recordSuiteResult } = useAcademy();
  const [draft, setDraft] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [hits, setHits] = useState<boolean[]>([]);
  const [scorePct, setScorePct] = useState(0);
  const [blockedVi, setBlockedVi] = useState<string | null>(null);
  const [awarded, setAwarded] = useState(false);

  function submit() {
    const r = scoreFreeText({
      draft,
      ideas: task.mustConvey,
      minWords: MIN_WORDS,
      minSentences: MIN_SENTENCES,
    });

    setHits(r.hits);
    setScorePct(r.scorePct);
    setBlockedVi(r.blockedByVi);
    setSubmitted(true);
    if (r.passed && !awarded) {
      setAwarded(true);
      awardStars(8);
    }
    recordSuiteResult(dep, week, "mediation", r.passed ? 8 : 0, { scorePct: r.scorePct, mastered: r.passed });
  }

  /** Keep the draft so the learner can revise it against the model. */
  function retry() {
    setSubmitted(false);
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
      <motion.article
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-primary/30 bg-card p-6 shadow-xl"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Ghi chú từ đồng nghiệp</div>
        <p className="font-display mt-4 text-lg leading-relaxed text-foreground/90">"{task.colleagueNoteVi}"</p>
        <p className="mt-6 border-l-2 border-primary/60 pl-3 text-sm leading-relaxed text-foreground/75">
          {task.promptVi}
        </p>
      </motion.article>

      <motion.section initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="border border-primary/30 bg-card p-6 shadow-xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Lời bạn nói với khách (tiếng Anh)</div>
          <textarea
            value={draft}
            disabled={submitted}
            onChange={(e) => setDraft(e.target.value)}
            rows={5}
            placeholder="Type your reply to the guest in English…"
            className="mt-4 w-full resize-none border border-primary/25 bg-background/40 p-4 text-sm leading-relaxed text-foreground/90 focus:border-primary focus:outline-none disabled:opacity-70"
          />
          {!submitted ? (
            <button
              onClick={submit}
              disabled={draft.trim().length === 0}
              className="mt-4 w-full bg-primary py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl disabled:opacity-40"
            >
              Nộp câu trả lời
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
                    {blockedVi ?? `Cần ≥ ${PASS_PCT}% số ý. Xem gợi ý bên dưới rồi sửa lại câu của bạn.`}
                  </div>
                )}
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Ý cần truyền đạt cho khách</div>
                <ul className="mt-2 space-y-1">
                  {task.mustConvey.map((idea, i) => (
                    <li key={idea.labelVi} className={`text-xs ${hits[i] ? "text-primary" : "text-destructive"}`}>
                      {hits[i] ? "✓" : "✗"} {idea.labelVi}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Câu trả lời mẫu</div>
                <p className="mt-2 border-l-2 border-primary/60 pl-3 text-sm leading-relaxed text-foreground/85">
                  {task.modelAnswer}
                </p>
                <p className="mt-3 text-xs italic leading-relaxed text-foreground/65">💡 {task.explanationVi}</p>
              </div>

              <button
                onClick={retry}
                className="w-full border border-primary px-4 py-2.5 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
              >
                Thử lại
              </button>
            </div>
          )}
        </div>
      </motion.section>
    </div>
  );
}
