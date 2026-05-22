'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { usePage } from '@/context/PageContext';
import {
  Heart,
  ShieldCheck,
  Unlock,
  GraduationCap,
  Wrench,
  MessageCircle,
  Sparkles,
  Users,
  ArrowRight,
  CheckCircle,
  HandHeart,
} from 'lucide-react';

interface Program {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  stats: { label: string; value: string }[];
  highlights: string[];
  image: string;
  color: string;
}

const programs: Program[] = [
  {
    id: 'peace',
    icon: <Heart className="h-6 w-6" />,
    title: 'Peace & Reconciliation',
    description:
      'Our flagship program focuses on mediating conflicts between communities, families, and individuals. We employ both traditional conflict resolution methods and modern restorative justice approaches to build lasting peace.',
    stats: [
      { label: 'Conflicts Resolved', value: '610+' },
      { label: 'Communities Reached', value: '45+' },
      { label: 'Peace Ambassadors Trained', value: '200+' },
    ],
    highlights: [
      'Community mediation sessions and peace dialogues',
      'Restorative justice circles for victim-offender reconciliation',
      'Peace ambassador training and certification',
      'Inter-community peace treaties and agreements',
      'Post-conflict trauma healing workshops',
    ],
    image: '/reconciliation.jpg',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 'trokosi',
    icon: <Unlock className="h-6 w-6" />,
    title: 'Trokosi Liberation Advocacy',
    description:
      'We are at the forefront of the fight against shrine servitude, advocating for the liberation of individuals held in Trokosi bondage. Our program provides legal support, rehabilitation, and reintegration assistance to victims.',
    stats: [
      { label: 'Individuals Freed', value: '200+' },
      { label: 'Rehabilitation Centers', value: '3' },
      { label: 'Families Reunited', value: '150+' },
    ],
    highlights: [
      'Legal advocacy for the abolition of shrine servitude',
      'Rescue operations and safe housing for liberated individuals',
      'Psychological rehabilitation and trauma counseling',
      'Vocational skills training for economic independence',
      'Community awareness campaigns against the practice',
    ],
    image: '/women-empowerment.jpg',
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 'child-rights',
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Child Rights Advocacy',
    description:
      'We protect children from spiritual manipulation, abuse, and exploitation. Our program ensures every child has access to safety, education, and the opportunity to grow in a nurturing environment free from harm.',
    stats: [
      { label: 'Children Protected', value: '500+' },
      { label: 'Schools Supported', value: '12' },
      { label: 'Awareness Campaigns', value: '30+' },
    ],
    highlights: [
      'Rescue operations for children in abusive situations',
      'Awareness campaigns on children\'s rights and protection',
      'School-based protection programs and monitoring',
      'Counseling and support for affected children',
      'Advocacy for stronger child protection laws',
    ],
    image: '/children-education.jpg',
    color: 'bg-[#6B4F3A]',
  },
  {
    id: 'education',
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Education Support',
    description:
      'We believe education is the key to breaking the cycle of poverty and oppression. Our program provides scholarships, school supplies, and literacy programs to underserved communities.',
    stats: [
      { label: 'Scholarships Awarded', value: '300+' },
      { label: 'School Supplies Distributed', value: '2000+' },
      { label: 'Literacy Program Graduates', value: '450+' },
    ],
    highlights: [
      'Full and partial scholarships for underprivileged students',
      'Distribution of school supplies and learning materials',
      'Adult literacy and numeracy programs',
      'After-school tutoring and mentorship',
      'Community library and reading room initiatives',
    ],
    image: '/children-education.jpg',
    color: 'bg-[#D4AF37]',
  },
  {
    id: 'vocational',
    icon: <Wrench className="h-6 w-6" />,
    title: 'Vocational Training',
    description:
      'Our vocational training program equips liberated individuals, orphans, and vulnerable community members with practical skills for economic independence and self-sufficiency.',
    stats: [
      { label: 'Skills Trained', value: '400+' },
      { label: 'Training Centers', value: '3' },
      { label: 'Graduates Employed', value: '75%' },
    ],
    highlights: [
      'Tailoring and fashion design training',
      'Carpentry and woodworking workshops',
      'ICT and digital skills development',
      'Catering and food processing skills',
      'Business management and entrepreneurship training',
    ],
    image: '/vocational-training.jpg',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 'mediation',
    icon: <MessageCircle className="h-6 w-6" />,
    title: 'Community Mediation',
    description:
      'We facilitate dialogue between conflicting parties using traditional and modern mediation techniques. Our trained mediators help communities find common ground and build sustainable peace agreements.',
    stats: [
      { label: 'Mediation Sessions', value: '500+' },
      { label: 'Mediators Trained', value: '100+' },
      { label: 'Success Rate', value: '92%' },
    ],
    highlights: [
      'Traditional conflict resolution through dialogue',
      'Trained community mediators and facilitators',
      'Land dispute resolution and boundary mediation',
      'Family and domestic conflict mediation',
      'Inter-ethnic and inter-religious dialogue facilitation',
    ],
    image: '/community-outreach.jpg',
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 'spiritual',
    icon: <Sparkles className="h-6 w-6" />,
    title: 'Spiritual Conflict Resolution',
    description:
      'We address the invocation of the wrath of gods, false prophecies, and other spiritual conflicts that divide communities and cause suffering. Our approach combines spiritual counseling with community education.',
    stats: [
      { label: 'Cases Resolved', value: '180+' },
      { label: 'Communities Educated', value: '35+' },
      { label: 'Counselors Trained', value: '50+' },
    ],
    highlights: [
      'Addressing invocation of wrath of gods and its consequences',
      'Debunking false prophecies that cause community division',
      'Spiritual counseling and guidance programs',
      'Community education on spiritual manipulation',
      'Interfaith dialogue and understanding promotion',
    ],
    image: '/reconciliation.jpg',
    color: 'bg-[#6B4F3A]',
  },
  {
    id: 'empowerment',
    icon: <Users className="h-6 w-6" />,
    title: 'Women & Youth Empowerment',
    description:
      'We empower women and youth through leadership training, economic empowerment programs, and advocacy for equal rights and opportunities. Our goal is to create agents of change within communities.',
    stats: [
      { label: 'Women Empowered', value: '600+' },
      { label: 'Youth Leaders Trained', value: '150+' },
      { label: 'Cooperatives Formed', value: '8' },
    ],
    highlights: [
      'Leadership development and capacity building',
      'Economic empowerment through micro-enterprise support',
      'Women\'s cooperative formation and mentorship',
      'Youth mentorship and career guidance programs',
      'Gender equality advocacy and awareness campaigns',
    ],
    image: '/women-empowerment.jpg',
    color: 'bg-[#D4AF37]',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ProgramsPage() {
  const { navigateTo } = usePage();
  const [activeTab, setActiveTab] = useState(programs[0].id);

  return (
    <div className="pt-20 md:pt-28">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl -translate-x-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Our Programs
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Transforming <span className="text-[#D4AF37]">Communities</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Through eight comprehensive programs, we address the root causes of conflict,
            oppression, and poverty to build lasting peace and prosperity.
          </p>
        </div>
      </section>

      {/* Programs Overview Grid */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-heading font-bold text-3xl text-[#0B3C5D] mb-4">
              What We <span className="text-[#D4AF37]">Do</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              Explore our programs and discover how we are making a difference in communities across Ghana.
            </p>
          </motion.div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {programs.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setActiveTab(program.id)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 h-full ${
                    activeTab === program.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-md'
                      : 'border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-sm'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${program.color} text-white flex items-center justify-center mb-3`}
                  >
                    {program.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-[#0B3C5D] text-sm mb-1">
                    {program.title}
                  </h3>
                  <p className="text-[#6B4F3A]/70 text-xs line-clamp-2">
                    {program.description}
                  </p>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Active Program Detail */}
          {programs
            .filter((p) => p.id === activeTab)
            .map((program) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={program.image}
                        alt={program.title}
                        className="w-full h-full object-cover brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/15 to-transparent" />
                    </div>
                    <CardContent className="p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${program.color} text-white flex items-center justify-center`}
                        >
                          {program.icon}
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-[#0B3C5D]">
                          {program.title}
                        </h3>
                      </div>
                      <p className="text-[#6B4F3A] leading-relaxed mb-6">
                        {program.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {program.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="text-center p-3 bg-gray-50 rounded-lg"
                          >
                            <p className="font-heading font-bold text-[#D4AF37] text-lg">
                              {stat.value}
                            </p>
                            <p className="text-[#6B4F3A] text-xs">{stat.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Highlights */}
                      <div className="space-y-2 mb-6">
                        {program.highlights.map((highlight) => (
                          <div
                            key={highlight}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="h-4 w-4 text-[#4C9A2A] shrink-0 mt-0.5" />
                            <span className="text-[#6B4F3A]">{highlight}</span>
                          </div>
                        ))}
                      </div>

                      <Button
                        onClick={() => navigateTo('donate')}
                        className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold"
                      >
                        <HandHeart className="h-4 w-4 mr-2" />
                        Support This Program
                      </Button>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B3C5D] to-[#0a2e47] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h2 className="font-heading font-bold text-3xl mb-4">
              Ready to Make a <span className="text-[#D4AF37]">Difference</span>?
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Your support enables us to continue transforming lives and building peace across communities.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                onClick={() => navigateTo('donate')}
                className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold px-8"
              >
                <HandHeart className="h-4 w-4 mr-2" />
                Donate Now
              </Button>
              <Button
                onClick={() => navigateTo('volunteer')}
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 px-8"
              >
                <Users className="h-4 w-4 mr-2" />
                Volunteer With Us
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
