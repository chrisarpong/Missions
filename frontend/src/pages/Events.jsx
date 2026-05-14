import React, { useState, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Calendar, MapPin, Clock } from 'lucide-react';
import PageHeader from '@/components/ui/PageHeader';

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.DiploEvent.list()
      .then(data => {
        // Only show upcoming events
        const upcoming = data.filter(e => e.status !== 'Past' && e.status !== 'Archived');
        setEvents(upcoming);
      })
      .catch(err => console.error("Failed to load events", err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="bg-gray-50 min-h-screen pb-20">
      <PageHeader 
        title="Upcoming Events" 
        subtitle="Join us at our upcoming official engagements and community gatherings." 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-10">
        <div className="bg-white rounded-xl shadow-sm p-8 border border-gray-100 min-h-[400px]">
          
          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-10 h-10 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" />
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-20">
              <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-800">No upcoming events</h3>
              <p className="text-gray-500 mt-2 max-w-md mx-auto">Please check back later for updates on our official schedule and community gatherings.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.map(event => (
                <div key={event.id} className="border border-gray-100 rounded-xl overflow-hidden hover:shadow-md transition-shadow bg-white flex flex-col group">
                  {event.poster_url ? (
                    <div className="h-48 overflow-hidden bg-gray-100">
                      <img src={event.poster_url} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    </div>
                  ) : (
                    <div className="h-48 bg-[#051A53]/5 flex items-center justify-center">
                      <Calendar className="w-12 h-12 text-[#051A53]/20" />
                    </div>
                  )}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#051A53] tracking-wide uppercase mb-3">
                      <span>{event.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-6 line-clamp-3 flex-1">{event.description}</p>
                    
                    <div className="space-y-2 mt-auto pt-4 border-t border-gray-50">
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <Calendar className="w-4 h-4 text-[#C19853]" />
                        <span>{new Date(event.date).toLocaleDateString('en-US', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                      </div>
                      {event.time && (
                        <div className="flex items-center gap-3 text-sm text-gray-500">
                          <Clock className="w-4 h-4 text-[#C19853]" />
                          <span>{event.time}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 text-sm text-gray-500">
                        <MapPin className="w-4 h-4 text-[#C19853] shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
