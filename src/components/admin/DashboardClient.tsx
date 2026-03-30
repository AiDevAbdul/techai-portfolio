'use client';

import { ReactNode } from 'react';
import { signOut } from 'next-auth/react';
import AdminSidebar from './AdminSidebar';
import AdminHeader from './AdminHeader';

interface DashboardClientProps {
  children: ReactNode;
  user?: any;
}

export default function DashboardClient({ children, user }: DashboardClientProps) {
  return (
    <div className="flex h-screen bg-primary-bg">
      <AdminSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <AdminHeader user={user} onLogout={() => signOut()} />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
