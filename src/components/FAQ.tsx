import React, { useState } from 'react';
import { CONTACT_INFO } from '../config/contact';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
  highlight?: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Free Venue Visit Ride',
    question: 'How does the Free Luxury Car for venue visits work?',
    answer:
      'Before you book any hotel or pay advances, we want you to see your top shortlisted venues in person. We provide a private chauffeured luxury car to pick you and your family up from home, visit the venues, and drop you back. Our senior wedding planner accompanies you to inspect rooms, mandap spaces, and dining areas together. It is 100% free with zero obligation to hire us.',
    highlight: '100% free door-to-door luxury car ride before you book any venue.',
  },
  {
    category: 'Peace of Mind',
    question: 'What does "Be a guest at your own wedding" actually mean?',
    answer:
      'Most couples and their parents spend the wedding day running around—tracking late buses, checking missing flower deliveries, or arguing with hotel banquet managers. We handle all the behind-the-scenes work so you and your families can simply dress up, enjoy the rituals, dance with your friends, and take beautiful photos.',
    highlight: 'Zero wedding-day stress for the couple and their parents.',
  },
  {
    category: 'Decor & Design',
    question: 'Do you provide the wedding decor yourselves?',
    answer:
      'No—and that is great for your wallet! Because we don’t own rental tents or props, we have no reason to push expensive stages or add big markups. Instead, we create a 3D design of your venue layout and check quotes from decorators line-by-line so you get gorgeous decor without overpaying.',
    highlight: 'We protect your budget, not a decor warehouse.',
  },
  {
    category: '3D Venue Design',
    question: 'How does 3D venue design save us real money?',
    answer:
      'Many couples approve Pinterest photos, only to find on the wedding day that the stage blocks guest views or the dining space is cramped. We build a clear 3D model of your exact venue with real measurements. You walk through every ritual on screen before paying deposits—preventing oversized stages, extra lights, and costly last-minute changes.',
    highlight: 'See your complete venue layout in 3D before paying decor advances.',
  },
  {
    category: 'Guest RSVPs',
    question: 'How do you stop us from wasting money on empty rooms and food?',
    answer:
      'Usually, 15% to 25% of invited guests cannot attend due to travel or work. If you book rooms and food for all 300 invited guests, you end up paying for untouched buffet plates and empty luxury suites. Our RSVP team calls and confirms real arrival dates and meal counts—saving families ₹4 Lakhs to ₹15+ Lakhs on average.',
    highlight: 'Pay only for guests who actually attend.',
  },
  {
    category: 'Venue Selection',
    question: 'How do you help us find the perfect wedding venue?',
    answer:
      'Instead of calling 30 different hotels, tell us your dates, city, and guest count. We send you a short list of top palaces, heritage hotels, and luxury resorts that match what you want, complete with direct rates and inclusions.',
    highlight: 'A handpicked list of top luxury venues with honest rates.',
  },
  {
    category: 'Already Booked',
    question: 'Can we still hire you if we already booked our venue?',
    answer:
      'Yes, absolutely! That is when the most important planning begins. We step in right away to create your 3D layout, start guest RSVP tracking, check all vendor quotes, and manage the full wedding day timeline.',
    highlight: 'We can help you at any stage of your wedding planning.',
  },
  {
    category: 'Cost & Savings',
    question: 'Does hiring The House of Weddings actually pay for itself?',
    answer:
      'In almost every wedding, yes. By checking vendor quotes, right-sizing food guarantees, negotiating hotel packages, and avoiding extra rooms, families typically save far more money than our planning fee.',
    highlight: 'The money you save is usually higher than our fee.',
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative py-20 sm:py-28 bg-[#F1ECE0]/50 text-[#032B24] border-t border-[#032B24]/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#758361]" />
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#032B24]/75 font-semibold">
              Frequently Asked Questions
            </span>
            <span className="w-8 h-[1px] bg-[#758361]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#032B24] tracking-[0.08em] uppercase mb-4">
            Got Questions?
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#032B24]/80 font-light">
            Simple, honest answers about how we help you find venues, design in 3D, and save money.
          </p>
          <div className="w-16 h-[1px] bg-[#758361] mx-auto mt-6" />
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQS.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={faq.question}
                className="bg-[#FCFAF6] border border-[#032B24]/10 transition-colors duration-200 overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full p-6 text-left flex items-start justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <div>
                    <span className="text-[10px] font-sans tracking-[0.2em] uppercase text-[#758361] font-semibold block mb-1">
                      {faq.category}
                    </span>
                    <h3 className="font-serif text-lg sm:text-xl text-[#032B24] font-normal leading-snug">
                      {faq.question}
                    </h3>
                  </div>

                  <span className="mt-1 w-6 h-6 rounded-full border border-[#032B24]/20 flex items-center justify-center text-sm font-sans text-[#032B24]/70 shrink-0 transition-transform duration-200">
                    {isOpen ? '−' : '+'}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-[15px] font-sans text-[#032B24]/80 leading-relaxed font-light border-t border-[#032B24]/5">
                    <p className="mb-3">{faq.answer}</p>
                    {faq.highlight && (
                      <div className="p-3 bg-[#F1ECE0]/70 border-l-2 border-[#758361] text-xs text-[#032B24] font-medium tracking-wide">
                        {faq.highlight}
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* WhatsApp Direct Help Banner */}
        <div className="mt-12 text-center p-6 bg-[#FCFAF6] border border-[#032B24]/10">
          <p className="text-sm font-sans text-[#032B24]/80 mb-3">
            Have a specific question about your wedding dates or venue?
          </p>
          <a
            href={CONTACT_INFO.whatsapp.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-sans tracking-[0.16em] uppercase font-semibold text-[#032B24] hover:text-[#B89248] transition-colors"
          >
            <span>Chat Directly With Us on WhatsApp ({CONTACT_INFO.whatsapp.display})</span>
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.177 8.177 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.26-4.43c0-4.54 3.69-8.24 8.24-8.24zM8.53 7.33c-.2 0-.44.02-.65.23-.26.26-.98.96-.98 2.34 0 1.38 1.01 2.72 1.15 2.91.14.19 1.95 3.05 4.77 4.24 2.34.99 2.82.79 3.32.75.51-.05 1.65-.67 1.88-1.33.24-.65.24-1.21.17-1.33-.07-.12-.26-.19-.55-.33s-1.69-.83-1.95-.93c-.26-.09-.45-.14-.64.14-.19.28-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01z"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};
