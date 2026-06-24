'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { usePage } from '@/context/PageContext';
import { useCMS } from '@/lib/cms-store';
import { Button } from '@/components/ui/button';
import { Heart, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Autoplay from 'embla-carousel-autoplay';
import useEmblaCarousel from 'embla-carousel-react';

const sliderImages = [
  {
    src: '/slider-donations-single-parents.jpg',
    alt: 'Donations of equipment to single parents',
  },
  {
    src: '/slider-donation-keta-hospital.jpg',
    alt: 'Donation to Keta Hospital',
  },
  {
    src: '/slider-donations-childrens-village.jpg',
    alt: 'Donations to Children\'s Village',
  },
  {
    src: '/slider-donations-male-ward-keta.jpg',
    alt: 'Donations for male ward at Keta Hospital',
  },
  {
    src: '/slider-regional-tournament.jpg',
    alt: 'Duamenefa Regional Tournament',
  },
  {
    src: '/slider-award-costheta.jpg',
    alt: 'Award at Costheta Educational Support Fund',
  },
];

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

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi]
  );

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#0B3C5D]">
      {/* Image Slider Background */}
      <div className="absolute inset-0">
        <div ref={emblaRef} className="h-full overflow-hidden">
          <div className="flex h-full">
            {sliderImages.map((image, index) => (
              <div key={index} className="min-w-0 flex-[0_0_100%] h-full relative">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Dark overlay for text readability — lighter so images show more clearly */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B3C5D]/55 via-black/25 to-[#0B3C5D]/65" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Slider Navigation Arrows */}
      <button
        onClick={scrollPrev}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/30 backdrop-blur-md border-2 border-white/30 text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0B3C5D] transition-all duration-300 flex items-center justify-center shadow-xl"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-7 w-7" />
      </button>
      <button
        onClick={scrollNext}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-full bg-black/30 backdrop-blur-md border-2 border-white/30 text-white hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#0B3C5D] transition-all duration-300 flex items-center justify-center shadow-xl"
        aria-label="Next slide"
      >
        <ChevronRight className="h-7 w-7" />
      </button>

      {/* Slider Dots Indicator */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-300 rounded-full ${
              index === selectedIndex
                ? 'w-10 h-4 bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/40'
                : 'w-4 h-4 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#D4AF37]/10 blur-3xl z-10" />
      <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#D4AF37]/8 blur-3xl z-10" />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="inline-block bg-[#D4AF37]/40 text-[#D4AF37] text-xs sm:text-sm font-bold px-4 py-1.5 rounded-full mb-5 border-2 border-[#D4AF37]/60 backdrop-blur-md drop-shadow-[0_4px_12px_rgba(212,175,55,0.35)] tracking-wide uppercase">
            {badgeText}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-heading font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white mb-5 leading-[1.05] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)]"
        >
          {heading}{' '}
          <span className="text-[#D4AF37] drop-shadow-[0_0_30px_rgba(212,175,55,0.5)]">{headingHighlight}</span>
          <br />
          {headingLine2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]"
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
            className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-bold px-7 py-5 text-base shadow-xl shadow-[#D4AF37]/30 tracking-wide"
          >
            <Heart className="h-4 w-4 mr-2" />
            {primaryButtonText}
          </Button>
          <Button
            onClick={() => navigateTo('about')}
            size="lg"
            variant="outline"
            className="border-2 border-white/50 bg-white/15 backdrop-blur-md text-white hover:bg-white/25 px-7 py-5 text-base font-bold tracking-wide shadow-lg"
          >
            <Users className="h-4 w-4 mr-2" />
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
