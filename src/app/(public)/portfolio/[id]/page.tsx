'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

interface Project {
  id: string;
  title: string;
  description: string;
  content?: string;
  image?: string;
  tags: string[];
  link?: string;
  category?: string;
  githubUrl?: string;
}

export default function CaseStudy() {
  const params = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(`/api/projects?id=${params.id}`);
        const { data } = await res.json();
        setProject(data);
      } catch (error) {
        console.error('Failed to fetch project:', error);
      } finally {
        setLoading(false);
      }
    };

    if (params.id) fetchProject();
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-primary-bg flex items-center justify-center">
        <div className="text-text-muted">Loading...</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-primary-bg flex flex-col items-center justify-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Project not found</h1>
        <Link href="/portfolio" className="text-primary-action hover:text-primary-hover">
          ← Back to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary-bg">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <Link href="/portfolio" className="text-primary-action hover:text-primary-hover mb-8 inline-flex items-center gap-2">
          ← Back to Portfolio
        </Link>

        <article className="animate-fade-in-up">
          <h1 className="text-5xl font-bold font-heading text-text-primary mb-4">
            {project.title}
          </h1>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-primary-action/20 text-primary-action text-sm rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {project.image && (
            <div className="w-full h-96 bg-primary-section border border-primary-action/30 rounded-xl mb-12 flex items-center justify-center text-text-muted">
              [Project Image]
            </div>
          )}

          <div className="prose prose-invert max-w-none mb-12">
            <h2 className="text-3xl font-bold text-text-primary mb-4">Overview</h2>
            <p className="text-text-muted text-lg leading-relaxed mb-8">
              {project.description}
            </p>

            {project.content && (
              <>
                <h2 className="text-3xl font-bold text-text-primary mb-4 mt-12">Details</h2>
                <div className="text-text-muted leading-relaxed whitespace-pre-wrap">
                  {project.content}
                </div>
              </>
            )}

            {project.category && (
              <>
                <h2 className="text-3xl font-bold text-text-primary mb-4 mt-12">Category</h2>
                <p className="text-text-muted text-lg">{project.category}</p>
              </>
            )}
          </div>

          <div className="flex gap-4 flex-wrap">
            {project.link && (
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 bg-primary-action hover:bg-primary-hover text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                View Live Project
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-3 border-2 border-primary-action text-primary-action hover:bg-primary-action/10 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
              >
                View on GitHub
              </a>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}
