'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, DollarSign, FolderOpen, CalendarDays } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const donationData = [
  { month: 'Jul', amount: 3200 },
  { month: 'Aug', amount: 4100 },
  { month: 'Sep', amount: 3800 },
  { month: 'Oct', amount: 5200 },
  { month: 'Nov', amount: 4600 },
  { month: 'Dec', amount: 4100 },
];

const stats = [
  { title: 'Total Users', value: '1', icon: Users, color: '#C62828' },
  { title: 'Total Donations', value: '$0', icon: DollarSign, color: '#2E7D32' },
  { title: 'Active Projects', value: '0', icon: FolderOpen, color: '#1565C0' },
  { title: 'Upcoming Events', value: '0', icon: CalendarDays, color: '#E65100' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#333333]/60 font-medium">{stat.title}</p>
                  <p className="text-2xl font-bold text-[#333333] mt-1">{stat.value}</p>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '15' }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart */}
      <Card className="shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg font-semibold text-[#333333]">Monthly Donations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#999" fontSize={12} />
                <YAxis stroke="#999" fontSize={12} />
                <Tooltip
                  contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, 'Donations']}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#C62828"
                  strokeWidth={2}
                  dot={{ fill: '#C62828', r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
