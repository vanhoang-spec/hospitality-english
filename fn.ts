import {
  utterancePassed,
  requiredFunctionTokens,
  normalize,
} from "D:/AI_app/Hospitality English/src/lib/speaking-score";
const cases: [string, string][] = [
  ["I work Housekeeping, sir.", "I work in Housekeeping, sir."],
  ["The wardrobe is the left, sir.", "The wardrobe is on the left, sir."],
  ["Of course. staircase is next to lift.", "Of course. The staircase is next to the lift."],
  ["I work in Housekeeping, sir.", "I work in Housekeeping, sir."],
];
for (const [said, target] of cases) {
  const r = utterancePassed(said, target, 8);
  console.log(
    `${r.passed ? "ĐẬU " : "trượt"}  "${said}"\n        đích: "${target}"  hư từ đích=${JSON.stringify(requiredFunctionTokens(target))} thiếu=${JSON.stringify(r.missingFunction)}`,
  );
}
