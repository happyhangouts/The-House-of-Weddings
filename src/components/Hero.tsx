import React from 'react';
import { HWLogo } from './Logo';
import heroBgImg from '../assets/images/hero_luxury_wedding_venue_1790246590642.jpg';

interface HeroProps {
  onStartClick: () => void;
  onOpenBrochure?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick, onOpenBrochure }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#032B24] text-[#F8F5EE]" id="hero">
      {/* Background Image Container with Royal Palace Visual */}
      <div className="relative min-h-[85vh] sm:min-h-[90vh] py-20 sm:py-32 w-full flex items-center justify-center">
        <img
          src={heroBgImg}
          alt="Luxury wedding palace venue"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.50] sm:brightness-[0.42] contrast-[1.10]"
        />

        {/* Deep Emerald Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#032B24] via-[#032B24]/75 to-[#032B24]/85" />
        <div className="absolute inset-0 bg-[#032B24]/30" />

        {/* Minimalist, Spacious Luxury Content Container */}
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center justify-center">
          
          {/* Subtle Royal Eyebrow */}
          <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 sm:w-10 h-[1px] bg-[#758361]" />
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.28em] uppercase text-[#758361] font-semibold">
              THE HOUSE OF WEDDINGS · BY MUBAARQAAN
            </span>
            <span className="w-6 sm:w-10 h-[1px] bg-[#758361]" />
          </div>

          {/* Brand Monogram */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <HWLogo variant="full" size="xl" />
          </div>

          {/* Iconic Statement Headline */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#F8F5EE] tracking-[0.06em] sm:tracking-[0.08em] uppercase leading-[1.15] mb-5 sm:mb-6 font-normal">
            Be a Guest at Your Own Wedding.
          </h1>

          {/* Minimal 1-Line Subtitle */}
          <p className="font-sans text-sm sm:text-base md:text-lg font-light text-[#F8F5EE]/85 max-w-xl leading-relaxed mb-8 sm:mb-10">
            Bespoke venue curation, guest hospitality, and on-ground coordination across India&apos;s finest destination palaces.
          </p>

          {/* Clean Dual CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md">
            <button
              onClick={onStartClick}
              type="button"
              className="w-full sm:w-auto flex-1 px-8 py-3.5 sm:py-4 text-xs font-sans font-semibold tracking-[0.18em] uppercase text-white bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] hover:brightness-110 hover:shadow-[0_8px_30px_rgba(117,131,97,0.35)] transition-all duration-300 border border-[#758361] cursor-pointer whitespace-nowrap shadow-sm"
            >
              Plan Your Wedding
            </button>

            {onOpenBrochure && (
              <button
                onClick={onOpenBrochure}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 text-xs font-sans font-medium tracking-[0.16em] uppercase text-[#F8F5EE] bg-[#02201A]/80 hover:bg-[#758361]/30 border border-[#758361]/60 hover:border-[#758361] transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Brochure (PDF)</span>
              </button>
            )}
          </div>

          {/* Minimalist Destination Signature */}
          <div className="mt-10 sm:mt-14 pt-6 border-t border-[#758361]/30 text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#758361] flex items-center gap-2 sm:gap-3">
            <span>Jaipur</span>
            <span>·</span>
            <span>Udaipur</span>
            <span>·</span>
            <span>Jodhpur</span>
            <span>·</span>
            <span>Goa</span>
            <span>·</span>
            <span>Worldwide</span>
          </div>

        </div>

        {/* Subtle Bottom Transition */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-gradient-to-t from-[#F8F5EE] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
