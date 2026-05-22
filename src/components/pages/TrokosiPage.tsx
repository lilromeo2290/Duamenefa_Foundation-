'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Quote, Users, Shield, Heart } from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function TrokosiPage() {
  return (
    <div className="pt-20 md:pt-28 min-h-screen">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-[#4C9A2A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Activities
          </span>
          <h1 className="font-heading font-bold text-3xl md:text-5xl mb-4 leading-tight">
            Duamenefa Foundation Intervention for Liberations of Human Beings in Servitude to the Gods
          </h1>
          <p className="text-white/70 max-w-3xl mx-auto text-sm md:text-base">
            &ldquo;Trokosi System&rdquo; — A direct affront to the 1992 Constitution of the Republic of Ghana
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Introduction */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="max-w-4xl mx-auto">
              <p className="text-[#6B4F3A] text-base md:text-lg leading-relaxed mb-6">
                The Executive President of the Duamenefa Foundation and CEO of Fafaa 100.3 FM, Dzodze, Mr. Emmanuel Ketaman Evortepe, also known as Togbi Duamenefa I, through the intervention mechanisms of the Foundation in collaboration with lawful agencies are making efforts to liberate the Nutakor family of Nogokpo and other deity practitioners of the Volta Region from offering of human beings in servitude to the gods, (Trokosi system) a direct affront to the 1992 constitution of the Republic of Ghana.
              </p>
            </div>
          </motion.div>

          {/* Two-column with images */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">
            {/* Image 1 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src="/trokosi-help.jpg"
                    alt="Trokosi who came for help"
                    className="w-full h-72 md:h-80 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B3C5D]/90 to-transparent p-4">
                    <p className="text-white text-sm font-medium">Trokosi who came for help</p>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Image 2 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg overflow-hidden">
                <div className="relative">
                  <img
                    src="/freed-dressmaker.jpg"
                    alt="Freed and graduated as a dressmaker"
                    className="w-full h-72 md:h-80 object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#0B3C5D]/90 to-transparent p-4">
                    <p className="text-white text-sm font-medium">Freed and graduated as a dressmaker</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          {/* The Petition Section */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#0B3C5D]">
                  The Petition and Investigation
                </h2>
              </div>
              <p className="text-[#6B4F3A] text-base leading-relaxed mb-6">
                It would be recalled in a disturbing petition filed by the Nutakor family to the Duamenefa Foundation for investigation and intervention, dated 24th March, 2025. In the said petition, the Nutakor family is alleging that the Tormife Shrine, located at Anloga in the Volta region of the Republic of Ghana is demanding human being in servitude to the gods, because a member of the Nutakor family, during a quarrel, allegedly invoked the wrath of the gods against the other, resulting in an incessant death of two members of the family. The Foundation has since launched an investigation for intervention.
              </p>
            </div>
          </motion.div>

          {/* Investigation Findings */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#0B3C5D]/10 flex items-center justify-center">
                  <Users className="h-5 w-5 text-[#0B3C5D]" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#0B3C5D]">
                  Investigation Findings
                </h2>
              </div>
              <p className="text-[#6B4F3A] text-base leading-relaxed mb-6">
                During the course of investigations and in a bid to shed more light on the issue, Mr. Patrick Dunyo, Director of the Center for National Culture, Southern Volta and his team had a meeting with the stakeholders of the shrine in this regard. He disclosed during an interview on Fafaa FM that, Mr. Xornuvia Legbavi, the priest of the shrine denied the allegations.
              </p>
              <p className="text-[#6B4F3A] text-base leading-relaxed">
                According to Mr. Dunyo, the shrine is willing to cooperate with the traditional ruler and the Duamenefa Foundation to resolve the issue amicably.
              </p>
            </div>
          </motion.div>

          {/* Foundation's Collaborative Response */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#4C9A2A]/10 flex items-center justify-center">
                  <Heart className="h-5 w-5 text-[#4C9A2A]" />
                </div>
                <h2 className="font-heading font-bold text-2xl text-[#0B3C5D]">
                  Collaborative Intervention
                </h2>
              </div>
              <p className="text-[#6B4F3A] text-base leading-relaxed mb-6">
                The Duamenefa Foundation, in collaborations with the center for national culture and the traditional ruler, would take immediate steps to intervene and save families from allegations of dehumanizing traditional cultural practices and beliefs.
              </p>
            </div>
          </motion.div>

          {/* The Practice - Quote Block */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="max-w-4xl mx-auto">
              <Card className="border-l-4 border-l-[#D4AF37] border-0 shadow-lg bg-[#0B3C5D]/5">
                <CardContent className="p-6 md:p-8">
                  <Quote className="h-8 w-8 text-[#D4AF37]/40 mb-4" />
                  <h3 className="font-heading font-bold text-xl text-[#0B3C5D] mb-4">
                    The Trokosi Practice
                  </h3>
                  <p className="text-[#6B4F3A] text-base leading-relaxed mb-4">
                    The offer of human beings in servitude to the gods has been an age-long practice in most parts of the Volta region of Ghana.
                  </p>
                  <p className="text-[#6B4F3A] text-base leading-relaxed">
                    The practice is enshrined in the belief system that when someone commits an infraction against the gods, a young virgin girl from the family of the perpetrator must be presented to the shrine in servitude to the gods all the days of her life.
                  </p>
                </CardContent>
              </Card>
            </div>
          </motion.div>

          {/* Previous Success */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-4">
                A Record of Success
              </h2>
              <p className="text-[#6B4F3A] text-base leading-relaxed mb-6">
                The Duamenefa Foundation, in collaboration with lawful agencies has intervened and succeeded in resolving one of such hitherto antagonistic spiritual demands by the Nogokpo shrine located in the Ketu South of the Volta Region and the practice was curtailed.
              </p>
            </div>
          </motion.div>

          {/* Foundation Stats & Commitment */}
          <motion.div {...fadeInUp} className="mb-16">
            <div className="max-w-4xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <p className="font-heading font-bold text-3xl text-[#D4AF37]">48,000+</p>
                    <p className="text-[#6B4F3A] text-sm mt-1">Volunteers</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <p className="font-heading font-bold text-3xl text-[#0B3C5D]">Volta Region</p>
                    <p className="text-[#6B4F3A] text-sm mt-1">Community Coverage</p>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg text-center">
                  <CardContent className="p-6">
                    <p className="font-heading font-bold text-3xl text-[#4C9A2A]">610+</p>
                    <p className="text-[#6B4F3A] text-sm mt-1">Conflicts Resolved</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </motion.div>

          {/* Closing Statement */}
          <motion.div {...fadeInUp}>
            <div className="max-w-4xl mx-auto">
              <p className="text-[#6B4F3A] text-base leading-relaxed mb-6">
                The Duamenefa Foundation is a movement of over 48,000 volunteers located in the various communities of the Volta Region. The core mandate of its members is to promote peaceful coexistence of people in the various communities.
              </p>
              <p className="text-[#6B4F3A] text-base leading-relaxed mb-8">
                Mr. Ketaman Evortepe has reiterated the resolve of the Foundation to educate the practitioners of the deities to abide by the provisions of the constitution.
              </p>
              <div className="text-right">
                <p className="text-[#0B3C5D] font-medium text-sm italic">
                  By Hutor Dziwornu, Fafaa Radio
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
