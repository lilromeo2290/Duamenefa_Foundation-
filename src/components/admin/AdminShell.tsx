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
  ClipboardList, Building, Plane, Heart, BarChart3, Settings,
  Bell, Search, Menu, X, ChevronLeft, LogOut, User
} from 'lucide-react';

// Lazy-load all admin sub-pages
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const UsersPage = lazy(() => import('./pages/UsersPage'));
const ContentPage = lazy(() => import('./pages/ContentPage'));
const MediaPage = lazy(() => import('./pages/MediaPage'));
const EventsPage = lazy(() => import('./pages/EventsPage'));
const DonationsPage = lazy(() => import('./pages/DonationsPage'));
const PlacementsPage = lazy(() => import('./pages/PlacementsPage'));
const AccommodationPage = lazy(() => import('./pages/AccommodationPage'));
const AirportPickupPage = lazy(() => import('./pages/AirportPickupPage'));
const VolunteersPage = lazy(() => import('./pages/VolunteersPage'));
const ReportsPage = lazy(() => import('./pages/ReportsPage'));
const SettingsPage = lazy(() => import('./pages/SettingsPage'));
const ProfilePage = lazy(() => import('./pages/ProfilePage'));
const NotificationsPage = lazy(() => import('./pages/NotificationsPage'));

interface NavItem {
  id: AdminSubPage;
  label: string;
  icon: React.ElementType;
}

const navItems: NavItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'users', label: 'Users', icon: Users },
  { id: 'content', label: 'Content', icon: FileText },
  { id: 'media', label: 'Media', icon: Image },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'donations', label: 'Donations', icon: DollarSign },
  { id: 'placements', label: 'Placements', icon: ClipboardList },
  { id: 'accommodation', label: 'Accommodation', icon: Building },
  { id: 'airport-pickup', label: 'Airport Pickup', icon: Plane },
  { id: 'volunteers', label: 'Volunteers', icon: Heart },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const pageTitles: Record<AdminSubPage, string> = {
  dashboard: 'Dashboard',
  users: 'User Management',
  content: 'Content Management',
  media: 'Media Library',
  events: 'Events Management',
  donations: 'Donations',
  placements: 'Placement Applications',
  accommodation: 'Accommodation',
  'airport-pickup': 'Airport Pickup',
  volunteers: 'Volunteers',
  reports: 'Reports & Analytics',
  settings: 'Settings',
  profile: 'My Profile',
  notifications: 'Notifications',
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
  const { navigateTo } = usePage();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const renderPage = () => {
    const page = (
      <Suspense fallback={<AdminLoader />}>
        {currentAdminPage === 'dashboard' && <DashboardPage />}
        {currentAdminPage === 'users' && <UsersPage />}
        {currentAdminPage === 'content' && <ContentPage />}
        {currentAdminPage === 'media' && <MediaPage />}
        {currentAdminPage === 'events' && <EventsPage />}
        {currentAdminPage === 'donations' && <DonationsPage />}
        {currentAdminPage === 'placements' && <PlacementsPage />}
        {currentAdminPage === 'accommodation' && <AccommodationPage />}
        {currentAdminPage === 'airport-pickup' && <AirportPickupPage />}
        {currentAdminPage === 'volunteers' && <VolunteersPage />}
        {currentAdminPage === 'reports' && <ReportsPage />}
        {currentAdminPage === 'settings' && <SettingsPage />}
        {currentAdminPage === 'profile' && <ProfilePage />}
        {currentAdminPage === 'notifications' && <NotificationsPage />}
      </Suspense>
    );
    return page;
  };

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
        } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
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
          {navItems.map((item) => {
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
                        navigateAdmin('settings');
                        setProfileDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-[#333333] hover:bg-gray-50"
                    >
                      <Settings className="w-4 h-4" /> Settings
                    </button>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={() => {
                          navigateTo('home');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                      >
                        <LogOut className="w-4 h-4" /> Exit Admin
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
