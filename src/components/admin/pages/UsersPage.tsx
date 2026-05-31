'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Eye, Pencil, Trash2 } from 'lucide-react';

const sampleUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'Active', lastActive: '2025-01-15' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Editor', status: 'Active', lastActive: '2025-01-14' },
  { id: 3, name: 'Michael Brown', email: 'michael@example.com', role: 'Volunteer', status: 'Active', lastActive: '2025-01-13' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'Donor', status: 'Inactive', lastActive: '2025-01-10' },
  { id: 5, name: 'David Taylor', email: 'david@example.com', role: 'Volunteer', status: 'Active', lastActive: '2025-01-15' },
  { id: 6, name: 'Emily Davis', email: 'emily@example.com', role: 'Editor', status: 'Suspended', lastActive: '2025-01-05' },
  { id: 7, name: 'Robert Johnson', email: 'robert@example.com', role: 'Admin', status: 'Active', lastActive: '2025-01-15' },
  { id: 8, name: 'Lisa Anderson', email: 'lisa@example.com', role: 'Donor', status: 'Active', lastActive: '2025-01-12' },
  { id: 9, name: 'James Martinez', email: 'james@example.com', role: 'Volunteer', status: 'Inactive', lastActive: '2025-01-08' },
  { id: 10, name: 'Amanda White', email: 'amanda@example.com', role: 'Editor', status: 'Active', lastActive: '2025-01-14' },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'Active': return 'bg-green-100 text-green-800';
    case 'Inactive': return 'bg-gray-100 text-gray-600';
    case 'Suspended': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export default function UsersPage() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');

  const filteredUsers = sampleUsers.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase());
    const matchesRole = roleFilter === 'All' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="All">All Roles</option>
            <option value="Admin">Admin</option>
            <option value="Editor">Editor</option>
            <option value="Volunteer">Volunteer</option>
            <option value="Donor">Donor</option>
          </select>
        </div>
        <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </div>

      {/* Users Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F5F5F5]">
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Name</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Email</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Role</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Last Active</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                    <td className="py-3 px-4 font-medium text-[#333333]">{user.name}</td>
                    <td className="py-3 px-4 text-[#333333]/70">{user.email}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">{user.role}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`text-xs ${getStatusBadge(user.status)}`}>{user.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-[#333333]/70">{user.lastActive}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-green-50">
                          <Pencil className="w-4 h-4 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50">
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
