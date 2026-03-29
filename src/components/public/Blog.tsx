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
        <h2 className="text-4xl font-bold font-heading text-center mb-16 text-text-primary">
          Latest Articles
        </h2>
        {loading ? (
          <div className="text-center text-text-muted">Loading articles...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blog/${blog.slug}`}
                  className="bg-primary-bg border border-primary-action rounded-lg p-6 hover:border-primary-hover transition"
                >
                  <h3 className="text-xl font-semibold text-primary-action mb-2">
                    {blog.title}
                  </h3>
                  <p className="text-text-muted mb-4">{blog.excerpt}</p>
                  <p className="text-sm text-text-muted">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                </Link>
              ))}
            </div>
            <div className="text-center">
              <Link
                href="/blog"
                className="px-6 py-3 bg-primary-action hover:bg-primary-hover text-white rounded-lg transition font-semibold"
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
