import pg from 'pg';
import fs from 'fs';
import dotenv from 'dotenv';

dotenv.config();

const { Client } = pg;

const DATABASE_URL = process.env.DATABASE_URL || `postgres://localhost:5432/amazon_store`;
const DB_HOST = process.env.DB_HOST || 'amazonstore.cra06w0aaa0a.us-east-2.rds.amazonaws.com';
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || 'PotatoSalad123456789';
const DB_NAME = process.env.DB_NAME || 'amazonstore';

const client = new Client({
    host: DB_HOST,
    port: 5432,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    ssl: {
        rejectUnauthorized: true,
        ca: fs.readFileSync('../TestPurposes.pem').toString(),
    },
});

export const connectDataBase = async () => {
    try {
        await client.connect();
        console.log(`Successfully connected to the Database ${DB_HOST}`);
    } catch (e) {
        console.error(`Failed to connect to the Database ${DB_HOST}`);
        console.error(e);
    }
};

export { client };
