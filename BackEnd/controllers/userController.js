import { createUser, getUser, getUserByUsername } from '../models/user.js';
import { addToWishlistModel, removeFromWishlistModel, fetchWishlistModel, fetchUserProfileModel, updateUserProfileModel } from '../models/wishlist.js';
import bcrypt from 'bcrypt';

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

export const addToWishlist = async (req, res) => {
    const { userId, productId } = req.body;
    try {
        const wishlist = await addToWishlistModel({ userId, productId });
        res.status(201).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to add to wishlist!' });
    }
};

export const removeFromWishlist = async (req, res) => {
    const { userId, productId } = req.params;
    try {
        const wishlist = await removeFromWishlistModel({ userId, productId });
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove from wishlist!' });
    }
};

export const fetchWishlist = async (req, res) => {
    const { userId } = req.params;
    try {
        const wishlist = await fetchWishlistModel(userId);
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch wishlist!' });
    }
};

export const fetchUserProfile = async (req, res) => {
    const { userId } = req.params;
    try {
        const profile = await fetchUserProfileModel(userId);
        res.status(200).json(profile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch user profile!' });
    }
};

export const updateUserProfile = async (req, res) => {
    const { userId } = req.params;
    const profileData = req.body;
    try {
        const updatedProfile = await updateUserProfileModel(userId, profileData);
        res.status(200).json(updatedProfile);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user profile!' });
    }
};