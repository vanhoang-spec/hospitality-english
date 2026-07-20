import { useEffect, useState, useCallback, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useSession } from "@/lib/auth";

const LEGACY_KEY = "academy.state.v1";
const PENDING_STARS_PREFIX = "academy.pendingStars.v1.";
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

export type Suite = "vocab" | "grammar" | "speaking" | "reading" | "arcade";

const DEFAULT_STATE: AcademyState = {
  full_name: "Esteemed Apprentice",
  service_stars: 0,
  daily_streak: 1,
  last_active_date: new Date().toISOString().slice(0, 10),
  metrics: {
    fluency_score: 70,
    courtesy_score: 70,
    reflex_speed: 50,
    crisis_handling_score: 70,
  },
};

export function jobRankFor(stars: number): string {
  if (stars >= 700) return "General Manager";
  if (stars >= 300) return "Manager";
  if (stars >= 100) return "Supervisor";
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
    return { ...DEFAULT_STATE, ...parsed, metrics: { ...DEFAULT_STATE.metrics, ...(parsed.metrics ?? {}) } };
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
async function migrateLegacyLocalState(userId: string): Promise<AcademyState | null> {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(LEGACY_KEY);
  if (!raw) return null;
  try {
    const legacy = JSON.parse(raw) as Partial<AcademyState>;
    const { data: profile } = await supabase
      .from("profiles")
      .select("service_stars")
      .eq("id", userId)
      .single();
    if (!profile || profile.service_stars !== 0) {
      window.localStorage.removeItem(LEGACY_KEY);
      return null;
    }

    const merged: AcademyState = {
      ...DEFAULT_STATE,
      ...legacy,
      metrics: { ...DEFAULT_STATE.metrics, ...(legacy.metrics ?? {}) },
    };

    await supabase
      .from("profiles")
      .update({
        service_stars: merged.service_stars,
        daily_streak: merged.daily_streak,
        last_active_date: merged.last_active_date,
      })
      .eq("id", userId);
    await supabase
      .from("performance_metrics")
      .update({
        fluency_score: merged.metrics.fluency_score,
        courtesy_score: merged.metrics.courtesy_score,
        reflex_speed: merged.metrics.reflex_speed,
        crisis_handling_score: merged.metrics.crisis_handling_score,
      })
      .eq("profile_id", userId);

    window.localStorage.removeItem(LEGACY_KEY);
    return merged;
  } catch {
    return null;
  }
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
    const today = new Date().toISOString().slice(0, 10);
    if (initial.last_active_date !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const next = {
        ...initial,
        daily_streak: initial.last_active_date === yesterday ? initial.daily_streak + 1 : 1,
        last_active_date: today,
      };
      write(userId, next);
      setState(next);
      if (userId) {
        supabase
          .from("profiles")
          .update({ daily_streak: next.daily_streak, last_active_date: next.last_active_date })
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
      const migrated = await migrateLegacyLocalState(userId);
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

      if (cancelled || (!profile && !migrated)) return;

      const next: AcademyState = {
        full_name: profile?.full_name || migrated?.full_name || DEFAULT_STATE.full_name,
        service_stars: profile?.service_stars ?? migrated?.service_stars ?? 0,
        daily_streak: profile?.daily_streak ?? migrated?.daily_streak ?? 1,
        last_active_date: profile?.last_active_date ?? migrated?.last_active_date ?? DEFAULT_STATE.last_active_date,
        metrics: {
          fluency_score: metrics?.fluency_score ?? migrated?.metrics.fluency_score ?? DEFAULT_STATE.metrics.fluency_score,
          courtesy_score: metrics?.courtesy_score ?? migrated?.metrics.courtesy_score ?? DEFAULT_STATE.metrics.courtesy_score,
          reflex_speed: metrics?.reflex_speed ?? migrated?.metrics.reflex_speed ?? DEFAULT_STATE.metrics.reflex_speed,
          crisis_handling_score:
            metrics?.crisis_handling_score ?? migrated?.metrics.crisis_handling_score ?? DEFAULT_STATE.metrics.crisis_handling_score,
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

  const recordSuiteResult = useCallback(
    (departmentId: string, week: string | number, suite: Suite, stars: number) => {
      if (!userId) return;
      const weekNumber = typeof week === "string" ? parseInt(week, 10) : week;
      if (!Number.isFinite(weekNumber)) return;
      supabase
        .from("lesson_progress")
        .upsert(
          {
            user_id: userId,
            department_id: departmentId.toUpperCase(),
            week_number: weekNumber,
            suite,
            stars,
            completed_at: new Date().toISOString(),
          },
          { onConflict: "user_id,department_id,week_number,suite" },
        )
        .then(() => {});
    },
    [userId],
  );

  return { state, ready, update, awardStars, patchMetrics, recordSuiteResult, jobRank: jobRankFor(state.service_stars) };
}
