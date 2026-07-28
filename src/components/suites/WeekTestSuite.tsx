import { useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent, resolveReviewVocab, type VocabItem } from "@/lib/content/week-content";
import { CHECKPOINT_PASS_PCT, PHASES, phaseOfWeek, weeksInPhase } from "@/lib/phases";
import { useMarkCheckpointPassed } from "@/lib/week-access";
import { SuiteComingSoon } from "./SuiteComingSoon";

const TOTAL_QUESTIONS = 20;
// Fixed per-construct counts so the paper always samples every skill and
// the pass mark means the same thing on every retake.
const MIX = { vocab: 8, grammar: 4, listening: 4, reading: 4 } as const;

type Question =
  | { kind: "vocab"; key: string; prompt: string; options: string[]; correctIdx: number; note: string }
  | { kind: "grammar"; key: string; prompt: string; options: string[]; correctIdx: number; note: string }
  | { kind: "listening"; key: string; audio: string; options: string[]; correctIdx: number; note: string }
  | { kind: "reading"; key: string; passage: string; prompt: string; options: string[]; correctIdx: number; note: string };

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function speakVaried(text: string) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices().filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (voices.length > 0) u.voice = voices[Math.floor(Math.random() * voices.length)];
  u.lang = u.voice?.lang ?? "en-US";
  u.rate = 0.85;
  window.speechSynthesis.speak(u);
}

/**
 * Builds a 20-question mixed paper drawn from EVERY week in the
 * checkpoint's phase (see weeksInPhase), not just the checkpoint week
 * itself — the point of the test is to assess the phase as a whole.
 * Vocabulary additionally pulls the checkpoint week's `reviewWords`
 * recycling pool, same as before.
 *
 * Fixed mix (MIX): 8 vocabulary, 4 grammar, 4 listening, 4 reading.
 */
function buildPaper(dep: string, week: string): Question[] {
  const content = getWeekContent(dep, week);
  if (!content) return [];

  const phaseWeeks = weeksInPhase(week);
  const phaseContent = phaseWeeks
    .map((w) => getWeekContent(dep, String(w)))
    .filter((c): c is NonNullable<typeof c> => c !== null);
  const phaseLessons = phaseContent.flatMap((c) => c.lessons);

  const weekVocab = phaseLessons.flatMap((l) => l.vocabulary);
  const reviewVocab = resolveReviewVocab(dep, content.reviewWords ?? []);
  // Prefer the recycled phase vocabulary — a checkpoint should look back,
  // not merely re-test the week it sits in.
  const pool: VocabItem[] = [...reviewVocab, ...weekVocab];
  const byWord = new Map(pool.map((v) => [v.word, v]));
  const unique = [...byWord.values()];
  if (unique.length < MIX.vocab) return [];

  const vocabQs: Question[] = shuffle(unique)
    .slice(0, MIX.vocab)
    .map((v, i) => {
      const distractors = shuffle(unique.filter((o) => o.word !== v.word)).slice(0, 3);
      if (i % 2 === 0) {
        const options = shuffle([v.definition, ...distractors.map((d) => d.definition)]);
        return {
          kind: "vocab" as const,
          key: `v:${v.word}`,
          prompt: `Nghĩa của "${v.word}" là gì?`,
          options,
          correctIdx: options.indexOf(v.definition),
          note: `${v.word} — ${v.definition}. Ví dụ: "${v.context}"`,
        };
      }
      const options = shuffle([v.word, ...distractors.map((d) => d.word)]);
      return {
        kind: "vocab" as const,
        key: `v:${v.word}`,
        prompt: `Từ tiếng Anh nào có nghĩa: "${v.definition}"?`,
        options,
        correctIdx: options.indexOf(v.word),
        note: `${v.word} — ${v.definition}. Ví dụ: "${v.context}"`,
      };
    });

  const grammarPool = shuffle(phaseLessons.flatMap((l) => l.grammar));
  const grammarQs: Question[] = grammarPool.slice(0, MIX.grammar).map((g) => {
    const others = shuffle(grammarPool.filter((o) => o.polite !== g.polite)).slice(0, 2);
    const options = shuffle([g.polite, g.rude, ...others.map((o) => o.rude)].slice(0, 3));
    return {
      kind: "grammar" as const,
      key: `g:${g.rude}`,
      prompt: `Câu nào là cách nói lịch sự chuẩn 5 sao thay cho "${g.rude}"?`,
      options,
      correctIdx: options.indexOf(g.polite),
      note: g.rule,
    };
  });

  const gamePool = shuffle(phaseLessons.flatMap((l) => l.game));
  const listeningQs: Question[] = gamePool.slice(0, MIX.listening).map((round) => {
    const options = shuffle(round.options.map((o) => ({ ...o })));
    return {
      kind: "listening" as const,
      key: `l:${round.prompt}`,
      audio: round.prompt,
      options: options.map((o) => o.text),
      correctIdx: options.findIndex((o) => o.correct),
      note: `Khách nói: "${round.prompt}"`,
    };
  });

  const readingPool = shuffle(
    phaseLessons.flatMap((l) => l.reading.questions.map((q) => ({ q, text: l.reading.text }))),
  );
  const readingQs: Question[] = readingPool.slice(0, MIX.reading).map(({ q, text }) => ({
    kind: "reading" as const,
    key: `r:${q.q}`,
    passage: text,
    prompt: q.q,
    options: q.options,
    correctIdx: q.correct,
    note: q.explanation ?? "",
  }));

  return shuffle([...vocabQs, ...grammarQs, ...listeningQs, ...readingQs]).slice(0, TOTAL_QUESTIONS);
}

export function WeekTestSuite({ dep, week }: { dep: string; week?: string }) {
  const { recordSuiteResult, awardStars } = useAcademy();
  const markCheckpointPassed = useMarkCheckpointPassed();
  const [attempt, setAttempt] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paper = useMemo(() => (week ? buildPaper(dep, week) : []), [dep, week, attempt]);

  const [stage, setStage] = useState<"intro" | "sitting" | "done">("intro");
  const [idx, setIdx] = useState(0);
  // Answers are held until the end — a test that reveals each answer as
  // you go is a practice drill, not an assessment.
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [scorePct, setScorePct] = useState(0);
  const awardedRef = useRef(false);

  if (!week || paper.length < TOTAL_QUESTIONS) return <SuiteComingSoon />;

  const q = paper[idx];

  function start() {
    setAnswers(new Array(paper.length).fill(null));
    setIdx(0);
    setPicked(null);
    setStage("sitting");
  }

  function submitAnswer() {
    if (picked === null) return;
    const next = [...answers];
    next[idx] = picked;
    setAnswers(next);

    if (idx + 1 >= paper.length) {
      const correct = paper.reduce((n, question, i) => n + (next[i] === question.correctIdx ? 1 : 0), 0);
      const pct = Math.round((correct / paper.length) * 100);
      setScorePct(pct);
      const passed = pct >= CHECKPOINT_PASS_PCT;
      if (passed && !awardedRef.current) {
        awardedRef.current = true;
        awardStars(correct);
      }
      recordSuiteResult(dep, week!, "weektest", passed ? correct : 0, { scorePct: pct, mastered: passed });
      // Open the next phase for this session immediately; the upsert above
      // is fire-and-forget, so waiting for it to be readable would leave
      // the learner staring at a lock they just cleared.
      if (passed) markCheckpointPassed(dep, week!);
      setStage("done");
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  }

  function retake() {
    awardedRef.current = false;
    setAttempt((a) => a + 1);
    setStage("intro");
  }

  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="border border-primary bg-card p-7 shadow-xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Sát hạch cuối giai đoạn</div>
          <h2 className="font-display mt-3 text-3xl text-foreground">Bài kiểm tra tổng hợp tuần {week}</h2>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/80">
            <p>
              {TOTAL_QUESTIONS} câu hỏi trộn từ toàn bộ giai đoạn: từ vựng, ngữ pháp lịch sự, nghe hiểu và đọc hiểu — không chỉ riêng tuần này.
            </p>
            <p>
              Bài thi <strong>không hiện đáp án giữa chừng</strong>. Bạn trả lời hết {TOTAL_QUESTIONS} câu, sau đó mới xem kết quả và giải thích từng câu sai.
            </p>
            <p>
              Cần đạt <strong>≥ {CHECKPOINT_PASS_PCT}%</strong> để qua giai đoạn và mở các tuần tiếp theo. Thi lại không giới hạn số lần — mỗi lần đề sẽ được trộn lại.
            </p>
          </div>
          <button
            onClick={start}
            className="mt-7 bg-primary px-7 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl"
          >
            Bắt đầu thi →
          </button>
        </motion.div>
      </div>
    );
  }

  if (stage === "done") {
    const passed = scorePct >= CHECKPOINT_PASS_PCT;
    const nextPhase = PHASES.find((p) => p.index === (phaseOfWeek(week!)?.index ?? -1) + 1) ?? null;
    const wrong = paper.map((question, i) => ({ question, given: answers[i] })).filter((r) => r.given !== r.question.correctIdx);
    return (
      <div className="mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} className="border border-primary bg-card p-8 text-center shadow-xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Kết quả sát hạch</div>
          <div className="font-display mt-3 text-6xl text-primary">{scorePct}%</div>
          <p className="mt-3 text-sm text-foreground/80">
            {passed
              ? nextPhase
                ? `✦ Chúc mừng! Bạn đã qua giai đoạn này. Giai đoạn ${nextPhase.nameVi} (tuần ${nextPhase.from}–${nextPhase.to}) đã được mở.`
                : `✦ Chúc mừng! Bạn đã hoàn thành toàn bộ lộ trình 40 tuần.`
              : `Cần ≥ ${CHECKPOINT_PASS_PCT}% để qua. Xem lại các câu sai bên dưới rồi thi lại nhé.`}
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {passed && nextPhase && (
              <Link
                to="/department/$dep/week/$week"
                params={{ dep, week: String(nextPhase.from) }}
                className="bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
              >
                Vào tuần {nextPhase.from} →
              </Link>
            )}
            <button
              onClick={retake}
              className="border border-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
            >
              Thi lại
            </button>
          </div>
        </motion.div>

        {wrong.length > 0 && (
          <div className="mt-8">
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
              Giải thích {wrong.length} câu chưa đúng
            </div>
            <div className="mt-4 space-y-4">
              {wrong.map(({ question, given }) => (
                <div key={question.key} className="border border-destructive/40 bg-card p-5 shadow-xl">
                  <p className="text-sm text-foreground">
                    {question.kind === "listening" ? `Nghe: "${question.audio}"` : question.prompt}
                  </p>
                  {given !== null && (
                    <p className="mt-2 text-xs text-destructive">Bạn chọn: {question.options[given]}</p>
                  )}
                  <p className="mt-1 text-xs text-primary">Đáp án đúng: {question.options[question.correctIdx]}</p>
                  {question.note && (
                    <p className="mt-2 border-l-2 border-primary/60 pl-3 text-xs italic text-foreground/70">💡 {question.note}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/60">
        <span>Sát hạch · Câu {idx + 1}/{paper.length}</span>
        <span className="text-primary">Không hiện đáp án giữa chừng</span>
      </div>
      <div className="mt-2 h-1 w-full bg-primary/15">
        <div className="h-1 bg-primary transition-all" style={{ width: `${(idx / paper.length) * 100}%` }} />
      </div>

      <motion.div key={q.key} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="mt-6 border border-primary/30 bg-card p-6 shadow-xl">
        {q.kind === "reading" && (
          <pre className="font-sans mb-4 whitespace-pre-wrap border-l-2 border-primary/40 pl-3 text-xs leading-relaxed text-foreground/75">
            {q.passage}
          </pre>
        )}

        {q.kind === "listening" ? (
          <>
            <p className="font-display text-xl text-foreground">Nghe lời khách và chọn câu trả lời chuẩn 5 sao:</p>
            <button
              onClick={() => speakVaried(q.audio)}
              className="mt-4 border border-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
            >
              🔊 Nghe
            </button>
          </>
        ) : (
          <p className="font-display text-xl text-foreground">{q.prompt}</p>
        )}

        <div className="mt-5 space-y-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className={`block w-full border px-4 py-2.5 text-left text-sm transition-all ${
                picked === i ? "border-primary bg-primary/10" : "border-primary/20 hover:border-primary/60"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={submitAnswer}
            disabled={picked === null}
            className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl disabled:opacity-40"
          >
            {idx + 1 >= paper.length ? "Nộp bài" : "Câu tiếp →"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
