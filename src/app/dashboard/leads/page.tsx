'use client';

import { useEffect, useState } from 'react';
import DataTable from '@/components/admin/DataTable';

interface Lead {
  id: string;
  name: string;
  email: string;
  status: string;
  createdAt: string;
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const res = await fetch('/api/leads');
      const { data } = await res.json();
      setLeads(data || []);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (lead: Lead, newStatus: string) => {
    try {
      await fetch(`/api/leads/${lead.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      setLeads(
        leads.map((l) => (l.id === lead.id ? { ...l, status: newStatus } : l))
      );
    } catch (error) {
      console.error('Failed to update lead:', error);
    }
  };

  const handleDelete = async (lead: Lead) => {
    if (!confirm('Are you sure?')) return;
    try {
      await fetch(`/api/leads/${lead.id}`, { method: 'DELETE' });
      setLeads(leads.filter((l) => l.id !== lead.id));
    } catch (error) {
      console.error('Failed to delete lead:', error);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading text-text-primary mb-8">
        Contact Form Submissions
      </h1>

      {loading ? (
        <div className="text-text-primary">Loading...</div>
      ) : (
        <DataTable
          columns={[
            { key: 'name', label: 'Name' },
            { key: 'email', label: 'Email' },
            {
              key: 'status',
              label: 'Status',
              render: (v, item) => (
                <select
                  value={v}
                  onChange={(e) => item && handleStatusChange(item, e.target.value)}
                  className="bg-primary-bg border border-primary-action rounded px-2 py-1 text-text-primary"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="closed">Closed</option>
                </select>
              ),
            },
            {
              key: 'createdAt',
              label: 'Date',
              render: (v) => new Date(v).toLocaleDateString(),
            },
          ]}
          data={leads}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
