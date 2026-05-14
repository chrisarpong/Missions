import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Linkedin, Mail, ChevronRight } from 'lucide-react';

const leaders = [
  {
    id: 1,
    name: 'Hon. Samuel Okudzeto Ablakwa',
    title: 'Minister for Foreign Affairs',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80',
    bio: 'The Honourable Minister provides strategic direction for Ghana\'s foreign policy, oversees diplomatic relations with all partner nations, and represents the Republic at international summits and multilateral forums.',
    highlights: ['Former Deputy Minister of Education', 'Member of Parliament, North Tongu', 'Advocate for African integration and reparatory justice'],
    tag: 'Minister',
  },
  {
    id: 2,
    name: 'Hon. Comfort Doyoe Cudjoe-Ghansah',
    title: 'Deputy Minister for Foreign Affairs',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80',
    bio: 'The Deputy Minister supports the Minister in the day-to-day administration of the Ministry, with a special focus on consular services and diaspora engagement.',
    highlights: ['Member of Parliament, Ada', 'Champion for women in diplomacy', 'Lead on diaspora remittance policy'],
    tag: 'Deputy Minister',
  },
  {
    id: 3,
    name: 'Ambassador Amma Twum-Amoah',
    title: 'Chief Director',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80',
    bio: 'The Chief Director is the most senior civil servant in the Ministry, responsible for administrative leadership, policy coordination across directorates, and institutional governance.',
    highlights: ['30+ years in the Foreign Service', 'Former Ambassador to France', 'Expert in multilateral treaty law'],
    tag: 'Civil Service',
  },
  {
    id: 4,
    name: 'Ambassador Kwabena Osei-Danquah',
    title: 'Director, Political Affairs',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&q=80',
    bio: 'Leads the Political Affairs directorate, coordinating bilateral political engagements, country assessments, and diplomatic correspondence with Ghana\'s global missions.',
    highlights: ['Former High Commissioner to Nigeria', 'Expert in West African geopolitics', 'AU Peace & Security Council adviser'],
    tag: 'Directorate',
  },
  {
    id: 5,
    name: 'Madam Efua Asante-Mensah',
    title: 'Director, Consular Affairs',
    image: 'https://images.unsplash.com/photo-1598550874175-4d0ef436c909?w=600&q=80',
    bio: 'Oversees all consular operations including passport issuance, visa processing, and the welfare of Ghanaian nationals in distress abroad.',
    highlights: ['20 years consular experience', 'Spearheaded e-passport rollout', 'Led evacuation of 3,000 Ghanaians from Lebanon (2006)'],
    tag: 'Directorate',
  },
  {
    id: 6,
    name: 'Mr. Kofi Atta-Mensah',
    title: 'Director, Economic Affairs',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80',
    bio: 'Drives the economic diplomacy agenda, supporting Ghanaian businesses in international markets and attracting foreign direct investment through diplomatic channels.',
    highlights: ['MBA, London Business School', 'Co-architect of Ghana\'s FDI policy', 'Adviser to AfCFTA Secretariat'],
    tag: 'Directorate',
  },
];

const tagColors = {
  'Minister': 'bg-[#051A53] text-white',
  'Deputy Minister': 'bg-[#051A53]/80 text-white',
  'Civil Service': 'bg-yellow-600 text-white',
  'Directorate': 'bg-gray-600 text-white',
};

export default function Leadership() {
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState('All');

  const tags = ['All', 'Minister', 'Deputy Minister', 'Civil Service', 'Directorate'];
  const filtered = filter === 'All' ? leaders : leaders.filter(l => l.tag === filter);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, white 0, white 1px, transparent 0, transparent 50%)`, backgroundSize: '20px 20px' }} />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">People</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-bold max-w-2xl leading-tight mb-4">Our Leadership</h1>
            <p className="text-white/60 text-lg max-w-lg">The experienced diplomats and public servants who guide Ghana's foreign policy and international engagement.</p>
          </motion.div>
        </div>
      </section>

      {/* Filter tabs */}
      <div className="border-b border-border bg-card sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-1 overflow-x-auto py-1 no-scrollbar">
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)}
                className={`shrink-0 px-5 py-3 text-sm font-medium transition-all duration-200 border-b-2 -mb-px ${filter === t ? 'border-[#051A53] text-[#051A53]' : 'border-transparent text-muted-foreground hover:text-foreground'}`}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((person, i) => (
              <motion.div key={person.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                className="group bg-card border border-border hover:shadow-2xl transition-all duration-400 cursor-pointer overflow-hidden"
                onClick={() => setSelected(person)}
              >
                {/* Image */}
                <div className="relative h-72 overflow-hidden">
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <span className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold ${tagColors[person.tag]}`}>{person.tag}</span>
                </div>
                {/* Info */}
                <div className="p-6">
                  <h3 className="font-bold text-foreground text-lg leading-tight">{person.name}</h3>
                  <p className="text-sm text-muted-foreground mt-1 mb-4">{person.title}</p>
                  <button className="text-[#051A53] text-sm font-semibold flex items-center gap-1 group-hover:gap-2 transition-all">
                    View Profile <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}>
            <motion.div className="bg-card w-full max-w-2xl overflow-hidden shadow-2xl"
              initial={{ opacity: 0, scale: 0.9, y: 30 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 30 }}
              onClick={e => e.stopPropagation()}>
              <div className="flex">
                <div className="w-48 shrink-0 hidden sm:block">
                  <img src={selected.image} alt={selected.name} className="w-full h-full object-cover object-top" />
                </div>
                <div className="flex-1 p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <span className={`px-2 py-0.5 text-xs font-semibold ${tagColors[selected.tag]}`}>{selected.tag}</span>
                      <h2 className="font-bold text-foreground text-xl mt-2 leading-tight">{selected.name}</h2>
                      <p className="text-sm text-muted-foreground">{selected.title}</p>
                    </div>
                    <button onClick={() => setSelected(null)} className="p-1 hover:bg-muted transition-colors">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">{selected.bio}</p>
                  <ul className="space-y-2">
                    {selected.highlights.map((h, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 shrink-0" />
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}