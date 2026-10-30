import { useState, useEffect } from 'react';
import { LogoProvider } from './components/LogoContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { WhatWeDo } from './components/WhatWeDo';
import { Benefits } from './components/Benefits';
import { SavingsCalculator } from './components/SavingsCalculator';
import { ClientStories } from './components/ClientStories';
import { EnquiryForm } from './components/EnquiryForm';
import { FAQ } from './components/FAQ';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { BrochureModal, BrochureType } from './components/BrochureModal';

export default function App() {
  const [isBrochureOpen, setIsBrochureOpen] = useState(false);
  const [brochureType, setBrochureType] = useState<BrochureType>('maison');
  const [brochurePage, setBrochurePage] = useState(1);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const openBrochure = (type: BrochureType = 'maison', page: number = 1) => {
    setBrochureType(type);
    setBrochurePage(page);
    setIsBrochureOpen(true);
  };

  const scrollToForm = () => {
    const el = document.getElementById('enquiry');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <LogoProvider>
      <div id="top" className="min-h-screen flex flex-col bg-[#f7f3ea] dark:bg-[#1d201b] text-[#2a2a25] dark:text-[#f7f3ea] transition-colors duration-300">
        {/* Minimal Sticky Header */}
        <Header
          onPlanClick={scrollToForm}
          onOpenBrochure={(type = 'maison') => openBrochure(type, 1)}
          isDarkMode={isDarkMode}
          onToggleDarkMode={() => setIsDarkMode((prev) => !prev)}
        />

        <main className="flex-grow">
          {/* Section 1: Hero (Minimalist, Spacious & Opulent with Champagne Arch and Sage Headline) */}
          <Hero
            onStartClick={scrollToForm}
            onOpenBrochure={(type = 'maison') => openBrochure(type, 1)}
          />

          {/* Section 2: What We Do (Four Simple Steps & What We Do Differently Maison Folio) */}
          <WhatWeDo onOpenBrochure={(type = 'maison') => openBrochure(type, 1)} />

          {/* Section 3: Wedding Management Packages (Bronze, Gold, Platinum) & Standards */}
          <Benefits />

          {/* Section 4: Interactive Guest & Budget Optimizer (Deep Sage Calculator Block) */}
          <SavingsCalculator />

          {/* Section 5: Real Palace Client Stories (Gold Quote Lines & Verified Savings) */}
          <ClientStories onPlanClick={scrollToForm} />

          {/* Section 6: Wedding Consultation & Advisory Booking (Paper Form Fields, Line Borders, Gold Accents) */}
          <EnquiryForm />

          {/* Section 7: Frequently Asked Questions */}
          <FAQ />

          {/* Final CTA */}
          <FinalCTA onPlanClick={scrollToForm} />
        </main>

        {/* Minimal Footer */}
        <Footer />

        {/* Floating Direct WhatsApp & Instagram Widget */}
        <FloatingWhatsApp />

        {/* Mobile Sticky CTA Bar */}
        <MobileStickyBar
          onPlanClick={scrollToForm}
          onOpenBrochure={(type = 'maison') => openBrochure(type, 1)}
        />

        {/* Full-Screen Digital Capability Brochure Reader Modal */}
        <BrochureModal
          isOpen={isBrochureOpen}
          initialBrochure={brochureType}
          initialPage={brochurePage}
          onClose={() => setIsBrochureOpen(false)}
          onPlanClick={scrollToForm}
        />
      </div>
    </LogoProvider>
  );
}
