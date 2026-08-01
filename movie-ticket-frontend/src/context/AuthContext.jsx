import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthService } from '../services/AuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('cinepass_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('cinepass_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await AuthService.login(email, password);
    setUser(data);
    localStorage.setItem('cinepass_user', JSON.stringify(data));
    return data;
  };

  const register = async (userData) => {
    const data = await AuthService.register(userData);
    return data;
  };

  const logout = async () => {
    await AuthService.logout();
    setUser(null);
    localStorage.removeItem('cinepass_user');
  };

  const isAdmin = user && (user.role === 'ROLE_ADMIN' || user.role === 'ADMIN');

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isAdmin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
