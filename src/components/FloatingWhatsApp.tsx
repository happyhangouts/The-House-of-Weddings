import React from 'react';
import { CONTACT_INFO } from '../config/contact';
import { trackWhatsAppClick } from '../utils/analytics';

export const FloatingWhatsApp: React.FC = () => {
  return (
    <div className="fixed bottom-20 md:bottom-8 right-5 z-50 flex items-center">
      {/* Direct WhatsApp Instant Action */}
      <a
        href={CONTACT_INFO.whatsapp.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Direct WhatsApp Chat"
        onClick={() => trackWhatsAppClick('floating_button')}
        className="group relative flex items-center justify-center w-13 h-13 rounded-full bg-[#1d201b] text-[#25D366] hover:text-white hover:bg-[#25D366] border-2 border-[#a8844a] shadow-[0_8px_25px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 active:scale-95"
        title={`Chat on WhatsApp (${CONTACT_INFO.whatsapp.display})`}
      >
        <svg className="w-6 h-6 fill-current transition-transform group-hover:scale-110" viewBox="0 0 24 24">
          <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.177 8.177 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.26-4.43c0-4.54 3.69-8.24 8.24-8.24zM8.53 7.33c-.2 0-.44.02-.65.23-.26.26-.98.96-.98 2.34 0 1.38 1.01 2.72 1.15 2.91.14.19 1.95 3.05 4.77 4.24 2.34.99 2.82.79 3.32.75.51-.05 1.65-.67 1.88-1.33.24-.65.24-1.21.17-1.33-.07-.12-.26-.19-.55-.33s-1.69-.83-1.95-.93c-.26-.09-.45-.14-.64.14-.19.28-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01z"/>
        </svg>

        {/* Luxury gold pulse dot */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#a8844a] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#a8844a]"></span>
        </span>
      </a>
    </div>
  );
};
