/* eslint-disable @typescript-eslint/no-explicit-any */
// Probe dùng cho vòng đo/kiểm định. Chạy từ gốc repo: bun scripts/probes/<file>
// Render harness: print the SAME site across all six departments side by side.
// Replacement for the earlier round's six1.ts (not present in the repo).
//
//   bun six1.ts week <week> [kindPrefix]   -> dump a week for all 6 deps
//   bun six1.ts grep <regex> [w1] [w2]     -> find a string across all dep renders
//   bun six1.ts lesson <LESSONID>          -> print one lesson cluster, all deps
//   bun six1.ts slot <group> <idx>         -> bank slot value in all 6 deps
const ROOT = new URL("../../src/lib/content", import.meta.url).href;
export const WC: any = await import(`${ROOT}/week-content.ts`);
export const LEX: any = await import(`${ROOT}/phase2-lexicon.ts`);

export const DEPS = ["FO", "FB", "HK", "SW", "GR", "BO"];
export const lessonsOf = (dep: string, week: number): any[] =>
  WC.getWeekContent(dep, week)?.lessons ?? [];

/** Every rendered string of a lesson, with a label saying where it sits. */
export function sites(l: any): { kind: string; text: string }[] {
  const out: { kind: string; text: string }[] = [];
  out.push({ kind: "title", text: `${l.titleEn} | ${l.titleVi}` });
  l.vocabulary.forEach((v: any, i: number) =>
    out.push({ kind: `vocab[${i}]`, text: `${v.word} :: ${v.context}` }),
  );
  l.grammar.forEach((g: any, i: number) => {
    out.push({ kind: `gram[${i}].rude`, text: g.rude });
    out.push({ kind: `gram[${i}].polite`, text: g.polite });
    out.push({ kind: `gram[${i}].rule`, text: g.rule });
    if (g.nearMiss) out.push({ kind: `gram[${i}].nearMiss`, text: g.nearMiss });
  });
  l.speaking.forEach((s: any, i: number) => {
    out.push({ kind: `sp[${i}].prompt(${s.speakerRole ?? "guest"})`, text: s.guestPrompt });
    out.push({ kind: `sp[${i}].target`, text: s.targetResponse });
    out.push({ kind: `sp[${i}].tip`, text: s.helpTip });
    if (s.requiredTokens)
      out.push({ kind: `sp[${i}].reqTok`, text: JSON.stringify(s.requiredTokens) });
    if (s.follows) out.push({ kind: `sp[${i}].follows`, text: s.follows });
  });
  out.push({ kind: "read.text", text: l.reading.text });
  l.reading.questions.forEach((q: any, i: number) => {
    out.push({ kind: `read.q[${i}]`, text: q.q });
    q.options.forEach((o: string, j: number) =>
      out.push({ kind: `read.q[${i}].opt[${j}]${q.correct === j ? "*" : ""}`, text: o }),
    );
    if (q.explanation) out.push({ kind: `read.q[${i}].exp`, text: q.explanation });
  });
  l.game.forEach((r: any, i: number) => {
    out.push({ kind: `game[${i}].prompt(${r.speakerRole ?? "guest"})`, text: r.prompt });
    r.options.forEach((o: any, j: number) =>
      out.push({
        kind: `game[${i}].opt[${j}]${o.correct ? "*" : ""}${o.kind ? ":" + o.kind : ""}`,
        text: o.text,
      }),
    );
    if (r.explanation) out.push({ kind: `game[${i}].exp`, text: r.explanation });
  });
  return out;
}

if (import.meta.main) {
  const [what, a, b, c] = process.argv.slice(2);
  if (what === "week") {
    for (const d of DEPS) {
      const wk = Number(a);
      console.log(
        `\n${"=".repeat(80)}\n${d}-${wk}  ${WC.getWeekContent(d, wk)?.weekTitleEn}\n${"=".repeat(80)}`,
      );
      for (const l of lessonsOf(d, wk)) {
        console.log(`\n--- ${l.lessonId} · ${l.titleEn} / ${l.titleVi}`);
        for (const s of sites(l))
          if (!b || s.kind.startsWith(b)) console.log(`  ${s.kind.padEnd(26)} ${s.text}`);
      }
    }
  } else if (what === "grep") {
    const re = new RegExp(a!, "i");
    const lo = b ? Number(b) : 1,
      hi = c ? Number(c) : 22;
    for (const d of DEPS)
      for (let w = lo; w <= hi; w++)
        for (const l of lessonsOf(d, w))
          for (const s of sites(l))
            if (re.test(s.text))
              console.log(`${d}-${w} ${l.lessonId} ${s.kind.padEnd(24)} ${s.text}`);
  } else if (what === "lesson") {
    for (const d of DEPS)
      for (let w = 15; w <= 22; w++)
        for (const l of lessonsOf(d, w))
          if (l.lessonId === a || l.lessonId.endsWith(a!)) {
            console.log(
              `\n${"=".repeat(80)}\n${l.lessonId} · ${l.titleEn} / ${l.titleVi}\n${"=".repeat(80)}`,
            );
            for (const s of sites(l)) console.log(`  ${s.kind.padEnd(26)} ${s.text}`);
          }
  } else if (what === "slot") {
    console.log(`bank group "${a}" index ${b} across departments:`);
    for (const d of DEPS) {
      const w = LEX.P2_BANKS[d]?.[a!]?.[Number(b)];
      console.log(
        `  ${d.padEnd(3)} ${w ? `${w.word.padEnd(26)} ${w.icon}  ${w.definition}` : "(none)"}`,
      );
    }
  }
}
