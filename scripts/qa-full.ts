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
import { passThresholds } from "../src/lib/speaking-score";
import { MAX_CHIPS } from "../src/components/suites/GrammarSuite";
import {
  LISTENING_RATE_CEILING,
  LISTENING_RATE_FLOOR,
  PHASES as PHASES_APP,
  dictationAllowsTypo,
  headwordRateForWeek,
  listeningRateForWeek,
  suiteMasteryPct,
} from "../src/lib/phases";

const DEPS = DEPARTMENTS.map((d) => d.code);
const AUTHORED_MAX = 40;

const fails: string[] = [];
const warns: string[] = [];
const fail = (t: string, m: string) => fails.push(`[${t}] ${m}`);
const warn = (t: string, m: string) => warns.push(`[${t}] ${m}`);

const NUMBER_WORD =
  "zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen|fourteen|fifteen|sixteen|seventeen|eighteen|nineteen|twenty|thirty|forty|fifty|sixty|seventy|eighty|ninety|hundred|thousand|million";
const NUMBER_RUN = new RegExp(`\\b(?:${NUMBER_WORD})(?:[ -](?:${NUMBER_WORD}))*\\b`, "gi");
const words = (s: string) =>
  s
    // "five hundred thousand" is one lexicon unit, not three words — same
    // convention verify-content's capFor applies. Two gates disagreeing on
    // arithmetic left the priced sentences with no legal way to carry their
    // currency unit.
    .replace(NUMBER_RUN, "N")
    .replace(/[.,!?…—–]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
const maxSent = (s: string) => Math.max(0, ...s.split(/[.!?]+/).map((p) => words(p).length));

// Mirrors slugify() in src/lib/review.ts exactly.
const slugify = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60);

// ============================================================
// T1 — Coverage & reachability
// ============================================================
{
  let n = 0;
  for (const dep of DEPS) {
    // A department still being authored is exempt from COVERAGE only — the
    // weeks it does have are checked exactly like everyone else's, here and
    // in every other layer. Shipping it (removing `hidden`) turns this back
    // on and the 40/40 requirement applies.
    // Only an UNFINISHED department is exempt from coverage. A withdrawn one
    // has all forty weeks and is checked exactly like a shipping one — its
    // content is done and may come back, so it must not rot while it waits.
    const inProgress = DEPARTMENTS.find((d) => d.code === dep)?.hidden === "in-progress";
    for (let w = 1; w <= AUTHORED_MAX; w++) {
      const viaRegistry = ALL_WEEKS[`${dep}-${w}`];
      const viaAccessor = getWeekContent(dep, w);
      const viaString = getWeekContent(dep.toLowerCase(), String(w));
      if (!viaRegistry) {
        if (!inProgress) fail("T1", `${dep}-${w} missing from registry`);
        continue;
      }
      if (!viaAccessor) fail("T1", `${dep}-${w} unreachable via getWeekContent(number)`);
      if (!viaString) fail("T1", `${dep}-${w} unreachable via lowercase dep / string week`);
      if (viaAccessor !== viaRegistry)
        fail("T1", `${dep}-${w} accessor returns a different object`);
      if (viaRegistry.departmentId !== dep)
        fail("T1", `${dep}-${w} departmentId is "${viaRegistry.departmentId}"`);
      if (viaRegistry.weekNumber !== w)
        fail("T1", `${dep}-${w} weekNumber is ${viaRegistry.weekNumber}`);
      if (viaRegistry.lessons.length !== 4)
        fail("T1", `${dep}-${w} has ${viaRegistry.lessons.length} lessons (want 4)`);
      viaRegistry.lessons.forEach((l, i) => {
        if (l.lessonOrder !== i + 1)
          fail("T1", `${dep}-${w} lesson ${i} has lessonOrder ${l.lessonOrder}`);
        if (l.lessonId !== `${dep}_${w}_${i + 1}`)
          fail("T1", `${dep}-${w} lessonId "${l.lessonId}" does not match slot`);
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
  // Report the two populations apart. Folding an in-progress department into
  // one ratio would let a shipping department lose weeks and still read as
  // "240/280" — a number nobody would question.
  const shipping = DEPARTMENTS.filter((d) => !d.hidden);
  const wip = DEPARTMENTS.filter((d) => d.hidden === "in-progress");
  const withdrawn = DEPARTMENTS.filter((d) => d.hidden === "withdrawn");
  const weeksOf = (dep: string) =>
    Array.from({ length: AUTHORED_MAX }, (_, i) => ALL_WEEKS[`${dep}-${i + 1}`]).filter(Boolean)
      .length;
  const shipped = shipping.reduce((s, d) => s + weeksOf(d.code), 0);
  console.log(
    `T1 coverage — ${shipped}/${shipping.length * AUTHORED_MAX} dep-weeks reachable across ${shipping.length} shipping departments` +
      (wip.length
        ? `; in progress: ${wip.map((d) => `${d.code} ${weeksOf(d.code)}/${AUTHORED_MAX}`).join(", ")}`
        : "") +
      (withdrawn.length
        ? `; withdrawn but still fully checked: ${withdrawn.map((d) => `${d.code} ${weeksOf(d.code)}/${AUTHORED_MAX}`).join(", ")}`
        : ""),
  );
}

// ============================================================
// T2 — Field hygiene: empty, placeholder, encoding damage
// ============================================================
{
  const placeholder = /\b(TODO|TBD|FIXME|XXX|lorem|placeholder|undefined|null|NaN)\b/i;
  // Mojibake is UTF-8 read as Latin-1, so its signature is a high-Latin
  // letter FOLLOWED by another one: "Ã¡", "Ã©", "Ãª". A bare "Ã" is not
  // damage — it is the uppercase of "ã", and Vietnamese emphasis uses it
  // constantly ("bạn ĐÃ xem rồi"). The old pattern flagged every one of
  // those, which meant the only safe way to pass the gate was to stop
  // writing uppercase Vietnamese.
  const mojibake = /[ÃÐÑ][-¿]|â€|�/;
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
        texts.push(
          [`${l.lessonId}.rude`, g.rude],
          [`${l.lessonId}.polite`, g.polite],
          [`${l.lessonId}.rule`, g.rule],
          ...(g.nearMiss ? ([[`${l.lessonId}.nearMiss`, g.nearMiss]] as [string, string][]) : []),
        );
      for (const s of l.speaking)
        texts.push(
          [`${l.lessonId}.guestPrompt`, s.guestPrompt],
          [`${l.lessonId}.target`, s.targetResponse],
          [`${l.lessonId}.helpTip`, s.helpTip],
        );
      // The game block was never inspected here: 28,706 fields checked and not
      // one of them was a round the learner actually plays. An unexpanded
      // template placeholder in a game option ships as literal source text.
      for (const r of l.game ?? []) {
        texts.push([`${l.lessonId}.game.prompt`, r.prompt]);
        for (const o of r.options) texts.push([`${l.lessonId}.game.option`, o.text]);
        if (r.explanation) texts.push([`${l.lessonId}.game.explanation`, r.explanation]);
      }
      texts.push([`${l.lessonId}.reading`, l.reading.text]);
      for (const q of l.reading.questions) texts.push([`${l.lessonId}.q`, q.q]);
    }

    for (const [field, t] of texts) {
      checked++;
      if (t === undefined || t === null) {
        fail("T2", `${key} ${field} is nullish`);
        continue;
      }
      if (typeof t !== "string" || t.trim() === "") {
        fail("T2", `${key} ${field} is empty`);
        continue;
      }
      if (placeholder.test(t))
        fail("T2", `${key} ${field} contains a placeholder: "${t.slice(0, 50)}"`);
      if (mojibake.test(t)) fail("T2", `${key} ${field} has encoding damage: "${t.slice(0, 50)}"`);
      if (/\s{2,}/.test(t)) warn("T2", `${key} ${field} has double spaces: "${t.slice(0, 50)}"`);
      if (t !== t.trim()) fail("T2", `${key} ${field} has leading/trailing whitespace`);
      if (t.includes("${"))
        fail("T2", `${key} ${field} has an unexpanded template literal: "${t.slice(0, 50)}"`);
    }

    // The grammar `rule` is the explanation a learner reads, and this course
    // runs from pre-A1. Explaining an English structure IN English to a
    // beginner teaches nothing — 96 rules shipped that way, all of them in
    // the hand-authored weeks, while every bank-generated week explained in
    // Vietnamese. Detected by the absence of any accented Latin character,
    // which no real Vietnamese sentence of this length lacks.
    for (const l of wk.lessons)
      for (const g of l.grammar)
        if (g.rule.length > 20 && !/[À-ɏḀ-ỿ]/.test(g.rule))
          fail("T2", `${key} grammar rule is not in Vietnamese: "${g.rule.slice(0, 60)}"`);

    // Reading questions ask in Vietnamese, like every other instruction in
    // the app. 95 of them were in English — all inside the twelve
    // hand-authored weeks, the same twelve that carried American IPA and
    // English grammar rules. A learner moving through Vietnamese weeks met
    // one English week and then went back, which tests reading the QUESTION
    // rather than reading the passage. The passages and their documents stay
    // in English: that is the material being read.
    for (const l of wk.lessons)
      for (const q of l.reading.questions)
        if (q.q.length > 15 && !/[À-ɏḀ-ỿ]/.test(q.q))
          fail("T2", `${key} reading question is not in Vietnamese: "${q.q.slice(0, 60)}"`);

    // Vocabulary specifics
    for (const l of wk.lessons)
      for (const v of l.vocabulary) {
        if (!/^\/.+\/$/.test(v.phonetic))
          fail("T2", `${key} "${v.word}" phonetic not slash-delimited: ${v.phonetic}`);
        // One accent, consistently. The course transcribes British English
        // (/ˈnʌmbə/, /ˈtʃɑːdʒə/), but the hand-authored weeks arrived with
        // American IPA mixed in — 116 of 2,309 transcriptions, concentrated
        // in weeks 15/17/19/23. A learner sounding words out from the key
        // was being taught two different pronunciations of the same course.
        //   · ɛ  → e   (DRESS: British /e/)
        //   · oʊ → əʊ  (GOAT)
        //   · r before a consonant or at the end of a word — British is
        //     non-rhotic. An r before a VOWEL is the linking r and correct
        //     ("offer a" = /ˈɒfər ə/), so it is deliberately not flagged.
        const AMERICAN_IPA = /ɛ|oʊ|(?:ɑː|ɔː|ɜː|ə|ɪ|ʊ|e|æ)r(?![\sˈˌ]*[aeiouæɑɒɔəɜɪʊʌ])/;
        if (AMERICAN_IPA.test(v.phonetic))
          fail(
            "T2",
            `${key} "${v.word}" phonetic mixes American IPA into a British-transcribed course: ${v.phonetic}`,
          );
        if (!v.icon || v.icon.length > 6) fail("T2", `${key} "${v.word}" icon missing or too long`);
        // A Vietnamese gloss should not just echo the English headword.
        if (v.definition.toLowerCase() === v.word.toLowerCase())
          fail("T2", `${key} "${v.word}" definition merely repeats the headword`);
        // The example sentence should actually contain the headword.
        //
        // Both sides must be folded the same way or the check reports noise
        // instead of defects. It used to strip punctuation and diacritics from
        // the headword only, so "O'clock" became "oclock" and was then hunted
        // in a context that still read "o'clock" — 76 of its 82 warnings were
        // artefacts of that asymmetry, which is enough noise to bury the real
        // ones. Three tolerances, each for a form that is correct English:
        //   · fold — "wake-up call" / "Canapés" vs "wake up call" / "canapes"
        //   · stem — a headword may legitimately appear inflected
        //            ("Celebrate" taught by "Are you celebrating something?")
        //   · acronym — "Banquet Event Order (BEO)" is shown by using "BEO"
        const fold = (s: string) =>
          s
            .toLowerCase()
            .normalize("NFD")
            .replace(/[̀-ͯ]/g, "")
            .replace(/[’'‘\-–—]/g, "");
        const head = fold(v.word)
          .split(/\s+/)[0]
          .replace(/[^a-z]/g, "");
        const ctx = fold(v.context);
        const stem = head.length >= 6 ? head.slice(0, -1) : head;
        const acronym = v.word.match(/\(([A-Z]{2,})\)/)?.[1];
        const shown =
          ctx.includes(head) || ctx.includes(stem) || (!!acronym && v.context.includes(acronym));
        if (head.length > 2 && !shown)
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

    const phase = Object.entries(CAPS).find(
      ([, c]) => wk.weekNumber >= c.from && wk.weekNumber <= c.to,
    );
    if (phase && longest > phase[1].cap + 1)
      fail("T3", `${key} longest sentence is ${longest} words (${phase[0]} cap ${phase[1].cap}+1)`);
  }

  // Averages must not go backwards from one phase to the next.
  const phaseAvg = (from: number, to: number) => {
    const all: number[] = [];
    for (let w = from; w <= to; w++) all.push(...(perWeek.get(w) ?? []));
    return all.reduce((a, b) => a + b, 0) / Math.max(1, all.length);
  };
  const a0 = phaseAvg(1, 6),
    a1 = phaseAvg(7, 14),
    a2 = phaseAvg(15, 22),
    a3 = phaseAvg(23, 30),
    a4 = phaseAvg(31, 40);
  const aSeq = [a0, a1, a2, a3, a4];
  console.log(
    `T3 ladder — avg longest sentence: ${aSeq.map((a) => a.toFixed(1)).join(" → ")} words (P0→P4)`,
  );
  for (let i = 1; i < aSeq.length; i++)
    if (!(aSeq[i - 1] < aSeq[i]))
      fail(
        "T3",
        `sentence length regresses from P${i - 1} to P${i}: ${aSeq[i - 1].toFixed(1)} → ${aSeq[i].toFixed(1)}`,
      );

  // Vocabulary load should also rise across phases.
  const vocabAvg = (from: number, to: number) => {
    let sum = 0,
      n = 0;
    for (const wk of Object.values(ALL_WEEKS))
      if (wk.weekNumber >= from && wk.weekNumber <= to) {
        sum += wk.lessons.flatMap((l) => l.vocabulary).length;
        n++;
      }
    return sum / Math.max(1, n);
  };
  const v0 = vocabAvg(1, 6),
    v1 = vocabAvg(7, 14),
    v2 = vocabAvg(15, 22),
    v3 = vocabAvg(23, 30),
    v4 = vocabAvg(31, 40);
  const vSeq = [v0, v1, v2, v3, v4];
  console.log(
    `T3 ladder — avg new vocabulary: ${vSeq.map((v) => v.toFixed(1)).join(" → ")} words/week (P0→P4)`,
  );
  if (!(v0 <= v1 && v1 <= v2))
    fail("T3", `vocabulary load does not rise: ${v0.toFixed(1)}/${v1.toFixed(1)}/${v2.toFixed(1)}`);

  // Listening speed is the third rung of the ladder, and the one that had
  // never been programmed: ListeningSuite ran 0.8 + random*0.2 on every week,
  // so week 1 could be faster than week 40. Five criteria, each exact:
  //   1. week 1 opens at the matrix floor, week 40 lands on its ceiling
  //   2. never slower than the week before  (a learner cannot regress)
  //   3. every phase OPENS on its committed anchor
  //   4. nothing outside [floor, ceiling]
  //   5. a headword is always slower than connected speech at the same week
  const ANCHORS = [0.7, 0.75, 0.8, 0.85, 0.9];
  let prevRate = 0;
  for (let w = 1; w <= AUTHORED_MAX; w++) {
    const r = listeningRateForWeek(w);
    if (r < prevRate) fail("T3", `listening rate falls at week ${w}: ${prevRate} → ${r}`);
    if (r < LISTENING_RATE_FLOOR || r > LISTENING_RATE_CEILING)
      fail("T3", `listening rate out of range at week ${w}: ${r}`);
    if (headwordRateForWeek(w) >= r)
      fail("T3", `headword rate not below connected speech at week ${w}`);
    prevRate = r;
  }
  PHASES_APP.forEach((p, i) => {
    const opened = listeningRateForWeek(p.from);
    if (Math.abs(opened - ANCHORS[i]) > 1e-9)
      fail("T3", `phase ${p.band} opens at ${opened}, matrix commits ${ANCHORS[i]}`);
  });
  if (listeningRateForWeek(1) !== LISTENING_RATE_FLOOR)
    fail("T3", `week 1 is ${listeningRateForWeek(1)}, must be ${LISTENING_RATE_FLOOR}`);
  if (listeningRateForWeek(AUTHORED_MAX) !== LISTENING_RATE_CEILING)
    fail(
      "T3",
      `week 40 is ${listeningRateForWeek(AUTHORED_MAX)}, must be ${LISTENING_RATE_CEILING}`,
    );
  console.log(
    `T3 ladder — listening rate: ${[1, 7, 15, 23, 31, 40].map((w) => listeningRateForWeek(w)).join(" → ")} (w1/7/15/23/31/40)`,
  );

  // The mastery bar is the fourth rung. It was a flat 80 in every suite at
  // every week — unreachable at pre-A1, where a perfect multiple-choice run
  // that missed the spelling items scored 76.9%. Criteria: it never falls,
  // it starts below where it ends (so it is a ladder and not a constant in
  // disguise), and it stays inside the band the curriculum can defend.
  let prevBar = 0;
  for (let w = 1; w <= AUTHORED_MAX; w++) {
    const bar = suiteMasteryPct(w);
    if (bar < prevBar) fail("T3", `suite mastery bar falls at week ${w}: ${prevBar} → ${bar}`);
    if (bar < 70 || bar > 80) fail("T3", `suite mastery bar out of band at week ${w}: ${bar}`);
    prevBar = bar;
  }
  if (!(suiteMasteryPct(1) < suiteMasteryPct(AUTHORED_MAX)))
    fail("T3", "suite mastery bar does not rise across the course");
  // Speaking is the fifth rung, and the one that used to run 60 → 80 → 50:
  // a twenty-point cliff at week 15, then a drop at week 39 that made the
  // final speaking assessment the most lenient in the course. Criteria: it
  // never falls on either axis, it starts below where it ends, and no single
  // week may raise the accuracy bar by more than 5 points.
  let prevAcc = 0;
  let prevOrder = 0;
  for (let w = 1; w <= AUTHORED_MAX; w++) {
    const t = passThresholds(w);
    if (t.accPct < prevAcc) fail("T3", `speaking bar falls at week ${w}: ${prevAcc} → ${t.accPct}`);
    if (t.orderRatio < prevOrder)
      fail("T3", `speaking word-order bar falls at week ${w}: ${prevOrder} → ${t.orderRatio}`);
    if (w > 1 && t.accPct - prevAcc > 5)
      fail("T3", `speaking bar jumps ${t.accPct - prevAcc} points at week ${w} — ramp it`);
    prevAcc = t.accPct;
    prevOrder = t.orderRatio;
  }
  if (!(passThresholds(1).accPct < passThresholds(AUTHORED_MAX).accPct))
    fail("T3", "speaking bar does not rise across the course");
  console.log(
    `T3 ladder — speaking bar: ${[1, 15, 17, 19, 21, 40].map((w) => passThresholds(w).accPct).join(" → ")}% (w1/15/17/19/21/40)`,
  );

  // Dictation tolerance is a beginner allowance, not a permanent discount.
  if (!dictationAllowsTypo(1) || dictationAllowsTypo(AUTHORED_MAX))
    fail("T3", "dictation typo tolerance must apply at pre-A1/A1 and stop by A2.1");
  console.log(
    `T3 ladder — mastery bar: ${[1, 7, 15, 23, 31, 40].map((w) => suiteMasteryPct(w)).join(" → ")}%  ·  dictation tolerance ends at week ${
      [...Array(AUTHORED_MAX)].findIndex((_, i) => !dictationAllowsTypo(i + 1)) + 1
    }`,
  );
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

    const vocabKeys = wk.lessons
      .flatMap((l) => l.vocabulary)
      .map((v) => `vocab:${dep}:${wk.weekNumber}:${v.word}`);
    const grammarSlugs = wk.lessons.flatMap((l) => l.grammar).map((g) => slugify(g.rude));
    const speakingSlugs = wk.lessons.flatMap((l) => l.speaking).map((s) => slugify(s.guestPrompt));
    keys += vocabKeys.length + grammarSlugs.length + speakingSlugs.length;

    const dupe = (arr: string[], kind: string) => {
      const seen = new Set<string>();
      for (const s of arr) {
        if (s === "")
          fail("T4", `${key} produced an EMPTY ${kind} slug — item can never be resolved`);
        else if (seen.has(s))
          fail(
            "T4",
            `${key} duplicate ${kind} slug "${s}" — scheduler will resolve the wrong item`,
          );
        seen.add(s);
      }
    };
    dupe(vocabKeys, "vocab key");
    dupe(grammarSlugs, "grammar");
    dupe(speakingSlugs, "speaking");

    // Every declared reviewWord must resolve to a real VocabItem.
    const declared = wk.reviewWords ?? [];
    // A duplicate reviewWord renders the learner two identical review chips.
    // One shipped in FO-31 for a day because nothing looked.
    if (new Set(declared.map((w) => w.toLowerCase())).size !== declared.length)
      fail("T4", `${key} has duplicate reviewWords: ${declared.join(", ")}`);
    if (declared.length) {
      const resolved = resolveReviewVocab(dep, declared);
      const got = new Set(resolved.map((v) => v.word.toLowerCase()));
      const dead = declared.filter((w) => !got.has(w.toLowerCase()));
      if (dead.length)
        fail(
          "T4",
          `${key} has ${dead.length} reviewWord(s) that resolve to nothing: ${dead.slice(0, 5).join(", ")}`,
        );
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
      fail(
        "T5",
        `${key} VocabSuite: two terms share a definition — MCQ would have two right answers`,
      );
    const heads = new Set(vocab.map((v) => v.word.toLowerCase()));
    if (heads.size !== vocab.length)
      fail("T5", `${key} VocabSuite: duplicate headword inside the week`);

    // The week's quiz must actually test the week. VocabSuite allocates
    // min(vocab, 10) new-word items against min(review, 4) recycled ones;
    // when both were drawn from one shuffled pool the recycled side grew
    // every week until only 24% of a P4 paper asked about what that week
    // taught. Criterion: the week's own vocabulary holds at least 60% of the
    // items, which also means a week can never carry so few new words that
    // its quiz becomes a review sheet.
    const VOCAB_NEW_MIN_SHARE = 0.6;
    const newSlots = Math.min(vocab.length, 10);
    const reviewSlots = Math.min(
      resolveReviewVocab(wk.departmentId, wk.reviewWords ?? []).length,
      4,
    );
    const share = newSlots / (newSlots + reviewSlots);
    if (newSlots < 1) fail("T5", `${key} VocabSuite: no new vocabulary to quiz`);
    else if (share < VOCAB_NEW_MIN_SHARE)
      fail(
        "T5",
        `${key} VocabSuite: only ${(share * 100).toFixed(0)}% of the quiz is this week's vocabulary (need ${VOCAB_NEW_MIN_SHARE * 100}%)`,
      );

    // --- GrammarSuite: chips must rebuild the target exactly
    for (const l of wk.lessons)
      for (const g of l.grammar) {
        // Mirrors toChips() in GrammarSuite: words for a short sentence,
        // phrases for a long one, so the tray never exceeds MAX_CHIPS.
        const words = g.polite
          .replace(/[.!?,]/g, "")
          .split(/\s+/)
          .filter(Boolean);
        let chips = words;
        if (words.length > MAX_CHIPS) {
          const per = Math.ceil(words.length / MAX_CHIPS);
          chips = [];
          for (let i = 0; i < words.length; i += per) chips.push(words.slice(i, i + per).join(" "));
        }
        const rebuilt = chips.join(" ");
        const expect = g.polite
          .replace(/[.!?,]/g, "")
          .split(/\s+/)
          .filter(Boolean)
          .join(" ");
        if (rebuilt !== expect)
          fail("T5", `${key} GrammarSuite: chips do not rebuild "${g.polite}"`);
        if (chips.length < 3)
          fail("T5", `${key} GrammarSuite: "${g.polite}" makes only ${chips.length} chips`);
        // A hard cap now, not a warning. Above it the tray wraps to four or
        // five rows on a phone and the drill becomes a hunt: 251 sentences
        // crossed 12 chips and the worst made 23.
        if (chips.length > MAX_CHIPS)
          fail(
            "T5",
            `${key} GrammarSuite: "${g.polite}" makes ${chips.length} chips, cap is ${MAX_CHIPS}`,
          );
        if (g.rude === g.polite) fail("T5", `${key} GrammarSuite: rude and polite are identical`);
      }

    // --- ListeningSuite: cloze needs 2+ words of 4+ letters
    const vocabWords = new Set(vocab.flatMap((v) => v.word.toLowerCase().split(/\s+/)));
    let cloze = 0;
    for (const l of wk.lessons)
      for (const s of l.speaking) {
        const cand = s.targetResponse
          .split(/\s+/)
          .map((w, i) => ({ w: stripWord(w), i }))
          .filter((c) => c.w.length >= 4);
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
      // Mastery is 80% and the bar is ceil(0.8 * n), so 2/2, 3/3 and 4/4 all demand a
      // perfect run: two questions on a passage is pass-perfectly-or-fail. Only five
      // gives a learner one wrong answer (4/5 = 80%), which is why the ceiling is five
      // everywhere rather than only on long passages. Two remains the floor, so the
      // generated spine is untouched.
      const qMax = 5;
      if (l.reading.questions.length < 2 || l.reading.questions.length > qMax)
        fail(
          "T5",
          `${key} Reading: ${l.lessonId} has ${l.reading.questions.length} questions (want 2-5)`,
        );
      if (words(l.reading.text).length < 12)
        warn("T5", `${key} Reading: ${l.lessonId} passage is very short`);
      for (const q of l.reading.questions) {
        if (q.correct < 0 || q.correct >= q.options.length)
          fail("T5", `${key} Reading: correct index out of range`);
        if (new Set(q.options).size !== q.options.length)
          fail("T5", `${key} Reading: duplicate answer options for "${q.q}"`);
        if (q.options.length < 2) fail("T5", `${key} Reading: question "${q.q}" has <2 options`);
      }
    }

    // --- SpeakingSuite
    for (const l of wk.lessons)
      for (const s of l.speaking) {
        if (s.guestPrompt === s.targetResponse)
          fail("T5", `${key} Speaking: prompt equals the target answer`);
        if (words(s.targetResponse).length < 2)
          fail("T5", `${key} Speaking: target "${s.targetResponse}" too short to score`);
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
  let rounds = 0,
    longestBias = 0;
  for (const [key, wk] of Object.entries(ALL_WEEKS)) {
    if (wk.weekNumber > AUTHORED_MAX) continue;
    for (const l of wk.lessons) {
      for (const r of l.game) {
        rounds++;
        const correct = r.options.find((o) => o.correct)!;
        const others = r.options.filter((o) => !o.correct);
        if (others.some((o) => o.text === correct.text))
          fail("T6", `${key} game "${r.prompt}" distractor equals answer`);
        if (correct.text.length > Math.max(...others.map((o) => o.text.length)) * 1.8)
          longestBias++;
      }
      for (const q of l.reading.questions) {
        const correct = q.options[q.correct];
        if (!correct || correct.trim() === "")
          fail("T6", `${key} reading question "${q.q}" has an empty correct option`);
      }
    }
  }
  const pct = Math.round((longestBias / Math.max(1, rounds)) * 100);
  console.log(
    `T6 answerability — ${rounds} game rounds; ${pct}% have a markedly longest correct option`,
  );
  if (pct > 60)
    warn("T6", `${pct}% of rounds let a learner win by always picking the longest option`);
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
  // Instructions aimed at the learner. Wrong whoever is speaking.
  const INSTRUCTION = new RegExp(
    [
      "what do you say\\b",
      "what is the best reply\\b",
      "which reply is best\\b",
      "what do you (?:do|offer|add|promise|tell)\\b",
      "\\byou (?:cannot|have just|are going to|still have|want to offer|need details)\\b",
    ].join("|"),
    "i",
  );
  // Third-person narration of the scene. Wrong in a GUEST turn — a guest does
  // not describe themselves that way — but correct in a turn labelled
  // colleague or manager, where reporting ABOUT a guest is the skill itself
  // ("Room 812, a guest is unresponsive and he is breathing").
  const NARRATION = new RegExp(
    [
      "\\b(?:the|a) guest (?:says|asks|doubts|wants|demands|mentions|is |politely)",
      "\\byour (?:colleague|manager|supervisor) (?:arrives|asks)\\b",
    ].join("|"),
    "i",
  );
  const isMeta = (text: string, role?: string) =>
    INSTRUCTION.test(text) || (role !== "colleague" && role !== "manager" && NARRATION.test(text));
  let checked = 0;
  for (const [key, wk] of Object.entries(ALL_WEEKS)) {
    if (wk.weekNumber > AUTHORED_MAX) continue;
    for (const l of wk.lessons) {
      for (const r of l.game) {
        checked++;
        if (isMeta(r.prompt, r.speakerRole))
          fail(
            "T6b",
            `${key} game prompt is a task description, not something a guest says: "${r.prompt}"`,
          );
        for (const o of r.options) {
          if (isMeta(o.text, r.speakerRole))
            fail(
              "T6b",
              `${key} game option is a task description, not a spoken reply: "${o.text}"`,
            );
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
  let checked = 0;
  for (const dep of DEPS) {
    for (let w = 1; w <= AUTHORED_MAX; w++) {
      const content = getWeekContent(dep, w)!;
      // A week not authored yet cannot break a screen nobody can reach.
      if (!content) continue;
      checked++;
      const fw = findWeek(dep, w);
      if (!fw) {
        fail(
          "T7",
          `curriculum.findWeek(${dep},${w}) returned nothing — week hub would render empty`,
        );
        continue;
      }
      if (fw.title_vi !== content.weekTitleVi)
        fail(
          "T7",
          `${dep}-${w} hub title "${fw.title_vi}" ≠ content title "${content.weekTitleVi}"`,
        );
      if (fw.lessons.length !== 4)
        fail("T7", `${dep}-${w} hub shows ${fw.lessons.length} sub-lessons (want 4)`);
      fw.lessons.forEach((t, i) => {
        if (t !== content.lessons[i].titleVi)
          fail(
            "T7",
            `${dep}-${w} sub-lesson ${i + 1} is "${t}" but content says "${content.lessons[i].titleVi}"`,
          );
      });

      // Handbook derivation must produce something worth printing.
      const patterns = new Set([
        ...content.lessons.flatMap((l) => l.speaking.map((s) => s.targetResponse)),
        ...content.lessons.flatMap((l) => l.grammar.map((g) => g.polite)),
      ]);
      if (patterns.size < 8)
        fail("T7", `${dep}-${w} handbook would show only ${patterns.size} patterns`);
    }
  }
  console.log(`T7 UI contracts — timeline/hub/handbook inputs cross-checked for ${checked} weeks`);
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
