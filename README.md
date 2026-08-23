# Embassy Hospitality

[![CI](https://github.com/vanhoang-spec/hospitality-english/actions/workflows/ci.yml/badge.svg)](https://github.com/vanhoang-spec/hospitality-english/actions/workflows/ci.yml)

Khoá tiếng Anh chuyên ngành khách sạn 40 tuần cho nhân viên người Việt — sáu bộ phận,
pre-A1 → A2+. Spec gốc: [`docs/curriculum-level-matrix.md`](docs/curriculum-level-matrix.md).

## Chạy

```bash
bun install
bun run dev          # http://localhost:8080
bun run ci           # toàn bộ gate — chính lệnh CI và Netlify chạy
bun scripts/dump-week.ts 9 24 37   # đọc câu render thật của một tuần, cả 6 bộ phận
```

## Đường đi của một thay đổi

```
nhánh → PR → CI (code · content · build) → merge main → Netlify (ci && build) → deploy
```

- **CI** chạy ba job song song trên mọi push và PR. Tên job nói thẳng lỗi ở đâu.
- **Netlify** chạy lại đúng bộ gate trước khi build. Gate đỏ = không deploy, bản cũ vẫn sống.
- **`main` không nhận push thẳng** từ máy có hook (`.githooks/pre-push`, tự bật khi `bun install`).
  Repo private trên GitHub Free không bật được branch protection phía server, nên chặn ở phía
  push. Bypass có chủ đích: `ALLOW_MAIN_PUSH=1 git push origin main`.
- **Batch nội dung** còn thêm một tầng con người: kiểm định mù kép (Academic Director ·
  Hotel Manager) trong hai context cách ly, rồi kiểm đường nối với phần sinh tự động.
  Checklist nằm trong PR template — gate xanh là sàn, không phải trần.

## Ba tầng kiểm nội dung

| Lệnh                     | Kiểm gì                                                                                                 |
| ------------------------ | ------------------------------------------------------------------------------------------------------- |
| `bun run verify:content` | Engine + ràng buộc giáo trình (GATE 0–4) · linter cấu trúc trên ~9.800 câu sinh (tầng A/B/C)            |
| `bun run qa:full`        | T1–T7: độ phủ, vệ sinh văn bản, thang CEFR, khoá ôn tập, mô phỏng suite, tính trả lời được, hợp đồng UI |
| Kiểm định mù kép         | Phán xét định tính — hai auditor cách ly, bắt buộc trích dẫn nguyên văn, đối chiếu lại trước khi nhận   |

Hai báo cáo gần nhất: [Academic Director](docs/review-academic-director-2026-08.md) ·
[Hotel Manager](docs/review-hotel-manager-2026-08.md).
