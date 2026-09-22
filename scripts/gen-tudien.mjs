// =============================================================
// Sinh DỮ LIỆU cho khu "Từ vựng & Hán tự" (2026-09-08)
// =============================================================
//   npm run tudien:build              # sinh lại toàn bộ
//   npm run tudien:build -- --kiem    # chỉ thống kê, KHÔNG ghi file
//
// Bốn trang của khu này (Kho từ vựng · Từ điển Trung-Việt · Sổ tay · Bộ thủ) trước đây chạy
// trên 40 từ của `src/data/mockData.js`. Script này gộp mọi nguồn ĐÃ CÓ trong dự án lại thành
// một bộ dữ liệu tra cứu dùng chung cho cả bốn trang.
//
// BỐN NGUỒN (tất cả đều công khai, đều đã dùng ở chỗ khác trong dự án):
//
//   1. CVDICT (ph0ngp/CVDICT, CC-BY-SA 4.0) — từ điển Trung-Việt 122.596 mục, chuyển thể từ
//      CC-CEDICT. Đây là nguồn của trang Từ điển. Dự án đã dùng file này từ 4.34 (nghĩa Việt
//      cho HSK) nên KHÔNG tải thêm gì — cùng một file ở scripts/data-cache/hsk/CVDICT.u8.
//      ⚠️ CC-BY-SA: phần DỮ LIỆU phái sinh (public/data/tudien/w-*.json, nen.json) cũng phải
//      để CC-BY-SA và ghi nguồn. Xem public/data/tudien/GIAY-PHEP.md — đừng xoá file đó.
//
//   2. VỐN TỪ CỦA CHÍNH DỰ ÁN — 10.977 từ đã dedupe từ TOCFL 8000 + HSK 3.0 + Đương đại +
//      Thời Đại (public/data/{tocfl,hsk,giaotrinh}). Nghĩa Việt của lớp này do dự án biên
//      soạn/rà nên LUÔN THẮNG nghĩa máy của CVDICT. Lớp này cũng mang đường dẫn mp3 giọng
//      thật và nhãn cho biết từ thuộc bộ/cấp/bài nào.
//
//   3. ÂM HÁN VIỆT — phienam.txt (11.411 chữ). Đo được: phủ 2.807/2.812 chữ đang có trong
//      vốn từ dự án (99,8%). Đây là thứ CẢ APP CHƯA TỪNG CÓ, mà lại là điểm tựa lớn nhất của
//      người Việt khi nhớ chữ Hán (學 = "học", 生 = "sinh" -> 學生 "học sinh").
//      Chữ nào thiếu thì lấy kVietnamese của Unihan làm lớp bù.
//
//   4. UNIHAN (Unicode) — bộ thủ (kRSUnicode), số nét (kTotalStrokes), tần suất
//      (kHanyuPinlu), mức phổ thông (kGradeLevel). Dùng cho trang Bộ thủ và khối "phân tích
//      từng chữ" của trang Từ điển. makemeahanzi cho thêm cách phân rã chữ (⿰木木).
//
// CÁCH ĐÓNG GÓI (đã đo trên dữ liệu thật, xem CLAUDE.md 4.37):
//
//   nen.json      chỉ mục TÌM KIẾM: toàn bộ từ của dự án + toàn bộ chữ đơn (~22,6k mục,
//                 ~520 KB gzip). Tải MỘT LẦN khi mở trang, đủ cho mọi truy vấn thực tế.
//   w-<00..63>.json  TOÀN BỘ 122.596 mục, chia 64 mảnh theo `codePoint(chữ đầu) % 64`
//                 (~61 KB gzip/mảnh). Tra một chữ chỉ tải đúng mảnh chứa nó.
//                 ⚠️ Chia theo CHỮ ĐẦU chứ không băm cả từ: có vậy tra tiền tố ("學" ra
//                 學生/學校/學期) mới nằm gọn trong một mảnh.
//   chu.json      dữ liệu từng CHỮ (âm Hán Việt, bộ thủ, số nét, nghĩa) — dùng cho cả trang
//                 Bộ thủ lẫn khối phân tích chữ. Một file phục vụ hai trang.
//   bothu.json    214 bộ thủ Khang Hy.
// =============================================================

import fs from 'fs/promises';
import fss from 'fs';
import path from 'path';
import zlib from 'zlib';
import { execFileSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CACHE = path.join(__dirname, 'data-cache', 'tudien');
/** CVDICT dùng chung với bộ HSK/TOCFL — cùng một file, không tải bản thứ hai. */
const CVDICT = path.join(__dirname, 'data-cache', 'hsk', 'CVDICT.u8');
const RA = path.join(ROOT, 'public', 'data', 'tudien');

const CHI_KIEM = process.argv.includes('--kiem');

/** Số mảnh của từ điển đầy đủ. Đổi số này là PHẢI đổi `TD_SO_MANH` trong src/data/tudien-kho.js. */
const SO_MANH = 64;

const NGUON = {
  'phienam.txt': 'https://raw.githubusercontent.com/ryanphung/chinese-hanviet-cognates/master/inputs/phienam.txt',
  'dictionary.txt': 'https://raw.githubusercontent.com/skishore/makemeahanzi/master/dictionary.txt',
  'EquivalentUnifiedIdeograph.txt': 'https://www.unicode.org/Public/UCD/latest/ucd/EquivalentUnifiedIdeograph.txt',
};
/** 3 file này nằm trong Unihan.zip — tải một lần rồi giải nén. */
const UNIHAN_ZIP = 'https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip';
const UNIHAN_FILES = ['Unihan_Readings.txt', 'Unihan_IRGSources.txt', 'Unihan_DictionaryLikeData.txt'];

// ------------------------------------------------------------------ tải nguồn

async function tai(ten, url) {
  const dich = path.join(CACHE, ten);
  if (fss.existsSync(dich) && fss.statSync(dich).size > 1000) return dich;
  console.log(`   tải ${ten} …`);
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Tải ${ten} lỗi HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  // ⚠️ KHÔNG so `content-length` để phát hiện tải thiếu: máy chủ nén gzip thì header ghi số
  //    byte ĐÃ NÉN còn buf là số byte đã giải nén — phép so báo lỗi cho file hoàn toàn nguyên
  //    vẹn (đúng cái bẫy đã ghi ở CLAUDE.md 4.35 mục 2).
  await fs.mkdir(CACHE, { recursive: true });
  await fs.writeFile(dich, buf);
  return dich;
}

async function chuanBiNguon() {
  await fs.mkdir(CACHE, { recursive: true });
  for (const [ten, url] of Object.entries(NGUON)) await tai(ten, url);
  if (!UNIHAN_FILES.every((f) => fss.existsSync(path.join(CACHE, f)))) {
    const zip = await tai('Unihan.zip', UNIHAN_ZIP);
    console.log('   giải nén Unihan …');
    execFileSync('unzip', ['-o', '-q', zip, ...UNIHAN_FILES], { cwd: CACHE });
  }
  if (!fss.existsSync(CVDICT)) {
    await fs.mkdir(path.dirname(CVDICT), { recursive: true });
    const res = await fetch('https://raw.githubusercontent.com/ph0ngp/CVDICT/main/CVDICT.u8');
    await fs.writeFile(CVDICT, Buffer.from(await res.arrayBuffer()));
  }
}

const doc = (ten) => fss.readFileSync(path.join(CACHE, ten), 'utf8');

// ------------------------------------------------------------------ pinyin

const NGUYEN_AM = {
  a: 'āáǎàa', e: 'ēéěèe', i: 'īíǐìi', o: 'ōóǒòo', u: 'ūúǔùu', 'ü': 'ǖǘǚǜü',
};

/**
 * Một âm tiết pinyin kiểu CC-CEDICT (`xue2`, `nu:3`, `r5`) -> pinyin có dấu (`xué`, `nǚ`, `r`).
 *
 * Quy tắc đặt dấu: có `a` thì trên `a`; không thì `o`; không nữa thì `e`; còn lại đặt trên
 * nguyên âm CUỐI — đúng cho cả `iu`->`iù` lẫn `ui`->`uì`. Cùng quy tắc với `_ddDatThanh()`
 * bên src/main.js, đừng để hai nơi lệch nhau.
 */
function amTietCoDau(s) {
  const m = String(s).match(/^([A-Za-zü:]+?)([1-5])$/);
  if (!m) return s.replace(/u:/g, 'ü').replace(/[1-5]/g, '');
  let [, than, thanh] = m;
  than = than.replace(/u:/g, 'ü').replace(/U:/g, 'Ü');
  const t = Number(thanh);
  if (t === 5) return than;                                   // thanh nhẹ: không dấu
  const thuong = than.toLowerCase();
  let i = -1;
  for (const c of ['a', 'o', 'e']) { i = thuong.indexOf(c); if (i >= 0) break; }
  if (i < 0) for (let k = than.length - 1; k >= 0; k--) if ('iouü'.includes(thuong[k])) { i = k; break; }
  if (i < 0) return than;
  const goc = thuong[i];
  const dau = NGUYEN_AM[goc][t - 1];
  return than.slice(0, i) + (than[i] === goc ? dau : dau.toUpperCase()) + than.slice(i + 1);
}

/**
 * Cả chuỗi pinyin của CVDICT -> pinyin có dấu.
 * Từ ngắn (≤ 4 chữ Hán) thì VIẾT LIỀN các âm tiết cho khớp cách viết của vốn từ dự án
 * (`xuéshēng`); cụm/thành ngữ dài thì giữ khoảng trắng cho dễ đọc.
 */
function pinyinCoDau(py, soChu) {
  const at = String(py).trim().split(/\s+/).map(amTietCoDau);
  return at.join(soChu <= 4 ? '' : ' ');
}

/**
 * Chuẩn hoá pinyin của nguồn. 212 từ trong vốn từ dự án đang dùng dấu BREVE (ĭ ŏ ă) thay cho
 * dấu HÁC/caron (ǐ ǒ ǎ) của thanh 3 — hai dấu này gần giống nhau trên màn hình nên lọt qua
 * mọi lần rà bằng mắt, nhưng gõ "yǐn" tìm kiếm sẽ không ra "yĭn".
 * ⚠️ Đây là lỗi ở CHÍNH file nguồn (src/data/thoidaiVocab*.js …), chỗ này chỉ vá lớp tra cứu.
 */
function chuanPinyin(py) {
  return String(py || '').normalize('NFD')
    .replace(/\u0306/g, '\u030c')       // breve -> caron
    .replace(/[\u200b\u00a0]/g, '')      // ký tự trắng vô hình lọt vào khi chép dữ liệu
    .normalize('NFC').trim();
}

/** Bỏ dấu để tìm kiếm gõ không dấu vẫn ra. Dùng cho cả pinyin lẫn tiếng Việt. */
const khongDau = (s) => String(s || '').normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();

// ------------------------------------------------------------------ dọn nghĩa

/**
 * Dọn MỘT nghĩa của CVDICT.
 *
 * CC-CEDICT ghi từ tham chiếu dạng `phồn|giản[pinyin số]`. Trong một cuốn TỪ ĐIỂN thì tham
 * chiếu là thông tin có ích (khác trang từ vựng ở 4.34 — chỗ đó cắt bỏ hẳn), nên ở đây chỉ
 * làm cho nó đọc được: bỏ vế giản, đổi pinyin số thành pinyin có dấu.
 *
 * ⚠️ CHỈ bỏ vế sau khi hai vế là chữ Hán LIỀN NHAU và CÙNG ĐỘ DÀI. CVDICT còn dùng ` | ` để
 *    ngăn hai âm đọc của cùng một chữ ("jiāo: dạy… | jiào: …") — cắt ở đó là mất hẳn một nghĩa.
 */
function donNghia(s) {
  return String(s)
    .replace(/([\u4e00-\u9fff]+)\|([\u4e00-\u9fff]+)/g, (all, a, b) => (a.length === b.length ? a : all))
    .replace(/\[([A-Za-z0-9ü: ,·]+)\]/g, (all, p) => {
      const co = p.trim().split(/\s+/).map(amTietCoDau).join(' ');
      return /[1-5]/.test(p) ? `[${co}]` : all;
    })
    .replace(/\s{2,}/g, ' ')
    .trim();
}

/**
 * Chuỗi này KHÔNG phải nghĩa mà là một mẩu PINYIN lọt vào ô nghĩa.
 *
 * 109 từ trong vốn từ Thời Đại bị lỗi này ("iánnián gāoshēng" ở ô nghĩa của 年年高升, cả câu
 * ví dụ phiên âm ở ô nghĩa của 昨天晚上) — lỗi của khâu bóc dữ liệu từ PPT, không phải của
 * chỗ này. Chuỗi đó có dấu sắc nên lọt qua mọi phép thử "có phải tiếng Việt không"; dấu
 * NGANG (ā) và dấu HÁC (ǎ) thì tiếng Việt không dùng bao giờ — đó là chỗ phân biệt chắc chắn.
 *
 * Nghĩa loại này bị BỎ HẲN, không giữ lại ở trường nào: hiện ra là dạy sai, mà giữ ở ô
 * "giáo trình ghi" cũng chỉ làm người học hoang mang.
 */
const LA_PINYIN_RAC = (d) => /[āēīōūǖǎěǐǒǔǚ]/.test(String(d || ''));

/** Pinyin của nguồn có dùng được không — 3 từ Thời Đại có ô pinyin ghi đúng chữ "(TW)". */
const PINYIN_HOP_LE = (s2) => /[a-zü]/i.test(String(s2 || '')) && !/^\(.*\)$/.test(String(s2).trim());

/** Có ít nhất một dấu tiếng Việt (hoặc chữ đ). */
const CO_DAU_VIET = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

/** Phụ âm đầu và phụ âm cuối hợp lệ của tiếng Việt — dùng để nhận ra chuỗi KHÔNG phải tiếng Việt. */
const AM_DAU = ['ngh', 'ng', 'nh', 'ch', 'gh', 'gi', 'kh', 'ph', 'th', 'tr', 'qu',
  'b', 'c', 'd', 'đ', 'g', 'h', 'k', 'l', 'm', 'n', 'p', 'q', 'r', 's', 't', 'v', 'x'];
const AM_CUOI = ['ngh', 'ng', 'nh', 'ch', 'c', 'm', 'n', 'p', 't'];
const NGUYEN = 'aăâeêioôơuưy';
const TU_TIENG_ANH = /\b(to|the|of|and|or|an|in|on|for|with|by|from|is|are|be|as|at|that|this|it|its|one's|sb|sth|etc|classifier|surname|variant|used|something|someone)\b/i;

/** Một "tiếng" có phải âm tiết tiếng Việt hợp lệ không (đã bỏ dấu, chỉ còn chữ cái). */
function laAmTietViet(t) {
  if (!t || t.length > 7) return false;
  let i = 0;
  for (const d of AM_DAU) if (t.startsWith(d)) { i = d.length; break; }
  let j = i;
  while (j < t.length && NGUYEN.includes(t[j])) j++;
  if (j === i) return false;                       // không có nguyên âm -> chắc chắn không phải
  const cuoi = t.slice(j);
  return !cuoi || AM_CUOI.includes(cuoi);
}

/**
 * Nghĩa này là TIẾNG ANH hay tiếng Việt?
 *
 * ⚠️ Đừng chỉ xét "có dấu tiếng Việt hay không". Bản trước làm vậy nên "con chim" (nghĩa HSK
 *    soạn tay cho 鳥) bị xếp là tiếng Anh, thế là chữ 鳥 rơi xuống nghĩa máy của CVDICT và
 *    hiện ra một từ tục. Rất nhiều nghĩa tiếng Việt không có lấy một dấu: "mua", "sau khi",
 *    "con chim", "cam".
 *
 * Ba dấu hiệu, chỉ cần một là kết luận tiếng Anh:
 *   · có dấu tiếng Việt  -> KHÔNG phải tiếng Anh (thoát sớm);
 *   · có hư từ tiếng Anh ("to drink", "classifier for …");
 *   · có chữ w/f/j/z, hoặc có "tiếng" không phải âm tiết tiếng Việt hợp lệ ("drink" = d + r…
 *     không có nguyên âm ngay sau phụ âm đầu).
 */
function laTiengAnh(s) {
  const d = String(s || '').trim();
  if (!d) return false;
  if (CO_DAU_VIET.test(d)) return false;
  if (TU_TIENG_ANH.test(d)) return true;
  if (/[wfjz]/i.test(d)) return true;
  const tieng = d.toLowerCase().split(/[^a-zăâêôơư']+/).filter((x) => x && x.length > 1);
  if (!tieng.length) return false;
  return tieng.some((t) => !laAmTietViet(t.replace(/'/g, '')));
}

/**
 * Gỡ hai kiểu nghĩa VÔ DỤNG mà CC-CEDICT hay đặt lên đầu — cùng bài học đã ghi ở CLAUDE.md
 * 4.34b: từ điển xếp nghĩa theo thứ tự TỪ NGUYÊN chứ không theo tần suất, nên chữ càng phổ
 * thông thì nghĩa đầu càng lạ (水 = "họ Thuỷ", 鳥 = "biến thể của 屌").
 *
 *   · "họ X"            -> bỏ mệnh đề đó, giữ phần còn lại.
 *   · "biến thể của X"  -> đi tra nghĩa của chính X (chặn đệ quy 2 tầng).
 *
 * Trả về MẢNG nghĩa đã xếp lại; nếu gỡ hết thì trả về mảng gốc (thà nghĩa lạ còn hơn rỗng).
 */
function xepLaiNghia(tu, nghia, tra, sau = 0) {
  const giu = [], hoan = [];
  for (const n of nghia) {
    if (/^họ(\s|$|[;,])/u.test(n) || /^\(?tên\s+(riêng|họ)/iu.test(n)) { hoan.push(n); continue; }
    const m = /^biến thể\s*(?:cũ\s*|er\s*hoá\s*)?của\s+([一-鿿]+)/i.exec(n);
    if (m && sau < 2) {
      const goc = m[1];
      if (goc !== tu) {
        const ng = tra(goc);
        if (ng && ng.length) { giu.push(...xepLaiNghia(goc, ng, tra, sau + 1)); continue; }
      }
      hoan.push(n); continue;
    }
    giu.push(n);
  }
  const ra = [...new Set([...giu, ...hoan])];
  return ra.length ? ra : nghia;
}

/**
 * Nghĩa TÓM TẮT cho chỉ mục (thẻ từ, danh sách). Nghĩa đầy đủ luôn còn nguyên trong mảnh
 * từ điển, nên ở đây được phép cắt bớt cho gọn:
 *   · bỏ nghĩa lóng/thô tục — 綠 mà thẻ từ hiện "cắm sừng" thì không dùng được trong lớp học;
 *   · bỏ chú thích lượng từ "(Lượng từ: 片[piàn])" — thông tin ngữ pháp, không phải nghĩa.
 * Bỏ hết mà rỗng thì trả lại nghĩa đầu (thà nghĩa lạ còn hơn thẻ trống).
 */
function donDefCuoi(d) {
  const ve = String(d || '').split(/\s*;\s*/)
    .filter((x) => x && !/^\(?(tiếng lóng|thô tục|tục ngữ thô|chửi)\b/i.test(x))
    .map((x) => x.replace(/[(（]\s*(?:LT|CL|[Ll]ượng từ)\s*:[^)）]*[)）]/g, '')
      .replace(/\[[a-zA-Z0-9ü: ,·]*[1-5][a-zA-Z0-9ü: ,·]*\]/g, '')   // pinyin dạng số còn sót
      .replace(/\s{2,}/g, ' ').replace(/\s+([,;.])/g, '$1').trim())
    .filter(Boolean);
  return (ve.length ? ve : [String(d || '')]).join('; ').trim();
}

function nghiaTomTat(nghia, soNghia = 2) {
  const sach = nghia.filter((n) => !/^\(?(tiếng lóng|thô tục|tục|chửi|lóng)\b/i.test(n))
    .map((n) => n.replace(/[(（]\s*(?:LT|CL|[Ll]ượng từ)\s*:[^)）]*[)）]/g, '').replace(/\s{2,}/g, ' ').trim())
    .filter(Boolean);
  return (sach.length ? sach : nghia).slice(0, soNghia).join('; ');
}

// ------------------------------------------------------------------ đọc CVDICT

function napCvdict() {
  const re = /^(\S+) (\S+) \[([^\]]*)\] \/(.*)\/$/;
  const muc = [];
  let bo = 0;
  for (const ln of fss.readFileSync(CVDICT, 'utf8').split('\n')) {
    if (!ln || ln[0] === '#') continue;
    const g = ln.match(re);
    if (!g) { bo++; continue; }
    const [, tr, gian, py, def] = g;
    const nghia = def.split('/').map((x) => donNghia(x)).filter(Boolean);
    if (!nghia.length) { bo++; continue; }
    muc.push({ t: tr, s: gian === tr ? '' : gian, pyRaw: py, py: pinyinCoDau(py, tr.length), nghia });
  }
  return { muc, bo };
}

// ------------------------------------------------------------------ vốn từ dự án

const doJson = (p) => JSON.parse(fss.readFileSync(p, 'utf8'));

/** Rút gọn đường dẫn mp3 thành `<mã thư mục>:<tên file>` — 10.977 từ × ~25 byte tiết kiệm được. */
const THU_MUC_AUDIO = {
  d: '/audio/dangdai/', h: '/audio/hsk-tu/', w: '/audio/thoidai-tu/',
  t: '/audio/tts-vi/', b: '/audio/baikhoa/', p: '/audio/pron/',
};
function nenAudio(p) {
  if (!p) return '';
  for (const [ma, tien] of Object.entries(THU_MUC_AUDIO)) {
    if (p.startsWith(tien)) return ma + ':' + p.slice(tien.length).replace(/\.mp3$/, '');
  }
  return p;
}

/**
 * Gom vốn từ của 4 bộ. Khoá là chữ Hán PHỒN THỂ (dạng chuẩn của cả app, xem 4.11).
 * Một từ có mặt ở nhiều bộ thì gộp nhãn lại chứ không nhân bản bản ghi.
 */
function napVonTu() {
  const kho = new Map();
  /**
   * Nguồn Thời Đại ghi mục "hai cách nói" bằng dấu gạch chéo ("農民/農夫", "捷運/地鐵") — và
   * đôi khi bóc lỗi thành một vế rỗng ("/超市", "錶/"). Tách thành các từ RIÊNG: gạch chéo
   * không phải một từ, để nguyên thì Kho từ vựng có những thẻ không tra được, không nghe được
   * và không có nghĩa.
   */
  const themTach = (phon, gian, w, tag) => {
    const cat2 = (x) => String(x || '').split('/').map((y) => y.trim()).filter(Boolean);
    const vePhon = cat2(phon), veGian = cat2(gian), vePy = cat2(w.pinyin);
    if (!vePhon.length) return;
    // ⚠️ Kể cả khi chỉ còn MỘT vế vẫn phải dùng vế đã cắt, đừng trả lại chuỗi gốc: nguồn có
    //    những mục vế đầu rỗng ("/超市", "/hùshì") — giữ nguyên thì chữ Hán mang theo dấu
    //    gạch chéo, tra không ra và nghe không được.
    vePhon.forEach((p2, i) => {
      const w2 = vePy.length === vePhon.length ? { ...w, pinyin: vePy[i] }
        : (vePy.length === 1 ? { ...w, pinyin: vePy[0] } : w);
      them(p2, veGian.length === vePhon.length ? veGian[i] : (veGian.length === 1 ? veGian[0] : ''), w2, tag);
    });
  };
  const them = (phon, gian, w, tag) => {
    if (!phon) return;
    let e = kho.get(phon);
    if (!e) {
      e = { t: phon, s: gian && gian !== phon ? gian : '', tags: [], def: '', defEn: '', hangDef: -1,
        pos: '', py: '', audio: '', audioTts: '' };
      kho.set(phon, e);
    }
    if (!e.tags.includes(tag)) e.tags.push(tag);
    // Nghĩa: chọn theo HẠNG NGUỒN, không theo thứ tự nạp.
    //
    // ⚠️ Hai bản trước đều sai ở đây và cùng cho ra một triệu chứng: chữ 日 (chữ cơ bản nhất
    //    của HSK 1) hiện nghĩa "viết tắt của 日本". Lần một vì lấy "bản đầu tiên gặp được"
    //    (Thời Đại ghi "day"); lần hai vì chỉ xét "có dấu tiếng Việt hay không" — mà nghĩa
    //    máy của TOCFL cũng là tiếng Việt nên vẫn thắng nghĩa "ngày; mặt trời" HSK soạn tay.
    //    Mấu chốt: file TOCFL/HSK có sẵn trường `nguonDef` cho biết nghĩa đó do người soạn
    //    hay do máy dịch — phải đọc trường đó thay vì đoán qua hình thức chuỗi.
    const co = w.def && w.def.trim();
    if (co && !LA_PINYIN_RAC(co)) {
      const hang = laTiengAnh(co) ? 0
        : w.nguonDef === 'soan-tay' ? 3
          : (!w.nguonDef || w.nguonDef === 'du-an') ? 2 : 1;
      // Giữ lại gợi ý tiếng Anh của giáo trình — nhưng bỏ rác của nguồn ("/Vs" là mã từ loại
      // lọt vào ô nghĩa, "iǎo" là mẩu pinyin bị cắt): hiện ra chỉ làm người học hoang mang.
      if (hang === 0 && !e.defEn && co.length >= 3 && !/^[/\\]/.test(co) && /[a-z]{3}/i.test(co)) e.defEn = co;
      if (hang > (e.hangDef ?? -1)) { e.def = co; e.hangDef = hang; }
    }
    // Từ loại: bỏ qua mã viết tắt của nguồn (n · v · m · adv) khi đã có nhãn tiếng Việt.
    if (w.pos && (!e.pos || (e.pos.length <= 3 && w.pos.length > 3))) e.pos = w.pos;
    if (!e.py && w.pinyin && PINYIN_HOP_LE(w.pinyin)) e.py = chuanPinyin(w.pinyin);
    if (!e.audio && w.audio) e.audio = nenAudio(w.audio);
    if (!e.audioTts && w.audioTts) e.audioTts = nenAudio(w.audioTts);
    if (!e.s && gian && gian !== phon) e.s = gian;
  };

  // (a) Giáo trình Đương đại + Thời Đại — nghĩa biên soạn tay, ưu tiên cao nhất.
  const dirGt = path.join(ROOT, 'public', 'data', 'giaotrinh');
  for (const f of fss.readdirSync(dirGt).filter((x) => x.endsWith('.json'))) {
    const id = f.replace(/\.json$/, '');
    if (id.startsWith('hsk')) continue;                    // HSK xử lý riêng ở (c)
    // Nhãn nguồn cố ý NGẮN (D2-5 · Wtd3-7 · H3-5 · t3): 11k từ × vài byte là vài chục KB.
    // Giao diện tự dịch nhãn ra chữ qua ddLessonLabel()/tdLessonLabel(), xem `khoNhan()`.
    const tag = (id.startsWith('td') ? 'W' : 'D') + id;
    for (const w of doJson(path.join(dirGt, f)).v || []) themTach(w.hanzi, w.simplified || '', w, tag);
  }
  // (b) TOCFL — hanzi là phồn thể.
  const dirTv = path.join(ROOT, 'public', 'data', 'tocfl');
  for (const f of fss.readdirSync(dirTv).filter((x) => /^cap-L\d\.json$/.test(x))) {
    const d = doJson(path.join(dirTv, f));
    for (const w of d.tu) themTach(w.hanzi, w.simplified || '', w, 't' + d.level);
  }
  // (c) HSK — hanzi là GIẢN thể, phồn thể ở trường `traditional`.
  const dirHsk = path.join(ROOT, 'public', 'data', 'hsk');
  for (const f of fss.readdirSync(dirHsk).filter((x) => /^hsk\d+-\d+\.json$/.test(x))) {
    const cap = f.match(/^hsk(\d+)-/)[1];
    for (const w of doJson(path.join(dirHsk, f)).v || []) {
      themTach(w.traditional || w.hanzi, w.hanzi, w, 'H' + f.replace(/^hsk/, '').replace(/\.json$/, ''));
    }
  }
  return kho;
}

/**
 * Mã từ loại viết tắt của 當代/時代 (ký hiệu ngữ pháp in trong chính hai bộ sách) -> nhãn
 * tiếng Việt. Không có bảng này thì thẻ từ hiện đúng một chữ "m" hay "n" và người học không
 * hiểu gì. Chỉ còn ~118 từ dùng mã ngắn nên bảng cố tình ngắn theo.
 */
const TU_LOAI_TAT = {
  n: 'Danh từ', v: 'Động từ', vi: 'Nội động từ', vs: 'Tính từ (trạng thái)',
  m: 'Lượng từ', ph: 'Cụm từ', adv: 'Phó từ', id: 'Thành ngữ',
  det: 'Định từ', prep: 'Giới từ', conj: 'Liên từ', ptc: 'Trợ từ',
};
const chuanTuLoai = (p2) => TU_LOAI_TAT[String(p2 || '').trim().toLowerCase()] || p2 || '';

// ------------------------------------------------------------------ Unihan / chữ

function napUnihan() {
  const chu = new Map();                       // char -> { bo, net, py, en, tanSuat, lop }
  const lay = (c) => { let e = chu.get(c); if (!e) { e = {}; chu.set(c, e); } return e; };
  const kyTu = (u) => String.fromCodePoint(parseInt(u.slice(2), 16));

  for (const ln of doc('Unihan_IRGSources.txt').split('\n')) {
    if (!ln || ln[0] === '#') continue;
    const [u, k, v] = ln.split('\t');
    if (k === 'kRSUnicode') {
      // Dạng "39.13" hoặc "9.2 39.0" (nhiều bộ) hoặc "85'.3" (dạng biến thể). Lấy bộ ĐẦU.
      const g = v.split(' ')[0].match(/^(\d+)'*\.(-?\d+)$/);
      if (g) { const e = lay(kyTu(u)); e.bo = Number(g[1]); e.duNet = Number(g[2]); }
    } else if (k === 'kTotalStrokes') {
      lay(kyTu(u)).net = Number(String(v).split(' ')[0]);
    }
  }
  for (const ln of doc('Unihan_Readings.txt').split('\n')) {
    if (!ln || ln[0] === '#') continue;
    const [u, k, v] = ln.split('\t');
    if (k === 'kMandarin') lay(kyTu(u)).py = v.split(' ')[0];
    else if (k === 'kDefinition') lay(kyTu(u)).en = v;
    else if (k === 'kVietnamese') lay(kyTu(u)).hvUnihan = v.split(' ')[0];
    else if (k === 'kHanyuPinlu') {
      const g = v.match(/\((\d+)\)/);            // tần suất trong ngữ liệu Hán ngữ hiện đại
      if (g) lay(kyTu(u)).tanSuat = Number(g[1]);
    }
  }
  for (const ln of doc('Unihan_DictionaryLikeData.txt').split('\n')) {
    if (!ln || ln[0] === '#') continue;
    const [u, k, v] = ln.split('\t');
    if (k === 'kGradeLevel') lay(kyTu(u)).lop = Number(v);   // 1..6: chữ dạy ở tiểu học
  }
  return chu;
}

/** Cách phân rã chữ (⿰木木) của makemeahanzi — thuần ký hiệu, không kèm chữ tiếng Anh nào. */
function napPhanRa() {
  const m = new Map();
  for (const ln of doc('dictionary.txt').split('\n')) {
    if (!ln.trim()) continue;
    let d; try { d = JSON.parse(ln); } catch { continue; }
    if (d.decomposition && d.decomposition !== '？') m.set(d.character, d.decomposition);
  }
  return m;
}

/** Âm Hán Việt: phienam.txt là lớp chính, kVietnamese của Unihan là lớp bù. */
function napHanViet(chu) {
  const hv = new Map();
  for (const ln of doc('phienam.txt').split('\n')) {
    const i = ln.indexOf('=');
    if (i > 0) hv.set(ln.slice(0, i).trim(), ln.slice(i + 1).trim());
  }
  let bu = 0;
  for (const [c, e] of chu) if (!hv.has(c) && e.hvUnihan) { hv.set(c, e.hvUnihan); bu++; }
  return { hv, bu };
}

/** Âm Hán Việt của cả TỪ = ghép âm từng chữ. Thiếu một chữ là bỏ (thà không có còn hơn sai). */
function hanVietTu(tu, hv) {
  const cs = [...tu];
  if (!cs.length || cs.length > 8) return '';
  const am = [];
  for (const c of cs) {
    if (!/[\u3400-\u9fff]/.test(c)) return '';
    const a = hv.get(c);
    if (!a) return '';
    am.push(a);
  }
  return am.join(' ');
}

// ------------------------------------------------------------------ 214 bộ thủ

/**
 * Nghĩa tiếng Việt + âm Hán Việt của 214 bộ thủ Khang Hy.
 *
 * ⚠️ SOẠN TAY, cố ý không lấy tự động từ CVDICT: nghĩa đầu tiên của CVDICT cho chữ đơn thường
 *    là nghĩa dùng trong tiếng Trung hiện đại chứ không phải nghĩa BỘ THỦ (bộ 乙 CVDICT ghi
 *    "thứ hai; ất" — đúng, nhưng bộ này tên là "ất", nghĩa gốc là hình cây non uốn cong).
 *    Bảng dưới lấy theo cách gọi quen thuộc trong tài liệu dạy Hán tự cho người Việt.
 */
const BO_THU = `1 一 nhất|một, số một
2 丨 cổn|nét sổ thẳng
3 丶 chủ|dấu chấm
4 丿 phiệt|nét phẩy
5 乙 ất|can Ất, hình cây non uốn cong
6 亅 quyết|nét móc
7 二 nhị|hai, số hai
8 亠 đầu|phần đầu, nắp đậy
9 人 nhân|người
10 儿 nhân|người (viết ở chân chữ)
11 入 nhập|vào
12 八 bát|tám; chia tách
13 冂 quynh|vùng đất ngoài xa
14 冖 mịch|khăn trùm, che phủ
15 冫 băng|nước đá
16 几 kỷ|cái ghế nhỏ, bàn thấp
17 凵 khảm|há miệng, cái hố
18 刀 đao|con dao
19 力 lực|sức lực
20 勹 bao|bao bọc
21 匕 chuỷ|cái thìa; dao găm
22 匚 phương|đồ đựng vuông
23 匸 hệ|che giấu
24 十 thập|mười
25 卜 bốc|bói toán
26 卩 tiết|dấu ấn, đốt tre
27 厂 hán|sườn núi, mái nhà đá
28 厶 tư|riêng tư
29 又 hựu|lại nữa; bàn tay phải
30 口 khẩu|cái miệng
31 囗 vi|vây quanh
32 土 thổ|đất
33 士 sĩ|kẻ sĩ, người có học
34 夂 truy|đi đến sau
35 夊 tuy|đi chậm rãi
36 夕 tịch|buổi tối
37 大 đại|to lớn
38 女 nữ|đàn bà, con gái
39 子 tử|con cái
40 宀 miên|mái nhà
41 寸 thốn|tấc (đơn vị đo)
42 小 tiểu|nhỏ bé
43 尢 uông|yếu ớt, què
44 尸 thi|thây người chết
45 屮 triệt|mầm cây non
46 山 sơn|núi
47 巛 xuyên|sông ngòi
48 工 công|công việc; người thợ
49 己 kỷ|bản thân mình
50 巾 cân|cái khăn
51 干 can|can dự; cái khiên
52 幺 yêu|nhỏ bé, sợi tơ nhỏ
53 广 nghiễm|mái nhà rộng
54 廴 dẫn|bước dài
55 廾 củng|chắp hai tay
56 弋 dặc|bắn tên có dây buộc
57 弓 cung|cái cung
58 彐 kệ|đầu con nhím
59 彡 sam|lông tóc dài, vẻ trang sức
60 彳 xích|bước chân trái, đi
61 心 tâm|trái tim, tấm lòng
62 戈 qua|cây giáo
63 戶 hộ|cánh cửa, hộ gia đình
64 手 thủ|bàn tay
65 支 chi|cành nhánh; chống đỡ
66 攴 phộc|đánh khẽ
67 文 văn|chữ viết, văn vẻ
68 斗 đẩu|cái đấu đong
69 斤 cân|cái rìu; đơn vị cân
70 方 phương|vuông; phương hướng
71 无 vô|không có
72 日 nhật|mặt trời, ngày
73 曰 viết|nói rằng
74 月 nguyệt|mặt trăng, tháng
75 木 mộc|cây gỗ
76 欠 khiếm|thiếu; ngáp
77 止 chỉ|dừng lại
78 歹 đãi|xương tàn, xấu ác
79 殳 thù|binh khí có cán dài
80 毋 vô|chớ, đừng
81 比 tỉ|so sánh
82 毛 mao|lông
83 氏 thị|họ tộc
84 气 khí|hơi, khí
85 水 thuỷ|nước
86 火 hoả|lửa
87 爪 trảo|móng vuốt
88 父 phụ|người cha
89 爻 hào|hào của quẻ Dịch
90 爿 tường|mảnh gỗ, tấm ván
91 片 phiến|mảnh, tấm
92 牙 nha|răng
93 牛 ngưu|con trâu, con bò
94 犬 khuyển|con chó
95 玄 huyền|đen huyền, sâu kín
96 玉 ngọc|đá quý
97 瓜 qua|quả dưa
98 瓦 ngoã|ngói, đồ gốm
99 甘 cam|ngọt
100 生 sinh|sinh ra, sống
101 用 dụng|dùng
102 田 điền|ruộng
103 疋 thất|tấm vải; bàn chân
104 疒 nạch|bệnh tật
105 癶 bát|hai chân dang ra
106 白 bạch|màu trắng
107 皮 bì|da
108 皿 mãnh|bát đĩa, đồ đựng
109 目 mục|con mắt
110 矛 mâu|cây giáo
111 矢 thỉ|mũi tên
112 石 thạch|đá
113 示 thị|thần linh, tế lễ
114 禸 nhựu|vết chân thú
115 禾 hoà|lúa
116 穴 huyệt|hang, lỗ
117 立 lập|đứng
118 竹 trúc|cây tre
119 米 mễ|gạo
120 糸 mịch|sợi tơ
121 缶 phẫu|đồ sành, cái vò
122 网 võng|cái lưới
123 羊 dương|con dê, con cừu
124 羽 vũ|lông vũ
125 老 lão|già
126 而 nhi|mà, và (liên từ)
127 耒 lỗi|cái cày
128 耳 nhĩ|cái tai
129 聿 duật|cây bút
130 肉 nhục|thịt, thân thể
131 臣 thần|bề tôi
132 自 tự|tự mình; cái mũi
133 至 chí|đến
134 臼 cữu|cái cối giã
135 舌 thiệt|cái lưỡi
136 舛 suyễn|trái ngược, sai lệch
137 舟 chu|con thuyền
138 艮 cấn|quẻ Cấn, bền cứng
139 色 sắc|màu sắc, sắc đẹp
140 艸 thảo|cỏ, cây cỏ
141 虍 hô|vằn hổ
142 虫 trùng|sâu bọ
143 血 huyết|máu
144 行 hành|đi; hàng lối
145 衣 y|áo
146 襾 á|che đậy
147 見 kiến|nhìn thấy
148 角 giác|cái sừng; góc
149 言 ngôn|lời nói
150 谷 cốc|khe núi, thung lũng
151 豆 đậu|hạt đậu; đồ tế khí
152 豕 thỉ|con lợn
153 豸 trãi|loài thú có vuốt
154 貝 bối|vỏ sò, tiền của
155 赤 xích|màu đỏ
156 走 tẩu|chạy, đi
157 足 túc|bàn chân; đầy đủ
158 身 thân|thân mình
159 車 xa|cái xe
160 辛 tân|cay; can Tân
161 辰 thần|buổi sớm; chi Thìn
162 辵 sước|bước đi, chợt đi chợt dừng
163 邑 ấp|vùng đất, làng xóm
164 酉 dậu|chi Dậu; rượu
165 釆 biện|phân biệt
166 里 lý|dặm; làng
167 金 kim|kim loại, vàng
168 長 trường|dài; lớn lên
169 門 môn|cái cổng
170 阜 phụ|gò đất, đống đất
171 隶 đãi|bắt kịp, theo tới
172 隹 chuy|chim đuôi ngắn
173 雨 vũ|mưa
174 青 thanh|màu xanh
175 非 phi|không phải
176 面 diện|mặt; bề mặt
177 革 cách|da thuộc; thay đổi
178 韋 vi|da mềm; trái ngược
179 韭 cửu|rau hẹ
180 音 âm|âm thanh
181 頁 hiệt|cái đầu; trang giấy
182 風 phong|gió
183 飛 phi|bay
184 食 thực|ăn, thức ăn
185 首 thủ|cái đầu; đứng đầu
186 香 hương|mùi thơm
187 馬 mã|con ngựa
188 骨 cốt|xương
189 高 cao|cao
190 髟 tiêu|tóc dài
191 鬥 đấu|đánh nhau
192 鬯 sưởng|rượu nếp cúng tế
193 鬲 cách|cái đỉnh ba chân
194 鬼 quỷ|con quỷ
195 魚 ngư|con cá
196 鳥 điểu|con chim
197 鹵 lỗ|đất mặn, muối
198 鹿 lộc|con hươu
199 麥 mạch|lúa mạch
200 麻 ma|cây gai
201 黃 hoàng|màu vàng
202 黍 thử|lúa nếp
203 黑 hắc|màu đen
204 黹 chỉ|thêu thùa
205 黽 mãnh|con ếch
206 鼎 đỉnh|cái đỉnh
207 鼓 cổ|cái trống
208 鼠 thử|con chuột
209 鼻 tị|cái mũi
210 齊 tề|ngay ngắn, đều nhau
211 齒 xỉ|răng
212 龍 long|con rồng
213 龜 quy|con rùa
214 龠 dược|sáo ba lỗ`;

/**
 * Ghi chú vị trí biến thể — chỉ cho những bộ mà biến thể ĐỔI HẲN hình dạng, vì đó chính là
 * chỗ người học không tự nhận ra (thấy 忄 không đoán được là bộ 心).
 */
const GHI_CHU_BIEN_THE = {
  9: 'Đứng bên trái viết thành 亻 (bộ nhân đứng).',
  61: 'Đứng bên trái viết thành 忄, ở chân chữ viết thành 㣺.',
  64: 'Đứng bên trái viết thành 扌 (bộ tài gảy).',
  85: 'Đứng bên trái viết thành 氵 (ba chấm thuỷ), ở chân chữ có khi là 氺.',
  86: 'Ở chân chữ viết thành 灬 (bốn chấm hoả).',
  94: 'Đứng bên trái viết thành 犭.',
  113: 'Đứng bên trái viết thành 礻 — đừng lẫn với 衤 của bộ 衣.',
  120: 'Đứng bên trái viết thành 糹 (phồn thể) hoặc 纟 (giản thể).',
  130: 'Ghép bên trái/dưới chữ trông giống 月 của bộ Nguyệt — đây là nguồn nhầm lẫn phổ biến nhất.',
  140: 'Luôn viết thành 艹 ở trên đầu chữ.',
  145: 'Đứng bên trái viết thành 衤 — đừng lẫn với 礻 của bộ 示.',
  162: 'Viết thành 辶 (bộ sước / xước) bao lấy chữ từ trái xuống dưới.',
  163: 'Ghép bên PHẢI chữ thành 阝 (右耳刀).',
  167: 'Giản thể viết thành 钅khi đứng bên trái.',
  170: 'Ghép bên TRÁI chữ thành 阝 (左耳刀) — cùng hình với bộ 邑 nhưng khác bộ, phân biệt bằng vị trí.',
  184: 'Đứng bên trái viết thành 飠 (phồn thể) hoặc 饣 (giản thể).',
  149: 'Giản thể viết thành 讠khi đứng bên trái.',
};

/**
 * Biến thể của mỗi bộ suy THẲNG từ Unihan chứ không chép tay: một chữ có `kRSUnicode = N.0`
 * (dư 0 nét) chính là một hình dạng của bộ N. Cách này bắt được cả 亻氵扌忄艹辶灬 lẫn những
 * biến thể ít gặp mà chép tay dễ sót.
 */
function bienTheBoThu(chu) {
  const m = new Map();
  for (const [c, e] of chu) {
    if (e.duNet !== 0 || !e.bo) continue;
    // CHỈ giữ chữ trong khối CJK cơ bản (U+4E00–U+9FFF). Các khối mở rộng chứa hàng chục
    // hình dạng cổ/hiếm (𪛙 của bộ 一) — không phông chữ nào của người dùng vẽ được, hiện ra
    // chỉ là ô vuông rỗng.
    const cp = c.codePointAt(0);
    if (cp < 0x4e00 || cp > 0x9fff) continue;
    if (!m.has(e.bo)) m.set(e.bo, []);
    m.get(e.bo).push(c);
  }
  return m;
}

// ------------------------------------------------------------------ ghi file

async function ghi(ten, obj) {
  const s = JSON.stringify(obj);
  if (!CHI_KIEM) await fs.writeFile(path.join(RA, ten), s);
  return { n: Buffer.byteLength(s), gz: zlib.gzipSync(Buffer.from(s), { level: 6 }).length };
}
const kb = (n) => (n / 1024).toFixed(0) + ' KB';

// ------------------------------------------------------------------ chạy

async function main() {
  console.log('▶ Sinh dữ liệu Từ vựng & Hán tự');
  await chuanBiNguon();
  await fs.mkdir(RA, { recursive: true });

  const { muc, bo } = napCvdict();
  // Bảng tra tạm để `xepLaiNghia` đi theo được chuỗi "biến thể của X".
  const traTam = new Map();
  for (const m of muc) { if (!traTam.has(m.t)) traTam.set(m.t, m.nghia); if (m.s && !traTam.has(m.s)) traTam.set(m.s, m.nghia); }
  let daXep = 0;
  for (const m of muc) {
    const moi = xepLaiNghia(m.t, m.nghia, (k) => traTam.get(k));
    if (moi[0] !== m.nghia[0]) daXep++;
    m.nghia = moi;
  }
  console.log(`   CVDICT: ${muc.length.toLocaleString('vi')} mục (bỏ ${bo} dòng không khớp mẫu`
    + `, xếp lại nghĩa đầu cho ${daXep.toLocaleString('vi')} mục)`);

  const vonTu = napVonTu();
  console.log(`   Vốn từ dự án: ${vonTu.size.toLocaleString('vi')} từ`);

  const chu = napUnihan();
  const phanRa = napPhanRa();
  const { hv, bu } = napHanViet(chu);
  console.log(`   Âm Hán Việt: ${hv.size.toLocaleString('vi')} chữ (Unihan bù thêm ${bu})`);

  // ---- (1) mảnh từ điển đầy đủ ------------------------------------------------
  const manh = Array.from({ length: SO_MANH }, () => []);
  const theoTu = new Map();
  for (const m of muc) {
    manh[m.t.codePointAt(0) % SO_MANH].push([m.t, m.s || 0, m.py, m.nghia]);
    if (!theoTu.has(m.t)) theoTu.set(m.t, m);
    if (m.s && !theoTu.has(m.s)) theoTu.set(m.s, m);
  }
  let tongManh = 0, maxManh = 0;
  for (let i = 0; i < SO_MANH; i++) {
    const r = await ghi(`w-${String(i).padStart(2, '0')}.json`, manh[i]);
    tongManh += r.gz; maxManh = Math.max(maxManh, r.gz);
  }
  console.log(`   ${SO_MANH} mảnh từ điển: tổng ${kb(tongManh)} gzip · mảnh lớn nhất ${kb(maxManh)}`);

  // ---- (2) chỉ mục tìm kiếm ----------------------------------------------------
  // Chia làm HAI file theo mục đích dùng, không gộp một khối:
  //   kho.json      từ của chính dự án — trang Kho từ vựng LUÔN cần đủ bộ này để duyệt/lọc.
  //   chu-don.json  chữ đơn của CVDICT chưa nằm trong kho — chỉ nạp NỀN, hoặc khi truy vấn
  //                 ra quá ít kết quả. Tách ra để trang Kho từ vựng khỏi gánh 215 KB nó
  //                 không dùng tới.
  // Truy vấn bằng CHỮ HÁN không cần file nào trong hai file này: đi thẳng vào mảnh ở (1).
  /**
   * Một hàng của chỉ mục. Thứ tự trường PHẢI khớp bảng `K` trong src/data/tudien-kho.js.
   *   0 phồn · 1 giản(0=trùng) · 2 pinyin · 3 âm Hán Việt · 4 nghĩa · 5 từ loại
   *   6 nhãn nguồn · 7 mp3 giọng thật · 8 mp3 giọng máy · 9 nguồn nghĩa (0 dự án/1 từ điển máy)
   *   10 nghĩa tiếng Anh của giáo trình (chỉ có khi trường 4 phải mượn từ điển)
   */
  const hangNen = (t, s2, py, def, pos, tags, audio, audioTts, ngDef, defEn) =>
    [t, s2 || 0, py, hanVietTu(t, hv) || 0, def, pos || 0, tags && tags.length ? tags : 0,
      audio || 0, audioTts || 0, ngDef || 0, defEn || 0];
  /**
   * Sắp theo pinyin không dấu: danh sách mặc định đọc được, và gzip nén tốt hơn.
   * ⚠️ Từ KHÔNG có pinyin phải xếp CUỐI. 14 từ của Thời Đại mất pinyin ở khâu bóc dữ liệu
   *    (đều là mục ghi hai dạng chữ, kiểu "農民/農夫"); để chuỗi rỗng sắp trước thì đúng 14 từ
   *    hỏng đó chiếm trọn đầu trang 1 của Kho từ vựng — người mở trang lần đầu thấy ngay
   *    những thẻ trông như lỗi.
   */
  const xepPy = (a, b) => {
    if (!a[2] !== !b[2]) return a[2] ? -1 : 1;
    // Bỏ dấu câu ở đầu trước khi so ("-àn" của 案, "(yí)…"), nếu không mấy mục đó chiếm đầu bảng.
    const bo = (v) => khongDau(v).replace(/^[^a-zü]+/, '');
    const x = bo(a[2]), y = bo(b[2]);
    return x < y ? -1 : x > y ? 1 : 0;
  };

  const kho = [];
  let buNghiaViet = 0, khongCoNghia = 0, boVoDung = 0;
  for (const [t, e] of vonTu) {
    const cv = theoTu.get(t);
    const nghiaCv = cv ? nghiaTomTat(cv.nghia) : '';
    let def = e.def, ngDef = e.hangDef === 1 ? 1 : 0, defEn = e.defEn || '';
    // 4.319/10.950 từ của dự án đang mang nghĩa TIẾNG ANH — toàn bộ là Đương đại quyển 5-6
    // (CLAUDE.md 4.26e đã ghi nhận đây là lỗ dữ liệu). CVDICT phủ 90% số đó, nên ở đây lấy
    // nghĩa Việt của từ điển làm nghĩa CHÍNH và GIỮ LẠI nguyên văn gợi ý tiếng Anh của giáo
    // trình ở trường riêng — nghĩa máy đôi khi lệch văn cảnh (工夫 -> "người lao động"),
    // có bản tiếng Anh bên cạnh thì người học tự đối chiếu được.
    // ⚠️ Đây chỉ vá ở lớp TRA CỨU. `src/data/duongdaiVocab5/6.js` vẫn còn nguyên nghĩa tiếng
    //    Anh, nên tab Từ vựng của giáo trình Q5-Q6 vẫn hiện tiếng Anh — việc khác, chưa làm.
    if (def && e.hangDef === 0 && nghiaCv && !laTiengAnh(nghiaCv)) {
      defEn = defEn || def; def = nghiaCv; ngDef = 1; buNghiaViet++;
    } else if (!def) {
      def = nghiaCv; ngDef = nghiaCv ? 1 : 0;
      if (!def) khongCoNghia++;
    }
    const pyCuoi = chuanPinyin(e.py || (cv ? cv.py : ''));
    const defCuoi = donDefCuoi(def);
    // Không pinyin VÀ không nghĩa -> thẻ trống trơn, không tra được cũng không học được gì.
    // Đều là mảnh vụn của khâu bóc dữ liệu Thời Đại ("我游泳"), bỏ hẳn khỏi kho tra cứu.
    if (!pyCuoi && !defCuoi && !defEn) { boVoDung++; continue; }
    kho.push(hangNen(t, e.s || (cv ? cv.s : ''), pyCuoi,
      defCuoi, chuanTuLoai(e.pos), e.tags, e.audio, e.audioTts, ngDef, defEn));
  }
  kho.sort(xepPy);
  const rKho = await ghi('kho.json', kho);
  // Mảnh của kho, chia y hệt w-*.json (codePoint chữ đầu % 64). Trang Từ điển chỉ cần biết
  // MỘT từ có nằm trong vốn dự án không (để lấy audio thật + nhãn nguồn) — trước đây nó kéo
  // nguyên kho.json 575 KB gzip về chỉ để `find()` một dòng. Mỗi mảnh ~9 KB.
  const manhKho = Array.from({ length: SO_MANH }, () => []);
  for (const w of kho) manhKho[String(w[0]).codePointAt(0) % SO_MANH].push(w);
  let gzKho = 0;
  for (let i = 0; i < SO_MANH; i++) {
    gzKho += (await ghi(`k-${String(i).padStart(2, '0')}.json`, manhKho[i])).gz;
  }
  console.log(`   ${SO_MANH} mảnh kho: tổng ${kb(gzKho)} gzip · trung bình ${kb(gzKho / SO_MANH)}`);
  console.log(`   kho.json: ${kho.length.toLocaleString('vi')} từ dự án · ${kb(rKho.n)} · ${kb(rKho.gz)} gzip`
    + ` (mượn nghĩa Việt của từ điển cho ${buNghiaViet.toLocaleString('vi')} từ vốn ghi tiếng Anh`
    + `${khongCoNghia ? `, ${khongCoNghia} từ chưa có nghĩa nào` : ''}`
    + `${boVoDung ? `, bỏ ${boVoDung} mục vụn không pinyin lẫn nghĩa` : ''})`);

  const chuDon = [];
  for (const m of muc) {
    if ([...m.t].length === 1 && !vonTu.has(m.t)) {
      chuDon.push(hangNen(m.t, m.s, m.py, nghiaTomTat(m.nghia), '', null, '', '', 1, ''));
    }
  }
  chuDon.sort(xepPy);
  const rCd = await ghi('chu-don.json', chuDon);
  console.log(`   chu-don.json: ${chuDon.length.toLocaleString('vi')} chữ đơn · ${kb(rCd.gz)} gzip`);

  // ---- (3) dữ liệu từng chữ ---------------------------------------------------
  // Phạm vi: mọi chữ có mặt trong CVDICT hoặc trong vốn từ dự án. MỘT file phục vụ hai chỗ:
  //   · trang Bộ thủ — lọc theo trường `bo` để ra danh sách chữ của một bộ (không cần 214
  //     file con: nạp một lần rồi mọi bộ đều mở tức thì);
  //   · trang Từ điển — khối "phân tích từng chữ" của một từ.
  // Nạp LƯỜI, chỉ khi mở chi tiết. Nghĩa cắt ngắn 28 ký tự vì ở hai chỗ trên nó chỉ là nhãn
  // phụ; nghĩa đầy đủ luôn có trong mảnh ở (1).
  const canChu = new Set();
  // ⚠️ PHẢI quét CẢ vế GIẢN THỂ. Bản đầu chỉ quét vế phồn thể (`m.t`, và khoá của `vonTu`
  //    cũng là phồn thể) nên toàn bộ chữ chỉ tồn tại ở dạng giản (这 们 说 国 会 学 个 …) KHÔNG
  //    có mặt trong chu.json — mất 24% số chữ thông dụng nhất. Hậu quả: trang Bộ thủ không có
  //    lấy một chữ giản thể nào (trong khi cả module HSK của app dạy bằng giản thể), và khối
  //    "phân tích từng chữ" của Từ điển để trống khi người dùng bật chế độ 简.
  for (const m of muc) {
    for (const c of m.t) if (/[㐀-鿿]/.test(c)) canChu.add(c);
    for (const c of m.s || '') if (/[㐀-鿿]/.test(c)) canChu.add(c);
  }
  for (const [t, e] of vonTu) {
    for (const c of t) if (/[㐀-鿿]/.test(c)) canChu.add(c);
    for (const c of e.s || '') if (/[㐀-鿿]/.test(c)) canChu.add(c);
  }
  for (const [c, e] of chu) if (e.duNet === 0 && e.bo) canChu.add(c);   // hình biến thể của bộ
  const catNghia = (s2, n = 28) => {
    const x = String(s2 || '');
    if (x.length <= n) return x;
    const p = x.slice(0, n);
    for (const sep of ['; ', ', ']) { const i2 = p.lastIndexOf(sep); if (i2 > 8) return p.slice(0, i2); }
    return p.trim();
  };
  const chuDuAn = new Set();
  for (const [t, e] of vonTu) {
    for (const c of t) if (/[㐀-鿿]/.test(c)) chuDuAn.add(c);
    for (const c of e.s || '') if (/[㐀-鿿]/.test(c)) chuDuAn.add(c);
  }
  const chuRa = {};
  let thieuHv = 0, thieuBo = 0;
  for (const c of [...canChu].sort()) {
    const e = chu.get(c) || {};
    const cv = theoTu.get(c);
    const amHv = hv.get(c) || '';
    if (!amHv) thieuHv++;
    if (!e.bo) thieuBo++;
    chuRa[c] = [
      amHv,
      e.py ? amTietCoDau(e.py) : (cv ? cv.py : ''),
      e.bo || 0,
      e.net || 0,
      // Nghĩa của DỰ ÁN thắng nghĩa máy (chỉ khi là tiếng Việt) — nếu không thì 水 hiện
      // "họ Thuỷ" và 鳥 hiện "biến thể của 屌", đúng lỗi đã ghi ở 4.34b.
      catNghia((() => {
        const vt = vonTu.get(c);
        if (vt && vt.def && !laTiengAnh(vt.def)) return vt.def;
        return cv ? nghiaTomTat(cv.nghia) : (vt ? vt.def : '');
      })()),
      // Bỏ cách phân rã còn dấu ？ (makemeahanzi chưa xác định được thành phần) — hiện ra
      // chỉ làm người học rối chứ không thêm thông tin gì.
      (phanRa.get(c) || '').includes('？') ? '' : (phanRa.get(c) || ''),
      // Chữ này có xuất hiện trong vốn từ 4 bộ giáo trình không (2.812/12.103 chữ).
      // Trang Bộ thủ xếp nhóm này lên TRƯỚC: bộ 水 có 622 chữ mà xếp theo số nét thì mở ra
      // toàn 氿 汃 汄 — người học tưởng bộ thủ chẳng liên quan gì tới chữ mình đang học.
      chuDuAn.has(c) ? 1 : 0,
    ];
  }
  const rChu = await ghi('chu.json', chuRa);
  // Mảnh của chu, cùng cách chia. Trang Từ điển phân tích 1-4 chữ của một từ; nạp cả bản đồ
  // 14.580 chữ (297 KB gzip) cho ngần ấy là phí. Trang Bộ thủ thì VẪN cần bản đầy đủ (nó liệt
  // kê mọi chữ thuộc một bộ) nên `chu.json` giữ nguyên, đây là file THÊM chứ không thay thế.
  const manhChu = Array.from({ length: SO_MANH }, () => ({}));
  for (const [c, v] of Object.entries(chuRa)) manhChu[c.codePointAt(0) % SO_MANH][c] = v;
  let gzChu = 0;
  for (let i = 0; i < SO_MANH; i++) {
    gzChu += (await ghi(`c-${String(i).padStart(2, '0')}.json`, manhChu[i])).gz;
  }
  console.log(`   ${SO_MANH} mảnh chữ: tổng ${kb(gzChu)} gzip · trung bình ${kb(gzChu / SO_MANH)}`);
  console.log(`   chu.json: ${Object.keys(chuRa).length.toLocaleString('vi')} chữ · ${kb(rChu.gz)} gzip`
    + ` (thiếu âm HV ${thieuHv} · thiếu bộ ${thieuBo})`);

  // ---- (4) 214 bộ thủ ---------------------------------------------------------
  const bienThe = bienTheBoThu(chu);
  const demChu = new Map();
  for (const [c, v] of Object.entries(chuRa)) {
    if (v[2]) demChu.set(v[2], (demChu.get(v[2]) || 0) + 1);
  }
  const boThu = BO_THU.trim().split('\n').map((ln) => {
    const g = ln.match(/^(\d+) (\S+) ([^|]+)\|(.+)$/);
    if (!g) throw new Error('Dòng bộ thủ sai định dạng: ' + ln);
    const so = Number(g[1]), c = g[2];
    const e = chu.get(c) || {};
    const bt = (bienThe.get(so) || []).filter((x) => x !== c);
    return {
      so, chu: c,
      kx: String.fromCodePoint(0x2f00 + so - 1),      // ký tự trong khối Kangxi Radicals
      bien: bt,
      py: e.py ? amTietCoDau(e.py) : (theoTu.get(c) ? theoTu.get(c).py : ''),
      // TÊN BỘ THỦ lấy theo bảng tay, KHÔNG lấy theo phienam.txt: nhiều chữ có nhiều âm Hán
      // Việt, và tên gọi quen thuộc của bộ thường không phải âm mà từ điển chọn (bộ 干 gọi là
      // "bộ can", phienam ghi "kiền"; bộ 示 là "bộ thị", phienam ghi "kì"). Chỉ MƯỢN CHÍNH TẢ
      // của phienam khi hai bên cùng một âm ("thuỷ"/"thủy") — để bothu.json và chu.json không
      // hiện hai kiểu bỏ dấu khác nhau trong cùng một màn hình.
      hv: (hv.get(c) && khongDau(hv.get(c)) === khongDau(g[3].trim())) ? hv.get(c) : g[3].trim(),
      ngh: g[4].trim(),
      net: e.net || [...c].length,
      soChu: demChu.get(so) || 0,
      ghiChu: GHI_CHU_BIEN_THE[so] || '',
    };
  });
  if (boThu.length !== 214) throw new Error('Bảng bộ thủ phải đủ 214 bộ, đang có ' + boThu.length);
  // Đối chiếu chéo tên bộ với phienam.txt. 13 bộ dưới đây ĐÃ RÀ TAY: chữ có nhiều âm Hán
  // Việt, tên bộ dùng âm khác âm từ điển chọn — đúng, không phải lỗi. Chỗ lệch NGOÀI danh
  // sách này là dấu hiệu bảng tay sai (đã bắt được 辰 "thìn"→"thần" và 韭 "phỉ"→"cửu" nhờ nó).
  const LECH_DA_RA = new Set([16, 25, 28, 34, 51, 58, 78, 81, 103, 113, 121, 153, 166]);
  const lechHv = BO_THU.trim().split('\n').map((ln) => ln.match(/^(\d+) (\S+) ([^|]+)\|/))
    .filter((g) => g && hv.get(g[2]) && khongDau(hv.get(g[2])) !== khongDau(g[3].trim())
      && !LECH_DA_RA.has(Number(g[1])))
    .map((g) => `bộ ${g[1]} ${g[2]}: bảng tay "${g[3].trim()}" ≠ phienam "${hv.get(g[2])}"`);
  if (lechHv.length) console.log(`   ⚠ ${lechHv.length} bộ lệch âm Hán Việt CHƯA RÀ:\n      ` + lechHv.join('\n      '));
  const rBo = await ghi('bothu.json', boThu);
  console.log(`   bothu.json: 214 bộ · ${kb(rBo.gz)} gzip`);

  // ---- (5) meta + giấy phép ---------------------------------------------------
  const meta = {
    v: 1,
    ngay: new Date().toISOString().slice(0, 10),
    soMuc: muc.length,
    soChu: Object.keys(chuRa).length,
    soTuDuAn: vonTu.size,
    soKho: kho.length,
    soChuDon: chuDon.length,
    soManh: SO_MANH,
    nguon: [
      { ten: 'CVDICT', url: 'https://github.com/ph0ngp/CVDICT', giayPhep: 'CC BY-SA 4.0' },
      { ten: 'CC-CEDICT', url: 'https://www.mdbg.net/chinese/dictionary?page=cc-cedict', giayPhep: 'CC BY-SA 4.0' },
      { ten: 'Unihan Database', url: 'https://www.unicode.org/charts/unihan.html', giayPhep: 'Unicode License' },
      { ten: 'makemeahanzi', url: 'https://github.com/skishore/makemeahanzi', giayPhep: 'LGPL / Arphic PL' },
    ],
  };
  await ghi('meta.json', meta);

  if (!CHI_KIEM) {
    await fs.writeFile(path.join(RA, 'GIAY-PHEP.md'), `# Giấy phép của dữ liệu trong thư mục này

Các file \`nen.json\`, \`w-*.json\`, \`chu.json\` là **tác phẩm phái sinh của CVDICT**
(https://github.com/ph0ngp/CVDICT), bản thân CVDICT chuyển thể từ CC-CEDICT.

- Giấy phép: **Creative Commons Attribution-ShareAlike 4.0 International (CC BY-SA 4.0)**
- Nghĩa là: ai dùng lại **phần dữ liệu này** phải ghi nguồn và giữ nguyên giấy phép CC BY-SA.
- Mã nguồn của ứng dụng KHÔNG bị ràng buộc bởi giấy phép này (dữ liệu và phần mềm là hai
  tác phẩm riêng, chỉ gộp chung trong một bản phân phối).

Nguồn khác đã dùng:

| Nguồn | Dùng cho | Giấy phép |
|---|---|---|
| CVDICT / CC-CEDICT | nghĩa tiếng Việt, pinyin | CC BY-SA 4.0 |
| Unihan Database (Unicode) | bộ thủ, số nét, tần suất | Unicode License |
| makemeahanzi | cách phân rã chữ | LGPL / Arphic Public License |
| phienam.txt (ryanphung/chinese-hanviet-cognates) | âm Hán Việt | dữ liệu cộng đồng |

Giao diện phải giữ dòng ghi nguồn ở cuối trang Từ điển và trang Bộ thủ — xoá đi là vi phạm
điều kiện ghi công của CC BY-SA.
`);
  }

  console.log(CHI_KIEM ? '✔ Chỉ kiểm — không ghi file nào.' : `✔ Đã ghi vào ${path.relative(ROOT, RA)}/`);
}

main().catch((e) => { console.error('✖', e); process.exit(1); });
