# P3 — khảo sát và kế hoạch nghiệm thu

Ngày 28/09/2026. Người dùng cho mở lại P3 (tuần 23–30), 5 bộ phận FO/FB/HK/SW/GR.
P2 vẫn đóng; P4 chưa mở lại. Đây là khảo sát của người triển khai, không phải báo cáo auditor.
Auditor không được đọc tài liệu này hoặc nhận các phát hiện dưới đây trong prompt.

## Mốc người dùng chốt

- 10 ô độc lập: 5 Academic Director + 5 Hotel Manager.
- Mỗi ô phải **> 7,5/10**. Đúng 7,5 không pass. Không lấy trung bình các bộ phận để bù.
- Tổng mỗi ô là trung bình cộng 6 tiêu chí của đúng vai, giữ nguyên Phụ lục A của
  `docs/audit/brief-p2-r9.md`. Kiểm ngưỡng trên trung bình chưa làm tròn; hiển thị một số lẻ.
- Auditor không thấy kết quả của nhau, lịch sử điểm hoặc báo cáo của người triển khai.

## Khảo sát trên bản ac24e13

CI local và CI GitHub đạt; hai probe khởi động khớp mốc. P3 đủ 40 tuần-bộ phận,
160 bài; mỗi tuần 14–16 thẻ từ. Render bằng `getWeekContent`.

| Bộ phận | Câu nói khác nhau | Lượt có follows | Câu dự trữ quan sát | Học 40 câu: qua nửa nói |
| ------- | ----------------- | --------------- | ------------------- | ----------------------- |
| FO      | 45                | 2               | 1                   | 99,75%                  |
| FB      | 47                | 2               | 3                   | 99,55%                  |
| HK      | 47                | 2               | 1                   | 98,95%                  |
| SW      | 45                | 2               | 1                   | 99,95%                  |
| GR      | 45                | 1               | 0                   | 99,60%                  |

Đo 2.000 đề mỗi bộ phận, gọi `buildOral` và `oralHalfPassed` thật. GR không có ô dự trữ
trong 2.000/2.000 đề. Học 60 câu qua 100% ở cả năm bộ phận. Mẫu ngẫu nhiên, thứ hạng
câu lấy trên chính mẫu đo nên tỷ lệ chỉ dùng khảo sát, chưa phải ước lượng ngoài mẫu.
Probe `oralmeasure.ts` hiện chỉ đếm số câu đúng, chưa gọi `oralHalfPassed`; không dùng
đường cong của nó để chứng nhận điều kiện ô dự trữ. Cần sửa phép đo trước vòng chính thức.

Toàn P3: 325 cặp grammar chưa có nearMiss, 160 vòng game chưa có explanation. Đây là
thiếu trường phản hồi/nhiễu đã soạn, không đồng nghĩa màn hình không có fallback.

Ví dụ đã đối chiếu qua render:

- HK_27_2: follows từ tóc trong bồn tắm chuyển sang máy hút bụi ồn; mạch sự việc bị đứt.
- HK_27_3: khách nói "It started last night" nhưng hỏi lại "when the dirty carpet started".
- GR_28_4: khách đòi full refund, câu mẫu trả lời về chuyển suite.
- SW_28_2: tăng nhiệt và giảm lực massage được đặt thành hai phương án thay thế thiếu ngữ cảnh.

## Trình tự thực hiện

1. Chốt spec P3 và brief riêng: 16 từ theo spec, ghi rõ gate hiện cho 17; 14–16 thẻ,
   35% review, hội thoại 3–4 lượt, nối P2. Không sao nguyên ngoại lệ riêng của P2 sang P3.
2. Lập bản đồ đủ 160 bài bằng render thật: can-do, ngân hàng theo chỉ số, thẩm quyền,
   hội thoại, cụm từ, ngữ pháp, phản hồi và lịch ôn. Đo đúng production, tách theo bộ phận.
3. Đóng băng baseline, chạy vòng mù đầu tiên trước khi sửa nội dung để lấy đánh giá độc lập.
4. Người triển khai kiểm phép cộng và trích dẫn, gom lỗi theo hình dạng. Ưu tiên an toàn,
   thẩm quyền, lệch người nghe/câu đáp; tiếp đến bể nói và hội thoại; sau đó phản hồi, ôn tập.
5. Sửa theo cụm nhỏ, render sáu bộ phận khi sửa khung chung; verify:content sau mỗi cụm.
   Nếu thay engine chung thì đo cả 5 phase. Không hạ chốt hoặc nới chấm để đạt điểm.
6. CI và probe đạt, đóng băng bản mới rồi chấm lại. Không cày lượt chấm trên cùng nội dung
   để chọn điểm cao. Sửa khung chung thì chấm lại toàn bộ các ô bị ảnh hưởng.
7. Trước khi nghiệm thu, 10 ô phải cùng đánh giá bản cuối và đều >7,5; báo rõ blocker còn lại,
   số đo chống học vẹt, hồi quy và bảng điểm. Không tự tuyên bố đạt khi còn blocker phát hành.

## Cách giữ auditor độc lập

Theo docs/CODEX.md A7: mỗi auditor một `codex exec --ephemeral`, tắt tự nạp AGENTS bằng
`-c project_doc_max_bytes=0`, không fork lịch sử chat người triển khai. Mỗi người có thư mục
nháp/báo cáo riêng ngoài repo. Chỉ nhận brief trung tính, vai, bộ phận và nguồn đóng băng.
Không chạy git, không sửa repo; cấm HANDOFF, playbook, các báo cáo review, kế hoạch này và
báo cáo của người khác. Không đưa điểm dự kiến vào prompt.

Các thư mục riêng và lệnh cấm là cách ly quy trình, chưa phải bảo đảm filesystem: workspace-write
vẫn cho phép ghi repo. Trước chạy cần chuẩn bị bản nguồn chỉ chứa tài liệu được phép, kiểm
hash trước/sau, kiểm transcript truy cập; lượt vi phạm bị loại và chạy lại bằng phiên mới.
Chỉ người điều phối đọc đủ 10 báo cáo sau khi các auditor nộp xong. Không chia sẻ kết quả giữa
auditor đang chấm. Không đưa báo cáo vòng trước cho auditor vòng tiếp theo.

Trạng thái: đã khảo sát ban đầu và lập kế hoạch; chưa sửa giáo trình, chưa chạy 10 auditor.
