'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Projects', href: '/dashboard/projects' },
  { label: 'Blogs', href: '/dashboard/blogs' },
  { label: 'Testimonials', href: '/dashboard/testimonials' },
  { label: 'Leads', href: '/dashboard/leads' },
  { label: 'Settings', href: '/dashboard/settings' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary-section border-r border-primary-action">
      <div className="p-6">
        <h1 className="text-2xl font-bold font-heading text-primary-action">
          techai
        </h1>
        <p className="text-sm text-text-muted mt-1">Admin Dashboard</p>
      </div>

      <nav className="mt-8 space-y-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 rounded transition ${
                isActive
                  ? 'bg-primary-action text-white'
                  : 'text-text-primary hover:bg-primary-action/20'
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
