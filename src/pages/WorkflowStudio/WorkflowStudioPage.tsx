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
  MousePointer,
  Hand,
  Sliders,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Undo,
  Redo,
  Sparkles,
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { CustomWorkflowNode } from '../../components/workflow/CustomWorkflowNode';
import { useWorkflow } from '../../hooks/useWorkflow';
import { useToast } from '../../hooks/useToast';
import { WorkflowNodeData } from '../../types/workflow';

export const WorkflowStudioPage: React.FC = () => {
  const {
    definition,
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addNode,
    resetLayout,
    selectedNode,
    setSelectedNode,
  } = useWorkflow();

  const [addNodeModalOpen, setAddNodeModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<WorkflowNodeData['category']>('extraction');
  const [zoomLevel, setZoomLevel] = useState(100);
  const toast = useToast();

  const nodeTypes = useMemo(() => ({ customWorkflow: CustomWorkflowNode as any }), []);

  const handleNodeClick = (_: React.MouseEvent, node: any) => {
    setSelectedNode(node as Node<WorkflowNodeData>);
    toast.info(`Selected ${node.data.title}`, node.data.description);
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    await addNode({
      title: newTitle.trim(),
      description: newDesc.trim() || '(Custom Step)',
      category: newCategory,
      status: 'completed',
      sourceDoc: 'Research_Paper.pdf',
    });

    toast.success('Pipeline Stage Added', `${newTitle.trim()} added to the canvas.`);
    setAddNodeModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  const handleExportJSON = () => {
    const exportData = {
      title: definition?.title,
      source: definition?.sourceDocumentName,
      exportedAt: new Date().toISOString(),
      nodes: nodes.map((n) => ({ id: n.id, data: n.data, position: n.position })),
      edges: edges.map((e) => ({ source: e.source, target: e.target })),
    };
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Cognivis_Workflow_${Date.now()}.json`;
    a.click();
    toast.success('Workflow Exported', 'Workflow JSON downloaded.');
  };

  return (
    <div className="flex flex-col h-full bg-[#0D1210] relative overflow-hidden">
      {/* Top Header matching Reference Screen 5 */}
      <div className="h-14 border-b border-[#233129] px-6 flex items-center justify-between bg-[#111714] z-10 shrink-0">
        <div>
          <h2 className="font-serif text-base font-semibold text-[#F7F4EB] leading-tight">
            System Workflow
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
            onClick={() => setAddNodeModalOpen(true)}
            variant="primary"
            size="sm"
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-md px-4"
          >
            <Edit2 className="w-3.5 h-3.5 mr-1.5" />
            <span>Edit</span>
          </Button>
        </div>
      </div>

      {/* Canvas Area with Left Floating Toolset and Atmospheric Backdrop */}
      <div className="flex-1 w-full h-full relative bg-[#090D0B]">
        {/* Floating Left Vertical Toolbar matching Reference Screen 5 */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-20 flex flex-col gap-2 p-2 rounded-2xl bg-[#111714]/90 backdrop-blur-md border border-[#233129] shadow-2xl">
          <button
            onClick={() => setAddNodeModalOpen(true)}
            className="p-2.5 rounded-xl hover:bg-blue-600 hover:text-white text-[#8A948E] transition-colors"
            title="Add Stage"
          >
            <Plus className="w-4 h-4" />
          </button>
          <button
            className="p-2.5 rounded-xl bg-[#16201B] text-blue-400 border border-[#283832]"
            title="Pointer"
          >
            <MousePointer className="w-4 h-4" />
          </button>
          <button
            className="p-2.5 rounded-xl hover:bg-[#16201B] text-[#8A948E] hover:text-[#EDE8DC]"
            title="Pan"
          >
            <Hand className="w-4 h-4" />
          </button>
          <div className="w-full h-px bg-[#233129] my-1" />
          <button
            onClick={() => toast.info('Undo')}
            className="p-2.5 rounded-xl hover:bg-[#16201B] text-[#8A948E] hover:text-[#EDE8DC]"
            title="Undo"
          >
            <Undo className="w-4 h-4" />
          </button>
          <button
            onClick={() => toast.info('Redo')}
            className="p-2.5 rounded-xl hover:bg-[#16201B] text-[#8A948E] hover:text-[#EDE8DC]"
            title="Redo"
          >
            <Redo className="w-4 h-4" />
          </button>
          <button
            onClick={resetLayout}
            className="p-2.5 rounded-xl hover:bg-[#16201B] text-[#8A948E] hover:text-[#EDE8DC]"
            title="Reset Layout"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Bottom Right Zoom Control Pill matching Reference Screen 5 */}
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

      {/* Add Stage Modal */}
      <Modal
        isOpen={addNodeModalOpen}
        onClose={() => setAddNodeModalOpen(false)}
        title="Add Pipeline Stage"
        subtitle="Insert a new operational node into the workflow mesh"
        maxWidth="md"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-mono text-[#8A948E] block mb-1">Stage Title</label>
            <Input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g., Cross-Attention Reranker"
              required
            />
          </div>

          <div>
            <label className="text-xs font-mono text-[#8A948E] block mb-1">Category</label>
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value as any)}
              className="w-full bg-[#141C18] border border-[#283832] text-xs text-[#F7F4EB] rounded-xl px-3 py-2.5 outline-none font-mono"
            >
              <option value="input">Input (Blue)</option>
              <option value="collection">Data Collection (Purple)</option>
              <option value="preprocessing">Preprocessing (Green)</option>
              <option value="extraction">Feature Extraction (Amber)</option>
              <option value="model">ML Model (Teal)</option>
              <option value="output">Output (Pink)</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-[#8A948E] block mb-1">Subtitle / Subtext</label>
            <Input
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="e.g., (Clean & Normalize)"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-[#1E2B26]">
            <Button type="button" variant="outline" size="sm" onClick={() => setAddNodeModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-blue-600 text-white">
              Insert Node
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
