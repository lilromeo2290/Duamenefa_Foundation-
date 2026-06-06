'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, Pencil, Trash2, Image as ImageIcon } from 'lucide-react';

interface ContentItem {
  id: number;
  title: string;
  status: 'Published' | 'Draft';
  lastModified: string;
  section: string;
}

const homePageItems: ContentItem[] = [
  { id: 1, title: 'Hero Section', status: 'Published', lastModified: '2025-01-15', section: 'Home' },
  { id: 2, title: 'About Preview', status: 'Published', lastModified: '2025-01-14', section: 'Home' },
  { id: 3, title: 'Programs Highlights', status: 'Draft', lastModified: '2025-01-13', section: 'Home' },
  { id: 4, title: 'Testimonials', status: 'Published', lastModified: '2025-01-12', section: 'Home' },
];

const servicesItems: ContentItem[] = [
  { id: 5, title: 'Volunteer Programs', status: 'Published', lastModified: '2025-01-14', section: 'Services' },
  { id: 6, title: 'Placement Services', status: 'Draft', lastModified: '2025-01-13', section: 'Services' },
  { id: 7, title: 'Accommodation Services', status: 'Published', lastModified: '2025-01-11', section: 'Services' },
];

const blogItems: ContentItem[] = [
  { id: 8, title: 'Our Impact in 2024', status: 'Published', lastModified: '2025-01-15', section: 'Blog' },
  { id: 9, title: 'Volunteer Stories: A Journey of Hope', status: 'Published', lastModified: '2025-01-14', section: 'Blog' },
  { id: 10, title: 'Upcoming Events and How to Join', status: 'Draft', lastModified: '2025-01-13', section: 'Blog' },
  { id: 11, title: 'The Trokosi Outreach Program', status: 'Published', lastModified: '2025-01-12', section: 'Blog' },
  { id: 12, title: 'How Your Donations Make a Difference', status: 'Draft', lastModified: '2025-01-10', section: 'Blog' },
];

const galleryItems: ContentItem[] = [
  { id: 13, title: 'Community Outreach Photos', status: 'Published', lastModified: '2025-01-15', section: 'Gallery' },
  { id: 14, title: 'Tournament 2024 Highlights', status: 'Published', lastModified: '2025-01-14', section: 'Gallery' },
  { id: 15, title: 'Volunteer Activities', status: 'Draft', lastModified: '2025-01-12', section: 'Gallery' },
];

function ContentList({ items }: { items: ContentItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex items-center justify-between p-4 bg-white rounded-lg border border-gray-100 hover:shadow-sm transition-shadow">
          <div className="flex items-center gap-3">
            {item.section === 'Blog' && (
              <div className="w-10 h-10 rounded bg-[#C62828]/10 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-[#C62828]" />
              </div>
            )}
            {item.section === 'Gallery' && (
              <div className="w-10 h-10 rounded bg-blue-50 flex items-center justify-center">
                <ImageIcon className="w-5 h-5 text-blue-600" />
              </div>
            )}
            {item.section === 'Home' && (
              <div className="w-10 h-10 rounded bg-green-50 flex items-center justify-center">
                <Pencil className="w-5 h-5 text-green-600" />
              </div>
            )}
            {item.section === 'Services' && (
              <div className="w-10 h-10 rounded bg-orange-50 flex items-center justify-center">
                <Pencil className="w-5 h-5 text-orange-600" />
              </div>
            )}
            <div>
              <p className="font-medium text-[#333333]">{item.title}</p>
              <p className="text-xs text-[#333333]/50">Last modified: {item.lastModified}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`text-xs ${item.status === 'Published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
              {item.status}
            </Badge>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-green-50">
              <Pencil className="w-4 h-4 text-green-600" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-red-50">
              <Trash2 className="w-4 h-4 text-red-600" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ContentPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[#333333]">Content Management</h2>
        <Button className="bg-[#C62828] hover:bg-[#8E0000] text-white">
          <Plus className="w-4 h-4 mr-2" /> Add New
        </Button>
      </div>

      <Tabs defaultValue="home" className="w-full">
        <TabsList className="bg-white border border-gray-200">
          <TabsTrigger value="home">Home Page</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="blog">Blog</TabsTrigger>
          <TabsTrigger value="gallery">Gallery</TabsTrigger>
        </TabsList>
        <TabsContent value="home" className="mt-4">
          <ContentList items={homePageItems} />
        </TabsContent>
        <TabsContent value="services" className="mt-4">
          <ContentList items={servicesItems} />
        </TabsContent>
        <TabsContent value="blog" className="mt-4">
          <ContentList items={blogItems} />
        </TabsContent>
        <TabsContent value="gallery" className="mt-4">
          <ContentList items={galleryItems} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
