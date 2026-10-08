// =============================================================
// TIẾN ĐỘ THEO TRƯỜNG — quản trị tự quản lý (2026-10-08)
// =============================================================
// Quản trị tự thêm từng trường, rồi thêm học sinh (chọn từ hồ sơ du học có sẵn) vào trường đó,
// giống thêm lớp rồi add học sinh. Mỗi học sinh trong trường hiện: họ tên, bước hồ sơ, kỳ nhập học,
// ngành, tư vấn viên + kết quả riêng của trường đó (Đang chờ / Đậu / Trượt). Một em thuộc được nhiều trường.
// Backend: /api/admin/du-hoc/theo-truong (xem server/routes/du-hoc.js). Quản trị + quản lý hồ sơ thấy
// mọi học sinh, sale chỉ thấy học sinh thuộc hồ sơ mình phụ trách (server lọc). Cả ba thêm / gỡ học
// sinh và đặt kết quả được; thêm / đổi tên / xoá TRƯỜNG chỉ quản trị (`sua_duoc` do server báo).
//
// Cùng lối với admin-trungtam.js: module được admin.js import, CẦU NỐI MỘT CHIỀU qua `dangKy()`
// (import ngược admin.js là vòng lặp), mọi hàm gọi từ HTML nằm trong `tdtHandlers` và được
// admin.js trải vào `window.adminApp` — quên là nút bấm im lặng không chạy (quy ước 4.4).
let A = {};
export function dangKy(api) { A = api; }

const apiGet = (...a) => A.apiGet(...a);
const apiPost = (...a) => A.apiPost(...a);
const apiPut = (...a) => A.apiPut(...a);
const apiDel = (...a) => A.apiDel(...a);
const esc = (s) => A.esc(s);
const toast = (...a) => A.toast(...a);
const conDungLuot = (el, luot) => A.conDungLuot(el, luot);

// ------------------------------------------------------------------ trạng thái

let tim = '';                 // lọc ngay trên trình duyệt, không gọi lại API
let duLieu = null;            // response gần nhất
let truongDangThem = null;    // id trường đang mở hộp "Thêm học sinh"
let demTim = 0;               // chống kết quả tìm cũ về sau ghi đè kết quả tìm mới
let henTim = null;
/**
 * Trạng thái mở/đóng NGƯỜI DÙNG đã bấm, theo id trường. Chưa bấm thì mặc định đóng, trừ khi đang
 * tìm theo tên học sinh (mở sẵn thẻ có em khớp) — tách "đã bấm" khỏi "mặc định" để bấm thu gọn
 * được cả thẻ đang mở sẵn vì tìm kiếm.
 */
const moTay = new Map();
const laMo = (id, macDinh) => (moTay.has(id) ? moTay.get(id) : macDinh);

const KET_QUA = { cho: 'Đang chờ', dau: 'Đậu', truot: 'Trượt' };

const $ = (id) => document.getElementById(id);
/** Bỏ dấu để ô tìm gõ "dai hoc" vẫn ra "Đại học". */
const boDau = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
  .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
const buoc = (ma) => (duLieu?.buoc || []).find((b) => b.ma === ma)
  || { ma, ten: ma, icon: 'fa-circle', mau: '#94A3B8' };
const spin = '<div style="text-align:center;padding:40px;color:var(--admin-text-muted)"><i class="fa-solid fa-spinner fa-spin" style="font-size:24px"></i></div>';

// ------------------------------------------------------------------ URL
// Màn này không còn bộ lọc nào đưa lên URL; giữ hai hàm để admin.js không phải đổi chỗ gọi.
export function tdtQuery() { return new URLSearchParams(); }
export function tdtNapQuery() { /* không có gì để nạp */ }

// ------------------------------------------------------------------ tải + vẽ

export async function renderTienDoTruong(el) {
  const luot = el.dataset.luot;
  el.innerHTML = spin;
  try {
    const d = await apiGet('/admin/du-hoc/theo-truong');
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
  const soDau = d.truong.reduce((n, t) => n + t.dau, 0);
  el.innerHTML = `
    <div class="table-toolbar">
      <div>
        <h2 style="margin:0">Tiến độ theo trường</h2>
        <p style="margin:4px 0 0;font-size:13px;color:var(--admin-text-muted)">
          ${d.sua_duoc
            ? 'Thêm trường, rồi thêm học sinh vào từng trường để theo dõi. Một học sinh có thể thuộc nhiều trường.'
            : 'Thêm học sinh vào các trường để theo dõi. Một học sinh có thể thuộc nhiều trường.'}</p>
      </div>
      ${d.sua_duoc ? `<button class="btn btn-primary" onclick="adminApp.tdtFormTruong()">
        <i class="fa-solid fa-plus"></i> Thêm trường</button>` : ''}
    </div>
    ${d.chua_migrate ? `<div class="alert alert-warning">Chưa chạy migration cho màn này.
       Chạy <code>npm run db:migrate:prod</code>.</div>` : ''}
    <div class="stats-grid stats-grid--4">
      ${the('fa-school', '#265648', d.truong.length, 'Trường')}
      ${the('fa-user-graduate', '#1F7A52', d.tong_luot, 'Lượt học sinh')}
      ${the('fa-circle-check', '#16A34A', soDau, 'Lượt đã đậu')}
    </div>
    <div class="dh-filter">
      <input type="search" id="tdt-tim" placeholder="Tìm trường hoặc tên học sinh…"
             value="${esc(tim)}" oninput="adminApp.tdtTim()">
      <span class="tdt-nut-mo">
        <button class="btn btn-outline btn-sm" onclick="adminApp.tdtMoHet()">
          <i class="fa-solid fa-chevron-down"></i><span>Mở hết</span></button>
        <button class="btn btn-outline btn-sm" onclick="adminApp.tdtThuGon()">
          <i class="fa-solid fa-chevron-right"></i><span>Thu gọn</span></button>
      </span>
    </div>
    <div id="tdt-ds"></div>`;
  veDanhSach();
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

  // Tìm khớp TÊN TRƯỜNG -> giữ nguyên cả trường. Không khớp tên trường nhưng có học sinh khớp ->
  // chỉ hiện những em đó và mở sẵn thẻ, để gõ tên một em là thấy ngay em ấy thuộc những trường nào.
  const locThe = (t) => {
    if (!q) return t;
    if (boDau(t.ten).includes(q)) return t;
    const hs = t.hoc_sinh.filter((h) => boDau(h.ho_ten).includes(q));
    return hs.length ? { ...t, hoc_sinh: hs, loc_hs: true } : null;
  };
  const ds = duLieu.truong.map(locThe).filter(Boolean);

  if (!ds.length) {
    khung.innerHTML = `
      <div class="empty-state">
        <i class="fa-solid fa-school" style="font-size:32px;color:var(--admin-text-muted)"></i>
        <p>${q ? 'Không có trường hay học sinh nào khớp.'
          : duLieu.sua_duoc ? 'Chưa có trường nào. Bấm “Thêm trường” để bắt đầu.' : 'Chưa có trường nào.'}</p>
      </div>`;
    return;
  }
  khung.innerHTML = ds.map(theTruong).join('');
}

function theTruong(t) {
  const mo = laMo(t.id, !!t.loc_hs);
  const sua = duLieu.sua_duoc;   // quản lý TRƯỜNG; thêm / gỡ học sinh thì ai cũng làm được
  const dem = [
    t.cho && `<span>Đang chờ <b>${t.cho}</b></span>`,
    t.dau && `<span class="tdt-dau">Đậu <b>${t.dau}</b></span>`,
    t.truot && `<span>Trượt <b>${t.truot}</b></span>`,
  ].filter(Boolean).join('<span class="tdt-cham">·</span>');
  return `
    <div class="tdt-truong${mo ? ' is-mo' : ''}">
      <button class="tdt-head" onclick="adminApp.tdtMoDong(${t.id}, this.getAttribute('aria-expanded'))"
              aria-expanded="${mo ? 'true' : 'false'}">
        <i class="fa-solid ${mo ? 'fa-chevron-down' : 'fa-chevron-right'} tdt-caret"></i>
        <span class="tdt-ten">${esc(t.ten)}</span>
        <span class="tdt-tong"><b>${t.tong}</b> học sinh${t.loc_hs ? ` <span class="dh-sub">(khớp ${t.hoc_sinh.length})</span>` : ''}</span>
      </button>
      ${dem ? `<div class="tdt-tomtat">${dem}</div>` : ''}
      ${mo ? `
        <div class="tdt-thao-tac">
          <button class="btn btn-sm btn-primary" onclick="adminApp.tdtFormHocSinh(${t.id})">
            <i class="fa-solid fa-user-plus"></i> Thêm học sinh</button>
          ${sua ? `<button class="btn btn-sm btn-outline" onclick="adminApp.tdtFormTruong(${t.id})">
            <i class="fa-solid fa-pen"></i> Đổi tên</button>
          <button class="btn btn-sm btn-outline" onclick="adminApp.tdtXoaTruong(${t.id})">
            <i class="fa-solid fa-trash"></i> Xoá trường</button>` : ''}
        </div>
        ${t.hoc_sinh.length ? bangHocSinh(t.hoc_sinh)
          : '<p class="dh-sub" style="margin:12px 0 0">Chưa có học sinh nào trong trường này.</p>'}` : ''}
    </div>`;
}

function chipBuoc(ma) {
  const b = buoc(ma);
  return `<span class="dh-chip" style="--c:${b.mau}"><i class="fa-solid ${b.icon}"></i> ${esc(b.ten)}</span>`;
}

function bangHocSinh(ds) {
  const hang = ds.map((h) => `
    <tr class="dh-row">
      <td><a href="#" class="tdt-ten-hs" onclick="event.preventDefault();adminApp.tdtMoHoSo(${Number(h.ho_so_id)})"><strong>${esc(h.ho_ten)}</strong></a></td>
      <td>${chipBuoc(h.buoc)}</td>
      <td>${h.ky_nhap_hoc ? esc(h.ky_nhap_hoc) : '<span class="dh-sub">—</span>'}</td>
      <td>${h.nganh ? esc(h.nganh) : '<span class="dh-sub">—</span>'}</td>
      <td>${h.tu_van_ten ? esc(h.tu_van_ten) : '<span class="dh-sub">—</span>'}</td>
      <td style="white-space:nowrap">
        <select onchange="adminApp.tdtDoiKetQua(${h.id}, this.value)" aria-label="Kết quả của ${esc(h.ho_ten)}">
          ${Object.entries(KET_QUA).map(([k, v]) => `<option value="${k}" ${h.ket_qua === k ? 'selected' : ''}>${v}</option>`).join('')}
        </select>
        <button class="btn-icon" title="Gỡ khỏi trường" onclick="adminApp.tdtGoHocSinh(${h.id}, '${esc(h.ho_ten).replace(/'/g, '&#39;')}')">
          <i class="fa-solid fa-user-minus"></i></button></td>
    </tr>`).join('');
  return `
    <div class="data-table-wrapper dh-table-wrap tdt-bang">
      <table class="data-table">
        <thead><tr>
          <th>Học sinh</th><th>Bước hồ sơ</th><th>Kỳ nhập học</th><th>Ngành</th><th>Tư vấn viên</th><th>Kết quả</th>
        </tr></thead>
        <tbody>${hang}</tbody>
      </table>
    </div>`;
}

// ------------------------------------------------------------------ thao tác

function veLai() { return renderTienDoTruong($('admin-content')); }

/** Thao tác ghi: lỗi từ server (trùng tên, đã có trong trường...) hiện nguyên văn. */
async function lam(viec, thanhCong) {
  try {
    await viec();
    if (thanhCong) toast(thanhCong);
    return true;
  } catch (err) {
    toast(err.message || 'Không thực hiện được.', 'error');
    return false;
  }
}

function tdtTim() {
  tim = $('tdt-tim')?.value || '';
  // Kết quả tìm mới thì bỏ trạng thái mở/đóng đã bấm trước đó: thẻ lỡ đóng tay từ trước sẽ che
  // mất đúng học sinh vừa tìm ra.
  moTay.clear();
  veDanhSach();
}

function tdtMoDong(id, dangMoStr) {
  moTay.set(Number(id), dangMoStr !== 'true');
  veDanhSach();
}
function tdtMoHet() { duLieu?.truong.forEach((t) => moTay.set(t.id, true)); veDanhSach(); }
function tdtThuGon() { duLieu?.truong.forEach((t) => moTay.set(t.id, false)); veDanhSach(); }

/** Mở hồ sơ: đổi hẳn sang khu Hồ sơ du học để menu, tiêu đề và nút Back đi đúng. */
function tdtMoHoSo(id) { A.moHoSo(id); }

// --- trường ---
/** `id` có -> đổi tên trường đó; không có -> thêm trường mới. */
function tdtFormTruong(id) {
  const t = id ? duLieu.truong.find((x) => x.id === Number(id)) : null;
  A.openModal(t ? 'Đổi tên trường' : 'Thêm trường', `
    <div class="form-group"><label>Tên trường <span style="color:#EF4444">*</span></label>
      <input type="text" id="tdt-f-ten" maxlength="200" value="${esc(t?.ten || '')}"
             placeholder="vd: Đại học Thành Công (NCKU)"
             onkeydown="if(event.key==='Enter')adminApp.tdtLuuTruong(${t ? t.id : 0})"></div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.tdtLuuTruong(${t ? t.id : 0})">${t ? 'Lưu' : 'Thêm'}</button>`);
  $('tdt-f-ten')?.focus();
}

async function tdtLuuTruong(id) {
  const ten = ($('tdt-f-ten')?.value || '').trim();
  if (!ten) return toast('Chưa nhập tên trường.', 'error');
  const ok = await lam(
    () => (Number(id) ? apiPut(`/admin/du-hoc/theo-truong/${id}`, { ten }) : apiPost('/admin/du-hoc/theo-truong', { ten })),
    Number(id) ? 'Đã đổi tên.' : 'Đã thêm trường.'
  );
  if (!ok) return;
  A.closeModal();
  await veLai();
}

function tdtXoaTruong(id) {
  const t = duLieu.truong.find((x) => x.id === Number(id));
  if (!t) return;
  A.confirmDialog('Xoá trường',
    `Xoá “${t.ten}”${t.tong ? ` và danh sách ${t.tong} học sinh trong trường này` : ''}? Hồ sơ du học của học sinh KHÔNG bị xoá.`,
    async () => { if (await lam(() => apiDel(`/admin/du-hoc/theo-truong/${id}`), 'Đã xoá trường.')) await veLai(); });
}

// --- học sinh trong trường ---
function tdtFormHocSinh(truongId) {
  truongDangThem = Number(truongId);
  const t = duLieu.truong.find((x) => x.id === truongDangThem);
  A.openModal(`Thêm học sinh vào ${t?.ten || 'trường'}`, `
    <div class="form-group"><label>Tìm hồ sơ học sinh</label>
      <input type="search" id="tdt-f-tim" placeholder="Gõ tên, mã hồ sơ hoặc số điện thoại…" oninput="adminApp.tdtTimHocSinh()"></div>
    <div id="tdt-f-kq" class="dh-sub">Gõ để tìm trong các hồ sơ du học đã có.</div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>`);
  $('tdt-f-tim')?.focus();
}

function tdtTimHocSinh() {
  clearTimeout(henTim);
  henTim = setTimeout(async () => {
    const q = ($('tdt-f-tim')?.value || '').trim();
    const khung = $('tdt-f-kq');
    if (!khung) return;
    if (!q) { khung.innerHTML = 'Gõ để tìm trong các hồ sơ du học đã có.'; return; }
    const lan = ++demTim;
    try {
      const r = await apiGet(`/admin/du-hoc/theo-truong/tim-hoc-sinh?q=${encodeURIComponent(q)}`);
      if (lan !== demTim || !$('tdt-f-kq')) return;
      const t = duLieu.truong.find((x) => x.id === truongDangThem);
      const daCo = new Set((t?.hoc_sinh || []).map((h) => h.ho_so_id));
      const ds = r.ho_so || [];
      khung.innerHTML = ds.length ? `<ul class="tdt-ung-vien">${ds.map((h) => `
        <li>
          <div><strong>${esc(h.ho_ten)}</strong>
            <div class="dh-sub">${esc(h.ma_hs)}${h.ky_nhap_hoc ? ' · ' + esc(h.ky_nhap_hoc) : ''}${h.nganh ? ' · ' + esc(h.nganh) : ''}</div></div>
          ${daCo.has(h.id)
            ? '<span class="dh-sub">đã có trong trường</span>'
            : `<button class="btn btn-sm btn-primary" onclick="adminApp.tdtThemHocSinh(${h.id}, this)">Thêm</button>`}
        </li>`).join('')}</ul>${r.tong > ds.length ? `<p class="dh-sub">Còn ${r.tong - ds.length} hồ sơ nữa — gõ rõ hơn để thu hẹp.</p>` : ''}`
        : 'Không tìm thấy hồ sơ nào.';
    } catch (err) {
      if (lan === demTim && $('tdt-f-kq')) khung.textContent = err.message || 'Không tìm được.';
    }
  }, 250);
}

async function tdtThemHocSinh(hoSoId, nut) {
  nut.disabled = true;
  const ok = await lam(() => apiPost(`/admin/du-hoc/theo-truong/${truongDangThem}/hoc-sinh`, { ho_so_id: hoSoId }), 'Đã thêm học sinh.');
  if (!ok) { nut.disabled = false; return; }
  nut.replaceWith(Object.assign(document.createElement('span'), { className: 'dh-sub', textContent: 'đã thêm' }));
  moTay.set(truongDangThem, true);
  // Vẽ lại nền ngay, giữ hộp tìm đang mở để thêm tiếp nhiều em liền nhau.
  try {
    duLieu = await apiGet('/admin/du-hoc/theo-truong');
    veKhung($('admin-content'));
  } catch (_) { /* nền cũ vẫn dùng được, lần mở sau sẽ tải lại */ }
}

async function tdtDoiKetQua(id, ketQua) {
  if (await lam(() => apiPut(`/admin/du-hoc/theo-truong-hs/${id}`, { ket_qua: ketQua }), 'Đã cập nhật kết quả.')) await veLai();
  else await veLai();   // lỗi thì trả ô chọn về giá trị thật trên server
}

function tdtGoHocSinh(id, ten) {
  A.confirmDialog('Gỡ học sinh khỏi trường', `Gỡ “${ten}” khỏi trường này? Hồ sơ du học của em không bị xoá.`,
    async () => { if (await lam(() => apiDel(`/admin/du-hoc/theo-truong-hs/${id}`), 'Đã gỡ khỏi trường.')) await veLai(); });
}

export const tdtHandlers = {
  tdtTim, tdtMoDong, tdtMoHet, tdtThuGon, tdtMoHoSo,
  tdtFormTruong, tdtLuuTruong, tdtXoaTruong,
  tdtFormHocSinh, tdtTimHocSinh, tdtThemHocSinh, tdtDoiKetQua, tdtGoHocSinh,
};
