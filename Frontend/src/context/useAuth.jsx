import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { authenticated_user, login, logout, register } from '../api/endpoints';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const nav = useNavigate();

  const get_authenticated_user = async () => {
    try {
      const user = await authenticated_user();
      setUser(user);
    } catch (error) {
      setUser(null); // If the request fails, set the user to null
    } finally {
      setLoading(false); // Set loading to false after request completes
    }
  };

  const loginUser = async (username, password) => {
    const user = await login(username, password);
    if (user) {
      setUser(user);
      nav('/');
    } else {
      alert('Incorrect username or password');
    }
  };

  const logoutUser = async () => {
    await logout();
    setUser(null);
    nav('/login');
  };

  const registerUser = async (username, email, password, confirm_password) => {
    try {
      if (password === confirm_password) {
        await register(username, email, password);
        alert('User successfully registered');
        nav('/login');
      } else {
        alert('Passwords do not match');
      }
    } catch {
      alert('Error registering user');
    }
  };

  useEffect(() => {
    get_authenticated_user();
  }, []);

  if (loading) return <div>Loading...</div>; // Optional loading screen

  return (
    <AuthContext.Provider value={{ user, loading, loginUser, logoutUser, registerUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
