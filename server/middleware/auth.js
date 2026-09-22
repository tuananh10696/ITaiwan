// JWT Authentication Middleware
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

// ⚠️ KHÔNG đặt lại giá trị mặc định ở đây (2026-09-15).
//
// Trước đây dòng này là `process.env.JWT_SECRET || 'tw_diary_secret'`. Chuỗi dự phòng đó nằm
// công khai trong mã nguồn, nên bất kỳ môi trường nào thiếu biến JWT_SECRET — một lần deploy
// quên khai báo, một container mới, một máy dev của người khác — đều ký token bằng nó. Ai đọc
// được repo cũng tự ký được token của tài khoản BẤT KỲ, kể cả admin: `requireAuth` chỉ kiểm chữ
// ký chứ không tra lại DB. Và nó hỏng hoàn toàn im lặng: hệ thống chạy bình thường, không một
// dòng log nào cho biết đang dùng khoá công khai.
//
// Nay thiếu biến là DỪNG HẲN lúc khởi động. Thà không chạy còn hơn chạy với cửa mở.
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  const viSao = !JWT_SECRET
    ? 'Biến môi trường JWT_SECRET chưa được khai báo.'
    : `JWT_SECRET chỉ dài ${JWT_SECRET.length} ký tự — cần ít nhất 32.`;
  console.error(`\n❌ ${viSao}`);
  console.error('   Sinh một khoá mới:  node -e "console.log(require(\'crypto\').randomBytes(48).toString(\'base64url\'))"');
  console.error('   Rồi đặt vào .env (máy dev) và Environment Variables của Vercel (production).');
  console.error('   ⚠️ Đổi khoá sẽ làm MỌI phiên đăng nhập hiện có hết hiệu lực — người dùng phải đăng nhập lại.\n');
  throw new Error('JWT_SECRET không hợp lệ — từ chối khởi động.');
}

// Required auth - blocks if no token
export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Vui lòng đăng nhập để tiếp tục.' });
  }
  try {
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    req.userName = decoded.name;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.' });
  }
}

// Optional auth - attaches user if token exists, continues if not
export function optionalAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, JWT_SECRET);
      req.userId = decoded.id;
      req.userName = decoded.name;
    } catch (err) {
      // Token invalid, just continue without user
    }
  }
  next();
}

export function generateToken(user) {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '30d' }
  );
}
