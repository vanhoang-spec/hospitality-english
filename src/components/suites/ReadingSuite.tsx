import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent, type WeekContent } from "@/lib/content/week-content";
import { suiteMasteryPct } from "@/lib/phases";
import { SuiteComingSoon } from "./SuiteComingSoon";

type Passage = {
  source: string;
  meta?: string;
  title: string;
  body: string;
  questions: { q: string; options: string[]; correct: number; explanation?: string }[];
};

/** Reading options were rendered in the order they are stored, and the
 *  stored order put the answer first almost everywhere: 100% of the 1,704
 *  generated questions answer A, and 82% of all questions make the correct
 *  option the longest one. A learner who tapped the first button every time
 *  scored 100% on reading without reading anything.
 *
 *  Shuffling here fixes every question at once rather than editing 1,920 of
 *  them. The seed comes from the question text, so the order is STABLE — the
 *  same question always presents the same way, for every learner, on every
 *  render. A re-shuffle on each render would move the buttons under the
 *  learner's finger between tapping and submitting.
 *
 *  This does not fix the length bias. That is a content problem and is
 *  measured separately by verify-content. */
function seedOf(s: string): number {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function shuffleOptions(q: { q: string; options: string[]; correct: number }): {
  options: string[];
  correct: number;
} {
  const order = q.options.map((_, i) => i);
  let seed = seedOf(q.q);
  // Fisher-Yates với PRNG tất định
  for (let i = order.length - 1; i > 0; i--) {
    // Bit THẤP của một LCG lệch nặng — lấy modulo trên chúng cho ra phân bố
    // 4/61/36 thay vì 33/33/33. Dùng bit cao bằng cách chia cho 2^32.
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    const j = Math.floor((seed / 4294967296) * (i + 1));
    [order[i], order[j]] = [order[j], order[i]];
  }
  return {
    options: order.map((i) => q.options[i]),
    correct: order.indexOf(q.correct),
  };
}

export function ReadingSuite({ dep, week }: { dep?: string; week?: string }) {
  const content = dep && week ? getWeekContent(dep, week) : null;
  if (!content) return <SuiteComingSoon />;
  return <ReadingSuiteInner dep={dep!} week={week!} content={content} />;
}

function ReadingSuiteInner({
  dep,
  week,
  content,
}: {
  dep: string;
  week: string;
  content: WeekContent;
}) {
  const { awardStars, patchMetrics, recordSuiteResult } = useAcademy();
  const earned = useRef(0);
  const awardedPassageRef = useRef(-1);
  // Best percentage per passage — suite mastery requires >= 80% on every
  // passage, and the recorded suite score is the average across all.
  const bestPctRef = useRef<Map<number, number>>(new Map());

  const passages: Passage[] = useMemo(() => {
    return content.lessons.map((l) => ({
      source: `${content.departmentId} · Lesson ${l.lessonOrder}`,
      meta: l.titleEn,
      title: l.titleVi,
      body: l.reading.text,
      questions: l.reading.questions,
    }));
  }, [content]);

  const [pIdx, setPIdx] = useState(0);
  const passage = passages[pIdx];
  const [picks, setPicks] = useState<(number | null)[]>(() => passage.questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  useMemo(() => {
    setPicks(passage.questions.map(() => null));
    setSubmitted(false);
  }, [pIdx]);

  const score = picks.reduce<number>(
    (s, p, i) => (p === shuffleOptions(passage.questions[i]).correct ? s + 1 : s),
    0,
  );
  const total = passage.questions.length;

  function submit() {
    setSubmitted(true);
    if (score >= Math.ceil(total / 2) && awardedPassageRef.current !== pIdx) {
      awardedPassageRef.current = pIdx;
      const gained = score * 2;
      awardStars(gained);
      earned.current += gained;
    }
    const pct = Math.round((score / total) * 100);
    bestPctRef.current.set(pIdx, Math.max(bestPctRef.current.get(pIdx) ?? 0, pct));
    if (dep && week) {
      const sumPct = passages.reduce((s, _, i) => s + (bestPctRef.current.get(i) ?? 0), 0);
      const avgPct = Math.round(sumPct / passages.length);
      // Every passage must clear the PHASE bar, not a flat 80 — the same
      // ladder the other suites now use.
      const allMastered = passages.every(
        (_, i) => (bestPctRef.current.get(i) ?? 0) >= suiteMasteryPct(week ?? 1),
      );
      recordSuiteResult(dep, week, "reading", earned.current, {
        scorePct: avgPct,
        mastered: allMastered,
      });
    }
    patchMetrics({ crisis_handling_score: Math.min(100, 60 + score * 13) });
  }

  return (
    <div className="space-y-6">
      {passages.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {passages.map((_, i) => (
            <button
              key={i}
              onClick={() => setPIdx(i)}
              className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                i === pIdx
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-primary/30 text-foreground/70 hover:border-primary/60"
              }`}
            >
              Bài {i + 1}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <motion.article
          key={`p-${pIdx}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-primary/30 bg-card p-6 shadow-xl"
        >
          <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.3em] text-primary">
            <span>{passage.source}</span>
            {passage.meta && (
              <span className="normal-case tracking-normal text-foreground/55">{passage.meta}</span>
            )}
          </div>
          <h2 className="font-display mt-3 text-2xl">{passage.title}</h2>
          <pre className="font-sans mt-5 whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">
            {passage.body}
          </pre>
        </motion.article>

        <motion.section
          key={`q-${pIdx}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {passage.questions.map((q, i) => (
            <div key={i} className="border border-primary/30 bg-card p-5 shadow-xl">
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary">
                Câu {i + 1}/{total}
              </div>
              <p className="mt-2 text-sm">{q.q}</p>
              {submitted && q.explanation && (
                <p className="mt-2 border-l-2 border-primary/60 pl-3 text-xs italic text-foreground/70">
                  💡 {q.explanation}
                </p>
              )}
              <div className="mt-3 space-y-2">
                {shuffleOptions(q).options.map((opt, j) => {
                  const answer = shuffleOptions(q).correct;
                  const isPicked = picks[i] === j;
                  const isCorrect = submitted && j === answer;
                  const isWrong = submitted && isPicked && j !== answer;
                  return (
                    <button
                      key={j}
                      disabled={submitted}
                      onClick={() => setPicks((p) => p.map((x, k) => (k === i ? j : x)))}
                      className={`block w-full border px-3 py-2 text-left text-xs transition-all ${
                        isCorrect
                          ? "border-primary bg-primary/15 text-foreground"
                          : isWrong
                            ? "border-destructive bg-destructive/15"
                            : isPicked
                              ? "border-primary"
                              : "border-primary/20 hover:border-primary/60"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {!submitted ? (
            <button
              onClick={submit}
              disabled={picks.some((p) => p === null)}
              className="w-full bg-primary py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl disabled:opacity-40"
            >
              Nộp bài
            </button>
          ) : (
            <div className="border border-primary bg-card p-5 text-center shadow-xl">
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Kết quả</div>
              <div className="font-display mt-2 text-4xl text-primary">
                {score}/{total}
              </div>
              {score >= Math.ceil(total / 2) && (
                <div className="mt-1 text-xs uppercase tracking-[0.25em]">
                  +{score * 2} ⭐ đạt chuẩn
                </div>
              )}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
