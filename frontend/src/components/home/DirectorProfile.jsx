import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Newspaper, TrendingUp, Globe } from 'lucide-react';

const quickLinks = [
  { icon: Shield, label: 'Consular Services', desc: 'Passport, visa & citizen assistance' },
  { icon: Newspaper, label: 'Press & Media', desc: 'Official statements & releases' },
  { icon: TrendingUp, label: 'Invest in Ghana', desc: 'Business & trade opportunities' },
  { icon: Globe, label: 'Country Information', desc: 'Travel advisories & guides' },
];

export default function DirectorProfile() {
  return (
    <section className="bg-background">
      {/* Mission statement */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <span className="text-accent text-xs font-semibold uppercase tracking-widest">Our Mission Leadership</span>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3 leading-tight">
              Serving Ghanaians and strengthening Ghana-Canada relations
            </h2>
          </div>
          <div className="space-y-4">
            <p className="text-muted-foreground leading-relaxed">
              The High Commission of Ghana in Canada advances Ghana's diplomatic priorities, protects the interests of Ghanaian citizens, and deepens bilateral cooperation with Canada.
            </p>
            <button className="px-5 py-2.5 border-2 border-[#051A53] text-[#051A53] text-sm font-medium hover:bg-[#051A53] hover:text-white transition-all duration-300 inline-flex items-center gap-2 group">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Leadership cards */}
        <div className="grid md:grid-cols-2 gap-5 mb-10">
          <div className="bg-card border border-border p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-2">High Commissioner</p>
            <h3 className="font-heading text-xl font-semibold text-foreground">H.E. Prof. Dora Francisca Edu-Buandoh</h3>
            <p className="text-sm text-muted-foreground mt-1">High Commissioner to Canada</p>
          </div>
          <div className="bg-card border border-border p-6">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-accent mb-2">Minister for Foreign Affairs</p>
            <h3 className="font-heading text-xl font-semibold text-foreground">Hon. Samuel Okudzeto Ablakwa (MP)</h3>
            <p className="text-sm text-muted-foreground mt-1">Republic of Ghana</p>
          </div>
        </div>

        {/* Quick access cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {quickLinks.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="group bg-card border border-border p-6 hover:shadow-lg hover:border-accent/30 transition-all duration-300 cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary/5 flex items-center justify-center mb-4 group-hover:bg-accent/10 transition-colors">
                <item.icon className="w-5 h-5 text-primary group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-heading font-semibold text-foreground mb-1">{item.label}</h3>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
