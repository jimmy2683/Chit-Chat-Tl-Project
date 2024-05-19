import React, { useState, useEffect } from "react";
import "./adduser.css";
import avatar from "../../../../../assets/219688.webp";
import axios from "axios";
import {jwtDecode} from "jwt-decode"

function Adduser() {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [users, setUsers] = useState([]);
  const [searchResult, setSearchResult] = useState(null);

  const handleInputChange = (e) => {
    setUsername(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // // Simulate a search result.
    // if (userId === "Koitel") {
    //   setSearchResult({ name: "Koitel", avatar });
    // } else {
    //   setSearchResult(null);
    // }
  };

  const handleAddUser = () => {
    // Logic to add the user goes here.
    alert("User request sent!");
  };

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem("authToken");
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.userId;
      setUserId(userId);
      axios.get(`https://localhost:8000/chats`).then((response)=>{
        setUsers(response.data);
      }).catch((error)=>{
        console.log("Error in retrieving the users.",error);
      })
    };
    fetchUsers();
  }, []);

  console.log(users);

  return (
    <div className="Adduser">
      <form onSubmit={handleFormSubmit}>
        <input
          type="text"
          placeholder="Username"
          name="username"
          value={username}
          onChange={handleInputChange}
        />
        <button type="submit">Search</button>
      </form>
      {users.map((user) => (
        <div key={user._id} className="user">
          <div className="details">
            <img src={user.Avatar} alt="avatar" />
            <span>{user.Username}</span>
          </div>
          <button onClick={handleAddUser}>Add User</button>
        </div>
      ))}
    </div>
  );
}

export default Adduser;
