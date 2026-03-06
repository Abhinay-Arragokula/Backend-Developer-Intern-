import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { LogIn } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login({ email, password });
    setLoading(false);
  };

  return (
    <div className="animate-fade-in" style={styles.wrapper}>
      <div className="glass-panel" style={styles.card}>
        <div style={styles.header}>
          <h2>Welcome Back</h2>
          <p>Login to manage your tasks effectively.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-control" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>
          
          <div className="form-group" style={{ marginBottom: '2rem' }}>
            <label className="form-label">Password</label>
            <input 
              type="password" 
              className="form-control" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block" 
            disabled={loading}
          >
            {loading ? <div className="spinner" /> : <><LogIn size={20} /> Sign In</>}
          </button>
        </form>

        <p style={styles.footer}>
          Don't have an account? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 160px)',
  },
  card: {
    width: '100%',
    maxWidth: '440px',
    padding: '2.5rem',
  },
  header: {
    textAlign: 'center',
    marginBottom: '2rem',
  },
  footer: {
    textAlign: 'center',
    marginTop: '2rem',
    color: 'var(--text-secondary)',
    fontSize: '0.95rem',
  }
};

export default Login;
