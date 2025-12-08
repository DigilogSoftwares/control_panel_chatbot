import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../utils/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (!accessToken) return;

    const refreshInterval = setInterval(() => {
      refreshAccessToken();
    }, 4 * 60 * 1000);

    return () => clearInterval(refreshInterval);
  }, [accessToken]);

  const checkAuth = async () => {
    try {
      const token = await refreshAccessToken();
      if (token) {
        await fetchUserProfile(token);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    const data = await apiClient.post('/auth/login', { email, password });
    setAccessToken(data.access_token);
    setUser(data.user);
    return data;
  };

  const register = async (email, password, name) => {
    return await apiClient.post('/auth/register', { email, password, name });
  };

  const refreshAccessToken = async () => {
    try {
      const data = await apiClient.post('/auth/refresh', {});
      setAccessToken(data.access_token);
      return data.access_token;
    } catch (error) {
      setAccessToken(null);
      setUser(null);
      return null;
    }
  };

  const fetchUserProfile = async (token) => {
    try {
      const userData = await apiClient.get('/auth/me', token || accessToken);
      setUser(userData);
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const logout = async () => {
    try {
      await apiClient.post('/auth/logout', {});
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setAccessToken(null);
      setUser(null);
    }
  };

  const authenticatedFetch = async (url, options = {}) => {
    let token = accessToken;

    if (!token) {
      token = await refreshAccessToken();
      if (!token) throw new Error('Not authenticated');
    }

    const response = await apiClient.authenticatedRequest(url, token, options);

    if (response.status === 401) {
      token = await refreshAccessToken();
      if (!token) throw new Error('Authentication expired');
      return apiClient.authenticatedRequest(url, token, options);
    }

    return response;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        loading,
        login,
        register,
        logout,
        refreshAccessToken,
        authenticatedFetch,
        isAuthenticated: !!accessToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};