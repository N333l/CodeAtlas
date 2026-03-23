# CodeAtlas Backend

Python Flask-based backend for CodeAtlas - Automated Codebase Architecture Analyzer.

## Getting Started

### Install Dependencies

```bash
pip install -r requirements.txt
```

### Set Environment Variables

Copy `.env.example` to `.env` and configure:

```bash
cp .env.example .env
```

### Run the Server

```bash
python app.py
```

The API will start at `http://localhost:5000`

## API Endpoints

### `GET /health`
Health check endpoint.

**Response:**
```json
{
  "status": "healthy"
}
```

### `GET /api/status`
Get API status and version information.

**Response:**
```json
{
  "service": "CodeAtlas Backend",
  "version": "0.1.0",
  "status": "running"
}
```

### `POST /api/analyze`
Analyze a GitHub repository and generate architecture information.

**Request:**
```json
{
  "repo_url": "https://github.com/owner/repo"
}
```

**Response:**
```json
{
  "repository_url": "https://github.com/owner/repo",
  "structure": { ... },
  "technologies": { ... },
  "architecture": { ... },
  "insights": { ... }
}
```

## Project Structure

- `codeatlas/` - Core analysis modules
  - `__init__.py` - Package initialization
  - `repository_analyzer.py` - Repository cloning and structure analysis
  - `technology_detector.py` - Technology detection
  - `dependency_graph.py` - Dependency graph management
  - `architecture_analyzer.py` - Main analysis orchestrator
- `app.py` - Flask API server
- `requirements.txt` - Python dependencies
- `setup.py` - Package setup configuration

## Technologies

- **Flask** - Web framework
- **GitPython** - Repository cloning/operations
- **NetworkX** - Dependency graph management
- **PyYAML** - Configuration file parsing
