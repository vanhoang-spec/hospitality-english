# Chuyển deploy từ Netlify sang Vercel

Viết 05/10/2026. Người làm: chủ sản phẩm, trên giao diện web của Vercel và PA Việt Nam. Không cần
gõ lệnh.

Code đã sẵn sàng cho cả hai nơi: build trên Vercel ra bản cho Vercel, build ở mọi nơi khác vẫn ra
bản cho Netlify như cũ. Vì vậy **Netlify tiếp tục phục vụ học viên cho tới đúng lúc đổi DNS ở
bước 5**. Nếu dừng giữa chừng ở bất kỳ bước nào trước đó, không ai bị ảnh hưởng.

Thứ tự: **merge PR → chọn gói → import repo → khai biến môi trường → deploy và kiểm trên
`.vercel.app` → gắn tên miền và đổi DNS → tắt Netlify.**

---

## Bước 0. Điều kiện trước

1. **PR chứa thay đổi này phải đã merge vào `main`.** Nếu chưa, Vercel sẽ build ra bản Netlify và
   trang trên Vercel không chạy.
2. **Gói cước.** Gói Hobby (miễn phí) của Vercel chỉ cho dùng **cá nhân, phi thương mại**. Khoá học
   bán cho khách sạn là dùng thương mại, nên cần **Pro** (20 USD/tháng cho mỗi thành viên có quyền
   deploy). Nâng gói: Dashboard → **Settings → Billing → Upgrade**. Vercel có cho dùng thử Pro.
   Tài khoản Vercel đang có trên máy này là `hoang77`, đã có 3 project khác. Nên đặt project mới
   vào team Pro mà anh dùng cho việc kinh doanh.

## Bước 1. Import repo

1. Vào https://vercel.com/new và chọn đúng team ở góc trên bên trái.
2. **Import Git Repository** → GitHub → `vanhoang-spec/hospitality-english`. Nếu không thấy repo,
   bấm **Adjust GitHub App Permissions** và cấp quyền cho repo này.
3. **Project Name**: `hospitality-english`. Địa chỉ tạm sẽ là
   `https://hospitality-english.vercel.app`, hoặc tên gần giống nếu tên này đã có người dùng.
4. **Framework Preset**: để **Other**. **Build Command**, **Install Command** và **Output
   Directory**: để nguyên, không bật Override. File `vercel.json` trong repo đã quy định sẵn:
   cài bằng Bun, chạy toàn bộ CI rồi mới build. **Root Directory**: `./`.
5. **Chưa bấm Deploy.** Mở mục **Environment Variables** và làm bước 2 trước.

## Bước 2. Biến môi trường

Cần 7 biến. Cách nhanh nhất:

1. Mở file `D:\AI_app\Hospitality English\.env` bằng Notepad. File này trỏ đúng project Supabase
   production `qndpocpavzwpephooffk`.
2. Chọn toàn bộ nội dung, copy, rồi dán vào ô **Key** đầu tiên. Vercel tự tách thành từng dòng.
3. Kiểm tra lại có đủ 7 biến:

| Biến                            | Dùng ở                 | Ghi chú                                                     |
| ------------------------------- | ---------------------- | ----------------------------------------------------------- |
| `VITE_SUPABASE_URL`             | trình duyệt            | nhúng vào bundle **lúc build**                              |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | trình duyệt            | nhúng vào bundle **lúc build**                              |
| `VITE_SUPABASE_PROJECT_ID`      | trình duyệt            | nhúng vào bundle **lúc build**                              |
| `SUPABASE_URL`                  | server                 |                                                             |
| `SUPABASE_PUBLISHABLE_KEY`      | server                 |                                                             |
| `SUPABASE_PROJECT_ID`           | server                 |                                                             |
| `SUPABASE_SERVICE_ROLE_KEY`     | server, **chỉ server** | khoá toàn quyền database. Bật **Sensitive** nếu có tuỳ chọn |

- Áp dụng cho cả **Production** và **Preview**.
- Ba biến `VITE_*` được đóng cứng vào mã lúc build. Thêm hay sửa chúng **sau** khi đã deploy thì
  phải vào **Deployments → bản mới nhất → ⋯ → Redeploy**, nếu không trình duyệt vẫn chạy giá trị cũ.
- Nếu muốn đối chiếu với Netlify: Netlify → Site configuration → Environment variables.

Giờ bấm **Deploy**.

## Bước 3. Kiểm trên địa chỉ `.vercel.app`

- Lần build đầu mất khoảng **5–10 phút**, vì giống Netlify, Vercel chạy toàn bộ cổng kiểm định
  (`bun run ci`) trước khi build. Cổng đỏ thì không deploy. Đó là cố ý: một câu mẫu sai không bao
  giờ tới tay học viên.
- Mở `https://hospitality-english.vercel.app` (hoặc địa chỉ Vercel cấp) và kiểm:
  1. Trang chủ và `/login` mở được.
  2. Đăng nhập bằng một tài khoản **học viên** → mở tuần 23 → phần Speaking.
  3. Đăng nhập bằng tài khoản **HR khách sạn** → mở báo cáo.
  4. Đăng nhập **Super Admin** → mở bảng điều khiển nền tảng.
- Nên dùng **tài khoản thử**, không dùng tài khoản của học viên đang học. Mỗi tài khoản chỉ có một
  phiên đăng nhập sống, nên đăng nhập ở đây sẽ đăng xuất chính tài khoản đó trên trang thật.
- **Đừng gửi cho khách sạn link mời (`/join/...`) tạo trên địa chỉ `.vercel.app`.** Link mời mang
  tên miền của trang đang mở. Hãy tạo link trên `hospitality.embassy.edu.vn` sau bước 5.
- Server của web chạy ở **Singapore**, cạnh database (code đặt sẵn). Muốn xem: Deployments → bản
  mới nhất → tab Functions.
- Nếu mở link mà gặp trang đăng nhập của Vercel thay vì trang của khoá học, đó là lớp bảo vệ
  Deployment Protection của Vercel. Đăng nhập Vercel là xem được.

## Bước 4. Gắn tên miền trên Vercel

1. Project → **Settings → Domains → Add** → nhập `hospitality.embassy.edu.vn`.
2. Vercel hiện bản ghi DNS cần đặt, thường là **CNAME** với giá trị dạng `cname.vercel-dns.com`
   hoặc một chuỗi riêng như `xxxx.vercel-dns-0xx.com`. **Dùng đúng giá trị Vercel hiển thị.**
3. Nếu Vercel yêu cầu thêm một bản ghi **TXT** `_vercel` để xác minh quyền sở hữu, thêm bản ghi đó
   trước, ở bước 5.

## Bước 5. Đổi DNS ở PA Việt Nam

DNS của `embassy.edu.vn` do **PA Việt Nam** quản lý (ns1/ns2.pavietnam.vn). Hiện tại:

```
hospitality.embassy.edu.vn   CNAME   hospitality-english.netlify.app   (TTL 3600)
```

1. Đăng nhập trang quản trị tên miền của PA Việt Nam → quản lý DNS của `embassy.edu.vn`.
2. Sửa bản ghi CNAME `hospitality`: đổi giá trị từ `hospitality-english.netlify.app` sang giá trị
   Vercel đưa ở bước 4. Nếu có TXT `_vercel` thì thêm luôn.
3. Chờ. TTL hiện là 1 giờ, nên sau tối đa khoảng 1 giờ mọi người dùng đã sang Vercel. Trong lúc
   chuyển, người vào Netlify hay Vercel đều thấy cùng một bản, **không mất trang**.
4. Vercel tự cấp chứng chỉ HTTPS khi DNS đã trỏ về. Có thể có vài phút trình duyệt báo lỗi chứng
   chỉ, nên làm vào **buổi tối** hoặc giờ ít người học.
5. Mẹo: hạ TTL bản ghi xuống **300** (5 phút) từ hôm trước. Khi đó cả lúc chuyển lẫn lúc lùi đều
   nhanh.

**Học viên không bị đăng xuất**, vì phiên đăng nhập gắn với tên miền, mà tên miền giữ nguyên.

Xong khi: trang Domains của Vercel báo **Valid Configuration**, và mở
`https://hospitality.embassy.edu.vn` không còn lỗi chứng chỉ.

## Bước 6. Tắt Netlify, giữ làm đường lùi

1. Sau 1–2 ngày chạy ổn trên Vercel: Netlify → **Site configuration → Build & deploy →
   Continuous deployment → Stop builds**. Nếu không, mỗi lần push lên `main` sẽ build hai nơi.
2. Netlify → **Domain management** → gỡ `hospitality.embassy.edu.vn`.
3. **Giữ site Netlify thêm 1–2 tuần.** Cách lùi khi Vercel có sự cố: trả CNAME về
   `hospitality-english.netlify.app` và bật lại builds trên Netlify.
4. Hết thời gian giữ thì xoá site Netlify. Nhờ agent dọn `netlify.toml` cùng các ghi chú nhắc
   Netlify trong `.github/workflows/ci.yml`, `.env.example` và `AGENTS.md`.

## Những thứ KHÔNG phải đổi

- **Supabase**: không sửa gì. App đăng nhập bằng mật khẩu, không dùng link email chuyển hướng,
  nên không có danh sách Redirect URL nào phải cập nhật.
- **GitHub Actions CI**: giữ nguyên.
- **Lovable**: không ảnh hưởng.

---

## Phần dành cho agent

- `vite.config.ts` chọn preset Nitro theo `process.env.VERCEL`. Vercel đặt `VERCEL=1` trong mọi
  build. Có biến này thì `vite build` ghi `.vercel/output` (Build Output API v3), gồm static
  `assets/` và một function `__server.func` (Node 24, region `sin1`). Không có thì ra
  `dist/` + `.netlify/` như trước.
- Thử bản Vercel ngay trên máy: `VERCEL=1 bun run build`, rồi gọi
  `.vercel/output/functions/__server.func/index.mjs`. Hàm `default.fetch(Request)` trả SSR
  (`/` 200, `/login` 200, `/learn/FO/23/speaking` 200, đường dẫn lạ 404 — đo 05/10).
- `vercel.json` đặt `framework: null`, cài bằng `bun install --frozen-lockfile`, build bằng
  `bun run ci && bun run build`. Đây là cùng chốt chặn với `netlify.toml`.
- Mỗi push lên một nhánh bất kỳ sinh một Preview deployment, chạy cả CI, dùng **database
  production**. Preview được Vercel Authentication bảo vệ mặc định. Đừng tắt lớp bảo vệ đó.
