import React, { HTMLAttributes } from 'react';
import { cn } from '../../lib/utils';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  glow?: 'emerald' | 'amber' | 'none';
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  className,
  glow = 'none',
  interactive = false,
  children,
  ...props
}) => {
  const glowStyles = {
    emerald: 'glow-card-emerald border-emerald-800/30',
    amber: 'glow-card-amber border-amber-800/30',
    none: 'border-[#1E2B26]',
  };

  return (
    <div
      className={cn(
        'bg-[#111715] rounded-2xl border transition-all duration-300 relative overflow-hidden',
        glowStyles[glow],
        interactive && 'hover:border-[#2E413A] hover:bg-[#141C18] cursor-pointer hover:shadow-cinematic',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
