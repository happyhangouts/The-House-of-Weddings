import { useState } from 'react';
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
      <div id="top" className="min-h-screen flex flex-col bg-[#F8F5EE] text-[#032B24]">
        {/* Minimal Sticky Header */}
        <Header
          onPlanClick={scrollToForm}
          onOpenBrochure={(type = 'maison') => openBrochure(type, 1)}
        />

        <main className="flex-grow">
          {/* Section 1: Hero (Minimalist, Spacious & Opulent) */}
          <Hero
            onStartClick={scrollToForm}
            onOpenBrochure={(type = 'maison') => openBrochure(type, 1)}
          />

          {/* Section 2: What We Do (Four Simple Steps & What We Do Differently Maison Folio) */}
          <WhatWeDo onOpenBrochure={(type = 'maison') => openBrochure(type, 1)} />

          {/* Section 3: Wedding Management Packages (Bronze, Gold, Platinum) & Standards */}
          <Benefits />

          {/* Section 4: Interactive Guest & Budget Optimizer */}
          <SavingsCalculator />

          {/* Section 5: Real Palace Client Stories */}
          <ClientStories onPlanClick={scrollToForm} />

          {/* Section 6: Wedding Consultation & Advisory Booking */}
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

        {/* Full-Screen Digital Capability Brochure Reader Modal (Maison Folio & Event Management) */}
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
