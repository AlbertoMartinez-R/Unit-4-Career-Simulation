import dotenv from 'dotenv';
import express from 'express';
import authRoutes from './routes/authRoutes.js';
// import cartRoutes from './routes/cartRoutes.js';

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/auth', authRoutes);
// More routes here 

app.get('/', (req, res) => {
  res.send('Server is running and connected to the database!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
