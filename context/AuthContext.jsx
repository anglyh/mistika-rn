import React, { createContext, useContext, useEffect, useState } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({ userId: null, name: null, email: null, isAuthenticated: false });
  //const [user, setUser] = useState({ isAuthenticated: false });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    setLoading(true);
    try {
      const isValidToken = await authService.verifyToken();
      if (isValidToken === "Token válido") {
        const token = await authService.getToken();
        const { userId, name, email } = authService.decodeToken(token);
        setUser({ userId, name, email, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Auth check error:', error);
      await authService.logout();
      setUser({ userId: null, name: null, email: null, isAuthenticated: false });
    }
    setLoading(false);
  };

  const login = async (userEmail, userPassword) => {
    try {
      await authService.login(userEmail, userPassword);
      const token = await authService.getToken();
      const { userId, name, email } = authService.decodeToken(token);
      setUser({ userId: userId, name: name, email: email, isAuthenticated: true });
    } catch (error) {
      //console.error("Error en el inicio de sesion de AuthContext: ", error.message);
      throw new Error(error.message);
    }
  };

  const register = async (userName, userEmail, userPassword) => {
    try {
      await authService.register(userName, userEmail, userPassword);
      const token = await authService.getToken();
      const { userId, name, email } = authService.decodeToken(token);
      setUser({ userId: userId, name: name, email: email, isAuthenticated: true });
    } catch (error) {
      //console.error("Error en el registro de AuthContext: ", error.message);
      throw new Error(error.message);
    }
  }

  const logout = async () => {
    await authService.logout();
    setUser({ userId: null, name: null, email: null, isAuthenticated: false });
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};