# Phase 4 (tuần 31–40) — chuẩn soạn lại để đạt 7,5

Người dùng chốt 06/10/2026: **sửa Phase 4 tới khi cả 10 ô (5 Academic Director + 5 Hotel
Manager) đạt ≥ 7,5**, chấm mù độc lập liên tục như Phase 3. Vòng 1 (`7ed3254`): 0/10, AC TB 5,08,
HM TB 6,17 — tóm tắt `docs/audit/p4-r1-summary.md`, báo cáo đầy đủ
`%TEMP%/hospitality-p4-r1-7ed3254/<ô>/report.md`.

File này là chuẩn cho người viết. Auditor **không** đọc file này.

## 1. Kiến trúc

Mỗi bộ phận một thư mục, mỗi tuần một file — giống Phase 3 (`p3/`), nhưng tách theo tuần:

```
src/lib/content/p4/kit.ts          cardsFor(dep), lessonsFor(dep), risk(), assemble()
src/lib/content/p4/<dep>/w31.ts …  export const week: AuthoredWeek = { lessons, canDo, title? }
src/lib/content/p4/<dep>/index.ts  ghép 10 tuần (đã có sẵn, không sửa)
```

- `cardsFor(dep)(word, context, gloss?)`: tìm thẻ theo từ — trước hết trong các từ bộ phận đã
  gloss ở tuần P4 trước (để tuần 40 trình bày lại thẻ tuần 31), rồi ngân hàng P4/P3 của bộ phận.
  Từ mới chưa có ở đâu thì **phải** đưa gloss `[phonetic IPA Anh-Anh, nghĩa tiếng Việt, emoji]`.
- `lessonsFor(dep)(week, order, titleEn, titleVi, parts)`; `risk(speakingItem)` đánh dấu lượt
  bắt buộc đúng.
- Tuần có `lessons` rỗng thì app tự rơi về bản cũ; tuần đã viết thì `phase4.ts` dùng nó, tự
  khoá headword vào bộ chấm, tự xếp lịch ôn (`reviewWordsFor`), gắn bài viết tuần 33 và can-do.
- Không sửa file nào ngoài `p4/<dep>/` của mình. Bài viết tuần 33 (`WEEK33_WRITING_TASKS` trong
  `phase4.ts`) do điều phối viên sửa.

Tham khảo khuôn bài: `src/lib/content/p3/<dep>.ts` (Phase 3 đã đạt). Kiểu dữ liệu:
`src/lib/content/week-content.ts` (`SpeakingItem`, `GameRound`, `ReadingQuestion`, `GrammarItem`).

## 2. Nội dung từng tuần

| Tuần | Chức năng                                | Ngôn ngữ mới (ma trận)                                 |
| ---- | ---------------------------------------- | ------------------------------------------------------ |
| 31   | Kể chuyện sản phẩm/dịch vụ               | câu ghép 2–3 mệnh đề, tính từ cảm xúc                  |
| 32   | Tư vấn chuyên sâu, cá nhân hoá           | Based on…; Since you mentioned…                        |
| 33   | Tranh chấp & bồi thường (LAST đủ 4 bước) | Policy allows… up to…; Let me check with my supervisor |
| 34   | Dịp đặc biệt, bất ngờ cho khách          | phối hợp đa bộ phận; câu chúc trang trọng              |
| 35   | Đàm phán nhẹ (nội bộ & khách)            | What if we…? in exchange for…; however                 |
| 36   | Khủng hoảng (thời tiết, y tế, kỹ thuật)  | hướng dẫn khẩn: một việc + một mốc giờ                 |
| 37   | Điều khoản có điều kiện (xem bảng dưới)  | điều kiện, tỷ lệ, thời hạn                             |
| 38   | Trình bày đề xuất ngắn                   | cấu trúc pitch 3 phần                                  |
| 39   | Tổng duyệt + **hai luật mới**            | thứ tự ưu tiên; 15 phút cuối ca                        |
| 40   | Đánh giá cuối khoá: ca làm việc tổng hợp | không dạy luật mới                                     |

Tuần 37–38 theo bộ phận (ma trận ghi các ngoại lệ này):

| Bộ phận | Tuần 37                                                                                                                    | Tuần 38                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| FO      | Điều khoản khách đoàn/doanh nghiệp: giá corporate, allotment, hạn chốt rooming list, cọc, huỷ                              | Trình bày báo giá phòng + phòng họp cho người đặt doanh nghiệp                           |
| FB      | Điều khoản tiệc/sự kiện: cọc, số khách đảm bảo, hạn chốt, huỷ, minimum spend, corkage                                      | Trình bày đề xuất thực đơn/tiệc, giá plus-plus, hiệu lực báo giá                         |
| HK      | Điều khoản dịch vụ có điều kiện: lịch dọn khách lưu trú dài, DND, đồ thất lạc, giặt là                                     | Trình bày kế hoạch/đề xuất (bố trí phòng dịp đặc biệt, lịch dọn) cho khách hoặc giám sát |
| SW      | Điều khoản gói & thẻ thành viên, huỷ/no-show, và điều kiện của một liệu trình (đồng thuận, che phủ, yêu cầu kỹ thuật viên) | Trình bày kế hoạch liệu trình/gói cho khách                                              |
| GR      | Cấp cứu y tế (ngoại lệ GR)                                                                                                 | Bão, gián đoạn lịch trình (ngoại lệ GR); tuần 36 GR là sơ tán                            |

**Tuần 39** phải có hai bài dạy đủ cụm (thẻ, ngữ pháp, lượt nói, game, câu đọc):
(1) **thứ tự ưu tiên** khi nhiều việc tới cùng lúc, và "nguy hiểm trước" nghĩa là LÀM GÌ (gọi
an ninh/sơ cứu/115 trước, Duty Manager sau, ở lại với khách); (2) **"mười lăm phút cuối ca không
mở việc mới"**: việc đến trong 15 phút cuối thì ghi lại và bàn giao đích danh cho ca sau, không
tự mở. Hai bài còn lại là tổng duyệt tình huống chéo.

**Tuần 40** là tuần ôn và kiểm tra: thẻ trình bày lại headword tuần 31–39 (được phép lặp), lượt
nói là các tình huống ca làm việc thật trộn mọi chức năng. **Không có câu nói về khoá học**
("the test", "what I learned"). Bài đọc là tình huống ca, không phải lời tổng kết khoá.

## 3. Định mức mỗi tuần (công cụ: `bun scripts/probes/p4check.ts <DEP>`)

| Mục               | Định mức                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Bài               | 4 bài/tuần                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Thẻ               | 16–18/tuần, **headword chưa từng dạy** ở bộ phận này (trừ tuần 39–40 trình bày lại). Câu `context` chứa đúng headword                                                                                                                                                                                                                                                                                                                                                                                                                     |
| Headword được nói | ≥ 75% headword của tuần có mặt trong ít nhất một `targetResponse` của tuần                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| Dùng lại          | mỗi tuần ≥ 3 câu đích nói lại headword của tuần P4 trước                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| Ngữ pháp          | 2 cặp/bài (8/tuần), **cặp nào cũng có `nearMiss`** — một lỗi hình thái người Việt hay mắc, khác `polite` đúng một chỗ; `rule` tiếng Việt                                                                                                                                                                                                                                                                                                                                                                                                  |
| Lượt nói          | **≥ 5 lượt/bài (≥ 20/tuần)**; mỗi bài ≥ 1 chuỗi 3 lượt (`follows` = câu đích của lượt trước)                                                                                                                                                                                                                                                                                                                                                                                                                                              |
| Câu đích          | ≤ 22 từ mỗi câu, ≤ 2 câu, nên ≤ 28 từ cả lượt                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `risk`            | ≥ 2 lượt/tuần (tiền, thẩm quyền, an toàn, riêng tư, dị ứng); mỗi lượt `risk` có `alsoAccept` ≥ 2 câu                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `alsoAccept`      | thêm cho ít nhất 1/3 số lượt: cách nói đúng phổ biến (I am calling… / May I call…; could/would; cannot/am not able to; Duty Manager/manager on duty)                                                                                                                                                                                                                                                                                                                                                                                      |
| Vai người nói     | `speakerRole` cho mọi lời không phải của khách; nói với đồng nghiệp/cấp trên thì **không** sir/madam                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| Bài đọc           | 1/bài, 120–300 từ, 2–3 câu hỏi, câu hỏi và phương án tiếng Việt, **mỗi câu có `explanation`**, vị trí đáp án thay đổi; theo ký tự, đáp án đúng là phương án dài nhất ở 30–40% số câu, ngắn nhất ≤ 40% (vòng 2: đáp án gần như không bao giờ dài nhất → "chọn ngắn nhất" vượt sàn khối đọc 80–92% đề) — đo bằng `shape.ts`                                                                                                                                                                                                                 |
| Game              | **2 vòng/bài (8/tuần)**, mỗi vòng 3 phương án có `kind`: `answer`, `form` (lỗi tiếng Anh), `register` (tiếng Anh đúng nhưng sai thẩm quyền/giọng); **mỗi vòng có `explanation`** tiếng Việt nói vì sao từng phương án sai; đáp án đúng không dài nhất quá 40% số vòng; ở 36–50% số vòng `form` là bản sao câu `register` sai đúng một lỗi ngữ pháp, để đáp án là câu lạc loài (vòng 2: 80/80 vòng giải được bằng "loại câu lạc loài, chọn câu đúng ngữ pháp"); đáp án không chép câu nói cùng bài; `speakerRole` cho lời không phải khách |
| helpTip           | tiếng Việt, chỉ trích những chữ có trong câu đích                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| canDo             | một dòng "Nói được: …" cho mỗi tuần                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| Tự qua            | mọi câu đích và mọi `alsoAccept` phải qua bộ chấm (p4check cột `self` = 0)                                                                                                                                                                                                                                                                                                                                                                                                                                                                |

## 4. Luật nhà — một tình huống một luật, cả phase giống nhau

- **Y tế / thương tích**: dừng việc → gọi sơ cứu/y tá/115 → ở lại với khách → báo quản lý. Không
  bao giờ nói "Nobody has been hurt", "There is no danger", "Please stay calm", "he is in good
  hands". Trấn an bằng **một việc + một mốc giờ** ("The nurse is coming — two minutes.").
  Thương tích không bàn bồi thường tại chỗ, không nhận lỗi.
- **Cháy / sơ tán**: cầu thang, không thang máy; không quay lại lấy đồ; không tắt/reset tủ báo
  cháy; điểm tập kết; người không đi được → báo số phòng cho đội cứu hoả, không tự hứa an toàn.
- **Tiền**: nhân viên tuyến đầu không tự hứa hoàn tiền, miễn phí, giảm giá, nâng hạng, quà có giá
  trị tiền; câu chuẩn là xin cấp trên ("May I check with my supervisor?" / "I am asking my Duty
  Manager now"). Không đọc hạn mức nội bộ cho khách. Hoàn tiền thẻ: nói mốc **chậm nhất**.
- **Thẩm quyền**: nói rõ việc của ai ("That decision is my Duty Manager's"), nhưng nói với khách
  bằng giọng phục vụ, không lặp công thức cộc.
- **Riêng tư**: không xác nhận khách có ở khách sạn, không đọc số phòng, không hỏi quan hệ/tuổi/
  tiền/sức khoẻ của khách khi khách không nói trước.
- **Dị ứng**: hỏi trước khi phục vụ; ghi giấy cho bếp; không hứa "an toàn tuyệt đối"; không chỉ
  món "an toàn" ở quầy mở.
- **Rượu**: khách say → nước + đồ ăn, không hứa quầy bar sau đó; giám sát quyết từ chối.
- **Hứa giờ thay bộ phận khác**: không; nói "I will ask … and come back to you by …".

Mâu thuẫn giữa các tuần là lỗi nặng nhất vòng 1 (GR-37 vs GR-40, HK-33 vs HK-38, FO-39 vs bài
đọc của chính nó). Trước khi viết một tình huống, tìm xem tuần trước đã dạy luật gì cho nó.

## 5. Tránh

- Câu đích bắt nói tên riêng/con số khách không nêu (thi ẩn câu mẫu — thành bài kiểm trí nhớ).
- Bài đọc trích "week N" hay trích lại câu tuần khác (vòng 1 trích sai). Không nhắc số tuần.
- Câu vô nghĩa do ghép danh từ; chính tả Mỹ (dùng apologise, colour, favourite, centre).
- Bài đọc > 300 từ; thẻ không nằm trong bài; tip dạy chữ không có trong câu đích.
- Lời đồng nghiệp/quản lý gắn vai khách.
- Trong game, câu chứa "you cannot", "what do you say", "the guest asks/says…" bị QA T6b chặn vì
  đọc như đề bài. Từ chối bằng "We cannot let you…", "I am afraid … is not possible".

## 6. Quy trình cho người viết (subagent)

1. Worktree: `git fetch origin && git reset --hard origin/content/p4`. Nếu thiếu `node_modules`:
   `New-Item -ItemType Junction -Path node_modules -Target "D:\AI_app\Hospitality English\.claude\worktrees\content-p3\node_modules"`.
2. Đọc báo cáo AC và HM của bộ phận mình ở `%TEMP%/hospitality-p4-r1-7ed3254/`, bản render cũ
   (`bun scripts/probes/six1.ts grep . 31 40` hoặc getWeekContent), và `p3/<dep>.ts` làm khuôn.
3. **Viết từng tuần một, mỗi tuần một lần ghi file** (soạn cả nghìn dòng trong một lần gọi công
   cụ làm treo agent).
4. Sau mỗi tuần: `bun run typecheck` và `bun scripts/probes/p4check.ts <DEP> <tuần> <tuần>`.
5. Cuối: `bun run verify:content` phải xanh. Ratchet tăng vì bộ phận mình thì sửa nội dung, không
   hạ chốt; `LINT_CONTENT_FULL=1 bun run lint:content` in danh sách vi phạm. Trước khi commit:
   `git checkout -- scripts/` (lint tự ghi baseline). Chỉ commit `src/lib/content/p4/<dep>/`.
6. Trả lời cuối: SHA commit, bảng p4check, và những điều chưa làm được.
