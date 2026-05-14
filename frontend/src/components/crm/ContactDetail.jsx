import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Edit2, Mail, Phone, Globe, MessageSquare, Building } from 'lucide-react';

const STATUS_COLORS = {
  Active: 'bg-green-100 text-green-700',
  Inactive: 'bg-gray-100 text-gray-500',
  VIP: 'bg-yellow-100 text-yellow-700',
  Pending: 'bg-blue-100 text-blue-700',
};

export default function ContactDetail({ contact, onClose, onEdit }) {
  const [interactions, setInteractions] = useState([]);

  useEffect(() => {
    base44.entities.Interaction.filter({ contact_id: contact.id }, '-date', 10).then(setInteractions).catch(() => setInteractions([]));
  }, [contact.id]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-xl shadow-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-[#051A53] px-6 py-5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-yellow-400 flex items-center justify-center text-[#051A53] text-xl font-black shrink-0">
                {contact.full_name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <h2 className="text-white font-bold text-lg leading-tight">{contact.full_name}</h2>
                {contact.title && <p className="text-white/60 text-sm">{contact.title}</p>}
                <span className={`mt-1 inline-block text-xs px-2 py-0.5 font-medium ${STATUS_COLORS[contact.status] || 'bg-gray-100 text-gray-500'}`}>{contact.status}</span>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => onEdit(contact)} className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"><Edit2 className="w-4 h-4" /></button>
              <button onClick={onClose} className="p-1.5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"><X className="w-4 h-4" /></button>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4 text-sm">
            {contact.organization && (
              <div className="flex items-start gap-2">
                <Building className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div><p className="text-xs text-gray-400">Organization</p><p className="font-medium text-gray-700">{contact.organization}</p></div>
              </div>
            )}
            {contact.category && (
              <div><p className="text-xs text-gray-400">Category</p><p className="font-medium text-gray-700">{contact.category}</p></div>
            )}
            {contact.country && (
              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div><p className="text-xs text-gray-400">Country</p><p className="font-medium text-gray-700">{contact.country}</p></div>
              </div>
            )}
            {contact.email && (
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div><p className="text-xs text-gray-400">Email</p><a href={`mailto:${contact.email}`} className="font-medium text-[#051A53] hover:underline">{contact.email}</a></div>
              </div>
            )}
            {contact.phone && (
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                <div><p className="text-xs text-gray-400">Phone</p><p className="font-medium text-gray-700">{contact.phone}</p></div>
              </div>
            )}
            {contact.last_contacted && (
              <div><p className="text-xs text-gray-400">Last Contacted</p><p className="font-medium text-gray-700">{contact.last_contacted}</p></div>
            )}
          </div>

          {contact.notes && (
            <div className="border-t border-gray-100 pt-4">
              <p className="text-xs text-gray-400 mb-1">Notes</p>
              <p className="text-sm text-gray-600 leading-relaxed">{contact.notes}</p>
            </div>
          )}

          {/* Recent interactions */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Recent Interactions</p>
            {interactions.length > 0 ? (
              <div className="space-y-2">
                {interactions.map(i => (
                  <div key={i.id} className="flex items-start gap-3 p-3 bg-gray-50">
                    <MessageSquare className="w-4 h-4 text-gray-400 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-700">{i.subject}</p>
                      <p className="text-xs text-gray-400">{i.type} · {i.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">No interactions recorded yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}