'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const pathname = usePathname();

  const navItems = [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-primary-section/80 border-b border-primary-action/30 backdrop-blur-md bg-opacity-95 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold font-heading transition-all duration-300 group-hover:scale-110">
              <span className="text-text-primary">tech</span>
              <span className="text-ai-highlight">ai</span>
              <span className="text-text-primary">.pk</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-300 group ${
                  pathname === item.href
                    ? 'text-primary-action'
                    : 'text-text-primary hover:text-primary-action'
                }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-primary-action to-primary-hover group-hover:w-full transition-all duration-300 ${
                  pathname === item.href ? 'w-full' : ''
                }`}></span>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="p-2 rounded-lg bg-primary-action/20 hover:bg-primary-action/30 text-text-primary transition-all duration-300 hover:scale-110 transform"
              title="Toggle theme"
            >
              {isDark ? '☀️' : '🌙'}
            </button>
            <button
              onClick={scrollToContact}
              className="px-6 py-2 bg-primary-action hover:bg-primary-hover text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-primary-action/50 transition-all duration-300 transform hover:scale-105"
            >
              Book a Call
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-text-primary hover:text-primary-action transition-colors duration-300 text-2xl"
          >
            {mobileMenuOpen ? '✕' : '☰'}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 animate-fade-in-up">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-2 rounded-lg transition-all duration-300 ${
                  pathname === item.href
                    ? 'bg-primary-action/20 text-primary-action font-semibold'
                    : 'text-text-primary hover:bg-primary-action/10 hover:text-primary-action'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <button
              onClick={() => {
                scrollToContact();
                setMobileMenuOpen(false);
              }}
              className="w-full mt-4 px-4 py-2 bg-primary-action hover:bg-primary-hover text-white rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Book a Call
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
