import { Navigate } from "react-router-dom";
import { isAuthenticated } from "./AuthService";

export const ProtectedRoutes = ({ children }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
