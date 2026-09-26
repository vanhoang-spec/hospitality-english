# Kiểm định độc lập — Embassy Hospitality English, PHASE 2 (tuần 15–22)

Bản đóng băng: `4b25904`. Mốc đạt: **7,5**.

Ranh giới phase (theo `phases.ts`, KHÔNG phải theo trí nhớ): P0 = tuần 1–6, P1 = 7–14,
P2 = 15–22 (checkpoint tuần 22), P3 = 23–30 (checkpoint tuần 30), P4 = 31–40.

Repo: gốc repo này (bun). Nội dung Phase 2 nằm ở
`src/lib/content/phase2.ts` (khung câu dùng chung + bản đồ `DEPT_LESSONS`),
`src/lib/content/phase2-lexicon.ts` (ngân hàng từ riêng từng bộ phận) và
`src/lib/content/phase2-dept-review.ts` (bài ôn riêng, gắn theo `j % 4`).
**Render thật** lấy qua `getWeekContent(dep, week)` trong
`src/lib/content/week-content.ts`.

Bộ chấm nói: `src/lib/speaking-score.ts` (`utterancePassed`,
`utterancePassedAny`) và `src/lib/speaking-alternates.ts` (`acceptedAnswers`).
Bài sát hạch: `src/lib/checkpoint-paper.ts` (`buildPaper`) và
`src/lib/checkpoint-oral.ts` (`buildOral`, `oralHalfPassed`) — gọi thẳng được.
Màn hình thi: `src/components/suites/WeekTestSuite.tsx`. Cấu hình mốc:
`src/lib/phases.ts`.

Tuần 1–14 (Phase 0 và Phase 1) đã chấm xong và đã đạt — **không chấm lại**.
Được phép đọc để kiểm tính liên tục: kỹ năng tuần 1–14 đã có mà tuần 15–22 dạy
ngược lại, từ đã dạy rồi dạy lại, mức khó tụt xuống. Đó là loại phát hiện có
giá trị cao.

## Điều khoản kiểm định — bắt buộc

1. **KHÔNG đọc** `docs/academic-review-*`, `docs/review-*`, và **không đọc lịch
   sử git** (`git log`, `git show`, `git diff`, `git blame`). Đây là lượt chấm
   mù. Không đọc báo cáo của auditor khác.
2. **KHÔNG sửa bất kỳ file nào trong repo.** Không `git add`, `git commit`,
   `git checkout`, `git restore`, `git stash` (repo có hook tự commit).
3. Script tạm của bạn viết vào **thư mục riêng của bạn** (đường dẫn ở cuối
   brief), không viết vào repo.
4. **Mọi trích dẫn phải đối chiếu lại nguyên văn tại file:dòng trước khi đưa
   vào báo cáo.** Nội dung render ra sáu bộ phận khác nhau, nên một chuỗi
   trong source có thể KHÔNG phải chuỗi học viên thấy — kiểm bằng
   `getWeekContent`. Phát hiện nào không qua được bước đối chiếu thì loại, và
   nói rõ bạn đã loại.
5. Chạy được `bun run verify:content`, `bun run lint:content` và
   `bun run qa:full` để lấy dữ kiện — nhưng gate xanh là dữ kiện, không phải
   kết luận chất lượng.
6. Nói về bộ chấm hay bài thi thì **gọi đúng hàm production** trong script của
   bạn (`utterancePassedAny`, `buildPaper`, `buildOral`, `oralHalfPassed`).
   Chép lại luật vào script rồi đo bản chép là cách các vòng trước ra số sai.

## Kiến trúc cần biết trước khi chấm

**Khung câu dùng chung + ngân hàng từ riêng.** Sáu bộ phận luyện cùng một mẫu
câu mỗi tuần nhưng thay từ vựng của chính bộ phận mình. Đây là **chủ đích thiết
kế**, không phải lỗi sao chép. Nhưng **mức độ** thì được chấm: nếu tình huống
của bộ phận bạn không bao giờ xảy ra như khung mô tả, đó là phát hiện hợp lệ và
là loại có giá trị nhất.

Khung đọc ngân hàng **theo chỉ số** (`lx.bank.steps/offers/details/paperwork/
rules/choices/reports/wrapUp`), nên mỗi ô ngân hàng là một hợp đồng ngữ nghĩa.
Một ô lệch lớp sẽ render ra tiếng Anh không dùng được **chỉ ở một vài bộ phận**.
Cách bắt nhanh: in năm bản render của cùng một site cạnh nhau.

**`DEPT_LESSONS`** thay hẳn một bài khung ở cùng vị trí, giữ nguyên bộ headword
của ô đó. Bạn được đề xuất thêm — nêu rõ tuần/bài, tình huống thay thế, và giữ
bộ headword nào.

## Những điều đã chốt — đừng chấm lại

- **Bộ phận Back Office (BO) ngoài phạm vi.** Chỉ chấm bộ phận được giao.
- Tầng đánh theo quy ước nút thang máy (tầng 1 = ground floor của khách sạn này).
- Bài đọc là kỹ năng **tiếp nhận**: câu trong bài đọc được phép dài hơn trần câu
  học viên phải nói.
- Trần câu Phase 2: **≤ 13 từ**, đo theo từng câu (`verify-content.ts` đặt `strict = phase.to <= 14`, nên từ tuần 15 trần thực thi là `wordCap + 1`). Một lượt lời gồm hai câu ngắn
  là hợp lệ.
- Trần từ vựng mỗi tuần: **12–16 headword, cứng**. Đề xuất "thêm thẻ" chỉ nhận
  được nếu nói rõ thẻ nào bị bỏ ra để nhường chỗ.
- Một headword không được xuất hiện hai lần trong tuần 1–22.
- Mỗi tuần phải có **≥ 65% nội dung riêng theo bộ phận** (gate đo sẵn).
- Vị trí đáp án: mọi suite đều xáo trước khi hiển thị (`shuffle`), nên "đáp án
  luôn ở vị trí đầu trong source" **không** phải phát hiện.
- Bộ chấm nói khoá **động từ lời hứa** (ask, arrange, bring, call, change,
  check, help, repeat, report, show, sign, speak, stop, take, tell, transfer,
  wait, be): nói `stop` thay cho `check` là TRƯỢT, có chủ đích. Lỡ một mạo từ
  vẫn qua; lỡ một giới từ thì không.
- Từ tuần 15, bộ chấm tha **một** từ nội dung thừa, và tha một từ nội dung
  thiếu — nhưng **không** tha nếu từ đó là headword của chính tuần ấy. Đây là
  thiết kế, không phải lỗ hổng; chấm được là chấm các ca cụ thể nó cho qua sai.
- Bài thi cuối phase có **một ô nói dự trữ bắt buộc đúng** (câu từ chối / xin ý
  kiến cấp trên / rủi ro của bộ phận). Đây là thiết kế.
- **Ô nói dự trữ** được chọn bằng mẫu tả HÀNH VI (từ chối, hoãn, xin ý kiến cấp trên, sàng lọc,
  sơ cứu), không bằng danh sách danh từ. Riêng Guest Relations vẫn giữ một danh từ (`room number`)
  vì bể ô dự trữ của GR ở Phase 1 chỉ có hai câu và đều vào nhờ từ đó — siết nữa là tuần 14 của GR
  mất hẳn ô dự trữ. Đây là lựa chọn có chủ đích, không phải sót.
- **Suất tha một từ** khoá headword của **mọi tuần 1..N**, trừ bốn thẻ lịch sự (`Please`,
  `Certainly`, `Sorry`, `Very`): tuần dạy chúng vẫn khoá, tuần sau thì không — vì một từ lịch sự
  không bao giờ làm sai một câu phục vụ.
- **Giới từ** (`about/with/from/by/near/without/than/but/while/instead`) là token bắt buộc, không
  phải hư từ. Thiếu một mạo từ vẫn qua; thiếu một giới từ thì không.
- **Hạng độ dài ở khối Nghe** rút theo số TỪ, và cặp trùng độ dài có ô riêng. Mẹo mạnh nhất còn
  36,6–40,0% so với mức ngẫu nhiên 33,3% — đây đã là mức phẳng nhất đạt được mà không sửa nội dung.
- **`follows` chỉ giải trong phạm vi bài của chính nó**, không có fallback sang tuần hay phase.
  Mắt xích nhập nhằng bị từ chối và lượt đó bị gạch khỏi bể rút đề. Vé rút đề của một câu in nhiều
  lần thuộc về bản MỞ một hội thoại.
- **Số bước của quy trình tuần 15 khác nhau theo bộ phận có chủ đích**: F&B và Buồng phòng
  tuần 15 là tuần viết tay dạy quy trình **bốn** bước thật; bốn bộ phận kia đọc ô ngân hàng
  tám bước. Câu ôn tuần 16 lấy con số theo từng bộ phận. Không phải mâu thuẫn.
- **Độ dài phương án đọc hiểu đã được cân có chủ đích** về chênh ≈ +0,02 từ so với nhiễu
  (bằng chuẩn của spine Phase 1). Cả hai mẹo độ dài đang ở hoặc dưới mức đoán bừa
  (ngắn nhất 32,7% so với 33,3%). **Cố ý giữ lại ~20% câu mà đáp án vẫn dài nhất** — "đáp án
  không bao giờ dài nhất" cũng là một mách nước. Đừng chấm là lỗi nếu chỉ đếm số câu.
- **Nhiễu arcade có hai loại**: `form` (câu vỡ ngữ pháp, nhận câu phản hồi đóng hộp) và
  `register` (câu đúng ngữ pháp nhưng sai mức lịch sự / sai thẩm quyền, nhận lời giải đã soạn
  hoặc câu trung tính). Nhãn đã được rà lại toàn khoá.
- **Dấu lịch sự (`please`, `certainly`, `sorry`, `very`, `now`) không bao giờ là token bắt buộc.**
  Bỏ một dấu lịch sự không làm sai một câu phục vụ — đây là thiết kế, không phải lỗ hổng.
- **Đường chấm của bài thi và của bài luyện nay giống hệt nhau.** Nếu đo ra khác, đó là phát hiện.
- **Mỗi bài có hai vòng arcade** ở tuần 15–22; vòng thứ hai dựng trên headword mà vòng thứ nhất
  không luyện. Không phải "lặp lại bài tập".
- `nearMiss` (khối ngữ pháp) và `explanation` (game) đã phủ toàn Phase 2 — chấm
  **chất lượng từng câu** thì hợp lệ, nhưng "thiếu trường này" thì không.

## Cách chấm

Chấm **0–10 cho từng tiêu chí trong danh sách của vai bạn**, rồi cho
**điểm tổng = trung bình cộng**. Ghi số lẻ tới một chữ số thập phân.

Với **mỗi** tiêu chí dưới 7,5, nêu **thay đổi nhỏ nhất** đưa nó lên 7,5 — cụ thể
tới mức thi công được (file, bài, câu nào, thay bằng câu gì), và ước lượng tiêu
chí đó sẽ lên bao nhiêu sau khi làm.

Xếp hạng mọi phát hiện theo mức độ nặng. Nêu rõ cái nào là **lỗi chặn**
(blocker) — thứ mà nếu để nguyên thì không nên phát hành.

## Kết quả trả về

Viết báo cáo đầy đủ ra file trong thư mục riêng của bạn, rồi trả về (final text)
một bản gọn gồm đúng các phần sau:

    MODULE: <mã>  ROLE: <AC hoặc HM>
    ĐIỂM: <t1> <t2> <t3> <t4> <t5> <t6>  → TỔNG <x,y>
    BLOCKER: <danh sách, hoặc "không">
    TOP 8 PHÁT HIỆN: mỗi dòng = mức nặng · mô tả một câu · file:dòng · sửa nhỏ nhất
    ĐƯỜNG LÊN 7,5: nếu làm trọn danh sách trên thì tổng ước tính là bao nhiêu
    ĐÃ LOẠI: những phát hiện không qua được bước đối chiếu nguyên văn

---

## Phụ lục A — Bộ tiêu chí của hai vai (THƯỚC ĐO, không được sửa giữa các vòng)

> Trước đây bộ tiêu chí chỉ nằm trong prompt của từng auditor, nên brief này một mình không
> tái lập được thước đo — và một lần phải dựng lại rubric từ trí nhớ đã làm hai vòng liên tiếp
> không so được với nhau. **Muốn so điểm giữa các vòng, dùng đúng nguyên văn dưới đây.**
> Tổng = trung bình cộng sáu tiêu chí. Kiểm lại phép cộng của auditor — đã có một báo cáo ghi
> tổng 7,6 trong khi sáu tiêu chí của chính nó trung bình 7,25.

### Vai Academic Director (AC)

Persona: giám đốc học thuật của một đơn vị khảo thí độc lập, được thuê chấm mù; chưa từng thấy
khoá, không biết ai làm ra, không có nghĩa vụ nói giảm.

- **t1 Tiến trình & độ khó** — các tuần của phase có lên độ khó thật không; nối tiếp phase
  trước chứ không lặp hay tụt.
- **t2 Mục tiêu can-do & tính sản sinh** — mỗi tuần có mục tiêu "nói được gì" rõ ràng; từ
  được dạy có thực sự được SẢN SINH chứ không chỉ nhận diện.
- **t3 Độ chính xác ngôn ngữ & chất lượng đầu vào** — câu mẫu, helpTip, IPA, lời giải, bài
  đọc, câu hỏi.
- **t4 Thiết kế luyện tập & tải nhận thức** — mật độ, đa dạng nhiệm vụ, độ khó vừa sức, chất
  lượng phản hồi.
- **t5 Ôn tập & ghi nhớ** — tái sử dụng có giãn cách, bộ lập lịch ôn, từ chết.
- **t6 Tính giá trị & tin cậy của bài sát hạch** — `buildPaper`, `buildOral`,
  `oralHalfPassed`, bộ chấm nói: đo đúng thứ đã dạy không, chống học vẹt và mẹo làm bài không,
  chấm đúng/chấm oan không. **Gọi ĐÚNG hàm production**, không chép luật ra rồi đo bản chép.

### Vai Hotel Manager (HM)

Persona: trưởng bộ phận của một khách sạn 5 sao ở Việt Nam, 15 năm nghề, được mời đánh giá
xem khoá có dùng được để đào tạo nhân viên của mình không. Chấm bằng con mắt vận hành.

| Bộ phận | Chức danh persona       | Nỗi lo chính khi đọc                          |
| ------- | ----------------------- | --------------------------------------------- |
| FO      | Front Office Manager    | mất tiền, mất mặt                             |
| FB      | F&B Manager             | mất tiền, mất mặt, ngộ độc/dị ứng             |
| HK      | Executive Housekeeper   | mất tiền, mất đồ của khách, tai nạn           |
| SW      | Spa Manager             | thương tích, xâm phạm cơ thể khách, kiện tụng |
| GR      | Guest Relations Manager | lộ thông tin khách, hứa sai, khách VIP phật ý |

- **t1 Đúng nghiệp vụ bộ phận** — quy trình, thứ tự bước, thuật ngữ, ai làm việc gì.
- **t2 Thẩm quyền & rủi ro** — được phép hứa gì; khi nào bắt buộc báo cấp trên. Riêng theo bộ
  phận:
  - FO: an toàn, riêng tư của khách, trách nhiệm pháp lý, tiền bạc
  - FB: báo bếp/quản lý; dị ứng, an toàn thực phẩm, rượu, hoá đơn, tiền bạc
  - HK: báo giám sát; mở cửa phòng, đồ thất lạc, hoá chất, sàn ướt, riêng tư của khách
  - SW: dừng và gọi quản lý/y tế; phiếu khai sức khoẻ, thai kỳ, chấn thương, thuốc, ranh giới
    cơ thể, nhiệt và nước
  - GR: báo quản lý; bảo mật thông tin khách, nâng hạng phòng, quà tặng và lời xin lỗi có giá
    trị tiền bạc
- **t3 Độ phủ tình huống ca thật** — gồm cả ca khó.
- **t4 Giọng điệu & mức lịch sự với khách** — cộc lốc, suồng sã hay khúm núm quá đều là lỗi.
- **t5 Dùng được ngay trên sàn** — nhân viên mới học xong tuần đó có nói được đúng câu ấy trong
  ca hôm sau không.
- **t6 Hiệu quả trên thời gian bỏ ra** — các tuần học có đáng không, và tấm chứng chỉ cuối phase
  có đủ tin để xếp người đó vào ca không.

## Phụ lục B — Cách chạy một vòng

1. Đóng băng một commit, thay commit đó vào dòng "Bản đóng băng" ở đầu file. Muốn chấm phase
   khác thì sửa tuần và tên file nội dung ở phần đầu, **giữ nguyên Phụ lục A**.
2. Cập nhật mục "Những điều đã chốt" với các quyết định mới — auditor không được chấm lại
   những gì đã chốt có chủ đích.
3. Chạy **10 auditor độc lập**, 5 AC + 5 HM, mỗi người một bộ phận × vai. Mỗi auditor một thư
   mục làm việc riêng **ngoài repo** (trùng tên file thì chúng ghi đè lên nhau).
4. Auditor không được: đọc `docs/academic-review-*`, `docs/review-*`, lịch sử git, báo cáo của
   nhau; sửa file trong repo; chạy bất kỳ lệnh git nào (repo có hook tự commit).
5. Trước khi sửa theo bất kỳ phát hiện nào: **đối chiếu lại nguyên văn bằng `getWeekContent`**.
   Auditor giỏi vẫn sai, và một câu trong source có thể không phải câu học viên thấy.
6. Kiểm lại phép cộng của từng báo cáo.
