'use client';

import React from 'react';
import { AdminContextProvider } from './AdminContext';
import AdminShell from './AdminShell';

export default function AdminPage() {
  return (
    <AdminContextProvider>
      <AdminShell />
    </AdminContextProvider>
  );
}
