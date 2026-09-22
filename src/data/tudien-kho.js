// ============================================================
// KHO TRA CỨU dùng chung cho khu "Từ vựng & Hán tự" (2026-09-08)
// ============================================================
// Bốn trang Kho từ vựng · Từ điển Trung-Việt · Sổ tay · Bộ thủ đều đọc dữ liệu qua file này.
// Dữ liệu do `npm run tudien:build` (scripts/gen-tudien.mjs) sinh ra — xem CLAUDE.md 4.37.
//
// Cùng lối viết với `giaotrinh-kho.js`: kho RỖNG lúc đầu, nạp động theo nhu cầu, gom nhiều
// lời gọi cùng lúc vào MỘT request, và xoá promise hỏng để lần sau còn thử lại được.
//
// ⚠️ NGUYÊN TẮC NẠP — đừng gộp lại thành "nạp hết cho tiện":
//   · tra bằng CHỮ HÁN  -> đi thẳng vào MẢNH của chữ đầu (~61 KB), KHÔNG cần chỉ mục nào;
//   · tra bằng pinyin / tiếng Việt / âm Hán Việt -> mới cần `kho.json` (575 KB gzip);
//   · trang Kho từ vựng luôn cần `kho.json`; trang Bộ thủ cần `bothu.json` (7 KB) rồi mới
//     tới `chu.json` (297 KB) khi mở một bộ cụ thể;
//   · trang chi tiết một từ chỉ cần `k-NN.json` (~10 KB) + `c-NN.json` (~7 KB) của đúng các
//     chữ trong từ đó — xem `napManhKho` / `napChuCua` bên dưới.
// Nhờ vậy người chỉ muốn tra một chữ không phải tải 872 KB gzip.
//
// ⚠️ Nguyên tắc này từng được ghi ở đây nhưng KHÔNG được tuân theo: `_tdxNapChiTiet` gọi thẳng
// `napKho()` + `napChu()`, tức mở một từ là kéo về gần 900 KB gzip để đọc đúng vài dòng. Đo
// bằng Playwright mới lộ ra (trang vẫn chạy đúng, chỉ nặng). Đừng quay lại lối đó.
// ============================================================

/** Số mảnh của từ điển đầy đủ — PHẢI khớp `SO_MANH` trong scripts/gen-tudien.mjs. */
export const TD_SO_MANH = 64;

/**
 * Chỉ số các trường của một hàng trong `kho.json` / `chu-don.json`.
 * Dữ liệu để dạng MẢNG (không phải object) để tiết kiệm ~40% dung lượng — bù lại mọi nơi
 * đọc phải đi qua bảng này, đừng viết `w[4]` rải rác trong renderer.
 */
export const K = {
  HAN: 0, GIAN: 1, PY: 2, HV: 3, NGHIA: 4, LOAI: 5, NHAN: 6,
  AUDIO: 7, TTS: 8, NGUON: 9, NGHIA_EN: 10,
};

/** Chỉ số các trường của một chữ trong `chu.json`. */
export const C = { HV: 0, PY: 1, BO: 2, NET: 3, NGHIA: 4, PHAN_RA: 5, PHO: 6 };

const GOC = '/data/tudien/';

// ------------------------------------------------------------------ nạp file

const _cache = new Map();
const _dangNap = new Map();

function _taiUrl(khoa, url) {
  if (_cache.has(khoa)) return Promise.resolve(_cache.get(khoa));
  if (!_dangNap.has(khoa)) {
    const p = fetch(url)
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then((j) => { _cache.set(khoa, j); _dangNap.delete(khoa); return j; })
      .catch((e) => { _dangNap.delete(khoa); throw e; });
    _dangNap.set(khoa, p);
  }
  return _dangNap.get(khoa);
}

function _tai(ten) {
  if (_cache.has(ten)) return Promise.resolve(_cache.get(ten));
  if (!_dangNap.has(ten)) {
    const p = fetch(GOC + ten)
      .then((r) => { if (!r.ok) throw new Error('HTTP ' + r.status); return r.json(); })
      .then((j) => { _cache.set(ten, j); _dangNap.delete(ten); return j; })
      // Xoá promise hỏng, nếu không thì một lần mất mạng là kẹt mãi ở bản lỗi.
      .catch((e) => { _dangNap.delete(ten); throw e; });
    _dangNap.set(ten, p);
  }
  return _dangNap.get(ten);
}

// kho.json (vốn từ dự án, 1,6 MB) đi qua API có rate-limit thay vì tải tĩnh — chặn cào cả bộ
// (2026-09-15). Các file khác vẫn tĩnh: chúng là từ điển CC BY-SA / shard nhỏ cần nạp nhanh.
// ⚠️ Key cache PHẢI là 'kho.json' (không phải 'kho'): daNap('kho.json')/layNgay('kho.json') ở
// tuvung.js tra đúng key này. Lệch key thì dữ liệu nạp về nhưng trang hiện "0 từ" — lỗi im lặng.
export const napKho = () => _taiUrl('kho.json', '/api/noi-dung/tra-cuu-kho');
export const napChuDon = () => _tai('chu-don.json');
export const napChu = () => _tai('chu.json');
export const napBoThu = () => _tai('bothu.json');
export const napMeta = () => _tai('meta.json');

/** Đã có sẵn trong bộ nhớ chưa — dùng để quyết định vẽ thẳng hay vẽ khung xương trước. */
export const daNap = (ten) => _cache.has(ten);
export const layNgay = (ten) => _cache.get(ten) || null;

/** Mảnh từ điển chứa một chữ. Chia theo CHỮ ĐẦU nên tra tiền tố nằm gọn trong một mảnh. */
export const manhCuaChu = (ch) => String(ch).codePointAt(0) % TD_SO_MANH;
const _hai = (ch) => String(manhCuaChu(ch)).padStart(2, '0');
export const napManh = (ch) => _tai(`w-${_hai(ch)}.json`);

/**
 * Mảnh của VỐN TỪ DỰ ÁN và của BẢNG CHỮ, chia cùng công thức với `w-*.json`.
 *
 * ⚠️ Đây là chỗ giữ đúng nguyên tắc đã ghi ở đầu file. Trang Từ điển tra một từ chỉ cần biết
 * từ đó có trong vốn dự án không và dữ liệu của 1-4 chữ trong nó — nạp `kho.json` (575 KB
 * gzip) + `chu.json` (297 KB gzip) cho việc đó là kéo về gần 900 KB để đọc vài dòng. Mảnh
 * tương ứng chỉ ~9 KB và ~5 KB.
 *
 * `napKho()` / `napChu()` bản đầy đủ VẪN cần cho hai chỗ thật sự duyệt toàn bộ: trang Kho từ
 * vựng (lọc/duyệt cả 10.927 từ) và trang Bộ thủ (liệt kê mọi chữ của một bộ). Đừng thay chúng
 * bằng mảnh ở hai chỗ đó.
 */
export const napManhKho = (ch) => _tai(`k-${_hai(ch)}.json`);
export const napManhChu = (ch) => _tai(`c-${_hai(ch)}.json`);

/**
 * Dữ liệu của từng chữ trong một chuỗi, gom các mảnh cần thiết vào một lượt.
 * Trả về object `{ chữ: dòng }` giống hệt hình dạng của `chu.json` để nơi gọi dùng chung code.
 */
export async function napChuCua(chuoi) {
  const cs = [...String(chuoi || '')].filter((c) => coChuHan(c));
  if (!cs.length) return {};
  const ids = [...new Set(cs.map((c) => manhCuaChu(c)))];
  const manh = await Promise.all(ids.map((i) => _tai(`c-${String(i).padStart(2, '0')}.json`)));
  const ra = {};
  for (const c of cs) {
    const m = manh[ids.indexOf(manhCuaChu(c))];
    if (m && m[c]) ra[c] = m[c];
  }
  return ra;
}

// ------------------------------------------------------------------ chuỗi

/**
 * Bỏ dấu để gõ không dấu vẫn tìm ra. Dùng chung cho pinyin ("hao" -> "hǎo"), tiếng Việt
 * ("hoc sinh" -> "học sinh") và âm Hán Việt.
 */
export function tdKhongDau(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
}

const CO_HAN = /[㐀-鿿豈-﫿]/;
export const coChuHan = (s) => CO_HAN.test(String(s || ''));

// ------------------------------------------------------------------ audio

const THU_MUC_AUDIO = {
  d: '/audio/dangdai/', h: '/audio/hsk-tu/', w: '/audio/thoidai-tu/',
  t: '/audio/tts-vi/', b: '/audio/baikhoa/', p: '/audio/pron/',
};

/** `d:B2L01-I-1` -> `/audio/dangdai/B2L01-I-1.mp3`. Trả '' khi không có. */
export function tdAudio(ma) {
  if (!ma || typeof ma !== 'string') return '';
  const i = ma.indexOf(':');
  if (i !== 1) return ma;                       // đường dẫn đầy đủ (dữ liệu cũ) thì giữ nguyên
  const tm = THU_MUC_AUDIO[ma[0]];
  return tm ? tm + ma.slice(2) + '.mp3' : '';
}

// ------------------------------------------------------------------ nhãn nguồn

/**
 * Giải mã nhãn nguồn gọn của `kho.json`:
 *   t3      -> TOCFL cấp 3          H2-8   -> HSK cấp 2, bài hsk2-8
 *   D2-5    -> Đương đại bài 2-5    Wtd3-7 -> Thời Đại bài td3-7
 * Trả `null` nếu nhãn không nhận ra (dữ liệu cũ) — nơi gọi bỏ qua chứ đừng hiện chuỗi thô.
 */
export function tdGiaiNhan(tag) {
  const s = String(tag || '');
  if (/^t[0-5]$/.test(s)) return { bo: 'tocfl', cap: s.slice(1), bai: '' };
  let m = s.match(/^H(\d)-(\d+)$/);
  if (m) return { bo: 'hsk', cap: m[1], bai: `hsk${m[1]}-${m[2]}` };
  if (s[0] === 'D') return { bo: 'duongdai', cap: (s.slice(1).match(/^(\d+)-/) || [, '1'])[1], bai: s.slice(1) };
  if (s[0] === 'W') return { bo: 'thoidai', cap: (s.slice(1).match(/^td(\d+)-/) || [, '1'])[1], bai: s.slice(1) };
  return null;
}

/** Bốn bộ nguồn, dùng cho thanh lọc của trang Kho từ vựng. */
export const TD_BO = [
  { id: 'tocfl', ten: 'TOCFL 8000', chu: '華語八千詞', mau: 'primary' },
  { id: 'hsk', ten: 'HSK 3.0', chu: 'HSK 三级九等', mau: 'seal' },
  { id: 'duongdai', ten: 'Đương đại', chu: '當代中文課程', mau: 'success' },
  { id: 'thoidai', ten: 'Thời Đại', chu: '時代華語', mau: 'warning' },
];

// ------------------------------------------------------------------ từ loại

/**
 * Vốn từ 4 bộ dùng tới 110 cách ghi từ loại khác nhau ("Danh từ", "Danh từ / Động từ", "n",
 * "Tính từ (trạng thái)"…). Thanh lọc mà bày đủ 110 nút thì không ai dùng được, nên gom về
 * 12 nhóm. Nhãn GỐC vẫn hiện nguyên trên thẻ từ — chỉ phần LỌC mới gom.
 */
const NHOM_TU_LOAI = [
  ['danh', 'Danh từ', /^(danh từ|n$|noun)/i],
  ['dong', 'Động từ', /(động từ|^v$|^vi$|verb)/i],
  ['tinh', 'Tính từ', /(tính từ|^adj)/i],
  ['pho', 'Phó từ', /(phó từ|trạng từ|^adv)/i],
  ['luong', 'Lượng từ', /(lượng từ|^m$|measure)/i],
  ['dai', 'Đại từ', /(đại từ|^pron)/i],
  ['gioi', 'Giới từ', /(giới từ|^prep)/i],
  ['lien', 'Liên từ', /(liên từ|^conj)/i],
  ['tro', 'Trợ từ', /(trợ từ|thán từ|^part)/i],
  ['so', 'Số từ', /(số từ|^num)/i],
  ['cum', 'Cụm từ · thành ngữ', /(cụm từ|thành ngữ|^id$|^ph$|phrase|idiom)/i],
];

/** Nhóm từ loại của một từ; '' nếu không xếp được. */
export function tdNhomTuLoai(pos) {
  const s = String(pos || '').trim();
  if (!s) return '';
  for (const [id, , re] of NHOM_TU_LOAI) if (re.test(s)) return id;
  return 'khac';
}
export const TD_TU_LOAI = [...NHOM_TU_LOAI.map(([id, ten]) => ({ id, ten })), { id: 'khac', ten: 'Khác' }];

// ------------------------------------------------------------------ tìm kiếm

/**
 * Chấm điểm mức khớp giữa truy vấn và một hàng.
 *
 * ⚠️ Phải xếp theo MỨC KHỚP chứ không theo thứ tự bảng — cùng bài học đã ghi ở CLAUDE.md 4.35:
 *    nghĩa của lớp từ điển máy có chứa chữ Hán tham chiếu, nên gõ 學 mà không xếp hạng thì từ
 *    đầu bảng lại là một từ chỉ khớp ở phần nghĩa, người dùng tưởng tìm kiếm hỏng.
 *
 *   6 trùng khít chữ Hán · 5 chữ Hán bắt đầu bằng · 4 chứa chữ Hán
 *   3 pinyin/âm Hán Việt trùng khít · 2 pinyin/âm Hán Việt bắt đầu bằng · 1 nghĩa
 */
function _diem(w, q, k) {
  const han = w[K.HAN], gian = w[K.GIAN] || '';
  if (han === q || gian === q) return 6;
  if (han.startsWith(q) || (gian && gian.startsWith(q))) return 5;
  if (han.includes(q) || (gian && gian.includes(q))) return 4;
  const py = tdKhongDau(w[K.PY]).replace(/\s/g, '');
  const hv = tdKhongDau(w[K.HV] || '');
  const kk = k.replace(/\s/g, '');
  if (py === kk || hv === k) return 3;
  if (py.startsWith(kk) || hv.startsWith(k)) return 2;
  if (py.includes(kk) || hv.includes(k)) return 2;
  if (tdKhongDau(w[K.NGHIA]).includes(k)) return 1;
  return 0;
}

/**
 * Tìm trong một mảng hàng đã nạp. Trả về mảng đã xếp hạng, cắt còn `gioiHan` kết quả.
 * `Array#sort` của JS ổn định từ ES2019 nên thứ tự trong cùng một mức giữ nguyên — danh sách
 * không nhảy lung tung giữa các lần gõ.
 */
export function tdTimTrong(hang, q, gioiHan = 60) {
  const tq = String(q || '').trim();
  if (!tq) return [];
  const k = tdKhongDau(tq);
  const ra = [];
  for (const w of hang) {
    const d = _diem(w, tq, k);
    if (d > 0) ra.push([d, w]);
  }
  ra.sort((a, b) => b[0] - a[0]);
  return ra.slice(0, gioiHan).map((x) => x[1]);
}

/**
 * Tra MỘT từ trong từ điển đầy đủ. Trả về mảng bản ghi (một chữ có thể có nhiều âm đọc —
 * 行 xíng/háng là hai mục riêng trong CVDICT, phải hiện đủ chứ không lấy mục đầu).
 */
export async function tdTraTu(tu) {
  if (!tu || !coChuHan(tu[0])) return [];
  const manh = await napManh(tu[0]);
  return manh.filter((r) => r[0] === tu || r[1] === tu);
}

/** Các từ BẮT ĐẦU bằng `tu` trong từ điển đầy đủ (dùng cho gợi ý và khối "từ ghép chứa chữ này"). */
export async function tdTuBatDau(tu, gioiHan = 40) {
  if (!tu || !coChuHan(tu[0])) return [];
  const manh = await napManh(tu[0]);
  return manh.filter((r) => r[0] !== tu && r[0].startsWith(tu))
    .sort((a, b) => a[0].length - b[0].length)
    .slice(0, gioiHan);
}

/** Đổi một bản ghi của mảnh từ điển sang cùng dạng hàng với `kho.json` để renderer dùng chung. */
export function tdManhSangHang(r) {
  return [r[0], r[1] || 0, r[2], 0, (r[3] || []).slice(0, 2).join('; '), 0, 0, 0, 0, 1, 0];
}
