# ITaiwan — Hệ thống học tiếng Trung & quản lý trung tâm

Web app cho **Trung Tâm ITaiwan — Du học Đài Loan**: học viên học tiếng Trung và luyện thi
TOCFL; trung tâm quản lý lớp, giáo viên, hồ sơ du học, ký túc xá và sổ thu chi.

Toàn bộ giao diện, comment và thông báo lỗi bằng **tiếng Việt** — giữ nguyên quy ước này khi
thêm code mới.

---

## 1. Chạy trên máy

```bash
npm install

# Tạo .env (xem mục 2), rồi:
npm run db:init            # tạo bảng + tài khoản quản trị đầu tiên — XOÁ SẠCH dữ liệu cũ
npm run db:migrate:local   # chạy nốt các migration chưa nằm trong init-db

npm run server             # backend  -> http://localhost:3001
npm run dev                # frontend -> http://localhost:5173
```

Đăng nhập lần đầu: **admin@itaiwan.vn / ITaiwan@2026** — *đổi mật khẩu ngay*.
Cổng quản trị: `/admin.html`.

### Dữ liệu thử — `npm run demo:day-du`

Dựng sẵn một trung tâm giả lập để thử mọi chức năng mà không phải nhập tay:

```bash
npm run demo:day-du              # XOÁ SẠCH dữ liệu nghiệp vụ rồi seed lại (chỉ chạy trên DB local)
npm run demo:day-du -- --xoa     # chỉ xoá
```

Ra: 1 quản trị · 1 giáo viên · 11 học viên (+2 tài khoản chờ duyệt) · 2 lớp, kèm buổi học &
điểm danh, bài cô giao, kết quả bài tập có lời phê, ngân hàng 1.600 câu TOCFL + lượt thi, sổ
tay, thẻ ôn tập, nhịp học 120 ngày, đề tự soạn, hồ sơ du học, sổ thu chi, ký túc xá, thiết bị
đăng nhập. Mật khẩu chung **ITaiwan@2026**; script in ra bảng tài khoản kèm đặc điểm từng em.

Mỗi em một "điểm nhấn" khác nhau (em chăm nhất, em nợ bài, em có lời phê chưa đọc, em gần như
chưa có dữ liệu…) để không màn hình nào rơi vào cảnh "ai cũng giống ai".

⚠️ Ba điều dễ vấp khi thử tay trên máy:

1. **Vite nhảy cổng.** Cổng 5173 bận thì Vite tự sang 5174 — mà danh sách origin của backend
   chỉ khai sẵn 5173, nên mọi POST trả 500 vì CORS còn GET vẫn 200. Khởi động backend kèm
   `EXTRA_ORIGINS` trỏ đúng cổng Vite đang dùng:
   ```bash
   EXTRA_ORIGINS=http://localhost:5174 npm run server
   ```
2. **Giới hạn 10 lần đăng nhập / 15 phút.** Thử lần lượt 13 tài khoản là chạm trần ngay. Chạy
   `TAT_GIOI_HAN=true npm run server` (biến này bị bỏ qua khi `NODE_ENV=production`).
3. **Mỗi học viên chỉ được 2 thiết bị.** Seed cố ý chỉ cấp sẵn 1 máy cho mỗi em để trình duyệt
   của bạn còn chỗ. Riêng `hv10@itaiwan.vn` đã dùng hết 2 máy — đăng nhập bằng em đó sẽ bị chặn,
   đó là chủ đích để thử màn hình chặn và thao tác gỡ thiết bị bên quản trị.

### Lệnh hay dùng

| Lệnh | Việc |
|---|---|
| `npm run build` | Dựng bản chạy thật vào `dist/` |
| `npm run seo:sitemap` | Sinh lại `public/sitemap.xml` (chạy sau khi thêm trang/bài) |
| `npm run data:tach` | Tách lại `public/data/{giaotrinh,luyentap}` từ `src/data` |
| `npm run data:fa` | Sinh lại subset Font Awesome sau khi dùng icon mới |
| `npm run pwa:icons` | Sinh bộ icon PWA + splash iOS từ `public/favicon.png` |
| `npm run demo:day-du` | Dựng lại dữ liệu thử (xem mục trên) |
| `npm run db:migrate:prod` | Chạy migration lên production (có sao lưu trước) |
| `npm run db:diff` | So schema local với production |
| `npm run test:quyen` · `test:du-hoc` · `test:quy-ktx-de` … | Bộ kiểm thử API |

---

## 2. Biến môi trường (`.env`)

```
DB_HOST=127.0.0.1
DB_USER=root
DB_PASSWORD=
DB_NAME=itaiwan
DB_PORT=3306

# BẮT BUỘC, tối thiểu 32 ký tự — server TỪ CHỐI KHỞI ĐỘNG nếu thiếu hoặc quá ngắn.
# Sinh khoá: node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"
JWT_SECRET=
JWT_EXPIRES_IN=7d

PORT=3001
NODE_ENV=development

RESEND_API_KEY=            # để trống thì không gửi mail thật
EMAIL_DRY_RUN=true         # true = chỉ ghi log thay vì gửi mail
```

⚠️ **Đổi `JWT_SECRET` làm mọi phiên đăng nhập hiện có hết hiệu lực** — người dùng phải đăng
nhập lại. Đặt một lần rồi giữ nguyên.

---

## 3. Kiến trúc

```
Vite SPA (vanilla JS)  ──/api/* proxy──>  Express 5 (ESM)  ──>  MySQL
   :5173                                     :3001
```

Trên Vercel: `api/index.js` bọc Express thành serverless function; `vercel.json` rewrite
`/api/*` về đó, còn lại về `index.html`.

```
index.html · admin.html     hai entry (cổng học viên · cổng quản trị)
src/
  main.js                   router + phần lớn renderer của cổng học viên
  admin.js                  cổng quản trị
  admin-trungtam.js         sổ thu chi · ký túc xá · đề bài (tách ra vì admin.js đã dài)
  api/client.js             singleton `api` — MỌI request của cổng học viên đi qua đây
  core/                     lõi dùng chung (state · ui · sổ tay · nhịp đo hoạt động)
  pages/                    module NẠP ĐỘNG theo route: tuvung · lotrinh · taikhoan · kiemtra
  data/                     danh mục bài + kho nạp động + bảng tra cứu
  css/                      style.css (học viên) · admin.css · hero.css · native.css
server/
  index.js                  khai báo app + mount route
  config/init-db.js         NGUỒN SỰ THẬT của schema (tạo bảng + seed)
  config/migration-*.sql    migration cho DB đã có dữ liệu
  middleware/roles.js       phân quyền 3 vai trò
  routes/                   auth · exam · exercise · srs · notebook · lotrinh · profile ·
                            admin · teachers · du-hoc · quy · ktx · de-bai · noi-dung · cron
public/data/                nội dung học (giáo trình · đề luyện tập · đề TOCFL · từ điển)
public/audio/               bản thu + mp3 giọng máy
```

---

## 4. Nội dung học có gì

| Khu | Nội dung |
|---|---|
| Học phát âm | Vận mẫu · Thanh mẫu · Thanh điệu · Bảng phiên âm (407 âm tiết), có bản thu thật |
| Giáo trình Thời Đại | 5 quyển · 80 bài · 176 bài con — từ vựng, ngữ pháp, hội thoại, bài tập, luyện viết, game |
| Từ vựng theo Band | 7.517 từ TOCFL (華語八千詞), 6 cấp |
| Thi thử TOCFL | 18 đề, có audio gốc |
| Từ vựng & Hán tự | Từ điển 122.596 mục · 214 bộ thủ · Sổ tay từ vựng |
| Lộ trình của tôi | Tổng quan · Hôm nay · Bài tập · Tiến độ · Bài kiểm tra · Thành tích |

Mỗi bài con có **bài tập trắc nghiệm tự sinh** từ chính từ vựng của bài (`src/data/sinh-de-trac-nghiem.js`),
và **Luyện tập tổng hợp** sinh sẵn trong `public/data/luyentap/`.

---

## 5. Phân quyền

Ba vai trò trong `users.role`:

| | Quyền |
|---|---|
| `admin` | Quản trị trung tâm — toàn quyền |
| `teacher` | Chỉ lớp mình phụ trách (`classes.teacher_id`) |
| `student` | Không vào cổng quản trị |

**Luật nằm ở `server/middleware/roles.js`. Với giáo viên, mặc định là CẤM** — route nào cho
phép phải khai tường minh trong bảng `QUYEN`. Quên khai thì hậu quả là 403 (phiền nhưng an
toàn); làm ngược lại thì quên một route là giáo viên này đọc được lớp của giáo viên kia.

Ẩn menu **không phải** là bảo mật — chặn thật nằm ở server.

Cột `org_id` còn trên `users` và `classes` nhưng **luôn bằng 1**: hệ thống dựng sẵn cho nhiều
cơ sở, bản này phát hành cho một trung tâm. Muốn tách cơ sở sau này thì sửa `loadRole()` trong
`roles.js` — mọi truy vấn đã viết sẵn phần lọc.

---

## 6. Quy ước code — bám theo khi sửa

1. **Vanilla JS, không framework.** Không thêm React/Vue/jQuery.
2. **Render = template string gán vào `innerHTML`**; event gắn inline bằng
   `onclick="window.app.xxx(...)"`, không `addEventListener` cho phần tử render động.
3. **Mọi hàm gọi từ HTML phải được expose**: cổng học viên vào `window.app` (cuối `main.js`),
   cổng quản trị vào `window.adminApp` (cuối `admin.js`), module nạp động vào `handlers` của
   chính module đó. Quên bước này thì nút bấm không chạy, lỗi chỉ hiện ở console.
4. **Thêm trang mới cần BA chỗ**: `navConfig` → `IMPLEMENTED_PAGES` → một `case` trong `switch`
   của `navigate()`. Thiếu `case` thì trang rơi vào `default` và hiện trang chủ — URL vẫn đúng
   nên rất khó nhận ra.
5. **Gọi API**: cổng học viên luôn qua `src/api/client.js`; cổng quản trị dùng
   `apiGet/apiPost/apiPut/apiDel`.
6. **Query SQL luôn dùng placeholder `?`**, không nối chuỗi.
7. **Lỗi trả về dạng** `res.status(4xx).json({ error: 'Thông báo tiếng Việt.' })`.
8. **Đổi schema thì sửa `server/config/init-db.js`** — đó là nguồn sự thật. File này DROP và
   tạo lại bảng, nên với DB đã có dữ liệu phải viết `migration-*.sql` riêng và thêm tên file
   vào mảng `THU_TU` trong `scripts/migrate.mjs`.
9. **Design token ở đầu `src/css/style.css`** — dùng `var(--...)`, đừng hardcode màu.
10. **Icon: chỉ Font Awesome 6 FREE**, và phải chạy `npm run data:fa` sau khi dùng icon mới —
    icon không có trong subset sẽ **biến mất mà không báo lỗi**.

### Hộp icon + chữ dùng `display:flex`

Luôn bọc toàn bộ phần chữ vào **một** `<span>`:

```html
<i class="fa-solid fa-info"></i><span>Nội dung dài…</span>
```

Để chữ trần làm anh em trực tiếp của `<i>` thì mỗi đoạn chữ xen giữa các thẻ con thành một
"anonymous flex item" riêng — câu dài bị vỡ thành nhiều mẩu rời rạc. Đây là lỗi tái diễn
nhiều lần nhất trong dự án gốc.

---

## 7. Bảng màu

| Vai trò | Mã | Tương phản với trắng |
|---|---|---|
| Màu chính | `#1E4E9C` | 8,00:1 |
| Màu chính đậm | `#16376E` | 11,63:1 |
| Màu nhấn | `#D2321F` | 4,98:1 (đạt cả hai chiều) |
| Chữ Hán / trạng thái sai | `#C2410C` | 5,18:1 |

Sidebar: `#1E4E9C → #24487F → #2B4470`, chữ trắng (8,00 / 9,10 / 9,71:1).
**Đổi màu thì tính lại tương phản trước** — đừng chọn bằng mắt.

---

## 8. PWA

`public/manifest.webmanifest` + `public/sw.js`. Service worker chỉ đăng ký trên **web bản
build** (không chạy ở dev, không chạy trong app native).

⚠️ **iOS ghi nhớ cấu hình PWA lúc CÀI.** Đổi `index.html` (meta viewport,
`apple-mobile-web-app-*`) hay `manifest.webmanifest` thì PWA đã thêm vào màn hình chính
**không nhận được** — phải xoá icon rồi thêm lại. Khi người dùng báo lỗi PWA, hỏi
"đã cài lại sau lần sửa gần nhất chưa" trước khi đi tìm lỗi trong code.

Đổi logo: thay `public/favicon.png` rồi `npm run pwa:icons`.

---

## 9. Deploy

**Bản đang chạy:** https://itaiwan-edu.vercel.app — project Vercel `itaiwan-edu`
(tài khoản `tuananh10696`), nối thẳng với repo `tuananh10696/ITaiwan`.
**Deploy = push lên `main`**, Vercel tự dựng. Đừng chạy `vercel --prod`: free plan có trần
5.000 file upload/24h mà repo này 9.000 file, chạm trần là bị khoá deploy 24 giờ.

Commit được deploy phải mang author `90953946+tuananh10696@users.noreply.github.com`
(đã đặt sẵn ở `git config` cấp repo). Email khác → GitHub phân giải sang tài khoản khác →
Vercel Hobby bỏ qua build, không báo lỗi rõ ràng.

⚠️ **Vercel chốt biến môi trường vào lúc BUILD.** Sửa biến trên dashboard không ảnh hưởng bản
đang chạy — phải deploy lại mới có hiệu lực.

### Dựng từ đầu

1. Tạo DB MySQL (Aiven hoặc nhà cung cấp khác). SSL tự bật khi có biến `VERCEL` hoặc
   `DB_SSL=true`; khi đó đặt CA cert qua biến **`DB_CA_CERT`** (dán nội dung file, xuống dòng
   ghi bằng `\n`), hoặc để file tại `server/config/ca.pem`. Repo cố ý KHÔNG kèm sẵn ca.pem —
   mỗi nhà cung cấp một chứng chỉ khác nhau.
2. Đặt biến môi trường trên Vercel: `DB_*`, `JWT_SECRET` (≥ 32 ký tự), `NODE_ENV=production`,
   `APP_URL`, `RESEND_API_KEY` (nếu muốn gửi mail thật), `CRON_SECRET`.
3. `npm run db:migrate:prod` — script tự sao lưu ra `backups/` trước khi chạy.
4. Deploy. Sau đó mở `/api/noi-dung/tinh-trang` để xác nhận file nội dung đã lên đủ.

`vercel.json` khai `functions.includeFiles` trỏ `public/data/{giaotrinh,luyentap,thi,tocfl}/**` —
**thiếu khai báo đó thì mọi bài học 404 trên production mà log sạch trơn.**

---

## 10. Những chỗ cần cẩn thận

| Việc | Vì sao |
|---|---|
| `npm run db:init` | **XOÁ SẠCH dữ liệu.** Chỉ dùng cho máy dev hoặc lần cài đầu tiên. |
| Xoá `public/audio` | 200 MB bản thu; không có nguồn nào sinh lại được phần thu thật. |
| `android/` · `ios/` | Chưa có trong repo. Muốn dựng app native thì `npx cap add ios android`, và **phải đặt `VITE_API_BASE`** khi build — app native gọi `/api` vào chính WebView và luôn 404. |
| Đổi `TU_MOI_BAI`, `lesson_id` | Mọi bản ghi `exercise_results` đã có sẽ mất liên kết với bài. |
| Bỏ `Cache-Control` của `/audio/*` | Mỗi lần nghe lại một từ là tải lại từ đầu. |

---

## 11. Giấy phép dữ liệu

| Nguồn | Giấy phép | Ràng buộc |
|---|---|---|
| Từ điển Trung–Việt (CVDICT) | CC BY-SA 4.0 | Phải ghi công; bản phái sinh cũng CC BY-SA |
| Bảng bộ thủ / phân rã chữ (Unihan, makemeahanzi) | Unicode / LGPL | Ghi công |
| Bản thu giáo trình | Của nhà xuất bản | Dùng trong phạm vi dạy học, không phát tán lại file gốc |

Chi tiết ở `public/data/tudien/GIAY-PHEP.md` — **đừng xoá file đó**.
