// =============================================================
// BẢN ĐỒ TRƯỜNG ĐH ĐÀI LOAN — khối ở trang chủ (2026-10-09)
// =============================================================
// File NHẸ, nằm trong bundle chính: chỉ dựng khung + hẹn giờ nạp. Phần nặng (Leaflet, MapLibre GL,
// markercluster ≈ 1MB) ở `ban-do-truong-map.js` và CHỈ tải khi khối cuộn tới gần màn hình — khách
// vào trang chủ mà không cuộn xuống thì không tốn một byte nào cho bản đồ.
//
// Dữ liệu: public/data/truong/truong.json, sinh bằng scripts/lay-danh-sach-truong.mjs (logo + ảnh
// nằm ở public/images/truong/, trên server mình).

export function bdtHtml() {
  return `
    <div class="dash-wide">
      <section class="bdt" id="bdt" aria-labelledby="bdt-tieude">
        <div class="section-header">
          <h2 id="bdt-tieude"><span class="section-icon"><i class="fa-solid fa-school"></i></span>Bản đồ trường đại học Đài Loan</h2>
        </div>
        <div class="bdt-khung" id="bdt-khung">
          <div class="bdt-cho"><i class="fa-solid fa-circle-notch fa-spin"></i> Đang tải bản đồ…</div>
        </div>
      </section>
    </div>`;
}

/** Gọi sau khi `bdtHtml()` đã nằm trong DOM. Tải phần nặng khi khối cách màn hình < 300px. */
export function bdtKhoiTao() {
  const khung = document.getElementById('bdt-khung');
  if (!khung) return;
  const nap = () => import('./ban-do-truong-map.js')
    .then((m) => m.khoiTao(khung))
    .catch((err) => {
      console.error('Không tải được bản đồ trường:', err);
      if (khung.isConnected) khung.innerHTML = '<div class="bdt-cho">Không tải được bản đồ lúc này. Bạn thử tải lại trang giúp nhé.</div>';
    });
  if (!('IntersectionObserver' in window)) return void nap();
  const quan = new IntersectionObserver((ds) => {
    if (ds.some((d) => d.isIntersecting)) { quan.disconnect(); nap(); }
  }, { rootMargin: '300px 0px' });
  quan.observe(khung);
}
