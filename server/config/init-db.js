// Database initialization - Create tables + seed data
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Cấu hình TLS cho nhà cung cấp DB có quản lý (Aiven, TiDB...) — họ TỪ CHỐI kết nối không mã hoá,
 * nên thiếu khối này thì lệnh init dừng ngay ở bước bắt tay với lỗi khó đoán.
 * Bật khi `DB_SSL=true`; CA cert lấy từ biến `DB_CA_CERT` hoặc file `server/config/ca.pem`.
 */
function sslNeuCan() {
  if (process.env.DB_SSL !== 'true') return {};
  let ca;
  if (process.env.DB_CA_CERT) {
    ca = process.env.DB_CA_CERT.replace(/\\n/g, '\n');
  } else {
    try { ca = fs.readFileSync(path.join(__dirname, 'ca.pem')); } catch { /* để mysql2 dùng CA hệ thống */ }
  }
  return { ssl: { rejectUnauthorized: true, ...(ca ? { ca } : {}) } };
}

async function initDatabase() {
  // Connect WITHOUT database first to create it
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306'),
    charset: 'utf8mb4',
    ...sslNeuCan(),
  });

  const DB = process.env.DB_NAME || 'taiwan_diary';
  console.log(`\n🔧 Initializing database "${DB}"...\n`);

  // Create database
  await conn.query(`CREATE DATABASE IF NOT EXISTS \`${DB}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci`);
  await conn.query(`USE \`${DB}\``);

  // ========================================
  // DROP existing tables (for clean re-init)
  // ========================================
  await conn.query('SET FOREIGN_KEY_CHECKS = 0');
  const tables = [
    'de_bai_lam', 'de_giao', 'de_cau_hoi', 'de_bai',
    'ktx_thu_tien', 'ktx_o', 'ktx_phong', 'ktx_toa', 'quy_phieu', 'quy_danh_muc',
    'du_hoc_giay_to', 'du_hoc_thu_tien', 'du_hoc_lich_su', 'du_hoc_yeu_cau_sua',
    'du_hoc_thong_bao', 'du_hoc_ho_so',
    'device_alerts', 'user_devices',
    'schema_migrations', 'teacher_reviews', 'teacher_notes',
    'translate_submissions', 'student_notes', 'assignment_reads', 'assignment_reminders', 'assignments',
    'class_attendance', 'class_sessions', 'class_enrollments', 'classes', 'exercise_results',
    'user_vocabulary', 'srs_words', 'study_activity', 'notebook_words', 'saved_words',
    'exam_answers', 'exam_results', 'exam_questions',
    'vocabulary', 'users'
  ];
  for (const t of tables) {
    await conn.query(`DROP TABLE IF EXISTS \`${t}\``);
  }
  await conn.query('SET FOREIGN_KEY_CHECKS = 1');
  console.log('✅ Dropped existing tables');

  // ========================================
  // CREATE TABLES
  // ========================================

  // 1. Users
  await conn.query(`
    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      -- Hệ thống dựng sẵn cho nhiều cơ sở; bản này phát hành cho MỘT trung tâm nên cột luôn
      -- bằng 1. Giữ lại để các truy vấn có sẵn không phải viết lại nếu sau này tách cơ sở.
      org_id INT NOT NULL DEFAULT 1,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(20) DEFAULT NULL,
      password_hash VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE,
      -- Vai trò: 'admin' = quản trị trung tâm · 'ho_so' = quản lý hồ sơ · 'sale' = nhân viên
      -- kinh doanh · 'teacher' = giáo viên · 'student' = học viên.
      -- is_admin là cột cũ, vẫn được giữ đồng bộ (role='admin' tương đương is_admin=1) vì
      -- bảng xếp hạng, /auth/me và cổng đăng nhập admin đều đang đọc nó.
      -- ⚠️ Thêm vai trò mới thì thêm vào CUỐI enum: MySQL lưu theo chỉ số, chèn vào giữa là
      -- mọi bản ghi đã có trượt sang vai trò khác.
      role ENUM('student','teacher','sale','ho_so','admin') NOT NULL DEFAULT 'student',
      -- Ai đã tạo tài khoản này. NULL = tự đăng ký. Sale và quản lý hồ sơ chỉ sửa/xoá được
      -- tài khoản do chính mình tạo (xem server/middleware/roles.js).
      created_by INT DEFAULT NULL,
      avatar_letter CHAR(2) DEFAULT 'U',
      avatar_color VARCHAR(10) DEFAULT '#027AB3',
      level_label VARCHAR(50) DEFAULT 'Tân Sinh · Lv1',
      level_num INT DEFAULT 1,
      streak INT DEFAULT 0,
      longest_streak INT DEFAULT 0,
      points INT DEFAULT 0,
      last_active DATE DEFAULT NULL,
      char_mode ENUM('traditional','simplified') DEFAULT 'traditional',
      is_verified BOOLEAN DEFAULT FALSE,
      is_approved BOOLEAN DEFAULT FALSE,
      verification_token VARCHAR(100) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await conn.query('ALTER TABLE users ADD KEY idx_created_by (created_by)');
  await conn.query(
    'ALTER TABLE users ADD CONSTRAINT fk_users_created_by FOREIGN KEY (created_by) '
    + 'REFERENCES users(id) ON DELETE SET NULL');
  console.log('  ✅ Table: users');

  // 2. Vocabulary
  await conn.query(`
    CREATE TABLE vocabulary (
      id INT AUTO_INCREMENT PRIMARY KEY,
      hanzi VARCHAR(20) NOT NULL,
      simplified VARCHAR(20) NOT NULL,
      pinyin VARCHAR(100) NOT NULL,
      meaning VARCHAR(500) NOT NULL,
      level VARCHAR(20) NOT NULL,
      lesson VARCHAR(20) NOT NULL,
      category VARCHAR(50) DEFAULT '',
      example_hanzi VARCHAR(200) DEFAULT '',
      example_meaning VARCHAR(300) DEFAULT '',
      audio_url VARCHAR(255) DEFAULT NULL,
      stroke_count INT DEFAULT 0,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_level (level),
      INDEX idx_lesson (lesson),
      INDEX idx_sort (sort_order),
      FULLTEXT idx_search (hanzi, simplified, pinyin, meaning)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: vocabulary');

  // 3. User Vocabulary (SRS state)
  await conn.query(`
    CREATE TABLE user_vocabulary (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      vocabulary_id INT NOT NULL,
      ease_factor DECIMAL(4,2) DEFAULT 2.50,
      interval_days INT DEFAULT 0,
      repetitions INT DEFAULT 0,
      due_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_review DATETIME DEFAULT NULL,
      status ENUM('new','learning','review','mastered') DEFAULT 'new',
      total_reviews INT DEFAULT 0,
      correct_count INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uk_user_vocab (user_id, vocabulary_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id) ON DELETE CASCADE,
      INDEX idx_due (user_id, due_date),
      INDEX idx_status (user_id, status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: user_vocabulary');

  // 4. Saved Words
  await conn.query(`
    CREATE TABLE saved_words (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      vocabulary_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uk_user_saved (user_id, vocabulary_id),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (vocabulary_id) REFERENCES vocabulary(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: saved_words');

  // 4b. Sổ tay từ vựng khoá theo CHỮ HÁN (2026-09-08)
  // `saved_words` ở trên khoá ngoại vào `vocabulary(id)` nên chỉ lưu được 40 từ seed. Bảng này
  // khoá theo chính chữ Hán nên lưu được mọi từ ở mọi module. Xem migration-sotay.sql.
  await conn.query(`
    CREATE TABLE notebook_words (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      tu VARCHAR(32) NOT NULL,
      gian VARCHAR(32) DEFAULT NULL,
      pinyin VARCHAR(120) DEFAULT NULL,
      han_viet VARCHAR(120) DEFAULT NULL,
      nghia VARCHAR(500) DEFAULT NULL,
      nguon VARCHAR(40) DEFAULT NULL,
      ghi_chu VARCHAR(500) DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uk_user_tu (user_id, tu),
      KEY idx_user_time (user_id, created_at),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: notebook_words');

  // 4c. Nhịp đo hoạt động học + ôn tập ngắt quãng khoá theo chữ Hán (2026-09-08, xem 4.38).
  // `study_activity` là nguồn của chuỗi ngày TRUNG THỰC (trước đây chuỗi tăng ở route đăng
  // nhập, tức đếm ngày mở app chứ không phải ngày học) và của lịch nhiệt / giờ học theo khu vực.
  await conn.query(`
    CREATE TABLE study_activity (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      ngay DATE NOT NULL,
      khu_vuc VARCHAR(24) NOT NULL,
      giay INT NOT NULL DEFAULT 0,
      so_lan INT NOT NULL DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uk_user_ngay_khu (user_id, ngay, khu_vuc),
      KEY idx_user_ngay (user_id, ngay),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: study_activity');

  // `user_vocabulary` ở trên khoá ngoại vào `vocabulary(id)` nên chỉ ôn được 40 từ seed —
  // cùng bệnh với `saved_words`. Bảng này khoá theo chữ Hán nên ôn được mọi từ.
  await conn.query(`
    CREATE TABLE srs_words (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      tu VARCHAR(32) NOT NULL,
      gian VARCHAR(32) DEFAULT NULL,
      pinyin VARCHAR(120) DEFAULT NULL,
      han_viet VARCHAR(120) DEFAULT NULL,
      nghia VARCHAR(500) DEFAULT NULL,
      nguon VARCHAR(40) DEFAULT NULL,
      ease_factor DECIMAL(4,2) NOT NULL DEFAULT 2.50,
      interval_days INT NOT NULL DEFAULT 0,
      repetitions INT NOT NULL DEFAULT 0,
      due_date DATETIME DEFAULT CURRENT_TIMESTAMP,
      last_review DATETIME DEFAULT NULL,
      status ENUM('new','learning','review','mastered') NOT NULL DEFAULT 'new',
      total_reviews INT NOT NULL DEFAULT 0,
      correct_count INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uk_user_tu (user_id, tu),
      KEY idx_due (user_id, due_date),
      KEY idx_status (user_id, status),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: srs_words');


  // 5. Exam Questions
  await conn.query(`
    CREATE TABLE exam_questions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      type ENUM('reading','listening') NOT NULL,
      level VARCHAR(20) NOT NULL,
      passage TEXT DEFAULT NULL,
      audio_desc TEXT DEFAULT NULL,
      question TEXT NOT NULL,
      question_meaning VARCHAR(500) DEFAULT '',
      option_a VARCHAR(200) NOT NULL,
      option_b VARCHAR(200) NOT NULL,
      option_c VARCHAR(200) NOT NULL,
      option_d VARCHAR(200) NOT NULL,
      option_a_meaning VARCHAR(200) DEFAULT '',
      option_b_meaning VARCHAR(200) DEFAULT '',
      option_c_meaning VARCHAR(200) DEFAULT '',
      option_d_meaning VARCHAR(200) DEFAULT '',
      correct_option TINYINT NOT NULL COMMENT '0=A,1=B,2=C,3=D',
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_type_level (type, level),
      INDEX idx_sort (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: exam_questions');

  // 6. Exam Results
  await conn.query(`
    CREATE TABLE exam_results (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      skill VARCHAR(20) NOT NULL,
      total_questions INT NOT NULL,
      correct_answers INT NOT NULL,
      score_percent DECIMAL(5,2) NOT NULL,
      time_seconds INT DEFAULT 0,
      -- Lời phê của giáo viên cho lần thi này + mốc học viên đã đọc lời phê (chuông thông báo).
      -- 2026-08-27: 2 cột này đã được code dùng ở khắp nơi (admin lưu nhận xét, /api/exercise/notifications)
      -- nhưng chưa từng được khai báo trong schema -> DB production không có cột -> mọi thao tác
      -- lưu/đọc nhận xét đều lỗi 500. Đừng bỏ 2 cột này.
      teacher_review TEXT NULL,
      review_read_at DATETIME NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user_date (user_id, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: exam_results');

  // 7. Exam Answers (individual answers per exam)
  await conn.query(`
    CREATE TABLE exam_answers (
      id INT AUTO_INCREMENT PRIMARY KEY,
      exam_result_id INT NOT NULL,
      question_id INT NOT NULL,
      selected_option TINYINT NOT NULL,
      is_correct TINYINT(1) NOT NULL,
      FOREIGN KEY (exam_result_id) REFERENCES exam_results(id) ON DELETE CASCADE,
      FOREIGN KEY (question_id) REFERENCES exam_questions(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: exam_answers');




  // 11. Exercise Results (bài tập từ vựng Đương đại)
  await conn.query(`
    CREATE TABLE exercise_results (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      -- VARCHAR(20): đủ chỗ cho id bài giáo trình ('1.2', '5.1') VÀ namespace luyện phát âm
      -- ('pron:initials' = 13 ký tự, 'pron:finals' = 11 ký tự) — 2026-08-25: cột từng là VARCHAR(10),
      -- làm INSERT của luyện phát âm lỗi "Data too long" âm thầm (frontend chỉ console.warn), khiến bài
      -- phát âm KHÔNG BAO GIỜ lưu được vào DB dù code submit vẫn chạy đúng. Đừng thu hẹp lại cột này.
      lesson_id VARCHAR(32) NOT NULL COMMENT 'e.g. 1.2, 5.1, td2-5.1, pron:initials, onllang:5, game:wordpop:td5-16.3',
      total_questions INT NOT NULL,
      correct_answers INT NOT NULL,
      score_percent DECIMAL(5,2) NOT NULL,
      time_seconds INT DEFAULT 0,
      -- Snapshot chi tiết từng câu (câu hỏi/lựa chọn/đáp án đã chọn/đáp án đúng) để giáo viên xem lại
      -- đúng-sai từng câu trong Quản lý lớp (2026-08-25). NULL với các bản ghi cũ trước khi có cột này.
      details_json LONGTEXT NULL,
      -- Lời phê của giáo viên + mốc học viên đã đọc (xem ghi chú ở bảng exam_results phía trên).
      teacher_review TEXT NULL,
      review_read_at DATETIME NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user_lesson (user_id, lesson_id),
      INDEX idx_created (created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: exercise_results');

  // 12. Classes (lớp học để giáo viên quản lý)
  await conn.query(`
    CREATE TABLE classes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      org_id INT NOT NULL DEFAULT 1,
      name VARCHAR(100) NOT NULL,
      description VARCHAR(500) DEFAULT '',
      -- teacher_id để NULL được + ON DELETE SET NULL (2026-08-27).
      -- TRƯỚC ĐÂY là NOT NULL + ON DELETE CASCADE: xoá 1 tài khoản giáo viên sẽ XOÁ LUÔN mọi lớp
      -- của người đó, kéo theo cascade tiếp sang class_sessions và class_attendance — mất sạch dữ liệu
      -- điểm danh của cả lớp chỉ vì dọn một tài khoản. Giờ xoá giáo viên thì lớp vẫn còn, chỉ mất
      -- người phụ trách và có thể gán lại. ĐỪNG đổi ngược về CASCADE.
      teacher_id INT NULL,
      invite_code VARCHAR(20) NOT NULL UNIQUE,
      is_active BOOLEAN DEFAULT TRUE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: classes');

  // 13. Class Enrollments (học sinh thuộc lớp nào)
  await conn.query(`
    CREATE TABLE class_enrollments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      class_id INT NOT NULL,
      user_id INT NOT NULL,
      enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uk_class_user (class_id, user_id),
      FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: class_enrollments');

  // 14. Class Sessions (buổi học của 1 lớp)
  await conn.query(`
    CREATE TABLE class_sessions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      class_id INT NOT NULL,
      session_date DATE DEFAULT NULL,
      topic VARCHAR(200) DEFAULT '',
      course_type VARCHAR(50) DEFAULT '',
      notes VARCHAR(500) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
      INDEX idx_class_date (class_id, session_date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: class_sessions');

  // 15. Class Attendance (điểm danh học sinh theo buổi)
  await conn.query(`
    CREATE TABLE class_attendance (
      id INT AUTO_INCREMENT PRIMARY KEY,
      session_id INT NOT NULL,
      user_id INT NOT NULL,
      status ENUM('present','absent') NOT NULL DEFAULT 'present',
      is_late BOOLEAN DEFAULT FALSE,
      is_left_early BOOLEAN DEFAULT FALSE,
      teacher_note VARCHAR(500) DEFAULT '',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uk_session_user (session_id, user_id),
      FOREIGN KEY (session_id) REFERENCES class_sessions(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: class_attendance');

  // 16. Assignments (bài tập giáo viên GIAO cho lớp, có hạn nộp)
  // Trước đây hệ thống chỉ GHI LẠI bài học sinh tự làm, giáo viên không giao bài được — nên
  // "chưa làm bài" chỉ là suy đoán chứ không phải "không làm bài cô giao". Bảng này lấp chỗ đó.
  // lesson_id dùng CHUNG hệ quy ước với exercise_results ('5.2', 'pron:finals'...) để đối chiếu
  // "đã nộp hay chưa" chỉ bằng một phép JOIN, không cần bảng nộp bài riêng.
  await conn.query(`
    CREATE TABLE assignments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      class_id INT NOT NULL,
      lesson_id VARCHAR(32) NOT NULL COMMENT 'khớp exercise_results.lesson_id: 5.2, td2-5.1, pron:finals...',
      exercise_type VARCHAR(30) NOT NULL DEFAULT 'bai-tap' COMMENT 'bai-tap | translate',
      title VARCHAR(200) DEFAULT '',
      due_date DATE NULL,
      note VARCHAR(500) DEFAULT '',
      created_by INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      -- updated_at bump mỗi lần giao lại / sửa hạn nộp -> thông báo nổi lại thành chưa đọc.
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      -- Giáo trình và Dịch Trung-Việt dùng CHUNG cách đánh số bài (5.2, 8.1...) nên khoá phải
      -- có exercise_type — thiếu nó thì giao "Dịch bài 5.2" khi lớp đã có "Giáo trình bài 5.2"
      -- sẽ đụng khoá và ghi đè nhầm lên bài kia (xem migration-translate-submissions.sql).
      UNIQUE KEY uk_class_lesson_type (class_id, lesson_id, exercise_type),
      FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE CASCADE,
      FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_due (due_date)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: assignments');

  // 17. Assignment reminders (đã nhắc em nào, bài nào — để không gửi trùng mail)
  await conn.query(`
    CREATE TABLE assignment_reminders (
      id INT AUTO_INCREMENT PRIMARY KEY,
      assignment_id INT NOT NULL,
      user_id INT NOT NULL,
      sent_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uk_assignment_user (assignment_id, user_id),
      FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: assignment_reminders');

  // 17b. Assignment reads (em nào đã XEM thông báo bài giao — khác hẳn assignment_reminders
  // vốn ghi "đã gửi mail nhắc"). Chưa đọc = không có dòng, hoặc read_at < assignments.updated_at.
  await conn.query(`
    CREATE TABLE assignment_reads (
      id INT AUTO_INCREMENT PRIMARY KEY,
      assignment_id INT NOT NULL,
      user_id INT NOT NULL,
      read_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uk_assignment_user (assignment_id, user_id),
      FOREIGN KEY (assignment_id) REFERENCES assignments(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: assignment_reads');

  // 18. Student notes (sổ nhận xét học viên theo thời gian, tách khỏi nhận xét từng buổi điểm danh)
  await conn.query(`
    CREATE TABLE student_notes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      class_id INT NULL,
      author_id INT NULL,
      note TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      FOREIGN KEY (class_id) REFERENCES classes(id) ON DELETE SET NULL,
      FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL,
      INDEX idx_user_created (user_id, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: student_notes');

  // Bài dịch của học viên. Tab "Dịch Trung-Việt" không có trong bản này nên bảng luôn rỗng —
  // giữ lại vì vài truy vấn thống kê (lo-trinh, admin) tra EXISTS vào đây; bỏ bảng thì phải
  // sửa 10 câu SQL lồng nhau chỉ để đổi một kết quả vốn đã luôn là "chưa nộp".
  await conn.query(`
    CREATE TABLE translate_submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      lesson_id VARCHAR(32) NOT NULL,
      mode VARCHAR(10) NOT NULL DEFAULT 'zh-vi',
      answers_json JSON NULL,
      auto_score INT NULL,
      teacher_score INT NULL,
      teacher_comment TEXT NULL,
      reviewed_at DATETIME NULL,
      reviewed_by INT NULL,
      submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_user_lesson (user_id, lesson_id),
      INDEX idx_lesson (lesson_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: translate_submissions');

  // Đánh giá giáo viên — 3 lớp tách bạch: chỉ số tự động (tính từ dữ liệu dạy học), sổ nhận xét
  // (ghi tự do theo thời gian) và phiếu chấm 5 tiêu chí theo kỳ. Mỗi tiêu chí một CỘT riêng chứ
  // không phải JSON, để so sánh giữa các kỳ / giáo viên bằng SQL.
  await conn.query(`
    CREATE TABLE teacher_notes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      teacher_id INT NOT NULL,
      noi_dung TEXT NOT NULL,
      nguoi_ghi INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE,
      INDEX idx_teacher (teacher_id, created_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await conn.query(`
    CREATE TABLE teacher_reviews (
      id INT AUTO_INCREMENT PRIMARY KEY,
      teacher_id INT NOT NULL,
      ky VARCHAR(7) NOT NULL COMMENT 'YYYY-MM',
      diem_chuyen_can TINYINT NULL,
      diem_bai_giang TINYINT NULL,
      diem_theo_sat TINYINT NULL,
      diem_phan_hoi TINYINT NULL,
      diem_ket_qua TINYINT NULL,
      nhan_xet TEXT NULL,
      nguoi_cham INT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uq_teacher_ky (teacher_id, ky),
      FOREIGN KEY (teacher_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Tables: teacher_notes, teacher_reviews');


  // ========================================
  // GHI NHẬN MIGRATION ĐÃ BAO GỒM
  // ========================================
  // File này là NGUỒN SỰ THẬT của schema (xem README), nên mọi migration cũ chỉ còn giá trị
  // lịch sử: bảng/cột chúng thêm đã nằm sẵn trong các CREATE TABLE bên trên. Đánh dấu chúng
  // "đã chạy" ngay tại đây để `npm run db:migrate:local` sau đó chỉ chạy phần thật sự còn
  // thiếu (du học, sổ thu chi, ký túc xá, đề bài, thiết bị…) thay vì chết vì cột trùng tên.
  await conn.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      id INT AUTO_INCREMENT PRIMARY KEY,
      filename VARCHAR(191) NOT NULL UNIQUE,
      checksum CHAR(64) NOT NULL,
      applied_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  const daBaoGom = [
    'migration-classes-attendance.sql', 'migration-classes-teacher-fk.sql',
    'migration-exercise-results-detail.sql', 'migration-teacher-review.sql',
    'migration-assignments-notes.sql', 'migration-teacher-role.sql',
    'migration-assignment-reads.sql', 'migration-translate-submissions.sql',
    'migration-thoidai.sql', 'migration-sotay.sql', 'migration-lo-trinh.sql',
  ];
  const { createHash } = await import('node:crypto');
  const { readFileSync, existsSync } = await import('node:fs');
  const { dirname, join } = await import('node:path');
  const { fileURLToPath } = await import('node:url');
  const thuMuc = dirname(fileURLToPath(import.meta.url));
  for (const f of daBaoGom) {
    const duong = join(thuMuc, f);
    const sum = existsSync(duong)
      ? createHash('sha256').update(readFileSync(duong)).digest('hex')
      : createHash('sha256').update(f).digest('hex');
    await conn.query(
      'INSERT IGNORE INTO schema_migrations (filename, checksum) VALUES (?,?)', [f, sum]);
  }
  console.log(`  ✅ Ghi nhận ${daBaoGom.length} migration đã nằm sẵn trong file này`);

  // ========================================
  // SEED DATA
  // ========================================
  console.log('\n📦 Seeding data...\n');

  // Tài khoản quản trị đầu tiên. ĐỔI MẬT KHẨU NGAY sau lần đăng nhập đầu — mật khẩu này nằm
  // trong mã nguồn nên ai đọc repo cũng biết.
  const matKhauAdmin = process.env.ADMIN_PASSWORD || 'ITaiwan@2026';
  const emailAdmin = process.env.ADMIN_EMAIL || 'admin@itaiwan.vn';
  const demoHash = await bcrypt.hash(matKhauAdmin, 10);
  const users = [
    ['Quản trị viên', emailAdmin, '', demoHash, true, 'admin', 'A', '#1E4E9C', 'Quản trị viên', 99, 0, 0, 0, true, true, null],
  ];
  for (const u of users) {
    await conn.query(
      `INSERT INTO users (name, email, phone, password_hash, is_admin, role, avatar_letter, avatar_color, level_label, level_num, streak, longest_streak, points, is_verified, is_approved, verification_token) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      u
    );
  }
  console.log(`  ✅ Seeded ${users.length} users`);

  
  
  
  
  console.log('\n✅ Database initialization complete!\n');
  console.log(`📌 Đăng nhập quản trị: ${emailAdmin} / ${matKhauAdmin}`);
  console.log('   ⚠️  Đổi mật khẩu ngay sau lần đăng nhập đầu tiên.\n');

  await conn.end();
  process.exit(0);
}

initDatabase().catch(err => {
  console.error('❌ Database initialization failed:', err);
  process.exit(1);
});
