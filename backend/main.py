from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from backend.config import settings
from backend.routers import chat, documents, graph, analytics, workflows

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="High-performance Multimodal RAG Backend with Topological Retrieval & Grounded Citations"
)

# Enable CORS for React Vite frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include API Routers under /api
app.include_router(chat.router, prefix=settings.API_V1_STR)
app.include_router(documents.router, prefix=settings.API_V1_STR)
app.include_router(graph.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(workflows.router, prefix=settings.API_V1_STR)

@app.get("/")
async def root():
    return {
        "status": "online",
        "service": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs": "/docs"
    }

@app.get("/api/health")
async def health_check():
    return {
        "status": "healthy",
        "geminiConfigured": bool(settings.GEMINI_API_KEY),
        "documentsCount": len(chat.rag_engine.documents),
        "chunksCount": len(chat.rag_engine.chunks)
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
