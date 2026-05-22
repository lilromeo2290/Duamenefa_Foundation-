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
import ExecutivesPage from '@/components/pages/ExecutivesPage';
import AssociatesPage from '@/components/pages/AssociatesPage';
import FormsPage from '@/components/pages/FormsPage';
import VolunteerFormPage from '@/components/pages/VolunteerFormPage';
import CosthetaPage from '@/components/pages/CosthetaPage';
import NewslettersPage from '@/components/pages/NewslettersPage';
import ReportersPage from '@/components/pages/ReportersPage';
import ActivitiesPage from '@/components/pages/ActivitiesPage';
import RegionalTournamentsPage from '@/components/pages/RegionalTournamentsPage';
import Tournament2015Page from '@/components/pages/Tournament2015Page';
import Tournament2017Page from '@/components/pages/Tournament2017Page';
import Tournament2018Page from '@/components/pages/Tournament2018Page';
import Tournament2019Page from '@/components/pages/Tournament2019Page';
import Tournament2023Page from '@/components/pages/Tournament2023Page';
import Tournament2024Page from '@/components/pages/Tournament2024Page';
import TrokosiPage from '@/components/pages/TrokosiPage';
import VocationalSchoolPage from '@/components/pages/VocationalSchoolPage';
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
    executives: <ExecutivesPage />,
    associates: <AssociatesPage />,
    forms: <FormsPage />,
    volunteerform: <VolunteerFormPage />,
    costheta: <CosthetaPage />,
    newsletters: <NewslettersPage />,
    reporters: <ReportersPage />,
    activities: <ActivitiesPage />,
    tournaments: <RegionalTournamentsPage />,
    tournament2015: <Tournament2015Page />,
    tournament2017: <Tournament2017Page />,
    tournament2018: <Tournament2018Page />,
    tournament2019: <Tournament2019Page />,
    tournament2023: <Tournament2023Page />,
    tournament2024: <Tournament2024Page />,
    trokosi: <TrokosiPage />,
    vocationalschool: <VocationalSchoolPage />,
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
