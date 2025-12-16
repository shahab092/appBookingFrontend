import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

/**
 * PublicRoute
 * - Only accessible to **unauthenticated users**
 * - If logged in, redirect to their dashboard based on role
 */
const PublicRoute = () => {
  const { user } = useSelector((state) => state.auth);

  if (user) {
    switch (user.role) {
      case "admin":
        return <Navigate to="/admin/dashboard" replace />;
      case "doctor":
        return <Navigate to="/doctor/dashboard" replace />;
      case "patient":
        return <Navigate to="/patient/dashboard" replace />;
      default:
        return <Navigate to="/" replace />;
    }
  }

  return <Outlet />;
};

export default PublicRoute;
