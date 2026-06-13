'use client';

import React, { useState, Suspense, lazy } from 'react';
import { useAdmin, AdminSubPage } from './AdminContext';
import { useAdminAuth } from './AdminAuthContext';
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
  ChevronDown, ShieldCheck, Globe, SlidersHorizontal, TrendingUp,
  Info, HandHeart, PenSquare, FolderOpen
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

interface NavGroup {
  id: string;
  label: string;
  icon: React.ElementType;
  items: NavItem[];
}

const navGroups: NavGroup[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: LayoutDashboard,
    items: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    ],
  },
  {
    id: 'account',
    label: 'Account & Access',
    icon: ShieldCheck,
    items: [
      { id: 'users', label: 'Super Admin', icon: ShieldCheck },
      { id: 'profile', label: 'My Profile', icon: User },
      { id: 'notifications', label: 'Notifications', icon: Bell },
    ],
  },
  {
    id: 'website',
    label: 'Website Settings',
    icon: Globe,
    items: [
      { id: 'cms-site', label: 'Site Settings', icon: Settings },
      { id: 'cms-hero', label: 'Hero & Slider', icon: SlidersHorizontal },
      { id: 'cms-stats', label: 'Statistics Counter', icon: TrendingUp },
      { id: 'cms-about', label: 'About Section', icon: Info },
    ],
  },
  {
    id: 'programs-causes',
    label: 'Programs & Causes',
    icon: HandHeart,
    items: [
      { id: 'cms-causes', label: 'Causes', icon: Heart },
      { id: 'cms-programs', label: 'Programs', icon: LayoutGrid },
      { id: 'cms-events', label: 'Events', icon: Calendar },
    ],
  },
  {
    id: 'people',
    label: 'People & Stories',
    icon: Users,
    items: [
      { id: 'cms-team', label: 'Team Members', icon: Users },
      { id: 'cms-testimonials', label: 'Testimonials', icon: MessageSquare },
    ],
  },
  {
    id: 'media-content',
    label: 'Media & Content',
    icon: Camera,
    items: [
      { id: 'cms-news', label: 'News & Blog', icon: Newspaper },
      { id: 'cms-gallery', label: 'Photo Gallery', icon: Camera },
      { id: 'cms-pages', label: 'Page Content', icon: PenSquare },
    ],
  },
  {
    id: 'finance',
    label: 'Finance & Reports',
    icon: DollarSign,
    items: [
      { id: 'cms-donations', label: 'Donations', icon: DollarSign },
      { id: 'reports', label: 'Reports & Analytics', icon: BarChart3 },
    ],
  },
];

// Build a flat set of all nav item IDs for quick lookup
const allNavIds = new Set(navGroups.flatMap((g) => g.items.map((i) => i.id)));

const pageTitles: Record<AdminSubPage, string> = {
  dashboard: 'Dashboard',
  users: 'Super Admin',
  content: 'Content Management',
  media: 'Media Library',
  events: 'Events Management',
  donations: 'Donations',
  reports: 'Reports & Analytics',
  settings: 'Settings',
  profile: 'My Profile',
  notifications: 'Notifications',
  'cms-site': 'Site Settings',
  'cms-hero': 'Hero & Slider',
  'cms-stats': 'Statistics Counter',
  'cms-about': 'About Section',
  'cms-causes': 'Causes',
  'cms-testimonials': 'Testimonials',
  'cms-team': 'Team Members',
  'cms-events': 'Events',
  'cms-news': 'News & Blog',
  'cms-programs': 'Programs',
  'cms-donations': 'Donations',
  'cms-gallery': 'Photo Gallery',
  'cms-pages': 'Page Content',
};

function AdminLoader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-[#C62828] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function AdminShell() {
  const { currentAdminPage, navigateAdmin } = useAdmin();
  const { logout } = useAdminAuth();
  const { navigateTo } = usePage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>(() => {
    // Start with all groups expanded
    const initial: Record<string, boolean> = {};
    navGroups.forEach((g) => {
      initial[g.id] = true;
    });
    return initial;
  });

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => ({ ...prev, [groupId]: !prev[groupId] }));
  };

  // Find which group is currently active
  const activeGroup = navGroups.find((g) =>
    g.items.some((i) => i.id === currentAdminPage)
  );

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

  const sidebarWidth = sidebarCollapsed ? 'lg:w-20' : 'lg:w-72';

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
          sidebarOpen ? 'translate-x-0 w-72' : '-translate-x-full lg:translate-x-0'
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
        <nav className="flex-1 overflow-y-auto py-3 px-3 space-y-0.5">
          {navGroups.map((group) => {
            const isGroupActive = group.id === activeGroup?.id;
            const isExpanded = expandedGroups[group.id] ?? true;
            const GroupIcon = group.icon;

            return (
              <div key={group.id} className="mb-1">
                {/* Group Header */}
                {!sidebarCollapsed ? (
                  <button
                    onClick={() => toggleGroup(group.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-[11px] uppercase tracking-wider font-bold transition-colors ${
                      isGroupActive
                        ? 'text-white bg-white/10'
                        : 'text-white/50 hover:text-white/70 hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <GroupIcon className="w-3.5 h-3.5" />
                      <span>{group.label}</span>
                    </div>
                    <ChevronDown
                      className={`w-3 h-3 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
                    />
                  </button>
                ) : (
                  <div className="my-2 border-t border-white/10" />
                )}

                {/* Group Items */}
                {isExpanded && group.items.map((item) => {
                  const isActive = currentAdminPage === item.id;
                  const ItemIcon = item.icon;
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
                          : isGroupActive
                          ? 'text-white/80 hover:bg-white/10 hover:text-white'
                          : 'text-white/60 hover:bg-white/10 hover:text-white'
                      } ${sidebarCollapsed ? 'justify-center' : 'ml-1 pl-5'}`}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <ItemIcon className="w-4 h-4 flex-shrink-0" />
                      {!sidebarCollapsed && <span className="text-[13px]">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
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
            {!sidebarCollapsed && <span>Collapse Sidebar</span>}
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
                          setProfileDropdownOpen(false);
                          logout();
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
