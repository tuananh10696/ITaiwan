// PM2 — chạy API Express trên VPS.   pm2 start deploy/ecosystem.config.cjs && pm2 save
//
// MỘT tiến trình (fork), cố ý không dùng cluster: bộ đếm giới hạn tần suất (middleware/gioi-han.js)
// và bộ đếm trần SMTP 200 mail/giờ (utils/email.js) nằm trong bộ nhớ tiến trình. Chạy nhiều tiến
// trình thì mỗi cái đếm riêng -> hạn mức nhân lên theo số tiến trình. Máy 2 CPU với vài trăm học
// viên thì một tiến trình Node là dư.
module.exports = {
  apps: [
    {
      name: 'itaiwan-api',
      cwd: '/srv/itaiwan',
      script: 'server/index.js',
      exec_mode: 'fork',
      instances: 1,
      env: {
        NODE_ENV: 'production',
        // UTC giống Vercel: cron tính "còn mấy ngày" bằng Date của Node, DB cũng chạy UTC.
        TZ: 'UTC',
      },
      max_memory_restart: '600M',
      out_file: '/var/log/itaiwan/api.out.log',
      error_file: '/var/log/itaiwan/api.err.log',
      time: true,
    },
  ],
};
