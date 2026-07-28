/* Dump every generated learner-facing sentence for given weeks so a human
   can read what the frame×bank substitution actually produces. */
import { getWeekContent } from "../src/lib/content/week-content";

const weeks = process.argv.slice(2).map(Number);
const DEPS = ["FO", "FB", "HK", "SW", "GR", "BO"];

for (const w of weeks) {
  console.log(`\n########## WEEK ${w} ##########`);
  for (const dep of DEPS) {
    const c = getWeekContent(dep, w);
    if (!c) continue;
    console.log(`\n--- ${dep} : ${c.weekTitleEn} ---`);
    for (const l of c.lessons) {
      for (const v of l.vocabulary) console.log(`  VOCAB ctx: ${v.context}`);
      for (const g of l.grammar) console.log(`  GRAMMAR polite: ${g.polite}`);
      for (const s of l.speaking) console.log(`  SPEAK target: ${s.targetResponse}`);
      for (const gm of l.game) {
        const ok = gm.options.find((o) => o.correct)!;
        console.log(`  GAME prompt: ${gm.prompt}`);
        console.log(`       correct: ${ok.text}`);
      }
    }
  }
}
