# Kiểm định độc lập — Embassy Hospitality English, PHASE 3 (tuần 23–30)

Bản nội dung đóng băng: `FROZEN_COMMIT` (nguồn src nguyên vẹn, manifest SHA256 trong gói chấm).
Mốc đạt: **trên 7,5/10 cho từng ô**, không lấy trung bình giữa các bộ phận để bù.
Đúng 7,5 không pass. Tổng = trung bình cộng sáu tiêu chí, xét trước khi làm tròn.

## Phạm vi và nguồn

Chỉ chấm bộ phận được giao trong FO/FB/HK/SW/GR, 8 tuần × 4 bài = 32 bài.
P3 = tuần 23–30, checkpoint tuần 30. Được đọc tuần 1–22 để kiểm liên tục, không chấm lại.
BO và SE ngoài phạm vi. Không chấm P4.

Nguồn: P3 của mỗi bộ phận được viết riêng trong `src/lib/content/p3/<bộ phận>.ts` (thẻ lấy
qua `p3/kit.ts` từ `phase3-lexicon.ts`), lắp vào tuần bởi `src/lib/content/phase3.ts`.
Học viên thấy bản `getWeekContent(dep, String(week))` — có thêm khoá headword và danh sách
ôn của bộ lập lịch. Đọc đủ 32 bài render của bộ phận được giao.

Bộ chấm: `utterancePassed`, `utterancePassedAny` trong `src/lib/speaking-score.ts`;
`acceptedAnswers` trong `src/lib/speaking-alternates.ts`.
Thi: `buildPaper` trong `src/lib/checkpoint-paper.ts`; `buildOral`, `answersOf`,
`oralHalfPassed` trong `src/lib/checkpoint-oral.ts`; UI `WeekTestSuite.tsx`.
Mốc và cơ cấu bài thi lấy từ `src/lib/phases.ts`. Gọi hàm thật khi đo, không chép luật.

## Điều khoản kiểm định — bắt buộc

1. Phiên mới độc lập, không đọc báo cáo của nhau hoặc điểm các vòng trước. Cấm đọc
   HANDOFF, agent-playbook, CODEX, p3-plan, p3-fix-plan, docs/audit/p3-r1-\*, academic-review-_,
   review-_, lịch sử git, transcript điều phối. Không truy cập repo gốc hoặc thư mục của auditor khác.
2. Không chạy bất cứ lệnh git nào. Không sửa nguồn được giao. Chỉ viết nháp và báo cáo
   trong thư mục riêng được chỉ định. Không dùng mạng, MCP hoặc chat khác.
3. Đối chiếu trích dẫn bằng getWeekContent; báo tuần, lessonId, trường, nguyên văn,
   file:dòng tương ứng. Nêu rõ loại bỏ phát hiện nào do không tái hiện được.
4. CI xanh không phải bằng chứng chất lượng. Nếu script gate có ghi baseline, không chạy
   trên bản nguồn: chỉ chạy bản sao trong thư mục nháp riêng. Không hạ baseline.
5. Đánh giá độc lập từ nguồn và phép đo. Bình luận lịch sử trong source không phải
   bằng chứng; không lấy con số trong bình luận thay cho phép đo hiện tại.
6. Không sửa nội dung để tự chứng minh điểm. Đề xuất sửa cụ thể trong báo cáo.

## Những điều đã chốt cho P3

- P3 của FO/FB/HK/SW/GR viết riêng theo bộ phận; đánh giá độ phù hợp nghiệp vụ của bản render.
- Lượt nói đánh dấu `risk` (`SpeakingItem.risk`) là bể của ô bắt buộc đúng: `buildOral` rút ô
  dự trữ trong số đó (cả chuỗi `follows` chứa nó), và câu thay thế của ô chỉ giữ câu cũng `risk`.
- 14–16 headword/tuần; review tối thiểu 35%, nội dung riêng theo bộ phận tối thiểu 65%.
- Spec trần câu nói 16 từ, gate hiện chấp nhận 17. Ghi rõ hai chuẩn khi nêu phát hiện;
  hai câu ngắn trong một lượt được phép; bài đọc không chịu trần câu nói.
- Mục tiêu P3: hội thoại 3–4 lượt, hai mệnh đề; tiếp nối P2, đầu ra A2+ trong nghiệp vụ.
- Tuần 23 gợi ý/nâng cấp, 24 chính sách/phí, 25 cam kết thời gian, 26 phối hợp,
  27 tiếp nhận phàn nàn, 28 giải pháp có điều kiện, 29 bàn giao, 30 checkpoint.
- Vị trí đáp án được shuffle trước hiển thị; vị trí trong source không phải lỗi.
- Đây là khóa luyện câu mẫu, không chứng nhận B1 hoặc role-play tự do. Vẫn đánh giá
  tính giá trị của luyện tập và kỳ thi trong phạm vi mục tiêu đã công bố.
- Bài thi thiết kế có ô dự trữ bắt buộc đúng; kiểm bằng cờ reserved và oralHalfPassed,
  không giả định câu đầu luôn là dự trữ. Phân biệt không có ô với trả lời sai ô.
- Giữ các quyết định engine đã hiện thực, nhưng ca cụ thể chấm oan/cho qua sai là phát hiện.
- Không áp ngoại lệ P2 về độ phủ nearMiss, lời giải, arcade hoặc số bước vào P3.

## Báo cáo cuối

Báo cáo đầy đủ bằng tiếng Việt, theo rubric nguyên văn bên dưới. Mỗi tiêu chí 0–10,
nêu bằng chứng. Mỗi tiêu chí ≤7,5 cần thay đổi nhỏ nhất có thể thi công để vượt 7,5.
Không điều chỉnh điểm để đạt mốc. Ghi rõ blocker phát hành, xếp mức độ phát hiện.

Đầu báo cáo bắt buộc:

MODULE: <mã> ROLE: <AC hoặc HM>
ĐIỂM: <t1> <t2> <t3> <t4> <t5> <t6> → TỔNG <trung bình>
BLOCKER: <danh sách hoặc không>

Sau đó: điểm và lý do từng tiêu chí; top 8 phát hiện có trích dẫn đã render; đề xuất sửa;
kết quả phép đo và lệnh tái lập; phát hiện đã loại; xác nhận chỉ đọc nguồn được phép.
Final text là toàn bộ báo cáo, không chỉ dẫn đường link.

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
