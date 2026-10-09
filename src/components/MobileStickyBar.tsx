import React, { useState, useEffect } from 'react';
import { CONTACT_INFO } from '../config/contact';

interface MobileStickyBarProps {
  onPlanClick: () => void;
  onOpenBrochure?: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onPlanClick, onOpenBrochure }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const enquiryEl = document.getElementById('enquiry');
      if (enquiryEl) {
        const rect = enquiryEl.getBoundingClientRect();
        const isEnquiryInView = rect.top < window.innerHeight * 0.7 && rect.bottom > 150;
        setVisible(window.scrollY > 300 && !isEnquiryInView);
      } else {
        setVisible(window.scrollY > 300);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#032B24]/95 backdrop-blur-md border-t border-[#758361]/40 safe-area-bottom shadow-lg flex flex-col transition-transform duration-300">
      {/* Complimentary Recce Teaser */}
      <div className="bg-[#02201A] border-b border-[#758361]/25 py-1 px-3 text-center flex items-center justify-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-[#758361] animate-pulse" />
        <span className="text-[10px] font-sans uppercase tracking-[0.14em] text-[#758361] font-medium">
          Free Luxury Car for Venue Visits Included
        </span>
      </div>

      <div className="px-3.5 py-2 flex items-center gap-2">
        {/* Direct WhatsApp Quick Chat */}
        <a
          href={CONTACT_INFO.whatsapp.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Direct WhatsApp Chat"
          className="flex items-center justify-center gap-1 px-2.5 py-2.5 bg-[#02231D] text-[#758361] hover:text-white hover:bg-[#758361] border border-[#758361]/50 text-[10px] font-sans font-medium uppercase tracking-wider shrink-0 transition-colors"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.177 8.177 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.26-4.43c0-4.54 3.69-8.24 8.24-8.24zM8.53 7.33c-.2 0-.44.02-.65.23-.26.26-.98.96-.98 2.34 0 1.38 1.01 2.72 1.15 2.91.14.19 1.95 3.05 4.77 4.24 2.34.99 2.82.79 3.32.75.51-.05 1.65-.67 1.88-1.33.24-.65.24-1.21.17-1.33-.07-.12-.26-.19-.55-.33s-1.69-.83-1.95-.93c-.26-.09-.45-.14-.64.14-.19.28-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01z"/>
          </svg>
          <span className="hidden min-[360px]:inline">Chat</span>
        </a>

        {/* Brochure Download Button */}
        {onOpenBrochure && (
          <button
            onClick={onOpenBrochure}
            type="button"
            className="flex items-center justify-center gap-1 px-2.5 py-2.5 bg-[#02231D] text-[#758361] hover:text-white hover:bg-[#758361] border border-[#758361]/50 text-[10px] font-sans font-medium uppercase tracking-wider shrink-0 cursor-pointer transition-colors"
          >
            <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span>Brochure</span>
          </button>
        )}

        {/* Plan Your Wedding CTA */}
        <button
          onClick={onPlanClick}
          type="button"
          className="flex-1 py-2.5 text-center text-xs font-sans tracking-[0.14em] uppercase font-semibold text-white bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] hover:brightness-110 shadow-sm border border-[#758361] cursor-pointer"
        >
          Book Free Call
        </button>
      </div>
    </div>
  );
};
