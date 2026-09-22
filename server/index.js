// Tẻn - Express Backend Server
import express from 'express';
import cors from 'cors';
import compression from 'compression';
import dotenv from 'dotenv';

dotenv.config();

// Import routes
import authRoutes from './routes/auth.js';
import srsRoutes from './routes/srs.js';
import examRoutes from './routes/exam.js';
import notebookRoutes from './routes/notebook.js';
import lotrinhRoutes from './routes/lotrinh.js';
import leaderboardRoutes from './routes/leaderboard.js';
import profileRoutes from './routes/profile.js';
import adminRoutes from './routes/admin.js';
import teacherRoutes from './routes/teachers.js';
import duHocRoutes from './routes/du-hoc.js';
import quyRoutes from './routes/quy.js';
import ktxRoutes from './routes/ktx.js';
import deBaiRoutes from './routes/de-bai.js';
import deBaiHocVienRoutes from './routes/de-bai-hocvien.js';
import duHocHocVienRoutes from './routes/du-hoc-hocvien.js';
import cronRoutes from './routes/cron.js';
import exerciseRoutes from './routes/exercise.js';
import noiDungRoutes from './routes/noi-dung.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// Nén gzip/br mọi response JSON (2026-09-06). Danh sách từ vựng trả về ~13 KB với 500 từ và
// sẽ tăng theo kho từ (mục tiêu 8.000 từ) — không nén là học viên 4G tải nguyên văn bản thô.
// Trên Vercel, response đã có Content-Encoding thì edge không nén lại, nên không đụng nhau.
app.use(compression());

// ------------------------------------------------------------------ HEADER BẢO MẬT (2026-09-15)
//
// Trên Vercel, phần HTML/tài nguyên tĩnh đã được `vercel.json` gắn đủ bộ header (gồm CSP với
// `frame-ancestors 'self'` — thứ chặn web khác nhúng app vào iframe của họ). Khối này lo cho:
//   • response API (Vercel không áp CSP cho JSON, mà JSON cũng không cần CSP);
//   • trường hợp chạy trên VPS/nginx, nơi `vercel.json` hoàn toàn không có tác dụng.
//
// CỐ Ý KHÔNG đặt Content-Security-Policy ở đây: trên Vercel sẽ thành HAI header CSP, và trình
// duyệt áp GIAO của chúng — lệch một chỉ thị là chặn nhầm thứ đang chạy tốt, rất khó lần ra.
// CSP cho tài liệu HTML là việc của vercel.json (hoặc của nginx nếu chuyển sang VPS).
app.use((req, res, next) => {
  res.set('X-Content-Type-Options', 'nosniff');
  // API không bao giờ cần nhúng vào khung của trang khác -> DENY, chặt hơn mức SAMEORIGIN của HTML.
  res.set('X-Frame-Options', 'DENY');
  res.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  // Không để công cụ tìm kiếm lập chỉ mục response API: nội dung bài học lọt vào bộ nhớ đệm của
  // Google là đọc được mà không cần qua tường trả phí.
  res.set('X-Robots-Tag', 'noindex, nofollow');
  next();
});
// CORS — phải kể tên cả origin của APP NATIVE, không chỉ trình duyệt.
//
// Trong app Capacitor, WebView không chạy ở origin của máy chủ mà ở một origin riêng do vỏ
// native dựng lên: 'https://localhost' (Android, androidScheme https) và 'capacitor://localhost'
// (iOS). Thiếu hai dòng này thì MỌI lời gọi API từ app bị trình duyệt chặn ở tầng CORS — và nó
// hỏng rất êm: `request()` phía client nuốt lỗi mạng rồi chỉ báo "Không thể kết nối server",
// không nói gì về CORS. Log server cũng sạch vì preflight OPTIONS trả 204 bình thường.
//
// 'ionic://localhost' là origin của các bản Capacitor đời cũ — giữ để app đã cài trên máy học
// viên không chết khi ta nâng cấp vỏ về sau.
const ORIGIN_CHO_PHEP = [
  'http://localhost:5173',   // Vite dev
  'http://localhost:3000',
  'http://localhost:5199',   // cổng dành cho kiểm thử phân quyền (CLAUDE.md 4.17)
  'https://localhost',       // app Android
  'capacitor://localhost',   // app iOS
  'ionic://localhost',       // app Capacitor đời cũ
  // Domain thật, khai bằng biến môi trường để đổi domain không phải sửa code + deploy lại.
  // APP_URL đã được email.js dùng để dựng link trong mail (xem getAppBaseUrl) — cùng một nguồn.
  ...[process.env.APP_URL, process.env.EXTRA_ORIGINS]
    .filter(Boolean)
    .flatMap((v) => String(v).split(','))
    .map((v) => v.trim().replace(/\/$/, ''))
    .filter(Boolean),
];

app.use(cors({
  origin(origin, cb) {
    // Không có Origin: cùng origin, hoặc client không phải trình duyệt (curl, app native gọi
    // thẳng, health check). Không phải thứ CORS sinh ra để chặn — cứ cho qua.
    if (!origin) return cb(null, true);
    if (ORIGIN_CHO_PHEP.includes(origin)) return cb(null, true);
    // Mọi domain của chính dự án trên Vercel (preview deployment có tên ngẫu nhiên).
    if (/^https:\/\/[a-z0-9-]+\.vercel\.app$/i.test(origin)) return cb(null, true);
    return cb(new Error(`CORS: origin không được phép — ${origin}`));
  },
  credentials: true,
}));
// Ảnh biên lai chuyển khoản là base64 trong JSON, lớn hơn hẳn mức mặc định 100KB của
// express.json — thiếu dòng này thì mọi lần gửi biên lai nhận 413 "request entity too large"
// mà giao diện chỉ thấy một lỗi mạng chung chung. Nới CHỈ cho hai nhánh cần, không nới toàn cục:
// mọi route khác giữ nguyên trần 100KB, đó vẫn là lớp chắn tốt trước body rác.
// Phải đặt TRƯỚC express.json() mặc định — cái nào chạy trước thì cái đó parse (và ném 413).
app.use(['/api/admin/du-hoc', '/api/du-hoc',
         '/api/admin/quy', '/api/admin/ktx', '/api/admin/de-bai'], express.json({ limit: '6mb' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import pool from './config/db.js';

// Request logger (dev)
if (process.env.NODE_ENV !== 'production') {
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const ms = Date.now() - start;
      const color = res.statusCode >= 400 ? '\x1b[31m' : '\x1b[32m';
      console.log(`${color}${req.method}\x1b[0m ${req.originalUrl} → ${res.statusCode} (${ms}ms)`);
    });
    next();
  });
}

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/srs', srsRoutes);
app.use('/api/exam', examRoutes);
app.use('/api/notebook', notebookRoutes);
app.use('/api/lo-trinh', lotrinhRoutes);
app.use('/api/leaderboard', leaderboardRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/admin', adminRoutes);
// Quản lý giáo viên: cùng tiền tố /api/admin nhưng router riêng, tự đòi quyền admin bên trong.
app.use('/api/admin', teacherRoutes);
// Hồ sơ du học của trung tâm (2026-09-15) — xem server/routes/du-hoc.js. Chỉ quản trị dùng được.
app.use('/api/admin', duHocRoutes);

// Sổ thu chi + ký túc xá của trung tâm (2026-09-17). Cùng tiền tố /api/admin, chỉ quản trị dùng
// được — bảng QUYEN trong middleware/roles.js là chỗ chặn.
app.use('/api/admin', quyRoutes);
app.use('/api/admin', ktxRoutes);
// Đề bài tự soạn — GIÁO VIÊN cũng dùng được (khác 3 khu trên), xem chú thích đầu routes/de-bai.js.
app.use('/api/admin', deBaiRoutes);
// CỔNG HỌC SINH của khu du học (2026-09-16) — học viên thường, chỉ requireAuth, mọi truy vấn tự
// lọc user_id. Tách router riêng thay vì nhét vào duHocRoutes (router đó đòi quyền quản trị).
app.use('/api/du-hoc', duHocHocVienRoutes);
// Phía học sinh làm bài — chỉ requireAuth, mọi truy vấn tự lọc theo req.userId.
app.use('/api/de-bai', deBaiHocVienRoutes);
// Tác vụ định kỳ (Vercel Cron) — tự bảo vệ bằng CRON_SECRET, xem server/routes/cron.js.
app.use('/api/cron', cronRoutes);
app.use('/api/exercise', exerciseRoutes);
// Nội dung bài học có kiểm quyền (2026-09-09) — xem server/routes/noi-dung.js.
app.use('/api/noi-dung', noiDungRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// 404 handler
app.use('/api/{*splat}', (req, res) => {
  res.status(404).json({ error: 'API endpoint không tồn tại.' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Lỗi hệ thống. Vui lòng thử lại.' });
});

// Khởi động server. Điều kiện DUY NHẤT là "không phải Vercel": ở đó mỗi request là một lời
// gọi hàm serverless, gọi listen() là sai mô hình.
//
// ⚠️ Điều kiện cũ là `NODE_ENV !== 'production' && !process.env.VERCEL` — đúng khi hệ thống chỉ
// chạy ở 2 nơi (máy dev và Vercel), nhưng SAI ngay khi có VPS: đặt NODE_ENV=production như mọi
// hướng dẫn triển khai đều bảo, tiến trình khởi động, in log, rồi THOÁT NGAY vì không có gì
// giữ event loop. pm2 thấy tiến trình chết sẽ khởi động lại vô hạn, log không có một dòng lỗi
// nào — chỉ có nginx trả 502. Đừng đưa `NODE_ENV` trở lại điều kiện này.
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🚀 Tẻn API Server`);
    console.log(`   ├─ URL:  http://localhost:${PORT}`);
    console.log(`   ├─ Env:  ${process.env.NODE_ENV || 'development'}`);
    console.log(`   └─ DB:   ${process.env.DB_NAME || 'ten_app'}@${process.env.DB_HOST || 'localhost'}`);
    console.log(`\n📚 API Endpoints:`);
    console.log(`   POST /api/auth/register`);
    console.log(`   POST /api/auth/login`);
    console.log(`   GET  /api/auth/me`);
    console.log(`   GET  /api/vocabulary`);
    console.log(`   GET  /api/vocabulary/search?q=`);
    console.log(`   GET  /api/srs/due`);
    console.log(`   POST /api/srs/review`);
    console.log(`   GET  /api/exam/questions`);
    console.log(`   POST /api/exam/submit`);
    console.log(`   GET  /api/dialogues`);
    console.log(`   GET  /api/saved-words`);
    console.log(`   POST /api/saved-words/:id`);
    console.log(`   GET  /api/notebook`);
    console.log(`   GET  /api/lo-trinh/tong-quan`);
    console.log(`   GET  /api/leaderboard`);
    console.log(`   GET  /api/profile/stats`);
    console.log(`   GET  /api/blog`);
    console.log(`   GET  /api/health`);
    console.log('');
  });
}

export default app;
