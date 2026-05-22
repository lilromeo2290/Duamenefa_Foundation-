'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileDown, Users, Phone, Mail } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ReportersPage() {
  return (
    <div className="pt-20 md:pt-28 min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#4C9A2A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Users className="h-4 w-4 inline mr-1" />
            Our Team
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Leaders & <span className="text-[#D4AF37]">Reporters</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Meet the dedicated leaders and reporters who drive the mission of Duamenefa Foundation
            across the Volta Region and beyond.
          </p>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-[#0B3C5D] to-[#0a2e47] p-8 md:p-12 text-white text-center">
                <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-6">
                  <FileDown className="h-10 w-10 text-[#D4AF37]" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                  List of Leaders and Reporters
                </h2>
                <p className="text-white/70 max-w-lg mx-auto mb-8">
                  Download the complete list of Duamenefa Foundation leaders and reporters for 2024.
                  This document contains the names, roles, and contact information of all our dedicated
                  team members working across the Volta Region.
                </p>
                <a
                  href="/reporters-list-2024.pdf"
                  download
                >
                  <Button className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-bold text-lg px-10 py-6">
                    <FileDown className="h-5 w-5 mr-2" />
                    Click to Download List of Leaders and Reporters
                  </Button>
                </a>
                <p className="text-white/50 text-xs mt-4">
                  PDF Document — Updated 2024
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center">
            <h2 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-4">
              Want to Join Our Team?
            </h2>
            <p className="text-[#6B4F3A] mb-8 max-w-lg mx-auto">
              If you are interested in becoming a reporter or leader within the Duamenefa Foundation,
              please reach out to us.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <div className="flex items-center gap-2 text-[#6B4F3A]">
                <Phone className="h-4 w-4 text-[#D4AF37]" />
                <span>+233 242 313 766</span>
              </div>
              <div className="flex items-center gap-2 text-[#6B4F3A]">
                <Mail className="h-4 w-4 text-[#D4AF37]" />
                <span>duamenefafoundation@yahoo.com</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
