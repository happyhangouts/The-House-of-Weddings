import React from 'react';
import { HWLogo } from './Logo';
import { CONTACT_INFO } from '../config/contact';

interface FooterProps {
  onOpenLogoUpload?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLogoUpload }) => {
  return (
    <footer className="w-full bg-[#02201A] text-[#F8F5EE] py-16 sm:py-24 border-t border-[#758361]/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Brand Lockup */}
        <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-10 pb-14 border-b border-[#758361]/25 text-center lg:text-left">
          
          {/* Brand Logo & Statement */}
          <div className="flex flex-col items-center lg:items-start max-w-md">
            <HWLogo variant="horizontal" size="lg" />
            <p className="font-serif text-sm tracking-wider uppercase text-[#758361] mt-4 font-medium">
              &ldquo;Be a guest at your own wedding.&rdquo;
            </p>
            <p className="font-sans text-xs text-[#F8F5EE]/70 font-light mt-2 leading-relaxed">
              Palace and luxury hotel venues, 3D venue setup designs, guest RSVP tracking, and complete wedding day coordination.
            </p>
            {onOpenLogoUpload && (
              <button
                type="button"
                onClick={onOpenLogoUpload}
                className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-sans uppercase tracking-wider text-[#758361] hover:text-white hover:bg-[#758361] border border-[#758361]/40 transition-all cursor-pointer"
              >
                <span>✦ Upload Custom Brand Logo</span>
              </button>
            )}
          </div>

          {/* Destinations & Contacts */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 lg:gap-14 text-xs font-sans">
            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#758361] font-bold block mb-3">
                DESTINATIONS WE SERVE
              </span>
              <ul className="space-y-1.5 text-[#F8F5EE]/75 font-light">
                <li>Udaipur · Lake &amp; Palace Venues</li>
                <li>Jaipur · Heritage Palaces &amp; Forts</li>
                <li>Jodhpur · Royal Forts &amp; Hotels</li>
                <li>Goa · Beachside Resorts &amp; Lawns</li>
                <li>Delhi NCR &amp; Mumbai Venues</li>
              </ul>
            </div>

            <div>
              <span className="text-[10px] uppercase tracking-wider text-[#758361] font-bold block mb-3">
                GET IN TOUCH
              </span>
              <ul className="space-y-2 text-[#F8F5EE]/75 font-light">
                <li>
                  <a
                    href={CONTACT_INFO.whatsapp.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#758361] transition-colors flex items-center gap-1.5 justify-center sm:justify-start"
                  >
                    <span>WhatsApp: {CONTACT_INFO.whatsapp.display}</span>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:bookings@mubaarqaan.com"
                    className="hover:text-[#758361] transition-colors"
                  >
                    Email: bookings@mubaarqaan.com
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.mubaarqaan.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#758361] transition-colors"
                  >
                    Website: www.mubaarqaan.com
                  </a>
                </li>
                <li>
                  <a
                    href={CONTACT_INFO.instagram.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#758361] transition-colors"
                  >
                    Instagram: {CONTACT_INFO.instagram.handle}
                  </a>
                </li>
                <li className="text-[#758361] font-medium">
                  We are available 7 days a week
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-sans text-[#F8F5EE]/60 tracking-wider text-center sm:text-left">
          <div>
            © 2026 The House of Weddings by Mubaarqaan. All rights reserved.
          </div>
          <div className="tracking-wider uppercase text-[10px] text-[#758361]">
            Event Management &amp; Guest Hospitality
          </div>
        </div>

      </div>
    </footer>
  );
};
