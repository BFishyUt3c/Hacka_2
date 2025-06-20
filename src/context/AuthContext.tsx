import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

import { login as loginUser, register as registerUser } from '../api/auth';
import { setToken, removeToken, getToken } from '../utils/token';

interface User {
  email: string;
  token: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>(null!);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setUser({ email: '', token });
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await loginUser(email, password);
      const { token } = response.data;
      setToken(token);
      setUser({ email: response.data.email, token });
    } catch (err) {
      removeToken();
      throw err;
    }
  };

  const register = async (email: string, password: string) => {
    await registerUser(email, password);
    await login(email, password); 
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
