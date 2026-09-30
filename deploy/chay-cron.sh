#!/usr/bin/env bash
# Gọi một tác vụ định kỳ của API — thay cho Vercel Cron.   chay-cron.sh nhac-hoc
# Đọc CRON_SECRET từ .env tại chỗ để khỏi ghi bí mật vào crontab. Gọi thẳng 127.0.0.1:3001:
# nginx cố ý trả 404 cho /api/cron/ từ bên ngoài.
set -euo pipefail
TAC_VU=${1:?Thiếu tên tác vụ, vd: nhac-hoc | nhac-du-hoc}
APP=/srv/itaiwan
BI_MAT=$(grep -E '^CRON_SECRET=' "$APP/.env" | tail -1 | cut -d= -f2- | sed -e 's/^["'\'']//' -e 's/["'\'']$//')
PORT=$(grep -E '^PORT=' "$APP/.env" | tail -1 | cut -d= -f2- || true)

echo "=== $(date '+%F %T') $TAC_VU"
# -m 600: một lô 200 mail tuần tự có thể mất vài phút.
curl -sS -m 600 -H "Authorization: Bearer $BI_MAT" "http://127.0.0.1:${PORT:-3001}/api/cron/$TAC_VU" | head -c 2000
echo
