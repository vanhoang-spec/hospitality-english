// ============================================================
// The checkpoint paper builder.
//
// This lived inside WeekTestSuite.tsx, and that is how it shipped broken:
// a refactor moved the shared normalisation helpers BELOW the grammar block
// that calls them, so every checkpoint threw
//   ReferenceError: Cannot access 'sameAnswer' before initialization
// on all six departments at weeks 6, 14, 22, 30 and 40 — every gate to the
// next phase in the course. Nothing caught it: qa-full's suite layer walked
// the content and re-implemented the selection rules rather than calling the
// builder, and so did every measurement script written to tune them.
//
// It is a pure function of the content, so it belongs here where a script can
// call THE REAL ONE. qa-full now does exactly that (layer T5b).
// ============================================================
import { PROMISE_VERBS } from "@/lib/content/phase0";
import {
  getWeekContent,
  resolveReviewVocab,
  speakerAudioLabel,
  speakerLabel,
  type VocabItem,
} from "@/lib/content/week-content";
import {
  CHECKPOINT_MIX as MIX,
  CHECKPOINT_TOTAL_QUESTIONS as TOTAL_QUESTIONS,
  listeningRateForWeek,
  phaseOfWeek,
  weeksInPhase,
} from "@/lib/phases";

export type Question =
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

/** Fisher-Yates, non-mutating. */
export function shuffle<T>(a: T[]): T[] {
  const c = [...a];
  for (let i = c.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [c[i], c[j]] = [c[j], c[i]];
  }
  return c;
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
export function buildPaper(dep: string, week: string): Question[] {
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
  //
  // "At least half" turned out to be exactly half, every time, because
  // `Math.ceil(MIX.vocab / 2)` was a CAP on the recycled half rather than a
  // floor. Measured on 9,000 questions: the checkpoint week supplied 50.0% of
  // the vocabulary block on its own and the seven weeks it is meant to
  // certify supplied about 7% each. The cap belongs on the current week, not
  // on the review.
  const reviewFirst = shuffle(unique.filter((v) => reviewVocab.some((r) => r.word === v.word)));
  const restPool = shuffle(unique.filter((v) => !reviewFirst.includes(v)));
  // …and the floor on the current week was 2 of 6, which is 33.3% of the
  // certifying block spent on words the learner met once, in the week they
  // are being certified ON. Week 22 supplies about 13% of the phase's
  // headwords, so it took two and a half times its share. `reviewFirst` is 84
  // entries deep at a checkpoint, so `Math.max(6 - 84, 2)` was never anything
  // but 2. One keeps the current week represented without letting it crowd
  // out the seven weeks the paper exists to measure.
  const fromRest = Math.min(restPool.length, Math.max(MIX.vocab - reviewFirst.length, 1));
  const vocabPicks = shuffle([
    ...reviewFirst.slice(0, MIX.vocab - fromRest),
    ...restPool.slice(0, fromRest),
  ]);

  const vocabQs: Question[] = vocabPicks.slice(0, MIX.vocab).map((v, i) => {
    // Unique by WORD is not enough: the paper asks for a meaning, so two cards
    // that share a Vietnamese gloss print the same option twice and mark one
    // of them wrong. Back Office taught Invoice and Bill as "Hóa đơn" three
    // weeks apart and week 6 asked a learner to choose between them.
    // Nested glosses are as unanswerable as identical ones when the question
    // asks for a meaning: "Hold on" keyed "Xin giữ máy" printed beside "Giữ
    // máy", the gloss of "Hold the line", and both are right. Rejected here
    // rather than in the content gate, because most nested pairs in the course
    // are legitimate distinct words ("Budget" / "Event budget") and only
    // collide when they land on one paper.
    const glossKey = (s: string) =>
      ` ${s
        .toLowerCase()
        .replace(/[^\p{L}\p{N} ]/gu, " ")
        .replace(/\s+/g, " ")
        .trim()} `;
    const vGloss = glossKey(v.definition);
    const nested = (a: string, b: string) => a.includes(b) || b.includes(a);
    // Compared against the KEY only, so two distractors could still nest in
    // each other: F&B printed "Lạnh" beside "Đá lạnh", and "Rót" beside "Rót
    // thêm, châm đầy", whenever the key was a third card. Same shape as the
    // pairwise rule the listening block already runs on its distractors.
    const distractors: VocabItem[] = [];
    for (const o of shuffle(unique)) {
      if (distractors.length >= 3) break;
      if (o.word === v.word || o.definition === v.definition) continue;
      const g = glossKey(o.definition);
      if (nested(vGloss, g)) continue;
      if (distractors.some((d) => nested(glossKey(d.definition), g))) continue;
      distractors.push(o);
    }
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

  const wordsOf = (t: string) => t.trim().split(/\s+/).filter(Boolean).length;

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

  // Politeness scaffolding and grammatical glue. Two replies that differ only
  // in these say the same thing to a guest: "Certainly, madam. One moment."
  // and "One moment, please, sir." are one answer wearing two hats, and a
  // paper that keys one and marks the other wrong is failing the learner for
  // knowing the course.
  const SCAFFOLD = new Set([
    // A discourse connector, not content: leaving it in kept "Then I sign
    // the form." apart from "I sign the form before lunch.", and the second
    // was offered as a distractor for the first on 3.7% of papers.
    "then",
    "one",
    "please",
    "certainly",
    "course",
    "yes",
    "thank",
    "sorry",
    "excuse",
    "the",
    "are",
    "you",
    "your",
    "will",
    "and",
    "for",
    "this",
    "that",
    "with",
    "have",
    "has",
    "may",
    "can",
    "could",
    "would",
    // Intensifiers and the bare time-marker carry no content a learner could
    // hear the difference of. Leaving them in kept "I will check now." apart
    // from "I am very sorry. I will help now." — two correct answers to the
    // same complaint, measured on 45.2% of Spa papers.
    "very",
    "quite",
    "really",
    "right",
    "all",
    "now",
  ]);
  // Words the curriculum itself treats as interchangeable in an answer. A spa
  // that CLOSES at eight also FINISHES at eight; a lounge that is READY is
  // also FREE. Four reviews hit pairs from this list.
  const SYNONYM: Record<string, string> = {
    offer: "arrange",
    offers: "arrange",
    arranges: "arrange",
    finish: "close",
    finishes: "close",
    closes: "close",
    closed: "close",
    start: "open",
    starts: "open",
    opens: "open",
    begin: "open",
    begins: "open",
    free: "ready",
    available: "ready",
    tell: "say",
    says: "say",
    said: "say",
    repeat: "say",
    again: "say",
    guests: "guest",
    rooms: "room",
    tables: "table",
  };
  // The content of an utterance: strip the honorific, strip the scaffolding,
  // fold the synonyms. What is left is the thing the sentence actually says.
  const coreOf = (s: string) =>
    new Set(
      [...bagOf(s)]
        .filter((w) => !HONORIFIC_WORDS.has(w) && !SCAFFOLD.has(w))
        .map((w) => SYNONYM[w] ?? w),
    );
  // Same content, or one inside the other, means only one of them belongs on
  // the paper. Empty on either side counts as the same — a reply made only of
  // scaffolding cannot be told apart from any other by its content.
  const sameAnswer = (a: string, b: string) => {
    let x = coreOf(a);
    let y = coreOf(b);
    // A sentence whose content strips to nothing — a spelled-out name, a bare
    // "Certainly, madam." — is not the same as every other sentence. Fall back
    // to the honorific-only comparison, which still catches containment.
    if (x.size === 0 || y.size === 0) {
      x = new Set([...bagOf(a)].filter((w) => !HONORIFIC_WORDS.has(w)));
      y = new Set([...bagOf(b)].filter((w) => !HONORIFIC_WORDS.has(w)));
      if (x.size === 0 || y.size === 0) return false;
    }
    return [...x].every((w) => y.has(w)) || [...y].every((w) => x.has(w));
  };

  /** An apology plus a promise is ONE answer, whichever verb the promise
   *  names. The audio of a listening item is a bare complaint — "This is too
   *  dry.", "There is a problem in my room." — and every apology-plus-promise
   *  the course teaches answers it correctly. The word-count rule above cannot
   *  see this: "I am sorry. I will tell my manager." and "I am sorry. I will
   *  change it." strip to {say, manager} and {change}, which share nothing, so
   *  the pair looked maximally different to a rule that only counts overlap.
   *
   *  All five round-3 academic reviews measured this, each from its own
   *  department and each with a different pair. Two of the pairs were written
   *  into the SAME lesson, four weeks apart from any other, so no filter that
   *  works on lesson identity would have caught them either.
   *
   *  This does not touch the grammar block, where a hand-written near miss is
   *  supposed to sit one word from the answer. */
  const APOLOGY = /\b(sorry|apologise|apologize)\b/i;
  const promisesIn = (s: string) => [...bagOf(s)].filter((w) => PROMISE_VERBS.has(w));
  const sameApologyPromise = (a: string, b: string) =>
    APOLOGY.test(a) && APOLOGY.test(b) && promisesIn(a).length > 0 && promisesIn(b).length > 0;

  /** Containment misses the commonest collision of all: two replies that differ
   *  by exactly one content word each way. "I am sorry, madam. I will check."
   *  and "I am sorry, madam. I will help." strip to {sorry, check} and {sorry,
   *  help} — neither contains the other, and both are correct answers to the
   *  same complaint. An audit measured five such pairs carrying 10.9% of Spa's
   *  listening questions and 50.7% of its papers.
   *
   *  Kept separate from sameAnswer because it is deliberately looser: the
   *  grammar block wants containment only, where a near miss written by hand
   *  is SUPPOSED to sit one word away from the answer. */
  const nearlySameAnswer = (a: string, b: string) => {
    if (sameAnswer(a, b)) return true;
    if (sameApologyPromise(a, b)) return true;
    // "Please call the spa desk." and "Please call reception any time, sir." are
    // one routing instruction wearing two hats: whichever the paper keys, the
    // other is also a correct thing to tell that guest. Measured at 4.2% of
    // Spa papers across three rounds.
    const routes = (t: string) => /^please call( |$)/i.test(t.trim());
    if (routes(a) && routes(b)) return true;
    // "I am not sure. I will ask our lounge manager." and "Let me ask the
    // manager for you." are one move. The content has to stay as it is — two
    // manager reviews showed that naming the person and stopping is the wrong
    // service answer — so the paper is what has to keep them apart, and it
    // cannot do it by content. They go on different papers instead.
    const goesToAsk = (t: string) => /(i will ask|let me ask|i will check with)/i.test(t);
    if (goesToAsk(a) && goesToAsk(b)) return true;
    const x = coreOf(a);
    const y = coreOf(b);
    if (x.size === 0 || y.size === 0) return false;
    const onlyX = [...x].filter((w) => !y.has(w)).length;
    const onlyY = [...y].filter((w) => !x.has(w)).length;
    const shared = x.size - onlyX;
    return shared >= 1 && onlyX <= 1 && onlyY <= 1;
  };

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
    const saysTheSame = (s: string) => sameAnswer(s, g.polite);
    // A pair whose own rude half is this rude half is teaching the same repair,
    // so its polite half answers this stem too.
    const sameStem = (o: { rude: string }) => sameAnswer(o.rude, g.rude);
    // The pool can hold a sentence identical to this pair's own nearMiss —
    // two lessons teaching the same repair, one of them hand-written as the
    // near miss of the other — and the paper then printed it twice with one
    // copy keyed wrong. Two departments had a live pair; the checkpoint gate
    // found it on a shuffle the run before caught nothing.
    // Built as a SET, and filled by walking the ranked list rather than taking
    // a fixed slice, because two sources of duplicates hid behind the old
    // code: a pool sentence identical to this pair's hand-written nearMiss,
    // and two different lessons whose polite halves are the same string. Both
    // put one option on the paper twice with a copy keyed wrong; the second
    // survived a first fix and showed up once in 7,500 generated papers.
    const chosen = new Set([g.polite, ...(g.nearMiss ? [g.nearMiss] : [])]);
    const want = 3;
    const ranked = grammarPool
      .filter((o) => o.lessonId !== g.lessonId && !saysTheSame(o.polite) && !sameStem(o))
      .map((o) => ({ o, score: share(o.polite) }))
      .sort((a, b) => b.score - a.score);
    for (const { o } of ranked) {
      if (chosen.size >= want) break;
      chosen.add(o.polite);
    }
    const options = shuffle([...chosen]);
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
  // Carrying lessonId is the whole point: the grammar block has excluded
  // same-lesson candidates since the round before, and the listening block
  // dropped the field on the way in, so 21.7% of its questions took a
  // distractor from the very lesson the answer came from — two halves of one
  // exchange, both correct.
  const speakPool = shuffle(
    phaseLessons.flatMap((l) => l.speaking.map((s) => ({ ...s, lessonId: l.lessonId }))),
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
    // Was `o.guestPrompt === s.guestPrompt`, an exact string match, so "Do you
    // have some shampoo?" happily took the reply written for "Can I have some
    // shampoo?" in the same lesson. Same question, same answer, one of them
    // marked wrong.
    const sameQuestion = new Set(
      speakPool
        .filter((o) => sameAnswer(o.guestPrompt, s.guestPrompt))
        .map((o) => o.targetResponse),
    );
    const sameLesson = new Set(
      speakPool.filter((o) => o.lessonId === s.lessonId).map((o) => o.targetResponse),
    );
    // Điểm chọn nhiễu = giống ĐÁP ÁN + vọng lại từ của ĐỀ. Vế thứ hai là vì
    // đáp án đúng thường vọng đề ("What time do you open?" → "We open at…"),
    // nên nhiễu không vọng đề thì mẹo "chọn câu trùng lời khách nhiều nhất"
    // thắng 53-72% khối này — một báo cáo đo trên 20.000 lượt. Nhiễu cũng
    // vọng đề thì độ vọng hết phân biệt được, và học viên phải NGHE.
    const promptBag = bagOf(s.guestPrompt);
    const echo = (t: string) => [...bagOf(t)].filter((w) => promptBag.has(w)).length;
    // And the option cannot BE the audio. Widening the pool with grammar
    // polites pulled in the questions themselves — "Can I have an extra bed?"
    // is a week 9 polite and also the guest line of the week 9 speaking item —
    // so the paper played a sentence and offered that same sentence as a reply
    // to it. Two audits measured it at 47.3% of Housekeeping papers. Anything
    // that says what the prompt says is out, by the same content test used for
    // the answer.
    const isThePrompt = (t: string) => sameAnswer(t, s.guestPrompt);
    // A distractor shaped unlike the key is a free elimination: the learner
    // sees two statements and a question, and drops the question without
    // hearing anything. Measured across three departments at 29.3%, 30.8% and
    // 85.3% of listening questions. The rule runs both ways, so an item whose
    // key IS a question ("Is everything all right now?") gets question
    // distractors and keeps its own shape secret.
    const askShape = (t: string) => /\?\s*$/.test(t.trim());
    const keyShape = askShape(s.targetResponse);
    const sameShape = (t: string) => askShape(t) === keyShape;
    const pool = [
      ...new Set(speakPool.map((o) => o.targetResponse).filter((t) => t !== s.targetResponse)),
    ].filter((t) => !sameQuestion.has(t) && !sameLesson.has(t) && !isThePrompt(t) && sameShape(t));
    // The score counts TOKENS, so a longer candidate collects more of them and
    // outranks a shorter one on length alone. Measured over 2,000 papers: the
    // key averaged 6.63 words against 7.13 for its distractors, so "always
    // pick the shortest option" cleared the listening block's own 50% floor on
    // 64.5% of papers. The paper as a whole was never winnable that way —
    // ≤0.05% — but the per-block floors exist precisely to stop a learner
    // passing with one skill at zero.
    //
    // Dividing the score by the candidate's size inverts the bias rather than
    // removing it: measured, "longest wins" then went to 57.5% of listening
    // questions. Length has to leave the comparison, not change sign — so
    // candidates are drawn from a band around the key's own length, and the
    // original similarity score ranks what is left.
    const keyLen = wordsOf(s.targetResponse);
    const inBand = (t: string) => Math.abs(wordsOf(t) - keyLen) <= 2;
    const ranked = (list: string[]) =>
      list.map((t) => ({ t, score: share(t) + echo(t) * 2 })).sort((a, b) => b.score - a.score);
    // Bể nói trước; nếu cạn thì mượn vế polite của khối ngữ pháp cùng phase.
    // One Set around the WHOLE thing, not around the second half. Widening the
    // pool with grammar polites re-added sentences the speaking pool already
    // held, so a paper could offer the same string as two of its three
    // options: HK-6 listened to a price and was asked to choose between
    // "The total is seventy thousand dong.", "The total is seventy thousand
    // dong." and one real distractor. Six such papers were live.
    const widened = [
      ...new Set([
        ...pool,
        // `sameLesson` is a set of targetResponses, so it never held the
        // grammar polites of the lesson being tested — and a lesson that
        // teaches two ways to answer the phone shipped one as the key and the
        // other as the distractor. F&B measured it on 5.7% of its papers with
        // the two standards four lines apart in the source.
        ...phaseLessons
          .filter((l) => l.lessonId !== s.lessonId)
          .flatMap((l) => l.grammar.map((gr) => gr.polite))
          .filter(
            (t) =>
              t !== s.targetResponse &&
              !sameQuestion.has(t) &&
              !sameLesson.has(t) &&
              !isThePrompt(t) &&
              sameShape(t),
          ),
      ]),
    ];
    // A SECOND RIGHT ANSWER is a distractor the audio gives the learner no
    // reason to reject. Every previous fix for this named the colliding pair —
    // "Table six is free", the apology-plus-promise list, the routing list —
    // so each new batch of content reopened the hole: one review round added
    // three fresh pairs and took Guest Relations from 0.00% to 11.20% of
    // papers in a single commit. These three rules are shapes instead, and a
    // pair has to be authored around them rather than merely away from a list.
    const audioCore = coreOf(s.guestPrompt);
    const keyCore = coreOf(s.targetResponse);
    const pointsAt = (c: Set<string>) => [...c].filter((w) => audioCore.has(w)).length;
    const keyPull = pointsAt(keyCore);
    /** The audio names something the key says and the candidate does not — so
     *  the learner has a content reason to prefer the key. */
    const discriminated = (t: string) => {
      const c = coreOf(t);
      return [...keyCore].some((w) => !c.has(w) && audioCore.has(w));
    };
    /** The audio echoes the CANDIDATE harder than the key: "Is everything
     *  done?" against "Everything is ready for the next guest." with the key
     *  saying "The room is ready for you." A learner picking by echo is right
     *  to pick the wrong one, which is worse than a coin toss. */
    const pullsAway = (t: string) => pointsAt(coreOf(t)) > keyPull;
    /** The same taught move with a different object. Both are correct replies
     *  whenever the audio does not name the object — "Is there a problem?"
     *  answered by "I will bring a new lounge card." and "I will bring a
     *  ribbon." Gated on `discriminated` so a lesson that DOES name the object
     *  keeps its same-frame distractor, which is the one worth hearing. */
    const MOVES = [
      // "We have X" is an offer of stock, and every department has stock. A
      // list only ever covers the moves someone remembered — an academic
      // review said exactly that after a new batch of content walked through
      // the gap this entry closes.
      /\bwe have\b/i,
      /\bi will bring\b/i,
      /\bi will send\b/i,
      /\bi will call\b/i,
      /\bi will check\b/i,
      /\bmay i have\b/i,
      /\bis ready\b/i,
      /\bhave a good\b/i,
      /\benjoy your\b/i,
      // A later batch added "We could arrange X", and an audit measuring
      // 1,800 listening questions found it answering an open question two
      // different right ways. The comment above this list predicted exactly
      // that: a list by name reopens every time content is added.
      /\bwe (could|can) (also )?(arrange|offer)\b/i,
      // "What do you do first?" has as many right answers as the department
      // has opening jobs, and three weeks of this phase each teach a different
      // one. Same for the every-day and end-of-shift frames beside it.
      /\bfirst[.?!]?$/i,
      /\bevery day[.?!]?$/i,
      /\bat the end[.?!]?$/i,
    ];
    const moveIdx = (t: string) => MOVES.findIndex((r) => r.test(t.trim()));
    const keyMove = moveIdx(s.targetResponse);
    /** Two replies that hand the job to the SAME person are one move, whatever
     *  verb they use to say so: "I am not sure. I will ask our lounge
     *  manager." and "I will call our lounge manager now, sir." were offered
     *  together on 3.6% of papers because the move list matches verb strings
     *  and `ask` is not `call`. The recipient is the thing the guest actually
     *  gets, so that is what decides. */
    const RECIPIENTS = /\b(manager|reception|receptionist|kitchen|chef|supervisor|desk|doctor)\b/gi;
    const handsOffTo = (t: string) =>
      new Set((t.toLowerCase().match(RECIPIENTS) ?? []).map((w) => w));
    const keyHands = handsOffTo(s.targetResponse);
    const sameRecipient = (t: string) =>
      keyHands.size > 0 && [...handsOffTo(t)].some((w) => keyHands.has(w));
    // A shape, not a list. MOVES catches the frames somebody remembered, and
    // three audits measured what it misses: a distractor that opens with the
    // same words as the key and differs only in an object the audio never
    // names is a second right answer whatever frame it belongs to.
    // "Could I have your newspaper choice?" beside "Could I have your travel
    // purpose?" for "What do you need from me?" — 8.7% to 18.6% of listening
    // items depending on the department, better than one a paper.
    const openingWords = (t: string) =>
      t
        .toLowerCase()
        .replace(/[^a-z ]/g, " ")
        .split(" ")
        .filter(Boolean)
        .slice(0, 4)
        .join(" ");
    const keyOpening = openingWords(s.targetResponse);
    const sameFrame = (t: string) => openingWords(t) === keyOpening;
    const secondRightAnswer = (t: string) =>
      pullsAway(t) ||
      (!discriminated(t) &&
        ((keyMove >= 0 && moveIdx(t) === keyMove) || sameRecipient(t) || sameFrame(t)));
    // nearlySameAnswer, not sameAnswer: see the note on the helper.
    const usable = widened.filter(
      (t) => !nearlySameAnswer(t, s.targetResponse) && !secondRightAnswer(t),
    );
    const banded = usable.filter(inBand);
    // Discriminated candidates first: when the audio can tell the key from a
    // distractor, that is the distractor worth printing. 57-60% of items have
    // an audio that names nothing in the key at all, and those fall through to
    // the similarity ranking exactly as before.
    const byDiscrimination = (list: string[]) => [
      ...ranked(list.filter(discriminated)),
      ...ranked(list.filter((t) => !discriminated(t))),
    ];
    const strict = byDiscrimination(banded.length >= 2 ? banded : usable);
    // And the two distractors must differ from EACH OTHER. The old rule
    // compared every candidate to the key and never to its neighbour, so a
    // paper could offer "This one is better, madam." against "This one is
    // better, sir." — three options, two of them one word apart. Measured at
    // 9-34% of papers depending on the department.
    const clean: { t: string; score: number }[] = [];
    for (const c of strict) {
      if (clean.length >= 2) break;
      if (clean.some((k) => nearlySameAnswer(k.t, c.t))) continue;
      clean.push(c);
    }
    // At least one distractor must echo the audio as hard as the key does.
    // The score already weights `echo` for this reason, but narrowing the
    // candidate pool with the second-right-answer rules above filtered out
    // the high-echo candidates as a side effect, and "pick the option sharing
    // most words with what you heard" climbed from 36.9% to 44.1% of
    // listening questions — through the block's own 50% floor on 54.9% of
    // papers. Overlap has to stay useless, so it is repaired here rather than
    // by weakening the rules that made it useful again.
    // And at least one distractor must be about the key's own length. The band
    // filter allows +/-2 words, which was wide enough for "always pick the
    // shortest option" to reach 41.9% of listening questions and through the
    // block floor on 48.9% of papers — the length bias the reading block just
    // lost, reappearing one block over.
    // At least one distractor no LONGER than the key. "Within a word or two"
    // is not enough: a five-word key beside two six-word distractors is still
    // the unique shortest option, which is the whole trick. It has to be
    // possible to be wrong by picking the shortest.
    // Three constraints and only two distractors to carry them, so they are
    // satisfied TOGETHER. Applied one after another, the second repair simply
    // overwrote the first — both wrote to clean[1].
    //
    //   · one distractor no LONGER than the key  — "always pick the shortest"
    //   · one echoing the audio at least as hard — "pick the loudest"
    //   · one echoing it at most as hard         — "pick the quietest"
    //
    // The third is new, and it exists because the second one alone did not
    // remove the overlap signal, it INVERTED it. Weighting `echo` in the
    // ranker and then forcing a high-echo distractor left the distractors
    // echoing the audio harder than the key on average, so "pick the option
    // sharing FEWEST words with what you just heard" answered 48.3% of
    // listening questions and carried 61.3% of papers through the block's own
    // 50% floor — worse than the 44.1% the high-echo repair was written to
    // kill. A surface signal that points either way is still a surface signal;
    // the key has to sit INSIDE the range its distractors span.
    const keyEcho = echo(s.targetResponse);
    const shortEnough = (c: { t: string }) => wordsOf(c.t) <= keyLen;
    const loudEnough = (c: { t: string }) => echo(c.t) >= keyEcho;
    const quietEnough = (c: { t: string }) => echo(c.t) <= keyEcho;
    const covers = (pair: { t: string }[]) =>
      (pair.some(shortEnough) ? 1 : 0) +
      (pair.some(loudEnough) ? 1 : 0) +
      (pair.some(quietEnough) ? 1 : 0);
    if (clean.length === 2 && covers(clean) < 3) {
      // `strict` is already in rank order, so the first pair that covers all
      // three is also the best-ranked one that does.
      let best = [clean[0], clean[1]];
      search: for (let i = 0; i < strict.length; i++)
        for (let j = i + 1; j < strict.length; j++) {
          const pair = [strict[i], strict[j]];
          if (nearlySameAnswer(pair[0].t, pair[1].t)) continue;
          if (covers(pair) > covers(best)) {
            best = pair;
            if (covers(best) === 3) break search;
          }
        }
      clean[0] = best[0];
      clean[1] = best[1];
    }
    // If the strict rule leaves fewer than two, top up from what it rejected —
    // taking the LEAST similar first, so the filler is the least likely of the
    // rejects to read as a second right answer. Three options beats a pure
    // strict rule that hands the learner a coin toss.
    //
    // The rejects are what the strict filters removed, not `saysTheSame` — a
    // missing `!` had this drawing the top-up from the candidates whose
    // content is IDENTICAL to the key, which is the one set that must never
    // reach a paper: the learner would be marked wrong for choosing a sentence
    // that says exactly what the answer says. Reversing the similarity rank
    // still puts those last within the rejects, so a paper reaches for them
    // only when nothing else exists at all.
    // And the top-up may not reach into what the correctness filters removed
    // at all. Drawing from the rejects is how "Then I show our guests around."
    // got "I show our guests around before lunch." as its distractor —
    // `nearlySameAnswer` had already thrown that out for containing the whole
    // key, and the filler put it straight back on 3.9% of papers. The top-up
    // now comes from candidates that were merely OUTRANKED, and a question
    // with nothing left ships with two options: better a coin toss the
    // learner can reason about than three options of which two are right.
    const filler = ranked(usable.filter((t) => !clean.some((c) => c.t === t)))
      .reverse()
      .filter((x) => !clean.some((c) => c.t === x.t || nearlySameAnswer(c.t, x.t)))
      // Stable sort, so within each group the reverse order above survives:
      // if the strict rule left a gap, fill it with something that is not
      // another apology-plus-promise before falling back to one.
      .sort(
        (a, b) =>
          Number(sameApologyPromise(a.t, s.targetResponse)) -
          Number(sameApologyPromise(b.t, s.targetResponse)),
      )
      .slice(0, 2 - clean.length);
    const others = [...clean, ...filler].map((x) => x.t);
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
