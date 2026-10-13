import { ResearchNote } from '../types/note';

export const mockNotes: ResearchNote[] = [
  {
    id: 'note-1',
    title: 'Topological Ingestion vs Standard Chunking',
    category: 'architecture',
    tags: ['Ingestion', 'Topology', 'RAG'],
    pinned: true,
    createdAt: '2026-09-17T14:30:00Z',
    updatedAt: '2026-09-18T09:12:00Z',
    content: `## Ingestion Synthesis
Standard fixed-window chunking destroys semantic context across figures and tabular structures. 
The proposed architecture in *Research_Paper.pdf* uses layout-aware bounding trees that preserve parent section hierarchy.

### Critical Takeaways:
- Cross-attention achieves sub-100ms response latencies when intermediate matrices are cached.
- Hybrid BM25 + dense cosine gives +14.8% precision on acronyms and equation cross-references.`,
    attachedSources: [
      {
        id: 'cite-note-1',
        documentId: 'doc-1',
        documentName: 'Research_Paper.pdf',
        pageNumber: 2,
        snippet: 'The proposed architecture consists of several connected components. Data enters through the collection layer, passes through preprocessing and feature extraction...',
      },
      {
        id: 'cite-note-2',
        documentId: 'doc-1',
        documentName: 'Research_Paper.pdf',
        pageNumber: 5,
        snippet: 'By caching intermediate attention matrices in volatile high-bandwidth memory, the prediction layer satisfies strict sub-100ms service level objectives.',
      }
    ],
  },
  {
    id: 'note-2',
    title: 'Distributed Vector Cluster Sizing (Qdrant)',
    category: 'system-design',
    tags: ['Qdrant', 'HNSW', 'Infrastructure'],
    pinned: true,
    createdAt: '2026-09-16T11:00:00Z',
    updatedAt: '2026-09-17T16:00:00Z',
    content: `## Cluster Configuration Guidelines
Based on telemetry logs in *System_Design.docx*, our Qdrant cluster achieves 11ms p99 latency when configuring:
- \`ef_search\`: 128
- \`m\`: 16
- Storage: NVMe-backed write-ahead logs with in-memory payload quantization.`,
    attachedSources: [
      {
        id: 'cite-note-3',
        documentId: 'doc-2',
        documentName: 'System_Design.docx',
        pageNumber: 8,
        snippet: 'HNSW indexing on Qdrant achieves 11ms p99 latency across 10M embeddings.',
      }
    ],
  },
  {
    id: 'note-3',
    title: 'Cross-Modal Evaluation Hypotheses',
    category: 'methodology',
    tags: ['Evaluation', 'Benchmarking', 'F1 Score'],
    pinned: false,
    createdAt: '2026-09-15T08:20:00Z',
    updatedAt: '2026-09-15T09:40:00Z',
    content: `Evaluating visual documents with embedded charts requires multimodal tokenizers rather than pure OCR. The 93.6% F1 score validated on 1.2M fragments demonstrates low hallucination drift.`,
    attachedSources: [
      {
        id: 'cite-note-4',
        documentId: 'doc-1',
        documentName: 'Research_Paper.pdf',
        pageNumber: 8,
        snippet: 'Benchmark evaluations across 1.2M document fragments confirm an F1 precision score of 93.6%, demonstrating robust resilience to hallucination.',
      }
    ],
  },
];
