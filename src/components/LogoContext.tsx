import React, { createContext, useContext, useState, useEffect } from 'react';
import officialLogoImg from '../assets/images/thow_official_logo.jpg';

interface LogoContextType {
  logoSrc: string;
  monogramSrc: string;
  uploadLogo: (file: File) => Promise<void>;
  resetLogo: () => void;
  isCustom: boolean;
}

const DEFAULT_LOGO_SRC = officialLogoImg;
const DEFAULT_MONOGRAM_SRC = officialLogoImg;

const LogoContext = createContext<LogoContextType>({
  logoSrc: DEFAULT_LOGO_SRC,
  monogramSrc: DEFAULT_MONOGRAM_SRC,
  uploadLogo: async () => {},
  resetLogo: () => {},
  isCustom: false,
});

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [logoSrc, setLogoSrc] = useState<string>(DEFAULT_LOGO_SRC);
  const [monogramSrc, setMonogramSrc] = useState<string>(DEFAULT_MONOGRAM_SRC);
  const [isCustom, setIsCustom] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('thow_custom_logo');
      if (saved && saved.startsWith('data:image/')) {
        setLogoSrc(saved);
        setMonogramSrc(saved);
        setIsCustom(true);
      }
    } catch {
      // Ignore
    }
  }, []);

  const uploadLogo = async (file: File) => {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const dataUrl = e.target?.result as string;
        if (dataUrl) {
          try {
            localStorage.setItem('thow_custom_logo', dataUrl);
            setLogoSrc(dataUrl);
            setMonogramSrc(dataUrl);
            setIsCustom(true);

            // Also sync with server endpoint if running
            await fetch('/api/upload-logo', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ image: dataUrl }),
            }).catch(() => {});

            resolve();
          } catch (err) {
            reject(err);
          }
        } else {
          reject(new Error('Failed to read logo file'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    });
  };

  const resetLogo = () => {
    try {
      localStorage.removeItem('thow_custom_logo');
    } catch {}
    setLogoSrc(DEFAULT_LOGO_SRC);
    setMonogramSrc(DEFAULT_MONOGRAM_SRC);
    setIsCustom(false);
  };

  return (
    <LogoContext.Provider value={{ logoSrc, monogramSrc, uploadLogo, resetLogo, isCustom }}>
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => useContext(LogoContext);
