import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import {
  getWeekContent,
  type GameRound,
  type WeekContent,
  speakerLabel,
  type GameOptionKind,
} from "@/lib/content/week-content";
import { SuiteComingSoon } from "./SuiteComingSoon";

type Bubble = {
  id: number;
  text: string;
  correct: boolean;
  kind?: GameOptionKind;
  y: number;
  speed: number;
  popped?: boolean;
};

type Stage = "rules" | "playing" | "done";

/** The part of a round's explanation that is about the bubble the learner
 *  popped.
 *
 *  An explanation covers the whole round, and authors open it with the
 *  broken-English option. Shown over a correct-English bubble, the first
 *  thing the learner read was a grammar error their sentence did not have —
 *  «…The herbs ARE all natural…» — "sai hoà hợp: 'The herbs' số nhiều →
 *  'are'" (round 3 of the Phase 4 reviews: 78 of 80 Spa explanations). So a
 *  sentence whose quotes are all from the `form` option, and not from this
 *  bubble, is left out; and position words ("câu thứ hai"), which point at
 *  nothing once the bubbles are shuffled, are made neutral. */
export function aboutThisBubble(
  explanation: string | undefined,
  options: { text: string; kind?: string; correct?: boolean }[],
  bubble: string,
): string | undefined {
  if (!explanation) return explanation;
  // Position words are written against the AUTHORED order, which the round
  // keeps; the bubbles on screen are a shuffle of it.
  const POSITION = /\b([Cc])âu (cuối|đầu|giữa|thứ nhất|thứ hai|thứ ba)\b/gu;
  const indexOf = (p: string) =>
    p === "đầu" || p === "thứ nhất" ? 0 : p === "giữa" || p === "thứ hai" ? 1 : options.length - 1;
  const mine = options.findIndex((o) => o.text === bubble);
  const kindAt = (i: number) => (options[i]?.correct ? "answer" : options[i]?.kind);
  const sentences = explanation.match(/[^.!?]+(?:[.!?]+(?=\s|$)|$)/g) ?? [explanation];
  const kept = sentences.filter((s) => {
    const refs = [...s.matchAll(POSITION)].map((m) => indexOf(m[2]!));
    // A sentence that opens on the broken-English option and never names
    // this bubble is about the other one.
    return !(refs.length && kindAt(refs[0]!) === "form" && !refs.includes(mine));
  });
  const text = (kept.length ? kept : sentences).join("").trim();
  return text.replace(POSITION, (_, c: string, p: string) => {
    const i = indexOf(p);
    const name =
      i === mine
        ? "câu này"
        : kindAt(i) === "form"
          ? "câu sai ngữ pháp"
          : kindAt(i) === "answer"
            ? "câu đúng"
            : "câu kia";
    return c === "C" ? name[0]!.toUpperCase() + name.slice(1) : name;
  });
}

/** Why a "form" bubble is wrong, said about THAT sentence.
 *
 *  Every broken-English bubble used to get one message — "it is missing words
 *  and has no subject or verb" — and a review counted at most four of
 *  Guest Relations' 64 form options that were missing anything: the rest
 *  break agreement ("The dress code ask…"), a verb form ("I will calling…")
 *  or an article. So the bubble is lined up against the other options in its
 *  round, and where it is one or two words away from one of them, the note
 *  names those words. Further than that, it says what kinds of error to look
 *  for instead of claiming one it cannot see. */
function formWhy(wrong: string, others: string[]): string {
  const toks = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z' ]/g, " ")
      .split(/\s+/)
      .filter(Boolean);
  const w = toks(wrong);
  let best: { extra: string[]; missing: string[] } | null = null;
  for (const o of others) {
    const r = toks(o);
    // Longest common subsequence, then what each side has outside it.
    const dp = Array.from({ length: w.length + 1 }, () => new Array<number>(r.length + 1).fill(0));
    for (let i = w.length - 1; i >= 0; i--)
      for (let j = r.length - 1; j >= 0; j--)
        dp[i]![j] =
          w[i] === r[j] ? dp[i + 1]![j + 1]! + 1 : Math.max(dp[i + 1]![j]!, dp[i]![j + 1]!);
    const extra: string[] = [];
    const missing: string[] = [];
    let i = 0;
    let j = 0;
    while (i < w.length && j < r.length) {
      if (w[i] === r[j]) {
        i++;
        j++;
      } else if (dp[i + 1]![j]! >= dp[i]![j + 1]!) extra.push(w[i++]!);
      else missing.push(r[j++]!);
    }
    extra.push(...w.slice(i));
    missing.push(...r.slice(j));
    if (!best || extra.length + missing.length < best.extra.length + best.missing.length)
      best = { extra, missing };
  }
  if (
    best &&
    best.extra.length + best.missing.length > 0 &&
    best.extra.length <= 2 &&
    best.missing.length <= 2
  ) {
    if (best.extra.length && best.missing.length)
      return `Sai ngữ pháp ở «${best.extra.join(" ")}» — chữ này sai dạng ở đây. Tìm câu nói đúng dạng.`;
    if (best.missing.length)
      return `Câu đó thiếu chữ «${best.missing.join(" ")}» — tiếng Anh cần chữ này ở đây.`;
    return `Câu đó thừa chữ «${best.extra.join(" ")}» — bỏ chữ này đi thì mới đúng.`;
  }
  return "Câu đó sai ngữ pháp — dạng động từ, số ít/số nhiều, mạo từ hoặc giới từ. Đọc lại từng chữ rồi chọn câu đúng.";
}

export function ArcadeSuite({ dep, week }: { dep?: string; week?: string }) {
  const content = dep && week ? getWeekContent(dep, week) : null;
  if (!content) return <SuiteComingSoon />;
  return <ArcadeSuiteInner dep={dep!} week={week!} content={content} />;
}

function ArcadeSuiteInner({
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
  const poppedRef = useRef<Set<number>>(new Set());
  const rounds: GameRound[] = content.lessons.flatMap((l) => l.game);

  // 18s mỗi vòng: đọc một prompt cộng ba phương án ở A2+ mất khoảng chừng đó.
  // Sàn 75s giữ nguyên hành vi cũ cho các tuần 4 vòng.
  const timeBudget = Math.max(75, rounds.length * 18);

  const [stage, setStage] = useState<Stage>("rules");
  const [won, setWon] = useState(false);
  const [time, setTime] = useState(timeBudget);
  const [score, setScore] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [feedback, setFeedback] = useState<null | { ok: boolean; text: string }>(null);
  const [spawnedKey, setSpawnedKey] = useState(0); // forces re-spawn per round
  const idRef = useRef(0);
  const startedRef = useRef<number>(0);

  function startGame() {
    setStage("playing");
    setWon(false);
    setTime(timeBudget);
    setScore(0);
    setRoundIdx(0);
    setBubbles([]);
    setFeedback(null);
    setSpawnedKey((k) => k + 1);
    startedRef.current = Date.now();
  }

  function finishGame(finalScore: number, cleared: boolean) {
    setWon(cleared);
    setStage("done");
    const elapsed = (Date.now() - startedRef.current) / 1000;
    patchMetrics({
      reflex_speed: Math.min(
        100,
        Math.max(20, Math.round(finalScore * 6 + (timeBudget - elapsed) * 0.5)),
      ),
    });
    if (dep && week) {
      const pct = Math.round((finalScore / (rounds.length * 2)) * 100);
      recordSuiteResult(dep, week, "arcade", earned.current, { scorePct: pct, mastered: cleared });
    }
  }

  // Countdown
  useEffect(() => {
    if (stage !== "playing") return;
    const tick = setInterval(() => setTime((t) => Math.max(0, t - 1)), 1000);
    return () => clearInterval(tick);
  }, [stage]);

  // End on time-out
  useEffect(() => {
    if (time === 0 && stage === "playing") {
      finishGame(score, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [time, stage, score]);

  // Spawn bubbles for the current round (staggered, one option per ~1.4s)
  useEffect(() => {
    if (stage !== "playing") return;
    const round = rounds[roundIdx % rounds.length];
    // Fisher-Yates, not sort(() => Math.random() - 0.5): a comparator that
    // answers at random is not a uniform shuffle, and with three options it
    // leaves the authored order showing more often than it hides it.
    const shuffled = [...round.options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const timers: number[] = [];
    shuffled.forEach((opt, i) => {
      const t = window.setTimeout(() => {
        setBubbles((prev) => [
          ...prev,
          {
            id: ++idRef.current,
            text: opt.text,
            correct: opt.correct,
            kind: opt.kind,
            y: 20 + Math.random() * 50,
            speed: 14 + Math.random() * 4, // slow: 14-18s across the screen
          },
        ]);
      }, i * 1400);
      timers.push(t);
    });
    return () => timers.forEach((t) => clearTimeout(t));
  }, [stage, roundIdx, spawnedKey, rounds]);

  function tapBubble(b: Bubble) {
    if (b.popped || poppedRef.current.has(b.id)) return;
    poppedRef.current.add(b.id);
    setBubbles((bs) => bs.map((x) => (x.id === b.id ? { ...x, popped: true } : x)));
    if (b.correct) {
      const newScore = score + 2;
      setScore(newScore);
      awardStars(2);
      earned.current += 2;
      setFeedback({ ok: true, text: "+2 ⭐ Perfect!" });
      const isLastRound = roundIdx + 1 >= rounds.length;
      setTimeout(() => {
        setFeedback(null);
        setBubbles([]);
        if (isLastRound) {
          finishGame(newScore, true);
        } else {
          setRoundIdx((r) => r + 1);
          setSpawnedKey((k) => k + 1);
        }
      }, 900);
    } else {
      // A round whose distractor is correct English — losing only on register
      // or on length — teaches nothing without a reason, and the learner has
      // no way to infer the criterion from a generic "try another bubble".
      // Held twice as long as the bare message, because there is now something
      // to read.
      // The authored explanation is about the option that is correct English
      // and wrong for the job. Showing it over a broken-English bubble told
      // the learner their sentence was grammatical when it was not.
      const round = rounds[roundIdx % rounds.length];
      // Authors wrote "Câu cuối…" / "Câu đầu…" against the source order, and
      // the bubbles are shuffled (63 of 64 Housekeeping explanations in Phase
      // 3 opened that way): aboutThisBubble() names each position for what it
      // is to THIS bubble, and leaves out what is only about the form option.
      const why =
        b.kind === "form"
          ? formWhy(
              b.text,
              (round?.options ?? []).filter((o) => o.text !== b.text).map((o) => o.text),
            )
          : aboutThisBubble(round?.explanation, round?.options ?? [], b.text);
      // Name the bubble by quoting it, never by its position. The three
      // options are Fisher-Yates shuffled above and the bubbles carry no
      // numbers, so an explanation opening "Câu thứ ba…" pointed at nothing
      // the learner could see. Quoting also survives any future reordering.
      setFeedback({
        ok: false,
        text: why ? `«${b.text}» — ${why}` : "Chưa đúng — thử bong bóng khác nhé.",
      });
      setTimeout(() => setFeedback(null), why ? 3200 : 1000);
      setTimeout(() => setBubbles((bs) => bs.filter((x) => x.id !== b.id)), 400);
    }
  }

  function expireBubble(b: Bubble) {
    if (b.popped) return;
    setBubbles((bs) => bs.filter((x) => x.id !== b.id));
  }

  const currentRound = rounds[roundIdx % rounds.length];

  return (
    <div className="space-y-4">
      {/* HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 border border-primary/30 bg-card p-4 shadow-xl">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
              Thời gian
            </div>
            <div className="font-display text-2xl text-primary">{time}s</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Sao</div>
            <div className="font-display text-2xl text-primary">+{score}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Vòng</div>
            <div className="font-display text-2xl text-primary">
              {Math.min(roundIdx + 1, rounds.length)}/{rounds.length}
            </div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
        >
          {stage === "playing" ? "Chơi lại" : "Bắt đầu"}
        </button>
      </div>

      <div className="relative h-[460px] overflow-hidden border border-primary/30 bg-card shadow-xl">
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.05), transparent 60%)" }}
        />

        {/* RULES SCREEN */}
        {stage === "rules" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">VIP Rush Arcade</div>
            <h3 className="font-display mt-3 text-3xl">How to Play / Luật chơi</h3>
            <div className="mt-5 max-w-2xl space-y-4 text-sm leading-relaxed">
              <p className="text-foreground/85">
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary">
                  RULES ·{" "}
                </span>
                Read the Guest's request anchored at the top. Floating options will cross the
                screen. Tap the bubble containing the correct 5-star staff response that solves the
                Guest's request before time runs out!
              </p>
              <p className="italic text-foreground/70">
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary not-italic">
                  LUẬT CHƠI ·{" "}
                </span>
                Đọc kỹ lượt thoại ở phía trên cùng. Các bong bóng chứa câu trả lời sẽ bay ngang qua
                màn hình. Hãy chạm nhanh vào bong bóng chứa câu trả lời lịch sự chuẩn 5 sao phù hợp
                với yêu cầu của Khách trước khi hết giờ!
              </p>
            </div>
            <button
              onClick={startGame}
              className="mt-7 bg-primary px-8 py-3 text-xs uppercase tracking-[0.3em] text-primary-foreground shadow-xl"
            >
              Bắt đầu ca làm →
            </button>
          </div>
        )}

        {/* GUEST PROMPT ANCHOR */}
        {stage === "playing" && currentRound && (
          <motion.div
            key={roundIdx}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute left-1/2 top-3 z-10 w-[92%] -translate-x-1/2 border border-primary/60 bg-background/80 p-3 text-center shadow-xl backdrop-blur"
          >
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
              {speakerLabel(currentRound)}
            </div>
            <p className="mt-1 font-display text-lg text-foreground">"{currentRound.prompt}"</p>
          </motion.div>
        )}

        {/* BUBBLES */}
        {stage === "playing" &&
          bubbles.map((b) => (
            <motion.button
              key={b.id}
              initial={{ x: "110vw" }}
              animate={{ x: b.popped ? undefined : "-40vw" }}
              transition={{ duration: b.speed, ease: "linear" }}
              onAnimationComplete={() => expireBubble(b)}
              onClick={() => tapBubble(b)}
              className={`absolute max-w-[60%] select-none whitespace-normal px-4 py-2 text-left font-display text-sm shadow-xl ${
                b.popped
                  ? b.correct
                    ? "border-2 border-primary bg-primary text-primary-foreground"
                    : "border-2 border-destructive bg-destructive/30 text-foreground"
                  : "border border-primary/50 bg-background/70 text-foreground hover:border-primary"
              }`}
              style={{ top: `${b.y + 18}%`, borderRadius: 24 }}
            >
              {b.text}
            </motion.button>
          ))}

        {/* FEEDBACK */}
        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border px-5 py-2 text-xs uppercase tracking-[0.25em] shadow-xl ${
                feedback.ok
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-destructive bg-destructive/30 text-foreground"
              }`}
            >
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* DONE SCREEN */}
        {stage === "done" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h3 className="font-display text-4xl text-primary">
              {won ? "Ca trực hoàn hảo! ✦" : "Hết ca làm"}
            </h3>
            <p className="mt-2 text-sm text-foreground/70">
              {won
                ? `Đạt chuẩn — xử lý đúng cả ${rounds.length} tình huống với ${score} ⭐`
                : `Được ${score} ⭐ qua ${Math.min(roundIdx, rounds.length)} vòng — cần xử lý đúng cả ${rounds.length} tình huống trong ${timeBudget}s để đạt chuẩn`}
            </p>
            <button
              onClick={startGame}
              className="mt-5 border border-primary px-6 py-2 text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary/10"
            >
              Chơi lại
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
