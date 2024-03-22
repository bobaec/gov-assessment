import React from 'react'
import './Navbar.scss';
import { Link } from 'react-router-dom';
const Navbar = ({ isAuthenticated, setAuth }) => {
  return (
    <div className="navbar-container">
        <Link className="navbar-home" to="/">KANBAN</Link>
        <div className="links-container">
            <Link className="navbar-link" to="/dashboard">Dashboard</Link>
            {!isAuthenticated ? (
                <Link className="navbar-link" to="/login">Login</Link>
                ) : (
                <Link className="navbar-link" to="/" onClick={() => setAuth(false)}>Logout</Link>
                )
            }
        </div>
    </div>
  )
}

export default Navbar