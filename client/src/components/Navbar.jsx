import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
       <Link to="/" className="brand">
  <Link to="/" className="brand">
  <span className="brand-logo">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 11l3 3L22 4" />
      <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
    </svg>
  </span>
</Link>
  Student Task Manager
</Link>
        <nav className="nav-links">
          {user ? (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <Link to="/tasks" className="nav-link">Tasks</Link>
              <Link to="/profile" className="nav-link">Profile</Link>
              <span className="nav-user-name">{user.fullName}</span>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Log in</Link>
              <Link to="/register" className="btn btn-primary btn-sm">Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}