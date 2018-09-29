// This file creates the database tables needed
import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.TEST_DB_NAME}`;
} else {
  connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.DB_NAME}`;
}


const pool = new Pool({
  connectionString,
});

const client = new Client({
  connectionString,
});
client.connect();


async function initCategories() {
  try {
    if (process.env.NODE_ENV) {
      const initialCategory = {
        name: 'Salads',
        description: 'Healthy',
      };
      await client.query(`INSERT INTO categories (name, description) VALUES ('${initialCategory.name}', '${initialCategory.description}')`);
      console.log(`INSERT INTO categories (name, description) VALUES (${initialCategory.name}, ${initialCategory.description})`);
    }

    client.end();
    console.log('Tables created successfully!');
  } catch (error) {
    console.log(error);
  }
}

initCategories();
