/* eslint-disable @typescript-eslint/no-explicit-any */
// Probe dùng cho vòng đo/kiểm định. Chạy từ gốc repo: bun scripts/probes/<file>
// C1 — ORPHAN BANK SLOTS, v2.
//
// v1 matched substrings, which produced false positives: "Hot stone" matched
// inside the CARDED headword "Hot stone massage", and "Course" matched inside
// "Of course, madam." Both are phrases the learner already has a card for (or
// never says as a headword at all).
//
// v2 matches a WORD SEQUENCE, and treats a hit as covered when some carded
// headword of the same department spans it.
import { WC, LEX, DEPS, lessonsOf } from "./six1.ts";

const words = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z0-9' ]/g, " ")
    .split(/ +/)
    .filter(Boolean);

/** all start indices where `needle` appears as a contiguous word run in `hay` */
function runs(hay: string[], needle: string[]): number[] {
  const out: number[] = [];
  for (let i = 0; i + needle.length <= hay.length; i++) {
    let ok = true;
    for (let k = 0; k < needle.length; k++)
      if (hay[i + k] !== needle[k]) {
        ok = false;
        break;
      }
    if (ok) out.push(i);
  }
  return out;
}

export function cardsOf(dep: string): Map<string, number[]> {
  const m = new Map<string, number[]>();
  for (let w = 1; w <= 22; w++)
    for (const l of lessonsOf(dep, w))
      for (const v of l.vocabulary) {
        const k = words(v.word).join(" ");
        if (!m.has(k)) m.set(k, []);
        if (!m.get(k)!.includes(w)) m.get(k)!.push(w);
      }
  return m;
}

function produced(dep: string) {
  const out: { week: number; lessonId: string; kind: string; text: string }[] = [];
  for (let w = 15; w <= 22; w++)
    for (const l of lessonsOf(dep, w)) {
      l.speaking.forEach((s: any, i: number) =>
        out.push({ week: w, lessonId: l.lessonId, kind: `sp[${i}]`, text: s.targetResponse }),
      );
      l.grammar.forEach((g: any, i: number) =>
        out.push({ week: w, lessonId: l.lessonId, kind: `gram[${i}]`, text: g.polite }),
      );
      l.game.forEach((r: any, i: number) =>
        r.options.forEach((o: any, j: number) => {
          if (o.correct)
            out.push({ week: w, lessonId: l.lessonId, kind: `game[${i}]opt${j}`, text: o.text });
        }),
      );
    }
  return out;
}

export function scan(verbose = false) {
  const found: any[] = [];
  for (const dep of DEPS) {
    const cards = cardsOf(dep);
    const cardSeqs = [...cards.keys()].map((k) => k.split(" "));
    const sents = produced(dep).map((s) => ({ ...s, w: words(s.text) }));
    const bank = LEX.P2_BANKS[dep];
    for (const group of Object.keys(bank))
      bank[group].forEach((bw: any, index: number) => {
        const needle = words(bw.word);
        const key = needle.join(" ");
        if (cards.has(key)) return; // carded outright
        const hits: string[] = [];
        for (const s of sents)
          for (const at of runs(s.w, needle)) {
            // covered if a CARDED headword spans this run in this sentence
            const covered = cardSeqs.some(
              (cs) =>
                cs.length > needle.length &&
                runs(s.w, cs).some((ca) => ca <= at && ca + cs.length >= at + needle.length),
            );
            if (!covered)
              hits.push(`${dep}-${s.week} ${s.lessonId} ${s.kind.padEnd(12)} ${s.text}`);
          }
        if (hits.length) found.push({ dep, group, index, word: bw.word, hits });
      });
  }
  return found;
}

if (import.meta.main) {
  const all = scan();
  for (const dep of DEPS) {
    const list = all.filter((o) => o.dep === dep);
    console.log(`\n### ${dep} — ${list.length} orphan phrase(s)`);
    for (const o of list) {
      console.log(`  ${o.group}[${o.index}]  "${o.word}"  (${o.hits.length} site(s))`);
      for (const h of [...new Set<string>(o.hits)].slice(0, 30)) console.log(`      ${h}`);
    }
  }
  console.log("\n=== TALLY ===");
  for (const dep of DEPS) console.log(`  ${dep}: ${all.filter((o) => o.dep === dep).length}`);
  console.log(`  TOTAL: ${all.length}`);
}
