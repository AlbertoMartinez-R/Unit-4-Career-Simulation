import { createCart, getCart, removeCartItem, updateCartItemQuantity } from '../models/cart.js';

export const createCartController = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const cart = await createCart({ productId, quantity });
        res.status(201).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create cart!' });
    }
};

export const getCartController = async (req, res) => {
    try {
        const cart = await getCart();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get cart!' });
    }
};

export const removeCartItemController = async (req, res) => {
    try {
        const cartItem = await removeCartItem(req.params.id);
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: 'Failed to remove cart item!' });
    }
};

export const updateCartItemQuantityController = async (req, res) => {
    const { productId, quantity } = req.body;
    try {
        const updatedItem = await updateCartItemQuantity(req.params.id, productId, quantity);
        res.status(200).json(updatedItem);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update cart item quantity!' });
    }
};