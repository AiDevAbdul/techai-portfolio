'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const roles = [
    'Online Tutor',
    'AI Automation Specialist',
    'Web Developer',
    'Consultant',
    'Tech Speaker',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setRoleIndex((prev) => (prev + 1) % roles.length);
        setIsTransitioning(false);
      }, 300);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-b from-primary-bg via-primary-section to-primary-bg relative overflow-hidden">
      {/* Enhanced animated background with multiple layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Primary gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-action/15 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-ai-highlight/15 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>

        {/* Secondary accent orbs */}
        <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-gradient-action/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-success-action/8 rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:50px_50px] opacity-30"></div>
      </div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Decorative top accent */}
        <div className="mb-8 animate-fade-in-up">
          <div className="inline-block px-4 py-2 rounded-full bg-primary-action/10 border border-primary-action/30 backdrop-blur-sm">
            <p className="text-sm font-semibold text-primary-action tracking-widest uppercase">Welcome to my digital space</p>
          </div>
        </div>

        {/* Main heading with gradient */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.05s' }}>
          <h1 className="text-6xl md:text-8xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-text-primary via-primary-action to-ai-highlight mb-6 leading-tight">
            Abdul Wahab
          </h1>
        </div>

        {/* Dynamic role with smooth transitions */}
        <div className="h-20 md:h-24 mb-8 flex items-center justify-center relative">
          <div className={`transition-all duration-300 ${isTransitioning ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}>
            <p className="text-3xl md:text-4xl font-heading bg-gradient-to-r from-primary-action to-ai-highlight bg-clip-text text-transparent">
              {roles[roleIndex]}
            </p>
          </div>
        </div>

        {/* Enhanced tagline */}
        <p className="text-lg md:text-xl text-text-muted mb-4 max-w-3xl mx-auto animate-fade-in-up font-light leading-relaxed" style={{ animationDelay: '0.1s' }}>
          <span className="font-semibold text-primary-action">Learn It. Build It. Automate It.</span> — Empowering professionals through education, innovation, and automation.
        </p>

        {/* Subtitle with stats hint */}
        <p className="text-sm text-text-muted/70 mb-12 animate-fade-in-up" style={{ animationDelay: '0.15s' }}>
          500+ Students • 100+ Projects • 8+ Years of Excellence
        </p>

        {/* Enhanced CTA buttons */}
        <div className="flex gap-4 justify-center flex-wrap animate-fade-in-up mb-16" style={{ animationDelay: '0.2s' }}>
          <a
            href="#contact"
            className="group relative px-8 py-4 bg-gradient-to-r from-primary-action to-ai-highlight text-white rounded-lg font-semibold shadow-lg hover:shadow-2xl hover:shadow-primary-action/40 transform hover:scale-105 transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
            <span className="relative flex items-center gap-2">
              Get in Touch
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </span>
          </a>
          <a
            href="#portfolio"
            className="group px-8 py-4 border-2 border-primary-action text-primary-action hover:bg-primary-action/10 rounded-lg font-semibold transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
          >
            <span className="flex items-center gap-2">
              View My Work
              <span className="group-hover:translate-x-1 transition-transform">↓</span>
            </span>
          </a>
        </div>

        {/* Scroll indicator */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex justify-center">
            <a href="#services" className="text-text-muted/60 hover:text-primary-action transition-colors animate-bounce">
              <ChevronDown size={28} />
            </a>
          </div>
        </div>
      </div>

      {/* Floating accent elements */}
      <div className="absolute top-1/4 left-5 w-2 h-2 bg-primary-action rounded-full animate-pulse opacity-60"></div>
      <div className="absolute bottom-1/3 right-8 w-3 h-3 bg-ai-highlight rounded-full animate-pulse opacity-40" style={{ animationDelay: '0.5s' }}></div>
      <div className="absolute top-1/2 right-1/4 w-1.5 h-1.5 bg-gradient-action rounded-full animate-pulse opacity-50" style={{ animationDelay: '1s' }}></div>
    </section>
  );
}
