import React from 'react';
import './AdminDashboard.css';
import ManageUsers from './ManageUsers';
import ManageProducts from './ManageProducts';
import ManageReviews from './ManageReviews';

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <ul>
        <li><ManageUsers /></li>
        <li><ManageProducts /></li>
        <li><ManageReviews /></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;