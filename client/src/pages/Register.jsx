import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ fullName: '', email: '', collegeName: '', password: '', confirmPassword: '' });
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
    <div className="auth-wrap">
      <div className="card" style={{ width: '100%', maxWidth: 440 }}>
        <h1 className="auth-title">Create your account</h1>
        <p className="auth-subtitle">Set up your profile to start tracking coursework.</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full name</label>
            <input className="form-input" name="fullName" value={form.fullName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input className="form-input" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">College name</label>
            <input className="form-input" name="collegeName" value={form.collegeName} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" name="password" type="password" value={form.password} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Confirm password</label>
              <input className="form-input" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block" disabled={submitting}>
            {submitting ? 'Creating account…' : 'Create account'}
          </button>
        </form>

        <div className="auth-switch">
          Already have an account? <Link to="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>Log in</Link>
        </div>
      </div>
    </div>
  );
}