import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Search,
  Compass,
  Files,
  MessageSquareCode,
  GitFork,
  Network,
  Share2,
  BarChart3,
  BookOpen,
  Settings,
  Upload,
  ArrowRight,
  FileText,
} from 'lucide-react';
import { mockDocuments } from '../../data/mockDocuments';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenUpload: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onOpenUpload,
}) => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        isOpen ? onClose() : undefined;
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  const navPages = [
    { title: 'Home Observatory', path: '/home', icon: Compass, category: 'Navigation' },
    { title: 'Document Library', path: '/documents', icon: Files, category: 'Navigation' },
    { title: 'Grounded Dialogue', path: '/chat', icon: MessageSquareCode, category: 'Navigation' },
    { title: 'Workflow Studio', path: '/workflows', icon: GitFork, category: 'Studio' },
    { title: 'Architecture Studio', path: '/architecture', icon: Network, category: 'Studio' },
    { title: 'Knowledge Graph', path: '/knowledge-graph', icon: Share2, category: 'Exploration' },
    { title: 'Intelligence Analytics', path: '/analytics', icon: BarChart3, category: 'Analytics' },
    { title: 'Research Notebook', path: '/notebook', icon: BookOpen, category: 'Notes' },
    { title: 'Settings & Integrations', path: '/settings', icon: Settings, category: 'Configuration' },
  ];

  const filteredPages = navPages.filter((p) =>
    p.title.toLowerCase().includes(query.toLowerCase())
  );

  const filteredDocs = mockDocuments.filter((d) =>
    d.name.toLowerCase().includes(query.toLowerCase()) ||
    d.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  const handleSelect = (action: () => void) => {
    action();
    onClose();
    setQuery('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#070A09]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -10 }}
            transition={{ duration: 0.15 }}
            className="relative w-full max-w-xl bg-[#111715] border border-[#283832] rounded-2xl shadow-cinematic overflow-hidden z-10"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3.5 border-b border-[#1E2B26] bg-[#0E1412]">
              <Search className="w-5 h-5 text-emerald-400 shrink-0" />
              <input
                autoFocus
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search commands, documents, or studios..."
                className="w-full bg-transparent text-sm text-[#F7F4EB] placeholder-[#636E68] outline-none font-sans"
              />
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-[#1E2B26] text-[#8A948E] border border-[#283832]">
                ESC
              </kbd>
            </div>

            {/* Results List */}
            <div className="max-h-96 overflow-y-auto p-2 space-y-3">
              {/* Quick Actions */}
              <div>
                <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#636E68]">
                  Quick Actions
                </div>
                <button
                  onClick={() => handleSelect(onOpenUpload)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#D5D1C5] hover:text-[#F7F4EB] hover:bg-[#17201D] transition-colors group text-left"
                >
                  <div className="flex items-center gap-2.5">
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span className="font-medium">Upload Document to Vault</span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-[#636E68] group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>

              {/* Pages */}
              {filteredPages.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#636E68]">
                    Navigation
                  </div>
                  {filteredPages.map((page) => {
                    const Icon = page.icon;
                    return (
                      <button
                        key={page.path}
                        onClick={() => handleSelect(() => navigate(page.path))}
                        className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#D5D1C5] hover:text-[#F7F4EB] hover:bg-[#17201D] transition-colors group text-left"
                      >
                        <div className="flex items-center gap-2.5">
                          <Icon className="w-4 h-4 text-[#8A948E] group-hover:text-emerald-400 transition-colors" />
                          <span>{page.title}</span>
                        </div>
                        <span className="text-[10px] font-mono text-[#636E68] px-2 py-0.5 rounded bg-[#141C18]">
                          {page.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Documents */}
              {filteredDocs.length > 0 && (
                <div>
                  <div className="px-3 py-1 text-[10px] font-mono uppercase tracking-wider text-[#636E68]">
                    Indexed Documents
                  </div>
                  {filteredDocs.map((doc) => (
                    <button
                      key={doc.id}
                      onClick={() => handleSelect(() => navigate(`/documents/${doc.id}`))}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#D5D1C5] hover:text-[#F7F4EB] hover:bg-[#17201D] transition-colors group text-left"
                    >
                      <div className="flex items-center gap-2.5 truncate">
                        <FileText className="w-4 h-4 text-amber-400 shrink-0" />
                        <span className="truncate">{doc.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#8A948E] shrink-0 ml-2">
                        {doc.pageCount} pages
                      </span>
                    </button>
                  ))}
                </div>
              )}

              {filteredPages.length === 0 && filteredDocs.length === 0 && (
                <div className="text-center py-8 text-xs text-[#8A948E]">
                  No matches found for "{query}"
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
