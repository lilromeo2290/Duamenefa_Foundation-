'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

export type PageName =
  | 'home'
  | 'about'
  | 'whowear'
  | 'executives'
  | 'associates'
  | 'forms'
  | 'volunteerform'
  | 'costheta'
  | 'newsletters'
  | 'reporters'
  | 'activities'
  | 'tournaments'
  | 'tournament2015'
  | 'tournament2017'
  | 'tournament2018'
  | 'tournament2019'
  | 'tournament2023'
  | 'tournament2024'
  | 'trokosi'
  | 'vocationalschool'
  | 'contact'
  | 'programs'
  | 'media'
  | 'stories'
  | 'donate'
  | 'volunteer'
  | 'news'
  | 'admin';

interface PageContextType {
  currentPage: PageName;
  navigateTo: (page: PageName) => void;
}

const PageContext = createContext<PageContextType | undefined>(undefined);

// Map hash values to page names
const hashToPage: Record<string, PageName> = {
  '': 'home',
  'home': 'home',
  'about': 'about',
  'who-we-are': 'whowear',
  'executives': 'executives',
  'associates': 'associates',
  'forms': 'forms',
  'volunteer-form': 'volunteerform',
  'costheta': 'costheta',
  'newsletters': 'newsletters',
  'reporters': 'reporters',
  'activities': 'activities',
  'tournaments': 'tournaments',
  'tournament-2015': 'tournament2015',
  'tournament-2017': 'tournament2017',
  'tournament-2018': 'tournament2018',
  'tournament-2019': 'tournament2019',
  'tournament-2023': 'tournament2023',
  'tournament-2024': 'tournament2024',
  'trokosi': 'trokosi',
  'vocational-school': 'vocationalschool',
  'contact': 'contact',
  'programs': 'programs',
  'media': 'media',
  'stories': 'stories',
  'donate': 'donate',
  'volunteer': 'volunteer',
  'news': 'news',
  'admin': 'admin',
};

// Map page names to hash values
const pageToHash: Record<string, string> = {};
Object.entries(hashToPage).forEach(([hash, page]) => {
  if (!pageToHash[page] || hash.length > pageToHash[page].length) {
    pageToHash[page] = hash;
  }
});

function getPageFromHash(): PageName {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace('#', '');
  return hashToPage[hash] || 'home';
}

export function PageProvider({ children }: { children: React.ReactNode }) {
  const [currentPage, setCurrentPage] = useState<PageName>('home');

  // Read initial hash on mount
  useEffect(() => {
    const page = getPageFromHash();
    if (page !== 'home') {
      setCurrentPage(page);
    }
  }, []);

  // Listen for hash changes (browser back/forward)
  useEffect(() => {
    const handleHashChange = () => {
      const page = getPageFromHash();
      setCurrentPage(page);
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback((page: PageName) => {
    setCurrentPage(page);
    const hash = pageToHash[page] || '';
    window.location.hash = hash;
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
