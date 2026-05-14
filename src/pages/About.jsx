import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield, Users, FileText, ChevronDown, History, Building2, UserCheck } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const pillars = [
  {
    icon: Globe,
    title: 'Diplomatic Engagement',
    desc: "Fostering bilateral and multilateral relationships that advance Ghana's strategic interests across every continent.",
  },
  {
    icon: Shield,
    title: 'National Security',
    desc: "Coordinating foreign policy with national security objectives to protect Ghanaian citizens at home and abroad.",
  },
  {
    icon: Users,
    title: 'Diaspora Affairs',
    desc: "Connecting and supporting the Ghanaian diaspora community, leveraging their contributions for national development.",
  },
  {
    icon: FileText,
    title: 'Treaties & Agreements',
    desc: "Negotiating and managing international treaties, conventions, and bilateral agreements on behalf of the Republic.",
  },
];

const stats = [
  { value: '72', label: 'Missions Abroad' },
  { value: '180+', label: 'Partner Countries' },
  { value: '1957', label: 'Founded' },
  { value: '1,200+', label: 'Staff Worldwide' },
];

export default function About() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('mandate');
  const [expandedMenu, setExpandedMenu] = useState(null);

  const menuStructure = [
    { id: 'overview', label: 'Overview', icon: FileText },
    {
      id: 'organisation',
      label: 'Organisation',
      icon: Building2,
      submenu: [
        { id: 'history', label: 'History', path: '/about/organisation/history' },
        { id: 'bureaux', label: 'Bureaux & Units', path: '/about/organisation/bureaux-units' }
      ]
    },
    {
      id: 'leadership',
      label: 'Leadership',
      icon: UserCheck,
      submenu: [
        { id: 'minister', label: 'Current Minister', path: '/about/leadership/current-minister' },
        { id: 'deputy', label: 'Deputy Minister', path: '/about/leadership/deputy-minister' },
        { id: 'chief', label: 'Chief Director', path: '/about/leadership/chief-director' },
        { id: 'former', label: 'Former Ministers', path: '/about/leadership/former-ministers' }
      ]
    },
    {
      id: 'moreabout',
      label: 'More About Us',
      icon: Globe,
      submenu: [
        { id: 'missions', label: 'Ghana Missions Abroad', path: '/about/more-about-us/ghana-missions-abroad' }
      ]
    }
  ];

  const tabs = [
    { id: 'mandate', label: 'Our Mandate' },
    { id: 'vision', label: 'Vision & Mission' },
    { id: 'structure', label: 'Structure' },
  ];

  const tabContent = {
    mandate: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>The Ministry of Foreign Affairs and Regional Integration is responsible for the formulation, coordination, and implementation of Ghana's foreign policy. It serves as the principal interface between Ghana and the international community.</p>
        <p>The Ministry advises the President and Cabinet on all foreign policy matters, manages Ghana's bilateral and multilateral relations, and ensures the protection of Ghanaian nationals and interests abroad through its network of missions and consulates.</p>
        <p>It also coordinates Ghana's participation in regional and international organisations including the African Union, ECOWAS, the United Nations, and the Commonwealth of Nations.</p>
      </div>
    ),
    vision: (
      <div className="space-y-6">
        <div className="border-l-4 border-accent pl-5">
          <h4 className="font-bold text-foreground text-lg mb-2">Vision</h4>
          <p className="text-muted-foreground leading-relaxed">To be a world-class foreign ministry that effectively promotes and protects Ghana's national interests in the international arena.</p>
        </div>
        <div className="border-l-4 border-[#051A53] pl-5">
          <h4 className="font-bold text-foreground text-lg mb-2">Mission</h4>
          <p className="text-muted-foreground leading-relaxed">To formulate and implement a coherent, dynamic, and principled foreign policy that advances Ghana's political, economic, and social interests globally.</p>
        </div>
        <div className="border-l-4 border-green-600 pl-5">
          <h4 className="font-bold text-foreground text-lg mb-2">Core Values</h4>
          <p className="text-muted-foreground leading-relaxed">Integrity, Professionalism, Accountability, Excellence, and Service to the People of Ghana.</p>
        </div>
      </div>
    ),
    structure: (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        <p>The Ministry is headed by the Minister for Foreign Affairs and Regional Integration, supported by a Deputy Minister. The administrative operations are led by the Chief Director.</p>
        <p>The Ministry is organized into several directorates including: Political Affairs, Economic Affairs, Protocol, Consular Affairs, Legal & Treaties, Regional Integration, and Administration & Finance.</p>
        <p>Overseas, Ghana's foreign policy is executed through 72 diplomatic missions including Embassies, High Commissions, Permanent Missions to international organisations, and Consulates-General.</p>
      </div>
    ),
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-[#051A53] text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-gradient-to-r from-[#051A53] via-[#051A53]/90 to-[#051A53]/60" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">About the Ministry</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold leading-tight max-w-3xl mb-6">
              Ghana's Voice in the World
            </h1>
            <p className="text-white/70 text-lg max-w-xl leading-relaxed">
              Since 1957, the Ministry of Foreign Affairs has championed Ghana's place in the international community — building partnerships, protecting citizens, and advancing a foreign policy rooted in pan-African solidarity.
            </p>
          </motion.div>
        </div>
        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-background" style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />
      </section>

      {/* Stats bar */}
      <section className="bg-accent/10 border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="text-center">
                <div className="text-4xl font-bold text-[#051A53]">{s.value}</div>
                <div className="text-sm text-muted-foreground mt-1">{s.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">What We Do</span>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mt-3">Four Pillars of Ghana's Foreign Policy</h2>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="group border border-border bg-card p-8 hover:border-[#051A53] hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-0 bg-[#051A53] group-hover:h-full transition-all duration-500" />
              <p.icon className="w-8 h-8 text-accent mb-5" />
              <h3 className="font-bold text-foreground mb-3 text-lg">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Menu Navigation */}
      <section className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-1 overflow-x-auto">
            {menuStructure.map(item => {
              const hasSubmenu = item.submenu && item.submenu.length > 0;
              const Icon = item.icon;
              return (
                <div key={item.id} className="relative group">
                  <button
                    onClick={() => setExpandedMenu(expandedMenu === item.id ? null : item.id)}
                    className="flex items-center gap-2 px-5 py-4 text-sm font-medium text-gray-700 hover:text-[#051A53] hover:bg-gray-50 whitespace-nowrap transition-colors"
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                    {hasSubmenu && <ChevronDown className={`w-4 h-4 transition-transform ${expandedMenu === item.id ? 'rotate-180' : ''}`} />}
                  </button>

                  {/* Dropdown */}
                  {hasSubmenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute left-0 mt-0 w-48 bg-white border border-gray-200 shadow-lg z-50"
                    >
                      {item.submenu.map(sub => (
                        <Link
                          key={sub.id}
                          to={sub.path}
                          className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#051A53] border-b border-gray-100 last:border-0 transition-colors"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tabbed deep-dive */}
      <section className="bg-muted/40 border-y border-border py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {location.pathname === '/about' || location.pathname === '/about/executive-summary' ? (
            <>
              <div className="flex border-b border-border mb-10 gap-1">
                {tabs.map(t => (
                  <button key={t.id} onClick={() => setActiveTab(t.id)}
                    className={`px-6 py-3 text-sm font-semibold transition-all duration-200 border-b-2 -mb-px ${activeTab === t.id ? 'border-[#051A53] text-[#051A53]' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                    {t.label}
                  </button>
                ))}
              </div>
              <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
                {tabContent[activeTab]}
              </motion.div>
            </>
          ) : null}
        </div>
      </section>

      {/* CTA links */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 flex flex-wrap gap-4 justify-center">
        <Link to="/leadership" className="px-6 py-3 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90 transition-all duration-300 inline-flex items-center gap-2 group">
          Meet Our Leadership <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
        <Link to="/history" className="px-6 py-3 border-2 border-[#051A53] text-[#051A53] text-sm font-medium hover:bg-[#051A53] hover:text-white transition-all duration-300 inline-flex items-center gap-2 group">
          Explore Our History <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </section>
    </div>
  );
}