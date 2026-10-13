import { useState, useEffect, useCallback } from 'react';
import { Edge, Node, OnNodesChange, OnEdgesChange, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
import { architectureService } from '../services/architectureService';
import { ArchitectureNodeData, ArchitectureSystem } from '../types/architecture';

export function useArchitecture() {
  const [system, setSystem] = useState<ArchitectureSystem | null>(null);
  const [nodes, setNodes] = useState<Node<ArchitectureNodeData>[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedNode, setSelectedNode] = useState<Node<ArchitectureNodeData> | null>(null);

  useEffect(() => {
    architectureService.getSystemArchitecture().then((res) => {
      setSystem(res.system);
      setNodes(res.nodes);
      setEdges(res.edges);
      setLoading(false);
    });
  }, []);

  const onNodesChange: OnNodesChange<Node<ArchitectureNodeData>> = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  const onEdgesChange: OnEdgesChange = useCallback(
    (changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  );

  const addComponent = async (data: Partial<ArchitectureNodeData>) => {
    const newNode = await architectureService.addComponent(data);
    setNodes((nds) => [...nds, newNode]);
    return newNode;
  };

  const deleteComponent = async (id: string) => {
    await architectureService.deleteComponent(id);
    setNodes((nds) => nds.filter((n) => n.id !== id));
    setEdges((eds) => eds.filter((e) => e.source !== id && e.target !== id));
    if (selectedNode?.id === id) setSelectedNode(null);
  };

  const resetLayout = async () => {
    const res = await architectureService.resetLayout();
    setNodes(res.nodes);
    setEdges(res.edges);
    setSelectedNode(null);
  };

  return {
    system,
    nodes,
    edges,
    loading,
    selectedNode,
    setSelectedNode,
    onNodesChange,
    onEdgesChange,
    addComponent,
    deleteComponent,
    resetLayout,
  };
}
