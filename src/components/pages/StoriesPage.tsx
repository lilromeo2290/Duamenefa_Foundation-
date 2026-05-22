'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { usePage } from '@/context/PageContext';
import {
  Heart,
  Unlock,
  Handshake,
  GraduationCap,
  ShieldCheck,
  Home,
  Users,
  ArrowRight,
  Quote,
  Play,
  TrendingUp,
} from 'lucide-react';

interface Story {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  image: string;
  before: string;
  after: string;
  impact: { label: string; value: string }[];
  quote: string;
  quotee: string;
  color: string;
}

const stories: Story[] = [
  {
    id: 'trokosi-woman',
    icon: <Unlock className="h-5 w-5" />,
    title: 'From Bondage to Freedom',
    subtitle: 'A Liberated Trokosi Woman\'s Journey',
    image: '/women-empowerment.jpg',
    before: 'Held in shrine servitude for over 15 years, denied basic human rights, education, and freedom of movement. Subjected to spiritual manipulation and forced labor.',
    after: 'Liberated through Duamenefa\'s advocacy program, received vocational training in tailoring, now runs her own business and mentors other liberated women in the community.',
    impact: [
      { label: 'Years in Bondage', value: '15' },
      { label: 'Years Free', value: '5' },
      { label: 'Women Mentored', value: '20+' },
    ],
    quote: 'Today, I am free. Not just from the shrine, but from the fear that held me captive for so long. Duamenefa gave me my life back.',
    quotee: 'Mawusi (Name Changed for Privacy)',
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 'peace-intervention',
    icon: <Handshake className="h-5 w-5" />,
    title: 'When Enemies Became Brothers',
    subtitle: 'Community Peace Intervention in a Land Dispute',
    image: '/reconciliation.jpg',
    before: 'Two communities in the Volta Region were locked in a violent land dispute spanning three decades. Lives were lost, properties destroyed, and generations grew up in fear and hatred.',
    after: 'Through Duamenefa\'s mediation program, both communities agreed to a peace dialogue. A landmark agreement was reached, boundaries were amicably settled, and a joint development committee was formed.',
    impact: [
      { label: 'Years of Conflict', value: '30' },
      { label: 'Lives Saved', value: '50+' },
      { label: 'Joint Projects', value: '3' },
    ],
    quote: 'We never thought peace was possible. But Duamenefa showed us that dialogue is stronger than weapons.',
    quotee: 'Torgbui Amenya, Community Elder',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 'youth-empowerment',
    icon: <GraduationCap className="h-5 w-5" />,
    title: 'Skills That Transform Lives',
    subtitle: 'Youth Empowerment Through Vocational Training',
    image: '/vocational-training.jpg',
    before: 'Unemployed and without prospects, many young people in rural communities were vulnerable to exploitation and radicalization. Limited access to education and skills training perpetuated the cycle of poverty.',
    after: 'Enrolled in Duamenefa\'s vocational training program, learned ICT and business management skills. Now employed at a local tech firm and supports his siblings\' education.',
    impact: [
      { label: 'Skills Acquired', value: '3' },
      { label: 'Income Increase', value: '400%' },
      { label: 'Siblings Supported', value: '4' },
    ],
    quote: 'The vocational training didn\'t just give me a skill — it gave me a future. Now I can support my family and contribute to my community.',
    quotee: 'Kofi, Vocational Training Graduate',
    color: 'bg-[#D4AF37]',
  },
  {
    id: 'child-rescue',
    icon: <ShieldCheck className="h-5 w-5" />,
    title: 'Rescued from Darkness',
    subtitle: 'A Child Rescued from Spiritual Abuse',
    image: '/children-education.jpg',
    before: 'A 12-year-old girl was subjected to spiritual rituals and denied access to education by community members who believed she was possessed. She lived in isolation and fear.',
    after: 'Duamenefa\'s child rights team intervened, secured her safety, enrolled her in school, and provided counseling. She is now thriving academically and advocates for children\'s rights.',
    impact: [
      { label: 'Age at Rescue', value: '12' },
      { label: 'Years in School', value: '4' },
      { label: 'Children Advocated For', value: '30+' },
    ],
    quote: 'They told me I was cursed. Duamenefa showed me I was loved. Now I want to be a lawyer to protect other children.',
    quotee: 'Abena (Name Changed for Privacy)',
    color: 'bg-[#6B4F3A]',
  },
  {
    id: 'family-reconciliation',
    icon: <Home className="h-5 w-5" />,
    title: 'A Family Restored',
    subtitle: 'Reconciled Family After Spiritual Conflict',
    image: '/community-outreach.jpg',
    before: 'A family was torn apart when a spiritual leader declared a curse on the household. Siblings stopped speaking, parents were estranged from children, and the family business collapsed.',
    after: 'Duamenefa\'s spiritual conflict resolution team facilitated dialogue, addressed the false prophecy, and brought the family together. They now run a joint family enterprise.',
    impact: [
      { label: 'Years Separated', value: '8' },
      { label: 'Family Members Reunited', value: '12' },
      { label: 'Business Revenue', value: 'Growing' },
    ],
    quote: 'We lost everything because of a lie. Duamenefa helped us see the truth and brought our family back together.',
    quotee: 'Mr. & Mrs. Dzamesi',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 'women-cooperative',
    icon: <Users className="h-5 w-5" />,
    title: 'Strength in Unity',
    subtitle: 'Women\'s Cooperative Success Story',
    image: '/women-empowerment.jpg',
    before: 'Widowed and single mothers in the community struggled to provide for their families. Without support networks or financial resources, they faced daily hardship and social stigma.',
    after: 'Formed a women\'s cooperative through Duamenefa\'s empowerment program, received micro-enterprise training and startup capital. The cooperative now has 45 members and runs multiple successful businesses.',
    impact: [
      { label: 'Cooperative Members', value: '45' },
      { label: 'Businesses Started', value: '6' },
      { label: 'Average Income Increase', value: '300%' },
    ],
    quote: 'Alone, I was struggling. Together, we are thriving. Our cooperative has given us economic power and a voice in our community.',
    quotee: 'Madam Adzo, Cooperative Leader',
    color: 'bg-[#4C9A2A]',
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function StoriesPage() {
  const { navigateTo } = usePage();

  return (
    <div className="pt-20 md:pt-28">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 left-1/4 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            💫 Stories of Hope
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Success <span className="text-[#D4AF37]">Stories</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Real stories of transformation — from conflict to peace, from bondage to
            freedom, from despair to hope. These are the lives your support changes.
          </p>
        </div>
      </section>

      {/* Stories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {stories.map((story, index) => (
              <motion.div
                key={story.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Card className="border-0 shadow-lg overflow-hidden">
                  <div className={`grid grid-cols-1 lg:grid-cols-2 ${index % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                    {/* Image */}
                    <div className={`relative h-64 lg:h-auto ${index % 2 === 1 ? 'lg:col-start-2' : ''}`}>
                      <img
                        src={story.image}
                        alt={story.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0B3C5D]/40 to-transparent" />
                      <div className="absolute top-4 left-4">
                        <div className={`${story.color} text-white p-2 rounded-lg`}>
                          {story.icon}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <CardContent className="p-6 md:p-8">
                      <Badge variant="secondary" className="bg-[#D4AF37]/10 text-[#D4AF37] mb-3">
                        {story.subtitle}
                      </Badge>
                      <h3 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-4">
                        {story.title}
                      </h3>

                      {/* Before/After */}
                      <div className="grid grid-cols-1 gap-4 mb-6">
                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                          <p className="text-xs font-bold text-red-600 uppercase mb-1">Before</p>
                          <p className="text-[#6B4F3A] text-sm leading-relaxed">
                            {story.before}
                          </p>
                        </div>
                        <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                          <p className="text-xs font-bold text-green-600 uppercase mb-1">After</p>
                          <p className="text-[#6B4F3A] text-sm leading-relaxed">
                            {story.after}
                          </p>
                        </div>
                      </div>

                      {/* Impact Stats */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {story.impact.map((stat) => (
                          <div
                            key={stat.label}
                            className="text-center p-3 bg-[#0B3C5D]/5 rounded-lg"
                          >
                            <p className="font-heading font-bold text-[#D4AF37]">
                              {stat.value}
                            </p>
                            <p className="text-[#6B4F3A] text-xs">{stat.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Quote */}
                      <div className="bg-gray-50 rounded-lg p-4 border-l-4 border-[#D4AF37]">
                        <Quote className="h-4 w-4 text-[#D4AF37] mb-2" />
                        <p className="text-[#6B4F3A] text-sm italic leading-relaxed mb-2">
                          {story.quote}
                        </p>
                        <p className="text-[#0B3C5D] text-xs font-semibold">
                          — {story.quotee}
                        </p>
                      </div>

                      {/* Video testimonial placeholder */}
                      <div className="mt-4 flex items-center gap-2 text-[#D4AF37] cursor-pointer hover:underline text-sm">
                        <Play className="h-4 w-4" />
                        Watch Video Testimonial
                      </div>
                    </CardContent>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-[#0B3C5D] to-[#0a2e47] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <TrendingUp className="h-12 w-12 text-[#D4AF37] mx-auto mb-4" />
            <h2 className="font-heading font-bold text-3xl mb-4">
              Help Write the Next <span className="text-[#D4AF37]">Success Story</span>
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              Every story of transformation started with someone like you. Your support
              can change a life forever.
            </p>
            <Button
              onClick={() => navigateTo('donate')}
              className="bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold px-8"
            >
              <Heart className="h-4 w-4 mr-2" />
              Donate to Change Lives
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
