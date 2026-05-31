'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { usePage } from '@/context/PageContext';

// Admin credentials (client-side only — for a static export site)
// In production, replace with a real backend auth system
const ADMIN_CREDENTIALS = {
  username: 'duamenefa',
  password: 'FaFaAfm2026!',
};

interface AdminUser {
  username: string;
  email: string;
  role: string;
  loginTime: number;
}

interface AdminAuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  login: (username: string, password: string) => boolean;
  logout: () => void;
  error: string | null;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

const AUTH_KEY = 'df_admin_auth';
const SESSION_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { navigateTo } = usePage();

  // Check for existing session on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as AdminUser;
        // Check if session is still valid
        if (Date.now() - parsed.loginTime < SESSION_DURATION) {
          setUser(parsed);
        } else {
          localStorage.removeItem(AUTH_KEY);
        }
      }
    } catch {
      localStorage.removeItem(AUTH_KEY);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((username: string, password: string): boolean => {
    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
      const adminUser: AdminUser = {
        username: 'duamenefa',
        email: 'admin@duamenefa.org',
        role: 'Super Admin',
        loginTime: Date.now(),
      };
      setUser(adminUser);
      setError(null);
      localStorage.setItem(AUTH_KEY, JSON.stringify(adminUser));
      return true;
    }
    setError('Invalid username or password');
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    localStorage.removeItem(AUTH_KEY);
    navigateTo('home');
  }, [navigateTo]);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F5F5F5]">
        <div className="w-10 h-10 border-4 border-[#C62828] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <AdminAuthContext.Provider value={{ isAuthenticated: !!user, user, login, logout, error }}>
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
