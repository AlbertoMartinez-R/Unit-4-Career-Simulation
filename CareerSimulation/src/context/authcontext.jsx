import React, { createContext, useState, useContext, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Simulate a login function (replace with actual login logic)
  const login = (username, password) => {
    // Replace with actual authentication logic
    if (username === 'EdwinV' && password === 'password123') {
      setUser({ username: 'AlbertoM', role: 'admin' });
    } else if (username === 'user' && password === 'password123') {
      setUser({ username: 'user', role: 'user' });
    }
  };

  const logout = () => {
    setUser(null);
  };

  useEffect(() => {

    const storedUser = JSON.parse(localStorage.getItem('user'));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    } else {
      localStorage.removeItem('user');
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
