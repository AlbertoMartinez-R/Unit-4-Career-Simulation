import { client } from '../database/db.js';

export const addToWishlistModel = async ({ userId, productId }) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO wishlist (user_id, product_id)
      VALUES ($1, $2)
      RETURNING *;
    `, [userId, productId]);
    return rows[0];
  } catch (e) {
    console.error('Failed to add to wishlist!', e);
  }
};

export const removeFromWishlistModel = async ({ userId, productId }) => {
  try {
    const { rows } = await client.query(`
      DELETE FROM wishlist WHERE user_id = $1 AND product_id = $2
      RETURNING *;
    `, [userId, productId]);
    return rows[0];
  } catch (e) {
    console.error('Failed to remove from wishlist!', e);
  }
};

export const fetchWishlistModel = async (userId) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM wishlist WHERE user_id = $1;
    `, [userId]);
    return rows;
  } catch (e) {
    console.error('Failed to fetch wishlist!', e);
  }
};

export const fetchUserProfileModel = async (userId) => {
  try {
    const { rows } = await client.query(`
      SELECT * FROM users WHERE id = $1;
    `, [userId]);
    return rows[0];
  } catch (e) {
    console.error('Failed to fetch user profile!', e);
  }
};

export const updateUserProfileModel = async (userId, profileData) => {
  try {
    const query = `
      UPDATE users
      SET username = $1, password = $2
      WHERE id = $3 RETURNING *;
    `;
    const values = [profileData.username, profileData.password, userId];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (e) {
    console.error('Failed to update user profile!', e);
  }
};