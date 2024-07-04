import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductList from './components/Products/ProductList';
import './App.css';

const App = () => {
  return (
    <Router>
      <Header />
      <div className="content">
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/login" component={LoginPage} />
          <Route path="/register" component={RegisterPage} />
          <Route path="/products" component={ProductList} />
        </Switch>
      </div>
      <Footer />
    </Router>
  );
};

export default App;