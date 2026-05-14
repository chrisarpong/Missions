import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import { base44 } from '@/api/base44Client';

const CREST_IMAGE = 'https://media.base44.com/images/public/69f9dccd37db37f01bbbc815/0d720b5a0_MFALogo6.png';

function isValidImageUrl(url) {
  if (!url || typeof url !== 'string') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export default function LatestNews() {
  const [newsItems, setNewsItems] = useState([]);
  const [failedImages, setFailedImages] = useState({});

  useEffect(() => {
    base44.entities.NewsArticle.filter({ status: 'Published' }, '-published_date', 3)
      .then(articles => {
        setNewsItems(articles.map(a => ({
          date: a.published_date,
          title: a.title,
          image: a.image_url,
          slug: a.slug || a.id,
        })));
      })
      .catch(() => {});
  }, []);

  const markImageAsFailed = (slug) => {
    setFailedImages((prev) => ({ ...prev, [slug]: true }));
  };

  return (
    <section className="bg-muted/50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <span className="text-accent text-xs font-semibold uppercase tracking-widest">Latest Updates</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-2">News</h2>
          </div>
          <Link
            to="/news"
            className="px-5 py-2 border-2 border-[#051A53] text-[#051A53] text-sm font-medium hover:bg-[#051A53] hover:text-white transition-all duration-300 inline-flex items-center gap-1.5"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* News grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {newsItems.map((item, i) => (
            <Link key={i} to={`/news/${item.slug}`}>
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="group bg-card overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-border h-full"
              >
              <div className="relative h-52 overflow-hidden">
                {isValidImageUrl(item.image) && !failedImages[item.slug] ? (
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={() => markImageAsFailed(item.slug)}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#051A53] via-[#0a2f84] to-[#D4AF37]/70 flex items-center justify-center p-6">
                    <img
                      src={CREST_IMAGE}
                      alt="Ministry of Foreign Affairs crest"
                      className="h-16 w-auto opacity-90"
                    />
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 text-white/80 text-xs">
                  <Calendar className="w-3 h-3" />
                  {item.date}
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-heading font-semibold text-foreground text-lg leading-snug mb-3 group-hover:text-accent transition-colors">
                  {item.title}
                </h3>
                <span className="text-accent text-sm font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                  Read More <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
              </motion.article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
