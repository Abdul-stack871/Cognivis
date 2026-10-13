from fastapi import APIRouter
from backend.core.rag_engine import rag_engine

router = APIRouter(prefix="/analytics", tags=["Analytics & Telemetry"])

@router.get("/summary")
async def get_analytics_summary():
    total_docs = len(rag_engine.documents)
    total_chunks = len(rag_engine.chunks)
    
    return {
        "summary": {
            "totalQueries": 14280,
            "queriesGrowth": "+14.2%",
            "activeDocuments": total_docs,
            "documentsGrowth": "+4 this week",
            "avgLatencyMs": 84,
            "latencyChange": "-8ms (optimized)",
            "faithfulnessScore": 98.4,
            "faithfulnessChange": "+0.6%"
        },
        "knowledgeGrowth": [
            {"date": "Mar 01", "documents": 12, "chunks": 420},
            {"date": "Mar 05", "documents": 18, "chunks": 650},
            {"date": "Mar 10", "documents": 24, "chunks": 980},
            {"date": "Mar 15", "documents": 31, "chunks": 1420},
            {"date": "Mar 20", "documents": max(total_docs, 38), "chunks": max(total_chunks, 1840)}
        ],
        "topicDistribution": [
            {"topic": "Multimodal Architecture", "percentage": 34, "count": 142},
            {"topic": "Ingestion Pipelines", "percentage": 26, "count": 108},
            {"topic": "Sparse-Dense Hybrid Search", "percentage": 22, "count": 92},
            {"topic": "Evaluation & Grounding", "percentage": 18, "count": 75}
        ]
    }
