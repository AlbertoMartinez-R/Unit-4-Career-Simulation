import { client } from "../database/db.js";
import bcrypt from 'bcrypt';
const salt_count = 10

export const seedUsers = async () => {
    try {

        const secretPass1 = await bcrypt.hash('armyVet', 10)
        const secretPass2 = await bcrypt.hash('futureFS', 10)


        await client.query(`
            DROP TABLE IF EXISTS users;
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                password VARCHAR(255) NOT NULL
            );

            INSERT INTO users (username, password)
            VALUES ('EdwinV', '${secretPass1}'), 
                   ('Alberto', '${secretPass2}');  
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


export const createUser = async ({username, password})=> {
    try {

        const encryptedPassword = await bcrypt.hash(password, salt_count)
        const result = await client.query(`
            INSERT INTO users (username, password)
            VALUES ($1, $2)
            RETURNING *
            `,[username, encryptedPassword])

            return result.rows[0]

    } catch (e) {
        console.error('Failed to create User!');
        console.error(e);
    }
};


export const getUserByUsername =async (username) => {
    try {
        const { rows } = await client.query(`SELECT * FROM users 
            WHERE username = $1`, [username])
        console.log("selected customers", rows)
        return rows[0]
    } catch (err) {
        console.log("failed getting customer", err)
    }
}   