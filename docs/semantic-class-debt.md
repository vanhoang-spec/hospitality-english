# Nợ ngữ nghĩa Phase 4 — và câu hỏi thiết kế nằm dưới nó

Layer D (`scripts/lint-content.ts`) thi hành cột **"Fails as"** của
`docs/phase4-bank-contract.md`. Lần chạy đầu tiên: **33 ô vi phạm**, ghi trong
`scripts/_semantic-debt.json`.

## Phân bố nói lên bản chất vấn đề

| Bộ phận | Số ô vi phạm |
| ------- | ------------ |
| **BO**  | **31**       |
| FO      | 1            |
| GR      | 1            |

Không rải rác. **31/33 là BO**, dồn vào đúng ba slot đòi ngữ nghĩa hướng-khách:

| Slot                | Khung câu                                                           | BO đang có                                                  | Kết quả render                                                                            |
| ------------------- | ------------------------------------------------------------------- | ----------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| `story` (W31)       | `The {w} is what makes this place special.`                         | Market position, Occupancy trend, Client testimonial…       | _"The occupancy trend is what makes this place special."_                                 |
| `preferences` (W32) | `Based on your {w}, may I suggest something that suits you better?` | Preferred billing cycle, Invoice format, Signing authority… | _"Based on your preferred billing cycle, may I suggest something that suits you better?"_ |
| `emergencies` (W36) | `There is a {w} at the property.`                                   | Payroll delay, Hacked email account, Data breach…           | _"There is a payroll delay at the property. Please stay calm and follow me."_             |

Hai câu đầu chính là **dòng 30 và 31** trong bảng FAIL của
`phase4-bank-contract.md` — tài liệu gọi tên chúng làm ví dụ cấm, và chúng vẫn
render suốt. Đó là lý do Layer D tồn tại.

## Đây không phải lỗi của người soạn bank

Người soạn bank BO điền **đúng nghề của BO**. Back Office không kể chuyện toà
nhà cho khách, không ghi khẩu vị khách, không chứng kiến sự cố tại chỗ. Ba
slot trên giả định một nhân viên tiếp khách; BO thì không phải.

Trùng khớp độc lập: bản kiểm định Hotel Manager (08/2026) chấm **BO P3–P4 =
5.5**, thấp nhất toàn bộ ma trận, với đúng lý do _"BO chịu kém nhất vì bản chất
công việc không phải guest-facing"_ — người kiểm định đó không đọc file này và
không chạy gate này.

## Câu hỏi thiết kế phải trả lời trước khi sửa nội dung

Sửa cơ học 31 ô của BO là **không đủ**, vì mỗi lựa chọn kéo theo một hệ quả:

1. **Viết lại bank BO theo hướng khách.** BO nhân viên kinh doanh _có_ pitch
   toà nhà cho khách đoàn: _"The riverside terrace is what makes this place
   special"_ hoàn toàn tự nhiên với một account manager. Nhưng khi đó BO học
   nội dung của FO/GR — mất tính đặc thù mà `verify:content` đang bắt buộc
   (≥12/14 từ phải đặc thù bộ phận).
2. **Cho BO khung riêng ở W31/32/36.** Đúng nghề nhất, nhưng phá thiết kế
   "một khung dùng chung × sáu bank" — chính thứ làm sáu khoá học khả thi.
3. **Xem lại BO có nên nằm trong Phase 4 dạng này không.** Cùng câu hỏi mà
   vòng rà soát trước đã đặt ra khi bàn về bộ phận thứ 7.

Đây là quyết định sản phẩm, không phải quyết định kỹ thuật — nên PR này **chỉ
dựng gate và ghi nợ**, không tự ý chọn hướng.

## Luật vận hành của file nợ

- Có tên trong `_semantic-debt.json` → báo là nợ, không fail build.
- **Sửa xong phải xoá dòng.** Một dòng không còn vi phạm cũng fail build
  (`[D semantic-debt] … no longer violates — delete the line`), nên file không
  mục ruỗng thành danh sách những thứ đã sửa từ đời nào.
- Từ mới vi phạm mà chưa có trong file → fail ngay. Nợ chỉ đóng băng cái cũ,
  không mở cửa cho cái mới.
