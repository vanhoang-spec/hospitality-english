// Probe dùng cho vòng đo/kiểm định. Chạy từ gốc repo: bun scripts/probes/<file>
// Surface tricks the round-4 auditors used, run on real buildPaper output.
// Usage: bun tricks.ts [papersPerDept]
import { buildPaper } from "../../src/lib/checkpoint-paper.ts";

const N = Number(process.argv[2] ?? 100);
const DEPS = ["FO", "FB", "HK", "SW", "GR"];
type Q = { kind: string; options: string[]; correctIdx: number };
const toks = (t: string) =>
  new Set(
    t
      .toLowerCase()
      .replace(/[^a-z' ]/g, " ")
      .split(" ")
      .filter(Boolean),
  );
const jac = (a: string, b: string) => {
  const A = toks(a),
    B = toks(b);
  const inter = [...A].filter((x) => B.has(x)).length;
  return inter / Math.max(1, new Set([...A, ...B]).size);
};
const TRICKS: Record<string, (o: string[]) => number> = {
  shortest: (o) => o.map((x, i) => [x.length, i]).sort((a, b) => a[0] - b[0])[0][1],
  longest: (o) => o.map((x, i) => [x.length, i]).sort((a, b) => b[0] - a[0])[0][1],
  middle: (o) =>
    o.map((x, i) => [x.length, i]).sort((a, b) => a[0] - b[0])[Math.floor(o.length / 2)][1],
  centroid: (o) =>
    o
      .map((x, i) => [o.reduce((s, y, j) => (i === j ? s : s + jac(x, y)), 0), i])
      .sort((a, b) => b[0] - a[0])[0][1],
  pairShorter: (o) => {
    let best = [-1, 0, 1];
    for (let i = 0; i < o.length; i++)
      for (let j = i + 1; j < o.length; j++) {
        const s = jac(o[i], o[j]);
        if (s > best[0]) best = [s, i, j];
      }
    return o[best[1]].length <= o[best[2]].length ? best[1] : best[2];
  },
  pairLonger: (o) => {
    let best = [-1, 0, 1];
    for (let i = 0; i < o.length; i++)
      for (let j = i + 1; j < o.length; j++) {
        const s = jac(o[i], o[j]);
        if (s > best[0]) best = [s, i, j];
      }
    return o[best[1]].length > o[best[2]].length ? best[1] : best[2];
  },
};
const FLOOR: Record<string, number> = { grammar: 2, listening: 3 };
for (const kind of ["grammar", "listening"]) {
  console.log(`\n== ${kind}`);
  const rows: string[] = [];
  for (const d of DEPS) {
    const hit: Record<string, number> = {};
    const floor: Record<string, number> = {};
    let q = 0,
      papers = 0,
      two = 0;
    for (let n = 0; n < N; n++) {
      const qs = (buildPaper(d, "22") as Q[]).filter((x) => x.kind === kind);
      if (!qs.length) continue;
      papers++;
      for (const x of qs) if (x.options.length < 3) two++;
      for (const [name, f] of Object.entries(TRICKS)) {
        let c = 0;
        for (const x of qs) if (f(x.options) === x.correctIdx) c++;
        hit[name] = (hit[name] ?? 0) + c;
        if (c >= FLOOR[kind]) floor[name] = (floor[name] ?? 0) + 1;
      }
      q += qs.length;
    }
    rows.push(
      `${d}: ` +
        Object.keys(TRICKS)
          .map(
            (k) =>
              `${k} ${((hit[k] / q) * 100).toFixed(0)}%/${((floor[k] / papers) * 100).toFixed(0)}%`,
          )
          .join(" · ") +
        ` (two-option ${two})`,
    );
  }
  for (const r of rows) console.log("  " + r);
}
console.log("\n(per-question hit rate / papers where the trick alone clears the block floor)");
