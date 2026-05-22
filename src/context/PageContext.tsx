'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type PageName =
  | 'home'
  | 'about'
  | 'whowear'
  | 'forms'
  | 'newsletters'
  | 'reporters'
  | 'activities'
  | 'contact'
  | 'programs'
  | 'media'
  | 'stories'
  | 'donate'
  | 'volunteer'
  | 'news';

interface PageContextType {
  currentPage: PageName;
  navigateTo: (page: PageName) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageName>('home');

  const navigateTo = useCallback((page: PageName) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, []);

  return (
    <PageContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  const context = useContext(PageContext);
  if (context === undefined) {
    throw new Error('usePage must be used within a PageProvider');
  }
  return context;
}
