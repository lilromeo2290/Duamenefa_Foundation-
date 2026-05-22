'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import {
  Mic,
  Radio,
  Camera,
  Video,
  Newspaper,
  Users,
  MapPin,
  Phone,
  Mail,
  Share2,
  ChevronLeft,
  ChevronRight,
  Play,
  Calendar,
  Award,
  Heart,
  ExternalLink,
  Globe,
  Headphones,
} from 'lucide-react';

const reporters = [
  {
    id: 1,
    name: 'Rev. Dr. Patrick D. Agbesi',
    role: 'Lead Broadcaster & Host',
    station: 'Fafaa 100.3 FM',
    bio: 'Founder and executive director of Duamenefa Foundation, Rev. Dr. Agbesi is the voice behind the foundation\'s flagship radio program. With over a decade of broadcasting experience, he reaches millions across Ghana with powerful messages of peace, reconciliation, and community empowerment. His unique approach combines spiritual counseling with practical conflict resolution strategies.',
    specialties: ['Peace Broadcasting', 'Conflict Resolution', 'Spiritual Counseling', 'Community Mobilization'],
    image: '/duamenafa-176.jpg',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 2,
    name: 'Madam Comfort K. Adzotor',
    role: 'Field Reporter & Program Host',
    station: 'Swiss FM 93.7 Ho',
    bio: 'A seasoned field reporter and community mobilizer, Madam Adzotor brings ground-level stories from the heart of Ghanaian communities. Her investigative reporting has uncovered cases of child abuse, shrine servitude, and community conflicts, leading to direct interventions and rescues. She hosts the weekly program "Voices of the Voiceless" on Swiss FM.',
    specialties: ['Investigative Reporting', 'Child Rights', 'Community Outreach', 'Field Documentation'],
    image: '/duamenafa-10.jpg',
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 3,
    name: 'Mr. Emmanuel K. Doe',
    role: 'Advocacy Reporter & Analyst',
    station: 'Justice FM 98.5 Tamale',
    bio: 'Based in Tamale, Mr. Doe leads the foundation\'s reporting from Northern Ghana. His analytical approach to reporting on Trokosi liberation and child rights issues has been instrumental in shaping public policy discussions. He produces the "Justice Hour" program, which examines legal and human rights issues affecting vulnerable communities.',
    specialties: ['Legal Analysis', 'Trokosi Liberation', 'Human Rights', 'Policy Reporting'],
    image: '/duamenafa-196.jpg',
    color: 'bg-[#D4AF37]',
  },
  {
    id: 4,
    name: 'Mrs. Grace A. Mensah',
    role: 'TV Host & Media Coordinator',
    station: 'Messiah TV - Amos 17',
    bio: 'As the face of Duamenefa Foundation on television, Mrs. Mensah coordinates all visual media content and hosts the weekly television program on Messiah TV. Her expertise in visual storytelling and media production has helped the foundation reach audiences who prefer television over radio, expanding our impact significantly.',
    specialties: ['Television Broadcasting', 'Media Production', 'Visual Storytelling', 'Content Strategy'],
    image: '/women-empowerment.jpg',
    color: 'bg-[#6B4F3A]',
  },
  {
    id: 5,
    name: 'Mr. Samuel K. Adjei',
    role: 'Digital Content Reporter',
    station: 'Online & Social Media',
    bio: 'Heading the digital media team, Mr. Adjei produces content for the foundation\'s online platforms and social media channels. He creates engaging video content, manages live streaming, and ensures our message reaches the younger generation through digital platforms. His work has significantly increased our online engagement and global reach.',
    specialties: ['Digital Media', 'Social Media', 'Video Production', 'Live Streaming'],
    image: '/duamenafa-4.jpg',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 6,
    name: 'Miss Patience A. Dzokoto',
    role: 'Community Correspondent',
    station: 'Fafaa 100.3 FM',
    bio: 'The youngest member of the reporting team, Miss Dzokoto serves as a community correspondent, bringing stories from rural and underserved areas. Her fresh perspective and deep connection to local communities make her reporting authentic and impactful. She focuses on women and youth stories, highlighting empowerment and transformation.',
    specialties: ['Community Reporting', 'Youth Stories', 'Women Empowerment', 'Local Coverage'],
    image: '/duamenafa-27.jpg',
    color: 'bg-[#4C9A2A]',
  },
];

const broadcastSchedule = [
  { day: 'Sunday', time: '7:00 PM - 10:00 PM', station: 'Fafaa 100.3 FM', host: 'Rev. Dr. Patrick D. Agbesi', type: 'Radio', live: true },
  { day: 'Tuesday', time: '11:00 AM - 2:00 PM', station: 'Justice FM 98.5', host: 'Mr. Emmanuel K. Doe', type: 'Radio', live: false },
  { day: 'Thursday', time: '11:00 AM - 2:00 PM', station: 'Swiss FM 93.7', host: 'Madam Comfort K. Adzotor', type: 'Radio', live: false },
  { day: 'Saturday', time: '6:00 PM - 8:00 PM', station: 'Messiah TV - Amos 17', host: 'Mrs. Grace A. Mensah', type: 'TV', live: true },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ReportersPage() {
  const [currentReporter, setCurrentReporter] = useState(0);

  const nextReporter = () => setCurrentReporter((prev) => (prev + 1) % reporters.length);
  const prevReporter = () => setCurrentReporter((prev) => (prev - 1 + reporters.length) % reporters.length);

  return (
    <div className="pt-20 md:pt-28">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#4C9A2A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Mic className="h-4 w-4 inline mr-1" />
            Our Team
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Our <span className="text-[#D4AF37]">Reporters</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Meet the dedicated journalists, broadcasters, and media professionals who bring stories of
            peace, justice, and transformation from communities across Ghana to the world.
          </p>
        </div>
      </section>

      {/* Featured Reporter Slider */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Featured
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Meet Our <span className="text-[#D4AF37]">Reporters</span>
            </h2>
          </motion.div>

          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReporter}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image Side */}
                    <div className="relative h-72 lg:h-auto">
                      <img
                        src={reporters[currentReporter].image}
                        alt={reporters[currentReporter].name}
                        className="w-full h-full object-cover brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/30 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <Badge className={`${reporters[currentReporter].color} text-white text-xs`}>
                          {reporters[currentReporter].station}
                        </Badge>
                      </div>
                    </div>

                    {/* Content Side */}
                    <CardContent className="p-8 md:p-10">
                      <h3 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-1">
                        {reporters[currentReporter].name}
                      </h3>
                      <p className="text-[#D4AF37] font-medium mb-4">
                        {reporters[currentReporter].role}
                      </p>
                      <p className="text-[#6B4F3A] leading-relaxed mb-6">
                        {reporters[currentReporter].bio}
                      </p>

                      {/* Specialties */}
                      <div className="mb-6">
                        <p className="text-sm font-medium text-[#0B3C5D] mb-2">Specialties</p>
                        <div className="flex flex-wrap gap-2">
                          {reporters[currentReporter].specialties.map((specialty) => (
                            <Badge key={specialty} variant="secondary" className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      {/* Navigation */}
                      <div className="flex items-center justify-between pt-4 border-t">
                        <p className="text-[#6B4F3A]/60 text-sm">
                          {currentReporter + 1} of {reporters.length}
                        </p>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={prevReporter}
                            className="w-9 h-9 rounded-full border-2 border-[#0B3C5D]/20 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 flex items-center justify-center transition-all"
                          >
                            <ChevronLeft className="h-4 w-4 text-[#0B3C5D]" />
                          </button>
                          <button
                            onClick={nextReporter}
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
              {reporters.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentReporter(index)}
                  className={`rounded-full transition-all duration-300 ${
                    currentReporter === index
                      ? 'w-8 h-2.5 bg-[#D4AF37]'
                      : 'w-2.5 h-2.5 bg-[#0B3C5D]/20 hover:bg-[#0B3C5D]/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* All Reporters Grid */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Our Team
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              All <span className="text-[#D4AF37]">Reporters</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              Our team of dedicated reporters and broadcasters work across radio, television, and digital media to bring stories of peace and transformation to the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reporters.map((reporter, index) => (
              <motion.div
                key={reporter.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 cursor-pointer group" onClick={() => setCurrentReporter(index)}>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37]">
                        <img
                          src={reporter.image}
                          alt={reporter.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-heading font-semibold text-[#0B3C5D] group-hover:text-[#D4AF37] transition-colors">
                          {reporter.name}
                        </h3>
                        <p className="text-[#D4AF37] text-sm">{reporter.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      {reporter.station.includes('FM') ? (
                        <Radio className="h-4 w-4 text-[#0B3C5D]/50" />
                      ) : reporter.station.includes('TV') ? (
                        <Video className="h-4 w-4 text-[#0B3C5D]/50" />
                      ) : (
                        <Globe className="h-4 w-4 text-[#0B3C5D]/50" />
                      )}
                      <span className="text-[#6B4F3A] text-sm">{reporter.station}</span>
                    </div>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed line-clamp-3 mb-4">
                      {reporter.bio}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {reporter.specialties.slice(0, 3).map((specialty) => (
                        <Badge key={specialty} variant="secondary" className="bg-[#0B3C5D]/5 text-[#0B3C5D] text-[10px]">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Broadcast Schedule */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#4C9A2A]/10 text-[#4C9A2A] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Headphones className="h-4 w-4 inline mr-1" />
              Tune In
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Broadcast <span className="text-[#D4AF37]">Schedule</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              Catch our reporters live on air across multiple radio and television stations throughout the week.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {broadcastSchedule.map((schedule, index) => (
              <motion.div
                key={schedule.station}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className={`h-full border-0 shadow-md ${schedule.live ? 'ring-2 ring-red-400' : ''}`}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={schedule.type === 'TV' ? 'bg-purple-600 text-white' : 'bg-[#0B3C5D] text-white'}>
                        {schedule.type === 'TV' ? <Video className="h-3 w-3 mr-1" /> : <Radio className="h-3 w-3 mr-1" />}
                        {schedule.type}
                      </Badge>
                      {schedule.live && (
                        <span className="flex items-center gap-1 text-red-500 text-xs font-bold">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-semibold text-[#0B3C5D] mb-1">
                      {schedule.station}
                    </h3>
                    <p className="text-[#6B4F3A] text-sm mb-3">{schedule.host}</p>
                    <Separator className="my-3" />
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-[#6B4F3A]">
                        <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                        {schedule.day}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-[#6B4F3A]">
                        <Play className="h-3.5 w-3.5 text-[#D4AF37]" />
                        {schedule.time}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Team CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B3C5D] to-[#0a2e47] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <Mic className="h-12 w-12 text-[#D4AF37] mx-auto mb-4" />
            <h2 className="font-heading font-bold text-3xl mb-4">
              Join Our <span className="text-[#D4AF37]">Media Team</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Are you a passionate journalist, broadcaster, or content creator? Join our team and use your voice to make a difference in communities across Ghana.
            </p>
            <p className="text-white/50 text-sm">
              Send your application to <span className="text-[#D4AF37]">media@duamenefa.org</span>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
