#!/usr/bin/env node
/**
 * Tự host Font Awesome dạng SUBSET — chỉ những icon dự án thật sự dùng.
 *
 * VÌ SAO (2026-09-06, CLAUDE.md 4.32): bản đầy đủ từ cdnjs tốn 100 KB CSS + 153 KB woff2 = 171 KB
 * (đã nén) cho khoảng 150 icon trong tổng số hơn 2.000, cộng thêm một vòng DNS + TLS tới CDN lạ
 * (~250 ms trên 4G). Subset còn vài KB và nằm cùng origin.
 *
 * `npm run data:fa` — chạy lại sau khi thêm icon mới. Build cũng tự KIỂM TRA (không tự sinh):
 * plugin `tw-kiem-icon` trong vite.config.js quét mã nguồn, thấy icon chưa có trong subset thì
 * cảnh báo to — vì icon thiếu chỉ hiện thành ô trống, không có lỗi nào trong console.
 *
 * Nguồn: scripts/data-cache/fa/ (all.min.css + 3 file woff2 của FA 6.5.1 free, đã gitignore).
 * Kết quả: public/fa/fa-subset.css + fa-{solid,regular,brands}.woff2
 */
import fs from 'node:fs';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const NGUON = path.join(ROOT, 'scripts/data-cache/fa');
const RA = path.join(ROOT, 'public/fa');
/**
 * pyftsubset (fonttools) — dò theo thứ tự: bộ tự chứa trong data-cache, venv của dự án, rồi PATH.
 * Thiếu cả ba thì script báo cách cài chứ KHÔNG âm thầm bỏ qua (subset cũ ở lại, icon mới mất).
 */
function timPyftsubset() {
  const tuChua = path.join(ROOT, 'scripts/data-cache/pytools');
  const thu = [
    { cmd: 'python3', args: ['-m', 'fontTools.subset'], env: { PYTHONPATH: tuChua } },
    { cmd: path.join(ROOT, 'scripts/.venv/bin/pyftsubset'), args: [] },
    { cmd: 'pyftsubset', args: [] },
  ];
  for (const t of thu) {
    try {
      execFileSync(t.cmd, [...t.args, '--help'], { stdio: 'pipe', env: { ...process.env, ...(t.env || {}) } });
      return t;
    } catch { /* thử cách kế tiếp */ }
  }
  throw new Error('Không tìm thấy pyftsubset. Cài bằng:\n'
    + '  python3 -m pip install --target scripts/data-cache/pytools fonttools brotli');
}

/** Tên icon KHÔNG bao giờ xuất hiện nguyên vẹn trong mã vì được ghép chuỗi lúc chạy.
 *  Thêm vào đây khi viết `fa-${...}`; quét tĩnh không thể thấy chúng. */
export const ICON_GHEP_DONG = [
  'fa-play', 'fa-pause',        // src/main.js: `fa-${state.dialogue.playing ? 'pause' : 'play'}`
];

/** Class tiện ích của FA (không phải icon) — phải giữ trong CSS subset. */
const TIEN_ICH = /^fa-(solid|regular|brands|classic|sharp|fw|spin|pulse|beat|fade|flip|bounce|shake|border|inverse|stack|ul|li|li-icon|xs|sm|lg|xl|2xl|[0-9]+x|rotate-[0-9]+|flip-[a-z-]+|spin-reverse|spin-pulse|pull-left|pull-right|layers)$/;

/** Quét mọi tên icon xuất hiện trong mã nguồn. */
export function quetIcon(root = ROOT) {
  /** Mọi file .js/.mjs trong một thư mục con của src, đệ quy. */
  function quetDeQuy(thuMuc) {
    const ra = [];
    const di = (d) => {
      for (const e of fs.readdirSync(path.join(root, d), { withFileTypes: true })) {
        const con = `${d}/${e.name}`;
        if (e.isDirectory()) di(con);
        else if (/\.(js|mjs)$/.test(e.name)) ra.push(con);
      }
    };
    di(thuMuc);
    return ra;
  }

  const files = [
    'index.html', 'admin.html', 'src/main.js', 'src/admin.js',
    // File SERVER, cố ý nằm trong danh sách này: mảng BUOC của khu Hồ sơ du học giữ luôn tên icon
    // và frontend chỉ render qua `${b.icon}` — quét tĩnh mã frontend sẽ không thấy tên nào, icon
    // lặng lẽ biến mất khỏi subset (rộng 0px, không lỗi nào hiện ra — CLAUDE.md 4.32).
    // Quét thẳng file nguồn ở đây thì đổi icon bên server cũng tự được bắt.
    'server/routes/du-hoc.js',
    ...fs.readdirSync(path.join(root, 'src/css')).map((f) => `src/css/${f}`),
    ...fs.readdirSync(path.join(root, 'src/data')).filter((f) => f.endsWith('.js')).map((f) => `src/data/${f}`),
    // ⚠️ QUÉT ĐỆ QUY cả `src/` (2026-09-17). Trước đây danh sách này liệt kê TAY từng file, nên
    // mọi module nạp động sinh ra từ đợt tách main.js (4.40) — `src/pages/*`, `src/core/*` — chưa
    // bao giờ được kiểm: icon trong đó lặng lẽ không vào subset và hiện ra Ô TRẮNG trên giao diện
    // (đã bắt được 10 icon trống ở ba khu mới khi soi ảnh chụp). Quét đệ quy thì thêm module mới
    // là tự có, không phải nhớ sửa danh sách.
    ...quetDeQuy('src'),
  ];
  const ten = new Set(ICON_GHEP_DONG);
  for (const f of files) {
    const p = path.join(root, f);
    if (!fs.existsSync(p)) continue;
    for (const m of fs.readFileSync(p, 'utf8').matchAll(/\bfa-[a-z0-9]+(?:-[a-z0-9]+)*\b/g)) {
      if (!TIEN_ICH.test(m[0])) ten.add(m[0]);
    }
  }
  return ten;
}

/** Bảng tên -> codepoint, bóc từ all.min.css (`.fa-user:before{content:"\f007"}`). */
export function bangCodepoint(css) {
  const bang = new Map();
  // một quy tắc có thể gộp nhiều tên: .fa-a,.fa-b:before{content:"\fXXX"}
  for (const m of css.matchAll(/((?:\.fa-[a-z0-9-]+(?:::?before)?,?)+)\{--fa:\s*"\\([0-9a-f]+)"/g)) {
    for (const t of m[1].split(',')) {
      const ten = /\.(fa-[a-z0-9-]+)/.exec(t);
      if (ten) bang.set(ten[1], parseInt(m[2], 16));
    }
  }
  for (const m of css.matchAll(/((?:\.fa-[a-z0-9-]+(?:::?before)?,?)+)\{content:\s*"\\([0-9a-f]+)"/g)) {
    for (const t of m[1].split(',')) {
      const ten = /\.(fa-[a-z0-9-]+)/.exec(t);
      if (ten && !bang.has(ten[1])) bang.set(ten[1], parseInt(m[2], 16));
    }
  }
  return bang;
}

/** Tải nguồn FA 6.5.1 nếu chưa có (thư mục cache đã gitignore — clone mới sẽ trống). */
async function taiNguon() {
  const CDN = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1';
  const can = [['css/all.min.css', 'all.min.css'], ['webfonts/fa-solid-900.woff2', 'fa-solid-900.woff2'],
    ['webfonts/fa-regular-400.woff2', 'fa-regular-400.woff2'], ['webfonts/fa-brands-400.woff2', 'fa-brands-400.woff2']];
  fs.mkdirSync(NGUON, { recursive: true });
  for (const [xa, gan] of can) {
    const dich = path.join(NGUON, gan);
    if (fs.existsSync(dich)) continue;
    console.log(`[fa] tải ${gan}…`);
    const r = await fetch(`${CDN}/${xa}`);
    if (!r.ok) throw new Error(`Không tải được ${xa}: HTTP ${r.status}`);
    fs.writeFileSync(dich, Buffer.from(await r.arrayBuffer()));
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await taiNguon();
  const css = fs.readFileSync(path.join(NGUON, 'all.min.css'), 'utf8');
  const bang = bangCodepoint(css);
  const dung = [...quetIcon()].sort();
  const co = dung.filter((t) => bang.has(t));
  const khong = dung.filter((t) => !bang.has(t));

  if (!bang.size) throw new Error('Không bóc được codepoint nào từ all.min.css — FA đã đổi định dạng CSS?');
  console.log(`[fa] quét được ${dung.length} tên icon, khớp ${co.length} trong bảng FA 6.5.1`);
  if (khong.length) console.log(`[fa] ⚠️  ${khong.length} tên KHÔNG phải icon FA (bỏ qua): ${khong.slice(0, 12).join(' ')}`);

  fs.mkdirSync(RA, { recursive: true });
  const cps = co.map((t) => bang.get(t));
  const BO = [
    { ten: 'solid', file: 'fa-solid-900.woff2', weight: 900, family: 'Font Awesome 6 Free' },
    { ten: 'regular', file: 'fa-regular-400.woff2', weight: 400, family: 'Font Awesome 6 Free' },
    { ten: 'brands', file: 'fa-brands-400.woff2', weight: 400, family: 'Font Awesome 6 Brands' },
  ];
  const pyft = timPyftsubset();
  const bao = [];
  for (const b of BO) {
    const vao = path.join(NGUON, b.file);
    const raF = path.join(RA, `fa-${b.ten}.woff2`);
    // Giữ TẤT CẢ codepoint đang dùng cho cả ba bộ: một icon có thể nằm ở solid lẫn regular
    // (vd fa-bookmark) và mã chuyển qua lại giữa hai bộ tuỳ trạng thái.
    execFileSync(pyft.cmd, [...pyft.args, vao, `--unicodes=${cps.map((c) => 'U+' + c.toString(16)).join(',')}`,
      '--flavor=woff2', `--output-file=${raF}`, '--no-hinting', '--desubroutinize'],
      { stdio: 'pipe', env: { ...process.env, ...(pyft.env || {}) } });
    bao.push([b, fs.statSync(vao).size, fs.statSync(raF).size]);
  }

  const dinhNghia = co.map((t) => `.${t}{--fa:"\\${bang.get(t).toString(16)}"}`).join('\n');
  const raCss = `/* FILE TỰ SINH bởi scripts/gen-fontawesome-subset.mjs — ĐỪNG SỬA TAY.
   Subset Font Awesome 6.5.1 Free: ${co.length} icon dự án đang dùng (bản đầy đủ có hơn 2.000).
   Thêm icon mới thì chạy \`npm run data:fa\`; build sẽ cảnh báo nếu quên. Xem CLAUDE.md 4.32. */
@font-face{font-family:"Font Awesome 6 Free";font-style:normal;font-weight:900;font-display:block;src:url(/fa/fa-solid.woff2) format("woff2")}
@font-face{font-family:"Font Awesome 6 Free";font-style:normal;font-weight:400;font-display:block;src:url(/fa/fa-regular.woff2) format("woff2")}
@font-face{font-family:"Font Awesome 6 Brands";font-style:normal;font-weight:400;font-display:block;src:url(/fa/fa-brands.woff2) format("woff2")}
.fa,.fas,.fa-solid,.far,.fa-regular,.fab,.fa-brands{-moz-osx-font-smoothing:grayscale;-webkit-font-smoothing:antialiased;display:var(--fa-display,inline-block);font-style:normal;font-variant:normal;line-height:1;text-rendering:auto}
.fa::before,.fas::before,.fa-solid::before,.far::before,.fa-regular::before,.fab::before,.fa-brands::before{content:var(--fa)}
.fa,.fas,.fa-solid{font-family:"Font Awesome 6 Free";font-weight:900}
.far,.fa-regular{font-family:"Font Awesome 6 Free";font-weight:400}
.fab,.fa-brands{font-family:"Font Awesome 6 Brands";font-weight:400}
.fa-fw{text-align:center;width:1.25em}
.fa-spin{animation-name:fa-spin;animation-duration:2s;animation-iteration-count:infinite;animation-timing-function:linear}
.fa-pulse,.fa-spin-pulse{animation-name:fa-spin;animation-direction:normal;animation-duration:1s;animation-iteration-count:infinite;animation-timing-function:steps(8)}
@media (prefers-reduced-motion:reduce){.fa-spin,.fa-pulse,.fa-spin-pulse{animation-delay:-1ms;animation-duration:1ms;animation-iteration-count:1}}
@keyframes fa-spin{0%{transform:rotate(0)}100%{transform:rotate(360deg)}}
.fa-rotate-90{transform:rotate(90deg)}.fa-rotate-180{transform:rotate(180deg)}.fa-rotate-270{transform:rotate(270deg)}
.fa-flip-horizontal{transform:scale(-1,1)}.fa-flip-vertical{transform:scale(1,-1)}
.fa-xs{font-size:.75em;line-height:.083em;vertical-align:.125em}.fa-sm{font-size:.875em;line-height:.071em;vertical-align:.053em}
.fa-lg{font-size:1.25em;line-height:.05em;vertical-align:-.075em}.fa-xl{font-size:1.5em;line-height:.042em;vertical-align:-.125em}
.fa-2xl{font-size:2em;line-height:.031em;vertical-align:-.188em}
.fa-2x{font-size:2em}.fa-3x{font-size:3em}.fa-4x{font-size:4em}.fa-5x{font-size:5em}
${dinhNghia}
`;
  fs.writeFileSync(path.join(RA, 'fa-subset.css'), raCss);
  fs.writeFileSync(path.join(RA, 'icon-dang-dung.json'), JSON.stringify(co));

  const cuTong = bao.reduce((s, [, c]) => s + c, 0) + Buffer.byteLength(css);
  const moiTong = bao.reduce((s, [, , m]) => s + m, 0) + Buffer.byteLength(raCss);
  bao.forEach(([b, c, m]) => console.log(`[fa]   ${b.ten.padEnd(8)} ${(c / 1024).toFixed(0).padStart(4)} KB -> ${(m / 1024).toFixed(1).padStart(5)} KB`));
  console.log(`[fa]   CSS      ${(Buffer.byteLength(css) / 1024).toFixed(0).padStart(4)} KB -> ${(Buffer.byteLength(raCss) / 1024).toFixed(1).padStart(5)} KB`);
  console.log(`[fa] TỔNG ${(cuTong / 1024).toFixed(0)} KB -> ${(moiTong / 1024).toFixed(1)} KB`);
}
