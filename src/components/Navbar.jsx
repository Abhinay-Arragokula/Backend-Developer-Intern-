import { Link, useNavigate } from 'react-router-dom';
import { LogOut, CheckSquare } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.navbar}>
      <div className="main-content" style={styles.container}>
        <Link to="/" style={styles.logo}>
          <CheckSquare size={24} style={{ color: 'var(--accent-primary)' }} />
          <span>TaskMaster</span>
        </Link>
        
        <div style={styles.menu}>
          {user ? (
            <>
              <span style={styles.userBadge}>
                {user.role === 'admin' ? '🛡️ Admin' : '👤 User'}: {user.name}
              </span>
              <button 
                onClick={handleLogout} 
                className="btn btn-secondary"
                style={styles.logoutBtn}
              >
                <LogOut size={18} /> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-secondary" style={styles.navLink}>Login</Link>
              <Link to="/register" className="btn btn-primary" style={styles.navLink}>Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: 'var(--bg-secondary)',
    borderBottom: '1px solid var(--border-color)',
    position: 'sticky',
    top: 0,
    zIndex: 100,
  },
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    fontSize: '1.25rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    fontFamily: 'var(--font-heading)',
  },
  menu: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
  },
  userBadge: {
    fontSize: '0.875rem',
    color: 'var(--text-secondary)',
    backgroundColor: 'var(--bg-tertiary)',
    padding: '0.5rem 1rem',
    borderRadius: 'var(--radius-full)',
    border: '1px solid var(--border-color)',
  },
  navLink: {
    padding: '0.5rem 1.25rem',
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
  }
};

export default Navbar;
