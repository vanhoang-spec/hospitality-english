// Probe dùng cho vòng đo/kiểm định. Chạy từ gốc repo: bun scripts/probes/<file>
// Oral draw distribution: item frequency, memorisation curve, authority slot use,
// duplicate prompts. Calls the real buildOral.
import { buildOral, oralHalfPassed, type OralItem } from "../../src/lib/checkpoint-oral.ts";

const N = Number(process.argv[2] ?? 4000);
const DEPS = (process.argv[3] ?? "FO,FB,HK,SW,GR").split(",");
const week = process.argv[4] ?? "22";
if (!Number.isInteger(N) || N < 1) throw new Error("N must be a positive integer");
for (const d of DEPS) {
  const freq = new Map<string, number>();
  const sittings: OralItem[][] = [];
  const firstAuthority = new Map<string, number>();
  for (let n = 0; n < N; n++) {
    const p = buildOral(d, week);
    const keys = p.map((x) => x.target);
    for (const k of new Set(keys)) freq.set(k, (freq.get(k) ?? 0) + 1);
  }
  // Rank on one sample, evaluate on a separate sample. In-sample ranking
  // overestimates how useful the memorised list is on unseen papers.
  for (let n = 0; n < N; n++) {
    const p = buildOral(d, week);
    sittings.push(p);
    for (const item of p.filter((item) => item.reserved))
      firstAuthority.set(item.target, (firstAuthority.get(item.target) ?? 0) + 1);
  }
  const ranked = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  const curve = [20, 40, 60, 80].map((m) => {
    const known = new Set(ranked.slice(0, m).map((x) => x[0]));
    let pass = 0;
    for (const s of sittings)
      if (oralHalfPassed(s.map((item) => ({ item, passed: known.has(item.target) })))) pass++;
    return `${m}→${((pass / N) * 100).toFixed(1)}%`;
  });
  console.log(
    `\n== ${d} week ${week}: ranking N=${N}, independent evaluation N=${N} · distinct drawn ${freq.size} · top item ${(((ranked[0]?.[1] ?? 0) / N) * 100).toFixed(1)}% · memorise ${curve.join(" ")}`,
  );
  for (const [t, c] of ranked.slice(0, 5)) console.log(`   ${((c / N) * 100).toFixed(1)}%  ${t}`);
  const fa = [...firstAuthority.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  console.log(
    `   reserved in ${sittings.filter((p) => p.some((item) => item.reserved)).length}/${N} papers; targets ${firstAuthority.size}:`,
    fa.map(([t, c]) => `${((c / N) * 100).toFixed(0)}% ${t}`).join(" | "),
  );
}
