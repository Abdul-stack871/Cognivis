import { Edge, Node } from '@xyflow/react';
import { initialWorkflowEdges, initialWorkflowNodes, mockWorkflowDefinition } from '../data/mockWorkflow';
import { WorkflowDefinition, WorkflowNodeData } from '../types/workflow';

let workflowNodesStore: Node<WorkflowNodeData>[] = [...initialWorkflowNodes];
let workflowEdgesStore: Edge[] = [...initialWorkflowEdges];

export const workflowService = {
  async getWorkflow(): Promise<{
    definition: WorkflowDefinition;
    nodes: Node<WorkflowNodeData>[];
    edges: Edge[];
  }> {
    await new Promise((r) => setTimeout(r, 100));
    return {
      definition: mockWorkflowDefinition,
      nodes: [...workflowNodesStore],
      edges: [...workflowEdgesStore],
    };
  },

  async addNode(nodeData: Partial<WorkflowNodeData>, position?: { x: number; y: number }): Promise<Node<WorkflowNodeData>> {
    const id = `node-${Date.now()}`;
    const newNode: Node<WorkflowNodeData> = {
      id,
      type: 'customWorkflow',
      position: position || { x: 300 + Math.random() * 200, y: 250 + Math.random() * 100 },
      data: {
        title: nodeData.title || 'Custom Processing Step',
        category: nodeData.category || 'extraction',
        description: nodeData.description || 'User-defined pipeline stage.',
        sourceDoc: nodeData.sourceDoc || 'Research_Paper.pdf',
        sourcePage: nodeData.sourcePage || 1,
        status: nodeData.status || 'pending',
        executionTime: '24ms',
        confidenceScore: 0.94,
        parameters: nodeData.parameters || { 'Mode': 'Dynamic Batch' },
      },
    };
    workflowNodesStore.push(newNode);
    return newNode;
  },

  async deleteNode(id: string): Promise<void> {
    workflowNodesStore = workflowNodesStore.filter((n) => n.id !== id);
    workflowEdgesStore = workflowEdgesStore.filter((e) => e.source !== id && e.target !== id);
  },

  async resetLayout(): Promise<{ nodes: Node<WorkflowNodeData>[]; edges: Edge[] }> {
    workflowNodesStore = [...initialWorkflowNodes];
    workflowEdgesStore = [...initialWorkflowEdges];
    return {
      nodes: [...workflowNodesStore],
      edges: [...workflowEdgesStore],
    };
  }
};
