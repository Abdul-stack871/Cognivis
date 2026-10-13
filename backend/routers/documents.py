import os
import shutil
from fastapi import APIRouter, UploadFile, File, HTTPException
from typing import List, Dict, Any
from pathlib import Path

from backend.config import settings
from backend.core.rag_engine import rag_engine

router = APIRouter(prefix="/documents", tags=["Documents"])

@router.get("")
async def list_documents():
    return rag_engine.documents

@router.post("/upload")
async def upload_document(file: UploadFile = File(...)):
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")
    
    file_path = settings.UPLOADS_DIR / file.filename
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
        
    doc_meta = rag_engine.process_and_index_document(file_path=file_path, filename=file.filename)
    return doc_meta

@router.delete("/{document_id}")
async def delete_document(document_id: str):
    found = any(d.get("id") == document_id for d in rag_engine.documents)
    if not found:
        raise HTTPException(status_code=404, detail="Document not found")
    
    rag_engine.documents = [d for d in rag_engine.documents if d.get("id") != document_id]
    rag_engine.chunks = [c for c in rag_engine.chunks if c.get("documentId") != document_id]
    rag_engine._save_storage()
    return {"success": True, "message": f"Document {document_id} deleted successfully"}
