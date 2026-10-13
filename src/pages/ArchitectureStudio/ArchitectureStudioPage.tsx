import React, { useState, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  BackgroundVariant,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  Plus,
  RotateCcw,
  Download,
  Edit2,
  ZoomIn,
  ZoomOut,
  Activity,
  Layers,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { CustomArchNode } from '../../components/architecture/CustomArchNode';
import { useArchitecture } from '../../hooks/useArchitecture';
import { useToast } from '../../hooks/useToast';
import { ArchitectureNodeData } from '../../types/architecture';

export const ArchitectureStudioPage: React.FC = () => {
  const {
    system,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addComponent,
    resetLayout,
    selectedNode,
    setSelectedNode,
  } = useArchitecture();

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [newComponent, setNewComponent] = useState('');
  const [newTech, setNewTech] = useState('');
  const [zoomLevel, setZoomLevel] = useState(100);
  const toast = useToast();

  const nodeTypes = useMemo(() => ({ customArch: CustomArchNode as any }), []);

  const handleNodeClick = (_: React.MouseEvent, node: any) => {
    setSelectedNode(node as Node<ArchitectureNodeData>);
    toast.info(`Selected ${node.data.component}`, node.data.technology);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComponent.trim()) return;

    await addComponent({
      component: newComponent.trim(),
      technology: newTech.trim() || 'Service',
      purpose: 'Distributed component',
      layer: 'service',
      status: 'healthy',
    });

    toast.success('Component Added', `${newComponent.trim()} added to the canvas.`);
    setAddModalOpen(false);
    setNewComponent('');
    setNewTech('');
  };

  const handleExportJSON = () => {
    const exportData = {
      system: system?.name,
      version: system?.version,
      exportedAt: new Date().toISOString(),
      nodes: nodes.map((n) => ({ id: n.id, data: n.data, position: n.position })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cognivis_Architecture_${Date.now()}.json`;
    a.click();
    toast.success('Architecture Exported', 'Topology JSON configuration saved.');
  };

  return (
    <div className="flex flex-col h-full bg-[#0D1210] relative overflow-hidden">
      {/* Top Header matching Reference Screen 6 */}
      <div className="h-14 border-b border-[#233129] px-6 flex items-center justify-between bg-[#111714] z-10 shrink-0">
        <div>
          <h2 className="font-serif text-base font-semibold text-[#F7F4EB] leading-tight">
            System Architecture
          </h2>
          <p className="text-[11px] text-[#8A948E] font-sans">
            Generated from <strong className="text-blue-400">Research_Paper.pdf</strong>
          </p>
        </div>

        {/* Right Actions: Export (Outline), Edit (Blue) */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-[#2A3B33] text-xs text-[#D5D1C5] hover:text-white hover:bg-[#16201B] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          <Button
            onClick={() => setAddModalOpen(true)}
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md px-4"
          >
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            <span>Edit</span>
          </Button>
        </div>
      </div>

      {/* Canvas Area matching Reference Screen 6 */}
      <div className="flex-1 w-full h-full relative bg-[#090D0B]">
        {/* Bottom Right Zoom Control Pill */}
        <div className="absolute right-6 bottom-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#111714]/90 backdrop-blur-md border border-[#233129] text-xs font-mono text-[#D5D1C5] shadow-xl">
          <button
            onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
            className="p-1 hover:text-white"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span>{zoomLevel}%</span>
          <button
            onClick={() => setZoomLevel((z) => Math.min(150, z + 10))}
            className="p-1 hover:text-white"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* React Flow Canvas */}
        <ReactFlow
          nodes={nodes as any}
          edges={edges}
          onNodesChange={onNodesChange as any}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          className="observatory-grid"
        >
          <Background color="#1C2621" gap={30} size={1} variant={BackgroundVariant.Dots} />
        </ReactFlow>
      </div>

      {/* Add Component Modal */}
      <Modal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        title="Add Architecture Component"
        subtitle="Register a new microservice or database node"
        maxWidth="md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-[#8A948E] block mb-1">Component Name</label>
            <Input
              value={newComponent}
              onChange={(e) => setNewComponent(e.target.value)}
              placeholder="e.g., Redis Cache"
              required
            />
          </div>

          <div>
            <label className="text-xs font-mono text-[#8A948E] block mb-1">Technology</label>
            <Input
              value={newTech}
              onChange={(e) => setNewTech(e.target.value)}
              placeholder="e.g., Redis v7.2"
              required
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[#1E2B26]">
            <Button type="button" variant="outline" size="sm" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-blue-600 text-white">
              Add Node
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
