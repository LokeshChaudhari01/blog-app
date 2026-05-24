import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { PenSquare, LogOut, LogIn, UserPlus } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-brand">
          Blog<span className="text-primary">CMS</span>
        </Link>
        <div className="nav-links">
          {user ? (
            <>
              <Link to="/create-post" className="btn btn-ghost">
                <PenSquare size={18} />
                <span>Write</span>
              </Link>
              <div className="user-profile">
                <div className="avatar">{user.email.charAt(0).toUpperCase()}</div>
                <button onClick={handleLogout} className="btn btn-outline" title="Logout">
                  <LogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-ghost">
                <LogIn size={18} />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="btn btn-primary">
                <UserPlus size={18} />
                <span>Sign Up</span>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
