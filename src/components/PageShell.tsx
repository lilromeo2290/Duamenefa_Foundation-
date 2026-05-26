'use client';

import React, { Suspense, lazy } from 'react';
import { PageProvider, usePage } from '@/context/PageContext';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';
import ErrorBoundary from '@/components/ErrorBoundary';
import HomePage from '@/components/pages/HomePage';
import { AnimatePresence, motion } from 'framer-motion';

// Lazy-load all page components except HomePage (most frequently visited)
// This significantly reduces the initial bundle size and cold-start time
const AboutPage = lazy(() => import('@/components/pages/AboutPage'));
const WhoWeArePage = lazy(() => import('@/components/pages/WhoWeArePage'));
const ExecutivesPage = lazy(() => import('@/components/pages/ExecutivesPage'));
const AssociatesPage = lazy(() => import('@/components/pages/AssociatesPage'));
const FormsPage = lazy(() => import('@/components/pages/FormsPage'));
const VolunteerFormPage = lazy(() => import('@/components/pages/VolunteerFormPage'));
const CosthetaPage = lazy(() => import('@/components/pages/CosthetaPage'));
const NewslettersPage = lazy(() => import('@/components/pages/NewslettersPage'));
const ReportersPage = lazy(() => import('@/components/pages/ReportersPage'));
const ActivitiesPage = lazy(() => import('@/components/pages/ActivitiesPage'));
const RegionalTournamentsPage = lazy(() => import('@/components/pages/RegionalTournamentsPage'));
const Tournament2015Page = lazy(() => import('@/components/pages/Tournament2015Page'));
const Tournament2017Page = lazy(() => import('@/components/pages/Tournament2017Page'));
const Tournament2018Page = lazy(() => import('@/components/pages/Tournament2018Page'));
const Tournament2019Page = lazy(() => import('@/components/pages/Tournament2019Page'));
const Tournament2023Page = lazy(() => import('@/components/pages/Tournament2023Page'));
const Tournament2024Page = lazy(() => import('@/components/pages/Tournament2024Page'));
const TrokosiPage = lazy(() => import('@/components/pages/TrokosiPage'));
const VocationalSchoolPage = lazy(() => import('@/components/pages/VocationalSchoolPage'));
const ContactPage = lazy(() => import('@/components/pages/ContactPage'));
const ProgramsPage = lazy(() => import('@/components/pages/ProgramsPage'));
const MediaPage = lazy(() => import('@/components/pages/MediaPage'));
const StoriesPage = lazy(() => import('@/components/pages/StoriesPage'));
const DonatePage = lazy(() => import('@/components/pages/DonatePage'));
const VolunteerPage = lazy(() => import('@/components/pages/VolunteerPage'));
const NewsPage = lazy(() => import('@/components/pages/NewsPage'));

// Loading fallback for lazy-loaded pages
function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#D4AF37] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#6B4F3A]/60 text-sm">Loading...</p>
      </div>
    </div>
  );
}

function PageContent() {
  const { currentPage } = usePage();

  const pages: Record<string, React.ReactNode> = {
    home: <HomePage />,
    about: <Suspense fallback={<PageLoader />}><AboutPage /></Suspense>,
    whowear: <Suspense fallback={<PageLoader />}><WhoWeArePage /></Suspense>,
    executives: <Suspense fallback={<PageLoader />}><ExecutivesPage /></Suspense>,
    associates: <Suspense fallback={<PageLoader />}><AssociatesPage /></Suspense>,
    forms: <Suspense fallback={<PageLoader />}><FormsPage /></Suspense>,
    volunteerform: <Suspense fallback={<PageLoader />}><VolunteerFormPage /></Suspense>,
    costheta: <Suspense fallback={<PageLoader />}><CosthetaPage /></Suspense>,
    newsletters: <Suspense fallback={<PageLoader />}><NewslettersPage /></Suspense>,
    reporters: <Suspense fallback={<PageLoader />}><ReportersPage /></Suspense>,
    activities: <Suspense fallback={<PageLoader />}><ActivitiesPage /></Suspense>,
    tournaments: <Suspense fallback={<PageLoader />}><RegionalTournamentsPage /></Suspense>,
    tournament2015: <Suspense fallback={<PageLoader />}><Tournament2015Page /></Suspense>,
    tournament2017: <Suspense fallback={<PageLoader />}><Tournament2017Page /></Suspense>,
    tournament2018: <Suspense fallback={<PageLoader />}><Tournament2018Page /></Suspense>,
    tournament2019: <Suspense fallback={<PageLoader />}><Tournament2019Page /></Suspense>,
    tournament2023: <Suspense fallback={<PageLoader />}><Tournament2023Page /></Suspense>,
    tournament2024: <Suspense fallback={<PageLoader />}><Tournament2024Page /></Suspense>,
    trokosi: <Suspense fallback={<PageLoader />}><TrokosiPage /></Suspense>,
    vocationalschool: <Suspense fallback={<PageLoader />}><VocationalSchoolPage /></Suspense>,
    contact: <Suspense fallback={<PageLoader />}><ContactPage /></Suspense>,
    programs: <Suspense fallback={<PageLoader />}><ProgramsPage /></Suspense>,
    media: <Suspense fallback={<PageLoader />}><MediaPage /></Suspense>,
    stories: <Suspense fallback={<PageLoader />}><StoriesPage /></Suspense>,
    donate: <Suspense fallback={<PageLoader />}><DonatePage /></Suspense>,
    volunteer: <Suspense fallback={<PageLoader />}><VolunteerPage /></Suspense>,
    news: <Suspense fallback={<PageLoader />}><NewsPage /></Suspense>,
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

export default function PageShell() {
  return (
    <PageProvider>
      <PageContent />
    </PageProvider>
  );
}
