import { Navigate } from "react-router-dom";
import { getCurrentUser } from "./AuthService";

export const ProtectedRoutes = ({ children }) => {
  const userId = localStorage.getItem("userId");
  if (!userId || userId === "null" || userId === "") {
    return <Navigate to="/login" replace />;
  }

  return children;
};
