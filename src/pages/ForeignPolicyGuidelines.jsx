import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function ForeignPolicyGuidelines() {
  const sections = [
    {
      title: 'Constitutional Foundation',
      content: 'Article 40 of Ghana\'s 1992 Constitution provides the broad principles underpinning Ghana\'s foreign policy.',
      principles: [
        'Promotion and protection of the interest of Ghana.',
        'Establishment of a just and equitable international, economic, political and social order.',
        'Promotion of respect for international law and treaty obligations.',
        'Promotion of the settlement of international disputes through peaceful means.',
        'Adherence to the principles enshrined in the Charter and aims or ideals of the United Nations, the African Union, ECOWAS, the Commonwealth, and the Non-Aligned Movement.'
      ]
    },
    {
      title: 'Mandate and Policy Formulation',
      content: 'The Ministry of Foreign Affairs, in concert with Ghana\'s Diplomatic Missions abroad, is responsible for conducting Ghana\'s foreign policy. The Ministry serves as the chief advisor to Government and recommends policy initiatives, options, and responses to domestic and international developments.'
    },
    {
      title: 'National Interest Framework',
      content: 'Policy choices are guided by Ghana\'s national interest, including territorial integrity, peace and stability, and a strong international image. Foreign policy is treated as a strategic instrument that supports national survival, prosperity, and long-term development.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="bg-[#051A53] text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Foreign Policy</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3">Ghana Foreign Policy Guidelines</h1>
          </motion.div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {sections.map((section, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`mb-12 ${i === 0 ? 'bg-gray-50 border border-gray-200 p-8' : 'grid sm:grid-cols-2 gap-8'}`}>
            <div className={i === 0 ? '' : 'bg-gray-50 border border-gray-200 p-6'}>
              <h2 className="text-xl font-bold text-gray-900 mb-3">{section.title}</h2>
              <p className="text-gray-700 text-sm leading-relaxed">{section.content}</p>
            </div>
            {i === 0 && section.principles && (
              <div className="mt-6">
                <h3 className="font-bold text-gray-900 mb-4 text-lg">Core Principles</h3>
                <ul className="space-y-3">
                  {section.principles.map((p, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-gray-700">
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-[#051A53] mt-0.5" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}