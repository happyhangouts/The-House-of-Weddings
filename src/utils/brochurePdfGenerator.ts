import { jsPDF } from 'jspdf';
import { BROCHURE_ASSETS } from '../components/BrochurePrintablePages';

// Helper to load an image from URL and return a base64 Data URL
const loadImageAsBase64 = async (url: string): Promise<string> => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${url}`);
    }
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Error loading image for PDF:', error);
    // Return empty transparent 1x1 png as fallback
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAAElFTkSuQmCC';
  }
};

export const generateBrochurePdf = async (
  onProgress?: (current: number, total: number) => void,
  customLogoSrc?: string
): Promise<void> => {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = 210;
  const pageHeight = 297;
  const totalPages = 6;

  // Colors
  const cEmerald = '#032B24';
  const cGold = '#758361';
  const cGoldDark = '#586546';
  const cPaper = '#FAF8F3';
  const cPaperCard = '#FCFAF6';
  const cTextDark = '#1A2E26';
  const cTextMuted = '#4A5B53';

  // Pre-load all 5 photography images and the official logo
  if (onProgress) onProgress(1, totalPages);

  const [img1, img2, img3, img4, img6, logoImg] = await Promise.all([
    loadImageAsBase64(BROCHURE_ASSETS.coverStaircase),
    loadImageAsBase64(BROCHURE_ASSETS.palaceTeam),
    loadImageAsBase64(BROCHURE_ASSETS.stageTeam),
    loadImageAsBase64(BROCHURE_ASSETS.fortTeam),
    loadImageAsBase64(BROCHURE_ASSETS.heritageTeam),
    loadImageAsBase64(customLogoSrc || '/logo.jpg'),
  ]);

  // Frame and border drawer
  const drawPageBorder = (pageNum: number) => {
    // Paper background
    doc.setFillColor(cPaper);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Outer subtle gold frame
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.45);
    doc.rect(8, 8, pageWidth - 16, pageHeight - 16);

    // Inner fine dark frame
    doc.setDrawColor(3, 43, 36);
    doc.setLineWidth(0.18);
    doc.rect(10, 10, pageWidth - 20, pageHeight - 20);

    // Footer divider
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.25);
    doc.line(12, 284, pageWidth - 12, 284);

    // Running footer text
    doc.setFont('times', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(cEmerald);
    doc.text(
      pageNum === 1
        ? 'THE HOUSE OF WEDDINGS   ·   by MUBAARQAAN'
        : 'THE HOUSE OF WEDDINGS · EVENT MANAGEMENT & HOSPITALITY',
      14,
      289
    );

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(cTextMuted);
    doc.text(`PAGE 0${pageNum} OF 0${totalPages}`, pageWidth - 14, 289, { align: 'right' });
  };

  // Reusable Running Header for Pages 2 to 6
  const drawRunningHeader = (title: string, subtitle: string) => {
    // Mini Logo Box using attached logo with background
    if (logoImg) {
      doc.addImage(logoImg, 'JPEG', 14, 12, 9.5, 9.5);
      doc.setDrawColor(117, 131, 97);
      doc.setLineWidth(0.25);
      doc.rect(14, 12, 9.5, 9.5);
    } else {
      doc.setFillColor(cEmerald);
      doc.rect(14, 13, 11, 8.5, 'F');
      doc.setDrawColor(117, 131, 97);
      doc.setLineWidth(0.3);
      doc.rect(14, 13, 11, 8.5);

      doc.setFont('times', 'bold');
      doc.setFontSize(8.5);
      doc.setTextColor(cGold);
      doc.text('HW', 19.5, 18, { align: 'center' });

      doc.setFont('helvetica', 'normal');
      doc.setFontSize(3.2);
      doc.setTextColor(248, 245, 238);
      doc.text('WEDDINGS', 19.5, 20.3, { align: 'center' });
    }

    // Right Header Text
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7.5);
    doc.setTextColor(cEmerald);
    doc.text(title, pageWidth - 14, 17, { align: 'right' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(cGoldDark);
    doc.text(subtitle, pageWidth - 14, 20.5, { align: 'right' });

    // Header divider line
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.2);
    doc.line(14, 23, pageWidth - 14, 23);
  };

  // =========================================================================
  // PAGE 1: COVER
  // =========================================================================
  drawPageBorder(1);

  // Top header text
  doc.setFillColor(cGold);
  doc.circle(15, 14.5, 1, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.2);
  doc.setTextColor(cEmerald);
  doc.text('CAPABILITY BROCHURE', 18, 15.5);

  doc.setFont('times', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(cGoldDark);
  doc.text('EDITION 2026 · PRIVATE & CONFIDENTIAL', pageWidth - 14, 15.5, { align: 'right' });

  // Center Logo Emblem with exact attached background logo
  const logoW1 = 28;
  const logoH1 = 28;
  const emblemY = 21;
  if (logoImg) {
    doc.addImage(logoImg, 'JPEG', pageWidth / 2 - logoW1 / 2, emblemY, logoW1, logoH1);
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.35);
    doc.rect(pageWidth / 2 - logoW1 / 2, emblemY, logoW1, logoH1);
  } else {
    doc.setFillColor(cEmerald);
    doc.rect(pageWidth / 2 - 20, emblemY, 40, 24, 'F');
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.4);
    doc.rect(pageWidth / 2 - 19.2, emblemY + 0.8, 38.4, 22.4);

    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(cGold);
    doc.text('HW', pageWidth / 2, emblemY + 12, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.8);
    doc.setTextColor(248, 245, 238);
    doc.text('THE HOUSE OF WEDDINGS', pageWidth / 2, emblemY + 17, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(4);
    doc.setTextColor(cGold);
    doc.text('by MUBAARQAAN', pageWidth / 2, emblemY + 20.5, { align: 'center' });
  }

  // Small gold diamond separator
  doc.setFont('times', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(cGoldDark);
  doc.text('◆', pageWidth / 2, 52, { align: 'center' });

  // Title block
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cEmerald);
  doc.text('EVENT MANAGEMENT & GUEST HOSPITALITY', pageWidth / 2, 57.5, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(cEmerald);
  doc.text('BE A GUEST AT YOUR OWN WEDDING.', pageWidth / 2, 65.5, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(9.5);
  doc.setTextColor(cTextMuted);
  doc.text(
    'Thoughtful hospitality. On-time coordination. Zero stress for the family.',
    pageWidth / 2,
    71.5,
    { align: 'center' }
  );

  // Main Staircase Image
  if (img1) {
    const imgX = 16;
    const imgY = 76;
    const imgW = 178;
    const imgH = 200;
    doc.addImage(img1, 'JPEG', imgX, imgY, imgW, imgH);
    doc.setDrawColor(3, 43, 36);
    doc.setLineWidth(0.25);
    doc.rect(imgX, imgY, imgW, imgH);
  }

  // =========================================================================
  // PAGE 2: GUEST HOSPITALITY & CARE
  // =========================================================================
  if (onProgress) onProgress(2, totalPages);
  doc.addPage();
  drawPageBorder(2);
  drawRunningHeader('WHAT WE TAKE CARE OF', 'CORE GUEST SERVICES');

  // Section Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cGoldDark);
  doc.text('GUEST EXPERIENCE', 14, 29);

  doc.setFont('times', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(cEmerald);
  doc.text('GUEST HOSPITALITY & CARE', 14, 36);

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(cTextMuted);
  doc.text(
    'We look after your guests from arrival to departure, so you can enjoy every moment.',
    14,
    41
  );

  // Palace Photo
  if (img2) {
    doc.addImage(img2, 'JPEG', 14, 45, 182, 90);
    doc.setDrawColor(3, 43, 36);
    doc.setLineWidth(0.2);
    doc.rect(14, 45, 182, 90);
  }

  // 4 Core Pillars
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(cEmerald);
  doc.text('FOUR CORE PILLARS', 14, 142);

  const colW = 88;
  const p2Cards = [
    {
      num: '01',
      title: 'RSVP & GUEST LIST',
      body: 'We confirm attendance, track flight arrival times, manage hotel room bookings, and record special dietary needs before day one.',
      tags: 'ATTENDANCE TRACKING · ROOM ALLOCATIONS · FLIGHT SYNC',
    },
    {
      num: '02',
      title: 'AIRPORT & HOTEL WELCOME',
      body: 'Warm greetings at the airport or station, luggage delivered straight to rooms, fast-track check-in, and welcome gifts.',
      tags: 'AIRPORT GREETINGS · LUGGAGE TO ROOMS · EXPRESS CHECK-IN',
    },
    {
      num: '03',
      title: 'CARS & VENUE TRAVEL',
      body: 'Chauffeur cars, regular shuttles between hotel and wedding venues, live delay tracking and on-time travel for everyone.',
      tags: 'CHAUFFEUR CARS · VENUE SHUTTLES · ON-TIME PICKUPS',
    },
    {
      num: '04',
      title: 'FAMILY & VIP SHADOWS',
      body: 'Personal coordinators assigned to the bride, groom, and parents to assist with schedules, refreshments, attire, and small needs.',
      tags: 'BRIDE & GROOM SHADOWS · PARENT CARE · DAILY TIMELINES',
    },
  ];

  p2Cards.forEach((c, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cX = 14 + col * (colW + 6);
    const cY = 146 + row * 66;

    // Card background
    doc.setFillColor(cPaperCard);
    doc.rect(cX, cY, colW, 61, 'F');
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.3);
    doc.rect(cX, cY, colW, 61);

    // Number
    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(cGoldDark);
    doc.text(c.num, cX + colW - 6, cY + 8, { align: 'right' });

    // Title
    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(cEmerald);
    doc.text(c.title, cX + 6, cY + 8);

    // Body
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(cTextDark);
    const splitBody = doc.splitTextToSize(c.body, colW - 12);
    doc.text(splitBody, cX + 6, cY + 16);

    // Dividing rule
    doc.setDrawColor(3, 43, 36);
    doc.setLineWidth(0.12);
    doc.line(cX + 6, cY + 47, cX + colW - 6, cY + 47);

    // Tags
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.8);
    doc.setTextColor(cGoldDark);
    doc.text(doc.splitTextToSize(c.tags, colW - 12), cX + 6, cY + 53);
  });

  // =========================================================================
  // PAGE 3: ON-GROUND EXECUTION
  // =========================================================================
  if (onProgress) onProgress(3, totalPages);
  doc.addPage();
  drawPageBorder(3);
  drawRunningHeader('EVERY DETAIL HANDLED', 'ON-GROUND OPERATIONS');

  // Section Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cGoldDark);
  doc.text('ON-GROUND EXECUTION', 14, 29);

  doc.setFont('times', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(cEmerald);
  doc.text('CALM, ORGANIZED, IN CONTROL', 14, 36);

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(cTextMuted);
  doc.text(
    'One dedicated team working behind the scenes so every event runs smoothly.',
    14,
    41
  );

  // Stage Photo
  if (img3) {
    doc.addImage(img3, 'JPEG', 14, 45, 182, 90);
    doc.setDrawColor(3, 43, 36);
    doc.setLineWidth(0.2);
    doc.rect(14, 45, 182, 90);
  }

  // Operational Divisions
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.8);
  doc.setTextColor(cEmerald);
  doc.text('OPERATIONAL DIVISIONS', 14, 142);

  const p3Cards = [
    {
      num: '05',
      title: 'HELP DESK & CONCIERGE',
      body: 'A friendly lobby desk to answer guest questions, share daily wedding schedules, hand out room keys, and solve any room requests.',
      tags: 'LOBBY HELP DESK · DAILY SCHEDULES · ROOM KEYS & KITS',
    },
    {
      num: '06',
      title: 'FOOD & DINING CARE',
      body: 'Managing buffet and dining timings, reserved table seating for family and elders, and taking care of special dietary requests.',
      tags: 'DINING TIMINGS · RESERVED SEATING · DIETARY CARE',
    },
    {
      num: '07',
      title: '24/7 NIGHT SUPPORT',
      body: 'A coordinator on duty all night for late-night guest arrivals, early morning flights, emergency supplies, and doctor requests.',
      tags: 'ROUND-THE-CLOCK · LATE CHECK-IN · URGENT NEEDS',
    },
    {
      num: '08',
      title: 'EVENT CONTROL ROOM',
      body: 'One central coordination room linking hotel staff, car drivers, security and vendors on walkie-talkies so everything is on time.',
      tags: 'RADIO COMMUNICATION · DRIVER SYNC · INSTANT SUPPORT',
    },
  ];

  p3Cards.forEach((c, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const cX = 14 + col * (colW + 6);
    const cY = 146 + row * 66;

    doc.setFillColor(cPaperCard);
    doc.rect(cX, cY, colW, 61, 'F');
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.3);
    doc.rect(cX, cY, colW, 61);

    doc.setFont('times', 'bold');
    doc.setFontSize(10.5);
    doc.setTextColor(cGoldDark);
    doc.text(c.num, cX + colW - 6, cY + 8, { align: 'right' });

    doc.setFont('times', 'bold');
    doc.setFontSize(10);
    doc.setTextColor(cEmerald);
    doc.text(c.title, cX + 6, cY + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.8);
    doc.setTextColor(cTextDark);
    doc.text(doc.splitTextToSize(c.body, colW - 12), cX + 6, cY + 16);

    doc.setDrawColor(3, 43, 36);
    doc.setLineWidth(0.12);
    doc.line(cX + 6, cY + 47, cX + colW - 6, cY + 47);

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(5.8);
    doc.setTextColor(cGoldDark);
    doc.text(doc.splitTextToSize(c.tags, colW - 12), cX + 6, cY + 53);
  });

  // =========================================================================
  // PAGE 4: WHY WORK WITH US
  // =========================================================================
  if (onProgress) onProgress(4, totalPages);
  doc.addPage();
  drawPageBorder(4);
  drawRunningHeader('WHY WORK WITH US', 'OUR STANDARDS & TRAVEL');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cGoldDark);
  doc.text('THE HOUSE OF WEDDINGS WAY', 14, 29);

  doc.setFont('times', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(cEmerald);
  doc.text('MORE THAN COORDINATION. PEACE OF MIND.', 14, 36);

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(cTextMuted);
  doc.text(
    'Polite, well-trained teams who care for your guests like their own.',
    14,
    41
  );

  // 4 Standards
  const standards = [
    {
      title: 'POLITE & PROFESSIONAL',
      body: 'Well-groomed, respectful coordinators who greet every guest warmly and help with patience and care.',
    },
    {
      title: 'PROACTIVE CARE',
      body: 'We notice small needs and solve unexpected issues quietly before they become problems for the family.',
    },
    {
      title: 'ONE CONNECTED TEAM',
      body: 'Hotel staff, car drivers, venue teams, and decorators all work together under our single coordination.',
    },
    {
      title: 'ZERO FAMILY STRESS',
      body: 'The bride, groom, and parents can relax, meet relatives, and enjoy every ritual without managing logistics.',
    },
  ];

  standards.forEach((s, idx) => {
    const col = idx % 2;
    const row = Math.floor(idx / 2);
    const sX = 14 + col * (colW + 6);
    const sY = 46 + row * 34;

    doc.setFillColor(cPaperCard);
    doc.rect(sX, sY, colW, 30, 'F');
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.3);
    doc.rect(sX, sY, colW, 30);

    doc.setFont('times', 'bold');
    doc.setFontSize(9.5);
    doc.setTextColor(cEmerald);
    doc.text(s.title, sX + 5, sY + 7);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(cTextDark);
    doc.text(doc.splitTextToSize(s.body, colW - 10), sX + 5, sY + 14);
  });

  // Destination Weddings Strip
  const destY = 117;
  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(cEmerald);
  doc.text('DESTINATION WEDDINGS', 14, destY);

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(cGoldDark);
  doc.text('Anywhere Across India & Worldwide', pageWidth - 14, destY, { align: 'right' });

  const destItems = [
    { title: 'AIRPORT PICKUPS', desc: 'Cars & Flight Sync' },
    { title: 'HOTEL CHECK-IN', desc: 'Rooms & Luggage' },
    { title: 'VENUE SHUTTLES', desc: 'Continuous Travel' },
    { title: '24/7 GUEST DESK', desc: 'Always Available' },
  ];

  const destColW = 43;
  destItems.forEach((d, idx) => {
    const dX = 14 + idx * (destColW + 3.3);
    doc.setFillColor('#F1ECE0');
    doc.rect(dX, destY + 3, destColW, 16, 'F');
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.2);
    doc.rect(dX, destY + 3, destColW, 16);

    doc.setFont('times', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(cEmerald);
    doc.text(d.title, dX + destColW / 2, destY + 9, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.5);
    doc.setTextColor(cTextMuted);
    doc.text(d.desc, dX + destColW / 2, destY + 14, { align: 'center' });
  });

  // Fort Image
  if (img4) {
    doc.addImage(img4, 'JPEG', 14, 140, 182, 138);
    doc.setDrawColor(3, 43, 36);
    doc.setLineWidth(0.2);
    doc.rect(14, 140, 182, 138);
  }

  // =========================================================================
  // PAGE 5: PACKAGES & INVESTMENT
  // =========================================================================
  if (onProgress) onProgress(5, totalPages);
  doc.addPage();
  drawPageBorder(5);
  drawRunningHeader('PACKAGES & INVESTMENT', 'TRANSPARENT RETAINERS');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cGoldDark);
  doc.text('TRANSPARENT WEDDING PACKAGES', 14, 29);

  doc.setFont('times', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(cEmerald);
  doc.text('WEDDING PACKAGES & MANAGEMENT TIERS', 14, 36);

  doc.setFont('times', 'italic');
  doc.setFontSize(9);
  doc.setTextColor(cTextMuted);
  doc.text(
    'Straightforward hospitality and management delegations tailored to your guest count and itinerary.',
    14,
    41
  );

  // 3 Pricing Columns
  const pkgColW = 58;
  const packages = [
    {
      badge: 'ESSENTIAL',
      title: 'BRONZE',
      scale: '150 to 250 Guests\n5 to 8 Coordinators',
      fee: '₹69,000+',
      note: 'Smooth guest hospitality & ceremony flow.',
      items: [
        'Guest RSVP & arrival tracking',
        'Airport & station pickup sync',
        'Lobby check-in & room keys',
        'Luggage delivery to rooms',
        '1 Couple Shadow (Bride & Groom)',
        'Venue shuttles & cars',
        'Ritual items & panditji sync',
      ],
      highlight: false,
    },
    {
      badge: 'MOST POPULAR',
      title: 'GOLD',
      scale: '250 to 450 Guests\n8 to 12 Coordinators',
      fee: '₹1,49,000+',
      note: 'Hospitality vendor sync & 1 family Innova Crysta.',
      items: [
        '★ 1 Innova Crysta for Family',
        '★ Full Vendor Coordination',
        'Airport & station pickups',
        '24/7 Hotel lobby help desk',
        'Luggage & welcome hampers',
        '2 Dedicated Family Shadows',
        'Venue shuttles & cars',
        'Dining & VIP table care',
      ],
      highlight: true,
    },
    {
      badge: 'DESTINATION',
      title: 'PLATINUM',
      scale: '400 to 700+ Guests\n12 to 15 Coordinators',
      fee: '₹2,19,000+',
      note: 'Palatial scale, master sync & 2 family Innova Crystas.',
      items: [
        '★ 2 Innova Crystas for Family',
        '★ Master Vendor Synchronization',
        'Multi-hotel & resort logistics',
        'Central Control Room desk',
        '4 Dedicated Shadows (Both Families)',
        'Baraat & saafa procession flow',
        'Continuous venue transit fleet',
        '24/7 VIP Concierge & doctor on call',
      ],
      highlight: false,
    },
  ];

  packages.forEach((pkg, idx) => {
    const pX = 14 + idx * (pkgColW + 4);
    const pY = 46;
    const pH = 182;

    if (pkg.highlight) {
      doc.setFillColor(cPaperCard);
      doc.rect(pX, pY, pkgColW, pH, 'F');
      doc.setDrawColor(117, 131, 97);
      doc.setLineWidth(0.7);
      doc.rect(pX, pY, pkgColW, pH);

      // Highlight Top Tag
      doc.setFillColor(cGold);
      doc.rect(pX + 12, pY - 3, pkgColW - 24, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(6);
      doc.setTextColor(cEmerald);
      doc.text(pkg.badge, pX + pkgColW / 2, pY + 1.2, { align: 'center' });
    } else {
      doc.setFillColor(cPaper);
      doc.rect(pX, pY, pkgColW, pH, 'F');
      doc.setDrawColor(3, 43, 36);
      doc.setLineWidth(0.2);
      doc.rect(pX, pY, pkgColW, pH);

      // Top Tag
      doc.setFillColor(cEmerald);
      doc.rect(pX + 4, pY + 4, pkgColW - 8, 5, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(5.8);
      doc.setTextColor(cGold);
      doc.text(pkg.badge, pX + pkgColW / 2, pY + 7.6, { align: 'center' });
    }

    // Title
    doc.setFont('times', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(cEmerald);
    doc.text(pkg.title, pX + 5, pY + 17);

    // Scale
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(cTextMuted);
    const lines = pkg.scale.split('\n');
    doc.text(lines[0], pX + 5, pY + 23);
    doc.text(lines[1], pX + 5, pY + 27);

    // Fee
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.2);
    doc.setTextColor(cGoldDark);
    doc.text('MANAGEMENT FEE', pX + 5, pY + 35);

    doc.setFont('times', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(cEmerald);
    doc.text(pkg.fee, pX + 5, pY + 43);

    doc.setFont('times', 'italic');
    doc.setFontSize(6.8);
    doc.setTextColor(cTextMuted);
    doc.text(doc.splitTextToSize(pkg.note, pkgColW - 10), pX + 5, pY + 48);

    // Divider
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.2);
    doc.line(pX + 5, pY + 58, pX + pkgColW - 5, pY + 58);

    // Inclusions
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(cEmerald);
    doc.text('KEY INCLUSIONS:', pX + 5, pY + 64);

    let incY = pY + 70;
    pkg.items.forEach((item) => {
      doc.setFont('helvetica', item.startsWith('★') ? 'bold' : 'normal');
      doc.setFontSize(6.8);
      doc.setTextColor(item.startsWith('★') ? cEmerald : cTextDark);
      doc.text(`✓ ${item}`, pX + 5, incY);
      incY += 7.2;
    });
  });

  // Simple Terms Box
  const termY = 233;
  doc.setFillColor('#F1ECE0');
  doc.rect(14, termY, pageWidth - 28, 45, 'F');
  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.3);
  doc.rect(14, termY, pageWidth - 28, 45);

  doc.setFont('times', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(cEmerald);
  doc.text('SIMPLE TERMS', 18, termY + 8);

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(cGoldDark);
  doc.text('Transparent retainers · No hidden fees', pageWidth - 18, termY + 8, { align: 'right' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7.5);
  doc.setTextColor(cTextDark);
  doc.text(
    '• Payments: 30% advance retainer on contract signing, 50% one month prior to wedding date, 20% on ceremony completion.',
    18,
    termY + 16
  );
  doc.text(
    '• Travel & Stay: Outstation return travel tickets and hotel accommodation for the deployed on-ground team provided by client.',
    18,
    termY + 24
  );
  doc.text(
    '• Vendor Sync: Decorators, sound, lighting, photography, catering, and bridal makeup teams synced to master ritual schedule.',
    18,
    termY + 32
  );
  doc.text(
    '• Overtime Support: Dedicated help desk and night concierge staff on call 24 hours across multi-day celebration itineraries.',
    18,
    termY + 40
  );

  // =========================================================================
  // PAGE 6: OUR PROMISE & TEAM
  // =========================================================================
  if (onProgress) onProgress(6, totalPages);
  doc.addPage();
  drawPageBorder(6);
  drawRunningHeader('OUR PROMISE & TEAM', 'HOSPITALITY MANAGEMENT');

  // Commitment Header
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cGoldDark);
  doc.text('THE COMMITMENT', pageWidth / 2, 29, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(17);
  doc.setTextColor(cEmerald);
  doc.text('OUR PROMISE TO YOU', pageWidth / 2, 36, { align: 'center' });

  // Quote Box
  const qBoxY = 41;
  doc.setFillColor(cPaperCard);
  doc.rect(20, qBoxY, pageWidth - 40, 26, 'F');
  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.3);
  doc.rect(20, qBoxY, pageWidth - 40, 26);

  // Gold vertical bar
  doc.setFillColor(cGold);
  doc.rect(20, qBoxY, 2, 26, 'F');

  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(cEmerald);
  const quoteText =
    '“A wedding is once in a lifetime. Our promise is simple: we look after every guest, every car, and every detail with genuine warmth and care — so you and your family can truly be guests at your own wedding.”';
  doc.text(doc.splitTextToSize(quoteText, pageWidth - 50), 26, qBoxY + 9);

  // Team Roles
  const rolesY = 73;
  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(cEmerald);
  doc.text('OUR ON-GROUND HOSPITALITY TEAM', pageWidth / 2, rolesY, { align: 'center' });

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(cGoldDark);
  doc.text(
    'PERSONAL SHADOWS   ·   CHAUFFEUR DRIVERS   ·   LOBBY HELP DESK   ·   GUEST RELATIONS   ·   DINING SUPPORT',
    pageWidth / 2,
    rolesY + 5.5,
    { align: 'center' }
  );

  // Heritage Hotel Photo
  if (img6) {
    doc.addImage(img6, 'JPEG', 14, 84, 182, 114);
    doc.setDrawColor(3, 43, 36);
    doc.setLineWidth(0.2);
    doc.rect(14, 84, 182, 114);
  }

  // Center Closing Logo Emblem as attached
  const logoW6 = 22;
  const logoH6 = 22;
  const logoY6 = 205;
  if (logoImg) {
    doc.addImage(logoImg, 'JPEG', pageWidth / 2 - logoW6 / 2, logoY6, logoW6, logoH6);
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.3);
    doc.rect(pageWidth / 2 - logoW6 / 2, logoY6, logoW6, logoH6);
  } else {
    doc.setFillColor(cEmerald);
    doc.rect(pageWidth / 2 - 20, logoY6, 40, 24, 'F');
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.4);
    doc.rect(pageWidth / 2 - 19.2, logoY6 + 0.8, 38.4, 22.4);

    doc.setFont('times', 'bold');
    doc.setFontSize(20);
    doc.setTextColor(cGold);
    doc.text('HW', pageWidth / 2, logoY6 + 12, { align: 'center' });

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(4.8);
    doc.setTextColor(248, 245, 238);
    doc.text('THE HOUSE OF WEDDINGS', pageWidth / 2, logoY6 + 17, { align: 'center' });

    doc.setFont('times', 'italic');
    doc.setFontSize(4);
    doc.setTextColor(cGold);
    doc.text('by MUBAARQAAN', pageWidth / 2, logoY6 + 20.5, { align: 'center' });
  }

  // Exact Requested Closing Text & Contact Info
  doc.setFont('times', 'bold');
  doc.setFontSize(12.5);
  doc.setTextColor(cEmerald);
  doc.text('BE A GUEST AT YOUR OWN WEDDING.', pageWidth / 2, 234, { align: 'center' });

  // Direct Contact Info as specified by user
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.2);
  doc.setTextColor(cTextDark);
  doc.text(
    'Direct Concierge Inquiries: +91 88008 43189 | Email: bookings@mubaarqaan.com',
    pageWidth / 2,
    240.5,
    { align: 'center' }
  );
  doc.text(
    'Instagram: @mubaarqaan | Website: www.mubaarqaan.com',
    pageWidth / 2,
    246,
    { align: 'center' }
  );

  // Save the PDF
  doc.save('The_House_of_Weddings_Capability_Brochure_2026.pdf');
};
