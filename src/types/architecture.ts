export type ArchitectureLayer = 'client' | 'gateway' | 'service' | 'storage' | 'ai' | 'external';

export interface ArchitectureNodeData extends Record<string, unknown> {
  component: string;
  technology: string;
  purpose: string;
  layer: ArchitectureLayer;
  status: 'healthy' | 'warning' | 'standby';
  specs?: {
    throughput?: string;
    latency?: string;
    protocol?: string;
    version?: string;
    redundancy?: string;
  };
  sourceDoc?: string;
  sourceSection?: string;
}

export interface ArchitectureSystem {
  id: string;
  name: string;
  version: string;
  description: string;
  sourceDocumentName: string;
  sourceDocumentId: string;
  lastUpdated: string;
}
