import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";


const PublicRoute = ({ children }) => {
      const user = useSelector((state) => state.auth.user);
  if (user) {
    if (user.role === "patient") return <Navigate to="/patient/dashboard" />;
    if (user.role === "doctor") return <Navigate to="/doctor/dashboard" />;
    if (user.role === "admin") return <Navigate to="/admin/dashboard" />;
  }

  return children;
};

export default PublicRoute;
