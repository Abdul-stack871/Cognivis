import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const CognivisLogo: React.FC<LogoProps> = ({
  className = '',
  size = 32,
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div
        className="relative shrink-0 flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 100 100"
          width={size}
          height={size}
          className="transition-transform duration-500 hover:rotate-45"
        >
          <defs>
            <linearGradient id="logoEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="60%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
            <linearGradient id="logoAmber" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#FDE68A" />
            </linearGradient>
          </defs>

          {/* Outer orbital rings */}
          <circle
            cx="50"
            cy="50"
            r="44"
            fill="none"
            stroke="#1E2B26"
            strokeWidth="2.5"
            strokeDasharray="4 6"
          />
          <circle
            cx="50"
            cy="50"
            r="34"
            fill="none"
            stroke="url(#logoEmerald)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeDasharray="145 65"
          />

          {/* Inner rhombus lens */}
          <polygon
            points="50,22 78,50 50,78 22,50"
            fill="none"
            stroke="#EDE8DC"
            strokeWidth="1.8"
            strokeOpacity="0.85"
          />

          {/* Central focal point */}
          <circle cx="50" cy="50" r="7.5" fill="url(#logoEmerald)" />
          <circle cx="50" cy="50" r="3" fill="#F7F4EB" />

          {/* Orbital nodes */}
          <circle cx="50" cy="22" r="4" fill="url(#logoAmber)" />
          <circle cx="78" cy="50" r="3.5" fill="#34D399" />
          <circle cx="50" cy="78" r="4" fill="url(#logoAmber)" />
          <circle cx="22" cy="50" r="3.5" fill="#34D399" />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-serif tracking-tight font-semibold text-lg text-[#F7F4EB] leading-none">
            Cognivis
          </span>
          <span className="text-[10px] tracking-wider text-[#8A948E] uppercase font-sans font-medium mt-1">
            Intelligence
          </span>
        </div>
      )}
    </div>
  );
};
