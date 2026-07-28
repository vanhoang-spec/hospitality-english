# Ma trận Level 40 tuần — Embassy Hospitality English

> **Tài liệu chuẩn (canonical spec).** Mọi content viết mới cho bất kỳ tuần nào, bộ phận nào
> đều phải tuân theo ma trận này. Thay đổi ma trận = sửa file này trước, viết content sau.

## Nguyên tắc nền

- **Lộ trình:** pre-A1 → B1 bậc đầu (B1.1) **trong phạm vi nghiệp vụ khách sạn/resort** (ESP),
  không phải B1 tổng quát. 40 tuần × ~4h = ~160 giờ hướng dẫn; khả thi vì phạm vi hẹp,
  công thức lặp cao, và học viên dùng tiếng Anh hằng ngày trong ca làm.
- **Áp dụng đồng loạt cho cả 6 bộ phận** (FO, FB, HK, SW, GR, BO): cùng một *xương sống
  ngôn ngữ* (ngữ pháp, chức năng, độ khó) theo tuần — chỉ khác *chủ đề nghiệp vụ* và bộ từ vựng.
- **Speaking là đầu ra trung tâm.** Mục tiêu của app là cải thiện *giao tiếp*; mọi tuần phải
  có can-do statement dạng "nói được…".
- **Ôn xoáy vòng bắt buộc:** từ tuần 2 trở đi, mỗi tuần phải khai báo `reviewWords`
  (từ vựng tuần trước quay lại trong quiz/cloze) theo quota của phase.
- **Không nhảy cóc:** một tuần chỉ được dùng ngữ pháp/cấu trúc đã dạy ở tuần đó trở về trước.
  Câu mẫu (targetResponse) vượt trần độ dài của phase = lỗi content, phải viết lại.

---

## Tổng quan 5 phase

| Phase | Tuần | Band CEFR | Giờ tích lũy | Tên gọi |
|---|---|---|---|---|
| 0 | 1–6 | pre-A1 | 24h | Nền tảng sống còn (Survival Foundation) |
| 1 | 7–14 | A1 | 56h | Giao tiếp câu đơn (First Sentences) |
| 2 | 15–22 | A2.1 | 88h | Nghiệp vụ chuẩn (Core SOP Service) |
| 3 | 23–30 | A2.2 / A2+ | 120h | Dịch vụ chủ động (Proactive Service) |
| 4 | 31–40 | B1.1 | 160h | Xử lý & thuyết phục (Recovery & Persuasion) |

**Tuần checkpoint (weektest):** 6, 14, 22, 30, 40 — tuần củng cố: ≥50% ngữ liệu tái sử dụng
+ bài kiểm tra tổng hợp phase (suite `weektest`). Qua checkpoint mới mở phase kế tiếp —
**week-gating đã bật** (xem mục "Week-gating" bên dưới).

### Week-gating (đã triển khai)

- Ngưỡng đạt: **`CHECKPOINT_PASS_PCT` = 70%**, khai báo một chỗ duy nhất ở
  `src/lib/phases.ts`. Cùng một con số quyết định ba việc — màn hình thi có chúc mừng hay
  không, bản ghi `lesson_progress` có `mastered = true` hay không, và phase sau có mở hay
  không. Nếu muốn nâng lên 80% (con số bản thảo đầu của tài liệu này), sửa hằng số đó là đủ,
  nhưng đó là **quyết định học vụ**: học viên đã đạt 70–79% trước đó vẫn giữ quyền học tiếp
  vì gate đọc cờ `mastered` đã ghi, còn người thi lại sẽ chịu ngưỡng mới.
- Phạm vi: **theo từng bộ phận**. Qua checkpoint FO không mở phase cho HK — `lesson_progress`
  cũng key theo bộ phận vì lý do đó.
- Quy tắc mở: qua checkpoint của phase *i* thì mở phase *i+1*. Mốc mở lấy theo checkpoint
  **xa nhất** đã đạt, không đòi chuỗi liên tục từ phase 0 — học viên đã học tới tuần 22 từ
  thời chưa có gate không bị khóa lại phần đã học. Vẫn không thể nhảy cóc: mỗi phase chỉ tới
  được bằng bài thi ngay trước nó.
- Chặn ở: timeline bộ phận, hub tuần, URL suite (`/learn/...`) và Sổ tay tuần — bốn đường vào
  content của một tuần.
- Miễn gate: `org_admin` / `super_admin` (cần đọc mọi tuần để rà content và kèm học viên).
- Bản chất là **điều tiết nhịp học, không phải kiểm soát truy cập**: content không phải bí
  mật và học viên vốn đã tự ghi được `lesson_progress` (mọi suite đều ghi qua client), nên
  gate đặt ở UI và cố ý không nhân bản vào RLS.

---

## Thông số kỹ thuật content theo phase

| Thông số | P0 (1–6) | P1 (7–14) | P2 (15–22) | P3 (23–30) | P4 (31–40) |
|---|---|---|---|---|---|
| Từ vựng mới / tuần | 8–10 | 10–12 | 12–16 | 14–16 | 16–18 |
| Trần độ dài câu đích (từ) | 5 | 8 | 12 | 16 | 22 |
| Số mệnh đề tối đa / câu | 1 | 1 | 1–2 | 2 | 2–3 |
| `reviewWords` tối thiểu / tuần | — (từ W2: 3) | 30% | 30% | 35% | 40% |
| Tốc độ listening (TTS rate) | 0.7, câu đơn lẻ | 0.75 | 0.8 | 0.85–0.9 | 0.9, đa lượt lời |
| Speaking items / tuần | 4 (chunk nhắc lại) | 4 | 4–6 | 6 | 6–8 |
| Dạng speaking | nghe–nhắc lại chunk | trả lời 1 lượt | hội thoại 2 lượt | hội thoại 3–4 lượt | role-play mở |

Tổng từ vựng chủ động toàn lộ trình: ~560–620 từ + cụm công thức — phù hợp chuẩn ESP
(từ vựng lễ tân/buồng phòng/F&B lõi), không nhắm 2.000 từ tổng quát của B1 đại trà.

---

## Phase 0 — pre-A1 (tuần 1–6): Nền tảng sống còn

Triết lý: **chunk-first** (học nguyên cụm công thức như một đơn vị, chưa phân tích ngữ pháp).
Trọng tâm phát âm cho người Việt: âm cuối /s/ /t/ /k/, trọng âm từ.

| Tuần | Chủ đề chung (mọi bộ phận) | Can-do (nói được) | Ngôn ngữ lõi |
|---|---|---|---|
| 1 | Bảng chữ cái, đánh vần tên & mã đặt phòng; chào hỏi | Chào khách đúng buổi; nói tên mình + bộ phận; đánh vần tên | Good morning/afternoon/evening, sir/madam; My name is…; I'm from Housekeeping. A–Z |
| 2 | Số 0–100; số phòng, số tầng, số điện thoại | Nói và nghe hiểu số phòng/tầng | Room two-oh-five; the third floor; numbers 0–100 |
| 3 | Giờ & ngày; giờ mở cửa dịch vụ | Nói giờ ăn sáng/giờ mở cửa hồ bơi | It's seven o'clock; from six to ten; Monday–Sunday |
| 4 | Tiền & giá (VND/USD); số lượng | Nói giá rõ ràng; xác nhận số lượng | It's twenty dollars; two towels; How many? |
| 5 | Cụm lịch sự cốt lõi & phản hồi có/không | Đáp ứng yêu cầu đơn giản bằng chunk cố định | Please; Thank you; One moment, please; Here you are; This way, please; Yes, of course; I'm sorry |
| 6 | **Checkpoint P0** — củng cố + weektest | Hoàn thành hội thoại kịch bản 2 lượt | Ôn toàn bộ W1–5 |

Màu bộ phận ở P0 = thay danh từ: HK dùng towel/soap/bed; FB dùng menu/table/water;
FO dùng key/passport/luggage; SW dùng robe/locker; GR dùng lounge/card; BO dùng invoice/email.

## Phase 1 — A1 (tuần 7–14): Giao tiếp câu đơn

### Nguyên lý: khung câu dùng chung + ngân hàng từ riêng (70/30)

Pre-A1 chia sẻ được ~90% ngôn ngữ vì số đếm, giờ giấc, bảng chữ cái là phổ quát. Từ A1 điều
đó không còn đúng: nhân viên buồng phòng và nhân viên kinh doanh xin những thứ khác nhau, làm
việc ở những nơi khác nhau, và hỏng những thiết bị khác nhau. Nên Phase 1 chạy ở tỷ lệ
**~70% riêng từng bộ phận / 30% dùng chung**, theo cơ chế:

> **MẪU CÂU DÙNG CHUNG + NGÂN HÀNG TỪ RIÊNG**

Cả 6 bộ phận drill cùng 2–3 mẫu câu mỗi tuần, nhưng thay từ vựng riêng của mình vào. Đây là
*substitution drill* — cơ chế biến mẫu câu thành phản xạ ở trình độ A1, đồng thời là thứ **tự
luyện ở nhà được** (chỉ cần thay từ vào khung đã thuộc). Các mẫu câu được hiển thị cho học viên
ở trang **Sổ tay tuần** (`/handbook/$dep/$week`, in ra giấy được).

Ngân hàng từ đặt tại `src/lib/content/phase1-lexicon.ts` — 7 chủ đề × 8 từ + 7 từ closing =
**60 headword riêng mỗi bộ phận**. Xương sống 32 giáo án ở `src/lib/content/phase1.ts`.

| Tuần | Mẫu câu lõi (chung 6 bộ phận) | Ngân hàng từ riêng |
|---|---|---|
| 7 | `This is {tên}. He/She is our {chức danh}.` · `I work in {bộ phận}.` | chức danh |
| 8 | `The {nơi} is on the {vị trí}.` · `There is a {nơi} near the {nơi}.` | địa điểm |
| 9 | `Can I have {đồ}?` → `Of course. I will bring {đồ}.` | đồ khách hay xin |
| 10 | `The {đồ} is {tính từ}.` · `It is too {tính từ}.` | tính từ mô tả |
| 11 | `I {động từ} the {đồ} every day.` · `We {động từ} at {giờ}.` | việc hằng ngày |
| 12 | `Hello, {bộ phận}. {Tên} speaking.` · `Hold on, please.` | tình huống điện thoại |
| 13 | `The {đồ} is {hỏng}.` → `I am sorry. I will {sửa} it now.` | sự cố thường gặp |
| 14 | Checkpoint — nối chuỗi mẫu câu tuần 7–13 | từ closing |

### Lịch ôn xoáy vòng phân bậc

Phase 0 chỉ lấy 6 từ gần nhất — cách đó mãi mãi chỉ ôn lại tuần liền trước. Phase 1 dùng
**giãn cách mở rộng** (đúng nguyên lý spacing effect), mỗi tuần rút từ ba khoảng cách:

- 1 tuần trước (củng cố) · 3 tuần trước (giãn trung bình) · và một lát cắt **quét lần lượt
  toàn bộ Phase 0** qua các tuần 7–13, để mọi từ pre-A1 đều được truy hồi ít nhất một lần.

`bun run verify:content` đo và báo cáo phân bố tần suất này, không chỉ tin vào thiết kế.

### Bảng can-do

| Tuần | Chủ đề chung | Can-do | Ngôn ngữ lõi |
|---|---|---|---|
| 7 | Con người & công việc trong khách sạn | Giới thiệu đồng nghiệp, bộ phận | to be; jobs; This is… |
| 8 | Vị trí & chỉ đường trong khuôn viên | Chỉ đường tới nhà hàng/hồ bơi/thang máy | There is/are; next to, near, on the left |
| 9 | Yêu cầu đơn giản của khách | Nghe hiểu và đáp ứng "Can I have…?" | Can I…?/Could you…? (công thức); I need… |
| 10 | Mô tả đồ vật & trạng thái | Mô tả phòng/món đồ (sạch, nóng, mới) | Adjectives; It's + adj; very/too |
| 11 | Lịch trình & thói quen ca làm | Nói lịch dịch vụ hằng ngày | Present simple; open/close at… |
| 12 | Nghe điện thoại cơ bản | Nhận cuộc gọi, chuyển máy theo kịch bản | Hello, … speaking; Hold on, please |
| 13 | Sự cố đơn giản & xin lỗi | Tiếp nhận vấn đề đơn giản, xin lỗi, hứa hành động | It doesn't work; I'm sorry; I will check |
| 14 | **Checkpoint P1** | Hội thoại 3 lượt: chào – tiếp nhận yêu cầu – kết thúc | Ôn W7–13 |

## Phase 2 — A2.1 (tuần 15–22): Nghiệp vụ chuẩn (Core SOP)

### Khác biệt hoá ~77% — chỉ còn chức năng ngôn ngữ là chung

P1 chạy 70/30. P2 đẩy lên **~77% riêng** (đo được 76–87%/tuần): chủ đề và mọi từ nội dung
thuộc về bộ phận, chỉ **chức năng ngôn ngữ** còn dùng chung (một quy trình, một lời mời, một
nội quy, một báo cáo quá khứ). Ngân hàng từ ở `src/lib/content/phase2-lexicon.ts` —
8 chủ đề × 10 từ + 10 từ wrapUp = **78 headword riêng mỗi bộ phận**.

Bước tiến ngôn ngữ so với A1: câu được phép **2 mệnh đề** (trần 12 từ, A1 là 8 từ/1 mệnh đề);
speaking thành **hội thoại 2 lượt**; **quá khứ đơn** xuất hiện ở tuần 21 — lần đầu học viên
báo cáo việc đã làm, đúng thứ một ca bàn giao thực sự cần.

### Bốn tuần viết tay nằm sẵn trong khoảng này

FB-15, HK-15, FO-17, SW-19 là nội dung viết tay có trước ma trận. Chúng **khớp đúng chức năng
của slot** đang đứng (tuần 15 = quy trình từng bước → SOP buffet và room service; tuần 19 =
nội quy an toàn → an toàn hồ bơi), nên được **giữ lại và ghi đè spine**: `week-content.ts`
spread `buildPhase2()` TRƯỚC các hằng số viết tay.

Khi nhập chúng vào chuẩn P2 đã phải: tách 15 câu vượt trần 12 từ thành câu ngắn (giữ nguyên
nội dung), thêm `reviewWords` (trước đó bằng 0 — chúng đứng ngoài hệ thống ôn xoáy vòng), và
viết lại 16 game round vốn sao chép nguyên văn câu speaking.

### Xương sống chung

| Tuần | Chức năng ngôn ngữ chung | Ngữ pháp mới |
|---|---|---|
| 15 | Quy trình phục vụ chuẩn bước-theo-bước | Trình tự first/then/after that; imperative lịch sự |
| 16 | Đề nghị & mời (offers) | Would you like…?; May I…? |
| 17 | Xin phép & xác nhận thông tin khách | Could I have…?; xác nhận lại (So that's…, correct?) |
| 18 | Quy trình giấy tờ/thanh toán đơn giản | Present continuous; need to + V |
| 19 | Nội quy & an toàn | must/mustn't; Please do not… |
| 20 | Tư vấn lựa chọn đơn giản | like/prefer; Which one…? |
| 21 | Quá khứ đơn — báo cáo việc đã làm | Past simple (động từ thường gặp) |
| 22 | **Checkpoint P2** | Ôn W15–21 |

## Phase 3 — A2+ (tuần 23–30): Dịch vụ chủ động

| Tuần | Chức năng chung | Ngữ pháp mới |
|---|---|---|
| 23 | Upsell/gợi ý nâng cấp nhẹ | Comparatives; I recommend… |
| 24 | Giải thích chính sách & phí | have to; because; giải thích 2 mệnh đề |
| 25 | Hứa hẹn & cam kết thời gian | will/going to; by 3 PM; within 10 minutes |
| 26 | Điều phối liên bộ phận | Let me check with…; I'll ask… to… |
| 27 | Phàn nàn thường quy (LAST bước 1–2: Listen–Apologise) | Miêu tả vấn đề; xin lỗi mở rộng |
| 28 | Đề xuất giải pháp có điều kiện | First conditional lịch sự (If you like, I can…) |
| 29 | Kể lại & bàn giao ca | Past continuous nhẹ; báo cáo miệng |
| 30 | **Checkpoint P3** | Ôn W23–29 |

## Phase 4 — B1.1 (tuần 31–40): Xử lý & thuyết phục

| Tuần | Chức năng chung | Ngôn ngữ mới |
|---|---|---|
| 31 | Kể chuyện sản phẩm/dịch vụ (storytelling) | Câu ghép 2–3 mệnh đề; tính từ cảm xúc |
| 32 | Tư vấn chuyên sâu & cá nhân hóa | Based on…; đề xuất theo sở thích |
| 33 | Tranh chấp & bồi thường (LAST đầy đủ) | Policy allows…; up to…; Let me check with my supervisor |
| 34 | Sự kiện đặc biệt & bất ngờ cho khách | Phối hợp đa bộ phận; câu chúc trang trọng |
| 35 | Đàm phán nhẹ (nội bộ & khách) | What if we…? in exchange for…; however |
| 36 | Xử lý khủng hoảng (thời tiết, y tế, kỹ thuật) | Hướng dẫn khẩn; trấn an |
| 37 | Thương lượng B2B cơ bản | Điều khoản, tỷ lệ, thời hạn |
| 38 | Trình bày đề xuất/báo giá | Cấu trúc pitch ngắn |
| 39 | Tổng duyệt role-play liên tình huống | Kết hợp mọi chức năng |
| 40 | **Đánh giá cuối khóa** — mock role-play + weektest toàn lộ trình | Chuẩn đầu ra B1.1 nghiệp vụ |

---

## Di dời 12 tuần content đã viết (hiện gắn nhãn "tuần 1–2")

Content hiện có KHÔNG đứng được ở tuần 1–2 của lộ trình mới (đã audit: A2→B2).
Vị trí mới đề xuất + việc cần làm:

| Content hiện tại | Band thẩm định | Slot mới | Việc cần làm khi di dời |
|---|---|---|---|
| FO_WEEK_1 (check-in OTA, pre-auth) | A2+ | FO tuần 17–18 | Tách "Pre-authorization/Incidental charges" xuống tuần 24 (giải thích phí) |
| FO_WEEK_2 (đoàn MICE) | A2+/B1− | FO tuần 26 | Giữ, rút ngắn vài câu >16 từ |
| FB_WEEK_1 (buffet sáng) | A2 | FB tuần 15–16 | Gần như giữ nguyên |
| FB_WEEK_2 (ẩm thực Việt, storytelling) | B1− | FB tuần 31–32 | Giữ |
| HK_WEEK_1 (room service) | A2 | HK tuần 15–16 | Gần như giữ nguyên |
| HK_WEEK_2 (giặt là, tranh chấp đền bù) | B1 | HK tuần 33 | Giữ |
| SW_WEEK_1 (tư vấn spa, upsell) | A2+ | SW tuần 23 | Giữ |
| SW_WEEK_2 (hồ bơi, an toàn) | A2 | SW tuần 19 | Giữ — ĐỔI CHỖ với SW_1 (tuần 2 hiện tại dễ hơn tuần 1) |
| GR_WEEK_1 (VIP club) | B1− | GR tuần 27–28 | Rút gọn câu liệt kê quyền lợi dài |
| GR_WEEK_2 (kỷ niệm/bất ngờ) | B1 | GR tuần 34 | Giữ; câu chúc "May your love…" giữ ở đây là đúng band |
| BO_WEEK_1 (hợp đồng B2B) | B1/B1+ | BO tuần 37 | Giữ |
| BO_WEEK_2 (RFP/BEO) | B1+ | BO tuần 38 | Giữ; là trần khó của toàn lộ trình |

Dàn ý tiếng Việt trong `src/lib/curriculum.ts` (concierge, check-out/VAT, service recovery,
à la carte/wine…) dùng làm **nguồn chủ đề** cho các slot P2–P4 còn trống của từng bộ phận.

## Quy tắc viết content mới (chống trùng lặp — kết luận audit)

1. **Arcade ≠ Grammar**: 2 cặp arcade phải là ngữ liệu MỚI cùng chủ đề, không copy cặp grammar cùng bài.
2. **Game ≠ Speaking**: game round phải là TÌNH HUỐNG BIẾN THỂ (khách khác, biến số khác), không copy guestPrompt/targetResponse.
3. **`reviewWords` bắt buộc** theo quota phase (bảng thông số) — lấy từ các tuần trước của chính bộ phận đó, ưu tiên từ sắp đến hạn quên.
4. **Khác biệt hoá theo phase, không phải quy tắc phẳng.** P0 dùng chung gần hết (đúng cho
   pre-A1). Từ P1 trở đi mỗi tuần phải đạt **≥60% headword riêng** cho từng bộ phận (mục tiêu
   70%) — `verify:content` đo tỷ lệ này theo tuần và chặn nếu tụt dưới sàn. Công thức lịch sự
   dùng chung phải được *dạy chính thức* ở tuần quy định trong xương sống (W5, W9, W16…), các
   tuần sau chỉ tái sử dụng.
5. Nhân vật/props trong reading phải thay đổi (không tái dùng David Green/Room 512 xuyên bộ phận).

## Việc kỹ thuật phải làm khi triển khai (ngoài phạm vi tài liệu này)

- ~~Migration nới `CHECK (week_number BETWEEN 1 AND 20)` → `1 AND 40` ở `lesson_progress` và `review_items`; seed `scenarios` tuần 21–40.~~ (xong — `20260721150000_forty_week_frame.sql`)
- ~~Sửa chữ cứng "— 20 Weeks"; sửa fallback 5 suite → "Coming soon" thay vì bài mẫu giả.~~ (xong)
- ~~Bật week-gating theo checkpoint khi content đủ dày.~~ (xong — `src/lib/week-access.ts`)
- Re-key nội dung khi di dời tuần (item_key chứa số tuần — cần migration dữ liệu review nếu đã có học viên thật).
