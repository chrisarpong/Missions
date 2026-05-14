import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const TYPES = ['Summit', 'Bilateral Meeting', 'Reception', 'Press Conference', 'Cultural Event', 'Training', 'Other'];
const STATUSES = ['Planned', 'Confirmed', 'Completed', 'Cancelled'];

export default function EventModal({ event, onSave, onClose }) {
  const [form, setForm] = useState({
    title: event?.title || '',
    type: event?.type || 'Bilateral Meeting',
    date: event?.date || '',
    time: event?.time || '',
    location: event?.location || '',
    description: event?.description || '',
    poster_url: event?.poster_url || '',
    status: event?.status || 'Planned',
    host: event?.host || '',
  });
  const [uploading, setUploading] = useState(false);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handlePosterUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const { file_url } = await base44.integrations.Core.UploadFile({ file });
    set('poster_url', file_url);
    setUploading(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#051A53] text-white">
          <h2 className="font-bold text-base">{event ? 'Edit Event' : 'New Event'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Event Title *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Type</label>
              <select value={form.type} onChange={e => set('type', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] bg-white">
                {TYPES.map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] bg-white">
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date *</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Time</label>
              <input type="time" value={form.time} onChange={e => set('time', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Location</label>
            <input value={form.location} onChange={e => set('location', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Host / Organizer</label>
            <input value={form.host} onChange={e => set('host', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Description</label>
            <textarea value={form.description} onChange={e => set('description', e.target.value)} rows={3}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Poster (Landscape or Portrait)</label>
            <div className="relative">
              {form.poster_url && (
                <div className="mb-3 w-full h-40 border border-gray-200 overflow-hidden">
                  <img src={form.poster_url} alt="Event poster" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-gray-300 cursor-pointer hover:border-[#051A53] transition-colors">
                <Upload className="w-4 h-4 text-gray-400" />
                <span className="text-sm text-gray-600">{uploading ? 'Uploading...' : 'Choose poster image'}</span>
                <input type="file" accept="image/*" onChange={handlePosterUpload} disabled={uploading} className="hidden" />
              </label>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">Cancel</button>
          <button onClick={() => onSave(form)} className="px-6 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90">
            {event ? 'Save Changes' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  );
}