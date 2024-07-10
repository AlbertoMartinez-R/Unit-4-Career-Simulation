import { createOrder, getOrderHistory, cancelOrder } from '../models/order.js';

export const createOrderController = async (req, res) => {
    const { userId, cartItems } = req.body;
    try {
        const order = await createOrder({ userId, cartItems });
        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create order!' });
    }
};

export const getOrderHistoryController = async (req, res) => {
    try {
        const orders = await getOrderHistory(req.user.id);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get order history!' });
    }
};

export const cancelOrderController = async (req, res) => {
    try {
        const cancelledOrder = await cancelOrder(req.params.id);
        res.status(200).json(cancelledOrder);
    } catch (error) {
        res.status(500).json({ message: 'Failed to cancel order!' });
    }
};