# Backlog sửa lỗi — Đánh giá học thuật 2026-08

Kèm theo `docs/academic-review-2026-08.md`. Mỗi mục ghi: bằng chứng, phạm vi ảnh hưởng, hướng sửa.

**Phân hạng:**

- **P0** — dạy sai tiếng Anh hoặc sai phản xạ nghiệp vụ cho người học. Chặn triển khai.
- **P1** — sai lệch so với chuẩn CEFR hoặc so với chính spec đã cam kết.
- **P2** — thiếu hụt động lực / trải nghiệm khiến người học bỏ cuộc.
- **P3** — liêm chính dữ liệu, dọn dẹp, nợ kỹ thuật.

**Nguyên tắc sửa xuyên suốt:** sửa ở **khung câu trong generator**, không sửa từng câu trong output. Một khung hỏng sinh ra 4–5 lỗi (vì cùng một câu được chép vào ngữ cảnh từ vựng, câu `polite`, câu đích luyện nói, bài đọc, và đáp án trò chơi) và lan sang nhiều bộ phận.

---

## Trạng thái

**P0: 5/5 xong. P1: 10/12 xong** — P1-1, P1-2, P1-3, **P1-4**, P1-7, P1-9, P1-10, **P1-11**,
P1-12.

Còn đúng **hai** mục P1:

| Mục      | Việc                                            | Trạng thái                      |
| -------- | ----------------------------------------------- | ------------------------------- |
| **P1-5** | Viết & phiên dịch chỉ 1 tuần/khoá mỗi thứ       | chờ quyết                       |
| **P1-6** | Luyện sản sinh quá mỏng (2 nhiệm vụ/40 tuần)    | chờ quyết                       |
| **P1-8** | Tuần 3–6 phân hoá 0% (giá USD **đã sửa** 24/08) | một nửa xong — xem ghi chú dưới |

**P1-8 ĐÓNG (29/08).** Người dùng chốt phương án B và không chọn C — tuần 3–6 dùng chung từ vựng là thiết kế chấp nhận được cho pre-A1. Đã làm: đảo VND lên dẫn dắt, giữ một
bài quy đổi USD. Tuần 4 bài 1 đổi từ "Prices in Dollars" sang "Prices in Dong"; bài 3 từ
"Vietnamese Dong" thành "When a Guest Asks in Dollars" — dạy nói `about` vì tỷ giá thay đổi
hằng ngày, và dạy rằng hoá đơn vẫn là tiền đồng. Tuần 1–6 giờ nghiêng về đồng (54 so với 36).
Thêm `vnd`/`vndWord` vào `LEXICONS.priced` và helper `capFirst()` vì số tiền VND hay đứng
đầu câu. Phương án C (khung giao dịch riêng từng bộ phận) được đưa ra và KHÔNG được chọn — ghi lại để không ai coi đây là thiếu sót.

Hai mục vừa đóng ngày 23/08, theo cách khác với đề xuất ban đầu:

- **P1-4** đóng bằng vế thứ hai của chính nó ("sửa spec cho khớp thực tế"): hạ nhãn phase 4
  từ `B1.1` xuống `A2+ · tiếp xúc B1.1`. Khôi phục nhãn cũ đòi **xây phép đo trước**.
- **P1-11** đóng bằng cách hạ mục tiêu `560–620` → `≥510` **kèm GATE 5 canh** (sàn 500),
  thay vì soạn thêm ~55 từ mỗi bộ phận. Con số 560 chưa từng có căn cứ và chưa từng có gate.

P2 (12 mục) và P3 (6 mục) vẫn còn nguyên. Chi tiết ở hai phần "Đã sửa" cuối tài liệu.

Hai con số trong báo cáo cần đính chính sau khi rà lại từng trường hợp:

- **Lỗi đại từ: 18 chỗ, không phải 57.** Phép đếm ban đầu quét "tên nhân vật nữ + he/his trong cùng câu", nên gộp cả những chỗ `he` chỉ **vị khách** — hợp lệ, vì khách trong các đoạn này được xưng "sir". Số chỗ thật sự trỏ về nhân viên là 18.
- **Tuần 36 không hỏng ở cấp câu.** Câu khách hỏi ở tuần 36 vốn trung tính ("Control room. What is the situation?"), nên từng câu đều mạch lạc. Lỗi thật của tuần 36 là **một cảnh dùng bốn ô sự cố khác nhau như thể cùng một sự việc** (báo cáo dị ứng → trấn an về nhiễm nước hồ bơi → kết thúc bằng sự cố ngất trong phòng xông). Lỗi an toàn nghiêm trọng chỉ nằm ở **tuần 39**.

---

## P0 — Chặn triển khai

### P0-1. Bài học khủng hoảng dạy đáp lại sai sự cố

**Bằng chứng.** `src/lib/content/phase4.ts:2354-2357` ghép cứng câu khách _"There is smoke in the corridor and our guests are panicking!"_ với câu đáp lấy từ `lx.bank.emergencies[0]` — vốn là tên sự cố riêng của từng bộ phận:

| Bộ phận | Câu đáp mẫu                                                                    |
| ------- | ------------------------------------------------------------------------------ |
| FO      | "There is a **medical call** at the property. Please stay calm and follow me." |
| HK      | "There is a **water leak** at the property…"                                   |
| SW      | "There is a **severe allergic reaction** at the property…"                     |
| GR      | "There is a **guest collapse** at the property…"                               |
| BO      | "There is a **cash shortage** at the property…"                                |

Chỉ FB ("kitchen fire alarm") là tương thích. Cùng gia đình khung này (`phase4.ts:1416-1456`, `1615-1638`, `2344-2356`) sinh ra **78 câu mẫu** ở tuần 36 và 39. Tuần 36 GR còn có: khách hỏi _"Is it finally over? Can we go back up?"_ sau sơ tán → đáp _"The **flight cancellation** has been fully resolved."_

**Ảnh hưởng.** 5/6 bộ phận, 78 câu mẫu, ở đúng bài dạy xử lý tình huống khẩn cấp.

**Hướng sửa.** Thêm một ô `fire`/`evacuation` dùng chung cho cả 6 bộ phận vào `emergencies` bank (`docs/phase4-bank-contract.md` dòng 15) và trỏ khung tuần 39 vào ô đó. Hoặc: sinh câu khách từ chính `emergencies[0]` thay vì ghép cứng "smoke in the corridor". Áp cùng cách cho khung `The {e13} has been fully resolved` (`phase4.ts:1615`).

---

### P0-2. Khung câu điền sai loại ngữ nghĩa — 216 câu mẫu

**Bằng chứng.** Đếm trên toàn bộ 240 tuần:

| Khung                                                 | Số câu | Vị trí generator                 | Ví dụ                                                                                                                                                           |
| ----------------------------------------------------- | ------ | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `I am ready for the {X}`                              | 60     | phase3/phase4                    | "I am ready for the flight time."                                                                                                                               |
| `Based on your {X}, I would suggest a quieter option` | 48     | `phase4.ts:341-410`, `2210-2261` | Khách: "I am a very light sleeper" → FB: "Based on your **spice tolerance**…" · BO: "…your **preferred billing cycle**…" · GR: "…your **preferred newspaper**…" |
| `The {X} taught me the most`                          | 30     | phase4 (tuần 40)                 | "The kitchen capacity taught me the most."                                                                                                                      |
| `{X} is part of my daily work now`                    | 24     | phase4 (tuần 40)                 | "The booking amendment is part of my daily work now."                                                                                                           |
| `The {X} will not happen again`                       | 18     | phase3                           | "The turndown time will not happen again, madam."                                                                                                               |
| `I can explain the {X} to any guest`                  | 18     | phase4 (tuần 40)                 | "I can explain the repeat guest to any guest."                                                                                                                  |
| `It would {X} nicely`                                 | 1      | `phase2.ts:1372`                 | "It would environment nicely."                                                                                                                                  |
| `I would suggest {X}, because…`                       | 1      | `phase2.ts:1362-1372`            | "I would suggest the guest decision, because it is popular."                                                                                                    |

Với khung `Based on your {X}`: 4/6 bộ phận nhận ô điền vô nghĩa (chỉ FO "pillow firmness" và HK "preferred pillow type" hợp lý).

**Hướng sửa.** Bổ sung **ràng buộc loại ngữ nghĩa cho từng ô** vào bank contract (`docs/phase3-bank-contract.md`, `phase4-bank-contract.md`): mỗi ô khai báo loại chấp nhận (`preference` / `incident` / `document` / `fee` / `task` / `skill`), và generator từ chối điền chéo loại. Với các khung tuần 40, thay bằng khung nhận **kỹ năng** thay vì danh từ nghiệp vụ bất kỳ.

---

### P0-3. Câu mẫu ĐÚNG chứa lỗi ngữ pháp

Các câu dưới đây nằm ở trường `grammar.polite`, `vocabulary.context` hoặc `speaking.targetResponse` — tức nội dung học viên phải ghép lại, đọc theo và ghi nhớ. (Trường `grammar.rude` là câu sai cố ý, không tính.)

| Vị trí                        | Câu                                                                                                                                                                                                                                       | Lỗi                                                                                      |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| Tuần 11, 5 bộ phận (`polite`) | "He **make the beds the room** every day." (HK) · "He **meet the guests the room** every day." (GR) · "He **massages the room** every day." (SW) · "He **serves the room** every day." (FB) · "He **check ins the room** every day." (FO) | Sai chia ngôi ba + thừa tân ngữ                                                          |
| BO-21 (`polite`, ×4)          | "**It checked the figures than usual**, sir."                                                                                                                                                                                             | Ô động từ ghi đè khung "took longer than usual"                                          |
| BO-21 (`polite`, ×4)          | "**I signed the supervisor** this afternoon."                                                                                                                                                                                             | "informed" bị thay bằng "signed"                                                         |
| BO-21 (`vocab`)               | "The guest **received** at noon."                                                                                                                                                                                                         | Ngoại động từ thiếu tân ngữ                                                              |
| SW-18 (×5)                    | "A ten percent **duration** is added, madam."                                                                                                                                                                                             | Ô "service charge" bị điền bằng "duration"; đáp án tiếng Việt lan lỗi thành "Thời lượng" |
| SW-18 (`polite`, ×3)          | "One moment, please. **The system is confirmed**."                                                                                                                                                                                        | Vô nghĩa                                                                                 |
| SW-29 (×5)                    | "Everything has been recorded in the **locker key count**."                                                                                                                                                                               | "count" không phải nơi lưu hồ sơ                                                         |
| GR-20 (`polite`+`target`, ×3) | "Would you prefer **the lounge or room or the early or late**?"                                                                                                                                                                           | Hai mục từ vựng va nhau trong một khung                                                  |
| GR-20 (`vocab`)               | "The **something local** is fine, sir."                                                                                                                                                                                                   | Định từ + đại từ                                                                         |
| FB-13 (`vocab`)               | "The **pipe is overcooked**." · "The **machine is unhappy**."                                                                                                                                                                             | Tính từ nấu ăn gán cho ống nước/máy móc                                                  |
| HK-12 (`vocab`+`polite`)      | "Let me **send up** for you."                                                                                                                                                                                                             | Cụm động từ thiếu tân ngữ                                                                |
| Tuần 10 (4 câu)               | "This one is **more empty**." · "This one is **more bright**."                                                                                                                                                                            | Sai dạng so sánh hơn của tính từ một âm tiết                                             |
| Tuần 10 (2 câu)               | "It is **a little safe**."                                                                                                                                                                                                                | Vô nghĩa                                                                                 |

**Hướng sửa.** Sửa khung sinh của từng nhóm; riêng nhóm tuần 10 cần bổ sung quy tắc chọn dạng so sánh theo số âm tiết vào generator phase 1.

---

### P0-4. Lỗi đại từ theo giới của nhân vật — 57 câu

**Bằng chứng.** FB/SW/GR dùng nhân vật nữ (Linh, Mai, Trang) nhưng khung vẫn xuất `he/him/his`: _"Linh shows **his** log"_, _"Mai answers… **He** asks"_, _"The trainer signs **him** off as ready"_ (Trang). Nặng nhất, FB-7 dạy nguyên văn:

> "This is my colleague. **He is our waitress.**"

`phase0.ts` có trường `pron` kèm chú thích cho biết lỗi này từng được sửa — bản sửa chưa lan tới mọi khung.

**Hướng sửa.** Bắt buộc mọi khung có đại từ phải đọc từ `lx.pron`; thêm gate chặn `he|him|his` xuất hiện trong cùng câu với tên nhân vật nữ.

---

### P0-5. Trò chơi chấm ngược ở tuần cao — trừ điểm câu trả lời đúng

**Bằng chứng.** Từ khoảng tuần 24, phương án nhiễu trở nên trôi chảy và đúng nghiệp vụ, còn đáp án được đánh dấu đúng lại hỏng. FO-24: khách hỏi _"Is that included, or do I pay extra?"_ → đáp án _đúng_ theo hệ thống là "There is a small **cancellation fee** for that, madam." (sai loại phí); phương án bị chấm sai — "That depends on which package you booked, madam." — mới là câu chuẩn. FB-32 tương tự: đáp án đúng là câu "spice tolerance" hỏng, còn "Most of our rooms are actually fairly quiet, madam." bị chấm sai.

`qa-full.ts` đã đo được triệu chứng (27% game round có một phương án đúng dài hơn hẳn) nhưng không kết luận được là chấm ngược.

**Hướng sửa.** Sau khi xong P0-2, rà lại toàn bộ game round từ tuần 24 trở đi; thêm gate yêu cầu phương án nhiễu phải sai **về nghi thức hoặc ngữ pháp**, không được chỉ khác về nội dung.

---

## P1 — Sai lệch CEFR / sai lệch spec

### P1-1. Thang tốc độ nghe chưa từng được lập trình

`docs/curriculum-level-matrix.md:108` cam kết 0,7 → 0,75 → 0,8 → 0,85–0,9 → 0,9 theo phase. `src/components/suites/ListeningSuite.tsx:44` đặt cứng `u.rate = 0.8 + Math.random() * 0.2` cho mọi tuần. Người học tuần 1 nghe cùng tốc độ với tuần 40.
**Sửa:** thêm hàm `rateForWeek(week)` trong `phases.ts`, dùng ở cả `ListeningSuite` và `WeekTestSuite` (bản sao `speakVaried` ở `WeekTestSuite.tsx:76` cũng cần cùng thang).

### P1-2. Quiz từ vựng bỏ sót phần lớn từ mới

`VocabSuite.tsx:39-41`: `const pool = [...terms, ...reviewWords]; shuffle(pool).slice(0, MAX_MCQ)`. Hồ ôn phình theo tuần (FO-35: 18 từ mới + 51 từ ôn = 69), nên số từ mới lọt vào bài 12 câu chỉ còn:

| Phase | Hồ  | Từ mới kỳ vọng | % từ mới được kiểm tra |
| ----- | --- | -------------- | ---------------------- |
| P0    | 21  | 7,1            | 76%                    |
| P1    | 31  | 5,0            | 46%                    |
| P2    | 44  | 3,9            | 31%                    |
| P3    | 62  | 3,3            | 22%                    |
| P4    | 71  | 3,3            | **20%**                |

**Sửa:** phân bổ cố định — bảo đảm tối thiểu 8/12 câu lấy từ `terms` (từ mới của tuần), phần còn lại từ `reviewWords`. Hoặc nâng `MAX_MCQ` theo phase.

### P1-3. Chuẩn "đạt" không thể chạm tới ở phase 0

- `VocabSuite.tsx:34` `MASTERY_PCT = 80` trên bài 13 câu (10 trắc nghiệm + 3 chính tả) đòi 11 câu đúng. Đúng trọn phần trắc nghiệm mà trượt cả chính tả = 76,9% = trượt. Chấm chính tả là so khớp chuỗi tuyệt đối (`VocabSuite.tsx:161`), không dung sai.
- `ListeningSuite.tsx:139-141` chấm câu điền theo `tokens.every(...)` — đúng hết hoặc không điểm, dù có tới 3 chỗ trống. Trần thực tế của người mới học là 50%, chuẩn đòi 80%.
- `GrammarSuite.tsx:90` đạt chuẩn = giải sạch **100%**. `SpeakingSuite.tsx:97` và `ReadingSuite.tsx:76` đòi qua **mọi** mục.

**Sửa:** (a) `MASTERY_PCT` theo phase — 70 cho P0–P1, 75 cho P2, 80 từ P3. (b) Cho điểm thành phần theo từng chỗ trống ở câu điền. (c) Giảm còn 1 câu chính tả ở P0–P1 và chấp nhận sai lệch 1 ký tự. (d) Ngữ pháp đạt chuẩn ở `⌈0,8n⌉` câu giải sạch.

### P1-4. Tuần 40 không phải bài thi cuối khoá

`curriculum-level-matrix.md:250` hứa "Đánh giá cuối khoá — mock role-play + weektest toàn lộ trình". Thực tế là 4 bài tự phản ánh, với câu mẫu chính là các khung hỏng ở P0-2. Cửa gác vẫn là bài 20 câu + 5 câu nói giống hệt tuần 6/14/22/30.
**Sửa:** hoặc dựng bài thi tổng kết thật (rút đề từ cả 5 phase, thêm phần role-play mở nhiều lượt), hoặc sửa spec cho khớp thực tế. Không được để hai tài liệu mâu thuẫn.

### P1-5. Kỹ năng viết không được đo, và gần như không được dạy

Writing xuất hiện ở 6/240 dep-week (chỉ tuần 33), Mediation 6/240 (chỉ tuần 26). Không kỹ năng nào nằm trong bất kỳ bài sát hạch nào (`CHECKPOINT_MIX` chỉ có vocab/grammar/listening/reading). Chính spec gọi mediation là "tác vụ B1 phổ biến nhất trong khách sạn VN".
**Sửa:** thêm ít nhất 1 tuần writing/mediation cho mỗi phase từ P2 trở đi; đưa một mục viết ngắn vào checkpoint từ tuần 22.

### P1-6. Luyện sản sinh quá ít so với yêu cầu A2

1.296/1.368 (94,7%) speaking item chấm theo câu mẫu cố định; chỉ 3,1% yêu cầu học viên đặt câu hỏi lấy thông tin. `Could you please…` xuất hiện đúng 6 lần trong 40 tuần; `will be + V-ing` không có lần nào.
**Sửa:** thêm dạng bài "hỏi lấy thông tin" (khách đưa tình huống, học viên phải hỏi lại) vào mỗi tuần từ phase 1; mở rộng ngưỡng chấm mở (`passThresholds`) sang các tuần tổng duyệt của từng phase, không chỉ tuần 39–40.

### P1-7. Vách ngưỡng chấm nói ở tuần 15

`speaking-score.ts:86-91` nhảy từ `{60%, 0.4}` (tuần ≤14) lên `{80%, 0.6}` (tuần 15) trong một bước, đúng lúc nội dung cũng nhảy bậc (từ vựng 10→13,3; speaking 4→6,7; bài đọc 86→129 từ). Không có cảnh báo nào.
**Sửa:** dốc dần qua tuần 15–18 (65/70/75/80) và thêm màn hình chuyển tiếp ở tuần 15, 23, 31.

### P1-8. Tuần 3–6 không phân hoá theo bộ phận

`verify-content.ts` tự báo: tuần 3, 4, 5, 6 = **0%** đặc thù bộ phận (tuần 1: 10%, tuần 2: 40%). Nhân viên buồng phòng, spa, back-office đều học "Cash or card, sir?" và "It is twenty dollars, sir." Giá yết bằng USD trong khi giao dịch tại Việt Nam phải bằng VND.
**Sửa:** thay ngữ cảnh giao dịch của tuần 4 theo bộ phận (HK: đếm khăn/đồ vải; SW: thời lượng liệu trình; BO: số lượng phòng) và chuyển toàn bộ giá sang VND, giữ một bài về quy đổi USD.

### P1-9. Ghép chip quá dài trên điện thoại

232/1.943 câu ngữ pháp (12%) tạo hơn 12 chip; 112 câu (6%) từ 15 chip trở lên; dài nhất HK-33 với 23 chip. `qa-full.ts` đã cảnh báo 14 trường hợp, chưa xử lý.
**Sửa:** trần cứng 12 chip cho bài ghép; câu dài hơn chuyển sang dạng bài khác (điền chỗ trống hoặc chọn đáp án).

### P1-10. Câu hỏi đọc hiểu bằng tiếng Anh chỉ ở 12 tuần soạn tay

95 câu hỏi đọc hiểu bằng tiếng Anh nằm chính xác trong 12 tuần biên soạn tay; 1.825 câu còn lại bằng tiếng Việt. Người học đang đi trong tuần tiếng Việt bỗng gặp một tuần hỏi bằng tiếng Anh rồi lại quay về.
**Sửa:** thống nhất một quy tắc — đề xuất: tiếng Việt cho P0–P2, chuyển dần sang tiếng Anh từ P3.

### P1-11. Tổng từ vựng dưới mục tiêu

504–508 từ/bộ phận so với mục tiêu 560–620 của matrix (dòng 112) — hụt ~10%.
**Sửa:** bổ sung khi lấp các khoảng trống nghiệp vụ ở P1-12.

### P1-12. Khoảng trống nghiệp vụ trọng yếu

Xếp theo mức độ quan trọng trong vận hành resort 4–5 sao Việt Nam:

| Bộ phận         | Thiếu                                                                                                                                                                                                                                                                            |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **GR**          | **Quy trình cấp cứu y tế** (gọi bác sĩ trực, phòng khám quốc tế, bảo hiểm du lịch) — chỉ tồn tại dưới dạng mảnh từ vựng; **bão và gián đoạn thời tiết** (0 nội dung); mất hộ chiếu (không có quy trình khai báo); nội dung concierge thật (không có địa danh nào trong 240 tuần) |
| **FO**          | Hoá đơn đỏ/VAT + mã số thuế; taxi dù; thẻ tín dụng bị từ chối (0 lần xuất hiện); nhận phòng sớm; tranh chấp giá OTA                                                                                                                                                              |
| **HK**          | Khách phàn nàn côn trùng; Lost & Found (1 dòng từ vựng); tranh chấp minibar                                                                                                                                                                                                      |
| **SW**          | **Hỏi mức lực khi đang trị liệu** ("Is the pressure okay?") — câu quan trọng nhất của kỹ thuật viên, không có; chính sách tip; yêu cầu kỹ thuật viên theo giới tính; khách mang thai                                                                                             |
| **FB**          | Đồ ăn Halal (1 dòng); thực đơn trẻ em; tranh chấp voucher ăn sáng; nghi thức phục vụ rượu vang                                                                                                                                                                                   |
| **BO**          | Tiệc cưới (0 lần xuất hiện)                                                                                                                                                                                                                                                      |
| **Mọi bộ phận** | Chiến lược giao tiếp với khách hạn chế tiếng Anh (thị trường Nga/Hàn/Trung); nội dung Tết ở các bộ phận tiếp khách                                                                                                                                                               |

**Nguồn tuần để lấp:** tuần 37–38 (hợp đồng đoàn, thuyết trình đề xuất) là nội dung B2B mà FO/FB/HK/SW/GR không dùng tới — **10 tuần** có thể thu hồi. Cũng nên xem lại việc chọn BO làm bộ phận thứ sáu thay vì Bell/Concierge hoặc An ninh/Kỹ thuật, là những nhóm tiếp khách hằng ngày và yếu tiếng Anh nhất.

> **ĐÃ XỬ LÝ** (`f3b198c`, `2a712e3`) — thu hồi 7 tuần, lấp 7 khoảng trống. Xem bảng ở cuối
> tài liệu. Ba mục trong bảng trên **chưa** làm và cần quyết định riêng: khách mang thai (SW),
> tranh chấp voucher ăn sáng và nghi thức rượu vang (FB), tiệc cưới (BO), hoá đơn đỏ/VAT và
> tranh chấp giá OTA (FO), tranh chấp minibar (HK), và cả dòng "Mọi bộ phận".
> Đề xuất bộ phận An ninh/Kỹ thuật đã thành bộ phận thứ 7 (`43490b6`, mã `SE`, đang soạn).

---

## P2 — Giữ chân người học

Xếp theo tác động dự kiến lên tỉ lệ hoàn thành 40 tuần (xem §9 báo cáo chính).

### P2-1. Không có bất kỳ cơ chế nhắc học nào

Xác minh: không có `public/`, không manifest, không service worker, không tham chiếu `Notification` nào trong `src/`. Điểm quay lại duy nhất là `ReviewBanner` (`index.tsx:22-52`) — chỉ hiện khi người học **đã** mở app. Vòng lặp giữ chân là vòng lặp khép kín rỗng.
**Sửa:** (a) Đóng gói PWA — manifest, icon, vỏ offline, gợi ý "Thêm vào màn hình chính" sau suite đầu tiên hoàn thành. Toàn bộ giáo trình là module TS tĩnh nên học offline hoàn toàn khả thi. (b) Supabase edge function theo lịch, đọc `profiles.last_active_date` + `review_items.due_at`, gửi Zalo ZNS hoặc SMS vào giờ người học chọn. Số điện thoại đã là danh tính đăng nhập.

### P2-2. Hàng đợi ôn tập phân kỳ và phục vụ sai thứ tự

`review.ts:89-99` — `fetchDueItems` giới hạn 20, sắp `due_at ASC`; `fetchDueCount` **không giới hạn** và banner hiển thị con số thô đó. Mô phỏng bằng số liệu gieo thật (FO: 23–30 mục/tuần) theo đúng tham số `INTERVAL_GROWTH 2.2`:

| Kịch bản                         | Tổng gieo | Tồn đọng cuối | Đỉnh  |
| -------------------------------- | --------- | ------------- | ----- |
| Ôn hằng ngày, nhớ 90%, tuần 22   | 536       | 173           | 207   |
| Ôn hằng ngày, nhớ 90%, tuần 40   | 1.083     | 699           | 735   |
| Ôn 3 ngày/tuần, nhớ 80%, tuần 22 | 536       | 498           | 509   |
| Ôn 3 ngày/tuần, nhớ 80%, tuần 40 | 1.083     | 1.025         | 1.044 |

Hệ quả nặng hơn con số: khi đã có tồn đọng, mỗi phiên chỉ phục vụ mục **cũ nhất** mãi mãi — từ đang học tuần này không bao giờ được ôn.
**Sửa:** (a) Banner hiển thị `Math.min(due, 20)`, không bao giờ hiện số nợ. (b) Đổi thứ tự lấy mục: 60% mục gieo gần nhất + 40% mục quá hạn lâu nhất. (c) Quy tắc "leech": sau 5 lần trượt liên tiếp, tạm treo mục và đưa lại vào suite của tuần tương ứng. (d) Ở P0–P1 chỉ gieo vocab, không gieo grammar + speaking (giảm từ ~23 xuống ~10 mục/tuần).

### P2-3. Người học không nhìn thấy tiến độ của chính mình

`lesson_progress` có `mastered`, `score_pct`, `stars` theo từng suite từng tuần — nhưng chỉ được đọc bởi `week-access.ts` (cổng khoá) và `org-admin.tsx` (quản lý). `Tier3SkillSuitesHub.tsx` hiển thị 6 cửa không có trạng thái nào; `department.$dep.tsx` chỉ hiện khoá/mở. Không có "N/40 tuần" ở bất kỳ đâu. **Quản lý thấy tiến độ của nhân viên; nhân viên thì không.**
**Sửa:** truy vấn `lesson_progress` một lần trong `useWeekAccess`, hiển thị dấu tick / phần trăm trên từng cửa suite và từng dòng timeline; thêm thanh "Tuần 12/40" ở đầu trang bộ phận.

### P2-4. Không có nút "Học tiếp"

Người học quay lại phải: trang chủ → nhớ bộ phận → cuộn timeline 40 tuần → nhớ tuần → chọn suite. Không có cột `current_week` trên `profiles`, không lưu lần truy cập cuối.
**Sửa:** thẻ "Tiếp tục học" ở đầu `/` — bộ phận, tuần, `n/6 suite`, liên kết sâu. Lưu `last_department` + `last_week` vào `profiles` hoặc localStorage.

### P2-5. Không lưu điểm dừng trong bất kỳ suite nào

Trạng thái suite chỉ nằm trong React state (`VocabSuite.tsx:170-181`, `ListeningSuite.tsx:154-163`, `WeekTestSuite.tsx:438`). Gián đoạn ở 90% = mất trắng sao, chuỗi ngày và tiến độ. Cổng lật thẻ của VocabSuite khoá lại sau mỗi lần mount (`flipped` là component state) — phải lật lại toàn bộ 10–17 thẻ. Bài sát hạch là khối 12–19 phút không được gián đoạn, so với khung thời gian 10–15 phút của người học mục tiêu.
**Sửa:** lưu trạng thái phiên vào localStorage theo khoá `academy.session.v1.{user}.{dep}.{week}.{suite}`, khôi phục kèm hỏi "Tiếp tục từ câu 7?"; ghi bản ghi tiến độ tạm mỗi 5 mục. Với `WeekTestSuite`, lưu `answers` sau mỗi câu — mã hiện tại đã lập luận đúng về việc không mất phần viết ở **cuối** (`:496`), chỉ cần mở rộng cho phần **giữa**.

### P2-6. Ngõ cụt theo thiết bị khoá suite mà không giải thích

`SpeakingSuite.tsx:55-57` — không có `SpeechRecognition` thì hiện đúng một dòng lỗi và không có gì khác, trong khi `WeekTestSuite.tsx:246-249,379-395` có sẵn chế độ gõ. Link mở qua WebView của Zalo/Messenger — cách chia sẻ phổ biến nhất ở Việt Nam — không có Web Speech API. `ListeningSuite.tsx:35-46` chỉ kiểm tra `speechSynthesis` tồn tại, không kiểm tra có giọng tiếng Anh thật, trong khi `WeekTestSuite.tsx:79-91,485` có kiểm tra và miễn sàn điểm.
**Sửa:** chuyển `typedMode` từ `OralStage` sang `SpeakingSuite` (đường chấm `utterancePassed` đã dùng chung); chuyển `sawEnVoiceRef` sang `ListeningSuite`, ẩn câu điền và hiện văn bản thay cho âm thanh khi thiếu giọng.

### P2-7. Chuỗi ngày trừng phạt người làm ca

`academy-store.ts:244-251` reset về 0 khi nghỉ một ngày, không có "đóng băng", không có mục tiêu tuần. Nhân viên làm 6 ngày/tuần với thói quen học 3–4 buổi/tuần sẽ thấy ô chuỗi ngày gần như luôn là 0 hoặc 1 — tín hiệu thất bại lặp lại gắn vào nỗ lực có thật.
**Sửa:** đổi sang mục tiêu tuần ("3 ngày/tuần") và cấp 2 lượt đóng băng mỗi tháng.

### P2-8. Không có onboarding và không định tuyến theo bộ phận

Tiêu đề đầu tiên người học mất gốc nhìn thấy là tiếng Anh — _"Choose your atelier"_ — rồi 6 thẻ giống nhau mang tên bộ phận tiếng Anh. `profiles.department` tồn tại nhưng là văn bản tự do, không bao giờ ánh xạ sang mã FO/FB/HK/SW/GR/BO.
**Sửa:** chuẩn hoá `profiles.department` thành mã bộ phận, tự chuyển thẳng người học vào bộ phận của mình; Việt hoá màn hình đầu; thêm hướng dẫn ngắn "bắt đầu từ đây".

### P2-9. Xếp lớp đã tồn tại nhưng chưa gắn nhãn

Cổng khoá là **theo phase, không theo tuần** (`week-access.ts:40-44`), nên bài sát hạch tuần 6 mở sẵn từ ngày đầu, và `WeekLocked.tsx:44-50` còn hiện nút "Vào thi sát hạch tuần 6 →". Người có A1 chỉ cần ba lần chạm là nhảy phase — nhưng chỉ khi họ tình cờ bấm vào một tuần bị khoá.
**Sửa:** thêm "Bạn đã biết tiếng Anh? Làm bài xếp lớp" ở đầu trang bộ phận. Chi phí gần bằng không vì cơ chế đã chạy.

### P2-10. Ẩn động lực dài hạn khỏi người dùng điện thoại

`AcademyNav.tsx:54` đặt khối "Your Career Growth" (thang 9 cấp) trong `hidden … md:flex`; dòng 72 đặt link Appraisal trong `hidden … md:inline-flex` và nó cũng không có trong modal tài khoản trên mobile — **`/appraisal` không thể tới được bằng điều hướng trên điện thoại.** `/review` không có trong nav ở bất kỳ đâu.
**Sửa:** đưa chip cấp bậc và link Appraisal vào bố cục mobile; thêm `/review` vào nav.

### P2-11. Hai suite không có màn hình kết thúc

`GrammarSuite.tsx:161-163` — `next()` chỉ tăng `round`, `puzzleIdx = round % puzzles.length`, nên sau câu cuối tiêu đề lặng lẽ quay về "Câu 1/9". `SpeakingSuite.tsx` — `setIdx((i) => (i + 1) % scenarios.length)`, không có trạng thái `done`.
**Sửa:** thêm trạng thái `done` cho cả hai, theo mẫu của `ListeningSuite`/`VocabSuite`.

### P2-12. Nhãn thời lượng sai gấp 5 lần

Timeline hiển thị "Week N · 4h" và "ca làm 4 giờ" (`department.$dep.tsx:77-80`); matrix tuyên bố 160 giờ tích luỹ làm cơ sở cho lộ trình CEFR. Thời lượng thực tế đo được là 39–51 phút/tuần, tổng ~31 giờ.
**Sửa:** đây là **quyết định cấp giám đốc, không phải sửa kỹ thuật.** Hoặc bổ sung nội dung để lấp khoảng cách 160 giờ, hoặc sửa lại cả nhãn UI lẫn tuyên bố CEFR trong tài liệu cho trung thực. Không được để nguyên trạng.

---

## P3 — Liêm chính dữ liệu và dọn dẹp

### P3-1. Sao có thể cày ở 4/6 suite

- `GrammarSuite.tsx:62,128-131` — điều kiện `awardedRoundRef.current !== round` với `round` tăng vô hạn và `puzzleIdx = round % puzzles.length`: giải lại 9 câu đố cũ được +4 sao mỗi lần, không giới hạn.
- `ArcadeSuite.tsx:100,114-121` — `awardStars(2)` mỗi bong bóng đúng; `poppedRef` khoá theo `id: ++idRef.current` là bộ đếm theo mỗi lần mount, nên chơi lại là thưởng lại.
- `ReadingSuite.tsx:64-68` — `awardedPassageRef` chỉ lưu một chỉ số cuối, đổi qua lại hai bài đọc là thưởng lại cả hai.
- `SpeakingSuite.tsx:84-91`, `VocabSuite.tsx:125` — ref theo mỗi lần mount; rời trang rồi quay lại là thưởng lại.

Đạt cấp "General Manager" (3.600 sao) bằng cày Arcade mất vài giờ chạm màn hình và không cần biết tiếng Anh. Điều này làm hỏng cả thang cấp bậc lẫn cột `service_stars` mà quản lý dùng để ra quyết định.
**Sửa:** khoá thưởng theo khoá bền vững cấp máy chủ (mẫu `review_items.item_key` là hình mẫu sẵn có), không theo ref trong bộ nhớ.

### P3-2. Chỉ số năng lực trên `/appraisal` là nhiễu

- `GrammarSuite.tsx:131` — `courtesy_score = min(100, 70 + (round + 1) * 8)`: hàm của **số vòng đã bấm**, không phải độ đúng; chạm trần 100 sau câu thứ tư rồi đứng yên suốt 40 tuần.
- `SpeakingSuite.tsx:81` — `fluency_score` bị ghi đè bằng lần thử **gần nhất**, không phải lần tốt nhất; luyện thêm làm biểu đồ tụt.
- `ReadingSuite.tsx:82` — `crisis_handling_score` lấy từ bài đọc nộp cuối cùng.

Nếu quản lý dùng bảng này cho quyết định nhân sự, họ đang đọc số liệu vô nghĩa.
**Sửa:** tính chỉ số từ `lesson_progress` đã tích luỹ (điểm tốt nhất theo suite/tuần), không từ trạng thái phiên.

### P3-3. Đánh giá phát âm không tồn tại

`speaking-score.ts` chấm bằng so khớp từ + thứ tự LCS. IPA hiển thị trên thẻ từ (`VocabItem.phonetic`) nhưng không bao giờ được chấm. Các lỗi cố hữu của người Việt — nuốt âm cuối /s/, /t/, /k/, lẫn /l/–/n/ — không được phát hiện, dù matrix đặt đó làm trọng tâm phase 0.
**Sửa:** ngoài phạm vi sửa nhanh. Nếu muốn giữ tuyên bố về phát âm, cần dịch vụ chấm phát âm bên ngoài; nếu không, gỡ tuyên bố khỏi tài liệu.

### P3-4. Cảnh báo tồn đọng từ `qa-full.ts`

20 cảnh báo chưa xử lý: 6 ngữ cảnh từ vựng không chứa chính từ đó (`"Zero"` được minh hoạ bằng "Room two-oh-five." ở cả 6 bộ phận, tuần 2) và 14 câu ngữ pháp quá dài (đã gộp vào P1-9).

### P3-5. 60 từ vựng không bao giờ được ôn lại

`verify-content.ts` báo: 60 headword được dạy ở tuần 1–14 rồi không xuất hiện lại lần nào (ví dụ FO: "how may i help", "signature", "farewell", "suitcase", "boarding pass", "lobby seat").
**Sửa:** đưa vào hồ `reviewWords` của các tuần sau.

### P3-6. Mã chết và nợ kỹ thuật

- `src/components/suites/BoardGameSuite.tsx` (151 dòng) không được import ở đâu, không route nào tới được — dù nội dung xử lý phàn nàn trong đó chất lượng tốt hơn nhiều tuần sinh tự động. Cân nhắc thu hồi nội dung thay vì xoá.
- `appraisal.tsx:41-53` — hằng `DEMO_METRICS`/`DEMO_PROFILE` không dùng.
- `ReadingSuite.tsx:52-55` gọi `setPicks`/`setSubmitted` bên trong `useMemo` (tác dụng phụ trong lúc render).
- `index.tsx:111-112` — `FlipCard` chỉ lật khi hover, nên mặt sau thẻ không bao giờ hiện trên thiết bị cảm ứng.
- `department.$dep.tsx` render cả 40 dòng timeline với hiệu ứng so le mỗi lần vào trang.
- Không có chức năng tự đặt lại mật khẩu ở bất kỳ đâu.

---

## Thứ tự thực hiện đề xuất

| Đợt   | Nội dung                                                                                                | Lý do                                                                                                                 |
| ----- | ------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| **1** | P0-1 → P0-5                                                                                             | Chặn việc dạy sai tiếng Anh và sai phản xạ an toàn. Sửa ở tầng khung, không sửa từng câu.                             |
| **2** | Gate ngữ nghĩa mới (ràng buộc loại cho từng ô + rà soát toàn bộ câu sinh tự động bằng mô hình ngôn ngữ) | QA hiện tại đã chứng minh không bắt được loại lỗi này. Phải có trước khi sinh thêm nội dung.                          |
| **3** | P2-1, P2-3, P2-4, P2-5, P1-3                                                                            | Bốn thay đổi giữ chân + hạ chuẩn theo phase. Theo dự báo, nhóm này đưa tỉ lệ hoàn thành tuần 6 từ 21 lên 56 trên 100. |
| **4** | P1-1, P1-2, P1-6, P1-8, P2-9                                                                            | Đóng khoảng cách A2 thật sự: thang nghe, phủ từ mới, luyện sản sinh, phân hoá tuần đầu, gắn nhãn xếp lớp.             |
| **5** | P1-12 (thu hồi tuần 37–38 để lấp khoảng trống nghiệp vụ), P1-4, P1-5                                    | Nội dung nghiệp vụ và bài thi cuối khoá.                                                                              |
| **6** | P3                                                                                                      | Liêm chính dữ liệu, dọn dẹp.                                                                                          |

Song song từ đợt 1: **áp dụng ngay quy trình quản lý chủ động** (giám sát `org-admin` hằng tuần + đặt mục tiêu + nhắc thủ công). Không cần sửa dòng code nào và theo dự báo nó nhân đôi tỉ lệ hoàn thành ở mọi mốc.

---

## Đã sửa — đợt P0 (2026-08)

Nguyên tắc áp dụng xuyên suốt: **sửa khung câu trong generator, không sửa từng câu output**. Chỉ khi ô điền sai loại ngữ nghĩa mà khung vốn đúng thì mới đổi từ trong lexicon — 42/3167 headword (~1,3%) bị thay, tổng số headword không đổi. Tổng cộng **528/8404 câu mẫu (6,3%)** được sửa.

| Mục      | Cách xử lý                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **P0-1** | Tuần 39: câu khách không còn viết cứng "smoke in the corridor", nên đáp án dùng sự cố riêng của bộ phận là đúng; `emergencies[0]` của BO đổi từ "Cash shortage" sang "Building power failure" (sự cố khách nhìn thấy được). Tuần 36: mỗi cảnh nay dùng **một** ô sự cố xuyên suốt. Ba mục "Guest fainting" và "Flight cancellation" đổi sang sự cố vận hành tại chỗ (quy tắc 8 của bank contract).                                                                                                                                                                                                                                                                                                                                                                           |
| **P0-2** | Khung sửa: `It would {c8} nicely` → `It would suit you nicely`; `{c9} depends on the weather` → `is worth considering`; `The system is {p9}` → `Your request is {p9}`; `The {w8} will not happen again` → `The mistake with the {w8}…`; `I am ready for the {w12}` → `I can confirm the {w12} myself now`; tuần 40 bốn khung tự phản ánh viết lại; `Based on your {p1}` giữ nguyên phần dạy, lời khuyên "quieter option" thành `may I suggest something that suits you better`. Lexicon sửa: `paperwork[4]` (SW/GR/BO → danh từ chỉ phí), `reports[1,3,6,7,8]` (BO/GR/HK/SW → đúng loại động từ), `choices[7,9]` (FO/HK).                                                                                                                                                    |
| **P0-3** | Helper `third()` chia đúng động từ chính (tuần 11, bỏ tân ngữ thừa); helper `cmpOf()` + trường `cmp?` trên `P1Word` (tuần 10 so sánh hơn); ô `states[4]` đổi sang tính từ hơi tiêu cực ở FO/SW/GR/BO; chủ ngữ viết cứng "pipe"/"room"/"machine" ở tuần 13 thay bằng "It"; `problems` bỏ hai tính từ chỉ người; `phone[3]` của HK "Send up" → "Send it up".                                                                                                                                                                                                                                                                                                                                                                                                                   |
| **P0-4** | 18 chỗ. `phase1.ts` nay dùng `lx.pron` (trước đó là spine duy nhất chưa dùng) cộng helper `roleSubj()` cho chức danh đồng nghiệp; FB hoán đổi `roles[0]/[1]` để vai trò khớp giới tính nhân vật Linh; `phase3.ts` 9 chỗ, `phase4.ts` 11 chỗ. Các dòng giải thích tiếng Việt trích lại nguyên văn được sửa đồng bộ.                                                                                                                                                                                                                                                                                                                                                                                                                                                           |
| **P0-5** | Rà tay **toàn bộ 408 game round tuần 24–40**: 41 round hỏng. Cùng cơ chế với P0-2 — câu khách viết cứng nêu một tình huống cụ thể, ghép với ô thay đổi theo phòng ban, trong khi một phương án nhiễu viết cứng lại là câu đúng duy nhất, nên bài kiểm tra trừ điểm người trả lời đúng. Sửa 12 khung (tuần 24, 27, 28, 31, 32, 33, 34, 36, 37): câu khách không nêu tình huống cụ thể nữa, và phương án nhiễu "quá tốt" hạ xuống mức rõ ràng kém hơn. Kèm 7 mục lexicon — `policies[0]` của SW/GR/BO phải là **khoản phí** (bài học tên là "There Is a Charge"): SW/BO hoán đổi trong chính ngân hàng, GR không có phí nào nên thêm "Lounge access fee"; ngân hàng `story` của HK/BO chứa sản phẩm và chỉ số nội bộ trong khi khung tuần 31 nói về thứ khách **trải nghiệm**. |
| **Gate** | `scripts/lint-content.ts`: khai báo bổ sung `P3.wrapUp`, `P4.terms/proposal/wrapUp` (trước đó **không có** entry nào — lý do khung tuần 30/40 trôi lọt); thêm 4 luật layer C — `female-persona-male-pronoun`, `third-person-s-on-phrase-tail`, `more-with-short-adjective`, `a-little-positive-adjective`. Đã kiểm chứng: bắt **11/11** câu lỗi cũ, **0** dương tính giả. `scripts/verify-content.ts`: thêm 30 canary là câu lỗi nguyên văn. `docs/phase3-bank-contract.md` và `phase4-bank-contract.md`: thêm bảng **loại ngữ nghĩa từng ô** bên cạnh từ loại — đây là chiều mà mọi lỗi P0 đều lọt qua.                                                                                                                                                                     |

**Lưu ý vận hành:** đổi headword làm mồ côi các dòng `review_items` cũ của 42 từ đó. `resolveReviewItem` (`src/lib/review.ts:144`) trả `null` và `review.tsx:45` lọc bỏ, nên phiên ôn tập chỉ ngắn đi chứ không lỗi — không cần migration. Tác dụng phụ: banner vẫn đếm cả mục mồ côi (đã ghi ở P2-2).

---

## Đã sửa — đợt P1 (2026-08)

| Mục       | Cách xử lý                                                                                                                                                                                                                                                                                                                                                                       | Commit               |
| --------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **P1-1**  | `listeningRateForWeek()` + `headwordRateForWeek()` trong `phases.ts`: 5 mốc neo 0,7 → 0,9 nội suy tuyến tính trong từng phase, từ đơn luôn chậm hơn câu nối. Gate T3 kiểm 5 tiêu chí riêng biệt.                                                                                                                                                                                 | `8b27f0d`            |
| **P1-2**  | `VocabSuite` bốc riêng `MCQ_NEW_MAX = 10` từ mới và `MCQ_REVIEW = 4` từ ôn rồi trộn, thay vì bốc từ một rổ chung. Gate T5: từ của chính tuần đó phải chiếm ≥ 60% đề.                                                                                                                                                                                                             | `56ba403`            |
| **P1-3**  | `suiteMasteryPct(week)` theo phase (70/70/75/80/80); chấm thành phần theo từng chỗ trống ở bài điền; `dictationMatches()` chấp nhận sai 1 ký tự ở P0–P1.                                                                                                                                                                                                                         | `a670020`            |
| **P1-7**  | `passThresholds()` dốc dần 60 → 65 → 70 → 75 → 80 qua tuần 15–21 thay vì nhảy 60 → 80 → 50. Gate T3: không tuần nào được nâng quá 5 điểm.                                                                                                                                                                                                                                        | `2b5e247`            |
| **P1-9**  | `MAX_CHIPS = 12` + `toChips()` gộp từ thành cụm khi câu dài. Gate T5 chuyển từ cảnh báo thành **fail cứng**.                                                                                                                                                                                                                                                                     | `8f0e0a6`            |
| **P1-10** | Dịch 95 câu hỏi đọc hiểu sang tiếng Việt. Gate T2: câu hỏi dài > 15 ký tự mà không có ký tự có dấu thì fail. Đoạn văn giữ nguyên tiếng Anh — đó là thứ đang được đọc.                                                                                                                                                                                                            | `ef275b2`            |
| **P1-12** | Thu hồi 7 tuần B2B: **FO 37–38** → concierge (địa danh, tour, taxi, đặt bàn, giữ hành lý); **GR 37** → cấp cứu y tế; **GR 38** → bão và gián đoạn; **FB 37** → thực đơn trẻ em + Halal; **SW 37** → giới tính KTV + tip + đồng thuận; **HK 37** → côn trùng + Lost & Found. Thẻ bị từ chối vào **FO-17 bài 3** (đúng lúc quẹt pre-authorization), không vào tuần 24 như dự kiến. | `f3b198c`, `2a712e3` |

**Hệ quả kỹ thuật của P1-12 — tuần 39.** Bài 4 tuần 39 là bài tổng duyệt và lấy từ thẳng
từ bank tuần 37/38. Sau khi thu hồi, FO sẽ tổng duyệt "cover letter" và "allotment" — những từ
bộ phận đó không còn gặp ở đâu nữa. `week39` nay đọc **từ vựng thật sự đã dạy** qua chính map
`overrides` mà cơ chế ôn tập đã dùng. Hai khung chỉ đúng trong ngữ cảnh thương mại
("valid for twelve months", "asks for a decision date") được viết lại để đúng cho cả hợp đồng
lẫn quầy concierge; tên bài đổi sang **kỹ năng** ("The Last Fifteen Minutes") thay vì bối cảnh.

**Còn nợ, cần quyết định:** tuần 38 của FB/SW/HK vẫn là "Presenting a Proposal" — lệch nghiệp
vụ đúng như tuần 37 từng lệch, chỉ là chưa có khoảng trống nào đủ lớn để lấp vào. Ba tuần này
là ứng viên rõ ràng cho đợt sau (tranh chấp minibar, nghi thức rượu vang, khách mang thai).

---

## Sổ hậu kỳ batch FB Phase 4 (30/08/2026 — PR #7, vòng chấm phát hành 9.0/9.0)

Cả tám tuần FB 32–36, 38–40 phát hành với phán quyết "ĐỦ ĐIỀU KIỆN" từ hai auditor mù
độc lập (Academic 9.0 · Hotel Manager 9.0). Những mục dưới đây được cả hai ghi rõ
**không chặn phát hành** — giữ lại đây để làm trong các đợt biên tập sau:

| Mục  | Nội dung                                                                                                                                                               | Nguồn                        |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- |
| FB-A | Cân distractor toàn corpus: 73% câu đọc của batch có đáp án đúng dài nhất (corpus 79%); FB-39 đã cân lại ngay trước merge, còn FB-33/40 và các bộ phận cũ              | Academic chung cuộc #1       |
| FB-B | 2–3 câu reading vượt band (47 từ ở FB-34_1 cakeage, 38 từ ở FB-38_4) — tách câu, giữ nội dung                                                                          | Academic #3                  |
| FB-C | reviewWords của 38–40 chưa truy hồi nhóm từ an toàn của FB-37 (Halal, Cross-contamination) — đổi 1–2 slot                                                              | Academic #4, HM #4 cluster 4 |
| FB-D | Ma trận nói tuần 40 "≥50% ngữ liệu tái sử dụng" nhưng FO-40/FB-40 đều dạy 16 từ mới — ghi chú ngoại lệ vào ma trận (rẻ nhất) hoặc đổi cấu trúc tuần 40 ở các batch sau | Academic #5                  |
| FB-E | Bài hóc dị vật: cân nhắc thêm "If the guest can still cough, encourage them to keep coughing" (phổ quát, an toàn)                                                      | HM chung cuộc #3             |
| FB-F | Thiếu lượt thoại: đổ đồ ăn/uống lên người khách (top sự cố sảnh) và câu hỏi tipping của khách Tây                                                                      | HM #7, #8                    |
| FB-G | FB_33_2 "replacement of any dish" — thêm "at the same or lower price" để khỏi vênh POS                                                                                 | HM #5                        |
| FB-H | Ghi chú đào tạo: tuần FB-38 nhắm captain/supervisor (báo giá banquet thuộc Sales ở đa số khách sạn lớn)                                                                | HM #6                        |

**Cập nhật món nợ P1-12:** FB-38 "Presenting a Proposal" đã được soạn tay lại trong batch
này theo đúng nghiệp vụ (báo giá tiệc bằng đồng, plus-plus, headcount, hoá đơn đỏ) — món nợ
tuần 38 giờ chỉ còn **SW-38 và HK-38**, sẽ xử trong batch của hai bộ phận đó.

---

## Sổ hậu kỳ cụm HK-34/35 (30/08/2026 — đang trong vòng chấm)

Những mục dưới đây do hai auditor mù nêu ra ở vòng 4 và **được ghi nhận là không chặn**,
hoặc là chỗ hai luồng chấm xung khắc mà tôi đã chọn một bên có lập luận.

| Mục  | Nội dung                                                                                                                                                                                                                                                                                                                                                                                                               | Nguồn                     |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------- |
| HK-A | **Dựng phòng ĐÓN KHÁCH chưa có ở đâu.** Cả HK-34 chỉ dạy dựng phòng buổi tối trong kỳ lưu trú; phần lớn việc "dịp đặc biệt" thật của buồng phòng là set-up trước ETA (giường honeymoon, amenity VIP, thư TGĐ) với ràng buộc khác hẳn: không có cue, phòng phải ở trạng thái VC trước ETA hai giờ, amenity đặt sau cùng. Hạng mục nội dung mới, ~2 giờ.                                                                 | HM v4 2.9                 |
| HK-B | **`in exchange for` — xung khắc giữa hai luồng.** HM cho rằng mặc cả tay đôi không hợp register 5★ ("khách sạn không đổi chác với khách; khách sạn thu xếp"). Academic ngược lại, coi đây là cách dùng ĐÚNG duy nhất của cụm và muốn thêm. **Đã giữ theo Academic**, vì ma trận quy định tuần 35 chính là tuần Đàm phán — bỏ ngữ liệu đàm phán để chiều register sẽ phá ma trận. Cần một quyết định thiết kế dứt điểm. | HM v4 2.16b vs Acad v4 N5 |
| HK-C | **Ba headword của HK-34 cố ý không vào ngôn ngữ sản sinh:** `Low-key`, `Unattended`, `Latex balloon`. Hai từ đầu là lệnh cho NHÂN VIÊN, không phải câu nói với khách — Academic đã yêu cầu gỡ `low-key` khỏi miệng nói với khách. Đây là lựa chọn có ý thức, không phải chỗ sót; nhưng phép đo "tỷ lệ từ vào sản sinh" cần biết để không báo động nhầm ở các vòng sau.                                                 | Acad v4 VỪA-6             |
| HK-D | **Tình huống chưa phủ ở HK-35:** khách dúi tiền để xoá phí, khách quay điện thoại khi tranh chấp, khách tự mua nước bỏ lại vào minibar, trẻ con lấy đồ minibar, kiểm minibar lúc trả phòng gấp. Ba cái sau là tranh chấp minibar phổ biến nhất trong nghề.                                                                                                                                                             | HM v4 3.6, 3.7            |
| HK-E | **reviewWords HK-35 chứa `Damaged linen charge` và `Missing towel charge`** nhưng quy trình phí đồ vải không được dạy ở bất kỳ bài nào trong tuần — chỉ có minibar. Đổi slot hoặc bổ sung.                                                                                                                                                                                                                             | HM v4 3.8                 |
| HK-F | **Rượu vào phòng chưa có ai nhận:** FO-34 có `"sparkling wine on ice"`, HK-34 không có một dòng nào về ai đặt xô đá, ai bê lên, và xử lý thế nào khi phòng có trẻ vị thành niên.                                                                                                                                                                                                                                       | HM v4 3.4                 |
| HK-G | **Văn phong tỉnh lược toàn corpus.** Nhiều câu đích mở bằng mảnh không động từ (`"Two now, madam."`, `"Ten minutes now, madam."`). Rất thật với nghề và rất Anh, nhưng ở A2+ nó mô hình hoá mảnh câu thay vì mệnh đề, và bộ chấm nói chấm chính những mảnh đó. Là quyết định thiết kế cần chốt cho cả khoá, không riêng HK.                                                                                            | Acad v4 VỪA-12            |

**Ghi chú thiết kế đã áp dụng, cần nhớ:** trường `guestPrompt` render ra màn hình dưới dạng
câu trích trần, không nhãn "khách" (`SpeakingSuite.tsx:161`). HK-34 và HK-38 dùng đặc điểm này
để đưa vào một số lượt **giám sát/quản lý nói với nhân viên** — đó là cách duy nhất luyện được
ngôn ngữ nội bộ (`lead time`, `cue`, và cả tuần đề xuất HK-38) mà không dạy nhân viên nói
những từ đó vào mặt khách. `helpTip` của các lượt này luôn mở đầu bằng "Đây là CẤP TRÊN nói".

**Bổ sung 30/08/2026 — trường `speakerRole` và món nợ nó để lộ ra.**
Hai auditor mù độc lập cùng phát hiện: `guestPrompt` được BỐN màn hình dán nhãn "Khách nói"
(`SpeakingSuite.tsx`, `handbook.$dep.$week.tsx`, `review.tsx`, và `WeekTestSuite.tsx` in
`Khách: "…"`). Ghi chú thiết kế trước đó của tôi — rằng prompt render ra không có nhãn — là
**SAI**; tôi grep phân biệt hoa thường nên trượt chuỗi `"Lời khách nói"`.

Đã sửa tận gốc: `SpeakingItem` có thêm `speakerRole?: "guest" | "colleague"`, hàm
`speakerLabel()` in "Đồng nghiệp nói" cho lượt nội bộ, và cả bốn màn hình dùng nó. Đây là kênh
duy nhất trong khoá học luyện được **ngôn ngữ nội bộ** (`lead time`, `cue`, `service window`,
`put it forward`, `not my call`) mà không dạy nhân viên nói những từ đó vào mặt khách.

| Mục  | Nội dung                                                                                                                                                                                                                                                                                                                       | Nguồn     |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | --------- |
| HK-H | **`GR_34_2.speaking[0]` đang bị dán nhãn sai.** guestPrompt là `"Housekeeping here. We only have white towels left, no red ones for the heart shape."` — rõ ràng là lời một bộ phận khác gọi sang, không phải lời khách. Cần thêm `speakerRole: "colleague"`. Để lại cho batch GR để không đụng file khi hai auditor đang đọc. | HM v5 1-E |
| HK-I | **Rà toàn corpus** tìm các lượt nội bộ khác đang mang nhãn khách (1349 lượt chưa đánh dấu). Nên viết một lớp lint: nếu `guestPrompt` chứa tên bộ phận tự xưng ("Housekeeping here", "the desk here") hoặc thuật ngữ nội bộ, cảnh báo nếu chưa có `speakerRole`.                                                                | phái sinh |

---

## Sổ hậu kỳ cụm HK-36/38 (30/08/2026 — đang trong vòng chấm)

| Mục  | Nội dung                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           | Nguồn                               |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------- |
| HK-J | **Bài đọc HK-36 dài nhất toàn khoá** (khoảng 700/600/620/365 từ so với FO-36 ~850 tổng). Đây là **hệ quả trực tiếp** của chính các vòng chấm: mỗi vòng auditor yêu cầu thêm một khối an toàn (AED, quy tắc 30 giây, quy tắc khói, khách từ chối rời phòng, biên bản tai nạn, ngưỡng dừng ban công, kiểm điện trước khi chạm nước), và cả bảy khối đều đúng. Không thể vừa giữ chúng vừa xuống 280 từ trong khuôn `reading` một-đoạn-một-bài. **Cần một quyết định cấu trúc**, không phải một lần cắt: hoặc cho `LessonContent` nhiều hơn một `reading`, hoặc chuyển phần giải thích sang trường `rule` tiếng Việt. | Acad v3 V8 · Acad v5 NẶNG-1 · HM v5 |
| HK-K | **Câu hỏi đọc khoá cứng ở 2 câu/bài** (`verify-content` đòi đúng 2). Với bài đọc 600 từ chứa hơn 12 quy tắc, tỷ lệ đo là ~3%. `ReadingSuite` lại chấm đạt ở `ceil(total/2)` nên 2 câu nghĩa là phải đúng 2/2. Đề nghị cho phép 2–4 câu ở Phase 3–4.                                                                                                                                                                                                                                                                                                                                                                | Acad v5 NẶNG-1                      |
| HK-L | **`role-play mở` mà ma trận hứa cho Phase 4 vẫn chưa tồn tại** — mọi tuần vẫn là `targetResponse` cố định chấm bằng so khớp từ. HK-38 là ứng viên tự nhiên nhất cho bộ chấm mở đầu tiên (`mustConvey` thay cho `targetResponse`), vì đề xuất lên cấp trên vốn có nhiều cách nói đúng. Nợ toàn khoá, ma trận đã tự thừa nhận.                                                                                                                                                                                                                                                                                       | Acad v5 mục 10                      |
| HK-M | **`GrammarItem` không có `speakerRole`**, trong khi HK-38 trộn câu nói với cấp trên và câu nói với khách trong cùng một danh sách. Đã vá tạm bằng cách ghi "NÓI VỚI CẤP TRÊN" vào đầu trường `rule` tiếng Việt; sửa triệt để là thêm trường vào type như đã làm cho `SpeakingItem` và `GameRound`.                                                                                                                                                                                                                                                                                                                 | HM v3 2-J                           |
| HK-N | **Quyền dùng AED là quyết định chính sách, không phải quyết định biên tập.** Nội dung hiện viết "không tự mở trừ khi Duty Manager bảo", và đưa "nhà bạn có cho nhân viên bật AED không" vào danh sách năm câu hỏi phải hỏi Executive Housekeeper. Trưởng an ninh/PCCC và bác sĩ khách sạn cần ký xác nhận đoạn này trước khi in.                                                                                                                                                                                                                                                                                   | HM v4 M1-1 · HM v5 1-C              |
| HK-O | **FO-36 không có bài y tế nào** — cả bốn bài là cháy và sơ tán. HK-36 và FB-36 đều chuyền cuộc gọi 115 về phía quầy, mà quầy chưa từng được dạy ca cấp cứu y tế. Lỗ này thuộc batch FO.                                                                                                                                                                                                                                                                                                                                                                                                                            | HM v5 M3-9                          |
| HK-P | **Không gate nào đo độ dài bài đọc theo phase**, và không gate nào đo mẹo "chọn phương án dài nhất" trên `game` (chỉ đo trên `reading`). HK-36 từng lên 81% trên game — vượt ngưỡng mastery 80% — mà mọi gate vẫn xanh.                                                                                                                                                                                                                                                                                                                                                                                            | Acad v3 N3 · Acad v5                |
