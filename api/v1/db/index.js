import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


let connectionString;
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DB_URL;
} else {
  connectionString = process.env.DB_URL;
}

const pool = new Pool({ connectionString });

export default {
  async query(text, params) {
    const res = await pool.query(text, params);
    return res;
  },
};
