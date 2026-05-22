'use client';

import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Search,
  Calendar,
  ArrowRight,
  Filter,
  MapPin,
  Clock,
  Tag,
} from 'lucide-react';

interface NewsArticle {
  id: number;
  date: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
}

const categories = ['All', 'Peace Campaigns', 'Outreach', 'Conferences', 'Press Releases'];

const articles: NewsArticle[] = [
  {
    id: 1,
    date: 'Dec 15, 2024',
    category: 'Peace Campaigns',
    title: 'Community Peace Summit Draws Over 500 Leaders Across Ghana',
    excerpt: 'The annual peace summit organized by Duamenefa Foundation brought together traditional leaders, government officials, and community members to discuss sustainable peace strategies and conflict prevention methods.',
    image: '/reconciliation.jpg',
    readTime: '5 min read',
  },
  {
    id: 2,
    date: 'Dec 8, 2024',
    category: 'Outreach',
    title: 'Vocational Training Center Opens New Wing in Ho',
    excerpt: 'A new wing of the vocational training center was inaugurated to provide expanded skills development opportunities for liberated individuals, orphans, and vulnerable youth in the Volta Region.',
    image: '/vocational-training.jpg',
    readTime: '4 min read',
  },
  {
    id: 3,
    date: 'Nov 28, 2024',
    category: 'Press Releases',
    title: 'Trokosi Liberation Campaign Reaches Historic Milestone',
    excerpt: 'Our campaign against shrine servitude has successfully advocated for the release of 45 individuals this year, bringing the total number of freed persons to over 200 since the program began.',
    image: '/women-empowerment.jpg',
    readTime: '6 min read',
  },
  {
    id: 4,
    date: 'Nov 20, 2024',
    category: 'Conferences',
    title: 'International Peace Conference 2024: Building Bridges',
    excerpt: 'Duamenefa Foundation hosted an international peace conference featuring speakers from across Africa and beyond, focusing on innovative approaches to community reconciliation and restorative justice.',
    image: '/hero-peace.jpg',
    readTime: '7 min read',
  },
  {
    id: 5,
    date: 'Nov 10, 2024',
    category: 'Peace Campaigns',
    title: 'Radio Peace Program Expands to Northern Ghana',
    excerpt: 'Following the success of our radio programs in the Volta Region, Duamenefa Foundation is expanding its Peace & Reconciliation Hour to Justice FM 98.5 in Tamale, reaching new communities in the North.',
    image: '/radio-broadcast.jpg',
    readTime: '4 min read',
  },
  {
    id: 6,
    date: 'Nov 1, 2024',
    category: 'Outreach',
    title: 'Children\'s Rights Awareness Walk Attracts Thousands',
    excerpt: 'Over 2,000 community members participated in our annual Children\'s Rights Awareness Walk, calling for stronger protections for children against spiritual manipulation and abuse.',
    image: '/children-education.jpg',
    readTime: '3 min read',
  },
  {
    id: 7,
    date: 'Oct 22, 2024',
    category: 'Conferences',
    title: 'Youth Leadership Summit: Empowering the Next Generation',
    excerpt: 'Young leaders from across Ghana gathered for a three-day summit focused on leadership development, peace-building skills, and community service, organized by Duamenefa Foundation.',
    image: '/community-outreach.jpg',
    readTime: '5 min read',
  },
  {
    id: 8,
    date: 'Oct 15, 2024',
    category: 'Press Releases',
    title: 'Duamenefa Foundation Receives International Recognition',
    excerpt: 'The foundation was honored with the African Peace Builder Award 2024 in recognition of its outstanding contributions to peace, reconciliation, and human rights advocacy across the continent.',
    image: '/reconciliation.jpg',
    readTime: '4 min read',
  },
];

const upcomingEvents = [
  { title: 'Annual Peace Summit 2025', date: 'Jan 20, 2025', location: 'Ho, Volta Region' },
  { title: 'Child Rights Workshop', date: 'Feb 5, 2025', location: 'Hohoe, Volta Region' },
  { title: 'Vocational Training Graduation', date: 'Feb 20, 2025', location: 'Training Center, Ho' },
  { title: 'Community Outreach Day', date: 'Mar 8, 2025', location: 'Kpando, Volta Region' },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 },
};

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === 'All' || article.category === activeCategory;
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <div className="pt-20 md:pt-28">
      {/* Hero */}
      <section className="relative py-16 md:py-24 bg-[#0B3C5D] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute bottom-0 right-0 w-96 h-96 rounded-full bg-[#D4AF37] blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="inline-block bg-[#D4AF37]/20 text-[#D4AF37] text-sm font-medium px-4 py-1.5 rounded-full mb-4">
            📰 Stay Informed
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl mb-4">
            Latest <span className="text-[#D4AF37]">News</span>
          </h1>
          <p className="text-white/70 max-w-2xl mx-auto">
            Stay updated on our programs, campaigns, events, and the impact we are
            making across communities in Ghana.
          </p>
        </div>
      </section>

      {/* News Content */}
      <section className="py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Search & Filter */}
              <div className="mb-8 space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[#6B4F3A]/50" />
                  <Input
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 border-gray-200 focus:border-[#D4AF37]"
                  />
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Filter className="h-4 w-4 text-[#6B4F3A]" />
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200 ${
                        activeCategory === category
                          ? 'bg-[#0B3C5D] text-white'
                          : 'bg-gray-100 text-[#6B4F3A] hover:bg-gray-200'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Articles Grid */}
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-[#6B4F3A]">No articles found matching your search.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredArticles.map((article, index) => (
                    <motion.div
                      key={article.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <Card className="group border-0 shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden cursor-pointer">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-0">
                          <div className="relative h-48 sm:h-auto overflow-hidden">
                            <img
                              src={article.image}
                              alt={article.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <CardContent className="sm:col-span-2 p-5">
                            <div className="flex items-center gap-3 mb-2">
                              <Badge
                                variant="secondary"
                                className="bg-[#D4AF37]/10 text-[#D4AF37] text-xs"
                              >
                                <Tag className="h-3 w-3 mr-1" />
                                {article.category}
                              </Badge>
                              <span className="text-xs text-[#6B4F3A]/60 flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {article.date}
                              </span>
                              <span className="text-xs text-[#6B4F3A]/60 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {article.readTime}
                              </span>
                            </div>
                            <h3 className="font-heading font-semibold text-[#0B3C5D] mb-2 line-clamp-2 group-hover:text-[#D4AF37] transition-colors">
                              {article.title}
                            </h3>
                            <p className="text-[#6B4F3A] text-sm leading-relaxed line-clamp-2">
                              {article.excerpt}
                            </p>
                            <div className="mt-3 flex items-center gap-1 text-[#D4AF37] text-sm font-medium group-hover:gap-2 transition-all">
                              Read More <ArrowRight className="h-3 w-3" />
                            </div>
                          </CardContent>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Upcoming Events */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-lg text-[#0B3C5D] mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-[#D4AF37]" />
                    Upcoming Events
                  </h3>
                  <div className="space-y-4">
                    {upcomingEvents.map((event) => (
                      <div
                        key={event.title}
                        className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
                      >
                        <h4 className="font-heading font-semibold text-[#0B3C5D] text-sm mb-1">
                          {event.title}
                        </h4>
                        <div className="space-y-1 text-xs text-[#6B4F3A]">
                          <p className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" /> {event.date}
                          </p>
                          <p className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> {event.location}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Categories */}
              <Card className="border-0 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-lg text-[#0B3C5D] mb-4">
                    Categories
                  </h3>
                  <div className="space-y-2">
                    {categories.filter(c => c !== 'All').map((category) => {
                      const count = articles.filter(
                        (a) => a.category === category
                      ).length;
                      return (
                        <button
                          key={category}
                          onClick={() => setActiveCategory(category)}
                          className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          <span className="text-[#0B3C5D] font-medium">{category}</span>
                          <Badge variant="secondary" className="bg-[#0B3C5D]/10 text-[#0B3C5D] text-xs">
                            {count}
                          </Badge>
                        </button>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Newsletter */}
              <Card className="border-0 shadow-lg bg-[#0B3C5D] text-white">
                <CardContent className="p-6">
                  <h3 className="font-heading font-bold text-lg mb-2 text-[#D4AF37]">
                    Stay Updated
                  </h3>
                  <p className="text-white/70 text-sm mb-4">
                    Get the latest news delivered directly to your inbox.
                  </p>
                  <Input
                    type="email"
                    placeholder="Your email"
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-[#D4AF37] mb-3"
                  />
                  <Button className="w-full bg-[#D4AF37] hover:bg-[#c9a22e] text-[#0B3C5D] font-semibold">
                    Subscribe
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
