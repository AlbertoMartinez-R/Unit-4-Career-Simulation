import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { fetchCart, updateCart, removeItemFromCart } from '../services/api';

const Cart = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await fetchCart(user.id);
        setCartItems(cartData);
      } catch (error) {
        setError('Failed to fetch cart');
        console.error('Error fetching cart:', error);
      }
    };

    loadCart();
  }, [user.id]);

  const handleQuantityChange = async (itemId, quantity) => {
    try {
      const updatedCart = await updateCart(user.id, itemId, quantity);
      setCartItems(updatedCart);
    } catch (error) {
      setError('Error updating cart item: ' + error.message);
      console.error('Error updating cart item:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const updatedCart = await removeItemFromCart(user.id, itemId);
      setCartItems(updatedCart);
    } catch (error) {
      setError('Error removing cart item: ' + error.message);
      console.error('Error removing cart item:', error);
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart">
      <h1>My Cart</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            <p>{item.name} - ${item.price} x {item.quantity}</p>
            <div>
              <button onClick={() => handleQuantityChange(item.id, item.quantity + 1)}>+</button>
              <button onClick={() => handleQuantityChange(item.id, item.quantity - 1)}>-</button>
              <button onClick={() => handleRemoveItem(item.id)}>Remove</button>
            </div>
          </li>
        ))}
      </ul>
      <h2>Total: ${calculateTotal()}</h2>
    </div>
  );
};

export default Cart;