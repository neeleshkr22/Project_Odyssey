import React from 'react';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export const ProtectedRoute = ({ children }) => {
  // Retrieve token from cookies using js-cookie
  const token = Cookies.get('token');

  return token ? children : <Navigate to="/login" />;
};
