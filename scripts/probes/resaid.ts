// Headwords that are never SAID again after the week that teaches them.
//
// Blind reviews of Phase 3 round 3 counted 52-71 of ~108 week-23-29 headwords
// that no later model sentence says — the card is met once, quizzed as
// recognition, and never produced again before the checkpoint. This counts
// them with the production content: a headword is re-said when a speaking
// target (or an accepted paraphrase) of a LATER week of the same phase
// contains it. Phase 4 round 2 found the same shape again (27-40% re-said),
// counted on model sentences only, so `--phase 4` counts models only.
//
//   bun scripts/probes/resaid.ts                     # Phase 3, all five departments
//   bun scripts/probes/resaid.ts FO --list           # one department, the words
//   bun scripts/probes/resaid.ts --phase 4 [FO] [--list]
import { getWeekContent } from "../../src/lib/content/week-content";
import { normalize } from "../../src/lib/speaking-score";

const args = process.argv.slice(2);
const p4 = args.includes("--phase") && args[args.indexOf("--phase") + 1] === "4";
const dep1 = args.find((a) => /^[A-Z]{2}$/.test(a));
const deps = dep1 ? [dep1] : ["FO", "FB", "HK", "SW", "GR"];
const list = args.includes("--list");
const [first, last] = p4 ? [31, 40] : [23, 30];

const says = (sentence: string, word: string) => {
  const s = ` ${normalize(sentence).join(" ")} `;
  const w = normalize(word).join(" ");
  return [w, `${w}s`, `${w}es`, w.replace(/y$/, "ies")].some((f) => s.includes(` ${f} `));
};

for (const dep of deps) {
  const lines: Record<number, string[]> = {};
  for (let w = first; w <= last; w++)
    lines[w] = (getWeekContent(dep, String(w))?.lessons ?? []).flatMap((l) =>
      l.speaking.flatMap((s) => [s.targetResponse, ...(p4 ? [] : (s.alsoAccept ?? []))]),
    );
  const dead: string[] = [];
  const seen = new Set<string>();
  let total = 0;
  for (let w = first; w < last; w++)
    for (const l of getWeekContent(dep, String(w))?.lessons ?? [])
      for (const v of l.vocabulary) {
        // A card shown again in a later week (week 39's run-through) is the
        // same headword, counted once, from where it was first taught.
        if (seen.has(v.word)) continue;
        seen.add(v.word);
        total++;
        let later = false;
        for (let x = w + 1; x <= last && !later; x++)
          later = lines[x]!.some((s) => says(s, v.word));
        if (!later) dead.push(`w${w} ${v.word}`);
      }
  console.log(
    `${dep}: ${dead.length}/${total} week ${first}-${last - 1} headwords never said again in a later P${p4 ? 4 : 3} week` +
      ` (${(100 - (100 * dead.length) / Math.max(1, total)).toFixed(0)}% re-said)`,
  );
  if (list) for (const d of dead) console.log(`  ${d}`);
}
