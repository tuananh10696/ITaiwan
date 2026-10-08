// Nén ảnh giấy tờ ở TRÌNH DUYỆT trước khi gửi lên server — dùng chung cổng học sinh và quản trị.
//
// Ảnh chụp điện thoại 3-5MB; lưu nguyên vào DB thì vài trăm hồ sơ × 3 ảnh là đầy dung lượng. Mục tiêu
// ≤ 250KB/ảnh: CCCD / ảnh thẻ chỉ cần đọc rõ chữ và nhìn rõ mặt, 1280px cạnh dài là dư. Hạ dần chất
// lượng JPEG trước; vẫn lớn (ảnh nhiều chi tiết) thì thu nhỏ kích thước rồi thử lại, tới sàn 800px.
// Ảnh nền trắng/ảnh đơn giản dừng ngay ở vòng đầu nên giữ được chất lượng cao.
export const NGUONG_ANH_GIAY_TO = 250_000;   // ký tự base64 (~190KB nhị phân)
const CANH_TOI_DA = 1280;
const CANH_SAN = 800;

export function nenAnhGiayTo(file) {
  return new Promise((giai, tuChoi) => {
    const doc = new FileReader();
    doc.onerror = () => tuChoi(new Error('Không đọc được tệp ảnh.'));
    doc.onload = (ev) => {
      const img = new Image();
      img.onerror = () => tuChoi(new Error('Tệp này không phải ảnh hợp lệ.'));
      img.onload = () => {
        let canh = Math.min(CANH_TOI_DA, Math.max(img.width, img.height));
        for (;;) {
          const ty = canh / Math.max(img.width, img.height);
          const c = document.createElement('canvas');
          c.width = Math.max(1, Math.round(img.width * ty));
          c.height = Math.max(1, Math.round(img.height * ty));
          const ctx = c.getContext('2d');
          ctx.fillStyle = '#fff';   // PNG trong suốt -> JPEG không bị nền đen
          ctx.fillRect(0, 0, c.width, c.height);
          ctx.drawImage(img, 0, 0, c.width, c.height);
          let q = 0.82;
          let out = c.toDataURL('image/jpeg', q);
          while (out.length > NGUONG_ANH_GIAY_TO && q > 0.5) { q -= 0.08; out = c.toDataURL('image/jpeg', q); }
          if (out.length <= NGUONG_ANH_GIAY_TO || canh <= CANH_SAN) return giai(out);
          canh = Math.max(CANH_SAN, Math.round(canh * 0.85));
        }
      };
      img.src = ev.target.result;
    };
    doc.readAsDataURL(file);
  });
}
