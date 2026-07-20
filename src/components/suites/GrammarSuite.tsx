import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent } from "@/lib/content/week-content";
import { speakEN } from "@/lib/speech";

type Puzzle = { bad: string; target: string; chips: string[] };

const PUZZLES: Puzzle[] = [
  {
    bad: "Give me passport",
    target: "Could you please kindly provide your passport for our local registration",
    chips: ["Could", "you", "please", "kindly", "provide", "your", "passport", "for", "our", "local", "registration"],
  },
  {
    bad: "What you want eat",
    target: "How may I assist you with this evening's dining selection",
    chips: ["How", "may", "I", "assist", "you", "with", "this", "evening's", "dining", "selection"],
  },
];

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

export function GrammarSuite({ dep, week }: { dep?: string; week?: string }) {
  const { awardStars, patchMetrics, recordSuiteResult } = useAcademy();
  const earned = useRef(0);
  const awardedRoundRef = useRef(-1);
  const content = dep && week ? getWeekContent(dep, week) : null;
  const puzzles: Puzzle[] = content
    ? content.lessons.flatMap((l) =>
        l.grammar.map((g) => ({
          bad: g.rude,
          target: g.polite,
          chips: g.polite.replace(/[.!?,]/g, "").split(/\s+/).filter(Boolean),
        })),
      )
    : PUZZLES;
  const [round, setRound] = useState(0);
  const puzzle = puzzles[round % puzzles.length];
  const [bank, setBank] = useState<string[]>(() => shuffle(puzzle.chips));
  const [tray, setTray] = useState<string[]>([]);
  const [checked, setChecked] = useState<null | boolean>(null);
  const [selectedTray, setSelectedTray] = useState<number | null>(null);

  // re-init when round changes
  useMemo(() => {
    setBank(shuffle(puzzle.chips));
    setTray([]);
    setChecked(null);
    setSelectedTray(null);
  }, [round]);

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
    const assembled = tray.join(" ").toLowerCase().replace(/[^\w'\s]/g, "").trim();
    const target = puzzle.target.toLowerCase().replace(/[^\w'\s]/g, "").trim();
    const ok = assembled === target;
    setChecked(ok);
    if (ok && awardedRoundRef.current !== round) {
      awardedRoundRef.current = round;
      awardStars(4);
      patchMetrics({ courtesy_score: Math.min(100, 70 + (round + 1) * 8) });
      earned.current += 4;
      if (dep && week) recordSuiteResult(dep, week, "grammar", earned.current);
    }
  }

  function next() {
    setRound((r) => r + 1);
  }

  return (
    <div className="space-y-6">
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
        <button onClick={next} className="border border-primary/40 px-6 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary">
          Next puzzle →
        </button>
        {checked === true && <span className="text-xs uppercase tracking-[0.25em] text-primary">Impeccable. +4 ⭐</span>}
        {checked === false && <span className="text-xs uppercase tracking-[0.25em] text-destructive">Almost — refine the order.</span>}
      </div>
    </div>
  );
}
