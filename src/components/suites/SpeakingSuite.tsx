import { useEffect, useRef, useState } from "react";
// useEffect used inside FireworksCanvas below
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import {
  getWeekContent,
  speakerAudioLabel,
  speakerLabel,
  type WeekContent,
} from "@/lib/content/week-content";
import { speakEN, playApplause, dedupeTranscript } from "@/lib/speech";
import { passThresholds, utterancePassed } from "@/lib/speaking-score";
import { listeningRateForWeek } from "@/lib/phases";
import { SuiteComingSoon } from "./SuiteComingSoon";

export function SpeakingSuite({ dep, week }: { dep?: string; week?: string }) {
  const content = dep && week ? getWeekContent(dep, week) : null;
  if (!content) return <SuiteComingSoon />;
  return <SpeakingSuiteInner dep={dep!} week={week!} content={content} />;
}

function SpeakingSuiteInner({
  dep,
  week,
  content,
}: {
  dep: string;
  week: string;
  content: WeekContent;
}) {
  const { awardStars, patchMetrics, recordSuiteResult } = useAcademy();
  const th = passThresholds(week);
  // The bar rises during phase 2. Say so on the week it moves, rather than
  // letting a learner who cleared every scenario last week discover in
  // silence that the same performance no longer passes.
  const prevTh = passThresholds(Math.max(1, Number(week) - 1));
  const barJustRose = th.accPct > prevTh.accPct;
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
      requiredTokens: s.requiredTokens,
      who: speakerLabel(s),
      audioWho: speakerAudioLabel(s),
    })),
  );
  const [idx, setIdx] = useState(0);
  const scenario = scenarios[idx];
  const [recording, setRecording] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [result, setResult] = useState<ReturnType<typeof utterancePassed> | null>(null);
  // The model sentence used to sit on screen from the first second, so every
  // "speaking" rep was reading aloud, never recall — the audit called weekly
  // speaking read-aloud in so many words. First attempt now hides the text
  // (the audio stays available; hearing-then-saying is the skill). It reveals
  // after one scored attempt or on demand, the same pattern OralStage uses.
  const [revealed, setRevealed] = useState(false);
  const [fireworks, setFireworks] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const recogRef = useRef<SpeechRecognition | null>(null);
  const finalRef = useRef<string>("");

  function start() {
    setError(null);
    setTranscript("");
    setResult(null);
    finalRef.current = "";
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setError("Trình duyệt này chưa hỗ trợ nhận dạng giọng nói. Hãy thử dùng Chrome.");
      return;
    }
    const r = new SR();
    r.lang = "en-US";
    r.continuous = true;
    r.interimResults = true;
    r.onresult = (e: SpeechRecognitionEvent) => {
      let interim = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) finalRef.current += " " + t;
        else interim += " " + t;
      }
      setTranscript(dedupeTranscript((finalRef.current + " " + interim).trim()));
    };
    r.onerror = (e: SpeechRecognitionErrorEvent) => setError(`Lỗi micro: ${e.error}`);
    r.onend = () => {
      setRecording(false);
      const cleaned = dedupeTranscript(finalRef.current.trim());
      setTranscript(cleaned);
      // One grader for the drill and the exam — utterancePassed also refuses
      // a missing value token, so "Room three-oh-five" no longer passes a
      // two-oh-five item here while failing it on the checkpoint.
      const cmp = utterancePassed(
        cleaned,
        scenario.target,
        week,
        scenario.requiredTokens,
        // The guest's own line is what decides whether sir/madam was
        // answerable in the first place.
        scenario.complaint,
      );
      setResult(cmp);
      const acc = Math.round(cmp.accuracy * 100);
      patchMetrics({ fluency_score: Math.min(100, Math.max(50, acc)) });
      const passed = cmp.passed;
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
    } catch (err) {
      setError(`Không mở được micro: ${err instanceof Error ? err.message : String(err)}`);
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
    speakEN(scenario.complaint, listeningRateForWeek(week));
  }

  return (
    <div className="space-y-4">
      {barJustRose && (
        <div className="border-l-2 border-primary bg-primary/5 px-4 py-3 text-xs leading-relaxed text-foreground/80">
          <strong className="text-primary">
            Từ tuần {week}, chuẩn phần nói tăng lên {th.accPct}%
          </strong>{" "}
          (trước là {prevTh.accPct}%). Giai đoạn A2 đòi câu dài hơn và đúng thứ tự hơn — nói chậm
          lại, đủ ý, hơn là nói nhanh cho xong.
        </div>
      )}
      {scenarios.length > 1 && (
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/60">
          <span>
            Tình huống {idx + 1}/{scenarios.length}
          </span>
          <span className="text-primary">
            Đạt chuẩn: {passedRef.current.size}/{scenarios.length}
          </span>
        </div>
      )}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-primary/30 bg-card p-6 shadow-xl"
        >
          <div className="text-xs uppercase tracking-[0.3em] text-primary">{scenario.who}</div>
          <p className="mt-4 font-display text-2xl leading-snug">"{scenario.complaint}"</p>
          <div className="mt-5 flex flex-wrap gap-3">
            <button
              onClick={speakComplaint}
              className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] text-foreground hover:border-primary"
            >
              ▶ Nghe {scenario.audioWho}
            </button>
            <button
              onClick={() => speakEN(scenario.target, listeningRateForWeek(week))}
              className="border border-primary px-4 py-2 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
            >
              🔊 Nghe câu mẫu
            </button>
            <button
              onClick={() => {
                setIdx((i) => (i + 1) % scenarios.length);
                setTranscript("");
                setResult(null);
                setRevealed(false);
              }}
              className="text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground"
            >
              Tình huống tiếp theo →
            </button>
          </div>

          <div className="mt-8 text-xs uppercase tracking-[0.3em] text-primary">
            Câu trả lời chuẩn
          </div>
          <div className="mt-3 leading-relaxed">
            {result ? (
              result.words.map((w, i) => (
                <span
                  key={i}
                  style={{
                    color: result.correctIdx.has(i) ? "#7fe3a3" : "#ff8a94",
                    background: result.correctIdx.has(i)
                      ? "rgba(15,81,50,0.4)"
                      : "rgba(132,32,41,0.35)",
                    padding: "2px 4px",
                    marginRight: 4,
                    borderRadius: 3,
                  }}
                >
                  {w}
                </span>
              ))
            ) : revealed ? (
              <span className="text-foreground/80">{scenario.target}</span>
            ) : (
              <button
                onClick={() => setRevealed(true)}
                className="border border-dashed border-primary/40 px-3 py-2 text-xs uppercase tracking-[0.2em] text-foreground/60 hover:border-primary hover:text-foreground"
              >
                Ẩn để bạn tự nhớ — nghe rồi nói thử trước, hoặc bấm để xem
              </button>
            )}
          </div>
          {scenario.tip && (
            <p className="mt-4 border-l-2 border-primary/60 pl-3 text-xs italic text-foreground/65">
              💡 {scenario.tip}
            </p>
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
                  ? {
                      boxShadow: "0 0 32px 8px rgba(212,175,55,0.55)",
                      animation: "pulseGold 1.2s ease-in-out infinite",
                    }
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
                <div className="text-xs uppercase tracking-[0.25em] text-foreground/60">
                  Độ chính xác
                </div>
                <div className="font-display text-3xl text-primary">
                  {Math.round(result.accuracy * 100)}%
                </div>
              </div>
              {result.passed && (
                <div className="text-xs uppercase tracking-[0.25em] text-primary">
                  +5 ⭐ đạt chuẩn
                </div>
              )}
              {!result.passed && result.missingRequired.length > 0 && (
                <div className="max-w-[180px] text-right text-[10px] uppercase tracking-[0.2em] text-destructive">
                  Sai hoặc thiếu từ mang giá trị: {result.missingRequired.join(", ")} — sai số là
                  sai nghĩa, nói lại cho đúng
                </div>
              )}
              {/* Ba lý do trượt dưới đây đều là "đủ điểm phần trăm nhưng sai điều
                  bài đang dạy". Không nói ra thì học viên chỉ thấy một con số và
                  không biết phải sửa gì. */}
              {!result.passed && result.addedNegation.length > 0 && (
                <div className="max-w-[180px] text-right text-[10px] uppercase tracking-[0.2em] text-destructive">
                  Câu mẫu không có {result.addedNegation.join(", ")} — bạn vừa nói ngược nghĩa
                </div>
              )}
              {!result.passed && result.missingContent.length > 0 && (
                <div className="max-w-[180px] text-right text-[10px] uppercase tracking-[0.2em] text-destructive">
                  Thiếu {result.missingContent.join(", ")} — đó là chữ mang nghĩa của câu
                </div>
              )}
              {!result.passed && result.insertedWords.length > 0 && (
                <div className="max-w-[180px] text-right text-[10px] uppercase tracking-[0.2em] text-destructive">
                  Câu mẫu không có {result.insertedWords.join(", ")} — thừa một chữ cũng là sai câu
                </div>
              )}
              {!result.passed && result.inflectionErrors.length > 0 && (
                <div className="max-w-[180px] text-right text-[10px] uppercase tracking-[0.2em] text-destructive">
                  Thiếu đuôi -s: {result.inflectionErrors.join(", ")} — nghe kỹ âm cuối rồi nói lại
                </div>
              )}
              {!result.passed &&
                result.missingRequired.length === 0 &&
                result.addedNegation.length === 0 &&
                result.insertedWords.length === 0 &&
                result.missingContent.length === 0 &&
                result.inflectionErrors.length === 0 &&
                result.accuracy * 100 >= th.accPct &&
                result.orderRatio < th.orderRatio && (
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
          x,
          y,
          vx: Math.cos(a) * v,
          vy: Math.sin(a) * v,
          life: 1,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    }
    let frame = 0;
    let rafId = 0;
    function loop() {
      frame++;
      if (frame % 18 === 0 && frame < 110)
        burst(Math.random() * W, H * 0.25 + Math.random() * H * 0.4);
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
      for (let i = particles.length - 1; i >= 0; i--)
        if (particles[i].life <= 0) particles.splice(i, 1);
      rafId = requestAnimationFrame(loop);
    }
    rafId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafId);
  }, []);
  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 z-50"
      style={{ width: "100vw", height: "100vh" }}
    />
  );
}
