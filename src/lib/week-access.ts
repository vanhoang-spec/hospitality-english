// WEEK GATING — a learner reaches the next phase by passing the checkpoint
// test that closes the current one (docs/curriculum-level-matrix.md).
//
// Gating is per department, because progress is: passing the Front Office
// checkpoint says nothing about a learner's Housekeeping vocabulary, and
// lesson_progress is keyed by department for the same reason.
//
// This is pacing, not access control. The content is not secret and every
// learner can already write their own lesson_progress rows (that is how
// suites record results at all), so the gate is enforced where it changes
// behaviour — in the UI — and deliberately not duplicated in RLS.

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useProfile } from "@/lib/auth";
import { CHECKPOINT_PASS_PCT, PHASES, phaseOfWeek, weekNum, type Phase } from "@/lib/phases";

export function weekAccessQueryKey(userId: string | undefined, dep: string) {
  return ["week-access", userId, dep.toUpperCase()] as const;
}

/**
 * The highest phase index open to a learner who has passed `passed`.
 *
 * Passing the checkpoint of phase i opens phase i+1. The frontier is the
 * FURTHEST checkpoint passed rather than the longest unbroken chain from
 * phase 0: learners who worked through week 22 while gating was off must
 * not be locked out of weeks they have already done because no week-6 row
 * exists for them. Skipping forward is still impossible — each phase is
 * only reachable by passing the test that precedes it.
 */
export function unlockedThroughPhase(passed: readonly number[]): number {
  let frontier = 0;
  for (const phase of PHASES) {
    if (passed.includes(phase.checkpointWeek)) frontier = Math.max(frontier, phase.index + 1);
  }
  return Math.min(frontier, PHASES.length - 1);
}

export function isWeekUnlocked(week: string | number, passed: readonly number[]): boolean {
  const phase = phaseOfWeek(week);
  if (!phase) return false;
  return phase.index <= unlockedThroughPhase(passed);
}

/** The one checkpoint standing between the learner and the next phase, or
 *  null once every phase is open. This is the actionable next step, so a
 *  locked week two phases ahead still points at the test to sit now. */
export function nextCheckpoint(passed: readonly number[]): Phase | null {
  const frontier = unlockedThroughPhase(passed);
  if (frontier >= PHASES.length - 1 && passed.includes(PHASES[PHASES.length - 1].checkpointWeek))
    return null;
  return PHASES[frontier] ?? null;
}

async function fetchPassedCheckpoints(userId: string, dep: string): Promise<number[]> {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("week_number, mastered, score_pct")
    .eq("user_id", userId)
    .eq("department_id", dep.toUpperCase())
    .eq("suite", "weektest");
  if (error) throw error;
  return (data ?? [])
    .filter((r) => r.mastered || (r.score_pct ?? 0) >= CHECKPOINT_PASS_PCT)
    .map((r) => r.week_number);
}

export type WeekAccess = {
  /** False until the learner's checkpoint history is known. Callers that
   *  block content must wait for it; callers that merely decorate a list
   *  should render unlocked meanwhile, so no lock flickers on every nav. */
  ready: boolean;
  isUnlocked: (week: string | number) => boolean;
  /** Highest phase open right now. */
  phaseIndex: number;
  /** The checkpoint to pass next, or null when the whole path is open. */
  next: Phase | null;
  passed: readonly number[];
};

export function useWeekAccess(dep: string): WeekAccess {
  const { session, loading: sessionLoading } = useSession();
  const userId = session?.user.id;
  const { data: profile, isPending: profilePending } = useProfile(userId);
  const { data: passed, isSuccess } = useQuery({
    queryKey: weekAccessQueryKey(userId, dep),
    queryFn: () => fetchPassedCheckpoints(userId!, dep),
    enabled: !!userId,
    // Held fresh for a while on purpose. The suite records a pass with a
    // fire-and-forget upsert and useMarkCheckpointPassed patches this cache
    // straight away; with the default staleTime of 0, navigating to the
    // week that just unlocked would refetch before that write is readable
    // and lock it again. Checkpoint history changes at most once per sitting,
    // so there is nothing to gain from refetching it on every mount.
    staleTime: 5 * 60_000,
  });

  // Admins and trainers need to read any week to review or teach it, so the
  // gate applies to members only.
  const bypass = !!profile && profile.role !== "member";
  const known = passed ?? [];
  // Gate only once the history is actually KNOWN. Keying this off "the query
  // is no longer pending" made a failed read indistinguishable from an empty
  // history, so one dropped request locked a week-33 learner back to week 6
  // and told them the week had not opened yet. This is pacing, not access
  // control (see the header), so an unreadable history must fail open: no
  // gate, all weeks shown, rather than a lock the learner cannot explain.
  const ready = !sessionLoading && !!userId && !profilePending && isSuccess;

  return {
    ready,
    isUnlocked: (week) => bypass || isWeekUnlocked(week, known),
    phaseIndex: bypass ? PHASES.length - 1 : unlockedThroughPhase(known),
    next: bypass ? null : nextCheckpoint(known),
    passed: known,
  };
}

/** Opens the next phase the moment a checkpoint is passed, without waiting
 *  for the suite's fire-and-forget upsert to land and a refetch to see it —
 *  same optimistic-patch approach as usePatchProfileCache in lib/auth. */
export function useMarkCheckpointPassed() {
  const queryClient = useQueryClient();
  const { session } = useSession();
  const userId = session?.user.id;
  return (dep: string, week: string | number) => {
    if (!userId) return;
    queryClient.setQueryData<number[]>(weekAccessQueryKey(userId, dep), (old) => [
      ...new Set([...(old ?? []), weekNum(week)]),
    ]);
  };
}
