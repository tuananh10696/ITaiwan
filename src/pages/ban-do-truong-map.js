// =============================================================
// BẢN ĐỒ TRƯỜNG — phần NẶNG, tải lười (xem ban-do-truong.js)
// =============================================================
// Leaflet (bản đồ + marker + gom cụm). Ba kiểu nền, MẶC ĐỊNH là vệ tinh (khách yêu cầu 2026-10-10):
//   · "Vệ tinh (có nhãn)" và "Vệ tinh": ảnh hàng không của Cục Đo đạc Quốc gia Đài Loan (NLSC, dữ liệu
//     mở của chính phủ), WMTS raster, không cần khoá API, zoom 6-20, chỉ phủ Đài Loan (đúng phạm vi
//     của mọi trường ở đây). Lỗi tải tile thì Leaflet chỉ để ô trống, không làm hỏng trang.
//   · "Bản đồ (có màu)": OpenFreeMap "liberty" (vector, MapLibre GL). Miễn phí, không khoá API. Phần này
//     NẶNG (≈1MB) nên chỉ nạp khi người dùng đổi sang nó — mặc định là raster nên điện thoại không phải
//     tải MapLibre. (CARTO đã bắt buộc API key — đừng dùng.)
//   · CSP của site không có `worker-src`, nên worker blob của MapLibre bị chặn: dùng bản worker CSP phục
//     vụ từ chính origin (`?url` -> file có hash trong dist) + `setWorkerUrl`, khỏi sửa nginx / vercel.
//   · markercluster đọc `L` toàn cục, nên phải gán window.L TRƯỚC khi nạp nó.
//   · Điện thoại: kéo một ngón phải cuộn TRANG chứ không kéo bản đồ (nếu không bản đồ nuốt mất thao tác
//     cuộn). Hai ngón mới di chuyển / phóng to bản đồ, giống Google Maps nhúng ("cooperative gestures").
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.markercluster/dist/MarkerCluster.css';
import workerUrl from 'maplibre-gl/dist/maplibre-gl-csp-worker.js?url';
import { tdEsc } from '../core/ui.js';

const MIEN = { bac: 'Miền Bắc', trung: 'Miền Trung', nam: 'Miền Nam', dong: 'Miền Đông' };
const boDau = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').toLowerCase();
const ngoai = (u) => (u ? `<a href="${tdEsc(u)}" target="_blank" rel="noopener noreferrer">${tdEsc(u.replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, ''))}</a>` : '');

let mapHienTai = null;   // bản đồ đang sống — dashboard vẽ lại thì phải huỷ cái cũ (giới hạn số WebGL context)

export async function khoiTao(khung) {
  window.L = L;
  await import('leaflet.markercluster');
  const DS = await (await fetch('/data/truong/truong.json')).json();
  if (!khung.isConnected) return;   // người dùng đã rời trang chủ trong lúc tải
  // Ngăn chi tiết / lớp nền mờ của lần dựng trước trên điện thoại nằm ở <body> (xem `moChiTiet`) — dọn đi.
  document.querySelectorAll('body > .bdt-ct, body > .bdt-lop').forEach((e) => e.remove());
  if (mapHienTai) { try { mapHienTai.remove(); } catch { /* đã gỡ */ } mapHienTai = null; }
  DS.forEach((u) => { u._k = boDau([u.ten, u.ten_en, u.dia_chi].join(' ')); });

  khung.innerHTML = `
    <div class="bdt-the">
      <aside class="bdt-bang" aria-label="Danh sách trường">
        <div class="bdt-cu">
          <input type="search" class="bdt-tim" placeholder="Tìm trường theo tên hoặc địa chỉ…" aria-label="Tìm trường">
          <div class="bdt-chips" role="group" aria-label="Khu vực">
            ${[['', 'Tất cả'], ...Object.entries(MIEN)].map(([k, v]) => `<button type="button" class="bdt-chip" data-m="${k}" aria-pressed="${k === ''}">${v}</button>`).join('')}
          </div>
          <label class="bdt-opt"><input type="checkbox" class="bdt-khung-cb"> Chỉ hiện trường trong khung bản đồ</label>
          <div class="bdt-dem" aria-live="polite"></div>
        </div>
        <div class="bdt-ds"></div>
      </aside>
      <div class="bdt-mapwrap">
        <div class="bdt-map" role="application" aria-label="Bản đồ các trường"></div>
        <aside class="bdt-ct" aria-label="Chi tiết trường" aria-hidden="true">
          <button type="button" class="bdt-dong" aria-label="Đóng chi tiết"><i class="fa-solid fa-xmark"></i></button>
          <div class="bdt-ct-than"></div>
        </aside>
      </div>
    </div>`;
  const $ = (s) => khung.querySelector(s);
  const dsEl = $('.bdt-ds'), demEl = $('.bdt-dem'), ctEl = $('.bdt-ct'), ctThan = $('.bdt-ct-than');

  // ------------------------------------------------ bản đồ
  const camUng = L.Browser.mobile || window.matchMedia('(pointer: coarse)').matches;   // màn cảm ứng
  const map = L.map($('.bdt-map'), {
    minZoom: 6, maxZoom: 19, zoomControl: true, attributionControl: true,
    dragging: !camUng,   // cảm ứng: một ngón cuộn trang, hai ngón mới kéo bản đồ (xem đầu file)
  });
  mapHienTai = map;
  const NLSC = 'https://wmts.nlsc.gov.tw/wmts';
  const ghiNguon = '&copy; <a href="https://maps.nlsc.gov.tw/" target="_blank" rel="noopener">內政部國土測繪中心</a>';
  const lopVeTinhNhan = L.tileLayer(`${NLSC}/PHOTO_MIX/default/GoogleMapsCompatible/{z}/{y}/{x}`, { maxZoom: 19, maxNativeZoom: 19, attribution: ghiNguon }).addTo(map);
  const lopVeTinh = L.tileLayer(`${NLSC}/PHOTO2/default/GoogleMapsCompatible/{z}/{y}/{x}`, { maxZoom: 19, maxNativeZoom: 19, attribution: ghiNguon });
  // Nền vector: nhóm rỗng, MapLibre chỉ được nạp lần đầu người dùng chọn nền này.
  const lopCoMau = L.layerGroup();
  let coMauDaNap = false;
  map.on('baselayerchange', async (e) => {
    if (e.layer !== lopCoMau || coMauDaNap) return;
    coMauDaNap = true;
    try {
      const [{ default: maplibregl }] = await Promise.all([import('maplibre-gl'), import('maplibre-gl/dist/maplibre-gl.css')]);
      maplibregl.setWorkerUrl(workerUrl);
      await import('@maplibre/maplibre-gl-leaflet');
      lopCoMau.addLayer(L.maplibreGL({ style: 'https://tiles.openfreemap.org/styles/liberty' }));
    } catch (err) {
      coMauDaNap = false;   // cho thử lại lần chọn sau
      console.error('Không nạp được bản đồ có màu:', err);
      lopVeTinhNhan.addTo(map);
    }
  });
  L.control.layers({ 'Vệ tinh (có nhãn)': lopVeTinhNhan, 'Vệ tinh': lopVeTinh, 'Bản đồ (có màu)': lopCoMau }, null, { position: 'topright', collapsed: true }).addTo(map);

  // Cuộn trang qua bản đồ không được vô tình phóng to: chỉ bật lăn chuột sau khi bấm vào bản đồ.
  map.scrollWheelZoom.disable();
  map.on('click', () => map.scrollWheelZoom.enable());
  map.on('mouseout', () => map.scrollWheelZoom.disable());

  // Gợi ý cho màn cảm ứng khi người dùng đặt MỘT ngón lên bản đồ (và thấy nó không kéo).
  if (camUng) {
    const goiY = document.createElement('div');
    goiY.className = 'bdt-goiy';
    goiY.textContent = 'Dùng hai ngón tay để di chuyển bản đồ';
    $('.bdt-mapwrap').appendChild(goiY);
    let hen = null;
    $('.bdt-map').addEventListener('touchstart', (e) => {
      if (e.touches.length !== 1) return;
      goiY.classList.add('hien');
      clearTimeout(hen);
      hen = setTimeout(() => goiY.classList.remove('hien'), 1600);
    }, { passive: true });
  }

  const cum = L.markerClusterGroup({
    maxClusterRadius: 46, showCoverageOnHover: false, spiderfyOnMaxZoom: true,
    iconCreateFunction: (c) => L.divIcon({ html: `<div class="bdt-cum">${c.getChildCount()}</div>`, className: '', iconSize: [42, 42] }),
  });
  map.addLayer(cum);

  const pin = (u, sel) => L.divIcon({
    className: '', iconSize: [42, 42], iconAnchor: [21, 21],
    html: `<div class="bdt-pin${sel ? ' sel' : ''}">${u.logo ? `<img src="/${tdEsc(u.logo)}" alt="" width="42" height="42">` : `<span>${tdEsc(u.ten.replace(/^(Đại học|Học viện)\s+/i, '').charAt(0))}</span>`}</div>`,
  });
  const marker = new Map();
  let dangChon = null;
  DS.forEach((u) => {
    const m = L.marker([u.lat, u.lng], { icon: pin(u, false), title: u.ten, riseOnHover: true });
    m.bindPopup(() => popup(u), { closeButton: false, offset: [0, -16], className: 'bdt-popup' });
    m.on('click', () => chon(u.id, { bay: false }));
    marker.set(u.id, m);
  });
  const popup = (u) => {
    const d = document.createElement('div');
    d.className = 'bdt-pop';
    d.innerHTML = `${u.anh ? `<img class="bdt-pop-anh" src="/${tdEsc(u.anh)}" alt="">` : ''}
      <div class="bdt-pop-ct"><b>${tdEsc(u.ten)}</b>${u.ten_en ? `<small>${tdEsc(u.ten_en)}</small>` : ''}<button type="button">Xem chi tiết</button></div>`;
    d.querySelector('button').onclick = () => moChiTiet(u);
    return d;
  };
  map.fitBounds(L.latLngBounds(DS.map((u) => [u.lat, u.lng])), { padding: [24, 24] });

  // ------------------------------------------------ lọc + danh sách
  let mien = '', tuKhoa = '', trongKhung = false;
  khung.querySelectorAll('.bdt-chip').forEach((b) => b.addEventListener('click', () => {
    mien = b.dataset.m;
    khung.querySelectorAll('.bdt-chip').forEach((c) => c.setAttribute('aria-pressed', String(c === b)));
    ve(true);
  }));
  $('.bdt-tim').addEventListener('input', (e) => { tuKhoa = boDau(e.target.value.trim()); ve(true); });
  $('.bdt-khung-cb').addEventListener('change', (e) => { trongKhung = e.target.checked; ve(false); });
  map.on('moveend', () => { if (trongKhung) ve(false); });

  const lg = (u) => (u.logo
    ? `<span class="bdt-lg"><img src="/${tdEsc(u.logo)}" alt="" loading="lazy"></span>`
    : `<span class="bdt-lg bdt-lg-chu">${tdEsc(u.ten.charAt(0))}</span>`);
  function ve(fit) {
    const kh = map.getBounds();
    const hien = DS.filter((u) => (!mien || u.mien === mien) && (!tuKhoa || u._k.includes(tuKhoa)) && (!trongKhung || kh.contains([u.lat, u.lng])));
    cum.clearLayers();
    cum.addLayers(hien.map((u) => marker.get(u.id)));
    demEl.textContent = `${hien.length} / ${DS.length} trường`;
    dsEl.innerHTML = hien.length ? hien.map((u) => `
      <button type="button" class="bdt-it${u.id === dangChon ? ' on' : ''}" data-id="${u.id}">
        ${lg(u)}
        <span class="bdt-it-ct"><span class="bdt-it-ten">${tdEsc(u.ten)}</span><span class="bdt-it-phu">${tdEsc(u.dia_chi)}</span></span>
      </button>`).join('') : '<div class="bdt-rong">Không có trường nào khớp.</div>';
    if (fit && hien.length && (mien || tuKhoa)) {
      map.fitBounds(L.latLngBounds(hien.map((u) => [u.lat, u.lng])), { padding: [40, 40], maxZoom: 13 });
    }
  }
  dsEl.addEventListener('click', (e) => { const b = e.target.closest('.bdt-it'); if (b) chon(Number(b.dataset.id), { bay: true, mo: true }); });

  // ------------------------------------------------ chọn + chi tiết
  function chon(id, { bay = true, mo = false } = {}) {
    const u = DS.find((x) => x.id === id);
    if (!u) return;
    if (dangChon != null && marker.has(dangChon)) marker.get(dangChon).setIcon(pin(DS.find((x) => x.id === dangChon), false));
    dangChon = id;
    marker.get(id).setIcon(pin(u, true));
    dsEl.querySelectorAll('.bdt-it').forEach((i) => i.classList.toggle('on', Number(i.dataset.id) === id));
    dsEl.querySelector('.bdt-it.on')?.scrollIntoView({ block: 'nearest' });
    // Điện thoại: bản đồ nằm TRÊN danh sách — bấm một trường ở dưới mà bản đồ vẫn khuất thì bay tới đâu cũng không thấy.
    if (mo && window.matchMedia('(max-width: 860px)').matches) $('.bdt-mapwrap').scrollIntoView({ behavior: 'smooth', block: 'start' });
    if (bay) cum.zoomToShowLayer(marker.get(id), () => map.flyTo([u.lat, u.lng], Math.max(map.getZoom(), 14), { duration: 0.8 }));
    if (mo) moChiTiet(u);
  }
  const laMobile = () => window.matchMedia('(max-width: 860px)').matches;
  // Điện thoại: tờ chi tiết phải ở <body>. Nằm trong khung cuộn của app thì thanh điều hướng dưới (một
  // phần tử CÙNG CẤP, vẽ sau) đè lên nó và che mất phần cuối. Máy tính: giữ trong khung bản đồ.
  const lop = document.createElement('div');
  lop.className = 'bdt-lop';
  lop.addEventListener('click', () => dongCT());
  function datCho() {
    if (laMobile()) { if (ctEl.parentElement !== document.body) { document.body.appendChild(lop); document.body.appendChild(ctEl); } }
    else if (ctEl.parentElement !== khung.querySelector('.bdt-mapwrap')) { lop.remove(); khung.querySelector('.bdt-mapwrap').appendChild(ctEl); }
  }
  function moChiTiet(u) {
    map.closePopup();
    datCho();
    const dong = [
      u.web && ['Website', ngoai(u.web)],
      ['Địa chỉ', tdEsc(u.dia_chi)],
      u.xep_hang && ['Xếp hạng', tdEsc(u.xep_hang)],
      u.so_sv && ['Số sinh viên', tdEsc(u.so_sv)],
      u.so_sv_qt && ['Sinh viên quốc tế', tdEsc(u.so_sv_qt)],
      u.so_gv && ['Số giảng viên', tdEsc(u.so_gv)],
    ].filter(Boolean);
    ctThan.innerHTML = `
      <div class="bdt-hero${u.anh ? '' : ' khong'}"${u.anh ? ` style="background-image:url('/${tdEsc(u.anh)}')"` : ''}>${lg(u)}</div>
      <div class="bdt-nd">
        <h3>${tdEsc(u.ten)}</h3>
        ${u.ten_en ? `<div class="bdt-en">${tdEsc(u.ten_en)}</div>` : ''}
        <dl class="bdt-kv">${dong.map(([k, v]) => `<dt>${k}</dt><dd>${v}</dd>`).join('')}</dl>
      </div>`;
    ctEl.classList.add('open');
    lop.classList.add('hien');
    ctEl.setAttribute('aria-hidden', 'false');
    if (dangChon !== u.id) chon(u.id, { bay: false });
  }
  function dongCT() { ctEl.classList.remove('open'); lop.classList.remove('hien'); ctEl.setAttribute('aria-hidden', 'true'); }
  $('.bdt-dong').addEventListener('click', dongCT);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && ctEl.classList.contains('open')) dongCT(); });

  ve(false);
  // Khối nằm trong trang chủ có thể bị vẽ lại (đổi tài khoản, về trang chủ...): kích thước đổi thì Leaflet cần biết.
  new ResizeObserver(() => map.invalidateSize()).observe($('.bdt-mapwrap'));
}
