'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePage } from '@/context/PageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  Unlock,
  ShieldCheck,
  GraduationCap,
  Wrench,
  MessageCircle,
  Sparkles,
  Baby,
  Stethoscope,
  Trophy,
  BookOpen,
  Globe,
  Church,
  HeartHandshake,
  Accessibility,
  Gamepad2,
  Hospital,
  Stethoscope as Medical,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Target,
  Flag,
  Megaphone,
  Calendar,
  Clock,
} from 'lucide-react';

const coreValues = [
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Peace',
    description: 'We believe in the power of dialogue and reconciliation to resolve conflicts and build harmonious communities across Ghana and beyond.',
  },
  {
    icon: <Scale className="h-6 w-6" />,
    title: 'Justice',
    description: 'We advocate for fairness and equal access to justice for all, regardless of social status or background, including spiritual justice.',
  },
  {
    icon: <HandHeart className="h-6 w-6" />,
    title: 'Compassion',
    description: 'We approach every individual with empathy and kindness, recognizing the inherent dignity in every person, especially the vulnerable.',
  },
  {
    icon: <Diamond className="h-6 w-6" />,
    title: 'Integrity',
    description: 'We uphold transparency and accountability in all our operations, building trust with communities, partners, and stakeholders.',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Dignity',
    description: 'We are committed to restoring and preserving the dignity of every human being, especially those held in spiritual or physical bondage.',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'Empowerment',
    description: 'We equip individuals and communities with the skills and resources they need to transform their own lives and build a better future.',
  },
];

const broadcastSchedule = [
  { day: 'Sunday', time: '7:00 PM - 10:00 PM', station: 'Fafaa 100.3 FM', type: 'Radio' },
  { day: 'Tuesday', time: '11:00 AM - 2:00 PM', station: 'Fafaa 100.3 FM', type: 'Radio' },
  { day: 'Thursday', time: '11:00 AM - 2:00 PM', station: 'Fafaa 100.3 FM', type: 'Radio' },
  { day: 'Tuesday', time: '11:00 AM - 2:00 PM', station: 'Justice FM 98.5 Tamale', type: 'Radio' },
  { day: 'Thursday', time: '11:00 AM - 2:00 PM', station: 'Swiss FM 93.7 Ho', type: 'Radio' },
  { day: 'Scheduled', time: 'Live Broadcasts', station: 'Messiah TV - Amos 17', type: 'TV' },
];

const operations = [
  {
    id: 'tournament',
    icon: <Trophy className="h-6 w-6" />,
    title: 'Duamenefa Regional Tournament',
    description: 'Uncovering the hidden talents of the youth through sports. Since 2017, the Duamenefa Super Gala and Marathon has grown from 46 teams to 115 football clubs in 2023, earning the title "The Olympics of the Volta Region." Over 30,000 spectators and 100+ chiefs attended the grand finale. The tournament is on the national sports calendar as a Regional Tournament by the National Sports Authority.',
    stats: [
      { label: 'Football Clubs (2023)', value: '115' },
      { label: 'Youth Participants', value: '3,200+' },
      { label: 'Spectators at Finale', value: '30,000+' },
    ],
    image: '/marathon-13.jpg',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 'education',
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Educational Support',
    description: 'The Costheta Educational Support Fund helps brilliant students who are stifled in their education due to lack of funds. Each year, 20+ students entering universities receive one-time gifts for food, accommodations, and books. In 2025, 22 students were awarded, many receiving laptop computers. Thus far, 102 students have been awarded since inception. Duamenefa has also partnered with Rutgers University, New Jersey, USA to provide scholarships for master\'s and PhD programs.',
    stats: [
      { label: 'Students Awarded', value: '102' },
      { label: 'Laptops Donated', value: '22+' },
      { label: 'University Partners', value: '1 (Rutgers)' },
    ],
    image: '/children-education.jpg',
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 'single-parents',
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Single Parents Empowerment',
    description: 'Whether single due to death of a spouse, abandonment, divorce, or sin, the Duamenefa Foundation in collaboration with Treasure of His Eyes (UK-based NGO) supplies vocationally-trained single parents with equipment to become financially self-sufficient. Over 105 single parents have received equipment. The Skills Empowerment Training program includes Batik/Tie and Dye, Tailoring, Catering, Bead Making, Costume, Farming, Broadcast Journalism, and Liquid Soap Making.',
    stats: [
      { label: 'Parents Empowered', value: '105+' },
      { label: 'Training Participants (2023)', value: '376' },
      { label: 'Skills Taught', value: '8+' },
    ],
    image: '/women-empowerment.jpg',
    color: 'bg-[#D4AF37]',
  },
  {
    id: 'disabled',
    icon: <Accessibility className="h-6 w-6" />,
    title: 'Disabled Outreach',
    description: 'Reaching out to over 1,200 disabled individuals and their caregivers in 2023, the intercessors of the land visit, pray for, and survey their needs. They are included in the single parents workshops for training and equipment giving. The Foundation continues to learn from their associations what is needed to help them live fuller, more dignified lives.',
    stats: [
      { label: 'Disabled Reached', value: '1,200+' },
      { label: 'Caregivers Supported', value: '600+' },
      { label: 'Districts Covered', value: '5+' },
    ],
    image: '/community-outreach.jpg',
    color: 'bg-[#6B4F3A]',
  },
  {
    id: 'jail',
    icon: <Church className="h-6 w-6" />,
    title: 'Jail Ministration',
    description: 'Each week, inmates of three local jails receive fresh drinking water and the Good News of Jesus Christ. Over the past five years, many souls have been born again. Bibles are distributed twice a year to each cell for study and sharing. A feast with gifts is held for the inmates at the Yuletide, bringing hope and dignity to those who are often forgotten by society.',
    stats: [
      { label: 'Jails Served', value: '3' },
      { label: 'Years Running', value: '5+' },
      { label: 'Bible Distributions/Year', value: '2' },
    ],
    image: '/duamenafa-176.jpg',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 'hospital',
    icon: <Hospital className="h-6 w-6" />,
    title: 'Hospital Outreaches',
    description: 'From prayer support to practical assistance, the Duamenefa Foundation serves six hospitals and two orphanages. One partner adopted the children\'s ward at Keta Municipal Hospital, providing renovation, equipment, and supplies. The men\'s ward has also been adopted. Each quarter the greatest need is identified, projects started and completed. The Foundation now serves six hospitals and two orphanages during the yuletide season.',
    stats: [
      { label: 'Hospitals Served', value: '6' },
      { label: 'Orphanages Served', value: '2' },
      { label: 'Wards Adopted', value: '2' },
    ],
    image: '/duamenafa-10.jpg',
    color: 'bg-[#4C9A2A]',
  },
];

const conflictTypes = [
  {
    icon: <Sparkles className="h-5 w-5" />,
    title: 'Invocation of the Wrath of the Gods',
    description: 'Investigating and intervening where spiritual powers are invoked to cause harm, strange deaths, and suffering to innocent family members of alleged perpetrators.',
  },
  {
    icon: <Unlock className="h-5 w-5" />,
    title: 'Trokosi - Human Servitude to the Gods',
    description: 'Advocating for the total eradication of the practice of offering young girls and women as servitude to the gods, and securing the release and rehabilitation of victims.',
  },
  {
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Child Rights Advocacy',
    description: 'Intervention for the total release of Trokosis and advocating for the protection of children from spiritual manipulation, abuse, and exploitation.',
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: 'False Prophesies & Revelations',
    description: 'Investigating falsification of prophecies, counterfeit visions, and revelations by false prophets who exploit innocent church members, extract money, and set families apart.',
  },
];

const milestoneItems = [
  {
    period: 'Short-Term (5-10 Years)',
    goals: [
      'Investigate and intervene in petitions of human right abuses where spiritual powers are used to incapacitate innocent people',
      'Register over 40,000 members who will promote peaceful coexistence through research, investigation, and interventions into spiritual matters',
      'Institute Regional Football and Marathon Annual Events to unearth hidden talents and keep youth productively engaged',
      'Institute community fun clubs with periodic games competitions across 550 communities',
      'Formal collaboration and exchange of letters among all stakeholders',
      'Link with Christian NGOs in the diaspora to participate in this vision',
      'Institute community leaders to report activities to the Foundation head office',
      'Link with NGOs to support single parents who lost spouses through invocation of the wrath of the gods',
      'Periodic training activities within and outside Ghana for selected members',
    ],
  },
  {
    period: 'Long-Term (10-20 Years)',
    goals: [
      'Champion the establishment of a Vocational School to train and empower the vulnerable',
      'Celebrate and give awards to communities who record zero violations in the three thematic areas',
    ],
  },
];

const aboutSliderImages = [
  { src: '/duamenafa-4.jpg', alt: 'Community peace gathering' },
  { src: '/duamenafa-10.jpg', alt: 'Outreach program activities' },
  { src: '/duamenafa-27.jpg', alt: 'Peacebuilding workshop' },
  { src: '/duamenafa-176.jpg', alt: 'Community transformation project' },
  { src: '/duamenafa-196.jpg', alt: 'Advocacy campaign rally' },
  { src: '/duamenafa-198.jpg', alt: 'Volunteers in action' },
  { src: '/marathon-13.jpg', alt: 'Peace marathon event' },
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
          className="w-full h-80 md:h-[450px] object-cover brightness-110"
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/30 to-transparent" />
      <div className="absolute bottom-6 left-6 right-6 text-white">
        <p className="font-heading font-semibold text-lg drop-shadow-[0_1px_4px_rgba(0,0,0,0.5)]">
          Over 47,758 Members &amp; Growing
        </p>
        <p className="text-white/90 text-sm drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
          Across 550 Communities in the Volta Region
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
            Duamenefa — <span className="text-[#D4AF37]">&ldquo;Let Us Co-Exist in Peace&rdquo;</span>
          </h1>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            A Ghana-based NGO with over 47,758 members committed to promoting peace, reconciliation,
            and the eradication of spiritual and diabolical oppression in our communities.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                Who We Are
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-6">
                A Movement for <span className="text-[#D4AF37]">Peace &amp; Justice</span>
              </h2>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                The Duamenefa Foundation is a Non-Governmental Organization (NGO) with a membership of
                over <strong>47,758</strong> as of 3rd July 2025, who have committed themselves to promoting
                peace and reconciliation in our various communities. Registration is ongoing. The word
                &ldquo;Duamenefa&rdquo; in the Ewe language literally means <strong>&ldquo;LET US CO-EXIST IN PEACE&rdquo;</strong>.
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                The name was birthed as a result of an ongoing intervention radio program which airs on
                <strong> Fafaa 100.3 FM</strong> and is broadcast live on <strong>Justice FM 98.5</strong> in
                Tamale, <strong>Swiss FM 93.7</strong> in Ho, and <strong>Messiah TV – Amos 17</strong>. The
                program is also streamed live on fafaafm.radiostream321.com and on Facebook live pages.
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                The Duamenefa program has succeeded in resolving over <strong>610</strong> hitherto antagonistic
                spiritual and diabolical conflicts. Our foundation has over <strong>47,758 certified members
                (volunteers)</strong> made up of chiefs, opinion leaders, and the general public, with daily
                registration of membership due to the high level of interest the program generates.
              </p>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center p-3 bg-[#0B3C5D]/5 rounded-lg">
                  <p className="font-heading font-bold text-[#D4AF37] text-xl">47,758</p>
                  <p className="text-[#6B4F3A] text-xs">Members</p>
                </div>
                <div className="text-center p-3 bg-[#0B3C5D]/5 rounded-lg">
                  <p className="font-heading font-bold text-[#D4AF37] text-xl">610+</p>
                  <p className="text-[#6B4F3A] text-xs">Conflicts Resolved</p>
                </div>
                <div className="text-center p-3 bg-[#0B3C5D]/5 rounded-lg">
                  <p className="font-heading font-bold text-[#D4AF37] text-xl">550</p>
                  <p className="text-[#6B4F3A] text-xs">Communities</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <AboutImageSlider />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Three Thematic Conflict Areas */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Our Focus
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Three Thematic <span className="text-[#D4AF37]">Conflict Areas</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-3xl mx-auto">
              The Duamenefa program has succeeded in resolving over 610 antagonistic spiritual and diabolical
              conflicts ranging from invocation of the wrath of the gods, using human beings as servitude to
              the gods (Trokosi), and falsification of prophecies by false prophets.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {conflictTypes.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300 group">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center mb-4 group-hover:bg-[#D4AF37] group-hover:text-[#0B3C5D] transition-colors duration-300">
                      {item.icon}
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-[#0B3C5D] mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Background */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <motion.div {...fadeInUp}>
              <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                The Background
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-6">
                Why <span className="text-[#D4AF37]">Duamenefa</span> Exists
              </h2>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                There have been irresistible calls for the investigation of some of the religious and cultural
                practices and beliefs of our people. Some of these practices have been encouraged, while others
                remain not well understood. The Duamenefa Foundation undertakes investigation into these practices
                to encourage those that move us forward as a people and discourage those that do not promote the
                common good.
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                Many believe that strange deaths in the community are due to fetish attacks — that prominent
                people in some families die because a member of the family has wronged another person who then
                sought the intervention of a fetish or god. In some cases, the perpetrator also dies, and the
                practitioners of the fetish then take away all the possessions of the deceased. This belief is
                so entrenched that the <strong>Keta Municipal Assembly</strong> was compelled to enact
                Bye-Law number 3.6 of 2006 under the title &ldquo;Cursing and invoking of the wrath of gods.&rdquo;
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                Another topical practice is the offering of young people, mainly girls and young women, as
                compensation to the gods. The Duamenefa Foundation seeks to bring all these issues to the fore
                so that we as a people can deal with them dispassionately.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg bg-[#0B3C5D] text-white mb-6">
                <CardContent className="p-8">
                  <h3 className="font-heading font-bold text-xl mb-4 text-[#D4AF37]">
                    Keta Municipal Assembly Bye-Law 3.6 of 2006
                  </h3>
                  <p className="text-white/80 leading-relaxed italic text-sm mb-4">
                    &ldquo;Any person or group of persons who curse by the gods or invokes the wrath of gods
                    in one way or the other on another person or group of persons shall be guilty of an offence
                    punishable by a fine not less than GH₵20 or more than GH₵50 in addition to two crates of
                    schnapps, one gallon of Akpeteshie (local gin), two sheep and one goat.&rdquo;
                  </p>
                  <p className="text-white/60 text-xs">
                    This bye-law raises significant legal and social questions that the Duamenefa Foundation seeks to address.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-lg text-[#0B3C5D] mb-4 flex items-center gap-2">
                    <Megaphone className="h-5 w-5 text-[#D4AF37]" />
                    Live Streaming Platforms
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Radio className="h-4 w-4 text-[#D4AF37] shrink-0" />
                      <span className="text-[#6B4F3A] text-sm">fafaafm.radiostream321.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#D4AF37] shrink-0" />
                      <span className="text-[#6B4F3A] text-sm">fafaafmonline.com</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-[#D4AF37] shrink-0" />
                      <span className="text-[#6B4F3A] text-sm">duamenefafoundation.org</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#D4AF37] shrink-0" />
                      <span className="text-[#6B4F3A] text-sm">Facebook: Fafaa100.3fm &amp; Duamenefa Foundation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-[#D4AF37] shrink-0" />
                      <span className="text-[#6B4F3A] text-sm">Facebook: Ketaman Emmanuel Evortepe</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#4C9A2A]/10 text-[#4C9A2A] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              How We Work
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Our <span className="text-[#D4AF37]">Methodology</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-3xl mx-auto">
              The Duamenefa Foundation receives written petitions for investigation and intervention from victims
              who have been traumatized, sick, or have lost innocent family members due to spiritual and diabolical attacks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Receive Petitions',
                description: 'Written petitions are received from victims of spiritual and diabolical attacks. Copies are directed to relevant stakeholders including traditional rulers, Ghana Police Force, CHRAJ, NCCE, and the Department of Social Welfare.',
                icon: <FileText className="h-6 w-6" />,
              },
              {
                step: '02',
                title: 'Investigate',
                description: 'Duamenefa Foundation delegates its journalist from Fafaa 100.3 FM to investigate the veracity of the petitions through on-the-ground research and interviews with all parties involved.',
                icon: <Eye className="h-6 w-6" />,
              },
              {
                step: '03',
                title: 'On-Air Interrogation',
                description: 'An on-air interrogation of the suspected perpetrators and victims is conducted on Fafaa 100.3 FM, with ongoing education through key resource persons from statutory state organizations.',
                icon: <Radio className="h-6 w-6" />,
              },
              {
                step: '04',
                title: 'Community Arbitration',
                description: 'Spiritual attacks are reversed through community traditional arbitrations where all stakeholders gather to resolve the matters through the same processes used to inflict the harm.',
                icon: <Users className="h-6 w-6" />,
              },
              {
                step: '05',
                title: 'Live Broadcast',
                description: 'All interventions and arbitrations are broadcast live on Fafaa 100.3 FM, Justice FM 98.5, Swiss FM 93.7, Messiah TV, and streamed live on all social media platforms.',
                icon: <Megaphone className="h-6 w-6" />,
              },
              {
                step: '06',
                title: 'Restoration & Forgiveness',
                description: 'Perpetrators are forgiven to "go and sin no more" and many end up accepting the Lord Jesus Christ as their personal Savior. Over 22 pastors from the "Intercessors of the Land" continuously intercede through prayer.',
                icon: <Church className="h-6 w-6" />,
              },
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-xl bg-[#0B3C5D] text-white flex items-center justify-center">
                        {step.icon}
                      </div>
                      <span className="font-heading font-bold text-3xl text-[#D4AF37]/30">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-heading font-semibold text-lg text-[#0B3C5D] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed">
                      {step.description}
                    </p>
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
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Radio className="h-4 w-4 inline mr-1" />
              On Air
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Broadcast <span className="text-[#D4AF37]">Schedule</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              The Duamenefa program runs three times a week on Fafaa 100.3 FM and is simulcast across multiple stations.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {broadcastSchedule.map((schedule, index) => (
              <motion.div
                key={`${schedule.station}-${schedule.day}-${schedule.time}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Card className="border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge className={schedule.type === 'TV' ? 'bg-purple-600 text-white' : 'bg-[#0B3C5D] text-white'}>
                        {schedule.type === 'TV' ? '📺 TV' : '📻 Radio'}
                      </Badge>
                      {schedule.station === 'Fafaa 100.3 FM' && (
                        <span className="flex items-center gap-1 text-red-500 text-xs font-bold">
                          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                          LIVE
                        </span>
                      )}
                    </div>
                    <h3 className="font-heading font-semibold text-[#0B3C5D] mb-2">
                      {schedule.station}
                    </h3>
                    <div className="space-y-1 text-sm text-[#6B4F3A]">
                      <p className="flex items-center gap-2">
                        <Calendar className="h-3.5 w-3.5 text-[#D4AF37]" />
                        {schedule.day}
                      </p>
                      <p className="flex items-center gap-2">
                        <Clock className="h-3.5 w-3.5 text-[#D4AF37]" />
                        {schedule.time}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
                    <Target className="h-7 w-7 text-[#D4AF37]" />
                  </div>
                  <h3 className="font-heading font-bold text-2xl mb-4 text-[#D4AF37]">
                    Our Mission
                  </h3>
                  <p className="text-white/80 leading-relaxed text-lg mb-4">
                    To promote best practices in our various communities through the understanding
                    of our various traditional, religious, and cultural practices and beliefs.
                  </p>
                  <p className="text-white/60 text-sm">
                    We investigate, educate, and intervene to resolve spiritual conflicts, protect the
                    vulnerable, and build lasting peace across Ghana.
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
                  <p className="text-[#6B4F3A] leading-relaxed text-lg mb-4">
                    A society where all people co-exist in peace, free from spiritual oppression, human
                    servitude, and injustice. Where the abilities and capabilities of the people are
                    unleashed towards the greater good.
                  </p>
                  <p className="text-[#6B4F3A]/60 text-sm">
                    The key to a greater and prosperous future of our Volta Region is deep inside each
                    and every one of us.
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

      {/* Duamenefa Operations */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Heart className="h-4 w-4 inline mr-1" />
              Our Work
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Duamenefa <span className="text-[#D4AF37]">Operations</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-3xl mx-auto">
              From uncovering hidden youth talent through sports to empowering single parents and reaching
              out to the disabled — the Duamenefa Foundation is actively transforming communities across
              the Volta Region of Ghana.
            </p>
          </motion.div>

          <div className="space-y-8">
            {operations.map((op, index) => (
              <motion.div
                key={op.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="relative h-56 lg:h-auto lg:col-span-2">
                      <img
                        src={op.image}
                        alt={op.title}
                        className="w-full h-full object-cover brightness-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/15 to-transparent" />
                    </div>
                    <CardContent className="p-6 md:p-8 lg:col-span-3">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg ${op.color} text-white flex items-center justify-center`}>
                          {op.icon}
                        </div>
                        <h3 className="font-heading font-bold text-xl text-[#0B3C5D]">
                          {op.title}
                        </h3>
                      </div>
                      <p className="text-[#6B4F3A] leading-relaxed text-sm mb-5">
                        {op.description}
                      </p>
                      <div className="grid grid-cols-3 gap-3">
                        {op.stats.map((stat) => (
                          <div
                            key={stat.label}
                            className="text-center p-3 bg-gray-50 rounded-lg"
                          >
                            <p className="font-heading font-bold text-[#D4AF37] text-lg">
                              {stat.value}
                            </p>
                            <p className="text-[#6B4F3A] text-[11px]">{stat.label}</p>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Evangelism */}
      <section className="py-16 md:py-24 bg-[#0B3C5D] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeInUp}>
              <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                <Church className="h-4 w-4 inline mr-1" />
                Spiritual Impact
              </span>
              <h2 className="font-heading font-bold text-3xl md:text-4xl mb-6">
                Evangelism &amp; Soul Winning Through <span className="text-[#D4AF37]">Social Intervention</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                Through an intense social intervention to rescue idol worshipers from spiritual attacks
                and setting the captives free, many convert to accept Christ Jesus as their Lord and
                personal Savior. The perpetrators are forgiven to &ldquo;go and sin no more&rdquo; and many
                of them end up accepting the Lord Jesus Christ.
              </p>
              <p className="text-white/70 leading-relaxed mb-6">
                The Duamenefa Foundation has over <strong className="text-[#D4AF37]">22 committed pastors</strong> from
                different denominations who constitute an umbrella group known as <strong className="text-[#D4AF37]">&ldquo;Intercessors
                of the Land&rdquo;</strong> who continuously intercede for the land through prayer programs on Fafaa 100.3 FM.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <p className="font-heading font-bold text-[#D4AF37] text-2xl">22+</p>
                  <p className="text-white/60 text-sm">Pastors / Intercessors</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 text-center">
                  <p className="font-heading font-bold text-[#D4AF37] text-2xl">Many</p>
                  <p className="text-white/60 text-sm">Souls Won for Christ</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg bg-white/5 backdrop-blur border border-white/10">
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-[#D4AF37] mb-4" />
                  <blockquote className="font-heading text-lg leading-relaxed mb-6 italic text-white/90">
                    &ldquo;The devil finds work for the idle hand. Our sporting events are meant to
                    motivate the youth and discourage them from engaging in negative practices and vices.
                    Through our interventions, many have found peace and a new life in Christ.&rdquo;
                  </blockquote>
                  <Separator className="bg-white/20 mb-4" />
                  <div>
                    <p className="font-heading font-bold text-[#D4AF37]">
                      Emmanuel Ketaman Evortepe
                    </p>
                    <p className="text-white/60 text-sm">Executive President, Duamenefa Foundation</p>
                    <p className="text-white/40 text-xs">CEO, Fafaa 100.3 FM</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fun Games & Community */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#4C9A2A]/10 text-[#4C9A2A] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Gamepad2 className="h-4 w-4 inline mr-1" />
              Community Engagement
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Fun Games &amp; <span className="text-[#D4AF37]">Community Spirit</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div {...fadeInUp}>
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-[#4C9A2A]/10 flex items-center justify-center mb-4">
                    <Gamepad2 className="h-6 w-6 text-[#4C9A2A]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0B3C5D] mb-3">
                    Community Fun Games
                  </h3>
                  <p className="text-[#6B4F3A] leading-relaxed">
                    In most of the 550 communities in our catchment area, Duamenefa Foundation sponsors
                    fun games which bring the community together for peaceful, competitive, and fun social
                    interaction. Youth and adults alike compete in singing, games, races, reciting, and
                    talent competitions broadcast on Fafaa 100.3 FM. This secures a strong community spirit
                    where people are willing to work together for their betterment.
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
              <Card className="h-full border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-12 h-12 rounded-xl bg-[#0B3C5D]/10 flex items-center justify-center mb-4">
                    <Hospital className="h-6 w-6 text-[#0B3C5D]" />
                  </div>
                  <h3 className="font-heading font-bold text-xl text-[#0B3C5D] mb-3">
                    Providing for the Sick &amp; Injured
                  </h3>
                  <p className="text-[#6B4F3A] leading-relaxed">
                    Duamenefa Foundation has many requests for help coming in, and when the pictures arrive
                    and the stories are told, God directs our Foundation to help. It is a commandment of God
                    to love our neighbors, and Duamenefa Foundation intends to fulfill all righteousness.
                    During the feeding of entire hospital populations, partners have adopted wards providing
                    renovation, equipment, and supplies. The Foundation now serves six hospitals and two
                    orphanages during the yuletide.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Flag className="h-4 w-4 inline mr-1" />
              Our Roadmap
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Milestones &amp; <span className="text-[#D4AF37]">Goals</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {milestoneItems.map((milestone, index) => (
              <motion.div
                key={milestone.period}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                <Card className="h-full border-0 shadow-lg overflow-hidden">
                  <div className={`${index === 0 ? 'bg-[#0B3C5D]' : 'bg-[#4C9A2A]'} p-5`}>
                    <h3 className="font-heading font-bold text-lg text-white flex items-center gap-2">
                      {index === 0 ? <Target className="h-5 w-5 text-[#D4AF37]" /> : <Flag className="h-5 w-5 text-[#D4AF37]" />}
                      {milestone.period}
                    </h3>
                  </div>
                  <CardContent className="p-6">
                    <ul className="space-y-3">
                      {milestone.goals.map((goal) => (
                        <li key={goal} className="flex items-start gap-3">
                          <CheckCircle className="h-4 w-4 text-[#4C9A2A] shrink-0 mt-0.5" />
                          <span className="text-[#6B4F3A] text-sm leading-relaxed">{goal}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stakeholders & Partners */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Partnerships
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Our <span className="text-[#D4AF37]">Stakeholders</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-3xl mx-auto">
              The Duamenefa Foundation collabor with a wide range of stakeholders to achieve its mission of
              peace, justice, and community transformation.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[
              'Fafaa 100.3 FM',
              'Justice FM 98.5',
              'Swiss FM 93.7',
              'Messiah TV - Amos 17',
              'Keta Municipal Assembly',
              'CHRAJ',
              'NCCE',
              'Ghana Police Force',
              'Dept. of Social Welfare',
              'Traditional Councils',
              'Ghana Bar Association',
              'Rutgers University USA',
              'Treasure of His Eyes (UK)',
              'National Sports Authority',
              'Intercessors of the Land',
              'Ghana Education Service',
            ].map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <div className="w-full h-14 rounded-lg bg-white shadow-sm flex items-center justify-center text-[#0B3C5D]/60 font-heading font-medium text-xs border border-gray-100 hover:border-[#D4AF37]/30 hover:shadow-md transition-all">
                  {partner}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sponsorship / CTA */}
      <section className="py-16 md:py-24 bg-gradient-to-br from-[#0B3C5D] to-[#0a2e47] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 rounded-full border-2 border-[#D4AF37]" />
          <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border-2 border-[#D4AF37]" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              Sponsorship
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-5xl mb-6">
              Support the <span className="text-[#D4AF37]">Mission</span>
            </h2>
            <p className="text-white/70 text-lg mb-6 max-w-2xl mx-auto">
              Fafaa 100.3 FM solicits sponsorship from well-meaning international charitable organizations,
              Ghanaians, Churches, the Business Community, NGOs, and the International Community.
            </p>
            <p className="text-white/50 text-sm mb-8">
              &ldquo;Information for Intervention&rdquo; — Fafaa 100.3 FM
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                size="lg"
                className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold px-8 py-6 text-lg"
                onClick={() => window.open('mailto:info@duamenefa.org', '_blank')}
              >
                <HandHeart className="h-5 w-5 mr-2" />
                Become a Sponsor
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Signatory */}
      <section className="py-12 bg-[#0B3C5D]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Separator className="bg-white/10 max-w-md mx-auto mb-8" />
          <p className="text-white font-heading font-bold text-lg">Emmanuel Ketaman Evortepe</p>
          <p className="text-[#D4AF37] text-sm">Executive President, Duamenefa Foundation</p>
          <p className="text-white/50 text-xs mt-1">CEO, Fafaa 100.3 FM</p>
        </div>
      </section>
    </div>
  );
}
