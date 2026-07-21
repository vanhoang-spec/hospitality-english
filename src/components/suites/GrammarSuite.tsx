import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent, type WeekContent } from "@/lib/content/week-content";
import { speakEN } from "@/lib/speech";
import { SuiteComingSoon } from "./SuiteComingSoon";

type Puzzle = { bad: string; target: string; chips: string[]; rule?: string };

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function normalizeSentence(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w'\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function GrammarSuite({ dep, week }: { dep?: string; week?: string }) {
  const content = dep && week ? getWeekContent(dep, week) : null;
  if (!content) return <SuiteComingSoon />;
  return <GrammarSuiteInner dep={dep!} week={week!} content={content} />;
}

function GrammarSuiteInner({ dep, week, content }: { dep: string; week: string; content: WeekContent }) {
  const { awardStars, patchMetrics, recordSuiteResult } = useAcademy();
  const earned = useRef(0);
  const awardedRoundRef = useRef(-1);
  const memoryAwardedRef = useRef<Set<number>>(new Set());
  // Distinct-puzzle outcomes for mastery: "correct" only counts when the
  // learner solved it without revealing the answer first. State (not a
  // ref) so the "Đạt chuẩn: X/N" header re-renders the instant it changes.
  const [outcomes, setOutcomes] = useState<Map<number, "correct" | "revealed">>(new Map());
  const puzzles: Puzzle[] = content.lessons.flatMap((l) =>
    l.grammar.map((g) => ({
      bad: g.rude,
      target: g.polite,
      chips: g.polite.replace(/[.!?,]/g, "").split(/\s+/).filter(Boolean),
      rule: g.rule,
    })),
  );
  const [round, setRound] = useState(0);
  const puzzleIdx = round % puzzles.length;
  const puzzle = puzzles[puzzleIdx];
  const [bank, setBank] = useState<string[]>(() => shuffle(puzzle.chips));
  const [tray, setTray] = useState<string[]>([]);
  const [checked, setChecked] = useState<null | boolean>(null);
  const [selectedTray, setSelectedTray] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [memoryTyped, setMemoryTyped] = useState("");
  const [memoryResult, setMemoryResult] = useState<null | boolean>(null);

  // re-init when round changes
  useEffect(() => {
    setBank(shuffle(puzzle.chips));
    setTray([]);
    setChecked(null);
    setSelectedTray(null);
    setRevealed(false);
    setMemoryTyped("");
    setMemoryResult(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [round]);

  function syncProgress(nextOutcomes: Map<number, "correct" | "revealed">) {
    if (!dep || !week) return;
    const correctCount = Array.from(nextOutcomes.values()).filter((o) => o === "correct").length;
    const pct = Math.round((correctCount / puzzles.length) * 100);
    recordSuiteResult(dep, week, "grammar", earned.current, {
      scorePct: pct,
      mastered: correctCount === puzzles.length,
    });
  }

  function appendToTray(word: string, bankIdx: number) {
    setBank((b) => b.filter((_, i) => i !== bankIdx));
    setTray((t) => [...t, word]);
    setChecked(null);
  }
  function removeFromTray(i: number) {
    const word = tray[i];
    setTray((t) => t.filter((_, j) => j !== i));
    setBank((b) => [...b, word]);
    setChecked(null);
    setSelectedTray(null);
  }
  function clickTray(i: number) {
    if (selectedTray === null) {
      setSelectedTray(i);
      return;
    }
    if (selectedTray === i) {
      setSelectedTray(null);
      return;
    }
    // swap positions
    setTray((t) => {
      const c = [...t];
      [c[selectedTray], c[i]] = [c[i], c[selectedTray]];
      return c;
    });
    setSelectedTray(null);
    setChecked(null);
  }

  function check() {
    const ok = normalizeSentence(tray.join(" ")) === normalizeSentence(puzzle.target);
    setChecked(ok);
    if (ok && awardedRoundRef.current !== round && !revealed) {
      awardedRoundRef.current = round;
      awardStars(4);
      patchMetrics({ courtesy_score: Math.min(100, 70 + (round + 1) * 8) });
      earned.current += 4;
      if (outcomes.get(puzzleIdx) !== "correct") {
        const next = new Map(outcomes).set(puzzleIdx, "correct" as const);
        setOutcomes(next);
        syncProgress(next);
      }
    }
  }

  function reveal() {
    setRevealed(true);
    setChecked(null);
    if (outcomes.get(puzzleIdx) !== "correct") {
      const next = new Map(outcomes).set(puzzleIdx, "revealed" as const);
      setOutcomes(next);
      syncProgress(next);
    }
  }

  function checkMemory() {
    const ok = normalizeSentence(memoryTyped) === normalizeSentence(puzzle.target);
    setMemoryResult(ok);
    if (ok && !memoryAwardedRef.current.has(puzzleIdx)) {
      memoryAwardedRef.current.add(puzzleIdx);
      awardStars(2);
      earned.current += 2;
      syncProgress(outcomes);
    }
  }

  function next() {
    setRound((r) => r + 1);
  }

  const solvedCleanly = checked === true && !revealed;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/60">
        <span>Câu {puzzleIdx + 1}/{puzzles.length}</span>
        <span className="text-primary">
          Đạt chuẩn: {Array.from(outcomes.values()).filter((o) => o === "correct").length}/{puzzles.length}
        </span>
      </div>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="border border-destructive/40 bg-card p-5 shadow-xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-destructive">Lỗi thường gặp</div>
        <p className="mt-2 font-display text-xl line-through decoration-destructive/60">"{puzzle.bad}"</p>
        <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-primary">
          Assemble the 5-star equivalent · Tap two chips to swap their position
        </div>
      </motion.div>

      <div className="min-h-[110px] border border-primary bg-card p-4 shadow-xl">
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Your refined sentence</div>
          {checked === true && (
            <button
              onClick={() => speakEN(puzzle.target, 0.9)}
              className="border border-primary/60 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
            >
              🔊 Speak sentence
            </button>
          )}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tray.length === 0 && (
            <span className="text-xs italic text-foreground/40">Click chips below in correct order. Tap two placed chips to swap.</span>
          )}
          {tray.map((w, i) => {
            const selected = selectedTray === i;
            return (
              <span key={`${w}-${i}`} className="inline-flex items-center">
                <button
                  onClick={() => clickTray(i)}
                  className={`border px-3 py-1.5 font-display text-sm transition-all ${
                    selected
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-primary bg-primary/15 text-foreground hover:bg-primary/25"
                  }`}
                >
                  {w}
                </button>
                <button
                  onClick={() => removeFromTray(i)}
                  className="ml-0.5 border border-primary/30 px-1.5 py-1.5 text-xs text-foreground/60 hover:border-destructive hover:text-destructive"
                  aria-label="Remove"
                >
                  ×
                </button>
              </span>
            );
          })}
        </div>
      </div>

      <div className="border border-primary/30 bg-card p-4 shadow-xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">Word bank</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {bank.map((w, i) => (
            <button
              key={`${w}-${i}`}
              onClick={() => appendToTray(w, i)}
              className="border border-primary/40 bg-background/60 px-3 py-1.5 font-display text-sm text-foreground/85 hover:border-primary"
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button onClick={check} className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl">
          Verify Courtesy
        </button>
        <button
          onClick={reveal}
          disabled={revealed || checked === true}
          className="border border-primary/40 px-6 py-2 text-xs uppercase tracking-[0.2em] text-foreground/70 hover:border-primary disabled:opacity-40"
        >
          Xem đáp án
        </button>
        <button onClick={next} className="border border-primary/40 px-6 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary">
          Next puzzle →
        </button>
        {solvedCleanly && <span className="text-xs uppercase tracking-[0.25em] text-primary">Impeccable. +4 ⭐</span>}
        {checked === true && revealed && <span className="text-xs uppercase tracking-[0.25em] text-foreground/60">Đúng — nhưng đã xem đáp án nên không tính sao.</span>}
        {checked === false && <span className="text-xs uppercase tracking-[0.25em] text-destructive">Almost — refine the order.</span>}
      </div>

      {/* Rule explanation: shown after any verify attempt or reveal */}
      {(checked !== null || revealed) && puzzle.rule && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="border-l-2 border-primary/60 bg-card p-4 text-sm shadow-xl">
          <span className="text-[10px] uppercase tracking-[0.25em] text-primary">Quy tắc · </span>
          <span className="text-foreground/85">{puzzle.rule}</span>
        </motion.div>
      )}

      {/* Revealed answer */}
      {revealed && (
        <div className="border border-primary/40 bg-card p-4 shadow-xl">
          <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Đáp án</div>
          <p className="mt-1 font-display text-lg text-primary">"{puzzle.target}"</p>
        </div>
      )}

      {/* Memory bonus round after a clean solve */}
      {solvedCleanly && (
        <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="border border-primary bg-card p-5 shadow-xl">
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Thử thách trí nhớ · +2 ⭐</div>
          <p className="mt-2 text-sm text-foreground/75">Không nhìn các chip phía trên — gõ lại toàn bộ câu lịch sự từ trí nhớ:</p>
          <div className="mt-3 flex gap-2">
            <input
              value={memoryTyped}
              disabled={memoryResult === true}
              onChange={(e) => setMemoryTyped(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && memoryResult !== true) checkMemory();
              }}
              placeholder="Gõ lại câu hoàn chỉnh…"
              className="w-full border border-primary/30 bg-background/40 px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              onClick={checkMemory}
              disabled={memoryResult === true || memoryTyped.trim() === ""}
              className="shrink-0 bg-primary px-4 py-2 text-xs uppercase tracking-[0.15em] text-primary-foreground shadow-xl disabled:opacity-40"
            >
              Kiểm tra
            </button>
          </div>
          {memoryResult === true && <p className="mt-2 text-xs uppercase tracking-[0.2em] text-primary">Xuất sắc! +2 ⭐</p>}
          {memoryResult === false && <p className="mt-2 text-xs text-destructive">Chưa khớp — thử lại hoặc bấm Next puzzle.</p>}
        </motion.div>
      )}
    </div>
  );
}
