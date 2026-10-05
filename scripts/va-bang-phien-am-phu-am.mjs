#!/usr/bin/env node
/**
 * BẢNG PHIÊN ÂM: thay các ô MẤT PHỤ ÂM ĐẦU — 2026-10-05
 *
 *   node scripts/va-bang-phien-am-phu-am.mjs --xem    # chỉ báo
 *   node scripts/va-bang-phien-am-phu-am.mjs          # ghi src/data/pinyinChartData.js
 *   (thiếu mp3 giọng máy thì script ghi danh sách, chạy `npm run tts:bo-sung` rồi chạy lại)
 *
 * LỖI: bản thu của bảng (tải từ tiengtrungthaoan.edu.vn, `public/audio/pron/bang/`) nén 40 kbps — năng
 * lượng dải tần > 4 kHz thấp hơn bản thu của sách 10–15 dB. Tiếng xát s/sh/z/c/zh/ch (và một phần
 * f/h/j/x) nằm đúng dải đó nên gần như biến mất: "cāi" nghe như "āi". Đo đoạn phụ âm đầu (từ lúc có
 * tiếng tới lúc dây thanh rung): cùng âm tiết, bản của sách 55–220 ms, bản của bảng 0–20 ms. Repo gốc
 * từng ghi nhận cùng lỗi ở zhi/chi/shi: 12/16 lượt học viên chọn sai câu "chi" (CLAUDE.md 4.60).
 * Danh sách DƯỚI ĐÂY là các ô đo được < 40 ms (đo bằng cao-do.py: khung hữu thanh đầu tiên − lúc có tiếng).
 *
 * Nguồn thay, theo thứ tự (chủ dự án chọn 2026-10-05: thay cả 108 ô, chấp nhận bảng nhiều giọng):
 *   1. bản ghi bài phát âm của sách (scripts/du-lieu/phat-am-sgk.json) — âm tiết thanh 1
 *   2. bản thu từ vựng Thời Đại / Đương đại: mục 1 chữ, đọc đúng âm tiết thanh 1, clip của CHÍNH mục đó
 *   3. mp3 giọng máy zh-TW đọc một chữ có cách đọc MẶC ĐỊNH là âm tiết đó thanh 1 (bảng CHU)
 * Mọi chữ ở bảng CHU đã ĐO LẠI cao độ file giọng máy sinh ra (phẳng = thanh 1): 塞 bị đọc sài/sè -> 腮,
 * 撒 -> 仨, 拽 đọc zhuài nên bỏ. Thêm chữ mới thì đo lại như vậy.
 * Ô không có nguồn nào (âm tiết hầu như không có chữ thanh 1: cē, shēi, zuō, zhuāi…) giữ file cũ.
 */
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const ROOT = path.resolve(import.meta.dirname, '..');
const PUB = path.join(ROOT, 'public');
const XEM = process.argv.includes('--xem');
const coFile = (p) => !!p && fs.existsSync(path.join(PUB, p));
const ttsPath = (h) => `/audio/tts-vi/${crypto.createHash('md5').update(`${h}|-35%`, 'utf8').digest('hex').slice(0, 10)}.mp3`;

const NGHI = ["ca", "cai", "cao", "ce", "cha", "chai", "chao", "che", "chi", "chou", "chua", "chuai", "chuan", "chuang", "chui", "chun", "chuo", "ci", "cou", "cu", "cuan", "cui", "cun", "cuo", "fan", "fang", "fen", "feng", "fou", "han", "hang", "heng", "hua", "huai", "huan", "huo", "jiang", "jiao", "jie", "jiong", "ken", "pei", "pu", "sa", "sai", "san", "sang", "sao", "se", "sen", "sha", "shai", "shao", "she", "shei", "shi", "shou", "shua", "shuai", "shuan", "shuang", "shui", "shun", "shuo", "si", "sou", "su", "suan", "sui", "sun", "suo", "xia", "xian", "xiang", "za", "zai", "zan", "zang", "zao", "ze", "zei", "zen", "zeng", "zha", "zhai", "zhan", "zhang", "zhao", "zhe", "zhei", "zhen", "zheng", "zhi", "zhong", "zhou", "zhua", "zhuai", "zhuan", "zhuang", "zhui", "zhuo", "zi", "zou", "zu", "zuan", "zui", "zun", "zuo"];
const CHU = {"ca": "擦", "cai": "猜", "cao": "操", "cha": "插", "chai": "拆", "chao": "超", "che": "車", "chi": "吃", "chou": "抽", "chuai": "揣", "chuan": "穿", "chuang": "窗", "chui": "吹", "chun": "春", "chuo": "戳", "ci": "疵", "cu": "粗", "cuan": "躥", "cui": "催", "cun": "村", "cuo": "搓", "fan": "翻", "fang": "方", "fen": "分", "feng": "風", "han": "憨", "hang": "夯", "heng": "哼", "hua": "花", "huan": "歡", "huo": "豁", "jiang": "江", "jiao": "交", "jie": "街", "pei": "呸", "pu": "撲", "sa": "仨", "sai": "腮", "san": "三", "sang": "桑", "sao": "騷", "sen": "森", "sha": "沙", "shai": "篩", "shao": "燒", "she": "奢", "shi": "濕", "shou": "收", "shua": "刷", "shuai": "摔", "shuan": "拴", "shuang": "雙", "shuo": "說", "si": "私", "sou": "搜", "su": "蘇", "suan": "酸", "sui": "雖", "sun": "孫", "suo": "縮", "xia": "蝦", "xian": "先", "xiang": "香", "za": "匝", "zai": "栽", "zan": "簪", "zang": "髒", "zao": "遭", "zeng": "增", "zha": "渣", "zhai": "摘", "zhan": "沾", "zhang": "張", "zhao": "招", "zhe": "遮", "zhen": "真", "zheng": "爭", "zhi": "之", "zhong": "中", "zhou": "周", "zhua": "抓", "zhuan": "專", "zhuang": "裝", "zhui": "追", "zhuo": "桌", "zi": "資", "zou": "鄒", "zu": "租", "zuan": "鑽", "zun": "尊"};

const DAU = { ā: 'a1', á: 'a2', ǎ: 'a3', à: 'a4', ē: 'e1', é: 'e2', ě: 'e3', è: 'e4', ī: 'i1', í: 'i2', ǐ: 'i3', ì: 'i4',
  ō: 'o1', ó: 'o2', ǒ: 'o3', ò: 'o4', ū: 'u1', ú: 'u2', ǔ: 'u3', ù: 'u4', ǖ: 'v1', ǘ: 'v2', ǚ: 'v3', ǜ: 'v4' };
const soHoa = (p) => { let r = '', t = '0'; for (const c of String(p || '').toLowerCase().normalize('NFC')) { if (DAU[c]) { r += DAU[c][0]; t = DAU[c][1]; } else r += c; } return r.replace(/ü/g, 'v').replace(/[^a-z]/g, '') + t; };

// 1) sách
const TEN_TM = { zh: 'zhi', ch: 'chi', sh: 'shi', r: 'ri', z: 'zi', c: 'ci', s: 'si', j: 'ji', q: 'qi', x: 'xi', f: 'fo', h: 'he' };
const sach = new Map();
for (const v of Object.values(JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/du-lieu/phat-am-sgk.json'), 'utf8')))) {
  let k = null;
  if (v.loai === 'am') k = soHoa(v.py);
  else if (v.loai === 'thanh-mau' && TEN_TM[v.py]) k = TEN_TM[v.py] + '1';
  else if (v.loai === 'tu' && [...v.hz.replace(/[。！？]/g, '')].length === 1) k = soHoa(v.py);
  if (k && k.endsWith('1') && coFile(v.file) && !sach.has(k)) sach.set(k, v.file);
}
// 2) bản thu từ vựng (clip của chính mục, không nằm trong danh sách đọc sai)
const SAI = new Set(Object.keys(JSON.parse(fs.readFileSync(path.join(ROOT, 'scripts/audio-clip-sai.json'), 'utf8'))));
const baiCuaClip = (s) => { const m = /B(\d)L(\d+)-/.exec(path.basename(s)); if (!m) return null; return s.includes('/dangdai/') ? (m[1] === '1' ? String(+m[2]) : `${m[1]}-${+m[2]}`) : `td${m[1]}-${+m[2]}`; };
const tuVung = new Map();
for (const f of fs.readdirSync(path.join(PUB, 'data/giaotrinh')).sort((a, b) => (b.startsWith('td') - a.startsWith('td')))) {
  const bai = f.replace(/\.json$/, '');
  for (const w of JSON.parse(fs.readFileSync(path.join(PUB, 'data/giaotrinh', f), 'utf8')).v || []) {
    const a = w.audio || '';
    if ([...String(w.hanzi || '').trim()].length !== 1 || !a || SAI.has(path.basename(a, '.mp3')) || baiCuaClip(a) !== bai || !coFile(a)) continue;
    const k = soHoa(String(w.pinyin || '').split('/')[0]);
    if (k.endsWith('1') && !tuVung.has(k)) tuVung.set(k, a);
  }
}

const PC = path.join(ROOT, 'src/data/pinyinChartData.js');
let txt = fs.readFileSync(PC, 'utf8');
const dem = { sach: 0, tuVung: 0, may: 0, giu: 0 }; const canSinh = []; const giu = [];
for (const s of NGHI) {
  const k = s.replace(/ü/g, 'v') + '1';
  let moi = sach.get(k) || tuVung.get(k) || null;
  const loai = sach.get(k) ? 'sach' : tuVung.get(k) ? 'tuVung' : null;
  if (!moi && CHU[s]) { moi = ttsPath(CHU[s]); if (!coFile(moi)) canSinh.push(CHU[s]); }
  if (!moi) { dem.giu++; giu.push(s); continue; }
  dem[loai || 'may']++;
  const re = new RegExp(`("${s}"\\s*:\\s*)"[^"]*"`);
  if (!re.test(txt)) { console.log('⚠️  không thấy ô', s); continue; }
  txt = txt.replace(re, `$1"${moi}"`);
}
console.log(`ô thay: bản ghi bài phát âm ${dem.sach} · bản thu từ vựng ${dem.tuVung} · giọng máy ${dem.may} · giữ file cũ (không có nguồn) ${dem.giu}`);
if (giu.length) console.log('   giữ:', giu.join(' '));
if (canSinh.length) {
  fs.writeFileSync(path.join(ROOT, 'scripts/data-cache/audio-can-tts.json'), JSON.stringify(canSinh, null, 1));
  console.log(`${canSinh.length} chữ chưa có mp3 giọng máy -> scripts/data-cache/audio-can-tts.json (npm run tts:bo-sung rồi chạy lại)`);
}
if (!XEM && !canSinh.length) { fs.writeFileSync(PC, txt, 'utf8'); console.log('đã ghi', path.relative(ROOT, PC)); }
