// Utterance scoring, shared by SpeakingSuite (per-week practice) and
// WeekTestSuite (the oral half of a checkpoint). Moved out of SpeakingSuite
// unchanged when the checkpoint gained spoken items — two graders that drift
// apart would mean the practice drill and the exam reward different speech.

// Speech recognition transcribes spoken numbers as digits ("two-oh-five"
// → "205", "twenty-five" → "25"), while pre-A1 targets are authored as
// number WORDS. Expand digit tokens so learners aren't failed for
// pronouncing a number correctly.
const ONES = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const TEENS = [
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];
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

/** Contractions expand before anything else looks at the stream. A learner who
 *  says "It's seven o'clock" has produced the copula the lesson is teaching,
 *  and ASR transcribes contractions as contractions — so a grammar word that
 *  is required (see GRAMMAR_TOKENS) must not be counted missing just because
 *  the speaker was fluent enough to contract it. */
const CONTRACTIONS: [RegExp, string][] = [
  [/\bit's\b/g, "it is"],
  [/\bhe's\b/g, "he is"],
  [/\bshe's\b/g, "she is"],
  [/\bthat's\b/g, "that is"],
  [/\bthere's\b/g, "there is"],
  [/\bwhat's\b/g, "what is"],
  [/\bi'm\b/g, "i am"],
  [/\byou're\b/g, "you are"],
  [/\bwe're\b/g, "we are"],
  [/\bthey're\b/g, "they are"],
  [/\bi'll\b/g, "i will"],
  [/\bwe'll\b/g, "we will"],
  [/\bcan't\b/g, "cannot"],
  [/\bdon't\b/g, "do not"],
  [/\bdoesn't\b/g, "does not"],
  [/\bisn't\b/g, "is not"],
  [/\baren't\b/g, "are not"],
  [/\bwon't\b/g, "will not"],
];

export function normalize(s: string) {
  let t = ` ${s.toLowerCase()} `;
  for (const [re, full] of CONTRACTIONS) t = t.replace(re, full);
  return t
    .replace(/[^\w\s']/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .flatMap((tok) => (/^\d+$/.test(tok) ? digitToWords(tok) : [tok]));
}

/** The words whose loss changes the MESSAGE, not just the score.
 *
 *  At the Phase 0 thresholds (60% accuracy over a 4-6 word target) every
 *  target had exactly one droppable token, and it was always the value:
 *  "Room three-oh-five" passed a two-oh-five item, "It is eleven o'clock"
 *  passed a seven-o'clock item, "Five hundred dong" passed a
 *  five-hundred-thousand item — wrong by a factor of a thousand, in the
 *  three of six P0 weeks that exist to teach numbers, times and money.
 *  An audit ran those exact utterances and every one scored PASS.
 *
 *  So value words are not droppable. The list is closed and deliberately
 *  small — numbers, clock words, ordinals, days, times of day, currencies —
 *  because a required token that is merely stylistic would punish fluent
 *  paraphrase. */
const VALUE_TOKENS = new Set<string>([
  ...ONES,
  ...TEENS,
  ...TENS.filter(Boolean),
  "oh",
  "hundred",
  "thousand",
  "million",
  "o'clock",
  "half",
  "past",
  "first",
  "second",
  "third",
  "fourth",
  "fifth",
  "sixth",
  "seventh",
  "eighth",
  "ninth",
  "tenth",
  "eleventh",
  "twelfth",
  "ground",
  "morning",
  "afternoon",
  "evening",
  "night",
  "today",
  "tomorrow",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
  "dong",
  "dollar",
  "dollars",
]);

/** The grammar words Phase 0 exists to install, and whose loss is the exact
 *  L1 error every rude/polite pair is built around: the copula, the future
 *  auxiliary, and negation.
 *
 *  VALUE_TOKENS closed the numeric hole; this closes the grammatical one.
 *  Measured over all 249 Phase 0 targets: a learner who drops every function
 *  word and every plural -s — the complete Vietnamese-speaker error profile,
 *  and precisely what each lesson's `rule` warns against — passed 89% of
 *  items. Five audit reports found this independently, in five modules.
 *
 *  Raising the pass threshold does NOT fix it, and I measured that before
 *  believing the recommendation to: at 75% the sloppy version still passes
 *  65% of items, and at 80% it still passes 52% while honest answers that
 *  drop a single word start failing 41% of the time. A threshold cannot tell
 *  a dropped copula from a mumbled noun. This list can. */
const GRAMMAR_TOKENS = new Set<string>(["is", "am", "are", "was", "were", "will"]);

/** The rest of the function words, graded with one life.
 *
 *  The list above closed the copula hole and left the wider one open. Four
 *  more reports measured what stayed open, in four modules: strip EVERY
 *  function word and every plural -s — the whole Vietnamese-speaker error
 *  profile — and the answer still passed 37.8% (GR), 47.4% (FO), 50.8% (HK)
 *  and 53.4% (SW) of speaking items. "Please pay reception sir" passed
 *  "Please pay at reception, sir." in the lesson whose rule is the preposition.
 *
 *  Adding these to the hard list was the obvious move and it costs too much:
 *  measured, it takes the sloppy profile from 50.8% down to 32.8% but also
 *  drops an HONEST learner who fluffs one word from 58.7% to 50.8%. ASR eats
 *  articles for breakfast; a course cannot fail people for its own microphone.
 *
 *  So these are required with a tolerance of one. Losing a single "the" is a
 *  slip. Losing two or more function words is not an accident, it is the
 *  error profile — and the profile is what every rude/polite pair in P0 is
 *  built to erase. */
const FUNCTION_TOKENS = new Set<string>([
  "a",
  "an",
  "the",
  "my",
  "your",
  "our",
  "i",
  "we",
  "you",
  "it",
  "at",
  "in",
  "on",
  "to",
  "of",
  "for",
  "do",
  "does",
  "did",
  "may",
  "can",
  "could",
  "would",
  "shall",
  "have",
  "has",
]);
/** One function word may go missing, however many the target has.
 *
 *  Scaling the allowance by length was tried first and measured worse in the
 *  direction that matters least: it took the sloppy profile to 0.4% but also
 *  failed an HONEST learner who lost a single "the" 91% of the time, and a
 *  browser microphone loses "the" all day. A course cannot fail people for
 *  its own ASR.
 *
 *  One life, flat, kills the profile on every target carrying two or more
 *  function words. On a target carrying exactly one — "At reception, madam."
 *  — dropping it and slipping on it are literally the same utterance, so no
 *  scoring rule can separate them, and this one does not pretend to. What
 *  covers those is the other half of the fix: the lessons own headwords are
 *  required outright (see lesson() in phase0.ts), so the content word can
 *  never be the thing that goes. */
function functionAllowance(count: number): number {
  // Câu mang đúng một hư từ THÌ hư từ đó là bài học: "At reception, madam."
  // mất "at", "Thank you" mất "you", "The second floor" mất "the". Ở đó lỡ
  // miệng và bỏ qua ngữ pháp là một, nên không tha. Từ hai hư từ trở lên,
  // tha một — micro của trình duyệt nuốt mạo từ cả ngày.
  //
  // Và chỉ tha cho MẠO TỪ: xem FORGIVABLE_FUNCTION_TOKENS. Suất tha này từng
  // ăn vào giới từ, tức ăn vào đúng cấu trúc mà bài đang dạy.
  return count <= 1 ? 0 : 1;
}

/** Negation is graded asymmetrically, and deliberately.
 *
 *  Four reports proposed adding "yes"/"no" to the required list. That breaks
 *  honest answers: "The second floor, madam." is a correct reply to "Is my
 *  room on the second floor?" even though the model opens with "Yes". So an
 *  affirmative is never required. A NEGATION is, in both directions — losing
 *  one reverses the message ("We never close" → "We close"), and adding one
 *  reverses it just as hard ("Yes, someone is here" → "No, nobody is here").
 *  Both passed before this: 60% and 86%. */
const NEGATION_TOKENS = new Set<string>([
  "no",
  "not",
  "never",
  "nobody",
  "none",
  "nothing",
  "cannot",
]);

/** Every token this target cannot lose: the ones derived from the closed
 *  lists above, plus anything the frame author names, plus any title+surname
 *  the model uses. */
export function requiredValueTokens(target: string, override?: string[]): string[] {
  const toks = normalize(target);
  return [
    ...new Set(
      toks.filter((t, i) => {
        // "ONE moment" is a chunk, not a count — the comment above promised an
        // override for exactly this and no frame ever wrote one, so "Certainly,
        // madam. A moment." failed on a missing digit. Three audit reports hit
        // it. Handled here instead of in 20 hand-written overrides, because it
        // is a property of the phrase, not of any one lesson. A "one" that is
        // counting something ("One three, madam" — reading digits back) keeps
        // its status: only the immediate `one moment` pair is formulaic.
        if (t === "one" && toks[i + 1] === "moment") return false;
        return VALUE_TOKENS.has(t) || GRAMMAR_TOKENS.has(t) || NEGATION_TOKENS.has(t);
      }),
    ),
    // An authored list ADDS to the derived one; it does not replace it. The
    // old contract was "override wins", and an audit proved what that would
    // have cost: declaring `requiredTokens: ["room"]` made "Room NINE-one-two"
    // pass a two-oh-five item, because naming one content word switched the
    // number lock off. No frame had used the field yet — and all five reports
    // that call it the highest-leverage fix left would have walked into that.
    ...(override ?? []).map((t) => t.toLowerCase()),
    ...titleAndSurname(target),
    ...fixedPhraseTokens(target),
  ];
}

/** Set phrases that are all-or-nothing.
 *
 *  Two academic reviews measured "Thank" — no "you" — passing targets whose
 *  own lesson rule is "Phải có 'you': THANK YOU." Locking the lesson's
 *  headwords caught it in week 1 lesson 4 and nowhere else, because that is
 *  the only lesson where the phrase is a headword. It is a property of the
 *  phrase, so it belongs here: if the target says it, the learner says all of
 *  it. Day-parts are deliberately absent — greetingIsFree() exists because the
 *  guest's line usually does not fix the hour. */
const FIXED_PHRASES = [
  "thank you",
  "here you are",
  "of course",
  "excuse me",
  "anything else",
  "half past",
  "this way",
  // "one moment" KHÔNG nằm ở đây, và đó là chủ ý. Cụm này đã có miễn trừ
  // riêng ở requiredValueTokens (chữ 'one' đứng ngay trước 'moment' không
  // tính là số đếm), vì "Certainly, madam. A moment." là câu đúng. Đưa nó
  // vào đây khoá luôn chữ 'one' và đánh trượt chính câu đó — đo được, và là
  // lỗi tôi tự gây ra khi thêm lớp bảo vệ mới mà không kiểm lớp cũ.
];
function fixedPhraseTokens(target: string): string[] {
  const t = " " + normalize(target).join(" ") + " ";
  return [
    ...new Set(FIXED_PHRASES.filter((p) => t.includes(" " + p + " ")).flatMap((p) => p.split(" "))),
  ];
}

/** The value tokens of an utterance, in order, with the formulaic "one" of
 *  "one moment" removed.
 *
 *  That exemption exists in requiredValueTokens too, and the two must agree:
 *  "Certainly, madam. A moment." is a correct answer, and a round of patching
 *  broke it twice in one file — once by adding "one moment" to FIXED_PHRASES,
 *  once by counting its "one" here. One helper now, used by both, so the next
 *  edit cannot fix half of it. */
function valueTokenSequence(toks: string[]): string[] {
  return toks.filter((t, i) => VALUE_TOKENS.has(t) && !(t === "one" && toks[i + 1] === "moment"));
}

/** The only function words the allowance may spend itself on.
 *
 *  The allowance exists because a browser microphone swallows articles all day
 *  long. It was never meant to cover a preposition, and covering one made the
 *  grader pass "I work Housekeeping, sir." against "I work in Housekeeping,
 *  sir." — the exact string that lesson prints as the learner's ERROR, with a
 *  rule that reads "you need the preposition 'in' before the department". Two
 *  more from the same audit: "The wardrobe is the left, sir." and "Of course.
 *  staircase is next to lift."
 *
 *  A dropped preposition, pronoun or auxiliary changes the structure the
 *  lesson is teaching. A dropped article is a slip. */
const FORGIVABLE_FUNCTION_TOKENS = new Set<string>(["a", "an", "the", "my", "your", "our"]);

/** The function words this target actually contains, WITH REPETITION.
 *
 *  Deduplicating them hid every second occurrence: "The lobby is on the left,
 *  sir." reduced to [the, on], so a learner could drop one of its two "the"s
 *  and the grader saw nothing missing at all. */
export function requiredFunctionTokens(target: string): string[] {
  return normalize(target).filter((t) => FUNCTION_TOKENS.has(t));
}

/** A title plus the name it belongs to: "Ms Smith", "Mr Chen".
 *
 *  This is NOT the sir/madam coin-flip. The guest has just said their own
 *  name out loud, so the title AND the surname are both determined — and
 *  choosing Ms over Mrs, or Chen over Wei, is the entire subject of the
 *  lessons built on these frames. Measured before this: "Welcome, Mr Wei."
 *  passed a "Welcome, Mr Chen." item at 67%, and "Thank you, Mrs Smith."
 *  passed "Thank you, Ms Smith." at 75% — in the module whose own rule reads
 *  "Gọi 'Mr Wei' là gọi bằng tên riêng". */
function titleAndSurname(target: string): string[] {
  const out: string[] = [];
  for (const m of target.matchAll(/\b(mr|mrs|ms|miss)\.?\s+([a-z][a-z'-]+)/gi))
    out.push(m[1].toLowerCase(), m[2].toLowerCase());
  return out;
}

/** Dropping the -s — plural or third person — is the single most-taught point
 *  in Phase 0 ("Two towel." → "Two towels, please."; "It finish at four." →
 *  "It finishes at four.") and the one the token lists cannot catch, because
 *  "start" and "starts" are simply different words: the learner loses 20% of
 *  a five-word target and still clears 60%.
 *
 *  It fires only when the learner actually said the STEM, so a target word
 *  that merely ends in s is safe — nobody says "pleas" for "please". The
 *  3-letter stem floor keeps "is"/"yes"/"us" out, and -ss words are skipped. */
export function inflectionErrors(spoken: string, target: string): string[] {
  const said = new Set(normalize(spoken));
  return [
    ...new Set(
      normalize(target).filter((w) => {
        if (!w.endsWith("s") || w.endsWith("ss")) return false;
        const stem = w.slice(0, -1);
        return stem.length >= 3 && !said.has(w) && said.has(stem);
      }),
    ),
  ];
}

/** A negation the learner ADDED that the model never had. Checked separately
 *  from the missing-token list because it is the opposite failure: nothing is
 *  absent, something contradictory is present. */
export function addedNegation(spoken: string, target: string): string[] {
  const t = new Set(normalize(target));
  if ([...t].some((w) => NEGATION_TOKENS.has(w))) return [];
  return [...new Set(normalize(spoken).filter((w) => NEGATION_TOKENS.has(w)))];
}

/** A guest line that carries no clue to the guest's gender leaves BOTH "sir"
 *  and "madam" correct. The model sentence had to pick one; the student, on
 *  the floor, picks from the guest in front of them. 20 of the 24 Phase 0
 *  speaking frames are in exactly that position — measured, not guessed —
 *  so grading the coin-flip marks people wrong for the course's omission,
 *  and every audit read it as an unanswerable question.
 *
 *  Where the prompt DOES fix the gender ("I am Mrs Lee.", "his room"), the
 *  tag is determined and stays graded: that is the case worth teaching. */
// FIRST PERSON only. The old pattern matched any mention of a title, so
// "Which room is Mr Chen in?" counted as a cue — but Mr Chen is the person
// being ASKED ABOUT, and the speaker's own gender is still unknown. That
// turned an honest "I am sorry, madam." into a FAIL, on the one frame whose
// whole subject is refusing to discuss another guest. Exactly the coin-flip
// this helper exists to prevent, arriving through the back door.
const GENDER_CUE =
  /\b(i am|i'm|this is)\s+(mr|mrs|ms|miss)\b|\bi am\b[^.?!]*\b(husband|wife|father|mother|son|daughter|brother|sister)\b|\b(sir|madam|ma'am)\b/i;
const HONORIFIC = /^(sir|madam|ma'am|maam)$/;

export function honorificIsFree(guestPrompt?: string): boolean {
  return !guestPrompt || !GENDER_CUE.test(guestPrompt);
}

/** The same problem on the time axis, and the very first utterance of the
 *  course had it: the guest says "Hello!" and the model answers "Good
 *  morning, sir." — so "Good afternoon, sir." failed on a missing `morning`,
 *  for a choice the prompt never gave the learner any way to make.
 *
 *  Deliberately narrow. It frees the three greeting words only when the
 *  target OPENS with one, i.e. when they are a courtesy formula. In a
 *  statement of fact — "We open at six in the morning." — the time of day is
 *  the information, and it stays locked. */
const TIME_CUE =
  /\b(morning|afternoon|evening|night|midnight|noon|breakfast|lunch|dinner|a\.?m|p\.?m|o'clock|arrived)\b/i;
const GREETING_OPENS = /^good\s+(morning|afternoon|evening)\b/i;
const DAYPART = /^(morning|afternoon|evening)$/;

export function greetingIsFree(target: string, guestPrompt?: string): boolean {
  return GREETING_OPENS.test(target.trim()) && (!guestPrompt || !TIME_CUE.test(guestPrompt));
}

const canonHonorific = (toks: string[], free: boolean) =>
  free ? toks.map((t) => (HONORIFIC.test(t) ? "sir" : t)) : toks;

const canonDaypart = (toks: string[], free: boolean) =>
  free ? toks.map((t) => (DAYPART.test(t) ? "morning" : t)) : toks;

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

export function compareWords(
  spoken: string,
  target: string,
  honorificFree = false,
  daypartFree = false,
) {
  const a = canonDaypart(canonHonorific(normalize(spoken), honorificFree), daypartFree);
  const b = canonDaypart(canonHonorific(normalize(target), honorificFree), daypartFree);
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
  //
  // Computed on honorific-stripped streams. "Thank you, madam. Goodbye."
  // and "Thank you. Goodbye, madam." are the same sentence with the tag in
  // the other natural slot — the review that caught this measured 21/21
  // mid-sentence-honorific items failing at accuracy 100 when the tag
  // moved, and two authored orderings of one line failing each other
  // inside the same oral pool. Presence of the tag is still graded by the
  // required-token layer; its POSITION was never the lesson.
  const HON_ORDER_FREE = new Set(["sir", "madam", "maam"]);
  const ao = a.filter((w) => !HON_ORDER_FREE.has(w));
  const bo = b.filter((w) => !HON_ORDER_FREE.has(w));
  const orderRatio = bo.length === 0 ? (b.length === 0 ? 0 : 1) : lcsLength(ao, bo) / bo.length;
  // `words` is what the UI renders back to the learner, so it must be the
  // target as authored — not the canonicalised stream, which would print
  // "sir" over a model sentence that says "madam". Same length, so the
  // correctIdx positions still line up.
  return { correctIdx, accuracy, orderRatio, words: normalize(target) };
}

/** How closely a spoken answer must match the model, by week.
 *
 *  It used to be three steps: 60% up to week 14, then 80% from week 15, then
 *  50% from week 39. Two things were wrong with that.
 *
 *  THE CLIFF. Week 14 asked for 60% and week 15 asked for 80% — twenty
 *  points in one week, landing exactly where the content also steps up
 *  (vocabulary 10→13 per week, speaking 4→8 scenarios, reading 86→129
 *  words). A learner who was clearing every scenario suddenly cleared none,
 *  with nothing to tell them the standard had moved. It now ramps across
 *  weeks 15-22, so the rise is spread over the phase that causes it.
 *
 *  THE DIP. Weeks 39-40 dropped to 50% with word order ignored, described in
 *  the old comment as "open role-play … idea coverage". That content does
 *  not exist: weeks 39 and 40 carry fixed `targetResponse` sentences like
 *  every other week, only longer (12-14 words). So the exception applied a
 *  much lower bar to the same metric, and made the final speaking assessment
 *  of the course the most lenient in it. Removed. If open role-play with
 *  idea-coverage scoring is ever authored — see the production-practice item
 *  in docs/academic-review-backlog.md — it needs its own scorer, not a
 *  discount on this one.
 *
 *  Monotonic by construction: the bar never falls as the course goes on. */
export function passThresholds(week: string | number): { accPct: number; orderRatio: number } {
  const n = typeof week === "string" ? parseInt(week, 10) : week;
  // Phase 0-1 — a zero-beginner should not have to nail 80% of a four-word
  // utterance to earn a star.
  // orderRatio 0,40 trên một câu năm từ cho qua gần như mọi phép đảo — hai
  // báo cáo học vụ đo được 42/42 và 57/57 lượt qua khi tráo hai mệnh đề, và
  // một trong các câu tráo đó ('Here are you') là nearMiss mà khối ngữ pháp
  // của cùng khoá chấm SAI. Trật tự từ LÀ nội dung đang được dạy ở P0.
  if (n <= 14) return { accPct: 60, orderRatio: 0.7 };
  // Phase 2 — the step to A2 spread across its eight weeks (65/70/75/80),
  // rather than delivered in one jump at week 15.
  if (n <= 22) {
    const step = Math.floor((n - 15) / 2); // 0,0,1,1,2,2,3,3
    // Rounded: 0.45 + 3 * 0.05 lands on 0.6000000000000001 in binary
    // floating point, which reads as a fall against week 23's flat 0.6.
    return { accPct: 65 + step * 5, orderRatio: Math.round((0.7 + step * 0.05) * 100) / 100 };
  }
  // A2+ and B1.1 — full standard, and it stays there to the last week.
  return { accPct: 80, orderRatio: 0.85 };
}

/** One place that decides whether an utterance passed, so the drill and the
 *  exam cannot disagree. Graded against the week the SENTENCE came from —
 *  a checkpoint paper mixes weeks, and grading a week-16 line at week-40's
 *  lenient open-role-play threshold would make the final exam the easiest
 *  speaking in the course. */
export function utterancePassed(
  spoken: string,
  target: string,
  sourceWeek: string | number,
  requiredTokens?: string[],
  guestPrompt?: string,
) {
  const th = passThresholds(sourceWeek);
  const free = honorificIsFree(guestPrompt);
  const dayFree = greetingIsFree(target, guestPrompt);
  const cmp = compareWords(spoken, target, free, dayFree);
  // A value token said wrong or not at all fails the utterance regardless of
  // the percentage — see VALUE_TOKENS. Checked against the normalized spoken
  // stream, so ASR digits ("205" → two oh five) still count.
  const spokenSet = new Set(normalize(spoken));
  const required = requiredValueTokens(target, requiredTokens);
  // When the guest's line DOES fix the gender, a bare honorific stops being a
  // coin-flip and becomes the thing the lesson teaches — so grade it. Titles
  // that carry a surname are handled by titleAndSurname() and need no cue:
  // the guest said the name, so nothing is left to guess.
  if (!free) for (const t of ["sir", "madam"]) if (normalize(target).includes(t)) required.push(t);
  // And drop the day-part from the required list when the greeting is free —
  // canonicalising it inside compareWords fixes the percentage but leaves the
  // token lock still demanding the exact word, which fails the same honest
  // answer for the same missing reason.
  const gated = dayFree ? required.filter((t) => !DAYPART.test(t)) : required;
  const missingRequired = [...new Set(gated)].filter((t) => !spokenSet.has(t));
  // Có mặt là chưa đủ: các token GIÁ TRỊ phải xuất hiện đúng thứ tự của câu
  // mẫu, và đúng số lần. "Two keys to room two-oh-five" chứa "two" hai lần vì
  // hai lần đó nói hai điều khác nhau; đọc "nine keys to room two-oh-five"
  // vẫn có "two" nên phép kiểm tập hợp cho qua. Dãy con cùng thứ tự bắt được
  // cả hoán vị lẫn thiếu lượt.
  const valueSeq = valueTokenSequence(normalize(target));
  const spokenSeq = valueTokenSequence(normalize(spoken));
  let vi = 0;
  for (const t of spokenSeq) if (vi < valueSeq.length && valueSeq[vi] === t) vi++;
  const valueOrderOk = vi === valueSeq.length;
  // Function words, one life. See FUNCTION_TOKENS.
  //
  // Counted by OCCURRENCE on both sides: the target's list repeats, and each
  // occurrence needs its own match in what was said, so dropping the second
  // "the" of "on the left" now registers.
  const funcNeeded = requiredFunctionTokens(target);
  const spokenTally = new Map<string, number>();
  for (const t of normalize(spoken)) spokenTally.set(t, (spokenTally.get(t) ?? 0) + 1);
  const missingFunction: string[] = [];
  for (const t of funcNeeded) {
    const left = spokenTally.get(t) ?? 0;
    if (left > 0) spokenTally.set(t, left - 1);
    else missingFunction.push(t);
  }
  // A missing preposition, pronoun or auxiliary is never covered by the
  // allowance — only a missing article is.
  const unforgivable = missingFunction.filter((t) => !FORGIVABLE_FUNCTION_TOKENS.has(t));
  const added = addedNegation(spoken, target);
  const inflection = inflectionErrors(spoken, target);
  return {
    ...cmp,
    missingRequired,
    missingFunction,
    addedNegation: added,
    inflectionErrors: inflection,
    passed:
      Math.round(cmp.accuracy * 100) >= th.accPct &&
      cmp.orderRatio >= th.orderRatio &&
      // Đúng từng chữ nhưng sai thứ tự thì không phải đọc vấp — đó là chưa
      // biết trật tự, và trật tự là nội dung của bài. Ngưỡng ở trên tha cho
      // câu nói thiếu; chỗ này không tha cho câu nói đủ mà xếp sai.
      !(Math.round(cmp.accuracy * 100) === 100 && cmp.orderRatio < 1) &&
      missingRequired.length === 0 &&
      valueOrderOk &&
      unforgivable.length === 0 &&
      missingFunction.length <= functionAllowance(funcNeeded.length) &&
      added.length === 0 &&
      inflection.length === 0,
    threshold: th,
  };
}
