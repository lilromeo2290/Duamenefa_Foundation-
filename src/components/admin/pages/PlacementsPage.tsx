'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Eye } from 'lucide-react';

const samplePlacements = [
  { id: 1, applicant: 'Kwame Asante', program: 'Vocational Training', appliedDate: '2025-01-15', status: 'Pending', coordinator: '' },
  { id: 2, applicant: 'Abena Mensah', program: 'Teaching Assistant', appliedDate: '2025-01-14', status: 'Approved', coordinator: 'Dr. Osei' },
  { id: 3, applicant: 'Kofi Boateng', program: 'Health Internship', appliedDate: '2025-01-13', status: 'Pending', coordinator: '' },
  { id: 4, applicant: 'Ama Osei', program: 'Community Development', appliedDate: '2025-01-12', status: 'Rejected', coordinator: 'Mr. Tetteh' },
  { id: 5, applicant: 'Yaw Adjei', program: 'Vocational Training', appliedDate: '2025-01-11', status: 'Approved', coordinator: 'Mrs. Dzokoto' },
  { id: 6, applicant: 'Efua Darko', program: 'Teaching Assistant', appliedDate: '2025-01-10', status: 'Pending', coordinator: '' },
  { id: 7, applicant: 'Emmanuel Tetteh', program: 'Health Internship', appliedDate: '2025-01-09', status: 'Approved', coordinator: 'Dr. Osei' },
  { id: 8, applicant: 'Grace Mensah', program: 'Community Development', appliedDate: '2025-01-08', status: 'Pending', coordinator: '' },
  { id: 9, applicant: 'Daniel Amewu', program: 'Vocational Training', appliedDate: '2025-01-07', status: 'Approved', coordinator: 'Mrs. Dzokoto' },
  { id: 10, applicant: 'Patience Kwao', program: 'Teaching Assistant', appliedDate: '2025-01-06', status: 'Pending', coordinator: '' },
];

const coordinators = ['Dr. Osei', 'Mr. Tetteh', 'Mrs. Dzokoto', 'Mr. Agbeko', 'Ms. Adjei'];

function getStatusBadge(status: string) {
  switch (status) {
    case 'Approved': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Rejected': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export default function PlacementsPage() {
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = samplePlacements.filter((p) =>
    statusFilter === 'All' || p.status === statusFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white w-fit"
        >
          <option value="All">All Status</option>
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
        <h2 className="text-xl font-semibold text-[#333333]">Placement Applications</h2>
      </div>

      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F5F5F5]">
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Applicant</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Program</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Applied Date</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Coordinator</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((placement) => (
                  <tr key={placement.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-medium text-[#333333]">{placement.applicant}</td>
                    <td className="py-3 px-4 text-[#333333]/70">{placement.program}</td>
                    <td className="py-3 px-4 text-[#333333]/70">{placement.appliedDate}</td>
                    <td className="py-3 px-4">
                      <Badge className={`text-xs ${getStatusBadge(placement.status)}`}>{placement.status}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <select
                        className="border border-gray-200 rounded px-2 py-1 text-xs bg-white"
                        defaultValue={placement.coordinator}
                      >
                        <option value="">Assign...</option>
                        {coordinators.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-blue-50">
                          <Eye className="w-4 h-4 text-blue-600" />
                        </Button>
                        {placement.status === 'Pending' && (
                          <>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-green-50">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50">
                              <XCircle className="w-4 h-4 text-red-600" />
                            </Button>
                          </>
                        )}
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
