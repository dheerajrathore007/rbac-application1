import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectCurrentRole } from '../store/slices/authSlice';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const role = useSelector(selectCurrentRole);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;