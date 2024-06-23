import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const[username, setUsername] = useState('')

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:8080/api/users/login", {
        email,
        username, 
        password
      });
      console.log(response.data)
      navigate("/")
    } catch (error) {
      console.log("Login error:", error)
    }
  }

  const handleSignUp = () => {
    navigate("/signup");
  }


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
            <label htmlFor="InputUsername" className="form-label">
              Username
            </label>
            <input
              type="username"
              id="inputUsername"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.username)}
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
              onChange={(e) => setPassword(e.target.password)}
            />
          </div>
          
          <button type="submit" className="form-btn btn btn-primary">
            Login
          </button>

          <div className="signup-text mb-3">Don't have an account?</div>
          <button type="submit" className="form-btn btn btn-primary" onClick={handleSignUp}>
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
