'use client';

import React from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0B3C5D]">
      <div className="text-center p-8 max-w-md">
        <div className="text-4xl mb-4">&#9203;</div>
        <h1 className="text-2xl font-heading font-bold text-[#D4AF37] mb-3">
          Something Went Wrong
        </h1>
        <p className="text-white/70 mb-6 leading-relaxed">
          We encountered an error while loading the page. This might be temporary.
          Please try again.
        </p>
        <button
          onClick={reset}
          className="bg-[#D4AF37] text-[#0B3C5D] font-semibold px-6 py-3 rounded-lg hover:bg-[#c9a22e] transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}
