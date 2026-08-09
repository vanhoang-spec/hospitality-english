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

const PREFIX = "academy.session.v1.";

/** A snapshot older than this is likelier to confuse than to help: the
 *  learner has moved on, and offering "continue from question 7" of a run
 *  they abandoned a fortnight ago invites them to finish a paper they no
 *  longer remember starting. */
const MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;

type Envelope<T> = { v: 1; savedAt: number; state: T };

export function suiteSessionKey(
  userId: string | undefined,
  dep: string,
  week: string | number,
  suite: string,
): string {
  return `${PREFIX}${userId ?? "anon"}.${dep.toUpperCase()}.${week}.${suite}`;
}

function readSnapshot<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Envelope<T>;
    if (parsed?.v !== 1 || typeof parsed.savedAt !== "number") return null;
    if (Date.now() - parsed.savedAt > MAX_AGE_MS) {
      window.localStorage.removeItem(key);
      return null;
    }
    return parsed.state;
  } catch {
    return null;
  }
}

function writeSnapshot<T>(key: string, state: T) {
  if (typeof window === "undefined") return;
  try {
    const envelope: Envelope<T> = { v: 1, savedAt: Date.now(), state };
    window.localStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    // Quota or private mode. A snapshot that cannot be written must never
    // interrupt the run it exists to protect.
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
  /** False until localStorage has been read (never true during SSR). */
  ready: boolean;
  save: (state: T) => void;
  /** Call on completion, and when the learner declines the resume. */
  clear: () => void;
};

/**
 * Per-(user, department, week, suite) run snapshot in localStorage.
 *
 * Scoped to the user because these devices are shared — a shift phone
 * passed between two housekeepers must not offer one of them the other's
 * half-finished paper.
 */
export function useSuiteSession<T>(
  dep: string,
  week: string | number,
  suite: string,
): SuiteSession<T> {
  const { session, loading } = useSession();
  const userId = session?.user.id;
  const key = suiteSessionKey(userId, dep, week, suite);

  const [saved, setSaved] = useState<T | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Wait for the session: reading early would look under the "anon" key
    // and miss the learner's own snapshot every single time.
    if (loading) return;
    setSaved(readSnapshot<T>(key));
    setReady(true);
  }, [key, loading]);

  const save = useCallback(
    (state: T) => {
      if (!ready) return; // never overwrite a snapshot we have not read yet
      writeSnapshot(key, state);
    },
    [key, ready],
  );

  const clear = useCallback(() => {
    removeSnapshot(key);
    setSaved(null);
  }, [key]);

  // Stable identity. Callers persist from an effect that depends on this
  // object; a fresh one per render would re-serialise the whole run on
  // every keystroke.
  return useMemo(() => ({ saved, ready, save, clear }), [saved, ready, save, clear]);
}
