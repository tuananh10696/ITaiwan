# ITaiwan — Danh mục chức năng & dữ liệu

Tài liệu liệt kê những gì hệ thống đang có, chia ba phần:
**1. Cổng học viên** · **2. Cổng quản trị** · **3. Dữ liệu khách có trong hệ thống**

Hai cổng dùng chung một tài khoản, khác nhau ở vai trò: `student` · `teacher` · `admin`.

---

## 1. CỔNG HỌC VIÊN — `/`

### 1.1 Tài khoản & truy cập

| Chức năng | Mô tả |
|---|---|
| Đăng ký · Đăng nhập | Email + mật khẩu, JWT hạn 7 ngày |
| Xác thực email | Gửi link xác thực, có nút gửi lại |
| Chờ duyệt | Tài khoản mới phải được quản trị duyệt mới vào học được |
| Giới hạn thiết bị | Tối đa 2 thiết bị / tài khoản; vượt thì bị chặn và sinh cảnh báo cho quản trị |
| Vào lớp bằng mã mời | Nhập mã lớp giáo viên cấp; một học viên ở một lớp |
| Xem không cần đăng nhập | Trang chủ, Học phát âm, Giáo trình, Từ vựng theo Band |

### 1.2 Học phát âm

Vận mẫu · Thanh mẫu · Thanh điệu · Bảng phiên âm (407 âm tiết) — có bản thu thật, lọc theo nhóm âm.

### 1.3 Giáo trình Thời Đại — 5 quyển · 80 bài · 176 bài con

Mỗi bài con có 7 tab:

| Tab | Nội dung |
|---|---|
| Từ vựng | Danh sách từ, phát âm, Hán–Việt, ví dụ |
| Flashcard | Lật thẻ theo bộ từ của bài |
| Ngữ pháp | Mẫu câu + giải thích |
| Hội thoại | Hội thoại bài, nghe audio |
| Bài tập | Trắc nghiệm tự sinh từ chính từ vựng của bài, chấm ngay, lưu kết quả |
| Luyện viết | Xem thứ tự nét, viết lại chữ Hán |
| Game | Bong Bóng Từ Vựng · Cứu Chú Ong (lưu điểm cao theo từng bài) |

Kèm mục **Đọc thêm (văn hoá)** ở cuối mỗi bài và **Luyện tập tổng hợp** sinh sẵn theo quyển.

### 1.4 TOCFL

| Chức năng | Mô tả |
|---|---|
| Từ vựng theo Band | 7.517 từ (華語八千詞), 6 cấp; 3 tab: Danh sách · Flashcard · Trắc nghiệm |
| Thi thử TOCFL | 18 bộ đề Band A/B/C, Đọc hiểu & Nghe hiểu, có audio gốc, đếm giờ |
| Chấm & lưu | Chấm ở server, lưu lịch sử thi, xem lại từng câu kèm giải thích |

### 1.5 Từ vựng & Hán tự

| Chức năng | Mô tả |
|---|---|
| Từ điển Trung–Việt | Tra 122.596 mục; chi tiết từ: pinyin, Hán–Việt, nghĩa, chữ, nét viết, từ liên quan |
| Sổ tay từ vựng | Lưu từ từ bất kỳ màn hình nào, ghi chú, tìm/lọc/sắp xếp, xuất CSV |
| Bộ thủ Hán tự | 214 bộ thủ, lọc theo số nét, xem chữ thuộc bộ, xem nét viết |

### 1.6 Lộ trình của tôi (6 trang — bắt buộc đăng nhập)

| Trang | Nội dung |
|---|---|
| Tổng quan | Việc hôm nay, tiến độ từng quyển, lịch nhiệt, chuỗi ngày học |
| Bài học hôm nay | Bài kế tiếp nên học + phiên ôn tập ngắt quãng (SRS) theo từ đến hạn |
| Bài tập cần hoàn thành | Bài cô giao chưa nộp / quá hạn, lọc theo trạng thái |
| Tiến độ | Đường tiến độ theo quyển/bài, điểm trung bình |
| Bài kiểm tra cô giao | Danh sách đề được giao, làm bài có đếm giờ, xem điểm & lời phê |
| Thành tích | Điểm, cấp độ, chuỗi ngày, huy hiệu, bảng xếp hạng Top 10, **chứng chỉ hoàn thành quyển (tải ảnh PNG)** |

### 1.7 Bài tập & đề cô giao

- Nhận bài tập gắn với bài trong giáo trình (có hạn nộp, có nhắc).
- Làm đề tự soạn của trung tâm: 5 dạng câu (một đáp án · nhiều đáp án · đúng-sai · điền từ · tự luận), câu hỏi có thể kèm ảnh.
- Giới hạn số lần làm, trộn câu/trộn đáp án, hiện đáp án ngay / sau hạn / không hiện — theo cấu hình của đề.
- Xem điểm, lời phê của giáo viên; đánh dấu đã đọc.

### 1.8 Hồ sơ du học (chỉ học viên có hồ sơ)

Tự khai hồ sơ và gửi lên · theo dõi tiến độ 6 bước (Nhận hồ sơ → Đóng tiền → Học → Phỏng vấn → Visa → Bay) · xem giấy tờ còn thiếu · xem lịch sử đóng tiền · gửi yêu cầu sửa thông tin · nhận thông báo từ trung tâm.

### 1.9 Tài khoản & nền tảng

| Chức năng | Mô tả |
|---|---|
| Thông tin cá nhân | Sửa tên/điện thoại, đổi avatar, xem lớp đang học |
| Cài đặt | Đổi mật khẩu, chữ Phồn thể ↔ Giản thể, bật/tắt mail nhắc học |
| Thông báo | Bài mới giao, bài được chấm, nhắc hạn, thông báo du học; đánh dấu đã đọc |
| Mail nhắc học | Cron hằng ngày, chỉ gửi khi hôm nay chưa học và thật sự có việc phải làm |
| Đo hoạt động học | Ghi thời gian học theo ngày & khu vực → chuỗi ngày, lịch nhiệt |
| PWA · App native | Cài lên màn hình chính; có cấu hình Capacitor cho iOS/Android |

---

## 2. CỔNG QUẢN TRỊ — `/admin.html`

Phân quyền: **A** = quản trị · **G** = giáo viên (chỉ lớp mình phụ trách).

| Khu | A | G |
|---|:--:|:--:|
| Tổng quan | ✅ | ✅ (bản rút gọn) |
| Quản lý lớp | ✅ | ✅ lớp mình |
| Đề bài & kiểm tra | ✅ | ✅ |
| Giáo viên | ✅ | ❌ |
| Học viên | ✅ | ❌ |
| Hồ sơ du học · Ký túc xá · Sổ thu–chi · Thiết bị | ✅ | ❌ |

### 2.1 Tổng quan
Số liệu học viên / lớp / bài nộp, tài khoản chờ duyệt, hoạt động gần đây; bản riêng cho giáo viên chỉ gồm lớp của họ.

### 2.2 Quản lý lớp

| Nhóm | Chức năng |
|---|---|
| Lớp | Tạo · sửa · xoá · đóng lớp, gán giáo viên, sinh mã mời |
| Học viên trong lớp | Thêm lẻ / thêm hàng loạt, gỡ khỏi lớp, xem hồ sơ học tập từng em |
| Buổi học | Tạo buổi, sửa, xoá, lọc theo trạng thái |
| Điểm danh | Điểm danh theo buổi, đánh dấu hàng loạt, tổng hợp chuyên cần |
| Bài tập cô giao | Giao bài theo giáo trình/game, đặt hạn, nhắc nộp, xem danh sách đã nộp |
| Chấm bài | Xem chi tiết bài làm (trắc nghiệm giáo trình & bài thi), cho điểm, viết lời phê |
| Ghi chú học viên | Nhật ký nhận xét riêng từng em |
| Báo cáo lớp | Báo cáo tiến độ, xuất CSV |
| Lỗi sai hay gặp | Thống kê câu/từ cả lớp sai nhiều nhất |

### 2.3 Đề bài & kiểm tra
Soạn đề (5 dạng câu, câu hỏi kèm ảnh, điểm từng câu, giải thích) · lưu nháp → phát hành → thu hồi · cấu hình thời gian, số lần làm, trộn câu, điểm đạt, cách hiện đáp án · giao cho cả lớp hoặc từng học viên kèm mốc mở/đóng · xem kết quả toàn đề · chấm tay câu tự luận và viết lời phê.

### 2.4 Giáo viên
Thêm/sửa/xoá tài khoản giáo viên · gán lớp phụ trách · ghi chú nội bộ · phiếu đánh giá giáo viên (thêm/xoá nhận xét) · cấp và gỡ vai trò giáo viên.

### 2.5 Học viên
Danh sách + tìm kiếm + phân trang · duyệt tài khoản chờ (có badge đếm) · xác thực thủ công · sửa thông tin · đặt lại mật khẩu · xoá tài khoản · xem chi tiết kết quả học tập (bài tập, bài thi, sổ tay, chuỗi ngày).

### 2.6 Hồ sơ du học
Tạo hồ sơ (thông tin cá nhân, giấy tờ tuỳ thân, phụ huynh, học vấn, nguyện vọng trường/ngành, tư vấn viên) · chuyển bước quy trình 6 giai đoạn có ghi lịch sử · quản lý danh mục giấy tờ (đã nộp/thiếu) · thu tiền theo đợt kèm ảnh chứng từ · duyệt/từ chối yêu cầu sửa của học viên · gắn hồ sơ với tài khoản học viên · gửi thông báo cho học viên · tìm kiếm, lọc theo bước, phân trang · bảng tổng quan tiến độ.

### 2.7 Ký túc xá
Quản lý toà nhà → phòng (tầng, sức chứa, loại nam/nữ/chung, giá tháng, tiện ích, trạng thái) · xếp người vào ở (gắn với hồ sơ du học hoặc tài khoản) · ngày vào/ra, tiền cọc · trả phòng · thu tiền phòng/điện nước/cọc/hoàn cọc kèm ảnh chứng từ · bảng công nợ theo kỳ · sơ đồ lấp đầy.

### 2.8 Sổ thu – chi
Danh mục thu/chi tự định nghĩa · lập phiếu thu/phiếu chi (mã phiếu tự sinh, đối tượng, hình thức thanh toán, diễn giải, ảnh chứng từ) · lọc theo kỳ/loại/danh mục · báo cáo thu–chi–tồn · in phiếu · xuất CSV.

### 2.9 Thiết bị đăng nhập
Hàng chờ cảnh báo những lần đăng nhập bị chặn vì quá 2 thiết bị · xem thiết bị của từng học viên · gỡ thiết bị · đánh dấu đã xử lý. Dùng để chống chia sẻ tài khoản.

---

## 3. DỮ LIỆU KHÁCH CÓ TRONG HỆ THỐNG

### 3.1 Nội dung học — bàn giao sẵn, không phải nhập

| Loại | Khối lượng | Nơi lưu |
|---|---|---|
| Giáo trình Thời Đại | 5 quyển · 80 bài · 176 bài con (từ vựng, ngữ pháp, hội thoại, bài đọc thêm) | `public/data/giaotrinh/` |
| Đề luyện tập tổng hợp | Sinh sẵn theo từng bài/quyển, kèm đáp án | `public/data/luyentap/` |
| Từ vựng TOCFL | 7.517 từ, 6 cấp (Band A–C) | `public/data/tocfl/` |
| Đề thi thử TOCFL | 18 bộ đề · 1.600+ câu · Đọc hiểu + Nghe hiểu | `public/data/thi/` · bảng `exam_questions` |
| Từ điển Trung–Việt | 122.596 mục | `public/data/tudien/` |
| Bộ thủ & phân rã chữ | 214 bộ thủ, dữ liệu nét viết | `public/data/tudien/bothu.json` |
| Bảng phiên âm | 407 âm tiết | trong mã nguồn |
| Audio | ~200 MB: bản thu thật của giáo trình + audio đề thi + giọng máy | `public/audio/` |

> Giấy phép nguồn dữ liệu (CC BY-SA cho từ điển, Unicode/LGPL cho bộ thủ) ghi ở `public/data/tudien/GIAY-PHEP.md` — phải giữ ghi công.

### 3.2 Dữ liệu vận hành — trung tâm tự tạo trong quá trình dùng

| Nhóm | Dữ liệu lưu | Bảng chính |
|---|---|---|
| Tài khoản | Họ tên, email, điện thoại, vai trò, trạng thái xác thực/duyệt, avatar, điểm, cấp độ, chuỗi ngày, cài đặt chữ Phồn/Giản, bật/tắt mail nhắc | `users` |
| Thiết bị | Thiết bị đã đăng nhập, cảnh báo vượt hạn mức | `user_devices` · `device_alerts` |
| Lớp học | Lớp, mã mời, giáo viên phụ trách, danh sách học viên, buổi học, điểm danh | `classes` · `class_enrollments` · `class_sessions` · `class_attendance` |
| Bài cô giao | Bài tập gắn giáo trình, hạn nộp, lượt nhắc, trạng thái đã đọc, ghi chú học viên | `assignments` · `assignment_reminders` · `assignment_reads` · `student_notes` |
| Đề tự soạn | Đề, câu hỏi (kèm ảnh), lượt giao, bài làm, điểm và lời phê | `de_bai` · `de_cau_hoi` · `de_giao` · `de_bai_lam` |
| Kết quả học tập | Bài tập giáo trình đã làm, lượt thi thử + đáp án từng câu, thời gian học theo ngày/khu vực | `exercise_results` · `exam_results` · `exam_answers` · `study_activity` |
| Từ vựng cá nhân | Sổ tay từ + ghi chú, thẻ ôn ngắt quãng (SRS) với lịch đến hạn, mức thuộc | `notebook_words` · `srs_words` |
| Giáo viên | Hồ sơ giáo viên, ghi chú nội bộ, phiếu đánh giá | `teacher_notes` · `teacher_reviews` |
| Hồ sơ du học | Thông tin cá nhân, **CCCD · hộ chiếu · hạn hộ chiếu**, phụ huynh, học vấn, nguyện vọng trường/ngành, bước quy trình, lịch phỏng vấn/visa/bay, tổng phí | `du_hoc_ho_so` |
| Du học — phát sinh | Lịch sử thao tác, các đợt thu tiền + ảnh chứng từ, danh mục giấy tờ, yêu cầu sửa của học viên, thông báo | `du_hoc_lich_su` · `du_hoc_thu_tien` · `du_hoc_giay_to` · `du_hoc_yeu_cau_sua` · `du_hoc_thong_bao` |
| Ký túc xá | Toà nhà, phòng (giá, sức chứa, tiện ích), người ở, tiền cọc, các kỳ thu tiền + ảnh chứng từ | `ktx_toa` · `ktx_phong` · `ktx_o` · `ktx_thu_tien` |
| Sổ thu–chi | Danh mục thu/chi, phiếu thu/chi (mã phiếu, số tiền, đối tượng, hình thức, ảnh chứng từ) | `quy_danh_muc` · `quy_phieu` |

### 3.3 Lưu ý về dữ liệu

| Điều | Ý nghĩa với khách |
|---|---|
| Dữ liệu nhạy cảm | Hồ sơ du học chứa CCCD, hộ chiếu, thông tin tài chính. Server chặn giáo viên đọc khu này; không chỉ ẩn menu. |
| Ảnh chứng từ | Lưu thẳng trong DB dạng base64 (`MEDIUMTEXT`) — tiện sao lưu một lượt, nhưng DB phình theo số ảnh. Cần theo dõi dung lượng nếu thu tiền nhiều. |
| Mọi nội dung học đều mở | Không có bán khoá/khoá quyền: học viên được duyệt tài khoản là học được tất cả. |
| `org_id` luôn bằng 1 | Hệ thống dựng sẵn cho nhiều cơ sở nhưng bản này phát hành cho một trung tâm. |
| Bảng rỗng cố ý | `vocabulary`, `saved_words`, `user_vocabulary`, `translate_submissions` là di sản bản cũ, không dùng — đừng nhầm là mất dữ liệu. |
| Sao lưu | `npm run db:migrate:prod` tự sao lưu ra `backups/` trước khi chạy migration. |
