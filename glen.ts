// Mẹo AC-FB nêu: bỏ phương án tiếng bồi (ngắn nhất) đi, rồi chọn cái NGẮN HƠN
// trong hai cái còn lại. Và mẹo thô: chọn cái DÀI NHẤT.
import { getWeekContent } from "D:/AI_app/Hospitality English/src/lib/content/week-content";
for (const [name, lo, hi] of [
  ["P0", 1, 6],
  ["P1", 7, 14],
] as [string, number, number][]) {
  let n = 0,
    longest = 0,
    shorterOfTwo = 0,
    pidginShortest = 0;
  for (const dep of ["FO", "FB", "HK", "SW", "GR"])
    for (let w = lo; w <= hi; w++)
      for (const l of getWeekContent(dep, String(w))?.lessons ?? [])
        for (const r of l.game ?? []) {
          const opts = r.options.map((o) => ({ t: o.text, ok: o.correct, len: o.text.length }));
          const key = opts.find((o) => o.ok)!;
          n++;
          const mx = Math.max(...opts.map((o) => o.len));
          const tiedL = opts.filter((o) => o.len === mx);
          longest += tiedL.some((o) => o.ok) ? 1 / tiedL.length : 0;
          const mn = Math.min(...opts.map((o) => o.len));
          const shortest = opts.filter((o) => o.len === mn);
          if (shortest.length === 1 && !shortest[0].ok) {
            pidginShortest++;
            const rest = opts.filter((o) => o !== shortest[0]).sort((a, b) => a.len - b.len);
            if (rest[0].ok) shorterOfTwo++;
          }
        }
  const p = (x: number, d = n) => `${((x / d) * 100).toFixed(0)}%`;
  console.log(
    `${name}  ${n} lượt · DÀI NHẤT thắng ${p(longest)} · bỏ câu ngắn nhất rồi chọn NGẮN HƠN thắng ${p(shorterOfTwo, pidginShortest)} (trên ${pidginShortest} lượt có đúng một câu ngắn nhất và nó SAI)`,
  );
}
