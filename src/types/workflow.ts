export type WorkflowNodeStatus = 'pending' | 'running' | 'completed' | 'verified' | 'warning';

export interface WorkflowNodeData extends Record<string, unknown> {
  title: string;
  category: 'input' | 'collection' | 'preprocessing' | 'extraction' | 'model' | 'output';
  description: string;
  sourceDoc: string;
  sourcePage?: number;
  status: WorkflowNodeStatus;
  executionTime?: string;
  confidenceScore?: number;
  parameters?: Record<string, string | number>;
  onSelectNode?: (nodeId: string) => void;
}

export interface WorkflowDefinition {
  id: string;
  title: string;
  sourceDocumentName: string;
  sourceDocumentId: string;
  description: string;
  lastUpdated: string;
  nodesCount: number;
  status: 'active' | 'draft' | 'archived';
}
