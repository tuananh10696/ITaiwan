# CLAUDE.md — ITaiwan

Hướng dẫn cho Claude khi làm việc trên repo này. **Đọc `README.md` trước** — nó có đủ kiến
trúc, quy ước code, bảng màu, cách deploy. File này chỉ ghi những điều README không nói.

---

## Nguồn gốc

Dự án tách ra từ một hệ thống lớn hơn (nhiều bộ giáo trình + bán khoá online). Bản này giữ:

- **Giáo trình Thời Đại** (5 quyển) — bộ giáo trình duy nhất
- Học phát âm · Từ vựng TOCFL · Thi thử TOCFL · Từ điển · Bộ thủ · Sổ tay · Lộ trình
- Cổng quản trị: lớp học, đề bài, giáo viên, học viên, hồ sơ du học, ký túc xá, sổ thu chi

Đã gỡ hẳn: giới hạn 2 thiết bị đăng nhập + màn "Thiết bị đăng nhập" của quản trị (2026-10-05 —
mở nhiều ứng dụng trên CÙNG một máy bị tính thành nhiều thiết bị; bảng `user_devices` /
`device_alerts` còn trong schema nhưng không chỗ nào đọc), giáo trình Đương đại, HSK, khu Cộng đồng, khu Luyện tập (flashcard/trắc nghiệm/hội
thoại/luyện nói đứng riêng), Kho từ vựng gộp, và **toàn bộ phần bán hàng** (bảng giá, thanh
toán, quyền học theo khoá, mô hình cho thuê nhiều trung tâm).

→ Hệ quả: quyền học chỉ phụ thuộc **tài khoản đã được duyệt hay chưa** (2026-10-05, giống bên
taiwanese nhưng "đã duyệt" thay cho "đã mua"): khách và tài khoản chưa duyệt học thử `SO_BAI_MO`
(3) bài đầu mỗi quyển (`shared/noi-dung-mo.js`), không có đề thi thử; học sinh đã duyệt + mọi nhân
sự xem hết. Quyết định nằm ở `server/utils/quyen-noi-dung.js`; kiểm bằng `npm run test:hoc-thu`.
Hồ sơ du học cũng chỉ mở (và chỉ được tạo) sau khi duyệt.

---

## Những chỗ lịch sử để lại, đừng hiểu nhầm

| Thứ | Giải thích |
|---|---|
| `org_id` trên `users` / `classes` | Luôn bằng 1. `loadRole()` đặt `req.orgId = 1` và `req.locOrg = false` nên không truy vấn nào lọc theo tổ chức. Giữ cột để không phải viết lại ~60 câu SQL. |
| Bảng `translate_submissions` | Luôn rỗng — tab "Dịch Trung-Việt" đã bỏ. Giữ bảng vì vài truy vấn thống kê tra `EXISTS` vào nó; bỏ đi thì phải sửa 10 câu SQL lồng nhau để đổi một kết quả vốn đã luôn là "chưa nộp". |
| Bảng `vocabulary`, `saved_words`, `user_vocabulary` | Rỗng. Là bảng của bản mock cũ; `notebook_words` và `srs_words` mới là thứ đang dùng. |
| Namespace `onllang:` trong `lesson_id` | Tên cũ của "Luyện tập tổng hợp". Giữ nguyên để không mất liên kết với bản ghi đã có. |
| `src/data/sinh-de-trac-nghiem.js` | Trước tên là `duongdaiExercise.js`. Dùng cho mọi bộ giáo trình. |
| `requireOrgAdmin` | Nay chỉ là alias của `requireAdminOnly`. |
| `points[].formula` · `title` của ngữ pháp | LỜI GIẢNG NGUYÊN VĂN bóc từ PPT gốc — tiếng Anh ở quyển 1-2, tiếng Trung ở quyển 3-5 — và `giaiThich` / `titleVi` chính là bản tiếng Việt dịch từ chúng. Giao diện CHỈ hiện bản tiếng Việt (2026-09-30); bản gốc nhiều chỗ còn lẫn nội dung của điểm khác nên không đáng tin để hiện kèm. Giữ trường lại làm lưới cuối cho mục chưa kịp dịch. |
| `defEn` của từ vựng · cột `NGHIA_EN` của `kho.json` | Nghĩa tiếng Anh của sách. KHÔNG hiện khi đã có nghĩa tiếng Việt (8.174/8.181 từ đều có). |
| Từ vựng có phiên âm bắt đầu bằng m/n | Bộ bóc PPT coi chữ cái đầu là MÃ TỪ LOẠI rồi dồn trường: 美國 từng có `pinyin: "the USA"`, 牛 có nghĩa `"iú"`, nhãn từ loại `"m"`/`"n"`. `npm run data:va-tu-vung` vá cả giáo trình lẫn `kho.json` + `k-NN.json` (bảng sửa nằm trong script, có ghi nguồn). **Sinh lại từ vựng bằng `gen-thoidai-vocab.mjs` là lỗi quay lại** — chạy lại script vá ngay sau đó. |
| Cách đọc "lạ" so với pypinyin | Nhiều chữ đọc theo chuẩn ĐÀI LOAN: 攜 xī · 艘 sāo · 崖 yái · 驟 zòu · 蝸 guā · 淆 yáo · 垃圾 lèsè · 哎喲 āiyāo. Đều ĐÚNG — đừng "sửa" theo từ điển đại lục. |
| `teacher_notes` / `teacher_reviews` | Tên cột THẬT (init-db.js, cũng là schema production): `noi_dung`, `nguoi_ghi`, `nguoi_cham`. File `migration-teacher-role.sql` còn ghi `note` / `author_id` nhưng là `CREATE TABLE IF NOT EXISTS` và đã được đánh dấu chạy trên mọi DB dựng bằng init-db — đừng viết SQL theo file đó (màn hồ sơ giáo viên từng 500 vì vậy). Đừng sửa file migration đã chạy: đổi nội dung là `migrate.mjs` cảnh báo mãi. |

---

## Ba cái bẫy đã mất công nhất khi dựng bản này

1. **Thiếu `case` trong `switch` của `navigate()`** → trang rơi vào `default: renderDashboard()`.
   URL vẫn đúng, 0 lỗi JS, khai đủ `MODULE_TRANG` + `IMPLEMENTED_PAGES` vẫn không đủ. Dấu hiệu
   nhận ra: hai trang khác nhau cho ra **cùng một số ký tự** nội dung.

2. **Backtick trong comment SQL nằm trong template literal JS** đóng chuỗi sớm →
   `SyntaxError: missing ) after argument list` ở một dòng cách đó rất xa. Viết comment SQL
   bằng chữ thuần, đừng dùng `` ` ``.

3. **Xoá code theo SỐ DÒNG là sai** khi các khu bị xen kẽ nhau — khu "Quản lý giáo viên" của
   `admin.js` nằm ở hai đoạn rời, kẹp giữa là khu khác. Xoá theo TÊN HÀM, rồi so danh sách hàm
   trước/sau để chắc không xoá nhầm:

   ```bash
   grep -oE "^(async )?function [A-Za-z_][A-Za-z0-9_]*" file.js | sed 's/.*function //' | sort -u
   ```

---

## Kiểm thử

```bash
npm run server:test                  # backend cho bộ test (tắt giới hạn tần suất)
npm run test:quyen                   # ma trận phân quyền
npm run test:du-hoc                  # vòng đời hồ sơ du học
npm run test:quy-ktx-de              # sổ thu chi · ký túc xá · đề bài
npm run test:push                    # push thông báo — tự dựng backend + dịch vụ push giả, KHÔNG cần server:test
node tests/mobile/kiem-web-khong-hong.mjs
```

Kiểm push bằng trình duyệt thật: Playwright mặc định (chromium headless-shell) luôn báo
`Notification.permission = 'denied'`, còn `browser.newContext()` là ẩn danh — Chrome **không có
Push API trong ẩn danh** và cố ý không để web dò ra. Phải dùng
`chromium.launchPersistentContext(thuMuc, { channel: 'chrome' })` + `grantPermissions(['notifications'])`;
khi đó đăng ký FCM thật và `reg.getNotifications()` đọc được thông báo SW đã hiện.

Kiểm bằng trình duyệt thật thì chạy backend + vite ở cổng riêng và **phải truyền
`EXTRA_ORIGINS`**, nếu không mọi POST nhận 500 vì CORS còn GET vẫn 200 — rất dễ tưởng là lỗi
của route:

```bash
PORT=3999 EXTRA_ORIGINS=http://localhost:5199 node server/index.js
VITE_API_TARGET=http://localhost:3999 npx vite --port 5199
```

Token thử nghiệm phải ký bằng khoá **`id`** (`jwt.sign({ id: 1, ... })`) — `generateToken()`
phát như vậy; dùng `userId` thì `req.userId` là undefined và route trả 500.

---

## Khi thêm nội dung

Sau khi sửa từ vựng / ngữ pháp trong `src/data/`:

```bash
npm run data:tach        # sinh lại public/data/{giaotrinh,luyentap}
npm run luyentap:tusinh -- --bo thoidai
npm run luyentap:kiem    # đối chiếu đáp án với dữ liệu sách
npm run baitap:kiem-toan # kiểm toàn bộ đề: 0 câu trùng đáp án, 0 đề rỗng
npm run audio:kiem       # âm thanh: thiếu file · clip cắt hụt · URL http:// · đường dẫn tương đối
npm run tts:chi-muc      # chỉ mục chữ Hán -> mp3 giọng máy (nút loa không kèm đường dẫn dùng nó)
npm run thoidai:grammar-dich  # sau khi sinh lại ngữ pháp: gắn lại phiên âm + nghĩa tiếng Việt cho câu ví dụ
npm run audio:pron-sgk   # sau khi đổi ví dụ ở pronunciationData.js: tra lại bản thu thật cho từng ví dụ
npm run data:va-tu-vung  # chỉ khi vừa sinh lại từ vựng từ PPT — vá lỗi lệch trường của bộ bóc
npm run seo:sitemap
```

Thiếu một bước là đề lệch với dữ liệu mà không có lỗi nào hiện ra.

---

## Âm thanh hỏng thì KHÔNG có lỗi nào hiện ra

Năm kiểu hỏng dưới đây đều "chạy bình thường", console sạch trơn, chỉ có điều bấm loa không
nghe thấy gì. `npm run audio:kiem` soi cả năm; chạy nó sau mỗi lần đụng vào dữ liệu hoặc audio.

| Kiểu | Vì sao im lặng |
|---|---|
| Thiếu file | App tự rơi xuống nguồn sau (mp3 giọng máy → Web Speech). Máy không có giọng tiếng Trung nào thì rơi tới đáy là im bặt. Trên SPA, 404 còn trả về `index.html` kèm mã **200**. |
| Clip cắt hụt | File có thật, phát "thành công". `ddSpeakWord` chỉ bỏ clip < 0,25s, nên clip 0,32s đọc từ 2 âm tiết lọt lưới. Bộ kiểm xét theo **độ dài mỗi âm tiết** (< 0,24s là hụt). |
| URL `http://` | Trang chạy HTTPS thì trình duyệt CHẶN mixed content — thẻ `<audio>` im lặng, không có lỗi mạng nào để lần ra. Đề thi TOCFL từng có 778 URL như vậy. |
| Đường dẫn tương đối | Không có `/` đầu thì trình duyệt ghép vào URL trang hiện tại, mỗi trang một kết quả 404 khác nhau. |
| Trỏ sang website khác | Họ đổi/xoá file là câm. Chủ dự án quyết định (2026-10-01): mọi âm thanh/ảnh phải lưu trên server mình — bảng phiên âm (`scripts/tai-am-bang-phien-am.mjs`) và đề thi TOCFL (`scripts/tai-de-thi-tocfl.mjs`, `public/data/thi/tocfl.json` là NGUỒN, sửa thẳng) đã chuyển. |

Vá tự động: `npm run audio:va` (đổi sang bản thu cùng chữ → mp3 giọng máy → liệt kê chữ cần
sinh), rồi `npm run tts:bo-sung` sinh mp3 còn thiếu, rồi chạy lại `audio:va` để gán đường dẫn.

**Năm bộ phát độc lập** (`pronAudio` · `_ddAudio` · `_doc.audio` · `ddDlgState.audio` · `_ddExAudio`) không
biết nhau, nên mọi chỗ đổi màn hình phải gọi `dungMoiAmThanh()` — quên là rời trang rồi mà bản
thu hội thoại vẫn phát, trong khi nút tắt của nó đã bị `innerHTML` mới xoá.

---

## Âm thanh ĐÚNG FILE nhưng SAI NỘI DUNG (2026-10-01)

`audio:kiem` chỉ soi file có/không, dài/ngắn — clip đọc NHẦM TỪ vẫn lọt (từ 17-18 bài 1.1 từng đọc
sai mà mọi bộ kiểm đều xanh). Kiểm nội dung bằng nhận dạng giọng nói:
`scripts/.venv/bin/python scripts/kiem-noi-dung-audio.py` (whisper.cpp; `--rieng` = nghe từng clip,
chậm nhưng dùng để kết luận). Clip đã xác nhận sai ghi vào `scripts/audio-clip-sai.json` — `audio:va`
tự bỏ các clip đó.

| Bẫy | Cách xử lý đang dùng |
|---|---|
| Mượn bản thu theo CHỮ, bỏ qua cách đọc | Khoá bản thu là `chữ|pinyin`. 得 de ≠ 得 děi, 長 cháng ≠ zhǎng: mượn nhầm là đọc sai hẳn từ. |
| Một bài có 2 mục cùng chữ khác cách đọc dùng chung 1 clip | Cách đọc thật của clip đo bằng CAO ĐỘ (`scripts/data-cache/thoidai/phat-am/cao-do.py`) rồi ghi vào `CLIP_DOC` trong `va-audio-thieu.mjs` (空 kōng, 轉 zhuàn). |
| Giọng máy đọc MỘT chữ đa âm theo cách đọc mặc định | 空 kòng bị đọc kōng. Bảng `DONG_AM_MAY` trong `va-audio-thieu.mjs`: cho giọng máy đọc một chữ đồng âm chỉ có một cách đọc (空 kòng → 控). Thêm cặp mới thì đo lại cao độ file sinh ra — 瞭 từng bị đọc liào chứ không phải liǎo. |
| Nhận dạng giọng nói với ÂM TIẾT ĐỨNG RIÊNG | Không tin được (kể cả model lớn): nhầm z/s, zh/sh, q/x liên tục. Âm tiết đơn thì kiểm thanh bằng cao độ, không kết luận nội dung bằng whisper. |

## Học phát âm: âm thanh lấy từ đâu

- Thanh mẫu, vận mẫu, bộ 4 thanh, từ mẫu: cắt từ bài 中文基礎 (phát âm) của sách quyển 1 —
  `scripts/cat-phat-am-sgk.py` (bảng nhãn `NHAN` ghi rõ đoạn nào là âm gì) → `public/audio/pron/sgk/`.
  Một giọng cho cả nhóm: khách từng phản ánh "các âm không cùng một nguồn".
- Chữ/từ ví dụ: `scripts/gen-pron-sgk.mjs` tra theo `chữ|pinyin` → `src/data/pronSgkAudio.js`.
  Ví dụ không có bản thu thật thì script in ra — chọn ví dụ khác có trong sách thay vì để giọng máy.
- "Cặp dễ nhầm" phát CHÍNH âm của thẻ thanh mẫu (bō / pō …): sửa âm ở thẻ là cặp tự đúng theo.
- Bảng phiên âm: 382 ô là bản thu gốc của tiengtrungthaoan.edu.vn đã TẢI VỀ `public/audio/pron/bang/`
  (chủ dự án quyết định 2026-10-01 — không trỏ sang web khác nữa); ô nguồn đó không có dùng vận mẫu đọc
  riêng của sách. Đừng đưa lại URL ngoài vào `pinyinChartAudio`: `scripts/tai-am-bang-phien-am.mjs` chuyển
  mọi URL ngoài về bản lưu tại chỗ. Ô `huang` của nguồn đó là giọng nữ (cả bảng giọng nam), `miu` không có bản thu.
  ⚠️ Bản thu đó nén 40 kbps, MẤT dải tần cao: 108 ô nhóm z/c/s/zh/ch/sh (và vài ô f/h/j/x) gần như không nghe ra
  phụ âm đầu ("cāi" nghe như "āi"; đo đoạn phụ âm 0–20 ms, bản của sách 55–220 ms). 2026-10-05 thay 92 ô bằng bản
  ghi sách / bản thu từ vựng / giọng máy đã đo thanh — `scripts/va-bang-phien-am-phu-am.mjs` (danh sách đo được
  nằm trong script); 16 ô không có chữ thanh 1 nào (cē, shēi, zuō…) giữ file cũ.

## Bài tập: câu NGHE

`generateQuiz(sub, nguon, { nghe: true })` thêm câu nghe từ vựng + câu hội thoại — chỉ dùng
`audio` (bản thu thật), không dùng giọng máy. Chỉ trang Bài tập giáo trình bật: kiểm tra từ vựng
TOCFL có renderer riêng chưa biết vẽ nút nghe. Câu nghe hội thoại lấy ĐÁP ÁN là nghĩa tiếng Việt
vì chữ Hán của bài khoá bóc bằng nhận dạng giọng nói, còn sai chữ (宜文 → 疑問).

---

## Bản đồ trường ở trang chủ (2026-10-09)

Khối cuối trang chủ (`src/pages/ban-do-truong.js` nhẹ + `ban-do-truong-map.js` nặng, tải lười khi cuộn tới).
Dữ liệu 93 trường là bản chép từ API công khai của duhocdaongoc.vn: `node scripts/lay-danh-sach-truong.mjs`
(cần macOS vì dùng `sips`) ghi `public/data/truong/truong.json` + logo/ảnh vào `public/images/truong/` (ảnh nằm
trên server mình). Nguồn KHÔNG có chương trình / ngành / ưu đãi. Bốn tên sai chính tả của nguồn được sửa tay
trong bảng `SUA_TEN` của script — chạy lại script không làm mất các sửa đó. Logo và ảnh thuộc bên thứ ba, xem lại
bản quyền trước khi dùng thương mại.

- Nền bản đồ (2026-10-10): MẶC ĐỊNH là "Vệ tinh" thuần — ảnh hàng không NLSC (Cục Đo đạc Quốc gia Đài Loan,
  `wmts.nlsc.gov.tw/wmts/PHOTO2`, dữ liệu mở, không khoá API, zoom 6-20, chỉ phủ Đài Loan). Hai nền còn lại:
  "Vệ tinh (có nhãn)" (`PHOTO_MIX`) và "Bản đồ (có màu)" = OpenFreeMap "liberty". **Đừng dùng CARTO** — tile của nó nay phủ
  chữ "API KEY REQUIRED". MapLibre (≈1MB) chỉ được nạp khi người dùng chọn nền có màu, nên mặc định nhẹ.
- CSP không có `worker-src`, nên MapLibre phải dùng worker dạng file từ chính origin (`maplibregl.setWorkerUrl`
  với `maplibre-gl-csp-worker.js?url`). Dùng worker blob mặc định là bị chặn mà bản đồ chỉ trắng trơn.
- Điện thoại: bản đồ tắt `dragging` trên màn cảm ứng (một ngón cuộn TRANG, hai ngón mới kéo bản đồ), tờ chi tiết
  được đưa ra `<body>` — để trong khung cuộn của app thì thanh điều hướng dưới đè lên che mất nội dung.
- `leaflet.markercluster` đọc `L` toàn cục: phải gán `window.L = L` TRƯỚC khi `import('leaflet.markercluster')`.
- Service worker cache-first `/data/**` và `/images/**`: đổi `truong.json` mà khách cũ vẫn thấy bản cũ cho tới khi
  cache được đổi phiên bản.
- Demo tĩnh độc lập (dữ liệu Wikidata) ở `demo/truong-map/`, không nằm trong build.

