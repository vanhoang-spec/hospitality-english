# Nền tảng, gói thuê bao và quản lý người dùng

Tài liệu này mô tả phần **bán cho nhiều khách sạn** của sản phẩm: ai là ai, mua
gì, giới hạn ở đâu, và đo được gì. Phần nội dung giáo trình nằm ở
`docs/curriculum-level-matrix.md`.

## 1. Vai trò

| Vai trò (`profiles.role`)             | Là ai                                     | Làm được gì                                                                                                                                                        |
| ------------------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `super_admin`                         | Chủ nền tảng + 1–2 người được bổ nhiệm    | `/admin-console`: tạo khách sạn, gán/gia hạn gói, xem ghế đã dùng và hạn còn lại của mọi khách sạn. Đọc xuyên tổ chức qua RLS.                                     |
| `org_admin` — **giao diện gọi là HR** | Người phụ trách đào tạo của một khách sạn | `/org-admin` (thêm/xoá/đổi mật khẩu/đổi vai trò học viên, nhập CSV), `/org-reports` (báo cáo + xuất CSV), `/org-access` (nhóm, ma trận mở khoá, học theo lộ trình) |
| `member`                              | Học viên                                  | Học, ôn, thi. Không thấy dữ liệu của ai khác.                                                                                                                      |

Không thêm giá trị `hr` vào DB: `org_admin` **chính là** vai HR, và đổi tên sẽ
kéo theo `is_org_admin()`, bốn policy RLS và toàn bộ server function chỉ để đổi
một chữ. Giao diện gọi là HR, dữ liệu gọi là `org_admin`.

## 2. Gói và hạn dùng

- Gói: `p50 · p100 · p200 · p300 · p500` (bảng `plans`, số ghế = số **học viên**).
- Kỳ hạn: `trial` (1 tháng miễn phí), `m3`, `m6`, `m9`, `m12` (bảng `subscriptions`).
- Mỗi khách sạn chỉ có **một** thuê bao `active` tại một thời điểm (unique index).
  Gia hạn sẽ đóng bản cũ rồi mở bản mới; gia hạn "nối tiếp" tính từ ngày hết hạn
  cũ chứ không từ hôm nay — nếu không thì bán 12 tháng mà khách chỉ dùng được 11.

**Ghế = tài khoản, không phải kết nối đồng thời.** Xoá một học viên là trả lại
ghế ngay, vì trigger `enforce_seat_quota` đếm số dòng đang tồn tại. Tài khoản HR
**không** tính ghế.

Chống dùng chung tài khoản đi bằng đường khác: **một phiên sống mỗi tài khoản**
(`active_sessions` + `src/lib/single-session.ts`). Máy đăng nhập sau chiếm tài
khoản; máy trước tự đăng xuất ở nhịp heartbeat kế tiếp. Đây là gờ giảm tốc, không
phải hàng rào — nhưng nó xử lý đúng nỗi lo thật là ba người dùng chung một login.

**Khi hết hạn:** học viên bị chặn (màn hình trong `AuthGate`), và RLS chặn ghi
tiến độ/sự kiện ở tầng DB (`org_is_active()` + policy RESTRICTIVE). HR vẫn đọc và
xuất báo cáo được. Tiến độ không bị xoá.

## 3. Nhóm, ma trận mở khoá, học theo lộ trình

- `groups` + `group_members`: batch kiểu "FO tháng 9".
- `access_rules`: mỗi dòng mở một cửa sổ `(bộ phận, tuần từ → tuần đến)` cho cả
  khách sạn (`group_id = null`) hoặc cho một batch. **Không có dòng nào = mở hết.**
- `org_settings.sequential_mode`: bật thì tuần N cần tuần N−1 đã xong — "xong" là
  đạt chuẩn ≥ 4 phần trong tuần (xem `SUITES_FOR_A_FINISHED_WEEK`), vì hai phần
  (nghe, nói) phụ thuộc thiết bị và không phải máy nào cũng chạy được.

Cả hai lớp này là **khoá giao diện**: giáo trình nằm trong bundle JavaScript gửi
về máy, nên khoá để điều tiết nhịp học chứ không giữ bí mật nội dung. Muốn khoá
thật thì phải phục vụ nội dung theo từng user từ server — một quyết định sản phẩm
khác, không nằm trong phạm vi này.

## 4. Đo lường

Trước đây `lesson_progress` giữ **một dòng bị ghi đè** cho mỗi
`(user, bộ phận, tuần, suite)`, nên không trả lời được "học bao lâu", "làm mấy
lần", "đúng ngay lần đầu bao nhiêu phần trăm". Hai bảng chỉ-ghi-thêm mới:

- `attempts` — mỗi lượt trả lời một câu: đúng/sai, lần thứ mấy, có phải lần đầu
  trong buổi không, mất bao nhiêu mili giây.
- `study_sessions` — mỗi lần ngồi vào một suite: thời gian **chỉ tính khi tab
  đang hiển thị**, nên mở app rồi đi ăn trưa không tính là giờ học.

`/org-reports` dựng từ hai bảng này: giờ học 30 ngày, số lượt làm, tỷ lệ đúng, tỷ
lệ đúng ngay lần đầu, số thẻ ôn quá hạn, số tuần đã đụng tới — kèm xuất CSV.

## 5. Nhật ký thao tác

`admin_actions` ghi ai tạo/xoá/đổi mật khẩu/đổi vai trò của ai, viết bằng service
role trong server function. Trình duyệt không ghi được và không xoá được; HR đọc
lại được phần của khách sạn mình.

## 6. Áp dụng lên Supabase

Ba migration mới (chưa chạy trên project thật tại thời điểm viết):

```
supabase/migrations/20260923120000_plans_subscriptions_sessions.sql
supabase/migrations/20260923130000_learning_telemetry.sql
supabase/migrations/20260923140000_groups_and_access.sql
```

Chạy bằng `supabase db push` (hoặc dán lần lượt trong SQL editor theo đúng thứ
tự). Sau khi chạy, **sinh lại** `src/integrations/supabase/types.ts` từ project —
các bảng mới hiện đang được khai báo tay trong file đó để `tsc` có kiểu đúng.

Tạo `super_admin` đầu tiên bằng tay một lần:

```sql
update public.profiles set role = 'super_admin' where phone = '+84…';
```
