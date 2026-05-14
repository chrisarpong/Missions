import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Info, Megaphone, AlertCircle } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const STYLE_CONFIG = {
  Info: { bg: 'bg-white', accent: '#2563EB', icon: Info, border: 'border-blue-400' },
  Alert: { bg: 'bg-white', accent: '#D97706', icon: AlertTriangle, border: 'border-orange-400' },
  Announcement: { bg: 'bg-[#051A53]', accent: '#F59E0B', icon: Megaphone, border: 'border-yellow-400', dark: true },
  Emergency: { bg: 'bg-red-700', accent: '#FFF', icon: AlertCircle, border: 'border-red-300', dark: true },
};

export default function SitePopupDisplay() {
  const [popup, setPopup] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    base44.entities.SitePopup.filter({ active: true }).then(popups => {
      if (!popups || popups.length === 0) return;
      const active = popups[0];

      // Check expiry
      if (active.expires_date && new Date(active.expires_date) < new Date()) return;

      // Check show_once
      const seenKey = `popup_seen_${active.id}`;
      if (active.show_once && sessionStorage.getItem(seenKey)) return;

      setPopup(active);
      const delay = (active.delay_seconds || 0) * 1000;
      setTimeout(() => setVisible(true), delay);
    }).catch(() => {});
  }, []);

  const dismiss = () => {
    if (popup?.show_once) sessionStorage.setItem(`popup_seen_${popup.id}`, '1');
    setVisible(false);
  };

  if (!popup) return null;

  const config = STYLE_CONFIG[popup.style] || STYLE_CONFIG.Announcement;
  const IconComponent = config.icon;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            className={`relative w-full max-w-md border-l-4 shadow-2xl overflow-hidden ${config.bg} ${config.border}`}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Top accent bar */}
            <div className="h-1 w-full" style={{ backgroundColor: config.accent }} />

            {popup.image_url && (
              <img src={popup.image_url} alt="" className="w-full h-44 object-cover" />
            )}

            <div className="p-6">
              <div className="flex items-start gap-3 mb-3">
                <div className="w-9 h-9 flex items-center justify-center shrink-0" style={{ backgroundColor: `${config.accent}20` }}>
                  <IconComponent className="w-5 h-5" style={{ color: config.accent }} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-bold text-lg leading-tight ${config.dark ? 'text-white' : 'text-gray-900'}`}>{popup.title}</h3>
                </div>
                <button onClick={dismiss} className={`p-1 hover:opacity-70 transition-opacity ${config.dark ? 'text-white/60' : 'text-gray-400'}`}>
                  <X className="w-5 h-5" />
                </button>
              </div>
              <p className={`text-sm leading-relaxed ${config.dark ? 'text-white/80' : 'text-gray-600'}`}>{popup.message}</p>

              {popup.cta_text && (
                <div className="mt-5 flex gap-3">
                  <a href={popup.cta_url || '#'} onClick={dismiss}
                    className="px-5 py-2.5 text-sm font-semibold transition-all"
                    style={{ backgroundColor: config.accent, color: config.dark ? '#051A53' : '#fff' }}>
                    {popup.cta_text}
                  </a>
                  <button onClick={dismiss}
                    className={`px-4 py-2.5 text-sm border transition-all ${config.dark ? 'border-white/30 text-white/70 hover:border-white/60' : 'border-gray-200 text-gray-500 hover:bg-gray-50'}`}>
                    Dismiss
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}