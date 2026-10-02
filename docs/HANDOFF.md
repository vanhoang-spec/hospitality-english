# Bàn giao — dự án đang ở đâu

Cập nhật: **03/10/2026**. Người viết cập nhật file này mỗi khi kết thúc một phiên làm việc lớn.
Agent mới vào: **đọc hết file này trước khi làm bất cứ việc gì.**

---

## 1. Nhánh và PR

- Nhánh làm việc: **`content/p2-gates`**, PR đang mở:
  [vanhoang-spec/hospitality-english#9](https://github.com/vanhoang-spec/hospitality-english/pull/9)
  → `main`. **Chưa merge.** CI của nhánh xanh.
- P3 làm trên nhánh **`content/p3`** (tách từ `content/p2-gates`), chưa có PR — xem §8.
- Repo **PUBLIC**. Mọi thứ trong `docs/` ai cũng đọc được.
- Nhánh này đồng bộ sang Lovable. Không rewrite history đã push.

## 2. Người dùng đang muốn gì

Theo thứ tự yêu cầu gần nhất:

1. **(24/09) Tạm dừng nội dung Phase 3 và 4.** Quay về hoàn thiện quản lý user và tổ chức.
2. Đã giao: tài liệu hướng dẫn quản trị (PDF), bảng giá theo gói, hồ sơ sản phẩm cho AI viết
   nội dung LinkedIn/fanpage.
3. **(28/09) Người dùng cho mở lại P3 (tuần 23–30)**, yêu cầu khảo sát kỹ và báo kế hoạch trước.
   Mỗi ô trong 10 ô Academic Director/Hotel Manager phải **trên 7,5** mới pass; auditor độc lập,
   không thấy kết quả của nhau. P2 vẫn đóng, P4 vẫn tạm dừng. Kế hoạch: `docs/p3-plan.md`.

---

## 3. Nội dung — trạng thái từng giai đoạn

| Giai đoạn | Tuần  | Trạng thái                                                                                                                                                                                                               |
| --------- | ----- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P0        | 1–6   | **Đạt** 02/09. FO và SW được người dùng cho đạt ở 7,6–8,3 và 7,9–7,9                                                                                                                                                     |
| P1        | 7–14  | **Đạt** 03/09, cả 10 ô ≥ 8,0, đóng băng `d50c8fe`                                                                                                                                                                        |
| P2        | 15–22 | **ĐÓNG theo quyết định của người dùng** 24/09 ở vòng 9 (`4b25904`). Chỉ **3/10 ô** chạm mốc 7,5 (AC TB 7,23 · HM TB 7,46). Người dùng hạ mốc, không phải nội dung đạt mốc. **Không chấm lại, không vá P2 để nâng điểm.** |
| P3        | 23–30 | **Chưa qua cổng.** Đang sửa trên `content/p3` (§8)                                                                                                                                                                       |
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

## 8. Hai agent luân phiên

Từ 27/09 người dùng luân phiên Claude Code và Codex (khi một bên hết hạn mức tuần). Mỗi lúc chỉ
một agent sửa repo. Cách mở phiên, giao việc, chuyển giao, và chạy auditor bằng Codex:
[`docs/CODEX.md`](CODEX.md).

**Việc đang làm dở (02/10, Claude Code):** người dùng tắt lịch Codex và giao hẳn P3 cho Claude
Code. Nhánh **`content/p3`** (tách từ `content/p2-gates` @ `19410f7`), worktree
`.claude/worktrees/content-p3`. Kế hoạch và lý do: [`docs/p3-fix-plan.md`](p3-fix-plan.md).

- Vòng mù 1 trên `ac24e13`: 6/10 ô có báo cáo hợp lệ, cả 6 trượt. Bốn ô HM-FO/FB/SW/GR không
  chạy tiếp — không đổi được kết luận. Báo cáo ngoài repo: `%TEMP%/hospitality-p3-r1-ac24e13*`.
- Đã xong: engine (`c031900` — ô bắt buộc lấy từ lượt đánh dấu `risk`, lịch ôn xoay lát cắt,
  gate chuỗi `${…}`, form-note); P3 Buồng phòng viết riêng (`246bfe9`, `67667c6`) trong
  `src/lib/content/p3/hk.ts`; lint Layer S đọc thẳng `reservableTurns` của bài thi.
- Năm bộ phận đều viết riêng trong `src/lib/content/p3/<dep>.ts`; `P3_OVERRIDES` rỗng; GATE 4b giữ
  bể `risk` của năm bộ phận.
- **Mốc P3 (người dùng chốt 03/10): ≥ 7,5 mỗi ô là đạt** (đúng 7,5 là đạt). Brief vòng 3:
  [`docs/audit/brief-p3-r3.md`](audit/brief-p3-r3.md).
- Vòng mù 2 trên `e3d0805`: HM FO 7,75 · FB 7,68 · HK 7,83 · GR 7,92 đạt; HM SW 7,42 và cả năm
  ô AC (FO 7,00 · FB 6,75 · HK 6,58 · SW 6,92 · GR 7,33) trượt. Gốc chung: ô nói bắt buộc đúng chỉ
  nhận đúng một câu, từ P3 không được nói lại, luyện tập mỏng hơn P2.
- Sửa sau vòng 2: engine `0c13f1e`, `a6a4074` (`alsoAccept`, mở đầu đồng cảm không bị trừ, khoá
  headword không lấy đại từ, gợi ý ô dự trữ ẩn khi thi, nghe không dùng lượt giữa chuỗi, ôn mỗi
  phần hai lần, câu can-do mỗi tuần, thứ tự đơn vị nói xáo trộn); nội dung năm bộ phận viết lại
  (`30db18d` FO, `7109a85` FB, `57cfc3d` GR, `63e7555` SW, HK sau đó).
- Vòng mù 3 trên `a166936`: **7/10 đạt** — HM FO 7,93 · HK 7,92 · GR 7,80 · FB 7,75 · SW 7,68,
  AC FB 7,58 · HK 7,53; **trượt AC FO 7,42 · GR 7,25 · SW 7,25**. Báo cáo:
  `%TEMP%/hospitality-p3-r3-a166936/<ô>/report.md`. Cả 10 ô cùng một lỗi lớn nhất: ô bắt buộc đúng
  chỉ nhận 11–28% câu đúng diễn đạt khác (t6). Thứ hai (cả 5 ô AC): ~57 trên ~108 headword không
  được nói lại sau tuần dạy (t5), tuần 30 vẫn dạy thẻ mới (t1).
- Sửa sau vòng 3 — engine `599734b`: `src/lib/answer-variants.ts` sinh các dạng cùng nghĩa của mỗi
  câu mẫu từ tuần 23 (đảo câu, nối but/and, đổi thứ tự hai người được gọi, myself, will/going to…,
  mỗi dạng khoá đủ từ nội dung); `saidInOtherWords` trong `speaking-score.ts` cho qua câu thay từ
  khi đủ khoá, giữ phủ định, không thêm hoãn/tiền/số, không sai hình thái; "Yes" trước lời từ chối
  trượt; từ tuần 23 không tha bỏ mạo từ. Đo bằng chính probe của 10 auditor: câu đúng được nhận
  tăng 2–4 lần (vd AC-FO 11→36/96, AC-HK 28→48/98), câu nguy hiểm vẫn 0. Ratchet S reserved-lock
  46→56 là phân loại lại có chủ đích (bỏ "myself", "the manager", "first" khi đã có "then").
  Probe mới: `bun scripts/probes/resaid.ts [DEP] [--list]` — headword P3 không được nói lại.
- Đang làm: năm tác giả (subagent) sửa nội dung theo báo cáo vòng 3 — từ chết, tuần 30 trình bày
  lại thẻ tuần 23–29 (cổng trùng headword đã miễn cho tuần 30 như tuần 39–40), lỗi nghiệp vụ HM.
  Gộp xong thì đóng băng và chạy vòng mù 4 (brief = bản sao `brief-p3-r3.md`).
- BO và SE ngoài phạm vi chấm P3, vẫn dùng khung chung.
