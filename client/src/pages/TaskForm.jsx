import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const CATEGORIES = ['Assignment', 'Project', 'Quiz', 'Examination', 'Personal Learning'];
const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Pending', 'In Progress', 'Completed'];

// Converts a date from the database (ISO string) into the format
// the <input type="datetime-local"> needs: "yyyy-MM-ddTHH:mm"
const toDatetimeLocal = (isoString) => {
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function TaskForm() {
  const { id } = useParams();       // will be undefined for "add", or a real id for "edit"
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', description: '', category: 'Assignment', priority: 'Medium', deadline: '', status: 'Pending',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEditing);

  // If we're editing, fetch the existing task's data to pre-fill the form
  useEffect(() => {
    if (!isEditing) return;
    api.get(`/tasks/${id}`)
      .then((res) => {
        const t = res.data.data.task;
        setForm({
          title: t.title,
          description: t.description || '',
          category: t.category,
          priority: t.priority,
          deadline: toDatetimeLocal(t.deadline),
          status: t.status,
        });
      })
      .catch((err) => setError(err.response?.data?.message || 'Could not load task.'))
      .finally(() => setLoading(false));
  }, [id, isEditing]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim() || !form.deadline) {
      setError('Title and deadline are required.');
      return;
    }
    setError('');
    try {
      const payload = { ...form, deadline: new Date(form.deadline).toISOString() };
      if (isEditing) {
        await api.patch(`/tasks/${id}`, payload);
      } else {
        await api.post('/tasks', payload);
      }
      navigate('/tasks');
    } catch (err) {
      setError(err.response?.data?.message || 'Could not save task.');
    }
  };

  if (loading) return <p style={{ textAlign: 'center', marginTop: 60 }}>Loading…</p>;

  return (
    <div style={{ maxWidth: 500, margin: '40px auto', padding: '0 20px' }}>
      <div className="card">
        <h2 style={{ marginTop: 0 }}>{isEditing ? 'Edit task' : 'Add a new task'}</h2>
        {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label>Title</label><br />
            <input name="title" value={form.title} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label>Description</label><br />
            <textarea name="description" value={form.description} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4, minHeight: 80 }} />
          </div>
          <div style={{ marginBottom: 14 }}>
            <label>Category</label><br />
            <select name="category" value={form.category} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label>Priority</label><br />
            <select name="priority" value={form.priority} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }}>
              {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ marginBottom: 14 }}>
            <label>Deadline</label><br />
            <input name="deadline" type="datetime-local" value={form.deadline} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }} />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label>Status</label><br />
            <select name="status" value={form.status} onChange={handleChange}
              style={{ width: '100%', padding: 10, marginTop: 4 }}>
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="btn btn-primary">
              {isEditing ? 'Save changes' : 'Add task'}
            </button>
            <button type="button" onClick={() => navigate('/tasks')}
              style={{ padding: '10px 18px', border: '1px solid var(--color-border)', borderRadius: 6, background: 'white' }}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}