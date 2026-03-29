'use client';

import { useEffect, useState } from 'react';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

interface Project {
  id: string;
  title: string;
  description: string;
  image?: string;
  tags: string[];
  link?: string;
}

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const { data } = await res.json();
      setProjects(data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-primary-bg py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold font-heading text-text-primary mb-12">
            Portfolio
          </h1>

          {loading ? (
            <div className="text-text-muted">Loading projects...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="bg-primary-section border border-primary-action rounded-lg overflow-hidden hover:border-primary-hover transition"
                >
                  {project.image && (
                    <div className="h-48 bg-primary-bg flex items-center justify-center text-text-muted">
                      [Image]
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-primary-action mb-2">
                      {project.title}
                    </h3>
                    <p className="text-text-muted mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-primary-action/20 text-primary-action text-xs rounded"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-action hover:text-primary-hover transition"
                      >
                        View Project →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
