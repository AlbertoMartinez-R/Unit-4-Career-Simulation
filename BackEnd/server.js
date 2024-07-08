import express from 'express';
import apiRouter from './routes/api.js';
import { initDataBase } from './database/index.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', apiRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/api`);
});

initDataBase(true); // Initialize and seed the database if needed
