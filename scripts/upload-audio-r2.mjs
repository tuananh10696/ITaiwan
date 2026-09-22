#!/usr/bin/env node
/**
 * Đẩy `public/audio` (10.842 file / 276 MB) lên Cloudflare R2.
 *
 *   npm run r2:audio -- --kiem          # chỉ so sánh local với R2, KHÔNG ghi gì
 *   npm run r2:audio                    # đồng bộ toàn bộ
 *   npm run r2:audio -- --thu-muc dangdai,pron
 *
 * VÌ SAO: xem đầu `src/utils/cdn.js`. Tóm tắt: Vercel chặn 15.000 file/deployment (repo đang
 * 11.221) và tính băng thông $0,15/GB; R2 không giới hạn số file và egress $0 vĩnh viễn.
 *
 * DÙNG `aws s3 sync` chứ không dùng SDK: R2 tương thích S3, `sync` đã có sẵn cơ chế bỏ qua file
 * không đổi, chạy song song, và tiếp tục được sau khi đứt mạng. Viết lại bằng SDK chỉ để có
 * thanh tiến độ đẹp hơn là tự chuốc lấy 10.842 lần retry phải tự quản.
 *
 * ⚠️ BẪY ĐÃ DÍNH — aws-cli v2 từ bản 2.23 mặc định gắn `x-amz-checksum-crc32` vào mọi PUT, R2 trả
 * về lỗi 400 `XAmzContentSHA256Mismatch` / `InvalidRequest` cho gần như mọi file. Lỗi trông như
 * sai khoá truy cập nên rất dễ đi dò nhầm hướng. Hai biến `AWS_REQUEST_CHECKSUM_CALCULATION` /
 * `AWS_RESPONSE_CHECKSUM_VALIDATION` = `when_required` bên dưới là thứ tắt nó đi. Đừng gỡ.
 */
import { execFileSync, execFile } from 'node:child_process';
import { promisify } from 'node:util';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';

const execFileP = promisify(execFile);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const GOC = path.resolve(__dirname, '..');
dotenv.config({ path: path.join(GOC, '.env') });

const THU_MUC_AUDIO = path.join(GOC, 'public', 'audio');
const args = process.argv.slice(2);
const co = (t) => args.includes(t);
const giaTri = (t) => { const i = args.indexOf(t); return i >= 0 ? args[i + 1] : null; };

const CHI_KIEM = co('--kiem');
const LOC_THU_MUC = (giaTri('--thu-muc') || '').split(',').map((s) => s.trim()).filter(Boolean);

// Audio là dữ liệu gần như bất biến (cắt từ bản thu gốc), nhưng tên file KHÔNG có hash — chạy lại
// gen-*-audio.py có thể đổi nội dung mà giữ nguyên tên. Nên không đặt `immutable`: 30 ngày +
// revalidate nền, khớp với header đang đặt trong vercel.json. Nếu cắt lại audio thì purge cache
// của Cloudflare cho tiền tố tương ứng, đừng chờ hết hạn.
const CACHE_CONTROL = 'public, max-age=2592000, stale-while-revalidate=86400';

const CAN = ['R2_ACCOUNT_ID', 'R2_ACCESS_KEY_ID', 'R2_SECRET_ACCESS_KEY', 'R2_BUCKET'];

function kiemTraMoiTruong() {
  const thieu = CAN.filter((k) => !process.env[k]);
  if (thieu.length) {
    console.error(`\n❌ Thiếu biến trong .env: ${thieu.join(', ')}\n`);
    console.error('Lấy ở đâu:');
    console.error('  R2_ACCOUNT_ID      Cloudflare dashboard > R2 > góc phải "Account ID"');
    console.error('  R2_ACCESS_KEY_ID   R2 > Manage API Tokens > Create token (quyền Object Read & Write)');
    console.error('  R2_SECRET_ACCESS_KEY   hiện DUY NHẤT một lần lúc tạo token — không xem lại được');
    console.error('  R2_BUCKET          tên bucket, ví dụ: ten-audio\n');
    process.exit(1);
  }
  try {
    execFileSync('aws', ['--version'], { stdio: 'ignore' });
  } catch {
    console.error('\n❌ Chưa có AWS CLI. Cài: brew install awscli\n');
    process.exit(1);
  }
}

/** Env cho tiến trình con: khoá R2 + tắt checksum mới của aws-cli v2 (xem ghi chú đầu file). */
function moiTruongCon() {
  return {
    ...process.env,
    AWS_ACCESS_KEY_ID: process.env.R2_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.R2_SECRET_ACCESS_KEY,
    AWS_DEFAULT_REGION: 'auto',
    AWS_REQUEST_CHECKSUM_CALCULATION: 'when_required',
    AWS_RESPONSE_CHECKSUM_VALIDATION: 'when_required',
    // Trên máy có cấu hình AWS thật (profile công ty), biến này tránh việc CLI đi hỏi metadata EC2.
    AWS_EC2_METADATA_DISABLED: 'true',
  };
}

const endpoint = () => `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

function demFileLocal() {
  const theoThuMuc = {};
  let tong = 0, bytes = 0;
  for (const d of fs.readdirSync(THU_MUC_AUDIO, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    if (LOC_THU_MUC.length && !LOC_THU_MUC.includes(d.name)) continue;
    let n = 0, b = 0;
    for (const f of fs.readdirSync(path.join(THU_MUC_AUDIO, d.name), { withFileTypes: true })) {
      if (!f.isFile()) continue;
      n++;
      b += fs.statSync(path.join(THU_MUC_AUDIO, d.name, f.name)).size;
    }
    theoThuMuc[d.name] = { n, b };
    tong += n; bytes += b;
  }
  return { theoThuMuc, tong, bytes };
}

async function demFileR2(tienTo) {
  // `s3 ls --recursive` trả về từng dòng "ngày giờ kích_thước khoá" — đếm dòng là đủ, không cần
  // parse. Bucket rỗng thì lệnh trả 0 dòng chứ không lỗi.
  const { stdout } = await execFileP('aws', [
    's3', 'ls', `s3://${process.env.R2_BUCKET}/${tienTo}`, '--recursive',
    '--endpoint-url', endpoint(),
  ], { env: moiTruongCon(), maxBuffer: 128 * 1024 * 1024 });
  return stdout.split('\n').filter((d) => d.trim()).length;
}

const mb = (b) => (b / 1024 / 1024).toFixed(1) + ' MB';

async function main() {
  kiemTraMoiTruong();
  const local = demFileLocal();

  console.log(`\nBucket : ${process.env.R2_BUCKET}`);
  console.log(`Endpoint: ${endpoint()}`);
  console.log(`\nLocal (public/audio):`);
  for (const [ten, v] of Object.entries(local.theoThuMuc)) {
    console.log(`  ${ten.padEnd(14)} ${String(v.n).padStart(6)} file  ${mb(v.b).padStart(10)}`);
  }
  console.log(`  ${'TỔNG'.padEnd(14)} ${String(local.tong).padStart(6)} file  ${mb(local.bytes).padStart(10)}`);

  let truoc = 0;
  try {
    truoc = await demFileR2('audio/');
    console.log(`\nTrên R2 hiện có: ${truoc} object dưới audio/`);
  } catch (e) {
    console.error(`\n❌ Không đọc được bucket: ${e.stderr?.trim() || e.message}`);
    console.error('   Kiểm tra lại R2_ACCOUNT_ID / khoá / tên bucket.\n');
    process.exit(1);
  }

  if (CHI_KIEM) {
    const thieu = local.tong - truoc;
    console.log(thieu > 0
      ? `\n→ Còn thiếu khoảng ${thieu} file trên R2. Bỏ --kiem để đẩy lên.\n`
      : `\n→ R2 đã có đủ (hoặc nhiều hơn) số file local.\n`);
    return;
  }

  const thuMuc = LOC_THU_MUC.length ? LOC_THU_MUC : [null];
  for (const tm of thuMuc) {
    const nguon = tm ? path.join(THU_MUC_AUDIO, tm) : THU_MUC_AUDIO;
    const dich = `s3://${process.env.R2_BUCKET}/audio${tm ? '/' + tm : ''}`;
    console.log(`\n▶ Đồng bộ ${tm || 'toàn bộ'} …`);
    execFileSync('aws', [
      's3', 'sync', nguon, dich,
      '--endpoint-url', endpoint(),
      '--cache-control', CACHE_CONTROL,
      // So sánh bằng kích thước: mtime của file vừa clone/checkout luôn khác nhau nên
      // mặc định (size + mtime) sẽ đẩy lại toàn bộ 276 MB mỗi lần chạy.
      '--size-only',
      '--no-progress',
    ], { env: moiTruongCon(), stdio: 'inherit' });
  }

  const sau = await demFileR2('audio/');
  console.log(`\n=== KẾT QUẢ ===`);
  console.log(`Local            : ${local.tong} file`);
  console.log(`R2 trước / sau   : ${truoc} → ${sau} object`);
  if (sau < local.tong) {
    console.log(`\n⚠️  Trên R2 ÍT hơn local ${local.tong - sau} file. Chạy lại lệnh này — `
      + `\`sync\` chỉ đẩy phần còn thiếu nên chạy lại vô hại.`);
  } else {
    console.log(`\n✅ Đủ. Bước tiếp: đặt VITE_CDN_BASE trong .env rồi \`npm run build\`.`);
  }
}

main().catch((e) => {
  console.error('\n❌ Lỗi:', e.stderr?.toString?.().trim() || e.message);
  process.exit(1);
});
