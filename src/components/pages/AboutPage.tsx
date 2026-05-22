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
  Eye,
  Shield,
  Scale,
  HandHeart,
  Diamond,
  Users,
  Radio,
  Quote,
  Award,
  MapPin,
  Unlock,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  Baby,
  Trophy,
  BookOpen,
  Globe,
  Church,
  HeartHandshake,
  Accessibility,
  Gamepad2,
  Hospital,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Target,
  Flag,
  Megaphone,
  Calendar,
  Clock,
  FileText,
  HelpCircle,
  Landmark,
  Gavel,
  Cross,
  Microscope,
  Handshake,
  Stethoscope,
  Building2,
  Lightbulb,
  BookMarked,
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
    subtitle: 'Uncovering the hidden talents of the youth through sports',
    description: 'The Duamenefa Foundation in collaboration with its radio the Fafaa 100.3 FM and several other stations throughout the Volta Region, each year since 2017, broadcast live, a large football tournament aptly named, The Duamenefa Super Gala and Marathon. The first year, 46 teams and 71 athletes registered to compete. It was such a huge success, that in 2018, 77 football clubs and 77 athletes competed. The Regional Director of Sports declared his unwavering support and put the Duamenefa Super Gala and Marathon on the national sports calendar as a Regional Tournament. In 2019, dubbed "The Olympics of the Volta Region," 104 football clubs registered. Over 30,000 spectators, more than 100 chiefs, and many pastors attended the grand finale. In 2023, 115 football clubs competed, and in 2024, 38 clubs under 17, 10 volleyball teams, 60 marathon athletes, and six women\'s tug of "peace" teams competed.',
    stats: [
      { label: 'Clubs (2023)', value: '115' },
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
    subtitle: 'The Costheta Educational Support Fund',
    description: 'Many brilliant students with good characters are stifled in their education due to the lack of funds. The Costheta Educational Support fund helps 20 such students each year who are entering the universities to get a bit of help with a one-time gift for the extras needed for college life; food, accommodations, books, etc. In 2025, 22 students were awarded with many receiving gifts of laptop computers and more. Thus far 102 students have been awarded since its inception.',
    stats: [
      { label: 'Students Awarded', value: '102' },
      { label: 'Awards in 2025', value: '22' },
      { label: 'Laptops Donated', value: '22+' },
    ],
    image: '/children-education.jpg',
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 'study-abroad',
    icon: <Globe className="h-6 w-6" />,
    title: 'Duamenefa Educational Study Abroad',
    subtitle: 'International academic opportunities',
    description: 'Duamenefa Foundation and Rutgers University, New Jersey, USA have partnered to provide various scholarships for those eligible Duamenefa members or their wards who have obtained their first degree, and are seeking further education to master\'s or PhD. This partnership opens doors for Ghanaian scholars to access world-class education and return to contribute to their communities.',
    stats: [
      { label: 'University Partner', value: 'Rutgers' },
      { label: 'Programs', value: 'MSc & PhD' },
      { label: 'Location', value: 'USA' },
    ],
    image: '/duamenafa-27.jpg',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 'single-parents',
    icon: <HeartHandshake className="h-6 w-6" />,
    title: 'Single Parents Empowerment',
    subtitle: 'Restoring hope and self-sufficiency',
    description: 'Whether single due to the death of a spouse, abandonment, divorce or sin, this situation should not be a lifelong handicap for these families. Through the collaboration with Treasure of His Eyes, an NGO based in the UK, the Duamenefa Foundation is helping to supply vocationally-trained single parents with equipment and the help needed to grow and become financially sound and self-sufficient. This program has successfully enabled people to move forward, some now having apprentices working under them, multiplying the business and helping their children have the opportunity of education, life\'s necessities and a good home environment. Over 105 single parents have received equipment to empower them to success.',
    stats: [
      { label: 'Parents Empowered', value: '105+' },
      { label: 'UK Partner', value: 'Treasure of His Eyes' },
      { label: 'Self-Sufficient', value: 'Growing' },
    ],
    image: '/women-empowerment.jpg',
    color: 'bg-[#D4AF37]',
  },
  {
    id: 'skills',
    icon: <BookMarked className="h-6 w-6" />,
    title: 'Skills Empowerment Training',
    subtitle: 'Three-day intensive skills program',
    description: 'Fafaa 100.3 FM and its NGO, the Duamenefa Foundation collaborated with Treasure of His Eyes, a UK based NGO under Country Director, Pastor Adefunke Adeoye, for its first three-day skills empowerment program in various skills training such as: Batik/Tie and Dye, Tailoring, Catering, Bead Making, Costume, Farming tips, Introduction to Broadcast Journalism and Liquid Soap Making. In the first Skills Empowerment held in March 2023, 376 participants from various Municipalities and Districts (Ketu North, Keta, Akatsi South, Ketu South and Akatsi North) participated in the program.',
    stats: [
      { label: 'Participants (2023)', value: '376' },
      { label: 'Skills Taught', value: '8+' },
      { label: 'Districts Covered', value: '5' },
    ],
    image: '/vocational-training.jpg',
    color: 'bg-[#6B4F3A]',
  },
  {
    id: 'disabled',
    icon: <Accessibility className="h-6 w-6" />,
    title: 'Disabled Outreach',
    subtitle: 'Reaching the most vulnerable',
    description: 'Reaching out to over 1,200 disabled and their caregivers in 2023 and visiting them to find out how we can help them in their situations, the intercessors of the land go out to pray for them and survey their needs. They are included in the single parents, the workshops for training and the giving of equipment. Much more is coming as the Foundation learns from their associations what is needed to help.',
    stats: [
      { label: 'Disabled Reached', value: '1,200+' },
      { label: 'Year of Outreach', value: '2023' },
      { label: 'Included In', value: 'All Programs' },
    ],
    image: '/community-outreach.jpg',
    color: 'bg-[#6B4F3A]',
  },
  {
    id: 'jail',
    icon: <Church className="h-6 w-6" />,
    title: 'Jail Ministration',
    subtitle: 'Bringing hope to the forgotten',
    description: 'Each week, inmates of three local jails receive fresh drinking water and the Good News of Jesus Christ. Over the past five years, many souls have been born again. Bibles are distributed twice a year or as needed to each cell for study and sharing the Good News. A nice feast with gifts is held for the inmates at the Yuletide.',
    stats: [
      { label: 'Jails Served', value: '3' },
      { label: 'Years Running', value: '5+' },
      { label: 'Bible Distributions/Year', value: '2' },
    ],
    image: '/duamenafa-176.jpg',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 'fun-games',
    icon: <Gamepad2 className="h-6 w-6" />,
    title: 'Fun Games',
    subtitle: 'Building community spirit across 550 communities',
    description: 'In most of the 550 communities in our catchment area, Duamenefa Foundation sponsors fun games which bring the community together for peaceful, competitive and fun social interaction. Youth and adults alike compete in various activities including; singing, games, races, reciting and talent competitions broadcast on our radio station; Fafaa 100.3 FM. This secures a strong community spirit where people are willing to work together for their betterment.',
    stats: [
      { label: 'Communities', value: '550' },
      { label: 'Activities', value: 'Singing, Games, Races' },
      { label: 'Broadcast On', value: 'Fafaa 100.3 FM' },
    ],
    image: '/duamenafa-196.jpg',
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 'hospital',
    icon: <Hospital className="h-6 w-6" />,
    title: 'Hospital Outreaches',
    subtitle: 'Healing body and soul',
    description: 'From prayer support and encouragement to helping the sick in the area hospitals, Duamenefa Foundation, through generous gifts of its partners, is now providing much needed assistance in making our hospitals the best. During the feeding of the entire population of two hospitals, one of our partners chose to adopt the children\'s ward at the Keta Municipal Hospital, providing renovation, equipment and supplies. Each quarter the greatest need within the ward is agreed upon, the project started and completed to the glory of God. The men\'s ward has also been adopted and work will begin soon. Duamenefa now serves six hospitals and two orphanages during the yuletide.',
    stats: [
      { label: 'Hospitals Served', value: '6' },
      { label: 'Orphanages Served', value: '2' },
      { label: 'Wards Adopted', value: '2' },
    ],
    image: '/duamenafa-10.jpg',
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 'medical',
    icon: <Stethoscope className="h-6 w-6" />,
    title: 'Providing for the Sick & Injured',
    subtitle: 'Fulfilling the commandment to love our neighbors',
    description: 'Duamenefa Foundation has many requests for help coming in, but when the pictures arrive and the stories are told, God directs our Foundation to help. It is a commandment of God to love our neighbors and Duamenefa Foundation intends to fulfill all righteousness. The Foundation responds to individual medical needs, providing assistance for treatment, medication, and care for those who cannot afford it.',
    stats: [
      { label: 'Requests Handled', value: 'Ongoing' },
      { label: 'Approach', value: 'Compassionate' },
      { label: 'Guided By', value: 'Faith' },
    ],
    image: '/duamenafa-4.jpg',
    color: 'bg-[#6B4F3A]',
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
    description: 'Intervention for the total release of Trokosis and advocating for the protection of children from spiritual manipulation, abuse, and exploitation. Education and vocational training for released Trokosis and orphans.',
  },
  {
    icon: <Eye className="h-5 w-5" />,
    title: 'False Prophesies & Revelations',
    description: 'Investigating falsification of prophecies, counterfeit visions, and revelations by false prophets who exploit innocent church members, extract money, and set families apart.',
  },
];

const broadObjectives = [
  {
    icon: <Microscope className="h-5 w-5" />,
    text: 'Investigate the petitions received and publicly engage the perpetrators and stakeholders on its radio (Fafaa 100.3 FM) to unravel the mysteries behind the invocation of the wrath of the gods upon families.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    text: 'Ensure that the stakeholders compel the perpetrators of these diabolical practices or crimes to reverse the invocations and save the families from spiritual death penalties.',
  },
  {
    icon: <Baby className="h-5 w-5" />,
    text: 'Investigate petitions received on issues of demand by traditional deity practitioners to offer human beings, especially young females, as servitude to the gods (Trokosi).',
  },
  {
    icon: <Eye className="h-5 w-5" />,
    text: 'Investigate petitions on issues of false prophecies and revelations by false prophets who play on the psyche of innocent members of a particular church, extract money, set families apart and render their victims traumatized.',
  },
];

const supplementaryObjectives = [
  'Seek the traditionalist perspective on the subject matter, its advantages (if any) and its disadvantages to the society by means of interviewing key traditional rulers',
  'Seek the opinion of the worshipers of the deities who permit the act of the invocation of the wrath of the gods',
  'Seek the opinion of the Christian community about the biblical perspective on this matter',
  'Seek the opinion of the representative of the Ghana Bar Association on the matter',
  'Seek the opinion of the Keta Municipal Assembly as to what informed their decision to promulgate the bye-law prohibiting invocation of the wrath of the gods',
  'Seek the position of the law courts on the provisions of the aforementioned bye-law',
  'Seek the opinion of the Islamic Community on the provisions of the Quran on the subject matter',
];

const keyQuestions = [
  'How do we resolve the lacuna in the 1992 Constitution of the Republic of Ghana on spiritual matters?',
  'Why did the Keta Municipal Assembly promulgate a bye-law prohibiting the act of invocation of the wrath of the gods and prescribed a penalty?',
  'Does the Assembly know that the gods begin their operations by killing innocent and very important personalities of the culprit\'s family?',
  'Why do the gods allow the culprit to live to the detriment of innocent people?',
  'Is there an alternative means that the same gods will prefer to save the lives of innocent persons?',
  'Are the practitioners and their gods aware of the constitutional provision on the subject matter?',
  'Is this act not an infringement on the fundamental human rights of innocent citizens who have to pay with their lives for crimes they knew nothing about?',
  'What is the correlation between the Keta Municipal Assembly\'s bye-law and the Constitution of Ghana?',
  'Are Christians possible culprits in terms of invocation of the wrath of the gods?',
  'What is the Christians\' position on the provisions of the constitution of Ghana on the above subject matter?',
  'What are the consequences of false prophesies and falsifications of prophetic revelations?',
  'What is the relationship between customary law, traditional practices, Islamic law, Biblical and Christian injunctions and the Constitution and the laws of Ghana?',
];

const stakeholderInstitutions = [
  'Office of The Regional Minister',
  'Offices of the Members of Parliaments, Volta Region',
  'Offices of the District and Municipal Chief Executives',
  'Offices of The Traditional Councils',
  'The Ghana Bar Association (Regional Chapter)',
  'Commission on Human Right and Administrative Justice (CHRAJ)',
  'The Ghana Psychic and Traditional Council, Volta Regional Chapter',
  'The Trorxovi Regional Council',
  'The Sofia Movement Council',
  'The Regional Police Command, Volta Region',
  'The Ewe land Local Council of Churches',
  'The Moslem Community',
  'The Market Women Associations',
  'The Ghana Private Road Transport Union of the TUC',
  'The Ghana Information Service',
  'The National Commission for Civic Education (NCCE)',
  'The Ghana Education Service',
];

const milestoneItems = [
  {
    period: 'Short-Term (5-10 Years)',
    goals: [
      'Investigate and intervene in petitions of human right abuses where spiritual powers are used to incapacitate innocent people',
      'Register as many as 40,000 members who will promote and champion peaceful coexistence of people through research, investigation and interventions into spiritual matters',
      'Institute Regional Football and Marathon Annual Events where the hidden talents of the youth will be unearthed thereby creating a congenial platform for marketing same',
      'Institute community fun clubs for the Duamenefa foundation where there will be periodic fun club games competition of all age groups within the 550 communities',
      'Formal collaboration and exchange of letters among the stakeholders',
      'Link with other Christian NGO\'s in the diaspora to participate in this vision and win the suffering souls for the kingdom',
      'To institute community leaders of the project who will report the activities of their various communities to the head office of the Foundation',
      'To link with an NGO to support single parents who lost their husbands/wives through the invocations of the wrath of the gods or divorcees',
      'Periodic training activities within and outside Ghana for selected members of the Foundation',
    ],
  },
  {
    period: 'Long-Term (10-20 Years)',
    goals: [
      'The Duamenefa Foundation shall champion the establishment of a Vocational School to train and empower the vulnerable',
      'The Duamenefa Foundation shall celebrate and give awards to communities who recorded zero violations of the aforementioned three thematic areas mentioned above',
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
            About Us — The Concept Note
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
                over <strong>47,758</strong> (Forty-seven Thousand, Seven hundred-fifty-eight) as of 3rd July 2025, who have committed
                themselves to promoting peace and reconciliation in our various communities. Registration is
                ongoing. The word &ldquo;Duamenefa&rdquo; in the Ewe language literally means <strong>&ldquo;LET US CO-EXIST IN PEACE&rdquo;</strong>.
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                The name was birthed as a result of an ongoing intervention radio program which airs every
                Sunday 7:00pm &ndash; 10:00pm, Tuesday 11:00am &ndash; 2:00pm and Thursday 11:00am &ndash; 2:00pm on
                <strong> Fafaa 100.3 FM</strong> and is streamed live on fafaafm.radiostream321.com, and on Facebook
                live pages: Fafaa100.3fm and Duamenefa Foundation as well as Ketaman Emmanuel Evortepe pages.
                In addition, the programs are broadcast live on <strong>Justice FM 98.5</strong> in Tamale,
                <strong> Swiss FM 93.7</strong> in Ho, and <strong>Messiah TV &ndash; Amos 17</strong>.
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                The &ldquo;Duamenefa&rdquo; program has succeeded in resolving over <strong>610</strong> hitherto antagonistic
                spiritual and diabolical conflicts. Our foundation has over <strong>47,758 certified members
                (volunteers)</strong> made up of chiefs, opinion leaders, and the general public, with daily
                registration of membership due to the high level of interest the program generates. It is
                estimated that membership will double in the next two years.
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
              conflicts. These are issues of spiritual and diabolical connotations which our traditional courts
              and the law enforcement agencies are not clothed with jurisdiction to handle.
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
                There have been some irresistible calls into the investigation of some of the religious and cultural
                practices and beliefs of our people. Some of the practices and beliefs have been encouraged and some
                are still not well understood, therefore, the Duamenefa Foundation is undertaking investigation into
                some of these practices and beliefs so as to know more about them, to encourage those that will move
                us forward as a people and to discourage those that will not promote the common good.
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                Some of these practices and beliefs have to do with the belief of most people that strange deaths
                in the community are due to fetish attacks and that prominent people in some families die because
                a member of the family has wronged some other person and that the person who has been wronged has
                sought the intervention of a fetish or a god and the result is that very prominent people in the
                family of the perpetrator die one after the other. In some of the cases, the perpetrator also dies
                eventually and following his death the practitioners of the fetish or the god then proceed to take
                away all the possessions of the deceased perpetrator.
              </p>
              <p className="text-[#6B4F3A] leading-relaxed mb-4">
                This belief has been entrenched in the community so much so that the <strong>Keta Municipal
                Assembly</strong> in the Volta Region of the Republic of Ghana was compelled to enact Bye-Law
                number 3.6 of 2006. Another topical practice has been the offering of young people mainly girls
                and young women as compensation to the gods. The Duamenefa Foundation therefore seeks to bring
                all these issues to the fore so that we as a people can deal with them dispassionately.
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
                  <p className="text-white/80 leading-relaxed italic text-sm mb-2">
                    &ldquo;Cursing and invoking of the wrath of gods&rdquo;
                  </p>
                  <p className="text-white/80 leading-relaxed italic text-sm mb-4">
                    &ldquo;Any person or group of persons who curse by the gods or invokes the wrath of gods
                    in one way or the other on another person or group of persons shall be guilty of an offence
                    punishable by a fine not less than GH&#8373;20 or more than GH&#8373;50 in addition to two crates of
                    schnapps, one gallon of Akpeteshie (local gin), two sheep and one goat.&rdquo;
                  </p>
                  <p className="text-white/60 text-xs">
                    The above bye-law raises a lot of legal and social issues. The Duamenefa Foundation seeks to address these questions.
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

      {/* Purpose / Aim */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto text-center">
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Purpose / Aim
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-6">
              Our <span className="text-[#D4AF37]">Purpose</span>
            </h2>
            <Card className="border-0 shadow-lg bg-[#0B3C5D] text-white">
              <CardContent className="p-8 md:p-10">
                <div className="w-16 h-16 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-6">
                  <Target className="h-8 w-8 text-[#D4AF37]" />
                </div>
                <p className="text-white/90 leading-relaxed text-lg md:text-xl font-heading">
                  The goal of the Duamenefa Foundation is to promote best practices in our various
                  communities through the understanding of our various traditional, religious and
                  cultural practices and beliefs.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Methodology */}
      <section className="py-16 md:py-24">
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
              who have been traumatized, sick or people who lost innocent family members due to spiritual and
              diabolical attacks.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                step: '01',
                title: 'Receive Petitions',
                description: 'Written petitions are received from victims. Copies of petitions are directed to relevant stakeholders: (a) The traditional rulers (b) The Ghana Police Force (c) The Commission for Human Right and Administrative Justice (CHRAJ) (d) The National Commission for Civic Education (NCCE) (e) The Department of Social Welfare and other relevant stakeholders.',
                icon: <FileText className="h-6 w-6" />,
              },
              {
                step: '02',
                title: 'Investigate',
                description: 'The Duamenefa Foundation delegates its journalist from Fafaa 100.3 FM to investigate the veracity of the petitions through on-the-ground research and interviews with all parties involved.',
                icon: <Eye className="h-6 w-6" />,
              },
              {
                step: '03',
                title: 'On-Air Interrogation',
                description: 'An on-air interrogation of the suspected perpetrators of the diabolical and spiritual crimes and the victims is conducted on Fafaa 100.3 FM. There is also ongoing education on the matter through the participation of key resource persons from the statutory state organizations.',
                icon: <Radio className="h-6 w-6" />,
              },
              {
                step: '04',
                title: 'Community Arbitration',
                description: 'In most cases, the spiritual attacks are reversed through community traditional arbitrations where all stakeholders gather to arbitrate and resolve the spiritual matters through the same processes that were used to inflict the harm and suffering on the victims.',
                icon: <Users className="h-6 w-6" />,
              },
              {
                step: '05',
                title: 'Live Broadcast',
                description: 'There is a live broadcast of the interventions of arbitrations on Fafaa 100.3 FM, Justice FM 98.5 Tamale, Swiss FM 93.7-Ho and Messiah TV on Amos 17. Live streaming on fafaafm.radiostream321.com, and live on Facebook pages with live video coverage.',
                icon: <Megaphone className="h-6 w-6" />,
              },
              {
                step: '06',
                title: 'Restoration & Forgiveness',
                description: 'The perpetrators are forgiven to "go and sin no more" and many of them end up accepting the Lord Jesus Christ as their personal Savior. Over 22 committed pastors from different denominations constitute "Intercessors of the Land" who continuously intercede through prayer programs on Fafaa 100.3 FM.',
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

          <motion.div {...fadeInUp} className="mt-8">
            <Card className="border-0 shadow-md bg-[#0B3C5D]/5">
              <CardContent className="p-6">
                <p className="text-[#6B4F3A] leading-relaxed text-sm">
                  The Duamenefa Foundation collaborates with its radio station Fafaa 100.3 which resonates on
                  the maxim <strong>&ldquo;Information for Intervention&rdquo;</strong> through collaboration
                  with the aforementioned stakeholders to fashion out modalities to always salvage the situation.
                  This is because the practices and beliefs show there have been innocent victims in families and
                  communities who suffer as they lose breadwinners and prominent citizens. The young women who are
                  offered in servitude to the gods are denied basic education and other relevant social amenities in
                  violation of their fundamental human rights. As society is constantly changing, we need to take a
                  second look at these practices of our forefathers and modify them to suit present day needs and
                  circumstances.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Objectives */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Our Objectives
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Broad <span className="text-[#D4AF37]">Objectives</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {broadObjectives.map((obj, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-lg bg-[#0B3C5D] text-white flex items-center justify-center shrink-0">
                        {obj.icon}
                      </div>
                      <p className="text-[#6B4F3A] leading-relaxed text-sm">{obj.text}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <h3 className="font-heading font-bold text-xl text-[#0B3C5D] mb-2">
                  Supplementary Objectives
                </h3>
                <p className="text-[#6B4F3A] text-sm mb-6">
                  These broad objectives are underpinned by the following supplementary objectives:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {supplementaryObjectives.map((obj, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-4 w-4 text-[#4C9A2A] shrink-0 mt-0.5" />
                      <span className="text-[#6B4F3A] text-sm leading-relaxed">{obj}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Key Questions */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <HelpCircle className="h-4 w-4 inline mr-1" />
              Critical Questions
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Imperative <span className="text-[#D4AF37]">Questions</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-3xl mx-auto">
              In line with the objectives, the following questions become very imperative and the program seeks
              to find an answer to all the relevant questions.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {keyQuestions.map((question, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <Card className="h-full border-0 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <span className="font-heading font-bold text-[#D4AF37] text-sm shrink-0">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <p className="text-[#6B4F3A] text-sm leading-relaxed">{question}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scope of Organisation / Stakeholders Conference */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Landmark className="h-4 w-4 inline mr-1" />
              Scope of Organisation
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Stakeholders&apos; <span className="text-[#D4AF37]">Conference</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-3xl mx-auto">
              The Duamenefa Foundation would embark on an opinion poll to be conducted within the Volta Region
              to seek the opinion of the general public on the need to embark on an advocacy project to enable
              the various communities to enact a bye-law through the various district and municipal assemblies,
              since the Constitution of the Republic of Ghana is silent on spiritual matters.
            </p>
          </motion.div>

          <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-lg mb-8">
              <CardContent className="p-6 md:p-8">
                <h3 className="font-heading font-bold text-lg text-[#0B3C5D] mb-4">
                  Conference Theme
                </h3>
                <div className="bg-[#0B3C5D] text-white p-4 rounded-lg mb-6">
                  <p className="font-heading font-semibold text-center leading-relaxed">
                    &ldquo;How do we eradicate the act of invocation of the wrath of gods, offering of human
                    beings as servitude to the gods and false prophecies and false prophetic revelations&rdquo;
                  </p>
                </div>
                <p className="text-[#6B4F3A] text-sm mb-4">
                  The Duamenefa Foundation under the auspices of Fafaa 100.3 FM in collaboration with other
                  relevant media networks would organize a stakeholders&apos; conference of all opinion leaders
                  of the Ewe speaking community where representatives of the following institutions and
                  associations shall make presentations:
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {stakeholderInstitutions.map((inst, index) => (
              <motion.div
                key={inst}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.03 }}
              >
                <div className="w-full rounded-lg bg-white shadow-sm flex items-center justify-center text-[#0B3C5D]/70 font-heading font-medium text-xs border border-gray-100 hover:border-[#D4AF37]/30 hover:shadow-md transition-all p-3 h-14 text-center">
                  {inst}
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeInUp} className="mt-8">
            <Card className="border-0 shadow-md bg-[#4C9A2A]/5">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="h-5 w-5 text-[#4C9A2A]" />
                  <h4 className="font-heading font-semibold text-[#0B3C5D]">Live Online Coverage</h4>
                </div>
                <p className="text-[#6B4F3A] text-sm leading-relaxed">
                  The program shall also be carried out live on the internet at{' '}
                  <a href="https://fafaafmonline.com" className="text-[#0B3C5D] underline font-medium" target="_blank" rel="noopener noreferrer">fafaafmonline.com</a>
                  {' '}and{' '}
                  <a href="https://duamenefafoundation.org" className="text-[#0B3C5D] underline font-medium" target="_blank" rel="noopener noreferrer">duamenefafoundation.org</a>
                  {' '}and other social media platforms.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Broadcast Schedule */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Radio className="h-4 w-4 inline mr-1" />
              Duration of Activities
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Broadcast <span className="text-[#D4AF37]">Schedule</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              The Duamenefa Foundation under the auspices of its radio the Fafaa 100.3 FM is conducting
              investigations and broadcasting for the purposes of interventions into the numerous petitions
              being received daily.
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
                        {schedule.type === 'TV' ? 'TV' : 'Radio'}
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

          <motion.div {...fadeInUp} className="mt-8">
            <Card className="border-0 shadow-md bg-[#0B3C5D]/5">
              <CardContent className="p-6">
                <p className="text-[#6B4F3A] leading-relaxed text-sm">
                  On a day of community public arbitration, the Duamenefa Foundation, under the auspices of
                  Fafaa 100.3 FM, collaborates with chiefs who are vested with the constitutional mandate to
                  go into traditional and spiritual arbitrations and other relevant stakeholders to resolve
                  and reverse diverse spiritual attacks on innocent citizens. Such arbitrations are aired live
                  for the whole day on the day and time set aside for such public events on the airwaves of
                  Fafaa 100.3 FM.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Significance of the Program */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp} className="max-w-4xl mx-auto">
            <span className="inline-block bg-[#4C9A2A]/10 text-[#4C9A2A] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Lightbulb className="h-4 w-4 inline mr-1" />
              Significance
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-6">
              Significance of the <span className="text-[#D4AF37]">Program</span>
            </h2>
            <Card className="border-0 shadow-lg">
              <CardContent className="p-8">
                <p className="text-[#6B4F3A] leading-relaxed mb-4">
                  The forum shall be used to educate the general public on the consequences of the aforementioned
                  practices and beliefs from the perspective of the 1992 Constitution and the laws of the Republic
                  of Ghana. Significantly, the fallout of the program will be a greater understanding of the
                  practices and beliefs of our people and how the encouragement of the positives and abolishing
                  of the negatives can propel us forward massively as a people.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed font-medium">
                  The abilities and capabilities of the people are unleashed towards the greater good upon the
                  fuller understanding that the key to a greater and a prosperous future of our Volta Region
                  is deep inside each and every one of us.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-24">
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
      <section className="py-16 md:py-24 bg-gray-50">
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
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              <Heart className="h-4 w-4 inline mr-1" />
              Duamenefa Operations
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Intervention for <span className="text-[#D4AF37]">Our Youth &amp; Community</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-3xl mx-auto">
              The youth are the future of our mother Ghana and it is imperative that we get involved in
              helping to secure a good future for them. Duamenefa Foundation has thus involved itself in
              several areas targeting the growth and wellbeing of the youth and the broader community.
            </p>
          </motion.div>

          <div className="space-y-8">
            {operations.map((op, index) => (
              <motion.div
                key={op.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-5">
                    <div className="relative h-56 lg:h-auto lg:col-span-2">
                      <img
                        src={op.image}
                        alt={op.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-[#0B3C5D]/15 to-transparent" />
                    </div>
                    <CardContent className="p-6 md:p-8 lg:col-span-3">
                      <div className="flex items-center gap-3 mb-2">
                        <div className={`w-10 h-10 rounded-lg ${op.color} text-white flex items-center justify-center`}>
                          {op.icon}
                        </div>
                        <h3 className="font-heading font-bold text-xl text-[#0B3C5D]">
                          {op.title}
                        </h3>
                      </div>
                      {op.subtitle && (
                        <p className="text-[#D4AF37] text-sm font-medium mb-3 italic">
                          {op.subtitle}
                        </p>
                      )}
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
                  <p className="font-heading font-bold text-[#D4AF37] text-2xl">610+</p>
                  <p className="text-white/60 text-sm">Conflicts Resolved</p>
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
              <Handshake className="h-4 w-4 inline mr-1" />
              Partnerships
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Our <span className="text-[#D4AF37]">Partners</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-3xl mx-auto">
              The Duamenefa Foundation collaborates with a wide range of stakeholders to achieve its
              mission of peace, justice, and community transformation.
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
              Fafaa 100.3 FM shall solicit sponsorship from well-meaning international charitable organizations,
              Ghanaians, Churches, the Business Community, NGOs, and the International Community.
            </p>
            <p className="text-white/50 text-sm mb-8">
              &ldquo;Information for Intervention&rdquo; &mdash; Fafaa 100.3 FM
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
