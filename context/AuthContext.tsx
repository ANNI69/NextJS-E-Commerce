'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  authToken: string | null;
  loginStatus: 'idle' | 'loading' | 'success' | 'error';
  authError: string | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [loginStatus, setLoginStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [authError, setAuthError] = useState<string | null>(null);

  const isAuthenticated = !!user && !!authToken;

  const signIn = useCallback(async (email: string, password: string) => {
    setLoginStatus('loading');
    setAuthError(null);
    
    try {
      // Replace with actual API call
      const response = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      
      if (!response.ok) {
        throw new Error('Invalid credentials');
      }
      
      const data = await response.json();
      setUser(data.user);
      setAuthToken(data.token);
      setLoginStatus('success');
      
      // Store token in localStorage
      localStorage.setItem('authToken', data.token);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Login failed');
      setLoginStatus('error');
    }
  }, []);

  const signUp = useCallback(async (email: string, password: string, name: string) => {
    setLoginStatus('loading');
    setAuthError(null);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, name }),
      });
      
      if (!response.ok) {
        throw new Error('Registration failed');
      }
      
      const data = await response.json();
      setUser(data.user);
      setAuthToken(data.token);
      setLoginStatus('success');
      
      localStorage.setItem('authToken', data.token);
    } catch (error) {
      setAuthError(error instanceof Error ? error.message : 'Registration failed');
      setLoginStatus('error');
    }
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    setAuthToken(null);
    setLoginStatus('idle');
    setAuthError(null);
    localStorage.removeItem('authToken');
  }, []);

  const updateUser = useCallback((userData: Partial<User>) => {
    setUser(prev => prev ? { ...prev, ...userData } : null);
  }, []);

  const value: AuthContextType = {
    user,
    isAuthenticated,
    authToken,
    loginStatus,
    authError,
    signIn,
    signUp,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
