'use client';

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Mail, CheckCircle } from 'lucide-react';

export default function NewsletterForm({ variant = 'default' }: { variant?: 'default' | 'compact' }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setEmail('');
      }, 3000);
    }
  };

  if (variant === 'compact') {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#D4AF37] flex-1"
        />
        <Button
          type="submit"
          className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold shrink-0"
        >
          {submitted ? <CheckCircle className="h-4 w-4" /> : 'Subscribe'}
        </Button>
      </form>
    );
  }

  return (
    <div className="bg-[#0B3C5D] rounded-xl p-6 md:p-8">
      <div className="flex items-center gap-3 mb-3">
        <Mail className="h-6 w-6 text-[#D4AF37]" />
        <h3 className="font-heading font-semibold text-xl text-white">
          Stay Updated
        </h3>
      </div>
      <p className="text-white/70 text-sm mb-4">
        Subscribe to our newsletter and stay informed about our peace-building
        initiatives and community programs.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#D4AF37]"
        />
        <Button
          type="submit"
          className="w-full bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold"
        >
          {submitted ? (
            <span className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4" /> Subscribed!
            </span>
          ) : (
            'Subscribe to Newsletter'
          )}
        </Button>
      </form>
    </div>
  );
}
