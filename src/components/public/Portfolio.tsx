'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
}

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const { data } = await res.json();
      setProjects(data?.slice(0, 3) || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="portfolio" className="py-20 px-4 bg-primary-bg">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold font-heading text-text-primary mb-4">
            Portfolio
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Showcase of recent projects and achievements
          </p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-primary-section border border-primary-action/30 rounded-xl overflow-hidden">
                <div className="h-48 skeleton"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 skeleton rounded w-3/4"></div>
                  <div className="h-4 skeleton rounded w-full"></div>
                  <div className="h-4 skeleton rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {projects.map((project, idx) => (
                <div
                  key={project.id}
                  className="group bg-gradient-to-br from-primary-section to-primary-bg border border-primary-action/50 rounded-xl overflow-hidden hover:border-primary-action transition-all duration-300 hover:shadow-lg hover:shadow-primary-action/20 transform hover:-translate-y-1 animate-fade-in-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  {project.image && (
                    <div className="h-48 bg-primary-bg flex items-center justify-center text-text-muted overflow-hidden relative">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary-action/20 to-ai-highlight/20 group-hover:from-primary-action/30 group-hover:to-ai-highlight/30 transition-all duration-300"></div>
                      <span className="relative">[Image]</span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary-action mb-2 group-hover:text-primary-hover transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-text-muted mb-4 group-hover:text-text-primary transition-colors">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary-action/20 text-primary-action text-xs rounded-full hover:bg-primary-action/30 transition-colors"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-3">
                      <Link
                        href={`/portfolio/${project.id}`}
                        className="inline-flex items-center text-primary-action hover:text-primary-hover transition-colors group/link"
                      >
                        Case Study
                        <span className="ml-2 group-hover/link:translate-x-1 transition-transform">→</span>
                      </Link>
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center text-ai-highlight hover:text-ai-highlight/80 transition-colors group/link"
                        >
                          Live
                          <span className="ml-2 group-hover/link:translate-x-1 transition-transform">↗</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link
                href="/portfolio"
                className="inline-block px-8 py-3 bg-primary-action hover:bg-primary-hover text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-primary-action/50 transform hover:scale-105 transition-all duration-300"
              >
                View All Projects
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
