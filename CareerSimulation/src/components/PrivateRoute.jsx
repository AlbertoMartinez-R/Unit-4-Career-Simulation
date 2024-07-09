import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (roles && roles.indexOf(user.role) === -1) {
    return <Navigate to="/" replace />;
  }

  return <Component {...rest} />;
};

export default PrivateRoute;