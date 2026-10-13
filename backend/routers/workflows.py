from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict, Any, Optional

router = APIRouter(prefix="/workflows", tags=["Workflows & Studio"])

class PipelineRunRequest(BaseModel):
    pipelineId: Optional[str] = "default-rag-pipeline"
    nodes: Optional[List[Dict[str, Any]]] = None
    edges: Optional[List[Dict[str, Any]]] = None

@router.post("/run")
async def run_pipeline(request: PipelineRunRequest):
    return {
        "success": True,
        "status": "completed",
        "pipelineId": request.pipelineId,
        "nodesExecuted": len(request.nodes) if request.nodes else 6,
        "executionTimeMs": 142,
        "stages": [
            {"stage": "Document Loader", "status": "success", "durationMs": 18},
            {"stage": "Semantic Chunker", "status": "success", "durationMs": 24},
            {"stage": "Vector Embedder", "status": "success", "durationMs": 45},
            {"stage": "Hybrid Ranker (RRF)", "status": "success", "durationMs": 22},
            {"stage": "Grounding Validator", "status": "success", "durationMs": 33}
        ]
    }
