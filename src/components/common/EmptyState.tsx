import React, { ReactNode } from 'react';
import { LucideIcon, FileQuestion } from 'lucide-react';
import { Button } from '../ui/Button';

interface EmptyStateProps {
  icon?: LucideIcon;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  children?: ReactNode;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = FileQuestion,
  title,
  description,
  actionLabel,
  onAction,
  children,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center rounded-2xl border border-dashed border-[#283832] bg-[#0E1412]/50 my-6">
      <div className="w-14 h-14 rounded-2xl bg-[#17201D] border border-[#283832] flex items-center justify-center text-emerald-400 mb-4 shadow-subtle-border">
        <Icon className="w-7 h-7" />
      </div>
      <h4 className="font-serif text-lg font-medium text-[#F7F4EB] mb-2">{title}</h4>
      <p className="text-sm text-[#8A948E] max-w-md mb-6 leading-relaxed">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="primary" size="md">
          {actionLabel}
        </Button>
      )}
      {children}
    </div>
  );
};
