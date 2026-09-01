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

export function normalize(s: string) {
  return s
    .toLowerCase()
    .replace(/[^\w\s']/g, " ")
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

/** Which value tokens this target carries. An authored override wins so a
 *  frame can exempt a token that is genuinely formulaic in its sentence
 *  ("ONE moment" is a chunk, not a count). */
export function requiredValueTokens(target: string, override?: string[]): string[] {
  if (override) return override.map((t) => t.toLowerCase());
  return [...new Set(normalize(target).filter((t) => VALUE_TOKENS.has(t)))];
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

export function compareWords(spoken: string, target: string) {
  const a = normalize(spoken);
  const b = normalize(target);
  const used = new Set<number>();
  const correctIdx = new Set<number>();
  for (let i = 0; i < b.length; i++) {
    for (let j = 0; j < a.length; j++) {
      if (!used.has(j) && a[j] === b[i]) {
        used.add(j);
        correctIdx.add(i);
        break;
      }
    }
  }
  const accuracy = b.length === 0 ? 0 : correctIdx.size / b.length;
  // Order-aware check: longest common subsequence of the two word
  // streams, as a fraction of the target length. Bag-matching alone can
  // be gamed by reciting the right words in any order — real speech has
  // to follow the sentence's word order too.
  const orderRatio = b.length === 0 ? 0 : lcsLength(a, b) / b.length;
  return { correctIdx, accuracy, orderRatio, words: b };
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
  if (n <= 14) return { accPct: 60, orderRatio: 0.4 };
  // Phase 2 — the step to A2 spread across its eight weeks (65/70/75/80),
  // rather than delivered in one jump at week 15.
  if (n <= 22) {
    const step = Math.floor((n - 15) / 2); // 0,0,1,1,2,2,3,3
    // Rounded: 0.45 + 3 * 0.05 lands on 0.6000000000000001 in binary
    // floating point, which reads as a fall against week 23's flat 0.6.
    return { accPct: 65 + step * 5, orderRatio: Math.round((0.45 + step * 0.05) * 100) / 100 };
  }
  // A2+ and B1.1 — full standard, and it stays there to the last week.
  return { accPct: 80, orderRatio: 0.6 };
}

/** One place that decides whether an utterance passed, so the drill and the
 *  exam cannot disagree. Graded against the week the SENTENCE came from —
 *  a checkpoint paper mixes weeks, and grading a week-16 line at week-40's
 *  lenient open-role-play threshold would make the final exam the easiest
 *  speaking in the course. */
export function utterancePassed(
  spoken: string,
  target: string,
  sourceWeek: string | number,
  requiredTokens?: string[],
) {
  const th = passThresholds(sourceWeek);
  const cmp = compareWords(spoken, target);
  // A value token said wrong or not at all fails the utterance regardless of
  // the percentage — see VALUE_TOKENS. Checked against the normalized spoken
  // stream, so ASR digits ("205" → two oh five) still count.
  const spokenSet = new Set(normalize(spoken));
  const missingRequired = requiredValueTokens(target, requiredTokens).filter(
    (t) => !spokenSet.has(t),
  );
  return {
    ...cmp,
    missingRequired,
    passed:
      Math.round(cmp.accuracy * 100) >= th.accPct &&
      cmp.orderRatio >= th.orderRatio &&
      missingRequired.length === 0,
    threshold: th,
  };
}
