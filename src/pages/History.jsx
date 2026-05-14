import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const timeline = [
  {
    year: '1957',
    era: 'Independence',
    color: '#DC2626',
    title: 'Ghana Gains Independence',
    desc: 'On 6th March 1957, Ghana becomes the first sub-Saharan African country to gain independence from colonial rule. The Ministry of Foreign Affairs is established to manage the new nation\'s diplomatic relations. Kwame Nkrumah articulates a pan-African foreign policy vision that will shape Ghana\'s diplomacy for decades.',
    image: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=800&q=80',
  },
  {
    year: '1963',
    era: 'Pan-Africanism',
    color: '#D97706',
    title: 'OAU Founded in Addis Ababa',
    desc: 'Ghana plays a pivotal role in the founding of the Organisation of African Unity (OAU) in Addis Ababa. Nkrumah\'s vision of African unity becomes foundational to Ghana\'s foreign policy identity. The Ministry establishes missions across newly independent African states.',
    image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=800&q=80',
  },
  {
    year: '1975',
    era: 'Regional Integration',
    color: '#16A34A',
    title: 'ECOWAS Established',
    desc: 'Ghana is a founding member of the Economic Community of West African States (ECOWAS), signed in Lagos. The Ministry takes on new responsibilities in regional economic diplomacy, coordinating Ghana\'s engagement across West Africa\'s emerging common market.',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80',
  },
  {
    year: '1992',
    era: 'Democracy',
    color: '#2563EB',
    title: 'Return to Democratic Governance',
    desc: 'Ghana\'s Fourth Republic is inaugurated under the 1992 Constitution. The Ministry is repositioned within a democratic framework with renewed emphasis on human rights diplomacy, economic partnership, and the rule of international law.',
    image: 'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&q=80',
  },
  {
    year: '2000',
    era: 'Peacekeeping',
    color: '#7C3AED',
    title: 'Ghana Leads UN Peacekeeping',
    desc: 'Ghana cements its reputation as one of the world\'s leading troop-contributing countries to UN peacekeeping operations. The Ministry of Foreign Affairs coordinates Ghana\'s participation in missions across Liberia, Sierra Leone, Lebanon, and Sudan.',
    image: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=800&q=80',
  },
  {
    year: '2008',
    era: 'Democratic Beacon',
    color: '#0891B2',
    title: 'Model of African Democracy',
    desc: 'Ghana\'s peaceful electoral transfer of power captures global admiration. The Ministry leverages this democratic brand equity to deepen bilateral ties with Western partners, attract investment, and position Ghana as a model for African governance.',
    image: 'https://images.unsplash.com/photo-1585378046029-94f3e96a706c?w=800&q=80',
  },
  {
    year: '2017',
    era: 'Economic Diplomacy',
    color: '#DB2777',
    title: 'Year of Return & Economic Diplomacy',
    desc: 'The Ministry spearheads a new era of economic diplomacy, launching the Year of Return initiative (2019) that brought over 1.5 million visitors to Ghana and generated hundreds of millions in revenue, reshaping diaspora engagement.',
    image: 'https://images.unsplash.com/photo-1617870952348-7524edfb61b7?w=800&q=80',
  },
  {
    year: '2024',
    era: 'Reparatory Justice',
    color: '#051A53',
    title: 'UN Resolution on Reparatory Justice',
    desc: 'Ghana leads a landmark UN General Assembly resolution declaring the Trafficking of Enslaved Africans and Reparatory Justice as a matter of global importance. The Ministry\'s advocacy secures historic multilateral recognition on the continent\'s behalf.',
    image: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=800&q=80',
  },
];

function TimelineItem({ item, index }) {
  const [hovered, setHovered] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <div className={`flex items-start gap-0 ${isLeft ? 'flex-row' : 'flex-row-reverse'} mb-2`}>
      {/* Content */}
      <motion.div
        className={`w-5/12 ${isLeft ? 'text-right pr-10' : 'text-left pl-10'}`}
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
      >
        <div className={`bg-card border border-border p-6 hover:shadow-xl transition-all duration-300 cursor-pointer group relative overflow-hidden`}
          style={{ borderTopColor: hovered ? item.color : undefined, borderTopWidth: hovered ? '3px' : undefined }}>
          <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-300"
            style={{ backgroundColor: item.color }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: item.color }}>{item.era}</span>
          <h3 className="font-bold text-foreground text-lg mt-1 mb-3 leading-tight">{item.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
        </div>
      </motion.div>

      {/* Center spine */}
      <div className="w-2/12 flex flex-col items-center relative">
        <motion.div
          className="w-12 h-12 flex items-center justify-center text-white text-xs font-bold z-10 shrink-0"
          style={{ backgroundColor: item.color }}
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          {item.year.slice(2)}
        </motion.div>
      </div>

      {/* Image */}
      <motion.div
        className="w-5/12"
        initial={{ opacity: 0, x: isLeft ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
      >
        <div className="overflow-hidden h-40">
          <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
        </div>
        <div className="mt-2 px-1">
          <span className="text-3xl font-black" style={{ color: item.color }}>{item.year}</span>
        </div>
      </motion.div>
    </div>
  );
}

export default function History() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ['start end', 'end start'] });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <section className="relative bg-[#051A53] text-white py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20"
          style={{ backgroundImage: `url('https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=1600&q=80')`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
        <div className="absolute inset-0 bg-[#051A53]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-px bg-yellow-400" />
              <span className="text-yellow-400 text-xs font-semibold uppercase tracking-widest">Our Story</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black leading-none mb-6">
              67 Years of<br />
              <span className="text-yellow-400">Diplomacy</span>
            </h1>
            <p className="text-white/60 text-lg max-w-xl leading-relaxed">
              From the fires of independence to the halls of the United Nations — trace the remarkable journey of Ghana's foreign policy from 1957 to today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Intro */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          className="text-xl text-muted-foreground leading-relaxed">
          Ghana's diplomatic heritage is inseparable from the story of African independence. Scroll through the defining moments that have shaped our foreign policy across seven decades.
        </motion.p>
      </section>

      {/* Timeline */}
      <section ref={containerRef} className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
        {/* Vertical line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-1/2">
          <motion.div className="w-full bg-[#051A53] origin-top" style={{ height: lineHeight }} />
        </div>

        <div className="space-y-16">
          {timeline.map((item, i) => (
            <TimelineItem key={item.year} item={item} index={i} />
          ))}
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#051A53] text-white py-20 mt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Be Part of the Next Chapter</h2>
            <p className="text-white/60 mb-8 text-lg">Ghana's diplomatic story continues. Explore career opportunities in the Foreign Service.</p>
            <button className="px-8 py-3 border-2 border-white text-white text-sm font-medium hover:bg-white hover:text-[#051A53] transition-all duration-300 inline-flex items-center gap-2 group">
              Explore Careers <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}