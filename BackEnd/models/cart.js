import client from '../database/db.js';

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
        console.error('Failed to seed cart database!');
        console.error(e);
    }
};

export const createCart = async ({ product_id, quantity }) => {
    try {
        const { rows } = await client.query(`
            INSERT INTO cart (product_id, quantity)
            VALUES ($1, $2)
            RETURNING *;
        `, [product_id, quantity]);
        return rows[0];
    } catch (e) {
        console.error('Failed to create cart item!');
        console.error(e);
    }
};

export const getCart = async () => {
    try {
        const { rows: cart } = await client.query(`
            SELECT cart.id, products.brand, products.name, products.price, cart.quantity
            FROM cart
            JOIN products ON cart.product_id = products.id;
        `);
        return cart;
    } catch (e) {
        console.error('Failed to get cart items!');
        console.error(e);
    }
};
