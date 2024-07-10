import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import apiRouter from './routes/api.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import orderRouter from './routes/orderRoutes.js';
import productRouter from './routes/productRoutes.js';
import adminRouter from './routes/adminRoutes.js';
import { initDataBase } from './database/index.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 3032;

app.use(cors());
app.use(express.json());

app.use('/api', apiRouter);
app.use('/auth', authRouter);
app.use('/users', userRouter);
app.use('/cart', cartRouter);
app.use('/orders', orderRouter);
app.use('/products', productRouter);
app.use('/admin', adminRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/`);
});

// initDataBase(true);
