import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const MOCK_EVENTS = [
  {
    id: 'e1',
    type: 'Cultural',
    title: 'Ghana Independence Day Celebration 2026',
    date: '2026-03-06',
    location: 'Lansdowne Park, Ottawa',
    poster_url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&q=80'
  },
  {
    id: 'e2',
    type: 'Diplomatic',
    title: 'Bilateral Trade Forum: Ghana & Canada',
    date: '2026-04-15',
    location: 'Westin Hotel, Ottawa',
    poster_url: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800&q=80'
  },
  {
    id: 'e3',
    type: 'Community',
    title: 'Consular Outreach Programme - Toronto',
    date: '2026-05-20',
    location: 'Ghanaian Presbyterian Church, Toronto',
    poster_url: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=800&q=80'
  }
];

export default function UpcomingEventsHome() {
  const [events, setEvents] = useState(MOCK_EVENTS);

  return (
    <section className="bg-muted/50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-accent text-xs font-semibold uppercase tracking-widest">Events</span>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold text-foreground mt-3">Upcoming Events</h2>
        </div>

        {/* Events grid or empty state */}
        {events.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {events.map((event, i) => (
              <motion.div key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-card border border-border overflow-hidden hover:shadow-lg transition-shadow">
                {event.poster_url && (
                  <div className="w-full h-48 overflow-hidden bg-gray-100">
                    <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                  </div>
                )}
                <div className="p-5">
                  <p className="text-xs text-accent font-semibold uppercase mb-2">{event.type}</p>
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2">{event.title}</h3>
                  {event.date && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mb-3">
                      <CalendarDays className="w-3.5 h-3.5" /> {event.date}
                    </p>
                  )}
                  {event.location && <p className="text-sm text-muted-foreground mb-4">{event.location}</p>}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto">
            <div className="bg-card border border-border p-10 text-center">
              <div className="w-16 h-16 bg-accent/10 flex items-center justify-center mx-auto mb-5">
                <CalendarDays className="w-7 h-7 text-accent" />
              </div>
              <h3 className="font-heading text-lg font-semibold text-foreground mb-2">No upcoming events yet</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Events will appear here automatically.
              </p>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            to="/news"
            className="px-6 py-2.5 border-2 border-[#051A53] text-[#051A53] text-sm font-medium hover:bg-[#051A53] hover:text-white transition-all duration-300 inline-flex items-center gap-2 group"
          >
            View all events
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}