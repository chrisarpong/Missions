import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Search, Calendar, FileText, ChevronRight, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORY_CONFIG = {
  'Press Release': { bg: 'bg-[#051A53]/10 text-[#051A53]' },
  'Statement': { bg: 'bg-green-100 text-green-700' },
  'News': { bg: 'bg-yellow-100 text-yellow-700' },
  'Speech': { bg: 'bg-purple-100 text-purple-700' },
  'Media Advisory': { bg: 'bg-cyan-100 text-cyan-700' },
  'Communiqué': { bg: 'bg-red-100 text-red-700' },
};

const CATEGORIES = ['All', 'Press Release', 'Statement', 'News', 'Speech', 'Media Advisory', 'Communiqué'];

export default function News() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');

  useEffect(() => {
    base44.entities.NewsArticle.filter({ status: 'Published' }, '-published_date')
      .then(data => { setArticles(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const filtered = articles.filter(a => {
    const matchSearch = !search ||
      a.title?.toLowerCase().includes(search.toLowerCase()) ||
      a.summary?.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || a.category === category;
    return matchSearch && matchCat;
  });

  const featured = filtered.find(a => a.featured) || filtered[0];
  const rest = filtered.filter(a => a.id !== featured?.id);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Latest Updates</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight mb-4 max-w-2xl">News</h1>
            <p className="text-white/60 text-lg max-w-lg leading-relaxed">
              Stay informed with the latest news and updates from Ghana's Ministry of Foreign Affairs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Category filter */}
      <div className="sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-1">
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
        {/* Search */}
        <div className="relative max-w-xl mb-12">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search news articles..."
            className="w-full pl-12 pr-4 py-3.5 border-2 border-gray-200 text-sm focus:outline-none focus:border-[#051A53] bg-white" />
        </div>

        {loading && (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" />
          </div>
        )}

        {!loading && filtered.length === 0 && (
          <div className="text-center py-24">
            <FileText className="w-12 h-12 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 font-medium">No articles found</p>
            <p className="text-sm text-gray-400 mt-1">Try adjusting your search or category filter.</p>
          </div>
        )}

        {/* Featured article */}
        {!loading && featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="mb-14 grid lg:grid-cols-2 gap-10 items-center">
            <div className="relative h-80 overflow-hidden bg-gray-100">
              {featured.image_url ? (
                <img src={featured.image_url} alt={featured.title} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText className="w-16 h-16 text-gray-200" />
                </div>
              )}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-3">
                <span className={`text-xs px-2.5 py-1 font-semibold ${CATEGORY_CONFIG[featured.category]?.bg || 'bg-gray-100 text-gray-600'}`}>
                  {featured.category}
                </span>
                <span className="text-xs text-gray-400 flex items-center gap-1">
                  <Calendar className="w-3 h-3" /> {featured.published_date}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 leading-tight mb-4">{featured.title}</h2>
              <p className="text-gray-600 leading-relaxed mb-6 line-clamp-3">{featured.summary}</p>
              <Link to={`/news/${featured.slug || featured.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90 transition-colors">
                Read Article <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        )}

        {/* Articles grid */}
        {!loading && rest.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((article, i) => (
              <motion.article key={article.id}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group bg-white border border-gray-200 overflow-hidden hover:shadow-lg transition-all duration-300">
                <Link to={`/news/${article.slug || article.id}`}>
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    {article.image_url ? (
                      <img src={article.image_url} alt={article.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <FileText className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-xs px-2.5 py-1 font-semibold ${CATEGORY_CONFIG[article.category]?.bg || 'bg-gray-100 text-gray-600'}`}>
                        {article.category}
                      </span>
                      <span className="text-xs text-gray-400 flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> {article.published_date}
                      </span>
                    </div>
                    <h3 className="font-bold text-gray-900 leading-snug mb-2 group-hover:text-[#051A53] transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-sm text-gray-500 line-clamp-2 mb-4">{article.summary}</p>
                    <span className="text-[#051A53] text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                      Read More <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}