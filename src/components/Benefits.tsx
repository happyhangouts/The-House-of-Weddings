import React, { useState } from 'react';

const STANDARDS = [
  {
    num: '01',
    title: 'Stop Overpaying',
    description: 'We check all hotel and vendor bills to make sure you never pay for unneeded rooms, extra food plates, or inflated prices.',
  },
  {
    num: '02',
    title: 'See in 3D Before Paying',
    description: 'Walk through your mandap, stage, dining, and seating layout in 3D so you know exactly what you get before paying decor advances.',
  },
  {
    num: '03',
    title: 'Know Your Real Guest Count',
    description: 'Our team calls your guests to confirm who is attending. You book only the rooms and food plates you actually need.',
  },
  {
    num: '04',
    title: 'Honest Vendor Pricing',
    description: 'Direct vendor prices with zero hidden commissions, secret agent markups, or unexpected surprises on your bill.',
  },
  {
    num: '05',
    title: 'One Dedicated Manager',
    description: 'One experienced wedding manager oversees all 40+ vendors on walkie-talkies so your phone does not ring with problems.',
  },
  {
    num: '06',
    title: 'Enjoy Your Own Wedding',
    description: 'Spend every moment celebrating and taking photos with your loved ones—not running after car keys, luggage, and caterers.',
  },
];

const PACKAGES = [
  {
    badge: 'ESSENTIAL',
    title: 'BRONZE',
    scale: '150 to 250 Guests · 5 to 8 Coordinators',
    fee: '₹69,000+',
    note: 'Smooth guest hospitality & ceremony flow.',
    items: [
      'Guest RSVP & arrival tracking',
      'Airport & train station pickup sync',
      'Lobby check-in & room key distribution',
      'Luggage delivery straight to rooms',
      '1 Couple Shadow (Bride & Groom helper)',
      'Venue shuttles & cars coordination',
      'Ritual items & panditji timing sync',
    ],
    highlight: false,
  },
  {
    badge: 'MOST POPULAR',
    title: 'GOLD',
    scale: '250 to 450 Guests · 8 to 12 Coordinators',
    fee: '₹1,49,000+',
    note: 'Hospitality vendor sync & 1 family Innova Crysta.',
    items: [
      '★ 1 Innova Crysta Car for Family Included',
      '★ Full Vendor Coordination',
      'Airport & station welcome desks',
      '24/7 Hotel lobby help desk',
      'Luggage & welcome hampers to rooms',
      '2 Dedicated Family Shadows',
      'Venue shuttles & car delay tracking',
      'Dinner tables & VIP elder care',
    ],
    highlight: true,
  },
  {
    badge: 'DESTINATION',
    title: 'PLATINUM',
    scale: '400 to 700+ Guests · 12 to 15 Coordinators',
    fee: '₹2,19,000+',
    note: 'Palatial scale, master sync & 2 family Innova Crystas.',
    items: [
      '★ 2 Innova Crysta Cars for Family Included',
      '★ Master Vendor Synchronization',
      'Multi-hotel & resort logistics management',
      'Central Control Room with walkie-talkies',
      '4 Dedicated Shadows (Both Families)',
      'Baraat & saafa procession flow',
      'Continuous venue transit cars & shuttles',
      '24/7 VIP Concierge & doctor on call',
    ],
    highlight: false,
  },
];

export const Benefits: React.FC = () => {
  const [showAllStandards, setShowAllStandards] = useState(false);
  const [expandedPackage, setExpandedPackage] = useState<Record<string, boolean>>({
    GOLD: true, // Default open the most popular Gold tier on mobile
  });

  const togglePackage = (title: string) => {
    setExpandedPackage((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <section id="benefits" className="relative py-16 sm:py-28 bg-[#F1ECE0]/60 text-[#032B24] border-t border-[#032B24]/10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#758361]" />
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#032B24]/75 font-semibold">
              WHY FAMILIES CHOOSE US
            </span>
            <span className="w-8 h-[1px] bg-[#758361]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#032B24] tracking-[0.06em] sm:tracking-[0.08em] uppercase mb-3 sm:mb-4">
            Everything We Take Care Of
          </h2>
          <p className="font-sans text-sm sm:text-lg text-[#032B24]/75 font-light">
            Six simple promises to make your wedding joyful, organized, and stress-free.
          </p>
          <div className="w-16 h-[1px] bg-[#758361] mx-auto mt-5 sm:mt-6" />
        </div>

        {/* Six Simple Benefit Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-10 mb-6 sm:mb-24">
          {STANDARDS.map((s, idx) => {
            // On mobile, hide 04, 05, 06 unless showAllStandards is true
            const isHiddenMobile = idx >= 3 && !showAllStandards;
            return (
              <div
                key={s.title}
                className={`${
                  isHiddenMobile ? 'hidden sm:flex' : 'flex'
                } p-6 sm:p-10 bg-[#FCFAF6] border border-[#032B24]/10 flex-col justify-between transition-colors duration-200 hover:border-[#758361] shadow-xs`}
              >
                <div>
                  <span className="text-xs font-sans tracking-[0.22em] text-[#758361] font-semibold block mb-2 sm:mb-3">
                    {s.num}
                  </span>
                  <h3 className="font-serif text-lg sm:text-2xl font-normal text-[#032B24] uppercase tracking-[0.05em] mb-2 sm:mb-3">
                    {s.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-[15px] text-[#032B24]/80 leading-relaxed font-light">
                    {s.description}
                  </p>
                </div>

                <div className="w-8 h-[1px] bg-[#032B24]/10 mt-5 sm:mt-8" />
              </div>
            );
          })}
        </div>

        {/* Mobile Toggle for Remaining Standards */}
        <div className="sm:hidden text-center mb-16">
          <button
            type="button"
            onClick={() => setShowAllStandards(!showAllStandards)}
            className="w-full py-3 px-4 bg-[#FCFAF6] border border-[#758361]/50 text-xs font-sans uppercase tracking-[0.16em] text-[#032B24] font-semibold flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <span>{showAllStandards ? 'Show Top 3 Standards ▲' : '✦ View All 6 Hospitality Promises ▼'}</span>
          </button>
        </div>

        {/* Wedding Packages Section */}
        <div className="mt-8 sm:mt-16">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <span className="text-[10px] sm:text-[11px] font-sans tracking-wider uppercase text-[#758361] font-bold block mb-1 sm:mb-2">
              TRANSPARENT PACKAGES
            </span>
            <h3 className="font-serif text-xl sm:text-3xl md:text-4xl text-[#032B24] uppercase tracking-wide">
              Wedding Management Packages
            </h3>
            <p className="font-sans text-xs sm:text-sm text-[#032B24]/75 font-light mt-1.5 sm:mt-2">
              Simple, straightforward management fees based on your guest count and celebration scale.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-8">
            {PACKAGES.map((pkg) => {
              const isExpanded = !!expandedPackage[pkg.title];
              return (
                <div
                  key={pkg.title}
                  className={`p-5 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    pkg.highlight
                      ? 'bg-[#FCFAF6] border-2 border-[#758361] shadow-lg relative'
                      : 'bg-[#FCFAF6] border border-[#032B24]/15 shadow-xs'
                  }`}
                >
                  {pkg.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#758361] text-white text-[9px] font-sans font-bold uppercase tracking-wider shadow-sm">
                      {pkg.badge}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                      <span className="text-[9.5px] sm:text-[10px] font-sans uppercase tracking-wider text-[#758361] font-semibold">
                        {pkg.badge}
                      </span>
                    </div>

                    <h4 className="font-serif text-2xl sm:text-3xl font-normal text-[#032B24] tracking-wide mb-1">
                      {pkg.title}
                    </h4>
                    <p className="text-xs font-sans text-[#032B24]/70 mb-3 sm:mb-4 font-light">
                      {pkg.scale}
                    </p>

                    <div className="py-3 sm:py-4 border-y border-[#758361]/30 mb-4 sm:mb-6">
                      <span className="text-[8.5px] sm:text-[9px] font-sans uppercase tracking-wider text-[#758361] font-semibold block mb-0.5">
                        MANAGEMENT FEE
                      </span>
                      <div className="font-serif text-2xl sm:text-4xl font-bold text-[#032B24]">
                        {pkg.fee}
                      </div>
                      <p className="text-[11px] sm:text-xs font-sans italic text-[#032B24]/70 mt-1">
                        {pkg.note}
                      </p>
                    </div>

                    {/* Mobile Tap-To-Expand Inclusions Button */}
                    <div className="sm:hidden mb-4">
                      <button
                        type="button"
                        onClick={() => togglePackage(pkg.title)}
                        className={`w-full py-2 px-3 text-[11px] font-sans uppercase tracking-wider font-semibold flex items-center justify-between border cursor-pointer ${
                          pkg.highlight
                            ? 'bg-[#032B24] text-[#758361] border-[#758361]'
                            : 'bg-[#F1ECE0] text-[#032B24] border-[#032B24]/20'
                        }`}
                      >
                        <span>
                          {isExpanded
                            ? 'Hide Inclusions'
                            : `✦ View ${pkg.items.length} Inclusions (Tap to Expand)`}
                        </span>
                        <span className="text-xs">{isExpanded ? '▲' : '▼'}</span>
                      </button>
                    </div>

                    {/* Inclusions List: Toggleable on mobile, always visible on desktop */}
                    <div className={`${isExpanded ? 'block' : 'hidden'} sm:block space-y-2 text-xs font-sans text-[#032B24]/85`}>
                      <div className="font-bold uppercase tracking-wider text-[10px] text-[#032B24] mb-2">
                        KEY INCLUSIONS:
                      </div>
                      {pkg.items.map((item) => (
                        <div
                          key={item}
                          className={`flex items-start gap-2 ${
                            item.startsWith('★') ? 'font-semibold text-[#032B24]' : ''
                          }`}
                        >
                          <span className="text-[#758361] shrink-0">✓</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-[#032B24]/10">
                    <a
                      href="#enquiry"
                      className={`w-full block text-center py-2.5 text-xs font-sans uppercase tracking-wider font-semibold transition-all ${
                        pkg.highlight
                          ? 'bg-[#032B24] text-[#758361] hover:bg-[#758361] hover:text-[#032B24] border border-[#758361]'
                          : 'bg-transparent text-[#032B24] hover:bg-[#032B24] hover:text-[#758361] border border-[#032B24]/30'
                      }`}
                    >
                      Choose {pkg.title}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
