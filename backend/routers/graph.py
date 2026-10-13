from fastapi import APIRouter
from backend.core.graph_engine import graph_engine

router = APIRouter(prefix="/graph", tags=["Knowledge Graph"])

@router.get("/data")
async def get_graph_data():
    return graph_engine.get_graph_data()
