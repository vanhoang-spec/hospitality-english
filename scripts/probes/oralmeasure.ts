// Probe dùng cho vòng đo/kiểm định. Chạy từ gốc repo: bun scripts/probes/<file>
// Oral draw distribution: item frequency, memorisation curve, authority slot use,
// duplicate prompts. Calls the real buildOral.
import { buildOral } from "../../src/lib/checkpoint-oral.ts";
import { oralPassMin } from "../../src/lib/phases.ts";

const N = Number(process.argv[2] ?? 4000);
const DEPS = (process.argv[3] ?? "FO,FB,HK,SW,GR").split(",");
const week = process.argv[4] ?? "22";
const flat = (t: string) =>
  t
    .toLowerCase()
    .replace(/[^a-z ]/g, " ")
    .replace(/ +/g, " ")
    .trim();
for (const d of DEPS) {
  const freq = new Map<string, number>();
  const sittings: string[][] = [];
  const firstAuthority = new Map<string, number>();
  for (let n = 0; n < N; n++) {
    const p = buildOral(d, week);
    const keys = p.map((x) => x.target);
    sittings.push(keys);
    for (const k of new Set(keys)) freq.set(k, (freq.get(k) ?? 0) + 1);
    firstAuthority.set(keys[0], (firstAuthority.get(keys[0]) ?? 0) + 1);
  }
  const ranked = [...freq.entries()].sort((a, b) => b[1] - a[1]);
  const curve = [20, 40, 60, 80].map((m) => {
    const known = new Set(ranked.slice(0, m).map((x) => x[0]));
    let pass = 0;
    for (const s of sittings)
      if (s.filter((k) => known.has(k)).length >= oralPassMin(s.length)) pass++;
    return `${m}→${((pass / N) * 100).toFixed(0)}%`;
  });
  console.log(
    `\n== ${d}: distinct drawn ${freq.size} · top item ${((ranked[0][1] / N) * 100).toFixed(1)}% · memorise ${curve.join(" ")}`,
  );
  for (const [t, c] of ranked.slice(0, 5)) console.log(`   ${((c / N) * 100).toFixed(1)}%  ${t}`);
  const fa = [...firstAuthority.entries()].sort((a, b) => b[1] - a[1]).slice(0, 5);
  console.log(
    "   first (authority) slot:",
    fa.map(([t, c]) => `${((c / N) * 100).toFixed(0)}% ${t}`).join(" | "),
  );
}
