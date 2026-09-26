import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent, speakerAudioLabel } from "@/lib/content/week-content";
import { listeningRateForWeek, suiteMasteryPct } from "@/lib/phases";
import { useAttemptLogger, useStudySession } from "@/lib/telemetry";
import { SuiteComingSoon } from "./SuiteComingSoon";

const MAX_LISTENS = 3;

// Listening tasks are generated from content that already exists for
// the week — no separate listening content needs authoring:
//  - "choose": the guest line from a game round is SPOKEN (never shown);
//    the learner picks the correct staff response.
//  - "cloze": a target service sentence is spoken; the learner types
//    the blanked-out key words.
type ListeningTask =
  | {
      kind: "choose";
      key: string;
      audio: string;
      options: string[];
      correctIdx: number;
      audioWho: string;
      tip: string;
    }
  | { kind: "cloze"; key: string; audio: string; tokens: { text: string; blank: boolean }[] };

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function stripWord(w: string): string {
  return w.replace(/[^A-Za-z']/g, "").toLowerCase();
}

// Random English voice + slightly varied rate per playback, so learners
// hear more than one "accent" instead of a single fixed TTS voice.
function speakVaried(text: string, week: string | number) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (voices.length > 0) u.voice = voices[Math.floor(Math.random() * voices.length)];
  u.lang = u.voice?.lang ?? "en-US";
  // The week decides the speed (see listeningRateForWeek). It used to be
  // `0.8 + Math.random() * 0.2`, which handed a week-1 beginner up to 1.0 —
  // faster than the rate the curriculum reserves for week 40 — and made the
  // random draw, not the learner's level, the hardest thing about the task.
  u.rate = listeningRateForWeek(week);
  window.speechSynthesis.speak(u);
}

function buildTasks(dep: string, week: string): ListeningTask[] {
  const content = getWeekContent(dep, week);
  if (!content) return [];
  const vocabWords = new Set(
    content.lessons.flatMap((l) => l.vocabulary.flatMap((v) => v.word.toLowerCase().split(/\s+/))),
  );

  // Built from the speaking pairs, not from l.game. The arcade rounds are the
  // same prompts and the same three bubbles, word for word, so a learner who
  // played the arcade first was answering from memory and the block measured
  // recall rather than listening. The checkpoint moved off this source for
  // exactly that reason; the weekly practice had not.
  const allTargets = content.lessons.flatMap((l) =>
    l.speaking.map((s) => ({ t: s.targetResponse, lessonId: l.lessonId, prompt: s.guestPrompt })),
  );
  // The words a sentence says, with honorifics and courtesy stripped: two
  // options that say the same thing to the same guest are two right answers.
  // "The price includes daily housekeeping, sir." sat beside "The price
  // includes daily housekeeping." with one of them marked wrong; a review
  // measured it on about 8% of one week's items. Distractors now come from
  // OTHER lessons, never share their content with the answer, and never
  // answer the same guest line.
  const content_ = (t: string) =>
    new Set(
      t
        .toLowerCase()
        .replace(/[^a-z' ]/g, " ")
        .split(" ")
        .filter(
          (w) => w.length > 2 && !/^(sir|madam|please|the|and|you|your|certainly|course)$/.test(w),
        ),
    );
  const overlaps = (a: string, b: string) => {
    const A = content_(a);
    const B = content_(b);
    const shared = [...A].filter((w) => B.has(w)).length;
    return shared >= Math.min(A.size, B.size) - 1;
  };
  const chooses: ListeningTask[] = content.lessons.flatMap((l) =>
    l.speaking.map((sp, si) => {
      const pool = allTargets.filter(
        (o) =>
          o.lessonId !== l.lessonId &&
          o.prompt !== sp.guestPrompt &&
          !overlaps(o.t, sp.targetResponse),
      );
      const others: string[] = [];
      for (const o of shuffle(pool)) {
        if (others.length >= 2) break;
        if (others.some((x) => overlaps(x, o.t))) continue;
        others.push(o.t);
      }
      const opts = shuffle([sp.targetResponse, ...others]);
      return {
        kind: "choose" as const,
        key: `choose:${l.lessonId}:${si}`,
        audio: sp.guestPrompt,
        options: opts,
        correctIdx: opts.indexOf(sp.targetResponse),
        audioWho: speakerAudioLabel(sp),
        tip: sp.helpTip,
      };
    }),
  );

  const clozes: ListeningTask[] = content.lessons
    .flatMap((l) =>
      l.speaking.map((s, si) => {
        const words = s.targetResponse.split(/\s+/);
        const candidateIdx = words
          .map((w, i) => ({ w: stripWord(w), i }))
          .filter(({ w }) => w.length >= 4);
        // Prefer blanking this week's vocabulary; fall back to any long word.
        const preferred = candidateIdx.filter(({ w }) => vocabWords.has(w));
        const rest = candidateIdx.filter(({ w }) => !vocabWords.has(w));
        const blanks = new Set(
          [...shuffle(preferred), ...shuffle(rest)].slice(0, 3).map(({ i }) => i),
        );
        if (blanks.size < 2) return null;
        return {
          kind: "cloze" as const,
          key: `cloze:${l.lessonId}:${si}`,
          audio: s.targetResponse,
          tokens: words.map((text, i) => ({ text, blank: blanks.has(i) })),
        };
      }),
    )
    .filter((t): t is Extract<ListeningTask, { kind: "cloze" }> => t !== null);

  return [...shuffle(chooses), ...shuffle(clozes)];
}

export function ListeningSuite({ dep, week }: { dep: string; week?: string }) {
  const { awardStars, recordSuiteResult } = useAcademy();
  const logAttempt = useAttemptLogger({ dep: dep ?? "", week: week ?? 1, suite: "listening" });
  useStudySession({ dep: dep ?? "", week: week ?? 1, suite: "listening" });
  // Rises with the phase — a flat 80 was unreachable at pre-A1.
  const MASTERY_PCT = suiteMasteryPct(week ?? 1);
  const [seed, setSeed] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const tasks = useMemo(() => (week ? buildTasks(dep, week) : []), [dep, week, seed]);

  const [idx, setIdx] = useState(0);
  const [stage, setStage] = useState<"task" | "done">("task");
  const [picked, setPicked] = useState<number | null>(null);
  const [blankValues, setBlankValues] = useState<Record<number, string>>({});
  const [answered, setAnswered] = useState<null | boolean>(null);
  const [listens, setListens] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lastScorePct, setLastScorePct] = useState(0);
  const awardedRef = useRef<Set<string>>(new Set());
  const earnedRef = useRef(0);

  const ttsAvailable = typeof window !== "undefined" && "speechSynthesis" in window;

  if (!week || tasks.length === 0) {
    return <SuiteComingSoon />;
  }
  if (!ttsAvailable) {
    return (
      <p className="text-sm text-foreground/70">
        Trình duyệt của bạn không hỗ trợ đọc audio (speech synthesis). Hãy dùng Chrome hoặc Edge.
      </p>
    );
  }

  const task = tasks[idx];

  function playAudio() {
    if (listens >= MAX_LISTENS || answered !== null) return;
    setListens((n) => n + 1);
    speakVaried(task.audio, week!);
  }

  function submit() {
    let ok: boolean;
    if (task.kind === "choose") {
      if (picked === null) return;
      ok = picked === task.correctIdx;
    } else {
      // Credit per blank, not per task. A cloze carries up to three blanks
      // and used to score all-or-nothing, so two right out of three was worth
      // exactly as much as understanding none of the sentence.
      let total = 0;
      let got = 0;
      task.tokens.forEach((t, i) => {
        if (!t.blank) return;
        total++;
        if (stripWord(blankValues[i] ?? "") === stripWord(t.text)) got++;
      });
      const frac = total > 0 ? got / total : 0;
      ok = frac === 1;
      setAnswered(ok);
      logAttempt(`listening:cloze:${task.key}`, ok);
      setCorrectCount((c) => c + frac);
      if (ok && !awardedRef.current.has(task.key)) {
        awardedRef.current.add(task.key);
        awardStars(1);
        earnedRef.current += 1;
      }
      return;
    }
    setAnswered(ok);
    logAttempt(`listening:choice:${task.key}`, ok);
    if (ok) {
      setCorrectCount((c) => c + 1);
      if (!awardedRef.current.has(task.key)) {
        awardedRef.current.add(task.key);
        awardStars(1);
        earnedRef.current += 1;
      }
    }
  }

  function next() {
    if (idx + 1 >= tasks.length) {
      const pct = Math.round((correctCount / tasks.length) * 100);
      setLastScorePct(pct);
      if (week)
        recordSuiteResult(dep, week, "listening", earnedRef.current, {
          scorePct: pct,
          mastered: pct >= MASTERY_PCT,
        });
      setStage("done");
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
    setBlankValues({});
    setAnswered(null);
    setListens(0);
  }

  function retry() {
    setSeed((s) => s + 1);
    setIdx(0);
    setPicked(null);
    setBlankValues({});
    setAnswered(null);
    setListens(0);
    setCorrectCount(0);
    setStage("task");
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
            Kết quả luyện nghe
          </div>
          <div className="font-display mt-3 text-5xl text-primary">{lastScorePct}%</div>
          <p className="mt-3 text-sm text-foreground/75">
            {passed
              ? "✦ Đạt chuẩn! Đôi tai của bạn đã sẵn sàng cho ca làm việc."
              : `Cần ≥ ${MASTERY_PCT}% để đạt chuẩn. Nghe lại lần nữa nhé — mỗi lần giọng đọc sẽ khác một chút.`}
          </p>
          <div className="mt-6 flex justify-center">
            <button
              onClick={retry}
              className="bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
            >
              Luyện lại
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/60">
        <span>
          Luyện nghe · Câu {idx + 1}/{tasks.length}
        </span>
        <span className="text-primary">{correctCount} đúng</span>
      </div>
      <div className="mt-2 h-1 w-full bg-primary/15">
        <div
          className="h-1 bg-primary transition-all"
          style={{ width: `${(idx / tasks.length) * 100}%` }}
        />
      </div>

      <motion.div
        key={task.key}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 border border-primary/30 bg-card p-6 shadow-xl"
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-display text-xl text-foreground">
            {task.kind === "choose"
              ? `Nghe ${task.audioWho} nói và chọn câu trả lời chuẩn 5 sao:`
              : "Nghe câu mẫu và điền các từ còn thiếu:"}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <button
            onClick={playAudio}
            disabled={listens >= MAX_LISTENS || answered !== null}
            className="border border-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10 disabled:opacity-40"
          >
            🔊 Nghe {listens > 0 ? `(còn ${MAX_LISTENS - listens} lần)` : ""}
          </button>
          <span className="text-[10px] uppercase tracking-[0.2em] text-foreground/50">
            Giọng đọc thay đổi mỗi lần nghe
          </span>
        </div>

        {task.kind === "choose" ? (
          <div className="mt-5 space-y-2">
            {task.options.map((opt, i) => {
              const isPicked = picked === i;
              const showCorrect = answered !== null && i === task.correctIdx;
              const showWrong = answered !== null && isPicked && i !== task.correctIdx;
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
        ) : (
          <div className="mt-5 flex flex-wrap items-baseline gap-x-1.5 gap-y-3 text-sm leading-8">
            {task.tokens.map((t, i) =>
              t.blank ? (
                <input
                  key={i}
                  value={blankValues[i] ?? ""}
                  disabled={answered !== null}
                  onChange={(e) => setBlankValues((v) => ({ ...v, [i]: e.target.value }))}
                  className={`inline-block w-28 border-b-2 bg-transparent px-1 text-center outline-none ${
                    answered === null
                      ? "border-primary/50 focus:border-primary"
                      : stripWord(blankValues[i] ?? "") === stripWord(t.text)
                        ? "border-primary text-primary"
                        : "border-destructive text-destructive"
                  }`}
                />
              ) : (
                <span key={i}>{t.text}</span>
              ),
            )}
          </div>
        )}

        {answered !== null && task.kind === "cloze" && !answered && (
          <p className="mt-3 text-sm text-destructive">Câu đầy đủ: "{task.audio}"</p>
        )}
        {/* A wrong pick used to show only "Chưa đúng". Without the line that
            was said, a learner working alone cannot tell whether they
            misheard the guest or misread the answers. */}
        {answered === false && task.kind === "choose" && (
          <div className="mt-3 space-y-1 text-sm">
            <p className="text-foreground/80">
              Bạn vừa nghe: <span className="italic">"{task.audio}"</span>
            </p>
            {task.tip && <p className="text-xs italic text-foreground/60">💡 {task.tip}</p>}
          </div>
        )}
        {answered !== null && (
          <p
            className={`mt-3 text-xs uppercase tracking-[0.2em] ${answered ? "text-primary" : "text-destructive"}`}
          >
            {answered ? "Chính xác! +1 ⭐" : "Chưa đúng"}
          </p>
        )}

        <div className="mt-5 flex justify-end">
          {answered === null ? (
            <button
              onClick={submit}
              disabled={
                task.kind === "choose"
                  ? picked === null
                  : !task.tokens.some((t, i) => t.blank && (blankValues[i] ?? "").trim() !== "")
              }
              className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl disabled:opacity-40"
            >
              Trả lời
            </button>
          ) : (
            <button
              onClick={next}
              className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
            >
              {idx + 1 >= tasks.length ? "Xem kết quả" : "Câu tiếp →"}
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
