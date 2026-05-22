'use client';

import React, { useState, useEffect } from 'react';
import { usePage, PageName } from '@/context/PageContext';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from '@/components/ui/sheet';
import { Menu, Heart, Phone } from 'lucide-react';

const navItems: { label: string; page: PageName }[] = [
  { label: 'About Us', page: 'about' },
  { label: 'Who We Are', page: 'about' },
  { label: 'Forms', page: 'forms' },
  { label: 'Newsletters', page: 'newsletters' },
  { label: 'Reporters', page: 'reporters' },
  { label: 'Activities', page: 'activities' },
  { label: 'Contact Us', page: 'contact' },
];

export default function Navigation() {
  const { currentPage, navigateTo } = usePage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (page: PageName) => {
    navigateTo(page);
    setMobileOpen(false);
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
              +233 XX XXX XXXX
            </span>
            <span>info@duamenefa.org</span>
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
            {navItems.map((item) => (
              <button
                key={item.label}
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
            ))}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
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
                    {navItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => handleNav(item.page)}
                        className={`w-full text-left px-6 py-3 text-base font-medium transition-all duration-200 ${
                          currentPage === item.page
                            ? 'text-[#D4AF37] bg-white/5 border-l-4 border-[#D4AF37]'
                            : 'text-white/80 hover:text-[#D4AF37] hover:bg-white/5 border-l-4 border-transparent'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <div className="p-6 border-t border-white/10">
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
