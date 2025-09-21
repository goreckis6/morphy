import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, username: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for existing session in localStorage
    const savedUser = localStorage.getItem('morphy_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setUser(user);
      setSession({ user, access_token: 'local' });
    }
    setLoading(false);
  }, []);

  const signUp = async (email: string, password: string, username: string) => {
    // Simple local validation
    if (!email || !password || !username) {
      return { error: { message: 'All fields are required' } };
    }

    // Create user object
    const user: User = {
      id: Date.now().toString(),
      email,
      username,
    };

    // Save to localStorage
    localStorage.setItem('morphy_user', JSON.stringify(user));
    setUser(user);
    setSession({ user, access_token: 'local' });

    return { error: null };
  };

  const signIn = async (email: string, password: string) => {
    // Simple local validation
    if (!email || !password) {
      return { error: { message: 'Email and password are required' } };
    }

    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('morphy_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      if (user.email === email) {
        setUser(user);
        setSession({ user, access_token: 'local' });
        return { error: null };
      }
    }

    return { error: { message: 'Invalid credentials' } };
  };

  const signOut = async () => {
    localStorage.removeItem('morphy_user');
    setUser(null);
    setSession(null);
  };

  const resetPassword = async (email: string) => {
    // Mock password reset - just return success
    return { error: null };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};