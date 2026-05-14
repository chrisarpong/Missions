import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Calendar, MapPin, Edit2, Trash2, Clock } from 'lucide-react';
import EventModal from '@/components/crm/EventModal';
import { format, parseISO, isAfter } from 'date-fns';

const STATUS_COLORS = {
  Planned: 'bg-blue-100 text-blue-700',
  Confirmed: 'bg-green-100 text-green-700',
  Completed: 'bg-gray-100 text-gray-600',
  Cancelled: 'bg-red-100 text-red-600',
};

const TYPE_ICONS = ['Summit', 'Bilateral Meeting', 'Reception', 'Press Conference', 'Cultural Event', 'Training', 'Other'];

export default function CRMEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('Upcoming');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);

  const load = () => {
    base44.entities.DiploEvent.list('-date').then(e => { setEvents(e); setLoading(false); });
  };

  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    if (editItem) await base44.entities.DiploEvent.update(editItem.id, data);
    else await base44.entities.DiploEvent.create(data);
    setModalOpen(false); setEditItem(null); load();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this event?')) { await base44.entities.DiploEvent.delete(id); load(); }
  };

  const filters = ['Upcoming', 'All', 'Planned', 'Confirmed', 'Completed', 'Cancelled'];

  const filtered = events.filter(e => {
    if (filter === 'Upcoming') return e.date && isAfter(parseISO(e.date), new Date()) && e.status !== 'Cancelled';
    if (filter === 'All') return true;
    return e.status === filter;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <div className="flex border border-gray-200 overflow-hidden bg-white">
          {filters.map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 text-xs font-semibold transition-colors ${filter === f ? 'bg-[#051A53] text-white' : 'text-gray-500 hover:bg-gray-50'}`}>
              {f}
            </button>
          ))}
        </div>
        <button onClick={() => { setEditItem(null); setModalOpen(true); }}
          className="ml-auto flex items-center gap-2 px-4 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90">
          <Plus className="w-4 h-4" /> New Event
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(e => (
          <div key={e.id} className="bg-white border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Date strip */}
            <div className="bg-[#051A53] px-5 py-3 flex items-center justify-between">
              <div className="text-white">
                <p className="text-2xl font-black leading-none">{e.date ? format(parseISO(e.date), 'd') : '—'}</p>
                <p className="text-white/60 text-xs uppercase">{e.date ? format(parseISO(e.date), 'MMM yyyy') : ''}</p>
              </div>
              <span className={`text-xs px-2 py-0.5 font-medium ${STATUS_COLORS[e.status]}`}>{e.status}</span>
            </div>
            <div className="p-5">
              <p className="text-xs text-yellow-600 font-semibold uppercase tracking-wide mb-1">{e.type}</p>
              <h3 className="font-bold text-gray-800 text-base leading-tight mb-3">{e.title}</h3>
              {e.location && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-1">
                  <MapPin className="w-3 h-3 shrink-0" />{e.location}
                </div>
              )}
              {e.time && (
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
                  <Clock className="w-3 h-3 shrink-0" />{e.time}
                </div>
              )}
              {e.description && <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-3">{e.description}</p>}
              <div className="flex gap-2 pt-3 border-t border-gray-100">
                <button onClick={() => { setEditItem(e); setModalOpen(true); }}
                  className="flex items-center gap-1.5 text-xs text-[#051A53] font-medium hover:underline">
                  <Edit2 className="w-3 h-3" /> Edit
                </button>
                <button onClick={() => handleDelete(e.id)}
                  className="flex items-center gap-1.5 text-xs text-red-500 font-medium hover:underline ml-auto">
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-gray-400 bg-white border border-gray-200">
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-30" />
            <p className="text-sm">No events found</p>
          </div>
        )}
      </div>

      {modalOpen && (
        <EventModal event={editItem} onSave={handleSave} onClose={() => { setModalOpen(false); setEditItem(null); }} />
      )}
    </div>
  );
}