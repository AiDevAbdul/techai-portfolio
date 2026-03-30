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
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold font-heading text-text-primary mb-4">
            Testimonials
          </h2>
          <p className="text-text-muted max-w-2xl mx-auto">
            What clients and students say about working with me
          </p>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-primary-section border border-primary-action/30 rounded-xl p-6">
                <div className="h-20 skeleton rounded mb-4"></div>
                <div className="h-4 skeleton rounded w-2/3 mb-2"></div>
                <div className="h-4 skeleton rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, idx) => (
              <div
                key={testimonial.id}
                className="group bg-gradient-to-br from-primary-section to-primary-bg border border-primary-action/50 rounded-xl p-6 hover:border-primary-action transition-all duration-300 hover:shadow-lg hover:shadow-primary-action/20 transform hover:-translate-y-1 animate-fade-in-up"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-start mb-4">
                  <span className="text-3xl text-primary-action mr-2">"</span>
                </div>
                <p className="text-text-muted mb-6 italic group-hover:text-text-primary transition-colors leading-relaxed">
                  {testimonial.content}
                </p>
                <div className="pt-4 border-t border-primary-action/30">
                  <p className="font-semibold text-primary-action group-hover:text-primary-hover transition-colors">
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
