import React, { useState } from 'react';
import { X } from 'lucide-react';

const STYLES = ['Info', 'Alert', 'Announcement', 'Emergency'];

export default function PopupModal({ popup, onSave, onClose }) {
  const [form, setForm] = useState(popup || {
    title: '', message: '', cta_text: '', cta_url: '', image_url: '',
    style: 'Announcement', active: false, show_once: true, delay_seconds: 3, expires_date: ''
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-gray-800">{popup ? 'Edit Popup' : 'New Popup'}</h2>
          <button onClick={onClose}><X className="w-5 h-5 text-gray-400 hover:text-gray-700" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Title *</label>
            <input value={form.title} onChange={e => set('title', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="Popup title" />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Message *</label>
            <textarea value={form.message} onChange={e => set('message', e.target.value)} rows={3}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] resize-none" placeholder="Popup message text..." />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Style</label>
              <select value={form.style} onChange={e => set('style', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] bg-white">
                {STYLES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Delay (seconds)</label>
              <input type="number" value={form.delay_seconds} onChange={e => set('delay_seconds', Number(e.target.value))}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" min={0} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">CTA Button Text</label>
              <input value={form.cta_text} onChange={e => set('cta_text', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="Learn More" />
            </div>
            <div>
              <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">CTA URL</label>
              <input value={form.cta_url} onChange={e => set('cta_url', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="https://..." />
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Image URL (optional)</label>
            <input value={form.image_url} onChange={e => set('image_url', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" placeholder="https://..." />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide block mb-1">Expires Date</label>
            <input type="date" value={form.expires_date} onChange={e => set('expires_date', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!form.active} onChange={e => set('active', e.target.checked)} className="w-4 h-4" />
              <span className="text-sm text-gray-700">Active (show to visitors)</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={!!form.show_once} onChange={e => set('show_once', e.target.checked)} className="w-4 h-4" />
              <span className="text-sm text-gray-700">Show once per session</span>
            </label>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-sm border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={() => onSave(form)} className="px-4 py-2 text-sm bg-[#051A53] text-white hover:bg-[#051A53]/90">
            {popup ? 'Save Changes' : 'Create Popup'}
          </button>
        </div>
      </div>
    </div>
  );
}