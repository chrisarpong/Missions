import React from 'react';
import { motion } from 'framer-motion';

export default function PageHeader({ title, subtitle }) {
  return (
    <section className="bg-[#051A53] text-white py-16 sm:py-24 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1600&q=80')] bg-cover bg-center" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#051A53]/90 to-[#051A53]" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 font-serif">{title}</h1>
          {subtitle && (
            <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
      </div>
    </section>
  );
}
