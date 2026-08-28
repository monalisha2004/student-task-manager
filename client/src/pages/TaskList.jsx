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
    <div className="page-container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
        <h2 style={{ margin: 0 }}>My Tasks</h2>
        <Link to="/tasks/new" className="btn btn-primary">+ Add task</Link>
      </div>

      <div className="toolbar">
        <input className="form-input search-input" placeholder="Search tasks…" value={search} onChange={(e) => setSearch(e.target.value)} />
        <select className="form-select" value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All categories</option>
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select className="form-select" value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="">All priorities</option>
          {PRIORITIES.map((p) => <option key={p} value={p}>{p}</option>)}
        </select>
        <select className="form-select" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
        </select>
        <select className="form-select" value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="deadline">Sort by deadline</option>
          <option value="createdAt">Sort by newest</option>
        </select>
      </div>

      {loading ? (
        <p>Loading…</p>
      ) : visibleTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks match your filters.</p>
        </div>
      ) : (
        <div>
          {visibleTasks.map((task) => (
            <div key={task._id} className={`card task-card${isOverdue(task) ? ' overdue' : ''}`}>
              <div>
                <span className="task-title">{task.title}</span>
                {isOverdue(task) && <span className="badge badge-overdue">Overdue</span>}
                <div className="task-meta">
                  {task.category} • {task.priority} • {task.status} • Due {new Date(task.deadline).toLocaleString()}
                </div>
              </div>
              <div className="task-actions">
                {task.status !== 'Completed' && (
                  <button className="btn btn-secondary btn-sm" onClick={() => handleMarkComplete(task._id)}>Mark done</button>
                )}
                <button className="btn btn-secondary btn-sm" onClick={() => navigate(`/tasks/${task._id}/edit`)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}