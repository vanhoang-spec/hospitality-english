import { getWeekContent } from "./content/week-content";
import { weeksInPhase } from "./phases";
import { normalize } from "./speaking-score";

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
export type AcceptedAnswer = { target: string; requiredTokens?: string[] };

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
  "you are here the and else past sir madam maam good morning afternoon evening".split(" "),
);

/** The headwords a week is responsible for: its own vocabulary cards, plus
 *  the earlier cards it was built to bring back. */
function headwordsOf(dep: string, week: number): Set<string> {
  const c = getWeekContent(dep, String(week));
  return new Set(
    [
      ...(c?.lessons ?? []).flatMap((l) => l.vocabulary.map((v) => v.word)),
      ...(c?.reviewWords ?? []),
    ]
      .flatMap((w) => normalize(w))
      .filter((w) => w.length > 2 && !HEADWORDS_LEFT_OPEN.has(w)),
  );
}

type PhaseIndex = {
  answers: Map<string, AcceptedAnswer[]>;
  /** Per model sentence, the headwords of the week that prints it which the
   *  sentence actually contains. */
  headwordsIn: Map<string, string[]>;
};

const INDEX = new Map<string, PhaseIndex>();

function indexFor(dep: string, week: string | number): PhaseIndex {
  const weeks = weeksInPhase(week);
  const cacheKey = `${dep}:${weeks[0]}`;
  const cached = INDEX.get(cacheKey);
  if (cached) return cached;
  const answers = new Map<string, AcceptedAnswer[]>();
  const headwordsIn = new Map<string, string[]>();
  for (const w of weeks) {
    const heads = headwordsOf(dep, w);
    for (const l of getWeekContent(dep, String(w))?.lessons ?? [])
      for (const s of l.speaking) {
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
  const built = { answers, headwordsIn };
  INDEX.set(cacheKey, built);
  return built;
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
  const k = askedKey(guestPrompt);
  // ONE CONTENT WORD IS NOT A QUESTION. A key of one word — "Do I have to do
  // that?" reduces to `have`, "Do I sign here?" to `sign` — groups lines that
  // have nothing in common but a verb, and 92 of the 278 such prompts in
  // Phase 2 pulled in somebody else's answers: "Do I have to do that?" was
  // accepting "We also have sparkling water." Two content words is the point
  // where the cluster is about a subject rather than a word.
  if (k.split(" ").filter(Boolean).length < 2) return [own];
  const others = (idx.answers.get(`${speakerRole ?? "guest"}|${k}`) ?? [])
    .filter((a) => a.target !== target)
    .map(lock);
  return [own, ...others];
}
