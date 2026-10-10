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
  [/\borganiz(e|ed|es|ing|ation|ations)\b/g, "organis$1"],
  [/\brealiz(e|ed|es|ing)\b/g, "realis$1"],
  // The doubled -l- before -ing/-ed, and the rest of the -our and -ise
  // families Phase 4 writes. A blind review of Phase 4 found its must-be-right
  // emergency line failing word for word on "dialing" for "dialling".
  [/\bdial(ing|ed)\b/g, "diall$1"],
  [/\btravel(ing|ed)\b/g, "travell$1"],
  [/\blabel(ing|ed)\b/g, "labell$1"],
  [/\bsignal(ing|ed)\b/g, "signall$1"],
  [/\blevel(ing|ed)\b/g, "levell$1"],
  [/\bmodel(ing|ed)\b/g, "modell$1"],
  [/\bfuel(ing|ed)\b/g, "fuell$1"],
  [/\bchannel(ing|ed)\b/g, "channell$1"],
  [/\bhonor(s|ed|ing|able)?\b/g, "honour$1"],
  [/\bbehavior(s?)\b/g, "behaviour$1"],
  [/\bfavor(s|ed|ing)?\b/g, "favour$1"],
  [/\bhumor\b/g, "humour"],
  [/\bharbor(s?)\b/g, "harbour$1"],
  [/\bodor(s?)\b/g, "odour$1"],
  [/\brumor(s?)\b/g, "rumour$1"],
  [/\bprogram(s?)\b/g, "programme$1"],
  [/\bmeter(s?)\b/g, "metre$1"],
  [/\bliter(s?)\b/g, "litre$1"],
  [/\bgray\b/g, "grey"],
  [/\bpajamas\b/g, "pyjamas"],
  [/\bpractis(e|ed|es|ing)\b/g, "practic$1"],
  [/\banalyz(e|ed|es|ing)\b/g, "analys$1"],
  [
    /\b(recogn|priorit|minim|emphas|special|personal|custom|final|author|summar|sympath|memor|util|critic|sanit|steril|stabil|optim|categor|standard|familiar|visual|maxim|summar)iz(e|ed|es|ing|ation|ations)\b/g,
    "$1is$2",
  ],
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
    // An apostrophe at the edge of a word is a quote mark or a plural
    // possessive, never part of the word a recogniser writes: "for our
    // guests' safety" kept the token "guests'" and failed every typed reply,
    // and "Say 'One moment, sir'" kept "'one" and "sir'".
    .replace(/(^|\s)'+/g, "$1")
    .replace(/'+(?=\s|$)/g, "")
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
  "speak",
  "stop",
  "take",
  "tell",
  "transfer",
  "wait",
  // "be" is a promise whenever a time follows it, and the paper reads this
  // list to decide whether two replies make the SAME promise: "Certainly. It
  // will be ready in ten minutes." and "Certainly. I will speak to the chef."
  // both carried no listed verb, so an apology-plus-promise pair the listening
  // block exists to separate was printed as key and distractor under one
  // audio. Same for "I will take it back now."
  "be",
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
    // "Ask him to LET go of you." The causative is a bare verb like any other,
    // and it was missing because foldCourtesy rewrites the only shape anyone
    // remembered — "let me" becomes "i will" — so nothing else in the file
    // ever had to name it. Without it that sentence passed as "Ask him to go
    // of you.", in the week-39 turn on a guest who has taken hold of a
    // colleague.
    "let lets " +
    // Progressive forms carry the predicate on their own: "Your water bottle is
    // coming, madam." keeps only a bare copula without this one.
    "coming going waiting checking bringing cleaning working starting finishing " +
    "speaking calling asking helping looking making taking sending writing " +
    // MODALS. A modal is the finite verb of its clause, and dropping one is
    // not a slip: "Every detail be accurate." passed "Every detail MUST be
    // accurate." on the one-word content allowance, in the phase whose own
    // grammar rule is the shape of `must` (phase2.ts: "Sau 'must' là động từ
    // nguyên mẫu KHÔNG có 'to'"). Same shape: "Which seafood we avoid?" for
    // "Which seafood MUST we avoid?" on the seafood-allergy turn. Measured
    // before this: 8 of 30 `must` deletions passed in Phase 2, 5 of 5
    // `should` in Phase 3, 4 of 9 in Phase 4.
    //
    // Only these three are listed. may/can/could/would/shall are already
    // FUNCTION_TOKENS, so they never become content and can never reach
    // missingContent — listing them here would read as a rule and be a no-op.
    // They are refused one line further down instead, as unforgivable
    // function words, which is where the file already put them.
    "must should might"
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
    // The forms of TO BE, and "cannot". A past participle or an -ing form
    // after them is the predicate just as surely as a bare verb after "will"
    // is, and without them the one-word content allowance was being spent on
    // exactly those words: 190 of 513 P2 targets passed with the word right
    // after a be-form or "cannot" deleted. "A service charge is to your bill."
    // (no `added`), "Just a moment. I am your registration card." (no
    // `preparing`), "I cannot that, madam." (no `decide`) and "I am that is
    // not allowed, sir." (no `afraid`) all passed before this line.
    "is",
    "are",
    "am",
    "was",
    "were",
    "been",
    "being",
    "cannot",
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
  // The quantifiers head a subject exactly as "the" does — "MANY guests choose
  // the twin room, and they are happy." passed with its verb deleted because
  // the list stopped at the articles and the possessives.
  const DETERMINER = new Set([
    "the",
    "a",
    "an",
    "your",
    "our",
    "my",
    "this",
    "that",
    "these",
    "those",
    "their",
    "his",
    "her",
    "its",
    "every",
    "each",
    "all",
    "both",
    "many",
    "some",
    "several",
    "few",
    "most",
  ]);
  if (before === "please") return true;
  if (MODAL.has(before)) return true;
  // "Do not FORGET to check again later." lost its verb and passed as "Do not
  // to check again later." — the modal is one word further back.
  if (before === "not" && MODAL.has(twoBefore)) return true;
  if (SUBJECT.has(before)) return true;
  if (ADVERB.has(before) && (SUBJECT.has(twoBefore) || MODAL.has(twoBefore))) return true;
  // "The price includes locker access." — determiner, head noun, then the verb.
  if (at >= 2 && DETERMINER.has(twoBefore)) return true;
  // THE SUBJECT IS NOT ALWAYS TWO WORDS LONG.
  //
  // The line above reads one fixed distance — determiner, ONE noun, then the
  // verb — so a subject of three words or more lost the check entirely. "The
  // DUTY manager approved an upgrade." puts its determiner three back, and
  // the sentence passed with `approved` deleted; so did "Many guests CHOOSE
  // the twin room, and they are happy." Eight of the eleven surviving verb
  // deletions sat in weeks 21-22, where the past tense IS the content.
  //
  // So the determiner may sit anywhere earlier in the SAME CLAUSE, and the
  // clause is what bounds it: without that bound "…, and they are happy"
  // would read the determiner of the clause before it. A clause ends at a
  // comma, a full stop or a conjunction.
  //
  // Two conditions bound it, and both were measured against the alternative
  // rather than argued. The determiner must OPEN the clause, because one that
  // opens a clause heads its SUBJECT while one in the middle heads an OBJECT:
  // the literal reading of the recommendation — any determiner anywhere
  // earlier — was built and run, and it fails "Please keep your handbag in
  // the box." against "…in the safety box.", which is the one-word content
  // allowance the A1 and A2 weeks are built on. And the span between the two
  // must contain no verb, modal, determiner or preposition, because once one
  // of those has gone by the predicate has already been found.
  //
  // WHAT IT COSTS, stated rather than implied. Inside a clause-initial noun
  // phrase the rule cannot tell a modifier from the verb, because the only
  // verb signal it has is FINITE_VERBS and that list is admittedly partial —
  // "includes" is not on it, so "The price includes LOCKER access." now
  // refuses to lose `locker` too. That is a tightening on a modifier noun in
  // the subject region, and it is the price of reaching `approved` in "The
  // duty manager approved an upgrade." Measured with the patch isolated from
  // the rest of this round: single-token deletions pass 19.8% → 19.5% in
  // Phase 2, 18.5% → 17.7% in Phase 3 and 25.2% → 24.8% in Phase 4, no phase
  // moves the other way, every model still passes itself 100% of the time on
  // both grading paths, and the course's own nearMiss and rude strings leak
  // exactly the set they leaked before.
  const CLAUSE_BREAK = new Set([
    "and",
    "or",
    "but",
    "because",
    "when",
    "while",
    "if",
    "so",
    "then",
    "that",
    "which",
    "after",
    "before",
    "until",
    "although",
    "though",
    "unless",
  ]);
  const SPAN_STOP = new Set([
    ...MODAL,
    ...DETERMINER,
    ...FINITE_VERBS,
    ...PREPOSITION_TOKENS,
    "at",
    "in",
    "on",
    "to",
    "of",
    "for",
    "not",
  ]);
  for (const clause of clausesOf(target, CLAUSE_BREAK)) {
    if (!DETERMINER.has(clause[0] ?? "")) continue;
    const i = clause.indexOf(word);
    if (i < 2) continue;
    if (clause.slice(1, i).some((x) => SPAN_STOP.has(x))) continue;
    return true;
  }
  return false;
}

/** The target cut into clauses: punctuation and conjunctions both end one.
 *  Written here rather than inline because holdsThePredicate needs the
 *  commas, and the flat token stream above has already thrown them away. */
function clausesOf(target: string, breaks: Set<string>): string[][] {
  const out: string[][] = [[]];
  for (const tk of target
    .toLowerCase()
    .replace(/[.,!?;:]+/g, " | ")
    .replace(/[^a-z'| ]/g, " ")
    .split(" ")
    .filter(Boolean)) {
    if (tk === "|" || breaks.has(tk)) out.push([]);
    else out[out.length - 1]!.push(tk);
  }
  return out;
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

/** The prepositions and contrastive connectives that FUNCTION_TOKENS does not
 *  hold, required outright.
 *
 *  FUNCTION_TOKENS listed six prepositions — at, in, on, to, of, for — so
 *  every other one was an ordinary CONTENT word and the one-word content
 *  allowance ate it. Measured by deleting exactly one of them from each model
 *  and asking this grader: 58.3% of those deletions still passed in Phase 2,
 *  68.7% in Phase 3, 61.7% in Phase 4, against 0.0% for the six that were
 *  listed. The course's own rule is "a missing article still passes, a
 *  missing preposition does not", and it was being applied to six words out
 *  of sixteen.
 *
 *  The sharpest pair: "It started later than usual, because we were busy."
 *  passed as "It started later usual…", while the nearMiss the course itself
 *  prints for that model ("It started later THAT usual, sir.") failed. Also
 *  passing: "This registration is mandatory law.", "I will ask an upgrade for
 *  you.", "We could arrange a connecting room" without `instead`, "I always
 *  offer a welcome drink fail.", "Our doorman works me."
 *
 *  Required HERE rather than in FUNCTION_TOKENS, which is where an earlier
 *  draft put them. That list is also what sizes the one-word function
 *  allowance, so adding ten words to it took targets carrying a single
 *  function word up to two and handed that one away: Phase 1 article
 *  deletions went 76.9% → 79.6% and pronoun deletions 9.0% → 10.0%, loosening
 *  the A1 weeks this file promises not to touch in order to tighten Phase 2.
 *
 *  "but" and "instead" are here for the same reason and not by analogy:
 *  dropping either reverses the concession the sentence exists to make —
 *  "I cannot move the rate, sir, I can add a two o'clock check-out." reads as
 *  agreement. "while", "because", "after", "before" and "until" were already
 *  covered by STRUCTURE_TOKENS below and leaked nothing. */
const PREPOSITION_TOKENS = new Set<string>([
  "about",
  "with",
  "from",
  "by",
  "near",
  "without",
  "than",
  "but",
  "instead",
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
  // "I am calling SECURITY and the Duty Manager now." — the word that says
  // who is coming. It sat beside `emergency`, `doctor` and `fire` in meaning
  // and nowhere in this list, so the Guest Relations week-39 turn on a guest
  // who will not let go of a colleague passed with it deleted. Layer S of
  // scripts/lint-content.ts is what caught it: the moment the round below
  // pulled that sentence into the must-be-right oral draw, a droppable
  // `security` stopped being a curiosity and became an exam answer.
  "security",
  // THE ALLERGEN'S NAME, not just the word "allergy".
  //
  // The list knew `allergy`/`allergic` and no food, so the sentence that
  // carries the whole promise carried it in an ordinary content word the
  // one-word allowance could spend: "…we will not use nut oil." passed as
  // "…we will not use oil." — in Spa's ONLY allergy turn of the phase, where
  // the guest has just named what would harm them. Same shape in F&B: the
  // cross-contact warning "…it has no nuts, but our kitchen does handle
  // nuts." and "Which seafood must we avoid?".
  //
  // Scanned off the content rather than guessed: `nut`, `nuts`, `shellfish`,
  // `gluten` and `seafood` are the allergen names the forty weeks actually
  // use. `dairy`, `peanut(s)`, `soy`, `sesame` and `lactose` appear nowhere
  // yet and are listed anyway — a token no target contains can never fire,
  // and the next allergy turn somebody authors should not have to find this
  // list first.
  //
  // `egg`/`eggs`, `milk`, `fish`, `beef` and `pork` are DELIBERATELY ABSENT.
  // Every occurrence of them in the course is a menu word — "two eggs, no
  // salt", "How would you like your eggs, sir", "the clay-pot fish" — and
  // locking a menu word is not a safety rule, it is a tighter grade on an
  // ordinary noun. They go on this list the day a turn says a guest cannot
  // eat one.
  "nut",
  "nuts",
  "peanut",
  "peanuts",
  "shellfish",
  "gluten",
  "dairy",
  "seafood",
  "soy",
  "sesame",
  "lactose",
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
  // The rest of the prepositions are NOT here, and the omission is on
  // purpose: see PREPOSITION_TOKENS. They are required outright instead.
  // Listing them here would have added them to funcNeeded, and the allowance
  // is sized from that count — measured, it took a target that carried one
  // function word up to two and handed the first one away: Phase 1 article
  // deletions went from 76.9% passing to 79.6% and pronoun deletions from
  // 9.0% to 10.0%, in the weeks this file promises to leave untouched.
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
          STRUCTURE_TOKENS.has(t) ||
          PREPOSITION_TOKENS.has(t)
        );
      }),
    ),
    // An authored list ADDS to the derived one; it does not replace it. The
    // old contract was "override wins", and an audit proved what that would
    // have cost: declaring `requiredTokens: ["room"]` made "Room NINE-one-two"
    // pass a two-oh-five item, because naming one content word switched the
    // number lock off. No frame had used the field yet — and all five reports
    // that call it the highest-leverage fix left would have walked into that.
    // Folded like everything else on this list. The gate below matches the
    // required tokens against the FOLDED target, so an authored lock written
    // in the un-folded word never fired: a headword lock on "free" looked for
    // "free" in a target the synonym fold had already turned into "ready", and
    // "The welcome drink is free for our guests." passed without it.
    //
    // AND NEVER A COURTESY MARKER, whoever asked for it. This is the one
    // place every lock arrives through — the frame author's own list, the
    // headword lock speaking-alternates.ts derives, and the list the content
    // layer writes in lockWeekHeadwords() — so it is the only place the rule
    // can be stated once. "Please", "Certainly", "Sorry" and "Very" are
    // printed as vocabulary cards in 32-40 week-department pairs each, so the
    // headword lock demands them in every model that happens to contain one:
    // measured over the whole course, 173 slots required a word this file
    // simultaneously declares free to add and free to leave out. The round
    // that began locking the dept-review turns is what made it bite — F&B
    // week 19's "Please be careful, sir. This dish is very hot." and Guest
    // Relations week 22's "I am very sorry, sir…" would have failed a learner
    // who said the entire safety warning and skipped the intensifier. Failing
    // an honest answer is worse than passing a sloppy one, and COURTESY_EXTRAS
    // is the list that already says so.
    //
    // The apology a model OPENS with is NOT covered by this: it comes back
    // two lines below through apologyOpenerTokens(), which is a property of
    // the sentence rather than a token somebody listed. So "I am sorry, sir.
    // I cannot say." still requires its apology; "I will tell them we are
    // sorry." still does not.
    ...(override ?? [])
      .flatMap((t) => foldCourtesy(normalize(t)))
      .filter((t) => !COURTESY_EXTRAS.has(t)),
    ...titleAndSurname(target),
    ...fixedPhraseTokens(target),
    ...apologyOpenerTokens(target),
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
  // "turn OVER" is the other half of the draping sequence "face down" belongs
  // to: "Please turn over slowly" passed as "Please turn slowly", which asks
  // the guest to do nothing at all. Same shape as "send it up" — the particle
  // is the instruction.
  turn: ["on", "off", "over"],
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
  // "at ALL times" means always; "at times" means sometimes. Dropping the one
  // word inverts the rule, and the percentage barely moves: Spa week 18's
  // "A towel cover stays on at all times." passed as "…stays on at times." —
  // a draping promise turned into an occasional one, in the lesson that
  // exists to make it unconditional. `all` is an ordinary content word to
  // every other list in this file, so only the phrase can hold it.
  "at all times",
  // "Please lie FACE down" is a position, not a direction. "Please lie down
  // first, madam." passed the model, and a guest lying the wrong way up is
  // the single thing that draping instruction prevents.
  "face down",
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

/** The apology a model OPENS with is the lesson, not a courtesy extra.
 *
 *  "sorry" sits in COURTESY_EXTRAS so that ADDING it is free — four managers
 *  asked for that and it stays. But free to add had quietly become free to
 *  drop, because a COURTESY_EXTRAS word is not content and nothing else was
 *  watching it: 82 of the 88 P2 models that open with an apology passed with
 *  the apology word deleted. "I am madam. Let me say that again slowly.",
 *  "I am that is not allowed, sir." and "I am sir. You must not smoke inside
 *  the hotel." were all PASS — and the sentence the week exists to teach is
 *  the apology.
 *
 *  Locked only at the OPENING, where it is the move. Mid-sentence — "I will
 *  tell them we are sorry" — it stays droppable, and adding one anywhere is
 *  still free. stripCourtesyFrame runs first, so a learner who opens "I am
 *  afraid" against a model that opens "I am sorry" has already had the
 *  model's own opener substituted in and is not touched by this. */
const APOLOGY_OPENS = /^(i am (very |so )?|i do )?(sorry|afraid|apologise|apologize)\b/i;
function apologyOpenerTokens(target: string): string[] {
  const m = APOLOGY_OPENS.exec(target.trim());
  return m ? [m[3]!.toLowerCase()] : [];
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
 *  here.
 *
 *  EXPORTED because the headword lock has to read the same list. Every word
 *  here is also printed as a vocabulary card in 32-40 week-department pairs,
 *  and speaking-alternates.ts kept its own copy of the courtesy words it
 *  refused to carry forward — so the moment dept-review turns started being
 *  locked, the week that PRINTS the card began requiring it and three models
 *  ("Please be careful, sir. This dish is very hot.", "I am very sorry,
 *  sir…", and F&B week 16's `certainly`) would have failed a learner for
 *  dropping the exact word this list exists to forgive. Two lists cannot
 *  disagree about what courtesy is; there is one now. */
export const COURTESY_EXTRAS = new Set<string>([
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
export const isContentToken = (t: string) =>
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
// Not "This is Mr Tan's OFFICE": the caller is someone in it, of either sex
// (round 2 failed "…staying here, sir" on that must-be-right turn).
// "I am four months pregnant" says who is speaking as plainly as a title
// does; "Thank you, sir." passed it (round 3).
const GENDER_CUE =
  /\b(i am|i'm|this is)\s+(mr|mrs|ms|miss)\.?\s+[a-z]+\b(?!['’]s)|\bi am\b[^.?!]*\b(husband|wife|father|mother|son|daughter|brother|sister|pregnant)\b|\b(sir|madam|ma'am)\b/i;
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
// The clock half of this pattern was `a\.?m|p\.?m`, and `\bam\b` is the verb
// every second guest line contains: "I am in a hurry." and "I am Mr Chen."
// counted as statements of the hour, so the greeting they cannot possibly fix
// was graded as though they had. A clock reading carries its digits — "9 a.m.",
// "7am", "at 10 pm" — so the digits are what the branch now asks for, which
// also catches "7am", a form the old `\b` boundary could never match.
const TIME_CUE =
  /\b(morning|afternoon|evening|night|midnight|noon|breakfast|lunch|dinner|o'clock|arrived)\b|\d\s*[ap]\.?\s?m\b/i;
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
/** Words the curriculum itself treats as interchangeable, folded to one token.
 *
 *  checkpoint-paper.ts has had a SYNONYM table for this since round 3 — it is
 *  what stops the written paper printing two correct answers — and the spoken
 *  half of the SAME exam did not share it. Measured on Phase 2: saying
 *  "supervisor" where the model says "manager" failed 51 of 51 items,
 *  "immediately" for "now" 104 of 104, "issue" for "problem" 18 of 18,
 *  "offer" for "arrange" 41 of 41 (and back the other way 49 of 49), "duty
 *  manager" for "manager" 43 of 43, "not permitted" for "not allowed" 7 of 7.
 *  Two graders on one exam cannot disagree about which words mean the same.
 *
 *  INFLECTION PAIRS ARE DELIBERATELY ABSENT. The paper's table folds
 *  prefer/prefers and finish/finishes because it only asks whether two
 *  sentences SAY the same thing; folding them here would let "Whichever you
 *  prefers." pass, and the third-person -s is the single most-taught point of
 *  the course. So each entry keeps its own tense and number, and the fold is
 *  written form by form.
 *
 *  Folded TOWARDS the word the closed lists already know: "offer" becomes
 *  "arrange" and not the reverse, because `arrange` is a PROMISE_VERBS entry
 *  and folding the other way would switch that lock off. */
const SYNONYMS: Record<string, string> = {
  supervisor: "manager",
  supervisors: "managers",
  immediately: "now",
  issue: "problem",
  issues: "problems",
  permitted: "allowed",
  offer: "arrange",
  offers: "arranges",
  offered: "arranged",
  offering: "arranging",
  finish: "close",
  finishes: "closes",
  finished: "closed",
  finishing: "closing",
  start: "open",
  starts: "opens",
  started: "opened",
  starting: "opening",
  begin: "open",
  begins: "opens",
  began: "opened",
  free: "ready",
  available: "ready",
  // The same word in another register, or the American one. Round 2 of the
  // Phase 4 reviews failed "Is ANYBODY allergic to anything?" (0 of 4) and
  // "Please do not use the ELEVATOR" (0 of 11) on exactly these.
  anybody: "anyone",
  somebody: "someone",
  everybody: "everyone",
  elevator: "lift",
  elevators: "lifts",
};

function foldCourtesy(input: string[]) {
  // Word for word first, so the multi-word folds below still see a clean
  // stream: "shall i" has to survive the single-word pass to be folded.
  const toks = input.map((t) => SYNONYMS[t] ?? t);
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
    // "May I", "Can I", "Shall I" and "Could I" open the same request, and the
    // course teaches all of them — week 17 prints "May I ask about your pillow
    // type?" two screens after grading "May I have your coffee preference?"
    // wrong for the word "may". Twenty-three of twenty-three swaps failed, and
    // "Shall I" for "May I" failed 111 of 111 after that.
    if ((toks[i] === "may" || toks[i] === "can" || toks[i] === "shall") && toks[i + 1] === "i") {
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
    // "I am not ALLOWED to waive that charge" is the same refusal again: a
    // blind review of Housekeeping failed it on every must-be-right turn it
    // tried. ("permitted" has already become "allowed" above.)
    const refusal =
      toks[i] === "not" &&
      (toks[i + 1] === "able" || toks[i + 1] === "allowed") &&
      toks[i + 2] === "to"
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
    // "Thanks for telling me" is "Thank you for telling me": 0 of 9 turns
    // took it in round 3, four of them must-be-right, so a learner who said
    // every turn right failed the oral half on 11.8% of papers for it.
    if (toks[i] === "thanks") {
      out.push("thank", "you");
      continue;
    }
    // "No one goes back in" is "Nobody goes back in" — one "no" either way.
    if (toks[i] === "no" && toks[i + 1] === "one") {
      out.push("nobody");
      i++;
      continue;
    }
    // "Can you…?" and "Could you…?" ask the same favour, as "May I" and
    // "Could I" do above.
    if (
      toks[i] === "can" &&
      toks[i + 1] === "you" &&
      (i === 0 || !/^(i|we|you)$/.test(toks[i - 1]!))
    ) {
      out.push("could");
      continue;
    }
    // "I will GET back to you" / "COME back to you"; "in the next hour" /
    // "within the hour".
    if (toks[i] === "get" && toks[i + 1] === "back" && toks[i + 2] === "to") {
      out.push("come");
      continue;
    }
    if (
      toks[i] === "in" &&
      toks[i + 1] === "the" &&
      toks[i + 2] === "next" &&
      toks[i + 3] === "hour"
    ) {
      out.push("within", "the", "hour");
      i += 3;
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

/** Greedy bag match: for each target token, the first spoken token not yet
 *  spent that equals it. Returns the TARGET indices that found a partner. */
function bagMatch(a: string[], b: string[]): Set<number> {
  const used = new Set<number>();
  const hit = new Set<number>();
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < a.length; j++) {
      if (!used.has(j) && a[j] === b[i]) {
        used.add(j);
        hit.add(i);
        break;
      }
    }
  }
  return hit;
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
  // Kept over the FULL streams: this is what the suite paints back to the
  // learner word by word, so every word of the model has to keep an index.
  const correctIdx = bagMatch(a, b);
  // A COURTESY MARKER IS NOT PART OF THE PERCENTAGE EITHER.
  //
  // The round that freed courtesy markers fixed one of the two layers that
  // grade them. requiredValueTokens stopped minting them as locks, and
  // COURTESY_EXTRAS already said adding one is free — but accuracy and
  // orderRatio still counted every one of them against the learner, so a
  // model sentence minus its intensifier came back below the threshold with
  // missingRequired, missingFunction, missingContent and insertedWords all
  // EMPTY. "This afternoon was busy." scored 0.80/0.80 against "This
  // afternoon was very busy." and failed the week-21 bar with nothing to
  // report. Measured on one content snapshot, over the whole course: 18 of
  // 157 `very` deletions, 45 of 354 `yes` deletions and 37 of 297 `now`
  // deletions failed that way, and one week-department pair in six lost a
  // Yes-opening item to it.
  //
  // Both streams, not just the target's: dropping the marker out of one side
  // only would leave the learner's own "very" hunting for a partner that no
  // longer exists and eating an order slot it never used to.
  //
  // ONLY WHEN THE OTHER SIDE NEVER SAYS IT. A marker is discounted where one
  // speaker used it and the other did not use it AT ALL; a marker BOTH of them
  // said is graded exactly as before, in the place they put it.
  //
  // Two earlier drafts of this line were wrong in two different ways and both
  // were caught by measurement rather than by reading. Deleting every marker
  // from both streams also deleted the difference between "I will clean NOW
  // it, madam." and "I will clean it NOW, madam." — the first is a nearMiss
  // the course itself prints as the WRONG answer, and it started passing.
  // Trimming by COUNT instead fixed that and broke something else: a model
  // with two "and"s, read back with one of them gone, had its FIRST "and"
  // kept and the learner's SECOND one left hanging, so 27 sentences came back
  // at accuracy 100 with the order ratio broken — right words, invented
  // disagreement. A type-level test has neither failure: the surplus copy is
  // simply graded, which is what the grader did before this round.
  //
  // Nothing is loosened past that. Every marker this discounts is still graded
  // by the layers that own it — the apology a model OPENS with comes back
  // through apologyOpenerTokens, "do" and "have" are FUNCTION_TOKENS with one
  // life between them, and a marker the learner ADDS was already free.
  // Measured over the whole course: dropping the opening apology still fails
  // (4.2% pass, unchanged), dropping an auxiliary "do" still fails 100% of the
  // time, and the set of the course's own nearMiss/rude strings that leak is
  // byte-for-byte the same list as before — not the same count, the same list.
  //
  // A FREED HONORIFIC IS THE SAME STORY, one layer further along. When
  // honorificIsFree() says the guest's line fixes no gender, the required
  // token layer drops sir/madam and the order ratio has ignored its position
  // since the round that added HON_ORDER_FREE — but the percentage went on
  // counting whether it was there. That last layer is what kept the echo
  // profile ("say the guest's line back to them") off the pass side: "Is this
  // one confidential?" against "Yes, sir. This one is confidential." lost 1/6
  // of its accuracy to `sir` and 1/6 to `yes`, and the moment `yes` became
  // free the echo cleared the bar on `sir` alone. Discounted here too, the
  // echo comes back word-perfect and OUT OF ORDER, which is what it is, and
  // the verdict's own "right words, wrong order" clause fails it. Measured:
  // the echo profile goes back to exactly the items it passed before.
  const freeTag = (t: string) => honorificFree && HONORIFIC.test(t);
  const trimCourtesy = (mine: string[], theirs: string[]) => {
    const said = new Set(theirs.filter((t) => COURTESY_EXTRAS.has(t)));
    return mine.filter((t) => !freeTag(t) && (!COURTESY_EXTRAS.has(t) || said.has(t)));
  };
  const am = trimCourtesy(a, b);
  const bm = trimCourtesy(b, a);
  const accuracy = bm.length === 0 ? 0 : bagMatch(am, bm).size / bm.length;
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
  // Off the courtesy-filtered streams for the same reason the percentage is:
  // a marker the learner left out was breaking the subsequence it sat inside,
  // so "This afternoon was busy." lost 0.20 of its order ratio as well as
  // 0.20 of its accuracy and failed on both counts at once.
  const ao = am.filter((w) => !HON_ORDER_FREE.has(w));
  const bo = bm.filter((w) => !HON_ORDER_FREE.has(w));
  const orderRatio = bo.length === 0 ? (bm.length === 0 ? 0 : 1) : lcsLength(ao, bo) / bo.length;
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
  // Longest first — find() takes the first match. "I am very sorry to hear
  // that" is the opener the course itself teaches for a complaint (week 27),
  // and the reserved slot failed it against a model that opens "I am sorry"
  // for the three words after "sorry".
  ["i", "am", "very", "sorry", "to", "hear", "that"],
  ["i", "am", "so", "sorry", "to", "hear", "that"],
  ["i", "am", "sorry", "to", "hear", "that"],
  ["i", "am", "very", "sorry", "about", "that"],
  ["i", "am", "sorry", "about", "that"],
  ["i", "am", "very", "sorry", "for", "the", "trouble"],
  ["i", "am", "sorry", "for", "the", "trouble"],
  ["i", "am", "sorry", "for", "the", "inconvenience"],
  ["i", "apologise", "for", "the", "inconvenience"],
  ["i", "apologize", "for", "the", "inconvenience"],
  ["sorry", "to", "hear", "that"],
  // The week-27 card. Round 4 failed "I apologise, sir. …" on five of six
  // must-be-right slots that open "I am sorry".
  ["i", "apologise"],
  ["i", "apologize"],
  // "I'm afraid not, madam. You cannot use the sauna after alcohol." — the
  // course's own week-22 refusal. Only ever lifted against a model that
  // itself says no (stripCourtesyFrame checks), so the "not" it carries is
  // never a negation the model does not have.
  ["i", "am", "afraid", "not"],
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
  ["with", "pleasure"],
  ["my", "pleasure"],
  ["sure"],
];
/** A reply that opens by saying yes: "Yes", or any acceptance — "Of course",
 *  "Certainly", "Sure", "No problem". To a guest who has just asked "Is the
 *  cake safe for her?" they all say the same thing.
 *
 *  Only "Yes" used to count. A blind review put "Of course, madam." in front
 *  of every must-be-right model of a department and passed 23 of 23, the nut
 *  allergy and "Can you drop the service charge?" among them, while "Yes,
 *  madam." in the same place failed every one: the acceptances were lifted
 *  off as courtesy. A Vietnamese learner reaches for "Dạ, được ạ" — "Of
 *  course" is the reflex as often as "Yes" is. */
function opensAccepting(toks: string[]): boolean {
  return toks[0] === "yes" || ACCEPT_OPENERS.some((p) => opensWith(toks, p));
}
const THANK_OPENERS: string[][] = [
  // Longer first: find() takes the first match, and "thank you" alone would
  // leave "for telling me" behind as three inserted words. The course teaches
  // both of these as the opening of a reply (weeks 27 and 25-30), and a blind
  // review measured "I understand." or "Thank you for telling me." in front of
  // a model failing 16/16 must-be-right slots.
  ["thank", "you", "very", "much", "for", "telling", "me"],
  ["thank", "you", "for", "telling", "me"],
  ["thank", "you", "for", "letting", "me", "know"],
  ["thank", "you", "very", "much"],
  ["thank", "you"],
];
const UNDERSTAND_OPENERS: string[][] = [
  ["i", "understand", "how", "you", "feel"],
  ["i", "understand", "your", "concern"],
  ["i", "understand"],
];
const COURTESY_OPENERS: string[][] = [
  ...THANK_OPENERS,
  ...UNDERSTAND_OPENERS,
  ...APOLOGY_OPENERS,
  ...ACCEPT_OPENERS,
  ["yes"],
];
/** Openers that acknowledge the guest before the move: thanks, understanding,
 *  apology. From week 23 any of them stands in for any other — see
 *  stripCourtesyFrame. Acceptance ("Of course") is not among them: in front
 *  of a refusal it says the opposite of the sentence. */
const ACKNOWLEDGE_OPENERS: string[][] = [
  ...THANK_OPENERS,
  ...UNDERSTAND_OPENERS,
  ...APOLOGY_OPENERS,
];
const ACKNOWLEDGE_FROM_WEEK = 23;
const NEGATES = new Set(["no", "not", "never", "nobody", "none", "nothing", "cannot"]);
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
function stripCourtesyFrame(spoken: string, target: string, sourceWeek?: string | number): string {
  let a = normalize(spoken);
  const b = normalize(target);
  const late = Number(sourceWeek) >= ACKNOWLEDGE_FROM_WEEK;
  // ANY ACKNOWLEDGEMENT FOR ANY OTHER, FROM WEEK 23.
  //
  // Phase 3 reviews ran "I am sorry, madam. I will ask my manager before we
  // start." against a model opening "Thank you, madam.", and "I understand,
  // sir. I cannot change the no-show fee." against one opening "I am sorry":
  // both failed the must-be-right slot on the opener alone, because the
  // model's opener is locked and the learner's was stripped as a frame. In
  // Phase 3 the opener is not the lesson — the move after it is — and the
  // three are what the course teaches in front of the same moves. Earlier
  // phases keep their own rule: there, choosing thanks over apology is often
  // exactly what the item teaches.
  if (late) {
    const theirs = ACKNOWLEDGE_OPENERS.find((p) => opensWith(b, p));
    const mine = ACKNOWLEDGE_OPENERS.find((p) => opensWith(a, p));
    // Not when one is the other cut short: "Thank you for TELL me…" opens
    // with "Thank you", and swapping the model's whole opener in front of it
    // would hand the learner the very word they got wrong.
    if (
      theirs &&
      mine &&
      theirs !== mine &&
      !opensWith(theirs, mine) &&
      !opensWith(mine, theirs) &&
      a.length - mine.length >= 2
    ) {
      const rest = a.slice(mine.length);
      a = opensWith(rest, theirs) ? rest : [...theirs, ...rest];
    }
  }
  for (const cls of [APOLOGY_OPENERS, ACCEPT_OPENERS]) {
    const theirs = cls.find((p) => opensWith(b, p));
    const mine = cls.find((p) => opensWith(a, p));
    // Only with a sentence left after it: "Sorry sorry." against "I am very
    // sorry, sir." would otherwise become the model's own apology and pass.
    if (!theirs || !mine || theirs === mine || a.length - mine.length < 2) continue;
    // "I am afraid not" stands in for the model's apology only where the
    // model says no as well.
    if (mine.includes("not") && !b.some((t) => NEGATES.has(t))) continue;
    const rest = a.slice(mine.length);
    // "I am sorry, I am afraid that is not allowed" already carries the
    // model's opener after the learner's own: drop the extra one, do not
    // stack a second copy of it.
    a = opensWith(rest, theirs) ? rest : [...theirs, ...rest];
  }
  // "Yes" in front of a refusal is not a frame, it is the answer to the
  // guest's question — and the wrong one. One review put "Yes, sir." in front
  // of every must-be-right model of a department and passed all 23 of them,
  // "Are you saying I am drunk?" included. So it is not lifted off a model
  // that says no; utterancePassed() then fails it.
  const refuses = b.some((t) => NEGATES.has(t)) && !b.includes("yes");
  for (let guard = 0; guard < 4; guard++) {
    const op = COURTESY_OPENERS.find(
      (p) => opensWith(a, p) && !opensWith(b, p) && !(refuses && p.length === 1 && p[0] === "yes"),
    );
    if (!op || a.length - op.length < 2) break;
    // The model opens with a SHORTER form of the same opener — "Thank you,
    // madam." under "Thank you for telling me, madam." Lifting the whole of
    // the learner's opener took the model's "thank you" with it, and the
    // reply failed for leaving out the two words it had just said.
    const shorter = COURTESY_OPENERS.find(
      (q) => q.length < op.length && opensWith(op, q) && opensWith(b, q),
    );
    if (shorter) {
      a = [...shorter, ...a.slice(op.length)];
      continue;
    }
    a = a.slice(op.length);
    // "Certainly, madam." — the honorific belongs to the opener it follows.
    if (
      /^(sir|madam|ma'am|maam)$/.test(a[0] ?? "") &&
      !/^(sir|madam|ma'am|maam)$/.test(b[0] ?? "")
    ) {
      const h = a[0]!;
      a = a.slice(1);
      // From week 23, if the model says that honorific elsewhere and the rest
      // of the answer does not, it moves to where the model has it rather
      // than going missing: "I am sorry, madam. I cannot offer lounge access
      // myself…" against "I cannot offer lounge access myself, madam."
      const at = b.indexOf(h);
      if (late && at > 0 && !a.includes(h)) {
        const after = a.indexOf(b[at - 1]!);
        if (after >= 0) a = [...a.slice(0, after + 1), h, ...a.slice(after + 1)];
      }
    }
  }
  for (let guard = 0; guard < 3; guard++) {
    // A FRAME IS ONLY A FRAME IF THE MODEL DOES NOT NEED THOSE WORDS.
    //
    // The cut asked one question — does the model end this way? — and
    // "Shall I arrange baggage storage for you NOW?" does not end in "for
    // you", it ends in "now". So a learner who said the whole sentence bar
    // the "now" had "for you" taken off the end of their answer and was then
    // told they had left out `for` and `you`: two words they had just spoken,
    // reported missing, at a raw compareWords score of 0.875 and a verdict of
    // 0.625. Five departments print that frame in week 16.
    //
    // Counted, not merely looked up. The cut is refused only when it would
    // leave the answer with FEWER copies of one of those words than the model
    // has — so the ordinary case, where the model never says them at all,
    // still strips exactly as before, and "Thank you. I will check for you."
    // against a model that says "for you" once keeps its one copy.
    const cl = COURTESY_CLOSERS.find((p) => {
      if (!closesWith(a, p) || closesWith(b, p)) return false;
      const rest = a.slice(0, a.length - p.length);
      const count = (arr: string[], t: string) => arr.reduce((n, x) => n + (x === t ? 1 : 0), 0);
      return !p.some((t) => count(rest, t) < count(b, t));
    });
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
  // THE SLOT'S OWN required tokens apply to every reply it accepts.
  //
  // Each answer arrived carrying the requiredTokens of the item it was
  // authored for, and the phase writes the same sentence in several weeks with
  // different locks: the week-19 copy of "May I remind you of the registration
  // rule, madam?" requires [registration, rule], the week-20 copy requires
  // nothing. A learner who dropped `registration` failed the item it belongs to
  // and then passed on the looser copy standing behind it. 10 of 234 oral slots
  // held a copy looser than themselves, and 206 of 382 alternates carried a
  // requiredTokens list that was a strict subset of their slot's.
  //
  // Unioning is free of side effects: requiredSeq is built from the ANSWER's
  // own text, so a token the alternate does not contain is never demanded of
  // it — only a token it does contain, and could otherwise have dropped.
  const slotTokens = answers[0]?.requiredTokens ?? [];
  const slotTarget = answers[0]?.target;
  for (const a of answers) {
    const req = [...new Set([...(a.requiredTokens ?? []), ...slotTokens])];
    const verdict = utterancePassed(spoken, a.target, sourceWeek, req, guestPrompt, slotTarget);
    // THE SLOT'S OWN POLARITY. saidInOtherWords() holds a reply to the
    // polarity of the answer it is read against — and an authored paraphrase
    // may say the slot's "no" another way: "Please keep your door closed" for
    // "Please do not open your door". Read loosely against that paraphrase,
    // "Please open your door" passed. So a loose reading only counts against
    // an answer that says no exactly as often as the slot's own model; a
    // paraphrase that says it differently has to be said as written.
    if (
      verdict.passed &&
      verdict.byMeaning &&
      slotTarget &&
      polarityOf(a.target) !== polarityOf(slotTarget)
    )
      continue;
    // "Yes, sir." in front of a reply to a slot that says no fails, whichever
    // accepted answer it matched: a paraphrase without the slot's "no" let
    // "Yes, sir. May I bring you some water?" through on a "No, sir" turn.
    if (verdict.passed && slotTarget && yesAgainst(spoken, slotTarget, sourceWeek)) continue;
    if (verdict.passed) return verdict;
    own ??= verdict;
  }
  return own ?? utterancePassed(spoken, "", sourceWeek, undefined, guestPrompt);
}

/** "Yes" in answer to a yes/no question the model does not say yes to.
 *
 *  A refusal was already covered. Round 4 found the other half: the model
 *  answers "Can he have the pasta?" with "I will check with the kitchen…",
 *  and "Yes, sir. I will check with the kitchen…" passed — a yes to a nut
 *  allergy before anyone has checked. Same on "Is the cake free?" and "Is the
 *  tasting menu all right for her?": 13 of 30 must-be-right turns in one
 *  department. A Vietnamese learner says "Yes" where Vietnamese says "Dạ",
 *  so the reflex is real. From week 23, when the guest's last question is a
 *  yes/no question and the model neither says yes nor opens by accepting
 *  ("Of course", "Certainly"…), a reply that opens "Yes" fails. */
function yesNotEarned(
  asSaid: string,
  target: string,
  sourceWeek: string | number,
  guestPrompt?: string,
): boolean {
  if (Number(sourceWeek) < ACKNOWLEDGE_FROM_WEEK || !guestPrompt) return false;
  if (!opensAccepting(normalize(asSaid))) return false;
  const t = normalize(target);
  if (t.includes("yes") || opensAccepting(t)) return false;
  // "Yes, madam. I am sorry, visitors have to wait in the lobby." — a yes in
  // front of a model that opens by apologising says the opposite of it.
  if (APOLOGY_OPENERS.some((p) => opensWith(t, p))) return true;
  // Nor in front of a model that hands the decision to someone else, or turns
  // the guest down another way ("I would rather…", "…only with written
  // permission", "May I call a taxi instead?") — whatever the guest said.
  // "I want the spa included too." / "Just give us the upgrade now." are not
  // questions, and "Of course, sir. That goes back to my manager." agreed to
  // both. Unless the guest named that person or word first: "Could you ask
  // your manager?" — "Certainly, I will ask my manager now."
  // "An upgrade is my manager's to give" hands it on as plainly as "manager".
  const bare = (x: string) => x.replace(/'s$/, "");
  const g = normalize(guestPrompt).map(bare);
  if (t.map(bare).some((x) => (HANDS_ON.has(x) || TURNS_DOWN.has(x)) && !g.includes(x)))
    return true;
  // WHICH QUESTIONS "YES" ANSWERS.
  //
  // It used to be only a question that opens on its verb ("Is…?", "Can…?"),
  // and a review found what that misses on must-be-right turns: "Surely the
  // champagne is on the house?", "Move it? And would the deposit move with
  // it?", "…and now you want me to pay full price for it?" — "Yes, madam."
  // passed all three. So a verb after "and / so / but…" counts, and so does
  // "surely". A statement asked as a question ("Any complaints today?",
  // "So it will be ready when we come back?") is answered with "Yes" as often
  // as not — "Yes, two guests reported a noisy corridor." — and there the
  // yes is only wrong where the model hands the decision to someone else.
  const questions = guestPrompt.match(/[^.?!]*\?/g);
  let last = questions?.[questions.length - 1]?.trim().toLowerCase() ?? "";
  if (!last) return false;
  if (/\bsurely\b/.test(last)) return true;
  last = last.replace(/^((and|so|but|then|or|well|okay|ok|now|really|oh)\b[\s,]*)+/, "");
  if (
    /^(is|are|am|was|were|can|could|do|does|did|will|would|may|might|shall|should|have|has)\b/.test(
      last,
    )
  )
    return true;
  // "You are a pretty one, aren't you?" — a tag asks for a yes.
  if (
    /,\s*(right|(is|are|do|does|did|was|were|can|could|will|would|have|has)n't\s+\w+)\s*\??$/.test(
      last,
    )
  )
    return true;
  return false;
}

/** Ways a model turns the guest down without saying no. */
const TURNS_DOWN = new Set(["rather", "only", "instead"]);

/** Words of a model that leaves the decision to someone else, or says no. */
const HANDS_ON = new Set([
  "manager",
  "supervisor",
  "approval",
  "approve",
  "approves",
  "decide",
  "decides",
  "decision",
  "cannot",
  "not",
  "never",
  "afraid",
]);

/** "No, please wait for first aid, madam." to "Should we give her some
 *  water?" — the model redirects ("Please wait for first aid") and says no
 *  by doing so; the learner says it outright. Round 4 failed that reply on
 *  the anaphylaxis slot as an added negation. From week 23, when the guest's
 *  last question is a yes/no question and the model opens with "Please" and
 *  says no other no, a leading "No" is lifted off before grading. */
function noBeforePlease(
  spoken: string,
  target: string,
  sourceWeek: string | number,
  guestPrompt?: string,
): string {
  if (Number(sourceWeek) < ACKNOWLEDGE_FROM_WEEK || !guestPrompt) return spoken;
  const s = normalize(spoken);
  const t = normalize(target);
  if (s[0] !== "no" || t[0] !== "please" || t.some((x) => NEGATES.has(x))) return spoken;
  const questions = guestPrompt.match(/[^.?!]*\?/g);
  const last = questions?.[questions.length - 1]?.trim().toLowerCase() ?? "";
  if (!/^(is|are|can|could|do|does|did|will|would|may|shall|should)\b/.test(last)) return spoken;
  let rest = s.slice(1);
  if (/^(sir|madam)$/.test(rest[0] ?? "") && rest[1] === "please") rest = rest.slice(1);
  return rest.length >= 2 ? rest.join(" ") : spoken;
}

function yesAgainst(spoken: string, slotTarget: string, sourceWeek: string | number): boolean {
  const t = normalize(slotTarget);
  if (!t.some((x) => NEGATES.has(x)) || t.includes("yes")) return false;
  if (normalize(stripCourtesyFrame(spoken, slotTarget, sourceWeek))[0] === "yes") return true;
  // An acceptance is lifted off as courtesy above; read it as said.
  return (
    Number(sourceWeek) >= ACKNOWLEDGE_FROM_WEEK &&
    !opensAccepting(t) &&
    opensAccepting(normalize(spoken))
  );
}

/** How many times a sentence says no. */
export function polarityOf(sentence: string): number {
  const t = foldCourtesy(normalize(sentence));
  return t.filter((x) => NEGATES.has(x)).length;
}

export function utterancePassed(
  spoken: string,
  target: string,
  sourceWeek: string | number,
  requiredTokens?: string[],
  guestPrompt?: string,
  /** The model of the slot this answer stands in for, when it is another
   *  accepted answer — read only by saidInOtherWords(). */
  slotTarget?: string,
) {
  const asSaid = spoken;
  spoken = noBeforePlease(spoken, target, sourceWeek, guestPrompt);
  spoken = stripCourtesyFrame(spoken, target, sourceWeek);
  // See stripCourtesyFrame: an answer that opens "Yes" to a model that says
  // no has answered the guest's question the wrong way round.
  const targetToks = normalize(target);
  const refusesHere = targetToks.some((t) => NEGATES.has(t)) && !targetToks.includes("yes");
  const yesToARefusal =
    (normalize(spoken)[0] === "yes" && refusesHere) ||
    // "Of course, sir. Not the lift, sir…" — the acceptance was lifted off as
    // courtesy by stripCourtesyFrame, so it is read from what was said.
    (refusesHere &&
      Number(sourceWeek) >= ACKNOWLEDGE_FROM_WEEK &&
      !opensAccepting(targetToks) &&
      opensAccepting(normalize(asSaid))) ||
    yesNotEarned(asSaid, target, sourceWeek, guestPrompt);
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
  // Canonicalised the same way compareWords canonicalises, and it was not:
  // "morning", "afternoon" and "evening" are VALUE_TOKENS, so a greeting that
  // greetingIsFree() had already freed still had to match the model's exact
  // day-part HERE. "Good afternoon, madam. May I have your room number?"
  // failed a "Good morning" model on a prompt that names no hour — 6 of the 6
  // freed greetings in Phase 2 failed that way, with the percentage at 100
  // and greetingIsFree() returning true two lines above.
  const valueSeq = valueTokenSequence(canonDaypart(normalize(target), dayFree));
  const spokenSeq = valueTokenSequence(canonDaypart(normalize(spoken), dayFree));
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
  // FROM WEEK 23, NO ARTICLE IS FORGIVEN. Phase 3 models are long enough
  // that nearly all carry two articles, so the allowance was on everywhere —
  // and the phase's own game marks exactly that as broken English. "Please
  // stay at pool with him.", "I cannot move you to suite myself.", "I cannot
  // cancel extra charge myself." are all printed as the WRONG bubble, and all
  // three passed the must-be-right slot they sit beside. Two graders on one
  // lesson cannot disagree about the error the course exists to unlearn.
  const articleIsTheLesson =
    (Number(sourceWeek) >= 15 && articlesRequired < 2) || Number(sourceWeek) >= 23;
  // From week 23 a possessive goes the way of the article: "I will ask
  // manager to call you" passed a must-be-right no-show turn, and dropping
  // "my" is the same L1 error the article rule is there for.
  const unforgivable = missingFunction.filter(
    (t) =>
      !FORGIVABLE_FUNCTION_TOKENS.has(t) ||
      (articleIsTheLesson && ARTICLES.has(t)) ||
      (Number(sourceWeek) >= 23 && (t === "my" || t === "your" || t === "our")),
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
  // A spare article is free because a microphone adds one — in front of a
  // noun. In front of a preposition it is a word gone missing after it: "I
  // cannot start THE without a doctor's note" is "the massage" with the noun
  // cut out, and it passed a paraphrase that never said "the massage". From
  // week 23, an article the model does not have, standing before a word that
  // cannot be its noun, fails.
  const targetPairs = new Set(
    canonSpokenTarget.slice(1).map((t, i) => `${canonSpokenTarget[i]} ${t}`),
  );
  const danglingArticle =
    Number(sourceWeek) >= 23 &&
    canonSpoken.some(
      (t, i) =>
        ARTICLES.has(t) &&
        !targetPairs.has(`${t} ${canonSpoken[i + 1] ?? ""}`) &&
        (canonSpoken[i + 1] === undefined ||
          PREPOSITION_CLASS.has(canonSpoken[i + 1]!) ||
          AUXILIARY_CLASS.has(canonSpoken[i + 1]!)),
    );
  // Forgiving one insertion on an otherwise-perfect reading was tried once as
  // a plain count and let 95 of the course's own 255 nearMiss strings pass:
  // "…then I WILL check the profile.", "Could you TO come this way?", "I DID
  // confirmed it yesterday." That is the model plus one word, and it is the
  // commonest wrong-answer shape in the phase — so a plain count stays
  // refused, and `insertionFails` is decided further down, where the rest of
  // the verdict is known.
  //
  // What separates the two is KIND, not number. Every near miss the course
  // prints inserts a FUNCTION word — an auxiliary, a preposition, a pronoun,
  // an article — because that is the L1 error the pairs are written around.
  // A staff member's spare word is a content word: "I will check the profile
  // QUICKLY, madam.", "I will bring a foam pillow MYSELF.", "I will ask my
  // DUTY manager." Measured: the model plus one professional content word
  // passed 0 of 1682 items before this, and "my manager" → "my duty manager"
  // failed 44 of 44.
  const FUNCTION_WORDISH = new Set<string>([
    ...FUNCTION_TOKENS,
    ...GRAMMAR_TOKENS,
    ...NEGATION_TOKENS,
    ...ARTICLES,
    // The prepositions FUNCTION_TOKENS does not hold are function words here
    // too. "a single added preposition is still the near-miss column's
    // commonest error" is this file's own sentence, and "The car park is near
    // at the lift." is its own example — `near` cannot be the spare word the
    // rule below forgives.
    ...PREPOSITION_TOKENS,
    "he",
    "she",
    "they",
    "them",
    "him",
    "her",
    "his",
    "their",
    "me",
    "us",
    "this",
    "that",
    "these",
    "those",
    "there",
    "by",
    "with",
    "from",
    "into",
    "about",
    "over",
    "under",
    "near",
    // "I will be there IN within five minutes." passed once the course began
    // accepting "in five minutes" for "within five minutes": a doubled time
    // preposition is the near-miss column's doubled place preposition again.
    "within",
    "until",
    "during",
    "than",
    "then",
    "as",
    "or",
    "but",
    "been",
    "being",
    "must",
    "might",
    "should",
    "were",
    "was",
    "are",
    "am",
    "to",
    // Degree words, quantifiers and particles. They are function words by
    // every definition, and inserting one is a taught error rather than a
    // flourish: "It is very MUCH quiet.", "This one is MORE better, sir.",
    // "The room is TOO MUCH stuffy, sir." and "Welcome back, Mr Chen AGAIN."
    // are all rude halves the course prints, and all four passed the first
    // draft of this rule.
    "much",
    "more",
    "most",
    "many",
    "few",
    "little",
    "less",
    "too",
    "also",
    "again",
    "back",
    "such",
    "same",
    "other",
    "another",
    "every",
    "each",
    "all",
    "both",
    "any",
    "some",
    "one",
    // HEDGES AND TIME SHIFTS. Same class as the degree words above, and the
    // same failure: the percentage cannot see them, because accuracy and
    // orderRatio both divide by the target. Appended to the end of a model
    // sentence they passed 100% of every week-15-and-later item measured on
    // one content snapshot — 3,040 of 3,040 promise sentences and 548 of 548
    // safety sentences in Phase 2, and every one of F&B's. "I will ask my
    // manager before we start TOMORROW." and "Please wait for me at the
    // restaurant entrance TOMORROW." were both PASS: one postpones the
    // escalation the sentence exists to make, the other moves the guest's
    // meeting point to another day.
    //
    // `maybe`, `perhaps` and `probably` unmake a commitment; `sometimes` and
    // `only` unmake a rule; `later`, `tomorrow` and `tonight` move when it
    // happens; `alone` and `myself` change WHO does it, which on a floor is
    // the difference between calling the duty manager and not.
    //
    // HERE RATHER THAN AS AN addedHedge() GATE, and it was measured both
    // ways. A symmetric addedHedge — the shape addedNegation has — goes blind
    // the moment the MODEL itself contains any hedge word, exactly as
    // addedNegation does: it would have passed "I will check tomorrow MAYBE."
    // against "I will check tomorrow." Listing them here catches that, needs
    // no new hard gate in the verdict, and can only ever bite in the one case
    // the exception was written for — an otherwise word-perfect reading plus
    // one spare word. The DELETE direction is untouched, which is the point:
    // a model that says "sometimes" still requires it (STRUCTURE_TOKENS), a
    // model that says "tomorrow" still requires it (VALUE_TOKENS), and
    // neither of those numbers moved.
    "maybe",
    "perhaps",
    "probably",
    "sometimes",
    "later",
    "tomorrow",
    "tonight",
    "alone",
    "myself",
    "only",
  ]);
  // Words a spare word may never be, whatever else is right. Every one of
  // them commits the hotel to money it has not agreed to give, or to a
  // promise nobody may make on the floor — and the model that did not say it
  // is the lesson. One inserted "free" turns "I will bring a foam pillow"
  // into a comp, and the percentage does not move.
  const MONEY_WORDS = new Set<string>([
    "free",
    "complimentary",
    "discount",
    "refund",
    "guarantee",
    "promise",
    "waive",
    "upgrade",
    // Taking the blame is a promise of money too: "It is our FAULT", "We will
    // PAY", "The hotel is RESPONSIBLE" turn an injury report into an
    // admission, and the model that leaves them out is the lesson — "do not
    // admit fault at the desk".
    "pay",
    "pays",
    "paid",
    "compensate",
    "compensation",
    "reimburse",
    "fault",
    "responsible",
    "liable",
    "blame",
  ]);
  // Checked on the RAW stream, before foldCourtesy: the synonym fold turns
  // "free" into "ready", and reading the ban list off folded tokens would let
  // exactly the word this list exists for through under another name.
  const rawTargetTally = new Map<string, number>();
  for (const t of normalize(target)) rawTargetTally.set(t, (rawTargetTally.get(t) ?? 0) + 1);
  let moneyAdded = false;
  const rawSpoken = normalize(spoken);
  // A money word inside the refusal itself — "I cannot offer FREE lounge
  // access myself" against "I cannot offer lounge access myself" — refuses
  // the same comp more plainly, and from week 23 it is not counted. Only
  // within three words after "cannot"/"not", and only where the model
  // refuses too: "No, it is free" and "I can offer it free" still count.
  const refusesMoney = (i: number) =>
    Number(sourceWeek) >= ACKNOWLEDGE_FROM_WEEK &&
    targetToks.some((t) => t === "cannot" || t === "not") &&
    rawSpoken.slice(Math.max(0, i - 3), i).some((t) => t === "cannot" || t === "not");
  rawSpoken.forEach((t, i) => {
    const left = rawTargetTally.get(t) ?? 0;
    if (left > 0) rawTargetTally.set(t, left - 1);
    else if (MONEY_WORDS.has(t) && !refusesMoney(i)) moneyAdded = true;
  });
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
    if (
      prev &&
      ORPHANING.has(prev) &&
      (!next ||
        !isContentToken(next) ||
        NOT_A_NOUN.has(next) ||
        // "The SAYS it was a short treatment" — a verb that cannot be a
        // noun, left where the noun was. From week 23 only.
        (Number(sourceWeek) >= 23 && VERB_ONLY.has(next)))
    )
      orphanDeterminer = true;
  });
  // BY OCCURRENCE, not by presence. `missingContent` is already built that way,
  // so asking it whether a verb is missing is right — but the earlier draft
  // asked the spoken SET instead, and a model that uses a verb twice kept
  // passing with one copy gone: "This one brighter. That one is bright."
  // against "This one IS brighter…" at 88%. Eleven items behaved that way, the
  // same shape of bug this file already fixed once for function tokens.
  // THE SYNONYM FOLD RENAMES THE VERB BEFORE THIS CHECK EVER SEES IT.
  //
  // `missingContent` is built from the FOLDED stream and holdsThePredicate
  // reads the RAW target, so every verb the fold touches — finish→close,
  // start→open, begin/began→open/opened, offer→arrange — arrived here under a
  // name the sentence does not contain. The lookup returned index -1, the
  // rule said "no verb", and the answer passed: "Today went well, because the
  // team FINISHED ahead of time." passed with `finished` deleted, in the two
  // weeks whose whole lesson is the past tense. FINITE_VERBS missed it for
  // the same reason. Nothing else in this file reads a folded token against
  // an unfolded string; this line did, and it did it silently.
  const rawForms = (folded: string): string[] => {
    const raw = normalize(target).filter((r) => foldCourtesy([r])[0] === folded);
    return raw.length ? raw : [folded];
  };
  // From week 23 a word that is plainly a verb form counts as the verb too:
  // "The linen order has not ___ yet", "Thank you for ___ me", "I am very
  // ___ you waited twice" passed the one-word allowance in round 4 because
  // FINITE_VERBS is a closed list of base forms.
  const verbal = (r: string) =>
    Number(sourceWeek) >= 23 &&
    (/(ed|ing)$/.test(r) || IRREGULAR[r] !== undefined || r === "sorry" || r === "use");
  const missingVerb = missingContent.some((t) =>
    rawForms(t).some((r) => FINITE_VERBS.has(r) || holdsThePredicate(r, target) || verbal(r)),
  );
  const added = addedNegation(spoken, target);
  const inflection = inflectionErrors(spoken, target);
  // ONE spare word, and only on a reading that is otherwise the model exactly.
  //
  // Every clause below was in the rule two auditors measured separately, and
  // taking any one of them out puts near misses back on the pass side: the
  // reading has to be word-perfect (accuracy 100 AND orderRatio 1.00), nothing
  // may be missing on any of the three lists, no negation may be added, no
  // -s may be wrong, the spare word may not be a function word, and it may not
  // be one of the money words above. With it: professional readings went from
  // 0 of 1682 to 1682, and the course's own 508 nearMiss/rude strings still
  // leak 0.
  // FROM PHASE 2, for the same reason the article allowance is gated there.
  //
  // The rule was written and measured on Phase 2 sentences, which are long
  // enough that one spare word is a flourish. An A1 model is four words, and
  // the course's own wrong answers for those weeks ARE the model plus one
  // word: "The swimming pool is upstairs FLOOR.", "Fifteen minutes only TIME,
  // madam.", "This way, please GO, madam.", "I will transfer your call. WAIT."
  // Ungated, this rule took the Phase 1 rude/nearMiss leak from 10 of 494 to
  // 28 and Phase 0 from 23 of 349 to 25 — a patch in one phase reopening a
  // hole in two others, which is the failure this file has had before.
  // Weeks 1-14 keep the old flat refusal.
  const oneSpareWord =
    Number(sourceWeek) >= 15 &&
    inserted.length === 1 &&
    Math.round(cmp.accuracy * 100) === 100 &&
    cmp.orderRatio === 1 &&
    missingRequired.length === 0 &&
    missingContent.length === 0 &&
    missingFunction.length === 0 &&
    unforgivable.length === 0 &&
    valueOrderOk &&
    added.length === 0 &&
    inflection.length === 0 &&
    !FUNCTION_WORDISH.has(inserted[0]!) &&
    // Not a plural noun pushed in after a word that takes a singular one:
    // "EITHER TABLES is fine" passed "Either is fine" as one spare word.
    !(
      Number(sourceWeek) >= 23 &&
      /s$/.test(inserted[0]!) &&
      canonSpoken.some(
        (t, i) =>
          t === inserted[0] &&
          /^(either|neither|each|every|another|a|an|one|this|that)$/.test(canonSpoken[i - 1] ?? ""),
      )
    ) &&
    !moneyAdded;
  const insertionFails = inserted.length > 0 && !oneSpareWord;
  const meaningPassed = saidInOtherWords({
    sourceWeek,
    spoken,
    target,
    locks: requiredSeq.length,
    missingRequired: missingRequired.length,
    valueOrderOk,
    inflected: inflection.length > 0,
    yesToARefusal,
    moneyAdded,
    accuracy: cmp.accuracy,
    orderRatio: cmp.orderRatio,
    slotTarget,
    asSaid,
  });
  const strictPassed =
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
    inflection.length === 0 &&
    !yesToARefusal &&
    !danglingArticle;
  // Both readings: the branch swap reads as the model's words and its meaning.
  // Read the branches off the slot's own model as well: a shape that moves a
  // result in front of its "if" ("I am dialling 115…, if he is not, and if
  // he is…") no longer shows which result is whose.
  const said = normalize(spoken);
  const branchesKept =
    ifBranchesKept(target, said) && (!slotTarget || ifBranchesKept(slotTarget, said));
  // "…; however, BUT the rate…" and "Although the transfer is not mine to
  // give, BUT I can ask…" — the double link Vietnamese ("tuy… nhưng") puts
  // in, and the error week 35 exists to unteach. Both passed the drill of
  // that very lesson in round 2.
  const tgt = normalize(target);
  const doubleLink =
    Number(sourceWeek) >= ACKNOWLEDGE_FROM_WEEK &&
    ((said.some((t, i) => t === "however" && said[i + 1] === "but") &&
      !tgt.some((t, i) => t === "however" && tgt[i + 1] === "but")) ||
      (said.includes("although") &&
        said.includes("but") &&
        !(tgt.includes("although") && tgt.includes("but"))));
  // WHAT THE NO IS ABOUT. Every reading counted negations, and one each
  // passed "They do NOT contain shellfish, so I WOULD recommend them" for
  // "They contain shellfish, so I would NOT recommend them" on the
  // must-be-right allergy turn (round 3: 10 of 13 one-"not" models took a
  // "not" moved to another clause). From week 23 the first content word after
  // each negation has to be the same, against this answer or the slot's own
  // model. A leading "No," that answers the guest is not counted.
  const fSaid = foldCourtesy(said);
  const fTgt = foldCourtesy(tgt);
  const leadNo = fSaid[0] === "no" && fTgt[0] !== "no";
  const saidNo = negatedWords(fSaid, leadNo);
  const negationMoved =
    Number(sourceWeek) >= ACKNOWLEDGE_FROM_WEEK &&
    !sameNegations(saidNo, negatedWords(fTgt, false)) &&
    (!slotTarget ||
      !sameNegations(saidNo, negatedWords(foldCourtesy(normalize(slotTarget)), false)));
  // WHO IS CALLED FIRST. "Danger first: ask him where, then call the Duty
  // Manager, and security after." passed for "…then call security, and the
  // Duty Manager after." at an order ratio of exactly the 0.85 threshold —
  // the order the week teaches, reversed (round 3). Where a model orders its
  // calls (first, then, after, before, next), the reply calls the same people
  // in the same order.
  // "first aid" names a person, not an order.
  const ordered = (xs: string[]) =>
    xs.some(
      (t, i) =>
        /^(then|after|before|next)$/.test(t) ||
        (t === "first" && !/^(aid|aider|aiders)$/.test(xs[i + 1] ?? "")),
    );
  const callsOutOfOrder = (model: string[]) => {
    const want = partyOrder(model);
    if (want.length < 2 || !ordered(model)) return false;
    const got = partyOrder(fSaid).filter((id) => want.includes(id));
    return got.length >= 2 && got.join(" ") !== want.filter((id) => got.includes(id)).join(" ");
  };
  // THE OTHER PARTICLE. "Switch the AED OFF and do what it says" passed the
  // must-be-right AED turn, "…while it is DOWN" the Do Not Disturb rule,
  // "Nobody goes back OUT" the burst-pipe turn: on→off passed 55 of 59
  // tries, in→out 63 of 66 (round 3) — one word, the opposite instruction.
  const FLIPS: [string, string][] = [
    ["on", "off"],
    ["in", "out"],
    ["up", "down"],
    ["inside", "outside"],
    ["with", "without"],
  ];
  const count = (xs: string[], w: string) => xs.filter((x) => x === w).length;
  const flippedAgainst = (model: string[]) =>
    FLIPS.some(
      ([a, b]) =>
        (count(model, a) > count(said, a) && count(said, b) > count(model, b)) ||
        (count(model, b) > count(said, b) && count(said, a) > count(model, a)),
    );
  const particleFlipped =
    Number(sourceWeek) >= ACKNOWLEDGE_FROM_WEEK &&
    flippedAgainst(tgt) &&
    (!slotTarget || flippedAgainst(normalize(slotTarget)));
  // Read against the SLOT's model when there is one: an accepted answer that
  // lost its "then", or a shape that swapped "X and Y", says nothing about
  // order, and the reversed call passed against it.
  const partiesSwapped =
    Number(sourceWeek) >= ACKNOWLEDGE_FROM_WEEK &&
    callsOutOfOrder(slotTarget ? foldCourtesy(normalize(slotTarget)) : fTgt);
  return {
    ...cmp,
    missingRequired,
    missingFunction,
    missingContent,
    insertedWords: inserted,
    addedNegation: added,
    inflectionErrors: inflection,
    /** Passed only as the model's meaning, not as its wording. */
    byMeaning:
      meaningPassed &&
      !strictPassed &&
      branchesKept &&
      !doubleLink &&
      !negationMoved &&
      !partiesSwapped &&
      !particleFlipped,
    passed:
      (strictPassed || meaningPassed) &&
      branchesKept &&
      !doubleLink &&
      !negationMoved &&
      !partiesSwapped &&
      !particleFlipped,
    threshold: th,
  };
}

/** WHICH "THEN" GOES WITH WHICH "IF". A two-branch model said with its
 *  branches swapped keeps every word, every negation and nearly every word
 *  pair, so neither reading notices: "If he is, I am dialling 115… If he is
 *  not, my Duty Manager" passed for the model that dials 115 when he is NOT
 *  breathing (Phase 4 audit, GR_39_1 and GR_40_2). Each "if" clause of the
 *  model must be followed by its own result — or, moved behind that result,
 *  preceded by it. */
function ifBranchesKept(target: string, said: string[]): boolean {
  // A joined shape opens the clause with its connector: "…your room, AND if
  // he is, my Duty Manager".
  const clauses = target
    .split(/[.!?;,—–]+/)
    .map((c) => normalize(c))
    .map((c) => (/^(and|so|but|then)$/.test(c[0] ?? "") && c[1] === "if" ? c.slice(1) : c))
    .filter((c) => c.length > 0);
  const branches = clauses.flatMap((c, i) =>
    c[0] === "if" && clauses[i + 1]
      ? [
          {
            cond: c,
            then: new Set(
              clauses[i + 1]!.filter((t) => isContentToken(t) && !SOFT_TRADE.has(t)).flatMap(
                stemsOf,
              ),
            ),
          },
        ]
      : [],
  );
  if (branches.length === 0) return true;
  for (let k = 0; k < said.length; k++) {
    if (said[k] !== "if") continue;
    const own = branches
      .filter((b) => b.cond.every((t, j) => said[k + j] === t))
      .sort((a, b) => b.cond.length - a.cond.length)[0];
    if (!own || own.then.size === 0) continue;
    const isOwn = (w: string) => stemsOf(w).some((s) => own.then.has(s));
    // Only another branch's result is a swap. "Ask her IF he is breathing" is
    // a question, not a branch, and what follows it belongs to no branch.
    const isOthers = (w: string) =>
      branches.some((b) => b !== own && stemsOf(w).some((s) => b.then.has(s)));
    const next = said
      .slice(k + own.cond.length)
      .find((t) => isContentToken(t) && !SOFT_TRADE.has(t));
    if (!next || isOwn(next) || !isOthers(next)) continue;
    if (said.slice(Math.max(0, k - 8), k).some(isOwn)) continue;
    return false;
  }
  return true;
}

/** Words a paraphrase may leave out for any word of its own: who is meant
 *  ("him" → "the boy", "them" → "the family"), how clauses join ("which" →
 *  "because"), and "cannot" said as "not able" — the negation count is
 *  checked on its own. */
const SOFT_TRADE = new Set<string>([
  "him",
  "her",
  "his",
  "hers",
  "them",
  "their",
  "they",
  "she",
  "its",
  "you",
  "your",
  "our",
  "this",
  "that",
  "these",
  "those",
  "both",
  "all",
  "any",
  "each",
  "then",
  "but",
  "which",
  "who",
  "cannot",
]);

/** The trades a paraphrase may make for a content word, and only these. Each
 *  set is one thing said two ways in this course's own replies; it is not a
 *  thesaurus, and a pair goes in when a reviewer's correct answer needs it. */
const SAME_SENSE: Set<string>[] = [
  ["manager", "supervisor"],
  ["check", "look", "read"],
  ["give", "share"],
  ["come", "way"],
  ["procedure", "operation"],
  ["call", "ring", "phone", "telephone"],
  ["usually", "normally"],
  ["happen", "start"],
].map((g) => new Set(g));

/** Words an answer may not ADD to a model and still be said to mean it:
 *  each hedges, delays, offers an alternative or changes who acts. */
const MEANING_CHANGERS = new Set<string>([
  "maybe",
  "perhaps",
  "probably",
  "sometimes",
  "later",
  "soon",
  "tomorrow",
  "tonight",
  "yesterday",
  "next",
  "alone",
  "only",
  "after",
  "before",
  "until",
  "within",
  "or",
  "yes",
  "if",
  "unless",
  // "…and SOMEONE will call you" for "…and he will call you": the handover
  // the week-39 rule forbids word for word ("Never say someone will call
  // you"), and it passed as a pronoun traded for a pronoun.
  "someone",
]);
const DETERMINERS = new Set<string>([
  "a",
  "an",
  "the",
  "my",
  "your",
  "our",
  "his",
  "her",
  "their",
  "its",
  "this",
  "that",
  "these",
  "those",
  "every",
  "each",
  "some",
  "any",
  "another",
]);

/** SAID IN OTHER WORDS, FROM WEEK 23.
 *
 *  Ten blind reviews wrote 980 answers a manager would accept on Phase 3's
 *  must-be-right turns — "I am sorry, I am not able to remove the charge. I
 *  will ask my manager to review it." for "…My manager can review it." — and
 *  the grader, which reads a model word by word, took 11-28% of them. The
 *  slot decides the whole spoken half, so most competent learners failed it
 *  for wording the course never asked them to copy.
 *
 *  So from week 23 a reply that does not read as the model can still pass as
 *  the model's MEANING, and only on terms that keep everything the turn is
 *  for:
 *  - every word the turn locks is said — the refusal, the person called, the
 *    safety action, the headword, the honorific — and the numbers in order;
 *  - at least three such locks exist, so the meaning is pinned down;
 *  - no negation is added or lost (a leading "No" on a refusal excepted);
 *  - nothing is added that hedges, delays, offers an alternative or a comp
 *    (MEANING_CHANGERS, the money words, any number the model does not say);
 *  - no -s, past-tense or article error the course marks wrong: an article
 *    the model puts before a word may not go missing before that same word;
 *  - "Yes" in front of a refusal fails, as it does everywhere;
 *  - and the reply is the model's size and mostly its words (≥60% of each),
 *    so a stock line that happens to name the locks does not.
 *  The ten reviews' 700 dangerous answers, the course's own wrong options and
 *  every cheat profile in scripts/probes were re-run against it. */
/** Words between a negation and the thing it negates. */
const NEGATION_SKIP = new Set(
  "do does did be is are am was were been being have has had a an the to any sir madam please just yet even really".split(
    " ",
  ),
);

/** Who a sentence calls, in the order it calls them — first mention of each.
 *  "115" (read out as "one one five") and "ambulance" are the same call. */
function partyOrder(xs: string[]): string[] {
  const ID: Record<string, string> = {
    security: "security",
    manager: "manager",
    aid: "firstaid",
    aider: "firstaid",
    nurse: "nurse",
    ambulance: "ambulance",
    police: "police",
    engineering: "engineering",
    lifeguard: "lifeguard",
    doctor: "doctor",
    chef: "kitchen",
    kitchen: "kitchen",
  };
  const out: string[] = [];
  xs.forEach((t, i) => {
    const id = t === "one" && xs[i + 1] === "one" && xs[i + 2] === "five" ? "ambulance" : ID[t];
    if (id && !out.includes(id)) out.push(id);
  });
  return out;
}

/** "not able to", "not allowed to" say "cannot": the verb after "to" is what
 *  the no is about. Without a "to" ("incense is not allowed in the rooms")
 *  the thing refused came before the negation, so it stands for any word. */
const CANNOT_WORDS = new Set(["able", "allowed", "permitted", "possible"]);

/** What each "no" in a sentence is about: the first content word after
 *  every negation, as stems, sorted ("*" for a bare "not allowed"). A leading
 *  "No," answering the guest is left out when `dropLeadingNo` — it says no to
 *  the question, not to a verb. */
function negatedWords(xs: string[], dropLeadingNo: boolean): string {
  const out: string[] = [];
  xs.forEach((t, i) => {
    if (!NEGATES.has(t) || (i === 0 && dropLeadingNo && t === "no")) return;
    for (let j = i + 1; j < xs.length && j <= i + 4; j++) {
      if (NEGATION_SKIP.has(xs[j]!)) continue;
      if (CANNOT_WORDS.has(xs[j]!)) {
        if (xs[j + 1] === "to") continue;
        out.push("*");
        break;
      }
      out.push(stemsOf(xs[j]!)[0] ?? xs[j]!);
      break;
    }
  });
  return out.sort().join("|");
}

/** Same number of negations, each about the same word; "*" matches any. */
function sameNegations(a: string, b: string): boolean {
  if (a === b) return true;
  const xs = a ? a.split("|") : [];
  const rest = b ? b.split("|") : [];
  if (xs.length !== rest.length) return false;
  for (const x of xs) {
    if (x === "*") continue;
    const k = rest.indexOf(x) >= 0 ? rest.indexOf(x) : rest.indexOf("*");
    if (k < 0) return false;
    rest.splice(k, 1);
  }
  return true;
}

/** Irregular past forms ("left" is not one here: it is also a direction). */
const PAST_FORMS = new Set(
  (
    "went gone had was were been did done found took taken brought told said made gave given came " +
    "saw seen got sent kept held wrote written spoke spoken broke broken bought paid felt knew known " +
    "thought ran sat stood lost met wore worn chose chosen began begun drank ate eaten forgot fell " +
    "fallen heard slept spent understood"
  ).split(" "),
);

const AUXILIARY_VERBS = new Set(
  "is are am was were be been being will would can could shall should may might must has have had do does did".split(
    " ",
  ),
);

/** Runs of the reply that the model has nothing in place of: words inserted,
 *  not words said instead of the model's. Aligned by longest common
 *  subsequence; a stretch of unmatched reply facing unmatched model words is
 *  a substitution and is not returned. */
function insertionRuns(said: string[], model: string[]): string[][] {
  const n = said.length;
  const m = model.length;
  const L = Array.from({ length: n + 1 }, () => new Array<number>(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--)
    for (let j = m - 1; j >= 0; j--)
      L[i]![j] =
        said[i] === model[j] ? L[i + 1]![j + 1]! + 1 : Math.max(L[i + 1]![j]!, L[i]![j + 1]!);
  const runs: string[][] = [];
  let run: string[] = [];
  let facing = 0;
  // A substitution says about as much as it replaces: three words of a new
  // clause facing one stray model word ("…check with her NOW" against "…check
  // with her. HE IS HERE.") are an insertion that happened to land there.
  const flush = () => {
    if (run.length && facing < Math.max(1, run.length - 1)) runs.push(run);
    run = [];
    facing = 0;
  };
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (said[i] === model[j]) {
      flush();
      i++;
      j++;
    } else if (L[i + 1]![j]! >= L[i]![j + 1]!) run.push(said[i++]!);
    else {
      facing++;
      j++;
    }
  }
  while (i < n) run.push(said[i++]!);
  facing += m - j;
  flush();
  return runs;
}

function saidInOtherWords(p: {
  sourceWeek: string | number;
  spoken: string;
  target: string;
  locks: number;
  missingRequired: number;
  valueOrderOk: boolean;
  inflected: boolean;
  yesToARefusal: boolean;
  moneyAdded: boolean;
  accuracy: number;
  orderRatio: number;
  slotTarget?: string;
  /** The reply before stripCourtesyFrame moved anything in it. */
  asSaid?: string;
}): boolean {
  if (
    Number(p.sourceWeek) < ACKNOWLEDGE_FROM_WEEK ||
    p.locks < 3 ||
    p.missingRequired > 0 ||
    !p.valueOrderOk ||
    p.inflected ||
    p.yesToARefusal ||
    p.moneyAdded ||
    p.accuracy < 0.6
  )
    return false;
  const fs = foldCourtesy(normalize(p.spoken));
  const ft = foldCourtesy(normalize(p.target));
  if (fs.length < 0.6 * ft.length) return false;
  // A reply that is the slot's model with words cut out is not a paraphrase
  // of anything: "I am sorry, sir, the did not go through." read loosely
  // against the shorter "It did not go through, sir." found nothing missing.
  // How much of a model may be left out is the strict reading's question.
  const subsequence = (a: string[], b: string[]) => {
    let i = 0;
    for (const t of b) if (i < a.length && a[i] === t) i++;
    return i === a.length;
  };
  // Read as said: the courtesy frame may have moved an honorific, and a
  // moved word hides the cut.
  const rsAll = normalize(p.asSaid ?? p.spoken);
  if (
    subsequence(rsAll, normalize(p.target)) ||
    (p.slotTarget && subsequence(rsAll, normalize(p.slotTarget)))
  )
    return false;
  const tally = new Map<string, number>();
  for (const t of ft) tally.set(t, (tally.get(t) ?? 0) + 1);
  const extra: string[] = [];
  for (const t of fs) {
    const left = tally.get(t) ?? 0;
    if (left > 0) tally.set(t, left - 1);
    else extra.push(t);
  }
  if (
    extra.some((t) => MEANING_CHANGERS.has(t) || (VALUE_TOKENS.has(t) && !/^(sir|madam)$/.test(t)))
  )
    return false;
  // Nor TAKEN AWAY. Round 4 passed 25 of 25 conditional turns said without
  // their "if": "He is staying with us, and I can take a message for him"
  // for "If he is staying with us, I can take a message" — confirming a guest
  // is in the house — and "It is our mistake, so my supervisor will correct
  // it", "A room is available, and I can extend your stay". A word that
  // hedges, conditions or orders the model is said as often as the model
  // says it.
  const changerCount = new Map<string, number>();
  for (const t of ft)
    if (MEANING_CHANGERS.has(t)) changerCount.set(t, (changerCount.get(t) ?? 0) + 1);
  for (const [w, n] of changerCount) if (fs.filter((t) => t === w).length < n) return false;
  const negs = (xs: string[]) => xs.filter((x) => NEGATES.has(x)).length;
  // "No, sir. I cannot…" on a refusal that does not open with "No" is the
  // same no said twice — but not when the model opens with "No" itself:
  // "No, sir. I am NOT stopping…" against "No, sir. I am stopping…".
  const lead = fs[0] === "no" && !ft.includes("no") && negs(ft) > 0 ? fs.slice(1) : fs;
  if (negs(lead) !== negs(ft)) return false;
  // The words it shares with the model come in the model's order. Clause
  // moves the course accepts are shapes (answer-variants.ts) and pass on the
  // strict path; what is left here is word order the course marks wrong —
  // "What time your flight is, sir?", "I will replace straight away the mat".
  if (p.orderRatio < p.accuracy - 0.08) return false;
  const rt = normalize(p.target);
  const rs = normalize(p.spoken);
  // The word the model puts right after an article keeps a determiner right
  // in front of it: "duty manager decides…", "with chef", "ID check keeps…".
  for (let i = 0; i + 1 < rt.length; i++) {
    if (!ARTICLES.has(rt[i]!)) continue;
    const w = rt[i + 1]!;
    if (w.length < 2 || DETERMINERS.has(w)) continue;
    for (let j = 0; j < rs.length; j++)
      if (rs[j] === w && !DETERMINERS.has(rs[j - 1] ?? "")) return false;
  }
  // A function word the model has between two words, gone from between the
  // same two: "I sorry", "Please not serve him", "check with chef".
  // Read against the slot's own model too: "I SORRY, I cannot do that."
  // matched a sister sentence that has no apology at all.
  const said2 = new Set(rs.slice(1).map((t, j) => `${rs[j]} ${t}`));
  for (const m of [rt, p.slotTarget ? normalize(p.slotTarget) : []]) {
    const model2 = new Set(m.slice(1).map((t, i) => `${m[i]} ${t}`));
    for (let i = 1; i + 1 < m.length; i++) {
      const gap = `${m[i - 1]} ${m[i + 1]}`;
      if (INSERTABLE.has(m[i]!) && said2.has(gap) && !model2.has(gap)) return false;
    }
  }
  // FORM, NOT JUST WORDS. Every wrong answer the course prints in these weeks
  // is the model with one word in the wrong form — "I cannot REMOVING the
  // charge", "I am CALL first aid", "the card did not WENT through",
  // "Visitors HAS to wait" — and a check that only asks whether the locks are
  // there passes all of them. So:
  const tTally = new Map<string, number>();
  for (const t of rt) tTally.set(t, (tTally.get(t) ?? 0) + 1);
  const extraRaw: string[] = [];
  for (const t of rs) {
    const left = tTally.get(t) ?? 0;
    if (left > 0) tTally.set(t, left - 1);
    else extraRaw.push(t);
  }
  const missingRaw = [...tTally.entries()].flatMap(([t, n]) => Array<string>(n).fill(t));
  // a model word said in another form of itself — the slot's own model as
  // well as the answer matched: "Please do not HELPING her up." matched a
  // sister sentence that says "move", and the error is against "help";
  const said = new Set(rs);
  const ownMissing = p.slotTarget ? normalize(p.slotTarget).filter((t) => !said.has(t)) : [];
  const missStems = new Set([...missingRaw, ...ownMissing].flatMap(stemsOf));
  if (extraRaw.some((x) => stemsOf(x).some((s) => missStems.has(s)))) return false;
  // a model word swapped for its opposite ("I am CONTINUING the massage");
  if (
    extraRaw.some((x) => stemsOf(x).some((s) => (OPPOSITES[s] ?? []).some((o) => missStems.has(o))))
  )
    return false;
  // or a clause the model does not have: "YOUR FRIEND IS HERE, madam, but
  // because of our guest privacy rule that is confidential." A paraphrase
  // trades words; it does not add a sentence's worth of them.
  // A joined shape's connector left out does not pay for a word added:
  // "…contamination. There is no danger. YOU CAN KEEP SWIMMING." came in
  // under "…contamination, AND there is no danger" at exactly three.
  const joining = (t: string) => /^(and|so|but|then)$/.test(t);
  const missingUnjoined = missingRaw.filter((t) => !joining(t));
  // Nor does an "and" or "so" said: "…I will ask my manager today AND call
  // you back" adds a step of three words, not four. (What a three-word clause
  // may not be is decided just below.) "Then" still counts — it orders a new
  // step, and "Please wait in the room, THEN take the stairwell" is the
  // guest's own wrong plan put first.
  if (extraRaw.filter((t) => t !== "and" && t !== "so").length - missingUnjoined.length > 3)
    return false;
  // Nor a short one slipped in whole. Under the line above, two round-2
  // reviews put a sentence of three words into every must-be-right model of
  // a department and it passed: "HE IS HERE. I cannot confirm who is staying
  // with us…" (565 of 615 placements), "I am sorry, sir. WE WILL PAY. I am
  // calling first aid…" (75 of 75), "IT IS OUR FAULT.", "THE HOTEL PAYS.",
  // "IT IS SAFE." A paraphrase says the model's clauses in other words; a
  // run of words inserted where the model has nothing, and carrying a verb,
  // is a clause the model does not have.
  // Without the honorifics, which move: "…with us, sir." against "I am sorry,
  // sir, …with us. HE IS HERE." left the model's closing "sir" facing the
  // inserted clause, and it read as a substitution.
  // Nor the joining words a shape adds: "I am sorry, sir, AND I am calling…"
  // faced "HE IS HERE" with its "and".
  const noHon = (xs: string[]) => xs.filter((x) => !/^(sir|madam|and|so|but|then)$/.test(x));
  // What makes it a claim is a statement about someone or something else:
  // "he IS here", "it IS safe", "the floor WAS wet", "she is in her room".
  // A step the speaker adds is not one — "…and call you back", "…so the chef
  // knows", "…and then I WILL come back to you" all passed before and are what
  // good staff say; the money in "we will pay" / "the hotel pays" is caught
  // as money (MONEY_WORDS). So a run fails when it carries an auxiliary and
  // no "I", or names a third person with a verb.
  // Or a past event nobody here did: "Reception FORGOT it", "He CHECKED out".
  const PERSON = new Set(["he", "she", "they"]);
  const past = (x: string) =>
    (x.length >= 5 && /[^e]ed$/.test(x) && x !== "hundred") || PAST_FORMS.has(x);
  for (const run of insertionRuns(noHon(rs), noHon(rt))) {
    const mine = run.includes("i");
    if (
      (run.some((x) => AUXILIARY_VERBS.has(x)) && !mine) ||
      (run.some(past) && !mine && !run.includes("you")) ||
      (run.some((x) => PERSON.has(x)) &&
        run.some((x) => FINITE_VERBS.has(x) || AUXILIARY_VERBS.has(x) || past(x)))
    )
      return false;
  }
  // Nor does it only take them away. The model with a word cut out — "I am
  // security and the duty manager now", "Ask him to let of you" — is an
  // unfinished sentence, not another way of saying it, and the strict
  // reading already decides how much of that is forgiven. Every content word
  // the reply leaves out has to be traded for one it says instead.
  const content = (xs: string[]) => xs.filter((t) => isContentToken(t)).length;
  if (content(missingRaw) > content(extraRaw)) return false;
  // And a trade has to be a trade of the SAME thing. Counting alone let any
  // word stand in for any other: the Phase 4 audit passed "Please use the
  // LIFT" for "…the stairs" at a fire alarm, "Please STAY HERE" for "follow
  // me", "Please TAKE your bags" for "leave", and "Of WINDOW, sir" — one
  // off-topic word for one content word went through on 69-77% of Phase 3
  // turns (0% in Phase 2, which has no meaning layer). What the ten round-3
  // reviewers actually traded was a pronoun for its noun ("him" → "the
  // boy"), "cannot" for "not able", or a handful of real synonyms. So a
  // content word left out must come back as one of those.
  const dropsCourtesy = missingRaw.includes("of") && missingRaw.includes("course");
  for (const m of missingRaw) {
    if (!isContentToken(m) || SOFT_TRADE.has(m)) continue;
    if (m === "course" && dropsCourtesy) continue;
    const mine = new Set(stemsOf(m));
    const groups = SAME_SENSE.filter((g) => [...mine].some((s) => g.has(s)));
    if (!extraRaw.some((x) => stemsOf(x).some((s) => groups.some((g) => g.has(s))))) return false;
  }
  // one function word traded for another of its class ("ask security FOR
  // check", "I AM stop now", "in the pool" for "at the pool");
  for (const cls of [PREPOSITION_CLASS, AUXILIARY_CLASS])
    if (extraRaw.some((x) => cls.has(x)) && missingRaw.some((m) => cls.has(m))) return false;
  // a function word pushed between two words the model keeps together ("ask
  // TO the executive housekeeper", "I can TO re-clean", "before you WILL
  // come back", "I recommend YOU the topper");
  const adjacent = new Set(rt.slice(1).map((t, i) => `${rt[i]} ${t}`));
  // Except the indirect object a giving verb takes: "I cannot offer YOU the
  // hot stone", "I will bring YOU a clean glass", "serve YOU alcohol" are what
  // staff say, and round 4 failed them on exactly this check. "Recommend"
  // stays out — "I recommend you the topper" is the near miss.
  const GIVING = /^(offer|give|bring|serve|send|show|get|book|make|find)$/;
  for (let j = 1; j + 1 < rs.length; j++)
    if (
      INSERTABLE.has(rs[j]!) &&
      extraRaw.includes(rs[j]!) &&
      adjacent.has(`${rs[j - 1]} ${rs[j + 1]}`) &&
      !(rs[j] === "you" && GIVING.test(rs[j - 1]!))
    )
      return false;
  // "to" lost before the verb the model gives it ("ask the housekeeper call
  // you"), a modal followed by "to", and "are"/"were" with "a".
  for (let i = 0; i + 1 < rt.length; i++) {
    if (rt[i] !== "to" || DETERMINERS.has(rt[i + 1]!)) continue;
    const w = rt[i + 1]!;
    for (let j = 1; j < rs.length; j++)
      if (rs[j] === w && !TO_OR_FINITE_BEFORE.has(rs[j - 1]!)) return false;
  }
  for (let j = 0; j + 1 < rs.length; j++) {
    if ((MODALS.has(rs[j]!) || rs[j] === "cannot") && rs[j + 1] === "to") return false;
    // A plural pushed in after a word that takes a singular: "Either TABLES
    // is fine" (the same check the one-spare-word rule makes).
    if (
      j > 0 &&
      /s$/.test(rs[j]!) &&
      extraRaw.includes(rs[j]!) &&
      /^(either|neither|each|every|another|a|an|one|this|that)$/.test(rs[j - 1]!)
    )
      return false;
    // A double comparative: "It is MORE bigger than the deluxe room."
    if (
      (rs[j] === "more" || rs[j] === "most") &&
      /(er|est)$/.test(rs[j + 1]!) &&
      rs[j + 1]!.length > 4
    )
      return false;
    if ((rs[j] === "are" || rs[j] === "were") && (rs[j + 1] === "a" || rs[j + 1] === "an"))
      return false;
    // A preposition pushed between a verb and its object: "ask TO my
    // manager" where the model says "ask the manager".
    if (
      j > 0 &&
      PREPOSITION_CLASS.has(rs[j]!) &&
      extraRaw.includes(rs[j]!) &&
      DETERMINERS.has(rs[j + 1]!) &&
      rt.some((t, i) => t === rs[j - 1] && DETERMINERS.has(rt[i + 1] ?? ""))
    )
      return false;
  }
  // A singular subject with a bare verb: "If the noise START again", "it
  // HAVE", "the kitchen CHECK" — unless a modal, "do" or a causative governs
  // it ("Can the bellman help", "Let it rest").
  const base = (w: string) =>
    !w.endsWith("s") &&
    FINITE_VERBS.has(w) &&
    (FINITE_VERBS.has(`${w}s`) || FINITE_VERBS.has(`${w}es`));
  const GOVERNS = new Set([
    ...MODALS,
    "do",
    "does",
    "did",
    "let",
    "make",
    "help",
    "have",
    "to",
    "please",
    "not",
  ]);
  for (let j = 1; j < rs.length; j++) {
    if (!base(rs[j]!) || !extraRaw.includes(rs[j]!)) continue;
    const pron = /^(he|she|it)$/.test(rs[j - 1]!) && !GOVERNS.has(rs[j - 2] ?? "");
    const np =
      j >= 2 &&
      /^(the|this|that|my|your|our|his|her|its)$/.test(rs[j - 2]!) &&
      !rs[j - 1]!.endsWith("s") &&
      !DETERMINERS.has(rs[j - 1]!) &&
      !GOVERNS.has(rs[j - 3] ?? "");
    if (pron || np) return false;
  }
  return true;
}

const PREPOSITION_CLASS = new Set([
  "to",
  "for",
  "of",
  "at",
  "in",
  "on",
  "with",
  "without",
  "by",
  "from",
  "into",
  "onto",
  "about",
  "within",
  "during",
  "until",
  "near",
  "under",
  "over",
]);
const AUXILIARY_CLASS = new Set([
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "do",
  "does",
  "did",
  "have",
  "has",
  "had",
  "will",
  "would",
  "can",
  "could",
  "shall",
  "should",
  "may",
  "might",
  "must",
]);
const MODALS = new Set([
  "can",
  "could",
  "will",
  "would",
  "shall",
  "should",
  "must",
  "may",
  "might",
]);
const INSERTABLE = new Set([
  ...PREPOSITION_CLASS,
  ...AUXILIARY_CLASS,
  // "Two amenities have not delivered yet" — the passive's "been" gone.
  "been",
  "being",
  "a",
  "an",
  "the",
  "you",
  "me",
  "him",
  "her",
  "it",
  "them",
  "us",
]);
/** What may stand before a verb the model introduces with "to". */
const TO_OR_FINITE_BEFORE = new Set([
  "to",
  ...MODALS,
  "i",
  "we",
  "you",
  "they",
  "he",
  "she",
  "it",
  "please",
  "and",
  "or",
  "not",
  "cannot",
  "let",
  "me",
  "us",
  "him",
  "her",
  "them",
  "will",
  "help",
  "make",
  "let's",
]);
const IRREGULAR: Record<string, string> = {
  went: "go",
  gone: "go",
  goes: "go",
  has: "have",
  had: "have",
  is: "be",
  are: "be",
  am: "be",
  was: "be",
  were: "be",
  been: "be",
  being: "be",
  did: "do",
  does: "do",
  done: "do",
  found: "find",
  took: "take",
  taken: "take",
  brought: "bring",
  told: "tell",
  said: "say",
  made: "make",
  gave: "give",
  given: "give",
  came: "come",
  saw: "see",
  seen: "see",
  got: "get",
  left: "leave",
  sent: "send",
  kept: "keep",
  held: "hold",
  wrote: "write",
  written: "write",
  spoke: "speak",
  spoken: "speak",
  broke: "break",
  broken: "break",
  bought: "buy",
  paid: "pay",
  felt: "feel",
  knew: "know",
  known: "know",
  thought: "think",
  ran: "run",
  sat: "sit",
  stood: "stand",
  lost: "lose",
  met: "meet",
  wore: "wear",
  worn: "wear",
  chose: "choose",
  chosen: "choose",
  began: "begin",
  begun: "begin",
  drank: "drink",
  ate: "eat",
  eaten: "eat",
  forgot: "forget",
  fell: "fall",
  fallen: "fall",
  heard: "hear",
  slept: "sleep",
  spent: "spend",
  understood: "understand",
  // Adjective for adverb: "The pillowcase is very WELL" is the near miss of
  // "very good".
  well: "good",
  // A pronoun in the wrong case: "for YOU next visit", "For YOU anniversary".
  your: "you",
  their: "they",
  them: "they",
  his: "he",
  him: "he",
  her: "she",
  us: "we",
  our: "we",
  my: "i",
  me: "i",
};
const IRREGULAR_BASES = new Set(Object.values(IRREGULAR));
/** Verb forms that are never a noun. */
const VERB_ONLY = new Set(
  (
    "says said goes went gets got takes took makes made gives gave comes came brings brought " +
    "tells told asks asked needs needed wants wanted knows knew thinks thought sees saw"
  ).split(" "),
);
/** Pairs a paraphrase may never trade one for the other, by stem. */
const OPPOSITES: Record<string, string[]> = (() => {
  const pairs: [string, string][] = [
    ["stop", "continue"],
    ["stop", "start"],
    ["start", "finish"],
    ["open", "close"],
    ["open", "shut"],
    ["before", "after"],
    ["early", "late"],
    ["hot", "cold"],
    ["warm", "cool"],
    ["more", "less"],
    ["add", "remove"],
    ["include", "exclude"],
    ["allow", "forbid"],
    ["accept", "refuse"],
    ["enter", "leave"],
    ["lock", "unlock"],
    ["safe", "unsafe"],
    ["safe", "dangerous"],
    ["inside", "outside"],
    ["up", "down"],
    ["on", "off"],
    ["in", "out"],
    ["come", "go"],
    ["bring", "take"],
    ["give", "take"],
    ["increase", "reduce"],
    ["raise", "lower"],
    ["confirm", "cancel"],
    ["move", "stay"],
    ["wait", "leave"],
    ["help", "leave"],
    ["now", "later"],
    ["today", "tomorrow"],
  ];
  const m: Record<string, string[]> = {};
  for (const [a, b] of pairs) {
    (m[a] ??= []).push(b);
    (m[b] ??= []).push(a);
  }
  return m;
})();
/** The stems a word could be a form of: itself, its irregular base, and the
 *  base under -s/-es/-ies/-ed/-ing/-er (with a doubled consonant or a lost
 *  "e"). Stems under three letters are dropped so "is"/"it" never meet. */
function stemsOf(w: string): string[] {
  const out = new Set<string>([w]);
  if (IRREGULAR[w]) out.add(IRREGULAR[w]!);
  const strip = (suf: string, add = "") => {
    if (w.length > suf.length + 2 && w.endsWith(suf)) {
      const base = w.slice(0, -suf.length);
      out.add(base + add);
      if (/(.)\1$/.test(base)) out.add(base.slice(0, -1));
    }
  };
  strip("ing");
  strip("ing", "e");
  strip("ed");
  strip("d");
  strip("ies", "y");
  strip("es");
  strip("s");
  strip("er");
  strip("est");
  // "gentler" → "gentle", "safest" → "safe".
  strip("r");
  strip("st");
  strip("ly");
  // A noun said for its adjective: "I feel CONFIDENCE" for "confident".
  strip("ence", "ent");
  strip("ance", "ant");
  strip("ness");
  // An irregular base is kept at any length: "went" has to meet "go".
  return [...out].filter((s) => s.length >= 3 || IRREGULAR_BASES.has(s));
}
