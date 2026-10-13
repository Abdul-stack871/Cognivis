import {
  AnalyticsSummary,
  DocumentTypeStat,
  KnowledgeGrowthPoint,
  ProcessingActivityItem,
  QueryVelocityPoint,
  TopicDistribution,
} from '../types/analytics';

export const mockAnalyticsSummary: AnalyticsSummary = {
  totalDocuments: 24,
  totalQuestions: 156,
  keyTopics: 37,
  knowledgeUnits: 8420,
  avgConfidence: 96.8,
  retrievalSpeedMs: 68,
};

export const mockKnowledgeGrowth: KnowledgeGrowthPoint[] = [
  { date: 'Sep 01', documents: 4, knowledgeUnits: 1200, citations: 45 },
  { date: 'Sep 05', documents: 8, knowledgeUnits: 2600, citations: 110 },
  { date: 'Sep 09', documents: 12, knowledgeUnits: 4100, citations: 215 },
  { date: 'Sep 13', documents: 17, knowledgeUnits: 5890, citations: 390 },
  { date: 'Sep 16', documents: 21, knowledgeUnits: 7200, citations: 560 },
  { date: 'Sep 18', documents: 24, knowledgeUnits: 8420, citations: 742 },
];

export const mockTopicDistribution: TopicDistribution[] = [
  { topic: 'RAG & Retrieval', count: 48, relevance: 98, color: '#10B981' },
  { topic: 'Distributed Architecture', count: 36, relevance: 92, color: '#34D399' },
  { topic: 'Neural Quantization', count: 28, relevance: 86, color: '#0D9488' },
  { topic: 'Vector Indexes (Qdrant)', count: 24, relevance: 82, color: '#14B8A6' },
  { topic: 'Multimodal Attention', count: 20, relevance: 78, color: '#D97706' },
  { topic: 'Benchmarking & F1', count: 16, relevance: 71, color: '#F59E0B' },
];

export const mockDocumentTypeStats: DocumentTypeStat[] = [
  { type: 'PDF Documents', count: 11, percentage: 46, color: '#10B981' },
  { type: 'DOCX Specifications', count: 5, percentage: 21, color: '#0D9488' },
  { type: 'Data Tables (XLSX/CSV)', count: 4, percentage: 17, color: '#D97706' },
  { type: 'Architecture Diagrams', count: 2, percentage: 8, color: '#34D399' },
  { type: 'Code & Scripts', count: 2, percentage: 8, color: '#8A948E' },
];

export const mockQueryVelocity: QueryVelocityPoint[] = [
  { time: '08:00', queries: 8, evidenceRetrieved: 24 },
  { time: '10:00', queries: 22, evidenceRetrieved: 68 },
  { time: '12:00', queries: 35, evidenceRetrieved: 112 },
  { time: '14:00', queries: 48, evidenceRetrieved: 154 },
  { time: '16:00', queries: 31, evidenceRetrieved: 98 },
  { time: '18:00', queries: 12, evidenceRetrieved: 38 },
];

export const mockProcessingActivity: ProcessingActivityItem[] = [
  {
    id: 'act-1',
    documentName: 'Research_Paper.pdf',
    action: 'Workflow Extracted',
    timestamp: '12 mins ago',
    durationMs: 420,
    unitsCreated: 6,
    status: 'completed',
  },
  {
    id: 'act-2',
    documentName: 'System_Design.docx',
    action: 'Vectorized',
    timestamp: '35 mins ago',
    durationMs: 890,
    unitsCreated: 420,
    status: 'completed',
  },
  {
    id: 'act-3',
    documentName: 'Dataset_Description.xlsx',
    action: 'Graph Connected',
    timestamp: '1 hour ago',
    durationMs: 610,
    unitsCreated: 14,
    status: 'completed',
  },
  {
    id: 'act-4',
    documentName: 'Distributed_Vector_Engine.py',
    action: 'Indexed',
    timestamp: '2 hours ago',
    durationMs: 250,
    unitsCreated: 88,
    status: 'completed',
  },
];
