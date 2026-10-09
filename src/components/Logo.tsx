import React, { useState } from 'react';
import { useLogo } from './LogoContext';

interface LogoProps {
  variant?: 'full' | 'horizontal' | 'mark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  theme?: string;
}

export const LogoMark: React.FC<{ className?: string }> = ({
  className = 'w-10 h-10',
}) => {
  const { logoSrc } = useLogo();
  return (
    <div className={`border-2 border-[#758361] overflow-hidden shadow-sm shrink-0 bg-white p-0.5 ${className}`}>
      <img
        src={logoSrc}
        alt="The House of Weddings Emblem"
        loading="eager"
        decoding="async"
        className="w-full h-full object-contain"
      />
    </div>
  );
};

export const HWLogo: React.FC<LogoProps> = ({
  variant = 'horizontal',
  size = 'md',
  className = '',
}) => {
  const { logoSrc } = useLogo();

  // Interactive subtle 3D perspective tilt
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateY = (x / (rect.width / 2)) * 6;
    const rotateX = -(y / (rect.height / 2)) * 6;
    setTilt({ x: rotateX, y: rotateY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  if (variant === 'full') {
    const sizeClasses =
      size === 'xl'
        ? 'w-28 h-28 sm:w-36 sm:h-36 md:w-44 md:h-44'
        : size === 'lg'
        ? 'w-24 h-24 sm:w-32 sm:h-32'
        : size === 'md'
        ? 'w-20 h-20 sm:w-28 sm:h-28'
        : 'w-16 h-16 sm:w-20 sm:h-20';

    return (
      <div
        className={`relative flex flex-col items-center text-center group select-none ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{ perspective: 1200 }}
      >
        <div
          className="transition-transform duration-300 ease-out will-change-transform flex flex-col items-center"
          style={{
            transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${isHovered ? 1.03 : 1})`,
            transformStyle: 'preserve-3d',
          }}
        >
          {/* Authentic White-Enamel & Sage-Bordered Official Emblem */}
          <div
            className={`${sizeClasses} border-2 border-[#758361] p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.5)] overflow-hidden bg-white shrink-0 transition-all duration-300`}
          >
            <img
              src={logoSrc}
              alt="The House of Weddings by Mubaarqaan"
              loading="eager"
              decoding="async"
              className="w-full h-full object-contain"
            />
          </div>
        </div>
      </div>
    );
  }

  if (variant === 'mark') {
    return <LogoMark className={className || 'w-10 h-10 sm:w-11 sm:h-11'} />;
  }

  // Horizontal variant (Unified sticky navigation header emblem & typography)
  return (
    <div className={`flex items-center gap-2 sm:gap-3.5 shrink-0 ${className}`}>
      <div className="w-10 h-10 sm:w-11 sm:h-11 border-2 border-[#758361] overflow-hidden shadow-sm shrink-0 bg-white p-0.5">
        <img
          src={logoSrc}
          alt="The House of Weddings"
          loading="eager"
          decoding="async"
          className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-col text-left shrink-0">
        <span className="font-serif text-[11px] sm:text-base tracking-[0.12em] sm:tracking-[0.2em] uppercase font-normal text-[#F8F5EE] leading-tight whitespace-nowrap">
          The House of Weddings
        </span>
        <div className="flex items-center gap-1.5 sm:gap-2 mt-0.5">
          <span className="w-2.5 sm:w-3.5 h-[0.5px] bg-[#758361]" />
          <span className="text-[7.5px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.24em] uppercase font-serif italic text-[#758361] whitespace-nowrap">
            by <span className="not-italic tracking-[0.2em] text-[#F8F5EE]/90">Mubaarqaan</span>
          </span>
        </div>
      </div>
    </div>
  );
};
