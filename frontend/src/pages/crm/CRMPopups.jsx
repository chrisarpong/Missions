import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Edit2, Trash2, ToggleLeft, ToggleRight, AlertCircle } from 'lucide-react';
import PopupModal from '@/components/crm/PopupModal';

const STYLE_COLORS = {
  Info: 'bg-blue-100 text-blue-700',
  Alert: 'bg-orange-100 text-orange-700',
  Announcement: 'bg-purple-100 text-purple-700',
  Emergency: 'bg-red-100 text-red-700',
};

export default function CRMPopups() {
  const [popups, setPopups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => base44.entities.SitePopup.list().then(d => { setPopups(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    if (editing) await base44.entities.SitePopup.update(editing.id, data);
    else await base44.entities.SitePopup.create(data);
    setModalOpen(false); setEditing(null); load();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this popup?')) { await base44.entities.SitePopup.delete(id); load(); }
  };

  const toggleActive = async (popup) => {
    await base44.entities.SitePopup.update(popup.id, { active: !popup.active });
    load();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">Manage popups displayed to website visitors. Only one active popup shows at a time.</p>
        <button onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90 transition-colors">
          <Plus className="w-4 h-4" /> New Popup
        </button>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {popups.map(popup => (
          <div key={popup.id} className={`bg-white border-2 transition-all ${popup.active ? 'border-[#051A53]' : 'border-gray-200'} p-5`}>
            <div className="flex items-start justify-between mb-3">
              <span className={`text-xs px-2 py-0.5 font-semibold ${STYLE_COLORS[popup.style] || 'bg-gray-100 text-gray-500'}`}>{popup.style}</span>
              <button onClick={() => toggleActive(popup)} className="text-gray-400 hover:text-[#051A53] transition-colors" title="Toggle active">
                {popup.active ? <ToggleRight className="w-6 h-6 text-[#051A53]" /> : <ToggleLeft className="w-6 h-6" />}
              </button>
            </div>
            <h3 className="font-bold text-gray-800 mb-1">{popup.title}</h3>
            <p className="text-sm text-gray-500 line-clamp-2 mb-3">{popup.message}</p>
            {popup.cta_text && (
              <p className="text-xs text-gray-400 mb-3">CTA: "{popup.cta_text}"</p>
            )}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full ${popup.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-xs text-gray-500">{popup.active ? 'Active' : 'Inactive'}</span>
                {popup.show_once && <span className="text-xs text-gray-400 ml-1">· show once</span>}
              </div>
              <div className="flex gap-1">
                <button onClick={() => { setEditing(popup); setModalOpen(true); }} className="p-1.5 text-gray-400 hover:text-[#051A53] transition-colors"><Edit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(popup.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {popups.length === 0 && (
        <div className="text-center py-16 bg-white border border-gray-200">
          <AlertCircle className="w-10 h-10 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No popups yet</p>
          <p className="text-sm text-gray-400 mt-1">Create a popup to display announcements to your website visitors.</p>
        </div>
      )}

      {modalOpen && <PopupModal popup={editing} onSave={handleSave} onClose={() => { setModalOpen(false); setEditing(null); }} />}
    </div>
  );
}