import { useEffect, useRef, useState } from "react";
// useEffect used inside FireworksCanvas below
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import { getWeekContent, type WeekContent } from "@/lib/content/week-content";
import { speakEN, playApplause, dedupeTranscript } from "@/lib/speech";
import { SuiteComingSoon } from "./SuiteComingSoon";

// Speech recognition transcribes spoken numbers as digits ("two-oh-five"
// → "205", "twenty-five" → "25"), while pre-A1 targets are authored as
// number WORDS. Expand digit tokens so learners aren't failed for
// pronouncing a number correctly.
const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const TEENS = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function digitToWords(tok: string): string[] {
  const n = parseInt(tok, 10);
  if (tok.length <= 2 && n < 10) return [ONES[n]];
  if (tok.length === 2) {
    if (n < 20) return [TEENS[n - 10]];
    const t = TENS[Math.floor(n / 10)];
    return n % 10 === 0 ? [t] : [t, ONES[n % 10]];
  }
  // 3+ digits: hotel room-number convention — digit by digit, 0 = "oh".
  return [...tok].map((d) => (d === "0" ? "oh" : ONES[Number(d)]));
}

function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((tok) => (/^\d+$/.test(tok) ? digitToWords(tok) : [tok]));
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
  // Order-aware check: longest common subsequence of the two word
  // streams, as a fraction of the target length. Bag-matching alone can
  // be gamed by reciting the right words in any order — real speech has
  // to follow the sentence's word order too.
  const orderRatio = b.length === 0 ? 0 : lcsLength(a, b) / b.length;
  return { correctIdx, accuracy, orderRatio, words: b };
}

function lcsLength(a: string[], b: string[]): number {
  const dp: number[] = new Array(b.length + 1).fill(0);
  for (let i = 1; i <= a.length; i++) {
    let prev = 0;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev + 1 : Math.max(dp[j], dp[j - 1]);
      prev = tmp;
    }
  }
  return dp[b.length];
}

const PASS_ACCURACY = 80;
const PASS_ORDER_RATIO = 0.6;

export function SpeakingSuite({ dep, week }: { dep?: string; week?: string }) {
  const content = dep && week ? getWeekContent(dep, week) : null;
  if (!content) return <SuiteComingSoon />;
  return <SpeakingSuiteInner dep={dep!} week={week!} content={content} />;
}

function SpeakingSuiteInner({ dep, week, content }: { dep: string; week: string; content: WeekContent }) {
  const { awardStars, patchMetrics, recordSuiteResult } = useAcademy();
  const earned = useRef(0);
  // Per-scenario pass state — mirrors ReadingSuite's bestPctRef pattern.
  // Mastery requires passing every scenario in the week, and stars are
  // only ever awarded once per scenario (not once per suite).
  const passedRef = useRef<Set<number>>(new Set());
  const bestPctRef = useRef<Map<number, number>>(new Map());
  const scenarios = content.lessons.flatMap((l) =>
    l.speaking.map((s) => ({
      complaint: s.guestPrompt,
      target: s.targetResponse,
      tip: s.helpTip,
    })),
  );
  const [idx, setIdx] = useState(0);
  const scenario = scenarios[idx];
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<ReturnType<typeof compareWords> | null>(null);
  const [fireworks, setFireworks] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recogRef = useRef<any>(null);
  const finalRef = useRef<string>("");

  function start() {
    setError(null);
    setTranscript("");
    setResult(null);
    finalRef.current = "";
    const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SR) {
      setError("Trình duyệt này chưa hỗ trợ nhận dạng giọng nói. Hãy thử dùng Chrome.");
      return;
    }
    const r = new SR();
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = true;
    r.onresult = (e: any) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalRef.current += " " + t;
        else interim += " " + t;
      }
      setTranscript(dedupeTranscript((finalRef.current + " " + interim).trim()));
    };
    r.onerror = (e: any) => setError(`Lỗi micro: ${e.error}`);
    r.onend = () => {
      setRecording(false);
      const cleaned = dedupeTranscript(finalRef.current.trim());
      setTranscript(cleaned);
      const cmp = compareWords(cleaned, scenario.target);
      setResult(cmp);
      const acc = Math.round(cmp.accuracy * 100);
      patchMetrics({ fluency_score: Math.min(100, Math.max(50, acc)) });
      const passed = acc >= PASS_ACCURACY && cmp.orderRatio >= PASS_ORDER_RATIO;
      bestPctRef.current.set(idx, Math.max(bestPctRef.current.get(idx) ?? 0, acc));
      if (passed && !passedRef.current.has(idx)) {
        passedRef.current.add(idx);
        awardStars(5);
        earned.current += 5;
        setFireworks(true);
        playApplause(1800);
        setTimeout(() => setFireworks(false), 2400);
      }
      if (dep && week) {
        const sumPct = scenarios.reduce((s, _, i) => s + (bestPctRef.current.get(i) ?? 0), 0);
        const avgPct = Math.round(sumPct / scenarios.length);
        recordSuiteResult(dep, week, "speaking", earned.current, {
          scorePct: avgPct,
          mastered: passedRef.current.size === scenarios.length,
        });
      }
    };
    try {
      r.start();
      recogRef.current = r;
      setRecording(true);
    } catch (err: any) {
      setError(`Không mở được micro: ${err?.message ?? err}`);
    }
  }

  function stop() {
    try {
      recogRef.current?.stop();
    } catch {
      /* */
    }
  }

  function toggle() {
    if (recording) stop();
    else start();
  }

  function speakComplaint() {
    speakEN(scenario.complaint, 0.9);
  }

  return (
    <div className="space-y-4">
      {scenarios.length > 1 && (
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/60">
          <span>Tình huống {idx + 1}/{scenarios.length}</span>
          <span className="text-primary">Đạt chuẩn: {passedRef.current.size}/{scenarios.length}</span>
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-primary/30 bg-card p-6 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Lời khách nói</div>
        <p className="mt-4 font-display text-2xl leading-snug">"{scenario.complaint}"</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={speakComplaint}
            className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground hover:border-primary"
          >
            ▶ Nghe lời khách
          </button>
          <button
            onClick={() => speakEN(scenario.target, 0.9)}
            className="border border-primary px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
          >
            🔊 Nghe câu mẫu
          </button>
          <button
            onClick={() => {
              setIdx((i) => (i + 1) % scenarios.length);
              setTranscript("");
              setResult(null);
            }}
            className="text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground"
          >
            Tình huống tiếp theo →
          </button>
        </div>

        <div className="mt-8 text-xs uppercase tracking-[0.3em] text-primary">Câu trả lời chuẩn</div>
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
        {scenario.tip && (
          <p className="mt-4 border-l-2 border-primary/60 pl-3 text-xs italic text-foreground/65">💡 {scenario.tip}</p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border border-primary/30 bg-card p-6 shadow-xl"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-primary">Câu trả lời của bạn</div>
        <div className="mt-6 flex flex-col items-center">
          <button
            onClick={toggle}
            className={`relative flex h-28 w-28 items-center justify-center rounded-full border-2 text-3xl shadow-xl transition-all ${
              recording
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary bg-card text-primary hover:scale-105"
            }`}
            style={
              recording
                ? { boxShadow: "0 0 32px 8px rgba(212,175,55,0.55)", animation: "pulseGold 1.2s ease-in-out infinite" }
                : undefined
            }
            aria-label={recording ? "Stop recording" : "Start recording"}
          >
            🎙
          </button>
          <style>{`@keyframes pulseGold { 0%,100% { box-shadow: 0 0 24px 6px rgba(212,175,55,0.45);} 50% { box-shadow: 0 0 44px 14px rgba(212,175,55,0.75);} }`}</style>
          <p className="mt-3 text-xs uppercase tracking-[0.25em] text-foreground/60">
            {recording ? "Đang nghe… bấm để dừng" : "Bấm để bắt đầu ghi âm"}
          </p>
        </div>

        <div className="mt-6 min-h-[80px] border border-primary/20 bg-background/40 p-4 text-sm text-foreground/80">
          {transcript || <span className="text-foreground/40">Lời bạn nói sẽ hiện ở đây.</span>}
        </div>

        {result && (
          <div className="mt-5 flex items-center justify-between">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">Độ chính xác</div>
              <div className="font-display text-3xl text-primary">{Math.round(result.accuracy * 100)}%</div>
            </div>
            {result.accuracy >= 0.8 && result.orderRatio >= PASS_ORDER_RATIO && (
              <div className="text-xs uppercase tracking-[0.25em] text-primary">+5 ⭐ đạt chuẩn</div>
            )}
            {result.accuracy >= 0.8 && result.orderRatio < PASS_ORDER_RATIO && (
              <div className="max-w-[180px] text-right text-[10px] uppercase tracking-[0.2em] text-destructive">
                Đúng từ nhưng sai thứ tự — nói lại theo đúng trình tự câu
              </div>
            )}
          </div>
        )}
        {error && <p className="mt-3 text-xs text-destructive">{error}</p>}
      </motion.div>

      {fireworks && <FireworksCanvas />}
      </div>
    </div>
  );
}

function FireworksCanvas() {
  const ref = useRef<HTMLCanvasElement | null>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    const W = window.innerWidth;
    const H = window.innerHeight;
    const colors = ["#D4AF37", "#F9F6EE", "#FF5577", "#55D6FF", "#7FE3A3", "#FFB347"];
    type P = { x: number; y: number; vx: number; vy: number; life: number; color: string };
    const particles: P[] = [];
    function burst(x: number, y: number) {
      const n = 60;
      for (let i = 0; i < n; i++) {
        const a = (Math.PI * 2 * i) / n;
        const v = 2 + Math.random() * 4;
        particles.push({
          x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v,
          life: 1, color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }
    let frame = 0;
    let rafId = 0;
    function loop() {
      frame++;
      if (frame % 18 === 0 && frame < 110) burst(Math.random() * W, H * 0.25 + Math.random() * H * 0.4);
      ctx!.clearRect(0, 0, W, H);
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.life -= 0.012;
        ctx!.globalAlpha = Math.max(0, p.life);
        ctx!.fillStyle = p.color;
        ctx!.beginPath();
        ctx!.arc(p.x, p.y, 3, 0, Math.PI * 2);
        ctx!.fill();
      }
      ctx!.globalAlpha = 1;
      for (let i = particles.length - 1; i >= 0; i--) if (particles[i].life <= 0) particles.splice(i, 1);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);
  return <canvas ref={ref} className="pointer-events-none fixed inset-0 z-50" style={{ width: "100vw", height: "100vh" }} />;
}
