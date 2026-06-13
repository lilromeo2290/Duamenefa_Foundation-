'use client';

import React, { useState, Suspense, lazy } from 'react';
import { useAdmin, AdminSubPage } from './AdminContext';
import { usePage } from '@/context/PageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  LayoutDashboard, Users, FileText, Image, Calendar, DollarSign,
  Heart, BarChart3, Settings,
  Bell, Search, Menu, X, ChevronLeft, LogOut, User,
  MessageSquare, Camera, FileStack, Newspaper, LayoutGrid,
  ChevronDown
} from 'lucide-react';

// Lazy-load all admin sub-pages
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));

// CMS pages
const CMSSiteSettingsPage = lazy(() => import('./pages/CMSSiteSettingsPage'));
const CMSHeroPage = lazy(() => import('./pages/CMSHeroPage'));
const CMSStatsPage = lazy(() => import('./pages/CMSStatsPage'));
const CMSAboutPage = lazy(() => import('./pages/CMSAboutPage'));
const CMSCausesPage = lazy(() => import('./pages/CMSCausesPage'));
const CMSTestimonialsPage = lazy(() => import('./pages/CMSTestimonialsPage'));
const CMSTeamPage = lazy(() => import('./pages/CMSTeamPage'));
const CMSEventsPage = lazy(() => import('./pages/CMSEventsPage'));
const CMSNewsPage = lazy(() => import('./pages/CMSNewsPage'));
const CMSProgramsPage = lazy(() => import('./pages/CMSProgramsPage'));
const CMSDonationsPage = lazy(() => import('./pages/CMSDonationsPage'));
const CMSGalleryPage = lazy(() => import('./pages/CMSGalleryPage'));
const CMSPagesPage = lazy(() => import('./pages/CMSPagesPage'));

interface NavItem {
  id: AdminSubPage;
  label: string;
  icon: React.ElementType;
}

const dashboardItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'profile', label: 'Profile', icon: User },
];

const cmsItems: NavItem[] = [
  { id: 'cms-site', label: 'Site Settings', icon: Settings },
  { id: 'cms-hero', label: 'Hero Section', icon: Image },
  { id: 'cms-stats', label: 'Stats Counter', icon: BarChart3 },
  { id: 'cms-about', label: 'About Section', icon: FileText },
  { id: 'cms-causes', label: 'Causes', icon: Heart },
  { id: 'cms-testimonials', label: 'Testimonials', icon: MessageSquare },
  { id: 'cms-team', label: 'Team Members', icon: Users },
  { id: 'cms-events', label: 'Events', icon: Calendar },
  { id: 'cms-news', label: 'News / Blog', icon: Newspaper },
  { id: 'cms-programs', label: 'Programs', icon: LayoutGrid },
  { id: 'cms-donations', label: 'Donations', icon: DollarSign },
  { id: 'cms-gallery', label: 'Gallery', icon: Camera },
  { id: 'cms-pages', label: 'Pages', icon: FileStack },
];

const pageTitles: Record<AdminSubPage, string> = {
  dashboard: 'Dashboard',
  users: 'User Management',
  content: 'Content Management',
  media: 'Media Library',
  events: 'Events Management',
  donations: 'Donations',
  reports: 'Reports & Analytics',
  settings: 'Settings',
  profile: 'My Profile',
  notifications: 'Notifications',
  'cms-site': 'CMS — Site Settings',
  'cms-hero': 'CMS — Hero Section',
  'cms-stats': 'CMS — Stats Counter',
  'cms-about': 'CMS — About Section',
  'cms-causes': 'CMS — Causes',
  'cms-testimonials': 'CMS — Testimonials',
  'cms-team': 'CMS — Team Members',
  'cms-events': 'CMS — Events',
  'cms-news': 'CMS — News / Blog',
  'cms-programs': 'CMS — Programs',
  'cms-donations': 'CMS — Donations',
  'cms-gallery': 'CMS — Gallery',
  'cms-pages': 'CMS — Pages',
};

function AdminLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-[#C62828] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

const cmsPageIds = new Set(cmsItems.map((i) => i.id));

export default function AdminShell() {
  const { currentAdminPage, navigateAdmin } = useAdmin();
  const { navigateTo } = usePage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [cmsExpanded, setCmsExpanded] = useState(true);

  const isCmsActive = cmsPageIds.has(currentAdminPage);

  const renderPage = () => {
    return (
      <Suspense fallback={<AdminLoader />}>
        {currentAdminPage === 'dashboard' && <DashboardPage />}
        {currentAdminPage === 'users' && <UsersPage />}
        {currentAdminPage === 'reports' && <ReportsPage />}
        {currentAdminPage === 'profile' && <ProfilePage />}
        {currentAdminPage === 'notifications' && <NotificationsPage />}
        {/* CMS Pages */}
        {currentAdminPage === 'cms-site' && <CMSSiteSettingsPage />}
        {currentAdminPage === 'cms-hero' && <CMSHeroPage />}
        {currentAdminPage === 'cms-stats' && <CMSStatsPage />}
        {currentAdminPage === 'cms-about' && <CMSAboutPage />}
        {currentAdminPage === 'cms-causes' && <CMSCausesPage />}
        {currentAdminPage === 'cms-testimonials' && <CMSTestimonialsPage />}
        {currentAdminPage === 'cms-team' && <CMSTeamPage />}
        {currentAdminPage === 'cms-events' && <CMSEventsPage />}
        {currentAdminPage === 'cms-news' && <CMSNewsPage />}
        {currentAdminPage === 'cms-programs' && <CMSProgramsPage />}
        {currentAdminPage === 'cms-donations' && <CMSDonationsPage />}
        {currentAdminPage === 'cms-gallery' && <CMSGalleryPage />}
        {currentAdminPage === 'cms-pages' && <CMSPagesPage />}
      </Suspense>
    );
  };

  const sidebarWidth = sidebarCollapsed ? 'lg:w-20' : 'lg:w-64';

  return (
    <div className="h-screen flex overflow-hidden bg-[#F5F5F5]">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 bg-[#8E0000] text-white transform transition-all duration-300 lg:relative lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0 w-64' : '-translate-x-full lg:translate-x-0'
        } ${sidebarWidth}`}
      >
        {/* Logo Area */}
        <div className="h-16 flex items-center justify-between px-4 border-b border-white/10">
          {!sidebarCollapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 bg-white rounded flex items-center justify-center flex-shrink-0">
                <span className="text-[#8E0000] font-bold text-sm">DF</span>
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold truncate">Duamenefa</p>
                <p className="text-xs text-white/60 truncate">Foundation</p>
              </div>
              <Badge className="bg-white/20 text-white text-[10px] ml-1">Admin</Badge>
            </div>
          )}
          {sidebarCollapsed && (
            <div className="w-8 h-8 bg-white rounded flex items-center justify-center mx-auto">
              <span className="text-[#8E0000] font-bold text-sm">DF</span>
            </div>
          )}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          {/* Dashboard Group */}
          {!sidebarCollapsed && (
            <p className="text-[10px] text-white/40 uppercase tracking-wider font-semibold px-3 mb-2">Dashboard</p>
          )}
          {dashboardItems.map((item) => {
            const isActive = currentAdminPage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigateAdmin(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#C62828] text-white shadow-md'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                } ${sidebarCollapsed ? 'justify-center' : ''}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!sidebarCollapsed && <span>{item.label}</span>}
              </button>
            );
          })}

          {/* CMS Group */}
          {!sidebarCollapsed && (
            <div className="mt-4">
              <button
                onClick={() => setCmsExpanded(!cmsExpanded)}
                className="w-full flex items-center justify-between px-3 py-2 text-[10px] text-white/40 uppercase tracking-wider font-semibold hover:text-white/60 transition-colors"
              >
                <span>Content Management</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${cmsExpanded ? 'rotate-180' : ''}`} />
              </button>
            </div>
          )}

          {sidebarCollapsed && (
            <div className="my-3 border-t border-white/10" />
          )}

          {(cmsExpanded || sidebarCollapsed) && cmsItems.map((item) => {
            const isActive = currentAdminPage === item.id;
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => {
                  navigateAdmin(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#C62828] text-white shadow-md'
                    : isCmsActive
                    ? 'text-white/80 hover:bg-white/10 hover:text-white'
                    : 'text-white/50 hover:bg-white/10 hover:text-white'
                } ${sidebarCollapsed ? 'justify-center' : 'pl-6'}`}
                title={sidebarCollapsed ? item.label : undefined}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                {!sidebarCollapsed && <span className="text-[13px]">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        {/* Collapse Toggle (Desktop only) */}
        <div className="hidden lg:block p-3 border-t border-white/10">
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 text-sm transition-colors"
          >
            <ChevronLeft className={`w-4 h-4 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            {!sidebarCollapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-[#333333] hover:text-[#C62828]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-semibold text-[#333333]">{pageTitles[currentAdminPage]}</h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search..."
                className="pl-9 w-64 h-9 text-sm"
              />
            </div>

            {/* Notifications */}
            <button
              onClick={() => navigateAdmin('notifications')}
              className="relative p-2 text-[#333333]/60 hover:text-[#C62828] transition-colors"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#C62828] rounded-full border-2 border-white" />
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 hover:opacity-80 transition-opacity"
              >
                <Avatar className="w-8 h-8">
                  <AvatarFallback className="bg-[#C62828] text-white text-xs font-bold">AU</AvatarFallback>
                </Avatar>
                <span className="hidden md:block text-sm font-medium text-[#333333]">Admin</span>
              </button>

              {profileDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-[#333333]">Admin User</p>
                      <p className="text-xs text-[#333333]/50">admin@duamenefa.org</p>
                    </div>
                    <button
                      onClick={() => {
                        navigateAdmin('profile');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#333333] hover:bg-gray-50"
                    >
                      <User className="w-4 h-4" /> My Profile
                    </button>
                    <button
                      onClick={() => {
                        navigateAdmin('cms-site');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#333333] hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4" /> CMS Settings
                    </button>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          navigateTo('home');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 w-4" /> Exit Admin
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}
