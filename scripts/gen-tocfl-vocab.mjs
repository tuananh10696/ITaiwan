// =============================================================
// Sinh TỪ VỰNG TOCFL theo cấp — 華語八千詞, 6 cấp, 7.517 từ (2026-09-07)
// =============================================================
//   node scripts/gen-tocfl-vocab.mjs             # cả 6 cấp
//   node scripts/gen-tocfl-vocab.mjs --cap L0,L1 # chỉ vài cấp
//   node scripts/gen-tocfl-vocab.mjs --kiem      # chỉ đối chiếu, không ghi file
//
// BỘ TỪ: 華語八千詞 của SC-TOP (國家華語測驗推動工作委員會) — đây là danh sách từ mà ĐỀ THI
// TOCFL thật sự ra đề. CỐ Ý không dùng TBCL của 國教院 (14.425 từ): TBCL là chuẩn GIÁO DỤC,
// học viên luyện thi học theo sẽ thừa gần gấp đôi số từ mà vẫn không khớp phạm vi đề.
//
// ⚠️ GIỮ ĐÚNG 6 CẤP CHÍNH THỨC, đừng gộp lại thành 5 "level A1..C1" cho giống các trang khác:
//    học viên đăng ký thi theo đúng 6 cấp này, gộp 準備級 với 入門級 làm một là màn chọn cấp
//    không còn khớp với cái họ sắp thi.
//
// BA NGUỒN CÔNG KHAI, ghép theo chữ Hán PHỒN THỂ:
//
//   1. KHUÔN — github.com/ivankra/tocfl (bóc từ bảng chính thức tocfl.edu.tw).
//      Cho: phồn thể · giản thể · pinyin · từ loại · cấp. Cùng tác giả với ivankra/dangdai
//      và ivankra/hsk30 mà dự án đang dùng cho Đương đại (4.26c) và HSK (4.34).
//
//   2. NGHĨA TIẾNG VIỆT — ba lớp, ưu tiên từ trên xuống (đo được 98,9%):
//      a) Vốn từ CỦA CHÍNH DỰ ÁN (Đương đại + Thời Đại) — nghĩa biên soạn cho người Việt,
//         ngắn gọn, đúng văn cảnh người học. Phủ ~5.080 từ.
//      b) github.com/ph0ngp/CVDICT (CC-BY-SA) — từ điển Hán-Việt chuyển từ CC-CEDICT.
//      c) Bảng NGHIA_BU soạn tay ở dưới.
//      Trường `nguonDef` ghi lại lớp nào đã cho nghĩa, để giao diện phân biệt được.
//
//   3. AUDIO — KHÔNG có bản thu chính thức nào của SC-TOP cho bảng từ này. Nhưng ~61% số từ
//      trùng với từ vựng 2 bộ giáo trình, nên tái dùng luôn mp3 GIỌNG THẬT đã cắt sẵn
//      (MTC-NTNU và 正中書局). Phần còn lại do gen-tts-tuvung.py --bo tocfl sinh mp3 Edge TTS.
//      Xem quy ước 3 mức ở CLAUDE.md 4.27.
// =============================================================

import fs from 'fs/promises';
import fss from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const CACHE = path.join(__dirname, 'data-cache', 'tocfl');
/** CVDICT dùng chung với bộ HSK — cùng một file, không tải lại lần hai. */
const CACHE_HSK = path.join(__dirname, 'data-cache', 'hsk');

const NGUON = {
  'tocfl-202307.csv': 'https://raw.githubusercontent.com/ivankra/tocfl/master/tocfl-202307.csv',
  'CVDICT.u8': 'https://raw.githubusercontent.com/ph0ngp/CVDICT/main/CVDICT.u8',
};

/**
 * 6 cấp của 華語八千詞. `band` là nhóm chứng chỉ TOCFL (một Band gồm 2 cấp, thi chung một đề);
 * `cefr` là mức tương đương do SC-TOP công bố. Số từ ghi ở `phaiCo` dùng để ĐỐI CHIẾU CHÉO —
 * lệch một từ là script thoát lỗi chứ không ghi file (nguồn đổi bản thì phải biết ngay).
 */
const CAP = [
  { id: 'L0', nhan: 'Chuẩn bị', han: '準備級', band: '', cefr: 'A1', phaiCo: 394 },
  { id: 'L1', nhan: 'Nhập môn', han: '入門級', band: 'A', cefr: 'A2', phaiCo: 347 },
  { id: 'L2', nhan: 'Cơ sở', han: '基礎級', band: 'A', cefr: 'B1', phaiCo: 485 },
  { id: 'L3', nhan: 'Nâng cao', han: '進階級', band: 'B', cefr: 'B2', phaiCo: 1173 },
  { id: 'L4', nhan: 'Cao cấp', han: '高階級', band: 'B', cefr: 'C1', phaiCo: 2342 },
  { id: 'L5', nhan: 'Lưu loát', han: '流利級', band: 'C', cefr: 'C2', phaiCo: 2776 },
];
/** Nhãn "Level N" mà SC-TOP dùng trên chứng chỉ. Cấp chuẩn bị không có số. */
const SO_LEVEL = { L1: 1, L2: 2, L3: 3, L4: 4, L5: 5 };

/**
 * Nghĩa soạn tay cho những từ CẢ hai từ điển đều không có mục riêng — phần lớn là cụm chức
 * năng và từ ghép mà từ điển chỉ thu từng thành tố. Nghĩa dưới đây suy từ chính các thành tố,
 * gắn cờ nguonDef='soan-tay' để giao diện phân biệt được với nghĩa từ điển.
 * Sửa ở đây rồi chạy lại script — ĐỪNG sửa file JSON đã sinh, lần chạy sau ghi đè.
 * Script tự in ra danh sách từ còn thiếu sau mỗi lần chạy để soạn tiếp.
 */
const NGHIA_BU = {
  // Ba cụm chức năng: từ điển chỉ thu từng thành tố, không thu cả cụm.
  '還要': 'còn phải, còn muốn; hơn nữa',
  '說起來': 'nói ra thì, nhắc đến chuyện này thì',
  '走走': 'đi dạo, đi lại một chút (dạng lặp của 走)',
  // Ba từ dưới đây là BIẾN THỂ CHÍNH TẢ mà Đài Loan dùng, từ điển thu ở dạng kia:
  //   規畫 ⇄ 規劃 · 算帳 ⇄ 算賬 · 轉帳 ⇄ 轉賬. Nghĩa giữ đúng như dạng phổ biến.
  '規畫': 'quy hoạch, hoạch định, lên kế hoạch',
  '算帳': 'tính sổ, thanh toán sổ sách; tính sổ với ai (trả đũa)',
  '轉帳': 'chuyển khoản',
};

/**
 * Từ loại của TOCFL dùng hệ thống ngữ pháp Teng Shou-hsin (cũng là hệ dùng trong 當代中文課程),
 * KHÁC hệ của HSK. Nhãn tiếng Việt dưới đây bám đúng cách 2 bộ giáo trình hiện có đang ghi
 * (đã đối chiếu với giá trị `pos` thật trong duongdaiVocab*.js) để thẻ từ vựng không lệch chữ
 * giữa các module.
 */
const POS_VI = {
  N: 'Danh từ',
  V: 'Động từ',
  Vi: 'Nội động từ',
  'V-sep': 'Động từ ly hợp',
  Vs: 'Tính từ',
  Vst: 'Động từ trạng thái',
  'Vs-attr': 'Tính từ (định ngữ)',
  'Vs-pred': 'Tính từ (vị ngữ)',
  'Vs-sep': 'Tính từ ly hợp',
  Vp: 'Động từ biến hoá',
  Vpt: 'Động từ biến hoá (cập vật)',
  'Vp-sep': 'Động từ biến hoá ly hợp',
  Vaux: 'Trợ động từ',
  Adv: 'Phó từ',
  Conj: 'Liên từ',
  Prep: 'Giới từ',
  M: 'Lượng từ',
  Ptc: 'Trợ từ',
  Det: 'Định từ',
};
/** 'N/V' -> 'Danh từ / Động từ'. Không tra được thì trả nguyên văn (thà thô còn hơn dịch bừa). */
function posVi(pos) {
  if (!pos) return '';
  // Nguồn có lẫn 'conj' viết thường ở vài dòng — chuẩn hoá trước khi tra.
  return pos.split('/').map((p) => {
    const k = p.trim();
    if (!k) return '';
    return POS_VI[k] || POS_VI[k[0].toUpperCase() + k.slice(1)] || k;
  }).filter(Boolean).join(' / ');
}

/** Bỏ chú thích trong ngoặc, số phân biệt đồng âm, khoảng trắng — để so khớp từ điển. */
const chuanHoa = (h) => (h || '').replace(/[（(].*?[）)]/g, '').replace(/[0-9]/g, '').replace(/[\s·]/g, '').trim();

/** Bộ đọc CSV nhỏ, chịu được dấu phẩy trong ngoặc kép. Chép từ gen-hsk-vocab.mjs. */
function parseCsv(text) {
  const out = []; let row = [], cur = '', q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cur += '"'; i++; }
      else if (c === '"') q = false;
      else cur += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cur); cur = ''; }
    else if (c === '\n' || c === '\r') {
      if (cur !== '' || row.length) { row.push(cur); out.push(row); row = []; cur = ''; }
      if (c === '\r' && text[i + 1] === '\n') i++;
    } else cur += c;
  }
  if (cur !== '' || row.length) { row.push(cur); out.push(row); }
  const head = out.shift();
  return out.filter((r) => r.length >= head.length - 1)
    .map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ''])));
}

/** Tải một lần rồi dùng lại. `thuMuc` cho phép dùng chung CVDICT đã tải cho bộ HSK. */
async function nap(ten, thuMuc = CACHE) {
  const f = path.join(thuMuc, ten);
  try {
    const t = await fs.readFile(f, 'utf8');
    if (t.length > 1000) return t;
  } catch { /* chưa có thì tải */ }
  await fs.mkdir(thuMuc, { recursive: true });
  process.stdout.write(`  ↓ tải ${ten} … `);
  const res = await fetch(NGUON[ten]);
  if (!res.ok) throw new Error(`không tải được ${ten}: HTTP ${res.status}`);
  const t = await res.text();
  // Đối chiếu độ dài: fetch() có thể đứt giữa chừng mà KHÔNG ném lỗi (bài học 4.26f).
  // ⚠️ CHỈ so được khi máy chủ trả nguyên bản: raw.githubusercontent nén gzip cho .csv, lúc đó
  // content-length là cỡ ĐÃ NÉN (118 KB) còn t là bản đã giải nén (310 KB) — so thẳng sẽ báo
  // "tải thiếu" cho một file hoàn toàn nguyên vẹn. Nén thì kiểm bằng cỡ tối thiểu ở nơi gọi.
  const len = Number(res.headers.get('content-length') || 0);
  const nen = !!res.headers.get('content-encoding');
  const got = Buffer.byteLength(t, 'utf8');
  if (!nen && len && Math.abs(got - len) > 64) throw new Error(`${ten} tải thiếu: ${got}/${len} byte`);
  await fs.writeFile(f, t);
  console.log(`${(got / 1024).toFixed(0)} KB`);
  return t;
}

/**
 * Dọn rác ký hiệu từ điển khỏi nghĩa CVDICT — CHÉP NGUYÊN từ gen-hsk-vocab.mjs (đã kiểm chứng
 * trên 8.095 nghĩa ở bộ HSK). Nghĩa gốc kế thừa cách ghi CC-CEDICT nên lẫn 4 thứ không phải
 * nghĩa: lượng từ đi kèm, pinyin trong ngoặc vuông, ghi chú phát âm vùng miền, dấu thừa.
 * Bộ dọn cố ý BẢO THỦ: dọn xong ra rỗng thì TRẢ LẠI bản gốc — thà thô còn hơn mất nghĩa.
 */
function donNghia(d) {
  let s = d;
  s = s.replace(/[(（]\s*(?:LT|CL|[Ll]ượng từ)\s*:[^)）]*[)）]/g, '');
  s = s.replace(/(?:^|;)\s*(?:LT|CL|[Ll]ượng từ)\s*:[^;]*/g, '');
  s = s.replace(/(?:^|;)\s*(?:[Pp]hát âm|[Pp]hiên âm|[Tt]iếng)[^;]*?Đài Loan[^;]*/g, '');
  s = s.replace(/(?:^|;)\s*(?:cũng đọc|Taiwan pr)[^;]*/g, '');
  s = s.replace(/\[[a-zA-Z0-9 ,;·]+\]/g, '');
  // (5) CC-CEDICT ghi từ tham chiếu dưới dạng `phồn|giản` (化學工業|化学工业). Bộ TOCFL là
  //     phồn thể nên chỉ giữ vế đầu; để nguyên thì thẻ từ hiện "viết tắt của 化學工業|化学工业".
  //     ⚠️ CHỈ thay khi cả hai vế là chữ Hán LIỀN NHAU và CÙNG ĐỘ DÀI. CVDICT còn dùng ` | `
  //     để ngăn hai âm đọc của cùng một chữ ("jiāo: dạy… | jiào: …") — cắt vế sau ở đó là mất
  //     hẳn một nghĩa. Điều kiện độ dài + không khoảng trắng tách bạch được hai trường hợp.
  s = s.replace(/([一-鿿]+)\|([一-鿿]+)/g,
    (all, a, b) => (a.length === b.length ? a : all));
  s = s.replace(/[(（]\s*[)）]/g, '').replace(/\s*[,，]\s*(?=[;；]|$)/g, '')
    .replace(/\s{2,}/g, ' ').replace(/\s*;\s*/g, '; ')
    .replace(/^[\s;,，]+|[\s;,，]+$/g, '').trim();
  return s || d;
}

/** Từ điển Hán-Việt CVDICT, khoá theo CẢ phồn lẫn giản. */
function napCvdict(text) {
  const m = new Map();
  for (const ln of text.split('\n')) {
    if (!ln || ln[0] === '#') continue;
    const g = ln.match(/^(\S+)\s+(\S+)\s+\[([^\]]*)\]\s+\/(.*)\/\s*$/);
    if (!g) continue;
    const [, tr, sp, , def] = g;
    const d = donNghia(def.split('/').map((s) => s.trim()).filter(Boolean).slice(0, 3).join('; '));
    if (!m.has(tr)) m.set(tr, d);
    if (!m.has(sp)) m.set(sp, d);
  }
  return m;
}

/**
 * Vốn từ của chính dự án (Đương đại + Thời Đại): nghĩa Việt VÀ đường dẫn mp3 giọng thu thật.
 * Khoá theo cả phồn lẫn giản để bắt được nhiều từ nhất.
 *
 * ⚠️ ĐỌC BẰNG `import()`, KHÔNG bóc regex. gen-hsk-vocab.mjs:211 bóc bằng
 * `t.match(/\{[^{}]*\}/g)` — mẫu đó chỉ khớp object KHÔNG lồng nhau, nên mọi từ có trường
 * `ex: [{ h, p, t }]` (ví dụ câu) đều bị bỏ qua HOÀN TOÀN. Đã đo: sót 2.559 khoá và 2.010
 * đường dẫn audio, tức hơn một phần tư vốn từ — mà không có lỗi nào hiện ra, chỉ là độ phủ
 * thấp hơn đáng lẽ phải có. 11 file ~11 MB import vào Node mất chưa tới một giây; đây là
 * script chạy offline nên không có lý do gì để đánh đổi độ chính xác lấy tốc độ.
 */
async function napVonDuAn() {
  const m = new Map();
  const dir = path.join(ROOT, 'src', 'data');
  const files = (await fs.readdir(dir))
    .filter((f) => /^(duongdai|thoidai)Vocab\d+\.js$/.test(f)).sort();
  for (const f of files) {
    const mod = await import(pathToFileURL(path.join(dir, f)).href);
    for (const bang of Object.values(mod)) {
      if (!bang || typeof bang !== 'object') continue;
      for (const ds of Object.values(bang)) {
        if (!Array.isArray(ds)) continue;
        for (const w of ds) {
          if (!w || !w.hanzi) continue;
          // Bỏ nghĩa gắn cờ en:true — đó là nghĩa tiếng ANH chưa dịch (4.27), lấy vào là lẫn
          // ngôn ngữ. Nhưng `audio` của chính mục đó vẫn dùng được, nên xét riêng hai trường.
          const def = (!w.en && w.def && String(w.def).trim()) ? String(w.def) : '';
          const audio = w.audio ? String(w.audio) : '';
          if (!def && !audio) continue;
          for (const k of [w.hanzi, w.simplified]) {
            if (!k) continue;
            const key = String(k).trim();
            const cu = m.get(key);
            if (!cu) { m.set(key, { def, audio }); continue; }
            // Gộp: mục sau bù phần mục trước còn thiếu (từ có nghĩa nhưng chưa có audio).
            if (!cu.def && def) cu.def = def;
            if (!cu.audio && audio) cu.audio = audio;
          }
        }
      }
    }
  }
  return m;
}

/**
 * Chỉ nhận đường dẫn mp3 khi file CÓ THẬT trên đĩa.
 *
 * ⚠️ Suy đường dẫn theo quy tắc rồi để 404 là hỏng RẤT ÊM: ddSpeakWord tự rơi xuống mức sau,
 * nên không có lỗi nào hiện ra — chỉ là mỗi lần bấm loa phải chờ một request hỏng trước khi
 * ra tiếng. Đúng loại lỗi đã xảy ra ở 4.26f và 4.31. Nên kiểm tận nơi.
 */
const daKiem = new Map();
function coFileThat(p) {
  if (!p) return false;
  if (daKiem.has(p)) return daKiem.get(p);
  const ok = fss.existsSync(path.join(ROOT, 'public', p.replace(/^\//, '')));
  daKiem.set(p, ok);
  return ok;
}

async function main() {
  const args = process.argv.slice(2);
  const chiKiem = args.includes('--kiem');
  const loc = args.includes('--cap') ? args[args.indexOf('--cap') + 1].split(',') : null;

  console.log('== Sinh từ vựng TOCFL (華語八千詞) ==');
  const [csvTu, cvRaw] = await Promise.all([
    nap('tocfl-202307.csv'),
    nap('CVDICT.u8', CACHE_HSK),   // dùng lại bản đã tải cho bộ HSK
  ]);

  const cv = napCvdict(cvRaw);
  const von = await napVonDuAn();
  // Bản đồ mp3 Edge TTS (giọng zh-TW) do gen-tts-tuvung.py --bo tocfl sinh. Chưa chạy script đó
  // thì map rỗng, từ không có `audioTts` và app tự rơi về Web Speech API — không vỡ gì.
  let ttsMap = {};
  try { ttsMap = JSON.parse(await fs.readFile(path.join(CACHE, 'tts-map.json'), 'utf8')); }
  catch { console.log('  (chưa có tts-map.json — chạy `npm run tocfl:tts` để sinh mp3 giọng zh-TW)'); }
  console.log(`  từ điển: CVDICT ${cv.size} khoá · vốn dự án ${von.size} khoá`);

  const rows = parseCsv(csvTu);
  if (rows.length < 7000) throw new Error(`tocfl-202307.csv chỉ có ${rows.length} dòng — nghi tải thiếu`);

  const theoCap = new Map();      // 'L3' -> [từ]
  const thongKe = {};
  const conThieu = [];

  for (const c of CAP) {
    if (loc && !loc.includes(c.id)) continue;
    const cua = rows.filter((r) => (r.ID || '').split('-')[0] === c.id);
    // Đối chiếu chéo với số từ đã biết của bảng chính thức. Nguồn đổi bản thì phải biết NGAY,
    // đừng để lệch âm thầm rồi màn chọn cấp hiện một con số sai.
    if (cua.length !== c.phaiCo) {
      throw new Error(`cấp ${c.id}: nguồn có ${cua.length} từ, bảng chính thức ${c.phaiCo}`
        + ` — nguồn đã đổi bản, kiểm lại trước khi ghi file`);
    }
    const tk = { tong: cua.length, vonDA: 0, cvdict: 0, soanTay: 0, thieu: 0, audio: 0, tts: 0 };

    const ds = cua.map((r, i) => {
      // Biến thể ghi bằng '/' (你/妳, 爸爸/爸): dạng ĐẦU là chính, phần sau giữ để hiển thị.
      const trAll = r.Traditional.split('/');
      const spAll = (r.Simplified || '').split('/');
      const pyAll = (r.Pinyin || '').split('/');
      const tr = chuanHoa(trAll[0]);
      const sp = chuanHoa(spAll[0]) || tr;

      const v = von.get(tr) || von.get(sp);
      let def = (v && v.def) || '';
      let nguon = def ? 'du-an' : '';
      if (!def) { def = cv.get(tr) || cv.get(sp) || ''; nguon = def ? 'cvdict' : ''; }
      if (!def) { def = NGHIA_BU[tr] || NGHIA_BU[sp] || ''; nguon = def ? 'soan-tay' : ''; }
      if (nguon === 'du-an') tk.vonDA++;
      else if (nguon === 'cvdict') tk.cvdict++;
      else if (nguon === 'soan-tay') tk.soanTay++;
      else { tk.thieu++; conThieu.push(`${c.id}·${trAll[0]}·${pyAll[0]}`); }

      const w = {
        hanzi: tr,                 // TOCFL là chuẩn Đài Loan -> PHỒN thể là dạng chính
        simplified: sp,
        pinyin: (pyAll[0] || '').trim(),
        pos: posVi(r.POS),
        def,
        nguonDef: nguon,
        id: r.ID,
      };
      // `audio` = bản thu giọng THẬT (MTC-NTNU / 正中書局), `audioTts` = mp3 giọng máy.
      // Giữ RIÊNG hai trường: badge "có giọng đọc thật" chỉ được đếm `audio`. Xem 4.27.
      if (v && v.audio && coFileThat(v.audio)) { w.audio = v.audio; tk.audio++; }
      const ttsFile = ttsMap[tr] || ttsMap[sp];
      if (!w.audio && ttsFile && coFileThat(`/audio/tts-vi/${ttsFile}`)) {
        w.audioTts = `/audio/tts-vi/${ttsFile}`; tk.tts++;
      }
      if (trAll.length > 1) w.bienThe = trAll.slice(1).map(chuanHoa).filter(Boolean);
      return w;
    });

    theoCap.set(c.id, ds);
    thongKe[c.id] = tk;
  }

  // ---- Đối chiếu: tổng số từ ghi ra phải bằng tổng các cấp đã xử lý ----
  const daChia = [...theoCap.values()].reduce((s, a) => s + a.length, 0);
  const phaiCo = Object.values(thongKe).reduce((s, t) => s + t.tong, 0);
  if (daChia !== phaiCo) throw new Error(`chia cấp SAI: ${daChia} ≠ ${phaiCo}`);

  console.log('\n== ĐỘ PHỦ NGHĨA TIẾNG VIỆT ==');
  let T = [0, 0, 0, 0];
  for (const c of CAP) {
    const t = thongKe[c.id]; if (!t) continue;
    const co = t.vonDA + t.cvdict + t.soanTay;
    T = [T[0] + t.vonDA, T[1] + t.cvdict, T[2] + t.tong, T[3] + t.soanTay];
    console.log(`  ${c.id} ${c.han}: ${String(co).padStart(5)}/${String(t.tong).padEnd(5)}`
      + ` = ${(co / t.tong * 100).toFixed(1).padStart(5)}%  (dự án ${t.vonDA} · CVDICT ${t.cvdict}`
      + `${t.soanTay ? ` · soạn tay ${t.soanTay}` : ''}${t.thieu ? ` · THIẾU ${t.thieu}` : ''})`);
  }
  const co = T[0] + T[1] + T[3];
  console.log(`  TỔNG    : ${co}/${T[2]} = ${(co / T[2] * 100).toFixed(1)}%`);
  if (conThieu.length) {
    console.log(`\n  ⚠️ THIẾU NGHĨA (${conThieu.length}) — soạn vào bảng NGHIA_BU của script này:`);
    console.log('  ' + conThieu.join(', '));
  }

  console.log('\n== ÂM THANH ==');
  let tA = 0, tT = 0;
  for (const c of CAP) {
    const t = thongKe[c.id]; if (!t) continue;
    tA += t.audio; tT += t.tts;
    console.log(`  ${c.id}: giọng thật ${String(t.audio).padStart(4)}/${String(t.tong).padEnd(5)}`
      + ` (${(t.audio / t.tong * 100).toFixed(0).padStart(3)}%) · mp3 TTS ${t.tts}`
      + ` · chưa có ${t.tong - t.audio - t.tts}`);
  }
  console.log(`  TỔNG: giọng thật ${tA} · mp3 TTS ${tT} · chưa có ${daChia - tA - tT}`);
  if (daChia - tA - tT > 0) console.log('  → chạy `npm run tocfl:tts` để sinh nốt phần chưa có');

  if (chiKiem) { console.log('\n--kiem: không ghi file.'); return; }

  // ---- Ghi ra: mỗi CẤP một file JSON. Chia theo cấp (không theo "bài" như HSK) vì đây là
  //      bảng tra cứu tổng hợp, người dùng lọc/tìm trong cả cấp chứ không học tuần tự.
  //      Cấp lớn nhất (L5, 2.776 từ) ~380 KB thô / ~90 KB gzip, và CHỈ tải khi mở đúng cấp đó. ----
  const outDir = path.join(ROOT, 'public', 'data', 'tocfl');
  await fs.mkdir(outDir, { recursive: true });

  const danhMuc = [];
  for (const c of CAP) {
    const ds = theoCap.get(c.id); if (!ds) continue;
    const t = thongKe[c.id];
    await fs.writeFile(path.join(outDir, `cap-${c.id}.json`), JSON.stringify({
      cap: c.id, nhan: c.nhan, han: c.han, band: c.band, cefr: c.cefr,
      level: SO_LEVEL[c.id] || 0, tu: ds,
    }));
    danhMuc.push({
      cap: c.id, nhan: c.nhan, han: c.han, band: c.band, cefr: c.cefr,
      level: SO_LEVEL[c.id] || 0, tongTu: t.tong, coAudio: t.audio,
    });
  }
  // index.json nhẹ (vài trăm byte) để màn CHỌN CẤP vẽ được đủ 6 thẻ mà không phải tải cả
  // 7.517 từ — cùng vai trò với hsk-manifest.js / giaotrinh-manifest.js (4.30).
  await fs.writeFile(path.join(outDir, 'index.json'), JSON.stringify(danhMuc, null, 1));

  console.log(`\n✓ ghi ${danhMuc.length} file cấp + index.json vào public/data/tocfl/`);
  console.log(`  ${daChia} từ`);
}

main().catch((e) => { console.error('LỖI:', e.message); process.exit(1); });
