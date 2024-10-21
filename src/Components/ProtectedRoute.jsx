// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isAdmin } = useContext(AuthContext);

  // Check if the user is an admin
  return isAdmin() ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
