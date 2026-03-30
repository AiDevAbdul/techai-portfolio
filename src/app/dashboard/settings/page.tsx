'use client';

import { useEffect, useState } from 'react';

export const dynamic = 'force-dynamic';

interface Setting {
  key: string;
  value: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<Setting[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings');
      const { data } = await res.json();
      setSettings(data || []);
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: string, value: string) => {
    setSettings(
      settings.map((s) => (s.key === key ? { ...s, value } : s))
    );
  };

  const handleSave = async (key: string, value: string) => {
    setSaving(true);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key, value }),
      });
    } catch (error) {
      console.error('Failed to save setting:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-text-primary">Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold font-heading text-text-primary mb-8">
        Site Settings
      </h1>

      <div className="max-w-2xl space-y-6">
        {settings.map((setting) => (
          <div key={setting.key} className="bg-primary-section border border-primary-action rounded-lg p-6">
            <label className="block text-sm font-medium text-text-primary mb-2">
              {setting.key}
            </label>
            <textarea
              value={setting.value}
              onChange={(e) => handleChange(setting.key, e.target.value)}
              className="w-full px-4 py-2 bg-primary-bg border border-primary-action rounded text-text-primary focus:outline-none focus:border-primary-hover"
              rows={3}
            />
            <button
              onClick={() => handleSave(setting.key, setting.value)}
              disabled={saving}
              className="mt-4 px-4 py-2 bg-primary-action hover:bg-primary-hover text-white rounded transition disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
