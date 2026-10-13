import { ChatMessage, Citation } from '../types/chat';

export const suggestedQuestions: string[] = [
  "How does the proposed architecture work?",
  "What is the main objective?",
  "What methodology is used?",
  "What are the key findings?",
  "Compare the proposed approaches.",
  "What are the sub-100ms latency guarantees?"
];

export const mockCitations: Record<string, Citation[]> = {
  architecture: [
    {
      id: 'cite-1',
      documentId: 'doc-1',
      documentName: 'Research_Paper.pdf',
      pageNumber: 2,
      sectionTitle: 'Section 3 — System Architecture',
      snippet: 'The proposed architecture consists of several connected components. Data enters through the collection layer, passes through preprocessing and feature extraction, and is then processed by the prediction layer before producing the final output.',
      confidence: 0.98,
      highlightCoordinates: { x: 45, y: 180, width: 490, height: 95 },
    },
    {
      id: 'cite-2',
      documentId: 'doc-1',
      documentName: 'Research_Paper.pdf',
      pageNumber: 4,
      sectionTitle: 'Figure 2 — Topological Pipeline & Feature Tensors',
      snippet: 'Figure 2 illustrates the synchronous handover between the raw ingestion buffer and the sparse-dense hybrid tokenizers, achieving 3.4x faster vector alignment.',
      confidence: 0.94,
      highlightCoordinates: { x: 45, y: 310, width: 490, height: 110 },
    },
    {
      id: 'cite-3',
      documentId: 'doc-1',
      documentName: 'Research_Paper.pdf',
      pageNumber: 5,
      sectionTitle: 'Section 3.2 — Prediction Layer & Latency Guarantees',
      snippet: 'By caching intermediate attention matrices in volatile high-bandwidth memory, the prediction layer satisfies strict sub-100ms service level objectives even under 10k concurrent query loads.',
      confidence: 0.95,
      highlightCoordinates: { x: 45, y: 120, width: 490, height: 85 },
    },
  ],
  objective: [
    {
      id: 'cite-4',
      documentId: 'doc-1',
      documentName: 'Research_Paper.pdf',
      pageNumber: 1,
      sectionTitle: 'Abstract & Problem Formulation',
      snippet: 'Current retrieval architectures suffer from semantic drift when querying heterogeneous document types. We introduce an evidence-grounded topological pipeline that maps unstructured text and figures into unified conceptual tensors.',
      confidence: 0.96,
      highlightCoordinates: { x: 45, y: 140, width: 490, height: 90 },
    },
  ],
  methodology: [
    {
      id: 'cite-5',
      documentId: 'doc-1',
      documentName: 'Research_Paper.pdf',
      pageNumber: 3,
      sectionTitle: 'Section 2.2 — Dual Encoders & Sparse-Dense Fusion',
      snippet: 'A multi-tier encoder pipeline merges BM25 lexical sparse tokens with 1536-dimensional dense embedding vectors using Reciprocal Rank Fusion weighted by inverse document entropy.',
      confidence: 0.92,
      highlightCoordinates: { x: 45, y: 220, width: 490, height: 100 },
    },
  ],
};

export const initialChatMessages: ChatMessage[] = [
  {
    id: 'msg-welcome',
    role: 'assistant',
    content: 'Welcome to Cognivis. I have indexed your library, including **Research_Paper.pdf**, **System_Design.docx**, and **Architecture_Diagram.png**. You can ask complex conceptual questions, explore grounded citations, generate visual workflows, or synthesize system architectures directly from your sources.',
    timestamp: '2026-09-18T10:00:00Z',
  },
  {
    id: 'msg-user-1',
    role: 'user',
    content: 'How does the proposed architecture work?',
    timestamp: '2026-09-18T10:02:15Z',
    selectedDocumentId: 'doc-1',
  },
  {
    id: 'msg-assistant-1',
    role: 'assistant',
    content: 'The proposed architecture consists of several connected components. Data enters through the collection layer, passes through preprocessing and feature extraction, and is then processed by the prediction layer before producing the final output.\n\nKey architectural pillars:\n1. **Ingestion & Collection Layer**: Handles asynchronous streaming of multi-format document payloads with zero-loss buffers.\n2. **Preprocessing & Feature Extraction**: Generates unified multimodal tensors, balancing lexical keywords and dense semantic vectors.\n3. **Prediction & Serving Layer**: Leverages pinned in-memory attention weights to maintain sub-100ms response latencies even under peak load.',
    timestamp: '2026-09-18T10:02:18Z',
    selectedDocumentId: 'doc-1',
    citations: mockCitations.architecture,
    reasoningSteps: [
      {
        stepNumber: 1,
        title: 'Analyzed Document Structure',
        description: 'Scoped query to Research_Paper.pdf and retrieved Section 3 (System Architecture).',
        sourceDoc: 'Research_Paper.pdf (p. 2)',
      },
      {
        stepNumber: 2,
        title: 'Correlated Topological Diagram',
        description: 'Extracted structural diagram components from Figure 2 on Page 4.',
        sourceDoc: 'Research_Paper.pdf (p. 4)',
      },
      {
        stepNumber: 3,
        title: 'Verified Latency & SLO Guarantees',
        description: 'Cross-checked Section 3.2 benchmarks confirming in-memory prediction layer bounds.',
        sourceDoc: 'Research_Paper.pdf (p. 5)',
      },
    ],
    feedback: 'like',
    savedToNotebook: true,
  },
];
