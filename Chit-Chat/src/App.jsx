import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Header from "./components/header/header";
import Footer from "./components/footer/footer";
import Login from "./components/login/login";
import Chats from "./components/homepage/chats/chats";
import Users from "./components/homepage/users/users";
import Details from "./components/homepage/details/details";
import Notifications from "./components/notifications/notification";
import Signup from "./components/signup/signup";
import HomePage from "./components/homepage/homepage"; // Import HomePage component
import { toast } from "react-toastify";

function App() {
  const [user, setUser] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setUser(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    toast.success("Logged out Successfully.")
    setUser(false);
  };

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setUser(true);
    navigate("/"); // Navigate to homepage after login
  };

  const isAuthPage = location.pathname === "/login" || location.pathname === "/signup";

  return (
    <div className="body">
      {!isAuthPage && <Header user={user} onLogout={handleLogout} />}
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/chats"
            element={
              user ? (
                <>
                  <Users />
                  <Chats />
                  <Details />
                </>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </div>
      <Notifications />
      {!isAuthPage && <Footer />}
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}

export default AppWrapper;
