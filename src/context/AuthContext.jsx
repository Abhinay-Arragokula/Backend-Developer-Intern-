import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Set default auth header for axios
  const setAuthHeader = (token) => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);
      setAuthHeader(parsedUser.token);
    }
    setLoading(false);
  }, []);

  const register = async (userData) => {
    try {
      const { data } = await axios.post('/api/v1/auth/register', userData);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setAuthHeader(data.token);
      toast.success('Registration successful!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to register');
      return false;
    }
  };

  const login = async (userData) => {
    try {
      const { data } = await axios.post('/api/v1/auth/login', userData);
      setUser(data);
      localStorage.setItem('user', JSON.stringify(data));
      setAuthHeader(data.token);
      toast.success('Logged in successfully!');
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || 'Invalid credentials');
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    setAuthHeader(null);
    toast.success('Logged out');
  };

  return (
    <AuthContext.Provider value={{ user, loading, register, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
