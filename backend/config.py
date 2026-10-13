import os
from pathlib import Path
from dotenv import load_dotenv
from pydantic_settings import BaseSettings

BASE_DIR = Path(__file__).resolve().parent
ENV_FILE = BASE_DIR / ".env"

if ENV_FILE.exists():
    load_dotenv(ENV_FILE)

class Settings(BaseSettings):
    PROJECT_NAME: str = "Cognivis Multimodal RAG Backend"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api"
    
    # Paths
    BASE_DIR: Path = BASE_DIR
    DATA_DIR: Path = BASE_DIR / "data"
    UPLOADS_DIR: Path = DATA_DIR / "uploads"
    STORAGE_DIR: Path = DATA_DIR / "storage"
    
    # LLM Settings
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    DEFAULT_MODEL: str = os.getenv("DEFAULT_MODEL", "gemini-2.0-flash")
    EMBEDDING_MODEL: str = os.getenv("EMBEDDING_MODEL", "models/text-embedding-004")
    
    # RAG Settings
    CHUNK_SIZE: int = 800
    CHUNK_OVERLAP: int = 150
    TOP_K_RETRIEVAL: int = 5
    SIMILARITY_THRESHOLD: float = 0.70

    class Config:
        env_file = str(ENV_FILE)
        extra = "ignore"

settings = Settings()

# Ensure data directories exist
settings.DATA_DIR.mkdir(parents=True, exist_ok=True)
settings.UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
settings.STORAGE_DIR.mkdir(parents=True, exist_ok=True)
