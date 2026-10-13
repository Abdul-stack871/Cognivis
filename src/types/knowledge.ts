export interface KnowledgeEvidence {
  id: string;
  sourceDocId: string;
  sourceDocName: string;
  pageNumber: number;
  section: string;
  snippet: string;
  relevance: number;
}

export interface KnowledgeNode {
  id: string;
  label: string;
  category: 'core' | 'method' | 'data' | 'model' | 'metric' | 'application';
  description: string;
  mentionCount: number;
  importanceScore: number;
  relatedConcepts: string[];
  sourceDocuments: string[];
  evidence: KnowledgeEvidence[];
  x?: number;
  y?: number;
}

export interface KnowledgeLink {
  id: string;
  source: string;
  target: string;
  relationship: string;
  strength: number; // 0 to 1
  description?: string;
}

export interface KnowledgeGraphData {
  nodes: KnowledgeNode[];
  links: KnowledgeLink[];
  categories: string[];
}
