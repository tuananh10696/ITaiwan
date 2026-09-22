// =============================================================
// QUY TẮC NỘI DUNG MỞ — dùng CHUNG cho server và client (2026-09-09)
//
// File này KHÔNG import gì và không đụng DOM/Node, để đúng một bản quy tắc chạy ở cả hai phía.
// Client dùng nó để biết bài nào tải thẳng được (khỏi gắn token, khỏi hiện khoá); server dùng nó
// làm điều kiện cho qua ở `/api/noi-dung/*`. Hai bên lệch nhau thì giao diện sẽ nói một đằng mà
// server chặn một nẻo — nên đừng chép quy tắc này ra chỗ thứ hai.
//
// Chính sách (chốt với chủ dự án 2026-09-09):
//   • 3 BÀI ĐẦU của MỌI quyển/cấp, MỌI bộ giáo trình -> mở cho tất cả, KỂ CẢ CHƯA ĐĂNG NHẬP.
//     (Trước đây chỉ mở đúng bài 1 của quyển 1 — người học trình độ cao không có gì để xem thử.)
//   • ĐỀ THI THỬ (TOCFL, HSK) -> luôn cần quyền, không có bài mở.
//   • Tra cứu (từ điển, bộ thủ, phát âm, cộng đồng, tổng hợp từ vựng) -> mở, không đi qua đây.
// =============================================================

/** Số bài đầu mỗi quyển/cấp được mở miễn phí. Đổi số này là đổi chính sách bán hàng. */
export const SO_BAI_MO = 3;

/**
 * Mã sản phẩm TRỌN BỘ — khớp bảng `products`.
 *
 * Ba mã `bo-*` đã NGỪNG BÁN từ 2026-09-09 (đơn vị bán đổi sang từng quyển, xem `maKhoaQuyen`),
 * nhưng GIỮ NGUYÊN ở đây: học viên đã mua trước đó vẫn còn `entitlements` trỏ vào chúng, và
 * phạm vi "cả bộ" vẫn phải được tôn trọng. Đề thi thử thì vẫn bán nguyên bộ — nó không chia
 * quyển được.
 */
export const SAN_PHAM_CUA_BO = {
  duongdai: 'bo-duongdai',
  thoidai: 'bo-thoidai',
  hsk: 'bo-hsk',
  'thi-thu': 'bo-thi-thu',
};

/** Ký tự phân biệt đơn vị trong mã sản phẩm: Đương đại/Thời Đại đếm theo QUYỂN, HSK theo CẤP. */
const DON_VI_MA = { duongdai: 'q', thoidai: 'q', hsk: 'c' };

/**
 * Mã sản phẩm của MỘT quyển/cấp — 'kh-duongdai-q2', 'kh-hsk-c3'.
 * Trả null khi bộ không chia quyển (thi-thu) hoặc thiếu số quyển.
 */
export function maKhoaQuyen(bo, quyen) {
  const d = DON_VI_MA[bo];
  if (!d || !quyen) return null;
  return `kh-${bo}-${d}${quyen}`;
}

/**
 * Bóc khoá bài cha thành (bộ, quyển, số bài).
 * Ba bộ dùng ba dạng khoá khác nhau nhưng KHÔNG giao nhau (CLAUDE.md 4.34):
 *   Đương đại : '5' (quyển 1, không tiền tố) · '2-5' (quyển 2)
 *   Thời Đại  : 'td1-16'
 *   HSK       : 'hsk3-5'
 * Không khớp dạng nào -> null (nơi gọi coi như KHÔNG mở, an toàn hơn là đoán).
 */
export function bocKhoaBai(key) {
  const k = String(key || '').trim();
  let m = /^hsk(\d+)-(\d+)$/.exec(k);
  if (m) return { bo: 'hsk', quyen: +m[1], bai: +m[2] };
  m = /^td(\d+)-(\d+)$/.exec(k);
  if (m) return { bo: 'thoidai', quyen: +m[1], bai: +m[2] };
  m = /^(\d+)-(\d+)$/.exec(k);
  if (m) return { bo: 'duongdai', quyen: +m[1], bai: +m[2] };
  m = /^(\d+)$/.exec(k);
  if (m) return { bo: 'duongdai', quyen: 1, bai: +m[1] };
  return null;
}

/** Khoá bài con ('2-5.1', 'td1-1.3', '5.2') -> khoá bài cha ('2-5', 'td1-1', '5'). */
export function baiChaCua(subId) {
  const s = String(subId || '');
  const i = s.indexOf('.');
  return i === -1 ? s : s.slice(0, i);
}

/**
 * Bài này có nằm trong nhóm mở miễn phí không?
 * Nhận cả khoá bài cha ('2-5') lẫn bài con ('2-5.1', '2-5.vh').
 */
export function baiMo(key) {
  const t = bocKhoaBai(baiChaCua(key));
  return !!t && t.bai >= 1 && t.bai <= SO_BAI_MO;
}

/**
 * Một tài nguyên nội dung có mở không.
 *   loai: 'giaotrinh' | 'luyentap' | 'dich' | 'dethi' | 'ngu-phap-hsk'
 *   id  : khoá bài (hoặc mã đề với 'dethi')
 *
 * 'ngu-phap-hsk' tra theo CẤP chứ không theo bài (CLAUDE.md 4.34) nên không có khái niệm "3 bài
 * đầu" — nó đi kèm bài nào thì theo quyền của bài đó, ở đây trả false để buộc kiểm quyền; route
 * tự cho qua khi người gọi đang mở một bài miễn phí của chính cấp đó.
 */
export function taiNguyenMo(loai, id) {
  switch (loai) {
    case 'giaotrinh':
    case 'luyentap':
    case 'dich':
      return baiMo(id);
    case 'dethi':          // Chốt với chủ dự án: đề thi thử KHÔNG có bản dùng thử.
    case 'ngu-phap-hsk':
      return false;
    default:
      return false;
  }
}

/** Bộ nội dung mà một tài nguyên thuộc về — để tra xem người dùng có sản phẩm tương ứng chưa. */
export function boCuaTaiNguyen(loai, id) {
  if (loai === 'dethi') return 'thi-thu';
  if (loai === 'ngu-phap-hsk') return 'hsk';
  const t = bocKhoaBai(baiChaCua(id));
  return t ? t.bo : null;
}

/**
 * Vị trí của một tài nguyên trong kho: thuộc BỘ nào, QUYỂN/CẤP mấy.
 *
 * Từ 2026-09-09 quyền được bán theo từng quyển nên chỉ biết "bộ" là không đủ — mua Đương đại
 * quyển 2 thì không được mở quyển 5. `quyen` = null nghĩa là tài nguyên không chia quyển
 * (đề thi thử) -> nơi gọi chỉ xét quyền trọn bộ.
 */
export function viTriTaiNguyen(loai, id) {
  if (loai === 'dethi') return { bo: 'thi-thu', quyen: null };
  if (loai === 'ngu-phap-hsk') {
    const m = /^hsk([1-6])$/.exec(String(id || ''));
    return { bo: 'hsk', quyen: m ? +m[1] : null };
  }
  const t = bocKhoaBai(baiChaCua(id));
  return t ? { bo: t.bo, quyen: t.quyen } : { bo: null, quyen: null };
}
