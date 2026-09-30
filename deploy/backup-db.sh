#!/usr/bin/env bash
# =============================================================
# SAO LƯU DB HẰNG ĐÊM — crontab của user deploy gọi (xem deploy/crontab.txt).
#
# Dữ liệu KHÔNG thay thế được của hệ thống chỉ nằm trong MySQL (kể cả ảnh chứng từ/avatar — lưu
# base64 trong DB). Code, audio, nội dung bài học đã có trên GitHub.
#
#   1. mysqldump -> /var/backups/itaiwan/itaiwan-YYYYmmdd-HHMM.sql.gz, giữ GIU_LOCAL ngày.
#   2. Có BACKUP_REMOTE (vd "r2:itaiwan-backup") thì đẩy bản đó RA NGOÀI VPS bằng rclone và xoá
#      bản trên remote cũ hơn GIU_REMOTE ngày. Chỉ giữ ở VPS thì VPS hỏng là mất cả gốc lẫn bản lưu.
# =============================================================
set -euo pipefail
umask 077   # bản sao lưu chứa dữ liệu cá nhân — chỉ user deploy đọc được

APP=/srv/itaiwan
DICH=/var/backups/itaiwan
GIU_LOCAL=${GIU_LOCAL:-7}
GIU_REMOTE=${GIU_REMOTE:-30}

doc() { grep -E "^$1=" "$APP/.env" | tail -1 | cut -d= -f2- | sed -e 's/^["'\'']//' -e 's/["'\'']$//'; }
DB_NAME=$(doc DB_NAME); DB_USER=$(doc DB_USER)
BACKUP_REMOTE=${BACKUP_REMOTE:-$(doc BACKUP_REMOTE || true)}
export MYSQL_PWD
MYSQL_PWD=$(doc DB_PASSWORD)   # biến môi trường, không lộ mật khẩu trong `ps`

FILE="$DICH/itaiwan-$(date +%Y%m%d-%H%M).sql.gz"
mysqldump -h 127.0.0.1 -u "$DB_USER" --single-transaction --no-tablespaces --set-gtid-purged=OFF \
  --default-character-set=utf8mb4 "$DB_NAME" | gzip -9 > "$FILE.tmp"
# gzip kiểm được toàn vẹn; file rỗng/hỏng thì không được thay chỗ bản tốt.
gzip -t "$FILE.tmp" && [[ $(stat -c%s "$FILE.tmp") -gt 1000 ]] || { echo "❌ Bản sao lưu hỏng"; rm -f "$FILE.tmp"; exit 1; }
mv "$FILE.tmp" "$FILE"
echo "$(date '+%F %T') ✅ $FILE ($(du -h "$FILE" | cut -f1))"

find "$DICH" -name 'itaiwan-*.sql.gz' -mtime +"$GIU_LOCAL" -delete

if [[ -n "$BACKUP_REMOTE" ]]; then
  rclone copy "$FILE" "$BACKUP_REMOTE/" --no-traverse
  rclone delete "$BACKUP_REMOTE/" --min-age "${GIU_REMOTE}d" --include 'itaiwan-*.sql.gz'
  echo "$(date '+%F %T') ☁️  đã đẩy lên $BACKUP_REMOTE"
else
  echo "$(date '+%F %T') ⚠️  Chưa đặt BACKUP_REMOTE — bản sao lưu CHỈ nằm trên VPS."
fi
