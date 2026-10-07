// Probe dùng cho vòng đo/kiểm định. Chạy từ gốc repo: bun scripts/probes/swapone.ts [w1] [w2]
//
// Thay MỘT từ nội dung của câu mẫu bằng một từ lạc đề ("window") rồi chấm bằng
// đúng đường luyện (acceptedAnswers + utterancePassedAny). Một lượt "lỏng" nếu
// có ít nhất một phép thay như thế vẫn qua. Cột "chỉ nhờ nghĩa" là những lượt
// mà không phép thay nào qua bằng đường nguyên văn — tức là lớp saidInOtherWords
// (từ tuần 23) tự mở ra.
//
// Các bộ đo khác (leakall, cheat, bench của auditor) đều là danh sách CÂU CỤ
// THỂ, nên không bắt được lỗi dạng "đổi một từ lấy bất kỳ từ nào": vòng P4-r1
// tìm ra lớp nghĩa cho "Please use the LIFT" ở ca báo cháy, và "Of WINDOW,
// sir" qua ở 69–77% lượt P3. Chạy probe này sau mọi thay đổi bộ chấm.
const { getWeekContent } = await import("../../src/lib/content/week-content.ts");
const { acceptedAnswers } = await import("../../src/lib/speaking-alternates.ts");
const { utterancePassedAny, isContentToken } = await import("../../src/lib/speaking-score.ts");
const w1 = Number(process.argv[2] ?? 15);
const w2 = Number(process.argv[3] ?? 40);
const SUB = "window";
const rows: Record<string, { turns: number; loose: number; meaning: number }> = {};
for (const dep of ["FO", "FB", "HK", "SW", "GR"])
  for (let w = w1; w <= w2; w++) {
    const wc = getWeekContent(dep, String(w));
    if (!wc) continue;
    const ph = w <= 6 ? "P0" : w <= 14 ? "P1" : w <= 22 ? "P2" : w <= 30 ? "P3" : "P4";
    const row = (rows[`${ph} ${dep}`] ??= { turns: 0, loose: 0, meaning: 0 });
    for (const l of wc.lessons)
      for (const s of l.speaking ?? []) {
        row.turns++;
        const answers = acceptedAnswers(
          dep,
          w,
          s.guestPrompt,
          s.targetResponse,
          s.requiredTokens,
          s.speakerRole,
        );
        const words = s.targetResponse.split(/\s+/);
        let strict = false;
        let meaning = false;
        for (let i = 0; i < words.length && !strict; i++) {
          const bare = words[i]!.toLowerCase().replace(/[^a-z']/g, "");
          if (!bare || !isContentToken(bare) || /^(sir|madam)$/.test(bare)) continue;
          const tried = [...words];
          tried[i] = words[i]!.replace(/[A-Za-z']+/, SUB);
          const r = utterancePassedAny(tried.join(" "), answers, w, s.guestPrompt);
          if (r.passed && !r.byMeaning) strict = true;
          if (r.passed && r.byMeaning) meaning = true;
        }
        if (strict || meaning) row.loose++;
        if (meaning && !strict) row.meaning++;
      }
  }
const pct = (a: number, b: number) => `${((100 * a) / b).toFixed(1)}%`;
for (const [k, v] of Object.entries(rows))
  console.log(
    `${k}  lỏng ${v.loose}/${v.turns} (${pct(v.loose, v.turns)})  chỉ nhờ nghĩa ${v.meaning} (${pct(v.meaning, v.turns)})`,
  );
