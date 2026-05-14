import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const TYPES = ['Meeting', 'Call', 'Email', 'Diplomatic Note', 'Event', 'Other'];
const OUTCOMES = ['Positive', 'Neutral', 'Negative', 'Follow-up Required'];

export default function InteractionModal({ interaction, onSave, onClose }) {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({
    contact_id: interaction?.contact_id || '',
    contact_name: interaction?.contact_name || '',
    type: interaction?.type || 'Meeting',
    subject: interaction?.subject || '',
    summary: interaction?.summary || '',
    date: interaction?.date || '',
    outcome: interaction?.outcome || 'Neutral',
    follow_up_date: interaction?.follow_up_date || '',
    follow_up_notes: interaction?.follow_up_notes || '',
  });

  useEffect(() => {
    base44.entities.Contact.list().then(setContacts).catch(() => {});
  }, []);

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleContactChange = (id) => {
    const contact = contacts.find(c => c.id === id);
    set('contact_id', id);
    set('contact_name', contact?.full_name || '');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-lg shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#051A53] text-white">
          <h2 className="font-bold text-base">{interaction ? 'Edit Interaction' : 'New Interaction'}</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10"><X className="w-5 h-5" /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Contact *</label>
            <select value={form.contact_id} onChange={e => handleContactChange(e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] bg-white">
              <option value="">Select a contact</option>
              {contacts.map(c => <option key={c.id} value={c.id}>{c.full_name}</option>)}
            </select>
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
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Date *</label>
              <input type="date" value={form.date} onChange={e => set('date', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Subject *</label>
            <input value={form.subject} onChange={e => set('subject', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Summary</label>
            <textarea value={form.summary} onChange={e => set('summary', e.target.value)} rows={3}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] resize-none" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Outcome</label>
            <select value={form.outcome} onChange={e => set('outcome', e.target.value)}
              className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53] bg-white">
              {OUTCOMES.map(o => <option key={o}>{o}</option>)}
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Follow-up Date</label>
              <input type="date" value={form.follow_up_date} onChange={e => set('follow_up_date', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Follow-up Notes</label>
              <input value={form.follow_up_notes} onChange={e => set('follow_up_notes', e.target.value)}
                className="w-full border border-gray-200 px-3 py-2.5 text-sm focus:outline-none focus:border-[#051A53]" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-gray-200 bg-gray-50">
          <button onClick={onClose} className="px-4 py-2.5 border border-gray-200 text-sm text-gray-600 hover:bg-gray-100">Cancel</button>
          <button onClick={() => onSave(form)} className="px-6 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90">
            {interaction ? 'Save Changes' : 'Log Interaction'}
          </button>
        </div>
      </div>
    </div>
  );
}