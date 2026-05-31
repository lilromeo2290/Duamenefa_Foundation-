'use client';

import React from 'react';
import { AdminAuthProvider, useAdminAuth } from './AdminAuthContext';
import { AdminContextProvider } from './AdminContext';
import AdminShell from './AdminShell';
import AdminLoginPage from './AdminLoginPage';

function AdminGate() {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return (
    <AdminContextProvider>
      <AdminShell />
    </AdminContextProvider>
  );
}

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminGate />
    </AdminAuthProvider>
  );
}
