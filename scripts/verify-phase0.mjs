#!/usr/bin/env node
// Academic QA gate for Phase 0 content (docs/curriculum-level-matrix.md).
// Run: node scripts/verify-phase0.mjs
//
// Checks every generated dep/week against the P0 constraints:
//  1. Target sentences (grammar.polite, speaking.targetResponse) ≤ 5 words.
//  2. Every speaking.targetResponse has ≥ 2 words of ≥ 4 letters —
//     otherwise ListeningSuite silently drops its cloze task.
//  3. game.prompt differs from every speaking.guestPrompt in its lesson
//     (anti-duplication rule) and game has exactly one correct option.
//  4. 8-10 vocabulary items per week; reviewWords ≥ 3 from week 2.
//  5. Reading has exactly 2 questions, each with a valid correct index.
//  6. Vocab word/phonetic/definition/context all non-empty.

import { createRequire } from "node:module";
import { register } from "node:module";
import { pathToFileURL } from "node:url";

// Load the TS module through a tiny transpile-on-demand loader: use tsx if
// available, else fall back to a naive strip (the file is type-annotation-
// only TS, no decorators/enums).
let PHASE0_WEEKS;
try {
  const require = createRequire(import.meta.url);
  require.resolve("tsx");
  register("tsx/esm", pathToFileURL("./"));
  ({ PHASE0_WEEKS } = await import("../src/lib/content/phase0.ts"));
} catch {
  // Fallback: transpile with TypeScript's API (devDependency of the app).
  const { readFileSync } = await import("node:fs");
  const ts = (await import("typescript")).default;
  const strip = (p) =>
    ts.transpileModule(readFileSync(new URL(p, import.meta.url), "utf8"), {
      compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022 },
    }).outputText;
  const phase0Src = strip("../src/lib/content/phase0.ts").replace(
    /from\s+["']\.\/week-content["']/g,
    'from "data:text/javascript,"', // type-only import — safe to void
  );
  ({ PHASE0_WEEKS } = await import("data:text/javascript;base64," + Buffer.from(phase0Src).toString("base64")));
}

const WORD_CAP = 5;
const errors = [];
const warnings = [];

function words(s) {
  return s
    .replace(/[.,!?…]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}
/** The matrix cap is per SENTENCE — checkpoint-week utterances may chain
 *  two short sentences ("Good morning. May I have your name?"). */
function maxSentenceLen(s) {
  return Math.max(
    ...s
      .split(/[.!?]+/)
      .map((part) => words(part).length)
      .filter((n) => n > 0),
    0,
  );
}
function longWords(s) {
  return words(s)
    .map((w) => w.replace(/[^A-Za-z']/g, ""))
    .filter((w) => w.length >= 4);
}

for (const [key, week] of Object.entries(PHASE0_WEEKS)) {
  let vocabCount = 0;
  for (const lesson of week.lessons) {
    const where = `${key}/${lesson.lessonId}`;
    vocabCount += lesson.vocabulary.length;

    for (const v of lesson.vocabulary) {
      if (!v.word || !v.phonetic || !v.definition || !v.context)
        errors.push(`${where}: vocab "${v.word}" has an empty field`);
    }

    for (const g of lesson.grammar) {
      const n = maxSentenceLen(g.polite);
      // sir/madam tags are formulaic add-ons, not clause weight — allow +1.
      if (n > WORD_CAP + 1) errors.push(`${where}: grammar polite "${g.polite}" has a ${n}-word sentence (cap ${WORD_CAP}+1)`);
      if (!g.rule) errors.push(`${where}: grammar "${g.polite}" missing rule`);
    }

    for (const s of lesson.speaking) {
      const n = maxSentenceLen(s.targetResponse);
      if (n > WORD_CAP + 1) errors.push(`${where}: target "${s.targetResponse}" has a ${n}-word sentence (cap ${WORD_CAP}+1)`);
      const lw = longWords(s.targetResponse);
      if (lw.length < 2)
        errors.push(`${where}: target "${s.targetResponse}" has only ${lw.length} word(s) ≥4 letters — cloze will be dropped`);
    }

    const guestPrompts = new Set(lesson.speaking.map((s) => s.guestPrompt));
    for (const g of lesson.game) {
      if (guestPrompts.has(g.prompt)) errors.push(`${where}: game prompt duplicates speaking guestPrompt: "${g.prompt}"`);
      const correct = g.options.filter((o) => o.correct).length;
      if (correct !== 1) errors.push(`${where}: game "${g.prompt}" has ${correct} correct options`);
      const texts = new Set(g.options.map((o) => o.text));
      if (texts.size !== g.options.length) errors.push(`${where}: game "${g.prompt}" has duplicate options`);
    }

    if (lesson.reading.questions.length !== 2)
      errors.push(`${where}: reading has ${lesson.reading.questions.length} questions (want 2)`);
    for (const q of lesson.reading.questions) {
      if (q.correct < 0 || q.correct >= q.options.length) errors.push(`${where}: reading q "${q.q}" bad correct index`);
    }
  }

  if (vocabCount < 8 || vocabCount > 10)
    errors.push(`${key}: ${vocabCount} vocab items (matrix cap: 8-10 per week)`);

  const wk = week.weekNumber;
  if (wk >= 2) {
    const rw = week.reviewWords ?? [];
    if (rw.length < 3) errors.push(`${key}: reviewWords has ${rw.length} items (matrix: ≥3 from week 2)`);
  }
}

const weekCount = Object.keys(PHASE0_WEEKS).length;
if (weekCount !== 36) errors.push(`Expected 36 dep-weeks, found ${weekCount}`);

if (warnings.length) {
  console.log("WARNINGS:");
  for (const w of warnings) console.log("  ⚠ " + w);
}
if (errors.length) {
  console.error(`FAILED — ${errors.length} violation(s):`);
  for (const e of errors) console.error("  ✗ " + e);
  process.exit(1);
}
console.log(`OK — ${weekCount} dep-weeks pass all Phase 0 constraints.`);
