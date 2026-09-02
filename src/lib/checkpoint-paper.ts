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
  const reviewFirst = shuffle(unique.filter((v) => reviewVocab.some((r) => r.word === v.word)));
  const restPool = shuffle(unique.filter((v) => !reviewFirst.includes(v)));
  const halfFromReview = Math.min(reviewFirst.length, Math.ceil(MIX.vocab / 2));
  const vocabPicks = shuffle([
    ...reviewFirst.slice(0, halfFromReview),
    ...restPool.slice(0, MIX.vocab - halfFromReview),
  ]);

  const vocabQs: Question[] = vocabPicks.slice(0, MIX.vocab).map((v, i) => {
    // Unique by WORD is not enough: the paper asks for a meaning, so two cards
    // that share a Vietnamese gloss print the same option twice and mark one
    // of them wrong. Back Office taught Invoice and Bill as "Hóa đơn" three
    // weeks apart and week 6 asked a learner to choose between them.
    const distractors = shuffle(
      unique.filter((o) => o.word !== v.word && o.definition !== v.definition),
    ).slice(0, 3);
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
  ]);
  // Words the curriculum itself treats as interchangeable in an answer. A spa
  // that CLOSES at eight also FINISHES at eight; a lounge that is READY is
  // also FREE. Four reviews hit pairs from this list.
  const SYNONYM: Record<string, string> = {
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
  const speakPool = shuffle(phaseLessons.flatMap((l) => l.speaking));
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
    const saysTheSame = (t: string) => sameAnswer(t, s.targetResponse);
    const sameQuestion = new Set(
      speakPool.filter((o) => o.guestPrompt === s.guestPrompt).map((o) => o.targetResponse),
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
    const pool = [
      ...new Set(speakPool.map((o) => o.targetResponse).filter((t) => t !== s.targetResponse)),
    ].filter((t) => !sameQuestion.has(t) && !isThePrompt(t));
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
        ...phaseLessons
          .flatMap((l) => l.grammar.map((gr) => gr.polite))
          .filter((t) => t !== s.targetResponse && !sameQuestion.has(t) && !isThePrompt(t)),
      ]),
    ];
    const clean = ranked(widened.filter((t) => !saysTheSame(t))).slice(0, 2);
    // If the strict rule leaves fewer than two, top up from what it rejected —
    // taking the LEAST similar first, so the filler is the least likely of the
    // rejects to read as a second right answer. Three options beats a pure
    // strict rule that hands the learner a coin toss.
    const filler = ranked(pool.filter((t) => saysTheSame(t)))
      .reverse()
      .filter((x) => !clean.some((c) => c.t === x.t))
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
