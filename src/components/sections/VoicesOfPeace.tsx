'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Play, Pause, ChevronLeft, ChevronRight, Radio, Mic2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const testimonials = [
  {
    quote: "Duamenefa Foundation brought peace to our community when all seemed lost. Their mediation saved lives and restored broken relationships.",
    name: "Madam Adzo",
    role: "Community Elder, Volta Region",
  },
  {
    quote: "Through their radio programs, I learned that peace is possible. The foundation gave me hope when I was at my lowest point.",
    name: "Kofi Mensah",
    role: "Listener & Beneficiary",
  },
  {
    quote: "The vocational training changed my life completely. I am now self-sufficient and can provide for my children. Thank you, Duamenefa!",
    name: "Ama Serwaa",
    role: "Vocational Training Graduate",
  },
];

const radioPrograms = [
  { title: "Peace & Reconciliation Hour", station: "Fafaa 100.3 FM", day: "Sunday", time: "7:00 - 10:00 PM" },
  { title: "Justice & Human Rights", station: "Justice FM 98.5", day: "Tuesday", time: "11:00 AM - 2:00 PM" },
  { title: "Community Dialogue", station: "Swiss FM 93.7", day: "Thursday", time: "11:00 AM - 2:00 PM" },
];

export default function VoicesOfPeace() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };
  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-[#0B3C5D] to-[#072a42] text-white relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[#D4AF37]/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#4C9A2A]/5 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4 border border-[#D4AF37]/30">
            🎙️ Broadcasting Peace
          </span>
          <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
            Voices of <span className="text-[#D4AF37]">Peace</span>
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Through our radio and television broadcasts, we reach millions across Ghana
            with messages of hope, reconciliation, and community transformation.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          {/* Audio Visualization & Player */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10"
          >
            {/* Waveform */}
            <div className="flex items-center justify-center gap-1 mb-6 h-16">
              {Array.from({ length: 24 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying
                      ? 'waveform-bar bg-[#D4AF37]'
                      : 'bg-white/20'
                  }`}
                  style={{
                    height: isPlaying ? undefined : `${8 + Math.random() * 24}px`,
                    animationDelay: `${i * 0.05}s`,
                  }}
                />
              ))}
            </div>

            {/* Player Controls */}
            <div className="flex items-center gap-4 mb-6">
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-12 h-12 rounded-full bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] flex items-center justify-center shrink-0"
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5 ml-0.5" />
                )}
              </Button>
              <div className="flex-1">
                <p className="font-heading font-semibold text-sm">
                  {isPlaying ? 'Now Playing' : 'Listen Live'}
                </p>
                <p className="text-white/50 text-xs">
                  Fafaa 100.3 FM — Peace & Reconciliation Hour
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Radio className="h-4 w-4 text-[#D4AF37]" />
                <span className="text-xs text-white/50">LIVE</span>
              </div>
            </div>

            {/* Radio Programs */}
            <div className="space-y-3">
              <h4 className="font-heading font-semibold text-sm text-[#D4AF37] flex items-center gap-2">
                <Mic2 className="h-4 w-4" /> Upcoming Broadcasts
              </h4>
              {radioPrograms.map((program) => (
                <div
                  key={program.title}
                  className="bg-white/5 rounded-lg p-3 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <div>
                    <p className="text-sm font-medium">{program.title}</p>
                    <p className="text-xs text-white/50">
                      {program.station} • {program.day} {program.time}
                    </p>
                  </div>
                  <Play className="h-4 w-4 text-[#D4AF37]" />
                </div>
              ))}
            </div>
          </motion.div>

          {/* Testimonials Carousel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="font-heading font-semibold text-xl text-[#D4AF37]">
              Listener Testimonials
            </h3>

            <div className="relative min-h-[200px]">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{
                    opacity: currentTestimonial === index ? 1 : 0,
                    x: currentTestimonial === index ? 0 : 20,
                    position: currentTestimonial === index ? 'relative' : 'absolute',
                  }}
                  transition={{ duration: 0.4 }}
                  className={currentTestimonial !== index ? 'pointer-events-none' : ''}
                >
                  <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/10">
                    <div className="text-[#D4AF37] text-4xl font-heading mb-4">&ldquo;</div>
                    <p className="text-white/90 leading-relaxed mb-6 italic">
                      {testimonial.quote}
                    </p>
                    <div>
                      <p className="font-heading font-semibold text-[#D4AF37]">
                        {testimonial.name}
                      </p>
                      <p className="text-white/50 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Carousel Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-200 ${
                      currentTestimonial === index
                        ? 'bg-[#D4AF37] w-6'
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevTestimonial}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextTestimonial}
                  className="text-white/60 hover:text-white hover:bg-white/10"
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
