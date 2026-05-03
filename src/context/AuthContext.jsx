import React, { createContext, useContext, useState, useEffect } from 'react';
import * as adminAuthService from '../api/services/adminAuthService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const isAuth = adminAuthService.checkAuth();
      if (isAuth) {
        // We don't have a "get user info" endpoint, but we know they are authenticated
        setAdmin({ username: 'Admin' }); 
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (username, password) => {
    const data = await adminAuthService.login(username, password);
    setAdmin({ username });
    return data;
  };

  const logout = async () => {
    await adminAuthService.logout();
    setAdmin(null);
  };

  return (
    <AuthContext.Provider value={{ admin, loading, login, logout, isAuthenticated: !!admin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
