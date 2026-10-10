import { useCallback, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession, useProfile } from "@/lib/auth";

/** Learning events, append-only.
 *
 *  `lesson_progress` keeps one row per (user, department, week, suite) and
 *  overwrites it, so it can say "mastered, 80%" and nothing about when,
 *  how long, or how many tries. HR asks all three in the monthly review.
 *  These two hooks write the events those answers are built from.
 *
 *  Both are fire-and-forget on purpose: a telemetry write that fails, or
 *  a hotel whose subscription lapsed mid-session, must never interrupt a
 *  learner mid-exercise. */

type AttemptScope = { dep: string; week: string | number; suite: string };

export function useAttemptLogger(scope: AttemptScope) {
  const { session } = useSession();
  const userId = session?.user.id;
  const { data: profile } = useProfile(userId);
  const orgId = profile?.org_id ?? null;
  // Attempt numbers are counted within this sitting. "Right the first
  // time ever" is a question for the report — it takes the earliest
  // attempt per (user, item) in SQL — and this column is the cheap
  // per-sitting version of the same idea.
  const seen = useRef<Map<string, number>>(new Map());

  return useCallback(
    (itemKey: string, correct: boolean, msSpent?: number) => {
      if (!userId) return;
      const before = seen.current.get(itemKey) ?? 0;
      seen.current.set(itemKey, before + 1);
      void supabase
        .from("attempts")
        .insert({
          user_id: userId,
          org_id: orgId,
          department_id: scope.dep,
          week_number: Number(scope.week),
          suite: scope.suite,
          item_key: itemKey,
          attempt_no: before + 1,
          correct,
          is_first_try: before === 0,
          ms_spent: msSpent ?? null,
        })
        .then(
          () => undefined,
          () => undefined,
        );
    },
    [userId, orgId, scope.dep, scope.week, scope.suite],
  );
}

/** The spaced-review session walks items from many weeks and departments,
 *  so its scope changes card by card — hence a logger that takes one. */
export function useScopedAttemptLogger() {
  const { session } = useSession();
  const userId = session?.user.id;
  const { data: profile } = useProfile(userId);
  const orgId = profile?.org_id ?? null;
  const seen = useRef<Map<string, number>>(new Map());

  return useCallback(
    (scope: AttemptScope, itemKey: string, correct: boolean) => {
      if (!userId) return;
      const before = seen.current.get(itemKey) ?? 0;
      seen.current.set(itemKey, before + 1);
      void supabase
        .from("attempts")
        .insert({
          user_id: userId,
          org_id: orgId,
          department_id: scope.dep,
          week_number: Number(scope.week),
          suite: scope.suite,
          item_key: itemKey,
          attempt_no: before + 1,
          correct,
          is_first_try: before === 0,
        })
        .then(
          () => undefined,
          () => undefined,
        );
    },
    [userId, orgId],
  );
}

const HEARTBEAT_SECONDS = 30;
const FLUSH_EVERY = 4; // write to the server every two minutes

/** Time on task, counted only while the tab is visible. A learner who
 *  opens the app and goes to lunch must not bill the hotel an hour. */
export function useStudySession(scope: AttemptScope) {
  const { session } = useSession();
  const userId = session?.user.id;
  const { data: profile } = useProfile(userId);
  const orgId = profile?.org_id ?? null;
  const rowId = useRef<string | null>(null);
  const seconds = useRef(0);
  const ticks = useRef(0);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    const open = async () => {
      const { data } = await supabase
        .from("study_sessions")
        .insert({
          user_id: userId,
          org_id: orgId,
          department_id: scope.dep,
          week_number: Number(scope.week),
          suite: scope.suite,
        })
        .select("id")
        .maybeSingle();
      if (!cancelled && data) rowId.current = data.id;
    };
    void open();

    const flush = (final: boolean) => {
      const id = rowId.current;
      if (!id) return;
      void supabase
        .from("study_sessions")
        .update({
          seconds_active: seconds.current,
          ...(final ? { ended_at: new Date().toISOString() } : {}),
        })
        .eq("id", id)
        .then(
          () => undefined,
          () => undefined,
        );
    };

    const timer = window.setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
      seconds.current += HEARTBEAT_SECONDS;
      ticks.current += 1;
      if (ticks.current % FLUSH_EVERY === 0) flush(false);
    }, HEARTBEAT_SECONDS * 1000);

    return () => {
      cancelled = true;
      window.clearInterval(timer);
      flush(true);
    };
  }, [userId, orgId, scope.dep, scope.week, scope.suite]);
}
