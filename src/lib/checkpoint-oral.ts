import { getWeekContent, speakerAudioLabel, speakerLabel } from "./content/week-content";
import { CHECKPOINT_ORAL_ITEMS, weeksInPhase } from "./phases";
import { shuffle } from "./checkpoint-paper";

/** The oral half of a checkpoint, drawn from the whole phase.
 *
 *  This lives beside checkpoint-paper.ts rather than inside the suite because
 *  three audits had to copy it into their own scripts to measure the draw, and
 *  a copied rule is a rule that stops being the one that ships. Every one of
 *  them found the same defect, and the measurement they could not run against
 *  the real thing is what let it live. */
export type OralItem = {
  key: string;
  guestPrompt: string;
  who: string;
  audioWho: string;
  target: string;
  tip: string;
  /** The week the sentence was authored for — graded at THAT week's
   *  threshold, not the checkpoint's. */
  sourceWeek: number;
  requiredTokens?: string[];
  /** What the learner said one turn earlier, for the chained items of a
   *  multi-turn exchange. Dropping it here is how the phase's only three-turn
   *  conversation reached the checkpoint as three unrelated sentences — and
   *  worse: measured over 20,000 draws, 4.7% of oral halves served turn two or
   *  three with no opener at all, asking a learner to answer "Thank you. Good
   *  night." out of nowhere. */
  follows?: string;
};

/** Five spoken items drawn from across the phase, same pool the written
 *  paper samples. Tagged with their source week, which is why this walks
 *  the week records rather than the flattened lesson list.
 *
 *  Exported so a measurement can call it. Three audits had to copy this
 *  function into their own scripts to measure the draw, and a copied rule is
 *  a rule that stops being the one that ships. */
export function buildOral(dep: string, week: string): OralItem[] {
  const items = weeksInPhase(week).flatMap((w) => {
    const c = getWeekContent(dep, String(w));
    if (!c) return [];
    return c.lessons.flatMap((l) =>
      l.speaking.map((s) => ({
        key: `s:${w}:${s.guestPrompt}`,
        guestPrompt: s.guestPrompt,
        who: speakerLabel(s),
        audioWho: speakerAudioLabel(s),
        target: s.targetResponse,
        tip: s.helpTip,
        requiredTokens: s.requiredTokens,
        follows: s.follows,
        sourceWeek: c.weekNumber,
      })),
    );
  });
  // Stratified by week, not a pure lottery. Safety language clusters in two
  // or three weeks of a phase, and a flat draw of five can miss all of them
  // at once — measured for Spa: 29.1% of passing learners had never spoken a
  // single safety line. One item per week first (weeks shuffled, items
  // within a week shuffled), then random fill if the phase has fewer weeks
  // than slots. Every week of the phase now has a voice in the oral half.
  // A `follows` chain is ONE exchange, so it is one draw. Sampling the middle
  // turn on its own measures a turn and never the conversation the week exists
  // to teach: four academic reviews measured the same thing independently —
  // 4.5% of sittings drew a chain turn, 0.0% drew two of them, so the
  // three-turn can-do had no assessment at all. A chain is pulled in whole
  // behind its head, and the cut below never lands inside one.
  const headOf = new Map<string, number>();
  items.forEach((it, i) => headOf.set(it.target, i));
  const nextOf = new Map<number, number>();
  const isTail = new Set<number>();
  items.forEach((it, i) => {
    if (!it.follows) return;
    const prev = headOf.get(it.follows);
    if (prev === undefined || prev === i || nextOf.has(prev)) return;
    nextOf.set(prev, i);
    isTail.add(i);
  });
  const chainAt = (i: number) => {
    const out = [items[i]];
    for (let cur = i, n = nextOf.get(cur); n !== undefined; cur = n, n = nextOf.get(cur))
      out.push(items[n]);
    return out;
  };
  const heads = items.map((_, i) => i).filter((i) => !isTail.has(i));

  const byWeek = new Map<number, number[]>();
  for (const i of shuffle(heads)) {
    const wk = items[i].sourceWeek;
    if (!byWeek.has(wk)) byWeek.set(wk, []);
    byWeek.get(wk)!.push(i);
  }
  // Within a week, a chain head goes first — SOMETIMES. Pinning it every time
  // is what a flat "one draw per week" does to a pool once most weeks have a
  // chain: three audits measured the result independently and agreed. Only
  // 106 of 246 items could ever be drawn, 77% of everything a learner had to
  // say was one of twelve sentences, and memorising those twelve passed the
  // oral half 100% of the time. A certificate that says "speaking" cannot be
  // won by learning twelve sentences.
  //
  // A third of sittings still lead with the chain, which is enough to measure
  // the multi-turn can-do; the rest draw from the whole week.
  for (const list of byWeek.values())
    if (Math.random() < 0.33) list.sort((a, b) => Number(!nextOf.has(a)) - Number(!nextOf.has(b)));

  // Counted in UNITS, not turns: a chain is one draw, and the learner speaks
  // its three turns in a row the way the lesson taught them.
  const picked: typeof items = [];
  const used = new Set<number>();
  let units = 0;
  const take = (i: number) => {
    for (const it of chainAt(i)) picked.push(it);
    for (let cur: number | undefined = i; cur !== undefined; cur = nextOf.get(cur)) used.add(cur);
    units++;
  };
  // Five draws cannot cover eight weeks, so a topic that lives in one week can
  // be missed entirely. Two managers measured what that costs: 95% of sittings
  // never asked for a single "I cannot decide that — may I ask my manager?"
  // sentence, and 58% asked for no safety language at all, in a course whose
  // own help tip calls the first of those the most important sentence of the
  // phase. One draw goes first to that pool, before the per-week pass, so the
  // reservation never has to be taken back out of a chain.
  const CARRIES_AUTHORITY =
    /manager|supervisor|front desk|cannot decide|not allowed|may not|must not|do not touch|i am afraid|call security|not able to/i;
  const safety = shuffle(heads).filter((i) => CARRIES_AUTHORITY.test(items[i].target));
  if (safety.length) take(safety[0]);

  for (const wk of shuffle([...byWeek.keys()])) {
    if (units >= CHECKPOINT_ORAL_ITEMS) break;
    const next = byWeek.get(wk)!.find((i) => !used.has(i));
    if (next !== undefined) take(next);
  }
  for (const i of shuffle(heads)) {
    if (units >= CHECKPOINT_ORAL_ITEMS) break;
    if (!used.has(i)) take(i);
  }
  return picked;
}
