export type DocumentType = 'pdf' | 'docx' | 'txt' | 'csv' | 'xlsx' | 'image' | 'code';

export type DocumentStatus = 'uploading' | 'processing' | 'analyzing' | 'indexing' | 'ready' | 'failed';

export interface DocumentSection {
  id: string;
  pageNumber: number;
  title: string;
  snippet: string;
  relevanceScore?: number;
}

export interface DocumentMetadata {
  authors?: string[];
  publicationDate?: string;
  topicCategory?: string;
  readingTimeMinutes?: number;
  wordCount?: number;
  embeddingDimensions?: number;
}

export interface DocumentItem {
  id: string;
  name: string;
  type: DocumentType;
  size: number;
  pageCount: number;
  status: DocumentStatus;
  progress?: number;
  uploadedAt: string;
  updatedAt: string;
  summary: string;
  sections: DocumentSection[];
  tags: string[];
  metadata: DocumentMetadata;
  starred?: boolean;
}

export interface DocumentFilter {
  query?: string;
  type?: DocumentType | 'all';
  status?: DocumentStatus | 'all';
  sortBy?: 'date' | 'name' | 'size' | 'pages';
  sortDirection?: 'asc' | 'desc';
}
