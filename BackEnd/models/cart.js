import { client } from "../database/db.js";

export const seedCart = async () => {
    try {

        await client.query(`
            DROP TABLE IF EXISTS cart;
            CREATE TABLE IF NOT EXISTS cart (
                id SERIAL PRIMARY KEY,
                product_id INTEGER REFERENCES products(id),
                quality INTEGER DEFAULT 1
            )
            `)

    } catch (e) {
        console.error('Failed to seed cart Database!');
        console.error(e);
    }
};



export const createCart = async ({ brand, name, price, quality }) => {
    try {

        const { rows } = await client.query(`
            INSERT INTO cart (brand, name, price, quality)
            VALUES ($1, $2. $3, $4)
            RETURNING *;
        `, [brand, name, price, quality])

    } catch (e) {
        console.error('Failed to create Cart!');
        console.error(e);
    }
};


export const getCart = async () => {
    try {

        const { rows: cart } = await client.query(`
            JOIN brand ON cart.brand = product.brand
            JOIN name ON cart.name = product.name
            JOIN price ON cart.price = product.price
            JOIN quality ON cart.quality = product.quality
            `);
        return cart;

    } catch (e) {
        console.error('Failed to get Cart!');
        console.error(e);
    }
};