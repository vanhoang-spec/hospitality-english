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

/** A week counts as finished when four of its suites are mastered.
 *
 *  A week ships six — vocabulary, grammar, listening, speaking, reading,
 *  arcade — and two of those can be unreachable through no fault of the
 *  learner: listening needs an English voice on the device, speaking needs
 *  a recogniser. Demanding all six would lock a cheap Android phone out of
 *  the course; demanding one would make "sequential" mean nothing. */
export const SUITES_FOR_A_FINISHED_WEEK = 4;

export type DepProgress = {
  passedCheckpoints: number[];
  /** week number → how many suites of that week are mastered */
  masteredByWeek: Record<number, number>;
};

async function fetchDepProgress(userId: string, dep: string): Promise<DepProgress> {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("week_number, suite, mastered")
    .eq("user_id", userId)
    .eq("department_id", dep.toUpperCase());
  if (error) throw error;
  const masteredByWeek: Record<number, number> = {};
  for (const row of data ?? []) {
    if (!row.mastered || row.suite === "weektest") continue;
    masteredByWeek[row.week_number] = (masteredByWeek[row.week_number] ?? 0) + 1;
  }
  return {
    passedCheckpoints: passedFrom(data ?? []),
    masteredByWeek,
  };
}

function passedFrom(data: { week_number: number; suite: string; mastered: boolean }[]): number[] {
  const rows = data.filter((r) => r.suite === "weektest");
  // `mastered` alone, deliberately. The old predicate also accepted
  // `score_pct >= CHECKPOINT_PASS_PCT`, which made the per-skill floors
  // unenforceable: a paper scoring 85% overall with 0/4 listening writes
  // mastered = false, and the score clause opened the phase anyway.
  //
  // Dropping it changes nothing for existing learners. 'weektest' and both
  // columns arrived in the same migration (20260721120000), so every
  // weektest row was written by WeekTestSuite, which only ever records a
  // score at or above the mark together with mastered = true — verified as
  // zero such rows on production before this change. And `mastered` is the
  // sticky column (academy-store.ts), so unlike a live score read it can
  // never close a phase a learner has already opened.
  return rows.filter((r) => r.mastered).map((r) => r.week_number);
}

/** The matrix HR draws, and the sequential switch.
 *
 *  No rules at all for an organisation means the old behaviour: the whole
 *  catalogue is open. A rule with no group applies to the hotel; a rule
 *  with a group applies to that batch. Both read fail-open, like the
 *  phase gate above — an unreadable rule set must never lock a learner
 *  out of a week they paid for. */
export type OrgAccess = {
  ready: boolean;
  sequential: boolean;
  /** null when the hotel draws no matrix at all */
  rules: { department_id: string; week_from: number; week_to: number }[] | null;
};

export function useOrgAccess(): OrgAccess {
  const { session } = useSession();
  const userId = session?.user.id;
  const { data: profile } = useProfile(userId);
  const orgId = profile?.org_id ?? null;

  const { data, isSuccess } = useQuery({
    queryKey: ["org-access", orgId, userId] as const,
    queryFn: async () => {
      if (!orgId || !userId) return { sequential: false, rules: null as OrgAccess["rules"] };
      const [{ data: settings }, { data: memberships }, { data: rules }] = await Promise.all([
        supabase.from("org_settings").select("sequential_mode").eq("org_id", orgId).maybeSingle(),
        supabase.from("group_members").select("group_id").eq("user_id", userId),
        supabase
          .from("access_rules")
          .select("group_id, department_id, week_from, week_to")
          .eq("org_id", orgId),
      ]);
      const myGroups = new Set((memberships ?? []).map((m) => m.group_id));
      const all = rules ?? [];
      const mine = all.filter((r) => r.group_id === null || myGroups.has(r.group_id));
      return {
        sequential: settings?.sequential_mode ?? false,
        rules: all.length === 0 ? null : mine,
      };
    },
    enabled: !!userId,
    staleTime: 5 * 60_000,
  });

  return {
    ready: isSuccess,
    sequential: data?.sequential ?? false,
    rules: data?.rules ?? null,
  };
}

export function allowedByRules(
  rules: OrgAccess["rules"],
  dep: string,
  week: string | number,
): boolean {
  if (!rules) return true;
  const w = weekNum(week);
  const d = dep.toUpperCase();
  return rules.some(
    (r) => r.department_id.toUpperCase() === d && w >= r.week_from && w <= r.week_to,
  );
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
  const orgAccess = useOrgAccess();
  const { data: progress, isSuccess } = useQuery({
    queryKey: weekAccessQueryKey(userId, dep),
    queryFn: () => fetchDepProgress(userId!, dep),
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
  const known = progress?.passedCheckpoints ?? [];
  const masteredByWeek = progress?.masteredByWeek ?? {};

  // Sequential mode, when the hotel switches it on: week N needs week N-1
  // finished. Only inside the phase the learner has already opened — the
  // checkpoint gate above still decides where a phase begins.
  const sequentialOk = (week: string | number) => {
    if (!orgAccess.sequential) return true;
    const w = weekNum(week);
    const phase = phaseOfWeek(w);
    if (!phase || w <= phase.from) return true;
    return (masteredByWeek[w - 1] ?? 0) >= SUITES_FOR_A_FINISHED_WEEK;
  };
  // Gate only once the history is actually KNOWN. Keying this off "the query
  // is no longer pending" made a failed read indistinguishable from an empty
  // history, so one dropped request locked a week-33 learner back to week 6
  // and told them the week had not opened yet. This is pacing, not access
  // control (see the header), so an unreadable history must fail open: no
  // gate, all weeks shown, rather than a lock the learner cannot explain.
  const ready = !sessionLoading && !!userId && !profilePending && isSuccess;

  return {
    ready,
    isUnlocked: (week) =>
      bypass ||
      (isWeekUnlocked(week, known) &&
        allowedByRules(orgAccess.rules, dep, week) &&
        sequentialOk(week)),
    phaseIndex: bypass ? PHASES.length - 1 : unlockedThroughPhase(known),
    next: bypass ? null : nextCheckpoint(known),
    passed: known,
  };
}

/** When this learner last SAT and failed this checkpoint, as epoch ms, or
 *  null if they never have (or if it cannot be read).
 *
 *  Its own query key rather than a widening of `weekAccessQueryKey`: that
 *  cache holds a `number[]` which useMarkCheckpointPassed patches, and the
 *  gate must not start depending on a second shape. Fail-open like the gate
 *  — an unreadable row means no cooldown, never a locked-out learner. */
export function useLastFailedCheckpoint(dep: string, week: string | number) {
  const { session } = useSession();
  const userId = session?.user.id;
  const { data } = useQuery({
    queryKey: ["checkpoint-last-attempt", userId, dep.toUpperCase(), weekNum(week)] as const,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lesson_progress")
        .select("completed_at, mastered")
        .eq("user_id", userId!)
        .eq("department_id", dep.toUpperCase())
        .eq("week_number", weekNum(week))
        .eq("suite", "weektest")
        .maybeSingle();
      if (error) throw error;
      // A pass is never rate-limited; only a failed sitting starts the clock.
      if (!data || data.mastered || !data.completed_at) return null;
      const at = Date.parse(data.completed_at);
      return Number.isFinite(at) ? at : null;
    },
    enabled: !!userId,
    staleTime: 60_000,
  });
  return data ?? null;
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
