import { client } from '../database/db.js';

export const seedProducts = async () => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS products CASCADE;
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        brand VARCHAR(255) NOT NULL,
        name VARCHAR(255) NOT NULL,
        description VARCHAR(255) NOT NULL,
        price INTEGER NOT NULL,
        in_stock BOOLEAN,
        quality INTEGER
      );

      INSERT INTO products (brand, name, description, price, in_stock, quality)
      VALUES 
      ('SAMSUNG', 'Galaxy S24 Ultra', 'The newest phone on the Galaxy series', 999, true, 5 ),
      ('Apple', 'Apple Vision Pro', 'Vision Pro is a revolutionary and futuristic spatial computing device', 3000, true, 1 ),
      ('SONY', '83" Bravia OLED 4K TV', 'Most High Resolution TV in the market', 2500, false, 0),
      ('ASUS', 'Tuf Gaming Laptop', 'Used gaming laptop with last year spec', 500, true, 1);
    `);

    console.log('Products table seeded successfully!');
  } catch (e) {
    console.error('Failed to seed products database!', e);
  }
};

export const getProducts = async () => {
  try {
    const { rows: products } = await client.query(`
      SELECT * FROM public.products;
    `);
    return products;
  } catch (e) {
    console.error('Failed to get products!', e);
  }
};

export const getProductById = async (id) => {
  try {
    const { rows: product } = await client.query(`
      SELECT * FROM pubkic.products WHERE id = $1;
    `, [id]);

    if (product.length === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return product[0];
  } catch (e) {
    console.error(`Failed to get product with ID ${id}!`, e);
  }
};

export const removeProductById = async (id) => {
  try {
    const result = await client.query(`
      DELETE FROM public.products WHERE id = $1 RETURNING *;
    `, [id]);

    if (result.rowCount === 0) {
      throw new Error(`Product with ID ${id} not found`);
    }

    return result.rows[0];
  } catch (e) {
    console.error(`Failed to remove product with ID ${id}!`, e);
  }
};