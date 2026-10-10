// SUITE RESULTS THAT HAVE NOT REACHED THE SERVER YET.
//
// `recordSuiteResult` used to send its row once and forget it. On a hotel's
// back-of-house wifi that is a lost lesson: the learner sees their score, the
// request dies, and the manager's matrix never hears of it. With the app now
// installable and its offline page promising that progress "will sync when
// the network returns", the row has to actually wait for the network.
//
// So every result is written here first and sent from here. A row leaves the
// queue only when the server has taken it.
//
// No Supabase import on purpose: the sender is passed in, so the queue's
// rules can be tested with a fake storage and a fake network
// (scripts/pending-results-test.ts).

export type ResultRow = {
  user_id: string;
  department_id: string;
  week_number: number;
  suite: string;
  stars: number;
  completed_at: string;
  score_pct?: number;
  /** Only ever `true`: mastery is sticky, see recordSuiteResult. */
  mastered?: true;
};

type Store = Pick<Storage, "getItem" | "setItem" | "removeItem">;

/** Under "academy." like the pending-star queue, so signing out clears it
 *  (see signOut in lib/auth). The account menu warns before that happens. */
const PREFIX = "academy.pendingResults.v1.";

/** A row this old is not waiting for the network any more; something else
 *  refuses it. Dropping it stops every app start from retrying it forever. */
const MAX_AGE_MS = 30 * 24 * 60 * 60 * 1000;

/** Far above what forty weeks of nine suites can queue for one learner in
 *  one department; a bound, so a broken sender cannot fill the storage. */
const MAX_ROWS = 400;

function defaultStore(): Store | null {
  try {
    return typeof localStorage === "undefined" ? null : localStorage;
  } catch {
    return null;
  }
}

const sameSuite = (a: ResultRow, b: ResultRow) =>
  a.department_id === b.department_id && a.week_number === b.week_number && a.suite === b.suite;

/** One row per (department, week, suite), the newest one, with mastery
 *  carried forward.
 *
 *  That is what the table itself would hold had both rows arrived: the
 *  upsert overwrites score and stars, and never writes `mastered: false`.
 *  Sending the older row after the newer one would put a stale score back,
 *  so the older row is not kept at all. */
export function mergeResult(queue: ResultRow[], row: ResultRow): ResultRow[] {
  const earlier = queue.find((r) => sameSuite(r, row));
  const merged: ResultRow = earlier?.mastered ? { ...row, mastered: true } : row;
  return [...queue.filter((r) => !sameSuite(r, row)), merged];
}

export function dropStale(queue: ResultRow[], now: number): ResultRow[] {
  const fresh = queue.filter((r) => {
    const at = Date.parse(r.completed_at);
    return Number.isFinite(at) && now - at <= MAX_AGE_MS;
  });
  return fresh.slice(-MAX_ROWS);
}

function isRow(x: unknown): x is ResultRow {
  const r = x as Partial<ResultRow> | null;
  return (
    !!r &&
    typeof r.user_id === "string" &&
    typeof r.department_id === "string" &&
    typeof r.week_number === "number" &&
    typeof r.suite === "string" &&
    typeof r.stars === "number" &&
    typeof r.completed_at === "string"
  );
}

function readQueue(userId: string, store: Store): ResultRow[] {
  try {
    const raw = store.getItem(PREFIX + userId);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Only this learner's rows: the key is theirs, and a row for anyone else
    // would be refused by the table's own rules on every single retry.
    return dropStale(
      parsed.filter((r): r is ResultRow => isRow(r) && r.user_id === userId),
      Date.now(),
    );
  } catch {
    return [];
  }
}

function writeQueue(userId: string, queue: ResultRow[], store: Store): boolean {
  try {
    if (queue.length === 0) store.removeItem(PREFIX + userId);
    else store.setItem(PREFIX + userId, JSON.stringify(queue));
    return true;
  } catch {
    // Quota or private mode.
    return false;
  }
}

/**
 * Put a result in the queue; call `flushResults` straight after.
 *
 * False when the device would not store it. The caller must then send the
 * row itself — a result that cannot be queued still has to go out once.
 */
export function queueResult(row: ResultRow, store: Store | null = defaultStore()): boolean {
  if (!store) return false;
  return writeQueue(row.user_id, mergeResult(readQueue(row.user_id, store), row), store);
}

/** How many results on this device the server has not taken yet. */
export function pendingResultCount(
  userId: string | undefined,
  store: Store | null = defaultStore(),
): number {
  if (!userId || !store) return 0;
  return readQueue(userId, store).length;
}

// One flush at a time, in the order they were asked for. Two results for the
// same suite can be recorded in the same tick (the checkpoint banks its
// written half, then grades), and two requests racing each other could land
// the older one last.
let chain: Promise<void> = Promise.resolve();

/**
 * Send everything queued for this learner. `send` resolves true when the
 * server took the row; anything else leaves the row for the next flush.
 */
export function flushResults(
  userId: string,
  send: (row: ResultRow) => Promise<boolean>,
  store: Store | null = defaultStore(),
): Promise<void> {
  chain = chain
    .then(async () => {
      if (!store) return;
      for (const row of readQueue(userId, store)) {
        let taken = false;
        try {
          taken = await send(row);
        } catch {
          taken = false;
        }
        if (!taken) continue;
        // Re-read: a newer result for the same suite may have been queued
        // while this one was in flight, and that one has not been sent.
        const now = readQueue(userId, store);
        writeQueue(
          userId,
          now.filter((r) => !(sameSuite(r, row) && r.completed_at === row.completed_at)),
          store,
        );
      }
    })
    .catch(() => {});
  return chain;
}
