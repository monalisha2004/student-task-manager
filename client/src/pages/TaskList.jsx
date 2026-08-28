import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CATEGORIES = ['Assignment', 'Project', 'Quiz', 'Examination', 'Personal Learning'];
const PRIORITIES = ['Low', 'Medium', 'High'];
const STATUSES = ['Pending', 'In Progress', 'Completed'];

export default function TaskList() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [priority, setPriority] = useState('');
  const [status, setStatus] = useState('');
  const [sortBy, setSortBy] = useState('deadline');

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await api.get('/tasks');
      setTasks(res.data.data.tasks);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = async (taskId) => {
    if (!window.confirm('Delete this task? This cannot be undone.')) return;
    await api.delete(`/tasks/${taskId}`);
    fetchTasks();
  };

  const handleMarkComplete = async (taskId) => {
    await api.patch(`/tasks/${taskId}`, { status: 'Completed' });
    fetchTasks();
  };

  const visibleTasks = tasks
    .filter((t) => !search || t.title.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => !category || t.category === category)
    .filter((t) => !priority || t.priority === priority)
    .filter((t) => !status || t.status === status)
    .sort((a, b) => {
      if (sortBy === 'createdAt') return new Date(b.createdAt) - new Date(a.createdAt);
      return new Date(a.deadline) - new Date(b.deadline);
    });

  const isOverdue = (task) => task.status !== 'Completed' && new Date(task.deadline) < new Date();

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>My Tasks</h2>
        <Link to="/tasks/new" className="btn btn-primary" style={{ textDecoration: 'none' }}>+ Add task</Link>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginBottom: 20 }}>
        <input placeholder="Search…" value={search} onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, flex: 1, minWidth: 180 }} />
        <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ padding: 8 }}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} style={{ padding: 8 }}>
          <option value="">All priorities</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} style={{ padding: 8 }}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: 8 }}>
          <option value="deadline">Sort by deadline</option>
          <option value="createdAt">Sort by newest</option>
        </select>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : visibleTasks.length === 0 ? (
        <p style={{ color: 'var(--color-muted)' }}>No tasks match your filters.</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {visibleTasks.map((task) => (
            <div key={task._id} className="card"
              style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                borderLeft: isOverdue(task) ? '4px solid var(--color-danger)' : '4px solid transparent',
              }}>
              <div>
                <strong>{task.title}</strong>
                {isOverdue(task) && (
                  <span style={{ marginLeft: 8, fontSize: 11, background: 'var(--color-danger)', color: 'white', padding: '2px 8px', borderRadius: 10 }}>
                    OVERDUE
                  </span>
                )}
                <div style={{ fontSize: 13, color: 'var(--color-muted)', marginTop: 4 }}>
                  {task.category} • {task.priority} • {task.status} • Due {new Date(task.deadline).toLocaleString()}
                </div>
              </div>
              <div style={{ display: 'flex', gap: 8 }}>
                {task.status !== 'Completed' && (
                  <button onClick={() => handleMarkComplete(task._id)}
                    style={{ padding: '6px 10px', border: '1px solid var(--color-border)', borderRadius: 6, background: 'white' }}>
                    Mark done
                  </button>
                )}
                <button onClick={() => navigate(`/tasks/${task._id}/edit`)}
                  style={{ padding: '6px 10px', border: '1px solid var(--color-border)', borderRadius: 6, background: 'white' }}>
                  Edit
                </button>
                <button onClick={() => handleDelete(task._id)}
                  style={{ padding: '6px 10px', border: 'none', borderRadius: 6, background: 'var(--color-danger)', color: 'white' }}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}