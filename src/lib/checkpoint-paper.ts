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

const DROPPABLE = new Set(["a", "an", "the", "is", "are", "am", "was", "were", "to", "does", "of"]);
const SWAPPED: Record<string, string> = {
  a: "an",
  an: "a",
  is: "are",
  are: "is",
  was: "were",
  were: "was",
  has: "have",
  have: "has",
  does: "do",
  do: "does",
  this: "these",
  these: "this",
  much: "many",
  many: "much",
};
const MODAL_WORDS = new Set(["will", "can", "could", "would", "may", "must", "should", "shall"]);
const ARTICLE_WORDS = new Set(["a", "an", "the"]);
const NOT_AFTER_MODAL = new Set(["not", "i", "you", "we", "he", "she", "they", "it"]);

/** Every sentence one closed-class edit away from `sentence`: drop an article,
 *  copula, "to" or "of"; swap a/an, is/are, was/were, has/have, do/does,
 *  this/these, much/many; or put "to" after a modal and "the" before a
 *  possessive. Each edit is one a Vietnamese learner makes and none of them
 *  can turn a correct service sentence into another correct one — the caller
 *  still removes any result that happens to be a sentence the course teaches. */
function wrongVariants(
  sentence: string,
  { protect, dropArticles }: { protect?: Set<string>; dropArticles: boolean },
): string[] {
  const toks = sentence.split(" ").filter(Boolean);
  const core = (t: string) => t.toLowerCase().replace(/[^a-z']/g, "");
  const withCase = (from: string, word: string) =>
    /^[A-Z]/.test(from) ? word.charAt(0).toUpperCase() + word.slice(1) : word;
  // Where English cannot do without the article, so dropping it from the
  // answer is always an error: "the" after a preposition ("in THE safety box",
  // "to THE front desk") and "a/an" before a noun that closes its phrase
  // ("May I offer you A facial?", "A table for two"). Not after "of" — "the
  // order of steps" is fine — and not before a word that can be uncountable.
  const PREPOSITIONS = new Set([
    "in",
    "on",
    "at",
    "to",
    "from",
    "near",
    "by",
    "with",
    "for",
    "into",
    "under",
    "behind",
  ]);
  const CAN_BE_MASS = new Set([
    "juice",
    "water",
    "coffee",
    "tea",
    "milk",
    "time",
    "help",
    "information",
    "advice",
    "service",
    "food",
    "wine",
    "beer",
    "rice",
    "bread",
    "soup",
    "ice",
    "luggage",
    "laundry",
    "breakfast",
    "lunch",
    "dinner",
    "extra",
    "fresh",
    "hot",
    "cold",
    "warm",
    "sparkling",
    "still",
    "little",
    "few",
  ]);
  const articleIsRequired = (i: number) => {
    const w = core(toks[i]!);
    const nextTok = toks[i + 1] ?? "";
    const next = core(nextTok);
    if (!next || CAN_BE_MASS.has(next)) return false;
    if (w === "the")
      return i > 0 && PREPOSITIONS.has(core(toks[i - 1]!)) && !/[.,?!]$/.test(toks[i - 1]!);
    return /[.,?!]$/.test(nextTok) || PREPOSITIONS.has(core(toks[i + 2] ?? ""));
  };
  const out = new Set<string>();
  const emit = (arr: string[]) => {
    if (arr.length < 2) return;
    const a = [...arr];
    a[0] = a[0].charAt(0).toUpperCase() + a[0].slice(1);
    out.add(a.join(" "));
  };
  toks.forEach((t, i) => {
    const w = core(t);
    const tail = t.slice(t.toLowerCase().indexOf(w) + w.length);
    const next = toks[i + 1] ? core(toks[i + 1]) : "";
    // Three deletions that printed a CORRECT sentence keyed wrong, measured on
    // 11-13% of papers in two departments:
    //  - an article from the ANSWER: "The service was excellent today." →
    //    "Service was excellent today."; "…prefer a fresh juice?" → "…prefer
    //    fresh juice?" — mass and definite nouns stand without one;
    //  - "to" before an -ing verb: "Please try drinking some water slowly" is
    //    simply English;
    //  - the near miss's own error word: most near misses INSERT one, and "I
    //    am wrote everything in the log." minus "am" is right.
    // Any other deletion from a near miss leaves its error where it was, so
    // those stay — they are the edits that keep the three options from lining
    // up by length.
    const safeDrop =
      (dropArticles || !ARTICLE_WORDS.has(w) || articleIsRequired(i)) &&
      !protect?.has(w) &&
      !(w === "to" && /ing$/.test(next));
    if (DROPPABLE.has(w) && safeDrop && !/[.,?!]$/.test(t)) {
      const a = toks.filter((_, j) => j !== i);
      if (i === 0 && a[0]) a[0] = a[0].charAt(0).toUpperCase() + a[0].slice(1);
      emit(a);
    }
    if (SWAPPED[w]) emit(toks.map((x, j) => (j === i ? withCase(t, SWAPPED[w]) + tail : x)));
    if (MODAL_WORDS.has(w) && !tail && next && !NOT_AFTER_MODAL.has(next))
      emit([...toks.slice(0, i + 1), "to", ...toks.slice(i + 1)]);
    // Not at the start of a sentence: "One moment, please. the Your request…"
    // is an option nobody has to read to reject.
    if (/^(your|our|my)$/.test(w) && i > 0 && !/[.?!]$/.test(toks[i - 1]!))
      emit([...toks.slice(0, i), "the", ...toks.slice(i)]);
  });
  return [...out];
}

/** THE TAUGHT SERVICE MOVES — two replies that make the same move answer one
 *  audio equally well, whichever the paper happens to key.
 *
 *  A move is matched BY INDEX: two sentences are the same move when they hit
 *  the SAME entry. So a fresh way of saying a thing the course already teaches
 *  belongs inside the entry it paraphrases, and adding it as an entry of its
 *  own does the opposite of what it looks like — it declares the two ways
 *  DIFFERENT and puts them on one paper as key and distractor. Three reviews
 *  in one round found pairs of exactly that shape.
 *
 *  At module scope, and exported, for two reasons. It was rebuilt inside the
 *  per-question map, once for every listening item of every paper; and a
 *  script that wants to count how many items still have two right answers can
 *  now ask the shipping list instead of re-typing it, which is how several
 *  earlier rounds produced numbers that described a copy nobody shipped. */
export const LISTENING_MOVES: readonly RegExp[] = [
  // "We have X" is an offer of stock, and every department has stock. A
  // list only ever covers the moves someone remembered — an academic
  // review said exactly that after a new batch of content walked through
  // the gap this entry closes.
  // "also" slots into the middle of the frame without changing the move
  // — "We also have a city tour." is the same offer of stock, and the
  // audit that asked for the (also )? group in the arrange/offer entry
  // below named this one in the same breath.
  // ONE entry for every way the course offers something. They were four
  // entries, and a move is matched by index, so "We also have shoe polish."
  // and "We could arrange shoe polish instead." were two different moves
  // and went on the same paper as key and distractor for "What else could
  // I add to that?". Three reviews in one round found pairs of this shape.
  // Five more ways in: `would you prefer`, `may i suggest`, `shall i
  // arrange`, `shall i ask` and `i could offer`. Housekeeping played
  // "Anything on offer today?" over "Would you like a pillow change today,
  // sir?" with "May I offer you an extra choice?" and "Would you like an
  // extra hanger, sir?" beside it — three offers, all three correct.
  /\bwe (also )?have\b|\bwould you (like|prefer)\b|\bmay i (offer|suggest)\b|\bshall i (arrange|offer|order|book|ask)\b|\bwe (could|can) (also )?(arrange|offer)\b|\bi (can|could) (lend|bring|offer|suggest)\b/i,
  /\bi will bring\b/i,
  /\bi will send\b/i,
  /\bi will call\b/i,
  // Checking, fixing and reporting are one promise to a guest who has only
  // said "There is a small problem" — a review found "I will fix the issue
  // now" keyed right beside "I will report it now" keyed wrong.
  /\bi will (check|fix|report|look into)\b/i,
  // A request for a detail, whatever verb carries it and whichever way round
  // the sentence puts it: "Could I have your pain area?", "May I see your
  // consent form?", "Could you provide your passport, please?" and "Could you
  // please share your booking reference?" all answer "What else do you need
  // from me?" — Front Office keyed the first of those four with the last two
  // printed beside it. The entry matched only `(could|may|can) i`, so the
  // half of the frame that asks the GUEST to do the giving was a different
  // move by index, which is to say no move at all.
  /^((could|may|can) i (have|see|take|ask about|check)|(could|would|can) you (please )?(provide|share|give|tell|confirm|spell))\b/i,
  /\bis ready\b/i,
  // A location answer: "The lift is on the right." beside "Your robe is
  // on the hook." both answer a where-question when the audio names
  // neither object. The same review that asked for (also )?have asked
  // for this frame.
  /\b(is|are) on (the|your)\b/i,
  /\bhave a good\b/i,
  /\benjoy your\b/i,
  // Five more moves ten reviews found answering one audio two right ways:
  // writing it down, offering, handing something over, refusing, and
  // giving one more of something.
  /\bi will (note|write|add)\b|\b(noted|wrote|listed|jotted|typed|logged) everything\b|\bin the log\b|\badd (that|it) to\b/i,
  /^(yes[.,]? )?here is your\b/i,
  /\bnot (allowed|permitted|possible|available)\b|\bcannot decide\b|\bdoes not allow\b/i,
  /\b(an extra|another|one more)\b/i,
  // "What do you do first?" has as many right answers as the department
  // has opening jobs, and three weeks of this phase each teach a different
  // one. Same for the every-day and end-of-shift frames beside it.
  // The bare reassurance. "Certainly. It will be ready shortly." and
  // "Certainly, everything will be ready for you." are the same promise
  // with a different subject, and neither names anything the audio has to
  // have said, so both answer "Will it be done in time?" — the frame rule
  // below misses them because their first four words differ.
  /^certainly[.,]? (it|everything) will be\b/i,
  /\bfirst[.?!]?$/i,
  /^first (i|we)\b/i,
  /\bevery day[.?!]?$/i,
  /\bat the end[.?!]?$/i,
  // LAST, so that every more specific frame above claims its own sentences
  // first: a reply opening "Yes, …" has already answered the yes/no question
  // in its first word, and what follows is one department's way of saying so.
  // Two of them under one audio are two right answers unless the audio names
  // something only one of them carries — which is what `discriminated` asks
  // before any of this list is consulted.
  /^yes[.,]\s/i,
];

/** Which taught move `text` makes, or -1 when it makes none this list knows. */
export function listeningMoveIndex(text: string): number {
  return LISTENING_MOVES.findIndex((r) => r.test(text.trim()));
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
  // The phase's multi-word headwords, for telling two replies about the same
  // taught item apart from two replies that merely share a word.
  const phraseHeadwords = [
    ...new Set(weekVocab.map((v) => v.word.toLowerCase()).filter((w) => /\s/.test(w))),
  ];
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
    // "today" is the same bare time-marker as "now", and leaving it in cost
    // more than a distractor: `discriminated` below asks whether the audio
    // names anything the key says and a candidate does not, and "Anything on
    // offer today?" against "Would you like a pillow change today, sir?"
    // answered YES on the strength of the word "today" alone. That opened the
    // move test's gate, and two other offers went on the paper beside the key.
    // An echoed time-marker is not a reason to prefer one offer over another.
    "today",
    // A preposition the audio shares with a reply is not a reason to prefer
    // it: "Anything else about me?" counted "about" as naming the key.
    "about",
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
    // THE THIRD OPTION IS ONE MORE WRONG REPAIR, NOT A SENTENCE FROM ELSEWHERE.
    //
    // With {answer, its near miss, an unrelated polite sentence} the paper had
    // a shape, and ten reviews in one round all found it: the unrelated one is
    // eliminated on sight, and of the two look-alikes the near miss is usually
    // the LONGER one because most near misses insert a word ("Could I TO
    // have…"). "Pick the shorter of the two most similar" answered 57-67% of
    // grammar questions and cleared the block's own floor on 79-90% of papers.
    // "Pick the option most like the other two" answered 52-57%.
    //
    // So the third option is a generated edit, and which sentence it is edited
    // FROM is drawn: from the answer one time in three, from the near miss two
    // times in three. An option edited from X sits next to X, which makes X the
    // middle of the three — the answer a third of the time, a wrong option the
    // rest — so "most like the other two" falls to chance. Among the edits
    // available, the one chosen puts the answer at a randomly drawn length rank,
    // which does the same to every length rule. A phase without near misses
    // (weeks 23-40) keeps the old draw: an edit of the answer alone would make
    // the answer the middle of the three every time.
    const flat = (t: string) =>
      t
        .toLowerCase()
        .replace(/[^a-z ]/g, " ")
        .replace(/ +/g, " ")
        .trim();
    // Every sentence the phase teaches as RIGHT, spoken models included: "I
    // listed everything in the log." is a week-21 model, and it was printed
    // as a wrong edit of a grammar pair on 2.4% of Spa papers.
    const taught = new Set([
      ...grammarPool.map((o) => flat(o.polite)),
      ...phaseLessons.flatMap((l) => l.speaking.map((s) => flat(s.targetResponse))),
    ]);
    const avoid = new Set([flat(g.polite), ...(g.nearMiss ? [flat(g.nearMiss)] : [])]);
    const usableOf = (list: string[]) =>
      list.filter((v) => !avoid.has(flat(v)) && !taught.has(flat(v)));
    if (g.nearMiss) {
      const fromAnswer = Math.random() < 1 / 3;
      const nm: string = g.nearMiss;
      // The near miss's error words: what it says that the answer does not.
      const politeTally = new Map<string, number>();
      for (const t of flat(g.polite).split(" ")) politeTally.set(t, (politeTally.get(t) ?? 0) + 1);
      const inserted = new Set<string>();
      for (const t of flat(g.nearMiss).split(" ")) {
        const left = politeTally.get(t) ?? 0;
        if (left > 0) politeTally.set(t, left - 1);
        else inserted.add(t);
      }
      const fromPolite = () => wrongVariants(g.polite, { dropArticles: false });
      const fromNear = () => wrongVariants(nm, { protect: inserted, dropArticles: true });
      const preferred = shuffle(usableOf(fromAnswer ? fromPolite() : fromNear()));
      // A side with nothing left to edit ("I served it yesterday, sir." has no
      // droppable or swappable word) used to fall through to an unrelated
      // sentence from the pool, which is rejected on sight — 10-13% of grammar
      // options. The other side nearly always has an edit.
      const other = shuffle(usableOf(fromAnswer ? fromNear() : fromPolite()));
      const wantRank = Math.floor(Math.random() * 3);
      const nearMiss = g.nearMiss;
      // How many of the three options come out shorter than the answer — the
      // answer's own length rank, since the third option and the near miss are
      // the other two.
      const rankOf = (third: string) =>
        [nearMiss, third].filter((o) => o.length < g.polite.length).length;
      // THE DRAWN RANK, OR A RANK THAT EXISTS — the mechanism the listening
      // block has used since round 4, and this block was not using it.
      // `cands.find(...) ?? cands[0]` takes the first of a shuffle whenever the
      // drawn rank is missing, and the edits available are overwhelmingly
      // DELETIONS, so the answer came out the shortest of its three options
      // 37-44% of the time against a chance of 33%: "pick the shortest"
      // answered 37-44% of grammar questions and cleared the block's own floor
      // on 49-61% of papers in this round's reviews.
      //
      // Both edit sides are grouped, not just the drawn one. The near miss's
      // length is fixed by hand, so rankOf() can only ever reach TWO of the
      // three ranks for a given pair, and looking at one side at a time often
      // left only one. The drawn side is still preferred — an option edited
      // from X sits next to X, which is what keeps "most like the other two"
      // at chance — and the other side is reached for only when the drawn rank
      // is not on it.
      const group = (list: string[]) => {
        const m = new Map<number, string[]>();
        for (const c of list) m.set(rankOf(c), [...(m.get(rankOf(c)) ?? []), c]);
        return m;
      };
      const byPreferred = group(preferred);
      const byAll = group([...preferred, ...other]);
      // WHICH RANKS ARE EVEN REACHABLE IS DECIDED BY THE NEAR MISS, NOT HERE.
      //
      // rankOf() counts the near miss and the third option, and the near miss
      // is hand-written: if it is longer than the answer, this pair can only
      // ever produce rank 0 or rank 1, and if it is shorter, only rank 1 or
      // rank 2. Two of three, always — so drawing 0-2 and equalising whatever
      // is left does not flatten anything, it concentrates. Measured, at 1,000
      // papers a department: equalising the reachable ranks took "pick the
      // shortest" from 37-44% to 31-38% and pushed the same mass straight onto
      // "pick the middle", 31-42% → 41-50%. One surface trick traded for a
      // worse one.
      //
      // Rank 2 — the answer being the LONGEST of its three options — is the
      // rank the pairs can rarely supply (about a quarter of them), and it
      // measured 19-24% while rank 1 measured 41-44%. So a pair that can
      // supply it does, and the pairs that cannot split the two ranks they
      // have. That is the flattest this file can make the three without
      // rewriting the near misses.
      const reach = [...byAll.keys()];
      const rank = reach.includes(2)
        ? 2
        : byAll.has(wantRank)
          ? wantRank
          : reach[Math.floor(Math.random() * reach.length)]!;
      const pick = (byPreferred.get(rank) ?? byAll.get(rank) ?? [...preferred, ...other])[0];
      if (pick) chosen.add(pick);
    }
    const rankedAll = grammarPool
      .filter((o) => o.lessonId !== g.lessonId && !saysTheSame(o.polite) && !sameStem(o))
      .map((o) => ({ o, score: share(o.polite) }))
      .sort((a, b) => b.score - a.score);
    const ranked = rankedAll
      // A DISTRACTOR THAT SHARES NO CONTENT WORD WITH THE STEM IS NOT ONE.
      //
      // The stem is printed in the question — "Câu nào là cách nói đúng và
      // lịch sự thay cho «I note all already.»" — so an option about a
      // different subject altogether is struck out without reading it, and the
      // question is a coin toss between the two that remain. Measured on real
      // papers: 12.8-24.4% of the drawn distractors shared nothing with their
      // stem, which turned 14.2-28.2% of grammar questions into two-option
      // ones. `share` is already computed here for the ranking; it just had no
      // floor.
      .filter(({ score }) => score > 0);
    for (const { o } of ranked) {
      if (chosen.size >= want) break;
      chosen.add(o.polite);
    }
    // Rather than a sentence from elsewhere, one more edit of the answer. The
    // floor above can empty the pool — a stem whose content words nothing else
    // in the phase shares — and an edit of the answer is what the block is
    // made of anyway: it sits one repair away from the key, so it has to be
    // read.
    if (chosen.size < want)
      for (const v of shuffle(usableOf(wrongVariants(g.polite, { dropArticles: false })))) {
        if (chosen.size >= want) break;
        chosen.add(v);
      }
    // And a two-option question is worse than an eliminable third, so if even
    // that came up empty the floor is lifted for this one stem.
    for (const { o } of rankedAll) {
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
     *  keeps its same-frame distractor, which is the one worth hearing.
     *  The list itself is LISTENING_MOVES, at module scope. */
    const keyMove = listeningMoveIndex(s.targetResponse);
    /** Two replies that hand the job to the SAME person are one move, whatever
     *  verb they use to say so: "I am not sure. I will ask our lounge
     *  manager." and "I will call our lounge manager now, sir." were offered
     *  together on 3.6% of papers because the move list matches verb strings
     *  and `ask` is not `call`. The recipient is the thing the guest actually
     *  gets, so that is what decides. */
    const RECIPIENTS = /\b(manager|reception|receptionist|kitchen|chef|supervisor|desk|doctor)\b/gi;
    // The guest cannot hear rank: "I will ask my manager" and "I will tell
    // my supervisor" both hand the problem up, and both were printed under
    // one audio because the tokens differ. Same for the three names of the
    // front desk.
    const SAME_RECIPIENT: Record<string, string> = {
      supervisor: "manager",
      receptionist: "reception",
      desk: "reception",
    };
    const handsOffTo = (t: string) =>
      new Set((t.toLowerCase().match(RECIPIENTS) ?? []).map((w) => SAME_RECIPIENT[w] ?? w));
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
    // AND THIS ONE IS NOT GATED ON `discriminated`, WHICH THE OTHERS ARE.
    //
    // Every rule in this group asks "is there anything in the audio that
    // tells the key from this candidate?" and keeps the candidate when there
    // is. For a candidate that opens with the key's own first four words,
    // that question is answered against the wrong thing: what the audio names
    // is the FRAME, which both of them say, and the object they differ in is
    // the part the audio is silent about. So the gate opens on the strength
    // of the words the two options share.
    //
    //     audio  "I need an invoice for my company."
    //     key    "Certainly, sir. May I have your company name and tax code?"
    //     lure   "Certainly, sir. May I have your billing name, please?"
    //
    // `discriminated` said yes on "company", which is in the key and not in
    // the lure — and the lure is the reply this very course teaches for "Can
    // I get a red invoice for my company?", eleven lines away in the same
    // file. Both are right. Measured before this line moved: a distractor
    // opening with the key's first four words appeared on 7.25% of papers in
    // the audit that reported it and 3.17% on the snapshot this was fixed
    // against; 0.00% after.
    //
    // Two more shapes three reviews read by hand and the rules above missed,
    // because neither is a frame: a paraphrase that keeps most of the key's
    // content ("It keeps every guest safe…" / "It keeps everyone safe…",
    // "The smoking area is outside…" / "You will find the smoking area
    // outside."), and a reply about the same taught item in another frame
    // ("We can add a rollaway bed for one night." / "Certainly, sir. We can set
    // up a rollaway bed."). Both are right whenever the audio does not name
    // what separates them — which is exactly what `discriminated` asks.
    const sharesContent = (t: string) => [...coreOf(t)].filter((w) => keyCore.has(w)).length >= 2;
    const keyLower = s.targetResponse.toLowerCase();
    const keyHeadwords = phraseHeadwords.filter((h) => keyLower.includes(h));
    const sameItem = (t: string) => {
      const lower = t.toLowerCase();
      return keyHeadwords.some((h) => lower.includes(h));
    };
    const secondRightAnswer = (t: string) =>
      pullsAway(t) ||
      sameFrame(t) ||
      (!discriminated(t) &&
        ((keyMove >= 0 && listeningMoveIndex(t) === keyMove) ||
          sameRecipient(t) ||
          sharesContent(t) ||
          sameItem(t)));
    // nearlySameAnswer, not sameAnswer: see the note on the helper.
    const usable = widened.filter(
      (t) => !nearlySameAnswer(t, s.targetResponse) && !secondRightAnswer(t),
    );
    // THE BAND IS ±2 WORDS ON THE SIDE THAT HAS REPLIES, AND WIDER ON THE SIDE
    // THAT DOES NOT.
    //
    // It was a flat `Math.abs(wordsOf(t) - keyLen) <= 2`, and that window is
    // the candidate filter that decided which length ranks the draw below
    // could even ask for. A window symmetric in WORDS is not symmetric in
    // CANDIDATES, because the bank's lengths have a floor and a long tail:
    // it holds almost no replies of two or three words and plenty of
    // fifteen-word ones. So for a five-word key the lower half of the window
    // was empty and "the key is the longest of the three" was unreachable on
    // 91.4% of those items, while for a fourteen-word key the upper half was
    // thin and "the key is the shortest" went the same way. The draw then
    // spent a third of its items asking for a rank that could not exist, and
    // whatever the fallback did with them became a rule a learner could read
    // off the page. Phase 2, where the keys sit shortest against their own
    // pool, was the worst: with the shape rules below already in place but
    // this window still fixed, "always pick the shortest option" answered
    // 44.3% of phase-2 listening questions — the same trick the round had
    // just taken off "avoid the longest", wearing the other hat.
    //
    // This is the same defect as the round that fixed `shortEnough`: a
    // candidate filter, not the rank arithmetic, is what made a rank
    // impossible. The window therefore keeps ±2 as its floor and opens on
    // whichever side is short of candidates until that side can actually
    // supply a pair — never past twelve words, and never wider than the pool
    // has. Widening only the starved side is the point: widening both would
    // hand the similarity score back the length signal the band exists to
    // take away from it, because `ranked` counts shared TOKENS and a longer
    // candidate collects more of them.
    const MIN_PER_SIDE = 4;
    const sideWidth = (dir: -1 | 1) => {
      let w = 2;
      while (
        w < 12 &&
        usable.filter((t) => {
          const d = (wordsOf(t) - keyLen) * dir;
          return d > 0 && d <= w;
        }).length < MIN_PER_SIDE
      )
        w++;
      return w;
    };
    const shortSide = sideWidth(-1);
    const longSide = sideWidth(1);
    const inBand = (t: string) => {
      const d = wordsOf(t) - keyLen;
      return d <= 0 ? -d <= shortSide : d <= longSide;
    };
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
    // THE PAIR OF DISTRACTORS.
    //
    // Three constraints on echo and length used to be the whole rule: at least
    // one distractor no longer than the key, one echoing the audio at least as
    // hard, one at most as hard — each because the surface signal it removes
    // had carried more than half the papers through the block floor once. The
    // two ECHO constraints still apply first.
    //
    // THE LENGTH ONE IS GONE, and the measurement is why. "At least one
    // distractor no longer than the key" cannot be satisfied and leave the key
    // the shortest of the three, so it did not balance length, it banned one
    // of the three positions — and the other two absorbed the traffic.
    // Measured on real papers, by WORD, averaged over five departments:
    //
    //   phase   pick shortest   pick longest   pick middle
    //   P0        21.8%           38.0%          40.2%
    //   P1        26.4%           29.2%          44.4%
    //   P2        24.6%           26.2%          49.4%
    //   P3        15.2%           32.4%          52.6%
    //   P4        14.8%           33.6%          51.4%
    //
    // Against a chance of 33.3%: "never the shortest" is as strong a giveaway
    // as "usually the middle", and the two are the same fact. With the length
    // rank drawn below in words and this constraint removed, the same
    // measurement reads 27.6-39.6% / 24.0-32.6% / 35.2-40.0%, and the share of
    // papers where one of the three tricks ALONE clears the listening block
    // floor falls from 46-69% to 38-46%. "Always longest", which is what this
    // constraint was installed to stop, is held down by the rank draw instead
    // — better than it was holding it: 24.0-32.6% against 26.2-38.0%.
    //
    // What they left was the key at the centre of its options. Both
    // distractors were ranked by likeness to the KEY, so the key was always the
    // option most like the other two, and ten reviews in one round used exactly
    // that: "pick the option most like the other two" answered 46-53% of
    // listening questions, "pick the middle length" 40-48%.
    //
    // So the second distractor is ranked by likeness to the FIRST distractor
    // two times in three, and to the key one time in three. Whichever sentence
    // the pair is built around becomes the middle of the three, and that is
    // the answer only a third of the time. Among the pairs available, the one
    // chosen puts the key at a randomly drawn length rank.
    const keyEcho = echo(s.targetResponse);
    const loudEnough = (c: { t: string }) => echo(c.t) >= keyEcho;
    const quietEnough = (c: { t: string }) => echo(c.t) <= keyEcho;
    const covers = (pair: { t: string }[]) =>
      (pair.some(loudEnough) ? 1 : 0) + (pair.some(quietEnough) ? 1 : 0);
    const bagOfWords = (t: string) =>
      new Set(
        t
          .toLowerCase()
          .replace(/[^a-z' ]/g, " ")
          .split(" ")
          .filter(Boolean),
      );
    const likeness = (a: string, b: string) => {
      const A = bagOfWords(a);
      const B = bagOfWords(b);
      const shared = [...A].filter((w) => B.has(w)).length;
      return shared / Math.max(1, new Set([...A, ...B]).size);
    };
    type Cand = { t: string; score: number };
    // THE SHORTLIST TAKES FROM BOTH SIDES OF THE KEY, NOT THE TOP TWELVE.
    //
    // `ranked` scores a candidate by `share + echo * 2`, and both of those are
    // counts of shared TOKENS, so a longer sentence collects more of them and
    // outranks a shorter one on length alone. The band above bounds that — a
    // candidate can only be a couple of words longer — but it does not remove
    // it, and `top.slice(0, 12)` followed by `i < Math.min(3, top.length)`
    // below means the FIRST distractor of every pair is drawn from the three
    // highest-scoring candidates, which is to say from the long end of the
    // band. Measured on the real builder, the first three of the old shortlist
    // against the key's own length:
    //
    //   phase   shorter than the key   longer   |   the banded pool itself
    //   P1            30%               47%     |     39% / 35%
    //   P2            28%               50%     |     39% / 39%
    //
    // The pool was even; the shortlist was not. A pair needs BOTH distractors
    // shorter than the key to make the key the longest of its three options,
    // and with the first one biased long that shape was reachable on 38-40% of
    // phase 1-2 items against 60-63% for its mirror. That is the second half of
    // the defect, and the half no rank arithmetic downstream can repair: the
    // draw below spent a third of its items asking for a shape the item could
    // not supply.
    //
    // So the shortlist is filled from three lanes — candidates shorter than
    // the key, the same length, and longer — taking each lane's best in turn,
    // with the lane order shuffled each round so no side is systematically
    // first.
    // Each lane keeps its own similarity ranking, so nothing about WHICH
    // sentences are eligible changes; only the length composition of the
    // twelve does. Dividing the score by length was tried in an earlier round
    // and rejected — it inverts the bias instead of removing it, and "longest
    // wins" went to 57.5%.
    const laneOf = (c: Cand) => Math.sign(wordsOf(c.t) - keyLen);
    const lanes = [-1, 0, 1].map((sg) => strict.filter((c) => laneOf(c) === sg));
    const top: Cand[] = [];
    for (let i = 0; top.length < 12 && lanes.some((l) => l[i]); i++)
      for (const lane of shuffle(lanes)) {
        const c = lane[i];
        if (c && top.length < 12) top.push(c);
      }
    const aroundKey = Math.random() < 1 / 3;
    const wantRank = Math.floor(Math.random() * 3);
    const pairs: { a: Cand; b: Cand; w: number }[] = [];
    for (let i = 0; i < Math.min(3, top.length); i++)
      for (let j = 0; j < top.length; j++) {
        // Two distractors that are near-twins of each other hand the key away
        // as the odd one out: "pick the option least like the other two"
        // answered 43-45% of listening questions in five reviews.
        if (i === j || nearlySameAnswer(top[i].t, top[j].t) || likeness(top[i].t, top[j].t) >= 0.6)
          continue;
        pairs.push({
          a: top[i],
          b: top[j],
          w: aroundKey ? likeness(top[j].t, s.targetResponse) : likeness(top[j].t, top[i].t),
        });
      }
    const covered = pairs.filter((p) => covers([p.a, p.b]) === 2);
    const candidates = covered.length ? covered : pairs;
    // WHERE THE KEY SITS WHEN THE THREE OPTIONS ARE SORTED BY LENGTH — IN
    // WORDS, which is the length a learner can see.
    //
    // This counted CHARACTERS, while `inBand` above and `covers` just below
    // both count words. So the rank being drawn balanced a dimension nobody
    // reads, and the one they do read was left to fall where it liked: the
    // key landed mid-length by character 35-48% of the time, near the 33% the
    // draw aims for, while mid-length by WORD ran 39-57% and "always click the
    // middle-length option" cleared the listening block's own floor on 41-77%
    // of papers. That floor exists to stop certifying a learner who heard
    // nothing (phases.ts).
    //
    // A RANK IS NOT ENOUGH: WHAT AN EXCLUSION RULE READS IS ALL THREE GAPS.
    //
    // This counted how many distractors are shorter than the key and stopped
    // there — three buckets plus one for "a distractor exactly as long as the
    // key", which was treated as no rank at all. It never looked at the two
    // distractors against EACH OTHER, and that is the whole of the defect two
    // blind audits reported as "never pick the longest option".
    //
    // Two distractors of the same word count sit on one rung, so the three
    // options have two rungs instead of three, and a rule that ELIMINATES
    // rather than picks then strikes out both distractors in one stroke and
    // is left holding the key. Measured on the real builder, 7,200 listening
    // questions:
    //
    //   key shortest, the two distractors equal to each other   15.7%
    //   key longest,  the two distractors equal to each other   13.5%
    //
    // "Avoid the longest option" is worth 100% on the first of those and
    // "avoid the shortest" 100% on the second; between them they carried
    // 15.7 of the 42.2 points "avoid the longest" scored and 13.5 of the 38.6
    // "avoid the shortest" scored. They are common because they are what a
    // ±2-word band leaves over: once the rank has pushed both distractors to
    // one side of the key there are only one or two word counts left to
    // choose between, so the two land on the same one about half the time,
    // and nothing downstream was looking.
    //
    // Same class of defect as the two rounds before it, one layer in: the
    // first listening round had a candidate filter that made a rank
    // impossible, the reading block had no rank at all, and this one has the
    // rank machinery but measures the wrong thing.
    //
    // So the three options are classified by the whole LADDER they form when
    // sorted by word count, five rungs from "the key is the only short one"
    // to "the key is the only long one", with the two joint positions in
    // between. A distractor exactly as long as the key is no longer a
    // non-rank to be avoided — it is the half-step, and the half-step is what
    // makes the deficit below payable.
    const KEY_SHORTEST = 0;
    const KEY_JOINT_SHORTEST = 1;
    const KEY_MIDDLE = 2;
    const KEY_JOINT_LONGEST = 3;
    const KEY_LONGEST = 4;
    /** All three the same length: no ladder at all, and no rule can read it. */
    const FLAT = 5;
    /** The two distractors equal to each other and both on one side of the
     *  key — the shape above, and the only one an exclusion rule answers
     *  outright. Never chosen while anything else exists. */
    const TWINS = 6;
    const shapeOfPair = (p: { a: Cand; b: Cand }) => {
      const [lo, hi] = [wordsOf(p.a.t), wordsOf(p.b.t)].sort((x, y) => x - y);
      if (lo === keyLen && hi === keyLen) return FLAT;
      if (lo === hi) return TWINS;
      if (lo === keyLen) return KEY_JOINT_SHORTEST;
      if (hi === keyLen) return KEY_JOINT_LONGEST;
      return keyLen < lo ? KEY_SHORTEST : keyLen > hi ? KEY_LONGEST : KEY_MIDDLE;
    };
    const byShape = new Map<number, typeof candidates>();
    for (const p of candidates) {
      const r = shapeOfPair(p);
      byShape.set(r, [...(byShape.get(r) ?? []), p]);
    }
    // WHERE THE DRAWN RANK DOES NOT EXIST — AND IT IS NOT MISSING AT RANDOM.
    //
    // The old line re-drew uniformly from `[...byRank.keys()]`. That was
    // wrong twice over. It put the tied bucket on the same footing as a real
    // rank — tied is reachable on 88% of items against 60-75% for the ranks —
    // so 13.6% of items landed on the bucket the code itself called
    // meaningless as a target. And which rank is missing depends on the key:
    // a band of ±2 words around a SHORT key reaches down into word counts the
    // speaking bank does not contain (there are almost no three-word
    // replies), so "the key is the longest" exists for only 19.8% of items
    // whose key is five words or fewer, against 90.5% for "the key is the
    // shortest". A uniform re-draw poured that missing third straight onto
    // the shortest, which is the other half of why an exclusion rule paid.
    //
    // A miss goes to the OTHER END, and the middle rung goes last of all.
    //
    // Which rung is missing is decided by where the key sits in the bank's own
    // length distribution, and the middle is the rung the content nearly
    // always supplies — reachable on 69-87% of items by phase, against 39-69%
    // for "the key is the longest". Walking a miss to the NEAREST rung
    // therefore hands the middle every miss from both ends at once: simulated
    // over the reachable sets of 5,400 real items, that put 45-49% of items at
    // "the key is in the middle" and gave "pick the middle-length option"
    // exactly the score the block started this round with.
    //
    // So a miss is paid by the rungs that are scarce, never by the one that is
    // not: the drawn rung, then the far end, then the two half-steps nearest
    // the draw, and the middle last. Worst single phase-by-strategy deviation
    // from the 33.3 a guess pays, over the same 5,400 items:
    //
    //   nearest rung first                   15.8
    //   farthest whole rung, middle in line    9.8
    //   farthest whole rung, middle LAST       5.6
    //
    // The half-steps sit above the middle and below the far end because a key
    // that is joint-shortest gives a length rule half a point instead of a
    // whole one, but two options of the same length leave "pick the middle"
    // nothing to point at, which is worth half to a learner who clicks one of
    // the two. FLAT and TWINS sit off the ladder, TWINS last of all.
    const target = wantRank * 2;
    const nearestFirst = (rungs: number[]) =>
      [...shuffle(rungs)].sort((x, y) => Math.abs(x - target) - Math.abs(y - target));
    const chosenShape =
      [
        target,
        ...shuffle([KEY_SHORTEST, KEY_LONGEST].filter((r) => r !== target)),
        ...nearestFirst([KEY_JOINT_SHORTEST, KEY_JOINT_LONGEST]),
        ...(target === KEY_MIDDLE ? [] : [KEY_MIDDLE]),
        FLAT,
        TWINS,
      ].find((r) => byShape.has(r)) ?? target;
    const best = (byShape.get(chosenShape) ?? candidates).sort((x, y) => y.w - x.w)[0];
    const clean: Cand[] = best ? [best.a, best.b] : top.slice(0, 2);
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
      // The tip says WHY this is the reply. Echoing the audio alone told a
      // learner who missed it what they had heard and nothing else.
      note: `${speakerLabel(s)}: "${s.guestPrompt}" — ${s.helpTip}`,
      audioWho: speakerAudioLabel(s),
    };
  });

  const readingCards = phaseLessons.flatMap((l) =>
    l.reading.questions.map((q) => ({ q, text: l.reading.text })),
  );
  // WHERE THE ANSWER SITS WHEN A READING QUESTION'S OPTIONS ARE SORTED BY
  // LENGTH — first, middle or last, counted in WORDS.
  //
  // Every other block on this paper draws that rank and then looks for options
  // to fit it. The reading block was the one with no rank in it at all: three
  // authored options, printed in a shuffle, four questions taken off the top
  // of another shuffle. Whatever the authors' habits did to the length of an
  // answer went straight onto the paper, and it is not a small effect —
  // measured on the real builder, one paper at a time, by word:
  //
  //   phase   answer is shortest   is longest      "pick shortest" / "longest"
  //   P0           30.0%             42.6%           clears the reading floor
  //   P1           32.2%             30.6%           on 24-94% of papers
  //   P2           44.1%             24.2%           depending on the phase
  //   P3            8.3%             72.6%
  //   P4           17.5%             60.1%
  //
  // Phase 2 is where an audit found it (answers written tersely beside two
  // padded distractors), but phase 3 is worse and runs the other way: "always
  // click the longest option" answered 72.6% of reading questions and cleared
  // the block's own 50% floor on 94.2% of papers. That floor exists to stop
  // certifying a learner who read nothing (phases.ts).
  //
  // This cannot be fixed the way the listening block fixes it, because the
  // three options are AUTHORED PROSE: there is nothing here to generate, trim
  // or pad without writing content into the exam builder. What is left is the
  // draw — WHICH four questions the paper asks. So the four are picked as a
  // set whose answers land at all three length positions about equally often,
  // and the first set that does is taken, so the draw stays as close to
  // uniform over the phase's questions as the content allows. A pool where
  // nearly every answer is the longest option (SW and BO at week 40: 97.5% and
  // 96.3%) cannot supply such a set, and no arrangement of it can — those are
  // reported as content, with the questions named.
  const positionShare = (options: string[], correct: number) => {
    const ws = options.map(wordsOf);
    const key = ws[correct] ?? 0;
    const below = ws.filter((w) => w < key).length;
    // Options of the SAME length share their positions: two seven-word options
    // and a ten-word one leave the learner no readable "shortest" at all, so
    // the answer counts half at each of the two places it could be sorted
    // into. Three phase-2 questions in four are that shape.
    const equal = Math.max(1, ws.filter((w) => w === key).length);
    const at = (p: number) => (p >= below && p <= below + equal - 1 ? 1 / equal : 0);
    const first = at(0);
    const last = at(ws.length - 1);
    return [first, 1 - first - last, last];
  };
  /** How much two options look like each other, counted in content words —
   *  the same bag the answer-collision rules above are built on. */
  const optionLikeness = (a: string, b: string) => {
    const A = bagOf(a);
    const B = bagOf(b);
    return [...A].filter((w) => B.has(w)).length / Math.max(1, new Set([...A, ...B]).size);
  };
  /** "Pick the one most like the other two" and "pick the odd one out" are the
   *  two ends of a single ranking, and both were live: the odd-one-out rule
   *  answered 38% of phase-2 reading questions and cleared the block floor on
   *  50% of papers, the twin rule 41% and 54% in phase 1. Balancing the length
   *  positions alone moved neither, and in phase 3 it made the twin rule worse
   *  — which is trading one trick for another, so both ends are balanced. */
  const twinShare = (options: string[], correct: number) => {
    const score = options.map((o, i) =>
      options.reduce((sum, other, j) => (i === j ? sum : sum + optionLikeness(o, other)), 0),
    );
    const share = (dir: 1 | -1) => {
      const best = Math.max(...score.map((s) => dir * s));
      const tied = score.filter((s) => dir * s === best).length;
      return dir * (score[correct] ?? 0) === best ? 1 / tied : 0;
    };
    return [share(1), share(-1)];
  };
  const readingShares = new Map(
    readingCards.map((c) => [
      c,
      [...positionShare(c.q.options, c.q.correct), ...twinShare(c.q.options, c.q.correct)],
    ]),
  );
  // A set is balanced when no rule carries more — or less — of the block than
  // the 1-in-3 a learner would get by guessing. Under is as much a giveaway as
  // over: "the answer is never the shortest one" turns a three-option question
  // into a coin toss, which is the lesson the listening block learned when a
  // filter there quietly banned that same position.
  const readingTarget = MIX.reading / 3;
  const imbalance = (set: typeof readingCards) => {
    const sums = new Array(5).fill(0);
    for (const c of set) {
      const share = readingShares.get(c)!;
      for (let i = 0; i < sums.length; i++) sums[i] += share[i]!;
    }
    return Math.max(...sums.map((s) => Math.abs(s - readingTarget)));
  };
  // Sixteen tries, and the first set inside the band wins. Where the content
  // allows balance this lands on the first or second try and the draw is
  // effectively the old uniform one; where it does not, sixteen is where
  // trying harder stops buying accuracy and starts buying repetition — the
  // same few questions on every paper, which is its own way of failing a
  // learner who sits the test twice.
  const READING_TRIES = 16;
  const readingPool = (() => {
    let best = shuffle(readingCards).slice(0, MIX.reading);
    let bestScore = imbalance(best);
    for (let i = 1; i < READING_TRIES && bestScore > 1 / 3; i++) {
      const next = shuffle(readingCards).slice(0, MIX.reading);
      const score = imbalance(next);
      if (score < bestScore) {
        best = next;
        bestScore = score;
      }
    }
    return best;
  })();
  // Reading options are shuffled here like every other question type. Without
  // this they arrived in authored order, so a week whose answers all sit at A
  // handed the paper away.
  const readingQs: Question[] = readingPool.map(({ q, text }) => {
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
