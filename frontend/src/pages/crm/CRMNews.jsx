import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Plus, Search, Edit2, Trash2, Eye, Star, Filter } from 'lucide-react';
import NewsArticleModal from '@/components/crm/NewsArticleModal';

const STATUS_COLORS = {
  Published: 'bg-green-100 text-green-700',
  Draft: 'bg-yellow-100 text-yellow-700',
  Archived: 'bg-gray-100 text-gray-500',
};

const CATEGORIES = ['All', 'Press Release', 'Statement', 'News', 'Speech', 'Media Advisory', 'Communiqué'];

export default function CRMNews() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);

  const load = () => base44.entities.NewsArticle.list('-published_date').then(d => { setArticles(d); setLoading(false); });
  useEffect(() => { load(); }, []);

  const handleSave = async (data) => {
    if (editing) await base44.entities.NewsArticle.update(editing.id, data);
    else await base44.entities.NewsArticle.create(data);
    setModalOpen(false); setEditing(null); load();
  };

  const handleDelete = async (id) => {
    if (confirm('Delete this article?')) { await base44.entities.NewsArticle.delete(id); load(); }
  };

  const toggleFeatured = async (article) => {
    await base44.entities.NewsArticle.update(article.id, { featured: !article.featured });
    load();
  };

  const filtered = articles.filter(a => {
    const matchSearch = !search || a.title?.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'All' || a.category === catFilter;
    return matchSearch && matchCat;
  });

  if (loading) return <div className="flex justify-center py-20"><div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" /></div>;

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search articles..."
            className="w-full pl-9 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] bg-white" />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
            className="pl-9 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] bg-white appearance-none cursor-pointer">
            {CATEGORIES.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>
        <button onClick={() => { setEditing(null); setModalOpen(true); }}
          className="flex items-center gap-2 px-4 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90 transition-colors">
          <Plus className="w-4 h-4" /> New Article
        </button>
      </div>

      <p className="text-xs text-gray-400 mb-3">{filtered.length} article{filtered.length !== 1 ? 's' : ''}</p>

      <div className="bg-white border border-gray-200 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50">
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Title</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden md:table-cell">Category</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide hidden sm:table-cell">Date</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Status</th>
              <th className="text-right px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(a => (
              <tr key={a.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {a.featured && <Star className="w-3.5 h-3.5 text-yellow-500 fill-yellow-500 shrink-0" />}
                    <div>
                      <p className="font-medium text-gray-800">{a.title}</p>
                      {a.summary && <p className="text-xs text-gray-400 truncate max-w-xs">{a.summary}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-xs text-gray-500 hidden md:table-cell">{a.category}</td>
                <td className="px-4 py-3 text-xs text-gray-500 hidden sm:table-cell">{a.published_date || '—'}</td>
                <td className="px-4 py-3">
                  <span className={`text-xs px-2 py-0.5 font-medium ${STATUS_COLORS[a.status] || 'bg-gray-100 text-gray-500'}`}>{a.status}</span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <button onClick={() => toggleFeatured(a)} className={`p-1.5 transition-colors ${a.featured ? 'text-yellow-500' : 'text-gray-300 hover:text-yellow-500'}`} title="Toggle featured"><Star className="w-4 h-4" /></button>
                    <button onClick={() => { setEditing(a); setModalOpen(true); }} className="p-1.5 text-gray-400 hover:text-[#051A53] transition-colors"><Edit2 className="w-4 h-4" /></button>
                    <button onClick={() => handleDelete(a.id)} className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="text-center py-16 text-gray-400">
            <p className="text-sm">No articles found</p>
          </div>
        )}
      </div>

      {modalOpen && <NewsArticleModal article={editing} onSave={handleSave} onClose={() => { setModalOpen(false); setEditing(null); }} />}
    </div>
  );
}