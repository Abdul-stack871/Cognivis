import { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  leftIcon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, leftIcon, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A948E] pointer-events-none">
            {leftIcon}
          </div>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full bg-[#141C18] border border-[#283832] focus:border-emerald-500/60 rounded-xl px-4 py-2.5 text-sm text-[#F7F4EB] placeholder-[#636E68] outline-none transition-all focus:ring-2 focus:ring-emerald-500/20 disabled:opacity-50',
            leftIcon && 'pl-10',
            error && 'border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/20',
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-rose-400 mt-1">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
