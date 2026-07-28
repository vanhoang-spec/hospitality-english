import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";

type Round = {
  complaint: string;
  options: { text: string; quality: "lqa" | "ok" | "bad" }[];
};

const ROUNDS: Round[] = [
  {
    complaint: "I expected my suite to be ready at 1pm sharp. It is now 2:30.",
    options: [
      { text: "Sorry sir, the room is not ready yet. Please wait.", quality: "ok" },
      {
        text: "My sincerest apologies for the delay. Please enjoy a glass of champagne in the lounge while I personally ensure your suite is prepared within the next fifteen minutes.",
        quality: "lqa",
      },
      { text: "Check-in is at 3pm, you're early.", quality: "bad" },
    ],
  },
  {
    complaint: "The Wi-Fi in my room keeps dropping. I have a board meeting in twenty minutes.",
    options: [
      {
        text: "We can offer the business centre. May I escort you there now and have engineering attend your suite during the meeting?",
        quality: "lqa",
      },
      { text: "I'll send IT, please hold.", quality: "ok" },
      { text: "Try restarting your laptop, it usually works.", quality: "bad" },
    ],
  },
  {
    complaint: "There's a hair in my soup.",
    options: [
      {
        text: "Please accept my deepest apologies. I will remove this immediately, prepare a fresh course from the chef, and the evening's tasting will of course be our gift.",
        quality: "lqa",
      },
      { text: "I'm so sorry, let me bring you a new one.", quality: "ok" },
      { text: "It's just one hair, no big deal.", quality: "bad" },
    ],
  },
];

export function BoardGameSuite() {
  const { awardStars } = useAcademy();
  const [token, setToken] = useState(0); // 0..10
  const [round, setRound] = useState(0);
  const r = ROUNDS[round % ROUNDS.length];
  const [picked, setPicked] = useState<number | null>(null);

  const shuffled = useMemo(() => [...r.options].sort(() => Math.random() - 0.5), [round]);

  function play(i: number) {
    setPicked(i);
    const q = shuffled[i].quality;
    setTimeout(() => {
      if (q === "lqa") {
        setToken((t) => Math.min(10, t + 2));
        awardStars(3);
      } else if (q === "ok") {
        setToken((t) => Math.min(10, t + 1));
      } else {
        setToken((t) => Math.max(0, t - 1));
      }
      setPicked(null);
      setRound((n) => n + 1);
    }, 1200);
  }

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-primary/30 bg-card p-6 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Promotion Board</div>
        <div className="mt-4 flex gap-1">
          {Array.from({ length: 11 }).map((_, i) => (
            <div
              key={i}
              className={`relative h-10 flex-1 border ${i <= token ? "border-primary bg-primary/10" : "border-primary/20"}`}
            >
              {i === token && (
                <motion.span
                  layout
                  className="absolute inset-1 flex items-center justify-center bg-primary text-primary-foreground"
                >
                  ◆
                </motion.span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/60">
          <span>Trainee</span>
          <span>Supervisor</span>
          <span>Manager</span>
          <span>GM</span>
        </div>
      </motion.div>

      <motion.div
        key={round}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        className="border border-destructive/40 bg-card p-6 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-destructive">
          Bot AI · Hotel Inspector
        </div>
        <p className="mt-4 font-display text-xl leading-snug">"{r.complaint}"</p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {shuffled.map((opt, i) => (
          <motion.button
            key={i}
            onClick={() => picked === null && play(i)}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08 * i }}
            className={`min-h-[180px] border p-5 text-left shadow-xl transition-all ${
              picked === i
                ? opt.quality === "lqa"
                  ? "border-primary bg-primary/15"
                  : opt.quality === "ok"
                    ? "border-primary/40"
                    : "border-destructive bg-destructive/15"
                : "border-primary/30 bg-card hover:border-primary"
            }`}
          >
            <div className="text-[10px] uppercase tracking-[0.25em] text-primary">
              Response Card {i + 1}
            </div>
            <p className="mt-3 text-sm leading-relaxed text-foreground/90">{opt.text}</p>
            {picked === i && (
              <div className="mt-3 text-xs uppercase tracking-[0.2em] text-primary">
                {opt.quality === "lqa" && "LQA · Forbes standard · +3 ⭐, +2 spaces"}
                {opt.quality === "ok" && "Acceptable · +1 space"}
                {opt.quality === "bad" && "Below standard · −1 space"}
              </div>
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
