import { useState } from 'react';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Login attempt:', form);
  };

  return (
    <div style={{ maxWidth: 420, margin: '60px auto', padding: '0 20px' }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Welcome back</h2>
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
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Log in
          </button>
        </form>
      </div>
    </div>
  );
}