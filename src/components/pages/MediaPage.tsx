'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Play,
  Pause,
  Radio,
  Tv,
  Volume2,
  Calendar,
  Clock,
  Image as ImageIcon,
  Headphones,
  Facebook,
  Youtube,
  Twitter,
  Instagram,
  ExternalLink,
} from 'lucide-react';

const broadcastSchedule = [
  { day: 'Sunday', time: '7:00 - 10:00 PM', station: 'Fafaa 100.3 FM', program: 'Peace & Reconciliation Hour', live: true },
  { day: 'Tuesday', time: '11:00 AM - 2:00 PM', station: 'Justice FM 98.5', program: 'Justice & Human Rights', live: false },
  { day: 'Thursday', time: '11:00 AM - 2:00 PM', station: 'Swiss FM 93.7', program: 'Community Dialogue', live: false },
];

const videos = [
  { title: 'Peace Summit 2024 Highlights', duration: '15:30', thumbnail: '/reconciliation.jpg' },
  { title: 'Community Reconciliation Process', duration: '22:45', thumbnail: '/community-outreach.jpg' },
  { title: 'Vocational Training Graduation', duration: '12:00', thumbnail: '/vocational-training.jpg' },
  { title: 'Trokosi Liberation Documentary', duration: '35:20', thumbnail: '/women-empowerment.jpg' },
  { title: 'Children\'s Rights Workshop', duration: '18:15', thumbnail: '/children-education.jpg' },
  { title: 'Annual Peace Award Ceremony', duration: '28:40', thumbnail: '/hero-peace.jpg' },
];

const podcasts = [
  { title: 'Understanding Peace Mediation', episode: 'Ep. 24', duration: '32 min', date: 'Dec 10, 2024' },
  { title: 'The Trokosi Story: Voices of Freedom', episode: 'Ep. 23', duration: '45 min', date: 'Dec 3, 2024' },
  { title: 'Child Rights in Ghanaian Communities', episode: 'Ep. 22', duration: '28 min', date: 'Nov 26, 2024' },
  { title: 'Spiritual Conflict Resolution Methods', episode: 'Ep. 21', duration: '38 min', date: 'Nov 19, 2024' },
  { title: 'Women Empowerment Success Stories', episode: 'Ep. 20', duration: '35 min', date: 'Nov 12, 2024' },
  { title: 'Building Peace Through Dialogue', episode: 'Ep. 19', duration: '30 min', date: 'Nov 5, 2024' },
];

const photos = [
  { src: '/hero-peace.jpg', caption: 'Community peacebuilding gathering' },
  { src: '/children-education.jpg', caption: 'Children in our education program' },
  { src: '/women-empowerment.jpg', caption: 'Women empowerment workshop' },
  { src: '/radio-broadcast.jpg', caption: 'Live radio broadcast session' },
  { src: '/reconciliation.jpg', caption: 'Community reconciliation event' },
  { src: '/vocational-training.jpg', caption: 'Vocational skills training' },
  { src: '/community-outreach.jpg', caption: 'Outreach program in rural community' },
  { src: '/women-empowerment.jpg', caption: 'Cooperative meeting' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function MediaPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeStation, setActiveStation] = useState('Fafaa 100.3 FM');
  const [activeTab, setActiveTab] = useState('radio');

  return (
    <div className="pt-20 md:pt-28">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            📡 Media Center
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Our <span className="text-[#D4AF37]">Media</span> Hub
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Watch, listen, and engage with our broadcasts, podcasts, and media content
            that spreads the message of peace across Ghana and beyond.
          </p>
        </div>
      </section>

      {/* Media Tabs */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="w-full flex flex-wrap justify-center mb-10 bg-gray-100 h-auto p-1 gap-1">
              <TabsTrigger value="radio" className="flex-1 min-w-[120px] data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white">
                <Radio className="h-4 w-4 mr-2" /> Live Radio
              </TabsTrigger>
              <TabsTrigger value="schedule" className="flex-1 min-w-[120px] data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white">
                <Calendar className="h-4 w-4 mr-2" /> Schedule
              </TabsTrigger>
              <TabsTrigger value="videos" className="flex-1 min-w-[120px] data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white">
                <Tv className="h-4 w-4 mr-2" /> Videos
              </TabsTrigger>
              <TabsTrigger value="podcasts" className="flex-1 min-w-[120px] data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white">
                <Headphones className="h-4 w-4 mr-2" /> Podcasts
              </TabsTrigger>
              <TabsTrigger value="photos" className="flex-1 min-w-[120px] data-[state=active]:bg-[#0B3C5D] data-[state=active]:text-white">
                <ImageIcon className="h-4 w-4 mr-2" /> Photos
              </TabsTrigger>
            </TabsList>

            {/* Radio Tab */}
            <TabsContent value="radio">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Player */}
                <div className="lg:col-span-2">
                  <Card className="border-0 shadow-lg overflow-hidden">
                    <CardContent className="p-6 md:p-8">
                      <div className="flex items-center gap-2 mb-6">
                        <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                        <span className="text-red-500 text-sm font-bold uppercase">Live</span>
                      </div>

                      <div className="flex items-center gap-6 mb-6">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="w-16 h-16 rounded-full bg-[#D4AF37] hover:bg-[#c9a22e] flex items-center justify-center transition-colors shrink-0"
                        >
                          {isPlaying ? (
                            <Pause className="h-7 w-7 text-[#0B3C5D]" />
                          ) : (
                            <Play className="h-7 w-7 text-[#0B3C5D] ml-1" />
                          )}
                        </button>
                        <div>
                          <h3 className="font-heading font-bold text-xl text-[#0B3C5D]">
                            Peace & Reconciliation Hour
                          </h3>
                          <p className="text-[#6B4F3A] text-sm">{activeStation}</p>
                        </div>
                      </div>

                      {/* Waveform */}
                      <div className="flex items-center gap-0.5 mb-6 h-12">
                        {Array.from({ length: 40 }).map((_, i) => (
                          <div
                            key={i}
                            className={`w-1 rounded-full transition-all duration-300 ${
                              isPlaying
                                ? 'waveform-bar bg-[#D4AF37]'
                                : 'bg-gray-200'
                            }`}
                            style={{
                              height: isPlaying ? undefined : `${4 + Math.random() * 20}px`,
                              animationDelay: `${i * 0.03}s`,
                            }}
                          />
                        ))}
                      </div>

                      {/* Progress & Volume */}
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-[#6B4F3A]">0:00</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                          <div className="bg-[#D4AF37] h-1.5 rounded-full w-0" />
                        </div>
                        <span className="text-xs text-[#6B4F3A]">Live</span>
                        <Volume2 className="h-4 w-4 text-[#6B4F3A]" />
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Station Selector */}
                <div>
                  <Card className="border-0 shadow-lg">
                    <CardContent className="p-6">
                      <h4 className="font-heading font-semibold text-[#0B3C5D] mb-4">
                        Select Station
                      </h4>
                      <div className="space-y-3">
                        {['Fafaa 100.3 FM', 'Justice FM 98.5', 'Swiss FM 93.7', 'Messiah TV Audio'].map(
                          (station) => (
                            <button
                              key={station}
                              onClick={() => setActiveStation(station)}
                              className={`w-full text-left p-3 rounded-lg transition-all duration-200 flex items-center gap-3 ${
                                activeStation === station
                                  ? 'bg-[#0B3C5D] text-white'
                                  : 'bg-gray-50 text-[#6B4F3A] hover:bg-gray-100'
                              }`}
                            >
                              <Radio className="h-4 w-4 shrink-0" />
                              <span className="text-sm font-medium">{station}</span>
                            </button>
                          )
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Schedule Tab */}
            <TabsContent value="schedule">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-6">
                    Broadcast Schedule
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 px-4 font-heading font-semibold text-[#0B3C5D] text-sm">Day</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold text-[#0B3C5D] text-sm">Time</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold text-[#0B3C5D] text-sm">Station</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold text-[#0B3C5D] text-sm">Program</th>
                          <th className="text-left py-3 px-4 font-heading font-semibold text-[#0B3C5D] text-sm">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {broadcastSchedule.map((item) => (
                          <tr key={item.day + item.station} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 px-4 font-medium text-[#0B3C5D]">{item.day}</td>
                            <td className="py-4 px-4 text-[#6B4F3A] flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {item.time}
                            </td>
                            <td className="py-4 px-4">
                              <Badge variant="secondary" className="bg-[#0B3C5D]/10 text-[#0B3C5D]">
                                {item.station}
                              </Badge>
                            </td>
                            <td className="py-4 px-4 text-[#6B4F3A]">{item.program}</td>
                            <td className="py-4 px-4">
                              {item.live ? (
                                <Badge className="bg-red-500 text-white">Live</Badge>
                              ) : (
                                <Badge variant="outline" className="text-[#6B4F3A]">Scheduled</Badge>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Videos Tab */}
            <TabsContent value="videos">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {videos.map((video, index) => (
                  <motion.div
                    key={video.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                  >
                    <Card className="group border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                      <div className="relative aspect-video overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-14 h-14 rounded-full bg-[#D4AF37] flex items-center justify-center">
                            <Play className="h-7 w-7 text-[#0B3C5D] ml-1" />
                          </div>
                        </div>
                        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded">
                          {video.duration}
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-heading font-semibold text-[#0B3C5D] text-sm line-clamp-2">
                          {video.title}
                        </h4>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </TabsContent>

            {/* Podcasts Tab */}
            <TabsContent value="podcasts">
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6 md:p-8">
                  <h3 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-6">
                    Podcast Archive
                  </h3>
                  <div className="space-y-4">
                    {podcasts.map((podcast) => (
                      <div
                        key={podcast.title}
                        className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                      >
                        <button className="w-10 h-10 rounded-full bg-[#0B3C5D] flex items-center justify-center shrink-0 hover:bg-[#0a2e47] transition-colors">
                          <Play className="h-4 w-4 text-white ml-0.5" />
                        </button>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-heading font-semibold text-[#0B3C5D] text-sm truncate">
                            {podcast.title}
                          </h4>
                          <p className="text-[#6B4F3A]/70 text-xs">
                            {podcast.episode} • {podcast.duration} • {podcast.date}
                          </p>
                        </div>
                        <Badge variant="secondary" className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs shrink-0">
                          {podcast.duration}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Photos Tab */}
            <TabsContent value="photos">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {photos.map((photo, index) => (
                  <motion.div
                    key={photo.src + index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <div className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer">
                      <img
                        src={photo.src}
                        alt={photo.caption}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-3 left-3 right-3">
                          <p className="text-white text-xs">{photo.caption}</p>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Social Media Links */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeInUp}>
            <h3 className="font-heading font-bold text-2xl text-[#0B3C5D] mb-6">
              Follow Us on <span className="text-[#D4AF37]">Social Media</span>
            </h3>
            <div className="flex items-center justify-center gap-4 flex-wrap">
              {[
                { icon: <Facebook className="h-6 w-6" />, label: 'Facebook', color: 'bg-blue-600' },
                { icon: <Youtube className="h-6 w-6" />, label: 'YouTube', color: 'bg-red-600' },
                { icon: <Twitter className="h-6 w-6" />, label: 'Twitter', color: 'bg-sky-500' },
                { icon: <Instagram className="h-6 w-6" />, label: 'Instagram', color: 'bg-pink-600' },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="flex items-center gap-3 px-6 py-3 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className={`${social.color} text-white p-2 rounded-lg`}>
                    {social.icon}
                  </div>
                  <span className="font-heading font-medium text-[#0B3C5D]">
                    {social.label}
                  </span>
                  <ExternalLink className="h-3 w-3 text-[#6B4F3A]/50" />
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
