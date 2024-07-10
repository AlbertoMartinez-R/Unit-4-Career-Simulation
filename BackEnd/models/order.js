import { client } from '../database/db.js';

export const seedOrders = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS orders;
      CREATE TABLE IF NOT EXISTS orders (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER,
        status VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );

      INSERT INTO orders (user_id, product_id, quantity, status)
      VALUES 
      (1, 1, 2, 'shipped'),
      (1, 2, 1, 'processing'),
      (2, 3, 1, 'delivered');
    `);

    console.log('Orders table seeded successfully!');
  } catch (e) {
    console.error('Failed to seed orders database!', e);
  }
};

export const createOrder = async ({ userId, cartItems }) => {
  try {
    const { rows: order } = await client.query(`
      INSERT INTO orders (user_id, product_id, quantity, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [userId, cartItems.product_id, cartItems.quantity, 'processing']);

    return order[0];
  } catch (e) {
    console.error('Failed to create order!', e);
  }
};

export const getOrderHistory = async (userId) => {
  try {
    const { rows: orders } = await client.query(`
      SELECT * FROM orders WHERE user_id = $1;
    `, [userId]);

    return orders;
  } catch (e) {
    console.error('Failed to get order history!', e);
  }
};

export const cancelOrder = async (id) => {
  try {
    const { rows: order } = await client.query(`
      UPDATE orders
      SET status = 'cancelled'
      WHERE id = $1
      RETURNING *;
    `, [id]);

    return order[0];
  } catch (e) {
    console.error('Failed to cancel order!', e);
  }
};

export const fetchOrderHistoryModel = async (userId) => {
  try {
    const { rows: orders } = await client.query(`
      SELECT * FROM orders WHERE user_id = $1;
    `, [userId]);

    return orders;
  } catch (e) {
    console.error('Failed to fetch order history!', e);
  }
};

export const processCheckoutModel = async ({ userId, cartItems }) => {
  try {
    const { rows: checkout } = await client.query(`
      INSERT INTO orders (user_id, product_id, quantity, status)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [userId, cartItems.product_id, cartItems.quantity, 'processing']);

    return checkout[0];
  } catch (e) {
    console.error('Failed to process checkout!', e);
  }
};