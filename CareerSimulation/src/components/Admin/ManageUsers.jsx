import React, { useState, useEffect } from 'react';
import { fetchAllUsers, updateUserRole, banUser } from '../../services/api';

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersData = await fetchAllUsers();
        setUsers(usersData);
      } catch (error) {
        setError('Failed to fetch users');
        console.error('Error fetching users:', error);
      }
    };

    loadUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    try {
      await updateUserRole(userId, newRole);
      setUsers(users.map(user => (user.id === userId ? { ...user, role: newRole } : user)));
    } catch (error) {
      setError('Failed to update user role');
      console.error('Error updating user role:', error);
    }
  };

  const handleBanUser = async (userId) => {
    try {
      await banUser(userId);
      setUsers(users.filter(user => user.id !== userId));
    } catch (error) {
      setError('Failed to ban user');
      console.error('Error banning user:', error);
    }
  };

  return (
    <div className="manage-users">
      <h2>Manage Users</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {users.map(user => (
          <li key={user.id}>
            <p>{user.username} - {user.role}</p>
            <select
              value={user.role}
              onChange={(e) => handleRoleChange(user.id, e.target.value)}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <button onClick={() => handleBanUser(user.id)}>Ban</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ManageUsers;