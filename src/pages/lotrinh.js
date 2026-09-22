// ============================================================
// TRANG: LỘ TRÌNH CỦA TÔI — 5 trang (4.38)
// ============================================================
// Module NẠP ĐỘNG (4.40). Nhịp đo hoạt động KHÔNG nằm ở đây mà ở `core/nhip-do.js`, vì nó
// phải chạy trên mọi trang chứ không riêng khu này.

import { app } from '../core/app.js';
import { state } from '../core/state.js';
import { tdEsc, tdNhay, toast, twPlayEnter, openDialog, closeDialog, khungXuongTrang as ltSkeleton } from '../core/ui.js';
import api from '../api/client.js';
import { thoidaiSubLessons, thoidaiBooks, tdBookOf } from '../data/giaotrinh-index.js';

// --- cầu nối tới phần còn nằm trong main.js ---
const navigate = (...a) => app.navigate(...a);
const getDisplayText = (...a) => app.getDisplayText(...a);
const ddSpeakWord = (...a) => app.ddSpeakWord(...a);
const notifLessonName = (...a) => app.notifLessonName(...a);
const assignmentLabel = (...a) => app.assignmentLabel(...a);
const openAssignment = (...a) => app.openAssignment(...a);
const toggleNotifications = (...a) => app.toggleNotifications(...a);

// `ltSkeleton` là tên cũ của `khungXuongTrang` — giữ nguyên để thân module không phải sửa.
export { ltSkeleton };

// ============================================================
// "LỘ TRÌNH CỦA TÔI" — 5 trang (2026-09-08)
// ============================================================
// Tổng quan · Bài học hôm nay · Bài tập cần hoàn thành · Tiến độ · Thành tích.
// Backend: server/routes/lotrinh.js (mỗi trang MỘT endpoint gộp sẵn). Xem CLAUDE.md 4.38.
//
// Không trang nào ở đây tự nghĩ ra dữ liệu: mọi con số đều suy từ `exercise_results`,
// `exam_results`, `assignments`, `study_activity`, `srs_words` và danh mục 435 bài con của
// 3 bộ giáo trình. Chỗ nào chưa có dữ liệu thì NÓI THẲNG là chưa có, đừng vẽ số 0 cho đẹp.

// ------------------------------------------------------------------ trạng thái + nạp

const ltState = {
  duLieu: {},          // page -> payload đã nạp
  dangNap: {},
  onTap: null,         // phiên ôn SRS đang mở: { the, idx, lat, xong, dung }
  btLoc: 'can-lam',    // bộ lọc trang Bài tập
  tdKhoang: 90,        // số ngày của biểu đồ Tiến độ
};

const LT_API = {
  'path-overview': '/lo-trinh/tong-quan',
  'path-today': '/lo-trinh/hom-nay',
  'path-homework': '/lo-trinh/bai-tap',
  'path-progress': '/lo-trinh/tien-do',
  'path-achievements': '/lo-trinh/thanh-tich',
};

/**
 * Nạp dữ liệu cho một trang lộ trình rồi vẽ.
 * Luôn nạp LẠI mỗi lần vào trang (không dùng bộ nhớ đệm): đây là trang theo dõi tiến độ, hiện
 * số cũ của lần ghé trước là nói dối — vừa làm xong một bài mà vào xem vẫn thấy số cũ.
 */
function ltNap(page, ve) {
  const el = document.getElementById('page-content');
  if (!el) return;
  el.innerHTML = ltSkeleton();
  api.get(LT_API[page]).then((d) => {
    if (state.currentPage !== page) return;      // người dùng đã sang trang khác
    ltState.duLieu[page] = d;
    const now = document.getElementById('page-content');
    if (now) { ve(now, d); twPlayEnter(now, 'tw-entering'); }
  }).catch((e) => {
    const now = document.getElementById('page-content');
    if (now && state.currentPage === page) {
      now.innerHTML = `<div class="tv-empty">
        <i class="fa-solid fa-triangle-exclamation"></i>
        <p>Không tải được dữ liệu lộ trình.${e && e.status === 401 ? ' Hãy đăng nhập lại.' : ''}</p>
        <button class="btn btn-primary" onclick="window.app.navigate('${page}')">Thử lại</button>
      </div>`;
    }
  });
}

// ------------------------------------------------------------------ tiện ích chung

const ltSo = (n) => Number(n || 0).toLocaleString('vi-VN');
function ltGio(giay) {
  const g = Math.max(0, Math.round(Number(giay) || 0));
  if (g < 60) return `${g} giây`;
  if (g < 3600) return `${Math.round(g / 60)} phút`;
  const h = Math.floor(g / 3600), p = Math.round((g % 3600) / 60);
  return p ? `${h} giờ ${p} phút` : `${h} giờ`;
}
const ltNgay = (s) => {
  const d = new Date(s);
  return Number.isNaN(d.getTime()) ? '' : d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' });
};
/** Số ngày từ hôm nay tới hạn nộp. Âm = đã quá hạn. */
function ltConLai(due) {
  if (!due) return null;
  const d = new Date(due); if (Number.isNaN(d.getTime())) return null;
  const h = new Date(); h.setHours(0, 0, 0, 0); d.setHours(0, 0, 0, 0);
  return Math.round((d - h) / 86400000);
}
function ltHanHtml(due) {
  const n = ltConLai(due);
  if (n === null) return '<span class="lt-han">Không hạn</span>';
  if (n < 0) return `<span class="lt-han is-tre">Quá hạn ${-n} ngày</span>`;
  if (n === 0) return '<span class="lt-han is-gap">Hạn hôm nay</span>';
  if (n <= 3) return `<span class="lt-han is-gap">Còn ${n} ngày</span>`;
  return `<span class="lt-han">Còn ${n} ngày</span>`;
}

/** `lesson_id` -> nhãn đọc được. Dùng lại đúng bộ nhãn của chuông thông báo (4.24/4.27/4.34). */
const ltNhanBai = (lessonId) => notifLessonName(lessonId);

/**
 * Tiến độ từng bộ giáo trình = số bài con ĐÃ NỘP BÀI TẬP / tổng số bài con.
 * Mẫu số lấy từ danh mục ở `giaotrinh-index.js` (frontend mới biết), tử số từ `da_hoc` server trả.
 * ⚠️ "Đã học" ở đây nghĩa là ĐÃ NỘP BÀI TẬP của bài đó — hệ thống không có chỗ nào ghi
 *    "đã đọc xong tab Từ vựng", nên đừng diễn giải con số này thành "đã học hết bài".
 */
function ltTienDoBo(daHoc) {
  const tap = new Set(daHoc || []);
  return [
    { id: 'thoidai', ten: 'Thời Đại', han: '時代華語', page: 'tocfl-thoidai', subs: thoidaiSubLessons },
  ].map((b) => {
    const xong = b.subs.filter((s) => tap.has(s.id)).length;
    return { ...b, xong, tong: b.subs.length, pt: b.subs.length ? Math.round((xong / b.subs.length) * 100) : 0 };
  });
}

/**
 * CHỨNG CHỈ HOÀN THÀNH QUYỂN (2026-09-16)
 *
 * Tính RUNTIME từ `exercise_results`, không có bảng nào lưu — cùng nguyên tắc với huy hiệu (4.38):
 * chứng chỉ luôn khớp với số liệu ở trang Tiến độ, không bao giờ có chuyện hai nơi nói hai kiểu.
 *
 * Điều kiện cố ý ĐƠN GIẢN và nói thẳng được bằng một câu: làm đủ MỌI bài con của quyển, mỗi bài
 * đạt tối thiểu 60%. Đặt ngưỡng theo điểm trung bình thì học viên không tự kiểm được mình còn
 * thiếu gì; theo từng bài thì màn hình chỉ ra đúng bài nào chưa đạt.
 */
const CC_NGUONG = 60;

/** Quyển của một bài con. Suy từ chính id bài ('td2-5.1' -> quyển 2). */
function ccQuyenCua(subId) {
  if (!subId || subId.includes(':')) return null;
  const m = String(subId).match(/^td(\d+)-/);
  return m ? { bo: 'thoidai', quyen: Number(m[1]) } : null;
}

/** Danh sách quyển kèm tiến độ + trạng thái chứng chỉ. */
function ltChungChi(daHoc, diemBai) {
  const diem = diemBai || {};
  const tap = new Set(daHoc || []);
  const BO = [
    { id: 'thoidai', ten: 'Giáo trình Thời Đại', han: '時代華語', subs: thoidaiSubLessons, sach: thoidaiBooks },
  ];
  const ds = [];
  for (const b of BO) {
    const theoQuyen = new Map();
    for (const s of b.subs) {
      const q = ccQuyenCua(s.id);
      if (!q || q.bo !== b.id) continue;
      if (!theoQuyen.has(q.quyen)) theoQuyen.set(q.quyen, []);
      theoQuyen.get(q.quyen).push(s.id);
    }
    for (const [quyen, subs] of [...theoQuyen.entries()].sort((a, c) => a[0] - c[0])) {
      const dat = subs.filter((id) => tap.has(id) && (diem[id] ?? 0) >= CC_NGUONG);
      const daLamChuaDat = subs.filter((id) => tap.has(id) && (diem[id] ?? 0) < CC_NGUONG);
      const sach = (b.sach || []).find((x) => Number(x.id) === quyen);
      ds.push({
        bo: b.id, boTen: b.ten, han: b.han, quyen,
        ten: sach?.title || `${b.ten} ${quyen}`,
        capDo: sach?.level || '',
        tong: subs.length, xong: dat.length,
        chua_dat: daLamChuaDat.length,
        pt: subs.length ? Math.round((dat.length / subs.length) * 100) : 0,
        du: subs.length > 0 && dat.length === subs.length,
      });
    }
  }
  return ds;
}

/**
 * Mã xác thực chứng chỉ — hàm băm ngắn từ (id học viên + quyển). Mục đích là để người xem đối
 * chiếu chứ KHÔNG phải để chống giả mạo: dữ liệu nằm cả ở client nên ai cũng tính lại được.
 * Muốn chống giả thật thì phải ký ở server và có trang tra cứu công khai — việc khác.
 */
function ccMaXacThuc(userId, bo, quyen) {
  const s = `ten-${userId}-${bo}-${quyen}`;
  let h = 0;
  for (let i = 0; i < s.length; i++) { h = ((h << 5) - h + s.charCodeAt(i)) | 0; }
  return (bo.slice(0, 2).toUpperCase() + quyen + '-' + Math.abs(h).toString(36).toUpperCase()).slice(0, 12);
}

/** Bài con KẾ TIẾP chưa nộp bài tập của bộ đang học dở — ruột của gợi ý "học tiếp". */
function ltBaiKeTiep(daLam, ganDay) {
  const tap = new Set(daLam || []);
  const bo = { subs: thoidaiSubLessons, page: 'tocfl-thoidai', ten: 'Thời Đại' };
  const sub = bo.subs.find((s) => !tap.has(s.id));
  return sub ? { ...bo, sub } : null;
}

// ============================================================
// 1. TỔNG QUAN — /lo-trinh/tong-quan
// ============================================================

function renderPathOverview(el) { ltNap('path-overview', _ltVeTongQuan); }

function _ltVeTongQuan(el, d) {
  const bo = ltTienDoBo(d.da_hoc);
  // Hai loại "thời gian" KHÁC NHAU, đừng gộp làm một:
  //   · `giay_lam`  = tổng `time_seconds` của các bài đã nộp — chỉ đếm lúc ĐANG LÀM BÀI;
  //   · `giayTrong` = tổng nhịp đo hoạt động — đếm cả lúc đọc từ vựng, nghe hội thoại.
  // Bản đầu gọi `giay_lam` là "tổng giờ học" nên tài khoản nào chưa từng bấm nộp bài lại hiện
  // "Bạn đã học 3 giây" — vừa sai vừa làm người học nản.
  const giayTrong = (d.lich || []).reduce((t, r) => t + Number(r.giay || 0), 0);
  const tongXong = bo.reduce((s, b) => s + b.xong, 0);
  const tongBai = bo.reduce((s, b) => s + b.tong, 0);
  el.innerHTML = `
    <div class="lt-page">
      <div class="tv-hero lt-hero">
        <div class="tv-hero-text">
          <span class="tv-hero-badge"><i class="fa-solid fa-route"></i> ${tdEsc(d.user.level_label || '')}</span>
          <h1>Chào ${tdEsc(d.user.name || 'bạn')}</h1>
          <p>Bạn đã làm <strong>${ltSo(d.tong.so_bai)}</strong> lượt bài${giayTrong ? `, ở trong app <strong>${ltGio(giayTrong)}</strong>` : ''}
             và đi được <strong>${tongXong}/${tongBai}</strong> bài của ba bộ giáo trình.</p>
        </div>
        <div class="lt-hero-streak">
          <div class="lt-streak-num">${d.user.streak || 0}</div>
          <div class="lt-streak-lb">ngày liên tiếp</div>
          ${d.user.longest_streak > (d.user.streak || 0)
            ? `<div class="lt-streak-max">Kỷ lục ${d.user.longest_streak}</div>` : ''}
        </div>
      </div>

      <div class="lt-o-grid">
        ${giayTrong
          ? _ltOHtml('fa-clock', 'Thời gian trong app', ltGio(giayTrong), 'primary')
          : _ltOHtml('fa-clock', 'Giờ làm bài', ltGio(d.tong.giay_lam), 'primary')}
        ${_ltOHtml('fa-list-check', 'Bài đã làm', ltSo(d.tong.so_bai), 'success')}
        ${_ltOHtml('fa-percent', 'Điểm TB 30 ngày',
          d.gan_day.so_bai ? `${d.gan_day.diem_tb}%` : '—', 'seal')}
        ${_ltOHtml('fa-bookmark', 'Từ trong sổ tay', ltSo(d.so_tay), 'warning')}
      </div>

      ${_ltViecHtml(d)}
      ${_ltLichNhietHtml(d.lich)}

      <div class="lt-card">
        <h3><i class="fa-solid fa-book-open"></i> Tiến độ ba bộ giáo trình</h3>
        <p class="lt-ghi-chu">Một bài được tính là đã học khi bạn <strong>nộp bài tập</strong> của bài đó.
           Đọc từ vựng hay ngữ pháp không để lại dấu vết nào trong hệ thống, nên không tính được.</p>
        ${bo.map((b) => `
          <div class="lt-bo" onclick="window.app.navigate('${b.page}')">
            <div class="lt-bo-top">
              <span class="lt-bo-ten">${b.ten} <span class="font-tc">${b.han}</span></span>
              <span class="lt-bo-so">${b.xong}/${b.tong} bài · ${b.pt}%</span>
            </div>
            <div class="tw-bar"><i style="width:${b.pt}%"></i></div>
          </div>`).join('')}
      </div>

      ${d.diem_yeu.length ? `
        <div class="lt-card">
          <h3><i class="fa-solid fa-arrow-trend-down"></i> Nên làm lại</h3>
          <p class="lt-ghi-chu">Lấy lần làm <strong>mới nhất</strong> của mỗi bài, không tính các lần làm lại trước đó.</p>
          <div class="lt-ds">
            ${d.diem_yeu.map((b) => `
              <button class="lt-dong" onclick="window.app.openAssignment('${tdNhay(b.lesson_id)}')">
                <span class="lt-dong-ten">${tdEsc(ltNhanBai(b.lesson_id))}</span>
                <span class="lt-diem ${_ltMauDiem(b.score_percent)}">${Math.round(b.score_percent)}%</span>
                <i class="fa-solid fa-chevron-right"></i>
              </button>`).join('')}
          </div>
        </div>` : ''}
    </div>`;
}

const _ltOHtml = (icon, nhan, gt, mau) => `
  <div class="lt-o">
    <div class="tw-ic is-${mau}"><i class="fa-solid ${icon}"></i></div>
    <div><div class="lt-o-gt">${gt}</div><div class="lt-o-nhan">${nhan}</div></div>
  </div>`;

const _ltMauDiem = (p) => (p >= 80 ? 'is-tot' : p >= 50 ? 'is-vua' : 'is-kem');

/** Khối "việc cần làm" rút gọn ở Tổng quan — bản đầy đủ nằm ở trang Hôm nay / Bài tập. */
function _ltViecHtml(d) {
  const viec = [];
  if (d.bai_giao_chua_nop) {
    viec.push({ icon: 'fa-list-check', mau: 'seal', chu: `<strong>${d.bai_giao_chua_nop}</strong> bài cô giao chưa nộp`,
      nut: 'Xem bài tập', page: 'path-homework' });
  }
  if (d.srs.den_han) {
    viec.push({ icon: 'fa-rotate', mau: 'primary', chu: `<strong>${d.srs.den_han}</strong> từ đến hạn ôn lại`,
      nut: 'Ôn ngay', page: 'path-today' });
  }
  if (!viec.length) {
    viec.push({ icon: 'fa-mug-hot', mau: 'success', chu: 'Không còn việc nào đến hạn. Học tiếp bài mới nhé!',
      nut: 'Bài hôm nay', page: 'path-today' });
  }
  return `<div class="lt-viec">
    ${viec.map((v) => `
      <div class="lt-viec-dong">
        <div class="tw-ic is-${v.mau}"><i class="fa-solid ${v.icon}"></i></div>
        <span>${v.chu}</span>
        <button class="btn btn-sm btn-primary" onclick="window.app.navigate('${v.page}')">${v.nut}</button>
      </div>`).join('')}
  </div>`;
}

/**
 * Lịch nhiệt 12 tuần. Vẽ bằng lưới CSS chứ không dùng thư viện chart — dự án đã có tiền lệ
 * tự vẽ biểu đồ thanh điệu bằng SVG tay (4.11b), thêm một thư viện chart cho một khối này là
 * không đáng.
 *
 * Mức đậm tính theo PHÚT học của ngày đó; ngày chỉ có bài nộp mà chưa có nhịp đo (dữ liệu
 * trước ngày triển khai nhịp đo) vẫn được tô mức 1 để lịch không thủng lỗ oan.
 */
const LT_THU = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'];
const LT_THU_DAY = ['Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy', 'Chủ Nhật'];
/** Mốc phút của 4 mức đậm — dùng CHUNG cho việc tô ô và cho chú giải, đừng khai hai nơi. */
const LT_MUC = [
  { min: 45, nhan: 'trên 45 phút' },
  { min: 20, nhan: '20–45 phút' },
  { min: 5, nhan: '5–20 phút' },
  { min: 1, nhan: 'dưới 5 phút' },
];

function _ltLichNhietHtml(lich) {
  const map = new Map((lich || []).map((r) => [r.ngay, r]));
  const homNay = new Date(); homNay.setHours(0, 0, 0, 0);
  // Bắt đầu từ Thứ Hai của 12 tuần trước để cột nào cũng đủ 7 ô và hàng đầu luôn là Thứ Hai.
  const bd = new Date(homNay);
  bd.setDate(bd.getDate() - 83);
  bd.setDate(bd.getDate() - ((bd.getDay() + 6) % 7));
  const o = [];
  for (let d = new Date(bd); d <= homNay; d.setDate(d.getDate() + 1)) {
    const k = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const r = map.get(k);
    const phut = r ? Math.round(r.giay / 60) : 0;
    // Ngày chỉ có bài nộp mà chưa có nhịp đo (dữ liệu trước ngày triển khai nhịp đo) vẫn được
    // tô mức 1 để lịch không thủng lỗ oan — `findIndex` trả -1 chính là trường hợp đó.
    // `LT_MUC` xếp giảm dần [45, 20, 5, 1] nên mức = số phần tử − chỉ số khớp: 4, 3, 2, 1.
    let muc = 0;
    if (r) {
      const i = LT_MUC.findIndex((m) => phut >= m.min);
      muc = i === -1 ? 1 : LT_MUC.length - i;
    }
    o.push({ d: new Date(d), muc, phut, bai: r ? r.bai : 0 });
  }

  const soCot = Math.ceil(o.length / 7);
  const soNgay = o.filter((x) => x.muc > 0).length;
  const tongPhut = o.reduce((t, x) => t + x.phut, 0);
  let tuanCoHoc = 0;
  for (let c = 0; c < soCot; c++) if (o.slice(c * 7, c * 7 + 7).some((x) => x.muc > 0)) tuanCoHoc++;

  // Nhãn THÁNG: cột nào mà ô hàng đầu (Thứ Hai) rơi sang tháng mới thì ghi tên tháng ở đó.
  // Tháng bắt đầu giữa tuần sẽ lệch tối đa một cột — đây là cách mọi lịch nhiệt đều làm.
  const nhanThang = [];
  let thangTruoc = -1;
  for (let c = 0; c < soCot; c++) {
    const dd = o[c * 7] && o[c * 7].d;
    if (!dd) continue;
    if (dd.getMonth() !== thangTruoc) {
      thangTruoc = dd.getMonth();
      nhanThang.push({ cot: c, ten: `Tháng ${dd.getMonth() + 1}` });
    }
  }
  // Nhãn đầu tiên dễ bị cắt nếu tháng đó chỉ còn 1-2 cột trong khung — bỏ đi cho gọn.
  if (nhanThang.length > 1 && nhanThang[1].cot < 2) nhanThang.shift();

  const oHtml = o.map((x, i) => {
    const thu = LT_THU_DAY[i % 7];
    const ng = `${x.d.getDate()}/${x.d.getMonth() + 1}`;
    const chiTiet = x.muc === 0 ? 'chưa học'
      : [x.phut ? `${x.phut} phút` : null, x.bai ? `${x.bai} bài` : null].filter(Boolean).join(' · ') || 'có học';
    return `<span class="lt-o-lich lt-m${x.muc}${i === o.length - 1 ? ' la-hom-nay' : ''}"
      title="${thu} ${ng} — ${chiTiet}"></span>`;
  }).join('');

  return `
    <div class="lt-card">
      <h3><i class="fa-solid fa-calendar-check"></i> Thời gian học 12 tuần gần đây</h3>

      <div class="lt-nhiet-so">
        <div><strong>${soNgay}</strong> ngày có học</div>
        <div><strong>${tuanCoHoc}/${soCot}</strong> tuần có học</div>
        ${tongPhut ? `<div><strong>${ltGio(tongPhut * 60)}</strong> tổng thời gian</div>` : ''}
      </div>

      <div class="lt-nhiet-khung" style="--lt-cot:${soCot}">
        <div class="lt-nhiet-thang">
          ${nhanThang.map((t) => `<span style="grid-column:${t.cot + 1}">${t.ten}</span>`).join('')}
        </div>
        <div class="lt-nhiet-thu">
          ${LT_THU.map((t, i) => `<span>${i % 2 === 0 ? t : ''}</span>`).join('')}
        </div>
        <div class="lt-nhiet" role="img"
             aria-label="Lịch hoạt động 12 tuần: ${soNgay} ngày có học trên ${o.length} ngày">
          ${oHtml}
        </div>
      </div>

      <div class="lt-nhiet-chu">
        <span><span class="lt-o-lich lt-m0"></span> Chưa học</span>
        ${LT_MUC.slice().reverse().map((m, i) => `<span><span class="lt-o-lich lt-m${i + 1}"></span> ${m.nhan}</span>`).join('')}
        <span class="lt-nhiet-chu-nay"><span class="lt-o-lich lt-m0 la-hom-nay"></span> Hôm nay</span>
      </div>

      ${!tongPhut && soNgay ? `<p class="lt-ghi-chu" style="margin:12px 0 0">Những ngày này được
        đánh dấu nhờ bài bạn đã nộp. Hệ thống chỉ bắt đầu <strong>đo thời gian học</strong> từ
        2026-09-08, nên các buổi học trước đó không có số phút.</p>` : ''}
    </div>`;
}

// ============================================================
// 2. BÀI HỌC HÔM NAY — /lo-trinh/hom-nay
// ============================================================

function renderPathToday(el) {
  // Đang trong phiên ôn thì vẽ thẳng phiên ôn, đừng nạp lại và đá học viên ra giữa chừng.
  if (ltState.onTap) return _ltVeOnTap(el);
  ltNap('path-today', _ltVeHomNay);
}

function _ltVeHomNay(el, d) {
  const chuaNop = (d.bai_giao || []).filter((b) => !b.submitted);
  const denHan = chuaNop.filter((b) => { const n = ltConLai(b.due_date); return n === null || n <= 3; });
  const keTiep = ltBaiKeTiep(d.da_lam, d.gan_day);
  const soOn = d.srs.den_han + Math.min(d.srs.tu_moi, 10);

  const viec = [];
  if (denHan.length) {
    viec.push({
      id: 'bai-giao', icon: 'fa-list-check', mau: 'seal',
      ten: `Nộp ${denHan.length} bài cô giao`,
      mo: denHan.slice(0, 3).map((b) => `${assignmentLabel(b)}${b.class_name ? ` · ${b.class_name}` : ''}`).join(' · '),
      xong: false,
      nut: `<button class="btn btn-primary btn-sm" onclick="window.app.openAssignment('${tdNhay(denHan[0].lesson_id)}')">Làm ngay</button>
            <button class="btn btn-sm" onclick="window.app.navigate('path-homework')">Xem tất cả</button>`,
    });
  }
  if (soOn) {
    viec.push({
      id: 'on-tu', icon: 'fa-rotate', mau: 'primary',
      ten: `Ôn ${soOn} từ`,
      mo: `${d.srs.den_han} từ đến hạn${d.srs.tu_moi ? ` · ${Math.min(d.srs.tu_moi, 10)} từ mới từ sổ tay` : ''}`,
      xong: false,
      nut: '<button class="btn btn-primary btn-sm" onclick="window.app.ltBatDauOn()">Ôn ngay</button>',
    });
  }
  if (keTiep) {
    viec.push({
      id: 'bai-moi', icon: 'fa-book-open', mau: 'success',
      ten: `Học tiếp: ${keTiep.sub.title || ltNhanBai(keTiep.sub.id)}`,
      mo: `${keTiep.ten} · bài kế tiếp bạn chưa làm bài tập`,
      xong: false,
      nut: `<button class="btn btn-primary btn-sm" onclick="window.app.openAssignment('${tdNhay(keTiep.sub.id)}')">Vào học</button>`,
    });
  }
  viec.push({
    id: 'nhe', icon: 'fa-gamepad', mau: 'warning',
    ten: '5 phút luyện nhẹ',
    mo: 'Luyện phát âm hoặc chơi game từ vựng — đủ để giữ chuỗi ngày',
    xong: false,
    nut: `<button class="btn btn-sm" onclick="window.app.navigate('pron-thanhdieu')">Phát âm</button>
          <button class="btn btn-sm" onclick="window.app.navigate('tocfl-thoidai')">Game từ vựng</button>`,
  });

  const h = d.hom_nay;
  const datGiay = h.giay >= h.nguong_giay;
  const datLuot = h.so_lan >= h.nguong_luot;
  const daTinh = h.so_bai > 0 || (datGiay && datLuot);

  el.innerHTML = `
    <div class="lt-page">
      <div class="lt-head">
        <div>
          <h2 class="lt-title">Bài học hôm nay</h2>
          <p class="lt-sub">${new Date().toLocaleDateString('vi-VN', { weekday: 'long', day: 'numeric', month: 'numeric', year: 'numeric' })}</p>
        </div>
        <button class="btn btn-sm btn-outline" onclick="window.app.navigate('path-overview')">
          <i class="fa-solid fa-chart-pie"></i> Tổng quan</button>
      </div>

      <div class="lt-card lt-ngay ${daTinh ? 'is-dat' : ''}">
        <div class="lt-ngay-top">
          <div class="tw-ic is-${daTinh ? 'success' : 'primary'}">
            <i class="fa-solid ${daTinh ? 'fa-circle-check' : 'fa-fire'}"></i></div>
          <div>
            <div class="lt-ngay-ten">${daTinh ? 'Hôm nay đã được tính vào chuỗi ngày' : 'Chưa đủ để tính vào chuỗi ngày'}</div>
            <div class="lt-ngay-mo">${daTinh
              ? (h.so_bai ? `Bạn đã nộp ${h.so_bai} bài hôm nay.` : `Bạn đã học ${ltGio(h.giay)} và mở ${h.so_lan} lượt trang.`)
              : `Cần <strong>nộp 1 bài</strong>, hoặc học đủ <strong>5 phút</strong> và mở <strong>3 lượt trang</strong>.`}</div>
          </div>
        </div>
        ${daTinh ? '' : `
          <div class="lt-ngay-thanh">
            <div class="lt-ngay-muc">
              <span>Thời gian ${ltGio(h.giay)} / 5 phút</span>
              <div class="tw-bar"><i style="width:${Math.min(100, (h.giay / h.nguong_giay) * 100)}%"></i></div>
            </div>
            <div class="lt-ngay-muc">
              <span>Lượt trang ${h.so_lan} / ${h.nguong_luot}</span>
              <div class="tw-bar"><i style="width:${Math.min(100, (h.so_lan / h.nguong_luot) * 100)}%"></i></div>
            </div>
          </div>`}
      </div>

      <div class="lt-viec-ds">
        ${viec.map((v, i) => `
          <div class="lt-viec-the">
            <span class="lt-viec-so">${i + 1}</span>
            <div class="tw-ic is-${v.mau}"><i class="fa-solid ${v.icon}"></i></div>
            <div class="lt-viec-noi">
              <div class="lt-viec-ten">${tdEsc(v.ten)}</div>
              <div class="lt-viec-mo">${tdEsc(v.mo)}</div>
            </div>
            <div class="lt-viec-nut">${v.nut}</div>
          </div>`).join('')}
      </div>

      <div id="lt-lich"></div>

      <p class="tv-note"><i class="fa-solid fa-circle-info"></i>
        <span>Kế hoạch hôm nay dựa trên tiến độ của bạn: bài giáo viên giao đến hạn, từ đến hạn
        ôn theo lịch giãn cách, và bài kế tiếp bạn chưa làm. Bạn có thể học theo thứ tự khác.</span></p>
    </div>`;

  // Lịch học nạp SAU, điền vào ô trống — không để cả trang chờ một request phụ. Học viên không
  // thuộc lớp nào thì khối này không hiện gì (phần lớn người dùng tự học, không ở trung tâm).
  _ltNapLich();
}

// ---------- lịch buổi học của lớp (2026-09-16) ----------
// `class_sessions` + `class_attendance` lưu lịch và điểm danh từ 2026-08-25, nhưng học viên chưa
// bao giờ xem được: `/profile/my-classes` chỉ ĐẾM số buổi. Trung tâm nhập lịch vào hệ thống rồi
// vẫn phải nhắn Zalo cho các em "mai học lúc mấy giờ".

const _LT_TT = {
  present: ['Có mặt', 'is-co'], absent: ['Vắng', 'is-vang'],
};

function _ltNgayNgan(d) {
  if (!d) return '';
  const t = new Date(d);
  return t.toLocaleDateString('vi-VN', { weekday: 'short', day: 'numeric', month: 'numeric' });
}

async function _ltNapLich() {
  let d;
  try { d = await api.get('/lo-trinh/lich-hoc'); }
  catch (_) { return; }                       // lỗi phụ: im lặng, không làm hỏng trang chính
  const el = document.getElementById('lt-lich');
  if (!el || state.currentPage !== 'path-today') return;
  if (!d.lop || !d.lop.length) return;        // không thuộc lớp nào -> không hiện gì

  const cc = d.chuyen_can;
  const sapToi = (d.sap_toi || []).slice(0, 4);
  const daQua = (d.da_qua || []).slice(0, 5);

  el.innerHTML = `
    <div class="lt-card lt-lich">
      <div class="lt-lich-head">
        <div class="tw-ic is-primary"><i class="fa-solid fa-calendar-days"></i></div>
        <div>
          <div class="lt-viec-ten">Lịch học ${d.lop.length > 1 ? `(${d.lop.length} lớp)` : `· ${tdEsc(d.lop[0].name)}`}</div>
          ${cc ? `<div class="lt-viec-mo">Đã điểm danh ${cc.da_diem_danh} buổi · có mặt ${cc.co_mat}${
            cc.vang ? ` · vắng ${cc.vang}` : ''}${cc.di_muon ? ` · đi muộn ${cc.di_muon}` : ''}</div>` : ''}
        </div>
        ${cc ? `<span class="lt-lich-ti ${cc.ti_le >= 90 ? 'is-tot' : cc.ti_le >= 70 ? 'is-vua' : 'is-kem'}">${cc.ti_le}%</span>` : ''}
      </div>

      ${sapToi.length ? `
        <div class="lt-lich-nhom">
          <div class="lt-lich-nhan">Buổi sắp tới</div>
          ${sapToi.map((b) => `
            <div class="lt-lich-dong ${b.con_ngay === 0 ? 'is-homnay' : ''}">
              <span class="lt-lich-ngay">${b.con_ngay === 0 ? 'Hôm nay'
                : b.con_ngay === 1 ? 'Ngày mai' : _ltNgayNgan(b.session_date)}</span>
              <span class="lt-lich-noi">${tdEsc(b.topic || 'Chưa đặt chủ đề')}
                ${d.lop.length > 1 ? `<span class="lt-lich-lop">${tdEsc(b.lop_ten)}</span>` : ''}</span>
            </div>`).join('')}
        </div>` : '<p class="lt-lich-trong">Chưa có buổi nào được xếp lịch.</p>'}

      ${daQua.length ? `
        <details class="lt-lich-qua">
          <summary>Buổi đã học (${daQua.length})</summary>
          ${daQua.map((b) => {
            const [nhan, cls] = _LT_TT[b.status] || ['Chưa điểm danh', 'is-chua'];
            return `<div class="lt-lich-dong">
              <span class="lt-lich-ngay">${_ltNgayNgan(b.session_date)}</span>
              <span class="lt-lich-noi">${tdEsc(b.topic || '—')}
                ${b.teacher_note ? `<span class="lt-lich-phe">${tdEsc(b.teacher_note)}</span>` : ''}</span>
              <span class="lt-lich-tt ${cls}">${nhan}${b.is_late ? ' · muộn' : ''}</span>
            </div>`;
          }).join('')}
        </details>` : ''}
    </div>`;
}

// ---------- phiên ôn tập ngắt quãng (SRS) ----------
// Nằm trong trang "Hôm nay" vì đó là chỗ học viên được nhắc ôn. Thuật toán giãn cách chạy ở
// server (SM-2, server/routes/srs.js); ở đây chỉ lật thẻ và gửi mức đánh giá.

async function ltBatDauOn() {
  const el = document.getElementById('page-content');
  if (el) el.innerHTML = ltSkeleton();
  try {
    const d = await api.get('/srs/hom-nay?limit=20');
    if (!d.the || !d.the.length) {
      ltState.onTap = null;
      toast('Chưa có từ nào đến hạn ôn. Lưu thêm từ vào sổ tay nhé!');
      return renderPathToday(document.getElementById('page-content'));
    }
    ltState.onTap = { the: d.the, idx: 0, lat: false, dung: 0, xong: 0, batDau: Date.now() };
    _ltVeOnTap(document.getElementById('page-content'));
  } catch (e) {
    toast('Không tải được thẻ ôn tập.');
    renderPathToday(document.getElementById('page-content'));
  }
}

function _ltVeOnTap(el) {
  const o = ltState.onTap;
  if (!o) return renderPathToday(el);
  if (o.idx >= o.the.length) {
    const pt = o.xong ? Math.round((o.dung / o.xong) * 100) : 0;
    el.innerHTML = `
      <div class="lt-page">
        <div class="tv-quiz-done">
          <div class="tv-score ${pt >= 80 ? 'good' : pt >= 50 ? 'ok' : 'bad'}">${pt}%</div>
          <p>Nhớ được <strong>${o.dung}</strong> / ${o.xong} từ · ${ltGio((Date.now() - o.batDau) / 1000)}</p>
          <p class="lt-ghi-chu">Từ bạn bấm “Quên” sẽ quay lại ngay hôm nay; từ “Dễ” phải vài ngày nữa mới gặp lại.</p>
          <div class="tv-quiz-actions">
            <button class="btn btn-primary" onclick="window.app.ltBatDauOn()"><i class="fa-solid fa-rotate-right"></i> Ôn tiếp</button>
            <button class="btn" onclick="window.app.ltThoatOn()">Xong</button>
          </div>
        </div>
      </div>`;
    return;
  }
  const t = o.the[o.idx];
  const hien = getDisplayText(t.tu, t.gian || t.tu);
  el.innerHTML = `
    <div class="lt-page lt-on">
      <div class="lt-on-top">
        <button class="btn btn-sm" onclick="window.app.ltThoatOn()"><i class="fa-solid fa-xmark"></i> Thoát</button>
        <span class="dd-vocab-count">Thẻ ${o.idx + 1} / ${o.the.length}</span>
        ${t.la_moi ? '<span class="tw-chip is-success">Từ mới</span>'
          : `<span class="tw-chip">Đã ôn ${t.total_reviews || 0} lần</span>`}
      </div>
      <div class="tw-bar"><i style="width:${(o.idx / o.the.length) * 100}%"></i></div>

      <div class="dd-fc-container">
        <div class="dd-fc-card${o.lat ? ' flipped' : ''}" onclick="window.app.ltLatThe()">
          <div class="dd-fc-card-inner">
            <div class="dd-fc-front">
              <div class="tv-fc-hanzi font-tc">${tdEsc(hien)}</div>
              <button class="dd-btn-speak tv-fc-speak"
                onclick="event.stopPropagation(); window.app.ddSpeakWord('${tdNhay(hien)}', null, null, 'zh-TW')">
                <i class="fa-solid fa-volume-high"></i></button>
            </div>
            <div class="dd-fc-back">
              <div class="tv-fc-pinyin">${tdEsc(t.pinyin || '')}</div>
              ${t.han_viet ? `<div class="luy-hv">${tdEsc(t.han_viet)}</div>` : ''}
              <div class="tv-fc-def">${tdEsc(t.nghia || '')}</div>
            </div>
          </div>
        </div>
      </div>

      ${o.lat ? `
        <div class="lt-on-nut">
          <button class="lt-on-btn is-quen" onclick="window.app.ltChamThe(1)"><b>Quên</b><span>gặp lại hôm nay</span></button>
          <button class="lt-on-btn is-kho" onclick="window.app.ltChamThe(2)"><b>Khó</b><span>gặp lại sớm</span></button>
          <button class="lt-on-btn is-nho" onclick="window.app.ltChamThe(3)"><b>Nhớ</b><span>giãn ra</span></button>
          <button class="lt-on-btn is-de" onclick="window.app.ltChamThe(4)"><b>Dễ</b><span>giãn nhiều</span></button>
        </div>`
      : `<div class="dd-fc-controls">
          <button class="btn btn-primary btn-lg" onclick="window.app.ltLatThe()">Xem nghĩa</button>
        </div>`}
      <p class="dd-fc-hint">Nhấn vào thẻ để lật<span class="fc-hint-kb"> · Space lật · phím 1-4 chấm mức nhớ</span></p>
    </div>`;
}

function ltLatThe() {
  if (!ltState.onTap) return;
  ltState.onTap.lat = !ltState.onTap.lat;
  _ltVeOnTap(document.getElementById('page-content'));
}

/** Chấm một thẻ rồi sang thẻ kế. Gửi lên server KHÔNG chờ — lỗi mạng không được chặn nhịp ôn. */
function ltChamThe(rating) {
  const o = ltState.onTap;
  if (!o || !o.lat) return;
  const t = o.the[o.idx];
  o.xong += 1;
  if (rating >= 3) o.dung += 1;
  api.post('/srs/on', {
    tu: t.tu, rating, gian: t.gian, pinyin: t.pinyin, han_viet: t.han_viet,
    nghia: t.nghia, nguon: t.nguon,
  }).catch((e) => {
    // Không nuốt im: mất mạng thì lượt ôn này không vào lịch, học viên cần biết.
    console.warn('Không ghi được lượt ôn:', e);
    toast('Chưa lưu được lượt ôn này lên tài khoản.');
  });
  // "Quên" thì đẩy thẻ xuống cuối để gặp lại ngay trong phiên — đúng cách một buổi ôn hoạt động.
  if (rating === 1) o.the.push({ ...t, la_moi: 0 });
  o.idx += 1;
  o.lat = false;
  _ltVeOnTap(document.getElementById('page-content'));
}

function ltThoatOn() {
  ltState.onTap = null;
  renderPathToday(document.getElementById('page-content'));
}

// ============================================================
// 3. BÀI TẬP CẦN HOÀN THÀNH — /lo-trinh/bai-tap
// ============================================================

function renderPathHomework(el) { ltNap('path-homework', _ltVeBaiTap); }

const LT_BT_LOC = [
  { id: 'can-lam', ten: 'Cần làm' },
  { id: 'qua-han', ten: 'Quá hạn' },
  { id: 'diem-thap', ten: 'Điểm thấp' },
  { id: 'nhan-xet', ten: 'Nhận xét mới' },
  { id: 'xong', ten: 'Đã nộp' },
];

function _ltVeBaiTap(el, d) {
  const giao = d.bai_giao || [];
  const chuaNop = giao.filter((b) => !b.submitted);
  const quaHan = chuaNop.filter((b) => (ltConLai(b.due_date) ?? 99) < 0);
  const daNop = giao.filter((b) => b.submitted);
  const dem = {
    'can-lam': chuaNop.length, 'qua-han': quaHan.length,
    'diem-thap': (d.diem_thap || []).length, 'nhan-xet': (d.nhan_xet_chua_doc || []).length,
    xong: daNop.length,
  };
  const loc = ltState.btLoc;
  let than = '';
  if (loc === 'diem-thap') {
    than = (d.diem_thap || []).length
      ? `<div class="lt-ds">${d.diem_thap.map((b) => `
          <button class="lt-dong" onclick="window.app.openAssignment('${tdNhay(b.lesson_id)}')">
            <span class="lt-dong-ten">${tdEsc(ltNhanBai(b.lesson_id))}
              <em>${b.correct_answers}/${b.total_questions} câu · ${ltNgay(b.created_at)}</em></span>
            <span class="lt-diem ${_ltMauDiem(b.score_percent)}">${Math.round(b.score_percent)}%</span>
            <i class="fa-solid fa-chevron-right"></i>
          </button>`).join('')}</div>`
      : _ltRongHtml('fa-face-smile', 'Không có bài nào dưới 60%. Tốt lắm!');
  } else if (loc === 'nhan-xet') {
    than = (d.nhan_xet_chua_doc || []).length
      ? `<div class="lt-ds">${d.nhan_xet_chua_doc.map((b) => `
          <div class="lt-dong is-tinh">
            <span class="lt-dong-ten">${tdEsc(b.loai === 'exam' ? 'Bài thi thử' : ltNhanBai(b.lesson_id))}
              <em>${tdEsc(String(b.teacher_review || '').slice(0, 90))}</em></span>
            <span class="lt-diem ${_ltMauDiem(b.score_percent)}">${Math.round(b.score_percent)}%</span>
            <button class="btn btn-sm btn-primary" onclick="window.app.toggleNotifications()">Đọc</button>
          </div>`).join('')}</div>`
      : _ltRongHtml('fa-envelope-open', 'Không có lời phê nào chưa đọc.');
  } else {
    const ds = loc === 'qua-han' ? quaHan : loc === 'xong' ? daNop : chuaNop;
    than = ds.length
      ? `<div class="lt-ds">${ds.map((b) => `
          <button class="lt-dong" onclick="window.app.openAssignment('${tdNhay(b.lesson_id)}')">
            <span class="lt-dong-ten">${tdEsc(assignmentLabel(b))}
              <em>${tdEsc(b.class_name || '')}${b.note ? ` · ${tdEsc(b.note)}` : ''}</em></span>
            ${b.submitted
              ? `<span class="lt-diem ${_ltMauDiem(b.diem_cao_nhat || 0)}">${Math.round(b.diem_cao_nhat || 0)}%</span>`
              : ltHanHtml(b.due_date)}
            <i class="fa-solid fa-chevron-right"></i>
          </button>`).join('')}</div>`
      : _ltRongHtml('fa-mug-hot', loc === 'xong' ? 'Chưa nộp bài cô giao nào.'
        : loc === 'qua-han' ? 'Không có bài nào quá hạn.' : 'Không còn bài cô giao nào chưa nộp.');
  }

  el.innerHTML = `
    <div class="lt-page">
      <div class="lt-head">
        <div>
          <h2 class="lt-title">Bài tập cần hoàn thành</h2>
          <p class="lt-sub">Gộp bài cô giao, bài nên làm lại và lời phê chưa đọc.</p>
        </div>
      </div>
      <div class="kv-bo-tabs">
        ${LT_BT_LOC.map((f) => `<button class="lesson-tab${loc === f.id ? ' active' : ''}"
          onclick="window.app.ltBtLoc('${f.id}')">${f.ten}${dem[f.id] ? ` (${dem[f.id]})` : ''}</button>`).join('')}
      </div>
      ${than}
      ${!giao.length ? `<p class="tv-note"><i class="fa-solid fa-circle-info"></i>
        <span>Bạn chưa thuộc lớp nào, hoặc giáo viên chưa giao bài. Mục <strong>Điểm thấp</strong>
        vẫn dùng được — nó lấy từ chính các bài bạn đã tự làm.</span></p>` : ''}
    </div>`;
}

const _ltRongHtml = (icon, chu) => `<div class="tv-empty"><i class="fa-solid ${icon}"></i><p>${chu}</p></div>`;

function ltBtLoc(id) {
  ltState.btLoc = id;
  const d = ltState.duLieu['path-homework'];
  if (d) _ltVeBaiTap(document.getElementById('page-content'), d);
}

// ============================================================
// 4. TIẾN ĐỘ — /lo-trinh/tien-do
// ============================================================

function renderPathProgress(el) { ltNap('path-progress', _ltVeTienDo); }

const LT_TEN_KHU = {
  giaotrinh: 'Giáo trình', 'phat-am': 'Học phát âm', 'tu-vung': 'Từ vựng & Hán tự',
  'thi-thu': 'Thi thử', 'luyen-tap': 'Luyện tập', 'lo-trinh': 'Lộ trình',
  'cong-dong': 'Cộng đồng', khac: 'Khác',
};

function _ltVeTienDo(el, d) {
  const bo = ltTienDoBo((d.moi_nhat || []).map((r) => r.lesson_id));
  const ngay = (d.theo_ngay || []).slice(-ltState.tdKhoang);
  const tongGiay = (d.ky_nang || []).reduce((s, k) => s + k.giay, 0);
  el.innerHTML = `
    <div class="lt-page">
      <div class="lt-head">
        <div>
          <h2 class="lt-title">Tiến độ</h2>
          <p class="lt-sub">Mọi con số lấy từ <strong>lần làm mới nhất</strong> của mỗi bài — làm lại nhiều lần không kéo lệch trung bình.</p>
        </div>
      </div>

      ${ngay.length >= 2 ? `
        <div class="lt-card">
          <h3><i class="fa-solid fa-chart-line"></i> Điểm theo thời gian
            <span class="lt-h3-phu">${ngay.length} ngày có làm bài</span></h3>
          ${_ltDuongHtml(ngay)}
        </div>`
      : `<div class="lt-card">
          <h3><i class="fa-solid fa-chart-line"></i> Điểm theo thời gian</h3>
          <p class="lt-ghi-chu">Cần ít nhất 2 ngày có làm bài mới vẽ được đường xu hướng.
             Hiện mới có ${ngay.length} ngày.</p>
        </div>`}

      <div class="lt-card">
        <h3><i class="fa-solid fa-layer-group"></i> Theo kỹ năng</h3>
        ${(d.ky_nang || []).length ? `
          <div class="lt-kn">
            ${d.ky_nang.sort((a, b) => b.so_bai - a.so_bai).map((k) => `
              <div class="lt-kn-dong">
                <span class="lt-kn-ten">${tdEsc(k.ten)}</span>
                <span class="lt-kn-so">${k.so_bai} bài</span>
                <div class="tw-bar"><i style="width:${k.diem_tb}%"
                  class="${_ltMauDiem(k.diem_tb)}"></i></div>
                <span class="lt-diem ${_ltMauDiem(k.diem_tb)}">${k.diem_tb}%</span>
              </div>`).join('')}
          </div>`
        : '<p class="lt-ghi-chu">Chưa có bài nào được nộp.</p>'}
      </div>

      <div class="lt-card">
        <h3><i class="fa-solid fa-book-open"></i> Theo bộ giáo trình</h3>
        ${bo.map((b) => `
          <div class="lt-bo" onclick="window.app.navigate('${b.page}')">
            <div class="lt-bo-top">
              <span class="lt-bo-ten">${b.ten}</span>
              <span class="lt-bo-so">${b.xong}/${b.tong} bài · ${b.pt}%</span>
            </div>
            <div class="tw-bar"><i style="width:${b.pt}%"></i></div>
          </div>`).join('')}
      </div>

      ${(d.theo_khu_vuc || []).length ? `
        <div class="lt-card">
          <h3><i class="fa-solid fa-clock"></i> Thời gian ở mỗi khu vực
            <span class="lt-h3-phu">90 ngày gần đây</span></h3>
          ${(() => {
            const max = Math.max(...d.theo_khu_vuc.map((k) => k.giay), 1);
            return `<div class="lt-kn">${d.theo_khu_vuc.map((k) => `
              <div class="lt-kn-dong">
                <span class="lt-kn-ten">${tdEsc(LT_TEN_KHU[k.khu_vuc] || k.khu_vuc)}</span>
                <span class="lt-kn-so">${k.so_lan} lượt</span>
                <div class="tw-bar"><i style="width:${(k.giay / max) * 100}%"></i></div>
                <span class="lt-kn-gio">${ltGio(k.giay)}</span>
              </div>`).join('')}</div>`;
          })()}
        </div>`
      : `<div class="lt-card">
          <h3><i class="fa-solid fa-clock"></i> Thời gian ở mỗi khu vực</h3>
          <p class="lt-ghi-chu">Chưa có dữ liệu. Hệ thống chỉ bắt đầu đo thời gian học từ
             2026-09-08 — những buổi học trước đó không có gì để hiện.</p>
        </div>`}

      ${(d.thi_thu || []).length ? `
        <div class="lt-card">
          <h3><i class="fa-solid fa-file-pen"></i> Thi thử TOCFL</h3>
          <div class="lt-ds">
            ${d.thi_thu.slice(0, 8).map((t) => `
              <div class="lt-dong is-tinh">
                <span class="lt-dong-ten">${t.skill === 'listening' ? 'Nghe hiểu' : t.skill === 'reading' ? 'Đọc hiểu' : tdEsc(t.skill || 'Đề tổng hợp')}
                  <em>${t.correct_answers}/${t.total_questions} câu · ${ltNgay(t.created_at)}</em></span>
                <span class="lt-diem ${_ltMauDiem(t.score_percent)}">${Math.round(t.score_percent)}%</span>
              </div>`).join('')}
          </div>
        </div>` : ''}

      ${d.lop ? `
        <div class="lt-card">
          <h3><i class="fa-solid fa-users"></i> So với lớp ${tdEsc(d.lop.name)}</h3>
          <div class="lt-solop">
            <div><span class="lt-solop-nhan">Điểm TB của bạn</span>
              <span class="lt-solop-gt">${_ltDiemTB(d.ky_nang)}%</span></div>
            <div><span class="lt-solop-nhan">Điểm TB cả lớp</span>
              <span class="lt-solop-gt">${d.lop.diem_tb_lop ?? '—'}%</span></div>
            <div><span class="lt-solop-nhan">Sĩ số</span>
              <span class="lt-solop-gt">${d.lop.si_so}</span></div>
          </div>
          <p class="lt-ghi-chu">Chỉ hiện số trung bình của lớp — không lộ điểm của bạn nào.</p>
        </div>` : ''}

      <p class="tv-note"><i class="fa-solid fa-circle-info"></i>
        <span>Tổng thời gian LÀM BÀI đã ghi nhận: <strong>${ltGio(tongGiay)}</strong>.
        Con số này chỉ đếm lúc bạn đang làm bài tập, khác với "thời gian ở mỗi khu vực" ở trên
        (đo cả lúc đọc bài).</span></p>
    </div>`;
}

const _ltDiemTB = (kn) => {
  const ds = kn || [];
  if (!ds.length) return '—';
  const bai = ds.reduce((s, k) => s + k.so_bai, 0);
  return bai ? Math.round((ds.reduce((s, k) => s + k.diem_tb * k.so_bai, 0) / bai) * 10) / 10 : '—';
};

/**
 * Đường xu hướng điểm — SVG vẽ tay, KHÔNG dùng thư viện chart (cùng lối với biểu đồ thanh điệu
 * ở 4.11b). `viewBox` + `preserveAspectRatio="none"` để đồ thị co giãn theo bề ngang mà không
 * phải đo DOM; nhãn trục vẽ riêng bằng HTML nên chữ không bị kéo méo.
 */
function _ltDuongHtml(ngay) {
  const W = 1000, H = 220, P = 8;
  const n = ngay.length;
  const x = (i) => P + (i * (W - 2 * P)) / Math.max(1, n - 1);
  const y = (v) => H - P - ((Math.max(0, Math.min(100, v)) / 100) * (H - 2 * P));
  const diem = ngay.map((r, i) => [x(i), y(Number(r.diem))]);
  const d = diem.map((p, i) => `${i ? 'L' : 'M'}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');
  const vung = `${d} L${x(n - 1).toFixed(1)},${H - P} L${P},${H - P} Z`;
  const tb = ngay.reduce((s, r) => s + Number(r.diem), 0) / n;
  return `
    <div class="lt-chart">
      <svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" role="img"
           aria-label="Biểu đồ điểm trung bình theo ngày">
        ${[25, 50, 75].map((v) => `<line x1="${P}" x2="${W - P}" y1="${y(v)}" y2="${y(v)}" class="lt-luoi"/>`).join('')}
        <line x1="${P}" x2="${W - P}" y1="${y(tb)}" y2="${y(tb)}" class="lt-tb"/>
        <path d="${vung}" class="lt-vung"/>
        <path d="${d}" class="lt-duong"/>
        ${diem.map((p) => `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4" class="lt-cham"/>`).join('')}
      </svg>
      <div class="lt-chart-truc">
        <span>${ltNgay(ngay[0].ngay)}</span>
        <span class="lt-chart-tb">TB ${Math.round(tb)}%</span>
        <span>${ltNgay(ngay[n - 1].ngay)}</span>
      </div>
    </div>`;
}

// ============================================================
// 5. THÀNH TÍCH — /lo-trinh/thanh-tich
// ============================================================

function renderPathAchievements(el) { ltNap('path-achievements', _ltVeThanhTich); }

// ---------- CHỨNG CHỈ HOÀN THÀNH ----------

function _ccKhoiHtml(d) {
  const ds = ltChungChi(d.da_hoc, d.diem_bai);
  const xong = ds.filter((x) => x.du);
  // Quyển chưa xong thì chỉ hiện những quyển học viên ĐÃ ĐỘNG VÀO — liệt kê đủ 17 quyển làm
  // màn hình dài ngoằng toàn số 0, che mất chứng chỉ đã đạt.
  const dangHoc = ds.filter((x) => !x.du && x.xong > 0).sort((a, b) => b.pt - a.pt).slice(0, 4);
  if (!xong.length && !dangHoc.length) return '';

  return `
    <div class="lt-card">
      <h3><i class="fa-solid fa-certificate"></i> Chứng chỉ hoàn thành</h3>
      ${xong.length ? `
        <div class="cc-luoi">
          ${xong.map((c) => `
            <button class="cc-the" onclick="window.app.ccMo('${c.bo}', ${c.quyen})">
              <span class="cc-dau"><i class="fa-solid fa-award"></i></span>
              <span class="cc-ten">${tdEsc(c.ten)}</span>
              <span class="cc-cap">${tdEsc(c.capDo || c.han)}</span>
              <span class="cc-xem">Xem chứng chỉ</span>
            </button>`).join('')}
        </div>` : `
        <p class="lt-ghi-chu">Chưa có chứng chỉ nào. Hoàn thành mọi bài của một quyển
        (mỗi bài đạt từ ${CC_NGUONG}% trở lên) là nhận được.</p>`}

      ${dangHoc.length ? `
        <div class="cc-tien">
          <div class="lt-lich-nhan">Đang tiến tới</div>
          ${dangHoc.map((c) => `
            <div class="cc-dong">
              <span class="cc-dong-ten">${tdEsc(c.ten)}</span>
              <div class="tw-bar"><i style="width:${c.pt}%"></i></div>
              <span class="cc-dong-so">${c.xong}/${c.tong}${
                c.chua_dat ? ` · ${c.chua_dat} bài chưa đạt ${CC_NGUONG}%` : ''}</span>
            </div>`).join('')}
        </div>` : ''}
    </div>`;
}

/** Mở chứng chỉ. Vẽ bằng SVG để tải về được thành ảnh nét ở mọi kích thước. */
function ccMo(bo, quyen) {
  const d = ltState.duLieu['path-achievements'];
  if (!d) return;
  const c = ltChungChi(d.da_hoc, d.diem_bai).find((x) => x.bo === bo && x.quyen === quyen);
  if (!c || !c.du) return toast('Chưa đủ điều kiện nhận chứng chỉ này.');

  const ten = (state.user?.name || 'Học viên').trim();
  const ngay = new Date().toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' });
  const ma = ccMaXacThuc(state.user?.id || 0, bo, quyen);

  openDialog('Chứng chỉ hoàn thành', `
    <div class="cc-khung" id="cc-khung">${_ccSvg({ ten, c, ngay, ma })}</div>
    <p class="tv-note" style="margin-top:12px"><i class="fa-solid fa-circle-info"></i>
      <span>Chứng chỉ ghi nhận bạn đã hoàn thành toàn bộ bài tập của quyển này trên ITaiwan.
      Đây không phải chứng chỉ năng lực ngôn ngữ do TOCFL hay Hanban cấp.</span></p>
  `, `<button class="btn btn-outline" onclick="window.app.closeDialog()">Đóng</button>
      <button class="btn btn-primary" onclick="window.app.ccTai('${tdNhay(ten)}', '${bo}', ${quyen})">
        <i class="fa-solid fa-download"></i> Tải về</button>`);
}

function _ccSvg({ ten, c, ngay, ma }) {
  const e = (x) => tdEsc(String(x));
  // Tên dài co chữ lại thay vì tràn ra ngoài khung.
  const cvTen = ten.length > 26 ? 30 : ten.length > 18 ? 36 : 44;
  return `<svg viewBox="0 0 800 566" xmlns="http://www.w3.org/2000/svg" class="cc-svg" role="img"
    aria-label="Chứng chỉ hoàn thành ${e(c.ten)} của ${e(ten)}">
    <defs>
      <linearGradient id="ccbg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#F7FAFA"/><stop offset="1" stop-color="#EAF2F3"/>
      </linearGradient>
      <linearGradient id="ccvien" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#38899E"/><stop offset="1" stop-color="#FD923C"/>
      </linearGradient>
    </defs>
    <rect width="800" height="566" fill="url(#ccbg)"/>
    <rect x="16" y="16" width="768" height="534" fill="none" stroke="url(#ccvien)" stroke-width="3"/>
    <rect x="26" y="26" width="748" height="514" fill="none" stroke="#38899E" stroke-width="1" opacity=".35"/>
    <text x="400" y="86" text-anchor="middle" font-family="serif" font-size="58" fill="#38899E" opacity=".13">學</text>
    <text x="400" y="118" text-anchor="middle" font-size="13" letter-spacing="4" fill="#4B5D64">TẺN · HỌC TIẾNG TRUNG PHỒN THỂ</text>
    <text x="400" y="168" text-anchor="middle" font-size="27" font-weight="700" fill="#1F2E33">CHỨNG CHỈ HOÀN THÀNH</text>
    <line x1="300" y1="186" x2="500" y2="186" stroke="#FD923C" stroke-width="2"/>
    <text x="400" y="228" text-anchor="middle" font-size="14" fill="#4B5D64">Chứng nhận học viên</text>
    <text x="400" y="278" text-anchor="middle" font-size="${cvTen}" font-weight="800" fill="#2A6B7D">${e(ten)}</text>
    <text x="400" y="318" text-anchor="middle" font-size="14" fill="#4B5D64">đã hoàn thành toàn bộ ${c.tong} bài của</text>
    <text x="400" y="358" text-anchor="middle" font-size="25" font-weight="700" fill="#1F2E33">${e(c.ten)}</text>
    <text x="400" y="386" text-anchor="middle" font-size="15" fill="#8A9AA1">${e(c.han)}${c.capDo ? ' · ' + e(c.capDo) : ''}</text>
    <text x="400" y="430" text-anchor="middle" font-size="13" fill="#4B5D64">mỗi bài đạt từ ${CC_NGUONG}% trở lên</text>
    <line x1="120" y1="470" x2="680" y2="470" stroke="#E3E9EA" stroke-width="1"/>
    <text x="120" y="498" font-size="12" fill="#8A9AA1">Ngày cấp</text>
    <text x="120" y="518" font-size="15" font-weight="600" fill="#1F2E33">${e(ngay)}</text>
    <text x="680" y="498" text-anchor="end" font-size="12" fill="#8A9AA1">Mã chứng chỉ</text>
    <text x="680" y="518" text-anchor="end" font-size="15" font-weight="600" fill="#1F2E33" font-family="monospace">${e(ma)}</text>
  </svg>`;
}

/** Tải chứng chỉ thành PNG. Vẽ SVG lên canvas — không cần thư viện ngoài. */
function ccTai(ten, bo, quyen) {
  const svg = document.querySelector('#cc-khung svg');
  if (!svg) return;
  const chuoi = new XMLSerializer().serializeToString(svg);
  const img = new Image();
  // SVG có chữ tiếng Việt nên phải mã hoá UTF-8 đàng hoàng; encodeURIComponent + unescape là
  // cách duy nhất chạy đúng với btoa (btoa không nhận ký tự ngoài Latin-1).
  img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(chuoi)));
  img.onload = () => {
    const cv = document.createElement('canvas');
    cv.width = 1600; cv.height = 1132;                 // xuất @2x cho nét khi đăng mạng xã hội
    const ctx = cv.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, cv.width, cv.height);
    ctx.drawImage(img, 0, 0, cv.width, cv.height);
    cv.toBlob((blob) => {
      if (!blob) return toast('Không tạo được ảnh chứng chỉ.');
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `chung-chi-${bo}-${quyen}-${String(ten).replace(/\s+/g, '-').toLowerCase()}.png`;
      document.body.appendChild(a); a.click(); a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
      toast('Đã tải chứng chỉ.');
    }, 'image/png');
  };
  img.onerror = () => toast('Không tạo được ảnh chứng chỉ.');
}

/**
 * Huy hiệu SUY TỪ DỮ LIỆU THẬT, không có bảng nào lưu sẵn.
 * Mỗi mục: `dat` (số hiện tại) / `moc` (ngưỡng). Chưa đạt vẫn hiện để người học biết còn bao xa
 * — giấu đi thì huy hiệu chỉ là trang trí, hiện ra mới thành mục tiêu.
 */
function _ltHuyHieu(d) {
  const bo = ltTienDoBo(d.da_hoc);
  const q1 = thoidaiSubLessons.filter((s) => tdBookOf(s.id) === 1);
  const xongQ1 = q1.filter((s) => (d.da_hoc || []).includes(s.id)).length;
  const gio = Math.floor(d.bai.giay / 3600);
  const nhom = [
    ['Chuyên cần', 'fa-fire', [
      ['Chuỗi 7 ngày', d.user.longest_streak, 7], ['Chuỗi 30 ngày', d.user.longest_streak, 30],
      ['Chuỗi 100 ngày', d.user.longest_streak, 100],
      ['30 ngày có học', d.so_ngay_hoc, 30], ['100 ngày có học', d.so_ngay_hoc, 100],
    ]],
    ['Bài tập', 'fa-list-check', [
      ['Làm 10 bài', d.bai.so_bai, 10], ['Làm 50 bài', d.bai.so_bai, 50], ['Làm 200 bài', d.bai.so_bai, 200],
      ['1 bài điểm tuyệt đối', d.bai.diem_tuyet_doi, 1], ['10 bài điểm tuyệt đối', d.bai.diem_tuyet_doi, 10],
    ]],
    ['Từ vựng', 'fa-book-bookmark', [
      ['100 từ trong sổ tay', d.so_tay, 100], ['500 từ trong sổ tay', d.so_tay, 500],
      ['Thuộc 50 từ', d.srs.thuoc, 50], ['Thuộc 200 từ', d.srs.thuoc, 200],
    ]],
    ['Cột mốc', 'fa-flag-checkered', [
      ['Học 10 giờ', gio, 10], ['Học 100 giờ', gio, 100],
      ['Xong Quyển 1 Đương đại', xongQ1, q1.length || 1],
      ['Thi thử đạt 80%', Math.round(d.thi.cao_nhat), 80],
      [`Đi hết ${bo[0].ten}`, bo[0].xong, bo[0].tong],
    ]],
  ];
  return nhom.map(([ten, icon, ds]) => ({
    ten, icon,
    muc: ds.map(([nhan, dat, moc]) => ({ nhan, dat: Number(dat) || 0, moc, xong: (Number(dat) || 0) >= moc })),
  }));
}

function _ltVeThanhTich(el, d) {
  const nhom = _ltHuyHieu(d);
  const tongXong = nhom.reduce((s, n) => s + n.muc.filter((m) => m.xong).length, 0);
  const tongMuc = nhom.reduce((s, n) => s + n.muc.length, 0);
  el.innerHTML = `
    <div class="lt-page">
      <div class="tv-hero lt-hero">
        <div class="tv-hero-text">
          <span class="tv-hero-badge"><i class="fa-solid fa-trophy"></i> ${tongXong}/${tongMuc} huy hiệu</span>
          <h1>Thành tích của ${tdEsc(d.user.name || 'bạn')}</h1>
          <p>${ltSo(d.user.points)} điểm · hạng <strong>#${d.hang}</strong> · học từ
             ${new Date(d.user.created_at).toLocaleDateString('vi-VN')}</p>
        </div>
        <div class="tv-hero-mark font-tc" aria-hidden="true">績</div>
      </div>

      <div class="lt-o-grid">
        ${_ltOHtml('fa-fire', 'Chuỗi dài nhất', `${d.user.longest_streak || 0} ngày`, 'seal')}
        ${_ltOHtml('fa-calendar-check', 'Ngày có học', ltSo(d.so_ngay_hoc), 'primary')}
        ${_ltOHtml('fa-clock', 'Giờ làm bài', ltGio(d.bai.giay), 'success')}
        ${_ltOHtml('fa-star', 'Bài điểm tuyệt đối', ltSo(d.bai.diem_tuyet_doi), 'warning')}
      </div>

      ${nhom.map((n) => `
        <div class="lt-card">
          <h3><i class="fa-solid ${n.icon}"></i> ${n.ten}
            <span class="lt-h3-phu">${n.muc.filter((m) => m.xong).length}/${n.muc.length}</span></h3>
          <div class="lt-hh">
            ${n.muc.map((m) => `
              <div class="lt-hh-o${m.xong ? ' is-xong' : ''}">
                <div class="lt-hh-icon"><i class="fa-solid ${m.xong ? 'fa-award' : 'fa-lock'}"></i></div>
                <div class="lt-hh-noi">
                  <div class="lt-hh-ten">${tdEsc(m.nhan)}</div>
                  ${m.xong ? '<div class="lt-hh-mo">Đã đạt</div>'
                    : `<div class="lt-hh-mo">${ltSo(m.dat)}/${ltSo(m.moc)}</div>
                       <div class="tw-bar"><i style="width:${Math.min(100, (m.dat / m.moc) * 100)}%"></i></div>`}
                </div>
              </div>`).join('')}
          </div>
        </div>`).join('')}

      ${_ccKhoiHtml(d)}

      <div class="lt-card">
        <h3><i class="fa-solid fa-ranking-star"></i> Bảng xếp hạng</h3>
        <div class="lt-ds">
          ${(d.bang_xep_hang || []).map((u, i) => `
            <div class="lt-dong is-tinh${u.name === d.user.name ? ' is-toi' : ''}">
              <span class="lt-bxh-hang ${i < 3 ? 'is-top' : ''}">${i + 1}</span>
              <span class="lt-dong-ten">${tdEsc(u.name)}<em>${tdEsc(u.level_label || '')}</em></span>
              <span class="lt-bxh-diem">${ltSo(u.points)} điểm</span>
            </div>`).join('')}
        </div>
        ${d.hang > 10 ? `<p class="lt-ghi-chu">Bạn đang ở hạng <strong>#${d.hang}</strong> — cố thêm chút nữa để lọt top 10.</p>` : ''}
      </div>

      <p class="tv-note"><i class="fa-solid fa-circle-info"></i>
        <span>Huy hiệu tính thẳng từ dữ liệu học tập của bạn, không có bảng nào lưu sẵn — nên
        chúng luôn khớp với số liệu ở trang Tiến độ.</span></p>
    </div>`;
}

// ============================================================
// KHAI BÁO RA NGOÀI cho `main.js` (4.40)
// ============================================================
export const render = {
  'path-overview': renderPathOverview,
  'path-today': renderPathToday,
  'path-homework': renderPathHomework,
  'path-progress': renderPathProgress,
  'path-achievements': renderPathAchievements,
};

export const handlers = {
  ltBatDauOn, ltLatThe, ltChamThe, ltThoatOn, ltBtLoc,
  // Chứng chỉ — quên khai ở đây thì nút bấm im lặng không chạy (quy ước 4.4/4.40).
  ccMo, ccTai, closeDialog,
};
