import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Search, Calendar, ArrowRight, Mic, FileText, Radio, BookOpen, Download, X, ChevronRight } from 'lucide-react';

const CATEGORY_CONFIG = {
  'Press Release': { color: '#051A53', bg: 'bg-[#051A53]/10 text-[#051A53]' },
  'Statement': { color: '#16A34A', bg: 'bg-green-100 text-green-700' },
  'News': { color: '#D97706', bg: 'bg-yellow-100 text-yellow-700' },
  'Speech': { color: '#7C3AED', bg: 'bg-purple-100 text-purple-700' },
  'Media Advisory': { color: '#0891B2', bg: 'bg-cyan-100 text-cyan-700' },
  'Communiqué': { color: '#DC2626', bg: 'bg-red-100 text-red-700' },
};

const CATEGORIES = ['All', 'Press Release', 'Statement', 'News', 'Speech', 'Media Advisory', 'Communiqué'];



function ArticleModal({ article, onClose }) {
  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}>
      <motion.div className="bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}
        onClick={e => e.stopPropagation()}>
        {(article.image || article.image_url) && (
          <img src={article.image || article.image_url} alt={article.title} className="w-full h-56 object-cover" />
        )}
        <div className="p-8">
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs px-2.5 py-1 font-semibold ${CATEGORY_CONFIG[article.category]?.bg || 'bg-gray-100 text-gray-600'}`}>
              {article.category}
            </span>
            <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{article.published_date}</span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 leading-tight mb-3">{article.title}</h2>
          {article.author && <p className="text-sm text-gray-500 mb-6">By {article.author}</p>}
          <p className="text-gray-600 leading-relaxed mb-4">{article.body || article.summary}</p>
        </div>
        <div className="px-8 pb-6 flex justify-between items-center border-t border-gray-100 pt-4">
          <a href={`/news/${article.slug || article.id}`} className="flex items-center gap-2 text-sm text-[#051A53] font-medium hover:underline">
            <ArrowRight className="w-4 h-4" /> Read Full Article
          </a>
          <button onClick={onClose} className="px-4 py-2 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90">Close</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function PressRoom() {
  const [dbArticles, setDbArticles] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [selected, setSelected] = useState(null);
  const [ticker, setTicker] = useState(0);

  useEffect(() => {
    base44.entities.NewsArticle.filter({ status: 'Published' }, '-published_date').then(setDbArticles).catch(() => {});
  }, []);

  useEffect(() => {
    if (dbArticles.length > 0) {
      const interval = setInterval(() => setTicker(t => (t + 1) % dbArticles.length), 4000);
      return () => clearInterval(interval);
    }
  }, [dbArticles]);

  const allArticles = dbArticles.map(a => ({ ...a, image: a.image_url }));

  const featured = allArticles.find(a => a.featured) || allArticles[0];
  const filtered = allArticles.filter(a => {
    const matchSearch = !search || a.title?.toLowerCase().includes(search.toLowerCase()) || a.summary?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || a.category === category;
    return matchSearch && matchCat;
  });
  const grid = filtered.filter(a => a.id !== featured?.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-[#051A53] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-b from-[#051A53]/90 to-[#051A53]" />

        {/* Breaking news ticker */}
        <div className="relative bg-yellow-400 text-[#051A53] py-2 px-4 overflow-hidden">
          <div className="max-w-7xl mx-auto flex items-center gap-4">
            <span className="shrink-0 text-xs font-black uppercase tracking-widest px-2 py-0.5 bg-[#051A53] text-yellow-400">LATEST</span>
            <AnimatePresence mode="wait">
              {dbArticles.length > 0 && (
                <motion.span key={ticker} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="text-xs font-semibold truncate">
                  {dbArticles[ticker]?.title}
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest flex items-center gap-1.5">
                <Radio className="w-3.5 h-3.5 animate-pulse" /> Press Room
              </span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-4 max-w-2xl">
              Official Statements & Media Centre
            </h1>
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              Authoritative press releases, ministerial statements, and official communications from Ghana's Ministry of Foreign Affairs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category quick-filters */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-1 no-scrollbar">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`shrink-0 px-5 py-3 text-sm font-medium transition-all border-b-2 -mb-px ${category === cat ? 'border-[#051A53] text-[#051A53]' : 'border-transparent text-gray-500 hover:text-gray-800'}`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search bar */}
        <div className="relative max-w-xl mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search press releases, statements..."
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 text-sm focus:outline-none focus:border-[#051A53] bg-white" />
        </div>

        {/* Featured article with sidebar */}
        {featured && !search && category === 'All' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mb-12 grid lg:grid-cols-3 gap-8">
            {/* Featured article */}
            <div className="lg:col-span-2">
              <span className="text-xs font-semibold uppercase tracking-widest text-gray-400">Featured</span>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mt-2 mb-6">{featured.title}</h2>
              <div className="relative mb-6 h-80 overflow-hidden bg-gray-100">
                {(featured.image || featured.image_url) && (
                  <img src={featured.image || featured.image_url} alt={featured.title} className="w-full h-full object-cover" />
                )}
              </div>
              <p className="text-gray-600 leading-relaxed mb-4">{featured.summary}</p>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <Calendar className="w-4 h-4" />
                {featured.published_date}
              </div>
            </div>

            {/* More News sidebar */}
            <div className="lg:col-span-1">
              <h3 className="font-bold text-lg text-gray-900 mb-6">More News</h3>
              <div className="space-y-6">
                {grid.slice(0, 3).map(article => (
                  <div key={article.id} className="border-b border-gray-200 pb-5 last:border-0 cursor-pointer group" onClick={() => setSelected(article)}>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#051A53] mb-1">{article.category}</p>
                    <h4 className="font-bold text-gray-900 text-sm leading-snug mb-2 group-hover:text-[#051A53] transition-colors">{article.title}</h4>
                    <p className="text-xs text-gray-400">{article.published_date}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {(search || category !== 'All' ? filtered : grid).slice(0, 3).map((article, i) => (
            <motion.article key={article.id}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setSelected(article)}>
              <div className="relative h-48 overflow-hidden bg-gray-100">
                {(article.image || article.image_url) ? (
                  <img src={article.image || article.image_url} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <FileText className="w-8 h-8 text-gray-300" />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-xs px-2.5 py-1 font-semibold ${CATEGORY_CONFIG[article.category]?.bg || 'bg-gray-100 text-gray-600'}`}>
                    {article.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center gap-1"><Calendar className="w-3 h-3" />{article.published_date}</span>
                </div>
                <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#051A53] transition-colors line-clamp-2">{article.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mb-4">{article.summary}</p>
                <span className="text-[#051A53] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read Full Statement <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No results found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>

      <AnimatePresence>
        {selected && <ArticleModal article={selected} onClose={() => setSelected(null)} />}
      </AnimatePresence>
    </div>
  );
}