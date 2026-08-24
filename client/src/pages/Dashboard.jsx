export default function Dashboard() {
  // Static placeholder numbers — Day 7 we'll replace these with real API data
  const stats = { total: 8, completed: 3, pending: 5, overdue: 1 };

  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
      <h2>Dashboard</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        <div className="card">
          <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>Total tasks</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.total}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>Completed</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-success)' }}>{stats.completed}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>Pending</div>
          <div style={{ fontSize: 28, fontWeight: 700 }}>{stats.pending}</div>
        </div>
        <div className="card">
          <div style={{ color: 'var(--color-muted)', fontSize: 13 }}>Overdue</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: 'var(--color-danger)' }}>{stats.overdue}</div>
        </div>
      </div>
    </div>
  );
}