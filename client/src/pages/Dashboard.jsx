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

  if (loading) return <p style={{ textAlign: 'center', marginTop: 60 }}>Loading…</p>;

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <h2>Dashboard</h2>
      {error && <p style={{ color: 'var(--color-danger)' }}>{error}</p>}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
        <div className="card">
          <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>Total tasks</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{total}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>Completed</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-success)' }}>{completed}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>Pending</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{pending}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>Overdue</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-danger)' }}>{overdue}</div>
        </div>
      </div>

      <h3>Your tasks</h3>
      {tasks.length === 0 ? (
        <p style={{ color: 'var(--color-muted)' }}>No tasks yet. (We'll add a form to create tasks on Day 8.)</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {tasks.map((task) => (
            <div key={task._id} className="card" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div>
                <strong>{task.title}</strong>
                <div style={{ fontSize: 13, color: 'var(--color-muted)' }}>
                  {task.category} • {task.priority} • Due {new Date(task.deadline).toLocaleDateString()}
                </div>
              </div>
              <span>{task.status}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}