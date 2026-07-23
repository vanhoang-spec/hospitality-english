#!/usr/bin/env bun
// ============================================================
// Full product-QA sweep over the 22 authored weeks × 6 departments.
//
// This is deliberately NOT a re-run of verify-content.ts. That script
// guards the curriculum contract; this one attacks the content from the
// angles a learner or a downstream system would hit it:
//
//   T1  coverage & reachability      — is every week actually reachable
//   T2  field hygiene                — empty/placeholder/encoding damage
//   T3  CEFR ladder                  — does difficulty rise, never regress
//   T4  review-key integrity         — slug collisions, dead references
//   T5  suite simulations            — does each of the 6 suites produce
//                                      a runnable, winnable exercise
//   T6  answerability                — can a learner actually get it right
//   T7  UI data contracts            — timeline / hub / handbook inputs
//
// Exit code 1 on any FAIL. WARN lines are advisory.
// ============================================================

import { ALL_WEEKS, getWeekContent, resolveReviewVocab } from "../src/lib/content/week-content";
import { DEPARTMENTS } from "../src/lib/departments";
import { findWeek, TOTAL_WEEKS } from "../src/lib/curriculum";

const DEPS = DEPARTMENTS.map((d) => d.code);
const AUTHORED_MAX = 40;

const fails: string[] = [];
const warns: string[] = [];
const fail = (t: string, m: string) => fails.push(`[${t}] ${m}`);
const warn = (t: string, m: string) => warns.push(`[${t}] ${m}`);

const words = (s: string) => s.replace(/[.,!?…—–]/g, " ").split(/\s+/).filter(Boolean);
const maxSent = (s: string) => Math.max(0, ...s.split(/[.!?]+/).map((p) => words(p).length));

// Mirrors slugify() in src/lib/review.ts exactly.
const slugify = (t: string) =>
  t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 60);

// ============================================================
// T1 — Coverage & reachability
// ============================================================
{
  let n = 0;
  for (const dep of DEPS) {
    for (let w = 1; w <= AUTHORED_MAX; w++) {
      const viaRegistry = ALL_WEEKS[`${dep}-${w}`];
      const viaAccessor = getWeekContent(dep, w);
      const viaString = getWeekContent(dep.toLowerCase(), String(w));
      if (!viaRegistry) { fail("T1", `${dep}-${w} missing from registry`); continue; }
      if (!viaAccessor) fail("T1", `${dep}-${w} unreachable via getWeekContent(number)`);
      if (!viaString) fail("T1", `${dep}-${w} unreachable via lowercase dep / string week`);
      if (viaAccessor !== viaRegistry) fail("T1", `${dep}-${w} accessor returns a different object`);
      if (viaRegistry.departmentId !== dep) fail("T1", `${dep}-${w} departmentId is "${viaRegistry.departmentId}"`);
      if (viaRegistry.weekNumber !== w) fail("T1", `${dep}-${w} weekNumber is ${viaRegistry.weekNumber}`);
      if (viaRegistry.lessons.length !== 4) fail("T1", `${dep}-${w} has ${viaRegistry.lessons.length} lessons (want 4)`);
      viaRegistry.lessons.forEach((l, i) => {
        if (l.lessonOrder !== i + 1) fail("T1", `${dep}-${w} lesson ${i} has lessonOrder ${l.lessonOrder}`);
        if (l.lessonId !== `${dep}_${w}_${i + 1}`) fail("T1", `${dep}-${w} lessonId "${l.lessonId}" does not match slot`);
      });
      n++;
    }
    // Weeks past the authored range must be honestly absent.
    for (let w = AUTHORED_MAX + 1; w <= TOTAL_WEEKS; w++) {
      const wk = ALL_WEEKS[`${dep}-${w}`];
      if (wk && wk.lessons.some((l) => l.vocabulary.length === 0))
        fail("T1", `${dep}-${w} exists but has empty lessons`);
    }
  }
  console.log(`T1 coverage — ${n}/${DEPS.length * AUTHORED_MAX} authored dep-weeks reachable`);
}

// ============================================================
// T2 — Field hygiene: empty, placeholder, encoding damage
// ============================================================
{
  const placeholder = /\b(TODO|TBD|FIXME|XXX|lorem|placeholder|undefined|null|NaN)\b/i;
  const mojibake = /Ã|â€|Ð|Ñ‚|�/;
  let checked = 0;

  for (const [key, wk] of Object.entries(ALL_WEEKS)) {
    if (wk.weekNumber > AUTHORED_MAX) continue;
    const texts: [string, string][] = [
      ["weekTitleEn", wk.weekTitleEn],
      ["weekTitleVi", wk.weekTitleVi],
    ];
    for (const l of wk.lessons) {
      texts.push([`${l.lessonId}.titleEn`, l.titleEn], [`${l.lessonId}.titleVi`, l.titleVi]);
      for (const v of l.vocabulary)
        texts.push(
          [`${l.lessonId}.vocab.word`, v.word],
          [`${l.lessonId}.vocab.phonetic`, v.phonetic],
          [`${l.lessonId}.vocab.definition`, v.definition],
          [`${l.lessonId}.vocab.context`, v.context],
        );
      for (const g of l.grammar)
        texts.push([`${l.lessonId}.rude`, g.rude], [`${l.lessonId}.polite`, g.polite], [`${l.lessonId}.rule`, g.rule]);
      for (const s of l.speaking)
        texts.push(
          [`${l.lessonId}.guestPrompt`, s.guestPrompt],
          [`${l.lessonId}.target`, s.targetResponse],
          [`${l.lessonId}.helpTip`, s.helpTip],
        );
      texts.push([`${l.lessonId}.reading`, l.reading.text]);
      for (const q of l.reading.questions) texts.push([`${l.lessonId}.q`, q.q]);
    }

    for (const [field, t] of texts) {
      checked++;
      if (t === undefined || t === null) { fail("T2", `${key} ${field} is nullish`); continue; }
      if (typeof t !== "string" || t.trim() === "") { fail("T2", `${key} ${field} is empty`); continue; }
      if (placeholder.test(t)) fail("T2", `${key} ${field} contains a placeholder: "${t.slice(0, 50)}"`);
      if (mojibake.test(t)) fail("T2", `${key} ${field} has encoding damage: "${t.slice(0, 50)}"`);
      if (/\s{2,}/.test(t)) warn("T2", `${key} ${field} has double spaces: "${t.slice(0, 50)}"`);
      if (t !== t.trim()) fail("T2", `${key} ${field} has leading/trailing whitespace`);
      if (t.includes("${")) fail("T2", `${key} ${field} has an unexpanded template literal: "${t.slice(0, 50)}"`);
    }

    // Vocabulary specifics
    for (const l of wk.lessons)
      for (const v of l.vocabulary) {
        if (!/^\/.+\/$/.test(v.phonetic)) fail("T2", `${key} "${v.word}" phonetic not slash-delimited: ${v.phonetic}`);
        if (!v.icon || v.icon.length > 6) fail("T2", `${key} "${v.word}" icon missing or too long`);
        // A Vietnamese gloss should not just echo the English headword.
        if (v.definition.toLowerCase() === v.word.toLowerCase())
          fail("T2", `${key} "${v.word}" definition merely repeats the headword`);
        // The example sentence should actually contain the headword.
        const head = v.word.toLowerCase().split(/\s+/)[0].replace(/[^a-z]/g, "");
        if (head.length > 2 && !v.context.toLowerCase().includes(head))
          warn("T2", `${key} "${v.word}" context does not contain the headword: "${v.context}"`);
      }
  }
  console.log(`T2 hygiene — ${checked} text fields inspected`);
}

// ============================================================
// T3 — CEFR ladder: difficulty must rise and never regress
// ============================================================
{
  const CAPS: Record<string, { from: number; to: number; cap: number }> = {
    P0: { from: 1, to: 6, cap: 5 },
    P1: { from: 7, to: 14, cap: 8 },
    P2: { from: 15, to: 22, cap: 12 },
    P3: { from: 23, to: 30, cap: 16 },
    P4: { from: 31, to: 40, cap: 22 },
  };
  const perWeek = new Map<number, number[]>();

  for (const [key, wk] of Object.entries(ALL_WEEKS)) {
    if (wk.weekNumber > AUTHORED_MAX) continue;
    const lines = [
      ...wk.lessons.flatMap((l) => l.speaking.map((s) => s.targetResponse)),
      ...wk.lessons.flatMap((l) => l.grammar.map((g) => g.polite)),
    ];
    const longest = Math.max(...lines.map(maxSent));
    if (!perWeek.has(wk.weekNumber)) perWeek.set(wk.weekNumber, []);
    perWeek.get(wk.weekNumber)!.push(longest);

    const phase = Object.entries(CAPS).find(([, c]) => wk.weekNumber >= c.from && wk.weekNumber <= c.to);
    if (phase && longest > phase[1].cap + 1)
      fail("T3", `${key} longest sentence is ${longest} words (${phase[0]} cap ${phase[1].cap}+1)`);
  }

  // Averages must not go backwards from one phase to the next.
  const phaseAvg = (from: number, to: number) => {
    const all: number[] = [];
    for (let w = from; w <= to; w++) all.push(...(perWeek.get(w) ?? []));
    return all.reduce((a, b) => a + b, 0) / Math.max(1, all.length);
  };
  const a0 = phaseAvg(1, 6), a1 = phaseAvg(7, 14), a2 = phaseAvg(15, 22), a3 = phaseAvg(23, 30), a4 = phaseAvg(31, 40);
  const aSeq = [a0, a1, a2, a3, a4];
  console.log(`T3 ladder — avg longest sentence: ${aSeq.map((a) => a.toFixed(1)).join(" → ")} words (P0→P4)`);
  for (let i = 1; i < aSeq.length; i++)
    if (!(aSeq[i - 1] < aSeq[i]))
      fail("T3", `sentence length regresses from P${i - 1} to P${i}: ${aSeq[i - 1].toFixed(1)} → ${aSeq[i].toFixed(1)}`);

  // Vocabulary load should also rise across phases.
  const vocabAvg = (from: number, to: number) => {
    let sum = 0, n = 0;
    for (const wk of Object.values(ALL_WEEKS))
      if (wk.weekNumber >= from && wk.weekNumber <= to) { sum += wk.lessons.flatMap((l) => l.vocabulary).length; n++; }
    return sum / Math.max(1, n);
  };
  const v0 = vocabAvg(1, 6), v1 = vocabAvg(7, 14), v2 = vocabAvg(15, 22), v3 = vocabAvg(23, 30), v4 = vocabAvg(31, 40);
  const vSeq = [v0, v1, v2, v3, v4];
  console.log(`T3 ladder — avg new vocabulary: ${vSeq.map((v) => v.toFixed(1)).join(" → ")} words/week (P0→P4)`);
  if (!(v0 <= v1 && v1 <= v2)) fail("T3", `vocabulary load does not rise: ${v0.toFixed(1)}/${v1.toFixed(1)}/${v2.toFixed(1)}`);
}

// ============================================================
// T4 — Review-key integrity (src/lib/review.ts)
// Slugs are truncated to 60 chars and used as the stable identity of a
// review item. A collision inside one week means the scheduler resolves
// the wrong content; an unresolvable reviewWord means a dead reference.
// ============================================================
{
  let keys = 0;
  for (const [key, wk] of Object.entries(ALL_WEEKS)) {
    if (wk.weekNumber > AUTHORED_MAX) continue;
    const dep = wk.departmentId;

    const vocabKeys = wk.lessons.flatMap((l) => l.vocabulary).map((v) => `vocab:${dep}:${wk.weekNumber}:${v.word}`);
    const grammarSlugs = wk.lessons.flatMap((l) => l.grammar).map((g) => slugify(g.rude));
    const speakingSlugs = wk.lessons.flatMap((l) => l.speaking).map((s) => slugify(s.guestPrompt));
    keys += vocabKeys.length + grammarSlugs.length + speakingSlugs.length;

    const dupe = (arr: string[], kind: string) => {
      const seen = new Set<string>();
      for (const s of arr) {
        if (s === "") fail("T4", `${key} produced an EMPTY ${kind} slug — item can never be resolved`);
        else if (seen.has(s)) fail("T4", `${key} duplicate ${kind} slug "${s}" — scheduler will resolve the wrong item`);
        seen.add(s);
      }
    };
    dupe(vocabKeys, "vocab key");
    dupe(grammarSlugs, "grammar");
    dupe(speakingSlugs, "speaking");

    // Every declared reviewWord must resolve to a real VocabItem.
    const declared = wk.reviewWords ?? [];
    if (declared.length) {
      const resolved = resolveReviewVocab(dep, declared);
      const got = new Set(resolved.map((v) => v.word.toLowerCase()));
      const dead = declared.filter((w) => !got.has(w.toLowerCase()));
      if (dead.length)
        fail("T4", `${key} has ${dead.length} reviewWord(s) that resolve to nothing: ${dead.slice(0, 5).join(", ")}`);
    }
  }
  console.log(`T4 review keys — ${keys} scheduler keys checked for collisions and dead references`);
}

// ============================================================
// T5 — Suite simulations: does each suite get a runnable exercise?
// Each block mirrors the real component's data preparation.
// ============================================================
{
  const stripWord = (w: string) => w.replace(/[^A-Za-z']/g, "").toLowerCase();
  let sims = 0;

  for (const [key, wk] of Object.entries(ALL_WEEKS)) {
    if (wk.weekNumber > AUTHORED_MAX) continue;
    sims++;

    // --- VocabSuite: MCQ needs 3 distractors; dictation needs eligible words
    const vocab = wk.lessons.flatMap((l) => l.vocabulary);
    if (vocab.length < 4) fail("T5", `${key} VocabSuite: only ${vocab.length} terms, MCQ needs 4+`);
    const dictable = vocab.filter((v) => /^[A-Za-z][A-Za-z\- ]{3,}$/.test(v.word));
    if (dictable.length === 0) fail("T5", `${key} VocabSuite: no dictation-eligible term`);
    const defs = new Set(vocab.map((v) => v.definition));
    if (defs.size !== vocab.length)
      fail("T5", `${key} VocabSuite: two terms share a definition — MCQ would have two right answers`);
    const heads = new Set(vocab.map((v) => v.word.toLowerCase()));
    if (heads.size !== vocab.length) fail("T5", `${key} VocabSuite: duplicate headword inside the week`);

    // --- GrammarSuite: chips must rebuild the target exactly
    for (const l of wk.lessons)
      for (const g of l.grammar) {
        const chips = g.polite.replace(/[.!?,]/g, "").split(/\s+/).filter(Boolean);
        const rebuilt = chips.join(" ");
        const expect = g.polite.replace(/[.!?,]/g, "").split(/\s+/).filter(Boolean).join(" ");
        if (rebuilt !== expect) fail("T5", `${key} GrammarSuite: chips do not rebuild "${g.polite}"`);
        if (chips.length < 3) fail("T5", `${key} GrammarSuite: "${g.polite}" makes only ${chips.length} chips`);
        if (chips.length > 18) warn("T5", `${key} GrammarSuite: "${g.polite}" makes ${chips.length} chips — hard to assemble`);
        if (g.rude === g.polite) fail("T5", `${key} GrammarSuite: rude and polite are identical`);
      }

    // --- ListeningSuite: cloze needs 2+ words of 4+ letters
    const vocabWords = new Set(vocab.flatMap((v) => v.word.toLowerCase().split(/\s+/)));
    let cloze = 0;
    for (const l of wk.lessons)
      for (const s of l.speaking) {
        const cand = s.targetResponse.split(/\s+/).map((w, i) => ({ w: stripWord(w), i })).filter((c) => c.w.length >= 4);
        const pref = cand.filter((c) => vocabWords.has(c.w));
        const rest = cand.filter((c) => !vocabWords.has(c.w));
        if (new Set([...pref, ...rest].slice(0, 3).map((c) => c.i)).size >= 2) cloze++;
      }
    if (cloze === 0) fail("T5", `${key} ListeningSuite: zero cloze tasks — suite renders empty`);

    // --- ArcadeSuite / game rounds
    const rounds = wk.lessons.flatMap((l) => l.game);
    if (rounds.length === 0) fail("T5", `${key} ArcadeSuite: no rounds`);
    for (const r of rounds) {
      if (r.options.length < 2) fail("T5", `${key} Arcade: round "${r.prompt}" has <2 options`);
      if (r.options.filter((o) => o.correct).length !== 1)
        fail("T5", `${key} Arcade: round "${r.prompt}" does not have exactly one correct option`);
      if (new Set(r.options.map((o) => o.text)).size !== r.options.length)
        fail("T5", `${key} Arcade: round "${r.prompt}" has duplicate option text`);
    }

    // --- ReadingSuite
    for (const l of wk.lessons) {
      if (l.reading.questions.length !== 2) fail("T5", `${key} Reading: ${l.lessonId} has ${l.reading.questions.length} questions`);
      if (words(l.reading.text).length < 12) warn("T5", `${key} Reading: ${l.lessonId} passage is very short`);
      for (const q of l.reading.questions) {
        if (q.correct < 0 || q.correct >= q.options.length) fail("T5", `${key} Reading: correct index out of range`);
        if (new Set(q.options).size !== q.options.length) fail("T5", `${key} Reading: duplicate answer options for "${q.q}"`);
        if (q.options.length < 2) fail("T5", `${key} Reading: question "${q.q}" has <2 options`);
      }
    }

    // --- SpeakingSuite
    for (const l of wk.lessons)
      for (const s of l.speaking) {
        if (s.guestPrompt === s.targetResponse) fail("T5", `${key} Speaking: prompt equals the target answer`);
        if (words(s.targetResponse).length < 2) fail("T5", `${key} Speaking: target "${s.targetResponse}" too short to score`);
      }
  }
  console.log(`T5 suites — 6 suites simulated across ${sims} dep-weeks`);
}

// ============================================================
// T6 — Answerability: is the correct answer actually findable?
// A distractor that is also correct, or a "correct" answer that is
// obviously the longest option, breaks the exercise as an assessment.
// ============================================================
{
  let rounds = 0, longestBias = 0;
  for (const [key, wk] of Object.entries(ALL_WEEKS)) {
    if (wk.weekNumber > AUTHORED_MAX) continue;
    for (const l of wk.lessons) {
      for (const r of l.game) {
        rounds++;
        const correct = r.options.find((o) => o.correct)!;
        const others = r.options.filter((o) => !o.correct);
        if (others.some((o) => o.text === correct.text)) fail("T6", `${key} game "${r.prompt}" distractor equals answer`);
        if (correct.text.length > Math.max(...others.map((o) => o.text.length)) * 1.8) longestBias++;
      }
      for (const q of l.reading.questions) {
        const correct = q.options[q.correct];
        if (!correct || correct.trim() === "") fail("T6", `${key} reading question "${q.q}" has an empty correct option`);
      }
    }
  }
  const pct = Math.round((longestBias / Math.max(1, rounds)) * 100);
  console.log(`T6 answerability — ${rounds} game rounds; ${pct}% have a markedly longest correct option`);
  if (pct > 60) warn("T6", `${pct}% of rounds let a learner win by always picking the longest option`);
}

// ============================================================
// T6b — Game prompts must be UTTERANCES, not task descriptions.
// ArcadeSuite renders game.prompt under a "Guest says" label and both
// ListeningSuite and WeekTestSuite SPEAK it aloud as the guest's line.
// A prompt written as an instruction ("A guest asks X. What do you
// say?") is therefore read back to the learner as though the guest said
// it, and the exercise stops making sense. Same for the options, which
// are rendered as the staff member's spoken replies.
// ============================================================
{
  // Third-person framing of the learner or the guest — the tell-tale of
  // a task description rather than a line of dialogue.
  // Deliberately narrow: only third-person narration of the scene and
  // direct instructions to the learner. Blunt in-character lines like
  // "You want upgrade?" or "You need to sign here" are legitimate
  // dialogue (often the rude distractor) and must not trip this.
  const META = new RegExp(
    [
      "what do you say\\b",
      "what is the best reply\\b",
      "which reply is best\\b",
      "what do you (?:do|offer|add|promise|tell)\\b",
      "\\b(?:the|a) guest (?:says|asks|doubts|wants|demands|mentions|is |politely)",
      "\\byour (?:colleague|manager|supervisor) (?:arrives|asks)\\b",
      "\\byou (?:cannot|have just|are going to|still have|want to offer|need details)\\b",
    ].join("|"),
    "i",
  );
  let checked = 0;
  for (const [key, wk] of Object.entries(ALL_WEEKS)) {
    if (wk.weekNumber > AUTHORED_MAX) continue;
    for (const l of wk.lessons) {
      for (const r of l.game) {
        checked++;
        if (META.test(r.prompt)) fail("T6b", `${key} game prompt is a task description, not something a guest says: "${r.prompt}"`);
        for (const o of r.options) {
          if (META.test(o.text)) fail("T6b", `${key} game option is a task description, not a spoken reply: "${o.text}"`);
        }
      }
    }
  }
  console.log(`T6b dialogue framing — ${checked} game rounds checked for task-description prompts`);
}

// ============================================================
// T7 — UI data contracts
// The three screens read from different sources. They must agree.
//   department timeline  → Supabase scenarios (titles)
//   week hub sub-lessons → curriculum.findWeek → week-content
//   handbook             → week-content directly
// ============================================================
{
  for (const dep of DEPS) {
    for (let w = 1; w <= AUTHORED_MAX; w++) {
      const content = getWeekContent(dep, w)!;
      const fw = findWeek(dep, w);
      if (!fw) { fail("T7", `curriculum.findWeek(${dep},${w}) returned nothing — week hub would render empty`); continue; }
      if (fw.title_vi !== content.weekTitleVi)
        fail("T7", `${dep}-${w} hub title "${fw.title_vi}" ≠ content title "${content.weekTitleVi}"`);
      if (fw.lessons.length !== 4) fail("T7", `${dep}-${w} hub shows ${fw.lessons.length} sub-lessons (want 4)`);
      fw.lessons.forEach((t, i) => {
        if (t !== content.lessons[i].titleVi)
          fail("T7", `${dep}-${w} sub-lesson ${i + 1} is "${t}" but content says "${content.lessons[i].titleVi}"`);
      });

      // Handbook derivation must produce something worth printing.
      const patterns = new Set([
        ...content.lessons.flatMap((l) => l.speaking.map((s) => s.targetResponse)),
        ...content.lessons.flatMap((l) => l.grammar.map((g) => g.polite)),
      ]);
      if (patterns.size < 8) fail("T7", `${dep}-${w} handbook would show only ${patterns.size} patterns`);
    }
  }
  console.log(`T7 UI contracts — timeline/hub/handbook inputs cross-checked for ${DEPS.length * AUTHORED_MAX} weeks`);
}

// ============================================================
// Report
// ============================================================
console.log("");
if (warns.length) {
  console.log(`WARNINGS (${warns.length}):`);
  const shown = warns.slice(0, 25);
  for (const w of shown) console.log("  ! " + w);
  if (warns.length > shown.length) console.log(`  … and ${warns.length - shown.length} more`);
  console.log("");
}
if (fails.length) {
  console.error(`FAILED — ${fails.length} defect(s):`);
  for (const f of fails.slice(0, 60)) console.error("  x " + f);
  if (fails.length > 60) console.error(`  … and ${fails.length - 60} more`);
  process.exit(1);
}
console.log("QA PASS — all 7 test layers clean.");
