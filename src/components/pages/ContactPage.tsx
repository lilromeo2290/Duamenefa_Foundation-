'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Clock,
  Send,
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  Globe,
  CheckCircle,
  Building,
  FileText,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

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
          <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-72 h-72 rounded-full bg-[#4C9A2A] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            Get in Touch
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Contact <span className="text-[#D4AF37]">Us</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            We would love to hear from you. Whether you have questions, want to volunteer,
            or need assistance, our team is here to help.
          </p>
        </div>
      </section>

      {/* Contact Addresses & Form */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Two Address Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Ghana Address */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-0 shadow-lg h-full">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <Building className="h-6 w-6 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-xl text-[#0B3C5D]">
                        Ghana Office
                      </h2>
                      <p className="text-[#6B4F3A] text-sm">Duamenefa Foundation</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#0B3C5D] font-medium text-sm">Address</p>
                        <p className="text-[#6B4F3A] text-sm">
                          FAFAA 100.3 FM Premises<br />
                          PO BOX DZ125<br />
                          Dzodze, Volta Region
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#0B3C5D] font-medium text-sm">Email</p>
                        <a
                          href="mailto:duamenefafoundation@yahoo.com"
                          className="text-[#D4AF37] text-sm hover:underline"
                        >
                          duamenefafoundation@yahoo.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#0B3C5D] font-medium text-sm">Phone</p>
                        <a
                          href="tel:+233242313766"
                          className="text-[#6B4F3A] text-sm hover:text-[#D4AF37]"
                        >
                          +233 242 313 766
                        </a>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* U.S. Address */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="border-0 shadow-lg h-full">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-full bg-[#0B3C5D]/10 flex items-center justify-center">
                      <Globe className="h-6 w-6 text-[#0B3C5D]" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-xl text-[#0B3C5D]">
                        U.S. Office
                      </h2>
                      <p className="text-[#6B4F3A] text-sm">Duamenefa Foundation</p>
                    </div>
                  </div>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-[#0B3C5D] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#0B3C5D] font-medium text-sm">Address</p>
                        <p className="text-[#6B4F3A] text-sm">
                          Duamenefa Foundation<br />
                          PO BOX 2717<br />
                          Albertville, Alabama, USA
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-[#0B3C5D] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#0B3C5D] font-medium text-sm">Phone</p>
                        <a
                          href="tel:+12033051152"
                          className="text-[#6B4F3A] text-sm hover:text-[#D4AF37]"
                        >
                          +1 203 305 1152
                        </a>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <FileText className="h-5 w-5 text-[#0B3C5D] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[#0B3C5D] font-medium text-sm">Tax ID</p>
                        <p className="text-[#6B4F3A] text-sm">83-1336344</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Contact Form & Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <motion.div {...fadeInUp}>
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6 md:p-8">
                    <h2 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-6">
                      Send Us a Message
                    </h2>

                    {submitted ? (
                      <div className="text-center py-12">
                        <CheckCircle className="h-16 w-16 text-[#4C9A2A] mx-auto mb-4" />
                        <h3 className="font-heading font-bold text-xl text-[#0B3C5D] mb-2">
                          Message Sent Successfully!
                        </h3>
                        <p className="text-[#6B4F3A]">
                          Thank you for reaching out. We will get back to you within 24 hours.
                        </p>
                      </div>
                    ) : (
                      <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                              Full Name *
                            </Label>
                            <Input
                              required
                              placeholder="Your full name"
                              className="border-gray-200 focus:border-[#D4AF37]"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                              Email Address *
                            </Label>
                            <Input
                              required
                              type="email"
                              placeholder="Your email"
                              className="border-gray-200 focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                              Phone Number
                            </Label>
                            <Input
                              type="tel"
                              placeholder="+233 XX XXX XXXX"
                              className="border-gray-200 focus:border-[#D4AF37]"
                            />
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                              Subject *
                            </Label>
                            <Input
                              required
                              placeholder="How can we help?"
                              className="border-gray-200 focus:border-[#D4AF37]"
                            />
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-[#0B3C5D] mb-1">
                            Message *
                          </Label>
                          <Textarea
                            required
                            placeholder="Write your message here..."
                            className="border-gray-200 focus:border-[#D4AF37] min-h-[150px]"
                          />
                        </div>
                        <Button
                          type="submit"
                          className="bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold py-6 px-8"
                        >
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </Button>
                      </form>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Working Hours */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card className="border-0 shadow-lg">
                  <CardContent className="p-6">
                    <h3 className="font-heading font-bold text-lg text-[#0B3C5D] mb-4">
                      Working Hours
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[#6B4F3A] text-sm">Monday - Friday</p>
                          <p className="text-[#0B3C5D] font-medium text-sm">8:00 AM - 5:00 PM</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <Clock className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                        <div>
                          <p className="text-[#6B4F3A] text-sm">Saturday</p>
                          <p className="text-[#0B3C5D] font-medium text-sm">9:00 AM - 1:00 PM</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* WhatsApp */}
              <Card className="border-0 shadow-lg bg-[#25D366]/10 border-l-4 border-l-[#25D366]">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <MessageCircle className="h-6 w-6 text-[#25D366]" />
                    <h3 className="font-heading font-bold text-lg text-[#0B3C5D]">
                      Chat on WhatsApp
                    </h3>
                  </div>
                  <p className="text-[#6B4F3A] text-sm mb-4">
                    Get quick responses via WhatsApp for urgent inquiries and information.
                  </p>
                  <a
                    href="https://wa.me/233247124917"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-semibold">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Start WhatsApp Chat
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-lg text-[#0B3C5D] mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5 text-[#D4AF37]" />
                    Follow Us
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { icon: <Facebook className="h-4 w-4" />, label: 'Facebook', color: 'bg-blue-600' },
                      { icon: <Youtube className="h-4 w-4" />, label: 'YouTube', color: 'bg-red-600' },
                      { icon: <Twitter className="h-4 w-4" />, label: 'Twitter', color: 'bg-sky-500' },
                      { icon: <Instagram className="h-4 w-4" />, label: 'Instagram', color: 'bg-pink-600' },
                    ].map((social) => (
                      <a
                        key={social.label}
                        href="#"
                        className="flex items-center gap-2 p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <div className={`${social.color} text-white p-1.5 rounded`}>
                          {social.icon}
                        </div>
                        <span className="text-sm text-[#0B3C5D] font-medium">
                          {social.label}
                        </span>
                      </a>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map Placeholder */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <Card className="border-0 shadow-lg overflow-hidden">
              <div className="relative h-64 md:h-80 bg-[#0B3C5D]/5 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-[#0B3C5D]/30 mx-auto mb-3" />
                  <h3 className="font-heading font-semibold text-[#0B3C5D]/50 text-lg">
                    Duamenefa Foundation
                  </h3>
                  <p className="text-[#6B4F3A]/50 text-sm">
                    Dzodze, Volta Region, Ghana &amp; Albertville, Alabama, USA
                  </p>
                  <p className="text-[#6B4F3A]/40 text-xs mt-2">
                    Interactive map requires Google Maps API key
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
