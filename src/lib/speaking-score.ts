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

// Pass thresholds vary by week. A zero-beginner should not have to nail
// 80% of a four-word utterance to earn a star, and the open role-play
// weeks (39-40) reward a valid improvised answer that hits the key ideas
// rather than reciting one fixed reference sentence in order.
export function passThresholds(week: string | number): { accPct: number; orderRatio: number } {
  const n = typeof week === "string" ? parseInt(week, 10) : week;
  if (n >= 39) return { accPct: 50, orderRatio: 0 }; // open role-play: idea coverage, any order
  if (n <= 14) return { accPct: 60, orderRatio: 0.4 }; // Phase 0-1: gentle floor for beginners
  return { accPct: 80, orderRatio: 0.6 }; // A2+ default
}

/** One place that decides whether an utterance passed, so the drill and the
 *  exam cannot disagree. Graded against the week the SENTENCE came from —
 *  a checkpoint paper mixes weeks, and grading a week-16 line at week-40's
 *  lenient open-role-play threshold would make the final exam the easiest
 *  speaking in the course. */
export function utterancePassed(spoken: string, target: string, sourceWeek: string | number) {
  const th = passThresholds(sourceWeek);
  const cmp = compareWords(spoken, target);
  return {
    ...cmp,
    passed: Math.round(cmp.accuracy * 100) >= th.accPct && cmp.orderRatio >= th.orderRatio,
    threshold: th,
  };
}
