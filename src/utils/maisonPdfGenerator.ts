import { jsPDF } from 'jspdf';
import { MAISON_ASSETS } from '../components/MaisonFolioPrintablePages';

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
    console.error('Error loading image for Maison PDF:', error);
    return 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAAElFTkSuQmCC';
  }
};

export const generateMaisonPdf = async (
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
  const totalPages = 4;

  // Colors matching #758361 brand identity
  const cEmerald = '#032B24';
  const cSage = '#758361';
  const cPaper = '#FAF8F3';
  const cPaperCard = '#FCFAF6';
  const cTextMuted = '#4A5B53';

  if (onProgress) onProgress(1, totalPages);

  const [img1, img2, logoImg] = await Promise.all([
    loadImageAsBase64(MAISON_ASSETS.courtyardBanquet),
    loadImageAsBase64(MAISON_ASSETS.palaceMandap),
    loadImageAsBase64(customLogoSrc || '/logo.jpg'),
  ]);

  // Frame and border drawer
  const drawPageBorder = (pageNum: number) => {
    // Paper background
    doc.setFillColor(cPaper);
    doc.rect(0, 0, pageWidth, pageHeight, 'F');

    // Outer subtle sage frame
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
    doc.text('THE HOUSE OF WEDDINGS · BY MUBAARQAAN', 14, 289);

    doc.setFont('times', 'italic');
    doc.setFontSize(7.5);
    doc.setTextColor(cSage);
    doc.text('PRIVATE CLIENT ATELIER', pageWidth / 2, 289, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7);
    doc.setTextColor(cTextMuted);
    doc.text(`0${pageNum} / 0${totalPages}`, pageWidth - 14, 289, { align: 'right' });
  };

  // Reusable Running Header for Maison Pages
  const drawRunningHeader = (folioNum: string, sectionTitle: string) => {
    if (logoImg) {
      doc.addImage(logoImg, 'JPEG', 14, 12, 9.5, 9.5);
      doc.setDrawColor(117, 131, 97);
      doc.setLineWidth(0.25);
      doc.rect(14, 12, 9.5, 9.5);
    }

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(cEmerald);
    doc.text(`MAISON FOLIO · ${folioNum}`, pageWidth - 14, 16, { align: 'right' });

    doc.setFont('times', 'italic');
    doc.setFontSize(8);
    doc.setTextColor(cSage);
    doc.text(sectionTitle.toUpperCase(), pageWidth - 14, 20.5, { align: 'right' });

    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.25);
    doc.line(14, 24, pageWidth - 14, 24);
  };

  // ================= PAGE 1 =================
  drawPageBorder(1);
  drawRunningHeader('01', 'Private Client Introduction');

  // Eyebrow
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cSage);
  doc.text('THE MAISON · PRIVATE CLIENT ATELIER', 14, 30);

  // Main Titles
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(cEmerald);
  doc.text('YOUR WEDDING.', 14, 39);
  doc.setFont('times', 'italic');
  doc.setFontSize(20);
  doc.text('THOUGHTFULLY PLANNED.', 14, 47);

  // Subtitle
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(cTextMuted);
  doc.text(
    'A bespoke planning, spatial design, and guest management maison for heritage and destination celebrations.',
    14,
    53
  );

  // Hero Photo
  if (img1) {
    doc.addImage(img1, 'JPEG', 14, 58, 182, 105);
    doc.setDrawColor(3, 43, 36);
    doc.setLineWidth(0.3);
    doc.rect(14, 58, 182, 105);

    // Caption strip
    doc.setFillColor(2, 32, 26);
    doc.rect(14, 156, 182, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(cSage);
    doc.text('HERITAGE PALACE & DESTINATION CELEBRATIONS', 17, 160.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#F8F5EE');
    doc.text('NEW DELHI · RAJASTHAN · WORLDWIDE', pageWidth - 17, 160.5, { align: 'right' });
  }

  // Guiding Creed Box
  doc.setFillColor(cPaperCard);
  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.35);
  doc.rect(14, 172, 182, 34, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(cSage);
  doc.text('OUR GUIDING CREED', pageWidth / 2, 178, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(cEmerald);
  doc.text('BE A GUEST AT YOUR OWN WEDDING.', pageWidth / 2, 186, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(10.5);
  doc.setTextColor(cEmerald);
  doc.text(
    '"The true luxury of a wedding is time—the freedom to be fully present with those you love."',
    pageWidth / 2,
    194,
    { align: 'center' }
  );

  // Bottom text & CTA Box
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(cTextMuted);
  const p1BottomText = doc.splitTextToSize(
    'From palace acquisition to on-ground protocol, we curate and direct every detail with calm authority.',
    120
  );
  doc.text(p1BottomText, 14, 218);

  doc.setDrawColor(3, 43, 36);
  doc.setLineWidth(0.3);
  doc.rect(pageWidth - 70, 213, 56, 9);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cEmerald);
  doc.text('RESERVE CONSULTATION  ->', pageWidth - 42, 219, { align: 'center' });

  // ================= PAGE 2 =================
  if (onProgress) onProgress(2, totalPages);
  doc.addPage();
  drawPageBorder(2);
  drawRunningHeader('02', 'The Four Maison Pillars');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cSage);
  doc.text('THE FOUR PILLARS OF OUR PRACTICE', 14, 30);

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(cEmerald);
  doc.text('EVERY DETAIL,', 14, 38);
  doc.setFont('times', 'italic');
  doc.setFontSize(17);
  doc.text('HARMONIOUSLY CONNECTED.', 14, 45);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(cTextMuted);
  doc.text(
    'We unite architectural spatial design, palace acquisition, and guest concierge under one singular maison.',
    14,
    51
  );

  // Photo
  if (img2) {
    doc.addImage(img2, 'JPEG', 14, 56, 182, 85);
    doc.setDrawColor(3, 43, 36);
    doc.setLineWidth(0.3);
    doc.rect(14, 56, 182, 85);

    doc.setFillColor(2, 32, 26);
    doc.rect(14, 134, 182, 7, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(cSage);
    doc.text('ROYAL INDIAN HERITAGE & DESTINATION CELEBRATIONS', 17, 138.5);
    doc.setFont('helvetica', 'normal');
    doc.setTextColor('#F8F5EE');
    doc.text('BESPOKE CURATION', pageWidth - 17, 138.5, { align: 'right' });
  }

  // 4 Pillars Grid
  const pillars = [
    {
      num: 'PILLAR I',
      title: 'CURATED VENUE ACQUISITION',
      desc: 'Handpicked heritage palaces and private estates with absolute commercial clarity, room inventory, and dates before booking.',
      x: 14,
      y: 147,
    },
    {
      num: 'PILLAR II',
      title: 'SPATIAL DESIGN & 3D LAYOUTS',
      desc: 'Venue-calibrated 2D/3D visual maps for seating, stages, and guest movement before committing to production.',
      x: 107,
      y: 147,
    },
    {
      num: 'PILLAR III',
      title: 'GUEST INTELLIGENCE & RSVPS',
      desc: 'Precision attendance tracking, room allocations, and airport transit — eliminating catering and room waste.',
      x: 14,
      y: 193,
    },
    {
      num: 'PILLAR IV',
      title: 'ON-GROUND PROTOCOL & DIRECTING',
      desc: 'Senior directors on-site to lead vendors, manage timelines, and assist guests so your family celebrates uninterrupted.',
      x: 107,
      y: 193,
    },
  ];

  pillars.forEach((p) => {
    doc.setFillColor(cPaperCard);
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.25);
    doc.rect(p.x, p.y, 89, 40, 'FD');

    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(cSage);
    doc.text(p.num, p.x + 4, p.y + 6);

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(cEmerald);
    doc.text(p.title, p.x + 4, p.y + 12);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(cTextMuted);
    const descLines = doc.splitTextToSize(p.desc, 81);
    doc.text(descLines, p.x + 4, p.y + 18);
  });

  // Maison Standard Banner
  doc.setFillColor('#F1ECE0');
  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.2);
  doc.rect(14, 243, 182, 18, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(cSage);
  doc.text('THE MAISON STANDARD', pageWidth / 2, 247.5, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(cEmerald);
  doc.text('DISCIPLINE IN PLANNING. MAJESTY IN CELEBRATION.', pageWidth / 2, 252.5, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(cTextMuted);
  doc.text('Working seamlessly alongside your chosen decorators and production partners.', pageWidth / 2, 257, {
    align: 'center',
  });

  // ================= PAGE 3 =================
  if (onProgress) onProgress(3, totalPages);
  doc.addPage();
  drawPageBorder(3);
  drawRunningHeader('03', 'The Atelier Standards');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cSage);
  doc.text('THE ATELIER PROMISE & STANDARDS', 14, 30);

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(cEmerald);
  doc.text('CLARITY OF VISION.', 14, 38);
  doc.setFont('times', 'italic');
  doc.setFontSize(17);
  doc.text('PEACE OF MIND.', 14, 45);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(cTextMuted);
  doc.text(
    'A disciplined planning methodology designed to protect your family’s time, resources, and celebration experience.',
    14,
    51
  );

  // 6 Standards Grid
  const standards = [
    { num: '01', title: 'SAVE TIME', desc: 'A curated shortlist tailored to your family’s vision.' },
    { num: '02', title: 'CLEAR VENUE CHOICES', desc: 'Compare real costs and room capacity side-by-side.' },
    { num: '03', title: 'VISUAL CONFIDENCE', desc: 'See 2D & 3D layouts before finalizing with decorators.' },
    { num: '04', title: 'ACCURATE HEADCOUNT', desc: 'Confirmed RSVPs for catering, seating, and room blocks.' },
    { num: '05', title: 'ZERO CONFUSION', desc: 'Family, venue, and vendors aligned on one clear timeline.' },
    { num: '06', title: 'THOUGHTFUL SPENDING', desc: 'Avoid booking extra rooms or ordering excess food.' },
  ];

  standards.forEach((st, i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? 14 : 107;
    const y = 60 + row * 38;

    doc.setFillColor(cPaperCard);
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.25);
    doc.rect(x, y, 89, 32, 'FD');

    doc.setFont('times', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(cSage);
    doc.text(`${st.num}.`, x + 4, y + 8);

    doc.setFont('times', 'bold');
    doc.setFontSize(8.5);
    doc.setTextColor(cEmerald);
    doc.text(st.title, x + 12, y + 8);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.5);
    doc.setTextColor(cTextMuted);
    const descLines = doc.splitTextToSize(st.desc, 81);
    doc.text(descLines, x + 4, y + 16);
  });

  // 07 Standard Feature Box
  doc.setFillColor(cPaperCard);
  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.5);
  doc.rect(14, 185, 182, 34, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(10.5);
  doc.setTextColor(cSage);
  doc.text('07.', 18, 194);

  doc.setFont('times', 'bold');
  doc.setFontSize(10);
  doc.setTextColor(cEmerald);
  doc.text('TOTAL PRESENCE & PEACE OF MIND', 26, 194);

  doc.setFillColor(117, 131, 97);
  doc.rect(pageWidth - 55, 189, 37, 6, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor('#FFFFFF');
  doc.text('THE ULTIMATE LUXURY', pageWidth - 36.5, 193.2, { align: 'center' });

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(cTextMuted);
  const p3BoxDesc = doc.splitTextToSize(
    'The profound luxury of being an honored guest at your own family’s milestone while our maison directs every timeline and arrangement.',
    174
  );
  doc.text(p3BoxDesc, 18, 203);

  // Maison Commitment Banner
  doc.setFillColor('#F1ECE0');
  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.2);
  doc.rect(14, 235, 182, 18, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(cSage);
  doc.text('THE MAISON COMMITMENT', pageWidth / 2, 239.5, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(cEmerald);
  doc.text('CALM, MAJESTY, AND DILIGENCE FOR YOUR FAMILY’S CELEBRATION.', pageWidth / 2, 244.5, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(cTextMuted);
  doc.text('Be a guest at your own wedding — savor every unrepeatable second.', pageWidth / 2, 249, {
    align: 'center',
  });

  // ================= PAGE 4 =================
  if (onProgress) onProgress(4, totalPages);
  doc.addPage();
  drawPageBorder(4);
  drawRunningHeader('04', 'Private Engagement');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cSage);
  doc.text('INVESTMENT INTELLIGENCE & STEWARDSHIP', 14, 30);

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(cEmerald);
  doc.text('INFORMED DECISIONS.', 14, 38);
  doc.setFont('times', 'italic');
  doc.setFontSize(17);
  doc.text('THOUGHTFUL SPENDING.', 14, 45);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(cTextMuted);
  doc.text(
    'True luxury is never wasteful. We organize guest lists, venue contracts, and room blocks so every expense serves your celebration.',
    14,
    51
  );

  // Guest Intelligence Model Box
  doc.setFillColor(cPaperCard);
  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.25);
  doc.rect(14, 58, 182, 45, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(cSage);
  doc.text('THE MAISON GUEST INTELLIGENCE MODEL', 18, 64);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.text('ILLUSTRATIVE PARADIGM', pageWidth - 18, 64, { align: 'right' });

  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.2);
  doc.line(18, 67, pageWidth - 18, 67);

  // Numbers row
  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(cEmerald);
  doc.text('300', 44, 76, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(cTextMuted);
  doc.text('INVITED GUESTS', 44, 81, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(cSage);
  doc.text('247', 105, 76, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(cTextMuted);
  doc.text('CONFIRMED RSVPS', 105, 81, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(18);
  doc.setTextColor(cEmerald);
  doc.text('235', 166, 76, { align: 'center' });
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6.5);
  doc.setTextColor(cTextMuted);
  doc.text('ATTENDING GUESTS', 166, 81, { align: 'center' });

  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.2);
  doc.line(18, 85, pageWidth - 18, 85);

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(cTextMuted);
  doc.text(
    'Our guest intelligence ensures you contract catering, rooms, and transfers only for confirmed guests — saving lakhs in avoidable surplus.',
    pageWidth / 2,
    92,
    { align: 'center' }
  );

  // 4 Cards Row
  const cards = [
    { title: 'PALACE & ESTATES', sub: 'Direct commercial clarity' },
    { title: 'CATERING PRECISION', sub: 'Per-plate counts in sync' },
    { title: 'HOSPITALITY BLOCKS', sub: 'Exact room allocations' },
    { title: 'TRANSIT LOGISTICS', sub: 'Chauffeured airport flows' },
  ];

  cards.forEach((c, idx) => {
    const x = 14 + idx * 46.5;
    doc.setFillColor('#F1ECE0');
    doc.setDrawColor(117, 131, 97);
    doc.setLineWidth(0.2);
    doc.rect(x, 108, 43, 16, 'FD');

    doc.setFont('times', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(cEmerald);
    doc.text(c.title, x + 21.5, 114, { align: 'center' });

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6);
    doc.setTextColor(cTextMuted);
    doc.text(c.sub, x + 21.5, 119, { align: 'center' });
  });

  // Direct Engagement Block
  doc.setFillColor(cPaperCard);
  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.3);
  doc.rect(14, 131, 182, 85, 'FD');

  doc.setFont('times', 'bold');
  doc.setFontSize(12);
  doc.setTextColor(cEmerald);
  doc.text('INITIATE A PRIVATE CONVERSATION.', 18, 140);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(cTextMuted);
  doc.text(
    'Direct founding consultation for destination celebrations across India and worldwide.',
    18,
    145
  );

  doc.setDrawColor(3, 43, 36);
  doc.setFillColor(3, 43, 36);
  doc.rect(pageWidth - 68, 136, 50, 9, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor('#FAF8F3');
  doc.text('RESERVE CONSULTATION', pageWidth - 43, 142, { align: 'center' });

  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.2);
  doc.line(18, 151, pageWidth - 18, 151);

  // Founder Contact Details
  doc.setFont('times', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(cEmerald);
  doc.text('Gaurav Sehrawat', 18, 161);

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(cSage);
  doc.text('FOUNDER & PRINCIPAL PLANNER · THE MAISON', 18, 166);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(cTextMuted);
  doc.text('+91 8800843189 · CONCIERGE WHATSAPP', 18, 174);
  doc.text('bookings@mubaarqaan.com', 18, 180);
  doc.text('www.mubaarqaan.com  ·  @mubaarqaan', 18, 186);

  // QR Code Box Representation
  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.2);
  doc.rect(pageWidth - 48, 160, 30, 30);
  doc.setFillColor(255, 255, 255);
  doc.rect(pageWidth - 48, 160, 30, 30, 'F');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(cEmerald);
  doc.text('SCAN WITH CAMERA', pageWidth - 33, 172, { align: 'center' });
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7.5);
  doc.setTextColor(cSage);
  doc.text('INSTANT WHATSAPP', pageWidth - 33, 177, { align: 'center' });

  // Maison Directing Banner
  doc.setFillColor('#F1ECE0');
  doc.setDrawColor(117, 131, 97);
  doc.setLineWidth(0.2);
  doc.rect(14, 230, 182, 18, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(6.5);
  doc.setTextColor(cSage);
  doc.text('THE MAISON DIRECTING', pageWidth / 2, 234.5, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(cEmerald);
  doc.text('HONORED SERVICE. UNCOMPROMISING EXCELLENCE.', pageWidth / 2, 239.5, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(cTextMuted);
  doc.text('New Delhi · Rajasthan · Worldwide Destinations', pageWidth / 2, 244, { align: 'center' });

  // Save PDF
  doc.save('The_House_of_Weddings_Maison_Folio.pdf');
};
