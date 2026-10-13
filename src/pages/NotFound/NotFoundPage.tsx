import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button } from '../../components/ui/Button';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="relative w-24 h-24 mb-6">
        <div className="absolute inset-0 rounded-full border border-emerald-500/30 animate-ping" />
        <div className="w-full h-full rounded-2xl bg-[#111715] border border-[#283832] flex items-center justify-center text-emerald-400 shadow-cinematic">
          <Compass className="w-10 h-10" />
        </div>
      </div>

      <span className="text-xs font-mono text-amber-400 uppercase tracking-widest font-semibold mb-2">
        Coordinates Not Found (404)
      </span>

      <h1 className="font-serif text-3xl sm:text-4xl font-normal text-[#F7F4EB] mb-3">
        Uncharted Observatory Sector
      </h1>

      <p className="text-sm text-[#8A948E] max-w-md mb-8 leading-relaxed">
        The conceptual coordinates you requested do not correlate with any indexed documents, workflows, or architectures in this knowledge mesh.
      </p>

      <Button onClick={() => navigate('/home')} variant="primary" size="md">
        <ArrowLeft className="w-4 h-4 mr-2" />
        <span>Return to Observatory</span>
      </Button>
    </div>
  );
};
