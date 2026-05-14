import React, { useState } from 'react';
import { X } from 'lucide-react';

export default function NotificationBanner({ message, linkText, linkHref, color = 'red', onDismiss }) {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  const bgColor = color === 'red' ? 'bg-red-600' : color === 'blue' ? 'bg-[#051A53]' : 'bg-yellow-500';

  return (
    <div className={`${bgColor} text-white px-4 py-3 fixed top-0 left-0 right-0 z-50`}>
      <div className="max-w-7xl mx-auto flex items-start justify-between gap-4">
        <p className="text-sm leading-snug pr-6">
          <span className="font-bold uppercase">{message}</span>
          {linkText && linkHref && (
            <>
              {' '}
              <a href={linkHref} className="underline font-semibold hover:opacity-80 transition-opacity uppercase text-xs tracking-wide">
                {linkText}
              </a>
            </>
          )}
        </p>
        <button
          onClick={() => { setVisible(false); onDismiss?.(); }}
          className="shrink-0 p-0.5 hover:opacity-70 transition-opacity mt-0.5"
          aria-label="Dismiss notification"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}