import React, { useState } from 'react';
import { Link, useLocation, Route, Routes } from 'react-router-dom';
import { Newspaper, Radio, Monitor, AlertCircle, BarChart2, Menu, ChevronRight, Settings, Users, CheckSquare, MessageSquare, Image } from 'lucide-react';
import CRMDashboard from './CRMDashboard';
import CRMNews from './CRMNews';
import CRMPopups from './CRMPopups';
import CRMHeroSlides from './CRMHeroSlides';
import CRMEvents from './CRMEvents';
import CRMContacts from './CRMContacts';
import CRMTasks from './CRMTasks';
import CRMInteractions from './CRMInteractions';
import CRMMedia from './CRMMedia';

const navItems = [
  { label: 'Dashboard', path: '/crm', icon: BarChart2 },
  { label: 'Media Library', path: '/crm/media', icon: Image },
  { label: 'News & Press', path: '/crm/news', icon: Newspaper },
  { label: 'Hero Slides', path: '/crm/hero', icon: Monitor },
  { label: 'Popups', path: '/crm/popups', icon: AlertCircle },
  { label: 'Events', path: '/crm/events', icon: Radio },
  { label: 'Contacts', path: '/crm/contacts', icon: Users },
  { label: 'Tasks', path: '/crm/tasks', icon: CheckSquare },
  { label: 'Interactions', path: '/crm/interactions', icon: MessageSquare },
];

export default function CRMLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#051A53] text-white flex flex-col transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:relative lg:translate-x-0`}>
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-yellow-400 flex items-center justify-center shrink-0">
              <Settings className="w-4 h-4 text-[#051A53]" />
            </div>
            <div>
              <p className="font-bold text-sm leading-tight">Website CMS</p>
              <p className="text-white/40 text-xs">Ministry of Foreign Affairs</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {navItems.map(({ label, path, icon: Icon }) => {
            const active = path === '/crm' ? location.pathname === '/crm' : location.pathname.startsWith(path);
            return (
              <Link key={path} to={path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 text-sm font-medium transition-all duration-150 ${active ? 'bg-white/15 text-white' : 'text-white/60 hover:bg-white/8 hover:text-white'}`}>
                <Icon className="w-4 h-4 shrink-0" />
                {label}
                {active && <ChevronRight className="w-3 h-3 ml-auto text-yellow-400" />}
              </Link>
            );
          })}
        </nav>

        <div className="px-3 py-4 border-t border-white/10">
          <Link to="/" className="flex items-center gap-2 px-3 py-2 text-xs text-white/40 hover:text-white transition-colors">
            ← Back to main site
          </Link>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-4 flex items-center gap-4 shrink-0">
          <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-gray-700">
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="font-bold text-gray-800 text-base">
            {navItems.find(n => n.path === '/crm' ? location.pathname === '/crm' : location.pathname.startsWith(n.path))?.label || 'CMS'}
          </h1>
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <Routes>
            <Route index element={<CRMDashboard />} />
            <Route path="news" element={<CRMNews />} />
            <Route path="popups" element={<CRMPopups />} />
            <Route path="hero" element={<CRMHeroSlides />} />
            <Route path="events" element={<CRMEvents />} />
            <Route path="media" element={<CRMMedia />} />
            <Route path="contacts" element={<CRMContacts />} />
            <Route path="tasks" element={<CRMTasks />} />
            <Route path="interactions" element={<CRMInteractions />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}