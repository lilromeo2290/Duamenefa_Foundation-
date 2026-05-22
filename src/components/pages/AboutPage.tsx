'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  Eye,
  Shield,
  Scale,
  HandHeart,
  Diamond,
  Users,
  Radio,
  Quote,
  Award,
  ArrowRight,
  MapPin,
} from 'lucide-react';

const coreValues = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Peace',
    description: 'We believe in the power of dialogue and reconciliation to resolve conflicts and build harmonious communities.',
  },
  {
    icon: <Scale className="h-6 w-6" />,
    title: 'Justice',
    description: 'We advocate for fairness and equal access to justice for all, regardless of social status or background.',
  },
  {
    icon: <HandHeart className="h-6 w-6" />,
    title: 'Compassion',
    description: 'We approach every individual with empathy and kindness, recognizing the inherent dignity in every person.',
  },
  {
    icon: <Diamond className="h-6 w-6" />,
    title: 'Integrity',
    description: 'We uphold transparency and accountability in all our operations, building trust with communities and partners.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Dignity',
    description: 'We are committed to restoring and preserving the dignity of every human being, especially the vulnerable.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Empowerment',
    description: 'We equip individuals and communities with the skills and resources they need to transform their own lives.',
  },
];

const leadershipTeam = [
  {
    name: 'Rev. Dr. Patrick D. Agbesi',
    role: 'Founder & Executive Director',
    bio: 'A visionary leader and peace advocate who founded Duamenefa Foundation through radio intervention programs, reaching millions across Ghana with messages of peace and reconciliation.',
  },
  {
    name: 'Madam Comfort K. Adzotor',
    role: 'Director of Programs',
    bio: 'Oversees all community intervention programs with expertise in conflict resolution and community development, ensuring impactful and sustainable outcomes.',
  },
  {
    name: 'Mr. Emmanuel K. Doe',
    role: 'Head of Advocacy',
    bio: 'Leads the Trokosi liberation and child rights advocacy campaigns, working tirelessly to protect the vulnerable and marginalized in society.',
  },
  {
    name: 'Mrs. Grace A. Mensah',
    role: 'Director of Operations',
    bio: 'Manages the foundation\'s day-to-day operations and partnership development, ensuring efficient delivery of programs and services.',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function AboutPage() {
  return (
    <div className="pt-20 md:pt-28">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#4C9A2A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            About Us
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Our <span className="text-[#D4AF37]">Story</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Discover how Duamenefa Foundation has been transforming communities through
            peace, reconciliation, and human dignity since its inception.
          </p>
        </div>
      </section>

      {/* History */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                Our History
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-6">
                From Radio Waves to <span className="text-[#D4AF37]">Community Impact</span>
              </h2>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                Duamenefa Foundation was born from a powerful vision — using the airwaves
                to bring peace to divided communities. What began as radio intervention
                programs on local FM stations has grown into a comprehensive peace-building
                organization touching thousands of lives.
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                Our founder started broadcasting peace and reconciliation messages on{' '}
                <strong>Fafaa 100.3 FM</strong>, and the response was overwhelming.
                Communities plagued by conflict found hope through these programs.
                This success led to expansion across multiple stations:
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Radio className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span className="text-[#6B4F3A]"><strong>Fafaa 100.3 FM</strong> — Where it all began</span>
                </div>
                <div className="flex items-center gap-3">
                  <Radio className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span className="text-[#6B4F3A]"><strong>Justice FM 98.5 Tamale</strong> — Reaching Northern Ghana</span>
                </div>
                <div className="flex items-center gap-3">
                  <Radio className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span className="text-[#6B4F3A]"><strong>Swiss FM 93.7 Ho</strong> — Volta Region coverage</span>
                </div>
                <div className="flex items-center gap-3">
                  <Radio className="h-4 w-4 text-[#D4AF37] shrink-0" />
                  <span className="text-[#6B4F3A]"><strong>Messiah TV – Amos 17</strong> — Television broadcasting</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="/duamenafa-176.jpg"
                  alt="Duamenefa Foundation radio broadcast"
                  className="w-full h-80 md:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/50 to-transparent" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div {...fadeInUp}>
              <Card className="h-full border-0 shadow-lg bg-[#0B3C5D] text-white overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <div className="w-14 h-14 rounded-xl bg-[#D4AF37]/20 flex items-center justify-center mb-6">
                    <Eye className="h-7 w-7 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4 text-[#D4AF37]">
                    Our Mission
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg">
                    &ldquo;To promote peace, reconciliation, and human dignity through
                    community intervention, advocacy, and spiritual conflict resolution.&rdquo;
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="h-full border-0 shadow-lg overflow-hidden">
                <CardContent className="p-8 md:p-10">
                  <div className="w-14 h-14 rounded-xl bg-[#4C9A2A]/10 flex items-center justify-center mb-6">
                    <Award className="h-7 w-7 text-[#4C9A2A]" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4 text-[#0B3C5D]">
                    Our Vision
                  </h3>
                  <p className="text-[#6B4F3A] leading-relaxed text-lg">
                    &ldquo;A society where all people co-exist in peace, free from
                    spiritual oppression, human servitude, and injustice.&rdquo;
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              What Guides Us
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Our Core <span className="text-[#D4AF37]">Values</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] group-hover:text-[#0B3C5D] transition-colors duration-300">
                      {value.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-[#0B3C5D] mb-2">
                      {value.title}
                    </h3>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder's Message */}
      <section className="py-16 md:py-24 bg-[#0B3C5D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <div className="max-w-4xl mx-auto text-center">
              <Quote className="h-12 w-12 text-[#D4AF37] mx-auto mb-6" />
              <blockquote className="font-heading text-xl md:text-2xl leading-relaxed mb-8 italic text-white/90">
                &ldquo;When I started broadcasting peace messages on Fafaa FM, I never
                imagined it would grow into a movement that transforms thousands of lives.
                But God had a bigger plan. Duamenefa is not just an organization — it is a
                calling. A calling to bring light where there is darkness, peace where there
                is conflict, and hope where there is despair. Together, we shall continue to
                co-exist in peace.&rdquo;
              </blockquote>
              <Separator className="bg-white/20 max-w-xs mx-auto mb-6" />
              <div>
                <p className="font-heading font-bold text-[#D4AF37] text-lg">
                  Rev. Dr. Patrick D. Agbesi
                </p>
                <p className="text-white/60 text-sm">Founder & Executive Director</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Our Team
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Leadership <span className="text-[#D4AF37]">Team</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              Dedicated professionals committed to advancing peace, justice, and human dignity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 text-center">
                  <CardContent className="p-6">
                    <div className="w-20 h-20 rounded-full bg-[#0B3C5D] mx-auto mb-4 flex items-center justify-center">
                      <Users className="h-8 w-8 text-[#D4AF37]" />
                    </div>
                    <h3 className="font-heading font-semibold text-[#0B3C5D] mb-1">
                      {member.name}
                    </h3>
                    <p className="text-[#D4AF37] text-sm font-medium mb-3">
                      {member.role}
                    </p>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h3 className="font-heading font-semibold text-xl text-[#0B3C5D] mb-8">
              Our <span className="text-[#D4AF37]">Partners</span> & Sponsors
            </h3>
            <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
              {['Fafaa 100.3 FM', 'Justice FM 98.5', 'Swiss FM 93.7', 'Messiah TV', 'Amos 17'].map(
                (partner) => (
                  <div
                    key={partner}
                    className="w-32 h-16 rounded-xl bg-white shadow-sm flex items-center justify-center text-[#0B3C5D]/40 font-heading font-medium text-xs border border-gray-100"
                  >
                    {partner}
                  </div>
                )
              )}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
