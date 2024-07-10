import { client } from '../database/db.js';

export const seedCart = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS cart;
      CREATE TABLE IF NOT EXISTS cart (
        id SERIAL PRIMARY KEY,
        product_id INTEGER REFERENCES products(id),
        quantity INTEGER DEFAULT 1
      );
    `);

    console.log('Cart table seeded successfully!');
  } catch (e) {
    console.error('Failed to seed cart database!', e);
  }
};

export const createCart = async ({ productId, quantity }) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO cart (product_id, quantity)
      VALUES ($1, $2)
      RETURNING *;
    `, [productId, quantity]);

    return rows[0];
  } catch (e) {
    console.error('Failed to create cart!', e);
  }
};

export const getCart = async () => {
  try {
    const { rows: cart } = await client.query(`
      SELECT * FROM cart;
    `);
    return cart;
  } catch (e) {
    console.error('Failed to get cart!', e);
  }
};

export const removeCartItem = async (id) => {
  try {
    const { rows } = await client.query(`
      DELETE FROM cart WHERE id = $1
      RETURNING *;
    `, [id]);

    return rows[0];
  } catch (e) {
    console.error('Failed to remove cart item!', e);
  }
};

export const updateCartItemQuantity = async (id, productId, quantity) => {
  try {
    const { rows } = await client.query(`
      UPDATE cart
      SET product_id = $1, quantity = $2
      WHERE id = $3
      RETURNING *;
    `, [productId, quantity, id]);

    return rows[0];
  } catch (e) {
    console.error('Failed to update cart item quantity!', e);
  }
};
