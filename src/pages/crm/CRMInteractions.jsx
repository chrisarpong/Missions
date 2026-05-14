import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Search, Trash2, Edit2, Calendar, MessageSquare } from 'lucide-react';
import InteractionModal from '@/components/crm/InteractionModal';

const TYPES = ['Meeting', 'Call', 'Email', 'Diplomatic Note', 'Event', 'Other'];
const OUTCOMES = ['Positive', 'Neutral', 'Negative', 'Follow-up Required'];

const outcomeColors = {
  'Positive': 'bg-green-100 text-green-700',
  'Neutral': 'bg-gray-100 text-gray-700',
  'Negative': 'bg-red-100 text-red-700',
  'Follow-up Required': 'bg-orange-100 text-orange-700',
};

export default function CRMInteractions() {
  const [interactions, setInteractions] = useState([]);
  const [search, setSearch] = useState('');
  const [typeFilter, setType] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Interaction.list('-date').then(setInteractions).catch(() => {}).finally(() => setLoading(false));
  }, []);

  const handleSave = async (data) => {
    try {
      if (editing) {
        await base44.entities.Interaction.update(editing.id, data);
        setInteractions(interactions.map(i => i.id === editing.id ? { ...i, ...data } : i));
      } else {
        const created = await base44.entities.Interaction.create(data);
        setInteractions([created, ...interactions]);
      }
      setShowModal(false);
      setEditing(null);
    } catch (error) {
      console.error('Error saving interaction:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Delete this interaction?')) {
      await base44.entities.Interaction.delete(id);
      setInteractions(interactions.filter(i => i.id !== id));
    }
  };

  const filtered = interactions.filter(i => {
    const searchMatch = !search || i.contact_name?.toLowerCase().includes(search.toLowerCase()) || i.subject?.toLowerCase().includes(search.toLowerCase());
    const typeMatch = typeFilter === 'All' || i.type === typeFilter;
    return searchMatch && typeMatch;
  });

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search interactions..." className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]" />
        </div>
        <button onClick={() => { setEditing(null); setShowModal(true); }} className="px-4 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90 inline-flex items-center gap-2">
          <Plus className="w-4 h-4" /> Log Interaction
        </button>
      </div>

      <select value={typeFilter} onChange={e => setType(e.target.value)} className="px-3 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] bg-white">
        <option value="All">All Types</option>
        {TYPES.map(t => <option key={t}>{t}</option>)}
      </select>

      <div className="bg-white border border-gray-200">
        {filtered.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Contact</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Subject</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Outcome</th>
                  <th className="px-4 py-3 text-left font-semibold text-gray-700">Follow-up</th>
                  <th className="px-4 py-3 text-right font-semibold text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(interaction => (
                  <tr key={interaction.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="px-4 py-3"><span className="font-medium text-gray-900">{interaction.contact_name}</span></td>
                    <td className="px-4 py-3 text-gray-600">{interaction.subject}</td>
                    <td className="px-4 py-3"><span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">{interaction.type}</span></td>
                    <td className="px-4 py-3 text-gray-600 flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-gray-400" /> {interaction.date}
                    </td>
                    <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded ${outcomeColors[interaction.outcome]}`}>{interaction.outcome}</span></td>
                    <td className="px-4 py-3 text-gray-600">{interaction.follow_up_date ? <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5 text-orange-500" /> {interaction.follow_up_date}</span> : '—'}</td>
                    <td className="px-4 py-3 text-right">
                      <button onClick={() => { setEditing(interaction); setShowModal(true); }} className="text-blue-600 hover:text-blue-700 mr-3"><Edit2 className="w-3.5 h-3.5" /></button>
                      <button onClick={() => handleDelete(interaction.id)} className="text-red-600 hover:text-red-700"><Trash2 className="w-3.5 h-3.5" /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12 text-gray-500">No interactions found</div>
        )}
      </div>

      {showModal && <InteractionModal interaction={editing} onSave={handleSave} onClose={() => { setShowModal(false); setEditing(null); }} />}
    </div>
  );
}