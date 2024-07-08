import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

let client;

if (!client) {
    client = new Client({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        ssl: { rejectUnauthorized: false }
    });

    client.connect()
        .then(() => console.log('Connected to the PostgreSQL database.'))
        .catch(err => console.error('Error connecting to the database:', err));
}

const connectDataBase = async () => {
    try {
        if (!client._connected) {
            await client.connect();
            console.log('Connected to the PostgreSQL database.');
        }
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
};

export { client, connectDataBase };