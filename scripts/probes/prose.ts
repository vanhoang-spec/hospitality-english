// How much of a natural spoken answer is grammar, and how much of a keyword
// list is? The spoken mode of scoreFreeText has no punctuation to count
// sentences with, so it tells prose from a word list by the share of tokens
// that are NOT content words — measured here on the course's own model
// answers, with the production tokeniser, before a threshold is chosen.
//
//   bun scripts/probes/prose.ts [firstWeek] [lastWeek]
import { getWeekContent } from "../../src/lib/content/week-content";
import { isContentToken, normalize } from "../../src/lib/speaking-score";

const DEPS = ["FO", "FB", "HK", "SW", "GR"];
const w1 = Number(process.argv[2] ?? 23);
const w2 = Number(process.argv[3] ?? 40);

const glueShare = (text: string) => {
  const t = normalize(text);
  return {
    n: t.length,
    share: t.length ? t.filter((x) => !isContentToken(x)).length / t.length : 0,
  };
};

const singles: number[] = [];
const pairs: number[] = [];
const lowest: Array<{ share: number; text: string }> = [];
for (const dep of DEPS)
  for (let w = w1; w <= w2; w++) {
    const wc = getWeekContent(dep, w);
    if (!wc) continue;
    for (const lesson of wc.lessons) {
      const said = lesson.speaking.map((s) => s.targetResponse);
      for (const s of said) {
        const g = glueShare(s);
        if (g.n >= 8) singles.push(g.share);
      }
      // Two consecutive model lines stand in for a two-sentence open answer.
      for (let i = 0; i + 1 < said.length; i++) {
        const text = `${said[i]} ${said[i + 1]}`;
        const g = glueShare(text);
        if (g.n >= 12) {
          pairs.push(g.share);
          lowest.push({ share: g.share, text });
        }
      }
    }
  }

const pct = (xs: number[], p: number) => {
  const s = [...xs].sort((a, b) => a - b);
  return s.length ? s[Math.min(s.length - 1, Math.floor((p / 100) * s.length))] : NaN;
};
const row = (name: string, xs: number[]) =>
  console.log(
    `${name.padEnd(28)} n=${String(xs.length).padStart(5)}  min ${pct(xs, 0).toFixed(2)}  p1 ${pct(xs, 1).toFixed(2)}  p5 ${pct(xs, 5).toFixed(2)}  p50 ${pct(xs, 50).toFixed(2)}`,
  );

console.log(`weeks ${w1}-${w2}, share of tokens that are not content words`);
row("one model line (>= 8 words)", singles);
row("two lines joined (>= 12)", pairs);

lowest.sort((a, b) => a.share - b.share);
console.log("\nlowest five joined answers:");
for (const l of lowest.slice(0, 5)) console.log(`  ${l.share.toFixed(2)}  ${l.text.slice(0, 150)}`);

const cheats = [
  "sorry suite same sorry suite same",
  "sorry kitchen chef contact call email",
  "apologise room ready twenty minutes manager upgrade breakfast voucher",
  "Sorry room not ready twenty minutes",
  "refund manager decide wait ten minutes call room number name",
  "guest allergy peanuts chef kitchen check ingredients come back two minutes",
];
console.log("\nword lists:");
for (const c of cheats) {
  const g = glueShare(c);
  console.log(`  ${g.share.toFixed(2)}  (${g.n} words)  ${c}`);
}
