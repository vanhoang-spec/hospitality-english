# Làm tiếp dự án bằng Codex

Hai phần: **A** cho chủ dự án (cách mở, cách giao việc), **B** cho Codex (những gì khác với
Claude Code trong repo này). Luật chung vẫn nằm ở [`AGENTS.md`](../AGENTS.md) — file này không
lặp lại, chỉ bổ sung.

Mọi điều ghi "đã thử" dưới đây được chạy thật trên máy này ngày **28/09/2026** với Codex CLI
0.157.1.

---

## Phần A — cho chủ dự án

### A1. Máy đã sẵn sàng, không cần cài gì

- Codex CLI đã cài, đã đăng nhập bằng tài khoản ChatGPT.
- Thư mục dự án đã được Codex đánh dấu tin cậy (trusted).
- Mặc định: Codex được sửa file trong thư mục dự án, muốn làm gì ngoài đó thì hỏi anh trước.
- **Đã thử:** mở Codex ở thư mục dự án, nó tự đọc `AGENTS.md` và trả lời đúng nhánh, số PR, bốn
  việc đang chờ anh quyết — không cần dặn gì thêm.
- **Đã thử:** Bun chạy được trong sandbox của Codex, nên Codex tự chạy được `bun run ci` và các
  công cụ đo.

### A2. Mở một phiên

Mở PowerShell (hoặc app Codex trên desktop, chọn thư mục dự án):

```powershell
cd "D:\AI_app\Hospitality English"
codex
```

### A3. Câu mở đầu — dán nguyên văn mỗi lần mở phiên

> Đọc AGENTS.md, docs/HANDOFF.md và phần B của docs/CODEX.md. Chạy `git pull`, `git status`,
> `bun run ci`, `bun scripts/probes/leakall.ts` và `bun scripts/probes/orphans2.ts`. Báo lại
> bằng tiếng Việt: CI xanh hay đỏ, số đo có khớp mốc ở AGENTS.md §6 không, có thay đổi nào chưa
> commit không, và HANDOFF đang ghi việc gì dở. Chưa sửa gì cho tới khi tôi giao việc.

Nếu số đo lệch mốc mà không ai sửa gì, **đừng giao việc mới** — bảo nó tìm nguyên nhân trước.

### A4. Mẫu câu giao việc

| Việc                                    | Câu giao                                                                                                                                                                                                                     |
| --------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Làm tiếp một hàng đợi đã đo             | "Làm hàng đợi `fragileReservedTurns` ở HANDOFF §6.1. Vá theo hình dạng, render sáu bộ phận trước khi đụng khung, không hạ baseline. Xong thì chạy lại các probe ở AGENTS §6, commit khi CI xanh, cập nhật HANDOFF, push."    |
| Sửa một lỗi anh tự thấy                 | "Trên màn hình … khi tôi bấm … thì … . Tìm nguyên nhân, báo tôi trước khi sửa."                                                                                                                                              |
| Sau khi anh đã chạy migration           | "Bốn migration ở HANDOFF §4 đã chạy xong trên production. Sinh lại `src/integrations/supabase/types.ts` bằng `supabase gen types typescript --linked`, chạy CI, commit, cập nhật HANDOFF."                                   |
| Đọc báo cáo chấm (sau khi chạy vòng A7) | "Đọc mười báo cáo trong thư mục …. Kiểm lại phép cộng từng báo cáo. Đối chiếu nguyên văn mọi trích dẫn bằng `getWeekContent` trước khi sửa (AGENTS §7). Gom thành danh sách việc theo hình dạng lỗi, báo tôi trước khi sửa." |
| Kết thúc phiên                          | "Cập nhật docs/HANDOFF.md: việc đã làm, việc dở, số đo mới. Commit và push."                                                                                                                                                 |

**Nên giao việc nhỏ, có điểm dừng.** Một phiên Codex có thể hết hạn mức giữa chừng giống Claude.

### A5. Chuyển qua lại giữa Claude và Codex

1. **Mỗi lúc chỉ một agent.** Không để Claude và Codex cùng sửa repo.
2. Trước khi chuyển, bảo agent đang làm: _"Cập nhật HANDOFF, commit, push."_
3. Agent vào sau luôn bắt đầu bằng câu A3 (có `git pull`).
4. Nếu agent trước bị cắt ngang chưa kịp commit, dùng câu này:
   > Phiên trước bị cắt ngang. Xem `git status` và `git diff`, đối chiếu với HANDOFF, báo tôi
   > phần sửa dở là gì và nó đã chạy qua CI chưa. Chưa commit, chưa xoá gì.

### A6. Ngắt Codex ngay (phím Esc hoặc Ctrl+C) nếu thấy nó định

- `git push --force`, `git commit --amend`, `git rebase` — phá lịch sử bên Lovable
- `git add -A` hoặc `git add .` — dễ kéo file riêng của anh lên repo **public**
- sửa file `scripts/_*-baseline.json` để cổng xanh — đó là giấu lỗi, không phải sửa lỗi
- mở hoặc sửa `.env`
- chạy `supabase db push`, `supabase db reset`, `supabase migration repair`, hoặc SQL
  `insert/update/delete/alter/drop` — **tất cả đều ghi thật lên database production** (xem B1)
- viết lại luật chấm trong một script riêng rồi đo bản chép (AGENTS luật 7)

Khi Codex hỏi xin quyền chạy một lệnh ngoài sandbox, đọc kỹ lệnh đó trước khi bấm đồng ý.

### A7. Chạy một vòng chấm 10 auditor bằng Codex

Claude chạy auditor bằng agent con; với Codex, mỗi auditor là **một lần chạy `codex exec` riêng**.
Đã thử với một auditor thử nghiệm: đọc được nội dung qua `getWeekContent`, ghi được nháp ngoài
repo, không để lại gì trong repo. **Chưa chạy trọn một vòng 10 người bằng Codex** — vòng đầu nên
xem kỹ báo cáo có đúng khuôn không.

Chuẩn bị: sao `docs/audit/brief-p2-r9.md` thành brief của vòng mới theo Phụ lục B của nó (đổi
commit đóng băng, tuần, phase; **giữ nguyên Phụ lục A**) — việc này giao cho Codex trong phiên
thường được.

Rồi chạy trong PowerShell (ví dụ cho vòng 1 của Phase 3 — đổi `$Round` và `$Brief`):

```powershell
$Round = "p3-r1"
$Brief = "docs/audit/brief-p3-r1.md"
$Ids = "AC-FO","AC-FB","AC-HK","AC-SW","AC-GR","HM-FO","HM-FB","HM-HK","HM-SW","HM-GR"
foreach ($Id in $Ids) {
  $Role = if ($Id -like "AC-*") { "Academic Director" } else { "Hotel Manager" }
  $Dept = $Id.Substring(3)
  $Dir  = "$env:TEMP\audit-$Round\$Id"
  New-Item -ItemType Directory -Force $Dir | Out-Null
  codex exec -s workspace-write --add-dir $Dir --ephemeral -c project_doc_max_bytes=0 `
    -o "$Dir\report.md" `
    "Bạn là auditor độc lập, vai $Role, bộ phận $Dept. Đọc $Brief và làm đúng theo đó, chấm theo Phụ lục A cho vai và bộ phận của bạn. Thư mục nháp DUY NHẤT bạn được ghi: $Dir. Không tạo, sửa, xoá bất kỳ file nào trong repo. Không chạy lệnh git nào. Không đọc docs/HANDOFF.md, docs/agent-playbook.md, docs/academic-review-*, docs/review-*. Câu trả lời cuối cùng của bạn là TOÀN BỘ báo cáo."
}
git status --short   # phải chỉ còn những dòng đã có từ trước
```

Mỗi cờ ở đó có lý do, đừng bỏ:

| Cờ                                            | Vì sao                                                                                                                                                                                  |
| --------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `-c project_doc_max_bytes=0`                  | Không cho auditor tự nạp `AGENTS.md`. Nếu nạp, nó được dặn đọc HANDOFF — nơi ghi điểm các vòng trước — và **hết mù**. Đã thử: có cờ này thì auditor không thấy chỉ dẫn nào.             |
| `--ephemeral`                                 | Không lưu phiên, để auditor vòng sau không nhớ được vòng trước.                                                                                                                         |
| `--add-dir $Dir`                              | Chỗ nháp ngoài repo. Mỗi auditor một thư mục — trùng tên file thì chúng ghi đè nhau.                                                                                                    |
| `-s workspace-write` (không phải `read-only`) | Đã thử: ở `read-only`, Bun bị Windows chặn đọc file (`EPERM`) nên auditor không render được nội dung. Cái giá: về kỹ thuật auditor ghi được vào repo — nên cuối vòng phải `git status`. |
| `-o …\report.md`                              | Codex tự ghi câu trả lời cuối vào file này.                                                                                                                                             |

Vòng lặp trên chạy **lần lượt**, mười người có thể mất vài giờ và tốn nhiều hạn mức. Muốn chạy
song song thì mở nhiều cửa sổ PowerShell, mỗi cửa sổ một mã auditor.

---

## Phần B — cho Codex

Bạn đã đọc `AGENTS.md`. Đây là những gì **khác** khi agent là Codex, trên máy Windows này.

### B1. Khác biệt phải biết

- **MCP tên `supabase` trong `~/.codex/config.toml` trỏ vào một dự án Supabase KHÁC của người
  dùng, không phải app này.** Gọi nó để "kiểm database" sẽ trả số liệu của database khác mà trông
  hoàn toàn hợp lệ. Dự án của app này là `Hospitality English_App`, ref `qndpocpavzwpephooffk`
  (khớp `supabase/config.toml`). Chỉ dùng MCP nào trỏ đúng ref đó **và** có `read_only=true`
  trong URL. Tính đến 28/09 **chưa có MCP như vậy** — muốn biết số liệu production thì báo người
  dùng, đừng tự viết SQL qua Supabase CLI: CLI không có chế độ chỉ đọc, một câu sai là ghi thật.
- **Supabase CLI trên máy đã đăng nhập và repo đã `link` vào production.** Mọi lệnh CLI ghi —
  `db push`, `db reset --linked`, `migration repair`, hay bất kỳ SQL ghi nào — chạy thẳng lên
  production.
  Luật 4 của AGENTS áp dụng: hỏi người dùng trước, từng lần. Lệnh chỉ đọc thì được, ví dụ
  `supabase gen types typescript --linked` và `supabase migration list --linked`.
- **Shell là PowerShell.** Cú pháp gán biến môi trường kiểu bash trong AGENTS.md không chạy. Thay
  `LINT_CONTENT_FULL=1 bun run lint:content` bằng:
  ```powershell
  $env:LINT_CONTENT_FULL = "1"; bun run lint:content; Remove-Item Env:LINT_CONTENT_FULL
  ```
- **Sandbox:** Bun chạy được ở `workspace-write`, bị chặn đọc (`EPERM`) ở `read-only`. Gặp
  `EPERM` là do sandbox, không phải repo hỏng.
- **`bun run ci` mất vài phút** (lint là phần lâu). Nếu lệnh bị ngắt vì quá thời gian, chạy từng
  bước: `bun run typecheck`, `bun run verify:content`, `bun run qa:full`, `bun run format:check`,
  `bun run lint`. Không được coi "chưa chạy xong" là "xanh".
- **Không có bộ nhớ của Claude.** Mọi luật và bài học đã nằm trong AGENTS, HANDOFF, playbook. Người
  dùng nói "như lần trước" thì tìm trong `git log` và HANDOFF, không đoán.
- **Đừng tự chấm nội dung mình vừa sửa.** Chấm mù phải là một phiên khác, không nạp chỉ dẫn dự án
  — xem A7.
- **Commit:** dòng cuối message ghi `Agent: Codex`, để phân biệt với commit của Claude (dòng
  `Co-Authored-By: Claude …`). Chỉ `git add` từng đường dẫn cụ thể.

### B2. Một phiên chuẩn

1. `git pull`, `git status`. Có thay đổi chưa commit → báo người dùng, chưa làm gì.
2. `bun run ci` và các probe ở HANDOFF §7 → so với mốc ở AGENTS §6.
3. **Trước việc dài, ghi một dòng "đang làm …" vào HANDOFF và commit.** Nếu phiên bị cắt vì hết
   hạn mức, agent sau (Claude hay Codex) biết bạn đang ở đâu.
4. Làm việc được giao, theo AGENTS §5 và playbook. Sau mỗi cụm sửa: `bun run verify:content`.
5. Cuối: CI xanh, probe không xấu hơn mốc. Commit — message kể cái gì hỏng, vì sao, số đo trước/sau.
   Push lên nhánh làm việc (hiện là `content/p2-gates`), không bao giờ lên `main`.
6. Cập nhật HANDOFF: ngày, việc đã làm, việc dở, số đo mới. Nếu mốc chuẩn đổi có chủ đích, sửa luôn
   bảng mốc ở AGENTS §6.
7. Báo người dùng bằng tiếng Việt: kết quả và con số, không kể từng bước.
