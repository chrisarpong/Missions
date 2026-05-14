import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Edit2, Trash2, GripVertical, Monitor, ToggleLeft, ToggleRight } from 'lucide-react';
import HeroSlideModal from '@/components/crm/HeroSlideModal';

export default function CRMHeroSlides() {
  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => base44.entities.HeroSlide.list('order').then(d => { setSlides(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    if (editing) await base44.entities.HeroSlide.update(editing.id, data);
    else await base44.entities.HeroSlide.create(data);
    setModalOpen(false); setEditing(null); load();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this slide?')) { await base44.entities.HeroSlide.delete(id); load(); }
  };

  const toggleActive = async (slide) => {
    await base44.entities.HeroSlide.update(slide.id, { active: !slide.active });
    load();
  };

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-gray-500">Manage the hero slideshow on the homepage. Active slides are shown in order.</p>
        <button onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90 transition-colors">
          <Plus className="w-4 h-4" /> New Slide
        </button>
      </div>

      <div className="space-y-3">
        {slides.map((slide, i) => (
          <div key={slide.id} className={`bg-white border-2 transition-all flex gap-4 overflow-hidden ${slide.active ? 'border-[#051A53]' : 'border-gray-200 opacity-60'}`}>
            {slide.image_url ? (
              <img src={slide.image_url} alt={slide.title} className="w-32 h-24 object-cover shrink-0" />
            ) : (
              <div className="w-32 h-24 bg-gray-100 flex items-center justify-center shrink-0">
                <Monitor className="w-6 h-6 text-gray-300" />
              </div>
            )}
            <div className="flex-1 min-w-0 py-3 pr-4">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-semibold text-gray-800 truncate">{slide.title}</p>
                  {slide.date_label && <p className="text-xs text-yellow-600 font-medium">{slide.date_label}</p>}
                  {slide.description && <p className="text-sm text-gray-500 truncate mt-0.5">{slide.description}</p>}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button onClick={() => toggleActive(slide)} className="text-gray-400 hover:text-[#051A53]">
                    {slide.active ? <ToggleRight className="w-6 h-6 text-[#051A53]" /> : <ToggleLeft className="w-6 h-6" />}
                  </button>
                  <button onClick={() => { setEditing(slide); setModalOpen(true); }} className="p-1.5 text-gray-400 hover:text-[#051A53]"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(slide.id)} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <div className="flex items-center gap-3 mt-2">
                <div className={`w-2 h-2 rounded-full ${slide.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                <span className="text-xs text-gray-400">{slide.active ? 'Live on homepage' : 'Hidden'} · Order: {slide.order ?? i}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {slides.length === 0 && (
        <div className="text-center py-16 bg-white border border-gray-200">
          <Monitor className="w-10 h-10 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No hero slides yet</p>
          <p className="text-sm text-gray-400 mt-1">Add slides to power the homepage hero carousel.</p>
        </div>
      )}

      {modalOpen && <HeroSlideModal slide={editing} onSave={handleSave} onClose={() => { setModalOpen(false); setEditing(null); }} />}
    </div>
  );
}