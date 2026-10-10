import React, { useState, useEffect, useRef, useCallback } from 'react';
import royalPalaceImg from '../assets/images/royal_palace_wedding_1790676652108.jpg';
import desertPalaceImg from '../assets/images/desert_palace_wedding_1790676700419.jpg';
import goaBeachImg from '../assets/images/goa_luxury_beach_mandap_1790678121917.jpg';

export interface ClientStory {
  id: string;
  couple: string;
  venue: string;
  location: string;
  scale: string;
  savingsTitle: string;
  savingsAmount: string;
  quote: string;
  attribution: string;
  image: string;
  tags: string[];
  keyWins: string[];
}

const STORIES: ClientStory[] = [
  {
    id: 'udaipur-palace',
    couple: 'Aanya & Devraj Singhania',
    venue: 'Jagmandir Island & City Palace',
    location: 'Udaipur, Rajasthan',
    scale: '3 Days · 450 Guests · Palace Wedding',
    savingsTitle: 'Money Saved With Our Planning',
    savingsAmount: '₹46,00,000',
    quote:
      'The House of Weddings took care of everything like our own family. Every hotel contract was checked, the 3D designs let us see our mandap months in advance, and all our guests received royal care. We could truly be guests at our own wedding.',
    attribution: 'Aanya & Devraj (Bride & Groom) and Vikram Singhania (Father of Bride)',
    image: royalPalaceImg,
    tags: ['Palace Wedding', '3D Mandap Design', 'VIP Guest Care'],
    keyWins: [
      'Checked hotel contract and cancelled 60 unneeded rooms before paying',
      'Bought fresh flowers directly from farms, saving heavy vendor markups',
      'Private cars for all guest pickups at Udaipur airport',
    ],
  },
  {
    id: 'jodhpur-fort',
    couple: 'Tara & Kabir Mehra',
    venue: 'Umaid Bhawan & Mehrangarh Fort',
    location: 'Jodhpur, Rajasthan',
    scale: '4 Days · 380 Guests · Royal Sangeet & Fort Dinner',
    savingsTitle: 'Money Saved With Our Planning',
    savingsAmount: '₹58,50,000',
    quote:
      'When you invite families and friends from all over India, smooth management is everything. The House of Weddings cut down huge vendor overcharges and gave us a wedding more beautiful than we imagined—with zero stress for our parents.',
    attribution: 'Tara & Kabir Mehra',
    image: desertPalaceImg,
    tags: ['Historical Fort', 'Real RSVP Tracking', 'Honest Vendor Rates'],
    keyWins: [
      'Checked sound and light vendor quotes line-by-line, saving ₹24 Lakhs',
      'Real RSVP tracking cut 140 extra food plates per function',
      'Smoothly managed all special permissions for the royal fort dinner',
    ],
  },
  {
    id: 'goa-coastal-resort',
    couple: 'Rhea & Siddharth Varma',
    venue: 'ITC Grand Goa & Beachfront Lawn',
    location: 'South Goa, India',
    scale: '3 Days · 280 Guests · Beach Mandap & Sunset Sangeet',
    savingsTitle: 'Money Saved With Our Planning',
    savingsAmount: '₹38,50,000',
    quote:
      'Having 280 relatives and friends fly into Goa could easily have become chaos. The House of Weddings handled all airport arrivals smoothly, negotiated great room deals with the resort, and designed a breathtaking sunset mandap. Pure luxury without wasting money.',
    attribution: 'Rhea & Siddharth Varma',
    image: goaBeachImg,
    tags: ['Goa Resort Buyout', 'Direct Resort Rates', 'Airport Concierge'],
    keyWins: [
      'Negotiated directly with the resort to get free suite upgrades for the family',
      'Continuous luxury shuttles between guest rooms and wedding venues',
      'Help desk in the hotel lobby taking care of all guest needs and luggage',
    ],
  },
];

interface ClientStoriesProps {
  onPlanClick: () => void;
}

export const ClientStories: React.FC<ClientStoriesProps> = ({ onPlanClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const current = STORIES[currentIndex];

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === STORIES.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (isPaused) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }

    autoPlayRef.current = setInterval(() => {
      nextSlide();
    }, 7000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [isPaused, nextSlide]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(null);
    setTouchEnd(null);
  };

  return (
    <section
      id="client-stories"
      className="relative py-24 sm:py-32 bg-[#02201A] text-[#F8F5EE] overflow-hidden border-t border-[#758361]/30"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background Subtle Warm Backlight */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-[#758361]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-[500px] h-[500px] bg-[#032B24]/80 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="w-10 h-[1px] bg-[#758361]" />
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#758361] font-semibold">
              REAL CLIENT STORIES
            </span>
            <span className="w-10 h-[1px] bg-[#758361]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-normal text-[#F8F5EE] tracking-[0.08em] uppercase mb-5 leading-tight">
            Couples We&apos;ve Helped in India
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#F8F5EE]/80 font-light max-w-2xl mx-auto leading-relaxed">
            Real weddings planned across India&apos;s best palaces and resorts, where families saved lakhs and enjoyed every moment.
          </p>
          <div className="w-20 h-[1px] bg-[#758361]/40 mx-auto mt-6" />
        </div>

        {/* Carousel Card Container */}
        <div className="relative bg-[#032B24]/90 border border-[#758361]/30 shadow-[0_25px_60px_rgba(0,0,0,0.6)] backdrop-blur-sm overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
            
            {/* Visual Photography Column */}
            <div className="lg:col-span-6 relative min-h-[340px] lg:min-h-full overflow-hidden group">
              <img
                key={current.id}
                src={current.image}
                alt={current.couple}
                className="w-full h-full object-cover object-center filter brightness-[0.88] contrast-[1.05] transition-all duration-700 ease-out group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#02201A] via-transparent to-black/30 lg:bg-gradient-to-r lg:from-transparent lg:via-[#032B24]/40 lg:to-[#032B24]" />

              {/* Destination Tagline Overlay */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 bg-[#02201A]/85 backdrop-blur-md px-3.5 py-1.5 border border-[#758361]/30 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#758361] animate-pulse" />
                  <span className="text-[10px] tracking-wider uppercase font-sans text-[#758361]">
                    {current.location}
                  </span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-[#F8F5EE] tracking-wide">
                  {current.venue}
                </h4>
                <p className="text-xs text-[#F8F5EE]/70 font-sans tracking-wider mt-0.5 font-light">
                  {current.scale}
                </p>
              </div>

              {/* Slide Counter on Image */}
              <div className="absolute top-6 left-6 font-serif text-sm tracking-widest text-[#758361] bg-[#02201A]/90 px-3 py-1 border border-[#758361]/30">
                0{currentIndex + 1} / 0{STORIES.length}
              </div>
            </div>

            {/* Editorial Content Column */}
            <div className="lg:col-span-6 p-6 sm:p-10 lg:p-14 flex flex-col justify-between relative bg-gradient-to-b from-[#032B24] to-[#02201A]">
              <div>
                {/* Couple Name & Simple Tags */}
                <div className="flex flex-wrap items-center gap-2 mb-4 text-[10px] uppercase tracking-wider font-sans text-[#758361]">
                  {current.tags.map((tag, idx) => (
                    <React.Fragment key={tag}>
                      <span>{tag}</span>
                      {idx < current.tags.length - 1 && <span className="text-[#758361]/40">·</span>}
                    </React.Fragment>
                  ))}
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#F8F5EE] tracking-[0.06em] uppercase mb-4">
                  {current.couple}
                </h3>

                {/* Savings Box */}
                <div className="my-6 p-4 sm:p-5 bg-[#02201A] border-l-2 border-[#758361] border-y border-r border-[#758361]/20">
                  <span className="text-[10px] uppercase font-sans tracking-wider text-[#758361] block mb-1 font-semibold">
                    {current.savingsTitle}
                  </span>
                  <div className="flex items-baseline gap-3">
                    <span className="font-serif text-2xl sm:text-3xl text-[#758361] font-medium tracking-wide">
                      {current.savingsAmount}
                    </span>
                    <span className="text-xs text-[#F8F5EE]/65 font-sans font-light">
                      Verified savings on hotel rooms, catering, and decor
                    </span>
                  </div>
                </div>

                {/* Testimonial Quote */}
                <div className="relative mb-6">
                  <span className="absolute -top-4 -left-2 text-4xl sm:text-5xl font-serif text-[#758361]/20 select-none pointer-events-none">
                    “
                  </span>
                  <p className="font-sans text-sm sm:text-base text-[#F8F5EE]/90 leading-relaxed font-light italic pl-4 border-l border-[#758361]/20">
                    &ldquo;{current.quote}&rdquo;
                  </p>
                  <p className="text-xs font-serif tracking-wider uppercase text-[#758361] mt-3 pl-4">
                    — {current.attribution}
                  </p>
                </div>

                {/* Key Execution Milestones */}
                <div className="space-y-2 mt-4 pt-4 border-t border-[#758361]/15">
                  <span className="text-[10px] uppercase font-sans tracking-wider text-[#758361] block mb-2 font-semibold">
                    How We Made It Happen:
                  </span>
                  {current.keyWins.map((win, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs text-[#F8F5EE]/80 font-light">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#758361] mt-1.5 shrink-0" />
                      <span>{win}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Navigation Controls Bar */}
              <div className="pt-8 mt-6 border-t border-[#758361]/15 flex items-center justify-between">
                {/* Thumbnails */}
                <div className="flex items-center gap-2">
                  {STORIES.map((story, idx) => (
                    <button
                      key={story.id}
                      onClick={() => goToSlide(idx)}
                      className={`h-1.5 transition-all cursor-pointer ${
                        currentIndex === idx ? 'w-8 bg-[#758361]' : 'w-2 bg-[#F8F5EE]/30 hover:bg-[#758361]/60'
                      }`}
                      aria-label={`Go to story ${idx + 1}`}
                    />
                  ))}
                </div>

                {/* Prev / Next Buttons & Action CTA */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous story"
                    className="p-2 border border-[#758361]/30 hover:border-[#758361] text-[#758361] hover:text-[#032B24] hover:bg-[#758361] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>

                  <button
                    onClick={nextSlide}
                    aria-label="Next story"
                    className="p-2 border border-[#758361]/30 hover:border-[#758361] text-[#758361] hover:text-[#032B24] hover:bg-[#758361] transition-colors cursor-pointer"
                  >
                    <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  <button
                    onClick={onPlanClick}
                    type="button"
                    className="ml-2 px-4 py-2 bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] text-white text-xs font-sans uppercase tracking-wider font-semibold hover:brightness-110 border border-[#758361] transition-all cursor-pointer whitespace-nowrap"
                  >
                    Plan Your Wedding
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
