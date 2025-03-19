import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isLoggedIn, username, onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        onLogout();  // Clear stored user data
        navigate('/');  // Redirect to Homepage after logout
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-custom">
            <div className="container">
                 {/* Brand Section - Link for Guests, Plain Text for Logged-in Users */}
                 {isLoggedIn ? (
                    <span className="navbar-brand">Recipe Management</span>
                ) : (
                    <Link className="navbar-brand" to="/">Recipe Management</Link>
                )}
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        {isLoggedIn ? (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/all-recipes">All Recipes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/your-recipes">Your Recipes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about-us">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact-us">Contact Us</Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <button 
                                        className="nav-link dropdown-toggle btn btn-link"
                                        type="button"
                                        data-bs-toggle="dropdown"
                                    >
                                        Profile
                                    </button>
                                    <ul className="dropdown-menu">
                                        <li>
                                            <span className="dropdown-item">Welcome, {username}</span>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" onClick={handleLogout}>
                                                Logout
                                            </button>
                                        </li>
                                    </ul>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about-us">About Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/contact-us">Contact Us</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/register">Register</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/login">Login</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
