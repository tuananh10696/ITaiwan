// =============================================================
// VÁ phần bổ sung (nghĩa tiếng Việt, câu ví dụ) vào dữ liệu từ vựng nguồn.
//
//   node scripts/bo-sung-tu-vung.mjs          # vá thật
//   node scripts/bo-sung-tu-vung.mjs --xem    # chỉ xem sẽ đổi bao nhiêu
//
// ⚠️ `src/data/{duongdai,thoidai}Vocab<N>.js` là file TỰ SINH bởi `gen-duongdai-vocab.mjs` /
//    `gen-thoidai-vocab.mjs`. Chạy lại hai script đó là mất sạch phần vá — nên NGUỒN SỰ THẬT của
//    phần bổ sung nằm ở `scripts/data-cache/bosung/`, còn script này chỉ trộn vào. Sinh lại dữ
//    liệu gốc thì chạy lại script này, rồi `npm run data:tach`.
//
// Vì sao cần: 4.853/10.562 từ của Đương đại Q5–Q6 và Thời Đại Q1–Q5 vẫn mang nghĩa TIẾNG ANH
// của sách gốc (CLAUDE.md 4.26e, 4.27) — học viên người Việt mở tab Từ vựng ra đọc
// "(be) about to, on the point of" thì coi như bài đó chưa được dịch.
// =============================================================
import fs from 'node:fs';
import path from 'node:path';

const GOC = path.resolve(import.meta.dirname, '..');
const BOSUNG = path.join(GOC, 'scripts/data-cache/bosung');
const XEM = process.argv.includes('--xem');

const doc = (f) => (fs.existsSync(path.join(BOSUNG, f)) ? JSON.parse(fs.readFileSync(path.join(BOSUNG, f), 'utf8')) : {});
const nghia = doc('nghia-vi.json');
const viDu = doc('vi-du.json');
// Phiên âm soạn tay, khoá `<bài>::<chữ Hán>`. Cần khoá theo BÀI (khác `nghia-vi.json` chỉ khoá
// theo chữ) vì đây là chữ đa âm: cùng một chữ mỗi bài đọc một kiểu. Chỉ ghi đè khi giá trị
// đang có là RÁC — nhãn ngữ pháp "S"/"(O)"/"(A)Vs" của bộ bóc PPT Thời Đại lọt vào ô phiên âm,
// nên thẻ từ vựng hiện 我 có phiên âm là "S" (phát hiện 20/09/2026).
const pinyinTay = doc('pinyin-tay.json');
const NGUYEN_DON = /^[aoeiüāáǎàōóǒòēéěèīíǐìūúǔùǖǘǚǜ]$/;   // KHÔNG cờ /i: "A" là nhãn ngữ pháp, không phải phiên âm "a"
const NHAN_NGU_PHAP = /^(s|o|a|v|vs|vi|vp|vst|n|ns|adj|adv|clause|ph|sv|vo|m|det)\d*$/i;
const pinyinRac = (p) => {
  const t = String(p ?? '').trim();
  if (!t) return true;
  if (/[()0-9]/.test(t)) return true;                       // "(S)" · "(O)" · "(A)Vs" · "S1"
  const chu = t.replace(/[\s'’·-]/g, '');
  if (!chu || NHAN_NGU_PHAP.test(chu)) return true;         // "S" · "Vs" · "Clause"
  if (chu.length === 1) return !NGUYEN_DON.test(chu);       // 1 ký tự chỉ hợp lệ khi là nguyên âm THƯỜNG: 啊 a · 餓 è
  return false;
};
console.log(`bổ sung: ${Object.keys(nghia).length} nghĩa · ${Object.keys(viDu).length} bộ ví dụ · ${Object.keys(pinyinTay).length} phiên âm`);

const FILES = [];
for (const bo of ['duongdai', 'thoidai']) {
  for (let q = 1; q <= 6; q++) {
    const f = path.join(GOC, `src/data/${bo}Vocab${q}.js`);
    if (fs.existsSync(f)) FILES.push({ f, ten: `${bo}Vocab${q}` });
  }
}

let doiNghia = 0;
for (const { f, ten } of FILES) {
  const dong = fs.readFileSync(f, 'utf8').split('\n');
  let tuHienTai = null, doiFile = 0;
  for (let i = 0; i < dong.length; i++) {
    // Sửa TẠI CHỖ theo dòng, không parse cả object: các file này có chú thích xen giữa
    // ("// Bài 1 - 歡迎你來臺灣！") nên JSON.parse không đọc được, mà dựng lại bằng
    // JSON.stringify thì mất luôn những dòng chú thích đó.
    const mh = /^(\s*)"hanzi":\s*"((?:[^"\\]|\\.)*)"/.exec(dong[i]);
    if (mh) { tuHienTai = JSON.parse(`"${mh[2]}"`); continue; }
    if (!tuHienTai) continue;
    const md = /^(\s*)"def":\s*"((?:[^"\\]|\\.)*)"(,?)\s*$/.exec(dong[i]);
    if (!md) continue;
    const moi = nghia[tuHienTai];
    const cu = JSON.parse(`"${md[2]}"`);
    if (moi && moi !== cu) {
      dong[i] = `${md[1]}"def": ${JSON.stringify(moi)}${md[3]}`;
      doiNghia++; doiFile++;
    }
    tuHienTai = null;
  }
  if (doiFile) console.log(`  ${ten.padEnd(15)} ${doiFile} nghĩa`);
  if (!XEM && doiFile) fs.writeFileSync(f, dong.join('\n'), 'utf8');
}

// ---------------------------------------------------------------- vá PHIÊN ÂM
let doiPy = 0;
for (const { f, ten } of FILES) {
  const dong = fs.readFileSync(f, 'utf8').split('\n');
  let baiHienTai = null, tuHienTai = null, doiFile = 0;
  for (let i = 0; i < dong.length; i++) {
    // Khoá bài BẮT BUỘC có chữ số ('td1-1', '2-5', '14'). Mẫu rộng hơn sẽ khớp luôn dòng
    // `"ex": [` của từng mục từ, làm baiHienTai thành "ex" và bản vá không bao giờ áp được.
    const mb = /^\s*"([\w.-]*\d[\w.-]*)":\s*\[/.exec(dong[i]);
    if (mb) { baiHienTai = mb[1]; continue; }
    const mh = /^(\s*)"hanzi":\s*"((?:[^"\\]|\\.)*)"/.exec(dong[i]);
    if (mh) { tuHienTai = JSON.parse(`"${mh[2]}"`); continue; }
    if (!tuHienTai || !baiHienTai) continue;
    const mp = /^(\s*)"pinyin":\s*"((?:[^"\\]|\\.)*)"(,?)\s*$/.exec(dong[i]);
    if (!mp) continue;
    const cu = JSON.parse(`"${mp[2]}"`);
    const moi = pinyinTay[`${baiHienTai}::${tuHienTai}`];
    // `pinyin-tay.json` là bản SOẠN TAY có chủ đích (khoá `<bài>::<chữ>`), nên áp thẳng —
    // không lọc qua `pinyinRac` nữa: ô phiên âm còn dính âm Hán Việt ("minh thiên kiến"),
    // nghĩa tiếng Anh ("doorway; gate") và cả câu ví dụ ("Zàijiàn.") — những thứ không phép
    // thử tự động nào nhận ra gọn được. `pinyinRac` giữ lại cho phần dò, không cho phần vá.
    if (moi && moi !== cu) {
      dong[i] = `${mp[1]}"pinyin": ${JSON.stringify(moi)}${mp[3]}`;
      doiPy++; doiFile++;
    }
    tuHienTai = null;
  }
  if (doiFile) console.log(`  ${ten.padEnd(15)} ${doiFile} phiên âm`);
  if (!XEM && doiFile) fs.writeFileSync(f, dong.join('\n'), 'utf8');
}

// ---------------------------------------------------------------- vá CÂU VÍ DỤ
// 10/11 file từ vựng là JSON thuần (chỉ `duongdaiVocab1.js` soạn tay mới có chú thích xen
// giữa), và `JSON.stringify(o, null, 1)` dựng lại y hệt bản trên đĩa — đã đối chiếu từng
// byte. Nên phần này parse rồi ghi lại, KHÔNG vá theo dòng như phần nghĩa ở trên: chèn một
// trường vào giữa object nhiều dòng bằng regex là cách chắc chắn làm hỏng dấu phẩy.
// duongdaiVocab1 thì bỏ qua — 553/554 mục vốn đã có ví dụ soạn tay.
function thanObj(s, ten) {
  const m = new RegExp(`export const ${ten}\\s*=\\s*`).exec(s);
  if (!m) return null;
  const i = s.indexOf('{', m.index + m[0].length - 1);
  let d = 0, nhay = false, esc = false;
  for (let k = i; k < s.length; k++) {
    const c = s[k];
    if (nhay) { if (esc) esc = false; else if (c === '\\') esc = true; else if (c === '"') nhay = false; continue; }
    if (c === '"') nhay = true;
    else if (c === '{') d++;
    else if (c === '}') { d--; if (d === 0) return { i, j: k + 1 }; }
  }
  return null;
}

// Ví dụ CÓ SẴN mà bản dịch rỗng thì thay — đó chính là những câu vừa được dịch ở
// `vi-du.json`; giữ lại bản rỗng thì học viên đọc câu tiếng Trung mà không có nghĩa.
const chuaDich = (ex) => !Array.isArray(ex) || !ex.length || ex.every((e) => !String(e?.t || '').trim());

let doiVd = 0;
for (const { f, ten } of FILES) {
  const s = fs.readFileSync(f, 'utf8');
  const v = thanObj(s, ten);
  if (!v) continue;
  let o;
  try { o = JSON.parse(s.slice(v.i, v.j)); } catch { continue; }   // duongdaiVocab1: soạn tay
  let doiFile = 0;
  for (const ds of Object.values(o)) {
    for (let n = 0; n < (ds || []).length; n++) {
      const w = ds[n];
      const moi = viDu[w?.hanzi];
      if (!moi || !chuaDich(w.ex)) continue;
      // Dựng lại để `ex` nằm TRƯỚC `audio`, đúng thứ tự trường của những mục đã có sẵn.
      const ra = {};
      for (const [k, giaTri] of Object.entries(w)) {
        if (k === 'ex') continue;
        if (k === 'audio' || k === 'audioTts') ra.ex = moi;
        ra[k] = giaTri;
      }
      if (!ra.ex) ra.ex = moi;
      ds[n] = ra;
      doiVd++; doiFile++;
    }
  }
  if (doiFile) console.log(`  ${ten.padEnd(15)} ${doiFile} ví dụ`);
  if (!XEM && doiFile) fs.writeFileSync(f, s.slice(0, v.i) + JSON.stringify(o, null, 1) + s.slice(v.j), 'utf8');
}

console.log(`${XEM ? '[--xem] ' : ''}đã đổi ${doiNghia} nghĩa · ${doiVd} bộ ví dụ`);
if (!XEM) console.log('Nhớ chạy tiếp: npm run data:tach');
