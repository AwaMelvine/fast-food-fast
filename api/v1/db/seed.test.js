import dotenv from 'dotenv';
import { Pool, Client } from 'pg';
import bcrypt from 'bcryptjs';
import db from '.';
import { firstCategory } from '../../../test/data/categories';
import { firstItem } from '../../../test/data/foodItems';
import { firstOrder } from '../../../test/data/orders';
import { firstUser } from '../../../test/data/users';

dotenv.config();

let connectionString = '';
if (process.env.NODE_ENV === 'test') {
  connectionString = process.env.TEST_DB_URL;
} else {
  connectionString = process.env.DATABASE_URL;
}

const pool = new Pool({
  connectionString,
});

const client = new Client({
  connectionString,
});
client.connect();

export const initUsers = async () => {
  const passwordHash = bcrypt.hashSync(firstUser.password, 10);
  const params = [firstUser.role, firstUser.username, firstUser.email, passwordHash];
  try {
    await db.query(`INSERT INTO users (role, username, email, password)
      VALUES ($1, $2, $3, $4)`, params);
  } catch (error) {
    return error;
  }
};


export const initFoodItems = async () => {
  const params = [firstItem.name, firstItem.image, firstItem.description, firstItem.quantity, firstItem.unit_price];
  try {
    await db.query(`INSERT INTO food_items (name, image, description, quantity, unit_price)
    VALUES ($1, $2, $3, $4, $5)`, params);
  } catch (error) {
    return error;
  }
};


export const initCategories = async () => {
  const params = [firstCategory.name, firstCategory.description];
  try {
    await db.query(`INSERT INTO categories (name, description)
    VALUES ($1, $2)`, params);
  } catch (error) {
    return error;
  }
};


export const initOrders = async () => {
  const params = [firstOrder.customer_id, firstOrder.item_id, firstOrder.quantity, firstOrder.total_price, firstOrder.date_to_deliver, firstOrder.status];
  try {
    await db.query(`INSERT INTO orders (customer_id, item_id, quantity, total_price, date_to_deliver, status)
    VALUES ($1, $2, $3, $4, $5, $6)`, params);
  } catch (error) {
    return error;
  }
};


client.end();
