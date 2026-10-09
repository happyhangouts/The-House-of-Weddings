import React from 'react';
import { useLogo } from './LogoContext';
import staircaseImg from '../assets/images/brochure_team_staircase_1791025615504.jpg';
import palaceImg from '../assets/images/brochure_palace_team_1791025628587.jpg';
import stageImg from '../assets/images/brochure_stage_team_1791025642427.jpg';
import fortImg from '../assets/images/brochure_fort_team_1791025658023.jpg';
import heritageImg from '../assets/images/brochure_heritage_team_1791025675176.jpg';

// Exact photos for the 5 pages
export const BROCHURE_ASSETS = {
  coverStaircase: staircaseImg,
  palaceTeam: palaceImg,
  stageTeam: stageImg,
  fortTeam: fortImg,
  heritageTeam: heritageImg,
};

// Reusable Top Running Header for Pages 2 to 6
const RunningHeader: React.FC<{
  title: string;
  subtitle: string;
}> = ({ title, subtitle }) => {
  const { logoSrc } = useLogo();
  return (
    <div className="flex items-center justify-between pb-3 mb-5 border-b border-[#758361]/30">
      <div className="w-8 h-8 border border-[#758361] overflow-hidden shadow-sm shrink-0 bg-white p-0.5">
        <img
          src={logoSrc}
          alt="HW Logo"
          className="w-full h-full object-contain"
        />
      </div>
      <div className="text-right">
        <div className="text-[8.5px] font-sans font-bold tracking-[0.24em] uppercase text-[#032B24]">
          {title}
        </div>
        <div className="text-[7.5px] font-sans font-medium tracking-[0.2em] uppercase text-[#758361]">
          {subtitle}
        </div>
      </div>
    </div>
  );
};

// Reusable Running Footer for All Pages
const RunningFooter: React.FC<{
  pageText: string;
  pageNum: string;
}> = ({ pageText, pageNum }) => (
  <div className="pt-3 mt-auto border-t border-[#758361]/30 flex items-center justify-between text-[7.5px] font-sans tracking-[0.22em] uppercase">
    <span className="text-[#032B24] font-medium">{pageText}</span>
    <span className="text-[#032B24]/70 font-semibold">{pageNum}</span>
  </div>
);

interface BrochurePageProps {
  id?: string;
  className?: string;
}

// ================= PAGE 1: COVER =================
export const BrochurePage1: React.FC<BrochurePageProps> = ({ id, className = '' }) => {
  const { logoSrc } = useLogo();
  return (
    <div
      id={id}
      className={`w-full max-w-[740px] bg-[#FAF8F3] text-[#032B24] p-5 sm:p-8 flex flex-col justify-between relative box-border overflow-hidden select-none min-h-[920px] shadow-lg ${className}`}
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {/* Elegant Double Framing */}
      <div className="absolute inset-[16px] border border-[#758361] pointer-events-none" />
      <div className="absolute inset-[20px] border border-[#032B24]/25 pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between text-[8px] font-sans tracking-[0.24em] uppercase pt-1 px-1">
        <div className="flex items-center gap-1.5 text-[#032B24] font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-[#758361]" />
          <span>CAPABILITY BROCHURE</span>
        </div>
        <div className="text-[#758361] font-serif tracking-[0.2em]">
          EDITION 2026 · PRIVATE &amp; CONFIDENTIAL
        </div>
      </div>

      {/* Center Title Block */}
      <div className="text-center my-auto flex flex-col items-center">
        {/* Emblem with attached background logo */}
        <div className="w-[96px] h-[96px] border-2 border-[#758361] p-1 shadow-md overflow-hidden mb-3 bg-white">
          <img
            src={logoSrc}
            alt="The House of Weddings by Mubaarqaan"
            className="w-full h-full object-contain"
          />
        </div>

        <div className="text-[7.5px] text-[#758361] mb-2 font-serif">◆</div>

        <div className="text-[8px] font-sans font-bold tracking-[0.26em] uppercase text-[#032B24]/90 mb-2">
          EVENT MANAGEMENT &amp; GUEST HOSPITALITY
        </div>

        <h1 className="font-serif text-[28px] font-bold text-[#032B24] tracking-[0.08em] uppercase mb-2 leading-tight">
          BE A GUEST AT YOUR OWN WEDDING.
        </h1>

        <p className="font-sans text-[11px] text-[#556961] font-light max-w-[480px] leading-relaxed mb-6">
          Thoughtful hospitality. On-time coordination. Zero stress for the family.
        </p>

        {/* Main Staircase Team Photo */}
        <div className="w-full max-w-[660px] aspect-[4/3] border border-[#032B24]/20 shadow-md overflow-hidden relative">
          <img
            src={BROCHURE_ASSETS.coverStaircase}
            alt="The House of Weddings on-ground hospitality team"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Footer */}
      <div className="px-1">
        <RunningFooter
          pageText="THE HOUSE OF WEDDINGS   ·   by MUBAARQAAN"
          pageNum="PAGE 01 OF 06"
        />
      </div>
    </div>
  );
};

// ================= PAGE 2: GUEST HOSPITALITY & CARE =================
export const BrochurePage2: React.FC<BrochurePageProps> = ({ id, className = '' }) => (
  <div
    id={id}
    className={`w-full max-w-[740px] bg-[#FAF8F3] text-[#032B24] p-5 sm:p-8 flex flex-col justify-between relative box-border overflow-hidden select-none min-h-[920px] shadow-lg ${className}`}
    style={{ fontFamily: 'Georgia, serif' }}
  >
    <div className="absolute inset-[16px] border border-[#758361] pointer-events-none" />
    <div className="absolute inset-[20px] border border-[#032B24]/25 pointer-events-none" />

    <RunningHeader title="WHAT WE TAKE CARE OF" subtitle="CORE GUEST SERVICES" />

    {/* Title Section */}
    <div className="mb-4">
      <span className="text-[8.5px] font-sans tracking-[0.22em] uppercase text-[#758361] font-bold block mb-1">
        GUEST EXPERIENCE
      </span>
      <h2 className="font-serif text-[22px] font-bold text-[#032B24] tracking-wide uppercase mb-1">
        GUEST HOSPITALITY &amp; CARE
      </h2>
      <p className="font-serif italic text-[11px] text-[#556961]">
        We look after your guests from arrival to departure, so you can enjoy every moment.
      </p>
    </div>

    {/* Palace Photo */}
    <div className="w-full h-[255px] border border-[#032B24]/20 overflow-hidden mb-5 shadow-sm">
      <img
        src={BROCHURE_ASSETS.palaceTeam}
        alt="Hospitality team at royal Rajasthan palace"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Four Core Pillars */}
    <div className="mb-4">
      <div className="text-[8.5px] font-sans font-bold tracking-[0.22em] uppercase text-[#032B24] mb-3">
        FOUR CORE PILLARS
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        {[
          {
            num: '01',
            title: 'RSVP & GUEST LIST',
            body: 'We confirm attendance, track flight arrival times, manage hotel room bookings, and record special dietary needs before day one.',
            tags: 'ATTENDANCE TRACKING · ROOM ALLOCATIONS · FLIGHT SYNC',
          },
          {
            num: '02',
            title: 'AIRPORT & HOTEL WELCOME',
            body: 'Warm greetings at the airport or station, luggage delivered straight to rooms, fast-track check-in, and welcome gifts.',
            tags: 'AIRPORT GREETINGS · LUGGAGE TO ROOMS · EXPRESS CHECK-IN',
          },
          {
            num: '03',
            title: 'CARS & VENUE TRAVEL',
            body: 'Chauffeur cars, regular shuttles between hotel and wedding venues, live delay tracking and on-time travel for everyone.',
            tags: 'CHAUFFEUR CARS · VENUE SHUTTLES · ON-TIME PICKUPS',
          },
          {
            num: '04',
            title: 'FAMILY & VIP SHADOWS',
            body: 'Personal coordinators assigned to the bride, groom, and parents to assist with schedules, refreshments, attire, and small needs.',
            tags: 'BRIDE & GROOM SHADOWS · PARENT CARE · DAILY TIMELINES',
          },
        ].map((c) => (
          <div
            key={c.num}
            className="p-3.5 bg-[#FCFAF6] border border-[#758361]/40 flex flex-col justify-between h-[152px]"
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-serif text-[11px] font-bold tracking-wide uppercase text-[#032B24]">
                  {c.title}
                </span>
                <span className="font-serif text-[11px] text-[#758361] font-bold">{c.num}</span>
              </div>
              <p className="font-sans text-[9px] text-[#4A5B53] leading-[1.45] font-light">
                {c.body}
              </p>
            </div>
            <div className="pt-2 border-t border-[#032B24]/10 text-[7px] font-sans font-semibold text-[#758361] tracking-wider uppercase">
              {c.tags}
            </div>
          </div>
        ))}
      </div>
    </div>

    <RunningFooter
      pageText="THE HOUSE OF WEDDINGS · EVENT MANAGEMENT & HOSPITALITY"
      pageNum="PAGE 02 OF 06"
    />
  </div>
);

// ================= PAGE 3: ON-GROUND EXECUTION =================
export const BrochurePage3: React.FC<BrochurePageProps> = ({ id, className = '' }) => (
  <div
    id={id}
    className={`w-full max-w-[740px] bg-[#FAF8F3] text-[#032B24] p-5 sm:p-8 flex flex-col justify-between relative box-border overflow-hidden select-none min-h-[920px] shadow-lg ${className}`}
    style={{ fontFamily: 'Georgia, serif' }}
  >
    <div className="absolute inset-[16px] border border-[#758361] pointer-events-none" />
    <div className="absolute inset-[20px] border border-[#032B24]/25 pointer-events-none" />

    <RunningHeader title="EVERY DETAIL HANDLED" subtitle="ON-GROUND OPERATIONS" />

    <div className="mb-4">
      <span className="text-[8.5px] font-sans tracking-[0.22em] uppercase text-[#758361] font-bold block mb-1">
        ON-GROUND EXECUTION
      </span>
      <h2 className="font-serif text-[22px] font-bold text-[#032B24] tracking-wide uppercase mb-1">
        CALM, ORGANIZED, IN CONTROL
      </h2>
      <p className="font-serif italic text-[11px] text-[#556961]">
        One dedicated team working behind the scenes so every event runs smoothly.
      </p>
    </div>

    {/* Stage Team Photo */}
    <div className="w-full h-[255px] border border-[#032B24]/20 overflow-hidden mb-5 shadow-sm">
      <img
        src={BROCHURE_ASSETS.stageTeam}
        alt="Coordinators at luxury wedding floral stage"
        className="w-full h-full object-cover"
      />
    </div>

    {/* Operational Divisions */}
    <div className="mb-4">
      <div className="text-[8.5px] font-sans font-bold tracking-[0.22em] uppercase text-[#032B24] mb-3">
        OPERATIONAL DIVISIONS
      </div>
      <div className="grid grid-cols-2 gap-3.5">
        {[
          {
            num: '05',
            title: 'HELP DESK & CONCIERGE',
            body: 'A friendly lobby desk to answer guest questions, share daily wedding schedules, hand out room keys, and solve any room requests.',
            tags: 'LOBBY HELP DESK · DAILY SCHEDULES · ROOM KEYS & KITS',
          },
          {
            num: '06',
            title: 'FOOD & DINING CARE',
            body: 'Managing buffet and dining timings, reserved table seating for family and elders, and taking care of special dietary requests.',
            tags: 'DINING TIMINGS · RESERVED SEATING · DIETARY CARE',
          },
          {
            num: '07',
            title: '24/7 NIGHT SUPPORT',
            body: 'A coordinator on duty all night for late-night guest arrivals, early morning flights, emergency supplies, and doctor requests.',
            tags: 'ROUND-THE-CLOCK · LATE CHECK-IN · URGENT NEEDS',
          },
          {
            num: '08',
            title: 'EVENT CONTROL ROOM',
            body: 'One central coordination room linking hotel staff, car drivers, security and vendors on walkie-talkies so everything is on time.',
            tags: 'RADIO COMMUNICATION · DRIVER SYNC · INSTANT SUPPORT',
          },
        ].map((c) => (
          <div
            key={c.num}
            className="p-3.5 bg-[#FCFAF6] border border-[#758361]/40 flex flex-col justify-between h-[152px]"
          >
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="font-serif text-[11px] font-bold tracking-wide uppercase text-[#032B24]">
                  {c.title}
                </span>
                <span className="font-serif text-[11px] text-[#758361] font-bold">{c.num}</span>
              </div>
              <p className="font-sans text-[9px] text-[#4A5B53] leading-[1.45] font-light">
                {c.body}
              </p>
            </div>
            <div className="pt-2 border-t border-[#032B24]/10 text-[7px] font-sans font-semibold text-[#758361] tracking-wider uppercase">
              {c.tags}
            </div>
          </div>
        ))}
      </div>
    </div>

    <RunningFooter
      pageText="THE HOUSE OF WEDDINGS · EVENT MANAGEMENT & HOSPITALITY"
      pageNum="PAGE 03 OF 06"
    />
  </div>
);

// ================= PAGE 4: WHY WORK WITH US =================
export const BrochurePage4: React.FC<BrochurePageProps> = ({ id, className = '' }) => (
  <div
    id={id}
    className={`w-full max-w-[740px] bg-[#FAF8F3] text-[#032B24] p-5 sm:p-8 flex flex-col justify-between relative box-border overflow-hidden select-none min-h-[920px] shadow-lg ${className}`}
    style={{ fontFamily: 'Georgia, serif' }}
  >
    <div className="absolute inset-[16px] border border-[#758361] pointer-events-none" />
    <div className="absolute inset-[20px] border border-[#032B24]/25 pointer-events-none" />

    <RunningHeader title="WHY WORK WITH US" subtitle="OUR STANDARDS & TRAVEL" />

    <div className="mb-4">
      <span className="text-[8.5px] font-sans tracking-[0.22em] uppercase text-[#758361] font-bold block mb-1">
        THE HOUSE OF WEDDINGS WAY
      </span>
      <h2 className="font-serif text-[22px] font-bold text-[#032B24] tracking-wide uppercase mb-1">
        MORE THAN COORDINATION. PEACE OF MIND.
      </h2>
      <p className="font-serif italic text-[11px] text-[#556961]">
        Polite, well-trained teams who care for your guests like their own.
      </p>
    </div>

    {/* 4 Standards */}
    <div className="grid grid-cols-2 gap-3.5 mb-5">
      {[
        {
          title: 'POLITE & PROFESSIONAL',
          body: 'Well-groomed, respectful coordinators who greet every guest warmly and help with patience and care.',
        },
        {
          title: 'PROACTIVE CARE',
          body: 'We notice small needs and solve unexpected issues quietly before they become problems for the family.',
        },
        {
          title: 'ONE CONNECTED TEAM',
          body: 'Hotel staff, car drivers, venue teams, and decorators all work together under our single coordination.',
        },
        {
          title: 'ZERO FAMILY STRESS',
          body: 'The bride, groom, and parents can relax, meet relatives, and enjoy every ritual without managing logistics.',
        },
      ].map((s) => (
        <div key={s.title} className="p-3 bg-[#FCFAF6] border border-[#758361]/40">
          <span className="font-serif text-[10.5px] font-bold uppercase text-[#032B24] block mb-1">
            {s.title}
          </span>
          <p className="font-sans text-[8.5px] text-[#4A5B53] leading-relaxed font-light">
            {s.body}
          </p>
        </div>
      ))}
    </div>

    {/* Destination Weddings Strip */}
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <span className="text-[9px] font-serif font-bold uppercase tracking-[0.18em] text-[#032B24]">
          DESTINATION WEDDINGS
        </span>
        <span className="text-[8.5px] font-serif italic text-[#758361]">
          Anywhere Across India &amp; Worldwide
        </span>
      </div>
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { title: 'AIRPORT PICKUPS', desc: 'Cars & Flight Sync' },
          { title: 'HOTEL CHECK-IN', desc: 'Rooms & Luggage' },
          { title: 'VENUE SHUTTLES', desc: 'Continuous Travel' },
          { title: '24/7 GUEST DESK', desc: 'Always Available' },
        ].map((d) => (
          <div key={d.title} className="p-2 bg-[#F1ECE0] border border-[#032B24]/10">
            <span className="font-serif text-[8.5px] font-bold text-[#032B24] uppercase block">
              {d.title}
            </span>
            <span className="text-[7.5px] font-sans text-[#556961]">{d.desc}</span>
          </div>
        ))}
      </div>
    </div>

    {/* Fort Photo */}
    <div className="w-full h-[255px] border border-[#032B24]/20 overflow-hidden mb-4 shadow-sm">
      <img
        src={BROCHURE_ASSETS.fortTeam}
        alt="Hospitality managers at Rajasthan fort"
        className="w-full h-full object-cover"
      />
    </div>

    <RunningFooter
      pageText="THE HOUSE OF WEDDINGS · EVENT MANAGEMENT & HOSPITALITY"
      pageNum="PAGE 04 OF 06"
    />
  </div>
);

// ================= PAGE 5: PACKAGES & INVESTMENT =================
export const BrochurePage5: React.FC<BrochurePageProps> = ({ id, className = '' }) => (
  <div
    id={id}
    className={`w-full max-w-[740px] bg-[#FAF8F3] text-[#032B24] p-5 sm:p-8 flex flex-col justify-between relative box-border overflow-hidden select-none min-h-[920px] shadow-lg ${className}`}
    style={{ fontFamily: 'Georgia, serif' }}
  >
    <div className="absolute inset-[16px] border border-[#758361] pointer-events-none" />
    <div className="absolute inset-[20px] border border-[#032B24]/25 pointer-events-none" />

    <RunningHeader title="PACKAGES & INVESTMENT" subtitle="TRANSPARENT RETAINERS" />

    <div className="mb-4">
      <span className="text-[8.5px] font-sans tracking-[0.22em] uppercase text-[#758361] font-bold block mb-1">
        TRANSPARENT WEDDING PACKAGES
      </span>
      <h2 className="font-serif text-[22px] font-bold text-[#032B24] tracking-wide uppercase mb-1">
        WEDDING PACKAGES &amp; MANAGEMENT TIERS
      </h2>
      <p className="font-serif italic text-[11px] text-[#556961]">
        Straightforward hospitality and management delegations tailored to your guest count and itinerary.
      </p>
    </div>

    {/* 3 Pricing Columns */}
    <div className="grid grid-cols-3 gap-3 mb-5">
      {/* Bronze */}
      <div className="p-3.5 bg-[#FAF8F3] border border-[#032B24]/20 flex flex-col justify-between h-[510px]">
        <div>
          <div className="px-2 py-0.5 bg-[#032B24] text-[7.5px] font-sans uppercase tracking-[0.16em] text-[#758361] font-bold text-center mb-2">
            ESSENTIAL
          </div>
          <h3 className="font-serif text-[15px] font-bold text-[#032B24] uppercase">
            BRONZE
          </h3>
          <p className="text-[9px] font-sans text-[#4A5B53] mb-3">
            150 to 250 Guests<br />
            <em className="text-[8.5px] text-[#718279]">5 to 8 Coordinators</em>
          </p>
          <div className="mb-3">
            <span className="text-[7.5px] font-sans uppercase tracking-wider text-[#758361] font-bold block">
              MANAGEMENT FEE
            </span>
            <span className="font-serif text-[22px] font-bold text-[#032B24]">
              ₹69,000+
            </span>
            <p className="text-[8px] font-sans text-[#4A5B53] italic mt-0.5">
              Smooth guest hospitality &amp; ceremony flow.
            </p>
          </div>
          <div className="pt-2 border-t border-[#758361]/30 space-y-1.5 text-[8.5px] font-sans text-[#032B24]/85">
            <div className="font-bold text-[8px] uppercase tracking-wider text-[#032B24] mb-1">
              KEY INCLUSIONS:
            </div>
            <div>✓ Guest RSVP &amp; arrival tracking</div>
            <div>✓ Airport &amp; station pickup sync</div>
            <div>✓ Lobby check-in &amp; room keys</div>
            <div>✓ Luggage delivery to rooms</div>
            <div>✓ 1 Couple Shadow (Bride &amp; Groom)</div>
            <div>✓ Venue shuttles &amp; cars</div>
            <div>✓ Ritual items &amp; panditji sync</div>
          </div>
        </div>
      </div>

      {/* Gold (Most Popular) */}
      <div className="p-3.5 bg-[#FCFAF6] border-2 border-[#758361] shadow-md flex flex-col justify-between h-[510px] relative">
        <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 px-2.5 py-0.5 bg-[#758361] text-[7.5px] font-sans uppercase tracking-[0.16em] text-white font-bold whitespace-nowrap shadow-sm">
          MOST POPULAR
        </div>
        <div>
          <h3 className="font-serif text-[15px] font-bold text-[#032B24] uppercase mt-1">
            GOLD
          </h3>
          <p className="text-[9px] font-sans text-[#4A5B53] mb-3">
            250 to 450 Guests<br />
            <em className="text-[8.5px] text-[#718279]">8 to 12 Coordinators</em>
          </p>
          <div className="mb-3">
            <span className="text-[7.5px] font-sans uppercase tracking-wider text-[#758361] font-bold block">
              MANAGEMENT FEE
            </span>
            <span className="font-serif text-[22px] font-bold text-[#032B24]">
              ₹1,49,000+
            </span>
            <p className="text-[8px] font-sans text-[#4A5B53] italic mt-0.5">
              Hospitality vendor sync &amp; 1 family Innova Crysta.
            </p>
          </div>
          <div className="pt-2 border-t border-[#758361]/40 space-y-1.5 text-[8.5px] font-sans text-[#032B24]">
            <div className="font-bold text-[8px] uppercase tracking-wider text-[#032B24] mb-1">
              KEY INCLUSIONS:
            </div>
            <div className="font-bold text-[#032B24]">✓ ★ 1 Innova Crysta for Family</div>
            <div className="font-bold text-[#032B24]">✓ ★ Full Vendor Coordination</div>
            <div>✓ Airport &amp; station pickups</div>
            <div>✓ 24/7 Hotel lobby help desk</div>
            <div>✓ Luggage &amp; welcome hampers</div>
            <div>✓ 2 Dedicated Family Shadows</div>
            <div>✓ Venue shuttles &amp; cars</div>
            <div>✓ Dining &amp; VIP table care</div>
          </div>
        </div>
      </div>

      {/* Platinum (Destination) */}
      <div className="p-3.5 bg-[#FAF8F3] border border-[#032B24]/20 flex flex-col justify-between h-[510px]">
        <div>
          <div className="px-2 py-0.5 bg-[#032B24] text-[7.5px] font-sans uppercase tracking-[0.16em] text-[#758361] font-bold text-center mb-2">
            DESTINATION
          </div>
          <h3 className="font-serif text-[15px] font-bold text-[#032B24] uppercase">
            PLATINUM
          </h3>
          <p className="text-[9px] font-sans text-[#4A5B53] mb-3">
            400 to 700+ Guests<br />
            <em className="text-[8.5px] text-[#718279]">12 to 15 Coordinators</em>
          </p>
          <div className="mb-3">
            <span className="text-[7.5px] font-sans uppercase tracking-wider text-[#758361] font-bold block">
              MANAGEMENT FEE
            </span>
            <span className="font-serif text-[22px] font-bold text-[#032B24]">
              ₹2,19,000+
            </span>
            <p className="text-[8px] font-sans text-[#4A5B53] italic mt-0.5">
              Palatial scale, master sync &amp; 2 family Innova Crystas.
            </p>
          </div>
          <div className="pt-2 border-t border-[#758361]/30 space-y-1.5 text-[8.5px] font-sans text-[#032B24]/85">
            <div className="font-bold text-[8px] uppercase tracking-wider text-[#032B24] mb-1">
              KEY INCLUSIONS:
            </div>
            <div className="font-bold text-[#032B24]">✓ ★ 2 Innova Crystas for Family</div>
            <div className="font-bold text-[#032B24]">✓ ★ Master Vendor Synchronization</div>
            <div>✓ Multi-hotel &amp; resort logistics</div>
            <div>✓ Central Control Room desk</div>
            <div>✓ 4 Dedicated Shadows (Both Families)</div>
            <div>✓ Baraat &amp; saafa procession flow</div>
            <div>✓ Continuous venue transit fleet</div>
            <div>✓ 24/7 VIP Concierge &amp; doctor on call</div>
          </div>
        </div>
      </div>
    </div>

    {/* Simple Terms Box */}
    <div className="p-3 bg-[#F1ECE0] border border-[#758361]/30 text-[8.5px] font-sans text-[#032B24] mb-3">
      <div className="flex justify-between items-center mb-1.5">
        <span className="font-serif font-bold text-[9px] uppercase tracking-wider text-[#032B24]">
          SIMPLE TERMS
        </span>
        <span className="font-serif italic text-[8px] text-[#758361]">
          Transparent retainers · No hidden fees
        </span>
      </div>
      <div className="grid grid-cols-3 gap-3 text-[8px] font-light leading-relaxed">
        <div>
          <strong className="font-semibold block text-[#032B24]">Payments:</strong>
          30% advance, 50% month prior, 20% on completion
        </div>
        <div>
          <strong className="font-semibold block text-[#032B24]">Travel &amp; Stay:</strong>
          Outstation travel &amp; stay for deployed team by client.
        </div>
        <div>
          <strong className="font-semibold block text-[#032B24]">Vendor Sync:</strong>
          Decorators, sound, photo &amp; makeup synced to ritual timings.
        </div>
      </div>
    </div>

    <RunningFooter
      pageText="THE HOUSE OF WEDDINGS · EVENT MANAGEMENT & HOSPITALITY"
      pageNum="PAGE 05 OF 06"
    />
  </div>
);

// ================= PAGE 6: OUR PROMISE & TEAM =================
export const BrochurePage6: React.FC<BrochurePageProps> = ({ id, className = '' }) => {
  const { logoSrc } = useLogo();
  return (
    <div
      id={id}
      className={`w-full max-w-[740px] bg-[#FAF8F3] text-[#032B24] p-5 sm:p-8 flex flex-col justify-between relative box-border overflow-hidden select-none min-h-[920px] shadow-lg ${className}`}
      style={{ fontFamily: 'Georgia, serif' }}
    >
      <div className="absolute inset-[16px] border border-[#758361] pointer-events-none" />
      <div className="absolute inset-[20px] border border-[#032B24]/25 pointer-events-none" />

      <RunningHeader title="OUR PROMISE & TEAM" subtitle="HOSPITALITY MANAGEMENT" />

      {/* Section Title */}
      <div className="mb-3 text-center">
        <span className="text-[8.5px] font-sans tracking-[0.22em] uppercase text-[#758361] font-bold block mb-1">
          THE COMMITMENT
        </span>
        <h2 className="font-serif text-[22px] font-bold text-[#032B24] tracking-wide uppercase mb-3">
          OUR PROMISE TO YOU
        </h2>
        <div className="p-4 bg-[#FCFAF6] border-l-2 border-[#758361] border-y border-r border-[#032B24]/10 max-w-[620px] mx-auto text-[12px] font-serif italic text-[#032B24] leading-relaxed">
          &ldquo;A wedding is once in a lifetime. Our promise is simple: we look after every guest, every car, and every detail with genuine warmth and care — so you and your family can truly be guests at your own wedding.&rdquo;
        </div>
      </div>

      {/* Hospitality Specialists Strip */}
      <div className="text-center mb-3">
        <div className="flex items-center justify-center gap-3 mb-1.5">
          <span className="font-serif text-[11px] font-bold tracking-wider uppercase text-[#032B24]">
            OUR ON-GROUND HOSPITALITY TEAM
          </span>
          <span className="font-serif italic text-[10px] text-[#758361]">
            Trained Event Specialists
          </span>
        </div>
        <div className="text-[8px] font-sans font-semibold uppercase text-[#032B24]/80 tracking-[0.16em]">
          PERSONAL SHADOWS &nbsp;·&nbsp; CHAUFFEUR DRIVERS &nbsp;·&nbsp; LOBBY HELP DESK &nbsp;·&nbsp; GUEST RELATIONS &nbsp;·&nbsp; DINING SUPPORT
        </div>
      </div>

      {/* Heritage Hotel Photo */}
      <div className="w-full h-[255px] border border-[#032B24]/20 overflow-hidden mb-4 shadow-sm">
        <img
          src={BROCHURE_ASSETS.heritageTeam}
          alt="Hospitality specialists outside heritage facade"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Center Final Emblem & Tagline with exact attached logo and requested contact info */}
      <div className="text-center mb-2 flex flex-col items-center">
        <div className="w-[76px] h-[76px] border-2 border-[#758361] p-1 shadow-md overflow-hidden mb-2 bg-white">
          <img
            src={logoSrc}
            alt="The House of Weddings by Mubaarqaan"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="font-serif text-[13px] font-bold tracking-[0.16em] uppercase text-[#032B24] mb-1.5">
          BE A GUEST AT YOUR OWN WEDDING.
        </div>
        <div className="text-[8px] sm:text-[8.5px] font-sans text-[#032B24]/90 space-y-0.5 tracking-wide">
          <div>Direct Concierge Inquiries: +91 88008 43189 | Email: bookings@mubaarqaan.com</div>
          <div>Instagram: @mubaarqaan | Website: www.mubaarqaan.com</div>
        </div>
      </div>

      <RunningFooter
        pageText="THE HOUSE OF WEDDINGS · EVENT MANAGEMENT & HOSPITALITY"
        pageNum="PAGE 06 OF 06"
      />
    </div>
  );
};
