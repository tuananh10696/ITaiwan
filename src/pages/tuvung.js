// ============================================================
// TRANG: TỪ VỰNG & HÁN TỰ — Kho từ vựng · Từ điển · Sổ tay · Bộ thủ (4.37)
// ============================================================
// Module NẠP ĐỘNG: chỉ tải khi người dùng thực sự mở một trong bốn trang này (4.40).
// `main.js` không import file này ở đầu mà `await import()` trong `navigate()`.
//
// Quy ước phụ thuộc (xem `core/app.js`):
//   · hàm THUẦN  -> import thẳng từ `core/*` (có kiểm tra tĩnh);
//   · thứ nằm trong `main.js` (router, giáo trình, TTS) -> đọc qua cầu nối `app`, và bọc lại
//     thành tên cục bộ ngay bên dưới để phần thân module không phải sửa một dòng nào.

import { app } from '../core/app.js';
import { state, kvState, tdxState, stState, btState } from '../core/state.js';
import {
  tdEsc, tdNhay, toast, twPlayEnter, openDialog, closeDialog,
} from '../core/ui.js';
import {
  soTay, soTayCo, soTayDoi, soTayGhi, SO_TAY_KEY,
} from '../core/sotay.js';
import api from '../api/client.js';
import {
  K, C, TD_BO, TD_TU_LOAI, napKho, napChuDon, napChu, napBoThu, napManh, napManhKho, napChuCua,
  daNap, layNgay, tdKhongDau, coChuHan, tdAudio, tdGiaiNhan, tdNhomTuLoai,
  tdTimTrong, tdTraTu, tdTuBatDau, tdManhSangHang,
} from '../data/tudien-kho.js';
import { generateQuiz } from '../data/duongdaiExercise.js';
import { tronMang } from '../utils/tron-de.js';

// --- cầu nối tới phần còn nằm trong main.js ---
// Bọc thành hàm để phần thân module giữ nguyên cách gọi cũ; đọc `app.x` tại thời điểm GỌI nên
// không phụ thuộc thứ tự nạp.
const navigate = (...a) => app.navigate(...a);
const updateUrl = (...a) => app.updateUrl(...a);
const getDisplayText = (...a) => app.getDisplayText(...a);
const ddSpeakWord = (...a) => app.ddSpeakWord(...a);
const napTruocAudioTu = (...a) => app.napTruocAudioTu(...a);
const datDsDoc = (...a) => app.datDsDoc(...a);
const nutDocHtml = (...a) => app.nutDocHtml(...a);

/** Khu tra cứu luôn là tiếng Đài Loan — ép 'zh-TW' như `tdNgheArg` (4.35). */
const tdDsDoc = (ds) => ds.map((t) => ({
  text: getDisplayText(t.han, t.gian), src: t.audio, srcTts: t.tts, lang: 'zh-TW',
}));
const ddMoveTabInk = (...a) => app.ddMoveTabInk(...a);
const toggleCharMode = (...a) => app.toggleCharMode(...a);
const napHanziWriter = (...a) => app.napHanziWriter(...a);

// ============================================================
// KHU "TỪ VỰNG & HÁN TỰ" — 4 trang dùng chung một kho tra cứu (2026-09-08)
// ============================================================
// Kho từ vựng · Từ điển Trung-Việt · Sổ tay từ vựng · Bộ thủ Hán tự.
//
// Trước 2026-09-08 cả bốn trang chạy trên 40 từ của `src/data/mockData.js`: từ điển tra trong
// đúng 40 từ đó, sổ tay chỉ lưu được 40 từ đó (khoá ngoại vào bảng `vocabulary`), bộ thủ có
// 16/214 bộ và không bấm vào được. Nay cả bốn đọc dữ liệu do `npm run tudien:build` sinh ra
// qua `src/data/tudien-kho.js` — xem CLAUDE.md 4.37 để biết cách đóng gói và vì sao chia file
// như vậy.
//
// ⚠️ QUY TẮC NẠP (đừng gộp cho tiện): trang Kho từ vựng cần `kho.json` (578 KB gzip), trang
//    Bộ thủ cần `bothu.json` (7 KB) rồi mới tới `chu.json` khi mở một bộ, còn trang Từ điển
//    khi tra bằng CHỮ HÁN thì đi thẳng vào mảnh 61 KB mà KHÔNG nạp chỉ mục nào. Nạp sẵn hết
//    là bắt người chỉ muốn tra một chữ tải gần 1 MB.

const KV_MOI_TRANG = 50;      // số từ mỗi trang của Kho từ vựng
const KV_SO_CAU = 20;         // số câu mỗi lượt trắc nghiệm

/** Kho từ vựng gộp 4 bộ. */
// `kvState` nằm ở `core/state.js` — `PAGE_PARAMS` của main.js đọc/ghi nó TRƯỚC khi
// module này được nạp, nên nó không thể nằm trong đây (xem 4.40).

/** Từ điển Trung-Việt. `tu` = chữ Hán đang mở (không phải id số như bản cũ). */
// `tdxState` nằm ở `core/state.js` — `PAGE_PARAMS` của main.js đọc/ghi nó TRƯỚC khi
// module này được nạp, nên nó không thể nằm trong đây (xem 4.40).

/** Sổ tay. */
// `stState` nằm ở `core/state.js` — `PAGE_PARAMS` của main.js đọc/ghi nó TRƯỚC khi
// module này được nạp, nên nó không thể nằm trong đây (xem 4.40).

/** Bộ thủ. `chon` = số bộ (1..214) đang mở, null = đang ở lưới. */
// `btState` nằm ở `core/state.js` — `PAGE_PARAMS` của main.js đọc/ghi nó TRƯỚC khi
// module này được nạp, nên nó không thể nằm trong đây (xem 4.40).

// ------------------------------------------------------------------ tiện ích chung

/** Một hàng mảng của kho.json -> object dễ đọc. Mọi renderer dưới đây chỉ làm việc với dạng này. */
function tdTu(w) {
  if (!w) return null;
  return {
    han: w[K.HAN], gian: w[K.GIAN] || '', py: w[K.PY] || '', hv: w[K.HV] || '',
    nghia: w[K.NGHIA] || '', loai: w[K.LOAI] || '', nhan: w[K.NHAN] || [],
    audio: tdAudio(w[K.AUDIO]), tts: tdAudio(w[K.TTS]),
    mayDich: w[K.NGUON] === 1, en: w[K.NGHIA_EN] || '',
  };
}

/** Bản chụp để lưu vào sổ tay. */
const tdChup = (t) => ({
  tu: t.han, gian: t.gian, pinyin: t.py, han_viet: t.hv, nghia: t.nghia,
});

/** Tham số cho ddSpeakWord — LUÔN ép 'zh-TW' vì đây là khu tra cứu tiếng Đài Loan, không
 *  thuộc module giáo trình nên `ddState.tb` có thể còn đang là HSK (giọng đại lục), xem 4.35. */
function tdNgheArg(t) {
  const hien = getDisplayText(t.han, t.gian);
  return `'${tdNhay(hien)}', ${t.audio ? `'${tdNhay(t.audio)}'` : 'null'}, ${t.tts ? `'${tdNhay(t.tts)}'` : 'null'}, 'zh-TW'`;
}

/** Chip nhãn nguồn ("TOCFL 3", "HSK 2", "ĐĐ Q2·B5"). Nhãn không nhận ra thì BỎ, đừng hiện chuỗi thô. */
function tdNhanHtml(nhan) {
  if (!Array.isArray(nhan) || !nhan.length) return '';
  const nhom = new Map();
  for (const tag of nhan) {
    const g = tdGiaiNhan(tag);
    if (!g) continue;
    if (!nhom.has(g.bo)) nhom.set(g.bo, new Set());
    nhom.get(g.bo).add(g.cap);
  }
  const ten = { tocfl: 'TOCFL', hsk: 'HSK', duongdai: 'ĐĐ', thoidai: 'TĐ' };
  return [...nhom.entries()].map(([bo, caps]) => {
    const c = [...caps].sort();
    return `<span class="kv-nhan kv-nhan--${bo}">${ten[bo]} ${c.join('·')}</span>`;
  }).join('');
}

/** Nút lưu/bỏ sổ tay. `ns` cho biết trang nào bấm để vẽ lại đúng chỗ. */
function tdNutLuuHtml(t, ns) {
  const co = soTayCo(t.han);
  return `<button class="dd-btn-speak kv-btn-luu${co ? ' is-luu' : ''}"
    onclick="event.stopPropagation(); window.app.tdLuuTu('${tdNhay(t.han)}', '${ns}')"
    title="${co ? 'Bỏ khỏi sổ tay' : 'Lưu vào sổ tay'}" aria-label="${co ? 'Bỏ khỏi sổ tay' : 'Lưu vào sổ tay'}">
    <i class="fa-${co ? 'solid' : 'regular'} fa-bookmark"></i></button>`;
}

/**
 * Thẻ từ dùng chung cho Kho từ vựng · Sổ tay · kết quả tìm của Từ điển.
 * Dùng lại nguyên class `.dd-vocab-*` của giáo trình để giao diện không lệch nhau (cùng lối
 * với trang TOCFL ở 4.35) — ở đây chỉ thêm phần âm Hán Việt và nhãn nguồn.
 */
function tdTheTuHtml(t, so, ns) {
  const hien = getDisplayText(t.han, t.gian);
  return `
    <div class="dd-vocab-card kv-card">
      <div class="dd-vocab-main" onclick="window.app.tdMoTu('${tdNhay(t.han)}')">
        ${so ? `<span class="dd-vocab-num">${so}</span>` : ''}
        <div class="dd-vocab-info">
          <div class="dd-vocab-hanzi-row">
            <span class="dd-vocab-hanzi font-tc">${tdEsc(hien)}</span>
            <span class="dd-vocab-pinyin">${tdEsc(t.py)}</span>
            ${t.hv ? `<span class="kv-hv" title="Âm Hán Việt">${tdEsc(t.hv)}</span>` : ''}
            ${t.loai ? `<span class="dd-vocab-pos">${tdEsc(t.loai)}</span>` : ''}
            ${t.audio ? '<span class="tv-real" title="Giọng đọc thu thật"><i class="fa-solid fa-headphones"></i></span>' : ''}
          </div>
          <div class="dd-vocab-def">${t.nghia ? tdEsc(t.nghia)
            : t.en ? `<span class="kv-def-en">${tdEsc(t.en)}</span>`
              : '<span class="kv-chua-co">chưa có nghĩa tiếng Việt</span>'}</div>
          ${t.nhan.length ? `<div class="kv-nhan-row">${tdNhanHtml(t.nhan)}</div>` : ''}
        </div>
        <div class="dd-vocab-actions">
          <button class="dd-btn-speak" onclick="event.stopPropagation(); window.app.ddSpeakWord(${tdNgheArg(t)})"
                  title="${t.audio ? 'Nghe giọng đọc thu thật' : 'Nghe phát âm'}">
            <i class="fa-solid fa-volume-high"></i></button>
          ${tdNutLuuHtml(t, ns)}
        </div>
      </div>
    </div>`;
}

/**
 * Bấm nút lưu ở bất kỳ trang nào. Chỉ vẽ lại ĐÚNG trang đang mở — vẽ lại cả app bằng
 * `navigate()` như bản cũ thì mất vị trí cuộn và nháy một nhịp mỗi lần lưu một từ.
 */
async function tdLuuTu(han, ns) {
  let t = null;
  const kho = layNgay('kho.json');
  if (kho) { const r = kho.find((x) => x[K.HAN] === han); if (r) t = tdTu(r); }
  if (!t && soTay.has(han)) {
    const s = soTay.get(han);
    t = { han: s.tu, gian: s.gian || '', py: s.pinyin || '', hv: s.han_viet || '', nghia: s.nghia || '' };
  }
  if (!t && tdxState.chiTiet && tdxState.chiTiet.han === han) t = tdxState.chiTiet;
  if (!t) t = { han, gian: '', py: '', hv: '', nghia: '' };
  const daLuu = await soTayDoi(tdChup(t), ns === 'td' ? 'tudien' : ns === 'st' ? 'sotay' : ns === 'bt' ? 'bothu' : 'kho');
  toast(daLuu ? `Đã lưu “${han}” vào sổ tay` : `Đã bỏ “${han}” khỏi sổ tay`);
  if (ns === 'kv') kvVeTab();
  else if (ns === 'st') renderNotebook(document.getElementById('page-content'));
  else if (ns === 'td') renderDictionary(document.getElementById('page-content'));
  else if (ns === 'bt') renderRadicals(document.getElementById('page-content'));
}

/** Khung xương chờ nạp — dùng lại `.tw-sk` của bộ primitive v2 (4.29). */
function tdSkeletonHtml(soDong = 8) {
  return `<div class="kv-page">
    <div class="tw-sk" style="height:120px;margin-bottom:18px"></div>
    <div class="tw-sk" style="height:46px;margin-bottom:14px"></div>
    ${Array.from({ length: soDong }, () => '<div class="tw-sk" style="height:64px;margin-bottom:10px"></div>').join('')}
  </div>`;
}

function tdLoiHtml(trang) {
  return `<div class="tv-empty">
      <i class="fa-solid fa-triangle-exclamation"></i>
      <p>Không tải được dữ liệu tra cứu. Kiểm tra kết nối mạng rồi thử lại.</p>
      <button class="btn btn-primary" onclick="window.app.navigate('${trang}')">Thử lại</button>
    </div>`;
}

// ============================================================
// 1. KHO TỪ VỰNG — gộp 4 bộ giáo trình (10.977 từ)
// ============================================================

function renderVocabulary(el) {
  if (daNap('kho.json')) return _kvRender(el);
  el.innerHTML = tdSkeletonHtml();
  napKho().then(() => {
    if (state.currentPage !== 'vocabulary') return;      // người dùng đã sang trang khác
    const now = document.getElementById('page-content');
    if (now) { _kvRender(now); twPlayEnter(now, 'tw-entering'); }
  }).catch(() => {
    const now = document.getElementById('page-content');
    if (now && state.currentPage === 'vocabulary') now.innerHTML = tdLoiHtml('vocabulary');
  });
}

/** Danh sách sau khi áp bộ lọc + tìm kiếm. */
function _kvLoc() {
  const kho = layNgay('kho.json') || [];
  let ds = kho;
  if (kvState.bo !== 'all') {
    ds = ds.filter((w) => (w[K.NHAN] || []).some((tag) => {
      const g = tdGiaiNhan(tag);
      return g && g.bo === kvState.bo && (kvState.cap === 'all' || g.cap === kvState.cap);
    }));
  }
  if (kvState.loai !== 'all') ds = ds.filter((w) => tdNhomTuLoai(w[K.LOAI]) === kvState.loai);
  if (kvState.tim.trim()) ds = tdTimTrong(ds, kvState.tim, 500);
  return ds;
}

/** Các cấp/quyển có thật trong bộ đang chọn — không bao giờ hiện một mục lọc rỗng. */
function _kvCapCua(bo) {
  const kho = layNgay('kho.json') || [];
  const s = new Set();
  for (const w of kho) for (const tag of w[K.NHAN] || []) {
    const g = tdGiaiNhan(tag);
    if (g && g.bo === bo) s.add(g.cap);
  }
  return [...s].sort();
}

function _kvHeroHtml(tong, hien) {
  return `
    <div class="tv-hero kv-hero">
      <div class="tv-hero-text">
        <span class="tv-hero-badge"><i class="fa-solid fa-layer-group"></i> 4 bộ giáo trình</span>
        <h1>Kho từ vựng</h1>
        <p>Toàn bộ <strong>${tong.toLocaleString('vi-VN')} từ</strong> của TOCFL 8000, HSK 3.0,
           Đương đại và Thời Đại gộp lại một chỗ — mỗi từ kèm <strong>âm Hán Việt</strong>,
           phát âm và cho biết nó thuộc bộ nào, cấp nào.</p>
      </div>
      <div class="tv-hero-mark font-tc" aria-hidden="true">詞</div>
    </div>`;
}

function _kvToolbarHtml(soHien, tong) {
  const caps = kvState.bo === 'all' ? [] : _kvCapCua(kvState.bo);
  const tenCap = { tocfl: 'Cấp', hsk: 'Cấp', duongdai: 'Quyển', thoidai: 'Quyển' };
  return `
    <div class="kv-bo-tabs">
      <button class="lesson-tab${kvState.bo === 'all' ? ' active' : ''}" onclick="window.app.kvBo('all')">Tất cả</button>
      ${TD_BO.map((b) => `<button class="lesson-tab${kvState.bo === b.id ? ' active' : ''}"
        onclick="window.app.kvBo('${b.id}')">${b.ten}</button>`).join('')}
    </div>
    <div class="tv-toolbar">
      <div class="tv-search">
        <i class="fa-solid fa-magnifying-glass"></i>
        <input id="kv-tim" type="search" placeholder="Tìm chữ Hán, phiên âm, âm Hán Việt hoặc nghĩa…"
               value="${tdEsc(kvState.tim)}" oninput="window.app.kvTim(this.value)" autocomplete="off">
        ${kvState.tim ? '<button class="tv-search-clear" onclick="window.app.kvTim(\'\')" title="Xoá tìm kiếm"><i class="fa-solid fa-xmark"></i></button>' : ''}
      </div>
      ${caps.length ? `<select class="tv-select" onchange="window.app.kvCap(this.value)" aria-label="Lọc theo cấp">
        <option value="all"${kvState.cap === 'all' ? ' selected' : ''}>Mọi ${tenCap[kvState.bo].toLowerCase()}</option>
        ${caps.map((c) => `<option value="${c}"${kvState.cap === c ? ' selected' : ''}>${tenCap[kvState.bo]} ${c}</option>`).join('')}
      </select>` : ''}
      <select class="tv-select" onchange="window.app.kvLoai(this.value)" aria-label="Lọc theo từ loại">
        <option value="all"${kvState.loai === 'all' ? ' selected' : ''}>Mọi từ loại</option>
        ${TD_TU_LOAI.map((p) => `<option value="${p.id}"${kvState.loai === p.id ? ' selected' : ''}>${p.ten}</option>`).join('')}
      </select>
      <button class="tv-char-toggle" onclick="window.app.toggleCharMode()" title="Chuyển giữa phồn thể và giản thể">
        <span class="font-tc">${state.charMode === 'simplified' ? '简' : '繁'}</span>
      </button>
    </div>
    <div class="tv-result">
      ${soHien === tong
        ? `<span><strong>${tong.toLocaleString('vi-VN')}</strong> từ</span>`
        : `<span>Tìm thấy <strong>${soHien.toLocaleString('vi-VN')}</strong> / ${tong.toLocaleString('vi-VN')} từ</span>`}
      ${soTay.size ? `<span class="kv-sotay-link" onclick="window.app.navigate('notebook')">
        <i class="fa-solid fa-bookmark"></i> Sổ tay: ${soTay.size} từ</span>` : ''}
    </div>`;
}

function _kvPagerHtml(tong, ns) {
  const soTrang = Math.max(1, Math.ceil(tong / KV_MOI_TRANG));
  if (soTrang <= 1) return '';
  const t = kvState.trang;
  const nums = [];
  for (let i = Math.max(1, t - 2); i <= Math.min(soTrang, t + 2); i++) nums.push(i);
  const nut = (n, nhan, tat) => `<button class="tv-pg${n === t ? ' active' : ''}"${tat ? ' disabled' : ''}
      onclick="window.app.kvTrang(${n})">${nhan}</button>`;
  return `<div class="tv-pager">
      ${nut(t - 1, '<i class="fa-solid fa-chevron-left"></i>', t <= 1)}
      ${t > 3 ? nut(1, '1') + (t > 4 ? '<span class="tv-pg-gap">…</span>' : '') : ''}
      ${nums.map((n) => nut(n, String(n))).join('')}
      ${t < soTrang - 2 ? (t < soTrang - 3 ? '<span class="tv-pg-gap">…</span>' : '') + nut(soTrang, String(soTrang)) : ''}
      ${nut(t + 1, '<i class="fa-solid fa-chevron-right"></i>', t >= soTrang)}
    </div>`;
}

function _kvRender(el) {
  const kho = layNgay('kho.json') || [];
  el.innerHTML = `
    <div class="kv-page">
      ${_kvHeroHtml(kho.length)}
      ${_kvToolbarHtml(_kvLoc().length, kho.length)}
      ${luyTabBarHtml('kv', kvState.tab)}
      <div id="kv-tab-content"></div>
    </div>`;
  kvVeTab();
}

/** Vẽ lại RIÊNG nội dung tab — giữ nguyên thanh công cụ để không mất con trỏ trong ô tìm. */
function kvVeTab() {
  const el = document.getElementById('kv-tab-content');
  if (!el) return;
  const ds = _kvLoc();
  if (kvState.tab === 'flashcard') luyRenderFc(el, ds, 'kv');
  else if (kvState.tab === 'quiz') luyRenderQuiz(el, ds, 'kv');
  else _kvRenderList(el, ds);
  ddMoveTabInk();
}

function _kvRenderList(el, ds) {
  const soTrang = Math.max(1, Math.ceil(ds.length / KV_MOI_TRANG));
  if (kvState.trang > soTrang) kvState.trang = soTrang;
  const dau = (kvState.trang - 1) * KV_MOI_TRANG;
  const trang = ds.slice(dau, dau + KV_MOI_TRANG);
  if (!ds.length) {
    el.innerHTML = `<div class="tv-empty"><i class="fa-solid fa-magnifying-glass"></i>
      <p>Không có từ nào khớp bộ lọc hiện tại.</p>
      <button class="btn btn-primary" onclick="window.app.kvXoaLoc()">Xoá bộ lọc</button></div>`;
    return;
  }
  const tuTrang = trang.map(tdTu);
  napTruocAudioTu(tuTrang);
  datDsDoc(tdDsDoc(tuTrang));
  el.innerHTML = `
    <div class="dd-vocab-header">
      <span class="dd-vocab-count"><i class="fa-solid fa-list"></i>
        Trang ${kvState.trang}/${soTrang} · từ ${dau + 1}–${Math.min(dau + KV_MOI_TRANG, ds.length)}</span>
      ${nutDocHtml()}
    </div>
    <div class="dd-vocab-list">${tuTrang.map((t, i) => tdTheTuHtml(t, dau + i + 1, 'kv')).join('')}</div>
    ${_kvPagerHtml(ds.length)}
    <p class="dd-vocab-credit"><i class="fa-solid fa-circle-info"></i>
      <span>Bấm vào một từ để mở trang <strong>Từ điển</strong> xem nghĩa đầy đủ, cách viết và
      các từ ghép chứa nó.</span></p>`;
}

// ---------- handler (phải khai đủ trong window.app) ----------

let _kvTimer = null;
function kvTim(v) {
  kvState.tim = v; kvState.trang = 1; kvState.fcIdx = 0; kvState.order = null;
  clearTimeout(_kvTimer);
  _kvTimer = setTimeout(() => {
    updateUrl();
    kvVeTab();
    // Vẽ lại làm mất con trỏ trong ô -> trả lại ngay, nếu không phải bấm lại sau mỗi chữ.
    const o = document.getElementById('kv-tim');
    if (o && document.activeElement !== o) { o.focus(); o.setSelectionRange(o.value.length, o.value.length); }
  }, 220);
}

function kvBo(bo) {
  kvState.bo = bo; kvState.cap = 'all'; kvState.trang = 1; kvState.fcIdx = 0;
  kvState.order = null; kvState.quiz = null;
  updateUrl();
  _kvRender(document.getElementById('page-content'));
}
function kvCap(c) {
  kvState.cap = c; kvState.trang = 1; kvState.fcIdx = 0; kvState.order = null; kvState.quiz = null;
  updateUrl();
  _kvRender(document.getElementById('page-content'));
}
function kvLoai(v) {
  kvState.loai = v; kvState.trang = 1; kvState.fcIdx = 0; kvState.order = null; kvState.quiz = null;
  updateUrl();
  _kvRender(document.getElementById('page-content'));
}
function kvXoaLoc() {
  kvState.bo = 'all'; kvState.cap = 'all'; kvState.loai = 'all'; kvState.tim = ''; kvState.trang = 1;
  updateUrl();
  _kvRender(document.getElementById('page-content'));
}
function kvTrang(n) {
  const soTrang = Math.max(1, Math.ceil(_kvLoc().length / KV_MOI_TRANG));
  kvState.trang = Math.min(Math.max(1, n), soTrang);
  updateUrl();
  kvVeTab();
  document.getElementById('page-content')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

// ============================================================
// 2. TỪ ĐIỂN TRUNG-VIỆT — 122.596 mục (CVDICT, CC BY-SA)
// ============================================================
// Hai đường tra, cố ý khác nhau về chi phí:
//   · gõ CHỮ HÁN      -> chỉ tải MẢNH của chữ đầu (~61 KB), không đụng chỉ mục nào;
//   · gõ pinyin/tiếng Việt/âm Hán Việt -> mới nạp `kho.json`, và nạp thêm `chu-don.json`
//     khi kết quả quá ít.
// Nhờ vậy thao tác phổ biến nhất (thấy một chữ lạ, gõ vào tra) chỉ tốn 61 KB.

/**
 * Ô tìm kiếm ngay trong trang. Trên điện thoại thanh tìm ở header bị ẩn (4.36), và ở trang Từ
 * điển thì nó LUÔN hiện kể cả trên máy tính — đây là việc duy nhất của trang.
 *
 * `keoKetQua = false` thì chỉ trả về Ô, không kèm khung kết quả: dùng khi đặt ô vào TRONG hero
 * (`.tv-hero` có `overflow: hidden` nên danh sách kết quả nằm trong đó sẽ bị cắt mất). Nơi gọi
 * phải tự render `dictPageResultsHtml()` ở ngoài hero.
 */
function dictPageSearchHtml(keoKetQua = true) {
  return `
    <div class="dict-page-search">
      <div class="dict-search-wrap">
        <i class="fa-solid fa-magnifying-glass dict-search-icon"></i>
        <input type="search" id="dict-page-input" class="dict-search-input" autocomplete="off"
          placeholder="Nhập chữ Hán, pinyin, âm Hán Việt hoặc nghĩa tiếng Việt…"
          value="${tdEsc(tdxState.tim)}"
          oninput="window.app.dictPageSearch(this.value)">
      </div>
      ${keoKetQua ? dictPageResultsHtml() : ''}
    </div>`;
}

/** Khung kết quả tra — `dictPageSearch()` ghi vào đây theo id nên đặt ở đâu cũng được. */
function dictPageResultsHtml() {
  return '<div class="dict-page-results" id="dict-page-results"></div>';
}

/**
 * Tìm kiếm dùng chung cho ô ở header và ô trong trang.
 * Trả về mảng hàng (dạng kho.json). Bất đồng bộ vì có thể phải nạp mảnh/chỉ mục.
 */
async function dictTimKiem(q, gioiHan = 30) {
  const tq = String(q || '').trim();
  if (!tq) return [];
  if (coChuHan(tq[0])) {
    // Đường rẻ: chỉ mảnh của chữ đầu.
    const manh = await napManh(tq[0]);
    const hang = manh.map(tdManhSangHang);
    const kq = tdTimTrong(hang, tq, gioiHan);
    // Bổ sung thông tin của dự án (âm Hán Việt, nhãn nguồn, audio) cho những từ có trong kho.
    const kho = layNgay('kho.json');
    if (!kho) return kq;
    const map = new Map(kho.map((w) => [w[K.HAN], w]));
    return kq.map((w) => map.get(w[K.HAN]) || w);
  }
  const kho = await napKho();
  let kq = tdTimTrong(kho, tq, gioiHan);
  // Ít kết quả -> mở rộng sang chữ đơn của từ điển. Chỉ nạp khi thật sự cần (231 KB gzip).
  if (kq.length < 5) {
    try {
      const cd = await napChuDon();
      kq = [...kq, ...tdTimTrong(cd, tq, gioiHan - kq.length)];
    } catch { /* không có cũng không sao, vẫn còn kết quả của kho */ }
  }
  return kq;
}

/** Giữ lại cho tương thích: dropdown ở header gọi hàm này. */
function dictResultItemHtml(w) {
  const t = tdTu(w);
  return `
    <div class="dict-dropdown-item" onclick="window.app.tdMoTu('${tdNhay(t.han)}')">
      <div class="dict-dropdown-hanzi font-tc">${tdEsc(getDisplayText(t.han, t.gian))}</div>
      <div class="dict-dropdown-info">
        <div class="dict-dropdown-pinyin">${tdEsc(t.py)}${t.hv ? ` · <span class="kv-hv">${tdEsc(t.hv)}</span>` : ''}</div>
        <div class="dict-dropdown-meaning">${tdEsc(t.nghia)}</div>
      </div>
    </div>`;
}

let _dictTimer = null;
function dictPageSearch(q) {
  tdxState.tim = q;
  clearTimeout(_dictTimer);
  const box = document.getElementById('dict-page-results');
  if (!(q || '').trim()) { if (box) box.innerHTML = ''; updateUrl(); return; }
  if (box) box.innerHTML = '<div class="dict-dropdown-empty">Đang tìm…</div>';
  _dictTimer = setTimeout(async () => {
    const kq = await dictTimKiem(q, 30).catch(() => []);
    const now = document.getElementById('dict-page-results');
    // Người dùng có thể đã gõ tiếp trong lúc chờ -> bỏ kết quả cũ.
    if (!now || tdxState.tim !== q) return;
    now.innerHTML = kq.length
      ? kq.map(dictResultItemHtml).join('')
      : '<div class="dict-dropdown-empty">Không tìm thấy kết quả</div>';
  }, 240);
}

/** Mở trang chi tiết của một từ. `han` là CHỮ HÁN (bản cũ dùng id số — xem PAGE_PARAMS). */
function tdMoTu(han) {
  tdxState.tu = han;
  tdxState.chiTiet = null;
  tdxState.lienQuan = null;
  const dd = document.getElementById('dict-dropdown');
  if (dd) dd.classList.remove('show');
  const di = document.getElementById('dict-search-input');
  if (di) di.value = '';
  navigate('dictionary', { segs: [han] });
}

function renderDictionary(el) {
  const han = tdxState.tu;
  if (!han) {
    el.innerHTML = `
      <div class="dict-page tdx-page">
        ${_tdxHeroHtml()}
        ${dictPageResultsHtml()}
        ${_tdxGoiYHtml()}
      </div>`;
    if (tdxState.tim) dictPageSearch(tdxState.tim);
    return;
  }
  if (tdxState.chiTiet && tdxState.chiTiet.han === han) return _tdxRenderChiTiet(el);
  el.innerHTML = `<div class="dict-page tdx-page">${_tdxHeroHtml()}${dictPageResultsHtml()}${tdSkeletonHtml(4)}</div>`;
  _tdxNapChiTiet(han).then(() => {
    if (state.currentPage !== 'dictionary' || tdxState.tu !== han) return;
    const now = document.getElementById('page-content');
    if (now) { _tdxRenderChiTiet(now); twPlayEnter(now, 'tw-entering'); }
  }).catch(() => {
    const now = document.getElementById('page-content');
    if (now && state.currentPage === 'dictionary') now.innerHTML = tdLoiHtml('dictionary');
  });
}

function _tdxHeroHtml() {
  return `
    <div class="tv-hero tdx-hero">
      <div class="tv-hero-text">
        <span class="tv-hero-badge"><i class="fa-solid fa-book-atlas"></i> 122.596 mục từ</span>
        <h1>Từ điển Trung-Việt</h1>
        <p>Tra bằng <strong>chữ Hán</strong>, <strong>phiên âm</strong>, <strong>âm Hán Việt</strong>
           hoặc <strong>nghĩa tiếng Việt</strong>. Mỗi mục có cách viết từng nét, phân tích bộ thủ
           và các từ ghép chứa nó.</p>
        ${dictPageSearchHtml(false)}
      </div>
      <div class="tv-hero-mark font-tc" aria-hidden="true">典</div>
    </div>`;
}

/** Vài lối vào cho người chưa biết gõ gì. */
function _tdxGoiYHtml() {
  const goiY = ['學', '愛', '謝謝', '朋友', '時間', '中文', '喜歡', '幫忙'];
  return `
    <div class="tdx-goiy">
      <div class="tdx-goiy-title">Thử tra nhanh</div>
      <div class="tdx-goiy-chips">
        ${goiY.map((c) => `<button class="tdx-chip font-tc" onclick="window.app.tdMoTu('${c}')">${c}</button>`).join('')}
      </div>
      <p class="tv-note"><i class="fa-solid fa-circle-info"></i>
        <span>Gõ được cả tiếng Việt không dấu: <em>“hoc sinh”</em>, <em>“xuesheng”</em>,
        <em>“học sinh”</em> đều ra 學生. Bấm <i class="fa-regular fa-bookmark"></i> để lưu từ
        vào <strong>Sổ tay</strong> rồi ôn lại bằng flashcard.</span></p>
    </div>`;
}

/**
 * Gom mọi thứ cần cho trang chi tiết:
 *   · các bản ghi của chính từ đó trong từ điển (một từ có thể có NHIỀU âm đọc — 行 xíng/háng
 *     là hai mục riêng, phải hiện đủ chứ không lấy mục đầu);
 *   · thông tin của dự án nếu từ này nằm trong giáo trình (âm Hán Việt, nhãn, mp3 giọng thật);
 *   · dữ liệu từng CHỮ để phân tích bộ thủ / số nét;
 *   · các từ ghép bắt đầu bằng từ này.
 */
async function _tdxNapChiTiet(han) {
  const [muc, lienQuan] = await Promise.all([tdTraTu(han), tdTuBatDau(han, 24)]);
  let goc = null;
  try {
    // Chỉ MẢNH chứa chữ đầu (~9 KB), không phải cả `kho.json` (575 KB gzip) — trang này chỉ
    // cần biết một từ có trong vốn dự án không. Kho đầy đủ đã nạp sẵn (vừa sang từ trang Kho
    // từ vựng) thì dùng luôn, khỏi thêm một request.
    const kho = layNgay('kho.json') || await napManhKho(han[0]);
    goc = kho.find((w) => w[K.HAN] === han) || null;
  } catch { /* không có kho cũng vẫn tra được, chỉ thiếu nhãn nguồn */ }
  // `bothu.json` chỉ 7 KB nhưng KHÔNG được quên: khối "phân tích từng chữ" tra bảng này để
  // biết tên bộ. Bản đầu không nạp nên nút bộ thủ im lặng biến mất khỏi mọi chữ.
  // Dữ liệu chữ lấy theo MẢNH của đúng 1-4 chữ trong từ, không nạp cả bảng 14.580 chữ.
  const [chu] = await Promise.all([
    (layNgay('chu.json') ? Promise.resolve(layNgay('chu.json')) : napChuCua(han)).catch(() => ({})),
    napBoThu().catch(() => []),
  ]);
  const t = goc ? tdTu(goc) : {
    han, gian: (muc[0] && muc[0][1]) || '', py: (muc[0] && muc[0][2]) || '',
    hv: [...han].map((c) => (chu[c] || [])[C.HV]).filter(Boolean).join(' '),
    nghia: '', loai: '', nhan: [], audio: '', tts: '', mayDich: true, en: '',
  };
  if (!t.hv) t.hv = [...han].map((c) => (chu[c] || [])[C.HV]).filter(Boolean).join(' ');
  t.muc = muc.map((r) => ({ py: r[2], nghia: r[3] || [] }));
  t.chuData = [...han].map((c) => ({ c, d: chu[c] || null }));
  tdxState.chiTiet = t;
  tdxState.lienQuan = lienQuan;
  return t;
}

function _tdxRenderChiTiet(el) {
  const t = tdxState.chiTiet;
  const hien = getDisplayText(t.han, t.gian);
  const nhieuAm = t.muc.length > 1;
  el.innerHTML = `
    <div class="dict-page tdx-page">
      ${dictPageSearchHtml()}
      <div class="tdx-card">
        <div class="tdx-head">
          <div class="tdx-han font-tc">${tdEsc(hien)}</div>
          <div class="tdx-head-info">
            <div class="tdx-py">${tdEsc(t.py || (t.muc[0] && t.muc[0].py) || '')}</div>
            ${t.hv ? `<div class="tdx-hv"><span class="tdx-hv-nhan">Âm Hán Việt</span>
              <strong>${tdEsc(t.hv)}</strong></div>` : ''}
            <div class="tdx-chips">
              ${t.loai ? `<span class="dd-vocab-pos">${tdEsc(t.loai)}</span>` : ''}
              ${tdNhanHtml(t.nhan)}
              ${t.gian && t.gian !== t.han ? `<span class="kv-nhan">简 ${tdEsc(t.gian)}</span>` : ''}
            </div>
          </div>
          <div class="tdx-head-act">
            <button class="btn btn-sm btn-outline" onclick="window.app.ddSpeakWord(${tdNgheArg(t)})">
              <i class="fa-solid fa-volume-high"></i> Nghe</button>
            <button class="btn btn-sm ${soTayCo(t.han) ? 'btn-primary' : 'btn-outline'}"
                    onclick="window.app.tdLuuTu('${tdNhay(t.han)}', 'td')">
              <i class="fa-${soTayCo(t.han) ? 'solid' : 'regular'} fa-bookmark"></i>
              ${soTayCo(t.han) ? 'Đã lưu' : 'Lưu vào sổ tay'}</button>
          </div>
        </div>

        <div class="tdx-section">
          <h3><i class="fa-solid fa-list-ul"></i> Nghĩa</h3>
          ${/* Nghĩa "đầu bảng" chỉ hiện khi nó KHÁC danh sách bên dưới: với từ mà nghĩa vốn
                lấy từ chính CVDICT, nó đúng là bản rút gọn của danh sách, in ra là đọc hai lần
                cùng một câu. */ ''}
          ${t.nghia && !(t.mayDich && t.muc.length) ? `<div class="tdx-nghia-chinh">${tdEsc(t.nghia)}</div>` : ''}
          ${t.mayDich && t.muc.length ? '<p class="tdx-may-note"><i class="fa-solid fa-robot"></i><span>Nghĩa dưới đây lấy từ từ điển Hán–Việt tự động, chưa qua biên soạn — đối chiếu thêm nếu thấy chưa sát văn cảnh.</span></p>' : ''}
          ${!t.nghia && !t.muc.length ? '<p class="tv-note"><i class="fa-solid fa-circle-info"></i><span>Chưa có nghĩa tiếng Việt cho từ này.</span></p>' : ''}
          ${t.en ? `<div class="tdx-en"><span>Giáo trình ghi</span> ${tdEsc(t.en)}</div>` : ''}
          ${t.muc.length ? t.muc.map((m) => `
            <div class="tdx-muc">
              ${nhieuAm ? `<div class="tdx-muc-py">${tdEsc(m.py)}</div>` : ''}
              <ol class="tdx-nghia-ds">${m.nghia.map((n) => `<li>${tdEsc(n)}</li>`).join('')}</ol>
            </div>`).join('')
            : ''}
        </div>

        ${_tdxChuHtml(t)}
        ${_tdxVietHtml(t.han)}
        ${_tdxLienQuanHtml()}

      </div>
    </div>`;
  // Vẽ nét phải chạy SAU khi khối đã vào DOM (HanziWriter cần phần tử thật để đo).
  tdxVeNet();
}

/** Khối phân tích từng CHỮ trong từ — thứ mà người Việt học chữ Hán cần nhất. */
function _tdxChuHtml(t) {
  const ds = (t.chuData || []).filter((x) => x.d);
  if (!ds.length) return '';
  return `
    <div class="tdx-section">
      <h3><i class="fa-solid fa-cube"></i> Phân tích từng chữ</h3>
      <div class="tdx-chu-grid">
        ${ds.map(({ c, d }) => {
          const bo = (layNgay('bothu.json') || []).find((b) => b.so === d[C.BO]);
          return `
          <div class="tdx-chu">
            <div class="tdx-chu-han font-tc" onclick="window.app.tdMoTu('${tdNhay(c)}')"
                 title="Tra chữ ${tdEsc(c)}">${tdEsc(c)}</div>
            <div class="tdx-chu-info">
              <div class="tdx-chu-hv">${tdEsc(d[C.HV] || '')}${d[C.PY] ? ` <span>${tdEsc(d[C.PY])}</span>` : ''}</div>
              <div class="tdx-chu-ngh">${tdEsc(d[C.NGHIA] || '')}</div>
              <div class="tdx-chu-meta">
                ${bo ? `<button class="tdx-bo" onclick="window.app.btMo(${bo.so})"
                   title="Xem bộ thủ ${tdEsc(bo.hv)}">Bộ <span class="font-tc">${tdEsc(bo.chu)}</span> ${tdEsc(bo.hv)}</button>` : ''}
                ${d[C.NET] ? `<span class="tdx-net">${d[C.NET]} nét</span>` : ''}
                ${d[C.PHAN_RA] ? `<span class="tdx-phanra font-tc" title="Cách ghép chữ">${tdEsc(d[C.PHAN_RA])}</span>` : ''}
              </div>
            </div>
          </div>`;
        }).join('')}
      </div>
    </div>`;
}

/**
 * Khối tập viết. Chỉ vẽ KHUNG ở đây; HanziWriter nạp động khi khối đã vào DOM (4.30) —
 * thư viện ~50 KB, không đáng tải cho người chỉ tra nghĩa.
 */
function _tdxVietHtml(han) {
  const chu = [...han].filter((c) => coChuHan(c));
  if (!chu.length) return '';
  return `
    <div class="tdx-section">
      <h3><i class="fa-solid fa-pen-nib"></i> Cách viết</h3>
      <div class="tdx-viet-row">
        ${chu.map((c, i) => `
          <div class="tdx-viet">
            <div class="tdx-viet-canvas" id="tdx-hw-${i}" data-chu="${tdEsc(c)}"></div>
            <button class="btn btn-sm" onclick="window.app.tdxVietLai(${i})">
              <i class="fa-solid fa-rotate-right"></i> Xem lại</button>
          </div>`).join('')}
      </div>
    </div>`;
}

function _tdxLienQuanHtml() {
  const ds = tdxState.lienQuan || [];
  if (!ds.length) return '';
  return `
    <div class="tdx-section">
      <h3><i class="fa-solid fa-diagram-project"></i> Từ ghép chứa chữ này <span class="tdx-dem">${ds.length}</span></h3>
      <div class="tdx-lq">
        ${ds.map((r) => `
          <button class="tdx-lq-item" onclick="window.app.tdMoTu('${tdNhay(r[0])}')">
            <span class="font-tc">${tdEsc(getDisplayText(r[0], r[1] || r[0]))}</span>
            <span class="tdx-lq-py">${tdEsc(r[2])}</span>
            <span class="tdx-lq-ngh">${tdEsc((r[3] || [])[0] || '')}</span>
          </button>`).join('')}
      </div>
    </div>`;
}

/** Vẽ nét cho toàn bộ chữ trong khối "Cách viết". Gọi sau khi DOM đã có. */
const _tdxWriters = {};
function tdxVeNet() {
  const oList = document.querySelectorAll('.tdx-viet-canvas');
  if (!oList.length) return;
  napHanziWriter().then(() => {
    oList.forEach((o) => {
      const c = o.dataset.chu;
      if (!c || o.dataset.xong === '1') return;
      o.dataset.xong = '1';
      o.innerHTML = '';
      try {
        const w = HanziWriter.create(o, c, {
          width: 108, height: 108, padding: 6,
          strokeColor: '#38899E', outlineColor: '#D9E4E6', delayBetweenStrokes: 120,
          strokeAnimationSpeed: 1.1,
        });
        _tdxWriters[o.id] = w;
        w.loopCharacterAnimation();
      } catch { o.innerHTML = `<span class="font-tc tdx-viet-fallback">${tdEsc(c)}</span>`; }
    });
  }).catch(() => {
    // Không tải được thư viện -> vẫn hiện chữ, đừng để ô trống không lời giải thích.
    oList.forEach((o) => { o.innerHTML = `<span class="font-tc tdx-viet-fallback">${tdEsc(o.dataset.chu || '')}</span>`; });
  });
}

function tdxVietLai(i) {
  const w = _tdxWriters[`tdx-hw-${i}`];
  if (w) w.animateCharacter();
}

// ============================================================
// 3. SỔ TAY TỪ VỰNG
// ============================================================
// Lưu được MỌI từ ở mọi module (khoá theo chữ Hán, xem khối SỔ TAY ở đầu section). Đã đăng
// nhập thì đồng bộ lên tài khoản; chưa đăng nhập vẫn dùng được, đăng nhập sau sẽ gộp vào.

function renderNotebook(el) {
  const ds = _stLoc();
  if (!soTay.size) {
    el.innerHTML = `
      <div class="kv-page">
        <div class="empty-state">
          <i class="fa-solid fa-book-bookmark"></i>
          <h3>Sổ tay đang trống</h3>
          <p>Bấm biểu tượng <i class="fa-regular fa-bookmark"></i> ở bất kỳ đâu — Kho từ vựng,
             Từ điển, thẻ từ trong bài giáo trình — để cất từ vào đây, rồi ôn lại bằng
             flashcard và trắc nghiệm.</p>
          <div class="st-empty-act">
            <button class="btn btn-primary" onclick="window.app.navigate('vocabulary')">Mở kho từ vựng</button>
            <button class="btn btn-outline" onclick="window.app.navigate('dictionary')">Tra từ điển</button>
          </div>
        </div>
      </div>`;
    return;
  }
  el.innerHTML = `
    <div class="kv-page">
      <div class="st-head">
        <div>
          <h2 class="hskv-title">Sổ tay từ vựng</h2>
          <p class="hskv-sub">${soTay.size.toLocaleString('vi-VN')} từ đã lưu${state.isLoggedIn
            ? ' · đang đồng bộ với tài khoản'
            : ' · <strong>chỉ lưu trên trình duyệt này</strong>, đăng nhập để đồng bộ'}</p>
        </div>
        <div class="st-head-act">
          <button class="btn btn-sm btn-outline" onclick="window.app.stXuatCsv()">
            <i class="fa-solid fa-file-arrow-down"></i> Tải CSV</button>
        </div>
      </div>
      <div class="tv-toolbar">
        <div class="tv-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input id="st-tim" type="search" placeholder="Tìm trong sổ tay…" value="${tdEsc(stState.tim)}"
                 oninput="window.app.stTim(this.value)" autocomplete="off">
          ${stState.tim ? '<button class="tv-search-clear" onclick="window.app.stTim(\'\')"><i class="fa-solid fa-xmark"></i></button>' : ''}
        </div>
        <select class="tv-select" onchange="window.app.stLoc(this.value)" aria-label="Lọc theo nơi lưu">
          <option value="all"${stState.loc === 'all' ? ' selected' : ''}>Mọi nơi lưu</option>
          <option value="kho"${stState.loc === 'kho' ? ' selected' : ''}>Kho từ vựng</option>
          <option value="tudien"${stState.loc === 'tudien' ? ' selected' : ''}>Từ điển</option>
          <option value="giaotrinh"${stState.loc === 'giaotrinh' ? ' selected' : ''}>Bài giáo trình</option>
          <option value="bothu"${stState.loc === 'bothu' ? ' selected' : ''}>Bộ thủ</option>
        </select>
        <select class="tv-select" onchange="window.app.stSap(this.value)" aria-label="Sắp xếp">
          <option value="moi"${stState.sap === 'moi' ? ' selected' : ''}>Mới lưu trước</option>
          <option value="cu"${stState.sap === 'cu' ? ' selected' : ''}>Lưu lâu nhất trước</option>
          <option value="py"${stState.sap === 'py' ? ' selected' : ''}>Theo phiên âm</option>
        </select>
      </div>
      ${luyTabBarHtml('st', stState.tab)}
      <div id="st-tab-content"></div>
    </div>`;
  stVeTab();
}

/** Sổ tay -> mảng hàng cùng dạng kho.json để dùng chung mọi renderer. */
function _stHang() {
  const kho = layNgay('kho.json');
  const map = kho ? new Map(kho.map((w) => [w[K.HAN], w])) : null;
  return [...soTay.values()].map((s) => {
    // Ưu tiên bản đầy đủ trong kho (có audio + nhãn nguồn); bản chụp chỉ là dự phòng khi kho
    // chưa nạp hoặc từ đó không thuộc giáo trình nào.
    const day = map && map.get(s.tu);
    if (day) return day;
    return [s.tu, s.gian || 0, s.pinyin || '', s.han_viet || 0, s.nghia || '', 0, 0, 0, 0, 1, 0];
  });
}

function _stLoc() {
  let ds = _stHang();
  if (stState.loc !== 'all') {
    ds = ds.filter((w) => {
      const s = soTay.get(w[K.HAN]);
      const n = (s && s.nguon) || '';
      return stState.loc === 'giaotrinh' ? (n === 'giaotrinh' || n === 'cu') : n === stState.loc;
    });
  }
  if (stState.tim.trim()) ds = tdTimTrong(ds, stState.tim, 500);
  else if (stState.sap === 'py') ds = [...ds].sort((a, b) => tdKhongDau(a[K.PY]).localeCompare(tdKhongDau(b[K.PY])));
  else if (stState.sap === 'cu') ds = [...ds].reverse();
  return ds;
}

function stVeTab() {
  const el = document.getElementById('st-tab-content');
  if (!el) return;
  const ds = _stLoc();
  if (stState.tab === 'flashcard') luyRenderFc(el, ds, 'st');
  else if (stState.tab === 'quiz') luyRenderQuiz(el, ds, 'st');
  else if (!ds.length) {
    el.innerHTML = `<div class="tv-empty"><i class="fa-solid fa-magnifying-glass"></i>
      <p>Không có từ nào khớp bộ lọc.</p>
      <button class="btn btn-primary" onclick="window.app.stTim('')">Xoá bộ lọc</button></div>`;
  } else {
    const tuSo = ds.map(tdTu);
    napTruocAudioTu(tuSo);
    datDsDoc(tdDsDoc(tuSo));
    el.innerHTML = `
      <div class="dd-vocab-header">
        <span class="dd-vocab-count"><i class="fa-solid fa-bookmark"></i> ${ds.length.toLocaleString('vi-VN')} từ</span>
        ${nutDocHtml()}
      </div>
      <div class="dd-vocab-list">${tuSo.map((t, i) => tdTheTuHtml(t, i + 1, 'st')).join('')}</div>`;
  }
  ddMoveTabInk();
}

let _stTimer = null;
function stTim(v) {
  stState.tim = v; stState.fcIdx = 0; stState.order = null;
  clearTimeout(_stTimer);
  _stTimer = setTimeout(() => {
    updateUrl();
    stVeTab();
    const o = document.getElementById('st-tim');
    if (o && document.activeElement !== o) { o.focus(); o.setSelectionRange(o.value.length, o.value.length); }
  }, 200);
}
function stLoc(v) { stState.loc = v; stState.fcIdx = 0; stState.order = null; stState.quiz = null; updateUrl(); stVeTab(); }
function stSap(v) { stState.sap = v; stState.fcIdx = 0; stState.order = null; updateUrl(); stVeTab(); }

/**
 * Tải sổ tay ra CSV để in hoặc nạp vào Anki/Quizlet.
 * ⚠️ Có BOM UTF-8 ở đầu — thiếu nó thì Excel trên Windows mở ra là chữ Hán và tiếng Việt đều
 *    vỡ thành ký tự lạ (cùng lý do route báo cáo của admin phải thêm BOM, xem 4.15).
 */
function stXuatCsv() {
  const q = (s) => `"${String(s == null ? '' : s).replace(/"/g, '""')}"`;
  const dong = [['Chữ Hán', 'Giản thể', 'Phiên âm', 'Âm Hán Việt', 'Nghĩa', 'Ghi chú'].map(q).join(',')];
  for (const w of _stLoc()) {
    const t = tdTu(w);
    const s = soTay.get(t.han) || {};
    dong.push([t.han, t.gian, t.py, t.hv, t.nghia, s.ghi_chu || ''].map(q).join(','));
  }
  const blob = new Blob(['﻿' + dong.join('\r\n')], { type: 'text/csv;charset=utf-8' });
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `so-tay-tu-vung-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click();
  setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
}

// ============================================================
// 4. BỘ THỦ HÁN TỰ — 214 bộ Khang Hy
// ============================================================
// Bản cũ có 16 bộ, là thẻ tĩnh không bấm được. Nay đủ 214 bộ, mỗi bộ có âm Hán Việt, nghĩa,
// biến thể (亻氵扌忄艹辶…) và danh sách CHỮ THẬT thuộc bộ đó lấy từ `chu.json`.
//
// Biến thể suy thẳng từ Unihan (chữ nào có `kRSUnicode = N.0` là một hình dạng của bộ N) chứ
// không chép tay — xem `bienTheBoThu()` trong scripts/gen-tudien.mjs.

function renderRadicals(el) {
  if (!daNap('bothu.json')) {
    el.innerHTML = tdSkeletonHtml(6);
    napBoThu().then(() => {
      if (state.currentPage !== 'radicals') return;
      const now = document.getElementById('page-content');
      if (now) { renderRadicals(now); twPlayEnter(now, 'tw-entering'); }
    }).catch(() => {
      const now = document.getElementById('page-content');
      if (now && state.currentPage === 'radicals') now.innerHTML = tdLoiHtml('radicals');
    });
    return;
  }
  if (btState.chon) return _btRenderChiTiet(el);
  _btRenderLuoi(el);
  // Nạp NỀN dữ liệu chữ để bấm vào một bộ là mở được ngay. 256 KB nên không chờ nó để vẽ lưới.
  if (!daNap('chu.json')) napChu().catch(() => {});
}

function _btLoc() {
  const ds = layNgay('bothu.json') || [];
  let ra = ds;
  if (btState.net !== 'all') {
    const [a, b] = btState.net.split('-').map(Number);
    ra = ra.filter((x) => x.net >= a && x.net <= b);
  }
  const q = btState.tim.trim();
  if (q) {
    const k = tdKhongDau(q);
    ra = ra.filter((x) => x.chu === q || (x.bien || []).includes(q)
      || tdKhongDau(x.hv).includes(k) || tdKhongDau(x.ngh).includes(k)
      || tdKhongDau(x.py || '').includes(k) || String(x.so) === q);
  }
  return ra;
}

const BT_NHOM_NET = [
  { id: 'all', ten: 'Mọi số nét' }, { id: '1-2', ten: '1–2 nét' }, { id: '3-4', ten: '3–4 nét' },
  { id: '5-6', ten: '5–6 nét' }, { id: '7-8', ten: '7–8 nét' }, { id: '9-17', ten: '9 nét trở lên' },
];

function _btRenderLuoi(el) {
  const ds = _btLoc();
  const tong = (layNgay('bothu.json') || []).length;
  el.innerHTML = `
    <div class="kv-page bt-page">
      <div class="tv-hero bt-hero">
        <div class="tv-hero-text">
          <span class="tv-hero-badge"><i class="fa-solid fa-torii-gate"></i> 214 bộ Khang Hy</span>
          <h1>Bộ thủ Hán tự</h1>
          <p>Bộ thủ là "chìa khoá" của chữ Hán: biết bộ là đoán được nghĩa và tra được từ điển.
             Mỗi bộ ở đây có <strong>âm Hán Việt</strong>, các <strong>biến thể</strong> hay gặp
             và danh sách <strong>chữ thật</strong> thuộc bộ đó.</p>
        </div>
        <div class="tv-hero-mark font-tc" aria-hidden="true">部</div>
      </div>
      <div class="tv-toolbar">
        <div class="tv-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input id="bt-tim" type="search" placeholder="Tìm bộ theo chữ, âm Hán Việt, nghĩa hoặc số bộ…"
                 value="${tdEsc(btState.tim)}" oninput="window.app.btTim(this.value)" autocomplete="off">
          ${btState.tim ? '<button class="tv-search-clear" onclick="window.app.btTim(\'\')"><i class="fa-solid fa-xmark"></i></button>' : ''}
        </div>
        <select class="tv-select" onchange="window.app.btNet(this.value)" aria-label="Lọc theo số nét">
          ${BT_NHOM_NET.map((n) => `<option value="${n.id}"${btState.net === n.id ? ' selected' : ''}>${n.ten}</option>`).join('')}
        </select>
      </div>
      <div class="tv-result"><span>${ds.length === tong
        ? `<strong>${tong}</strong> bộ thủ`
        : `Tìm thấy <strong>${ds.length}</strong> / ${tong} bộ`}</span></div>
      ${ds.length ? `<div class="bt-grid">${ds.map(_btTheHtml).join('')}</div>`
        : `<div class="tv-empty"><i class="fa-solid fa-magnifying-glass"></i>
             <p>Không có bộ nào khớp.</p>
             <button class="btn btn-primary" onclick="window.app.btTim('')">Xoá bộ lọc</button></div>`}
      <p class="dd-vocab-credit"><i class="fa-solid fa-circle-info"></i>
        <span>Số bộ, số nét và biến thể lấy từ <strong>Unihan Database</strong> của Unicode;
        tên gọi và nghĩa tiếng Việt của bộ theo cách gọi quen thuộc trong tài liệu dạy Hán tự
        cho người Việt.</span></p>
    </div>`;
}

function _btTheHtml(b) {
  return `
    <button class="bt-the" onclick="window.app.btMo(${b.so})" aria-label="Bộ ${b.so} ${tdEsc(b.hv)}">
      <span class="bt-so">${b.so}</span>
      <span class="bt-chu font-tc">${tdEsc(b.chu)}</span>
      <span class="bt-hv">${tdEsc(b.hv)}</span>
      <span class="bt-ngh">${tdEsc(b.ngh)}</span>
      <span class="bt-meta">
        <span>${b.net} nét</span>
        ${b.bien && b.bien.length ? `<span class="bt-bien font-tc">${b.bien.map(tdEsc).join(' ')}</span>` : ''}
        ${b.soChu ? `<span>${b.soChu} chữ</span>` : ''}
      </span>
    </button>`;
}

/**
 * Chữ thuộc một bộ.
 *
 * Xếp CHỮ THƯỜNG GẶP (có trong vốn từ của 4 bộ giáo trình) lên trước, rồi mới tới phần còn
 * lại; trong mỗi nhóm xếp theo số nét như từ điển Hán tự.
 * ⚠️ Xếp thuần theo số nét (bản đầu) thì bộ 水 mở ra là 氿 汃 汄 — 622 chữ mà toàn chữ không ai
 *    học, người dùng tưởng trang này chẳng liên quan gì tới từ mình đang tra.
 */
function _btChuCuaBo(so) {
  const chu = layNgay('chu.json');
  if (!chu) return null;
  const ra = [];
  for (const [c, d] of Object.entries(chu)) if (d[C.BO] === so) ra.push({ c, d });
  ra.sort((a, b) => (b.d[C.PHO] || 0) - (a.d[C.PHO] || 0)
    || (a.d[C.NET] || 99) - (b.d[C.NET] || 99) || a.c.localeCompare(b.c));
  return ra;
}

function _btRenderChiTiet(el) {
  const b = (layNgay('bothu.json') || []).find((x) => x.so === btState.chon);
  if (!b) { btState.chon = null; return _btRenderLuoi(el); }
  const chu = _btChuCuaBo(b.so);
  el.innerHTML = `
    <div class="kv-page bt-page">
      <button class="btn btn-sm btn-outline bt-back" onclick="window.app.btVe()">
        <i class="fa-solid fa-arrow-left"></i> Tất cả 214 bộ</button>
      <div class="bt-detail">
        <div class="bt-detail-head">
          <div class="bt-detail-chu font-tc">${tdEsc(b.chu)}</div>
          <div class="bt-detail-info">
            <div class="bt-detail-so">Bộ thủ số ${b.so} · ${b.net} nét</div>
            <h2>${tdEsc(b.hv)}${b.py ? ` <span class="bt-detail-py">${tdEsc(b.py)}</span>` : ''}</h2>
            <p>${tdEsc(b.ngh)}</p>
            ${b.bien && b.bien.length ? `<div class="bt-detail-bien">
              <span>Biến thể</span>
              ${b.bien.map((v) => `<span class="font-tc bt-bien-chip">${tdEsc(v)}</span>`).join('')}
            </div>` : ''}
          </div>
          <button class="dd-btn-speak" onclick="window.app.ddSpeakWord('${tdNhay(b.chu)}', null, null, 'zh-TW')"
                  title="Nghe cách đọc"><i class="fa-solid fa-volume-high"></i></button>
        </div>
        ${b.ghiChu ? `<p class="bt-ghichu"><i class="fa-solid fa-lightbulb"></i><span>${tdEsc(b.ghiChu)}</span></p>` : ''}
        <div class="tdx-section">
          <h3><i class="fa-solid fa-font"></i> Chữ thuộc bộ này
            ${chu ? `<span class="tdx-dem">${chu.length}</span>` : ''}</h3>
          ${chu === null
            ? '<div class="tw-sk" style="height:120px"></div>'
            : chu.length
              ? (() => {
                  const pho = chu.filter((x) => x.d[C.PHO]);
                  const con = chu.filter((x) => !x.d[C.PHO]).slice(0, 240);
                  const o = ({ c, d }) => `
                    <button class="bt-chu-o" onclick="window.app.tdMoTu('${tdNhay(c)}')" title="${tdEsc(d[C.NGHIA] || '')}">
                      <span class="font-tc">${tdEsc(c)}</span>
                      <span class="bt-chu-hv">${tdEsc(d[C.HV] || '')}</span>
                    </button>`;
                  return `
                    ${pho.length ? `<div class="bt-nhom">Có trong giáo trình <span>${pho.length}</span></div>
                      <div class="bt-chu-grid">${pho.map(o).join('')}</div>` : ''}
                    ${con.length ? `<div class="bt-nhom">Chữ ít gặp hơn <span>${chu.length - pho.length}</span></div>
                      <div class="bt-chu-grid">${con.map(o).join('')}</div>` : ''}
                    ${chu.length - pho.length > con.length
                      ? `<p class="tv-note"><i class="fa-solid fa-circle-info"></i><span>Nhóm "ít gặp hơn" đang hiện ${con.length} chữ đầu (xếp theo số nét) trong tổng số ${chu.length - pho.length}.</span></p>` : ''}`;
                })()
              : '<p class="tv-note"><i class="fa-solid fa-circle-info"></i><span>Chưa có chữ nào thuộc bộ này trong kho dữ liệu.</span></p>'}
        </div>
      </div>
    </div>`;
  // Chưa có chu.json (bấm vào bộ ngay khi trang vừa mở) -> nạp rồi vẽ lại.
  if (chu === null) {
    napChu().then(() => {
      if (state.currentPage === 'radicals' && btState.chon === b.so) {
        const now = document.getElementById('page-content');
        if (now) _btRenderChiTiet(now);
      }
    }).catch(() => {});
  }
}

function btMo(so) {
  btState.chon = Number(so);
  if (state.currentPage !== 'radicals') { navigate('radicals', { segs: [`bo-${so}`] }); return; }
  updateUrl({ push: true });
  _btRenderChiTiet(document.getElementById('page-content'));
}
function btVe() {
  btState.chon = null;
  updateUrl({ push: true });
  _btRenderLuoi(document.getElementById('page-content'));
}
let _btTimer = null;
function btTim(v) {
  btState.tim = v;
  clearTimeout(_btTimer);
  _btTimer = setTimeout(() => {
    updateUrl();
    _btRenderLuoi(document.getElementById('page-content'));
    const o = document.getElementById('bt-tim');
    if (o && document.activeElement !== o) { o.focus(); o.setSelectionRange(o.value.length, o.value.length); }
  }, 200);
}
function btNet(v) { btState.net = v; updateUrl(); _btRenderLuoi(document.getElementById('page-content')); }

// ============================================================
// LUYỆN TẬP dùng chung cho Kho từ vựng và Sổ tay
// ============================================================
// Một bộ hàm, hai trang gọi — `ns` ('kv' | 'st') cho biết đang ở trang nào. Viết hai bản là
// hai chỗ phải sửa mỗi lần đổi giao diện thẻ.

const LUY_STATE = { kv: () => kvState, st: () => stState };
const LUY_VE = { kv: () => kvVeTab(), st: () => stVeTab() };
const _luyDs = (ns) => (ns === 'kv' ? _kvLoc() : _stLoc());

function luyTabBarHtml(ns, tab) {
  const tabs = [
    { id: 'list', nhan: ns === 'st' ? 'Từ đã lưu' : 'Danh sách', icon: 'fa-list' },
    { id: 'flashcard', nhan: 'Flashcard', icon: 'fa-clone' },
    { id: 'quiz', nhan: 'Trắc nghiệm', icon: 'fa-circle-check' },
  ];
  return `<div class="dd-tab-bar"><span class="dd-tab-ink"></span>
    ${tabs.map((t) => `<button class="dd-tab-btn${tab === t.id ? ' active' : ''}" data-tab="${t.id}"
        onclick="window.app.luyTab('${ns}','${t.id}')"><i class="fa-solid ${t.icon}"></i><span>${t.nhan}</span></button>`).join('')}
  </div>`;
}

function luyTab(ns, tab) {
  const s = LUY_STATE[ns]();
  if (s.tab === tab) return;
  s.tab = tab;
  if (tab !== 'quiz') s.quiz = null;
  updateUrl();
  LUY_VE[ns]();
}

/** Bộ thẻ = danh sách đã lọc, áp thứ tự xáo nếu có. */
function _luyDeck(ns) {
  const s = LUY_STATE[ns]();
  const ds = _luyDs(ns);
  if (!s.order) return ds;
  return s.order.map((i) => ds[i]).filter(Boolean);
}

function luyRenderFc(el, dsGoc, ns) {
  const s = LUY_STATE[ns]();
  const deck = _luyDeck(ns);
  if (!deck.length) {
    el.innerHTML = `<div class="tv-empty"><i class="fa-solid fa-clone"></i>
      <p>Không còn từ nào sau bộ lọc.</p></div>`;
    return;
  }
  if (s.fcIdx >= deck.length) s.fcIdx = 0;
  napTruocAudioTu(deck.slice(s.fcIdx, s.fcIdx + 12).map(tdTu), 12);
  const t = tdTu(deck[s.fcIdx]);
  const hien = getDisplayText(t.han, t.gian);
  el.innerHTML = `
    <div class="tv-fc-bar">
      <span class="dd-vocab-count">Thẻ ${s.fcIdx + 1} / ${deck.length}</span>
      <button class="btn btn-sm" onclick="window.app.luyXao('${ns}')">
        <i class="fa-solid fa-shuffle"></i> ${s.order ? 'Thứ tự gốc' : 'Xáo thẻ'}</button>
    </div>
    <div class="tw-bar tv-fc-progress"><i style="width:${((s.fcIdx + 1) / deck.length) * 100}%"></i></div>
    <div class="dd-fc-container">
      <div class="dd-fc-card${s.fcLat ? ' flipped' : ''}" onclick="window.app.luyLat('${ns}')">
        <div class="dd-fc-card-inner">
          <div class="dd-fc-front">
            <div class="tv-fc-hanzi font-tc">${tdEsc(hien)}</div>
            <button class="dd-btn-speak tv-fc-speak" onclick="event.stopPropagation(); window.app.ddSpeakWord(${tdNgheArg(t)})">
              <i class="fa-solid fa-volume-high"></i></button>
          </div>
          <div class="dd-fc-back">
            <div class="tv-fc-pinyin">${tdEsc(t.py)}</div>
            ${t.hv ? `<div class="luy-hv">${tdEsc(t.hv)}</div>` : ''}
            <div class="tv-fc-def">${tdEsc(t.nghia)}</div>
            ${t.loai ? `<span class="dd-vocab-pos">${tdEsc(t.loai)}</span>` : ''}
          </div>
        </div>
      </div>
    </div>
    <div class="dd-fc-controls">
      <button class="dd-fc-nav-btn" onclick="window.app.luyNav('${ns}',-1)" ${s.fcIdx === 0 ? 'disabled' : ''}>
        <i class="fa-solid fa-chevron-left"></i></button>
      <button class="btn btn-primary" onclick="window.app.luyLat('${ns}')">Lật thẻ</button>
      <button class="dd-fc-nav-btn" onclick="window.app.luyNav('${ns}',1)" ${s.fcIdx >= deck.length - 1 ? 'disabled' : ''}>
        <i class="fa-solid fa-chevron-right"></i></button>
    </div>
    <p class="dd-fc-hint">Nhấn vào thẻ để lật<span class="fc-hint-kb"> · Phím ← → chuyển thẻ · Space lật thẻ</span></p>`;
}

function luyLat(ns) { const s = LUY_STATE[ns](); s.fcLat = !s.fcLat; LUY_VE[ns](); }
function luyNav(ns, d) {
  const s = LUY_STATE[ns]();
  const n = _luyDeck(ns).length;
  s.fcIdx = Math.min(Math.max(0, s.fcIdx + d), Math.max(0, n - 1));
  s.fcLat = false;
  LUY_VE[ns]();
}
function luyXao(ns) {
  const s = LUY_STATE[ns]();
  if (s.order) s.order = null;
  else s.order = tronMang(Array.from({ length: _luyDs(ns).length }, (_, i) => i));
  s.fcIdx = 0; s.fcLat = false;
  LUY_VE[ns]();
}

/**
 * Sinh đề từ danh sách đang lọc. Dùng lại `generateQuiz` của module giáo trình (4.19: đề đã
 * trộn cả thứ tự câu lẫn thứ tự đáp án NGAY TRONG đó — đừng viết bộ xáo riêng), bằng cách
 * dựng một "nguồn" hình dạng giáo trình từ danh sách hiện có.
 */
function _luySinhDe(ns) {
  const ds = _luyDs(ns).map(tdTu).filter((t) => t && t.nghia && t.han);
  if (ds.length < 4) return null;
  const xao = tronMang(ds);
  const hoi = xao.slice(0, Math.min(KV_SO_CAU, xao.length));
  const moi = xao.slice(hoi.length, hoi.length + 40);        // mồi nhử, không bị hỏi
  const key = `luyen-${ns}`;
  const sang = (t) => ({ hanzi: t.han, simplified: t.gian || t.han, pinyin: t.py, def: t.nghia, pos: t.loai });
  const nguon = {
    vocab: { [key]: [...hoi, ...moi].map(sang) },
    subs: [{ id: `${key}.1`, parentId: key, from: 1, to: hoi.length }],
    lessons: [{ id: key }],
  };
  return generateQuiz(`${key}.1`, nguon);
}

function luyRenderQuiz(el, dsGoc, ns) {
  const s = LUY_STATE[ns]();
  const q = s.quiz;
  if (!q) {
    const n = _luyDs(ns).length;
    el.innerHTML = `
      <div class="tv-quiz-intro">
        <div class="tw-ic is-primary"><i class="fa-solid fa-circle-check"></i></div>
        <h3>Kiểm tra từ vựng</h3>
        <p>${KV_SO_CAU} câu ngẫu nhiên lấy từ ${n.toLocaleString('vi-VN')} từ đang hiển thị.
           Bộ lọc và ô tìm kiếm ở tab danh sách cũng áp dụng cho đề này.</p>
        ${n < 4
          ? '<p class="tv-warn"><i class="fa-solid fa-triangle-exclamation"></i><span>Cần ít nhất 4 từ mới sinh được đề. Hãy nới bộ lọc lại.</span></p>'
          : `<button class="btn btn-primary btn-lg" onclick="window.app.luyBatDau('${ns}')">
               <i class="fa-solid fa-play"></i> Bắt đầu làm bài</button>`}
      </div>`;
    return;
  }
  if (q.phase === 'done') {
    const pt = q.scorePercent;
    el.innerHTML = `
      <div class="tv-quiz-done">
        <div class="tv-score ${pt >= 80 ? 'good' : pt >= 50 ? 'ok' : 'bad'}">${pt}%</div>
        <p>Đúng <strong>${q.correct}</strong> / ${q.questions.length} câu</p>
        <div class="tv-quiz-review">
          ${q.questions.map((c, i) => {
            const chon = q.answers[i];
            return `<div class="tv-rv${chon === c.correctIdx ? ' ok' : ' no'}">
              <div class="tv-rv-q">${i + 1}. ${tdEsc(c.question)}</div>
              <div class="tv-rv-a">
                <span class="tv-rv-dung"><i class="fa-solid fa-check"></i> ${tdEsc(c.options[c.correctIdx].text)}</span>
                ${chon !== c.correctIdx
                  ? `<span class="tv-rv-sai"><i class="fa-solid fa-xmark"></i> ${chon == null || chon < 0 ? 'Bỏ trống' : tdEsc(c.options[chon].text)}</span>` : ''}
              </div></div>`;
          }).join('')}
        </div>
        <div class="tv-quiz-actions">
          <button class="btn btn-primary" onclick="window.app.luyBatDau('${ns}')"><i class="fa-solid fa-rotate-right"></i> Làm lượt mới</button>
          <button class="btn" onclick="window.app.luyThoat('${ns}')">Xong</button>
        </div>
      </div>`;
    return;
  }
  const i = q.idx;
  const c = q.questions[i];
  el.innerHTML = `
    <div class="tv-quiz">
      <div class="tv-quiz-head">
        <span class="dd-vocab-count">Câu ${i + 1} / ${q.questions.length}</span>
        <button class="btn btn-sm" onclick="window.app.luyThoat('${ns}')">Thoát</button>
      </div>
      <div class="tw-bar"><i style="width:${((i + 1) / q.questions.length) * 100}%"></i></div>
      <div class="tv-quiz-card">
        ${c.prompt ? `<div class="tv-quiz-prompt font-tc">${tdEsc(c.prompt)}</div>` : ''}
        <div class="tv-quiz-q">${tdEsc(c.question)}</div>
        <div class="tv-quiz-opts">
          ${c.options.map((o, k) => `
            <button class="tv-opt${q.answers[i] === k ? ' picked' : ''}" onclick="window.app.luyChon('${ns}',${k})">
              <span class="tv-opt-key">${'ABCD'[k]}</span><span class="tv-opt-text font-tc">${tdEsc(o.text)}</span>
            </button>`).join('')}
        </div>
      </div>
      <div class="tv-quiz-nav">
        <button class="btn" onclick="window.app.luyQNav('${ns}',-1)" ${i === 0 ? 'disabled' : ''}>Câu trước</button>
        ${i === q.questions.length - 1
          ? `<button class="btn btn-primary" onclick="window.app.luyNop('${ns}')">Nộp bài</button>`
          : `<button class="btn btn-primary" onclick="window.app.luyQNav('${ns}',1)">Câu sau</button>`}
      </div>
    </div>`;
}

function luyBatDau(ns) {
  const s = LUY_STATE[ns]();
  const qs = _luySinhDe(ns);
  s.quiz = qs && qs.length
    ? { questions: qs, answers: new Array(qs.length).fill(null), idx: 0, phase: 'doing', batDau: Date.now() }
    : null;
  LUY_VE[ns]();
}
function luyChon(ns, k) {
  const q = LUY_STATE[ns]().quiz;
  if (!q || q.phase !== 'doing') return;
  q.answers[q.idx] = k;
  LUY_VE[ns]();
}
function luyQNav(ns, d) {
  const q = LUY_STATE[ns]().quiz;
  if (!q) return;
  q.idx = Math.min(Math.max(0, q.idx + d), q.questions.length - 1);
  LUY_VE[ns]();
}
function luyThoat(ns) { LUY_STATE[ns]().quiz = null; LUY_VE[ns](); }

async function luyNop(ns) {
  const q = LUY_STATE[ns]().quiz;
  if (!q || q.phase === 'done') return;
  let dung = 0;
  q.questions.forEach((c, i) => { if (q.answers[i] === c.correctIdx) dung++; });
  q.correct = dung;
  q.scorePercent = Math.round((dung / q.questions.length) * 100 * 100) / 100;
  q.phase = 'done';
  LUY_VE[ns]();
  // Gửi lên server để giáo viên xem lại và nhận xét được (cùng đường với bài tập giáo trình).
  // `lesson_id`: 'kho:tra-cuu' / 'kho:so-tay' — 12 ký tự, vừa VARCHAR(32), không cần migration.
  if (state.isLoggedIn) {
    try {
      await api.post('/exercise/submit', {
        lesson_id: ns === 'st' ? 'kho:so-tay' : 'kho:tra-cuu',
        total_questions: q.questions.length,
        correct_answers: dung,
        time_seconds: Math.round((Date.now() - q.batDau) / 1000),
        details: { questions: q.questions, answers: q.answers },
      });
    } catch (e) {
      console.warn('Không gửi được kết quả trắc nghiệm kho từ vựng:', e);
    }
  }
}

// ============================================================
// KHAI BÁO RA NGOÀI cho `main.js` (4.40)
// ============================================================
// `render` — hàm vẽ từng trang, `navigate()` gọi sau khi await import xong.
// `handlers` — mọi hàm bị HTML gọi qua `window.app.xxx()`; main.js `Object.assign` vào
//   `window.app` ngay sau khi nạp module. Thiếu một tên ở đây là nút bấm im lặng không chạy,
//   lỗi chỉ hiện ở console (đúng cái bẫy quy ước 4.4 đã dặn).

export const render = {
  vocabulary: renderVocabulary,
  dictionary: renderDictionary,
  notebook: renderNotebook,
  radicals: renderRadicals,
};

export const handlers = {
  dictPageSearch, tdMoTu, tdxVietLai, tdLuuTu,
  kvTim, kvBo, kvCap, kvLoai, kvXoaLoc, kvTrang,
  stTim, stLoc, stSap, stXuatCsv,
  btMo, btVe, btTim, btNet,
  luyTab, luyLat, luyNav, luyXao, luyBatDau, luyChon, luyQNav, luyThoat, luyNop,
};

/** Ô tìm ở thanh header dùng lại đúng bộ tìm kiếm này (main.js nạp module rồi mới gọi). */
export { dictTimKiem, dictResultItemHtml };
/** Phím tắt flashcard của Kho từ vựng / Sổ tay — main.js gọi khi đang ở đúng hai trang đó. */
export { LUY_STATE };
