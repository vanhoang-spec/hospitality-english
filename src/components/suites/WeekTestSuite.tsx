import { useEffect, useMemo, useRef, useState } from "react";
import { useSuiteSession } from "@/lib/session-resume";
import { ResumeBanner } from "./ResumeBanner";
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
import { speak, dedupeTranscript, hasEnglishVoice } from "@/lib/speech";
import { VoiceButton } from "@/components/VoicePicker";
import { utterancePassedAny } from "@/lib/speaking-score";
import {
  CHECKPOINT_MIX as MIX,
  CHECKPOINT_ORAL_ITEMS,
  oralPassMin,
  CHECKPOINT_ORAL_PASS_SHARE,
  CHECKPOINT_PASS_PCT,
  CHECKPOINT_RESUME_WINDOW_MIN,
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
import { buildPaper, type Question } from "@/lib/checkpoint-paper";
import { answersOf, buildOral, oralHalfPassed, type OralItem } from "@/lib/checkpoint-oral";
import { useLastFailedCheckpoint, useMarkCheckpointPassed } from "@/lib/week-access";
import { SuiteComingSoon } from "./SuiteComingSoon";

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
    const verdict = utterancePassedAny(spoken, answersOf(item), item.sourceWeek, item.guestPrompt);
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
    // Only a device that cannot hear opens the typed path. This handler used
    // to accept any error at all, and two of those errors are the learner's
    // own doing: `no-speech` is silence, and `not-allowed` is the learner
    // tapping "Block" on the microphone prompt. Four reviews in one round read
    // the same consequence off the code — stay silent once, or refuse the
    // microphone, and the oral half is typed and counted as spoken. The
    // practice suite already drew this line; the exam did not.
    r.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error === "no-speech" || e.error === "aborted") {
        setNote("Chưa nghe được gì — bấm micro và nói lại.");
        return;
      }
      // `service-not-allowed` is the browser refusing a speech service it
      // does not offer — a device limit, handled with the others below.
      if (e.error === "not-allowed") {
        setNote(
          "Phần nói cần quyền dùng micro. Hãy cho phép micro trong trình duyệt rồi bấm nói lại.",
        );
        return;
      }
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
        // Silence is not a broken device. Two silent attempts used to switch
        // the item to typing for good, which is the same back door the error
        // handler above closes: say nothing twice and type the answer.
        setNote("Chưa nghe được gì — bấm micro, nói gần máy hơn rồi thử lại.");
        return;
      }
      if (
        utterancePassedAny(cleaned, answersOf(item), item.sourceWeek, item.guestPrompt).passed ||
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
            onClick={() =>
              speak(item.guestPrompt, {
                role: "guest",
                rate: listeningRateForWeek(item.sourceWeek),
              })
            }
            className="border border-primary/40 px-4 py-2 text-xs uppercase tracking-[0.2em] hover:border-primary"
          >
            ▶ Nghe {item.audioWho}
          </button>
          <VoiceButton role="guest" />
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
        {/* …và ở ô dự trữ thì không hiện giữa hai lần nói: tip của ô ấy nói
            thẳng việc phải làm ("không hứa, chuyển quản lý trực"), nên lần
            nói thứ hai thành đọc lại gợi ý — một auditor mù chụp được đúng
            cảnh đó trên ô "đêm miễn phí". */}
        {item.tip && said && !item.reserved && (
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

/** An in-flight sitting: the drawn paper and everything answered so far. */
type WeekTestSnapshot = { paper: Question[]; answers: (number | null)[]; idx: number };

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
  const builtPaper = useMemo(() => (week ? buildPaper(dep, week) : []), [dep, week, attempt]);
  const [restoredPaper, setRestoredPaper] = useState<Question[] | null>(null);
  // The paper is drawn and shuffled per sitting, so resuming needs the
  // exact one that was in front of the learner — `answers[7]` means
  // nothing against a freshly drawn set of questions.
  const paper = restoredPaper ?? builtPaper;

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

  // P2-5. The written half is a 12–19 minute uninterrupted block against a
  // learner whose study window is 10–15 minutes, so an interruption here
  // was the normal case, not the edge one.
  //
  // Only the SITTING is snapshotted. Once the paper is submitted the
  // written score is already committed to lesson_progress (see
  // submitAnswer), so an interruption during the oral half costs a retake
  // of the oral, never the twenty answered questions.
  //
  // Two limits a practice suite does not have, because this is the paper the
  // phase gate and the manager's matrix trust:
  //  · it can be picked up for CHECKPOINT_RESUME_WINDOW_MIN after the last
  //    answer, not for a week (see the constant);
  //  · a sitting saved BEFORE the last failed attempt is not offered. Without
  //    that, a paper left open on a second phone was a way round the retake
  //    cooldown: fail on one device, resume the other.
  const store = useSuiteSession<WeekTestSnapshot>(
    dep,
    week ?? "",
    "weektest",
    CHECKPOINT_RESUME_WINDOW_MIN * 60_000,
  );
  const [resumeHandled, setResumeHandled] = useState(false);
  const overtaken = store.savedAt !== null && lastFailure !== null && store.savedAt < lastFailure;
  const resumable =
    store.ready && !resumeHandled && store.saved !== null && !overtaken && stage === "intro";

  useEffect(() => {
    if (!store.ready || resumable) return;
    if (stage !== "sitting") return;
    store.save({ paper, answers, idx });
  }, [store, resumable, stage, paper, answers, idx]);

  if (!week || paper.length < TOTAL_QUESTIONS) return <SuiteComingSoon />;

  const q = paper[idx];

  function start() {
    setRestoredPaper(null);
    store.clear();
    setAnswers(new Array(paper.length).fill(null));
    setIdx(0);
    setPicked(null);
    setStage("sitting");
  }

  function resumeSitting() {
    const s = store.saved;
    setResumeHandled(true);
    if (!s || s.paper.length < TOTAL_QUESTIONS) return;
    setRestoredPaper(s.paper);
    setAnswers(s.answers);
    setIdx(s.idx);
    setPicked(null);
    setStage("sitting");
  }

  function discardSitting() {
    setResumeHandled(true);
    store.clear();
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
      // The sitting is over and its score is banked on the server; the
      // local snapshot has nothing left to protect.
      store.clear();
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
    // "At least one spoken item" was too weak: speak once, fail it, then type
    // the other four and the oral half still counts. The spoken items have to
    // carry the pass on their own.
    const spokenAtAll = results.filter((r) => !r.typed).length >= oralPassMin(results.length);
    const oralCounts = deviceFailed || spokenAtAll;
    // The count AND the reserved draw — oralHalfPassed() holds both, and the
    // flag it reads is set by buildOral(), which owns the reservation. The
    // alternative was a copy of CARRIES_AUTHORITY here, and a copied rule is a
    // rule that stops being the one that ships.
    const ok = writtenOk && (results.length === 0 || (oralCounts && oralHalfPassed(results)));
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
    // A retake draws a new paper on purpose (see the cooldown copy), so the
    // previous sitting must not be offered back on the intro screen.
    setRestoredPaper(null);
    setResumeHandled(true);
    store.clear();
    setAttempt((a) => a + 1);
    setStage("intro");
  }

  if (stage === "intro") {
    return (
      <div className="mx-auto max-w-2xl">
        {/* Offered even during the retake cooldown, as long as the sitting
            began after the failure that started it (`overtaken` above): that
            is not a new attempt, it is the one already under way, and
            blocking it would make the cooldown punish the interruption. */}
        {resumable && store.saved && (
          <ResumeBanner
            detail={`Bài thi đang dở — tiếp tục từ câu ${store.saved.idx + 1}/${store.saved.paper.length}. Các câu đã trả lời vẫn được giữ. Bài dở chỉ làm tiếp được trong ${CHECKPOINT_RESUME_WINDOW_MIN / 60} giờ.`}
            onResume={resumeSitting}
            onRestart={discardSitting}
          />
        )}
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
            <p>
              Nên làm một mạch. Nếu bị ngắt giữa phần trắc nghiệm, bạn làm tiếp được bài đang dở
              trong vòng <strong>{CHECKPOINT_RESUME_WINDOW_MIN / 60} giờ</strong>; quá thời gian đó
              là một đề mới.
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
    const oralOk = oralHalfPassed(oralResults);
    // Missed the reserved draw while clearing the count — the one case where
    // the tally on screen looks like a pass and is not, so it gets its own
    // sentence instead of "you need N of 5".
    const missedReserved = oralResults.some((r) => r.item.reserved && !r.passed);
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
                ? missedReserved
                  ? `Phần viết đã đạt, nhưng câu về an toàn / thẩm quyền ở phần nói chưa đạt. Câu đó bắt buộc phải đúng: nó là câu bạn sẽ phải nói khi không được tự quyết. Xem câu mẫu bên dưới, luyện ở mục Nói rồi thi lại.`
                  : `Phần viết đã đạt, nhưng phần nói mới ${oralPassed}/${oralResults.length} câu — cần ${oralPassMin(oralResults.length)}. Xem câu mẫu bên dưới, luyện ở mục Nói rồi thi lại.`
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
                      {r.item.reserved && (
                        <span className="ml-2 text-[10px] uppercase tracking-[0.2em] text-primary">
                          · bắt buộc đúng
                        </span>
                      )}
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
            <div className="mt-4 flex flex-wrap items-center gap-3">
              <button
                onClick={() => speak(q.audio, { role: "guest", rate: listeningRateForWeek(week!) })}
                className="border border-primary px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-primary hover:bg-primary/10"
              >
                🔊 Nghe
              </button>
              <VoiceButton role="guest" />
            </div>
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
