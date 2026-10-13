import { Edge, Node } from '@xyflow/react';
import { WorkflowDefinition, WorkflowNodeData } from '../types/workflow';

export const mockWorkflowDefinition: WorkflowDefinition = {
  id: 'wf-1',
  title: 'System Workflow',
  sourceDocumentName: 'Research_Paper.pdf',
  sourceDocumentId: 'doc-1',
  description: 'Topological extraction pipeline synthesized from Section 3 & Figure 2 of Research_Paper.pdf',
  lastUpdated: '2026-09-18T10:15:00Z',
  nodesCount: 6,
  status: 'active',
};

export const initialWorkflowNodes: Node<WorkflowNodeData>[] = [
  {
    id: 'node-1',
    type: 'customWorkflow',
    position: { x: 320, y: 30 },
    data: {
      title: 'Input',
      category: 'input',
      description: '(User / Data)',
      sourceDoc: 'Research_Paper.pdf',
      sourcePage: 2,
      status: 'completed',
    },
  },
  {
    id: 'node-2',
    type: 'customWorkflow',
    position: { x: 320, y: 120 },
    data: {
      title: 'Data Collection',
      category: 'collection',
      description: '(Gather & Fetch)',
      sourceDoc: 'Research_Paper.pdf',
      sourcePage: 2,
      status: 'completed',
    },
  },
  {
    id: 'node-3',
    type: 'customWorkflow',
    position: { x: 320, y: 210 },
    data: {
      title: 'Preprocessing',
      category: 'preprocessing',
      description: '(Clean & Transform)',
      sourceDoc: 'Research_Paper.pdf',
      sourcePage: 3,
      status: 'completed',
    },
  },
  {
    id: 'node-4',
    type: 'customWorkflow',
    position: { x: 320, y: 300 },
    data: {
      title: 'Feature Extraction',
      category: 'extraction',
      description: '(Generate Features)',
      sourceDoc: 'Research_Paper.pdf',
      sourcePage: 4,
      status: 'completed',
    },
  },
  {
    id: 'node-5',
    type: 'customWorkflow',
    position: { x: 320, y: 390 },
    data: {
      title: 'ML Model',
      category: 'model',
      description: '(Train / Predict)',
      sourceDoc: 'Research_Paper.pdf',
      sourcePage: 5,
      status: 'completed',
    },
  },
  {
    id: 'node-6',
    type: 'customWorkflow',
    position: { x: 320, y: 480 },
    data: {
      title: 'Output',
      category: 'output',
      description: '(Results / Insights)',
      sourceDoc: 'Research_Paper.pdf',
      sourcePage: 5,
      status: 'completed',
    },
  },
];

export const initialWorkflowEdges: Edge[] = [
  {
    id: 'e1-2',
    source: 'node-1',
    target: 'node-2',
    style: { stroke: '#94A3B8', strokeWidth: 2 },
  },
  {
    id: 'e2-3',
    source: 'node-2',
    target: 'node-3',
    style: { stroke: '#94A3B8', strokeWidth: 2 },
  },
  {
    id: 'e3-4',
    source: 'node-3',
    target: 'node-4',
    style: { stroke: '#94A3B8', strokeWidth: 2 },
  },
  {
    id: 'e4-5',
    source: 'node-4',
    target: 'node-5',
    style: { stroke: '#94A3B8', strokeWidth: 2 },
  },
  {
    id: 'e5-6',
    source: 'node-5',
    target: 'node-6',
    style: { stroke: '#94A3B8', strokeWidth: 2 },
  },
];
