import React from 'react';
import { HWLogo } from './Logo';
import heroBgImg from '../assets/images/hero_luxury_wedding_venue_1790246590642.jpg';

interface HeroProps {
  onStartClick: () => void;
  onOpenBrochure?: (type?: 'maison' | 'management') => void;
}

export const Hero: React.FC<HeroProps> = ({ onStartClick, onOpenBrochure }) => {
  return (
    <section className="relative w-full overflow-hidden bg-[#1d201b] text-[#f7f3ea]" id="hero">
      {/* Background Image Container with Royal Palace Visual */}
      <div className="relative min-h-[90vh] py-16 sm:py-24 md:py-32 w-full flex items-center justify-center">
        <img
          src={heroBgImg}
          alt="Luxury wedding palace venue"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.40] contrast-[1.12]"
        />

        {/* Deep Green-Black (#1d201b) Vignette Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1d201b] via-[#1d201b]/75 to-[#1d201b]/85" />
        <div className="absolute inset-0 bg-[#1d201b]/40" />

        {/* The Hero Arch in Champagne (#e6d5b0) */}
        <div className="absolute inset-x-4 sm:inset-x-12 top-6 bottom-8 pointer-events-none flex items-center justify-center">
          <div className="w-full max-w-4xl h-full border border-[#e6d5b0]/30 royal-arch relative">
            {/* Inner Arch Accent Hairline */}
            <div className="absolute inset-2 sm:inset-3 border border-[#e6d5b0]/20 royal-arch" />
            {/* Top Keystone Accent */}
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-8 h-3 bg-[#e6d5b0] border border-[#a8844a]" />
          </div>
        </div>

        {/* Minimalist, Spacious Luxury Content Container */}
        <div className="relative z-10 max-w-3xl mx-auto px-5 sm:px-8 text-center flex flex-col items-center justify-center">
          
          {/* Subtle Royal Eyebrow with Gold Hairlines */}
          <div className="inline-flex items-center gap-3 mb-6 sm:mb-8">
            <span className="w-6 sm:w-10 h-[1px] bg-[#a8844a]" />
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.28em] uppercase text-[#e6d5b0] font-semibold">
              THE HOUSE OF WEDDINGS · BY MUBAARQAAN
            </span>
            <span className="w-6 sm:w-10 h-[1px] bg-[#a8844a]" />
          </div>

          {/* Brand Monogram */}
          <div className="mb-6 sm:mb-8 flex justify-center">
            <HWLogo variant="full" size="xl" />
          </div>

          {/* Iconic Statement Headline: Line 1 Ivory, Line 2 Sage (#5d6b57) */}
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-[#f7f3ea] tracking-[0.06em] sm:tracking-[0.08em] uppercase leading-[1.15] mb-5 sm:mb-6 font-normal">
            <span className="block text-[#f7f3ea]">Be a Guest</span>
            <span className="block text-[#5d6b57] dark:text-[#8ea387] italic tracking-[0.04em] mt-1 text-2xl sm:text-4xl md:text-5xl font-light">
              at Your Own Wedding.
            </span>
          </h1>

          {/* Body Text in Hanken Grotesk */}
          <p className="font-sans text-sm sm:text-base md:text-lg font-light text-[#f7f3ea]/85 max-w-xl leading-relaxed mb-8 sm:mb-10">
            Bespoke venue curation, guest hospitality, and on-ground coordination across India&apos;s finest destination palaces.
          </p>

          {/* Clean Dual CTAs: Primary in Deep Sage (#3b4637) with Gold Accent Border (#a8844a) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md mb-10 sm:mb-12">
            <button
              onClick={onStartClick}
              type="button"
              className="w-full sm:w-auto flex-1 px-8 py-3.5 sm:py-4 text-xs font-sans font-semibold tracking-[0.18em] uppercase text-[#f7f3ea] bg-[#3b4637] hover:bg-[#2e372b] hover:shadow-[0_8px_30px_rgba(168,132,74,0.30)] transition-all duration-300 border border-[#a8844a] cursor-pointer whitespace-nowrap shadow-md active:scale-[0.99]"
            >
              Plan Your Wedding
            </button>

            {onOpenBrochure && (
              <button
                onClick={() => onOpenBrochure('maison')}
                type="button"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 text-xs font-sans font-medium tracking-[0.16em] uppercase text-[#f7f3ea] bg-[#1d201b]/80 hover:bg-[#3b4637]/50 border border-[#ddd5c3]/50 hover:border-[#a8844a] transition-all cursor-pointer whitespace-nowrap shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-none stroke-current text-[#e6d5b0]" viewBox="0 0 24 24" strokeWidth="2.2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                <span>Maison Folio &amp; Brochures (PDF)</span>
              </button>
            )}
          </div>

          {/* Minimalist Destination Signature */}
          <div className="pt-6 border-t border-[#ddd5c3]/20 text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#e6d5b0]/90 flex items-center gap-2 sm:gap-3">
            <span>Jaipur</span>
            <span className="text-[#a8844a]">·</span>
            <span>Udaipur</span>
            <span className="text-[#a8844a]">·</span>
            <span>Jodhpur</span>
            <span className="text-[#a8844a]">·</span>
            <span>Goa</span>
            <span className="text-[#a8844a]">·</span>
            <span>Worldwide</span>
          </div>

        </div>

        {/* Subtle Bottom Transition into Ivory (#f7f3ea) */}
        <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#f7f3ea] dark:from-[#1d201b] to-transparent pointer-events-none" />
      </div>
    </section>
  );
};
