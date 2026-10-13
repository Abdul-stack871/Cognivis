export interface Citation {
  id: string;
  documentId: string;
  documentName: string;
  pageNumber: number;
  sectionTitle: string;
  snippet: string;
  confidence: number; // 0 to 1
  highlightCoordinates?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ReasoningStep {
  stepNumber: number;
  title: string;
  description: string;
  sourceDoc?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: string;
  citations?: Citation[];
  reasoningSteps?: ReasoningStep[];
  selectedDocumentId?: string;
  feedback?: 'like' | 'dislike' | null;
  savedToNotebook?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  documentIds: string[];
  messages: ChatMessage[];
}
