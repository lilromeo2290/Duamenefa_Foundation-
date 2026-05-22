'use client';

import React from 'react';

export default function Tournament2024Page() {
  return (
    <div className="pt-20 md:pt-28 min-h-screen">
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#4C9A2A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Regional Tournaments
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Regional Tournament <span className="text-[#D4AF37]">2024</span>
          </h1>
        </div>
      </section>
      <section className="py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#6B4F3A]/50 text-lg">Content coming soon.</p>
        </div>
      </section>
    </div>
  );
}
