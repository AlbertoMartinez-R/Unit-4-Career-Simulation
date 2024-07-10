import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { fetchOrderHistory } from '../../services/api';

const OrderHistory = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrderHistory = async () => {
      try {
        const ordersData = await fetchOrderHistory(user.id);
        setOrders(ordersData);
      } catch (error) {
        setError('Failed to fetch order history');
        console.error('Error fetching order history:', error);
      }
    };

    loadOrderHistory();
  }, [user.id]);

  return (
    <div className="order-history">
      <h1>Order History</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Product: {order.productName}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: {order.price}</p>
            <p>Status: {order.status}</p>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderHistory;