'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type AdminSubPage =
  | 'dashboard'
  | 'users'
  | 'content'
  | 'media'
  | 'events'
  | 'donations'
  | 'reports'
  | 'settings'
  | 'profile'
  | 'notifications'
  | 'placements'
  | 'accommodation'
  | 'airport-pickup'
  | 'volunteers'
  | 'cms-site'
  | 'cms-hero'
  | 'cms-stats'
  | 'cms-about'
  | 'cms-causes'
  | 'cms-testimonials'
  | 'cms-team'
  | 'cms-events'
  | 'cms-news'
  | 'cms-programs'
  | 'cms-donations'
  | 'cms-gallery'
  | 'cms-pages';

interface AdminContextType {
  currentAdminPage: AdminSubPage;
  navigateAdmin: (page: AdminSubPage) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminContextProvider({ children }: { children: React.ReactNode }) {
  const [currentAdminPage, setCurrentAdminPage] = useState<AdminSubPage>('dashboard');

  const navigateAdmin = useCallback((page: AdminSubPage) => {
    setCurrentAdminPage(page);
  }, []);

  return (
    <AdminContext.Provider value={{ currentAdminPage, navigateAdmin }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminContextProvider');
  }
  return context;
}
