import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios';

const CATEGORIES = ['Assignment', 'Project', 'Quiz', 'Examination', 'Personal Learning'];
const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Pending', 'In Progress', 'Completed'];

const toDatetimeLocal = (isoString) => {
  const d = new Date(isoString);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

export default function TaskForm() {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '', description: '', category: 'Assignment', priority: 'Medium', deadline: '', status: 'Pending',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEditing);

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
    <div className="page-container-narrow">
      <div className="card">
        <h2 style={{ marginBottom: 4 }}>{isEditing ? 'Edit task' : 'Add a new task'}</h2>
        <p className="auth-subtitle">{isEditing ? 'Update the details below.' : 'Fill in the details for your task.'}</p>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Title</label>
            <input className="form-input" name="title" value={form.title} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea className="form-textarea" name="description" value={form.description} onChange={handleChange} />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" name="category" value={form.category} onChange={handleChange}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Priority</label>
              <select className="form-select" name="priority" value={form.priority} onChange={handleChange}>
                {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Deadline</label>
              <input className="form-input" name="deadline" type="datetime-local" value={form.deadline} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" name="status" value={form.status} onChange={handleChange}>
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10 }}>
            <button type="submit" className="btn btn-primary">{isEditing ? 'Save changes' : 'Add task'}</button>
            <button type="button" className="btn btn-secondary" onClick={() => navigate('/tasks')}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}