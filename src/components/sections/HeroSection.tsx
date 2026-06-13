'use client';

import React from 'react';
import { usePage } from '@/context/PageContext';
import { useCMS } from '@/lib/cms-store';
import { Button } from '@/components/ui/button';
import { Heart, Users } from 'lucide-react';
import { motion } from 'framer-motion';

export default function HeroSection() {
  const { navigateTo } = usePage();
  const { hero } = useCMS();

  const badgeText = hero?.badgeText || '★ Promoting Peace & Human Dignity Since Inception';
  const heading = hero?.heading || 'LET US';
  const headingHighlight = hero?.headingHighlight || 'CO-EXIST';
  const headingLine2 = hero?.headingLine2 || 'IN PEACE';
  const subheading = hero?.subheading || 'Promoting Peace, Justice, Reconciliation, and Human Dignity Across Communities. Together, we can transform lives and build a harmonious society.';
  const primaryButtonText = hero?.primaryButtonText || 'Learn About Us';
  const secondaryButtonText = hero?.secondaryButtonText || 'Our Operations';

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B3C5D]">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#D4AF37]/8 blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#4C9A2A]/5 blur-3xl" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block bg-[#D4AF37]/30 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-[#D4AF37]/40 backdrop-blur-sm drop-shadow-lg">
            {badgeText}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
        >
          {heading}{' '}
          <span className="text-[#D4AF37]">{headingHighlight}</span>
          <br />
          {headingLine2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]"
        >
          {subheading}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => navigateTo('about')}
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold px-8 py-6 text-lg"
          >
            <Heart className="h-5 w-5 mr-2" />
            {primaryButtonText}
          </Button>
          <Button
            onClick={() => navigateTo('about')}
            size="lg"
            variant="outline"
            className="border-white/40 bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 px-8 py-6 text-lg"
          >
            <Users className="h-5 w-5 mr-2" />
            {secondaryButtonText}
          </Button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
              className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
