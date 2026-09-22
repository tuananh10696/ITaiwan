// =============================================================
// GỘP MẢNH THÀNH CÂU TRỌN VẸN — hội thoại giáo trình (2026-09-16)
// =============================================================
// Hội thoại được dựng bằng ASR từ bản thu gốc (4.26h/4.27). Whisper cắt theo hơi thở và độ dài
// tối đa, nên một câu dài bị chia làm nhiều mảnh kết thúc bằng dấu PHẨY:
//
//   他找白如玉跟他在師大附近走走,
//   試試地圖好用不好用。
//
// Đo trên toàn bộ: **64% dòng không kết thúc bằng 。？！** — nhìn vào trang Hội thoại thì đó là
// một danh sách mảnh chữ rời rạc, trông như bảng từ vựng chứ không phải hội thoại.
//
// Script gộp các mảnh liên tiếp thành câu trọn vẹn. Mốc thời gian lấy `start` của mảnh đầu và
// `end` của mảnh cuối nên audio vẫn tua đúng chỗ.
//
// ĐIỀU KIỆN GỘP CỐ Ý BẢO THỦ — gộp nhầm câu của hai người nói vào một dòng còn tệ hơn để nguyên:
//   1. Mảnh trước phải kết thúc bằng dấu PHẨY (,，、) — bằng chứng rõ ràng câu chưa hết.
//      Mảnh không có dấu gì thì KHÔNG gộp: rất có thể là câu trọn mà ASR quên chèn dấu.
//   2. Khoảng lặng giữa hai mảnh < 1,2 giây. Nghỉ dài hơn thường là người khác bắt đầu nói.
//   3. Câu gộp không quá 60 chữ Hán — dài hơn thì đọc trên màn hình cũng không còn dễ.
//
//   node scripts/gop-cau-hoi-thoai.mjs --xem   xem thống kê + ví dụ, KHÔNG ghi
//   node scripts/gop-cau-hoi-thoai.mjs         ghi vào src/data/*Dialogues*.js
import fs from 'node:fs';
import path from 'node:path';

const GOC = path.resolve(import.meta.dirname, '..');
const XEM = process.argv.includes('--xem');
const NGHI_TOI_DA = 1.2;
const CHU_TOI_DA = 60;

const soChu = (s) => (String(s || '').match(/[一-鿿]/g) || []).length;
const hetCau = (s) => /[。？！?!…]\s*$/.test(String(s || '').trim());
const hetPhay = (s) => /[,，、]\s*$/.test(String(s || '').trim());

/**
 * Dòng RÁC của ASR: nhãn mục in trong sách mà người đọc xướng lên ("課文1", "對話二", "短文"),
 * và tiếng nhạc nền Whisper ghi thành "[音樂]". Chúng nằm ngay ĐẦU bài nên là thứ người dùng
 * thấy trước nhất — chính chúng làm bài hội thoại trông như một danh sách nhãn rời rạc.
 */
const RAC = /^(\[[^\]]*\]|【[^】]*】|課文\s*[0-9一二三四五六七八九十]*|對話\s*[0-9一二三四五六七八九十]*|对话\s*[0-9一二三四五六七八九十]*|短文|斷文|生詞|生词|第[0-9一二三四五六七八九十]+課|練習|练习|語法|语法)[\s。、,，:：]*$/;

/** Gộp một mảng cues + lọc rác. Trả mảng mới + số lần gộp + số dòng rác đã bỏ. */
function gop(cues) {
  const ra = [];
  let n = 0, bo = 0;
  for (const c0 of cues) {
    let txt = String(c0.text || '').trim();
    if (RAC.test(txt)) { bo++; continue; }
    // Nhãn mục DÍNH LIỀN câu đầu tiên ("課文一 畢業以後呢?") — người đọc xướng nhãn rồi đọc luôn
    // câu, Whisper gộp thành một dòng. Cắt nhãn, giữ phần câu.
    const dinh = /^(課文[0-9一二三四五六七八九十]*|對話[0-9一二三四五六七八九十]*|对话[0-9一二三四五六七八九十]*|短文|斷文|第[0-9一二三四五六七八九十]+課)[\s:：、]+(?=[\u4e00-\u9fff])/.exec(txt);
    if (dinh) { txt = txt.slice(dinh[0].length).trim(); bo++; }
    if (!txt) { continue; }
    const c = { ...c0, text: txt };
    const truoc = ra[ra.length - 1];
    const nghi = (truoc && truoc.end != null && c.start != null) ? (c.start - truoc.end) : 99;
    const vuaDu = truoc && soChu(truoc.text) + soChu(c.text) <= CHU_TOI_DA;
    // (a) Câu trước kết thúc bằng dấu PHẨY -> chắc chắn chưa hết câu.
    const theoPhay = truoc && hetPhay(truoc.text) && !hetCau(truoc.text) && nghi < NGHI_TOI_DA;
    // (b) Câu trước KHÔNG có dấu gì và hai mảnh gần như dính liền nhau (< 0,25s) -> cùng một hơi
    //     nói. 54% dòng rơi vào nhóm không dấu này (Whisper chạy không chèn dấu câu), bỏ qua thì
    //     phần lớn bài vẫn rời rạc. Ngưỡng để RẤT chặt: nghỉ dài hơn thường là người khác nói.
    const theoHoi = truoc && !hetCau(truoc.text) && !hetPhay(truoc.text)
      && /[\u4e00-\u9fff]$/.test(truoc.text.trim()) && nghi >= 0 && nghi < 0.25;
    const noiDuoc = vuaDu && (theoPhay || theoHoi);
    if (noiDuoc) {
      truoc.text = truoc.text.trim() + c.text.trim();
      truoc.pinyin = [truoc.pinyin, c.pinyin].filter(Boolean).join(' ').trim();
      truoc.vi = [truoc.vi, c.vi].filter((x) => x && x.trim()).join(' ').trim();
      truoc.end = c.end ?? truoc.end;
      n++;
    } else {
      ra.push({ ...c });
    }
  }
  return { cues: ra, gop: n, bo };
}

const FILE = fs.readdirSync(path.join(GOC, 'src/data'))
  .filter((f) => /Dialogues\d*\.js$/.test(f))
  .map((f) => path.join(GOC, 'src/data', f));

let tongTruoc = 0, tongSau = 0, tongGop = 0;
const viDu = [];

for (const f of FILE) {
  const raw = fs.readFileSync(f, 'utf8');
  // Các file này do script sinh: phần dữ liệu là một object JSON thuần sau dấu `=`.
  const i = raw.indexOf('{');
  const j = raw.lastIndexOf('}');
  if (i < 0 || j < 0) { console.log('  ⚠ bỏ qua (không phải JSON thuần):', path.basename(f)); continue; }
  let data;
  try { data = JSON.parse(raw.slice(i, j + 1)); }
  catch { console.log('  ⚠ bỏ qua (không parse được):', path.basename(f)); continue; }

  let gopFile = 0, truocFile = 0, sauFile = 0, boFile = 0;
  for (const [bai, v] of Object.entries(data)) {
    if (!Array.isArray(v?.cues) || !v.cues.length) continue;
    truocFile += v.cues.length;
    const r = gop(v.cues);
    if (r.gop && viDu.length < 4) {
      viDu.push({ bai, truoc: v.cues.slice(0, 3).map((c) => c.text), sau: r.cues.slice(0, 2).map((c) => c.text) });
    }
    v.cues = r.cues;
    gopFile += r.gop;
    boFile += r.bo;
    sauFile += r.cues.length;
  }
  tongTruoc += truocFile; tongSau += sauFile; tongGop += gopFile;
  console.log(`  ${path.basename(f).padEnd(24)} ${truocFile} → ${sauFile} dòng  (gộp ${gopFile}, bỏ rác ${boFile})`);

  if (!XEM && gopFile) {
    fs.writeFileSync(f, raw.slice(0, i) + JSON.stringify(data, null, 1) + raw.slice(j + 1), 'utf8');
  }
}

console.log(`\n${XEM ? '[--xem] ' : ''}TỔNG ${tongTruoc} → ${tongSau} dòng · gộp ${tongGop} mảnh`);
for (const v of viDu) {
  console.log(`\n  ${v.bai}:`);
  console.log('    trước:', v.truoc.join('  |  '));
  console.log('    sau  :', v.sau.join('  |  '));
}
if (!XEM) console.log('\nChạy `npm run data:tach` để sinh lại public/data.');
