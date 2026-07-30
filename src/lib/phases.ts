// The five-phase frame of docs/curriculum-level-matrix.md, in one place.
//
// scripts/verify-content.ts keeps its own phase table because it needs the
// authoring caps (sentence length, vocabulary quotas) that only matter at
// content-write time. What lives here is what the running app needs: where
// each phase begins and ends, which week carries its checkpoint test, and
// the mark that counts as passing that test.
//
// Both copies describe the same five ranges; if the matrix doc ever moves a
// boundary, both must move with it.

export type Phase = {
  /** 0-4, the phase numbers used throughout the curriculum doc. */
  index: number;
  from: number;
  to: number;
  /** The week carrying this phase's checkpoint test — always its last week. */
  checkpointWeek: number;
  band: string;
  nameVi: string;
};

export const PHASES: readonly Phase[] = [
  { index: 0, from: 1, to: 6, checkpointWeek: 6, band: "pre-A1", nameVi: "Nền tảng sống còn" },
  { index: 1, from: 7, to: 14, checkpointWeek: 14, band: "A1", nameVi: "Giao tiếp câu đơn" },
  { index: 2, from: 15, to: 22, checkpointWeek: 22, band: "A2.1", nameVi: "Nghiệp vụ chuẩn" },
  { index: 3, from: 23, to: 30, checkpointWeek: 30, band: "A2+", nameVi: "Dịch vụ chủ động" },
  { index: 4, from: 31, to: 40, checkpointWeek: 40, band: "B1.1", nameVi: "Xử lý & thuyết phục" },
];

export const CHECKPOINT_WEEKS: readonly number[] = PHASES.map((p) => p.checkpointWeek);

/** The pass mark for a checkpoint test — the single threshold in the app.
 *  It decides three things at once, and they must not drift apart: whether
 *  the test screen congratulates the learner, whether the attempt is
 *  recorded as mastered, and whether the next phase unlocks. */
export const CHECKPOINT_PASS_PCT = 70;

/** The checkpoint paper's fixed composition. Lives here rather than in the
 *  suite because the pass RULE below is written against it, and a mix that
 *  drifts from its floors silently changes what passing means. */
export const CHECKPOINT_MIX = { vocab: 8, grammar: 4, listening: 4, reading: 4 } as const;
export type CheckpointConstruct = keyof typeof CHECKPOINT_MIX;
export const CHECKPOINT_TOTAL_QUESTIONS = Object.values(CHECKPOINT_MIX).reduce((a, b) => a + b, 0);

export const CONSTRUCT_LABEL_VI: Record<CheckpointConstruct, string> = {
  vocab: "Từ vựng",
  grammar: "Ngữ pháp",
  listening: "Nghe hiểu",
  reading: "Đọc hiểu",
};

/** Every skill must clear half its block, on top of the overall mark.
 *
 *  Without this, 70% overall was reachable while scoring ZERO on a whole
 *  skill: vocab 8 + grammar 4 + reading 4 = 16/20 = 80% with 0/4 listening
 *  passed a learner up a CEFR band who had understood nothing they heard.
 *  The floors are deliberately set so their sum (4+2+2+2 = 10) sits below
 *  the 14 the overall mark already demands — they close the hole without
 *  raising the bar for a learner who is evenly competent. */
export const CHECKPOINT_BLOCK_FLOOR_PCT = 50;

export function blockFloor(construct: CheckpointConstruct): number {
  return Math.ceil((CHECKPOINT_MIX[construct] * CHECKPOINT_BLOCK_FLOOR_PCT) / 100);
}

export type ConstructTally = {
  construct: CheckpointConstruct;
  correct: number;
  total: number;
  /** False when the paper could not actually deliver this block on this
   *  device — an unheard listening item must cost marks, never a lockout. */
  deliverable: boolean;
};

export function blockCleared(t: ConstructTally): boolean {
  return !t.deliverable || t.correct >= blockFloor(t.construct);
}

/** The whole pass rule in one place: the overall mark AND every deliverable
 *  block's floor. */
export function checkpointPassed(scorePct: number, tallies: readonly ConstructTally[]): boolean {
  return scorePct >= CHECKPOINT_PASS_PCT && tallies.every(blockCleared);
}

/** The oral half of a checkpoint.
 *
 *  The curriculum calls speaking the central output and every week carries a
 *  "nói được…" can-do, yet progression used to be decided by a paper with no
 *  spoken item in it: a learner could reach B1.1 without ever opening their
 *  mouth. Five utterances drawn from across the phase, of which three must
 *  pass — the written 70% and the per-skill floors are the demanding part,
 *  and the oral half is there to make the claim "can speak" true at all,
 *  not to become the hardest gate in the course. */
export const CHECKPOINT_ORAL_ITEMS = 5;
export const CHECKPOINT_ORAL_PASS_MIN = 3;

/** How long a learner waits after a FAILED checkpoint sitting.
 *
 *  A checkpoint paper reshuffles from a large pool every attempt (55-156
 *  vocabulary items per phase), so unlimited immediate retakes let a learner
 *  re-roll the dice until a lucky draw passes, and a pass recorded that way
 *  is indistinguishable from competence. This is a rate limit, not a
 *  barrier: it does not stop a determined re-roller, it stops the paper from
 *  being a slot machine, and the per-skill floors above are what actually
 *  make a lucky pass unlikely. Kept short on purpose — these are shift
 *  workers who may have one session per day, and an honest second try must
 *  stay inside the same sitting. A pass is never subject to it. */
export const CHECKPOINT_RETAKE_COOLDOWN_MIN = 20;

export function weekNum(week: string | number): number {
  return typeof week === "string" ? parseInt(week, 10) : week;
}

export function phaseOfWeek(week: string | number): Phase | null {
  const n = weekNum(week);
  return PHASES.find((p) => n >= p.from && n <= p.to) ?? null;
}

export function isCheckpointWeek(week: string | number): boolean {
  return CHECKPOINT_WEEKS.includes(weekNum(week));
}

/** Every week of the phase a checkpoint belongs to — the pool a checkpoint
 *  paper draws from, since the test assesses the phase, not its last week. */
export function weeksInPhase(week: string | number): number[] {
  const phase = phaseOfWeek(week);
  if (!phase) return [weekNum(week)];
  const weeks: number[] = [];
  for (let w = phase.from; w <= phase.to; w++) weeks.push(w);
  return weeks;
}
