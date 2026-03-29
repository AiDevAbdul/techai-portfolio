'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Navbar from '@/components/public/Navbar';
import Footer from '@/components/public/Footer';

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  createdAt: string;
}

export default function BlogDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlog();
  }, [slug]);

  const fetchBlog = async () => {
    try {
      const res = await fetch('/api/blogs');
      const { data } = await res.json();
      const found = data?.find((b: Blog) => b.slug === slug);
      setBlog(found || null);
    } catch (error) {
      console.error('Failed to fetch blog:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-primary-bg py-20 px-4">
        <div className="max-w-3xl mx-auto">
          {loading ? (
            <div className="text-text-muted">Loading article...</div>
          ) : blog ? (
            <>
              <h1 className="text-4xl font-bold font-heading text-text-primary mb-4">
                {blog.title}
              </h1>
              <p className="text-text-muted mb-8">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <div
                className="prose prose-invert max-w-none text-text-primary"
                dangerouslySetInnerHTML={{ __html: blog.content }}
              />
            </>
          ) : (
            <div className="text-text-muted">Article not found</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
