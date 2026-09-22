// =============================================================
// LUYỆN NÓI — chấm phát âm bằng nhận dạng giọng nói (2026-09-16)
// =============================================================
// Bốn kỹ năng thì NÓI đang trống hoàn toàn: trang "Luyện nói Shadowing" chỉ phát TTS cho học
// viên nghe rồi tự đọc theo, không có gì phản hồi lại xem đọc đúng hay sai.
//
// Vì sao dùng SpeechRecognition (nhận dạng) chứ KHÔNG dùng MediaRecorder (ghi file):
//   · Ghi file thì phải có nơi lưu (R2/S3), cơ chế dọn, phân quyền nghe — đúng hạ tầng đã cân
//     nhắc rồi BỎ khi làm shadowing (CLAUDE.md 4.22b). Làm lại là đi ngược quyết định cũ.
//   · Ghi file xong cũng không ai chấm: giáo viên không thể nghe hết hàng nghìn clip.
//   · Nhận dạng cho phản hồi NGAY trong 1 giây, ngay lúc học viên còn nhớ mình vừa đọc thế nào —
//     đó mới là lúc sửa được phát âm.
//
// GIỚI HẠN THẬT, phải nói thẳng với người dùng chứ không giấu:
//   · Chỉ chạy trên Chrome/Edge (và Safari 14.1+ ở mức hạn chế). Firefox KHÔNG hỗ trợ.
//   · Máy nhận dạng vốn hay "đoán" theo ngữ cảnh: đọc sai một thanh điệu nó vẫn có thể trả về
//     đúng chữ. Nên kết quả là GỢI Ý luyện tập, không phải điểm chấm phát âm chính xác.

import { sangGianThe } from '../data/gian-the.js';

/** Trình duyệt có hỗ trợ nhận dạng giọng nói không. */
export function coNhanDang() {
  return typeof window !== 'undefined'
    && !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

/**
 * Bỏ mọi thứ không phải chữ Hán, rồi quy về GIẢN THỂ.
 *
 * Quy hệ chữ là bắt buộc: máy nhận dạng zh-TW vẫn thường trả về giản thể, nên học viên đọc đúng
 * "我是學生" mà máy ghi "我是学生" sẽ bị chấm 75% — chấm oan đúng người đọc chuẩn. Bảng tra đã có
 * sẵn từ 4.45, dùng lại chứ không tự chế bảng thứ hai.
 */
const chuHan = (s) => sangGianThe(String(s || '').replace(/[^一-鿿㐀-䶿]/g, ''));

/**
 * Tỉ lệ khớp giữa câu mẫu và câu nhận dạng được, 0-100.
 * Dùng khoảng cách Levenshtein trên chuỗi CHỮ HÁN: "我是学生" vs "我是学生们" = 80%, không phải
 * 0% như khi so bằng ===. Học viên cần biết mình sai MẤY chữ, không phải đúng/sai nhị phân.
 */
export function tiLeKhop(mau, nghe) {
  const a = chuHan(mau);
  const b = chuHan(nghe);
  if (!a.length) return 0;
  if (!b.length) return 0;
  // Levenshtein một hàng — đủ nhanh cho câu vài chục chữ và không tốn bộ nhớ.
  let truoc = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const nay = [i];
    for (let j = 1; j <= b.length; j++) {
      nay[j] = Math.min(
        truoc[j] + 1,
        nay[j - 1] + 1,
        truoc[j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1),
      );
    }
    truoc = nay;
  }
  return Math.max(0, Math.round((1 - truoc[b.length] / Math.max(a.length, b.length)) * 100));
}

/**
 * So từng chữ để chỉ ra chữ nào đọc chưa khớp. Trả mảng { chu, dung }.
 * Căn theo VỊ TRÍ chứ không dò khớp tối ưu: đọc thiếu một chữ ở đầu thì mọi chữ sau đều lệch —
 * chấp nhận được, vì khi đó tỉ lệ khớp cũng đã thấp và học viên cần đọc lại cả câu.
 */
export function soTungChu(mau, nghe) {
  // So bằng bản đã quy về giản thể, nhưng HIỆN chữ gốc của câu mẫu: học viên đang học phồn thể
  // mà màn hình trả về 学 thay cho 學 thì nhìn như hệ thống sửa bài sai hệ chữ.
  const goc = String(mau || '').replace(/[^一-鿿㐀-䶿]/g, '');
  const a = chuHan(mau);
  const b = chuHan(nghe);
  return [...goc].map((c, i) => ({ chu: c, dung: b[i] === a[i] }));
}

/**
 * Nghe học viên đọc một câu.
 * @param {object} o
 * @param {string} o.lang     'zh-TW' (Đài Loan) hoặc 'zh-CN' (đại lục) — phải khớp bộ đang học,
 *                            nhận dạng sai vùng miền thì chấm oan học viên.
 * @param {number} [o.timeout] mili giây tối đa chờ, mặc định 8000
 * @returns {Promise<{ok:boolean, text?:string, loi?:string}>}
 */
export function ngheDoc({ lang = 'zh-TW', timeout = 8000 } = {}) {
  return new Promise((resolve) => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return resolve({ ok: false, loi: 'khong-ho-tro' });

    let xong = false;
    const nhan = new SR();
    nhan.lang = lang;
    nhan.interimResults = false;
    nhan.maxAlternatives = 3;
    nhan.continuous = false;

    const ket = (kq) => {
      if (xong) return;
      xong = true;
      clearTimeout(hen);
      try { nhan.stop(); } catch (_) { /* đã dừng rồi */ }
      resolve(kq);
    };

    // Không có mốc dừng thì nhận dạng có thể treo vô hạn khi mic im lặng (người dùng bỏ đi),
    // và nút "đang nghe" kẹt mãi ở trạng thái quay.
    const hen = setTimeout(() => ket({ ok: false, loi: 'het-gio' }), timeout);

    nhan.onresult = (e) => {
      const ds = [...(e.results?.[0] || [])].map((x) => x.transcript).filter(Boolean);
      ket(ds.length ? { ok: true, text: ds[0], canhieu: ds } : { ok: false, loi: 'khong-nghe-ro' });
    };
    nhan.onerror = (e) => {
      const m = {
        'not-allowed': 'tu-choi-mic', 'service-not-allowed': 'tu-choi-mic',
        'no-speech': 'khong-nghe-ro', 'audio-capture': 'khong-co-mic',
      };
      ket({ ok: false, loi: m[e.error] || 'loi-khac' });
    };
    nhan.onend = () => ket({ ok: false, loi: 'khong-nghe-ro' });

    try { nhan.start(); }
    catch (_) { ket({ ok: false, loi: 'loi-khac' }); }
  });
}

/** Lời giải thích tiếng Việt cho từng mã lỗi — để giao diện không hiện mã kỹ thuật cho học viên. */
export const LOI_NOI = {
  'khong-ho-tro': 'Trình duyệt này chưa hỗ trợ nhận dạng giọng nói. Hãy dùng Chrome hoặc Edge.',
  'tu-choi-mic': 'Bạn chưa cho phép dùng micro. Bấm vào biểu tượng khoá trên thanh địa chỉ để bật.',
  'khong-co-mic': 'Không tìm thấy micro nào trên thiết bị.',
  'khong-nghe-ro': 'Chưa nghe rõ. Thử đọc to và rõ hơn một chút nhé.',
  'het-gio': 'Hết thời gian chờ. Bấm lại rồi đọc ngay sau khi nút chuyển sang "Đang nghe".',
  'loi-khac': 'Không dùng được micro lúc này. Thử lại sau nhé.',
};
