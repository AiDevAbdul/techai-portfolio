'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';

export const dynamic = 'force-dynamic';

interface Blog {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  createdAt: string;
}

export default function BlogsPage() {
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

  const handleDelete = async (blog: Blog) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/blogs/${blog.id}`, { method: 'DELETE' });
      setBlogs(blogs.filter((b) => b.id !== blog.id));
    } catch (error) {
      console.error('Failed to delete blog:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-heading text-text-primary">
          Blog Posts
        </h1>
        <Link
          href="/dashboard/blogs/new"
          className="px-4 py-2 bg-primary-action hover:bg-primary-hover text-white rounded transition"
        >
          Add Blog
        </Link>
      </div>

      {loading ? (
        <div className="text-text-primary">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'slug', label: 'Slug' },
            {
              key: 'published',
              label: 'Published',
              render: (v) => (v ? '✓' : ''),
            },
            {
              key: 'createdAt',
              label: 'Created',
              render: (v) => new Date(v).toLocaleDateString(),
            },
          ]}
          data={blogs}
          onEdit={(b) => (window.location.href = `/dashboard/blogs/${b.id}`)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
