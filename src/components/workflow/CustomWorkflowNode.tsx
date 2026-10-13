import React from 'react';
import { Handle, Position } from '@xyflow/react';
import {
  FileUp,
  Database,
  Sliders,
  Cpu,
  BrainCircuit,
  FileOutput,
} from 'lucide-react';

export const CustomWorkflowNode: React.FC<any> = ({ data, selected }) => {
  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'input':
        return {
          bg: 'bg-blue-600',
          border: 'border-blue-400',
          icon: FileUp,
        };
      case 'collection':
        return {
          bg: 'bg-purple-600',
          border: 'border-purple-400',
          icon: Database,
        };
      case 'preprocessing':
        return {
          bg: 'bg-emerald-600',
          border: 'border-emerald-400',
          icon: Sliders,
        };
      case 'extraction':
        return {
          bg: 'bg-amber-600',
          border: 'border-amber-400',
          icon: Cpu,
        };
      case 'model':
        return {
          bg: 'bg-teal-600',
          border: 'border-teal-400',
          icon: BrainCircuit,
        };
      case 'output':
        return {
          bg: 'bg-pink-600',
          border: 'border-pink-400',
          icon: FileOutput,
        };
      default:
        return {
          bg: 'bg-blue-600',
          border: 'border-blue-400',
          icon: FileUp,
        };
    }
  };

  const style = getCategoryStyles(data.category);
  const Icon = style.icon;

  return (
    <div
      className={`w-56 px-4 py-3 rounded-2xl ${style.bg} text-white shadow-xl flex items-center justify-between border-2 transition-all select-none ${
        selected ? 'border-white scale-105 ring-4 ring-white/20' : `${style.border} hover:scale-102`
      }`}
    >
      <Handle
        type="target"
        position={Position.Top}
        className="!bg-white !w-3 !h-3 !border-2 !border-black"
      />

      <div className="flex items-center gap-3">
        <div className="p-1.5 rounded-xl bg-black/20 text-white shrink-0">
          <Icon className="w-4 h-4" />
        </div>
        <div className="flex flex-col text-left">
          <span className="font-semibold text-xs leading-tight">{data.title}</span>
          <span className="text-[10px] text-white/80 font-sans mt-0.5">{data.description}</span>
        </div>
      </div>

      <Handle
        type="source"
        position={Position.Bottom}
        className="!bg-white !w-3 !h-3 !border-2 !border-black"
      />
    </div>
  );
};
