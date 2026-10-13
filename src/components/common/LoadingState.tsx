import React from 'react';

interface LoadingStateProps {
  message?: string;
  description?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading Knowledge Units...',
  description = 'Retrieving vectors and aligning conceptual structures',
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-16 text-center">
      <div className="relative w-14 h-14 mb-5">
        <div className="absolute inset-0 rounded-full border-2 border-[#1E2B26]" />
        <div className="absolute inset-0 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
        <div className="absolute inset-3 rounded-full border border-amber-500/50 border-b-transparent animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
      </div>
      <p className="font-serif text-base font-medium text-[#F7F4EB]">{message}</p>
      {description && <p className="text-xs text-[#8A948E] mt-1">{description}</p>}
    </div>
  );
};
