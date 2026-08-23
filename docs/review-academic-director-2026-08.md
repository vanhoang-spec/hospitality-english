# Kiểm định học thuật toàn diện — Embassy Hospitality English (08/2026)

**Người kiểm định:** Academic Director (ESP Hospitality, 20 năm đứng lớp A0 → C1)
**Ngày:** 2026-08-03
**Đối tượng:** 100% cấu trúc & nội dung học của lộ trình 40 tuần × 6 bộ phận, như đang có trong repo.

---

## Executive read

### 3 điều tốt nhất

1. **19 tuần soạn tay đạt chuẩn xuất bản thương mại.** Từ FO-17 (pre-authorization, "The card did not go through, sir. Do you have another one?") đến FB-37 (halal: "Our beef and chicken are halal certified, sir. The seafood is not, so may I mark your order?"), SW-37 (consent: "Please undress only as far as you feel comfortable, madam. I will step outside while you get ready."), HK-37 (lost & found chain-of-custody) — đây là tiếng Anh nghề thật, register 5 sao thật, SOP thật. Nhiều giáo trình ESP thương mại tôi từng thẩm định không đạt độ chính xác nghiệp vụ này.
2. **Hạ tầng đo lường checkpoint thuộc loại hiếm thấy ở app học tiếng.** `phases.ts` + `WeekTestSuite`: điều kiện qua là **AND của hai nửa viết + nói** (`WeekTestSuite.tsx:522`: `const ok = writtenOk && (results.length === 0 || oralPassed >= CHECKPOINT_ORAL_PASS_MIN);`), sàn tối thiểu từng kỹ năng (`CHECKPOINT_BLOCK_FLOOR_PCT = 50`), cờ `mastered` sticky không bị lượt thi kém hơn ghi đè, câu nói **giấu câu mẫu đến khi có kết quả** và chấm theo ngưỡng của tuần nguồn, fail-open với thiết bị hỏng mic. Đây là tư duy khảo thí nghiêm túc.
3. **Chống lỗi chuyển di L1 là trục thiết kế, không phải trang trí.** Cặp rude/polite nhắm thẳng lỗi người Việt (rơi copula: "This my colleague." → "This is my colleague, Hoa."; thiếu mạo từ được xử lý bằng helper `wa()`/`art`; -s ngôi ba bằng `third()`; "Same same." → "They are the same, madam."). Thang nghe 0.70→0.90 tất định theo tuần, thang chấm nói 60→80 tăng dần, dung sai chính tả 1 ký tự chỉ ở pre-A1/A1 — tất cả đều có lý do sư phạm ghi ngay trong code.

### 5 vấn đề nặng nhất

1. **Tuyên bố B1.1 cuối khoá không được phép đo nào chứng nhận.** Ma trận hứa tuần 39–40 là "role-play mở", nhưng chính `speaking-score.ts:96-100` thừa nhận: _"That content does not exist: weeks 39 and 40 carry fixed `targetResponse` sentences like every other week, only longer (12-14 words)."_ SpeakingSuite hằng tuần là bài **đọc-nhại** (câu mẫu hiển thị suốt lúc nói — `SpeakingSuite.tsx:209`), bài thi cuối là 20 trắc nghiệm + 5 câu bắt chước. Không có chỗ nào học viên phải tự tạo ra một lượt lời B1.
2. **Máy sinh câu vẫn rò rỉ câu vô nghĩa ở chính giai đoạn khó nhất (P4).** FO-32 dạy làm câu chuẩn: _"Would you like the same feather allergy as last time, sir?"_ (mời khách nhận lại… chứng dị ứng). GR-39 dạy mở bài thuyết trình: _"Let me begin with the typhoon, sir."_; HK-39: _"Be ready to explain the insect."_ / _"Do not skip past the mosquito."_. BO-32 render đúng nguyên văn câu mà chính `docs/phase4-bank-contract.md` liệt kê là **ví dụ lỗi bị cấm**: _"Based on your preferred billing cycle, may I suggest something that suits you better?"_
3. **Mastery cấp suite có thể brute-force và kinh tế sao lạm phát.** GrammarSuite thưởng +4⭐ theo `round` chứ không theo puzzle (`GrammarSuite.tsx:86,154`) → đi vòng hết danh sách là farm sao vô hạn; ArcadeSuite bấm sai không mất gì (`"Chưa đúng — thử bong bóng khác nhé."`) → tap hết 3 bong bóng là chắc chắn "mastered", sao được farm lại mỗi lần chơi; Writing/Mediation hiện model answer xong vẫn cho sửa-nộp-lại tính `mastered`; sàn nghe của bài sát hạch **bị vô hiệu nếu học viên không bấm nút nghe** (`WeekTestSuite.tsx:490,808` — `deliverable` chỉ bật khi đã thực phát tiếng Anh).
4. **Động lực 40 tuần thiếu nền móng cơ bản nhất: bộ nhớ tiến độ.** Timeline 40 tuần và hub tuần **không hiển thị tuần/suite nào đã hoàn thành** (timeline chỉ đọc `weektest`); trang chủ **trắng trơn khi hết mục ôn** (`index.tsx:32`: `if (due === 0) return null;`); không reminder, không resume giữa phiên, rank 9 bậc không bao giờ cho biết ngưỡng kế tiếp. Với nhân viên theo ca, đây là công thức rơi rụng ở tuần 8–12.
5. **Lỗi tiếng Anh trong câu mẫu do máy sinh — ít về tỷ lệ nhưng có, và nằm ở vị trí "câu đúng".** BO-16: _"the extra chairs is ready for you."_ (sai hoà hợp S-V); cả 6 bộ phận tuần 16 có câu mẫu mở đầu bằng chữ thường (_"the sea view is very popular."_); FO-9: _"Some taxi, please."_, HK-9: _"Some toothbrush, please."_ (some + danh từ đếm được số ít — dạy sai đúng chỗ đang dạy mạo từ); HK-9 game: _"Is my slippers ready?"_; tuần 21 rule giải thích "quá khứ của take là took" trong khi câu mẫu 5/6 bộ phận không chứa "took", và SW trả lời câu _"Why did it take so long?"_ bằng _"It felt better than usual, because we were busy."_ — hỏi một đằng đáp một nẻo.

---

## Phạm vi đã kiểm (khai báo trung thực)

**Đọc trọn từng dòng (nguồn):**

- `docs/curriculum-level-matrix.md`, `docs/phase3-bank-contract.md`, `docs/phase4-bank-contract.md`.
- `src/lib/phases.ts` (239), `speaking-score.ts` (135), `week-access.ts` (176), `review.ts` (184), `academy-store.ts` (409).
- Spine đầy đủ: `phase0.ts` (1652), `phase1.ts` (1974), `phase2.ts` (2130), `phase3.ts` (2315), `phase4.ts` (3013).
- Lexicon P0–P2 đọc trọn từng entry (`phase1-lexicon.ts` 1019, `phase2-lexicon.ts` 1838).

**Đọc trọn bằng trích xuất có công cụ (100% nội dung học viên nhìn thấy, không đọc raw từng dòng TS):**

- `phase3-lexicon.ts` / `phase4-lexicon.ts`: toàn bộ 8×12 và 9×14 headword mỗi bộ phận được dump và rà từng slot; IPA/định nghĩa Việt kiểm theo mẫu (~40 entry).
- 19 tuần override trong `week-content.ts` (8288 dòng): **toàn bộ** vocabulary (word/IPA/nghĩa/context), grammar (rude/polite/rule), speaking (prompt/target/tip), reading (text + câu hỏi + đáp án), game (prompt + cả 3 lựa chọn), mediation/writing model — trích xuất qua `getWeekContent()` và đọc hết 1787 dòng kết quả. Phần không rà từng chữ: một số trường `rule`/`tip` tiếng Việt đã đọc đủ nhưng không đối chiếu chính tả từng dấu.
- Render thật: `bun scripts/dump-week.ts 3 9 16 24 32 39` (đủ 6 bộ phận) + tuần 21 bổ sung — đối chiếu khung × bank bằng chính câu đã render.

**Đọc qua trích xuất có kiểm chứng lại bằng grep (11 suite + 6 route):** hai lượt rà độc lập trên `src/components/suites/*` và `src/routes/*`; mọi trích dẫn dùng trong báo cáo này đã được tôi đối chiếu lại nguyên văn tại file:dòng trước khi đưa vào. Một kết luận của lượt rà (điểm listening bị tính thiếu câu cuối) **không qua được kiểm chứng** và đã bị loại.

**Baseline:** `bun run verify:content` PASS; `bun run qa:full` PASS (7 warning nhỏ). Gate xanh được dùng làm dữ kiện, không dùng làm kết luận chất lượng.

**Không kiểm:** `docs/academic-review-2026-08.md`, `docs/academic-review-backlog.md`, lịch sử git, file review-hotel-manager (theo điều khoản kiểm định). SE (bộ phận thứ 7 chưa mở) ngoài phạm vi.

### Giới hạn của kiểm định

Tôi **không đăng nhập được vào app đang chạy** (không có tài khoản). Mục "Động lực học dài hơi" được đánh giá trên code + luồng màn hình (routes, components, store), không phải trải nghiệm cầm máy; các nhận định về cảm giác người dùng là suy luận sư phạm từ cấu trúc UI, không phải quan sát người dùng thật. Tương tự, chất lượng TTS thực tế (giọng, ngắt nghỉ) không nghe được — chỉ đánh giá được tham số tốc độ.

---

## 1. Kiến trúc lộ trình & tính lũy tiến

### 1.1. Lũy tiến có thật, và đo được

Năm phase không chỉ lũy tiến trên giấy — `qa:full` T3 đo trên nội dung thật:

- Độ dài câu đích trung bình: `5.3 → 6.7 → 9.8 → 13.5 → 17.2 words (P0→P4)` — dưới trần khai báo (5/8/12/16/22) ở mọi phase.
- Từ vựng mới: `9.2 → 10.6 → 12.5 → 15.1 → 16.8 words/week` — nằm trong dải ma trận (8-10 … 16-18).
- Tốc độ nghe: `0.7 → 0.75 → 0.8 → 0.85 → 0.9` đúng mốc, tăng dần trong từng phase (`listeningRateForWeek`), **tất định** — tuần nào cũng nghe đúng một tốc độ, học viên tự cảm nhận được tiến bộ. Từ đơn chậm hơn câu 0.1 (`HEADWORD_RATE_OFFSET`) — đúng nguyên lý mẫu phát âm ≠ bài đo nghe.
- Thang chấm nói: 60% (P0–P1) → 65/70/75/80 trải đều P2 → 80% (P3–P4), kèm `orderRatio` 0.4→0.6 chống đọc từ rời rạc. Cái "vách 20 điểm ở tuần 15" của bản cũ đã được là phẳng — xử lý đúng.
- Ngưỡng mastery suite: 70→70→75→80→80, chính tả dung sai 1 ký tự kết thúc trước A2.1 (`dictationAllowsTypo`: `phase.index <= 1`) với lý do nghiệp vụ thuyết phục (từ A2.1 học viên viết lên phiếu thật).

Cấu trúc ngữ pháp cũng xếp bậc đúng trình tự acquisition: to be/There is (P1) → hiện tại tiếp diễn, must, quá khứ đơn (P2) → so sánh hơn, have to + because, điều kiện loại 1, quá khứ tiếp diễn, **hiện tại hoàn thành ở tuần 29 với giải thích chức năng xuất sắc** ("Your room has been cleaned" — thì của nghề khách sạn) → mệnh đề nhượng bộ although/however, "should never have happened", used to (P4). Không thấy nhảy cóc cấu trúc trong ngữ liệu sinh tự động.

### 1.2. Checkpoint: cơ chế tốt, "đề" mỏng

Cơ chế (đã tả ở Executive read) là điểm mạnh. Nhưng ở tư cách **kỳ thi chứng nhận band**, tôi phải nói thẳng về độ tin cậy:

- **20 câu trắc nghiệm + 5 câu nói cho một quyết định lên band CEFR là mỏng.** Vocab 8 câu, mỗi kỹ năng còn lại 4 câu — sai số chuẩn của điểm 4 câu là rất lớn; sàn 2/4 nghe hiểu có thể qua bằng đoán (xác suất đoán mù ≥2/4 với 3 lựa chọn ≈ 40%).
- **Đề trộn lại mỗi lượt + cooldown chỉ 20 phút** — chính comment trong `phases.ts:100-108` thừa nhận đây là "rate limit, not a barrier". Một học viên kiên trì có thể thi 10+ lượt/tuần đến khi trúng đề dễ. Sàn kỹ năng có giảm xác suất may mắn, nhưng "chứng nhận trình độ" thì chưa tới.
- **Sàn nghe vô hiệu hoá được:** `WeekTestSuite.tsx:490` `deliverable: construct === "listening" ? sawEnVoiceRef.current : true` và `:808` — cờ chỉ bật khi học viên đã thực bấm nghe. Ý định (không khoá học viên vì máy thiếu giọng) là đúng, nhưng hệ quả là **học viên yếu nghe cứ không bấm 🔊 thì sàn nghe được miễn**, đoán 0/4 vẫn qua nếu 16 câu còn lại kéo đủ 70%. Cần phân biệt "không phát được" với "không thèm phát".
- **Nửa nói cho gõ thay thế** được chấm y hệt (`WeekTestSuite.tsx:394` → cùng `utterancePassed`). Fail-open là đúng chủ trương, nhưng bản ghi **không phân biệt lượt nói và lượt gõ** — chứng chỉ "nói được" có thể là "gõ thuộc lòng được". Tối thiểu phải lưu cờ `typed` vào kết quả.

### 1.3. Spaced repetition: đúng nguyên lý

Hai tầng, cả hai đều đúng sách:

- **Tầng nội dung (`reviewWords`):** giãn cách mở rộng 1-tuần / 3-tuần / lát cắt quét toàn bộ phase trước (P1 quét hết P0 qua các tuần 7–13, P2 quét P0+P1, v.v.), quota tăng 30→40% theo phase, checkpoint quét cả phase. `verify:content` đo phân bố thật: phần lớn headword được gặp lại 2–4 lần; **60 headword không bao giờ được ôn** (`never recycled: 60 (e.g. FO:how may i help, FO:signature, FO:farewell…)`) — lỗ nhỏ, đáng vá.
- **Tầng scheduler (`review.ts`):** SM-2-lite, `INTERVAL_GROWTH = 2.2`, cap 60 ngày, fail → reset 1 ngày; seed khi **hoàn thành** suite chứ không đợi mastery ("the learner who scores below the bar needs spaced review most") — quyết định sư phạm đúng. Key theo slug chứ không theo index để sống sót qua chỉnh sửa nội dung — chín chắn về kỹ thuật.

Thiếu: phiên ôn cap 20 mục là hợp ca làm việc, nhưng khi hàng đợi rỗng thì **không có chế độ ôn trước hạn** — học viên có 15 phút rảnh mà app không có gì cho họ làm ngoài học tuần mới.

**Điểm mục 1: Kiến trúc & lũy tiến 8/10 · Cơ chế checkpoint 7/10 · Spaced repetition 8/10.**

---

## 2. Chuẩn đầu ra theo mốc — phán xử band

Ma trận tự nhận: `pre-A1 → B1 bậc đầu (B1.1) trong phạm vi nghiệp vụ khách sạn/resort (ESP)` với 160 giờ.

### Đối chiếu từng mốc

| Mốc     | Tuyên bố                     | Phán xử                                                                                    | Căn cứ                                                                                                                                                                                                                                              |
| ------- | ---------------------------- | ------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tuần 6  | pre-A1 → hoàn thành survival | **ĐẠT**                                                                                    | Chào/số/giờ/tiền/chunk lịch sự, câu ≤5 từ, đúng mô tả pre-A1; nội dung tuần 6 là củng cố thật (8 từ mới, tải là truy hồi).                                                                                                                          |
| Tuần 14 | A1                           | **ĐẠT**                                                                                    | Can-do A1 (giới thiệu, chỉ đường, yêu cầu đơn giản, điện thoại kịch bản) phủ đúng CEFR A1: "can interact in a simple way provided the other person talks slowly". Câu ≤8 từ/1 mệnh đề nhất quán.                                                    |
| Tuần 22 | A2.1                         | **ĐẠT**                                                                                    | Quy trình bước, offers, xác nhận thông tin, must/mustn't, quá khứ đơn để báo cáo — đúng "routine tasks requiring simple and direct exchange" của A2.                                                                                                |
| Tuần 30 | A2+                          | **ĐẠT có điều kiện**                                                                       | Chức năng (khuyên, giải thích phí, cam kết giờ, LAST 1–2, điều kiện loại 1, bàn giao ca với hiện tại hoàn thành) chạm trần A2+/B1−. Điều kiện: học viên phải thực sự nói được các câu này không nhìn mẫu — điều SpeakingSuite không ép (xem mục 3). |
| Tuần 40 | **B1.1**                     | **KHÔNG TRUNG THỰC ở mức tuyên bố** — trung thực hơn là "A2+ vững, tiếp xúc ngữ liệu B1.1" | Ba lý do dưới đây.                                                                                                                                                                                                                                  |

### Vì sao B1.1 là tuyên bố quá mức

1. **Descriptor B1 đòi sản sinh tự do; app chỉ đo bắt chước.** CEFR B1 nói: "can deal with most situations likely to arise… can produce simple connected text… can describe experiences and events, give reasons and explanations." Toàn bộ speaking 40 tuần là lặp lại một `targetResponse` cố định, chấm bằng word-match ≥80% + LCS ≥0.6. Tuần 39 mang tên "Open Role-play" nhưng bài nói vẫn là câu mẫu cố định — chính code thừa nhận (`speaking-score.ts:96-100`: _"That content does not exist: weeks 39 and 40 carry fixed `targetResponse` sentences like every other week"_). Học viên hoàn thành xuất sắc 40 tuần này có **vốn công thức B1** nhưng chưa từng bị bắt tự ghép một lượt lời mới — chính là ranh giới A2/B1.
2. **160 giờ.** Chuẩn tham chiếu giờ học tích luỹ (Cambridge/GLH): A2 ≈ 180–200h, B1 ≈ 350–400h. ESP phạm vi hẹp + dùng hằng ngày trong ca có thể chiết khấu, nhưng chiết khấu 50%+ để đi từ con số 0 tới B1.1 là ngoài mọi dữ liệu tôi biết. 160h là quỹ đạo pre-A1 → A2+ chắc chắn; B1.1 chỉ với học viên vượt trội có môi trường thực hành đậm.
3. **Kỳ thi cuối không phân biệt được A2+ và B1.1.** 20 MCQ (nhận biết) + 5 câu nói bắt chước chấm theo ngưỡng tuần nguồn. Không mục nào yêu cầu diễn giải, kể lại, hay xử lý một prompt chưa gặp — tức không mục nào _chỉ người B1 mới làm được_.

**Học viên qua checkpoint tuần N thật sự làm được gì?** Tuần 14: nghe hiểu và đáp các mẫu câu dịch vụ chậm rãi trong kịch bản quen. Tuần 22: chạy một SOP bằng tiếng Anh và báo cáo việc đã làm bằng quá khứ đơn. Tuần 30: xử lý phàn nàn theo khung LAST 1–2 và đề xuất phương án có điều kiện — **nếu tình huống nằm trong khung đã luyện**. Tuần 40: sở hữu bộ công thức thương lượng/khủng hoảng/hợp đồng phong phú và phát âm được chúng trôi chảy; khả năng ứng biến ngoài khung **chưa được dạy và chưa được đo**.

Điểm cộng công bằng: nhãn "trong phạm vi nghiệp vụ" được in đậm ngay dòng đầu ma trận, và trần từ vựng ~560–620 từ ESP là tự nhận thức đúng (không giả vờ 2.000 từ B1 đại trà). Vấn đề không phải gian dối — mà là **nhãn band cuối vượt quá thứ phép đo chứng nhận được**.

**Điểm mục 2: Trung thực band CEFR 6/10** (pre-A1→A2+ trung thực và có cơ chế bảo vệ; B1.1 là tuyên bố tiếp thị, chưa phải kết quả khảo thí).

---

## 3. Bốn kỹ năng + từ vựng/ngữ pháp

### 3.1. Độ phủ

| Kỹ năng   | Phủ                                                                                                             | Nhận xét                                                        |
| --------- | --------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| Nghe      | Mọi tuần (ListeningSuite: audio-only chọn đáp + cloze gõ theo audio; TTS theo thang tốc độ; tối đa 3 lượt nghe) | Phủ tốt. Cloze ưu tiên blank từ vựng tuần — thiết kế đúng.      |
| Nói       | Mọi tuần (SpeakingSuite) + nửa nói checkpoint                                                                   | Phủ rộng nhưng **validity thấp** — xem 3.2.                     |
| Đọc       | Mọi tuần (đoạn + MCQ; overrides có văn bản nghề thật: SOP, voucher Agoda, BEO, rooming list)                    | Văn bản overrides đạt chất lượng authentic-material hiếm có.    |
| Viết      | **1 tuần/khoá** (tuần 33, trả lời review)                                                                       | Lỗ hổng phủ. 40 tuần chỉ một nhiệm vụ viết chấm được.           |
| Mediation | **1 tuần/khoá** (tuần 26, Việt→Anh truyền đạt tin của đồng nghiệp)                                              | Đúng kỹ năng B1 thật nhất của khách sạn VN — nhưng chỉ một lần. |

### 3.2. Validity từng loại bài — đo cái gì thật?

- **VocabSuite:** MCQ hai chiều EN↔VI (nhận biết) + tối đa 3 dictation (sản sinh chính tả). Cân bằng chấp nhận được ở A1–A2. Đáp án đúng hiện ra khi sai (`Đáp án đúng: ${q.word}`) và **retake không giới hạn với đề trộn lại** → `mastered` đạt được bằng kiên trì, không nhất thiết bằng nhớ.
- **GrammarSuite:** ghép chip **có sẵn toàn bộ từ** — đo trật tự cú pháp, không đo truy xuất từ vựng; vòng "memory" gõ lại là phần sản sinh duy nhất và là thiết kế tốt. Nhưng: nút "Kiểm tra câu" **không giới hạn lượt** trong cùng câu (xếp lại đến khi đúng vẫn tính "correct"), và thưởng sao theo `round` (`GrammarSuite.tsx:86` `const puzzleIdx = round % puzzles.length;`, `:154` `if (ok && awardedRoundRef.current !== round && !revealed)`) → +4⭐ lặp vô hạn khi đi quá vòng.
- **ReadingSuite:** nhận biết thuần; chuyển tab qua lại reset `submitted` trong khi `bestPctRef` giữ điểm cao nhất → retry không giới hạn sau khi đã thấy đáp án + giải thích.
- **ListeningSuite:** phần `choose` là nghe thật (câu khách **chỉ phát audio, không hiện chữ**) — validity tốt; cloze chấm **theo từng chỗ trống** (sửa đúng lỗi all-or-nothing cũ). Sai thì in nguyên câu — hợp lý cho luyện, làm mềm cho "đo".
- **SpeakingSuite:** **đây là chỗ tôi phê nặng nhất.** Câu mẫu hiển thị nguyên văn ngay dưới nút mic (`SpeakingSuite.tsx:209`: `<span className="text-foreground/80">{scenario.target}</span>`) và còn có nút phát mẫu (`:170`). Bài "nói" hằng tuần vì thế là **read-aloud** — luyện phát âm/độ trôi, không luyện truy xuất. Read-aloud có giá trị ở pre-A1/A1; giữ nguyên dạng này đến tuần 40 thì kỹ năng được chứng nhận là "đọc thành tiếng câu B1", không phải "nói B1". Trình duyệt không có Speech API thì **chặn cứng, không có đường gõ** (`:63`) — trái với chính triết lý fail-open của checkpoint. Cũng lưu ý `fluency_score` bị floor 50 kể cả bản ghi im lặng (`:87`).
- **WeekTestSuite (nửa nói):** phép đo nói **sạch duy nhất** của app — giấu mẫu ("Câu mẫu sẽ hiện ở phần kết quả, sau khi bạn trả lời hết — để đây là bài kiểm tra nói, không phải đọc lại." — `WeekTestSuite.tsx:401-404`), tối đa 2 lượt/câu, chấm theo tuần nguồn. Đúng chuẩn. (Trừ điểm typed-fallback không ghi dấu, đã nêu ở mục 1.2.)
- **Writing/MediationSuite:** sản sinh tự do thật, nhưng chấm bằng **phủ ý theo keyword** (`writing-score.ts:75`), không chấm ngữ pháp/register/mạch lạc; nộp xong hiện model answer + checklist ý trúng/trượt, **giữ nguyên draft cho sửa-nộp-lại** → `mastered` của hai suite này chứng nhận việc "đã nhìn model và chép ý", không chứng nhận viết. (Comment trong code bảo vệ đây là chủ đích luyện tập — tôi chấp nhận cho _practice_, không chấp nhận cho _mastered flag_ nằm cùng một trường dữ liệu với các suite khác.)
- **ArcadeSuite:** phản xạ nhận biết có đồng hồ — vai trò giải trí chính đáng, nhưng bấm sai **không mất gì** và sao **không khấu trừ khi chơi lại** → đây là máy in sao. `qa:full` T6 tự đo: _"967 game rounds; 29% have a markedly longest correct option"_ — gần 1/3 số round đoán được bằng mẹo "chọn câu dài nhất". Với game luyện thì chấp nhận được; với dữ liệu `mastered` thì không.
- **BoardGameSuite:** 151 dòng code chết, không route nào gọi, tự cấp +3⭐ lặp vô hạn nếu được nối — nên xoá.

**Cân bằng nhận biết/sản sinh toàn cục:** trong một tuần điển hình (vocab + grammar + speaking + listening + reading + arcade), các điểm sản sinh thật là 3 dictation + memory-round grammar + cloze nghe. Mọi thứ còn lại là nhận biết hoặc đọc-nhại. Tỷ trọng này đúng cho P0–P1, **ngược yêu cầu cho P3–P4** — nơi CEFR đòi sản sinh là bằng chứng chính.

### 3.3. Tải nhận thức theo tuần

Nhịp 4 bài/tuần × (2–5 từ vựng + 2–3 grammar + 1–2 speaking + 1 reading + 1–2 game) là vừa cho 1 giờ/bài. Điểm cộng lớn: các tuần checkpoint (6, 14, 22, 30, 40) **chủ động giảm từ mới** ("New vocabulary is deliberately light — the load here is recall, not intake") — đúng nguyên lý consolidation mà đa số giáo trình bỏ qua. Bước nhảy tải P1→P2 (10→13 từ, speaking 4→8, đọc dài gấp rưỡi) từng là vách nay đã có thang chấm ramp đỡ. Không thấy tuần nào quá tải bất thường trong ngữ liệu sinh; các override tuần 37–38 có mật độ thuật ngữ cao (BEO, RFP, allotment) nhưng đứng ở B1.1 là chấp nhận được.

### 3.4. Phù hợp người học Việt Nam

Đây là mặt mạnh nhất nhì của giáo trình:

- Lỗi chuyển di được dạy **phòng ngừa có hệ thống**: copula ("Today Monday." → "Today is Monday."), số nhiều -s ("Twenty dollar." → "It is twenty dollars."), mạo từ (helper `art`, và lời rule nói thẳng: "Lưu ý mạo từ A/AN trước danh từ đếm được — tiếng Việt không có mạo từ nên rất dễ quên"), trật tự từ hỏi ("You are from where?" → "Where are you from?"), "same same", "sorry sorry", phủ định "I no know".
- Phát âm nhắm đúng điểm yếu Việt: tip FO-17 "Remember to pronounce the ending sound in 'good morning' and 'welcome'", headword phát chậm hơn để nghe rõ phụ âm cuối, tip linking ("che-kyer", "sen-di-tuh-you").
- Bối cảnh Việt thật: tiền đồng, Tet blackout dates, phở/phin/bạc sỉu, khách sạn ven biển có cờ đỏ, số phòng đọc kiểu "two-oh-five" và normalize số trong chấm nói (`digitToWords`) để ASR không đánh trượt người đọc số đúng.
- Song ngữ đúng liều: hướng dẫn/giải thích tiếng Việt, ngữ liệu tiếng Anh — đúng cho A0–A2.

Trừ điểm: trộn BrE/AmE không tuyên bố ("Lift (Anh–Anh; Mỹ: elevator)" ở P0 nhưng FO-17 và BO P1 dạy "Elevator"; spine tuần 34 viết "It is our honour…" trong khi GR-34 override dạy "Honor /ˈɒnə/"); một số rule lệch ví dụ (tuần 21 đã nêu).

**Điểm mục 3: Độ phủ & validity 6/10 · Tải nhận thức 8/10 · Phù hợp học viên Việt 8.5/10.**

---

## 4. Soi chất lượng nội dung

Tổng quan số liệu: 9.761 câu sinh tự động qua linter cấu trúc, 27.848 trường văn bản qua hygiene — mật độ lỗi _thấp_. Nhưng "lỗi trong câu mẫu" của một app dạy tiếng là lỗi bị nhân bản vào trí nhớ học viên, nên dưới đây tôi liệt kê đủ, kèm nguyên văn.

### 4.1. Lỗi ngữ pháp / cách dùng trong câu mẫu (generated)

| Vị trí                                | Nguyên văn                                                                                                                                                    | Lỗi                                                                                                                                                               |
| ------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BO-16 (vocab ctx + speak target)      | "the extra chairs is ready for you." / "Certainly. the extra chairs will be ready shortly."                                                                   | "chairs is" — sai hoà hợp S-V; frame số ít nhận danh từ số nhiều.                                                                                                 |
| FO/FB/HK/SW/GR/BO-16 (nhiều câu)      | "the sea view is very popular." · "the welcome drink is free for you, madam." · "No, madam. the welcome drink is free for our guests."                        | Câu mở đầu bằng chữ thường — helper `wt()` không viết hoa đầu câu; xuất hiện trong vocab context, grammar polite và speaking target của **cả 6 bộ phận** tuần 16. |
| FB-16                                 | "The price includes table service and service."                                                                                                               | Lặp "service" — frame `+ " and service"` đụng bank word chứa sẵn "service".                                                                                       |
| FO-9 / HK-9 / SW-9 / GR-9 (vocab ctx) | "Some taxi, please." · "Some toothbrush, please." · "Some sun bed, please." · "Some balloon, please."                                                         | "some + danh từ đếm được số ít" — sai, và sai đúng ở tuần đang drill mạo từ/lượng từ. FB "Some glass, please." cũng lệch nghĩa (glass-ly đếm được).               |
| HK-9 (game prompt)                    | "Is my slippers ready?"                                                                                                                                       | Sai hoà hợp với danh từ số nhiều — đây là lời khách, học viên đọc như mẫu.                                                                                        |
| Tuần 21, cả 6 dep (grammar rule)      | rude "It take long time." → polite render vd FO: "It started later than usual, sir." — rule: "Động từ 'take' ở quá khứ là 'took'; so sánh dùng 'than usual'." | Rule giảng "took" nhưng câu mẫu 5/6 bộ phận không chứa "took" (chỉ HK "It took longer than usual" khớp).                                                          |
| SW-21 / GR-21 (speaking)              | guest: "Why did it take so long?" → SW: "It felt better than usual, because we were busy." / GR: "It went better than usual, because we were busy."           | Hỏi về thời lượng, đáp về chất lượng — cặp thoại vô nghĩa (`phase2.ts:1682-1685` × bank `reports[6]`).                                                            |
| BO-39 (speak target)                  | "Let me begin with the request for proposal (rfp), sir."                                                                                                      | "(rfp)" bị lowercase — `lo()` chỉ tha acronym đứng một mình.                                                                                                      |

### 4.2. Lỗi ngữ nghĩa frame × bank (generated) — "đúng ngữ pháp, vô nghĩa nghề"

| Vị trí                             | Nguyên văn                                                                                                                         | Vấn đề                                                                                                                                                                                                                                                       |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| FO-32 (vocab ctx + grammar polite) | "Would you like the same feather allergy as last time, sir?"                                                                       | Mời khách nhận lại… chứng dị ứng lông vũ. Slot `preferences[5]` rơi vào frame "same … as last time".                                                                                                                                                         |
| GR-32                              | "Would you like the same dietary restriction as last time, sir?"                                                                   | Cùng lỗi — mời lại "hạn chế ăn uống".                                                                                                                                                                                                                        |
| BO-32                              | "Based on your preferred billing cycle, may I suggest something that suits you better?"                                            | Đây **nguyên văn là ví dụ lỗi trong bảng semantic-class của `docs/phase4-bank-contract.md`** ("Fails as: a back-office setting — 'Based on your preferred billing cycle…'") — hợp đồng cấm nhưng bank BO vẫn chứa từ này ở slot 0 và render đúng câu bị cấm. |
| GR-39 lesson 4                     | "Open with the typhoon, not with small talk." · "Let me begin with the typhoon, sir." · "Be ready to explain the ambulance."       | Frame pitch tuần 38 nhận từ vựng của override GR-37/38 (Typhoon, Weather warning, Ambulance, Doctor on call) qua cơ chế `taughtIn()` → mở bài thuyết trình bằng… cơn bão.                                                                                    |
| HK-39 lesson 4                     | "Be ready to explain the insect." · "Do not skip past the mosquito."                                                               | Cùng cơ chế — HK-37 dạy Insect/Mosquito, frame pitch biến chúng thành mục thuyết trình.                                                                                                                                                                      |
| SW-39 lesson 4                     | "Be ready to explain the female therapist." · "Do not skip past the male therapist."                                               | Người bị đặt vào slot "hạng mục cần giải thích trong pitch" — đọc rất kỳ. `taughtIn()` sửa được lỗi "dạy từ chưa học" nhưng tạo lỗi "khung không hợp từ".                                                                                                    |
| SW-24                              | "We have to apply the health declaration form because it is hotel policy." · "The cancellation window appears on your final bill." | Form không "apply to every booking", "cancellation window" không nằm trên hoá đơn — slot `policies` đòi "a charge or a rule", bank SW/GR nhét document/điều kiện. GR-24 tương tự: "We apply the consent form to every booking."                              |
| GR bank P4 `emergencies`           | "Lost passport" và "Lost passport report" cùng slot                                                                                | Trùng khái niệm trong một slot 14 từ — vi phạm tinh thần rule 5 của contract ("No duplicates … not within the new bank itself"); gate chỉ bắt trùng chuỗi tuyệt đối.                                                                                         |

### 4.3. Register & tự nhiên

- **Register 5 sao trong ngữ liệu mẫu: đạt.** Các công thức trụ cột đều chuẩn ngành: "I'm afraid…", "Would you mind…", "May I…", "Allow me to…", "It has been noted…", "on behalf of the entire team", "The card did not go through" (thay vì "declined" — kèm cả quy trình che thể diện khách, FO-17). Người viết overrides hiểu nghề thật — chi tiết như "Never clear a plate while a guest is still using cutlery on it" (FB-15), "Never ask a guest about their bank or their balance" (FO-17), "ask the clinic for a medical report IN ENGLISH — without it the guest's claim will be refused at home" (GR-37) là thứ chỉ người từng làm vận hành mới viết ra.
- **"Textbook English" tồn tại chủ yếu ở spine generated**, dạng câu khung lặp ("Everyone involved knows about the …", "The {w} is what makes this place special") — chấp nhận được vì đó là substitution drill có chủ đích, nhưng qua tuần 31–38 sự lặp khung 4 bài/tuần × cùng 2 frame bắt đầu đơn điệu so với overrides đứng cạnh.
- Điểm son tự nhiên: distractor game của overrides là **lỗi dịch vụ thật** chứ không phải tiếng Anh bồi ("You should have put the DND sign up.", "Our staff do not take things, sir.", "Orchids look nicer anyway, don't you think?") — dạy phán đoán tình huống, không chỉ ngôn ngữ.
- Nhất quán chính tả: trộn "Honor" (GR-34 override, AmE) với "honour" (spine tuần 34, BrE); "Elevator" (FO-17, BO) với "Lift" (P0 dạy là chuẩn Anh-Anh). Cần một quyết định biên tập một lần.

### 4.4. IPA & nghĩa Việt (kiểm mẫu ~40 entry)

Không phát hiện lỗi IPA sai hệ thống (British-leaning nhất quán: /ˈɒfə/, /kɑːd/, /ˈsɜːtʃɑːdʒ/); nghĩa Việt chính xác và gọn. Lỗi nhỏ đã ghi nhận bởi qa: 6 bộ phận tuần 2 context của "Zero" không chứa headword ("Room two-oh-five.") — chấp nhận được về sư phạm (0 đọc là "oh" chính là bài học) nhưng máy soát coi là warning đúng.

**Điểm mục 4: Nội dung sinh tự động 6/10 (cơ chế thông minh, tỷ lệ lỗi thấp trên tổng 9.761 câu, nhưng lỗi đang nằm ở "câu được dạy là đúng" và P4 rò rỉ ngữ nghĩa) · Nội dung soạn tay 9/10 (chuẩn xuất bản; trừ 1 vì vài chi tiết nhất quán BrE/AmE và các seam với spine ở tuần 39).**

---

## 5. Động lực học dài hơi (mục chấm riêng)

_(Đánh giá trên code + luồng màn hình; không có trải nghiệm cầm máy — xem Giới hạn.)_

### Những gì đang có

- ⭐ sao + 🔥 chuỗi ngày + rank 9 bậc (Trainee → General Manager, 3600⭐ ~ cuối lộ trình) hiển thị thường trực trên nav; chuỗi tính theo **ngày có học thật** (`markLearnedToday` khi hoàn thành suite hoặc xong phiên ôn), không tính mở app suông, và **không reset khi điểm dưới chuẩn** — comment trong `academy-store.ts` nói rõ lý do giữ học viên yếu: "Punishing an effortful sub-mastery day with a streak reset churns exactly the weak, low-confidence learners the streak is meant to keep." Đây là các quyết định giữ chân đúng.
- Banner ôn tập trên trang chủ khi có mục đến hạn; phiên ôn cap 20 mục (~5–10 phút) hợp ca làm việc; màn kết phiên có điểm + giải thích lịch ôn.
- Cooldown thi lại 20 phút được chọn ngắn **vì** người học theo ca (`phases.ts:107-108`).
- Sao ghi bù khi offline (`flushPendingStars`) — có nghĩ tới mạng khách sạn.
- Appraisal: 4 đồng hồ năng lực + radar — có một "bảng thành tích cá nhân" để ngắm.

### Những gì thiếu — và đây là chỗ app sẽ mất học viên

1. **Không có bộ nhớ hoàn thành.** Timeline 40 tuần chỉ phân biệt khoá/mở (đọc mỗi `weektest`), **không đánh dấu tuần đã học xong**; hub tuần liệt kê 6–9 cửa suite **không có tick/điểm/trạng thái đã làm**. Tuần 3 học xong 100% trông y hệt tuần 5 chưa đụng. Trên hành trình 40 tuần, không nhìn thấy dấu chân của chính mình là lý do bỏ cuộc số một.
2. **Không có "học tiếp từ chỗ dừng".** Không màn hình nào có nút resume; học viên phải tự nhớ mình đang ở tuần mấy, suite nào. Trang chủ khi hết mục ôn thì banner biến mất hoàn toàn (`index.tsx:32` `if (due === 0) return null;`) — ngày "ngoan" nhất lại là ngày app trống trơn nhất.
3. **Không có bất kỳ cơ chế nhắc nào.** Không PWA/manifest/service worker/push/email trong repo. Chuỗi 🔥 và lịch SM-2 đều phụ thuộc học viên tự nhớ mở app — với nhân viên ca xoay, spacing effect sẽ chết vì không ai gõ cửa đúng "thời điểm dễ quên nhất" mà chính copy của app quảng cáo.
4. **Mất dữ liệu im lặng giữa ca:** kết quả ôn ghi fire-and-forget (`applyReviewResult(...).catch(() => {})`) — rớt mạng là mất, mai hiện lại từ đầu, không báo lỗi; refresh giữa phiên ôn mất luôn tiến trình phiên (state React thuần).
5. **Đích gần vô hình:** rank có 9 bậc nhưng không nơi nào hiện "còn X⭐ tới Supervisor"; message khoá tuần trên timeline nói "Mở sau khi qua sát hạch tuần {N}" với N là checkpoint _kế tiếp_ — học viên phase 0 nhìn tuần 33 tưởng chỉ cách một bài thi (thực tế là bốn).
6. Linh tinh nhưng có hại: empty-state của timeline trỏ member vào "Visit Admin Lounge →" (`department.$dep.tsx:123`); cascade animation 40 hàng ~2 giây không có anchor nhảy tới tuần hiện tại; metrics khởi tạo 70/70/50/70 — dashboard mới tạo đã "đẹp sẵn", chỉ có thể tụt, ngược tâm lý tiến bộ.

### Đề xuất cụ thể, khả thi (xếp theo tác động/chi phí)

1. **Completion state (2–3 ngày công):** đọc `lesson_progress` cho mọi suite (bảng đã có sẵn dữ liệu!) → tick + % trên từng cửa suite ở hub, vòng tiến độ trên từng tuần ở timeline, thanh "Tuần 9/40 · Phase 2" trên đầu trang bộ phận. Không cần schema mới.
2. **Nút "Học tiếp" trên trang chủ (1 ngày):** row `lesson_progress` mới nhất → "Tiếp tục: FO tuần 9 · Nghe hiểu". Trang chủ khi `due === 0` hiển thị card này thay vì null.
3. **Nhắc theo lịch SM-2 (3–5 ngày):** PWA + Web Push khi có mục đến hạn (số lượng + "5 phút là xong"); fallback email digest 2 lần/tuần qua Supabase cron. Với ca xoay, cho học viên tự chọn khung giờ nhắc ("sau ca sáng / trước ca tối").
4. **Đích gần:** hiện "còn 120⭐ tới Senior Staff" dưới rank; milestone confetti mỗi khi hoàn thành 1 phase (đã có fireworks component).
5. **Chống mất dữ liệu:** retry queue cho `applyReviewResult` (mirror cơ chế `pendingStars` đã có); persist phiên ôn vào localStorage để refresh không mất.
6. **Ôn trước hạn:** khi hàng đợi rỗng, offer "Ôn nhanh 10 mục sắp đến hạn" — giữ thói quen ngày không có gì đến hạn.
7. Sửa hai chữ: message khoá tuần xa nên nói "cần qua {k} bài sát hạch nữa"; bỏ link Admin Lounge khỏi màn member.

**Điểm mục 5: Động lực học dài hơi 5/10** — nền kinh tế sao/chuỗi/rank tồn tại và vài quyết định giữ chân rất đúng, nhưng thiếu cùng lúc bộ nhớ tiến độ, resume và reminder — ba trụ tối thiểu của retention 40 tuần; kinh tế sao lại đang lạm phát vì các exploit ở mục 3 nên giá trị của ⭐ sẽ tự xói mòn với chính học viên chăm.

---

## 6. Bảng điểm & verdict

Thang neo: 9–10 xuất bản thương mại · 7–8 dùng được, sửa nhỏ · 5–6 lỗ hổng rõ, sửa trước khi mở rộng · 3–4 sai chuẩn đáng kể · ≤2 phản tác dụng.

| #   | Tiêu chí                               | Điểm    | Lập luận một dòng                                                                                                                                                                                                                              |
| --- | -------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Kiến trúc lộ trình & tính lũy tiến     | **8**   | Lũy tiến thật và đo được bằng gate (câu 5.3→17.2 từ, nghe 0.70→0.90, chấm nói 60→80); trừ vì độ mỏng của đề checkpoint so với vai trò "chứng nhận band".                                                                                       |
| 2   | Cơ chế checkpoint & khoá tuần          | **7**   | AND viết+nói, sàn kỹ năng, mastered sticky, fail-open thiết bị là thiết kế khảo thí nghiêm túc; trừ vì 20 câu + cooldown 20' + sàn nghe né được bằng không bấm nghe + typed-fallback không ghi dấu.                                            |
| 3   | Trung thực band CEFR                   | **6**   | pre-A1→A2+ trung thực; B1.1 cuối khoá vượt quá phép đo (role-play mở không tồn tại, 160h GLH, thi cuối đo nhận biết + bắt chước).                                                                                                              |
| 4   | Độ phủ 4 kỹ năng & validity bài tập    | **6**   | Nghe/đọc/từ vựng ổn; Speaking hằng tuần là read-aloud với đáp án hiển thị; viết + mediation mỗi thứ 1 tuần/khoá; nhiều suite brute-force được mastery.                                                                                         |
| 5   | Spaced repetition & ôn tập             | **8**   | Hai tầng đúng nguyên lý (expanding intervals + SM-2-lite, seed khi hoàn thành); trừ vì 60 từ mồ côi không bao giờ được ôn và không có chế độ ôn trước hạn.                                                                                     |
| 6   | Chất lượng nội dung sinh tự động       | **6**   | Cơ chế frame×bank thông minh, mật độ lỗi thấp trên 9.761 câu, nhưng lỗi nằm ở "câu mẫu được dạy là đúng" (chairs is / Some taxi / chữ thường đầu câu) và P4 rò rỉ ngữ nghĩa (feather allergy / typhoon / billing cycle bị chính contract cấm). |
| 7   | Chất lượng nội dung soạn tay (19 tuần) | **9**   | Chuẩn xuất bản: tiếng Anh nghề thật, SOP thật, distractor là lỗi dịch vụ thật; trừ nhẹ vì BrE/AmE chưa nhất quán và seam với spine ở tuần 39.                                                                                                  |
| 8   | Phù hợp người học Việt Nam             | **8.5** | L1-interference là trục thiết kế xuyên suốt, bối cảnh Việt thật, số đọc kiểu khách sạn được normalize khi chấm nói; trừ vì vài rule lệch ví dụ.                                                                                                |
| 9   | Động lực học dài hơi                   | **5**   | Có sao/chuỗi/rank và vài quyết định giữ chân đúng, nhưng không completion memory, không resume, không reminder — ba trụ retention 40 tuần đều thiếu.                                                                                           |

### Verdict tổng: **6.9/10 — "Dùng được cho triển khai có kèm cặp; phải sửa trước khi tự nhận là khoá chứng nhận B1.1 tự học."**

Nói bằng ngôn ngữ của thang neo: phần **cấu trúc chương trình và nội dung soạn tay đã ở mức 8–9**; phần **đo lường sản sinh, nhãn band cuối khoá và động lực dài hơi đang ở mức 5–6** — tức là có lỗ hổng rõ, phải sửa trước khi mở rộng (mở SE, tuyển học viên trả phí, hay in "B1.1" lên bất kỳ chứng nhận nào). Không có thành phần nào phản tác dụng với người học; tệ nhất là vô hại-nhưng-ảo (mastered farm được, band label lạc quan).

### Khuyến nghị theo ưu tiên

**P0 — trước khi trao bất kỳ "chứng nhận" nào:**

1. Đổi nhãn đầu ra tuần 40 thành "A2+ (B1.1 exposure)" **hoặc** xây phép đo B1 thật: nửa nói checkpoint cuối thêm 2 prompt chưa từng gặp chấm bằng idea-coverage (bộ chấm riêng như chính `speaking-score.ts` đã tự dặn), + 1 bài viết bắt buộc.
2. Ẩn `targetResponse` trong SpeakingSuite từ P2 trở đi (giữ hiển thị ở P0–P1 như scaffold), thêm đường gõ fallback như checkpoint; ghi cờ `typed` vào kết quả nửa nói.
3. Vá 3 exploit dữ liệu: Grammar thưởng sao theo `puzzleIdx`; Arcade trừ lượt/khoá round khi bấm sai + không tái thưởng sao khi chơi lại; Writing/Mediation không ghi `mastered` cho lượt nộp sau khi model answer đã hiển thị (hoặc ghi `mastered` riêng nhánh "assisted").
4. `deliverable` của khối nghe: phân biệt "không phát được" (probe engine) với "không bấm nghe" (coi là deliverable, mất điểm bình thường).

**P1 — chất lượng câu mẫu (một đợt sửa bank/frame):** 5. Sửa 8 lỗi generated ở bảng 4.1 (viết hoa đầu câu trong `wt()`; `art`-hoá frame "Some {w}"; số nhiều cho frame "Is my {w} ready?"; bank BO-16 offers slot 7 phải số ít; rule tuần 21 viết lại theo bank; hoán slot `reports[6]` của SW/GR sang từ chỉ thời lượng). 6. Sửa rò rỉ ngữ nghĩa P4: thêm cột semantic-class cho frame "same … as last time" (loại allergy/restriction); tuần 39 lesson 4 khi tuần 37/38 là override thì lấy frame trung tính ("Let me begin with the most important point") thay vì nhét từ override vào frame pitch; thay "Preferred billing cycle" và cặp "Lost passport/Lost passport report" đúng theo contract đã tự viết. 7. Chốt một chuẩn chính tả (khuyến nghị BrE theo IPA hiện có) và quét "honor/elevator/check".

**P2 — retention:**
8–13. Sáu đề xuất động lực ở mục 5 theo đúng thứ tự (completion state → resume → reminder → đích gần → chống mất dữ liệu → ôn trước hạn).

**P3 — dọn dẹp:** xoá `BoardGameSuite` (code chết tự cấp sao); bổ sung 60 từ mồ côi vào lịch ôn; cho 4 câu nghe của checkpoint quyền phát lại giới hạn (hiện phụ thuộc một nút bấm tự nguyện cũng là mấu chốt của lỗ hổng deliverable).

---

_Mọi trích dẫn trong báo cáo được copy nguyên văn từ nguồn tại thời điểm kiểm định (2026-08-03): render qua `scripts/dump-week.ts`, trích xuất `getWeekContent()` cho 19 tuần override, và file nguồn tại các vị trí đã dẫn. Các trích dẫn suite/route đã được đối chiếu lại bằng grep trước khi đưa vào báo cáo._
