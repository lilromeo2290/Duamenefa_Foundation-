'use client';

import React from 'react';
import { AdminContextProvider } from './AdminContext';
import { AdminAuthProvider, useAdminAuth } from './AdminAuthContext';
import AdminShell from './AdminShell';
import AdminLoginPage from './AdminLoginPage';

function AdminGate() {
  const { isAuthenticated } = useAdminAuth();

  if (!isAuthenticated) {
    return <AdminLoginPage />;
  }

  return <AdminShell />;
}

export default function AdminPage() {
  return (
    <AdminAuthProvider>
      <AdminContextProvider>
        <AdminGate />
      </AdminContextProvider>
    </AdminAuthProvider>
  );
}
