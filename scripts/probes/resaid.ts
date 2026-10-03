// Phase 3 headwords that are never SAID again after the week that teaches them.
//
// Blind reviews of Phase 3 round 3 counted 52-71 of ~108 week-23-29 headwords
// that no later model sentence says — the card is met once, quizzed as
// recognition, and never produced again before the checkpoint. This counts
// them with the production content: a headword is re-said when a speaking
// target (or an accepted paraphrase) of a LATER Phase 3 week contains it.
//
//   bun scripts/probes/resaid.ts            # all five departments, counts
//   bun scripts/probes/resaid.ts FO --list  # one department, the words
import { getWeekContent } from "../../src/lib/content/week-content";
import { normalize } from "../../src/lib/speaking-score";

const deps =
  process.argv[2] && !process.argv[2].startsWith("-")
    ? [process.argv[2]]
    : ["FO", "FB", "HK", "SW", "GR"];
const list = process.argv.includes("--list");

const says = (sentence: string, word: string) => {
  const s = ` ${normalize(sentence).join(" ")} `;
  const w = normalize(word).join(" ");
  return [w, `${w}s`, `${w}es`, w.replace(/y$/, "ies")].some((f) => s.includes(` ${f} `));
};

for (const dep of deps) {
  const lines: Record<number, string[]> = {};
  for (let w = 23; w <= 30; w++)
    lines[w] = (getWeekContent(dep, String(w))?.lessons ?? []).flatMap((l) =>
      l.speaking.flatMap((s) => [s.targetResponse, ...(s.alsoAccept ?? [])]),
    );
  const dead: string[] = [];
  let total = 0;
  for (let w = 23; w <= 29; w++)
    for (const l of getWeekContent(dep, String(w))?.lessons ?? [])
      for (const v of l.vocabulary) {
        total++;
        let later = false;
        for (let x = w + 1; x <= 30 && !later; x++) later = lines[x]!.some((s) => says(s, v.word));
        if (!later) dead.push(`w${w} ${v.word}`);
      }
  console.log(
    `${dep}: ${dead.length}/${total} week 23-29 headwords never said again in a later P3 week`,
  );
  if (list) for (const d of dead) console.log(`  ${d}`);
}
