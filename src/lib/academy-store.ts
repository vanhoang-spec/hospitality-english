import { useEffect, useState, useCallback } from "react";

const KEY = "academy.state.v1";

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

function read(): AcademyState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT_STATE, ...parsed, metrics: { ...DEFAULT_STATE.metrics, ...(parsed.metrics ?? {}) } };
  } catch {
    return DEFAULT_STATE;
  }
}

function write(state: AcademyState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(state));
  window.dispatchEvent(new CustomEvent("academy:update", { detail: state }));
}

export function useAcademy() {
  const [state, setState] = useState<AcademyState>(DEFAULT_STATE);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const initial = read();
    // streak rollover
    const today = new Date().toISOString().slice(0, 10);
    if (initial.last_active_date !== today) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const next = {
        ...initial,
        daily_streak: initial.last_active_date === yesterday ? initial.daily_streak + 1 : 1,
        last_active_date: today,
      };
      write(next);
      setState(next);
    } else {
      setState(initial);
    }
    setReady(true);

    const handler = (e: Event) => setState((e as CustomEvent<AcademyState>).detail);
    window.addEventListener("academy:update", handler);
    return () => window.removeEventListener("academy:update", handler);
  }, []);

  const update = useCallback((patch: Partial<AcademyState>) => {
    const next = { ...read(), ...patch };
    write(next);
    setState(next);
  }, []);

  const awardStars = useCallback((n: number) => {
    const current = read();
    const next = { ...current, service_stars: current.service_stars + n };
    write(next);
    setState(next);
  }, []);

  const patchMetrics = useCallback((patch: Partial<Metrics>) => {
    const current = read();
    const next = { ...current, metrics: { ...current.metrics, ...patch } };
    write(next);
    setState(next);
  }, []);

  return { state, ready, update, awardStars, patchMetrics, jobRank: jobRankFor(state.service_stars) };
}
