# P3 — kế hoạch sửa sau vòng mù 1

Ngày 02/10/2026. Claude Code tiếp quản P3 từ Codex theo quyết định của người dùng (Codex tắt lịch
chạy). Nhánh làm việc: `content/p3` (tách từ `content/p2-gates` @ `19410f7`), worktree
`.claude/worktrees/content-p3`. Auditor không được đọc file này.

## Đầu vào

Vòng 1 trên nguồn `ac24e13` (nội dung P3 chưa sửa): 6/10 ô có báo cáo hợp lệ, cả 6 trượt mốc

> 7,5 — AC FO 5,93 · FB 6,50 · HK 6,28 · SW 5,42 · GR 6,07; HM-HK 4,33. Bốn ô HM (FO, FB, SW,
> GR) **không chạy tiếp**: người dùng chọn sửa ngay vì bốn ô đó không đổi kết luận. Vòng sau chấm
> đủ 10 ô trên cùng một bản, cùng một kiểu auditor.

Báo cáo nằm ngoài repo: `%TEMP%/hospitality-p3-r1-ac24e13*/<ô>/report.md`. Sổ đối chiếu của
Codex: `docs/audit/p3-r1-verification.md`.

## Gốc chung của các lỗi

1. **Khung chung đọc ngân hàng theo chỉ số, hợp đồng ngân hàng chỉ ràng buộc từ loại, không
   ràng buộc nghĩa.** Khung tuần 23 đòi ô 7 "hợp gia đình", ô 8 "cho lưu trú dài" — HK đặt
   "silk pillowcase", FB đặt "aged steak". Tuần 28 khung hoàn tiền nhét giải pháp bất kỳ của
   bộ phận ("I cannot add ten free minutes myself…"). Đây là nguồn của phần lớn lỗi t3 (AC) và
   t1/t2 (HM).
2. **Khung dạy vượt thẩm quyền** ở mọi bộ phận: tự áp phí (t24), nhận lỗi "It was our mistake"
   trước khi xác minh (t27), tự hứa miễn tiền/chuyển phòng/nâng hạng (t28).
3. **Ô thi bắt buộc chọn bằng dò chuỗi** trong câu mẫu (`before we start`, `allerg`, `front
desk`) → FO/FB/HK/SW chọn nhầm câu, GR không có câu nào (0/200 đề). Đáp án thay thế của ô đó
   còn gom cả câu không mang thẩm quyền.
4. **Gần như không có hội thoại nhiều lượt** (9/229 lượt có `follows`) và **lượt nói tụt 85%
   so với P2** (~45/bộ phận so với ~295).
5. **Tuần 29 bàn giao nội bộ bị gắn nhãn "Khách nói"** (229/229 lượt mặc định `guest`).
6. **Lịch ôn cắt cố định** `slice(0,5)` / `slice(0,4)` → ~72% từ P3 chỉ quay lại ở checkpoint.
7. **Phản hồi luyện tập thiếu**: 0/160 game có lời giải, 0/325 cặp ngữ pháp có `nearMiss`.
8. Lỗi lẻ: chuỗi template `${…}` lộ trong lời giải (t26.1); helpTip cắt `re-clean` → "can re";
   ba tuần viết tay (SW-23, FO-26, GR-27) có lượt nói 20–34 từ / 3–4 câu; mediation GR-26 cho
   qua câu thu thêm phí; một số câu sai hòa hợp ("curtains costs").

## Thứ tự sửa

**Đợt A — engine, áp dụng chỗ được đánh dấu (không tràn sang phase khác):**

- `SpeakingItem.risk`: đánh dấu tường minh câu thuộc ô bắt buộc. `buildOral` chọn ô bắt buộc
  trong số câu có đánh dấu trước, regex cũ chỉ còn là đường dự phòng cho phase chưa đánh dấu.
  Đáp án thay thế của ô bắt buộc chỉ giữ câu cũng được đánh dấu.
- Lịch ôn P3 xoay lát cắt để mọi headword được gọi lại trước checkpoint; review ≥ 35%.
- Cổng mới: không chuỗi `${` nào trong bất kỳ trường render của bất kỳ phase.
- `form-note`: giữ nguyên động từ có gạch nối.

**Đợt B — khung chung P3 (cả năm bộ phận cùng lúc):**

- Viết lại khung tuần 24/27/28 theo thẩm quyền: giải thích được, áp/miễn/hoàn/chuyển phòng
  thì "my manager/supervisor can review it". Tuần 26 một việc một người nhận. Tuần 29 tách
  ô "sổ/nhật ký" khỏi ô "việc bàn giao", gắn `speakerRole` cho mọi lượt nội bộ.
- Hợp đồng ngân hàng theo **nghĩa** từng chỉ số; sửa ngân hàng năm bộ phận cho khớp.
- Nối lượt thành chuỗi `follows`, mỗi tuần ≥ 1 chuỗi 3 lượt; nâng lượt nói ~6 → ~12/tuần.
- `nearMiss` cho mọi cặp ngữ pháp, lời giải cho mọi game.

**Đợt C — theo bộ phận:**

- Mỗi bộ phận × mỗi tuần một chuỗi "ca khó" viết tay, đánh dấu `risk` — đây là pool của ô bắt
  buộc và là phần HM chấm t2/t3 (HK: vào phòng/DND, đồ thất lạc, hóa chất, sàn ướt; FB: dị ứng,
  an toàn thực phẩm, rượu, hóa đơn; SW: chống chỉ định, thai kỳ, dừng liệu trình; GR: bảo mật
  thông tin, VIP, quà/lời xin lỗi có giá trị tiền; FO: tiền, riêng tư, an toàn).
- Chia lượt dài của SW-23, FO-26, GR-27; sửa mediation GR-26.

**Đợt D — đóng băng, chấm mù đủ 10 ô** bằng `docs/audit/brief-p3-r1.md` (chỉ đổi commit đóng
băng), mốc > 7,5 từng ô. Vá theo đúng báo cáo, chấm lại các ô bị ảnh hưởng.

Mỗi đợt: `bun run verify:content` sau từng cụm; probe ở AGENTS §6 không được xấu đi; `bun run
ci` xanh trước commit.
