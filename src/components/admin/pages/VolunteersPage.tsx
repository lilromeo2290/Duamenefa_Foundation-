'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Heart, Star, Plus } from 'lucide-react';

const sampleVolunteers = [
  { id: 1, name: 'Kwame Asante', skills: ['Teaching', 'Mentoring'], project: 'Youth Education', hours: 120, rating: 4.8 },
  { id: 2, name: 'Abena Mensah', skills: ['Healthcare', 'First Aid'], project: 'Community Health', hours: 95, rating: 4.5 },
  { id: 3, name: 'Kofi Boateng', skills: ['IT', 'Web Design'], project: 'Digital Literacy', hours: 80, rating: 4.9 },
  { id: 4, name: 'Ama Osei', skills: ['Counseling', 'Social Work'], project: 'Trokosi Outreach', hours: 150, rating: 4.7 },
  { id: 5, name: 'Yaw Adjei', skills: ['Construction', 'Carpentry'], project: 'Building Project', hours: 200, rating: 4.3 },
  { id: 6, name: 'Efua Darko', skills: ['Photography', 'Media'], project: 'Media & Communications', hours: 65, rating: 4.6 },
  { id: 7, name: 'Emmanuel Tetteh', skills: ['Cooking', 'Nutrition'], project: 'Community Kitchen', hours: 110, rating: 4.4 },
  { id: 8, name: 'Grace Mensah', skills: ['Teaching', 'Art'], project: 'Youth Education', hours: 88, rating: 4.8 },
  { id: 9, name: 'Daniel Amewu', skills: ['Driving', 'Logistics'], project: 'Airport Pickup', hours: 45, rating: 4.2 },
  { id: 10, name: 'Patience Kwao', skills: ['Nursing', 'Healthcare'], project: 'Community Health', hours: 175, rating: 4.9 },
];

export default function VolunteersPage() {
  const [skillFilter, setSkillFilter] = useState('All');

  const allSkills = Array.from(new Set(sampleVolunteers.flatMap((v) => v.skills))).sort();

  const filtered = sampleVolunteers.filter((v) =>
    skillFilter === 'All' || v.skills.includes(skillFilter)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <select
          value={skillFilter}
          onChange={(e) => setSkillFilter(e.target.value)}
          className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white w-fit"
        >
          <option value="All">All Skills</option>
          {allSkills.map((skill) => (
            <option key={skill} value={skill}>{skill}</option>
          ))}
        </select>
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-[#333333]">Volunteers</h2>
          <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">
            <Plus className="w-4 h-4 mr-2" /> Add Volunteer
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((volunteer) => (
          <Card key={volunteer.id} className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-5">
              <div className="flex items-start gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-[#C62828]/10 flex items-center justify-center flex-shrink-0">
                  <Heart className="w-6 h-6 text-[#C62828]" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#333333]">{volunteer.name}</h3>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {volunteer.skills.map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-[#333333]/60">Project</span>
                  <span className="font-medium text-[#333333]">{volunteer.project}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#333333]/60">Hours Logged</span>
                  <span className="font-medium text-[#333333]">{volunteer.hours}h</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#333333]/60">Rating</span>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-[#333333]">{volunteer.rating}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 mt-4">
                <Button variant="outline" size="sm" className="text-xs flex-1">Assign Project</Button>
                <Button variant="outline" size="sm" className="text-xs flex-1">Performance</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
