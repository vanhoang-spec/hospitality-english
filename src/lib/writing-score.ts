import type { RequiredIdea } from "@/lib/content/week-content";

/** Shared scorer for the two free-text suites (Writing, Mediation).
 *
 *  The first version scored `draft.toLowerCase().includes(keyword)` over a
 *  handful of literal keywords. Executing it proved the measure invalid in
 *  both directions: "sorry suite same sorry suite same" scored 100% and
 *  passed, while a correct 30-word professional answer that used
 *  "apologise", "identical" and "at no extra cost" scored 0% and failed.
 *
 *  This version fixes both:
 *   · each required IDEA accepts any of several expressions, matched on
 *     word boundaries, so paraphrase scores;
 *   · coverage alone cannot pass. The answer must also be long enough,
 *     be made of real sentences, and not be the same few words repeated —
 *     which is what keyword-stuffing looks like mechanically.
 */
export type ScoreInput = {
  draft: string;
  ideas: RequiredIdea[];
  minWords: number;
  minSentences: number;
};

export type ScoreResult = {
  /** Per-idea hit flags, in the order the ideas were declared. */
  hits: boolean[];
  coveragePct: number;
  /** Final score — coverage, reduced when the writing gates are not met. */
  scorePct: number;
  passed: boolean;
  wordCount: number;
  sentenceCount: number;
  /** Vietnamese explanation of the gate that blocked a pass, if any. */
  blockedByVi: string | null;
};

export const PASS_PCT = 70;

/** Repetition floor. Natural English prose sits far above this; a pasted
 *  keyword list or a padded "a a a a" filler sits below it. */
const MIN_DISTINCT_RATIO = 0.5;

function words(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s'-]/gu, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/** Word-boundary containment, so "charge" does not fire on "charger" and
 *  "60" does not fire on "160". Multi-word expressions are matched as a
 *  phrase with the same boundary rule at each end. */
function containsExpression(haystack: string, expression: string): boolean {
  const escaped = expression
    .trim()
    .toLowerCase()
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    .replace(/\s+/g, "\\s+");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, "iu").test(
    haystack.toLowerCase(),
  );
}

export function scoreFreeText({ draft, ideas, minWords, minSentences }: ScoreInput): ScoreResult {
  const tokens = words(draft);
  const wordCount = tokens.length;
  const sentenceCount = draft
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0).length;
  const distinctRatio = wordCount === 0 ? 0 : new Set(tokens).size / wordCount;

  const hits = ideas.map((idea) => idea.any.some((expr) => containsExpression(draft, expr)));
  const coveragePct =
    ideas.length === 0 ? 0 : Math.round((hits.filter(Boolean).length / ideas.length) * 100);

  let blockedByVi: string | null = null;
  if (wordCount < minWords)
    blockedByVi = `Bài viết cần ít nhất ${minWords} từ (hiện có ${wordCount}).`;
  else if (sentenceCount < minSentences)
    blockedByVi = `Cần viết thành ít nhất ${minSentences} câu hoàn chỉnh.`;
  else if (distinctRatio < MIN_DISTINCT_RATIO)
    blockedByVi =
      "Bài viết lặp lại quá nhiều từ giống nhau — hãy viết thành câu tự nhiên, đừng liệt kê từ khoá.";

  // A blocked answer still shows its coverage so the learner can see which
  // ideas landed, but it is capped below the pass mark.
  const scorePct = blockedByVi ? Math.min(coveragePct, PASS_PCT - 1) : coveragePct;

  return {
    hits,
    coveragePct,
    scorePct,
    passed: !blockedByVi && coveragePct >= PASS_PCT,
    wordCount,
    sentenceCount,
    blockedByVi,
  };
}
