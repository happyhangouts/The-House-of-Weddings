import React, { useState, useRef } from 'react';
import { useLogo } from './LogoContext';

interface LogoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoUploadModal: React.FC<LogoUploadModalProps> = ({ isOpen, onClose }) => {
  const { logoSrc, uploadLogo, resetLogo, isCustom } = useLogo();
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setMessage('Please select a valid image file (PNG, JPG, WEBP, or SVG).');
        return;
      }
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setMessage(null);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setMessage(null);
    }
  };

  const handleApply = async () => {
    if (!selectedFile) return;
    try {
      setIsUploading(true);
      await uploadLogo(selectedFile);
      setMessage('✓ Logo applied successfully across website, mobile view, and capability brochure!');
      setTimeout(() => {
        onClose();
        setMessage(null);
        setSelectedFile(null);
        setPreviewUrl(null);
      }, 1200);
    } catch {
      setMessage('Failed to upload logo. Please try a different image file.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleReset = () => {
    resetLogo();
    setSelectedFile(null);
    setPreviewUrl(null);
    setMessage('✓ Reset to official default logo.');
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg bg-[#FAF8F3] text-[#032B24] border-2 border-[#758361] shadow-2xl p-6 sm:p-8 overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#032B24]/10 hover:bg-[#032B24]/20 flex items-center justify-center text-[#032B24] transition-colors cursor-pointer text-sm font-bold"
          aria-label="Close Modal"
        >
          ✕
        </button>

        {/* Modal Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 mb-2">
            <span className="w-6 h-[1px] bg-[#758361]" />
            <span className="text-[10px] font-sans uppercase tracking-[0.22em] text-[#758361] font-bold">
              BRAND IDENTITY SUITE
            </span>
            <span className="w-6 h-[1px] bg-[#758361]" />
          </div>
          <h3 className="font-serif text-2xl text-[#032B24] uppercase tracking-wide">
            Upload Your Logo
          </h3>
          <p className="text-xs font-sans text-[#032B24]/75 mt-1 font-light">
            Upload any custom logo file to instantly update the header, hero section, mobile views, and printable brochure.
          </p>
        </div>

        {/* Current / Preview Box */}
        <div className="mb-6">
          <span className="text-[10px] font-sans uppercase tracking-wider text-[#032B24]/70 font-semibold block mb-2 text-center">
            {previewUrl ? 'New Logo Preview' : 'Current Active Logo'}
          </span>
          <div className="w-36 h-36 mx-auto bg-white border-2 border-[#758361] shadow-md p-2 flex items-center justify-center overflow-hidden">
            <img
              src={previewUrl || logoSrc}
              alt="Logo Preview"
              className="w-full h-full object-contain"
            />
          </div>
        </div>

        {/* Dropzone */}
        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border-2 border-dashed border-[#758361]/60 hover:border-[#758361] bg-[#FCFAF6] hover:bg-[#EEF1EA] p-6 text-center cursor-pointer transition-colors mb-4"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
          <div className="w-10 h-10 mx-auto mb-2 text-[#758361] flex items-center justify-center">
            <svg className="w-8 h-8 fill-none stroke-current" viewBox="0 0 24 24" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </div>
          <p className="text-xs font-sans font-medium text-[#032B24]">
            Drag &amp; drop your logo here, or <span className="text-[#758361] underline font-semibold">browse files</span>
          </p>
          <p className="text-[10px] font-sans text-[#032B24]/60 mt-1">
            Supports PNG (transparent or with background), JPG, SVG, or WEBP
          </p>
        </div>

        {/* Message notification */}
        {message && (
          <div
            className={`p-2.5 text-xs text-center font-sans mb-4 ${
              message.startsWith('✓')
                ? 'bg-emerald-50 text-emerald-800 border border-[#758361]'
                : 'bg-amber-50 text-amber-800 border border-amber-300'
            }`}
          >
            {message}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {selectedFile ? (
            <button
              type="button"
              onClick={handleApply}
              disabled={isUploading}
              className="flex-1 py-3 bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] hover:brightness-110 text-white border border-[#758361] font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-md disabled:opacity-50"
            >
              {isUploading ? 'Applying Logo...' : 'Apply Logo Everywhere'}
            </button>
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex-1 py-3 bg-gradient-to-r from-[#758361] via-[#859470] to-[#758361] hover:brightness-110 text-white border border-[#758361] font-sans text-xs uppercase tracking-wider font-semibold transition-all cursor-pointer shadow-md"
            >
              Choose Logo File
            </button>
          )}

          {isCustom && (
            <button
              type="button"
              onClick={handleReset}
              className="py-3 px-4 bg-transparent hover:bg-[#032B24]/10 text-[#032B24] border border-[#032B24]/30 font-sans text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Reset Default
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
