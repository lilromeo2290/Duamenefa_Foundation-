'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  Child,
  ShieldCheck,
  GraduationCap,
  HandHeart,
  CreditCard,
  Smartphone,
  DollarSign,
  CheckCircle,
  TrendingUp,
  Users,
  BookOpen,
  RefreshCw,
  ArrowRight,
  Shield,
  BarChart3,
} from 'lucide-react';

const donationAmounts = [25, 50, 100, 250, 500];

const impactItems = [
  { amount: 25, icon: <BookOpen className="h-5 w-5" />, description: 'Provides school supplies for one child for an entire year', color: 'text-[#4C9A2A]' },
  { amount: 50, icon: <Child className="h-5 w-5" />, description: 'Covers counseling sessions for a child rescued from abuse', color: 'text-[#0B3C5D]' },
  { amount: 100, icon: <ShieldCheck className="h-5 w-5" />, description: 'Funds a community mediation session for conflict resolution', color: 'text-[#6B4F3A]' },
  { amount: 250, icon: <GraduationCap className="h-5 w-5" />, description: 'Sponsors vocational training for one liberated individual', color: 'text-[#D4AF37]' },
  { amount: 500, icon: <HandHeart className="h-5 w-5" />, description: 'Supports a full peace intervention in a conflict community', color: 'text-[#4C9A2A]' },
];

const donationCategories = [
  { icon: <Child className="h-6 w-6" />, title: 'Sponsor a Child', description: 'Provide education, meals, and protection for a vulnerable child', color: 'bg-[#0B3C5D]' },
  { icon: <ShieldCheck className="h-6 w-6" />, title: 'Support Peace Campaigns', description: 'Fund community mediation and peace-building initiatives', color: 'bg-[#D4AF37]' },
  { icon: <GraduationCap className="h-6 w-6" />, title: 'Fund Education', description: 'Provide scholarships and learning materials for students', color: 'bg-[#4C9A2A]' },
  { icon: <Heart className="h-6 w-6" />, title: 'Support Rehabilitation', description: 'Help liberated individuals rebuild their lives with dignity', color: 'bg-[#6B4F3A]' },
];

const financialHighlights = [
  { label: 'Programs & Services', percentage: 75, color: 'bg-[#0B3C5D]' },
  { label: 'Administration', percentage: 12, color: 'bg-[#D4AF37]' },
  { label: 'Fundraising', percentage: 8, color: 'bg-[#4C9A2A]' },
  { label: 'Reserve & Growth', percentage: 5, color: 'bg-[#6B4F3A]' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [isRecurring, setIsRecurring] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(0);

  const displayAmount = customAmount || (selectedAmount ? `$${selectedAmount}` : '');

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
            💛 Make a Difference
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Donate to <span className="text-[#D4AF37]">Transform Lives</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Your generous donation empowers communities, liberates the oppressed, and
            builds a more peaceful world. Every contribution matters.
          </p>
        </div>
      </section>

      {/* Donation Form & Categories */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Donation Form */}
            <div className="lg:col-span-2">
              <motion.div {...fadeInUp}>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-6">
                      Make Your Donation
                    </h2>

                    {/* One-time / Monthly Toggle */}
                    <div className="flex items-center gap-3 mb-6 p-1 bg-gray-100 rounded-lg w-fit">
                      <button
                        onClick={() => setIsRecurring(false)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          !isRecurring
                            ? 'bg-[#0B3C5D] text-white shadow-sm'
                            : 'text-[#6B4F3A] hover:text-[#0B3C5D]'
                        }`}
                      >
                        One-Time
                      </button>
                      <button
                        onClick={() => setIsRecurring(true)}
                        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                          isRecurring
                            ? 'bg-[#0B3C5D] text-white shadow-sm'
                            : 'text-[#6B4F3A] hover:text-[#0B3C5D]'
                        }`}
                      >
                        Monthly
                      </button>
                    </div>

                    {/* Amount Selection */}
                    <div className="mb-6">
                      <label className="text-sm font-medium text-[#0B3C5D] mb-3 block">
                        Select Donation Amount
                      </label>
                      <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-3">
                        {donationAmounts.map((amount) => (
                          <button
                            key={amount}
                            onClick={() => {
                              setSelectedAmount(amount);
                              setCustomAmount('');
                            }}
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
                          onChange={(e) => {
                            setCustomAmount(e.target.value);
                            setSelectedAmount(null);
                          }}
                          className="pl-9 border-gray-200 focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    {/* Donation Category */}
                    <div className="mb-6">
                      <label className="text-sm font-medium text-[#0B3C5D] mb-3 block">
                        Donation Category
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {donationCategories.map((cat, index) => (
                          <button
                            key={cat.title}
                            onClick={() => setSelectedCategory(index)}
                            className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${
                              selectedCategory === index
                                ? 'border-[#D4AF37] bg-[#D4AF37]/5'
                                : 'border-gray-200 hover:border-[#D4AF37]/50'
                            }`}
                          >
                            <div className={`${cat.color} text-white p-2 rounded-lg inline-flex mb-2`}>
                              {cat.icon}
                            </div>
                            <h4 className="font-heading font-semibold text-[#0B3C5D] text-sm">
                              {cat.title}
                            </h4>
                            <p className="text-[#6B4F3A] text-xs mt-1">{cat.description}</p>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Donor Info */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div>
                        <label className="text-sm font-medium text-[#0B3C5D] mb-1 block">
                          Full Name
                        </label>
                        <Input placeholder="Your full name" className="border-gray-200 focus:border-[#D4AF37]" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-[#0B3C5D] mb-1 block">
                          Email Address
                        </label>
                        <Input type="email" placeholder="Your email" className="border-gray-200 focus:border-[#D4AF37]" />
                      </div>
                    </div>

                    {/* Payment Methods */}
                    <div className="mb-6">
                      <label className="text-sm font-medium text-[#0B3C5D] mb-3 block">
                        Payment Method
                      </label>
                      <div className="grid grid-cols-3 gap-3">
                        <button className="p-4 rounded-lg border-2 border-[#D4AF37] bg-[#D4AF37]/5 flex flex-col items-center gap-2">
                          <CreditCard className="h-6 w-6 text-[#0B3C5D]" />
                          <span className="text-xs font-medium text-[#0B3C5D]">Visa / Mastercard</span>
                        </button>
                        <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#D4AF37]/50 flex flex-col items-center gap-2">
                          <Smartphone className="h-6 w-6 text-[#6B4F3A]" />
                          <span className="text-xs font-medium text-[#6B4F3A]">Mobile Money</span>
                        </button>
                        <button className="p-4 rounded-lg border-2 border-gray-200 hover:border-[#D4AF37]/50 flex flex-col items-center gap-2">
                          <DollarSign className="h-6 w-6 text-[#6B4F3A]" />
                          <span className="text-xs font-medium text-[#6B4F3A]">PayPal</span>
                        </button>
                      </div>
                    </div>

                    <Button className="w-full bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold py-6 text-lg">
                      <Heart className="h-5 w-5 mr-2" />
                      {isRecurring ? 'Set Up Monthly Donation' : 'Donate Now'}{' '}
                      {displayAmount && `— ${isRecurring ? displayAmount + '/month' : displayAmount}`}
                    </Button>

                    <div className="flex items-center justify-center gap-2 mt-4 text-[#6B4F3A]/60 text-xs">
                      <Shield className="h-3 w-3" />
                      <span>Your payment is secure and encrypted</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Impact & Transparency */}
            <div className="space-y-6">
              {/* Impact Calculator */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg text-[#0B3C5D] mb-4 flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-[#D4AF37]" />
                      Your Impact
                    </h3>
                    <div className="space-y-4">
                      {impactItems.map((item) => (
                        <div
                          key={item.amount}
                          className={`flex items-start gap-3 p-3 rounded-lg transition-colors ${
                            selectedAmount === item.amount || (customAmount && parseInt(customAmount) >= item.amount)
                              ? 'bg-[#D4AF37]/5 border border-[#D4AF37]/20'
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className={item.color}>{item.icon}</div>
                          <div>
                            <p className="font-heading font-semibold text-[#0B3C5D] text-sm">
                              ${item.amount}
                            </p>
                            <p className="text-[#6B4F3A] text-xs">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Financial Transparency */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg text-[#0B3C5D] mb-4 flex items-center gap-2">
                      <BarChart3 className="h-5 w-5 text-[#D4AF37]" />
                      Financial Accountability
                    </h3>
                    <p className="text-[#6B4F3A] text-sm mb-4">
                      We are committed to transparency. Here&apos;s how your donations are allocated:
                    </p>
                    <div className="space-y-3">
                      {financialHighlights.map((item) => (
                        <div key={item.label}>
                          <div className="flex items-center justify-between text-sm mb-1">
                            <span className="text-[#0B3C5D] font-medium">{item.label}</span>
                            <span className="text-[#D4AF37] font-heading font-semibold">
                              {item.percentage}%
                            </span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-2">
                            <div
                              className={`${item.color} h-2 rounded-full transition-all duration-1000`}
                              style={{ width: `${item.percentage}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                    <Separator className="my-4" />
                    <div className="flex items-center gap-2 text-[#4C9A2A]">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-xs font-medium">Audited annually by independent firm</span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
