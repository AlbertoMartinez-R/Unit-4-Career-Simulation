import { client } from "../database/db";

export const seedProducts = async () => {
    try {

        await client.query(`
            DROP TABLE IF EXISTS products;
            CREATE TABLE IF NOT EXISTS products (
                id SERIAL PRIMARY KEY,
                brand VARCHAR(255) NOT NULL,
                name VARCHAR (255) NOT NULL,
                description VARCHAR (255) NOT NULL,
                price INTEGER NOT NULL,
                in_stock BOOLEAN,
                quality INTEGER

            );

            INSERT INTO products (brand, description, price, in_stock, quality)
            VALUES 
            (SAMSUNG, Galaxy S24 Ultra, The newest phone on the Galaxy series ,$999, true, 5 );
            (Apple, Apple Vision Pro, Vision Pro is a revolutionary and futuristic spatial computing device, $3000, true, 1 );
            (SONY, 83" Bravia OLED 4K TV, Most High Resolution TV in the market, $2500, false, 0);
            (ASUS, Tuf Gaming Laptop, used gaming laptop with last year spec, $500, true, 1)
            `)

    } catch (e) {
        console.error('Failed to seed user Database!');
        console.error(e);
    }
};


export const getProduct = async () => {
    try {
        const { rows: products } = await client.query(`
            SELECT * FROM products;
            `)

        return products;

    } catch (e) {
        console.error('Failed to get Products!');
        console.error(e);
    }
};