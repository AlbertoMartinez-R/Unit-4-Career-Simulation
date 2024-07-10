import { client } from '../database/db.js';

export const seedOrders = async () => {
    try {
        await client.query(`
            DROP TABLE IF EXISTS orders CASCADE;
            CREATE TABLE IF NOT EXISTS orders (
                id SERIAL PRIMARY KEY,
                user_id INTEGER REFERENCES users(id),
                product_id INTEGER REFERENCES products(id),
                quantity INTEGER NOT NULL,
                status VARCHAR(50) NOT NULL DEFAULT 'pending',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );

            INSERT INTO orders (user_id, product_id, quantity, status)
            VALUES 
            (1, 1, 2, 'completed'),
            (2, 3, 1, 'pending');
        `);

        console.log('Orders table seeded successfully!');
    } catch (e) {
        console.error('Failed to seed orders database!');
        console.error(e);
    }
};

export const createOrder = async ({ userId, productId, quantity }) => {
    try {
        const { rows: [order] } = await client.query(`
            INSERT INTO orders (user_id, product_id, quantity)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [userId, productId, quantity]);

        return order;
    } catch (e) {
        console.error('Failed to create order!');
        console.error(e);
    }
};

export const getOrderHistory = async (userId) => {
    try {
        const { rows: orders } = await client.query(`
            SELECT * FROM orders WHERE user_id = $1;
        `, [userId]);

        return orders;
    } catch (e) {
        console.error('Failed to get order history!');
        console.error(e);
    }
};

export const cancelOrder = async (orderId) => {
    try {
        const { rows: [order] } = await client.query(`
            UPDATE orders SET status = 'cancelled'
            WHERE id = $1
            RETURNING *;
        `, [orderId]);

        return order;
    } catch (e) {
        console.error('Failed to cancel order!');
        console.error(e);
    }
};