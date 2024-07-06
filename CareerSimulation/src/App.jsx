import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductList from './components/products/ProductList';
import AdminDashboard from './components/Admin/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/context/AuthContext';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/products" element={<ProductList />} />
            <Route
              path="/admin"
              element={<PrivateRoute component={AdminDashboard} roles={['admin']} />}
            />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;