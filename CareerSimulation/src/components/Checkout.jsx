import React, { useState, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { fetchCart, processCheckout } from '../services/api';
import StripeCheckout from 'react-stripe-checkout';

const Checkout = () => {
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useState(() => {
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

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleToken = async (token) => {
    try {
      await processCheckout(user.id, token, cartItems);
      setSuccess('Payment successful! Your order has been placed.');
      setError(null);
      setCartItems([]);
    } catch (error) {
      setError('Payment failed: ' + error.message);
      setSuccess(null);
      console.error('Error processing payment:', error);
    }
  };

  return (
    <div className="checkout">
      <h1>Checkout</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <ul>
        {cartItems.map(item => (
          <li key={item.id}>
            {item.name} - ${item.price} x {item.quantity}
          </li>
        ))}
      </ul>
      <h2>Total: ${calculateTotal()}</h2>
      <StripeCheckout
        stripeKey="YOUR_STRIPE_PUBLIC_KEY"
        token={handleToken}
        amount={calculateTotal() * 100}
        name="Your Company Name"
        billingAddress
        shippingAddress
      />
    </div>
  );
};

export default Checkout;