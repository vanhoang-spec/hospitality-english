# Bàn giao — dự án đang ở đâu

Cập nhật: **27/09/2026**. Người viết cập nhật file này mỗi khi kết thúc một phiên làm việc lớn.
Agent mới vào: **đọc hết file này trước khi làm bất cứ việc gì.**

---

## 1. Nhánh và PR

- Nhánh làm việc: **`content/p2-gates`**, PR đang mở:
  [vanhoang-spec/hospitality-english#9](https://github.com/vanhoang-spec/hospitality-english/pull/9)
  → `main`. **Chưa merge.** CI của nhánh xanh.
- Repo **PUBLIC**. Mọi thứ trong `docs/` ai cũng đọc được.
- Nhánh này đồng bộ sang Lovable. Không rewrite history đã push.

## 2. Người dùng đang muốn gì

Theo thứ tự yêu cầu gần nhất:

1. **(24/09) Tạm dừng nội dung Phase 3 và 4.** Quay về hoàn thiện quản lý user và tổ chức.
2. Đã giao: tài liệu hướng dẫn quản trị (PDF), bảng giá theo gói, hồ sơ sản phẩm cho AI viết
   nội dung LinkedIn/fanpage.
3. **Không tự quay lại làm nội dung** khi người dùng chưa yêu cầu.

---

## 3. Nội dung — trạng thái từng giai đoạn

| Giai đoạn | Tuần  | Trạng thái                                                                                                                                                                                                               |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P0        | 1–6   | **Đạt** 02/09. FO và SW được người dùng cho đạt ở 7,6–8,3 và 7,9–7,9                                                                                                                                                     |
| P1        | 7–14  | **Đạt** 03/09, cả 10 ô ≥ 8,0, đóng băng `d50c8fe`                                                                                                                                                                        |
| P2        | 15–22 | **ĐÓNG theo quyết định của người dùng** 24/09 ở vòng 9 (`4b25904`). Chỉ **3/10 ô** chạm mốc 7,5 (AC TB 7,23 · HM TB 7,46). Người dùng hạ mốc, không phải nội dung đạt mốc. **Không chấm lại, không vá P2 để nâng điểm.** |
| P3        | 23–30 | **Chưa từng qua cổng 10 auditor.** Tạm dừng                                                                                                                                                                              |
| P4        | 31–40 | FO/FB/HK/GR soạn tay đủ 10/10, qua cổng theo batch với chuẩn cũ. SW còn 9/10 tuần sinh tự động. Tạm dừng                                                                                                                 |

Mốc nghiệm thu gốc là **8,0** mỗi ô (module × luồng); người dùng đã nhiều lần hạ mốc hoặc cho
đạt ngoại lệ. **Không tự suy rộng một ngoại lệ sang phase khác — hỏi lại.**

---

## 4. Nền tảng bán hàng — trạng thái

### Đã có trong mã nguồn

- Ba vai trò: `super_admin` (nền tảng) · `org_admin` (HR khách sạn) · `member` (học viên)
- Gói 50/100/200/300/500 học viên; kỳ hạn dùng thử 1 tháng + 3/6/9/12 tháng
- Ghế = tài khoản học viên; HR không tốn ghế; xoá học viên trả ghế ngay
- Một phiên đăng nhập sống cho mỗi tài khoản
- Hết hạn: chặn ghi ở tầng database, HR vẫn đọc và xuất báo cáo 90 ngày
- Nhóm, ma trận mở khoá bộ phận × tuần, công tắc học tuần tự
- Báo cáo 30 ngày cho HR + xuất CSV
- Bảng giá niêm yết (`plan_prices`) và giá thực thu trên từng hợp đồng (`subscriptions.price`)
- Nhật ký quản trị (`admin_actions`)

### ⚠️ Chưa có trên production

Đo chỉ đọc trên dự án Supabase `Hospitality English_App` ngày 24/09:

- **Bốn migration chưa áp dụng:** `20260923120000`, `20260923130000`, `20260923140000`,
  `20260924090000`. Cho tới khi chạy, mọi màn hình quản trị sẽ lỗi.
- `organizations`: **0 dòng**. `profiles`: **1 dòng**, vai trò `super_admin`.
- `src/integrations/supabase/types.ts` đang **viết tay** cho khớp bốn migration — phải sinh lại
  sau khi áp dụng.
- **Bảng giá chưa có số nào.** Lưới 25 ô, đều trống. Người dùng chưa đưa giá — **không tự đoán.**

Các bước đưa lên: [`docs/huong-dan-quan-tri.html`](huong-dan-quan-tri.html), mục 2.

### Giới hạn đã biết — đừng hứa với khách hàng

- Khoá nội dung theo tuần là **khoá giao diện**; nội dung nằm trong JS bundle.
- Không có khôi phục mật khẩu tự động.
- Không có thanh toán trực tuyến.
- Một phiên sống mỗi tài khoản là răn đe, không phải khoá cứng.

---

## 5. Việc đang chờ người dùng quyết

Không tự làm những việc này.

1. **Áp dụng bốn migration lên production.** Ghi thật lên database — cần người dùng đồng ý.
2. **Điền bảng giá.**
3. **Có quay lại nội dung không, và làm phần nào trước** — xem §6.
4. **Repo đang public.** Có muốn chuyển sang private không. (Lovable làm việc được với repo
   private; nhưng nếu chuyển thì đổi luôn câu "repo private trên GitHub Free" đang sai trong
   `README.md`.)

---

## 6. Hàng đợi đã đo, chưa làm

Tất cả đều có số đo và danh sách chi tiết. **Đã ghi lại, chưa sửa** vì người dùng tạm dừng
nội dung. In danh sách đầy đủ: `LINT_CONTENT_FULL=1 bun run lint:content`.

### 6.1 · Từ bốn cổng lint mới (Layer Q/R/S/T)

| Cổng                                                                  | Ratchet hiện tại | Ưu tiên                                                                                                                                                                                             |
| --------------------------------------------------------------------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **S — ô nói dự trữ không chịu được mất chữ** (`fragileReservedTurns`) | **48**           | **Cao nhất.** Đây là ô _bắt buộc đúng_ của bài sát hạch, và chữ mang rủi ro rơi ra vẫn được chấm đúng: `alcohol`, `id`, `halal`, `duty`, `allergies`, `gloves`, `security`, `front desk`, `not yet` |
| **T — khoá chữ chưa từng được dạy** (`requiredNeverTaught`)           | **48**           | Cao. P0=23 · P1=4 · P2=21. Nặng nhất là các ô dự trữ của Spa: `parent`, `under/children/adult`, `able`, `pregnant`                                                                                  |
| T — thẻ dạy sau tuần bắt nói (`spokenBeforeTaught`)                   | 45               | Trung bình. Gần hết ở P0: `manager` bị đòi từ tuần 3, thẻ ở tuần 7; `sorry` lệch đúng 1 tuần                                                                                                        |
| T — câu mẫu nói chữ chưa dạy (`saidBeforeTaught`)                     | 188              | Thấp. `because` ×48, `first` ×29, `moment` ×21                                                                                                                                                      |
| S — tip trích chữ mà không khoá (`droppableQuotedWords`)              | 58               | Thấp. Toàn bộ ở tuần 23–40                                                                                                                                                                          |

**Đừng hạ chốt bằng cách gỡ token khỏi `requiredTokens`.** Đã đo: `sorry`, `manager`,
`doctor`, `cannot`… đều bị bộ chấm khoá sẵn bằng đường khác, nên gỡ chỉ làm cổng xanh mà không
đổi điểm chấm nào. Sửa đúng là kéo thẻ lên sớm hơn, hoặc đổi câu mẫu.

### 6.2 · Engine — mẹo làm bài còn lại

- **Khối Từ vựng: "chọn phương án dài trung bình" đúng 47,9–50,4%, tự nó vượt sàn khối ở
  61,8–65,7% số đề** (đoán bừa 16,9%). Đây là mẹo bề mặt tệ nhất còn lại trên cả tờ đề.
- Khối Ngữ pháp P4: "chọn câu khác hai câu kia nhất" 50,8%, vượt sàn 71,9% (đoán bừa 40,7%).
- `"Today [went] well…"` — bỏ động từ chính khi mệnh đề không có mạo từ/chỉ định từ vẫn qua.

### 6.3 · Nợ lớn của P0/P3/P4 — quyết định việc phát hành

**Bể nói quá mỏng.** Học thuộc 60 câu hay ra nhất là qua nửa nói:

|     | bể câu mở | học thuộc 60 câu qua nửa nói |
| --- | --------- | ---------------------------- |
| P0  | 51–68     | **97,6–100%**                |
| P1  | 147–158   | 51–61%                       |
| P2  | 263–288   | 21–26%                       |
| P3  | **43–45** | **100%**                     |
| P4  | 44–74     | **97,6–100%**                |

Nửa nói của P3 và P4 hiện **không đo được gì**. Gốc là số câu nói mỗi phase quá ít, không phải
lỗi engine. P0 đã qua cổng dù mang nợ này.

Cộng thêm: P3 GR/BO và P4 BO không có câu nào vào được ô dự trữ (0% lượt thi); ~90 cặp câu
mẫu trùng nhau trong khung tuần 20/21 của P2, mỗi cặp ăn mất một vé rút đề.

---

## 7. Cách vào việc nhanh

```bash
git checkout content/p2-gates && git pull
bun install
bun run ci                         # phải xanh trước khi làm gì
bun scripts/probes/leakall.ts      # mốc: self-pass 100% cả 5 phase; P2–P4 leak 0
bun scripts/probes/orphans2.ts     # mốc: TOTAL 0
```

Nếu hai lệnh đo cho số khác mốc ở trên mà không ai sửa gì, có người đã làm hỏng thứ gì đó
giữa các phiên — tìm ra trước khi làm tiếp.
