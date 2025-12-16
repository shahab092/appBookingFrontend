import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * Role-based Protected Route
 * @param {Array} allowedRoles - array of roles allowed to access this route
 */
const ProtectedRoute = ({ allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User logged in but role not allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Allowed
  return <Outlet />;
};

export default ProtectedRoute;
