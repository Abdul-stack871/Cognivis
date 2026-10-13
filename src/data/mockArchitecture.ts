import { Edge, Node } from '@xyflow/react';
import { ArchitectureNodeData, ArchitectureSystem } from '../types/architecture';

export const mockArchitectureSystem: ArchitectureSystem = {
  id: 'arch-sys-1',
  name: 'System Architecture',
  version: 'v2.4',
  description: 'Generated from Research_Paper.pdf',
  sourceDocumentName: 'Research_Paper.pdf',
  sourceDocumentId: 'doc-1',
  lastUpdated: '2026-09-18T11:20:00Z',
};

export const initialArchitectureNodes: Node<ArchitectureNodeData>[] = [
  {
    id: 'arch-user',
    type: 'customArch',
    position: { x: 340, y: 30 },
    data: {
      component: 'User',
      technology: 'Web / Mobile',
      purpose: 'User queries and document exploration',
      layer: 'client',
      status: 'healthy',
    },
  },
  {
    id: 'arch-frontend',
    type: 'customArch',
    position: { x: 340, y: 120 },
    data: {
      component: 'Frontend',
      technology: 'React',
      purpose: 'Reactive UI and visualization canvases',
      layer: 'client',
      status: 'healthy',
    },
  },
  {
    id: 'arch-backend',
    type: 'customArch',
    position: { x: 340, y: 210 },
    data: {
      component: 'Backend',
      technology: 'FastAPI',
      purpose: 'Orchestration and grounding engine',
      layer: 'service',
      status: 'healthy',
    },
  },
  {
    id: 'arch-database',
    type: 'customArch',
    position: { x: 170, y: 310 },
    data: {
      component: 'Database',
      technology: 'PostgreSQL',
      purpose: 'Relational state and metadata',
      layer: 'storage',
      status: 'healthy',
    },
  },
  {
    id: 'arch-mlmodel',
    type: 'customArch',
    position: { x: 510, y: 310 },
    data: {
      component: 'ML Model',
      technology: 'Python',
      purpose: 'Dense vectors and embedding models',
      layer: 'ai',
      status: 'healthy',
    },
  },
  {
    id: 'arch-external',
    type: 'customArch',
    position: { x: 340, y: 390 },
    data: {
      component: 'External APIs',
      technology: 'LLM / Tools',
      purpose: 'Foundation models and tool calls',
      layer: 'external',
      status: 'healthy',
    },
  },
];

export const initialArchitectureEdges: Edge[] = [
  {
    id: 'e-user-front',
    source: 'arch-user',
    target: 'arch-frontend',
    style: { stroke: '#94A3B8', strokeWidth: 2 },
  },
  {
    id: 'e-front-back',
    source: 'arch-frontend',
    target: 'arch-backend',
    style: { stroke: '#94A3B8', strokeWidth: 2 },
  },
  {
    id: 'e-back-db',
    source: 'arch-backend',
    target: 'arch-database',
    style: { stroke: '#94A3B8', strokeWidth: 2 },
  },
  {
    id: 'e-back-ml',
    source: 'arch-backend',
    target: 'arch-mlmodel',
    style: { stroke: '#94A3B8', strokeWidth: 2 },
  },
  {
    id: 'e-back-ext',
    source: 'arch-backend',
    target: 'arch-external',
    style: { stroke: '#94A3B8', strokeWidth: 2 },
  },
];
