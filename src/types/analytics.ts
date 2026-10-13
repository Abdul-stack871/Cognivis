export interface KnowledgeGrowthPoint {
  date: string;
  documents: number;
  knowledgeUnits: number;
  citations: number;
}

export interface TopicDistribution {
  topic: string;
  count: number;
  relevance: number;
  color: string;
}

export interface DocumentTypeStat {
  type: string;
  count: number;
  percentage: number;
  color: string;
}

export interface QueryVelocityPoint {
  time: string;
  queries: number;
  evidenceRetrieved: number;
}

export interface ProcessingActivityItem {
  id: string;
  documentName: string;
  action: 'Indexed' | 'Workflow Extracted' | 'Graph Connected' | 'Vectorized';
  timestamp: string;
  durationMs: number;
  unitsCreated: number;
  status: 'completed' | 'processing' | 'failed';
}

export interface AnalyticsSummary {
  totalDocuments: number;
  totalQuestions: number;
  keyTopics: number;
  knowledgeUnits: number;
  avgConfidence: number;
  retrievalSpeedMs: number;
}
