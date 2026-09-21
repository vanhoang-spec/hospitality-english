import { getWeekContent } from "./content/week-content";
import { weeksInPhase } from "./phases";

/** Every answer the course teaches for one line.
 *
 *  A phase asks the same question in several lessons and teaches a different
 *  reply each time: "Could you make an exception?" and "Could you make an
 *  exception for me?" have two models, "What else do you need from me?",
 *  "What do you need from me first?" and "Do you need anything else from me?"
 *  have three. The grader held each line to its own model only, so a learner
 *  who gave the reply the course taught one lesson earlier was told it was
 *  wrong — measured at 32 of 36 such clusters, and 66 of 66 cross-answers in
 *  one department. Five reviews in one round reported it as the speaking
 *  suites punishing people for knowing the course.
 *
 *  Nothing is loosened here. Each answer is graded exactly as strictly as its
 *  own item grades it, requiredTokens included; the only change is that a
 *  line accepts the replies the course itself wrote for that same line. */
export type AcceptedAnswer = { target: string; requiredTokens?: string[] };

// What does not change what a line asks. Question words that DO change it —
// where, when, why, how — are content.
const GLUE = new Set(
  (
    "a an the i you we he she it they me my your our us is are am was were be been do does did " +
    "can could may might will would shall should to of in on at for with from and or but so just " +
    "please sir madam this that these those there here what else anything something first more " +
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

const INDEX = new Map<string, Map<string, AcceptedAnswer[]>>();

function indexFor(dep: string, week: string | number): Map<string, AcceptedAnswer[]> {
  const weeks = weeksInPhase(week);
  const cacheKey = `${dep}:${weeks[0]}`;
  const cached = INDEX.get(cacheKey);
  if (cached) return cached;
  const index = new Map<string, AcceptedAnswer[]>();
  for (const w of weeks)
    for (const l of getWeekContent(dep, String(w))?.lessons ?? [])
      for (const s of l.speaking) {
        const k = askedKey(s.guestPrompt);
        if (!k) continue;
        // A colleague's "What comes after that?" is not a guest's.
        const key = `${s.speakerRole ?? "guest"}|${k}`;
        const list = index.get(key) ?? [];
        if (!list.some((a) => a.target === s.targetResponse))
          list.push({ target: s.targetResponse, requiredTokens: s.requiredTokens });
        index.set(key, list);
      }
  INDEX.set(cacheKey, index);
  return index;
}

/** The item's own answer first, then every other reply the phase teaches for
 *  the same line. A line with no content words ("What about that?") keeps its
 *  own answer only. */
export function acceptedAnswers(
  dep: string,
  week: string | number,
  guestPrompt: string,
  target: string,
  requiredTokens?: string[],
  speakerRole?: string,
): AcceptedAnswer[] {
  const own = { target, requiredTokens };
  const k = askedKey(guestPrompt);
  if (!k) return [own];
  const others = (indexFor(dep, week).get(`${speakerRole ?? "guest"}|${k}`) ?? []).filter(
    (a) => a.target !== target,
  );
  return [own, ...others];
}
