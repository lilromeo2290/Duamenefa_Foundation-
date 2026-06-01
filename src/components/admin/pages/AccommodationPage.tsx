'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Building, Plus } from 'lucide-react';

const sampleAccommodations = [
  { id: 1, name: 'Volta Guest House', location: 'Ho, Volta Region', capacity: 20, occupied: 15, status: 'Available' },
  { id: 2, name: 'Accra Volunteer Lodge', location: 'Accra, Greater Accra', capacity: 30, occupied: 30, status: 'Full' },
  { id: 3, name: 'Keta Beach House', location: 'Keta, Volta Region', capacity: 12, occupied: 8, status: 'Available' },
  { id: 4, name: 'Hohoe Retreat Center', location: 'Hohoe, Volta Region', capacity: 25, occupied: 18, status: 'Partial' },
  { id: 5, name: 'Tema Workers Hostel', location: 'Tema, Greater Accra', capacity: 40, occupied: 40, status: 'Full' },
  { id: 6, name: 'Aflao Community House', location: 'Aflao, Volta Region', capacity: 16, occupied: 10, status: 'Available' },
  { id: 7, name: 'Denu Transit Lodge', location: 'Denu, Volta Region', capacity: 10, occupied: 7, status: 'Partial' },
  { id: 8, name: 'Sogakope Resort', location: 'Sogakope, Volta Region', capacity: 18, occupied: 5, status: 'Available' },
];

const recentBookings = [
  { id: 1, guest: 'John Doe', accommodation: 'Volta Guest House', checkIn: '2025-01-15', checkOut: '2025-01-20', status: 'Confirmed' },
  { id: 2, guest: 'Jane Smith', accommodation: 'Keta Beach House', checkIn: '2025-01-16', checkOut: '2025-01-22', status: 'Pending' },
  { id: 3, guest: 'Michael Brown', accommodation: 'Hohoe Retreat Center', checkIn: '2025-01-14', checkOut: '2025-01-18', status: 'Confirmed' },
  { id: 4, guest: 'Sarah Wilson', accommodation: 'Aflao Community House', checkIn: '2025-01-17', checkOut: '2025-01-21', status: 'Cancelled' },
  { id: 5, guest: 'David Taylor', accommodation: 'Volta Guest House', checkIn: '2025-01-18', checkOut: '2025-01-25', status: 'Confirmed' },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'Available': return 'bg-green-100 text-green-800';
    case 'Full': return 'bg-red-100 text-red-800';
    case 'Partial': return 'bg-yellow-100 text-yellow-800';
    case 'Confirmed': return 'bg-green-100 text-green-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-600';
  }
}

function getProgressColor(status: string) {
  switch (status) {
    case 'Available': return 'bg-green-500';
    case 'Full': return 'bg-red-500';
    case 'Partial': return 'bg-yellow-500';
    default: return 'bg-gray-400';
  }
}

export default function AccommodationPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#333333]">Accommodation Management</h2>
        <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Accommodation
        </Button>
      </div>

      {/* Accommodation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleAccommodations.map((acc) => (
          <Card key={acc.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#C62828]/10 flex items-center justify-center">
                    <Building className="w-5 h-5 text-[#C62828]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-[#333333]">{acc.name}</h3>
                    <p className="text-xs text-[#333333]/50">{acc.location}</p>
                  </div>
                </div>
                <Badge className={`text-xs ${getStatusBadge(acc.status)}`}>{acc.status}</Badge>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#333333]/60">Occupancy</span>
                  <span className="font-medium text-[#333333]">{acc.occupied}/{acc.capacity}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${getProgressColor(acc.status)}`}
                    style={{ width: `${(acc.occupied / acc.capacity) * 100}%` }}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="text-xs">View Details</Button>
                <Button variant="outline" size="sm" className="text-xs">Edit</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Bookings */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-200">
            <h3 className="font-semibold text-[#333333]">Recent Bookings</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F5F5F5]">
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Guest</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Accommodation</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Check In</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Check Out</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Status</th>
                </tr>
              </thead>
              <tbody>
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-medium text-[#333333]">{booking.guest}</td>
                    <td className="py-3 px-4 text-[#333333]/70">{booking.accommodation}</td>
                    <td className="py-3 px-4 text-[#333333]/70">{booking.checkIn}</td>
                    <td className="py-3 px-4 text-[#333333]/70">{booking.checkOut}</td>
                    <td className="py-3 px-4">
                      <Badge className={`text-xs ${getStatusBadge(booking.status)}`}>{booking.status}</Badge>
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
