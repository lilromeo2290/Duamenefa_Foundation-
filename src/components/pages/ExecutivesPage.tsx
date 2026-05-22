'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Users, Download, Eye } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ExecutivesPage() {
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
            Who We Are
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            <span className="text-[#D4AF37]">Executives</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Meet the dedicated leaders who guide the Duamenefa Foundation in its mission to promote peaceful co-existence.
          </p>
        </div>
      </section>

      {/* Executive Board Image */}
      <section className="py-16 md:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <div className="text-center mb-10">
              <span className="inline-flex items-center gap-2 bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                <Users className="h-4 w-4" />
                Leadership
              </span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D] mb-3">
                Duamenefa Foundation Executive Board of Governors 2025
              </h2>
              <p className="text-[#6B4F3A] max-w-xl mx-auto">
                The Executive Board of Governors provides strategic direction and oversight to ensure the foundation fulfills its mandate of fostering peace and development in communities across Ghana.
              </p>
            </div>

            <Card className="border-0 shadow-xl overflow-hidden">
              <CardContent className="p-0">
                <div className="relative group">
                  <img
                    src="/executive-governing-board.jpg"
                    alt="Duamenefa Foundation Executive Board of Governors 2025"
                    className="w-full h-auto object-contain"
                  />
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-[#0B3C5D]/0 group-hover:bg-[#0B3C5D]/20 transition-all duration-300 flex items-center justify-center">
                    <a
                      href="/executive-governing-board.jpg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 hover:bg-white text-[#0B3C5D] font-medium px-6 py-3 rounded-full shadow-lg flex items-center gap-2"
                    >
                      <Eye className="h-5 w-5" />
                      View Full Size
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Download Button */}
            <div className="text-center mt-8">
              <a
                href="/executive-governing-board.jpg"
                download
                className="inline-flex items-center gap-2 bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold px-8 py-3.5 rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              >
                <Download className="h-5 w-5" />
                Download Image
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
