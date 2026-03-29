'use client';

import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 bg-primary-bg">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold font-heading text-center mb-16 text-text-primary">
          Get in Touch
        </h2>

        {success && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded text-green-200">
            Message sent successfully! I'll get back to you soon.
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded text-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
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
              className="w-full px-4 py-2 bg-primary-section border border-primary-action rounded text-text-primary focus:outline-none focus:border-primary-hover"
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
              className="w-full px-4 py-2 bg-primary-section border border-primary-action rounded text-text-primary focus:outline-none focus:border-primary-hover"
              required
            />
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
              className="w-full px-4 py-2 bg-primary-section border border-primary-action rounded text-text-primary focus:outline-none focus:border-primary-hover"
              rows={6}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary-action hover:bg-primary-hover text-white rounded-lg transition font-semibold disabled:opacity-50"
          >
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>

        <div className="mt-12 pt-12 border-t border-primary-action">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <p className="text-text-muted mb-2">Email</p>
              <a
                href="mailto:contact@techai.pk"
                className="text-primary-action hover:text-primary-hover"
              >
                contact@techai.pk
              </a>
            </div>
            <div>
              <p className="text-text-muted mb-2">Location</p>
              <p className="text-text-primary">Pakistan</p>
            </div>
            <div>
              <p className="text-text-muted mb-2">Social</p>
              <div className="flex justify-center gap-4">
                <a href="#" className="text-primary-action hover:text-primary-hover">
                  Twitter
                </a>
                <a href="#" className="text-primary-action hover:text-primary-hover">
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
