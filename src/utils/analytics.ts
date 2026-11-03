/**
 * The House of Weddings - Google Analytics 4 (GA4) Engine
 * Seamless, privacy-respecting client-side telemetry and conversion tracking.
 * Configurable via VITE_GA_MEASUREMENT_ID environment variable (e.g. G-XXXXXXXXXX).
 */

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    GA_MEASUREMENT_ID?: string;
  }
}

// Container Measurement ID
export const DEFAULT_GA_ID = 'G-M6RYJ5GBFE';

export const getMeasurementId = (): string => {
  if (typeof window !== 'undefined' && window.GA_MEASUREMENT_ID) {
    return window.GA_MEASUREMENT_ID;
  }
  const envId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  if (envId && typeof envId === 'string' && envId.trim() && !envId.startsWith('%')) {
    return envId.trim();
  }
  return DEFAULT_GA_ID;
};

let isInitialized = false;

/**
 * Initializes GA4 tag if not already injected.
 */
export const initGA = (): void => {
  if (typeof window === 'undefined' || isInitialized) return;

  const measurementId = getMeasurementId();

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
  }

  // Check if script is already present in document
  const existingScript = document.querySelector(`script[src*="googletagmanager.com/gtag/js"]`);
  if (!existingScript) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script);
  }

  window.gtag('js', new Date());
  window.gtag('config', measurementId, {
    send_page_view: true,
    anonymize_ip: true,
    cookie_flags: 'SameSite=None;Secure',
  });

  isInitialized = true;

  if (import.meta.env.DEV) {
    console.info(`[Analytics] GA4 Initialized with ID: ${measurementId}`);
  }
};

/**
 * Send standard pageview
 */
export const trackPageView = (pageTitle?: string, pagePath?: string): void => {
  if (typeof window === 'undefined') return;
  const path = pagePath || window.location.pathname + window.location.hash;
  const title = pageTitle || document.title;

  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_title: title,
      page_location: window.location.href,
      page_path: path,
    });
  }

  if (import.meta.env.DEV) {
    console.log(`[Analytics] PageView -> ${path} (${title})`);
  }
};

/**
 * Custom event tracking helper
 */
export const trackEvent = (eventName: string, params: Record<string, unknown> = {}): void => {
  if (typeof window === 'undefined') return;

  if (window.gtag) {
    window.gtag('event', eventName, params);
  }

  if (import.meta.env.DEV) {
    console.log(`[Analytics] Event: "${eventName}"`, params);
  }
};

/**
 * Conversion Event: Wedding Enquiry Form Submitted (Key Lead Conversion)
 */
export const trackEnquirySubmission = (data: {
  fullName: string;
  destinationCity?: string;
  guestCount?: string | number;
  approximateBudget?: string;
  servicesNeeded?: string[];
  complimentaryRideRequested?: boolean;
}): void => {
  // Approximate numerical value for GA4 value parameter based on budget tier
  let estValue = 50000;
  if (data.approximateBudget?.includes('1 CR')) estValue = 200000;
  else if (data.approximateBudget?.includes('70 Lakh')) estValue = 150000;
  else if (data.approximateBudget?.includes('50 - 70')) estValue = 100000;

  // Standard GA4 Lead conversion event
  trackEvent('generate_lead', {
    currency: 'INR',
    value: estValue,
    lead_source: 'wedding_enquiry_form',
    destination_city: data.destinationCity || 'Not Specified',
    guest_count: Number(data.guestCount) || 0,
    budget_range: data.approximateBudget || 'Not Specified',
    services_count: data.servicesNeeded?.length || 0,
    recce_car_requested: data.complimentaryRideRequested ? 'yes' : 'no',
  });

  // Custom branded wedding conversion
  trackEvent('wedding_enquiry_submitted', {
    client_name: data.fullName,
    destination: data.destinationCity,
    budget: data.approximateBudget,
  });
};

/**
 * Contact Event: Direct WhatsApp Click
 */
export const trackWhatsAppClick = (source: string, destinationCity?: string): void => {
  trackEvent('contact', {
    method: 'whatsapp',
    contact_source: source,
    destination_city: destinationCity || 'All',
  });

  trackEvent('whatsapp_chat_initiated', {
    source,
  });
};

/**
 * Engagement Event: Brochure Opened / Downloaded
 */
export const trackBrochureAction = (
  action: 'opened' | 'downloaded' | 'printed',
  brochureType: string
): void => {
  if (action === 'downloaded') {
    trackEvent('file_download', {
      file_name: `The_House_of_Weddings_${brochureType}_Brochure.pdf`,
      file_extension: 'pdf',
      brochure_type: brochureType,
    });
  } else {
    trackEvent('view_item', {
      item_name: `Maison Wedding Brochure (${brochureType})`,
      item_category: 'Brochure',
      action,
    });
  }
};

/**
 * Interactive Tool: Guest & Budget Optimizer Calculation
 */
export const trackCalculatorUsage = (
  invitedGuests: number,
  attendanceRate: number,
  totalSavings: number,
  venueTier: string
): void => {
  trackEvent('calculate_budget', {
    invited_guests: invitedGuests,
    attendance_rate: attendanceRate,
    total_savings_inr: totalSavings,
    venue_tier: venueTier,
  });
};
