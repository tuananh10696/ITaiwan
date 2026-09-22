# CLAUDE.md — ITaiwan

Hướng dẫn cho Claude khi làm việc trên repo này. **Đọc `README.md` trước** — nó có đủ kiến
trúc, quy ước code, bảng màu, cách deploy. File này chỉ ghi những điều README không nói.

---

## Nguồn gốc

Dự án tách ra từ một hệ thống lớn hơn (nhiều bộ giáo trình + bán khoá online). Bản này giữ:

- **Giáo trình Thời Đại** (5 quyển) — bộ giáo trình duy nhất
- Học phát âm · Từ vựng TOCFL · Thi thử TOCFL · Từ điển · Bộ thủ · Sổ tay · Lộ trình
- Cổng quản trị: lớp học, đề bài, giáo viên, học viên, hồ sơ du học, ký túc xá, sổ thu chi,
  thiết bị đăng nhập

Đã gỡ hẳn: giáo trình Đương đại, HSK, khu Cộng đồng, khu Luyện tập (flashcard/trắc nghiệm/hội
thoại/luyện nói đứng riêng), Kho từ vựng gộp, và **toàn bộ phần bán hàng** (bảng giá, thanh
toán, quyền học theo khoá, mô hình cho thuê nhiều trung tâm).

→ Hệ quả: **mọi nội dung mở cho mọi học viên đã được duyệt tài khoản.** `server/utils/quyen-noi-dung.js`
luôn trả "có quyền"; nếu sau này muốn bán khoá thì chỉ phải thay ruột file đó.

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
node tests/mobile/kiem-web-khong-hong.mjs
```

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
npm run seo:sitemap
```

Thiếu một bước là đề lệch với dữ liệu mà không có lỗi nào hiện ra.
