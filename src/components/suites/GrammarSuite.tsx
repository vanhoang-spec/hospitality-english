import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent } from "@/lib/content/week-content";

type Puzzle = { bad: string; target: string; chips: string[] };

const PUZZLES: Puzzle[] = [
  {
    bad: "Give me passport",
    target: "Could you please kindly provide your passport for our local registration",
    chips: ["Could", "you", "please", "kindly", "provide", "your", "passport", "for", "our", "local", "registration"],
  },
  {
    bad: "Wait, room not ready",
    target: "May I kindly invite you to our lounge while we finalise your suite",
    chips: ["May", "I", "kindly", "invite", "you", "to", "our", "lounge", "while", "we", "finalise", "your", "suite"],
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
  const { awardStars, patchMetrics } = useAcademy();
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
  const pool = useMemo(() => shuffle(puzzle.chips), [round]);
  const [bank, setBank] = useState<string[]>(pool);
  const [tray, setTray] = useState<string[]>([]);
  const [checked, setChecked] = useState<null | boolean>(null);

  // re-init when round changes
  useMemo(() => {
    setBank(shuffle(puzzle.chips));
    setTray([]);
    setChecked(null);
  }, [round]);

  function moveToTray(word: string, idx: number) {
    setBank((b) => b.filter((_, i) => i !== idx));
    setTray((t) => [...t, word]);
    setChecked(null);
  }
  function moveToBank(word: string, idx: number) {
    setTray((t) => t.filter((_, i) => i !== idx));
    setBank((b) => [...b, word]);
    setChecked(null);
  }

  function check() {
    const assembled = tray.join(" ").toLowerCase().replace(/[^\w'\s]/g, "").trim();
    const target = puzzle.target.toLowerCase().replace(/[^\w'\s]/g, "").trim();
    const ok = assembled === target;
    setChecked(ok);
    if (ok) {
      awardStars(4);
      patchMetrics({ courtesy_score: Math.min(100, 70 + (round + 1) * 8) });
    }
  }

  function next() {
    setRound((r) => r + 1);
  }

  // HTML5 drag handlers
  const onDragStart = (e: React.DragEvent, word: string, from: "bank" | "tray", idx: number) => {
    e.dataTransfer.setData("text/plain", JSON.stringify({ word, from, idx }));
  };
  const onDropTray = (e: React.DragEvent) => {
    e.preventDefault();
    const { word, from, idx } = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (from === "bank") moveToTray(word, idx);
  };
  const onDropBank = (e: React.DragEvent) => {
    e.preventDefault();
    const { word, from, idx } = JSON.parse(e.dataTransfer.getData("text/plain"));
    if (from === "tray") moveToBank(word, idx);
  };

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="border border-destructive/40 bg-card p-5 shadow-xl">
        <div className="text-[10px] uppercase tracking-[0.3em] text-destructive">Cộc lốc phrasing</div>
        <p className="mt-2 font-display text-xl line-through decoration-destructive/60">"{puzzle.bad}"</p>
        <div className="mt-3 text-[10px] uppercase tracking-[0.3em] text-primary">Assemble the 5-star equivalent</div>
      </motion.div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropTray}
        className="min-h-[110px] border border-primary bg-card p-4 shadow-xl"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-primary">Your refined sentence</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {tray.length === 0 && (
            <span className="text-xs italic text-foreground/40">Drag chips here in the correct order…</span>
          )}
          {tray.map((w, i) => (
            <button
              key={`${w}-${i}`}
              draggable
              onDragStart={(e) => onDragStart(e, w, "tray", i)}
              onClick={() => moveToBank(w, i)}
              className="border border-primary bg-primary/15 px-3 py-1.5 font-display text-sm text-foreground"
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDropBank}
        className="border border-primary/30 bg-card p-4 shadow-xl"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-foreground/60">Word bank</div>
        <div className="mt-3 flex flex-wrap gap-2">
          {bank.map((w, i) => (
            <button
              key={`${w}-${i}`}
              draggable
              onDragStart={(e) => onDragStart(e, w, "bank", i)}
              onClick={() => moveToTray(w, i)}
              className="border border-primary/40 bg-background/60 px-3 py-1.5 font-display text-sm text-foreground/85 hover:border-primary"
            >
              {w}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
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
