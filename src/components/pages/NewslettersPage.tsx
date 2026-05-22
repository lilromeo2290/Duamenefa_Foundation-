'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Mail,
  Bell,
  Calendar,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Newspaper,
  Clock,
  BookOpen,
  Heart,
  Users,
  ShieldCheck,
  Download,
} from 'lucide-react';

const newsletterEditions = [
  {
    id: 1,
    title: 'Peace & Reconciliation: A Year in Review',
    date: 'December 2024',
    category: 'Annual Review',
    excerpt: 'Reflecting on a remarkable year of peacebuilding across Ghana. Our programs reached over 15,000 new community members, resolved 180 conflicts, and expanded our radio broadcasting network to include two new stations in the Northern Region.',
    highlights: ['47,758 total members reached', '180 new conflicts resolved', '2 new radio stations launched', '3 vocational training centers opened'],
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 2,
    title: 'Trokosi Liberation: Breaking the Chains',
    date: 'October 2024',
    category: 'Advocacy',
    excerpt: 'Our campaign against shrine servitude reached a critical milestone this quarter with the successful liberation and rehabilitation of 45 individuals. This brings our total to over 200 freed individuals since the program began, with comprehensive support systems in place for their reintegration.',
    highlights: ['45 individuals freed this quarter', '3 new rehabilitation programs', 'Community awareness campaigns in 12 villages', 'Legal support for 30 cases'],
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 3,
    title: 'Children at the Heart: Protecting the Vulnerable',
    date: 'August 2024',
    category: 'Child Rights',
    excerpt: 'Our child rights advocacy program continues to make significant strides in protecting children from spiritual manipulation, abuse, and exploitation. Through school-based protection programs and community awareness campaigns, we have safeguarded over 500 children this year alone.',
    highlights: ['500+ children protected', '12 schools enrolled in protection programs', '30+ awareness campaigns conducted', 'New counseling center opened'],
    color: 'bg-[#D4AF37]',
  },
  {
    id: 4,
    title: 'Voices from the Field: Community Stories',
    date: 'June 2024',
    category: 'Stories',
    excerpt: 'In this special edition, we bring you firsthand accounts from the communities we serve. From peace mediators in the Volta Region to vocational training graduates in Ho, these stories illustrate the transformative power of community-driven change and resilience.',
    highlights: ['6 community stories featured', 'Peace mediator interviews', 'Vocational training success stories', 'Photo gallery from the field'],
    color: 'bg-[#6B4F3A]',
  },
  {
    id: 5,
    title: 'Education for All: Building Futures Through Learning',
    date: 'April 2024',
    category: 'Education',
    excerpt: 'Our education support program has awarded over 300 scholarships this year and distributed more than 2,000 sets of school supplies to underserved communities. The adult literacy program graduated 450 participants, many of whom are now pursuing further education or starting small businesses.',
    highlights: ['300+ scholarships awarded', '2,000+ school supply sets distributed', '450 literacy program graduates', '3 community libraries established'],
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 6,
    title: 'Women Rising: Empowerment and Leadership',
    date: 'February 2024',
    category: 'Empowerment',
    excerpt: 'Our women empowerment program has trained 600 women in leadership and economic skills, formed 8 women cooperatives, and supported dozens of micro-enterprises. This edition celebrates the remarkable women who are becoming agents of change in their communities.',
    highlights: ['600+ women trained', '8 cooperatives formed', 'Micro-enterprise support', 'Leadership development workshops'],
    color: 'bg-[#4C9A2A]',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function NewslettersPage() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [currentEdition, setCurrentEdition] = useState(0);

  const nextEdition = () => setCurrentEdition((prev) => (prev + 1) % newsletterEditions.length);
  const prevEdition = () => setCurrentEdition((prev) => (prev - 1 + newsletterEditions.length) % newsletterEditions.length);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribed(true);
    setTimeout(() => { setSubscribed(false); setEmail(''); }, 4000);
  };

  return (
    <div className="pt-20 md:pt-28">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
          <div className="absolute bottom-0 right-0 w-72 h-72 rounded-full bg-[#4C9A2A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Mail className="h-4 w-4 inline mr-1" />
            Stay Informed
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Our <span className="text-[#D4AF37]">Newsletters</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Stay updated on our peacebuilding initiatives, community programs, and success stories.
            Read our latest editions and subscribe to receive future newsletters directly in your inbox.
          </p>
        </div>
      </section>

      {/* Subscribe Banner */}
      <section className="py-10 bg-[#D4AF37]/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6 md:p-8">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className="flex-1 text-center md:text-left">
                    <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                      <Bell className="h-5 w-5 text-[#D4AF37]" />
                      <h3 className="font-heading font-bold text-lg text-[#0B3C5D]">
                        Subscribe to Our Newsletter
                      </h3>
                    </div>
                    <p className="text-[#6B4F3A] text-sm">
                      Get the latest updates on peace-building, advocacy, and community transformation delivered to your inbox.
                    </p>
                  </div>
                  <div className="w-full md:w-auto">
                    {subscribed ? (
                      <div className="flex items-center gap-2 text-[#4C9A2A] font-medium">
                        <CheckCircle className="h-5 w-5" />
                        <span>Thank you for subscribing!</span>
                      </div>
                    ) : (
                      <form onSubmit={handleSubscribe} className="flex gap-2">
                        <Input
                          type="email"
                          required
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="border-gray-200 focus:border-[#D4AF37] min-w-[250px]"
                        />
                        <Button type="submit" className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold shrink-0">
                          <Mail className="h-4 w-4 mr-2" />
                          Subscribe
                        </Button>
                      </form>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Featured Edition Slider */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Featured Edition
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Latest <span className="text-[#D4AF37]">Newsletter</span>
            </h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentEdition}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    {/* Left Sidebar */}
                    <div className={`${newsletterEditions[currentEdition].color} text-white p-8 md:p-10 lg:col-span-2`}>
                      <Badge className="bg-white/20 text-white mb-4">
                        {newsletterEditions[currentEdition].category}
                      </Badge>
                      <h3 className="font-heading font-bold text-2xl mb-3">
                        {newsletterEditions[currentEdition].title}
                      </h3>
                      <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
                        <Calendar className="h-4 w-4" />
                        {newsletterEditions[currentEdition].date}
                      </div>
                      <div className="space-y-3 mb-8">
                        {newsletterEditions[currentEdition].highlights.map((highlight) => (
                          <div key={highlight} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-[#D4AF37] shrink-0 mt-0.5" />
                            <span className="text-white/90 text-sm">{highlight}</span>
                          </div>
                        ))}
                      </div>
                      <Button className="bg-white text-[#0B3C5D] hover:bg-white/90 font-semibold">
                        <Download className="h-4 w-4 mr-2" />
                        Download PDF
                      </Button>
                    </div>

                    {/* Right Content */}
                    <CardContent className="p-8 md:p-10 lg:col-span-3">
                      <Newspaper className="h-8 w-8 text-[#D4AF37] mb-4" />
                      <p className="text-[#6B4F3A] leading-relaxed text-lg mb-6">
                        {newsletterEditions[currentEdition].excerpt}
                      </p>
                      <Separator className="my-6" />
                      <div className="flex items-center justify-between">
                        <p className="text-[#6B4F3A]/60 text-sm">
                          Edition {currentEdition + 1} of {newsletterEditions.length}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={prevEdition}
                            className="w-9 h-9 rounded-full border-2 border-[#0B3C5D]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all"
                          >
                            <ChevronLeft className="h-4 w-4 text-[#0B3C5D]" />
                          </button>
                          <button
                            onClick={nextEdition}
                            className="w-9 h-9 rounded-full border-2 border-[#0B3C5D]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all"
                          >
                            <ChevronRight className="h-4 w-4 text-[#0B3C5D]" />
                          </button>
                        </div>
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>

            {/* Dots */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {newsletterEditions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentEdition(index)}
                  className={`rounded-full transition-all duration-300 ${
                    currentEdition === index
                      ? 'w-8 h-2.5 bg-[#D4AF37]'
                      : 'w-2.5 h-2.5 bg-[#0B3C5D]/20 hover:bg-[#0B3C5D]/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Editions Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Archive
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              All <span className="text-[#D4AF37]">Editions</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              Browse our complete newsletter archive and catch up on any editions you may have missed.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newsletterEditions.map((edition, index) => (
              <motion.div
                key={edition.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className={`${edition.color} text-white text-xs`}>
                        {edition.category}
                      </Badge>
                      <span className="text-xs text-[#6B4F3A]/60 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {edition.date}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-[#0B3C5D] mb-3 group-hover:text-[#D4AF37] transition-colors">
                      {edition.title}
                    </h3>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed line-clamp-3 mb-4">
                      {edition.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-[#D4AF37] font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        Read More <ArrowRight className="h-3 w-3" />
                      </span>
                      <Download className="h-4 w-4 text-[#0B3C5D]/30 group-hover:text-[#D4AF37] transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#0B3C5D] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <Mail className="h-12 w-12 text-[#D4AF37] mx-auto mb-4" />
            <h2 className="font-heading font-bold text-3xl mb-4">
              Never Miss an <span className="text-[#D4AF37]">Update</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Subscribe to our newsletter and stay connected with the latest developments in peacebuilding, advocacy, and community transformation across Ghana.
            </p>
            {!subscribed ? (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <Input
                  type="email"
                  required
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#D4AF37]"
                />
                <Button type="submit" className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold shrink-0 px-8">
                  Subscribe
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-2 text-[#4C9A2A] font-medium">
                <CheckCircle className="h-5 w-5" />
                <span>Thank you for subscribing!</span>
              </div>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
