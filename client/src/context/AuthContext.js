import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [todos, setTodos] = useState([]);

  const login = (username, token) => {
    setUser({ username, token });
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, login, logout, todos, addTodo,setTodos }}
    >
      {children}
    </AuthContext.Provider>
  );
};
