'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ChevronDown,
  ChevronRight,
  Heart,
  ShieldCheck,
  Unlock,
  GraduationCap,
  Users,
  Radio,
  Award,
  BookOpen,
  HandHeart,
  Globe,
  Target,
  Scale,
  Trophy,
  Stethoscope,
  Church,
  PartyPopper,
  Accessibility,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

const sections = [
  { id: 'concept', label: 'The Concept Note' },
  { id: 'background', label: 'Background' },
  { id: 'purpose', label: 'Purpose / Aim' },
  { id: 'methodology', label: 'Methodology' },
  { id: 'objectives', label: 'Objectives' },
  { id: 'scope', label: 'Scope of Organisation' },
  { id: 'duration', label: 'Duration of Activities' },
  { id: 'significance', label: 'Significance' },
  { id: 'operations', label: 'Duamenefa Operations' },
  { id: 'milestone', label: 'Milestone' },
  { id: 'sponsorship', label: 'Sponsorship' },
];

const operations = [
  {
    icon: <Trophy className="h-6 w-6" />,
    title: 'Duamenefa Regional Tournament',
    color: 'bg-[#4C9A2A]',
    content: `The Duamenefa Foundation in collaboration with its radio the Fafaa 100.3 FM and several other stations throughout the Volta Region, each year since 2017, broadcast live, a large football tournament aptly named, The Duamenefa Super Gala and Marathon. The first year, 46 teams and 71 athletes registered to compete in our tournament and marathon. It was such a huge success, that in 2018, the newly appointed Regional Director of Sports had heard about this and came to witness the finale of the top four teams being showcased from the 77 football clubs and 77 athletes, women included competed hard to reach this pinnacle.`,
    content2: `The Regional Director of Sports declared his unwavering support in the name of the National Sports Authority and put the Duamenefa Super Gala and Marathon on the national sports calendar as a Regional Tournament. So, in 2019, The Duamenefa Regional Tournament, dubbed, "The Olympics of the Volta Region", registered 104 football clubs, including women's clubs, to complete in the largest football tournament in Ghana. From early June to mid-November these teams played and scouts from many nations came to seek out the top talent. Over 30,000 spectators, more than 100 chiefs, many pastors and other dignitaries came to support this spectacular event during its grand finale. More than 3,200 youth had participated avoiding the pitfalls and lures of crime and drugs with a very positive outlook. After the covid period of 2020 and 2021, the tournament once more took off with 61 teams competing in 2022 again drawing more spectators and dignitaries. In 2023, we had 115 football clubs competing for opportunities be scouted, chosen to participate in football camps in Ghana, Portugal and the UK for promotion and in 2024 we had 38 clubs under 17, 10 volleyball teams, 60 marathon athletes and six women's tug of "peace" teams competing.`,
  },
  {
    icon: <GraduationCap className="h-6 w-6" />,
    title: 'Educational Support',
    color: 'bg-[#D4AF37]',
    content: `Many brilliant students with good characters are stifled in their education due to the lack of funds. The Costheta Educational Support fund helps 20 such students each year who are entering universities to get a bit of help with a one-time gift for the extras needed for college life; food, accommodation, books, etc. We hope to see these numbers increase as we move forward in our commitment to promoting our youth. In 2025 we had 22 students awarded many gifts of laptop computers and more. Thus far 102 students have been awarded since its inception.`,
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Duamenefa Educational Study Abroad',
    color: 'bg-[#0B3C5D]',
    content: `Duamenefa Foundation and Rutgers University, New Jersey, USA have partnered to provide various scholarships for those eligible Duamenefa members or their wards who have obtained their first degree and are seeking furthering their education to master's or PhD.`,
  },
  {
    icon: <Church className="h-6 w-6" />,
    title: 'Evangelism and Soul Winning Through Social Intervention',
    color: 'bg-[#6B4F3A]',
    content: `Through an intense social intervention to rescue idol worshipers from spiritual attacks and setting the captives free, many convert to accept Christ Jesus as their Lord and personal Savior.`,
  },
  {
    icon: <HandHeart className="h-6 w-6" />,
    title: 'Single Parents',
    color: 'bg-[#4C9A2A]',
    content: `Whether single due to the death of a spouse, abandonment, divorce or sin, this situation should not be a lifelong handicap for these families. Through the collaboration with Treasure of His Eyes, an NGO based in the UK, the Duamenefa Foundation is helping to supply vocationally trained single parents with equipment and the help needed to grow and become financially sound and self-sufficient. This program has successfully enabled people to move forward, some now having apprentices working under them, multiplying the business and helping their children have the opportunity of education, life's necessities and a good home environment. Over 105 single parents have received equipment to empower them to success.`,
  },
  {
    icon: <BookOpen className="h-6 w-6" />,
    title: 'Skills Empowerment Training for Single Parents',
    color: 'bg-[#D4AF37]',
    content: `Fafaa 100.3 FM and its NGO, the Duamenefa Foundation collaborated with Treasure of His Eyes, a UK based NGO under country Director, Pastor Adefunke Adeoye, for its first three-day skills empowerment program in various skills training such as: Batik/Tie and Dye, Tailoring, Catering, Bead Making, Costume, Farming tips, Introduction to Broadcast Journalism and Liquid Soap Making.`,
    content2: `In the first Skills Empowerment held in March 2023, three-hundred and seventy-six (376) participants from various Municipalities and Districts (Ketu North, Keta, Akatsi South, Ketu South and Akatsi North) participated in the program.`,
  },
  {
    icon: <Accessibility className="h-6 w-6" />,
    title: 'Disabled',
    color: 'bg-[#0B3C5D]',
    content: `Reaching out to over 1,200 disabled and their caregivers in 2023 and visiting them to find out how we can help them in their situations, the intercessors of the land go out to pray for them and survey their needs. They are included in the single parents, the workshops for training and the giving of equipment. Much more is coming as the Foundation learns from their associations what is needed to help.`,
  },
  {
    icon: <Scale className="h-6 w-6" />,
    title: 'Jail Ministration',
    color: 'bg-[#6B4F3A]',
    content: `Each week, inmates of three local jails receive fresh drinking water and the Good News of Jesus Christ. Over the past five years, many souls have been born again. Bibles are distributed twice a year or as needed to each cell for study and sharing the Good News. A nice feast with gifts is held for the inmates at Yuletide.`,
  },
  {
    icon: <PartyPopper className="h-6 w-6" />,
    title: 'Fun Games',
    color: 'bg-[#4C9A2A]',
    content: `In most of the 550 communities in our catchment area, Duamenefa Foundation sponsors fun games which bring the community together for peaceful, competitive and fun social interaction. Youth and adults alike compete in various activities including; singing, games, races, reciting and talent competitions broadcast on our radio station; Fafaa 100.3 FM. This secures a strong community spirit where people are willing to work together for their betterment.`,
  },
  {
    icon: <Stethoscope className="h-6 w-6" />,
    title: 'Hospital Outreaches',
    color: 'bg-[#D4AF37]',
    content: `From prayer support and encouragement to helping the sick in the area hospitals, Duamenefa Foundation, through generous gifts of its partners, is now providing much needed assistance in making our hospitals the best. During the feeding of the entire population of two hospitals, one of our partners chose to adopt the children's ward at the Keta Municipal Hospital, providing renovation, equipment and supplies. Each quarter the greatest need within the ward is agreed upon, the project started and completed to the glory of God. The men's ward has also been adopted and work will begin soon. Duamenefa now serves six hospitals and two orphanages during the yuletide.`,
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Providing the Means for the Sick and Injured',
    color: 'bg-[#0B3C5D]',
    content: `Duamenefa Foundation has many requests for help coming in, but when the pictures arrive and the stories are told, God directs our Foundation to help. It is a commandment of God to love our neighbors and Duamenefa Foundation intends to fulfill all righteousness.`,
  },
];

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileTocOpen, setMobileTocOpen] = useState(false);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(id);
      setMobileTocOpen(false);
    }
  };

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
            About Us
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Duamenefa — <span className="text-[#D4AF37]">&ldquo;Let Us Co-Exist in Peace&rdquo;</span>
          </h1>
          <p className="text-white/70 max-w-3xl mx-auto text-lg">
            A Non-Governmental Organization with a membership of over 47,758 as of July 2025, committed to promoting peace and reconciliation in our various communities.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8 py-12">
          {/* Table of Contents - Desktop Sidebar */}
          <aside className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-28">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-5">
                  <h3 className="font-heading font-bold text-[#0B3C5D] mb-4 text-sm uppercase tracking-wider">
                    Contents
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => scrollToSection(s.id)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all duration-200 flex items-center gap-2 ${
                          activeSection === s.id
                            ? 'bg-[#D4AF37]/10 text-[#D4AF37] font-medium'
                            : 'text-[#6B4F3A] hover:bg-gray-50 hover:text-[#0B3C5D]'
                        }`}
                      >
                        <ChevronRight className="h-3 w-3 shrink-0" />
                        {s.label}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            </div>
          </aside>

          {/* Mobile Table of Contents */}
          <div className="lg:hidden fixed bottom-4 right-4 z-40">
            <Button
              onClick={() => setMobileTocOpen(!mobileTocOpen)}
              className="rounded-full w-12 h-12 shadow-lg bg-[#0B3C5D] hover:bg-[#0a2e47]"
            >
              <BookOpen className="h-5 w-5 text-white" />
            </Button>
            {mobileTocOpen && (
              <Card className="absolute bottom-14 right-0 w-64 border-0 shadow-xl z-50">
                <CardContent className="p-4 max-h-80 overflow-y-auto">
                  <h3 className="font-heading font-bold text-[#0B3C5D] mb-3 text-sm uppercase tracking-wider">
                    Contents
                  </h3>
                  <nav className="space-y-1">
                    {sections.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => scrollToSection(s.id)}
                        className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all flex items-center gap-2 ${
                          activeSection === s.id
                            ? 'bg-[#D4AF37]/10 text-[#D4AF37] font-medium'
                            : 'text-[#6B4F3A] hover:bg-gray-50'
                        }`}
                      >
                        <ChevronRight className="h-3 w-3 shrink-0" />
                        {s.label}
                      </button>
                    ))}
                  </nav>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0 space-y-16">

            {/* THE CONCEPT NOTE */}
            <motion.section id="concept" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#0B3C5D] flex items-center justify-center shrink-0">
                  <Target className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  The Concept Note
                </h2>
              </div>
              <div className="prose max-w-none">
                <p className="text-[#6B4F3A] leading-relaxed mb-4">
                  The Duamenefa Foundation is a Non-Governmental Organization, an (NGO) with a membership of over 47,758 (Forty-seven Thousand, Seven hundred-fifty-eight) as of 3rd July 2025, who have committed themselves to promoting peace and reconciliation in our various communities. Registration is ongoing. The word &ldquo;Duamenefa&rdquo; in the Ewe language literally means &ldquo;LET US CO-EXIST IN PEACE&rdquo;.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed mb-4">
                  The name was birthed as a result of an ongoing intervention radio program which airs every Sunday 7:00pm &ndash; 10:00pm, Tuesday 11:00am &ndash; 2:00pm and Thursday 11:00am &ndash; 2:00pm on Fafaa 100.3 FM and is streamed live on fafaafmonline.com, and on Facebook live pages: Fafaa100.3fm and Duamenefa Foundation as well as Ketaman Emmanuel Evortepe pages. In addition, the programs are broadcast live on Justice FM 98.5 in Tamale, Swiss FM 93.7-Ho, and Messiah TV &ndash; Amos 17.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed mb-4">
                  The &ldquo;Duamenefa&rdquo; program has succeeded in resolving over 610 hitherto antagonistic spiritual and diabolical conflicts ranging from:
                </p>
                <Card className="border-l-4 border-l-[#D4AF37] border-0 shadow-md mb-4">
                  <CardContent className="p-5 space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-[#D4AF37] font-bold text-sm shrink-0">(a)</span>
                      <p className="text-[#6B4F3A] text-sm">Invocation of the wrath of the &ldquo;gods&rdquo;</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#D4AF37] font-bold text-sm shrink-0">(b)</span>
                      <div className="text-[#6B4F3A] text-sm">
                        <p className="mb-2">Using human beings as servitude to the gods (Trokosi)</p>
                        <div className="pl-4 space-y-1.5 border-l-2 border-[#D4AF37]/30 ml-2">
                          <p>i. Child Rights Advocacy</p>
                          <p>ii. Intervention for total release of Trokosis</p>
                          <p>iii. Advocacy for the total eradication of using human beings in servitude to the gods (Trokosi system)</p>
                          <p>iv. Education and vocational training for the released Trokosis and orphans whose family were decimated by the invocation of the wrath of the gods</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-[#D4AF37] font-bold text-sm shrink-0">(c)</span>
                      <p className="text-[#6B4F3A] text-sm">Falsification of prophecies, counterfeit visions, and revelations by false prophets</p>
                    </div>
                  </CardContent>
                </Card>
                <p className="text-[#6B4F3A] leading-relaxed">
                  These are issues of spiritual and diabolical connotations which our traditional courts and the law enforcement agencies are not clothed with jurisdiction to handle.
                </p>
              </div>
            </motion.section>

            {/* THE BACKGROUND */}
            <motion.section id="background" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#6B4F3A] flex items-center justify-center shrink-0">
                  <BookOpen className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  The Background
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-[#6B4F3A] leading-relaxed">
                  There have been some irresistible calls into the investigation of some of the religious and cultural practices and beliefs of our people. Some of the practices and beliefs have been encouraged and some are still not well understood, therefore, the &ldquo;Duamenefa Foundation&rdquo; is undertaking investigation into some of these practices and beliefs so as to know more about them, to encourage those that will move us forward as a people and to discourage those that will not promote the common good.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed">
                  Some of these practices and beliefs have to do with the belief of most people that strange deaths in the community are due to fetish attacks and that prominent people in some families die because a member of the family has wronged some other person and that the person who has been wronged has sought the intervention of a fetish or a god and the result is that very prominent people in the family of the perpetrator die one after the other. In some of the cases, the perpetrator also dies eventually and following his death the practitioners of the fetish or the god then proceed to take away all the possessions of the deceased perpetrator.
                </p>
                <Card className="border-l-4 border-l-[#4C9A2A] border-0 shadow-md">
                  <CardContent className="p-5">
                    <p className="text-[#0B3C5D] font-heading font-semibold text-sm mb-2">Keta Municipal Assembly Bye-Law 3.6 of 2006</p>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed italic mb-2">
                      &ldquo;Cursing and invoking of the wrath of gods, which provides as follows; &lsquo;Any person or group of persons who curse by the gods or invokes the wrath of gods in one way or the other on another person or group of persons shall be guilty of an offence punishable by a fine not less than GH&#8373;20 or more than GH&#8373;50 in addition to two crates of schnapps, one gallon of Akpeteshie (local gin) two sheep and one goat&rsquo;&rdquo;
                    </p>
                    <p className="text-[#6B4F3A] text-sm">The above byelaw raises a lot of legal and social issues.</p>
                  </CardContent>
                </Card>
                <p className="text-[#6B4F3A] leading-relaxed">
                  Another topical practice has been the offering of young people mainly girls and young women as compensation to the gods. The Duamenefa Foundation therefore seeks to bring all these issues to the fore so that we as a people can deal with them dispassionately.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed">
                  The Duamenefa Foundation has succeeded in resolving over 610 thorny disputes ranging from the invocation of the wrath of the gods, attempted usages of charms and other diabolical means to the detriment of innocent citizens, using innocent young children in servitude to the gods, resolution of false prophecies that set families apart. Hence, the Duamenefa Foundation&rsquo;s radio educational programs enjoy the patronage of the young and the old. The Duamenefa Foundation has over 47,758 certified members (volunteers) made up of chiefs, opinion leaders and the public. There is daily registration of membership due to the high level of interest the program generates, and it is estimated that membership will double in the next two years.
                </p>
              </div>
            </motion.section>

            {/* PURPOSE / AIM */}
            <motion.section id="purpose" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#4C9A2A] flex items-center justify-center shrink-0">
                  <Target className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  Purpose / Aim
                </h2>
              </div>
              <p className="text-[#6B4F3A] leading-relaxed text-lg">
                The goal of the Duamenefa Foundation is to promote best practices in our various communities through the understanding of our various traditional, religious and cultural practices and beliefs.
              </p>
            </motion.section>

            {/* METHODOLOGY */}
            <motion.section id="methodology" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0">
                  <Scale className="h-5 w-5 text-[#0B3C5D]" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  Methodology
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-[#6B4F3A] leading-relaxed">
                  The Duamenefa Foundation receives written petitions for investigation and intervention from victims who have been traumatized, sick or people who lost innocent family members due to spiritual and diabolical attacks.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed font-medium">The copies of petitions directed at the relevant stakeholders such as:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    'The Traditional Rulers',
                    'The Ghana Police Force',
                    'The Commission for Human Right and Administrative Justice (CHRAJ)',
                    'The National Commission for Civic Education (NCCE)',
                    'The Department of Social Welfare and other relevant stakeholders',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded-lg px-4 py-3">
                      <span className="text-[#D4AF37] font-bold text-sm">{String.fromCharCode(97 + i)}</span>
                      <p className="text-[#6B4F3A] text-sm">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[#6B4F3A] leading-relaxed">
                  The Duamenefa Foundation delegates its journalists from Fafaa 100.3 FM to investigate the veracity of the petitions. This is followed by an on-air interrogation of the suspected perpetrators of the diabolical and spiritual crimes and the victims. There is also ongoing education on the matter through the participation of key resource people from the statutory state organizations mentioned above.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed">
                  In most cases, spiritual attacks are reversed through community traditional arbitrations where all stakeholders gather to arbitrate and resolve spiritual matters through the same processes that were used to inflict the harm and suffering on the victims. There is a live broadcast of the interventions of arbitrations on Fafaa 100.3 FM, Justice FM 98.5 Tamale, Swiss FM 93.7-Ho and Messiah TV- on Amos 17. Live streaming on fafaafmonline.com, and live on Facebook pages: Fafaa100.3fm and Duamenefa Foundation as well as Ketaman Emmanuel Evortepe and with live video coverage for all programs and during the arbitrations on Facebook live. All can be seen inside the posted stories on our websites covering the arbitration.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed">
                  The perpetrators are forgiven to &ldquo;go and sin no more&rdquo; and many of them end up accepting the Lord Jesus Christ as their personal Savior.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed">
                  The Duamenefa Foundation has over 22 committed pastors from different denominations who constituted themselves into an umbrella group known as &ldquo;Intercessors of the Land&rdquo; who continuously intercede for the land through prayer programs on Fafaa 100.3 FM.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed">
                  The Duamenefa Foundation collaborates with its radio station Fafaa 100.3 which resonates on the maxim &ldquo;Information for Intervention&rdquo; through collaboration with the stakeholders to fashion out modalities to always salvage the situation. This is because the practices and beliefs show there have been innocent victims in families and communities who suffer as they lose breadwinners and prominent citizens. The young women who are offered in servitude to the gods are denied basic education and other relevant social amenities in violation of their fundamental human rights. As society is constantly changing, we need to take a second look at these practices of our forefathers and modify them to suit present day needs and circumstances.
                </p>
              </div>
            </motion.section>

            {/* OBJECTIVES */}
            <motion.section id="objectives" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#0B3C5D] flex items-center justify-center shrink-0">
                  <ShieldCheck className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  Objectives
                </h2>
              </div>
              <p className="text-[#6B4F3A] leading-relaxed mb-4 font-medium">The broad objectives of the Duamenefa Foundation are to:</p>
              <div className="space-y-3 mb-6">
                {[
                  'Investigate the petitions received and publicly engage the perpetrators and stakeholders on its radio (Fafaa 100.3 FM) to unravel the mysteries behind the invocation of the wrath of the gods upon families.',
                  'Ensure that the stakeholders compel the perpetrators of these diabolical practices or crimes to reverse the invocations and save the families from spiritual death penalties.',
                  'Investigate petitions received on issues of demand by traditional deity practitioners to offer human beings, especially young females, as servitude to the gods. (Trokosi)',
                  'Investigate petitions on issues of false prophecies and revelations by false prophets who play on the psyche of innocent members of a particular church, extract money, set families apart and render their victims traumatized.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3 bg-[#0B3C5D]/5 rounded-lg p-4">
                    <span className="w-6 h-6 rounded-full bg-[#0B3C5D] text-white text-xs flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
              <p className="text-[#6B4F3A] leading-relaxed mb-4 font-medium">These broad objectives are underpinned by the following supplementary objectives which are to:</p>
              <div className="space-y-2">
                {[
                  'Seek the traditionalist perspective on the above subject matter, its advantages (if any) and its disadvantages to the society by means of interviewing key traditional rulers viz: the Traditional Chiefs, the Awoamefia of Anlo (the Paramount Ruler) or his authorized spokesperson and the various Divisional Chiefs',
                  'Seek the opinion of the worshipers of the deities who permit the act of the invocation of the wrath of the gods',
                  'Seek the opinion of the Christian community about the biblical perspective on this matter',
                  'Seek the opinion of the representative of the Ghana Bar Association on the matter',
                  'Seek the opinion of the Keta Municipal Assembly as to what informed their decision to promulgate the byelaw prohibiting invocation of the wrath of the gods',
                  'Seek the position of the law courts on the provisions of the aforementioned byelaw',
                  'Seek the opinion of the Islamic Community on the provisions of the Quran on the subject matter',
                  'An opinion poll of the public will also be conducted. A stakeholders\' conference will be convened to enable all parties involved in this matter to make a presentation on the subject matter under the caption, \'How do we eradicate the act of invocation of the wrath of gods, and abolish offering of human beings as servitude to the gods\' with case studies, documentaries, and proven testimonies from the custodians and practitioners of the deities or the gods.',
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ChevronRight className="h-4 w-4 text-[#D4AF37] shrink-0 mt-1" />
                    <p className="text-[#6B4F3A] text-sm leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </motion.section>

            {/* SCOPE OF ORGANISATION */}
            <motion.section id="scope" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#4C9A2A] flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  Scope of Organisation of the Program
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-[#6B4F3A] leading-relaxed">
                  The Duamenefa Foundation would embark on an opinion poll to be conducted within the Volta Region to seek the opinion of the general public on the need to embark on an advocacy project to enable the various communities to enact a bye-law through the various district and municipal assemblies as per what the Keta Municipal had done and also the modalities for enforcement of the laws since the Constitution of the Republic of Ghana is silent on spiritual matters.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed">
                  The Duamenefa Foundation under the auspices of Fafaa 100.3 FM in collaboration with other relevant media networks would organize a stakeholders&rsquo; conference of all opinion leaders of the Ewe speaking community where representatives of the following institutions and associations shall make presentations on the above topic, under the caption &ldquo;How do we eradicate the act of invocation of the wrath of the gods, offering of human beings as servitude to the gods and false prophecies and false prophetic revelations&rdquo;
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    'Office of The Regional Minister',
                    'Offices of the Members of Parliaments, Volta Region',
                    'Offices of the District and Municipal Chief Executives',
                    'Offices of Traditional Councils',
                    'The Ghana Bar Association (Regional Chapter)',
                    'Offices of The Commission on Human Right and Administrative Justice (CHRAJ)',
                    'The Ghana Psychic and Traditional Council, Volta Regional Chapter',
                    'The Trorxovi Regional Council',
                    'The Sofia Movement Council',
                    'The Regional Police Command, Volta Region',
                    'The Ewe Land Local Council of Churches',
                    'The Moslem Community',
                    'The Market Women Associations',
                    'The Ghana Private Road Transport Union of the TUC',
                    'The Ghana Information Service',
                    'The National Commission for Civic Education (NCCE)',
                    'The Ghana Education Service',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-gray-50 rounded px-3 py-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] shrink-0" />
                      <p className="text-[#6B4F3A] text-xs">{item}</p>
                    </div>
                  ))}
                </div>
                <p className="text-[#6B4F3A] leading-relaxed">
                  The program should also be carried out live on the internet at{' '}
                  <a href="https://fafaafmonline.com" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">fafaafmonline.com</a>
                  {' '}and{' '}
                  <a href="https://duamenefafoundation.org" target="_blank" rel="noopener noreferrer" className="text-[#D4AF37] hover:underline">duamenefafoundation.org</a>
                  {' '}and other social media platforms.
                </p>
              </div>
            </motion.section>

            {/* DURATION OF ACTIVITIES */}
            <motion.section id="duration" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#6B4F3A] flex items-center justify-center shrink-0">
                  <Radio className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  Duration of Activities
                </h2>
              </div>
              <div className="space-y-4">
                <p className="text-[#6B4F3A] leading-relaxed">
                  The Duamenefa Foundation under the auspices of its radio the Fafaa 100.3 FM is conducting investigations and broadcasting for the purposes of interventions into the numerous petitions being received daily. The program runs three times a week, Tuesdays from 11:00am to 2:00pm, Thursdays from 11:00am to 2:00pm and Sunday evenings between the hours of 7:00pm and 10:00pm.
                </p>
                <p className="text-[#6B4F3A] leading-relaxed">
                  On a day of community public arbitration, the Duamenefa Foundation, under the auspices of Fafaa 100.3 FM, collaborates with chiefs who are vested with the constitutional mandate to go into traditional and spiritual arbitrations and other relevant stakeholders to resolve and reverse diverse spiritual attacks on innocent citizens and such arbitrations are aired live for the whole day on the day and time set aside for such public events on the airwaves of Fafaa 100.3 FM.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Card className="border-0 shadow-md text-center">
                    <CardContent className="p-4">
                      <p className="text-[#D4AF37] font-heading font-bold text-lg">Sunday</p>
                      <p className="text-[#6B4F3A] text-sm">7:00pm &ndash; 10:00pm</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md text-center">
                    <CardContent className="p-4">
                      <p className="text-[#D4AF37] font-heading font-bold text-lg">Tuesday</p>
                      <p className="text-[#6B4F3A] text-sm">11:00am &ndash; 2:00pm</p>
                    </CardContent>
                  </Card>
                  <Card className="border-0 shadow-md text-center">
                    <CardContent className="p-4">
                      <p className="text-[#D4AF37] font-heading font-bold text-lg">Thursday</p>
                      <p className="text-[#6B4F3A] text-sm">11:00am &ndash; 2:00pm</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </motion.section>

            {/* SIGNIFICANCE */}
            <motion.section id="significance" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5 text-[#0B3C5D]" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  Significance of the Program
                </h2>
              </div>
              <p className="text-[#6B4F3A] leading-relaxed">
                The forum shall be used to educate the public on the consequences of the practices and beliefs from the perspective of the 1992 Constitution and the laws of the Republic of Ghana. Significantly, the fallout of the program will be a greater understanding of the practices and beliefs of our people and how the encouragement of the positives and abolishing of the negatives can propel us forward massively as a people as the abilities and capabilities of the people are unleashed towards the greater good upon the fuller understanding that the key to a greater and a prosperous future of our Volta Region is deep inside each and every one of us.
              </p>
            </motion.section>

            {/* DUAMENEFA OPERATIONS */}
            <motion.section id="operations" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#0B3C5D] flex items-center justify-center shrink-0">
                  <Heart className="h-5 w-5 text-[#D4AF37]" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  Duamenefa Operations
                </h2>
              </div>
              <Card className="border-l-4 border-l-[#4C9A2A] border-0 shadow-md mb-8">
                <CardContent className="p-5">
                  <p className="text-[#0B3C5D] font-heading font-semibold mb-2">Intervention for Our Youth</p>
                  <p className="text-[#6B4F3A] text-sm leading-relaxed">
                    The youth are the future of our mother Ghana, and it is imperative that we get involved in helping to secure a good future for them. Duamenefa Foundation has thus involved itself in several areas targeting the growth and wellbeing of the youth.
                  </p>
                </CardContent>
              </Card>
              <div className="space-y-6">
                {operations.map((op, i) => (
                  <Card key={i} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div className={`w-10 h-10 rounded-full ${op.color} text-white flex items-center justify-center shrink-0`}>
                          {op.icon}
                        </div>
                        <h3 className="font-heading font-bold text-lg text-[#0B3C5D]">
                          {op.title}
                        </h3>
                      </div>
                      <p className="text-[#6B4F3A] leading-relaxed text-sm">{op.content}</p>
                      {op.content2 && (
                        <p className="text-[#6B4F3A] leading-relaxed text-sm mt-3">{op.content2}</p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </motion.section>

            {/* MILESTONE */}
            <motion.section id="milestone" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#4C9A2A] flex items-center justify-center shrink-0">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  Milestone
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold px-3 py-1 rounded-full">SHORT-TERM</span>
                      <span className="text-[#6B4F3A] text-xs">5 &ndash; 10 Years</span>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'To investigate and intervene into petitions of human right abuses where spiritual powers are used to incapacitate innocent people',
                        'Register as many as 40,000 (Forty Thousand) members for the Duamenefa Foundation who will promote and champion peaceful coexistence of people through research, investigation and interventions into spiritual matters',
                        'Institute Regional Football and Marathon Annual Events where the hidden talents of the youth will be unearthed thereby creating a congenial platform for marketing same',
                        'Institute community fun clubs for the Duamenefa foundation where there will be periodic fun club games competitions of all age groups within the 550 communities',
                        'Formal collaboration and exchange of letters among the stakeholders',
                        'Link with other Christian NGOs in the diaspora to participate in this vision and win the suffering souls for the kingdom',
                        'To institute community leaders of the project who will report the activities of their various communities to the head office of the Foundation',
                        'To link with an NGO to support single parents who lost their husbands/wives through the invocations of the wrath of the gods or divorcees',
                        'Periodic training activities within and outside Ghana for selected members of the Foundation',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="h-3.5 w-3.5 text-[#D4AF37] shrink-0 mt-1" />
                          <p className="text-[#6B4F3A] text-sm leading-relaxed">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <span className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs font-bold px-3 py-1 rounded-full">LONG-TERM</span>
                      <span className="text-[#6B4F3A] text-xs">10 &ndash; 20 Years</span>
                    </div>
                    <ul className="space-y-3">
                      {[
                        'The Duamenefa Foundation shall champion the establishment of a Vocational School to train and empower the vulnerable',
                        'The Duamenefa Foundation shall celebrate and give awards to communities who recorded zero violations of the three thematic areas mentioned above',
                      ].map((item, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <ChevronRight className="h-3.5 w-3.5 text-[#4C9A2A] shrink-0 mt-1" />
                          <p className="text-[#6B4F3A] text-sm leading-relaxed">{item}</p>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </motion.section>

            {/* SPONSORSHIP */}
            <motion.section id="sponsorship" {...fadeInUp}>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-[#D4AF37] flex items-center justify-center shrink-0">
                  <HandHeart className="h-5 w-5 text-[#0B3C5D]" />
                </div>
                <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D]">
                  Sponsorship
                </h2>
              </div>
              <p className="text-[#6B4F3A] leading-relaxed mb-6">
                Fafaa 100.3 FM shall solicit sponsorship from well-meaning international charitable organizations Ghanaians, Churches, the Business Community, NGO&rsquo;s and the International Community.
              </p>
              <Card className="border-l-4 border-l-[#D4AF37] border-0 shadow-md bg-[#0B3C5D]/5">
                <CardContent className="p-6">
                  <p className="text-[#0B3C5D] font-heading font-bold text-lg mb-1">Emmanuel Ketaman Evortepe</p>
                  <p className="text-[#D4AF37] text-sm font-medium mb-1">Executive President, Duamenefa Foundation</p>
                  <p className="text-[#6B4F3A] text-sm">CEO, Fafaa 100.3 FM</p>
                </CardContent>
              </Card>
            </motion.section>

          </main>
        </div>
      </div>
    </div>
  );
}
