import { getWeekContent, speakerAudioLabel, speakerLabel } from "./content/week-content";
import { CHECKPOINT_ORAL_ITEMS, oralPassMin, weeksInPhase } from "./phases";
import { shuffle } from "./checkpoint-paper";
import { acceptedAnswers, type AcceptedAnswer } from "./speaking-alternates";

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
  /** The other replies the phase teaches for this same line. */
  alternates?: AcceptedAnswer[];
  /** The one draw reserved below for a decision the speaker does not own, or
   *  the department's own risk. The suite requires it outright — see
   *  oralHalfPassed(). Set HERE and nowhere else: the reservation is made by
   *  a regex this file owns, and a copy of that regex in the suite would be a
   *  second rule that stops being the one that ships. */
  reserved?: boolean;
};

/** Five spoken items drawn from across the phase, same pool the written
 *  paper samples. Tagged with their source week, which is why this walks
 *  the week records rather than the flattened lesson list.
 *
 *  Exported so a measurement can call it. Three audits had to copy this
 *  function into their own scripts to measure the draw, and a copied rule is
 *  a rule that stops being the one that ships. */
/** Every answer an oral item accepts, its own first. */
export const answersOf = (item: OralItem): AcceptedAnswer[] => [
  { target: item.target, requiredTokens: item.requiredTokens },
  ...(item.alternates ?? []),
];

/** Whether the spoken half of a sitting passed: the count, AND the reserved
 *  draw.
 *
 *  The count alone said yes to a learner who answered the safety or authority
 *  item wrong — measured at 100% of 2,000 sittings a department when the other
 *  four were right. Three of five is a fair bar for fluency and a useless one
 *  for "may I promise this?", which is not a matter of degree: the reserved
 *  draw exists because five draws cannot cover eight weeks and that sentence
 *  has to be in every sitting, and a sentence that has to be asked has to be
 *  answered.
 *
 *  Lives here, next to the reservation that sets the flag, so the suite cannot
 *  drift from it and a measurement can call the thing that ships. */
export function oralHalfPassed(results: { item: OralItem; passed: boolean }[]): boolean {
  if (results.length === 0) return true;
  if (results.some((r) => r.item.reserved && !r.passed)) return false;
  return results.filter((r) => r.passed).length >= oralPassMin(results.length);
}

export function buildOral(dep: string, week: string): OralItem[] {
  // Carried beside each item and never exported: which LESSON printed it. A
  // `follows` is a within-lesson contract (see the resolution below), and the
  // flattened phase-wide list is the only place that fact is lost.
  const built = weeksInPhase(week).flatMap((w) => {
    const c = getWeekContent(dep, String(w));
    if (!c) return [];
    return c.lessons.flatMap((l) =>
      l.speaking.map((s) => ({
        lesson: `${c.weekNumber}/${l.lessonId}`,
        item: {
          key: `s:${w}:${s.guestPrompt}`,
          guestPrompt: s.guestPrompt,
          who: speakerLabel(s),
          audioWho: speakerAudioLabel(s),
          target: s.targetResponse,
          tip: s.helpTip,
          requiredTokens: s.requiredTokens,
          follows: s.follows,
          alternates: acceptedAnswers(
            dep,
            week,
            s.guestPrompt,
            s.targetResponse,
            s.requiredTokens,
            s.speakerRole,
          ).slice(1),
          sourceWeek: c.weekNumber,
        } as OralItem,
      })),
    );
  });
  const items: OralItem[] = built.map((b) => b.item);
  const lessonOf = (i: number) => built[i]!.lesson;
  // One reserved draw, then a flat draw from the whole phase. This used to be
  // stratified one-per-week, which spread topics but not tickets: a sentence in
  // a thin week was drawn several times as often as one in a busy week, and a
  // round of reviews measured memorising the sixty most frequent sentences
  // passing the oral half 62-74% of the time. The reservation below is what
  // keeps the safety language in every sitting; the rest has to be even.
  // A `follows` chain is ONE exchange, so it is one draw. Sampling the middle
  // turn on its own measures a turn and never the conversation the week exists
  // to teach: four academic reviews measured the same thing independently —
  // 4.5% of sittings drew a chain turn, 0.0% drew two of them, so the
  // three-turn can-do had no assessment at all. A chain is pulled in whole
  // behind its head, and the cut below never lands inside one.
  const flat = (t: string) =>
    t
      .toLowerCase()
      .replace(/[^a-z ]/g, " ")
      .replace(/ +/g, " ")
      .trim();

  // A `follows` RESOLVES INSIDE ITS OWN LESSON, and nowhere else.
  //
  // The field holds the previous turn's sentence verbatim, so it was matched
  // against a phase-wide `target -> index` map built by
  // `items.forEach((it, i) => headOf.set(it.target, i))` — last write wins.
  // The shared frames print the same model sentence in several lessons, so
  // whenever a chain's opener was one of those, the link landed on whichever
  // COPY happened to be flattened last and the real opener was never drawn at
  // all: four departments' week-15 exchange (FO/SW/GR/BO, the "We…" variant of
  // the golden frame) was served as lesson 15_4's copy of the opener followed
  // by lesson 15_1's second turn — two different guest prompts, two different
  // source weeks, graded at the wrong week's threshold, printed to the learner
  // as one conversation. Nothing caught it: the strings matched exactly, so
  // the linter's Layer N (`follows` names a real target in the same lesson)
  // stayed green, and the chain was still drawn whole, so the draw looked
  // healthy from every angle except the one that matters.
  //
  // The rule is the lesson, not the week and not the phase, because that is
  // the only scope in which the field means anything: `SpeakingItem.follows`
  // documents itself as "what the LEARNER said one turn earlier", the derived
  // pass in week-content.ts writes it from `all[i - 1].targetResponse` inside
  // one lesson's array, and Layer N already requires a match there. A wider
  // fallback — same week, then anywhere in the phase — cannot help: any match
  // outside the lesson is by construction a DUPLICATE sentence rather than a
  // continuation, so widening the search can only ever reproduce the defect.
  // So there is no fallback. An ambiguous or unresolvable link is REFUSED, and
  // the turn that asked for it is struck out of the draw below rather than
  // served behind the wrong opener or behind no opener at all.
  const nextOf = new Map<number, number>();
  const isTail = new Set<number>();
  /** A turn whose opener could not be resolved — never drawable. */
  const unlinkable = new Set<number>();
  /** The copy of `items[i].follows` printed in i's own lesson: the nearest one
   *  BEFORE it, since an exchange runs forward. A copy after it is taken only
   *  when the lesson prints none before — a lesson that answers its own later
   *  turn is still one exchange, and the alternative is dropping it. */
  const openerFor = (i: number) => {
    const want = items[i]!.follows;
    const lesson = lessonOf(i);
    let before: number | undefined;
    let after: number | undefined;
    for (let j = 0; j < items.length; j++) {
      if (j === i || items[j]!.target !== want || lessonOf(j) !== lesson) continue;
      if (j < i) before = j;
      else if (after === undefined) after = j;
    }
    return before ?? after;
  };
  items.forEach((it, i) => {
    if (!it.follows) return;
    const prev = openerFor(i);
    // Two turns claiming the same opener are not one chain, and serving the
    // second on its own is the orphan this whole block exists to prevent.
    if (prev === undefined || nextOf.has(prev)) {
      unlinkable.add(i);
      return;
    }
    nextOf.set(prev, i);
    isTail.add(i);
  });
  const chainAt = (i: number) => {
    const out = [items[i]];
    for (let cur = i, n = nextOf.get(cur); n !== undefined; cur = n, n = nextOf.get(cur))
      out.push(items[n]);
    return out;
  };
  // ONE TICKET PER SENTENCE. The shared frames print the same model sentence
  // in several weeks, and every copy was a separate entry in the draw: "The
  // treatment note is confirmed." sat in 35% of Spa sittings, "I am afraid
  // not. Would you prefer another option?" in 21-28% of every department's,
  // and memorising the sixty most frequent sentences passed the oral half
  // 62-74% of the time. The kept copy is the one a chain links to.
  //
  // WHICH copy holds the ticket used to be "the last one flattened", which was
  // arbitrary and was also — through the same `headOf` map — what decided the
  // chain link. Now that a chain resolves inside its lesson, the two decisions
  // have to be made in that order or the fix eats itself: name the ticket by
  // position and the week-15 opener above (lesson 15_1) loses it to lesson
  // 15_4's copy, the opener drops out of the draw, its tail is already marked
  // `isTail` — and the exchange the fix exists to repair becomes undrawable.
  // So the ticket goes to the copy that OPENS an exchange, and only otherwise
  // to the last copy exactly as before. Still one ticket per sentence: the
  // opener's ticket replaces the plain copy's, it does not join it.
  //
  // Two copies that each open a DIFFERENT exchange both keep a ticket, since
  // the alternative is deleting a taught conversation to save a duplicate. No
  // department has one today; Layer P in scripts/lint-content.ts is what keeps
  // it that way.
  const kept = new Set<number>();
  const lastPlain = new Map<string, number>();
  items.forEach((it, i) => {
    if (isTail.has(i) || unlinkable.has(i)) return;
    if (nextOf.has(i)) kept.add(i);
    else lastPlain.set(it.target, i);
  });
  const opened = new Set([...kept].map((i) => items[i]!.target));
  for (const [target, i] of lastPlain) if (!opened.has(target)) kept.add(i);
  const heads = [...kept].sort((a, b) => a - b);
  // A guest line the phase answers two different ways is not an oral item.
  // The model is hidden at the exam, so the learner cannot know which of the
  // two taught answers this paper holds, and the other one fails: 9.2% of
  // Spa sittings carried one, and swapping the two answers failed 14 of 14.
  //
  // Lines that ask the same thing in other words ("What else do you need from
  // me?" / "Do you need anything else from me?") stay in the draw: excluding
  // them too cut the pool from ~240 sentences to ~140 and let sixty memorised
  // sentences pass 57-65% of sittings. They carry each other's answers
  // instead — see `alternates`.
  const answersTo = new Map<string, Set<string>>();
  for (const i of heads) {
    const k = flat(items[i].guestPrompt);
    if (!answersTo.has(k)) answersTo.set(k, new Set());
    answersTo.get(k)!.add(flat(items[i].target));
  }
  const pool = heads.filter((i) => answersTo.get(flat(items[i].guestPrompt))!.size === 1);

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
  // ONE draw is reserved, and it goes first so it never has to be taken back
  // out of a chain: a decision the speaker does not own, or the department's
  // own risk.
  //
  // Five draws cannot cover eight weeks, and without a reservation 95% of
  // sittings never asked for "I cannot decide that — may I ask my manager?".
  // The old pattern was any sentence naming a manager or a prohibition, so a
  // third of the reserved draws went on "Please do not touch the fire
  // extinguisher", "I informed the supervisor, and the issue is closed." and
  // "The duty manager approved an upgrade" — none of them a decision. It now
  // matches refusing, deferring and escalating. The department pattern adds
  // what a manager of that desk reads first: the room number and the payment
  // that failed, the allergy, pregnancy and the water, lost property and the
  // door that must not open, the guest nobody may confirm is staying.
  //
  // Both go into ONE pool for ONE draw. Reserving one draw for each shrank
  // each pool to a handful of sentences, and memorising those handfuls passed
  // two of five units on their own — the memorisation curve went from 62-74%
  // to 90-100% at sixty sentences in a single measurement.
  const CARRIES_AUTHORITY =
    /cannot decide|decide (that )?alone|ask my (manager|supervisor)|call (my|the) (manager|supervisor|duty manager)|ask the front desk|not (allowed|permitted|possible)|may not|must not|cannot (give|confirm|promise|open|take|guarantee)|did not go through|step this way|call security|not able to|stop (here|now)|before we start/i;
  // A TOPIC ALTERNATIVE NAMES A BEHAVIOUR, NOT A SUBJECT.
  //
  // The list below used to be nouns — `passport`, `upgrade`, `deposit`,
  // `wet`, `maintenance`, `health form`, `injur` — and a noun matches the
  // week's filing as readily as its risk. Measured on the real draw, that put
  // the must-be-right slot on sentences nobody has to get right: "The duty
  // manager approved an upgrade." (3.67% of FO sittings — the sentence the
  // comment above names as what broke the OLD pattern), "Good morning, madam.
  // May I have your room number?" (4.00%), "I will note the passport number
  // in the system." (4.25%), "The wet floor sign is on your right." (2.25%),
  // "I sent a maintenance request this morning." (2.75%), "Here are your
  // treatment robe and towel cover." and "First I greet at the door, then I
  // check the health form." Thirteen of FO's twenty-seven reserved-draw
  // sentences and thirty-five of Spa's forty-six were in on a bare noun.
  //
  // So each alternative below has to name the act: refusing, deferring,
  // escalating, warning, or the screening question that changes a treatment.
  // `wet` becomes the sign going out and the floor being wet, not the sign's
  // location; `maintenance` becomes the request being made, not a report of
  // one already sent; the spa keeps the screening questions and the first aid
  // and gives up its filing vocabulary.
  //
  // WHAT IS DELIBERATELY NOT TIGHTENED, and it is not an oversight. The pool
  // this draw runs on is thin outside Phase 2 — measured at one to five
  // sentences per department per phase — and the reservation is already
  // impossible for SW/GR/BO at week 30 and BO at week 40. Guest Relations'
  // whole reserved pool in Phase 1 is two `room number` lines, so taking bare
  // `room number` out of GR (as was done for FO, which keeps an escalation
  // line in that phase) would take week 14 from having the slot to not having
  // it at all. F&B's Phase 1 pool is the single line `allerg` matches. Those
  // two stay as they are until the content behind them exists; the queue's
  // own GR item is a content fix, not a pattern one.
  const TOPIC: Record<string, RegExp> = {
    FO: /cannot give (a|the) room number|cannot confirm|another (card|terminal)|photo identification|keep (it|your passport) briefly|release the hold|ask (my|the) manager about (an upgrade|a late check-out)|step (this way|aside)/i,
    FB: /allerg|nuts|halal|check with the kitchen|only the kitchen|the chef will confirm/i,
    HK: /lost property|log the item|front desk|security|chemical|belongings|do not move|wet floor sign out|floor is wet|put in a maintenance request|maintenance will/i,
    SW: /pregnan|allerg|cannot start|ask (my|the) (manager|supervisor)|call(ing)? (the|our) (on-duty )?(nurse|lifeguard)|signal (our|us)|red flag (means|is up)|not (recommended|permitted)|under 12|heat exhaustion|comfort level|undress/i,
    GR: /room number|cannot confirm|not yet|call and confirm|message for the guest|for the guest/i,
    BO: /approv|confidential|sign off/i,
  };
  const topic = TOPIC[dep.toUpperCase()];
  const reserved = shuffle(pool).find(
    (i) => CARRIES_AUTHORITY.test(items[i].target) || (topic?.test(items[i].target) ?? false),
  );
  if (reserved !== undefined) {
    // The reservation put the sentence in the paper and stopped there, so it
    // was worth the same as any other draw and the pass mark is 3 of 5:
    // simulated over 2,000 sittings a department, a learner who got this one
    // item wrong and the other four right passed 100% of the time. Reserving a
    // draw for "I cannot decide that — may I ask my manager?" and then not
    // minding the answer is not an assessment of it.
    items[reserved] = { ...items[reserved]!, reserved: true };
    take(reserved);
  }
  for (const i of shuffle(pool)) {
    if (units >= CHECKPOINT_ORAL_ITEMS) break;
    if (!used.has(i)) take(i);
  }
  return picked;
}
