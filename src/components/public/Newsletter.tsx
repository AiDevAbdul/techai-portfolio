'use client';

import { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) throw new Error('Failed to subscribe');

      setSuccess(true);
      setEmail('');
      setTimeout(() => setSuccess(false), 5000);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 px-4 bg-gradient-to-r from-primary-action/10 to-ai-highlight/10 border-y border-primary-action/30">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-3xl font-bold font-heading text-text-primary mb-2">
          Stay Updated
        </h3>
        <p className="text-text-muted mb-8">
          Get the latest articles, tutorials, and automation tips delivered to your inbox
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-3 bg-primary-section border border-primary-action/50 rounded-lg text-text-primary placeholder-text-muted/50 focus:border-primary-action focus:ring-2 focus:ring-primary-action/20 transition-all duration-300"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-3 bg-primary-action hover:bg-primary-hover text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:shadow-primary-action/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 disabled:hover:scale-100 whitespace-nowrap"
          >
            {loading ? 'Subscribing...' : 'Subscribe'}
          </button>
        </form>

        {success && (
          <p className="mt-4 text-green-400 text-sm">
            ✓ Thanks for subscribing! Check your email for confirmation.
          </p>
        )}
        {error && (
          <p className="mt-4 text-red-400 text-sm">
            ✕ {error}
          </p>
        )}
      </div>
    </section>
  );
}
