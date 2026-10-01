#!/usr/bin/env node
/**
 * ÂM CHO BẢNG PHIÊN ÂM: lưu về server mình, không trỏ sang website khác — 2026-10-01
 *
 *   node scripts/tai-am-bang-phien-am.mjs
 *
 * Trước đây `pinyinChartAudio` (src/data/pinyinChartData.js) trỏ thẳng sang mp3 của
 * tiengtrungthaoan.edu.vn: nguồn ngoài đổi/xoá file là bảng câm mà không có lỗi nào hiện ra.
 * Theo quyết định của chủ dự án (2026-10-01): tải bản thu đó về public/audio/pron/bang/ và trỏ vào
 * bản lưu tại chỗ — giữ MỘT giọng cho cả bảng.
 *
 *   URL http(s)              -> tải về public/audio/pron/bang/<âm tiết>.mp3 (ü viết thành v)
 *   mp3 giọng máy (tts-vi)   -> vận mẫu đọc đứng riêng trong bài phát âm của sách (wa = ua, wu = u…)
 *   null                     -> giữ null (nguồn không có âm tiết đó)
 *
 * Chạy lại an toàn: ô đã là đường dẫn nội bộ thì bỏ qua.
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';

const ROOT = path.resolve(import.meta.dirname, '..');
const FILE = path.join(ROOT, 'src/data/pinyinChartData.js');
const RA = path.join(ROOT, 'public/audio/pron/bang');
const CACHE = path.join(ROOT, 'scripts/data-cache/thoidai/phat-am/bang');   // bản đã tải khi kiểm (nếu có)
const SGK = JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/du-lieu/phat-am-sgk.json'), 'utf8'));

// vận mẫu đứng riêng của sách: khoá theo cách VIẾT của âm tiết đứng riêng
const DUNG_RIENG = { wu: 'u', wa: 'ua', wo: 'uo', wai: 'uai', wei: 'ui', wan: 'uan', wen: 'un', wang: 'uang', weng: 'ueng',
  yi: 'i', ya: 'ia', ye: 'ie', yao: 'iao', you: 'iu', yan: 'ian', yin: 'in', yang: 'iang', ying: 'ing', yong: 'iong',
  yu: 'ü', yue: 'üe', yuan: 'üan', yun: 'ün' };
const vanMauSach = (am) => {
  const vm = DUNG_RIENG[am] || am;
  const v = Object.values(SGK).find((x) => x.loai === 'van-mau' && x.py === vm);
  return v ? v.file : null;
};

const txt = fs.readFileSync(FILE, 'utf8');
const mo = txt.indexOf('export const pinyinChartAudio = ');
const dau = txt.indexOf('{', mo);
const cuoi = txt.indexOf('\n};', dau) + 2;
const bang = JSON.parse(txt.slice(dau, cuoi));

fs.mkdirSync(RA, { recursive: true });
let tai = 0, sach = 0, giu = 0;
const loi = [];
for (const [am, src] of Object.entries(bang)) {
  if (!src || src.startsWith('/audio/pron/')) { giu++; continue; }
  if (src.startsWith('/audio/tts-vi/')) {
    const f = vanMauSach(am);
    if (f) { bang[am] = f; sach++; } else loi.push(`${am}: không có vận mẫu của sách`);
    continue;
  }
  const ten = `${am.replace(/ü/g, 'v')}.mp3`;
  const dich = path.join(RA, ten);
  if (!fs.existsSync(dich)) {
    const cache = path.join(CACHE, `${am}.mp3`);
    if (fs.existsSync(cache) && fs.statSync(cache).size > 1000) fs.copyFileSync(cache, dich);
    else execFileSync('curl', ['-sfL', '--max-time', '60', '-o', dich, src]);
  }
  // file phải giải mã được (đề phòng tải về trang lỗi HTML)
  try {
    const d = parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', dich], { encoding: 'utf8' }));
    if (!(d > 0.3)) throw new Error(`dài ${d}s`);
  } catch (e) { loi.push(`${am}: ${e.message}`); fs.rmSync(dich, { force: true }); continue; }
  bang[am] = `/audio/pron/bang/${ten}`;
  tai++;
}

const dauMoi = `// ============================================================
// Âm thanh từng ô của bảng phiên âm — LƯU TRÊN SERVER MÌNH (scripts/tai-am-bang-phien-am.mjs).
// Bản thu gốc của tiengtrungthaoan.edu.vn (một giọng cho cả bảng), tải về 2026-10-01; ô nguồn đó
// không có (wa, wo, wai, wei, wu) dùng vận mẫu đọc đứng riêng của sách. null = không có bản thu.
// ============================================================
`;
const truoc = txt.slice(0, mo).replace(/\/\/ =+\n\/\/ Audio URLs from tiengtrungthaoan[\s\S]*?\/\/ =+\n$/, dauMoi);
fs.writeFileSync(FILE, truoc + 'export const pinyinChartAudio = ' + JSON.stringify(bang, null, 2) + txt.slice(cuoi), 'utf8');
console.log(`tải/lưu tại chỗ: ${tai} · thay giọng máy bằng âm của sách: ${sach} · giữ nguyên: ${giu}`);
if (loi.length) { console.log('⚠️ ', loi.join('\n   ')); process.exitCode = 1; }
