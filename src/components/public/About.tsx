'use client';

import { useState, useEffect } from 'react';

function Counter({ end, label, color }: { end: number; label: string; color: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const increment = end / 30;
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 30);
    return () => clearInterval(timer);
  }, [end]);

  return (
    <div className="bg-primary-bg/50 border border-primary-action/30 rounded-xl p-6 text-center hover:border-primary-action/50 transition-all duration-300 transform hover:-translate-y-1">
      <div className={`text-4xl font-bold mb-2 ${color}`}>{count}+</div>
      <p className="text-text-muted">{label}</p>
    </div>
  );
}

export default function About() {
  const skills = [
    'React',
    'Next.js',
    'TypeScript',
    'Node.js',
    'Python',
    'AI/ML',
    'Web Design',
    'DevOps',
  ];

  return (
    <section className="py-20 px-4 bg-primary-section relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary-action/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-ai-highlight/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="animate-fade-in-up">
          <h2 className="text-4xl font-bold font-heading mb-4 text-text-primary">
            About Me
          </h2>
          <p className="text-text-muted mb-8">
            Passionate educator, developer, and automation specialist
          </p>
        </div>

        <div className="space-y-8 text-text-muted animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div className="bg-primary-bg/50 border border-primary-action/30 rounded-xl p-8 hover:border-primary-action/50 transition-all duration-300">
            <p className="leading-relaxed text-lg">
              I'm Abdul Wahab, a passionate educator and technology enthusiast with expertise in web development, AI automation, and online tutoring. With years of experience in the tech industry, I've helped hundreds of students and professionals master new skills and achieve their goals.
            </p>
          </div>

          <div className="bg-primary-bg/50 border border-primary-action/30 rounded-xl p-8 hover:border-primary-action/50 transition-all duration-300">
            <p className="leading-relaxed text-lg">
              My mission is to make technology accessible and understandable for everyone. Whether you're looking to learn programming, automate your workflows, build your next web application, or scale your business with AI, I'm here to help you succeed.
            </p>
          </div>

          <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h3 className="text-2xl font-semibold text-primary-action mb-6">
              Skills & Expertise
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {skills.map((skill, idx) => (
                <div
                  key={skill}
                  className="group px-4 py-3 bg-gradient-to-br from-primary-action/20 to-primary-action/10 border border-primary-action/30 text-primary-action rounded-lg text-sm font-medium hover:border-primary-action hover:bg-primary-action/30 transition-all duration-300 transform hover:scale-105 text-center animate-fade-in-up"
                  style={{ animationDelay: `${0.3 + idx * 0.05}s` }}
                >
                  {skill}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <Counter end={500} label="Students Trained" color="text-primary-action" />
            <Counter end={100} label="Projects Completed" color="text-ai-highlight" />
            <Counter end={8} label="Years Experience" color="text-cta-badge" />
          </div>
        </div>
      </div>
    </section>
  );
}
