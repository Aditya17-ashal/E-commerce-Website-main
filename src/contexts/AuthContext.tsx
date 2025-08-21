import React, { createContext, useContext, useEffect, useState } from 'react';
import { api } from '../lib/api';

// ✅ Shared User interface
interface User {
  id: string;
  email: string;
  role: 'user' | 'admin';
  firstName: string;
  lastName: string;
}

// ✅ AuthContext type
interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // ✅ check for token on mount
  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (!savedToken) {
      setLoading(false);
      return;
    }
    (async () => {
      try {
        const me = await api.get<User>('/api/auth/me');
        setUser(me);
      } catch {
        localStorage.removeItem('token');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ✅ login returns User
  const login = async (email: string, password: string): Promise<User> => {
    const { token } = await api.post<{ token: string }>('/api/auth/login', { email, password });
    localStorage.setItem('token', token);

    const me = await api.get<User>('/api/auth/me');
    setUser(me);

    return me;
  };

  // ✅ register also returns User after auto-login
  const register = async (
    email: string,
    password: string,
    firstName: string,
    lastName: string
  ): Promise<User> => {
    await api.post('/api/auth/register', { email, password, firstName, lastName });
    return await login(email, password);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
