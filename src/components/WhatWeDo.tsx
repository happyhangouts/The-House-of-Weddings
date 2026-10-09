import React, { useState } from 'react';
import recceImg from '../assets/images/luxury_chauffeured_recce_1791024466143.jpg';
import spatialImg from '../assets/images/venue_spatial_visualization_1790246606080.jpg';

interface WhatWeDoProps {
  onOpenBrochure?: () => void;
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
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#032B24]/75 font-semibold">
              HOW WE HELP YOU
            </span>
            <span className="w-8 h-[1px] bg-[#758361]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#032B24] tracking-[0.06em] sm:tracking-[0.08em] uppercase mb-3 sm:mb-4">
            Four Simple Steps to a Stress-Free Wedding
          </h2>
          <p className="font-sans text-sm sm:text-lg text-[#032B24]/80 font-light max-w-2xl mx-auto">
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
                <div className="md:col-span-7 flex flex-col justify-between order-2 md:order-1">
                  <div>
                    <div className="flex items-center gap-2 mb-2 text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-[#B89248] font-bold">
                      <span>FREE SERVICE</span>
                      <span>·</span>
                      <span>VISIT BEFORE YOU BOOK</span>
                    </div>

                    <h4 className="font-serif text-lg sm:text-2xl text-[#032B24] tracking-wide mb-2">
                      Free Luxury Car for Venue Visits
                    </h4>

                    <p className="text-xs sm:text-[13px] text-[#032B24]/80 font-sans leading-relaxed font-light mb-3 sm:mb-4">
                      Visit your top venue choices in comfort. We arrange a <strong>private chauffeured car</strong> for your family, with our senior wedding planner accompanying you to check the venue together.
                    </p>

                    {/* Mobile Collapsible Inclusions */}
                    <div className="sm:hidden mb-3">
                      <button
                        type="button"
                        onClick={() => toggleStep(1)}
                        className="w-full py-2 px-3 bg-[#F1ECE0] border border-[#758361]/50 text-[11px] font-sans uppercase tracking-wider text-[#032B24] font-semibold flex items-center justify-between cursor-pointer"
                      >
                        <span>{expandedSteps[1] ? 'Hide Car Visit Details' : '✦ View Recce Inclusions (Tap to Expand)'}</span>
                        <span className="text-xs">{expandedSteps[1] ? '▲' : '▼'}</span>
                      </button>
                    </div>

                    <div className={`${expandedSteps[1] ? 'block' : 'hidden'} sm:block space-y-2 text-xs font-sans text-[#032B24]/75`}>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" />
                        <span>Private door-to-door luxury car ride for your family</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" />
                        <span>Direct meetings with senior hotel managers</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" />
                        <span>100% free with zero pressure or booking obligations</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 sm:pt-4 mt-3 sm:mt-4 border-t border-[#032B24]/10">
                    <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.16em] uppercase text-[#B89248] font-semibold">
                      Visit in person before you pay a single rupee.
                    </span>
                  </div>
                </div>

                {/* Picture Container (Visible on Mobile & Desktop) */}
                <div className="md:col-span-5 relative aspect-[16/10] md:aspect-auto min-h-[190px] sm:min-h-[220px] overflow-hidden border border-[#032B24]/10 order-1 md:order-2 shadow-sm">
                  <img
                    src={recceImg}
                    alt="Chauffeured luxury car arrival at wedding palace"
                    className="w-full h-full object-cover object-center filter brightness-[0.96]"
                  />
                  <div className="absolute bottom-2 left-2 right-2 bg-[#02201A]/90 backdrop-blur-sm px-2.5 py-1 text-[9px] sm:text-[9.5px] font-sans uppercase tracking-widest text-[#758361] border border-[#758361]/30 text-center font-medium">
                    Private Luxury Car Included
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 02 SEE YOUR WEDDING IN 3D */}
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
                  See Your Wedding in 3D
                </h3>
                <p className="font-sans text-sm sm:text-lg text-[#032B24]/85 leading-relaxed font-light mb-4 sm:mb-6">
                  See exactly how your wedding stage, mandap, dining area, and guest seating will look inside the actual venue before you spend money on decor.
                </p>
              </div>

              {/* 3D Details + Image Showcase */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 items-center bg-[#FCFAF6] p-5 sm:p-8 border border-[#032B24]/10">
                <div className="order-2 md:order-1">
                  <div className="sm:hidden mb-3">
                    <button
                      type="button"
                      onClick={() => toggleStep(2)}
                      className="w-full py-2 px-3 bg-[#F1ECE0] border border-[#758361]/50 text-[11px] font-sans uppercase tracking-wider text-[#032B24] font-semibold flex items-center justify-between cursor-pointer"
                    >
                      <span>{expandedSteps[2] ? 'Hide 3D Layout Checks' : '✦ View What You See in 3D (Tap to Expand)'}</span>
                      <span className="text-xs">{expandedSteps[2] ? '▲' : '▼'}</span>
                    </button>
                  </div>

                  <div className={`${expandedSteps[2] ? 'block' : 'hidden'} sm:block`}>
                    <div className="text-xs font-sans uppercase tracking-[0.16em] text-[#032B24] font-semibold mb-3">
                      What You Can See in 3D:
                    </div>
                    <ul className="space-y-2 font-sans text-xs sm:text-sm text-[#032B24]/80">
                      <li className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" /> Stage &amp; Mandap placement
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" /> Family and VIP seating layout
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" /> Dinner tables and food buffet setup
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" /> Dance floor, DJ, and stage lights
                      </li>
                      <li className="flex items-center gap-2.5">
                        <span className="w-1.5 h-1.5 bg-[#758361] shrink-0" /> Clear walkway and camera photo angles
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="relative aspect-[16/10] sm:aspect-[4/3] overflow-hidden border border-[#032B24]/15 order-1 md:order-2 shadow-sm">
                  <img
                    src={spatialImg}
                    alt="3D wedding setup layout"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-[#032B24]/10" />
                </div>
              </div>

              <div className="p-3.5 sm:p-4 bg-[#F1ECE0]/70 border-l-2 border-[#758361] text-xs font-sans text-[#032B24]/80 leading-relaxed">
                <span className="font-semibold text-[#032B24] uppercase tracking-wider block mb-0.5">
                  Decor Freedom:
                </span>
                We create this 3D design so you can see everything clearly before hiring decorators. You can share this 3D layout with any decorator.
              </div>
            </div>
          </div>

          {/* 03 KNOW YOUR REAL GUEST COUNT */}
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
                  Know Your Real Guest Count (RSVP)
                </h3>
                <p className="font-sans text-sm sm:text-lg text-[#032B24]/85 leading-relaxed font-light mb-4 sm:mb-6">
                  Our team calls your invited guests to confirm flight timings and room needs—so you only book the rooms and food plates you really need.
                </p>
              </div>

              {/* Concrete RSVP Flow Diagram */}
              <div className="bg-[#032B24] text-[#F8F5EE] p-5 sm:p-8 border border-[#758361]/30 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-[10px] sm:text-[11px] font-sans uppercase tracking-[0.22em] text-[#758361] font-semibold">
                    Real Wedding Example
                  </div>
                  <button
                    type="button"
                    onClick={() => toggleStep(3)}
                    className="sm:hidden text-[10px] font-sans uppercase tracking-wider text-[#758361] border border-[#758361]/40 px-2 py-0.5"
                  >
                    {expandedSteps[3] ? 'Hide Details ▲' : 'View Breakdown ▼'}
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 sm:gap-6 items-center text-center">
                  <div className="p-2.5 sm:p-4 border border-[#F8F5EE]/15">
                    <span className="font-serif text-2xl sm:text-4xl text-[#F8F5EE] block font-light">300</span>
                    <span className="text-[9px] sm:text-[11px] font-sans tracking-[0.14em] uppercase text-[#F8F5EE]/60 mt-1 block">
                      Invited
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-4 border border-[#758361]/30 bg-[#073830] relative">
                    <span className="font-serif text-2xl sm:text-4xl text-[#758361] block font-medium">247</span>
                    <span className="text-[9px] sm:text-[11px] font-sans tracking-[0.14em] uppercase text-[#758361] mt-1 block font-semibold">
                      Confirmed
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-4 border border-[#F8F5EE]/15">
                    <span className="font-serif text-2xl sm:text-4xl text-[#F8F5EE] block font-light">235</span>
                    <span className="text-[9px] sm:text-[11px] font-sans tracking-[0.14em] uppercase text-[#F8F5EE]/70 mt-1 block">
                      Attended
                    </span>
                  </div>
                </div>

                <div className={`${expandedSteps[3] ? 'block' : 'hidden'} sm:block mt-6 pt-5 border-t border-[#F8F5EE]/10`}>
                  <div className="text-[11px] font-sans uppercase tracking-[0.18em] text-[#758361] mb-2 font-medium">
                    Knowing this saves money on:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-sans tracking-wide text-[#F8F5EE]/75">
                    <div>· Unused hotel rooms (cancelled before paying)</div>
                    <div>· Extra food plates &amp; catering bills</div>
                    <div>· Empty airport cars &amp; shuttles</div>
                    <div>· Extra welcome gifts &amp; hampers</div>
                  </div>
                </div>
              </div>

              <div className="pt-1">
                <span className="text-[11px] sm:text-xs font-sans tracking-[0.18em] uppercase text-[#B89248] font-semibold">
                  300 invited doesn&apos;t mean 300 attending. Never pay for empty rooms.
                </span>
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

              {/* Capability Brochure Showcase Banner */}
              <div className="mt-4 p-4 sm:p-6 bg-[#FCFAF6] border border-[#758361]/50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-1 text-[9.5px] sm:text-[11px] font-sans tracking-wider uppercase text-[#B89248] font-bold">
                    <span>CAPABILITY BROCHURE</span>
                    <span>·</span>
                    <span>EDITION 2026</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#032B24]/85 font-sans font-light">
                    See our complete team structure, coordinator roles, and transparent packages starting from ₹69,000+.
                  </p>
                </div>
                <button
                  onClick={onOpenBrochure}
                  type="button"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#032B24] text-[#758361] hover:bg-[#758361] hover:text-[#032B24] border border-[#758361] text-[11px] sm:text-xs font-sans uppercase tracking-[0.16em] font-semibold transition-all shrink-0 cursor-pointer shadow-sm"
                >
                  <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Download Brochure</span>
                </button>
              </div>

              <div className="pt-1">
                <span className="text-[11px] sm:text-xs font-sans tracking-[0.18em] uppercase text-[#B89248] font-semibold">
                  You enjoy every ritual with family. We handle all the work.
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
