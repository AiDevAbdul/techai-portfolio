'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'web-dev',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const services = [
    { value: 'tutoring', label: 'Tutoring' },
    { value: 'web-dev', label: 'Web Development' },
    { value: 'ai', label: 'AI Automation' },
    { value: 'consultation', label: 'Consultation' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error('Failed to send message');

      setSuccess(true);
      setFormData({ name: '', email: '', service: 'web-dev', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-primary-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary-action/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold font-heading text-text-primary mb-4">
            Get in Touch
          </h2>
          <p className="text-text-muted">
            Let's discuss how I can help you achieve your goals
          </p>
        </div>

        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-200 animate-fade-in-up flex items-start gap-3">
            <span className="text-xl">✓</span>
            <div>
              <p className="font-semibold">Message sent successfully!</p>
              <p className="text-sm">I'll get back to you soon.</p>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-200 animate-fade-in-up flex items-start gap-3">
            <span className="text-xl">✕</span>
            <div>
              <p className="font-semibold">Error</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Name
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-4 py-3 bg-primary-section border border-primary-action/50 rounded-lg text-text-primary placeholder-text-muted/50 focus:border-primary-action focus:ring-2 focus:ring-primary-action/20 transition-all duration-300"
              placeholder="Your name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="w-full px-4 py-3 bg-primary-section border border-primary-action/50 rounded-lg text-text-primary placeholder-text-muted/50 focus:border-primary-action focus:ring-2 focus:ring-primary-action/20 transition-all duration-300"
              placeholder="your@email.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Service
            </label>
            <select
              value={formData.service}
              onChange={(e) =>
                setFormData({ ...formData, service: e.target.value })
              }
              className="w-full px-4 py-3 bg-primary-section border border-primary-action/50 rounded-lg text-text-primary focus:border-primary-action focus:ring-2 focus:ring-primary-action/20 transition-all duration-300"
              required
            >
              {services.map((svc) => (
                <option key={svc.value} value={svc.value}>
                  {svc.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 bg-primary-section border border-primary-action/50 rounded-lg text-text-primary placeholder-text-muted/50 focus:border-primary-action focus:ring-2 focus:ring-primary-action/20 transition-all duration-300 resize-none"
              placeholder="Tell me about your project..."
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-action hover:bg-primary-hover text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-primary-action/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Sending...
              </span>
            ) : (
              'Send Message'
            )}
          </button>
        </form>

        <div className="mt-16 pt-16 border-t border-primary-action/30 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="group">
              <p className="text-text-muted mb-2 text-sm uppercase tracking-wide">Email</p>
              <a
                href="mailto:contact@techai.pk"
                className="text-primary-action hover:text-primary-hover group-hover:scale-105 transition-all duration-300 inline-block"
              >
                contact@techai.pk
              </a>
            </div>
            <div className="group">
              <p className="text-text-muted mb-2 text-sm uppercase tracking-wide">Location</p>
              <p className="text-text-primary group-hover:text-primary-action transition-colors">
                Pakistan
              </p>
            </div>
            <div className="group">
              <p className="text-text-muted mb-2 text-sm uppercase tracking-wide">Social</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="text-primary-action hover:text-primary-hover hover:scale-110 transition-all duration-300">
                  Twitter
                </a>
                <a href="#" className="text-primary-action hover:text-primary-hover hover:scale-110 transition-all duration-300">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
