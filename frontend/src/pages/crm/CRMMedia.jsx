import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Upload, X, Search, Trash2, Copy, Image as ImageIcon, Tag } from 'lucide-react';

export default function CRMMedia() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [uploading, setUploading] = useState(false);
  const [copied, setCopied] = useState(null);

  useEffect(() => {
    base44.entities.Media.list('-uploaded_at')
      .then(setMedia)
      .finally(() => setLoading(false));
  }, []);

  const handleUpload = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setUploading(true);
    try {
      for (const file of files) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('name', file.name);
        formData.append('type', file.type.startsWith('image') ? 'image' : 'document');
        formData.append('size', file.size.toString());
        await base44.entities.Media.create(formData);
      }
      const updated = await base44.entities.Media.list('-uploaded_at');
      setMedia(updated);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this image?')) return;
    await base44.entities.Media.delete(id);
    setMedia(m => m.filter(x => x.id !== id));
  };

  const copyUrl = (url) => {
    navigator.clipboard.writeText(url);
    setCopied(url);
    setTimeout(() => setCopied(null), 2000);
  };

  const allTags = [...new Set(media.flatMap(m => m.tags || []))];
  const filtered = media.filter(m => {
    const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase());
    const matchTag = selectedTag === 'All' || (m.tags || []).includes(selectedTag);
    return matchSearch && matchTag;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Upload Section */}
      <div className="bg-white border-2 border-dashed border-gray-300 p-12 text-center hover:border-[#051A53] transition-colors">
        <label className="cursor-pointer block">
          <Upload className="w-8 h-8 text-gray-400 mx-auto mb-3" />
          <p className="text-sm font-medium text-gray-700 mb-1">
            {uploading ? 'Uploading...' : 'Click to upload or drag & drop'}
          </p>
          <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center flex-wrap">
        <div className="flex-1 min-w-60">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search media..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]"
            />
          </div>
        </div>

        {allTags.length > 0 && (
          <div className="flex gap-2">
            <button
              onClick={() => setSelectedTag('All')}
              className={`px-3 py-2 text-xs font-medium transition-all ${
                selectedTag === 'All'
                  ? 'bg-[#051A53] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              All
            </button>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-3 py-2 text-xs font-medium transition-all ${
                  selectedTag === tag
                    ? 'bg-[#051A53] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Media Grid */}
      {filtered.length > 0 ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Preview */}
              <div className="relative h-40 bg-gray-100 overflow-hidden">
                <img
                  src={item.file}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                  <button
                    onClick={() => copyUrl(item.file)}
                    className="p-2 bg-white/90 hover:bg-white transition-colors"
                    title="Copy URL"
                  >
                    <Copy className="w-4 h-4 text-gray-700" />
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-500/90 hover:bg-red-600 text-white transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                {copied === item.file && (
                  <div className="absolute inset-0 bg-green-500/80 flex items-center justify-center text-white text-xs font-medium">
                    Copied!
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-3">
                <p className="text-xs font-medium text-gray-800 truncate mb-1" title={item.name}>
                  {item.name}
                </p>
                <p className="text-xs text-gray-400 mb-2">
                  {(item.size / 1024 / 1024).toFixed(2)} MB
                </p>
                {(item.tags || []).length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-gray-50">
          <ImageIcon className="w-12 h-12 mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500 font-medium">No media found</p>
          <p className="text-sm text-gray-400">Upload images to get started</p>
        </div>
      )}
    </div>
  );
}