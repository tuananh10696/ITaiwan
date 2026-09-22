// =============================================================
// KIỂM TRA ĐỘC LẬP đáp án của "Luyện tập tổng hợp" tự sinh (2026-09-06)
// =============================================================
//   node scripts/kiem-tra-luyentap-tusinh.mjs
//
// VÌ SAO CẦN: chấm bài lấy thẳng `idx` trong luyentap-tusinh-answers.json làm `correctIdx`
// (xem _ddOnllangCham nhánh (c) trong main.js). Sai một chỉ số là chấm sai học viên mà KHÔNG
// có dấu hiệu gì. Script này KHÔNG chạy lại logic của bộ sinh — nó đọc đề đã sinh rồi truy
// ngược về DỮ LIỆU GỐC của sách để tự kết luận đáp án đúng là gì, rồi đối chiếu.
//
// Ngoài "đáp án có trỏ đúng ô không", còn soi hai lỗi âm thầm nguy hiểm hơn:
//   · NHIỀU ĐÁP ÁN CÙNG ĐÚNG (mồi nhử vô tình cũng đúng) -> học viên chọn đúng vẫn bị tính sai
//   · LỘ ĐÁP ÁN (từ cần điền còn hiện trong chính câu hỏi)
// =============================================================
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const strip = (s) => String(s ?? '').replace(/<[^>]+>/g, '')
  .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').trim();
const inB = (s) => { const m = String(s).match(/<b>([\s\S]*?)<\/b>/); return m ? strip(m[1]) : null; };

async function nguon(bo) {
  if (bo === 'thoidai') {
    const d = await import(path.join(ROOT, 'src/data/thoidaiData.js'));
    const g = await import(path.join(ROOT, 'src/data/thoidaiGrammar.js'));
    const dl = await import(path.join(ROOT, 'src/data/thoidaiDialogues.js'));
    return { vocab: d.thoidaiVocab, subs: d.thoidaiSubLessons, lessons: d.thoidaiLessons,
             grammar: g.thoidaiGrammar, dialogues: dl.thoidaiDialogues };
  }
  const d = await import(path.join(ROOT, 'src/data/duongdaiData.js'));
  const g = await import(path.join(ROOT, 'src/data/duongdaiGrammar.js'));
  const dl = await import(path.join(ROOT, 'src/data/duongdaiDialogues.js'));
  return { vocab: d.duongdaiVocab, subs: d.duongdaiSubLessons, lessons: d.duongdaiLessons,
           grammar: d.duongdaiGrammar || g.duongdaiGrammar, dialogues: dl.duongdaiDialogues };
}

const laTD = (id) => /^td\d+-/.test(String(id));

async function main() {
  const de = JSON.parse(await fs.readFile(path.join(ROOT, 'public/data/luyentap-tusinh.json'), 'utf8'));
  const ans = JSON.parse(await fs.readFile(path.join(ROOT, 'public/data/luyentap-tusinh-answers.json'), 'utf8'));
  const N = { thoidai: await nguon('thoidai'), duongdai: await nguon('duongdai') };

  const loi = { thieuKhoa: [], khoaThua: [], idxNgoai: [], saiDapAn: [], nhieuDung: [], loDapAn: [], tuTrung: [] };
  let tongCau = 0, daKiem = 0;

  for (const bai of de) {
    const key = String(bai.lessonId);
    const S = N[laTD(key) ? 'thoidai' : 'duongdai'];
    const tu = S.vocab[key] || [];
    const subs = S.subs.filter((s) => s.parentId === key);

    // câu thoại của CHÍNH bài này (dùng cho mục Nghe hiểu)
    const cueBai = new Set();
    for (const s of subs) for (const c of (S.dialogues[s.id]?.cues || [])) cueBai.add(c.text);

    // mọi điểm ngữ pháp của bài: title -> tập câu ví dụ
    const npTheoTitle = new Map();
    for (const s of subs) for (const d of S.grammar[s.id] || []) {
      if (!npTheoTitle.has(d.title)) npTheoTitle.set(d.title, new Set());
      for (const p of d.points || []) for (const e of p.examples || []) if (e.hz) npTheoTitle.get(d.title).add(e.hz);
    }

    for (const quiz of bai.quizzes) {
      quiz.questions.forEach((q, qi) => {
        tongCau++;
        const k = `${key}::${quiz.slug}::${qi}`;
        const a = ans[k];
        const opts = (q.answers || []).map((x) => strip(x.text));

        if (q.questionType === 'essay') {
          if (a && a.kind === 'chon') loi.khoaThua.push(k);       // tự luận mà có đáp án chọn
          return;
        }
        if (!a || a.kind !== 'chon' || !Array.isArray(a.idx) || a.idx.length !== 1) { loi.thieuKhoa.push(k); return; }
        const i = a.idx[0];
        if (!(i >= 0 && i < opts.length)) { loi.idxNgoai.push(`${k} idx=${i}/${opts.length}`); return; }
        const dapAn = opts[i];
        const de1 = strip(q.questionText);

        // ---- III. Nghĩa của từ: truy ngược hanzi -> def trong từ vựng sách ----
        if (quiz.slug.endsWith('-nghia')) {
          const hz = inB(q.questionText);
          // MỘT chữ Hán có thể có nhiều mục từ trong cùng bài (lỗi ghép của bộ bóc từ vựng,
          // vd td3-6 環島). So với TẤT CẢ nghĩa của chữ đó, đừng lấy mục đầu tiên tìm thấy —
          // lấy `find` là báo sai đáp án oan.
          const cungChu = tu.filter((x) => x.hanzi === hz);
          if (!cungChu.length) return;
          daKiem++;
          const nghia = new Set(cungChu.map((x) => x.def));
          if (!nghia.has(dapAn)) loi.saiDapAn.push(`${k} "${hz}" -> đáp án "${dapAn}" không khớp nghĩa nào của chữ này`);
          if (nghia.size > 1) loi.tuTrung.push(`${k} "${hz}" có ${nghia.size} mục từ khác nghĩa trong cùng bài: ${[...nghia].join(' / ')}`);
          const trung = opts.filter((o, j) => j !== i && nghia.has(o));
          if (trung.length) loi.nhieuDung.push(`${k} "${hz}" có ${trung.length + 1} lựa chọn cùng đúng`);
          return;
        }

        // ---- II. Chọn từ điền: đáp án phải là từ của bài; mồi nhử không được cũng đúng ----
        if (quiz.slug.endsWith('-tu-trong-cau')) {
          daKiem++;
          if (!tu.some((x) => x.hanzi === dapAn)) loi.saiDapAn.push(`${k} đáp án "${dapAn}" không phải từ của bài`);
          // câu hỏi còn hiện chính từ cần điền -> lộ đáp án
          if (de1.includes(dapAn)) loi.loDapAn.push(`${k} câu hỏi vẫn còn "${dapAn}"`);
          // mồi nhử xuất hiện trong câu -> gây rối
          for (const [j, o] of opts.entries()) if (j !== i && o && de1.includes(o)) loi.nhieuDung.push(`${k} mồi nhử "${o}" nằm ngay trong câu hỏi`);
          return;
        }

        // ---- I. Nghe hiểu: đáp án phải là câu thoại CỦA BÀI, mồi nhử thì không ----
        if (quiz.slug.includes('-nghe-')) {
          daKiem++;
          if (!cueBai.has(dapAn)) loi.saiDapAn.push(`${k} đáp án không có trong lời thoại của bài`);
          const cungDung = opts.filter((o, j) => j !== i && cueBai.has(o));
          if (cungDung.length) loi.nhieuDung.push(`${k} còn ${cungDung.length} mồi nhử CŨNG có trong bài: ${cungDung[0].slice(0, 20)}…`);
          return;
        }

        // ---- IV. Nhận diện ngữ pháp: câu phải thuộc đúng điểm ngữ pháp được chọn ----
        if (quiz.slug.endsWith('-ngu-phap')) {
          const cau = inB(q.questionText);
          if (!cau) return;
          daKiem++;
          const thuoc = [...npTheoTitle.entries()].filter(([, set]) => set.has(cau)).map(([t]) => t);
          if (!thuoc.includes(dapAn)) loi.saiDapAn.push(`${k} câu "${cau.slice(0, 16)}…" không thuộc mẫu "${String(dapAn).slice(0, 24)}…"`);
          const khac = opts.filter((o, j) => j !== i && thuoc.includes(o));
          if (khac.length) loi.nhieuDung.push(`${k} câu thuộc CẢ ${khac.length + 1} mẫu ngữ pháp trong lựa chọn`);
        }
      });
    }
  }

  const ten = { thieuKhoa: 'câu trắc nghiệm KHÔNG có đáp án', khoaThua: 'câu tự luận lại CÓ đáp án chọn',
    idxNgoai: 'chỉ số đáp án nằm ngoài số lựa chọn', saiDapAn: 'ĐÁP ÁN SAI so với dữ liệu sách',
    nhieuDung: 'NHIỀU LỰA CHỌN CÙNG ĐÚNG / gây rối', loDapAn: 'câu hỏi LỘ đáp án',
    tuTrung: 'CẢNH BÁO DỮ LIỆU: một chữ Hán có nhiều mục từ khác nghĩa trong cùng bài (lỗi bộ bóc từ vựng, không phải lỗi đề)' };
  console.log(`\nĐã soi ${tongCau} câu (${daKiem} câu truy ngược được về dữ liệu gốc)\n`);
  let tong = 0;
  for (const [k, v] of Object.entries(loi)) {
    if (k !== 'tuTrung') tong += v.length;   // cảnh báo dữ liệu, không chặn
    console.log(`${v.length === 0 ? '✅' : '❌'} ${ten[k]}: ${v.length}`);
    v.slice(0, 6).forEach((x) => console.log('     ·', x));
    if (v.length > 6) console.log(`     … và ${v.length - 6} chỗ nữa`);
  }
  console.log(tong === 0 ? '\n✅ Không có lỗi đáp án.' : `\n❌ Tổng ${tong} chỗ cần xử lý.`);
  process.exitCode = tong === 0 ? 0 : 1;
}
main().catch((e) => { console.error(e); process.exit(1); });
