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
    <section className="relative min-h-[90vh] flex items-end justify-start overflow-hidden bg-[#0B3C5D]">
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

        {/* Subtle bottom-only gradient for text legibility — images stay clearly visible */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
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
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollTo(index)}
            className={`transition-all duration-300 rounded-full ${
              index === selectedIndex
                ? 'w-8 h-3 bg-[#D4AF37] shadow-lg shadow-[#D4AF37]/40'
                : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content Overlay — bottom-aligned, heading on far left, subheading on far right */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-16 text-left flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8">
        {/* Left side: heading only */}
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="font-heading font-black text-3xl sm:text-4xl md:text-5xl text-white leading-[1.05] tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]"
          >
            {heading}{' '}
            <span className="text-[#D4AF37] drop-shadow-[0_0_20px_rgba(212,175,55,0.5)]">{headingHighlight}</span>
            <br />
            {headingLine2}
          </motion.h1>
        </div>

        {/* Right side: subheading anchored to far right */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-white/90 text-sm md:text-base max-w-sm sm:text-right leading-relaxed font-medium drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] sm:border-l sm:border-white/30 sm:pl-6 lg:pl-8 sm:mb-2"
        >
          {subheading}
        </motion.p>
      </div>
    </section>
  );
}
