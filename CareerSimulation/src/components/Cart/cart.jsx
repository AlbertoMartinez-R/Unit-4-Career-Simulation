import React, { useEffect, useState } from 'react';
import { fetchCart, updateCartItemQuantity, removeItemFromCart } from '../../services/api';

const Cart = ({ userId }) => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            try {
                const cartData = await fetchCart(userId);
                setCartItems(cartData);
            } catch (error) {
                console.error('Error fetching cart:', error);
            }
        };

        loadCart();
    }, [userId]);

    const handleUpdateQuantity = async (productId, quantity) => {
        try {
            await updateCartItemQuantity(userId, productId, quantity);
            // Refresh cart items
            const updatedCart = await fetchCart(userId);
            setCartItems(updatedCart);
        } catch (error) {
            console.error('Error updating cart item quantity:', error);
        }
    };

    const handleRemoveItem = async (productId) => {
        try {
            await removeItemFromCart(userId, productId);
            // Refresh cart items
            const updatedCart = await fetchCart(userId);
            setCartItems(updatedCart);
        } catch (error) {
            console.error('Error removing cart item:', error);
        }
    };

    return (
        <div>
            <h1>Cart</h1>
            <ul>
                {cartItems.map(item => (
                    <li key={item.productId}>
                        {item.name} - {item.quantity}
                        <button onClick={() => handleUpdateQuantity(item.productId, item.quantity + 1)}>+</button>
                        <button onClick={() => handleUpdateQuantity(item.productId, item.quantity - 1)}>-</button>
                        <button onClick={() => handleRemoveItem(item.productId)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Cart;