# Kiểm định độc lập — OUTLINE tuần 41–80 (đề xuất năm hai)

Bản đóng băng: `FROZEN_COMMIT`. Thứ được chấm là một **outline**, chưa phải bài học: khung chung
`docs/curriculum-41-80.md` và năm file bộ phận `docs/curriculum-41-80/{fo,fb,hk,sw,gr}.md`.
Mốc tham chiếu: **7,5/10 cho từng ô**. Không lấy trung bình giữa các ô để bù. Tổng = trung bình cộng
sáu tiêu chí, xét trước khi làm tròn. Chấm đúng như thấy, không nương tay.

## Phạm vi và nguồn

Hai lượt chấm:

- **AC** (một người): chấm cả outline — khung chung và cách năm bộ phận hiện thực nó. Một ô.
- **HM** (một người, lần lượt đứng ở vai trưởng từng bộ phận): chấm riêng từng bộ phận. Năm ô.

Được đọc, tất cả nằm trong gói đóng băng:

- `docs/curriculum-41-80.md`, `docs/curriculum-41-80/*.md` — thứ được chấm.
- `docs/curriculum-level-matrix.md` — spec chuẩn của tuần 1–40, để kiểm tính nối tiếp.
- `docs/phase4-house-rules.md` — luật nhà và định mức tuần của Phase 4 mà outline nói là giữ nguyên.
- `src/lib/content/p3/`, `src/lib/content/p4/`, `src/lib/content/phase3.ts`, `phase4.ts` — nội dung
  tuần 23–40 đang chạy, để kiểm outline có lặp, có mâu thuẫn, có "dạy như mới" thứ đã dạy không.
- `src/lib/phases.ts`, `writing-score.ts`, `speaking-score.ts`, `checkpoint-paper.ts`,
  `checkpoint-oral.ts`, `src/components/suites/WritingSuite.tsx`, `MediationSuite.tsx`,
  `WeekTestSuite.tsx` — để kiểm những gì outline nói về phép đo có thi công được không.

Outline chưa có bài học, câu mẫu hay bộ chấm của riêng nó. Không trừ điểm vì thiếu thứ một outline
không có nghĩa vụ có; trừ điểm khi outline hứa điều nó không chỉ ra cách đạt.

## Điều khoản kiểm định — bắt buộc

1. Phiên mới độc lập. Cấm đọc HANDOFF, agent-playbook, CODEX, mọi file `*-plan.md`, `docs/audit/*`,
   `academic-review-*`, `review-*`, `BAN-GIAO-*`, thư mục memory, lịch sử git, transcript điều phối,
   báo cáo của auditor khác. Chỉ đọc trong gói đóng băng được chỉ định.
2. Không chạy lệnh git. Không sửa file nào. Không dùng mạng, MCP hoặc chat khác.
3. Mỗi phát hiện phải trích nguyên văn chỗ trong outline (file, tuần, số bài) và, khi nói outline lặp
   hay mâu thuẫn với tuần 1–40, trích cả chỗ tương ứng trong nội dung đang chạy (file:dòng).
4. Outline tự nêu một số giới hạn của chính nó. Việc nó tự thú nhận không làm giới hạn đó hết là
   giới hạn; nhưng cũng không trừ hai lần cho cùng một điều.
5. Không sửa outline để tự chứng minh điểm. Đề xuất sửa cụ thể trong báo cáo.

## Báo cáo cuối

Tiếng Việt, theo rubric nguyên văn ở Phụ lục A. Mỗi tiêu chí 0–10, có bằng chứng. Mỗi tiêu chí ≤ 7,5
phải kèm **thay đổi nhỏ nhất có thể thi công** để vượt 7,5. Không điều chỉnh điểm để đạt mốc. Ghi rõ
blocker (điều phải sửa trước khi viết bất kỳ bài học nào theo outline này).

Đầu báo cáo bắt buộc, mỗi ô một khối:

```
MODULE: <OUTLINE hoặc mã bộ phận> ROLE: <AC hoặc HM>
ĐIỂM: <t1> <t2> <t3> <t4> <t5> <t6> → TỔNG <trung bình>
BLOCKER: <danh sách hoặc không>
```

Sau đó: điểm và lý do từng tiêu chí; top 8 phát hiện mỗi ô có trích dẫn; đề xuất sửa; phát hiện đã
loại vì không đứng vững khi đối chiếu; xác nhận chỉ đọc nguồn được phép. Final text là toàn bộ báo
cáo.

## Phụ lục A — Bộ tiêu chí cho OUTLINE (THƯỚC ĐO, không sửa giữa các vòng)

Bộ tiêu chí của các vòng chấm nội dung (`brief-p2-r9.md`) đo câu mẫu, bộ chấm và đề thi thật — thứ
một outline chưa có. Đây là bản chuyển cùng sáu ý sang thứ một outline có. Điểm của outline **không
so được** với điểm các vòng chấm nội dung.

### Vai Academic Director (AC)

Persona: giám đốc học thuật của một đơn vị khảo thí độc lập, được thuê chấm mù; chưa từng thấy khoá,
không biết ai làm ra, không có nghĩa vụ nói giảm.

- **t1 Tiến trình & độ khó** — bốn giai đoạn có lên độ khó thật không; có nối tiếp tuần 1–40 chứ không
  lặp, không tụt; có tuần nào dùng cấu trúc trước tuần dạy nó, hay dạy như mới thứ tuần 23–40 đã dạy.
- **t2 Mục tiêu can-do & tính sản sinh** — mỗi tuần có "nói được gì" rõ và kiểm được; nhiệm vụ nói,
  viết, chuyển ngữ có buộc học viên tự tạo lời chưa luyện không.
- **t3 Độ khớp CEFR & chất lượng ngôn ngữ của outline** — nhãn B1.1, B1 nghiệp vụ, B1.2, B1+ · tiếp
  xúc B2.1 có khớp mô tả CEFR (tương tác, sản sinh, chuyển ngữ, viết, nghe) không; ví dụ tiếng Anh và
  tên cấu trúc trong outline có đúng và đúng tầm không; lập luận về số giờ có đứng được không.
- **t4 Thiết kế luyện tập & tải** — định mức tuần, tải thật so với 4 giờ, phân bổ kỹ năng, thiết kế
  hai nhánh (2 bài chung + 2 bài riêng), có thi công được với khuôn bài hiện có không.
- **t5 Ôn tập & ghi nhớ** — xoáy vòng, tuần tổng duyệt, tái sử dụng giữa các giai đoạn và với tuần
  1–40; outline có chỉ ra cách giữ từ và cấu trúc cũ sống không.
- **t6 Tính giá trị & khả thi của sát hạch** — bài sát hạch tuần 50, 60, 70, 80 và cách chấm hai tầng
  có đo đúng điều nhãn tuyên bố không, có chống học vẹt không, và có thi công được trên code đang có
  (`writing-score.ts`, `speaking-score.ts`, `checkpoint-*.ts`, các suite) không.

### Vai Hotel Manager (HM)

Persona: trưởng bộ phận của một khách sạn 5 sao ở Việt Nam, 15 năm nghề, được mời đánh giá xem outline
năm hai có đáng để đưa nhân viên của mình học không. Chấm bằng con mắt vận hành. Với mỗi bộ phận,
đứng ở đúng chức danh và nỗi lo của bộ phận đó:

| Bộ phận | Chức danh persona       | Nỗi lo chính khi đọc                          |
| ------- | ----------------------- | --------------------------------------------- |
| FO      | Front Office Manager    | mất tiền, mất mặt                             |
| FB      | F&B Manager             | mất tiền, mất mặt, ngộ độc/dị ứng             |
| HK      | Executive Housekeeper   | mất tiền, mất đồ của khách, tai nạn           |
| SW      | Spa Manager             | thương tích, xâm phạm cơ thể khách, kiện tụng |
| GR      | Guest Relations Manager | lộ thông tin khách, hứa sai, khách VIP phật ý |

- **t1 Đúng nghiệp vụ bộ phận** — tình huống, thứ tự việc, thuật ngữ, ai làm việc gì có đúng với bộ
  phận đó ở khách sạn Việt Nam không.
- **t2 Thẩm quyền & rủi ro** — outline có giữ luật nhà của Phase 4 không; khung thẩm quyền của Nhánh B
  có an toàn không; có tình huống nào đặt nhân viên vào việc không phải của họ.
- **t3 Độ phủ tình huống ca thật** — 32 tuần dạy có phủ những ca thật của bộ phận, kể cả ca khó; có
  lặp tuần 23–40 mà không nâng lên; có ca quan trọng nào vắng mặt.
- **t4 Người nghe & giọng điệu** — mỗi tình huống có đúng là lúc nhân viên bộ phận đó thật sự phải
  dùng tiếng Anh, với đúng người, ở đúng mức trang trọng không.
- **t5 Dùng được trên sàn** — học xong tuần đó có làm được việc đó trong ca không; đường đi từ nhân
  viên lành nghề tới chuyên viên (Nhánh A) và trưởng ca (Nhánh B) có giống đường đi thật không.
- **t6 Hiệu quả trên thời gian bỏ ra** — 40 tuần nữa có đáng với bộ phận này không; mốc tuần 60 và
  tuần 80 có đủ tin để xếp ca, đề bạt không.
