'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import {
  Heart,
  Stethoscope,
  GraduationCap,
  Scale,
  MessageCircle,
  Monitor,
  Megaphone,
  Languages,
  ShieldCheck,
  Child,
  Users,
  Radio,
  Building,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Briefcase,
} from 'lucide-react';

const skills = [
  { id: 'medical', label: 'Medical / Healthcare', icon: <Stethoscope className="h-4 w-4" /> },
  { id: 'education', label: 'Education / Teaching', icon: <GraduationCap className="h-4 w-4" /> },
  { id: 'legal', label: 'Legal / Advocacy', icon: <Scale className="h-4 w-4" /> },
  { id: 'counseling', label: 'Counseling / Social Work', icon: <MessageCircle className="h-4 w-4" /> },
  { id: 'it', label: 'IT / Technology', icon: <Monitor className="h-4 w-4" /> },
  { id: 'media', label: 'Media / Communications', icon: <Radio className="h-4 w-4" /> },
  { id: 'fundraising', label: 'Fundraising / Events', icon: <Megaphone className="h-4 w-4" /> },
  { id: 'translation', label: 'Translation / Languages', icon: <Languages className="h-4 w-4" /> },
];

const interestAreas = [
  { id: 'peace', label: 'Peace Building', icon: <ShieldCheck className="h-4 w-4" /> },
  { id: 'child', label: 'Child Advocacy', icon: <Child className="h-4 w-4" /> },
  { id: 'education', label: 'Education', icon: <GraduationCap className="h-4 w-4" /> },
  { id: 'outreach', label: 'Community Outreach', icon: <Users className="h-4 w-4" /> },
  { id: 'media', label: 'Media & Broadcasting', icon: <Radio className="h-4 w-4" /> },
  { id: 'admin', label: 'Administration', icon: <Building className="h-4 w-4" /> },
];

const upcomingEvents = [
  { title: 'Community Peace Dialogue', date: 'Jan 15, 2025', location: 'Ho, Volta Region', time: '10:00 AM' },
  { title: 'Volunteer Orientation', date: 'Jan 22, 2025', location: 'Duamenefa Office', time: '9:00 AM' },
  { title: 'Child Rights Workshop', date: 'Feb 5, 2025', location: 'Hohoe, Volta Region', time: '2:00 PM' },
  { title: 'Vocational Training Graduation', date: 'Feb 20, 2025', location: 'Training Center, Ho', time: '10:00 AM' },
];

const internships = [
  {
    title: 'Peace & Conflict Resolution Intern',
    duration: '3-6 months',
    description: 'Assist in community mediation sessions, research conflict resolution methods, and support peace-building initiatives across the Volta Region.',
    requirements: ['Background in Peace Studies, Sociology, or related field', 'Strong communication skills', 'Willingness to travel to rural communities'],
  },
  {
    title: 'Child Advocacy & Protection Intern',
    duration: '3-6 months',
    description: 'Support child rights advocacy campaigns, assist in case documentation, and help develop educational materials for child protection awareness.',
    requirements: ['Background in Social Work, Psychology, or Child Development', 'Compassionate and detail-oriented', 'Experience with children is a plus'],
  },
  {
    title: 'Media & Communications Intern',
    duration: '3-6 months',
    description: 'Help produce content for radio programs, manage social media channels, and create compelling stories about our impact and beneficiaries.',
    requirements: ['Background in Journalism, Communications, or Media', 'Video editing and content creation skills', 'Passion for storytelling and social impact'],
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function VolunteerPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="pt-20 md:pt-28">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-[#4C9A2A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#4C9A2A]/20 text-[#4C9A2A] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            🤝 Join Our Team
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Become a <span className="text-[#D4AF37]">Volunteer</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Your time, skills, and passion can create lasting change. Join our team of
            dedicated volunteers and help us build a more peaceful and just world.
          </p>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Form */}
            <div className="lg:col-span-2">
              <motion.div {...fadeInUp}>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-6">
                      Volunteer Registration
                    </h2>

                    {/* Personal Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                          Full Name *
                        </Label>
                        <Input placeholder="Your full name" className="border-gray-200 focus:border-[#D4AF37]" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                          Email Address *
                        </Label>
                        <Input type="email" placeholder="Your email" className="border-gray-200 focus:border-[#D4AF37]" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                          Phone Number *
                        </Label>
                        <Input type="tel" placeholder="+233 XX XXX XXXX" className="border-gray-200 focus:border-[#D4AF37]" />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                          Location
                        </Label>
                        <Input placeholder="City, Region" className="border-gray-200 focus:border-[#D4AF37]" />
                      </div>
                    </div>

                    {/* Skills */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-[#0B3C5D] mb-3 block">
                        Your Skills (Select all that apply)
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {skills.map((skill) => (
                          <button
                            key={skill.id}
                            onClick={() => toggleSkill(skill.id)}
                            className={`flex items-center gap-2 p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
                              selectedSkills.includes(skill.id)
                                ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0B3C5D]'
                                : 'border-gray-200 text-[#6B4F3A] hover:border-[#D4AF37]/50'
                            }`}
                          >
                            {skill.icon}
                            <span className="text-xs">{skill.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Areas of Interest */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-[#0B3C5D] mb-3 block">
                        Areas of Interest
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {interestAreas.map((area) => (
                          <button
                            key={area.id}
                            onClick={() => toggleInterest(area.id)}
                            className={`flex items-center gap-2 p-3 rounded-lg border-2 text-sm transition-all duration-200 ${
                              selectedInterests.includes(area.id)
                                ? 'border-[#4C9A2A] bg-[#4C9A2A]/10 text-[#0B3C5D]'
                                : 'border-gray-200 text-[#6B4F3A] hover:border-[#4C9A2A]/50'
                            }`}
                          >
                            {area.icon}
                            <span className="text-xs">{area.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Availability */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-[#0B3C5D] mb-3 block">
                        Availability
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Full-Time', 'Part-Time', 'Weekends', 'Remote'].map((option) => (
                          <div key={option} className="flex items-center gap-2">
                            <Checkbox id={option} />
                            <Label htmlFor={option} className="text-sm text-[#6B4F3A] cursor-pointer">
                              {option}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div className="mb-6">
                      <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                        Why do you want to volunteer with us?
                      </Label>
                      <Textarea
                        placeholder="Tell us about your motivation and what you hope to contribute..."
                        className="border-gray-200 focus:border-[#D4AF37] min-h-[100px]"
                      />
                    </div>

                    <Button className="w-full bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold py-6">
                      <Heart className="h-5 w-5 mr-2" />
                      Submit Volunteer Application
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg text-[#0B3C5D] mb-4 flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-[#D4AF37]" />
                      Upcoming Events
                    </h3>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div key={event.title} className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-heading font-semibold text-[#0B3C5D] text-sm mb-1">
                            {event.title}
                          </h4>
                          <div className="space-y-1 text-xs text-[#6B4F3A]">
                            <p className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" /> {event.date}
                            </p>
                            <p className="flex items-center gap-1">
                              <Clock className="h-3 w-3" /> {event.time}
                            </p>
                            <p className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" /> {event.location}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Quick Stats */}
              <Card className="border-0 shadow-lg bg-[#0B3C5D] text-white">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-lg mb-4 text-[#D4AF37]">
                    Why Volunteer With Us?
                  </h3>
                  <div className="space-y-3">
                    {[
                      'Make a direct impact on communities',
                      'Gain valuable field experience',
                      'Work alongside passionate professionals',
                      'Flexible scheduling options',
                      'Certificate of recognition provided',
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                        <Badge className="bg-[#D4AF37] text-[#0B3C5D] text-[10px] p-1 shrink-0">
                          ✓
                        </Badge>
                        {item}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Internship Opportunities */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Career Opportunities
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Internship <span className="text-[#D4AF37]">Opportunities</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {internships.map((internship, index) => (
              <motion.div
                key={internship.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      <Briefcase className="h-5 w-5 text-[#D4AF37]" />
                      <Badge variant="secondary" className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs">
                        {internship.duration}
                      </Badge>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-[#0B3C5D] mb-3">
                      {internship.title}
                    </h3>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed mb-4">
                      {internship.description}
                    </p>
                    <div className="space-y-2 mb-4">
                      <p className="text-xs font-semibold text-[#0B3C5D]">Requirements:</p>
                      {internship.requirements.map((req) => (
                        <div key={req} className="flex items-start gap-2 text-xs text-[#6B4F3A]">
                          <ArrowRight className="h-3 w-3 mt-0.5 text-[#D4AF37] shrink-0" />
                          {req}
                        </div>
                      ))}
                    </div>
                    <Button className="w-full bg-[#0B3C5D] hover:bg-[#0a2e47] text-white text-sm">
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
