export interface AttachedSource {
  id: string;
  documentId: string;
  documentName: string;
  pageNumber: number;
  snippet: string;
}

export interface ResearchNote {
  id: string;
  title: string;
  content: string;
  category: 'architecture' | 'methodology' | 'findings' | 'hypotheses' | 'system-design';
  tags: string[];
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
  attachedSources: AttachedSource[];
}
