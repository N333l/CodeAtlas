import os
import logging
from waitress import serve
from app import app, GIT_AVAILABLE

if __name__ == "__main__":
    # Configure logging for production
    logging.basicConfig(level=logging.INFO)
    logger = logging.getLogger("waitress")
    
    port = int(os.getenv("PORT", 5000))
    host = os.getenv("HOST", "0.0.0.0")
    
    print("=" * 60)
    print(f"🚀 Starting CodeAtlas Production Server natively on Windows")
    print(f"📡 Listening on http://{host}:{port}")
    if not GIT_AVAILABLE:
        print("⚠️  WARNING: Git is not detected! Analysis will fail.")
    print("=" * 60)
    
    # Waitress is a production-quality pure-Python WSGI server with very acceptable performance
    serve(app, host=host, port=port, threads=6)
