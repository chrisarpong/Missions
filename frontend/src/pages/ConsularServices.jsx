import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function ConsularServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    base44.entities.ServiceInfo.list()
      .then(data => {
        // filter for Consular services if category is used
        const consular = data.filter(s => s.category.toLowerCase().includes('consular'));
        setServices(consular.length > 0 ? consular : data); // fallback to all if none explicitly marked
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = services.filter(s =>
    s.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Services</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Consular Services</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <label className="text-xs uppercase tracking-widest text-gray-600 font-semibold">Search Consular Services</label>
          <div className="relative mt-3 mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by service title..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]"
            />
          </div>
        </motion.div>

        {/* Services List */}
        <div className="space-y-3">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin mx-auto"></div>
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((service, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="border border-gray-200 bg-white">
                <button onClick={() => setExpanded(expanded === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900">{service.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2">
                      {service.processing_time && (
                        <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 uppercase">{service.processing_time}</span>
                      )}
                      {service.fee && (
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2.5 py-1 uppercase">{service.fee}</span>
                      )}
                    </div>
                  </div>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
                </button>

                {expanded === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                    className="border-t border-gray-200 bg-gray-50 p-5 space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 text-sm mb-1">Description</h4>
                      <p className="text-sm text-gray-700 whitespace-pre-wrap">{service.description}</p>
                    </div>
                    {service.requirements && (
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm mb-1">Requirements</h4>
                        <p className="text-sm text-gray-700 whitespace-pre-wrap">{service.requirements}</p>
                      </div>
                    )}
                    {service.link && (
                      <div className="pt-2">
                        <a href={service.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-[#051A53] text-sm font-semibold hover:underline">
                          More Information <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    )}
                  </motion.div>
                )}
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="font-medium">No services found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}