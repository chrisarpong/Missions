import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe2, ArrowRight, MapPin, Building2, ChevronRight } from 'lucide-react';

const regions = [
  {
    name: 'Africa',
    count: 24,
    color: '#DC2626',
    missions: ['Addis Ababa', 'Nairobi', 'Abuja', 'Pretoria', 'Cairo', 'Dakar'],
    desc: 'Anchoring pan-African solidarity and ECOWAS integration',
  },
  {
    name: 'Europe',
    count: 18,
    color: '#2563EB',
    missions: ['London', 'Paris', 'Berlin', 'Brussels', 'Rome', 'Geneva'],
    desc: 'Strengthening ties with EU partners and multilateral institutions',
  },
  {
    name: 'Americas',
    count: 10,
    color: '#7C3AED',
    missions: ['Washington D.C.', 'New York', 'Ottawa', 'Brasília', 'Bogotá'],
    desc: 'Deepening transatlantic relations and diaspora engagement',
  },
  {
    name: 'Asia & Pacific',
    count: 12,
    color: '#059669',
    missions: ['Beijing', 'Tokyo', 'New Delhi', 'Seoul', 'Canberra', 'Bangkok'],
    desc: 'Expanding South-South cooperation and trade corridors',
  },
  {
    name: 'Middle East',
    count: 8,
    color: '#D97706',
    missions: ['Riyadh', 'Abu Dhabi', 'Cairo', 'Beirut', 'Tehran'],
    desc: 'Engaging Gulf partners on energy, investment and diaspora welfare',
  },
];

function AnimatedCounter({ target, inView }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const increment = target / (1800 / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target]);
  return <>{count}</>;
}

export default function MissionsAbroad() {
  const [active, setActive] = useState(null);
  const [inView, setInView] = useState(false);
  const total = regions.reduce((s, r) => s + r.count, 0);

  return (
    <section className="relative py-24 bg-[#051A53] overflow-hidden">
      {/* World map background */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=1600&q=80"
          alt=""
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-[#051A53]/85" />
      </div>
      {/* Radial glow */}
      <div className="absolute inset-0 opacity-20" style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% 50%, #1e40af 0%, transparent 70%)'
      }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setInView(true)}
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-8 h-px bg-yellow-400" />
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Global Presence</span>
            <div className="w-8 h-px bg-yellow-400" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white leading-tight">
            Ghana's Missions Abroad
          </h2>
          <p className="text-white/50 mt-4 max-w-xl mx-auto text-base">
            A global network of embassies, high commissions, and consulates advancing Ghana's interests across every continent.
          </p>
        </motion.div>

        {/* Total counter hero */}
        <motion.div
          className="flex justify-center mb-14"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative">
            <div className="w-40 h-40 border-2 border-yellow-400/30 flex items-center justify-center relative">
              <div className="absolute inset-0 border border-yellow-400/10 scale-110" />
              <div className="text-center">
                <div className="text-6xl font-black text-yellow-400">
                  <AnimatedCounter target={total} inView={inView} />
                </div>
                <div className="text-white/60 text-xs uppercase tracking-widest mt-1">Missions</div>
              </div>
            </div>
            <div className="absolute -top-1 -left-1 w-4 h-4 border-t-2 border-l-2 border-yellow-400" />
            <div className="absolute -top-1 -right-1 w-4 h-4 border-t-2 border-r-2 border-yellow-400" />
            <div className="absolute -bottom-1 -left-1 w-4 h-4 border-b-2 border-l-2 border-yellow-400" />
            <div className="absolute -bottom-1 -right-1 w-4 h-4 border-b-2 border-r-2 border-yellow-400" />
          </div>
        </motion.div>

        {/* Region cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
          {regions.map((region, i) => (
            <motion.div
              key={region.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              onClick={() => setActive(active?.name === region.name ? null : region)}
              className={`cursor-pointer border transition-all duration-300 p-5 relative group overflow-hidden
                ${active?.name === region.name
                  ? 'border-yellow-400 bg-white/10'
                  : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/30'}`}
            >
              <div className="absolute top-0 left-0 w-1 h-full transition-all duration-300"
                style={{ backgroundColor: active?.name === region.name ? region.color : 'transparent' }} />
              <div className="text-3xl font-black text-white mb-1">
                <AnimatedCounter target={region.count} inView={inView} />
              </div>
              <div className="text-white/50 text-xs uppercase tracking-widest mb-3">{region.name}</div>
              <div className="flex items-center gap-1 text-yellow-400 text-xs font-medium">
                <MapPin className="w-3 h-3" />
                <span>{region.count} missions</span>
              </div>
              <ChevronRight className={`absolute bottom-4 right-4 w-4 h-4 transition-all duration-300 ${active?.name === region.name ? 'text-yellow-400 translate-x-0' : 'text-white/20 -translate-x-2'}`} />
            </motion.div>
          ))}
        </div>

        {/* Expanded region detail */}
        <AnimatePresence>
          {active && (
            <motion.div
              key={active.name}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4 }}
              className="overflow-hidden mb-12"
            >
              <div className="border border-white/10 bg-white/5 p-6 sm:p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{active.name} Missions</h3>
                    <p className="text-white/50 text-sm">{active.desc}</p>
                  </div>
                  <div className="shrink-0">
                    <span className="px-4 py-2 border text-sm font-semibold" style={{ borderColor: active.color, color: active.color }}>
                      {active.count} Missions
                    </span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {active.missions.map(city => (
                    <div key={city} className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/70 text-xs">
                      <Building2 className="w-3 h-3" style={{ color: active.color }} />
                      {city}
                    </div>
                  ))}
                  <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-white/40 text-xs">
                    +{active.count - active.missions.length} more
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <button className="px-8 py-3 border-2 border-yellow-400 text-yellow-400 text-sm font-semibold hover:bg-yellow-400 hover:text-[#051A53] transition-all duration-300 inline-flex items-center gap-2 group">
            <Globe2 className="w-4 h-4" />
            Find a Mission Near You
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}