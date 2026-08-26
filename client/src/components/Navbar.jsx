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
    <header style={{ borderBottom: '1px solid var(--color-border)', background: 'white' }}>
      <div style={{
        maxWidth: 1000, margin: '0 auto', padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: 'none', color: 'var(--color-ink)' }}>
          Student Task Manager
        </Link>
        <nav style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          {user ? (
            <>
              <Link to="/dashboard" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>Dashboard</Link>
              <span style={{ fontSize: 14 }}>{user.fullName}</span>
              <button onClick={handleLogout} className="btn" style={{ border: '1px solid var(--color-border)' }}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>Log in</Link>
              <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>Sign up</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}