import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Search,
  FileText,
  Sparkles,
  MessageSquare,
  Send,
  ArrowLeft,
  Share2,
  Bookmark,
  ExternalLink,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { mockDocuments } from '../../data/mockDocuments';
import { mockCitations } from '../../data/mockChat';
import { useToast } from '../../hooks/useToast';
import { Citation } from '../../types/chat';

export const DocumentWorkspacePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const toast = useToast();

  const [document] = useState(mockDocuments[0]);
  const [currentPage, setCurrentPage] = useState<number>(2);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [activeTab, setActiveTab] = useState<'chat' | 'insights'>('chat');
  const [chatInput, setChatInput] = useState<string>('');

  const [messages, setMessages] = useState<
    { role: 'user' | 'assistant'; content: string; citations?: Citation[] }[]
  >([
    {
      role: 'user',
      content: 'How does the proposed architecture work?',
    },
    {
      role: 'assistant',
      content:
        'The proposed architecture consists of four main components: data collection, preprocessing, model training, and prediction. The data flows from the user input through the preprocessing pipeline to the ML model, and finally generates the output.',
      citations: [
        {
          id: 'c1',
          documentId: 'doc-1',
          documentName: 'Research_Paper.pdf',
          pageNumber: 2,
          sectionTitle: 'Section 3',
          snippet: 'The proposed architecture consists of four main components...',
          confidence: 0.98,
        },
        {
          id: 'c2',
          documentId: 'doc-1',
          documentName: 'Research_Paper.pdf',
          pageNumber: 4,
          sectionTitle: 'Figure 2',
          snippet: 'Data flows through preprocessing pipeline to the ML model...',
          confidence: 0.95,
        },
        {
          id: 'c3',
          documentId: 'doc-1',
          documentName: 'Research_Paper.pdf',
          pageNumber: 5,
          sectionTitle: 'Section 3.2',
          snippet: 'Prediction layer produces the grounded response outputs...',
          confidence: 0.94,
        },
      ],
    },
  ]);

  const handleCitationClick = (page: number, label: string) => {
    setCurrentPage(page);
    toast.info(`Jumped to Page ${page}`, label);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    const text = chatInput.trim();
    setChatInput('');
    setMessages((prev) => [...prev, { role: 'user', content: text }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `In response to "${text}", Section 3.2 on Page 5 demonstrates that in-memory attention matrices maintain sub-100ms service level objectives.`,
          citations: [
            {
              id: `c-${Date.now()}`,
              documentId: 'doc-1',
              documentName: 'Research_Paper.pdf',
              pageNumber: 5,
              sectionTitle: 'Section 3.2',
              snippet: 'In-memory attention matrices maintain sub-100ms service level objectives.',
              confidence: 0.96,
            },
          ],
        },
      ]);
    }, 600);
  };

  return (
    <div className="flex flex-col h-full bg-[#0D1210]">
      {/* Top Header matching Reference Screen 4 */}
      <div className="h-14 border-b border-[#233129] px-6 flex items-center justify-between bg-[#111714] shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/documents')}
            className="p-1.5 rounded-lg text-[#8A948E] hover:text-[#F7F4EB] hover:bg-[#1C2621] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div className="flex items-center gap-2">
            <h2 className="font-serif text-base font-semibold text-[#F7F4EB]">
              Research_Paper.pdf
            </h2>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-xl text-[#8A948E] hover:text-[#F7F4EB] hover:bg-[#1C2621]">
            <Share2 className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-xl text-[#8A948E] hover:text-[#F7F4EB] hover:bg-[#1C2621]">
            <Bookmark className="w-4 h-4" />
          </button>
          <Button
            onClick={() => toast.success('Document Analyzed', 'Extracted 18 pages of grounded vector chunks.')}
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium"
          >
            <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            <span>Analyze Document</span>
          </Button>
        </div>
      </div>

      {/* Split Workspace View */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0 overflow-hidden">
        {/* ========================================================================= */}
        {/* LEFT PANE: DOCUMENT VIEWER */}
        {/* ========================================================================= */}
        <div className="flex-1 flex flex-col border-r border-[#233129] bg-[#0A0E0C] min-w-0">
          {/* Viewer Sub-toolbar: Page 2 / 42, Zoom - 100% + */}
          <div className="h-12 border-b border-[#233129] px-4 flex items-center justify-between bg-[#111714] text-xs font-mono text-[#D5D1C5] shrink-0">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage <= 1}
                className="p-1 rounded hover:bg-[#1C2621] disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span>{currentPage} / 42</span>
              <button
                onClick={() => setCurrentPage((p) => Math.min(42, p + 1))}
                disabled={currentPage >= 42}
                className="p-1 rounded hover:bg-[#1C2621] disabled:opacity-30"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
                className="p-1 rounded hover:bg-[#1C2621]"
              >
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="w-12 text-center">{zoomLevel}%</span>
              <button
                onClick={() => setZoomLevel((z) => Math.min(180, z + 10))}
                className="p-1 rounded hover:bg-[#1C2621]"
              >
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
              <button className="p-1 rounded hover:bg-[#1C2621] ml-1">
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Viewer Main Body with Left Thumbnail Column */}
          <div className="flex-1 flex overflow-hidden">
            {/* Thumbnail Strip */}
            <div className="w-20 border-r border-[#233129] bg-[#0E1411] p-2 space-y-3 overflow-y-auto hidden sm:block">
              {[1, 2, 3, 4, 5].map((pageNum) => (
                <div
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`aspect-[3/4] rounded-lg p-1.5 border cursor-pointer transition-all flex flex-col justify-between ${
                    currentPage === pageNum
                      ? 'bg-white text-black border-blue-500 shadow-md scale-105'
                      : 'bg-[#FAF8F5] text-stone-700 border-[#334239] opacity-75 hover:opacity-100'
                  }`}
                >
                  <div className="h-1 bg-stone-300 rounded-full w-3/4 mb-1" />
                  <div className="h-0.5 bg-stone-200 rounded-full w-full mb-0.5" />
                  <div className="h-0.5 bg-stone-200 rounded-full w-4/5 mb-0.5" />
                  <span className="text-[8px] font-mono text-center block mt-auto font-bold">
                    p.{pageNum}
                  </span>
                </div>
              ))}
            </div>

            {/* Document Page Display */}
            <div className="flex-1 overflow-auto p-6 sm:p-10 flex justify-center bg-[#080C0A]">
              <div
                style={{
                  width: `${(680 * zoomLevel) / 100}px`,
                  minHeight: `${(880 * zoomLevel) / 100}px`,
                }}
                className="bg-[#FAF8F5] text-[#141C18] rounded-xl shadow-2xl p-10 sm:p-14 transition-all duration-150 border border-[#D5CFBF] font-serif leading-relaxed text-sm select-text relative"
              >
                {/* Header */}
                <div className="text-right text-[10px] font-mono text-[#8A928D] pb-4 mb-6 border-b border-[#E5E0D4]">
                  Research_Paper.pdf — Page {currentPage} of 42
                </div>

                {/* Simulated Content matching Reference Screen 4 */}
                <div className="space-y-5">
                  <h3 className="font-serif text-2xl font-bold text-[#141C18]">
                    3. Proposed Architecture
                  </h3>

                  <p className="text-[#3A4540] text-justify leading-relaxed">
                    Prior document intelligence platforms rely primarily on single-stream tokenization, resulting in substantial hallucinations when tables, formulas, and schematics are referenced across multiple sections.
                  </p>

                  {/* Flowchart Diagram matching Figure 1 in Reference */}
                  <div className="p-6 rounded-xl border border-[#D5CFBF] bg-[#F4EFE6] my-6 text-center space-y-4 font-mono text-xs text-[#636D67]">
                    <div className="flex items-center justify-center gap-2 font-bold text-[#141C18]">
                      <span>[User]</span>
                      <span>→</span>
                      <span className="px-2 py-1 bg-white rounded border border-[#C5BFB0] text-blue-700">Data Collection</span>
                      <span>→</span>
                      <span className="px-2 py-1 bg-white rounded border border-[#C5BFB0] text-purple-700">Preprocessing</span>
                    </div>
                    <div className="flex items-center justify-center gap-2 font-bold text-[#141C18]">
                      <span>↓</span>
                      <span className="px-2.5 py-1 bg-white rounded border border-[#C5BFB0] text-amber-700">ML Model</span>
                      <span>→</span>
                      <span className="px-2.5 py-1 bg-white rounded border border-[#C5BFB0] text-emerald-700">Output</span>
                    </div>
                    <div className="text-[11px] font-serif italic text-[#55615A] pt-2 border-t border-[#D5CFBF]">
                      Figure 1: Overall system architecture
                    </div>
                  </div>

                  <p className="text-[#3A4540] text-justify leading-relaxed">
                    The proposed architecture consists of four main components: data collection, preprocessing, model training, and prediction. The data flows from the user input through the preprocessing pipeline to the ML model, and finally generates the output.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* RIGHT PANE: COGNIVIS INTELLIGENCE PANEL */}
        {/* ========================================================================= */}
        <div className="w-full lg:w-[420px] flex flex-col bg-[#111714] shrink-0">
          {/* Tabs: Chat [active] & Insights */}
          <div className="flex items-center border-b border-[#233129] px-4 bg-[#0E1411]">
            <button
              onClick={() => setActiveTab('chat')}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'chat'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-[#8A948E] hover:text-[#EDE8DC]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </button>

            <button
              onClick={() => setActiveTab('insights')}
              className={`flex items-center gap-2 px-5 py-3 text-xs font-semibold border-b-2 transition-all ${
                activeTab === 'insights'
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-[#8A948E] hover:text-[#EDE8DC]'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Insights</span>
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
            {messages.map((msg, idx) => (
              <div key={idx} className="space-y-2">
                {msg.role === 'user' ? (
                  /* User message in blue rounded pill from Reference Screen 4 */
                  <div className="flex justify-end">
                    <div className="p-3.5 rounded-2xl bg-blue-600 text-white max-w-[85%] font-medium shadow-md">
                      {msg.content}
                    </div>
                  </div>
                ) : (
                  /* Cognivis response card matching Reference */
                  <div className="flex items-start gap-2.5">
                    <div className="w-7 h-7 rounded-full bg-blue-600 text-white flex items-center justify-center shrink-0 mt-1 font-bold text-[10px]">
                      C
                    </div>
                    <div className="p-4 rounded-2xl bg-[#16201B] border border-[#283832] text-[#EDE8DC] space-y-3 shadow-lg flex-1">
                      <p className="leading-relaxed">{msg.content}</p>

                      {/* Sources Section matching Reference Screen 4 */}
                      {msg.citations && (
                        <div className="pt-3 border-t border-[#233129] space-y-1.5">
                          <span className="text-[10px] font-mono uppercase text-[#8A948E] font-semibold block">
                            Sources:
                          </span>
                          <div className="space-y-1">
                            <button
                              onClick={() => handleCitationClick(2, 'Page 2 — Section 3')}
                              className="w-full flex items-center gap-2 text-[11px] font-mono text-blue-400 hover:text-blue-300 text-left"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                              <span>Page 2 — Section 3</span>
                            </button>
                            <button
                              onClick={() => handleCitationClick(4, 'Page 4 — Figure 2')}
                              className="w-full flex items-center gap-2 text-[11px] font-mono text-blue-400 hover:text-blue-300 text-left"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                              <span>Page 4 — Figure 2</span>
                            </button>
                            <button
                              onClick={() => handleCitationClick(5, 'Page 5 — Section 3.2')}
                              className="w-full flex items-center gap-2 text-[11px] font-mono text-blue-400 hover:text-blue-300 text-left"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                              <span>Page 5 — Section 3.2</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Chat Input matching Reference Screen 4 */}
          <div className="p-3 border-t border-[#233129] bg-[#0E1411]">
            <form onSubmit={handleSendMessage} className="relative flex items-center">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask anything about this document..."
                className="w-full bg-[#16201B] border border-[#283832] focus:border-blue-500/60 rounded-xl px-4 py-2.5 text-xs text-[#F7F4EB] placeholder-[#6A7870] outline-none pr-11"
              />
              <button
                type="submit"
                disabled={!chatInput.trim()}
                className="absolute right-1.5 p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white disabled:opacity-30 transition-all font-semibold shadow-md"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
