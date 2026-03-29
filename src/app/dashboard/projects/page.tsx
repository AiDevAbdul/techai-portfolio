'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import DataTable from '@/components/admin/DataTable';

interface Project {
  id: string;
  title: string;
  description: string;
  featured: boolean;
  order: number;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/projects');
      const { data } = await res.json();
      setProjects(data || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (project: Project) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/projects/${project.id}`, { method: 'DELETE' });
      setProjects(projects.filter((p) => p.id !== project.id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold font-heading text-text-primary">
          Projects
        </h1>
        <Link
          href="/dashboard/projects/new"
          className="px-4 py-2 bg-primary-action hover:bg-primary-hover text-white rounded transition"
        >
          Add Project
        </Link>
      </div>

      {loading ? (
        <div className="text-text-primary">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: 'title', label: 'Title' },
            { key: 'description', label: 'Description' },
            {
              key: 'featured',
              label: 'Featured',
              render: (v) => (v ? '✓' : ''),
            },
            { key: 'order', label: 'Order' },
          ]}
          data={projects}
          onEdit={(p) => (window.location.href = `/dashboard/projects/${p.id}`)}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
