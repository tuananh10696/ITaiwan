#!/usr/bin/env node
/**
 * VÁ các mục TỪ VỰNG GIÁO TRÌNH bị bộ bóc PPT làm lệch trường — 2026-09-30
 *
 *   node scripts/va-tu-vung-loi-boc.mjs --xem     # chỉ báo cáo
 *   node scripts/va-tu-vung-loi-boc.mjs           # sửa src/data/thoidaiVocab<N>.js
 *   node scripts/gen-thoidai-writing.mjs --quyen 1,2,3,4,5   # Luyện viết tách pinyin từ từ vựng
 *   npm run data:tach                              # rồi tách lại public/data/giaotrinh
 *
 * DẤU HIỆU LỖI: với từ có phiên âm bắt đầu bằng "m" hoặc "n", bộ bóc `gen-thoidai-vocab.mjs` coi
 * chữ cái đầu đó là MÃ TỪ LOẠI (N = danh từ, M = lượng từ…) rồi dồn mọi trường sang một ô:
 *
 *     美國   pos "n"   pinyin "the USA"   defEn "ěiguó"        (đúng: Měiguó · the USA)
 *     牛     pos "n"   pinyin "niú"       def   "iú"           (nghĩa Việt thành phiên âm cụt)
 *
 * Nên có BA kiểu hỏng, cả ba đều HIỆN lên thẻ từ vựng:
 *   1. ô phiên âm là chữ tiếng Anh ("the USA", "bread", "tomorrow") — 58 mục; cộng 35 mục
 *      phiên âm LỆCH sang từ bên cạnh hoặc là tiếng Anh tình cờ ghép được âm tiết (bảng SUA_LECH)
 *   2. ô NGHĨA TIẾNG VIỆT là phiên âm cụt ("iú", "iánnián") — 23 mục
 *   3. nhãn từ loại là chữ cái "m"/"n" hoặc mã tiếng Anh ("adv", "conj") — 150 mục
 *
 * CÁCH VÁ — theo thứ tự tin cậy, KHÔNG tự bịa:
 *   · Phiên âm: phiên âm GỐC của sách vẫn còn ở ô def/defEn (chỉ mất chữ cái đầu) -> ghép lại;
 *     không còn thì bảng PHIEN_AM bên dưới (pypinyin, đã soát tay theo cách viết của sách).
 *   · Nghĩa: bảng NGHIA — lấy từ CVDICT / bảng TOCFL có sẵn trong dự án, hoặc từ chính câu dịch
 *     ví dụ của bài; ghi rõ nguồn từng dòng.
 *   · Từ loại: nhãn của CÙNG chữ Hán trong bảng TOCFL (phân loại chính thức của SC-TOP) đổi sang
 *     cách ghi của giáo trình; không có thì một mục khác của giáo trình cùng chữ; vẫn không có
 *     thì để TRỐNG (giao diện tự ẩn chip) — thà không ghi còn hơn ghi sai.
 *   · Chữ tiếng Anh đã lọt vào ô phiên âm được trả về `defEn`, nếu `defEn` đang là rác.
 *
 * Chỉ đụng những mục ĐANG HỎNG (xét từng mục, không theo chữ Hán) — cùng một chữ có thể có một
 * mục lành một mục hỏng ở hai bài khác nhau.
 */
import fs from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const XEM = process.argv.includes('--xem');
const CHI_TIET = process.argv.includes('--chi-tiet');

// ------------------------------------------------------------------ kiểm "có phải pinyin không"
const { pinyinChart, pinyinChartInitials } = await import(path.join(ROOT, 'src/data/pinyinChartData.js'));
const AM = new Set();
for (const ini of pinyinChartInitials) for (const c of Object.values(pinyinChart[ini] || {})) if (c) AM.add(c[0]);
['r', 'n', 'ng', 'm', 'o', 'ao', 'ou', 'ei', 'ai', 'an', 'en', 'ang', 'eng', 'er', 'a', 'e', 'yo', 'lo', 'me',
  'ne', 'nei', 'shei', 'zhei', 'gei', 'hei', 'dei', 'tei'].forEach((x) => AM.add(x));
const boDau = (s) => String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[üÜ]/g, 'v').toLowerCase();
const tach = (t) => { if (!t) return true; for (let i = Math.min(6, t.length); i >= 1; i--) if (AM.has(t.slice(0, i)) && tach(t.slice(i))) return true; return false; };
const laPinyin = (p) => {
  const ts = boDau(p).replace(/[^a-zv]+/g, ' ').trim().split(/\s+/).filter(Boolean);
  return ts.length > 0 && ts.every(tach);
};

// ------------------------------------------------------------------ bảng sửa
/** Phiên âm chuẩn cho mục mà ô def/defEn KHÔNG còn giữ phiên âm gốc. Viết theo cách của sách:
 *  liền từ, thanh nhẹ không dấu, tên riêng viết hoa, biến điệu của 一/不 ghi theo cách đọc. */
const PHIEN_AM = {
  '美國': 'Měiguó', '南迴線': 'Nánhuí xiàn', '女兒': "nǚ'ér", '那裡/那兒': 'nàlǐ / nàr',
  '從': 'cóng', '這次': 'zhècì', '那些': 'nàxiē', '餓': 'è', '咖啡廳': 'kāfēitīng', '有': 'yǒu',
  '坐捷運': 'zuò jiéyùn', '吧': 'ba', '女生': 'nǚshēng', '男生': 'nánshēng', '麻煩': 'máfán',
  '內衣褲': 'nèiyīkù', '能力': 'nénglì', '腦': 'nǎo', '鬧鐘': 'nàozhōng', '密碼': 'mìmǎ',
  '米飯': 'mǐfàn', '檸檬汁': 'níngméngzhī', '面紙': 'miànzhǐ', '秒': 'miǎo', '根本': 'gēnběn',
  '內心深處': 'nèixīn shēnchù', '面': 'miàn', '沒': 'méi',
  // không có trong CVDICT; ô nghĩa còn giữ "èngxiǎng chéngzhēn" của sách
  '夢想成真': 'mèngxiǎng chéngzhēn',
};
/**
 * Phiên âm LỆCH: vẫn là pinyin hợp lệ nên bước kiểm "có đọc ra âm tiết không" bỏ qua, nhưng
 * không khớp chữ Hán — hoặc là chữ tiếng Anh tình cờ ghép được thành âm tiết ("young" = you+ng,
 * "face" = fa+ce), hoặc là phiên âm của TỪ BÊN CẠNH trôi sang (去 -> "juédìng" của 決定).
 * Tìm bằng cách ghép cách đọc của TỪNG chữ Hán (mọi âm đa âm) rồi so với ô phiên âm.
 *
 * Mỗi dòng: [chữ Hán, giá trị SAI hiện tại, giá trị đúng]. Chỉ thay khi ô phiên âm ĐÚNG bằng giá
 * trị sai — chạy lại script không đụng gì thêm.
 *
 * ⚠️ KHÔNG đưa vào đây những cách đọc CHUẨN ĐÀI LOAN mà pypinyin (chuẩn đại lục) coi là lệch:
 *    攜 xī · 艘 sāo · 崖 yái · 驟 zòu · 蝸 guā · 淆 yáo · 賜 sì · 垃圾 lèsè · 哎喲 āiyāo — đều ĐÚNG.
 */
const SUA_LECH = [
  ['去', 'juédìng', 'qù'], ['現在', 'xiǎoshí/', 'xiànzài'], ['五月', 'xīngqí tiān', 'wǔyuè'],
  ['星期一', 'cháng (cháng)', 'xīngqíyī'], ['我', 'pángbiān', 'wǒ'], ['百貨公司', 'bǎihuò', 'bǎihuò gōngsī'],
  ['人', 'lóuxià', 'rén'], ['樓上', 'Xièxie,', 'lóushàng'], ['年輕', 'young', 'niánqīng'], ['一', 'lǐbài', 'yī'],
  ['語言', 'yǔyán jiāohuàn', 'yǔyán'], ['年代', '（qīlíng niándài，1970∼1979）', 'niándài'],
  ['年齡', 'age', 'niánlíng'], ['進一步', 'jìngyíbù', 'jìnyíbù'], ['社群網站', 'shèqún', 'shèqún wǎngzhàn'],
  ['面', 'face', 'miàn'], ['儘管', 'jǐngguǎn', 'jǐnguǎn'], ['自動', 'dúzhě', 'zìdòng'],
  ['電子信箱', 'diànzǐ xìngxiāng', 'diànzǐ xìnxiāng'], ['信箱', 'xìngxiāng', 'xìnxiāng'], ['銀河', 'Yínghé', 'Yínhé'],
  ['農曆', 'lunar calendar', 'nónglì'], ['碼頭', 'pier', 'mǎtóu'], ['面積', 'area', 'miànjī'],
  ['食物', 'shíwù yínháng', 'shíwù'], ['無論', 'wúlùnrúhé', 'wúlùn'], ['耐心', 'patience', 'nàixīn'],
  ['環島', 'lǚxíng', 'huándǎo'], ['場所', 'chǎngshuǒ', 'chǎngsuǒ'], ['旅行', 'lǔxíng', 'lǚxíng'],
  ['迷人', 'charming, charm', 'mírén'], ['播出', 'jiānqiáng', 'bōchū'], ['忽略', 'hūluè', 'hūlüè'],
  ['策略', 'cèluè', 'cèlüè'], ['掌上明珠', 'zhǎngshànmíngzhū', 'zhǎngshàng míngzhū'],
];
/** Tiếng Anh vừa gỡ khỏi ô phiên âm ở SUA_LECH — trả về defEn nếu defEn đang trống/rác. */
const EN_LECH = new Set(['young', 'age', 'face', 'lunar calendar', 'pier', 'area', 'patience', 'charming, charm']);

/** Tên riêng: phiên âm ghép lại từ ô def/defEn vẫn phải viết hoa chữ đầu. */
const TEN_RIENG = new Set(['美國', '南迴線']);

/** Nghĩa tiếng Việt cho mục mà ô nghĩa đang là phiên âm cụt. Nguồn ghi sau dấu //. */
const NGHIA = {
  '牛': 'con bò',                                        // CVDICT; câu VD "rất nhiều con bò"
  '南': 'phía nam',                                      // CVDICT
  '牛肉麵': 'mì bò',                                     // CVDICT; câu VD "hai bát mì bò"
  '年年高升': 'năm năm thăng tiến (lời chúc Tết)',        // câu VD "năm mới thăng tiến"
  '夢到': 'mơ thấy; mơ về',                              // TOCFL/CVDICT
  '年代': 'thập niên; thời đại',                          // TOCFL/CVDICT
  '夢想成真': 'ước mơ thành hiện thực',                   // câu VD "Ước mơ sẽ thành hiện thực"
  '毛病': 'tật, chứng bệnh; khuyết điểm, trục trặc',     // CVDICT "lỗi, khuyết điểm"; câu VD "chứng đau đầu"
  '沒什麼': 'không có gì; không sao',                    // TOCFL/CVDICT
  '忙不過來': 'bận không xuể, làm không kịp',            // CVDICT; câu VD "lúc làm không xuể"
  '木頭': 'gỗ, khúc gỗ; (người) đờ đẫn',                  // TOCFL/CVDICT; câu VD "như khúc gỗ"
  '年年': 'năm nào cũng; hằng năm',                      // TOCFL/CVDICT; câu VD "năm nào cũng tới"
  '沒話說': 'khỏi phải nói, không chê vào đâu được',     // câu VD "ngon khỏi phải nói"
  '秘密': 'bí mật',                                      // TOCFL/CVDICT
  '麵條': 'mì sợi',                                      // TOCFL/CVDICT
  '密切': 'mật thiết; gần gũi',                          // CVDICT; câu VD "quan hệ mật thiết"
  '饅頭': 'bánh màn thầu',                               // TOCFL/CVDICT
  '難忘': 'khó quên',                                    // CVDICT
  '名牌': 'hàng hiệu, thương hiệu nổi tiếng',            // CVDICT; câu VD "mua hàng hiệu"
  '忙裡偷閒': 'tranh thủ lúc bận để nghỉ ngơi',          // câu VD "bận rộn mà vẫn tranh thủ được chút nhàn"
  '那還用說': 'còn phải nói, đương nhiên rồi',           // câu VD "Còn phải hỏi"
  '難得一見': 'hiếm thấy',                               // CVDICT
  '南迴線': 'tuyến đường sắt Nam Hồi',                   // câu VD "Tuyến Nam Hồi"
  '我游泳': 'tôi bơi',                                   // ô nghĩa là cả câu phiên âm của dòng khác
};

/**
 * Từ loại cho mục KHÔNG có trong bảng TOCFL và không có mục lành nào khác cùng chữ. Chỉ ghi những
 * chữ phân loại không thể tranh cãi (thành ngữ bốn chữ, tên món ăn, cụm giao tiếp cố định), theo
 * đúng cách giáo trình đang ghi các mục cùng loại (早安 · 不客氣 = "Cụm từ", 她 = "Danh từ"…).
 * Chữ còn phân vân (大聲 · 面試 · 滿月 · 也好 · 那裡/那兒 · 忙不過來) CỐ Ý để trống.
 */
const POS_TAY = {
  'Thành ngữ': ['年年有餘', '年年高升', '夢想成真', '眉飛色舞', '不以為然', '大同小異', '前所未有', '萬無一失',
    '民以食為天', '男尊女卑', '數以萬計', '瞬息萬變', '樂此不疲', '不容小覷', '忙裡偷閒', '難得一見'],
  'Cụm từ': ['對了', '沒辦法', '沒想到', '別這麼說', '那還用說', '沒話說'],
  'Danh từ': ['妳', '牛肉麵', '芒果冰', '內衣褲', '年夜飯', '年糕', '腦子', '檸檬汁', '檸檬', '面紙', '母子', '密碼',
    '農曆', '麻糬紅豆湯', '主燈', '重頭戲', '內心深處', '螞蟻上樹', '路/'],
  'Tính từ': ['難忘'],
};
const posTay = new Map(Object.entries(POS_TAY).flatMap(([nhan, ds]) => ds.map((h) => [h, nhan])));
/**
 * ĐÈ lên mọi nguồn khác: nghĩa dùng TRONG BÀI khác nhãn đầu tiên của TOCFL, hoặc mã gốc của PPT
 * tự nó đã sai. Đối chiếu bằng nghĩa + câu ví dụ của chính mục đó.
 *   命      bài td3-5 dùng nghĩa "ra lệnh" (國王命…) — TOCFL xếp N (sinh mệnh)
 *   能見度  "tầm nhìn" là danh từ — PPT ghi "vi"
 *   光合作用 "quang hợp" là danh từ — PPT ghi "ph"
 *   得很    bổ ngữ mức độ, giáo trình không có nhãn cho loại này — để trống, đừng gọi là "Động từ"
 */
const POS_DE = new Map([['命', 'Động từ'], ['能見度', 'Danh từ'], ['光合作用', 'Danh từ'], ['得很', '']]);

/**
 * Ô nghĩa là NHÃN NGỮ PHÁP ("(O)", "/V-sep)") hoặc TIẾNG ANH ("toy", "ham") — cùng một lỗi lệch
 * trường, nhưng không phải phiên âm nên bảng NGHIA ở trên không bắt được. [chữ, nghĩa SAI, nghĩa đúng];
 * chỉ thay khi ô nghĩa ĐÚNG bằng giá trị sai. Nghĩa lấy từ TOCFL/CVDICT trong dự án + câu dịch ví dụ.
 * Từ mượn đã dùng quen trong tiếng Việt (email · blog · fax) CỐ Ý giữ nguyên.
 */
const NGHIA_SAI = [
  ['坐捷運', '(O)', 'đi tàu điện ngầm (MRT)'],             // 捷運 TOCFL/CVDICT; câu VD "đi tàu điện ngầm"
  ['男人', 'man', 'đàn ông'],                               // TOCFL/CVDICT
  ['做事', '/V-sep)', 'làm việc'],                          // TOCFL/CVDICT
  ['作文', '/Vi)', 'viết văn; bài văn'],                    // TOCFL/CVDICT
  ['記錄', '/V', 'ghi chép; bản ghi chép'],                 // TOCFL/CVDICT
  ['建設', '/N', 'xây dựng; kiến thiết'],                   // TOCFL/CVDICT
  ['廣播', '/Vi', 'phát thanh; phát sóng'],                 // TOCFL/CVDICT
  ['測驗', '/V', 'kiểm tra; bài kiểm tra'],                 // TOCFL/CVDICT
  ['玩具', 'toy', 'đồ chơi'],                               // TOCFL/CVDICT
  ['大衣', 'coat', 'áo khoác dài; áo măng tô'],             // TOCFL/CVDICT
  ['帽子', 'hat, cap', 'mũ, nón'],                          // CVDICT
  ['火腿', 'ham', 'giăm bông'],                             // TOCFL/CVDICT
  ['噸', 'ton', 'tấn'],                                     // TOCFL/CVDICT
  ['嗨', 'Hi!', 'chào! (lời chào thân mật)'],              // TOCFL/CVDICT
  ['這麼/那麼', 'so', 'như thế này / như thế đó; đến mức ấy'], // TOCFL
  ['木', 'ù', 'gỗ; cây'],                                   // CVDICT; câu VD "cây cối"
  ['迎新', 'Ying Xin (貓熊名)', 'chào đón người mới (tân sinh viên)'], // CVDICT; câu VD "đón tân sinh viên"
];

/** Mã từ loại tiếng Anh còn sót -> nhãn của giáo trình (scripts/thoidai-nguon.mjs · POS_VI). */
const MA_POS = { vs: 'Tính từ', v: 'Động từ', vi: 'Nội động từ', adv: 'Phó từ', conj: 'Liên từ', ph: 'Cụm từ' };
/** Nhãn TOCFL -> cách ghi của giáo trình (hai bộ đặt tên khác nhau cho cùng mã SC-TOP). */
const TOCFL_SANG_GT = {
  'Động từ trạng thái': 'Tính từ (trạng thái)', 'Động từ biến hoá': 'Động từ',
  'Động từ biến hoá (cập vật)': 'Động từ', 'Động từ biến hoá ly hợp': 'Động từ ly hợp',
  'Tính từ (định ngữ)': 'Tính từ', 'Tính từ (vị ngữ)': 'Tính từ', 'Tính từ ly hợp': 'Tính từ',
};
/** Ô nghĩa đang là PHIÊN ÂM (thường cụt chữ cái đầu), không phải tiếng Việt. Chữ riêng của tiếng
 *  Việt (ă â đ ê ô ơ ư và các dấu chỉ tiếng Việt có) là bằng chứng chắc chắn đó là nghĩa thật. */
const CHU_VIET = /[ăâđêôơưạảấầẩẫậắằẳẵặẹẻẽếềểễệỉịọỏốồổỗộớờởỡợụủứừửữựỳỵỷỹ]/i;
const nghiaLaPhienAm = (n) => {
  const v = String(n || '').split(/\s*\/\s*/)[0].trim();
  if (!v || CHU_VIET.test(v)) return false;
  return laPinyin('m' + v) || laPinyin('n' + v);
};
const POS_HONG = (p) => ['m', 'n'].includes(String(p || '')) || !!MA_POS[String(p || '').toLowerCase()];

// ------------------------------------------------------------------ nguồn tham chiếu
const tocflPos = new Map();
for (const f of fs.readdirSync(path.join(ROOT, 'public/data/tocfl'))) {
  if (!/^cap-/.test(f)) continue;
  for (const w of JSON.parse(fs.readFileSync(path.join(ROOT, 'public/data/tocfl', f), 'utf8')).tu || []) {
    const p = String(w.pos || '').split(/\s*\/\s*/)[0].trim();
    if (p && !tocflPos.has(w.hanzi)) tocflPos.set(w.hanzi, TOCFL_SANG_GT[p] || p);
  }
}

/** Chỉ giữ chữ cái Latin đã bỏ dấu — so hai cách viết phiên âm bất kể dấu thanh / khoảng trắng. */
const chu = (s) => boDau(s).replace(/[^a-zv]/g, '');

/** Cách đọc của một từ trong từ điển Trung–Việt (CVDICT, public/data/tudien/w-NN.json). */
const _manh = new Map();
function docTuDien(h) {
  if (!h || /[/／]/.test(h)) return null;
  const i = String(h).codePointAt(0) % 64;
  if (!_manh.has(i)) {
    const f = path.join(ROOT, 'public/data/tudien', `w-${String(i).padStart(2, '0')}.json`);
    _manh.set(i, fs.existsSync(f) ? JSON.parse(fs.readFileSync(f, 'utf8')) : []);
  }
  const r = _manh.get(i).find((x) => x[0] === h && x[2]);
  // Mục viết hoa là tên riêng/họ (Niú: họ Ngưu) — ưu tiên mục viết thường nếu có.
  const thuong = _manh.get(i).find((x) => x[0] === h && x[2] && x[2] === x[2].toLowerCase());
  return (thuong || r || [])[2] || null;
}

/** Vị trí object literal của `export const <ten> = {...}` — đếm ngoặc, vì file có 2 export. */
function doiTuong(txt, ten) {
  const i = txt.indexOf(`export const ${ten}`);
  if (i < 0) return null;
  const dau = txt.indexOf('{', i);
  let sau = 0, chuoi = null;
  for (let k = dau; k < txt.length; k++) {
    const c = txt[k];
    if (chuoi) { if (c === '\\') k++; else if (c === chuoi) chuoi = null; continue; }
    if (c === '"' || c === "'") { chuoi = c; continue; }
    if (c === '{') sau++;
    else if (c === '}' && --sau === 0) return { dau, cuoi: k + 1 };
  }
  return null;
}

// Nạp cả 5 quyển trước để tra "mục khác cùng chữ" cho từ loại.
const Q = [];
for (let q = 1; q <= 5; q++) {
  const file = path.join(ROOT, 'src/data', `thoidaiVocab${q}.js`);
  const txt = fs.readFileSync(file, 'utf8');
  const kh = doiTuong(txt, `thoidaiVocab${q}`);
  Q.push({ q, file, txt, kh, data: JSON.parse(txt.slice(kh.dau, kh.cuoi)) });
}
const posLanh = new Map();
for (const { data } of Q) for (const ds of Object.values(data)) for (const w of ds) {
  if (w.pos && !POS_HONG(w.pos) && !posLanh.has(w.hanzi)) posLanh.set(w.hanzi, w.pos);
}

// ------------------------------------------------------------------ vá
const dem = { pinyin: 0, lech: 0, nghia: 0, pos: 0, posTrong: 0, defEn: 0 };
const chuaVa = [];
const posTrong = [];
const noiDau = (s) => (s ? s[0].toUpperCase() + s.slice(1) : s);

for (const Qn of Q) {
  let doi = 0;
  for (const [bai, ds] of Object.entries(Qn.data)) {
    for (const w of ds) {
      const h = w.hanzi;
      // --- 1) phiên âm ---
      if (!laPinyin(w.pinyin)) {
        const cu = w.pinyin;
        let moi = PHIEN_AM[h] || null;
        const docTD = docTuDien(h);
        if (!moi && docTD) {
          // Phiên âm GỐC của sách còn sót ở def/defEn, chỉ mất chữ cái đầu. Chỉ nhận khi ghép lại
          // KHỚP cách đọc trong từ điển (bỏ dấu, bỏ khoảng trắng) — "m" + "án" cũng là pinyin hợp
          // lệ ("mán") nhưng chữ 南 đọc là "nán", và "nào, cái nào" (nghĩa Việt) cũng lọt nếu chỉ
          // xét "có đọc ra âm tiết không".
          const khoa = chu(docTD);
          for (const fld of ['def', 'defEn']) {
            const v = String(w[fld] || '').split(/\s*\/\s*/)[0].trim();
            for (const dau of ['m', 'n']) {
              if (v && chu(dau + v) === khoa) { moi = dau + v; break; }
            }
            if (moi) break;
          }
          // Không còn dấu vết nào của bản gốc -> dùng cách đọc của từ điển.
          if (!moi) moi = TEN_RIENG.has(h) ? docTD : docTD.toLowerCase();
        }
        if (moi && TEN_RIENG.has(h)) moi = noiDau(moi);
        if (moi) {
          if (CHI_TIET) console.log(`   phiên âm ${h}: "${cu}" -> "${moi}"`);
          w.pinyin = moi;
          dem.pinyin++; doi++;
          // chữ tiếng Anh vừa gỡ khỏi ô phiên âm là nghĩa tiếng Anh của sách -> trả về defEn
          const enRac = !w.defEn || laPinyin('m' + w.defEn) || laPinyin('n' + w.defEn) || laPinyin(w.defEn);
          const laNhanNguPhap = /^(Direction\/PW|Place|Comment|Statement|Clause)$/i.test(String(cu).trim());
          if (enRac && cu && !laNhanNguPhap && /[A-Za-z]{3,}/.test(cu)) { w.defEn = String(cu).replace(/,\s*$/, ''); dem.defEn++; }
        } else chuaVa.push(`${bai} ${h} pinyin="${cu}"`);
      }
      // --- 1b) phiên âm lệch (vẫn là pinyin hợp lệ nhưng không phải của chữ này) ---
      const lech = SUA_LECH.find(([hh, sai]) => hh === h && w.pinyin === sai);
      if (lech) {
        if (CHI_TIET) console.log(`   lệch     ${h}: "${lech[1]}" -> "${lech[2]}"`);
        if (EN_LECH.has(lech[1]) && (!w.defEn || laPinyin(w.defEn) || laPinyin('m' + w.defEn) || laPinyin('n' + w.defEn))) {
          w.defEn = lech[1]; dem.defEn++;
        }
        w.pinyin = lech[2];
        dem.lech++; doi++;
      }
      // --- 2) nghĩa ---
      const nghiaSai = NGHIA_SAI.find(([hh, sai]) => hh === h && w.def === sai);
      if (nghiaSai) {
        if (CHI_TIET) console.log(`   nghĩa    ${h}: "${w.def}" -> "${nghiaSai[2]}"`);
        w.def = nghiaSai[2]; dem.nghia++; doi++;
      }
      if (NGHIA[h] && w.def !== NGHIA[h] && nghiaLaPhienAm(w.def)) {
        if (CHI_TIET) console.log(`   nghĩa    ${h}: "${w.def}" -> "${NGHIA[h]}"`);
        w.def = NGHIA[h]; dem.nghia++; doi++;
      }
      // --- 3) từ loại ---
      if (POS_HONG(w.pos)) {
        const ma = MA_POS[String(w.pos).toLowerCase()];
        const moi = POS_DE.has(h) ? POS_DE.get(h) : (ma || tocflPos.get(h) || posLanh.get(h) || posTay.get(h) || '');
        if (moi) dem.pos++; else { dem.posTrong++; posTrong.push(`${h}(${w.pos})`); }
        if (CHI_TIET) console.log(`   từ loại  ${h}: "${w.pos}" -> "${moi}"`);
        w.pos = moi;
        doi++;
      }
    }
  }
  if (doi && !XEM) {
    fs.writeFileSync(Qn.file, Qn.txt.slice(0, Qn.kh.dau) + JSON.stringify(Qn.data, null, 1) + Qn.txt.slice(Qn.kh.cuoi), 'utf8');
  }
  console.log(`Quyển ${Qn.q}: ${doi} chỗ`);
}

// ============================================================ 4) bộ tra cứu: kho.json + k-NN.json
// Trang Kho từ vựng / Từ điển / Sổ tay đọc `public/data/tudien/kho.json` (và mảnh `k-NN.json` cùng
// dạng hàng). Hai file này SINH từ vốn từ giáo trình bằng `npm run tudien:build`, nhưng bộ sinh
// cần kho nguồn (CVDICT…) không có trong repo — nên vá thẳng các hàng, lấy dữ liệu giáo trình
// VỪA SỬA ở trên làm chuẩn. Hàng: [chữ, giản, pinyin, HánViệt, nghĩa, loại, nhãn, audio, tts, máy dịch, nghĩa Anh]
const gtTot = new Map();       // chữ Hán -> mục giáo trình lành (phiên âm đọc được, nghĩa không phải phiên âm)
for (const { data } of Q) for (const ds of Object.values(data)) for (const w of ds) {
  if (gtTot.has(w.hanzi) || !laPinyin(w.pinyin) || nghiaLaPhienAm(w.def)) continue;
  gtTot.set(w.hanzi, w);
}
const SAI_BIET = new Map(SUA_LECH.map(([h, sai]) => [`${h}|${sai}`, true]));
const NHAN_NGU_PHAP = /^(Direction\/PW|Place|Comment|Statement|Clause|S|to pronounce)$/;
const PHIEN_AM_KHO = { '一': 'yī', '我游泳': 'wǒ yóuyǒng', '天氣好': 'tiānqì hǎo', '念': 'niàn', '唸': 'niàn' };
/** Mã từ loại tiếng Anh còn lọt vào cột "loại" của kho -> nhãn tiếng Việt. */
const LOAI_KHO = {
  'N/Vi': 'Danh từ / Nội động từ', 'Vs/N': 'Tính từ / Danh từ', 'Adv/N': 'Phó từ / Danh từ',
  'N/Vst': 'Danh từ / Tính từ (trạng thái)', 'Vs-attr/Adv': 'Tính từ / Phó từ', 'Vst/N': 'Tính từ (trạng thái) / Danh từ',
};
const demKho = { py: 0, nghia: 0, loai: 0, en: 0 };
const vaHang = (r) => {
  let doi = 0;
  const h = r[0];
  const g = gtTot.get(h);
  const py = String(r[2] || '');
  if (py && (!laPinyin(py) || SAI_BIET.has(`${h}|${py}`) || NHAN_NGU_PHAP.test(py))) {
    const moi = PHIEN_AM_KHO[h] || (g && g.pinyin);
    if (moi && moi !== py) { r[2] = moi; demKho.py++; doi++; }
  }
  const ns = NGHIA_SAI.find(([hh, sai]) => (hh === h || hh.split('/').includes(h)) && r[4] === sai);
  if (ns) { r[4] = ns[2]; demKho.nghia++; doi++; }
  if (nghiaLaPhienAm(r[4]) || NHAN_NGU_PHAP.test(String(r[4] || ''))) {
    const moi = NGHIA[h] || (g && !nghiaLaPhienAm(g.def) && g.def);
    if (moi && moi !== r[4]) { r[4] = moi; demKho.nghia++; doi++; }
  }
  if (LOAI_KHO[r[5]]) { r[5] = LOAI_KHO[r[5]]; demKho.loai++; doi++; }
  if (NHAN_NGU_PHAP.test(String(r[10] || ''))) { r[10] = 0; demKho.en++; doi++; }
  return doi;
};
{
  const thuMuc = path.join(ROOT, 'public/data/tudien');
  const ds = ['kho.json', ...fs.readdirSync(thuMuc).filter((f) => /^k-\d+\.json$/.test(f)).sort()];
  let soFile = 0;
  for (const f of ds) {
    const p = path.join(thuMuc, f);
    const d = JSON.parse(fs.readFileSync(p, 'utf8'));
    let n = 0;
    for (const r of d) n += vaHang(r);
    if (n) { soFile++; if (!XEM) fs.writeFileSync(p, JSON.stringify(d)); }
  }
  console.log(`\n[Tra cứu] ${soFile} file · phiên âm ${demKho.py} · nghĩa ${demKho.nghia} · loại ${demKho.loai} · nghĩa Anh rác ${demKho.en} (tính cả bản trùng trong mảnh k-NN)`);
}

console.log(`\nphiên âm: ${dem.pinyin} · phiên âm lệch: ${dem.lech} · nghĩa: ${dem.nghia} · từ loại: ${dem.pos} (+${dem.posTrong} để trống vì không có nguồn) · trả tiếng Anh về defEn: ${dem.defEn}`);
if (posTrong.length) console.log(`\nTừ loại để trống (không có nguồn tin cậy): ${posTrong.join(' ')}`);
if (chuaVa.length) { console.log(`\n⚠️  ${chuaVa.length} mục phiên âm chưa vá được:`); chuaVa.forEach((x) => console.log('   ', x)); }
if (XEM) console.log('\n(--xem: không ghi file nào)');
