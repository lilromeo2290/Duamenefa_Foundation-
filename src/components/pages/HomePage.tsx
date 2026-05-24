'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { usePage } from '@/context/PageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import HeroSection from '@/components/sections/HeroSection';
import StatsCounter from '@/components/sections/StatsCounter';
import VoicesOfPeace from '@/components/sections/VoicesOfPeace';
import NewsletterForm from '@/components/NewsletterForm';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Heart,
  ShieldCheck,
  Unlock,
  GraduationCap,
  ArrowRight,
  Calendar,
  Play,
  Users,
  Radio,
  HandHeart,
  ChevronLeft,
  ChevronRight,
  Camera,
} from 'lucide-react';

const featuredCauses = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Peace & Reconciliation',
    description:
      'Mediating conflicts and fostering dialogue between divided communities through traditional and modern conflict resolution approaches.',
    image: '/reconciliation.jpg',
    color: 'bg-[#0B3C5D]',
  },
  {
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Child Rights Advocacy',
    description:
      'Protecting children from spiritual manipulation, abuse, and exploitation. Ensuring every child has the right to safety and education.',
    image: '/children-education.jpg',
    color: 'bg-[#6B4F3A]',
  },
  {
    icon: <Unlock className="h-6 w-6" />,
    title: 'Trokosi Liberation',
    description:
      'Advocating against shrine servitude and rehabilitating victims. Restoring dignity and freedom to those held in bondage.',
    image: '/women-empowerment.jpg',
    color: 'bg-[#4C9A2A]',
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Education Support',
    description:
      'Providing scholarships, school supplies, and literacy programs to underserved communities. Building futures through learning.',
    image: '/vocational-training.jpg',
    color: 'bg-[#D4AF37]',
  },
];

const testimonials = [
  {
    quote:
      'Duamenefa Foundation saved my community from a devastating conflict. Their peace mediation approach brought us together when everything seemed lost.',
    name: 'Torgbui Kofi',
    role: 'Community Chief, Volta Region',
    initials: 'TK',
  },
  {
    quote:
      'Through their vocational training program, I gained skills that transformed my life. I can now support my family and contribute to my community.',
    name: 'Ama Deku',
    role: 'Program Beneficiary',
    initials: 'AD',
  },
  {
    quote:
      'The radio programs gave me hope during my darkest moments. I learned that peace is possible, and I am now a peace ambassador in my community.',
    name: 'Emmanuel Agbeko',
    role: 'Peace Ambassador',
    initials: 'EA',
  },
];

interface NewsItem {
  title: string;
  link: string;
  excerpt: string;
  date: string;
  image: string;
  category: string;
}

const aboutSliderImages = [
  { src: '/duamenafa-4.jpg', alt: 'Community peace gathering' },
  { src: '/duamenafa-10.jpg', alt: 'Outreach program activities' },
  { src: '/duamenafa-27.jpg', alt: 'Peacebuilding workshop' },
  { src: '/duamenafa-176.jpg', alt: 'Community transformation project' },
  { src: '/duamenafa-196.jpg', alt: 'Advocacy campaign rally' },
  { src: '/duamenafa-198.jpg', alt: 'Volunteers in action' },
  { src: '/marathon-13.jpg', alt: 'Peace marathon event' },
];

const galleryImages = [
  { src: '/duamenafa-4.jpg', caption: 'Community leaders united for peace' },
  { src: '/duamenafa-10.jpg', caption: 'Duamenefa outreach in rural communities' },
  { src: '/duamenafa-27.jpg', caption: 'Peace and reconciliation dialogue' },
  { src: '/duamenafa-176.jpg', caption: 'Transforming lives through advocacy' },
  { src: '/duamenafa-196.jpg', caption: 'Campaign for human rights and dignity' },
  { src: '/duamenafa-198.jpg', caption: 'Our dedicated volunteers at work' },
  { src: '/marathon-13.jpg', caption: 'Annual peace marathon for unity' },
];

function AboutImageSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % aboutSliderImages.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + aboutSliderImages.length) % aboutSliderImages.length);
  }, []);

  useEffect(() => {
    const interval = setInterval(next, 4000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative rounded-2xl overflow-hidden shadow-xl group">
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={aboutSliderImages[current].src}
          alt={aboutSliderImages[current].alt}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full h-80 md:h-96 object-cover brightness-110"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/30 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <p className="font-heading font-semibold text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          Over 47,758 Lives Impacted
        </p>
        <p className="text-white/90 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          Across Ghana and West Africa
        </p>
      </div>
      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Previous image"
      >
        <ChevronLeft className="h-4 w-4 text-white" />
      </button>
      <button
        onClick={next}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Next image"
      >
        <ChevronRight className="h-4 w-4 text-white" />
      </button>
      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {aboutSliderImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`rounded-full transition-all duration-300 ${
              current === index
                ? 'w-6 h-2 bg-[#D4AF37]'
                : 'w-2 h-2 bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

function GallerySlider() {
  const [current, setCurrent] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, galleryImages.length - itemsPerView);

  const next = useCallback(() => {
    setCurrent((prev) => (prev >= maxIndex ? 0 : prev + 1));
  }, [maxIndex]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev <= 0 ? maxIndex : prev - 1));
  }, [maxIndex]);

  useEffect(() => {
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [next]);

  return (
    <div className="relative">
      {/* Main slider */}
      <div className="overflow-hidden rounded-2xl">
        <motion.div
          className="flex gap-4"
          animate={{ x: `-${current * (100 / itemsPerView + 1.2)}%` }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
        >
          {galleryImages.map((image, index) => (
            <div
              key={image.src}
              className="flex-shrink-0"
              style={{ width: `calc(${100 / itemsPerView}% - 12px)` }}
            >
              <div className="group relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                <img
                  src={image.src}
                  alt={image.caption}
                  className="w-full h-full object-cover brightness-105 group-hover:scale-110 group-hover:brightness-110 transition-all duration-700"
                />
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-2">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(Math.min(index, maxIndex))}
              className={`rounded-full transition-all duration-300 ${
                current === index
                  ? 'w-6 h-2.5 bg-[#D4AF37]'
                  : 'w-2.5 h-2.5 bg-[#0B3C5D]/20 hover:bg-[#0B3C5D]/40'
              }`}
              aria-label={`Go to gallery image ${index + 1}`}
            />
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prev}
            className="w-10 h-10 rounded-full border-2 border-[#0B3C5D]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all"
            aria-label="Previous gallery images"
          >
            <ChevronLeft className="h-5 w-5 text-[#0B3C5D]" />
          </button>
          <button
            onClick={next}
            className="w-10 h-10 rounded-full border-2 border-[#0B3C5D]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all"
            aria-label="Next gallery images"
          >
            <ChevronRight className="h-5 w-5 text-[#0B3C5D]" />
          </button>
        </div>
      </div>

      {/* Mobile: single image view */}
      <div className="md:hidden mt-4">
        <div className="flex gap-2 justify-center">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrent(index)}
              className={`rounded-full transition-all duration-300 ${
                current === index
                  ? 'w-6 h-2 bg-[#D4AF37]'
                  : 'w-2 h-2 bg-[#0B3C5D]/20'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function HomePage() {
  const { navigateTo } = usePage();
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [newsLoading, setNewsLoading] = useState(true);

  useEffect(() => {
    fetch('/api/news')
      .then((res) => res.json())
      .then((data) => {
        if (data.news && data.news.length > 0) {
          setNewsItems(data.news);
        }
        setNewsLoading(false);
      })
      .catch(() => {
        setNewsLoading(false);
      });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <HeroSection />

      {/* Stats Counter */}
      <StatsCounter />

      {/* About Preview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                Who We Are
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-6">
                Building Peace,{' '}
                <span className="text-[#D4AF37]">Transforming Lives</span>
              </h2>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                Duamenefa Foundation is a Ghana-based Non-Governmental Organization (NGO)
                with a membership of over 47,758 as of July 2025, committed to promoting
                peace and reconciliation. The name &ldquo;Duamenefa&rdquo; means &ldquo;Let Us Co-Exist
                in Peace&rdquo; in the Ewe language — a powerful reminder of our core mission.
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-6">
                Through radio intervention programs on Fafaa 100.3 FM, Justice FM 98.5,
                Swiss FM 93.7, and Messiah TV, community mediation, advocacy campaigns,
                and vocational training, we have resolved over 610 spiritual and diabolical
                conflicts and transformed thousands of lives across 550 communities.
              </p>
              <Button
                onClick={() => navigateTo('about')}
                className="bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold"
              >
                Learn More About Us
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <AboutImageSlider />
              {/* Floating stat card */}
              <div className="absolute -bottom-6 -right-4 md:-right-6 bg-[#D4AF37] text-[#0B3C5D] rounded-xl p-4 shadow-lg z-10">
                <p className="font-heading font-bold text-2xl">610+</p>
                <p className="text-xs font-medium">Conflicts Resolved</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Causes */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              What We Do
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Our Featured <span className="text-[#D4AF37]">Causes</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              Every cause we champion brings us closer to a world where peace,
              justice, and human dignity prevail.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCauses.map((cause, index) => (
              <motion.div
                key={cause.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300 border-0 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={cause.image}
                      alt={cause.title}
                      className="w-full h-full object-cover brightness-105 group-hover:scale-110 group-hover:brightness-110 transition-all duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <div className={`${cause.color} text-white p-2 rounded-lg`}>
                        {cause.icon}
                      </div>
                    </div>
                  </div>
                  <CardContent className="p-5">
                    <h3 className="font-heading font-semibold text-lg text-[#0B3C5D] mb-2">
                      {cause.title}
                    </h3>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed mb-4">
                      {cause.description}
                    </p>
                    <button
                      onClick={() => navigateTo('about')}
                      className="text-[#D4AF37] font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all"
                    >
                      Learn More <ArrowRight className="h-3 w-3" />
                    </button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Voices of Peace */}
      <VoicesOfPeace />

      {/* Testimonials */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#4C9A2A]/10 text-[#4C9A2A] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Testimonials
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Stories of <span className="text-[#D4AF37]">Transformation</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              Real stories from real people whose lives have been touched by our work.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="text-[#D4AF37] text-3xl font-heading mb-3">
                      &ldquo;
                    </div>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed mb-6">
                      {testimonial.quote}
                    </p>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10 border-2 border-[#D4AF37]">
                        <AvatarImage src="" alt={testimonial.name} />
                        <AvatarFallback className="bg-[#0B3C5D] text-white text-xs font-heading">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-heading font-semibold text-sm text-[#0B3C5D]">
                          {testimonial.name}
                        </p>
                        <p className="text-xs text-[#6B4F3A]/70">
                          {testimonial.role}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Slider */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Camera className="h-4 w-4 inline mr-1" />
              Gallery
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Moments of <span className="text-[#D4AF37]">Impact</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              glimpses from our peacebuilding, advocacy, and community transformation programs across Ghana.
            </p>
          </motion.div>

          <GallerySlider />
        </div>
      </section>

      {/* Recent News */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="flex items-center justify-between mb-12" {...fadeInUp}>
            <div>
              <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                Latest Updates
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D]">
                Recent <span className="text-[#D4AF37]">News</span>
              </h2>
            </div>
            <a
              href="https://fafaafmonline.com/category/duamenefa-news/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:flex items-center gap-2 border border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white font-medium px-4 py-2 rounded-md transition-colors text-sm"
            >
              More News
              <ArrowRight className="h-4 w-4" />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsLoading ? (
              // Loading skeleton
              Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <Card className="h-full border-0 shadow-md overflow-hidden">
                    <div className="h-48 bg-gray-200" />
                    <CardContent className="p-5">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="h-5 w-20 bg-gray-200 rounded" />
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                      </div>
                      <div className="h-5 bg-gray-200 rounded mb-2" />
                      <div className="h-4 bg-gray-200 rounded mb-1" />
                      <div className="h-4 bg-gray-200 rounded w-3/4" />
                    </CardContent>
                  </Card>
                </div>
              ))
            ) : newsItems.length > 0 ? (
              newsItems.map((item, index) => (
                <motion.div
                  key={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="block h-full">
                    <Card className="group h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer overflow-hidden">
                      <div className="relative h-48 bg-[#0B3C5D]/5 overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover brightness-105 group-hover:scale-105 group-hover:brightness-110 transition-all duration-500"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (target.src !== '/radio-broadcast.jpg') {
                              target.src = '/radio-broadcast.jpg';
                            }
                          }}
                        />
                      </div>
                      <CardContent className="p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <Badge
                            variant="secondary"
                            className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs"
                          >
                            {item.category}
                          </Badge>
                          <span className="text-xs text-[#6B4F3A]/60 flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {item.date}
                          </span>
                        </div>
                        <h3 className="font-heading font-semibold text-[#0B3C5D] mb-2 line-clamp-2">
                          {item.title}
                        </h3>
                        <p className="text-[#6B4F3A] text-sm leading-relaxed line-clamp-3">
                          {item.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </a>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-[#6B4F3A]/60">Unable to load news at this time. Please check back later.</p>
                <a
                  href="https://fafaafmonline.com/category/duamenefa-news/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[#D4AF37] hover:underline mt-2 font-medium"
                >
                  Visit Fafaa FM News <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            )}
          </div>

          <div className="mt-8 text-center md:hidden">
            <a
              href="https://fafaafmonline.com/category/duamenefa-news/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white font-medium px-6 py-2 rounded-md transition-colors text-sm"
            >
              More News
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* Live Stream Section */}
      <section className="py-16 md:py-24 bg-[#0B3C5D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                📡 Live Broadcasts
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
                Watch & Listen <span className="text-[#D4AF37]">Live</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Tune in to our live radio and television programs broadcasting across
                Ghana. Our programs reach millions with messages of peace,
                reconciliation, and community empowerment.
              </p>
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex items-center gap-3 text-white/90 mb-1.5">
                    <img
                      src="/fafaa-fm-logo.jpg"
                      alt="Fafaa 100.3 FM Logo"
                      className="h-8 w-8 rounded-full object-cover ring-2 ring-[#D4AF37]/50"
                    />
                    <span className="font-medium">Fafaa 100.3 FM</span>
                  </div>
                  <div className="ml-11 space-y-0.5 text-white/70 text-sm">
                    <p>— Sundays 7-10 PM</p>
                    <p>— Tuesdays 11 AM-2 PM</p>
                    <p>— Thursdays 11 AM-2 PM</p>
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-3 text-white/90 mb-1.5">
                    <Radio className="h-6 w-6 text-[#D4AF37]" />
                    <span className="font-medium">Messiah TV Amos 17</span>
                  </div>
                  <div className="ml-9 space-y-0.5 text-white/70 text-sm">
                    <p>— Sundays 7-10 PM</p>
                    <p>— Tuesdays 11 AM-2 PM</p>
                    <p>— Thursdays 11 AM-2 PM</p>
                  </div>
                </div>
              </div>
              <a
                href="https://fafaafm.radiostream321.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold px-4 py-2 rounded-md transition-colors"
              >
                <Radio className="h-4 w-4" />
                Online Radio
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-white/5 rounded-2xl p-4 md:p-6 border border-white/10">
                {/* Facebook Page Embed */}
                <div className="relative rounded-xl overflow-hidden mb-4">
                  <iframe
                    src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FFafaa100.3fm&tabs=timeline&width=500&height=450&small_header=true&adapt_container_width=true&hide_cover=false&show_facepile=false"
                    width="500"
                    height="450"
                    style={{ border: 'none', overflow: 'hidden', width: '100%' }}
                    scrolling="no"
                    frameBorder="0"
                    allowFullScreen={true}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    title="Fafaa 100.3 FM Facebook Page"
                  />
                </div>

                {/* Audio Player */}
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <a
                      href="https://fafaafm.radiostream321.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0 cursor-pointer hover:bg-[#c9a22e] transition-colors"
                    >
                      <Play className="h-5 w-5 text-[#0B3C5D] ml-0.5" />
                    </a>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Fafaa 100.3 FM Live</p>
                      <p className="text-xs text-white/50">Click to listen live</p>
                    </div>
                    <div className="flex items-center gap-1.5 bg-red-500 px-2 py-1 rounded text-xs font-bold">
                      <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                      LIVE
                    </div>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-1.5">
                    <div className="bg-[#D4AF37] h-1.5 rounded-full w-1/3 animate-pulse" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0B3C5D] to-[#0a2e47] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-[#D4AF37]" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-2 border-[#D4AF37]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full border border-[#D4AF37]" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              ✊ Join the Movement
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
              Together, We Can Build a{' '}
              <span className="text-[#D4AF37]">Peaceful World</span>
            </h2>
            <p className="text-white/70 text-lg mb-10 max-w-2xl mx-auto">
              Every act of kindness, every donation, every hour of volunteer work
              brings us closer to a society where all people co-exist in peace.
              Join the Duamenefa movement today.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigateTo('about')}
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold px-8 py-6 text-lg"
              >
                <HandHeart className="h-5 w-5 mr-2" />
                Support Our Mission
              </Button>
              <Button
                onClick={() => navigateTo('about')}
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg"
              >
                <Users className="h-5 w-5 mr-2" />
                Our Operations
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <NewsletterForm />
        </div>
      </section>
    </div>
  );
}
