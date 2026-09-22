// =============================================================
// Nguồn dữ liệu Giáo trình Thời Đại (時代華語) — dùng chung cho các script gen-thoidai-*
// =============================================================
// Trang chính thức của 淡江大學華語中心 (công khai, không cần đăng nhập):
//   https://sites.google.com/clc.tku.edu.tw/modernchinese-official/
// Mỗi bài có 1 file PPT bài giảng trên Google Drive: từ vựng (Hán · pinyin · từ loại · nghĩa
// tiếng Anh · câu ví dụ) + ngữ pháp (giải thích · ví dụ · bài tập). Xem md/nguon-du-lieu-thoi-dai.md.
//
// Bản đồ id file nằm ở scripts/data-cache/thoidai/td-nguon-map.json (tự sinh khi khảo sát).
// =============================================================
import fs from 'fs/promises';
import path from 'path';
import { createRequire } from 'module';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
export const ROOT = path.join(__dirname, '..');
export const CACHE = path.join(__dirname, 'data-cache', 'thoidai');
export const PPT_DIR = path.join(CACHE, 'ppt');

/** 5 quyển × 16 bài (quyển 1 có thêm bài mở đầu 中文基礎 = b1-l0). */
export const SO_BAI = 16;
export const QUYEN_CO = [1, 2, 3, 4, 5];

/** Khoá trang trên site: 'b1-l1' (quyển 1-2 không đệm 0) / 'b3-l01' (quyển 3-5 có đệm). */
export function khoaTrang(quyen, bai) {
  return quyen <= 2 ? `b${quyen}-l${bai}` : `b${quyen}-l${String(bai).padStart(2, '0')}`;
}

export async function napBanDo() {
  const p = path.join(CACHE, 'td-nguon-map.json');
  return JSON.parse(await fs.readFile(p, 'utf8'));
}

/** Tải 1 file Drive công khai (bỏ qua nếu đã có trong cache). */
export async function taiDrive(id, dich) {
  try { const st = await fs.stat(dich); if (st.size > 50000) return dich; } catch {}
  await fs.mkdir(path.dirname(dich), { recursive: true });
  const url = `https://drive.google.com/uc?export=download&id=${id}&confirm=t`;
  const res = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } });
  if (!res.ok) throw new Error(`Tải hỏng ${id} (${res.status})`);
  await fs.writeFile(dich, Buffer.from(await res.arrayBuffer()));
  return dich;
}

/** PPT bài giảng của 1 bài -> đường dẫn file (tải nếu chưa có). */
export async function pptBai(banDo, quyen, bai) {
  const key = khoaTrang(quyen, bai);
  const rec = banDo.bai[key];
  if (!rec || !rec.ppt_bai_giang) return null;
  return taiDrive(rec.ppt_bai_giang, path.join(PPT_DIR, `${key}_bai.pptx`));
}

/** Đọc text từng slide của pptx: [[đoạn, đoạn...], ...] — giống cách gen-duongdai-grammar làm. */
export function docSlide(file) {
  const AdmZip = require('adm-zip');
  let z;
  try { z = new AdmZip(file); } catch { return null; }
  return z.getEntries()
    .filter((e) => /^ppt\/slides\/slide\d+\.xml$/.test(e.entryName))
    .sort((a, b) => (+a.entryName.match(/(\d+)\.xml/)[1]) - (+b.entryName.match(/(\d+)\.xml/)[1]))
    .map((e) => {
      const xml = e.getData().toString('utf8');
      const paras = [];
      for (const m of xml.matchAll(/<a:p>([\s\S]*?)<\/a:p>/g)) {
        const t = [...m[1].matchAll(/<a:t>([\s\S]*?)<\/a:t>/g)].map((x) => x[1]).join('')
          .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
          .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").trim();
        if (t) paras.push(t);
      }
      return paras;
    });
}

/** Bỏ chú thích trong ngoặc + khoảng trắng — dùng để so khớp giữa các nguồn. */
export const chuanHoa = (h) => String(h || '').replace(/（.*?）|\(.*?\)/g, '').replace(/[\s·・]/g, '').trim();

export const CO_HAN = /[一-鿿㐀-䶿]/;
export const THUAN_HAN = /^[一-鿿㐀-䶿]+$/;
export const CO_DAU_THANH = /[āáǎàēéěèīíǐìōóǒòūúǔùǖǘǚǜĀÁǍÀĒÉĚÈĪÍǏÌŌÓǑÒŪÚǓÙǗǙǛ]/;

/** Mã từ loại của bộ sách -> nhãn tiếng Việt, dùng đúng cách quyển 1 Đương đại ghi. */
export const POS_VI = {
  N: 'Danh từ', V: 'Động từ', Vs: 'Tính từ', 'Vs-attr': 'Tính từ', 'Vs-pred': 'Tính từ',
  'Vs-sep': 'Tính từ', Vst: 'Tính từ (trạng thái)', Vi: 'Nội động từ', Vp: 'Động từ',
  Vpt: 'Động từ', 'V-sep': 'Động từ ly hợp', 'Vp-sep': 'Động từ ly hợp', 'Vst-sep': 'Động từ ly hợp',
  Vaux: 'Trợ động từ', Det: 'Định từ', M: 'Lượng từ', Measure: 'Lượng từ', Adv: 'Phó từ',
  Ptc: 'Trợ từ', Prep: 'Giới từ', Conj: 'Liên từ', Ph: 'Cụm từ', Phrase: 'Cụm từ',
  Idiom: 'Thành ngữ', Name: 'Tên riêng', Names: 'Tên riêng', Interjection: 'Thán từ',
};
const MA = Object.keys(POS_VI).sort((a, b) => b.length - a.length).map((x) => x.replace(/[-]/g, '\\-'));
/** '(N) salesman' · '(Adv.) still' · 'Vs' — nhóm 1 = mã, nhóm 2 = phần còn lại (thường là nghĩa). */
export const RE_POS = new RegExp(`^\\(?(${MA.join('|')})\\.?\\)?[\\s:：]*(.*)$`, 'i');

export async function napGlossaryOnllang() {
  const f = path.join(CACHE, 'onllang-glossary.json');
  let arr;
  try { arr = JSON.parse(await fs.readFile(f, 'utf8')); }
  catch {
    arr = [];
    const B = 'https://onllang.com/wp-json/wp/v2/glossary';
    // TUẦN TỰ + retry: tải song song bị onllang rate-limit làm rớt trang mà không báo lỗi (4.26c).
    let tong = 31;
    for (let p = 1; p <= tong; p++) {
      let res = null;
      for (let i = 0; i < 4 && !res; i++) {
        try { const r = await fetch(`${B}?per_page=100&page=${p}&_fields=title,content`, { headers: { 'user-agent': 'Mozilla/5.0' } }); if (r.ok) res = r; } catch {}
        if (!res) await new Promise((r2) => setTimeout(r2, 500 * (i + 1)));
      }
      if (!res) continue;
      if (p === 1) tong = Number(res.headers.get('x-wp-totalpages') || 31);
      arr.push(...await res.json());
      await new Promise((r) => setTimeout(r, 120));
    }
    await fs.mkdir(CACHE, { recursive: true });
    await fs.writeFile(f, JSON.stringify(arr), 'utf8');
  }
  const map = new Map();
  for (const it of arr) {
    const han = (it.title?.rendered || '').replace(/<[^>]+>/g, '').trim();
    const ps = (it.content?.rendered?.match(/<p>([\s\S]*?)<\/p>/g) || [])
      .map((x) => x.replace(/<[^>]+>/g, '')
        .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
        .replace(/&#x([0-9a-f]+);/gi, (_, x) => String.fromCodePoint(parseInt(x, 16)))
        .replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#8217;|&#039;|&apos;/g, "'").trim())
      .filter(Boolean);
    const key = chuanHoa(han);
    if (key && !map.has(key)) map.set(key, { pinyin: ps[0] || '', def: ps.length > 1 ? ps.slice(1).join('; ') : '' });
  }
  return map;
}

/** Nghĩa Việt đã có sẵn trong dự án (từ vựng Đương đại đã rà) — nguồn phụ, ghép theo chữ Hán. */
export async function napTuVungDuongDai() {
  const { duongdaiVocab } = await import(path.join(ROOT, 'src', 'data', 'duongdaiData.js'));
  const map = new Map();
  for (const arr of Object.values(duongdaiVocab)) {
    for (const w of arr) {
      const k = chuanHoa(w.hanzi);
      if (k && w.def && !map.has(k)) map.set(k, { pinyin: w.pinyin || '', def: w.def, pos: w.pos || '' });
    }
  }
  return map;
}
