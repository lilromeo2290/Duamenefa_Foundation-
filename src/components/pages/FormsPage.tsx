'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { usePage } from '@/context/PageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Heart,
  ClipboardList,
  FileText,
  Users,
  HandHeart,
  ShieldCheck,
  GraduationCap,
  Baby,
  Stethoscope,
  Scale,
  MessageCircle,
  Monitor,
  Radio,
  Megaphone,
  Languages,
  Building,
  Calendar,
  MapPin,
  Clock,
  DollarSign,
  CreditCard,
  Smartphone,
  CheckCircle,
  ArrowRight,
  Download,
} from 'lucide-react';

const availableForms = [
  {
    id: 'volunteer',
    icon: <Users className="h-6 w-6" />,
    title: 'Volunteer Application',
    description: 'Join our team of dedicated volunteers and contribute your skills to peace-building, advocacy, and community transformation across Ghana.',
    color: 'bg-[#4C9A2A]',
  },
  {
    id: 'donate',
    icon: <Heart className="h-6 w-6" />,
    title: 'Donation Form',
    description: 'Support our mission financially. Your generous donation empowers communities, liberates the oppressed, and builds a more peaceful world.',
    color: 'bg-[#D4AF37]',
  },
  {
    id: 'report',
    icon: <ShieldCheck className="h-6 w-6" />,
    title: 'Incident Report',
    description: 'Report cases of child abuse, shrine servitude, spiritual manipulation, or community conflict. All reports are handled confidentially.',
    color: 'bg-[#0B3C5D]',
  },
  {
    id: 'partnership',
    icon: <HandHeart className="h-6 w-6" />,
    title: 'Partnership Request',
    description: 'Propose a partnership or collaboration with Duamenefa Foundation. We welcome partnerships with organizations that share our vision of peace.',
    color: 'bg-[#6B4F3A]',
  },
];

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

const donationAmounts = [25, 50, 100, 250, 500];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function FormsPage() {
  const [activeForm, setActiveForm] = useState('volunteer');
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { navigateTo } = usePage();

  const toggleSkill = (id: string) => {
    setSelectedSkills((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

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
            <ClipboardList className="h-4 w-4 inline mr-1" />
            Forms & Applications
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Our <span className="text-[#D4AF37]">Forms</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Complete the relevant form to volunteer, donate, report an incident, or request a partnership.
            Each form is designed to help us serve you and our communities better.
          </p>
        </div>
      </section>

      {/* Form Selection & Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Form Type Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {availableForms.map((form, index) => (
              <motion.div
                key={form.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <button
                  onClick={() => { setActiveForm(form.id); setSubmitted(false); }}
                  className={`w-full text-left p-5 rounded-xl border-2 transition-all duration-300 h-full ${
                    activeForm === form.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/5 shadow-md'
                      : 'border-gray-100 hover:border-[#D4AF37]/50 hover:shadow-sm'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-lg ${form.color} text-white flex items-center justify-center mb-3`}>
                    {form.icon}
                  </div>
                  <h3 className="font-heading font-semibold text-[#0B3C5D] text-sm mb-1">
                    {form.title}
                  </h3>
                  <p className="text-[#6B4F3A]/70 text-xs line-clamp-2">
                    {form.description}
                  </p>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Active Form */}
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-2xl mx-auto"
            >
              <Card className="border-0 shadow-lg text-center py-16">
                <CardContent>
                  <CheckCircle className="h-16 w-16 text-[#4C9A2A] mx-auto mb-4" />
                  <h3 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-2">
                    Form Submitted Successfully!
                  </h3>
                  <p className="text-[#6B4F3A] mb-6">
                    Thank you for your submission. Our team will review it and get back to you within 48 hours.
                  </p>
                  <Button
                    onClick={() => setSubmitted(false)}
                    className="bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold"
                  >
                    Submit Another Form
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            <>
              {/* Volunteer Form */}
              {activeForm === 'volunteer' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#4C9A2A] text-white flex items-center justify-center">
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="font-heading font-bold text-2xl text-[#0B3C5D]">
                            Volunteer Application
                          </h2>
                          <p className="text-[#6B4F3A] text-sm">
                            Join our team and make a difference in communities across Ghana
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Personal Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Full Name *</Label>
                            <Input required placeholder="Your full name" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Email Address *</Label>
                            <Input required type="email" placeholder="Your email" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Phone Number *</Label>
                            <Input required type="tel" placeholder="+233 XX XXX XXXX" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Location</Label>
                            <Input placeholder="City, Region" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                        </div>

                        {/* Skills */}
                        <div>
                          <Label className="text-sm font-medium text-[#0B3C5D] mb-3 block">
                            Your Skills (Select all that apply)
                          </Label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {skills.map((skill) => (
                              <button
                                key={skill.id}
                                type="button"
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

                        {/* Availability */}
                        <div>
                          <Label className="text-sm font-medium text-[#0B3C5D] mb-3 block">Availability</Label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {['Full-Time', 'Part-Time', 'Weekends', 'Remote'].map((option) => (
                              <div key={option} className="flex items-center gap-2">
                                <Checkbox id={`vol-${option}`} />
                                <Label htmlFor={`vol-${option}`} className="text-sm text-[#6B4F3A] cursor-pointer">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Motivation */}
                        <div>
                          <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                            Why do you want to volunteer with us?
                          </Label>
                          <Textarea
                            placeholder="Tell us about your motivation and what you hope to contribute..."
                            className="border-gray-200 focus:border-[#D4AF37] min-h-[100px]"
                          />
                        </div>

                        <Button type="submit" className="w-full bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold py-6">
                          <Heart className="h-5 w-5 mr-2" />
                          Submit Volunteer Application
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Donation Form */}
              {activeForm === 'donate' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#D4AF37] text-[#0B3C5D] flex items-center justify-center">
                          <Heart className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="font-heading font-bold text-2xl text-[#0B3C5D]">
                            Donation Form
                          </h2>
                          <p className="text-[#6B4F3A] text-sm">
                            Your generosity transforms lives and builds peace
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Amount Selection */}
                        <div>
                          <Label className="text-sm font-medium text-[#0B3C5D] mb-3 block">
                            Select Donation Amount
                          </Label>
                          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
                            {donationAmounts.map((amount) => (
                              <button
                                key={amount}
                                type="button"
                                onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                                className={`py-3 px-4 rounded-lg border-2 font-heading font-semibold transition-all duration-200 ${
                                  selectedAmount === amount && !customAmount
                                    ? 'border-[#D4AF37] bg-[#D4AF37]/10 text-[#0B3C5D]'
                                    : 'border-gray-200 text-[#6B4F3A] hover:border-[#D4AF37]/50'
                                }`}
                              >
                                ${amount}
                              </button>
                            ))}
                          </div>
                          <div className="relative">
                            <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B4F3A]/50" />
                            <Input
                              type="number"
                              placeholder="Custom amount"
                              value={customAmount}
                              onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(null); }}
                              className="pl-9 border-gray-200 focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>

                        {/* Donor Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Full Name *</Label>
                            <Input required placeholder="Your full name" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Email Address *</Label>
                            <Input required type="email" placeholder="Your email" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                        </div>

                        {/* Payment Methods */}
                        <div>
                          <Label className="text-sm font-medium text-[#0B3C5D] mb-3 block">Payment Method</Label>
                          <div className="grid grid-cols-3 gap-3">
                            <button type="button" className="p-4 rounded-lg border-2 border-[#D4AF37] bg-[#D4AF37]/5 flex flex-col items-center gap-2">
                              <CreditCard className="h-6 w-6 text-[#0B3C5D]" />
                              <span className="text-xs font-medium text-[#0B3C5D]">Visa / Mastercard</span>
                            </button>
                            <button type="button" className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#D4AF37]/50 flex flex-col items-center gap-2">
                              <Smartphone className="h-6 w-6 text-[#6B4F3A]" />
                              <span className="text-xs font-medium text-[#6B4F3A]">Mobile Money</span>
                            </button>
                            <button type="button" className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#D4AF37]/50 flex flex-col items-center gap-2">
                              <DollarSign className="h-6 w-6 text-[#6B4F3A]" />
                              <span className="text-xs font-medium text-[#6B4F3A]">PayPal</span>
                            </button>
                          </div>
                        </div>

                        <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold py-6 text-lg">
                          <Heart className="h-5 w-5 mr-2" />
                          Donate Now
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Incident Report Form */}
              {activeForm === 'report' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#0B3C5D] text-white flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="font-heading font-bold text-2xl text-[#0B3C5D]">
                            Incident Report
                          </h2>
                          <p className="text-[#6B4F3A] text-sm">
                            All reports are handled confidentially and with utmost care
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Reporter Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Your Name (Optional)</Label>
                            <Input placeholder="Your name or &quot;Anonymous&quot;" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Contact Information (Optional)</Label>
                            <Input placeholder="Phone or email for follow-up" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                        </div>

                        {/* Incident Type */}
                        <div>
                          <Label className="text-sm font-medium text-[#0B3C5D] mb-3 block">
                            Type of Incident *
                          </Label>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            {[
                              { id: 'child-abuse', label: 'Child Abuse' },
                              { id: 'trokosi', label: 'Shrine Servitude' },
                              { id: 'spiritual', label: 'Spiritual Manipulation' },
                              { id: 'conflict', label: 'Community Conflict' },
                            ].map((type) => (
                              <div key={type.id} className="flex items-center gap-2">
                                <Checkbox id={type.id} />
                                <Label htmlFor={type.id} className="text-sm text-[#6B4F3A] cursor-pointer">
                                  {type.label}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Location & Date */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Location of Incident *</Label>
                            <Input required placeholder="Village, Town, Region" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Date of Incident</Label>
                            <Input type="date" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                        </div>

                        {/* Description */}
                        <div>
                          <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                            Detailed Description *
                          </Label>
                          <Textarea
                            required
                            placeholder="Please provide as much detail as possible about the incident..."
                            className="border-gray-200 focus:border-[#D4AF37] min-h-[150px]"
                          />
                        </div>

                        <div className="bg-[#0B3C5D]/5 rounded-lg p-4 text-sm text-[#6B4F3A] flex items-start gap-2">
                          <ShieldCheck className="h-4 w-4 text-[#0B3C5D] shrink-0 mt-0.5" />
                          <span>Your report will be kept strictly confidential. We take all reports seriously and will take appropriate action.</span>
                        </div>

                        <Button type="submit" className="w-full bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold py-6">
                          <FileText className="h-5 w-5 mr-2" />
                          Submit Incident Report
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}

              {/* Partnership Request Form */}
              {activeForm === 'partnership' && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#6B4F3A] text-white flex items-center justify-center">
                          <HandHeart className="h-5 w-5" />
                        </div>
                        <div>
                          <h2 className="font-heading font-bold text-2xl text-[#0B3C5D]">
                            Partnership Request
                          </h2>
                          <p className="text-[#6B4F3A] text-sm">
                            Collaborate with us to create lasting impact
                          </p>
                        </div>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Organization Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Organization Name *</Label>
                            <Input required placeholder="Your organization name" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Contact Person *</Label>
                            <Input required placeholder="Full name" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Email Address *</Label>
                            <Input required type="email" placeholder="Email" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Phone Number</Label>
                            <Input type="tel" placeholder="+233 XX XXX XXXX" className="border-gray-200 focus:border-[#D4AF37]" />
                          </div>
                        </div>

                        {/* Partnership Type */}
                        <div>
                          <Label className="text-sm font-medium text-[#0B3C5D] mb-3 block">
                            Type of Partnership *
                          </Label>
                          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                            {[
                              'Program Collaboration',
                              'Funding Support',
                              'Technical Assistance',
                              'Research Partnership',
                              'Media Partnership',
                              'Community Outreach',
                            ].map((type) => (
                              <div key={type} className="flex items-center gap-2">
                                <Checkbox id={`p-${type}`} />
                                <Label htmlFor={`p-${type}`} className="text-sm text-[#6B4F3A] cursor-pointer">
                                  {type}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Proposal */}
                        <div>
                          <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                            Partnership Proposal *
                          </Label>
                          <Textarea
                            required
                            placeholder="Describe your proposed partnership, objectives, and how it aligns with our mission..."
                            className="border-gray-200 focus:border-[#D4AF37] min-h-[150px]"
                          />
                        </div>

                        <Button type="submit" className="w-full bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold py-6">
                          <HandHeart className="h-5 w-5 mr-2" />
                          Submit Partnership Request
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </motion.div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Downloadable Resources */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div className="text-center mb-12" {...fadeInUp}>
            <span className="inline-block bg-[#0B3C5D]/10 text-[#0B3C5D] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
              Resources
            </span>
            <h2 className="font-heading font-bold text-3xl md:text-4xl text-[#0B3C5D] mb-4">
              Downloadable <span className="text-[#D4AF37]">Resources</span>
            </h2>
            <p className="text-[#6B4F3A] max-w-2xl mx-auto">
              Access our forms, guidelines, and informational documents to learn more about our programs and how you can get involved.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Volunteer Guidelines',
                description: 'Complete guide for volunteers including code of conduct, safety protocols, and expectations for all Duamenefa Foundation programs.',
                type: 'PDF',
                size: '2.4 MB',
              },
              {
                title: 'Child Protection Policy',
                description: 'Our comprehensive policy outlining procedures for protecting children from abuse, exploitation, and neglect in all our programs.',
                type: 'PDF',
                size: '1.8 MB',
              },
              {
                title: 'Annual Report 2024',
                description: 'Detailed report on our activities, impact, financial accountability, and plans for the upcoming year across all program areas.',
                type: 'PDF',
                size: '5.2 MB',
              },
            ].map((resource, index) => (
              <motion.div
                key={resource.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-md hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-lg bg-red-100 text-red-600 flex items-center justify-center">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <Badge variant="secondary" className="bg-red-100 text-red-600 text-xs">
                          {resource.type}
                        </Badge>
                        <span className="text-xs text-[#6B4F3A]/60 ml-2">{resource.size}</span>
                      </div>
                    </div>
                    <h3 className="font-heading font-semibold text-[#0B3C5D] mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-[#6B4F3A] text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <Button
                      variant="outline"
                      className="w-full border-[#0B3C5D] text-[#0B3C5D] hover:bg-[#0B3C5D] hover:text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download
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
