// Tiện ích ép kiểu số cho tham số lấy từ query string / body.
//
// LÝ DO TỒN TẠI (2026-08-25): rất nhiều route đang làm `params.push(parseInt(req.query.limit))`
// rồi nhét thẳng vào `LIMIT ?`. Nếu client gửi giá trị lạ thì:
//   - `?limit=abc`  -> parseInt = NaN -> mysql2 escape thành chuỗi "NaN" -> SQL lỗi cú pháp -> 500
//   - `?page=0`     -> offset = (0-1)*limit = số ÂM -> MySQL không cho OFFSET âm -> 500
//   - `?limit=99999999` -> quét cả bảng, tốn tài nguyên DB
// Người dùng bình thường không gõ những URL này, nhưng bot/crawler thì có, và mỗi lần như vậy là
// một lỗi 500 trong log production che mất lỗi thật. Dùng toInt() để luôn kẹp về khoảng hợp lệ.

export function toInt(value, fallback, opts = {}) {
  const { min = 0, max = Number.MAX_SAFE_INTEGER } = opts;
  const n = parseInt(value, 10);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

/** Kẹp số bản ghi mỗi trang: mặc định 50, tối thiểu 1, tối đa 200. */
export function toLimit(value, fallback = 50, max = 200) {
  return toInt(value, fallback, { min: 1, max });
}

/** Kẹp số trang: luôn >= 1 để OFFSET không bao giờ âm. */
export function toPage(value) {
  return toInt(value, 1, { min: 1 });
}
