import React, { useState } from 'react';
import { X } from 'lucide-react';

const CATEGORIES = ['Ambassador', 'Diplomat', 'Government Official', 'NGO / IO', 'Business', 'Media', 'Academic', 'Other'];
const STATUSES = ['Active', 'Inactive', 'VIP', 'Pending'];

export default function ContactModal({ contact, onSave, onClose }) {
  const [form, setForm] = useState({
    full_name: contact?.full_name || '',
    title: contact?.title || '',
    organization: contact?.organization || '',
    category: contact?.category || 'Diplomat',
    country: contact?.country || '',
    email: contact?.email || '',
    phone: contact?.phone || '',
    status: contact?.status || 'Active',
    notes: contact?.notes || '',
    tags: contact?.tags || [],
  });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#051A53] text-white">
          <h2 className="font-bold text-base">{contact ? 'Edit Contact' : 'New Contact'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Full Name *</label>
            <input value={form.full_name} onChange={e => set('full_name', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Title</label>
              <input value={form.title} onChange={e => set('title', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Organization</label>
              <input value={form.organization} onChange={e => set('organization', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Category</label>
              <select value={form.category} onChange={e => set('category', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] bg-white">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Status</label>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] bg-white">
                {STATUSES.map(s => <option key={s}>{s}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Country</label>
            <input value={form.country} onChange={e => set('country', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
              <input type="email" value={form.email} onChange={e => set('email', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Phone</label>
              <input value={form.phone} onChange={e => set('phone', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Notes</label>
            <textarea value={form.notes} onChange={e => set('notes', e.target.value)} rows={3}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] resize-none" />
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">Cancel</button>
          <button onClick={() => onSave(form)} className="px-6 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90">
            {contact ? 'Save Changes' : 'Add Contact'}
          </button>
        </div>
      </div>
    </div>
  );
}