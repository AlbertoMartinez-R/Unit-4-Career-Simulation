import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from './context/AuthContext';
import { fetchUserProfile, updateUserProfile } from '../services/api';

const UserProfile = () => {
  const { user } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    address: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const profileData = await fetchUserProfile(user.id);
        setFormData(profileData);
      } catch (error) {
        setError('Failed to fetch user profile');
        console.error('Error fetching user profile:', error);
      }
    };

    loadUserProfile();
  }, [user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(user.id, formData);
      setSuccess('Profile updated successfully');
      setError(null);
    } catch (error) {
      setError('Error updating profile: ' + error.message);
      setSuccess(null);
      console.error('Error updating profile:', error);
    }
  };

  return (
    <div className="user-profile">
      <h1>User Profile</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;