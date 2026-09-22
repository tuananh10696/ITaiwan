// ============================================================
// BỘ LỌC TỪ NGỮ cho khu Cộng đồng (2026-09-08)
// ============================================================
// Chủ dự án chốt: cho đăng NGAY, nhưng không được chứa từ tục tĩu / lăng mạ / miệt thị.
// Xem CLAUDE.md 4.39.
//
// HAI MỨC, cố ý không gộp làm một:
//   · 'chan'     — tục tĩu, lăng mạ, miệt thị rõ ràng -> KHÔNG cho đăng, báo rõ từ nào.
//   · 'canh-bao' — từ mơ hồ ("vl" có thể là Vĩnh Long, "ngu" có thể là "ngu ngơ") -> VẪN
//                  đăng ngay, nhưng gắn cờ vào danh sách chờ người thật rà lại.
// Chặn cứng cả mức hai thì học viên bị chặn oan liên tục, mà bỏ hẳn thì lọt.
//
// ⚠️ CÁI BẪY LỚN NHẤT: bỏ dấu để bắt lách chữ ("đ.ị.t" -> "dit") nhưng bỏ dấu cũng làm
//    "đụ" -> "du", trùng ngay với "DU HỌC" và "du lịch" — chủ đề chính của khu Cộng đồng.
//    Nên mỗi mẫu phải khai rõ soi trên chuỗi NÀO:
//      · 'dau'      = soi trên chữ CÒN DẤU (dùng cho từ ngắn, dễ trùng);
//      · 'khong-dau'= soi trên chữ đã bỏ dấu + gỡ ký tự chèn (dùng cho mẫu dài, khó trùng).
//    Đừng đưa từ 2-3 chữ cái vào nhóm 'khong-dau'.

/** Bỏ dấu tiếng Việt. Giữ nguyên chữ, chỉ gỡ dấu thanh và dấu mũ. */
export function boDau(s) {
  return String(s || '')
    .normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D');
}

/**
 * Chuỗi dùng để dò mẫu 'khong-dau'. Ngoài bỏ dấu còn:
 *   · hạ chữ thường;
 *   · gỡ mọi ký tự KHÔNG phải chữ/số ("đ.m", "c*c", "l ồ n" -> "dm", "cc", "lon");
 *   · rút gọn ký tự lặp ("nguuuu" -> "nguu", giữ tối đa 2 để không phá "oo" trong "look").
 * Ba bước này bắt gần hết cách lách thường gặp mà không cần danh sách biến thể dài dằng dặc.
 */
export function chuanHoa(s) {
  return boDau(s).toLowerCase()
    .replace(/(.)\1{2,}/g, '$1$1')
    .replace(/[^a-z0-9]+/g, '');
}

/**
 * Ranh giới từ dùng được cho tiếng Việt.
 *
 * ⚠️ KHÔNG dùng `\b` của JS: nó là ranh giới ASCII, mà `đ ê ô ơ ư à á ả ã ạ …` đều KHÔNG phải
 *    ký tự \w. Hệ quả: `\bđm\b` không khớp "đm", `\bđồ chó\b` không khớp "đồ chó",
 *    `\bbê đê\b` không khớp "bê đê", `\bbắc kỳ\b` không khớp "bắc kỳ" — tức toàn bộ mẫu bắt
 *    đầu hoặc kết thúc bằng chữ có dấu đều CHẾT ÂM THẦM, bộ lọc trông như đang chạy mà thực ra
 *    thủng. Đã dính đúng 6/17 mẫu ở lần chạy đầu.
 *    Thay bằng lookaround trên lớp chữ Unicode (`\p{L}`), cần cờ 'u'.
 */
const RANH_T = '(?<![\\p{L}\\p{N}_])';
const RANH_P = '(?![\\p{L}\\p{N}_])';
const boRanh = (nguon) => new RegExp(RANH_T + '(?:' + nguon + ')' + RANH_P, 'giu');

/**
 * Danh sách mẫu.
 *   mau   : chuỗi hoặc RegExp.
 *   tren  : 'dau' | 'khong-dau' — soi trên chuỗi nào.
 *   muc   : 'chan' | 'canh-bao'.
 *   nhom  : để thống kê và để giải thích cho người viết.
 *
 * ⚠️ Mẫu dạng CHUỖI ở chế độ 'dau' luôn được bọc ranh giới từ, nên "cặc" không khớp trong
 *    "cặc kè"… và quan trọng hơn: "các" không khớp "cặc" (khác dấu). Mẫu 'khong-dau' thì
 *    KHÔNG có ranh giới từ (vì đã gỡ hết dấu cách), nên chỉ dùng cho chuỗi đủ dài.
 */
const MAU = [
  // ---------- tục tĩu (chặn) ----------
  { mau: 'địt|đụ|đéo|đm|đmm|đcm|đkm|vcl|vkl|clgt|cmm|đjt|dcmm', tren: 'dau', muc: 'chan', nhom: 'tuc-tiu' },
  { mau: 'lồn|cặc|buồi|dái|cứt|ỉa', tren: 'dau', muc: 'chan', nhom: 'tuc-tiu' },
  { mau: 'chó chết|đồ chó|con chó|thằng chó|súc vật|súc sinh|khốn nạn|mất dạy|vô học', tren: 'dau', muc: 'chan', nhom: 'lang-ma' },
  { mau: 'mẹ mày|má mày|bố mày|cha mày|mẹ nó|đm nó', tren: 'dau', muc: 'chan', nhom: 'lang-ma' },
  // Biến thể viết liền / chèn ký tự — chỉ những chuỗi ĐỦ DÀI để không trùng từ thường.
  { mau: 'ditme', tren: 'khong-dau', muc: 'chan', nhom: 'tuc-tiu' },
  // Dạng chèn dấu chấm/sao ("đ.m mày"): sau chuanHoa thành "dmmay". Phải là chuỗi ĐỦ DÀI —
  // để bare "dm" ở chế độ không dấu là chặn luôn cả chữ "admin".
  { mau: 'dmmay', tren: 'khong-dau', muc: 'chan', nhom: 'tuc-tiu' },
  { mau: 'dcmm', tren: 'khong-dau', muc: 'chan', nhom: 'tuc-tiu' },
  { mau: 'dumemay', tren: 'khong-dau', muc: 'chan', nhom: 'tuc-tiu' },
  { mau: 'vailon', tren: 'khong-dau', muc: 'chan', nhom: 'tuc-tiu' },
  { mau: 'matlon', tren: 'khong-dau', muc: 'chan', nhom: 'lang-ma' },
  { mau: 'occho', tren: 'khong-dau', muc: 'chan', nhom: 'lang-ma' },
  { mau: 'naotom', tren: 'khong-dau', muc: 'canh-bao', nhom: 'lang-ma' },
  { mau: 'thangngu', tren: 'khong-dau', muc: 'chan', nhom: 'lang-ma' },
  { mau: 'conngu', tren: 'khong-dau', muc: 'chan', nhom: 'lang-ma' },
  { mau: 'dongu', tren: 'khong-dau', muc: 'chan', nhom: 'lang-ma' },

  // ---------- miệt thị (chặn) ----------
  // Miệt thị người Trung Quốc — đáng chú ý riêng ở app này: chủ đề là tiếng Trung, kiểu
  // bình luận "tàu khựa" rất dễ xuất hiện và đúng loại nội dung không được để lọt.
  { mau: 'tàu khựa|ba tàu|chệt', tren: 'dau', muc: 'chan', nhom: 'miet-thi' },
  { mau: 'bê đê|pê đê|xăng pha nhớt|ô môi|bóng lộ', tren: 'dau', muc: 'chan', nhom: 'miet-thi' },
  { mau: 'mọi rợ|đồ mọi|dân mọi', tren: 'dau', muc: 'chan', nhom: 'miet-thi' },
  { mau: 'bắc kỳ|nam kỳ|trung kỳ', tren: 'dau', muc: 'canh-bao', nhom: 'miet-thi' },

  // ---------- tiếng Trung (chặn) ----------
  // Bài trong khu này thường xen chữ Hán, nên bộ lọc phải soi cả tiếng Trung.
  { mau: /(操你|肏你|傻逼|傻屄|婊子|贱人|王八蛋|狗娘养|去死吧|幹你娘|干你娘)/u, tren: 'dau', muc: 'chan', nhom: 'tuc-tiu' },
  { mau: /(他媽的|他妈的|媽的|妈的|靠北|靠杯)/u, tren: 'dau', muc: 'canh-bao', nhom: 'tuc-tiu' },

  // ---------- mơ hồ (chỉ gắn cờ) ----------
  // "vl" rất hay là chửi thề, nhưng cũng có thể là Vĩnh Long. "ngu" có thể nằm trong "ngu ngơ".
  // Chặn cứng mấy từ này là chặn oan người viết tử tế -> chỉ gắn cờ cho người thật rà.
  { mau: 'vl', tren: 'dau', muc: 'canh-bao', nhom: 'tuc-tiu' },
  { mau: 'ngu|dốt|đần|ngáo', tren: 'dau', muc: 'canh-bao', nhom: 'lang-ma' },
  { mau: 'im mồm|câm mồm|biến đi|cút', tren: 'dau', muc: 'canh-bao', nhom: 'lang-ma' },
];

const TEN_NHOM = {
  'tuc-tiu': 'từ ngữ tục tĩu',
  'lang-ma': 'lời lẽ lăng mạ, xúc phạm',
  'miet-thi': 'từ ngữ miệt thị, phân biệt',
  spam: 'dấu hiệu spam',
};

/**
 * Soi một đoạn văn bản.
 * Trả { muc: 'sach' | 'canh-bao' | 'chan', tuDinh: [{ tu, nhom, muc }], nhom: [...] }.
 * `tuDinh` giữ đúng đoạn chữ đã khớp trong bài GỐC để báo lại cho người viết sửa —
 * nói chung chung "bài có từ không phù hợp" thì họ không biết sửa chỗ nào.
 */
export function soiVanBan(...doan) {
  const goc = doan.filter(Boolean).join('\n');
  if (!goc.trim()) return { muc: 'sach', tuDinh: [], nhom: [] };
  const sach = chuanHoa(goc);
  const tuDinh = [];
  for (const m of MAU) {
    if (m.tren === 'dau') {
      // RegExp viết sẵn = mẫu chữ Hán, KHÔNG bọc ranh giới (tiếng Trung không có dấu cách).
      const re = m.mau instanceof RegExp
        ? new RegExp(m.mau.source, m.mau.flags.includes('g') ? m.mau.flags : m.mau.flags + 'g')
        : boRanh(m.mau);
      for (const kq of goc.matchAll(re)) tuDinh.push({ tu: kq[0], nhom: m.nhom, muc: m.muc });
    } else if (sach.includes(m.mau)) {
      tuDinh.push({ tu: m.mau, nhom: m.nhom, muc: m.muc });
    }
  }
  const muc = tuDinh.some((t) => t.muc === 'chan') ? 'chan'
    : tuDinh.length ? 'canh-bao' : 'sach';
  return { muc, tuDinh, nhom: [...new Set(tuDinh.map((t) => t.nhom))] };
}

/**
 * Câu báo cho người viết. Nêu đúng từ bị bắt để họ sửa được, không nói chung chung.
 * `nhan` để câu chữ khớp với thứ đang gửi ("Bài" / "Bình luận") — báo "Bài chưa đăng được"
 * cho một bình luận thì người dùng ngơ ngác không biết đang nói về cái gì.
 */
export function loiTuChoi(kq, nhan = 'Bài') {
  const tu = [...new Set(kq.tuDinh.filter((t) => t.muc === 'chan').map((t) => t.tu))].slice(0, 5);
  const nhom = [...new Set(kq.tuDinh.filter((t) => t.muc === 'chan').map((t) => TEN_NHOM[t.nhom]))];
  return `${nhan} chưa gửi được vì có ${nhom.join(' và ')}: ${tu.map((t) => `“${t}”`).join(', ')}. `
    + 'Sửa lại rồi gửi nhé — cộng đồng này có cả học viên nhỏ tuổi.';
}

/**
 * Dấu hiệu spam. KHÔNG chặn, chỉ gắn cờ — chặn nhầm một bài chia sẻ nhiều link tài liệu thì
 * mất đúng loại nội dung có ích nhất.
 */
export function soiSpam(noiDung) {
  const s = String(noiDung || '');
  const soLink = (s.match(/https?:\/\//gi) || []).length;
  const hoa = s.replace(/[^A-ZĐÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠƯ]/g, '').length;
  const chu = s.replace(/[^a-zA-ZÀ-ỹ]/g, '').length;
  const co = [];
  if (soLink >= 4) co.push(`có ${soLink} liên kết`);
  if (chu > 40 && hoa / chu > 0.6) co.push('viết hoa gần hết bài');
  if (/(.)\1{9,}/.test(s)) co.push('lặp ký tự bất thường');
  return co;
}
