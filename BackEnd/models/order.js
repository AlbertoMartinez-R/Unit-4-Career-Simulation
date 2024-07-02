import { client } from "../database/db";

export const seedCart = async () => {
    try {

        await client.query(`
            DROP TABLE IF EXISTS cart;
            CREATE TABLE IF NOT EXISTS cart (
                id SERIAL PRIMARY KEY,
                brand REFERENCES product(brand) NOT NULL,
                name REFERENCES product(name) NOT NULL,
                price REFERENCES product(price) NOT NULL,
                quality REFERENCES product(quality) NOT NULL
            )
            `)
    } catch (e) {
        console.error('Failed to seed cart Database!');
        console.error(e);
    }
};