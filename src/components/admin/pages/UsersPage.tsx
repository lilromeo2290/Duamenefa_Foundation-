'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ShieldCheck, Mail, Calendar, Clock } from 'lucide-react';

const superAdmin = {
  name: 'Duamenefa Admin',
  email: 'admin@duamenefa.org',
  role: 'Super Admin',
  status: 'Active',
  createdAt: '2025-01-01',
  lastLogin: new Date().toISOString().split('T')[0],
};

export default function UsersPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-[#333333]">System Administrator</h2>
        <p className="text-sm text-[#333333]/60 mt-1">
          This platform has a single super admin account with full access to all features.
        </p>
      </div>

      {/* Super Admin Card */}
      <Card className="shadow-sm border-l-4 border-l-[#8E0000]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-start gap-6">
            {/* Avatar */}
            <div className="w-20 h-20 rounded-full bg-[#8E0000] flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-10 h-10 text-white" />
            </div>

            {/* Info */}
            <div className="flex-1 space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-[#333333]">{superAdmin.name}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-[#8E0000] text-white text-xs">{superAdmin.role}</Badge>
                  <Badge className="bg-green-100 text-green-800 text-xs">{superAdmin.status}</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="flex items-center gap-2 text-sm text-[#333333]/70">
                  <Mail className="w-4 h-4 text-[#8E0000]" />
                  <span>{superAdmin.email}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#333333]/70">
                  <Calendar className="w-4 h-4 text-[#8E0000]" />
                  <span>Created: {superAdmin.createdAt}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#333333]/70">
                  <Clock className="w-4 h-4 text-[#8E0000]" />
                  <span>Last Login: {superAdmin.lastLogin}</span>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <p className="text-sm font-medium text-[#333333] mb-2">Permissions</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Dashboard Access',
                    'User Management',
                    'Content Management',
                    'Site Settings',
                    'Media Library',
                    'Reports & Analytics',
                    'Notifications',
                  ].map((perm) => (
                    <Badge key={perm} variant="outline" className="text-xs border-[#8E0000]/30 text-[#8E0000]">
                      {perm}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
