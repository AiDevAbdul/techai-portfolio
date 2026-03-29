'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  featured: boolean;
  order: number;
}

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const { data } = await res.json();
      setTestimonials(data || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (testimonial: Testimonial) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/testimonials/${testimonial.id}`, { method: 'DELETE' });
      setTestimonials(testimonials.filter((t) => t.id !== testimonial.id));
    } catch (error) {
      console.error('Failed to delete testimonial:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-heading text-text-primary">
          Testimonials
        </h1>
        <Link
          href="/dashboard/testimonials/new"
          className="px-4 py-2 bg-primary-action hover:bg-primary-hover text-white rounded transition"
        >
          Add Testimonial
        </Link>
      </div>

      {loading ? (
        <div className="text-text-primary">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'role', label: 'Role' },
            {
              key: 'featured',
              label: 'Featured',
              render: (v) => (v ? '✓' : ''),
            },
            { key: 'order', label: 'Order' },
          ]}
          data={testimonials}
          onEdit={(t) => (window.location.href = `/dashboard/testimonials/${t.id}`)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
