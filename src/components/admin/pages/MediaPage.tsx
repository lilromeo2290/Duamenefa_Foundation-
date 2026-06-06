'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileIcon, Image as ImageIcon, Film, FileText, Download, Trash2 } from 'lucide-react';

interface MediaItem {
  id: number;
  filename: string;
  type: 'Images' | 'Videos' | 'Documents';
  size: string;
  dateUploaded: string;
  color: string;
}

const sampleMedia: MediaItem[] = [
  { id: 1, filename: 'hero-banner.jpg', type: 'Images', size: '2.4 MB', dateUploaded: '2025-01-15', color: '#C62828' },
  { id: 2, filename: 'team-photo.png', type: 'Images', size: '1.8 MB', dateUploaded: '2025-01-14', color: '#1565C0' },
  { id: 3, filename: 'community-outreach.jpg', type: 'Images', size: '3.2 MB', dateUploaded: '2025-01-13', color: '#2E7D32' },
  { id: 4, filename: 'annual-report-2024.pdf', type: 'Documents', size: '5.1 MB', dateUploaded: '2025-01-12', color: '#E65100' },
  { id: 5, filename: 'volunteer-guide.pdf', type: 'Documents', size: '1.2 MB', dateUploaded: '2025-01-11', color: '#6A1B9A' },
  { id: 6, filename: 'event-highlight.mp4', type: 'Videos', size: '24.5 MB', dateUploaded: '2025-01-10', color: '#00695C' },
  { id: 7, filename: 'tournament-2024.jpg', type: 'Images', size: '4.1 MB', dateUploaded: '2025-01-09', color: '#C62828' },
  { id: 8, filename: 'donation-receipt.pdf', type: 'Documents', size: '0.5 MB', dateUploaded: '2025-01-08', color: '#1565C0' },
  { id: 9, filename: 'interview-clip.mp4', type: 'Videos', size: '18.3 MB', dateUploaded: '2025-01-07', color: '#2E7D32' },
  { id: 10, filename: 'logo-update.png', type: 'Images', size: '0.8 MB', dateUploaded: '2025-01-06', color: '#E65100' },
  { id: 11, filename: 'training-video.mp4', type: 'Videos', size: '45.2 MB', dateUploaded: '2025-01-05', color: '#6A1B9A' },
  { id: 12, filename: 'policy-document.pdf', type: 'Documents', size: '2.3 MB', dateUploaded: '2025-01-04', color: '#00695C' },
];

function getTypeIcon(type: string) {
  switch (type) {
    case 'Images': return ImageIcon;
    case 'Videos': return Film;
    case 'Documents': return FileText;
    default: return FileIcon;
  }
}

export default function MediaPage() {
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredMedia = sampleMedia.filter((item) =>
    typeFilter === 'All' || item.type === typeFilter
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="border border-gray-200 rounded-md px-3 py-2 text-sm bg-white"
          >
            <option value="All">All Types</option>
            <option value="Images">Images</option>
            <option value="Videos">Videos</option>
            <option value="Documents">Documents</option>
          </select>
        </div>
        <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">
          <Upload className="w-4 h-4 mr-2" /> Upload Media
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMedia.map((item) => {
          const IconComponent = getTypeIcon(item.type);
          return (
            <Card key={item.id} className="shadow-sm hover:shadow-md transition-shadow group">
              <CardContent className="p-0">
                <div
                  className="h-36 rounded-t-lg flex items-center justify-center"
                  style={{ backgroundColor: item.color + '15' }}
                >
                  <IconComponent className="w-12 h-12" style={{ color: item.color }} />
                </div>
                <div className="p-4">
                  <p className="font-medium text-[#333333] text-sm truncate">{item.filename}</p>
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs text-[#333333]/50">{item.size} · {item.dateUploaded}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-blue-50">
                      <Download className="w-3.5 h-3.5 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
