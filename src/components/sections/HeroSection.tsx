'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePage } from '@/context/PageContext';
import { Button } from '@/components/ui/button';
import { Heart, Users, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sliderImages = [
  {
    src: '/duamenafa-4.jpg',
    alt: 'Duamenefa Foundation community gathering for peace',
  },
  {
    src: '/duamenafa-10.jpg',
    alt: 'Duamenefa Foundation outreach program',
  },
  {
    src: '/duamenefa-27.jpg',
    alt: 'Duamenefa Foundation peacebuilding initiative',
  },
  {
    src: '/duamenafa-176.jpg',
    alt: 'Duamenefa Foundation community transformation',
  },
  {
    src: '/duamenafa-196.jpg',
    alt: 'Duamenefa Foundation advocacy campaign',
  },
  {
    src: '/duamenafa-198.jpg',
    alt: 'Duamenefa Foundation volunteers in action',
  },
  {
    src: '/marathon-13.jpg',
    alt: 'Duamenefa Foundation marathon for peace',
  },
];

export default function HeroSection() {
  const { navigateTo } = usePage();
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + sliderImages.length) % sliderImages.length);
  }, []);

  // Auto-advance slider every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [nextSlide]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
      {/* Background Image Slider */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('${sliderImages[currentSlide].src}')` }}
        />
      </AnimatePresence>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/90 via-[#0B3C5D]/75 to-[#0B3C5D]/55" />

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-[#D4AF37]/10 blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-[#D4AF37]/10 blur-3xl" />

      {/* Slider Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all duration-300 group"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white group-hover:text-[#D4AF37] transition-colors" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 flex items-center justify-center transition-all duration-300 group"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white group-hover:text-[#D4AF37] transition-colors" />
      </button>

      {/* Slider Dots */}
      <div className="absolute bottom-24 md:bottom-28 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {sliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index
                ? 'w-8 h-2.5 bg-[#D4AF37]'
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-6 border border-[#D4AF37]/30">
            ★ Promoting Peace &amp; Human Dignity Since Inception
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white mb-6 leading-tight"
        >
          LET US{' '}
          <span className="text-[#D4AF37]">CO-EXIST</span>
          <br />
          IN PEACE
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white/80 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Promoting Peace, Justice, Reconciliation, and Human Dignity Across Communities.
          Together, we can transform lives and build a harmonious society.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Button
            onClick={() => navigateTo('donate')}
            size="lg"
            className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold px-8 py-6 text-lg"
          >
            <Heart className="h-5 w-5 mr-2" />
            Donate Now
          </Button>
          <Button
            onClick={() => navigateTo('volunteer')}
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
          >
            <Users className="h-5 w-5 mr-2" />
            Become a Volunteer
          </Button>
          <Button
            onClick={() => navigateTo('media')}
            size="lg"
            variant="ghost"
            className="text-white/80 hover:text-white hover:bg-white/10 px-8 py-6 text-lg"
          >
            <Play className="h-5 w-5 mr-2" />
            Watch Live Programs
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
