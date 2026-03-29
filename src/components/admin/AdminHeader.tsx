'use client';

import { Session } from 'next-auth';

interface AdminHeaderProps {
  user?: Session['user'];
  onLogout: () => void;
}

export default function AdminHeader({ user, onLogout }: AdminHeaderProps) {
  return (
    <header className="bg-primary-section border-b border-primary-action px-6 py-4 flex items-center justify-between">
      <div>
        <h2 className="text-xl font-semibold text-text-primary">
          Welcome back!
        </h2>
        <p className="text-sm text-text-muted">{user?.email}</p>
      </div>

      <button
        onClick={onLogout}
        className="px-4 py-2 bg-accent-pink hover:bg-accent-pink/80 text-white rounded transition"
      >
        Logout
      </button>
    </header>
  );
}
