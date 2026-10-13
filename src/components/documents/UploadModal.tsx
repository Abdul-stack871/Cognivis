import React, { useState, useRef } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Upload, FileText, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';
import { useToast } from '../../hooks/useToast';
import { DocumentItem } from '../../types/document';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadComplete?: (doc: DocumentItem) => void;
  uploadFileService: (file: File) => Promise<DocumentItem>;
}

type UploadState = 'idle' | 'dragging' | 'uploading' | 'processing' | 'analyzing' | 'indexing' | 'completed' | 'error';

export const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onUploadComplete,
  uploadFileService,
}) => {
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<UploadState>('idle');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const toast = useToast();

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelected(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelected(e.target.files[0]);
    }
  };

  const handleFileSelected = (file: File) => {
    setSelectedFile(file);
    startPipeline(file);
  };

  const startPipeline = async (file: File) => {
    try {
      setStatus('uploading');
      setProgressPercent(20);

      const timer1 = setTimeout(() => {
        setStatus('processing');
        setProgressPercent(45);
      }, 500);

      const timer2 = setTimeout(() => {
        setStatus('analyzing');
        setProgressPercent(70);
      }, 1000);

      const timer3 = setTimeout(() => {
        setStatus('indexing');
        setProgressPercent(90);
      }, 1500);

      const result = await uploadFileService(file);

      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);

      setProgressPercent(100);
      setStatus('completed');
      toast.success(
        'Document Ingested Successfully',
        `${file.name} is parsed, vectorized, and ready for grounded research.`
      );

      if (onUploadComplete) {
        onUploadComplete(result);
      }
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Upload failed');
      toast.error('Ingestion Error', 'Could not index document into vector store.');
    }
  };

  const resetModal = () => {
    setStatus('idle');
    setSelectedFile(null);
    setProgressPercent(0);
    setErrorMessage('');
    onClose();
  };

  const stages = [
    { key: 'uploading', label: 'Upload' },
    { key: 'processing', label: 'Reading' },
    { key: 'analyzing', label: 'Analyzing' },
    { key: 'indexing', label: 'Indexing' },
    { key: 'completed', label: 'Ready' },
  ];

  const getStageIndex = (st: UploadState) => {
    switch (st) {
      case 'uploading':
        return 0;
      case 'processing':
        return 1;
      case 'analyzing':
        return 2;
      case 'indexing':
        return 3;
      case 'completed':
        return 4;
      default:
        return -1;
    }
  };

  const currentIdx = getStageIndex(status);

  return (
    <Modal
      isOpen={isOpen}
      onClose={resetModal}
      title="Multimodal Ingestion Pipeline"
      subtitle="Upload research papers, specifications, datasets, or schematics for vector grounding"
      maxWidth="lg"
    >
      <div className="space-y-6">
        {status === 'idle' && (
          <div
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center ${
              dragActive
                ? 'border-emerald-500 bg-emerald-950/20 shadow-glow-emerald scale-[1.01]'
                : 'border-[#283832] hover:border-emerald-500/50 bg-[#0E1412] hover:bg-[#141C18]'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt,.csv,.xlsx,.png,.jpg,.jpeg,.py,.json"
            />
            <div className="w-16 h-16 rounded-2xl bg-[#17201D] border border-[#283832] flex items-center justify-center text-emerald-400 mb-4 shadow-subtle-border group-hover:scale-105 transition-transform">
              <Upload className="w-7 h-7" />
            </div>
            <h4 className="font-serif text-lg font-medium text-[#F7F4EB]">
              Drag & drop document here
            </h4>
            <p className="text-xs text-[#8A948E] mt-1.5 max-w-sm">
              Supports PDF, DOCX, TXT, CSV, XLSX, raster images, and source code up to 50MB.
            </p>
            <div className="mt-5">
              <Button variant="secondary" size="sm" type="button">
                Browse Local Files
              </Button>
            </div>
          </div>
        )}

        {status !== 'idle' && status !== 'error' && (
          <div className="bg-[#0E1412] border border-[#283832] rounded-2xl p-6 space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-xl bg-[#17201D] border border-[#283832] text-amber-400">
                <FileText className="w-6 h-6" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-semibold text-[#F7F4EB] truncate">
                  {selectedFile?.name || 'Document'}
                </h4>
                <p className="text-xs text-[#8A948E] font-mono mt-0.5">
                  {selectedFile ? `${(selectedFile.size / (1024 * 1024)).toFixed(2)} MB` : ''}
                </p>
              </div>
              {status === 'completed' && (
                <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-emerald-950/60 border border-emerald-800/50 text-emerald-400 text-xs font-mono font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Ready
                </div>
              )}
            </div>

            {/* Ingestion Pipeline Stages Stepper */}
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-[#8A948E] mb-2">
                <span>Ingestion Pipeline</span>
                <span className="text-emerald-400 font-bold">{progressPercent}%</span>
              </div>
              {/* Progress Bar */}
              <div className="w-full h-2 bg-[#17201D] rounded-full overflow-hidden border border-[#283832]">
                <div
                  className="h-full bg-gradient-to-r from-emerald-600 via-teal-500 to-emerald-400 transition-all duration-500 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>

              {/* Pipeline Step Badges */}
              <div className="grid grid-cols-5 gap-1.5 mt-4 text-center">
                {stages.map((st, i) => {
                  const isPast = currentIdx > i;
                  const isCurrent = currentIdx === i;
                  return (
                    <div
                      key={st.key}
                      className={`p-2 rounded-lg border text-[11px] font-mono transition-colors ${
                        isCurrent
                          ? 'bg-emerald-950/50 border-emerald-500/60 text-emerald-300 font-semibold shadow-sm animate-pulse'
                          : isPast
                          ? 'bg-[#141C18] border-emerald-800/40 text-emerald-400'
                          : 'bg-[#111715] border-[#1E2B26] text-[#636E68]'
                      }`}
                    >
                      <div className="truncate">{st.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {status === 'completed' && (
              <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-800/30 text-xs text-[#EDE8DC] leading-relaxed flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-emerald-300">Grounding Ready:</strong> Document token embeddings generated and linked to the active knowledge graph. You can now question or generate workflows from this source.
                </div>
              </div>
            )}
          </div>
        )}

        {status === 'error' && (
          <div className="bg-rose-950/30 border border-rose-800/40 rounded-2xl p-6 text-center">
            <AlertCircle className="w-10 h-10 text-rose-400 mx-auto mb-3" />
            <h4 className="font-serif text-base text-rose-200">Ingestion Error</h4>
            <p className="text-xs text-[#8A948E] mt-1">{errorMessage}</p>
            <Button onClick={() => setStatus('idle')} variant="secondary" size="sm" className="mt-4">
              Try Another File
            </Button>
          </div>
        )}

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#1E2B26]">
          <Button onClick={resetModal} variant="outline" size="md">
            {status === 'completed' ? 'Done' : 'Cancel'}
          </Button>
          {status === 'completed' && (
            <Button
              onClick={resetModal}
              variant="primary"
              size="md"
            >
              <span>Explore Document</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          )}
        </div>
      </div>
    </Modal>
  );
};
