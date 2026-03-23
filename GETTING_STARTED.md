# CodeAtlas Implementation & Getting Started Guide

## Overview

CodeAtlas is now fully scaffolded with both backend and frontend components. This guide will help you get everything running.

## Project Locations

- **CodeAtlas Project:** `c:\Users\HP\Desktop\CodeAtlas\`
- **Terraform Analysis Report:** `c:\Users\HP\Desktop\CodeAtlas\TF_ARCHITECTURE_ANALYSIS.md`

## Project Structure

```
CodeAtlas/
├── backend/
│   ├── codeatlas/
│   │   ├── __init__.py
│   │   ├── repository_analyzer.py
│   │   ├── technology_detector.py
│   │   ├── dependency_graph.py
│   │   └── architecture_analyzer.py
│   ├── app.py
│   ├── requirements.txt
│   ├── setup.py
│   ├── .env.example
│   └── README.md
├── frontend/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navigation.js
│   │   │   ├── Navigation.css
│   │   │   └── ArchitectureVisualization.js
│   │   ├── pages/
│   │   │   ├── Home.js
│   │   │   ├── Home.css
│   │   │   ├── Analyzer.js
│   │   │   └── Analyzer.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── store/
│   │   │   └── analysisStore.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── .gitignore
│   └── README.md
├── .gitignore
└── README.md
```

## Step 1: Backend Setup

### 1.1 Install Python Dependencies

```powershell
cd c:\Users\HP\Desktop\CodeAtlas\backend
pip install -r requirements.txt
```

### 1.2 Configure Environment

```powershell
cp .env.example .env
# Edit .env if needed (default PORT=5000 is fine)
```

### 1.3 Start the Backend Server

```powershell
python app.py
```

**Expected Output:**
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://0.0.0.0:5000
```

The backend API is now running at `http://localhost:5000`

### 1.4 Test the Backend

```powershell
# In a new terminal, test the health endpoint
curl http://localhost:5000/health
# Should return: {"status":"healthy"}

curl http://localhost:5000/api/status
# Should return version and status info
```

## Step 2: Frontend Setup

### 2.1 Install Node Dependencies

```powershell
cd c:\Users\HP\Desktop\CodeAtlas\frontend
npm install
```

### 2.2 Configure API URL

```powershell
# Set environment variable for API endpoint
$env:REACT_APP_API_URL="http://localhost:5000/api"
```

### 2.3 Start the Frontend Development Server

```powershell
npm start
```

The React app will automatically open at `http://localhost:3000`

## Step 3: Test the Complete System

### 3.1 Using the CodeAtlas UI

1. **Browser:** Navigate to `http://localhost:3000`
2. **Home Page:** Click "Start Analyzing"
3. **Analyzer Page:** Enter a GitHub repository URL
   - Example: `https://github.com/facebook/react`
4. **Click "Analyze"** and wait for results

### 3.2 Architecture Visualization

Once analysis completes, you'll see:
- **Architecture Diagram** - Interactive D3 visualization
- **Detected Technologies** - Frameworks, databases, infrastructure
- **Architecture Insights** - Recommendations and potential issues
- **Services Summary** - Components found in the repository

## Architecture Overview

### Backend (Python Flask)

The backend performs the heavy lifting:

1. **RepositoryAnalyzer** - Clones GitHub repos and scans structure
2. **TechnologyDetector** - Analyzes dependencies and detects tech stack
3. **DependencyGraph** - Models relationships between components
4. **ArchitectureAnalyzer** - Orchestrates the full analysis pipeline

**Key Endpoints:**
- `GET /health` - Health check
- `GET /api/status` - API status
- `POST /api/analyze` - Analyze a repository

### Frontend (React)

Intuitive user interface with:

1. **Home Page** - Project overview and feature highlights
2. **Analyzer Page** - Repository input and results display
3. **Visualization** - Interactive D3-based architecture diagrams
4. **Insights Panel** - Technology detection and recommendations

**Components:**
- `Navigation` - Top navigation bar
- `ArchitectureVisualization` - D3 graph visualization
- `Home` - Landing page
- `Analyzer` - Main analysis interface

## Terraform Architecture Analysis

Your Terraform infrastructure has been analyzed and documented:

**Location:** `c:\Users\HP\Desktop\CodeAtlas\TF_ARCHITECTURE_ANALYSIS.md`

**Key Findings:**
- Configuration-based infrastructure management
- EC2 instance provisioning
- ⚠️ Credentials exposure issue (rootkey.csv)
- Recommendations for security and best practices

**Recommended Actions:**
1. Add `.gitignore` to exclude `rootkey.csv`
2. Use AWS IAM roles instead of CSV credentials
3. Set up remote Terraform state (S3 backend)
4. Add `variables.tf` and `outputs.tf`

## Common Commands

### Backend

```powershell
# Development
cd backend
python app.py

# Production
python -m gunicorn app:app --bind 0.0.0.0:5000

# Run tests (when added)
pytest
```

### Frontend

```powershell
# Development
cd frontend
npm start

# Build for production
npm run build

# Run tests (when added)
npm test
```

## Troubleshooting

### Issue: "Cannot connect to backend"
- Ensure backend is running: `python app.py`
- Check backend port: `http://localhost:5000/health`
- Verify `REACT_APP_API_URL` environment variable

### Issue: "Port 3000 already in use"
```powershell
# Kill the process using port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: "Git not found" during analysis
- Ensure Git is installed: `git --version`
- Update PATH if needed

### Issue: Python dependencies conflict
```powershell
# Create fresh virtual environment
python -m venv venv
.\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

## Next Steps

### Phase 1: Enhance Core Features
- [ ] Add support for GitLab and Bitbucket
- [ ] Implement caching for analyzed repositories
- [ ] Add export functionality (JSON, PDF reports)
- [ ] Support private repository analysis

### Phase 2: Improve Visualization
- [ ] Interactive node filtering
- [ ] Zoom and pan controls
- [ ] Component search functionality
- [ ] Real-time updates

### Phase 3: Advanced Analysis
- [ ] Code complexity metrics
- [ ] Security vulnerability detection
- [ ] Performance bottleneck identification
- [ ] Microservice boundary detection

### Phase 4: User Features
- [ ] User authentication
- [ ] Saved analysis history
- [ ] Team collaboration
- [ ] Custom architecture templates

## Development Setup for Contributors

### Local Development

1. **Fork and Clone**
   ```powershell
   git clone https://github.com/YOUR_USERNAME/CodeAtlas.git
   cd CodeAtlas
   ```

2. **Backend Development**
   ```powershell
   cd backend
   python -m venv venv
   .\venv\Scripts\Activate.ps1
   pip install -r requirements.txt
   python app.py
   ```

3. **Frontend Development**
   ```powershell
   cd frontend
   npm install
   npm start
   ```

### Code Style
- **Python:** PEP 8 (use `black` for formatting)
- **JavaScript:** ESLint + Prettier
- **Git:** Use feature branches (`feature/description`)

## Performance Optimization

### Backend Optimization
- Implement repository caching
- Add analysis result caching with TTL
- Use async operations for large repos

### Frontend Optimization
- Code splitting for components
- Lazy load visualization library
- Optimize D3 rendering

## Deployment

### Docker Deployment

```dockerfile
# Backend Dockerfile (backend/Dockerfile)
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
CMD ["python", "app.py"]

# Frontend Dockerfile (frontend/Dockerfile)
FROM node:16 as build
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
```

### Docker Compose

```yaml
version: '3.8'
services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      - FLASK_ENV=production

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend
```

## Support & Community

- **Issues:** Open an issue on GitHub
- **Discussions:** Use GitHub Discussions
- **Contributing:** See CONTRIBUTING.md
- **License:** MIT

---

## Summary

You now have:

✅ **CodeAtlas Backend** - Python Flask API for repository analysis  
✅ **CodeAtlas Frontend** - React UI for visualization  
✅ **Terraform Documentation** - Complete architecture analysis  
✅ **Implementation Guides** - Setup and deployment instructions

**Start using CodeAtlas:**
1. Run backend: `python app.py`
2. Run frontend: `npm start`
3. Open `http://localhost:3000`
4. Analyze a GitHub repository!

---

**CodeAtlas v0.1.0** - Understand Complex Codebases Instantly
