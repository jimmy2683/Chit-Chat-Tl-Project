import React from "react";
import { Link } from "react-router-dom";
import './header.css';

function Header({ user, onLogout }) {
    return (
        <nav>
            <div className="header">
                <div className="headermaterial1">Logo</div>
                <div className="headermaterial2">
                    <ul className="headermat2">
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/chats">Chats</Link>
                        </li>
                        <li>
                            <Link to="/about">About</Link>
                        </li>
                        {!user ? (
                            <>
                                <li>
                                    <Link to="/login">Login</Link>
                                </li>
                                <li>
                                    <Link to="/signup">Signup</Link>
                                </li>
                            </>
                        ) : (
                            <li>
                                <Link to="/" onClick={onLogout}>Logout</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Header;
