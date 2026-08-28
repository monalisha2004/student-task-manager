import { useEffect, useState } from 'react';
import api from '../api/axios';

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/tasks')
      .then((res) => setTasks(res.data.data.tasks))
      .catch((err) => setError(err.response?.data?.message || 'Could not load tasks.'))
      .finally(() => setLoading(false));
  }, []);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;
  const pending = tasks.filter((t) => t.status !== 'Completed').length;
  const overdue = tasks.filter((t) => t.status !== 'Completed' && new Date(t.deadline) < new Date()).length;

  const isOverdue = (task) => task.status !== 'Completed' && new Date(task.deadline) < new Date();

  if (loading) return <p style={{ textAlign: 'center', marginTop: 60 }}>Loading…</p>;

  return (
    <div className="page-container">
      <h2 style={{ marginBottom: 24 }}>Dashboard</h2>
      {error && <div className="alert alert-error">{error}</div>}

      <div className="stats-grid">
        <div className="card stat-card">
          <div className="stat-label">Total tasks</div>
          <div className="stat-value">{total}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Completed</div>
          <div className="stat-value stat-success">{completed}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Pending</div>
          <div className="stat-value stat-warning">{pending}</div>
        </div>
        <div className="card stat-card">
          <div className="stat-label">Overdue</div>
          <div className="stat-value stat-danger">{overdue}</div>
        </div>
      </div>

      <h3 style={{ marginBottom: 14 }}>Your tasks</h3>
      {tasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet — head to the Tasks page to add your first one.</p>
        </div>
      ) : (
        <div>
          {tasks.map((task) => (
            <div key={task._id} className={`card task-card${isOverdue(task) ? ' overdue' : ''}`}>
              <div>
                <span className="task-title">{task.title}</span>
                {isOverdue(task) && <span className="badge badge-overdue">Overdue</span>}
                <div className="task-meta">
                  {task.category} • {task.priority} • Due {new Date(task.deadline).toLocaleDateString()}
                </div>
              </div>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--color-muted)' }}>{task.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}