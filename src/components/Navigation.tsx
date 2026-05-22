'use client';

import React, { useState, useEffect, useRef } from 'react';
import { usePage, PageName } from '@/context/PageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Heart, Phone, ChevronDown, ChevronRight, Radio } from 'lucide-react';

interface SubNavItem {
  label: string;
  page: PageName;
  children?: SubNavItem[];
}

interface NavItem {
  label: string;
  page: PageName;
  children?: SubNavItem[];
}

const navItems: NavItem[] = [
  { label: 'About Us', page: 'about' },
  {
    label: 'Who We Are',
    page: 'whowear',
    children: [
      { label: 'Executives', page: 'executives' },
      { label: 'Associates', page: 'associates' },
      { label: 'Community Reporters / Leaders', page: 'reporters' },
    ],
  },
  { label: 'Forms', page: 'forms', children: [
      { label: 'Volunteer Membership Form', page: 'volunteerform' },
      { label: 'Costheta Education Support Fund', page: 'costheta' },
    ],
  },
  { label: 'Newsletters', page: 'newsletters' },
  { label: 'Activities', page: 'activities', children: [
      { label: 'Regional Tournaments', page: 'tournaments', children: [
          { label: '2015', page: 'tournament2015' },
          { label: '2017', page: 'tournament2017' },
          { label: '2018', page: 'tournament2018' },
          { label: '2019', page: 'tournament2019' },
          { label: '2023', page: 'tournament2023' },
          { label: '2024', page: 'tournament2024' },
        ],
      },
      { label: 'Trokosi', page: 'trokosi' },
      { label: 'Vocational School', page: 'vocationalschool' },
    ],
  },
  { label: 'Contact Us', page: 'contact' },
];

export default function Navigation() {
  const { currentPage, navigateTo } = usePage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSubMenu, setMobileSubMenu] = useState<string | null>(null);
  const [mobileSubSubMenu, setMobileSubSubMenu] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openSubDropdown, setOpenSubDropdown] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subDropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setOpenDropdown(null);
      setOpenSubDropdown(null);
    };
    if (openDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [openDropdown]);

  const handleNav = (page: PageName) => {
    navigateTo(page);
    setMobileOpen(false);
    setMobileSubMenu(null);
    setMobileSubSubMenu(null);
    setOpenDropdown(null);
    setOpenSubDropdown(null);
  };

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
      setOpenSubDropdown(null);
    }, 250);
  };

  const handleSubDropdownEnter = (label: string) => {
    if (subDropdownTimeoutRef.current) {
      clearTimeout(subDropdownTimeoutRef.current);
    }
    setOpenSubDropdown(label);
  };

  const handleSubDropdownLeave = () => {
    subDropdownTimeoutRef.current = setTimeout(() => {
      setOpenSubDropdown(null);
    }, 200);
  };

  const isSubActive = (item: NavItem | SubNavItem) => {
    if (!item.children) return currentPage === item.page;
    return currentPage === item.page || item.children.some((c) => isSubActive(c));
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0B3C5D] shadow-lg'
          : 'bg-[#0B3C5D]/95 backdrop-blur-sm'
      }`}
    >
      {/* Top bar */}
      <div className="hidden md:block bg-[#06263d] text-white/80 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-8">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              +233 242 313 766
            </span>
            <span>duamenefafoundation@yahoo.com</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#D4AF37] font-medium">Duamenefa — &quot;Let Us Co-Exist in Peace&quot;</span>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <button
            onClick={() => handleNav('home')}
            className="flex items-center gap-3 group"
          >
            <img
              src="/logo.jpg"
              alt="Duamenefa Foundation Logo"
              className="h-10 md:h-12 w-auto object-contain rounded"
            />
            <div className="hidden sm:block">
              <h1 className="text-white font-heading font-bold text-lg leading-tight group-hover:text-[#D4AF37] transition-colors">
                Duamenefa
              </h1>
              <p className="text-white/70 text-[10px] tracking-wider uppercase">
                Foundation
              </p>
            </div>
          </button>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1">
            {navItems.map((item) =>
              item.children ? (
                <div
                  key={item.page}
                  className="relative"
                  onMouseEnter={() => handleDropdownEnter(item.label)}
                  onMouseLeave={handleDropdownLeave}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={() => handleNav(item.page)}
                    className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md relative flex items-center gap-1 ${
                      isSubActive(item)
                        ? 'text-[#D4AF37]'
                        : 'text-white/90 hover:text-[#D4AF37] hover:bg-white/5'
                    }`}
                  >
                    {item.label}
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                        openDropdown === item.label ? 'rotate-180' : ''
                      }`}
                    />
                    {isSubActive(item) && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#D4AF37] rounded-full" />
                    )}
                  </button>
                  {/* First-level Dropdown */}
                  <div
                    className={`absolute top-full left-0 mt-1 w-64 bg-[#0a2e47] border border-white/10 rounded-lg shadow-xl overflow-visible transition-all duration-200 ${
                      openDropdown === item.label
                        ? 'opacity-100 visible translate-y-0'
                        : 'opacity-0 invisible -translate-y-2'
                    }`}
                  >
                    {item.children.map((child) =>
                      child.children ? (
                        /* Child with nested submenu (e.g. Regional Tournaments) */
                        <div
                          key={child.page}
                          className="relative"
                          onMouseEnter={() => handleSubDropdownEnter(child.label)}
                          onMouseLeave={handleSubDropdownLeave}
                        >
                          <button
                            onClick={() => handleNav(child.page)}
                            className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                              isSubActive(child)
                                ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                                : 'text-white/80 hover:text-[#D4AF37] hover:bg-white/5'
                            }`}
                          >
                            {child.label}
                            <ChevronRight className="h-3.5 w-3.5" />
                          </button>
                          {/* Second-level Dropdown (flyout) */}
                          <div
                            className={`absolute top-0 left-full ml-1 w-40 bg-[#0a2e47] border border-white/10 rounded-lg shadow-xl overflow-hidden transition-all duration-200 ${
                              openSubDropdown === child.label
                                ? 'opacity-100 visible translate-x-0'
                                : 'opacity-0 invisible -translate-x-2'
                            }`}
                          >
                            {child.children.map((grandchild) => (
                              <button
                                key={grandchild.page}
                                onClick={() => handleNav(grandchild.page)}
                                className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 ${
                                  currentPage === grandchild.page
                                    ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                                    : 'text-white/80 hover:text-[#D4AF37] hover:bg-white/5'
                                }`}
                              >
                                {grandchild.label}
                              </button>
                            ))}
                          </div>
                        </div>
                      ) : (
                        /* Regular child item */
                        <button
                          key={child.page}
                          onClick={() => handleNav(child.page)}
                          className={`w-full text-left px-4 py-3 text-sm font-medium transition-all duration-200 first:rounded-t-lg last:rounded-b-lg ${
                            currentPage === child.page
                              ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                              : 'text-white/80 hover:text-[#D4AF37] hover:bg-white/5'
                          }`}
                        >
                          {child.label}
                        </button>
                      )
                    )}
                  </div>
                </div>
              ) : (
                <button
                  key={item.page}
                  onClick={() => handleNav(item.page)}
                  className={`px-3 py-2 text-sm font-medium transition-all duration-200 rounded-md relative ${
                    currentPage === item.page
                      ? 'text-[#D4AF37]'
                      : 'text-white/90 hover:text-[#D4AF37] hover:bg-white/5'
                  }`}
                >
                  {item.label}
                  {currentPage === item.page && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-[#D4AF37] rounded-full" />
                  )}
                </button>
              )
            )}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href="https://fafaafm.radiostream321.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 bg-[#4C9A2A] hover:bg-[#3d8523] text-white font-semibold px-4 py-2 rounded-md transition-colors"
            >
              <Radio className="h-4 w-4" />
              <span className="hidden lg:inline">Online Radio</span>
              <span className="lg:hidden">Radio</span>
            </a>
            <Button
              onClick={() => handleNav('forms')}
              className="hidden md:flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold px-5"
            >
              <Heart className="h-4 w-4" />
              Donate
            </Button>

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden text-white hover:bg-white/10"
                >
                  <Menu className="h-6 w-6" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 bg-[#0B3C5D] border-white/10 p-0">
                <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                <div className="flex flex-col h-full">
                  <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <img
                        src="/logo.jpg"
                        alt="Duamenefa Foundation Logo"
                        className="h-10 w-auto object-contain rounded"
                      />
                      <div>
                        <h2 className="text-white font-heading font-bold text-lg">
                          Duamenefa
                        </h2>
                        <p className="text-white/60 text-xs">Foundation</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 py-4 overflow-y-auto">
                    {navItems.map((item) =>
                      item.children ? (
                        <div key={item.page}>
                          <button
                            onClick={() =>
                              setMobileSubMenu(
                                mobileSubMenu === item.label ? null : item.label
                              )
                            }
                            className={`w-full text-left px-6 py-3 text-base font-medium transition-all duration-200 flex items-center justify-between ${
                              isSubActive(item)
                                ? 'text-[#D4AF37] bg-white/5 border-l-4 border-[#D4AF37]'
                                : 'text-white/80 hover:text-[#D4AF37] hover:bg-white/5 border-l-4 border-transparent'
                            }`}
                          >
                            {item.label}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                mobileSubMenu === item.label ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <div
                            className={`overflow-hidden transition-all duration-300 ${
                              mobileSubMenu === item.label
                                ? 'max-h-[500px] opacity-100'
                                : 'max-h-0 opacity-0'
                            }`}
                          >
                            {item.children.map((child) =>
                              child.children ? (
                                /* Mobile: child with nested submenu */
                                <div key={child.page}>
                                  <button
                                    onClick={() =>
                                      setMobileSubSubMenu(
                                        mobileSubSubMenu === child.label ? null : child.label
                                      )
                                    }
                                    className={`w-full text-left pl-10 pr-6 py-2.5 text-sm font-medium transition-all duration-200 flex items-center justify-between ${
                                      isSubActive(child)
                                        ? 'text-[#D4AF37] bg-[#D4AF37]/5'
                                        : 'text-white/60 hover:text-[#D4AF37] hover:bg-white/5'
                                    }`}
                                  >
                                    {child.label}
                                    <ChevronDown
                                      className={`h-3.5 w-3.5 transition-transform duration-200 ${
                                        mobileSubSubMenu === child.label ? 'rotate-180' : ''
                                      }`}
                                    />
                                  </button>
                                  <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                      mobileSubSubMenu === child.label
                                        ? 'max-h-[300px] opacity-100'
                                        : 'max-h-0 opacity-0'
                                    }`}
                                  >
                                    {child.children.map((grandchild) => (
                                      <button
                                        key={grandchild.page}
                                        onClick={() => handleNav(grandchild.page)}
                                        className={`w-full text-left pl-16 pr-6 py-2 text-sm font-medium transition-all duration-200 ${
                                          currentPage === grandchild.page
                                            ? 'text-[#D4AF37] bg-[#D4AF37]/5'
                                            : 'text-white/50 hover:text-[#D4AF37] hover:bg-white/5'
                                        }`}
                                      >
                                        {grandchild.label}
                                      </button>
                                    ))}
                                  </div>
                                </div>
                              ) : (
                                /* Mobile: regular child item */
                                <button
                                  key={child.page}
                                  onClick={() => handleNav(child.page)}
                                  className={`w-full text-left pl-10 pr-6 py-2.5 text-sm font-medium transition-all duration-200 ${
                                    currentPage === child.page
                                      ? 'text-[#D4AF37] bg-[#D4AF37]/5'
                                      : 'text-white/60 hover:text-[#D4AF37] hover:bg-white/5'
                                  }`}
                                >
                                  {child.label}
                                </button>
                              )
                            )}
                          </div>
                        </div>
                      ) : (
                        <button
                          key={item.page}
                          onClick={() => handleNav(item.page)}
                          className={`w-full text-left px-6 py-3 text-base font-medium transition-all duration-200 ${
                            currentPage === item.page
                              ? 'text-[#D4AF37] bg-white/5 border-l-4 border-[#D4AF37]'
                              : 'text-white/80 hover:text-[#D4AF37] hover:bg-white/5 border-l-4 border-transparent'
                          }`}
                        >
                          {item.label}
                        </button>
                      )
                    )}
                  </div>
                  <div className="p-6 border-t border-white/10 space-y-3">
                    <a
                      href="https://fafaafm.radiostream321.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 bg-[#4C9A2A] hover:bg-[#3d8523] text-white font-semibold px-4 py-2.5 rounded-md transition-colors w-full"
                    >
                      <Radio className="h-4 w-4" />
                      Online Radio
                    </a>
                    <Button
                      onClick={() => handleNav('forms')}
                      className="w-full bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold"
                    >
                      <Heart className="h-4 w-4 mr-2" />
                      Donate Now
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </header>
  );
}
