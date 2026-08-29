#!/usr/bin/env bun
// Academic QA gate for all authored week content.
// Run: bun run verify:content
//
// Two kinds of check live here:
//
//  A. ENGINE constraints — things that silently break a suite if violated.
//     The worst offender: ListeningSuite drops a cloze task without any
//     error if a targetResponse lacks two words of four-plus letters, so
//     a whole week can lose its listening drills unnoticed.
//
//  B. CURRICULUM constraints — the per-phase caps in
//     docs/curriculum-level-matrix.md, plus the three duplication and
//     recycling gates that keep departments from converging into the
//     same course and keep vocabulary actually coming back.

import { ALL_WEEKS } from "../src/lib/content/week-content";
import { DEPARTMENTS } from "../src/lib/departments";
import { CHECKPOINT_ORAL_ITEMS, CHECKPOINT_PASS_PCT } from "../src/lib/phases";

type Phase = {
  name: string;
  from: number;
  to: number;
  /** Max words in one sentence of a target/polite line (+1 for a sir/madam tag). */
  wordCap: number;
  vocabMin: number;
  vocabMax: number;
  /** reviewWords must be at least this fraction of the week's new vocabulary. */
  reviewPct: number;
  /** Minimum share of headwords that must be unique to one department. */
  deptSpecificMin: number;
};

const PHASES: Phase[] = [
  // Pre-A1 deliberately shares almost everything: digits, clock times and
  // the alphabet are identical work for every team, so no differentiation
  // floor applies.
  {
    name: "P0 pre-A1",
    from: 1,
    to: 6,
    wordCap: 5,
    vocabMin: 8,
    vocabMax: 10,
    reviewPct: 0,
    deptSpecificMin: 0,
  },
  // A1 switches to shared frames + department word banks (70/30).
  {
    name: "P1 A1",
    from: 7,
    to: 14,
    wordCap: 8,
    vocabMin: 10,
    vocabMax: 12,
    reviewPct: 0.3,
    deptSpecificMin: 0.6,
  },
  // A2.1 — only the language function stays shared; topics separate.
  // The floor sits below the ~77% the spine actually delivers because
  // week 22 is a checkpoint and leans harder on shared evaluative words.
  {
    name: "P2 A2.1",
    from: 15,
    to: 22,
    wordCap: 12,
    vocabMin: 12,
    vocabMax: 16,
    reviewPct: 0.3,
    deptSpecificMin: 0.65,
  },
  // A2+ — the department now acts on its own initiative. Sentence cap
  // rises to 16 words so a two-clause conditional offer fits, and the
  // recycling quota rises to 35%.
  {
    name: "P3 A2+",
    from: 23,
    to: 30,
    wordCap: 16,
    vocabMin: 14,
    vocabMax: 16,
    reviewPct: 0.35,
    deptSpecificMin: 0.65,
  },
  // The top of the ladder. Three clauses are allowed, so the cap rises to
  // 22 words; recycling peaks at 40%. The MATERIAL here reaches B1.1; the
  // band the course can certify is A2+ — see the note in src/lib/phases.ts.
  {
    name: "P4 A2+ (B1.1 material)",
    from: 31,
    to: 40,
    wordCap: 22,
    vocabMin: 14,
    vocabMax: 18,
    reviewPct: 0.4,
    deptSpecificMin: 0.65,
  },
];

/** Weeks 15+ are the hand-authored A2-B1 payloads; they predate the matrix
 *  and are checked for engine safety only, not for the phase caps. */
function phaseOf(week: number): Phase | null {
  return PHASES.find((p) => week >= p.from && week <= p.to) ?? null;
}

const errors: string[] = [];
const warnings: string[] = [];
/** Known pre-matrix debt in the hand-authored A2-B1 weeks (see content audit). */
const legacyGameDupes: string[] = [];

const words = (s: string) =>
  s
    .replace(/[.,!?…]/g, " ")
    .split(/\s+/)
    .filter(Boolean);

/** The cap is per sentence — a checkpoint utterance may chain two short ones. */
const maxSentenceLen = (s: string) =>
  Math.max(0, ...s.split(/[.!?]+/).map((part) => words(part).length));

const longWords = (s: string) =>
  words(s)
    .map((w) => w.replace(/[^A-Za-z']/g, ""))
    .filter((w) => w.length >= 4);

// ============================================================
// Regression gate — NARROW BY DESIGN.
//
// This list only pins defects that are about WORD CHOICE rather than
// structure: brand terminology the LQA pass retired, and a handful of
// frame×bank collisions kept as canaries.
//
// It is deliberately NOT the main defence any more. A blocklist of exact
// strings cannot catch a synonym, a sibling slot or a reworded frame —
// it reported "all authored content passes" while ~129 broken sentences
// shipped. Structural checking now lives in scripts/lint-content.ts,
// which runs from the same `verify:content` script and checks invariants
// (slot part-of-speech contracts, cross-department slot agreement, and
// English structure over every generated sentence).
// ============================================================
const KNOWN_BAD_STRINGS = [
  // P1 W10 states slotted into scenery frames they can't describe
  "too surprised for me",
  "too unpaid",
  "the room is too painful",
  "it is very finalised",
  "the floor is heavy",
  "the floor is sharp",
  "the floor is fragile",
  "the floor is crowded",
  // P1 W8 escort destinations no staff member would show a visitor
  "let me show you the server room",
  "let me show you the wardrobe",
  "the trolley is over there",
  "the staff entrance is over there",
  // P3 W23 comparison frames that broke for abstract B2B upgrades
  "is our quietest choice",
  "allotment is larger than the standard one",
  "allotment suits a family very well",
  // P4 W36 crisis frames that assumed a physical, floor-bound emergency
  "system outage on the third floor",
  "outage comes first",
  "booking comes first",
  "failure comes first",
  // P0 academic-review round: frames whose slot held the wrong semantic
  // class. Each string below was the sentence marked CORRECT for the
  // learner. They are matched as SUBSTRINGS, so each has to carry enough
  // context to be unable to appear inside its own fixed version — "he is
  // our waitress" would fire on the correct "She is our waitress."
  "it would environment nicely",
  "it would relaxing option nicely",
  "i would suggest the guest decision",
  "i would suggest the option, because",
  "ten percent duration is added",
  "ten percent membership number is added",
  "ten percent thirty days is added",
  "the system is confirmed",
  "the system is with the team",
  "i signed the supervisor",
  "the guest received at noon",
  "the guest arranged at noon",
  "it checked the figures than usual",
  "it wrote a note than usual",
  "let me send up for you",
  "the pipe is overcooked",
  "the machine is unhappy",
  "colleague. he is our waitress",
  "i am ready for the stay summary",
  "i am ready for the final invoice total",
  "the departure transfer taught me the most",
  "the kitchen capacity taught me the most",
  "there is a cash shortage at the property",
  "the flight cancellation has been fully resolved",
  "report on the guest fainting",
  // The week-32/39 preamble "Based on your {preference}" is the correct
  // teaching frame; what broke was the advice bolted onto it, which
  // assumed every department's slot 0 was about noise.
  "i would suggest a quieter option",
  "i would suggest something quieter",
  "he check ins the room",
  "he make the beds the room",
  "he massages the room every day",
  "this one is more empty",
  "this one is more bright",
  "it is a little safe",
  "it is a little calm",
  // Register / terminology the LQA pass retired
  "please kindly provide",
  "masseuse",
];

function collectStrings(obj: unknown, out: string[]): void {
  if (typeof obj === "string") out.push(obj);
  else if (Array.isArray(obj)) obj.forEach((v) => collectStrings(v, out));
  else if (obj && typeof obj === "object")
    Object.values(obj).forEach((v) => collectStrings(v, out));
}

// ============================================================
// Per-week checks
// ============================================================
for (const [key, week] of Object.entries(ALL_WEEKS)) {
  const phase = phaseOf(week.weekNumber);
  let vocabCount = 0;

  for (const lesson of week.lessons) {
    const where = `${key}/${lesson.lessonId}`;
    vocabCount += lesson.vocabulary.length;

    for (const item of lesson.vocabulary) {
      if (!item.word || !item.phonetic || !item.definition || !item.context)
        errors.push(`${where}: vocab "${item.word}" has an empty field`);
    }

    for (const gr of lesson.grammar) {
      if (!gr.rule) errors.push(`${where}: grammar "${gr.polite}" missing rule`);
      if (phase) {
        const n = maxSentenceLen(gr.polite);
        if (n > phase.wordCap + 1)
          errors.push(
            `${where}: grammar "${gr.polite}" has a ${n}-word sentence (${phase.name} cap ${phase.wordCap}+1)`,
          );
      }
    }

    for (const s of lesson.speaking) {
      if (phase) {
        const n = maxSentenceLen(s.targetResponse);
        if (n > phase.wordCap + 1)
          errors.push(
            `${where}: target "${s.targetResponse}" has a ${n}-word sentence (${phase.name} cap ${phase.wordCap}+1)`,
          );
      }
      // The cap covered only grammar.polite and speaking.targetResponse. A
      // game's correct option is just as much a sentence the learner is
      // rewarded for producing, and a 24-word answer sat in FO-35 for a week
      // because nothing looked at it. `arcade` is deliberately NOT checked: no
      // suite reads that field, so capping it would gate text no learner sees.
      for (const g of lesson.game) {
        const right = g.options.find((o) => o.correct);
        if (!right) continue;
        const n = maxSentenceLen(right.text);
        if (n > phase.wordCap + 1)
          errors.push(
            `${where}: game answer "${right.text}" has a ${n}-word sentence (${phase.name} cap ${phase.wordCap}+1)`,
          );
      }
      // ENGINE: fewer than two 4+ letter words and ListeningSuite drops the cloze.
      const lw = longWords(s.targetResponse);
      if (lw.length < 2)
        errors.push(
          `${where}: target "${s.targetResponse}" has ${lw.length} word(s) >=4 letters — cloze silently dropped`,
        );
    }

    const guestPrompts = new Set(lesson.speaking.map((s) => s.guestPrompt));
    for (const gm of lesson.game) {
      if (guestPrompts.has(gm.prompt)) {
        // Weeks 15+ are the hand-authored A2-B1 payloads written before the
        // matrix; the content audit already logged that their game rounds
        // copy the speaking item verbatim. Report as known debt rather than
        // blocking new work on it.
        const msg = `${where}: game prompt duplicates speaking guestPrompt`;
        if (phase) errors.push(`${msg}: "${gm.prompt}"`);
        else legacyGameDupes.push(msg);
      }
      const correct = gm.options.filter((o) => o.correct).length;
      if (correct !== 1)
        errors.push(`${where}: game "${gm.prompt}" has ${correct} correct options`);
      if (new Set(gm.options.map((o) => o.text)).size !== gm.options.length)
        errors.push(`${where}: game "${gm.prompt}" has duplicate options`);
    }

    // Two questions is the norm. A long passage may carry up to four: a
    // 700-word safety reading measured by two items is not measured at all,
    // and the cap was the reason such readings had nowhere to put content.
    const qWant = lesson.reading.text.split(/\s+/).length > 400 ? "2-4" : "2";
    const qOk =
      qWant === "2"
        ? lesson.reading.questions.length === 2
        : lesson.reading.questions.length >= 2 && lesson.reading.questions.length <= 4;
    if (!qOk)
      errors.push(
        `${where}: reading has ${lesson.reading.questions.length} questions (want ${qWant})`,
      );
    for (const q of lesson.reading.questions) {
      if (q.correct < 0 || q.correct >= q.options.length)
        errors.push(`${where}: reading q "${q.q}" has an out-of-range correct index`);
    }
  }

  if (phase) {
    if (vocabCount < phase.vocabMin || vocabCount > phase.vocabMax)
      errors.push(
        `${key}: ${vocabCount} vocab items (${phase.name} allows ${phase.vocabMin}-${phase.vocabMax})`,
      );

    const need = Math.ceil(vocabCount * phase.reviewPct);
    const got = week.reviewWords?.length ?? 0;
    if (got < need)
      errors.push(
        `${key}: reviewWords has ${got}, needs >=${need} (${Math.round(phase.reviewPct * 100)}% of ${vocabCount})`,
      );
  }
}

// ============================================================
// GATE 0 — regression scan for known-bad generated strings
// ============================================================
for (const [key, week] of Object.entries(ALL_WEEKS)) {
  const texts: string[] = [];
  collectStrings(week, texts);
  const haystack = texts.join("\n").toLowerCase();
  for (const bad of KNOWN_BAD_STRINGS) {
    if (haystack.includes(bad)) errors.push(`${key}: known-bad string regressed: "${bad}"`);
  }
}

// ============================================================
// GATE 1 — cross-department differentiation
// Phase 1 was specified at 70/30 department-specific. Measure the real
// ratio per week and fail if a week converges below the floor.
// ============================================================
const DEPS = DEPARTMENTS.map((d) => d.code);

function headwords(dep: string, week: number): string[] {
  const wk = ALL_WEEKS[`${dep}-${week}`];
  return wk ? wk.lessons.flatMap((l) => l.vocabulary.map((v) => v.word)) : [];
}

const ratioReport: string[] = [];
for (const phase of PHASES) {
  for (let w = phase.from; w <= phase.to; w++) {
    const perDep = new Map<string, string[]>();
    for (const d of DEPS) {
      const hw = headwords(d, w);
      if (hw.length) perDep.set(d, hw);
    }
    if (perDep.size < 2) continue;

    // A headword is "shared" when more than one department teaches it this week.
    const seen = new Map<string, number>();
    for (const hw of perDep.values())
      for (const h of new Set(hw)) seen.set(h, (seen.get(h) ?? 0) + 1);

    let specific = 0;
    let total = 0;
    for (const hw of perDep.values()) {
      for (const h of hw) {
        total++;
        if ((seen.get(h) ?? 0) === 1) specific++;
      }
    }
    const pct = total ? specific / total : 0;
    ratioReport.push(
      `  week ${String(w).padStart(2)} — ${Math.round(pct * 100)}% department-specific`,
    );
    if (pct < phase.deptSpecificMin)
      errors.push(
        `week ${w}: only ${Math.round(pct * 100)}% of headwords are department-specific (${phase.name} floor ${Math.round(phase.deptSpecificMin * 100)}%)`,
      );
  }
}

// ============================================================
// GATE 1b — a department must never teach the same headword twice
// inside the matrix-governed phases. A vocabulary slot spent on a word
// the learner already has is a slot not spent on new language, and the
// review scheduler keys on the headword, so the second card also
// silently overwrites the first one's schedule.
// ============================================================
// The four hand-authored weeks that sit inside the Phase 2 range. When a
// duplicate involves one of them it is normally legitimate spiral work —
// a survival word from pre-A1 ("Welcome", "Passport") returning in its
// professional sense — so it is reported rather than blocked.
const HAND_AUTHORED = new Set(["FB-15", "HK-15", "FO-17", "SW-19"]);
const spiralIntoLegacy: string[] = [];
// Headwords minted twice inside weeks 23-40, inherited from the generated
// Phase 3-4 spine. Ratcheted, not blocked: the count may fall, never rise.
const latePhaseDuplicates: string[] = [];
const DUP_BASELINE = new URL("./_late-dup-baseline.json", import.meta.url);

for (const dep of DEPS) {
  const firstSeen = new Map<string, number>();
  // Spans the whole course, not weeks 1-22. It stopped at 22 while Phase 3
  // and 4 were still generated; now that they are hand-authored, a headword
  // minted twice there is exactly the collision this gate exists to catch —
  // the review scheduler keys on the word, so the second card silently
  // overwrites the first one's schedule.
  for (let w = 1; w <= 40; w++) {
    for (const h of headwords(dep, w)) {
      const key = h.toLowerCase();
      const earlier = firstSeen.get(key);
      if (earlier === undefined) {
        firstSeen.set(key, w);
      } else if (earlier !== w) {
        const msg = `${dep}: "${h}" is taught at week ${earlier} and again at week ${w}`;
        // Weeks 39-40 are the course's own revision weeks: the matrix asks
        // them to reuse material, so a repeat there is reported, not blocked.
        const revision = w >= 39 || earlier >= 39;
        if (revision || HAND_AUTHORED.has(`${dep}-${w}`) || HAND_AUTHORED.has(`${dep}-${earlier}`))
          spiralIntoLegacy.push(msg);
        else if (w > 22 || earlier > 22)
          // Phase 3-4 debt inherited from the generated spine. Ratcheted below
          // rather than blocked, so new hand-authored weeks cannot add to it
          // while the existing count is worked down.
          latePhaseDuplicates.push(msg);
        else errors.push(msg);
      }
    }
  }
}

// ============================================================
// GATE 2 — vocabulary that reappears at A2-B1
// A word taught at pre-A1/A1 and taught AGAIN in that department's
// A2-B1 weeks is usually fine — spiral revisiting is good practice, and
// survival words like "Welcome" or "Passport" have to come early. What
// this surfaces is the redundancy so an author can decide whether the
// later card still teaches something new (a richer, professional sense)
// or is simply repeating itself.
// ============================================================
const spiralRepeats: string[] = [];
for (const dep of DEPS) {
  const laterWeeks = new Map<string, number>(); // word -> first A2-B1 week
  for (const [key, wk] of Object.entries(ALL_WEEKS)) {
    // Weeks 15-22 are already covered pairwise by gate 1b; this gate
    // reaches further, into the P3/P4 payloads it does not span.
    if (!key.startsWith(`${dep}-`) || wk.weekNumber < 23) continue;
    for (const l of wk.lessons)
      for (const item of l.vocabulary) {
        const lower = item.word.toLowerCase();
        if (!laterWeeks.has(lower)) laterWeeks.set(lower, wk.weekNumber);
      }
  }
  for (let w = 1; w <= 14; w++) {
    for (const h of headwords(dep, w)) {
      const later = laterWeeks.get(h.toLowerCase());
      if (later !== undefined)
        spiralRepeats.push(`${dep}: "${h}" taught at week ${w} and again at week ${later}`);
    }
  }
}

// ============================================================
// GATE 3 — recycling frequency
// A headword taught once and never revisited will not stick. Count how
// often each word is encountered: once when taught, plus every week it
// returns through reviewWords.
// ============================================================
const freqBuckets = new Map<number, number>();
let neverRecycled = 0;
const neverRecycledSample: string[] = [];

for (const dep of DEPS) {
  const encounters = new Map<string, number>();
  for (let w = 1; w <= 14; w++) {
    for (const h of headwords(dep, w))
      encounters.set(h.toLowerCase(), (encounters.get(h.toLowerCase()) ?? 0) + 1);
    const wk = ALL_WEEKS[`${dep}-${w}`];
    for (const r of wk?.reviewWords ?? [])
      encounters.set(r.toLowerCase(), (encounters.get(r.toLowerCase()) ?? 0) + 1);
  }
  for (const [word, n] of encounters) {
    freqBuckets.set(n, (freqBuckets.get(n) ?? 0) + 1);
    if (n === 1) {
      neverRecycled++;
      if (neverRecycledSample.length < 8) neverRecycledSample.push(`${dep}:${word}`);
    }
  }
}

const totalTracked = [...freqBuckets.values()].reduce((a, b) => a + b, 0);
const recycledPct = totalTracked ? 1 - neverRecycled / totalTracked : 0;
if (recycledPct < 0.5)
  warnings.push(
    `only ${Math.round(recycledPct * 100)}% of pre-A1/A1 headwords are ever recycled (target: most words return 5-7 times)`,
  );

// ============================================================
// Report
// ============================================================
console.log(
  `Checked ${Object.keys(ALL_WEEKS).length} dep-weeks across ${DEPS.length} departments.\n`,
);

console.log("Department differentiation:");
for (const line of ratioReport) console.log(line);

console.log("\nRecycling frequency (encounters per headword, weeks 1-14):");
for (const n of [...freqBuckets.keys()].sort((a, b) => a - b))
  console.log(`  ${String(n).padStart(2)}x — ${freqBuckets.get(n)} headwords`);
if (neverRecycled)
  console.log(`  never recycled: ${neverRecycled} (e.g. ${neverRecycledSample.join(", ")})`);

{
  const file = Bun.file(DUP_BASELINE);
  const known = await file.exists();
  const baseline: number = known
    ? (JSON.parse(await file.text()).lateDuplicates as number)
    : latePhaseDuplicates.length;
  const write = (n: number) =>
    Bun.write(
      DUP_BASELINE,
      JSON.stringify(
        {
          lateDuplicates: n,
          note: "Ratchet only — a headword may not be minted twice in weeks 23-40. This number may fall, never rise.",
        },
        null,
        2,
      ) + "\n",
    );
  if (!known) {
    await write(latePhaseDuplicates.length);
    console.log(
      `  Late-phase duplicate headwords: baseline recorded at ${latePhaseDuplicates.length}.`,
    );
  } else if (latePhaseDuplicates.length > baseline) {
    errors.push(
      `${latePhaseDuplicates.length} headwords are minted twice in weeks 23-40, up from ${baseline}. ` +
        `Newest: ${latePhaseDuplicates.slice(-3).join(" · ")}`,
    );
  } else if (latePhaseDuplicates.length < baseline) {
    await write(latePhaseDuplicates.length);
    console.log(
      `  Late-phase duplicate headwords: ${latePhaseDuplicates.length}, down from ${baseline} — baseline lowered.`,
    );
  } else {
    console.log(`  Late-phase duplicate headwords: ${latePhaseDuplicates.length} (ratchet holds).`);
  }
}

if (spiralIntoLegacy.length) {
  console.log(
    `\nSurvival words returning in the hand-authored weeks (${spiralIntoLegacy.length}) — spiral, allowed:`,
  );
  for (const s of spiralIntoLegacy) console.log("  ~ " + s);
}

if (spiralRepeats.length) {
  console.log(
    `\nVocabulary revisited at A2-B1 (${spiralRepeats.length}) — spiral repeats, review if intentional:`,
  );
  for (const s of spiralRepeats) console.log("  ~ " + s);
}

if (legacyGameDupes.length) {
  console.log(
    `\nKnown legacy debt: ${legacyGameDupes.length} game rounds in the hand-authored A2-B1 weeks` +
      ` copy their lesson's speaking prompt verbatim (pre-matrix content; logged by the content audit).`,
  );
}

// ============================================================
// GATE 4 — every checkpoint must be able to build its ORAL half
//
// The checkpoint's spoken section draws CHECKPOINT_ORAL_ITEMS sentences from
// across its phase. If a phase ever ran short for a department, the suite
// would fall back to written-only rather than lock the learner out — correct
// behaviour, but silent: the course would quietly stop assessing speaking
// for that department. This makes the pool a checked invariant instead.
// ============================================================
{
  let checked = 0;
  for (const phase of PHASES) {
    for (const d of DEPARTMENTS) {
      const dep = d.code;
      let n = 0;
      let authored = 0;
      for (let w = phase.from; w <= phase.to; w++) {
        const week = ALL_WEEKS[`${dep}-${w}`];
        if (!week) continue;
        authored++;
        n += week.lessons.reduce((s, l) => s + l.speaking.length, 0);
      }
      // A department still being authored has half-built phases by definition,
      // and a half-built phase has a short pool for an innocent reason. Exempt
      // only the phases it has not finished; the moment its last week lands,
      // the pool must hold — no department ships on a written-only checkpoint.
      const phaseComplete = authored === phase.to - phase.from + 1;
      if (d.hidden === "in-progress" && !phaseComplete) continue;
      checked++;
      if (n < CHECKPOINT_ORAL_ITEMS)
        errors.push(
          `${dep} ${phase.name} (weeks ${phase.from}-${phase.to}) has only ${n} speaking items — the checkpoint needs ${CHECKPOINT_ORAL_ITEMS}`,
        );
    }
  }
  const wip = DEPARTMENTS.filter((d) => d.hidden === "in-progress").map((d) => d.code);
  console.log(
    `Checkpoint oral pools — ${checked} phase×department pools each hold ≥ ${CHECKPOINT_ORAL_ITEMS} speaking items` +
      (wip.length ? ` (unfinished phases of ${wip.join(", ")} not yet due)` : ""),
  );
}

// ============================================================
// GATE 5 — active vocabulary total per department
//
// The matrix carried "~560-620 từ" for months with nothing checking it, and
// the real figure was 502-508 everywhere. A target nobody measures is not a
// target; it is decoration that drifts.
//
// The number moved to >=510 because 560 was never argued for, and the floor
// below is what makes 510 mean something. The risk it guards is specific and
// live: the Phase 4 hand-authoring batches replace a generated week with a
// written one, and a written week that teaches fewer headwords than the week
// it replaced takes the total DOWN. Thirty-eight of those are queued. Without
// this gate the course could quietly shrink while every other check stayed
// green.
//
// A department still being authored has no total to defend yet. A withdrawn
// one does — its forty weeks are finished, so it is checked like any other.
// ============================================================
{
  const FLOOR = 500;
  const TARGET = 510;
  const totals: string[] = [];
  for (const d of DEPARTMENTS) {
    if (d.hidden === "in-progress") continue;
    const words = new Set<string>();
    for (let w = 1; w <= 40; w++)
      for (const l of ALL_WEEKS[`${d.code}-${w}`]?.lessons ?? [])
        for (const v of l.vocabulary) words.add(v.word.toLowerCase());
    const n = words.size;
    totals.push(`${d.code} ${n}${n >= TARGET ? "" : ` (còn ${TARGET - n})`}`);
    if (n < FLOOR)
      errors.push(
        `${d.code} teaches ${n} active headwords — below the floor of ${FLOOR}. The matrix target is ${TARGET}.`,
      );
  }
  console.log(`Active vocabulary — ${totals.join(" · ")}  (sàn ${FLOOR}, mục tiêu ${TARGET})`);
}

// ============================================================
// GATE 6 — a reading question must be unanswerable without reading
//
// Two strategies let a learner score without knowing any English, and both
// were live until this gate was written:
//
//   POSITION. Every one of the 1,704 generated questions stored its answer
//   first, and ReadingSuite rendered options in stored order, so tapping
//   the first button scored 100%. Fixed in the suite rather than in 1,920
//   questions: options are permuted by a seed taken from the question text,
//   stable per question. This gate measures the permuted order, because
//   that is what a learner actually sees.
//
//   LENGTH. An answer that carries its own reasoning is longer than the
//   distractors, and the learner picks the long one. This is a CONTENT
//   problem — no shuffle fixes it. The threshold below is a floor, not a
//   target: the generated spine sits near 80% and is recorded as debt
//   rather than blocking every build, while any week authored from here is
//   held to something a real test could defend.
//
// The pass mark for a checkpoint is 70%. Any guessing strategy that beats
// that means the reading half of the checkpoint certifies nothing.
// ============================================================
{
  const seedOf = (s: string) => {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return h >>> 0;
  };
  /** Mirrors shuffleOptions() in src/components/suites/ReadingSuite.tsx. */
  const permute = (q: { q: string; options: string[]; correct: number }) => {
    const order = q.options.map((_, i) => i);
    let seed = seedOf(q.q);
    for (let i = order.length - 1; i > 0; i--) {
      seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
      const j = Math.floor((seed / 4294967296) * (i + 1));
      [order[i], order[j]] = [order[j], order[i]];
    }
    return { options: order.map((i) => q.options[i]), correct: order.indexOf(q.correct) };
  };

  const POSITION_MAX = 0.5;
  // 0.85 was a number with nothing behind it: a learner needs CHECKPOINT_PASS_PCT
  // to pass, so any share above that means "tap the longest bubble" is a winning
  // strategy for the whole course. The course sits at 0.77 today — inherited from
  // generated content, worst in weeks 5, 9, 17 and 24 where it is 100%. Until that
  // is fixed batch by batch, this is a ratchet: it may fall, never rise.
  const LENGTH_MAX = 0.771; // 1482/1923 today
  const pos = [0, 0, 0, 0];
  let longest = 0;
  let total = 0;
  for (const wk of Object.values(ALL_WEEKS))
    for (const lesson of wk.lessons)
      for (const q of lesson.reading.questions) {
        const shown = permute(q);
        total++;
        pos[shown.correct] = (pos[shown.correct] ?? 0) + 1;
        const lens = shown.options.map((o) => o.length);
        if (lens[shown.correct] === Math.max(...lens)) longest++;
      }

  const worstPos = Math.max(...pos) / total;
  const longShare = longest / total;
  console.log(
    `Reading answerability — always-same-position wins ${(worstPos * 100).toFixed(0)}%, ` +
      `always-longest wins ${(longShare * 100).toFixed(0)}% of ${total} questions ` +
      `(checkpoint pass mark is ${CHECKPOINT_PASS_PCT}%)`,
  );
  if (worstPos > POSITION_MAX)
    errors.push(
      `a learner who always picks the same option scores ${(worstPos * 100).toFixed(0)}% on reading — the answer key is not spread`,
    );
  if (longShare > LENGTH_MAX)
    errors.push(
      `a learner who always picks the longest option scores ${(longShare * 100).toFixed(0)}% on reading — balance the distractor lengths`,
    );
}
if (warnings.length) {
  console.log("\nWARNINGS:");
  for (const w of warnings) console.log("  ! " + w);
}

if (errors.length) {
  console.error(`\nFAILED — ${errors.length} violation(s):`);
  for (const e of errors) console.error("  x " + e);
  process.exit(1);
}
console.log("\nOK — all authored content passes engine and curriculum constraints.");
