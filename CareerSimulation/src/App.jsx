import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import UserProfile from './components/User/UserProfile';
import OrderHistory from './components/User/oderhistory';
import ProductList from './components/products/ProductList';
import ProductDetail from './components/products/productDetails';
import Cart from './components/Cart/cart';
import Checkout from './components/Checkout';
import Wishlist from './components/Wishlist';
import { AuthProvider, AuthContext } from './components/context/AuthContext';
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<PrivateRoute component={UserProfile} />} />
          <Route path="/order-history" element={<PrivateRoute component={OrderHistory} />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:productId" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<PrivateRoute component={Checkout} />} />
          <Route path="/wishlist" element={<PrivateRoute component={Wishlist} />} />
          <Route path="/admin-dashboard" element={<PrivateRoute component={AdminDashboard} />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;