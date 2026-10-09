import React, { useState, useEffect } from 'react';
import { HWLogo } from './Logo';
import { CONTACT_INFO } from '../config/contact';

interface HeaderProps {
  onPlanClick: () => void;
  onOpenBrochure?: () => void;
  onOpenLogoUpload?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onPlanClick,
  onOpenBrochure,
  onOpenLogoUpload,
}) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-[#032B24]/95 backdrop-blur-md shadow-[0_4px_20px_rgba(0,0,0,0.35)] py-2.5 sm:py-3 border-b border-[#758361]/35'
          : 'bg-[#032B24] py-3 sm:py-5 border-b border-[#758361]/25'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2">
        {/* Left: HW Monogram Logo with Brand name */}
        <div className="flex items-center shrink-0 min-w-0">
          <a
            href="#top"
            className="group flex items-center focus:outline-none shrink-0"
            aria-label="The House of Weddings by Mubaarqaan"
          >
            <HWLogo variant="horizontal" />
          </a>
        </div>

        {/* Center: Simple, Clear Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-xs font-sans tracking-wider uppercase text-[#F8F5EE]/80">
          <a
            href="#what-we-do"
            className="hover:text-[#758361] transition-colors py-1 relative hover:underline underline-offset-8 decoration-[#758361]"
          >
            What We Do
          </a>
          <a
            href="#brochure"
            onClick={(e) => {
              if (onOpenBrochure) {
                e.preventDefault();
                onOpenBrochure();
              }
            }}
            className="text-[#758361] hover:text-white transition-colors py-1 relative flex items-center gap-1.5 font-medium cursor-pointer"
          >
            <span>Brochure</span>
            <span className="px-1.5 py-0.5 text-[8.5px] bg-[#758361] text-white font-bold tracking-widest uppercase">
              PDF
            </span>
          </a>
          <a
            href="#benefits"
            className="hover:text-[#758361] transition-colors py-1 relative hover:underline underline-offset-8 decoration-[#758361]"
          >
            How We Help
          </a>
          <a
            href="#client-stories"
            className="hover:text-[#758361] transition-colors py-1 relative hover:underline underline-offset-8 decoration-[#758361]"
          >
            Real Stories
          </a>
          <a
            href="#calculator"
            className="hover:text-[#758361] transition-colors py-1 relative hover:underline underline-offset-8 decoration-[#758361]"
          >
            Cost Calculator
          </a>
          <a
            href="#faq"
            className="hover:text-[#758361] transition-colors py-1 relative hover:underline underline-offset-8 decoration-[#758361]"
          >
            FAQ
          </a>
        </nav>

        {/* Right: Direct WhatsApp & Call to Action & Upload Logo */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {onOpenLogoUpload && (
            <button
              onClick={onOpenLogoUpload}
              type="button"
              title="Upload custom logo file"
              className="p-1.5 sm:px-2.5 sm:py-2 text-[10px] sm:text-[11px] font-sans uppercase tracking-wider text-[#758361] hover:text-white hover:bg-[#758361] transition-colors border border-[#758361]/50 hover:border-[#758361] flex items-center gap-1 cursor-pointer shrink-0"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
              </svg>
              <span className="hidden sm:inline">Upload Logo</span>
            </button>
          )}

          <a
            href={CONTACT_INFO.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            title={`Chat on WhatsApp (${CONTACT_INFO.whatsapp.display})`}
            aria-label="Chat on WhatsApp"
            className="p-1.5 sm:px-3 sm:py-2 text-[#758361] hover:text-white hover:bg-[#758361] transition-colors border border-[#758361]/40 hover:border-[#758361] flex items-center gap-1.5 text-xs font-sans uppercase tracking-wider shrink-0"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.177 8.177 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.26-4.43c0-4.54 3.69-8.24 8.24-8.24zM8.53 7.33c-.2 0-.44.02-.65.23-.26.26-.98.96-.98 2.34 0 1.38 1.01 2.72 1.15 2.91.14.19 1.95 3.05 4.77 4.24 2.34.99 2.82.79 3.32.75.51-.05 1.65-.67 1.88-1.33.24-.65.24-1.21.17-1.33-.07-.12-.26-.19-.55-.33s-1.69-.83-1.95-.93c-.26-.09-.45-.14-.64.14-.19.28-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01z"/>
            </svg>
            <span className="hidden sm:inline font-medium">WhatsApp</span>
          </a>

          <button
            onClick={onPlanClick}
            type="button"
            className="px-2.5 sm:px-5 py-1.5 sm:py-2 text-[10px] sm:text-xs font-sans uppercase tracking-[0.12em] sm:tracking-[0.16em] font-semibold text-white bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] hover:brightness-110 shadow-sm border border-[#758361] transition-all cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="hidden sm:inline">Plan Your Wedding</span>
            <span className="sm:hidden">Plan</span>
          </button>
        </div>
      </div>
    </header>
  );
};
