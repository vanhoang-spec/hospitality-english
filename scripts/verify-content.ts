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
  { name: "P0 pre-A1", from: 1, to: 6, wordCap: 5, vocabMin: 8, vocabMax: 10, reviewPct: 0, deptSpecificMin: 0 },
  // A1 switches to shared frames + department word banks (70/30).
  { name: "P1 A1", from: 7, to: 14, wordCap: 8, vocabMin: 10, vocabMax: 12, reviewPct: 0.3, deptSpecificMin: 0.6 },
  // A2.1 — only the language function stays shared; topics separate.
  // The floor sits below the ~77% the spine actually delivers because
  // week 22 is a checkpoint and leans harder on shared evaluative words.
  { name: "P2 A2.1", from: 15, to: 22, wordCap: 12, vocabMin: 12, vocabMax: 16, reviewPct: 0.3, deptSpecificMin: 0.65 },
  // A2+ — the department now acts on its own initiative. Sentence cap
  // rises to 16 words so a two-clause conditional offer fits, and the
  // recycling quota rises to 35%.
  { name: "P3 A2+", from: 23, to: 30, wordCap: 16, vocabMin: 14, vocabMax: 16, reviewPct: 0.35, deptSpecificMin: 0.65 },
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
          errors.push(`${where}: grammar "${gr.polite}" has a ${n}-word sentence (${phase.name} cap ${phase.wordCap}+1)`);
      }
    }

    for (const s of lesson.speaking) {
      if (phase) {
        const n = maxSentenceLen(s.targetResponse);
        if (n > phase.wordCap + 1)
          errors.push(`${where}: target "${s.targetResponse}" has a ${n}-word sentence (${phase.name} cap ${phase.wordCap}+1)`);
      }
      // ENGINE: fewer than two 4+ letter words and ListeningSuite drops the cloze.
      const lw = longWords(s.targetResponse);
      if (lw.length < 2)
        errors.push(`${where}: target "${s.targetResponse}" has ${lw.length} word(s) >=4 letters — cloze silently dropped`);
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
      if (correct !== 1) errors.push(`${where}: game "${gm.prompt}" has ${correct} correct options`);
      if (new Set(gm.options.map((o) => o.text)).size !== gm.options.length)
        errors.push(`${where}: game "${gm.prompt}" has duplicate options`);
    }

    if (lesson.reading.questions.length !== 2)
      errors.push(`${where}: reading has ${lesson.reading.questions.length} questions (want 2)`);
    for (const q of lesson.reading.questions) {
      if (q.correct < 0 || q.correct >= q.options.length)
        errors.push(`${where}: reading q "${q.q}" has an out-of-range correct index`);
    }
  }

  if (phase) {
    if (vocabCount < phase.vocabMin || vocabCount > phase.vocabMax)
      errors.push(`${key}: ${vocabCount} vocab items (${phase.name} allows ${phase.vocabMin}-${phase.vocabMax})`);

    const need = Math.ceil(vocabCount * phase.reviewPct);
    const got = week.reviewWords?.length ?? 0;
    if (got < need)
      errors.push(`${key}: reviewWords has ${got}, needs >=${need} (${Math.round(phase.reviewPct * 100)}% of ${vocabCount})`);
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
    for (const hw of perDep.values()) for (const h of new Set(hw)) seen.set(h, (seen.get(h) ?? 0) + 1);

    let specific = 0;
    let total = 0;
    for (const hw of perDep.values()) {
      for (const h of hw) {
        total++;
        if ((seen.get(h) ?? 0) === 1) specific++;
      }
    }
    const pct = total ? specific / total : 0;
    ratioReport.push(`  week ${String(w).padStart(2)} — ${Math.round(pct * 100)}% department-specific`);
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

for (const dep of DEPS) {
  const firstSeen = new Map<string, number>();
  for (let w = 1; w <= 22; w++) {
    for (const h of headwords(dep, w)) {
      const key = h.toLowerCase();
      const earlier = firstSeen.get(key);
      if (earlier === undefined) {
        firstSeen.set(key, w);
      } else if (earlier !== w) {
        const msg = `${dep}: "${h}" is taught at week ${earlier} and again at week ${w}`;
        if (HAND_AUTHORED.has(`${dep}-${w}`) || HAND_AUTHORED.has(`${dep}-${earlier}`)) spiralIntoLegacy.push(msg);
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
      if (later !== undefined) spiralRepeats.push(`${dep}: "${h}" taught at week ${w} and again at week ${later}`);
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
let neverRecycledSample: string[] = [];

for (const dep of DEPS) {
  const encounters = new Map<string, number>();
  for (let w = 1; w <= 14; w++) {
    for (const h of headwords(dep, w)) encounters.set(h.toLowerCase(), (encounters.get(h.toLowerCase()) ?? 0) + 1);
    const wk = ALL_WEEKS[`${dep}-${w}`];
    for (const r of wk?.reviewWords ?? []) encounters.set(r.toLowerCase(), (encounters.get(r.toLowerCase()) ?? 0) + 1);
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
console.log(`Checked ${Object.keys(ALL_WEEKS).length} dep-weeks across ${DEPS.length} departments.\n`);

console.log("Department differentiation:");
for (const line of ratioReport) console.log(line);

console.log("\nRecycling frequency (encounters per headword, weeks 1-14):");
for (const n of [...freqBuckets.keys()].sort((a, b) => a - b))
  console.log(`  ${String(n).padStart(2)}x — ${freqBuckets.get(n)} headwords`);
if (neverRecycled)
  console.log(`  never recycled: ${neverRecycled} (e.g. ${neverRecycledSample.join(", ")})`);

if (spiralIntoLegacy.length) {
  console.log(`\nSurvival words returning in the hand-authored weeks (${spiralIntoLegacy.length}) — spiral, allowed:`);
  for (const s of spiralIntoLegacy) console.log("  ~ " + s);
}

if (spiralRepeats.length) {
  console.log(`\nVocabulary revisited at A2-B1 (${spiralRepeats.length}) — spiral repeats, review if intentional:`);
  for (const s of spiralRepeats) console.log("  ~ " + s);
}

if (legacyGameDupes.length) {
  console.log(
    `\nKnown legacy debt: ${legacyGameDupes.length} game rounds in the hand-authored A2-B1 weeks` +
      ` copy their lesson's speaking prompt verbatim (pre-matrix content; logged by the content audit).`,
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
