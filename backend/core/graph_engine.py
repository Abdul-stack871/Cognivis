import json
import networkx as nx
from typing import Dict, Any, List
from backend.config import settings

class KnowledgeGraphEngine:
    def __init__(self):
        self.graph = nx.DiGraph()
        self._build_default_graph()

    def _build_default_graph(self):
        # Nodes
        nodes = [
            {"id": "n1", "label": "Multimodal Ingestion", "category": "Ingestion", "size": 32, "connections": 4, "description": "High-throughput asynchronous stream parser handling PDFs, equations, and images."},
            {"id": "n2", "label": "Topological Parser", "category": "Core Architecture", "size": 38, "connections": 6, "description": "Preserves geometric coordinate hierarchy of figures, diagrams, and structural headings."},
            {"id": "n3", "label": "Sparse-Dense Embedder", "category": "Embeddings", "size": 28, "connections": 3, "description": "Synergizes 1536d dense vectors with BM25 sparse keyword tokens via RRF (k=60)."},
            {"id": "n4", "label": "Vector Index (ChromaDB)", "category": "Storage", "size": 26, "connections": 4, "description": "Persistent HNSW index optimized for sub-10ms similarity queries with cosine distance."},
            {"id": "n5", "label": "Attention Matrix Cache", "category": "Inference", "size": 24, "connections": 3, "description": "In-memory KV cache maintaining <100ms response targets for active chat sessions."},
            {"id": "n6", "label": "Evidence Verifier", "category": "RAG Engine", "size": 34, "connections": 5, "description": "Strict grounding validation engine eliminating hallucinations via citation cross-referencing."},
            {"id": "n7", "label": "Reciprocal Rank Fusion", "category": "Retrieval", "size": 22, "connections": 3, "description": "Entropy-weighted ranking algorithm combining dense and lexical scoring channels."},
            {"id": "n8", "label": "Gemini 2.0 Synthesis", "category": "LLM Generation", "size": 36, "connections": 5, "description": "Multimodal reasoning and response generation with coordinate-anchored citations."}
        ]

        # Edges
        edges = [
            {"source": "n1", "target": "n2", "label": "extracts layout to", "weight": 0.95},
            {"source": "n2", "target": "n3", "label": "generates embeddings with", "weight": 0.92},
            {"source": "n3", "target": "n4", "label": "indexes vectors into", "weight": 0.88},
            {"source": "n4", "target": "n7", "label": "retrieves nearest neighbors for", "weight": 0.91},
            {"source": "n7", "target": "n6", "label": "passes candidates to", "weight": 0.94},
            {"source": "n6", "target": "n8", "label": "provides grounded context to", "weight": 0.98},
            {"source": "n8", "target": "n5", "label": "caches attention states in", "weight": 0.85},
            {"source": "n1", "target": "n6", "label": "maps source citations to", "weight": 0.89}
        ]

        for n in nodes:
            self.graph.add_node(n["id"], **n)

        for e in edges:
            self.graph.add_edge(e["source"], e["target"], label=e["label"], weight=e["weight"])

    def get_graph_data(self) -> Dict[str, Any]:
        nodes = []
        for n, data in self.graph.nodes(data=True):
            nodes.append({
                "id": n,
                "label": data.get("label", n),
                "category": data.get("category", "General"),
                "size": data.get("size", 20),
                "connections": self.graph.degree(n),
                "description": data.get("description", "")
            })

        edges = []
        for u, v, data in self.graph.edges(data=True):
            edges.append({
                "source": u,
                "target": v,
                "label": data.get("label", "connected to"),
                "weight": data.get("weight", 0.8)
            })

        return {
            "nodes": nodes,
            "edges": edges,
            "metrics": {
                "totalNodes": len(nodes),
                "totalEdges": len(edges),
                "density": round(nx.density(self.graph), 3),
                "avgDegree": round(sum(d for _, d in self.graph.degree()) / max(1, len(nodes)), 2)
            }
        }

graph_engine = KnowledgeGraphEngine()
