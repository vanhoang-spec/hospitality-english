/* eslint-disable @typescript-eslint/no-explicit-any */
// Probe dùng cho vòng đo/kiểm định. Chạy từ gốc repo: bun scripts/probes/<file>
import { getWeekContent } from "../../src/lib/content/week-content.ts";
import { utterancePassed } from "../../src/lib/speaking-score.ts";
const FUNC = new Set(
  "a an the i you we he she it they is are am was were will would can could may might must shall should do does did to of in on at for with and or but not no".split(
    " ",
  ),
);
type Item = { t: string; p: string; w: string; must?: string[] };
const items: Item[] = [];
const nm: [string, string, string][] = [];
for (const d of ["FO", "FB", "HK", "SW", "GR", "BO"])
  for (let w = 15; w <= 22; w++)
    for (const l of getWeekContent(d, String(w))?.lessons ?? []) {
      for (const s of l.speaking ?? [])
        items.push({
          t: s.targetResponse,
          p: s.guestPrompt,
          w: String(w),
          must: (s as any).requiredTokens,
        });
      for (const g of l.grammar ?? []) {
        if ((g as any).nearMiss) nm.push([(g as any).nearMiss, g.polite, String(w)]);
        nm.push([g.rude, g.polite, String(w)]);
      }
    }
const strip = (t: string, f: (w: string, i: number) => boolean) =>
  t
    .replace(/[^A-Za-z' ]/g, " ")
    .split(" ")
    .filter(Boolean)
    .filter(f)
    .join(" ");
const PROFILES: [string, (i: Item) => string][] = [
  ["đọc đúng nguyên văn", (i) => i.t],
  ["im lặng", () => ""],
  ["nhại lại lời khách", (i) => i.p],
  ["câu tủ vạn năng", () => "Certainly madam, one moment please."],
  ["bỏ hết hư từ", (i) => strip(i.t, (w) => !FUNC.has(w.toLowerCase()))],
  ["bỏ hư từ + đuôi -s", (i) => strip(i.t, (w) => !FUNC.has(w.toLowerCase())).replace(/s\b/g, "")],
  [
    "đảo ngược trật tự",
    (i) =>
      strip(i.t, () => true)
        .split(" ")
        .reverse()
        .join(" "),
  ],
  ["bọc trong tiếng ồn", (i) => `banana ${i.t} banana`],
  ["thêm hai từ lạ", (i) => `${i.t} extra token`],
];
for (const [name, f] of PROFILES) {
  let pass = 0;
  for (const i of items) if (utterancePassed(f(i), i.t, i.w, i.must, i.p).passed) pass++;
  console.log(
    `${name.padEnd(22)} ${((pass / items.length) * 100).toFixed(1)}%  (${pass}/${items.length})`,
  );
}
let leak = 0;
const seen = new Set<string>();
for (const [bad, good, w] of nm) {
  if (seen.has(bad + good)) continue;
  seen.add(bad + good);
  if (utterancePassed(bad, good, w).passed) leak++;
}
console.log(`\nchuỗi nearMiss/rude của chính khoá: ${leak}/${seen.size} lọt`);
