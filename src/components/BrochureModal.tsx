import React, { useState, useEffect } from 'react';
import { useLogo } from './LogoContext';
import { generateBrochurePdf } from '../utils/brochurePdfGenerator';
import {
  BrochurePage1,
  BrochurePage2,
  BrochurePage3,
  BrochurePage4,
  BrochurePage5,
  BrochurePage6,
} from './BrochurePrintablePages';

interface BrochureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlanClick?: () => void;
  initialPage?: number;
}

export const BrochureModal: React.FC<BrochureModalProps> = ({
  isOpen,
  onClose,
  onPlanClick,
  initialPage = 1,
}) => {
  const { logoSrc } = useLogo();
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState<{ current: number; total: number } | null>(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentPage(initialPage);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialPage]);

  if (!isOpen) return null;

  const totalPages = 6;

  const handleDownloadPdf = async () => {
    try {
      setIsGeneratingPdf(true);
      await generateBrochurePdf((current, total) => {
        setDownloadProgress({ current, total });
      }, logoSrc);
    } catch (err) {
      console.error('Failed to generate PDF:', err);
    } finally {
      setIsGeneratingPdf(false);
      setDownloadProgress(null);
    }
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(
      'Hello The House of Weddings, please share the Event Management & Hospitality Capability Brochure (Edition 2026) for our upcoming wedding.'
    );
    window.open(`https://wa.me/918800843189?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#FAF8F3] border-2 border-[#758361]/60 shadow-[0_25px_70px_rgba(0,0,0,0.8)] flex flex-col max-h-[96vh] overflow-hidden">
        
        {/* Top Header Bar */}
        <div className="bg-[#032B24] text-[#F8F5EE] px-4 sm:px-6 py-3 border-b border-[#758361]/40 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="w-2 h-2 rounded-full bg-[#758361] animate-pulse" />
            <div>
              <span className="text-[11px] sm:text-xs font-sans tracking-[0.2em] uppercase text-[#758361] font-semibold block">
                Official Capability Brochure · 2026
              </span>
              <span className="text-[10px] text-[#F8F5EE]/70 font-sans hidden sm:block">
                Exact Original Document · Event Management &amp; Guest Hospitality
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] hover:brightness-110 text-white text-[10px] sm:text-xs font-sans font-semibold uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-sm border border-[#758361]"
              title="Download exact uploaded PDF"
            >
              <svg className="w-3.5 h-3.5 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>
                {isGeneratingPdf
                  ? downloadProgress
                    ? `Generating Page ${downloadProgress.current}/${downloadProgress.total}...`
                    : 'Preparing PDF...'
                  : 'Download PDF'}
              </span>
            </button>

            <button
              onClick={handleWhatsApp}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#02201A] hover:bg-[#758361] text-[#758361] hover:text-white border border-[#758361]/50 text-[10px] sm:text-xs font-sans uppercase tracking-wider transition-colors cursor-pointer"
              title="Get Brochure on WhatsApp"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.41a8.177 8.177 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.45 0-2.87-.38-4.12-1.11l-.3-.17-3.12.82.83-3.04-.19-.31a8.21 8.21 0 0 1-1.26-4.43c0-4.54 3.69-8.24 8.24-8.24zM8.53 7.33c-.2 0-.44.02-.65.23-.26.26-.98.96-.98 2.34 0 1.38 1.01 2.72 1.15 2.91.14.19 1.95 3.05 4.77 4.24 2.34.99 2.82.79 3.32.75.51-.05 1.65-.67 1.88-1.33.24-.65.24-1.21.17-1.33-.07-.12-.26-.19-.55-.33s-1.69-.83-1.95-.93c-.26-.09-.45-.14-.64.14-.19.28-.74.93-.91 1.12-.17.19-.34.21-.63.07-.29-.14-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.59.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.09-.19.05-.36-.02-.5-.07-.14-.64-1.54-.88-2.11-.23-.56-.47-.48-.65-.49-.17-.01-.36-.01-.56-.01z"/>
              </svg>
              <span>WhatsApp</span>
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close Brochure Modal"
              className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-[#F8F5EE] flex items-center justify-center transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Brochure Page Display Area */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-[#EAE5D9] flex justify-center">
          <div className="w-full flex justify-center py-2">
            {currentPage === 1 && <BrochurePage1 />}
            {currentPage === 2 && <BrochurePage2 />}
            {currentPage === 3 && <BrochurePage3 />}
            {currentPage === 4 && <BrochurePage4 />}
            {currentPage === 5 && <BrochurePage5 />}
            {currentPage === 6 && <BrochurePage6 />}
          </div>
        </div>

        {/* Bottom Modal Navigation & Action Bar */}
        <div className="bg-[#FAF8F3] px-4 sm:px-6 py-3 border-t border-[#758361]/30 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          
          {/* Page Switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1.5 border border-[#032B24]/20 hover:border-[#758361] text-xs font-sans uppercase tracking-wider text-[#032B24] disabled:opacity-30 cursor-pointer"
            >
              &larr; Prev
            </button>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5, 6].map((p) => (
                <button
                  key={p}
                  onClick={() => setCurrentPage(p)}
                  className={`w-7 h-7 text-xs font-sans font-medium transition-all cursor-pointer ${
                    currentPage === p
                      ? 'bg-[#032B24] text-[#758361] border border-[#758361]'
                      : 'bg-[#F1ECE0] text-[#032B24]/70 hover:bg-[#758361]/20'
                  }`}
                >
                  0{p}
                </button>
              ))}
            </div>

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-3 py-1.5 border border-[#032B24]/20 hover:border-[#758361] text-xs font-sans uppercase tracking-wider text-[#032B24] disabled:opacity-30 cursor-pointer"
            >
              Next &rarr;
            </button>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <button
              onClick={handleDownloadPdf}
              disabled={isGeneratingPdf}
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-[#032B24] text-[#758361] hover:bg-[#758361] hover:text-white border border-[#758361] text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer disabled:opacity-50"
            >
              <svg className="w-4 h-4 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              <span>
                {isGeneratingPdf
                  ? downloadProgress
                    ? `Generating (${downloadProgress.current}/${downloadProgress.total})...`
                    : 'Generating PDF...'
                  : 'Download PDF (Exact Brochure)'}
              </span>
            </button>

            {onPlanClick && (
              <button
                onClick={() => {
                  onClose();
                  onPlanClick();
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] hover:brightness-110 text-white text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-sm border border-[#758361]"
              >
                Book Free Call
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
