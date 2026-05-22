'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  FileDown,
  GraduationCap,
  Phone,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function CosthetaPage() {
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
            Forms
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Costheta <span className="text-[#D4AF37]">Education Support Fund</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Supporting education and empowering the next generation through the Costheta Education Support Fund.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Instructions Card */}
          <motion.div {...fadeInUp} className="mb-10">
            <Card className="border-l-4 border-l-[#D4AF37] border-0 shadow-lg">
              <CardContent className="p-6 md:p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center shrink-0">
                    <AlertCircle className="h-6 w-6 text-[#D4AF37]" />
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-xl text-[#0B3C5D] mb-3">
                      Application Instructions
                    </h2>
                    <p className="text-[#6B4F3A] text-base leading-relaxed mb-3">
                      Please fill in all the information. Follow instructions on the application form.
                    </p>
                    <p className="text-[#6B4F3A] text-base leading-relaxed">
                      If you have any questions, please send text only to{' '}
                      <a
                        href="tel:+233243752239"
                        className="text-[#D4AF37] font-medium hover:underline"
                      >
                        +233 243 752 239
                      </a>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Download Application Form */}
          <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-xl overflow-hidden">
              <div className="bg-gradient-to-br from-[#0B3C5D] to-[#0a2e47] p-8 md:p-12 text-white text-center">
                <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-6">
                  <GraduationCap className="h-10 w-10 text-[#D4AF37]" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl mb-4">
                  Costheta Education Support Fund
                </h2>
                <p className="text-white/70 max-w-lg mx-auto mb-2">
                  Application Form
                </p>
                <p className="text-white/60 text-sm max-w-md mx-auto mb-8">
                  Download the application form, complete it following the instructions provided,
                  and submit as directed on the form.
                </p>
                <a
                  href="/costheta-application-form.pdf"
                  download
                >
                  <Button className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-bold text-lg px-10 py-6">
                    <FileDown className="h-5 w-5 mr-2" />
                    Download Application Form
                  </Button>
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <MessageSquare className="h-5 w-5 text-[#D4AF37]" />
              <h3 className="font-heading font-bold text-lg text-[#0B3C5D]">
                Questions?
              </h3>
            </div>
            <p className="text-[#6B4F3A] mb-4">
              If you have any questions about the Costheta Education Support Fund or the application process,
              please send a text message only to:
            </p>
            <a
              href="tel:+233243752239"
              className="inline-flex items-center gap-2 text-[#D4AF37] font-heading font-bold text-xl hover:underline"
            >
              <Phone className="h-5 w-5" />
              +233 243 752 239
            </a>
            <p className="text-[#6B4F3A]/60 text-sm mt-2">
              Text messages only, please.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
