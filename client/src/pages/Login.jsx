import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '60px auto', padding: '0 20px' }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Welcome back</h2>
        {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label>Email</label><br />
            <input name="email" type="email" value={form.email} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label>Password</label><br />
            <input name="password" type="password" value={form.password} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 16 }}>
          Don't have an account? <Link to="/register">Sign up</Link>
        </p>
      </div>
    </div>
  );
}