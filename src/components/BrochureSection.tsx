import React, { useState } from 'react';
import { generateBrochurePdf } from '../utils/brochurePdfGenerator';
import { CONTACT_INFO } from '../config/contact';
import regeneratedCoverImg from '../assets/images/regenerated_image_1791196795584.png';

interface BrochureSectionProps {
  onOpenBrochure: (initialPage?: number) => void;
  onPlanClick?: () => void;
}

export const BrochureSection: React.FC<BrochureSectionProps> = ({
  onOpenBrochure,
  onPlanClick,
}) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await generateBrochurePdf();
    } catch (err) {
      console.error('Download error:', err);
    } finally {
      setIsDownloading(false);
    }
  };

  const handleWhatsApp = () => {
    const msg = encodeURIComponent(
      'Hello The House of Weddings, please send me the Event Management & Guest Hospitality Service Brochure (Edition 2026).'
    );
    window.open(`https://wa.me/918800843189?text=${msg}`, '_blank');
  };

  return (
    <section id="brochure" className="relative py-20 sm:py-28 bg-[#032B24] text-[#F8F5EE] border-t border-[#DFBF7B]/30 overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#DFBF7B]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#DFBF7B]" />
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#DFBF7B] font-semibold">
              OFFICIAL BROCHURE · EDITION 2026
            </span>
            <span className="w-8 h-[1px] bg-[#DFBF7B]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#F8F5EE] tracking-[0.08em] uppercase mb-4">
            Event Management &amp; Hospitality Brochure
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#F8F5EE]/80 font-light max-w-2xl mx-auto leading-relaxed">
            Download our 6-page brochure to see our on-ground team structure, guest hospitality services, and transparent packages starting from <strong>₹69,000+</strong>.
          </p>
          <div className="w-16 h-[1px] bg-[#DFBF7B]/50 mx-auto mt-6" />
        </div>

        {/* Main Feature Showcase Container */}
        <div className="bg-[#02201A]/90 border border-[#DFBF7B]/30 p-6 sm:p-10 lg:p-12 shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left: Visual Brochure Stack Previews */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                
                {/* Background Shadow Cards for 3D Stack Effect */}
                <div className="absolute -top-3 -right-3 w-full h-full bg-[#DFBF7B]/15 border border-[#DFBF7B]/30 rounded-none pointer-events-none" />
                <div className="absolute -top-1.5 -right-1.5 w-full h-full bg-[#032B24] border border-[#DFBF7B]/20 rounded-none pointer-events-none" />

                {/* Main Front Brochure Cover Card */}
                <div 
                  onClick={() => onOpenBrochure(1)}
                  className="relative bg-[#FAF8F3] text-[#032B24] p-5 sm:p-6 border-2 border-[#DFBF7B] shadow-2xl cursor-pointer group transition-transform hover:-translate-y-1"
                >
                  {/* Top Bar of Card */}
                  <div className="flex justify-between items-center text-[9px] font-sans tracking-[0.2em] uppercase text-[#B89248] pb-2 border-b border-[#DFBF7B]/30 mb-4">
                    <span>Capability Brochure · Edition 2026</span>
                    <span className="bg-[#032B24] text-[#DFBF7B] px-1.5 py-0.5 font-bold">6 Pages PDF</span>
                  </div>

                  {/* Mini Emblem */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 border border-[#DFBF7B] overflow-hidden shadow-sm shrink-0">
                      <img
                        src="/logo.jpg"
                        alt="The House of Weddings"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span className="text-[9px] font-sans uppercase tracking-[0.16em] text-[#B89248] font-bold block">
                        Event Management &amp; Guest Hospitality
                      </span>
                      <h4 className="font-serif text-base sm:text-lg text-[#032B24] font-semibold leading-tight">
                        Be a Guest at Your Own Wedding.
                      </h4>
                    </div>
                  </div>

                  {/* Preview Image */}
                  <div className="relative aspect-[16/10] overflow-hidden border border-[#032B24]/15 mb-4 group-hover:brightness-105 transition-all">
                    <img
                      src={regeneratedCoverImg}
                      alt="The House of Weddings hospitality team brochure cover preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-2.5">
                      <span className="text-[10px] font-sans uppercase tracking-widest text-[#DFBF7B] font-semibold">
                        Click to Flip Through Full Brochure &rarr;
                      </span>
                    </div>
                  </div>

                  {/* 3 Quick Package Pills */}
                  <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-sans pt-2 border-t border-[#032B24]/10">
                    <div className="p-1.5 bg-[#F1ECE0] border border-[#032B24]/10">
                      <strong className="block text-[#032B24] text-[9px] uppercase tracking-wider">Bronze</strong>
                      <span className="text-[#B89248] font-bold">₹69,000+</span>
                    </div>
                    <div className="p-1.5 bg-[#032B24] text-[#F8F5EE] border border-[#DFBF7B]">
                      <strong className="block text-[#DFBF7B] text-[9px] uppercase tracking-wider">Gold ★</strong>
                      <span className="text-[#DFBF7B] font-bold">₹1,49,000+</span>
                    </div>
                    <div className="p-1.5 bg-[#F1ECE0] border border-[#032B24]/10">
                      <strong className="block text-[#032B24] text-[9px] uppercase tracking-wider">Platinum</strong>
                      <span className="text-[#B89248] font-bold">₹2,19,000+</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: What's Inside & Download Actions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#DFBF7B] font-semibold block mb-2">
                  What You&apos;ll Find Inside:
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#F8F5EE] tracking-wide mb-4">
                  Complete Hospitality &amp; Day-of Execution Guide
                </h3>
                <p className="text-xs sm:text-sm text-[#F8F5EE]/80 font-sans leading-relaxed font-light mb-6">
                  Everything you need to know about our trained on-ground wedding specialists, personal shadows for the bride and groom, luggage handling, airport concierges, and master vendor sync.
                </p>
              </div>

              {/* 4 Key Brochure Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-xs font-sans">
                <div 
                  onClick={() => onOpenBrochure(2)}
                  className="p-3 bg-[#032B24] border border-[#DFBF7B]/30 hover:border-[#DFBF7B] transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] text-[#DFBF7B] block font-mono">PAGE 02</span>
                  <strong className="text-[#F8F5EE] block font-medium group-hover:text-[#DFBF7B] transition-colors">
                    Guest Care &amp; Personal Shadows
                  </strong>
                  <span className="text-[11px] text-[#F8F5EE]/70 font-light">Airport greetings, room allocations, VIP care</span>
                </div>

                <div 
                  onClick={() => onOpenBrochure(3)}
                  className="p-3 bg-[#032B24] border border-[#DFBF7B]/30 hover:border-[#DFBF7B] transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] text-[#DFBF7B] block font-mono">PAGE 03</span>
                  <strong className="text-[#F8F5EE] block font-medium group-hover:text-[#DFBF7B] transition-colors">
                    24/7 Operations &amp; Help Desk
                  </strong>
                  <span className="text-[11px] text-[#F8F5EE]/70 font-light">Control room, walkie-talkie sync, night support</span>
                </div>

                <div 
                  onClick={() => onOpenBrochure(4)}
                  className="p-3 bg-[#032B24] border border-[#DFBF7B]/30 hover:border-[#DFBF7B] transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] text-[#DFBF7B] block font-mono">PAGE 04</span>
                  <strong className="text-[#F8F5EE] block font-medium group-hover:text-[#DFBF7B] transition-colors">
                    Destination Standards
                  </strong>
                  <span className="text-[11px] text-[#F8F5EE]/70 font-light">Continuous shuttles, flight tracking, peace of mind</span>
                </div>

                <div 
                  onClick={() => onOpenBrochure(5)}
                  className="p-3 bg-[#032B24] border border-[#DFBF7B]/30 hover:border-[#DFBF7B] transition-colors cursor-pointer group"
                >
                  <span className="text-[10px] text-[#DFBF7B] block font-mono">PAGE 05</span>
                  <strong className="text-[#F8F5EE] block font-medium group-hover:text-[#DFBF7B] transition-colors">
                    Management Packages
                  </strong>
                  <span className="text-[11px] text-[#DFBF7B]/70 font-light">₹69,000+ to ₹2,19,000+ transparent tiers</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#DFBF7B]/20 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                {/* Instant PDF Download Button */}
                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex-1 inline-flex items-center justify-center gap-2.5 px-6 py-3.5 bg-gradient-to-r from-[#DFBF7B] via-[#EADBBA] to-[#DFBF7B] text-[#032B24] text-xs font-sans font-semibold uppercase tracking-[0.18em] shadow-[0_4px_20px_rgba(223,191,123,0.35)] hover:shadow-[0_6px_28px_rgba(223,191,123,0.5)] transition-all cursor-pointer disabled:opacity-50"
                >
                  <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>{isDownloading ? 'Generating PDF Document...' : 'Download Brochure (PDF)'}</span>
                </button>

                {/* Preview in Reader */}
                <button
                  onClick={() => onOpenBrochure(1)}
                  className="px-5 py-3.5 bg-[#02201A] hover:bg-[#073830] text-[#DFBF7B] border border-[#DFBF7B]/50 text-xs font-sans font-medium uppercase tracking-[0.16em] transition-colors cursor-pointer text-center"
                >
                  Preview Online
                </button>

                {/* WhatsApp Option */}
                <button
                  onClick={handleWhatsApp}
                  className="px-4 py-3.5 bg-[#02201A] hover:bg-[#073830] text-[#DFBF7B] border border-[#DFBF7B]/50 text-xs font-sans uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  title="Receive Brochure on WhatsApp"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.177 8.177 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.26-4.43c0-4.54 3.69-8.24 8.24-8.24zM8.53 7.33c-.2 0-.44.02-.65.23-.26.26-.98.96-.98 2.34 0 1.38 1.01 2.72 1.15 2.91.14.19 1.95 3.05 4.77 4.24 2.34.99 2.82.79 3.32.75.51-.05 1.65-.67 1.88-1.33.24-.65.24-1.21.17-1.33-.07-.12-.26-.19-.55-.33s-1.69-.83-1.95-.93c-.26-.09-.45-.14-.64.14-.19.28-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01z"/>
                  </svg>
                  <span className="hidden sm:inline">WhatsApp</span>
                </button>
              </div>

              <div className="flex items-center gap-3 text-[11px] text-[#F8F5EE]/65 font-sans pt-1">
                <span>✓ Instant high-res PDF</span>
                <span>•</span>
                <span>✓ No sign-up required</span>
                <span>•</span>
                <span>✓ Transparent pricing details</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
