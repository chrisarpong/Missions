import React from 'react';
import { motion } from 'framer-motion';

const objectives = [
  {
    title: 'Good Neighbourliness',
    desc: 'Fostering peaceful, cooperative relations with neighbouring countries, advancing regional stability and economic integration.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  },
  {
    title: 'Promoting Regional Integration',
    desc: 'Strengthening ECOWAS and AU frameworks, promoting trade, mobility, and collective security across West Africa.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  },
  {
    title: 'International Peace and Security',
    desc: 'Contributing to global peacekeeping, supporting multilateral conflict resolution, and championing international humanitarian law.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  },
  {
    title: 'Support for the African Union',
    desc: 'Actively participating in AU mechanisms and initiatives to strengthen Pan-African unity and collective action.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  },
  {
    title: 'Promoting and Sustaining Demography and Stability for National Development',
    desc: 'Using demographic data and analysis to inform strategic policy decisions that promote stability and sustainable growth.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  },
  {
    title: 'Championing Ghana\'s Agenda on Social Issues',
    desc: 'Leading advocacy on human rights, gender equality, education, health, and climate action in international forums.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  },
  {
    title: 'Participation in Global and Regional Organisations',
    desc: 'Active engagement in the UN, AU, ECOWAS, Commonwealth, and other multilateral bodies to advance Ghana\'s interests.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  },
  {
    title: 'Promoting Foreigners under Conventions for Bilateral Consultations (PCA)',
    desc: 'Establishing and maintaining formal bilateral consultation mechanisms with key partner nations.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  },
  {
    title: 'Promoting Diaspora Engagement',
    desc: 'Strengthening ties with Ghanaians abroad, facilitating remittances, investment, and cultural connections.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  },
  {
    title: 'Sustainable Development (Protecting the Welfare of Ghanaian Citizens)',
    desc: 'Advancing SDG commitments and ensuring policies support prosperity, health, education, and environmental protection.',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&q=80'
  }
];

export default function ForeignPolicyObjectives() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Foreign Policy</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Foreign Policy Objectives</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {objectives.map((obj, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border border-gray-200 bg-white overflow-hidden hover:shadow-lg transition-shadow">
              <div className="h-48 overflow-hidden bg-gray-100">
                <img src={obj.image} alt={obj.title} className="w-full h-full object-cover" />
              </div>
              <div className="p-5">
                <h3 className="font-bold text-gray-900 text-base leading-snug mb-2">{obj.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{obj.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}