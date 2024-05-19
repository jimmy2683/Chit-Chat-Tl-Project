import React, { useEffect, useState } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        navigate("/chats");
      }
    };

    checkLoginStatus();
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const User = {
      Email: email,
      Password: password,
    };

    try {
      const response = await axios.post("http://localhost:8000/login", User);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      navigate("/chats");
      window.location.reload(); 
      toast.success("Logged In Successfully");
    } catch (error) {
      console.log("Login Error", error);
      toast.error("Something Wrong.");
    }
  };

  return (
    <div className="container">
      <div className="logincontainer">
        <div className="loginbox">
          <div className="Welcome">
            <h1>Welcome Back,</h1>
          </div>
          <form className="loginform" onSubmit={handleLogin}>
            <div className="login">
              <label>Username: </label>
              <input
                type="text"
                placeholder="Enter the email here "
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="password">
              <label>Password: </label>
              <input
                type="password"
                placeholder="Enter the password here"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="buttons">
              <button type="submit" className="login">
                Login
              </button>
            </div>
          </form>
          <div className="gotosignup">
            <h4>Don't have an account? Register</h4>
            <button onClick={() => navigate("/signup")}>
              Signup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
