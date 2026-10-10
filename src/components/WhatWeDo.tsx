import React, { useState } from 'react';
import recceImg from '../assets/images/luxury_chauffeured_recce_1791024466143.jpg';
import spatialImg from '../assets/images/venue_spatial_visualization_1790246606080.jpg';

interface WhatWeDoProps {
  onOpenBrochure?: (type?: 'maison' | 'management') => void;
}

export const WhatWeDo: React.FC<WhatWeDoProps> = ({ onOpenBrochure }) => {
  const [expandedSteps, setExpandedSteps] = useState<Record<number, boolean>>({});

  const toggleStep = (step: number) => {
    setExpandedSteps((prev) => ({ ...prev, [step]: !prev[step] }));
  };

  return (
    <section id="what-we-do" className="relative py-16 sm:py-28 bg-[#F8F5EE] text-[#032B24] border-t border-[#032B24]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#758361]" />
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#758361] font-semibold">
              HOW WE HELP YOU
            </span>
            <span className="w-8 h-[1px] bg-[#758361]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#032B24] tracking-[0.06em] sm:tracking-[0.08em] uppercase mb-3 sm:mb-4">
            Four Simple Steps to a Stress-Free Wedding
          </h2>
          <p className="font-sans text-sm sm:text-lg text-[#032B24]/85 font-light max-w-2xl mx-auto">
            From finding your dream venue to looking after every guest on your wedding day.
          </p>
          <div className="w-16 h-[1px] bg-[#758361] mx-auto mt-5 sm:mt-6" />
        </div>

        {/* Four Simple Steps */}
        <div className="space-y-12 sm:space-y-24">
          
          {/* 01 FIND THE RIGHT VENUE */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start sm:items-center pb-12 sm:pb-20 border-b border-[#032B24]/10">
            <div className="lg:col-span-3 flex items-center lg:block gap-3">
              <span className="font-serif text-4xl sm:text-6xl text-[#758361] font-light leading-none">01</span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.24em] uppercase text-[#032B24]/60 font-semibold block">
                STEP ONE
              </span>
            </div>

            <div className="lg:col-span-9 space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal text-[#032B24] uppercase tracking-[0.05em] mb-2 sm:mb-4">
                  Find the Right Venue
                </h3>
                <p className="font-sans text-sm sm:text-lg text-[#032B24]/85 leading-relaxed font-light mb-4 sm:mb-6">
                  Tell us your preferred city, wedding dates, guest count, and budget. We give you a curated short list of top palaces, luxury hotels, and resorts that actually match what you want.
                </p>
              </div>

              {/* Free Luxury Car Ride Card with Picture */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 bg-[#FCFAF6] border border-[#758361]/40 p-5 sm:p-8 shadow-sm">
                <div className="md:col-span-7 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase text-[#758361] font-bold block mb-1 sm:mb-2">
                      COMPLIMENTARY VENUE RECCE RIDE
                    </span>
                    <h4 className="font-serif text-lg sm:text-2xl text-[#032B24] uppercase tracking-wide mb-2 sm:mb-3">
                      Visit Venues in a Chauffeured Luxury Car
                    </h4>
                    <p className="text-xs sm:text-sm font-sans text-[#032B24]/80 leading-relaxed font-light mb-3 sm:mb-4">
                      When you plan your wedding with us, we arrange a chauffeured vehicle (Innova Crysta or luxury sedan) to take you and your family for hotel site visits.
                    </p>
                  </div>

                  {/* Mobile Collapsible Inclusions */}
                  <div className="sm:hidden mb-3">
                    <button
                      type="button"
                      onClick={() => toggleStep(1)}
                      className="w-full py-2 px-3 bg-[#F1ECE0] border border-[#758361]/50 text-[11px] font-sans uppercase tracking-wider text-[#032B24] font-semibold flex items-center justify-between cursor-pointer"
                    >
                      <span>{expandedSteps[1] ? 'Hide Inclusions' : '✦ View Car Inclusions (Tap to Expand)'}</span>
                      <span className="text-xs">{expandedSteps[1] ? '▲' : '▼'}</span>
                    </button>
                  </div>

                  <div className={`${expandedSteps[1] ? 'block' : 'hidden'} sm:block space-y-1.5 text-xs font-sans text-[#032B24]/80 border-t border-[#032B24]/10 pt-3`}>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" />
                      <span>Comfortable travel for the couple and parents</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" />
                      <span>Complimentary refreshments and water bottles included</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" />
                      <span>A senior wedding manager travels with you to ask the hotel all hard questions</span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-5 relative overflow-hidden min-h-[180px] sm:min-h-[220px] border border-[#032B24]/15 shadow-xs">
                  <img
                    src={recceImg}
                    alt="Luxury chauffeured car for private venue recce"
                    className="w-full h-full object-cover filter brightness-[0.95]"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#02201A]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] sm:text-[9.5px] font-sans uppercase tracking-widest text-[#758361] border border-[#758361]/30 text-center font-medium">
                    Free Chauffeured Recce Vehicle Included
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 02 3D SETUP DESIGN & SPATIAL PLANNING */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start sm:items-center pb-12 sm:pb-20 border-b border-[#032B24]/10">
            <div className="lg:col-span-3 flex items-center lg:block gap-3">
              <span className="font-serif text-4xl sm:text-6xl text-[#758361] font-light leading-none">02</span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.24em] uppercase text-[#032B24]/60 font-semibold block">
                STEP TWO
              </span>
            </div>

            <div className="lg:col-span-9 space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal text-[#032B24] uppercase tracking-[0.05em] mb-2 sm:mb-4">
                  See Your Wedding in 3D Before Booking
                </h3>
                <p className="font-sans text-sm sm:text-lg text-[#032B24]/85 leading-relaxed font-light mb-4 sm:mb-6">
                  Do not guess how the lawn, ballroom, or stage will look. We create an accurate 3D layout of the exact venue with real measurements—so you can see every table, chair, and flower setup in advance.
                </p>
              </div>

              {/* 3D Visual Layout Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 sm:gap-6 bg-[#FCFAF6] border border-[#032B24]/15 p-5 sm:p-8 shadow-sm">
                <div className="md:col-span-5 relative overflow-hidden min-h-[180px] sm:min-h-[220px] border border-[#032B24]/15 shadow-xs order-2 md:order-1">
                  <img
                    src={spatialImg}
                    alt="Architectural 3D venue spatial layout"
                    className="w-full h-full object-cover filter brightness-[0.98]"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#02201A]/90 backdrop-blur-xs px-2.5 py-1 text-[9px] sm:text-[9.5px] font-sans uppercase tracking-widest text-[#758361] border border-[#758361]/30 text-center font-medium">
                    2D &amp; 3D Floor Plan Visualization
                  </div>
                </div>

                <div className="md:col-span-7 flex flex-col justify-between order-1 md:order-2">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.22em] uppercase text-[#758361] font-bold block mb-1 sm:mb-2">
                      SPATIAL DESIGN &amp; ACCURACY
                    </span>
                    <h4 className="font-serif text-lg sm:text-2xl text-[#032B24] uppercase tracking-wide mb-2 sm:mb-3">
                      Accurate Space Planning with No Hidden Surprises
                    </h4>
                    <p className="text-xs sm:text-sm font-sans text-[#032B24]/80 leading-relaxed font-light mb-3 sm:mb-4">
                      Avoid costly decorator mistakes. We measure walkways, buffet stations, mandap positions, and seating distances so every guest moves comfortably.
                    </p>
                  </div>

                  {/* Mobile Collapsible Inclusions */}
                  <div className="sm:hidden mb-3">
                    <button
                      type="button"
                      onClick={() => toggleStep(2)}
                      className="w-full py-2 px-3 bg-[#F1ECE0] border border-[#758361]/50 text-[11px] font-sans uppercase tracking-wider text-[#032B24] font-semibold flex items-center justify-between cursor-pointer"
                    >
                      <span>{expandedSteps[2] ? 'Hide Inclusions' : '✦ View 3D Checks (Tap to Expand)'}</span>
                      <span className="text-xs">{expandedSteps[2] ? '▲' : '▼'}</span>
                    </button>
                  </div>

                  <div className={`${expandedSteps[2] ? 'block' : 'hidden'} sm:block space-y-1.5 text-xs font-sans text-[#032B24]/80 border-t border-[#032B24]/10 pt-3`}>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" />
                      <span>Stage &amp; Mandap placement checked for best photography</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" />
                      <span>Family and VIP seating layout arranged clearly</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" />
                      <span>Dinner tables and food buffet setup tested for smooth lines</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" />
                      <span>Dance floor, DJ, and stage lights planned without crowding</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 03 GUEST RSVP & ROOM MANAGEMENT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start sm:items-center pb-12 sm:pb-20 border-b border-[#032B24]/10">
            <div className="lg:col-span-3 flex items-center lg:block gap-3">
              <span className="font-serif text-4xl sm:text-6xl text-[#758361] font-light leading-none">03</span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.24em] uppercase text-[#032B24]/60 font-semibold block">
                STEP THREE
              </span>
            </div>

            <div className="lg:col-span-9 space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal text-[#032B24] uppercase tracking-[0.05em] mb-2 sm:mb-4">
                  Know Exact Guest Numbers
                </h3>
                <p className="font-sans text-sm sm:text-lg text-[#032B24]/85 leading-relaxed font-light mb-4 sm:mb-6">
                  Most families waste lakhs on unused hotel rooms and extra food plates. We handle polite, personalized RSVP follow-ups by phone and WhatsApp, so you know exactly who is coming.
                </p>
              </div>

              {/* RSVP Intelligence Box */}
              <div className="bg-[#032B24] text-[#F8F5EE] p-5 sm:p-8 border border-[#758361]/30 shadow-md">
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#758361] font-semibold">
                    REAL WEDDING SAVINGS BREAKDOWN
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStep(3)}
                    className="sm:hidden text-[10px] font-sans uppercase tracking-wider text-[#758361] border border-[#758361]/40 px-2 py-0.5"
                  >
                    {expandedSteps[3] ? 'Show Less' : 'View Real Example'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center mb-4 sm:mb-6">
                  <div className="p-2.5 sm:p-4 border border-[#758361]/30 bg-[#02201A]">
                    <span className="font-serif text-2xl sm:text-4xl text-[#F8F5EE] block font-light">300</span>
                    <span className="text-[9px] sm:text-[11px] font-sans tracking-[0.14em] uppercase text-[#F8F5EE]/70 mt-1 block">
                      Invited
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-4 border border-[#758361] bg-[#073830] relative">
                    <span className="font-serif text-2xl sm:text-4xl text-[#758361] block font-medium">247</span>
                    <span className="text-[9px] sm:text-[11px] font-sans tracking-[0.14em] uppercase text-[#758361] mt-1 block font-semibold">
                      Confirmed
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-4 border border-[#758361]/30 bg-[#02201A]">
                    <span className="font-serif text-2xl sm:text-4xl text-[#758361] block font-light">₹18.5L</span>
                    <span className="text-[9px] sm:text-[11px] font-sans tracking-[0.14em] uppercase text-[#758361] mt-1 block">
                      Money Saved
                    </span>
                  </div>
                </div>

                {/* Real Case Study Paragraph */}
                <div className={`${expandedSteps[3] ? 'block' : 'hidden'} sm:block p-3.5 sm:p-4 bg-[#02201A] border-l-2 border-[#758361] text-xs font-sans text-[#F8F5EE]/80 leading-relaxed`}>
                  <div className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#758361] mb-2 font-medium">
                    Actual Rajasthan Destination Wedding Result:
                  </div>
                  <p>
                    By tracking exact arrival dates 14 days before the wedding, the family released 18 unneeded hotel rooms without penalty and adjusted dinner catering by 53 plates. Total direct savings: ₹18,50,000.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 04 FULL WEDDING DAY MANAGEMENT */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-16 items-start sm:items-center">
            <div className="lg:col-span-3 flex items-center lg:block gap-3">
              <span className="font-serif text-4xl sm:text-6xl text-[#758361] font-light leading-none">04</span>
              <span className="text-[10px] sm:text-xs font-sans tracking-[0.24em] uppercase text-[#032B24]/60 font-semibold block">
                STEP FOUR
              </span>
            </div>

            <div className="lg:col-span-9 space-y-4 sm:space-y-6">
              <div>
                <h3 className="font-serif text-xl sm:text-3xl lg:text-4xl font-normal text-[#032B24] uppercase tracking-[0.05em] mb-2 sm:mb-4">
                  We Run the Entire Wedding Day
                </h3>
                <p className="font-sans text-sm sm:text-lg text-[#032B24]/85 leading-relaxed font-light mb-4 sm:mb-6">
                  Our trained coordinators handle all guest arrivals, hotel check-ins, luggage delivery, car travel, and vendor timings—so you can celebrate without stress.
                </p>
              </div>

              {/* Mobile Collapsible Divisions */}
              <div className="sm:hidden">
                <button
                  type="button"
                  onClick={() => toggleStep(4)}
                  className="w-full py-2.5 px-3 bg-[#FCFAF6] border border-[#758361]/50 text-[11px] font-sans uppercase tracking-wider text-[#032B24] font-semibold flex items-center justify-between cursor-pointer shadow-sm"
                >
                  <span>{expandedSteps[4] ? 'Hide Operational Divisions' : '✦ View 6 Ground Divisions (Tap to Expand)'}</span>
                  <span className="text-xs">{expandedSteps[4] ? '▲' : '▼'}</span>
                </button>
              </div>

              <div className={`${expandedSteps[4] ? 'grid' : 'hidden'} sm:grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4`}>
                {[
                  { label: 'Guests', desc: 'Airport greetings, fast check-in & lobby help desk' },
                  { label: 'Luggage', desc: 'Bags delivered straight to rooms, room keys ready' },
                  { label: 'Family Helpers', desc: 'Dedicated assistants for the bride, groom, and parents' },
                  { label: 'Cars & Travel', desc: 'Chauffeur cars and regular shuttles between venues' },
                  { label: 'Vendors', desc: 'Stage setup, sound checks, photographer timing' },
                  { label: 'Night Support', desc: '24/7 coordinator on duty for late-night guest arrivals' },
                ].map((item) => (
                  <div key={item.label} className="p-3.5 sm:p-4 bg-[#FCFAF6] border border-[#032B24]/10 shadow-xs">
                    <span className="font-serif text-sm sm:text-lg font-semibold text-[#032B24] block mb-1">
                      {item.label}
                    </span>
                    <span className="text-[11px] sm:text-xs font-sans text-[#032B24]/75 leading-normal block font-light">
                      {item.desc}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* ================= WHAT WE DO DIFFERENTLY: THE PRIVATE CLIENT ATELIER ================= */}
        <div className="mt-16 sm:mt-28 p-6 sm:p-10 bg-[#02201A] text-[#F8F5EE] border-2 border-[#758361] shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-[#758361]/30">
              <div>
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#758361] animate-pulse" />
                  <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#758361] font-bold">
                    WHAT WE DO DIFFERENTLY · THE MAISON FOLIO
                  </span>
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F8F5EE] uppercase tracking-[0.06em]">
                  Beyond Standard Event Management
                </h3>
                <p className="font-sans text-xs sm:text-sm text-[#F8F5EE]/75 font-light mt-1 max-w-2xl leading-relaxed">
                  Most event managers only coordinate decorators on the day of. Our private client atelier protects your family&apos;s time, resources, and peace of mind through structured architectural planning and financial stewardship.
                </p>
              </div>

              {/* Quick Tabs to open brochures */}
              <div className="flex flex-wrap items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.('maison')}
                  className="px-3.5 sm:px-4 py-2 bg-[#758361] hover:brightness-110 text-white border border-[#758361] text-[10px] sm:text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer shadow-sm"
                >
                  ✦ Open Maison Folio (PDF)
                </button>
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.('management')}
                  className="px-3.5 sm:px-4 py-2 bg-transparent hover:bg-[#758361]/20 text-[#758361] border border-[#758361]/50 text-[10px] sm:text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-all cursor-pointer"
                >
                  ✦ Event Management (PDF)
                </button>
              </div>
            </div>

            {/* 4 Pillars Comparison Matrix */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
              {[
                {
                  roman: 'PILLAR I',
                  title: 'Curated Venue Acquisition',
                  desc: 'Handpicked heritage palaces with absolute commercial clarity, room inventory, and cutoff dates negotiated before signing.',
                },
                {
                  roman: 'PILLAR II',
                  title: 'Spatial Design & 3D Maps',
                  desc: 'Venue-calibrated 2D/3D visual blueprints for seating, stages, and guest movement before committing decorator budgets.',
                },
                {
                  roman: 'PILLAR III',
                  title: 'Guest Intelligence & RSVPs',
                  desc: 'Precision attendance tracking that eliminates catering plate waste and unnecessary room retention before hotel penalty cutoffs.',
                },
                {
                  roman: 'PILLAR IV',
                  title: 'On-Ground Directing Protocol',
                  desc: 'Senior directors leading vendors with walkie-talkies so your family never has to manage vendors or solve logistical hiccups.',
                },
              ].map((p) => (
                <div key={p.roman} className="p-4 bg-[#032B24] border border-[#758361]/35 shadow-xs flex flex-col justify-between">
                  <div>
                    <span className="text-[9px] font-sans uppercase tracking-widest text-[#758361] font-bold block mb-1">
                      {p.roman}
                    </span>
                    <h4 className="font-serif text-sm sm:text-base text-[#F8F5EE] uppercase tracking-wide mb-2 font-medium">
                      {p.title}
                    </h4>
                    <p className="font-sans text-[11px] text-[#F8F5EE]/75 leading-relaxed font-light">
                      {p.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* The Maison Creed & PDF Downloads Hub */}
            <div className="mt-6 pt-6 border-t border-[#758361]/30 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#032B24] border border-[#758361]/30 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-sans tracking-widest uppercase text-[#758361] font-bold block mb-1">
                    MAISON FOLIO · 4 PAGES
                  </span>
                  <div className="font-serif text-base sm:text-lg text-[#F8F5EE] uppercase tracking-wide">
                    Bespoke Planning &amp; Atelier Standards
                  </div>
                  <p className="font-sans text-xs text-[#F8F5EE]/70 mt-1 font-light leading-relaxed">
                    Review our 7 Atelier Standards, the Guest Intelligence financial model, and private founding consultation protocols.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.('maison')}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-sans text-[#758361] hover:text-white uppercase tracking-wider font-semibold cursor-pointer"
                >
                  <span>View Maison Folio &rarr;</span>
                </button>
              </div>

              <div className="p-4 bg-[#032B24] border border-[#758361]/30 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] font-sans tracking-widest uppercase text-[#758361] font-bold block mb-1">
                    CAPABILITY BROCHURE · 6 PAGES
                  </span>
                  <div className="font-serif text-base sm:text-lg text-[#F8F5EE] uppercase tracking-wide">
                    Event Management &amp; Packages (₹69k+)
                  </div>
                  <p className="font-sans text-xs text-[#F8F5EE]/70 mt-1 font-light leading-relaxed">
                    Complete on-ground coordinator headcounts, family Innova Crysta allocations, and Bronze, Gold, &amp; Platinum delegations.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => onOpenBrochure?.('management')}
                  className="mt-3 inline-flex items-center gap-1.5 text-xs font-sans text-[#758361] hover:text-white uppercase tracking-wider font-semibold cursor-pointer"
                >
                  <span>View Event Management Brochure &rarr;</span>
                </button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
