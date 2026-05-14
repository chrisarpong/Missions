import React, { useState } from 'react';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ServiceModal({ service, onSave, onClose }) {
  const [form, setForm] = useState(service || {
    title: '', category: 'Consular', description: '', requirements: '', processing_time: '', fee: '', link: ''
  });
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (service) {
        await base44.entities.ServiceInfo.update(service.id, form);
      } else {
        await base44.entities.ServiceInfo.create(form);
      }
      onSave();
    } catch (e) {
      console.error(e);
      alert('Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-800">{service ? 'Edit Service' : 'New Service'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-700" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Title *</label>
              <input value={form.title} onChange={e => set('title', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="Service Title" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Category *</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] bg-white">
                <option value="Consular">Consular</option>
                <option value="Protocol">Protocol</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Description *</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] resize-none" placeholder="Service description..." />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Requirements</label>
            <textarea value={form.requirements} onChange={e => set('requirements', e.target.value)} rows={3}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] resize-none" placeholder="List of requirements..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Processing Time</label>
              <input value={form.processing_time} onChange={e => set('processing_time', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="e.g. 5 Working Days" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Fee</label>
              <input value={form.fee} onChange={e => set('fee', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="e.g. GHC 250" />
            </div>
            <div className="col-span-2">
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Link (Optional)</label>
              <input value={form.link} onChange={e => set('link', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="https://..." />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button onClick={onClose} disabled={loading} className="px-4 py-2 text-sm border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 text-sm bg-[#051A53] text-white hover:bg-[#051A53]/90 disabled:opacity-50">
            {loading ? 'Saving...' : (service ? 'Save Changes' : 'Create Service')}
          </button>
        </div>
      </div>
    </div>
  );
}
