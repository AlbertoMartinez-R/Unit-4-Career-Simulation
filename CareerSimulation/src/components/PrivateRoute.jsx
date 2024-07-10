import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../components/context/AuthContext';

const PrivateRoute = ({ element: Component, roles, ...rest }) => {
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