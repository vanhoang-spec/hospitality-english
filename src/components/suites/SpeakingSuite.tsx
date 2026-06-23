import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent } from "@/lib/content/week-content";

const SCENARIOS = [
  {
    complaint: "I've been waiting 25 minutes for my room key. This is unacceptable.",
    target: "I sincerely apologise for the wait. May I offer you a welcome refreshment while I expedite your key personally.",
  },
  {
    complaint: "The air conditioning in my suite is much too cold.",
    target: "Please accept my apologies. I will arrange engineering to adjust the climate to your preference immediately.",
  },
  {
    complaint: "There is no hot water in the bathroom.",
    target: "I am very sorry for the inconvenience. May I move you to an upgraded suite while we resolve this for you.",
  },
];

function normalize(s: string) {
  return s.toLowerCase().replace(/[^\w\s']/g, " ").split(/\s+/).filter(Boolean);
}

function compareWords(spoken: string, target: string) {
  const a = normalize(spoken);
  const b = normalize(target);
  const used = new Set<number>();
  const correctIdx = new Set<number>();
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < a.length; j++) {
      if (!used.has(j) && a[j] === b[i]) {
        used.add(j);
        correctIdx.add(i);
        break;
      }
    }
  }
  const accuracy = b.length === 0 ? 0 : correctIdx.size / b.length;
  return { correctIdx, accuracy, words: b };
}

export function SpeakingSuite() {
  const { awardStars, patchMetrics } = useAcademy();
  const [idx, setIdx] = useState(0);
  const scenario = SCENARIOS[idx];
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<ReturnType<typeof compareWords> | null>(null);
  const [confetti, setConfetti] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recogRef = useRef<any>(null);

  function start() {
    setError(null);
    setTranscript("");
    setResult(null);
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setError("Speech recognition isn't supported in this browser. Try Chrome.");
      return;
    }
    const r = new SR();
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = true;
    let final = "";
    r.onresult = (e: any) => {
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += " " + t;
        setTranscript((final + " " + t).trim());
      }
    };
    r.onerror = (e: any) => setError(`Mic error: ${e.error}`);
    r.onend = () => {
      setRecording(false);
      const cmp = compareWords(final, scenario.target);
      setResult(cmp);
      const acc = Math.round(cmp.accuracy * 100);
      patchMetrics({ fluency_score: Math.min(100, Math.max(50, acc)) });
      if (acc > 80) {
        awardStars(5);
        setConfetti(true);
        setTimeout(() => setConfetti(false), 2200);
      }
    };
    r.start();
    recogRef.current = r;
    setRecording(true);
  }

  function stop() {
    recogRef.current?.stop();
  }

  function speak() {
    const u = new SpeechSynthesisUtterance(scenario.complaint);
    u.rate = 0.95;
    window.speechSynthesis.speak(u);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-primary/30 bg-card p-6 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Guest Complaint</div>
        <p className="mt-4 font-display text-2xl leading-snug">"{scenario.complaint}"</p>
        <div className="mt-5 flex gap-3">
          <button onClick={speak} className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground hover:border-primary">
            ▶ Play audio
          </button>
          <button
            onClick={() => {
              setIdx((i) => (i + 1) % SCENARIOS.length);
              setTranscript("");
              setResult(null);
            }}
            className="text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground"
          >
            Next scenario →
          </button>
        </div>

        <div className="mt-8 text-xs uppercase tracking-[0.3em] text-primary">Target Polite Phrase</div>
        <div className="mt-3 leading-relaxed">
          {result ? (
            result.words.map((w, i) => (
              <span
                key={i}
                style={{
                  color: result.correctIdx.has(i) ? "#7fe3a3" : "#ff8a94",
                  background: result.correctIdx.has(i) ? "rgba(15,81,50,0.4)" : "rgba(132,32,41,0.35)",
                  padding: "2px 4px",
                  marginRight: 4,
                  borderRadius: 3,
                }}
              >
                {w}
              </span>
            ))
          ) : (
            <span className="text-foreground/80">{scenario.target}</span>
          )}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-primary/30 bg-card p-6 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Your Response</div>
        <div className="mt-6 flex flex-col items-center">
          <button
            onMouseDown={start}
            onMouseUp={stop}
            onTouchStart={start}
            onTouchEnd={stop}
            className={`relative flex h-28 w-28 items-center justify-center rounded-full border-2 border-primary text-3xl shadow-xl transition-transform ${
              recording ? "scale-110 bg-primary text-primary-foreground" : "bg-card text-primary hover:scale-105"
            }`}
            aria-label="Hold to record"
          >
            🎙
            {recording && (
              <span className="absolute inset-0 animate-ping rounded-full border-2 border-primary/60" />
            )}
          </button>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-foreground/60">
            {recording ? "Listening…" : "Hold to speak"}
          </p>
        </div>

        <div className="mt-6 min-h-[80px] border border-primary/20 bg-background/40 p-4 text-sm text-foreground/80">
          {transcript || <span className="text-foreground/40">Your spoken words will appear here.</span>}
        </div>

        {result && (
          <div className="mt-5 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Accuracy</div>
              <div className="font-display text-3xl text-primary">{Math.round(result.accuracy * 100)}%</div>
            </div>
            {result.accuracy > 0.8 && (
              <div className="text-xs uppercase tracking-[0.25em] text-primary">+5 ⭐ awarded</div>
            )}
          </div>
        )}
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
      </motion.div>

      {confetti && <Confetti />}
    </div>
  );
}

function Confetti() {
  const pieces = Array.from({ length: 60 });
  return (
    <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.3;
        const dur = 1.4 + Math.random();
        const rot = Math.random() * 360;
        return (
          <span
            key={i}
            className="absolute top-0 block h-2 w-2"
            style={{
              left: `${left}%`,
              background: i % 3 === 0 ? "#D4AF37" : i % 3 === 1 ? "#F9F6EE" : "#0F5132",
              animation: `confetti ${dur}s linear ${delay}s forwards`,
              transform: `rotate(${rot}deg)`,
            }}
          />
        );
      })}
      <style>{`@keyframes confetti { to { transform: translateY(110vh) rotate(720deg); opacity: 0.2; } }`}</style>
    </div>
  );
}
