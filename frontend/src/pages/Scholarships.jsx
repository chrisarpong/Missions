import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Scholarships() {
  const [scholarships, setScholarships] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All providers');

  useEffect(() => {
    base44.entities.Scholarship.filter({ is_active: true })
      .then(setScholarships)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = scholarships.filter(s =>
    (filter === 'All providers' || s.provider === filter) &&
    (s.title.toLowerCase().includes(search.toLowerCase()) ||
     s.provider.toLowerCase().includes(search.toLowerCase()))
  );

  const providers = ['All providers', ...new Set(scholarships.map(s => s.provider))];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Education</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Scholarships</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Sidebar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1">
            <div className="bg-white border border-gray-200 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">International Scholarship Opportunities</h2>
              <p className="text-sm text-gray-700 mb-6 leading-relaxed">
                Explore current scholarship opportunities from partner countries and institutions through official application channels.
              </p>
              <p className="text-sm text-gray-700 mb-4">
                Use the filters below to quickly find programmes by provider, course area, or application window.
              </p>

              <div className="border-t border-gray-200 pt-6 mt-6">
                <h3 className="font-bold text-gray-900 text-base mb-4">Ghana Scholarship Secretariat</h3>
                <p className="text-sm text-gray-700 mb-3">
                  Visit the official national scholarships portal for government scholarship information and updates.
                </p>
                <a href="#" className="text-[#051A53] text-sm font-medium hover:underline">Visit Portal</a>
                <p className="text-xs text-gray-500 mt-4 pt-4 border-t border-gray-200">
                  Deadlines and programme windows may change. Always confirm updates through the official application IPA.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="lg:col-span-2 space-y-6">
            
            {/* Search & Filter */}
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by provider or course name"
                  className="w-full pl-10 pr-4 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]"
                />
              </div>

              <div className="flex gap-3">
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  className="flex-1 px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] appearance-none bg-white cursor-pointer"
                >
                  {providers.map(p => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
                <button className="px-6 py-2.5 bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200 transition-colors">
                  Showing {filtered.length} opportunities
                </button>
              </div>
            </div>

            {/* Table */}
            <div className="bg-white border border-gray-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700 uppercase tracking-wide text-xs">Provider</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700 uppercase tracking-wide text-xs">Course Name</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700 uppercase tracking-wide text-xs">Deadline</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700 uppercase tracking-wide text-xs">Description</th>
                      <th className="text-center px-4 py-3 font-semibold text-gray-700 uppercase tracking-wide text-xs">Link</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {loading ? (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          <div className="w-6 h-6 border-2 border-gray-200 border-t-[#051A53] rounded-full animate-spin mx-auto"></div>
                        </td>
                      </tr>
                    ) : filtered.length > 0 ? (
                      filtered.map((s, i) => (
                        <tr key={i} className="hover:bg-gray-50 transition-colors">
                          <td className="px-4 py-4">
                            <span className="text-xs font-bold text-[#051A53] bg-blue-100 px-2.5 py-1 inline-block uppercase">
                              {s.provider}
                            </span>
                          </td>
                          <td className="px-4 py-4 font-medium text-gray-900">{s.title}</td>
                          <td className="px-4 py-4 text-gray-600">{s.deadline}</td>
                          <td className="px-4 py-4 text-gray-600 text-xs">{s.description}</td>
                          <td className="px-4 py-4 text-center">
                            {s.link && (
                              <a href={s.link} target="_blank" rel="noreferrer"
                                className="inline-flex items-center gap-1 px-4 py-2 bg-[#051A53] text-white text-xs font-bold uppercase hover:bg-[#051A53]/90 transition-colors">
                                Apply <ExternalLink className="w-3 h-3" />
                              </a>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-4 py-8 text-center text-gray-500">
                          No scholarships found matching your criteria.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-green-50 border-l-4 border-green-600 p-4">
              <p className="text-sm text-gray-700">
                <strong>Note:</strong> Deadlines and programme windows may change. Always confirm updates through the official application IPA.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}