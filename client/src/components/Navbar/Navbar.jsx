import React from 'react'
import './Navbar.scss';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { isAdministrator } from '../../utilities/utilities';

const Navbar = () => {
  const { isAuthenticated, user, setAuth } = useAuth();
  return (
    <div className="navbar-container">
        <Link className="navbar-home" to="/">KANBAN</Link>
        <div className="links-container">
            {isAuthenticated ? <div className="navbar-link">{user.user_name}</div> : null}
            {isAuthenticated ? <Link className="navbar-link" to="/dashboard">Dashboard</Link> : null}
            {isAdministrator(user.role_id) ? <Link className="navbar-link" to="/admin">Admin</Link> : null}
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