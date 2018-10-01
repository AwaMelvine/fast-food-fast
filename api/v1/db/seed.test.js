import dotenv from 'dotenv';
import { Pool, Client } from 'pg';
import db from '.';
// import initialCategory from '../../../test/data/categories';

dotenv.config();

let connectionString;
if (process.env.NODE_ENV === 'test') {
  connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.TEST_DB_NAME}`;
} else {
  connectionString = `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.DB_NAME}`;
}

const pool = new Pool({
  connectionString,
});

const client = new Client({
  connectionString,
});
client.connect();

export const initUsers = async () => {
  try {
    await db.query(`INSERT INTO users (role, username, email, password)
      VALUES ('user', 'Awa', 'testuser@test.com', 'gikflks')`);
  } catch (error) {
    return error;
  }
};


export const initFoodItems = async () => {
  try {
    await db.query(`INSERT INTO food_items (name, image, description, quantity, unit_price)
    VALUES ('Vegetable Salad', 'http://via.placeholder.com/170x170', 'Good', 4, 500)`);
  } catch (error) {
    return error;
  }
};


export const initCategories = async () => {
  try {
    await db.query(`INSERT INTO categories (name, description)
    VALUES ('Fruits', 'Healthy!')`);
  } catch (error) {
    return error;
  }
};


export const initOrders = async () => {
  try {
    await db.query(`INSERT INTO orders (customer_id, item_id, quantity, total_price, date_to_deliver, status)
    VALUES (1, 1, 2, 4000, '04-09-2018', 'NEW')`);
  } catch (error) {
    return error;
  }
};


client.end();
