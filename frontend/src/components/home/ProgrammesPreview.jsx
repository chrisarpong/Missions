import React from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import { Globe2, ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';

function AnimatedCounter({ target }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [target]);

  return <span>{count}</span>;
}

export default function ProgrammesPreview() {
  const [inView, setInView] = useState(false);

  return (
    <section className="relative py-24 bg-background overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02]" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary)) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">Global Representation</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">
            Ghana's Diplomatic Footprint
          </h2>
        </div>

        {/* Missions card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onViewportEnter={() => setInView(true)}
          transition={{ duration: 0.5 }}
          className="max-w-xl mx-auto"
        >
          <div className="bg-card border border-border p-10 text-center shadow-lg relative overflow-hidden">
            {/* Decorative accent line */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-accent rounded-b-full" />

            <Globe2 className="w-10 h-10 text-accent mx-auto mb-4" />
            <h3 className="font-heading text-xl font-bold text-foreground mb-2">
              Ghana Missions Abroad
            </h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md mx-auto">
              Embassies and High Commissions representing Ghana's foreign policy and interests worldwide.
            </p>

            <div className="mb-2">
              <span className="font-heading text-6xl sm:text-7xl font-bold text-primary">
                {inView ? <AnimatedCounter target={72} /> : '0'}
              </span>
            </div>
            <p className="text-muted-foreground text-sm mb-8">Missions & Consulates Abroad</p>

            <button className="px-6 py-2.5 border-2 border-[#051A53] text-[#051A53] text-sm font-medium hover:bg-[#051A53] hover:text-white transition-all duration-300 inline-flex items-center gap-2 group">
              Find Missions
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}