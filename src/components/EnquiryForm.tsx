import React, { useState } from 'react';
import { WeddingEnquiryData } from '../types';
import { sound } from '../utils/soundEngine';

const SERVICE_OPTIONS = [
  { id: 'venue', label: 'Venue Finding' },
  { id: 'visualization', label: '3D Venue Setup Design' },
  { id: 'rsvp', label: 'Guest RSVPs & Hotel Rooms' },
  { id: 'coordination', label: 'Full Wedding Day Coordination' },
  { id: 'complete', label: 'Complete Wedding Planning' },
];

const BUDGET_RANGES = [
  '30 - 50 Lakhs',
  '50 - 70 Lakhs',
  '70 Lakh - 1 Cr',
  '1 CR +',
];

// Netlify form data URL encoder helper (standard application/x-www-form-urlencoded)
const encodeNetlifyData = (data: Record<string, string>) => {
  return new URLSearchParams(data).toString();
};

// Generates the comprehensive WhatsApp message with all 15 enquiry details
export const generateWhatsAppEnquiryMessage = (data: WeddingEnquiryData): string => {
  let dateText = 'Not Finalized Yet';
  if (data.weddingDateType === 'exact' && data.weddingDateValue) {
    dateText = `Exact Date: ${data.weddingDateValue}`;
  } else if (data.weddingDateType === 'tentative' && data.weddingDateValue) {
    dateText = `Tentative: ${data.weddingDateValue}`;
  } else if (data.weddingDateType === 'tentative') {
    dateText = 'Tentative / Flexible Dates';
  }

  const lines: string[] = [
    '👑 *NEW WEDDING ENQUIRY | THE HOUSE OF WEDDINGS*',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    `👤 *Client Name:* ${data.fullName}`,
    `📱 *WhatsApp Number:* ${data.whatsappNumber}`,
    `✉️ *Email Address:* ${data.email}`,
    '',
    `📍 *Preferred City / Destination:* ${data.destinationCity}`,
    `📅 *Wedding Date:* ${dateText}`,
    `💰 *Approximate Budget:* ${data.approximateBudget || 'Not specified'}`,
    '',
    `👥 *Guest Count:* ${data.guestCount ? `~${data.guestCount} guests` : 'Not specified'}`,
    `🏨 *Rooms Required:* ${data.roomsRequired ? `${data.roomsRequired} rooms` : 'Not specified'}`,
    `🎉 *Functions Count:* ${data.functionCount ? `${data.functionCount} functions` : 'Not specified'}`,
    '',
    `✨ *Services Requested:*`,
    ...(data.servicesNeeded.length > 0
      ? data.servicesNeeded.map((s) => `  • ${s}`)
      : ['  • Complete Wedding Planning']),
    '',
    `🚗 *Complimentary Luxury Car for Venue Visits:* ${
      data.complimentaryRideRequested
        ? 'YES (Requested chauffeured car)'
        : 'No'
    }`,
    '',
    `📝 *Special Requests / Notes:*`,
    data.additionalNotes?.trim() ? data.additionalNotes.trim() : 'None provided',
    '━━━━━━━━━━━━━━━━━━━━━━━━━━━━',
    '_Sent directly via The House of Weddings Website_',
  ];

  return lines.join('\n');
};

export const getWhatsAppUrl = (data: WeddingEnquiryData): string => {
  const text = generateWhatsAppEnquiryMessage(data);
  return `https://wa.me/918800843189?text=${encodeURIComponent(text)}`;
};

// Generates the comprehensive Email content with all enquiry details for mubaarqaan@gmail.com
export const generateEmailEnquiryContent = (data: WeddingEnquiryData) => {
  let dateText = 'Not Finalized Yet';
  if (data.weddingDateType === 'exact' && data.weddingDateValue) {
    dateText = `Exact Date: ${data.weddingDateValue}`;
  } else if (data.weddingDateType === 'tentative' && data.weddingDateValue) {
    dateText = `Tentative: ${data.weddingDateValue}`;
  } else if (data.weddingDateType === 'tentative') {
    dateText = 'Tentative / Flexible Dates';
  }

  const subject = `New Wedding Enquiry: ${data.fullName} - ${data.destinationCity || 'The House of Weddings'}`;

  const lines: string[] = [
    'NEW WEDDING ENQUIRY | THE HOUSE OF WEDDINGS',
    '============================================================',
    `Client Name: ${data.fullName}`,
    `WhatsApp Number: ${data.whatsappNumber}`,
    `Email: ${data.email}`,
    '',
    `Destination / Preferred City: ${data.destinationCity}`,
    `Wedding Date: ${dateText}`,
    `Approximate Budget: ${data.approximateBudget || 'Not specified'}`,
    '',
    `Guest Count: ${data.guestCount ? `~${data.guestCount} guests` : 'Not specified'}`,
    `Rooms Required: ${data.roomsRequired ? `${data.roomsRequired} rooms` : 'Not specified'}`,
    `Functions Count: ${data.functionCount ? `${data.functionCount} functions` : 'Not specified'}`,
    '',
    `Services Requested:`,
    ...(data.servicesNeeded.length > 0
      ? data.servicesNeeded.map((s) => `  - ${s}`)
      : ['  - Complete Wedding Planning']),
    '',
    `Complimentary Luxury Car for Venue Visits: ${
      data.complimentaryRideRequested ? 'YES (Requested chauffeured car)' : 'No'
    }`,
    '',
    `Special Requests / Notes:`,
    data.additionalNotes?.trim() ? data.additionalNotes.trim() : 'None provided',
    '============================================================',
    'Submitted via The House of Weddings Website (Recipient: mubaarqaan@gmail.com)',
  ];

  const body = lines.join('\n');
  const mailtoUrl = `mailto:mubaarqaan@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return { subject, body, mailtoUrl };
};

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
    approximateBudget: '50 - 70 Lakhs',
    servicesNeeded: ['Venue Finding', '3D Venue Setup Design', 'Guest RSVPs & Hotel Rooms'],
    complimentaryRideRequested: true,
    additionalNotes: '',
  });

  const [botField, setBotField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<WeddingEnquiryData | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const [errors, setErrors] = useState<{
    fullName?: string;
    whatsappNumber?: string;
    email?: string;
    destinationCity?: string;
    servicesNeeded?: string;
  }>({});

  const validate = (): boolean => {
    const errs: typeof errors = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Please enter your full name';
    }

    if (!formData.whatsappNumber.trim()) {
      errs.whatsappNumber = 'Please enter your WhatsApp contact number';
    } else {
      const cleanPhone = formData.whatsappNumber.replace(/[^0-9]/g, '');
      if (cleanPhone.length < 9 || cleanPhone.length > 15) {
        errs.whatsappNumber = 'Please provide a valid phone number (10 digits)';
      }
    }

    if (!formData.email.trim()) {
      errs.email = 'Please enter your email address';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!formData.destinationCity.trim()) {
      errs.destinationCity = 'Please share your preferred destination or city';
    }

    if (!formData.servicesNeeded || formData.servicesNeeded.length === 0) {
      errs.servicesNeeded = 'Please select at least one service needed';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleServiceToggle = (service: string) => {
    setFormData((prev) => {
      const exists = prev.servicesNeeded.includes(service);
      const updated = exists
        ? prev.servicesNeeded.filter((s) => s !== service)
        : [...prev.servicesNeeded, service];
      return { ...prev, servicesNeeded: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot bot protection
    if (botField) {
      console.warn('Bot submission blocked');
      setIsSubmitted(true);
      return;
    }

    if (!validate()) {
      const firstErrEl = document.querySelector('.border-red-600, .ring-red-600');
      if (firstErrEl) {
        firstErrEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      let dateValue = formData.weddingDateValue || '';
      if (formData.weddingDateType === 'not_finalized') {
        dateValue = 'Not Finalized Yet';
      }

      const payload: Record<string, string> = {
        'form-name': 'wedding-enquiry',
        subject: `New Wedding Enquiry: ${formData.fullName} - ${formData.destinationCity || 'The House of Weddings'}`,
        'bot-field': botField,
        fullName: formData.fullName.trim(),
        whatsappNumber: formData.whatsappNumber.trim(),
        email: formData.email.trim(),
        weddingDateType: formData.weddingDateType,
        weddingDateValue: dateValue,
        destinationCity: formData.destinationCity.trim(),
        guestCount: formData.guestCount !== '' ? String(formData.guestCount) : '',
        roomsRequired: formData.roomsRequired !== '' ? String(formData.roomsRequired) : '',
        functionCount: formData.functionCount !== '' ? String(formData.functionCount) : '',
        approximateBudget: formData.approximateBudget,
        servicesNeeded: formData.servicesNeeded.join(', '),
        complimentaryRideRequested: formData.complimentaryRideRequested
          ? 'Yes (Chauffeured luxury car requested)'
          : 'No',
        additionalNotes: formData.additionalNotes.trim(),
      };

      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: encodeNetlifyData(payload),
      });

      if (response.ok) {
        // Trigger royal celebratory chime on successful submission
        sound.playSuccessSound();

        setSubmittedSummary({ ...formData });
        setIsSubmitted(true);
        setSubmitError(null);

        // Instantly prepare and trigger WhatsApp with all 15 enquiry details to +91 88008 43189
        const waUrl = getWhatsAppUrl(formData);
        try {
          window.open(waUrl, '_blank');
        } catch (popupErr) {
          console.warn('Browser popup blocked auto-open WhatsApp:', popupErr);
        }
      } else {
        throw new Error(`Netlify form returned status ${response.status}`);
      }
    } catch (err) {
      console.error('Netlify form submission error:', err);
      setSubmitError(
        'We encountered an issue submitting your enquiry automatically. Please try submitting again, or connect with our planners directly on WhatsApp below.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyWhatsAppText = () => {
    if (!submittedSummary) return;
    const text = generateWhatsAppEnquiryMessage(submittedSummary);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const handleCopyEmailText = () => {
    if (!submittedSummary) return;
    const { body } = generateEmailEnquiryContent(submittedSummary);
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(body).then(() => {
        setEmailCopied(true);
        setTimeout(() => setEmailCopied(false), 2500);
      });
    }
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setSubmitError(null);
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
      approximateBudget: '50 - 70 Lakhs',
      servicesNeeded: ['Venue Finding', '3D Venue Setup Design'],
      complimentaryRideRequested: true,
      additionalNotes: '',
    });
  };

  return (
    <section id="enquiry" className="relative py-20 sm:py-28 bg-[#f7f3ea] dark:bg-[#1d201b] text-[#2a2a25] dark:text-[#f7f3ea] border-t border-[#ddd5c3] dark:border-[#3b4237]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-14 sm:mb-18">
          <div className="flex items-center justify-center gap-3 mb-3">
            <span className="w-8 h-[1px] bg-[#a8844a]" />
            <span className="text-[11px] font-sans tracking-[0.24em] uppercase text-[#6f6c62] dark:text-[#c9a96a] font-semibold">
              FREE CONSULTATION
            </span>
            <span className="w-8 h-[1px] bg-[#a8844a]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-normal text-[#2a2a25] dark:text-[#f7f3ea] tracking-[0.08em] uppercase">
            Tell Us About Your Wedding
          </h2>
          <p className="font-sans text-base sm:text-lg text-[#6f6c62] dark:text-[#ddd5c3]/80 font-light max-w-xl mx-auto mt-3">
            Share a few details below. Our senior wedding planner will call you to discuss top venues, 3D designs, and how to make your celebration smooth and stress-free.
          </p>
          <div className="w-16 h-[1px] bg-[#a8844a] mx-auto mt-4" />
        </div>

        {/* Success State */}
        {isSubmitted ? (
          <div className="bg-[#fbf9f3] dark:bg-[#232721] border-2 border-[#a8844a] p-8 sm:p-14 text-center shadow-lg relative">
            <div className="w-14 h-12 bg-[#1d201b] border border-[#a8844a] mx-auto mb-6 flex flex-col items-center justify-center text-[#e6d5b0] shadow-md">
              <span className="font-serif text-lg font-bold leading-none">HW</span>
              <span className="text-[4px] font-sans tracking-widest uppercase mt-0.5 text-[#f7f3ea]">
                WEDDINGS
              </span>
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl font-normal text-[#2a2a25] dark:text-[#f7f3ea] tracking-[0.08em] uppercase mb-3">
              Thank You! We Received Your Details.
            </h3>

            <p className="font-sans text-base sm:text-lg text-[#6f6c62] dark:text-[#ddd5c3]/85 max-w-lg mx-auto leading-relaxed mb-8 font-light">
              Your wedding consultation request has been safely received. Our senior wedding planner will review your dates, location, and guest count, and connect with you on WhatsApp shortly.
            </p>

            {submittedSummary && (
              <div className="bg-[#f7f3ea] dark:bg-[#1d201b] p-6 max-w-md mx-auto text-left mb-8 text-xs font-sans text-[#2a2a25]/80 dark:text-[#f7f3ea]/80 space-y-2 border border-[#ddd5c3] dark:border-[#3b4237]">
                <div className="font-serif font-bold text-[#2a2a25] dark:text-[#f7f3ea] uppercase tracking-wider text-xs pb-2 border-b border-[#ddd5c3] dark:border-[#3b4237]">
                  Your Enquiry Summary
                </div>
                <div><span className="text-[#6f6c62] dark:text-[#969387]">Name:</span> {submittedSummary.fullName}</div>
                <div><span className="text-[#6f6c62] dark:text-[#969387]">WhatsApp:</span> {submittedSummary.whatsappNumber}</div>
                <div><span className="text-[#6f6c62] dark:text-[#969387]">Email:</span> {submittedSummary.email}</div>
                <div><span className="text-[#6f6c62] dark:text-[#969387]">Destination:</span> {submittedSummary.destinationCity}</div>
                {submittedSummary.approximateBudget && (
                  <div><span className="text-[#6f6c62] dark:text-[#969387]">Approx. Budget:</span> {submittedSummary.approximateBudget}</div>
                )}
                {submittedSummary.guestCount && (
                  <div><span className="text-[#6f6c62] dark:text-[#969387]">Guests:</span> ~{submittedSummary.guestCount}</div>
                )}
                {submittedSummary.roomsRequired && (
                  <div><span className="text-[#6f6c62] dark:text-[#969387]">Rooms:</span> {submittedSummary.roomsRequired}</div>
                )}
                {submittedSummary.functionCount && (
                  <div><span className="text-[#6f6c62] dark:text-[#969387]">Functions:</span> {submittedSummary.functionCount}</div>
                )}
                <div>
                  <span className="text-[#6f6c62] dark:text-[#969387]">Services:</span>{' '}
                  {submittedSummary.servicesNeeded.join(', ')}
                </div>
                {submittedSummary.complimentaryRideRequested && (
                  <div className="text-[#2a2a25] dark:text-[#f7f3ea] font-medium pt-2 border-t border-[#ddd5c3] dark:border-[#3b4237] flex items-center gap-1.5">
                    <span className="text-[#a8844a]">✓</span>
                    <span>Free Luxury Car for Venue Visits: Requested</span>
                  </div>
                )}
              </div>
            )}

            {/* Primary Action: Direct WhatsApp Dispatch with All Details */}
            {submittedSummary && (
              <div className="bg-[#1d201b] text-[#f7f3ea] border-2 border-[#a8844a] p-6 sm:p-7 max-w-xl mx-auto mb-8 text-left shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse"></span>
                    <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#e6d5b0] font-bold">
                      Direct WhatsApp Dispatch · +91 88008 43189
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[#a8844a] uppercase tracking-wider">Priority Desk</span>
                </div>

                <p className="font-sans text-xs sm:text-sm text-[#f7f3ea]/90 mb-5 font-light leading-relaxed">
                  Your enquiry has been registered. To receive instant priority review, shortlisted venue options, and 3D visual concepts, send the complete enquiry breakdown directly to our senior wedding planner on WhatsApp:
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <a
                    href={getWhatsAppUrl(submittedSummary)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-white font-sans text-xs uppercase tracking-[0.16em] font-bold shadow-md transition-all cursor-pointer"
                  >
                    <svg className="w-5 h-5 fill-current shrink-0" viewBox="0 0 24 24">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.177 8.177 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.26-4.43c0-4.54 3.69-8.24 8.24-8.24zM8.53 7.33c-.2 0-.44.02-.65.23-.26.26-.98.96-.98 2.34 0 1.38 1.01 2.72 1.15 2.91.14.19 1.95 3.05 4.77 4.24 2.34.99 2.82.79 3.32.75.51-.05 1.65-.67 1.88-1.33.24-.65.24-1.21.17-1.33-.07-.12-.26-.19-.55-.33s-1.69-.83-1.95-.93c-.26-.09-.45-.14-.64.14-.19.28-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01z"/>
                    </svg>
                    <span>Send All Details on WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopyWhatsAppText}
                    className="px-4 py-3.5 bg-white/10 hover:bg-white/20 text-[#f7f3ea] border border-white/20 text-xs font-sans uppercase tracking-[0.14em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>{copied ? '✓ Copied!' : 'Copy Text'}</span>
                  </button>
                </div>

                {/* Collapsible details preview */}
                <details className="mt-4 pt-3 border-t border-white/15 text-xs text-[#f7f3ea]/70">
                  <summary className="cursor-pointer hover:text-[#e6d5b0] select-none text-[11px] font-sans uppercase tracking-wider font-medium">
                    View Pre-filled WhatsApp Message Preview
                  </summary>
                  <pre className="mt-3 p-3 bg-black/40 text-[#f7f3ea]/90 text-[11px] font-mono whitespace-pre-wrap rounded border border-white/10 leading-relaxed overflow-x-auto">
                    {generateWhatsAppEnquiryMessage(submittedSummary)}
                  </pre>
                </details>
              </div>
            )}

            {/* Email Dispatch Card: All Details shared to mubaarqaan@gmail.com */}
            {submittedSummary && (() => {
              const emailData = generateEmailEnquiryContent(submittedSummary);
              return (
                <div className="bg-[#fbf9f3] dark:bg-[#232721] text-[#2a2a25] dark:text-[#f7f3ea] border-2 border-[#ddd5c3] dark:border-[#3b4237] p-6 sm:p-7 max-w-xl mx-auto mb-8 text-left shadow-md relative overflow-hidden">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#3b4637]"></span>
                      <span className="text-[11px] font-sans tracking-[0.2em] uppercase text-[#2a2a25] dark:text-[#f7f3ea] font-bold">
                        Email Dispatch · mubaarqaan@gmail.com
                      </span>
                    </div>
                    <span className="text-[10px] font-mono text-[#a8844a] uppercase tracking-wider font-semibold">Priority Inbox</span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm text-[#6f6c62] dark:text-[#ddd5c3]/85 mb-5 font-light leading-relaxed">
                    All 15 enquiry details have been processed for automated delivery to <strong className="font-semibold text-[#2a2a25] dark:text-[#f7f3ea]">mubaarqaan@gmail.com</strong>. You can also open your mail app to send or review a direct copy:
                  </p>

                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <a
                      href={emailData.mailtoUrl}
                      className="flex-1 flex items-center justify-center gap-2.5 px-6 py-3.5 bg-[#3b4637] hover:bg-[#2b3428] text-[#f7f3ea] font-sans text-xs uppercase tracking-[0.16em] font-bold shadow-md transition-all cursor-pointer border border-[#a8844a]/40"
                    >
                      <svg className="w-4 h-4 fill-current shrink-0" viewBox="0 0 24 24">
                        <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                      </svg>
                      <span>Open Email to mubaarqaan@gmail.com</span>
                    </a>

                    <button
                      type="button"
                      onClick={handleCopyEmailText}
                      className="px-4 py-3.5 bg-transparent hover:bg-black/5 dark:hover:bg-white/5 text-[#2a2a25] dark:text-[#f7f3ea] border border-[#ddd5c3] dark:border-[#3b4237] text-xs font-sans uppercase tracking-[0.14em] font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>{emailCopied ? '✓ Copied!' : 'Copy Email Text'}</span>
                    </button>
                  </div>

                  {/* Collapsible details preview */}
                  <details className="mt-4 pt-3 border-t border-[#ddd5c3] dark:border-[#3b4237] text-xs text-[#6f6c62] dark:text-[#ddd5c3]/70">
                    <summary className="cursor-pointer hover:text-[#a8844a] select-none text-[11px] font-sans uppercase tracking-wider font-medium">
                      View Pre-filled Email Breakdown
                    </summary>
                    <div className="mt-3 p-3 bg-[#f7f3ea] dark:bg-[#1d201b] text-[#2a2a25] dark:text-[#f7f3ea] text-[11px] font-mono whitespace-pre-wrap rounded border border-[#ddd5c3] dark:border-[#3b4237] leading-relaxed overflow-x-auto">
                      <div className="text-[10px] font-bold uppercase tracking-wider text-[#a8844a] mb-1">Subject: {emailData.subject}</div>
                      {emailData.body}
                    </div>
                  </details>
                </div>
              );
            })()}

            {/* Additional Secondary Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8 max-w-md mx-auto">
              <a
                href="https://www.instagram.com/mubaarqaan"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-transparent text-[#2a2a25] dark:text-[#f7f3ea] hover:bg-[#3b4637] hover:text-[#f7f3ea] border border-[#ddd5c3] dark:border-[#3b4237] transition-colors text-xs font-sans uppercase tracking-[0.16em]"
              >
                <span>Follow @mubaarqaan on Instagram</span>
              </a>
            </div>

            <button
              onClick={handleReset}
              type="button"
              className="text-xs tracking-[0.18em] uppercase text-[#a8844a] dark:text-[#c9a96a] hover:underline transition-colors font-medium cursor-pointer"
            >
              Submit Another Enquiry
            </button>
          </div>
        ) : (
          <form
            name="wedding-enquiry"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            noValidate
            className="bg-[#fbf9f3] dark:bg-[#232721] border border-[#ddd5c3] dark:border-[#3b4237] p-6 sm:p-10 md:p-12 shadow-md relative"
          >
            {/* Netlify Form Identifier, Bot-Field & Subject */}
            <input type="hidden" name="form-name" value="wedding-enquiry" />
            <input
              type="hidden"
              name="subject"
              value={`New Wedding Enquiry: ${formData.fullName || 'New Client'} - ${formData.destinationCity || 'The House of Weddings'}`}
            />
            <div className="hidden" aria-hidden="true">
              <label>
                Don&apos;t fill this out if you are human:
                <input
                  name="bot-field"
                  tabIndex={-1}
                  autoComplete="off"
                  value={botField}
                  onChange={(e) => setBotField(e.target.value)}
                />
              </label>
            </div>

            {/* Hidden Serialized Inputs for Array & Toggle States */}
            <input type="hidden" name="weddingDateType" value={formData.weddingDateType} />
            <input
              type="hidden"
              name="weddingDateValue"
              value={formData.weddingDateValue || (formData.weddingDateType === 'not_finalized' ? 'Not Finalized Yet' : '')}
            />
            <input type="hidden" name="approximateBudget" value={formData.approximateBudget} />
            <input
              type="hidden"
              name="servicesNeeded"
              value={formData.servicesNeeded.join(', ')}
            />
            <input
              type="hidden"
              name="complimentaryRideRequested"
              value={formData.complimentaryRideRequested ? 'Yes (Chauffeured luxury car requested)' : 'No'}
            />

            {/* Grid for Primary Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 mb-8">
              {/* 1. Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea] mb-2"
                >
                  <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">1.</span> Full Name <span className="text-[#a8844a]">*</span>
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  placeholder="e.g. Radhika Sharma"
                  className={`w-full px-3.5 py-2.5 bg-[#fbf9f3] dark:bg-[#1d201b] border ${
                    errors.fullName ? 'border-red-600 ring-1 ring-red-600' : 'border-[#ddd5c3] dark:border-[#3b4237] focus:border-[#a8844a] focus:ring-1 focus:ring-[#a8844a]'
                  } text-sm text-[#2a2a25] dark:text-[#f7f3ea] placeholder-[#6f6c62]/60 outline-none transition-colors font-sans`}
                />
                {errors.fullName && (
                  <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.fullName}</p>
                )}
              </div>

              {/* 2. WhatsApp Number */}
              <div>
                <label
                  htmlFor="whatsappNumber"
                  className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea] mb-2"
                >
                  <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">2.</span> WhatsApp Number <span className="text-[#a8844a]">*</span>
                </label>
                <input
                  id="whatsappNumber"
                  name="whatsappNumber"
                  type="tel"
                  value={formData.whatsappNumber}
                  onChange={(e) => setFormData({ ...formData, whatsappNumber: e.target.value })}
                  placeholder="+91 98765 43210"
                  className={`w-full px-3.5 py-2.5 bg-[#fbf9f3] dark:bg-[#1d201b] border ${
                    errors.whatsappNumber ? 'border-red-600 ring-1 ring-red-600' : 'border-[#ddd5c3] dark:border-[#3b4237] focus:border-[#a8844a] focus:ring-1 focus:ring-[#a8844a]'
                  } text-sm text-[#2a2a25] dark:text-[#f7f3ea] placeholder-[#6f6c62]/60 outline-none transition-colors font-sans`}
                />
                {errors.whatsappNumber && (
                  <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.whatsappNumber}</p>
                )}
              </div>

              {/* 3. Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea] mb-2"
                >
                  <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">3.</span> Email Address <span className="text-[#a8844a]">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="radhika@example.com"
                  className={`w-full px-3.5 py-2.5 bg-[#fbf9f3] dark:bg-[#1d201b] border ${
                    errors.email ? 'border-red-600 ring-1 ring-red-600' : 'border-[#ddd5c3] dark:border-[#3b4237] focus:border-[#a8844a] focus:ring-1 focus:ring-[#a8844a]'
                  } text-sm text-[#2a2a25] dark:text-[#f7f3ea] placeholder-[#6f6c62]/60 outline-none transition-colors font-sans`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.email}</p>
                )}
              </div>
            </div>

            <div className="w-full h-[1px] bg-[#ddd5c3] dark:bg-[#3b4237] my-8" />

            {/* 4. Wedding Date Selection */}
            <div className="mb-8">
              <label className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea] mb-3">
                <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">4.</span> Wedding Date
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
                      setFormData({
                        ...formData,
                        weddingDateType: item.key as WeddingEnquiryData['weddingDateType'],
                      })
                    }
                    className={`py-2.5 px-4 text-xs font-sans tracking-wider uppercase border transition-all text-center cursor-pointer ${
                      formData.weddingDateType === item.key
                        ? 'bg-[#3b4637] text-[#f7f3ea] border-[#3b4637] font-medium shadow-xs'
                        : 'bg-[#f7f3ea] dark:bg-[#1d201b] text-[#6f6c62] dark:text-[#ddd5c3] border-[#ddd5c3] dark:border-[#3b4237] hover:border-[#a8844a]'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {formData.weddingDateType !== 'not_finalized' && (
                <div className="max-w-xs">
                  <input
                    id="weddingDateValue"
                    name="weddingDateValue"
                    type={formData.weddingDateType === 'exact' ? 'date' : 'text'}
                    placeholder={
                      formData.weddingDateType === 'exact' ? '' : 'e.g. November / December 2026'
                    }
                    value={formData.weddingDateValue || ''}
                    onChange={(e) =>
                      setFormData({ ...formData, weddingDateValue: e.target.value })
                    }
                    className="w-full px-3.5 py-2.5 bg-[#fbf9f3] dark:bg-[#1d201b] border border-[#ddd5c3] dark:border-[#3b4237] focus:border-[#a8844a] focus:ring-1 focus:ring-[#a8844a] text-sm text-[#2a2a25] dark:text-[#f7f3ea] outline-none font-sans"
                  />
                </div>
              )}
            </div>

            {/* Destination & Scale Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
              {/* 5. Destination / City */}
              <div className="sm:col-span-2 md:col-span-1">
                <label
                  htmlFor="destinationCity"
                  className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea] mb-2"
                >
                  <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">5.</span> Preferred City <span className="text-[#a8844a]">*</span>
                </label>
                <input
                  id="destinationCity"
                  name="destinationCity"
                  type="text"
                  value={formData.destinationCity}
                  onChange={(e) => setFormData({ ...formData, destinationCity: e.target.value })}
                  placeholder="e.g. Udaipur, Jaipur, Goa"
                  className={`w-full px-3.5 py-2.5 bg-[#fbf9f3] dark:bg-[#1d201b] border ${
                    errors.destinationCity ? 'border-red-600 ring-1 ring-red-600' : 'border-[#ddd5c3] dark:border-[#3b4237] focus:border-[#a8844a] focus:ring-1 focus:ring-[#a8844a]'
                  } text-sm text-[#2a2a25] dark:text-[#f7f3ea] placeholder-[#6f6c62]/60 outline-none font-sans`}
                />
                {errors.destinationCity && (
                  <p className="mt-1 text-xs text-red-600 font-sans">{errors.destinationCity}</p>
                )}
              </div>

              {/* 6. Number of Guests */}
              <div>
                <label
                  htmlFor="guestCount"
                  className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea] mb-2"
                >
                  <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">6.</span> Guest Count
                </label>
                <input
                  id="guestCount"
                  name="guestCount"
                  type="number"
                  min="20"
                  max="5000"
                  value={formData.guestCount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      guestCount: e.target.value === '' ? '' : Number(e.target.value),
                    })
                  }
                  placeholder="e.g. 300"
                  className="w-full px-3.5 py-2.5 bg-[#fbf9f3] dark:bg-[#1d201b] border border-[#ddd5c3] dark:border-[#3b4237] focus:border-[#a8844a] focus:ring-1 focus:ring-[#a8844a] text-sm text-[#2a2a25] dark:text-[#f7f3ea] outline-none font-sans"
                />
              </div>

              {/* 7. Number of Rooms Required */}
              <div>
                <label
                  htmlFor="roomsRequired"
                  className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea] mb-2"
                >
                  <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">7.</span> Rooms Needed
                </label>
                <input
                  id="roomsRequired"
                  name="roomsRequired"
                  type="number"
                  min="0"
                  max="1000"
                  value={formData.roomsRequired}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      roomsRequired: e.target.value === '' ? '' : Number(e.target.value),
                    })
                  }
                  placeholder="e.g. 80"
                  className="w-full px-3.5 py-2.5 bg-[#fbf9f3] dark:bg-[#1d201b] border border-[#ddd5c3] dark:border-[#3b4237] focus:border-[#a8844a] focus:ring-1 focus:ring-[#a8844a] text-sm text-[#2a2a25] dark:text-[#f7f3ea] outline-none font-sans"
                />
              </div>

              {/* 8. Number of Functions */}
              <div>
                <label
                  htmlFor="functionCount"
                  className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea] mb-2"
                >
                  <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">8.</span> Functions
                </label>
                <input
                  id="functionCount"
                  name="functionCount"
                  type="number"
                  min="1"
                  max="15"
                  value={formData.functionCount}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      functionCount: e.target.value === '' ? '' : Number(e.target.value),
                    })
                  }
                  placeholder="e.g. 4"
                  className="w-full px-3.5 py-2.5 bg-[#fbf9f3] dark:bg-[#1d201b] border border-[#ddd5c3] dark:border-[#3b4237] focus:border-[#a8844a] focus:ring-1 focus:ring-[#a8844a] text-sm text-[#2a2a25] dark:text-[#f7f3ea] outline-none font-sans"
                />
              </div>
            </div>

            {/* 9. Approximate Budget (30 - 50 Lakhs, 50 - 70 Lakhs, 70 Lakh - 1 Cr, 1 CR +) */}
            <div className="mb-8">
              <label className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea] mb-2.5">
                <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">9.</span> Approximate Wedding Budget
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {BUDGET_RANGES.map((range) => (
                  <button
                    key={range}
                    type="button"
                    onClick={() => setFormData({ ...formData, approximateBudget: range })}
                    className={`py-2.5 px-3 text-xs font-sans border transition-all text-center cursor-pointer ${
                      formData.approximateBudget === range
                        ? 'bg-[#3b4637] text-[#f7f3ea] border-[#3b4637] font-medium shadow-xs'
                        : 'bg-[#f7f3ea] dark:bg-[#1d201b] text-[#6f6c62] dark:text-[#ddd5c3] border-[#ddd5c3] dark:border-[#3b4237] hover:border-[#a8844a]'
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
                <label className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea]">
                  <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">10.</span> What do you need help with? <span className="text-[#a8844a]">*</span>
                </label>
                <span className="text-[11px] font-sans text-[#6f6c62] dark:text-[#969387] tracking-wider">
                  Select all that apply
                </span>
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
                          ? 'bg-[#3b4637]/10 dark:bg-[#3b4637]/30 border-[#3b4637] dark:border-[#a8844a] text-[#2a2a25] dark:text-[#f7f3ea]'
                          : 'bg-[#f7f3ea] dark:bg-[#1d201b] border-[#ddd5c3] dark:border-[#3b4237] text-[#6f6c62] dark:text-[#ddd5c3] hover:border-[#a8844a]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 border flex items-center justify-center shrink-0 transition-colors ${
                          isChecked
                            ? 'border-[#3b4637] dark:border-[#a8844a] bg-[#3b4637] text-[#e6d5b0]'
                            : 'border-[#ddd5c3] dark:border-[#3b4237] bg-transparent'
                        }`}
                      >
                        {isChecked && (
                          <svg className="w-3 h-3 stroke-current" fill="none" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-xs font-sans tracking-wide font-medium">
                        {service.label}
                      </span>
                    </button>
                  );
                })}
              </div>
              {errors.servicesNeeded && (
                <p className="mt-1.5 text-xs text-red-600 font-sans">{errors.servicesNeeded}</p>
              )}
            </div>

            {/* 11. Additional Notes */}
            <div className="mb-8">
              <label
                htmlFor="additionalNotes"
                className="block text-xs font-sans font-medium uppercase tracking-[0.16em] text-[#2a2a25] dark:text-[#f7f3ea] mb-2"
              >
                <span className="font-serif text-sm text-[#a8844a] dark:text-[#c9a96a] mr-1">11.</span> Anything else we should know?
              </label>
              <textarea
                id="additionalNotes"
                name="additionalNotes"
                rows={3}
                value={formData.additionalNotes}
                onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                placeholder="Specific venues you like, family traditions, travel logistics or special requests..."
                className="w-full px-3.5 py-2.5 bg-[#fbf9f3] dark:bg-[#1d201b] border border-[#ddd5c3] dark:border-[#3b4237] focus:border-[#a8844a] focus:ring-1 focus:ring-[#a8844a] text-sm text-[#2a2a25] dark:text-[#f7f3ea] placeholder-[#6f6c62]/60 outline-none resize-y font-sans"
              />
            </div>

            {/* Free Luxury Car for Venue Visits Checkbox */}
            <div className="mb-10 p-5 sm:p-6 bg-[#f7f3ea] dark:bg-[#1d201b] border-2 border-[#a8844a]/60 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-28 h-28 bg-[#a8844a]/10 rounded-full blur-2xl pointer-events-none" />
              <label className="flex items-start gap-3.5 cursor-pointer select-none">
                <input
                  type="checkbox"
                  id="complimentaryRideCheckbox"
                  name="complimentaryRideRequested"
                  value="Yes"
                  checked={formData.complimentaryRideRequested ?? true}
                  onChange={(e) =>
                    setFormData({ ...formData, complimentaryRideRequested: e.target.checked })
                  }
                  className="mt-1 w-4 h-4 accent-[#3b4637] dark:accent-[#c9a96a] cursor-pointer shrink-0"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1 text-xs sm:text-[13px] font-serif uppercase tracking-wider text-[#2a2a25] dark:text-[#f7f3ea] font-semibold">
                    <span>Free Client Privilege</span>
                    <span>·</span>
                    <span className="text-[#a8844a] dark:text-[#c9a96a]">Free Luxury Car for Venue Visits</span>
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#6f6c62] dark:text-[#ddd5c3]/80 font-sans leading-relaxed font-light">
                    Yes, arrange a <strong>free chauffeured luxury car</strong> to visit our top shortlisted venues before we book anything. Accompanied by your senior planner with zero booking obligations.
                  </p>
                </div>
              </label>
            </div>

            {/* Submission Error Banner */}
            {submitError && (
              <div className="mb-6 p-4 sm:p-5 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 text-red-900 dark:text-red-200 text-xs sm:text-sm font-sans flex items-start gap-3 shadow-xs">
                <svg
                  className="w-5 h-5 text-red-600 shrink-0 mt-0.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
                <div className="flex-1 space-y-2">
                  <p className="font-medium leading-relaxed">{submitError}</p>
                  <div className="flex flex-wrap items-center gap-3 pt-1">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-3 py-1 bg-red-700 text-white text-xs font-semibold uppercase tracking-wider hover:bg-red-800 transition-colors cursor-pointer"
                    >
                      Retry Submission
                    </button>
                    <a
                      href={`https://wa.me/918800843189?text=${encodeURIComponent(`Hello The House of Weddings, I was submitting my enquiry for ${formData.fullName || 'our wedding'} in ${formData.destinationCity || 'India'}. Could we connect directly on WhatsApp?`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-red-800 dark:text-red-300 font-semibold underline underline-offset-2 hover:text-red-950"
                    >
                      Connect on WhatsApp &rarr;
                    </a>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button in Deep Sage (#3b4637) with Gold border */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-[#ddd5c3] dark:border-[#3b4237]">
              <p className="text-[11px] font-sans text-[#6f6c62] dark:text-[#969387] tracking-wide text-center sm:text-left">
                Your details are 100% private and confidential.
              </p>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full sm:w-auto px-9 py-3.5 text-xs sm:text-[13px] font-sans font-semibold tracking-[0.16em] uppercase text-[#f7f3ea] bg-[#3b4637] hover:bg-[#2b3428] active:scale-[0.99] transition-all border border-[#a8844a] shadow-md disabled:opacity-60 whitespace-nowrap cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <span>{isSubmitting ? 'Sending Details...' : 'Submit & Book Free Call'}</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
};
