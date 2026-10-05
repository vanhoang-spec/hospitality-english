import { isContentToken, normalize, polarityOf } from "./speaking-score";

/** SAME SENTENCE, ANOTHER SHAPE.
 *
 *  Ten blind reviews of Phase 3 wrote what a good member of staff actually
 *  says on each must-be-right turn and ran it through the reserved slot. It
 *  accepted 11-28% of them, and almost every refusal was one of a handful of
 *  shapes, none of which changes what the sentence commits the hotel to:
 *
 *  - the two sentences said the other way round, or joined with "but"/"and"
 *    ("I cannot remove the charge, but my manager can review it.");
 *  - the two people called named in the other order ("the duty manager and
 *    first aid");
 *  - "myself" said or left out of a refusal ("I cannot offer a free night");
 *  - the reason or the condition moved to the front ("For the safety of our
 *    guests, visitors have to wait in the lobby.");
 *  - "I will" for "I am going to", "need to" for "have to", "That is" for
 *    "It is", "wrote it" for "noted it" — the week-23-to-30 grammar itself.
 *
 *  Failing the slot fails the whole spoken half, so each of those was a
 *  competent learner sent back. Rather than loosen the grader — which has
 *  twelve rounds of near-miss regressions behind it — each model sentence
 *  from week 23 on is re-written into those shapes here, and every shape is
 *  graded exactly as strictly as the model: the same scorer, and every word
 *  the model locks that the shape still says.
 *
 *  Only shapes that keep every content word of the model (or drop a word
 *  whose loss cannot change the commitment: "then", "myself") are made, so
 *  nothing here can turn "cannot" into "can", "now" into "later", or drop the
 *  person who is called. The negation flips, money words, time shifts and
 *  half-answers the reviews wrote were all re-run against the shapes. */
export type Shape = { target: string; requiredTokens?: string[] };

export const SHAPES_FROM_WEEK = 23;

/** Steps a reply says it is taking, as "-ing" and as the bare verb. */
const PROGRESSIVE: Record<string, string> = {
  asking: "ask",
  telling: "tell",
  writing: "write",
  handing: "hand",
  taking: "take",
  going: "go",
  staying: "stay",
  checking: "check",
  sending: "send",
  putting: "put",
  getting: "get",
  phoning: "phone",
  dialling: "dial",
  knocking: "knock",
  coming: "come",
  passing: "pass",
  waiting: "wait",
  giving: "give",
  holding: "hold",
  moving: "move",
  switching: "switch",
  opening: "open",
  closing: "close",
  keeping: "keep",
  noting: "note",
  logging: "log",
  reporting: "report",
  following: "follow",
  informing: "inform",
  speaking: "speak",
  looking: "look",
  clearing: "clear",
  showing: "show",
  walking: "walk",
  telephoning: "telephone",
};

/** One word or phrase for another that the floor treats as the same move. */
const SWAPS: [RegExp, string][] = [
  [/\bI am calling\b/g, "I will call"],
  [/\bI will call\b/g, "I am calling"],
  [/\bI am bringing\b/g, "I will bring"],
  [/\bI will bring\b/g, "I am bringing"],
  [/\bI am stopping\b/g, "I will stop"],
  [/\bI will stop\b/g, "I am stopping"],
  [/\bthe manager\b/gi, "my manager"],
  [/\bmy manager\b/gi, "the manager"],
  [/\bour manager\b/gi, "the manager"],
  // Not "the duty manager": "duty" is the lock on every turn that escalates
  // past the learner's own manager, and a shape that drops it would hand the
  // slot to "I will ask the manager".
  [/\bthe (restaurant|bar|spa) manager\b/gi, "the manager"],
  [/\bthe chef\b/gi, "the kitchen"],
  [/\bthe kitchen\b/gi, "the chef"],
  [/\bMay I see\b/g, "May I check"],
  [/\bMay I check\b/g, "May I see"],
  [/\bPlease take\b/g, "Please use"],
  [/\bPlease use\b/g, "Please take"],
  [/\bIt is\b/g, "That is"],
  [/\bThat is\b/g, "It is"],
  [/\bhave to\b/g, "need to"],
  [/\bneed to\b/g, "have to"],
  [/\bhas to\b/g, "needs to"],
  [/\bneeds to\b/g, "has to"],
  [/\bwithin (\w+) minutes\b/g, "in $1 minutes"],
  [/\bin (\w+) minutes\b/g, "within $1 minutes"],
  [/\banother\b/g, "a different"],
  [/\ba different\b/g, "another"],
  [/\bnoted it\b/g, "wrote it"],
  [/\bwrote it\b/g, "noted it"],
  [/\bI will ask (my|the|our) /g, "I will check with $1 "],
  [/\bI will check with (my|the|our) /g, "I will ask $1 "],
  [/\b(escalate|report|check|fix|clean|send|bring) it\b/g, "$1 this"],
  // will / going to — week 25 teaches both for the same promise. Not before
  // "not": "I am going to not go in" is not English.
  [/\bI will\b(?! not)/g, "I am going to"],
  [/\bI am going to\b/g, "I will"],
  [/\b([Ww]e|[Tt]hey) will\b(?! not)/g, "$1 are going to"],
  [/\b([Ww]e|[Tt]hey) are going to\b/g, "$1 will"],
  [/\b([Hh]e|[Ss]he) will\b(?! not)/g, "$1 is going to"],
  [/\b([Hh]e|[Ss]he) is going to\b/g, "$1 will"],
  // The escalation said as "can", "will" or "am asking": "…but I CAN ask my
  // Duty Manager now" and "…but I WILL ask…" make the same move, and round 2
  // failed each for the other (13 of 37 frame swaps passed in one
  // department). Only before ask/check — "I can offer" is a different promise
  // from "I will offer".
  [/\bI can (ask|check)\b/g, "I will $1"],
  [/\bI will (ask|check)\b/g, "I can $1"],
  // Someone else's decision, now or to come.
  [
    /\b(manager|supervisor|chef|insurer|office|team|[Ff]irst aid|[Hh]e|[Ss]he) decides\b/g,
    "$1 will decide",
  ],
  [
    /\b(manager|supervisor|chef|insurer|office|team|[Ff]irst aid|[Hh]e|[Ss]he) will decide\b/g,
    "$1 decides",
  ],
  // "I am asking my Duty Manager now" / "I will ask…": the progressive and
  // the promise of the same step. Round 2 failed 25 of 35 in one department.
  ...Object.entries(PROGRESSIVE).flatMap(([ing, base]): [RegExp, string][] => [
    [new RegExp(`\\bI will ${base}\\b`, "g"), `I am ${ing}`],
    [new RegExp(`\\bI am ${ing}\\b`, "g"), `I will ${base}`],
    [new RegExp(`\\bWe are ${ing}\\b`, "g"), `We will ${base}`],
    [new RegExp(`\\b[Ww]e will ${base}\\b`, "g"), `we are ${ing}`],
  ]),
];

/** In a refusal the verb is not the commitment — "I cannot change / remove /
 *  cancel / waive the fee" all say no to the same thing. Only after a
 *  negator, so "I will change your booking" never becomes "I will cancel it". */
const REFUSAL_VERBS = ["change", "remove", "cancel", "waive", "delete"];
const REFUSED = new RegExp(
  `\\b(cannot|can't|not able to|not) (${REFUSAL_VERBS.join("|")})\\b`,
  "g",
);

/** People a turn may call, in either order. */
const PARTY =
  "(?:first aid|security|the security officer|the security team|the duty manager|my manager|the manager|" +
  "my supervisor|the supervisor|the hotel nurse|the nurse|the lifeguard|an ambulance|the police|" +
  "engineering|housekeeping|the front office|the front desk|reception|the chef|the kitchen|the doctor|" +
  "the hotel doctor|the executive housekeeper|my team leader|the restaurant manager|the bar manager|" +
  "the spa manager|the front office manager|the guest relations manager)";
const PAIR = new RegExp(`\\b(${PARTY}) and (${PARTY})\\b`, "gi");

const NEGATORS = new Set(["not", "no", "never", "cannot", "nobody", "nothing"]);
const hasNegator = (s: string) => normalize(s).some((t) => NEGATORS.has(t));

const cap = (s: string) => s.replace(/^\s*([a-z])/, (_, c: string) => c.toUpperCase());
/** Lower-case a sentence's first word unless it is "I" or a name. */
const low = (s: string) =>
  /^(I|I'm|I'll)\b/.test(s) || /^[A-Z][a-z]+ [A-Z]/.test(s) || /^(Mr|Mrs|Ms|Miss|Dr)\b/.test(s)
    ? s
    : s.replace(/^([A-Z])(?=[a-z])/, (c) => c.toLowerCase());

function sentencesOf(t: string): string[] {
  const parts = t.match(/[^.?!]+[.?!]+/g)?.map((s) => s.trim()) ?? [];
  const tail = t.replace(/[^.?!]+[.?!]+/g, "").trim();
  return tail ? [...parts, tail] : parts.length ? parts : [t.trim()];
}
const HONORIFIC_END = /,\s*(sir|madam)([.?!])$/i;

/** Shapes one step away from `t`, each with whether it may still be put in
 *  another sentence order. A split at "and" or a dropped "Then" loses what
 *  ordered the steps, so the sentences it leaves keep their order.
 *
 *  Two steps of shapes compose, and the order guard below only sees the step
 *  it is in: "Please call 115 for an ambulance now. Then please tell the Duty
 *  Manager." lost its "Then" in the first step and was swapped in the second,
 *  and "Please tell the Duty Manager. Please call 115…" passed the slot whose
 *  whole lesson is danger first. Same for "Please step out of the pool now,
 *  and we will check the water": split, then swapped. */
function oneStep(t: string, reorder = true): [string, boolean][] {
  const all: [string, boolean][] = [];
  const out = { push: (s: string) => all.push([s, true]) };
  const frozen = { push: (s: string) => all.push([s, false]) };
  for (const [re, to] of SWAPS) out.push(t.replace(re, to));
  for (const m of t.matchAll(REFUSED))
    for (const v of REFUSAL_VERBS)
      if (v !== m[2])
        out.push(t.slice(0, m.index) + `${m[1]} ${v}` + t.slice(m.index! + m[0].length));
  out.push(t.replace(PAIR, "$2 and $1"));
  // "myself" off, or on after a refusal.
  out.push(t.replace(/\s+myself\b/g, ""));
  const ss = sentencesOf(t);
  if (!/\bmyself\b/.test(t))
    ss.forEach((s, i) => {
      if (!/\b(cannot|can't|not able to)\b/.test(s)) return;
      const h = s.match(HONORIFIC_END);
      const body = h ? s.slice(0, h.index) : s.replace(/[.?!]+$/, "");
      const end = h ? `, ${h[1]}${h[2]}` : (s.match(/[.?!]+$/)?.[0] ?? ".");
      out.push([...ss.slice(0, i), `${body} myself${end}`, ...ss.slice(i + 1)].join(" "));
    });
  // Sentence order, and joining or splitting at a sentence boundary.
  for (let i = 0; i + 1 < ss.length; i++) {
    const a = ss[i]!;
    const b = ss[i + 1]!;
    // Not when one half is only an opener — "No, sir." said last is not the
    // same reply, and it hides the "no" from the polarity check. And not when
    // either half orders steps: "I reported it to security first … then I
    // noted it in the log" said the other way round is the wrong procedure,
    // and round 4 passed it on exactly that swapped shape.
    const SEQUENCE = /\b(first|then|after|afterwards|before|next|finally|later|until|second)\b/i;
    if (
      reorder &&
      a.split(" ").length > 3 &&
      b.split(" ").length > 3 &&
      !SEQUENCE.test(a) &&
      !SEQUENCE.test(b)
    )
      out.push([...ss.slice(0, i), b, a, ...ss.slice(i + 2)].join(" "));
    // Not an opener joined on: "Of course, sir, and before I order it…" is
    // nobody's English, and moved about by the next step it became "…have an
    // allergy, of course, sir, and?" — a shape whose stray words let a whole
    // inserted clause read as a substitution.
    if (a.endsWith(".") && a.split(" ").length > 3)
      for (const conj of ["but", "and", "so"])
        out.push(
          [...ss.slice(0, i), `${a.slice(0, -1)}, ${conj} ${low(b)}`, ...ss.slice(i + 2)].join(" "),
        );
  }
  ss.forEach((s, i) => {
    const m = s.match(/^(.+?),? (and then|and|but|so) (.+)$/);
    if (
      m &&
      m[1]!.split(" ").length >= 3 &&
      m[3]!.split(" ").length >= 3 &&
      /^(I|we|you|he|she|they|it|my|our|the|please)\b/i.test(m[3]!)
    )
      // "…, and then I noted it" splits into "… Then I noted it": the order
      // word stays with the step it orders. An "and" can order steps as
      // plainly as "then" does, so the halves keep their order (frozen).
      (m[2] === "but" ? out : frozen).push(
        [
          ...ss.slice(0, i),
          `${m[1]}.`,
          m[2] === "and then" ? `Then ${low(m[3]!)}` : cap(m[3]!),
          ...ss.slice(i + 1),
        ].join(" "),
      );
    // A discourse marker at the front of a sentence: "Then we need…". Not
    // "First": in "First, take the spill kit." it is the safety order, and
    // dropping it let "Take the spill kit. I will tell the supervisor." pass.
    // "Then" only where it opens the reply ("Then we can hold your luggage"):
    // after another sentence it is the second step.
    const d = s.match(/^(Then|So|Now|Also),?\s+(.+)$/);
    if (d && (i === 0 || d[1] !== "Then"))
      frozen.push([...ss.slice(0, i), cap(d[2]!), ...ss.slice(i + 1)].join(" "));
    // A reason or a condition said first, or said last.
    const h = s.match(HONORIFIC_END);
    const body = h ? s.slice(0, h.index) : s.replace(/[.?!]+$/, "");
    const end = h ? `, ${h[1]}${h[2]}` : (s.match(/[.?!]+$/)?.[0] ?? ".");
    // "first" at either end of the same sentence: "Take the spill kit first."
    // and "First, take the spill kit." say the same order.
    const lastFirst = body.match(/^(.+?) first$/i);
    if (lastFirst)
      out.push(
        [...ss.slice(0, i), `First, ${low(lastFirst[1]!)}${end}`, ...ss.slice(i + 1)].join(" "),
      );
    const frontFirst = body.match(/^First,? (.+)$/);
    if (frontFirst)
      out.push(
        [...ss.slice(0, i), `${cap(frontFirst[1]!)} first${end}`, ...ss.slice(i + 1)].join(" "),
      );
    const back =
      body.match(/^(.+?),? ((?:because|if|before|until|when|after|as soon as|without) .+)$/i) ??
      body.match(/^(.+?), (for .+)$/i);
    if (back && back[1]!.split(" ").length >= 2 && !/\b(and|so|but|then|or),?$/i.test(back[1]!))
      out.push(
        [...ss.slice(0, i), `${cap(back[2]!)}, ${low(back[1]!)}${end}`, ...ss.slice(i + 1)].join(
          " ",
        ),
      );
    const front = body.match(
      /^((?:If|Because|For|Before|Until|When|After|As soon as|Without) [^,]+), (.+)$/,
    );
    if (front)
      out.push(
        [...ss.slice(0, i), `${cap(front[2]!)}, ${low(front[1]!)}${end}`, ...ss.slice(i + 1)].join(
          " ",
        ),
      );
  });
  return all.filter(([v]) => v && v !== t);
}

/** Every word the source locks that the shape still says — and every word
 *  the shape says that the source does not. A swap hands its new word the
 *  job of the word it replaced: "before the KITCHEN checks" stands in for
 *  "before the CHEF checks", and with "chef" unlocked and "kitchen" not
 *  locked either, "I cannot confirm it before the checks" passed the slot on
 *  the one-word allowance. */
export function lockedLike(
  srcTarget: string,
  srcLocks: string[] | undefined,
  target: string,
): string[] {
  const said = normalize(target);
  const had = new Set(normalize(srcTarget));
  const saidSet = new Set(said);
  const keep = (srcLocks ?? []).filter((t) => normalize(t).every((x) => saidSet.has(x)));
  const fresh = said.filter((t) => t.length >= 3 && !had.has(t));
  return [...new Set([...keep, ...fresh])];
}
/** A shape is said whole. The one-word allowance a model gets is the model's;
 *  handed to every shape as well, it was spent once per shape, and a reply
 *  cut short ("the card did not go", "step out of his") found a joined shape
 *  whose clause analysis let the missing word go. So every content word of a
 *  shape is locked, on top of what the source locks. */
function locked(src: Shape, target: string): Shape {
  const keep = [
    ...new Set([
      ...lockedLike(src.target, src.requiredTokens, target),
      ...normalize(target).filter(isContentToken),
    ]),
  ];
  return { target, ...(keep.length ? { requiredTokens: keep } : {}) };
}

const CAP = 160;
const MEMO = new Map<string, Shape[]>();

/** The authored answers (model first) re-written into the shapes above, two
 *  steps deep, plus each sentence of one authored answer swapped for the same
 *  sentence of another. Never includes an authored answer itself. */
export function shapesOf(authored: Shape[]): Shape[] {
  const key = JSON.stringify(authored);
  const hit = MEMO.get(key);
  if (hit) return hit;
  const seen = new Set(authored.map((a) => a.target));
  const out: Shape[] = [];
  const add = (src: Shape, t: string, from = src.target) => {
    const v = t.replace(/\s+/g, " ").trim();
    if (seen.has(v) || out.length >= CAP) return false;
    // A shape never says no more or less often than what it was made from.
    // Recombining sentence by sentence made one exception: a paraphrase that
    // splits "I am sorry, sir." off its refusal, mixed with the model's second
    // sentence, gave "I am sorry, sir. My manager can review it." — the
    // refusal gone, and "I can change the bill" passed against it.
    if (polarityOf(v) !== polarityOf(from)) return false;
    // No shape says the same sentence twice, however it was made.
    const parts = sentencesOf(v).map((s) =>
      normalize(s)
        .filter((w) => !/^(sir|madam)$/.test(w))
        .join(" "),
    );
    if (new Set(parts).size < parts.length) return false;
    seen.add(v);
    out.push(locked(src, v));
    return true;
  };
  // Positional recombination: the reviewers' "say sentence one of the model
  // and sentence two of the paraphrase" — both of which the slot accepts.
  const split = authored.map((a) => sentencesOf(a.target));
  for (let i = 0; i < authored.length; i++)
    for (let j = 0; j < authored.length; j++) {
      if (i === j || split[i]!.length !== split[j]!.length || split[i]!.length < 2) continue;
      for (let k = 0; k < split[i]!.length; k++) {
        const mix = [...split[i]!];
        mix[k] = split[j]![k]!;
        // Never one sentence twice. When a paraphrase is the model with its
        // sentences the other way round, mixing by position gave "I
        // understand, sir. I understand." — and that passed the slot where a
        // guest accuses a cleaner of theft, with nobody called at all.
        const bare = (s: string) =>
          normalize(s)
            .filter((w) => !/^(sir|madam)$/.test(w))
            .join(" ");
        if (new Set(mix.map(bare)).size < mix.length) continue;
        // Nor a mix that says only half of what the model asks for: when one
        // source repeats the other's sentence at another place, the mix can
        // lose a move entirely. Every content word the model locks must still
        // be said.
        const mixed = new Set(normalize(mix.join(" ")));
        const ownLocks = (authored[0]!.requiredTokens ?? []).flatMap((t) => normalize(t));
        if (i === 0 && !ownLocks.every((t) => mixed.has(t))) continue;
        // Locks of both sources, as far as the mix says them.
        add(
          {
            target: `${authored[i]!.target} ${authored[j]!.target}`,
            requiredTokens: [
              ...(authored[i]!.requiredTokens ?? []),
              ...(authored[j]!.requiredTokens ?? []),
            ],
          },
          mix.join(" "),
          authored[i]!.target,
        );
      }
    }
  const first: [Shape, boolean][] = [];
  for (const a of authored)
    for (const [t, reorder] of oneStep(a.target))
      if (add(a, t)) first.push([out[out.length - 1]!, reorder]);
  for (const [a, reorder] of first) for (const [t] of oneStep(a.target, reorder)) add(a, t);
  MEMO.set(key, out);
  return out;
}
