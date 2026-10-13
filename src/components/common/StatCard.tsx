import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card } from '../ui/Card';

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  accent?: 'emerald' | 'amber' | 'teal' | 'stone';
}

export const StatCard: React.FC<StatCardProps> = ({
  icon: Icon,
  label,
  value,
  change,
  trend = 'up',
  accent = 'emerald',
}) => {
  const accentColors = {
    emerald: 'text-emerald-400 bg-emerald-950/40 border-emerald-800/30',
    amber: 'text-amber-400 bg-amber-950/40 border-amber-800/30',
    teal: 'text-teal-400 bg-teal-950/40 border-teal-800/30',
    stone: 'text-[#D5D1C5] bg-[#17201D] border-[#283832]',
  };

  return (
    <Card className="p-5 border-[#1E2B26] hover:border-[#283832] transition-colors">
      <div className="flex items-start justify-between">
        <div className={`p-2.5 rounded-xl border ${accentColors[accent]}`}>
          <Icon className="w-5 h-5" />
        </div>
        {change && (
          <span
            className={`text-xs font-mono font-medium px-2 py-0.5 rounded-md ${
              trend === 'up'
                ? 'text-emerald-400 bg-emerald-950/40'
                : 'text-amber-400 bg-amber-950/40'
            }`}
          >
            {change}
          </span>
        )}
      </div>
      <div className="mt-4">
        <h3 className="font-mono text-2xl lg:text-3xl font-bold tracking-tight text-[#F7F4EB]">
          {value}
        </h3>
        <p className="text-xs font-medium text-[#8A948E] mt-1 uppercase tracking-wider">
          {label}
        </p>
      </div>
    </Card>
  );
};
