// A lesson finished with no network must still reach the manager's matrix
// (src/lib/pending-results.ts). Fake storage, fake network.
//
//   bun scripts/pending-results-test.ts
import {
  dropStale,
  flushResults,
  mergeResult,
  pendingResultCount,
  queueResult,
  type ResultRow,
} from "../src/lib/pending-results.ts";

let pass = 0;
let fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}

function fakeStore() {
  const map = new Map<string, string>();
  return {
    map,
    getItem: (k: string) => map.get(k) ?? null,
    setItem: (k: string, v: string) => void map.set(k, v),
    removeItem: (k: string) => void map.delete(k),
  };
}

const U = "user-1";
const at = (minutesAgo: number) => new Date(Date.now() - minutesAgo * 60_000).toISOString();
const row = (suite: string, o: Partial<ResultRow> = {}): ResultRow => ({
  user_id: U,
  department_id: "FO",
  week_number: 3,
  suite,
  stars: 5,
  completed_at: at(0),
  ...o,
});

// ── The network is gone, then comes back
{
  const store = fakeStore();
  const server: ResultRow[] = [];
  let online = false;
  const send = async (r: ResultRow) => {
    if (!online) return false;
    server.push(r);
    return true;
  };

  queueResult(row("vocab", { score_pct: 90, mastered: true }), store);
  await flushResults(U, send, store);
  check("no network: the result stays on the device", pendingResultCount(U, store) === 1);
  check("no network: nothing reached the server", server.length === 0);

  queueResult(row("listening", { score_pct: 70 }), store);
  await flushResults(U, send, store);
  check("a second lesson offline: both wait", pendingResultCount(U, store) === 2);

  online = true;
  await flushResults(U, send, store);
  check(
    "network back: both results sent",
    server.length === 2,
    server.map((r) => r.suite).join(","),
  );
  check("network back: nothing left waiting", pendingResultCount(U, store) === 0);
  check("an empty queue leaves no key behind", store.map.size === 0);

  await flushResults(U, send, store);
  check("nothing is sent twice", server.length === 2);
}

// ── The same suite done twice before the network returns
{
  const store = fakeStore();
  const server: ResultRow[] = [];
  queueResult(row("vocab", { score_pct: 90, mastered: true, completed_at: at(30) }), store);
  queueResult(row("vocab", { score_pct: 60, completed_at: at(1) }), store);
  check("one row per suite waits, not two", pendingResultCount(U, store) === 1);
  await flushResults(U, async (r) => (server.push(r), true), store);
  check(
    "the later score is the one sent",
    server.length === 1 && server[0].score_pct === 60,
    JSON.stringify(server[0]),
  );
  check("an earlier pass is not lost to a weaker retake", server[0].mastered === true);
}

// ── A retake that never passed stays unpassed
{
  const merged = mergeResult([row("vocab", { score_pct: 40 })], row("vocab", { score_pct: 55 }));
  check("no pass before, no pass after", merged.length === 1 && merged[0].mastered === undefined);
}

// ── Other suites and weeks are left alone
{
  const q = [row("vocab"), row("vocab", { week_number: 4 }), row("vocab", { department_id: "HK" })];
  const merged = mergeResult(q, row("vocab", { score_pct: 10 }));
  check("only the same department, week and suite is replaced", merged.length === 3);
}

// ── A result recorded while another is on its way
{
  const store = fakeStore();
  const server: ResultRow[] = [];
  queueResult(row("weektest", { score_pct: 70, completed_at: at(2) }), store);
  const first = flushResults(
    U,
    async (r) => {
      // The graded result lands while the banked one is still in flight.
      if (server.length === 0)
        queueResult(row("weektest", { score_pct: 85, mastered: true, completed_at: at(0) }), store);
      server.push(r);
      return true;
    },
    store,
  );
  await first;
  check(
    "the newer result is still waiting after the older one lands",
    pendingResultCount(U, store) === 1,
  );
  await flushResults(U, async (r) => (server.push(r), true), store);
  check(
    "and is sent last, so the server ends on it",
    server.length === 2 && server[1].score_pct === 85 && server[1].mastered === true,
    server.map((r) => r.score_pct).join(" → "),
  );
  check("then nothing waits", pendingResultCount(U, store) === 0);
}

// ── Flushes run one at a time, in order
{
  const store = fakeStore();
  const order: string[] = [];
  const slow = async (r: ResultRow) => {
    order.push(`start ${r.suite}`);
    await new Promise((res) => setTimeout(res, 5));
    order.push(`end ${r.suite}`);
    return true;
  };
  queueResult(row("vocab"), store);
  const a = flushResults(U, slow, store);
  queueResult(row("grammar"), store);
  const b = flushResults(U, slow, store);
  await Promise.all([a, b]);
  check(
    "two flushes do not overlap",
    order.join(" | ") === "start vocab | end vocab | start grammar | end grammar",
    order.join(" | "),
  );
}

// ── A sender that throws is a sender that failed
{
  const store = fakeStore();
  queueResult(row("reading"), store);
  await flushResults(
    U,
    async () => {
      throw new Error("Failed to fetch");
    },
    store,
  );
  check("a thrown network error keeps the row", pendingResultCount(U, store) === 1);
}

// ── One refused row does not hold the others back
{
  const store = fakeStore();
  const server: ResultRow[] = [];
  queueResult(row("vocab"), store);
  queueResult(row("grammar"), store);
  await flushResults(U, async (r) => (r.suite === "vocab" ? false : (server.push(r), true)), store);
  check(
    "the row behind a refused one is still sent",
    server.length === 1 && server[0].suite === "grammar" && pendingResultCount(U, store) === 1,
  );
}

// ── Old rows, and rows that are not this learner's
{
  const days = (n: number) => new Date(Date.now() - n * 86_400_000).toISOString();
  const kept = dropStale(
    [row("vocab", { completed_at: days(31) }), row("grammar", { completed_at: days(29) })],
    Date.now(),
  );
  check("a row older than 30 days is dropped", kept.length === 1 && kept[0].suite === "grammar");

  const store = fakeStore();
  store.map.set(
    "academy.pendingResults.v1." + U,
    JSON.stringify([row("vocab"), row("grammar", { user_id: "someone-else" }), { junk: true }]),
  );
  check("someone else's row and junk are ignored", pendingResultCount(U, store) === 1);
  store.map.set("academy.pendingResults.v1." + U, "{broken");
  check("broken JSON reads as an empty queue", pendingResultCount(U, store) === 0);
}

// ── Where it is kept, and what happens when it cannot be kept
{
  const store = fakeStore();
  queueResult(row("vocab"), store);
  check(
    "kept under academy.*, which signing out clears",
    [...store.map.keys()].every((k) => k.startsWith("academy.")),
    [...store.map.keys()].join(","),
  );
  check("signed out: nothing counted", pendingResultCount(undefined, store) === 0);

  const full = {
    getItem: () => null,
    setItem: () => {
      throw new Error("QuotaExceededError");
    },
    removeItem: () => {},
  };
  check(
    "a device that cannot store says so, so the caller sends directly",
    queueResult(row("vocab"), full) === false,
  );
  check("no storage at all: same", queueResult(row("vocab"), null) === false);
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
