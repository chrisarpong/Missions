import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X } from 'lucide-react';

const vacanciesData = [
  {
    title: 'Cloud Telecoms and Security',
    organisation: 'World Meteorological Organization (WMO)',
    location: 'Geneva, Switzerland',
    closingDate: '27 Feb 2026',
    status: 'Applications Closed',
    level: 'P-2',
    type: 'Telecom',
    roleDesc: 'Duty Station: Duty station: Geneva.',
    keyDetails: [
      'Department: World Meteorological Organization (WMO)',
      'Location: Geneva, Switzerland',
      'Employment Type: P-2',
      'Status: Applications Closed'
    ]
  },
  {
    title: 'Associate Project Officer',
    organisation: 'International Criminal Court (ICC)',
    location: 'The Hague, Netherlands',
    closingDate: '5 Mar 2026',
    status: 'Applications Closed',
    level: 'P-2',
    type: 'Project',
    roleDesc: 'Ref/Service No. 24159',
    keyDetails: [
      'Department: International Criminal Court (ICC)',
      'Location: The Hague, Netherlands',
      'Employment Type: P-2',
      'Status: Applications Closed'
    ]
  },
  {
    title: 'Associate Private Sector Engagement Officer',
    organisation: 'World Meteorological Organization (WMO)',
    location: 'Geneva, Switzerland',
    closingDate: '5 Mar 2026',
    status: 'Applications Closed',
    level: 'P-2',
    type: 'Engagement',
    roleDesc: 'Vacancy No. 2418, Duty station: Geneva.',
    keyDetails: [
      'Department: World Meteorological Organization (WMO)',
      'Location: Geneva, Switzerland',
      'Employment Type: P-2',
      'Status: Applications Closed'
    ]
  },
  {
    title: 'Private Sector Engagement Officer',
    organisation: 'World Meteorological Organization (WMO)',
    location: 'Geneva, Switzerland',
    closingDate: '1 Mar 2026',
    status: 'Applications Closed',
    level: 'P-1',
    type: 'Engagement',
    roleDesc: 'Vacancy No. 2417, Duty station: Geneva.',
    keyDetails: [
      'Department: World Meteorological Organization (WMO)',
      'Location: Geneva, Switzerland',
      'Employment Type: P-1',
      'Status: Applications Closed'
    ]
  },
  {
    title: 'Head of Facilities Management and Common Services',
    organisation: 'World Meteorological Organization (WMO)',
    location: 'Geneva, Switzerland',
    closingDate: '1 Mar 2026',
    status: 'Applications Closed',
    level: 'P-2',
    type: 'Management',
    roleDesc: 'Vacancy No. 1438, Duty station: Geneva.',
    keyDetails: [
      'Department: World Meteorological Organization (WMO)',
      'Location: Geneva, Switzerland',
      'Employment Type: P-2',
      'Status: Applications Closed'
    ]
  }
];

export default function Vacancies() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [orgFilter, setOrgFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('All');
  const [levelFilter, setLevelFilter] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const organisations = ['All', ...new Set(vacanciesData.map(v => v.organisation))];
  const locations = ['All', ...new Set(vacanciesData.map(v => v.location))];
  const levels = ['All', 'P-1', 'P-2'];
  const statuses = ['All', 'Applications Closed', 'Open'];

  const filtered = useMemo(() => {
    return vacanciesData.filter(v => {
      const searchMatch = !search || 
        v.title.toLowerCase().includes(search.toLowerCase()) ||
        v.organisation.toLowerCase().includes(search.toLowerCase());
      const statusMatch = statusFilter === 'All' || v.status === statusFilter;
      const orgMatch = orgFilter === 'All' || v.organisation === orgFilter;
      const locationMatch = locationFilter === 'All' || v.location === locationFilter;
      const levelMatch = levelFilter === 'All' || v.level === levelFilter;
      return searchMatch && statusMatch && orgMatch && locationMatch && levelMatch;
    });
  }, [search, statusFilter, orgFilter, locationFilter, levelFilter]);

  const itemsPerPage = 5;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedVacancies = filtered.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleClear = () => {
    setSearch('');
    setStatusFilter('All');
    setOrgFilter('All');
    setLocationFilter('All');
    setLevelFilter('All');
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
                  placeholder="Search by title, organisation..."
                  className="w-full pl-9 pr-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]"
                />
              </div>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] appearance-none bg-white cursor-pointer"
              >
                {statuses.map(s => <option key={s}>{s}</option>)}
              </select>
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
              <select
                value={levelFilter}
                onChange={e => setLevelFilter(e.target.value)}
                className="px-3 py-2.5 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53] appearance-none bg-white cursor-pointer"
              >
                {levels.map(l => <option key={l}>{l}</option>)}
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
          {paginatedVacancies.length > 0 ? (
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
                      <p className="text-sm text-gray-600 mt-1">{vacancy.organisation}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <span className="text-gray-700">Closing date: {vacancy.closingDate}</span>
                    <span className="bg-red-100 text-red-700 px-2.5 py-0.5 font-medium">{vacancy.status}</span>
                    <span className="bg-gray-100 text-gray-700 px-2.5 py-0.5">{vacancy.level}</span>
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6 px-6 py-5">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-2">Role Description</h4>
                    <p className="text-sm text-gray-700">{vacancy.roleDesc}</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-2">Key Details</h4>
                    <ul className="space-y-1">
                      {vacancy.keyDetails.map((detail, j) => (
                        <li key={j} className="text-sm text-gray-700 flex gap-2">
                          <span className="text-gray-400">•</span> {detail}
                        </li>
                      ))}
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