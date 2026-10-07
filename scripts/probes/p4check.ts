// Probe dùng cho vòng đo/kiểm định. Chạy từ gốc repo:
//   bun scripts/probes/p4check.ts <DEP> [w1=31] [w2=40]
//
// Tự kiểm một bộ phận Phase 4 theo đúng những gì vòng chấm mù P4-r1 đếm, trên
// bản render getWeekContent (thứ học viên thấy) và bằng hàm production. Mỗi
// tuần một dòng; cột nào lệch chuẩn trong docs/p4-plan.md thì có dấu "!".
import { getWeekContent } from "../../src/lib/content/week-content.ts";
import { acceptedAnswers } from "../../src/lib/speaking-alternates.ts";
import { utterancePassed, utterancePassedAny } from "../../src/lib/speaking-score.ts";
import { reservableTurns } from "../../src/lib/checkpoint-oral.ts";

const dep = (process.argv[2] ?? "").toUpperCase();
const w1 = Number(process.argv[3] ?? 31);
const w2 = Number(process.argv[4] ?? 40);
if (!dep) throw new Error("usage: p4check.ts <DEP> [w1] [w2]");

const norm = (s: string) =>
  ` ${s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9' ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()} `;
const words = (s: string) => s.trim().split(/\s+/).filter(Boolean).length;
const sentences = (s: string) => s.split(/(?<=[.!?])\s+/).filter((x) => x.trim());
const flag = (bad: boolean, s: string) => (bad ? `${s}!` : s);

// Every headword this department met before each week, to tell new cards
// from re-presented ones.
const taughtBefore = new Map<number, Set<string>>();
{
  const seen = new Set<string>();
  for (let w = 1; w <= 40; w++) {
    taughtBefore.set(w, new Set(seen));
    for (const l of getWeekContent(dep, String(w))?.lessons ?? [])
      for (const v of l.vocabulary) seen.add(v.word.toLowerCase());
  }
}

let pool = 0;
let riskTotal = 0;
const p4Headwords: string[] = [];
const issues: string[] = [];
console.log(
  `${dep}  wk  cards new  said%  turns chain risk alt  nonGuest maxSent maxTurn  self  games expl kind longest  read maxW q expl  gram near  review canDo`,
);
for (let w = w1; w <= w2; w++) {
  const wc = getWeekContent(dep, String(w));
  if (!wc) {
    console.log(`${dep}  ${w}  (no week)`);
    continue;
  }
  const ls = wc.lessons;
  const cards = ls.flatMap((l) => l.vocabulary);
  const before = taughtBefore.get(w)!;
  const fresh = cards.filter((c) => !before.has(c.word.toLowerCase()));
  const turns = ls.flatMap((l) => l.speaking.map((s) => ({ s, id: l.lessonId })));
  const targets = turns.map((t) => norm(t.s.targetResponse)).join("|");
  const said = cards.filter((c) => targets.includes(norm(c.word)));
  pool += turns.length;
  const risks = turns.filter((t) => t.s.risk);
  riskTotal += risks.length;
  const alts = turns.filter((t) => (t.s.alsoAccept ?? []).length > 0);
  const nonGuest = turns.filter((t) => t.s.speakerRole && t.s.speakerRole !== "guest");
  const chained = turns.filter((t) => t.s.follows);
  const maxSent = Math.max(0, ...turns.flatMap((t) => sentences(t.s.targetResponse).map(words)));
  const maxTurn = Math.max(0, ...turns.map((t) => words(t.s.targetResponse)));
  // Every model and every alsoAccept must pass on the drill path.
  let selfFail = 0;
  for (const t of turns) {
    const answers = acceptedAnswers(
      dep,
      w,
      t.s.guestPrompt,
      t.s.targetResponse,
      t.s.requiredTokens,
      t.s.speakerRole,
    );
    for (const said of [t.s.targetResponse, ...(t.s.alsoAccept ?? [])])
      if (!utterancePassedAny(said, answers, w, t.s.guestPrompt).passed) {
        selfFail++;
        issues.push(`${t.id} does not pass itself: "${said}"`);
      }
  }
  const games = ls.flatMap((l) => l.game);
  const explained = games.filter((g) => g.explanation);
  const kinded = games.filter((g) => g.options.every((o) => o.kind));
  const longestRight = games.filter((g) => {
    const len = g.options.map((o) => o.text.length);
    const right = g.options.findIndex((o) => o.correct);
    return len[right] === Math.max(...len) && len.filter((x) => x === len[right]).length === 1;
  });
  const readWords = ls.map((l) => words(l.reading.text));
  const qs = ls.flatMap((l) => l.reading.questions);
  const qExpl = qs.filter((q) => q.explanation);
  const gram = ls.flatMap((l) => l.grammar);
  const near = gram.filter((g) => g.nearMiss);
  // The course's own wrong answers must fail against their repair.
  for (const l of ls)
    for (const g of l.grammar)
      for (const bad of [g.rude, g.nearMiss].filter(Boolean) as string[])
        if (utterancePassed(bad, g.polite, String(w)).passed)
          issues.push(`${l.lessonId} grammar wrong form passes: "${bad}" for "${g.polite}"`);
  if (w <= 39) p4Headwords.push(...fresh.map((c) => c.word));
  const pct = (a: number, b: number) => (b ? Math.round((100 * a) / b) : 0);
  const reviewN = wc.reviewWords?.length ?? 0;
  console.log(
    [
      `${dep}  ${w}`,
      flag(cards.length < 16 || cards.length > 18, String(cards.length).padStart(5)),
      String(fresh.length).padStart(3),
      flag(pct(said.length, cards.length) < 75, `${pct(said.length, cards.length)}%`.padStart(6)),
      flag(turns.length < 20, String(turns.length).padStart(6)),
      flag(chained.length < 4, String(chained.length).padStart(5)),
      flag(risks.length < 2, String(risks.length).padStart(4)),
      String(alts.length).padStart(3),
      String(nonGuest.length).padStart(8),
      flag(maxSent > 22, String(maxSent).padStart(7)),
      flag(maxTurn > 30, String(maxTurn).padStart(7)),
      flag(selfFail > 0, String(selfFail).padStart(5)),
      flag(games.length < 8, String(games.length).padStart(6)),
      flag(explained.length < games.length, `${pct(explained.length, games.length)}%`.padStart(5)),
      flag(kinded.length < games.length, `${pct(kinded.length, games.length)}%`.padStart(5)),
      flag(
        pct(longestRight.length, games.length) > 40,
        `${pct(longestRight.length, games.length)}%`.padStart(7),
      ),
      flag(Math.max(...readWords) > 350, String(Math.max(...readWords)).padStart(9)),
      String(qs.length).padStart(2),
      flag(qExpl.length < qs.length, `${pct(qExpl.length, qs.length)}%`.padStart(5)),
      flag(gram.length < 8, String(gram.length).padStart(5)),
      flag(near.length < gram.length, `${pct(near.length, gram.length)}%`.padStart(5)),
      flag(reviewN < Math.ceil(cards.length * 0.4), String(reviewN).padStart(7)),
      flag(!wc.canDoVi, wc.canDoVi ? "yes" : "no").padStart(6),
    ].join(" "),
  );
}

// Phase-level: how big the spoken pool is, and what the must-be-right slot draws.
const reserved = reservableTurns(dep, "40");
console.log(
  `\n${dep} P4: speaking pool ${pool} turns · risk-marked ${riskTotal} · reserved slot draws from ${reserved.turns.length} turn(s) (${reserved.byMark ? "author-marked" : "REGEX FALLBACK!"})`,
);
// Headwords of weeks 31-39 said again in a LATER week's targets.
const laterTargets = (w: number) => {
  const out: string[] = [];
  for (let x = w + 1; x <= 40; x++)
    for (const l of getWeekContent(dep, String(x))?.lessons ?? [])
      for (const s of l.speaking) out.push(norm(s.targetResponse));
  return out.join("|");
};
let resaid = 0;
for (let w = 31; w <= 39; w++)
  for (const l of getWeekContent(dep, String(w))?.lessons ?? [])
    for (const v of l.vocabulary) if (laterTargets(w).includes(norm(v.word))) resaid++;
console.log(
  `${dep} P4: headwords of weeks 31-39 said again in a later week: ${resaid}/${p4Headwords.length}`,
);
if (issues.length) {
  console.log(`\n${issues.length} issue(s):`);
  for (const i of issues.slice(0, 60)) console.log("  " + i);
}
