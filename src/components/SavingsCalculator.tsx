import React, { useState } from 'react';

export const formatINR = (val: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(val);
};

interface Preset {
  label: string;
  invited: number;
  expected: number;
  venueType: 'resort' | 'palace' | 'fort';
  rooms: number;
  neededRooms: number;
}

const PRESETS: Preset[] = [
  {
    label: 'Intimate Heritage (180 Guests)',
    invited: 220,
    expected: 180,
    venueType: 'resort',
    rooms: 80,
    neededRooms: 65,
  },
  {
    label: 'Grand Royal (320 Guests)',
    invited: 400,
    expected: 320,
    venueType: 'palace',
    rooms: 140,
    neededRooms: 110,
  },
  {
    label: 'Palatial Destination (500+ Guests)',
    invited: 650,
    expected: 510,
    venueType: 'fort',
    rooms: 220,
    neededRooms: 170,
  },
];

export const SavingsCalculator: React.FC = () => {
  const [invitedGuests, setInvitedGuests] = useState<number>(380);
  const [attendanceRate, setAttendanceRate] = useState<number>(78); // 78% average in Indian destination weddings
  const [venueTier, setVenueTier] = useState<'resort' | 'palace' | 'fort'>('palace');
  const [functionsCount, setFunctionsCount] = useState<number>(3);
  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);

  // Derived rates based on venue tier
  const venueRates = {
    resort: { meal: 3500, room: 14000, name: 'Luxury Resort & Coastal Lawn' },
    palace: { meal: 5000, room: 20000, name: 'Heritage Palace & Grand Haveli' },
    fort: { meal: 7500, room: 28000, name: 'Historical Fort & Royal Palace Buyout' },
  }[venueTier];

  const [customMeal, setCustomMeal] = useState<number | null>(null);
  const [customRoom, setCustomRoom] = useState<number | null>(null);

  const mealCost = customMeal ?? venueRates.meal;
  const roomCost = customRoom ?? venueRates.room;

  // Real calculations
  const expectedGuests = Math.round((invitedGuests * attendanceRate) / 100);
  const guestDiff = Math.max(0, invitedGuests - expectedGuests);

  // Room estimate: roughly 1 room per 2.4 guests
  const estimatedInitialRooms = Math.round(invitedGuests / 2.3);
  const estimatedActualRooms = Math.round(expectedGuests / 2.4);
  const roomDiff = Math.max(0, estimatedInitialRooms - estimatedActualRooms);

  const mealSavings = guestDiff * mealCost * functionsCount;
  const roomSavings = roomDiff * roomCost;
  const transportSavings = guestDiff * 1800; // Average ₹1800 airport transfer / local logistics per non-attending guest

  const totalSavings = mealSavings + roomSavings + transportSavings;

  // Recommended Package based on expected guests
  const packageMatch =
    expectedGuests < 250
      ? {
          tier: 'BRONZE',
          fee: '₹69,000+',
          team: '5 to 8 Coordinators',
          innova: 'Complimentary Venue Recce Car',
          shadows: '1 Couple Shadow',
          tag: 'ESSENTIAL',
        }
      : expectedGuests <= 450
      ? {
          tier: 'GOLD',
          fee: '₹1,49,000+',
          team: '8 to 12 Coordinators',
          innova: '1 Innova Crysta for Family Included',
          shadows: '2 Dedicated Family Shadows',
          tag: 'MOST POPULAR ★',
        }
      : {
          tier: 'PLATINUM',
          fee: '₹2,19,000+',
          team: '12 to 15 Coordinators',
          innova: '2 Innova Crystas for Family Included',
          shadows: '4 Dedicated Shadows (Both Families)',
          tag: 'DESTINATION SCALE',
        };

  const applyPreset = (preset: Preset) => {
    setInvitedGuests(preset.invited);
    setAttendanceRate(Math.round((preset.expected / preset.invited) * 100));
    setVenueTier(preset.venueType);
    setCustomMeal(null);
    setCustomRoom(null);
  };

  return (
    <section id="calculator" className="relative py-16 sm:py-28 bg-[#F8F5EE] text-[#032B24] border-t border-[#032B24]/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#758361]" />
            <span className="text-[10px] sm:text-[11px] font-sans tracking-[0.24em] uppercase text-[#032B24]/75 font-semibold">
              GUEST &amp; BUDGET OPTIMIZER
            </span>
            <span className="w-8 h-[1px] bg-[#758361]" />
          </div>
          <h2 className="font-serif text-2xl sm:text-4xl md:text-5xl font-normal text-[#032B24] tracking-[0.06em] sm:tracking-[0.08em] uppercase mb-3 sm:mb-4">
            See How Much Money You Save
          </h2>
          <p className="font-sans text-sm sm:text-lg text-[#032B24]/80 font-light max-w-2xl mx-auto">
            Accurate RSVP attendance tracking and hotel room management saves lakhs on plates, unneeded rooms, and empty cars.
          </p>
          <div className="w-16 h-[1px] bg-[#758361] mx-auto mt-4 sm:mt-6" />
        </div>

        {/* Quick Presets Strip */}
        <div className="mb-6 sm:mb-8">
          <span className="text-[10px] font-sans uppercase tracking-[0.2em] text-[#B89248] font-bold block text-center mb-3">
            Select a Wedding Scale Preset:
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => applyPreset(p)}
                className="px-3.5 sm:px-4 py-2 bg-[#FCFAF6] hover:bg-[#032B24] hover:text-[#758361] border border-[#758361]/50 text-xs font-sans font-medium transition-all cursor-pointer shadow-xs"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Main Interactive Workspace Card */}
        <div className="bg-[#FCFAF6] border border-[#758361]/40 shadow-xl overflow-hidden">
          
          {/* Top Half: Sliders & Controls */}
          <div className="p-6 sm:p-10 border-b border-[#758361]/25">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              
              {/* Slider 1: Total Invited */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-sans uppercase tracking-wider text-[#032B24] font-semibold">
                    Invited Guests
                  </label>
                  <span className="font-serif text-xl sm:text-2xl text-[#032B24] font-bold tabular-nums">
                    {invitedGuests}
                  </span>
                </div>
                <input
                  type="range"
                  min="80"
                  max="900"
                  step="10"
                  value={invitedGuests}
                  onChange={(e) => setInvitedGuests(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#032B24]/20 accent-[#032B24] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-sans text-[#032B24]/60">
                  <span>80 Guests</span>
                  <span>900 Guests</span>
                </div>
              </div>

              {/* Slider 2: Verified RSVP Attendance */}
              <div className="space-y-2">
                <div className="flex justify-between items-baseline">
                  <label className="text-xs font-sans uppercase tracking-wider text-[#032B24] font-semibold">
                    RSVP Attendance
                  </label>
                  <span className="font-serif text-xl sm:text-2xl text-[#032B24] font-bold tabular-nums">
                    {attendanceRate}% <span className="text-xs font-sans font-normal text-[#B89248]">({expectedGuests})</span>
                  </span>
                </div>
                <input
                  type="range"
                  min="60"
                  max="95"
                  step="1"
                  value={attendanceRate}
                  onChange={(e) => setAttendanceRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-[#032B24]/20 accent-[#032B24] cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-sans text-[#032B24]/60">
                  <span>60% (Cautious)</span>
                  <span>95% (High)</span>
                </div>
              </div>

              {/* Selector 3: Venue Category */}
              <div className="space-y-2">
                <label className="text-xs font-sans uppercase tracking-wider text-[#032B24] font-semibold block">
                  Venue Tier
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {(['resort', 'palace', 'fort'] as const).map((vt) => (
                    <button
                      key={vt}
                      type="button"
                      onClick={() => {
                        setVenueTier(vt);
                        setCustomMeal(null);
                        setCustomRoom(null);
                      }}
                      className={`py-2 px-1 text-[11px] font-sans uppercase tracking-wider font-semibold border transition-all cursor-pointer text-center ${
                        venueTier === vt
                          ? 'bg-[#032B24] text-[#758361] border-[#032B24]'
                          : 'bg-[#F8F5EE] text-[#032B24]/75 border-[#032B24]/15 hover:border-[#032B24]/40'
                      }`}
                    >
                      {vt === 'resort' ? 'Resort' : vt === 'palace' ? 'Palace' : 'Fort'}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] font-sans text-[#032B24]/60 block truncate">
                  {venueRates.name}
                </span>
              </div>

            </div>

            {/* Advanced Toggle */}
            <div className="mt-6 pt-4 border-t border-[#032B24]/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowAdvanced(!showAdvanced)}
                className="text-xs font-sans tracking-wider uppercase text-[#B89248] hover:text-[#032B24] font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <span>{showAdvanced ? 'Hide Pricing Customizer' : '✦ Customize Room & Food Plate Rates'}</span>
                <span>{showAdvanced ? '▲' : '▼'}</span>
              </button>

              <div className="text-xs font-sans text-[#032B24]/70">
                {functionsCount} Functions · ~{estimatedActualRooms} Rooms needed
              </div>
            </div>

            {/* Advanced Expanded Inputs */}
            {showAdvanced && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-4 p-4 bg-[#F1ECE0]/50 border border-[#758361]/30 text-xs">
                <div>
                  <label className="block font-sans font-semibold text-[#032B24] mb-1">
                    Food Plate: {formatINR(mealCost)}
                  </label>
                  <input
                    type="range"
                    min="2000"
                    max="10000"
                    step="500"
                    value={mealCost}
                    onChange={(e) => setCustomMeal(Number(e.target.value))}
                    className="w-full h-1 bg-[#032B24]/20 accent-[#032B24]"
                  />
                </div>
                <div>
                  <label className="block font-sans font-semibold text-[#032B24] mb-1">
                    Room Rate/Night: {formatINR(roomCost)}
                  </label>
                  <input
                    type="range"
                    min="6000"
                    max="35000"
                    step="1000"
                    value={roomCost}
                    onChange={(e) => setCustomRoom(Number(e.target.value))}
                    className="w-full h-1 bg-[#032B24]/20 accent-[#032B24]"
                  />
                </div>
                <div>
                  <label className="block font-sans font-semibold text-[#032B24] mb-1">
                    Functions: {functionsCount}
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="6"
                    step="1"
                    value={functionsCount}
                    onChange={(e) => setFunctionsCount(Number(e.target.value))}
                    className="w-full h-1 bg-[#032B24]/20 accent-[#032B24]"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Bottom Half: Glowing Grand Savings Hero & Matched Tier */}
          <div className="bg-[#032B24] text-[#F8F5EE] p-6 sm:p-10 lg:p-12 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              {/* Left Column: Huge Total Savings Number */}
              <div className="lg:col-span-7 space-y-4 text-center lg:text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#073830] border border-[#758361]/30 text-[10px] font-sans tracking-[0.2em] uppercase text-[#758361] font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#758361] animate-pulse" />
                  <span>TOTAL ESTIMATED MONEY SAVED</span>
                </div>

                <div className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#758361] font-bold tracking-tight">
                  {formatINR(totalSavings)}
                </div>

                <p className="text-xs sm:text-sm text-[#F8F5EE]/80 font-sans font-light max-w-lg">
                  Prevented by cancelling {roomDiff} unneeded rooms before hotel cutoffs, saving {guestDiff} catering plates per function, and eliminating empty airport cars.
                </p>

                {/* 3 Metric Cards */}
                <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-3">
                  <div className="p-2.5 sm:p-3 bg-[#02201A] border border-[#758361]/20 text-center">
                    <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-wider text-[#758361] block font-semibold">
                      Food Plates
                    </span>
                    <span className="font-serif text-sm sm:text-lg text-[#F8F5EE] font-bold block mt-0.5">
                      {formatINR(mealSavings)}
                    </span>
                    <span className="text-[9px] text-[#F8F5EE]/60 font-light hidden sm:block">
                      {guestDiff} plates saved
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-[#02201A] border border-[#758361]/20 text-center">
                    <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-wider text-[#758361] block font-semibold">
                      Hotel Rooms
                    </span>
                    <span className="font-serif text-sm sm:text-lg text-[#F8F5EE] font-bold block mt-0.5">
                      {formatINR(roomSavings)}
                    </span>
                    <span className="text-[9px] text-[#F8F5EE]/60 font-light hidden sm:block">
                      {roomDiff} rooms cut
                    </span>
                  </div>

                  <div className="p-2.5 sm:p-3 bg-[#02201A] border border-[#758361]/20 text-center">
                    <span className="text-[9px] sm:text-[10px] uppercase font-sans tracking-wider text-[#758361] block font-semibold">
                      Transit &amp; Cars
                    </span>
                    <span className="font-serif text-sm sm:text-lg text-[#F8F5EE] font-bold block mt-0.5">
                      {formatINR(transportSavings)}
                    </span>
                    <span className="text-[9px] text-[#F8F5EE]/60 font-light hidden sm:block">
                      Zero idle cars
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Matched Package Card */}
              <div className="lg:col-span-5 bg-[#02201A] border-2 border-[#758361] p-5 sm:p-6 shadow-2xl relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 bg-[#758361] text-white text-[9px] font-sans font-bold uppercase tracking-wider shadow-sm">
                  {packageMatch.tag}
                </div>

                <div className="text-center mb-3">
                  <span className="text-[9.5px] font-sans uppercase tracking-[0.2em] text-[#758361] block font-semibold">
                    RECOMMENDED DELEGATION TIER
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F5EE] mt-0.5">
                    {packageMatch.tier} TIER
                  </h3>
                  <div className="font-serif text-xl sm:text-2xl text-[#758361] font-semibold mt-1">
                    {packageMatch.fee}
                  </div>
                </div>

                <div className="space-y-2 text-xs font-sans text-[#F8F5EE]/85 py-3 border-y border-[#758361]/20">
                  <div className="flex items-center gap-2">
                    <span className="text-[#758361]">✓</span>
                    <span><strong>{packageMatch.team}</strong> on walkie-talkies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#758361]">✓</span>
                    <span>{packageMatch.innova}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#758361]">✓</span>
                    <span>{packageMatch.shadows}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[#758361]">✓</span>
                    <span>Live RSVP sync &amp; guest airport concierges</span>
                  </div>
                </div>

                <a
                  href="#enquiry"
                  className="mt-4 w-full block text-center py-3 bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] hover:brightness-110 text-white font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-md border border-[#758361]"
                >
                  Plan With {packageMatch.tier} Tier &rarr;
                </a>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
