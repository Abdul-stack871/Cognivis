import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Send,
  Sparkles,
  Files,
  ThumbsUp,
  ThumbsDown,
  Bookmark,
  Copy,
  RotateCcw,
  Check,
  ExternalLink,
  ChevronDown,
  Layers,
  ArrowRight,
  Search,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Drawer } from '../../components/ui/Drawer';
import { SourcePill } from '../../components/common/SourcePill';
import { suggestedQuestions } from '../../data/mockChat';
import { mockDocuments } from '../../data/mockDocuments';
import { useChat } from '../../hooks/useChat';
import { useToast } from '../../hooks/useToast';
import { notebookService } from '../../services/notebookService';
import { Citation } from '../../types/chat';

export const ChatPage: React.FC = () => {
  const {
    messages,
    isThinking,
    sendMessage,
    selectedDocumentId,
    setSelectedDocumentId,
    toggleFeedback,
    toggleSaveToNotebook,
  } = useChat();

  const [input, setInput] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [inspectCitation, setInspectCitation] = useState<Citation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const toast = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isThinking) return;
    const text = input.trim();
    setInput('');
    await sendMessage(text);
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.info('Copied to Clipboard', 'Message content ready to paste.');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSaveToNotebook = async (msgId: string, content: string) => {
    const isSaved = await toggleSaveToNotebook(msgId);
    if (isSaved) {
      await notebookService.createNote({
        title: 'Synthesized Chat Finding',
        content,
        category: 'findings',
        tags: ['Grounded QA', 'Synthesis'],
      });
      toast.success('Saved to Research Notebook', 'Insight appended to your active research journal.');
    } else {
      toast.info('Removed from Notebook');
    }
  };

  const currentDoc = mockDocuments.find((d) => d.id === selectedDocumentId);

  return (
    <div className="flex flex-col h-full max-w-6xl mx-auto px-4 sm:px-8 py-6">
      {/* Workspace Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#1E2B26]">
        <div>
          <h1 className="font-serif text-2xl font-normal text-[#F7F4EB] flex items-center gap-2">
            <span>Conversational Observatory</span>
          </h1>
          <p className="text-xs text-[#8A948E]">
            Multimodal inquiry with page-anchored evidence citations
          </p>
        </div>

        {/* Document Scope Selector */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-[#8A948E]">Scoped Source:</span>
          <select
            value={selectedDocumentId || 'all'}
            onChange={(e) =>
              setSelectedDocumentId(e.target.value === 'all' ? undefined : e.target.value)
            }
            className="bg-[#141C18] border border-[#283832] text-[#EDE8DC] text-xs rounded-xl px-3 py-1.5 outline-none focus:border-emerald-500/60 font-mono"
          >
            <option value="all">Entire Ingested Library (24 docs)</option>
            {mockDocuments.map((doc) => (
              <option key={doc.id} value={doc.id}>
                {doc.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.role === 'user' ? 'items-end' : 'items-start'
            }`}
          >
            <div
              className={`max-w-3xl rounded-2xl p-5 border text-sm transition-all ${
                msg.role === 'user'
                  ? 'bg-[#17201D] border-[#283832] text-[#F7F4EB]'
                  : 'bg-[#111715] border-[#1E2B26] text-[#EDE8DC] shadow-cinematic'
              }`}
            >
              {/* Header: Role & Timestamp */}
              <div className="flex items-center justify-between gap-4 pb-2 mb-3 border-b border-[#1E2B26] text-[11px] font-mono text-[#8A948E]">
                <div className="flex items-center gap-2">
                  {msg.role === 'assistant' && (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  )}
                  <span className="font-semibold text-emerald-400 uppercase">
                    {msg.role === 'user' ? 'You' : 'Cognivis Grounded Engine'}
                  </span>
                </div>
                <span>{new Date(msg.timestamp).toLocaleTimeString()}</span>
              </div>

              {/* Message Body */}
              <div className="prose prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap font-sans">
                {msg.content}
              </div>

              {/* Reasoning Steps Accordion (if available) */}
              {msg.reasoningSteps && msg.reasoningSteps.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#1E2B26] space-y-2">
                  <span className="text-[11px] font-mono text-[#636E68] uppercase tracking-wider font-semibold">
                    Verification Telemetry:
                  </span>
                  <div className="space-y-1.5">
                    {msg.reasoningSteps.map((step) => (
                      <div
                        key={step.stepNumber}
                        className="text-xs text-[#8A948E] flex items-start gap-2 bg-[#0E1412] p-2 rounded-lg border border-[#1E2B26]"
                      >
                        <span className="font-mono text-emerald-400 font-bold">
                          0{step.stepNumber}
                        </span>
                        <div>
                          <strong className="text-[#D5D1C5]">{step.title}:</strong>{' '}
                          {step.description}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Grounded Citations Pills */}
              {msg.citations && msg.citations.length > 0 && (
                <div className="mt-4 pt-3 border-t border-[#1E2B26] space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-amber-400 font-semibold">
                    <span>Evidence-Backed Citations:</span>
                    <span className="text-xs text-[#8A948E]">
                      {msg.citations.length} sources matched
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {msg.citations.map((cite) => (
                      <SourcePill
                        key={cite.id}
                        citation={cite}
                        onClick={(c) => setInspectCitation(c)}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Assistant Action Buttons */}
              {msg.role === 'assistant' && (
                <div className="mt-4 pt-3 border-t border-[#1E2B26] flex items-center justify-between text-xs text-[#8A948E]">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleFeedback(msg.id, 'like')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        msg.feedback === 'like'
                          ? 'text-emerald-400 bg-emerald-950/40'
                          : 'hover:text-[#F7F4EB] hover:bg-[#17201D]'
                      }`}
                      title="Helpful insight"
                    >
                      <ThumbsUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleFeedback(msg.id, 'dislike')}
                      className={`p-1.5 rounded-lg transition-colors ${
                        msg.feedback === 'dislike'
                          ? 'text-rose-400 bg-rose-950/40'
                          : 'hover:text-[#F7F4EB] hover:bg-[#17201D]'
                      }`}
                      title="Needs refinement"
                    >
                      <ThumbsDown className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleCopy(msg.id, msg.content)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-lg hover:bg-[#17201D] text-[#8A948E] hover:text-[#F7F4EB] transition-colors"
                    >
                      {copiedId === msg.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                      <span>Copy</span>
                    </button>

                    <button
                      onClick={() => handleSaveToNotebook(msg.id, msg.content)}
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-lg transition-colors ${
                        msg.savedToNotebook
                          ? 'text-amber-300 bg-amber-950/50 border border-amber-800/40'
                          : 'hover:bg-[#17201D] text-[#8A948E] hover:text-[#F7F4EB]'
                      }`}
                    >
                      <Bookmark className="w-3.5 h-3.5" />
                      <span>{msg.savedToNotebook ? 'Saved in Notes' : 'Save to Notebook'}</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {isThinking && (
          <div className="flex flex-col items-start">
            <div className="bg-[#111715] border border-emerald-800/40 rounded-2xl p-4 text-xs text-[#8A948E] flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-emerald-400 border-t-transparent animate-spin" />
              <span>Retrieving grounding vectors & verifying citations...</span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Quick Chips */}
      <div className="pt-3 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-[10px] font-mono text-[#636E68] uppercase shrink-0">
            Suggested:
          </span>
          {suggestedQuestions.map((q) => (
            <button
              key={q}
              onClick={() => sendMessage(q)}
              className="px-3 py-1.5 rounded-xl bg-[#141C18] hover:bg-[#17201D] text-[#D5D1C5] hover:text-[#F7F4EB] border border-[#283832] hover:border-emerald-500/40 transition-all whitespace-nowrap text-xs"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* User Input Bar */}
      <form onSubmit={handleSubmit} className="pt-2">
        <div className="relative flex items-center bg-[#111715] border border-[#283832] focus-within:border-emerald-500/60 rounded-2xl p-2 shadow-cinematic transition-all">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Ask questions about ${
              currentDoc ? currentDoc.name : 'the indexed document library'
            }...`}
            className="flex-1 bg-transparent px-3 py-2 text-sm text-[#F7F4EB] placeholder-[#636E68] outline-none"
          />
          <Button
            type="submit"
            disabled={!input.trim() || isThinking}
            variant="primary"
            size="sm"
            className="rounded-xl px-4"
          >
            <span>Ask Cognivis</span>
            <Send className="w-3.5 h-3.5 ml-1.5" />
          </Button>
        </div>
      </form>

      {/* Evidence Drawer */}
      <Drawer
        isOpen={!!inspectCitation}
        onClose={() => setInspectCitation(null)}
        title="Grounded Document Evidence"
        subtitle={inspectCitation?.documentName}
        width="md"
      >
        {inspectCitation && (
          <div className="space-y-5">
            <div className="p-4 rounded-xl bg-[#0E1412] border border-[#1E2B26] space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-emerald-400">
                <span>Page {inspectCitation.pageNumber}</span>
                <span>{(inspectCitation.confidence * 100).toFixed(1)}% Confidence</span>
              </div>
              <h4 className="font-serif text-base font-semibold text-[#F7F4EB]">
                {inspectCitation.sectionTitle}
              </h4>
            </div>

            <div className="p-5 rounded-xl bg-[#FEF3C7] border-l-4 border-[#D97706] text-[#78350F] shadow-sm font-serif leading-relaxed text-sm">
              <div className="text-[10px] font-mono uppercase font-bold text-[#B45309] mb-1">
                Extracted Passage:
              </div>
              "{inspectCitation.snippet}"
            </div>

            <div className="pt-4 border-t border-[#1E2B26]">
              <Button
                onClick={() => {
                  navigate(`/documents/${inspectCitation.documentId}`);
                  setInspectCitation(null);
                }}
                variant="primary"
                size="md"
                className="w-full"
              >
                <span>Open in Document Workspace</span>
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        )}
      </Drawer>
    </div>
  );
};
