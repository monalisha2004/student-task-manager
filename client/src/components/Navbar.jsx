import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <header style={{ borderBottom: '1px solid var(--color-border)', background: 'white' }}>
      <div style={{
        maxWidth: 1000, margin: '0 auto', padding: '0 24px', height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between'
      }}>
        <Link to="/" style={{ fontWeight: 700, fontSize: 18, textDecoration: 'none', color: 'var(--color-ink)' }}>
          Student Task Manager
        </Link>
        <nav style={{ display: 'flex', gap: 16 }}>
          <Link to="/login" style={{ color: 'var(--color-muted)', textDecoration: 'none' }}>Log in</Link>
          <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>Sign up</Link>
        </nav>
      </div>
    </header>
  );
}