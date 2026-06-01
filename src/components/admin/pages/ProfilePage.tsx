'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Calendar, Shield } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const activityLog = [
  { id: 1, action: 'Updated profile information', time: '2 hours ago' },
  { id: 2, action: 'Approved placement for Kwame Asante', time: '5 hours ago' },
  { id: 3, action: 'Created new event "Annual Charity Gala"', time: '1 day ago' },
  { id: 4, action: 'Uploaded media file "hero-banner.jpg"', time: '1 day ago' },
  { id: 5, action: 'Changed notification settings', time: '2 days ago' },
  { id: 6, action: 'Added new volunteer Grace Mensah', time: '3 days ago' },
];

export default function ProfilePage() {
  const [name, setName] = useState('Admin User');
  const [email, setEmail] = useState('admin@duamenefa.org');
  const [phone, setPhone] = useState('+233 20 987 6543');
  const [bio, setBio] = useState('Platform administrator for Duamenefa Foundation. Managing day-to-day operations and ensuring smooth delivery of programs and services.');

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-[#333333]">My Profile</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card className="shadow-sm">
          <CardContent className="p-6 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarFallback className="bg-[#C62828] text-white text-2xl font-bold">AU</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold text-[#333333]">Admin User</h3>
            <p className="text-sm text-[#333333]/60 mt-1">admin@duamenefa.org</p>
            <Badge className="mt-3 bg-[#C62828]/10 text-[#C62828]">Administrator</Badge>
            <Separator className="my-4" />
            <div className="space-y-3 text-sm text-left">
              <div className="flex items-center gap-2 text-[#333333]/70">
                <Mail className="w-4 h-4 text-[#C62828]" />
                admin@duamenefa.org
              </div>
              <div className="flex items-center gap-2 text-[#333333]/70">
                <Phone className="w-4 h-4 text-[#C62828]" />
                +233 20 987 6543
              </div>
              <div className="flex items-center gap-2 text-[#333333]/70">
                <Shield className="w-4 h-4 text-[#C62828]" />
                Super Admin
              </div>
              <div className="flex items-center gap-2 text-[#333333]/70">
                <Calendar className="w-4 h-4 text-[#C62828]" />
                Joined: Jan 2023
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Edit Profile Form */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-5">
              <h3 className="font-semibold text-[#333333]">Edit Profile</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="profileName">Full Name</Label>
                  <Input id="profileName" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profileEmail">Email</Label>
                  <Input id="profileEmail" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="profilePhone">Phone</Label>
                <Input id="profilePhone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="profileBio">Bio</Label>
                <Textarea id="profileBio" value={bio} onChange={(e) => setBio(e.target.value)} rows={3} />
              </div>
              <div className="flex justify-end">
                <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">Save Changes</Button>
              </div>
            </CardContent>
          </Card>

          {/* Change Password */}
          <Card className="shadow-sm">
            <CardContent className="p-6 space-y-5">
              <h3 className="font-semibold text-[#333333]">Change Password</h3>
              <div className="space-y-2">
                <Label htmlFor="currentPwd">Current Password</Label>
                <Input id="currentPwd" type="password" placeholder="Enter current password" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="newPwd">New Password</Label>
                  <Input id="newPwd" type="password" placeholder="Enter new password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPwd">Confirm Password</Label>
                  <Input id="confirmPwd" type="password" placeholder="Confirm new password" />
                </div>
              </div>
              <div className="flex justify-end">
                <Button variant="outline">Update Password</Button>
              </div>
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card className="shadow-sm">
            <CardContent className="p-6">
              <h3 className="font-semibold text-[#333333] mb-4">Activity Log</h3>
              <div className="space-y-3">
                {activityLog.map((log) => (
                  <div key={log.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-[#C62828]" />
                      <span className="text-sm text-[#333333]">{log.action}</span>
                    </div>
                    <span className="text-xs text-[#333333]/50">{log.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
