import { useState } from 'react';

export default function Register() {
  const [form, setForm] = useState({
    fullName: '', email: '', collegeName: '', password: '', confirmPassword: ''
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // stops the page from reloading on submit
    console.log('Form submitted:', form); // we'll replace this with a real API call on Day 5
  };

  return (
    <div style={{ maxWidth: 420, margin: '60px auto', padding: '0 20px' }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>Create your account</h2>
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
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            Create account
          </button>
        </form>
      </div>
    </div>
  );
}