import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Search, Edit2, Trash2 } from 'lucide-react';
import ScholarshipModal from '@/components/crm/ScholarshipModal';

export default function CRMScholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => base44.entities.Scholarship.list().then(d => { setScholarships(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const handleSave = () => {
    setModalOpen(false);
    setEditing(null);
    load();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this scholarship?')) {
      await base44.entities.Scholarship.delete(id);
      load();
    }
  };

  const filtered = scholarships.filter(s =>
    !search || s.title?.toLowerCase().includes(search.toLowerCase()) || s.provider?.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search scholarships..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] bg-white" />
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90 transition-colors">
          <Plus className="w-4 h-4" /> New Scholarship
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-3">{filtered.length} scholarship{filtered.length !== 1 ? 's' : ''}</p>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Provider</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Deadline</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(s => (
              <tr key={s.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 font-medium text-gray-800">{s.title}</td>
                <td className="px-4 py-3 text-xs text-gray-500">{s.provider}</td>
                <td className="px-4 py-3 text-xs text-gray-500 hidden sm:table-cell">{s.deadline}</td>
                <td className="px-4 py-3">
                  {s.is_active ? (
                    <span className="text-xs px-2 py-0.5 font-medium bg-green-100 text-green-700">Active</span>
                  ) : (
                    <span className="text-xs px-2 py-0.5 font-medium bg-gray-100 text-gray-500">Inactive</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => { setEditing(s); setModalOpen(true); }} className="p-1.5 text-gray-400 hover:text-[#051A53] transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(s.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">No scholarships found</p>
          </div>
        )}
      </div>

      {modalOpen && <ScholarshipModal scholarship={editing} onSave={handleSave} onClose={() => { setModalOpen(false); setEditing(null); }} />}
    </div>
  );
}
