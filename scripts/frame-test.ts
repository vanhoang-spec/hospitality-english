// The 80-week frame (src/lib/phases.ts) and the switch that keeps weeks 41-80
// away from learners until they are released.
//
// Two promises are checked: the code can hold a week-41 lesson (it has a
// phase, a listening speed, a mastery bar, a checkpoint), and nothing a
// learner or an HR manager sees has moved.
//
//   bun scripts/frame-test.ts
import { ALL_WEEKS, AVAILABLE_WEEKS } from "../src/lib/content/week-content.ts";
import {
  ALL_PHASES,
  CHECKPOINT_WEEKS,
  COURSE_WEEKS,
  LISTENING_RATE_CEILING,
  PHASES,
  RELEASED_THROUGH_WEEK,
  isCheckpointWeek,
  isReleasedWeek,
  listeningRateForWeek,
  phaseOfWeek,
  suiteMasteryPct,
  weeksInPhase,
} from "../src/lib/phases.ts";
import { passThresholds } from "../src/lib/speaking-score.ts";
import {
  isWeekUnlocked,
  nextCheckpoint,
  unlockedThroughPhase,
  weekIsClosed,
} from "../src/lib/week-access.ts";

let pass = 0;
let fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}

// ── The frame the code holds ───────────────────────────────────────────────
check("nine phases, eighty weeks", ALL_PHASES.length === 9 && COURSE_WEEKS === 80);
{
  let next = 1;
  let ok = true;
  for (const [i, p] of ALL_PHASES.entries()) {
    if (p.index !== i || p.from !== next || p.checkpointWeek !== p.to) ok = false;
    next = p.to + 1;
  }
  check("the phases run 1-80 with no gap, and each ends on its own checkpoint", ok && next === 81);
}
check(
  "weeks 41-80 fall in phases 5-8, ten weeks each, checkpoints at 50, 60, 70, 80",
  [41, 50, 51, 60, 61, 70, 71, 80].map((w) => phaseOfWeek(w)?.index).join() === "5,5,6,6,7,7,8,8" &&
    [50, 60, 70, 80].every(isCheckpointWeek) &&
    weeksInPhase(50).length === 10,
);
check("week 81 belongs to nothing", phaseOfWeek(81) === null && !isCheckpointWeek(81));

{
  let prev = 0;
  let ok = true;
  for (let w = 1; w <= COURSE_WEEKS; w++) {
    const r = listeningRateForWeek(w);
    const m = suiteMasteryPct(w);
    const t = passThresholds(w);
    if (!Number.isFinite(r) || r < prev || r > 1) ok = false;
    if (!Number.isFinite(m) || !Number.isFinite(t.accPct) || !Number.isFinite(t.orderRatio))
      ok = false;
    prev = r;
  }
  check(
    "every week 1-80 has a listening speed that never falls, a mastery bar and a speaking bar",
    ok,
  );
}

// ── What has NOT moved ─────────────────────────────────────────────────────
check(
  "released through week 40",
  RELEASED_THROUGH_WEEK === 40 && isReleasedWeek(40) && !isReleasedWeek(41),
);
check(
  "a learner's phases are the same five, their checkpoints the same five",
  PHASES.length === 5 && CHECKPOINT_WEEKS.join() === "6,14,22,30,40",
);
check(
  "weeks 31-40 still play at 0.9, the fastest a released week goes",
  [31, 35, 40].every((w) => listeningRateForWeek(w) === 0.9) && LISTENING_RATE_CEILING === 0.9,
);
check(
  "the timeline and the HR matrix list weeks 1-40 and nothing above",
  AVAILABLE_WEEKS.length > 0 && Math.max(...AVAILABLE_WEEKS) <= RELEASED_THROUGH_WEEK,
  `${AVAILABLE_WEEKS.length} weeks, last ${Math.max(...AVAILABLE_WEEKS)}`,
);
check(
  "a week written ahead of its release would be in the registry and off the timeline",
  Object.values(ALL_WEEKS)
    .filter((w) => !isReleasedWeek(w.weekNumber))
    .every((w) => !AVAILABLE_WEEKS.includes(w.weekNumber)),
);

// ── Nobody is walked into an unreleased week ───────────────────────────────
{
  const everything = [6, 14, 22, 30, 40];
  check("passing week 40 does not open week 41", !isWeekUnlocked(41, everything));
  check(
    "…and leaves no 'next checkpoint' pointing past the end",
    nextCheckpoint(everything) === null,
  );
  check(
    "the furthest phase open is still phase 4",
    unlockedThroughPhase([...everything, 50]) === 4,
  );
  check("a released week unlocks as before", isWeekUnlocked(23, [22]) && !isWeekUnlocked(23, [14]));
}
{
  const learner = {
    ready: true,
    isUnlocked: (w: string | number) => isWeekUnlocked(w, [6, 14, 22, 30, 40]),
  };
  const staff = { ready: true, isUnlocked: () => true };
  const unknown = { ready: false, isUnlocked: () => false };
  check("week 41 is closed to a learner who has passed everything", weekIsClosed(learner, 41));
  check(
    "week 41 is closed while the app does not yet know who is asking",
    weekIsClosed(unknown, 41),
  );
  check("week 41 opens for staff, who have to review it", !weekIsClosed(staff, 41));
  check("a released week still fails open before the history is read", !weekIsClosed(unknown, 33));
  check(
    "…and locks once it is read and the phase is not open",
    weekIsClosed({ ready: true, isUnlocked: () => false }, 33),
  );
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
