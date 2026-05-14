import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Construction } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function ComingSoon() {
  const location = useLocation();
  const title = location.pathname
    .split('/')
    .filter(Boolean)
    .pop()
    ?.replace(/-/g, ' ')
    .replace(/\b\w/g, c => c.toUpperCase()) || 'Page';

  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-background px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-md"
      >
        <div className="w-16 h-16 bg-[#051A53]/10 flex items-center justify-center mx-auto mb-6">
          <Construction className="w-8 h-8 text-[#051A53]" />
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-3">{title}</h1>
        <p className="text-muted-foreground mb-8">This page is currently under construction. Please check back soon.</p>
        <Link to="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#051A53] text-white text-sm font-medium hover:bg-[#051A53]/90 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
      </motion.div>
    </div>
  );
}