// The free-text scorer (src/lib/writing-score.ts), in both of its modes.
//
// Written mode grades the Writing and Mediation suites today and must not
// move. Spoken mode grades an open spoken turn — no model sentence, a
// transcript instead of a draft — and is measured here on the course's own
// tasks and model lines, not on sentences invented for the test.
//
//   bun scripts/free-text-score-test.ts
import { getWeekContent, type RequiredIdea } from "../src/lib/content/week-content.ts";
import { scoreFreeText } from "../src/lib/writing-score.ts";

let pass = 0;
let fail = 0;
function check(name: string, ok: boolean, detail = "") {
  if (ok) pass++;
  else fail++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? `  — ${detail}` : ""}`);
}

const DEPS = ["FO", "FB", "HK", "SW", "GR"];
/** What a recogniser hands back: no capitals, no punctuation. */
const asTranscript = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s'%]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

type Task = {
  where: string;
  model: string;
  ideas: RequiredIdea[];
  avoid?: string[];
  minWords: number;
  minSentences: number;
};
const tasks: Task[] = [];
for (const dep of DEPS)
  for (let w = 1; w <= 40; w++) {
    const wc = getWeekContent(dep, w);
    if (wc?.writing)
      tasks.push({
        where: `${dep} w${w} writing`,
        model: wc.writing.modelReply,
        ideas: wc.writing.mustConvey,
        avoid: wc.writing.mustAvoid,
        minWords: 25,
        minSentences: 2,
      });
    if (wc?.mediation)
      tasks.push({
        where: `${dep} w${w} mediation`,
        model: wc.mediation.modelAnswer,
        ideas: wc.mediation.mustConvey,
        avoid: wc.mediation.mustAvoid,
        minWords: 12,
        minSentences: 1,
      });
  }
check("the course has free-text tasks to measure on", tasks.length >= 10, `${tasks.length} tasks`);

// ── Written mode: unchanged ────────────────────────────────────────────────
{
  const failed = tasks.filter(
    (t) =>
      !scoreFreeText({
        draft: t.model,
        ideas: t.ideas,
        minWords: t.minWords,
        minSentences: t.minSentences,
        avoid: t.avoid,
      }).passed,
  );
  check(
    "written: every task's own model answer passes",
    failed.length === 0,
    failed.map((t) => t.where).join(", "),
  );

  const stuffed = tasks.filter((t) => {
    const list = t.ideas.map((i) => i.any[0]).join(" ");
    return scoreFreeText({
      draft: `${list} ${list} ${list}`,
      ideas: t.ideas,
      minWords: t.minWords,
      minSentences: t.minSentences,
      avoid: t.avoid,
    }).passed;
  });
  check(
    "written: the task's keywords said three times over do not pass",
    stuffed.length === 0,
    stuffed.map((t) => t.where).join(", "),
  );
  check(
    'written: "sorry suite same sorry suite same", twice to reach the floor, does not pass',
    !scoreFreeText({
      draft: "sorry suite same sorry suite same sorry suite same sorry suite same",
      ideas: [
        { labelVi: "xin lỗi", any: ["sorry"] },
        { labelVi: "phòng", any: ["suite"] },
      ],
      minWords: 12,
      minSentences: 1,
    }).passed,
  );

  // The hole this file found on its first run. "sorry apologise not available
  // unavailable another therapist different therapist no charge no extra
  // charge…" passed two mediation tasks at 100%.
  const phraseLists = tasks.filter((t) => {
    const list = t.ideas.flatMap((i) => i.any.slice(0, 2)).join(" ");
    return scoreFreeText({
      draft: `${list} ${t.ideas.map((i) => i.any[0]).join(" ")}`,
      ideas: t.ideas,
      minWords: t.minWords,
      minSentences: 1,
      avoid: t.avoid,
    }).passed;
  });
  check(
    "written: the accepted phrasings set side by side do not pass",
    phraseLists.length === 0,
    phraseLists.map((t) => t.where).join(", "),
  );
}

// ── Spoken mode: the same tasks, heard instead of read ─────────────────────
{
  const spoken = (t: Task, draft: string) =>
    scoreFreeText({ draft, ideas: t.ideas, minWords: t.minWords, avoid: t.avoid, mode: "spoken" });

  const failed = tasks.filter((t) => !spoken(t, asTranscript(t.model)).passed);
  check(
    "spoken: every model answer still passes as a transcript",
    failed.length === 0,
    failed
      .map((t) => `${t.where}: ${spoken(t, asTranscript(t.model)).blockedByVi ?? "coverage"}`)
      .join(" | "),
  );

  const hesitant = tasks.filter((t) => {
    const words = asTranscript(t.model).split(" ");
    const draft = `uh ${words[0]} ${words[0]} ${words.slice(1, 6).join(" ")} um ${words.slice(6).join(" ")}`;
    return !spoken(t, draft).passed;
  });
  check(
    "spoken: a false start and two fillers do not fail a good answer",
    hesitant.length === 0,
    hesitant.map((t) => t.where).join(", "),
  );

  const lists = tasks.filter((t) => {
    const list = t.ideas.flatMap((i) => i.any.slice(0, 2)).join(" ");
    return spoken(t, `${list} ${t.ideas.map((i) => i.any[0]).join(" ")}`).passed;
  });
  check(
    "spoken: reading the accepted phrasings out as a list does not pass",
    lists.length === 0,
    lists.map((t) => t.where).join(", "),
  );
  // Not a guarantee — a record of where this scorer stops. It hears whether
  // the ideas were said, not how well. If this ever starts failing, the
  // scorer got better and the outline's "practice, not certification" note
  // (docs/curriculum-41-80.md, section 7) wants another look.
  check(
    "KNOWN LIMIT: broken English that carries the ideas still passes a spoken turn",
    spoken(
      {
        where: "",
        model: "",
        minWords: 10,
        minSentences: 1,
        ideas: [
          { labelVi: "xin lỗi", any: ["sorry"] },
          { labelVi: "mốc giờ", any: ["twenty minutes"] },
        ],
      },
      "sorry room not ready twenty minutes manager come now please wait",
    ).passed,
  );
}

// ── Spoken mode on natural answers: the glue floor blocks none of them ─────
{
  let n = 0;
  const blocked: string[] = [];
  for (const dep of DEPS)
    for (let w = 23; w <= 40; w++) {
      const wc = getWeekContent(dep, w);
      if (!wc) continue;
      for (const lesson of wc.lessons) {
        const said = lesson.speaking.map((s) => s.targetResponse);
        for (let i = 0; i + 1 < said.length; i++) {
          const draft = asTranscript(`${said[i]} ${said[i + 1]}`);
          const r = scoreFreeText({ draft, ideas: [], minWords: 12, mode: "spoken" });
          if (r.wordCount < 12) continue;
          n++;
          if (r.blockedByVi) blocked.push(draft);
        }
      }
    }
  check(
    "spoken: two of the course's own model lines, said together, are never taken for a word list",
    n > 2000 && blocked.length === 0,
    `${n - blocked.length}/${n}${blocked.length ? ` — e.g. "${blocked[0].slice(0, 90)}"` : ""}`,
  );
}

// ── What the recogniser writes is what the author meant ────────────────────
{
  const ideas: RequiredIdea[] = [
    { labelVi: "mốc giờ", any: ["twenty minutes"] },
    { labelVi: "lời hứa", any: ["I will ask"] },
  ];
  const r = scoreFreeText({
    draft: "i'll ask the front desk madam and i will come back to you in 20 minutes",
    ideas,
    minWords: 10,
    mode: "spoken",
  });
  check(
    'spoken: "20 minutes" is "twenty minutes" and "I\'ll" is "I will"',
    r.passed,
    `${r.coveragePct}%`,
  );
}

// ── A phrase that is wrong to say and right to refuse ──────────────────────
{
  const ideas: RequiredIdea[] = [{ labelVi: "ai quyết", any: ["lifeguard", "nurse"] }];
  const blocked = (draft: string, mode: "spoken" | "written" = "spoken") =>
    scoreFreeText({
      draft,
      ideas,
      minWords: 8,
      minSentences: 1,
      avoidAsserted: ["it is safe", "you will be fine"],
      mode,
    }).blockedByVi !== null;

  check(
    'claimed: "yes madam it is safe to swim the lifeguard is there"',
    blocked("yes madam it is safe to swim today the lifeguard is there"),
  );
  check(
    'refused: "I cannot say it is safe"',
    !blocked("i cannot say it is safe madam the lifeguard decides that and i will ask him"),
  );
  check(
    'refused: "I am not sure it is safe"',
    !blocked("i am not sure it is safe madam the lifeguard decides and i will ask him now"),
  );
  check(
    'refused: "I am unable to confirm that it is safe"',
    !blocked("i am unable to confirm that it is safe madam our nurse can tell you"),
  );
  check(
    'handed on: "you asked whether it is safe"',
    !blocked("you asked whether it is safe madam i will ask the lifeguard and come back"),
  );
  check(
    'reassurance is a claim: "do not worry it is safe"',
    blocked("please do not worry madam it is safe the lifeguard is watching the water"),
  );
  check(
    'the "not" of another clause does not count: "I am not a doctor but it is safe"',
    blocked("i am not a doctor but it is safe for you madam ask the nurse"),
  );
  check(
    'claimed after refusing: "I cannot say for sure but you will be fine"',
    blocked("i cannot say for sure madam but you will be fine the nurse is here"),
  );
  check(
    "written: a refusal does not reach across a full stop",
    blocked("I cannot say. It is safe, madam, and the lifeguard is there today.", "written"),
  );
  check(
    'written: "I cannot say it is safe" in one sentence is let through',
    !blocked("I cannot say it is safe, madam. The lifeguard decides that today.", "written"),
  );

  const plain = (draft: string, mode: "spoken" | "written") =>
    scoreFreeText({ draft, ideas: [], minWords: 5, minSentences: 1, avoid: ["our fault"], mode })
      .blockedByVi !== null;
  check(
    'plain `avoid` still blocks a denial, written: "this was not our fault"',
    plain("We are sorry to hear this. This was not our fault.", "written"),
  );
  check(
    "plain `avoid` still blocks a denial, spoken",
    plain("we are sorry to hear this madam this was not our fault", "spoken"),
  );
}

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
