import type { OpenTurn } from "@/lib/content/week-content";
import { normalize } from "@/lib/speaking-score";
import { scoreFreeText, type ScoreResult } from "@/lib/writing-score";

/** How long an open answer may be, by week — the "Một lượt nói mở" row of the
 *  weeks 41–80 outline (docs/curriculum-41-80.md, section 2). A ceiling on the
 *  MODEL answer: a learner may say more, but a model that needs more words
 *  than this is asking for more than the phase teaches. */
export function openTurnMaxWords(week: number): number {
  if (week <= 50) return 40;
  if (week <= 60) return 45;
  if (week <= 70) return 60;
  return 70;
}

/** Nothing shorter than this is two sentences. */
export const OPEN_TURN_MIN_WORDS_FLOOR = 10;

/** The one place an open turn is marked, so the weekly drill and the exam
 *  cannot come to disagree about it. `typed` is the fallback for a device that
 *  cannot hear; the answer is then read as writing, punctuation and all. */
export function scoreOpenTurn(
  turn: OpenTurn,
  said: string,
  how: "spoken" | "typed" = "spoken",
): ScoreResult {
  return scoreFreeText({
    draft: said,
    ideas: turn.mustConvey,
    minWords: turn.minWords,
    minSentences: 1,
    avoid: turn.mustAvoid,
    avoidAsserted: turn.mustAvoidAsserted,
    mode: how === "spoken" ? "spoken" : "written",
  });
}

/** What a recogniser hands back for a sentence: no capitals, no punctuation. */
const asTranscript = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s'%]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

/** Does Vietnamese instruction text contain an English expression the learner
 *  is supposed to find for themselves? One-word expressions of three letters
 *  or fewer are skipped: "no" and "an" are also Vietnamese syllables. */
function leaks(textVi: string, expression: string): boolean {
  const e = expression.trim().toLowerCase();
  if (!e.includes(" ") && e.length <= 3) return false;
  const escaped = e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/\s+/g, "\\s+");
  return new RegExp(`(^|[^\\p{L}\\p{N}])${escaped}($|[^\\p{L}\\p{N}])`, "iu").test(textVi);
}

/** Everything wrong with an open turn as written, in plain English for the
 *  author. Empty means it can ship. The content gate runs this on every open
 *  turn in the course, and it calls the same scorer the learner meets. */
export function openTurnProblems(turn: OpenTurn, week: number): string[] {
  const problems: string[] = [];
  const ideas = turn.mustConvey;

  if (ideas.length < 3 || ideas.length > 4)
    problems.push(`has ${ideas.length} ideas; an open turn carries 3 or 4`);
  if (ideas.some((i) => i.any.length === 0)) problems.push("has an idea with no accepted wording");
  if (ideas.some((i) => i.any.length === 1))
    problems.push("has an idea with a single accepted wording — that is a sentence to say back");
  if (turn.minWords < OPEN_TURN_MIN_WORDS_FLOOR)
    problems.push(`minWords ${turn.minWords} is under ${OPEN_TURN_MIN_WORDS_FLOOR}`);

  const modelWords = normalize(turn.modelAnswer).length;
  const cap = openTurnMaxWords(week);
  if (modelWords > cap)
    problems.push(`model answer is ${modelWords} words; week ${week} allows ${cap}`);
  if (modelWords < turn.minWords)
    problems.push(`model answer is ${modelWords} words, under its own minWords ${turn.minWords}`);

  // The course's own answer has to pass the course's own marker, heard and typed.
  for (const how of ["spoken", "typed"] as const) {
    const r = scoreOpenTurn(
      turn,
      how === "spoken" ? asTranscript(turn.modelAnswer) : turn.modelAnswer,
      how,
    );
    if (!r.passed)
      problems.push(
        `model answer does not pass when ${how}: ${r.blockedByVi ?? `covers ${r.coveragePct}% of the ideas`}`,
      );
  }

  // The instructions must not hand over the English they ask for.
  for (const idea of ideas) {
    const leaked = idea.any.find((expr) => leaks(idea.labelVi, expr) || leaks(turn.taskVi, expr));
    if (leaked) problems.push(`"${leaked}" is printed in the instructions for the idea it scores`);
  }

  // Three answers that take no English and must not pass.
  if (turn.prompt && scoreOpenTurn(turn, asTranscript(turn.prompt)).passed)
    problems.push("saying the other person's line back passes");
  if (turn.follows && scoreOpenTurn(turn, asTranscript(turn.follows)).passed)
    problems.push("saying one's own previous line again passes");
  const phraseList = ideas.flatMap((i) => i.any.slice(0, 2)).join(" ");
  if (scoreOpenTurn(turn, `${phraseList} ${phraseList}`).passed)
    problems.push("reading the accepted wordings out as a list passes");

  if (turn.risk && !turn.mustAvoid?.length && !turn.mustAvoidAsserted?.length)
    problems.push("is marked risk but forbids nothing");

  return problems;
}
