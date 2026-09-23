// =============================================================
// BA KHU VẬN HÀNH TRUNG TÂM (2026-09-17)
//   quy     — sổ thu chi
//   ktx     — ký túc xá
//   de-bai  — đề bài tập / bài kiểm tra tự soạn
// =============================================================
// Tách khỏi `src/admin.js` (đã 5.444 dòng) — nhập thêm ~1.500 dòng nữa vào đó thì file thành
// gần 7.000 dòng và mọi lần sửa đều phải cuộn qua ba khu không liên quan. Vẫn MỘT entry
// (`admin.html` chỉ nạp admin.js), file này chỉ là module được import — không đổi kiến trúc.
//
// Quy ước giữ nguyên như admin.js: render bằng template string gán vào innerHTML, sự kiện gắn
// bằng `onclick="adminApp.xxx(...)"`, nên MỌI hàm gọi từ HTML phải có trong `handlers` ở cuối file
// và được `Object.assign` vào `window.adminApp` (quy ước 4.4 — quên là nút bấm im lặng không chạy).
// CẦU NỐI MỘT CHIỀU tới admin.js — đúng lối `src/core/app.js` đã dùng khi tách main.js (4.40).
// Import thẳng từ admin.js là VÒNG LẶP (admin.js -> file này -> admin.js): rollup xử lý được
// nhưng thứ tự khởi tạo rất dễ gãy và cực khó lần ra. Thay vào đó admin.js gọi `dangKy({...})`
// một lần lúc nạp, file này chỉ đọc.
let A = {};
export function dangKy(api) { A = api; }

const apiGet = (...a) => A.apiGet(...a);
const apiPost = (...a) => A.apiPost(...a);
const apiPut = (...a) => A.apiPut(...a);
const apiDel = (...a) => A.apiDel(...a);
const esc = (s) => A.esc(s);
const toast = (...a) => A.toast(...a);
const openModal = (...a) => A.openModal(...a);
const closeModal = (...a) => A.closeModal(...a);
const confirmDialog = (...a) => A.confirmDialog(...a);
const _tien = (n) => A._tien(n);
/** Xem admin.js: kết quả về muộn của khu cũ không được ghi đè khu đang mở. */
const conDungLuot = (el, luot) => A.conDungLuot(el, luot);

// ------------------------------------------------------------------ helper chung

const $ = (id) => document.getElementById(id);
const nayISO = () => new Date().toISOString().slice(0, 10);
const kyNay = () => new Date().toISOString().slice(0, 7);

/** `2026-09-17` -> `17/09/2026`. Bảng biểu đọc theo lối Việt, không phải ISO. */
function ngayVi(d) {
  const s = String(d || '').slice(0, 10);
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
  return m ? `${m[3]}/${m[2]}/${m[1]}` : (s || '—');
}
/** `2026-09` -> `T9/2026` — nhãn cột trong bảng công nợ, phải ngắn vì có tới 12 cột. */
function kyVi(k) {
  const m = /^(\d{4})-(\d{2})$/.exec(String(k || ''));
  return m ? `T${Number(m[2])}/${m[1]}` : k;
}
const spin = '<div class="empty-state"><i class="fa-solid fa-spinner fa-spin"></i></div>';

/** Bảng chưa migrate thì nói đúng nguyên nhân, đừng để màn hình trắng. */
function canMigration(el) {
  el.innerHTML = `<div class="empty-state">
    <i class="fa-solid fa-database"></i>
    <h3>Chức năng chưa sẵn sàng</h3>
    <p>Database chưa có bảng cho khu này. Chạy <code>npm run db:migrate:prod</code> rồi tải lại trang.</p>
  </div>`;
}

/**
 * Nén ảnh ở TRÌNH DUYỆT trước khi gửi — giống `dhNenAnh` của khu du học (4.51).
 * Ảnh chụp điện thoại 3-5 MB gửi thẳng lên là vượt trần body và phình DB rất nhanh.
 */
function nenAnh(file) {
  const NGUONG = 420_000;   // ~420KB chuỗi base64
  const MAX = 1600;
  return new Promise((ok, loi) => {
    const fr = new FileReader();
    fr.onerror = () => loi(new Error('Không đọc được file ảnh.'));
    fr.onload = () => {
      const img = new Image();
      img.onerror = () => loi(new Error('File này không phải ảnh.'));
      img.onload = () => {
        let { width: w, height: h } = img;
        if (w > MAX || h > MAX) { const t = MAX / Math.max(w, h); w = Math.round(w * t); h = Math.round(h * t); }
        const c = document.createElement('canvas');
        c.width = w; c.height = h;
        c.getContext('2d').drawImage(img, 0, 0, w, h);
        let q = 0.85;
        let out = c.toDataURL('image/jpeg', q);
        // Hạ chất lượng dần thay vì hạ một phát xuống mức thấp — giữ ảnh nét nhất có thể trong
        // giới hạn dung lượng (yêu cầu rõ của chủ dự án ở 4.51).
        while (out.length > NGUONG && q > 0.4) { q -= 0.1; out = c.toDataURL('image/jpeg', q); }
        ok(out);
      };
      img.src = fr.result;
    };
    fr.readAsDataURL(file);
  });
}

/** Ô chọn ảnh dùng chung cho phiếu quỹ / biên lai KTX / ảnh câu hỏi. */
function oChonAnh(idHidden, nhan = 'Ảnh chứng từ') {
  return `<div class="form-group">
    <label>${nhan}</label>
    <input type="file" accept="image/*" onchange="adminApp.ttChonAnh(this, '${idHidden}')">
    <input type="hidden" id="${idHidden}">
    <div id="${idHidden}-xem" style="margin-top:8px"></div>
  </div>`;
}
async function ttChonAnh(input, idHidden) {
  const f = input.files?.[0];
  if (!f) return;
  try {
    const data = await nenAnh(f);
    $(idHidden).value = data;
    $(`${idHidden}-xem`).innerHTML =
      `<img src="${data}" style="max-width:220px;border-radius:8px;border:1px solid var(--admin-border)">
       <div style="font-size:12px;color:var(--admin-text-light);margin-top:4px">Đã nén còn ~${Math.round(data.length / 1024)} KB</div>`;
  } catch (e) {
    toast(e.message || 'Không xử lý được ảnh.', 'error');
  }
}

async function xemAnh(duongDan, tieuDe = 'Ảnh chứng từ') {
  try {
    const d = await apiGet(duongDan);
    openModal(tieuDe, `<img src="${d.anh}" style="width:100%;border-radius:8px">`);
  } catch (e) {
    toast(e.message || 'Không tải được ảnh.', 'error');
  }
}

// =============================================================
// 1. SỔ THU CHI
// =============================================================

const quyState = { loai: '', tu: '', den: '', danhMuc: '', tim: '', trang: 1, danhMuc_ds: [] };

async function renderQuy(el) {
  const luot = el.dataset.luot;
  el.innerHTML = spin;
  try {
    const [dm, ds] = await Promise.all([
      apiGet('/admin/quy/danh-muc'),
      apiGet(`/admin/quy/phieu?${new URLSearchParams({
        loai: quyState.loai, tu: quyState.tu, den: quyState.den,
        danh_muc: quyState.danhMuc, tim: quyState.tim, trang: quyState.trang,
      })}`),
    ]);
    if (!conDungLuot(el, luot)) return;
    if (dm.chua_migration || ds.chua_migration) return canMigration(el);
    quyState.danhMuc_ds = dm.danh_muc || [];
    const t = ds.tong || { thu: 0, chi: 0, ton: 0 };

    el.innerHTML = `
      <div class="stats-grid" style="margin-bottom:20px">
        <div class="stat-card"><div class="stat-icon" style="background:#DCFCE7;color:#16A34A"><i class="fa-solid fa-arrow-down"></i></div>
          <div><div class="stat-value">${_tien(t.thu)}</div><div class="stat-label">Tổng thu</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#FEE2E2;color:#DC2626"><i class="fa-solid fa-arrow-up"></i></div>
          <div><div class="stat-value">${_tien(t.chi)}</div><div class="stat-label">Tổng chi</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#E4F1EA;color:#265648"><i class="fa-solid fa-wallet"></i></div>
          <div><div class="stat-value" style="color:${t.ton < 0 ? '#DC2626' : 'inherit'}">${_tien(t.ton)}</div><div class="stat-label">Tồn quỹ</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#E6F0EC;color:#2F6B58"><i class="fa-solid fa-receipt"></i></div>
          <div><div class="stat-value">${ds.tong_so || 0}</div><div class="stat-label">Số phiếu</div></div></div>
      </div>

      <div class="table-toolbar">
        <div class="tt-loc">
          <label><span>Loại</span>
            <select onchange="adminApp.quyLoc('loai', this.value)">
              <option value="">Tất cả</option>
              <option value="thu" ${quyState.loai === 'thu' ? 'selected' : ''}>Phiếu thu</option>
              <option value="chi" ${quyState.loai === 'chi' ? 'selected' : ''}>Phiếu chi</option>
            </select></label>
          <label><span>Danh mục</span>
            <select onchange="adminApp.quyLoc('danhMuc', this.value)">
              <option value="">Tất cả</option>
              ${quyState.danhMuc_ds.map((d) => `<option value="${d.id}" ${String(quyState.danhMuc) === String(d.id) ? 'selected' : ''}>${esc(d.ten)}</option>`).join('')}
            </select></label>
          <label><span>Từ ngày</span>
            <input type="date" value="${quyState.tu}" onchange="adminApp.quyLoc('tu', this.value)"></label>
          <label><span>Đến ngày</span>
            <input type="date" value="${quyState.den}" onchange="adminApp.quyLoc('den', this.value)"></label>
          <label class="tt-loc-tim"><span>Tìm</span>
            <input type="search" placeholder="Mã phiếu, đối tượng…" value="${esc(quyState.tim)}"
                   onchange="adminApp.quyLoc('tim', this.value)"></label>
          ${(quyState.loai || quyState.tu || quyState.den || quyState.danhMuc || quyState.tim)
            ? '<button class="btn btn-sm btn-outline tt-loc-bo" onclick="adminApp.quyXoaLoc()"><i class="fa-solid fa-xmark"></i> Bỏ lọc</button>' : ''}
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-outline" onclick="adminApp.quyBaoCao()"><i class="fa-solid fa-chart-column"></i> Báo cáo</button>
          <button class="btn btn-outline" onclick="adminApp.quyDanhMuc()"><i class="fa-solid fa-tags"></i> Danh mục</button>
          <button class="btn btn-outline" onclick="adminApp.quyForm('chi')"><i class="fa-solid fa-minus"></i> Phiếu chi</button>
          <button class="btn btn-primary" onclick="adminApp.quyForm('thu')"><i class="fa-solid fa-plus"></i> Phiếu thu</button>
        </div>
      </div>

      <div class="data-table-wrapper"><div class="dh-table-wrap">
        <table class="data-table bang-the">
          <thead><tr>
            <th>Mã phiếu</th><th>Ngày</th><th>Loại</th><th>Danh mục</th>
            <th>Đối tượng</th><th style="text-align:right">Số tiền</th><th>Diễn giải</th><th></th>
          </tr></thead>
          <tbody>${(ds.phieu || []).map((p) => `
            <tr>
              <td data-nhan="Mã phiếu" style="font-family:var(--font-num,monospace);font-weight:700">${esc(p.ma_phieu)}</td>
              <td data-nhan="Ngày">${ngayVi(p.ngay)}</td>
              <td data-nhan="Loại"><span class="badge ${p.loai === 'thu' ? 'badge-success' : 'badge-danger'}">${p.loai === 'thu' ? 'Thu' : 'Chi'}</span></td>
              <td data-nhan="Danh mục">${esc(p.danh_muc_ten || '—')}</td>
              <td data-nhan="Đối tượng">${esc(p.doi_tuong || '—')}</td>
              <td data-nhan="Số tiền" class="quy-tien" style="text-align:right;font-weight:700;color:${p.loai === 'thu' ? '#16A34A' : '#DC2626'}">
                ${p.loai === 'thu' ? '+' : '−'}${_tien(p.so_tien)}</td>
              <td data-nhan="Diễn giải" style="max-width:240px" title="${esc(p.dien_giai || '')}">${esc((p.dien_giai || '').slice(0, 60))}</td>
              <td class="table-actions">
                ${p.co_anh ? `<button class="btn btn-icon btn-outline" title="Xem chứng từ" onclick="adminApp.quyXemAnh(${p.id})"><i class="fa-solid fa-image"></i></button>` : ''}
                <button class="btn btn-icon btn-outline" title="In phiếu" onclick="adminApp.quyIn(${p.id})"><i class="fa-solid fa-print"></i></button>
                <button class="btn btn-icon btn-outline" title="Xoá" onclick="adminApp.quyXoa(${p.id}, '${esc(p.ma_phieu)}')"><i class="fa-solid fa-trash"></i></button>
              </td>
            </tr>`).join('') || '<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-receipt"></i><h3>Chưa có phiếu nào</h3><p>Bấm “Phiếu thu” hoặc “Phiếu chi” để lập phiếu đầu tiên.</p></div></td></tr>'}
          </tbody>
        </table>
      </div></div>
      ${ds.tong_so > ds.moi_trang ? `
        <div class="table-toolbar" style="justify-content:center;gap:12px">
          <button class="btn btn-sm btn-outline" ${quyState.trang <= 1 ? 'disabled' : ''} onclick="adminApp.quyTrang(${quyState.trang - 1})">← Trước</button>
          <span>Trang ${ds.trang} / ${Math.ceil(ds.tong_so / ds.moi_trang)}</span>
          <button class="btn btn-sm btn-outline" ${quyState.trang * ds.moi_trang >= ds.tong_so ? 'disabled' : ''} onclick="adminApp.quyTrang(${quyState.trang + 1})">Sau →</button>
        </div>` : ''}
    `;
  } catch (e) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-triangle-exclamation"></i><h3>Không tải được sổ quỹ</h3><p>${esc(e.message || '')}</p></div>`;
  }
}

const veLaiQuy = () => renderQuy($('admin-content'));
function quyLoc(khoa, gt) { quyState[khoa] = gt; quyState.trang = 1; veLaiQuy(); }
function quyXoaLoc() { Object.assign(quyState, { loai: '', tu: '', den: '', danhMuc: '', tim: '', trang: 1 }); veLaiQuy(); }
function quyTrang(n) { quyState.trang = Math.max(1, n); veLaiQuy(); }

function quyForm(loai) {
  const dm = quyState.danhMuc_ds.filter((d) => d.loai === loai && d.is_active);
  openModal(loai === 'thu' ? 'Lập phiếu THU' : 'Lập phiếu CHI', `
    <div class="form-row">
      <div class="form-group"><label>Ngày *</label><input type="date" id="q-ngay" value="${nayISO()}"></div>
      <div class="form-group"><label>Số tiền (đ) *</label><input type="number" id="q-tien" min="0" step="1000" placeholder="0"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Danh mục</label>
        <select id="q-dm"><option value="">— chọn —</option>${dm.map((d) => `<option value="${d.id}">${esc(d.ten)}</option>`).join('')}</select></div>
      <div class="form-group"><label>Hình thức</label>
        <select id="q-ht"><option value="tien-mat">Tiền mặt</option><option value="chuyen-khoan">Chuyển khoản</option><option value="the">Thẻ</option><option value="khac">Khác</option></select></div>
    </div>
    <div class="form-group"><label>${loai === 'thu' ? 'Thu của ai' : 'Chi cho ai'}</label>
      <input id="q-doituong" placeholder="${loai === 'thu' ? 'Tên học viên / phụ huynh…' : 'Tên nhà cung cấp / nhân viên…'}"></div>
    <div class="form-group"><label>Diễn giải</label><textarea id="q-dg" rows="2" placeholder="Nội dung khoản ${loai === 'thu' ? 'thu' : 'chi'}"></textarea></div>
    ${oChonAnh('q-anh')}
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.quyLuu('${loai}')">Lưu phiếu</button>`);
}

async function quyLuu(loai) {
  const body = {
    loai, ngay: $('q-ngay').value, so_tien: $('q-tien').value,
    danh_muc_id: $('q-dm').value || null, hinh_thuc: $('q-ht').value,
    doi_tuong: $('q-doituong').value, dien_giai: $('q-dg').value,
    anh: $('q-anh').value || null,
  };
  try {
    const r = await apiPost('/admin/quy/phieu', body);
    closeModal();
    toast(`Đã lập phiếu ${r.ma_phieu}.`);
    veLaiQuy();
  } catch (e) { toast(e.message || 'Không lưu được phiếu.', 'error'); }
}

function quyXoa(id, ma) {
  confirmDialog('Xoá phiếu', `Xoá phiếu <b>${esc(ma)}</b>? Thao tác này không hoàn tác được.`, async () => {
    try { await apiDel(`/admin/quy/phieu/${id}`); toast('Đã xoá phiếu.'); veLaiQuy(); }
    catch (e) { toast(e.message || 'Không xoá được.', 'error'); }
  });
}
const quyXemAnh = (id) => xemAnh(`/admin/quy/phieu/${id}/anh`, 'Chứng từ');

/** In phiếu bằng cửa sổ in của trình duyệt — không thêm thư viện PDF nào. */
async function quyIn(id) {
  const ds = await apiGet(`/admin/quy/phieu?tim=&trang=1`);
  const p = (ds.phieu || []).find((x) => x.id === id);
  if (!p) return toast('Không tìm thấy phiếu.', 'error');
  const w = window.open('', '_blank', 'width=780,height=900');
  if (!w) return toast('Trình duyệt chặn cửa sổ in. Cho phép pop-up rồi thử lại.', 'error');
  w.document.write(`<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>${esc(p.ma_phieu)}</title>
    <style>
      body{font-family:system-ui,-apple-system,"Segoe UI",sans-serif;padding:40px;color:#1F2E33}
      h1{text-align:center;font-size:22px;margin:0 0 4px} .sub{text-align:center;color:#667;margin-bottom:28px}
      table{width:100%;border-collapse:collapse;margin-bottom:28px}
      td{padding:9px 6px;border-bottom:1px solid #e5e7eb;vertical-align:top}
      td:first-child{width:170px;color:#667} .tien{font-size:19px;font-weight:800}
      .ky{display:flex;justify-content:space-around;margin-top:56px;text-align:center}
      .ky div{width:200px} .ky b{display:block;margin-bottom:64px;font-weight:600}
    </style></head><body>
    <h1>${p.loai === 'thu' ? 'PHIẾU THU' : 'PHIẾU CHI'}</h1>
    <div class="sub">Số: ${esc(p.ma_phieu)} — Ngày ${ngayVi(p.ngay)}</div>
    <table>
      <tr><td>${p.loai === 'thu' ? 'Thu của' : 'Chi cho'}</td><td><b>${esc(p.doi_tuong || '—')}</b></td></tr>
      <tr><td>Danh mục</td><td>${esc(p.danh_muc_ten || '—')}</td></tr>
      <tr><td>Số tiền</td><td class="tien">${_tien(p.so_tien)}</td></tr>
      <tr><td>Hình thức</td><td>${({ 'tien-mat': 'Tiền mặt', 'chuyen-khoan': 'Chuyển khoản', the: 'Thẻ', khac: 'Khác' })[p.hinh_thuc] || p.hinh_thuc}</td></tr>
      <tr><td>Nội dung</td><td>${esc(p.dien_giai || '—')}</td></tr>
      <tr><td>Người lập</td><td>${esc(p.nguoi_lap || '—')}</td></tr>
    </table>
    <div class="ky">
      <div><b>Người nộp/nhận tiền</b><i>(ký, ghi rõ họ tên)</i></div>
      <div><b>Người lập phiếu</b><i>(ký, ghi rõ họ tên)</i></div>
    </div>
    <script>window.onload=()=>window.print()<\/script></body></html>`);
  w.document.close();
}

async function quyDanhMuc() {
  const d = await apiGet('/admin/quy/danh-muc');
  const nhom = (loai) => (d.danh_muc || []).filter((x) => x.loai === loai);
  const hang = (x) => `<tr>
      <td>${esc(x.ten)}</td>
      <td>${x.is_active ? '<span class="badge badge-success">Đang dùng</span>' : '<span class="badge badge-gray">Đã tắt</span>'}</td>
      <td class="table-actions">
        <button class="btn btn-sm btn-outline" onclick="adminApp.quyDmBat(${x.id}, ${x.is_active ? 0 : 1})">${x.is_active ? 'Tắt' : 'Bật'}</button>
        <button class="btn btn-icon btn-outline" onclick="adminApp.quyDmXoa(${x.id}, '${esc(x.ten)}')"><i class="fa-solid fa-trash"></i></button>
      </td></tr>`;
  openModal('Danh mục thu – chi', `
    <div class="form-row">
      <div class="form-group"><label>Thêm danh mục</label><input id="dm-ten" placeholder="Tên danh mục"></div>
      <div class="form-group"><label>Loại</label>
        <select id="dm-loai"><option value="thu">Khoản thu</option><option value="chi">Khoản chi</option></select></div>
    </div>
    <button class="btn btn-primary btn-sm" onclick="adminApp.quyDmThem()"><i class="fa-solid fa-plus"></i> Thêm</button>
    <h4 style="margin:18px 0 8px">Khoản thu</h4>
    <div class="data-table-wrapper"><table class="data-table"><tbody>${nhom('thu').map(hang).join('') || '<tr><td>Chưa có</td></tr>'}</tbody></table></div>
    <h4 style="margin:18px 0 8px">Khoản chi</h4>
    <div class="data-table-wrapper"><table class="data-table"><tbody>${nhom('chi').map(hang).join('') || '<tr><td>Chưa có</td></tr>'}</tbody></table></div>
  `);
}
async function quyDmThem() {
  try {
    await apiPost('/admin/quy/danh-muc', { ten: $('dm-ten').value, loai: $('dm-loai').value });
    toast('Đã thêm danh mục.'); closeModal(); quyDanhMuc();
  } catch (e) { toast(e.message || 'Không thêm được.', 'error'); }
}
async function quyDmBat(id, bat) {
  try { await apiPut(`/admin/quy/danh-muc/${id}`, { is_active: bat }); closeModal(); quyDanhMuc(); }
  catch (e) { toast(e.message || 'Không đổi được.', 'error'); }
}
function quyDmXoa(id, ten) {
  confirmDialog('Xoá danh mục', `Xoá danh mục <b>${esc(ten)}</b>?`, async () => {
    try { await apiDel(`/admin/quy/danh-muc/${id}`); toast('Đã xoá.'); closeModal(); quyDanhMuc(); }
    catch (e) { toast(e.message || 'Không xoá được.', 'error'); }
  });
}

async function quyBaoCao() {
  const den = nayISO();
  const tu = new Date(Date.now() - 180 * 864e5).toISOString().slice(0, 10);
  openModal('Báo cáo thu chi', spin);
  try {
    const d = await apiGet(`/admin/quy/bao-cao?tu=${tu}&den=${den}`);
    const max = Math.max(1, ...d.theo_thang.map((t) => Math.max(t.thu, t.chi)));
    const nhanNguon = { phieu: 'Phiếu tự lập', 'du-hoc': 'Phí dịch vụ du học', ktx: 'Ký túc xá' };
    const than = document.querySelector('.admin-modal-overlay .modal-body');
    if (!than) return;
    than.innerHTML = `
      <div style="display:flex;gap:16px;margin-bottom:18px;flex-wrap:wrap">
        <div><div style="color:#667;font-size:12px">TỔNG THU</div><div style="font-size:20px;font-weight:800;color:#16A34A">${_tien(d.tong.thu)}</div></div>
        <div><div style="color:#667;font-size:12px">TỔNG CHI</div><div style="font-size:20px;font-weight:800;color:#DC2626">${_tien(d.tong.chi)}</div></div>
        <div><div style="color:#667;font-size:12px">TỒN</div><div style="font-size:20px;font-weight:800">${_tien(d.tong.ton)}</div></div>
      </div>
      <p style="color:#667;font-size:13px;margin-bottom:14px">Từ ${ngayVi(tu)} đến ${ngayVi(den)} · ${d.tong.so_dong} giao dịch ·
        gộp <b>cả ba nguồn</b>: phiếu tự lập, phí du học, tiền ký túc xá (bảng ngoài chỉ đếm phiếu tự lập).</p>

      <h4 style="margin:0 0 10px">Thu chi 6 tháng gần nhất</h4>
      <div class="quy-bieudo" style="display:flex;gap:10px;align-items:flex-end;height:150px;padding:10px;background:var(--admin-bg);border-radius:10px;margin-bottom:20px;overflow-x:auto">
        ${d.theo_thang.map((t) => `
          <div style="flex:1;text-align:center">
            <div style="display:flex;gap:3px;align-items:flex-end;height:110px;justify-content:center">
              <div title="Thu ${_tien(t.thu)}" style="width:15px;background:#16A34A;border-radius:3px 3px 0 0;height:${Math.round((t.thu / max) * 100)}%"></div>
              <div title="Chi ${_tien(t.chi)}" style="width:15px;background:#DC2626;border-radius:3px 3px 0 0;height:${Math.round((t.chi / max) * 100)}%"></div>
            </div>
            <div style="font-size:11px;color:#667;margin-top:5px">${kyVi(t.thang)}</div>
          </div>`).join('') || '<div class="empty-state">Chưa có dữ liệu</div>'}
      </div>

      <h4 style="margin:0 0 10px">Theo danh mục</h4>
      <div class="data-table-wrapper"><table class="data-table bang-the">
        <thead><tr><th>Danh mục</th><th>Loại</th><th style="text-align:right">Số tiền</th><th style="text-align:right">Số giao dịch</th></tr></thead>
        <tbody>${d.theo_danh_muc.map((x) => `<tr>
          <td data-nhan="Danh mục">${esc(x.danh_muc)}</td>
          <td data-nhan="Loại"><span class="badge ${x.loai === 'thu' ? 'badge-success' : 'badge-danger'}">${x.loai === 'thu' ? 'Thu' : 'Chi'}</span></td>
          <td data-nhan="Số tiền" style="text-align:right;font-weight:700">${_tien(x.tong)}</td>
          <td data-nhan="Số giao dịch" style="text-align:right">${x.so_dong}</td></tr>`).join('') || '<tr><td colspan="4">Chưa có dữ liệu</td></tr>'}</tbody>
      </table></div>

      <h4 style="margin:18px 0 10px">Theo nguồn</h4>
      <p style="color:#667;font-size:13px;margin-bottom:8px">Tiền du học và tiền ký túc xá được gộp vào báo cáo này nhưng
        <b>không sinh phiếu</b> — sửa các khoản đó ở chính khu Hồ sơ du học / Ký túc xá.</p>
      <div class="data-table-wrapper"><table class="data-table bang-the">
        <thead><tr><th>Nguồn</th><th style="text-align:right">Thu</th><th style="text-align:right">Chi</th></tr></thead>
        <tbody>${d.theo_nguon.map((x) => `<tr><td data-nhan="Nguồn">${nhanNguon[x.nguon] || x.nguon}</td>
          <td data-nhan="Thu" style="text-align:right;color:#16A34A">${_tien(x.thu)}</td>
          <td data-nhan="Chi" style="text-align:right;color:#DC2626">${_tien(x.chi)}</td></tr>`).join('') || '<tr><td colspan="3">Chưa có dữ liệu</td></tr>'}</tbody>
      </table></div>
      <div style="margin-top:16px"><button class="btn btn-outline" onclick="adminApp.quyXuatCsv('${tu}','${den}')">
        <i class="fa-solid fa-file-csv"></i> Xuất CSV</button></div>`;
  } catch (e) { toast(e.message || 'Không dựng được báo cáo.', 'error'); }
}

async function quyXuatCsv(tu, den) {
  try {
    const d = await apiGet(`/admin/quy/bao-cao?tu=${tu}&den=${den}`);
    const dong = [['Thang', 'Thu', 'Chi', 'Chenh lech']];
    for (const t of d.theo_thang) dong.push([t.thang, t.thu, t.chi, t.thu - t.chi]);
    dong.push([], ['Danh muc', 'Loai', 'So tien', 'So giao dich']);
    for (const x of d.theo_danh_muc) dong.push([x.danh_muc, x.loai, x.tong, x.so_dong]);
    // BOM UTF-8 để Excel trên Windows không hiện chữ Việt thành ký tự lạ — cùng cách báo cáo lớp
    // đang làm (4.15).
    const csv = '﻿' + dong.map((r) => r.map((c) => `"${String(c ?? '').replace(/"/g, '""')}"`).join(',')).join('\n');
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    a.download = `thu-chi-${tu}-${den}.csv`;
    a.click();
    URL.revokeObjectURL(a.href);
  } catch (e) { toast(e.message || 'Không xuất được CSV.', 'error'); }
}

export { renderQuy };
export const quyHandlers = {
  quyLoc, quyXoaLoc, quyTrang, quyForm, quyLuu, quyXoa, quyXemAnh, quyIn,
  quyDanhMuc, quyDmThem, quyDmBat, quyDmXoa, quyBaoCao, quyXuatCsv, ttChonAnh,
};

// =============================================================
// 2. KÝ TÚC XÁ
// =============================================================
// ⚠️ KHÔNG liên quan `du_hoc_ho_so.ktx_*` — 5 cột đó là nguyện vọng ở KTX của TRƯỜNG BÊN ĐÀI LOAN
//    (4.51). Đây là chỗ ở do chính trung tâm vận hành.

const ktxState = { view: 'phong', phongId: null, toaLoc: '', chiTiet: null };

async function renderKtx(el) {
  const luot = el.dataset.luot;
  if (ktxState.view === 'chi-tiet' && ktxState.phongId) return ktxChiTiet(el);
  if (ktxState.view === 'cong-no') return ktxCongNo(el);
  el.innerHTML = spin;
  try {
    const [tq, toa, phong] = await Promise.all([
      apiGet('/admin/ktx/tong-quan'),
      apiGet('/admin/ktx/toa'),
      apiGet(`/admin/ktx/phong${ktxState.toaLoc ? `?toa_id=${ktxState.toaLoc}` : ''}`),
    ]);
    if (!conDungLuot(el, luot)) return;
    if (tq.chua_migration) return canMigration(el);

    el.innerHTML = `
      <div class="stats-grid" style="margin-bottom:20px">
        <div class="stat-card"><div class="stat-icon" style="background:#E4F1EA;color:#265648"><i class="fa-solid fa-building"></i></div>
          <div><div class="stat-value">${tq.so_phong}</div><div class="stat-label">Phòng (${tq.so_toa} toà)</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#DCFCE7;color:#16A34A"><i class="fa-solid fa-bed"></i></div>
          <div><div class="stat-value">${tq.dang_o}/${tq.tong_cho}</div><div class="stat-label">Đang ở / tổng chỗ</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#FBEEDF;color:#B85C1A"><i class="fa-solid fa-door-open"></i></div>
          <div><div class="stat-value">${tq.con_trong}</div><div class="stat-label">Chỗ còn trống</div></div></div>
        <div class="stat-card" ${tq.chua_dong.length ? 'style="border-color:#FCA5A5"' : ''}>
          <div class="stat-icon" style="background:${tq.chua_dong.length ? '#FEE2E2;color:#DC2626' : '#DCFCE7;color:#16A34A'}"><i class="fa-solid fa-money-bill-wave"></i></div>
          <div><div class="stat-value">${tq.chua_dong.length}</div><div class="stat-label">Chưa đóng ${kyVi(tq.ky)}</div></div></div>
      </div>

      ${tq.chua_dong.length ? `
        <div class="ktx-canhbao">
          <div class="ktx-canhbao-dau">
            <i class="fa-solid fa-triangle-exclamation"></i>
            <span>Chưa đóng tiền ${kyVi(tq.ky)} (${tq.chua_dong.length} người)</span>
          </div>
          <div class="ktx-no-ds">
            ${tq.chua_dong.slice(0, 10).map((x) => `
              <div class="ktx-no-hang">
                <div class="ktx-no-ten">
                  <b>${esc(x.ho_ten)}</b>
                  <span>${esc(x.toa_ten)} · ${esc(x.ten_phong)}</span>
                </div>
                <div class="ktx-no-tien">${_tien(x.gia_thang)}</div>
                <button class="btn btn-sm btn-primary" onclick="adminApp.ktxThuForm(${x.id}, '${esc(x.ho_ten)}', ${x.gia_thang})">Thu tiền</button>
              </div>`).join('')}
            ${tq.chua_dong.length > 10 ? `<div class="ktx-no-hang" style="justify-content:center">
              <a href="#" onclick="adminApp.ktxXem('cong-no');return false">Xem tất cả ${tq.chua_dong.length} người →</a></div>` : ''}
          </div>
        </div>` : ''}

      <div class="table-toolbar">
        <div class="tt-loc">
          <label><span>Toà / cơ sở</span>
            <select onchange="adminApp.ktxLocToa(this.value)">
              <option value="">Tất cả</option>
              ${(toa.toa || []).map((t) => `<option value="${t.id}" ${String(ktxState.toaLoc) === String(t.id) ? 'selected' : ''}>${esc(t.ten)}</option>`).join('')}
            </select></label>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-outline" onclick="adminApp.ktxXem('cong-no')"><i class="fa-solid fa-table"></i> Bảng công nợ</button>
          <button class="btn btn-outline" onclick="adminApp.ktxToaForm()"><i class="fa-solid fa-building"></i> Thêm toà</button>
          <button class="btn btn-primary" onclick="adminApp.ktxPhongForm()"><i class="fa-solid fa-plus"></i> Thêm phòng</button>
        </div>
      </div>

      ${(toa.toa || []).length === 0 ? `
        <div class="empty-state"><i class="fa-solid fa-building"></i><h3>Chưa có toà nào</h3>
          <p>Thêm toà / cơ sở trước, rồi thêm phòng vào đó.</p>
          <button class="btn btn-primary" onclick="adminApp.ktxToaForm()">Thêm toà đầu tiên</button></div>` : ''}

      ${(toa.toa || []).filter((t) => !ktxState.toaLoc || String(t.id) === String(ktxState.toaLoc)).map((t) => {
        const ph = (phong.phong || []).filter((p) => p.toa_id === t.id);
        return `
        <div style="margin-bottom:24px">
          <div class="ktx-toa-dau">
            <div class="ktx-toa-ten">
              <h3>${esc(t.ten)}</h3>
              <span class="badge badge-gray">${t.dang_o}/${t.tong_cho} người</span>
              ${t.trang_thai === 'dong' ? '<span class="badge badge-danger">Ngừng cho thuê</span>' : ''}
            </div>
            <div class="ktx-toa-phai">
              ${t.dia_chi ? `<span class="ktx-toa-dc">${esc(t.dia_chi)}</span>` : ''}
              <button class="btn btn-icon btn-outline" title="Sửa toà" onclick="adminApp.ktxToaForm(${t.id})"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-icon btn-outline" title="Xoá toà" onclick="adminApp.ktxToaXoa(${t.id}, '${esc(t.ten)}')"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
          <div class="ktx-luoi">
            ${ph.map((p) => {
              const day = p.dang_o >= p.suc_chua;
              const pct = p.suc_chua ? Math.round((p.dang_o / p.suc_chua) * 100) : 0;
              return `
              <div class="ktx-the ${p.no_thang_nay > 0 ? 'is-no' : ''} ${p.trang_thai !== 'dang-dung' ? 'is-tat' : ''}"
                   onclick="adminApp.ktxXemPhong(${p.id})">
                <div class="ktx-the-dau">
                  <b>${esc(p.ten_phong)}</b>
                  <span class="badge ${p.trang_thai !== 'dang-dung' ? 'badge-gray' : day ? 'badge-warning' : 'badge-success'}">
                    ${p.trang_thai === 'bao-tri' ? 'Bảo trì' : p.trang_thai === 'dong' ? 'Đóng' : `${p.dang_o}/${p.suc_chua}`}</span>
                </div>
                <div class="ktx-the-phu">
                  ${p.tang ? `Tầng ${esc(p.tang)} · ` : ''}${({ nam: 'Phòng nam', nu: 'Phòng nữ', chung: 'Phòng chung' })[p.loai]}
                </div>
                <div class="ktx-thanh"><i style="width:${pct}%"></i></div>
                <div class="ktx-gia">${_tien(p.gia_thang)} <small>/ tháng</small></div>
                ${p.no_thang_nay > 0 ? `<div class="ktx-no">
                  <i class="fa-solid fa-triangle-exclamation"></i> ${p.no_thang_nay} người chưa đóng</div>` : ''}
              </div>`;
            }).join('') || '<div style="color:#667;padding:10px">Toà này chưa có phòng nào.</div>'}
          </div>
        </div>`;
      }).join('')}
    `;
  } catch (e) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-triangle-exclamation"></i><h3>Không tải được</h3><p>${esc(e.message || '')}</p></div>`;
  }
}

const veLaiKtx = () => renderKtx($('admin-content'));
function ktxXem(view) { ktxState.view = view; ktxState.phongId = null; veLaiKtx(); }
function ktxLocToa(id) { ktxState.toaLoc = id; veLaiKtx(); }
function ktxXemPhong(id) { ktxState.view = 'chi-tiet'; ktxState.phongId = id; veLaiKtx(); }

async function ktxChiTiet(el) {
  el.innerHTML = spin;
  try {
    const d = await apiGet(`/admin/ktx/phong/${ktxState.phongId}`);
    const p = d.phong;
    const dangO = d.nguoi_o.filter((x) => x.trang_thai === 'dang-o');
    const daTra = d.nguoi_o.filter((x) => x.trang_thai === 'da-tra');
    const thuTheoNguoi = (oId) => d.thu_tien.filter((t) => t.o_id === oId);

    el.innerHTML = `
      <button class="btn btn-outline" onclick="adminApp.ktxXem('phong')" style="margin-bottom:16px">
        <i class="fa-solid fa-arrow-left"></i> Về danh sách phòng</button>

      <div class="table-toolbar">
        <div>
          <h2 style="margin:0">${esc(p.toa_ten)} · ${esc(p.ten_phong)}</h2>
          <div style="color:#667;font-size:13px;margin-top:4px">
            ${p.tang ? `Tầng ${esc(p.tang)} · ` : ''}Phòng ${({ nam: 'nam', nu: 'nữ', chung: 'chung' })[p.loai]} ·
            ${dangO.length}/${p.suc_chua} người · ${_tien(p.gia_thang)}/tháng
            ${p.tien_ich ? `<br>Tiện ích: ${esc(p.tien_ich)}` : ''}
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-outline" onclick="adminApp.ktxPhongForm(${p.id})"><i class="fa-solid fa-pen"></i> Sửa phòng</button>
          <button class="btn btn-primary" ${dangO.length >= p.suc_chua ? 'disabled title="Phòng đã đầy"' : ''}
                  onclick="adminApp.ktxNguoiForm(${p.id}, ${p.gia_thang})"><i class="fa-solid fa-user-plus"></i> Thêm người ở</button>
        </div>
      </div>

      <h3 style="margin:18px 0 10px">Đang ở (${dangO.length})</h3>
      <div class="data-table-wrapper"><div class="dh-table-wrap"><table class="data-table bang-the">
        <thead><tr><th>Họ tên</th><th>Điện thoại</th><th>Hồ sơ du học</th><th>Vào ở</th>
          <th style="text-align:right">Giá/tháng</th><th style="text-align:right">Cọc</th><th>Đã thu</th><th></th></tr></thead>
        <tbody>${dangO.map((o) => {
          const thu = thuTheoNguoi(o.id);
          const tong = thu.reduce((s, t) => s + (t.loai === 'hoan-coc' ? -Number(t.so_tien) : Number(t.so_tien)), 0);
          return `<tr>
            <td data-nhan="Họ tên"><b>${esc(o.ho_ten)}</b></td>
            <td data-nhan="Điện thoại">${esc(o.phone || '—')}</td>
            <td data-nhan="Hồ sơ">${o.ma_hs ? `<span class="badge badge-gray">${esc(o.ma_hs)}</span>` : '—'}</td>
            <td data-nhan="Vào ở">${ngayVi(o.ngay_vao)}</td>
            <td data-nhan="Giá/tháng" style="text-align:right">${_tien(o.gia_thang)}</td>
            <td data-nhan="Cọc" style="text-align:right">${_tien(o.tien_coc)}</td>
            <td data-nhan="Đã thu">${_tien(tong)} <span style="color:#667">(${thu.length} lần)</span></td>
            <td class="table-actions">
              <button class="btn btn-sm btn-primary" onclick="adminApp.ktxThuForm(${o.id}, '${esc(o.ho_ten)}', ${o.gia_thang})">Thu tiền</button>
              <button class="btn btn-icon btn-outline" title="Sửa" onclick="adminApp.ktxNguoiSua(${o.id}, '${esc(o.ho_ten)}', '${esc(o.phone || '')}', ${o.gia_thang}, ${o.tien_coc})"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-icon btn-outline" title="Cho trả phòng" onclick="adminApp.ktxTraPhong(${o.id}, '${esc(o.ho_ten)}')"><i class="fa-solid fa-right-from-bracket"></i></button>
            </td></tr>`;
        }).join('') || '<tr><td colspan="8"><div class="empty-state"><i class="fa-solid fa-bed"></i><p>Phòng này chưa có ai ở.</p></div></td></tr>'}
        </tbody></table></div></div>

      ${daTra.length ? `
        <h3 style="margin:22px 0 10px">Đã trả phòng (${daTra.length})</h3>
        <div class="data-table-wrapper"><table class="data-table">
          <thead><tr><th>Họ tên</th><th>Ở từ</th><th>Đến</th><th></th></tr></thead>
          <tbody>${daTra.map((o) => `<tr style="opacity:.65">
            <td>${esc(o.ho_ten)}</td><td>${ngayVi(o.ngay_vao)}</td><td>${ngayVi(o.ngay_ra)}</td>
            <td class="table-actions"><button class="btn btn-icon btn-outline" title="Xoá bản ghi"
              onclick="adminApp.ktxNguoiXoa(${o.id}, '${esc(o.ho_ten)}')"><i class="fa-solid fa-trash"></i></button></td>
          </tr>`).join('')}</tbody></table></div>` : ''}

      <h3 style="margin:22px 0 10px">Lịch sử thu tiền</h3>
      <div class="data-table-wrapper"><div class="dh-table-wrap"><table class="data-table bang-the">
        <thead><tr><th>Kỳ</th><th>Người ở</th><th>Khoản</th><th style="text-align:right">Số tiền</th>
          <th>Ngày thu</th><th>Hình thức</th><th>Người thu</th><th></th></tr></thead>
        <tbody>${d.thu_tien.map((t) => `<tr>
          <td data-nhan="Kỳ"><b>${kyVi(t.ky)}</b></td>
          <td data-nhan="Người ở">${esc(t.ho_ten)}</td>
          <td data-nhan="Khoản">${({ 'tien-phong': 'Tiền phòng', 'dien-nuoc': 'Điện nước', coc: 'Tiền cọc', 'hoan-coc': 'Hoàn cọc', khac: 'Khác' })[t.loai] || t.loai}</td>
          <td data-nhan="Số tiền" class="quy-tien" style="text-align:right;font-weight:700;color:${t.loai === 'hoan-coc' ? '#DC2626' : '#16A34A'}">
            ${t.loai === 'hoan-coc' ? '−' : '+'}${_tien(t.so_tien)}</td>
          <td data-nhan="Ngày thu">${ngayVi(t.ngay_thu)}</td>
          <td data-nhan="Hình thức">${({ 'tien-mat': 'Tiền mặt', 'chuyen-khoan': 'Chuyển khoản', the: 'Thẻ', khac: 'Khác' })[t.hinh_thuc]}</td>
          <td data-nhan="Người thu">${esc(t.nguoi_thu || '—')}</td>
          <td class="table-actions">
            ${t.co_anh ? `<button class="btn btn-icon btn-outline" title="Xem biên lai" onclick="adminApp.ktxXemAnh(${t.id})"><i class="fa-solid fa-image"></i></button>` : ''}
            <button class="btn btn-icon btn-outline" title="Xoá" onclick="adminApp.ktxThuXoa(${t.id})"><i class="fa-solid fa-trash"></i></button>
          </td></tr>`).join('') || '<tr><td colspan="8"><div class="empty-state"><p>Chưa có khoản thu nào.</p></div></td></tr>'}
        </tbody></table></div></div>
    `;
  } catch (e) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-triangle-exclamation"></i><h3>Không tải được phòng</h3><p>${esc(e.message || '')}</p></div>`;
  }
}

async function ktxCongNo(el) {
  el.innerHTML = spin;
  try {
    const d = await apiGet('/admin/ktx/cong-no');
    el.innerHTML = `
      <button class="btn btn-outline" onclick="adminApp.ktxXem('phong')" style="margin-bottom:16px">
        <i class="fa-solid fa-arrow-left"></i> Về danh sách phòng</button>
      <div class="table-toolbar"><h2 style="margin:0">Bảng công nợ tiền phòng</h2>
        <div style="color:#667;font-size:13px">
          <span style="display:inline-block;width:12px;height:12px;background:#16A34A;border-radius:3px;vertical-align:-1px"></span> đã đóng ·
          <span style="display:inline-block;width:12px;height:12px;background:#FCA5A5;border-radius:3px;vertical-align:-1px"></span> chưa đóng ·
          <span style="display:inline-block;width:12px;height:12px;background:#E5E7EB;border-radius:3px;vertical-align:-1px"></span> chưa ở
        </div></div>
      <p class="cn-keo">Vuốt ngang bảng để xem các tháng còn lại.</p>
      <div class="data-table-wrapper"><div class="dh-table-wrap"><table class="data-table bang-congno">
        <thead><tr><th>Người ở</th><th class="cn-an">Phòng</th><th class="cn-an" style="text-align:right">Giá</th>
          ${d.cac_ky.map((k) => `<th style="text-align:center">${kyVi(k)}</th>`).join('')}</tr></thead>
        <tbody>${(d.bang || []).map((n) => `<tr ${n.trang_thai === 'da-tra' ? 'style="opacity:.55"' : ''}>
          <td><b>${esc(n.ho_ten)}</b>${n.trang_thai === 'da-tra' ? ' <span class="badge badge-gray">đã trả</span>' : ''}
            <small class="cn-phu">${esc(n.ten_phong)} · ${_tien(n.gia_thang)}/tháng</small></td>
          <td class="cn-an">${esc(n.toa_ten)} · ${esc(n.ten_phong)}</td>
          <td class="cn-an" style="text-align:right">${_tien(n.gia_thang)}</td>
          ${n.o.map((o) => {
            if (o.ngoai) return '<td style="text-align:center;background:#F3F4F6"></td>';
            return o.da_dong
              ? '<td style="text-align:center;background:#DCFCE7;color:#166534;font-weight:700">✓</td>'
              : `<td style="text-align:center;background:#FEE2E2"><button class="btn btn-sm btn-outline"
                   style="padding:2px 8px" onclick="adminApp.ktxThuForm(${n.id}, '${esc(n.ho_ten)}', ${n.gia_thang}, '${o.ky}')">Thu</button></td>`;
          }).join('')}
        </tr>`).join('') || `<tr><td colspan="${3 + d.cac_ky.length}"><div class="empty-state"><p>Chưa có ai ở ký túc xá.</p></div></td></tr>`}
        </tbody></table></div></div>`;
  } catch (e) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-triangle-exclamation"></i><h3>Không tải được bảng công nợ</h3><p>${esc(e.message || '')}</p></div>`;
  }
}

// --- form toà / phòng / người ở / thu tiền ---

async function ktxToaForm(id = null) {
  let t = { ten: '', dia_chi: '', ghi_chu: '', trang_thai: 'dang-dung' };
  if (id) { const d = await apiGet('/admin/ktx/toa'); t = (d.toa || []).find((x) => x.id === id) || t; }
  openModal(id ? 'Sửa toà / cơ sở' : 'Thêm toà / cơ sở', `
    <div class="form-group"><label>Tên toà / cơ sở *</label><input id="kt-ten" value="${esc(t.ten)}" placeholder="VD: Cơ sở Nguyễn Trãi"></div>
    <div class="form-group"><label>Địa chỉ</label><input id="kt-dc" value="${esc(t.dia_chi || '')}"></div>
    <div class="form-group"><label>Ghi chú</label><textarea id="kt-gc" rows="2">${esc(t.ghi_chu || '')}</textarea></div>
    ${id ? `<div class="form-group"><label>Trạng thái</label><select id="kt-tt">
      <option value="dang-dung" ${t.trang_thai === 'dang-dung' ? 'selected' : ''}>Đang dùng</option>
      <option value="dong" ${t.trang_thai === 'dong' ? 'selected' : ''}>Ngừng cho thuê</option></select></div>` : ''}
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.ktxToaLuu(${id || 'null'})">Lưu</button>`);
}
async function ktxToaLuu(id) {
  const body = { ten: $('kt-ten').value, dia_chi: $('kt-dc').value, ghi_chu: $('kt-gc').value };
  if ($('kt-tt')) body.trang_thai = $('kt-tt').value;
  try {
    if (id) await apiPut(`/admin/ktx/toa/${id}`, body); else await apiPost('/admin/ktx/toa', body);
    closeModal(); toast('Đã lưu toà.'); veLaiKtx();
  } catch (e) { toast(e.message || 'Không lưu được.', 'error'); }
}
function ktxToaXoa(id, ten) {
  confirmDialog('Xoá toà', `Xoá <b>${esc(ten)}</b> cùng toàn bộ phòng bên trong?`, async () => {
    try { await apiDel(`/admin/ktx/toa/${id}`); toast('Đã xoá toà.'); veLaiKtx(); }
    catch (e) { toast(e.message || 'Không xoá được.', 'error'); }
  });
}

async function ktxPhongForm(id = null) {
  const dsToa = await apiGet('/admin/ktx/toa');
  let p = { ten_phong: '', tang: '', suc_chua: 4, loai: 'chung', gia_thang: 0, tien_ich: '', trang_thai: 'dang-dung', toa_id: ktxState.toaLoc || dsToa.toa?.[0]?.id };
  if (id) { const d = await apiGet(`/admin/ktx/phong/${id}`); p = d.phong; }
  if (!dsToa.toa?.length) return toast('Thêm toà / cơ sở trước đã.', 'error');
  openModal(id ? 'Sửa phòng' : 'Thêm phòng', `
    ${id ? '' : `<div class="form-group"><label>Toà / cơ sở *</label><select id="kp-toa">
      ${dsToa.toa.map((t) => `<option value="${t.id}" ${String(p.toa_id) === String(t.id) ? 'selected' : ''}>${esc(t.ten)}</option>`).join('')}</select></div>`}
    <div class="form-row dh-f3">
      <div class="form-group"><label>Tên phòng *</label><input id="kp-ten" value="${esc(p.ten_phong)}" placeholder="P101"></div>
      <div class="form-group"><label>Tầng</label><input id="kp-tang" value="${esc(p.tang || '')}"></div>
      <div class="form-group"><label>Sức chứa *</label><input type="number" id="kp-sc" min="1" max="50" value="${p.suc_chua}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Loại phòng</label><select id="kp-loai">
        <option value="chung" ${p.loai === 'chung' ? 'selected' : ''}>Chung</option>
        <option value="nam" ${p.loai === 'nam' ? 'selected' : ''}>Nam</option>
        <option value="nu" ${p.loai === 'nu' ? 'selected' : ''}>Nữ</option></select></div>
      <div class="form-group"><label>Giá thuê / tháng (đ)</label><input type="number" id="kp-gia" min="0" step="100000" value="${p.gia_thang}"></div>
    </div>
    <div class="form-group"><label>Tiện ích</label><input id="kp-ti" value="${esc(p.tien_ich || '')}" placeholder="Điều hoà, nóng lạnh, wifi…"></div>
    ${id ? `<div class="form-group"><label>Trạng thái</label><select id="kp-tt">
      <option value="dang-dung" ${p.trang_thai === 'dang-dung' ? 'selected' : ''}>Đang dùng</option>
      <option value="bao-tri" ${p.trang_thai === 'bao-tri' ? 'selected' : ''}>Bảo trì</option>
      <option value="dong" ${p.trang_thai === 'dong' ? 'selected' : ''}>Ngừng cho thuê</option></select></div>` : ''}
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.ktxPhongLuu(${id || 'null'})">Lưu</button>`);
}
async function ktxPhongLuu(id) {
  const body = {
    ten_phong: $('kp-ten').value, tang: $('kp-tang').value, suc_chua: $('kp-sc').value,
    loai: $('kp-loai').value, gia_thang: $('kp-gia').value, tien_ich: $('kp-ti').value,
  };
  if ($('kp-toa')) body.toa_id = $('kp-toa').value;
  if ($('kp-tt')) body.trang_thai = $('kp-tt').value;
  try {
    if (id) await apiPut(`/admin/ktx/phong/${id}`, body); else await apiPost('/admin/ktx/phong', body);
    closeModal(); toast('Đã lưu phòng.'); veLaiKtx();
  } catch (e) { toast(e.message || 'Không lưu được.', 'error'); }
}

async function ktxNguoiForm(phongId, giaPhong) {
  const hs = await apiGet('/admin/ktx/ho-so-chon').catch(() => ({ ho_so: [] }));
  const chon = (hs.ho_so || []).filter((h) => !h.phong_dang_o);
  openModal('Thêm người ở', `
    ${chon.length ? `<div class="form-group"><label>Chọn từ hồ sơ du học (không bắt buộc)</label>
      <select id="kn-hoso" onchange="adminApp.ktxChonHoSo(this)">
        <option value="">— nhập tay —</option>
        ${chon.map((h) => `<option value="${h.id}" data-ten="${esc(h.ho_ten)}" data-phone="${esc(h.phone || '')}">${esc(h.ma_hs)} · ${esc(h.ho_ten)}</option>`).join('')}
      </select>
      <div style="font-size:12px;color:#667;margin-top:4px">Người ở không bắt buộc phải có hồ sơ du học — có thể nhập tay.</div></div>` : ''}
    <div class="form-row">
      <div class="form-group"><label>Họ tên *</label><input id="kn-ten"></div>
      <div class="form-group"><label>Điện thoại</label><input id="kn-phone"></div>
    </div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>Ngày vào ở *</label><input type="date" id="kn-vao" value="${nayISO()}"></div>
      <div class="form-group"><label>Giá thuê/tháng</label><input type="number" id="kn-gia" value="${giaPhong}" step="100000"></div>
      <div class="form-group"><label>Tiền cọc</label><input type="number" id="kn-coc" value="0" step="100000"></div>
    </div>
    <div class="form-group"><label>Ghi chú</label><textarea id="kn-gc" rows="2"></textarea></div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.ktxNguoiLuu(${phongId})">Xếp vào phòng</button>`);
}
/** Chọn hồ sơ thì điền sẵn tên/SĐT — chỉ điền vào ô ĐANG TRỐNG, đừng ghi đè công người dùng gõ. */
function ktxChonHoSo(sel) {
  const o = sel.selectedOptions[0];
  if (!o?.value) return;
  if (!$('kn-ten').value) $('kn-ten').value = o.dataset.ten || '';
  if (!$('kn-phone').value) $('kn-phone').value = o.dataset.phone || '';
}
async function ktxNguoiLuu(phongId) {
  try {
    await apiPost(`/admin/ktx/phong/${phongId}/nguoi`, {
      ho_ten: $('kn-ten').value, phone: $('kn-phone').value,
      ho_so_id: $('kn-hoso')?.value || null,
      ngay_vao: $('kn-vao').value, gia_thang: $('kn-gia').value,
      tien_coc: $('kn-coc').value, ghi_chu: $('kn-gc').value,
    });
    closeModal(); toast('Đã xếp người vào phòng.'); veLaiKtx();
  } catch (e) { toast(e.message || 'Không xếp được.', 'error'); }
}
function ktxNguoiSua(id, ten, phone, gia, coc) {
  openModal('Sửa thông tin người ở', `
    <div class="form-row">
      <div class="form-group"><label>Họ tên *</label><input id="ks-ten" value="${esc(ten)}"></div>
      <div class="form-group"><label>Điện thoại</label><input id="ks-phone" value="${esc(phone)}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Giá thuê/tháng</label><input type="number" id="ks-gia" value="${gia}" step="100000"></div>
      <div class="form-group"><label>Tiền cọc</label><input type="number" id="ks-coc" value="${coc}" step="100000"></div>
    </div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.ktxNguoiSuaLuu(${id})">Lưu</button>`);
}
async function ktxNguoiSuaLuu(id) {
  try {
    await apiPut(`/admin/ktx/nguoi/${id}`, {
      ho_ten: $('ks-ten').value, phone: $('ks-phone').value,
      gia_thang: $('ks-gia').value, tien_coc: $('ks-coc').value,
    });
    closeModal(); toast('Đã lưu.'); veLaiKtx();
  } catch (e) { toast(e.message || 'Không lưu được.', 'error'); }
}
function ktxTraPhong(id, ten) {
  confirmDialog('Cho trả phòng', `Xác nhận <b>${esc(ten)}</b> đã trả phòng? Lịch sử thu tiền vẫn được giữ.`, async () => {
    try { await apiPut(`/admin/ktx/nguoi/${id}`, { trang_thai: 'da-tra' }); toast('Đã ghi nhận trả phòng.'); veLaiKtx(); }
    catch (e) { toast(e.message || 'Không ghi được.', 'error'); }
  });
}
function ktxNguoiXoa(id, ten) {
  confirmDialog('Xoá bản ghi', `Xoá hẳn bản ghi của <b>${esc(ten)}</b>?`, async () => {
    try { await apiDel(`/admin/ktx/nguoi/${id}`); toast('Đã xoá.'); veLaiKtx(); }
    catch (e) { toast(e.message || 'Không xoá được.', 'error'); }
  });
}

function ktxThuForm(oId, ten, gia, ky = null) {
  openModal(`Thu tiền — ${esc(ten)}`, `
    <div class="form-row dh-f3">
      <div class="form-group"><label>Kỳ (tháng) *</label><input type="month" id="kth-ky" value="${ky || kyNay()}"></div>
      <div class="form-group"><label>Khoản</label><select id="kth-loai">
        <option value="tien-phong">Tiền phòng</option><option value="dien-nuoc">Điện nước</option>
        <option value="coc">Tiền cọc</option><option value="hoan-coc">Hoàn cọc</option><option value="khac">Khác</option></select></div>
      <div class="form-group"><label>Số tiền (đ) *</label><input type="number" id="kth-tien" value="${gia || ''}" step="100000"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Ngày thu *</label><input type="date" id="kth-ngay" value="${nayISO()}"></div>
      <div class="form-group"><label>Hình thức</label><select id="kth-ht">
        <option value="tien-mat">Tiền mặt</option><option value="chuyen-khoan">Chuyển khoản</option>
        <option value="the">Thẻ</option><option value="khac">Khác</option></select></div>
    </div>
    <div class="form-group"><label>Ghi chú</label><input id="kth-gc"></div>
    ${oChonAnh('kth-anh', 'Ảnh biên lai')}
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.ktxThuLuu(${oId})">Ghi khoản thu</button>`);
}
async function ktxThuLuu(oId) {
  try {
    await apiPost(`/admin/ktx/nguoi/${oId}/thu-tien`, {
      ky: $('kth-ky').value, loai: $('kth-loai').value, so_tien: $('kth-tien').value,
      ngay_thu: $('kth-ngay').value, hinh_thuc: $('kth-ht').value,
      ghi_chu: $('kth-gc').value, anh: $('kth-anh').value || null,
    });
    closeModal(); toast('Đã ghi khoản thu.'); veLaiKtx();
  } catch (e) { toast(e.message || 'Không ghi được.', 'error'); }
}
function ktxThuXoa(id) {
  confirmDialog('Xoá khoản thu', 'Xoá khoản thu này khỏi lịch sử?', async () => {
    try { await apiDel(`/admin/ktx/thu-tien/${id}`); toast('Đã xoá.'); veLaiKtx(); }
    catch (e) { toast(e.message || 'Không xoá được.', 'error'); }
  });
}
const ktxXemAnh = (id) => xemAnh(`/admin/ktx/thu-tien/${id}/anh`, 'Biên lai');

export { renderKtx };
export const ktxHandlers = {
  ktxXem, ktxLocToa, ktxXemPhong, ktxToaForm, ktxToaLuu, ktxToaXoa,
  ktxPhongForm, ktxPhongLuu, ktxNguoiForm, ktxChonHoSo, ktxNguoiLuu,
  ktxNguoiSua, ktxNguoiSuaLuu, ktxTraPhong, ktxNguoiXoa,
  ktxThuForm, ktxThuLuu, ktxThuXoa, ktxXemAnh,
};

// =============================================================
// 3. ĐỀ BÀI TẬP / BÀI KIỂM TRA
// =============================================================

const deState = { view: 'list', deId: null, chiTiet: null };

const DANG_NHAN = {
  'mot-dap-an': 'Một đáp án', 'nhieu-dap-an': 'Nhiều đáp án', 'dung-sai': 'Đúng / Sai',
  'dien-tu': 'Điền từ', 'tu-luan': 'Tự luận',
};

async function renderDeBai(el) {
  const luot = el.dataset.luot;
  if (deState.view === 'soan' && deState.deId) return deSoan(el);
  if (deState.view === 'ket-qua' && deState.deId) return deKetQua(el);
  el.innerHTML = spin;
  try {
    const d = await apiGet('/admin/de-bai');
    if (!conDungLuot(el, luot)) return;
    if (d.chua_migration) return canMigration(el);
    el.innerHTML = `
      <div class="table-toolbar">
        <div style="color:#667;font-size:13px">
          Tự soạn đề rồi giao cho lớp hoặc từng học sinh. Học sinh nhận thông báo, làm bài theo thời gian quy định và biết điểm ngay.
        </div>
        <button class="btn btn-primary" onclick="adminApp.deForm()"><i class="fa-solid fa-plus"></i> Tạo đề mới</button>
      </div>
      <p class="de-keo">Vuốt ngang bảng để thấy đủ các cột.</p>
      <div class="data-table-wrapper"><div class="dh-table-wrap"><table class="data-table bang-the bang-de">
        <thead><tr><th>Mã</th><th>Tiêu đề</th><th>Số câu</th><th>Thời gian</th>
          <th>Trạng thái</th><th>Giao / nộp</th><th class="de-nguoi">Người tạo</th><th></th></tr></thead>
        <tbody>${(d.de || []).map((x) => `<tr>
          <td data-nhan="Mã" class="de-ma">${esc(x.ma)}</td>
          <td data-nhan="Tiêu đề" class="de-tieude"><b>${esc(x.tieu_de)}</b>
            <span class="badge ${x.loai === 'kiem-tra' ? 'badge-warning' : 'badge-gray'}">
              ${x.loai === 'kiem-tra' ? 'Bài kiểm tra' : 'Bài tập'}</span></td>
          <td data-nhan="Số câu" class="de-gon">${x.so_cau} câu · ${Number(x.tong_diem)}đ</td>
          <td data-nhan="Thời gian" class="de-gon">${x.thoi_gian_phut ? `${x.thoi_gian_phut} phút` : 'Không giới hạn'}</td>
          <td data-nhan="Trạng thái" class="de-gon"><span class="badge ${x.trang_thai === 'phat-hanh' ? 'badge-success' : 'badge-gray'}">
            ${x.trang_thai === 'phat-hanh' ? 'Đã phát hành' : 'Nháp'}</span></td>
          <td data-nhan="Giao / nộp" class="de-gon">${x.so_lan_giao} giao · <b>${x.so_bai_nop}</b> nộp</td>
          <td data-nhan="Người tạo" class="de-nguoi">${esc(x.nguoi_tao || '—')}</td>
          <td class="table-actions">
            <button class="btn btn-sm btn-outline" onclick="adminApp.deMo(${x.id})"><i class="fa-solid fa-pen"></i> Soạn</button>
            ${x.so_bai_nop > 0 ? `<button class="btn btn-sm btn-primary" onclick="adminApp.deXemKetQua(${x.id})"><i class="fa-solid fa-chart-simple"></i> Kết quả</button>` : ''}
            <button class="btn btn-icon btn-outline" title="Xoá" onclick="adminApp.deXoa(${x.id}, '${esc(x.tieu_de)}')"><i class="fa-solid fa-trash"></i></button>
          </td></tr>`).join('') || `<tr><td colspan="8"><div class="empty-state">
            <i class="fa-solid fa-file-pen"></i><h3>Chưa có đề nào</h3>
            <p>Tạo đề đầu tiên, thêm câu hỏi rồi giao cho lớp.</p>
            <button class="btn btn-primary" onclick="adminApp.deForm()">Tạo đề mới</button></div></td></tr>`}
        </tbody></table></div></div>`;
  } catch (e) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-triangle-exclamation"></i><h3>Không tải được</h3><p>${esc(e.message || '')}</p></div>`;
  }
}

const veLaiDe = () => renderDeBai($('admin-content'));
function deMo(id) { deState.view = 'soan'; deState.deId = id; veLaiDe(); }
function deXemKetQua(id) { deState.view = 'ket-qua'; deState.deId = id; veLaiDe(); }
function deVeDanhSach() { deState.view = 'list'; deState.deId = null; veLaiDe(); }

function deForm(d = null) {
  openModal(d ? 'Sửa thông tin đề' : 'Tạo đề mới', `
    <div class="form-group"><label>Tiêu đề *</label>
      <input id="de-td" value="${esc(d?.tieu_de || '')}" placeholder="VD: Kiểm tra 15 phút bài 5"></div>
    <div class="form-group"><label>Mô tả / hướng dẫn cho học sinh</label>
      <textarea id="de-mt" rows="2">${esc(d?.mo_ta || '')}</textarea></div>
    <div class="form-row dh-f3">
      <div class="form-group"><label>Loại</label><select id="de-loai">
        <option value="bai-tap" ${d?.loai === 'bai-tap' ? 'selected' : ''}>Bài tập (luyện tập)</option>
        <option value="kiem-tra" ${d?.loai === 'kiem-tra' ? 'selected' : ''}>Bài kiểm tra (tính điểm)</option></select></div>
      <div class="form-group"><label>Thời gian (phút)</label>
        <input type="number" id="de-tg" min="1" max="600" value="${d?.thoi_gian_phut ?? ''}" placeholder="Để trống = không giới hạn"></div>
      <div class="form-group"><label>Số lần được làm</label>
        <input type="number" id="de-sl" min="0" max="99" value="${d?.so_lan_lam ?? 1}" title="0 = không giới hạn"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label>Cho xem đáp án</label><select id="de-hda">
        <option value="ngay" ${d?.hien_dap_an === 'ngay' ? 'selected' : ''}>Ngay sau khi nộp</option>
        <option value="sau-han" ${d?.hien_dap_an === 'sau-han' ? 'selected' : ''}>Sau khi hết hạn nộp</option>
        <option value="khong" ${d?.hien_dap_an === 'khong' ? 'selected' : ''}>Không cho xem</option></select></div>
      <div class="form-group"><label>Điểm đạt (%)</label>
        <input type="number" id="de-dd" min="0" max="100" value="${d?.diem_dat ?? 50}"></div>
    </div>
    <div class="form-row">
      <div class="form-group"><label class="ds-tick"><input type="checkbox" id="de-tc" ${d?.tron_cau ? 'checked' : ''}>
        <span class="ds-tick-ten">Xáo thứ tự câu hỏi</span></label></div>
      <div class="form-group"><label class="ds-tick"><input type="checkbox" id="de-tda" ${d?.tron_dap_an ? 'checked' : ''}>
        <span class="ds-tick-ten">Xáo thứ tự đáp án</span></label></div>
    </div>
    <div style="font-size:12px;color:#667">Xáo trộn giúp hạn chế nhìn bài nhau — mỗi em một thứ tự khác nhau.</div>
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.deLuu(${d?.id || 'null'})">${d ? 'Lưu' : 'Tạo đề'}</button>`);
}
async function deLuu(id) {
  const body = {
    tieu_de: $('de-td').value, mo_ta: $('de-mt').value, loai: $('de-loai').value,
    thoi_gian_phut: $('de-tg').value, so_lan_lam: $('de-sl').value,
    hien_dap_an: $('de-hda').value, diem_dat: $('de-dd').value,
    tron_cau: $('de-tc').checked, tron_dap_an: $('de-tda').checked,
  };
  try {
    if (id) { await apiPut(`/admin/de-bai/${id}`, body); closeModal(); toast('Đã lưu.'); veLaiDe(); }
    else {
      const r = await apiPost('/admin/de-bai', body);
      closeModal(); toast(`Đã tạo đề ${r.ma}.`);
      deMo(r.id);   // vào thẳng màn soạn — tạo xong mà phải tự đi tìm đề vừa tạo thì rất phiền
    }
  } catch (e) { toast(e.message || 'Không lưu được.', 'error'); }
}
function deXoa(id, ten) {
  confirmDialog('Xoá đề', `Xoá đề <b>${esc(ten)}</b> cùng toàn bộ câu hỏi?`, async () => {
    try { await apiDel(`/admin/de-bai/${id}`); toast('Đã xoá đề.'); veLaiDe(); }
    catch (e) { toast(e.message || 'Không xoá được.', 'error'); }
  });
}

// --- MÀN SOẠN ĐỀ ---

async function deSoan(el) {
  el.innerHTML = spin;
  try {
    const d = await apiGet(`/admin/de-bai/${deState.deId}`);
    deState.chiTiet = d;
    const de = d.de;
    const tongDiem = d.cau_hoi.reduce((s, c) => s + Number(c.diem), 0);

    el.innerHTML = `
      <button class="btn btn-outline" onclick="adminApp.deVeDanhSach()" style="margin-bottom:16px">
        <i class="fa-solid fa-arrow-left"></i> Về danh sách đề</button>

      <div class="table-toolbar">
        <div>
          <h2 style="margin:0">${esc(de.tieu_de)}
            <span class="badge ${de.trang_thai === 'phat-hanh' ? 'badge-success' : 'badge-gray'}">
              ${de.trang_thai === 'phat-hanh' ? 'Đã phát hành' : 'Nháp'}</span></h2>
          <div style="color:#667;font-size:13px;margin-top:4px">
            ${esc(de.ma)} · ${d.cau_hoi.length} câu · ${tongDiem} điểm ·
            ${de.thoi_gian_phut ? `${de.thoi_gian_phut} phút` : 'không giới hạn thời gian'} ·
            làm ${de.so_lan_lam === 0 ? 'không giới hạn' : `${de.so_lan_lam} lần`}
          </div>
        </div>
        <div style="display:flex;gap:8px;flex-wrap:wrap">
          <button class="btn btn-outline" onclick='adminApp.deForm(${JSON.stringify(de).replace(/'/g, "&#39;")})'>
            <i class="fa-solid fa-gear"></i> Cài đặt đề</button>
          ${de.trang_thai === 'phat-hanh'
            ? `<button class="btn btn-outline" onclick="adminApp.dePhatHanh(${de.id}, 'nhap')">Thu về nháp</button>
               <button class="btn btn-primary" onclick="adminApp.deGiaoForm(${de.id})"><i class="fa-solid fa-paper-plane"></i> Giao bài</button>`
            : `<button class="btn btn-primary" onclick="adminApp.dePhatHanh(${de.id}, 'phat-hanh')"><i class="fa-solid fa-check"></i> Phát hành</button>`}
        </div>
      </div>

      ${de.trang_thai === 'nhap' ? `<div style="padding:12px 16px;background:#FBEEDF;border-radius:8px;margin-bottom:16px;font-size:13px">
        <i class="fa-solid fa-circle-info"></i> Đề đang là <b>Nháp</b> — học sinh chưa nhìn thấy. Thêm đủ câu hỏi rồi bấm <b>Phát hành</b> để giao được.
      </div>` : ''}

      ${d.giao.length ? `
        <h3 style="margin:0 0 10px">Đã giao (${d.giao.length})</h3>
        <div class="data-table-wrapper" style="margin-bottom:20px"><table class="data-table bang-the">
          <thead><tr><th>Giao cho</th><th>Mở lúc</th><th>Hạn nộp</th><th>Đã nộp</th><th>Ghi chú</th><th></th></tr></thead>
          <tbody>${d.giao.map((g) => `<tr>
            <td data-nhan="Giao cho">${g.lop_ten ? `<i class="fa-solid fa-users"></i> Lớp ${esc(g.lop_ten)}` : `<i class="fa-solid fa-user"></i> ${esc(g.hoc_vien_ten || '—')}`}</td>
            <td data-nhan="Mở lúc">${g.mo_luc ? ngayVi(String(g.mo_luc).slice(0, 10)) : 'Ngay'}</td>
            <td data-nhan="Hạn nộp">${g.dong_luc ? ngayVi(String(g.dong_luc).slice(0, 10)) : 'Không hạn'}</td>
            <td data-nhan="Đã nộp">${g.da_nop}</td>
            <td data-nhan="Ghi chú">${esc(g.ghi_chu || '—')}</td>
            <td class="table-actions"><button class="btn btn-icon btn-outline" title="Thu hồi"
              onclick="adminApp.deThuHoi(${g.id})"><i class="fa-solid fa-trash"></i></button></td>
          </tr>`).join('')}</tbody></table></div>` : ''}

      <div class="table-toolbar">
        <h3 style="margin:0">Câu hỏi (${d.cau_hoi.length})</h3>
        <button class="btn btn-primary" onclick="adminApp.deCauForm(${de.id})"><i class="fa-solid fa-plus"></i> Thêm câu hỏi</button>
      </div>

      ${d.cau_hoi.map((c, i) => `
        <div style="padding:14px 16px;border:1px solid var(--admin-border);border-radius:10px;margin-bottom:10px;background:var(--admin-card,#fff)">
          <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">
            <div style="flex:1;min-width:0">
              <div style="display:flex;gap:8px;align-items:center;margin-bottom:6px;flex-wrap:wrap">
                <b>Câu ${i + 1}</b>
                <span class="badge badge-gray">${DANG_NHAN[c.loai]}</span>
                <span class="badge badge-warning">${Number(c.diem)} điểm</span>
                ${c.co_anh ? '<span class="badge badge-gray"><i class="fa-solid fa-image"></i> có ảnh</span>' : ''}
              </div>
              <div style="white-space:pre-line;margin-bottom:8px">${esc(c.noi_dung)}</div>
              ${c.lua_chon ? `<div style="display:flex;flex-direction:column;gap:3px">
                ${c.lua_chon.map((lc, j) => {
                  const dung = (c.dap_an || []).includes(j);
                  return `<div style="font-size:13px;color:${dung ? '#16A34A' : '#667'};font-weight:${dung ? 700 : 400}">
                    ${dung ? '✓' : '○'} ${String.fromCharCode(65 + j)}. ${esc(lc)}</div>`;
                }).join('')}</div>` : ''}
              ${c.loai === 'dien-tu' ? `<div style="font-size:13px;color:#16A34A;font-weight:600">
                ✓ Đáp án: ${(c.dap_an || []).map(esc).join('  /  ')}</div>` : ''}
              ${c.loai === 'tu-luan' ? '<div style="font-size:13px;color:#667"><i class="fa-solid fa-pen"></i> Giáo viên chấm tay</div>' : ''}
              ${c.giai_thich ? `<div style="font-size:13px;color:#667;margin-top:6px;padding-left:10px;border-left:3px solid var(--admin-border)">
                <b>Giải thích:</b> ${esc(c.giai_thich)}</div>` : ''}
            </div>
            <div class="table-actions" style="flex:none">
              ${c.co_anh ? `<button class="btn btn-icon btn-outline" title="Xem ảnh" onclick="adminApp.deXemAnh(${de.id}, ${c.id})"><i class="fa-solid fa-image"></i></button>` : ''}
              <button class="btn btn-icon btn-outline" title="Sửa" onclick="adminApp.deCauForm(${de.id}, ${c.id})"><i class="fa-solid fa-pen"></i></button>
              <button class="btn btn-icon btn-outline" title="Xoá" onclick="adminApp.deCauXoa(${c.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        </div>`).join('') || `<div class="empty-state"><i class="fa-solid fa-circle-question"></i>
          <h3>Chưa có câu hỏi</h3><p>Thêm câu hỏi đầu tiên cho đề này.</p>
          <button class="btn btn-primary" onclick="adminApp.deCauForm(${de.id})">Thêm câu hỏi</button></div>`}
    `;
  } catch (e) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-triangle-exclamation"></i><h3>Không mở được đề</h3><p>${esc(e.message || '')}</p></div>`;
  }
}

async function dePhatHanh(id, tt) {
  try {
    await apiPut(`/admin/de-bai/${id}`, {});   // chạm để chắc đề còn thuộc quyền mình
    const r = await apiPost(`/admin/de-bai/${id}/phat-hanh`, { trang_thai: tt });
    toast(r.trang_thai === 'phat-hanh' ? 'Đã phát hành đề.' : 'Đã thu đề về nháp.');
    veLaiDe();
  } catch (e) { toast(e.message || 'Không đổi được trạng thái.', 'error'); }
}

/** Form câu hỏi — đổi dạng thì đổi luôn phần nhập đáp án, nên vẽ lại phần thân. */
function deCauForm(deId, cauId = null) {
  const c = cauId ? (deState.chiTiet?.cau_hoi || []).find((x) => x.id === cauId) : null;
  openModal(cauId ? 'Sửa câu hỏi' : 'Thêm câu hỏi', `
    <div class="form-row">
      <div class="form-group"><label>Dạng câu hỏi</label>
        <select id="ch-loai" onchange="adminApp.deCauDoiDang()">
          ${Object.entries(DANG_NHAN).map(([k, v]) => `<option value="${k}" ${c?.loai === k ? 'selected' : ''}>${v}</option>`).join('')}
        </select></div>
      <div class="form-group"><label>Điểm</label><input type="number" id="ch-diem" min="0.5" step="0.5" value="${c ? Number(c.diem) : 1}"></div>
    </div>
    <div class="form-group"><label>Nội dung câu hỏi *</label>
      <textarea id="ch-nd" rows="3" placeholder="Nhập đề bài…">${esc(c?.noi_dung || '')}</textarea></div>
    <div id="ch-dapan"></div>
    <div class="form-group"><label>Giải thích (hiện khi học sinh xem lại bài)</label>
      <textarea id="ch-gt" rows="2">${esc(c?.giai_thich || '')}</textarea></div>
    ${oChonAnh('ch-anh', 'Ảnh minh hoạ (không bắt buộc)')}
  `, `<button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
      <button class="btn btn-primary" onclick="adminApp.deCauLuu(${deId}, ${cauId || 'null'})">Lưu câu hỏi</button>`);
  deCauDoiDang(c);
}

/** Vẽ phần nhập đáp án theo dạng đang chọn. */
function deCauDoiDang(c = null) {
  const loai = $('ch-loai').value;
  const box = $('ch-dapan');
  const cu = c && c.loai === loai ? c : null;   // đổi dạng thì bỏ đáp án cũ, không ép kiểu nhầm
  if (loai === 'tu-luan') {
    box.innerHTML = `<div style="padding:12px;background:var(--admin-bg);border-radius:8px;font-size:13px;color:#667">
      <i class="fa-solid fa-circle-info"></i> Câu tự luận không chấm tự động được — giáo viên cho điểm tay sau khi học sinh nộp.</div>`;
    return;
  }
  if (loai === 'dien-tu') {
    const ds = (cu?.dap_an || ['']).join('\n');
    box.innerHTML = `<div class="form-group"><label>Đáp án đúng * <span style="font-weight:400;color:#667">(mỗi dòng một phương án được chấp nhận)</span></label>
      <textarea id="ch-dien" rows="3" placeholder="wǒ&#10;wo">${esc(ds)}</textarea>
      <div style="font-size:12px;color:#667;margin-top:4px">So sánh bỏ qua hoa/thường, khoảng trắng thừa và dấu câu.</div></div>`;
    return;
  }
  if (loai === 'dung-sai') {
    const dung = (cu?.dap_an || [0])[0];
    box.innerHTML = `<div class="form-group"><label>Đáp án đúng *</label>
      <select id="ch-ds"><option value="0" ${dung === 0 ? 'selected' : ''}>Đúng</option>
      <option value="1" ${dung === 1 ? 'selected' : ''}>Sai</option></select></div>`;
    return;
  }
  const lc = cu?.lua_chon || ['', '', '', ''];
  const da = cu?.dap_an || [];
  const nhieu = loai === 'nhieu-dap-an';
  box.innerHTML = `<div class="form-group"><label>Các lựa chọn * <span style="font-weight:400;color:#667">
      (${nhieu ? 'tick tất cả đáp án đúng' : 'chọn một đáp án đúng'}; để trống dòng nào thì dòng đó bị bỏ qua)</span></label>
    <div id="ch-lc-box">${lc.map((v, i) => hangLuaChon(i, v, da.includes(i), nhieu)).join('')}</div>
    <button type="button" class="btn btn-sm btn-outline" style="margin-top:6px" onclick="adminApp.deThemLuaChon()">
      <i class="fa-solid fa-plus"></i> Thêm lựa chọn</button></div>`;
}
function hangLuaChon(i, v, checked, nhieu) {
  return `<div class="ch-hang" data-lc>
    <input type="${nhieu ? 'checkbox' : 'radio'}" name="ch-dung" value="${i}" ${checked ? 'checked' : ''}
           title="Đánh dấu đây là đáp án đúng">
    <span class="ch-ky">${String.fromCharCode(65 + i)}</span>
    <input class="ch-lc" value="${esc(v)}" placeholder="Nội dung lựa chọn ${String.fromCharCode(65 + i)}…">
    <button type="button" class="ch-xoa" title="Xoá lựa chọn này"
            onclick="adminApp.deXoaLuaChon(this)"><i class="fa-solid fa-xmark"></i></button>
  </div>`;
}

/** Xoá một hàng lựa chọn rồi đánh lại chữ cái A/B/C cho các hàng còn lại. */
function deXoaLuaChon(nut) {
  const box = $('ch-lc-box');
  if (box.querySelectorAll('[data-lc]').length <= 2) {
    return toast('Câu trắc nghiệm phải có ít nhất 2 lựa chọn.', 'error');
  }
  nut.closest('[data-lc]').remove();
  // Đánh số lại: bỏ hàng B mà C vẫn ghi "C" thì nhìn như mất một lựa chọn.
  [...box.querySelectorAll('[data-lc]')].forEach((h, i) => {
    h.querySelector('.ch-ky').textContent = String.fromCharCode(65 + i);
    h.querySelector('input[name=ch-dung]').value = i;
    const o = h.querySelector('.ch-lc');
    o.placeholder = `Nội dung lựa chọn ${String.fromCharCode(65 + i)}…`;
  });
}
function deThemLuaChon() {
  const box = $('ch-lc-box');
  const n = box.querySelectorAll('[data-lc]').length;
  if (n >= 10) return toast('Tối đa 10 lựa chọn.', 'error');
  box.insertAdjacentHTML('beforeend', hangLuaChon(n, '', false, $('ch-loai').value === 'nhieu-dap-an'));
}

async function deCauLuu(deId, cauId) {
  const loai = $('ch-loai').value;
  const body = {
    loai, noi_dung: $('ch-nd').value, diem: $('ch-diem').value,
    giai_thich: $('ch-gt').value,
  };
  if ($('ch-anh').value) body.anh = $('ch-anh').value;

  if (loai === 'dien-tu') {
    body.dap_an = $('ch-dien').value.split('\n').map((s) => s.trim()).filter(Boolean);
  } else if (loai === 'dung-sai') {
    body.dap_an = [Number($('ch-ds').value)];
  } else if (loai !== 'tu-luan') {
    const o = [...document.querySelectorAll('#ch-lc-box [data-lc]')];
    // Bỏ lựa chọn trống TRƯỚC khi tính chỉ số đáp án — bỏ sau thì chỉ số lệch và đáp án trỏ
    // nhầm ô (cùng bẫy "lọc trước khi map" đã ghi ở 4.28).
    const giu = o.map((h, i) => ({ v: h.querySelector('.ch-lc').value.trim(), dung: h.querySelector('input[name=ch-dung]').checked, i }))
      .filter((x) => x.v !== '');
    body.lua_chon = giu.map((x) => x.v);
    body.dap_an = giu.map((x, k) => (x.dung ? k : -1)).filter((k) => k >= 0);
  }
  try {
    if (cauId) await apiPut(`/admin/de-cau-hoi/${cauId}`, body);
    else await apiPost(`/admin/de-bai/${deId}/cau-hoi`, body);
    closeModal(); toast('Đã lưu câu hỏi.'); veLaiDe();
  } catch (e) { toast(e.message || 'Không lưu được câu hỏi.', 'error'); }
}
function deCauXoa(id) {
  confirmDialog('Xoá câu hỏi', 'Xoá câu hỏi này khỏi đề?', async () => {
    try { await apiDel(`/admin/de-cau-hoi/${id}`); toast('Đã xoá.'); veLaiDe(); }
    catch (e) { toast(e.message || 'Không xoá được.', 'error'); }
  });
}
const deXemAnh = (deId, cauId) => xemAnh(`/admin/de-bai/${deId}/cau-hoi/${cauId}/anh`, 'Ảnh câu hỏi');

// --- GIAO ĐỀ ---

async function deGiaoForm(deId) {
  openModal('Giao bài', spin);
  try {
    const [lop, hv] = await Promise.all([
      apiGet('/admin/classes').catch(() => ({ classes: [] })),
      apiGet('/admin/de-bai/hoc-vien-chon').catch(() => ({ hoc_vien: [] })),
    ]);
    const dsLop = lop.classes || lop || [];
    const than = document.querySelector('.admin-modal-overlay .modal-body');
    if (!than) return;
    than.innerHTML = `
      <div class="form-group"><label>Giao cho cả lớp</label>
        <select id="dg-lop"><option value="">— không giao theo lớp —</option>
          ${dsLop.map((c) => `<option value="${c.id}">${esc(c.name)}</option>`).join('')}</select>
        <div style="font-size:12px;color:#667;margin-top:4px">Chỉ hiện lớp bạn được phép giao.</div></div>
      <div class="form-group"><label>Hoặc chọn từng học sinh</label>
        <div class="ds-tick-hop">
          ${(hv.hoc_vien || []).map((u) => `<label class="ds-tick">
            <input type="checkbox" class="dg-hv" value="${u.id}">
            <span class="ds-tick-ten">${esc(u.name)}</span>
            <span class="ds-tick-phu">${esc(u.lop || u.email || '')}</span></label>`).join('')
            || '<div style="color:#667">Chưa có học sinh nào.</div>'}
        </div></div>
      <div class="form-row">
        <div class="form-group"><label>Mở lúc</label><input type="datetime-local" id="dg-mo">
          <div style="font-size:12px;color:#667">Để trống = mở ngay</div></div>
        <div class="form-group"><label>Hạn nộp</label><input type="datetime-local" id="dg-dong">
          <div style="font-size:12px;color:#667">Để trống = không có hạn</div></div>
      </div>
      <div class="form-group"><label>Ghi chú cho học sinh</label><input id="dg-gc" placeholder="VD: Làm trước thứ 6"></div>`;
    document.querySelector('.admin-modal-overlay .modal-footer')?.remove();
    document.querySelector('.admin-modal-overlay .admin-modal')?.insertAdjacentHTML('beforeend',
      `<div class="modal-footer">
        <button class="btn btn-outline" onclick="adminApp.closeModal()">Huỷ</button>
        <button class="btn btn-primary" onclick="adminApp.deGiaoLuu(${deId})">
          <i class="fa-solid fa-paper-plane"></i> Giao bài</button></div>`);
  } catch (e) { toast(e.message || 'Không mở được form giao bài.', 'error'); }
}
async function deGiaoLuu(deId) {
  const body = {
    class_id: $('dg-lop').value || null,
    user_ids: [...document.querySelectorAll('.dg-hv:checked')].map((x) => Number(x.value)),
    mo_luc: $('dg-mo').value || null, dong_luc: $('dg-dong').value || null,
    ghi_chu: $('dg-gc').value,
  };
  if (!body.class_id && !body.user_ids.length) return toast('Chọn lớp hoặc ít nhất một học sinh.', 'error');
  try {
    await apiPost(`/admin/de-bai/${deId}/giao`, body);
    closeModal(); toast('Đã giao bài. Học sinh sẽ thấy thông báo ở chuông.'); veLaiDe();
  } catch (e) { toast(e.message || 'Không giao được bài.', 'error'); }
}
function deThuHoi(id) {
  confirmDialog('Thu hồi', 'Thu hồi lượt giao này? Bài học sinh đã nộp vẫn được giữ.', async () => {
    try { await apiDel(`/admin/de-giao/${id}`); toast('Đã thu hồi.'); veLaiDe(); }
    catch (e) { toast(e.message || 'Không thu hồi được.', 'error'); }
  });
}

// --- KẾT QUẢ ---

async function deKetQua(el) {
  el.innerHTML = spin;
  try {
    const d = await apiGet(`/admin/de-bai/${deState.deId}/ket-qua`);
    const diemTb = d.ket_qua.length
      ? (d.ket_qua.reduce((s, x) => s + (Number(x.tong_diem) ? (Number(x.diem) / Number(x.tong_diem)) * 100 : 0), 0) / d.ket_qua.length)
      : 0;
    el.innerHTML = `
      <button class="btn btn-outline" onclick="adminApp.deVeDanhSach()" style="margin-bottom:16px">
        <i class="fa-solid fa-arrow-left"></i> Về danh sách đề</button>
      <div class="table-toolbar">
        <h2 style="margin:0">Kết quả: ${esc(d.de.tieu_de)}</h2>
        <button class="btn btn-outline" onclick="adminApp.deMo(${d.de.id})"><i class="fa-solid fa-pen"></i> Sửa đề</button>
      </div>
      <div class="stats-grid" style="margin-bottom:20px">
        <div class="stat-card"><div class="stat-icon" style="background:#DCFCE7;color:#16A34A"><i class="fa-solid fa-check"></i></div>
          <div><div class="stat-value">${d.ket_qua.length}</div><div class="stat-label">Đã làm</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#FBEEDF;color:#B85C1A"><i class="fa-solid fa-hourglass"></i></div>
          <div><div class="stat-value">${d.chua_lam.length}</div><div class="stat-label">Chưa làm</div></div></div>
        <div class="stat-card"><div class="stat-icon" style="background:#E4F1EA;color:#265648"><i class="fa-solid fa-percent"></i></div>
          <div><div class="stat-value">${Math.round(diemTb)}%</div><div class="stat-label">Điểm trung bình</div></div></div>
      </div>

      <h3 style="margin:0 0 10px">Bài đã nộp</h3>
      <div class="data-table-wrapper"><div class="dh-table-wrap"><table class="data-table bang-the">
        <thead><tr><th>Học sinh</th><th>Lần</th><th style="text-align:right">Điểm</th><th>Số câu đúng</th>
          <th>Nộp lúc</th><th>Trạng thái</th><th></th></tr></thead>
        <tbody>${d.ket_qua.map((b) => {
          const pt = Number(b.tong_diem) ? Math.round((Number(b.diem) / Number(b.tong_diem)) * 100) : 0;
          return `<tr>
            <td data-nhan="Học sinh"><b>${esc(b.hoc_vien)}</b></td>
            <td data-nhan="Lần">${b.lan_thu}</td>
            <td data-nhan="Điểm" style="text-align:right"><b>${Number(b.diem)}</b>/${Number(b.tong_diem)}
              <span class="badge ${pt >= Number(d.de.diem_dat) ? 'badge-success' : 'badge-danger'}">${pt}%</span></td>
            <td data-nhan="Số câu đúng">${b.so_cau_dung}/${b.tong_cau}</td>
            <td data-nhan="Nộp lúc">${b.nop_luc ? new Date(b.nop_luc).toLocaleString('vi-VN') : '—'}
              ${b.het_gio ? '<span class="badge badge-warning">nộp muộn</span>' : ''}</td>
            <td data-nhan="Trạng thái">${b.trang_thai === 'da-cham'
              ? '<span class="badge badge-success">Đã chấm</span>'
              : '<span class="badge badge-warning">Chờ chấm tự luận</span>'}</td>
            <td class="table-actions"><button class="btn btn-sm btn-primary" onclick="adminApp.deXemBai(${b.id})">
              <i class="fa-solid fa-eye"></i> Xem &amp; chấm</button></td>
          </tr>`;
        }).join('') || '<tr><td colspan="7"><div class="empty-state"><p>Chưa có ai nộp bài.</p></div></td></tr>'}
        </tbody></table></div></div>

      ${d.chua_lam.length ? `<h3 style="margin:22px 0 10px">Chưa làm (${d.chua_lam.length})</h3>
        <div style="display:flex;gap:8px;flex-wrap:wrap">${d.chua_lam.map((u) =>
          `<span class="badge badge-gray" style="padding:6px 10px">${esc(u.name)}</span>`).join('')}</div>` : ''}

      ${d.thong_ke_cau.some((c) => c.sai > 0) ? `
        <h3 style="margin:22px 0 10px">Câu sai nhiều nhất</h3>
        <p style="color:#667;font-size:13px;margin-bottom:10px">Biết cả lớp đang yếu chỗ nào để dạy lại đúng phần đó.</p>
        <div class="data-table-wrapper"><table class="data-table bang-the">
          <thead><tr><th>Câu hỏi</th><th>Dạng</th><th style="text-align:center">Đúng</th>
            <th style="text-align:center">Sai</th><th style="width:160px">Tỉ lệ sai</th></tr></thead>
          <tbody>${d.thong_ke_cau.filter((c) => c.dung + c.sai > 0).map((c) => {
            const tong = c.dung + c.sai;
            const pct = Math.round((c.sai / tong) * 100);
            return `<tr>
              <td data-nhan="Câu hỏi" style="max-width:320px">${esc(String(c.noi_dung).slice(0, 90))}</td>
              <td data-nhan="Dạng">${DANG_NHAN[c.loai] || c.loai}</td>
              <td data-nhan="Đúng" style="text-align:center;color:#16A34A">${c.dung}</td>
              <td data-nhan="Sai" style="text-align:center;color:#DC2626;font-weight:700">${c.sai}</td>
              <td data-nhan="Tỉ lệ sai"><div style="background:#F3F4F6;border-radius:4px;height:16px;overflow:hidden">
                <div style="width:${pct}%;height:100%;background:${pct > 50 ? '#DC2626' : '#F59E0B'}"></div></div>
                <span style="font-size:12px;color:#667">${pct}%</span></td>
            </tr>`;
          }).join('')}</tbody></table></div>` : ''}
    `;
  } catch (e) {
    el.innerHTML = `<div class="empty-state"><i class="fa-solid fa-triangle-exclamation"></i><h3>Không tải được kết quả</h3><p>${esc(e.message || '')}</p></div>`;
  }
}

async function deXemBai(baiLamId) {
  openModal('Bài làm', spin);
  try {
    const d = await apiGet(`/admin/de-bai-lam/${baiLamId}`);
    const b = d.bai_lam;
    const tl = b.tra_loi || {};
    const than = document.querySelector('.admin-modal-overlay .modal-body');
    if (!than) return;
    than.innerHTML = `
      <div style="display:flex;gap:18px;flex-wrap:wrap;margin-bottom:16px;padding:12px;background:var(--admin-bg);border-radius:8px">
        <div><div style="font-size:12px;color:#667">HỌC SINH</div><b>${esc(b.hoc_vien)}</b></div>
        <div><div style="font-size:12px;color:#667">ĐIỂM</div><b>${Number(b.diem)}/${Number(b.tong_diem)}</b></div>
        <div><div style="font-size:12px;color:#667">SỐ CÂU ĐÚNG</div><b>${b.so_cau_dung}/${b.tong_cau}</b></div>
        <div><div style="font-size:12px;color:#667">NỘP LÚC</div><b>${b.nop_luc ? new Date(b.nop_luc).toLocaleString('vi-VN') : '—'}</b>
          ${b.het_gio ? ' <span class="badge badge-warning">muộn</span>' : ''}</div>
      </div>
      ${d.cau_hoi.map((c, i) => {
        const kq = tl[c.id] || {};
        const tuLuan = c.loai === 'tu-luan';
        const mau = tuLuan ? '#667' : kq.dung ? '#16A34A' : '#DC2626';
        return `<div style="padding:12px;border-left:3px solid ${mau};background:var(--admin-bg);border-radius:6px;margin-bottom:10px">
          <div style="display:flex;justify-content:space-between;gap:10px">
            <b>Câu ${i + 1}</b>
            <span>${tuLuan ? `<span class="badge badge-gray">Tự luận · ${Number(c.diem)}đ</span>`
              : kq.dung ? '<span class="badge badge-success">Đúng</span>' : '<span class="badge badge-danger">Sai</span>'}</span>
          </div>
          <div style="margin:6px 0;white-space:pre-line">${esc(c.noi_dung)}</div>
          ${c.lua_chon ? `<div style="font-size:13px">${c.lua_chon.map((lc, j) => {
            const chon = Array.isArray(kq.tra_loi) ? kq.tra_loi.includes(j) : kq.tra_loi === j;
            const dung = (c.dap_an || []).includes(j);
            return `<div style="color:${dung ? '#16A34A' : chon ? '#DC2626' : '#667'};font-weight:${dung || chon ? 600 : 400}">
              ${dung ? '✓' : chon ? '✗' : '○'} ${String.fromCharCode(65 + j)}. ${esc(lc)}
              ${chon ? ' <i style="font-size:11px">(đã chọn)</i>' : ''}</div>`;
          }).join('')}</div>` : ''}
          ${c.loai === 'dien-tu' ? `<div style="font-size:13px">
            <div>Học sinh viết: <b>${esc(kq.tra_loi ?? '(bỏ trống)')}</b></div>
            <div style="color:#16A34A">Đáp án: ${(c.dap_an || []).map(esc).join(' / ')}</div></div>` : ''}
          ${tuLuan ? `
            <div style="background:#fff;border:1px solid var(--admin-border);border-radius:6px;padding:10px;margin:8px 0;white-space:pre-line">
              ${esc(kq.tra_loi || '(học sinh không viết gì)')}</div>
            <div style="display:flex;gap:8px;align-items:center">
              <label style="font-size:13px">Chấm điểm:</label>
              <input type="number" class="de-cham" data-cau="${c.id}" min="0" max="${Number(c.diem)}" step="0.5"
                     value="${kq.diem ?? 0}" style="width:90px"> / ${Number(c.diem)}
            </div>` : ''}
        </div>`;
      }).join('')}
      <div class="form-group"><label>Nhận xét cho học sinh</label>
        <textarea id="de-nx" rows="3">${esc(b.nhan_xet || '')}</textarea></div>`;
    document.querySelector('.admin-modal-overlay .modal-footer')?.remove();
    document.querySelector('.admin-modal-overlay .admin-modal')?.insertAdjacentHTML('beforeend',
      `<div class="modal-footer">
        <button class="btn btn-outline" onclick="adminApp.closeModal()">Đóng</button>
        <button class="btn btn-primary" onclick="adminApp.deChamLuu(${baiLamId})">Lưu điểm &amp; nhận xét</button></div>`);
  } catch (e) { toast(e.message || 'Không mở được bài làm.', 'error'); }
}
async function deChamLuu(baiLamId) {
  const diem = {};
  for (const o of document.querySelectorAll('.de-cham')) diem[o.dataset.cau] = Number(o.value) || 0;
  try {
    const r = await apiPost(`/admin/de-bai-lam/${baiLamId}/cham`, { diem_tu_luan: diem, nhan_xet: $('de-nx').value });
    closeModal();
    toast(`Đã chấm — tổng ${r.diem} điểm. Học sinh sẽ thấy ở chuông thông báo.`);
    veLaiDe();
  } catch (e) { toast(e.message || 'Không lưu được.', 'error'); }
}

export { renderDeBai };
export const deHandlers = {
  deMo, deXemKetQua, deVeDanhSach, deForm, deLuu, deXoa, dePhatHanh,
  deCauForm, deCauDoiDang, deThemLuaChon, deXoaLuaChon, deCauLuu, deCauXoa, deXemAnh,
  deGiaoForm, deGiaoLuu, deThuHoi, deXemBai, deChamLuu,
};
