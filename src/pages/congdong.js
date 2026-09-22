// ============================================================
// TRANG: CỘNG ĐỒNG — Thảo luận & Cẩm nang · Vlog · Tin tức · Học bổng (4.39)
// ============================================================
// Module NẠP ĐỘNG (4.40). Khu này dính ra ngoài ít nhất trong ba khu được tách: chỉ `cdState`
// bị `PAGE_PARAMS` của main.js đụng tới, và state đó nằm ngay trong module — main.js đọc qua
// cầu nối (xem `dangKyTrang()` ở cuối file).

import { app } from '../core/app.js';
import { state, cdState } from '../core/state.js';
import {
  tdEsc, tdNhay, toast, twPlayEnter, openDialog, closeDialog, khungXuongTrang as ltSkeleton,
} from '../core/ui.js';
import { tdKhongDau } from '../data/tudien-kho.js';
import api from '../api/client.js';

// --- cầu nối tới phần còn nằm trong main.js ---
const navigate = (...a) => app.navigate(...a);
const updateUrl = (...a) => app.updateUrl(...a);
const openAuth = (...a) => app.openAuth(...a);

// ============================================================
// KHU CỘNG ĐỒNG — 4 trang (2026-09-08)
// ============================================================
// Thảo luận + Blog & Cẩm nang (GỘP một chức năng theo yêu cầu chủ dự án) · Đăng Vlog ·
// Tin tức Đài Loan · Học bổng & du học. Backend: server/routes/congdong.js. Xem CLAUDE.md 4.39.
//
// Bốn loại nội dung dùng CHUNG một bộ máy bài viết, nên thẻ bài, chi tiết bài, bình luận,
// thích, báo cáo chỉ viết MỘT lần ở đây — đừng nhân bản renderer cho từng loại.
//
// KIỂM DUYỆT: cho đăng ngay, bộ lọc `server/utils/loc-tu.js` chặn từ tục tĩu/lăng mạ/miệt thị
// và gắn cờ những từ mơ hồ. Toàn bộ phán quyết nằm ở SERVER — client chỉ hiện lại lời từ chối.

const CD_CHU_DE = [
  { id: 'du-hoc', ten: 'Du học', icon: 'fa-plane-departure' },
  { id: 'doi-song', ten: 'Đời sống', icon: 'fa-mug-hot' },
  { id: 'hoc-tieng', ten: 'Học tiếng', icon: 'fa-language' },
  { id: 'viec-lam', ten: 'Việc làm', icon: 'fa-briefcase' },
  { id: 'tocfl-hsk', ten: 'TOCFL & HSK', icon: 'fa-file-pen' },
  { id: 'khac', ten: 'Khác', icon: 'fa-ellipsis' },
];
const CD_TEN_CHU_DE = Object.fromEntries(CD_CHU_DE.map((c) => [c.id, c.ten]));

/** Trang nào hiện loại bài nào. `mac_dinh` là loại mà nút "Viết bài" của trang đó chọn sẵn. */
const CD_TRANG = {
  'community-forum': { loai: ['thao-luan', 'bai-viet'], macDinh: 'thao-luan', ten: 'Thảo luận & Cẩm nang' },
  blog: { loai: ['bai-viet', 'thao-luan'], macDinh: 'bai-viet', ten: 'Blog & Cẩm nang' },
  'community-vlog': { loai: ['vlog'], macDinh: 'vlog', ten: 'Vlog cộng đồng' },
  'community-news': { loai: ['tin-tuc'], macDinh: 'tin-tuc', ten: 'Tin tức Đài Loan' },
};

// `cdState` nằm ở `core/state.js` — `PAGE_PARAMS` của main.js đọc/ghi nó TRƯỚC khi
// module này được nạp, nên nó không thể nằm trong đây (xem 4.40).

const cdLaNhanSu = () => !!(state.user && (state.user.is_admin || state.user.role === 'admin' || state.user.role === 'teacher'));

// ------------------------------------------------------------------ tiện ích

/** "3 phút trước" / "hôm qua" / "12/08". Ngày cũ thì hiện ngày cho gọn. */
function cdLucNao(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  const giay = (Date.now() - d.getTime()) / 1000;
  if (giay < 60) return 'vừa xong';
  if (giay < 3600) return `${Math.floor(giay / 60)} phút trước`;
  if (giay < 86400) return `${Math.floor(giay / 3600)} giờ trước`;
  if (giay < 172800) return 'hôm qua';
  if (giay < 86400 * 7) return `${Math.floor(giay / 86400)} ngày trước`;
  return d.toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function cdAvatarHtml(b) {
  if (b.avatar_url) return `<img class="cd-ava" src="${tdEsc(b.avatar_url)}" alt="">`;
  const chu = (b.avatar_letter || (b.tac_gia || '?')[0] || '?').toUpperCase();
  return `<span class="cd-ava" style="background:${tdEsc(b.avatar_color || '#38899E')}">${tdEsc(chu)}</span>`;
}

function cdNhanVaiTro(vt) {
  if (vt === 'admin') return '<span class="cd-vt is-ad">Quản trị</span>';
  if (vt === 'teacher') return '<span class="cd-vt is-gv">Giáo viên</span>';
  return '';
}

/**
 * Khung nhúng video. CHỈ dựng từ (nguồn, id) mà SERVER đã bóc và kiểm — không bao giờ đút
 * thẳng chuỗi người dùng nhập vào `src` của iframe.
 */
function cdVideoHtml(b) {
  if (!b.video_nguon) return '';
  const id = encodeURIComponent(b.video_id || '');
  let src = '';
  if (b.video_nguon === 'youtube') src = `https://www.youtube-nocookie.com/embed/${id}`;
  else if (b.video_nguon === 'tiktok') src = `https://www.tiktok.com/embed/v2/${id}`;
  else if (b.video_nguon === 'instagram') src = `https://www.instagram.com/p/${id}/embed`;
  else if (b.video_nguon === 'facebook') {
    src = `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(b.video_url || '')}&show_text=false`;
  }
  if (!src) return '';
  return `<div class="cd-video"><iframe src="${src}" title="${tdEsc(b.tieu_de)}" loading="lazy"
    allow="accelerometer; clipboard-write; encrypted-media; picture-in-picture; web-share"
    referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe></div>`;
}

/** Ảnh xem trước của vlog khi chưa bấm vào — chỉ YouTube có ảnh đoán được từ id. */
const cdAnhVideo = (b) => (b.video_nguon === 'youtube' && b.video_id
  ? `https://i.ytimg.com/vi/${encodeURIComponent(b.video_id)}/hqdefault.jpg` : '');

/**
 * Nội dung bài do NGƯỜI DÙNG nhập — LUÔN escape rồi mới đổi xuống dòng thành <br>.
 * ⚠️ Tuyệt đối KHÔNG gán thẳng chuỗi người dùng vào innerHTML: cả app dựng giao diện bằng
 *    innerHTML (quy ước 4.3), nên một thẻ <script> hay onerror= trong bài là chạy được ngay.
 *    Bài của admin (blog cũ) có HTML thật thì mới cho phép — phân biệt bằng `chinh_thuc`.
 */
function cdNoiDungHtml(b) {
  const raw = b.noi_dung || b.tom_tat || '';
  if (b.chinh_thuc && /<[a-z][\s\S]*>/i.test(raw)) return raw;     // bài biên tập, HTML tin được
  return tdEsc(raw).replace(/\n/g, '<br>');
}

// ------------------------------------------------------------------ nạp dữ liệu

function cdNap(page) {
  const cfg = CD_TRANG[page];
  const el = document.getElementById('page-content');
  if (!el) return;
  if (!cdState.ds) el.innerHTML = ltSkeleton();
  const loai = cdState.tab !== 'all' && cfg.loai.includes(cdState.tab) ? [cdState.tab] : cfg.loai;
  api.cdDanhSach({
    loai: loai.join(','),
    ...(cdState.chuDe !== 'all' ? { chu_de: cdState.chuDe } : {}),
    ...(cdState.tim ? { tim: cdState.tim } : {}),
    trang: cdState.trang, moi_trang: 20,
  }).then((d) => {
    if (state.currentPage !== page) return;
    cdState.ds = d.bai; cdState.tong = d.tong;
    const now = document.getElementById('page-content');
    if (now) { cdVeDanhSach(now, page); twPlayEnter(now, 'tw-entering'); }
  }).catch(() => {
    const now = document.getElementById('page-content');
    if (now && state.currentPage === page) {
      now.innerHTML = `<div class="tv-empty"><i class="fa-solid fa-triangle-exclamation"></i>
        <p>Không tải được nội dung cộng đồng.</p>
        <button class="btn btn-primary" onclick="window.app.navigate('${page}')">Thử lại</button></div>`;
    }
  });
}

function cdMoBai(id) {
  cdState.moBai = id;
  cdState.chiTiet = null;
  updateUrl({ push: true });
  const el = document.getElementById('page-content');
  if (el) el.innerHTML = ltSkeleton();
  api.cdChiTiet(id).then((d) => {
    if (String(cdState.moBai) !== String(id)) return;
    cdState.chiTiet = d.bai; cdState.binhLuan = d.binh_luan || [];
    const now = document.getElementById('page-content');
    if (now) { cdVeChiTiet(now); twPlayEnter(now, 'tw-entering'); }
  }).catch(() => {
    const now = document.getElementById('page-content');
    if (now) {
      now.innerHTML = `<div class="tv-empty"><i class="fa-solid fa-file-circle-xmark"></i>
        <p>Bài viết không còn nữa hoặc đã bị ẩn.</p>
        <button class="btn btn-primary" onclick="window.app.cdDongBai()">Quay lại danh sách</button></div>`;
    }
  });
}

function cdDongBai() {
  cdState.moBai = null; cdState.chiTiet = null; cdState.traLoi = null;
  updateUrl({ push: true });
  cdVeDanhSach(document.getElementById('page-content'), state.currentPage);
}

// ------------------------------------------------------------------ renderer chính

function renderCommunityForum(el) { cdVao(el, 'community-forum'); }
function renderCommunityVlog(el) { cdVao(el, 'community-vlog'); }
function renderCommunityNews(el) { cdVao(el, 'community-news'); }
function renderBlog(el) { cdVao(el, 'blog'); }

function cdVao(el, page) {
  if (cdState.moBai) {
    if (cdState.chiTiet && String(cdState.chiTiet.id) === String(cdState.moBai)) return cdVeChiTiet(el);
    return cdMoBai(cdState.moBai);
  }
  cdState.ds = null;
  cdNap(page);
}

function cdVeDanhSach(el, page) {
  const cfg = CD_TRANG[page] || CD_TRANG['community-forum'];
  const ds = cdState.ds || [];
  const soTrang = Math.max(1, Math.ceil(cdState.tong / 20));
  const laVlog = page === 'community-vlog';
  const laTin = page === 'community-news';
  const coViet = state.isLoggedIn && (!laTin || cdLaNhanSu());

  el.innerHTML = `
    <div class="cd-page">
      ${cdHeroHtml(page, cfg)}
      <div class="cd-thanh">
        <div class="tv-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input id="cd-tim" type="search" placeholder="Tìm trong ${tdEsc(cfg.ten.toLowerCase())}…"
                 value="${tdEsc(cdState.tim)}" oninput="window.app.cdTim(this.value)" autocomplete="off">
          ${cdState.tim ? '<button class="tv-search-clear" onclick="window.app.cdTim(\'\')"><i class="fa-solid fa-xmark"></i></button>' : ''}
        </div>
        ${coViet ? `<button class="btn btn-primary" onclick="window.app.cdMoSoan('${cfg.macDinh}')">
          <i class="fa-solid fa-pen-to-square"></i> ${laVlog ? 'Đăng vlog' : laTin ? 'Đăng tin' : 'Viết bài'}</button>` : ''}
        ${cdLaNhanSu() ? `<button class="btn btn-outline" onclick="window.app.cdMoKiemDuyet()">
          <i class="fa-solid fa-shield-halved"></i> Kiểm duyệt</button>` : ''}
      </div>

      ${cfg.loai.length > 1 ? `
        <div class="kv-bo-tabs">
          <button class="lesson-tab${cdState.tab === 'all' ? ' active' : ''}" onclick="window.app.cdTab('all')">Tất cả</button>
          <button class="lesson-tab${cdState.tab === 'thao-luan' ? ' active' : ''}" onclick="window.app.cdTab('thao-luan')">Thảo luận</button>
          <button class="lesson-tab${cdState.tab === 'bai-viet' ? ' active' : ''}" onclick="window.app.cdTab('bai-viet')">Bài viết &amp; Cẩm nang</button>
        </div>` : ''}

      <div class="cd-chude">
        <button class="cd-cd${cdState.chuDe === 'all' ? ' active' : ''}" onclick="window.app.cdChuDe('all')">Mọi chủ đề</button>
        ${CD_CHU_DE.map((c) => `<button class="cd-cd${cdState.chuDe === c.id ? ' active' : ''}"
          onclick="window.app.cdChuDe('${c.id}')"><i class="fa-solid ${c.icon}"></i> ${c.ten}</button>`).join('')}
      </div>

      ${!state.isLoggedIn ? `<p class="tv-note"><i class="fa-solid fa-circle-info"></i>
        <span>Bạn đang xem với tư cách khách — <a href="javascript:void(0)" onclick="window.app.openAuth()">đăng nhập</a>
        để đăng bài, bình luận và thích.</span></p>` : ''}

      ${ds.length ? (laVlog
        ? `<div class="cd-vlog-grid">${ds.map(cdTheVlogHtml).join('')}</div>`
        : `<div class="cd-ds">${ds.map(cdTheBaiHtml).join('')}</div>`)
        : `<div class="tv-empty"><i class="fa-solid fa-comment-dots"></i>
             <p>${cdState.tim || cdState.chuDe !== 'all' ? 'Không có bài nào khớp bộ lọc.' : 'Chưa có bài nào ở đây. Bạn mở hàng nhé!'}</p>
             ${coViet ? `<button class="btn btn-primary" onclick="window.app.cdMoSoan('${cfg.macDinh}')">Viết bài đầu tiên</button>` : ''}
           </div>`}

      ${soTrang > 1 ? `<div class="tv-pager">
        ${Array.from({ length: soTrang }, (_, i) => i + 1).slice(
          Math.max(0, cdState.trang - 3), Math.max(0, cdState.trang - 3) + 5).map((n) => `
          <button class="tv-pg${n === cdState.trang ? ' active' : ''}" onclick="window.app.cdTrang(${n})">${n}</button>`).join('')}
      </div>` : ''}
    </div>`;
}

function cdHeroHtml(page, cfg) {
  const mo = {
    'community-forum': 'Hỏi đáp, chia sẻ kinh nghiệm và đọc cẩm nang do chính cộng đồng viết.',
    blog: 'Bài viết dài, cẩm nang và kinh nghiệm — của ban biên tập lẫn của học viên.',
    'community-vlog': 'Học viên chia sẻ vlog về cuộc sống, học tập và làm việc ở Đài Loan.',
    'community-news': 'Tin đáng chú ý về Đài Loan, do giáo viên và ban quản trị tổng hợp bằng tiếng Việt.',
  }[page];
  const chu = { 'community-forum': '談', blog: '文', 'community-vlog': '影', 'community-news': '聞' }[page];
  return `
    <div class="tv-hero cd-hero">
      <div class="tv-hero-text">
        <span class="tv-hero-badge"><i class="fa-solid fa-users"></i> Cộng đồng Tẻn</span>
        <h1>${tdEsc(cfg.ten)}</h1>
        <p>${mo}</p>
      </div>
      <div class="tv-hero-mark font-tc" aria-hidden="true">${chu}</div>
    </div>`;
}

function cdTheBaiHtml(b) {
  return `
    <article class="cd-the${b.ghim ? ' is-ghim' : ''}" onclick="window.app.cdMoBai(${b.id})">
      ${b.anh_bia ? `<div class="cd-the-anh"><img src="${tdEsc(b.anh_bia)}" alt="" loading="lazy"></div>`
        : `<div class="cd-the-emoji">${tdEsc(b.emoji || (b.loai === 'tin-tuc' ? '📰' : b.loai === 'bai-viet' ? '📝' : '💬'))}</div>`}
      <div class="cd-the-noi">
        <div class="cd-the-chip">
          ${b.ghim ? '<span class="cd-chip is-ghim"><i class="fa-solid fa-thumbtack"></i> Ghim</span>' : ''}
          ${b.chinh_thuc ? '<span class="cd-chip is-ct">Chính thức</span>' : ''}
          ${b.chu_de ? `<span class="cd-chip">${tdEsc(CD_TEN_CHU_DE[b.chu_de] || b.chu_de)}</span>` : ''}
          <span class="cd-chip is-loai">${b.loai === 'thao-luan' ? 'Thảo luận' : b.loai === 'tin-tuc' ? 'Tin tức' : 'Bài viết'}</span>
        </div>
        <h3 class="cd-the-ten">${tdEsc(b.tieu_de)}</h3>
        ${b.tom_tat ? `<p class="cd-the-tom">${tdEsc(b.tom_tat)}</p>` : ''}
        <div class="cd-the-chan">
          <span class="cd-tacgia">${cdAvatarHtml(b)}<span>${tdEsc(b.tac_gia || 'Ban biên tập')}</span>${cdNhanVaiTro(b.vai_tro)}</span>
          <span class="cd-so"><i class="fa-regular fa-clock"></i> ${cdLucNao(b.created_at)}</span>
          <span class="cd-so"><i class="fa-regular fa-heart"></i> ${b.so_thich}</span>
          <span class="cd-so"><i class="fa-regular fa-comment"></i> ${b.so_binh_luan}</span>
        </div>
      </div>
    </article>`;
}

function cdTheVlogHtml(b) {
  const anh = cdAnhVideo(b);
  return `
    <article class="cd-vlog" onclick="window.app.cdMoBai(${b.id})">
      <div class="cd-vlog-anh">
        ${anh ? `<img src="${anh}" alt="" loading="lazy">` : `<span class="cd-vlog-icon"><i class="fa-solid fa-play"></i></span>`}
        <span class="cd-vlog-nguon">${tdEsc(b.video_nguon || '')}</span>
      </div>
      <div class="cd-vlog-noi">
        <h3>${tdEsc(b.tieu_de)}</h3>
        <div class="cd-the-chan">
          <span class="cd-tacgia">${cdAvatarHtml(b)}<span>${tdEsc(b.tac_gia || '')}</span></span>
          <span class="cd-so"><i class="fa-regular fa-heart"></i> ${b.so_thich}</span>
          <span class="cd-so"><i class="fa-regular fa-comment"></i> ${b.so_binh_luan}</span>
        </div>
      </div>
    </article>`;
}

// ------------------------------------------------------------------ chi tiết bài + bình luận

function cdVeChiTiet(el) {
  const b = cdState.chiTiet;
  if (!b) return;
  const cuaToi = state.isLoggedIn && b.user_id && api.user && b.user_id === api.user.id;
  const suaDuoc = cuaToi || cdLaNhanSu();
  el.innerHTML = `
    <div class="cd-page cd-doc">
      <button class="btn btn-sm btn-outline cd-back" onclick="window.app.cdDongBai()">
        <i class="fa-solid fa-arrow-left"></i> Quay lại</button>

      <article class="cd-bai">
        <div class="cd-the-chip">
          ${b.chinh_thuc ? '<span class="cd-chip is-ct">Chính thức</span>' : ''}
          ${b.chu_de ? `<span class="cd-chip">${tdEsc(CD_TEN_CHU_DE[b.chu_de] || b.chu_de)}</span>` : ''}
          <span class="cd-chip is-loai">${b.loai === 'thao-luan' ? 'Thảo luận' : b.loai === 'vlog' ? 'Vlog' : b.loai === 'tin-tuc' ? 'Tin tức' : 'Bài viết'}</span>
        </div>
        <h1 class="cd-bai-ten">${tdEsc(b.tieu_de)}</h1>
        <div class="cd-bai-meta">
          <span class="cd-tacgia">${cdAvatarHtml(b)}<span>${tdEsc(b.tac_gia || 'Ban biên tập')}</span>${cdNhanVaiTro(b.vai_tro)}</span>
          <span class="cd-so"><i class="fa-regular fa-clock"></i> ${cdLucNao(b.created_at)}</span>
          <span class="cd-so"><i class="fa-regular fa-eye"></i> ${b.so_xem} lượt xem</span>
        </div>

        ${cdVideoHtml(b)}
        ${b.anh_bia && !b.video_nguon ? `<img class="cd-bai-anh" src="${tdEsc(b.anh_bia)}" alt="">` : ''}
        <div class="cd-bai-noi">${cdNoiDungHtml(b)}</div>
        ${b.video_url ? `<p class="cd-nguon-video"><i class="fa-solid fa-link"></i>
          <span>Video gốc: <a href="${tdEsc(b.video_url)}" target="_blank" rel="noopener nofollow">${tdEsc(b.video_url)}</a></span></p>` : ''}

        <div class="cd-hanh-dong">
          <button class="cd-nut${b.da_thich ? ' is-tim' : ''}" onclick="window.app.cdThich(${b.id})">
            <i class="fa-${b.da_thich ? 'solid' : 'regular'} fa-heart"></i> <span>${b.so_thich}</span></button>
          <button class="cd-nut" onclick="document.getElementById('cd-o-binh-luan')?.focus()">
            <i class="fa-regular fa-comment"></i> <span>${b.so_binh_luan}</span></button>
          <button class="cd-nut" onclick="window.app.cdBaoCao(${b.id}, null)">
            <i class="fa-regular fa-flag"></i> <span>Báo cáo</span></button>
          ${suaDuoc ? `<button class="cd-nut" onclick="window.app.cdMoSoan('${b.loai}', ${b.id})">
            <i class="fa-solid fa-pen"></i> <span>Sửa</span></button>
          <button class="cd-nut is-xoa" onclick="window.app.cdXoaBai(${b.id})">
            <i class="fa-regular fa-trash-can"></i> <span>Xoá</span></button>` : ''}
        </div>
      </article>

      <section class="cd-bl">
        <h3><i class="fa-regular fa-comments"></i> Bình luận <span class="tdx-dem">${cdState.binhLuan.length}</span></h3>
        ${state.isLoggedIn ? `
          <div class="cd-bl-soan">
            <textarea id="cd-o-binh-luan" rows="3" maxlength="2000"
              placeholder="Viết bình luận… (giữ lời lẽ tử tế, ở đây có cả học viên nhỏ tuổi)"></textarea>
            <div class="cd-bl-soan-chan">
              <span id="cd-bl-loi" class="cd-loi"></span>
              <button class="btn btn-primary btn-sm" onclick="window.app.cdGuiBinhLuan(${b.id})">Gửi</button>
            </div>
          </div>`
        : `<p class="tv-note"><i class="fa-solid fa-circle-info"></i>
            <span><a href="javascript:void(0)" onclick="window.app.openAuth()">Đăng nhập</a> để bình luận.</span></p>`}
        ${cdBinhLuanHtml(b.id)}
      </section>
    </div>`;
}

/** Bình luận lồng ĐÚNG một cấp — sâu hơn thì trên màn 390px không còn chỗ thụt lề. */
function cdBinhLuanHtml(postId) {
  const ds = cdState.binhLuan || [];
  if (!ds.length) return '<p class="lt-ghi-chu">Chưa có bình luận nào. Bạn mở lời trước nhé.</p>';
  const goc = ds.filter((c) => !c.parent_id);
  const con = new Map();
  for (const c of ds.filter((x) => x.parent_id)) {
    if (!con.has(c.parent_id)) con.set(c.parent_id, []);
    con.get(c.parent_id).push(c);
  }
  const mot = (c, laCon) => {
    const cuaToi = api.user && c.user_id === api.user.id;
    return `
      <div class="cd-bl-o${laCon ? ' is-con' : ''}">
        ${cdAvatarHtml(c)}
        <div class="cd-bl-noi">
          <div class="cd-bl-dau">
            <strong>${tdEsc(c.tac_gia)}</strong>${cdNhanVaiTro(c.vai_tro)}
            <span class="cd-bl-luc">${cdLucNao(c.created_at)}</span>
          </div>
          <div class="cd-bl-chu">${tdEsc(c.noi_dung).replace(/\n/g, '<br>')}</div>
          <div class="cd-bl-nut">
            ${!laCon && state.isLoggedIn ? `<button onclick="window.app.cdTraLoi(${c.id})">Trả lời</button>` : ''}
            ${state.isLoggedIn ? `<button onclick="window.app.cdBaoCao(null, ${c.id})">Báo cáo</button>` : ''}
            ${cuaToi || cdLaNhanSu() ? `<button class="is-xoa" onclick="window.app.cdXoaBinhLuan(${c.id})">Xoá</button>` : ''}
          </div>
          ${cdState.traLoi === c.id ? `
            <div class="cd-bl-soan is-tra-loi">
              <textarea id="cd-o-tra-loi" rows="2" maxlength="2000" placeholder="Trả lời ${tdEsc(c.tac_gia)}…"></textarea>
              <div class="cd-bl-soan-chan">
                <span id="cd-bl-loi-${c.id}" class="cd-loi"></span>
                <button class="btn btn-sm" onclick="window.app.cdTraLoi(null)">Huỷ</button>
                <button class="btn btn-primary btn-sm" onclick="window.app.cdGuiBinhLuan(${postId}, ${c.id})">Gửi</button>
              </div>
            </div>` : ''}
        </div>
      </div>`;
  };
  return `<div class="cd-bl-ds">${goc.map((c) => mot(c, false) + (con.get(c.id) || []).map((x) => mot(x, true)).join('')).join('')}</div>`;
}

// ------------------------------------------------------------------ soạn bài

function cdMoSoan(loai, id) {
  if (!state.isLoggedIn) return openAuth();
  const b = id ? cdState.chiTiet : null;
  cdState.soan = { loai: b ? b.loai : loai, id: id || null };
  const laVlog = cdState.soan.loai === 'vlog';
  openDialog(
    id ? 'Sửa bài' : laVlog ? 'Đăng vlog' : cdState.soan.loai === 'tin-tuc' ? 'Đăng tin tức' : 'Viết bài',
    `<div class="cd-soan">
      ${!id && !laVlog && cdState.soan.loai !== 'tin-tuc' ? `
        <label>Loại bài
          <select id="cd-s-loai">
            <option value="thao-luan"${cdState.soan.loai === 'thao-luan' ? ' selected' : ''}>Thảo luận — hỏi đáp ngắn</option>
            <option value="bai-viet"${cdState.soan.loai === 'bai-viet' ? ' selected' : ''}>Bài viết &amp; Cẩm nang — bài dài</option>
          </select>
        </label>` : ''}
      <label>Tiêu đề <span class="cd-bat-buoc">*</span>
        <input id="cd-s-tieu-de" type="text" maxlength="300" value="${tdEsc(b ? b.tieu_de : '')}"
               placeholder="${laVlog ? 'Một ngày của mình ở Đài Bắc' : 'Nói ngắn gọn bạn muốn hỏi/chia sẻ điều gì'}">
      </label>
      ${laVlog ? `
        <label>Link video <span class="cd-bat-buoc">*</span>
          <input id="cd-s-video" type="url" value="${tdEsc(b ? (b.video_url || '') : '')}"
                 placeholder="https://www.youtube.com/watch?v=…">
        </label>
        <p class="lt-ghi-chu">Nhận link <strong>YouTube · TikTok · Facebook · Instagram Reels</strong>.
          App chỉ nhúng khung của nền tảng, không tải video về máy chủ.</p>` : ''}
      <label>Nội dung ${laVlog ? '' : '<span class="cd-bat-buoc">*</span>'}
        <textarea id="cd-s-noi-dung" rows="${laVlog ? 3 : 9}" maxlength="20000"
          placeholder="${laVlog ? 'Vài dòng giới thiệu video…' : 'Viết chi tiết vào đây…'}">${tdEsc(b ? (b.noi_dung || '') : '')}</textarea>
      </label>
      <label>Chủ đề
        <select id="cd-s-chu-de">
          ${CD_CHU_DE.map((c) => `<option value="${c.id}"${(b ? b.chu_de : 'khac') === c.id ? ' selected' : ''}>${c.ten}</option>`).join('')}
        </select>
      </label>
      <label>Ảnh bìa (không bắt buộc)
        <input id="cd-s-anh" type="url" value="${tdEsc(b ? (b.anh_bia || '') : '')}" placeholder="https://…">
      </label>
      <p class="cd-noi-quy"><i class="fa-solid fa-shield-halved"></i>
        <span>Bài đăng <strong>hiện ngay</strong>, nhưng hệ thống tự chặn từ ngữ tục tĩu, lăng mạ
        và miệt thị. Cộng đồng này có cả học viên nhỏ tuổi — viết như đang nói chuyện với bạn cùng lớp nhé.</span></p>
      <div id="cd-s-loi" class="cd-loi"></div>
    </div>`,
    `<button class="btn" onclick="window.app.closeDialog()">Huỷ</button>
     <button class="btn btn-primary" onclick="window.app.cdGuiBai()">${id ? 'Lưu' : 'Đăng'}</button>`,
  );
}

async function cdGuiBai() {
  const g = (id) => document.getElementById(id);
  const oLoi = g('cd-s-loi');
  const loai = g('cd-s-loai') ? g('cd-s-loai').value : cdState.soan.loai;
  const bai = {
    loai,
    tieu_de: g('cd-s-tieu-de').value.trim(),
    noi_dung: g('cd-s-noi-dung').value.trim(),
    chu_de: g('cd-s-chu-de').value,
    anh_bia: g('cd-s-anh').value.trim(),
    ...(g('cd-s-video') ? { video_url: g('cd-s-video').value.trim() } : {}),
  };
  oLoi.textContent = '';
  try {
    if (cdState.soan.id) await api.cdSuaBai(cdState.soan.id, bai);
    else await api.cdDangBai(bai);
    closeDialog();
    toast(cdState.soan.id ? 'Đã lưu bài.' : 'Đã đăng bài.');
    if (cdState.soan.id) cdMoBai(cdState.soan.id);
    else { cdState.moBai = null; cdState.trang = 1; cdNap(state.currentPage); }
  } catch (e) {
    // Hiện NGUYÊN VĂN lời từ chối của server (nó nêu đúng từ bị bắt) — báo chung chung
    // "nội dung không hợp lệ" thì người viết không biết sửa chỗ nào.
    oLoi.textContent = (e && e.message) || 'Không đăng được bài.';
    oLoi.scrollIntoView({ block: 'nearest' });
  }
}

// ------------------------------------------------------------------ thao tác

async function cdThich(id) {
  if (!state.isLoggedIn) return openAuth();
  try {
    const r = await api.cdThich(id);
    if (cdState.chiTiet && cdState.chiTiet.id === id) {
      cdState.chiTiet.da_thich = r.thich ? 1 : 0;
      cdState.chiTiet.so_thich += r.thich ? 1 : -1;
      cdVeChiTiet(document.getElementById('page-content'));
    }
  } catch { toast('Không ghi được lượt thích.'); }
}

async function cdGuiBinhLuan(postId, parentId) {
  const o = document.getElementById(parentId ? 'cd-o-tra-loi' : 'cd-o-binh-luan');
  const oLoi = document.getElementById(parentId ? `cd-bl-loi-${parentId}` : 'cd-bl-loi');
  if (!o) return;
  const chu = o.value.trim();
  if (chu.length < 2) { if (oLoi) oLoi.textContent = 'Bình luận quá ngắn.'; return; }
  if (oLoi) oLoi.textContent = '';
  try {
    await api.cdBinhLuan(postId, chu, parentId);
    cdState.traLoi = null;
    const d = await api.cdChiTiet(postId);
    cdState.chiTiet = d.bai; cdState.binhLuan = d.binh_luan || [];
    cdVeChiTiet(document.getElementById('page-content'));
    toast('Đã gửi bình luận.');
  } catch (e) {
    if (oLoi) oLoi.textContent = (e && e.message) || 'Không gửi được bình luận.';
  }
}

function cdTraLoi(id) {
  cdState.traLoi = cdState.traLoi === id ? null : id;
  cdVeChiTiet(document.getElementById('page-content'));
  if (cdState.traLoi) document.getElementById('cd-o-tra-loi')?.focus();
}

async function cdXoaBinhLuan(id) {
  if (!confirm('Xoá bình luận này?')) return;
  try {
    await api.cdXoaBinhLuan(id);
    const d = await api.cdChiTiet(cdState.moBai);
    cdState.chiTiet = d.bai; cdState.binhLuan = d.binh_luan || [];
    cdVeChiTiet(document.getElementById('page-content'));
  } catch (e) { toast((e && e.message) || 'Không xoá được.'); }
}

async function cdXoaBai(id) {
  if (!confirm('Xoá hẳn bài này? Bình luận trong bài cũng mất theo.')) return;
  try {
    await api.cdXoaBai(id);
    toast('Đã xoá bài.');
    cdDongBai();
  } catch (e) { toast((e && e.message) || 'Không xoá được.'); }
}

async function cdBaoCao(postId, commentId) {
  if (!state.isLoggedIn) return openAuth();
  const lyDo = prompt('Bạn thấy nội dung này có vấn đề gì? (không bắt buộc)') ;
  if (lyDo === null) return;
  try {
    const r = await api.cdBaoCao({ post_id: postId, comment_id: commentId, ly_do: lyDo });
    toast(r.message || 'Đã gửi báo cáo.');
  } catch { toast('Không gửi được báo cáo.'); }
}

// ------------------------------------------------------------------ bộ lọc / phân trang

let _cdTimer = null;
function cdTim(v) {
  cdState.tim = v; cdState.trang = 1;
  clearTimeout(_cdTimer);
  _cdTimer = setTimeout(() => {
    updateUrl();
    cdNap(state.currentPage);
    const o = document.getElementById('cd-tim');
    if (o && document.activeElement !== o) { o.focus(); o.setSelectionRange(o.value.length, o.value.length); }
  }, 260);
}
function cdTab(t) { cdState.tab = t; cdState.trang = 1; updateUrl(); cdNap(state.currentPage); }
function cdChuDe(c) { cdState.chuDe = c; cdState.trang = 1; updateUrl(); cdNap(state.currentPage); }
function cdTrang(n) {
  cdState.trang = n; updateUrl();
  cdNap(state.currentPage);
  document.getElementById('page-content')?.scrollIntoView({ block: 'start', behavior: 'smooth' });
}

// ------------------------------------------------------------------ kiểm duyệt (nhân sự)

async function cdMoKiemDuyet() {
  if (!cdLaNhanSu()) return;
  let d;
  try { d = await api.cdKiemDuyet(); } catch { return toast('Không tải được danh sách kiểm duyệt.'); }
  const dong = (ten, ds, veHtml) => `
    <h4 class="cd-kd-h">${ten} <span class="tdx-dem">${ds.length}</span></h4>
    ${ds.length ? `<div class="cd-kd-ds">${ds.map(veHtml).join('')}</div>`
      : '<p class="lt-ghi-chu">Không có mục nào.</p>'}`;
  openDialog('Kiểm duyệt cộng đồng',
    `<div class="cd-kd">
      ${dong('Bài bị bộ lọc gắn cờ', d.bai_gan_co, (b) => `
        <div class="cd-kd-o">
          <div><strong>${tdEsc(b.tieu_de)}</strong>
            <em>${tdEsc(b.tac_gia || '—')} · ${cdLucNao(b.created_at)} · từ bị bắt: ${tdEsc(b.ly_do_co || '')}</em></div>
          <div class="cd-kd-nut">
            <button class="btn btn-sm" onclick="window.app.cdDuyet(${b.id},'bo-co')">Không sao</button>
            <button class="btn btn-sm btn-outline" onclick="window.app.cdDuyet(${b.id},'${b.trang_thai === 'an' ? 'hien' : 'an'}')">
              ${b.trang_thai === 'an' ? 'Hiện lại' : 'Ẩn bài'}</button>
          </div>
        </div>`)}
      ${dong('Bình luận bị gắn cờ', d.binh_luan_gan_co, (c) => `
        <div class="cd-kd-o">
          <div><strong>${tdEsc(String(c.noi_dung).slice(0, 90))}</strong>
            <em>${tdEsc(c.tac_gia)} · ${cdLucNao(c.created_at)}</em></div>
          <div class="cd-kd-nut">
            <button class="btn btn-sm" onclick="window.app.cdDuyetBl(${c.id},'hien')">Không sao</button>
            <button class="btn btn-sm btn-outline" onclick="window.app.cdDuyetBl(${c.id},'an')">Ẩn</button>
          </div>
        </div>`)}
      ${dong('Người dùng báo cáo', d.bao_cao, (r) => `
        <div class="cd-kd-o">
          <div><strong>${tdEsc(r.tieu_de || String(r.binh_luan || '').slice(0, 90))}</strong>
            <em>${tdEsc(r.nguoi_bao)} báo: ${tdEsc(r.ly_do || 'không ghi lý do')} · ${cdLucNao(r.created_at)}</em></div>
          <div class="cd-kd-nut">
            ${r.post_id ? `<button class="btn btn-sm btn-outline" onclick="window.app.cdDuyet(${r.post_id},'an')">Ẩn bài</button>
              <button class="btn btn-sm" onclick="window.app.cdDuyet(${r.post_id},'bo-co')">Bỏ qua</button>`
              : `<button class="btn btn-sm btn-outline" onclick="window.app.cdDuyetBl(${r.comment_id},'an')">Ẩn bình luận</button>
              <button class="btn btn-sm" onclick="window.app.cdDuyetBl(${r.comment_id},'hien')">Bỏ qua</button>`}
          </div>
        </div>`)}
    </div>`,
    '<button class="btn" onclick="window.app.closeDialog()">Đóng</button>');
}

async function cdDuyet(id, hanhDong) {
  try {
    await api.cdDuyetBai(id, hanhDong === 'bo-co' ? { bo_co: 1 } : { trang_thai: hanhDong });
    toast('Đã xử lý.');
    cdMoKiemDuyet();
  } catch { toast('Không cập nhật được.'); }
}
async function cdDuyetBl(id, tt) {
  try { await api.cdDuyetBinhLuan(id, { trang_thai: tt }); toast('Đã xử lý.'); cdMoKiemDuyet(); }
  catch { toast('Không cập nhật được.'); }
}

// ============================================================
// HỌC BỔNG, DU HỌC — dữ liệu CÓ CẤU TRÚC, không phải bài viết
// ============================================================
// ⚠️ Hạn nộp và mức trợ cấp ĐỔI MỖI NĂM. Trang này ghi hạn đã hết là gây hại thật cho người
//    đọc (lỡ kỳ nộp hồ sơ), nên mỗi mục LUÔN hiện mốc "cập nhật lần cuối" và nút tới trang
//    chính thức. Ô nào chưa ai điền thì nói thẳng "chưa cập nhật", KHÔNG bịa số cho đẹp bảng.

const HB_CAP_HOC = [
  { id: 'tieng', ten: 'Học tiếng' }, { id: 'dai-hoc', ten: 'Đại học' },
  { id: 'thac-si', ten: 'Thạc sĩ' }, { id: 'tien-si', ten: 'Tiến sĩ' },
];
const HB_TEN_CAP = Object.fromEntries(HB_CAP_HOC.map((c) => [c.id, c.ten]));
const hbState = { cap: 'all', tim: '' };

function renderCommunityScholarship(el) {
  if (cdState.hocBong) return _hbVe(el);
  el.innerHTML = ltSkeleton();
  api.cdHocBong().then((d) => {
    if (state.currentPage !== 'community-scholarship') return;
    cdState.hocBong = d.hoc_bong || [];
    const now = document.getElementById('page-content');
    if (now) { _hbVe(now); twPlayEnter(now, 'tw-entering'); }
  }).catch(() => {
    const now = document.getElementById('page-content');
    if (now) {
      now.innerHTML = `<div class="tv-empty"><i class="fa-solid fa-triangle-exclamation"></i>
        <p>Không tải được danh sách học bổng.</p>
        <button class="btn btn-primary" onclick="window.app.navigate('community-scholarship')">Thử lại</button></div>`;
    }
  });
}

function _hbLoc() {
  let ds = cdState.hocBong || [];
  if (hbState.cap !== 'all') ds = ds.filter((h) => String(h.cap_hoc || '').split(',').includes(hbState.cap));
  const q = hbState.tim.trim().toLowerCase();
  if (q) {
    const k = tdKhongDau(q);
    ds = ds.filter((h) => tdKhongDau(`${h.ten} ${h.don_vi} ${h.mo_ta} ${h.ten_goc}`).includes(k));
  }
  return ds;
}

function _hbVe(el) {
  const ds = _hbLoc();
  const nhanSu = cdLaNhanSu();
  el.innerHTML = `
    <div class="cd-page">
      <div class="tv-hero cd-hero">
        <div class="tv-hero-text">
          <span class="tv-hero-badge"><i class="fa-solid fa-plane-departure"></i> Du học Đài Loan</span>
          <h1>Học bổng &amp; du học</h1>
          <p>Các chương trình học bổng chính của Đài Loan dành cho người Việt, kèm
             <strong>đường dẫn tới trang công bố chính thức</strong> để bạn tự đối chiếu điều kiện mới nhất.</p>
        </div>
        <div class="tv-hero-mark font-tc" aria-hidden="true">學</div>
      </div>

      <p class="cd-canh-bao"><i class="fa-solid fa-triangle-exclamation"></i>
        <span><strong>Luôn kiểm tra trang chính thức trước khi nộp.</strong> Hạn nộp, mức trợ cấp
        và điều kiện thay đổi theo từng năm; thông tin ở đây chỉ để bạn biết có những chương
        trình nào và tìm đúng chỗ.</span></p>

      <div class="cd-thanh">
        <div class="tv-search">
          <i class="fa-solid fa-magnifying-glass"></i>
          <input id="hb-tim" type="search" placeholder="Tìm theo tên học bổng hoặc đơn vị cấp…"
                 value="${tdEsc(hbState.tim)}" oninput="window.app.hbTim(this.value)" autocomplete="off">
        </div>
        ${nhanSu ? '<button class="btn btn-primary" onclick="window.app.hbMoSoan()"><i class="fa-solid fa-plus"></i> Thêm học bổng</button>' : ''}
      </div>

      <div class="kv-bo-tabs">
        <button class="lesson-tab${hbState.cap === 'all' ? ' active' : ''}" onclick="window.app.hbCap('all')">Tất cả</button>
        ${HB_CAP_HOC.map((c) => `<button class="lesson-tab${hbState.cap === c.id ? ' active' : ''}"
          onclick="window.app.hbCap('${c.id}')">${c.ten}</button>`).join('')}
      </div>

      ${ds.length ? `<div class="hb-ds">${ds.map((h) => _hbTheHtml(h, nhanSu)).join('')}</div>`
        : `<div class="tv-empty"><i class="fa-solid fa-magnifying-glass"></i><p>Không có học bổng nào khớp.</p></div>`}

      <div class="lt-card">
        <h3><i class="fa-solid fa-comment-dots"></i> Hỏi kinh nghiệm từ người đi trước</h3>
        <p class="lt-ghi-chu">Điều kiện trên giấy tờ là một chuyện, phỏng vấn và hồ sơ thực tế lại là chuyện khác.
          Hỏi trực tiếp anh chị đã đi thường nhanh hơn đọc mười trang hướng dẫn.</p>
        <button class="btn btn-primary" onclick="window.app.cdSangThaoLuan('du-hoc')">
          <i class="fa-solid fa-arrow-right"></i> Vào mục thảo luận Du học</button>
      </div>
    </div>`;
}

function _hbTheHtml(h, nhanSu) {
  const cap = String(h.cap_hoc || '').split(',').filter(Boolean);
  const chuaCo = '<span class="hb-chua">chưa cập nhật — xem trang chính thức</span>';
  return `
    <article class="hb-the">
      <div class="hb-dau">
        <div>
          <h3>${tdEsc(h.ten)}</h3>
          ${h.ten_goc ? `<div class="hb-goc">${tdEsc(h.ten_goc)}</div>` : ''}
        </div>
        <div class="hb-cap">${cap.map((c) => `<span class="cd-chip">${tdEsc(HB_TEN_CAP[c] || c)}</span>`).join('')}</div>
      </div>
      ${h.don_vi ? `<div class="hb-donvi"><i class="fa-solid fa-building-columns"></i><span>${tdEsc(h.don_vi)}</span></div>` : ''}
      ${h.mo_ta ? `<p class="hb-mo">${tdEsc(h.mo_ta)}</p>` : ''}
      <dl class="hb-bang">
        <div><dt>Hạn nộp</dt><dd>${h.han_nop ? tdEsc(h.han_nop) : chuaCo}</dd></div>
        <div><dt>Giá trị</dt><dd>${h.gia_tri ? tdEsc(h.gia_tri) : chuaCo}</dd></div>
        <div><dt>Yêu cầu tiếng</dt><dd>${h.yeu_cau_tieng ? tdEsc(h.yeu_cau_tieng) : '—'}</dd></div>
        <div><dt>Đối tượng</dt><dd>${h.doi_tuong ? tdEsc(h.doi_tuong) : '—'}</dd></div>
      </dl>
      <div class="hb-chan">
        ${h.link ? `<a class="btn btn-primary btn-sm" href="${tdEsc(h.link)}" target="_blank" rel="noopener">
          <i class="fa-solid fa-arrow-up-right-from-square"></i> Trang chính thức</a>` : ''}
        <span class="hb-moc">Cập nhật ${h.cap_nhat_luc ? new Date(h.cap_nhat_luc).toLocaleDateString('vi-VN') : '—'}</span>
        ${nhanSu ? `<button class="btn btn-sm" onclick="window.app.hbMoSoan(${h.id})">Sửa</button>
          <button class="btn btn-sm" onclick="window.app.hbXoa(${h.id})">Xoá</button>` : ''}
      </div>
    </article>`;
}

function hbTim(v) {
  hbState.tim = v;
  clearTimeout(_cdTimer);
  _cdTimer = setTimeout(() => {
    _hbVe(document.getElementById('page-content'));
    const o = document.getElementById('hb-tim');
    if (o && document.activeElement !== o) { o.focus(); o.setSelectionRange(o.value.length, o.value.length); }
  }, 200);
}
function hbCap(c) { hbState.cap = c; _hbVe(document.getElementById('page-content')); }

function hbMoSoan(id) {
  if (!cdLaNhanSu()) return;
  const h = id ? (cdState.hocBong || []).find((x) => x.id === id) : null;
  const cap = String(h ? h.cap_hoc || '' : '').split(',');
  const o = (k, nhan, ph = '') => `<label>${nhan}
    <input id="hb-s-${k}" type="text" value="${tdEsc(h ? (h[k] || '') : '')}" placeholder="${ph}"></label>`;
  openDialog(id ? 'Sửa học bổng' : 'Thêm học bổng',
    `<div class="cd-soan">
      ${o('ten', 'Tên học bổng <span class="cd-bat-buoc">*</span>')}
      ${o('ten_goc', 'Tên gốc (tiếng Trung/Anh)')}
      ${o('don_vi', 'Đơn vị cấp')}
      <label>Cấp học
        <span class="hb-tick">${HB_CAP_HOC.map((c) => `<label class="hb-tick-o">
          <input type="checkbox" value="${c.id}" class="hb-s-cap"${cap.includes(c.id) ? ' checked' : ''}> ${c.ten}</label>`).join('')}</span>
      </label>
      ${o('han_nop', 'Hạn nộp', 'vd: 01/02 – 31/03 hằng năm')}
      ${o('gia_tri', 'Giá trị', 'vd: học phí + 20.000 TWD/tháng')}
      ${o('yeu_cau_tieng', 'Yêu cầu tiếng')}
      ${o('doi_tuong', 'Đối tượng')}
      ${o('link', 'Link trang chính thức', 'https://…')}
      <label>Mô tả
        <textarea id="hb-s-mo_ta" rows="4" maxlength="4000">${tdEsc(h ? (h.mo_ta || '') : '')}</textarea></label>
      <p class="lt-ghi-chu">Mỗi lần lưu, hệ thống dập lại mốc <strong>“cập nhật lần cuối”</strong> —
        đó là cách người đọc biết số liệu còn mới hay đã cũ.</p>
      <div id="hb-s-loi" class="cd-loi"></div>
    </div>`,
    `<button class="btn" onclick="window.app.closeDialog()">Huỷ</button>
     <button class="btn btn-primary" onclick="window.app.hbLuu(${id || 'null'})">Lưu</button>`);
}

async function hbLuu(id) {
  const g = (k) => (document.getElementById('hb-s-' + k) || {}).value || '';
  const hb = {
    ten: g('ten').trim(), ten_goc: g('ten_goc').trim(), don_vi: g('don_vi').trim(),
    cap_hoc: [...document.querySelectorAll('.hb-s-cap:checked')].map((x) => x.value).join(','),
    han_nop: g('han_nop').trim(), gia_tri: g('gia_tri').trim(),
    yeu_cau_tieng: g('yeu_cau_tieng').trim(), doi_tuong: g('doi_tuong').trim(),
    link: g('link').trim(), mo_ta: g('mo_ta').trim(),
  };
  const oLoi = document.getElementById('hb-s-loi');
  if (!hb.ten) { oLoi.textContent = 'Thiếu tên học bổng.'; return; }
  try {
    await api.cdLuuHocBong(id, hb);
    closeDialog();
    cdState.hocBong = null;
    toast('Đã lưu.');
    renderCommunityScholarship(document.getElementById('page-content'));
  } catch (e) { oLoi.textContent = (e && e.message) || 'Không lưu được.'; }
}

async function hbXoa(id) {
  if (!confirm('Xoá học bổng này khỏi danh sách?')) return;
  try {
    await api.cdXoaHocBong(id);
    cdState.hocBong = null;
    renderCommunityScholarship(document.getElementById('page-content'));
  } catch (e) { toast((e && e.message) || 'Không xoá được.'); }
}

/** Từ trang Học bổng nhảy sang mục thảo luận đã lọc sẵn chủ đề. */
function cdSangThaoLuan(chuDe) {
  cdState.tab = 'thao-luan'; cdState.chuDe = chuDe || 'all'; cdState.trang = 1; cdState.moBai = null;
  navigate('community-forum');
}

// ============================================================
// KHAI BÁO RA NGOÀI cho `main.js` (4.40)
// ============================================================
export const render = {
  blog: renderBlog,
  'community-forum': renderCommunityForum,
  'community-vlog': renderCommunityVlog,
  'community-news': renderCommunityNews,
  'community-scholarship': renderCommunityScholarship,
};

export const handlers = {
  cdMoBai, cdDongBai, cdTim, cdTab, cdChuDe, cdTrang, cdMoSoan, cdGuiBai, cdThich,
  cdGuiBinhLuan, cdTraLoi, cdXoaBinhLuan, cdXoaBai, cdBaoCao,
  cdMoKiemDuyet, cdDuyet, cdDuyetBl, cdSangThaoLuan,
  hbTim, hbCap, hbMoSoan, hbLuu, hbXoa,
};
