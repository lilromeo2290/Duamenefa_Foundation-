'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Heart, ArrowRight } from 'lucide-react';
import { usePage } from '@/context/PageContext';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.1 },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  const { navigateTo } = usePage();

  return (
    <div className="pt-20 md:pt-28 min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#4C9A2A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            About Us
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Duamenefa — <span className="text-[#D4AF37]">&ldquo;Let Us Co-Exist in Peace&rdquo;</span>
          </h1>
        </div>
      </section>

      {/* Coming Soon / Minimal Content */}
      <motion.section {...fadeInUp} className="py-16 md:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="w-16 h-16 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-6">
            <Heart className="h-8 w-8 text-[#D4AF37]" />
          </div>
          <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D] mb-6">
            Our Story is Being Updated
          </h2>
          <p className="text-[#6B4F3A] leading-relaxed mb-8">
            We are currently updating the content for this page. Please check back soon for the latest information about the Duamenefa Foundation, our mission, and our work across Ghana.
          </p>
          <Button
            onClick={() => navigateTo('home')}
            className="bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold"
          >
            Back to Home
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </motion.section>
    </div>
  );
}
