"""
Flask API Server for CodeAtlas
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import logging
import os
from dotenv import load_dotenv

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ensure Git is detectable in process and set the GitPython executable if needed
import shutil


def find_git_executable():
    git_exe = shutil.which("git")
    if git_exe:
        return git_exe

    possible_paths = [
        r"C:\Program Files\Git\cmd\git.exe",
        r"C:\Program Files (x86)\Git\cmd\git.exe",
        r"C:\Program Files\Git\bin\git.exe",
        r"C:\Program Files (x86)\Git\bin\git.exe",
    ]
    for path in possible_paths:
        if os.path.exists(path):
            return path
    return None


git_executable = find_git_executable()
if git_executable:
    os.environ.setdefault("GIT_PYTHON_GIT_EXECUTABLE", git_executable)
    GIT_AVAILABLE = True
else:
    GIT_AVAILABLE = False

# Try to import analyzer, handle git if not available
try:
    from codeatlas.architecture_analyzer import ArchitectureAnalyzer
    analyzer = ArchitectureAnalyzer()
except Exception as e:
    logger.warning(f"Analyzer initialization failed: {e}")
    analyzer = None
    GIT_AVAILABLE = False

app = Flask(__name__)
CORS(app)


@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint."""
    return jsonify({"status": "healthy"}), 200


@app.route("/api/analyze", methods=["POST"])
def analyze_repository():
    """Analyze a GitHub repository."""
    data = request.get_json()
    repo_url = data.get("repo_url")
    
    if not repo_url:
        return jsonify({"error": "repo_url is required"}), 400
    
    if not GIT_AVAILABLE:
        return jsonify({
            "error": "Git is not installed or not accessible. "
                    "Please install Git from https://git-scm.com/download/win "
                    "and add it to your PATH, then restart the server.",
            "setup_guide": "https://localhost:3000/docs/git-setup"
        }), 503
    
    try:
        logger.info(f"Analyzing repository: {repo_url}")
        result = analyzer.analyze_repository(repo_url)
        return jsonify(result), 200
    
    except Exception as e:
        logger.error(f"Error analyzing repository: {e}")
        return jsonify({"error": str(e)}), 500


@app.route("/api/status", methods=["GET"])
def status():
    """Get API status."""
    return jsonify({
        "service": "CodeAtlas Backend",
        "version": "0.1.0",
        "status": "running",
        "git_available": GIT_AVAILABLE,
        "git_executable": os.getenv("GIT_PYTHON_GIT_EXECUTABLE", "not set")
    }), 200


@app.errorhandler(404)
def not_found(error):
    return jsonify({"error": "Not found"}), 404


@app.errorhandler(500)
def server_error(error):
    return jsonify({"error": "Internal server error"}), 500


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    
    if not GIT_AVAILABLE:
        logger.warning("=" * 60)
        logger.warning("⚠️  GIT IS NOT INSTALLED OR NOT IN PATH")
        logger.warning("=" * 60)
        logger.warning("The CodeAtlas API will start, but repository")
        logger.warning("analysis will not work until Git is installed.")
        logger.warning("")
        logger.warning("Install Git from: https://git-scm.com/download/win")
        logger.warning("Then restart this server.")
        logger.warning("=" * 60)
    
    app.run(debug=True, host="0.0.0.0", port=port)
