'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import {
  UserPlus,
  Upload,
  CheckCircle,
  Phone,
  Mail,
  CreditCard,
  Globe,
  DollarSign,
} from 'lucide-react';

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function VolunteerFormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    date: '',
    surname: '',
    otherNames: '',
    yearOfBirth: '',
    phoneNumber: '',
    placeOfResidence: '',
    education: '',
    occupation: '',
    maritalStatus: '',
    religion: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
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
            Forms
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-2">
            Online Volunteer <span className="text-[#D4AF37]">Membership Form</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Duamenefa Foundation — Promoting Peaceful Co-existence
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <CheckCircle className="h-20 w-20 text-[#4C9A2A] mx-auto mb-6" />
              <h2 className="font-heading font-bold text-3xl text-[#0B3C5D] mb-4">
                Application Submitted Successfully!
              </h2>
              <p className="text-[#6B4F3A] max-w-lg mx-auto mb-6">
                Thank you for applying for membership with the Duamenefa Foundation.
                Please remember to email your passport photo and photo ID to
                duamenefafoundation@yahoo.com, and complete your payment using one
                of the payment methods below.
              </p>
              <Button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({
                    date: '',
                    surname: '',
                    otherNames: '',
                    yearOfBirth: '',
                    phoneNumber: '',
                    placeOfResidence: '',
                    education: '',
                    occupation: '',
                    maritalStatus: '',
                    religion: '',
                  });
                }}
                className="bg-[#0B3C5D] hover:bg-[#0a2e47] text-white font-semibold"
              >
                Submit Another Application
              </Button>
            </motion.div>
          ) : (
            <motion.div {...fadeInUp}>
              {/* Instructions */}
              <Card className="border-l-4 border-l-[#D4AF37] border-0 shadow-lg mb-8">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3">
                    <Upload className="h-5 w-5 text-[#D4AF37] shrink-0 mt-0.5" />
                    <div>
                      <p className="text-[#0B3C5D] font-medium mb-1">Important Instructions</p>
                      <p className="text-[#6B4F3A] text-sm">
                        Please fill out entirely, include a photo of a Picture ID and a Passport Photo
                        (white background). Email all attachments to{' '}
                        <a href="mailto:duamenefafoundation@yahoo.com" className="text-[#D4AF37] hover:underline">
                          duamenefafoundation@yahoo.com
                        </a>
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Application Form */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
                      <UserPlus className="h-5 w-5 text-[#D4AF37]" />
                    </div>
                    <div>
                      <h2 className="font-heading font-bold text-xl text-[#0B3C5D]">
                        Duamenefa Foundation Membership
                      </h2>
                      <p className="text-[#6B4F3A] text-sm">Online Application Form</p>
                    </div>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Date */}
                    <div>
                      <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Date *</Label>
                      <Input
                        required
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                        className="border-gray-200 focus:border-[#D4AF37] max-w-xs"
                      />
                    </div>

                    <Separator />

                    {/* Surname & Other Names */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Surname *</Label>
                        <Input
                          required
                          name="surname"
                          value={formData.surname}
                          onChange={handleChange}
                          placeholder="Enter your surname"
                          className="border-gray-200 focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Other Names *</Label>
                        <Input
                          required
                          name="otherNames"
                          value={formData.otherNames}
                          onChange={handleChange}
                          placeholder="Enter other names"
                          className="border-gray-200 focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    {/* Year of Birth & Phone */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Year of Birth *</Label>
                        <Input
                          required
                          name="yearOfBirth"
                          value={formData.yearOfBirth}
                          onChange={handleChange}
                          placeholder="e.g. 1990"
                          className="border-gray-200 focus:border-[#D4AF37]"
                        />
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Phone Number *</Label>
                        <Input
                          required
                          type="tel"
                          name="phoneNumber"
                          value={formData.phoneNumber}
                          onChange={handleChange}
                          placeholder="+233 XXX XXX XXX"
                          className="border-gray-200 focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    {/* Place of Residence */}
                    <div>
                      <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Place of Residence *</Label>
                      <Input
                        required
                        name="placeOfResidence"
                        value={formData.placeOfResidence}
                        onChange={handleChange}
                        placeholder="Enter your place of residence"
                        className="border-gray-200 focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Education */}
                    <div>
                      <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Highest Level of Education *</Label>
                      <select
                        required
                        name="education"
                        value={formData.education}
                        onChange={handleChange}
                        className="w-full h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                      >
                        <option value="">Select education level</option>
                        <option value="Primary">Primary</option>
                        <option value="Junior High School">Junior High School (JHS)</option>
                        <option value="Senior High School">Senior High School (SHS)</option>
                        <option value="Vocational/Technical">Vocational / Technical</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Bachelor's Degree">Bachelor&apos;s Degree</option>
                        <option value="Master's Degree">Master&apos;s Degree</option>
                        <option value="Doctorate">Doctorate (PhD)</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    {/* Occupation */}
                    <div>
                      <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Occupation *</Label>
                      <Input
                        required
                        name="occupation"
                        value={formData.occupation}
                        onChange={handleChange}
                        placeholder="Enter your occupation"
                        className="border-gray-200 focus:border-[#D4AF37]"
                      />
                    </div>

                    {/* Marital Status & Religion */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Marital Status *</Label>
                        <select
                          required
                          name="maritalStatus"
                          value={formData.maritalStatus}
                          onChange={handleChange}
                          className="w-full h-10 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm focus:border-[#D4AF37] focus:outline-none focus:ring-1 focus:ring-[#D4AF37]"
                        >
                          <option value="">Select status</option>
                          <option value="Single">Single</option>
                          <option value="Married">Married</option>
                          <option value="Divorced">Divorced</option>
                          <option value="Widowed">Widowed</option>
                        </select>
                      </div>
                      <div>
                        <Label className="text-sm font-medium text-[#0B3C5D] mb-1">Religion *</Label>
                        <Input
                          required
                          name="religion"
                          value={formData.religion}
                          onChange={handleChange}
                          placeholder="Enter your religion"
                          className="border-gray-200 focus:border-[#D4AF37]"
                        />
                      </div>
                    </div>

                    <Separator />

                    {/* Submit */}
                    <Button
                      type="submit"
                      className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-bold py-6 px-10 text-lg"
                    >
                      <UserPlus className="h-5 w-5 mr-2" />
                      Submit Application
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>

      {/* Payment Section */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeInUp}>
            <div className="text-center mb-10">
              <span className="inline-block bg-[#D4AF37]/10 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
                <CreditCard className="h-4 w-4 inline mr-1" />
                Payment
              </span>
              <h2 className="font-heading font-bold text-2xl md:text-3xl text-[#0B3C5D] mb-3">
                Registration Fee
              </h2>
              <p className="text-[#6B4F3A] max-w-lg mx-auto">
                All questions must be filled in completely and submitted with a passport photo
                (white background), a photo ID, and payment must be made using one of the following methods.
              </p>
            </div>

            {/* Price Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <Globe className="h-8 w-8 text-[#0B3C5D] mx-auto mb-3" />
                  <p className="text-[#6B4F3A] text-sm mb-1">Ghana Registration</p>
                  <p className="font-heading font-bold text-3xl text-[#0B3C5D]">Gh&#8373;22</p>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-lg text-center">
                <CardContent className="p-6">
                  <DollarSign className="h-8 w-8 text-[#4C9A2A] mx-auto mb-3" />
                  <p className="text-[#6B4F3A] text-sm mb-1">U.S. Registration</p>
                  <p className="font-heading font-bold text-3xl text-[#4C9A2A]">$5.00</p>
                </CardContent>
              </Card>
            </div>

            {/* Payment Methods */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <Card className="border-0 shadow-md">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#FFC300]/20 flex items-center justify-center shrink-0">
                    <Phone className="h-5 w-5 text-[#FFC300]" />
                  </div>
                  <div>
                    <p className="text-[#0B3C5D] font-medium text-sm">MTN Mobile Money</p>
                    <p className="text-[#6B4F3A] text-sm">+233 243 752 239</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#6C2DC7]/20 flex items-center justify-center shrink-0">
                    <CreditCard className="h-5 w-5 text-[#6C2DC7]" />
                  </div>
                  <div>
                    <p className="text-[#0B3C5D] font-medium text-sm">Zelle</p>
                    <p className="text-[#6B4F3A] text-sm">duamenefafoundation@yahoo.com</p>
                    <p className="text-[#6B4F3A]/60 text-xs">Name on account: Diane Westcott</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#003087]/20 flex items-center justify-center shrink-0">
                    <CreditCard className="h-5 w-5 text-[#003087]" />
                  </div>
                  <div>
                    <p className="text-[#0B3C5D] font-medium text-sm">PayPal</p>
                    <p className="text-[#6B4F3A] text-sm">duamenefafoundation@yahoo.com</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-0 shadow-md">
                <CardContent className="p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#3D95CE]/20 flex items-center justify-center shrink-0">
                    <CreditCard className="h-5 w-5 text-[#3D95CE]" />
                  </div>
                  <div>
                    <p className="text-[#0B3C5D] font-medium text-sm">Venmo</p>
                    <p className="text-[#6B4F3A] text-sm">@Diane-Westcott-6</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="text-center space-y-2">
              <p className="text-[#0B3C5D] font-medium text-sm">
                Please reference <span className="text-[#D4AF37]">Membership Form</span> with your payment.
              </p>
              <p className="text-[#6B4F3A] text-sm">
                You will be sent a softcopy as an attachment to your email or WhatsApp for you to print.
                If you are close enough to Dzodze to pick up a certificate, contact us to let us know.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact for Questions */}
      <section className="py-10 md:py-14">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-[#6B4F3A] text-sm">
            For more information or questions, please contact us by email to{' '}
            <a
              href="mailto:duamenefafoundation@yahoo.com"
              className="text-[#D4AF37] hover:underline font-medium"
            >
              <Mail className="h-3.5 w-3.5 inline mr-1" />
              duamenefafoundation@yahoo.com
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
