// =============================================================
// TIẾN ĐỘ THEO TRƯỜNG (2026-09-25) — khu con của Du học
// =============================================================
// Mỗi trường có bao nhiêu học sinh đăng ký và từng em đang ở bước nào. Trường lấy từ nguyện vọng
// 1–3 + trường đã đậu trong hồ sơ (học sinh tự khai ở cổng học sinh, hoặc tư vấn viên nhập); các
// cách viết khác nhau của cùng một trường đã được server gộp sẵn — xem server/utils/nhom-truong.js.
// Backend: GET /api/admin/du-hoc/theo-truong. Sale / quản lý hồ sơ chỉ thấy hồ sơ mình phụ trách
// (server lọc, không phải giao diện).
//
// Cùng lối với admin-trungtam.js: module được admin.js import, CẦU NỐI MỘT CHIỀU qua `dangKy()`
// (import ngược admin.js là vòng lặp), mọi hàm gọi từ HTML nằm trong `tdtHandlers` và được
// admin.js trải vào `window.adminApp` — quên là nút bấm im lặng không chạy (quy ước 4.4).
let A = {};
export function dangKy(api) { A = api; }

const apiGet = (...a) => A.apiGet(...a);
const esc = (s) => A.esc(s);
const conDungLuot = (el, luot) => A.conDungLuot(el, luot);
// Dòng trạng thái từng buổi phỏng vấn (trường / VP Đài Bắc) — dùng lại đúng bản của khu Hồ sơ
// du học để hai màn không vẽ hai kiểu cho cùng một hồ sơ.
const pvDong = (h) => A.pvDong(h);


// ------------------------------------------------------------------ trạng thái

const LOC_MAC_DINH = { ky: '', trang_thai: '', nv: 'tat-ca' };
let loc = { ...LOC_MAC_DINH };
let tim = '';                 // lọc ngay trên trình duyệt, không gọi lại API
let duLieu = null;            // response gần nhất
let focusSau = null;          // id ô lọc cần focus lại sau khi vẽ lại khung
/**
 * Trạng thái mở/đóng NGƯỜI DÙNG đã bấm, theo khoá trường ('' = thẻ "chưa khai trường").
 * Khoá chưa bấm lần nào thì theo mặc định: đóng, trừ khi đang tìm theo tên học sinh (mở sẵn thẻ
 * có em khớp). Tách "đã bấm" khỏi "mặc định" để bấm thu gọn được cả thẻ đang mở sẵn vì tìm kiếm.
 */
const moTay = new Map();
const laMo = (khoa, macDinh) => (moTay.has(khoa) ? moTay.get(khoa) : macDinh);

/** Mảng cặp chứ không object: khoá '1' là chỉ mục số nguyên, Object.entries luôn đẩy nó lên đầu. */
const PHAM_VI_DS = [
  ['tat-ca', 'Mọi nguyện vọng + trường đậu'],
  ['1', 'Chỉ nguyện vọng 1'],
  ['do', 'Chỉ trường đã đậu'],
];
const PHAM_VI = Object.fromEntries(PHAM_VI_DS);
/** Nhãn nhóm "không có trường" đổi theo phạm vi đang đếm. */
const NHAN_CHUA_KHAI = {
  'tat-ca': 'Chưa khai trường nào',
  1: 'Chưa khai nguyện vọng 1',
  do: 'Chưa có trường đậu',
};
const NHAN_VAI = { nv1: 'NV1', nv2: 'NV2', nv3: 'NV3', do: 'Đậu' };
const KET_QUA = { cho: 'Đang chờ', dau: 'Đậu', truot: 'Trượt' };
const MAU_KQ = { cho: 'badge-gray', dau: 'badge-success', truot: 'badge-danger' };

const $ = (id) => document.getElementById(id);
const coLoc = () => !!(loc.ky || loc.trang_thai || loc.nv !== 'tat-ca' || tim.trim());
const ngay = (d) => (d ? new Date(d).toLocaleDateString('vi-VN') : '');
/** Bỏ dấu để ô tìm gõ "dai hoc" vẫn ra "Đại học". */
const boDau = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const buoc = (ma) => (duLieu?.buoc || []).find((b) => b.ma === ma)
  || { ma, ten: ma, icon: 'fa-circle', mau: '#94A3B8' };
const spin = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';

// ------------------------------------------------------------------ URL

/** Bộ lọc lên URL để F5 / gửi link vẫn đúng màn đang xem. admin.js gọi khi dựng hash. */
export function tdtQuery() {
  const q = new URLSearchParams();
  if (loc.ky) q.set('ky', loc.ky);
  if (loc.trang_thai) q.set('trang-thai', loc.trang_thai);
  if (loc.nv !== 'tat-ca') q.set('nv', loc.nv);
  return q;
}
/** Ngược lại: URL -> bộ lọc. Giá trị lạ để server tự bỏ qua, ở đây chỉ chặn `nv`. */
export function tdtNapQuery(q) {
  loc = {
    ky: (q.get('ky') || '').slice(0, 40),   // server cũng cắt 40 ký tự
    trang_thai: q.get('trang-thai') || '',
    nv: Object.hasOwn(PHAM_VI, q.get('nv') || '') ? q.get('nv') : 'tat-ca',
  };
}

// ------------------------------------------------------------------ tải + vẽ

export async function renderTienDoTruong(el) {
  const luot = el.dataset.luot;
  el.innerHTML = spin;
  try {
    const qs = new URLSearchParams();
    if (loc.ky) qs.set('ky', loc.ky);
    if (loc.trang_thai) qs.set('trang_thai', loc.trang_thai);
    if (loc.nv !== 'tat-ca') qs.set('nv', loc.nv);
    const d = await apiGet('/admin/du-hoc/theo-truong' + (qs.toString() ? '?' + qs : ''));
    if (!conDungLuot(el, luot)) return;
    duLieu = d;
    veKhung(el);
  } catch (err) {
    if (!conDungLuot(el, luot)) return;
    el.innerHTML = `<div class="empty-state"><p>${esc(err.message || 'Không tải được tiến độ theo trường.')}</p></div>`;
  }
}

function veKhung(el) {
  const d = duLieu;
  const soDau = d.da_dau ?? 0;
  // Kỳ đang lọc (từ URL / link gửi nhau) mà không còn trong danh sách vẫn phải hiện trong ô chọn —
  // nếu không, ô hiện "Mọi kỳ" trong khi dữ liệu vẫn lọc theo kỳ đó, đổi ô khác là kỳ mất âm thầm.
  const kyList = d.ky_list || [];
  const kyHien = loc.ky && !kyList.includes(loc.ky) ? [loc.ky, ...kyList] : kyList;
  // Trạng thái lạ trên URL: server đã bỏ qua, ở đây dọn luôn khỏi URL cho khớp ô chọn.
  if (loc.trang_thai && loc.trang_thai !== 'dang-chay' && !(d.buoc || []).some((b) => b.ma === loc.trang_thai)) {
    loc.trang_thai = '';
    A.syncUrl(true);
  }
  const opt = (v, nhan, cur) => `<option value="${esc(v)}" ${cur === v ? 'selected' : ''}>${esc(nhan)}</option>`;

  el.innerHTML = `
    <div class="table-toolbar">
      <div>
        <h2 style="margin:0">Tiến độ theo trường</h2>
        <p style="margin:4px 0 0;font-size:13px;color:var(--admin-text-muted)">
          Trường lấy từ nguyện vọng 1–3 và trường đã đậu trong hồ sơ. Các cách viết khác nhau của
          cùng một trường được gộp tự động.</p>
      </div>
    </div>
    ${d.chua_migrate ? `<div class="alert alert-warning">Chưa chạy <code>migration-du-hoc.sql</code>.
       Chạy <code>npm run db:migrate:prod</code> để bật khu Hồ sơ du học.</div>` : ''}
    ${d.bi_cat ? `<div class="alert alert-warning">Chỉ tính ${Number(d.tran).toLocaleString('vi-VN')} hồ sơ
       mới nhất — lọc theo kỳ nhập học để xem đủ.</div>` : ''}
    <div class="stats-grid stats-grid--4">
      ${the('fa-school', '#265648', d.truong.length, 'Trường có học sinh đăng ký')}
      ${the('fa-user-graduate', '#1F7A52', d.tong_ho_so, 'Hồ sơ trong bộ lọc')}
      ${the('fa-circle-check', '#16A34A', soDau, 'Đã có trường đậu')}
      ${the('fa-circle-question', '#B85C1A', d.chua_khai.length, NHAN_CHUA_KHAI[d.pham_vi] || NHAN_CHUA_KHAI['tat-ca'])}
    </div>
    <div class="dh-filter">
      <input type="search" id="tdt-tim" placeholder="Tìm trường, tên học sinh, mã hồ sơ…"
             value="${esc(tim)}" oninput="adminApp.tdtTim()">
      <select id="tdt-ky" onchange="adminApp.tdtDoiLoc()" aria-label="Kỳ nhập học">
        ${opt('', 'Mọi kỳ nhập học', loc.ky)}
        ${kyHien.map((k) => opt(k, k, loc.ky)).join('')}
      </select>
      <select id="tdt-tt" onchange="adminApp.tdtDoiLoc()" aria-label="Trạng thái hồ sơ">
        ${opt('', 'Mọi trạng thái', loc.trang_thai)}
        ${opt('dang-chay', 'Đang xử lý', loc.trang_thai)}
        ${(d.buoc || []).map((b) => opt(b.ma, b.ten, loc.trang_thai)).join('')}
      </select>
      <select id="tdt-nv" onchange="adminApp.tdtDoiLoc()" aria-label="Tính theo">
        ${PHAM_VI_DS.map(([v, n]) => opt(v, n, loc.nv)).join('')}
      </select>
      <button id="tdt-xoa-loc" class="btn btn-outline btn-sm" onclick="adminApp.tdtXoaLoc()"
              style="${coLoc() ? '' : 'display:none'}">Xoá lọc</button>
      <span class="tdt-nut-mo">
        <button class="btn btn-outline btn-sm" onclick="adminApp.tdtMoHet()">
          <i class="fa-solid fa-chevron-down"></i><span>Mở hết</span></button>
        <button class="btn btn-outline btn-sm" onclick="adminApp.tdtThuGon()">
          <i class="fa-solid fa-chevron-right"></i><span>Thu gọn</span></button>
      </span>
    </div>
    <div class="tdt-chu-giai">${(d.buoc || []).map((b) =>
      `<span><i style="background:${b.mau}"></i>${esc(b.ten)}</span>`).join('')}</div>
    <div id="tdt-ds"></div>`;
  veDanhSach();
  // Đổi ô lọc là vẽ lại cả khung -> ô vừa đổi bị thay mới, focus rơi về <body>. Trả focus lại.
  if (focusSau) { $(focusSau)?.focus(); focusSau = null; }
}

function the(icon, mau, so, nhan) {
  return `<div class="stat-card"><div class="stat-icon" style="background:${mau}1a;color:${mau}"><i class="fa-solid ${icon}"></i></div>
    <div><div class="stat-value">${Number(so || 0).toLocaleString('vi-VN')}</div><div class="stat-label">${esc(nhan)}</div></div></div>`;
}

/** Vẽ riêng phần danh sách: gõ ô tìm chỉ vẽ lại chỗ này, ô tìm không mất con trỏ. */
function veDanhSach() {
  const khung = $('tdt-ds');
  if (!khung || !duLieu) return;
  const q = boDau(tim.trim());

  // Tìm khớp TÊN TRƯỜNG (kể cả cách viết đã gộp) -> giữ nguyên cả trường. Không khớp tên trường
  // nhưng có học sinh khớp -> chỉ hiện những em đó và mở sẵn thẻ, để gõ tên một em là thấy ngay
  // em ấy đăng ký những trường nào.
  const locThe = (t) => {
    if (!q) return t;
    if (boDau([t.ten, ...t.bien_the].join(' ')).includes(q)) return t;
    const hs = t.hoc_sinh.filter((h) => boDau(`${h.ho_ten} ${h.ma_hs}`).includes(q));
    return hs.length ? { ...t, hoc_sinh: hs, loc_hs: true } : null;
  };
  const ds = duLieu.truong.map(locThe).filter(Boolean);
  const chuaKhai = q
    ? duLieu.chua_khai.filter((h) => boDau(`${h.ho_ten} ${h.ma_hs}`).includes(q))
    : duLieu.chua_khai;

  if (!ds.length && !chuaKhai.length) {
    khung.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-school" style="font-size:32px;color:var(--admin-text-muted)"></i>
        <p>${q || loc.ky || loc.trang_thai || loc.nv !== 'tat-ca'
          ? 'Không có trường hay học sinh nào khớp bộ lọc.'
          : 'Chưa có hồ sơ du học nào khai trường.'}</p>
      </div>`;
    return;
  }

  khung.innerHTML = ds.map(theTruong).join('')
    + (chuaKhai.length ? theChuaKhai(chuaKhai) : '');
}

/** Thanh ngang chia theo bước: nhìn một cái là biết trường này đang dồn ở đâu. */
function thanhBuoc(theoBuoc, tong) {
  const phan = (duLieu.buoc || []).filter((b) => theoBuoc[b.ma]).map((b) => {
    const so = theoBuoc[b.ma];
    return `<i style="flex:${so};background:${b.mau}" title="${esc(b.ten)}: ${so}"></i>`;
  }).join('');
  const nhan = (duLieu.buoc || []).filter((b) => theoBuoc[b.ma]).map((b) =>
    `<span><i style="background:${b.mau}"></i>${esc(b.ten)} <b>${theoBuoc[b.ma]}</b></span>`).join('');
  return `<div class="tdt-bar" role="img" aria-label="Phân bổ ${tong} học sinh theo bước">${phan}</div>
    <div class="tdt-bar-nhan">${nhan}</div>`;
}

function theTruong(t) {
  const mo = laMo(t.khoa, !!t.loc_hs);
  const dem = [
    t.nv1 && `<span>NV1 <b>${t.nv1}</b></span>`, t.nv2 && `<span>NV2 <b>${t.nv2}</b></span>`,
    t.nv3 && `<span>NV3 <b>${t.nv3}</b></span>`,
    t.dau && `<span class="tdt-dau">Đậu <b>${t.dau}</b></span>`,
  ].filter(Boolean).join('<span class="tdt-cham">·</span>');
  return `
    <div class="tdt-truong${mo ? ' is-mo' : ''}">
      <button class="tdt-head" data-khoa="${esc(t.khoa)}" onclick="adminApp.tdtMoDong(this.dataset.khoa, this.getAttribute('aria-expanded'))"
              aria-expanded="${mo ? 'true' : 'false'}">
        <i class="fa-solid ${mo ? 'fa-chevron-down' : 'fa-chevron-right'} tdt-caret"></i>
        <span class="tdt-ten">${esc(t.ten)}
          ${t.bien_the.length ? `<span class="dh-sub">· gộp ${t.bien_the.length} cách viết</span>` : ''}</span>
        <span class="tdt-tong"><b>${t.tong}</b> học sinh${t.loc_hs ? ` <span class="dh-sub">(khớp ${t.hoc_sinh.length})</span>` : ''}</span>
      </button>
      <div class="tdt-tomtat">${dem}</div>
      ${thanhBuoc(t.theo_buoc, t.tong)}
      ${mo ? `
        ${t.bien_the.length ? `<div class="tdt-bien-the"><i class="fa-solid fa-layer-group"></i><span>Các cách viết đã gộp:
          ${t.bien_the.map((b) => `<b>${esc(b)}</b>`).join(', ')}</span></div>` : ''}
        ${bangHocSinh(t.hoc_sinh, true)}` : ''}
    </div>`;
}

function theChuaKhai(ds) {
  const mo = laMo('', !!tim.trim());
  const theoBuoc = {};
  ds.forEach((h) => { theoBuoc[h.buoc] = (theoBuoc[h.buoc] || 0) + 1; });
  return `
    <div class="tdt-truong tdt-chua-khai${mo ? ' is-mo' : ''}">
      <button class="tdt-head" data-khoa="" onclick="adminApp.tdtMoDong(this.dataset.khoa, this.getAttribute('aria-expanded'))"
              aria-expanded="${mo ? 'true' : 'false'}">
        <i class="fa-solid ${mo ? 'fa-chevron-down' : 'fa-chevron-right'} tdt-caret"></i>
        <span class="tdt-ten">${esc(NHAN_CHUA_KHAI[duLieu.pham_vi] || NHAN_CHUA_KHAI['tat-ca'])}</span>
        <span class="tdt-tong"><b>${ds.length}</b> học sinh</span>
      </button>
      ${thanhBuoc(theoBuoc, ds.length)}
      ${mo ? bangHocSinh(ds, false) : ''}
    </div>`;
}

function chipBuoc(ma) {
  const b = buoc(ma);
  return `<span class="dh-chip" style="--c:${b.mau}"><i class="fa-solid ${b.icon}"></i> ${esc(b.ten)}</span>`;
}

function oKetQua(ngayMoc, kq) {
  if (!ngayMoc && !kq) return '<span class="dh-sub">—</span>';
  return `${ngayMoc ? `<div>${ngay(ngayMoc)}</div>` : ''}
    ${kq ? `<span class="badge ${MAU_KQ[kq] || 'badge-gray'}">${KET_QUA[kq] || esc(kq)}</span>` : ''}`;
}

/** `coTruong` = đang ở trong thẻ một trường (có cột nguyện vọng); thẻ "chưa khai" thì không. */
function bangHocSinh(ds, coTruong) {
  const hang = ds.map((h) => `
    <tr class="dh-row" onclick="adminApp.tdtMoHoSo(${Number(h.id)})">
      <td><strong>${esc(h.ho_ten)}</strong>
        <div class="dh-sub">${esc(h.ma_hs)}${h.ky_nhap_hoc ? ' · ' + esc(h.ky_nhap_hoc) : ''}${h.nganh ? ' · ' + esc(h.nganh) : ''}</div></td>
      ${coTruong ? `<td class="tdt-o-dk">${(h.vai || []).map((v) =>
        `<span class="tdt-vai tdt-vai-${v}">${NHAN_VAI[v] || esc(v)}</span>`).join('')}
        ${h.dau_truong_khac ? `<div class="dh-sub">Đã đậu: ${esc(h.dau_truong_khac)}</div>` : ''}</td>` : ''}
      <td>${chipBuoc(h.buoc)}${h.buoc_tu ? `<div class="dh-sub">từ ${ngay(h.buoc_tu)}</div>` : ''}</td>
      <td>${pvDong(h)}</td>
      <td>${oKetQua(h.ngay_nop_visa, h.kq_visa)}</td>
      <td style="white-space:nowrap">${h.ngay_bay ? ngay(h.ngay_bay) : '<span class="dh-sub">—</span>'}</td>
      <td style="text-align:center">${Number(h.thieu_giay_to)
        ? `<span class="badge badge-warning">thiếu ${Number(h.thieu_giay_to)}</span>`
        : '<span class="badge badge-success">đủ</span>'}</td>
      <td>${h.tu_van_ten ? esc(h.tu_van_ten) : '<span class="dh-sub">—</span>'}</td>
    </tr>`).join('');
  return `
    <div class="data-table-wrapper dh-table-wrap tdt-bang">
      <table class="data-table">
        <thead><tr>
          <th>Học sinh</th>${coTruong ? '<th>Đăng ký</th>' : ''}<th>Tiến độ</th><th>Phỏng vấn</th>
          <th>Visa</th><th>Ngày bay</th><th style="text-align:center">Giấy tờ</th><th>Tư vấn viên</th>
        </tr></thead>
        <tbody>${hang}</tbody>
      </table>
    </div>`;
}

// ------------------------------------------------------------------ thao tác

function veLai() { renderTienDoTruong($('admin-content')); }

function tdtDoiLoc() {
  focusSau = document.activeElement?.id || null;
  loc = {
    ky: $('tdt-ky')?.value || '',
    trang_thai: $('tdt-tt')?.value || '',
    nv: $('tdt-nv')?.value || 'tat-ca',
  };
  A.syncUrl(true);
  veLai();
}

function tdtTim() {
  tim = $('tdt-tim')?.value || '';
  // Kết quả tìm mới thì bỏ trạng thái mở/đóng đã bấm trước đó: thẻ lỡ đóng tay từ trước sẽ che
  // mất đúng học sinh vừa tìm ra. Bấm đóng/mở trong lúc đang tìm vẫn giữ được như thường.
  moTay.clear();
  const nut = $('tdt-xoa-loc');
  if (nut) nut.style.display = coLoc() ? '' : 'none';
  veDanhSach();
}

function tdtXoaLoc() {
  loc = { ...LOC_MAC_DINH };
  tim = '';
  A.syncUrl(true);
  veLai();
}

function tdtMoDong(khoa, dangMoStr) {
  const k = String(khoa ?? '');
  moTay.set(k, dangMoStr !== 'true');
  veDanhSach();
  // veDanhSach thay cả #tdt-ds -> nút vừa bấm bị huỷ, focus rơi về <body> (người dùng bàn phím
  // bấm Tab lại từ đầu trang). Đặt lại vào nút mới cùng khoá; so dataset để khỏi escape selector.
  [...document.querySelectorAll('#tdt-ds .tdt-head')].find((b) => b.dataset.khoa === k)?.focus();
}

/** Khoá của mọi thẻ đang có, kể cả thẻ "chưa khai trường". */
const moiKhoa = () => [...(duLieu?.truong || []).map((t) => t.khoa), ''];

function tdtMoHet() {
  moiKhoa().forEach((k) => moTay.set(k, true));
  veDanhSach();
}

function tdtThuGon() {
  moiKhoa().forEach((k) => moTay.set(k, false));
  veDanhSach();
}

/** Mở hồ sơ: đổi hẳn sang khu Hồ sơ du học để menu, tiêu đề và nút Back đi đúng. */
function tdtMoHoSo(id) { A.moHoSo(id); }

export const tdtHandlers = {
  tdtDoiLoc, tdtTim, tdtXoaLoc, tdtMoDong, tdtMoHet, tdtThuGon, tdtMoHoSo,
};
