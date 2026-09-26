<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

# Chỉ dẫn cho coding agent (Codex, Claude Code, và mọi agent khác)

File này là nguồn chỉ dẫn **duy nhất** cho mọi agent làm việc trong repo. `CLAUDE.md` chỉ
trỏ về đây. Sửa luật thì sửa ở đây.

**Trả lời người dùng bằng tiếng Việt**, giữ thuật ngữ kỹ thuật bằng tiếng Anh. Người dùng là
chủ sản phẩm, không phải lập trình viên — báo cáo bằng kết quả và con số đo được, không kể lể
từng bước.

Đọc thêm, theo thứ tự:

1. [`docs/HANDOFF.md`](docs/HANDOFF.md) — **dự án đang ở đâu, việc gì đang dở, quyết định nào
   đang chờ người dùng.** Đọc trước khi làm bất cứ việc gì.
2. [`docs/agent-playbook.md`](docs/agent-playbook.md) — những bài học trả giá đắt. Mỗi mục là
   một lỗi đã xảy ra thật trong repo này.
3. [`docs/curriculum-level-matrix.md`](docs/curriculum-level-matrix.md) — spec giáo trình,
   canonical. Sửa spec trước, viết nội dung sau.

---

## 1. Sản phẩm

Khoá tiếng Anh chuyên ngành khách sạn **40 tuần** cho nhân viên người Việt. Năm bộ phận đang
phát hành: Lễ tân (FO), Nhà hàng & Bar (FB), Buồng phòng (HK), Spa (SW), Quan hệ khách hàng
(GR). Back Office (BO) đã rút khỏi danh mục; An ninh & Kỹ thuật (SE) đang làm dở, ẩn.

Bán cho khách sạn theo gói số học viên. Mô tả sản phẩm cho người ngoài:
[`docs/ho-so-san-pham-cho-ai-content.md`](docs/ho-so-san-pham-cho-ai-content.md). Hướng dẫn
quản trị: [`docs/huong-dan-quan-tri.html`](docs/huong-dan-quan-tri.html).

## 2. Stack và lệnh

TanStack Start + React 19 + Supabase + Tailwind v4, chạy bằng **Bun**. Deploy qua Netlify.

```bash
bun install
bun run dev              # http://localhost:8080
bun run typecheck        # tsc --noEmit
bun run verify:content   # verify-content.ts + lint-content.ts (cổng nội dung)
bun run qa:full          # 7 tầng QA, gồm dựng bài thi thật
bun run ci               # TẤT CẢ: typecheck && verify:content && qa:full && format:check && lint
bun run format           # prettier --write
```

**Không commit khi `bun run ci` đỏ.** Nhánh này đồng bộ sang Lovable, nên nhánh đỏ là sản
phẩm hỏng trên editor của người dùng. `bun run lint` chạy vài phút; `eslint . --rule
'{"prettier/prettier":"off"}' --quiet` nhanh hơn khi chỉ muốn biết có lỗi thật không.

## 3. Bản đồ mã nguồn

| Đường dẫn                                                                               | Là gì                                                                                                  |
| --------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `src/lib/content/phase0.ts` … `phase4.ts`                                               | Nội dung từng giai đoạn (tuần 1–6, 7–14, 15–22, 23–30, 31–40)                                          |
| `src/lib/content/phase2-lexicon.ts`                                                     | **Ngân hàng từ theo bộ phận** — khung đọc theo CHỈ SỐ (xem playbook §3)                                |
| `src/lib/content/phase2-dept-review.ts`                                                 | Lượt ôn riêng theo bộ phận, rải vào tuần                                                               |
| `src/lib/content/week-content.ts`                                                       | Tuần soạn tay + registry + `getWeekContent(dep, week)`                                                 |
| `src/lib/speaking-score.ts`                                                             | **Bộ chấm nói.** `utterancePassed`, `utterancePassedAny`                                               |
| `src/lib/speaking-alternates.ts`                                                        | Các câu đáp khác mà khoá cũng chấp nhận cho cùng một lời khách                                         |
| `src/lib/checkpoint-paper.ts`                                                           | `buildPaper` — dựng nửa viết của bài sát hạch                                                          |
| `src/lib/checkpoint-oral.ts`                                                            | `buildOral`, `oralHalfPassed` — nửa nói, gồm ô dự trữ bắt buộc đúng                                    |
| `src/lib/phases.ts`                                                                     | Ranh giới phase, ngưỡng đạt, cơ cấu đề                                                                 |
| `src/lib/review.ts`                                                                     | Ôn tập giãn cách (SM-2-lite)                                                                           |
| `src/components/suites/`                                                                | Các màn hình luyện: Vocab, Listening, Grammar, Reading, Speaking, Arcade, WeekTest, Writing, Mediation |
| `src/lib/org-admin-actions.ts`                                                          | Server function cho HR khách sạn                                                                       |
| `src/lib/platform-admin-actions.ts`                                                     | Server function cho Super Admin: tạo khách sạn, gói, bảng giá                                          |
| `src/routes/admin-console.tsx` · `org-admin.tsx` · `org-access.tsx` · `org-reports.tsx` | Bốn màn hình quản trị                                                                                  |
| `supabase/migrations/`                                                                  | Schema. **Bốn file cuối chưa áp dụng lên production** — xem HANDOFF                                    |
| `scripts/verify-content.ts` · `scripts/lint-content.ts`                                 | Cổng nội dung. `lint-content.ts` có các ratchet (file `scripts/_*-baseline.json`)                      |
| `scripts/probes/`                                                                       | Công cụ đo dùng trong các vòng kiểm định — xem §6                                                      |

## 4. Luật cứng — không có ngoại lệ

1. **Không rewrite git history đã push.** Không `--force`, không amend/rebase/squash commit đã
   đẩy. (Xem khối Lovable ở đầu file.)
2. **Không commit `.env` hay bất kỳ bí mật nào.** Repo này là **PUBLIC** trên GitHub.
3. **`SUPABASE_SERVICE_ROLE_KEY` chỉ dùng phía server.** Không bao giờ import
   `client.server` từ code chạy trên trình duyệt.
4. **Ghi lên database production cần người dùng đồng ý rõ ràng, từng lần.** Đọc thì được.
   Chạy migration, sửa dữ liệu, xoá dữ liệu — hỏi trước.
5. **Không đăng nhập thay người dùng, không nhập mật khẩu.** Muốn kiểm UI sau đăng nhập thì
   nhờ người dùng.
6. **Không đẩy thẳng lên `main`.** Hook `.githooks/pre-push` chặn. Luồng làm việc: nhánh → PR →
   CI xanh → merge.
7. **Gọi đúng hàm production khi đo.** Không chép luật của `buildPaper`/`utterancePassed` sang
   script rồi đo bản chép. Chi tiết và lý do: playbook §2.

## 5. Luật làm việc với nội dung

- **Một hiện vật là một CỤM, không phải một trường.** Một bài học gồm: thẻ từ vựng (`word`,
  `phonetic`, `definition`, `context`) · cặp ngữ pháp (`rude`, `polite`, `nearMiss`, `rule`) ·
  lượt nói (`guestPrompt`, `targetResponse`, `helpTip`, `requiredTokens`, `speakerRole`,
  `follows`) · bài đọc (văn bản, câu hỏi, phương án, lời giải) · vòng game. **Đổi một trường là
  phải đọc lại cả cụm.** Đây là lỗi tái phát số một của dự án.
- **Đổi câu là đổi người nghe.** `speakerRole: "colleague"` thì câu mẫu không có `sir`/`madam`;
  câu chỉ có nghĩa khi nói với đồng nghiệp thì không được gắn vai khách.
- **Vá theo hình dạng, không theo danh sách.** Khi ai đó báo một lỗi, tìm mọi chỗ cùng hình
  dạng bằng một phép quét, rồi sửa hết. Danh sách dòng mô tả triệu chứng.
- **Khung đọc ngân hàng theo chỉ số**, nên đổi một ô là đổi câu ở cả sáu bộ phận. Trước khi
  đụng khung hay ô, render cả sáu: `bun scripts/probes/six1.ts slot <nhóm> <chỉ số>`.
- **Trần câu:** Phase 2 là 13 từ, đo **theo từng câu**. **Trần thẻ:** Phase 0 là 8–10/tuần,
  Phase 2 là 12–16/tuần. **Một headword không được dạy hai lần trong tuần 1–22.**
- **Không headword nào được bắt nói trước tuần dạy nó.** Cổng Layer T kiểm điều này.
- Sau mỗi cụm sửa: `bun run verify:content`. Cổng đỏ vì ratchet tăng nghĩa là bạn vừa tạo lỗi
  mới — đừng hạ chốt, sửa nội dung.

## 6. Công cụ đo — `scripts/probes/`

Chạy từ gốc repo. Tất cả gọi hàm production.

| Lệnh                                                | Đo gì                                                                               |
| --------------------------------------------------- | ----------------------------------------------------------------------------------- |
| `bun scripts/probes/six1.ts slot <nhóm> <i>`        | Một ô ngân hàng ở cả sáu bộ phận                                                    |
| `bun scripts/probes/six1.ts lesson <LESSONID>`      | Một bài học, cả sáu bộ phận                                                         |
| `bun scripts/probes/six1.ts grep <regex> [w1] [w2]` | Tìm một chuỗi trên mọi bản render                                                   |
| `bun scripts/probes/leakall.ts`                     | Câu mẫu tự qua bộ chấm, và đáp án sai của chính khoá lọt qua bao nhiêu — cả 5 phase |
| `bun scripts/probes/cheat.ts`                       | 9 hồ sơ gian lận: im lặng, nhại lời khách, câu tủ, bỏ hư từ…                        |
| `bun scripts/probes/tricks.ts [N]`                  | Mẹo làm bài bề mặt (chọn dài nhất / ngắn nhất / giữa…) trên N đề thật               |
| `bun scripts/probes/oralmeasure.ts [N]`             | Học thuộc 20/40/60/80 câu hay ra nhất thì qua nửa nói bao nhiêu                     |
| `bun scripts/probes/orphans2.ts`                    | Cụm bắt nói mà không có thẻ ở tuần nào                                              |
| `LINT_CONTENT_FULL=1 bun run lint:content`          | In trọn danh sách vi phạm của mọi cổng ratchet                                      |

Mức chuẩn hiện tại để đối chiếu (đo 2026-09-27): `leakall` — câu mẫu tự qua **100%** ở cả 5
phase; đáp án sai lọt P0 23/349 · P1 10/494 · P2–P4 **0**. `orphans2` — **0**.
`oralmeasure 2000` (tuần 22) — bể 263–288 câu, học thuộc 60 câu qua nửa nói **21–26%**.
Đo với N nhỏ (vd 200) cho số cao giả tạo vì "60 câu hay ra nhất" bị tính trên chính mẫu nhỏ đó.
**Một thay đổi làm xấu bất kỳ số nào ở đây là hồi quy**, kể cả khi CI xanh.

## 7. Kiểm định nội dung

Mỗi giai đoạn được chấm bởi **10 auditor mù**: 5 Academic Director + 5 Hotel Manager, một
người mỗi bộ phận × luồng. Brief chuẩn nằm ở [`docs/audit/brief-p2-r9.md`](docs/audit/brief-p2-r9.md)
— dùng lại đúng file đó (chỉ đổi commit đóng băng và phase) để điểm các vòng so được với nhau.

Auditor **không được** đọc `docs/academic-review-*`, `docs/review-*`, lịch sử git, hay báo cáo
của nhau; không được sửa file trong repo; không chạy lệnh git (repo có hook tự commit). Mọi
trích dẫn của auditor phải được đối chiếu lại nguyên văn bằng `getWeekContent` **trước khi
sửa** — auditor giỏi vẫn sai.

Mốc đạt và các ngoại lệ người dùng đã chốt: xem HANDOFF §3.

## 8. Commit

Viết message kể **cái gì hỏng và vì sao**, có số đo trước/sau — xem `git log` để thấy văn
phong. Kết thúc message bằng dòng attribution của công cụ đang dùng.
