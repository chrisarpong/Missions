import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Search } from 'lucide-react';

const services = [
  {
    title: 'Attestation',
    time: 'FIVE (5) WORKING DAYS',
    cost: 'GHC250.00 PAID AT THE MINISTRY'
  },
  {
    title: 'Travel Certificate',
    time: 'WITHIN TWO(2) - THREE(3) WORKING DAYS',
    cost: 'GHC200.00 PAID AT THE MINISTRY'
  },
  {
    title: 'Laissez Passer',
    time: 'WITHIN TWO(2) - THREE(3) WORKING DAYS',
    cost: 'GHC200'
  }
];

export default function ConsularServices() {
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
              placeholder="Search by service title, steps, or requirements"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 text-sm focus:outline-none focus:border-[#051A53]"
            />
          </div>

        </motion.div>

        {/* Services List */}
        <div className="space-y-3">
          {filtered.map((service, i) => (
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
                    <span className="text-xs bg-gray-100 text-gray-700 px-2.5 py-1">{service.time}</span>
                    <span className="text-xs bg-yellow-100 text-yellow-700 px-2.5 py-1">{service.cost}</span>
                  </div>
                </div>
                <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${expanded === i ? 'rotate-180' : ''}`} />
              </button>

              {expanded === i && (
                <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }}
                  className="border-t border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm text-gray-700">
                    For more information about {service.title}, please contact the Consular Services Unit or visit our nearest mission.
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}