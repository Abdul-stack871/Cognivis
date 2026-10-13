import { mockNotes } from '../data/mockNotes';
import { ResearchNote } from '../types/note';

let notesStore: ResearchNote[] = [...mockNotes];

export const notebookService = {
  async getNotes(category?: string, query?: string): Promise<ResearchNote[]> {
    await new Promise((r) => setTimeout(r, 100));
    let result = [...notesStore];
    if (category && category !== 'all') {
      result = result.filter((n) => n.category === category);
    }
    if (query && query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (n) =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q) ||
          n.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    // Pinned notes first
    return result.sort((a, b) => (b.pinned ? 1 : 0) - (a.pinned ? 1 : 0));
  },

  async getNoteById(id: string): Promise<ResearchNote | undefined> {
    return notesStore.find((n) => n.id === id);
  },

  async createNote(newNote: Partial<ResearchNote>): Promise<ResearchNote> {
    const note: ResearchNote = {
      id: `note-${Date.now()}`,
      title: newNote.title || 'Untitled Research Note',
      content: newNote.content || '',
      category: newNote.category || 'findings',
      tags: newNote.tags || ['Synthesis'],
      pinned: newNote.pinned || false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      attachedSources: newNote.attachedSources || [],
    };
    notesStore.unshift(note);
    return note;
  },

  async updateNote(id: string, updates: Partial<ResearchNote>): Promise<ResearchNote | undefined> {
    const index = notesStore.findIndex((n) => n.id === id);
    if (index !== -1) {
      notesStore[index] = {
        ...notesStore[index],
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      return notesStore[index];
    }
    return undefined;
  },

  async deleteNote(id: string): Promise<boolean> {
    notesStore = notesStore.filter((n) => n.id !== id);
    return true;
  },

  async togglePin(id: string): Promise<boolean> {
    const note = notesStore.find((n) => n.id === id);
    if (note) {
      note.pinned = !note.pinned;
      return note.pinned;
    }
    return false;
  }
};
