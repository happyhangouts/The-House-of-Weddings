import React, { createContext, useContext } from 'react';
import officialLogoImg from '../assets/images/thow_official_logo.jpg';

interface LogoContextType {
  logoSrc: string;
  monogramSrc: string;
  isCustom: boolean;
}

const DEFAULT_LOGO_SRC = officialLogoImg;
const DEFAULT_MONOGRAM_SRC = officialLogoImg;

const LogoContext = createContext<LogoContextType>({
  logoSrc: DEFAULT_LOGO_SRC,
  monogramSrc: DEFAULT_MONOGRAM_SRC,
  isCustom: false,
});

export const LogoProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <LogoContext.Provider
      value={{
        logoSrc: DEFAULT_LOGO_SRC,
        monogramSrc: DEFAULT_MONOGRAM_SRC,
        isCustom: false,
      }}
    >
      {children}
    </LogoContext.Provider>
  );
};

export const useLogo = () => useContext(LogoContext);
