import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Search, Image as ImageIcon } from 'lucide-react';

export default function MediaPicker({ onSelect, onClose }) {
  const [media, setMedia] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Media.list('-created_date', 100)
      .then(setMedia)
      .finally(() => setLoading(false));
  }, []);

  const filtered = media.filter(m =>
    !search || m.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-3xl max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-[#051A53] text-white">
          <h2 className="font-bold">Select Media</h2>
          <button onClick={onClose} className="p-1 hover:bg-white/10">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search */}
        <div className="px-6 py-3 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search media..."
              className="w-full pl-10 pr-4 py-2 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto p-4">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <div className="w-6 h-6 border-3 border-gray-200 border-t-[#051A53] rounded-full animate-spin" />
            </div>
          ) : filtered.length > 0 ? (
            <div className="grid sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {filtered.map((item) => (
                <button
                  key={item.id}
                  onClick={() => onSelect(item)}
                  className="relative h-32 bg-gray-100 overflow-hidden border-2 border-transparent hover:border-[#051A53] transition-all group"
                >
                  <img
                    src={item.file_url}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
                    <div className="text-white text-xs font-medium text-center px-2 opacity-0 group-hover:opacity-100">
                      {item.name.substring(0, 20)}...
                    </div>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-32 text-gray-500">
              <ImageIcon className="w-8 h-8 mb-2 opacity-30" />
              <p className="text-sm">No media found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}