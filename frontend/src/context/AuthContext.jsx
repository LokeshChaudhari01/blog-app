import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Configure axios to send credentials (cookies)
  axios.defaults.withCredentials = true;
  // Set base URL for API
  axios.defaults.baseURL = 'http://localhost:5001/api';

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      try {
        const res = await axios.get('/auth/me');
        setUser(res.data);
      } catch (err) {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkUserLoggedIn();
  }, []);

  const login = async (email, password) => {
    const res = await axios.post('/auth/login', { email, password });
    setUser(res.data);
  };

  const signup = async (email, password) => {
    const res = await axios.post('/auth/signup', { email, password });
    setUser(res.data);
  };

  const logout = async () => {
    await axios.post('/auth/logout');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
