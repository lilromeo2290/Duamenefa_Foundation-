'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { DollarSign, TrendingUp, Repeat, Users, Download, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

const summaryCards = [
  { title: 'Total Donations', value: '$125,000', icon: DollarSign, color: '#C62828', change: '+15%' },
  { title: 'This Month', value: '$25,000', icon: TrendingUp, color: '#2E7D32', change: '+8%' },
  { title: 'Average Donation', value: '$250', icon: DollarSign, color: '#1565C0', change: '+5%' },
  { title: 'Recurring Donors', value: '48', icon: Repeat, color: '#E65100', change: '+12%' },
];

const sampleDonations = [
  { id: 1, donor: 'John Doe', amount: '$500', date: '2025-01-15', campaign: 'Education Fund', status: 'Completed', method: 'Credit Card' },
  { id: 2, donor: 'Jane Smith', amount: '$1,000', date: '2025-01-14', campaign: 'Community Outreach', status: 'Completed', method: 'Bank Transfer' },
  { id: 3, donor: 'Michael Brown', amount: '$250', date: '2025-01-13', campaign: 'Health Initiative', status: 'Pending', method: 'PayPal' },
  { id: 4, donor: 'Sarah Wilson', amount: '$750', date: '2025-01-12', campaign: 'Education Fund', status: 'Completed', method: 'Credit Card' },
  { id: 5, donor: 'David Taylor', amount: '$100', date: '2025-01-11', campaign: 'General Fund', status: 'Completed', method: 'Mobile Money' },
  { id: 6, donor: 'Emily Davis', amount: '$2,000', date: '2025-01-10', campaign: 'Building Project', status: 'Completed', method: 'Bank Transfer' },
  { id: 7, donor: 'Robert Johnson', amount: '$350', date: '2025-01-09', campaign: 'Health Initiative', status: 'Failed', method: 'Credit Card' },
  { id: 8, donor: 'Lisa Anderson', amount: '$500', date: '2025-01-08', campaign: 'Community Outreach', status: 'Completed', method: 'PayPal' },
  { id: 9, donor: 'James Martinez', amount: '$150', date: '2025-01-07', campaign: 'Education Fund', status: 'Pending', method: 'Mobile Money' },
  { id: 10, donor: 'Amanda White', amount: '$800', date: '2025-01-06', campaign: 'General Fund', status: 'Completed', method: 'Bank Transfer' },
  { id: 11, donor: 'Chris Lee', amount: '$600', date: '2025-01-05', campaign: 'Building Project', status: 'Completed', method: 'Credit Card' },
  { id: 12, donor: 'Patricia Harris', amount: '$400', date: '2025-01-04', campaign: 'Health Initiative', status: 'Completed', method: 'PayPal' },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Failed': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export default function DonationsPage() {
  const [search, setSearch] = useState('');
  const [campaignFilter, setCampaignFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = sampleDonations.filter((d) => {
    const matchesSearch = d.donor.toLowerCase().includes(search.toLowerCase());
    const matchesCampaign = campaignFilter === 'All' || d.campaign === campaignFilter;
    const matchesStatus = statusFilter === 'All' || d.status === statusFilter;
    return matchesSearch && matchesCampaign && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {summaryCards.map((card) => (
          <Card key={card.title} className="shadow-sm">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#333333]/60">{card.title}</p>
                  <p className="text-2xl font-bold text-[#333333] mt-1">{card.value}</p>
                  <p className="text-xs text-green-600 mt-1">{card.change} from last month</p>
                </div>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: card.color + '15' }}>
                  <card.icon className="w-5 h-5" style={{ color: card.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input placeholder="Search donors..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <select value={campaignFilter} onChange={(e) => setCampaignFilter(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white">
          <option value="All">All Campaigns</option>
          <option value="Education Fund">Education Fund</option>
          <option value="Community Outreach">Community Outreach</option>
          <option value="Health Initiative">Health Initiative</option>
          <option value="Building Project">Building Project</option>
          <option value="General Fund">General Fund</option>
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white">
          <option value="All">All Status</option>
          <option value="Completed">Completed</option>
          <option value="Pending">Pending</option>
          <option value="Failed">Failed</option>
        </select>
        <Button variant="outline" className="ml-auto">
          <Download className="w-4 h-4 mr-2" /> Export
        </Button>
      </div>

      {/* Donations Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F5F5F5]">
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Donor</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Amount</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Date</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Campaign</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Status</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Payment Method</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((donation) => (
                  <tr key={donation.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-medium text-[#333333]">{donation.donor}</td>
                    <td className="py-3 px-4 text-[#333333] font-semibold">{donation.amount}</td>
                    <td className="py-3 px-4 text-[#333333]/70">{donation.date}</td>
                    <td className="py-3 px-4">
                      <Badge variant="outline" className="text-xs">{donation.campaign}</Badge>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`text-xs ${getStatusBadge(donation.status)}`}>{donation.status}</Badge>
                    </td>
                    <td className="py-3 px-4 text-[#333333]/70">{donation.method}</td>
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
