// This file creates the database tables needed
import { Pool, Client } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

// if (process.env.NODE_ENV == 'test') {}

const connectionString = process.env.DATABASE_URL || `postgresql://${process.env.DB_USER}:${process.env.DB_PASS}@localhost:5432/${process.env.DB_NAME}`;


const pool = new Pool({
  connectionString,
});

const client = new Client({
  connectionString,
});
client.connect();

const dropAllTables = 'DROP TABLE IF EXISTS users, orders, food_items, token_blacklist, categories';
const dropAllTypes = 'DROP TYPE IF EXISTS user_role, order_status';

const createRoleEnum = `CREATE TYPE user_role AS ENUM (
  'user', 
  'admin'
)`;

const createStatusEnum = `CREATE TYPE order_status AS ENUM (
  'COMPLETED', 
  'PROCESSING',
  'DECLINED',
  'ACCEPTED',
  'NEW'
)`;

const createUsersTable = `CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  role user_role DEFAULT 'user',
  username varchar(255) NOT NULL,
  email varchar(255) NOT NULL UNIQUE,
  password varchar(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NULL
)`;

const createTokenBlacklistTable = `CREATE TABLE token_blacklist (
  id SERIAL PRIMARY KEY,
  token varchar(255) NULL,
  created_at TIMESTAMP DEFAULT NOW()
)`;

const createCategoriesTable = `CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  name varchar(255) UNIQUE NOT NULL,
  description text,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NULL
)`;

const createFoodItemsTable = `CREATE TABLE food_items (
  id SERIAL PRIMARY KEY,
  name varchar(255) NOT NULL,
  image varchar(255) NOT NULL,
  description text,
  quantity integer NOT NULL,
  unitPrice integer NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NULL
)`;

const createOrdersTable = `CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  customerId integer NOT NULL,
  itemId integer NOT NULL,
  quantity integer NOT NULL,
  totalPrice integer NOT NULL,
  status order_status DEFAULT 'NEW',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NULL,
  dateToDeliver TIMESTAMP DEFAULT NULL,
  FOREIGN KEY (customerId) REFERENCES users (id),
  FOREIGN KEY (itemId) REFERENCES food_items (id)
)`;

async function initializeTables() {
  try {
    // drop tables
    await client.query(dropAllTables);
    await client.query(dropAllTypes);

    // create enum types
    await client.query(createRoleEnum);
    await client.query(createStatusEnum);

    // create tables
    await client.query(createUsersTable);
    console.log('users table created!');
    await client.query(createTokenBlacklistTable);
    console.log('token_blacklist table created!');
    await client.query(createCategoriesTable);
    console.log('categories table created!');
    await client.query(createFoodItemsTable);
    console.log('food_items table created!');
    await client.query(createOrdersTable);
    console.log('orders table created!');

    client.end();
    console.log('Tables created successfully!');
  } catch (error) {
    console.log(error);
  }
}

initializeTables();
