'use client';

import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, Info, AlertTriangle, CheckCircle, XCircle, Check } from 'lucide-react';

type NotificationType = 'info' | 'warning' | 'success' | 'error';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  timeAgo: string;
  read: boolean;
}

const sampleNotifications: Notification[] = [
  { id: 1, type: 'success', title: 'Donation Received', message: 'A donation of $500 was received from John Doe for the Education Fund.', timeAgo: '5 min ago', read: false },
  { id: 2, type: 'info', title: 'New Volunteer Registration', message: 'Grace Mensah has registered as a new volunteer with Teaching skills.', timeAgo: '15 min ago', read: false },
  { id: 3, type: 'warning', title: 'Accommodation Nearly Full', message: 'Accra Volunteer Lodge is at 90% capacity. Consider arranging additional accommodation.', timeAgo: '1 hour ago', read: false },
  { id: 4, type: 'error', title: 'Payment Failed', message: 'A payment of $350 from Robert Johnson failed. Please follow up.', timeAgo: '2 hours ago', read: false },
  { id: 5, type: 'info', title: 'Upcoming Event Reminder', message: 'Community Outreach Day is scheduled for February 10, 2025.', timeAgo: '3 hours ago', read: true },
  { id: 6, type: 'success', title: 'Application Approved', message: 'Kwame Asante\'s placement application has been approved for Vocational Training.', timeAgo: '5 hours ago', read: true },
  { id: 7, type: 'warning', title: 'Document Expiry', message: 'Organization registration document expires in 30 days. Please renew.', timeAgo: '8 hours ago', read: false },
  { id: 8, type: 'info', title: 'New Blog Comment', message: 'A new comment was posted on "Our Impact in 2024" blog post.', timeAgo: '1 day ago', read: true },
  { id: 9, type: 'success', title: 'Event Completed', message: 'Health Awareness Walk has been marked as completed with 350 attendees.', timeAgo: '1 day ago', read: true },
  { id: 10, type: 'error', title: 'System Alert', message: 'Server response time exceeded threshold. Check system status.', timeAgo: '2 days ago', read: true },
  { id: 11, type: 'info', title: 'Report Generated', message: 'Monthly analytics report for December 2024 has been generated.', timeAgo: '2 days ago', read: true },
  { id: 12, type: 'warning', title: 'Volunteer Hours Low', message: 'Daniel Amewu has logged only 5 hours this month, below the minimum requirement.', timeAgo: '3 days ago', read: false },
  { id: 13, type: 'success', title: 'Airport Pickup Completed', message: 'Pickup for Michael Brown (Flight DL 156) has been completed successfully.', timeAgo: '3 days ago', read: true },
  { id: 14, type: 'info', title: 'New Media Upload', message: '5 new images have been uploaded to the gallery by Lisa Anderson.', timeAgo: '4 days ago', read: true },
  { id: 15, type: 'error', title: 'Booking Cancellation', message: 'Sarah Wilson has cancelled her accommodation booking at Aflao Community House.', timeAgo: '5 days ago', read: true },
];

function getTypeIcon(type: NotificationType) {
  switch (type) {
    case 'info': return Info;
    case 'warning': return AlertTriangle;
    case 'success': return CheckCircle;
    case 'error': return XCircle;
  }
}

function getTypeColor(type: NotificationType) {
  switch (type) {
    case 'info': return 'bg-blue-100 text-blue-600';
    case 'warning': return 'bg-yellow-100 text-yellow-600';
    case 'success': return 'bg-green-100 text-green-600';
    case 'error': return 'bg-red-100 text-red-600';
  }
}

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(sampleNotifications);
  const [filter, setFilter] = useState<'All' | 'Unread' | 'Read'>('All');

  const filtered = notifications.filter((n) => {
    if (filter === 'Unread') return !n.read;
    if (filter === 'Read') return n.read;
    return true;
  });

  const toggleRead = (id: number) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-[#333333]">Notifications</h2>
          {unreadCount > 0 && (
            <Badge className="bg-[#C62828] text-white">{unreadCount} unread</Badge>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden">
            {(['All', 'Unread', 'Read'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${
                  filter === f ? 'bg-[#C62828] text-white' : 'text-[#333333]/60 hover:bg-gray-50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <Button variant="outline" size="sm" onClick={markAllRead} className="text-xs">
            <Check className="w-3.5 h-3.5 mr-1" /> Mark All as Read
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        {filtered.map((notification) => {
          const IconComponent = getTypeIcon(notification.type);
          return (
            <Card
              key={notification.id}
              className={`shadow-sm transition-all cursor-pointer hover:shadow-md ${
                !notification.read ? 'border-l-4 border-l-[#C62828] bg-white' : 'bg-gray-50/50'
              }`}
              onClick={() => toggleRead(notification.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${getTypeColor(notification.type)}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className={`text-sm font-medium ${!notification.read ? 'text-[#333333]' : 'text-[#333333]/70'}`}>
                        {notification.title}
                      </h4>
                      <span className="text-xs text-[#333333]/40 whitespace-nowrap">{notification.timeAgo}</span>
                    </div>
                    <p className="text-xs text-[#333333]/60 mt-0.5">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <div className="w-2.5 h-2.5 rounded-full bg-[#C62828] flex-shrink-0 mt-1.5" />
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
