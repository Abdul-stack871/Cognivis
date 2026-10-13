import { useState, useEffect, useCallback } from 'react';
import { Edge, Node, OnNodesChange, OnEdgesChange, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { workflowService } from '../services/workflowService';
import { WorkflowDefinition, WorkflowNodeData } from '../types/workflow';

export function useWorkflow() {
  const [definition, setDefinition] = useState<WorkflowDefinition | null>(null);
  const [nodes, setNodes] = useState<Node<WorkflowNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<Node<WorkflowNodeData> | null>(null);

  useEffect(() => {
    workflowService.getWorkflow().then((res) => {
      setDefinition(res.definition);
      setNodes(res.nodes);
      setEdges(res.edges);
      setLoading(false);
    });
  }, []);

  const onNodesChange: OnNodesChange<Node<WorkflowNodeData>> = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const addNode = async (data: Partial<WorkflowNodeData>) => {
    const newNode = await workflowService.addNode(data);
    setNodes((nds) => [...nds, newNode]);
    return newNode;
  };

  const deleteNode = async (id: string) => {
    await workflowService.deleteNode(id);
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    if (selectedNode?.id === id) setSelectedNode(null);
  };

  const resetLayout = async () => {
    const res = await workflowService.resetLayout();
    setNodes(res.nodes);
    setEdges(res.edges);
    setSelectedNode(null);
  };

  return {
    definition,
    nodes,
    edges,
    loading,
    selectedNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    addNode,
    deleteNode,
    resetLayout,
  };
}
