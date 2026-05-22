'use client';

import React from 'react';
import { PageProvider, usePage } from '@/context/PageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ErrorBoundary from '@/components/ErrorBoundary';
import HomePage from '@/components/pages/HomePage';
import AboutPage from '@/components/pages/AboutPage';
import WhoWeArePage from '@/components/pages/WhoWeArePage';
import FormsPage from '@/components/pages/FormsPage';
import NewslettersPage from '@/components/pages/NewslettersPage';
import ReportersPage from '@/components/pages/ReportersPage';
import ActivitiesPage from '@/components/pages/ActivitiesPage';
import ContactPage from '@/components/pages/ContactPage';
import ProgramsPage from '@/components/pages/ProgramsPage';
import MediaPage from '@/components/pages/MediaPage';
import StoriesPage from '@/components/pages/StoriesPage';
import DonatePage from '@/components/pages/DonatePage';
import VolunteerPage from '@/components/pages/VolunteerPage';
import NewsPage from '@/components/pages/NewsPage';
import { AnimatePresence, motion } from 'framer-motion';

function PageContent() {
  const { currentPage } = usePage();

  const pages: Record<string, React.ReactNode> = {
    home: <HomePage />,
    about: <AboutPage />,
    whowear: <WhoWeArePage />,
    forms: <FormsPage />,
    newsletters: <NewslettersPage />,
    reporters: <ReportersPage />,
    activities: <ActivitiesPage />,
    contact: <ContactPage />,
    programs: <ProgramsPage />,
    media: <MediaPage />,
    stories: <StoriesPage />,
    donate: <DonatePage />,
    volunteer: <VolunteerPage />,
    news: <NewsPage />,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <ErrorBoundary>
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
        </ErrorBoundary>
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
