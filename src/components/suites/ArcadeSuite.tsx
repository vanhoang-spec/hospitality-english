import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent, type GameRound } from "@/lib/content/week-content";

type Bubble = { id: number; text: string; correct: boolean; y: number; speed: number; popped?: boolean };

const FALLBACK_ROUNDS: GameRound[] = [
  {
    prompt: "Hello, I'd like to check in.",
    options: [
      { text: "May I have your name, please?", correct: true },
      { text: "Give me your name.", correct: false },
      { text: "Who are you?", correct: false },
    ],
  },
];

type Stage = "rules" | "playing" | "done";

export function ArcadeSuite({ dep, week }: { dep?: string; week?: string }) {
  const { awardStars, patchMetrics, recordSuiteResult } = useAcademy();
  const earned = useRef(0);
  const poppedRef = useRef<Set<number>>(new Set());
  const content = dep && week ? getWeekContent(dep, week) : null;
  const rounds: GameRound[] = content ? content.lessons.map((l) => l.game) : FALLBACK_ROUNDS;

  const [stage, setStage] = useState<Stage>("rules");
  const [time, setTime] = useState(75);
  const [score, setScore] = useState(0);
  const [roundIdx, setRoundIdx] = useState(0);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [feedback, setFeedback] = useState<null | { ok: boolean; text: string }>(null);
  const [spawnedKey, setSpawnedKey] = useState(0); // forces re-spawn per round
  const idRef = useRef(0);
  const startedRef = useRef<number>(0);

  function startGame() {
    setStage("playing");
    setTime(75);
    setScore(0);
    setRoundIdx(0);
    setBubbles([]);
    setFeedback(null);
    setSpawnedKey((k) => k + 1);
    startedRef.current = Date.now();
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
      setStage("done");
      const elapsed = (Date.now() - startedRef.current) / 1000;
      patchMetrics({ reflex_speed: Math.min(100, Math.max(20, Math.round(score * 6 + (75 - elapsed) * 0.5))) });
    }
  }, [time, stage, score, patchMetrics]);

  // Spawn bubbles for the current round (staggered, one option per ~1.4s)
  useEffect(() => {
    if (stage !== "playing") return;
    const round = rounds[roundIdx % rounds.length];
    const shuffled = [...round.options].sort(() => Math.random() - 0.5);
    const timers: number[] = [];
    shuffled.forEach((opt, i) => {
      const t = window.setTimeout(() => {
        setBubbles((prev) => [
          ...prev,
          {
            id: ++idRef.current,
            text: opt.text,
            correct: opt.correct,
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
      setScore((s) => s + 2);
      awardStars(2);
      earned.current += 2;
      if (dep && week) recordSuiteResult(dep, week, "arcade", earned.current);
      setFeedback({ ok: true, text: "+2 ⭐ Perfect!" });
      setTimeout(() => {
        setFeedback(null);
        setBubbles([]);
        setRoundIdx((r) => r + 1);
        setSpawnedKey((k) => k + 1);
      }, 900);
    } else {
      setFeedback({ ok: false, text: "Try again — too direct." });
      setTimeout(() => setFeedback(null), 1000);
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
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Time</div>
            <div className="font-display text-2xl text-primary">{time}s</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Stars</div>
            <div className="font-display text-2xl text-primary">+{score}</div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Round</div>
            <div className="font-display text-2xl text-primary">{Math.min(roundIdx + 1, rounds.length)}/{rounds.length}</div>
          </div>
        </div>
        <button
          onClick={startGame}
          className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
        >
          {stage === "playing" ? "Restart" : "Start Rush"}
        </button>
      </div>

      <div className="relative h-[460px] overflow-hidden border border-primary/30 bg-card shadow-xl">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.05), transparent 60%)" }} />

        {/* RULES SCREEN */}
        {stage === "rules" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">VIP Rush Arcade</div>
            <h3 className="font-display mt-3 text-3xl">How to Play / Luật chơi</h3>
            <div className="mt-5 max-w-2xl space-y-4 text-sm leading-relaxed">
              <p className="text-foreground/85">
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary">RULES · </span>
                Read the Guest's request anchored at the top. Floating options will cross the screen.
                Tap the bubble containing the correct 5-star staff response that solves the Guest's request before time runs out!
              </p>
              <p className="italic text-foreground/70">
                <span className="text-[10px] uppercase tracking-[0.25em] text-primary not-italic">LUẬT CHƠI · </span>
                Đọc kỹ yêu cầu của Khách ở phía trên cùng. Các bong bóng chứa câu trả lời sẽ bay ngang qua màn hình.
                Hãy chạm nhanh vào bong bóng chứa câu trả lời lịch sự chuẩn 5 sao phù hợp với yêu cầu của Khách trước khi hết giờ!
              </p>
            </div>
            <button
              onClick={startGame}
              className="mt-7 bg-primary px-8 py-3 text-xs uppercase tracking-[0.3em] text-primary-foreground shadow-xl"
            >
              Begin Shift →
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
            <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Guest says</div>
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
                feedback.ok ? "border-primary bg-primary text-primary-foreground" : "border-destructive bg-destructive/30 text-foreground"
              }`}
            >
              {feedback.text}
            </motion.div>
          )}
        </AnimatePresence>

        {/* DONE SCREEN */}
        {stage === "done" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <h3 className="font-display text-4xl text-primary">Shift complete</h3>
            <p className="mt-2 text-sm text-foreground/70">Earned {score} ⭐ across {Math.min(roundIdx, rounds.length)} rounds</p>
            <button
              onClick={startGame}
              className="mt-5 border border-primary px-6 py-2 text-xs uppercase tracking-[0.25em] text-primary hover:bg-primary/10"
            >
              Play again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
