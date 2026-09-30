#!/usr/bin/env bash
# =============================================================
# DỰNG VPS LẦN ĐẦU — Ubuntu 24.04 LTS (Vietnix VPS SSD 2)
#
# Chạy MỘT lần bằng root ngay sau khi nhận VPS:
#   scp deploy/setup-server.sh root@<IP>:/root/  &&  ssh root@<IP> bash /root/setup-server.sh
#
# Làm: tạo user `deploy`, tường lửa, fail2ban, swap, múi giờ, cập nhật bảo mật tự động,
#      Node 24 LTS + PM2, nginx, certbot, MySQL 8.4 LTS (repo chính thức của MySQL), rclone,
#      thư mục /srv/itaiwan · /var/www/duhocitaiwan · /var/backups/itaiwan · /var/log/itaiwan.
# KHÔNG làm: tắt đăng nhập SSH bằng mật khẩu (làm tay sau khi chắc SSH key chạy — xem README),
#            tạo database (bước riêng, cần mật khẩu bạn tự đặt).
#
# Chạy lại được: bước nào đã xong thì bỏ qua.
# =============================================================
set -euo pipefail

[[ $EUID -eq 0 ]] || { echo "Chạy bằng root."; exit 1; }
. /etc/os-release
[[ "$VERSION_CODENAME" == "noble" ]] || { echo "Script viết cho Ubuntu 24.04 (noble), máy này là $PRETTY_NAME."; exit 1; }

export DEBIAN_FRONTEND=noninteractive
# Gặp file cấu hình mà nhà cung cấp đã sửa (vd sshd_config) thì GIỮ bản đang có, không hỏi.
APT_OPT=(-y -o Dpkg::Options::=--force-confdef -o Dpkg::Options::=--force-confold)
buoc() { echo -e "\n==> $*"; }

buoc "Cập nhật hệ thống"
apt-get update -y
apt-get upgrade "${APT_OPT[@]}"
apt-get install "${APT_OPT[@]}" curl ca-certificates gnupg git ufw fail2ban unattended-upgrades rsync unzip jq dnsutils cron

buoc "Múi giờ hệ điều hành: Asia/Ho_Chi_Minh (để crontab và log đọc theo giờ Việt Nam)"
# Node và MySQL vẫn chạy UTC — giống hệt Aiven/Vercel trước đây (xem ecosystem.config.cjs, mysql).
timedatectl set-timezone Asia/Ho_Chi_Minh

buoc "Cập nhật bảo mật tự động"
dpkg-reconfigure -f noninteractive unattended-upgrades

buoc "Swap 2GB (npm ci + vite build trên máy 4GB RAM)"
if ! swapon --show | grep -q /swapfile; then
  fallocate -l 2G /swapfile && chmod 600 /swapfile && mkswap /swapfile && swapon /swapfile
  grep -q '^/swapfile' /etc/fstab || echo '/swapfile none swap sw 0 0' >> /etc/fstab
  sysctl -w vm.swappiness=10 && echo 'vm.swappiness=10' > /etc/sysctl.d/99-swappiness.conf
fi

buoc "User deploy (sudo, dùng chung SSH key của root)"
if ! id deploy &>/dev/null; then
  adduser --disabled-password --gecos "" deploy
  usermod -aG sudo deploy
  install -d -m 700 -o deploy -g deploy /home/deploy/.ssh
  if [[ -f /root/.ssh/authorized_keys ]]; then
    install -m 600 -o deploy -g deploy /root/.ssh/authorized_keys /home/deploy/.ssh/authorized_keys
  fi
fi
# deploy không có mật khẩu (chỉ vào bằng SSH key) -> sudo không hỏi mật khẩu. Ngang quyền đăng nhập
# root bằng key như hiện tại; sau khi tắt đăng nhập root (README bước 12) thì đây là cửa duy nhất.
echo 'deploy ALL=(ALL) NOPASSWD:ALL' > /etc/sudoers.d/90-deploy
chmod 440 /etc/sudoers.d/90-deploy
visudo -cf /etc/sudoers.d/90-deploy

buoc "Tường lửa: chỉ mở SSH, 80, 443 (cổng 3001 của Node và 3306 của MySQL KHÔNG ra ngoài)"
ufw allow OpenSSH
ufw allow 'Nginx Full' 2>/dev/null || { ufw allow 80/tcp; ufw allow 443/tcp; }
ufw --force enable

buoc "fail2ban chặn dò mật khẩu SSH"
systemctl enable --now fail2ban

buoc "Node.js 24 LTS + PM2"
if ! command -v node &>/dev/null || [[ "$(node -v)" != v24* ]]; then
  curl -fsSL https://deb.nodesource.com/setup_24.x | bash -
  apt-get install "${APT_OPT[@]}" nodejs
fi
npm install -g pm2@latest

buoc "nginx + certbot"
apt-get install "${APT_OPT[@]}" nginx certbot
install -d -m 755 /var/www/certbot
rm -f /etc/nginx/sites-enabled/default

buoc "MySQL 8.4 LTS — khớp phiên bản production trên Aiven (8.4.8)"
# Repo mặc định của Ubuntu 24.04 chỉ có MySQL 8.0; nạp dump 8.4 vào 8.0 là HẠ phiên bản, MySQL
# không hỗ trợ chính thức.
# Khoá ký: RPM-GPG-KEY-mysql-2025 (cùng khoá B7B3B788A8D3785C với file "-2023" nhưng đã gia hạn tới
# 2027-10-23). File "-2023" hết hạn 2025-10-23 -> apt báo EXPKEYSIG và từ chối cả kho. Hết hạn lần
# nữa thì tải lại từ keyserver.ubuntu.com (search=0xB7B3B788A8D3785C) — bản ở đó luôn mới nhất.
# Ghi đè mỗi lần chạy (idempotent) để lần chạy lại cũng nhận khoá mới.
curl -fsSL https://repo.mysql.com/RPM-GPG-KEY-mysql-2025 | gpg --dearmor --yes -o /usr/share/keyrings/mysql.gpg
echo "deb [signed-by=/usr/share/keyrings/mysql.gpg] http://repo.mysql.com/apt/ubuntu noble mysql-8.4-lts" \
  > /etc/apt/sources.list.d/mysql.list
apt-get update -y
apt-get install "${APT_OPT[@]}" mysql-server mysql-client
mysql --version

buoc "Cấu hình MySQL (chỉ nghe localhost, UTC, utf8mb4, bộ nhớ cho máy 4GB)"
MYSQL_CNF_DIR=/etc/mysql/mysql.conf.d
[[ -d $MYSQL_CNF_DIR ]] || MYSQL_CNF_DIR=/etc/mysql/conf.d
cat > "$MYSQL_CNF_DIR/zz-itaiwan.cnf" <<'CNF'
[mysqld]
bind-address            = 127.0.0.1
mysqlx                  = OFF
# UTC giống Aiven: cột DATETIME đang lưu giá trị NOW() theo UTC; đổi múi giờ là lệch dữ liệu cũ.
default-time-zone       = '+00:00'
character-set-server    = utf8mb4
collation-server        = utf8mb4_0900_ai_ci
innodb_buffer_pool_size = 1G
max_connections         = 100
# Ảnh base64 (tối đa ~900KB/ảnh) đi trong một câu INSERT.
max_allowed_packet      = 64M
CNF
systemctl restart mysql
systemctl enable mysql

buoc "rclone (đẩy bản sao lưu lên Cloudflare R2 / S3)"
# Cài từ kho Ubuntu (mirror trong nước), không dùng rclone.org/install.sh: máy chủ tải của rclone
# chỉ đạt ~10-17 KB/s từ VPS Vietnix (đo 2026-09-30). Bản 1.60 của Ubuntu đã hỗ trợ Cloudflare R2.
command -v rclone &>/dev/null || apt-get install "${APT_OPT[@]}" rclone

buoc "Thư mục ứng dụng"
install -d -m 755 -o deploy -g deploy /srv/itaiwan /var/www/duhocitaiwan
install -d -m 750 -o deploy -g deploy /var/log/itaiwan
install -d -m 700 -o deploy -g deploy /var/backups/itaiwan

buoc "PM2 tự khởi động cùng máy (dưới user deploy)"
env PATH="$PATH:/usr/bin" pm2 startup systemd -u deploy --hp /home/deploy >/dev/null

echo -e "\nXONG. Làm tiếp theo deploy/README.md từ bước 3 (tạo database)."
