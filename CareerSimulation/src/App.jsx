import React from 'react';
import { BrowserRouter as Router, Route, Navigate, Routes } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import { AuthProvider, AuthContext } from './components/context/AuthContext';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = React.useContext(AuthContext);
  return user && user.isAdmin ? <Component {...rest} /> : <Navigate to="/login" />;
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/admin-dashboard" element={<PrivateRoute component={AdminDashboard} />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;