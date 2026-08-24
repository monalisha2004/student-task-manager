import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div style={{ maxWidth: 700, margin: '80px auto', textAlign: 'center', padding: '0 20px' }}>
      <h1 style={{ fontSize: 36, marginBottom: 16 }}>
        Manage your coursework in one place
      </h1>
      <p style={{ color: 'var(--color-muted)', fontSize: 17, marginBottom: 28 }}>
        Track assignments, projects, quizzes and exams by priority and deadline.
      </p>
      <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
        <Link to="/register" className="btn btn-primary" style={{ textDecoration: 'none' }}>
          Create your account
        </Link>
      </div>
    </div>
  );
}