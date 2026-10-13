import React, { useState, useEffect } from 'react';
import {
  BookOpen,
  Plus,
  Pin,
  Search,
  FileText,
  Bookmark,
  Trash2,
  Edit3,
  Check,
  Tag,
  Share2,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import { Modal } from '../../components/ui/Modal';
import { EmptyState } from '../../components/common/EmptyState';
import { notebookService } from '../../services/notebookService';
import { useToast } from '../../hooks/useToast';
import { ResearchNote } from '../../types/note';

export const NotebookPage: React.FC = () => {
  const [notes, setNotes] = useState<ResearchNote[]>([]);
  const [selectedNote, setSelectedNote] = useState<ResearchNote | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<ResearchNote['category']>('findings');
  const toast = useToast();

  const fetchNotes = async () => {
    const list = await notebookService.getNotes(selectedCategory, searchQuery);
    setNotes(list);
    if (list.length > 0 && !selectedNote) {
      setSelectedNote(list[0]);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, [selectedCategory, searchQuery]);

  const handleSelectNote = (note: ResearchNote) => {
    setSelectedNote(note);
    setIsEditing(false);
  };

  const handleStartEdit = () => {
    if (selectedNote) {
      setEditTitle(selectedNote.title);
      setEditContent(selectedNote.content);
      setIsEditing(true);
    }
  };

  const handleSaveEdit = async () => {
    if (selectedNote) {
      const updated = await notebookService.updateNote(selectedNote.id, {
        title: editTitle,
        content: editContent,
      });
      if (updated) {
        setSelectedNote(updated);
        setNotes((prev) => prev.map((n) => (n.id === updated.id ? updated : n)));
        setIsEditing(false);
        toast.success('Note Saved', 'Your synthesis updates are recorded.');
      }
    }
  };

  const handleTogglePin = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isPinned = await notebookService.togglePin(id);
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: isPinned } : n))
    );
    if (selectedNote?.id === id) {
      setSelectedNote((prev) => (prev ? { ...prev, pinned: isPinned } : null));
    }
  };

  const handleDeleteNote = async (id: string) => {
    await notebookService.deleteNote(id);
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    setSelectedNote(updated[0] || null);
    setIsEditing(false);
    toast.info('Note Deleted', 'Research note removed from journal.');
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const created = await notebookService.createNote({
      title: newTitle.trim(),
      content: newContent.trim(),
      category: newCategory,
      tags: [newCategory.toUpperCase(), 'Synthesis'],
    });

    setNotes((prev) => [created, ...prev]);
    setSelectedNote(created);
    setCreateModalOpen(false);
    setNewTitle('');
    setNewContent('');
    toast.success('Research Note Created', 'Added to your knowledge journal.');
  };

  const categories = [
    { key: 'all', label: 'All Notes' },
    { key: 'architecture', label: 'Architecture' },
    { key: 'system-design', label: 'System Design' },
    { key: 'methodology', label: 'Methodology' },
    { key: 'findings', label: 'Findings' },
  ];

  return (
    <div className="flex h-full bg-[#0B0F0E] overflow-hidden">
      {/* Left Column: Notes List & Filter */}
      <div className="w-80 sm:w-96 border-r border-[#1E2B26] bg-[#111715] flex flex-col shrink-0">
        {/* Header */}
        <div className="p-4 border-b border-[#1E2B26] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-400" />
              <h2 className="font-serif text-lg font-semibold text-[#F7F4EB]">
                Research Journal
              </h2>
            </div>
            <Button
              onClick={() => setCreateModalOpen(true)}
              variant="primary"
              size="sm"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              <span>New Note</span>
            </Button>
          </div>

          <Input
            leftIcon={<Search className="w-3.5 h-3.5" />}
            placeholder="Search notes or citations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 text-xs"
          />

          {/* Categories bar */}
          <div className="flex items-center gap-1 overflow-x-auto pb-1 text-xs">
            {categories.map((c) => (
              <button
                key={c.key}
                onClick={() => setSelectedCategory(c.key)}
                className={`px-2.5 py-1 rounded-lg text-xs transition-colors whitespace-nowrap ${
                  selectedCategory === c.key
                    ? 'bg-[#17201D] text-[#F7F4EB] border border-[#283832] font-semibold'
                    : 'text-[#8A948E] hover:text-[#EDE8DC]'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Notes Scrollable List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-2">
          {notes.length === 0 ? (
            <div className="p-6 text-center text-xs text-[#8A948E]">
              No notes in this category.
            </div>
          ) : (
            notes.map((note) => {
              const isSelected = selectedNote?.id === note.id;
              return (
                <div
                  key={note.id}
                  onClick={() => handleSelectNote(note)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-150 space-y-1.5 ${
                    isSelected
                      ? 'bg-[#17201D] border-amber-500/50 shadow-sm'
                      : 'bg-[#141C18] border-[#1E2B26] hover:border-[#283832]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-serif text-sm font-medium text-[#F7F4EB] line-clamp-1">
                      {note.title}
                    </h4>
                    <button
                      onClick={(e) => handleTogglePin(note.id, e)}
                      className={`p-1 rounded hover:bg-[#1E2B26] ${
                        note.pinned ? 'text-amber-400' : 'text-[#636E68]'
                      }`}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <p className="text-xs text-[#8A948E] line-clamp-2 leading-relaxed">
                    {note.content.replace(/[#*`_]/g, '')}
                  </p>

                  <div className="flex items-center justify-between text-[10px] font-mono text-[#636E68] pt-1">
                    <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                    {note.attachedSources.length > 0 && (
                      <span className="text-amber-400/90 font-medium">
                        {note.attachedSources.length} citations
                      </span>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Right Column: Note Reading & Editing Studio */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#0E1412] overflow-y-auto p-6 sm:p-10">
        {selectedNote ? (
          <div className="max-w-3xl mx-auto w-full space-y-6">
            {/* Note Actions Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1E2B26]">
              <div className="flex items-center gap-2">
                <Badge variant="amber">{selectedNote.category}</Badge>
                {selectedNote.pinned && (
                  <span className="flex items-center gap-1 text-[11px] font-mono text-amber-400 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/30">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                {isEditing ? (
                  <Button onClick={handleSaveEdit} variant="primary" size="sm">
                    <Check className="w-3.5 h-3.5 mr-1" />
                    <span>Save Note</span>
                  </Button>
                ) : (
                  <Button onClick={handleStartEdit} variant="secondary" size="sm">
                    <Edit3 className="w-3.5 h-3.5 mr-1" />
                    <span>Edit</span>
                  </Button>
                )}
                <Button
                  onClick={() => handleDeleteNote(selectedNote.id)}
                  variant="outline"
                  size="sm"
                  className="text-rose-400 hover:text-rose-300"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>

            {/* Note Content / Editor */}
            {isEditing ? (
              <div className="space-y-4">
                <Input
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="font-serif text-xl font-bold"
                />
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  rows={14}
                  className="w-full bg-[#111715] border border-[#283832] rounded-xl p-4 text-sm text-[#F7F4EB] outline-none font-sans leading-relaxed focus:border-emerald-500/60"
                />
              </div>
            ) : (
              <div className="space-y-6">
                <h1 className="font-serif text-3xl font-semibold text-[#F7F4EB] leading-snug">
                  {selectedNote.title}
                </h1>

                <div className="prose prose-invert max-w-none text-[#D5D1C5] text-sm leading-relaxed whitespace-pre-wrap font-sans">
                  {selectedNote.content}
                </div>
              </div>
            )}

            {/* Attached Grounded Sources */}
            {selectedNote.attachedSources.length > 0 && (
              <div className="mt-8 pt-6 border-t border-[#1E2B26] space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-wider text-amber-400 font-semibold flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5" /> Attached Document Citations:
                </h4>
                <div className="space-y-2">
                  {selectedNote.attachedSources.map((source) => (
                    <div
                      key={source.id}
                      className="p-4 rounded-xl bg-[#111715] border border-[#283832] space-y-1.5 text-xs"
                    >
                      <div className="flex items-center justify-between text-[11px] font-mono text-[#8A948E]">
                        <span className="text-emerald-400 font-medium">
                          {source.documentName}
                        </span>
                        <span>Page {source.pageNumber}</span>
                      </div>
                      <p className="text-[#EDE8DC] italic font-serif leading-relaxed">
                        "{source.snippet}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <EmptyState
              icon={BookOpen}
              title="No Note Selected"
              description="Choose a note from the left sidebar or create a new research insight."
              actionLabel="Create Note"
              onAction={() => setCreateModalOpen(true)}
            />
          </div>
        )}
      </div>

      {/* Create Note Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Compose Research Note"
        subtitle="Capture conceptual syntheses and cross-document conclusions"
        maxWidth="md"
      >
        <form onSubmit={handleCreateSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-[#8A948E] block mb-1">Note Title</label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g., Cross-Attention Memory Benchmarks"
              required
            />
          </div>

          <div>
            <label className="text-xs font-mono text-[#8A948E] block mb-1">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full bg-[#141C18] border border-[#283832] text-xs text-[#F7F4EB] rounded-xl px-3 py-2.5 outline-none font-mono"
            >
              <option value="findings">Findings & Hypotheses</option>
              <option value="architecture">Architecture Topology</option>
              <option value="system-design">System Design</option>
              <option value="methodology">Methodology</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-[#8A948E] block mb-1">Content (Markdown)</label>
            <textarea
              value={newContent}
              onChange={(e) => setNewContent(e.target.value)}
              placeholder="Write findings, markdown lists, and insights..."
              rows={5}
              className="w-full bg-[#141C18] border border-[#283832] text-xs text-[#F7F4EB] rounded-xl p-3 outline-none focus:border-emerald-500/60 leading-relaxed"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[#1E2B26]">
            <Button type="button" variant="outline" size="sm" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save to Journal
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
