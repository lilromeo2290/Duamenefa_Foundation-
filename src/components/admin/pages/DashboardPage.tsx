'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, DollarSign, FolderOpen, CalendarDays, TrendingUp, TrendingDown } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const donationData = [
  { month: 'Jul', amount: 3200 },
  { month: 'Aug', amount: 4100 },
  { month: 'Sep', amount: 3800 },
  { month: 'Oct', amount: 5200 },
  { month: 'Nov', amount: 4600 },
  { month: 'Dec', amount: 4100 },
];

const recentActivities = [
  { id: 1, date: '2025-01-15', activity: 'New volunteer application received', status: 'Pending' },
  { id: 2, date: '2025-01-14', activity: 'Donation of $500 from John Doe', status: 'Completed' },
  { id: 3, date: '2025-01-14', activity: 'Event "Charity Gala" created', status: 'Completed' },
  { id: 4, date: '2025-01-13', activity: 'Placement application under review', status: 'In Progress' },
  { id: 5, date: '2025-01-13', activity: 'New user registration: Mary Smith', status: 'Completed' },
  { id: 6, date: '2025-01-12', activity: 'Accommodation booking request', status: 'Pending' },
  { id: 7, date: '2025-01-12', activity: 'Airport pickup scheduled for visitor', status: 'In Progress' },
  { id: 8, date: '2025-01-11', activity: 'Monthly report generated', status: 'Completed' },
  { id: 9, date: '2025-01-11', activity: 'Blog post "Our Impact" published', status: 'Completed' },
  { id: 10, date: '2025-01-10', activity: 'Volunteer hours updated', status: 'In Progress' },
];

const stats = [
  { title: 'Total Users', value: '1,245', change: '+12%', trend: 'up' as const, icon: Users, color: '#C62828' },
  { title: 'Total Donations', value: '$25,000', change: '+8%', trend: 'up' as const, icon: DollarSign, color: '#2E7D32' },
  { title: 'Active Projects', value: '18', change: '+3%', trend: 'up' as const, icon: FolderOpen, color: '#1565C0' },
  { title: 'Upcoming Events', value: '5', change: '-2%', trend: 'down' as const, icon: CalendarDays, color: '#E65100' },
];

function getStatusColor(status: string) {
  switch (status) {
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'In Progress': return 'bg-blue-100 text-blue-800';
    default: return 'bg-gray-100 text-gray-800';
  }
}

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
                  <div className="flex items-center mt-2">
                    {stat.trend === 'up' ? (
                      <TrendingUp className="w-4 h-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
                    )}
                    <span className={`text-xs font-medium ${stat.trend === 'up' ? 'text-green-600' : 'text-red-500'}`}>
                      {stat.change} from last month
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: stat.color + '15' }}>
                  <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Chart and Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donation Chart */}
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

        {/* Recent Activities */}
        <Card className="shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg font-semibold text-[#333333]">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="max-h-72 overflow-y-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-2 font-medium text-[#333333]/60">Date</th>
                    <th className="text-left py-2 font-medium text-[#333333]/60">Activity</th>
                    <th className="text-left py-2 font-medium text-[#333333]/60">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivities.map((activity) => (
                    <tr key={activity.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                      <td className="py-2.5 text-[#333333]/70 whitespace-nowrap">{activity.date}</td>
                      <td className="py-2.5 text-[#333333]">{activity.activity}</td>
                      <td className="py-2.5">
                        <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                          {activity.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
