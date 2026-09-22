-- =============================================================
-- Nạp sẵn danh mục học bổng Đài Loan (2026-09-08)
-- =============================================================
-- Chủ dự án chốt: TÔI nạp tên + đơn vị cấp + link chính thức, CHỦ DỰ ÁN điền hạn nộp và mức
-- tiền qua màn quản lý trong app.
--
-- ⚠️ CỐ Ý ĐỂ TRỐNG `han_nop` và `gia_tri`. Hạn nộp và mức trợ cấp đổi mỗi năm; ghi một con số
--    "cho đủ" rồi để đó là dạng sai nguy hiểm nhất của trang này — người đọc lỡ kỳ nộp hồ sơ
--    vì tin vào nó. Giao diện hiện "chưa cập nhật — xem trang chính thức" cho tới khi có người
--    điền, và luôn kèm mốc `cap_nhat_luc`.
--
-- Mọi đường dẫn dưới đây đã được KIỂM bằng HTTP lúc soạn (2026-09-08), trừ trang của Văn phòng
-- Kinh tế Văn hoá Đài Bắc tại Việt Nam — trang đó chặn truy cập tự động (403) nhưng mở bằng
-- trình duyệt thì bình thường.

-- Khoá duy nhất theo tên để chạy lại migration không sinh bản trùng.
ALTER TABLE scholarships ADD UNIQUE KEY uk_ten (ten);

INSERT IGNORE INTO scholarships
  (ten, ten_goc, don_vi, cap_hoc, doi_tuong, yeu_cau_tieng, mo_ta, link, sort_order, cap_nhat_luc)
VALUES
('Học bổng Đài Loan (Taiwan Scholarship)',
 '臺灣獎學金 / Taiwan Scholarship',
 'Bộ Giáo dục Đài Loan (MOE)',
 'dai-hoc,thac-si,tien-si',
 'Sinh viên quốc tế học chương trình cấp bằng tại Đài Loan',
 'Yêu cầu tiếng Trung (TOCFL) hoặc tiếng Anh tuỳ chương trình',
 'Học bổng chính của Bộ Giáo dục Đài Loan cho bậc đại học, thạc sĩ và tiến sĩ. Hồ sơ nộp qua Văn phòng Kinh tế và Văn hoá Đài Bắc tại Việt Nam, thường mở vào đầu năm. Xem điều kiện, mức trợ cấp và hạn nộp của kỳ hiện hành trên trang chính thức.',
 'https://taiwanscholarship.moe.gov.tw/', 10, CURDATE()),

('Học bổng tiếng Hoa HES (Huayu Enrichment Scholarship)',
 '華語文獎學金 / Huayu Enrichment Scholarship',
 'Bộ Giáo dục Đài Loan (MOE)',
 'tieng',
 'Người học tiếng Trung tại các trung tâm Hoa ngữ trực thuộc đại học Đài Loan',
 'Không bắt buộc trình độ tiếng Trung đầu vào',
 'Dành riêng cho việc HỌC TIẾNG tại trung tâm Hoa ngữ của các trường đại học Đài Loan (MTC–NTNU, CLC–NCKU…). Phải đăng ký khoá học ở trung tâm trước, rồi mới nộp hồ sơ học bổng. Thời gian nhận học bổng theo kỳ, do MOE công bố hằng năm.',
 'https://taiwanscholarship.moe.gov.tw/', 20, CURDATE()),

('Học bổng TaiwanICDF',
 'TaiwanICDF International Higher Education Scholarship Program',
 'Quỹ Hợp tác và Phát triển Quốc tế Đài Loan (TaiwanICDF)',
 'dai-hoc,thac-si,tien-si',
 'Công dân các nước đối tác của Đài Loan, trong đó có Việt Nam',
 'Phần lớn chương trình dạy bằng tiếng Anh',
 'Học bổng toàn phần, phối hợp với các trường đại học Đài Loan, tập trung vào kỹ thuật, nông nghiệp, y tế công cộng và quản trị kinh doanh. Ứng viên nộp hồ sơ cho trường VÀ cho TaiwanICDF trong cùng kỳ tuyển.',
 'https://www.icdf.org.tw/wSite/ct?xItem=12505&ctNode=31562&mp=2', 30, CURDATE()),

('Taiwan Fellowship (học bổng nghiên cứu)',
 '臺灣獎助金 / Taiwan Fellowship',
 'Bộ Ngoại giao Đài Loan (MOFA)',
 'tien-si',
 'Giảng viên, nhà nghiên cứu, nghiên cứu sinh muốn sang Đài Loan nghiên cứu',
 'Tiếng Trung hoặc tiếng Anh tuỳ đề tài',
 'Tài trợ cho học giả nước ngoài sang Đài Loan nghiên cứu về Đài Loan, Trung Quốc đại lục và khu vực châu Á – Thái Bình Dương. Thời gian tài trợ theo tháng, do MOFA công bố từng kỳ.',
 'https://taiwanfellowship.ncl.edu.tw/eng/', 40, CURDATE()),

('Học bổng của từng trường đại học Đài Loan',
 'University Scholarships',
 'Từng trường đại học',
 'dai-hoc,thac-si,tien-si',
 'Sinh viên quốc tế nộp hồ sơ trực tiếp vào trường',
 'Tuỳ từng trường',
 'Ngoài học bổng cấp nhà nước, gần như trường nào cũng có học bổng riêng (miễn/giảm học phí, trợ cấp sinh hoạt, học bổng trợ giảng). Tra theo trường và theo ngành ở cổng Study in Taiwan của Bộ Giáo dục.',
 'https://www.studyintaiwan.org/', 50, CURDATE()),

('Nơi nộp hồ sơ tại Việt Nam',
 'Taipei Economic and Cultural Office in Vietnam',
 'Văn phòng Kinh tế và Văn hoá Đài Bắc tại Việt Nam',
 'tieng,dai-hoc,thac-si,tien-si',
 'Ứng viên Việt Nam',
 '',
 'Không phải một học bổng mà là ĐẦU MỐI: hồ sơ Taiwan Scholarship và Huayu Enrichment Scholarship của ứng viên Việt Nam nộp qua đây. Thông báo tuyển sinh từng năm, mẫu đơn và hạn nộp đều đăng trên trang này.',
 'https://www.roc-taiwan.org/vn_vi/', 60, CURDATE());
