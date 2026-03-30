'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
}

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs?published=true');
      const { data } = await res.json();
      setBlogs(data?.slice(0, 3) || []);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-primary-section">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold font-heading text-text-primary mb-4">
            Latest Articles
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            Insights on web development, AI, and tech education
          </p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-primary-bg border border-primary-action/30 rounded-xl p-6">
                <div className="h-6 skeleton rounded w-3/4 mb-4"></div>
                <div className="h-4 skeleton rounded w-full mb-2"></div>
                <div className="h-4 skeleton rounded w-5/6 mb-6"></div>
                <div className="h-4 skeleton rounded w-1/3"></div>
              </div>
            ))}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {blogs.map((blog, idx) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="group bg-gradient-to-br from-primary-bg to-primary-section border border-primary-action/50 rounded-xl p-6 hover:border-primary-action transition-all duration-300 hover:shadow-lg hover:shadow-primary-action/20 transform hover:-translate-y-1 animate-fade-in-up block"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <h3 className="text-xl font-semibold text-primary-action mb-2 group-hover:text-primary-hover transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-text-muted mb-4 group-hover:text-text-primary transition-colors line-clamp-3">
                    {blog.excerpt}
                  </p>
                  <div className="flex items-center justify-between pt-4 border-t border-primary-action/30">
                    <p className="text-sm text-text-muted">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                    <span className="text-primary-action group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </Link>
              ))}
            </div>
            <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Link
                href="/blog"
                className="inline-block px-8 py-3 bg-primary-action hover:bg-primary-hover text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-primary-action/50 transform hover:scale-105 transition-all duration-300"
              >
                Read All Articles
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
