'use client';

import React from 'react';
import { usePage, PageName } from '@/context/PageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  MapPin,
  Phone,
  Mail,
  Heart,
  ExternalLink,
} from 'lucide-react';

const quickLinks: { label: string; page: PageName }[] = [
  { label: 'About Us', page: 'about' },
  { label: 'Who We Are', page: 'whowear' },
  { label: 'Executives', page: 'executives' },
  { label: 'Associates', page: 'associates' },
  { label: 'Community Reporters / Leaders', page: 'reporters' },
  { label: 'Forms', page: 'forms' },
  { label: 'Volunteer Membership Form', page: 'volunteerform' },
  { label: 'Costheta Education Support Fund', page: 'costheta' },
  { label: 'Newsletters', page: 'newsletters' },
  { label: 'Activities', page: 'activities' },
  { label: 'Regional Tournaments', page: 'tournaments' },
  { label: 'Tournament 2015', page: 'tournament2015' },
  { label: 'Tournament 2017', page: 'tournament2017' },
  { label: 'Tournament 2018', page: 'tournament2018' },
  { label: 'Tournament 2019', page: 'tournament2019' },
  { label: 'Tournament 2023', page: 'tournament2023' },
  { label: 'Tournament 2024', page: 'tournament2024' },
  { label: 'Trokosi', page: 'trokosi' },
  { label: 'Vocational School', page: 'vocationalschool' },
  { label: 'Contact Us', page: 'contact' },
];

export default function Footer() {
  const { navigateTo } = usePage();

  return (
    <footer className="bg-[#0B3C5D] text-white">
      {/* Donation CTA Banner */}
      <div className="bg-[#D4AF37]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-[#0B3C5D] font-heading font-bold text-xl md:text-2xl">
              Help Us Build a Peaceful World
            </h3>
            <p className="text-[#0B3C5D]/80 text-sm mt-1">
              Your generous donation transforms lives and brings hope to communities across Ghana.
            </p>
          </div>
          <Button
            onClick={() => navigateTo('forms')}
            className="bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold px-8 py-3 text-lg shrink-0"
          >
            <Heart className="h-5 w-5 mr-2" />
            Donate Now
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* About Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img
                src="/logo.jpg"
                alt="Duamenefa Foundation Logo"
                className="h-10 w-auto object-contain rounded"
              />
              <div>
                <h3 className="font-heading font-bold text-lg text-[#D4AF37]">
                  Duamenefa
                </h3>
                <p className="text-white/60 text-xs">Foundation</p>
              </div>
            </div>
            <p className="text-white/70 text-sm leading-relaxed mb-4">
              Duamenefa Foundation is a Ghana-based NGO dedicated to promoting peace,
              reconciliation, child rights advocacy, and community transformation.
              &quot;Duamenefa&quot; means &quot;Let Us Co-Exist in Peace&quot; in the Ewe language.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0B3C5D] transition-all duration-200"
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0B3C5D] transition-all duration-200"
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0B3C5D] transition-all duration-200"
                aria-label="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0B3C5D] transition-all duration-200"
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-[#D4AF37]">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.page}>
                  <button
                    onClick={() => navigateTo(link.page)}
                    className="text-white/70 hover:text-[#D4AF37] text-sm transition-colors duration-200 flex items-center gap-2"
                  >
                    <ExternalLink className="h-3 w-3" />
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-[#D4AF37]">
              Contact Info
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-[#D4AF37]" />
                <span>FAFAA 100.3 FM Premises, PO BOX DZ125, Dzodze, Volta Region</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <Phone className="h-4 w-4 mt-0.5 shrink-0 text-[#D4AF37]" />
                <span>+233 242 313 766</span>
              </li>
              <li className="flex items-start gap-3 text-white/70 text-sm">
                <Mail className="h-4 w-4 mt-0.5 shrink-0 text-[#D4AF37]" />
                <span>duamenefafoundation@yahoo.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h3 className="font-heading font-semibold text-lg mb-4 text-[#D4AF37]">
              Newsletter
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Subscribe to our newsletter and stay updated on our peace-building initiatives and community programs.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
              }}
              className="space-y-2"
            >
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#D4AF37]"
              />
              <Button
                type="submit"
                className="w-full bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold"
              >
                Subscribe
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <Separator className="bg-white/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>&copy; 2024 Duamenefa Foundation. All Rights Reserved.</p>
          <p>Registered NGO | Ghana, West Africa</p>
        </div>
      </div>
    </footer>
  );
}
