import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent, resolveReviewVocab, type WeekContent } from "@/lib/content/week-content";
import { speakEN } from "@/lib/speech";
import {
  dictationMatches,
  headwordRateForWeek,
  listeningRateForWeek,
  phaseOfWeek,
  suiteMasteryPct,
} from "@/lib/phases";
import { SuiteComingSoon } from "./SuiteComingSoon";

type Term = { en: string; ipa: string; vi: string; usage: string; icon?: string };

const FALLBACK_ICON = "✨";

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

type QuizQuestion =
  | {
      kind: "mcq";
      key: string;
      prompt: string;
      speak?: string;
      options: string[];
      correctIdx: number;
    }
  | { kind: "dictation"; key: string; word: string };

/** The week's OWN vocabulary always takes the majority of the paper, and
 *  review takes a fixed tail — the two are drawn SEPARATELY.
 *
 *  They used to share one shuffled pool of `[...terms, ...reviewWords]`
 *  sliced to 12. The review pool grows every week (a P4 week carries ~17 new
 *  words against ~54 recycled ones), so the share of questions landing on
 *  what the week actually taught decayed to 24% — 2.8 questions out of 12,
 *  covering 17% of the new vocabulary. A learner could be marked "mastered"
 *  on a week whose words they had barely met, because nine of twelve
 *  questions asked about words they already knew.
 *
 *  Allocation instead of chance: up to 10 new-word items plus 4 review
 *  items, so the new-word share sits near 70% in every phase and the quiz
 *  lengthens slightly in the phases that teach more. */
const MCQ_NEW_MAX = 10;
// Four of a week's ~20 recycled words is a 19% chance any one of them is even
// shown, and two academic reviews measured the consequence from opposite ends:
// most of a department's vocabulary comes back only as recognition, and only a
// fifth of that recognition actually happens.
const MCQ_REVIEW = 6;
// Ten of the checkpoint week seventy-five recycled words is 13% — the week
// that exists to consolidate a whole phase sampled an eighth of it.
const MCQ_REVIEW_CHECKPOINT = 20;
const MAX_DICTATION = 3;

// Retrieval quiz built from the studied terms: alternating EN→VI and
// VI→EN multiple choice, then a few listen-and-type dictation items.
// Distractors are drawn from the same term set so they stay plausible.
function buildQuiz(terms: Term[], reviewWords: Term[] = [], atCheckpoint = false): QuizQuestion[] {
  const pool = [...terms, ...reviewWords];
  const mcqTerms = shuffle([
    ...shuffle(terms).slice(0, MCQ_NEW_MAX),
    ...shuffle(reviewWords).slice(0, atCheckpoint ? MCQ_REVIEW_CHECKPOINT : MCQ_REVIEW),
  ]);
  // The checkpoint has refused nested glosses since a review found questions
  // with no single right answer — "Biên lai" beside "Biên lai đã in", "Tầng
  // cao" beside "Tầng cao hơn". The weekly practice, drawing from the same
  // pool, did not, so it printed exactly those pairs: an audit counted 19 in
  // one department. A learner who picks correctly is marked wrong, in the
  // exercise rather than the exam, which is the worse of the two places.
  const glossKey = (x: string) =>
    " " +
    x
      .toLowerCase()
      .replace(/[^\p{L}\p{N} ]/gu, " ")
      .replace(/  +/g, " ")
      .trim() +
    " ";
  const nested = (x: string, y: string) => x.includes(y) || y.includes(x);
  const mcqs: QuizQuestion[] = mcqTerms.map((t, i) => {
    const key = glossKey(t.vi);
    const distractors: typeof pool = [];
    for (const o of shuffle(pool)) {
      if (distractors.length >= 3) break;
      if (o.en === t.en || o.vi === t.vi) continue;
      const g = glossKey(o.vi);
      if (nested(key, g)) continue;
      if (distractors.some((d) => nested(glossKey(d.vi), g))) continue;
      distractors.push(o);
    }
    if (i % 2 === 0) {
      const options = shuffle([t.vi, ...distractors.map((d) => d.vi)]);
      return {
        kind: "mcq",
        key: `envi:${t.en}`,
        prompt: `Nghĩa của "${t.en}" là gì?`,
        speak: t.en,
        options,
        correctIdx: options.indexOf(t.vi),
      };
    }
    const options = shuffle([t.en, ...distractors.map((d) => d.en)]);
    return {
      kind: "mcq",
      key: `vien:${t.en}`,
      prompt: `Từ tiếng Anh nào có nghĩa: "${t.vi}"?`,
      options,
      correctIdx: options.indexOf(t.en),
    };
  });
  // Dictation is spelling practice, so it goes to THIS week's words first
  // and only falls back to the review pool when the week has too few
  // spellable ones. It used to draw from the mixed pool, which at P4 meant
  // the three spelling items were almost always words learned weeks ago.
  // Cụm nhiều từ không phải bài chính tả. Bộ lọc này viết cho từ đơn nhưng
  // không chặn cụm, nên ở Phase 4 — nơi headword đã thành cụm công thức 4–6
  // từ — nó bắt học viên gõ khớp tuyệt đối cả một câu, trong khi dung sai gõ
  // sai đã tắt từ A2.1. Đó là đo tốc độ gõ, không đo từ vựng. Giới hạn 2 từ;
  // đã kiểm cả 240 dep-week, không tuần nào tụt xuống dưới 3 mục nhờ nguồn
  // dự phòng reviewWords.
  const spellable = (t: Term) =>
    /^[A-Za-z][A-Za-z\- ]{3,}$/.test(t.en) && t.en.trim().split(/\s+/).length <= 2;
  const dictationTerms = [
    ...shuffle(terms.filter(spellable)),
    ...shuffle(reviewWords.filter(spellable)),
  ].slice(0, MAX_DICTATION);
  const dictations: QuizQuestion[] = dictationTerms.map((t) => ({
    kind: "dictation",
    key: `dict:${t.en}`,
    word: t.en,
  }));
  return [...mcqs, ...dictations];
}

export function VocabSuite({ dep, week }: { dep: string; week?: string }) {
  const content = week ? getWeekContent(dep, week) : null;
  // Guard component keeps all hooks in the inner component so the
  // null-content branch never changes hook order.
  if (!content) return <SuiteComingSoon />;
  return <VocabSuiteInner dep={dep} week={week!} content={content} />;
}

function VocabSuiteInner({
  dep,
  week,
  content,
}: {
  dep: string;
  week: string;
  content: WeekContent;
}) {
  const { awardStars, recordSuiteResult } = useAcademy();
  // Rises with the phase — a flat 80 was unreachable at pre-A1.
  const MASTERY_PCT = suiteMasteryPct(week);
  const terms: Term[] = content.lessons.flatMap((l) =>
    l.vocabulary.map((v) => ({
      en: v.word,
      ipa: v.phonetic,
      vi: v.definition,
      usage: v.context,
      icon: v.icon,
    })),
  );
  // Spaced recycling (matrix P5 standard): earlier weeks' headwords are
  // mixed into the retrieval quiz — but not into the flashcards, whose
  // flip-gate should only cover this week's new material.
  const reviewTerms: Term[] = content.reviewWords
    ? resolveReviewVocab(dep, content.reviewWords).map((v) => ({
        en: v.word,
        ipa: v.phonetic,
        vi: v.definition,
        usage: v.context,
        icon: v.icon,
      }))
    : [];

  const [stage, setStage] = useState<"study" | "quiz" | "done">("study");
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const [quiz, setQuiz] = useState<QuizQuestion[]>([]);
  const [qIdx, setQIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [typed, setTyped] = useState("");
  const [answered, setAnswered] = useState<null | boolean>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const awardedRef = useRef<Set<string>>(new Set());
  const earnedRef = useRef(0);
  const [lastScorePct, setLastScorePct] = useState(0);

  function flip(i: number) {
    setFlipped((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
  }

  function startQuiz() {
    setQuiz(buildQuiz(terms, reviewTerms, phaseOfWeek(week)?.checkpointWeek === Number(week)));
    setQIdx(0);
    setPicked(null);
    setTyped("");
    setAnswered(null);
    setCorrectCount(0);
    setStage("quiz");
  }

  function creditIfFirst(key: string, n: number) {
    if (awardedRef.current.has(key)) return;
    awardedRef.current.add(key);
    awardStars(n);
    earnedRef.current += n;
  }

  function submitAnswer(q: QuizQuestion) {
    let ok: boolean;
    if (q.kind === "mcq") {
      if (picked === null) return;
      ok = picked === q.correctIdx;
    } else {
      // One slipped letter is not evidence the word was not learned — at
      // pre-A1/A1 only. See dictationMatches.
      ok = dictationMatches(typed, q.word, week);
    }
    setAnswered(ok);
    if (ok) {
      setCorrectCount((c) => c + 1);
      creditIfFirst(q.key, 1);
    }
  }

  function next() {
    const finalCorrect = correctCount;
    if (qIdx + 1 >= quiz.length) {
      const pct = Math.round((finalCorrect / quiz.length) * 100);
      setLastScorePct(pct);
      if (week)
        recordSuiteResult(dep, week, "vocab", earnedRef.current, {
          scorePct: pct,
          mastered: pct >= MASTERY_PCT,
        });
      setStage("done");
      return;
    }
    setQIdx((i) => i + 1);
    setPicked(null);
    setTyped("");
    setAnswered(null);
  }

  if (stage === "quiz") {
    const q = quiz[qIdx];
    return (
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/60">
          <span>
            Kiểm tra ghi nhớ · Câu {qIdx + 1}/{quiz.length}
          </span>
          <span className="text-primary">{correctCount} đúng</span>
        </div>
        <div className="mt-2 h-1 w-full bg-primary/15">
          <div
            className="h-1 bg-primary transition-all"
            style={{ width: `${(qIdx / quiz.length) * 100}%` }}
          />
        </div>

        <motion.div
          key={q.key}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 border border-primary/30 bg-card p-6 shadow-xl"
        >
          {q.kind === "mcq" ? (
            <>
              <div className="flex items-center justify-between gap-3">
                <p className="font-display text-xl text-foreground">{q.prompt}</p>
                {q.speak && (
                  <button
                    onClick={() => speakEN(q.speak!, headwordRateForWeek(week!))}
                    className="shrink-0 border border-primary/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary hover:border-primary"
                  >
                    🔊
                  </button>
                )}
              </div>
              <div className="mt-4 space-y-2">
                {q.options.map((opt, i) => {
                  const isPicked = picked === i;
                  const showCorrect = answered !== null && i === q.correctIdx;
                  const showWrong = answered !== null && isPicked && i !== q.correctIdx;
                  return (
                    <button
                      key={i}
                      disabled={answered !== null}
                      onClick={() => setPicked(i)}
                      className={`block w-full border px-4 py-2.5 text-left text-sm transition-all ${
                        showCorrect
                          ? "border-primary bg-primary/15"
                          : showWrong
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
            </>
          ) : (
            <>
              <p className="font-display text-xl text-foreground">Nghe và gõ lại từ vựng:</p>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => speakEN(q.word, headwordRateForWeek(week!))}
                  className="border border-primary px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
                >
                  🔊 Nghe
                </button>
                <input
                  value={typed}
                  disabled={answered !== null}
                  onChange={(e) => setTyped(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && answered === null) submitAnswer(q);
                  }}
                  placeholder="Gõ từ bạn nghe được…"
                  className="w-full border border-primary/30 bg-background/40 px-3 py-2 text-sm outline-none focus:border-primary"
                />
              </div>
              {answered !== null && (
                <p className={`mt-3 text-sm ${answered ? "text-primary" : "text-destructive"}`}>
                  {answered ? "Chính xác!" : `Đáp án đúng: ${q.word}`}
                </p>
              )}
            </>
          )}

          <div className="mt-5 flex justify-end gap-3">
            {answered === null ? (
              <button
                onClick={() => submitAnswer(q)}
                disabled={q.kind === "mcq" ? picked === null : typed.trim() === ""}
                className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl disabled:opacity-40"
              >
                Trả lời
              </button>
            ) : (
              <button
                onClick={next}
                className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
              >
                {qIdx + 1 >= quiz.length ? "Xem kết quả" : "Câu tiếp →"}
              </button>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  if (stage === "done") {
    const passed = lastScorePct >= MASTERY_PCT;
    return (
      <div className="mx-auto max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-primary bg-card p-8 shadow-xl"
        >
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
            Kết quả kiểm tra
          </div>
          <div className="font-display mt-3 text-5xl text-primary">{lastScorePct}%</div>
          <p className="mt-3 text-sm text-foreground/75">
            {passed
              ? "✦ Đạt chuẩn! Bạn đã thành thạo bộ từ vựng tuần này."
              : `Cần ≥ ${MASTERY_PCT}% để đạt chuẩn. Xem lại thẻ từ rồi thử lại nhé.`}
          </p>
          <div className="mt-6 flex justify-center gap-3">
            <button
              onClick={() => setStage("study")}
              className="border border-primary/40 px-5 py-2 text-xs uppercase tracking-[0.2em] text-foreground/80 hover:border-primary"
            >
              Xem lại thẻ từ
            </button>
            <button
              onClick={startQuiz}
              className="bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
            >
              Làm lại kiểm tra
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const allFlipped = flipped.size >= terms.length;

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="max-w-2xl text-sm text-foreground/75">
          Chạm từng thẻ để học phát âm, ngữ cảnh sử dụng và nghĩa tiếng Việt. Lật đủ {terms.length}{" "}
          thẻ để mở phần kiểm tra ghi nhớ — sao ⭐ chỉ được trao khi bạn trả lời đúng.
        </p>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Đã xem</div>
          <div className="font-display text-2xl text-primary">
            {flipped.size}/{terms.length}
          </div>
        </div>
      </div>

      <div className="mt-4">
        <button
          onClick={startQuiz}
          disabled={!allFlipped}
          className="bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl disabled:cursor-not-allowed disabled:opacity-40"
        >
          {allFlipped
            ? "Vào phần kiểm tra →"
            : `Lật đủ thẻ để mở kiểm tra (${flipped.size}/${terms.length})`}
        </button>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: 1400 }}>
        {terms.map((t, i) => {
          const isFlipped = flipped.has(i);
          return (
            <motion.div
              key={t.en}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className="relative h-72 cursor-pointer"
              onClick={() => flip(i)}
              style={{ transformStyle: "preserve-3d" }}
            >
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.7 }}
                className="relative h-full w-full"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* FRONT */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-between border border-primary/40 bg-card p-5 shadow-xl"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="flex w-full items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
                      Từ {i + 1}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakEN(t.en, headwordRateForWeek(week!));
                      }}
                      className="border border-primary/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary hover:border-primary"
                      aria-label={`Play audio for ${t.en}`}
                    >
                      🔊 Nghe
                    </button>
                  </div>
                  <div className="flex h-20 w-20 items-center justify-center rounded-full border border-primary/40 bg-background/40 text-4xl">
                    {t.icon || FALLBACK_ICON}
                  </div>
                  <div className="font-display text-center text-2xl text-foreground">{t.en}</div>
                  <div className="text-center text-[10px] uppercase tracking-[0.2em] text-foreground/50">
                    Chạm để lật thẻ / Tap to reveal
                  </div>
                </div>

                {/* BACK */}
                <div
                  className="absolute inset-0 flex flex-col border border-primary bg-card p-4 shadow-xl"
                  style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
                >
                  <div className="flex items-center justify-between">
                    <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
                      {t.ipa}
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        speakEN(t.usage, listeningRateForWeek(week!));
                      }}
                      className="border border-primary/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary hover:border-primary"
                      aria-label={`Play example for ${t.en}`}
                    >
                      🔊 Nghe
                    </button>
                  </div>
                  <div className="mt-2 flex items-center gap-3">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/30 bg-background/40 text-2xl">
                      {t.icon || FALLBACK_ICON}
                    </div>
                    <div className="font-display text-xl text-primary">{t.en}</div>
                  </div>
                  <p className="mt-3 text-xs italic text-foreground/85">"{t.usage}"</p>
                  <div className="mt-auto border-t border-primary/20 pt-2 text-xs text-foreground/75">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-foreground/50">
                      VI ·{" "}
                    </span>
                    {t.vi}
                  </div>
                  <div className="mt-2 text-center text-[10px] uppercase tracking-[0.2em] text-foreground/40">
                    Chạm để lật thẻ / Tap to reveal
                  </div>
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
