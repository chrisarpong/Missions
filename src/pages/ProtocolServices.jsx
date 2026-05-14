import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronDown } from 'lucide-react';

const services = [
  { title: 'Issuance, replacement and renewal of Diplomatic Identity Cards', time: 'WITHIN FOUR (4) WORKING DAYS' },
  { title: 'Exemption on the importation/purchase of official vehicles and goods for Diplomatic Missions and International Organisations', time: 'WITHIN FIVE (5) WORKING DAYS SINCE APPLICATION APPLIES IN THE WHEAT POSTAL SYSTEM' },
  { title: 'Registration, retrieval and transfer of Diplomatic Vehicle Registration', time: 'WITHIN THREE (3) WORKING DAYS' },
  { title: 'VAT Refunds', time: 'ON REQUEST' },
  { title: 'Tax Identification Number (TIN)', time: 'ON REQUEST' },
  { title: 'Facilitate Permit for re-expatriation, disposal of personal effects, household goods, and vehicle of Diplomats and Diplomatic Missions and International Organisations', time: 'WITHIN TEN (10) WORKING DAYS' },
  { title: 'Facilitate Diplomatic Overflight/Landing, Naval Clearance', time: 'WITHIN SIX (6) WORKING DAYS' },
  { title: 'Facilitate the processing of Driver\'s Licence for Diplomats', time: 'WITHIN THREE (3) WORKING DAYS' },
  { title: 'Facilitate the use of the VIP Lounge by Heads of Mission, International Organisations, and Senior Government Officials', time: 'WITHIN THREE (3) WORKING DAYS - BASED ON APPLY' },
  { title: 'Facilitate appointments in favor of Heads of Diplomatic Mission and International Organisations', time: 'WITHIN TEN (10) WORKING DAYS' }
];

export default function ProtocolServices() {
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);

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
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Protocol Services</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
          <label className="text-xs uppercase tracking-widest text-gray-600 font-semibold">Search Protocol Services</label>
          <div className="relative mt-3 mb-6">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search by service title, steps, or requirements"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]"
            />
          </div>

        </motion.div>

        {/* Services List */}
        <div className="space-y-3 mb-12">
          {filtered.map((service, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="border border-gray-200 bg-white">
              <button onClick={() => setExpanded(expanded === i ? null : i)}
                className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors">
                <div className="text-left">
                  <h3 className="font-bold text-gray-900 text-sm">{service.title}</h3>
                  <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1 inline-block mt-2">{service.time}</span>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform shrink-0 ${expanded === i ? 'rotate-180' : ''}`} />
              </button>

              {expanded === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                  className="border-t border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-700">
                    For details on this service, including requirements and application procedures, please contact the Protocol Unit.
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Forms Section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="border-t-4 border-gray-200 pt-12">
          <h2 className="text-xl font-bold text-gray-900 mb-3">Protocol Forms</h2>
          <p className="text-sm text-gray-700 mb-4">Fill Online or Download Blank Forms</p>
          <p className="text-sm text-gray-600">Complete the required fields online and download the filled PDF, or download the blank form for manual submission.</p>
        </motion.div>
      </div>
    </div>
  );
}