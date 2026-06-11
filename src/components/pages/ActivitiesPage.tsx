'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@/context/PageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
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
  Calendar,
  MapPin,
  Clock,
  ChevronLeft,
  ChevronRight,
  Camera,
  Play,
  Radio,
  Award,
  TrendingUp,
  Activity,
} from 'lucide-react';

const activities = [
  {
    id: 'peace',
    icon: <Heart className="h-6 w-6" />,
    title: 'Peace & Reconciliation',
    description: 'Our flagship program focuses on mediating conflicts between communities, families, and individuals. We employ both traditional conflict resolution methods and modern restorative justice approaches to build lasting peace across Ghana\'s diverse communities.',
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
    description: 'We are at the forefront of the fight against shrine servitude, advocating for the liberation of individuals held in Trokosi bondage. Our program provides legal support, rehabilitation, and reintegration assistance to victims, helping them rebuild their lives with dignity.',
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
    description: 'We protect children from spiritual manipulation, abuse, and exploitation. Our program ensures every child has access to safety, education, and the opportunity to grow in a nurturing environment free from harm and oppression.',
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
    description: 'We believe education is the key to breaking the cycle of poverty and oppression. Our program provides scholarships, school supplies, and literacy programs to underserved communities, empowering the next generation with knowledge and opportunity.',
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
    description: 'Our vocational training program equips liberated individuals, orphans, and vulnerable community members with practical skills for economic independence and self-sufficiency. We provide hands-on training in marketable trades that lead to sustainable livelihoods.',
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
    description: 'We facilitate dialogue between conflicting parties using traditional and modern mediation techniques. Our trained mediators help communities find common ground and build sustainable peace agreements that last for generations.',
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
    description: 'We address the invocation of the wrath of gods, false prophecies, and other spiritual conflicts that divide communities and cause suffering. Our approach combines spiritual counseling with community education to promote understanding and peace.',
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
    description: 'We empower women and youth through leadership training, economic empowerment programs, and advocacy for equal rights and opportunities. Our goal is to create agents of change within communities who can lead transformation from within.',
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

const upcomingActivities = [
  { title: 'Community Peace Dialogue', date: 'Jan 15, 2025', location: 'Ho, Volta Region', time: '10:00 AM', category: 'Peace' },
  { title: 'Vocational Training Graduation', date: 'Feb 20, 2025', location: 'Training Center, Ho', time: '10:00 AM', category: 'Education' },
  { title: 'Child Rights Workshop', date: 'Mar 5, 2025', location: 'Hohoe, Volta Region', time: '2:00 PM', category: 'Advocacy' },
  { title: 'Peace Marathon', date: 'Mar 22, 2025', location: 'Volta Region', time: '6:00 AM', category: 'Community' },
  { title: 'Annual Peace Summit', date: 'Apr 10, 2025', location: 'Ho Municipal Assembly', time: '9:00 AM', category: 'Peace' },
  { title: 'Women Empowerment Forum', date: 'May 8, 2025', location: 'Ho, Volta Region', time: '11:00 AM', category: 'Empowerment' },
];

const activityImages = [
  { src: '/duamenafa-4.jpg', alt: 'Community peace gathering' },
  { src: '/duamenafa-10.jpg', alt: 'Outreach program activities' },
  { src: '/duamenafa-27.jpg', alt: 'Peacebuilding workshop' },
  { src: '/duamenafa-176.jpg', alt: 'Community transformation project' },
  { src: '/duamenafa-196.jpg', alt: 'Advocacy campaign rally' },
  { src: '/duamenafa-198.jpg', alt: 'Volunteers in action' },
  { src: '/marathon-13.jpg', alt: 'Peace marathon event' },
];

function ActivityImageSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % activityImages.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + activityImages.length) % activityImages.length);
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
          src={activityImages[current].src}
          alt={activityImages[current].alt}
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
          Through our 8 comprehensive activity programs
        </p>
      </div>
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
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {activityImages.map((_, index) => (
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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ActivitiesPage() {
  const [activeActivity, setActiveActivity] = useState(activities[0].id);
  const { navigateTo } = usePage();

  return (
    <div className="pt-20 md:pt-28">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-1/2 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl -translate-x-1/2" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            <Activity className="h-4 w-4 inline mr-1" />
            What We Do
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Our <span className="text-[#D4AF37]">Activities</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Through eight comprehensive activity programs, we address the root causes of conflict,
            oppression, and poverty to build lasting peace and prosperity across Ghana.
          </p>
        </div>
      </section>

      {/* Image Slider + Overview */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                Our Impact
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-6">
                Transforming <span className="text-[#D4AF37]">Communities</span>
              </h2>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                Duamenefa Foundation operates eight comprehensive activity programs that collectively address
                the root causes of conflict, oppression, and poverty in Ghana. From peace mediation and
                community reconciliation to child rights advocacy and vocational training, each program
                is designed to create sustainable, long-lasting change.
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-6">
                Our activities are driven by the communities we serve. We work alongside local leaders,
                volunteers, and partner organizations to ensure our programs are culturally relevant and
                responsive to real needs. Every activity is measured for impact, ensuring accountability
                and continuous improvement.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-[#0B3C5D]/5 rounded-lg">
                  <p className="font-heading font-bold text-[#D4AF37] text-xl">47,758</p>
                  <p className="text-[#6B4F3A] text-xs">Members Reached</p>
                </div>
                <div className="text-center p-3 bg-[#0B3C5D]/5 rounded-lg">
                  <p className="font-heading font-bold text-[#D4AF37] text-xl">610+</p>
                  <p className="text-[#6B4F3A] text-xs">Conflicts Resolved</p>
                </div>
                <div className="text-center p-3 bg-[#0B3C5D]/5 rounded-lg">
                  <p className="font-heading font-bold text-[#D4AF37] text-xl">8</p>
                  <p className="text-[#6B4F3A] text-xs">Activity Programs</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <ActivityImageSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Activity Cards Grid */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Our Programs
            </span>
            <h2 className="font-heading font-bold text-3xl text-[#0B3C5D] mb-4">
              Activity <span className="text-[#D4AF37]">Programs</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              Explore our programs and discover how we are making a difference in communities across Ghana.
            </p>
          </motion.div>

          {/* Program Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
            {activities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <button
                  onClick={() => setActiveActivity(activity.id)}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 h-full ${
                    activeActivity === activity.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-md'
                      : 'border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-sm bg-white'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg ${activity.color} text-white flex items-center justify-center mb-3`}
                  >
                    {activity.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-[#0B3C5D] text-sm mb-1">
                    {activity.title}
                  </h3>
                  <p className="text-[#6B4F3A]/70 text-xs line-clamp-2">
                    {activity.description}
                  </p>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Active Activity Detail */}
          {activities
            .filter((a) => a.id === activeActivity)
            .map((activity) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative h-64 lg:h-auto">
                      <img
                        src={activity.image}
                        alt={activity.title}
                        className="w-full h-full object-cover brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/15 to-transparent" />
                    </div>
                    <CardContent className="p-8 md:p-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-12 h-12 rounded-xl ${activity.color} text-white flex items-center justify-center`}
                        >
                          {activity.icon}
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-[#0B3C5D]">
                          {activity.title}
                        </h3>
                      </div>
                      <p className="text-[#6B4F3A] leading-relaxed mb-6">
                        {activity.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {activity.stats.map((stat) => (
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
                        {activity.highlights.map((highlight) => (
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
                        onClick={() => navigateTo('forms')}
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

      {/* Upcoming Activities */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#4C9A2A]/10 text-[#4C9A2A] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Calendar className="h-4 w-4 inline mr-1" />
              Coming Up
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Upcoming <span className="text-[#D4AF37]">Activities</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              Join us at our upcoming events and activities. Your participation makes a difference.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingActivities.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <Badge className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs">
                        {event.category}
                      </Badge>
                    </div>
                    <h3 className="font-heading font-semibold text-[#0B3C5D] mb-3">
                      {event.title}
                    </h3>
                    <div className="space-y-2 text-sm text-[#6B4F3A]">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-[#D4AF37]" />
                        {event.date}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-[#D4AF37]" />
                        {event.time}
                      </p>
                      <p className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-[#D4AF37]" />
                        {event.location}
                      </p>
                    </div>
                    <Separator className="my-4" />
                    <Button
                      onClick={() => navigateTo('forms')}
                      variant="outline"
                      className="w-full border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white text-sm"
                    >
                      Register to Attend
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 md:py-20 bg-[#0B3C5D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <h2 className="font-heading font-bold text-3xl md:text-4xl mb-4">
              Our <span className="text-[#D4AF37]">Impact</span> in Numbers
            </h2>
            <p className="text-white/70 max-w-xl mx-auto">
              Measurable results from our activity programs across Ghana.
            </p>
          </motion.div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { label: 'Community Members', value: '47,758', icon: <Users className="h-6 w-6" /> },
              { label: 'Conflicts Resolved', value: '610+', icon: <Heart className="h-6 w-6" /> },
              { label: 'Radio Stations', value: '4+', icon: <Radio className="h-6 w-6" /> },
              { label: 'Broadcasts Completed', value: '1000+', icon: <Award className="h-6 w-6" /> },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-3 text-[#D4AF37]">
                  {stat.icon}
                </div>
                <p className="font-heading font-bold text-3xl text-[#D4AF37] mb-1">{stat.value}</p>
                <p className="text-white/70 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
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
                onClick={() => navigateTo('forms')}
                className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold px-8"
              >
                <HandHeart className="h-4 w-4 mr-2" />
                Donate Now
              </Button>
              <Button
                onClick={() => navigateTo('forms')}
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
