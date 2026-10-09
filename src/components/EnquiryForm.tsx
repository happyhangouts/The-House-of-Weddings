import React, { useState } from 'react';
import { WeddingEnquiryData } from '../types';

const WEBHOOK_ENDPOINT = (typeof window !== 'undefined' && (window as unknown as { WEDDING_FORM_WEBHOOK_URL?: string }).WEDDING_FORM_WEBHOOK_URL) || '';

const SERVICE_OPTIONS = [
  { id: 'venue', label: 'Venue Finding' },
  { id: 'visualization', label: '3D Venue Setup Design' },
  { id: 'rsvp', label: 'Guest RSVPs & Hotel Rooms' },
  { id: 'coordination', label: 'Full Wedding Day Coordination' },
  { id: 'complete', label: 'Complete Wedding Planning' },
];

const BUDGET_RANGES = [
  '₹50 Lakhs – ₹1 Crore',
  '₹1 Crore – ₹2.5 Crores',
  '₹2.5 Crores – ₹5 Crores',
  '₹5 Crores – ₹10 Crores',
  '₹10 Crores+ / Luxury Destination',
];

export const EnquiryForm: React.FC = () => {
  const [formData, setFormData] = useState<WeddingEnquiryData>({
    fullName: '',
    whatsappNumber: '',
    email: '',
    weddingDateType: 'tentative',
    weddingDateValue: '',
    destinationCity: '',
    guestCount: '',
    roomsRequired: '',
    functionCount: '',
    approximateBudget: '',
    servicesNeeded: ['Venue Finding', '3D Venue Setup Design'],
    complimentaryRideRequested: true,
    additionalNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<WeddingEnquiryData | null>(null);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name';
    }

    if (!formData.whatsappNumber.trim()) {
      newErrors.whatsappNumber = 'Please enter your WhatsApp phone number';
    } else if (formData.whatsappNumber.replace(/\D/g, '').length < 8) {
      newErrors.whatsappNumber = 'Please enter a valid phone number with country code';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.destinationCity.trim()) {
      newErrors.destinationCity = 'Please specify your preferred city or destination';
    }

    if (formData.servicesNeeded.length === 0) {
      newErrors.servicesNeeded = 'Please select at least one service you need help with';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleServiceToggle = (serviceLabel: string) => {
    setFormData((prev) => {
      const exists = prev.servicesNeeded.includes(serviceLabel);
      return {
        ...prev,
        servicesNeeded: exists
          ? prev.servicesNeeded.filter((s) => s !== serviceLabel)
          : [...prev.servicesNeeded, serviceLabel],
      };
    });
    if (errors.servicesNeeded) {
      setErrors((prev) => ({ ...prev, servicesNeeded: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (WEBHOOK_ENDPOINT) {
        await fetch(WEBHOOK_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...formData,
            submittedAt: new Date().toISOString(),
            source: 'thehouseofweddings_website',
          }),
        });
      }
      setSubmittedSummary({ ...formData });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Submission error:', err);
      setSubmittedSummary({ ...formData });
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: '',
      whatsappNumber: '',
      email: '',
      weddingDateType: 'tentative',
      weddingDateValue: '',
      destinationCity: '',
      guestCount: '',
      roomsRequired: '',
      functionCount: '',
      approximateBudget: '',
      servicesNeeded: ['Venue Finding', '3D Venue Setup Design'],
      complimentaryRideRequested: true,
      additionalNotes: '',
    });
  };

  return (
    <section id="enquiry" className="relative py-20 sm:py-28 bg-[#F8F5EE] text-[#032B24]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#758361]" />
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#032B24]/75 font-semibold">
              FREE CONSULTATION
            </span>
            <span className="w-8 h-[1px] bg-[#758361]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#032B24] tracking-[0.08em] uppercase">
            Tell Us About Your Wedding
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#032B24]/80 font-light max-w-xl mx-auto mt-3">
            Share a few details below. Our senior wedding planner will call you to discuss top venues, 3D designs, and how to make your celebration smooth and stress-free.
          </p>
          <div className="w-16 h-[1px] bg-[#758361] mx-auto mt-4" />
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="bg-[#FCFAF6] border-2 border-[#758361] p-8 sm:p-14 text-center shadow-lg relative">
            <div className="w-14 h-12 bg-[#032B24] border border-[#758361] mx-auto mb-6 flex flex-col items-center justify-center text-[#758361] shadow-md">
              <span className="font-serif text-lg font-bold leading-none">HW</span>
              <span className="text-[4px] font-sans tracking-widest uppercase mt-0.5 text-[#F8F5EE]">
                WEDDINGS
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#032B24] tracking-[0.08em] uppercase mb-3">
              Thank You! We Received Your Details.
            </h3>

            <p className="font-sans text-base sm:text-lg text-[#032B24]/85 max-w-lg mx-auto leading-relaxed mb-8 font-light">
              Our senior wedding planner will review your dates, location, and guest count, and connect with you on WhatsApp shortly.
            </p>

            {submittedSummary && (
              <div className="bg-[#F1ECE0] p-6 max-w-md mx-auto text-left mb-8 text-xs font-sans text-[#032B24]/80 space-y-2 border border-[#758361]/40">
                <div className="font-serif font-bold text-[#032B24] uppercase tracking-wider text-xs pb-2 border-b border-[#032B24]/10">
                  Your Enquiry Summary
                </div>
                <div><span className="text-[#032B24]/60">Name:</span> {submittedSummary.fullName}</div>
                <div><span className="text-[#032B24]/60">WhatsApp:</span> {submittedSummary.whatsappNumber}</div>
                <div><span className="text-[#032B24]/60">Destination:</span> {submittedSummary.destinationCity}</div>
                {submittedSummary.guestCount && <div><span className="text-[#032B24]/60">Guests:</span> ~{submittedSummary.guestCount}</div>}
                <div>
                  <span className="text-[#032B24]/60">Services:</span>{' '}
                  {submittedSummary.servicesNeeded.join(', ')}
                </div>
                {submittedSummary.complimentaryRideRequested && (
                  <div className="text-[#032B24] font-medium pt-2 border-t border-[#032B24]/10 flex items-center gap-1.5">
                    <span className="text-[#B89248]">✓</span>
                    <span>Free Luxury Car for Venue Visits: Requested (Our team will call to confirm pickup)</span>
                  </div>
                )}
              </div>
            )}

            {/* Direct Connect Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 max-w-md mx-auto">
              <a
                href={`https://wa.me/918800843189?text=${encodeURIComponent(`Hello The House of Weddings, I have submitted my wedding details for ${submittedSummary?.fullName || 'our wedding'} in ${submittedSummary?.destinationCity || 'India'}. Looking forward to discussing details.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-[#032B24] text-[#758361] hover:bg-[#758361] hover:text-[#032B24] border border-[#758361] transition-colors text-xs font-sans uppercase tracking-[0.16em] font-semibold"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.177 8.177 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.26-4.43c0-4.54 3.69-8.24 8.24-8.24zM8.53 7.33c-.2 0-.44.02-.65.23-.26.26-.98.96-.98 2.34 0 1.38 1.01 2.72 1.15 2.91.14.19 1.95 3.05 4.77 4.24 2.34.99 2.82.79 3.32.75.51-.05 1.65-.67 1.88-1.33.24-.65.24-1.21.17-1.33-.07-.12-.26-.19-.55-.33s-1.69-.83-1.95-.93c-.26-.09-.45-.14-.64.14-.19.28-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01z"/>
                </svg>
                <span>Message on WhatsApp</span>
              </a>

              <a
                href="https://www.instagram.com/mubaarqaan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3.5 bg-transparent text-[#032B24] hover:bg-[#032B24] hover:text-[#758361] border border-[#032B24]/30 transition-colors text-xs font-sans uppercase tracking-[0.16em]"
              >
                <span>Follow @mubaarqaan</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              type="button"
              className="text-xs tracking-[0.18em] uppercase text-[#032B24] hover:text-[#B89248] underline underline-offset-4 transition-colors font-medium cursor-pointer"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#FCFAF6] border border-[#032B24]/15 p-6 sm:p-10 md:p-12 shadow-md relative"
          >
            {/* Grid for Primary Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
              {/* 1. Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24] mb-2">
                  1. Full Name <span className="text-[#B89248]">*</span>
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Radhika Sharma"
                  className={`w-full px-3.5 py-2.5 bg-[#F8F5EE] border ${
                    errors.fullName ? 'border-red-600 ring-1 ring-red-600' : 'border-[#032B24]/20 focus:border-[#032B24]'
                  } text-sm text-[#032B24] placeholder-[#032B24]/40 outline-none transition-colors`}
                />
                {errors.fullName && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.fullName}</p>}
              </div>

              {/* 2. WhatsApp Number */}
              <div>
                <label htmlFor="whatsappNumber" className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24] mb-2">
                  2. WhatsApp Number <span className="text-[#B89248]">*</span>
                </label>
                <input
                  id="whatsappNumber"
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full px-3.5 py-2.5 bg-[#F8F5EE] border ${
                    errors.whatsappNumber ? 'border-red-600 ring-1 ring-red-600' : 'border-[#032B24]/20 focus:border-[#032B24]'
                  } text-sm text-[#032B24] placeholder-[#032B24]/40 outline-none transition-colors`}
                />
                {errors.whatsappNumber && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.whatsappNumber}</p>}
              </div>

              {/* 3. Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24] mb-2">
                  3. Email Address <span className="text-[#B89248]">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="radhika@example.com"
                  className={`w-full px-3.5 py-2.5 bg-[#F8F5EE] border ${
                    errors.email ? 'border-red-600 ring-1 ring-red-600' : 'border-[#032B24]/20 focus:border-[#032B24]'
                  } text-sm text-[#032B24] placeholder-[#032B24]/40 outline-none transition-colors`}
                />
                {errors.email && <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.email}</p>}
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#032B24]/10 my-8" />

            {/* 4. Wedding Date Selection */}
            <div className="mb-8">
              <label className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24] mb-3">
                4. Wedding Date
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                {[
                  { key: 'exact', label: 'Exact Date' },
                  { key: 'tentative', label: 'Tentative Month' },
                  { key: 'not_finalized', label: 'Not Finalized Yet' },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() =>
                      setFormData({ ...formData, weddingDateType: item.key as WeddingEnquiryData['weddingDateType'] })
                    }
                    className={`py-2.5 px-4 text-xs font-sans tracking-wider uppercase border transition-all text-center cursor-pointer ${
                      formData.weddingDateType === item.key
                        ? 'bg-[#032B24] text-[#758361] border-[#032B24] font-medium'
                        : 'bg-[#F8F5EE] text-[#032B24]/80 border-[#032B24]/20 hover:border-[#032B24]/50'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {formData.weddingDateType !== 'not_finalized' && (
                <div className="max-w-xs">
                  <input
                    type={formData.weddingDateType === 'exact' ? 'date' : 'text'}
                    placeholder={formData.weddingDateType === 'exact' ? '' : 'e.g. November / December 2026'}
                    value={formData.weddingDateValue || ''}
                    onChange={(e) => setFormData({ ...formData, weddingDateValue: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#F8F5EE] border border-[#032B24]/20 focus:border-[#032B24] text-sm text-[#032B24] outline-none"
                  />
                </div>
              )}
            </div>

            {/* Destination & Scale Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {/* 5. Destination / City */}
              <div className="sm:col-span-2 md:col-span-1">
                <label htmlFor="destinationCity" className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24] mb-2">
                  5. Preferred City <span className="text-[#B89248]">*</span>
                </label>
                <input
                  id="destinationCity"
                  type="text"
                  value={formData.destinationCity}
                  onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                  placeholder="e.g. Udaipur, Jaipur, Goa"
                  className={`w-full px-3.5 py-2.5 bg-[#F8F5EE] border ${
                    errors.destinationCity ? 'border-red-600' : 'border-[#032B24]/20 focus:border-[#032B24]'
                  } text-sm text-[#032B24] placeholder-[#032B24]/40 outline-none`}
                />
                {errors.destinationCity && <p className="mt-1 text-xs text-red-600">{errors.destinationCity}</p>}
              </div>

              {/* 6. Number of Guests */}
              <div>
                <label htmlFor="guestCount" className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24] mb-2">
                  6. Guest Count
                </label>
                <input
                  id="guestCount"
                  type="number"
                  min="20"
                  max="5000"
                  value={formData.guestCount}
                  onChange={(e) => setFormData({ ...formData, guestCount: e.target.value === '' ? '' : Number(e.target.value) })}
                  placeholder="e.g. 300"
                  className="w-full px-3.5 py-2.5 bg-[#F8F5EE] border border-[#032B24]/20 focus:border-[#032B24] text-sm text-[#032B24] outline-none"
                />
              </div>

              {/* 7. Number of Rooms Required */}
              <div>
                <label htmlFor="roomsRequired" className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24] mb-2">
                  7. Rooms Needed
                </label>
                <input
                  id="roomsRequired"
                  type="number"
                  min="0"
                  max="1000"
                  value={formData.roomsRequired}
                  onChange={(e) => setFormData({ ...formData, roomsRequired: e.target.value === '' ? '' : Number(e.target.value) })}
                  placeholder="e.g. 80"
                  className="w-full px-3.5 py-2.5 bg-[#F8F5EE] border border-[#032B24]/20 focus:border-[#032B24] text-sm text-[#032B24] outline-none"
                />
              </div>

              {/* 8. Number of Functions */}
              <div>
                <label htmlFor="functionCount" className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24] mb-2">
                  8. Functions
                </label>
                <input
                  id="functionCount"
                  type="number"
                  min="1"
                  max="15"
                  value={formData.functionCount}
                  onChange={(e) => setFormData({ ...formData, functionCount: e.target.value === '' ? '' : Number(e.target.value) })}
                  placeholder="e.g. 4"
                  className="w-full px-3.5 py-2.5 bg-[#F8F5EE] border border-[#032B24]/20 focus:border-[#032B24] text-sm text-[#032B24] outline-none"
                />
              </div>
            </div>

            {/* 9. Approximate Budget */}
            <div className="mb-8">
              <label className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24] mb-2.5">
                9. Approximate Wedding Budget
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
                {BUDGET_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setFormData({ ...formData, approximateBudget: range })}
                    className={`py-2 px-3 text-xs font-sans border transition-all text-center cursor-pointer ${
                      formData.approximateBudget === range
                        ? 'bg-[#032B24] text-[#758361] border-[#032B24] font-medium'
                        : 'bg-[#F8F5EE] text-[#032B24]/80 border-[#032B24]/20 hover:border-[#032B24]/50'
                    }`}
                  >
                    {range}
                  </button>
                ))}
              </div>
            </div>

            {/* 10. Services Needed */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <label className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24]">
                  10. What do you need help with? <span className="text-[#B89248]">*</span>
                </label>
                <span className="text-[11px] font-sans text-[#032B24]/55 tracking-wider">Select all that apply</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {SERVICE_OPTIONS.map((service) => {
                  const isChecked = formData.servicesNeeded.includes(service.label);
                  return (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => handleServiceToggle(service.label)}
                      className={`flex items-center gap-3 p-3 text-left border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#032B24]/8 border-[#032B24] text-[#032B24]'
                          : 'bg-[#F8F5EE] border-[#032B24]/15 text-[#032B24]/80 hover:border-[#032B24]/40'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked ? 'border-[#032B24] bg-[#032B24] text-[#758361]' : 'border-[#032B24]/30 bg-transparent'
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs font-sans tracking-wide font-medium">{service.label}</span>
                    </button>
                  );
                })}
              </div>
              {errors.servicesNeeded && <p className="mt-1.5 text-xs text-red-600">{errors.servicesNeeded}</p>}
            </div>

            {/* 11. Additional Notes */}
            <div className="mb-8">
              <label htmlFor="additionalNotes" className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#032B24] mb-2">
                11. Anything else we should know?
              </label>
              <textarea
                id="additionalNotes"
                rows={3}
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Specific venues you like, family traditions, travel logistics or special requests..."
                className="w-full px-3.5 py-2.5 bg-[#F8F5EE] border border-[#032B24]/20 focus:border-[#032B24] text-sm text-[#032B24] placeholder-[#032B24]/40 outline-none resize-y"
              />
            </div>

            {/* Free Luxury Car for Venue Visits Checkbox */}
            <div className="mb-10 p-5 sm:p-6 bg-[#FCFAF6] border-2 border-[#758361]/50 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#758361]/10 rounded-full blur-2xl pointer-events-none" />
              <label className="flex items-start gap-3.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="complimentaryRideCheckbox"
                  checked={formData.complimentaryRideRequested ?? true}
                  onChange={(e) => setFormData({ ...formData, complimentaryRideRequested: e.target.checked })}
                  className="mt-1 w-4 h-4 accent-[#032B24] cursor-pointer shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 text-xs sm:text-[13px] font-serif uppercase tracking-wider text-[#032B24] font-semibold">
                    <span>Free Client Privilege</span>
                    <span>·</span>
                    <span className="text-[#B89248]">Free Luxury Car for Venue Visits</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#032B24]/80 font-sans leading-relaxed font-light">
                    Yes, arrange a <strong>free chauffeured luxury car</strong> to visit our top shortlisted venues before we book anything. Accompanied by your senior planner with zero booking obligations.
                  </p>
                </div>
              </label>
            </div>

            {/* Submit Button */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#032B24]/10">
              <p className="text-[11px] font-sans text-[#032B24]/60 tracking-wide text-center sm:text-left">
                Your details are 100% private and confidential.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-8 py-3.5 text-xs sm:text-[13px] font-sans font-semibold tracking-[0.16em] uppercase text-[#032B24] bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] hover:shadow-[0_4px_20px_rgba(117,131,97,0.4)] text-white hover:brightness-110 active:brightness-95 transition-all border border-[#758361] shadow-sm disabled:opacity-60 whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? 'Sending Details...' : 'Submit & Book Free Call'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
