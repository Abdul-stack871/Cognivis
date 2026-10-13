import { Edge, Node } from '@xyflow/react';
import {
  initialArchitectureEdges,
  initialArchitectureNodes,
  mockArchitectureSystem,
} from '../data/mockArchitecture';
import { ArchitectureNodeData, ArchitectureSystem } from '../types/architecture';

let architectureNodesStore: Node<ArchitectureNodeData>[] = [...initialArchitectureNodes];
let architectureEdgesStore: Edge[] = [...initialArchitectureEdges];

export const architectureService = {
  async getSystemArchitecture(): Promise<{
    system: ArchitectureSystem;
    nodes: Node<ArchitectureNodeData>[];
    edges: Edge[];
  }> {
    await new Promise((r) => setTimeout(r, 100));
    return {
      system: mockArchitectureSystem,
      nodes: [...architectureNodesStore],
      edges: [...architectureEdgesStore],
    };
  },

  async addComponent(
    componentData: Partial<ArchitectureNodeData>,
    position?: { x: number; y: number }
  ): Promise<Node<ArchitectureNodeData>> {
    const id = `arch-${Date.now()}`;
    const newNode: Node<ArchitectureNodeData> = {
      id,
      type: 'customArch',
      position: position || { x: 300, y: 350 },
      data: {
        component: componentData.component || 'New Microservice',
        technology: componentData.technology || 'Go / Rust',
        purpose: componentData.purpose || 'High throughput auxiliary service',
        layer: componentData.layer || 'service',
        status: componentData.status || 'healthy',
        specs: componentData.specs || { latency: '< 5ms', throughput: '10k req/s' },
        sourceDoc: componentData.sourceDoc || 'System_Design.docx',
      },
    };
    architectureNodesStore.push(newNode);
    return newNode;
  },

  async deleteComponent(id: string): Promise<void> {
    architectureNodesStore = architectureNodesStore.filter((n) => n.id !== id);
    architectureEdgesStore = architectureEdgesStore.filter((e) => e.source !== id && e.target !== id);
  },

  async resetLayout(): Promise<{ nodes: Node<ArchitectureNodeData>[]; edges: Edge[] }> {
    architectureNodesStore = [...initialArchitectureNodes];
    architectureEdgesStore = [...initialArchitectureEdges];
    return {
      nodes: [...architectureNodesStore],
      edges: [...architectureEdgesStore],
    };
  }
};
