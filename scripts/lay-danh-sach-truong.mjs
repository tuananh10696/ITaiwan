#!/usr/bin/env node
/**
 * Lấy DANH SÁCH TRƯỜNG ĐH Đài Loan từ API công khai của duhocdaongoc.vn (cùng endpoint trang đó dùng
 * để vẽ bản đồ), tải logo + ảnh về SERVER MÌNH (quy tắc dự án: ảnh/âm thanh không trỏ sang web khác),
 * rồi ghi `public/data/truong/truong.json` cho khối "Bản đồ trường" ở trang chủ.
 *
 *   node scripts/lay-danh-sach-truong.mjs
 *
 * Cần macOS (`sips`) để thu nhỏ ảnh. Chạy lại an toàn: ghi đè file ra, không đụng chỗ nào khác.
 * ⚠️ Nguồn chỉ có: tên (kèm tên Anh trong ngoặc), địa chỉ, toạ độ, website, logo, ảnh, 4 chỉ số
 * (xếp hạng, số sinh viên, sinh viên quốc tế, số giảng viên). Chương trình / ngành / ưu đãi ở nguồn
 * đều TRỐNG nên không có ở đây. Logo và ảnh thuộc về các trường / bên chụp — xem lại bản quyền
 * trước khi dùng thương mại.
 */
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NGUON = 'https://duhocdaongoc.vn';
const RA_ANH = path.join(ROOT, 'public/images/truong');
const RA_JSON = path.join(ROOT, 'public/data/truong/truong.json');
const TAM = fs.mkdtempSync(path.join(os.tmpdir(), 'truong-'));
const UA = { 'User-Agent': 'Mozilla/5.0 (ITaiwan data import)' };

const ngu = (ms) => new Promise((r) => setTimeout(r, ms));
const kieuAnh = (b) => (b[0] === 0xff && b[1] === 0xd8 ? 'jpg' : b[0] === 0x89 && b[1] === 0x50 ? 'png' : null);

async function taiAnh(rel, dich, canhDai, chatLuong) {
  if (!rel) return null;
  const r = await fetch(`${NGUON}/storage/${rel}`, { headers: UA });
  if (!r.ok) return null;
  const buf = Buffer.from(await r.arrayBuffer());
  const kieu = kieuAnh(buf);
  if (!kieu) return null;
  const goc = path.join(TAM, 'goc');
  fs.writeFileSync(goc, buf);
  // Logo giữ nguyên định dạng (PNG có thể trong suốt); ảnh khuôn viên luôn ra JPEG.
  const ra = chatLuong ? 'jpg' : kieu;
  const file = `${dich}.${ra}`;
  fs.mkdirSync(path.dirname(file), { recursive: true });
  const args = ['-Z', String(canhDai), '-s', 'format', ra === 'jpg' ? 'jpeg' : 'png'];
  if (ra === 'jpg') args.push('-s', 'formatOptions', String(chatLuong || 80));
  execFileSync('sips', [...args, goc, '--out', file], { stdio: 'ignore' });
  return path.relative(path.join(ROOT, 'public'), file).replace(/\\/g, '/');
}

/** "Đại học A (University A - UA)" -> { vi: 'Đại học A', en: 'University A - UA' } */
function tachTen(ten) {
  const m = /^(.*?)\s*\(([^()]*)\)\s*$/.exec(String(ten).trim());
  return m ? { vi: m[1].trim(), en: m[2].trim() } : { vi: String(ten).trim(), en: '' };
}

/**
 * Sửa TAY bốn mục mà nguồn gõ sai rõ ràng (thiếu chữ Đ, dư dấu chấm, tên Anh dính vào tên Việt, gõ
 * "ý tế" thay "Y tế"). Khoá là id của nguồn. Mọi tên khác giữ NGUYÊN VĂN theo nguồn.
 */
const SUA_TEN = {
  156: { ten: 'Đại học Quốc lập Gia Nghĩa', ten_en: 'National Chiayi University - NCYU' },
  80: { ten: 'Đại học Công nghệ Y tế Nguyên Bồi', ten_en: 'YPU – Yuanpei University of Medical Science and Technology' },
  106: { ten: 'Học viện Kỹ thuật Lê Minh', ten_en: 'Lee Ming Institute of Technology, LIT' },
  117: { ten: 'Học viện Y tế và Sức khỏe Đức Dục', ten_en: '' },
};

/** Miền theo toạ độ — chỉ để lọc nhanh, KHÔNG phải ranh giới hành chính. */
function mien(lat, lng) {
  if (lng >= 121.0 && lat < 24.8) return 'dong';
  if (lat >= 24.8) return 'bac';
  if (lat >= 23.4) return 'trung';
  return 'nam';
}

const r = await fetch(`${NGUON}/api/universities`, { headers: UA });
if (!r.ok) throw new Error(`API trả ${r.status}`);
const ds = await r.json();
if (!Array.isArray(ds) || !ds.length) throw new Error('Danh sách rỗng');
console.log(`Nhận ${ds.length} trường`);

const out = [];
let khongToaDo = 0;
for (const u of ds) {
  const lat = parseFloat(u.latitude);
  const lng = parseFloat(u.longitude);
  if (!Number.isFinite(lat) || !Number.isFinite(lng) || lat < 21 || lat > 27 || lng < 118 || lng > 123) { khongToaDo++; continue; }
  const { vi, en } = SUA_TEN[u.id] ? { vi: SUA_TEN[u.id].ten, en: SUA_TEN[u.id].ten_en } : tachTen(u.name);
  const logo = await taiAnh(u.logo_url, path.join(RA_ANH, 'logo', String(u.id)), 96, 0);
  const anh = await taiAnh(u.image_url, path.join(RA_ANH, 'anh', String(u.id)), 640, 72);
  const ci = u.custom_info || {};
  out.push({
    id: u.id, ten: vi, ten_en: en, dia_chi: (u.address || '').trim(),
    lat: +lat.toFixed(6), lng: +lng.toFixed(6), mien: mien(lat, lng),
    web: /^https?:\/\//i.test(u.website || '') ? u.website : '',
    logo, anh,
    xep_hang: ci.ranking || '', so_sv: ci.student_count || '', so_sv_qt: ci.international_students || '', so_gv: ci.faculty_count || '',
  });
  await ngu(120);
}
out.sort((a, b) => a.ten.localeCompare(b.ten, 'vi'));
fs.mkdirSync(path.dirname(RA_JSON), { recursive: true });
fs.writeFileSync(RA_JSON, JSON.stringify(out));
fs.rmSync(TAM, { recursive: true, force: true });
console.log(`Ghi ${out.length} trường (bỏ ${khongToaDo} không có toạ độ hợp lệ) -> ${path.relative(ROOT, RA_JSON)}`);
console.log(`logo: ${out.filter((x) => x.logo).length} · ảnh: ${out.filter((x) => x.anh).length}`);
