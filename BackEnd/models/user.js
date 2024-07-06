import client from '../database/db.js';
import bcrypt from 'bcrypt';
const salt_count = 10;

export const seedUsers = async () => {
    try {
        const secretPass1 = await bcrypt.hash('armyVet', salt_count);
        const secretPass2 = await bcrypt.hash('futureFS', salt_count);

        await client.query('DROP TABLE IF EXISTS users;');
        await client.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2), 
                   ($3, $4);
        `, ['EdwinV', secretPass1, 'Alberto', secretPass2]);

        console.log('User table seeded successfully!');
    } catch (e) {
        console.error('Failed to seed user database!');
        console.error(e);
    }
};

export const getUser = async () => {
    try {
        const { rows: users } = await client.query('SELECT * FROM users;');
        return users;
    } catch (e) {
        console.error('Failed to get users!');
        console.error(e);
    }
};

export const createUser = async ({ username, password }) => {
    try {
        const encryptedPassword = await bcrypt.hash(password, salt_count);
        const result = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING *;
        `, [username, encryptedPassword]);

        return result.rows[0];
    } catch (e) {
        console.error('Failed to create user!');
        console.error(e);
    }
};

export const getUserByUsername = async (username) => {
    try {
        const { rows } = await client.query('SELECT * FROM users WHERE username = $1', [username]);
        return rows[0];
    } catch (err) {
        console.error('Failed to get user by username!', err);
    }
};