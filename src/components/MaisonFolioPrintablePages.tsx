import React from 'react';
import { useLogo } from './LogoContext';
import heroVenueImg from '../assets/images/hero_luxury_wedding_venue_1790246590642.jpg';
import royalPalaceImg from '../assets/images/royal_palace_wedding_1790676652108.jpg';
import { CONTACT_INFO } from '../config/contact';

export const MAISON_ASSETS = {
  courtyardBanquet: heroVenueImg,
  palaceMandap: royalPalaceImg,
};

// Reusable Top Running Header for Maison Pages
const MaisonRunningHeader: React.FC<{
  folioNum: string;
  sectionTitle: string;
}> = ({ folioNum, sectionTitle }) => {
  const { logoSrc } = useLogo();
  return (
    <div className="flex items-center justify-between pb-3 mb-4 sm:mb-5 border-b border-[#758361]/30">
      <div className="w-8 h-8 sm:w-9 sm:h-9 border border-[#758361] overflow-hidden shadow-xs shrink-0 bg-white p-0.5">
        <img
          src={logoSrc}
          alt="The House of Weddings Emblem"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-right">
        <div className="text-[8.5px] sm:text-[9px] font-sans font-bold tracking-[0.24em] uppercase text-[#032B24]">
          MAISON FOLIO · {folioNum}
        </div>
        <div className="text-[7.5px] sm:text-[8px] font-serif italic tracking-[0.16em] uppercase text-[#758361]">
          {sectionTitle}
        </div>
      </div>
    </div>
  );
};

// Reusable Running Footer for Maison Pages
const MaisonRunningFooter: React.FC<{
  pageNum: string;
}> = ({ pageNum }) => (
  <div className="pt-3 mt-auto border-t border-[#758361]/30 flex items-center justify-between text-[7.5px] sm:text-[8px] font-sans tracking-[0.22em] uppercase">
    <span className="text-[#032B24] font-medium tracking-[0.24em]">
      THE HOUSE OF WEDDINGS · BY MUBAARQAAN
    </span>
    <span className="text-[#758361] font-serif italic tracking-[0.18em]">
      PRIVATE CLIENT ATELIER
    </span>
    <span className="text-[#032B24]/75 font-semibold">
      {pageNum}
    </span>
  </div>
);

interface MaisonPageProps {
  id?: string;
  className?: string;
  onReserveClick?: () => void;
}

// ================= PAGE 1: INTRODUCTION & GUIDING CREED =================
export const MaisonPage1: React.FC<MaisonPageProps> = ({ id, className = '', onReserveClick }) => {
  return (
    <div
      id={id}
      className={`w-full max-w-[740px] bg-[#FAF8F3] text-[#032B24] p-5 sm:p-8 flex flex-col justify-between relative box-border overflow-hidden select-none min-h-[920px] shadow-lg ${className}`}
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {/* Elegant Framing */}
      <div className="absolute inset-[16px] border border-[#758361]/80 pointer-events-none" />
      <div className="absolute inset-[20px] border border-[#032B24]/20 pointer-events-none" />

      {/* Top Header */}
      <MaisonRunningHeader folioNum="01" sectionTitle="Private Client Introduction" />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col justify-between my-auto">
        {/* Title Block */}
        <div className="mb-4">
          <span className="text-[8.5px] sm:text-[9px] font-sans tracking-[0.26em] uppercase text-[#758361] font-semibold block mb-1">
            THE MAISON · PRIVATE CLIENT ATELIER
          </span>
          <h1 className="font-serif text-[24px] sm:text-[28px] font-bold text-[#032B24] tracking-[0.06em] uppercase leading-tight mb-1">
            YOUR WEDDING.
          </h1>
          <h2 className="font-serif italic font-normal text-[22px] sm:text-[26px] text-[#032B24] tracking-[0.04em] leading-tight mb-2">
            THOUGHTFULLY PLANNED.
          </h2>
          <p className="font-sans text-[10px] sm:text-[11px] text-[#4A5B53] font-light max-w-[540px] leading-relaxed">
            A bespoke planning, spatial design, and guest management maison for heritage and destination celebrations.
          </p>
        </div>

        {/* Hero Photo with Caption */}
        <div className="w-full aspect-[16/10] sm:aspect-[16/9] border border-[#032B24]/25 shadow-md overflow-hidden relative mb-4">
          <img
            src={MAISON_ASSETS.courtyardBanquet}
            alt="Heritage Palace Courtyard Banquet"
            className="w-full h-full object-cover filter brightness-[0.95]"
          />
          <div className="absolute bottom-0 inset-x-0 bg-[#02201A]/85 backdrop-blur-xs px-3.5 py-1.5 flex items-center justify-between text-[7.5px] sm:text-[8px] font-sans tracking-[0.2em] uppercase text-[#F8F5EE]">
            <span className="font-medium text-[#758361]">HERITAGE PALACE &amp; DESTINATION CELEBRATIONS</span>
            <span className="text-[#F8F5EE]/80">NEW DELHI · RAJASTHAN · WORLDWIDE</span>
          </div>
        </div>

        {/* Our Guiding Creed */}
        <div className="p-4 sm:p-5 bg-[#FCFAF6] border border-[#758361]/35 shadow-xs text-center my-3 relative">
          <span className="text-[7.5px] sm:text-[8px] font-sans tracking-[0.26em] uppercase text-[#758361] font-bold block mb-1">
            OUR GUIDING CREED
          </span>
          <h3 className="font-serif text-[15px] sm:text-[18px] text-[#032B24] tracking-[0.14em] uppercase font-bold mb-1">
            BE A GUEST AT YOUR OWN WEDDING.
          </h3>
          <p className="font-serif italic text-[11px] sm:text-[12px] text-[#032B24]/85 max-w-md mx-auto leading-relaxed">
            &ldquo;The true luxury of a wedding is time—the freedom to be fully present with those you love.&rdquo;
          </p>
        </div>

        {/* Bottom Callout & Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2 mb-2">
          <p className="font-sans text-[9px] sm:text-[10px] text-[#4A5B53] font-light max-w-[360px] leading-relaxed text-center sm:text-left">
            From palace acquisition to on-ground protocol, we curate and direct every detail with calm authority.
          </p>
          <button
            onClick={onReserveClick}
            type="button"
            className="inline-flex items-center gap-1.5 px-4 py-2 border border-[#032B24] text-[9.5px] font-sans uppercase tracking-[0.2em] font-semibold text-[#032B24] hover:bg-[#032B24] hover:text-[#FAF8F3] transition-all cursor-pointer whitespace-nowrap"
          >
            <span>RESERVE CONSULTATION</span>
            <span>&rarr;</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <MaisonRunningFooter pageNum="01 / 04" />
    </div>
  );
};

// ================= PAGE 2: THE FOUR PILLARS =================
export const MaisonPage2: React.FC<MaisonPageProps> = ({ id, className = '' }) => {
  return (
    <div
      id={id}
      className={`w-full max-w-[740px] bg-[#FAF8F3] text-[#032B24] p-5 sm:p-8 flex flex-col justify-between relative box-border overflow-hidden select-none min-h-[920px] shadow-lg ${className}`}
      style={{ fontFamily: 'Georgia, serif' }}
    >
      <div className="absolute inset-[16px] border border-[#758361]/80 pointer-events-none" />
      <div className="absolute inset-[20px] border border-[#032B24]/20 pointer-events-none" />

      <MaisonRunningHeader folioNum="02" sectionTitle="The Four Maison Pillars" />

      <div className="flex-1 flex flex-col justify-between my-auto">
        {/* Title */}
        <div className="mb-3">
          <span className="text-[8.5px] sm:text-[9px] font-sans tracking-[0.26em] uppercase text-[#758361] font-semibold block mb-1">
            THE FOUR PILLARS OF OUR PRACTICE
          </span>
          <h2 className="font-serif text-[22px] sm:text-[25px] font-bold text-[#032B24] tracking-[0.06em] uppercase leading-tight mb-1">
            EVERY DETAIL,
          </h2>
          <h3 className="font-serif italic font-normal text-[20px] sm:text-[23px] text-[#032B24] tracking-[0.04em] leading-tight mb-1.5">
            HARMONIOUSLY CONNECTED.
          </h3>
          <p className="font-sans text-[10px] sm:text-[10.5px] text-[#4A5B53] font-light max-w-[540px] leading-relaxed">
            We unite architectural spatial design, palace acquisition, and guest concierge under one singular maison.
          </p>
        </div>

        {/* Palace Mandap Photo */}
        <div className="w-full aspect-[16/8.5] sm:aspect-[16/8] border border-[#032B24]/25 shadow-md overflow-hidden relative mb-4">
          <img
            src={MAISON_ASSETS.palaceMandap}
            alt="Royal Indian Heritage & Destination Celebrations"
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 inset-x-0 bg-[#02201A]/85 backdrop-blur-xs px-3.5 py-1.5 flex items-center justify-between text-[7.5px] sm:text-[8px] font-sans tracking-[0.2em] uppercase text-[#F8F5EE]">
            <span className="font-medium text-[#758361]">ROYAL INDIAN HERITAGE &amp; DESTINATION CELEBRATIONS</span>
            <span className="text-[#F8F5EE]/80">BESPOKE CURATION</span>
          </div>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3.5 mb-3">
          {[
            {
              roman: 'PILLAR I',
              title: 'CURATED VENUE ACQUISITION',
              body: 'Handpicked heritage palaces and private estates with absolute commercial clarity, room inventory, and dates before booking.',
            },
            {
              roman: 'PILLAR II',
              title: 'SPATIAL DESIGN & 3D LAYOUTS',
              body: 'Venue-calibrated 2D/3D visual maps for seating, stages, and guest movement before committing to production.',
            },
            {
              roman: 'PILLAR III',
              title: 'GUEST INTELLIGENCE & RSVPS',
              body: 'Precision attendance tracking, room allocations, and airport transit — eliminating catering and room waste.',
            },
            {
              roman: 'PILLAR IV',
              title: 'ON-GROUND PROTOCOL & DIRECTING',
              body: 'Senior directors on-site to lead vendors, manage timelines, and assist guests so your family celebrates uninterrupted.',
            },
          ].map((pillar) => (
            <div
              key={pillar.roman}
              className="p-3.5 bg-[#FCFAF6] border border-[#758361]/35 flex flex-col justify-between shadow-xs"
            >
              <div>
                <div className="flex items-center gap-1.5 mb-1.5">
                  <span className="text-[7.5px] font-sans uppercase tracking-[0.2em] text-[#758361] font-bold">
                    {pillar.roman}
                  </span>
                  <span className="text-[7.5px] text-[#758361]/50">|</span>
                  <span className="font-serif text-[10px] sm:text-[10.5px] font-bold uppercase tracking-wider text-[#032B24]">
                    {pillar.title}
                  </span>
                </div>
                <p className="font-sans text-[8.5px] sm:text-[9px] text-[#4A5B53] leading-relaxed font-light">
                  {pillar.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* The Maison Standard Banner */}
        <div className="p-3 bg-[#F1ECE0] border border-[#758361]/30 text-center">
          <span className="text-[7.5px] font-sans tracking-[0.24em] uppercase text-[#758361] font-bold block mb-0.5">
            THE MAISON STANDARD
          </span>
          <div className="font-serif text-[11px] sm:text-[12px] font-bold text-[#032B24] uppercase tracking-wider">
            DISCIPLINE IN PLANNING. MAJESTY IN CELEBRATION.
          </div>
          <p className="font-serif italic text-[8.5px] sm:text-[9.5px] text-[#4A5B53] mt-0.5">
            Working seamlessly alongside your chosen decorators and production partners.
          </p>
        </div>
      </div>

      <MaisonRunningFooter pageNum="02 / 04" />
    </div>
  );
};

// ================= PAGE 3: THE ATELIER STANDARDS =================
export const MaisonPage3: React.FC<MaisonPageProps> = ({ id, className = '' }) => {
  return (
    <div
      id={id}
      className={`w-full max-w-[740px] bg-[#FAF8F3] text-[#032B24] p-5 sm:p-8 flex flex-col justify-between relative box-border overflow-hidden select-none min-h-[920px] shadow-lg ${className}`}
      style={{ fontFamily: 'Georgia, serif' }}
    >
      <div className="absolute inset-[16px] border border-[#758361]/80 pointer-events-none" />
      <div className="absolute inset-[20px] border border-[#032B24]/20 pointer-events-none" />

      <MaisonRunningHeader folioNum="03" sectionTitle="The Atelier Standards" />

      <div className="flex-1 flex flex-col justify-between my-auto">
        {/* Title */}
        <div className="mb-3">
          <span className="text-[8.5px] sm:text-[9px] font-sans tracking-[0.26em] uppercase text-[#758361] font-semibold block mb-1">
            THE ATELIER PROMISE &amp; STANDARDS
          </span>
          <h2 className="font-serif text-[22px] sm:text-[25px] font-bold text-[#032B24] tracking-[0.06em] uppercase leading-tight mb-1">
            CLARITY OF VISION.
          </h2>
          <h3 className="font-serif italic font-normal text-[20px] sm:text-[23px] text-[#032B24] tracking-[0.04em] leading-tight mb-1.5">
            PEACE OF MIND.
          </h3>
          <p className="font-sans text-[10px] sm:text-[10.5px] text-[#4A5B53] font-light max-w-[540px] leading-relaxed">
            A disciplined planning methodology designed to protect your family&apos;s time, resources, and celebration experience.
          </p>
        </div>

        {/* 6 Standards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          {[
            {
              num: '01',
              title: 'SAVE TIME',
              desc: "A curated shortlist tailored to your family's vision.",
            },
            {
              num: '02',
              title: 'CLEAR VENUE CHOICES',
              desc: 'Compare real costs and room capacity side-by-side.',
            },
            {
              num: '03',
              title: 'VISUAL CONFIDENCE',
              desc: 'See 2D & 3D layouts before finalizing with decorators.',
            },
            {
              num: '04',
              title: 'ACCURATE HEADCOUNT',
              desc: 'Confirmed RSVPs for catering, seating, and room blocks.',
            },
            {
              num: '05',
              title: 'ZERO CONFUSION',
              desc: 'Family, venue, and vendors aligned on one clear timeline.',
            },
            {
              num: '06',
              title: 'THOUGHTFUL SPENDING',
              desc: 'Avoid booking extra rooms or ordering excess food.',
            },
          ].map((item) => (
            <div
              key={item.num}
              className="p-3 bg-[#FCFAF6] border border-[#758361]/35 shadow-xs"
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif text-[11px] text-[#758361] font-bold">
                  {item.num}.
                </span>
                <span className="font-serif text-[10.5px] font-bold uppercase tracking-wider text-[#032B24]">
                  {item.title}
                </span>
              </div>
              <p className="font-sans text-[8.5px] sm:text-[9px] text-[#4A5B53] font-light leading-relaxed pl-5">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* 07: Total Presence & Peace of Mind Highlight Box */}
        <div className="p-4 bg-[#FCFAF6] border-2 border-[#758361] shadow-sm mb-3 relative">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className="font-serif text-[13px] text-[#758361] font-bold">07.</span>
              <span className="font-serif text-[12px] sm:text-[13px] font-bold uppercase tracking-wider text-[#032B24]">
                TOTAL PRESENCE &amp; PEACE OF MIND
              </span>
            </div>
            <span className="px-2.5 py-0.5 bg-[#758361] text-white text-[7.5px] font-sans uppercase font-bold tracking-widest shrink-0">
              THE ULTIMATE LUXURY
            </span>
          </div>
          <p className="font-sans text-[9.5px] sm:text-[10px] text-[#4A5B53] font-light leading-relaxed">
            The profound luxury of being an honored guest at your own family&apos;s milestone while our maison directs every timeline and arrangement.
          </p>
        </div>

        {/* The Maison Commitment */}
        <div className="p-3 bg-[#F1ECE0] border border-[#758361]/30 text-center">
          <span className="text-[7.5px] font-sans tracking-[0.24em] uppercase text-[#758361] font-bold block mb-0.5">
            THE MAISON COMMITMENT
          </span>
          <div className="font-serif text-[11px] sm:text-[12px] font-bold text-[#032B24] uppercase tracking-wider">
            CALM, MAJESTY, AND DILIGENCE FOR YOUR FAMILY&apos;S CELEBRATION.
          </div>
          <p className="font-serif italic text-[8.5px] sm:text-[9.5px] text-[#4A5B53] mt-0.5">
            Be a guest at your own wedding — savor every unrepeatable second.
          </p>
        </div>
      </div>

      <MaisonRunningFooter pageNum="03 / 04" />
    </div>
  );
};

// ================= PAGE 4: INVESTMENT STEWARDSHIP & CONTACT =================
export const MaisonPage4: React.FC<MaisonPageProps> = ({ id, className = '', onReserveClick }) => {
  return (
    <div
      id={id}
      className={`w-full max-w-[740px] bg-[#FAF8F3] text-[#032B24] p-5 sm:p-8 flex flex-col justify-between relative box-border overflow-hidden select-none min-h-[920px] shadow-lg ${className}`}
      style={{ fontFamily: 'Georgia, serif' }}
    >
      <div className="absolute inset-[16px] border border-[#758361]/80 pointer-events-none" />
      <div className="absolute inset-[20px] border border-[#032B24]/20 pointer-events-none" />

      <MaisonRunningHeader folioNum="04" sectionTitle="Private Engagement" />

      <div className="flex-1 flex flex-col justify-between my-auto">
        {/* Title */}
        <div className="mb-3">
          <span className="text-[8.5px] sm:text-[9px] font-sans tracking-[0.26em] uppercase text-[#758361] font-semibold block mb-1">
            INVESTMENT INTELLIGENCE &amp; STEWARDSHIP
          </span>
          <h2 className="font-serif text-[22px] sm:text-[25px] font-bold text-[#032B24] tracking-[0.06em] uppercase leading-tight mb-1">
            INFORMED DECISIONS.
          </h2>
          <h3 className="font-serif italic font-normal text-[20px] sm:text-[23px] text-[#032B24] tracking-[0.04em] leading-tight mb-1.5">
            THOUGHTFUL SPENDING.
          </h3>
          <p className="font-sans text-[10px] sm:text-[10.5px] text-[#4A5B53] font-light max-w-[540px] leading-relaxed">
            True luxury is never wasteful. We organize guest lists, venue contracts, and room blocks so every expense serves your celebration.
          </p>
        </div>

        {/* The Maison Guest Intelligence Model */}
        <div className="p-3.5 bg-[#FCFAF6] border border-[#758361]/35 shadow-xs mb-3">
          <div className="flex items-center justify-between text-[7.5px] font-sans tracking-[0.2em] uppercase text-[#758361] font-semibold mb-2">
            <span>THE MAISON GUEST INTELLIGENCE MODEL</span>
            <span className="italic text-[#758361]/70">ILLUSTRATIVE PARADIGM</span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center py-2 border-y border-[#758361]/25 my-1.5">
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#032B24] block">300</span>
              <span className="text-[7.5px] font-sans uppercase tracking-widest text-[#4A5B53]">INVITED GUESTS</span>
            </div>
            <div className="border-x border-[#758361]/20">
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#758361] block">247</span>
              <span className="text-[7.5px] font-sans uppercase tracking-widest text-[#4A5B53]">CONFIRMED RSVPS</span>
            </div>
            <div>
              <span className="font-serif text-xl sm:text-2xl font-bold text-[#032B24] block">235</span>
              <span className="text-[7.5px] font-sans uppercase tracking-widest text-[#4A5B53]">ATTENDING GUESTS</span>
            </div>
          </div>

          <p className="font-serif italic text-[8.5px] sm:text-[9.5px] text-[#4A5B53] text-center mt-2 leading-relaxed">
            Our guest intelligence ensures you contract catering, rooms, and transfers only for confirmed guests — saving lakhs in avoidable surplus.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3 text-center">
          {[
            { title: 'PALACE & ESTATES', sub: 'Direct commercial clarity' },
            { title: 'CATERING PRECISION', sub: 'Per-plate counts in sync' },
            { title: 'HOSPITALITY BLOCKS', sub: 'Exact room allocations' },
            { title: 'TRANSIT LOGISTICS', sub: 'Chauffeured airport flows' },
          ].map((c) => (
            <div key={c.title} className="p-2 bg-[#F1ECE0] border border-[#758361]/20">
              <span className="font-serif text-[8.5px] font-bold text-[#032B24] uppercase block mb-0.5">
                {c.title}
              </span>
              <span className="text-[7px] sm:text-[7.5px] font-sans text-[#4A5B53] block">
                {c.sub}
              </span>
            </div>
          ))}
        </div>

        {/* Initiate A Private Conversation & Gaurav Sehrawat Contact Block */}
        <div className="p-4 bg-[#FCFAF6] border border-[#758361]/40 shadow-xs mb-3">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-[#758361]/25">
            <div>
              <h3 className="font-serif text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-[#032B24]">
                INITIATE A PRIVATE CONVERSATION.
              </h3>
              <p className="font-sans text-[8.5px] sm:text-[9px] text-[#4A5B53] font-light">
                Direct founding consultation for destination celebrations across India and worldwide.
              </p>
            </div>
            <button
              onClick={onReserveClick}
              type="button"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#032B24] hover:bg-[#758361] text-white text-[9px] font-sans uppercase tracking-[0.2em] font-semibold transition-colors cursor-pointer shrink-0 shadow-xs"
            >
              <svg className="w-3 h-3 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>RESERVE CONSULTATION</span>
            </button>
          </div>

          <div className="pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[8.5px] font-sans">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif text-[11px] font-bold uppercase text-[#032B24]">
                  Gaurav Sehrawat
                </span>
                <span className="text-[7.5px] tracking-wider uppercase text-[#758361] font-semibold">
                  FOUNDER &amp; PRINCIPAL PLANNER · THE MAISON
                </span>
              </div>
              <div className="space-y-0.5 text-[#4A5B53]">
                <div>
                  <a
                    href={CONTACT_INFO.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#758361] transition-colors"
                  >
                    +91 8800843189 · CONCIERGE WHATSAPP
                  </a>
                  {' · '}
                  <a
                    href="mailto:bookings@mubaarqaan.com"
                    className="hover:text-[#758361] transition-colors"
                  >
                    bookings@mubaarqaan.com
                  </a>
                </div>
                <div>
                  <a
                    href="https://www.mubaarqaan.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#758361] transition-colors"
                  >
                    www.mubaarqaan.com
                  </a>
                  {' · '}
                  <a
                    href={CONTACT_INFO.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#758361] transition-colors"
                  >
                    @mubaarqaan
                  </a>
                </div>
              </div>
            </div>

            {/* QR Code Simulation */}
            <div className="flex items-center gap-2 border border-[#758361]/30 p-1.5 bg-white shrink-0">
              <svg className="w-10 h-10 text-[#032B24]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M2 2h8v8H2V2zm2 2v4h4V4H4zm10-2h8v8h-8V2zm2 2v4h4V4h-4zM2 14h8v8H2v-8zm2 2v4h4v-4H4zm14 0h4v4h-4v-4zm-4 4h4v4h-4v-4zm0-4h4v-4h-4v4z"/>
              </svg>
              <div className="text-[7px] font-sans text-[#4A5B53] tracking-wider uppercase leading-tight">
                Scan with<br />Camera<br /><strong className="text-[#032B24]">INSTANT<br />WHATSAPP</strong>
              </div>
            </div>
          </div>
        </div>

        {/* The Maison Directing */}
        <div className="p-2.5 bg-[#F1ECE0] border border-[#758361]/30 text-center">
          <span className="text-[7.5px] font-sans tracking-[0.24em] uppercase text-[#758361] font-bold block mb-0.5">
            THE MAISON DIRECTING
          </span>
          <div className="font-serif text-[10.5px] sm:text-[11.5px] font-bold text-[#032B24] uppercase tracking-wider">
            HONORED SERVICE. UNCOMPROMISING EXCELLENCE.
          </div>
          <p className="font-serif italic text-[8px] sm:text-[9px] text-[#4A5B53] mt-0.5">
            New Delhi · Rajasthan · Worldwide Destinations
          </p>
        </div>
      </div>

      <MaisonRunningFooter pageNum="04 / 04" />
    </div>
  );
};
