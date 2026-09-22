// ============================================================
// LÕI — SỔ TAY TỪ VỰNG (2026-09-08)
// ============================================================
// Kho sổ tay khoá theo CHỮ HÁN (xem 4.37). Đặt ở LÕI chứ không nằm trong module trang, vì ba
// nơi ngoài khu Từ vựng cũng cần tới nó:
//   · `init()` nạp sổ tay từ localStorage và chuyển dữ liệu bản cũ;
//   · `logout()` xoá sổ tay khỏi máy;
//   · thẻ từ của giáo trình / TOCFL / HSK có nút lưu (`tdNutLuuTuHtml`).
// Nếu để trong module nạp động thì học viên phải mở trang Sổ tay một lần thì nút lưu ở bài học
// mới chạy — vô lý.
//
// `soTay` là `let` và bị gán lại (nạp mới, đồng bộ, đăng xuất). Nhờ live binding của ESM, nơi
// import vẫn luôn thấy Map mới nhất — nhưng KHÔNG gán lại được từ bên ngoài, nên mọi thao tác
// phải đi qua các hàm trong file này.

import api from '../api/client.js';
import { state } from './state.js';
import { tdEsc, toast } from './ui.js';

export const SO_TAY_KEY = 'tw_so_tay';
/** Map<chữ Hán, {tu, gian, pinyin, han_viet, nghia, nguon, ghi_chu, created_at}> */
export let soTay = new Map();

export function soTayNap() {
  try {
    const raw = JSON.parse(localStorage.getItem(SO_TAY_KEY) || '[]');
    if (Array.isArray(raw)) soTay = new Map(raw.filter((w) => w && w.tu).map((w) => [w.tu, w]));
  } catch { soTay = new Map(); }
}

export function soTayGhi() {
  try { localStorage.setItem(SO_TAY_KEY, JSON.stringify([...soTay.values()])); } catch { /* hết chỗ */ }
}

export const soTayCo = (tu) => soTay.has(tu);

/**
 * Lưu / bỏ một từ. `w` là object đủ trường để sổ tay hiện được ngay mà không phải tra lại
 * chỉ mục — sổ tay phải mở được kể cả khi mạng hỏng.
 */
export async function soTayDoi(w, nguon) {
  const tu = w && w.tu;
  if (!tu) return false;
  const dangCo = soTay.has(tu);
  if (dangCo) soTay.delete(tu);
  else soTay.set(tu, { ...w, nguon: nguon || w.nguon || '', created_at: new Date().toISOString() });
  soTayGhi();
  if (state.isLoggedIn) {
    try {
      if (dangCo) await api.boSoTay(tu);
      else await api.luuSoTay(soTay.get(tu));
    } catch (e) {
      // Không nuốt im: lưu hỏng mà giao diện vẫn báo "đã lưu" thì học viên mất bài mà không hay
      // (đúng loại lỗi im lặng đã xảy ra ở 4.21b mục 6). Bản localStorage vẫn còn nên không mất.
      console.warn('Sổ tay: không đồng bộ được lên server:', e);
      toast('Đã lưu trên máy này, nhưng chưa đồng bộ được lên tài khoản.');
    }
  }
  return !dangCo;
}

/** Gộp sổ tay của máy vào tài khoản. Gọi sau khi đăng nhập / khi nạp lại phiên đã đăng nhập. */
export async function soTayDongBo() {
  if (!state.isLoggedIn) return;
  try {
    const res = await api.dongBoSoTay([...soTay.values()]);
    if (res && Array.isArray(res.tu)) {
      soTay = new Map(res.tu.map((w) => [w.tu, w]));
      soTayGhi();
    }
  } catch (e) {
    console.warn('Sổ tay: không đồng bộ được:', e);
  }
}

/**
 * Chuyển sổ tay cũ (mảng id số của bảng `vocabulary`) sang khoá chữ Hán. Chạy một lần rồi
 * xoá khoá cũ. Không có bước này thì người dùng cũ mở sổ tay ra thấy trống trơn.
 */
export function soTayChuyenDoiCu(vocabularyData) {
  let cu;
  try { cu = JSON.parse(localStorage.getItem('td_saved_words') || 'null'); } catch { return; }
  if (!Array.isArray(cu) || !cu.length) return;
  for (const id of cu) {
    const w = vocabularyData.find((x) => x.id === id);
    if (w && w.hanzi && !soTay.has(w.hanzi)) {
      soTay.set(w.hanzi, {
        tu: w.hanzi, gian: w.simplified || '', pinyin: w.pinyin || '',
        han_viet: '', nghia: w.meaning || '', nguon: 'cu', created_at: new Date().toISOString(),
      });
    }
  }
  soTayGhi();
  localStorage.removeItem('td_saved_words');
}

/**
 * Nút lưu sổ tay cho các trang KHÔNG nạp `kho.json` (giáo trình · từ vựng TOCFL · từ vựng HSK).
 *
 * Hai điểm khác `tdNutLuuHtml`:
 *   · dữ liệu của từ đi kèm ngay trong `data-*` nên không phải tra chỉ mục 578 KB — trang giáo
 *     trình không có lý do gì phải tải chỉ mục chỉ để bấm lưu một từ;
 *   · bấm xong chỉ đổi ĐÚNG cái nút đó, KHÔNG vẽ lại trang — vẽ lại trang giáo trình là mất
 *     vị trí cuộn giữa danh sách 40 từ và người học phải dò lại từ đầu.
 *
 * `tu` phải là chữ PHỒN THỂ (khoá chuẩn của sổ tay): HSK hiện giản thể nên nơi gọi phải
 * truyền `w.traditional`, đừng truyền `w.hanzi`.
 */
export function tdNutLuuTuHtml(tu, gian, py, nghia, hv, lop = 'dd-btn-speak') {
  if (!tu) return '';
  const d = (v) => tdEsc(v == null ? '' : v);
  const co = soTayCo(tu);
  // `lop` để nơi gọi dùng đúng lớp nút của TRANG ĐÓ — trang HSK dùng `.vocab-action-btn`,
  // gắn `.dd-btn-speak` vào là nút lưu có nền còn nút loa bên cạnh thì không, nhìn lệch hẳn.
  return `<button class="${lop} kv-btn-luu${co ? ' is-luu' : ''}"
    data-tu="${d(tu)}" data-gian="${d(gian)}" data-py="${d(py)}" data-ngh="${d(nghia)}" data-hv="${d(hv)}"
    onclick="event.stopPropagation(); window.app.tdLuuNhanh(this)"
    title="${co ? 'Bỏ khỏi sổ tay' : 'Lưu vào sổ tay'}"
    aria-label="${co ? 'Bỏ khỏi sổ tay' : 'Lưu vào sổ tay'}">
    <i class="fa-${co ? 'solid' : 'regular'} fa-bookmark"></i></button>`;
}

/** Bấm nút lưu ở trang giáo trình / TOCFL / HSK — chỉ cập nhật chính cái nút vừa bấm. */
export async function tdLuuNhanh(btn) {
  const g = btn.dataset;
  const daLuu = await soTayDoi({
    tu: g.tu, gian: g.gian || '', pinyin: g.py || '', han_viet: g.hv || '', nghia: g.ngh || '',
  }, 'giaotrinh');
  // Có thể có NHIỀU nút cùng một từ trên màn hình (từ lặp giữa các bài) -> đổi hết cho khớp.
  document.querySelectorAll(`.kv-btn-luu[data-tu="${CSS.escape(g.tu)}"]`).forEach((b) => {
    b.classList.toggle('is-luu', daLuu);
    b.title = daLuu ? 'Bỏ khỏi sổ tay' : 'Lưu vào sổ tay';
    b.setAttribute('aria-label', b.title);
    const i = b.querySelector('i');
    if (i) i.className = `fa-${daLuu ? 'solid' : 'regular'} fa-bookmark`;
  });
  toast(daLuu ? `Đã lưu “${g.tu}” vào sổ tay` : `Đã bỏ “${g.tu}” khỏi sổ tay`);
}

/** Xoá sổ tay khỏi MÁY (đăng xuất). Bản trên tài khoản vẫn còn nguyên, đăng nhập lại là có.
 *  Máy dùng chung mà giữ lại thì người đăng nhập sau nhìn thấy sổ tay của người trước. */
export function soTayXoaHet() {
  soTay = new Map();
  try {
    localStorage.removeItem(SO_TAY_KEY);
    localStorage.removeItem('td_saved_words');
  } catch { /* trình duyệt chặn localStorage */ }
}
