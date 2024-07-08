import React, { useState } from 'react';
import { register } from '../services/api'; // Ensure this import is correct
import './RegisterPage.css';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  const [apiResponse, setApiResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const data = await register(formData.username, formData.password);
      alert('Registration successful!');
      setFormData({ username: '', password: '', confirmPassword: '' });
    } catch (error) {
      alert('Error registering user: ' + error.message);
      console.error('Error registering user:', error);
    }
  };

  const testApiConnection = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api'}/test`);
      const data = await response.json();
      setApiResponse(data);
      console.log('API response:', data);
    } catch (error) {
      console.error('Error connecting to API:', error);
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
        <input
          type="password"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="Confirm Password"
          required
        />
        <button type="submit">Register</button>
      </form>
      <button onClick={testApiConnection}>Test API Connection</button>
      {apiResponse && <pre>{JSON.stringify(apiResponse, null, 2)}</pre>}
    </div>
  );
};

export default RegisterPage;