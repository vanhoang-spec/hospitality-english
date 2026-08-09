// LEARNER-FACING PROGRESS (backlog P2-3).
//
// `lesson_progress` has held per-suite results since the mastery migration,
// but until now only two callers read it: week-access.ts (the phase gate)
// and org-admin.tsx (the manager's matrix). The learner who produced the
// rows could not see a single one of them.
//
// Deliberately its own query key rather than a widening of
// `weekAccessQueryKey`. That cache holds a `number[]` which
// useMarkCheckpointPassed patches optimistically, and the gate's fail-open
// semantics are load-bearing (see week-access.ts) — decoration must not be
// able to change who gets locked out. The cost is one extra select per
// department page, held fresh for five minutes.

import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

/** The six doors every authored week carries.
 *
 *  weektest/writing/mediation exist on specific weeks only, so counting
 *  them would make the denominator jump around between weeks — "3/6" on
 *  week 12 and "3/7" on week 14 reads as progress lost. They are still
 *  recorded and still shown as their own tick; they just do not move the
 *  core count. */
export const CORE_SUITES = [
  "vocab",
  "grammar",
  "speaking",
  "listening",
  "reading",
  "arcade",
] as const;

export type CoreSuite = (typeof CORE_SUITES)[number];

export type SuiteResult = {
  stars: number;
  scorePct: number | null;
  mastered: boolean;
  completedAt: string | null;
};

export type WeekProgress = {
  /** Core suites with a recorded result, 0–6. */
  done: number;
  /** Core suites cleared at or above the week's mastery bar, 0–6. */
  mastered: number;
  stars: number;
  /** Every suite recorded for the week, including weektest/writing/mediation. */
  suites: Partial<Record<string, SuiteResult>>;
};

export type DepartmentProgress = {
  /** False until the rows are known. Callers decorate, so rendering an
   *  empty state meanwhile is correct — no tick should flicker on nav. */
  ready: boolean;
  byWeek: Map<number, WeekProgress>;
  /** Furthest week with any recorded result — where the learner stands. */
  currentWeek: number;
  /** Weeks whose six core suites are all recorded. */
  weeksCompleted: number;
  stars: number;
};

type ProgressRow = {
  week_number: number;
  suite: string;
  stars: number;
  score_pct: number | null;
  mastered: boolean;
  completed_at: string | null;
};

export function departmentProgressQueryKey(userId: string | undefined, dep: string) {
  return ["dept-progress", userId, dep.toUpperCase()] as const;
}

async function fetchDepartmentProgress(userId: string, dep: string): Promise<ProgressRow[]> {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("week_number, suite, stars, score_pct, mastered, completed_at")
    .eq("user_id", userId)
    .eq("department_id", dep.toUpperCase());
  if (error) throw error;
  return (data ?? []) as ProgressRow[];
}

const EMPTY: DepartmentProgress = {
  ready: false,
  byWeek: new Map(),
  currentWeek: 1,
  weeksCompleted: 0,
  stars: 0,
};

function summarise(rows: ProgressRow[]): Omit<DepartmentProgress, "ready"> {
  const byWeek = new Map<number, WeekProgress>();
  let stars = 0;
  for (const r of rows) {
    const week = byWeek.get(r.week_number) ?? { done: 0, mastered: 0, stars: 0, suites: {} };
    week.suites[r.suite] = {
      stars: r.stars,
      scorePct: r.score_pct,
      mastered: r.mastered,
      completedAt: r.completed_at,
    };
    week.stars += r.stars;
    stars += r.stars;
    byWeek.set(r.week_number, week);
  }
  for (const week of byWeek.values()) {
    week.done = CORE_SUITES.filter((s) => week.suites[s]).length;
    week.mastered = CORE_SUITES.filter((s) => week.suites[s]?.mastered).length;
  }
  const touched = [...byWeek.keys()];
  return {
    byWeek,
    currentWeek: touched.length > 0 ? Math.max(...touched) : 1,
    weeksCompleted: [...byWeek.values()].filter((w) => w.done === CORE_SUITES.length).length,
    stars,
  };
}

export function useDepartmentProgress(dep: string): DepartmentProgress {
  const { session } = useSession();
  const userId = session?.user.id;
  const { data, isSuccess } = useQuery({
    queryKey: departmentProgressQueryKey(userId, dep),
    queryFn: () => fetchDepartmentProgress(userId!, dep),
    enabled: !!userId && !!dep,
    // A suite writes its row with a fire-and-forget upsert, so a short
    // stale window would refetch before the write is readable and blank a
    // tick the learner just earned. Results change at most once a sitting.
    staleTime: 5 * 60_000,
  });

  if (!isSuccess || !data) return EMPTY;
  return { ready: true, ...summarise(data) };
}
