'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
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

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { navigateTo } = usePage();

  // No auto-login from localStorage — credentials must be entered every time
  // Clear any old stored session on mount
  React.useEffect(() => {
    try {
      localStorage.removeItem('df_admin_auth');
    } catch {
      // ignore
    }
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
      // Session is only in memory — closing the tab/browser logs you out
      return true;
    }
    setError('Invalid username or password');
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setError(null);
    navigateTo('home');
  }, [navigateTo]);

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
