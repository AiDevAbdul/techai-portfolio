'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { projectSchema } from '@/lib/validations';

export default function EditProjectPage() {
  const router = useRouter();
  const params = useParams();
  const projectId = params.id as string;
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: '',
    link: '',
    tags: '',
    featured: false,
    order: 0,
  });

  useEffect(() => {
    fetchProject();
  }, [projectId]);

  const fetchProject = async () => {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const { data } = await res.json();
      if (data) {
        setFormData({
          ...data,
          tags: data.tags.join(', '),
        });
      }
    } catch (err) {
      setError('Failed to load project');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const data = {
        ...formData,
        tags: formData.tags.split(',').map((t) => t.trim()),
        order: parseInt(formData.order as any),
      };

      projectSchema.parse(data);

      const res = await fetch(`/api/projects/${projectId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error('Failed to update project');

      router.push('/dashboard/projects');
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="text-text-primary">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading text-text-primary mb-8">
        Edit Project
      </h1>

      {error && (
        <div className="mb-4 p-4 bg-red-500/20 border border-red-500 rounded text-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Title
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="w-full px-4 py-2 bg-primary-bg border border-primary-action rounded text-text-primary focus:outline-none focus:border-primary-hover"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="w-full px-4 py-2 bg-primary-bg border border-primary-action rounded text-text-primary focus:outline-none focus:border-primary-hover"
            rows={4}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Image URL
          </label>
          <input
            type="text"
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="w-full px-4 py-2 bg-primary-bg border border-primary-action rounded text-text-primary focus:outline-none focus:border-primary-hover"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Project Link
          </label>
          <input
            type="url"
            value={formData.link}
            onChange={(e) =>
              setFormData({ ...formData, link: e.target.value })
            }
            className="w-full px-4 py-2 bg-primary-bg border border-primary-action rounded text-text-primary focus:outline-none focus:border-primary-hover"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) =>
              setFormData({ ...formData, tags: e.target.value })
            }
            className="w-full px-4 py-2 bg-primary-bg border border-primary-action rounded text-text-primary focus:outline-none focus:border-primary-hover"
          />
        </div>

        <div className="flex gap-4">
          <label className="flex items-center gap-2 text-text-primary">
            <input
              type="checkbox"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({ ...formData, featured: e.target.checked })
              }
              className="w-4 h-4"
            />
            Featured
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-text-primary mb-2">
            Order
          </label>
          <input
            type="number"
            value={formData.order}
            onChange={(e) =>
              setFormData({ ...formData, order: e.target.value as any })
            }
            className="w-full px-4 py-2 bg-primary-bg border border-primary-action rounded text-text-primary focus:outline-none focus:border-primary-hover"
          />
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-2 bg-primary-action hover:bg-primary-hover text-white rounded transition disabled:opacity-50"
          >
            {submitting ? 'Updating...' : 'Update Project'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-6 py-2 bg-primary-section hover:bg-primary-section/80 text-text-primary rounded transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
