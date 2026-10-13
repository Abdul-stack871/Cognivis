import { useState, useMemo } from 'react';
import { mockKnowledgeGraph } from '../data/mockKnowledgeGraph';
import { KnowledgeNode } from '../types/knowledge';

export function useKnowledgeGraph() {
  const [data] = useState(mockKnowledgeGraph);
  const [selectedCategory, setSelectedCategory] = useState<string>('All Topics');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNode, setSelectedNode] = useState<KnowledgeNode | null>(mockKnowledgeGraph.nodes[0]);

  const filteredNodes = useMemo(() => {
    return data.nodes.filter((node) => {
      const matchesCategory =
        selectedCategory === 'All Topics' ||
        (selectedCategory === 'Core AI' && node.category === 'core') ||
        (selectedCategory === 'Computer Vision' && (node.category === 'method' || node.category === 'application')) ||
        (selectedCategory === 'Data Engineering' && node.category === 'data') ||
        (selectedCategory === 'Retrieval Systems' && (node.id === 'rag' || node.id === 'vidx')) ||
        (selectedCategory === 'Architectures' && (node.category === 'model' || node.id === 'transformers'));

      const matchesSearch =
        !searchQuery.trim() ||
        node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        node.relatedConcepts.some((c) => c.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesCategory && matchesSearch;
    });
  }, [data.nodes, selectedCategory, searchQuery]);

  const filteredNodeIds = useMemo(() => new Set(filteredNodes.map((n) => n.id)), [filteredNodes]);

  const filteredLinks = useMemo(() => {
    return data.links.filter((link) => filteredNodeIds.has(link.source) && filteredNodeIds.has(link.target));
  }, [data.links, filteredNodeIds]);

  return {
    categories: data.categories,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    nodes: filteredNodes,
    links: filteredLinks,
    selectedNode,
    setSelectedNode,
    totalNodesCount: data.nodes.length,
  };
}
