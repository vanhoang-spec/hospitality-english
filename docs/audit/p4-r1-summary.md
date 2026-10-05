# Phase 4 — vòng chấm mù 1 (05/10/2026)

Bản đóng băng `7ed3254` (nội dung trùng `main` lúc đó). Brief: [`brief-p4-r1.md`](brief-p4-r1.md).
10 auditor độc lập (subagent Claude), mỗi người một ô, không thấy điểm cũ hay báo cáo của nhau.
Báo cáo đầy đủ nằm ngoài repo, ở `%TEMP%/hospitality-p4-r1-7ed3254/<ô>/report.md`.
Mục đích vòng này là đo hiện trạng sau khi P4 được mở lại; mốc tham chiếu 7,5.

| Ô   | AC (Academic Director) | HM (Hotel Manager) |
| --- | ---------------------- | ------------------ |
| FO  | 4,83                   | 6,33               |
| FB  | 5,08                   | 7,18               |
| HK  | 5,67                   | 7,08               |
| SW  | 4,25                   | 3,33               |
| GR  | 5,58                   | 6,92               |
| TB  | 5,08                   | 6,17               |

**0/10 ô đạt 7,5.**

## Lỗi chung, nhiều ô cùng nêu (đã đối chiếu bằng hàm production)

1. **Bộ chấm nói, lớp "nói cách khác" (`saidInOtherWords`, từ tuần 23), cho đổi một từ nội
   dung lấy bất kỳ từ nào** miễn còn đủ khoá. Đo: thay một từ nội dung bằng "window" mà vẫn qua
   chỉ nhờ lớp này ở **69–77% lượt P3** và 77–93% lượt P4. P2 (chưa có lớp này): 0%. Ví dụ đã
   chạy lại: "Please use the **lift**" qua ở ca báo cháy (GR_36_3), "Please **stay here**" qua ở ca
   dị ứng nặng (SW_39_3). **Ảnh hưởng cả P3 đang chạy trên production.**
2. **Ô dự trữ bắt buộc đúng của bài thi tuần 40** chọn bằng regex vì P4 không có lượt `risk`:
   bể chỉ 1 câu (FO), 3 (GR), 4 (FB, SW), 7 (HK). Thường không phải rủi ro thật của bộ phận, và
   đánh trượt chính câu đúng mà khoá dạy cho cùng tình huống.
3. **Bể thi nói nhỏ**: 44–74 câu (P3: 238–276). Học thuộc 40 câu hay ra nhất qua nửa nói
   74–99,9%. Nguyên nhân: chỉ 4–9 lượt nói/tuần (P3: 20–56), 0 chuỗi `follows`.
4. **Khối từ vựng bài thi cuối**: 83,3% câu rút từ đúng 8 `reviewWords` của tuần 40
   (`buildPaper` lấy `reviewFirst` trước).
5. **Khối ngữ pháp không đo ngữ pháp**: 0 `nearMiss`, phương án nhiễu là câu đúng của cặp khác.
6. **Bài viết tuần 33 không có `mustAvoid`** ở FO/FB/HK/SW/GR: câu nhận lỗi ngộ độc, hứa hoàn tiền
   trong 24 giờ, lộ số thẻ, đổ lỗi đồng nghiệp đều đạt 100%.
7. **0/10 tuần có `canDoVi`** ở cả năm bộ phận; 0 `explanation` cho game và câu đọc; 0
   `alsoAccept`; 0 `risk`.
8. **Tuần 39 thiếu luật "mười lăm phút cuối ca"** ở FO, FB, SW (HK, GR có đủ).
9. **Tuần soạn đời cũ lệch và mâu thuẫn tuần mới**: FO-37/38 (concierge thay B2B), FB-31/37,
   HK-33/37, GR-34/37/38. Ví dụ GR-37 và GR-40 dạy hai kịch bản cấp cứu trái thứ tự, cả hai vào đề.
10. **SW: 9/10 tuần vẫn sinh tự động từ khung `phase4.ts`** — câu ghép danh từ vô nghĩa, và câu an
    toàn sai sự thật ("Nobody has been hurt by the severe allergic reaction", "There is no danger"
    khi nước hồ bơi nhiễm bẩn). Chỉ SW-37 soạn tay, được khen.
