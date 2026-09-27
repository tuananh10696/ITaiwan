// =============================================================
// GỘP TÊN TRƯỜNG cho màn "Tiến độ theo trường" (2026-09-25)
// =============================================================
// Tên trường trong hồ sơ du học là CHỮ TỰ DO: học sinh tự khai ở cổng học sinh, tư vấn viên gõ ở
// form quản trị. Cùng một trường nên ra nhiều cách viết — "Đại học Thành Công (NCKU)", "đại học
// thành công", "ĐH Thành Công", "Trường Đại học Thành Công", "NCKU". Nhóm theo chuỗi nguyên văn
// thì mỗi cách viết thành một "trường" riêng và con số "trường này có bao nhiêu em" vô nghĩa.
//
// Gộp theo KHOÁ CHUẨN HOÁ, cố ý dè dặt: gộp nhầm hai trường khác nhau tệ hơn để sót hai cách viết
// của cùng một trường. Cách viết sót vẫn hiện thành hai thẻ cạnh nhau và ai nhìn cũng thấy; gộp
// nhầm thì học sinh trường này nằm lẫn trong danh sách trường kia mà không ai hay.
//
//   1. KHOÁ GỐC: NFKC -> bỏ phần trong ngoặc -> chữ thường -> bỏ dấu tiếng Việt, đ -> d -> giản thể
//      sang phồn thể (台 -> 臺, 学 -> 學…) -> bỏ dấu câu -> bỏ tiền tố "trường", "ĐH"/"Đ.H" -> "đại học".
//   2. PHẦN TRONG NGOẶC chỉ bị bỏ khi nó KHÔNG cần để phân biệt. Cùng một khoá gốc mà đi kèm từ hai
//      "định danh" trong ngoặc trở lên — "Đại học Khoa học Kỹ thuật (NTUST)" / "(NKUST)", "Đại học
//      Sư phạm (Đài Bắc)" / "(Cao Hùng)" — thì đó là NHIỀU trường khác nhau: tách theo định danh,
//      còn tên trơn không ngoặc thì để riêng một thẻ vì không biết là trường nào. Định danh cùng đi
//      chung trong một ngoặc ("(NTNU / SHIDA)") được coi là của cùng một trường. Ghi chú kiểu "(hệ
//      2+2)", "(Hoa ngữ)", "(NV1)" không phải định danh trường, bỏ qua.
//   3. VIẾT TẮT ĐỨNG MỘT MÌNH ("NCKU") gộp vào trường có đúng viết tắt đó trong ngoặc, CHỈ khi viết
//      tắt ấy thuộc về đúng MỘT trường trong dữ liệu, và không nằm trong danh sách viết tắt đã biết
//      là mơ hồ (CCU vừa là Trung Chính vừa hay bị dùng cho Văn Hoá Trung Quốc).
// KHÔNG gộp hai tên ĐẦY ĐỦ chỉ vì chung viết tắt trong ngoặc — làm vậy là gộp luôn hai trường khác
// nhau có cùng viết tắt. "國立成功大學 (NCKU)" và "Đại học Thành Công (NCKU)" vì thế vẫn là hai thẻ.
// Câu kiểu "Chưa chọn trường", "Đang tìm hiểu", "Chưa có kết quả" không phải tên trường.
//
// File thuần (không đụng DB) để kiểm thử được riêng: tests/nhom-truong.test.mjs.

/** Nội dung trong ngoặc: tròn, vuông, 【】, 「」. Sau NFKC thì （）［］ full-width cũng về ASCII. */
const PHAN_NGOAC = /[([【「]([^()[\]【】「」]*)[)\]】」]/g;
/** Viết tắt tên trường trong ngoặc: NTU, NCKU, NTUST, N.T.U. Phải VIẾT HOA mới tính. */
const VIET_TAT = /^[A-Z][A-Z0-9&.-]{1,11}$/;
/** Khoá trông như một viết tắt đứng riêng (sau chuẩn hoá đã là chữ thường, không dấu cách). */
const KHOA_VIET_TAT = /^[a-z0-9]{2,12}$/;
/** Viết tắt đã biết là dùng cho nhiều trường — không bao giờ tự gộp khi đứng riêng. */
const VIET_TAT_MO_HO = new Set(['ccu']);

/**
 * Những gì hay gõ vào ô trường khi CHƯA có trường. Coi như để trống — nếu không, "Chưa chọn" thành
 * một "trường" đứng đầu bảng với hàng chục em, và trường đậu "Chưa có kết quả" bị đếm là đã đậu.
 * So trên khoá đã chuẩn hoá (không dấu, chữ thường), đã gọt đuôi "trường" / "trường nào".
 */
const KHONG_PHAI_TRUONG = new Set([
  'khong', 'na', 'n a', 'none', 'null', 'undefined', 'x', 'tbd', '',
]);
const CAU_CHUA_CO = /^(chua|khong (co|biet|ro|dau)|dang (tim|can nhac|suy nghi|cho|xet|chon)|cho (ket qua|xet)|truot)( |$)/;
/** Chỉ có từ chung chung, không chỉ ra trường nào. */
const TU_CHUNG = new Set([
  'dai hoc', 'cao hoc', 'hoa ngu', 'dai hoc hoa ngu', 'trung tam hoa ngu', 'hoc vien', 'truong',
  'dai loan', 'university', 'college',
]);
/** Ghi chú trong ngoặc KHÔNG phải định danh trường (hệ đào tạo, ngành, nguyện vọng, năm…). */
const GHI_CHU_NGOAC = /^(he|chuong trinh|hoa ngu|trung tam hoa ngu|thac si|tien si|cu nhan|dai hoc|cao hoc|nganh|khoa|nv\d*|nguyen vong|ky|lop|du bi|hoc bong)( |$)|^nam \d|^[\d ]+$/;

/** Chữ giản thể hay gặp trong tên trường -> phồn thể (Đài Loan dùng phồn thể). Một chiều. */
const GIAN_PHON = {
  台: '臺', 学: '學', 国: '國', 湾: '灣', 华: '華', 兴: '興', 医: '醫', 药: '藥', 师: '師', 范: '範',
  艺: '藝', 东: '東', 术: '術', 体: '體', 经: '經', 济: '濟', 传: '傳', 辅: '輔', 铭: '銘', 长: '長',
  义: '義', 联: '聯', 阳: '陽', 云: '雲', 实: '實', 践: '踐', 静: '靜', 开: '開', 龙: '龍', 亚: '亞',
  护: '護', 际: '際', 语: '語', 园: '園', 区: '區', 业: '業', 员: '員', 汉: '漢',
};
const CHU_GIAN = new RegExp(`[${Object.keys(GIAN_PHON).join('')}]`, 'g');

function boDau(s) {
  return s.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[đð]/g, 'd').replace(/[ĐÐ]/g, 'D');
}

/** Chuẩn hoá một đoạn chữ thành khoá so sánh. */
function chuanChu(s) {
  let k = boDau(String(s).toLowerCase()).replace(CHU_GIAN, (c) => GIAN_PHON[c]);
  k = k.replace(/[^\p{L}\p{N}]+/gu, ' ').trim();
  k = k.replace(/(^| )d h(?= |$)/g, '$1dh');   // "Đ.H" -> "d h" -> "dh"
  k = k.replace(/^truong /, '');
  k = k.replace(/(^| )dh(?= |$)/g, '$1dai hoc');
  return k;
}

/** Khoá chỉ là câu "chưa có trường" hoặc từ chung chung. */
function khongPhaiTruong(k) {
  const loi = k.replace(/ truong( nao)?$/, '');
  return KHONG_PHAI_TRUONG.has(loi) || CAU_CHUA_CO.test(loi) || TU_CHUNG.has(loi);
}

/** Tên hiển thị: giữ nguyên chữ người dùng gõ, chỉ gọt khoảng trắng thừa. */
export function tenGon(ten) {
  return String(ten ?? '').trim().replace(/\s+/g, ' ');
}

/**
 * Khoá GỐC của một cách viết (đã bỏ phần trong ngoặc), CHƯA tính bước tách theo ngoặc và gộp viết
 * tắt đứng riêng — hai bước đó cần nhìn cả tập, xem dungBoGop(). Chuỗi rỗng = không phải tên trường.
 */
export function khoaTruong(ten) {
  const nguyen = String(ten ?? '').normalize('NFKC');
  let k = chuanChu(nguyen.replace(PHAN_NGOAC, ' '));
  // Cả tên nằm trong ngoặc, ví dụ "(NTU)": bỏ ngoặc đi thì không còn gì -> lấy lại cả chuỗi.
  if (!k) k = chuanChu(nguyen);
  return khongPhaiTruong(k) ? '' : k;
}

/** Các viết tắt khai trong ngoặc của một cách viết: "Đại học Thành Công (NCKU)" -> ['ncku']. */
export function vietTatTrongNgoac(ten) {
  const ra = [];
  for (const m of String(ten ?? '').normalize('NFKC').matchAll(PHAN_NGOAC)) {
    for (const manh of m[1].split(/[/,;]| - /)) {
      const t = manh.trim();
      if (VIET_TAT.test(t)) ra.push(t.replace(/[^A-Za-z0-9]/g, '').toLowerCase());
    }
  }
  return ra.filter((x) => x.length >= 2);
}

/**
 * "Định danh" trong ngoặc của một cách viết — viết tắt hoặc địa danh / cơ sở, đã chuẩn hoá, bỏ
 * ghi chú không liên quan tới trường. "Đại học Sư phạm (NTNU / Đài Bắc)" -> ['ntnu', 'dai bac'].
 */
export function dinhDanhNgoac(ten) {
  const ra = new Set();
  for (const m of String(ten ?? '').normalize('NFKC').matchAll(PHAN_NGOAC)) {
    for (const manh of m[1].split(/[/,;]| - /)) {
      const t = manh.trim();
      if (!t) continue;
      const k = VIET_TAT.test(t) ? t.replace(/[^A-Za-z0-9]/g, '').toLowerCase() : chuanChu(t);
      if (k && !GHI_CHU_NGOAC.test(k)) ra.add(k);
    }
  }
  return [...ra];
}

/**
 * Dựng hàm "cách viết -> khoá nhóm" từ MỌI cách viết đang có trong phạm vi người xem. Phải nhìn
 * cả tập một lượt: bước 2 cần biết một khoá gốc đi kèm bao nhiêu định danh, bước 3 cần biết một
 * viết tắt thuộc về bao nhiêu trường.
 */
export function dungBoGop(cacTen) {
  const ds = [...new Set([...cacTen].map(tenGon).filter(Boolean))];

  // --- bước 2: theo từng khoá gốc, nối các định danh đi CHUNG một cách viết thành một cụm ---
  const SEP = '\u0000';
  const cha = new Map();
  const goc = (x) => {
    let r = x;
    while (cha.get(r) !== r) r = cha.get(r);
    cha.set(x, r);
    return r;
  };
  const noi = (a, b) => {
    const [ra, rb] = [goc(a), goc(b)];
    if (ra !== rb) cha.set(ra > rb ? ra : rb, ra > rb ? rb : ra);
  };
  const tt = new Map();   // cách viết -> { k: khoá gốc, dd: định danh }
  for (const ten of ds) {
    const k = khoaTruong(ten);
    if (!k) continue;
    const dd = dinhDanhNgoac(ten).filter((x) => x !== k);   // "(NTU)" đứng một mình: chính nó
    tt.set(ten, { k, dd });
    const id = dd.map((x) => k + SEP + x);
    id.forEach((x) => { if (!cha.has(x)) cha.set(x, x); });
    for (let i = 1; i < id.length; i++) noi(id[0], id[i]);
  }
  const soCum = new Map();   // khoá gốc -> Set(gốc của cụm)
  for (const id of cha.keys()) {
    const k = id.split(SEP)[0];
    if (!soCum.has(k)) soCum.set(k, new Set());
    soCum.get(k).add(goc(id));
  }
  const khoaDay = (ten) => {
    const x = tt.get(tenGon(ten));
    if (!x) return khoaTruong(ten);
    const cum = soCum.get(x.k);
    if (!cum || cum.size < 2) return x.k;   // một định danh (hoặc không có): gộp như thường
    if (!x.dd.length) return x.k;           // tên trơn khi gốc mơ hồ: thẻ riêng, không đoán
    return `${x.k} | ${goc(x.k + SEP + x.dd[0]).split(SEP)[1]}`;
  };

  // --- bước 3: viết tắt đứng riêng -> trường DUY NHẤT có viết tắt đó trong ngoặc ---
  const chuTheo = new Map();   // viết tắt -> Set(khoá nhóm của tên đầy đủ có viết tắt đó)
  for (const [ten, { k }] of tt) {
    for (const vt of vietTatTrongNgoac(ten)) {
      if (vt === k) continue;
      if (!chuTheo.has(vt)) chuTheo.set(vt, new Set());
      chuTheo.get(vt).add(khoaDay(ten));
    }
  }
  return (ten) => {
    const k = khoaDay(ten);
    if (!k || !KHOA_VIET_TAT.test(k) || VIET_TAT_MO_HO.has(k)) return k;
    const chu = chuTheo.get(k);
    return chu && chu.size === 1 ? [...chu][0] : k;
  };
}

/** Cột trường trong hồ sơ, theo thứ tự hiển thị. `do` = trường đã đậu (truong_do). */
const VAI = [
  { vai: 'nv1', cot: 'truong_nv1' },
  { vai: 'nv2', cot: 'truong_nv2' },
  { vai: 'nv3', cot: 'truong_nv3' },
  { vai: 'do', cot: 'truong_do' },
];

/** Phạm vi đếm: mọi nguyện vọng + trường đậu | chỉ NV1 | chỉ trường đậu. */
export const PHAM_VI = {
  'tat-ca': ['nv1', 'nv2', 'nv3', 'do'],
  1: ['nv1'],
  do: ['do'],
};

/** Tên hiển thị của nhóm: cách viết xuất hiện NHIỀU nhất; hoà thì lấy tên dài hơn (thường kèm viết tắt). */
function chonTen(bienThe) {
  return [...bienThe.entries()]
    .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length || a[0].localeCompare(b[0], 'vi'))[0][0];
}

/**
 * Nhóm hồ sơ theo trường.
 *
 * @param {object[]} hoSo     hàng của du_hoc_ho_so (đã lọc phạm vi người xem ở tầng SQL)
 * @param {object}   opt
 * @param {string}   opt.phamVi   khoá của PHAM_VI
 * @param {string[]} opt.thuTuBuoc mã bước theo thứ tự hiển thị, để xếp học sinh trong nhóm
 * @param {Function} [opt.gop]    bộ gộp dựng sẵn từ dungBoGop(); không truyền thì dựng từ `hoSo`
 * @returns {{ truong: object[], chuaKhai: object[] }}
 */
export function nhomTheoTruong(hoSo, { phamVi = 'tat-ca', thuTuBuoc = [], gop } = {}) {
  // Object.hasOwn chứ không `PHAM_VI[phamVi] ||`: ?nv=constructor sẽ trả về hàm của Object.
  const vaiDem = Object.hasOwn(PHAM_VI, phamVi) ? PHAM_VI[phamVi] : PHAM_VI['tat-ca'];
  const cot = VAI.filter((v) => vaiDem.includes(v.vai));
  const gopKhoa = gop || dungBoGop(hoSo.flatMap((h) => VAI.map((v) => h[v.cot]).filter(Boolean)));

  const nhom = new Map();   // khoá -> { bienThe: Map(tên, số lần), hs: Map(id hồ sơ, mục) }
  const chuaKhai = [];

  for (const h of hoSo) {
    // Trường đậu tính trên MỌI phạm vi: xem theo NV1 vẫn phải biết em này đã đậu trường khác.
    const khoaDo = h.truong_do ? gopKhoa(h.truong_do) : '';
    let coTruong = false;
    for (const { vai, cot: c } of cot) {
      const ten = tenGon(h[c]);
      const k = ten ? gopKhoa(ten) : '';
      if (!k) continue;
      coTruong = true;
      if (!nhom.has(k)) nhom.set(k, { bienThe: new Map(), hs: new Map() });
      const n = nhom.get(k);
      n.bienThe.set(ten, (n.bienThe.get(ten) || 0) + 1);
      // Một em ghi cùng một trường ở hai ô (NV1 và NV2, hay NV1 rồi đậu chính trường đó) vẫn chỉ
      // là MỘT học sinh của trường ấy — gom vai trò, không đếm hai lần.
      if (!n.hs.has(h.id)) {
        n.hs.set(h.id, {
          ...h,
          vai: [],
          dau_truong_nay: !!khoaDo && khoaDo === k,
          dau_truong_khac: khoaDo && khoaDo !== k ? tenGon(h.truong_do) : null,
        });
      }
      const muc = n.hs.get(h.id);
      if (!muc.vai.includes(vai)) muc.vai.push(vai);
    }
    if (!coTruong) chuaKhai.push(h);
  }

  const viTri = (ma) => {
    const i = thuTuBuoc.indexOf(ma);
    return i < 0 ? thuTuBuoc.length : i;
  };
  const xepHs = (a, b) => viTri(a.buoc) - viTri(b.buoc)
    || String(a.ho_ten || '').localeCompare(String(b.ho_ten || ''), 'vi');

  const truong = [...nhom.entries()].map(([khoa, n]) => {
    const hs = [...n.hs.values()].sort(xepHs);
    const theoBuoc = {};
    for (const x of hs) theoBuoc[x.buoc] = (theoBuoc[x.buoc] || 0) + 1;
    const bienThe = [...n.bienThe.entries()].sort((a, b) => b[1] - a[1]).map(([t]) => t);
    return {
      khoa,
      ten: chonTen(n.bienThe),
      bien_the: bienThe.length > 1 ? bienThe : [],
      tong: hs.length,
      nv1: hs.filter((x) => x.vai.includes('nv1')).length,
      nv2: hs.filter((x) => x.vai.includes('nv2')).length,
      nv3: hs.filter((x) => x.vai.includes('nv3')).length,
      dau: hs.filter((x) => x.dau_truong_nay).length,
      theo_buoc: theoBuoc,
      hoc_sinh: hs,
    };
  });
  truong.sort((a, b) => b.tong - a.tong || a.ten.localeCompare(b.ten, 'vi'));

  return { truong, chuaKhai: chuaKhai.sort(xepHs) };
}
