import os
from dotenv import load_dotenv

load_dotenv()


class Settings:
    GEMINI_API_KEY: str = os.getenv("GEMINI_API_KEY", "")
    MONGODB_URI: str = os.getenv("MONGODB_URI", "mongodb://localhost:27017")
    DB_NAME: str = os.getenv("DB_NAME", "arcmind")
    UPLOAD_DIR: str = os.getenv("UPLOAD_DIR", "uploads")
    MEMORY_DIR: str = os.getenv("MEMORY_DIR", "graphify_out")
    ENABLE_MONGODB: bool = os.getenv("ENABLE_MONGODB", "false").lower() == "true"
    ENABLE_GEMINI: bool = os.getenv("ENABLE_GEMINI", "false").lower() == "true"
    GEMINI_MODEL: str = os.getenv("GEMINI_MODEL", "gemini-2.5-flash")


settings = Settings()