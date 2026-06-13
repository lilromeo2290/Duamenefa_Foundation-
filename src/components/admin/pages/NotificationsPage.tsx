'use client';

import React from 'react';
import { Bell } from 'lucide-react';

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-semibold text-[#333333]">Notifications</h2>
      </div>

      {/* Empty state */}
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
          <Bell className="w-8 h-8 text-[#333333]/30" />
        </div>
        <h3 className="text-lg font-medium text-[#333333]/60 mb-1">No Notifications</h3>
        <p className="text-sm text-[#333333]/40 max-w-sm">
          You're all caught up. Notifications will appear here when there is new activity.
        </p>
      </div>
    </div>
  );
}
