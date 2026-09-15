import React from 'react';

interface FrostLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const FrostLogo: React.FC<FrostLogoProps> = ({
  className = '',
  size = 34,
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Precision Warm Cyber Snowflake / Core Emblem */}
      <div 
        className="relative flex items-center justify-center shrink-0" 
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Outer hexagonal container */}
          <polygon
            points="50,6 88,28 88,72 50,94 12,72 12,28"
            className="stroke-white stroke-[2.5] fill-black"
          />
          {/* Inner crystal core */}
          <polygon
            points="50,22 74,36 74,64 50,78 26,64 26,36"
            className="stroke-[#A1A1AA] stroke-[1.5] fill-white/10"
          />
          {/* 6 Radiant spokes */}
          <line x1="50" y1="6" x2="50" y2="94" className="stroke-white stroke-[3]" />
          <line x1="12" y1="28" x2="88" y2="72" className="stroke-white stroke-[3]" />
          <line x1="12" y1="72" x2="88" y2="28" className="stroke-white stroke-[3]" />
          {/* Arrow chevrons */}
          <path d="M42 20 L50 12 L58 20" className="stroke-[#E4E4E7] stroke-[2.5] fill-none" />
          <path d="M42 80 L50 88 L58 80" className="stroke-[#E4E4E7] stroke-[2.5] fill-none" />
          <path d="M22 34 L18 26 L28 22" className="stroke-[#E4E4E7] stroke-[2.5] fill-none" />
          <path d="M78 66 L82 74 L72 78" className="stroke-[#E4E4E7] stroke-[2.5] fill-none" />
          <path d="M22 66 L18 74 L28 78" className="stroke-[#E4E4E7] stroke-[2.5] fill-none" />
          <path d="M78 34 L82 26 L72 22" className="stroke-[#E4E4E7] stroke-[2.5] fill-none" />
          {/* Center core emitter */}
          <circle cx="50" cy="50" r="7" className="fill-white drop-shadow-[0_0_8px_#FFFFFF]" />
          <circle cx="50" cy="50" r="3.5" className="fill-black" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-tight">
          <div className="flex items-center text-lg md:text-xl font-black tracking-tight text-white">
            <span className="font-heading tracking-wider">AMSFROST</span>
            <span className="text-zinc-400 font-mono text-sm ml-1.5 font-semibold">
              2026
            </span>
          </div>
          <span className="text-[10px] text-zinc-400 font-mono-tech tracking-wider uppercase font-semibold hidden sm:inline-block">
            Code. Build. Innovate.
          </span>
        </div>
      )}
    </div>
  );
};
