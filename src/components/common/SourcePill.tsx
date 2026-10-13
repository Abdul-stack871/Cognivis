import React, { useState } from 'react';
import { FileText, ExternalLink } from 'lucide-react';
import { Citation } from '../../types/chat';

interface SourcePillProps {
  citation: Citation;
  onClick?: (citation: Citation) => void;
  showSnippetPreview?: boolean;
}

export const SourcePill: React.FC<SourcePillProps> = ({
  citation,
  onClick,
  showSnippetPreview = true,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={() => onClick && onClick(citation)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-mono bg-[#17201D] hover:bg-[#1E2B26] text-amber-300 border border-amber-900/50 hover:border-amber-700/60 transition-all active:scale-95 group shadow-sm"
      >
        <FileText className="w-3.5 h-3.5 text-amber-400 group-hover:text-amber-300" />
        <span className="font-medium text-[#F7F4EB]">
          Page {citation.pageNumber}
        </span>
        <span className="text-[#8A948E] text-[10px]">—</span>
        <span className="text-amber-200/90 text-[11px] truncate max-w-[140px]">
          {citation.sectionTitle}
        </span>
        <ExternalLink className="w-3 h-3 text-[#8A948E] opacity-60 group-hover:opacity-100" />
      </button>

      {/* Hover Preview Tooltip */}
      {showSnippetPreview && isHovered && (
        <div className="absolute left-0 bottom-full mb-2 w-72 p-3 bg-[#111715] border border-[#283832] rounded-xl shadow-cinematic z-30 pointer-events-none text-left animate-in fade-in zoom-in-95 duration-150">
          <div className="flex items-center justify-between text-[11px] font-mono text-[#8A948E] mb-1.5 pb-1 border-b border-[#1E2B26]">
            <span className="text-emerald-400 font-medium truncate">{citation.documentName}</span>
            <span>p. {citation.pageNumber}</span>
          </div>
          <p className="text-xs text-[#D5D1C5] leading-relaxed line-clamp-4 italic">
            "{citation.snippet}"
          </p>
          <div className="mt-2 flex items-center justify-between text-[10px] text-[#8A948E]">
            <span>Confidence:</span>
            <span className="text-emerald-400 font-mono font-semibold">
              {(citation.confidence * 100).toFixed(0)}%
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
