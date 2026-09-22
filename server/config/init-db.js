// Database initialization - Create tables + seed data
import mysql from 'mysql2/promise';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
dotenv.config();

async function initDatabase() {
  // Connect WITHOUT database first to create it
  const conn = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    port: parseInt(process.env.DB_PORT || '3306'),
    charset: 'utf8mb4',
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
    'student_notes', 'assignment_reads', 'assignment_reminders', 'assignments',
    'class_attendance', 'class_sessions', 'class_enrollments', 'classes', 'exercise_results',
    'community_reports', 'community_likes', 'community_comments', 'community_posts', 'scholarships',
    'user_vocabulary', 'srs_words', 'study_activity', 'notebook_words', 'saved_words', 'exam_answers', 'exam_results',
    'dialogue_lines', 'dialogues', 'exam_questions',
    'vocabulary', 'users', 'blog_posts'
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
      name VARCHAR(100) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      phone VARCHAR(20) DEFAULT NULL,
      password_hash VARCHAR(255) NOT NULL,
      is_admin BOOLEAN DEFAULT FALSE,
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

  // 4d. Khu Cộng đồng (2026-09-08, xem 4.39). MỘT bộ máy bài viết cho 4 loại nội dung
  // (thao-luan · bai-viet · vlog · tin-tuc) nên bình luận/thích/báo cáo chỉ viết một lần.
  await conn.query(`
    CREATE TABLE community_posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT DEFAULT NULL,
      loai ENUM('thao-luan','bai-viet','vlog','tin-tuc') NOT NULL DEFAULT 'thao-luan',
      tieu_de VARCHAR(300) NOT NULL,
      tom_tat VARCHAR(600) DEFAULT NULL,
      noi_dung LONGTEXT DEFAULT NULL,
      chu_de VARCHAR(40) DEFAULT NULL,
      video_nguon VARCHAR(20) DEFAULT NULL,
      video_id VARCHAR(160) DEFAULT NULL,
      video_url VARCHAR(500) DEFAULT NULL,
      anh_bia VARCHAR(500) DEFAULT NULL,
      emoji VARCHAR(10) DEFAULT NULL,
      trang_thai ENUM('hien','an') NOT NULL DEFAULT 'hien',
      co_canh_bao TINYINT NOT NULL DEFAULT 0,
      ly_do_co VARCHAR(300) DEFAULT NULL,
      ghim TINYINT NOT NULL DEFAULT 0,
      chinh_thuc TINYINT NOT NULL DEFAULT 0,
      so_xem INT NOT NULL DEFAULT 0,
      so_thich INT NOT NULL DEFAULT 0,
      so_binh_luan INT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      KEY idx_loai (loai, trang_thai, created_at),
      KEY idx_ghim (loai, ghim, created_at),
      KEY idx_co (co_canh_bao, trang_thai),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await conn.query(`
    CREATE TABLE community_comments (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT NOT NULL,
      user_id INT NOT NULL,
      parent_id INT DEFAULT NULL,
      noi_dung VARCHAR(2000) NOT NULL,
      trang_thai ENUM('hien','an') NOT NULL DEFAULT 'hien',
      co_canh_bao TINYINT NOT NULL DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      KEY idx_post (post_id, trang_thai, created_at),
      FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await conn.query(`
    CREATE TABLE community_likes (
      post_id INT NOT NULL, user_id INT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (post_id, user_id),
      FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await conn.query(`
    CREATE TABLE community_reports (
      id INT AUTO_INCREMENT PRIMARY KEY,
      post_id INT DEFAULT NULL, comment_id INT DEFAULT NULL, user_id INT NOT NULL,
      ly_do VARCHAR(300) DEFAULT NULL,
      trang_thai ENUM('moi','da-xu-ly') NOT NULL DEFAULT 'moi',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE KEY uk_bao_cao (user_id, post_id, comment_id),
      FOREIGN KEY (post_id) REFERENCES community_posts(id) ON DELETE CASCADE,
      FOREIGN KEY (comment_id) REFERENCES community_comments(id) ON DELETE CASCADE,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  await conn.query(`
    CREATE TABLE scholarships (
      id INT AUTO_INCREMENT PRIMARY KEY,
      ten VARCHAR(300) NOT NULL, ten_goc VARCHAR(300) DEFAULT NULL,
      don_vi VARCHAR(200) DEFAULT NULL, cap_hoc VARCHAR(120) DEFAULT NULL,
      gia_tri VARCHAR(300) DEFAULT NULL, han_nop VARCHAR(160) DEFAULT NULL,
      yeu_cau_tieng VARCHAR(200) DEFAULT NULL, doi_tuong VARCHAR(300) DEFAULT NULL,
      mo_ta TEXT DEFAULT NULL, link VARCHAR(500) DEFAULT NULL,
      trang_thai ENUM('hien','an') NOT NULL DEFAULT 'hien',
      sort_order INT NOT NULL DEFAULT 0, cap_nhat_luc DATE DEFAULT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      UNIQUE KEY uk_ten (ten), KEY idx_hien (trang_thai, sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Tables: community_posts, community_comments, community_likes, community_reports, scholarships');

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

  // 8. Dialogues
  await conn.query(`
    CREATE TABLE dialogues (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(200) NOT NULL,
      title_cn VARCHAR(200) NOT NULL,
      level VARCHAR(20) NOT NULL,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: dialogues');

  // 9. Dialogue Lines
  await conn.query(`
    CREATE TABLE dialogue_lines (
      id INT AUTO_INCREMENT PRIMARY KEY,
      dialogue_id INT NOT NULL,
      line_order INT NOT NULL,
      speaker CHAR(1) NOT NULL,
      speaker_name VARCHAR(20) NOT NULL,
      hanzi TEXT NOT NULL,
      pinyin TEXT NOT NULL,
      meaning TEXT NOT NULL,
      FOREIGN KEY (dialogue_id) REFERENCES dialogues(id) ON DELETE CASCADE,
      INDEX idx_dialogue (dialogue_id, line_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: dialogue_lines');

  // 10. Blog Posts
  await conn.query(`
    CREATE TABLE blog_posts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(300) NOT NULL,
      excerpt TEXT DEFAULT NULL,
      content LONGTEXT DEFAULT NULL,
      category VARCHAR(50) DEFAULT '',
      emoji VARCHAR(10) DEFAULT '📝',
      published_at DATE DEFAULT NULL,
      sort_order INT DEFAULT 0,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_sort (sort_order)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: blog_posts');

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

  // 19. Translate submissions (học viên tự dịch, nộp bài, giáo viên chấm điểm — 4.21b/4.22)
  // Append-only như exercise_results: làm lại nhiều lần ghi bản mới, không UPDATE đè
  // (không có UNIQUE(user_id, lesson_id, mode) — nơi đọc luôn lấy bản MỚI NHẤT).
  await conn.query(`
    CREATE TABLE translate_submissions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      lesson_id VARCHAR(32) NOT NULL COMMENT 'e.g. 1.1, 3.2 (chỉ Đương đại — Thời Đại chưa có bài dịch)',
      mode ENUM('vi-zh','zh-vi') NOT NULL DEFAULT 'vi-zh',
      answers_json LONGTEXT NOT NULL COMMENT 'JSON array: [{idx, q, studentAnswer}]',
      auto_score TINYINT UNSIGNED COMMENT 'Điểm tự chấm sơ bộ 0-100 (so sánh với đáp án mẫu)',
      submitted_at DATETIME DEFAULT NOW(),
      teacher_score TINYINT UNSIGNED COMMENT 'Điểm giáo viên chỉnh 0-100, NULL = chưa chấm',
      teacher_comment TEXT,
      reviewed_at DATETIME,
      reviewed_by INT,
      INDEX idx_ts_lesson (lesson_id),
      INDEX idx_ts_user (user_id),
      INDEX idx_ts_pending (teacher_score, submitted_at),
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci
  `);
  console.log('  ✅ Table: translate_submissions');

  // ========================================
  // SEED DATA
  // ========================================
  console.log('\n📦 Seeding data...\n');

  const demoHash = await bcrypt.hash('12345678', 10);
  const users = [
    ['Admin', 'buituananh106963007@gmail.com', '0912345678', demoHash, true, 'A', '#027AB3', 'Quản trị viên', 99, 99, 99, 9999, true, true, null],
  ];
  for (const u of users) {
    await conn.query(
      `INSERT INTO users (name, email, phone, password_hash, is_admin, avatar_letter, avatar_color, level_label, level_num, streak, longest_streak, points, is_verified, is_approved, verification_token) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      u
    );
  }
  console.log(`  ✅ Seeded ${users.length} users (Admin password: 12345678)`);

  // -- Seed Vocabulary --
  const vocab = [
    ['你好','你好','nǐ hǎo','Xin chào','TOCFL 1','Bài 1','Chào hỏi','你好，我是小明。','Xin chào, tôi là Tiểu Minh.'],
    ['謝謝','谢谢','xiè xie','Cảm ơn','TOCFL 1','Bài 1','Chào hỏi','謝謝你的幫助。','Cảm ơn sự giúp đỡ của bạn.'],
    ['再見','再见','zài jiàn','Tạm biệt','TOCFL 1','Bài 1','Chào hỏi','明天再見！','Ngày mai gặp lại!'],
    ['對不起','对不起','duì bu qǐ','Xin lỗi','TOCFL 1','Bài 1','Chào hỏi','對不起，我遲到了。','Xin lỗi, tôi đến muộn rồi.'],
    ['沒關係','没关系','méi guān xi','Không sao','TOCFL 1','Bài 1','Chào hỏi','沒關係，別擔心。','Không sao, đừng lo lắng.'],
    ['學生','学生','xué shēng','Học sinh, sinh viên','TOCFL 1','Bài 2','Nghề nghiệp','我是大學生。','Tôi là sinh viên đại học.'],
    ['老師','老师','lǎo shī','Giáo viên, thầy cô','TOCFL 1','Bài 2','Nghề nghiệp','他是我的中文老師。','Anh ấy là giáo viên tiếng Trung của tôi.'],
    ['朋友','朋友','péng yǒu','Bạn bè','TOCFL 1','Bài 2','Quan hệ','她是我最好的朋友。','Cô ấy là bạn thân nhất của tôi.'],
    ['家','家','jiā','Nhà, gia đình','TOCFL 1','Bài 3','Gia đình','我家有五個人。','Gia đình tôi có năm người.'],
    ['吃飯','吃饭','chī fàn','Ăn cơm, ăn','TOCFL 1','Bài 3','Ăn uống','你吃飯了嗎？','Bạn ăn cơm chưa?'],
    ['喝水','喝水','hē shuǐ','Uống nước','TOCFL 1','Bài 3','Ăn uống','請喝水。','Mời uống nước.'],
    ['書','书','shū','Sách','TOCFL 1','Bài 4','Học tập','這本書很好看。','Cuốn sách này rất hay.'],
    ['寫','写','xiě','Viết','TOCFL 1','Bài 4','Học tập','請寫你的名字。','Hãy viết tên của bạn.'],
    ['看','看','kàn','Xem, nhìn','TOCFL 1','Bài 4','Học tập','我喜歡看電影。','Tôi thích xem phim.'],
    ['說','说','shuō','Nói','TOCFL 1','Bài 4','Học tập','他會說中文。','Anh ấy biết nói tiếng Trung.'],
    ['聽','听','tīng','Nghe','TOCFL 1','Bài 4','Học tập','請聽老師說話。','Hãy nghe thầy nói.'],
    ['大','大','dà','Lớn, to','TOCFL 1','Bài 5','Tính từ','這個房間很大。','Căn phòng này rất lớn.'],
    ['小','小','xiǎo','Nhỏ, bé','TOCFL 1','Bài 5','Tính từ','我有一隻小狗。','Tôi có một con chó nhỏ.'],
    ['好','好','hǎo','Tốt, đẹp','TOCFL 1','Bài 5','Tính từ','今天天氣很好。','Hôm nay thời tiết rất đẹp.'],
    ['漂亮','漂亮','piào liang','Đẹp, xinh','TOCFL 1','Bài 5','Tính từ','她穿的衣服很漂亮。','Quần áo cô ấy mặc rất đẹp.'],
    ['今天','今天','jīn tiān','Hôm nay','TOCFL 1','Bài 6','Thời gian','今天是星期一。','Hôm nay là thứ Hai.'],
    ['明天','明天','míng tiān','Ngày mai','TOCFL 1','Bài 6','Thời gian','明天我們去公園。','Ngày mai chúng ta đi công viên.'],
    ['昨天','昨天','zuó tiān','Hôm qua','TOCFL 1','Bài 6','Thời gian','昨天下雨了。','Hôm qua trời mưa.'],
    ['工作','工作','gōng zuò','Công việc, làm việc','TOCFL 2','Bài 7','Nghề nghiệp','我每天工作八個小時。','Tôi làm việc 8 tiếng mỗi ngày.'],
    ['學習','学习','xué xí','Học tập','TOCFL 2','Bài 7','Học tập','他在大學學習中文。','Anh ấy học tiếng Trung ở đại học.'],
    ['考試','考试','kǎo shì','Thi cử, kỳ thi','TOCFL 2','Bài 7','Học tập','下星期有中文考試。','Tuần sau có thi tiếng Trung.'],
    ['醫院','医院','yī yuàn','Bệnh viện','TOCFL 2','Bài 8','Địa điểm','他在醫院工作。','Anh ấy làm việc ở bệnh viện.'],
    ['圖書館','图书馆','tú shū guǎn','Thư viện','TOCFL 2','Bài 8','Địa điểm','我們去圖書館念書。','Chúng ta đi thư viện đọc sách.'],
    ['機場','机场','jī chǎng','Sân bay','TOCFL 2','Bài 8','Giao thông','我們要去機場接他。','Chúng ta phải ra sân bay đón anh ấy.'],
    ['臺灣','台湾','Tái wān','Đài Loan','TOCFL 2','Bài 9','Địa danh','臺灣是一個美麗的島嶼。','Đài Loan là một hòn đảo xinh đẹp.'],
    ['越南','越南','Yuè nán','Việt Nam','TOCFL 2','Bài 9','Địa danh','我從越南來。','Tôi đến từ Việt Nam.'],
    ['電腦','电脑','diàn nǎo','Máy tính','TOCFL 2','Bài 10','Công nghệ','我需要一臺新電腦。','Tôi cần một chiếc máy tính mới.'],
    ['手機','手机','shǒu jī','Điện thoại di động','TOCFL 2','Bài 10','Công nghệ','他的手機很貴。','Điện thoại của anh ấy rất đắt.'],
    ['快樂','快乐','kuài lè','Vui vẻ, hạnh phúc','TOCFL 2','Bài 11','Cảm xúc','祝你生日快樂！','Chúc mừng sinh nhật vui vẻ!'],
    ['認真','认真','rèn zhēn','Nghiêm túc, chăm chỉ','TOCFL 2','Bài 11','Tính từ','他學習很認真。','Anh ấy học tập rất nghiêm túc.'],
    ['練習','练习','liàn xí','Luyện tập','TOCFL 2','Bài 12','Học tập','你要多練習寫字。','Bạn cần luyện viết chữ nhiều hơn.'],
    ['準備','准备','zhǔn bèi','Chuẩn bị','TOCFL 2','Bài 12','Hành động','我在準備明天的考試。','Tôi đang chuẩn bị cho kỳ thi ngày mai.'],
    ['問題','问题','wèn tí','Câu hỏi, vấn đề','TOCFL 2','Bài 12','Học tập','你有什麼問題嗎？','Bạn có câu hỏi gì không?'],
    ['經驗','经验','jīng yàn','Kinh nghiệm','TOCFL 3','Bài 13','Nghề nghiệp','他有很多教學經驗。','Anh ấy có nhiều kinh nghiệm giảng dạy.'],
    ['環境','环境','huán jìng','Môi trường','TOCFL 3','Bài 13','Xã hội','我們要保護環境。','Chúng ta phải bảo vệ môi trường.'],
  ];
  for (const v of vocab) {
    await conn.query(
      `INSERT INTO vocabulary (hanzi, simplified, pinyin, meaning, level, lesson, category, example_hanzi, example_meaning) VALUES (?,?,?,?,?,?,?,?,?)`,
      v
    );
  }
  console.log(`  ✅ Seeded ${vocab.length} vocabulary words`);

  // -- Seed Exam Questions --
  const examQs = [
    ['reading','Band A','小明每天早上七點起床，先吃早餐，然後八點去學校。他最喜歡的課是中文課，因為他想學好中文。',null,'小明每天幾點起床？','Tiểu Minh mỗi ngày mấy giờ thức dậy?','六點','七點','八點','九點','6 giờ','7 giờ','8 giờ','9 giờ',1],
    ['reading','Band A','我家在臺北，離學校不遠。我每天坐公車去上學，大概二十分鐘就到了。',null,'他怎麼去上學？','Anh ấy đi học bằng cách nào?','走路','坐公車','騎腳踏車','坐捷運','Đi bộ','Đi xe buýt','Đi xe đạp','Đi MRT',1],
    ['reading','Band A','今天天氣很好，我和朋友去公園散步。公園裡有很多花，非常漂亮。',null,'今天天氣怎麼樣？','Hôm nay thời tiết thế nào?','下雨','很好','很冷','颱風','Mưa','Rất đẹp','Rất lạnh','Bão',1],
    ['reading','Band B','臺灣的夜市非常有名。你可以在夜市吃到很多好吃的小吃，像是臭豆腐、珍珠奶茶、雞排等等。每到週末，夜市總是擠滿了人。',null,'文章主要在介紹什麼？','Bài viết chủ yếu giới thiệu gì?','臺灣的學校','臺灣的夜市','臺灣的天氣','臺灣的交通','Trường học Đài Loan','Chợ đêm Đài Loan','Thời tiết Đài Loan','Giao thông Đài Loan',1],
    ['reading','Band B','學中文最重要的是每天練習。你可以每天看中文新聞、聽中文歌，也可以跟臺灣朋友用中文聊天。這樣你的中文一定會進步很快。',null,'文章建議學中文要怎麼做？','Bài viết khuyên học tiếng Trung nên làm gì?','只看書就好','每天練習','只考試','不用練習','Chỉ cần đọc sách','Luyện tập mỗi ngày','Chỉ cần thi','Không cần luyện tập',1],
    ['listening','Band A',null,'🔊 Một người nói: "我想買一杯咖啡。"','他想做什麼？','Anh ấy muốn làm gì?','買東西','買咖啡','喝水','吃飯','Mua đồ','Mua cà phê','Uống nước','Ăn cơm',1],
    ['listening','Band A',null,'🔊 Hội thoại: A: "你去哪裡？" B: "我去圖書館。"','B要去哪裡？','B muốn đi đâu?','學校','公園','圖書館','超市','Trường học','Công viên','Thư viện','Siêu thị',2],
    ['listening','Band A',null,'🔊 Thông báo: "各位旅客，往臺北的火車即將到達。"','火車要去哪裡？','Tàu hỏa đi đâu?','高雄','臺北','臺中','花蓮','Cao Hùng','Đài Bắc','Đài Trung','Hoa Liên',1],
  ];
  for (const q of examQs) {
    await conn.query(
      `INSERT INTO exam_questions (type, level, passage, audio_desc, question, question_meaning, option_a, option_b, option_c, option_d, option_a_meaning, option_b_meaning, option_c_meaning, option_d_meaning, correct_option) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      q
    );
  }
  console.log(`  ✅ Seeded ${examQs.length} exam questions`);

  // -- Seed Dialogues --
  const dialogues = [
    ['Gặp mặt lần đầu', '第一次見面', 'TOCFL 1', 1],
    ['Đi ăn cơm', '去吃飯', 'TOCFL 1', 2],
    ['Đi mua sắm', '去買東西', 'TOCFL 2', 3],
  ];
  for (const d of dialogues) {
    await conn.query(`INSERT INTO dialogues (title, title_cn, level, sort_order) VALUES (?,?,?,?)`, d);
  }

  const dlgLines = [
    // Dialogue 1
    [1,1,'A','小明','你好！我叫小明。','Nǐ hǎo! Wǒ jiào Xiǎo Míng.','Xin chào! Tôi tên Tiểu Minh.'],
    [1,2,'B','小美','你好！我叫小美。很高興認識你。','Nǐ hǎo! Wǒ jiào Xiǎo Měi. Hěn gāo xìng rèn shì nǐ.','Xin chào! Tôi tên Tiểu Mỹ. Rất vui được biết bạn.'],
    [1,3,'A','小明','你是哪裡人？','Nǐ shì nǎ lǐ rén?','Bạn là người ở đâu?'],
    [1,4,'B','小美','我是越南人。你呢？','Wǒ shì Yuènán rén. Nǐ ne?','Tôi là người Việt Nam. Còn bạn?'],
    [1,5,'A','小明','我是臺灣人。你來臺灣做什麼？','Wǒ shì Táiwān rén. Nǐ lái Táiwān zuò shénme?','Tôi là người Đài Loan. Bạn đến Đài Loan làm gì?'],
    [1,6,'B','小美','我來臺灣學中文。','Wǒ lái Táiwān xué Zhōngwén.','Tôi đến Đài Loan học tiếng Trung.'],
    [1,7,'A','小明','太好了！歡迎來臺灣！','Tài hǎo le! Huānyíng lái Táiwān!','Tuyệt quá! Chào mừng đến Đài Loan!'],
    // Dialogue 2
    [2,1,'A','小明','你吃飯了嗎？','Nǐ chī fàn le ma?','Bạn ăn cơm chưa?'],
    [2,2,'B','小美','還沒，你呢？','Hái méi, nǐ ne?','Chưa, còn bạn?'],
    [2,3,'A','小明','我也還沒。我們一起去吃飯吧！','Wǒ yě hái méi. Wǒmen yìqǐ qù chī fàn ba!','Tôi cũng chưa. Chúng ta cùng đi ăn cơm nhé!'],
    [2,4,'B','小美','好啊！你想吃什麼？','Hǎo a! Nǐ xiǎng chī shénme?','Được! Bạn muốn ăn gì?'],
    [2,5,'A','小明','我想吃牛肉麵。你喜歡吃麵嗎？','Wǒ xiǎng chī niúròu miàn. Nǐ xǐhuān chī miàn ma?','Tôi muốn ăn mì bò. Bạn thích ăn mì không?'],
    [2,6,'B','小美','喜歡！臺灣的牛肉麵很好吃！','Xǐhuān! Táiwān de niúròu miàn hěn hǎo chī!','Thích! Mì bò Đài Loan rất ngon!'],
    // Dialogue 3
    [3,1,'A','小美','請問，這件衣服多少錢？','Qǐng wèn, zhè jiàn yīfú duōshǎo qián?','Xin hỏi, chiếc áo này bao nhiêu tiền?'],
    [3,2,'B','店員','這件五百塊。','Zhè jiàn wǔ bǎi kuài.','Chiếc này 500 đồng (Đài tệ).'],
    [3,3,'A','小美','可以便宜一點嗎？','Kěyǐ piányi yì diǎn ma?','Có thể rẻ hơn một chút không?'],
    [3,4,'B','店員','好吧，算你四百五。','Hǎo ba, suàn nǐ sì bǎi wǔ.','Được rồi, tính bạn 450.'],
    [3,5,'A','小美','謝謝！我要這件。','Xièxie! Wǒ yào zhè jiàn.','Cảm ơn! Tôi lấy cái này.'],
  ];
  for (const l of dlgLines) {
    await conn.query(
      `INSERT INTO dialogue_lines (dialogue_id, line_order, speaker, speaker_name, hanzi, pinyin, meaning) VALUES (?,?,?,?,?,?,?)`,
      l
    );
  }
  console.log(`  ✅ Seeded ${dialogues.length} dialogues with ${dlgLines.length} lines`);

  // -- Seed Blog Posts --
  const blogs = [
    ['Hướng dẫn đăng ký thi TOCFL 2025 - Chi tiết từ A-Z','Hướng dẫn chi tiết cách đăng ký thi TOCFL năm 2025, bao gồm lịch thi, địa điểm thi tại Việt Nam...','TOCFL','📝','2025-08-15'],
    ['Top 10 học bổng du học Đài Loan dành cho sinh viên Việt Nam','Tổng hợp các chương trình học bổng hấp dẫn nhất từ chính phủ Đài Loan và các trường đại học...','Học bổng','🎓','2025-08-10'],
    ['Phương pháp học từ vựng tiếng Trung hiệu quả với SRS','Tìm hiểu về phương pháp Spaced Repetition System (SRS) và cách áp dụng để nhớ từ vựng lâu dài...','Học tập','🧠','2025-08-05'],
    ['Kinh nghiệm sống và học tập tại Đài Loan cho du học sinh mới','Chia sẻ kinh nghiệm thực tế về cuộc sống, ăn ở, đi lại và học tập tại Đài Loan...','Du học','✈️','2025-08-01'],
    ['So sánh Phồn thể và Giản thể - Nên học loại nào?','Phân tích ưu nhược điểm của việc học tiếng Trung Phồn thể vs Giản thể cho người Việt...','Học tập','🔤','2025-07-28'],
    ['Lịch khai giảng các khóa học tiếng Trung tháng 9/2025','Thông tin về các khóa học tiếng Trung online và offline sắp khai giảng tại Tẻn...','Khai giảng','📅','2025-07-25'],
  ];
  for (const b of blogs) {
    await conn.query(
      `INSERT INTO blog_posts (title, excerpt, category, emoji, published_at) VALUES (?,?,?,?,?)`,
      b
    );
  }
  console.log(`  ✅ Seeded ${blogs.length} blog posts`);

  console.log('\n✅ Database initialization complete!\n');
  console.log('📌 Admin login: buituananh106963007@gmail.com / 12345678\n');

  await conn.end();
  process.exit(0);
}

initDatabase().catch(err => {
  console.error('❌ Database initialization failed:', err);
  process.exit(1);
});
