import React from 'react';
import { cn } from '../../lib/utils';
import { DocumentStatus } from '../../types/document';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'emerald' | 'amber' | 'teal' | 'stone' | 'rose' | 'status';
  status?: DocumentStatus | string;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  status,
  className,
  size = 'sm',
}) => {
  let resolvedVariant = variant;

  if (status) {
    if (status === 'ready' || status === 'completed' || status === 'verified') resolvedVariant = 'emerald';
    else if (status === 'analyzing' || status === 'indexing') resolvedVariant = 'teal';
    else if (status === 'uploading' || status === 'processing' || status === 'pending') resolvedVariant = 'amber';
    else if (status === 'failed') resolvedVariant = 'rose';
    else resolvedVariant = 'stone';
  }

  const variants = {
    default: 'bg-[#17201D] text-[#D5D1C5] border-[#283832]',
    emerald: 'bg-emerald-950/60 text-emerald-300 border-emerald-800/40',
    amber: 'bg-amber-950/50 text-amber-300 border-amber-800/40',
    teal: 'bg-teal-950/50 text-teal-300 border-teal-800/40',
    stone: 'bg-[#141C18] text-[#8A948E] border-[#283832]',
    rose: 'bg-rose-950/60 text-rose-300 border-rose-800/40',
    status: 'bg-[#17201D] text-[#D5D1C5] border-[#283832]',
  };

  const sizes = {
    sm: 'text-[11px] px-2 py-0.5 rounded-md font-mono tracking-wide',
    md: 'text-xs px-2.5 py-1 rounded-lg font-mono tracking-wide',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border font-medium uppercase transition-colors',
        variants[resolvedVariant],
        sizes[size],
        className
      )}
    >
      {status === 'analyzing' || status === 'indexing' || status === 'processing' ? (
        <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
      ) : status === 'ready' || status === 'verified' ? (
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
      ) : null}
      {children}
    </span>
  );
};
