'use client';

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Plus } from 'lucide-react';

const sampleEvents = [
  { id: 1, title: 'Annual Charity Gala', date: '2025-02-15', location: 'Accra International Conference Centre', status: 'Upcoming', attendees: 250 },
  { id: 2, title: 'Community Outreach Day', date: '2025-02-10', location: 'Volta Region Community Center', status: 'Upcoming', attendees: 120 },
  { id: 3, title: 'Volunteer Training Workshop', date: '2025-01-28', location: 'Duamenefa HQ, Ho', status: 'Ongoing', attendees: 45 },
  { id: 4, title: 'Regional Tournament 2025', date: '2025-03-20', location: 'Ho Sports Stadium', status: 'Upcoming', attendees: 500 },
  { id: 5, title: 'Donor Appreciation Dinner', date: '2025-01-20', location: 'Labadi Beach Hotel', status: 'Completed', attendees: 80 },
  { id: 6, title: 'Youth Leadership Summit', date: '2025-02-25', location: 'University of Ghana, Legon', status: 'Upcoming', attendees: 200 },
  { id: 7, title: 'Health Awareness Walk', date: '2025-01-18', location: 'Black Star Square', status: 'Completed', attendees: 350 },
  { id: 8, title: 'Fundraising Concert', date: '2025-03-05', location: 'National Theatre, Accra', status: 'Upcoming', attendees: 600 },
];

function getStatusBadge(status: string) {
  switch (status) {
    case 'Upcoming': return 'bg-blue-100 text-blue-800';
    case 'Ongoing': return 'bg-yellow-100 text-yellow-800';
    case 'Completed': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-600';
  }
}

export default function EventsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#333333]">Events Management</h2>
        <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add Event
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sampleEvents.map((event) => (
          <Card key={event.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="font-semibold text-[#333333] text-lg">{event.title}</h3>
                <Badge className={`text-xs ${getStatusBadge(event.status)}`}>{event.status}</Badge>
              </div>
              <div className="space-y-2 text-sm text-[#333333]/70">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#C62828]" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C62828]" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#C62828]" />
                  <span>{event.attendees} attendees</span>
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
    </div>
  );
}
