import React, { useState, useEffect } from 'react';
import { fetchAllOrders, updateOrderStatus } from '../../services/api';

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const ordersData = await fetchAllOrders();
        setOrders(ordersData);
      } catch (error) {
        setError('Failed to fetch orders');
        console.error('Error fetching orders:', error);
      }
    };

    loadOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      setOrders(orders.map(order => (order.id === orderId ? { ...order, status: newStatus } : order)));
    } catch (error) {
      setError('Failed to update order status');
      console.error('Error updating order status:', error);
    }
  };

  return (
    <div className="order-management">
      <h2>Order Management</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            <p>Order ID: {order.id}</p>
            <p>Product: {order.productName}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Price: ${order.price}</p>
            <p>Status: {order.status}</p>
            <select
              value={order.status}
              onChange={(e) => handleStatusChange(order.id, e.target.value)}
            >
              <option value="in process">In Process</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default OrderManagement;