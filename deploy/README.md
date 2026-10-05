# Deploy lên VPS Vietnix — duhocitaiwan.com

Thay cho Vercel + Aiven. Mọi thứ chạy trên **một VPS** (Vietnix VPS SSD 2 · Ubuntu 24.04):

```
Trình duyệt ──HTTPS──> nginx ──/api/*──> Node (PM2, 127.0.0.1:3001) ──> MySQL 8.4 (127.0.0.1)
                         └── file tĩnh: /var/www/duhocitaiwan  (bản build dist/)
crontab ──> deploy/chay-cron.sh (nhắc học 19:00, nhắc du học 08:00) · deploy/backup-db.sh (02:30)
Mail: Resend + SMTP Email Doanh Nghiệp Vietnix, tự chuyển kênh (server/utils/email.js)
```

| File | Việc |
|---|---|
| `setup-server.sh` | Dựng máy lần đầu (root): user deploy, tường lửa, Node 24, PM2, nginx, certbot, MySQL 8.4, rclone |
| `nginx/*.conf` | Thay `vercel.json`: HTTPS, header bảo mật, cache, SPA fallback, proxy `/api` |
| `ecosystem.config.cjs` | PM2 — MỘT tiến trình, `TZ=UTC` |
| `deploy.sh` | Mỗi lần ra bản mới: pull → build → migrate → chép file tĩnh → reload |
| `chay-cron.sh` · `crontab.txt` | Thay Vercel Cron |
| `backup-db.sh` | Dump DB mỗi đêm, giữ 7 bản trên VPS + đẩy ra ngoài (R2) |
| `env.production.example` | Mẫu `.env` trên VPS |

---

## 0. Trước khi bắt đầu (trên máy bạn)

1. **Commit + push lên `main`** mọi thứ muốn chạy trên VPS (gồm thư mục `deploy/` và bản sửa
   `server/utils/email.js`). VPS chỉ lấy code qua `git`.
2. **Bật lại service MySQL trên Aiven** (Aiven Console → service → Power on) — bước 6 cần dump
   dữ liệu mới nhất từ đó.

## 1. Email Doanh Nghiệp (Vietnix portal)

- Tạo 2 hộp thư: **`noreply@duhocitaiwan.com`** (app gửi mail) và **`contact@duhocitaiwan.com`**
  (nhận phản hồi của học viên — `EMAIL_REPLY_TO`).
- Ghi lại **SMTP host** trong mail bàn giao của Vietnix (cổng 465 SSL).
- Hỏi Vietnix (nên có văn bản): trần 200 mail/giờ tính theo hộp thư hay cả domain; có trần/ngày
  không; mail nhắc học cho học viên đã đăng ký có bị coi là "gửi hàng loạt" không.

## 2. DNS (Vietnix → Quản lý tên miền → duhocitaiwan.com → DNS)

| Loại | Tên | Giá trị | Ghi chú |
|---|---|---|---|
| A | `@` | IP VPS | |
| A | `www` | IP VPS | |
| MX | `@` | theo hướng dẫn Email Doanh Nghiệp Vietnix | hộp thư nhân viên |
| TXT | `@` | `v=spf1 include:<giá trị Vietnix cấp> ~all` | **chỉ MỘT bản ghi SPF ở `@`** |
| TXT | `<selector>._domainkey` | DKIM do Vietnix cấp | ký mail gửi qua SMTP Vietnix |
| TXT | `resend._domainkey` | DKIM do Resend cấp | |
| MX | `send` | `feedback-smtp.<region>.amazonses.com` (ưu tiên 10) | Resend — nằm ở subdomain `send`, không đụng MX của `@` |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | Resend |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:contact@duhocitaiwan.com` | |

Bản ghi của Resend: **Resend Dashboard → Domains → Add `duhocitaiwan.com`** (region nên chọn
Tokyo), chép đúng từng dòng Resend hiển thị rồi bấm Verify. Giá trị trong bảng trên chỉ là mẫu.

Kiểm tra: `dig +short duhocitaiwan.com` ra IP VPS trước khi làm bước 8 (xin chứng chỉ).

## 3. Dựng máy

```bash
scp deploy/setup-server.sh root@<IP>:/root/
ssh root@<IP> bash /root/setup-server.sh
```

Tạo database (vẫn ở root):

```bash
sudo mysql <<'SQL'
CREATE DATABASE itaiwan CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
CREATE USER 'itaiwan'@'localhost' IDENTIFIED BY '<MẬT KHẨU MẠNH>';
CREATE USER 'itaiwan'@'127.0.0.1' IDENTIFIED BY '<MẬT KHẨU MẠNH>';
GRANT ALL PRIVILEGES ON itaiwan.* TO 'itaiwan'@'localhost';
GRANT ALL PRIVILEGES ON itaiwan.* TO 'itaiwan'@'127.0.0.1';
SQL
```

Kiểm SMTP Vietnix có đi ra được không: `nc -vz <SMTP host> 465` (phải báo `succeeded`).

## 4. Lấy code (user deploy)

```bash
ssh deploy@<IP>
ssh-keygen -t ed25519 -f ~/.ssh/github_deploy -N ""
cat ~/.ssh/github_deploy.pub
#  -> GitHub repo → Settings → Deploy keys → Add (Read-only)
printf 'Host github.com\n  IdentityFile ~/.ssh/github_deploy\n  IdentitiesOnly yes\n' >> ~/.ssh/config
git clone git@github.com:tuananh10696/ITaiwan.git /srv/itaiwan
```

## 5. `.env`

```bash
cd /srv/itaiwan
cp deploy/env.production.example .env && chmod 600 .env
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"   # JWT_SECRET
node -e "console.log(require('crypto').randomBytes(48).toString('base64url'))"   # CRON_SECRET
npx -y web-push generate-vapid-keys                                              # VAPID_*
nano .env
```

Điền: `DB_PASSWORD`, `JWT_SECRET`, `CRON_SECRET`, `RESEND_API_KEY`, `SMTP_HOST`, `SMTP_PASS`,
`VAPID_*`. **Lưu bản sao `.env` vào trình quản lý mật khẩu** — mất file này là mất khoá đăng nhập
và khoá push.

## 6. Chuyển dữ liệu từ Aiven

Trên **máy bạn** (có `.env.prod` + `server/config/ca.pem`):

```bash
# Ghi lại 2 giá trị này để so với VPS
mysql --ssl-ca=server/config/ca.pem -h <AIVEN_HOST> -P <PORT> -u avnadmin -p \
  -e "SELECT @@GLOBAL.sql_mode, @@GLOBAL.time_zone, VERSION();" defaultdb

mysqldump --ssl-ca=server/config/ca.pem -h <AIVEN_HOST> -P <PORT> -u avnadmin -p \
  --single-transaction --set-gtid-purged=OFF --no-tablespaces --default-character-set=utf8mb4 \
  defaultdb > backups/aiven-cuoi-cung.sql

scp backups/aiven-cuoi-cung.sql deploy@<IP>:/tmp/
```

Trên **VPS**:

```bash
mysql -h 127.0.0.1 -u itaiwan -p itaiwan < /tmp/aiven-cuoi-cung.sql && rm /tmp/aiven-cuoi-cung.sql
mysql -h 127.0.0.1 -u itaiwan -p -e "SELECT @@GLOBAL.sql_mode, @@GLOBAL.time_zone; SELECT COUNT(*) FROM itaiwan.users;"
```

`sql_mode` khác Aiven thì thêm dòng `sql_mode = '<giá trị của Aiven>'` vào
`/etc/mysql/mysql.conf.d/zz-itaiwan.cnf` rồi `sudo systemctl restart mysql`. File dump chứa dữ
liệu cá nhân — xoá ở mọi nơi sau khi nạp xong.

## 7. Build + chạy API

```bash
/srv/itaiwan/deploy/deploy.sh
```

Lần đầu `migrate` sẽ liệt kê các migration chưa chạy (vd `migration-push.sql`) và hỏi xác nhận.
Cuối script phải thấy `✅ /api/health` và `✅ DB`.

## 8. nginx + HTTPS

```bash
cd /srv/itaiwan
sudo cp deploy/nginx/itaiwan-headers.conf /etc/nginx/snippets/
# 8a. cấu hình tạm để xin chứng chỉ
sudo cp deploy/nginx/bootstrap-http.conf /etc/nginx/sites-available/duhocitaiwan.com
sudo ln -sf /etc/nginx/sites-available/duhocitaiwan.com /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot certonly --webroot -w /var/www/certbot \
  -d duhocitaiwan.com -d www.duhocitaiwan.com \
  -m contact@duhocitaiwan.com --agree-tos -n --deploy-hook "systemctl reload nginx"
# 8b. cấu hình thật
sudo cp deploy/nginx/duhocitaiwan.com.conf /etc/nginx/sites-available/duhocitaiwan.com
sudo nginx -t && sudo systemctl reload nginx
sudo certbot renew --dry-run      # gia hạn tự động phải chạy được
```

## 9. Sao lưu + tác vụ định kỳ

1. Cloudflare → R2 → tạo bucket `itaiwan-backup` + API token (Object Read & Write).
2. `rclone config` → New remote `r2` → Storage `s3` → Provider `Cloudflare` → nhập access key,
   secret, endpoint `https://<account_id>.r2.cloudflarestorage.com`.
3. Đặt `BACKUP_REMOTE=r2:itaiwan-backup` trong `.env`, chạy thử:
   `/srv/itaiwan/deploy/backup-db.sh` → phải thấy `✅` và `☁️`.
4. **Thử khôi phục một lần** (bản sao lưu chưa từng khôi phục thì chưa chắc dùng được):
   ```bash
   sudo mysql -e "CREATE DATABASE itaiwan_thu"
   gunzip -c "$(ls -t /var/backups/itaiwan/itaiwan-*.sql.gz | head -1)" | sudo mysql itaiwan_thu
   sudo mysql -e "SELECT COUNT(*) FROM itaiwan_thu.users; DROP DATABASE itaiwan_thu;"
   ```
5. Cài lịch: `crontab /srv/itaiwan/deploy/crontab.txt && crontab -l`
6. Chạy thử cron **không gửi mail**:
   `curl -H "Authorization: Bearer $(grep ^CRON_SECRET= .env | cut -d= -f2-)" "http://127.0.0.1:3001/api/cron/nhac-hoc?thu=1"`

## 10. Kiểm tra trước khi báo học viên

- [ ] `https://duhocitaiwan.com` mở được, ổ khoá hợp lệ; `http://` và `www.` tự chuyển về.
- [ ] Đăng nhập `/admin.html`.
- [ ] `https://duhocitaiwan.com/api/noi-dung/tinh-trang` báo đủ file nội dung.
- [ ] `curl -I https://duhocitaiwan.com/api/cron/nhac-hoc` → **404** (cron không mở ra ngoài).
- [ ] Đăng ký một tài khoản Gmail thật → mail xác nhận vào **Hộp thư đến** (không phải Spam);
      Gmail → "Hiện thư gốc" → SPF, DKIM, DMARC đều **PASS**.
- [ ] Bấm "Nhắc nộp bài" cho tài khoản thử → mail đi qua SMTP Vietnix (xem `pm2 logs itaiwan-api`),
      cũng kiểm SPF/DKIM/DMARC như trên.
- [ ] Bật thông báo đẩy trên điện thoại (cần HTTPS — chỉ thử được sau bước 8).

## 11. Cắt khỏi Vercel + Aiven

1. Vercel → project `itaiwan-edu` → **xoá 2 Cron Jobs / tạm dừng project**. Để nguyên thì Vercel
   vẫn gửi mail nhắc từ DB Aiven — học viên nhận mail trùng, dữ liệu ghi vào hai nơi.
2. Giữ Aiven thêm ~1 tuần làm bản dự phòng rồi xoá service.
3. *(Giới hạn thiết bị đã bỏ 2026-10-05 — mục này chỉ còn là lịch sử.)* `device_id` lưu theo domain (localStorage) → trên domain mới **mỗi máy là máy mới** với giới hạn
   2 thiết bị. Lúc chuyển (27/09) production chỉ có 1 tài khoản nên chưa ảnh hưởng; nếu đã có học
   viên thật thì cân nhắc xoá `user_devices` của học viên sau khi chuyển.

## 12. Khoá SSH (sau khi chắc chắn đăng nhập bằng key được)

```bash
sudo tee /etc/ssh/sshd_config.d/01-itaiwan.conf <<'CONF'
PasswordAuthentication no
KbdInteractiveAuthentication no
PermitRootLogin no
CONF
sudo sshd -t && sudo systemctl reload ssh
sudo sshd -T | grep -iE '^(passwordauthentication|permitrootlogin)'   # phải ra "no"
```

Tên file phải là `01-...`: sshd lấy giá trị ĐẦU TIÊN nó gặp, và image Vietnix có sẵn
`50-cloud-init.conf` bật `PasswordAuthentication yes` — đặt `99-...` là không có tác dụng.
Sau bước này vào máy bằng user `deploy` (sudo không hỏi mật khẩu), không vào bằng root nữa.

Mở một phiên SSH **mới** kiểm tra trước khi đóng phiên cũ. Lỡ bị khoá ngoài: dùng console VNC
trong portal Vietnix.

---

## Vận hành hằng ngày

| Việc | Lệnh |
|---|---|
| Ra bản mới | `ssh -t deploy@<IP> /srv/itaiwan/deploy/deploy.sh` |
| Log API | `pm2 logs itaiwan-api` · `/var/log/itaiwan/api.*.log` |
| Log cron / sao lưu | `/var/log/itaiwan/cron.log` · `/var/log/itaiwan/backup.log` |
| Log nginx | `/var/log/nginx/error.log` |
| Khởi động lại API | `pm2 reload itaiwan-api` |
| Sửa `.env` | sửa xong phải `pm2 reload itaiwan-api --update-env` (khác Vercel: không cần build lại) |
