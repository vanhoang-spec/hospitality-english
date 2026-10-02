import { getWeekContent } from "./content/week-content";
import { weeksInPhase } from "./phases";
import { COURTESY_EXTRAS, normalize, polarityOf } from "./speaking-score";
import { SHAPES_FROM_WEEK, lockedLike, shapesOf } from "./answer-variants";

/** Every answer the course teaches for one line.
 *
 *  A phase asks the same question in several lessons and teaches a different
 *  reply each time: "Could you make an exception?" and "Could you make an
 *  exception for me?" have two models. The grader held each line to its own
 *  model only, so a learner who gave the reply the course taught one lesson
 *  earlier was told it was wrong — measured at 32 of 36 such clusters, and 66
 *  of 66 cross-answers in one department. Five reviews in one round reported
 *  it as the speaking suites punishing people for knowing the course.
 *
 *  Nothing is loosened here. Each answer is graded exactly as strictly as its
 *  own item grades it, requiredTokens included — and since the round where
 *  utterancePassedAny began unioning the SLOT's own required tokens onto every
 *  reply it accepts, a bit more strictly than that. The only change is that a
 *  line accepts the replies the course itself wrote for that same line.
 *
 *  What it deliberately no longer does is cluster on a single content word.
 *  "What do you need from me first?" and "Is there anything I need to do?"
 *  both reduce to `need` and are NOT the same question — see acceptedAnswers.
 *  Clusters built on one word are the price of that, and they were measured
 *  to be wrong more often than right. */
export type AcceptedAnswer = {
  target: string;
  requiredTokens?: string[];
  /** Another sentence the phase teaches that makes the same must-be-right
   *  move — see acceptedAnswers(). Kept on the reserved slot. */
  sameMove?: true;
};

// What does not change what a line asks. Question words that DO change it —
// where, when, why, how — are content.
//
// "here" left this list. It is a place word, and gluing it away merged two
// lines that ask opposite things: "What is this line here?" — the guest is
// pointing at a charge — and "What do I do on this line?" — the guest is
// asking where to sign — both reduced to the key `line`, so a learner who
// answered "Please sign your name on this line." to a question about money
// passed.
const GLUE = new Set(
  (
    "a an the i you we he she it they me my your our us is are am was were be been do does did " +
    "can could may might will would shall should to of in on at for with from and or but so just " +
    "please sir madam this that these those there what else anything something first more " +
    "exactly also really any some"
  ).split(" "),
);
export function askedKey(prompt: string): string {
  const words = prompt
    .toLowerCase()
    .replace(/[^a-z ]/g, " ")
    .split(" ")
    .filter((w) => w && !GLUE.has(w));
  return [...new Set(words)].sort().join(" ");
}

/** Headwords the week's own grader frees on purpose — the function words
 *  inside a multi-word card ("Here YOU ARE"), and sir/madam/the day-part,
 *  which honorificIsFree() and greetingIsFree() exist to leave open. Locking
 *  those here would undo both. Same list the content layer keeps for
 *  lockWeekHeadwords(); it is short, and duplicating it is cheaper than
 *  exporting a content internal into the grader. */
const HEADWORDS_LEFT_OPEN = new Set(
  (
    "you are here the and else past sir madam maam good morning afternoon evening " +
    "your our their his her him them they with for from this that thank"
  ).split(" "),
);

/** A COURTESY MARKER IS NEVER MINTED AS A HEADWORD LOCK — not carried
 *  forward from an earlier week, and not in the week that prints the card
 *  either.
 *
 *  This file used to keep its own copy of the courtesy words ("please
 *  certainly sorry very yes now just really kindly") and apply it only on
 *  the way FORWARD, on the argument that a card is locked because it is what
 *  its week exists to teach. That argument is wrong for these particular
 *  words: speaking-score.ts spends a whole list (COURTESY_EXTRAS) on the
 *  opposite rule, and the moment the dept-review turns started being locked,
 *  the week PRINTING the card began requiring it — F&B week 19's `Very` in
 *  "Please be careful, sir. This dish is very hot." and Guest Relations week
 *  22's in "I am very sorry, sir…" — which fails a learner for saying the
 *  whole safety warning and skipping the intensifier.
 *
 *  THE RULE IS ENFORCED IN requiredValueTokens(), not here, because most of
 *  those locks are not minted here at all: they are written into the content
 *  by lockWeekHeadwords(), and a fix in this file alone would have moved
 *  none of them. What this filter does is stop THIS producer emitting a lock
 *  the grader is going to refuse, reading the same COURTESY_EXTRAS rather
 *  than a second copy of it, so the two cannot drift apart again.
 *
 *  Memoised: indexFor asks for weeks 1..w for every w of a phase, which is
 *  the same forty lookups ten times over. */
const CARDS = new Map<string, string[]>();
const cardsPrintedIn = (dep: string, week: number): string[] => {
  const ck = `${dep}:${week}`;
  const hit = CARDS.get(ck);
  if (hit) return hit;
  const c = getWeekContent(dep, String(week));
  const built = [
    ...(c?.lessons ?? []).flatMap((l) => l.vocabulary.map((v) => v.word)),
    ...(c?.reviewWords ?? []),
  ]
    .flatMap((w) => normalize(w))
    .filter((w) => w.length > 2 && !HEADWORDS_LEFT_OPEN.has(w) && !COURTESY_EXTRAS.has(w));
  CARDS.set(ck, built);
  return built;
};

/** The headwords a week is responsible for: its own vocabulary cards, plus
 *  every card the course taught before it.
 *
 *  Locking the week's OWN cards was half the fix. The word a Phase 2 model
 *  loses is usually a card from an EARLIER week — the course taught it, the
 *  model is built on it, and nothing was requiring it: measured with the
 *  production grader, deleting one earlier week's headword from a model left
 *  26.9% of Phase 1, 30.9% of Phase 2, 31.2% of Phase 3 and 29.3% of Phase 4
 *  deletions still passing. "No. Wear when you use chemicals." passed the
 *  `gloves` model, "Please leave them in the room." the `store room` one, and
 *  "I am afraid I cannot give a number, sir." the `room number` one.
 *
 *  Weeks 1..week, not the phase: a card taught in week 2 is still the course's
 *  word in week 22, and the checkpoint that draws from eight weeks is exactly
 *  where the older ones stop being asked for. */
function headwordsOf(dep: string, week: number): Set<string> {
  const out = new Set(cardsPrintedIn(dep, week));
  for (let w = 1; w < week; w++) for (const h of cardsPrintedIn(dep, w)) out.add(h);
  return out;
}

type PhaseIndex = {
  answers: Map<string, AcceptedAnswer[]>;
  /** Per model sentence, the headwords of the week that prints it which the
   *  sentence actually contains. */
  headwordsIn: Map<string, string[]>;
  /** Per model sentence, the paraphrases its author accepts
   *  (`SpeakingItem.alsoAccept`). */
  alsoFor: Map<string, AcceptedAnswer[]>;
  /** Every model sentence and accepted paraphrase the phase prints, with its
   *  own locks — the candidates for a risk turn's same-move answers. */
  taught: AcceptedAnswer[];
  /** Targets of the turns marked `risk`. */
  risky: Set<string>;
};

const INDEX = new Map<string, PhaseIndex>();

function indexFor(dep: string, week: string | number): PhaseIndex {
  const weeks = weeksInPhase(week);
  const cacheKey = `${dep}:${weeks[0]}`;
  const cached = INDEX.get(cacheKey);
  if (cached) return cached;
  const answers = new Map<string, AcceptedAnswer[]>();
  const headwordsIn = new Map<string, string[]>();
  const alsoFor = new Map<string, AcceptedAnswer[]>();
  const taught: AcceptedAnswer[] = [];
  const risky = new Set<string>();
  for (const w of weeks) {
    const heads = headwordsOf(dep, w);
    const noteHeadwords = (sentence: string) => {
      const said = new Set(normalize(sentence));
      const locked = [...heads]
        .map((h) =>
          said.has(h) ? h : said.has(h + "s") ? h + "s" : said.has(h + "es") ? h + "es" : null,
        )
        .filter((h): h is string => h !== null);
      if (locked.length)
        headwordsIn.set(sentence, [...new Set([...(headwordsIn.get(sentence) ?? []), ...locked])]);
    };
    for (const l of getWeekContent(dep, String(w))?.lessons ?? [])
      for (const s of l.speaking) {
        // An accepted paraphrase is graded like the model: the week's
        // headwords it says are locked, and so is every word the author
        // locked on the model that the paraphrase also says. A word it does
        // not say cannot be required of it — that is the point of it.
        if (s.alsoAccept?.length) {
          const alts = s.alsoAccept.map((alt) => {
            noteHeadwords(alt);
            const said = new Set(normalize(alt));
            // From week 23 the words a paraphrase says instead of the
            // model's are locked too — see lockedLike(). Without it "…and
            // GAVE it to my supervisor" stood in for "…and took it…" with
            // neither verb required, and the reply that said no verb at all
            // passed on the one-word allowance.
            const keep =
              w >= SHAPES_FROM_WEEK
                ? lockedLike(s.targetResponse, s.requiredTokens, alt)
                : (s.requiredTokens ?? []).filter((t) => normalize(t).every((x) => said.has(x)));
            return { target: alt, ...(keep.length ? { requiredTokens: keep } : {}) };
          });
          alsoFor.set(s.targetResponse, [...(alsoFor.get(s.targetResponse) ?? []), ...alts]);
          taught.push(...alts);
        }
        taught.push({ target: s.targetResponse, requiredTokens: s.requiredTokens });
        if (s.risk) risky.add(s.targetResponse);
        // THE WEEK'S OWN WORDS ARE NOT WHAT THE ONE-WORD ALLOWANCE IS FOR.
        //
        // The allowance forgives a long model one ordinary word, and it did
        // not ask which: 70 of the 2,508 single-headword deletions in Phase 2
        // passed, every one of them on the word the week exists to teach.
        // "I will bring you a pillow, madam." passed a `foam pillow` item,
        // "Please leave them in the room." a `store room` item, "I am afraid I
        // cannot give a number, sir." a `room number` item. The content layer
        // locks this for the weeks it generates (lockWeekHeadwords), but the
        // twenty-six hand-authored weeks reach the grader without it and no
        // week's review list reached it at all.
        const said = new Set(normalize(s.targetResponse));
        const locked = [...heads]
          .map((h) =>
            said.has(h) ? h : said.has(h + "s") ? h + "s" : said.has(h + "es") ? h + "es" : null,
          )
          .filter((h): h is string => h !== null);
        if (locked.length)
          headwordsIn.set(s.targetResponse, [
            ...new Set([...(headwordsIn.get(s.targetResponse) ?? []), ...locked]),
          ]);
        const k = askedKey(s.guestPrompt);
        if (!k) continue;
        // A colleague's "What comes after that?" is not a guest's.
        const key = `${s.speakerRole ?? "guest"}|${k}`;
        const list = answers.get(key) ?? [];
        if (!list.some((a) => a.target === s.targetResponse))
          list.push({ target: s.targetResponse, requiredTokens: s.requiredTokens });
        answers.set(key, list);
      }
  }
  const built = { answers, headwordsIn, alsoFor, taught, risky };
  INDEX.set(cacheKey, built);
  return built;
}

/** THE COURSE'S OWN SENTENCE FOR THE SAME MOVE PASSES A MUST-BE-RIGHT TURN.
 *
 *  Three blind reviews of Phase 3 measured the reserved slot refusing what
 *  the course itself teaches for the same situation in another lesson: "I am
 *  sorry, sir. You cannot use the sauna after alcohol." (week 24) failed the
 *  week-30 alcohol slot for lacking "today"; "…I cannot offer the sauna or the
 *  hot stone." failed the blood-pressure slot for naming one more risk. A
 *  learner who learned the course's other sentence fails the whole half.
 *
 *  So a risk turn also accepts any sentence the phase prints that says EVERY
 *  word the turn locks — the refusal, the person, the safety action — with
 *  the same polarity, graded on its own locks. Only for turns locked on three
 *  words or more: a lock that thin does not pin the move down. */
const NEGATORS = new Set(["not", "no", "never", "cannot", "nobody", "nothing"]);
function sameMoves(idx: PhaseIndex, own: AcceptedAnswer): AcceptedAnswer[] {
  if (!idx.risky.has(own.target)) return [];
  const locks = [...new Set((own.requiredTokens ?? []).flatMap((t) => normalize(t)))];
  if (locks.length < 3) return [];
  const negOf = (toks: string[]) => toks.some((t) => NEGATORS.has(t));
  const ownNeg = negOf(normalize(own.target));
  const out: AcceptedAnswer[] = [];
  for (const cand of idx.taught) {
    if (cand.target === own.target || out.some((o) => o.target === cand.target)) continue;
    const said = normalize(cand.target);
    if (negOf(said) !== ownNeg) continue;
    const have = new Set(said);
    if (!locks.every((t) => have.has(t))) continue;
    const heads = idx.headwordsIn.get(cand.target);
    out.push({
      target: cand.target,
      requiredTokens: [...new Set([...(cand.requiredTokens ?? []), ...(heads ?? [])])],
      sameMove: true,
    });
  }
  return out;
}

/** The item's own answer first, then every other reply the phase teaches for
 *  the same line. A line with no content words ("What about that?") keeps its
 *  own answer only. Every answer, its own included, carries the headwords of
 *  the week that authored it. */
export function acceptedAnswers(
  dep: string,
  week: string | number,
  guestPrompt: string,
  target: string,
  requiredTokens?: string[],
  speakerRole?: string,
): AcceptedAnswer[] {
  const idx = indexFor(dep, week);
  const lock = (a: AcceptedAnswer): AcceptedAnswer => {
    const heads = idx.headwordsIn.get(a.target);
    return heads?.length
      ? { ...a, requiredTokens: [...new Set([...(a.requiredTokens ?? []), ...heads])] }
      : a;
  };
  const own = lock({ target, requiredTokens });
  const authored = [own, ...(idx.alsoFor.get(target) ?? []).map(lock)];
  // From week 23 every authored answer also stands in its other shapes —
  // see answer-variants.ts. Kept on the reserved slot like a same move.
  const shaped =
    Number(week) >= SHAPES_FROM_WEEK
      ? shapesOf(authored).map((v) => ({ ...v, sameMove: true as const }))
      : [];
  const also = [...authored.slice(1), ...shaped, ...sameMoves(idx, own)];
  const k = askedKey(guestPrompt);
  // ONE CONTENT WORD IS NOT A QUESTION. A key of one word — "Do I have to do
  // that?" reduces to `have`, "Do I sign here?" to `sign` — groups lines that
  // have nothing in common but a verb, and 92 of the 278 such prompts in
  // Phase 2 pulled in somebody else's answers: "Do I have to do that?" was
  // accepting "We also have sparkling water." Two content words is the point
  // where the cluster is about a subject rather than a word.
  if (k.split(" ").filter(Boolean).length < 2) return [own, ...also];
  const others = (idx.answers.get(`${speakerRole ?? "guest"}|${k}`) ?? [])
    .filter((a) => a.target !== target && !also.some((x) => x.target === a.target))
    // From week 23, never the opposite answer to the same question: "Is room
    // two ready for the next guest?" accepted both "Not yet…" and "Yes. I
    // finished the checklist…" because two lessons ask it.
    .filter((a) => Number(week) < SHAPES_FROM_WEEK || polarityOf(a.target) === polarityOf(target))
    .map(lock);
  return [own, ...also, ...others];
}
