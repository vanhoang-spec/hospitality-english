import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";

const BAD_PHRASES: Array<{ bad: string; good: string }> = [
  { bad: "Wait a minute", good: "Please allow me a brief moment" },
  { bad: "Ok", good: "Certainly, my pleasure" },
  { bad: "Give me passport", good: "May I see your passport, please" },
  { bad: "No room", good: "Regrettably, we are fully committed this evening" },
  { bad: "What you want?", good: "How may I be of service?" },
  { bad: "Hurry up", good: "Whenever you are ready, sir/madam" },
  { bad: "Not my job", good: "Allow me to find the right colleague for you" },
  { bad: "Sit there", good: "Please, follow me to your table" },
];

type Bubble = { id: number; phrase: string; good: string; y: number; speed: number; smashed?: boolean };

export function ArcadeSuite() {
  const { awardStars, patchMetrics } = useAcademy();
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(60);
  const [patience, setPatience] = useState(100);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [smashedCount, setSmashedCount] = useState(0);
  const [score, setScore] = useState(0);
  const [popup, setPopup] = useState<{ id: number; text: string } | null>(null);
  const idRef = useRef(0);
  const startedRef = useRef<number>(0);

  function start() {
    setPlaying(true);
    setTime(60);
    setPatience(100);
    setBubbles([]);
    setSmashedCount(0);
    setScore(0);
    startedRef.current = Date.now();
  }

  useEffect(() => {
    if (!playing) return;
    const tick = setInterval(() => setTime((t) => Math.max(0, t - 1)), 1000);
    const spawn = setInterval(() => {
      const p = BAD_PHRASES[Math.floor(Math.random() * BAD_PHRASES.length)];
      setBubbles((b) => [
        ...b,
        { id: ++idRef.current, phrase: p.bad, good: p.good, y: 15 + Math.random() * 65, speed: 9 + Math.random() * 5 },
      ]);
    }, 1100);
    return () => {
      clearInterval(tick);
      clearInterval(spawn);
    };
  }, [playing]);

  useEffect(() => {
    if (time === 0 && playing) {
      setPlaying(false);
      const elapsed = (Date.now() - startedRef.current) / 1000;
      const avgPerSmash = smashedCount > 0 ? elapsed / smashedCount : 5;
      patchMetrics({ reflex_speed: Math.min(100, Math.max(20, Math.round(100 - avgPerSmash * 8))) });
    }
  }, [time, playing, smashedCount, patchMetrics]);

  function smash(b: Bubble) {
    if (b.smashed) return;
    setBubbles((bs) => bs.map((x) => (x.id === b.id ? { ...x, smashed: true } : x)));
    setSmashedCount((c) => c + 1);
    setScore((s) => s + 2);
    awardStars(2);
    setPopup({ id: b.id, text: b.good });
    setTimeout(() => setPopup((p) => (p?.id === b.id ? null : p)), 1400);
    setTimeout(() => setBubbles((bs) => bs.filter((x) => x.id !== b.id)), 600);
  }

  function onEscape(b: Bubble) {
    if (b.smashed) return;
    setPatience((p) => Math.max(0, p - 8));
    setBubbles((bs) => bs.filter((x) => x.id !== b.id));
  }

  useEffect(() => {
    if (patience === 0 && playing) setPlaying(false);
  }, [patience, playing]);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4 border border-primary/30 bg-card p-4 shadow-xl">
        <div className="flex items-center gap-6">
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Time</div>
            <div className="font-display text-2xl text-primary">{time}s</div>
          </div>
          <div className="w-48">
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Guest Patience</div>
            <div className="mt-1 h-2 w-full overflow-hidden bg-background">
              <div className="h-full transition-all" style={{ width: `${patience}%`, background: patience > 40 ? "var(--gold)" : "#ff5a5a" }} />
            </div>
          </div>
          <div>
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">Stars</div>
            <div className="font-display text-2xl text-primary">+{score}</div>
          </div>
        </div>
        <button
          onClick={start}
          disabled={playing}
          className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl disabled:opacity-50"
        >
          {playing ? "In service" : "Start Rush"}
        </button>
      </div>

      <div className="relative h-[420px] overflow-hidden border border-primary/30 bg-card shadow-xl">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, rgba(212,175,55,0.05), transparent 60%)" }} />
        {!playing && time === 60 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <div className="text-xs uppercase tracking-[0.3em] text-primary">VIP Rush Hour</div>
            <h3 className="font-display mt-3 text-3xl">Smash the unprofessional phrases.</h3>
            <p className="mt-2 max-w-md text-sm text-foreground/70">Tap each phrase before it escapes. Each smash repairs it into a 5-star equivalent and awards +2 ⭐.</p>
          </div>
        )}
        {!playing && time === 0 && (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            <h3 className="font-display text-4xl text-primary">Shift complete</h3>
            <p className="mt-2 text-sm text-foreground/70">Smashed {smashedCount} phrases · earned {score} ⭐</p>
          </div>
        )}
        {bubbles.map((b) => (
          <motion.button
            key={b.id}
            initial={{ x: "110%" }}
            animate={{ x: b.smashed ? undefined : "-30vw" }}
            transition={{ duration: b.speed, ease: "linear" }}
            onAnimationComplete={() => onEscape(b)}
            onClick={() => smash(b)}
            className={`absolute select-none whitespace-nowrap px-4 py-2 font-display text-base shadow-xl ${
              b.smashed ? "border border-primary bg-primary text-primary-foreground" : "border border-destructive/60 bg-destructive/20 text-foreground"
            }`}
            style={{ top: `${b.y}%`, borderRadius: 999 }}
          >
            {b.smashed ? "✓ " + b.good : "✕ " + b.phrase}
          </motion.button>
        ))}
        {popup && (
          <div className="pointer-events-none absolute left-1/2 top-6 -translate-x-1/2 border border-primary bg-card px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary shadow-xl">
            +2 ⭐ · {popup.text}
          </div>
        )}
      </div>
    </div>
  );
}
