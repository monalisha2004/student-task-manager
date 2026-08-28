import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ fullName: '', collegeName: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const loadProfile = async () => {
      const res = await api.get('/users/me');
      setUser(res.data.data.user);
      setStats(res.data.data.stats);
      setForm({ fullName: res.data.data.user.fullName, collegeName: res.data.data.user.collegeName });
    };
    loadProfile();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async (e) => {
    e.preventDefault();
    await api.patch('/users/me', form);
    setMessage('Profile updated.');
    setEditing(false);
    const res = await api.get('/users/me');
    setUser(res.data.data.user);
    setStats(res.data.data.stats);
  };

  if (!user) return <p style={{ textAlign: 'center', marginTop: 60 }}>Loading…</p>;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: '0 20px' }}>
      <div className="card">
        {message && <p style={{ color: 'var(--color-success)' }}>{message}</p>}

        {!editing ? (
          <>
            <h2 style={{ marginTop: 0 }}>{user.fullName}</h2>
            <p style={{ color: 'var(--color-muted)' }}>{user.email}</p>
            <p style={{ color: 'var(--color-muted)' }}>{user.collegeName}</p>

            {stats && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, margin: '20px 0' }}>
                <div className="card">
                  <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>Total</div>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{stats.total}</div>
                </div>
                <div className="card">
                  <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>Completed</div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--color-success)' }}>{stats.completed}</div>
                </div>
                <div className="card">
                  <div style={{ fontSize: 12, color: 'var(--color-muted)' }}>Pending</div>
                  <div style={{ fontSize: 22, fontWeight: 700 }}>{stats.pending}</div>
                </div>
              </div>
            )}

            <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit profile</button>
          </>
        ) : (
          <form onSubmit={handleSave}>
            <div style={{ marginBottom: 14 }}>
              <label>Full name</label><br />
              <input name="fullName" value={form.fullName} onChange={handleChange}
                style={{ width: '100%', padding: 10, marginTop: 4 }} />
            </div>
            <div style={{ marginBottom: 20 }}>
              <label>College name</label><br />
              <input name="collegeName" value={form.collegeName} onChange={handleChange}
                style={{ width: '100%', padding: 10, marginTop: 4 }} />
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" className="btn btn-primary">Save</button>
              <button type="button" onClick={() => setEditing(false)}
                style={{ padding: '10px 18px', border: '1px solid var(--color-border)', borderRadius: 6, background: 'white' }}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}