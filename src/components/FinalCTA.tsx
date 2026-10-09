import React from 'react';
import { HWLogo } from './Logo';

interface FinalCTAProps {
  onPlanClick: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onPlanClick }) => {
  return (
    <section className="relative py-20 sm:py-28 bg-[#032B24] text-[#F8F5EE] overflow-hidden border-t border-[#758361]/35">
      {/* Subtle Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#758361_1px,transparent_1px)] [background-size:28px_28px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Brand Logo */}
        <div className="flex justify-center mb-6">
          <HWLogo variant="full" size="md" />
        </div>

        {/* Subtle Sage Hairline */}
        <div className="w-16 h-[1px] bg-[#758361]/60 mx-auto mb-6" />

        <span className="text-[10px] sm:text-xs font-sans tracking-[0.24em] uppercase text-[#758361] font-semibold block mb-4">
          START PLANNING TODAY
        </span>

        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-light tracking-[0.08em] text-[#F8F5EE] uppercase leading-tight mb-6">
          Be a Guest at Your Own Wedding.
        </h2>

        <p className="font-sans text-base sm:text-lg text-[#F8F5EE]/85 font-light max-w-xl mx-auto leading-relaxed mb-10">
          Talk to our senior wedding team today. We will help you find the right venue, plan every detail smoothly, and look after every guest with genuine warmth and care.
        </p>

        <div>
          <button
            onClick={onPlanClick}
            type="button"
            className="px-9 sm:px-12 py-3.5 sm:py-4 text-xs sm:text-[13px] font-sans font-semibold tracking-[0.16em] uppercase text-white bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] hover:brightness-110 hover:shadow-[0_8px_30px_rgba(117,131,97,0.35)] active:brightness-95 transition-all duration-300 border border-[#758361] shadow-xl focus:outline-none focus:ring-2 focus:ring-[#758361] cursor-pointer"
          >
            Plan Your Wedding With Us
          </button>
        </div>
      </div>
    </section>
  );
};
