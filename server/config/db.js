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
      console.warn('Could not read ca.pem file, SSL connection might fail.');
    }
  }

  dbConfig.ssl = {
    rejectUnauthorized: true,
    ...(caCert ? { ca: caCert } : {})
  };
}

const pool = mysql.createPool(dbConfig);

export default pool;
