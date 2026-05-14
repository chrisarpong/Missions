import React, { useState } from 'react';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function VacancyModal({ vacancy, onSave, onClose }) {
  const [form, setForm] = useState(vacancy || {
    title: '', department: '', location: '', description: '', deadline: '', apply_link: '', is_active: true
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (vacancy) {
        await base44.entities.Vacancy.update(vacancy.id, form);
      } else {
        await base44.entities.Vacancy.create(form);
      }
      onSave();
    } catch (e) {
      console.error(e);
      alert('Failed to save vacancy');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-800">{vacancy ? 'Edit Vacancy' : 'New Vacancy'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-700" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Title *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="Job title" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Department *</label>
              <input value={form.department} onChange={e => set('department', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="Department/Org" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Location *</label>
              <input value={form.location} onChange={e => set('location', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="City, Country" />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Description *</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={4}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] resize-none" placeholder="Role description..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Deadline *</label>
              <input type="date" value={form.deadline} onChange={e => set('deadline', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Apply Link</label>
              <input value={form.apply_link} onChange={e => set('apply_link', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="https://..." />
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2 cursor-pointer mt-2">
              <input type="checkbox" checked={!!form.is_active} onChange={e => set('is_active', e.target.checked)} className="w-4 h-4" />
              <span className="text-sm text-gray-700">Active (visible on website)</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 text-sm border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 text-sm bg-[#051A53] text-white hover:bg-[#051A53]/90 disabled:opacity-50">
            {loading ? 'Saving...' : (vacancy ? 'Save Changes' : 'Create Vacancy')}
          </button>
        </div>
      </div>
    </div>
  );
}
