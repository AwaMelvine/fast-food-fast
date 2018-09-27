import { Pool } from 'pg';

const connectionString = process.env.DATABASE_URL || 'postgresql://postgres:melvine@localhost:5432/fff-test';

const pool = new Pool({ connectionString });

export default {
  async query(text, params) {
    const res = await pool.query(text, params);
    return res;
  },
};
