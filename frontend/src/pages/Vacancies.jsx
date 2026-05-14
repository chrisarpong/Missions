import React, { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';
import { base44 } from '@/api/base44Client';

export default function Vacancies() {
  const [vacanciesData, setVacanciesData] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState('');
  const [orgFilter, setOrgFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    base44.entities.Vacancy.filter({ is_active: true })
      .then(setVacanciesData)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const organisations = ['All', ...new Set(vacanciesData.map(v => v.department))];
  const locations = ['All', ...new Set(vacanciesData.map(v => v.location))];

  const filtered = useMemo(() => {
    return vacanciesData.filter(v => {
      const searchMatch = !search || 
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.department.toLowerCase().includes(search.toLowerCase());
      const orgMatch = orgFilter === 'All' || v.department === orgFilter;
      const locationMatch = locationFilter === 'All' || v.location === locationFilter;
      return searchMatch && orgMatch && locationMatch;
    });
  }, [vacanciesData, search, orgFilter, locationFilter]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedVacancies = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClear = () => {
    setSearch('');
    setOrgFilter('All');
    setLocationFilter('All');
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Careers</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Vacancies</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Info Box */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border-l-4 border-blue-400 p-5 mb-8">
          <h2 className="font-bold text-gray-900 mb-2">Current Vacancies</h2>
          <p className="text-sm text-gray-700 mb-2">
            International Organisation vacancy announcements currently listed by the Ministry of Foreign Affairs.
          </p>
          <p className="text-sm text-gray-600">
            Applicants are kindly requested to notify fax Consultations Unit of completed vacancy applications.
          </p>
          <div className="flex gap-3 mt-3 text-xs">
            <span className="bg-white px-2.5 py-1 rounded text-gray-700">📄 Your</span>
            <span className="bg-white px-2.5 py-1 rounded text-gray-700">📋 Org</span>
            <span className="bg-white px-2.5 py-1 rounded text-gray-700">🕐 Closing Soon</span>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-gray-200 p-5 mb-8">
          <div className="space-y-4">
            <div className="flex gap-3 flex-wrap">
              <div className="flex-1 min-w-64 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  placeholder="Search by title, department..."
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]"
                />
              </div>
              <select
                value={orgFilter}
                onChange={e => setOrgFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] appearance-none bg-white cursor-pointer"
              >
                {organisations.map(o => <option key={o}>{o}</option>)}
              </select>
              <select
                value={locationFilter}
                onChange={e => setLocationFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] appearance-none bg-white cursor-pointer"
              >
                {locations.map(l => <option key={l}>{l}</option>)}
              </select>
              <button
                onClick={handleClear}
                className="px-4 py-2.5 border border-gray-200 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                Clear
              </button>
            </div>
          </div>
        </motion.div>

        {/* Vacancies List */}
        <div className="space-y-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin mx-auto"></div>
            </div>
          ) : paginatedVacancies.length > 0 ? (
            paginatedVacancies.map((vacancy, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-gray-200 border-t-4 border-t-yellow-400">
                <div className="border-b border-gray-200 px-6 py-5">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{vacancy.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{vacancy.department}</p>
                    </div>
                    {vacancy.apply_link && (
                      <a href={vacancy.apply_link} target="_blank" rel="noreferrer" className="px-4 py-2 bg-[#051A53] text-white text-sm hover:bg-[#051A53]/90">
                        Apply Now
                      </a>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-gray-700">Closing date: {vacancy.deadline}</span>
                    <span className="bg-green-100 text-green-700 px-2.5 py-0.5 font-medium">Open</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 px-6 py-5">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-2">Role Description</h4>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">{vacancy.description}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-2">Key Details</h4>
                    <ul className="space-y-1">
                      <li className="text-sm text-gray-700 flex gap-2">
                        <span className="text-gray-400">•</span> Department: {vacancy.department}
                      </li>
                      <li className="text-sm text-gray-700 flex gap-2">
                        <span className="text-gray-400">•</span> Location: {vacancy.location}
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p className="font-medium">No vacancies found matching your criteria.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-600">Page {currentPage} of {totalPages}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 border border-gray-200 text-sm font-medium disabled:opacity-50 hover:bg-gray-50"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-2 text-sm font-medium ${
                    currentPage === page
                      ? 'bg-[#051A53] text-white'
                      : 'border border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 border border-gray-200 text-sm font-medium disabled:opacity-50 hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}