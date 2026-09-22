// =============================================================
// KIỂM TOÁN TOÀN BỘ BÀI TẬP — từng câu một, không để lọt (2026-09-20)
// =============================================================
//   node scripts/kiem-toan-bai-tap.mjs            # báo cáo gọn
//   node scripts/kiem-toan-bai-tap.mjs --chi-tiet # in mọi chỗ, không cắt bớt
//   node scripts/kiem-toan-bai-tap.mjs --ra bc.md # ghi báo cáo đầy đủ ra file
//
// VÌ SAO CÓ FILE NÀY: `kiem-tra-luyentap-tusinh.mjs` chỉ phủ 1 kho (luyentap-tusinh) và
// `return` IM LẶNG mỗi khi truy ngược thất bại — 765/5694 câu chưa bao giờ được kiểm. Học viên
// báo sai đáp án thì không có cách nào biết câu nào lọt.
//
// NGUYÊN TẮC: mỗi câu rơi vào ĐÚNG MỘT nhóm — dat / loi / khongKiemDuoc (kèm lý do).
// Tổng ba nhóm phải bằng tổng số câu. Không có đường nào thoát ra mà không được đếm.
//
// PHỦ: (A) Luyện tập tổng hợp — đọc file GỘP `public/data/luyentap/*.json`, tức đúng thứ
// trình duyệt tải về, không đọc 3 file nguồn rời. (B) Trắc nghiệm tự sinh lúc chạy
// (`generateQuiz`) — không có file đáp án nào để đối chiếu nên phải soi KHẢ NĂNG mơ hồ trên
// TOÀN BỘ pool mồi nhử, chứ không bốc ngẫu nhiên vài đề. (C) Dịch Trung-Việt. (D) Đề thi HSK
// và TOCFL.
// =============================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const P = (...a) => (path.isAbsolute(a[0]) ? path.join(...a) : path.join(ROOT, ...a));
const J = (p) => JSON.parse(fs.readFileSync(p, 'utf8'));
const coFile = (p) => fs.existsSync(p);

const CHI_TIET = process.argv.includes('--chi-tiet');
const iRa = process.argv.indexOf('--ra');
const FILE_RA = iRa >= 0 ? process.argv[iRa + 1] : null;
const iV = process.argv.indexOf('--vong');
const VONG = iV >= 0 ? Number(process.argv[iV + 1]) : 8;   // số vòng sinh đề mỗi bài ở khu B

// ---------- chuẩn hoá ----------
const strip = (s) => String(s ?? '').replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
  .replace(/\s+/g, ' ').trim();
const inB = (s) => { const m = String(s).match(/<b>([\s\S]*?)<\/b>/); return m ? strip(m[1]) : null; };
/** bỏ dấu câu + khoảng trắng + hoa thường, để bắt "cùng đúng" mà phép so `!==` của bộ sinh bỏ sót */
const chuan = (s) => String(s ?? '').toLowerCase()
  .replace(/[\s.,;:!?"'()（）［］\[\]、，。；：？！…·\-–—/]/g, '');
const HAN = /[一-鿿]/;
const soHan = (s) => (String(s).match(/[一-鿿]/g) || []).length;
const VIET = /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;
/** rác của bộ bóc: nhãn trạng thái wpProQuiz, nhãn accessibility, ký tự PUA của PowerPoint */
// Phiên âm rác: nhãn ngữ pháp của bộ bóc PPT ("S", "(O)", "(A)Vs"), âm Hán Việt, nghĩa tiếng
// Anh hay cả câu ví dụ lọt vào ô phiên âm. `啊 "a"` · `餓 "è"` là phiên âm THẬT dài 1 ký tự.
const PY_HOP_LE = /^[A-Za-zÜüĀÁǍÀāáǎàĒÉĚÈēéěèĪÍǏÌīíǐìŌÓǑÒōóǒòŪÚǓÙūúǔùǕǗǙǛǖǘǚǜńňǹṑ\s'’·\-()（）0-9＝=,，、/XY….?～∼‑\\]+$/;
const PY_NHAN = /^\(?(S|O|A|V|Vs|Vi|Vp|Vst|N|Ns|Adj|Adv|Clause|Ph|SV|VO|M|Det)\)?\d*$/;
const pyRac = (p) => {
  const t = String(p ?? '').trim();
  if (!t) return true;
  if (/[\u200b-\u200f\u2060\ufeff]/.test(t)) return true;   // ký tự vô hình
  if (PY_NHAN.test(t.replace(/\s/g, ''))) return true;
  return !PY_HOP_LE.test(t);
};

const RAC = [/Làm đúng!/, /Làm sai!/, /\bMove (up|down)\b/i, /Reorder/i, /[\uE000-\uF8FF]/,
  /Fill in the blank/i, /This response will be/i, /\bundefined\b/, /\bNaN\b/, /\[object Object\]/];

// --- DỌN GIỐNG GIAO DIỆN ---------------------------------------------------
// Phải soi đúng thứ học viên NHÌN THẤY, không phải dữ liệu thô: `_ddOnllangCleanHtml` gỡ hẳn
// node .wpProQuiz_correct/.wpProQuiz_incorrect/.wpProQuiz_AnswerMessage (chỗ chứa "Làm đúng!
// Làm sai! Đáp án") và `_ddOnllangCleanPrompt` cắt cụm đó ở cuối. Kiểm trên dữ liệu thô thì
// 445 câu hoàn toàn bình thường bị báo là rác, chôn mất lỗi thật.
const donHienThi = (html) => strip(String(html ?? '')
  .replace(/<(div|span|p)[^>]*class="[^"]*wpProQuiz_(correct|incorrect|AnswerMessage)[^"]*"[^>]*>[\s\S]*?<\/\1>/gi, ' '))
  .replace(/\s*Làm đúng!\s*Làm sai!\s*Đáp án\s*/gu, ' ').replace(/\s+/g, ' ').trim();
// Dạng câu nào thực sự render answers[]: cloze_answer và essay chỉ hiện ô nhập, answers[] của
// chúng là khung chấm điểm rác của wpProQuiz ("Fill in the blank 1 of 3") — KHÔNG bao giờ hiện.
// `sort_answer` cũng KHÔNG hiện chữ: text của nó là chuỗi rác accessibility ("Reorder Move up…"),
// giao diện chỉ bóc <img src> ra dựng lưới ảnh (CLAUDE.md 4.21).
const coRenderLuaChon = (t) => t === 'single' || t === 'multiple' || t === 'matrix_sort_answer';
/** Lựa chọn là ẢNH thì vẫn là lựa chọn hợp lệ — strip() xoá thẻ <img> nên phải hỏi trước khi kết luận "rỗng". */
const laAnh = (html) => /<img[\s>]/i.test(String(html ?? ''));

// ---------- sổ ghi ----------
const SO = [];   // mỗi phần tử = 1 phát hiện
const NGUON_DA = {};  // nguồn đáp án của những câu không tự đối chiếu lại được
const DEM = {};  // đếm theo khu
function ghi(khu, muc, loai, khoa, mota, nang = 'loi') {
  SO.push({ khu, muc, loai, khoa, mota, nang });
}
function dem(khu, truong, n = 1) {
  DEM[khu] = DEM[khu] || { tong: 0, dat: 0, loi: 0, khongKiem: 0, chuaCham: 0 };
  DEM[khu][truong] += n;
}

// =============================================================
// (A) LUYỆN TẬP TỔNG HỢP — file gộp, đúng thứ trình duyệt tải
// =============================================================
async function nguonSach(bo) {
  if (bo === 'thoidai') {
    const d = await import(P('src/data/thoidaiData.js'));
    const g = await import(P('src/data/thoidaiGrammar.js'));
    const dl = await import(P('src/data/thoidaiDialogues.js'));
    return { vocab: d.thoidaiVocab, subs: d.thoidaiSubLessons, lessons: d.thoidaiLessons,
             grammar: g.thoidaiGrammar, dialogues: dl.thoidaiDialogues };
  }
  const d = await import(P('src/data/duongdaiData.js'));
  const g = await import(P('src/data/duongdaiGrammar.js'));
  const dl = await import(P('src/data/duongdaiDialogues.js'));
  return { vocab: d.duongdaiVocab, subs: d.duongdaiSubLessons, lessons: d.duongdaiLessons,
           grammar: d.duongdaiGrammar || g.duongdaiGrammar, dialogues: dl.duongdaiDialogues };
}
const laTD = (id) => /^td\d+-/.test(String(id));

/** bản sao của `_ddOnllangCauHong` trong main.js — câu này bị LOẠI khỏi giao diện và khỏi mẫu số điểm */
function cauHong(q, quiz) {
  if (!q) return false;
  const sach = (t) => String(t || '').replace(/<[^>]+>/g, '').replace(/Làm đúng!|Làm sai!|Đáp án|&nbsp;/g, '').trim();
  const coAnh = (q.imgSrcs || []).length || (q.answers || []).some((a) => /<img/i.test(a.text || ''));
  const lc = (q.answers || []).map((a) => sach(a.text)).filter(Boolean);
  if (q.questionType === 'matrix_sort_answer' && (!(q.sortWords || []).length || !lc.length)) return true;
  if (!coAnh && lc.length && lc.every((x) => /^[男女]：|^Q：/.test(x))) return true;
  if (q.questionType === 'single' && !coAnh && !q.audioSrc && !(quiz && quiz.quizAudio)) {
    const han = /[\u4e00-\u9fff]/;
    const coChuHan = han.test(sach(q.questionText)) || han.test(sach(q.clozeText)) || han.test(sach(quiz && quiz.passageHtml));
    const coThuatNgu = /<b>\s*\S[\s\S]*?<\/b>/.test(String(q.questionText || ''));
    if (!coChuHan && !coThuatNgu) return true;
  }
  return false;
}
const laThanhDieu = (slug) => /thanh-dieu|phan-biet-thanh/i.test(String(slug));

async function kiemLuyenTap() {
  const KHU = 'A · Luyện tập tổng hợp';
  const thuMuc = P('public/data/luyentap');
  if (!coFile(thuMuc)) { console.log('Chưa có public/data/luyentap — chạy `npm run data:tach`'); return; }
  const N = { thoidai: await nguonSach('thoidai'), duongdai: await nguonSach('duongdai') };
  const toneHints = coFile(P('public/data/onllang-tone-hints.json')) ? J(P('public/data/onllang-tone-hints.json')) : {};

  for (const f of fs.readdirSync(thuMuc).sort()) {
    if (f === 'index.json') continue;
    const bai = J(path.join(thuMuc, f));
    const key = String(bai.lessonId);
    const ans = bai.answers || {};
    const S = N[laTD(key) ? 'thoidai' : 'duongdai'];
    const tu = S.vocab[key] || [];
    const subs = S.subs.filter((s) => s.parentId === key);

    // lời thoại của bài (mục Nghe hiểu) + mọi điểm ngữ pháp
    const cueBai = new Set();
    for (const s of subs) for (const c of (S.dialogues[s.id]?.cues || [])) cueBai.add(strip(c.text));
    const npTheoTitle = new Map();
    for (const s of subs) for (const d of S.grammar[s.id] || []) {
      if (!npTheoTitle.has(d.title)) npTheoTitle.set(d.title, new Set());
      for (const p of d.points || []) for (const e of p.examples || []) if (e.hz) npTheoTitle.get(d.title).add(strip(e.hz));
    }
    const hint = toneHints[key] || toneHints[String(Number(key))] || null;

    for (const quiz of bai.quizzes || []) {
      for (const [qi, q] of (quiz.questions || []).entries()) {
        const k = `${key}::${quiz.slug}::${qi}`;
        dem(KHU, 'tong');
        const opts = (q.answers || []).map((x) => donHienThi(x.text));
        const de1 = donHienThi(q.questionText);
        // văn bản THỰC SỰ hiện ra: lựa chọn chỉ tính khi dạng câu có render chúng
        // Đề của nhiều mục nằm ở `quiz.passageHtml` (hiện MỘT LẦN đầu mục) chứ không ở từng
        // câu — 9 câu "Viết một đoạn văn" trông như rỗng nhưng học viên vẫn thấy đủ yêu cầu.
        const deMuc = donHienThi(quiz.passageHtml);
        const hienThi = [de1, donHienThi(q.clozeText), ...(coRenderLuaChon(q.questionType) ? opts : [])].filter(Boolean);

        // --- câu bị giao diện loại: không hiện ra, không tính điểm ---
        if (cauHong(q, quiz)) { dem(KHU, 'khongKiem'); ghi(KHU, k, 'cau-bi-loai', k, 'câu hỏng — giao diện đã ẩn, không tính điểm', 'tin'); continue; }

        // --- kiểm NỘI DUNG (áp cho mọi dạng câu) ---
        for (const r of RAC) {
          const bay = hienThi.find((t) => r.test(t));
          if (bay) { ghi(KHU, k, 'rac', k, `rác lọt ra giao diện (${r}): "${bay.slice(0, 60)}"`); break; }
        }
        if (!de1 && !deMuc && !(q.imgSrcs || []).length && !quiz.quizAudio && !q.audioSrc && !q.clozeText
            && !(coRenderLuaChon(q.questionType) && opts.filter(Boolean).length >= 2)) {
          ghi(KHU, k, 'de-trong', k, 'không có đề ở câu, ở mục, cũng không ảnh/audio/lựa chọn');
        }

        // --- tự luận: không chấm máy, nhưng phải có đề ---
        if (q.questionType === 'essay') {
          dem(KHU, 'chuaCham');
          if (ans[k] && ans[k].kind === 'chon') ghi(KHU, k, 'tu-luan-co-dap-an-chon', k, 'câu tự luận lại mang đáp án trắc nghiệm');
          continue;
        }

        // --- thanh điệu: đáp án suy từ tone-hints, không nằm ở file đáp án ---
        if (laThanhDieu(quiz.slug) && hint) {
          const h = hint[qi];
          if (q.questionType === 'single' && h && h.o && h.o.length === 1) {
            const tone = h.tones[h.o[0]];
            if (!(tone >= 1 && tone <= opts.length)) { ghi(KHU, k, 'thanh-ngoai-khoang', k, `thanh ${tone} nhưng chỉ có ${opts.length} lựa chọn`); dem(KHU, 'loi'); }
            else dem(KHU, 'dat');
          } else if (q.questionType === 'cloze_answer') {
            dem(KHU, 'dat');   // chấm bằng tổ hợp thanh dựng tại chỗ, luôn có đáp án đúng
          } else { dem(KHU, 'khongKiem'); ghi(KHU, k, 'thanh-thieu-hint', k, 'mục thanh điệu nhưng thiếu dữ liệu phiên âm', 'canh'); }
          continue;
        }

        // --- các dạng KHÔNG chấm máy được theo thiết kế ---
        if (q.questionType !== 'single') {
          dem(KHU, 'chuaCham');
          continue;
        }

        // --- từ đây là câu trắc nghiệm 1 đáp án: phải có khoá ---
        const a = ans[k];
        if (!a || a.kind !== 'chon' || !Array.isArray(a.idx) || a.idx.length !== 1) {
          dem(KHU, 'chuaCham');
          continue;   // không có đáp án -> giao diện nói thẳng "giáo viên chấm", không phải lỗi
        }
        const i = a.idx[0];
        if (!(i >= 0 && i < opts.length)) {
          ghi(KHU, k, 'idx-ngoai-khoang', k, `đáp án trỏ ô ${i} nhưng chỉ có ${opts.length} lựa chọn`);
          dem(KHU, 'loi'); continue;
        }
        const dapAn = opts[i];
        let loiCau = 0;
        const bao = (loai, mota) => { ghi(KHU, k, loai, k, mota); loiCau++; };

        // ---- nội dung lựa chọn ----
        const thoLC = (q.answers || []).map((x) => x.text);
        const coND = (j) => Boolean(opts[j]) || laAnh(thoLC[j]);
        if (!coND(i)) bao('dap-an-rong', 'ô đáp án đúng không có chữ, cũng không có ảnh');
        const rong = opts.map((_, j) => j).filter((j) => !coND(j)).length;
        if (rong && opts.length - rong < 2) bao('lua-chon-rong', `${rong}/${opts.length} lựa chọn không có nội dung`);
        // hai lựa chọn giống hệt nhau -> chọn đúng vẫn có thể bị tính sai
        const nhom = new Map();
        opts.forEach((o, j) => { if (!o) return; const c = chuan(o); if (!nhom.has(c)) nhom.set(c, []); nhom.get(c).push(j); });
        for (const [, js] of nhom) if (js.length > 1 && js.includes(i)) bao('lua-chon-trung-dap-an', `ô ${js.join(',')} giống hệt nhau mà một trong số đó là đáp án: "${opts[i]}"`);
        // hệ chữ: đáp án phồn thể mà mồi nhử giản thể (hoặc ngược lại) -> lộ đáp án bằng hệ chữ
        // (kiểm ở phần riêng bên dưới, cần bảng tra)

        // ---- truy ngược về dữ liệu sách ----
        // CHỈ áp cho đề TỰ SINH (slug `ts-<bài>-<mục>`): ta biết chính xác nó được dựng từ đâu.
        // Đề onllang/MTC là đề của người khác soạn — "nghe rồi chọn câu TRẢ LỜI phù hợp" hay
        // Đúng/Sai thì đáp án vốn KHÔNG nằm trong lời thoại, áp luật của đề tự sinh vào là báo
        // sai oan 123 câu hoàn toàn bình thường (đã dính một lần, 20/09/2026).
        let daTruy = false;
        const tuSinh = /^ts-/.test(quiz.slug);
        if (tuSinh && quiz.slug.endsWith('-nghia')) {
          const hz = inB(q.questionText);
          const cungChu = tu.filter((x) => x.hanzi === hz);
          if (hz && cungChu.length) {
            daTruy = true;
            const nghia = new Set(cungChu.map((x) => strip(x.def)));
            const nghiaC = new Set([...nghia].map(chuan));
            if (!nghiaC.has(chuan(dapAn))) bao('sai-dap-an', `"${hz}" — đáp án "${dapAn}" không khớp nghĩa nào trong sách (${[...nghia].join(' / ')})`);
            const trung = opts.filter((o, j) => j !== i && o && nghiaC.has(chuan(o)));
            if (trung.length) bao('nhieu-dap-an-dung', `"${hz}" — còn ${trung.length} lựa chọn cũng đúng: ${trung.join(' / ')}`);
          } else if (hz) { ghi(KHU, k, 'khong-truy-nguoc', k, `mục Nghĩa: không tìm thấy "${hz}" trong từ vựng bài ${key}`, 'canh'); }
          else { ghi(KHU, k, 'khong-truy-nguoc', k, 'mục Nghĩa: đề không có <b>chữ Hán</b> để truy ngược', 'canh'); }
        } else if (tuSinh && quiz.slug.endsWith('-tu-trong-cau')) {
          daTruy = true;
          if (!tu.some((x) => strip(x.hanzi) === dapAn)) bao('sai-dap-an', `đáp án "${dapAn}" không phải từ vựng của bài ${key}`);
          if (dapAn && de1.includes(dapAn)) bao('lo-dap-an', `từ cần điền "${dapAn}" vẫn còn nguyên trong câu hỏi`);
          for (const [j, o] of opts.entries()) if (j !== i && o && de1.includes(o)) bao('moi-nhu-trong-de', `mồi nhử "${o}" nằm ngay trong câu hỏi`);
        } else if (tuSinh && /-nghe-\d+$/.test(quiz.slug)) {
          if (cueBai.size) {
            daTruy = true;
            if (!cueBai.has(dapAn)) bao('sai-dap-an', `câu "${String(dapAn).slice(0, 24)}…" KHÔNG có trong lời thoại bài ${key}`);
            const cungDung = opts.filter((o, j) => j !== i && o && cueBai.has(o));
            if (cungDung.length) bao('nhieu-dap-an-dung', `${cungDung.length} mồi nhử CŨNG có trong bài: ${cungDung[0].slice(0, 24)}…`);
          } else ghi(KHU, k, 'khong-truy-nguoc', k, `mục Nghe: bài ${key} chưa có lời thoại để đối chiếu`, 'canh');
        } else if (tuSinh && quiz.slug.endsWith('-ngu-phap')) {
          const cau = inB(q.questionText);
          if (cau && npTheoTitle.size) {
            daTruy = true;
            const thuoc = [...npTheoTitle.entries()].filter(([, s]) => s.has(cau)).map(([t]) => strip(t));
            if (!thuoc.length) ghi(KHU, k, 'khong-truy-nguoc', k, `mục Ngữ pháp: câu "${cau.slice(0, 16)}…" không thấy trong ví dụ ngữ pháp bài`, 'canh');
            else {
              const tC = thuoc.map(chuan);
              if (!tC.includes(chuan(dapAn))) bao('sai-dap-an', `câu "${cau.slice(0, 16)}…" không thuộc mẫu "${String(dapAn).slice(0, 26)}…"`);
              const khac = opts.filter((o, j) => j !== i && o && tC.includes(chuan(o)));
              if (khac.length) bao('nhieu-dap-an-dung', `câu thuộc CẢ ${khac.length + 1} mẫu có trong lựa chọn`);
            }
          } else ghi(KHU, k, 'khong-truy-nguoc', k, 'mục Ngữ pháp: đề không có <b>câu</b> để truy ngược', 'canh');
        }

        if (loiCau) dem(KHU, 'loi');
        else if (daTruy) dem(KHU, 'dat');
        else {
          dem(KHU, 'khongKiem');
          NGUON_DA[a.nguon || '(không ghi nguồn)'] = (NGUON_DA[a.nguon || '(không ghi nguồn)'] || 0) + 1;
          if (!SO.some((x) => x.khoa === k && x.loai === 'khong-truy-nguoc')) ghi(KHU, k, 'khong-truy-nguoc', k, `mục "${quiz.slug}" (đáp án từ ${a.nguon || 'nguồn không ghi'}) — không có dữ liệu sách để đối chiếu lại`, 'canh');
        }
      }
    }
  }
}

// =============================================================
// (B) TRẮC NGHIỆM TỰ SINH lúc chạy — soi MỌI khả năng mơ hồ
// =============================================================
// generateQuiz bốc ngẫu nhiên 1 trong 3 dạng và 3 mồi nhử ngẫu nhiên từ pool. Chạy thử vài
// lần không chứng minh được gì. Nên ở đây soi TOÀN BỘ pool: nếu tồn tại DÙ MỘT mồi nhử có thể
// cũng đúng, thì sớm muộn học viên sẽ gặp và bị chấm sai.
async function kiemTracNghiem() {
  const KHU = 'B · Trắc nghiệm tự sinh';
  const { generateQuiz } = await import(P('src/data/duongdaiExercise.js'));
  const idx = await import(P('src/data/giaotrinh-index.js'));
  const bo = [
    { subs: idx.duongdaiSubLessons, lessons: idx.duongdaiLessons },
    { subs: idx.thoidaiSubLessons, lessons: idx.thoidaiLessons },
  ];
  const kho = {};
  for (const f of fs.readdirSync(P('public/data/giaotrinh'))) {
    if (f.endsWith('.json')) kho[f.replace(/\.json$/, '')] = J(P('public/data/giaotrinh', f)).v || [];
  }

  for (const B of bo) {
    if (!B.subs) continue;
    for (const sub of B.subs) {
      const N = { vocab: kho, subs: B.subs, lessons: B.lessons };
      const soTu = (kho[String(sub.parentId)] || []).slice(sub.from - 1, sub.to).length;
      let raDuoc = 0;
      // Đề sinh NGẪU NHIÊN mỗi lượt (dạng câu + mồi nhử), nên soi dữ liệu suông không kết luận
      // được gì — phải sinh thật nhiều vòng rồi soi từng câu đúng như học viên nhận được.
      for (let v = 0; v < VONG; v++) {
        const qs = generateQuiz(sub.id, N);
        if (!qs || !qs.length) continue;
        raDuoc++;
        for (const q of qs) {
          dem(KHU, 'tong');
          const k = `${sub.id} · ${q.type} · ${q.wordHanzi}`;
          let loiCau = 0;
          const bao = (loai, m) => { ghi(KHU, k, loai, k, m); loiCau++; };
          const opts = (q.options || []).map((o) => strip(o.text));
          const dung = opts[q.correctIdx];

          if (!(q.options[q.correctIdx] || {}).correct) bao('correct-idx-sai', `correctIdx=${q.correctIdx} không trỏ vào ô đúng`);
          if (!String(q.prompt ?? '').trim()) bao('de-trong', 'đề không có nội dung');
          if (opts.some((o) => !o)) bao('lua-chon-rong', 'có lựa chọn rỗng');
          const c = opts.map(chuan);
          if (new Set(c).size !== c.length) bao('lua-chon-trung', `lựa chọn trùng nhau: ${opts.join(' | ')}`);
          // đề chứa luôn đáp án (trừ dạng hanzi->nghĩa, ở đó đề LÀ chữ Hán nên không tính)
          if (q.type !== 'hanzi-to-meaning' && dung && String(q.prompt).includes(dung)) bao('lo-dap-an', `đề "${q.prompt}" chứa sẵn đáp án "${dung}"`);

          if (loiCau) dem(KHU, 'loi'); else dem(KHU, 'dat');
        }
      }
      if (!raDuoc && soTu >= 4) ghi(KHU, sub.id, 'bai-khong-sinh-duoc-de', sub.id, `bài có ${soTu} từ nhưng không sinh được đề nào`, 'canh');
    }
  }

  // --- Chất lượng dữ liệu TỪ VỰNG: không phải lỗi đáp án, nhưng làm hụt câu hỏi ---
  // Bộ sinh nay TỰ BỎ QUA những từ này thay vì hỏi một câu vô nghĩa (sửa 20/09/2026), nên
  // đây là GHI NHẬN về độ phủ, không phải lỗi chấm bài.
  for (const [bai, ds] of Object.entries(kho)) {
    for (const w of ds) {
      const hz = strip(w.hanzi), df = strip(w.def), py = String(w.pinyin ?? '').trim();
      if (hz && !py) ghi(KHU, bai, 'tu-thieu-phien-am', `${bai} · ${hz}`, 'không có phiên âm — bỏ dạng "phiên âm nào?"', 'canh');
      else if (hz && pyRac(py)) ghi(KHU, bai, 'tu-phien-am-rac', `${bai} · ${hz}`, `phiên âm rác "${py}" — bỏ dạng "phiên âm nào?"`, 'canh');
      if (hz && df && df.includes(hz)) ghi(KHU, bai, 'nghia-lo-chinh-chu', `${bai} · ${hz}`, `nghĩa chứa luôn chữ đang hỏi: "${df}" — bỏ dạng "từ nào có nghĩa là…"`, 'canh');
      if (hz && !df) ghi(KHU, bai, 'tu-thieu-nghia', `${bai} · ${hz}`, 'không có nghĩa', 'canh');
    }
  }
}

// =============================================================
// (C) DỊCH TRUNG–VIỆT
// =============================================================
function kiemDich() {
  const KHU = 'C · Dịch Trung-Việt';
  const p = P('public/data/translate-exercises.json');
  if (!coFile(p)) return;
  for (const bai of J(p)) {
    for (const truong of ['zhVi', 'viZh', 'paraZhVi', 'paraViZh']) {
      const ds = bai[truong];
      if (!Array.isArray(ds)) continue;
      ds.forEach((it, i) => {
        dem(KHU, 'tong');
        const k = `${bai.lessonId} · ${truong}[${i}]`;
        const q = strip(it.q), a = strip(it.a);
        let loiCau = 0;
        const bao = (loai, m) => { ghi(KHU, k, loai, k, m); loiCau++; };
        if (!q) bao('de-trong', 'không có câu gốc');
        if (!a) bao('dap-an-trong', 'không có bản dịch');
        for (const r of RAC) if (r.test(q) || r.test(a)) { bao('rac', `còn rác của bộ bóc (${r})`); break; }
        // chiều zh->vi: q phải là chữ Hán, a phải là tiếng Việt (và ngược lại)
        const chieuZh = truong === 'zhVi' || truong === 'paraZhVi';
        const nguon = chieuZh ? q : a, dich = chieuZh ? a : q;
        if (nguon && !HAN.test(nguon)) bao('sai-chieu', `vế tiếng Trung không có chữ Hán: "${nguon.slice(0, 30)}"`);
        // Chú thích kiểu "(6 người = 六個人)" là hợp lệ — chỉ báo khi vế tiếng Việt CHỦ YẾU
        // là chữ Hán, tức nhiều khả năng bị đảo chiều hoặc chép nhầm.
        if (dich && soHan(dich) / Math.max(dich.length, 1) > 0.3) bao('ban-dich-lan-chu-han', `vế tiếng Việt chủ yếu là chữ Hán: "${dich.slice(0, 30)}"`);
        if (dich && !VIET.test(dich) && dich.length > 12 && /^[a-z0-9 ,;()'"\/.?!-]+$/i.test(dich)) bao('ban-dich-tieng-anh', `vế tiếng Việt thực ra là tiếng Anh: "${dich.slice(0, 30)}"`);
        if (q && a && chuan(q) === chuan(a)) bao('trung-lap', 'câu gốc và bản dịch giống hệt nhau');
        if (loiCau) dem(KHU, 'loi'); else dem(KHU, 'dat');
      });
    }
  }
}

// =============================================================
// (D) ĐỀ THI HSK + TOCFL
// =============================================================
function kiemDeThi() {
  // --- HSK ---
  const KHU = 'D · Đề thi HSK';
  const thuMuc = P('public/data/hsk/dethi');
  if (coFile(path.join(thuMuc, 'index.json'))) {
    for (const de of J(path.join(thuMuc, 'index.json'))) {
      const p = path.join(thuMuc, `${de.ma}.json`);
      if (!coFile(p)) { ghi(KHU, de.ma, 'thieu-file', de.ma, 'index liệt kê nhưng không có file đề'); continue; }
      const d = J(p);
      for (const c of d.cau || []) {
        dem(KHU, 'tong');
        const k = `${de.ma} · câu ${c.so}`;
        const lc = (c.luaChon || []).map(strip);
        let loiCau = 0;
        const bao = (loai, m) => { ghi(KHU, k, loai, k, m); loiCau++; };
        if (c.dapAn == null || c.dapAn === '') { dem(KHU, 'chuaCham'); continue; }
        if (c.dang === 'viet') { dem(KHU, 'dat'); continue; }   // tự viết, so chuỗi lúc chấm
        if (!lc.length) bao('khong-lua-chon', 'có đáp án nhưng không có lựa chọn nào');
        else {
          // Nhãn nằm ở TRƯỜNG `nhan` của từng lựa chọn, KHÔNG suy theo vị trí: mục điền từ của
          // đề Mandarin Zone giữ nguyên nhãn gốc A–F dù chỉ in ra 4 phương án.
          const nhan = (c.luaChon || []).map((x, j) => String(x?.nhan ?? String.fromCharCode(65 + j)));
          if (!nhan.includes(String(c.dapAn)) && !lc.includes(String(c.dapAn)) && !/^[✓✗√×]$/.test(String(c.dapAn)))
            bao('dap-an-ngoai-khoang', `đáp án "${c.dapAn}" không khớp nhãn nào (${nhan.join('')})`);
          const trung = nhan.filter((x, j) => nhan.indexOf(x) !== j);
          if (trung.length) bao('nhan-trung', `nhãn lựa chọn trùng nhau: ${nhan.join('')}`);
          // lựa chọn dính liền: một ô chứa luôn nhãn của ô khác ("比较甜  B是艺术品  C 酒瓶很特别")
          if (lc.length < 2 && /\s[A-F][\s\u4e00-\u9fff]/.test(lc[0] || '')) bao('lua-chon-dinh-lien', `các phương án dính vào MỘT ô: "${lc[0].slice(0, 46)}"`);
        }
        if (loiCau) dem(KHU, 'loi'); else dem(KHU, 'dat');
      }
    }
  }
  // --- TOCFL ---
  const KT = 'D · Đề thi TOCFL';
  const pt = P('public/data/thi/tocfl.json');
  if (!coFile(pt)) return;
  const walk = (o, duong = '') => {
    if (Array.isArray(o)) return o.forEach((x, i) => walk(x, `${duong}[${i}]`));
    if (!o || typeof o !== 'object') return;
    if (Array.isArray(o.questions)) {
      o.questions.forEach((q, i) => {
        dem(KT, 'tong');
        const k = `${duong} · câu ${i + 1}`;
        const opts = (q.options || []).map(strip);
        let loiCau = 0;
        const bao = (loai, m) => { ghi(KT, k, loai, k, m); loiCau++; };
        if (typeof q.correct !== 'number') { dem(KT, 'chuaCham'); return; }
        if (!opts.length) bao('khong-lua-chon', 'không có lựa chọn');
        else if (!(q.correct >= 0 && q.correct < opts.length)) bao('idx-ngoai-khoang', `correct=${q.correct} nhưng có ${opts.length} lựa chọn`);
        else {
          const nhom = new Map();
          opts.forEach((o2, j) => { if (!o2) return; const c = chuan(o2); if (!nhom.has(c)) nhom.set(c, []); nhom.get(c).push(j); });
          for (const [, js] of nhom) if (js.length > 1 && js.includes(q.correct)) bao('lua-chon-trung-dap-an', `ô ${js.join(',')} giống hệt nhau mà một trong số đó là đáp án`);
        }
        if (loiCau) dem(KT, 'loi'); else dem(KT, 'dat');
      });
    }
    Object.values(o).forEach((v) => walk(v, duong));
  };
  walk(J(pt));
}

// =============================================================
// BÁO CÁO
// =============================================================
async function main() {
  await kiemLuyenTap();
  await kiemTracNghiem();
  kiemDich();
  kiemDeThi();

  const d = [];
  d.push('# KIỂM TOÁN BÀI TẬP — từng câu một\n');
  d.push(`_Chạy lúc ${new Date().toISOString().slice(0, 16).replace('T', ' ')}_\n`);
  d.push('| Khu | Tổng câu | Đạt | LỖI | Không kiểm được | Không chấm máy |');
  d.push('|---|---:|---:|---:|---:|---:|');
  let tongLoi = 0;
  for (const [khu, v] of Object.entries(DEM)) {
    const con = v.tong - v.dat - v.loi - v.khongKiem - v.chuaCham;
    d.push(`| ${khu} | ${v.tong} | ${v.dat} | ${v.loi} | ${v.khongKiem} | ${v.chuaCham} |`);
    if (con !== 0) d.push(`| ⚠️ ${khu}: **${con} câu không được phân loại — bộ kiểm có đường thoát** | | | | | |`);
    tongLoi += v.loi;
  }
  d.push('');

  if (Object.keys(NGUON_DA).length) {
    d.push('## Câu KHÔNG tự đối chiếu lại được — đáp án đến từ đâu\n');
    d.push('Đây là đề do nơi khác soạn (onllang, đề kiểm tra MTC), không dựng từ dữ liệu sách nên');
    d.push('không có nguồn thứ hai để kiểm chéo. **Không câu nào bị bỏ ngỏ**, nhưng cũng không câu');
    d.push('nào được xác nhận độc lập.\n');
    d.push('| Nguồn đáp án | Số câu | Mức tin cậy |');
    d.push('|---|---:|---|');
    const mota = { 'onllang-review': 'chính hệ thống chấm bài của trang gốc trả về — tin được',
      'mtc-test': 'bản GIÁO VIÊN của đề kiểm tra MTC (có in đáp án) — tin được',
      'ai-soan': '**hệ thống tự suy ra — cần giáo viên rà lại**' };
    for (const [k, v] of Object.entries(NGUON_DA).sort((a, b) => b[1] - a[1]))
      d.push(`| ${k} | ${v} | ${mota[k] || 'không rõ'} |`);
    d.push('');
  }

  const theoLoai = new Map();
  for (const s of SO) {
    const kk = `${s.nang}|${s.khu}|${s.loai}`;
    if (!theoLoai.has(kk)) theoLoai.set(kk, []);
    theoLoai.get(kk).push(s);
  }
  const thuTu = { loi: 0, canh: 1, tin: 2 };
  const nhan = { loi: '❌ LỖI', canh: '⚠️ CHƯA KIỂM ĐƯỢC', tin: 'ℹ️ GHI NHẬN' };
  const sap = [...theoLoai.entries()].sort((a, b) => {
    const [na, , la] = a[0].split('|'); const [nb, , lb] = b[0].split('|');
    return (thuTu[na] - thuTu[nb]) || (b[1].length - a[1].length) || la.localeCompare(lb);
  });
  for (const [kk, ds] of sap) {
    const [nang, khu, loai] = kk.split('|');
    d.push(`\n## ${nhan[nang]} · ${khu} · \`${loai}\` — ${ds.length} chỗ\n`);
    const gioiHan = (CHI_TIET || FILE_RA) ? ds.length : (nang === 'loi' ? 12 : 4);
    ds.slice(0, gioiHan).forEach((s) => d.push(`- \`${s.khoa}\` — ${s.mota}`));
    if (ds.length > gioiHan) d.push(`- … và ${ds.length - gioiHan} chỗ nữa`);
  }

  const vb = d.join('\n');
  if (FILE_RA) { fs.writeFileSync(P(FILE_RA), vb); console.log(`Đã ghi báo cáo đầy đủ: ${FILE_RA}`); }
  console.log(FILE_RA ? vb.split('\n').slice(0, 40).join('\n') : vb);
  console.log(tongLoi === 0 ? '\n✅ Không còn lỗi đáp án/nội dung.' : `\n❌ Tổng ${tongLoi} câu có lỗi.`);
  process.exitCode = tongLoi ? 1 : 0;
}
main().catch((e) => { console.error(e); process.exit(1); });
