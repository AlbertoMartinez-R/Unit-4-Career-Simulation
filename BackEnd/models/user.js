import { client } from '../database/db.js';
import bcrypt from 'bcrypt';
const salt_count = 10;

export const seedUsers = async () => {
    try {
        const secretPass1 = await bcrypt.hash('armyVet', 10);
        const secretPass2 = await bcrypt.hash('futureFS', 10);

        await client.query(`
            DROP TABLE IF EXISTS users;
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL,
                is_admin BOOLEAN DEFAULT false
            );

            INSERT INTO users (username, password, is_admin)
            VALUES 
            ('EdwinV', '${secretPass1}', true), 
            ('Alberto', '${secretPass2}', true);  
        `);

        console.log('User table seeded successfully!');
    } catch (e) {
        console.error('Failed to seed user database!');
        console.error(e);
    }
};

export const getUser = async () => {
    try {
        const { rows: users } = await client.query('SELECT * FROM public.users;');
        return users;
    } catch (e) {
        console.error('Failed to get users!');
        console.error(e);
    }
};

export const createUserModel = async ({ username, password }) => {
    try {
        const encryptedPassword = await bcrypt.hash(password, salt_count);
        const result = await client.query(`
            INSERT INTO public.users (username, password, is_admin)
            VALUES ($1, $2, $3)
            RETURNING *;
        `, [username, encryptedPassword, false]);

        return result.rows[0];
    } catch (e) {
        console.error('Failed to create user!');
        console.error(e);
    }
};

export const getUserByIdModel = async (id) => {
    try {
        const { rows } = await client.query('SELECT * FROM public.users WHERE id = $1', [id]);
        return rows[0];
    } catch (err) {
        console.error('Failed to get user by ID!', err);
    }
};

export const getUserByUsername = async (username) => {
    try {
        const { rows } = await client.query('SELECT * FROM public.users WHERE username = $1', [username]);
        return rows[0];
    } catch (err) {
        console.error('Failed to get user by username!', err);
    }
};

export const updateUserRoleModel = async (userId, role) => {
    try {
        const { rows } = await client.query(`
            UPDATE users
            SET role = $1
            WHERE id = $2
            RETURNING *;
        `, [role, userId]);
        return rows[0];
    } catch (e) {
        console.error('Failed to update user role!');
        console.error(e);
    }
};

export const banUserModel = async (userId) => {
    try {
        const { rows } = await client.query(`
            UPDATE users 
            SET is_banned = true 
            WHERE id = $1
            RETURNING *;
        `, [userId]);
        return rows[0];
    } catch (e) {
        console.error('Failed to ban user', e);
    }
};