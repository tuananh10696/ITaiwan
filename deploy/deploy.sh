#!/usr/bin/env bash
# =============================================================
# DEPLOY bản mới lên VPS — chạy bằng user deploy, qua SSH (cần terminal để xác nhận migration):
#   ssh deploy@<IP> 'bash -s' < deploy/deploy.sh      # KHÔNG dùng: migrate cần TTY
#   ssh -t deploy@<IP> /srv/itaiwan/deploy/deploy.sh    # dùng cách này
#
# Thứ tự: kéo code -> cài gói -> build -> migration DB -> chép file tĩnh -> reload API -> kiểm tra.
# Migration chạy TRƯỚC khi reload để code mới không gặp schema cũ.
# =============================================================
set -euo pipefail

APP=/srv/itaiwan
WEB=/var/www/duhocitaiwan
cd "$APP"

echo "==> Kéo code từ origin/main"
if [[ -n "$(git status --porcelain --untracked-files=no)" ]]; then
  echo "❌ Có file bị sửa tay trên server — dừng để không ghi đè:"; git status --short; exit 1
fi
git fetch --prune origin
git merge --ff-only origin/main
echo "   $(git log -1 --format='%h %s')"

echo "==> Cài gói (kèm devDependencies: vite cần cho bước build)"
PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1 npm ci --include=dev --no-audit --no-fund

echo "==> Build"
# Phải là `npm run build` ra đúng dist/: plugin trong vite.config.js xoá nội dung trả phí khỏi
# thư mục 'dist' viết cứng — build ra thư mục khác là lộ nội dung trả phí.
npm run build

echo "==> Migration DB (có sao lưu trước, hỏi xác nhận nếu có file mới)"
node scripts/migrate.mjs --local

echo "==> Chép file tĩnh sang $WEB"
# --delay-updates: đổi cả loạt ở cuối, không có lúc nửa cũ nửa mới.
# 'P assets/': giữ file JS/CSS có hash của bản CŨ — người đang mở trang cũ vẫn tải được chunk.
rsync -a --delete-after --delay-updates --filter='P assets/' dist/ "$WEB/"
find "$WEB/assets" -type f -mtime +30 -delete 2>/dev/null || true

echo "==> Reload API"
pm2 startOrReload deploy/ecosystem.config.cjs --update-env
pm2 save >/dev/null

echo "==> Kiểm tra"
sleep 2
curl -fsS http://127.0.0.1:3001/api/health >/dev/null && echo "   ✅ /api/health"
# Route có truy vấn DB — /api/health không chạm DB nên không đủ.
curl -fsS -o /dev/null http://127.0.0.1:3001/api/leaderboard && echo "   ✅ DB (/api/leaderboard)"
curl -fsS http://127.0.0.1:3001/api/noi-dung/tinh-trang | head -c 300; echo
echo "XONG."
