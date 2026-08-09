// LEARNER-FACING PROGRESS (backlog P2-3, P2-4).
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

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { weekNum } from "@/lib/phases";

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

// ---------------------------------------------------------------------------
// Where the learner left off (P2-4)
// ---------------------------------------------------------------------------

const LAST_PLACE_PREFIX = "academy.lastPlace.v1.";

export type LastPlace = { dep: string; week: number };

function lastPlaceKey(userId: string | undefined) {
  return LAST_PLACE_PREFIX + (userId ?? "anon");
}

/** Called on every suite entry. Cheap, synchronous, and survives a logged
 *  -out reload — the learner's own device is the fastest source of truth
 *  for "where was I". */
export function rememberPlace(userId: string | undefined, dep: string, week: string | number) {
  if (typeof window === "undefined") return;
  const w = weekNum(week);
  if (!Number.isFinite(w)) return;
  try {
    window.localStorage.setItem(
      lastPlaceKey(userId),
      JSON.stringify({ dep: dep.toUpperCase(), week: w }),
    );
  } catch {
    // Private-mode quota failures must never break entering a lesson.
  }
}

function readPlace(userId: string | undefined): LastPlace | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(lastPlaceKey(userId));
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<LastPlace>;
    if (typeof parsed.dep !== "string" || typeof parsed.week !== "number") return null;
    return { dep: parsed.dep.toUpperCase(), week: parsed.week };
  } catch {
    return null;
  }
}

/** The most recent result this learner recorded in ANY department.
 *
 *  The cross-device half of the answer: localStorage knows where they were
 *  on THIS phone, and nothing else. A learner who studied at work and opens
 *  the app at home would otherwise get no card at all. */
async function fetchLastRecordedPlace(userId: string): Promise<LastPlace | null> {
  const { data, error } = await supabase
    .from("lesson_progress")
    .select("department_id, week_number, completed_at")
    .eq("user_id", userId)
    .order("completed_at", { ascending: false, nullsFirst: false })
    .limit(1);
  if (error) throw error;
  const row = data?.[0];
  if (!row) return null;
  return { dep: row.department_id.toUpperCase(), week: row.week_number };
}

/**
 * Where to send the learner when they open the app.
 *
 * localStorage wins when present: it is written on entering a suite, so it
 * points at the week they were *in*, whereas the DB only knows the last
 * week they *finished* something in. Falls back to the DB so a new device
 * still lands somewhere useful, and to null for a genuinely new learner —
 * whom the card must not greet with "continue" when there is nothing to
 * continue.
 */
export function useLastPlace(): { place: LastPlace | null; ready: boolean } {
  const { session, loading } = useSession();
  const userId = session?.user.id;

  const { data: remote, isFetched } = useQuery({
    queryKey: ["last-recorded-place", userId] as const,
    queryFn: () => fetchLastRecordedPlace(userId!),
    enabled: !!userId,
    staleTime: 5 * 60_000,
  });

  // Read on the client only. Reading during render would hand SSR a value
  // the server cannot have, and the hydration mismatch flashes the card.
  const [local, setLocal] = useState<LastPlace | null>(null);
  const [localRead, setLocalRead] = useState(false);
  useEffect(() => {
    if (loading) return;
    setLocal(readPlace(userId));
    setLocalRead(true);
  }, [userId, loading]);

  if (!localRead) return { place: null, ready: false };
  if (local) return { place: local, ready: true };
  return { place: remote ?? null, ready: !userId || isFetched };
}
