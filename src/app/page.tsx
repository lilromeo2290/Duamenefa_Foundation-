'use client';

import React from 'react';
import { PageProvider, usePage } from '@/context/PageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import ProgramsPage from '@/components/pages/ProgramsPage';
import MediaPage from '@/components/pages/MediaPage';
import StoriesPage from '@/components/pages/StoriesPage';
import DonatePage from '@/components/pages/DonatePage';
import VolunteerPage from '@/components/pages/VolunteerPage';
import NewsPage from '@/components/pages/NewsPage';
import ContactPage from '@/components/pages/ContactPage';
import { AnimatePresence, motion } from 'framer-motion';

function PageContent() {
  const { currentPage } = usePage();

  const pages: Record<string, React.ReactNode> = {
    home: <HomePage />,
    about: <AboutPage />,
    programs: <ProgramsPage />,
    media: <MediaPage />,
    stories: <StoriesPage />,
    donate: <DonatePage />,
    volunteer: <VolunteerPage />,
    news: <NewsPage />,
    contact: <ContactPage />,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {pages[currentPage]}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

export default function Home() {
  return (
    <PageProvider>
      <PageContent />
    </PageProvider>
  );
}
