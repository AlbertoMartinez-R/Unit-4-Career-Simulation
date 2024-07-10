import { seedUsers, getUser, createUser, getUserByUsername } from '../models/user.js';
import { seedProducts, getProducts, getProductById, removeProductById } from '../models/product.js';
import { seedOrders, getOrderHistory, createOrder, cancelOrder } from '../models/order.js';
import { seedCart, createCart, getCart, removeCartItem } from '../models/cart.js';

// Route to seed the database
export const seedDatabase = async (req, res, next) => {
    try {
        await seedUsers();
        await seedProducts();
        await seedOrders();
        await seedCart();
        res.send({ message: 'Database seeded successfully!' });
    } catch (e) {
        next(e);
    }
};

// Route to get all users
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await getUser();
        res.send({ users });
    } catch (e) {
        next(e);
    }
};

// Route to get all products
export const getAllProducts = async (req, res, next) => {
    try {
        const products = await getProducts();
        res.send({ products });
    } catch (e) {
        next(e);
    }
};

// Route to get a specific product by ID
export const getProductByIdController = async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);
        res.send({ product });
    } catch (e) {
        next(e);
    }
};

// Route to remove a product by ID
export const removeProductByIdController = async (req, res, next) => {
    try {
        const removedProduct = await removeProductById(req.params.id);
        res.send({ message: 'Product removed successfully!', product: removedProduct });
    } catch (e) {
        next(e);
    }
};

// Route to get order history
export const getOrderHistoryController = async (req, res, next) => {
    try {
        const orders = await getOrderHistory(req.user.id);
        res.send({ orders });
    } catch (e) {
        next(e);
    }
};

// Route to cancel an order by ID
export const cancelOrderController = async (req, res, next) => {
    try {
        const cancelledOrder = await cancelOrder(req.params.id);
        res.send({ message: 'Order cancelled successfully!', order: cancelledOrder });
    } catch (e) {
        next(e);
    }
};