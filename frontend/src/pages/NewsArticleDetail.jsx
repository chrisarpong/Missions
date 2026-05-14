import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { base44 } from '@/api/base44Client';
import { Calendar, ArrowLeft, Share2 } from 'lucide-react';

const CATEGORY_CONFIG = {
  'Press Release': { color: '#051A53', bg: 'bg-[#051A53]/10 text-[#051A53]' },
  'Statement': { color: '#16A34A', bg: 'bg-green-100 text-green-700' },
  'News': { color: '#D97706', bg: 'bg-yellow-100 text-yellow-700' },
  'Speech': { color: '#7C3AED', bg: 'bg-purple-100 text-purple-700' },
  'Media Advisory': { color: '#0891B2', bg: 'bg-cyan-100 text-cyan-700' },
  'Communiqué': { color: '#DC2626', bg: 'bg-red-100 text-red-700' },
};

export default function NewsArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.NewsArticle.filter({ slug, status: 'Published' })
      .then(articles => {
        if (articles.length > 0) {
          setArticle(articles[0]);
          // Fetch related articles
          base44.entities.NewsArticle.filter({ status: 'Published' }, '-published_date', 5)
            .then(all => setRelatedArticles(all.filter(a => a.id !== articles[0].id).slice(0, 3)))
            .catch(() => {});
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Article Not Found</h1>
          <p className="text-muted-foreground mb-8">The article you're looking for doesn't exist or has been removed.</p>
          <Link to="/news" className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link to="/news" className="inline-flex items-center gap-2 text-yellow-400 hover:text-yellow-300 text-sm font-medium mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>
          <div className="flex items-center gap-3 mb-4">
            <span className={`text-xs px-3 py-1 font-semibold ${CATEGORY_CONFIG[article.category]?.bg || 'bg-white/20 text-white'}`}>
              {article.category}
            </span>
            <span className="text-white/60 text-sm flex items-center gap-1">
              <Calendar className="w-4 h-4" /> {article.published_date}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight max-w-3xl">{article.title}</h1>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          {/* Featured image */}
          {(article.image_url || article.image) && (
            <div className="mb-10 h-96 overflow-hidden bg-gray-100">
              <img src={article.image_url || article.image} alt={article.title} className="w-full h-full object-cover" />
            </div>
          )}

          {/* Article content */}
          <div className="prose prose-lg max-w-none mb-12">
            {article.summary && (
              <p className="text-xl text-gray-600 font-semibold mb-6 leading-relaxed">{article.summary}</p>
            )}
            {article.body ? (
              <div className="text-gray-700 leading-relaxed prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: article.body }} />
            ) : (
              <p className="text-gray-700 leading-relaxed">{article.summary}</p>
            )}
          </div>

          {/* Metadata */}
          <div className="border-t pt-6 pb-12">
            {article.author && (
              <p className="text-sm text-gray-600">
                <span className="font-semibold">By:</span> {article.author}
              </p>
            )}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-4">
                <p className="text-sm font-semibold text-gray-600 mb-2">Tags:</p>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Related articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-6">Related Articles</h3>
              <div className="grid sm:grid-cols-3 gap-6">
                {relatedArticles.map(related => (
                  <Link key={related.id} to={`/news/${related.slug || related.id}`}>
                    <motion.article
                      whileHover={{ y: -4 }}
                      className="group bg-card border border-border overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="relative h-40 overflow-hidden bg-gray-100">
                        {related.image_url && (
                          <img src={related.image_url} alt={related.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-xs font-semibold uppercase text-accent mb-2">{related.category}</p>
                        <h4 className="font-bold text-foreground leading-snug group-hover:text-accent transition-colors line-clamp-2 mb-2">
                          {related.title}
                        </h4>
                        <p className="text-xs text-muted-foreground">{related.published_date}</p>
                      </div>
                    </motion.article>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}