'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';
import LatestBlogWidget from '@/components/public/LatestBlogWidget';

interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  createdAt: string;
}

export default function BlogListPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch('/api/blogs');
      const { data } = await res.json();
      setBlogs(data || []);
    } catch (error) {
      console.error('Failed to fetch blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-primary-bg py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main content */}
            <div className="lg:col-span-2">
              <h1 className="text-4xl font-bold font-heading text-text-primary mb-12 animate-fade-in-up">
                Blog
              </h1>

              {loading ? (
                <div className="text-text-muted">Loading articles...</div>
              ) : (
                <div className="space-y-6">
                  {blogs.map((blog, idx) => (
                    <Link
                      key={blog.id}
                      href={`/blog/${blog.slug}`}
                      className="block bg-primary-section border border-primary-action/50 rounded-lg p-6 hover:border-primary-action transition-all duration-300 hover:shadow-lg hover:shadow-primary-action/20 transform hover:-translate-y-1 animate-fade-in-up group"
                      style={{ animationDelay: `${idx * 0.05}s` }}
                    >
                      <h2 className="text-2xl font-semibold text-primary-action group-hover:text-primary-hover mb-2 transition-colors">
                        {blog.title}
                      </h2>
                      <p className="text-text-muted mb-4 group-hover:text-text-primary transition-colors">{blog.excerpt}</p>
                      <p className="text-sm text-text-muted">
                        {new Date(blog.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </p>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-20 space-y-8">
                <div className="bg-primary-section border border-primary-action/30 rounded-lg p-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                  <h3 className="text-xl font-semibold text-primary-action mb-4">
                    Latest Articles
                  </h3>
                  <LatestBlogWidget />
                </div>

                <div className="bg-gradient-to-br from-primary-action/10 to-ai-highlight/10 border border-primary-action/30 rounded-lg p-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                  <h3 className="text-xl font-semibold text-text-primary mb-4">
                    Subscribe
                  </h3>
                  <p className="text-text-muted text-sm mb-4">
                    Get notified when new articles are published
                  </p>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const email = (e.target as any).email.value;
                      fetch('/api/newsletter', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ email }),
                      });
                      (e.target as any).reset();
                    }}
                    className="space-y-3"
                  >
                    <input
                      type="email"
                      name="email"
                      placeholder="your@email.com"
                      required
                      className="w-full px-3 py-2 bg-primary-bg border border-primary-action/50 rounded text-text-primary placeholder-text-muted/50 focus:border-primary-action focus:ring-2 focus:ring-primary-action/20 transition-all duration-300 text-sm"
                    />
                    <button
                      type="submit"
                      className="w-full px-3 py-2 bg-primary-action hover:bg-primary-hover text-white rounded font-semibold text-sm transition-all duration-300 transform hover:scale-105"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
