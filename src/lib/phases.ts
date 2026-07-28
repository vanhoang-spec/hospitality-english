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
