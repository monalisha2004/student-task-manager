import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: '', collegeName: '' });
  const [message, setMessage] = useState('');

  const fetchProfile = async () => {
    const res = await api.get('/users/me');
    setUser(res.data.data.user);
    setStats(res.data.data.stats);
    setForm({ fullName: res.data.data.user.fullName, collegeName: res.data.data.user.collegeName });
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    await api.patch('/users/me', form);
    setMessage('Profile updated.');
    setEditing(false);
    fetchProfile();
  };

  if (!user) return <p style={{ textAlign: 'center', marginTop: 60 }}>Loading…</p>;

  return (
    <div className="page-container-narrow">
      <div className="card">
        {message && <div className="alert alert-success">{message}</div>}

        {!editing ? (
          <>
            <div className="profile-header">
              <h2 className="profile-name">{user.fullName}</h2>
              <div className="profile-meta">{user.email}</div>
              <div className="profile-meta">{user.collegeName}</div>
            </div>

            {stats && (
              <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                <div className="card stat-card">
                  <div className="stat-label">Total</div>
                  <div className="stat-value">{stats.total}</div>
                </div>
                <div className="card stat-card">
                  <div className="stat-label">Completed</div>
                  <div className="stat-value stat-success">{stats.completed}</div>
                </div>
                <div className="card stat-card">
                  <div className="stat-label">Pending</div>
                  <div className="stat-value stat-warning">{stats.pending}</div>
                </div>
              </div>
            )}

            <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit profile</button>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <div className="form-group">
              <label className="form-label">Full name</label>
              <input className="form-input" name="fullName" value={form.fullName} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">College name</label>
              <input className="form-input" name="collegeName" value={form.collegeName} onChange={handleChange} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}