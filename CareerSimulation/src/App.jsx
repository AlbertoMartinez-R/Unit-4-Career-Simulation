import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './common/Header';
import Footer from './common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductList from './components/products/ProductList';
import AdminDashboard from './components/Admin/AdminDashboard';
import PrivateRoute from './components/PrivateRoute';
import { AuthProvider } from './components/context/authcontext';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="content">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <Route path="/products" component={ProductList} />
            <PrivateRoute path="/admin" component={AdminDashboard} roles={['admin']} />
          </Switch>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
};

export default App;
