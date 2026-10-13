import React, { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'amber';
  size?: 'sm' | 'md' | 'lg' | 'icon';
  loading?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', loading, children, disabled, ...props }, ref) => {
    const baseStyles =
      'relative inline-flex items-center justify-center font-sans font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] select-none';

    const variants = {
      primary:
        'bg-emerald-600 hover:bg-emerald-500 text-[#070A09] font-semibold shadow-glow-emerald border border-emerald-400/30',
      secondary:
        'bg-[#17201D] hover:bg-[#1E2B26] text-[#F7F4EB] border border-[#283832] hover:border-[#3A4E46]',
      outline:
        'bg-transparent hover:bg-[#141C18] text-[#D5D1C5] hover:text-[#F7F4EB] border border-[#283832]',
      ghost:
        'bg-transparent hover:bg-[#141C18] text-[#8A948E] hover:text-[#F7F4EB]',
      danger:
        'bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-800/40',
      amber:
        'bg-amber-600 hover:bg-amber-500 text-[#070A09] font-semibold shadow-glow-amber border border-amber-400/30',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
      md: 'text-sm px-4 py-2 rounded-xl gap-2',
      lg: 'text-base px-6 py-3 rounded-xl gap-2.5',
      icon: 'p-2 rounded-xl w-9 h-9',
    };

    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {loading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
        ) : null}
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
