// MySQL Connection Pool
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const dbConfig = {
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'taiwan_diary',
  port: parseInt(process.env.DB_PORT || '3306'),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  charset: 'utf8mb4',
};

// Enable SSL if running on Vercel or explicitly requested
if (process.env.VERCEL || process.env.DB_SSL === 'true') {
  let caCert;
  if (process.env.DB_CA_CERT) {
    caCert = process.env.DB_CA_CERT.replace(/\\n/g, '\n');
  } else {
    try {
      caCert = fs.readFileSync(path.join(__dirname, 'ca.pem'));
    } catch (e) {
      console.warn('Không đọc được server/config/ca.pem — kết nối SSL có thể thất bại.\n'
        + '   Tải CA cert của nhà cung cấp DB rồi đặt vào đúng đường dẫn đó.');
    }
  }

  dbConfig.ssl = {
    rejectUnauthorized: true,
    ...(caCert ? { ca: caCert } : {})
  };
}

const pool = mysql.createPool(dbConfig);

export default pool;
