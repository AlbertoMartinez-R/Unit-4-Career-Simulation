import { client } from '../database/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secretJwt = process.env.JWT_SECRET || 'superSecret';

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await client.query('SELECT * FROM public.users WHERE username = $1', [username]);

    if (result.rows.length > 0) {
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.sign(
          { id: user.id, username: user.username },
          secretJwt,
          { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login successful', token });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

export const registerUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await client.query(
      'INSERT INTO public.users (username, password, is_admin) VALUES ($1, $2, false) RETURNING *',
      [username, hashedPassword]
    );
    const user = result.rows[0];
    res.status(201).json({ message: 'Registration successful', user });
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};