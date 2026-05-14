import React, { useEffect, useState } from 'react';
import { base44 } from '@/api/base44Client';
import { Newspaper, AlertCircle, Monitor, Radio, TrendingUp, Eye, Clock, Users, CheckSquare, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function CRMDashboard() {
  const [news, setNews] = useState([]);
  const [popups, setPopups] = useState([]);
  const [slides, setSlides] = useState([]);
  const [events, setEvents] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [interactions, setInteractions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      base44.entities.NewsArticle.list('-published_date', 50),
      base44.entities.SitePopup.list(),
      base44.entities.HeroSlide.list(),
      base44.entities.DiploEvent.list(),
      base44.entities.Contact.list(),
      base44.entities.DiploTask.list(),
      base44.entities.Interaction.list(),
    ]).then(([n, p, s, e, c, t, i]) => {
      setNews(n); 
      setPopups(p); 
      setSlides(s); 
      setEvents(e);
      setContacts(c);
      setTasks(t);
      setInteractions(i);
      setLoading(false);
    });
  }, []);

  if (loading) return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-4 border-gray-200 border-t-[#051A53] rounded-full animate-spin" />
    </div>
  );

  const publishedNews = news.filter(n => n.status === 'Published');
  const draftNews = news.filter(n => n.status === 'Draft');
  const activePopups = popups.filter(p => p.active);
  const activeSlides = slides.filter(s => s.active);

  const stats = [
    { label: 'Published Articles', value: publishedNews.length, icon: Newspaper, color: '#051A53', link: '/crm/news', sub: `${draftNews.length} drafts` },
    { label: 'Active Popups', value: activePopups.length, icon: AlertCircle, color: '#DC2626', link: '/crm/popups', sub: `${popups.length} total` },
    { label: 'Hero Slides', value: activeSlides.length, icon: Monitor, color: '#D97706', link: '/crm/hero', sub: 'live on homepage' },
    { label: 'Events', value: events.length, icon: Radio, color: '#7C3AED', link: '/crm/events', sub: 'scheduled' },
  ];

  return (
    <div className="space-y-6">
      {/* Quick notice if no active popups */}
      {activePopups.length === 0 && (
        <div className="flex items-center gap-3 bg-blue-50 border border-blue-200 px-4 py-3 text-sm text-blue-700">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>No active site popups. <Link to="/crm/popups" className="underline font-medium">Create one</Link> to display announcements to visitors.</span>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, link, sub }) => (
          <Link key={label} to={link} className="bg-white border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 flex items-center justify-center" style={{ backgroundColor: `${color}15` }}>
                <Icon className="w-5 h-5" style={{ color }} />
              </div>
            </div>
            <p className="text-3xl font-black" style={{ color }}>{value}</p>
            <p className="text-xs text-gray-600 font-semibold mt-0.5">{label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
          </Link>
        ))}
      </div>

      {/* Recent articles + active popup status */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent News */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Recent Articles</h3>
            <Link to="/crm/news" className="text-xs text-[#051A53] font-medium hover:underline">Manage all</Link>
          </div>
          <div className="space-y-3">
            {news.slice(0, 6).map(item => (
              <div key={item.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                  <p className="text-xs text-gray-400">{item.category} · {item.published_date || 'No date'}</p>
                </div>
                <span className={`shrink-0 text-xs px-2 py-0.5 font-medium ${
                  item.status === 'Published' ? 'bg-green-100 text-green-700' :
                  item.status === 'Draft' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-gray-100 text-gray-500'
                }`}>{item.status}</span>
              </div>
            ))}
            {news.length === 0 && <p className="text-gray-400 text-sm text-center py-6">No articles yet</p>}
          </div>
        </div>

        {/* Popups status */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Site Popups</h3>
            <Link to="/crm/popups" className="text-xs text-[#051A53] font-medium hover:underline">Manage</Link>
          </div>
          <div className="space-y-3">
            {popups.map(popup => (
              <div key={popup.id} className="flex items-center gap-3 py-2 border-b border-gray-100 last:border-0">
                <div className={`w-2.5 h-2.5 rounded-full shrink-0 ${popup.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{popup.title}</p>
                  <p className="text-xs text-gray-400">{popup.style} · {popup.active ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            ))}
            {popups.length === 0 && (
              <div className="text-center py-6">
                <p className="text-gray-400 text-sm">No popups created yet</p>
                <Link to="/crm/popups" className="text-xs text-[#051A53] underline mt-2 inline-block">Create a popup</Link>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Hero slides preview */}
      <div className="bg-white border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Homepage Hero Slides</h3>
          <Link to="/crm/hero" className="text-xs text-[#051A53] font-medium hover:underline">Manage</Link>
        </div>
        {slides.length > 0 ? (
          <div className="grid sm:grid-cols-3 gap-4">
            {slides.slice(0, 3).map(slide => (
              <div key={slide.id} className="relative border border-gray-200 overflow-hidden">
                {slide.image_url && <img src={slide.image_url} alt={slide.title} className="w-full h-28 object-cover" />}
                {!slide.image_url && <div className="w-full h-28 bg-gray-100 flex items-center justify-center"><Monitor className="w-6 h-6 text-gray-300" /></div>}
                <div className="p-3">
                  <p className="text-xs font-semibold text-gray-800 truncate">{slide.title}</p>
                  <span className={`text-xs ${slide.active ? 'text-green-600' : 'text-gray-400'}`}>{slide.active ? '● Live' : '○ Hidden'}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400 text-sm text-center py-6">No hero slides. <Link to="/crm/hero" className="text-[#051A53] underline">Add slides</Link> to manage the homepage hero.</p>
        )}
      </div>

      {/* Management Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Contacts */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Contacts</h3>
            <Link to="/crm/contacts" className="text-xs text-[#051A53] font-medium hover:underline">Manage</Link>
          </div>
          <div className="text-3xl font-black text-blue-600">{contacts.length}</div>
          <p className="text-xs text-gray-400 mt-1">total contacts</p>
        </div>

        {/* Tasks */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Tasks</h3>
            <Link to="/crm/tasks" className="text-xs text-[#051A53] font-medium hover:underline">Manage</Link>
          </div>
          <div className="text-3xl font-black text-green-600">{tasks.filter(t => t.status !== 'Done').length}</div>
          <p className="text-xs text-gray-400 mt-1">active tasks</p>
        </div>

        {/* Interactions */}
        <div className="bg-white border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Interactions</h3>
            <Link to="/crm/interactions" className="text-xs text-[#051A53] font-medium hover:underline">Manage</Link>
          </div>
          <div className="text-3xl font-black text-purple-600">{interactions.length}</div>
          <p className="text-xs text-gray-400 mt-1">total interactions</p>
        </div>
      </div>
    </div>
  );
}