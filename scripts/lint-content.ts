#!/usr/bin/env bun
// ============================================================
// STRUCTURAL CONTENT LINTER
//
// Why this exists.
//
// The curriculum is generated: one shared sentence frame per lesson, six
// department word banks substituted into it. That is what makes six
// courses affordable — and it is also a bug factory, because a frame is
// written while looking at ONE department's bank and then silently
// applied to five others.
//
// The previous defence was `KNOWN_BAD_STRINGS` in verify-content.ts: a
// list of exact sentences that had already shipped. It could not catch a
// synonym, a sibling slot, or a reworded frame, and its green output
// ("all authored content passes") was actively misleading — an audit
// found ~129 broken learner-facing sentences while it reported success.
//
// This linter checks INVARIANTS instead of instances, in three layers:
//
//   A. SLOT CONSISTENCY — every department's word in a given bank slot
//      must be the same part of speech. The frame was written for one of
//      them; if the others disagree, the frame breaks for them. This
//      needs no dictionary of truth, only internal agreement, so it keeps
//      working as banks are re-authored.
//
//   B. SLOT CONTRACTS — where a frame grammatically demands a part of
//      speech (a bare verb after "Let me …", an adjective after "That
//      part is …"), the slot declares it and every department is checked
//      against it. This catches the case layer A cannot: all six wrong.
//
//   C. SENTENCE STRUCTURE — mechanical English violations over every
//      generated learner-facing string: repeated tokens, stacked
//      determiners, a/an mismatch, subject-verb disagreement, and the
//      article omission that Vietnamese learners must specifically
//      unlearn.
//
// Layer C runs on the COMPILED registry, so it sees exactly what a
// learner sees, not what the author intended.
// ============================================================

import { ALL_WEEKS } from "../src/lib/content/week-content";
import { P1_BANKS } from "../src/lib/content/phase1-lexicon";
import { P2_BANKS } from "../src/lib/content/phase2-lexicon";
import { P3_BANKS } from "../src/lib/content/phase3-lexicon";
import { P4_BANKS } from "../src/lib/content/phase4-lexicon";

type Pos = "VERB" | "ADJ" | "ADVERBIAL" | "NOUN";

const errors: string[] = [];
const warnings: string[] = [];

// ------------------------------------------------------------
// Part-of-speech tagger.
//
// Deliberately small and curated rather than a general NLP model: it only
// has to be CONSISTENT to make layer A work, and correct on the closed
// vocabulary the banks actually use to make layer B work. Unknown words
// fall through to NOUN, which is the right default for these banks.
// ------------------------------------------------------------
const VERBS = new Set([
  // Week 21's problem report reads slot 3 as a participle ("One request was
  // postponed") and slot 8 as a past verb ("I exchanged the broken one").
  // Without their stems here the tagger read all four as nouns.
  "postpone",
  "miss",
  "reject",
  "exchange",
  // Spa's end-of-shift slot 3 ("Dim the lights") is a verb phrase like the
  // other departments' "Restock" and "Serve faster".
  "dim",
  // Intransitive past-report verbs, added with the P0 content fix so
  // "The guest arrived at noon." tags as a verb rather than a noun.
  "arrive",
  "depart",
  "greet",
  "check",
  "allocate",
  "offer",
  "escort",
  "show",
  "follow",
  "serve",
  "clear",
  "pour",
  "cook",
  "book",
  "welcome",
  "warm",
  "fold",
  "light",
  "rest",
  "clean",
  "make",
  "vacuum",
  "mop",
  "dust",
  "change",
  "refill",
  "send",
  "file",
  "count",
  "order",
  "attend",
  "pay",
  "confirm",
  "save",
  "transfer",
  "cancel",
  "note",
  "report",
  "spell",
  "help",
  "include",
  "provide",
  "try",
  "enhance",
  "arrange",
  "prepare",
  "wash",
  "set",
  "take",
  "print",
  "sign",
  "invite",
  "decorate",
  "remember",
  "meet",
  "write",
  "deliver",
  "collect",
  // "Let me fetch it for you" — a service verb the dictionary did not know,
  // so the verb-slot rule read a correct sentence as a defect.
  "fetch",
  "inspect",
  "replace",
  "repair",
  "reset",
  "waive",
  "upgrade",
  "refund",
  "extend",
  "reissue",
  "escalate",
  "apologise",
  "apologize",
  "explain",
  "record",
  "update",
  "review",
  "reschedule",
  "restock",
  "brief",
  "handover",
  "verify",
  "process",
  "issue",
  "settle",
  "charge",
  "quote",
  "negotiate",
  "match",
  "approve",
  "seat",
  "enter",
  "present",
  "open",
  "strip",
  "introduce",
  "repeat",
  "wipe",
  "get",
  "start",
  "place",
  "track",
  "close",
  "walk",
  "say",
  "hand",
  "call",
  "ask",
  "tell",
  "bring",
  "give",
  "keep",
  "hold",
  "move",
  "turn",
  "put",
  "let",
  "run",
  "lead",
  "guide",
  "seek",
  "log",
  "acknowledge",
  "apologise",
  "compensate",
  "reassure",
  "confirm",
  "double-check",
  "notify",
  "inform",
  "remind",
  "assist",
  "accompany",
  "present",
  "recommend",
  "suggest",
  "propose",
  "receive",
  "service",
  "heat",
  "speed",
  "chill",
  "reserve",
  "reply",
  "empty",
  "speak",
  "return",
  "email",
  "reprogram",
  "top",
  "lay",
  "release",
  "re-clean",
  "resend",
  "rebook",
  "swap",
  "waive",
  "deduct",
  "credit",
  "comp",
  "expedite",
  "prioritise",
  "prioritize",
  "cool",
  "reheat",
  "refresh",
  "replenish",
  "escort",
  "page",
  "dispatch",
  "allocate",
  "settle",
  "post",
  "void",
  "split",
  "itemise",
  "itemize",
  "stamp",
  "scan",
  "copy",
  "add",
  "apply",
  "attach",
  "correct",
  "freeze",
  "reduce",
  "revise",
  "widen",
  "lower",
  "remove",
  "round",
  "wrap",
  "block",
  "store",
  "double",
  "grant",
  "reprint",
  "restore",
  "air",
  "cover",
  "deep",
  "re-press",
  "rewash",
  "use",
  "pass",
  "arrange",
  "adjust",
  "upgrade",
  "comp",
  "honour",
  "honor",
  "rebate",
  "reallocate",
  "reconfirm",
  "redo",
  "absorb",
  "guarantee",
  "share",
  "drop",
  "assign",
  "host",
  "discount",
  "fill",
  "fix",
  "sort",
  "look",
  "find",
  "make",
  "do",
  "handle",
  "solve",
  "chase",
  "finish",
  "complete",
  "welcome",
  "remember",
  "arrange",
  "upgrade",
  "restock",
  "replace",
  "agree",
  "please",
  "manage",
  "receive",
  "organise",
  "organize",
  "list",
  "relax",
  "end",
  "summarise",
  "summarize",
  "recap",
  "wrap-up",
  "jot",
  "type",
  // base form == past form; seeing one proves nothing about tense
  "read",
  "cost",
  "cut",
  "hit",
  "shut",
  "spread",
  "hurt",
  "bet",
  "quit",
]);

// Narrow on purpose. A broad suffix rule mis-tags ordinary nouns
// ("lobby", "library", "accountant", "trolley"), which buries the real
// defects under false positives — the failure mode that made the previous
// gate useless.
const ADJ_SUFFIX = /(ous|ful|able|ible|less|ish)$/i;

/** Words the heuristic cannot resolve from form alone. English is full of
 *  noun/verb pairs ("clean", "rest", "book", "change"), so the sense used
 *  by these banks is declared here rather than guessed. */
const POS_OVERRIDES: Record<string, Pos> = {
  // nouns that look like verbs
  "rest room": "NOUN",
  massage: "VERB",
  register: "VERB",
  line: "NOUN",
  surprise: "NOUN",
  quotation: "NOUN",
  caller: "NOUN",
  message: "NOUN",
  request: "NOUN",
  company: "NOUN",
  delivery: "NOUN",
  contact: "NOUN",
  ring: "NOUN",
  operator: "NOUN",
  repeat: "NOUN",
  dial: "VERB",
  transfer: "NOUN",
  "party size": "NOUN",
  "window seat": "NOUN",
  // adjectives the list did not carry
  clean: "ADJ",
  stained: "ADJ",
  forgotten: "ADJ",
  overdue: "ADJ",
  lost: "ADJ",
  leaking: "ADJ",
  misspelled: "ADJ",
  incorrect: "ADJ",
  wrong: "ADJ",
  overcooked: "ADJ",
  blocked: "ADJ",
  "not ready": "ADJ",
  unavailable: "ADJ",
  delayed: "ADJ",
  undercooked: "ADJ",
  smelly: "ADJ",
  disappointed: "ADJ",
  offline: "ADJ",
  faulty: "ADJ",
  unhappy: "ADJ",
  "not working": "ADJ",
  unheated: "ADJ",
  melted: "ADJ",
  frozen: "ADJ",
  stuck: "ADJ",
  cracked: "ADJ",
  "burnt out": "ADJ",
  "double-booked": "ADJ",
  rainy: "ADJ",
  overcharged: "ADJ",
  locked: "ADJ",
  "sold out": "ADJ",
  cancelled: "ADJ",
  unanswered: "ADJ",
  "too hot": "ADJ",
  "too cold": "ADJ",
  uncomfortable: "ADJ",
  cloudy: "ADJ",
  noisy: "ADJ",
  damaged: "ADJ",
  torn: "ADJ",
  broken: "ADJ",
  dirty: "ADJ",
  sticky: "ADJ",
  missing: "ADJ",
  slow: "ADJ",
  mistimed: "ADJ",
  deleted: "ADJ",
  "out of order": "ADJ",
  called: "ADJ",
  prepared: "ADJ",
  found: "ADJ",
  delivered: "ADJ",
  paid: "ADJ",
  spotless: "ADJ",
  comfortable: "ADJ",
  "well handled": "ADJ",
  "filed properly": "ADJ",
  "no complaints": "NOUN",
  "thanked us": "VERB",
  // -able/-ible suffix false friends
  table: "NOUN",
  vegetable: "NOUN",
  cable: "NOUN",
  bible: "NOUN",
  // "well + participle" is a predicate adjective, not a verb phrase
  "well rested": "ADJ",
  "well handled": "ADJ",
  "well organised": "ADJ",
  "well prepared": "ADJ",
  "well managed": "ADJ",
  "well received": "ADJ",
  "well done": "ADJ",
  // intensifier + participle is a predicate adjective
  "very pleased": "ADJ",
  "very smooth": "ADJ",
  "very busy": "ADJ",
  "very good": "ADJ",
};
const ADJS = new Set([
  // Replacements from the P0 content fix: the words that took over slots
  // where the old filler was the wrong semantic class for its frame
  // ("It is a little safe.", "The machine is unhappy.").
  // "crushed" joined them in the P1 fix: "The item is crushed." for a Guest
  // Relations gift box, where the slot used to hold "Rainy".
  // "lukewarm", "interrupted" and "suspended" joined in the round-3 fix, when
  // Spa's fault slots held "Unheated", "Overdue" and "Double-booked" — three
  // administrative words in frames that read "It is ___" and "The service is
  // ___", and the learner was locked to say all three.
  "crushed",
  "lukewarm",
  "interrupted",
  "suspended",
  "scratched",
  "chipped",
  "humid",
  "crowded",
  "cool",
  "warm",
  "plain",
  "unclear",
  "wilted",
  "burnt",
  "smooth",
  "clean",
  "tidy",
  "wet",
  "dry",
  "dusty",
  "bright",
  "soft",
  "heavy",
  "uneven",
  "busy",
  "full",
  "quiet",
  "noisy",
  "safe",
  "empty",
  "late",
  "slippery",
  "greasy",
  "hot",
  "cold",
  "fresh",
  "sweet",
  "salty",
  "sour",
  "delicious",
  "sharp",
  "relaxing",
  "gentle",
  "strong",
  "stuffy",
  "calm",
  "tired",
  "deep",
  "elegant",
  "special",
  "beautiful",
  "formal",
  "upset",
  "important",
  "lovely",
  "dark",
  "detailed",
  "urgent",
  "finalised",
  "unpaid",
  "cheap",
  "expensive",
  "confidential",
  "fragile",
  "cloudy",
  "complicated",
  "optional",
  "unlimited",
  "included",
  "complimentary",
  "negotiable",
  "mandatory",
  "compulsory",
  "available",
  "ready",
  "free",
  "open",
  "closed",
  "correct",
  "damaged",
  "torn",
  "broken",
  "efficient",
  "excellent",
  "thorough",
  "unhurried",
  "warm",
  "complete",
  "positive",
  "polite",
  "friendly",
  "professional",
  "accurate",
  "punctual",
  "attentive",
]);

// Word-boundary matters: without it "over" would swallow "Overbooking".
const ADVERBIAL_HEAD =
  /^(on|at|in|by|with|without|under|over|for|from|during|after|before|ahead)\b/i;

/** Irregular past forms the -ed rule cannot derive. */
const IRREGULAR_PAST = new Set([
  "wrote",
  "told",
  "sent",
  "took",
  "left",
  "made",
  "said",
  "gave",
  "kept",
  "held",
  "put",
  "ran",
  "led",
  "found",
  "did",
  "went",
  "came",
  "brought",
  "thought",
  "read",
  "spoke",
  "met",
  "paid",
  "sold",
  "built",
  "began",
  "chose",
  "dealt",
  "felt",
  "got",
  "heard",
  "lost",
  "meant",
  "rang",
  "saw",
  "set",
  "showed",
  "spent",
  "stood",
  "understood",
]);

/** True when `w` is a past-tense or past-participle form of a verb the
 *  tagger knows: "noted" → "note", "stopped" → "stop", "replied" → "reply". */
function isPastOfKnownVerb(w: string): boolean {
  if (IRREGULAR_PAST.has(w)) return true;
  if (!w.endsWith("ed")) return false;
  const stem = w.slice(0, -2);
  if (VERBS.has(stem)) return true; // checked → check
  if (VERBS.has(stem + "e")) return true; // noted → note
  if (stem.endsWith("i") && VERBS.has(stem.slice(0, -1) + "y")) return true; // replied → reply
  if (/(.)\1$/.test(stem) && VERBS.has(stem.slice(0, -1))) return true; // stopped → stop
  return false;
}

/** Singular nouns that end in -s and correctly take a singular verb. */
const UNCOUNTABLE_S = new Set([
  "news",
  "series",
  "species",
  "campus",
  "bonus",
  "status",
  "focus",
  "analysis",
  "basis",
]);

/** English is riddled with noun/verb pairs ("upgrade", "welcome",
 *  "report"), so the tagger returns every reading a headword plausibly
 *  has. A slot contract is satisfied when the required part of speech is
 *  among them; departments are inconsistent only when their readings share
 *  nothing at all. Guessing a single tag instead produced ~1000 false
 *  positives and buried the real defects. */
function posOf(word: string): Set<Pos> {
  const w = word.toLowerCase().trim();
  if (POS_OVERRIDES[w]) return new Set([POS_OVERRIDES[w]]);

  const parts = w.split(/\s+/);
  const head = parts[0];
  if (ADVERBIAL_HEAD.test(w)) return new Set<Pos>(["ADVERBIAL"]);
  if (ADJS.has(w)) return new Set<Pos>(["ADJ"]);

  // Past-tense / past-participle forms. Week 21 is an end-of-shift report,
  // so its whole slot is past tense ("I noted it", "The guest checked in").
  // Without this the tagger reads every one of them as a noun.
  if (isPastOfKnownVerb(head)) {
    // A bare participle is both a past verb and a predicate adjective:
    // "I noted it" / "Everything was checked".
    if (parts.length === 1) return new Set<Pos>(["VERB", "ADJ"]);
    // With a determiner or particle after it, the phrase is verbal:
    // "checked in", "made the difference", "set up again".
    const governs =
      /^(the|a|an|your|our|my|his|her|their|it|them|up|down|out|in|back|again|to|off|over)$/.test(
        parts[1],
      );
    if (governs) return new Set<Pos>(["VERB"]);
    // A past verb followed by a comparative or time adverb is still verbal:
    // "took longer", "felt better", "started later".
    if (
      /^(longer|better|worse|later|earlier|faster|sooner|well|badly|quickly|slowly)$/.test(parts[1])
    )
      return new Set<Pos>(["VERB"]);
    // Otherwise it is a participle modifying a noun — "lost booking",
    // "cancelled reservation", "chilled champagne" — i.e. a noun phrase.
    return new Set<Pos>(["NOUN"]);
  }

  const out = new Set<Pos>();
  if (VERBS.has(head)) {
    out.add("VERB");
    // "sign the sheet" / "send up" govern an object or particle, so they
    // are verbal only. "welcome drink" / "dust allergy" are compounds and
    // read as nouns too.
    const governsObject =
      parts.length > 1 &&
      /^(the|a|an|your|our|my|his|her|their|it|up|down|out|in|back|again)$/.test(parts[1]);
    if (!governsObject) out.add("NOUN");
    return out;
  }
  if (ADJS.has(head) && parts.length === 1) return new Set<Pos>(["ADJ"]);
  if (parts.length === 1 && ADJ_SUFFIX.test(w)) return new Set<Pos>(["ADJ"]);
  return new Set<Pos>(["NOUN"]);
}

const posLabel = (s: Set<Pos>) => [...s].join("|");

// ------------------------------------------------------------
// LAYER A + B — bank slot checks
// ------------------------------------------------------------
type BankSet = Record<string, Record<string, { word: string }[]>>;
type BankSetWithArt = Record<string, Record<string, { word: string; art?: string }[]>>;

/** Slots whose frame grammatically demands a part of speech. Declared from
 *  the spine files — see the FRAMES comment above each week function.
 *
 *  A slot may be uniform (`"VERB"`) or split by index, because several
 *  slots legitimately hold drill words in the low indices and summary
 *  nouns in the last one or two (`{ "0-7": "VERB", "8-9": "NOUN" }`). */
/** A slot may accept more than one part of speech where the frame is a
 *  predicate ("That part is …" takes an adjective OR a prepositional
 *  phrase such as "on request"). */
type Accepts = Pos | Pos[];
type SlotSpec = Accepts | Record<string, Accepts>;

const SLOT_CONTRACTS: Record<string, Record<string, SlotSpec>> = {
  P1: {
    roles: "NOUN",
    places: "NOUN",
    requests: "NOUN",
    states: "ADJ",
    routines: "VERB",
    problems: "ADJ",
    // W12 · "Hello, {0}." · "May I take your {1}?" · "I will send it {2}."
    //       "Let me {3} for you." · "The {4} is ready." · "Please {5}, sir."
    //       "I will {6} soon." · "Please {7} any time, sir."
    phone: {
      "0-1": "NOUN",
      "2-2": "ADVERBIAL",
      "3-3": "VERB",
      "4-4": "NOUN",
      "5-6": "VERB",
      "7-7": "VERB",
    },
    // W14 · "Here is your {0}." · "Please leave the {1} here." · "The work is {2}."
    //       "Have a good {3}, madam." · "Please take the {4}." · "The {5} is ready, sir."
    //       "I will check the {6}."
    closing: { "0-1": "NOUN", "2-2": "ADJ", "3-6": "NOUN" },
  },
  P2: {
    steps: { "0-7": "VERB", "8-9": "NOUN" },
    details: "NOUN",
    // W18 · "I am preparing your {0}." · "May I have your {1}?" · "Is the {2} correct?"
    //       "The {3} is on file." · "A {4} is added." · "Which {5} would you prefer?"
    //       "Here is your {6}." · "You can {7} now." · "Your request is {8}."
    //       "Please {9} on this line."
    paperwork: { "0-6": "NOUN", "7-7": "VERB", "8-8": ["ADJ", "ADVERBIAL"], "9-9": "VERB" },
    choices: "NOUN",
    offers: { "0-7": "NOUN", "8-8": ["ADJ", "ADVERBIAL"], "9-9": "NOUN" },
    // W19 · "Please respect the {0}." · "Our {1} is simple." · "The {2} is outside."
    //       "The {3} is over there." · "Do not touch the {4}." · "Please use the {6}."
    //       "May I remind you of the {8}?" · "This is a hotel {9}."
    rules: "NOUN",
    // W21 · past-tense shift report. "I {0} it this morning." · "{4} was very busy."
    //       "We had twelve {5} today." · "The guest {1} at noon." · "I {9} everything down."
    //       "One booking was {2}." · "It {6} than usual." · "I {7} the broken one."
    //       "I {3} the supervisor." · "Everything was {8}."
    reports: {
      "0-0": "VERB",
      "1-1": "VERB",
      "2-2": "ADJ",
      "3-3": "VERB",
      "4-4": "NOUN",
      "5-5": "NOUN",
      "6-6": "VERB",
      "7-7": "VERB",
      "8-8": "ADJ",
      "9-9": "VERB",
    },
    // W22 · "The service was {0} today." · "Everything finished {1}."
    //       "We follow the hotel {2}." · "We can always {3}." · "The {4} was positive."
    //       "That was {5} by the team." · "The {6} starts at two." · "Let me {7} the day."
    //       "{8} was noted today." · "{9} at the end of the day."
    wrapUp: {
      "0-0": "ADJ",
      "1-1": "ADVERBIAL",
      "2-2": "NOUN",
      "3-3": "VERB",
      "4-4": "NOUN",
      "5-5": "ADJ",
      "6-6": "NOUN",
      "7-7": "VERB",
      "8-9": "NOUN",
    },
  },
  P3: {
    upgrades: "NOUN",
    policies: "NOUN",
    commitments: "VERB",
    partners: "NOUN",
    complaints: "NOUN",
    solutions: "VERB",
    handover: "NOUN",
    // W30 · every frame is "Let me confirm the {w}." and its siblings — the
    // slot is DETAILS TO CONFIRM throughout. It had no entry at all, which is
    // why "The {w} will not happen again." and "I am ready for the {w}."
    // sailed through with a room preference and a flight time in them.
    wrapUp: "NOUN",
  },
  P4: {
    story: "NOUN",
    preferences: "NOUN",
    disputes: "NOUN",
    occasions: "NOUN",
    tradeoffs: "VERB",
    emergencies: "NOUN",
    // Undeclared until the P0 fix, so the week-37/38/40 frames were checked
    // by layer A alone (all six agreeing is not the same as all six right).
    terms: "NOUN",
    proposal: "NOUN",
    wrapUp: "NOUN",
  },
};

function specFor(spec: SlotSpec | undefined, index: number): Pos[] | undefined {
  if (!spec) return undefined;
  if (typeof spec === "string") return [spec];
  if (Array.isArray(spec)) return spec;
  for (const [range, pos] of Object.entries(spec)) {
    const [lo, hi] = range.split("-").map(Number);
    if (index >= lo && index <= hi) return Array.isArray(pos) ? pos : [pos];
  }
  return undefined;
}

// ------------------------------------------------------------
// LAYER D — semantic class of a bank slot
//
// Part of speech is necessary and not sufficient. Both bank contracts say so
// in as many words, and both carry a "Fails as" column naming the exact
// sentences that must never render. Nothing enforced that column, so two of
// the sentences it names by name were live in the course: BO-31 shipped
// "The market position is what makes this place special." and BO-32 shipped
// "Based on your preferred billing cycle, may I suggest something that suits
// you better?" — the first and second rows of the phase-4 table. The document
// was right; it just had no teeth.
//
// A general semantic classifier is not on the table. What IS decidable is the
// narrow thing the contracts actually assert: certain slots feed frames that
// only make sense about something a GUEST can see, choose, or witness, and a
// back-office noun in that slot is always wrong. Layer D encodes that as
// lexical markers per slot, each carrying the contract line it comes from.
//
// Two kinds of rule:
//   · slot   — applies to every index of the slot
//   · index  — one frame in the week is narrower than the slot as a whole
//              (week 32 asks "Would you like the same {preferences[5]} as
//              last time?", which needs something choosable; an allergy is a
//              constraint, not a choice)
// ------------------------------------------------------------

type SemanticRule = {
  slot: string;
  /** Restrict to one index when a single frame is narrower than the slot. */
  index?: number;
  deny: RegExp;
  /** What the slot must denote, quoted from the bank contract. */
  must: string;
  /** The contract's own "Fails as" wording. */
  failsAs: string;
};

const SEMANTIC_RULES: Record<string, SemanticRule[]> = {
  P4: [
    {
      slot: "story",
      deny: /\b(position|score|trend|record|certification|testimonial|advantage|capacity|occupancy|revenue|margin|index)\b/i,
      must: "something about the property worth telling",
      failsAs: "an internal KPI",
    },
    {
      slot: "preferences",
      deny: /\b(billing|invoice|budget|contract|supplier|policy|reporting|signing|payment|decision|authority|cycle|format|frequency|ceiling)\b/i,
      must: "a guest taste the staff can act on",
      failsAs: "a back-office setting",
    },
    {
      slot: "preferences",
      index: 5,
      deny: /\b(allergy|allergic|intolerance|sensitivity|restriction)\b/i,
      must: 'something choosable — the frame is "Would you like the same {w} as last time?"',
      failsAs: "a constraint the guest cannot be offered a repeat of",
    },
    {
      slot: "emergencies",
      deny: /\b(system|gateway|payroll|breach|email|outage|crash|default|fraudulent|overbooking|bank transfer|mass cancellation|contract file)\b/i,
      must: "an on-site incident a guest can witness",
      failsAs: "a back-office problem",
    },
  ],
};

/** Known violations, each waiting on a content fix. A word listed here is
 *  reported as debt instead of failing the build — and a word listed here
 *  that NO LONGER violates fails the build too, so the file cannot rot into
 *  a list of things that were fixed years ago. Format: "P4.slot[i] DEP". */
const SEMANTIC_DEBT: Set<string> = new Set(
  JSON.parse(await Bun.file(new URL("./_semantic-debt.json", import.meta.url)).text())
    .entries as string[],
);
const debtSeen = new Set<string>();

function lintSemantics(phase: string, banks: BankSet) {
  for (const rule of SEMANTIC_RULES[phase] ?? []) {
    for (const dep of Object.keys(banks)) {
      const words = banks[dep][rule.slot] ?? [];
      words.forEach((w, i) => {
        if (rule.index !== undefined && i !== rule.index) return;
        if (!rule.deny.test(w.word)) return;
        const key = `${phase}.${rule.slot}[${i}] ${dep}`;
        if (SEMANTIC_DEBT.has(key)) {
          debtSeen.add(key);
          return;
        }
        errors.push(
          `[D semantic-class] ${key} "${w.word}" — slot must denote ${rule.must}; this reads as ${rule.failsAs}`,
        );
      });
    }
  }
}

/** A debt entry whose word was fixed (or renumbered) must be deleted. */
function reportStaleDebt() {
  for (const key of SEMANTIC_DEBT) {
    if (!debtSeen.has(key))
      errors.push(
        `[D semantic-debt] ${key} is listed in scripts/_semantic-debt.json but no longer violates — delete the line`,
      );
  }
}

// ------------------------------------------------------------
// LAYER E — dead bank entries
//
// A hand-authored week replaces the spine week for one department, and the
// bank slot that fed that week stops reaching anyone. Nothing noticed: 162
// headwords — fully authored, with IPA and Vietnamese glosses — sat in
// phase4-lexicon.ts feeding nobody, created silently by the week 37-38
// recovery three commits earlier. `terms` was dead in all six departments
// at once.
//
// This gets worse rather than better from here: every hand-authored week
// kills its own slot, and the Phase 4 batches ahead will author many. So
// the invariant is checked rather than the symptom — a bank entry must be
// taught somewhere in its own department, or it must not exist.
//
// Week 39 rehearses the phase from index 0-1 of most slots, which is why a
// hand-authored week 31-36 leaves two entries alive rather than none. That
// is genuine reach, not an exemption.
//
// The opposite mistake needs no rule here: a slot emptied while its week is
// still built from the spine makes the builder destructure undefined and
// the import throws, which is louder than a lint error.
// ------------------------------------------------------------

/** Which P4 bank slot feeds which week, from phase4-bank-contract.md. */
const P4_SLOT_WEEK: Record<string, number> = {
  story: 31,
  preferences: 32,
  disputes: 33,
  occasions: 34,
  tradeoffs: 35,
  emergencies: 36,
  terms: 37,
  proposal: 38,
  wrapUp: 40,
};

function lintDeadBankEntries(banks: BankSet) {
  for (const [dep, slots] of Object.entries(banks)) {
    const taught = new Set<string>();
    for (let w = 1; w <= 40; w++)
      for (const l of ALL_WEEKS[`${dep}-${w}`]?.lessons ?? [])
        for (const v of l.vocabulary) taught.add(v.word.toLowerCase());

    for (const [slot, words] of Object.entries(slots)) {
      if (P4_SLOT_WEEK[slot] === undefined) continue;
      const dead = words.filter((w) => !taught.has(w.word.toLowerCase()));
      if (dead.length)
        errors.push(
          `[E dead-bank] ${dep}.${slot} holds ${dead.length} entr${dead.length === 1 ? "y" : "ies"} no week of ${dep} teaches — delete them, or teach them: ${dead
            .slice(0, 3)
            .map((w) => `"${w.word}"`)
            .join(", ")}${dead.length > 3 ? " …" : ""}`,
        );
    }
  }
}

/** LAYER F — the dead `arcade` field, ratcheted down.
 *
 *  `arcade` is a legacy field: ArcadeSuite runs on `game`, and nothing in the
 *  app reads `arcade` at all. It stayed authored for months anyway — a blind
 *  auditor found ~296 hand-written English sentences no learner would ever
 *  see, and two audit rounds before that had spent their findings critiquing
 *  the style of invisible content.
 *
 *  A hard ban would fail on every legacy week at once, so this ratchets
 *  instead: the count may fall and may never rise. When it falls, the
 *  baseline rewrites itself, exactly like the semantic-debt ledger. Delete
 *  arcade blocks from a week you are touching anyway and the gate records the
 *  new floor for you. */
const ARCADE_BASELINE = new URL("./_arcade-baseline.json", import.meta.url);

async function lintDeadArcadeField() {
  let live = 0;
  const carriers: string[] = [];
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    const n = week.lessons.filter((l) => (l.arcade?.length ?? 0) > 0).length;
    if (n > 0) {
      live += n;
      carriers.push(key);
    }
  }

  const file = Bun.file(ARCADE_BASELINE);
  const known = await file.exists();
  const baseline: number = known
    ? (JSON.parse(await file.text()).lessonsWithArcade as number)
    : live;

  const writeBaseline = (n: number) =>
    Bun.write(
      ARCADE_BASELINE,
      JSON.stringify(
        { lessonsWithArcade: n, note: "Ratchet only — this number may fall, never rise." },
        null,
        2,
      ) + "\n",
    );

  if (!known) {
    await writeBaseline(live);
    console.log(`  Dead \`arcade\` field: baseline recorded at ${live} lessons.`);
    return;
  }

  if (live > baseline) {
    errors.push(
      `[F dead-arcade] ${live} lessons author the dead \`arcade\` field, up from ${baseline}. ` +
        `No suite reads it — ArcadeSuite runs on \`game\`. Put the writing into \`game\` rounds instead.`,
    );
    return;
  }
  if (live < baseline) {
    await writeBaseline(live);
    console.log(
      `  Dead \`arcade\` field: ${live} lessons still carry it, down from ${baseline} — baseline lowered.`,
    );
    return;
  }
  console.log(
    `  Dead \`arcade\` field: ${live} lessons still carry it across ${carriers.length} dep-weeks (ratchet holds).`,
  );
}

/** LAYER G — a helpTip may only quote English that its own target says.
 *
 *  A helpTip sits beside one `targetResponse` and coaches the learner through
 *  saying exactly that sentence. When the sentence is rewritten and the tip is
 *  not, the tip starts coaching a line that no longer exists: stress marks for
 *  a word that was cut, "count the two questions" beside a target that asks
 *  one. A blind auditor found four of these in a single pair of weeks, and
 *  the learners who lean on tips hardest are the ones with the least English
 *  to notice.
 *
 *  So: every single-quoted run of English inside a helpTip must appear in that
 *  item's own targetResponse. Vietnamese quotes are ignored (they are glosses,
 *  not things to say), and so are quotes that are plainly a counter-example —
 *  a tip is allowed to name the phrase it is warning against, as long as it
 *  marks it. */
const VN_MARK = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
/** A tip may quote a phrase in order to forbid it — but only when the warning
 *  sits immediately in front of the quote. Scanning a wide window instead
 *  swallows real defects, because "không" appears in almost every Vietnamese
 *  tip: a planted bad quote slipped through until this was tightened. */
const COUNTER_EXAMPLE =
  /(đừng|không phải|không nói|tránh|thay vì|thay cho|nghe như|sai thành|chứ không)[^']{0,24}$/i;

const HELPTIP_BASELINE = new URL("./_helptip-baseline.json", import.meta.url);

async function lintHelpTipQuotes() {
  const offenders: string[] = [];
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    for (const lesson of week.lessons) {
      for (const item of lesson.speaking) {
        const target = item.targetResponse.toLowerCase();
        for (const raw of item.helpTip.match(/'([^']{2,60})'/g) ?? []) {
          const q = raw.slice(1, -1);
          if (VN_MARK.test(q)) continue; // Vietnamese gloss, not a line to say
          if (!/[a-z]/i.test(q)) continue; // punctuation or a bare IPA fragment
          if (q !== q.trim()) continue; // " and " — a slice of prose, not a quote
          if (/-/.test(q) && !target.includes(q.toLowerCase())) continue; // "che-kyer": a respelling
          if (target.includes(q.toLowerCase())) continue;
          const at = item.helpTip.indexOf(raw);
          const before = item.helpTip.slice(Math.max(0, at - 40), at);
          if (COUNTER_EXAMPLE.test(before)) continue; // the tip is naming what NOT to say
          offenders.push(`${key}/${lesson.lessonId}: "${q}"`);
        }
      }
    }
  }

  const file = Bun.file(HELPTIP_BASELINE);
  const known = await file.exists();
  const baseline: number = known
    ? (JSON.parse(await file.text()).orphanQuotes as number)
    : offenders.length;
  const write = (n: number) =>
    Bun.write(
      HELPTIP_BASELINE,
      JSON.stringify(
        {
          orphanQuotes: n,
          note: "Ratchet only — a helpTip may not quote English its own target never says.",
        },
        null,
        2,
      ) + "\n",
    );

  if (!known) {
    await write(offenders.length);
    console.log(
      `  helpTip quotes with no home in their target: baseline recorded at ${offenders.length}.`,
    );
    return;
  }
  if (offenders.length > baseline) {
    errors.push(
      `[G helptip-quote] ${offenders.length} helpTips quote English their own targetResponse never says, up from ${baseline}. ` +
        `Newest offenders: ${offenders.slice(-3).join(" · ")}`,
    );
    return;
  }
  if (offenders.length < baseline) {
    await write(offenders.length);
    console.log(
      `  helpTip orphan quotes: ${offenders.length}, down from ${baseline} — baseline lowered.`,
    );
    return;
  }
  console.log(`  helpTip orphan quotes: ${offenders.length} (ratchet holds).`);
}

// ── Layer H · trần độ dài câu trong bài đọc ────────────────────────────────
// The productive cap is 22 words. Reading may sit above it — receptive before
// productive is ordinary — but not at 66. A safety rule buried in a 43-word
// sentence with three nested clauses is a rule an A2.2 learner does not have.
// Every offender today is hand-authored Phase 4; generated weeks have none.
const READ_SENT_BASELINE = new URL("./_reading-sentence-baseline.json", import.meta.url);
const READ_SENT_MAX = 25;

async function lintReadingSentenceLength() {
  const offenders: string[] = [];
  for (const [key, week] of Object.entries(ALL_WEEKS))
    for (const lesson of week.lessons)
      // The lookbehind used to be a bare `[.!?]`, which never fires on a
      // sentence that ends inside quoted speech — `…, sir." The guest says:`
      // puts a quote mark between the full stop and the space. Every passage
      // built out of dialogue therefore measured as ONE sentence spanning all
      // its turns, and this gate was reporting the length of the passage, not
      // of any sentence in it. Closing quotes now end a sentence too.
      for (const sentence of lesson.reading.text.split(/(?<=[.!?]["'”’]?)\s+|\n/)) {
        const n = sentence.trim().split(/\s+/).filter(Boolean).length;
        if (n > READ_SENT_MAX)
          offenders.push(
            `${key}/${lesson.lessonId}: ${n} words — "${sentence.trim().slice(0, 50)}…"`,
          );
      }

  const file = Bun.file(READ_SENT_BASELINE);
  const known = await file.exists();
  const baseline: number = known
    ? (JSON.parse(await file.text()).longSentences as number)
    : offenders.length;
  const write = (n: number) =>
    Bun.write(
      READ_SENT_BASELINE,
      JSON.stringify(
        {
          longSentences: n,
          max: READ_SENT_MAX,
          note: "Ratchet only — a reading sentence over 25 words is above the band it is written for.",
        },
        null,
        2,
      ) + "\n",
    );

  if (!known) {
    await write(offenders.length);
    console.log(
      `  Reading sentences over ${READ_SENT_MAX} words: baseline recorded at ${offenders.length}.`,
    );
    return;
  }
  if (offenders.length > baseline) {
    errors.push(
      `[H reading-sentence] ${offenders.length} reading sentences run over ${READ_SENT_MAX} words, up from ${baseline}. ` +
        `Newest: ${offenders.slice(-3).join(" · ")}`,
    );
    return;
  }
  if (offenders.length < baseline) {
    await write(offenders.length);
    console.log(
      `  Reading sentences over ${READ_SENT_MAX} words: ${offenders.length}, down from ${baseline} — baseline lowered.`,
    );
    return;
  }
  console.log(
    `  Reading sentences over ${READ_SENT_MAX} words: ${offenders.length} (ratchet holds).`,
  );
}

// ── Layer I · cặp lâm sàng không được đứng chung một câu ─────────────────
// Hai lần trong đợt biên tập tuần cấp cứu, một mệnh đề đúng ngữ pháp và đúng
// thuật ngữ đã gắn TƯ THẾ NẰM NGHIÊNG vào khách KHÔNG THỞ. Đó là sai điều trị,
// không phải sai văn phong, và không lớp nào ở trên nhìn thấy nó: câu đúng cú
// pháp, từ vựng đúng, độ dài đạt. Lớp này chỉ đọc nghĩa ở mức thô nhất — hai
// khái niệm loại trừ nhau xuất hiện trong cùng một câu mà không có phủ định.
const SENTENCE_SPLIT = /(?<=[.!?])\s+|\n/;
const CLINICAL_CLASHES: { a: RegExp; b: RegExp; negate: RegExp; why: string }[] = [
  {
    a: /\b(recovery position|side position|onto (his|her|their) side|on (his|her|their) side|nằm nghiêng|lật nghiêng)\b/i,
    b: /\b(not breathing|NOT BREATHING|no breathing|không thở|ngừng thở)\b/i,
    negate: /\b(never|not for|KHÔNG BAO GIỜ|không dành cho|only when .{0,20}breathing)\b/i,
    why: "the side position is for a guest who IS breathing; on a non-breathing guest it replaces compressions",
  },
  {
    a: /\b(AED|defibrillator)\b/i,
    b: /\b(wet chest|lying in water|in the water|trong nước|ngực ướt)\b/i,
    negate: /\b(never|not|clear of|bring (him|her|them) clear|KHÔNG|dry the chest)\b/i,
    why: "an AED must never go onto a wet chest or a guest lying in water",
  },
  {
    a: /\b(chest compressions?|push(ing)? (hard|on the chest)|ép tim)\b/i,
    b: /\b(on the bed|trên giường|mattress|đệm)\b/i,
    negate: /\b(not hard|onto the floor|xuống sàn|slide (him|her|them))\b/i,
    why: "compressions on a mattress do nothing; the guest comes onto the floor first",
  },
];

function lintClinicalClashes() {
  for (const [key, week] of Object.entries(ALL_WEEKS))
    for (const lesson of week.lessons) {
      const surfaces: string[] = [
        lesson.reading.text,
        ...lesson.grammar.flatMap((g) => [g.rule, g.polite, g.rude]),
        ...lesson.speaking.flatMap((s) => [s.targetResponse, s.helpTip]),
        ...lesson.vocabulary.flatMap((v) => [v.definition, v.context]),
      ];
      for (const surface of surfaces)
        for (const sentence of surface.split(SENTENCE_SPLIT)) {
          for (const c of CLINICAL_CLASHES) {
            if (!c.a.test(sentence) || !c.b.test(sentence)) continue;
            if (c.negate.test(sentence)) continue;
            errors.push(
              `[I clinical-clash] ${key}/${lesson.lessonId}: ${c.why} — "${sentence.trim().slice(0, 90)}"`,
            );
          }
        }
    }
}

function lintBanks(phase: string, banks: BankSet) {
  const contracts = SLOT_CONTRACTS[phase] ?? {};
  const deps = Object.keys(banks);
  const slots = new Set<string>();
  for (const d of deps) for (const s of Object.keys(banks[d])) slots.add(s);

  for (const slot of slots) {
    const lengths = deps.map((d) => banks[d][slot]?.length ?? 0);
    const maxLen = Math.max(...lengths);

    for (let i = 0; i < maxLen; i++) {
      const seen: { dep: string; word: string; pos: Set<Pos> }[] = [];
      for (const d of deps) {
        const w = banks[d][slot]?.[i];
        if (!w) continue;
        seen.push({ dep: d, word: w.word, pos: posOf(w.word) });
      }
      if (seen.length === 0) continue;

      // LAYER B — declared contract for this slot (or this index range).
      const declared = specFor(contracts[slot], i);
      if (declared) {
        for (const s of seen) {
          if (!declared.some((d) => s.pos.has(d)))
            errors.push(
              `[B slot-contract] ${phase}.${slot}[${i}] ${s.dep} "${s.word}" reads as ${posLabel(s.pos)}, frame requires ${declared.join("|")}`,
            );
        }
        continue; // the contract is stricter than mere agreement
      }

      // LAYER A — no declared contract, so the departments must at least
      // share one reading; otherwise the frame cannot fit all of them.
      let shared: Set<Pos> | null = null;
      for (const s of seen) {
        shared =
          shared === null ? new Set(s.pos) : new Set([...shared].filter((p) => s.pos.has(p)));
      }
      if (shared && shared.size === 0) {
        const detail = seen.map((s) => `${s.dep}:${posLabel(s.pos)} "${s.word}"`).join(", ");
        errors.push(
          `[A slot-consistency] ${phase}.${slot}[${i}] no part of speech fits every department — ${detail}`,
        );
      }
    }
  }
}

// ------------------------------------------------------------
// LAYER C — generated sentence structure
// ------------------------------------------------------------

/** Verbs after which a singular countable noun needs a determiner. */
const OFFER_VERBS =
  /\b(would you like|may i offer you|we could offer|we could arrange|perhaps you would prefer|shall i arrange|i will arrange|we also have|can i have|would you prefer)\s+([a-z][a-z' -]*)/gi;

/** Words that may legitimately follow an offer verb with no article. */
const NO_ARTICLE_OK =
  /^(a|an|the|any|some|your|our|my|his|her|their|this|that|these|those|it|to|me|us|you|him|them|two|three|four|five|more|another|today's|tonight's|tomorrow's|something|anything|one)\b/i;

/** Headwords the lexicons themselves declare as taking no article
 *  (`art: ""`). Reading the declaration beats re-guessing countability:
 *  the author already made that call, and the frames honour it. */
const DECLARED_NO_ARTICLE = new Set<string>();
for (const banks of [P2_BANKS] as unknown as BankSetWithArt[]) {
  for (const dep of Object.values(banks)) {
    for (const slot of Object.values(dep)) {
      for (const w of slot) if (w.art === "") DECLARED_NO_ARTICLE.add(w.word.toLowerCase());
    }
  }
}

/** Common uncountables beyond the declared ones. */
const MASS_OR_PLURAL =
  /^(breakfast|lunch|dinner|service|help|information|advice|luggage|baggage|water|coffee|tea|bread|ice|music|cash|change|parking|access|housekeeping|storage|delivery|polish|oil|equipment|staff|news|feedback|training|transport|laundry|maintenance|security|chicken|beef|rice|noodles|fish|pork|soup|salad|juice|wine|beer|late check-out|early check-in|lounge access|room service|turndown|valet|wifi|breakfast service)\b/i;

const SENTENCE_RULES: { name: string; test: (s: string) => boolean; why: string }[] = [
  {
    // Split on sentence boundaries first: "…fixed it. It took…" is fine.
    name: "repeated-token",
    test: (s) => s.split(/[.!?\n]+/).some((part) => /\b(\w+)\s+\1\b/i.test(part.replace(/,/g, ""))),
    why: "a word repeats immediately — usually a slot substituted next to the same literal word",
  },
  {
    name: "repeated-bigram",
    test: (s) =>
      s.split(/[.!?]+/).some((part) => /\b(\w+\s+\w+)\s+\1\b/i.test(part.replace(/,/g, ""))),
    why: "a two-word phrase repeats immediately",
  },
  {
    name: "stacked-determiner",
    test: (s) => /\b(the|a|an)\s+(the|a|an|today's|tonight's|tomorrow's|my|your|our)\b/i.test(s),
    why: "two determiners in a row",
  },
  {
    // A frequency adverb followed by "work" followed by another verb is a
    // frame that supplied its own verb and then took a second one from the
    // bank. Week 15 shipped "We always work confirm the details.", "…work
    // say goodbye warmly.", "…work file the document." and "…work walk the
    // guest out." — four departments, invisible to every other check
    // because each word is fine on its own.
    //
    // The allow-list is what genuinely follows "work" in this domain, so a
    // real sentence like "We always work together." stays clean.
    name: "double-verb-after-work",
    test: (s) => {
      const m = /\b(always|never|usually|often|sometimes)\s+work\s+([a-z']+)/i.exec(s);
      if (!m) return false;
      const OK =
        /^(with|together|here|there|late|early|hard|fast|in|on|at|as|from|for|until|during|overtime|nights|weekends|alone|closely|safely|quickly)$/i;
      return !OK.test(m[2]);
    },
    why: 'a verb after "work" — the frame already has its verb, so the bank word doubles it',
  },
  {
    // A guest asking for something has not mentioned it yet, so it takes
    // a/an or some — never "the". The course shipped "Can I have the fork?"
    // and "I will bring the slippers." across all six departments at weeks 9
    // and 13: well-formed English, invisible to every structural check, and
    // wrong in the one place it does the most damage. Vietnamese has no
    // articles, so the week-9 request formula is where the article system
    // becomes a reflex, and it was drilling the wrong one.
    //
    // Verified to match nothing in the 9,784 generated sentences once the
    // frames were fixed. A genuinely definite request ("Can I have the bill,
    // please?" — unique in its situation) would trip this; author it with the
    // article inside the headword, or narrow this rule then.
    //
    // Narrowed, as that note said to. Some referents are unique in the
    // guest's own situation the moment they speak: there is exactly one
    // bill for their table, one total, one manager on duty. "Can I have the
    // bill, please?" is the most-said sentence in a restaurant, and forcing
    // "a bill" to satisfy a lint would teach the wrong article far more
    // often than the rule teaches the right one. The list stays short and
    // holds only nouns that are unique BY THE SITUATION, not merely
    // familiar — "the key" and "the towel" are not on it, because a guest
    // requesting either has not established which one.
    name: "definite-article-on-first-mention",
    test: (s) =>
      /\b(can|could|may) i have the\b|\bi (need|will bring) the\b/i.test(s) &&
      !/\bthe (bill|total|change|manager|receipt|time)\b/i.test(s),
    why: 'a first request takes "a"/"an"/"some", not "the" — the guest has not mentioned it yet',
  },
  {
    // a/an follows SOUND, not spelling: "a universal adapter", "an hour".
    name: "a-an-mismatch",
    test: (s) => {
      const CONSONANT_SOUND = /^(uni|use|user|usual|europe|one|once|ubiquit|utensil|eu)/i;
      const VOWEL_SOUND = /^(hour|honest|honour|honor|heir)/i;
      // Initialisms are read letter by letter ("an LED", "an RFP"), and a
      // bare "a or b" is a pair of labels, not an article.
      for (const m of s.matchAll(/\b(a|an)\s+([A-Za-z]+)/g)) {
        const [, art, next] = m;
        if (/^[A-Z]{2,}$/.test(next)) continue;
        // "supplier a or b" — a and b are labels, not articles.
        if (/^(or|and|to|of|b|c)$/i.test(next)) continue;
        const startsVowelLetter = /^[aeiou]/i.test(next);
        const soundsVowel =
          (startsVowelLetter && !CONSONANT_SOUND.test(next)) || VOWEL_SOUND.test(next);
        if (art.toLowerCase() === "a" && soundsVowel) return true;
        if (art.toLowerCase() === "an" && !soundsVowel) return true;
      }
      return false;
    },
    why: "wrong indefinite article for the following sound",
  },
  {
    // "Our towels is clean" is wrong; "The order of the steps is important"
    // is right, because there the plural sits inside a prepositional phrase
    // and is not the subject. So only fire when the determiner opens the
    // clause, and never on -ss nouns ("progress", "address").
    name: "plural-subject-singular-verb",
    test: (s) => {
      for (const m of s.matchAll(/(^|[.!?"“]\s*)(our|the|these|those)\s+([a-z]+)\s+is\b/gi)) {
        const noun = m[3].toLowerCase();
        if (!noun.endsWith("s") || noun.endsWith("ss")) continue;
        if (UNCOUNTABLE_S.has(noun)) continue;
        return true;
      }
      return false;
    },
    why: "plural subject with singular 'is'",
  },
  {
    // A part-of-speech contract cannot catch this: "tonight" and "ten
    // minutes" are perfectly good nouns, they just cannot be the thing
    // that "is ready" or that a guest "has a good" one of. These frames
    // need a concrete object or an event, not a point in time.
    name: "time-expression-as-object",
    test: (s) =>
      /\bthe (tonight|today|tomorrow|this (evening|morning|afternoon)|next (week|month|day)|(one|two|five|ten|twenty|thirty|sixty|\d+) (minutes?|hours?|days?)) (is|was)\b/i.test(
        s,
      ) || /\bhave a good (next|last|this) /i.test(s),
    why: "a time expression cannot be the subject here — the frame needs a concrete thing",
  },
  {
    // "Have a good come back" / "Have a good take care" — a verb phrase
    // where the frame needs a noun.
    name: "have-a-good-got-verb",
    test: (s) => {
      const m = /\bhave a good ([a-z][a-z' -]*?)[,.!?]/i.exec(s);
      return m ? posOf(m[1].trim()).has("VERB") && !posOf(m[1].trim()).has("NOUN") : false;
    },
    why: "the 'Have a good …' frame needs a noun, not a verb phrase",
  },
  {
    // A slot contract can only say "this must be a verb"; it cannot say
    // "bare infinitive, not past tense". After a modal or "let me", a
    // past form is always wrong — "We can always restocked."
    name: "modal-got-past-verb",
    test: (s) => {
      for (const m of s.matchAll(
        /\b(can|could|will|would|shall|may|must|let me|please)\s+(?:always\s+|never\s+)?([a-z]+)\b/gi,
      )) {
        const w = m[2].toLowerCase();
        // "read", "put", "set", "cost" — base form and past form are the
        // same word, so seeing one here proves nothing.
        if (VERBS.has(w)) continue;
        if (isPastOfKnownVerb(w)) return true;
      }
      return false;
    },
    why: "a modal (or 'let me') must be followed by a bare infinitive, not a past form",
  },
  {
    // Deliberately narrow: only the two frames that are unambiguously
    // "bare verb goes here". A looser pattern drowns the report.
    name: "verb-slot-got-non-verb",
    test: (s) => {
      const m = /\b(let me)\s+([a-z][a-z' -]*?)\s+for you\b/i.exec(s);
      if (!m) return false;
      return !posOf(m[2].trim()).has("VERB");
    },
    why: "the 'Let me … for you' frame requires a bare verb phrase",
  },
  {
    // Three of the six department personas are women (Linh, Mai, Trang) and
    // the spines narrate them by name. Every frame that refers back to the
    // persona must read from lx.pron; the ones that hardcoded "he"/"his"
    // shipped "Linh shows his log." and "Mai avoids empty praise. Instead of
    // 'very nice', he says…".
    //
    // Guests are male by default in these passages ("sir", "Mr. Haddad"), so
    // a sentence that also addresses or names a man is left alone — that is
    // where a legitimate "he" lives.
    name: "female-persona-male-pronoun",
    test: (s) => {
      if (!/\b(Linh|Mai|Trang)\b/.test(s)) return false;
      if (!/\b(he|him|his|himself)\b/i.test(s)) return false;
      return !/(\bsir\b|Mr\.|\bgentleman\b|\bthe guest\b)/i.test(s);
    },
    why: "a female persona is referred to with he/him/his — read the pronoun from lx.pron",
  },
  {
    // The -s of the third person belongs on the head verb, not on the end of
    // a verb phrase. Week 11 concatenated it and taught "He check ins the
    // room every day." / "He make the beds the room every day." as the
    // CORRECT sentence, in all six departments.
    name: "third-person-s-on-phrase-tail",
    test: (s) => {
      // Form 1 — the -s landed on the object: "he make the beds".
      const obj = /\b(he|she)\s+([a-z]+)\s+(?:the|a|an|my|your|our)\s+\w+s\b/i.exec(s);
      if (obj) {
        const verb = obj[2].toLowerCase();
        // "he makes the beds" is correct; the bug is an UNINFLECTED head verb
        // with the -s stranded on the object. The copula and other inflected
        // forms are not this bug.
        if (VERBS.has(verb) && !verb.endsWith("s")) return true;
      }
      // Form 2 — the -s landed on a particle: "he check ins the room".
      const part = /\b(he|she)\s+([a-z]+)\s+(in|out|up|down|off|over|back)s\b/i.exec(s);
      if (part && VERBS.has(part[2].toLowerCase())) return true;
      return false;
    },
    why: "the third-person -s landed on the object, not on the head verb",
  },
  {
    // "more" plus a one-syllable adjective. Week 10 hardcoded "more" and the
    // banks supplied "empty" and "bright", so four departments drilled
    // "This one is more empty." Declare the form as `cmp` in the lexicon.
    name: "more-with-short-adjective",
    test: (s) =>
      /\bmore (empty|bright|clean|dry|warm|cool|soft|hard|safe|late|full|busy|quiet|deep|salty|tired|dark|plain|cheap|slow|quick|small|big|nice|fresh|sweet)\b/i.test(
        s,
      ),
    why: 'a short adjective takes -er, not "more" — declare `cmp` on the lexicon entry',
  },
  {
    // "a little" softens a mild COMPLAINT, so a positive adjective inverts
    // the sentence: "It is a little safe." / "It is a little calm."
    name: "a-little-positive-adjective",
    test: (s) =>
      /\ba little (safe|calm|clean|good|nice|lovely|beautiful|elegant|perfect|excellent|happy|pleased|special)\b/i.test(
        s,
      ),
    why: '"a little" introduces a mild problem — a positive adjective inverts the meaning',
  },
];

function lintSentence(where: string, text: string) {
  for (const rule of SENTENCE_RULES) {
    if (rule.test(text)) errors.push(`[C ${rule.name}] ${where}: "${text}" — ${rule.why}`);
  }

  // Article omission after an offer verb.
  for (const m of text.matchAll(OFFER_VERBS)) {
    const tail = m[2].trim();
    if (!tail) continue;
    if (NO_ARTICLE_OK.test(tail)) continue;
    if (MASS_OR_PLURAL.test(tail)) continue;
    // An either/or choice frame reads naturally without articles
    // ("Would you prefer chicken or beef?").
    if (/\bor\b/i.test(text.slice(m.index ?? 0))) continue;
    if (/s$/i.test(tail.split(/\s+/)[0]) && !/ss$/i.test(tail.split(/\s+/)[0])) continue; // plural
    // Honour the lexicon's own `art: ""` declarations, longest match first.
    if ([...DECLARED_NO_ARTICLE].some((w) => tail.toLowerCase().startsWith(w))) continue;
    errors.push(
      `[C missing-article] ${where}: "${text}" — "${m[1]} ${tail}…" needs a/an before a singular countable noun`,
    );
  }
}

/** Every learner-facing field. `rude` is excluded on purpose: it is the
 *  deliberately-wrong example the lesson teaches AGAINST. */
function collectSentences(node: unknown, where: string, out: { where: string; text: string }[]) {
  if (typeof node === "string") return;
  if (Array.isArray(node)) {
    node.forEach((v) => collectSentences(v, where, out));
    return;
  }
  if (node && typeof node === "object") {
    for (const [k, v] of Object.entries(node)) {
      if (k === "rude") continue;
      if (typeof v === "string") {
        if (
          [
            "polite",
            "targetResponse",
            "context",
            "text",
            "guestPrompt",
            "modelReply",
            "modelAnswer",
          ].includes(k)
        )
          out.push({ where: `${where}/${k}`, text: v });
        continue;
      }
      if (k === "options" && Array.isArray(v)) {
        // Only the CORRECT option is taught as good English.
        for (const opt of v as { text?: string; correct?: boolean }[]) {
          if (opt && typeof opt === "object" && opt.correct && typeof opt.text === "string")
            out.push({ where: `${where}/gameAnswer`, text: opt.text });
        }
        continue;
      }
      collectSentences(v, where, out);
    }
  }
}

// ── Layer J · sàn lượng sản sinh theo phase ────────────────────────────────
// Hai auditor mù, độc lập, cùng bắt được một điều mà không lớp nào ở trên nhìn
// thấy: tuần củng cố và tuần khép khoá của HK có 4 lượt nói, trong khi mọi tuần
// Phase 4 khác có 8–9, và ma trận ghi sàn 6–8 cho P4. Không lớp nào ĐẾM, nên
// hai tuần mỏng nhất lại đúng là hai tuần đáng lẽ dày nhất. Ratchet, không phải
// cổng cứng: phần lớn tuần dưới sàn hiện nay là tuần sinh tự động.
const VOLUME_BASELINE = new URL("./_speaking-volume-baseline.json", import.meta.url);
const SPEAKING_FLOOR: Record<string, number> = { P0: 4, P1: 4, P2: 4, P3: 6, P4: 6 };
const phaseOfWeek = (w: number) =>
  w <= 6 ? "P0" : w <= 14 ? "P1" : w <= 22 ? "P2" : w <= 30 ? "P3" : "P4";

async function lintSpeakingVolume() {
  const offenders: string[] = [];
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    const n = week.lessons.reduce((a, l) => a + l.speaking.length, 0);
    const phase = phaseOfWeek(week.weekNumber);
    if (n < SPEAKING_FLOOR[phase])
      offenders.push(`${key}: ${n} (${phase} floor ${SPEAKING_FLOOR[phase]})`);
  }

  const file = Bun.file(VOLUME_BASELINE);
  const known = await file.exists();
  const baseline: number = known
    ? (JSON.parse(await file.text()).belowFloor as number)
    : offenders.length;
  const write = (n: number) =>
    Bun.write(
      VOLUME_BASELINE,
      JSON.stringify(
        {
          belowFloor: n,
          floors: SPEAKING_FLOOR,
          note: "Ratchet only — a week below the matrix speaking floor rehearses less than its phase requires.",
        },
        null,
        2,
      ) + "\n",
    );

  if (!known) {
    await write(offenders.length);
    console.log(`  Weeks below the speaking floor: baseline recorded at ${offenders.length}.`);
    return;
  }
  if (offenders.length > baseline) {
    errors.push(
      `[J speaking-volume] ${offenders.length} weeks sit below the matrix speaking floor, up from ${baseline}. ` +
        `Newest: ${offenders.slice(-3).join(" · ")}`,
    );
    return;
  }
  if (offenders.length < baseline) {
    await write(offenders.length);
    console.log(
      `  Weeks below the speaking floor: ${offenders.length}, down from ${baseline} — baseline lowered.`,
    );
    return;
  }
  console.log(`  Weeks below the speaking floor: ${offenders.length} (ratchet holds).`);
}

// ── Layer K · đáp án đúng dồn về một vị trí ────────────────────────────────
// Trong HK-39/40, cả 24 đáp án đúng — bài đọc lẫn game — đều nằm ở chỉ số 1.
// Mọi suite đều xáo phương án lúc render, nên đây không phải lỗ đo trong app
// đang chạy; nhưng một cụm đồng nhất tuyệt đối là dấu hiệu phương án nhiễu được
// viết cho đủ ba, không phải như lựa chọn thật. Ngưỡng 60%, tuần từ 6 mục trở lên.
const SKEW_BASELINE = new URL("./_answer-skew-baseline.json", import.meta.url);
const SKEW_MAX = 0.6;

async function lintAnswerPositionSkew() {
  const offenders: string[] = [];
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    const idx: number[] = [];
    for (const lesson of week.lessons) {
      for (const q of lesson.reading.questions) idx.push(q.correct);
      for (const g of lesson.game) idx.push(g.options.findIndex((o) => o.correct));
    }
    if (idx.length < 6) continue;
    const counts = [0, 1, 2].map((i) => idx.filter((x) => x === i).length);
    const top = Math.max(...counts) / idx.length;
    if (top > SKEW_MAX)
      offenders.push(`${key}: ${Math.round(top * 100)}% of ${idx.length} at one index`);
  }

  const file = Bun.file(SKEW_BASELINE);
  const known = await file.exists();
  const baseline: number = known
    ? (JSON.parse(await file.text()).skewedWeeks as number)
    : offenders.length;
  const write = (n: number) =>
    Bun.write(
      SKEW_BASELINE,
      JSON.stringify(
        {
          skewedWeeks: n,
          max: SKEW_MAX,
          note: "Ratchet only — a week with over 60% of its correct answers at one index is not offering three real choices.",
        },
        null,
        2,
      ) + "\n",
    );

  if (!known) {
    await write(offenders.length);
    console.log(`  Weeks with skewed answer positions: baseline recorded at ${offenders.length}.`);
    return;
  }
  if (offenders.length > baseline) {
    errors.push(
      `[K answer-skew] ${offenders.length} weeks put over ${Math.round(SKEW_MAX * 100)}% of their correct answers at one index, up from ${baseline}. ` +
        `Newest: ${offenders.slice(-3).join(" · ")}`,
    );
    return;
  }
  if (offenders.length < baseline) {
    await write(offenders.length);
    console.log(
      `  Weeks with skewed answer positions: ${offenders.length}, down from ${baseline} — baseline lowered.`,
    );
    return;
  }
  console.log(`  Weeks with skewed answer positions: ${offenders.length} (ratchet holds).`);
}

// ── Layer M · một bài đọc, một kính ngữ ───────────────────────────────────
// Tuần 1 dạy "thêm 'sir' (nam) hoặc 'madam' (nữ)". Rồi 24 bài đọc của pha 1
// gọi cùng một vị khách bằng cả hai, và một bài để KHÁCH gọi nhân viên là
// "madam". Học viên đọc mẫu nhiều hơn đọc luật, nên mẫu tự mâu thuẫn là mẫu
// dạy ngược. Ratchet, không phải cổng cứng: vài bài ở tuần 33-40 có nhiều
// khách trong cùng một cảnh và dùng hai kính ngữ hợp lệ.
const HON_BASELINE = new URL("./_honorific-baseline.json", import.meta.url);
async function lintOneHonorificPerReading() {
  const offenders: string[] = [];
  for (const [key, week] of Object.entries(ALL_WEEKS))
    for (const lesson of week.lessons) {
      const t = lesson.reading.text;
      if (/\bsir\b/i.test(t) && /\b(madam|ma'am)\b/i.test(t))
        offenders.push(`${key}/${lesson.lessonId}`);
    }

  const file = Bun.file(HON_BASELINE);
  const known = await file.exists();
  const baseline: number = known
    ? (JSON.parse(await file.text()).mixed as number)
    : offenders.length;
  const write = (n: number) =>
    Bun.write(
      HON_BASELINE,
      JSON.stringify(
        {
          mixed: n,
          note: "Ratchet only — a passage that calls one guest both sir and madam teaches against week 1.",
        },
        null,
        2,
      ) + "\n",
    );

  if (!known) {
    await write(offenders.length);
    console.log(`  Readings mixing sir and madam: baseline recorded at ${offenders.length}.`);
    return;
  }
  if (offenders.length > baseline) {
    errors.push(
      `[M one-honorific] ${offenders.length} readings call one guest both sir and madam, up from ${baseline}. ` +
        `Newest: ${offenders.slice(-3).join(" · ")}`,
    );
    return;
  }
  if (offenders.length < baseline) {
    await write(offenders.length);
    console.log(
      `  Readings mixing sir and madam: ${offenders.length}, down from ${baseline} — baseline lowered.`,
    );
    return;
  }
  console.log(`  Readings mixing sir and madam: ${offenders.length} (ratchet holds).`);
}

// ── Layer M · lượt nội bộ không được xưng kính ngữ ────────────────────────
// `speakerRole` tồn tại vì một tuần dạy báo cáo LÊN TRÊN là một tuần về
// register, và gọi một Duty Manager là ngang hàng là điều duy nhất tuần đó
// không được làm. Chiều ngược lại cũng vậy: gọi đồng nghiệp cùng ca là "sir"
// hay "madam" dạy học viên nói câu đó với cả sàn.
//
// Đây là gate do một quản lý bộ phận đề nghị sau khi bắt được lỗi này hai
// vòng liên tiếp — cả hai lần đều ở những lượt vừa được thêm vào để chữa một
// phát hiện khác. Cổng cứng: toàn corpus hiện sạch.
function lintColleagueHonorific() {
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    for (const lesson of week.lessons) {
      for (const item of lesson.speaking) {
        if (item.speakerRole !== "colleague") continue;
        // An honorific inside quotation marks is the colleague being COACHED
        // on what to say to a guest — week 39 of Guest Relations tells a
        // colleague to say 'One moment, sir' and nothing else. That is
        // reported speech, not a colleague being called sir.
        const outsideQuotes = item.targetResponse.replace(/['"“”‘’][^'"“”‘’]*['"“”‘’]/g, " ");
        const hit = outsideQuotes.match(/\b(sir|madam|ma'am)\b/i);
        if (hit)
          errors.push(
            `[M colleague-honorific] ${key}/${lesson.lessonId}: lượt đồng nghiệp nói "${hit[0]}" — ` +
              `"${item.targetResponse}"`,
          );
      }
    }
  }
}

// ── Layer N · `follows` phải khớp một targetResponse có thật cùng bài ─────
// Trường này nối các lượt của một hội thoại bằng cách SO CHUỖI TUYỆT ĐỐI. Sửa
// câu mẫu của lượt trước mà quên chuỗi trong lượt sau thì mắt xích đứt im
// lặng: bài sát hạch thôi rút trọn chuỗi (đo được: 62,6% → 0,0% số lần thi),
// và màn hình vẫn in "Bạn vừa nói: …" một câu học viên chưa từng nói — ở ca
// đã xảy ra, đó lại đúng là câu khoá học vừa dạy là SAI. Không thể tự thấy
// khi đọc source vì hai chuỗi chỉ lệch một từ, nên nó là cổng cứng.
function lintFollowsChain() {
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    for (const lesson of week.lessons) {
      const said = new Set(lesson.speaking.map((s) => s.targetResponse));
      for (const item of lesson.speaking) {
        if (!item.follows) continue;
        if (said.has(item.follows)) continue;
        errors.push(
          `[N follows-chain] ${key}/${lesson.lessonId}: follows "${item.follows}" ` +
            `không khớp câu mẫu nào trong bài — mắt xích hội thoại đứt`,
        );
      }
    }
  }
}

// ── Layer O · phiên âm phải khớp chính headword của thẻ ───────────────────
// Đổi tên một giá trị ngân hàng là sửa MỘT trường trong ba. Ba mươi tám thẻ
// Phase 2 đã ship với phiên âm và nghĩa của từ CŨ: thẻ "Garden seat" đọc
// /ˈɜːli ɔː leɪt/ ("early or late"), thẻ "Signature" đọc /ˈkliːnɪŋ ˈrekɔːd/,
// thẻ "Payment method" đọc /ˈmeɪntənəns fɔːm/. Không cổng nào thấy được vì cả
// ba trường đều là chuỗi hợp lệ; chỉ có người đọc to lên mới biết. Học viên
// thì tin bản phiên âm hơn tin mình, nên đây là dạy sai phát âm có hệ thống.
//
// Phép kiểm: số "từ" của headword phải bằng số cụm phiên âm, VÀ âm đầu mỗi
// cụm phải hợp với chữ cái đầu của từ tương ứng. Bắt 37/38 ca đã xảy ra.
// Chữ cái trong từ viết tắt (LED, HR, ADR) chỉ tính số lượng, không kiểm âm
// đầu — tên chữ cái mở bằng nguyên âm ("el", "eɪtʃ", "ɑː").
const IPA_VOWEL = "æɑʌeɪiɒɔʊuəɜaeiou";
const IPA_ONSET: Record<string, string> = {
  b: "b",
  c: "ksʃtʃ",
  d: "dð",
  f: "f",
  g: "ɡdʒ",
  h: "h" + IPA_VOWEL,
  j: "dʒ",
  k: "kn",
  l: "l",
  m: "m",
  n: "n",
  p: "pf",
  q: "k",
  r: "r",
  s: "sʃz",
  t: "ttʃθð",
  v: "v",
  w: "wrh",
  x: "z" + IPA_VOWEL,
  y: "j",
  z: "z",
  a: IPA_VOWEL,
  e: IPA_VOWEL + "j",
  i: IPA_VOWEL,
  o: IPA_VOWEL + "w",
  u: IPA_VOWEL + "j",
};
/** null nếu hợp lệ, ngược lại là lý do. */
function phoneticMismatch(word: string, phonetic: string): string | null {
  const ipa = phonetic
    .replace(/^\/|\/$/g, "")
    .trim()
    .split(/\s+/)
    .filter(Boolean);
  if (!ipa.length) return "không có phiên âm";
  const base = word
    .replace(/\([^)]*\)/g, " ")
    .replace(/[—–]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
  // "check-out" đọc liền một cụm ở thẻ này, tách hai cụm ở thẻ khác — thử cả hai.
  for (const split of [false, true]) {
    const raw = split ? base.flatMap((t) => t.split("-").filter(Boolean)) : base;
    const toks: { t: string; letter: boolean }[] = raw.flatMap((t) =>
      /^[A-Z]{2,}$/.test(t)
        ? t.split("").map((c) => ({ t: c, letter: true }))
        : [{ t, letter: false }],
    );
    if (toks.length !== ipa.length) continue;
    let ok = true;
    for (let i = 0; i < toks.length; i++) {
      if (toks[i].letter) continue;
      const c = toks[i].t.toLowerCase().replace(/[^a-z]/g, "")[0];
      const p = ipa[i].replace(/^[ˈˌ]+/, "")[0];
      if (!c || !p) continue;
      if (!(IPA_ONSET[c] ?? IPA_VOWEL).includes(p)) {
        ok = false;
        break;
      }
    }
    if (ok) return null;
  }
  return `phiên âm không khớp từ`;
}
function lintPhoneticMatchesWord() {
  const seen = new Set<string>();
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    for (const lesson of week.lessons) {
      for (const item of lesson.vocabulary) {
        const id = `${item.word}|${item.phonetic}`;
        if (seen.has(id)) continue;
        seen.add(id);
        const why = phoneticMismatch(item.word, item.phonetic);
        if (why) {
          errors.push(
            `[O phiên âm] ${key}/${lesson.lessonId}: thẻ "${item.word}" mang ${item.phonetic} — ${why}`,
          );
        }
      }
    }
  }
}

// ── Layer L · reviewWords phải trỏ về một tuần ĐÃ dạy ─────────────────────
// Thẻ ôn không tự sinh câu ví dụ: nó kéo lại đúng thẻ dạy gốc. Nên một
// reviewWord trỏ vào tuần tương lai sẽ hiện ra một câu học viên chưa gặp, và
// một reviewWord không trỏ vào đâu cả thì không hiện gì. resolveReviewVocab
// quét toàn bộ tuần của bộ phận, kể cả tuần sau, nên nó không thể tự bắt lỗi
// này. Toàn corpus hiện sạch, nên đây là cổng cứng chứ không phải ratchet.
function lintReviewWordOrder() {
  const firstTaught = new Map<string, number>();
  for (const week of Object.values(ALL_WEEKS))
    for (const lesson of week.lessons)
      for (const item of lesson.vocabulary) {
        const k = `${week.departmentId}|${item.word.toLowerCase()}`;
        const prev = firstTaught.get(k);
        if (prev === undefined || week.weekNumber < prev) firstTaught.set(k, week.weekNumber);
      }
  for (const [key, week] of Object.entries(ALL_WEEKS))
    for (const rw of week.reviewWords ?? []) {
      const taught = firstTaught.get(`${week.departmentId}|${rw.toLowerCase()}`);
      if (taught === undefined)
        errors.push(
          `[L review-order] ${key}: reviewWord "${rw}" is not a ${week.departmentId} headword anywhere — the review card resolves to nothing`,
        );
      else if (taught >= week.weekNumber)
        errors.push(
          `[L review-order] ${key}: reviewWord "${rw}" is first taught at week ${taught} — a review card must show a card the learner has already met`,
        );
    }
}

// ── Layer M · thẻ dạy bị khung câu nhét vào sai chỗ ───────────────────────
// Thẻ ôn kéo lại câu ví dụ của thẻ dạy gốc, nên một câu vỡ ở tuần 15 vẫn hiện
// ra nguyên vẹn trong một tuần soạn tay ở Phase 4. Dấu hiệu bắt được chắc tay
// nhất: headword tự nó đã mang một mạo từ bên trong ("Note the preference"),
// và khung câu lại nhét thêm một mạo từ nữa ngay trước nó — "The note the
// preference comes last." Khoảng một phần ba số hit là dương tính giả ("The
// cocktail of the day is also available today." đúng ngữ pháp), nên đây là
// ratchet chứ không phải cổng cứng: giá trị của nó là chặn cái MỚI.
const SLOT_BASELINE = new URL("./_slotted-headword-baseline.json", import.meta.url);
const ARTICLE = /\b(?:the|a|an|your|our)\b/;

async function lintSlottedHeadwords() {
  const offenders: string[] = [];
  for (const [key, week] of Object.entries(ALL_WEEKS))
    for (const lesson of week.lessons)
      for (const item of lesson.vocabulary) {
        const head = item.word.toLowerCase();
        const tail = head.split(" ").slice(1).join(" ");
        if (!tail || !ARTICLE.test(tail)) continue;
        const esc = head.replace(/[.*+?^${}()|[\]\\]/g, (m) => "\\" + m);
        if (new RegExp(`\\b(?:the|a|an|your|our) ${esc}\\b`).test(item.context.toLowerCase()))
          offenders.push(`${key}: "${item.word}" → "${item.context}"`);
      }

  const file = Bun.file(SLOT_BASELINE);
  const known = await file.exists();
  const baseline = known ? JSON.parse(await file.text()).slottedCards : offenders.length;
  const write = (n) =>
    Bun.write(
      SLOT_BASELINE,
      JSON.stringify(
        {
          slottedCards: n,
          note: "Ratchet only — a headword that already carries an article must not be slotted after another one.",
        },
        null,
        2,
      ) + "\n",
    );

  if (!known) {
    await write(offenders.length);
    console.log(
      `  Headwords slotted after a second article: baseline recorded at ${offenders.length}.`,
    );
    return;
  }
  if (offenders.length > baseline) {
    errors.push(
      `[M slotted-headword] ${offenders.length} vocabulary cards slot an article-bearing headword after a second article, up from ${baseline}. ` +
        `Newest: ${offenders.slice(-3).join(" · ")}`,
    );
    return;
  }
  if (offenders.length < baseline) {
    await write(offenders.length);
    console.log(
      `  Headwords slotted after a second article: ${offenders.length}, down from ${baseline} — baseline lowered.`,
    );
    return;
  }
  console.log(`  Headwords slotted after a second article: ${offenders.length} (ratchet holds).`);
}

// ============================================================
// Run
// ============================================================
lintBanks("P1", P1_BANKS as unknown as BankSet);
lintBanks("P2", P2_BANKS as unknown as BankSet);
lintBanks("P3", P3_BANKS as unknown as BankSet);
lintBanks("P4", P4_BANKS as unknown as BankSet);
lintSemantics("P4", P4_BANKS as unknown as BankSet);
lintDeadBankEntries(P4_BANKS as unknown as BankSet);
await lintDeadArcadeField();
await lintHelpTipQuotes();
await lintReadingSentenceLength();
lintClinicalClashes();
await lintSpeakingVolume();
await lintAnswerPositionSkew();
lintReviewWordOrder();
lintColleagueHonorific();
lintFollowsChain();
lintPhoneticMatchesWord();
await lintOneHonorificPerReading();
await lintSlottedHeadwords();
reportStaleDebt();

let sentenceCount = 0;
for (const [key, week] of Object.entries(ALL_WEEKS)) {
  const out: { where: string; text: string }[] = [];
  collectSentences(week, key, out);
  for (const s of out) {
    sentenceCount++;
    lintSentence(s.where, s.text);
  }
}

console.log(`Structural linter — ${sentenceCount} generated learner-facing sentences inspected`);
console.log(`Bank slots checked across 4 phases × 6 departments`);

if (warnings.length) {
  console.log(`\nWARNINGS (${warnings.length}):`);
  warnings.slice(0, 30).forEach((w) => console.log(`  ! ${w}`));
  if (warnings.length > 30) console.log(`  … and ${warnings.length - 30} more`);
}

if (errors.length) {
  const byLayer = new Map<string, number>();
  for (const e of errors) {
    const tag = e.slice(1, e.indexOf("]"));
    byLayer.set(tag, (byLayer.get(tag) ?? 0) + 1);
  }
  console.log(`\nFAILED — ${errors.length} structural violation(s):`);
  [...byLayer.entries()]
    .sort((a, b) => b[1] - a[1])
    .forEach(([t, n]) => console.log(`  ${t}: ${n}`));
  console.log("");
  errors.slice(0, 400).forEach((e) => console.log(`  x ${e}`));
  if (errors.length > 400) console.log(`  … and ${errors.length - 60} more`);
  process.exit(1);
}

console.log("\nOK — no structural violations in generated content.");
