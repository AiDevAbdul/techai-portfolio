'use client';

import { useEffect, useState } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
}

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await fetch('/api/testimonials');
      const { data } = await res.json();
      setTestimonials(data?.slice(0, 3) || []);
    } catch (error) {
      console.error('Failed to fetch testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 px-4 bg-primary-bg">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold font-heading text-center mb-16 text-text-primary">
          Testimonials
        </h2>
        {loading ? (
          <div className="text-center text-text-muted">Loading testimonials...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-primary-section border border-primary-action rounded-lg p-6"
              >
                <p className="text-text-muted mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <p className="font-semibold text-primary-action">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-text-muted">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
