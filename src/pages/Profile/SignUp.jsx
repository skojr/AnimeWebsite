import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./SignUp.css";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/signup",
        {
          email,
          username,
          password,
        }
      );
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log("Signup error:", error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        setErrorMessage(
          error.response.data || "An error occurred during signup"
        );
      } else if (error.request) {
        // The request was made but no response was received
        setErrorMessage("No response received from server");
      } else {
        // Something happened in setting up the request that triggered an Error
        setErrorMessage("Error setting up the request");
      }
    }
  };

  return (
    <div className="signup-container">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="signup-overlay"></div>
      <div className="form-container">
        <form className="form" onSubmit={handleSignUp}>
          <h1 className="form-header">Sign Up</h1>
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
              onChange={(e) => setUsername(e.target.value)}
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
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};
