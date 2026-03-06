import { useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import TaskItem from '../components/TaskItem';
import { Plus } from 'lucide-react';

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ title: '', description: '' });

  const fetchTasks = async () => {
    try {
      const { data } = await axios.get('/api/v1/tasks');
      setTasks(data);
    } catch (error) {
      toast.error('Failed to fetch tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/v1/tasks', newTask);
      setTasks([data, ...tasks]);
      setNewTask({ title: '', description: '' });
      setShowAddForm(false);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create task');
    }
  };

  const handleUpdateTask = async (id, updatedData) => {
    try {
      const { data } = await axios.put(`/api/v1/tasks/${id}`, updatedData);
      setTasks(tasks.map((t) => (t._id === id ? data : t)));
      toast.success('Task updated');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update task');
    }
  };

  const handleDeleteTask = async (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      try {
        await axios.delete(`/api/v1/tasks/${id}`);
        setTasks(tasks.filter((t) => t._id !== id));
        toast.success('Task deleted');
      } catch (error) {
        toast.error(error.response?.data?.message || 'Failed to delete task');
      }
    }
  };

  if (loading) {
    return (
      <div style={styles.centerBox}>
        <div className="spinner" style={{ borderColor: 'var(--accent-primary)', borderTopColor: 'transparent', width: '40px', height: '40px' }} />
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <div style={styles.header}>
        <div>
          <h1 style={styles.title}>
            {user?.role === 'admin' ? 'All Tasks Overview (Admin)' : 'Your Tasks'}
          </h1>
          <p style={styles.subtitle}>
            {user?.role === 'admin' 
              ? 'Manage all tasks across the system.' 
              : 'Keep track of what you need to do.'}
          </p>
        </div>
        
        <button 
          onClick={() => setShowAddForm(!showAddForm)} 
          className="btn btn-primary"
        >
          <Plus size={20} /> New Task
        </button>
      </div>

      {showAddForm && (
        <div className="glass-panel animate-fade-in" style={styles.addFormCard}>
          <h3>Create New Task</h3>
          <form onSubmit={handleCreateTask} style={styles.formContainer}>
            <div className="form-group" style={{ flex: 1 }}>
              <input 
                className="form-control"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
                required
              />
            </div>
            <div className="form-group" style={{ flex: 2 }}>
              <input 
                className="form-control"
                placeholder="Brief description..."
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Add</button>
          </form>
        </div>
      )}

      {tasks.length === 0 ? (
        <div style={styles.emptyState} className="glass-panel">
          <h3>No Tasks Found</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            {user?.role === 'admin' 
              ? 'There are currently no tasks in the system.' 
              : "You haven't created any tasks yet. Get started by clicking New Task!"}
          </p>
        </div>
      ) : (
        <div style={styles.grid}>
          {tasks.map((task) => (
            <TaskItem 
              key={task._id} 
              task={task} 
              onUpdate={handleUpdateTask}
              onDelete={handleDeleteTask}
              isAdmin={user?.role === 'admin'}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  centerBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '2rem',
    flexWrap: 'wrap',
    gap: '1rem',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '0.5rem',
  },
  subtitle: {
    color: 'var(--text-secondary)',
    fontSize: '1.1rem',
  },
  addFormCard: {
    padding: '1.5rem',
    marginBottom: '2rem',
  },
  formContainer: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '1.5rem',
  },
  emptyState: {
    padding: '4rem 2rem',
    textAlign: 'center',
    border: '1px dashed var(--border-color)',
    background: 'transparent',
  }
};

export default Dashboard;
