import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useAcademy } from "@/lib/academy-store";
import {
  getWeekContent,
  resolveReviewVocab,
  speakerAudioLabel,
  speakerLabel,
  type VocabItem,
} from "@/lib/content/week-content";
import { speakEN, dedupeTranscript, hasEnglishVoice } from "@/lib/speech";
import { utterancePassed } from "@/lib/speaking-score";
import {
  CHECKPOINT_MIX as MIX,
  CHECKPOINT_ORAL_ITEMS,
  oralPassMin,
  CHECKPOINT_ORAL_PASS_SHARE,
  CHECKPOINT_PASS_PCT,
  CHECKPOINT_RETAKE_COOLDOWN_MIN,
  CHECKPOINT_TOTAL_QUESTIONS as TOTAL_QUESTIONS,
  CONSTRUCT_LABEL_VI,
  PHASES,
  blockCleared,
  blockFloor,
  checkpointPassed,
  listeningRateForWeek,
  phaseOfWeek,
  weeksInPhase,
  type CheckpointConstruct,
  type ConstructTally,
} from "@/lib/phases";
import { buildPaper, shuffle, type Question } from "@/lib/checkpoint-paper";
import { useLastFailedCheckpoint, useMarkCheckpointPassed } from "@/lib/week-access";
import { SuiteComingSoon } from "./SuiteComingSoon";

/** Returns whether an English voice was actually available for this
 *  utterance. The listening floor is only enforced when the device has
 *  proven at least once that it can deliver English audio: many of this
 *  app's learners are on cheap Android handsets or in-app WebViews carrying
 *  only a vi-VN voice, where the "🔊 Nghe" button reads English orthography
 *  in Vietnamese or stays silent. Making the floor blocking there would
 *  turn a missing voice pack into a permanent course-wide lockout. */
function speakVaried(text: string, week: string | number): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return false;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis
    .getVoices()
    .filter((v) => v.lang.toLowerCase().startsWith("en"));
  if (voices.length > 0) u.voice = voices[Math.floor(Math.random() * voices.length)];
  u.lang = u.voice?.lang ?? "en-US";
  // Same ladder as ListeningSuite: a flat 0.85 made the week-6 pre-A1 paper
  // and the week-40 B1.1 paper equally hard to hear.
  u.rate = listeningRateForWeek(week);
  window.speechSynthesis.speak(u);
  return voices.length > 0;
}

type OralItem = {
  key: string;
  guestPrompt: string;
  who: string;
  audioWho: string;
  target: string;
  tip: string;
  /** The week the sentence was authored for — graded at THAT week's
   *  threshold, not the checkpoint's. */
  sourceWeek: number;
  requiredTokens?: string[];
  /** What the learner said one turn earlier, for the chained items of a
   *  multi-turn exchange. Dropping it here is how the phase's only three-turn
   *  conversation reached the checkpoint as three unrelated sentences — and
   *  worse: measured over 20,000 draws, 4.7% of oral halves served turn two or
   *  three with no opener at all, asking a learner to answer "Thank you. Good
   *  night." out of nowhere. */
  follows?: string;
};

/** Five spoken items drawn from across the phase, same pool the written
 *  paper samples. Tagged with their source week, which is why this walks
 *  the week records rather than the flattened lesson list. */
function buildOral(dep: string, week: string): OralItem[] {
  const items = weeksInPhase(week).flatMap((w) => {
    const c = getWeekContent(dep, String(w));
    if (!c) return [];
    return c.lessons.flatMap((l) =>
      l.speaking.map((s) => ({
        key: `s:${w}:${s.guestPrompt}`,
        guestPrompt: s.guestPrompt,
        who: speakerLabel(s),
        audioWho: speakerAudioLabel(s),
        target: s.targetResponse,
        tip: s.helpTip,
        requiredTokens: s.requiredTokens,
        follows: s.follows,
        sourceWeek: c.weekNumber,
      })),
    );
  });
  // Stratified by week, not a pure lottery. Safety language clusters in two
  // or three weeks of a phase, and a flat draw of five can miss all of them
  // at once — measured for Spa: 29.1% of passing learners had never spoken a
  // single safety line. One item per week first (weeks shuffled, items
  // within a week shuffled), then random fill if the phase has fewer weeks
  // than slots. Every week of the phase now has a voice in the oral half.
  // A `follows` chain is ONE exchange, so it is one draw. Sampling the middle
  // turn on its own measures a turn and never the conversation the week exists
  // to teach: four academic reviews measured the same thing independently —
  // 4.5% of sittings drew a chain turn, 0.0% drew two of them, so the
  // three-turn can-do had no assessment at all. A chain is pulled in whole
  // behind its head, and the cut below never lands inside one.
  const headOf = new Map<string, number>();
  items.forEach((it, i) => headOf.set(it.target, i));
  const nextOf = new Map<number, number>();
  const isTail = new Set<number>();
  items.forEach((it, i) => {
    if (!it.follows) return;
    const prev = headOf.get(it.follows);
    if (prev === undefined || prev === i || nextOf.has(prev)) return;
    nextOf.set(prev, i);
    isTail.add(i);
  });
  const chainAt = (i: number) => {
    const out = [items[i]];
    for (let cur = i, n = nextOf.get(cur); n !== undefined; cur = n, n = nextOf.get(cur))
      out.push(items[n]);
    return out;
  };
  const heads = items.map((_, i) => i).filter((i) => !isTail.has(i));

  const byWeek = new Map<number, number[]>();
  for (const i of shuffle(heads)) {
    const wk = items[i].sourceWeek;
    if (!byWeek.has(wk)) byWeek.set(wk, []);
    byWeek.get(wk)!.push(i);
  }
  // Within a week, a chain head goes first. A week that teaches a three-turn
  // exchange has one of them among thirty single turns, so leaving it to the
  // shuffle drew it on 3.6% of sittings — the can-do would stay unmeasured
  // with the grouping fixed and nothing else changed.
  for (const list of byWeek.values())
    list.sort((a, b) => Number(!nextOf.has(a)) - Number(!nextOf.has(b)));

  // Counted in UNITS, not turns: a chain is one draw, and the learner speaks
  // its three turns in a row the way the lesson taught them.
  const picked: typeof items = [];
  const used = new Set<number>();
  let units = 0;
  const take = (i: number) => {
    for (const it of chainAt(i)) picked.push(it);
    for (let cur: number | undefined = i; cur !== undefined; cur = nextOf.get(cur)) used.add(cur);
    units++;
  };
  for (const wk of shuffle([...byWeek.keys()])) {
    if (units >= CHECKPOINT_ORAL_ITEMS) break;
    take(byWeek.get(wk)![0]);
  }
  for (const i of shuffle(heads)) {
    if (units >= CHECKPOINT_ORAL_ITEMS) break;
    if (!used.has(i)) take(i);
  }
  return picked;
}

/** The oral half. Deliberately does NOT show the target sentence: an earlier
 *  version of the writing task printed its required keywords in the
 *  instructions and turned the exercise into copy-the-answer (see
 *  RequiredIdea.labelVi in week-content.ts). Targets are revealed on the
 *  results screen instead, and each item allows two attempts — enough to
 *  absorb a misheard word, not enough to hunt for the wording.
 *
 *  Fails OPEN on any recognition error: a hotel PC whose network cannot
 *  reach Chrome's speech service reports `network`, a locked-down handset
 *  reports `not-allowed`, and Firefox has no SpeechRecognition at all.
 *  None of those learners may be stopped by their device, so the typed
 *  route is always one click away and is switched on automatically. */
function OralStage({
  items,
  onFinish,
}: {
  items: OralItem[];
  onFinish: (
    results: { item: OralItem; passed: boolean; said: string; typed: boolean }[],
    deviceFailed: boolean,
  ) => void;
}) {
  const [idx, setIdx] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [recording, setRecording] = useState(false);
  const [said, setSaid] = useState("");
  const [typed, setTyped] = useState("");
  const [typedMode, setTypedMode] = useState(
    typeof window !== "undefined" && !window.SpeechRecognition && !window.webkitSpeechRecognition,
  );
  const [note, setNote] = useState<string | null>(null);
  // Whether the device actually failed, as opposed to the learner choosing
  // not to speak. Only the first tells us a typed answer is the best this
  // learner could give; the results are graded differently for the second.
  const deviceFailedRef = useRef(
    typeof window !== "undefined" && !window.SpeechRecognition && !window.webkitSpeechRecognition,
  );
  const resultsRef = useRef<{ item: OralItem; passed: boolean; said: string; typed: boolean }[]>(
    [],
  );
  const recogRef = useRef<SpeechRecognition | null>(null);
  const finalRef = useRef("");
  const item = items[idx];

  function commit(spoken: string, wasTyped = false) {
    const verdict = utterancePassed(
      spoken,
      item.target,
      item.sourceWeek,
      item.requiredTokens,
      item.guestPrompt,
    );
    resultsRef.current = [
      ...resultsRef.current,
      { item, passed: verdict.passed, said: spoken.trim(), typed: wasTyped },
    ];
    if (idx + 1 >= items.length) {
      onFinish(resultsRef.current, deviceFailedRef.current);
      return;
    }
    setIdx((i) => i + 1);
    setAttempts(0);
    setSaid("");
    setTyped("");
    setNote(null);
  }

  function listen() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setTypedMode(true);
      return;
    }
    finalRef.current = "";
    setSaid("");
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
      setSaid(dedupeTranscript((finalRef.current + " " + interim).trim()));
    };
    // Any error at all, not a curated list of codes: `network` on a
    // firewalled property looks nothing like `not-allowed` on a locked
    // handset, and neither learner should be graded zero for it.
    r.onerror = () => {
      deviceFailedRef.current = true;
      setTypedMode(true);
      setNote("Micro hoặc mạng không dùng được — hãy gõ câu trả lời bằng tiếng Anh.");
    };
    r.onend = () => {
      setRecording(false);
      const cleaned = dedupeTranscript(finalRef.current.trim());
      setSaid(cleaned);
      const next = attempts + 1;
      setAttempts(next);
      if (cleaned === "") {
        setNote(
          next >= 2
            ? "Vẫn chưa nghe được. Hãy gõ câu trả lời để tính điểm phần nói."
            : "Chưa nghe được gì — thử lại lần nữa.",
        );
        if (next >= 2) setTypedMode(true);
        return;
      }
      if (
        utterancePassed(
          cleaned,
          item.target,
          item.sourceWeek,
          item.requiredTokens,
          item.guestPrompt,
        ).passed ||
        next >= 2
      ) {
        commit(cleaned);
        return;
      }
      setNote("Chưa đạt. Bạn còn một lượt nói nữa cho câu này.");
    };
    try {
      r.start();
      recogRef.current = r;
      setRecording(true);
      setNote(null);
    } catch {
      deviceFailedRef.current = true;
      setTypedMode(true);
      setNote("Không mở được micro — hãy gõ câu trả lời bằng tiếng Anh.");
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-primary bg-card p-7 shadow-xl"
      >
        <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-primary">
          <span>
            Phần nói · câu {idx + 1}/{items.length}
          </span>
          <span className="text-foreground/50">Cần đạt {oralPassMin(items.length)} câu</span>
        </div>
        {item.follows && (
          <div className="mb-4 border-l-2 border-muted pl-3 text-sm italic text-muted-foreground">
            Bạn vừa nói: "{item.follows}"
          </div>
        )}
        <p className="font-display mt-4 text-2xl leading-snug">"{item.guestPrompt}"</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            // The item's OWN week, not the checkpoint's — it is graded at that
            // week's threshold, so it should be heard at that week's speed.
            onClick={() => speakEN(item.guestPrompt, listeningRateForWeek(item.sourceWeek))}
            className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
          >
            ▶ Nghe {item.audioWho}
          </button>
          {!typedMode && (
            <button
              onClick={listen}
              disabled={recording}
              className="bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground disabled:opacity-50"
            >
              {recording ? "● Đang thu…" : attempts === 0 ? "🎤 Trả lời" : "🎤 Nói lại"}
            </button>
          )}
        </div>
        {/* Gợi ý chỉ hiện SAU khi đã nói. Trong lúc chờ nói, nó là đáp án:
            một tip in trọn con số bị khoá ("forty-five") biến ô nói thành ô
            đọc-lại, đúng thứ mà việc giấu câu mẫu sinh ra để chặn. */}
        {item.tip && said && (
          <p className="mt-4 border-l-2 border-primary/60 pl-3 text-xs italic text-foreground/65">
            💡 {item.tip}
          </p>
        )}
        {said && <p className="mt-4 text-sm text-foreground/75">Bạn nói: "{said}"</p>}
        {note && <p className="mt-3 text-xs text-primary">{note}</p>}
        {typedMode && (
          <div className="mt-5">
            <textarea
              value={typed}
              onChange={(e) => setTyped(e.target.value)}
              rows={2}
              placeholder="Gõ câu trả lời bằng tiếng Anh…"
              className="w-full border border-primary/30 bg-background p-3 text-sm outline-none focus:border-primary"
            />
            <button
              onClick={() => typed.trim() && commit(typed, true)}
              className="mt-3 bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground"
            >
              Gửi câu trả lời →
            </button>
          </div>
        )}
        <p className="mt-6 text-xs leading-relaxed text-foreground/55">
          Câu mẫu sẽ hiện ở phần kết quả, sau khi bạn trả lời hết — để đây là bài kiểm tra nói,
          không phải đọc lại.
        </p>
      </motion.div>
    </div>
  );
}

export function WeekTestSuite({ dep, week }: { dep: string; week?: string }) {
  const { recordSuiteResult, awardStars } = useAcademy();
  const markCheckpointPassed = useMarkCheckpointPassed();
  const dbFailedAt = useLastFailedCheckpoint(dep, week ?? 0);
  // This session's own failure, because the row above is written
  // fire-and-forget and read from a cache — without it the cooldown would
  // not apply to the retake happening right now.
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const [now, setNow] = useState(() => Date.now());
  const lastFailure = Math.max(failedAt ?? 0, dbFailedAt ?? 0) || null;
  const cooldownMsLeft = lastFailure
    ? Math.max(0, lastFailure + CHECKPOINT_RETAKE_COOLDOWN_MIN * 60_000 - now)
    : 0;
  // Tick only while the wait is actually running, so the button unlocks
  // without the learner having to reload.
  useEffect(() => {
    if (cooldownMsLeft <= 0) return;
    const t = setInterval(() => setNow(Date.now()), 15_000);
    return () => clearInterval(t);
  }, [cooldownMsLeft]);
  const [attempt, setAttempt] = useState(0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const paper = useMemo(() => (week ? buildPaper(dep, week) : []), [dep, week, attempt]);

  const [stage, setStage] = useState<"intro" | "sitting" | "oral" | "done">("intro");
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const oral = useMemo(() => (week ? buildOral(dep, week) : []), [dep, week, attempt]);
  const [oralResults, setOralResults] = useState<
    { item: OralItem; passed: boolean; said: string; typed: boolean }[]
  >([]);
  const [idx, setIdx] = useState(0);
  // Answers are held until the end — a test that reveals each answer as
  // you go is a practice drill, not an assessment.
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [picked, setPicked] = useState<number | null>(null);
  const [scorePct, setScorePct] = useState(0);
  const [tallies, setTallies] = useState<ConstructTally[]>([]);
  const [mcqCorrect, setMcqCorrect] = useState(0);
  const awardedRef = useRef(false);
  // Set by the first playback that found an English voice — observed
  // capability, not a render-time probe: Chrome returns an empty getVoices()
  // until `voiceschanged` fires, so checking at mount would drop the
  // listening floor for everyone on first paint.
  // Whether the DEVICE can speak English, asked of the device. This used to
  // be a ref set inside the 🔊 buttons onClick, so skipping the button waived
  // the listening floor entirely.
  const [enVoice, setEnVoice] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    const read = () => setEnVoice(hasEnglishVoice());
    read();
    window.speechSynthesis.addEventListener?.("voiceschanged", read);
    return () => window.speechSynthesis.removeEventListener?.("voiceschanged", read);
  }, []);

  if (!week || paper.length < TOTAL_QUESTIONS) return <SuiteComingSoon />;

  const q = paper[idx];

  function start() {
    setAnswers(new Array(paper.length).fill(null));
    setIdx(0);
    setPicked(null);
    setStage("sitting");
  }

  function submitAnswer() {
    if (picked === null) return;
    const next = [...answers];
    next[idx] = picked;
    setAnswers(next);

    if (idx + 1 >= paper.length) {
      const correct = paper.reduce(
        (n, question, i) => n + (next[i] === question.correctIdx ? 1 : 0),
        0,
      );
      const pct = Math.round((correct / paper.length) * 100);
      setScorePct(pct);
      // Per-skill tally, so the pass rule can require a floor in each block
      // and the results screen can name the skill that fell short.
      const tallied: ConstructTally[] = (Object.keys(MIX) as CheckpointConstruct[]).map(
        (construct) => {
          const items = paper
            .map((question, i) => ({ question, given: next[i] }))
            .filter((r) => r.question.kind === construct);
          return {
            construct,
            correct: items.filter((r) => r.given === r.question.correctIdx).length,
            total: items.length,
            deliverable: construct === "listening" ? enVoice : true,
          };
        },
      );
      setTallies(tallied);
      setMcqCorrect(correct);
      // Commit the written half the moment it is earned, WITHOUT mastery:
      // the oral stage can be abandoned, crashed out of, or interrupted by a
      // shift starting, and 20 answered questions must not evaporate. The
      // score is held below the mark until both halves pass, so this write
      // can never open a phase on its own.
      recordSuiteResult(dep, week!, "weektest", 0, {
        scorePct: Math.min(pct, CHECKPOINT_PASS_PCT - 1),
      });
      setStage(oral.length >= CHECKPOINT_ORAL_ITEMS ? "oral" : "done");
      if (oral.length < CHECKPOINT_ORAL_ITEMS) finish(pct, tallied, [], false);
      return;
    }
    setIdx((i) => i + 1);
    setPicked(null);
  }

  /** The single place a sitting is graded and recorded. Both halves must
   *  pass — a conjunction, not a blended percentage, so 16 right answers
   *  cannot buy a silent learner a pass. */
  function finish(
    pct: number,
    tallied: ConstructTally[],
    results: { item: OralItem; passed: boolean; said: string; typed: boolean }[],
    deviceFailed: boolean,
  ) {
    const oralPassed = results.filter((r) => r.passed).length;
    const writtenOk = checkpointPassed(pct, tallied);
    // A typed answer is graded by the same scorer, but it is not speech. It
    // may stand in for speech when the device failed — a browser with no
    // SpeechRecognition, a firewalled property, a locked-down handset — and
    // not otherwise, or the certificate says "speaking" about a keyboard.
    const spokenAtAll = results.some((r) => !r.typed);
    const oralCounts = deviceFailed || spokenAtAll;
    const ok =
      writtenOk &&
      (results.length === 0 || (oralCounts && oralPassed >= oralPassMin(results.length)));
    setOralResults(results);
    if (ok && !awardedRef.current) {
      awardedRef.current = true;
      awardStars(mcqCorrect + oralPassed);
    }
    // Recorded score stays the 20-item written figure so it remains
    // comparable with every historical row, capped below the mark when
    // either half failed — the same guard writing-score.ts uses. Mastery is
    // the only thing the gate reads, so the cap plus `mastered: ok` is what
    // makes the conjunction real.
    recordSuiteResult(dep, week!, "weektest", ok ? mcqCorrect + oralPassed : 0, {
      scorePct: ok ? pct : Math.min(pct, CHECKPOINT_PASS_PCT - 1),
      mastered: ok,
    });
    // Open the next phase for this session immediately; the upsert above
    // is fire-and-forget, so waiting for it to be readable would leave
    // the learner staring at a lock they just cleared.
    if (ok) markCheckpointPassed(dep, week!);
    else setFailedAt(Date.now());
    setStage("done");
  }

  function retake() {
    awardedRef.current = false;
    setOralResults([]);
    setAttempt((a) => a + 1);
    setStage("intro");
  }

  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="border border-primary bg-card p-7 shadow-xl"
        >
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
            Sát hạch cuối giai đoạn
          </div>
          <h2 className="font-display mt-3 text-3xl text-foreground">
            Bài kiểm tra tổng hợp tuần {week}
          </h2>
          <div className="mt-5 space-y-3 text-sm leading-relaxed text-foreground/80">
            <p>
              {TOTAL_QUESTIONS} câu hỏi trộn từ toàn bộ giai đoạn: từ vựng, ngữ pháp lịch sự, nghe
              hiểu và đọc hiểu — không chỉ riêng tuần này.
            </p>
            <p>
              Bài thi <strong>không hiện đáp án giữa chừng</strong>. Bạn trả lời hết{" "}
              {TOTAL_QUESTIONS} câu, sau đó mới xem kết quả và giải thích từng câu sai.
            </p>
            <p>
              Cần đạt <strong>≥ {CHECKPOINT_PASS_PCT}% tổng thể</strong> và{" "}
              <strong>ít nhất một nửa mỗi kỹ năng</strong> (
              {(Object.keys(MIX) as CheckpointConstruct[])
                .map((c) => `${CONSTRUCT_LABEL_VI[c]} ${blockFloor(c)}/${MIX[c]}`)
                .join(", ")}
              ) để qua giai đoạn và mở các tuần tiếp theo. Điểm cao ở một kỹ năng không bù được cho
              kỹ năng bị bỏ trống.
            </p>
            <p>
              Sau phần trắc nghiệm là <strong>{CHECKPOINT_ORAL_ITEMS} lượt nói</strong> lấy từ khắp
              giai đoạn — một hội thoại nhiều lượt tính là một lượt — và cần đạt{" "}
              <strong>{Math.round(CHECKPOINT_ORAL_PASS_SHARE * 100)}%</strong> số câu. Câu mẫu chỉ
              hiện ở phần kết quả. Nếu micro hoặc mạng không dùng được, bạn gõ câu trả lời và vẫn
              được tính.
            </p>
          </div>
          {cooldownMsLeft > 0 ? (
            <div className="mt-7">
              <button
                disabled
                className="cursor-not-allowed border border-foreground/20 px-7 py-3 text-xs uppercase tracking-[0.25em] text-foreground/40"
              >
                Thi lại sau {Math.ceil(cooldownMsLeft / 60_000)} phút
              </button>
              <p className="mt-3 text-xs leading-relaxed text-foreground/60">
                Mỗi lượt thi dùng một đề trộn mới, nên thi lại liên tục là đoán mò chứ không phải
                tiến bộ. Hãy dùng {CHECKPOINT_RETAKE_COOLDOWN_MIN} phút này luyện lại đúng kỹ năng
                còn yếu — các tuần bạn đã mở vẫn mở, không mất gì.
              </p>
            </div>
          ) : (
            <button
              onClick={start}
              className="mt-7 bg-primary px-7 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground shadow-xl"
            >
              Bắt đầu thi →
            </button>
          )}
        </motion.div>
      </div>
    );
  }

  if (stage === "oral") {
    return (
      <OralStage
        items={oral}
        onFinish={(results, deviceFailed) => finish(scorePct, tallies, results, deviceFailed)}
      />
    );
  }

  if (stage === "done") {
    const oralPassed = oralResults.filter((r) => r.passed).length;
    const oralOk = oralResults.length === 0 || oralPassed >= oralPassMin(oralResults.length);
    const passed = checkpointPassed(scorePct, tallies) && oralOk;
    const shortfall = tallies.filter((t) => !blockCleared(t));
    const undeliverable = tallies.filter((t) => !t.deliverable);
    const nextPhase = PHASES.find((p) => p.index === (phaseOfWeek(week!)?.index ?? -1) + 1) ?? null;
    const wrong = paper
      .map((question, i) => ({ question, given: answers[i] }))
      .filter((r) => r.given !== r.question.correctIdx);
    return (
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-primary bg-card p-8 text-center shadow-xl"
        >
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
            Kết quả sát hạch
          </div>
          <div className="font-display mt-3 text-6xl text-primary">{scorePct}%</div>
          <p className="mt-3 text-sm text-foreground/80">
            {passed
              ? nextPhase
                ? `✦ Chúc mừng! Bạn đã qua giai đoạn này. Giai đoạn ${nextPhase.nameVi} (tuần ${nextPhase.from}–${nextPhase.to}) đã được mở.`
                : `✦ Chúc mừng! Bạn đã hoàn thành toàn bộ lộ trình 40 tuần.`
              : !oralOk && checkpointPassed(scorePct, tallies)
                ? `Phần viết đã đạt, nhưng phần nói mới ${oralPassed}/${oralResults.length} câu — cần ${oralPassMin(oralResults.length)}. Xem câu mẫu bên dưới, luyện ở mục Nói rồi thi lại.`
                : shortfall.length > 0 && scorePct >= CHECKPOINT_PASS_PCT
                  ? `Bạn đạt ${scorePct}% tổng thể, nhưng chưa đủ sàn tối thiểu ở: ${shortfall
                      .map(
                        (t) =>
                          `${CONSTRUCT_LABEL_VI[t.construct]} (${t.correct}/${t.total}, cần ${blockFloor(t.construct)})`,
                      )
                      .join(
                        ", ",
                      )}. Mỗi kỹ năng phải đạt ít nhất một nửa — hãy luyện đúng kỹ năng đó rồi thi lại.`
                  : `Cần ≥ ${CHECKPOINT_PASS_PCT}% để qua. Xem lại các câu sai bên dưới rồi thi lại nhé.`}
          </p>

          {/* Per-skill breakdown: the learner must be able to see WHICH skill
              fell short, not just a single percentage. */}
          <div className="mt-6 grid gap-2 text-left text-xs sm:grid-cols-2">
            {tallies.map((t) => {
              const ok = blockCleared(t);
              return (
                <div
                  key={t.construct}
                  className={`flex items-center justify-between border px-3 py-2 ${
                    ok ? "border-foreground/15 text-foreground/75" : "border-primary text-primary"
                  }`}
                >
                  <span>{CONSTRUCT_LABEL_VI[t.construct]}</span>
                  <span className="tabular-nums">
                    {t.correct}/{t.total}
                    {!t.deliverable
                      ? " · không tính sàn"
                      : ok
                        ? ""
                        : ` · cần ${blockFloor(t.construct)}`}
                  </span>
                </div>
              );
            })}
          </div>
          {undeliverable.length > 0 && (
            <p className="mt-4 text-xs leading-relaxed text-foreground/60">
              Thiết bị của bạn chưa có giọng đọc tiếng Anh, nên phần nghe hiểu chưa đo được. Điểm
              các phần khác vẫn được ghi và bạn không bị trừ vì chuyện này — nhưng giai đoạn tiếp
              theo chỉ mở khi có đủ cả phần nghe. Hãy làm lại trên Chrome hoặc Edge.
            </p>
          )}
          {oralResults.length > 0 && (
            <div className="mt-6 border-t border-foreground/10 pt-5 text-left">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em]">
                <span className="text-foreground/60">Phần nói</span>
                <span className={oralOk ? "text-foreground/60" : "text-primary"}>
                  {oralPassed}/{oralResults.length} · cần {oralPassMin(oralResults.length)}
                </span>
              </div>
              {oralResults.every((r) => r.typed) && (
                <p className="mt-2 text-[11px] leading-relaxed text-foreground/55">
                  Phần này bạn đã GÕ, không phải nói. Bài sát hạch cuối phase chứng nhận kỹ năng
                  NÓI, nên câu gõ chỉ thay được cho câu nói khi máy thật sự không thu được. Hãy
                  luyện ở mục Nói rồi thi lại bằng giọng.
                </p>
              )}
              {/* Targets are revealed only here — during the oral stage they
                  are hidden so the item measures speech, not reading. */}
              <div className="mt-4 space-y-3">
                {oralResults.map((r, i) => (
                  <div key={r.item.key + i} className="text-xs leading-relaxed">
                    <div className={r.passed ? "text-foreground/60" : "text-primary"}>
                      {r.passed ? "✓" : "✗"} {r.item.who}: "{r.item.guestPrompt}"
                    </div>
                    <div className="mt-1 text-foreground/75">
                      Câu mẫu: <span className="text-foreground">{r.item.target}</span>
                    </div>
                    {r.said && (
                      <div className="mt-0.5 text-foreground/50">
                        {r.typed ? "Bạn gõ" : "Bạn nói"}: "{r.said}"
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {passed && nextPhase && (
              <Link
                to="/department/$dep/week/$week"
                params={{ dep, week: String(nextPhase.from) }}
                className="bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
              >
                Vào tuần {nextPhase.from} →
              </Link>
            )}
            <button
              onClick={retake}
              className="border border-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
            >
              {cooldownMsLeft > 0 ? "Xem lại bài" : "Thi lại"}
            </button>
          </div>
        </motion.div>

        {wrong.length > 0 && (
          <div className="mt-8">
            <div className="text-[10px] uppercase tracking-[0.25em] text-foreground/60">
              Giải thích {wrong.length} câu chưa đúng
            </div>
            <div className="mt-4 space-y-4">
              {wrong.map(({ question, given }) => (
                <div
                  key={question.key}
                  className="border border-destructive/40 bg-card p-5 shadow-xl"
                >
                  <p className="text-sm text-foreground">
                    {question.kind === "listening" ? `Nghe: "${question.audio}"` : question.prompt}
                  </p>
                  {given !== null && (
                    <p className="mt-2 text-xs text-destructive">
                      Bạn chọn: {question.options[given]}
                    </p>
                  )}
                  <p className="mt-1 text-xs text-primary">
                    Đáp án đúng: {question.options[question.correctIdx]}
                  </p>
                  {question.note && (
                    <p className="mt-2 border-l-2 border-primary/60 pl-3 text-xs italic text-foreground/70">
                      💡 {question.note}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl">
      <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/60">
        <span>
          Sát hạch · Câu {idx + 1}/{paper.length}
        </span>
        <span className="text-primary">Không hiện đáp án giữa chừng</span>
      </div>
      <div className="mt-2 h-1 w-full bg-primary/15">
        <div
          className="h-1 bg-primary transition-all"
          style={{ width: `${(idx / paper.length) * 100}%` }}
        />
      </div>

      <motion.div
        key={q.key}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6 border border-primary/30 bg-card p-6 shadow-xl"
      >
        {q.kind === "reading" && (
          <pre className="font-sans mb-4 whitespace-pre-wrap border-l-2 border-primary/40 pl-3 text-xs leading-relaxed text-foreground/75">
            {q.passage}
          </pre>
        )}

        {q.kind === "listening" ? (
          <>
            <p className="font-display text-xl text-foreground">
              Nghe {q.audioWho} và chọn câu trả lời chuẩn 5 sao:
            </p>
            <button
              onClick={() => {
                speakVaried(q.audio, week!);
              }}
              className="mt-4 border border-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
            >
              🔊 Nghe
            </button>
          </>
        ) : (
          <p className="font-display text-xl text-foreground">{q.prompt}</p>
        )}

        <div className="mt-5 space-y-2">
          {q.options.map((opt, i) => (
            <button
              key={i}
              onClick={() => setPicked(i)}
              className={`block w-full border px-4 py-2.5 text-left text-sm transition-all ${
                picked === i
                  ? "border-primary bg-primary/10"
                  : "border-primary/20 hover:border-primary/60"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={submitAnswer}
            disabled={picked === null}
            className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl disabled:opacity-40"
          >
            {idx + 1 >= paper.length ? "Nộp bài" : "Câu tiếp →"}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
