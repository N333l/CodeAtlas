<!-- Copilot custom instructions for CodeAtlas project -->

# CodeAtlas Workspace Instructions

## Project Overview

CodeAtlas is a full-stack web application for automated codebase architecture analysis. It includes both a Python Flask backend and React frontend.

## Project Structure

```
/CodeAtlas/
├── backend/         → Python Flask API (Port 5000)
├── frontend/        → React Web UI (Port 3000)
├── README.md        → Main documentation
└── GETTING_STARTED.md → Setup guide
```

## Quick Start

### Terminal 1 - Backend
```
cd backend
pip install -r requirements.txt
python app.py
```

### Terminal 2 - Frontend
```
cd frontend
npm install
REACT_APP_API_URL=http://localhost:5000/api npm start
```

## Key Technologies

### Backend
- Python 3.8+
- Flask 2.3.3
- GitPython 3.1.32
- NetworkX 3.1
- CORS enabled for frontend

### Frontend
- React 18.2.0
- D3.js 7.8.5
- Zustand (state management)
- React Router for navigation
- Axios for API calls

## Main Components

### Backend (Python)
1. `repository_analyzer.py` - Clones and analyzes repos
2. `technology_detector.py` - Detects tech stack
3. `dependency_graph.py` - Models component relationships
4. `architecture_analyzer.py` - Orchestrates analysis

### Frontend (React)
1. `Home.js` - Landing page
2. `Analyzer.js` - Repository analysis interface
3. `ArchitectureVisualization.js` - D3 graph visualization
4. `api.js` - Backend API client

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Health check |
| GET | `/api/status` | API status |
| POST | `/api/analyze` | Analyze repository |

## Configuration

### Backend Environment Variables
- `PORT` (default: 5000)
- `FLASK_ENV` (development/production)

### Frontend Environment Variables
- `REACT_APP_API_URL` (default: http://localhost:5000/api)

## Development Workflow

1. Make changes in `backend/` or `frontend/` folders
2. Backend auto-reloads with Flask debug mode
3. Frontend auto-reloads with npm start
4. Access frontend at http://localhost:3000
5. Backend API at http://localhost:5000

## Testing the System

1. **Backend Health:** `curl http://localhost:5000/health`
2. **Frontend:** Open http://localhost:3000
3. **Analyze Repository:** Enter URL on `/analyze` page
4. **View Results:** See architecture diagram and insights

## Terraform Analysis

A complete architecture analysis of your Terraform infrastructure is available in `TF_ARCHITECTURE_ANALYSIS.md`:

- Infrastructure overview
- Component analysis
- Dependency mapping
- Security recommendations
- Implementation roadmap

Key findings:
- ⚠️ Credentials (rootkey.csv) at risk
- Need setup for remote state
- Recommend adding variables.tf/outputs.tf

## Common Issues & Solutions

### Port conflicts
```powershell
# Find and kill process on port
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Module not found (Python)
```powershell
pip install -r requirements.txt
```

### Dependencies not installed (React)
```powershell
npm install
```

### CORS errors
- Ensure backend is running
- Check `REACT_APP_API_URL` is correct
- Backend has CORS configured

## Code Organization Best Practices

### Backend
- Keep analysis logic in `codeatlas/` modules
- Use `app.py` only for routes
- Follow PEP 8 style guide

### Frontend
- Components in `src/components/`
- Pages in `src/pages/`
- API calls through `src/services/api.js`
- State management in `src/store/`

## Next Features to Implement

Priority 1:
- [ ] Repository caching
- [ ] Error handling improvements
- [ ] Rate limiting

Priority 2:
- [ ] User authentication
- [ ] Saved analyses
- [ ] Export reports

Priority 3:
- [ ] Multi-repo analysis
- [ ] Advanced metrics
- [ ] AI recommendations

## Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [D3.js Guide](https://d3js.org/)
- [Terraform Docs](https://www.terraform.io/docs)

## Team Collaboration

- Use feature branches: `git checkout -b feature/description`
- Write descriptive commit messages
- Test locally before pushing
- Create pull requests for review

---

**CodeAtlas v0.1.0** - Automated Codebase Architecture Analyzer
