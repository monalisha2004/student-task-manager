import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    fullName: '', email: '', collegeName: '', password: '', confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(form);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 420, margin: '60px auto', padding: '0 20px' }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Create your account</h2>
        {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label>Full name</label><br />
            <input name="fullName" value={form.fullName} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label>Email</label><br />
            <input name="email" type="email" value={form.email} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label>College name</label><br />
            <input name="collegeName" value={form.collegeName} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label>Password</label><br />
            <input name="password" type="password" value={form.password} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label>Confirm password</label><br />
            <input name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }} />
          </div>
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: 16 }}>
          Already have an account? <Link to="/login">Log in</Link>
        </p>
      </div>
    </div>
  );
}