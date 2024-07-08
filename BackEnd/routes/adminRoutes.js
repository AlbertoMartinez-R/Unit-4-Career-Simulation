import express from 'express';
import { seedUsers, getUser, createUser, getUserByUsername } from '../models/user.js';
import { seedProducts, getProducts, getProductById, removeProductById } from '../models/product.js';
import { seedOrders, getOrderHistory, createOrder, cancelOrder } from '../models/order.js';

const adminRouter = express.Router();

// Route to seed the database
adminRouter.post('/seed', async (req, res, next) => {
    try {
        await seedUsers();
        await seedProducts();
        await seedOrders();
        res.send({ message: 'Database seeded successfully!' });
    } catch (e) {
        next(e);
    }
});

// Route to get all users
adminRouter.get('/users', async (req, res, next) => {
    try {
        const users = await getUser();
        res.send({ users });
    } catch (e) {
        next(e);
    }
});

// Route to get all products
adminRouter.get('/products', async (req, res, next) => {
    try {
        const products = await getProducts();
        res.send({ products });
    } catch (e) {
        next(e);
    }
});

// Route to get a specific product by ID
adminRouter.get('/products/:id', async (req, res, next) => {
    try {
        const product = await getProductById(req.params.id);
        res.send({ product });
    } catch (e) {
        next(e);
    }
});

// Route to remove a product by ID
adminRouter.delete('/products/:id', async (req, res, next) => {
    try {
        const removedProduct = await removeProductById(req.params.id);
        res.send({ message: 'Product removed successfully!', product: removedProduct });
    } catch (e) {
        next(e);
    }
});

// Route to get order history
adminRouter.get('/orders', async (req, res, next) => {
    try {
        const orders = await getOrderHistory(req.user.id);
        res.send({ orders });
    } catch (e) {
        next(e);
    }
});

// Route to cancel an order by ID
adminRouter.delete('/orders/:id', async (req, res, next) => {
    try {
        const cancelledOrder = await cancelOrder(req.params.id);
        res.send({ message: 'Order cancelled successfully!', order: cancelledOrder });
    } catch (e) {
        next(e);
    }
});

export default adminRouter;