'use client';

import { useState } from 'react';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const roles = [
    'Online Tutor',
    'AI Automation Specialist',
    'Web Developer',
    'Consultant',
    'Tech Speaker',
  ];

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-primary-bg to-primary-section">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-bold font-heading text-text-primary mb-6">
          Abdul Wahab
        </h1>
        <p className="text-2xl md:text-3xl text-primary-action mb-8 font-heading">
          {roles[roleIndex]}
        </p>
        <p className="text-lg text-text-muted mb-12 max-w-2xl mx-auto">
          Learn It. Build It. Automate It. — Empowering professionals through education, innovation, and automation.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <a
            href="#contact"
            className="px-8 py-3 bg-primary-action hover:bg-primary-hover text-white rounded-lg transition font-semibold"
          >
            Get in Touch
          </a>
          <a
            href="#portfolio"
            className="px-8 py-3 border border-primary-action text-primary-action hover:bg-primary-action/10 rounded-lg transition font-semibold"
          >
            View Work
          </a>
        </div>
      </div>
    </section>
  );
}
