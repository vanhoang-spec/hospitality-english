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
  "greet", "check", "allocate", "offer", "escort", "show", "follow", "serve", "clear", "pour",
  "cook", "book", "welcome", "warm", "fold", "light", "rest", "clean", "make", "vacuum", "mop",
  "dust", "change", "refill", "send", "file", "count", "order", "attend", "pay", "confirm",
  "save", "transfer", "cancel", "note", "report", "spell", "help", "include", "provide", "try",
  "enhance", "arrange", "prepare", "wash", "set", "take", "print", "sign", "invite", "decorate",
  "remember", "meet", "write", "deliver", "collect", "inspect", "replace", "repair", "reset",
  "waive", "upgrade", "refund", "extend", "reissue", "escalate", "apologise", "apologize",
  "explain", "record", "update", "review", "reschedule", "restock", "brief", "handover",
  "verify", "process", "issue", "settle", "charge", "quote", "negotiate", "match", "approve",
  "seat", "enter", "present", "open", "strip", "introduce", "repeat", "wipe", "get", "start",
  "place", "track", "close", "walk", "say", "hand", "call", "ask", "tell", "bring", "give",
  "keep", "hold", "move", "turn", "put", "let", "run", "lead", "guide", "seek", "log",
  "acknowledge", "apologise", "compensate", "reassure", "confirm", "double-check", "notify",
  "inform", "remind", "assist", "accompany", "present", "recommend", "suggest", "propose",
  "receive", "service", "heat", "speed", "chill", "reserve", "reply", "empty", "speak",
  "return", "email", "reprogram", "top", "lay", "release", "re-clean", "resend", "rebook",
  "swap", "waive", "deduct", "credit", "comp", "expedite", "prioritise", "prioritize",
  "cool", "reheat", "refresh", "replenish", "escort", "page", "dispatch", "allocate",
  "settle", "post", "void", "split", "itemise", "itemize", "stamp", "scan", "copy",
  "add", "apply", "attach", "correct", "freeze", "reduce", "revise", "widen", "lower",
  "remove", "round", "wrap", "block", "store", "double", "grant", "reprint", "restore",
  "air", "cover", "deep", "re-press", "rewash", "use", "pass", "arrange", "adjust",
  "upgrade", "comp", "honour", "honor", "rebate", "reallocate", "reconfirm", "redo",
  "absorb", "guarantee", "share", "drop", "assign", "host", "discount", "fill",
  "fix", "sort", "look", "find", "make", "do", "handle", "solve", "chase",
  "finish", "complete", "welcome", "remember", "arrange", "upgrade", "restock", "replace",
  "agree", "please", "manage", "receive", "organise", "organize", "list", "relax",
  "end", "summarise", "summarize", "recap", "wrap-up", "jot", "type",
  // base form == past form; seeing one proves nothing about tense
  "read", "cost", "cut", "hit", "shut", "spread", "hurt", "bet", "quit",
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
  "rest room": "NOUN", "massage": "VERB", "register": "VERB", "line": "NOUN",
  "surprise": "NOUN", "quotation": "NOUN", "caller": "NOUN", "message": "NOUN",
  "request": "NOUN", "company": "NOUN", "delivery": "NOUN", "contact": "NOUN",
  "ring": "NOUN", "operator": "NOUN", "repeat": "NOUN", "dial": "VERB",
  "transfer": "NOUN", "party size": "NOUN", "window seat": "NOUN",
  // adjectives the list did not carry
  "clean": "ADJ", "stained": "ADJ", "forgotten": "ADJ", "overdue": "ADJ",
  "lost": "ADJ", "leaking": "ADJ", "misspelled": "ADJ", "incorrect": "ADJ",
  "wrong": "ADJ", "overcooked": "ADJ", "blocked": "ADJ", "not ready": "ADJ",
  "unavailable": "ADJ", "delayed": "ADJ", "undercooked": "ADJ", "smelly": "ADJ",
  "disappointed": "ADJ", "offline": "ADJ", "faulty": "ADJ", "unhappy": "ADJ",
  "not working": "ADJ", "unheated": "ADJ", "melted": "ADJ", "frozen": "ADJ",
  "stuck": "ADJ", "cracked": "ADJ", "burnt out": "ADJ", "double-booked": "ADJ",
  "rainy": "ADJ", "overcharged": "ADJ", "locked": "ADJ", "sold out": "ADJ",
  "cancelled": "ADJ", "unanswered": "ADJ", "too hot": "ADJ", "too cold": "ADJ",
  "uncomfortable": "ADJ", "cloudy": "ADJ", "noisy": "ADJ", "damaged": "ADJ",
  "torn": "ADJ", "broken": "ADJ", "dirty": "ADJ", "sticky": "ADJ", "missing": "ADJ",
  "slow": "ADJ", "mistimed": "ADJ", "deleted": "ADJ", "out of order": "ADJ",
  "called": "ADJ", "prepared": "ADJ", "found": "ADJ", "delivered": "ADJ", "paid": "ADJ",
  "spotless": "ADJ", "comfortable": "ADJ", "well handled": "ADJ", "filed properly": "ADJ",
  "no complaints": "NOUN", "thanked us": "VERB",
  // -able/-ible suffix false friends
  "table": "NOUN", "vegetable": "NOUN", "cable": "NOUN", "bible": "NOUN",
  // "well + participle" is a predicate adjective, not a verb phrase
  "well rested": "ADJ", "well handled": "ADJ", "well organised": "ADJ", "well prepared": "ADJ",
  "well managed": "ADJ", "well received": "ADJ", "well done": "ADJ",
  // intensifier + participle is a predicate adjective
  "very pleased": "ADJ", "very busy": "ADJ", "very good": "ADJ",
};
const ADJS = new Set([
  "smooth", "clean", "tidy", "wet", "dry", "dusty", "bright", "soft", "heavy", "uneven",
  "busy", "full", "quiet", "noisy", "safe", "empty", "late", "slippery", "greasy", "hot",
  "cold", "fresh", "sweet", "salty", "sour", "delicious", "sharp", "relaxing", "gentle",
  "strong", "stuffy", "calm", "tired", "deep", "elegant", "special", "beautiful", "formal",
  "upset", "important", "lovely", "dark", "detailed", "urgent", "finalised", "unpaid",
  "cheap", "expensive", "confidential", "fragile", "cloudy", "complicated", "optional",
  "unlimited", "included", "complimentary", "negotiable", "mandatory", "compulsory",
  "available", "ready", "free", "open", "closed", "correct", "damaged", "torn", "broken",
  "efficient", "excellent", "thorough", "unhurried", "warm", "complete", "positive",
  "polite", "friendly", "professional", "accurate", "punctual", "attentive",
]);

// Word-boundary matters: without it "over" would swallow "Overbooking".
const ADVERBIAL_HEAD = /^(on|at|in|by|with|without|under|over|for|from|during|after|before|ahead)\b/i;

/** Irregular past forms the -ed rule cannot derive. */
const IRREGULAR_PAST = new Set([
  "wrote", "told", "sent", "took", "left", "made", "said", "gave", "kept", "held",
  "put", "ran", "led", "found", "did", "went", "came", "brought", "thought", "read",
  "spoke", "met", "paid", "sold", "built", "began", "chose", "dealt", "felt", "got",
  "heard", "lost", "meant", "rang", "saw", "set", "showed", "spent", "stood", "understood",
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
const UNCOUNTABLE_S = new Set(["news", "series", "species", "campus", "bonus", "status", "focus", "analysis", "basis"]);

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
    const governs = /^(the|a|an|your|our|my|his|her|their|it|them|up|down|out|in|back|again|to|off|over)$/.test(parts[1]);
    if (governs) return new Set<Pos>(["VERB"]);
    // A past verb followed by a comparative or time adverb is still verbal:
    // "took longer", "felt better", "started later".
    if (/^(longer|better|worse|later|earlier|faster|sooner|well|badly|quickly|slowly)$/.test(parts[1]))
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
    const governsObject = parts.length > 1 && /^(the|a|an|your|our|my|his|her|their|it|up|down|out|in|back|again)$/.test(parts[1]);
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
    phone: { "0-1": "NOUN", "2-2": "ADVERBIAL", "3-3": "VERB", "4-4": "NOUN", "5-6": "VERB", "7-7": "VERB" },
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
    reports: { "0-0": "VERB", "1-1": "VERB", "2-2": "ADJ", "3-3": "VERB", "4-4": "NOUN", "5-5": "NOUN", "6-6": "VERB", "7-7": "VERB", "8-8": "ADJ", "9-9": "VERB" },
    // W22 · "The service was {0} today." · "Everything finished {1}."
    //       "We follow the hotel {2}." · "We can always {3}." · "The {4} was positive."
    //       "That was {5} by the team." · "The {6} starts at two." · "Let me {7} the day."
    //       "{8} was noted today." · "{9} at the end of the day."
    wrapUp: { "0-0": "ADJ", "1-1": "ADVERBIAL", "2-2": "NOUN", "3-3": "VERB", "4-4": "NOUN", "5-5": "ADJ", "6-6": "NOUN", "7-7": "VERB", "8-9": "NOUN" },
  },
  P3: {
    upgrades: "NOUN",
    policies: "NOUN",
    commitments: "VERB",
    partners: "NOUN",
    complaints: "NOUN",
    solutions: "VERB",
    handover: "NOUN",
  },
  P4: {
    story: "NOUN",
    preferences: "NOUN",
    disputes: "NOUN",
    occasions: "NOUN",
    tradeoffs: "VERB",
    emergencies: "NOUN",
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
        shared = shared === null ? new Set(s.pos) : new Set([...shared].filter((p) => s.pos.has(p)));
      }
      if (shared && shared.size === 0) {
        const detail = seen.map((s) => `${s.dep}:${posLabel(s.pos)} "${s.word}"`).join(", ");
        errors.push(`[A slot-consistency] ${phase}.${slot}[${i}] no part of speech fits every department — ${detail}`);
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
  /^(breakfast|lunch|dinner|service|help|information|advice|luggage|baggage|water|coffee|tea|bread|ice|music|cash|change|parking|access|housekeeping|storage|delivery|polish|oil|equipment|staff|news|feedback|training|transport|laundry|maintenance|security|chicken|beef|rice|noodles|fish|pork|soup|salad|juice|wine|beer|late check-out|early check-in|room service|turndown|valet|wifi|breakfast service)\b/i;

const SENTENCE_RULES: { name: string; test: (s: string) => boolean; why: string }[] = [
  {
    // Split on sentence boundaries first: "…fixed it. It took…" is fine.
    name: "repeated-token",
    test: (s) => s.split(/[.!?\n]+/).some((part) => /\b(\w+)\s+\1\b/i.test(part.replace(/,/g, ""))),
    why: "a word repeats immediately — usually a slot substituted next to the same literal word",
  },
  {
    name: "repeated-bigram",
    test: (s) => s.split(/[.!?]+/).some((part) => /\b(\w+\s+\w+)\s+\1\b/i.test(part.replace(/,/g, ""))),
    why: "a two-word phrase repeats immediately",
  },
  {
    name: "stacked-determiner",
    test: (s) => /\b(the|a|an)\s+(the|a|an|today's|tonight's|tomorrow's|my|your|our)\b/i.test(s),
    why: "two determiners in a row",
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
        const soundsVowel = (startsVowelLetter && !CONSONANT_SOUND.test(next)) || VOWEL_SOUND.test(next);
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
      /\bthe (tonight|today|tomorrow|this (evening|morning|afternoon)|next (week|month|day)|(one|two|five|ten|twenty|thirty|sixty|\d+) (minutes?|hours?|days?)) (is|was)\b/i.test(s) ||
      /\bhave a good (next|last|this) /i.test(s),
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
      for (const m of s.matchAll(/\b(can|could|will|would|shall|may|must|let me|please)\s+(?:always\s+|never\s+)?([a-z]+)\b/gi)) {
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
        if (["polite", "targetResponse", "context", "text", "guestPrompt", "modelReply", "modelAnswer"].includes(k))
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

// ============================================================
// Run
// ============================================================
lintBanks("P1", P1_BANKS as unknown as BankSet);
lintBanks("P2", P2_BANKS as unknown as BankSet);
lintBanks("P3", P3_BANKS as unknown as BankSet);
lintBanks("P4", P4_BANKS as unknown as BankSet);

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
  [...byLayer.entries()].sort((a, b) => b[1] - a[1]).forEach(([t, n]) => console.log(`  ${t}: ${n}`));
  console.log("");
  errors.slice(0, 400).forEach((e) => console.log(`  x ${e}`));
  if (errors.length > 400) console.log(`  … and ${errors.length - 60} more`);
  process.exit(1);
}

console.log("\nOK — no structural violations in generated content.");
