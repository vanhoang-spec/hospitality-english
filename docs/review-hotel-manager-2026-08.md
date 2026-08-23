# Thẩm định nội dung Embassy Hospitality — góc nhìn Hotel Manager (2026-08)

> Người thẩm định: Hotel Manager, hơn 20 năm vận hành khách sạn/resort 4–5 sao tại Việt Nam,
> 5 năm gần nhất trực tiếp theo ca cùng nhân viên FO/FB/HK/Spa/GR. Đánh giá này dựa trên
> việc đọc 100% cấu trúc và nội dung học của app tại thời điểm 2026-08-03, không dựa trên
> tài liệu quảng bá và không đọc các bản review nội bộ trước đó.
>
> Câu hỏi trung tâm phải trả lời: **một nhân viên từ mức tiếng Anh thấp nhất, đi đúng lộ
> trình 40 tuần này, có trở thành người căn bản thành thạo giao tiếp với khách trong môi
> trường hotel/resort 4–5 sao tại Việt Nam không?**

---

## 0. Executive read

### 3 điều tốt nhất

1. **19 tuần soạn tay là giáo trình nghiệp vụ thật, đúng nghề, đúng Việt Nam — mức hiếm thấy
   trên thị trường.** FO-17 dạy xử lý thẻ bị từ chối đúng như tôi huấn luyện lễ tân của mình:
   `"The terminal says declined, but never use that word aloud."` và câu thay thế
   `"It did not go through, sir. May I try the other terminal?"` (week-content.ts:340,410).
   FO-38 dạy ghi biển số taxi lên card cho khách kèm giá thật 380.000–450.000 VND; BO-37 có
   blackout dates Tết 15/1–5/2; HK-33 dạy đền bù giặt là theo trần 10 lần phí giặt kèm
   Duty Manager sign-off trên 50 USD; GR-37 dạy gọi 115, phòng khám quốc tế nói tiếng
   Hàn/Nhật, direct billing bảo hiểm và giấy khám bằng tiếng Anh; SW-37 dạy hỏi giới tính
   kỹ thuật viên như câu hỏi thủ tục và từ chối vùng nhạy cảm — thứ mà phần lớn giáo trình
   spa Việt Nam né tránh. Đây là những đoạn tôi sẵn sàng in ra dán ở back office.

2. **Cơ chế học và đo được thiết kế cho người làm ca thật, không phải cho học sinh.**
   Bài sát hạch bắt buộc cả viết VÀ nói (AND, không cộng gộp — WeekTestSuite.tsx:522), sàn
   tối thiểu từng kỹ năng chặn kiểu "điểm đọc bù điểm nghe" (phases.ts:61), thiết bị hỏng
   micro/mạng thì _fail open_ sang gõ tay chứ không khoá người học (WeekTestSuite.tsx:300),
   thi trượt chỉ chờ 20 phút — đúng nhịp một ca nghỉ giữa giờ. Tốc độ nghe leo thang tất
   định 0.70→0.90 theo tuần thay vì random. Ôn xoáy vòng SM-2-lite có đo đếm (chỉ 60/840
   headword không bao giờ được ôn lại). Người thiết kế phần này hiểu nhân viên khách sạn
   học lúc 22h sau ca chiều.

3. **Chống lỗi tiếng Anh kiểu Việt một cách có chủ đích.** Các cặp rude/polite ở P0–P1 không
   phải "khách thô lỗ" mà là _chính lỗi của người Việt_: `"Same same." → "They are the
same, madam."` (phase1.ts:894), `"I no know." → "I am not sure, sir."` (phase1.ts:291),
   rơi động từ "to be", thiếu mạo từ, thiếu -s. HelpTip nhắc đúng tật phát âm: âm cuối,
   nối âm `"keep it briefly"`, `"che-kyer"`. Đây là thứ tôi phải sửa miệng cho nhân viên
   mỗi ngày, và app này sửa đúng chỗ.

### 5 vấn đề nặng nhất

1. **Nội dung sinh tự động ở Phase 3–4 tạo ra một lớp câu vô nghĩa hoặc phản nghiệp vụ mà
   người học bị bắt nói đạt 80% để qua bài.** Ví dụ nguyên văn từ render thật: FO-32
   `"Would you like the same feather allergy as last time, sir?"` (mời khách "dùng lại
   dị ứng lông vũ như lần trước" — phase4.ts:428 × phase4-lexicon.ts:167); GR-18
   `"Here is your add to the account, sir."`; HK-18 `"The consumed is on file."`;
   BO-36 `"Because of the system outage, please use the stairs."`. Một nhân viên chăm chỉ
   học thuộc các câu này sẽ nói ra ca thật — và khách sẽ nhìn họ như người máy hỏng.

2. **BO-31 dạy đúng nguyên văn câu mà chính tài liệu chuẩn của repo cấm.**
   `docs/phase4-bank-contract.md` dòng 30 ghi ví dụ FAIL cho slot `story`: _"an internal
   KPI — 'The market position is what makes this place special.'"_ — trong khi bank BO
   vẫn giữ từ `Market position` (phase4-lexicon.ts:3921) và tuần 31/39 render đúng câu đó:
   `"The market position is what makes this place special."` Gate xanh, contract đỏ.

3. **"Open role-play" tuần 39–40 không mở.** Chính `docs/curriculum-level-matrix.md`
   (dòng 123–129) thừa nhận: _"Nội dung đó không tồn tại: tuần 39 và 40 vẫn là câu mẫu cố
   định như mọi tuần, chỉ dài hơn"_. Cả 40 tuần chỉ có đúng **2 nhiệm vụ sản sinh ngôn ngữ
   thật** mỗi bộ phận (mediation W26, writing W33). Chuẩn đầu ra ghi B1.1 nhưng năng lực
   được luyện là _đọc lại câu mẫu B1_, không phải _tự nói ra câu B1_. Ngoài ca thật, khác
   biệt giữa hai thứ đó là khác biệt giữa nhân viên đứng được ca và nhân viên phải gọi
   supervisor.

4. **Thiếu hẳn tuyến "khách không nói tiếng Anh tốt" — nghịch lý lớn nhất so với thực tế
   thị trường VN.** Khách của chúng ta hiện nay là Hàn, Trung, Nga trước rồi mới đến Âu–Mỹ;
   quá nửa giao tiếp ngoài ca là tiếng Anh đơn giản hoá với người cũng không giỏi tiếng
   Anh. App có tên khách đa quốc tịch (Tanaka, Petrova, Chen, Mrs. Iqbal…), có phòng khám
   "English, Korean, Japanese spoken" (GR-37), nhưng **không một bài nào dạy chiến lược
   nói chậm – chọn từ đơn giản – viết số ra giấy – xác nhận hai chiều** với khách ít tiếng
   Anh. Mediation chỉ có chiều Việt→Anh.

5. **Kịch bản FO còn hai lỗ vận hành: đặt phòng qua điện thoại và ca đêm.** Bank có từ
   (`Night shift`, `Night auditor`, `Night manager`, `Drunk guest`) nhưng không có kịch
   bản nói nào cho: nhận đặt phòng lẻ qua điện thoại đầu-cuối, khách ồn lúc 2h sáng, khách
   say ở sảnh đêm. Ngoài ra tuần 3 FO dạy một "sự thật" sai nghề: `"We open at two. We
close at eleven."` cho **check-in** — quầy lễ tân 4–5 sao ở VN trực 24/7, check-in
   không "đóng lúc 11 giờ" (phase0.ts:93 `service: check-in, open two, close eleven`).

---

## 1. Phạm vi đã kiểm (khai báo trung thực)

**Đọc trọn từng dòng:**

- 3 tài liệu chuẩn: `docs/curriculum-level-matrix.md`, `docs/phase3-bank-contract.md`,
  `docs/phase4-bank-contract.md`.
- Toàn bộ 5 spine: `phase0.ts` (1651 dòng), `phase1.ts` (1974), `phase2.ts` (2130),
  `phase3.ts` (2315), `phase4.ts` (3013) — gồm mọi frame, reading, game, helpTip.
- `phase1-lexicon.ts` (1018 dòng) đọc trọn nguyên văn.
- **Cả 19 tuần soạn tay** trong `week-content.ts` đọc nguyên văn (dòng 110–8163):
  FB-15, HK-15, FO-17, SW-19, SW-23, FO-26, GR-27, FB-31, HK-33, GR-34, BO-37, BO-38,
  FO-37, FO-38, GR-37, GR-38, FB-37, SW-37, HK-37.
- Cơ chế: `phases.ts`, `speaking-score.ts`, `week-access.ts`, `review.ts`,
  `academy-store.ts`, `writing-score.ts` (phần scorer).
- Suite đọc trọn: SpeakingSuite, WeekTestSuite (847 dòng), ListeningSuite, MediationSuite,
  WritingSuite. Routes đọc trọn: `learn.$dep.$week.$suite.tsx`, `department.$dep.tsx`.

**Đọc bằng trích xuất 100% từ + nghĩa (không đọc từng dòng IPA/icon gốc):**

- Bank P2/P3/P4 (`phase2-lexicon.ts` 1837 dòng, `phase3-lexicon.ts` 3428,
  `phase4-lexicon.ts` 4693): tôi chạy script tự viết in ra **toàn bộ** word + định nghĩa
  Việt của mọi slot × 6 bộ phận (100% coverage từ vựng), sau đó tra ngược file gốc theo
  dòng khi cần trích dẫn. Các comment tác giả trong 3 file này chỉ đọc chọn lọc.

**Render thật:** `bun scripts/dump-week.ts` cho 12 tuần × 6 bộ phận
(3, 9, 16, 18, 21, 24, 25, 28, 32, 35, 36, 39) — ~2.800 dòng câu học viên thực nhìn thấy.

**Đọc lướt/lấy mẫu:** VocabSuite, GrammarSuite, ReadingSuite, ArcadeSuite, BoardGameSuite
(qua trích logic chấm điểm); `routes/index.tsx`, `routes/review.tsx`.

**Đã chạy baseline:** `bun run verify:content` → PASS; `bun run qa:full` → PASS với 7
warnings (đáng chú ý: chính QA tự đo _"29% [game rounds] have a markedly longest correct
option"_ — đáp án đúng dài nhất một cách lộ liễu ở gần 1/3 số câu game).

**Không đọc (theo ràng buộc):** `docs/academic-review-2026-08.md`,
`docs/academic-review-backlog.md`, mọi lịch sử git, file `review-academic-director*`.
Bộ phận thứ 7 (SE — Safety & Facilities, `hidden: true`, 0/40 tuần) nằm ngoài phạm vi.

**Giới hạn phương pháp:** tôi **không có tài khoản đăng nhập vào app đang chạy**. Toàn bộ
đánh giá dựa trên code + nội dung + luồng màn hình + câu render từ script, không phải trải
nghiệm cầm máy của nhân viên: tôi không nghe được chất lượng TTS thật trên điện thoại
Android phổ thông, không đo được độ chính xác speech recognition thật với giọng Việt, và
không kiểm được độ trễ mạng của các thao tác ghi điểm.

---

## 2. Ma trận thực tiễn theo bộ phận

Cách chấm: đối chiếu nội dung 40 tuần của từng bộ phận với việc nhân viên đó THẬT SỰ phải
nói trong ca ở khách sạn/resort VN mà tôi đã vận hành. Thang 10 có neo (9–10 xuất bản
thương mại · 7–8 dùng được, sửa nhỏ · 5–6 lỗ hổng rõ · 3–4 sai chuẩn · ≤2 phản tác dụng).

| Bộ phận | Nội dung sinh P0–P2 | Nội dung sinh P3–P4 | Tuần soạn tay | **Tổng** |
| ------- | ------------------- | ------------------- | ------------- | -------- |
| FO      | 8                   | 7                   | 9             | **8.0**  |
| FB      | 8                   | 7.5                 | 9             | **8.0**  |
| HK      | 7.5                 | 6.5                 | 9             | **7.5**  |
| SW      | 8                   | 7                   | 9             | **7.5**  |
| GR      | 7                   | 6.5                 | 9             | **7.0**  |
| BO      | 7.5                 | 5.5                 | 9             | **6.5**  |

### FO — 8.0

**Đúng nghề (nhiều):** Chuỗi check-in W17 đúng SOP thật từng bước (PMS → passport → khai
báo lưu trú trước 23h → pre-auth → giao chìa): reading FO-17 ghi
`"The receptionist must scan the identity page and upload it to the local immigration
portal before 11:00 PM."` (week-content.ts:269) — đây là nghĩa vụ khai báo cư trú thật ở
VN mà giáo trình nước ngoài không bao giờ có. FO-26 (đoàn MICE: rooming list, express
check-in, tách folio) đúng nghiệp vụ đoàn. FO-33 có riêng tình huống **walk khách** — cuộc
nói chuyện khó nhất đời lễ tân: `"We would like to arrange a room at a partner hotel
nearby, with transport included and no extra cost to you."` (phase4.ts:668). FO-37/38
(concierge, taxi, đặt bàn hộ, giữ hành lý) lấp đúng lỗ mà chính comment trong code thừa
nhận từng bằng 0.

**Lệch nghề / sai:**

- Tuần 3: `service: { en: "check-in", open: "two", close: "eleven" }` (phase0.ts:93) render
  thành `"We open at two. We close at eleven."` — lễ tân 4–5 sao trực 24/7; dạy học viên
  nói check-in "đóng cửa lúc 11 giờ" là dạy một câu sẽ bị khách bắt bẻ.
- W32: `"Would you like the same feather allergy as last time, sir?"` — khung
  `Would you like the same {preference} as last time?` (phase4.ts:428) nhét từ
  `Feather allergy` vào; không nhân viên nào được phép nói câu này.
- W9: `"Some taxi, please."` (khung `Some ${lower(q3)}, please.` — phase1.ts:612) — sai mạo
  từ ngay trong tuần dạy mạo từ.

**Thiếu:** đặt phòng lẻ qua điện thoại đầu-cuối; kịch bản ca đêm; yêu cầu "hoá đơn đỏ"
(VAT invoice) chỉ hiện gián tiếp qua `Invoice address`/`Tax code` ở W18.

### FB — 8.0

**Đúng nghề:** FB-15 (buffet sáng: voucher, B&B vs Room Only, giờ cao điểm 8:00–9:30,
không cho khách đứng cạnh quầy line) là SOP buffet thật. FB-31 kể chuyện Phở/cà phê trứng
chuẩn văn hoá và đúng kỹ thuật storytelling. FB-37 (trẻ em + Halal) xuất sắc:
`"Write HALAL on the order slip. Verbal instructions to the kitchen are not accepted."`
(week-content.ts:7025) — đúng chuẩn tôi áp cho nhà hàng có khách Trung Đông/Malaysia/
Indonesia. Bank P3 complaints (`Cold food`, `Wrong order`, `Billing mistake`,
`Warm beer`…) là danh sách phàn nàn thật của một ca F&B.

**Lệch/sai:** W16 render `"The price includes table service and service."`
(khung `The price includes ${lo(o10)} and service.` — phase2.ts:401 × từ `Table service`)
— câu lặp vô nghĩa học viên phải nói. W18 `"The sign here is on file."` (từ `Sign here`
đứng nhầm slot danh từ). W21 `"One booking was prepared."` — không ai nói vậy trong ca.

**Thiếu:** nhận order room service qua điện thoại (in-room dining) như một kịch bản riêng;
xử lý khách say tại quầy bar (bank chỉ có từ `Drunk guest`).

### HK — 7.5

**Đúng nghề:** HK-15 (gõ cửa 2 lần – xưng "Housekeeping" – chờ 10 giây – DND sau 14h thì
gọi phòng) đúng từng nhịp SOP buồng phòng. HK-33 (giặt là – tranh chấp đền bù) đúng khung
đền bù thật: `"Major Damage (shrinkage, fading, tearing): Up to 10x the laundry service
fee"` (week-content.ts:3761). HK-37 (côn trùng + Lost & Found) có câu cấm kinh điển mà tôi
phải dạy đi dạy lại: `"It is Vietnam. There are insects everywhere."` nằm ở cột rude —
đúng chỗ (week-content.ts:7785). Quy trình L&F (mô tả đồ trước, không cho xem trước, túi
niêm phong 2 chữ ký, giữ đồ giá trị 6 tháng) chuẩn.

**Lệch/sai:** W18 render `"The consumed is on file."` (`Consumed` — phase2-lexicon.ts:716
đứng nhầm slot danh từ) và `"You can hand in now."` (thiếu tân ngữ); W9 `"Some toothbrush,
please."` và game prompt `"Is my slippers ready?"` (phase1.ts:699); W35
`"I am able to re-press your suit for a group of twenty."` (khung đàm phán đoàn 20 người
× bank giặt là — phase4.ts:1234); W39 lesson 4 pitch: `"Be ready to explain the insect."`
/ `"Do not skip past the mosquito."` — cơ chế `taughtIn()` (phase4.ts:2205) lấy 2 từ đầu
của tuần override nhét vào khung thuyết trình.

**Thiếu:** tranh cãi minibar khi check-out (mới có `Minibar charge` ở W24 mức từ vựng).

### SW — 7.5

**Đúng nghề:** Bank spa là bank "thơm mùi nghề" nhất trong 6 bộ phận: `Contraindication
check`, `Draping technique`, khai sức khoẻ có thai/chấn thương/vùng cần tránh (SW-23
reading: `"Areas to avoid: Lower back (recent injury)"` — week-content.ts:1395). SW-19
(hồ bơi: trẻ dưới 12 phải có người lớn, cờ đỏ, chuột rút/say nắng, Ext. 115) đúng chuẩn
resort biển. SW-37 tôi chấm 10/10 riêng phần nội dung: hỏi giới tính KTV như thủ tục,
tip bỏ hộp chia cả tổ kể cả nhân viên giặt đồ vải, `"Please undress only as far as you
feel comfortable, madam. I will step outside while you get ready."` và lời từ chối vùng
nhạy cảm + báo Spa Manager (week-content.ts:7663–7683) — đây là đào tạo bảo vệ cả khách
lẫn nhân viên.

**Lệch/sai:** W36 render `"No. Nobody has been hurt by the severe allergic reaction."`
(khung `Nobody has been hurt by the ${lo(e4)}.` — phase4.ts:1435 tự mâu thuẫn với sự cố
y tế: dị ứng nặng nghĩa là ĐÃ có người bị); W39 `"Be ready to explain the female
therapist."` / `"Do not skip past the male therapist."` — vô nghĩa, thậm chí dễ đọc sai
nghĩa; W9 `"Some sun bed, please."`; W16 `"Perhaps you would prefer extra thirty minutes,
madam?"` (thiếu mạo từ). W24 `"It is our hotel late arrival policy, madam."` (khung ghép
policy — phase3.ts:332) nghe gãy.

### GR — 7.0

**Đúng nghề:** 4 tuần soạn tay của GR thuộc nhóm hay nhất toàn app. GR-27 (Executive
Lounge: quyền lợi, trẻ em trước 18h, in tài liệu mật) đúng nghiệp vụ club floor. GR-34
(milestone surprise: phối hợp bếp–buồng phòng có giờ chốt 18:30/18:45, checklist bưng quà
hai tay, lỗi sai tên "Nguyan" trên thiệp) — chi tiết `"Nguyen" printed as "Nguyan"`
(week-content.ts:4599) là lỗi có thật tôi từng phải xin lỗi khách. GR-37 (cấp cứu y tế)
và GR-38 (bão: đóng khu vực dự phòng, gọi điện chứ không nhét giấy, thứ tự đổi lịch → rain
check → hoàn tiền cùng ngày, khách kẹt giữ NGUYÊN giá cũ, thư xác nhận cho bảo hiểm) là
hai tuần tôi muốn mọi GR ở resort biển miền Trung học thuộc.

**Lệch/sai:** W18 render `"Here is your add to the account, sir."` /
`"That is your add to the account."` (`Add to the account` — phase2-lexicon.ts:1353 là
cụm động từ đứng nhầm slot danh từ — câu gãy hẳn); W21 `"I welcomed it this morning."`
(`Welcomed` + tân ngữ "it" — GR đón NGƯỜI, không đón "it"); W36 tông khủng hoảng đặt lên
sự cố nhỏ: `"Please stay calm — we are handling the lost passport. There is no danger."`
— mất hộ chiếu là việc nghiêm túc nhưng nói "there is no danger" như cháy nhà là sai
proportion; W39 `"Open with the typhoon, not with small talk."` / `"Be ready to explain
the ambulance."` — khung pitch × bank bão/y tế.

**Thiếu:** đúng bộ phận cần nhất lại không có: chiến lược giao tiếp với khách Hàn/Trung/
Nga ít tiếng Anh (xem mục 4 và 5).

### BO — 6.5

**Đúng nghề:** BO-37/38 là cặp tuần B2B chuẩn thương mại: corporate rate 1.800.000
VND/đêm net, allotment 10 phòng release 7 ngày, blackout Tết, thương lượng hoa hồng 10→12%
đổi lấy hợp đồng dài hạn, RFP → site inspection → BEO → cọc 50%. Writing task B2B (email
đối tác về hoá đơn trùng, credit note trong 5 ngày làm việc — phase4.ts:2972) đúng văn
phong.

**Lệch/sai (nhiều nhất trong 6 bộ phận):** BO là bộ phận ít gặp khách nhất nên khung
guest-facing chung áp lên nó gãy nhiều nhất:

- W31/39: `"The market position is what makes this place special."` +
  `"Some guests prefer the guest satisfaction score instead."` — kể chuyện cho khách bằng
  KPI nội bộ; chính contract của repo ghi đây là ví dụ fail (phase4-bank-contract.md:30).
- W36: khung sơ tán áp lên sự cố thương mại: `"Because of the system outage, please use
the stairs."`, `"Nobody has been hurt by the server room flood."`, và sau
  "bank transfer failure" là `"I am sorry, no. Leave your belongings — safety comes
first."` — nhân viên đặt phòng nói câu này với đối tác lữ hành thì chỉ có thể là đang
  đóng kịch.
- W39: `"Let me begin with the request for proposal (rfp), sir."` — "(rfp)" lọt nguyên
  vào câu nói/TTS.
- W16 render `"the extra chairs is ready for you."` (lỗi hợp số — khung
  `${wt(o7)} is ready for you.` phase2.ts:490 × từ `Extra chairs`), W18 `"You can attach
now."` (thiếu tân ngữ).

---

## 3. Ma trận độ phủ tình huống thật

Danh sách dưới đây là các tình huống **xảy ra thường xuyên nhất ngoài ca thật** theo kinh
nghiệm vận hành của tôi (đặc biệt 5 năm gần đây), đối chiếu với nội dung app. Chấm độ phủ
0–10 cho từng ô (CÓ/THIẾU + chất lượng nếu có).

### FO

| Tình huống thật (tần suất cao → thấp)        | App có?  | Ở đâu                               | Điểm    | Lập luận                                                                   |
| -------------------------------------------- | -------- | ----------------------------------- | ------- | -------------------------------------------------------------------------- |
| Check-in lẻ + OTA voucher + khai báo lưu trú | CÓ       | FO-17                               | 9       | Đủ chuỗi PMS→passport→pre-auth; đúng luật khai báo trước 23h.              |
| Thẻ từ chối lúc pre-auth                     | CÓ       | FO-17 L3                            | 9       | Dạy cả điều KHÔNG nói ("declined") — chuẩn 5 sao thật.                     |
| Chỉ đường / concierge / gọi taxi             | CÓ       | FO-37/38                            | 9       | Có cả chống chặt chém: ghi biển số + mức giá lên card.                     |
| Khách phàn nàn phí / minibar / city tax      | CÓ       | W24, W28                            | 8       | `"I am afraid I cannot, but my manager can review it."` — đúng thẩm quyền. |
| Walk khách khi full phòng                    | CÓ       | FO-33 (sp riêng)                    | 8       | Một lượt nói đủ 3 phần: xin lỗi–lý do–giải pháp trọn gói.                  |
| Đoàn MICE check-in / tách bill               | CÓ       | FO-26                               | 8       | Rooming list, express, folio riêng — đúng quy trình.                       |
| Trả phòng + xuất hoá đơn VAT (hoá đơn đỏ)    | MỘT PHẦN | W18 (`Invoice address`, `Tax code`) | 6       | Có từ, không có kịch bản "công ty em cần hoá đơn đỏ lấy ngay".             |
| Nhận đặt phòng lẻ qua điện thoại             | THIẾU    | W12 chỉ có chuyển máy/nhắn          | 3       | Không có chuỗi ngày–loại phòng–giá–bảo đảm thẻ nào.                        |
| Ca đêm: ồn 2h sáng, khách say, no-show       | THIẾU    | chỉ có từ trong bank                | 2       | `Night auditor`, `Drunk guest` tồn tại như từ vựng, không như kịch bản.    |
| **Trung bình FO**                            |          |                                     | **6.9** |                                                                            |

### FB

| Tình huống thật                                  | App có?  | Ở đâu                        | Điểm    | Lập luận                                                                                           |
| ------------------------------------------------ | -------- | ---------------------------- | ------- | -------------------------------------------------------------------------------------------------- |
| Đón khách buffet, kiểm tra voucher, giờ cao điểm | CÓ       | FB-15                        | 9       | Đúng SOP, kể cả "không để khách đứng cạnh line".                                                   |
| Order + dị ứng + kiêng                           | CÓ       | FB-31 L3, FB-37              | 9       | `"Before I take your order, may I check if there's anything you're allergic to?"` — đúng trình tự. |
| Món chậm/nguội/sai/quá chín                      | CÓ       | W27–28 (bank FB)             | 8       | Bank complaints/solutions FB rất đúng đời: `Replace the dish`, `Remove it from the bill`.          |
| Trẻ em + halal + buffet nhiễm chéo               | CÓ       | FB-37                        | 9       | `"Honestly, sir, I would not risk it at a shared buffet."` — trung thực đúng chuẩn an toàn.        |
| Giải thích service charge/VAT trên bill          | CÓ       | W18, W24                     | 8       | `"A ten percent VAT is added."` đúng thực tế bill VN.                                              |
| Kể chuyện món ăn, cà phê Việt                    | CÓ       | FB-31                        | 9       | Phở 8 tiếng, phin 4–5 phút, bạc sỉu — đúng và có hồn.                                              |
| Room service qua điện thoại                      | MỘT PHẦN | W12 + từ `Call room service` | 5       | Không có chuỗi nhận order–nhắc lại–hẹn giờ–thu khay.                                               |
| Khách say tại bar / cắt phục vụ đồ cồn           | THIẾU    | từ `Drunk guest` (W36)       | 3       | Cắt rượu là hội thoại khó, luật bắt buộc, chưa dạy.                                                |
| **Trung bình FB**                                |          |                              | **7.5** |                                                                                                    |

### HK

| Tình huống thật                                | App có?  | Ở đâu                            | Điểm    | Lập luận                                                       |
| ---------------------------------------------- | -------- | -------------------------------- | ------- | -------------------------------------------------------------- |
| Gõ cửa – xin phép dọn – DND                    | CÓ       | HK-15                            | 9       | Đúng nhịp 2 gõ – 10 giây – xưng danh.                          |
| Khách xin thêm đồ (towel, adapter, giường phụ) | CÓ       | HK-15, W9                        | 9       | Kèm giá giường phụ 300.000 VND — đúng bối cảnh.                |
| Giặt là: nhận đồ, express, đền bù              | CÓ       | HK-33                            | 9       | Trần 10x phí giặt + sign-off — đúng SOP thật.                  |
| Côn trùng trong phòng                          | CÓ       | HK-37                            | 9       | Cấm đổ cho khí hậu, đổi phòng trước khi khách đòi.             |
| Lost & Found (ghi nhận, trả đồ, courier)       | CÓ       | HK-37                            | 9       | Quy trình mô tả-trước-khi-cho-xem là chuẩn chống gian.         |
| Phòng chưa sẵn sàng khi khách tới              | CÓ       | mediation FO-26, W25 HK          | 7       | Có ở phía FO; HK có cam kết giờ.                               |
| Bàn giao ca + báo phòng hỏng                   | CÓ       | W21, W29                         | 8       | `Out-of-order list`, `Discrepancy report` đúng từ nghề.        |
| Tranh cãi minibar                              | MỘT PHẦN | W24 từ `Minibar charge`          | 5       | Không có kịch bản "tôi không uống chai đó".                    |
| Khách trong phòng khi đang dọn / đồ giá trị    | CÓ       | W19 (`Never touch`, `Jewellery`) | 7       | Nội quy có; kịch bản khách nghi mất đồ nằm ở HK-37 game — tốt. |
| **Trung bình HK**                              |          |                                  | **8.0** |                                                                |

### SW

| Tình huống thật                        | App có? | Ở đâu                       | Điểm    | Lập luận                                                                 |
| -------------------------------------- | ------- | --------------------------- | ------- | ------------------------------------------------------------------------ |
| Tư vấn liệu trình + khai sức khoẻ      | CÓ      | SW-23                       | 9       | Contraindication + vùng tránh — đúng an toàn nghề.                       |
| Lực tay mạnh/nhẹ, nóng/lạnh trong buổi | CÓ      | W27–28 bank SW              | 8       | `Use a lighter pressure`, `Bring a warm blanket` — đúng các câu ca thật. |
| Giới tính KTV / tôn giáo               | CÓ      | SW-37                       | 10      | Hỏi như thủ tục, ghi hồ sơ, báo sớm khi không xếp được — chuẩn quốc tế.  |
| Tip: có nhận không, bao nhiêu          | CÓ      | SW-37 L3                    | 9       | `"There is really no usual amount, madam."` — đúng chính sách sạch.      |
| An toàn hồ bơi, cờ đỏ, sơ cứu          | CÓ      | SW-19                       | 9       | Trẻ <12, không lặn đầu khu nông, Ext 115.                                |
| Trễ hẹn / trùng lịch / KTV ốm          | CÓ      | W25, SW-37 L2, mediation SW | 9       | Thứ tự đền bù (đổi giờ → +30 phút → hủy miễn phí) rất thật.              |
| Khách đề nghị không đứng đắn           | CÓ      | SW-37 L4                    | 10      | Từ chối + báo quản lý — bảo vệ nhân viên, cực hiếm giáo trình dám dạy.   |
| Bán gói/membership không nài ép        | CÓ      | SW-23 L3                    | 8       | `"Have you considered…?"` đúng tông upsell spa.                          |
| **Trung bình SW**                      |         |                             | **9.0** |                                                                          |

### GR

| Tình huống thật                            | App có?  | Ở đâu                          | Điểm    | Lập luận                                                               |
| ------------------------------------------ | -------- | ------------------------------ | ------- | ---------------------------------------------------------------------- |
| VIP/lounge: quyền lợi, trẻ em, giờ giấc    | CÓ       | GR-27                          | 9       | Đúng vận hành club floor.                                              |
| Sinh nhật/kỷ niệm/cầu hôn + sự cố set-up   | CÓ       | GR-34                          | 9       | Có cả recovery khi sai tên, sai bánh.                                  |
| Khách phàn nàn "mất niềm tin cả khách sạn" | CÓ       | W27 L4, W33                    | 8       | `"I will stay with you until it is solved."` — câu giữ khách đúng lúc. |
| Cấp cứu y tế + bảo hiểm du lịch            | CÓ       | GR-37                          | 9.5     | 115, direct billing, medical report tiếng Anh — chuẩn thật.            |
| Bão/hoãn tour/chuyến bay hủy/khách kẹt     | CÓ       | GR-38                          | 9.5     | Giữ nguyên giá cũ cho khách kẹt — đúng đạo đức nghề tôi dạy.           |
| Review xấu công khai                       | CÓ       | W33 writing GR                 | 8       | Có yêu cầu ghi hồ sơ để chứng minh cải thiện.                          |
| Khách Hàn/Trung/Nga ít tiếng Anh           | THIẾU    | —                              | 3       | Không có chiến lược đơn giản hoá; mediation chỉ chiều Việt→Anh.        |
| Khách đòi gặp GM ngay lập tức              | MỘT PHẦN | W28 `Bring the manager to you` | 6       | Có câu; chưa có kịch bản leo thang đầy đủ.                             |
| **Trung bình GR**                          |          |                                | **7.8** |                                                                        |

### BO

| Tình huống thật                                      | App có?            | Ở đâu                    | Điểm    | Lập luận                                                                                          |
| ---------------------------------------------------- | ------------------ | ------------------------ | ------- | ------------------------------------------------------------------------------------------------- |
| Chào giá corporate + ký hợp đồng                     | CÓ                 | BO-37                    | 9       | Số liệu VND thật, cấu trúc đàm phán thật.                                                         |
| Allotment/release/blackout/hủy                       | CÓ                 | BO-37                    | 9       | Đúng điều khoản đại lý lữ hành VN.                                                                |
| RFP → báo giá → BEO                                  | CÓ                 | BO-38                    | 9       | Đủ vòng đời sự kiện MICE.                                                                         |
| Đối soát hoá đơn, credit note, công nợ               | CÓ                 | W33 bank BO + writing BO | 8       | `Issue a credit note`, `Outstanding balance` — đúng ngôn ngữ kế toán khách sạn.                   |
| Điện thoại nhà cung cấp                              | CÓ                 | W12 + bank               | 7       | Đủ dùng ở mức A1–A2.                                                                              |
| Sự cố hệ thống/overbooking (nói với đối tác)         | CÓ NHƯNG SAI KHUNG | W36                      | 4       | Bank đúng (`Mass cancellation`, `Overbooking crisis`) nhưng khung là sơ tán hoả hoạn — xem mục 2. |
| Họp nội bộ bằng tiếng Anh (chuỗi quản lý nước ngoài) | THIẾU              | —                        | 4       | Ở khách sạn chuỗi quốc tế, BO nói tiếng Anh nhiều nhất trong morning briefing — chưa có.          |
| **Trung bình BO**                                    |                    |                          | **7.1** |                                                                                                   |

**Độ phủ tình huống toàn app: FO 6.9 · FB 7.5 · HK 8.0 · SW 9.0 · GR 7.8 · BO 7.1 —
trung bình 7.7.** Điểm kéo xuống hầu hết nằm ở các tình huống _tần suất cao_ (điện thoại
đặt phòng, ca đêm, khách ít tiếng Anh) chứ không phải tình huống hiếm — đó là lý do tôi
xếp chúng lên đầu danh sách đề xuất.

---

## 4. Tính thực tiễn của tiến độ

Đối chiếu với nhân viên thật tôi từng nhận vào từ con số 0 (phần lớn học 3–6 buổi/tuần,
có ca làm hằng ngày để dùng ngay điều vừa học — đúng giả định "học viên dùng tiếng Anh
hằng ngày trong ca" của ma trận):

| Mốc            | App tuyên bố | Sau checkpoint, ngoài ca thật nhân viên LÀM ĐƯỢC GÌ (đánh giá của tôi)                                                                                                                                                                                                                                                                                                                 | Khớp thực tế?                                                                                                                      |
| -------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Tuần 6 (24h)   | pre-A1       | Chào đúng buổi kèm sir/madam, xưng tên và bộ phận, đọc số phòng kiểu khách sạn ("two-oh-five"), nói giờ mở cửa, giá đơn giản, và 7 chunk sống còn (One moment please / Here you are / This way please / I am very sorry). Đây chính xác là "bộ đồ nghề tuần đầu" tôi vẫn phát cho nhân viên mới.                                                                                       | **Khớp.** 6 tuần để chào–số–giờ–tiền–xin lỗi là nhịp tôi từng thấy ở nhân viên chăm.                                               |
| Tuần 14 (56h)  | A1           | Đáp được yêu cầu đơn giản một lượt ("Can I have…?" → "Of course. I will bring one."), chỉ đường trong khuôn viên, bắt máy xưng danh và chuyển máy, tiếp nhận sự cố đơn giản bằng công thức xin lỗi + hứa hành động. Chưa giữ được hội thoại khi khách nói lệch kịch bản.                                                                                                               | **Khớp** với nhân viên buồng phòng/phục vụ sau ~3 tháng kèm cặp.                                                                   |
| Tuần 22 (88h)  | A2.1         | Chạy được SOP bằng tiếng Anh: dẫn quy trình từng bước, mời/offer, xin và xác nhận thông tin (đọc lại, đánh vần), hướng dẫn ký giấy tờ và nói về phí (service charge/VAT), nêu nội quy kèm lý do, và lần đầu **báo cáo ca bằng quá khứ đơn** — đúng thứ một buổi giao ca cần.                                                                                                           | **Khớp.** Tuần 21 dạy past simple đúng lúc nghề cần nó, không sớm hơn.                                                             |
| Tuần 30 (120h) | A2+          | Đây là mốc "đứng ca được" theo chuẩn của tôi: gợi ý nâng cấp kèm lý do, giải thích phí bằng "because", cam kết thời gian có con số, kéo bộ phận khác vào việc ("Let me check with…"), nhận phàn nàn không cãi, đưa giải pháp có điều kiện, bàn giao ca có sổ. Mediation W26 (nghe note tiếng Việt → nói lại tiếng Anh cho khách) là đúng bài kiểm tra tôi hay làm miệng với nhân viên. | **Khớp, và là phần giá trị nhất của lộ trình.**                                                                                    |
| Tuần 40 (160h) | B1.1         | Người học sẽ _thuộc_ bộ câu của các ca khó (bồi thường, đàm phán, khủng hoảng, hợp đồng) và viết được phản hồi review 2 sao đạt khung 4 ý. Nhưng năng lực _ứng biến_ — nói câu chưa từng thuộc khi khách đi lệch kịch bản — chưa được luyện: W39–40 vẫn chấm theo khớp từ với câu mẫu cố định (speaking-score.ts:96–103 tự thừa nhận role-play mở "không tồn tại").                    | **Khớp một nửa.** Tôi tin họ đạt "B1 tiếp nhận + B1 kịch bản"; tôi KHÔNG tin mọi học viên đạt "B1 sản sinh" chỉ bằng lộ trình này. |

**Mốc "học bao lâu thì bắt đầu dùng được với khách":** theo thiết kế là **tuần 1–2**
(chào hỏi, đánh vần tên, số phòng dùng được ngay trong ca), và **tuần 6** là mốc "sống
sót" trọn vẹn. Điều này khớp kinh nghiệm của tôi: nhân viên số 0 học đúng giáo trình chunk
sẽ dám mở miệng với khách sau 2–4 tuần nếu ca làm cho họ cơ hội lặp lại mỗi ngày.

**Một điểm tiến độ tôi khen riêng:** thang chấm nói tăng dần 60→65→70→75→80% trải đều
P2 thay vì vách 20 điểm ở tuần 15, kèm thông báo trên màn hình khi chuẩn tăng
(SpeakingSuite.tsx:135–143). Người từng đào tạo hàng loạt sẽ hiểu vì sao cái vách cũ giết
động lực học viên yếu — sửa thế này là đúng tâm lý người học đi làm ca.

---

## 5. Register & văn hoá

**Sir/madam:** dùng dày đặc — gần như mọi targetResponse có "sir/madam" ở cuối. So với ca
thật: hơi vượt tần suất (nhân viên giỏi giảm dần sir/madam sau lượt chào và chuyển sang
tên khách), nhưng đây là **lỗi an toàn** — thừa lịch sự không mất khách, thiếu mới mất.
App có mầm cá nhân hoá đúng: GR-27 gọi "Mr. Tran", GR-34 checklist ghi
`"Deliver congratulatory speech (use guest's name)"` (week-content.ts:4496). Nếu nâng
thành nguyên tắc chung ở P3 ("sau khi biết tên, dùng tên") thì đạt chuẩn 5 sao trọn vẹn.
Chấm 8/10.

**Mức trực tiếp/vòng vo:** đúng chuẩn dịch vụ cao cấp: từ chối luôn mở bằng "I am
afraid…", tin xấu luôn kèm lối ra, không bao giờ dừng ở "No". Đặc biệt đúng là các câu
_không_ vòng vo ở chỗ không được vòng vo: an toàn (`"I am sorry, no. Leave your
belongings — safety comes first."` — phase4.ts:1612) và tiền (`"There are no hidden costs
in the…"`). Một chuẩn tôi luôn đòi và app làm được: **không chẩn đoán, không hứa hộ** —
GR-37: `"Đừng hứa điều bạn không biết. Hứa điều bạn kiểm soát được"` (helpTip,
week-content.ts:6119). Chấm 9/10.

Riêng khoản dặn dò qua điện thoại, helpTip BO-37 dạy đúng thói quen tôi bắt nhân viên
sales tập: `"Stress the number and the noun together: 'TEN rooms', 'SEVEN days'"`
(week-content.ts:2317) — số liệu nói qua điện thoại phải được nhấn, vì nghe nhầm allotment
là mất tiền thật.

**Tiền tệ & giá:** hai mặt. Mặt đúng: tuần 4 dạy cả dong (`"Five hundred thousand dong."`,
`"Do you take dong?"` — phase0.ts:1046–1064); các tuần soạn tay dùng VND thật và đúng cỡ
(giường phụ 300.000, cọc 1.000.000/đêm, taxi 380–450k, corporate rate 1.800.000 net, spa
280–350k). Mặt lệch: P0 dạy **dollar trước, dong sau** và neo giá lễ tân bằng USD
(`airport transfer $25`); HK-33 đền bù tính bằng `$20/$80/$150` và ngưỡng duyệt `$50`
trong khi menu giặt là cùng tuần lại là VND — không nhất quán. Ở khách sạn tôi vận hành,
niêm yết và đền bù đều VND (quy định về niêm yết giá bằng đồng Việt Nam), dollar chỉ xuất
hiện khi khách hỏi đổi tiền. Chấm 6.5/10.

**Thị trường khách chính (Hàn/Trung/Nga/Âu-Mỹ) & khách ít tiếng Anh:** dàn khách trong
reading đa quốc tịch thật sự (Tanaka, Nakamura, Petrova, Chen, Iqbal, Sørensen, Okafor,
Aliyeva, Mr. & Mrs. Lee kỷ niệm cưới…), phòng khám GR-37 nói tiếng Hàn/Nhật — có ý thức
thị trường. Nhưng **không có nội dung nào dạy kỹ năng giao tiếp với khách nói tiếng Anh
kém** — trong khi ở resort tôi làm, lượng hội thoại "tiếng Anh đơn giản hai chiều" với
khách Hàn/Trung/Nga nhiều hơn hội thoại với khách bản ngữ. Không có bài về: nói chậm

- câu ngắn khi khách không hiểu, viết số/giờ ra giấy, xác nhận bằng lựa chọn thay vì câu
  hỏi mở, tránh phrasal verb. Mediation chỉ luyện chiều Việt→Anh. Chấm 4/10 — lỗ nặng nhất
  của mục này.

**Khớp thói quen phát âm/nói của nhân viên Việt:** rất tốt. Câu mẫu ngắn, ít idiom, ưu
tiên cấu trúc lặp; helpTip nhắm đúng: âm cuối /s/ /t/, nối âm (`"fi-lout"`, `"sen-di-
tuh-you"`), trọng âm con số (`"TEN rooms, SEVEN days — this avoids confusion on the
phone"` — week-content.ts:2317). Cặp rude/polite mô phỏng đúng interlanguage Việt. Chấm
9/10. Ghi chú kỹ thuật: chấm nói bằng khớp từ + LCS nên phát âm sai mà speech recognition
vẫn đoán đúng từ thì vẫn qua — app đo "nói ra đúng từ" chứ chưa đo "phát âm chuẩn"; chấp
nhận được ở quy mô này nhưng đừng quảng cáo là chấm phát âm.

---

## 6. Các ma trận điểm (tổng hợp)

### Ma trận A — theo bộ phận (chi tiết ở mục 2)

|                                | FO      | FB      | HK      | SW      | GR      | BO      |
| ------------------------------ | ------- | ------- | ------- | ------- | ------- | ------- |
| Nội dung sinh P0–P2            | 8       | 8       | 7.5     | 8       | 7       | 7.5     |
| Nội dung sinh P3–P4            | 7       | 7.5     | 6.5     | 7       | 6.5     | 5.5     |
| Tuần soạn tay                  | 9       | 9       | 9       | 9       | 9       | 9       |
| Độ phủ tình huống thật (mục 3) | 6.9     | 7.5     | 8.0     | 9.0     | 7.8     | 7.1     |
| **Tổng bộ phận**               | **8.0** | **8.0** | **7.5** | **7.5** | **7.0** | **6.5** |

Lập luận chấm cột "P3–P4": mọi bộ phận dùng chung khung; điểm chênh nằm ở mức độ bank của
bộ phận đó "chịu được" khung. FB/FO chịu tốt (đồ ăn, phòng ốc vốn là danh từ cụ thể); BO
chịu kém nhất vì bản chất công việc không phải guest-facing (bằng chứng W31/W36/W39 ở
mục 2); HK/GR dính các từ cụm-động-từ/trừu-tượng đứng nhầm slot.

### Ma trận B — theo phase

| Phase      | Điểm    | Lập luận riêng của ô                                                                                                                                                                                                                                                                                                                                                   |
| ---------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0 (1–6)   | **8.5** | Chunk đúng, phủ đúng "bộ sống còn"; trừ 1 vì FO check-in "close at eleven" (sai thực tế 24/7) và giá neo USD trước VND; trừ 0.5 vì một số câu game quá dễ đoán (đáp án dài nhất).                                                                                                                                                                                      |
| P1 (7–14)  | **8.0** | Substitution drill đúng phương pháp cho A1 và tự luyện được ở nhà qua Sổ tay; trừ vì cụm lỗi W9: `"Some taxi, please."`, `"Is my slippers ready?"` — sai đúng chỗ đang dạy mạo từ/số nhiều (phase1.ts:612,699).                                                                                                                                                        |
| P2 (15–22) | **8.0** | Chức năng tuần nào cũng là việc thật (SOP, offer, giấy tờ, nội quy, tư vấn, quá khứ báo cáo); 4 tuần soạn tay nằm đúng slot. Trừ vì cụm W16/W18: "table service and service", "the extra chairs is", "The consumed is on file", "add to the account", chữ thường đầu câu hàng loạt từ `wt()` (`"the welcome drink is free for our guests."`).                          |
| P3 (23–30) | **8.5** | Phase hay nhất: LAST, first conditional đúng nghĩa recovery, mediation W26 là nhiệm vụ thật nhất app; reading kể chuyện dịch vụ có nghề (khách hạ giọng khi nhân viên hạ giọng). Trừ vì vài ô bank lệch (SW-24 "hotel late arrival policy", W21-kiểu "One booking was called" ngay trước đó).                                                                          |
| P4 (31–40) | **6.5** | Ý tưởng tuần đúng (storytelling→cá nhân hoá→bồi thường→đàm phán→khủng hoảng→B2B) và 12 tuần soạn tay ở đây rất mạnh; nhưng mật độ câu sinh vô nghĩa cao nhất (feather allergy, market position, nobody hurt by the medical call, khung sơ tán cho BO, W39 pitch-côn-trùng), và "open role-play" không mở — phase gánh tuyên bố B1.1 lại là phase yếu nhất về sản sinh. |

### Ma trận C — theo tiêu chí thực dụng vận hành

| Tiêu chí                                         | Điểm    | Lập luận riêng của ô                                                                                                                                                                                                                        |
| ------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Tính dùng ngay được trong ca (day-one usability) | **9**   | W1–6 phát đúng "bộ đồ nghề" tuần đầu; mỗi tuần có khung vàng ghi rõ "thay từ của bộ phận bạn vào để tự luyện" — nhân viên dùng được ngay tối hôm học.                                                                                       |
| Độ an toàn khi nói sai / nói máy móc             | **7**   | Đa số câu mẫu là câu an toàn (không hứa quá thẩm quyền, không chẩn đoán, chuyển cấp đúng); trừ vì lớp câu sinh lỗi ở P3–P4 — học viên máy móc sẽ bê nguyên "feather allergy"/"add to the account" ra ca.                                    |
| Độ phủ ca ngày                                   | **8**   | Check-in, buffet sáng, dọn phòng, spa, lounge, sự kiện — đủ.                                                                                                                                                                                |
| Độ phủ ca đêm                                    | **4**   | Không có kịch bản đêm nào: ồn giữa đêm, khách say, an ninh đêm, night audit. Từ vựng có, tình huống không.                                                                                                                                  |
| Phù hợp người học làm ca (cơ chế)                | **9**   | 4 bài học/tuần ~ 4h; cooldown 20 phút "cố ý giữ ngắn vì học viên làm theo ca"; fail-open thiết bị; streak tính theo ngày có học thật chứ không theo mở app (academy-store.ts:334).                                                          |
| Đo lường trung thực (chống học vẹt/ăn may)       | **8**   | AND viết+nói, sàn từng kỹ năng, không lộ câu mẫu khi thi nói, đề trộn từ cả phase; trừ vì phần nghe của checkpoint lấy đúng game rounds đã luyện, và QA tự đo 29% câu game có đáp án đúng dài nhất — người tinh ý đoán được không cần nghe. |
| Phát âm & đặc thù người Việt                     | **9**   | Xem mục 5; hệ thống nhất quán từ helpTip tới rude-lines tới tốc độ headword chậm hơn câu 0.1 để nghe rõ phụ âm cuối (phases.ts:151).                                                                                                        |
| Tiền tệ & bối cảnh giá VN                        | **6.5** | VND đúng ở mọi tuần soạn tay; USD dẫn dắt ở P0 và HK-33 — cần chuẩn hoá.                                                                                                                                                                    |
| Thị trường khách & khách ít tiếng Anh            | **4**   | Xem mục 5 — thiếu tuyến kỹ năng quan trọng nhất với cơ cấu khách VN hiện tại.                                                                                                                                                               |
| Luyện sản sinh (nói/viết câu của chính mình)     | **4**   | 2 nhiệm vụ thật/40 tuần/bộ phận (mediation W26, writing W33) — đều được chấm bằng scorer chống nhồi từ khoá tử tế (writing-score.ts), nhưng số lượng quá mỏng để đỡ tuyên bố B1.                                                            |
| Ôn tập & giữ nhớ                                 | **9**   | Giãn cách mở rộng 1-tuần/3-tuần/quét-phase-cũ, SM-2-lite hệ số 2.2 trần 60 ngày, seed khi hoàn thành (không đợi mastered) — đúng cho người quên nhanh nhất.                                                                                 |

### Ma trận D — chất lượng câu render theo lớp nội dung (ước lượng từ 12 tuần dump × 6 bộ phận)

| Lớp nội dung     | Tỷ lệ câu tôi đánh giá "nói ra ca được ngay" | Ghi chú                                                                                           |
| ---------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| P0–P1 sinh       | ~95%                                         | Lỗi chủ yếu cục bộ ở W9 (mạo từ "Some", "Is my slippers").                                        |
| P2 sinh          | ~90%                                         | Cụm lỗi W16/W18 + chữ thường đầu câu `wt()`.                                                      |
| P3 sinh          | ~92%                                         | Sạch hơn P2 nhờ contract chặt; sót "hotel late arrival policy", "One booking was called".         |
| P4 sinh          | ~80–85%                                      | Mật độ lỗi cao nhất; các câu hỏng lại rơi đúng tình huống hệ trọng (y tế, khủng hoảng, đàm phán). |
| 19 tuần soạn tay | ~99%                                         | Tôi chỉ bắt được lỗi cực nhỏ (khoảng trắng đôi FO-17 mà QA cũng tự bắt).                          |

---

## 7. Verdict tổng — trả lời câu hỏi trung tâm

**Có — tới tuần 30 (A2+), tôi tin lộ trình này làm được điều nó hứa, và làm tốt hơn phần
lớn khoá dạy tiếng Anh khách sạn tôi từng mua cho nhân viên.** Một người từ số 0, đi đúng
nhịp 4h/tuần và có ca làm để dùng ngay, sau tuần 6 sẽ dám mở miệng đúng chunk; sau tuần
14 đáp được yêu cầu một lượt; sau tuần 22 chạy được SOP; sau tuần 30 xử lý được ~80% các
lượt giao tiếp lặp lại hằng ngày của vị trí entry trong cả 6 bộ phận, bằng câu an toàn,
đúng register 5 sao, có phản xạ xin lỗi–hành động–chốt thời gian. Cấu trúc lặp + ôn xoáy
vòng + sàn kỹ năng + bắt buộc nói ở checkpoint là những lý do tôi tin, chứ không phải tin
lời quảng cáo.

**Ở đoạn tuần 31–40, câu trả lời chỉ còn là "một nửa có".** App trao cho học viên _bộ
câu_ của các ca khó (bồi thường, đàm phán, khủng hoảng, B2B) — nhiều câu trong đó, nhất
là ở 12 tuần soạn tay, đạt chuẩn thương mại. Nhưng năng lực làm nên B1 thật ngoài ca —
tự ghép câu chưa từng thuộc khi khách đi lệch kịch bản — chưa được luyện (2 nhiệm vụ sản
sinh/40 tuần) và chưa được đo ("open role-play" tuần 39–40 vẫn là đọc khớp câu mẫu). Cộng
thêm lớp câu sinh lỗi tập trung ở chính P4, tôi kết luận: **đầu ra thực tế là "thành thạo
theo kịch bản" (script-competent) ở band B1-tiếp-nhận, chứ chưa phải "căn bản thành thạo
giao tiếp" theo nghĩa ứng biến độc lập.** Với môi trường 4–5 sao VN: đủ để đứng ca mọi vị
trí entry có giám sát từ khoảng tuần 22–30, đủ để tự xử lý các ca thường quy; ca khó vẫn
cần người kèm — và điều đó, công bằng mà nói, cũng đúng với nhân viên học trung tâm 2 năm.

**Điểm tổng toàn app: 7.5/10** — "dùng được, cần sửa nhỏ" ở phần lõi, nhưng nhóm lỗi
P3–P4 và lỗ "khách ít tiếng Anh" phải sửa trước khi mở rộng quy mô hoặc gắn nhãn B1.1
lên chứng nhận đầu ra.

---

## 8. Đề xuất cải thiện — xếp theo tác động vận hành (sửa cái gì trước thì khách được phục vụ tốt hơn NGAY)

1. **[1–2 ngày công] Quét và thay ~25 từ bank gây câu vô nghĩa/phản nghiệp vụ ở P2–P4.**
   Danh sách tối thiểu, mỗi mục đã ghi vị trí ở mục 2: FO `Feather allergy` (slot
   preferences-lặp-lại), GR `Dietary restriction` (cùng lỗi "would you like the same…"),
   BO `Market position` + `Guest satisfaction score` (slot story — vi phạm chính
   phase4-bank-contract.md:30), GR `Add to the account`, HK `Consumed`, FB `Sign here`,
   HK `Hand in`, BO `Attach` (slot paperwork-danh-từ), FB `Table service` (đụng "and
   service"), BO `Extra chairs` (hợp số), GR `Welcomed` (slot reports+“it”), W21 slot
   `e3` cho 4 bộ phận ("One booking was called/found/delivered/paid"). Đây là việc rẻ
   nhất với tác động tức thì: **nhân viên ngừng học thuộc câu sai**.

2. **[3–5 ngày] Cho BO một bộ khung W31/W36 riêng và sửa khung "Nobody has been hurt
   by the {sự cố y tế}".** BO kể chuyện cho ĐỐI TÁC (site inspection, testimonial) chứ
   không phải cho khách nghỉ; khủng hoảng của BO là thương mại (không sơ tán, không "use
   the stairs"). Khung W36 lesson 1 cần nhánh: sự cố y tế → "The guest is being looked
   after"; sự cố kỹ thuật → "Nobody has been hurt". Sửa luôn `taughtIn()` W39 lesson 4:
   lấy từ _đúng chủ đề pitch_ thay vì 2 từ đầu của override (hết "explain the insect",
   "open with the typhoon").

3. **[1–2 tuần] Thêm tuyến "Khách nói tiếng Anh hạn chế" — 1 bài/bộ phận ở P2 + 1
   mediation chiều ngược.** Nội dung: câu ngắn + từ lõi, viết số/giờ/giá ra giấy, xác
   nhận bằng hai lựa chọn, tránh phrasal verb, kiểm tra hiểu hai chiều; tình huống mẫu:
   khách Hàn lớn tuổi ở buffet, đoàn Trung Quốc check-in, gia đình Nga ở hồ bơi. Với cơ
   cấu khách VN hiện nay, một bài này đáng giá bằng ba bài B2B.

4. **[1–2 tuần] Nâng số nhiệm vụ sản sinh từ 2 lên tối thiểu 6/bộ phận** (1/phase từ P1):
   mediation thêm ở W13 (báo sự cố đơn giản) và W28 (đưa 2 lựa chọn); writing thêm ở W25
   (tin nhắn hứa thời gian cho khách) và W38 (email xác nhận). Scorer hiện có
   (`scoreFreeText`) tái dùng được ngay — đây là con đường ngắn nhất để chữ B1.1 trên
   chứng nhận thành thật. Song song: đổi tên tuần 39–40 trên UI từ "Open Role-play"
   thành đúng bản chất ("Tổng duyệt câu mẫu dài") cho tới khi có bộ chấm role-play thật.

5. **[2–4 ngày] FO: viết 2 kịch bản còn thiếu tần suất cao** — (a) nhận đặt phòng lẻ qua
   điện thoại (ngày–loại phòng–giá–bảo đảm thẻ–xác nhận email), tái dùng frame W12+W17;
   (b) gói ca đêm: ồn 2h sáng ("I will call the room and move you if it continues"),
   khách say ở sảnh, no-show giải thích sáng hôm sau. Sửa đồng thời fact sai W3:
   check-in `open two / close eleven` → "The front desk is open 24 hours" (đổi service
   của FO trong LEXICONS sang ví dụ khác, vd. airport transfer desk).

6. **[1 ngày] Chuẩn hoá tiền tệ VND-trước:** P0 W4 đảo thứ tự bài (dong trước, dollar
   như ngoại lệ); HK-33 đổi mốc đền bù sang VND (giữ logic 10x phí giặt); giữ nguyên các
   tuần soạn tay đã đúng VND.

7. **[0.5 ngày] Vá lỗi trình bày do khung:** viết hoa đầu câu cho `wt()`/`lo()` khi từ
   đứng đầu (`"the welcome drink is free…"` → `"The welcome drink…"`); bỏ "(RFP)" khỏi
   headword BO khi render vào câu nói; cân độ dài đáp án game (QA đã tự đo 29% — thêm
   gate chặn chênh lệch độ dài là xong).

8. **[Nhẹ, nâng chuẩn] Dạy quy tắc "biết tên thì dùng tên"** thành một grammar-pair chính
   thức ở W23 hoặc W32 (hiện chỉ nằm rải rác ở GR) — đây là ranh giới giữa "lịch sự" và
   "5 sao" mà khách nhận ra ngay; và đưa 60 headword chưa bao giờ được ôn (verify:content
   liệt kê, vd. `FO:how may i help`, `FO:boarding pass`) vào pool ôn của P2+.

---

_Báo cáo lập ngày 2026-08-03. Mọi trích dẫn tiếng Anh trong tài liệu này được copy nguyên
văn từ mã nguồn hoặc từ output `bun scripts/dump-week.ts` (câu render thật mà học viên
nhìn thấy), kèm vị trí file:dòng hoặc mã tuần để đối chiếu._
