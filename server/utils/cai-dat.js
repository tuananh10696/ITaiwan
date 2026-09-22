// =============================================================
// CẤU HÌNH CHẠY (app_settings) — 2026-09-09
//
// Bảng khoá-giá trị cho những thứ chủ dự án phải đổi được mà KHÔNG cần deploy lại và KHÔNG nên
// nằm trong git: số tài khoản nhận tiền, link liên hệ hỗ trợ.
//
// Không dùng biến môi trường cho nhóm này: đổi env trên Vercel là phải redeploy, và người đổi
// phải có quyền vào bảng điều khiển hosting — trong khi đây là việc nghiệp vụ của chủ trung tâm.
import pool from '../config/db.js';

// Cấu hình đổi rất thưa mà bị đọc mỗi lần mở trang thanh toán, nên đệm ngắn. `xoaCacheCaiDat()`
// được gọi ngay tại chỗ ghi nên thao tác của quản trị có hiệu lực tức thì trên tiến trình đó.
const CACHE_MS = 60_000;
let cache = null;
let hetHan = 0;

export function xoaCacheCaiDat() {
  cache = null;
  hetHan = 0;
}

/** Toàn bộ cấu hình dạng { khoa: gia_tri }. Bảng chưa có -> trả {} chứ không ném lỗi. */
async function napTatCa() {
  if (cache && hetHan > Date.now()) return cache;
  try {
    const [rows] = await pool.query('SELECT khoa, gia_tri FROM app_settings');
    cache = Object.fromEntries(rows.map((r) => [r.khoa, r.gia_tri ?? '']));
  } catch (err) {
    if (err.code === 'ER_NO_SUCH_TABLE') {
      // Chưa chạy migration: trả rỗng để giao diện hiện "chưa cấu hình" thay vì đổ 500.
      cache = {};
    } else {
      throw err;
    }
  }
  hetHan = Date.now() + CACHE_MS;
  return cache;
}

/** Đọc một nhóm khoá. Khoá chưa có trả về ''. */
export async function docCaiDat(khoas) {
  const all = await napTatCa();
  return Object.fromEntries((khoas || []).map((k) => [k, all[k] ?? '']));
}

/** Ghi một nhóm khoá. Chỉ ghi khoá được liệt kê trong `chophep` — không cho client tự đặt khoá mới. */
export async function ghiCaiDat(capGiaTri, chophep) {
  const vao = Object.entries(capGiaTri || {}).filter(([k]) => chophep.includes(k));
  if (!vao.length) return 0;
  for (const [k, v] of vao) {
    await pool.query(
      `INSERT INTO app_settings (khoa, gia_tri) VALUES (?, ?)
       ON DUPLICATE KEY UPDATE gia_tri = VALUES(gia_tri)`,
      [k, v == null ? '' : String(v).slice(0, 2000)],
    );
  }
  xoaCacheCaiDat();
  return vao.length;
}
