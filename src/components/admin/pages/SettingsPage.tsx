'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('Duamenefa Foundation');
  const [tagline, setTagline] = useState('Empowering Communities, Changing Lives');
  const [contactEmail, setContactEmail] = useState('info@duamenefa.org');
  const [phone, setPhone] = useState('+233 20 123 4567');
  const [darkMode, setDarkMode] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#C62828');
  const [emailNewDonation, setEmailNewDonation] = useState(true);
  const [emailNewVolunteer, setEmailNewVolunteer] = useState(true);
  const [emailNewApplication, setEmailNewApplication] = useState(false);
  const [emailEventReminder, setEmailEventReminder] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#333333]">Settings</h2>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label htmlFor="siteName">Site Name</Label>
                <Input id="siteName" value={siteName} onChange={(e) => setSiteName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input id="tagline" value={tagline} onChange={(e) => setTagline(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="contactEmail">Contact Email</Label>
                <Input id="contactEmail" type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="flex justify-end">
                <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-2">
                <Label>Logo</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#C62828] transition-colors cursor-pointer">
                  <p className="text-sm text-[#333333]/50">Click to upload or drag and drop</p>
                  <p className="text-xs text-[#333333]/40 mt-1">PNG, JPG up to 2MB</p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="primaryColor">Primary Color</Label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    id="primaryColor"
                    value={primaryColor}
                    onChange={(e) => setPrimaryColor(e.target.value)}
                    className="w-10 h-10 rounded cursor-pointer border-0"
                  />
                  <Input value={primaryColor} onChange={(e) => setPrimaryColor(e.target.value)} className="max-w-[120px]" />
                </div>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Dark Mode</Label>
                  <p className="text-xs text-[#333333]/50 mt-0.5">Toggle dark mode theme</p>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <div className="flex justify-end">
                <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Donation Alert</Label>
                  <p className="text-xs text-[#333333]/50 mt-0.5">Get notified when a new donation is received</p>
                </div>
                <Switch checked={emailNewDonation} onCheckedChange={setEmailNewDonation} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Volunteer Registration</Label>
                  <p className="text-xs text-[#333333]/50 mt-0.5">Get notified when someone signs up as a volunteer</p>
                </div>
                <Switch checked={emailNewVolunteer} onCheckedChange={setEmailNewVolunteer} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>New Placement Application</Label>
                  <p className="text-xs text-[#333333]/50 mt-0.5">Get notified when a new application is submitted</p>
                </div>
                <Switch checked={emailNewApplication} onCheckedChange={setEmailNewApplication} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Event Reminders</Label>
                  <p className="text-xs text-[#333333]/50 mt-0.5">Receive reminders before upcoming events</p>
                </div>
                <Switch checked={emailEventReminder} onCheckedChange={setEmailEventReminder} />
              </div>
              <div className="flex justify-end">
                <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="mt-4">
          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-5">
              <div className="space-y-4">
                <h3 className="font-medium text-[#333333]">Change Password</h3>
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <Input id="currentPassword" type="password" placeholder="Enter current password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <Input id="newPassword" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                </div>
                <Button variant="outline">Update Password</Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div>
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-xs text-[#333333]/50 mt-0.5">Add an extra layer of security to your account</p>
                </div>
                <Switch checked={twoFactor} onCheckedChange={setTwoFactor} />
              </div>
              <Separator />
              <div className="space-y-3">
                <h3 className="font-medium text-[#333333]">Active Sessions</h3>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[#333333]">Chrome on Windows</p>
                    <p className="text-xs text-[#333333]/50">Current session · Ho, Ghana</p>
                  </div>
                  <Badge className="bg-green-100 text-green-800 text-xs">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-[#333333]">Safari on iPhone</p>
                    <p className="text-xs text-[#333333]/50">Last active 2 hours ago · Accra, Ghana</p>
                  </div>
                  <Button variant="ghost" size="sm" className="text-xs text-red-600 hover:text-red-700">Revoke</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
