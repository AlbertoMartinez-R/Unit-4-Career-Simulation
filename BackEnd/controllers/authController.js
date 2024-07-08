import { client } from "../database/db.js";

export const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;
    const result = await client.query('SELECT * FROM users WHERE username = $1 AND password = $2', [username, password]);

    if (result.rows.length > 0) {
      res.status(200).json({ message: 'Login successful', user: result.rows[0] });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    console.error('Error logging in user:', err);
    res.status(500).json({ message: 'Server error' });
  }
};
