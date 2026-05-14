import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const bureaux = [
  'Policy, Planning, Monitoring and Evaluation',
  'Human Resource and Administration',
  'Finance and Accounts',
  'Protocol',
  'Legal and Treaties',
  'Consular and Humanitarian Affairs',
  'Economics, Trade and Investment',
  'Passports Office',
  'Information and Public Affairs',
  'Estates and General Services',
  'Regional Integration',
  'Americas',
  'Europe',
  'Middle East',
  'Asia and Pacific',
  'Multilateral Relations',
  'Across International Conference Centre',
  'Information Communication Technology',
  'Inspectorate and Internal Audit',
  'Diaspora Affairs',
  'Procurement and Supply Chain Management',
  'Delivery Unit',
  'Culture, Linguistics and Tourism',
  'Africa Bilateral',
  'Foreign Service Institute',
];

export default function BureauxUnits() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-[#051A53] text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1552664730-d307ca884978?w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-[#051A53]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Organisation</span>
            <h1 className="text-5xl sm:text-6xl font-bold leading-tight mt-3 mb-6">Bureaux | Units</h1>
            <p className="text-white/70 text-lg max-w-2xl leading-relaxed">
              The Ministry operates at the Headquarters through the Offices of the Hon. Minister and Hon. Deputy Minister as well as the Directorates and Offices of the various Directors. At the apex of the Ministry's Call Hierarchy is the Chief Director, who is responsible to the Minister and the Deputy Minister. The Chief Director is supported by the following key Bureau headed by Directors or Heads and whose competencies are defined by their progressive institutional or functional areas of coverage.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Organogram section */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-20">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Organogram of the Ministry</h2>
            <a href="#" className="text-[#051A53] text-sm font-medium hover:underline flex items-center gap-1">
              Open full size <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
          <div className="border border-gray-200 bg-white p-6 overflow-x-auto">
            <img 
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&q=80" 
              alt="Organogram of the Ministry" 
              className="w-full h-auto"
            />
          </div>
        </motion.div>

        {/* Bureaux grid */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <h2 className="text-2xl font-bold text-foreground mb-8">Ministry Bureaux and Units</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {bureaux.map((bureau, i) => (
              <motion.div
                key={bureau}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.02 }}
                className="border border-gray-200 bg-card p-5 hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <h3 className="font-semibold text-foreground text-sm leading-snug group-hover:text-[#051A53] transition-colors">
                  {bureau}
                </h3>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}