import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent } from "@/lib/content/week-content";

type Passage = {
  source: string;
  meta?: string;
  title: string;
  body: string;
  questions: { q: string; options: string[]; correct: number }[];
};

const DEFAULT_PASSAGE: Passage = {
  source: "TripAdvisor · Verified Stay",
  meta: "Margaret H. · London, UK · ★★☆☆☆",
  title: "Beautiful property, disappointing check-in",
  body: `The lobby is breathtaking and the suite truly exceptional. However, our arrival was marred by a 40-minute wait at reception with no acknowledgement, no offer of a seat, and no welcome refreshment. When we finally checked in, the agent did not look up from the screen and asked for "passport" with a single word. For a property of this calibre, the first impression fell short of the room itself.`,
  questions: [
    { q: "Per LQA standard, what is the maximum acceptable time before a guest is acknowledged at reception?", options: ["30 seconds", "10 seconds", "2 minutes", "When the agent is free"], correct: 1 },
    { q: "Which recovery gesture best matches Forbes 5-Star service standards for a 40-minute wait?", options: ["Apologise verbally and proceed with check-in", "Apologise, seat the guest, offer a welcome refreshment, and assign an upgrade or amenity", "Offer a discount on the next stay", "Explain why the wait occurred in detail"], correct: 1 },
    { q: 'The agent said only "passport". What is the correct LQA phrasing?', options: ["Passport please.", "Give me passport.", "Could you please kindly provide your passport for our local registration?", "ID please."], correct: 2 },
  ],
};

export function ReadingSuite({ dep, week }: { dep?: string; week?: string }) {
  const { awardStars, patchMetrics } = useAcademy();
  const content = dep && week ? getWeekContent(dep, week) : null;

  const passages: Passage[] = useMemo(() => {
    if (!content) return [DEFAULT_PASSAGE];
    return content.lessons.map((l) => ({
      source: `${content.departmentId} · Lesson ${l.lessonOrder}`,
      meta: l.titleEn,
      title: l.titleVi,
      body: l.reading.text,
      questions: [{ q: l.reading.question, options: l.reading.options, correct: l.reading.correctAnswer }],
    }));
  }, [content]);

  const [pIdx, setPIdx] = useState(0);
  const passage = passages[pIdx];
  const [picks, setPicks] = useState<(number | null)[]>(() => passage.questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);

  // reset state on passage change
  useMemo(() => {
    setPicks(passage.questions.map(() => null));
    setSubmitted(false);
  }, [pIdx]);

  const score = picks.reduce<number>((s, p, i) => (p === passage.questions[i].correct ? s + 1 : s), 0);
  const total = passage.questions.length;

  function submit() {
    setSubmitted(true);
    if (score >= Math.ceil(total / 2)) awardStars(score * 2);
    patchMetrics({ crisis_handling_score: Math.min(100, 60 + score * 13) });
  }

  return (
    <div className="space-y-6">
      {passages.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {passages.map((p, i) => (
            <button
              key={i}
              onClick={() => setPIdx(i)}
              className={`border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] transition-colors ${
                i === pIdx ? "border-primary bg-primary/10 text-primary" : "border-primary/30 text-foreground/70 hover:border-primary/60"
              }`}
            >
              Lesson {i + 1}
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
            {passage.meta && <span className="normal-case tracking-normal text-foreground/55">{passage.meta}</span>}
          </div>
          <h2 className="font-display mt-3 text-2xl">{passage.title}</h2>
          <pre className="font-sans mt-5 whitespace-pre-wrap text-sm leading-relaxed text-foreground/85">{passage.body}</pre>
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
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Question {i + 1}</div>
              <p className="mt-2 text-sm">{q.q}</p>
              <div className="mt-3 space-y-2">
                {q.options.map((opt, j) => {
                  const isPicked = picks[i] === j;
                  const isCorrect = submitted && j === q.correct;
                  const isWrong = submitted && isPicked && j !== q.correct;
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
              Submit Comprehension
            </button>
          ) : (
            <div className="border border-primary bg-card p-5 text-center shadow-xl">
              <div className="text-[10px] uppercase tracking-[0.25em] text-primary">Result</div>
              <div className="font-display mt-2 text-4xl text-primary">{score}/{total}</div>
              {score >= Math.ceil(total / 2) && <div className="mt-1 text-xs uppercase tracking-[0.25em]">+{score * 2} ⭐ awarded</div>}
            </div>
          )}
        </motion.section>
      </div>
    </div>
  );
}
