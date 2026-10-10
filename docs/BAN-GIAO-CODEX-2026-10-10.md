# Bàn giao cho Codex — 10/10/2026

Người viết: Claude Code, phiên cuối trước khi hết hạn mức tuần. Chủ dự án chuyển sang Codex để làm
tiếp. File này chỉ ghi **việc đang dở lúc bàn giao**; khi các việc ở mục 2–4 xong, chép kết quả vào
[`HANDOFF.md`](HANDOFF.md) rồi xoá file này.

> **Cập nhật 10/10, 11:40 — phần lớn file này đã thành lịch sử.** Mục 2 (PR #26) và mục 3 (PR #25) **đã
> xong**: SQL đã chạy trên production, hai PR đã merge, production chạy `63686c3`. Mục 1 vì thế đã cũ.
> Còn dở: phép thử đầu-cuối ở mục 4.4 (mới qua bước 1 và 3) và các việc ở mục 5. Trạng thái hiện hành
> ở [`HANDOFF.md`](HANDOFF.md) §5 mục 2. Mục 4 (phần CRM) và mục 6 (luật của chủ dự án) vẫn đúng.

## 0. Đọc theo thứ tự

1. [`AGENTS.md`](../AGENTS.md) — luật cứng.
2. [`CODEX.md`](CODEX.md) phần B. **Một chỗ đã cũ:** B2 bước 5 nói nhánh làm việc là
   `content/p2-gates`. Nay mỗi việc một nhánh mới từ `origin/main`, rồi PR.
3. [`HANDOFF.md`](HANDOFF.md) — **bản trên nhánh `platform/partner-demo-active-only`** mới hơn bản
   trên `main` cho tới khi PR #26 merge.
4. File này.

## 1. Trạng thái lúc bàn giao

- `main` = `c41d496` (PR #24). Production https://hospitality.embassy.edu.vn chạy đúng commit này
  (Vercel, team `hoang77`, project `hospitality-english`).
- Thư mục chính `D:\AI_app\Hospitality English` đang đứng ở nhánh cũ `content/p2-gates`. **Không
  commit lên đó.** Bắt đầu bằng `git fetch origin`, rồi `git switch -c <nhánh-mới> origin/main`, hoặc
  `git switch <nhánh PR>` nếu phải sửa một PR đang mở.
- Worktree của Claude ở `.claude/worktrees/content-p3`: HEAD tách rời, không giữ nhánh nào, không có
  thay đổi chưa commit. Để yên, đừng xoá.
- PR đang mở:

| PR                                                                  | Nhánh                               | Nội dung                                            | Chờ gì                                   |
| ------------------------------------------------------------------- | ----------------------------------- | --------------------------------------------------- | ---------------------------------------- |
| [#26](https://github.com/vanhoang-spec/hospitality-english/pull/26) | `platform/partner-demo-active-only` | Luật mới cho tài khoản dùng thử của đối tác (mục 2) | Chủ dự án chạy SQL, rồi nói merge        |
| [#25](https://github.com/vanhoang-spec/hospitality-english/pull/25) | `docs/guide-logo`                   | Logo trong footer file hướng dẫn học viên (mục 3)   | Chủ dự án nói merge                      |
| [#10](https://github.com/vanhoang-spec/hospitality-english/pull/10) | `platform/signup-links`             | PR cũ, không thuộc đợt này                          | Không đụng; hỏi chủ dự án trước khi đóng |

CI trên GitHub của #25 và #26 đều xanh lúc bàn giao.

## 2. Việc 1 — PR #26: tài khoản dùng thử của đối tác mở khi đối tác Active

**Đổi gì.** Bản 08/10 (PR #23, đã chạy production): tài khoản mở khi đối tác active **và** còn ít nhất
một link chưa thu hồi, chưa hết hạn. Bản 10/10: chỉ cần đối tác active. Lý do và nguồn yêu cầu ở mục 4.

- Migration `supabase/migrations/20261010090000_partner_demo_active_only.sql`: thay đúng một hàm,
  `partner_is_live()`. `org_is_active()` không đổi và vẫn gọi hàm này cho org `kind = 'partner_demo'`.
- `src/lib/partner-actions.ts` (`listPartners`: `live = active`), hai câu chữ ở
  `src/components/SignupLinks.tsx` và `src/components/AuthGate.tsx`, kiểm thử ở
  `scripts/db/schema-test.ts`.
- Đo: `test:db` chạy trên hàm cũ hỏng đúng hai phép kiểm mới (111 qua, 2 hỏng); có migration thì
  113 qua, 0 hỏng. `bun run ci` xanh.
- **Hệ quả đã báo chủ dự án:** thu hồi link hay link hết hạn không còn khoá tài khoản dùng thử; muốn
  khoá thì Tạm dừng đối tác. Điều này đảo lựa chọn của chính chủ dự án hôm 08/10.

**Chưa làm, và vì sao.** Yêu cầu đến từ phiên Claude bên CRM chuyển lời chủ dự án, không phải chủ dự án
gõ trực tiếp ở phiên app. Nên Claude dừng ở PR: **chưa chạy migration, chưa merge.** Chủ dự án đã được
gửi đoạn SQL (là file migration bỏ các dòng chú thích `--`):

```sql
create or replace function public.partner_is_live(p_partner uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
      from public.partners p
     where p.id = p_partner
       and p.active
  );
$$;

revoke execute on function public.partner_is_live(uuid) from public, anon, authenticated;
grant execute on function public.partner_is_live(uuid) to service_role;
```

**Làm tiếp khi chủ dự án nói đã dán SQL và cho merge PR #26:**

1. `gh pr merge 26 --merge` (merge commit; không squash, không rebase).
2. Chờ Vercel dựng xong production, kiểm `https://hospitality.embassy.edu.vn/login` trả 200.
3. Sửa `HANDOFF.md` §5 mục 2: migration đã áp dụng, PR đã merge.
4. Báo chủ dự án làm phép thử ở mục 4.4.

Chạy SQL xong là tài khoản của đối tác Active mở ngay, kể cả khi chưa merge. Phần merge chỉ sửa câu
chữ và cột "đang mở / đang khoá" ở khối Đối tác trang `/admin-console`. Hai chỗ đó **chưa ai xem trên
trình duyệt** vì cần đăng nhập Super Admin.

Nếu chủ dự án **không** đồng ý luật mới: đóng PR #26, báo lại phiên CRM, không chạy SQL.

## 3. Việc 2 — PR #25: logo trong file hướng dẫn học viên

- `docs/huong-dan-hoc-vien/`: `huong-dan-hoc-vien.html` (nguồn, A5, 11 trang), bản in
  `Huong-dan-hoc-vien-Hospitality-English.pdf`, ảnh trong `anh/`.
- PR thêm logo Embassy Language vào footer mọi trang, bên phải, ngay trước số trang (16,7 × 5,6 mm).
  Chỉ sửa tài liệu, không có migration. Chủ dự án đã nhận PDF; chờ câu "merge 25".
- Đổi cỡ logo: sửa `.foot .logo { height }` trong file HTML, rồi in lại PDF bằng Edge (đổi đường dẫn
  cho đúng nhánh đang đứng):

```powershell
$dir = "D:\AI_app\Hospitality English\docs\huong-dan-hoc-vien"
$url = "file:///" + ("$dir\huong-dan-hoc-vien.html" -replace '\\','/' -replace ' ','%20')
Start-Process -Wait "C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe" -ArgumentList '--headless','--disable-gpu',"--user-data-dir=$env:TEMP\edge-print","--print-to-pdf=`"$dir\Huong-dan-hoc-vien-Hospitality-English.pdf`"",'--no-pdf-header-footer','--virtual-time-budget=15000',$url
```

- Còn nợ: ảnh trang Nghe và trang Nói chụp trước khi nút giọng đổi biểu tượng (🎚 hiện thành ô vuông).
  Chụp lại cần một tài khoản học viên đang đăng nhập — nhờ chủ dự án, không tự đăng nhập.

## 4. Phần liên quan CRM

### 4.1 Hai hệ thống, ai giữ gì

- **App** (repo này, public): người học, tài khoản, gói, link đăng ký, trạng thái Active của đối tác,
  tài khoản dùng thử của đối tác.
- **CRM Embassy** (repo riêng, private, thư mục `D:\AI_app\CRM_Kids_Embassy`): đối tác, link, hoa
  hồng, khách B2B, hoá đơn, xác nhận thu tiền. Từ 10/10 CRM là nơi tạo và sửa đối tác; không cần tạo
  đối tác bên app nữa.
- Hai bên nói chuyện qua `POST /api/crm` của app (ký HMAC, `src/routes/api/crm.ts`,
  `src/lib/crm-api.server.ts`); CRM kéo sự kiện của app bằng lệnh `lay_su_kien`.
- **Hợp đồng gọi là một file duy nhất, nằm ở repo CRM:** `docs/TICH_HOP_HOSPITALITY.md`. Phiên CRM báo
  bản có quyết định #23–#25 đã lên master (commit `12f8133`). Lúc bàn giao, thư mục
  `D:\AI_app\CRM_Kids_Embassy` **chưa có** đoạn #23 (chưa kéo về) — `git pull` ở đó trước khi đọc, hoặc
  đọc bản ở worktree `D:\AI_app\CRM_Kids_Embassy-hos` (nhánh `hos-doi-tac`). Muốn đổi hợp đồng: sửa
  file đó **trước**, rồi mới sửa code hai bên.
- Repo app là public: **không chép mức hoa hồng, tên đối tác thật hay khoá bí mật** từ CRM sang đây.

### 4.2 Thông báo của phiên CRM ngày 10/10 (nguồn của PR #26)

Phiên Claude bên CRM (`CRM_Embassy`) gửi, theo yêu cầu của chủ dự án:

1. **Việc cần bên app:** `partner_is_live(p_partner)` đổi còn "đối tác active", bỏ điều kiện link.
   `org_is_active()` giữ nguyên. Làm bằng migration mới, chủ dự án duyệt chạy. Hợp đồng `luu_doi_tac`
   và `doi_tac_cap_nhat` không đổi; `tai_khoan.dang_mo` nay bằng `active`. Đối tác inactive vẫn làm mọi
   link của họ ngừng nhận đăng ký. → Đã làm ở PR #26.
2. **Lý do:** CRM nạp sẵn nhân viên CS/Admission của Embassy làm đối tác (27 người lúc nạp), tất cả
   đang ở trạng thái chưa tham gia và **chưa gửi gì sang app**. Chủ dự án trao đổi với từng người rồi
   tích ô "Tham gia" trong CRM; lúc đó CRM gửi `luu_doi_tac` với `dang_hoat_dong = true` kèm
   `tai_khoan {sdt, email}` (số dạng `0xxxxxxxxx`). Họ chưa có link nào nhưng phải học thử app ngay.
3. **Không phụ thuộc thứ tự:** CRM hiện trạng thái app báo lần gần nhất. App chưa đổi thì đối tác
   Active chưa có link hiện "Tài khoản đang khoá" bên CRM; app đổi xong thì lần `luu_doi_tac` kế tiếp
   tự thành "đang mở".
4. **Quyết định ghi trong hợp đồng CRM:** #23 (luật mở mới), #24 (đối tác là nhân viên hoặc người
   ngoài; CRM là nơi tạo/sửa đối tác, link, hoa hồng, thu tiền; app giữ người học và trạng thái Active),
   #25 (hoa hồng đặt theo đối tác — chỉ CRM biết, không gửi sang app).
5. **Hai lưu ý:** tên đối tác là họ tên nhân viên; nếu trùng tên một đối tác đã tạo bên app, app trả
   `409 xung_dot` như cũ. Người chưa có số điện thoại ở CRM thì chưa tích được, nên app không nhận lệnh
   thiếu số.

Trạng thái phía CRM theo lời phiên đó (phiên app **chưa tự kiểm**): migration 272 (tab Đối tác, tài
khoản dùng thử) lên production 09/10; migration 275 (nạp nhân viên làm đối tác) đã chạy trên production.

### 4.3 Hợp đồng `luu_doi_tac` phía app (không đổi)

- Nhận `{ doi_tac{crm_id, ten}, dang_hoat_dong, tai_khoan?{sdt, email?}, cap_link_kich_hoat? }`.
- Trả `{ doi_tac_id, tao_moi, dang_hoat_dong, tai_khoan{sdt, dang_mo, link_kich_hoat, link_het_han} | null }`.
- Tài khoản tạo một lần; gửi lại cùng số thì không làm gì, số khác thì `409 xung_dot`.
- `link_kich_hoat` chỉ có khi tài khoản vừa tạo hoặc khi gửi `cap_link_kich_hoat: true`. Link dùng một
  lần, hạn 7 ngày; đối tác tự đặt mật khẩu, không ai khác biết.
- App báo ngược lại bằng sự kiện `doi_tac_cap_nhat` khi trạng thái đổi từ phía app.
- Mã: `src/lib/partner-demo.server.ts`, hàm SQL `crm_luu_doi_tac`. Kiểm thử: `bun run test:crm`,
  `bun run test:db`.

### 4.4 Phép thử đầu-cuối sau khi PR #26 lên (chủ dự án làm, agent hướng dẫn)

1. Trong CRM, tích "Tham gia" cho một nhân viên có số điện thoại, chưa có link nào.
2. CRM hiện link kích hoạt; mở link, đặt mật khẩu, đăng nhập app bằng số điện thoại đó → vào học được.
3. CRM hiện "tài khoản đang mở".
4. Tạm dừng đối tác (ở CRM hoặc ở `/admin-console`) → tài khoản thấy màn hình "Tài khoản đối tác đang
   tạm khoá"; bên kia tự đồng bộ trong khoảng một phút.
5. Bật lại → vào học lại được, tiến độ còn nguyên.

### 4.5 Nếu chủ dự án giao việc bên CRM

- Mở phiên Codex **trong thư mục CRM**, không sửa repo CRM từ phiên app. Phiên CRM cũng hết hạn mức
  ngày 10/10 và để lại file bàn giao riêng: **`BAN_GIAO_AI.md`** ở gốc repo CRM — đọc file đó trước,
  rồi `CODEX_BAT_DAU.md`, `CLAUDE.md` và `docs/TICH_HOP_HOSPITALITY.md`.
- Phiên CRM đã gửi yêu cầu đổi `partner_is_live()` hai lần (lần hai vì không chắc phiên app nhận được).
  Chỉ là một yêu cầu, đã làm ở PR #26; không cần làm lại.
- Migration CRM chỉ chạy sau khi chủ dự án nói rõ "ok chạy đi".
- Khoá HMAC (`CRM_HMAC_SECRET` trên Vercel của app, khoá cùng giá trị bên Supabase CRM) do chủ dự án
  đặt. Không in, không hỏi giá trị.

## 5. Việc treo khác

- **Trò chơi tình huống** (PR #24, đã chạy production): bản sửa lỗi sinh bong bóng không dứt chưa ai
  xem lại trên trình duyệt. Nhờ chủ dự án mở phần 6 của một tuần; mỗi vòng phải chỉ có 3 bong bóng.
- **Thử đầu-cuối bằng dữ liệu thử:** link đối tác (khách sạn và cá nhân), lời mời tặng/dùng thử, đơn
  gia hạn.
- **Bộ chọn giọng** (PR #22) chưa thử trên máy thật: Edge (giọng Natural, tắt mạng), iPhone, Android.
- Các việc chờ chủ dự án quyết khác: `HANDOFF.md` §5.

## 6. Luật của chủ dự án trong các phiên vừa rồi (bổ sung cho AGENTS §4)

- **Merge và deploy chỉ khi chủ dự án nói, từng PR một.** Mẫu câu: "merge 25", "dán sql rồi, merge 26",
  "merge và deploy".
- **Migration do chủ dự án tự dán vào Supabase SQL Editor.** Agent đưa bản bỏ chú thích, đã thử bằng
  `bun scripts/db/schema-test.ts <thư mục chứa mọi migration, file mới thay bằng bản dán>`.
- Không `git add -A`; không push `main`; không force; không sửa commit đã đẩy.
- Không đăng nhập thay, không nhập mật khẩu. Không in hay hỏi `RESEND_API_KEY`, `CRON_SECRET`,
  `CRM_HMAC_SECRET`.
- Ảnh chụp màn hình đưa vào tài liệu phát hành không được có tên hay dữ liệu cá nhân.
- Trả lời tiếng Việt, báo kết quả và con số.

## 7. Số đo để đối chiếu

`bun run ci` trên nhánh PR #26: `test:db` 113 · `test:crm` 44 · `test:reset` 18 · `test:voice` 24 ·
`verify:content`, `qa:full`, `format:check` qua · `lint` 0 lỗi, 9 cảnh báo có sẵn. Trên `main` hiện
tại `test:db` là 116 (luật cũ).

Xem code của một nhánh trên trình duyệt: `bun run dev --port 8091 --strictPort` trong đúng thư mục
đang đứng ở nhánh đó.
