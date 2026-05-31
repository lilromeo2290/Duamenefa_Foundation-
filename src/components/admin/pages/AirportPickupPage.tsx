'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plane, Plus, MapPin } from 'lucide-react';

const samplePickups = [
  { id: 1, passenger: 'John Doe', flight: 'BA 081', arrival: '2025-01-15 08:30', driver: 'Kwame Mensah', status: 'Scheduled' },
  { id: 2, passenger: 'Jane Smith', flight: 'EK 787', arrival: '2025-01-15 14:00', driver: 'Kofi Asante', status: 'In Transit' },
  { id: 3, passenger: 'Michael Brown', flight: 'DL 156', arrival: '2025-01-14 22:15', driver: 'Yaw Boateng', status: 'Completed' },
  { id: 4, passenger: 'Sarah Wilson', flight: 'AA 720', arrival: '2025-01-16 06:45', driver: '', status: 'Scheduled' },
  { id: 5, passenger: 'David Taylor', flight: 'KL 590', arrival: '2025-01-14 11:30', driver: 'Kwame Mensah', status: 'Completed' },
  { id: 6, passenger: 'Emily Davis', flight: 'AF 914', arrival: '2025-01-17 19:00', driver: '', status: 'Scheduled' },
  { id: 7, passenger: 'Robert Johnson', flight: 'LH 570', arrival: '2025-01-13 10:00', driver: 'Kofi Asante', status: 'Cancelled' },
  { id: 8, passenger: 'Lisa Anderson', flight: 'TK 630', arrival: '2025-01-16 16:30', driver: 'Yaw Boateng', status: 'In Transit' },
  { id: 9, passenger: 'James Martinez', flight: 'ET 920', arrival: '2025-01-18 07:00', driver: '', status: 'Scheduled' },
  { id: 10, passenger: 'Amanda White', flight: 'SA 052', arrival: '2025-01-15 13:45', driver: 'Kwame Mensah', status: 'Scheduled' },
];

const drivers = ['Kwame Mensah', 'Kofi Asante', 'Yaw Boateng', 'Emmanuel Tetteh', 'Samuel Adjei'];

function getStatusBadge(status: string) {
  switch (status) {
    case 'Scheduled': return 'bg-blue-100 text-blue-800';
    case 'In Transit': return 'bg-yellow-100 text-yellow-800';
    case 'Completed': return 'bg-green-100 text-green-800';
    case 'Cancelled': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export default function AirportPickupPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#333333]">Airport Pickup Management</h2>
        <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Pickup
        </Button>
      </div>

      {/* Pickup Tracking Summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { label: 'Scheduled', count: samplePickups.filter(p => p.status === 'Scheduled').length, color: '#1565C0' },
          { label: 'In Transit', count: samplePickups.filter(p => p.status === 'In Transit').length, color: '#E65100' },
          { label: 'Completed', count: samplePickups.filter(p => p.status === 'Completed').length, color: '#2E7D32' },
          { label: 'Cancelled', count: samplePickups.filter(p => p.status === 'Cancelled').length, color: '#C62828' },
        ].map((stat) => (
          <Card key={stat.label} className="shadow-sm">
            <CardContent className="p-4 text-center">
              <p className="text-2xl font-bold" style={{ color: stat.color }}>{stat.count}</p>
              <p className="text-xs text-[#333333]/60 mt-1">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Arrivals Table */}
      <Card className="shadow-sm">
        <CardContent className="p-0">
          <div className="p-4 border-b border-gray-200 flex items-center gap-2">
            <Plane className="w-5 h-5 text-[#C62828]" />
            <h3 className="font-semibold text-[#333333]">Arrival Schedule</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 bg-[#F5F5F5]">
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Passenger</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Flight</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Arrival</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Driver</th>
                  <th className="text-left py-3 px-4 font-medium text-[#333333]/70">Status</th>
                </tr>
              </thead>
              <tbody>
                {samplePickups.map((pickup) => (
                  <tr key={pickup.id} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="py-3 px-4 font-medium text-[#333333]">{pickup.passenger}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <Plane className="w-3.5 h-3.5 text-[#C62828]" />
                        <span className="text-[#333333]/70">{pickup.flight}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#333333]/70 whitespace-nowrap">{pickup.arrival}</td>
                    <td className="py-3 px-4">
                      {pickup.driver ? (
                        <span className="text-[#333333]/70">{pickup.driver}</span>
                      ) : (
                        <select className="border border-gray-200 rounded px-2 py-1 text-xs bg-white">
                          <option value="">Assign Driver</option>
                          {drivers.map((d) => (
                            <option key={d} value={d}>{d}</option>
                          ))}
                        </select>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={`text-xs ${getStatusBadge(pickup.status)}`}>{pickup.status}</Badge>
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
