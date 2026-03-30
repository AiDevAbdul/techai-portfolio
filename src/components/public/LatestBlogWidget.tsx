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

export default function LatestBlogWidget() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch('/api/blogs?published=true');
        const { data } = await res.json();
        setBlogs(data?.slice(0, 2) || []);
      } catch (error) {
        console.error('Failed to fetch blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div key={i} className="bg-primary-section border border-primary-action/30 rounded-lg p-4">
            <div className="h-4 skeleton rounded w-3/4 mb-2"></div>
            <div className="h-3 skeleton rounded w-full"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {blogs.map((blog) => (
        <Link
          key={blog.id}
          href={`/blog/${blog.slug}`}
          className="block p-4 bg-primary-section border border-primary-action/30 rounded-lg hover:border-primary-action transition-all duration-300 group"
        >
          <h4 className="font-semibold text-primary-action group-hover:text-primary-hover transition-colors line-clamp-2 mb-1">
            {blog.title}
          </h4>
          <p className="text-sm text-text-muted">
            {new Date(blog.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            })}
          </p>
        </Link>
      ))}
      <Link
        href="/blog"
        className="block text-center py-2 text-primary-action hover:text-primary-hover font-semibold transition-colors"
      >
        View All Articles →
      </Link>
    </div>
  );
}
