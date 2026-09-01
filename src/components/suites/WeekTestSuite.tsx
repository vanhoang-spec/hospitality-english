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
  CHECKPOINT_ORAL_PASS_MIN,
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
import { useLastFailedCheckpoint, useMarkCheckpointPassed } from "@/lib/week-access";
import { SuiteComingSoon } from "./SuiteComingSoon";

type Question =
  | {
      kind: "vocab";
      key: string;
      prompt: string;
      options: string[];
      correctIdx: number;
      note: string;
    }
  | {
      kind: "grammar";
      key: string;
      prompt: string;
      options: string[];
      correctIdx: number;
      note: string;
    }
  | {
      kind: "listening";
      key: string;
      audio: string;
      options: string[];
      correctIdx: number;
      note: string;
      /** "lời khách" / "lời đồng nghiệp" / "lời cấp trên" — a game round whose
       *  prompt is a manager's must not be introduced as a guest's. */
      audioWho: string;
    }
  | {
      kind: "reading";
      key: string;
      passage: string;
      prompt: string;
      options: string[];
      correctIdx: number;
      note: string;
    };

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

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

/**
 * Builds a 20-question mixed paper drawn from EVERY week in the
 * checkpoint's phase (see weeksInPhase), not just the checkpoint week
 * itself — the point of the test is to assess the phase as a whole.
 * Vocabulary additionally pulls the checkpoint week's `reviewWords`
 * recycling pool, same as before.
 *
 * Fixed mix (MIX): 8 vocabulary, 4 grammar, 4 listening, 4 reading.
 */
function buildPaper(dep: string, week: string): Question[] {
  const content = getWeekContent(dep, week);
  if (!content) return [];

  const phaseWeeks = weeksInPhase(week);
  const phaseContent = phaseWeeks
    .map((w) => getWeekContent(dep, String(w)))
    .filter((c): c is NonNullable<typeof c> => c !== null);
  const phaseLessons = phaseContent.flatMap((c) => c.lessons);

  const weekVocab = phaseLessons.flatMap((l) => l.vocabulary);
  const reviewVocab = resolveReviewVocab(dep, content.reviewWords ?? []);
  // Prefer the recycled phase vocabulary — a checkpoint should look back,
  // not merely re-test the week it sits in.
  const pool: VocabItem[] = [...reviewVocab, ...weekVocab];
  const byWord = new Map(pool.map((v) => [v.word, v]));
  const unique = [...byWord.values()];
  if (unique.length < MIX.vocab) return [];

  // The line above used to be `shuffle(unique).slice(0, MIX.vocab)`, which
  // gave the recycled words no preference whatsoever — putting reviewVocab
  // first in `pool` decides nothing once the whole array is shuffled. The
  // comment described an intent the code never carried out. Spacing is the
  // one thing a checkpoint measures that a lesson cannot, so at least half
  // the vocabulary block now comes from weeks the student saw earlier, and
  // the rest is topped up from the phase at large.
  const reviewFirst = shuffle(unique.filter((v) => reviewVocab.some((r) => r.word === v.word)));
  const restPool = shuffle(unique.filter((v) => !reviewFirst.includes(v)));
  const halfFromReview = Math.min(reviewFirst.length, Math.ceil(MIX.vocab / 2));
  const vocabPicks = shuffle([
    ...reviewFirst.slice(0, halfFromReview),
    ...restPool.slice(0, MIX.vocab - halfFromReview),
  ]);

  const vocabQs: Question[] = vocabPicks.slice(0, MIX.vocab).map((v, i) => {
    const distractors = shuffle(unique.filter((o) => o.word !== v.word)).slice(0, 3);
    if (i % 2 === 0) {
      const options = shuffle([v.definition, ...distractors.map((d) => d.definition)]);
      return {
        kind: "vocab" as const,
        key: `v:${v.word}`,
        prompt: `Nghĩa của "${v.word}" là gì?`,
        options,
        correctIdx: options.indexOf(v.definition),
        note: `${v.word} — ${v.definition}. Ví dụ: "${v.context}"`,
      };
    }
    const options = shuffle([v.word, ...distractors.map((d) => d.word)]);
    return {
      kind: "vocab" as const,
      key: `v:${v.word}`,
      prompt: `Từ tiếng Anh nào có nghĩa: "${v.definition}"?`,
      options,
      correctIdx: options.indexOf(v.word),
      note: `${v.word} — ${v.definition}. Ví dụ: "${v.context}"`,
    };
  });

  const grammarPool = shuffle(
    phaseLessons.flatMap((l) => l.grammar.map((g) => ({ ...g, lessonId: l.lessonId }))),
  );
  const grammarQs: Question[] = grammarPool.slice(0, MIX.grammar).map((g) => {
    // Nhiễu lấy từ vế `polite` của cặp khác, KHÔNG lấy `g.rude` — câu đó đang
    // được trích nguyên văn trong đề nên nó là một loại trừ miễn phí, và vế
    // polite luôn dài hơn vế rude nên "chọn câu dài nhất" thắng 85,8%.
    //
    // Bịt xong lỗ đó thì lộ lỗ anh em: đề trích nguyên văn `rude`, đáp án đúng
    // là bản MỞ RỘNG của chính câu ấy ("Room number what?" → "What is your
    // room number?"), còn nhiễu bốc ngẫu nhiên từ cả phase nên chẳng dính chữ
    // nào. "Chọn câu trùng nhiều từ nhất với đề" thắng 73% ở Phase 0 và 81% ở
    // Phase 1 — trên mốc qua môn 70%, và không cần biết ngữ pháp. Nay nhiễu
    // được chọn theo ĐỘ TRÙNG CAO NHẤT với đề, nên độ trùng hết phân biệt
    // được và học viên buộc phải đọc chỗ SỬA.
    const bag = (s: string) =>
      new Set(
        s
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, " ")
          .split(/\s+/)
          .filter((w) => w.length > 2),
      );
    const stem = bag(g.rude);
    const share = (s: string) => [...bag(s)].filter((w) => stem.has(w)).length;
    // Nhiễu lấy theo ĐỘ TRÙNG CAO NHẤT với đề. Không cào bằng được hoàn toàn —
    // đáp án đúng là bản SỬA của chính câu trong đề nên nó chia sẻ gần hết từ
    // nội dung, không câu nào trong phase khớp nổi — nhưng đưa mẹo này từ 73%
    // xuống ~60% hiệu dụng ở Phase 0, dưới mốc 70%. Phase 1 còn ~73%: bịt hẳn
    // cần soạn tay hai bản-sửa-vẫn-sai cho mỗi cặp, chưa làm.
    // Đã thử và BÁC BỎ: gộp theo tuần (82–86%) và gộp theo bài (không đủ ứng
    // viên — phần lớn bài chỉ có 2 cặp ngữ pháp).
    // Một nhiễu là nearMiss soạn tay khi có — bản "sửa-trông-đúng-mà-vẫn-sai"
    // của CHÍNH câu trong đề, nên nó trùng từ ngang đáp án và mẹo trùng-từ
    // chết hẳn ở cặp đó. Nhiễu còn lại giữ luật trùng-cao-nhất.
    // Và rồi lỗ thứ ba, tìm ra một vòng sau: cái câu trùng nhiều từ nhất với
    // đề THƯỜNG LÀ MỘT ĐÁP ÁN ĐÚNG KHÁC. "Spell please." lấy được cả "How do
    // you spell that?" lẫn "Could you spell that, please?"; "Wait." lấy được
    // cả "One moment, please, sir." lẫn "Please wait here, madam." Đo trên
    // 20.000 đề: 27,4% số đề có một câu như thế Ở NGAY KHỐI NÀY, khối bốn câu
    // với sàn riêng 50%. Cùng phép lọc đã dùng cho khối nghe: bỏ honorific ra,
    // rồi loại mọi ứng viên mà tập từ nội dung của nó nằm trong đáp án hoặc
    // chứa đáp án. Loại luôn các cặp CÙNG BÀI — hai vế polite của một bài dạy
    // hai nửa của cùng một việc, nên câu này thường trả lời được đề của câu kia.
    const HON = new Set(["sir", "madam", "maam", "please"]);
    const core = (s: string) => new Set([...bag(s)].filter((w) => !HON.has(w)));
    const keyCore = core(g.polite);
    const saysTheSame = (s: string) => {
      const c = core(s);
      if (c.size === 0 || keyCore.size === 0) return true;
      return [...c].every((w) => keyCore.has(w)) || [...keyCore].every((w) => c.has(w));
    };
    const others = grammarPool
      .filter((o) => o.polite !== g.polite && o.lessonId !== g.lessonId && !saysTheSame(o.polite))
      .map((o) => ({ o, score: share(o.polite) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, g.nearMiss ? 1 : 2)
      .map((x) => x.o.polite);
    const options = shuffle([g.polite, ...(g.nearMiss ? [g.nearMiss] : []), ...others]);
    return {
      kind: "grammar" as const,
      key: `g:${g.rude}`,
      // "cách xử lý chuẩn 5 sao" gọi một câu thiếu động từ là lỗi dịch vụ.
      // Vế rude là LỖI NGỮ PHÁP của người học, không phải cách hành xử.
      prompt: `Câu nào là cách nói đúng và lịch sự thay cho "${g.rude}"?`,
      options,
      correctIdx: options.indexOf(g.polite),
      note: g.rule,
    };
  });

  // The listening block used to be `gamePool.slice(0, MIX.listening)` — the
  // same rounds as the arcade, with the same three options word for word. A
  // learner who had played the arcade had already seen every listening answer,
  // so the 50% per-block floor — added precisely to stop somebody passing
  // "having understood nothing they heard" — was measuring arcade memory.
  // Three audit reports found it independently.
  //
  // It now draws from the SPEAKING items: the audio is the guest's line and
  // the options are staff replies. Different bank, and it tests the thing the
  // block is named after — you have to understand what was said to pick the
  // reply that answers it.
  const speakPool = shuffle(phaseLessons.flatMap((l) => l.speaking));
  // Sir/madam is a coin-flip tag, not content: two replies that differ only by
  // it are the same reply. The speaking grader already treats it that way.
  const HONORIFIC_WORDS = new Set(["sir", "madam", "maam"]);
  const bagOf = (s: string) =>
    new Set(
      s
        .toLowerCase()
        .replace(/[^a-z0-9 ]/g, " ")
        .split(/\s+/)
        .filter((w) => w.length > 2),
    );
  const listeningQs: Question[] = speakPool.slice(0, MIX.listening).map((s) => {
    // Distractors are the replies that share the most words with the correct
    // one, for the same reason the grammar block picks its distractors that
    // way: an unrelated reply is eliminable without hearing anything.
    //
    // But "most words in common" walked straight into the failure mode it was
    // supposed to avoid: the nearest reply in the bank is often ANOTHER RIGHT
    // ANSWER. Four academic reports measured it independently and agreed on
    // the shape — 13.9% of papers in F&B, 30.1% in Guest Relations, 33.5% in
    // Housekeeping, 41.1% in Spa. The worst pairs were containments:
    //
    //     key  "I cannot take cash, sir. Please pay at reception."
    //     lure "Please pay at reception, sir."          <- also correct
    //     key  "The total is seventy thousand dong."
    //     lure "Seventy thousand dong, sir."            <- also correct
    //     key  "It starts at eight o'clock."
    //     lure "It starts at eight, madam."             <- also correct
    //
    // Every reported pair is one content set inside the other, so that is what
    // gets rejected here: strip the honorifics, and if either side's content
    // words are a subset of the other's, the two sentences say the same thing
    // and only one of them can be on the paper. Replies to the SAME guest
    // prompt go too — a different lesson answering the same question is a
    // second right answer by construction.
    const correct = bagOf(s.targetResponse);
    const share = (t: string) => [...bagOf(t)].filter((w) => correct.has(w)).length;
    const content = (t: string) => new Set([...bagOf(t)].filter((w) => !HONORIFIC_WORDS.has(w)));
    const keyContent = content(s.targetResponse);
    const saysTheSame = (t: string) => {
      const c = content(t);
      if (c.size === 0 || keyContent.size === 0) return true;
      const inKey = [...c].every((w) => keyContent.has(w));
      const inLure = [...keyContent].every((w) => c.has(w));
      return inKey || inLure;
    };
    const sameQuestion = new Set(
      speakPool.filter((o) => o.guestPrompt === s.guestPrompt).map((o) => o.targetResponse),
    );
    const others = [
      ...new Set(speakPool.map((o) => o.targetResponse).filter((t) => t !== s.targetResponse)),
    ]
      .filter((t) => !sameQuestion.has(t) && !saysTheSame(t))
      .map((t) => ({ t, score: share(t) }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 2)
      .map((x) => x.t);
    const options = shuffle([s.targetResponse, ...others]);
    return {
      kind: "listening" as const,
      key: `l:${s.guestPrompt}`,
      audio: s.guestPrompt,
      options,
      correctIdx: options.indexOf(s.targetResponse),
      note: `${speakerLabel(s)}: "${s.guestPrompt}"`,
      audioWho: speakerAudioLabel(s),
    };
  });

  const readingPool = shuffle(
    phaseLessons.flatMap((l) => l.reading.questions.map((q) => ({ q, text: l.reading.text }))),
  );
  // Reading options are shuffled here like every other question type. Without
  // this they arrived in authored order, so a week whose answers all sit at A
  // handed the paper away.
  const readingQs: Question[] = readingPool.slice(0, MIX.reading).map(({ q, text }) => {
    const answer = q.options[q.correct];
    const options = shuffle(q.options);
    return {
      kind: "reading" as const,
      key: `r:${q.q}`,
      passage: text,
      prompt: q.q,
      options,
      correctIdx: options.indexOf(answer),
      note: q.explanation ?? "",
    };
  });

  return shuffle([...vocabQs, ...grammarQs, ...listeningQs, ...readingQs]).slice(
    0,
    TOTAL_QUESTIONS,
  );
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
        sourceWeek: c.weekNumber,
      })),
    );
  });
  return shuffle(items).slice(0, CHECKPOINT_ORAL_ITEMS);
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
  onFinish: (results: { item: OralItem; passed: boolean; said: string }[]) => void;
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
  const resultsRef = useRef<{ item: OralItem; passed: boolean; said: string }[]>([]);
  const recogRef = useRef<SpeechRecognition | null>(null);
  const finalRef = useRef("");
  const item = items[idx];

  function commit(spoken: string) {
    const verdict = utterancePassed(
      spoken,
      item.target,
      item.sourceWeek,
      item.requiredTokens,
      item.guestPrompt,
    );
    resultsRef.current = [
      ...resultsRef.current,
      { item, passed: verdict.passed, said: spoken.trim() },
    ];
    if (idx + 1 >= items.length) {
      onFinish(resultsRef.current);
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
          <span className="text-foreground/50">Cần đạt {CHECKPOINT_ORAL_PASS_MIN} câu</span>
        </div>
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
          {!typedMode && (
            <button
              onClick={() => setTypedMode(true)}
              className="text-xs uppercase tracking-[0.2em] text-foreground/60 hover:text-foreground"
            >
              Gõ thay vì nói
            </button>
          )}
        </div>
        {item.tip && (
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
              onClick={() => typed.trim() && commit(typed)}
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
    { item: OralItem; passed: boolean; said: string }[]
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
      if (oral.length < CHECKPOINT_ORAL_ITEMS) finish(pct, tallied, []);
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
    results: { item: OralItem; passed: boolean; said: string }[],
  ) {
    const oralPassed = results.filter((r) => r.passed).length;
    const writtenOk = checkpointPassed(pct, tallied);
    const ok = writtenOk && (results.length === 0 || oralPassed >= CHECKPOINT_ORAL_PASS_MIN);
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
              Sau phần trắc nghiệm là <strong>{CHECKPOINT_ORAL_ITEMS} câu nói</strong> lấy từ khắp
              giai đoạn — cần đạt <strong>{CHECKPOINT_ORAL_PASS_MIN} câu</strong>. Câu mẫu chỉ hiện
              ở phần kết quả. Nếu micro hoặc mạng không dùng được, bạn gõ câu trả lời và vẫn được
              tính.
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
    return <OralStage items={oral} onFinish={(results) => finish(scorePct, tallies, results)} />;
  }

  if (stage === "done") {
    const oralPassed = oralResults.filter((r) => r.passed).length;
    const oralOk = oralResults.length === 0 || oralPassed >= CHECKPOINT_ORAL_PASS_MIN;
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
                ? `Phần viết đã đạt, nhưng phần nói mới ${oralPassed}/${oralResults.length} câu — cần ${CHECKPOINT_ORAL_PASS_MIN}. Xem câu mẫu bên dưới, luyện ở mục Nói rồi thi lại.`
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
              Thiết bị của bạn chưa có giọng đọc tiếng Anh — phần nghe hiểu vẫn được tính điểm nhưng
              không tính vào sàn tối thiểu từng kỹ năng. Hãy dùng Chrome hoặc Edge để luyện nghe đầy
              đủ.
            </p>
          )}
          {oralResults.length > 0 && (
            <div className="mt-6 border-t border-foreground/10 pt-5 text-left">
              <div className="flex items-center justify-between text-[10px] uppercase tracking-[0.25em]">
                <span className="text-foreground/60">Phần nói</span>
                <span className={oralOk ? "text-foreground/60" : "text-primary"}>
                  {oralPassed}/{oralResults.length} · cần {CHECKPOINT_ORAL_PASS_MIN}
                </span>
              </div>
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
                    {r.said && <div className="mt-0.5 text-foreground/50">Bạn nói: "{r.said}"</div>}
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
