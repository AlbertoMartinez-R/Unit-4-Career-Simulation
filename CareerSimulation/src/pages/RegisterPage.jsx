import React, { useState } from 'react';
import { registerUser } from '../services/api';
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await registerUser(formData.username, formData.password);
      setSuccess('Registration successful!');
      setError(null);
      setFormData({ username: '', password: '' });
    } catch (error) {
      setError('Error registering user: ' + error.message);
      setSuccess(null);
      console.error('Error registering user:', error);
    }
  };

  return (
    <div className="register-page">
      <h1>Register Page</h1>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegisterPage;