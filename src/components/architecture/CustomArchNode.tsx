import React from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  User,
  Monitor,
  Server,
  Database,
  Cpu,
  Globe,
} from 'lucide-react';

export const CustomArchNode: React.FC<any> = ({ data, selected }) => {
  const getNodeTheme = (component: string) => {
    const compLower = component.toLowerCase();
    if (compLower.includes('user')) {
      return { bg: 'bg-blue-600', border: 'border-blue-400', icon: User };
    }
    if (compLower.includes('frontend')) {
      return { bg: 'bg-purple-600', border: 'border-purple-400', icon: Monitor };
    }
    if (compLower.includes('backend')) {
      return { bg: 'bg-teal-600', border: 'border-teal-400', icon: Server };
    }
    if (compLower.includes('database')) {
      return { bg: 'bg-emerald-700', border: 'border-emerald-500', icon: Database };
    }
    if (compLower.includes('ml model')) {
      return { bg: 'bg-amber-700', border: 'border-amber-500', icon: Cpu };
    }
    return { bg: 'bg-slate-700', border: 'border-slate-500', icon: Globe };
  };

  const theme = getNodeTheme(data.component);
  const Icon = theme.icon;

  return (
    <div
      className={`w-48 px-4 py-3 rounded-2xl ${theme.bg} text-white shadow-xl flex items-center justify-between border-2 transition-all select-none ${
        selected ? 'border-white scale-105 ring-4 ring-white/20' : `${theme.border} hover:scale-102`
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-white !w-2.5 !h-2.5 !border-2 !border-black"
      />

      <div className="flex items-center gap-3 w-full">
        <div className="p-1.5 rounded-xl bg-black/20 text-white shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-semibold text-xs leading-tight">{data.component}</span>
          <span className="text-[10px] text-white/80 font-mono mt-0.5">({data.technology})</span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-white !w-2.5 !h-2.5 !border-2 !border-black"
      />
    </div>
  );
};
