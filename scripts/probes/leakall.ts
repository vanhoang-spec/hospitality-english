// Probe dùng cho vòng đo/kiểm định. Chạy từ gốc repo: bun scripts/probes/<file>
const mod = process.argv[2] ?? "../../src/lib/speaking-score.ts";
const { utterancePassed } = await import(mod);
const { getWeekContent } = await import("../../src/lib/content/week-content.ts");
const PHASES: [string, number, number][] = [
  ["P0", 1, 6],
  ["P1", 7, 14],
  ["P2", 15, 22],
  ["P3", 23, 30],
  ["P4", 31, 40],
];
for (const [name, from, to] of PHASES) {
  let n = 0,
    pass = 0,
    leak = 0,
    leakN = 0;
  const seen = new Set<string>();
  for (const d of ["FO", "FB", "HK", "SW", "GR", "BO"])
    for (let w = from; w <= to; w++)
      for (const l of getWeekContent(d, String(w))?.lessons ?? []) {
        for (const s of l.speaking) {
          n++;
          if (
            utterancePassed(s.targetResponse, s.targetResponse, w, s.requiredTokens, s.guestPrompt)
              .passed
          )
            pass++;
        }
        for (const g of l.grammar)
          for (const bad of [g.rude, g.nearMiss].filter(Boolean) as string[]) {
            if (seen.has(bad + g.polite)) continue;
            seen.add(bad + g.polite);
            leakN++;
            if (utterancePassed(bad, g.polite, String(w)).passed) leak++;
          }
      }
  console.log(`${name}: self-pass ${pass}/${n} · leak ${leak}/${leakN}`);
}
