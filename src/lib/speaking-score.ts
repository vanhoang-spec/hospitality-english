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
  // A round of ten reviews ran fluent sentences through the grader and found
  // the list stopped at the forms the first authors happened to write. "You
  // mustn't smoke inside the hotel." failed in the very week that teaches
  // must/mustn't; "I've reported it, madam." and "Here's your red invoice."
  // failed on the contraction alone. ASR writes all of these as contractions.
  [/\bmustn't\b/g, "must not"],
  [/\bshouldn't\b/g, "should not"],
  [/\bcouldn't\b/g, "could not"],
  [/\bwouldn't\b/g, "would not"],
  [/\bdidn't\b/g, "did not"],
  [/\bwasn't\b/g, "was not"],
  [/\bweren't\b/g, "were not"],
  [/\bhaven't\b/g, "have not"],
  [/\bhasn't\b/g, "has not"],
  [/\bhadn't\b/g, "had not"],
  [/\byou'll\b/g, "you will"],
  [/\bthey'll\b/g, "they will"],
  [/\bit'll\b/g, "it will"],
  [/\bhe'll\b/g, "he will"],
  [/\bshe'll\b/g, "she will"],
  [/\byou'd\b/g, "you would"],
  [/\bi'd\b/g, "i would"],
  [/\bwe'd\b/g, "we would"],
  [/\bthey'd\b/g, "they would"],
  [/\bhere's\b/g, "here is"],
  [/\bwho's\b/g, "who is"],
  [/\bi've\b/g, "i have"],
  [/\bwe've\b/g, "we have"],
  [/\byou've\b/g, "you have"],
  [/\bthey've\b/g, "they have"],
  [/\blet's\b/g, "let us"],
];

/** How the same word reaches the grader two ways. Chrome's recogniser runs in
 *  en-US, so it writes "jewelry", "favorite", "canceled", "checkout" and
 *  "pickup" for words this course spells "jewellery", "favourite", "cancelled",
 *  "check-out" and "pick-up"; and it joins or splits compounds the course
 *  writes the other way ("bath robe" / "bathrobe"). Four reviews measured an
 *  honest speaker failing on nothing but the spelling a machine chose — 27 of
 *  31 such variants in one department. Both sides go through this table, so
 *  it can never make a wrong answer right: it only stops one right answer
 *  being spelled two ways. */
const SPELLING: [RegExp, string][] = [
  [/\bjewelry\b/g, "jewellery"],
  [/\bfavorite(s?)\b/g, "favourite$1"],
  [/\bcolor(s?)\b/g, "colour$1"],
  [/\bflavor(s?)\b/g, "flavour$1"],
  [/\bneighbor(s?)\b/g, "neighbour$1"],
  [/\bcenter(s?)\b/g, "centre$1"],
  [/\btheater(s?)\b/g, "theatre$1"],
  [/\bcanceled\b/g, "cancelled"],
  [/\bcanceling\b/g, "cancelling"],
  [/\btraveler(s?)\b/g, "traveller$1"],
  [/\bapologiz(e|ed|es|ing)\b/g, "apologis$1"],
  [/\borganiz(e|ed|es|ing)\b/g, "organis$1"],
  [/\brealiz(e|ed|es|ing)\b/g, "realis$1"],
  [/\bcheckout\b/g, "check out"],
  [/\bcheckin\b/g, "check in"],
  [/\bpickup\b/g, "pick up"],
  [/\bbath robe(s?)\b/g, "bathrobe$1"],
  [/\bturn down service\b/g, "turndown service"],
  [/\broll away\b/g, "rollaway"],
  [/\bmini bar\b/g, "minibar"],
  [/\bvoice mail\b/g, "voicemail"],
  [/\bwi fi\b/g, "wifi"],
  [/\be mail(s?)\b/g, "email$1"],
  [/\bv i p(s?)\b/g, "vip$1"],
  [/\bmister\b/g, "mr"],
  [/\bchildrens\b/g, "children's"],
  // Measured in one Front Office round: the en-US recogniser writes these
  // as one word, or with the US -z-, where the course writes them apart.
  [/\bpre ?authori[sz](\w*)/g, "preauthoris$1"],
  [/\bauthoriz(\w*)/g, "authoris$1"],
  [/\bnonsmoking\b/g, "non smoking"],
  [/\blogbook(s?)\b/g, "log book$1"],
  [/\be t a\b/g, "eta"],
];

export function normalize(s: string) {
  // Diacritics are folded before the ASCII filter below, which otherwise cut
  // "Phở" down to "ph": the recogniser writes "pho", the model said "ph", and
  // one F&B sentence could not be passed by voice at all.
  let t = ` ${s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/gi, "d")
    .toLowerCase()} `;
  for (const [re, full] of CONTRACTIONS) t = t.replace(re, full);
  // "A 10% service charge" is how the recogniser writes "ten percent".
  t = t
    .replace(/%/g, " percent ")
    .replace(/[^\w\s']/g, " ")
    .replace(/\s+/g, " ");
  for (const [re, full] of SPELLING) t = t.replace(re, full);
  return t
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
// "be" joined them after a review found "Yes, sir. Please be." and "Please
// careful. It is slippery." both passing the wet-floor safety item — the bare
// infinitive after an imperative is the same copula this list exists for.
// "there" is here as the existential subject, not as a place word: week 8
// calls "There is one near the lift." the most important structure it teaches,
// and dropping it left the sentence passing at 86%.
const GRAMMAR_TOKENS = new Set<string>(["is", "am", "are", "was", "were", "will", "be", "there"]);

/** The verbs a service sentence is a PROMISE about — check, tell, change,
 *  bring. Swapping one for another leaves the percentage untouched and
 *  reverses what the learner has just committed the hotel to.
 *
 *  It lived in the content layer, where it could only reach the weeks that
 *  call `lockWeekHeadwords`. Here it reaches every utterance in the course,
 *  including the twenty-six hand-authored weeks and every grammar model. */
export const PROMISE_VERBS = new Set<string>([
  "ask",
  "arrange",
  "bring",
  "call",
  "change",
  "check",
  "help",
  "repeat",
  "report",
  "show",
  "sign",
  "stop",
  "tell",
  "transfer",
  "wait",
]);

/** Finite verbs, in both the bare and the third-person form. The one-word
 *  allowance may never be spent on one: a sentence without its verb is not a
 *  slip, it is a different utterance, and the -s that marks the third person
 *  is the single most-taught point of the phase. */
const FINITE_VERBS = new Set<string>(
  (
    "work works start starts finish finishes come comes go goes open opens close closes " +
    "clean cleans bring brings check checks make makes take takes give gives need needs " +
    "want wants say says tell tells call calls keep keeps stay stays send sends write writes " +
    "read reads ask asks help helps wait waits serve serves pour pours cook cooks vacuum vacuums " +
    "collect collects print prints sign signs greet greets register registers deliver delivers " +
    "update updates refill refills prepare prepares wash washes fold folds rest rests " +
    "invite invites decorate decorates remember remembers arrange arranges book books " +
    "massage massages warm warms light lights meet meets show shows count counts file files " +
    "pay pays save saves attend attends mop mops dust dusts change changes report reports " +
    "transfer transfers cancel cancels dial dials email emails confirm confirms hold holds " +
    "welcome welcomes order orders repeat repeats stop stops fix fixes seat seats spell spells " +
    "go goes leave leaves sit sits put puts get gets see sees know knows come comes " +
    // Progressive forms carry the predicate on their own: "Your water bottle is
    // coming, madam." keeps only a bare copula without this one.
    "coming going waiting checking bringing cleaning working starting finishing " +
    "speaking calling asking helping looking making taking sending writing"
  ).split(" "),
);

/** Whether a word sits where the sentence's own verb has to be.
 *
 *  FINITE_VERBS is a list by name, and a list by name only ever covers the
 *  verbs somebody remembered. An audit deleted each department's OWN verbs and
 *  found eighteen Spa sentences still passing without them — including
 *  "Please undress to your comfort level, madam.", which the lesson's help tip
 *  calls the most important sentence in the lesson, and "If you feel a cramp,
 *  please signal our lifeguard.", which is a first-aid instruction.
 *
 *  So the test is positional instead. English puts the finite verb in a small
 *  number of places, and every one of those failures sits in one of them: the
 *  word right after a leading "please", after a modal, after a subject pronoun
 *  and its frequency adverb, or after a determiner-headed subject. A word in
 *  one of those slots carries the predicate whether or not anyone listed it.
 */
function holdsThePredicate(word: string, target: string): boolean {
  // Two positions the flat token list below cannot see, because it has lost
  // the full stops. The verb that OPENS a sentence is an imperative, and
  // nothing before it marks the slot: "Yes. No gloves when you use chemicals."
  // passed "No. Wear gloves when you use chemicals." on the one-word
  // allowance, with the safety instruction reversed. And the word a statement
  // LANDS on is its predicate: "The next step is." and "The service stage
  // needs." passed for the same reason.
  const LEAD = new Set([
    "yes",
    "no",
    "please",
    "sir",
    "madam",
    "certainly",
    "sure",
    "ok",
    "okay",
    "so",
    "and",
    "but",
    "of",
    "course",
  ]);
  const TAIL = new Set(["sir", "madam", "please", "now", "too", "today", "again"]);
  const LOOSE_END = new Set([
    "later",
    "instead",
    "here",
    "there",
    "soon",
    "immediately",
    "anyway",
    "first",
    "then",
    "also",
    "tonight",
    "tomorrow",
    "yet",
    "already",
    "still",
    "together",
    "outside",
    "inside",
    "upstairs",
  ]);
  const OPENS_NON_VERB = new Set([
    "i",
    "we",
    "you",
    "he",
    "she",
    "it",
    "they",
    "the",
    "a",
    "an",
    "your",
    "our",
    "my",
    "his",
    "her",
    "their",
    "this",
    "that",
    "these",
    "those",
    "there",
    "here",
    "what",
    "when",
    "where",
    "which",
    "who",
    "how",
    "why",
    "is",
    "are",
    "am",
    "was",
    "were",
    "will",
    "would",
    "can",
    "could",
    "may",
    "might",
    "must",
    "shall",
    "should",
    "do",
    "does",
    "did",
    "every",
    "each",
    "all",
    "some",
    "any",
    "not",
    "if",
    "because",
    "after",
    "before",
    "then",
    "first",
    "next",
    "just",
    "one",
    "two",
    "three",
    "four",
    "five",
  ]);
  for (const sentence of target.toLowerCase().split(/[.!?;]+/)) {
    const s = sentence
      .replace(/[^a-z' ]/g, " ")
      .split(" ")
      .filter(Boolean);
    let k = 0;
    while (k < s.length && LEAD.has(s[k]!)) k++;
    if (k < s.length - 1 && s[k] === word && !OPENS_NON_VERB.has(word)) return true;
    let e = s.length - 1;
    while (e > 0 && TAIL.has(s[e]!)) e--;
    // An adverb of time or place can close a sentence without being what it
    // says: "I will come back." is still a sentence without "later".
    if (e >= 2 && s[e] === word && !LOOSE_END.has(word)) return true;
  }
  const w = target
    .toLowerCase()
    .replace(/[^a-z' ]/g, " ")
    .split(" ")
    .filter(Boolean);
  const at = w.indexOf(word);
  if (at <= 0) return false;
  const before = w[at - 1]!;
  const twoBefore = at >= 2 ? w[at - 2]! : "";
  const SUBJECT = new Set(["i", "we", "you", "he", "she", "they", "it"]);
  const MODAL = new Set([
    "will",
    "would",
    "can",
    "could",
    "may",
    "might",
    "must",
    "shall",
    "should",
    "do",
    "does",
  ]);
  const ADVERB = new Set([
    "always",
    "never",
    "often",
    "usually",
    "sometimes",
    "just",
    "then",
    "also",
  ]);
  const DETERMINER = new Set(["the", "a", "an", "your", "our", "my", "this", "that"]);
  if (before === "please") return true;
  if (MODAL.has(before)) return true;
  // "Do not FORGET to check again later." lost its verb and passed as "Do not
  // to check again later." — the modal is one word further back.
  if (before === "not" && MODAL.has(twoBefore)) return true;
  if (SUBJECT.has(before)) return true;
  if (ADVERB.has(before) && (SUBJECT.has(twoBefore) || MODAL.has(twoBefore))) return true;
  // "The price includes locker access." — determiner, head noun, then the verb.
  if (at >= 2 && DETERMINER.has(twoBefore)) return true;
  return false;
}

/** Words a lesson is ABOUT, which the one-word allowance must never spend
 *  itself on. The allowance says a long model may lose one word; it did not
 *  say WHICH, so a review found ten items where the droppable word was the
 *  point: "Please change here. I will wait." passed a model ending "…I will
 *  wait outside." in the lesson whose rule is "say where they change and say
 *  that you leave — two halves, neither missing"; "because" fell out of both
 *  reason clauses; "sometimes" and "twice" fell out of the frequency frames;
 *  "some" fell out of four requests. */
const STRUCTURE_TOKENS = new Set<string>([
  "because",
  "when",
  "while",
  "after",
  "before",
  "until",
  "always",
  "usually",
  "sometimes",
  "often",
  "never",
  "twice",
  "another",
  "some",
  "more",
  "outside",
  "inside",
  "upstairs",
  "downstairs",
]);

/** Words whose absence inverts the outcome rather than blurring it. A wet
 *  floor warned about without "careful" is not a warning; a treatment
 *  described without "hot" is not a caution. A review found seven such
 *  utterances passing while missing exactly this word. */
const SAFETY_TOKENS = new Set<string>([
  "careful",
  "carefully",
  "slowly",
  "hot",
  "wet",
  "slippery",
  "allergy",
  "allergic",
  "doctor",
  "emergency",
  "fire",
  "smoke",
  "danger",
]);

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
  // "if" arrived after a review found the near-miss "Tell me it is too hot."
  // passing its own model "Please tell me if it is too hot." — the conjunction
  // was the whole difference and nothing was watching it.
  "if",
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
  const toks = foldCourtesy(normalize(target));
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
        // A comparative standing beside its own base form is the whole lesson
        // of week 10: "This one is warmer. That one is warm." Dropping the
        // "-er" left the pair passing at 88%.
        if (t.endsWith("er") && (toks.includes(t.slice(0, -2)) || toks.includes(t.slice(0, -1))))
          return true;
        return (
          VALUE_TOKENS.has(t) ||
          GRAMMAR_TOKENS.has(t) ||
          NEGATION_TOKENS.has(t) ||
          PROMISE_VERBS.has(t) ||
          SAFETY_TOKENS.has(t) ||
          STRUCTURE_TOKENS.has(t)
        );
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
    ...particleTokens(toks),
  ];
}

/** Verb + particle pairs where the particle IS the meaning.
 *
 *  "Send it UP", "write it DOWN", "come BACK" — the particle is short, it is a
 *  function word, and the content allowance was designed to forgive exactly
 *  that shape. Measured: five of eight such targets passed with the particle
 *  gone, including two where the phrasal verb is the headword the week exists
 *  to teach. "Of course. Let me send it for you." passed a `Send it up` item
 *  at 88%; "I write it because the shift changes." passed a `Write it down`
 *  item at 88%.
 *
 *  Locked against the VERB rather than by a list of bare particles: "back" in
 *  "at the back of the lounge" is a place and stays droppable, while "back" in
 *  "I will come back" is half the promise. */
const PHRASAL_VERBS: Record<string, string[]> = {
  send: ["up", "back"],
  write: ["down"],
  wrote: ["down"],
  writes: ["down"],
  come: ["back"],
  comes: ["back"],
  call: ["back"],
  calls: ["back"],
  go: ["home", "back"],
  goes: ["home", "back"],
  hold: ["on"],
  hang: ["up"],
  pick: ["up"],
  wake: ["up"],
  sit: ["down"],
  put: ["on", "down"],
  take: ["off", "back"],
  turn: ["on", "off"],
  fill: ["in"],
  check: ["in", "out"],
  bring: ["back", "up"],
  brings: ["back", "up"],
};
function particleTokens(toks: string[]): string[] {
  const out: string[] = [];
  for (let i = 0; i < toks.length; i++) {
    const parts = PHRASAL_VERBS[toks[i]];
    if (!parts) continue;
    // Up to three tokens of object may sit between the verb and its particle —
    // "send IT up", "write THE NUMBER down" — but no further, or the next
    // sentence's "back" would be claimed by this sentence's "come".
    for (let j = i + 1; j <= Math.min(i + 3, toks.length - 1); j++) {
      if (parts.includes(toks[j])) {
        out.push(toks[j]);
        break;
      }
    }
  }
  return out;
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
  // "of course" left this list when foldCourtesy arrived: the pair is folded
  // to one token with "certainly" before anything counts it, so locking both
  // halves here made every model that opens with it reject the synonym the
  // course itself prints as an arcade key.
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
const ARTICLES = new Set<string>(["a", "an", "the"]);
const FORGIVABLE_FUNCTION_TOKENS = new Set<string>([...ARTICLES, "my", "your", "our"]);

/** Noise a microphone adds and no lesson ever teaches. Exempt from the
 *  inserted-word check below, along with articles and honorifics. */
const DISFLUENCY = new Set<string>(["uh", "um", "er", "ah", "eh", "hmm", "mm", "ok", "okay"]);

/** Words the course itself teaches as an UPGRADE to a model sentence, and
 *  which therefore must never fail one.
 *
 *  The inserted-word rule was written to stop "He is works here every day."
 *  and "The car park is near at the lift." from passing, and it does. But it
 *  counted by number rather than by kind, so it also failed "I am VERY sorry,
 *  madam. I will check it." at accuracy 100 and orderRatio 1.00 — while week
 *  13 of the same department prints "I am very sorry, sir." as its own model.
 *  Measured: "Certainly" for "Of course" failed 16 of 16 items whose own
 *  arcade key is "Certainly, madam. One moment."; a grammatical "now" failed
 *  130 of 130.
 *
 *  An added intensifier or courtesy marker cannot make a service sentence
 *  wrong. An added auxiliary, pronoun or preposition can, and those are not
 *  here. */
const COURTESY_EXTRAS = new Set<string>([
  // "yes" is here because the negation docstring in this file already says an
  // affirmative is never required, and the content rule below was requiring it:
  // "sir. The bartender is here." scored 83% against "Yes, sir. The bartender
  // is here." and failed. Twelve of fifteen Yes-opening F&B items failed that
  // way, and 13-15 of 16 in the other four departments.
  "yes",
  "please",
  "very",
  "now",
  "certainly",
  "just",
  "really",
  "kindly",
  "so",
  // Four managers ran their own sentences through the grader and reported the
  // same shape: "Please DO keep your valuables in the safety box, madam." and
  // "First I check the arrival list AND then I greet in the lobby." are
  // graded wrong for one word that changes nothing. "and" is a connective the
  // course teaches as an upgrade; "do" is emphatic; "sorry" opens half the
  // service apologies in the phase. Everything else stays: a single added
  // preposition is still the near-miss column's commonest error.
  "and",
  "do",
  "sorry",
]);

/** What is left of a model sentence once the grammar and the courtesy are
 *  taken out: the words that carry what it says. */
const isContentToken = (t: string) =>
  // A verb counts however short it is. The length floor exists to keep
  // two-letter glue out of the content list, and it was also keeping "go" out:
  // "I go to the pool bar first." passed with the verb missing, because a word
  // that never becomes content is a word the verb lock never sees.
  (t.length >= 3 || FINITE_VERBS.has(t)) &&
  !FUNCTION_TOKENS.has(t) &&
  !GRAMMAR_TOKENS.has(t) &&
  !COURTESY_EXTRAS.has(t) &&
  !DISFLUENCY.has(t) &&
  !HONORIFIC.test(t);

/** The function words this target actually contains, WITH REPETITION.
 *
 *  Deduplicating them hid every second occurrence: "The lobby is on the left,
 *  sir." reduced to [the, on], so a learner could drop one of its two "the"s
 *  and the grader saw nothing missing at all. */
export function requiredFunctionTokens(target: string): string[] {
  return foldCourtesy(normalize(target)).filter((t) => FUNCTION_TOKENS.has(t));
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

/** "Of course" and "Certainly" are the same move, and the course prints both
 *  as models — "Of course, madam. I will bring one." in one week, "Certainly,
 *  madam. One moment." as an arcade key in another. Graded apart, saying the
 *  second one failed all 81 items that model the first: accuracy fell to 33%
 *  because two of three target words went missing at once. Folded to one
 *  token before anything is counted. */
function foldCourtesy(toks: string[]) {
  const out: string[] = [];
  for (let i = 0; i < toks.length; i++) {
    if (toks[i] === "of" && toks[i + 1] === "course") {
      out.push("certainly");
      i++;
      continue;
    }
    // "One moment" and "a moment" are the same wait. The required-token layer
    // has exempted the formulaic "one" for a long time, but the percentage and
    // the order ratio still counted it, so the sentence the exemption exists
    // for — "Certainly, madam. A moment." — failed anyway, at 40% accuracy.
    if (toks[i] === "one" && toks[i + 1] === "moment") {
      out.push("a");
      continue;
    }
    // "May I", "Can I" and "Could I" open the same request, and the course
    // teaches all three — week 17 prints "May I ask about your pillow type?"
    // two screens after grading "May I have your coffee preference?" wrong
    // for the word "may". Twenty-three of twenty-three swaps failed.
    if ((toks[i] === "may" || toks[i] === "can") && toks[i + 1] === "i") {
      out.push("could");
      continue;
    }
    // "right away", "straight away" and "right now" promise the same thing as
    // "now", which is the word the models use.
    if ((toks[i] === "right" || toks[i] === "straight") && toks[i + 1] === "away") {
      out.push("now");
      i++;
      continue;
    }
    if (toks[i] === "right" && toks[i + 1] === "now") {
      out.push("now");
      i++;
      continue;
    }
    // "I am not able to", "I am unable to" and "I cannot" refuse the same
    // thing, and the course models both ("I am not able to do that, madam."
    // beside "I cannot give a room number"). Three manager reviews had the
    // other form fail in the authority items that matter most.
    const be = (t?: string) => t === "am" || t === "is" || t === "are";
    const refusal =
      toks[i] === "not" && toks[i + 1] === "able" && toks[i + 2] === "to"
        ? 3
        : toks[i] === "unable" && toks[i + 1] === "to"
          ? 2
          : toks[i] === "can" && toks[i + 1] === "not"
            ? 2
            : 0;
    if (refusal) {
      if (refusal !== 2 || toks[i] === "unable") if (be(out[out.length - 1])) out.pop();
      out.push("cannot");
      i += refusal - 1;
      continue;
    }
    // "Let me check" is "I will check" said warmly.
    if (toks[i] === "let" && toks[i + 1] === "me") {
      out.push("i", "will");
      i++;
      continue;
    }
    out.push(toks[i]!);
  }
  return out;
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

export function compareWords(
  spoken: string,
  target: string,
  honorificFree = false,
  daypartFree = false,
) {
  const a = foldCourtesy(
    canonDaypart(canonHonorific(normalize(spoken), honorificFree), daypartFree),
  );
  const b = foldCourtesy(
    canonDaypart(canonHonorific(normalize(target), honorificFree), daypartFree),
  );
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
/** Openers that frame a service sentence without changing what it says, in
 *  two classes: an apology and an acceptance. */
const APOLOGY_OPENERS: string[][] = [
  ["i", "am", "very", "sorry"],
  ["i", "am", "so", "sorry"],
  ["i", "am", "sorry"],
  ["i", "am", "afraid"],
  ["i", "do", "apologise"],
  ["sorry"],
];
const ACCEPT_OPENERS: string[][] = [
  ["of", "course"],
  ["certainly"],
  ["absolutely"],
  ["no", "problem"],
  ["my", "pleasure"],
  ["sure"],
];
const COURTESY_OPENERS: string[][] = [
  ["thank", "you", "very", "much"],
  ["thank", "you"],
  ...APOLOGY_OPENERS,
  ...ACCEPT_OPENERS,
  ["yes"],
];
const COURTESY_CLOSERS: string[][] = [
  ["thank", "you", "very", "much"],
  ["thank", "you"],
  ["for", "you"],
  ["right", "away"],
  ["straight", "away"],
  ["right", "now"],
  ["now"],
  ["please"],
];
const opensWith = (a: string[], p: string[]) => p.every((t, i) => a[i] === t);
const closesWith = (a: string[], p: string[]) =>
  a.length >= p.length && p.every((t, i) => a[a.length - p.length + i] === t);

/** A courtesy frame the model does not carry is not an error in the answer.
 *
 *  Ten reviews in one round ran what a good member of staff actually says
 *  through this grader, and it failed nearly all of it: "Thank you. I will ask
 *  my manager before we begin." (0 of 258 items passed with "Thank you." in
 *  front), "…I will check with the kitchen for you.", "I am afraid I cannot
 *  confirm that, sir." where the model opens "I am sorry". The learner had
 *  said the model sentence and been polite about it, and the screen told them
 *  an extra word made it wrong.
 *
 *  So a frame is lifted off the EDGES of the answer before grading, and only
 *  where the model does not open or close the same way. Nothing in the middle
 *  of the sentence is touched, and the middle is where every hand-written
 *  near miss in the course puts its error ("Could I TO have…", "I DID
 *  confirmed…"): the course's own wrong answers were run through this with and
 *  without "Thank you." in front, and none of them passes. An apology opener
 *  may also stand in for the model's own apology opener, and an acceptance for
 *  an acceptance — "I am afraid" for "I am sorry", "Certainly" for "Sure". */
function stripCourtesyFrame(spoken: string, target: string): string {
  let a = normalize(spoken);
  const b = normalize(target);
  for (const cls of [APOLOGY_OPENERS, ACCEPT_OPENERS]) {
    const theirs = cls.find((p) => opensWith(b, p));
    const mine = cls.find((p) => opensWith(a, p));
    // Only with a sentence left after it: "Sorry sorry." against "I am very
    // sorry, sir." would otherwise become the model's own apology and pass.
    if (!theirs || !mine || theirs === mine || a.length - mine.length < 2) continue;
    const rest = a.slice(mine.length);
    // "I am sorry, I am afraid that is not allowed" already carries the
    // model's opener after the learner's own: drop the extra one, do not
    // stack a second copy of it.
    a = opensWith(rest, theirs) ? rest : [...theirs, ...rest];
  }
  for (let guard = 0; guard < 4; guard++) {
    const op = COURTESY_OPENERS.find((p) => opensWith(a, p) && !opensWith(b, p));
    if (!op || a.length - op.length < 2) break;
    a = a.slice(op.length);
    // "Certainly, madam." — the honorific belongs to the opener it follows.
    if (/^(sir|madam|ma'am|maam)$/.test(a[0] ?? "") && !/^(sir|madam|ma'am|maam)$/.test(b[0] ?? ""))
      a = a.slice(1);
  }
  for (let guard = 0; guard < 3; guard++) {
    const cl = COURTESY_CLOSERS.find((p) => closesWith(a, p) && !closesWith(b, p));
    if (!cl || a.length - cl.length < 2) break;
    a = a.slice(0, a.length - cl.length);
  }
  return a.join(" ");
}

/** utterancePassed against each answer the course teaches for the line, in
 *  order: the first that passes is the verdict, and if none does the verdict
 *  is the item's own. Every answer is graded at full strictness — see
 *  speaking-alternates.ts for where the list comes from. */
export function utterancePassedAny(
  spoken: string,
  answers: { target: string; requiredTokens?: string[] }[],
  sourceWeek: string | number,
  guestPrompt?: string,
) {
  let own: ReturnType<typeof utterancePassed> | undefined;
  for (const a of answers) {
    const verdict = utterancePassed(spoken, a.target, sourceWeek, a.requiredTokens, guestPrompt);
    if (verdict.passed) return verdict;
    own ??= verdict;
  }
  return own ?? utterancePassed(spoken, "", sourceWeek, undefined, guestPrompt);
}

export function utterancePassed(
  spoken: string,
  target: string,
  sourceWeek: string | number,
  requiredTokens?: string[],
  guestPrompt?: string,
) {
  spoken = stripCourtesyFrame(spoken, target);
  const th = passThresholds(sourceWeek);
  const free = honorificIsFree(guestPrompt);
  const dayFree = greetingIsFree(target, guestPrompt);
  const cmp = compareWords(spoken, target, free, dayFree);
  // The same canonicalisation compareWords applies, so an honorific or a
  // day-part the item has freed is not counted as an inserted word below.
  const canonSpoken = foldCourtesy(canonDaypart(canonHonorific(normalize(spoken), free), dayFree));
  const canonSpokenTarget = foldCourtesy(
    canonDaypart(canonHonorific(normalize(target), free), dayFree),
  );
  // A value token said wrong or not at all fails the utterance regardless of
  // the percentage — see VALUE_TOKENS. Checked against the normalized spoken
  // stream, so ASR digits ("205" → two oh five) still count.
  const spokenSet = new Set(foldCourtesy(normalize(spoken)));
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
  // BY OCCURRENCE. A Set said "the answer contains `is`" and stopped there, so
  // a model that needs the copula twice passed with one of them gone: "This
  // one brighter. That one is bright." against "This one IS brighter. That one
  // is bright." at 88% accuracy. Eleven items behaved that way — the same
  // shape of bug this file already fixed once for the function tokens, and the
  // fix never reached this line.
  // How many times each gated token is needed comes from the TARGET, not from
  // the gated list — that list is a set of rules and can name the same token
  // twice (requiredValueTokens finds "madam", then the honorific rule pushes
  // it again), which would demand two of something the model says once.
  const gatedSet = new Set(gated);
  const requiredSeq = foldCourtesy(normalize(target)).filter((t) => gatedSet.has(t));
  const requiredTally = new Map<string, number>();
  for (const t of foldCourtesy(normalize(spoken)))
    requiredTally.set(t, (requiredTally.get(t) ?? 0) + 1);
  const missingRequired: string[] = [];
  for (const t of requiredSeq) {
    const left = requiredTally.get(t) ?? 0;
    if (left > 0) requiredTally.set(t, left - 1);
    else missingRequired.push(t);
  }
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
  for (const t of foldCourtesy(normalize(spoken)))
    spokenTally.set(t, (spokenTally.get(t) ?? 0) + 1);
  const missingFunction: string[] = [];
  for (const t of funcNeeded) {
    const left = spokenTally.get(t) ?? 0;
    if (left > 0) spokenTally.set(t, left - 1);
    else missingFunction.push(t);
  }
  // A missing preposition, pronoun or auxiliary is never covered by the
  // allowance — only a missing article is.
  //
  // But "only an article" turned into "every article, free". 674 of the 761
  // Phase 2 targets that carry an article carry exactly ONE, so the allowance
  // handed that one away every time: a learner who drops every article passed
  // 55.3% of those items and 88.3% of five-item oral sittings — while the
  // grammar block two screens away prints "Please keep your handbag in safety
  // box." as the WRONG answer, and the course calls the missing article the
  // single L1 error it exists to unlearn. Two graders on the same course
  // cannot disagree about its own central point.
  //
  // The rule the file already applies to function words in general settles it:
  // a target carrying exactly one of them means that one IS the lesson
  // (see functionAllowance). So an article is forgiven only where the target
  // has another to prove the learner produces them — and only from Phase 2,
  // where articles have been taught outright and the pass threshold has risen.
  // Weeks 1-14 keep the old allowance untouched: A1 learners, and twelve
  // rounds of tuning behind them.
  const articlesRequired = funcNeeded.filter((t) => ARTICLES.has(t)).length;
  const articleIsTheLesson = Number(sourceWeek) >= 15 && articlesRequired < 2;
  const unforgivable = missingFunction.filter(
    (t) => !FORGIVABLE_FUNCTION_TOKENS.has(t) || (articleIsTheLesson && ARTICLES.has(t)),
  );
  // WORDS THAT WERE NOT IN THE MODEL.
  //
  // Both `accuracy` and `orderRatio` divide by the TARGET, so nothing the
  // learner adds can lower either one. Measured on the whole of Phase 1:
  // wrapping every model sentence in nonsense — "Banana I work in Guest
  // Relations sir banana banana." — passed 632 of 632 items at accuracy 100
  // and orderRatio 1.00, and 204 of the 320 `nearMiss` strings the course
  // itself prints as the WRONG answer passed the oral item they belong to.
  // Almost every one of them is an insertion: "He is works here every day.",
  // "Please you ask our duty manager.", "The car park is near at the lift."
  //
  // Counted by occurrence against the canonicalised target, so a repeated
  // word is only free as often as the model says it. Honorifics and "please"
  // are never counted — over-politeness is not an error — and neither is a
  // spare article, which is the one thing a microphone really does add.
  const targetTally = new Map<string, number>();
  for (const t of canonSpokenTarget) targetTally.set(t, (targetTally.get(t) ?? 0) + 1);
  const extra: string[] = [];
  for (const t of canonSpoken) {
    const left = targetTally.get(t) ?? 0;
    if (left > 0) targetTally.set(t, left - 1);
    else extra.push(t);
  }
  const inserted = extra.filter(
    (t) => !HONORIFIC.test(t) && !COURTESY_EXTRAS.has(t) && !ARTICLES.has(t) && !DISFLUENCY.has(t),
  );
  // One is already one too many, and it has to stay that way. Forgiving one
  // insertion on an otherwise-perfect reading looked safe and let 95 of the
  // course's own 255 nearMiss strings pass: "…then I WILL check the profile.",
  // "Could you TO come this way?", "I DID confirmed it yesterday." are the
  // model plus one word, which is the commonest wrong-answer shape in the
  // whole phase. The managers' sentences are handled by naming their words in
  // COURTESY_EXTRAS instead, which is narrow enough to measure.
  const insertionFails = inserted.length > 0;
  // WORDS THE MODEL SAYS AND THE ANSWER DID NOT.
  //
  // The percentage threshold is 60% at A1, which is generous on purpose — but
  // generous per WORD, so a four-word model loses its only verb and still
  // scores 75%. Two reviews measured the same hole from two departments:
  // "The cleaner at eight." passed "The cleaner starts at eight." whose own
  // helpTip is "third person singular takes -s: startS"; "Yes, is one near
  // the lift." passed "Yes, there is one near the lift." whose helpTip calls
  // "there is" the most important structure of the week; "Our linen attendant
  // is on madam." passed while dropping "duty". Across the phase, 36-41% of
  // single-content-word deletions passed.
  //
  // requiredValueTokens cannot cover this: it locks numbers, promises, safety
  // words and whatever a frame names, and the words above are none of those —
  // they are simply the sentence. So the content of the model is graded as
  // content: a short model may lose nothing, a long one may lose one word.
  const contentTally = new Map<string, number>();
  for (const t of canonSpoken) contentTally.set(t, (contentTally.get(t) ?? 0) + 1);
  // Same exemption the required-token layer makes: the "one" of "one moment"
  // is formulaic, and "Certainly, madam. A moment." is a correct answer.
  const targetContent = canonSpokenTarget.filter(
    (t, i) => isContentToken(t) && !(t === "one" && canonSpokenTarget[i + 1] === "moment"),
  );
  const missingContent: string[] = [];
  for (const t of targetContent) {
    const left = contentTally.get(t) ?? 0;
    if (left > 0) contentTally.set(t, left - 1);
    else missingContent.push(t);
  }
  // Was >= 5, which meant 88% of Phase 1 targets had no allowance at all and
  // the published 60% threshold became 100% in practice: an honest learner who
  // dropped one non-required word passed 17% of items at 80-88% accuracy. At
  // >= 4 the short models still hold every word — "The cleaner starts at
  // eight." has three, and "starts" is the lesson — while the longer ones get
  // the single slip the threshold was always meant to allow.
  // Two reviews pulled this in opposite directions and both were right. At >=5
  // then >=4, 88% then 68% of Phase 1 models had no allowance at all, so the
  // published 60% threshold was 100% in practice and an honest learner who
  // dropped one ordinary word failed at 80-89% accuracy. But widening it let
  // the MAIN VERB go: "The morning shift at ten." passed "The morning shift
  // finishes at ten." — in the item whose helpTip is "a verb ending in -sh
  // takes -es: finishES".
  //
  // The answer was never the threshold. A verb is not an ordinary word: the
  // sentence stops being a sentence without it. So the allowance opens at
  // three content words, and never spends itself on a verb.
  const contentAllowance = targetContent.length >= 3 ? 1 : 0;
  // The allowance never spends itself on a word whose loss strands a
  // determiner. "We always walk the out.", "Our has four steps.", "A will be
  // free soon." and "The red flag is a about rough sea." all passed on the
  // one-word allowance — three reviews quoted them, and 47.8% of the Phase 2
  // deletions that leave "the", "a" or "our" pointing at nothing passed. A
  // dropped adjective ("the hot stone massage" → "the stone massage") still
  // leaves a sentence, so only a determiner left with no noun after it counts.
  const ORPHANING = new Set(["a", "an", "the", "your", "our", "my", "their", "every", "each"]);
  // What may follow a determiner without being the noun it needs. These are
  // long enough to count as content, so "We always walk the out." and "The red
  // flag is a about rough sea." slipped past a check that only asked whether
  // the next word was content.
  const NOT_A_NOUN = new Set([
    "out",
    "up",
    "down",
    "off",
    "back",
    "over",
    "away",
    "here",
    "there",
    "now",
    "today",
    "again",
    "too",
    "first",
    "about",
    "for",
    "with",
    "from",
    "into",
    "near",
    "after",
    "before",
    "until",
    "then",
    "please",
    "sir",
    "madam",
  ]);
  const spokenCount = new Map<string, number>();
  for (const t of canonSpoken) spokenCount.set(t, (spokenCount.get(t) ?? 0) + 1);
  const seenAt = new Map<string, number>();
  let orphanDeterminer = false;
  canonSpokenTarget.forEach((t, i) => {
    const k = seenAt.get(t) ?? 0;
    seenAt.set(t, k + 1);
    if (!isContentToken(t) || (t === "one" && canonSpokenTarget[i + 1] === "moment")) return;
    if (k < (spokenCount.get(t) ?? 0)) return;
    const prev = canonSpokenTarget[i - 1];
    const next = canonSpokenTarget[i + 1];
    if (prev && ORPHANING.has(prev) && (!next || !isContentToken(next) || NOT_A_NOUN.has(next)))
      orphanDeterminer = true;
  });
  // BY OCCURRENCE, not by presence. `missingContent` is already built that way,
  // so asking it whether a verb is missing is right — but the earlier draft
  // asked the spoken SET instead, and a model that uses a verb twice kept
  // passing with one copy gone: "This one brighter. That one is bright."
  // against "This one IS brighter…" at 88%. Eleven items behaved that way, the
  // same shape of bug this file already fixed once for function tokens.
  const missingVerb =
    missingContent.some((t) => FINITE_VERBS.has(t)) ||
    missingContent.some((t) => holdsThePredicate(t, target));
  const added = addedNegation(spoken, target);
  const inflection = inflectionErrors(spoken, target);
  return {
    ...cmp,
    missingRequired,
    missingFunction,
    missingContent,
    insertedWords: inserted,
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
      !insertionFails &&
      missingContent.length <= contentAllowance &&
      !orphanDeterminer &&
      !missingVerb &&
      missingFunction.length <= functionAllowance(funcNeeded.length) &&
      added.length === 0 &&
      inflection.length === 0,
    threshold: th,
  };
}
