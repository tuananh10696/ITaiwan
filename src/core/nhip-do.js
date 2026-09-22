// ============================================================
// LÕI — NHỊP ĐO HOẠT ĐỘNG HỌC (2026-09-08)
// ============================================================
// Đặt ở LÕI chứ không nằm trong module trang "Lộ trình", vì nhịp đo phải chạy trên MỌI trang:
// `navigate()` gọi `nhipDoiTrang()` mỗi lần đổi trang và `init()` gọi `nhipBatDau()` một lần.
// Nếu để trong module nạp động thì chuỗi ngày chỉ được tính sau khi học viên mở trang Lộ trình
// — tức gần như không bao giờ. Xem CLAUDE.md 4.38 và 4.40.

import api from '../api/client.js';
import { state } from './state.js';

// ------------------------------------------------------------------ NHỊP ĐO HOẠT ĐỘNG
//
// Đổi cách tính CHUỖI NGÀY: trước đây `users.streak` +1 ở route ĐĂNG NHẬP, tức đếm "ngày mở
// app" — mở rồi treo đó vẫn được tính. Nay một ngày chỉ tính là "có học" khi:
//     (a) nộp ít nhất 1 bài, HOẶC
//     (b) hoạt động THẬT ≥ 5 phút VÀ mở ≥ 3 lượt trang.
//
// "Hoạt động thật" = tab ĐANG HIỆN *và* có thao tác trong 2 phút gần nhất. Thiếu vế thứ hai
// thì để tab mở cả buổi trên một trang bài học cũng thành "học 3 tiếng".
//
// ⚠️ Giây do trình duyệt tự đếm nên KHÔNG tin được — server chặn thêm một lớp (mỗi nhịp ≤120s,
//    mỗi ngày ≤8 giờ). Đừng bỏ lớp chặn đó vì "client mình viết mà".

/** Trang -> khu vực. Dùng cho cả nhịp đo lẫn khối "học bao nhiêu phút ở đâu" của trang Tiến độ. */
export const KHU_VUC_TRANG = {
  'tocfl-duongdai': 'giaotrinh', 'tocfl-thoidai': 'giaotrinh', 'hsk-30': 'giaotrinh',
  'pron-vanmau': 'phat-am', 'pron-thanhmau': 'phat-am', 'pron-thanhdieu': 'phat-am',
  'pron-bangphienam': 'phat-am',
  vocabulary: 'tu-vung', dictionary: 'tu-vung', notebook: 'tu-vung', radicals: 'tu-vung',
  'hsk-vocab': 'tu-vung', 'tocfl-vocab': 'tu-vung',
  exam: 'thi-thu', 'exam-taking': 'thi-thu',
  flashcard: 'luyen-tap', quiz: 'luyen-tap', dialogue: 'luyen-tap', shadowing: 'luyen-tap',
  'path-overview': 'lo-trinh', 'path-today': 'lo-trinh', 'path-homework': 'lo-trinh',
  'path-progress': 'lo-trinh', 'path-achievements': 'lo-trinh',
  blog: 'cong-dong',
};
export const khuVucCua = (page) => KHU_VUC_TRANG[page] || 'khac';

const NHIP_MOI = 5000;          // nhịp đếm nội bộ (ms)
const NHIP_GUI = 60;            // gom đủ bao nhiêu giây thì gửi lên server
const NGUNG_SAU = 120000;       // không thao tác quá 2 phút -> coi như đã rời máy

const nhipState = {
  giay: 0, soLan: 0, khuVuc: 'khac',
  thaoTacCuoi: Date.now(),
  dangGui: false,
  bat: false,
};

export function nhipDanhDauThaoTac() { nhipState.thaoTacCuoi = Date.now(); }

/** Gửi phần đã gom lên server rồi xoá bộ đếm. `cuoiPhien` = đang rời trang, dùng keepalive. */
export async function nhipGui(cuoiPhien = false) {
  if (!state.isLoggedIn || nhipState.dangGui) return;
  const giay = Math.round(nhipState.giay);
  const soLan = nhipState.soLan;
  if (!giay && !soLan) return;
  nhipState.giay = 0; nhipState.soLan = 0;
  nhipState.dangGui = true;
  try {
    // `keepalive` để nhịp cuối vẫn đi được khi tab đang đóng. Gói tin vài chục byte nên
    // không chạm giới hạn 64 KB của keepalive.
    await api.request('/lo-trinh/nhip', {
      method: 'POST',
      body: JSON.stringify({ khu_vuc: nhipState.khuVuc, giay, so_lan: soLan }),
      keepalive: cuoiPhien,
    });
  } catch (e) {
    // Mất mạng thì trả lại phần chưa gửi để lần sau gửi bù — đừng nuốt mất công học của họ.
    nhipState.giay += giay; nhipState.soLan += soLan;
  } finally {
    nhipState.dangGui = false;
  }
}

/** Đổi trang: chốt sổ khu vực cũ trước, rồi mới đổi sang khu vực mới. */
export function nhipDoiTrang(page) {
  const kv = khuVucCua(page);
  if (kv !== nhipState.khuVuc && (nhipState.giay || nhipState.soLan)) nhipGui();
  nhipState.khuVuc = kv;
  nhipState.soLan += 1;
  nhipDanhDauThaoTac();
}

export function nhipBatDau() {
  if (nhipState.bat) return;
  nhipState.bat = true;
  for (const ev of ['pointerdown', 'keydown', 'wheel', 'touchstart']) {
    window.addEventListener(ev, nhipDanhDauThaoTac, { passive: true });
  }
  window.addEventListener('scroll', nhipDanhDauThaoTac, { passive: true });
  setInterval(() => {
    if (!state.isLoggedIn) return;
    if (document.visibilityState !== 'visible') return;
    if (Date.now() - nhipState.thaoTacCuoi > NGUNG_SAU) return;
    nhipState.giay += NHIP_MOI / 1000;
    if (nhipState.giay >= NHIP_GUI) nhipGui();
  }, NHIP_MOI);
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') nhipGui(true);
  });
  window.addEventListener('pagehide', () => nhipGui(true));
}
