// ============================================================
// TRANG: BÀI KIỂM TRA & BÀI TẬP CÔ GIAO (đề tự soạn) — 2026-09-17
// ============================================================
// Module NẠP ĐỘNG (4.40): `main.js` đang 470 KB / ngưỡng cảnh báo 500 KB, nhét cả màn làm bài
// vào đó là vượt — mà cảnh báo ấy là chuông duy nhất canh việc kéo nhầm dữ liệu nặng vào bundle.
//
// BA ĐIỀU BẮT BUỘC (khớp với server, xem routes/de-bai-hocvien.js):
//   1. Đáp án KHÔNG có trong dữ liệu trả về lúc đang làm — server không gửi. Màn này chỉ thu
//      câu trả lời rồi gửi lên; CHẤM LÀ VIỆC CỦA SERVER.
//   2. Đồng hồ đếm theo MỐC SERVER (`het_han_luc` + `gio_server`), không theo giờ máy người dùng.
//   3. Xáo câu / xáo đáp án chỉ để HIỂN THỊ; gửi lên luôn là chỉ số GỐC. Bảng quy chiếu
//      `tronLc` phải theo tới lúc nộp — quên là chấm sai sạch mà không lỗi nào hiện ra (4.19).
import { app } from '../core/app.js';
import { state, ktState } from '../core/state.js';
import { tdEsc, toast, twPlayEnter, khungXuongTrang } from '../core/ui.js';
import api from '../api/client.js';

const navigate = (...a) => app.navigate(...a);
const updateUrl = (...a) => app.updateUrl(...a);
const openAuth = (...a) => app.openAuth(...a);

const $ = (id) => document.getElementById(id);
const CHU = 'ABCDEFGHIJ';

/** Trộn mảng trên BẢN SAO (Fisher-Yates) — dùng chung lối `utils/tron-de.js` (4.19). */
function tron(a) {
  const x = [...a];
  for (let i = x.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [x[i], x[j]] = [x[j], x[i]]; }
  return x;
}
function phutGiay(ms) {
  const s = Math.max(0, Math.round(ms / 1000));
  return `${String(Math.floor(s / 60)).padStart(2, '0')}:${String(s % 60).padStart(2, '0')}`;
}
function ngayGio(d) {
  if (!d) return '—';
  const x = new Date(d);
  const hai = (n) => String(n).padStart(2, '0');
  return `${hai(x.getDate())}/${hai(x.getMonth() + 1)} · ${hai(x.getHours())}:${hai(x.getMinutes())}`;
}
/** Hạn nộp đọc theo lối người dùng: "còn 3 ngày" dễ hiểu hơn một mốc ngày trần. */
function conLai(d) {
  if (!d) return null;
  const ms = new Date(d).getTime() - Date.now();
  if (ms < 0) return { chu: 'đã hết hạn', gap: true };
  const gio = ms / 3600000;
  if (gio < 1) return { chu: `còn ${Math.max(1, Math.round(ms / 60000))} phút`, gap: true };
  if (gio < 24) return { chu: `còn ${Math.round(gio)} giờ`, gap: true };
  const ngay = Math.round(gio / 24);
  return { chu: `còn ${ngay} ngày`, gap: ngay <= 2 };
}

// ============================================================ RENDER
export async function renderKiemTra(el) {
  if (!state.user) {
    el.innerHTML = `<div class="tv-hero"><h1>Bài kiểm tra</h1>
      <p>Đăng nhập để xem bài cô giao và làm bài.</p>
      <button class="btn btn-primary" onclick="window.app.openAuth('login')">Đăng nhập</button></div>`;
    return;
  }
  if (ktState.view === 'lam' && ktState.bai) return veManLam(el);
  if (ktState.view === 'ket-qua' && ktState.baiLamId) return veKetQua(el);
  return veDanhSach(el);
}

// ------------------------------------------------------------ DANH SÁCH
async function veDanhSach(el) {
  el.innerHTML = khungXuongTrang();
  let d;
  try {
    d = await api.get('/de-bai/cua-toi');
  } catch (e) {
    el.innerHTML = `<div class="kt-loi"><i class="fa-solid fa-triangle-exclamation"></i>
      <span>Không tải được danh sách bài. ${tdEsc(e.message || '')}</span>
      <button class="btn btn-outline" onclick="window.app.ktTai()">Thử lại</button></div>`;
    return;
  }
  ktState.ds = d.de || [];
  const ds = ktState.ds;
  const canLam = ds.filter((x) => !x.chua_mo && !x.het_han && x.con_lam_duoc);
  const xong = ds.filter((x) => !canLam.includes(x));

  el.innerHTML = `
    <div class="kt-dau-trang">
      <div>
        <h1><i class="fa-solid fa-file-pen"></i> Bài kiểm tra &amp; bài tập</h1>
        <p>Bài do giáo viên giao. Bấm “Bắt đầu làm” để vào bài.</p>
      </div>
      ${canLam.length ? `<div class="kt-dem-canlam"><b>${canLam.length}</b><span>bài cần làm</span></div>` : ''}
    </div>
    ${!ds.length ? `<div class="kt-trong"><i class="fa-solid fa-inbox"></i>
        <h3>Chưa có bài nào được giao</h3>
        <p>Khi giáo viên giao bài, bài sẽ hiện ở đây và bạn nhận được thông báo ở chuông.</p></div>` : ''}
    ${canLam.length ? `<h2 class="kt-nhom">Cần làm (${canLam.length})</h2>
      <div class="kt-luoi">${canLam.map(theDe).join('')}</div>` : ''}
    ${xong.length ? `<h2 class="kt-nhom">Đã làm / đã đóng (${xong.length})</h2>
      <div class="kt-luoi">${xong.map(theDe).join('')}</div>` : ''}
  `;
  twPlayEnter(el, 'tw-entering');
}

function theDe(x) {
  const daLam = Number(x.da_lam) > 0;
  const khoa = x.chua_mo || x.het_han || !x.con_lam_duoc;
  const chip = x.chua_mo ? '<span class="kt-chip kt-chip--cho">Chưa tới giờ mở</span>'
    : x.het_han ? '<span class="kt-chip kt-chip--het">Đã hết hạn</span>'
    : !x.con_lam_duoc ? '<span class="kt-chip kt-chip--xong">Đã làm đủ số lần</span>' : '';
  return `
    <div class="kt-the ${khoa ? 'is-khoa' : ''}">
      <div class="kt-the-dau">
        <span class="kt-loai kt-loai--${x.loai}">${x.loai === 'kiem-tra' ? 'Bài kiểm tra' : 'Bài tập'}</span>
        ${chip}
      </div>
      <h3>${tdEsc(x.tieu_de)}</h3>
      ${x.mo_ta ? `<p class="kt-mota">${tdEsc(x.mo_ta)}</p>` : ''}
      <div class="kt-meta">
        <span><i class="fa-solid fa-list-ol"></i> ${x.so_cau} câu · ${Number(x.tong_diem)} điểm</span>
        <span><i class="fa-solid fa-clock"></i> ${x.thoi_gian_phut ? `${x.thoi_gian_phut} phút` : 'Không giới hạn'}</span>
        ${x.lop_ten ? `<span><i class="fa-solid fa-users"></i> ${tdEsc(x.lop_ten)}</span>` : ''}
        ${x.dong_luc ? (() => { const c = conLai(x.dong_luc);
          return `<span class="${c.gap ? 'kt-han-gap' : ''}"><i class="fa-solid fa-hourglass-half"></i> Hạn ${ngayGio(x.dong_luc)} · ${c.chu}</span>`;
        })() : ''}
      </div>
      ${x.ghi_chu ? `<div class="kt-ghichu"><i class="fa-solid fa-comment"></i><span>${tdEsc(x.ghi_chu)}</span></div>` : ''}
      ${daLam ? `<div class="kt-diem-cu">Điểm cao nhất: <b>${Number(x.diem_cao_nhat ?? 0)}</b>/${Number(x.tong_diem)}
        <span class="kt-lan">(đã làm ${x.da_lam} lần${x.so_lan_lam ? ` / ${x.so_lan_lam}` : ''})</span></div>` : ''}
      <div class="kt-the-nut">
        ${!khoa ? `<button class="btn btn-primary" onclick="window.app.ktBatDau(${x.giao_id})">
          <i class="fa-solid fa-play"></i> ${x.dang_lam_id ? 'Làm tiếp' : daLam ? 'Làm lại' : 'Bắt đầu làm'}</button>` : ''}
        ${daLam ? `<button class="btn btn-outline" onclick="window.app.ktXemLai(${x.de_id})">
          <i class="fa-solid fa-eye"></i> Xem bài đã làm</button>` : ''}
      </div>
    </div>`;
}

// ------------------------------------------------------------ BẮT ĐẦU LÀM
export async function ktBatDau(giaoId) {
  try {
    const d = await api.post(`/de-bai/giao/${giaoId}/bat-dau`, {});
    ktState.giaoId = giaoId;
    ktState.baiLamId = d.bai_lam_id;
    ktState.bai = d;
    ktState.traLoi = {};
    ktState.kq = null;
    ktState.hetHan = d.het_han_luc ? new Date(d.het_han_luc).getTime() : null;
    // Đồng hồ máy người dùng có thể lệch hàng phút. Đo độ lệch một lần rồi bù — không thì học
    // sinh thấy "còn 3 phút" trong khi server đã tính là hết giờ.
    ktState.lechGio = d.gio_server ? Date.now() - new Date(d.gio_server).getTime() : 0;

    // Xáo thứ tự CHỈ ĐỂ HIỂN THỊ. Chỉ số gốc vẫn là thứ gửi lên server.
    const cau = d.cau_hoi || [];
    ktState.thuTu = d.de.tron_cau ? tron(cau.map((_, i) => i)) : cau.map((_, i) => i);
    ktState.tronLc = {};
    if (d.de.tron_dap_an) {
      for (const c of cau) {
        if (Array.isArray(c.lua_chon) && c.lua_chon.length) {
          ktState.tronLc[c.id] = tron(c.lua_chon.map((_, i) => i));
        }
      }
    }
    ktState.view = 'lam';
    updateUrl({ push: true });
    navigate('path-kiemtra');
  } catch (e) {
    toast(e.message || 'Không bắt đầu được bài làm.', 'error');
  }
}

function veManLam(el) {
  const { bai } = ktState;
  const cau = bai.cau_hoi || [];
  el.innerHTML = `
    <div class="kt-thanh">
      <div class="kt-thanh-trai">
        <div class="kt-thanh-td">${tdEsc(bai.de.tieu_de)}</div>
        <div class="kt-thanh-phu">
          <span id="kt-tiendo-tren">0/${cau.length} câu</span>
          ${bai.lan_thu > 1 ? ` · lần ${bai.lan_thu}` : ''}
        </div>
      </div>
      <div class="kt-thanh-phai">
        <div id="kt-dongho" class="kt-dongho ${ktState.hetHan ? '' : 'is-an'}"></div>
        <button class="btn btn-primary" onclick="window.app.ktNop(false)">
          <i class="fa-solid fa-paper-plane"></i> Nộp bài</button>
      </div>
    </div>

    <!-- Lưới số câu: nhìn một lần biết còn câu nào chưa làm, bấm là nhảy tới.
         Không có nó thì bài dài phải cuộn dò từng câu. -->
    <div class="kt-dieuhuong" id="kt-dieuhuong">
      ${ktState.thuTu.map((goc, i) => `
        <button type="button" class="kt-o-cau" data-cau="${cau[goc]?.id}" data-stt="${i}"
                onclick="window.app.ktToiCau(${cau[goc]?.id})" title="Câu ${i + 1}">${i + 1}</button>`).join('')}
    </div>

    ${bai.de.thoi_gian_phut ? `<div class="kt-nhac"><i class="fa-solid fa-circle-info"></i>
      <span>Thời gian tính từ lúc bạn bấm bắt đầu và do máy chủ giữ — thoát ra vào lại không được thêm giờ.
      Hết giờ hệ thống tự nộp bài.</span></div>` : ''}

    <div class="kt-ds-cau">
      ${ktState.thuTu.map((goc, i) => veCau(cau[goc], i)).join('')}
    </div>
    <div class="kt-nop-cuoi">
      <div id="kt-tiendo" class="kt-tiendo"></div>
      <button class="btn btn-primary btn-lg" onclick="window.app.ktNop(false)">
        <i class="fa-solid fa-paper-plane"></i> Nộp bài</button>
    </div>`;
  capNhatTienDo();
  batDongHo();
  napAnhCau();
  ghimDieuHuong();
  twPlayEnter(el, 'tw-entering');
}

/**
 * Lưới số câu dính NGAY DƯỚI thanh trên.
 * ⚠️ `top` cố định là SAI ở đâu đó: thanh trên cao 68px khi tên đề nằm một dòng, nhưng 118px trên
 * điện thoại (tên đề xuống dòng, đồng hồ và nút Nộp bài tụt xuống hàng riêng) — lúc đó nó ĐÈ LÊN
 * hàng số câu đầu tiên. Đo chiều cao thật rồi gán, cùng lối với `ddMoveTabInk` (4.29).
 */
let daGanGhim = false;
function ghimDieuHuong() {
  const thanh = document.querySelector('.kt-thanh');
  const nav = $('kt-dieuhuong');
  if (!thanh || !nav) return;
  nav.style.top = `${Math.round(thanh.getBoundingClientRect().height) + 8}px`;
  if (daGanGhim) return;
  daGanGhim = true;
  window.addEventListener('resize', ghimDieuHuong);
  // Web font tải xong làm tên đề đổi số dòng -> thanh trên cao lên, phải đo lại.
  document.fonts?.ready.then(ghimDieuHuong);
}

/** Bấm ô số câu -> cuộn tới câu đó. `behavior:'smooth'` cho người dùng thấy mình đang đi đâu. */
export function ktToiCau(cauId) {
  const e = $(`kt-cau-${cauId}`);
  if (!e) return;
  e.scrollIntoView({ behavior: 'smooth', block: 'center' });
  e.classList.add('is-nhay');
  setTimeout(() => e.classList.remove('is-nhay'), 900);
}

function veCau(c, stt) {
  if (!c) return '';
  const daTl = ktState.traLoi[c.id];
  let than = '';

  if (c.loai === 'tu-luan') {
    than = `<textarea class="kt-tl-text" rows="5" placeholder="Viết câu trả lời của bạn…"
      oninput="window.app.ktGhiText(${c.id}, this.value)">${tdEsc(daTl || '')}</textarea>`;
  } else if (c.loai === 'dien-tu') {
    than = `<input class="kt-tl-dien" placeholder="Nhập câu trả lời…" value="${tdEsc(daTl || '')}"
      oninput="window.app.ktGhiText(${c.id}, this.value)">`;
  } else {
    const lc = c.lua_chon || [];
    const thuTu = ktState.tronLc[c.id] || lc.map((_, i) => i);
    const nhieu = c.loai === 'nhieu-dap-an';
    const chon = Array.isArray(daTl) ? daTl : daTl === undefined || daTl === null ? [] : [daTl];
    than = `<div class="kt-lc">${thuTu.map((goc, j) => `
      <button type="button" class="kt-lc-nut ${chon.includes(goc) ? 'is-chon' : ''}"
              onclick="window.app.ktChon(${c.id}, ${goc}, ${nhieu})">
        <span class="kt-lc-ky">${nhieu ? (chon.includes(goc) ? '☑' : '☐') : CHU[j]}</span>
        <span>${tdEsc(lc[goc])}</span>
      </button>`).join('')}</div>
      ${nhieu ? '<div class="kt-goi-y">Chọn tất cả đáp án đúng — phải đúng hết mới được điểm.</div>' : ''}`;
  }

  return `
    <div class="kt-cau" id="kt-cau-${c.id}">
      <div class="kt-cau-dau">
        <span class="kt-stt">Câu ${stt + 1}</span>
        <span class="kt-diem">${Number(c.diem)} điểm</span>
      </div>
      <div class="kt-noidung">${tdEsc(c.noi_dung)}</div>
      ${c.co_anh ? `<img class="kt-anh" src="" alt="Ảnh câu hỏi" data-cau="${c.id}"
        onerror="this.style.display='none'" ref="lazy">` : ''}
      ${than}
    </div>`;
}

/** Ảnh câu hỏi phải lấy qua API có token nên không đặt thẳng vào `src` được. */
async function napAnhCau() {
  for (const img of document.querySelectorAll('.kt-anh[data-cau]')) {
    if (img.dataset.xong) continue;
    img.dataset.xong = '1';
    try {
      const d = await api.get(`/de-bai/cau-hoi/${img.dataset.cau}/anh`);
      img.src = d.anh;
    } catch { img.style.display = 'none'; }
  }
}

export function ktChon(cauId, goc, nhieu) {
  if (nhieu) {
    const cu = Array.isArray(ktState.traLoi[cauId]) ? ktState.traLoi[cauId] : [];
    ktState.traLoi[cauId] = cu.includes(goc) ? cu.filter((x) => x !== goc) : [...cu, goc].sort((a, b) => a - b);
  } else {
    ktState.traLoi[cauId] = [goc];
  }
  // Vẽ lại ĐÚNG một câu, không vẽ cả trang: bài 100 câu mà vẽ lại hết thì mất vị trí cuộn
  // (cùng lý do `_ddTrItemHtml` phải ở cấp module, 4.22b).
  const cau = (ktState.bai.cau_hoi || []).find((c) => c.id === cauId);
  const stt = ktState.thuTu.findIndex((g) => ktState.bai.cau_hoi[g]?.id === cauId);
  const el = $(`kt-cau-${cauId}`);
  if (el && cau) el.outerHTML = veCau(cau, stt);
  capNhatTienDo();
}

/** Ô gõ chữ CHỈ ghi state, KHÔNG vẽ lại — vẽ lại giữa lúc gõ là mất con trỏ và mất bộ gõ tiếng
 *  Trung đang mở dở (đúng bài học `hskExamViet` ở 4.34d). */
export function ktGhiText(cauId, gt) {
  ktState.traLoi[cauId] = gt;
  capNhatTienDo();
}

function capNhatTienDo() {
  const cau = ktState.bai?.cau_hoi || [];
  const xong = (id) => {
    const v = ktState.traLoi[id];
    return Array.isArray(v) ? v.length > 0 : String(v ?? '').trim() !== '';
  };
  const soXong = cau.filter((c) => xong(c.id)).length;

  const duoi = $('kt-tiendo');
  if (duoi) duoi.innerHTML = `Đã trả lời <b>${soXong}/${cau.length}</b> câu`;
  const tren = $('kt-tiendo-tren');
  if (tren) tren.innerHTML = `<b>${soXong}</b>/${cau.length} câu`;

  // Tô ô số câu đã trả lời — đây mới là thứ trả lời câu hỏi "còn thiếu câu nào".
  for (const o of document.querySelectorAll('.kt-o-cau')) {
    o.classList.toggle('is-xong', xong(Number(o.dataset.cau)));
  }
}

// ------------------------------------------------------------ ĐỒNG HỒ
function batDongHo() {
  dungDongHo();
  if (!ktState.hetHan) return;
  const nhip = () => {
    const conLai = ktState.hetHan - (Date.now() - ktState.lechGio);
    const e = $('kt-dongho');
    if (!e) return dungDongHo();
    e.textContent = phutGiay(conLai);
    e.classList.toggle('is-gap', conLai < 60_000);
    if (conLai <= 0) {
      dungDongHo();
      toast('Hết giờ — hệ thống đang nộp bài của bạn.', 'error');
      ktNop(true);
    }
  };
  nhip();
  ktState.dongHo = setInterval(nhip, 1000);
}
export function dungDongHo() {
  if (ktState.dongHo) { clearInterval(ktState.dongHo); ktState.dongHo = null; }
}

// ------------------------------------------------------------ NỘP BÀI
export async function ktNop(tuDong = false) {
  if (ktState.dangNop) return;
  const tong = (ktState.bai?.cau_hoi || []).length;
  const xong = Object.values(ktState.traLoi).filter((v) =>
    Array.isArray(v) ? v.length > 0 : String(v ?? '').trim() !== '').length;
  if (!tuDong && xong < tong
      && !window.confirm(`Bạn còn ${tong - xong} câu chưa trả lời. Vẫn nộp bài?`)) return;

  ktState.dangNop = true;
  dungDongHo();
  try {
    const kq = await api.post(`/de-bai/bai-lam/${ktState.baiLamId}/nop`, { bai_lam: ktState.traLoi });
    ktState.kq = kq;
    ktState.view = 'ket-qua';
    updateUrl({ push: true });
    navigate('path-kiemtra');
  } catch (e) {
    toast(e.message || 'Không nộp được bài. Thử lại.', 'error');
    batDongHo();   // nộp hỏng thì trả lại đồng hồ, đừng để học sinh mất giờ oan
  } finally {
    ktState.dangNop = false;
  }
}

// ------------------------------------------------------------ KẾT QUẢ / XEM LẠI
export async function ktXemLai(deId, baiLamId = null) {
  if (baiLamId) {
    ktState.baiLamId = baiLamId;
    ktState.view = 'ket-qua';
    updateUrl({ push: true });
    return navigate('path-kiemtra');
  }
  try {
    const d = await api.get(`/de-bai/de/${deId}/bai-lam-cua-toi`);
    if (!d.bai_lam_id) return toast('Bạn chưa có bài làm nào cho đề này.', 'error');
    ktState.baiLamId = d.bai_lam_id;
    ktState.view = 'ket-qua';
    updateUrl({ push: true });
    navigate('path-kiemtra');
  } catch (e) { toast(e.message || 'Không mở được bài làm.', 'error'); }
}

async function veKetQua(el) {
  el.innerHTML = khungXuongTrang();
  let d;
  try {
    d = await api.get(`/de-bai/bai-lam/${ktState.baiLamId}`);
  } catch (e) {
    el.innerHTML = `<div class="kt-loi"><i class="fa-solid fa-triangle-exclamation"></i>
      <span>${tdEsc(e.message || 'Không xem được bài làm.')}</span>
      <button class="btn btn-outline" onclick="window.app.ktVeDs()">Về danh sách</button></div>`;
    return;
  }
  const b = d.bai_lam;
  const pt = Number(b.tong_diem) ? Math.round((Number(b.diem) / Number(b.tong_diem)) * 100) : 0;
  const choCham = b.trang_thai === 'da-nop';

  const oTomTat = d.cau_hoi.map((c, i) => {
    const kq = c.ket_qua || {};
    const tt = c.loai === 'tu-luan' ? 'is-cho' : kq.dung ? 'is-dung' : 'is-sai';
    return `<button type="button" class="kt-o-cau ${tt}" onclick="window.app.ktToiCau(${c.id})"
              title="Câu ${i + 1}">${i + 1}</button>`;
  }).join('');

  el.innerHTML = `
    <button class="btn btn-outline kt-quaylai" onclick="window.app.ktVeDs()">
      <i class="fa-solid fa-arrow-left"></i> Về danh sách bài</button>
    <div class="kt-kq ${b.dat ? 'is-dat' : ''}">
      <div class="kt-kq-vong">
        <div class="kt-kq-diem">${Number(b.diem)}<span>/${Number(b.tong_diem)}</span></div>
        <div class="kt-kq-pt">${pt}%</div>
      </div>
      <div class="kt-kq-chu">
        <h2>${tdEsc(b.tieu_de)}</h2>
        <p>${b.dat ? '<b>Đạt</b> — chúc mừng bạn!' : `Chưa đạt (cần ${Number(b.diem_dat)}%)`}
           ${b.het_gio ? ' · <span class="kt-chip kt-chip--het">nộp sau giờ</span>' : ''}</p>
        <div class="kt-kq-so">
          <span><i class="fa-solid fa-check"></i> Đúng ${b.so_cau_dung}/${b.tong_cau} câu</span>
          <span><i class="fa-solid fa-clock"></i> Nộp ${ngayGio(b.nop_luc)}</span>
          ${b.lan_thu > 1 ? `<span><i class="fa-solid fa-rotate"></i> Lần ${b.lan_thu}</span>` : ''}
        </div>
      </div>
    </div>

    ${choCham ? `<div class="kt-nhac"><i class="fa-solid fa-hourglass-half"></i>
      <span>Bài có câu tự luận — giáo viên sẽ chấm và cho điểm cuối. Điểm trên là phần máy chấm được.</span></div>` : ''}

    ${b.nhan_xet ? `<div class="kt-nhanxet"><div class="kt-nhanxet-dau">
      <i class="fa-solid fa-comment-dots"></i> Nhận xét của giáo viên</div>
      <div>${tdEsc(b.nhan_xet)}</div></div>` : ''}

    ${!d.cho_xem_dap_an ? `<div class="kt-nhac"><i class="fa-solid fa-lock"></i>
      <span>Giáo viên chưa mở đáp án cho bài này.</span></div>` : ''}

    <div class="kt-dieuhuong kt-dieuhuong--kq">${oTomTat}</div>
    <div class="kt-ds-cau">${d.cau_hoi.map((c, i) => veCauKq(c, i, d.cho_xem_dap_an)).join('')}</div>

    <div class="kt-nop-cuoi">
      <button class="btn btn-outline" onclick="window.app.ktVeDs()"><i class="fa-solid fa-arrow-left"></i> Về danh sách bài</button>
    </div>`;
  napAnhCau();
  twPlayEnter(el, 'tw-entering');
  // Đánh dấu đã đọc nhận xét -> tắt chấm đỏ trên chuông.
  if (b.nhan_xet) api.post(`/de-bai/bai-lam/${b.id}/doc`, {}).catch(() => {});
}

function veCauKq(c, stt, xemDa) {
  const kq = c.ket_qua || {};
  const tuLuan = c.loai === 'tu-luan';
  const trang = tuLuan ? 'is-cho' : kq.dung ? 'is-dung' : 'is-sai';
  let than = '';

  if (tuLuan || c.loai === 'dien-tu') {
    than = `<div class="kt-kq-traloi"><b>Bạn trả lời:</b> ${tdEsc(kq.tra_loi || '(bỏ trống)')}</div>
      ${xemDa && c.dap_an ? `<div class="kt-kq-dapan"><b>Đáp án:</b> ${(c.dap_an || []).map(tdEsc).join('  /  ')}</div>` : ''}`;
  } else {
    const lc = c.lua_chon || [];
    const chon = Array.isArray(kq.tra_loi) ? kq.tra_loi : kq.tra_loi == null ? [] : [kq.tra_loi];
    than = `<div class="kt-lc">${lc.map((v, j) => {
      const daChon = chon.includes(j);
      const dung = xemDa && (c.dap_an || []).includes(j);
      return `<div class="kt-lc-nut ${dung ? 'is-dapan' : ''} ${daChon && !dung ? 'is-sai' : ''}">
        <span class="kt-lc-ky ${dung ? 'ky-dung' : daChon ? 'ky-sai' : ''}">${CHU[j]}</span>
        <span>${tdEsc(v)}</span>
        ${dung ? '<i class="kt-nhan kt-nhan-dung">đáp án đúng</i>' : ''}
        ${daChon ? `<i class="kt-nhan ${dung ? 'kt-nhan-dung' : 'kt-bandachon'}">bạn chọn</i>` : ''}
      </div>`;
    }).join('')}</div>`;
  }

  return `<div class="kt-cau ${trang}" id="kt-cau-${c.id}">
    <div class="kt-cau-dau">
      <span class="kt-stt">Câu ${stt + 1}</span>
      <span class="kt-diem">${tuLuan ? `${Number(kq.diem ?? 0)}/${Number(c.diem)} điểm`
        : kq.dung ? `+${Number(c.diem)} điểm` : `0/${Number(c.diem)} điểm`}</span>
    </div>
    <div class="kt-noidung">${tdEsc(c.noi_dung)}</div>
    ${c.co_anh ? `<img class="kt-anh" src="" data-cau="${c.id}" onerror="this.style.display='none'">` : ''}
    ${than}
    ${xemDa && c.giai_thich ? `<div class="kt-giaithich"><i class="fa-solid fa-lightbulb"></i>
      <span>${tdEsc(c.giai_thich)}</span></div>` : ''}
  </div>`;
}

export function ktVeDs() {
  dungDongHo();
  ktState.view = 'list';
  ktState.bai = null; ktState.baiLamId = null; ktState.giaoId = null;
  ktState.traLoi = {}; ktState.kq = null;
  updateUrl({ push: true });
  navigate('path-kiemtra');
}
export const ktTai = () => navigate('path-kiemtra');

export const render = { 'path-kiemtra': renderKiemTra };

export const handlers = {
  ktBatDau, ktChon, ktGhiText, ktNop, ktXemLai, ktVeDs, ktTai, ktToiCau, ktDungDongHo: dungDongHo,
};
