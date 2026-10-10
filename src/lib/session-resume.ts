// SUITE SESSION RESUME (backlog P2-5).
//
// Every suite kept its whole run in React state, so an interruption at 90%
// lost the stars, the streak day and the progress row. The target learner
// studies in 10–15 minute windows on a phone; the checkpoint alone is a
// 12–19 minute uninterrupted block. Losing a run is not an edge case here,
// it is the normal case.
//
// What is NOT done here, deliberately: writing a provisional row to
// `lesson_progress` every few items. `score_pct` on that table is read by
// the mastery bar, the phase gate and the manager's matrix; a half-finished
// paper upserting 40% would report a fail the learner never sat. Stars are
// already durable — they are awarded per item through `award_stars` as the
// learner earns them — so the only thing an interruption can still cost is
// the completion row, and resuming the run writes it for real.

import { useCallback, useEffect, useMemo, useState } from "react";
import { useSession } from "@/lib/auth";

// The key sits under "academy." and signOut (lib/auth) clears everything
// there: a hotel's shared machine keeps nothing of the learner who just left
// it. So a run survives a closed tab, a dead battery or a week away — and
// does not survive signing out. The account menu says so before it happens
// (`unfinishedRunCount`).
const PREFIX = "academy.session.v1.";

/** A snapshot older than this is likelier to confuse than to help: the
 *  learner has moved on, and offering "continue from question 7" of a run
 *  they abandoned a fortnight ago invites them to finish a paper they no
 *  longer remember starting. */
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

/** `maxAgeMs` travels with the snapshot so that anything counting snapshots
 *  (the account menu) applies the same limit as the suite that wrote it. */
type Envelope<T> = { v: 1; savedAt: number; maxAgeMs?: number; state: T };

export function suiteSessionKey(
  userId: string | undefined,
  dep: string,
  week: string | number,
  suite: string,
): string {
  return `${PREFIX}${userId ?? "anon"}.${dep.toUpperCase()}.${week}.${suite}`;
}

function parseEnvelope<T>(raw: string | null): Envelope<T> | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as Envelope<T>;
    if (parsed?.v !== 1 || typeof parsed.savedAt !== "number") return null;
    return parsed;
  } catch {
    return null;
  }
}

const expired = (e: Envelope<unknown>, maxAgeMs: number) =>
  Date.now() - e.savedAt > Math.min(maxAgeMs, e.maxAgeMs ?? MAX_AGE_MS);

function readSnapshot<T>(key: string, maxAgeMs: number): { state: T; savedAt: number } | null {
  if (typeof window === "undefined") return null;
  try {
    const parsed = parseEnvelope<T>(window.localStorage.getItem(key));
    if (!parsed) return null;
    if (expired(parsed, maxAgeMs)) {
      window.localStorage.removeItem(key);
      return null;
    }
    return { state: parsed.state, savedAt: parsed.savedAt };
  } catch {
    return null;
  }
}

function writeSnapshot<T>(key: string, state: T, maxAgeMs: number) {
  if (typeof window === "undefined") return;
  try {
    const envelope: Envelope<T> = { v: 1, savedAt: Date.now(), maxAgeMs, state };
    window.localStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    // Quota or private mode. A snapshot that cannot be written must never
    // interrupt the run it exists to protect.
  }
}

/** Runs this learner could still pick up on this device. Signing out throws
 *  them away, so the account menu counts them before it does. */
export function unfinishedRunCount(userId: string | undefined): number {
  if (typeof window === "undefined" || !userId) return 0;
  try {
    let n = 0;
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (!key?.startsWith(`${PREFIX}${userId}.`)) continue;
      const parsed = parseEnvelope<unknown>(window.localStorage.getItem(key));
      if (parsed && !expired(parsed, MAX_AGE_MS)) n++;
    }
    return n;
  } catch {
    return 0;
  }
}

function removeSnapshot(key: string) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(key);
  } catch {
    /* see writeSnapshot */
  }
}

export type SuiteSession<T> = {
  /** The snapshot found on mount, or null. Frozen at mount on purpose:
   *  it drives the resume prompt, and must not change under the learner
   *  as their own `save` calls land. */
  saved: T | null;
  /** When `saved` was written (epoch ms), or null with it. */
  savedAt: number | null;
  /** False until localStorage has been read (never true during SSR). */
  ready: boolean;
  save: (state: T) => void;
  /** Call on completion, and when the learner declines the resume. */
  clear: () => void;
};

/**
 * Per-(user, department, week, suite) run snapshot in localStorage.
 *
 * Scoped to the user so that one learner is never offered another's
 * half-finished paper, whatever is left on a shared device.
 *
 * `maxAgeMs` shortens how long a run stays resumable (the checkpoint's is
 * two hours, see CHECKPOINT_RESUME_WINDOW_MIN); the default is a week.
 */
export function useSuiteSession<T>(
  dep: string,
  week: string | number,
  suite: string,
  maxAgeMs: number = MAX_AGE_MS,
): SuiteSession<T> {
  const { session, loading } = useSession();
  const userId = session?.user.id;
  const key = suiteSessionKey(userId, dep, week, suite);

  const [found, setFound] = useState<{ state: T; savedAt: number } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for the session: reading early would look under the "anon" key
    // and miss the learner's own snapshot every single time.
    if (loading) return;
    setFound(readSnapshot<T>(key, maxAgeMs));
    setReady(true);
  }, [key, loading, maxAgeMs]);

  const save = useCallback(
    (state: T) => {
      if (!ready) return; // never overwrite a snapshot we have not read yet
      writeSnapshot(key, state, maxAgeMs);
    },
    [key, ready, maxAgeMs],
  );

  const clear = useCallback(() => {
    removeSnapshot(key);
    setFound(null);
  }, [key]);

  // Stable identity. Callers persist from an effect that depends on this
  // object; a fresh one per render would re-serialise the whole run on
  // every keystroke.
  return useMemo(
    () => ({
      saved: found?.state ?? null,
      savedAt: found?.savedAt ?? null,
      ready,
      save,
      clear,
    }),
    [found, ready, save, clear],
  );
}
