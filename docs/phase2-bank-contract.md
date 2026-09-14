# Hợp đồng ô ngân hàng Phase 2 (tuần 15–22)

Phase 1, 3 và 4 đều có hợp đồng ô; Phase 2 thì không, và đó là lý do bốn mươi
mấy câu tiếng Anh hỏng lọt tới tận vòng kiểm định. Khung của Phase 2 đọc ngân
hàng **theo chỉ số**, không theo nghĩa — nên một ô đổi hình dạng ở một bộ phận
là câu sinh ra hỏng ở đúng bộ phận đó, và người soạn không thấy vì họ chỉ đọc
render của một bộ phận.

**Luật bắt buộc:** đổi bất kỳ giá trị nào dưới đây thì phải render **cả sáu bộ
phận** và đọc từng dòng trước khi commit. Một khung mới đọc ô nào thì phải kiểm
ô đó ở cả sáu.

## `steps` — quy trình lõi của bộ phận (tuần 15)

| ô   | hình dạng                                                      | ví dụ                                                   |
| --- | -------------------------------------------------------------- | ------------------------------------------------------- |
| 0–7 | **cụm động từ nguyên thể**, tám bước theo đúng thứ tự làm việc | `Greet the guest` · `Strip the bed` · `Place the order` |
| 8   | **danh từ** gọi tên cả quy trình                               | `Handover` · `Room routine` · `Procedure`               |
| 9   | **danh từ** gọi tên một bước                                   | `Checklist item` · `Priority` · `Work stage`            |

Khung đặt ô 0–7 vào vị trí động từ (`We always ${x} last.`). Đặt chúng sau `the`
sẽ ra `The show the room always comes last.` — đã từng ship.

## `offers` — thứ có thể mời thêm (tuần 16)

| ô   | hình dạng                                 | ví dụ                                      |
| --- | ----------------------------------------- | ------------------------------------------ |
| 0–7 | **danh từ đếm được**, thứ khách nhận được | `Sea view` · `Baby cot` · `Hot towel`      |
| 8   | **tính từ trạng thái**                    | `Optional` · `Unlimited` · `Complimentary` |
| 9   | **danh từ** gọi tên nhóm dịch vụ          | `Table service` · `Locker access`          |

## `details` — thông tin xin của khách (tuần 17)

| ô   | hình dạng                                        | ví dụ                                            |
| --- | ------------------------------------------------ | ------------------------------------------------ |
| 0–8 | **danh từ chỉ MỘT MẨU THÔNG TIN khách đưa được** | `Full name` · `Number of nights` · `Health form` |
| 9   | **danh từ** chỉ bản ghi                          | `Guest file` · `Cleaning note`                   |

Ô 0, 2, 3, 4 nằm trong khung `Could I have your ${x}?` / `And your ${x}, please?`.
Vì thế chúng **không được là một tình trạng cơ thể**: `Could I have your injury?`
và `And your sensitive skin, please?` đều đã từng ship. Tình trạng phải đi kèm
một danh từ hồ sơ — `Injury note`, `Skin note`, `Pain area`.

## `paperwork` — giấy tờ và thanh toán (tuần 18)

| ô   | hình dạng                                                                                      | khung đọc nó                   |
| --- | ---------------------------------------------------------------------------------------------- | ------------------------------ |
| 0   | **giấy tờ bộ phận chuẩn bị**                                                                   | `I am preparing your ${x}.`    |
| 1   | **thứ KHÁCH đưa**                                                                              | `May I have your ${x}?`        |
| 2   | **dữ liệu kiểm lại được**                                                                      | `Is the ${x} correct?`         |
| 3   | **dữ liệu nằm trong hồ sơ**                                                                    | `The ${x} is on file.`         |
| 4   | **khoản phí**                                                                                  | `A ten percent ${x} is added.` |
| 5   | **lựa chọn KHÁCH chọn** — thanh toán chỉ khi bộ phận thu tiền (buồng phòng: loại dịch vụ giặt) | `Which ${x} would you prefer?` |
| 6   | **vật TRAO TAY khách**                                                                         | `Here is your ${x}.`           |
| 7   | **cụm động từ, việc khách làm được**                                                           | `You can ${x} now.`            |
| 8   | **tính từ trạng thái**                                                                         | `Your request is ${x}.`        |
| 9   | **cụm động từ có tân ngữ**                                                                     | `Please ${x} on this line.`    |

Ô 7 và 9 đều là động từ nhưng **ô 9 phải mang sẵn tân ngữ**: `Fill in` một mình
cho ra `Please fill in on this line.` Đã sửa thành `Fill in the form`.

## `rules` — nội quy và an toàn (tuần 19)

Ô 0–7 danh từ hoặc cụm danh từ chỉ quy định/khu vực; 8–9 như các nhóm khác.

**Ô 3 và 4 là THIẾT BỊ**, không phải quy định hay đồ vật bất kỳ. Khung là
`That is the ${x}, madam. Please do not touch it.` và bài đọc mở bằng
`points to the equipment`. Đã ship `That is the raw food… do not touch the hot
dish` (F&B — quầy buffet tự phục vụ) và `the luggage trolley… the guest luggage`
(Guest Relations). Ô 3 còn đi vào `The ${x} is on your right.` ở tuần 20.

## `choices` — hai lựa chọn để so (tuần 20)

| ô      | hình dạng                                                                                         |
| ------ | ------------------------------------------------------------------------------------------------- |
| 0 và 1 | **hai lựa chọn ĐƠN, so sánh được với nhau** — khung là `Would you prefer the ${c1} or the ${c2}?` |
| 2–9    | **danh từ đơn**, không bao giờ là cụm "A or B"                                                    |

Bốn bộ phận từng nhét cả câu hỏi vào một ô (`Chicken or beef`, `Sixty or ninety`),
nên render ra `Or perhaps the rice or noodles?` và `The still or sparkling is
available too.` Ô 6 từng là rổ tạp (`Either one`, `Something local`,
`Comparison`) và cho ra `The something local is fine, sir.`

## `reports` — thuật lại ca đã qua (tuần 21)

| ô          | hình dạng                      | ví dụ                                   |
| ---------- | ------------------------------ | --------------------------------------- |
| 0–3 và 6–9 | **động từ quá khứ**            | `Checked in` · `Took longer` · `Jotted` |
| 4          | **mốc thời gian đã qua**       | `This morning` · `Last week`            |
| 5          | **danh từ đếm được, số nhiều** | `Arrivals` · `Rooms done` · `Invoices`  |

Ba ô trong nhóm này có nghĩa hẹp hơn "động từ quá khứ", vì khung đọc chúng trong
một câu cụ thể:

| ô   | khung                                              | phải là                                        | từng ship                          |
| --- | -------------------------------------------------- | ---------------------------------------------- | ---------------------------------- |
| 1   | `The last guest ${x} at noon.`                     | việc **của khách** xảy ra ở một giờ            | `The last guest finished at noon.` |
| 2   | `One request was ${x}.` · `It was ${x} yesterday.` | phân từ gọi tên **sự cố** — mỗi bộ phận một từ | `One booking was prepared.`        |
| 7   | `I ${x} the broken one, because it was not safe.`  | việc làm với **đồ hỏng** — thay, đổi, cất, báo | `I remembered the broken one.`     |

Ô 2 và 7 phải khác nhau giữa các bộ phận: tuần 21 có sàn 65% headword riêng theo
bộ phận, và một từ dùng chung cho bốn bộ phận đã kéo nó xuống 63%.

## `wrapUp` — tổng kết ca (tuần 22)

| ô   | hình dạng                                        | ví dụ                               |
| --- | ------------------------------------------------ | ----------------------------------- |
| 0   | **tính từ** mô tả ca                             | `Smooth` · `Thorough` · `Efficient` |
| 1   | **cụm trạng ngữ thời gian**                      | `On time` · `Before six`            |
| 2–9 | danh từ hoặc cụm động từ theo khung của từng bài | `Log book` · `Restock` · `Sign off` |
