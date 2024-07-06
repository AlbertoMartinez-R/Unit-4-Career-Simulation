import { createUser, getUser, getUserByUsername } from '../models/user.js';

export const registerUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await createUser({ username, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to register user!' });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await getUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users!' });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await getUserByUsername(username);
        if (user && await bcrypt.compare(password, user.password)) {
            res.status(200).json({ message: 'Login successful!', user });
        } else {
            res.status(401).json({ message: 'Invalid credentials!' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to login!' });
    }
};
