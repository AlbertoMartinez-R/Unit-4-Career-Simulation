import { createUserModel, getUser, getUserByIdModel, updateUserRoleModel, banUserModel } from '../models/user.js';
import { addToWishlistModel, removeFromWishlistModel, fetchWishlistModel, fetchUserProfileModel, updateUserProfileModel } from '../models/wishlist.js';
import { fetchOrderHistoryModel, processCheckoutModel } from '../models/order.js';
import bcrypt from 'bcrypt';

export const getAllUsers = async (req, res) => {
    try {
        const users = await getUser();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get users!' });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await getUserByIdModel(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get user by ID!' });
    }
};

export const createUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await createUserModel({ username, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create user!' });
    }
};

export const updateUserRole = async (req, res) => {
    const { userId, role } = req.body;
    try {
        const updatedUser = await updateUserRoleModel(userId, role);
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user role!' });
    }
};

export const banUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const bannedUser = await banUserModel(userId);
        res.status(200).json(bannedUser);
    } catch (error) {
        res.status(500).json({ message: 'Failed to ban user!' });
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

export const fetchOrderHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const orders = await fetchOrderHistoryModel(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch order history!' });
    }
};

export const processCheckout = async (req, res) => {
    const { userId, cartItems } = req.body;
    try {
        const checkout = await processCheckoutModel({ userId, cartItems });
        res.status(200).json(checkout);
    } catch (error) {
        res.status(500).json({ message: 'Failed to process checkout!' });
    }
};

export const updateUserRole = async (req, res) => {
    const {userId, role } = req.body;
    try {
        const updateRole = await updateUserProfile(userId, role);
        res.status(200).json(updateRole);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update user role!'})
    }
};

