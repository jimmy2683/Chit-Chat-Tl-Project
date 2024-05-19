import React, { useState } from "react";
import "./signup.css";
import avatar1 from "../../assets/img1.jpeg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    setAvatarUrl(URL.createObjectURL(file));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "email") setEmail(value);
    if (name === "password") setPassword(value);
    if (name === "confirmPassword") setConfirmPassword(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("Passwords do not match.");
      return;
    }
    const User = {
      Username: username,
      Email: email,
      Password: password,
      Avatar: avatarUrl,
    };
    try {
      const response = await axios.post("http://localhost:8000/signup", User);
      toast.success("Registered Sucessfully.");
      setAvatarUrl("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setUsername("");
      navigate("/login"); // Redirect to login after successful signup
    } catch (error) {
      toast.error("Something is missing");
    }
  };

  return (
    <div className="container">
      <div className="Signup">
        <div className="Welcome">
          <h1>Create an account,</h1>
        </div>
        <div className="SignupForm">
          <form onSubmit={handleSubmit}>
            <div className="email">
              <label>Email: &nbsp;</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                value={email}
                onChange={handleChange}
              />
            </div>
            <div className="Username">
              <label>Username: &nbsp;</label>
              <input
                type="text"
                name="username"
                placeholder="Enter your Username"
                value={username}
                onChange={handleChange}
              />
            </div>
            <div className="image">
              <div>
                <img src={avatarUrl || avatar1} alt="Avatar Preview" />
              </div>
              <label htmlFor="image">Select the profile image: &nbsp;</label>
              <input
                type="file"
                id="image"
                onChange={handleAvatar}
                name="avatar"
              />
            </div>
            <div className="password">
              <label>Password: &nbsp;</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={handleChange}
              />
            </div>
            <div className="confirmpassword">
              <label>Confirm Password: &nbsp;</label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Enter password again to confirm."
                value={confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="buttons">
              <button type="submit">Signup</button>
            </div>
          </form>
          <div className="gotologin">
            <h4>Already have an account? Login</h4>
            <button onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
