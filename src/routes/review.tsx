import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "@/lib/auth";
import { useAcademy } from "@/lib/academy-store";
import {
  applyReviewResult,
  fetchDueItems,
  resolveReviewItem,
  type ResolvedReviewItem,
} from "@/lib/review";
import { speakerLabel } from "@/lib/content/week-content";
import { dedupeTranscript, speakEN } from "@/lib/speech";
import { utterancePassedAny } from "@/lib/speaking-score";
import { acceptedAnswers } from "@/lib/speaking-alternates";
import { useScopedAttemptLogger } from "@/lib/telemetry";

export const Route = createFileRoute("/review")({
  head: () => ({ meta: [{ title: "Ôn tập hằng ngày — Embassy Hospitality" }] }),
  component: ReviewPage,
});

function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
}

function normalizeSentence(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^\w'\s]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function ReviewPage() {
  const { session, loading } = useSession();
  const userId = session?.user.id;

  const itemsQuery = useQuery({
    queryKey: ["review-due", userId],
    queryFn: async () => {
      const rows = await fetchDueItems(userId as string, 20);
      return rows.map(resolveReviewItem).filter((r): r is ResolvedReviewItem => r !== null);
    },
    enabled: !!userId,
    staleTime: 0,
    gcTime: 0,
    refetchOnMount: "always",
    refetchOnWindowFocus: false,
  });

  if (loading || itemsQuery.isLoading) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <p className="text-sm text-foreground/70">Đang tải phiên ôn tập…</p>
      </main>
    );
  }

  const items = itemsQuery.data ?? [];
  if (items.length === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-24 text-center">
        <div className="text-4xl">🌤️</div>
        <h1 className="font-display mt-4 text-3xl text-foreground">Không có mục nào đến hạn ôn</h1>
        <p className="mt-2 text-sm text-foreground/70">
          Hoàn thành thêm bài học mới để hệ thống lên lịch ôn tập cho bạn — các mục đã học sẽ tự
          quay lại đây đúng thời điểm dễ quên nhất.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
        >
          Về sảnh chính
        </Link>
      </main>
    );
  }

  return <ReviewSession items={items} userId={userId} />;
}

function ReviewSession({
  items,
  userId,
}: {
  items: ResolvedReviewItem[];
  userId: string | undefined;
}) {
  const queryClient = useQueryClient();
  const { awardStars, markLearnedToday } = useAcademy();
  // Pinned for the whole session — a background refetch of the due-items
  // query (e.g. on reconnect) must not swap items out from under an
  // in-progress session.
  const [sessionItems] = useState(items);
  const [idx, setIdx] = useState(0);
  const [answered, setAnswered] = useState<null | boolean>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const finishedRef = useRef(false);
  const logAttempt = useScopedAttemptLogger();

  const item = sessionItems[idx];

  function handleResult(correct: boolean) {
    setAnswered(correct);
    // The review session is where spacing is actually tested, so HR's
    // "did they keep up with the review?" column needs these events too.
    logAttempt(
      {
        dep: item.row.department_id,
        week: item.row.week_number,
        suite: "review",
      },
      item.row.item_key,
      correct,
    );
    if (correct) {
      setCorrectCount((c) => c + 1);
      awardStars(1);
    }
    applyReviewResult(item.row, correct).catch(() => {});
  }

  function next() {
    if (idx + 1 >= sessionItems.length) {
      if (!finishedRef.current) {
        finishedRef.current = true;
        markLearnedToday();
        queryClient.invalidateQueries({ queryKey: ["review-due-count", userId] });
      }
      setDone(true);
      return;
    }
    setIdx((i) => i + 1);
    setAnswered(null);
  }

  if (done) {
    return (
      <main className="mx-auto max-w-xl px-6 py-24 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="border border-primary bg-card p-8 shadow-xl"
        >
          <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
            Phiên ôn tập hoàn tất
          </div>
          <div className="font-display mt-3 text-5xl text-primary">
            {correctCount}/{sessionItems.length}
          </div>
          <p className="mt-3 text-sm text-foreground/75">
            🔥 Chuỗi ngày học của bạn đã được cộng. Mục trả lời đúng sẽ quay lại sau quãng dài hơn;
            mục sai sẽ xuất hiện lại ngày mai.
          </p>
          <Link
            to="/"
            className="mt-6 inline-block bg-primary px-6 py-2.5 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
          >
            Về sảnh chính
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10 md:py-14">
      <div className="flex items-center gap-3">
        <span className="h-px w-10 bg-primary" />
        <span className="text-xs uppercase tracking-[0.3em] text-primary">Ôn tập hằng ngày</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-[10px] uppercase tracking-[0.25em] text-foreground/60">
        <span>
          Mục {idx + 1}/{sessionItems.length} · {item.row.department_id} tuần {item.row.week_number}
        </span>
        <span className="text-primary">{correctCount} đúng</span>
      </div>
      <div className="mt-2 h-1 w-full bg-primary/15">
        <div
          className="h-1 bg-primary transition-all"
          style={{ width: `${(idx / sessionItems.length) * 100}%` }}
        />
      </div>

      <motion.div
        key={item.row.item_key}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-6"
      >
        {item.kind === "vocab" && (
          <VocabReview item={item} answered={answered} onResult={handleResult} />
        )}
        {item.kind === "grammar" && (
          <GrammarReview item={item} answered={answered} onResult={handleResult} />
        )}
        {item.kind === "speaking" && (
          <SpeakingReview item={item} answered={answered} onResult={handleResult} />
        )}
      </motion.div>

      {answered !== null && (
        <div className="mt-5 flex items-center justify-between">
          <span
            className={`text-xs uppercase tracking-[0.2em] ${answered ? "text-primary" : "text-destructive"}`}
          >
            {answered ? "Chính xác! +1 ⭐" : "Chưa đúng — sẽ ôn lại vào ngày mai"}
          </span>
          <button
            onClick={next}
            className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl"
          >
            {idx + 1 >= sessionItems.length ? "Kết thúc phiên" : "Mục tiếp →"}
          </button>
        </div>
      )}
    </main>
  );
}

type ReviewCardProps<K extends ResolvedReviewItem["kind"]> = {
  item: Extract<ResolvedReviewItem, { kind: K }>;
  answered: null | boolean;
  onResult: (correct: boolean) => void;
};

function VocabReview({ item, answered, onResult }: ReviewCardProps<"vocab">) {
  const { vocab, weekVocab } = item;
  const question = useMemo(() => {
    const distractors = shuffle(weekVocab.filter((v) => v.word !== vocab.word)).slice(0, 3);
    if (Math.random() < 0.5) {
      const options = shuffle([vocab.definition, ...distractors.map((d) => d.definition)]);
      return {
        prompt: `Nghĩa của "${vocab.word}" là gì?`,
        speak: vocab.word,
        options,
        correct: vocab.definition,
      };
    }
    const options = shuffle([vocab.word, ...distractors.map((d) => d.word)]);
    return {
      prompt: `Từ tiếng Anh nào có nghĩa: "${vocab.definition}"?`,
      options,
      correct: vocab.word,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item.row.item_key]);
  const [picked, setPicked] = useState<string | null>(null);

  return (
    <div className="border border-primary/30 bg-card p-6 shadow-xl">
      <div className="flex items-center justify-between gap-3">
        <p className="font-display text-xl text-foreground">{question.prompt}</p>
        {question.speak && (
          <button
            onClick={() => speakEN(question.speak!, 0.85)}
            className="shrink-0 border border-primary/40 px-2 py-1 text-[10px] uppercase tracking-[0.2em] text-primary hover:border-primary"
          >
            🔊
          </button>
        )}
      </div>
      <div className="mt-4 space-y-2">
        {question.options.map((opt) => {
          const isPicked = picked === opt;
          const showCorrect = answered !== null && opt === question.correct;
          const showWrong = answered !== null && isPicked && opt !== question.correct;
          return (
            <button
              key={opt}
              disabled={answered !== null}
              onClick={() => setPicked(opt)}
              className={`block w-full border px-4 py-2.5 text-left text-sm transition-all ${
                showCorrect
                  ? "border-primary bg-primary/15"
                  : showWrong
                    ? "border-destructive bg-destructive/15"
                    : isPicked
                      ? "border-primary"
                      : "border-primary/20 hover:border-primary/60"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {answered === null && (
        <div className="mt-5 flex justify-end">
          <button
            onClick={() => onResult(picked === question.correct)}
            disabled={picked === null}
            className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl disabled:opacity-40"
          >
            Trả lời
          </button>
        </div>
      )}
      {answered !== null && (
        <p className="mt-4 border-l-2 border-primary/60 pl-3 text-xs italic text-foreground/70">
          💡 {vocab.word} — {vocab.definition} · "{vocab.context}"
        </p>
      )}
    </div>
  );
}

function GrammarReview({ item, answered, onResult }: ReviewCardProps<"grammar">) {
  const { grammar } = item;
  const chips = useMemo(
    () =>
      grammar.polite
        .replace(/[.!?,]/g, "")
        .split(/\s+/)
        .filter(Boolean),
    [grammar.polite],
  );
  const [bank, setBank] = useState<string[]>(() => shuffle(chips));
  const [tray, setTray] = useState<string[]>([]);

  function toTray(i: number) {
    setTray((t) => [...t, bank[i]]);
    setBank((b) => b.filter((_, j) => j !== i));
  }
  function toBank(i: number) {
    setBank((b) => [...b, tray[i]]);
    setTray((t) => t.filter((_, j) => j !== i));
  }

  return (
    <div className="border border-primary/30 bg-card p-6 shadow-xl">
      <p className="text-sm text-foreground/70">Ghép lại câu lịch sự thay cho câu cộc lốc:</p>
      <p className="mt-2 font-display text-xl line-through decoration-destructive/60">
        "{grammar.rude}"
      </p>
      <div className="mt-4 min-h-[52px] border border-primary/40 bg-background/40 p-3">
        <div className="flex flex-wrap gap-2">
          {tray.length === 0 && (
            <span className="text-xs italic text-foreground/40">
              Bấm các từ bên dưới theo đúng thứ tự…
            </span>
          )}
          {tray.map((w, i) => (
            <button
              key={`${w}-${i}`}
              disabled={answered !== null}
              onClick={() => toBank(i)}
              className="border border-primary bg-primary/15 px-3 py-1.5 font-display text-sm text-foreground"
            >
              {w}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 flex flex-wrap gap-2">
        {bank.map((w, i) => (
          <button
            key={`${w}-${i}`}
            disabled={answered !== null}
            onClick={() => toTray(i)}
            className="border border-primary/40 bg-background/60 px-3 py-1.5 font-display text-sm text-foreground/85 hover:border-primary"
          >
            {w}
          </button>
        ))}
      </div>
      {answered === null && (
        <div className="mt-5 flex justify-end">
          <button
            onClick={() =>
              onResult(normalizeSentence(tray.join(" ")) === normalizeSentence(grammar.polite))
            }
            disabled={bank.length > 0}
            className="bg-primary px-6 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground shadow-xl disabled:opacity-40"
          >
            Kiểm tra
          </button>
        </div>
      )}
      {answered !== null && (
        <p className="mt-4 border-l-2 border-primary/60 pl-3 text-xs italic text-foreground/70">
          💡 "{grammar.polite}" — {grammar.rule}
        </p>
      )}
    </div>
  );
}

/** The spaced-review speaking card makes the learner SAY the reply.
 *
 *  It used to be "Chọn câu phản hồi chuẩn 5 sao" — three options, pick one.
 *  The course names speaking as its outcome, and the only encounter with a
 *  sentence at a long gap (up to sixty days) was recognition: four academic
 *  reviews in one round said so. The card now hides the model, records the
 *  answer, and grades it with the same utterancePassed the drill and the
 *  checkpoint use, at the threshold of the week the sentence came from. A
 *  device that cannot hear gets a text box through the same grader rather
 *  than a multiple choice. */
function SpeakingReview({ item, answered, onResult }: ReviewCardProps<"speaking">) {
  const { speaking } = item;
  const week = item.row.week_number;
  const canHear =
    typeof window !== "undefined" && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
  const [deviceFailed, setDeviceFailed] = useState(!canHear);
  const [recording, setRecording] = useState(false);
  const [said, setSaid] = useState("");
  const [typed, setTyped] = useState("");
  const [note, setNote] = useState<string | null>(null);
  const finalRef = useRef("");
  const recogRef = useRef<SpeechRecognition | null>(null);

  function grade(text: string) {
    const cleaned = text.trim();
    if (!cleaned) return;
    setSaid(cleaned);
    onResult(
      utterancePassedAny(
        cleaned,
        acceptedAnswers(
          item.row.department_id,
          week,
          speaking.guestPrompt,
          speaking.targetResponse,
          speaking.requiredTokens,
          speaking.speakerRole,
        ),
        week,
        speaking.guestPrompt,
      ).passed,
    );
  }

  function listen() {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) {
      setDeviceFailed(true);
      return;
    }
    finalRef.current = "";
    setSaid("");
    setNote(null);
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
    r.onerror = (e: SpeechRecognitionErrorEvent) => {
      if (e.error === "no-speech" || e.error === "aborted") {
        setNote("Chưa nghe được gì — bấm micro và nói lại.");
        return;
      }
      if (e.error === "not-allowed") {
        setNote("Cần cho phép micro trong trình duyệt để ôn phần nói.");
        return;
      }
      setDeviceFailed(true);
    };
    r.onend = () => {
      setRecording(false);
      const cleaned = dedupeTranscript(finalRef.current.trim());
      if (cleaned) grade(cleaned);
    };
    try {
      r.start();
      recogRef.current = r;
      setRecording(true);
    } catch {
      setDeviceFailed(true);
    }
  }

  return (
    <div className="border border-primary/30 bg-card p-6 shadow-xl">
      <div className="text-[10px] uppercase tracking-[0.3em] text-primary">
        {speakerLabel(speaking)}
      </div>
      <p className="mt-2 font-display text-xl text-foreground">"{speaking.guestPrompt}"</p>
      <button
        onClick={() => speakEN(speaking.guestPrompt, 0.9)}
        className="mt-3 border border-primary/40 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-primary hover:border-primary"
      >
        🔊 Nghe
      </button>
      <p className="mt-4 text-sm text-foreground/70">Nói câu trả lời của bạn (câu mẫu đang ẩn):</p>
      {answered === null && !deviceFailed && (
        <div className="mt-3 flex items-center gap-3">
          <button
            onClick={() => (recording ? recogRef.current?.stop() : listen())}
            className={`border px-5 py-2.5 text-xs uppercase tracking-[0.2em] ${
              recording
                ? "border-primary bg-primary text-primary-foreground"
                : "border-primary text-primary hover:bg-primary/10"
            }`}
          >
            {recording ? "■ Dừng" : "🎙 Bấm để nói"}
          </button>
          {said && <span className="text-sm italic text-foreground/70">{said}</span>}
        </div>
      )}
      {answered === null && deviceFailed && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            grade(typed);
          }}
          className="mt-3 flex gap-2"
        >
          <input
            value={typed}
            onChange={(e) => setTyped(e.target.value)}
            placeholder="Thiết bị không nghe được — gõ câu trả lời bằng tiếng Anh…"
            className="flex-1 border border-primary/30 bg-background/60 px-3 py-2 text-sm"
            autoCapitalize="off"
            autoCorrect="off"
            spellCheck={false}
          />
          <button
            type="submit"
            className="bg-primary px-5 py-2 text-xs uppercase tracking-[0.2em] text-primary-foreground"
          >
            Chấm
          </button>
        </form>
      )}
      {note && answered === null && <p className="mt-2 text-xs text-destructive">{note}</p>}
      {answered !== null && (
        <div className="mt-4 space-y-2 text-sm">
          {said && (
            <p className="text-foreground/70">
              Bạn nói: <span className="italic">"{said}"</span>
            </p>
          )}
          <p className={answered ? "text-primary" : "text-destructive"}>
            {answered ? "Đạt." : "Chưa đạt."} Câu mẫu: "{speaking.targetResponse}"
          </p>
          <p className="border-l-2 border-primary/60 pl-3 text-xs italic text-foreground/70">
            💡 {speaking.helpTip}
          </p>
        </div>
      )}
    </div>
  );
}
