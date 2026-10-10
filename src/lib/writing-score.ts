import type { RequiredIdea } from "@/lib/content/week-content";
import { isContentToken, normalize } from "@/lib/speaking-score";

/** Shared scorer for the free-text suites (Writing, Mediation) and for an
 *  open spoken turn — one with no model sentence to match.
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
  /** Written mode only. A transcript has no full stops to count. */
  minSentences?: number;
  /** Phrases that block the answer outright, however complete it is. */
  avoid?: string[];
  /** Phrases that block the answer only when the learner ASSERTS them.
   *
   *  `avoid` matches a phrase wherever it stands, and for a public reply that
   *  is right: "this was not our fault" is as wrong as "our fault". For a
   *  safety line it is backwards. The Spa and Guest Relations must-be-right
   *  answer is "I cannot say it is safe" — which contains, word for word, the
   *  phrase the task exists to forbid. A phrase listed here is let through
   *  when the learner is declining to say it (see `isAsserted`). */
  avoidAsserted?: string[];
  /** "spoken": `draft` is a speech transcript — no punctuation, numbers as the
   *  recogniser wrote them, the hesitations of someone talking. */
  mode?: "written" | "spoken";
};

export type ScoreResult = {
  /** Per-idea hit flags, in the order the ideas were declared. */
  hits: boolean[];
  coveragePct: number;
  /** Final score — coverage, reduced when the writing gates are not met. */
  scorePct: number;
  passed: boolean;
  wordCount: number;
  /** 0 in spoken mode, where it is not measured. */
  sentenceCount: number;
  /** Vietnamese explanation of the gate that blocked a pass, if any. */
  blockedByVi: string | null;
};

export const PASS_PCT = 70;

/** Repetition floor. Natural English prose sits far above this; a pasted
 *  keyword list or a padded "a a a a" filler sits below it. */
const MIN_DISTINCT_RATIO = 0.5;

/** Spoken mode: at least one token in five is grammar, not content.
 *
 *  Written mode tells prose from a word list by counting sentences and by
 *  refusing a word said twice in a row. A transcript defeats both: it has no
 *  full stops, and "I — I will ask" is how a person talks. What a word list
 *  still cannot fake is glue. Measured with scripts/probes/prose.ts on weeks
 *  23–40, production tokeniser: of 2,350 two-sentence answers built from the
 *  course's own model lines the LOWEST share of non-content tokens is 0.21
 *  (1st percentile 0.31, median 0.50), while "sorry kitchen chef contact call
 *  email" sits at 0.17 and a list of bare nouns at 0.00.
 *
 *  What this does NOT catch is broken English with the ideas in it: "sorry
 *  room not ready twenty minutes manager come now please wait" carries enough
 *  small words to clear the floor. This scorer measures whether the ideas
 *  were said, not how well; that is why an open turn is practice, and the
 *  milestone is marked against a rubric instead. */
export const MIN_GLUE_RATIO = 0.2;

/** Both modes: no more than three tokens in four may be checklist phrases.
 *
 *  The gates above stop a list of bare keywords. They did not stop a list of
 *  the accepted PHRASINGS, which is longer, varied, and full of small words:
 *  "sorry apologise not available unavailable another therapist different
 *  therapist no charge no extra charge…" scored 100% and passed the Spa
 *  mediation task as a written answer, and the Front Office one. Measured on
 *  all ten free-text tasks: a model answer is at most 0.35 checklist, a terse
 *  honest one ("I am sorry, sir. Your room is not ready yet. It needs twenty
 *  more minutes.") 0.47, and every list of accepted phrasings exactly 1.00. */
export const MAX_IDEA_DENSITY = 0.75;

const NOT_A_LIST_VI = "Hãy trả lời thành câu của chính bạn — đừng xếp các cụm từ khoá cạnh nhau.";

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

// ── Spoken mode ────────────────────────────────────────────────────────────

const FILLERS = new Set(["uh", "um", "er", "erm", "ah", "hmm", "mm", "eh"]);

/** A transcript as the speaking scorer reads one (contractions opened, digits
 *  spelt, US spellings folded), minus what hesitation adds: fillers, and a
 *  word said again straight after itself. */
function spokenTokens(s: string): string[] {
  const out: string[] = [];
  for (const t of normalize(s)) {
    if (FILLERS.has(t)) continue;
    if (out.length > 0 && out[out.length - 1] === t) continue;
    out.push(t);
  }
  return out;
}

/** Every index at which `needle` starts inside `hay`. */
function occurrences(hay: string[], needle: string[]): number[] {
  const at: number[] = [];
  if (needle.length === 0) return at;
  for (let i = 0; i + needle.length <= hay.length; i++) {
    let same = true;
    for (let j = 0; j < needle.length; j++)
      if (hay[i + j] !== needle[j]) {
        same = false;
        break;
      }
    if (same) at.push(i);
  }
  return at;
}

/** How much of the answer is the checklist itself: the share of its tokens
 *  that sit inside an accepted expression of some idea, counting every
 *  alternative an idea lists. An answer conveys an idea once, in its own
 *  sentence; a list of the accepted phrasings is nothing else. */
export function ideaDensity(draft: string, ideas: RequiredIdea[]): number {
  const tokens = spokenTokens(draft);
  if (tokens.length === 0) return 0;
  const covered = new Array<boolean>(tokens.length).fill(false);
  for (const idea of ideas)
    for (const expr of idea.any) {
      const needle = spokenTokens(expr);
      for (const at of occurrences(tokens, needle))
        for (let j = 0; j < needle.length; j++) covered[at + j] = true;
    }
  return covered.filter(Boolean).length / tokens.length;
}

const NEGATORS = new Set(["not", "cannot", "never", "unable", "nobody"]);
/** What a refusal to vouch is built on: "cannot SAY", "not SURE", "unable to
 *  CONFIRM". A negator alone is not enough — "do not worry, it is safe" has
 *  one, and is exactly the reassurance the phrase is banned to stop. */
const REPORTING = new Set([
  "say",
  "tell",
  "promise",
  "guarantee",
  "confirm",
  "know",
  "sure",
  "certain",
  "judge",
  "decide",
  "advise",
  "answer",
]);
/** With no punctuation, these are where one clause stops and the next starts.
 *  "I am not a doctor but it is safe": the "not" belongs to the other side. */
const CLAUSE_BREAK = new Set(["but", "and", "so", "because", "however", "although", "then", "or"]);
const LOOK_BACK = 8;

/** Is the phrase starting at `at` something the speaker is claiming?
 *
 *  Not claimed: it is the object of a refusal ("I cannot say it is safe", "I
 *  am not sure it is safe"), or it stands in a question or a condition being
 *  handed on ("you asked whether it is safe", "if it is safe, the lifeguard
 *  raises the green flag"). Everything else is a claim. */
function isAsserted(tokens: string[], at: number): boolean {
  if (tokens[at - 1] === "whether" || tokens[at - 1] === "if") return false;
  if (tokens[at - 1] === "that" && (tokens[at - 2] === "whether" || tokens[at - 2] === "if"))
    return false;
  // Walking backwards from the phrase, the reporting word is met first and its
  // negator second: "cannot … say | it is safe". A negator with no reporting
  // word between it and the phrase ("do not worry") vouches for nothing.
  let reporting = false;
  for (let i = at - 1; i >= 0 && i >= at - LOOK_BACK; i--) {
    const t = tokens[i];
    if (CLAUSE_BREAK.has(t)) break;
    if (REPORTING.has(t)) reporting = true;
    else if (NEGATORS.has(t) && reporting) return false;
  }
  return true;
}

/** Does `text` claim `expr` anywhere? Written text keeps its sentence ends, and
 *  a refusal does not reach across one: "I cannot say. It is safe." claims it.
 *  A transcript has none, so there the whole answer is one stretch — the one
 *  thing this check cannot see, and why a must-be-right exam slot is never
 *  judged by it alone. */
function claims(text: string, expr: string, written: boolean): boolean {
  const needle = spokenTokens(expr);
  const stretches = written ? text.split(/[.!?;:\n]+/) : [text];
  return stretches.some((stretch) => {
    const tokens = spokenTokens(stretch);
    return occurrences(tokens, needle).some((at) => isAsserted(tokens, at));
  });
}

function scoreSpoken({ draft, ideas, minWords, avoid, avoidAsserted }: ScoreInput): ScoreResult {
  const tokens = spokenTokens(draft);
  const wordCount = tokens.length;
  const distinctRatio = wordCount === 0 ? 0 : new Set(tokens).size / wordCount;
  const glueRatio =
    wordCount === 0 ? 0 : tokens.filter((t) => !isContentToken(t)).length / wordCount;

  const said = (expr: string) => occurrences(tokens, spokenTokens(expr));
  const hits = ideas.map((idea) => idea.any.some((expr) => said(expr).length > 0));
  const coveragePct =
    ideas.length === 0 ? 0 : Math.round((hits.filter(Boolean).length / ideas.length) * 100);

  let blockedByVi: string | null = null;
  if (wordCount < minWords)
    blockedByVi = `Câu trả lời cần ít nhất ${minWords} từ (bạn vừa nói ${wordCount}).`;
  else if (distinctRatio < MIN_DISTINCT_RATIO || glueRatio < MIN_GLUE_RATIO)
    blockedByVi = "Hãy nói thành câu đầy đủ như đang nói với khách — đừng đọc một dãy từ khoá.";
  else if (ideaDensity(draft, ideas) > MAX_IDEA_DENSITY) blockedByVi = NOT_A_LIST_VI;
  else {
    const banned =
      (avoid ?? []).find((expr) => said(expr).length > 0) ??
      (avoidAsserted ?? []).find((expr) => claims(draft, expr, false));
    if (banned) blockedByVi = `Câu trả lời không được có cụm: "${banned}".`;
    else {
      const missed = ideas.find((idea, i) => idea.required && !hits[i]);
      if (missed) blockedByVi = `Câu trả lời bắt buộc phải có ý: "${missed.labelVi}".`;
    }
  }

  const scorePct = blockedByVi ? Math.min(coveragePct, PASS_PCT - 1) : coveragePct;
  return {
    hits,
    coveragePct,
    scorePct,
    passed: !blockedByVi && coveragePct >= PASS_PCT,
    wordCount,
    sentenceCount: 0,
    blockedByVi,
  };
}

// ── Written mode ───────────────────────────────────────────────────────────

export function scoreFreeText(input: ScoreInput): ScoreResult {
  if (input.mode === "spoken") return scoreSpoken(input);
  const { draft, ideas, minWords, minSentences = 1, avoid, avoidAsserted } = input;
  const tokens = words(draft);
  const wordCount = tokens.length;
  const sentenceCount = draft
    .split(/[.!?]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0).length;
  const distinctRatio = wordCount === 0 ? 0 : new Set(tokens).size / wordCount;
  // "Sorry sorry sorry. Kitchen kitchen kitchen chef. Contact contact call
  // email…" cleared the ratio above and scored 100% on a Phase 4 task: a word
  // said twice in a row is a keyword list, not prose, and twice is enough.
  const stutters = tokens.filter((t, i) => i > 0 && t === tokens[i - 1]).length;

  const hits = ideas.map((idea) => idea.any.some((expr) => containsExpression(draft, expr)));
  const coveragePct =
    ideas.length === 0 ? 0 : Math.round((hits.filter(Boolean).length / ideas.length) * 100);

  let blockedByVi: string | null = null;
  if (wordCount < minWords)
    blockedByVi = `Bài viết cần ít nhất ${minWords} từ (hiện có ${wordCount}).`;
  else if (sentenceCount < minSentences)
    blockedByVi = `Cần viết thành ít nhất ${minSentences} câu hoàn chỉnh.`;
  else if (distinctRatio < MIN_DISTINCT_RATIO || stutters >= 2)
    blockedByVi =
      "Bài viết lặp lại quá nhiều từ giống nhau — hãy viết thành câu tự nhiên, đừng liệt kê từ khoá.";
  else if (ideaDensity(draft, ideas) > MAX_IDEA_DENSITY) blockedByVi = NOT_A_LIST_VI;
  else {
    // A forbidden phrase blocks the answer outright. Coverage cannot buy its way
    // past this: a public reply that admits fault is wrong however complete it is.
    const banned =
      (avoid ?? []).find((expr) => containsExpression(draft, expr)) ??
      (avoidAsserted ?? []).find((expr) => claims(draft, expr, true));
    // Neutral wording: the Mediation suite (a spoken relay to a guest) blocks
    // through this line too, and it is not a public reply.
    if (banned) blockedByVi = `Câu trả lời không được có cụm: "${banned}".`;
    else {
      // An idea marked `required` cannot be traded for the others.
      const missed = ideas.find((idea, i) => idea.required && !hits[i]);
      if (missed) blockedByVi = `Câu trả lời bắt buộc phải có ý: "${missed.labelVi}".`;
    }
  }

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
