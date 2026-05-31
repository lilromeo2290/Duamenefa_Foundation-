'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, CalendarDays } from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell, AreaChart, Area, Legend
} from 'recharts';

const visitorData = [
  { month: 'Jan', visitors: 1200 },
  { month: 'Feb', visitors: 1900 },
  { month: 'Mar', visitors: 2400 },
  { month: 'Apr', visitors: 2100 },
  { month: 'May', visitors: 2800 },
  { month: 'Jun', visitors: 3200 },
  { month: 'Jul', visitors: 2900 },
  { month: 'Aug', visitors: 3500 },
  { month: 'Sep', visitors: 3100 },
  { month: 'Oct', visitors: 3800 },
  { month: 'Nov', visitors: 4200 },
  { month: 'Dec', visitors: 4500 },
];

const donationByCampaign = [
  { campaign: 'Education', amount: 35000 },
  { campaign: 'Health', amount: 28000 },
  { campaign: 'Community', amount: 22000 },
  { campaign: 'Building', amount: 18000 },
  { campaign: 'General', amount: 12000 },
  { campaign: 'Emergency', amount: 10000 },
];

const applicationStatus = [
  { name: 'Approved', value: 45, color: '#2E7D32' },
  { name: 'Pending', value: 30, color: '#E65100' },
  { name: 'Rejected', value: 15, color: '#C62828' },
  { name: 'Under Review', value: 10, color: '#1565C0' },
];

const volunteerHours = [
  { month: 'Jan', hours: 320 },
  { month: 'Feb', hours: 450 },
  { month: 'Mar', hours: 380 },
  { month: 'Apr', hours: 520 },
  { month: 'May', hours: 480 },
  { month: 'Jun', hours: 610 },
  { month: 'Jul', hours: 550 },
  { month: 'Aug', hours: 700 },
  { month: 'Sep', hours: 620 },
  { month: 'Oct', hours: 780 },
  { month: 'Nov', hours: 720 },
  { month: 'Dec', hours: 850 },
];

const kpis = [
  { title: 'Total Visitors', value: '35,600', change: '+18%' },
  { title: 'Conversion Rate', value: '3.2%', change: '+0.5%' },
  { title: 'Avg. Session', value: '4m 32s', change: '+12%' },
  { title: 'Bounce Rate', value: '32%', change: '-5%' },
];

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi) => (
          <Card key={kpi.title} className="shadow-sm">
            <CardContent className="p-5">
              <p className="text-sm text-[#333333]/60">{kpi.title}</p>
              <p className="text-2xl font-bold text-[#333333] mt-1">{kpi.value}</p>
              <p className={`text-xs mt-1 ${kpi.change.startsWith('+') ? 'text-green-600' : 'text-red-500'}`}>
                {kpi.change} from last period
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Date Range and Export */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-2">
          <CalendarDays className="w-4 h-4 text-[#333333]/50" />
          <input
            type="date"
            defaultValue="2025-01-01"
            className="border border-gray-200 rounded px-3 py-1.5 text-sm"
          />
          <span className="text-[#333333]/50">to</span>
          <input
            type="date"
            defaultValue="2025-01-31"
            className="border border-gray-200 rounded px-3 py-1.5 text-sm"
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" /> Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" /> Export CSV
          </Button>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Visitor Trends */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#333333]">Visitor Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={visitorData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#999" fontSize={12} />
                  <YAxis stroke="#999" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5' }} />
                  <Line type="monotone" dataKey="visitors" stroke="#C62828" strokeWidth={2} dot={{ fill: '#C62828', r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Donations by Campaign */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#333333]">Donations by Campaign</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={donationByCampaign}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="campaign" stroke="#999" fontSize={12} />
                  <YAxis stroke="#999" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5' }} formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']} />
                  <Bar dataKey="amount" fill="#C62828" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Application Status Pie */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#333333]">Application Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={applicationStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {applicationStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5' }} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Volunteer Hours Area */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#333333]">Volunteer Hours</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={volunteerHours}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="month" stroke="#999" fontSize={12} />
                  <YAxis stroke="#999" fontSize={12} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5' }} />
                  <Area type="monotone" dataKey="hours" stroke="#C62828" fill="#C62828" fillOpacity={0.2} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
