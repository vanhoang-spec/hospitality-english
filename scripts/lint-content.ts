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
import type { LessonContent, SpeakingItem, WeekContent } from "../src/lib/content/week-content";
import {
  COURTESY_EXTRAS,
  normalize,
  PROMISE_VERBS,
  utterancePassed,
  utterancePassedAny,
} from "../src/lib/speaking-score";
import { acceptedAnswers } from "../src/lib/speaking-alternates";
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
  steady: "ADJ",
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

// ── Layer P · `follows` phải là DUY NHẤT trong bể câu đích của phase ──────
// Layer N chỉ hỏi "chuỗi này có tồn tại trong bài không". Câu trả lời "có" vẫn
// để lọt trường hợp nguy hiểm hơn: chuỗi tồn tại trong bài NÀY *và* trong một
// bài khác của cùng bộ phận, cùng phase. buildOral dàn phẳng cả phase thành
// một mảng rồi nối `follows` bằng so chuỗi, nên một câu đích in ở hai bài là
// một mắt xích nhập nhằng — nối vào bản nào là chuyện của thứ tự dàn phẳng,
// không phải của nội dung. Đã đo: bốn bộ phận (FO/SW/GR/BO) có lượt hai của
// hội thoại tuần 15 bài 1 được phục vụ sau câu mở LẤY TỪ BÀI 4 — hai lời
// khách khác nhau, hai tuần nguồn khác nhau, in ra cho học viên như một cuộc
// hội thoại. Không lớp nào thấy vì hai chuỗi khớp nhau TUYỆT ĐỐI.
//
// "Bể câu đích" ở đây là MỌI BẢN IN của bộ phận trong phase, kể cả hai bản
// nằm trong cùng một bài: đúng bốn ca trên, bài 15_1 in lại câu mở của chính
// nó ở vị trí 4, nên đếm theo bài sẽ báo "một bài, không nhập nhằng" trong
// khi mắt xích vẫn phải chọn giữa hai bản.
//
// buildOral nay giải `follows` trong phạm vi BÀI, nên triệu chứng đã hết. Lớp
// này chặn nguyên nhân: còn nhập nhằng thì một lần sửa câu mẫu ở bài kia là
// đủ để mắt xích im lặng đổi nghĩa lần nữa. Ratchet vì corpus hiện đang có
// sẵn vi phạm và nội dung không thuộc quyền sửa của cổng này — giá trị của nó
// là chặn cái MỚI.
const FOLLOWS_BASELINE = new URL("./_follows-ambiguity-baseline.json", import.meta.url);

/** Mỗi lượt có `follows` mà chuỗi đó trùng NHIỀU HƠN MỘT câu đích trong bể của
 *  cùng bộ phận × phase. Đếm BẢN IN chứ không đếm bài: FO_15_1 in
 *  "First we greet the guest, then we check the profile." ở cả vị trí 2 lẫn vị
 *  trí 4 của chính nó, nên đếm theo bài sẽ nói bài ấy "chỉ có một bản" trong
 *  khi mắt xích vẫn phải chọn giữa hai. Một dòng = một mắt xích cần sửa. */
function ambiguousFollowsLinks(): string[] {
  /** dep|phase -> (targetResponse -> mọi vị trí in ra nó) */
  const printedAt = new Map<string, Map<string, string[]>>();
  const slot = (key: string, lessonId: string, i: number) => `${key}/${lessonId}#${i}`;
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    const scope = `${key.split("-")[0]}|${phaseOfWeek(week.weekNumber)}`;
    if (!printedAt.has(scope)) printedAt.set(scope, new Map());
    const byTarget = printedAt.get(scope)!;
    for (const lesson of week.lessons)
      lesson.speaking.forEach((item, i) => {
        if (!byTarget.has(item.targetResponse)) byTarget.set(item.targetResponse, []);
        byTarget.get(item.targetResponse)!.push(slot(key, lesson.lessonId, i));
      });
  }
  const out: string[] = [];
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    const dep = key.split("-")[0];
    const phase = phaseOfWeek(week.weekNumber);
    const byTarget = printedAt.get(`${dep}|${phase}`)!;
    for (const lesson of week.lessons)
      lesson.speaking.forEach((item, i) => {
        if (!item.follows) return;
        const copies = byTarget.get(item.follows) ?? [];
        if (copies.length <= 1) return;
        out.push(
          `${dep} ${phase} ${slot(key, lesson.lessonId, i)} · follows "${item.follows}" ` +
            `— ${copies.length} bản: ${copies.join(", ")}`,
        );
      });
  }
  return out.sort();
}

async function lintFollowsAmbiguity() {
  const offenders = ambiguousFollowsLinks();
  const file = Bun.file(FOLLOWS_BASELINE);
  const known = await file.exists();
  const baseline: number = known
    ? (JSON.parse(await file.text()).ambiguousLinks as number)
    : offenders.length;
  const write = (n: number) =>
    Bun.write(
      FOLLOWS_BASELINE,
      JSON.stringify(
        {
          ambiguousLinks: n,
          note: "Ratchet only — một `follows` khớp NHIỀU HƠN MỘT bản in câu đích trong cùng bộ phận × phase là mắt xích nhập nhằng: buildOral dàn phẳng cả phase, nên bản nào được nối là chuyện thứ tự chứ không phải nội dung. Đếm bản in, kể cả hai bản trong cùng một bài.",
        },
        null,
        2,
      ) + "\n",
    );

  if (!known) {
    await write(offenders.length);
    console.log(`  Ambiguous \`follows\` links: baseline recorded at ${offenders.length}.`);
    offenders.forEach((o) => console.log(`    · ${o}`));
    return;
  }
  if (offenders.length > baseline) {
    errors.push(
      `[P follows-ambiguity] ${offenders.length} mắt xích \`follows\` nhập nhằng, tăng từ ${baseline}. ` +
        `Mới nhất: ${offenders.slice(-3).join(" · ")}`,
    );
    return;
  }
  if (offenders.length < baseline) {
    await write(offenders.length);
    console.log(
      `  Ambiguous \`follows\` links: ${offenders.length}, down from ${baseline} — baseline lowered.`,
    );
    offenders.forEach((o) => console.log(`    · ${o}`));
    return;
  }
  console.log(`  Ambiguous \`follows\` links: ${offenders.length} (ratchet holds).`);
  offenders.forEach((o) => console.log(`    · ${o}`));
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
// LAYERS Q · R · S · T — MỘT BÀI LÀ MỘT CỤM
//
// Ba vòng chấm liên tiếp mất điểm vì CÙNG MỘT LỚP lỗi trong khi `bun run ci`
// xanh suốt: một bài học là một CỤM trường ràng buộc nhau — thẻ từ vựng, cặp
// ngữ pháp, lượt nói, bài đọc, câu hỏi đọc hiểu và vòng arcade đều nói về một
// sự việc — và mọi lớp kiểm đang có đều soi TỪNG TRƯỜNG MỘT. Sửa một trường
// rồi bỏ ba trường kia là bản vá "nửa hiện vật", và nó qua được mọi cổng.
//
// Bốn lớp dưới đây kiểm các ràng buộc BÊN TRONG một cụm:
//
//   Q. Một bài, một con số. Mọi phát biểu của cùng một bài về cùng một sự
//      việc phải nói cùng một số.
//   R. Vai người nghe là một trường của cụm. Layer M đã kiểm chiều "đồng
//      nghiệp mà xưng sir/madam"; đây là chiều ngược lại, cộng luật mọi lượt
//      trong một chuỗi `follows` phải cùng `speakerRole` với lượt mở.
//   S. Tip hứa gì thì khoá nấy. Một helpTip trích dẫn tiếng Anh mà bộ chấm
//      vẫn cho qua câu thiếu đúng chữ đó là một lời hứa không có hiệu lực.
//   T. Thẻ phải được dạy TRƯỚC tuần bắt nói.
//
// Cả bốn là RATCHET, không phải cổng cứng: nội dung không thuộc quyền của
// linter, và corpus hôm nay đã có sẵn vi phạm. Giá trị của chúng là chặn cái
// MỚI. Đặt `LINT_CONTENT_FULL=1` để in trọn danh sách thay vì ba dòng cuối.
//
// Mỗi lớp đi kèm một HỒI QUY chạy trong chính lần lint này (selfTestClusterGates
// ở cuối khối): một bản sao nội dung trong bộ nhớ bị đầu độc để tái hiện đúng
// ca đã được báo cáo, rồi khẳng định lớp ấy đỏ. Một cổng không tự chứng minh
// được là một cổng không ai biết đã chết lúc nào.
// ============================================================

const FULL_LISTING = process.env.LINT_CONTENT_FULL === "1";

type Gauge = { field: string; tag: string; label: string; offenders: string[] };

/** Bật lên khi hồi quy của khối này thất bại. Một lớp đã chết luôn đếm được
 *  ít vi phạm hơn, nên nếu vẫn cho nó hạ chốt thì lần chạy hỏng sẽ khoá luôn
 *  mức thấp giả đó vào baseline và cái hỏng trở thành cái chuẩn. Đo thật:
 *  vô hiệu hoá Layer Q rồi chạy một lần là chốt tụt từ 4 xuống 0. */
let clusterGatesTrustworthy = true;

/** Ratchet chung cho bốn lớp dưới: chốt ở đúng số vi phạm hiện tại, đỏ khi
 *  tăng, tự hạ chốt khi giảm. Một file có thể giữ nhiều số đếm độc lập. */
async function ratchetFile(file: URL, note: string, gauges: Gauge[]) {
  const handle = Bun.file(file);
  const known = await handle.exists();
  const prev: Record<string, unknown> = known ? JSON.parse(await handle.text()) : {};
  const next: Record<string, number> = {};
  let write = !known;
  for (const g of gauges) {
    const recorded = prev[g.field];
    const base = typeof recorded === "number" ? recorded : g.offenders.length;
    next[g.field] = base;
    // MỘT CHỐT CHƯA CÓ TRONG FILE PHẢI ĐƯỢC GHI, không phải "coi như vừa khớp".
    //
    // Bản cũ chỉ ghi khi CẢ FILE chưa tồn tại, nên một gauge MỚI thêm vào một
    // file đã có luôn tự lấy số của chính lần chạy làm chốt và không bao giờ
    // được ghi xuống — lần sau lại tự chốt lại. Nghĩa là một lớp mới in
    // "ratchet holds" mãi mãi mà không chốt gì cả, và một vi phạm mới thêm vào
    // hôm sau vẫn xanh. Đo thật: thêm `fragileReservedTurns` vào file tip-lock
    // đã có, chạy hai lần, file không hề đổi.
    if (!known || typeof recorded !== "number") {
      console.log(`  ${g.label}: baseline recorded at ${g.offenders.length}.`);
      next[g.field] = g.offenders.length;
      write = true;
      g.offenders.forEach((o) => console.log(`    · ${o}`));
      continue;
    }
    if (g.offenders.length > base) {
      errors.push(
        `[${g.tag}] ${g.offenders.length} ${g.label}, up from ${base}. ` +
          `Newest: ${g.offenders.slice(-3).join(" · ")}`,
      );
      continue;
    }
    if (g.offenders.length < base) {
      next[g.field] = g.offenders.length;
      write = true;
      console.log(`  ${g.label}: ${g.offenders.length}, down from ${base} — baseline lowered.`);
      g.offenders.forEach((o) => console.log(`    · ${o}`));
      continue;
    }
    console.log(`  ${g.label}: ${g.offenders.length} (ratchet holds).`);
    if (FULL_LISTING) g.offenders.forEach((o) => console.log(`    · ${o}`));
  }
  if (write && !clusterGatesTrustworthy)
    console.log(`  (chốt giữ nguyên: hồi quy của khối cụm đang đỏ, số đếm lần này không tin được)`);
  if (write && clusterGatesTrustworthy)
    await Bun.write(file, JSON.stringify({ ...next, note }, null, 2) + "\n");
}

const roleOf = (s: SpeakingItem) => s.speakerRole ?? "guest";
const whereOf = (key: string, lesson: LessonContent) => {
  const [dep, week] = key.split("-");
  return `${dep} · tuần ${week} · ${lesson.lessonId}`;
};

// ── Layer Q · một bài, một con số ─────────────────────────────────────────
// Sáu trong mười auditor của vòng 8 bắt cùng một lỗi: thẻ từ vựng và cả ba vế
// cặp ngữ pháp của tuần 15 bài 4 nói quy trình có "four steps", còn lượt nói,
// bài đọc, lời giải câu hỏi và đáp án arcade CỦA CHÍNH BÀI ẤY nói "eight
// steps". Đo trên `buildPaper` ×600 ở Guest Relations: 12,3% số đề khẳng định
// four, 11,8% khẳng định eight, 1,8% chứa cả hai. Không lớp nào thấy, vì mọi
// câu đều đúng ngữ pháp và mỗi trường đọc riêng đều tự nhất quán.
//
// PHÉP SO. Một "phát biểu" là một số viết bằng chữ + danh từ nó đếm + HAI TỪ
// NỘI DUNG dẫn vào nó trong cùng một mệnh đề ("handover have … step"). Hai
// phát biểu cùng khoá mà khác số là mâu thuẫn.
//
// Vì sao cần cụm dẫn chứ không chỉ danh từ: gom theo danh từ trần báo 106
// nhóm trên 960 bài, gần hết là dương tính giả có thật về nghĩa — "I will come
// back in five minutes." đứng cạnh khách nói "Two minute more.", tuần 2 dạy
// đếm nên "Two keys, please." và "One key, madam." phải khác nhau. Yêu cầu
// cùng cụm dẫn hạ xuống 4 nhóm, và cả 4 đúng là ca trên (FO/SW/GR/BO tuần 15
// bài 4): 0 dương tính giả trên 40 tuần × 6 bộ phận.
//
// Ba quy ước hẹp, mỗi cái đổi lấy một lớp dương tính giả đã đo:
//   · Số mở đầu mệnh đề không tính — nó trả lời một câu hỏi chứ không khẳng
//     định một thuộc tính ("Two keys, please.").
//   · `thirty-nine` là MỘT số, không phải "thirty" rồi "nine" (tuần 39-40 của
//     GR kể lại từng tuần một và sinh ra 5 nhóm ma).
//   · Trong một câu hỏi đọc hiểu hay một vòng arcade, chỉ PHƯƠNG ÁN ĐÚNG là
//     một khẳng định. Nhiễu được soạn ra để sai; "Three months" cạnh "Six
//     months" là đề bài, không phải mâu thuẫn.
const Q_NUM_ALT =
  "one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|" +
  "fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|" +
  "seventy|eighty|ninety|hundred|thousand|million|zero";
const Q_NUMBERS = new Set(Q_NUM_ALT.split("|"));
const Q_NUMBER_RE = new RegExp("(?<![a-z])(" + Q_NUM_ALT + ")(?![a-z])", "gi");
const Q_FUNCTION_WORDS = new Set(
  (
    "the a an of in on at to for and or but is am are was were be been will would can could " +
    "may might shall should must do does did that this these those his her my your our their " +
    "its it we you i he she they there here no not nobody nothing please so if when then " +
    "before after with from by as than each every any some more most only just also too very " +
    "never always sir madam ma'am other another still yet now again"
  ).split(" "),
);
/** Đủ để "has"/"have" và "made"/"make" không tách một khẳng định làm đôi. */
const Q_LEMMA: Record<string, string> = {
  has: "have",
  had: "have",
  having: "have",
  takes: "take",
  took: "take",
  needs: "need",
  runs: "run",
  ran: "run",
  follows: "follow",
  followed: "follow",
  uses: "use",
  used: "use",
  puts: "put",
  comes: "come",
  came: "come",
  makes: "make",
  made: "make",
  says: "say",
  said: "say",
  gives: "give",
  gave: "give",
};
const qLemma = (w: string) => Q_LEMMA[w] ?? w;

/** Danh từ mà con số đếm, hoặc null khi nó không đếm cái gì gọi được tên. */
function countedNoun(rest: string): string | null {
  const run: string[] = [];
  for (const m of rest.matchAll(/[A-Za-z][A-Za-z']*|[^A-Za-z'\s]/g)) {
    if (!/^[A-Za-z]/.test(m[0])) break; // dấu câu đóng cụm danh từ
    const w = m[0].toLowerCase();
    if (Q_FUNCTION_WORDS.has(w) || Q_NUMBERS.has(w)) break;
    run.push(w);
    if (run.length >= 4) break;
  }
  if (!run.length) return null;
  let head = qLemma(run[run.length - 1]);
  if (head.length > 3 && /s$/.test(head) && !/(ss|us|is)$/.test(head)) head = head.slice(0, -1);
  return head.length > 2 ? head : null;
}

/** Hai từ nội dung dẫn vào con số, trong chính mệnh đề của nó. */
function numberIntroducer(text: string, at: number): string | null {
  const clause =
    text
      .slice(0, at)
      .split(/[.!?;:—\n]|,\s/)
      .pop() ?? "";
  const words = (clause.toLowerCase().match(/[a-z][a-z']*/g) ?? [])
    .map(qLemma)
    .filter((w) => !Q_FUNCTION_WORDS.has(w) && !Q_NUMBERS.has(w));
  return words.length ? words.slice(-2).join(" ") : null;
}

type NumberClaim = { num: string; key: string; where: string; text: string };

function collectNumberClaims(text: string, where: string, out: NumberClaim[]) {
  if (!text) return;
  for (const m of text.matchAll(Q_NUMBER_RE)) {
    const at = m.index ?? 0;
    const end = at + m[0].length;
    // Một số ghép bằng gạch nối là MỘT số; không nửa nào của nó đếm gì cả.
    if (text.slice(Math.max(0, at - 1), at) === "-") continue;
    if (/^-[A-Za-z]/.test(text.slice(end, end + 2))) continue;
    const noun = countedNoun(text.slice(end));
    if (!noun) continue;
    const intro = numberIntroducer(text, at);
    if (!intro) continue;
    out.push({ num: m[0].toLowerCase(), key: `${intro} … ${noun}`, where, text: text.trim() });
  }
}

/** Mọi khẳng định chứa số của một bài — chỉ những trường khoá học in ra như
 *  ĐÚNG. `grammar.rude`/`nearMiss` vẫn tính: chúng sai ngữ pháp, không sai sự
 *  việc, và ca tuần 15 là cả ba vế của cặp ngữ pháp cùng nói "four". */
function numberClaimsOfLesson(lesson: LessonContent): NumberClaim[] {
  const out: NumberClaim[] = [];
  lesson.vocabulary.forEach((v, i) =>
    collectNumberClaims(v.context, `vocabulary[${i}].context`, out),
  );
  lesson.grammar.forEach((g, i) => {
    collectNumberClaims(g.rude, `grammar[${i}].rude`, out);
    collectNumberClaims(g.polite, `grammar[${i}].polite`, out);
    collectNumberClaims(g.rule, `grammar[${i}].rule`, out);
    collectNumberClaims(g.nearMiss ?? "", `grammar[${i}].nearMiss`, out);
  });
  lesson.speaking.forEach((s, i) => {
    collectNumberClaims(s.targetResponse, `speaking[${i}].targetResponse`, out);
    collectNumberClaims(s.helpTip, `speaking[${i}].helpTip`, out);
  });
  collectNumberClaims(lesson.reading.text, "reading.text", out);
  lesson.reading.questions.forEach((q, i) => {
    const key = q.options[q.correct];
    if (key) collectNumberClaims(key, `reading.questions[${i}].options[${q.correct}]`, out);
    collectNumberClaims(q.explanation ?? "", `reading.questions[${i}].explanation`, out);
  });
  lesson.game.forEach((g, i) => {
    collectNumberClaims(g.prompt, `game[${i}].prompt`, out);
    g.options.forEach((o, j) => {
      if (o.correct) collectNumberClaims(o.text, `game[${i}].options[${j}]`, out);
    });
    collectNumberClaims(g.explanation ?? "", `game[${i}].explanation`, out);
  });
  return out;
}

/** Một dòng cho mỗi sự việc mà một bài nói hai con số khác nhau. */
function numberClashesIn(key: string, lesson: LessonContent): string[] {
  const grouped = new Map<string, NumberClaim[]>();
  for (const c of numberClaimsOfLesson(lesson)) {
    if (!grouped.has(c.key)) grouped.set(c.key, []);
    grouped.get(c.key)!.push(c);
  }
  const out: string[] = [];
  for (const [claimKey, claims] of grouped) {
    const nums = [...new Set(claims.map((c) => c.num))];
    if (nums.length < 2) continue;
    out.push(
      `${whereOf(key, lesson)} · "${claimKey}" nói ${nums.join(" và ")} · ` +
        claims.map((c) => `${c.where}="${c.text.slice(0, 80)}"`).join(" ⟂ "),
    );
  }
  return out;
}

// ── Layer R · vai người nghe là một trường của cụm ────────────────────────
// Layer M kiểm chiều "lượt `colleague` mà câu có sir/madam". Chiều ngược lại
// không ai kiểm, và nó đắt hơn: câu đích tuần 22 của Spa đổi thành "Please
// help me bring him out, sir." mà `speakerRole` vẫn là mặc định `guest`, nên
// học viên được luyện để nhờ CHÍNH VỊ KHÁCH vào buồng xông 43-46 °C khiêng
// một người bất tỉnh ra. Cách đó năm dòng, lượt cứu hộ hồ bơi làm đúng bằng
// `"colleague"`. Ô ấy nằm trong bể ô dự trữ BẮT BUỘC ĐÚNG của buildOral.
//
// Hai phép kiểm, cả hai đo trên cả 3.770 lượt nói của 40 tuần × 6 bộ phận:
//
// (1) CHUỖI. Mọi lượt trong một chuỗi `follows` phải cùng `speakerRole` với
//     lượt mở của nó. Một hội thoại không đổi người giữa chừng; nếu đổi thì
//     `follows` đang nối nhầm. Toàn corpus hiện sạch — chốt 0.
//
// (2) NGƯỜI NGHE. Một câu chỉ có nghĩa khi nói với đồng nghiệp mà lại gắn
//     `guest`. Các mẫu dưới đây được chọn bằng cách ĐO: mỗi mẫu phải khớp
//     nhiều lượt `colleague`/`manager` và không khớp lượt `guest` nào ngoài
//     chính ca hỏng. Những mẫu nghe có lý mà không qua được phép đo đó đã bị
//     loại và ghi lại ở đây để không ai thêm lại:
//       · `are you free|busy` → 16 lượt khách ("Excuse me, are you free?").
//       · `what do i do` → 5 lượt khách hỏi về tờ khai.
//       · `the trolley|the linen room|the staff canteen` → 5 lượt khách hỏi
//         đường; khách NHÌN THẤY xe đẩy, chỉ không đẩy nó.
//       · `can you lift|hold|take …` → khách được mời tự nhấc giấy tờ của
//         mình lên (HK tuần 39) là lịch sự, không phải sai vai.
const R_INTERNAL_PROMPT: { name: string; re: RegExp }[] = [
  { name: "ca trực", re: /\b(your|my|the|this|that|next|last) shift\b/i },
  { name: "bàn giao", re: /\bhandover\b/i },
  { name: "lịch phân công", re: /\b(rota|roster|logbook|log book|duty list)\b/i },
  { name: "chấm công", re: /\bclock (in|out|off)\b/i },
  {
    name: "khu vực nội bộ",
    re: /\b(the stockroom|the store room|the staff (room|entrance|lift)|the back office)\b/i,
  },
  {
    name: "tổ/cấp trên",
    re: /\b(the team today|our team|my supervisor|your supervisor|the duty roster)\b/i,
  },
];
const R_INTERNAL_TARGET: { name: string; re: RegExp }[] = [
  { name: "nhờ làm việc tay chân", re: /\bhelp me (?!with\b|to understand\b|understand\b)[a-z]/i },
  {
    name: "giao ca/trực thay",
    re: /\b(cover for me|cover the (desk|section|floor|station|shift)|take over the|swap shifts)\b/i,
  },
  {
    name: "sai khiến việc nội bộ",
    re: /(?:^|[.!?]\s+|,\s+)(please\s+)?(restock|mop|vacuum|hoover|clock (in|out)|log the|file the handover|brief the|put the wet floor sign)\b/i,
  },
];

function chainRoleBreaksIn(key: string, lesson: LessonContent): string[] {
  const out: string[] = [];
  lesson.speaking.forEach((item, i) => {
    if (!item.follows) return;
    // MỌI bản in của câu mở trong bài này, không chỉ bản đầu: buildOral giải
    // `follows` trong phạm vi bài và chọn bản gần nhất TRƯỚC nó, nên một bản
    // lệch vai là một mắt xích lệch vai.
    lesson.speaking.forEach((head, j) => {
      if (j === i || head.targetResponse !== item.follows) return;
      if (roleOf(head) === roleOf(item)) return;
      out.push(
        `${whereOf(key, lesson)} · speaking[${i}].speakerRole=${roleOf(item)} nối vào ` +
          `speaking[${j}].speakerRole=${roleOf(head)} · lượt mở "${head.targetResponse}" ⟂ ` +
          `lượt tiếp "${item.targetResponse}"`,
      );
    });
  });
  return out;
}

function listenerRoleBreaksIn(key: string, lesson: LessonContent): string[] {
  const out: string[] = [];
  lesson.speaking.forEach((item, i) => {
    if (roleOf(item) !== "guest") return;
    for (const p of R_INTERNAL_PROMPT)
      if (p.re.test(item.guestPrompt))
        out.push(
          `${whereOf(key, lesson)} · speaking[${i}].speakerRole=guest nhưng guestPrompt là lời ` +
            `người trong ca (${p.name}) · "${item.guestPrompt}" ⟂ câu đích "${item.targetResponse}"`,
        );
    for (const p of R_INTERNAL_TARGET)
      if (p.re.test(item.targetResponse))
        out.push(
          `${whereOf(key, lesson)} · speaking[${i}].speakerRole=guest nhưng targetResponse ` +
            `${p.name} · "${item.targetResponse}" ⟂ lời người nghe "${item.guestPrompt}"`,
        );
  });
  return out;
}

// ── Layer S · tip hứa gì thì khoá nấy ─────────────────────────────────────
// Một helpTip dặn "phải có giấy tờ CÓ ẢNH" trong khi ô không khai
// `requiredTokens`, nên "May I see any identification?" — mất đúng chữ
// `photo` — vẫn được chấm ĐÚNG. Cùng hình dạng: mất `room` khỏi "Which room
// are you in?", mất `late` khỏi "late check-out", mất `duty` khỏi "duty
// manager", mất `gloves` khỏi "Wear gloves when you use chemicals."
//
// (a) TỪ TIP TRÍCH DẪN PHẢI KHOÁ ĐƯỢC. Không so với `requiredTokens` bằng
//     mắt: BỎ chữ ấy khỏi câu đích rồi hỏi CHÍNH bộ chấm production
//     (`utterancePassed`) xem câu còn lại có qua không. Qua nghĩa là lời hứa
//     của tip không có hiệu lực. Gọi hàm thật, nên phép đo không thể lệch
//     khỏi cái đang ship — chép luật vào script rồi đo bản chép là cách nhiều
//     vòng trước ra số sai.
//     Bỏ qua một nhúm từ thuần lễ độ (sorry, glad, certainly…): tip trích
//     dẫn chúng để dạy GIỌNG, không phải để khoá nghĩa; đo trên corpus, lọc
//     này bỏ 14 dương tính giả và không bỏ ca nào thật.
// (b) Ô NÓI DỰ TRỮ PHẢI CHỊU ĐƯỢC MẤT MỘT CHỮ MANG RỦI RO. `buildOral` dành
//     đúng một lượt của mỗi lần thi cho một quyết định người nói không có
//     quyền, hoặc rủi ro của chính bộ phận — và `oralHalfPassed` bắt buộc lượt
//     đó phải đúng.
//
//     BẢN CŨ KIỂM SỰ CÓ MẶT, KHÔNG KIỂM SỨC CHỊU ĐỰNG: nó hỏi "ô này có khai
//     `requiredTokens` không?", đọc được 0 vi phạm lúc lớp này được viết lại,
//     và xanh suốt — trong khi ba câu của F&B vẫn được chấm ĐÚNG khi mất đúng
//     chữ mang rủi ro: "I cannot serve alcohol without ID." khoá
//     ["without","serve"] nên bỏ `alcohol` HOẶC bỏ `ID` vẫn qua; "May I call
//     the duty manager?" bỏ `duty` vẫn qua và thành câu tự mâu thuẫn (quản lý
//     của tôi không có mặt, để tôi gọi quản lý); "…about halal options" bỏ
//     `halal` vẫn qua. Có khoá không có nghĩa là khoá đúng chữ.
//
//     Nên phép đo đổi sang đúng cơ chế (a) đã dùng: BỎ từng từ nội dung của
//     câu đích rồi hỏi bộ chấm production. Và hỏi đúng bộ chấm của KỲ THI, chứ
//     không phải một bản gần giống: `buildOral` chấm ô dự trữ bằng
//     `utterancePassedAny` trên danh sách `acceptedAnswers` — vốn còn gắn thêm
//     khoá headword tuần 1..w mà `requiredTokens` thô của frame không có, và
//     còn chấp nhận mọi câu trả lời khác khoá học dạy cho cùng lời khách. Đọc
//     `requiredTokens` thô ở đây sẽ vừa báo oan (ô không khai gì nhưng đã bị
//     khoá headword) vừa bỏ lọt (ô khai đủ thứ trừ chữ mang rủi ro) — chính là
//     hai nửa của cái cổng cũ.
//
//     Mẫu chọn bể KHÔNG được chép: đọc thẳng `CARRIES_AUTHORITY` và `TOPIC`
//     từ nguồn `src/lib/checkpoint-oral.ts`. Hai hằng ấy nằm trong thân
//     `buildOral` nên không import được, và một bản chép ở đây sẽ là luật thứ
//     hai — đúng cái bệnh mà comment của chính file đó cảnh báo. Đọc nguồn thì
//     mẫu đổi một chữ là lớp này thấy ngay; không đọc được thì báo lỗi cứng.
const ORAL_SOURCE = new URL("../src/lib/checkpoint-oral.ts", import.meta.url);

function regexFromLiteral(src: string): RegExp {
  const open = src.indexOf("/");
  const close = src.lastIndexOf("/");
  return new RegExp(src.slice(open + 1, close), src.slice(close + 1).trim());
}

async function reservedDrawPatterns(): Promise<{
  authority: RegExp;
  topic: Record<string, RegExp>;
} | null> {
  const source = await Bun.file(ORAL_SOURCE).text();
  const authorityDecl = /const CARRIES_AUTHORITY\s*=\s*([\s\S]*?);\n/.exec(source);
  const topicStart = source.indexOf("const TOPIC: Record<string, RegExp> = {");
  if (!authorityDecl || topicStart < 0) return null;
  const topicBody = source.slice(topicStart, source.indexOf("\n  };", topicStart));
  const topic: Record<string, RegExp> = {};
  for (const m of topicBody.matchAll(/^\s*([A-Z]{2}):\s*(\/[\s\S]*?\/[a-z]*),?\s*$/gm))
    topic[m[1]] = regexFromLiteral(m[2]);
  if (Object.keys(topic).length < 6) return null;
  const authority = regexFromLiteral(authorityDecl[1]);
  // Mỏ neo: nếu mẫu bị đổi đến mức không còn nhận ra hai câu kinh điển của
  // chính nó thì bản đọc này đã hỏng, và im lặng bỏ qua còn tệ hơn báo đỏ.
  if (!authority.test("I cannot decide that — may I ask my manager?")) return null;
  if (!topic.FO.test("May I see any photo identification?")) return null;
  return { authority, topic };
}

const S_TIP_FUNCTION_WORDS = new Set(
  (
    "a an the and or but of in on at to for with from by as is am are was were be been being " +
    "do does did have has had will would can could may might shall should must i you he she " +
    "it we they me him her us them my your his its our their this that these those there here " +
    "please yes no not so if then very just also too now sir madam"
  ).split(" "),
);
/** Tip trích dẫn chúng để dạy giọng, không phải để khoá nghĩa. */
const S_EXPRESSIVE = new Set(
  (
    "sorry glad hear lovely certainly quite right thank thanks much welcome course moment " +
    "pleasure happy wonderful great nice good fine sure absolutely indeed apologies " +
    "apologise apologize excuse"
  ).split(" "),
);

/** NGỮ PHÁP MỞ — chữ mà bộ chấm tha bằng thiết kế, nên bỏ chúng đi mà câu vẫn
 *  qua không nói lên điều gì về câu.
 *
 *  `S_TIP_FUNCTION_WORDS` đủ cho (a) vì ở đó chữ đến từ một đoạn tip TRÍCH DẪN,
 *  đã hẹp sẵn. (b) và Layer T quét CẢ câu đích nên phải kể thêm lượng từ, từ
 *  để hỏi, từ chỉ định và số đếm. Số đếm nằm đây không phải vì chúng không quan
 *  trọng mà vì ngược lại: chúng đã là `VALUE_TOKENS`, bộ chấm tự đòi chúng, nên
 *  chữ số duy nhất lọt qua phép xoá là chữ số bộ chấm đã cố ý tha ("One moment,
 *  madam." mất `one`) — 10 dòng, không dòng nào là ca thật. */
const OPEN_GRAMMAR = new Set([
  ...S_TIP_FUNCTION_WORDS,
  ...(
    "any all some each every another other more most many much both either neither " +
    "what when where which who whom whose how why whether " +
    "one two three four five six seven eight nine ten eleven twelve twenty thirty forty " +
    "fifty sixty seventy eighty ninety hundred thousand " +
    "maam again else past good morning afternoon evening afraid"
  ).split(" "),
]);

/** Từ mang nghĩa của một câu mẫu, theo thứ tự `normalize` in ra. `id` dài hai
 *  chữ và là đúng một trong những chữ mang rủi ro mà ca chuẩn của (b) nói tới,
 *  nên sàn ở đây là 2 chứ không phải 3.
 *
 *  Dấu nháy ở RÌA bị cắt trước khi tra bộ mở: một câu mẫu trích dẫn lời phải
 *  nói ("Say 'One moment, sir' and nothing else.") để lại token `sir'`, không
 *  khớp `sir` trong bộ mở, và lớp (b) báo GR-39 là rơi mất một chữ mang rủi ro
 *  vì bỏ được chữ `sir`. Nháy BÊN TRONG giữ nguyên — `guest's` là một chữ
 *  thật, và đúng là một dòng lớp (b) phải báo. */
function contentWordsOf(target: string, alsoOpen: ReadonlySet<string>): string[] {
  const out: string[] = [];
  const seen = new Set<string>();
  for (const raw of normalize(target)) {
    const token = raw.replace(/^'+|'+$/g, "");
    if (seen.has(token)) continue;
    seen.add(token);
    if (token.length < 2 || !/^[a-z][a-z']*$/.test(token)) continue;
    if (OPEN_GRAMMAR.has(token) || COURTESY_EXTRAS.has(token) || alsoOpen.has(token)) continue;
    out.push(token);
  }
  return out;
}

/** Câu đích sau khi bỏ đúng một chữ, hoặc null khi chữ ấy không nằm nguyên văn
 *  trong câu (`normalize` giãn số và viết tắt, nên không phải token nào cũng có
 *  mặt thật). */
function targetWithout(target: string, word: string): string | null {
  const re = new RegExp("(?<![A-Za-z'-])" + word + "(?![A-Za-z'-])", "i");
  if (!re.test(target)) return null;
  const without = target
    .replace(re, "")
    .replace(/\s{2,}/g, " ")
    .replace(/\s+([,.!?])/g, "$1")
    .trim();
  return !without || without === target ? null : without;
}

/** Đúng danh sách câu trả lời mà `buildOral` trao cho bộ chấm cho ô này —
 *  `acceptedAnswers` gọi với chính bộ tham số của nó, nên khoá headword và các
 *  câu thay thế đều là của kỳ thi thật chứ không phải của một bản dựng lại. */
const examAnswersFor = (week: WeekContent, item: SpeakingItem) =>
  acceptedAnswers(
    week.departmentId,
    week.weekNumber,
    item.guestPrompt,
    item.targetResponse,
    item.requiredTokens,
    item.speakerRole,
  );

function droppableQuotedWordsIn(key: string, week: WeekContent, lesson: LessonContent): string[] {
  const out: string[] = [];
  lesson.speaking.forEach((item, i) => {
    const target = item.targetResponse;
    const lower = target.toLowerCase();
    for (const raw of item.helpTip.match(/'([^']{2,60})'/g) ?? []) {
      const quote = raw.slice(1, -1);
      if (VN_MARK.test(quote)) continue; // chú giải tiếng Việt, không phải câu phải nói
      if (!/[a-z]/i.test(quote)) continue;
      if (quote !== quote.trim()) continue;
      if (!lower.includes(quote.toLowerCase())) continue; // Layer G lo phần này
      const at = item.helpTip.indexOf(raw);
      if (COUNTER_EXAMPLE.test(item.helpTip.slice(Math.max(0, at - 40), at))) continue;
      const words = (quote.match(/[A-Za-z][A-Za-z'-]*/g) ?? [])
        .map((w) => w.toLowerCase())
        .filter((w) => w.length > 2 && !S_TIP_FUNCTION_WORDS.has(w) && !S_EXPRESSIVE.has(w));
      for (const word of new Set(words)) {
        const re = new RegExp("(?<![A-Za-z'-])" + word + "(?![A-Za-z'-])", "i");
        if (!re.test(target)) continue;
        const without = target
          .replace(re, "")
          .replace(/\s{2,}/g, " ")
          .replace(/\s+([,.!?])/g, "$1")
          .trim();
        if (!without || without === target) continue;
        if (
          !utterancePassed(without, target, week.weekNumber, item.requiredTokens, item.guestPrompt)
            .passed
        )
          continue;
        out.push(
          `${whereOf(key, lesson)} · speaking[${i}].helpTip trích '${quote}' nhưng bỏ "${word}" ` +
            `vẫn ĐƯỢC CHẤM ĐÚNG · requiredTokens=[${(item.requiredTokens ?? []).join(",") || "—"}] · ` +
            `câu đích "${target}" ⟂ câu vẫn qua "${without}"`,
        );
      }
    }
  });
  return out;
}

function fragileReservedTurnsIn(
  key: string,
  week: WeekContent,
  lesson: LessonContent,
  patterns: { authority: RegExp; topic: Record<string, RegExp> },
): string[] {
  const out: string[] = [];
  const dep = week.departmentId.toUpperCase();
  lesson.speaking.forEach((item, i) => {
    const hit =
      patterns.authority.exec(item.targetResponse) ??
      patterns.topic[dep]?.exec(item.targetResponse);
    if (!hit) return;
    const answers = examAnswersFor(week, item);
    for (const word of contentWordsOf(item.targetResponse, S_EXPRESSIVE)) {
      const without = targetWithout(item.targetResponse, word);
      if (!without) continue;
      if (!utterancePassedAny(without, answers, week.weekNumber, item.guestPrompt).passed) continue;
      out.push(
        `${whereOf(key, lesson)} · speaking[${i}] rơi vào bể ô dự trữ qua "${hit[0]}" nhưng bỏ ` +
          `"${word}" vẫn ĐƯỢC CHẤM ĐÚNG · khoá kỳ thi=[${(answers[0]?.requiredTokens ?? []).join(",") || "—"}] · ` +
          `câu đích "${item.targetResponse}" ⟂ câu vẫn qua "${without}"`,
      );
    }
  });
  return out;
}

// ── Layer T · thẻ phải được dạy TRƯỚC tuần bắt nói ────────────────────────
// Phép quét cũ kiểm SỰ TỒN TẠI của thẻ trong tuần 1-22 và báo 0, trong khi
// tuần 16 vẫn bắt nói `restock` còn thẻ `Restock` nằm ở tuần 22 — rút trúng ở
// 2,3% lượt oral. Cùng hình dạng: một auditor đo 21/288 (7,3%) câu mẫu GR đòi
// một thẻ chưa dạy. Sự tồn tại không phải là thứ tự dạy.
//
// "Khung bắt học viên NÓI" = `requiredTokens`: bộ chấm không tha token nào
// trong đó. Bốn chỗ phải cẩn thận, cả bốn đều đã cắn khi đo:
//   · `lockWeekHeadwords` còn nhét PROMISE_VERBS ("ask", "check", "call"…)
//     vào `requiredTokens`. Chúng không phải thẻ, nên loại — không loại thì
//     327 dòng, quá nửa là "ask" trỏ vào một thẻ tuần 40 tên "Know when to ask".
//   · Thẻ NHIỀU TỪ vẫn dạy từng từ của nó: "Coffee preference" ở tuần 17 dạy
//     `preference`, nên chỉ mục phải tính mọi token của mọi thẻ. Chỉ đếm thẻ
//     một từ thì GR tuần 17 bị báo oan vì thẻ `Preference` một từ ở tuần 27.
//   · Khoá sinh ra theo số nhiều ("towels" khớp thẻ "Towel"), nên tra cả dạng
//     rút "s"/"es" đúng như `lockWeekHeadwords` sinh ra chúng — và phải lấy
//     TUẦN NHỎ NHẤT trên mọi dạng, xem taughtAt() bên dưới.
//   · Chỉ mục đi qua `normalize`, nên gạch nối bị tách: thẻ "Prepare a
//     nut-free dish" nằm trong chỉ mục dưới `nut` chứ không phải `nut-free`.
//     Một script kiểm viết riêng mà giữ nguyên gạch nối sẽ báo ngược lại là
//     "không có thẻ nào dạy chữ này" — đã có người đo nhầm một vòng vì thế.
//
// VÀ MỘT ĐIỀU VỀ CÁCH SỬA, không phải về cách đo. Phần lớn dòng còn lại KHÔNG
// nên chữa bằng cách gỡ token khỏi `requiredTokens`. Nhánh nội dung đã đo
// từng ca bằng `utterancePassed`: `sorry`, `manager`, `doctor`, `covered`,
// `sit`, `down`, `cannot`, `someone`, `about` đều đã bị bộ chấm khoá sẵn bằng
// đường khác, nên gỡ chỉ làm cổng xanh mà không đổi một điểm chấm nào — đúng
// hình dạng "sửa một nửa hiện vật" mà cả khối này sinh ra để chặn. Cách sửa
// thật là chuyển thẻ lên sớm, hoặc đổi câu mẫu của tuần ấy.
//
// ══ HAI LỖ HỔNG CỦA BẢN ĐẦU, cả hai do auditor mù tìm ra ═══════════════════
//
// (1) BẢN ĐẦU BỎ QUA CHÍNH TRƯỜNG HỢP XẤU NHẤT. Dòng lọc là
//     `if (!taught || taught.week <= week) continue`, nên một token KHÔNG CÓ
//     THẺ Ở BẤT KỲ TUẦN NÀO rơi vào cùng một nhánh `continue` với một token
//     đã dạy đúng hạn. Cổng chỉ bắt "dạy MUỘN" và không bao giờ bắt "KHÔNG BAO
//     GIỜ DẠY" — mà "không bao giờ" nặng hơn: dạy muộn thì đến tuần thi học
//     viên đã có thẻ, không bao giờ thì không có gì để đến.
//     Đo được ở Spa: ô nói dự trữ BẮT BUỘC ĐÚNG đang khoá `pregnant`, `able`,
//     `adult`, `parent` — không chữ nào có thẻ trong cả 40 tuần — ở 10,7% số
//     lượt thi. Trượt ô dự trữ là trượt cả nửa nói. Nên nhóm này là một gauge
//     RIÊNG, nặng hơn, không trộn vào số "dạy muộn".
//     Kèm theo: phép tra phải rộng hơn ba dạng cũ, nếu không "không bao giờ
//     dạy" sẽ báo oan. `allergies` đọc ra "không có thẻ" trong khi SW dạy thẻ
//     `Allergy` ở tuần 23 — đó là DẠY MUỘN, một hạng nhẹ hơn, và gọi tên sai
//     hạng thì nhánh nội dung đi sửa nhầm việc. 6 dòng như thế; taughtAt()
//     dưới đây thêm ies↔y, ing, ed và dạng cộng "s"/"es", và cố ý KHÔNG thêm
//     rút "er"/"est": "offer" → "off" sẽ khớp thẻ "Take it off" và làm cổng
//     mù ngược lại.
//
// (2) BẢN ĐẦU ĐỊNH NGHĨA "BẮT NÓI" QUÁ HẸP. Nó coi "bắt học viên nói" = có
//     trong `requiredTokens`. Nhưng bộ chấm còn một đường thứ hai: ngưỡng
//     chính xác. Một chữ nằm trong `targetResponse` mà không được khoá vẫn
//     phải nói ra thì câu mới qua — `restock` ở tuần 16 (thẻ ở tuần 22) đi
//     đúng đường đó và lọt cổng, ở 3,02% số lượt thi.
//     Quét cả câu đích thì phải trả giá bằng dương tính giả, nên có hai bộ
//     lọc, mỗi bộ đổi lấy một lớp đã đo trên 40 tuần × 6 bộ phận:
//       · BỘ CHẤM PHẢI THẬT SỰ ĐÒI. Bỏ chữ ấy khỏi câu đích rồi hỏi
//         `utterancePassedAny` trên `acceptedAnswers` — cùng cặp hàm kỳ thi
//         dùng. Còn qua nghĩa là khoá học không bắt nói chữ đó, chỉ in nó ra.
//         Lọc này bỏ 36 dòng (224 → 188).
//       · THẺ PHẢI NÓI VỀ CHÍNH CHỮ ẤY. Ở nhánh `requiredTokens` thì một thẻ
//         cụm vẫn dạy từng từ của nó (xem gạch đầu dòng "Coffee preference"
//         bên trên) vì ở đó vi phạm là một KHOÁ đòi đúng chữ. Ở nhánh câu đích
//         thì không: đọc thẻ cụm làm bằng chứng biến mọi giới từ thành "từ
//         mới" — `over` "chưa dạy" cho tới thẻ "Hand it over" tuần 36, `come`
//         tới "Come back to you" tuần 35, `fine` tới "Either is fine" tuần 37,
//         `nobody` tới "Nobody taught me" tuần 40. Nên nhánh này đòi bộ phận
//         có một thẻ MỘT TỪ cho chữ ấy ở đâu đó (bằng chứng nó là headword
//         thật), rồi mới so tuần bằng thẻ SỚM NHẤT thuộc mọi dạng. Lọc này bỏ
//         917 dòng (1.141 → 224).
//     Còn một hạng thứ ba đã đo và CỐ Ý KHÔNG dựng cổng: chữ trong câu đích mà
//     cả bộ phận không hề có thẻ — 1.456 cặp (bộ phận × chữ), 2.728 lượt. Đó là tiếng
//     Anh thường ("about", "like", "let", "everything"), không phải nợ thứ tự
//     dạy: một khoá học không thể cấp thẻ cho mọi từ nó in ra. Hạng ấy chỉ
//     nặng khi nó là một KHOÁ, và đó đúng là gauge (1).
type TaughtAt = { week: number; card: string };
/** `any`: mọi token của mọi thẻ. `solo`: chỉ thẻ MỘT TỪ — bằng chứng chữ ấy là
 *  headword của chính nó chứ không phải một mảnh của thẻ cụm. */
type TaughtIndex = { any: Map<string, TaughtAt>; solo: Map<string, TaughtAt> };
/** `saidDroppable` không phải một vi phạm: nó là những ứng viên của nhánh câu
 *  đích mà bộ chấm production CHO QUA khi thiếu chữ, tức đúng phần bộ lọc ném
 *  đi. Đếm nó để hồi quy chứng minh được bộ lọc còn sống — một bộ lọc luôn trả
 *  "rớt" sẽ khiến số này bằng 0 mà mọi khẳng định khác vẫn xanh. */
type TeachOrderBreaks = {
  late: string[];
  never: string[];
  said: string[];
  saidDroppable: string[];
};

function firstTaughtIndex(weeks: Record<string, WeekContent>): TaughtIndex {
  const index: TaughtIndex = { any: new Map(), solo: new Map() };
  const note = (map: Map<string, TaughtAt>, k: string, at: TaughtAt) => {
    const prev = map.get(k);
    if (prev === undefined || at.week < prev.week) map.set(k, at);
  };
  for (const week of Object.values(weeks))
    for (const lesson of week.lessons)
      for (const card of lesson.vocabulary) {
        const tokens = normalize(card.word);
        const at = { week: week.weekNumber, card: card.word };
        for (const token of tokens) {
          note(index.any, `${week.departmentId}|${token}`, at);
          if (tokens.length === 1) note(index.solo, `${week.departmentId}|${token}`, at);
        }
      }
  return index;
}

/** TUẦN NHỎ NHẤT TRÊN MỌI DẠNG, không phải dạng khớp đầu tiên.
 *
 *  Bản đầu `return` ngay ở dạng nào khớp trước, nên một thẻ SỐ NHIỀU muộn che
 *  mất thẻ số ít sớm và cổng chỉ thẳng vào thẻ sai: `towels` đọc ra HK-16
 *  "Fresh towels" trong khi HK-2 đã dạy "Towel"; `guests` đọc ra GR-15 "Greet
 *  guests in the lobby" trong khi GR-1 đã dạy "Guest Relations". Một nhánh nội
 *  dung render lại và đếm: 22 trong 64 dòng là oan, và ba trong số đó đúng là
 *  các ca hàng đợi gọi là nặng nhất — tức cổng đang đẩy người sửa đi sửa nhầm
 *  chỗ, đắt hơn là không có cổng. */
function taughtAt(map: Map<string, TaughtAt>, dep: string, token: string): TaughtAt | undefined {
  const forms = [
    token,
    token.replace(/ies$/, "y"),
    token.replace(/es$/, ""),
    token.replace(/s$/, ""),
    token.replace(/y$/, "ies"),
    token + "s",
    token + "es",
    token.replace(/ing$/, ""),
    token.replace(/ing$/, "e"),
    token.replace(/ed$/, ""),
    token.replace(/ed$/, "e"),
  ];
  let best: TaughtAt | undefined;
  for (const form of new Set(forms)) {
    if (form.length < 3) continue;
    const hit = map.get(`${dep}|${form}`);
    if (hit && (best === undefined || hit.week < best.week)) best = hit;
  }
  return best;
}

function teachOrderBreaksIn(
  index: TaughtIndex,
  key: string,
  week: WeekContent,
  lesson: LessonContent,
): TeachOrderBreaks {
  const late: string[] = [];
  const never: string[] = [];
  const said: string[] = [];
  const saidDroppable: string[] = [];
  const dep = week.departmentId;
  lesson.speaking.forEach((item, i) => {
    const locked = new Set<string>();
    for (const declared of item.requiredTokens ?? [])
      for (const token of normalize(declared)) locked.add(token);
    const seen = new Set<string>();
    for (const token of locked) {
      if (token.length <= 2 || PROMISE_VERBS.has(token) || seen.has(token)) continue;
      seen.add(token);
      const taught = taughtAt(index.any, dep, token);
      if (!taught) {
        never.push(
          `${whereOf(key, lesson)} · speaking[${i}].requiredTokens bắt nói "${token}" · ` +
            `${dep} KHÔNG CÓ THẺ NÀO dạy chữ này trong cả 40 tuần · câu đích ` +
            `"${item.targetResponse.slice(0, 80)}"`,
        );
        continue;
      }
      if (taught.week <= week.weekNumber) continue;
      late.push(
        `${whereOf(key, lesson)} · speaking[${i}].requiredTokens bắt nói "${token}" · ` +
          `thẻ "${taught.card}" mới dạy ở ${dep}-${taught.week} · câu đích ` +
          `"${item.targetResponse.slice(0, 80)}" ⟂ thẻ dạy sau ${taught.week - week.weekNumber} tuần`,
      );
    }
    // Nhánh (2): chữ câu đích BẮT NÓI qua ngưỡng chính xác chứ không qua khoá.
    // Gọi `acceptedAnswers` sau cùng, chỉ cho ứng viên đã qua hai bộ lọc rẻ.
    let answers: ReturnType<typeof examAnswersFor> | undefined;
    for (const token of contentWordsOf(item.targetResponse, PROMISE_VERBS)) {
      if (token.length <= 2 || locked.has(token)) continue;
      const taught = taughtAt(index.any, dep, token);
      if (!taught || taught.week <= week.weekNumber) continue;
      if (!taughtAt(index.solo, dep, token)) continue;
      const without = targetWithout(item.targetResponse, token);
      if (!without) continue;
      answers ??= examAnswersFor(week, item);
      if (utterancePassedAny(without, answers, week.weekNumber, item.guestPrompt).passed) {
        saidDroppable.push(`${whereOf(key, lesson)} · speaking[${i}] "${token}"`);
        continue;
      }
      said.push(
        `${whereOf(key, lesson)} · speaking[${i}].targetResponse bắt nói "${token}" (bỏ đi là ` +
          `RỚT, dù không khoá) · thẻ "${taught.card}" mới dạy ở ${dep}-${taught.week} · câu đích ` +
          `"${item.targetResponse.slice(0, 80)}" ⟂ thẻ dạy sau ${taught.week - week.weekNumber} tuần`,
      );
    }
  });
  return { late, never, said, saidDroppable };
}

// ── Hồi quy: đầu độc một bản sao trong bộ nhớ, rồi đòi lớp ấy đỏ ──────────
// Một cổng không tự chứng minh được là một cổng không ai biết đã chết lúc
// nào — đợt trước có một bài sát hạch sập 30/30 trong khi mọi gate vẫn xanh,
// vì gate chép lại luật thay vì gọi hàm thật. Bốn ca dưới đây là bốn ca đã
// được báo cáo, dựng lại trên BẢN SAO (structuredClone) của nội dung thật.
// Repo không bị đụng tới.
function selfTestClusterGates(
  patterns: { authority: RegExp; topic: Record<string, RegExp> } | null,
  taught: TaughtIndex,
) {
  const fail = (what: string) => {
    clusterGatesTrustworthy = false;
    errors.push(`[SELFTEST cluster-gates] ${what} — lớp này không còn bắt được ca chuẩn của nó`);
  };
  const anyWeek = (dep: string, wk: number) => ALL_WEEKS[`${dep}-${wk}`];

  // Q — "sửa một nửa hiện vật": lấy một bài NHẤT QUÁN, xác nhận sạch, rồi đổi
  // đúng một trường sang con số khác và đòi nó đỏ.
  let qProved = false;
  outer: for (const [key, week] of Object.entries(ALL_WEEKS))
    for (const lesson of week.lessons) {
      if (numberClashesIn(key, lesson).length) continue; // bài này đã hỏng sẵn
      const groups = new Map<string, NumberClaim[]>();
      for (const c of numberClaimsOfLesson(lesson)) {
        if (!groups.has(c.key)) groups.set(c.key, []);
        groups.get(c.key)!.push(c);
      }
      for (const claims of groups.values()) {
        if (claims.length < 2) continue;
        const victim = claims[0];
        const swap = victim.num === "eight" ? "four" : "eight";
        const poisoned = structuredClone(lesson);
        const field = victim.where;
        const rewrite = (s: string) =>
          s.replace(new RegExp("(?<![a-z])" + victim.num + "(?![a-z])", "i"), swap);
        if (field.startsWith("vocabulary[")) {
          const i = Number(field.slice(11, field.indexOf("]")));
          poisoned.vocabulary[i].context = rewrite(poisoned.vocabulary[i].context);
        } else if (field === "reading.text") {
          poisoned.reading.text = rewrite(poisoned.reading.text);
        } else if (field.startsWith("speaking[")) {
          const i = Number(field.slice(9, field.indexOf("]")));
          if (field.endsWith("targetResponse"))
            poisoned.speaking[i].targetResponse = rewrite(poisoned.speaking[i].targetResponse);
          else poisoned.speaking[i].helpTip = rewrite(poisoned.speaking[i].helpTip);
        } else continue;
        if (!numberClashesIn(key, poisoned).length) continue;
        qProved = true;
        break outer;
      }
    }
  if (!qProved) fail("Layer Q");

  // R — chuỗi `follows` đổi vai giữa chừng, và ca Spa tuần 22.
  let rChainProved = false;
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    for (const lesson of week.lessons) {
      const tail = lesson.speaking.findIndex(
        (s) => s.follows && lesson.speaking.some((h) => h.targetResponse === s.follows),
      );
      if (tail < 0) continue;
      const poisoned = structuredClone(lesson);
      poisoned.speaking[tail].speakerRole =
        roleOf(poisoned.speaking[tail]) === "colleague" ? "guest" : "colleague";
      if (chainRoleBreaksIn(key, poisoned).length) rChainProved = true;
      break;
    }
    if (rChainProved) break;
  }
  if (!rChainProved) fail("Layer R (chuỗi follows)");

  const swLesson = anyWeek("SW", 22)?.lessons[1] ?? anyWeek("SW", 22)?.lessons[0];
  if (!swLesson) fail("Layer R (không tìm thấy SW-22 để dựng ca chuẩn)");
  else {
    const poisoned = structuredClone(swLesson);
    poisoned.speaking = [
      {
        ...poisoned.speaking[0],
        guestPrompt: "Someone has fainted in the steam room!",
        targetResponse: "Please help me bring him out, sir. I am calling the nurse.",
        speakerRole: "guest",
      },
    ];
    if (!listenerRoleBreaksIn("SW-22", poisoned).length) fail("Layer R (vai người nghe)");
    const repaired = structuredClone(poisoned);
    repaired.speaking[0].speakerRole = "colleague";
    if (listenerRoleBreaksIn("SW-22", repaired).length)
      fail("Layer R (vai người nghe) báo cả bản đã sửa");
  }

  // S — ca "CÓ ẢNH": tip trích `photo identification`, ô không khoá gì.
  const foWeek = anyWeek("FO", 22);
  if (!foWeek) fail("Layer S (không tìm thấy FO-22 để dựng ca chuẩn)");
  else {
    const poisoned = structuredClone(foWeek.lessons[0]);
    poisoned.speaking = [
      {
        ...poisoned.speaking[0],
        guestPrompt: "I left my passport in the room.",
        targetResponse: "I understand, sir. May I see any photo identification?",
        helpTip: "Không có hộ chiếu thì vẫn phải có giấy tờ 'photo identification'.",
        requiredTokens: undefined,
      },
    ];
    if (!droppableQuotedWordsIn("FO-22", foWeek, poisoned).length) fail("Layer S (a)");
    const repaired = structuredClone(poisoned);
    repaired.speaking[0].requiredTokens = ["photo", "identification"];
    if (droppableQuotedWordsIn("FO-22", foWeek, repaired).length)
      fail("Layer S (a) báo cả bản đã khoá");
    if (patterns) {
      const hkWeek = anyWeek("HK", 22);
      if (!hkWeek) fail("Layer S (không tìm thấy HK-22 để dựng ca chuẩn)");
      else {
        const gloves = structuredClone(hkWeek.lessons[0]);
        gloves.speaking = [
          {
            ...gloves.speaking[0],
            targetResponse: "No. Wear gloves when you use chemicals.",
            requiredTokens: undefined,
          },
        ];
        const glovesBreaks = fragileReservedTurnsIn("HK-22", hkWeek, gloves, patterns);
        if (!glovesBreaks.some((l) => l.includes('bỏ "gloves"'))) fail("Layer S (b) · ca `gloves`");
        const locked = structuredClone(gloves);
        locked.speaking[0].requiredTokens = ["gloves", "wear", "chemicals"];
        if (fragileReservedTurnsIn("HK-22", hkWeek, locked, patterns).length)
          fail("Layer S (b) báo cả bản đã khoá");

        // …VÀ CA THẬT SỰ LÀM LỚP NÀY PHẢI VIẾT LẠI: ô CÓ `requiredTokens`,
        // cổng cũ xanh, mà chữ mang rủi ro vẫn rơi được. Nếu chỉ giữ ca
        // `gloves` ở trên thì một bản lùi về phép kiểm "có khai khoá không"
        // vẫn xanh cả hai chiều — đúng kiểu hồi quy chứng minh nhầm thứ.
        const fbWeek = anyWeek("FB", 22);
        if (!fbWeek) fail("Layer S (không tìm thấy FB-22 để dựng ca `alcohol`)");
        else {
          const alcohol = structuredClone(fbWeek.lessons[0]);
          alcohol.speaking = [
            {
              ...alcohol.speaking[0],
              guestPrompt: "Two beers, please.",
              targetResponse: "I am sorry, madam. I cannot serve alcohol without ID.",
              requiredTokens: ["without", "serve"],
            },
          ];
          const risky = fragileReservedTurnsIn("FB-22", fbWeek, alcohol, patterns);
          for (const word of ["alcohol", "id"])
            if (!risky.some((l) => l.includes(`bỏ "${word}"`)))
              fail(`Layer S (b) · ca \`alcohol\` không thấy "${word}" rơi được`);
          const tightened = structuredClone(alcohol);
          tightened.speaking[0].requiredTokens = ["without", "serve", "alcohol", "id"];
          if (fragileReservedTurnsIn("FB-22", fbWeek, tightened, patterns).length)
            fail("Layer S (b) báo cả bản đã khoá đúng chữ mang rủi ro");
        }
      }
    }
  }

  // T — ca `restock`: tuần 16 bắt nói, thẻ ở tuần 22.
  const hk16 = anyWeek("HK", 16);
  if (!hk16) fail("Layer T (không tìm thấy HK-16 để dựng ca chuẩn)");
  else {
    /** Bản sao chỉ mục có thể đầu độc từng dạng một, HAI TẦNG RIÊNG: bộ lọc
     *  "thẻ phải nói về chính chữ ấy" chỉ đọc tầng `solo`, nên một forge() sửa
     *  cả hai tầng cùng lúc sẽ không bao giờ thử được bộ lọc đó. */
    const forge = (edits: {
      any?: [string, TaughtAt | null][];
      solo?: [string, TaughtAt | null][];
    }): TaughtIndex => {
      const copy: TaughtIndex = { any: new Map(taught.any), solo: new Map(taught.solo) };
      const apply = (map: Map<string, TaughtAt>, list: [string, TaughtAt | null][] = []) => {
        for (const [k, at] of list)
          if (at === null) map.delete(k);
          else map.set(k, at);
      };
      apply(copy.any, edits.any);
      apply(copy.solo, edits.solo ?? edits.any);
      return copy;
    };
    const card = (week: number, name: string): [string, TaughtAt][] => [
      ["HK|restock", { week, card: name }],
    ];
    const has = (lines: string[], token: string) => lines.some((l) => l.includes(`"${token}"`));

    const poisoned = structuredClone(hk16.lessons[0]);
    poisoned.speaking = [
      {
        ...poisoned.speaking[0],
        targetResponse: "I will restock the trolley now.",
        requiredTokens: ["restock"],
      },
    ];
    const lockedAt = (wk: number) =>
      teachOrderBreaksIn(forge({ any: card(wk, "Restock") }), "HK-16", hk16, poisoned);
    if (!has(lockedAt(22).late, "restock")) fail("Layer T");
    if (has(lockedAt(12).late, "restock")) fail("Layer T báo cả khi thẻ đã dạy trước");

    // T · KHÔNG BAO GIỜ DẠY — ca Spa đã đo: ô nói dự trữ bắt buộc đúng khoá
    // `parent`, và SW không có thẻ nào dạy chữ ấy trong cả 40 tuần. Bản đầu
    // của lớp này bỏ qua đúng trường hợp đó.
    const sw18 = anyWeek("SW", 18);
    if (!sw18) fail("Layer T (không tìm thấy SW-18 để dựng ca chưa bao giờ dạy)");
    else {
      const orphan = structuredClone(sw18.lessons[0]);
      orphan.speaking = [
        {
          ...orphan.speaking[0],
          targetResponse: "I am sorry, madam. I cannot start without a parent in the room.",
          requiredTokens: ["parent", "start"],
        },
      ];
      const bare = forge({
        any: [
          ["SW|parent", null],
          ["SW|parents", null],
        ],
      });
      const breaks = teachOrderBreaksIn(bare, "SW-18", sw18, orphan);
      if (!has(breaks.never, "parent")) fail("Layer T (chưa bao giờ dạy)");
      // …và KHÔNG được đếm hai lần: một chữ không có thẻ thì không có tuần để
      // so muộn, nên nó chỉ được nằm ở một gauge.
      if (has(breaks.late, "parent")) fail("Layer T đếm `parent` ở cả hai hạng");
      // Kill-test: cấp thẻ sớm thì im, cấp thẻ MUỘN thì tụt xuống hạng nhẹ.
      // Thiếu vế thứ hai thì một bản luôn báo "chưa bao giờ dạy" vẫn xanh.
      const parentCard = (wk: number) =>
        teachOrderBreaksIn(
          forge({ any: [["SW|parent", { week: wk, card: "Parent" }]] }),
          "SW-18",
          sw18,
          orphan,
        );
      const early = parentCard(9);
      if (has(early.never, "parent") || has(early.late, "parent"))
        fail("Layer T (chưa bao giờ dạy) báo cả khi thẻ đã dạy trước");
      const later = parentCard(27);
      if (has(later.never, "parent") || !has(later.late, "parent"))
        fail("Layer T xếp thẻ dạy muộn vào hạng chưa bao giờ dạy");

      // PHÉP TRA PHẢI ĐỦ RỘNG, và phải đọc ra đúng HẠNG. `allergies` với một
      // thẻ `Allergy` ở tuần 27 là DẠY MUỘN chứ không phải chưa bao giờ dạy —
      // 6 dòng đã đọc sai hạng như thế, và gọi sai hạng thì nhánh nội dung đi
      // sửa nhầm việc. Đặt thẻ ở tuần MUỘN chứ không phải tuần sớm: thẻ sớm
      // làm cả hai cách đọc cùng im lặng, và phép thử không chứng minh gì —
      // đúng cái bẫy hồi quy `towels` đã sập một vòng.
      const plural = structuredClone(orphan);
      plural.speaking[0].requiredTokens = ["allergies"];
      plural.speaking[0].targetResponse = "Any injuries or allergies, madam?";
      const wide = teachOrderBreaksIn(
        forge({
          any: [
            ["SW|allergies", null],
            ["SW|allergy", { week: 27, card: "Allergy" }],
          ],
        }),
        "SW-18",
        sw18,
        plural,
      );
      if (has(wide.never, "allergies") || !has(wide.late, "allergies"))
        fail('Layer T đọc "allergies" ⟂ thẻ "Allergy" sai hạng');
    }

    // T · CÂU ĐÍCH BẮT NÓI MÀ KHÔNG KHOÁ — chính ca `restock`, lần này với
    // `requiredTokens` RỖNG: đó là hình dạng bản đầu mù hẳn.
    const unlocked = structuredClone(hk16.lessons[0]);
    unlocked.speaking = [
      {
        ...unlocked.speaking[0],
        guestPrompt: "The trolley is empty.",
        targetResponse: "I will restock the trolley now.",
        requiredTokens: [],
      },
    ];
    const saidAt = (wk: number) =>
      teachOrderBreaksIn(forge({ any: card(wk, "Restock") }), "HK-16", hk16, unlocked);
    if (!has(saidAt(22).said, "restock")) fail("Layer T (câu đích)");
    if (has(saidAt(12).said, "restock")) fail("Layer T (câu đích) báo cả khi thẻ đã dạy trước");
    // Kill-test cho bộ lọc "thẻ phải nói về chính chữ ấy": bộ phận chỉ có thẻ
    // CỤM thì im. Thiếu phép thử này, một bản bỏ bộ lọc solo vẫn xanh — và nó
    // là bộ lọc bỏ 917 trong 1.141 dòng, tức phần lớn cổng.
    if (
      has(
        teachOrderBreaksIn(
          forge({
            any: card(22, "Restock the minibar"),
            solo: [["HK|restock", null]],
          }),
          "HK-16",
          hk16,
          unlocked,
        ).said,
        "restock",
      )
    )
      fail("Layer T (câu đích) đọc thẻ cụm như bằng chứng headword");

    // …và ca THẺ SỐ ÍT SỚM BỊ THẺ SỐ NHIỀU MUỘN CHE. Đây là lỗi lookup() đã
    // thật sự ship một vòng: 22 trong 64 dòng là oan, trong đó có đúng ba ca
    // hàng đợi gọi là nặng nhất, nên cổng đẩy người sửa đi sửa nhầm thẻ. Một
    // cổng chỉ sai chỗ đắt hơn một cổng không có, nên nó có hồi quy riêng.
    // Tuần nói phải nằm GIỮA hai thẻ, nếu không cả hai cách đọc cho cùng kết
    // quả và phép thử không chứng minh gì: bản đầu của hồi quy này đặt ở tuần
    // 16, đúng tuần của thẻ số nhiều, nên nó xanh với cả bug lẫn bản sửa.
    const hk15 = anyWeek("HK", 15);
    if (!hk15) fail("Layer T (không tìm thấy HK-15 để dựng ca thẻ số ít/số nhiều)");
    else {
      const plural = structuredClone(hk15.lessons[0]);
      plural.speaking = [
        {
          ...plural.speaking[0],
          targetResponse: "Two bath towels and some soap, madam.",
          requiredTokens: ["towels"],
        },
      ];
      const bothForms = forge({
        any: [
          ["HK|towel", { week: 2, card: "Towel" }],
          ["HK|towels", { week: 16, card: "Fresh towels" }],
        ],
      });
      const breaks = teachOrderBreaksIn(bothForms, "HK-15", hk15, plural);
      if (has(breaks.late, "towels") || has(breaks.never, "towels"))
        fail('Layer T đọc thẻ số nhiều muộn thay vì thẻ số ít sớm ("towels" che mất "Towel")');
    }
  }
}

const NUMBER_BASELINE = new URL("./_number-agreement-baseline.json", import.meta.url);
const LISTENER_BASELINE = new URL("./_listener-role-baseline.json", import.meta.url);
const TIP_LOCK_BASELINE = new URL("./_tip-lock-baseline.json", import.meta.url);
const TEACH_ORDER_BASELINE = new URL("./_teach-before-say-baseline.json", import.meta.url);

async function lintLessonClusters() {
  const patterns = await reservedDrawPatterns();
  if (!patterns)
    errors.push(
      `[S reserved-pattern] không đọc được CARRIES_AUTHORITY/TOPIC từ src/lib/checkpoint-oral.ts — ` +
        `Layer S (b) không có mẫu để chạy. Sửa phép đọc ở lint-content.ts, đừng chép mẫu sang đây.`,
    );
  const taught = firstTaughtIndex(ALL_WEEKS as Record<string, WeekContent>);

  const numberClashes: string[] = [];
  const chainRoles: string[] = [];
  const listenerRoles: string[] = [];
  const droppable: string[] = [];
  const fragile: string[] = [];
  const teachOrderLate: string[] = [];
  const teachOrderNever: string[] = [];
  const teachOrderSaid: string[] = [];
  const saidDroppable: string[] = [];
  for (const [key, week] of Object.entries(ALL_WEEKS)) {
    for (const lesson of week.lessons) {
      numberClashes.push(...numberClashesIn(key, lesson));
      chainRoles.push(...chainRoleBreaksIn(key, lesson));
      listenerRoles.push(...listenerRoleBreaksIn(key, lesson));
      droppable.push(...droppableQuotedWordsIn(key, week, lesson));
      if (patterns) fragile.push(...fragileReservedTurnsIn(key, week, lesson, patterns));
      const breaks = teachOrderBreaksIn(taught, key, week, lesson);
      teachOrderLate.push(...breaks.late);
      teachOrderNever.push(...breaks.never);
      teachOrderSaid.push(...breaks.said);
      saidDroppable.push(...breaks.saidDroppable);
    }
  }

  selfTestClusterGates(patterns, taught);
  // Bộ lọc "bộ chấm phải thật sự đòi" của nhánh câu đích phải còn sống. Một
  // bản luôn trả "rớt" sẽ đẩy cả 1.152 ứng viên vào cổng và mọi khẳng định
  // dựng ca chuẩn ở trên vẫn xanh; số này là chỗ duy nhất nó lộ ra.
  if (!saidDroppable.length) {
    clusterGatesTrustworthy = false;
    errors.push(
      `[SELFTEST cluster-gates] Layer T (câu đích) không ném đi ứng viên nào — ` +
        `phép hỏi utterancePassedAny đã chết, số vi phạm lần này không tin được`,
    );
  }

  await ratchetFile(
    NUMBER_BASELINE,
    "Ratchet only — trong MỘT bài, hai phát biểu về cùng một sự việc (cùng cụm dẫn + cùng danh từ) không được nói hai con số khác nhau. Nhiễu của câu hỏi đọc hiểu và của arcade không tính là phát biểu.",
    [
      {
        field: "lessonNumberClashes",
        tag: "Q lesson-number",
        label: "sự việc bị một bài nói hai con số",
        offenders: numberClashes,
      },
    ],
  );
  await ratchetFile(
    LISTENER_BASELINE,
    "Ratchet only — vai người nghe là một trường của cụm: mọi lượt trong một chuỗi `follows` phải cùng speakerRole với lượt mở, và một lượt chỉ có nghĩa khi nói với người trong ca không được gắn `guest`.",
    [
      {
        field: "chainRoleBreaks",
        tag: "R follows-role",
        label: "mắt xích `follows` đổi vai giữa chừng",
        offenders: chainRoles,
      },
      {
        field: "listenerRoleMismatches",
        tag: "R listener-role",
        label: "lượt nội bộ gắn nhầm `guest`",
        offenders: listenerRoles,
      },
    ],
  );
  await ratchetFile(
    TIP_LOCK_BASELINE,
    "Ratchet only — tip hứa gì thì khoá nấy: bỏ một chữ helpTip trích dẫn ra khỏi câu đích mà utterancePassed vẫn cho qua là lời hứa không hiệu lực; và một ô rơi vào bể ô nói dự trữ BẮT BUỘC ĐÚNG của buildOral phải RỚT khi mất bất kỳ từ nội dung nào — đo bằng utterancePassedAny trên acceptedAnswers, đúng cặp hàm kỳ thi dùng, chứ không phải bằng việc ô ấy có khai requiredTokens hay không.",
    [
      {
        field: "droppableQuotedWords",
        tag: "S tip-lock",
        label: "chữ được tip trích dẫn mà bỏ đi vẫn qua",
        offenders: droppable,
      },
      {
        field: "fragileReservedTurns",
        tag: "S reserved-lock",
        label: "chữ mang rủi ro rơi khỏi ô nói dự trữ mà vẫn được chấm đúng",
        offenders: fragile,
      },
    ],
  );
  await ratchetFile(
    TEACH_ORDER_BASELINE,
    "Ratchet only — mọi token trong requiredTokens phải ứng với một thẻ được dạy ở tuần ≤ tuần bắt nói. PROMISE_VERBS không phải thẻ nên không tính; thẻ nhiều từ vẫn dạy từng từ của nó. Ba hạng riêng, nặng dần: chữ CẢ BỘ PHẬN KHÔNG CÓ THẺ nào dạy; chữ bị khoá mà thẻ dạy sau; và chữ câu đích không khoá nhưng bỏ đi là rớt (đo bằng utterancePassedAny trên acceptedAnswers), hạng này còn đòi bộ phận có một thẻ MỘT TỪ cho chữ ấy.",
    [
      {
        field: "requiredNeverTaught",
        tag: "T never-taught",
        label: "lượt bắt nói một chữ CẢ BỘ PHẬN không có thẻ",
        offenders: teachOrderNever,
      },
      {
        field: "spokenBeforeTaught",
        tag: "T teach-order",
        label: "lượt bắt nói một chữ chưa có thẻ",
        offenders: teachOrderLate,
      },
      {
        field: "saidBeforeTaught",
        tag: "T said-before-taught",
        label: "câu đích bắt nói một chữ chưa có thẻ, không qua requiredTokens",
        offenders: teachOrderSaid,
      },
    ],
  );
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
await lintFollowsAmbiguity();
lintPhoneticMatchesWord();
await lintOneHonorificPerReading();
await lintSlottedHeadwords();
await lintLessonClusters();
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
