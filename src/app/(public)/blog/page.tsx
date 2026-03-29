'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold font-heading text-text-primary mb-12">
            Blog
          </h1>

          {loading ? (
            <div className="text-text-muted">Loading articles...</div>
          ) : (
            <div className="space-y-6">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="block bg-primary-section border border-primary-action rounded-lg p-6 hover:border-primary-hover transition"
                >
                  <h2 className="text-2xl font-semibold text-primary-action mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-text-muted mb-4">{blog.excerpt}</p>
                  <p className="text-sm text-text-muted">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
