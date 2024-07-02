import { client } from "../database/db";

export const seedUsers = async () => {
    try {

        await client.query(`
            DROP TABLE IF EXISTS users;
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255) NOT NULL
            );

            INSERT INTO users (name)
            VALUES ('Edwin'), ('Alberto');
            `)
    } catch (e) {
        console.error('Failed to seed user Database!');
        console.error(e);
    }
};


export const getUser = async () => {
    try {
        const { rows: users } = await client.query(`
            SELECT * FROM users;
         `)

        return users;

    } catch (e) {
        console.error('Failed to get User!');
        console.error(e);
    }
};