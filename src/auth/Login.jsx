import { useState } from "react";
import "./Login.css";
import { getCurrentUser, login } from "./AuthService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      const user = await getCurrentUser();
      if (user != null) {
        toast.success("Logged in successfully!");
        setTimeout(() => {
          navigate("/", { replace: true });
          window.location.reload();
        }, 3000);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="login-container">
      <div className="login-overlay"></div>
      <div className="form-container">
        <form className="form" onSubmit={handleLogin}>
          <h1 className="form-header">Login</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="form-btn btn btn-primary">
            Login
          </button>

          <div className="signup-text mb-3">Don't have an account?</div>
          <button
            type="submit"
            className="form-btn btn btn-primary"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </form>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};
