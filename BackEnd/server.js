import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js'; 
import { initDataBase } from './database/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3032;

app.use(cors());
// Or specify only the origin you need
// app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());
app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

// initDataBase(true);