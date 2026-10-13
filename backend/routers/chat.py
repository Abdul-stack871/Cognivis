from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional, List, Dict, Any

from backend.core.rag_engine import rag_engine

router = APIRouter(prefix="/chat", tags=["Chat & RAG"])

class QueryRequest(BaseModel):
    content: str
    selectedDocumentId: Optional[str] = None

class FeedbackRequest(BaseModel):
    messageId: str
    feedback: Optional[str] = None

@router.post("/query")
async def query_rag(request: QueryRequest):
    if not request.content.strip():
        raise HTTPException(status_code=400, detail="Query content cannot be empty")
    
    result = await rag_engine.query(
        query_text=request.content,
        selected_doc_id=request.selectedDocumentId
    )
    return result

@router.get("/documents")
async def get_indexed_docs_for_chat():
    return rag_engine.documents
