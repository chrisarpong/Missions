import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Calendar } from 'lucide-react';

const MOCK_SLIDES = [
  {
    date: 'March 26, 2026',
    title: 'History Made at the United Nations',
    description: 'The United Nations General Assembly has adopted resolution A/RES/81, declaring the Trafficking of Enslaved Africans and Reparatory Justice Movement as the Greatest Ci...',
    image: 'https://media.base44.com/images/public/69f9dccd37db37f01bbbc815/8e771d8f4_generated_8da19969.png',
  },
  {
    date: 'March 15, 2026',
    title: 'Ghana Strengthens Bilateral Ties with Colombia',
    description: 'A historic diplomatic agreement was signed between Ghana and Colombia, opening new avenues for trade, cultural exchange, and mutual cooperation between the two nations.',
    image: 'https://media.base44.com/images/public/69f9dccd37db37f01bbbc815/f6e3faa56_generated_7f8f2df7.png',
  },
  {
    date: 'February 28, 2026',
    title: 'Diplomatic Summit on African Trade',
    description: 'Ghana hosted a landmark summit bringing together African nations to discuss the future of intra-continental trade and the implementation of the AfCFTA agreement.',
    image: 'https://media.base44.com/images/public/69f9dccd37db37f01bbbc815/fa12efd2f_generated_6e29a002.png',
  },
];

export default function HeroSection() {
  const [slides, setSlides] = useState(MOCK_SLIDES);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  const slide = slides[current];

  return (
    <section className="relative h-[70vh] min-h-[500px] max-h-[700px] overflow-hidden bg-primary">
      {/* Background images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <img
            src={slide.image}
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/30" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
        <div className="max-w-2xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-px bg-accent" />
                <span className="text-accent text-xs font-medium uppercase tracking-widest flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {slide.date}
                </span>
              </div>
              <h1 className="font-heading text-primary-foreground text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">
                Welcome to the High Commission of Ghana in Ottawa, Canada
              </h1>
              <h2 className="font-heading text-primary-foreground text-xl sm:text-2xl font-semibold leading-tight mb-4">
                {slide.title}
              </h2>
              <p className="text-primary-foreground/70 text-base sm:text-lg leading-relaxed mb-8 max-w-lg">
                {slide.description}
              </p>
              <button
                className="px-6 py-2.5 border-2 border-white text-white text-sm font-medium hover:bg-white hover:text-[#051A53] transition-all duration-300 inline-flex items-center gap-2 group"
              >
                Learn More
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          </AnimatePresence>
          <div className="mt-8 inline-block bg-black/35 border border-white/20 px-4 py-3 backdrop-blur-sm">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent">Consular Contact</p>
            <p className="text-sm text-primary-foreground/90 mt-1">+1 613-236-0871</p>
            <p className="text-sm text-primary-foreground/90">ottawaconsular@ghanahighcommission.ca</p>
          </div>
        </div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              i === current ? 'w-10 bg-accent' : 'w-4 bg-primary-foreground/30 hover:bg-primary-foreground/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
