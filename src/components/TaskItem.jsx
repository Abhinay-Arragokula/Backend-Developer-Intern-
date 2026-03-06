import { useState } from 'react';
import { Pencil, Trash2, X, Check } from 'lucide-react';

const TaskItem = ({ task, onUpdate, onDelete, isAdmin }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    title: task.title,
    description: task.description,
    status: task.status
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'var(--success)';
      case 'in-progress': return 'var(--warning)';
      default: return 'var(--text-muted)';
    }
  };

  const handleUpdate = () => {
    onUpdate(task._id, editForm);
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <div className="glass-panel animate-fade-in" style={styles.card}>
        <div style={styles.editMode}>
          <input 
            className="form-control" 
            value={editForm.title}
            onChange={(e) => setEditForm({...editForm, title: e.target.value})}
            placeholder="Task Title"
          />
          <textarea 
            className="form-control" 
            value={editForm.description}
            onChange={(e) => setEditForm({...editForm, description: e.target.value})}
            placeholder="Task Description"
            rows="3"
            style={{ resize: 'none' }}
          />
          <select 
            className="form-control"
            value={editForm.status}
            onChange={(e) => setEditForm({...editForm, status: e.target.value})}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
          <div style={styles.actions}>
            <button onClick={handleUpdate} className="btn btn-primary" style={{ flex: 1 }}>
              <Check size={16} /> Save
            </button>
            <button onClick={() => setIsEditing(false)} className="btn btn-secondary">
              <X size={16} /> Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-panel animate-fade-in" style={styles.card}>
      <div style={styles.header}>
        <h3 style={styles.title}>{task.title}</h3>
        <span style={{
          ...styles.badge,
          borderColor: getStatusColor(task.status),
          color: getStatusColor(task.status)
        }}>
          {task.status}
        </span>
      </div>
      <p style={styles.description}>{task.description}</p>
      
      <div style={styles.footer}>
        <div style={styles.meta}>
          <small>Created: {new Date(task.createdAt).toLocaleDateString()}</small>
          {isAdmin && task.createdBy && (
            <small style={{ display: 'block', marginTop: '0.25rem', color: 'var(--accent-secondary)' }}>
              By: {task.createdBy.email || task.createdBy}
            </small>
          )}
        </div>
        <div style={styles.actions}>
          <button onClick={() => setIsEditing(true)} className="btn btn-secondary" style={styles.iconBtn}>
            <Pencil size={16} />
          </button>
          <button onClick={() => onDelete(task._id)} className="btn btn-danger" style={styles.iconBtn}>
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    padding: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
    height: '100%',
    transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: '1rem',
  },
  title: {
    fontSize: '1.25rem',
    margin: 0,
    lineHeight: 1.3,
  },
  badge: {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    padding: '0.25rem 0.75rem',
    borderRadius: 'var(--radius-full)',
    border: '1px solid',
    fontWeight: '600',
    letterSpacing: '0.05em',
  },
  description: {
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
    flex: 1,
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 'auto',
    paddingTop: '1rem',
    borderTop: '1px solid var(--border-color)',
  },
  meta: {
    color: 'var(--text-muted)',
  },
  actions: {
    display: 'flex',
    gap: '0.5rem',
  },
  iconBtn: {
    padding: '0.5rem',
  },
  editMode: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  }
};

export default TaskItem;
