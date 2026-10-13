import React, { useState } from 'react';
import {
  Search,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Drawer } from '../../components/ui/Drawer';
import { useToast } from '../../hooks/useToast';

interface GraphConcept {
  id: string;
  label: string;
  type: 'main' | 'method' | 'application' | 'component' | 'dataset' | 'other';
  x: number;
  y: number;
  color: string;
  border: string;
  description: string;
  mentions: number;
}

export const KnowledgeGraphPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedConcept, setSelectedConcept] = useState<GraphConcept | null>(null);
  const [zoom, setZoom] = useState(100);
  const toast = useToast();

  const concepts: GraphConcept[] = [
    {
      id: 'ml',
      label: 'Machine Learning',
      type: 'main',
      x: 50,
      y: 50,
      color: 'bg-blue-600',
      border: 'border-blue-400',
      description: 'Foundational paradigm mapping heterogeneous document types into vector embeddings.',
      mentions: 84,
    },
    {
      id: 'dl',
      label: 'Deep Learning',
      type: 'method',
      x: 35,
      y: 28,
      color: 'bg-purple-600',
      border: 'border-purple-400',
      description: 'Hierarchical representation learning using multilayer neural networks.',
      mentions: 68,
    },
    {
      id: 'cv',
      label: 'Computer Vision',
      type: 'application',
      x: 65,
      y: 35,
      color: 'bg-teal-600',
      border: 'border-teal-400',
      description: 'Extraction of spatial bounding boxes and diagrams from document images.',
      mentions: 42,
    },
    {
      id: 'ic',
      label: 'Image Classification',
      type: 'application',
      x: 68,
      y: 65,
      color: 'bg-amber-600',
      border: 'border-amber-400',
      description: 'Categorization of layout blocks into schematics, tables, and text.',
      mentions: 29,
    },
    {
      id: 'ds',
      label: 'Dataset',
      type: 'dataset',
      x: 50,
      y: 75,
      color: 'bg-blue-500',
      border: 'border-blue-300',
      description: 'Curated corpus collections with verified human citations.',
      mentions: 55,
    },
    {
      id: 'dp',
      label: 'Data Preprocessing',
      type: 'other',
      x: 32,
      y: 65,
      color: 'bg-amber-700',
      border: 'border-amber-500',
      description: 'OCR alignment, token normalization, and bounding geometry correction.',
      mentions: 47,
    },
  ];

  const legend = [
    { label: 'Main Topic', color: 'bg-blue-500' },
    { label: 'Method', color: 'bg-purple-500' },
    { label: 'Application', color: 'bg-teal-500' },
    { label: 'Component', color: 'bg-emerald-500' },
    { label: 'Dataset', color: 'bg-amber-500' },
    { label: 'Other', color: 'bg-rose-500' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#0D1210] relative overflow-hidden select-none">
      {/* Top Header matching Reference Screen 7 */}
      <div className="h-14 border-b border-[#233129] px-6 flex items-center justify-between bg-[#111714] z-10 shrink-0">
        <div>
          <h2 className="font-serif text-base font-semibold text-[#F7F4EB] leading-tight">
            Knowledge Graph
          </h2>
          <p className="text-[11px] text-[#8A948E] font-sans">
            Concepts and relationships from your documents
          </p>
        </div>

        {/* Right Search Input */}
        <div className="w-64">
          <Input
            leftIcon={<Search className="w-3.5 h-3.5" />}
            placeholder="Search concepts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 text-xs bg-[#16201B]"
          />
        </div>
      </div>

      {/* Main Canvas Area */}
      <div className="flex-1 w-full h-full relative bg-[#090D0B] flex items-center justify-center">
        {/* Right Side Legend matching Reference Screen 7 */}
        <div className="absolute right-6 top-6 z-20 p-3.5 rounded-2xl bg-[#111714]/90 backdrop-blur-md border border-[#233129] space-y-2 shadow-xl">
          <span className="text-[10px] font-mono uppercase text-[#8A948E] block mb-1 font-semibold">
            Concept Legend
          </span>
          <div className="space-y-1.5 text-xs font-mono">
            {legend.map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${item.color}`} />
                <span className="text-[#D5D1C5] text-[11px]">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Left / Right Zoom Controls */}
        <div className="absolute left-6 bottom-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111714]/90 backdrop-blur-md border border-[#233129] text-xs font-mono text-[#D5D1C5] shadow-xl">
          <button onClick={() => setZoom((z) => Math.max(50, z - 10))} className="p-1 hover:text-white">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span>{zoom}%</span>
          <button onClick={() => setZoom((z) => Math.min(150, z + 10))} className="p-1 hover:text-white">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Quote matching Reference Screen 7 */}
        <div className="absolute right-8 bottom-6 z-10 text-right pointer-events-none">
          <p className="font-serif text-sm italic text-[#C5BEAF]">
            "See the bigger picture. Connect the dots."
          </p>
        </div>

        {/* Interactive Nodes and SVG Connection Lines */}
        <div
          style={{ transform: `scale(${zoom / 100})` }}
          className="relative w-[700px] h-[500px] transition-transform duration-150"
        >
          {/* Radial Lines connecting from Central Machine Learning node to all outer nodes */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {concepts.slice(1).map((c) => (
              <line
                key={c.id}
                x1={`${concepts[0].x}%`}
                y1={`${concepts[0].y}%`}
                x2={`${c.x}%`}
                y2={`${c.y}%`}
                stroke="#33423A"
                strokeWidth="2"
                strokeDasharray="4 4"
              />
            ))}
          </svg>

          {/* Render Concept Nodes as Ovals matching Reference Screen 7 */}
          {concepts.map((concept) => {
            const isCenter = concept.id === 'ml';
            const isMatch =
              !searchQuery ||
              concept.label.toLowerCase().includes(searchQuery.toLowerCase());

            return (
              <div
                key={concept.id}
                onClick={() => {
                  setSelectedConcept(concept);
                  toast.info(concept.label, `${concept.mentions} references in indexed corpus.`);
                }}
                style={{
                  left: `${concept.x}%`,
                  top: `${concept.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute px-5 py-2.5 rounded-full ${concept.color} text-white font-medium text-xs shadow-2xl border-2 ${
                  concept.border
                } cursor-pointer transition-all duration-200 hover:scale-110 select-none ${
                  isCenter ? 'px-7 py-4 text-sm font-semibold scale-110 z-20' : 'z-10'
                } ${isMatch ? 'opacity-100' : 'opacity-30'}`}
              >
                {concept.label}
              </div>
            );
          })}
        </div>
      </div>

      {/* Inspector Drawer */}
      <Drawer
        isOpen={!!selectedConcept}
        onClose={() => setSelectedConcept(null)}
        title="Concept Inspection"
        subtitle={selectedConcept?.label}
        width="md"
      >
        {selectedConcept && (
          <div className="space-y-4 text-xs font-sans">
            <div className="p-4 rounded-xl bg-[#0E1411] border border-[#233129] space-y-2">
              <span className="text-[10px] font-mono uppercase text-[#8A948E]">Category</span>
              <h4 className="font-serif text-lg text-white font-bold">{selectedConcept.label}</h4>
              <p className="text-[#8A948E] leading-relaxed">{selectedConcept.description}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-[#16201B] border border-[#283832] flex items-center justify-between font-mono">
              <span className="text-[#8A948E]">Corpus References</span>
              <span className="text-blue-400 font-bold">{selectedConcept.mentions} passages</span>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
