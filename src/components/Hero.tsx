import React, { useState } from 'react';
import { HWLogo } from './Logo';
import heroBgImg from '../assets/images/hero_luxury_wedding_venue_1790246590642.jpg';

interface HeroProps {
  onStartClick: () => void;
  onOpenBrochure?: (type?: 'maison' | 'management') => void;
}

interface PaletteSwatch {
  name: string;
  hex: string;
  role: string;
}

const PALETTE_SWATCHES: PaletteSwatch[] = [
  { name: 'Champagne', hex: '#e6d5b0', role: 'Default Preview · Arch & Motifs' },
  { name: 'Deep Sage', hex: '#3b4637', role: 'Selected Chip · Buttons & Calculator' },
  { name: 'Ivory', hex: '#f7f3ea', role: 'Main Page Canvas' },
  { name: 'Sage', hex: '#5d6b57', role: 'Headline Accent & Botannicals' },
  { name: 'Gold', hex: '#a8844a', role: 'Step Numerals & Accents' },
];

export const Hero: React.FC<HeroProps> = ({ onStartClick, onOpenBrochure }) => {
  // Default preview is Champagne (#e6d5b0) as specified, with Deep Sage (#3b4637) as selected chip
  const [selectedChipIndex, setSelectedChipIndex] = useState<number>(1); // Deep Sage selected chip

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
          <p className="font-sans text-sm sm:text-base md:text-lg font-light text-[#f7f3ea]/85 max-w-xl leading-relaxed mb-8 sm:mb-9">
            Bespoke venue curation, guest hospitality, and on-ground coordination across India&apos;s finest destination palaces.
          </p>

          {/* Clean Dual CTAs: Primary in Deep Sage (#3b4637) with Gold Accent Border (#a8844a) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-md mb-8">
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

          {/* Signature Wedding Palette Preview Chip Widget */}
          <div className="w-full max-w-lg mx-auto bg-[#1d201b]/70 backdrop-blur-sm border border-[#e6d5b0]/30 p-3.5 sm:p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between mb-2.5">
              <span className="text-[9.5px] sm:text-[10px] font-sans uppercase tracking-[0.22em] text-[#e6d5b0] font-semibold">
                Royal Wedding Palette Preview
              </span>
              <span className="text-[9px] font-sans text-[#ddd5c3]/80">
                Active: <span className="text-[#e6d5b0] font-medium">{PALETTE_SWATCHES[selectedChipIndex].name}</span>
              </span>
            </div>

            <div className="flex items-center justify-center gap-2 sm:gap-3">
              {PALETTE_SWATCHES.map((swatch, idx) => {
                const isSelected = selectedChipIndex === idx;
                const isDefaultPreview = swatch.hex === '#e6d5b0'; // Champagne default preview
                const isDeepSage = swatch.hex === '#3b4637'; // Deep sage chip

                return (
                  <button
                    key={swatch.name}
                    type="button"
                    onClick={() => setSelectedChipIndex(idx)}
                    title={`${swatch.name} (${swatch.hex}) — ${swatch.role}`}
                    className={`group relative flex flex-col items-center p-1.5 transition-all cursor-pointer rounded-xs ${
                      isSelected
                        ? 'ring-2 ring-[#a8844a] scale-105 bg-[#3b4637]/60'
                        : 'hover:bg-white/5 opacity-85 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full border shadow-sm transition-transform ${
                        isSelected ? 'border-[#f7f3ea] shadow-md' : 'border-[#ddd5c3]/40'
                      }`}
                      style={{ backgroundColor: swatch.hex }}
                    />
                    <span className="text-[8px] sm:text-[9px] font-sans tracking-wider uppercase mt-1 text-[#f7f3ea]/80">
                      {swatch.name.split(' ')[0]}
                    </span>
                    {isDefaultPreview && (
                      <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#e6d5b0]" title="Default Palette Arch Preview" />
                    )}
                    {isDeepSage && (
                      <span className="text-[7px] text-[#e6d5b0] tracking-tighter uppercase mt-0.5">Chip</span>
                    )}
                  </button>
                );
              })}
            </div>
            
            <p className="text-[10px] font-sans text-[#ddd5c3]/75 mt-2 text-center font-light">
              {PALETTE_SWATCHES[selectedChipIndex].role}
            </p>
          </div>

          {/* Minimalist Destination Signature */}
          <div className="pt-4 border-t border-[#ddd5c3]/20 text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#e6d5b0]/90 flex items-center gap-2 sm:gap-3">
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
