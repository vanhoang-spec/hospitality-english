import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";
import { seedReviewItems } from "@/lib/review";
import { localDateStr, yesterdayStr } from "@/lib/date";

const LEGACY_KEY = "academy.state.v1";
const PENDING_STARS_PREFIX = "academy.pendingStars.v1.";
const LAST_LEARNED_PREFIX = "academy.lastLearned.v1.";
const METRICS_DEBOUNCE_MS = 600;

export type Metrics = {
  fluency_score: number;
  courtesy_score: number;
  reflex_speed: number; // 0-100 here for display
  crisis_handling_score: number;
};

export type AcademyState = {
  full_name: string;
  service_stars: number;
  daily_streak: number;
  last_active_date: string;
  metrics: Metrics;
};

export type Suite =
  | "vocab"
  | "grammar"
  | "speaking"
  | "reading"
  | "arcade"
  | "listening"
  | "weektest"
  | "writing"
  | "mediation";

const DEFAULT_STATE: AcademyState = {
  full_name: "Esteemed Apprentice",
  service_stars: 0,
  daily_streak: 1,
  last_active_date: localDateStr(),
  metrics: {
    fluency_score: 70,
    courtesy_score: 70,
    reflex_speed: 50,
    crisis_handling_score: 70,
  },
};

// Rank ladder re-sloped to span the whole 40-week journey. A fully
// mastered week yields ~100 stars, so the old top rank (700) was reached
// around week 7 and the ladder went dead for the remaining 33 weeks.
// These thresholds keep a next goal visible from Trainee through to
// General Manager near the end of the programme. Display-only.
export function jobRankFor(stars: number): string {
  if (stars >= 3600) return "General Manager";
  if (stars >= 2900) return "Manager";
  if (stars >= 2200) return "Assistant Manager";
  if (stars >= 1600) return "Supervisor";
  if (stars >= 1150) return "Team Leader";
  if (stars >= 750) return "Senior Staff";
  if (stars >= 400) return "Staff";
  if (stars >= 150) return "Junior Staff";
  return "Trainee";
}

function storageKey(userId: string | undefined): string {
  return `academy.state.v2.${userId ?? "anon"}`;
}

function read(userId: string | undefined): AcademyState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(storageKey(userId));
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      metrics: { ...DEFAULT_STATE.metrics, ...(parsed.metrics ?? {}) },
    };
  } catch {
    return DEFAULT_STATE;
  }
}

function write(userId: string | undefined, state: AcademyState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(storageKey(userId), JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("academy:update", { detail: state }));
}

// One-time import of the old anonymous localStorage state into the DB,
// for whoever logs into this browser first after the multi-tenant
// rollout. Runs only when the DB profile still looks untouched
// (service_stars = 0), so it never clobbers a profile that already has
// real progress.
/** The shared pre-multi-tenant key. It is no longer read — it was a
 *  hand-me-down: one unscoped bucket that the FIRST person to sign in on
 *  a machine inherited, stars, streak and all. On a hotel's shared back
 *  office PC that is somebody else's progress. It is now only deleted. */
function dropLegacyLocalState(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(LEGACY_KEY);
  } catch {
    /* storage blocked — nothing to drop */
  }
}

function readLastLearned(userId: string): string | null {
  if (typeof window === "undefined") return null;
  return window.localStorage.getItem(LAST_LEARNED_PREFIX + userId);
}

function writeLastLearned(userId: string, date: string) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(LAST_LEARNED_PREFIX + userId, date);
}

function readPendingStars(userId: string): number {
  if (typeof window === "undefined") return 0;
  const raw = window.localStorage.getItem(PENDING_STARS_PREFIX + userId);
  return raw ? Number(raw) || 0 : 0;
}

function writePendingStars(userId: string, total: number) {
  if (typeof window === "undefined") return;
  if (total === 0) window.localStorage.removeItem(PENDING_STARS_PREFIX + userId);
  else window.localStorage.setItem(PENDING_STARS_PREFIX + userId, String(total));
}

// Retries any star deltas that failed to reach the server on a previous
// visit (e.g. offline) — best-effort, fires once per mount.
async function flushPendingStars(userId: string) {
  const pending = readPendingStars(userId);
  if (pending === 0) return;
  const { error } = await supabase.rpc("award_stars", { delta: pending });
  if (!error) writePendingStars(userId, 0);
}

export function useAcademy() {
  const { session } = useSession();
  const userId = session?.user.id;

  const [state, setState] = useState<AcademyState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);
  const metricsTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Local hydration first (synchronous UI source), then DB fetch overwrites
  // once it resolves — see plan Phase 4: local cache stays authoritative
  // for render, DB is authoritative for persistence.
  useEffect(() => {
    const initial = read(userId);
    const today = localDateStr();
    // last_active_date only tracks presence now — the streak is earned
    // by actual learning (markLearnedToday), not by opening the app.
    if (initial.last_active_date !== today) {
      const next = { ...initial, last_active_date: today };
      write(userId, next);
      setState(next);
      if (userId) {
        supabase
          .from("profiles")
          .update({ last_active_date: next.last_active_date })
          .eq("id", userId)
          .then(() => {});
      }
    } else {
      setState(initial);
    }
    setReady(true);

    const handler = (e: Event) => setState((e as CustomEvent<AcademyState>).detail);
    window.addEventListener("academy:update", handler);
    return () => window.removeEventListener("academy:update", handler);
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    (async () => {
      dropLegacyLocalState();
      await flushPendingStars(userId);

      const { data: profile } = await supabase
        .from("profiles")
        .select("full_name, service_stars, daily_streak, last_active_date")
        .eq("id", userId)
        .single();
      const { data: metrics } = await supabase
        .from("performance_metrics")
        .select("fluency_score, courtesy_score, reflex_speed, crisis_handling_score")
        .eq("profile_id", userId)
        .single();

      if (cancelled || !profile) return;

      // Learning streak maintenance. Grandfather users from the
      // open-app-streak era by treating their last active day as their
      // last learned day, then break the streak if they've skipped a day.
      let lastLearned = readLastLearned(userId);
      if (!lastLearned) {
        lastLearned = profile?.last_active_date ?? yesterdayStr();
        writeLastLearned(userId, lastLearned);
      }
      let effectiveStreak = profile?.daily_streak ?? 1;
      if (lastLearned < yesterdayStr() && effectiveStreak !== 0) {
        effectiveStreak = 0;
        supabase
          .from("profiles")
          .update({ daily_streak: 0 })
          .eq("id", userId)
          .then(() => {});
      }

      const next: AcademyState = {
        full_name: profile?.full_name || DEFAULT_STATE.full_name,
        service_stars: profile?.service_stars ?? 0,
        daily_streak: effectiveStreak,
        last_active_date: profile?.last_active_date ?? DEFAULT_STATE.last_active_date,
        metrics: {
          fluency_score: metrics?.fluency_score ?? DEFAULT_STATE.metrics.fluency_score,
          courtesy_score: metrics?.courtesy_score ?? DEFAULT_STATE.metrics.courtesy_score,
          reflex_speed: metrics?.reflex_speed ?? DEFAULT_STATE.metrics.reflex_speed,
          crisis_handling_score:
            metrics?.crisis_handling_score ?? DEFAULT_STATE.metrics.crisis_handling_score,
        },
      };
      write(userId, next);
      setState(next);
    })();

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const update = useCallback(
    (patch: Partial<AcademyState>) => {
      const next = { ...read(userId), ...patch };
      write(userId, next);
      setState(next);
    },
    [userId],
  );

  const awardStars = useCallback(
    (n: number) => {
      const current = read(userId);
      const next = { ...current, service_stars: current.service_stars + n };
      write(userId, next);
      setState(next);

      if (!userId) return;
      supabase.rpc("award_stars", { delta: n }).then(({ error }) => {
        if (error) writePendingStars(userId, readPendingStars(userId) + n);
      });
    },
    [userId],
  );

  const patchMetrics = useCallback(
    (patch: Partial<Metrics>) => {
      const current = read(userId);
      const next = { ...current, metrics: { ...current.metrics, ...patch } };
      write(userId, next);
      setState(next);

      if (!userId) return;
      clearTimeout(metricsTimer.current);
      metricsTimer.current = setTimeout(() => {
        supabase
          .from("performance_metrics")
          .update(next.metrics)
          .eq("profile_id", userId)
          .then(() => {});
      }, METRICS_DEBOUNCE_MS);
    },
    [userId],
  );

  // Marks today as a learning day and advances (or restarts) the streak.
  // Idempotent within a day. Called on suite mastery and on completing a
  // Daily Review session — never on merely opening the app.
  const markLearnedToday = useCallback(() => {
    if (!userId) return;
    const today = localDateStr();
    const lastLearned = readLastLearned(userId);
    if (lastLearned === today) return;
    const current = read(userId);
    const nextStreak = lastLearned === yesterdayStr() ? current.daily_streak + 1 : 1;
    writeLastLearned(userId, today);
    const next = { ...current, daily_streak: nextStreak };
    write(userId, next);
    setState(next);
    supabase
      .from("profiles")
      .update({ daily_streak: nextStreak })
      .eq("id", userId)
      .then(() => {});
  }, [userId]);

  const recordSuiteResult = useCallback(
    (
      departmentId: string,
      week: string | number,
      suite: Suite,
      stars: number,
      opts?: { scorePct?: number; mastered?: boolean },
    ) => {
      if (!userId) return;
      const weekNumber = typeof week === "string" ? parseInt(week, 10) : week;
      if (!Number.isFinite(weekNumber)) return;
      const row: Record<string, unknown> = {
        user_id: userId,
        department_id: departmentId.toUpperCase(),
        week_number: weekNumber,
        suite,
        stars,
        completed_at: new Date().toISOString(),
      };
      if (opts?.scorePct !== undefined)
        row.score_pct = Math.max(0, Math.min(100, Math.round(opts.scorePct)));
      // Sticky mastery: only ever write `true` — omitting the column on
      // conflict leaves an earlier pass intact, so a weaker retake can
      // never demote a learner back to un-mastered.
      if (opts?.mastered) row.mastered = true;
      supabase
        .from("lesson_progress")
        .upsert(row as never, { onConflict: "user_id,department_id,week_number,suite" })
        .then(() => {});

      // Streak = the learner showed up and finished a suite today, not
      // that they cleared the 80% mastery bar. Punishing an effortful
      // sub-mastery day with a streak reset churns exactly the weak,
      // low-confidence learners the streak is meant to keep. Mastery
      // stays the quality gate for stars and the review queue.
      markLearnedToday();
      // Seed spaced review on the first COMPLETION of a suite, not only
      // on mastery — a learner who scores below the mastery bar is the
      // one who forgets fastest and needs the review queue most. Idempotent
      // (existing schedules are kept), so re-attempting is harmless.
      if (suite === "vocab" || suite === "grammar" || suite === "speaking") {
        seedReviewItems(userId, departmentId, weekNumber, suite).catch(() => {});
      }
    },
    [userId, markLearnedToday],
  );

  return {
    state,
    ready,
    update,
    awardStars,
    patchMetrics,
    recordSuiteResult,
    markLearnedToday,
    jobRank: jobRankFor(state.service_stars),
  };
}
